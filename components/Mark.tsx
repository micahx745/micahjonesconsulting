// components/Mark.tsx
//
// Tier X — Custom geometric brand mark.
//
// Two-rectangle architectural section drawing:
//   - Foyer rectangle (left): transparent fill, ink stroke
//   - Copper hairline between
//   - Theater rectangle (right): filled obsidian
//
// Literally embodies the foyer/theater brand concept. Draws itself on
// first paint via stroke-dashoffset on the foyer outline, then the
// copper line scales from center, then the theater rect slides in.
// ~900ms total. Static after.
//
// Used in the nav (replacing the "mj" typographic wordmark) and on the
// hero of /. Sized via CSS height, aspect ratio preserved.
import type { CSSProperties } from "react";

interface MarkProps {
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function Mark({ height = 28, className = "", style }: MarkProps) {
  return (
    <svg
      viewBox="0 0 80 40"
      height={height}
      width={(typeof height === "number" ? height * 2 : "auto") as never}
      className={`brand-mark ${className}`.trim()}
      style={style}
      role="img"
      aria-label="Micah Jones"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        className="brand-mark__rect brand-mark__rect--foyer"
        x="1"
        y="1"
        width="36"
        height="38"
        fill="transparent"
      />
      <line className="brand-mark__divider" x1="40" y1="2" x2="40" y2="38" />
      <rect
        className="brand-mark__rect brand-mark__rect--theater"
        x="43"
        y="0"
        width="37"
        height="40"
      />
    </svg>
  );
}
