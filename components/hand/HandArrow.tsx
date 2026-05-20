// components/hand/HandArrow.tsx
//
// Hand-pointed arrow. Drawn line + arrowhead, irregular curve, the way
// a person sketches an arrow from a margin note to a piece of text.
// Draws itself in on scroll.
"use client";

import { useEffect, useRef } from "react";

interface HandArrowProps {
  color?: string;
  width?: number;
  /** Arrow direction. */
  direction?: "down-right" | "right" | "down" | "right-up";
  /** Animation delay in seconds. */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PATHS = {
  "down-right": {
    d: "M 8 8 C 40 30, 80 60, 110 100 C 130 130, 145 155, 152 178 M 130 158 L 152 178 L 144 152",
    viewBox: "0 0 170 200",
  },
  right: {
    d: "M 8 22 C 60 18, 120 26, 180 22 C 220 20, 260 24, 295 22 M 275 12 L 295 22 L 275 32",
    viewBox: "0 0 310 44",
  },
  down: {
    d: "M 22 8 C 18 50, 26 110, 22 170 C 20 200, 24 230, 22 260 M 12 240 L 22 260 L 32 240",
    viewBox: "0 0 44 280",
  },
  "right-up": {
    d: "M 8 130 C 50 110, 100 80, 140 50 C 165 32, 185 18, 200 10 M 180 18 L 200 10 L 195 32",
    viewBox: "0 0 220 145",
  },
};

export function HandArrow({
  color = "var(--color-accent-copper-deep)",
  width = 1.6,
  direction = "down-right",
  delay = 0,
  className = "",
  style,
}: HandArrowProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const config = PATHS[direction];

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
            path.style.transition = `stroke-dashoffset 900ms cubic-bezier(0.22, 0.8, 0.28, 1) ${delay}s`;
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
      className={`hand-arrow ${className}`.trim()}
      viewBox={config.viewBox}
      aria-hidden
      style={{
        overflow: "visible",
        pointerEvents: "none",
        ...style,
      }}
    >
      <path
        ref={pathRef}
        d={config.d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
