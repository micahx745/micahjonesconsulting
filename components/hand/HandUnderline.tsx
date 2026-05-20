// components/hand/HandUnderline.tsx
//
// Hand-drawn underline. SVG path with irregular control points — looks
// like a person drew it with a pen, not a CSS border. Draws itself in
// on scroll-into-view via stroke-dashoffset over 800ms.
//
// Designed to sit BELOW a piece of type. Width 100% of parent;
// container should set positioning so this anchors correctly.
"use client";

import { useEffect, useRef } from "react";

interface HandUnderlineProps {
  /** Color CSS var. Default copper. */
  color?: string;
  /** Stroke width in SVG units. Default 2.2. */
  width?: number;
  /** Variant — three different irregular paths. */
  variant?: 1 | 2 | 3;
  /** Animation delay in seconds. */
  delay?: number;
  className?: string;
}

// Tier Final fix — flattened curves. Original variants had y-range
// 4–13 which got vertically compressed when the SVG stretched to the
// thin underline strip — the up-curves crossed into the type bottom.
// New range is y 7–11 (max 4 units variance) for a subtle pen-line
// feel without intersecting the baseline.
const PATHS = {
  1: "M 3 9 C 80 8, 200 10, 320 9 S 540 10, 720 9 S 920 8, 997 9",
  2: "M 4 9 C 50 10, 110 8, 180 9 C 260 10, 340 9, 420 9 C 510 10, 600 8, 690 9 C 800 10, 900 8, 997 10",
  3: "M 2 9 Q 120 11 250 9 T 510 9 T 770 8 T 997 9",
};

export function HandUnderline({
  color = "var(--color-accent-copper)",
  width = 2.2,
  variant = 1,
  delay = 0,
  className = "",
}: HandUnderlineProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.style.transition = `stroke-dashoffset 850ms cubic-bezier(0.22, 0.8, 0.28, 1) ${delay}s`;
            path.style.strokeDashoffset = "0";
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    observerRef.current.observe(path);
    return () => observerRef.current?.disconnect();
  }, [delay]);

  return (
    <svg
      className={`hand-underline ${className}`.trim()}
      viewBox="0 0 1000 18"
      preserveAspectRatio="none"
      aria-hidden
      style={{
        display: "block",
        width: "100%",
        height: "0.35em",
        marginTop: "0.04em",
        overflow: "visible",
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
