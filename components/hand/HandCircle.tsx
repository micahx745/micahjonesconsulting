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
// a circle in a single stroke and overshoots.
const PATHS = {
  1: "M 480 50 C 280 50, 90 80, 60 175 C 30 270, 220 320, 460 320 C 700 320, 920 290, 940 195 C 960 100, 770 50, 520 50 C 460 50, 440 55, 460 56",
  2: "M 490 45 C 250 50, 70 90, 55 180 C 40 280, 240 330, 480 325 C 740 320, 935 280, 945 185 C 955 90, 740 45, 510 48 C 470 49, 450 52, 480 53",
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
      viewBox="0 0 1000 380"
      preserveAspectRatio="none"
      aria-hidden
      style={{
        position: "absolute",
        inset: "-18% -8%",
        width: "116%",
        height: "136%",
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
