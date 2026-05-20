// v2 CountUp — number/stat with line-skeleton reveal on scroll-into-view.
// Per spec pattern #7: horizontal hairline retracts to a single point at
// the digit position, then the digit fades in. Total 800ms. Resolves once,
// no re-run on subsequent scroll.
//
// Accepts a string value (e.g. "$10s of millions" — not just numeric).
"use client";

import { motion, useReducedMotion } from "motion/react";

interface CountUpProps {
  value: string;
  className?: string;
}

export function CountUp({ value, className = "" }: CountUpProps) {
  const reduced = useReducedMotion();

  return (
    <span className={`v2-countup ${className}`.trim()}>
      <motion.span
        className="v2-countup__line"
        initial={reduced ? { scaleX: 0 } : { scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden
      />
      <motion.span
        className="v2-countup__value"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {value}
      </motion.span>
    </span>
  );
}
