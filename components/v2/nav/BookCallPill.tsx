// v2 BookCallPill — champagne-outlined primary CTA. SVG border-trace on
// hover (segment-by-segment top→right→bottom→left). Button is clickable
// throughout the trace animation.
"use client";

import Link from "next/link";

export function BookCallPill({
  href = "/v2/contact",
  label = "Book intro call",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link href={href} className="v2-book-call-pill">
      <span className="v2-book-call-pill__label">{label}</span>
      <span className="v2-book-call-pill__arrow" aria-hidden>
        →
      </span>
      <svg
        className="v2-book-call-pill__trace"
        viewBox="0 0 200 44"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          x="0.5"
          y="0.5"
          width="199"
          height="43"
          rx="3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          pathLength="1"
        />
      </svg>
    </Link>
  );
}
