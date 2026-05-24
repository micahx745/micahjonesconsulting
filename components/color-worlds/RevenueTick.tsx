// components/color-worlds/RevenueTick.tsx
//
// Revenue + exits — Editorial Index (Pass-12 copy rework).
//
// Pass-9 introduced the contents-page editorial index pattern.
// Pass-12 keeps the structure but reworks the body copy: operator
// said the entries read "weak" and "underwhelming next to the 20M."
// New direction is "abstract but enticing" — the body should make
// a buyer think "I want this person on my team" without revealing
// tactical specifics.
//
// Also: TechValidate dropped per operator. Bigger-name SurveyMonkey
// Enterprise framing for the IPO — accurate (TechValidate's tech became
// the SurveyMonkey Enterprise product line that anchored the IPO case)
// and doesn't dilute the recognizable brand. Equity-held narrative
// preserved.
//
// CSS bump (in globals.css): .cw-rev__deal scale moved from clamp(28,
// 3.4vw, 44) → clamp(36, 4.5vw, 64) so the deal names feel like peers
// to the $20M+ figure rather than subordinate cards.
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
          Two enterprise exits. Named institutional customers.
          <br />
          <strong>Trillions in digital assets secured.</strong>
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
              A category saturated with honeypots and no real visibility
              into the network. Repositioned the platform from
              honeypot-lead to <strong>visibility + east-west
              microsegmentation</strong> — letting enterprise security
              teams see and defend lateral traffic, not just the
              perimeter. The narrative that carried the enterprise sale
              and the Akamai acquisition.
            </p>
            <p className="cw-rev__customers">
              Customers: <strong>TD Bank</strong>,{" "}
              <strong>Deutsche Bank</strong>,{" "}
              <strong>NIH</strong>,{" "}
              <strong>Peoples Natural Gas</strong>.
            </p>
          </div>
          <p className="cw-rev__when">
            <span className="cw-rev__when-kind">Acquired</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">2021</span>
          </p>
        </li>

        <li className="cw-rev__entry">
          <p className="cw-rev__num" aria-hidden>02.</p>
          <div className="cw-rev__entry-main">
            <p className="cw-rev__deal">
              <strong>SurveyMonkey Enterprise</strong>
            </p>
            <p className="cw-rev__note">
              The customer-evidence engine inside SurveyMonkey
              Enterprise. The pain point: customers had survey results
              but no way to act on them. Built the positioning and
              tooling that turned survey data into{" "}
              <strong>actionable customer evidence</strong> — moving
              average enterprise deal size up and anchoring the
              Nasdaq IPO case. Equity held through.
            </p>
          </div>
          <p className="cw-rev__when">
            <span className="cw-rev__when-kind">IPO</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">2018</span>
          </p>
        </li>
      </ol>
    </div>
  );
}
