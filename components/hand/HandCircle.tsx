// components/hand/HandCircle.tsx
//
// Hand-drawn editor's circle. Encircles a piece of content (e.g., the
// $20M+ figure). Pass-20 refinement per Marcus (Pass-19 review).
//
// Pass-20 changes vs. earlier:
//   - viewBox widened from 100×60 to 180×60 (3:1) to match the typical
//     wide-figure container ($20M+ at clamp 80-168px ≈ 6:1 aspect);
//     reduces the stretch that flattened the curve into a mechanical
//     ellipse.
//   - preserveAspectRatio="xMidYMid meet" so the path retains its
//     designed shape; the container's own inset sizing keeps the
//     curve correctly overlapping the figure.
//   - Stroke width default 2.4 → 3.0; readable at the new figure scale.
//   - TWO overlapping path passes: a primary closed loop + a shorter
//     "overshoot" stroke that closes past the start with 0.85× width
//     and 0.55 opacity. Mimics the editor's pen-lift-and-close-past-
//     start hand gesture without a separate animation system.
//   - Optional turbulence filter (`grain` prop, default true) gives
//     the stroke ink-on-paper irregularity rather than vector smooth.
//   - useId hash on the filter prevents multiple instances on the
//     same page from sharing one turbulence pattern (which would
//     read as a visible repeat).
//
// Use: wrap target element in a position: relative container, drop
// HandCircle as a sibling absolutely positioned over it.
"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";

interface HandCircleProps {
  color?: string;
  /** Stroke width in SVG units. Default 3.0 (was 2.4 — bumped for the
   *  new $20M+ figure scale at clamp 80-168px). */
  width?: number;
  /** Path variant — slight irregularities of the same idea. */
  variant?: 1 | 2 | 3;
  /** Pass-115: "none" maps the viewBox linearly onto the box (the existing
   *  vectorEffect="non-scaling-stroke" keeps the stroke width uniform);
   *  default "meet" keeps the path's designed shape. */
  aspect?: "meet" | "none";
  /** Pass-115: merged OVER the default inline style object, so a caller
   *  can replace inset/width/height (e.g. size the loop from the measured
   *  ink box, in em). Backward compatible: absent = default box. */
  boxStyle?: CSSProperties;
  /** Animation delay in seconds. */
  delay?: number;
  /** Render the final frame immediately, with no transition. */
  instant?: boolean;
  /** Controlled draw (Pass-114 RevenueFigure). undefined = the existing
   *  in-view observer runs unchanged; false = both paths hidden;
   *  true = draw in (primary, then overshoot) after `delay`. */
  play?: boolean;
  /** Subtle SVG turbulence filter for ink-on-paper texture. Default true.
   *  Drops out under forced-colors mode (filter doesn't render). */
  grain?: boolean;
  className?: string;
}

// Paths designed for 180×60 viewBox (3:1). Each variant has a primary
// closed loop and a shorter overshoot stroke that draws past the start.
const PATHS = {
  1: {
    primary:
      "M 96 8 C 52 10, 14 16, 8 32 C 4 48, 50 54, 96 54 C 144 54, 174 48, 172 30 C 170 14, 130 8, 96 8",
    overshoot: "M 90 9 C 50 11, 14 18, 8 34",
  },
  2: {
    primary:
      "M 92 6 C 48 10, 12 18, 10 32 C 9 50, 52 56, 96 55 C 142 54, 172 48, 170 28 C 168 12, 128 6, 96 6",
    overshoot: "M 96 6 C 130 6, 168 12, 170 28",
  },
  3: {
    primary:
      "M 100 0.5 C 12 -0.5, 0 2, 0 31 C 0 57, 10 60, 88 60 C 171 60, 180 57, 180 29 C 180 2, 170 0, 92 0.5",
    overshoot: "M 116 1.5 C 46 0.5, 2.5 0.5, 2 12",
  },
};

export function HandCircle({
  color = "var(--color-accent-copper)",
  width = 3.0,
  variant = 1,
  aspect = "meet",
  boxStyle,
  delay = 0,
  instant = false,
  play,
  grain = true,
  className = "",
}: HandCircleProps) {
  const primaryRef = useRef<SVGPathElement | null>(null);
  const overshootRef = useRef<SVGPathElement | null>(null);
  const uid = useId().replace(/:/g, "");
  const filterId = `hand-grain-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function drawIn(el: SVGPathElement | null, extraDelay: number) {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = reduced ? "0" : `${len}`;
      if (reduced) return;
      requestAnimationFrame(() => {
        // The 1100ms stroke pair is the approved count-up circle (Pass-114
        // operator exception, 2026-09-11 decision 4; brand.json
        // motion.countup) — an R13/R15 override, not a precedent.
        el.style.transition = `stroke-dashoffset 1100ms cubic-bezier(0.22, 0.8, 0.28, 1) ${delay + extraDelay}s`; // motion-ok: Pass-114 count-up circle, operator exception 2026-09-11 decision 4 (R13/R15 override, brand.json motion.countup)
        el.style.strokeDashoffset = "0";
      });
    }

    // Controlled mode (Pass-114): the parent owns when the pen moves.
    if (play !== undefined) {
      if (instant || reduced) {
        // Final frame, no transition.
        [primaryRef.current, overshootRef.current].forEach((el) => {
          if (!el) return;
          const len = el.getTotalLength();
          el.style.transition = "none";
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = "0";
        });
      } else if (!play) {
        // Both paths hidden until the count starts.
        [primaryRef.current, overshootRef.current].forEach((el) => {
          if (!el) return;
          const len = el.getTotalLength();
          el.style.transition = "none";
          el.style.strokeDasharray = `${len}`;
          el.style.strokeDashoffset = `${len}`;
        });
      } else {
        // Primary stroke from `delay`, overshoot 0.95s behind it — with
        // delay 0.6 that is 0.6s-1.7s and 1.55s-2.65s (Pass-114 spec).
        drawIn(primaryRef.current, 0);
        drawIn(overshootRef.current, 0.95);
      }
      return;
    }

    if (instant) {
      [primaryRef.current, overshootRef.current].forEach((el) => {
        if (!el) return;
        const len = el.getTotalLength();
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = "0";
        el.style.transition = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            drawIn(primaryRef.current, 0);
            // Second stroke fires after the first completes — pen-lift,
            // close past the start, lift again. The two-pass gesture
            // is what makes the mark read as hand-drawn rather than
            // vector-smooth.
            drawIn(overshootRef.current, 0.95);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    if (primaryRef.current) observer.observe(primaryRef.current);
    return () => observer.disconnect();
  }, [delay, instant, play]);

  const path = PATHS[variant];

  return (
    <svg
      className={`hand-circle ${className}`.trim()}
      viewBox="0 0 180 60"
      preserveAspectRatio={aspect === "none" ? "none" : "xMidYMid meet"}
      aria-hidden
      style={{
        position: "absolute",
        inset: "-14% -4%",
        width: "108%",
        height: "128%",
        overflow: "visible",
        pointerEvents: "none",
        ...boxStyle,
      }}
    >
      {grain ? (
        <defs>
          <filter
            id={filterId}
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9" />
          </filter>
        </defs>
      ) : null}
      <g filter={grain ? `url(#${filterId})` : undefined}>
        <path
          ref={primaryRef}
          d={path.primary}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.92"
        />
        <path
          ref={overshootRef}
          d={path.overshoot}
          fill="none"
          stroke={color}
          strokeWidth={width * 0.85}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}
