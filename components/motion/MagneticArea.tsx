// components/motion/MagneticArea.tsx
//
// Spring-physics magnetic pull. Wrap any interactive element; on
// pointermove inside the bounding hit area, the child translates
// toward the cursor with smooth spring damping. On leave, it springs
// back to rest.
//
// No custom cursor required (the brief explicitly dropped the cursor
// dot). The magnetic effect lives on the BUTTON itself.
//
// Spring config from the brief's recipe:
//   mass: 0.2, damping: 30, stiffness: 150
//   Pull ratio: 0.3× cursor delta from center
//
// Honors prefers-reduced-motion (no transform at all) + only fires
// on pointer-fine devices (skip touch laptops with mouse plugged in
// per the M6 fix in earlier pass).
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SPRING_CONFIG = { mass: 0.2, damping: 30, stiffness: 150 };
const PULL_RATIO = 0.3;

interface MagneticAreaProps {
  children: ReactNode;
  /** Wrapping element. Default `span` so it doesn't break flow. */
  as?: "span" | "div";
  className?: string;
  /** Strength multiplier. 1.0 = default 0.3× pull. */
  strength?: number;
}

export function MagneticArea({
  children,
  as = "span",
  className,
  strength = 1,
}: MagneticAreaProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_CONFIG);
  const sy = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!fine) return;

    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      x.set((e.clientX - cx) * PULL_RATIO * strength);
      y.set((e.clientY - cy) * PULL_RATIO * strength);
    }
    function onLeave() {
      x.set(0);
      y.set(0);
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, x, y]);

  const MotionTag = as === "div" ? motion.div : motion.span;

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      {children}
    </MotionTag>
  );
}
