// components/hand/HandCircle.tsx
//
// Hand-drawn editor's circle. Encircles a piece of content (e.g., the
// $150K proof stat). Irregular ellipse-like path; not a perfect circle.
// Draws itself in on scroll-into-view.
//
// Use: wrap target element in a relative-positioned container, drop
// HandCircle as a sibling absolutely positioned over it.
"use client";

import { useEffect, useRef } from "react";

interface HandCircleProps {
  color?: string;
  /** Stroke width. Default 2.4. */
  width?: number;
  /** Variant — slight differences in irregularity. */
  variant?: 1 | 2;
  /** Animation delay in seconds. */
  delay?: number;
  className?: string;
}

// Each path is roughly an ellipse but drawn with hand-feeling curves.
// Starts/ends slightly past the visual close — the way a person draws
// a circle in a single stroke and overshoots. The viewBox is the SVG's
// 100×60 coordinate space; we use preserveAspectRatio="none" below so
// the circle stretches to whatever aspect the container actually is.
// That keeps the visual centering correct regardless of $150K's
// rendered width.
const PATHS = {
  1: "M 50 4 C 28 5, 8 12, 5 30 C 3 48, 22 56, 50 56 C 78 56, 96 50, 96 30 C 96 12, 78 4, 52 4 C 46 4, 44 5, 48 6",
  2: "M 52 3 C 26 5, 6 14, 5 32 C 5 50, 26 57, 50 56 C 76 56, 95 50, 96 30 C 96 12, 76 3, 52 3 C 46 3, 44 4, 48 5",
};

export function HandCircle({
  color = "var(--color-accent-copper)",
  width = 2.4,
  variant = 1,
  delay = 0,
  className = "",
}: HandCircleProps) {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = reduced ? "0" : `${len}`;

    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.style.transition = `stroke-dashoffset 1200ms cubic-bezier(0.22, 0.8, 0.28, 1) ${delay}s`;
            path.style.strokeDashoffset = "0";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <svg
      className={`hand-circle ${className}`.trim()}
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      aria-hidden
      style={{
        position: "absolute",
        inset: "-12% -6%",
        width: "112%",
        height: "124%",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <path
        ref={pathRef}
        d={PATHS[variant]}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
