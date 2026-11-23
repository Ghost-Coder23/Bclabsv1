type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

let cached: boolean | undefined;

export function can3D(): boolean {
  if (cached !== undefined) return cached;
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  const nav = navigator as NavigatorWithHints;
  const weakDevice =
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
    Boolean(nav.connection?.saveData);

  let webglAvailable = false;
  try {
    const canvas = document.createElement("canvas");
    webglAvailable = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webglAvailable = false;
  }

  cached = webglAvailable && !weakDevice;
  return cached;
}

export function prefersStill(): boolean {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
