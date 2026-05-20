// v2 HairlineDivider — 1px hairline that draws itself left-to-right on
// scroll-into-view. transform-origin: left, scaleX 0 -> 1 over 700ms.
"use client";

import { motion, useReducedMotion } from "motion/react";

export function HairlineDivider({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`v2-hairline ${className}`.trim()}
      style={{ transformOrigin: "left center" }}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    />
  );
}
