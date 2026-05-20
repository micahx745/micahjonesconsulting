// v2 Reveal — fade-up-on-scroll-into-view wrapper.
// Default variant: opacity 0 -> 1, y 20px -> 0, 600ms EASE_OUT_STRONG.
// viewport once: true so it doesn't re-trigger on scroll-back.
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/v2-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Override Y offset for entry — default 20px. */
  y?: number;
  /** as element type. Default div. */
  as?: "div" | "section" | "header" | "article" | "p" | "li";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : y !== undefined
      ? {
          hidden: { opacity: 0, y },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
          },
        }
      : delay
        ? {
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay },
            },
          }
        : fadeUp;

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
