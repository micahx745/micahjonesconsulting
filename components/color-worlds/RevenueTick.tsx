// components/color-worlds/RevenueTick.tsx
//
// Revenue + exits — Editorial Index (Pass-9).
//
// Replaces the Pass-8 figure + two-card layout (which lived in two
// different design registers). New pattern: contents-page index —
// figure → dek → numbered exits as editorial entries with right-
// aligned date column. One type vocabulary; the hand-circle around
// the figure is the section's only mark.
//
// Layout:
//   $20M+         in client revenue across a decade.
//                 Two exits at companies I helped build.
//   ──────────────────────────────────────────────────────
//   01.  GUARDICORE → AKAMAI               Acquired · Oct 2021
//        Zero-trust micro-segmentation. Positioning research that
//        moved average deal size $150K — the engagement that built
//        the acquisition narrative.
//   ──────────────────────────────────────────────────────
//   02.  TECHVALIDATE → SURVEYMONKEY       IPO · Sep 2018
//        Customer evidence platform. Acquired by SurveyMonkey 2015;
//        public on Nasdaq 2018. Held equity through the IPO.
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
      {/* Figure — hand-drawn circle wraps the numeric for editorial weight */}
      <header className="cw-rev__head">
        <p className="cw-rev__figure">
          <span className="cw-rev__tick-wrap">
            <span className="cw-rev__tick" aria-hidden>
              {display}
            </span>
            <span className="cw-sr-only">twenty million dollars or more</span>
            <span className="cw-rev__tick-circle" aria-hidden>
              <HandCircle variant={1} delay={0.4} color="currentColor" />
            </span>
          </span>
        </p>
        <p className="cw-rev__dek">
          in client revenue across a decade.
          <br />
          Two exits at companies I helped build.
        </p>
      </header>

      <ol className="cw-rev__index" aria-label="Two exits">
        <li className="cw-rev__entry">
          <p className="cw-rev__num" aria-hidden>01.</p>
          <div className="cw-rev__entry-main">
            <p className="cw-rev__deal">
              <strong>Guardicore</strong>
              <span className="cw-rev__arrow" aria-hidden>→</span>
              <strong>Akamai</strong>
            </p>
            <p className="cw-rev__note">
              Zero-trust micro-segmentation. Positioning research that moved
              average deal size $150K — the engagement that built the
              acquisition narrative.
            </p>
          </div>
          <p className="cw-rev__when">
            <span className="cw-rev__when-kind">Acquired</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">Oct 2021</span>
          </p>
        </li>

        <li className="cw-rev__entry">
          <p className="cw-rev__num" aria-hidden>02.</p>
          <div className="cw-rev__entry-main">
            <p className="cw-rev__deal">
              <strong>TechValidate</strong>
              <span className="cw-rev__arrow" aria-hidden>→</span>
              <strong>SurveyMonkey</strong>
            </p>
            <p className="cw-rev__note">
              Customer evidence platform. Acquired by SurveyMonkey 2015;
              public on Nasdaq 2018. Held equity through the IPO.
            </p>
          </div>
          <p className="cw-rev__when">
            <span className="cw-rev__when-kind">IPO</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">Sep 2018</span>
          </p>
        </li>
      </ol>
    </div>
  );
}
