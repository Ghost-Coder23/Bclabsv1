"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Layers3, Workflow } from "lucide-react";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const float = (duration: number, delay = 0) => reduceMotion
    ? {}
    : { y: [0, -13, 0], rotate: [0, 2, 0], transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div className="hero-art" aria-label="Abstract three-dimensional digital network illustration" role="img">
      <div className="hero-art-grid" />
      <div className="hero-art-glow" />
      <motion.div className="orbit orbit-one" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
        <span className="orbit-dot orbit-dot-one" />
      </motion.div>
      <motion.div className="orbit orbit-two" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 48, repeat: Infinity, ease: "linear" }}>
        <span className="orbit-dot orbit-dot-two" />
      </motion.div>
      <motion.div className="hero-core" animate={float(7)}>
        <div className="core-highlight" />
        <div className="core-contour contour-a" />
        <div className="core-contour contour-b" />
        <div className="core-cross core-cross-x" />
        <div className="core-cross core-cross-y" />
        <span className="core-monogram">BC</span>
      </motion.div>
      <motion.div className="floating-chip chip-code" animate={float(6, .4)}>
        <Code2 size={18} /><span>SOFTWARE</span>
      </motion.div>
      <motion.div className="floating-chip chip-erp" animate={float(7.5, .8)}>
        <Layers3 size={18} /><span>BUSINESS SYSTEMS</span>
      </motion.div>
      <motion.div className="floating-chip chip-flow" animate={float(6.5, 1.2)}>
        <Workflow size={18} /><span>INTEGRATION</span>
      </motion.div>
      <div className="art-caption"><span className="live-dot" /> ENGINEERED FOR WHAT&apos;S NEXT</div>
      <div className="art-coordinate">BC / 001 — DIGITAL POSSIBILITIES</div>
    </div>
  );
}
