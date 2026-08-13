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
// Hand-rolled rAF spring (no `motion`/Framer Motion — CLAUDE.md: "Do
// not add Framer Motion. Component-level enter/exit uses CSS
// transitions + `:hover` via Tailwind utilities."). This integrates
// the SAME mass-spring-damper ODE Motion's `useSpring` solves —
//   m*x'' + damping*x' + stiffness*(target - x) = 0
// — via semi-implicit Euler with fixed substeps, instead of Motion's
// closed-form analytical solve. At these constants (heavily
// overdamped: zeta ~= 2.74) the two integrators are visually
// indistinguishable; see rAF idiom precedent in
// components/color-worlds/Hero.tsx (parallax + scroll-strip effects).
//
// Spring config from the brief's recipe:
//   mass: 0.2, damping: 30, stiffness: 150
//   Pull ratio: 0.3x cursor delta from center
//
// Honors prefers-reduced-motion (no transform at all, no rAF loop
// ever started) + only fires on pointer-fine devices (skip touch
// laptops with mouse plugged in per the M6 fix in earlier pass).
"use client";

import { useEffect, useRef, type ReactNode } from "react";

const SPRING_MASS = 0.2;
const SPRING_DAMPING = 30;
const SPRING_STIFFNESS = 150;
const PULL_RATIO = 0.3;

// Euler integration of a stiff spring is only stable at small steps.
// Substep at a fixed 1/240s so a slow frame (backgrounded tab, GC
// pause) can't blow the spring into oscillation; MAX_FRAME_DT caps
// how much wall-clock time a single rAF callback ever integrates, so
// a long stall can't fast-forward the spring either.
const SUBSTEP = 1 / 240;
const MAX_FRAME_DT = 1 / 30;
const REST_EPSILON = 0.01;

interface MagneticAreaProps {
  children: ReactNode;
  /** Wrapping element. Default `span` so it doesn't break flow. */
  as?: "span" | "div";
  className?: string;
  /** Strength multiplier. 1.0 = default 0.3x pull. */
  strength?: number;
}

export function MagneticArea({
  children,
  as = "span",
  className,
  strength = 1,
}: MagneticAreaProps) {
  const ref = useRef<HTMLDivElement | null>(null);

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

    // Spring state — one pair per axis. Mirrors the old
    // useMotionValue(0) (x/y = current position) driving a
    // useSpring(x, SPRING_CONFIG) (tx/ty = target the spring chases).
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let last = 0;
    let running = false;

    function step(now: number) {
      raf = 0;
      let dt = last ? (now - last) / 1000 : SUBSTEP;
      last = now;
      dt = Math.min(dt, MAX_FRAME_DT);

      const steps = Math.max(1, Math.round(dt / SUBSTEP));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        const ax =
          (SPRING_STIFFNESS * (tx - x) - SPRING_DAMPING * vx) / SPRING_MASS;
        const ay =
          (SPRING_STIFFNESS * (ty - y) - SPRING_DAMPING * vy) / SPRING_MASS;
        vx += ax * h;
        vy += ay * h;
        x += vx * h;
        y += vy * h;
      }

      const atRest =
        Math.abs(tx - x) < REST_EPSILON &&
        Math.abs(ty - y) < REST_EPSILON &&
        Math.abs(vx) < REST_EPSILON &&
        Math.abs(vy) < REST_EPSILON;

      if (atRest) {
        x = tx;
        y = ty;
        vx = 0;
        vy = 0;
        el!.style.transform = `translate(${x}px, ${y}px)`;
        running = false;
        last = 0;
        return;
      }

      el!.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(step);
    }

    function ensureRunning() {
      if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(step);
      }
    }

    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tx = (e.clientX - cx) * PULL_RATIO * strength;
      ty = (e.clientY - cy) * PULL_RATIO * strength;
      ensureRunning();
    }
    function onLeave() {
      tx = 0;
      ty = 0;
      ensureRunning();
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </Tag>
  );
}
