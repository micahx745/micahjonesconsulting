// components/PullQuote.tsx
//
// Phase 7 — CASE-08. Source Serif 4 italic pull quote with copper underline-
// grow animation that fires on scroll-into-view (2s ease). Uses
// IntersectionObserver + CSS @keyframes — NO GSAP. GSAP imports remain
// quarantined to components/TitleCard.tsx (.claude/CLAUDE.md line 33).
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
      <blockquote className="case-study-pull-quote__quote">{children}</blockquote>
      {attribution ? (
        <figcaption className="case-study-pull-quote__attribution">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
