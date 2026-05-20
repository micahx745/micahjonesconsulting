// v2 StaggerGroup — wraps multiple Reveal-style children with staggered
// entry. Children should be motion.* elements with hidden/visible variants
// (or just bare elements — they inherit the stagger via the parent).
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUpStagger } from "@/lib/v2-motion";

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay between children (seconds). Default 0.08. */
  stagger?: number;
  /** Initial delay before first child (seconds). Default 0.05. */
  delayChildren?: number;
}

export function StaggerGroup({
  children,
  className = "",
  stagger = 0.08,
  delayChildren = 0.05,
}: StaggerGroupProps) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Pre-styled child for StaggerGroup — fades up using the parent's stagger. */
export function StaggerChild({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUpStagger}
    >
      {children}
    </motion.div>
  );
}
