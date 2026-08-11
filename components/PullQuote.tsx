// components/PullQuote.tsx
//
// Phase 7 — CASE-08. Source Serif 4 italic pull quote with copper underline-
// grow animation that fires on scroll-into-view. Uses IntersectionObserver +
// CSS transitions — NO GSAP. GSAP imports remain quarantined to
// components/TitleCard.tsx (.claude/CLAUDE.md line 33).
//
// D10 (operator-locked 2026-08, R9 remediation): the underline was a flat
// 2px scaleX bar — off-voice next to the hand-drawn family used elsewhere
// (components/hand/HandCircle, HandUnderline). Re-voiced as an irregular
// SVG stroke in the same pen-line style (path lifted from
// components/hand/HandUnderline's variant-1 curve, read-only reference —
// see .claude/CLAUDE.md "GSAP only in TitleCard/view-transitions" and the
// house rule against a second signature interaction: this is a re-skin of
// the EXISTING underline-grow gesture, not a new one).
//
// The draw is wired to the existing data-in-view IntersectionObserver
// below (not a second, independent observer) via the SVG `pathLength="1"`
// trick: the path's length is normalized to 1 unit, so a constant
// stroke-dasharray + CSS-driven stroke-dashoffset (in globals.css, keyed
// off [data-in-view="true"]) draws it on with no JS length measurement.
//
// Reduced-motion: skips the observer; renders with the final-state underline
// applied immediately. Reinforced in CSS via @media (prefers-reduced-motion:
// reduce) — two-layer safety net (parallels TitleCard's MOT-05 pattern).
//
// Source: REQUIREMENTS.md CASE-08; blueprint §9 ORDANI wireframe
// ("Pull quote has a 2-second copper underline-grow on enter").
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface PullQuoteProps {
  children: ReactNode;
  /** Attribution line (e.g., "beta user, name withheld"). Optional. */
  attribution?: string;
  /**
   * Accent for the underline-grow bar. Defaults to copper.
   * Sage is permitted ONLY inside /work/ordani (per blueprint §4b + TOKEN-05).
   * Other case studies should leave this unset.
   */
  accentColor?: "copper" | "sage";
}

export function PullQuote({
  children,
  attribution,
  accentColor = "copper",
}: PullQuoteProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // MOT-05-style guard: reduced-motion users render with the final-state
    // underline immediately. Skip the observer.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className="case-study-pull-quote"
      data-in-view={inView ? "true" : "false"}
      data-accent={accentColor}
    >
      <blockquote className="case-study-pull-quote__quote">
        {children}
        {/* Hand-drawn underline-grow — irregular pen-line path (same curve
            family as components/hand/HandUnderline variant 1), drawn via
            pathLength="1" + CSS stroke-dashoffset keyed off the figure's
            data-in-view attribute. aria-hidden: decorative only. */}
        <svg
          className="case-study-pull-quote__underline"
          viewBox="0 0 1000 18"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 3 9 C 80 8, 200 10, 320 9 S 540 10, 720 9 S 920 8, 997 9"
            pathLength={1}
            fill="none"
            stroke="var(--color-accent-copper)"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </blockquote>
      {attribution ? (
        <figcaption className="case-study-pull-quote__attribution">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
