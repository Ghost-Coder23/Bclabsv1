import * as THREE from "three";
import { scenes, type Inputs } from "./scenes";

export type Mounted = {
  destroy: () => void;
  kick: (frames?: number) => void;
};

type MountOptions = {
  still: boolean;
  inputs: { current: Inputs };
  globalPointer?: boolean;
};

/** Owns one small WebGL scene. Every listener, animation frame and GPU resource is released on destroy. */
export function mount(el: HTMLElement, kind: string, options: MountOptions): Mounted {
  const make = scenes[kind];
  if (!make) throw new Error("Unknown scene: " + kind);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  const object = make(scene);
  const position = object.camera ?? [0, 0, 6.4];
  camera.position.set(position[0], position[1], position[2]);

  const frame = { t: 0, dt: 0, px: 0, py: 0, hover: 0, cam: camera };
  let targetX = 0;
  let targetY = 0;
  let targetHover = 0;
  let alive = true;
  let framesToRender = 0;
  let raf = 0;
  let last = performance.now();

  const resize = () => {
    if (!alive) return;
    const width = Math.max(1, el.clientWidth);
    const height = Math.max(1, el.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    kick(2);
  };

  const render = () => {
    raf = 0;
    if (!alive || document.hidden) return;

    const now = performance.now();
    frame.dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    frame.t += frame.dt;
    frame.px += (targetX - frame.px) * 0.08;
    frame.py += (targetY - frame.py) * 0.08;
    frame.hover += (targetHover - frame.hover) * Math.min(1, frame.dt * 6);

    object.update(frame, options.inputs.current);
    renderer.render(scene, camera);

    if (!options.still || framesToRender > 0) {
      if (framesToRender > 0) framesToRender -= 1;
      raf = requestAnimationFrame(render);
    }
  };

  function kick(frames = 90) {
    framesToRender = Math.max(framesToRender, frames);
    last = performance.now();
    if (alive && !document.hidden && !raf) raf = requestAnimationFrame(render);
  }

  const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
  resizeObserver?.observe(el);
  resize();

  const pointerMove = (event: PointerEvent) => {
    if (options.globalPointer) {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
      return;
    }
    const rect = el.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    targetY = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
  };
  const pointerEnter = () => { targetHover = 1; };
  const pointerLeave = () => {
    targetHover = 0;
    if (!options.globalPointer) { targetX = 0; targetY = 0; }
  };
  const visibilityChange = () => {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    } else {
      kick(options.still ? 2 : 90);
    }
  };

  if (!options.still) {
    (options.globalPointer ? window : el).addEventListener("pointermove", pointerMove as EventListener, { passive: true });
    el.addEventListener("pointerenter", pointerEnter);
    el.addEventListener("pointerleave", pointerLeave);
  }
  document.addEventListener("visibilitychange", visibilityChange);
  kick();

  return {
    kick,
    destroy() {
      if (!alive) return;
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", visibilityChange);
      (options.globalPointer ? window : el).removeEventListener("pointermove", pointerMove as EventListener);
      el.removeEventListener("pointerenter", pointerEnter);
      el.removeEventListener("pointerleave", pointerLeave);

      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((node) => {
        const renderable = node as THREE.Mesh;
        if (renderable.geometry) geometries.add(renderable.geometry);
        const material = renderable.material;
        if (Array.isArray(material)) material.forEach((item) => materials.add(item));
        else if (material) materials.add(material);
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
