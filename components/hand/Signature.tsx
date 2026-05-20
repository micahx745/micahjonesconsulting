// components/hand/Signature.tsx
//
// Hand-drawn signature placeholder. SVG path approximating "M. Jones"
// in cursive. Draws itself in on first paint over 1.6s, then sits
// quietly. Replace with a real signature SVG when Micah provides one
// (one file swap, no code change).
//
// Anchored at the end of the foyer hero. Reads as the operator's
// pen-signed name beneath the headline statement — the "made by a
// person" fingerprint that no template can have.
"use client";

import { useEffect, useRef } from "react";

interface SignatureProps {
  /** Color CSS var. Default copper-deep. */
  color?: string;
  /** Stroke width. */
  width?: number;
  /** Delay before drawing starts (seconds). */
  delay?: number;
  /** Height in pixels (width auto). */
  height?: number;
  className?: string;
}

// SVG path approximates a cursive "M. Jones" — hand-drawn feel.
// Single continuous stroke (or close to it) so the draw animation
// reads as a person writing in one motion.
const PATH = "M 8 60 C 8 45, 14 22, 22 18 C 30 14, 36 28, 38 50 C 40 70, 44 78, 50 68 C 56 58, 60 38, 68 30 C 76 22, 84 36, 88 56 C 90 66, 94 72, 98 64 M 110 58 C 112 60, 114 62, 113 64 C 112 66, 110 65, 110 63 M 130 28 C 122 28, 116 38, 114 50 C 112 62, 118 72, 128 72 C 138 72, 146 62, 148 50 C 150 38, 144 28, 134 28 M 158 70 C 162 60, 168 40, 174 32 C 178 28, 184 30, 184 38 C 184 50, 180 70, 180 80 C 180 90, 184 92, 192 84 M 200 50 C 196 42, 204 30, 214 32 C 224 34, 230 44, 230 56 C 230 68, 222 76, 212 76 C 202 76, 196 68, 198 60 M 244 38 C 234 36, 226 46, 228 56 C 230 66, 240 70, 248 64 C 252 60, 254 54, 252 50 C 248 44, 240 44, 234 50 C 232 52, 232 58, 240 60 C 250 62, 262 56, 268 50 M 280 36 C 276 38, 274 46, 276 56 C 278 66, 284 76, 284 88 C 284 94, 280 96, 274 92";

export function Signature({
  color = "var(--color-accent-copper-deep)",
  width = 1.8,
  delay = 1.6,
  height = 48,
  className = "",
}: SignatureProps) {
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

    // Signature draws on first paint (not scroll-triggered).
    requestAnimationFrame(() => {
      path.style.transition = `stroke-dashoffset 1800ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;
      path.style.strokeDashoffset = "0";
    });
  }, [delay]);

  return (
    <svg
      className={`signature ${className}`.trim()}
      viewBox="0 0 300 100"
      aria-label="Micah Jones — signature"
      role="img"
      style={{
        height: `${height}px`,
        width: "auto",
        overflow: "visible",
      }}
    >
      <path
        ref={pathRef}
        d={PATH}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
