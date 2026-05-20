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

const PATHS = {
  1: "M 3 8 C 80 4, 200 11, 320 7 S 540 6, 720 9 S 920 4, 997 7",
  2: "M 4 7 C 50 11, 110 4, 180 8 C 260 12, 340 5, 420 9 C 510 13, 600 6, 690 8 C 800 10, 900 5, 997 9",
  3: "M 2 6 Q 120 13 250 7 T 510 9 T 770 6 T 997 8",
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
        height: "0.6em",
        marginTop: "0.05em",
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
