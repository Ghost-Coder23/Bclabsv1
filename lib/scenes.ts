import * as THREE from "three";

export type Inputs = { progress: number; selected: string[] };
export type Frame = { t: number; dt: number; px: number; py: number; hover: number; cam: THREE.PerspectiveCamera };
export type Obj = { camera?: [number, number, number]; update: (f: Frame, i: Inputs) => void };
export type Make = (scene: THREE.Scene) => Obj;

const C = { blue: 0x1769ff, bblue: 0x438bff, cyan: 0x36d5f5, vio: 0x875cff, white: 0xffffff };
const { lerp, clamp } = THREE.MathUtils;
const sm = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const wire = (g: THREE.BufferGeometry, color: number, opacity = 0.7) => new THREE.LineSegments(new THREE.WireframeGeometry(g), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
const edges = (g: THREE.BufferGeometry, color: number, opacity = 1) => new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
const solid = (g: THREE.BufferGeometry, color: number, opacity = 0.18) => new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
const dots = (pos: ArrayLike<number>, color: number, size = 0.035, opacity = 0.75) => {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(Array.from(pos), 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color, size, transparent: true, opacity }));
};
const cloud = (n: number, r0: number, r1: number) => {
  const a: number[] = [];
  for (let i = 0; i < n; i++) { const d = r0 + Math.random() * (r1 - r0), u = Math.random() * 6.283, w = Math.acos(2 * Math.random() - 1); a.push(d * Math.sin(w) * Math.cos(u), d * Math.sin(w) * Math.sin(u), d * Math.cos(w)); }
  return a;
};
const block = (s: number, color: number) => { const g = new THREE.BoxGeometry(s, s, s), m = new THREE.Group(); m.add(solid(g, color, 0.25), edges(g, color)); return m; };
const matOf = (o: THREE.Object3D) => (o as THREE.Mesh).material as THREE.Material & { opacity: number };
const spin = (g: THREE.Group, f: Frame, k = 0.4) => { g.rotation.y = lerp(g.rotation.y, f.t * k + f.px * 0.9, 0.06); g.rotation.x = lerp(g.rotation.x, -f.py * 0.5 + 0.2, 0.06); };

/* Hero: an open BC-inspired orbit around a living network. */
const hero: Make = (scene) => {
  const g = new THREE.Group(); scene.add(g);
  const arc = (len: number, rot: number, color: number) => { const m = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.08, 16, 100, len), new THREE.MeshBasicMaterial({ color })); m.rotation.z = rot; return m; };
  g.add(arc(3.0, 2.3, C.blue), arc(1.8, 5.3, C.vio));
  const ig = new THREE.IcosahedronGeometry(1.05, 1), core = new THREE.Group();
  core.add(wire(ig, C.cyan, 0.6), dots(Array.from(ig.attributes.position.array), C.white, 0.09, 1)); g.add(core);
  const outer = wire(new THREE.IcosahedronGeometry(1.5, 0), C.vio, 0.45); g.add(outer);
  const d = dots(cloud(180, 2.6, 5.2), C.bblue); scene.add(d);
  return { update: (f) => {
    g.rotation.y = lerp(g.rotation.y, f.px * 0.8 + f.t * 0.2, 0.05); g.rotation.x = lerp(g.rotation.x, -f.py * 0.5, 0.05);
    core.rotation.y -= f.dt * 0.35; core.rotation.x += f.dt * 0.18; outer.rotation.y += f.dt * 0.12; d.rotation.y -= f.dt * 0.04;
  } };
};

/* Six separate service objects. Their movement responds to pointer hover. */
const customSoftware: Make = (scene) => {
  const g = new THREE.Group(); scene.add(g);
  const layers = [C.cyan, C.vio, C.blue].map((c) => { const geo = new THREE.BoxGeometry(2.6, 0.18, 1.9), m = new THREE.Group(); m.add(solid(geo, c, 0.3), edges(geo, c)); g.add(m); return m; });
  return { camera: [0, 0.4, 6], update: (f) => { spin(g, f); layers.forEach((m, i) => { m.position.y = (i - 1) * (0.5 + 0.55 * f.hover + 0.06 * Math.sin(f.t * 2 + i)); m.rotation.y = (i - 1) * 0.12 * f.hover; }); } };
};
const erp: Make = (scene) => {
  const g = new THREE.Group(); scene.add(g);
  const cubes = Array.from({ length: 8 }, (_, i) => { const b = block(0.9, [C.blue, C.cyan, C.vio, C.bblue][i % 4]); g.add(b); return b; });
  return { camera: [0, 0, 6.2], update: (f) => { spin(g, f, 0.35); const s = lerp(0.95, 0.5, f.hover) + 0.04 * Math.sin(f.t * 2); cubes.forEach((b, i) => b.position.set(i & 1 ? s : -s, i & 2 ? s : -s, i & 4 ? s : -s)); } };
};
const edu: Make = (scene) => {
  const g = new THREE.Group(); scene.add(g);
  const top = new THREE.Group(), bg = new THREE.BoxGeometry(2.8, 0.14, 2.8);
  top.add(solid(bg, C.blue, 0.3), edges(bg, C.bblue), dots([1.4, -0.1, 0, 1.4, -0.55, 0, 1.4, -1, 0], C.cyan, 0.16, 1)); top.rotation.y = Math.PI / 4; g.add(top);
  const cg = new THREE.CylinderGeometry(0.85, 1, 0.75, 6), cap = new THREE.Group(); cap.add(solid(cg, C.vio, 0.25), edges(cg, C.vio)); cap.position.y = -0.5; g.add(cap);
  return { camera: [0, 0.6, 6.4], update: (f) => { spin(g, f, 0.35); top.position.y = 0.3 * f.hover + 0.05 * Math.sin(f.t * 2); top.rotation.z = 0.14 * f.hover; } };
};
const cloudDevops: Make = (scene) => {
  const g = new THREE.Group(); scene.add(g);
  const cl = new THREE.Group();
  ([[-0.85, 0.45, 0, 0.65], [0, 0.8, 0.1, 0.85], [0.85, 0.4, 0, 0.62], [0, 0.35, 0.5, 0.65], [-0.2, 0.3, -0.45, 0.55]] as number[][]).forEach(([x, y, z, r]) => { const m = wire(new THREE.IcosahedronGeometry(r, 1), C.cyan, 0.65); m.position.set(x, y, z); cl.add(m); });
  g.add(cl);
  [0, 1, 2].forEach((i) => { const gg = new THREE.BoxGeometry(1.9, 0.3, 1.1), m = new THREE.Group(); m.add(solid(gg, C.blue, 0.3), edges(gg, C.bblue)); m.position.y = -0.95 - i * 0.42; g.add(m); });
  const pk = dots(new Array(24).fill(0), C.white, 0.09, 0.95); g.add(pk);
  const pa = pk.geometry.attributes.position as THREE.BufferAttribute;
  return { camera: [0, -0.3, 6.6], update: (f) => {
    spin(g, f, 0.3); cl.position.y = 0.15 * Math.sin(f.t * 1.2) + 0.2 * f.hover;
    for (let i = 0; i < 8; i++) { const k = (f.t * (0.5 + 0.8 * f.hover) + i / 8) % 1; pa.setXYZ(i, ((i % 3) - 1) * 0.55, -2 + k * 2.7, i % 2 ? 0.2 : -0.2); }
    pa.needsUpdate = true;
  } };
};
const automation: Make = (scene) => {
  const g = new THREE.Group(); scene.add(g);
  const gear = (x: number, c: number) => { const geo = new THREE.TorusGeometry(0.95, 0.16, 6, 10), m = new THREE.Group(); m.add(solid(geo, c, 0.22), wire(geo, c, 0.9)); m.position.x = x; g.add(m); return m; };
  const a = gear(-0.95, C.cyan), b = gear(0.95, C.vio);
  const pk = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), new THREE.MeshBasicMaterial({ color: C.white })); g.add(pk);
  return { camera: [0, 0, 6.2], update: (f) => { spin(g, f, 0.12); const s = 1 + 3 * f.hover; a.rotation.z = f.t * 0.7 * s; b.rotation.z = -f.t * 0.7 * s + 0.3; pk.position.set(Math.sin(f.t * 1.5 * s) * 1.9, -1.5, 0); } };
};
const consult: Make = (scene) => {
  const g = new THREE.Group(); scene.add(g);
  const P = [[0, 0, 0], [1.5, 0.5, 0.3], [-1.4, 0.7, -0.4], [0.4, 1.5, -0.6], [-0.5, -1.4, 0.5], [1.2, -1, -0.5], [-1.6, -0.4, 0.9]];
  const nodes = P.map((p, i) => { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(i ? 0.15 : 0.28, 1), new THREE.MeshBasicMaterial({ color: i ? C.cyan : C.white })); m.position.set(p[0], p[1], p[2]); g.add(m); return m; });
  const seg: number[] = [];
  P.forEach((p, i) => { if (!i) return; seg.push(...P[0], ...p, ...p, ...P[(i % 6) + 1]); });
  const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
  g.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: C.bblue, transparent: true, opacity: 0.7 })));
  return { camera: [0, 0, 6.4], update: (f) => { spin(g, f, 0.3); nodes.forEach((m, i) => m.scale.setScalar(1 + (0.25 + 0.5 * f.hover) * Math.sin(f.t * (2 + f.hover * 3) + i))); } };
};

const BUILDER_IDS = [
  "school-management",
  "accounting-finance",
  "inventory",
  "sales-crm",
  "hr-payroll",
  "custom-integrations",
];

const BUILDER_COLORS = [
  C.blue,
  C.cyan,
  C.vio,
  C.bblue,
  0x8fa8ff,
  0xa78bfa,
];

/* The selected modules assemble around a single BC Labs business-system core. */
const builder: Make = (scene) => {
  const g = new THREE.Group();
  scene.add(g);

  const core = new THREE.Group();
  const coreWire = new THREE.IcosahedronGeometry(0.82, 1);
  const coreFill = new THREE.IcosahedronGeometry(0.58, 1);
  core.add(
    wire(coreWire, C.cyan, 0.88),
    solid(coreFill, C.blue, 0.3),
    new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 16, 16),
      new THREE.MeshBasicMaterial({ color: C.white, transparent: true, opacity: 0.9 })
    )
  );
  g.add(core);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.75, 0.022, 8, 120),
    new THREE.MeshBasicMaterial({ color: C.cyan, transparent: true, opacity: 0.12 })
  );
  ring.rotation.x = Math.PI / 2;
  g.add(ring);

  const tiltedRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.35, 0.012, 6, 100),
    new THREE.MeshBasicMaterial({ color: C.vio, transparent: true, opacity: 0.14 })
  );
  tiltedRing.rotation.set(0.78, 0.2, -0.42);
  g.add(tiltedRing);

  const particles = dots(cloud(84, 3.3, 4.8), C.bblue, 0.028, 0.52);
  g.add(particles);

  const items = BUILDER_IDS.map((id, i) => {
    const angle = (i / BUILDER_IDS.length) * Math.PI * 2 - Math.PI / 2;
    const to = new THREE.Vector3(
      Math.cos(angle) * 2.25,
      i % 2 === 0 ? 0.55 : -0.55,
      Math.sin(angle) * 2.25
    );
    const from = to.clone().normalize().multiplyScalar(6.1);
    from.y += i % 2 === 0 ? 1.45 : -1.45;

    const cube = block(0.76, BUILDER_COLORS[i]);
    cube.visible = false;
    g.add(cube);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3);
    linePositions.setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute("position", linePositions);
    const line = new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: BUILDER_COLORS[i],
        transparent: true,
        opacity: 0,
      })
    );
    g.add(line);

    return { id, cube, line, from, to, progress: 0 };
  });

  return {
    camera: [0, 1.15, 8.15],
    update: (f, inputs) => {
      let selectedCount = 0;

      items.forEach((item) => {
        const selected = inputs.selected.includes(item.id);
        if (selected) selectedCount += 1;

        const target = selected ? 1 : 0;
        item.progress += (target - item.progress) * Math.min(1, f.dt * 3.6);
        const amount = ease(clamp(item.progress, 0, 1));

        item.cube.visible = item.progress > 0.012;
        item.cube.position.lerpVectors(item.from, item.to, amount);
        item.cube.position.y += Math.sin(f.t * 1.35 + item.to.x) * 0.045 * amount;
        item.cube.scale.setScalar(0.18 + 0.82 * amount);
        item.cube.rotation.set(
          (1 - amount) * 1.8 + f.t * 0.12,
          (1 - amount) * 3.4 + f.t * 0.22,
          (1 - amount) * 1.1
        );

        const positions = item.line.geometry.attributes.position as THREE.BufferAttribute;
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(1, item.cube.position.x, item.cube.position.y, item.cube.position.z);
        positions.needsUpdate = true;

        const lineMaterial = item.line.material as THREE.LineBasicMaterial;
        lineMaterial.opacity = amount * 0.58;
      });

      core.rotation.y += f.dt * 0.42;
      core.rotation.x += f.dt * 0.16;
      core.scale.setScalar(1 + selectedCount * 0.025);

      const ringMaterial = ring.material as THREE.MeshBasicMaterial;
      ringMaterial.opacity = lerp(ringMaterial.opacity, selectedCount ? 0.28 + selectedCount * 0.035 : 0.1, 0.06);
      tiltedRing.rotation.y = 0.2 + f.t * 0.055;
      particles.rotation.y -= f.dt * 0.018;

      g.rotation.y = lerp(g.rotation.y, f.t * 0.075 + f.px * 0.28, 0.045);
      g.rotation.x = lerp(g.rotation.x, -f.py * 0.2 + 0.12, 0.045);
    },
  };
};

export const scenes: Record<string, Make> = {
  hero,
  "custom-software": customSoftware,
  "erp-odoo": erp,
  "education-technology": edu,
  "cloud-devops": cloudDevops,
  "automation-integrations": automation,
  "it-consultancy": consult,
};
