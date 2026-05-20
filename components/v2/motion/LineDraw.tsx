// v2 LineDraw — animated SVG path draw on scroll-into-view.
// Uses Motion's pathLength prop on a <motion.path>. Per spec animation
// pattern #1: 1px hairline stroke in text-muted, 0 -> 1 over 800ms.
"use client";

import { motion, useReducedMotion } from "motion/react";

interface LineDrawProps {
  /** SVG path d attribute. */
  d: string;
  /** Viewbox (default "0 0 100 100"). */
  viewBox?: string;
  /** Stroke color CSS var name. Default `--color-text-muted`. */
  stroke?: string;
  /** Stroke width in SVG units. Default 1. */
  strokeWidth?: number;
  className?: string;
  /** Animation duration in seconds. Default 0.8. */
  duration?: number;
}

export function LineDraw({
  d,
  viewBox = "0 0 100 100",
  stroke = "var(--color-text-muted)",
  strokeWidth = 1,
  className = "",
  duration = 0.8,
}: LineDrawProps) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      aria-hidden
    >
      <motion.path
        d={d}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  );
}
