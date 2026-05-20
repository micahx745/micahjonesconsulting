// components/color-worlds/RevenueTick.tsx
//
// Revenue + exits credibility moment — redesigned per operator
// feedback (Pass-6/7): more animated, more visual weight, combined
// revenue + exits in one layout. $20M+ figure (up from $17M).
//
// Layout:
//   [$20M+] in client revenue.        ← animated count-up
//   Two exits.                        ← hand-drawn underline beneath
//
//   ┌─────────────────────────┐  ┌─────────────────────────┐
//   │ ACQUIRED · 2021         │  │ IPO · 2018              │
//   │ Guardicore → Akamai     │  │ TechValidate → S'Monkey │
//   │ Zero-trust security     │  │ Customer evidence       │
//   └─────────────────────────┘  └─────────────────────────┘
//
// The exits go from prose to two cards — Akamai acquisition (2021)
// and SurveyMonkey IPO (2018, after acquiring TechValidate in 2015).
// Each card has the deal-type label, the deal name, the operator's
// involvement, and a small marginalia arrow.
//
// rAF cancellation on unmount per Pass-4 fix.
// SSR floor is "$20M+" (never $0) per Pass-5 fix.
"use client";

import { useEffect, useRef, useState } from "react";
import { HandCircle } from "@/components/hand/HandCircle";

const TARGET = 20_000_000;
const DURATION_MS = 2400;
const REST_LABEL = "$20M+";

function format(v: number, atTarget: boolean): string {
  const millions = v / 1_000_000;
  if (atTarget) return `$${Math.round(millions)}M+`;
  return `$${millions.toFixed(1)}M`;
}

export function RevenueTick() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const [display, setDisplay] = useState(REST_LABEL);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    function runTick() {
      setDisplay(format(0, false));
      const start = performance.now();

      function step(now: number) {
        const t = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = eased * TARGET;
        const isDone = t >= 1;
        setDisplay(format(v, isDone));
        if (isDone) return;
        rafRef.current = requestAnimationFrame(step);
      }
      rafRef.current = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          runTick();
          observer.unobserve(root!);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="cw-rev cw-reveal" ref={rootRef}>
      {/* The number — hand-drawn circle wraps it for editorial emphasis */}
      <p className="cw-revline">
        <span className="cw-rev-tick-wrap">
          <span className="cw-rev-tick" aria-hidden>
            {display}
          </span>
          <span className="cw-sr-only">twenty million dollars or more</span>
          <span className="cw-rev-tick-circle" aria-hidden>
            <HandCircle variant={1} delay={0.4} color="currentColor" />
          </span>
        </span>{" "}
        <span className="cw-rev-trail">in client revenue.</span>
      </p>

      {/* Two-exits framing */}
      <p className="cw-rev-exits-label">Two exits.</p>

      <div className="cw-rev-cards">
        <article className="cw-rev-card">
          <p className="cw-rev-card__tag">Acquired · 2021</p>
          <p className="cw-rev-card__deal">
            <strong>Guardicore</strong> <span aria-hidden>→</span>{" "}
            <strong>Akamai</strong>
          </p>
          <p className="cw-rev-card__note">
            Zero-trust micro-segmentation. Positioning research that moved
            average deal size $150K — the engagement that built the
            acquisition narrative.
          </p>
        </article>

        <article className="cw-rev-card">
          <p className="cw-rev-card__tag">IPO · 2018</p>
          <p className="cw-rev-card__deal">
            <strong>TechValidate</strong> <span aria-hidden>→</span>{" "}
            <strong>SurveyMonkey</strong>
          </p>
          <p className="cw-rev-card__note">
            Customer evidence platform. Acquired by SurveyMonkey in 2015;
            went public on Nasdaq three years later. Cap-table position
            held through the bell-ringing.
          </p>
        </article>
      </div>
    </div>
  );
}
