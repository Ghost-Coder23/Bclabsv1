"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { can3D, prefersStill } from "@/lib/capability";
import type { Inputs } from "@/lib/scenes";
import type { Mounted } from "@/lib/runner";

type Canvas3DProps = {
  kind: string;
  className?: string;
  label: string;
  fallback: React.ReactNode;
  inputs?: MutableRefObject<Inputs>;
  tick?: unknown;
  globalPointer?: boolean;
};

export default function Canvas3D({
  kind,
  className = "",
  label,
  fallback,
  inputs,
  tick,
  globalPointer = false,
}: Canvas3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef<Mounted | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !can3D() || typeof IntersectionObserver === "undefined") return;

    let disposed = false;
    let instance: Mounted | null = null;
    const still = prefersStill();
    const fallbackInputs: MutableRefObject<Inputs> = { current: { progress: 0, selected: [] } };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !instance) {
        import("@/lib/runner").then(({ mount }) => {
          if (disposed || instance || !element.isConnected) return;
          try {
            instance = mount(element, kind, {
              still,
              inputs: inputs ?? fallbackInputs,
              globalPointer,
            });
            mounted.current = instance;
            setLive(true);
          } catch {
            setLive(false);
          }
        }).catch(() => setLive(false));
      } else if (!entry.isIntersecting && instance) {
        instance.destroy();
        instance = null;
        mounted.current = null;
        setLive(false);
      }
    }, { rootMargin: "120px" });

    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      instance?.destroy();
      instance = null;
      mounted.current = null;
    };
  }, [kind, inputs, globalPointer]);

  useEffect(() => {
    mounted.current?.kick();
  }, [tick]);

  return (
    <div
      ref={ref}
      className={\`canvas-3d \${className} \${live ? "canvas-3d-live" : ""}\`}
      role="img"
      aria-label={label}
    >
      <div className="canvas-3d-fallback" aria-hidden="true">{fallback}</div>
    </div>
  );
}
