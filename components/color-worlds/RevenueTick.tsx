// components/color-worlds/RevenueTick.tsx
//
// Revenue + exits — Editorial Index (Pass-17 story-form rework).
//
// Pass-9 introduced the contents-page editorial index pattern. Pass-12
// reworked copy abstract-but-enticing. Pass-16 added the named
// institutional customer list and bumped the figure scale.
//
// Pass-17 problem (operator review): the customers were surfaced as a
// flat list — "Customers: TD Bank, Deutsche Bank, NIH, Peoples Natural
// Gas." — which reads as a name-drop and doesn't entice the reader to
// click through to the case study.
//
// Pass-17 fix: customers are embedded as STORY texture inside the body
// prose. Each customer name carries what it protects (TD Bank's trading
// systems, Deutsche Bank's clearing infrastructure, etc.) so the
// list-feel becomes a narrative-feel. The body now reads as the
// abridged version of the case study — designed to pull the reader
// in, not to summarize.
//
// .cw-rev__customers element is removed; both customer + outcome
// content lives inside .cw-rev__note as two paragraphs separated by a
// css margin.
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
          {/* Pass-26 (operator cowork review): elevated the dek register
              and reworked the trillions line to first-person ownership
              ("protected behind my work") per operator direction. */}
          in client revenue. A decade of it.{" "}
          <strong>Trillions in assets protected behind my work.</strong>
        </p>
        {/* Pass-27 (operator cowork review): exits line — lands after the
            HandCircle finishes its full draw arc. HandCircle delay=0.4s,
            draw=1100ms (primary completes at 1.5s); overshoot fires at
            0.4+0.95=1.35s and completes at 1.35+1.1=2.45s. Transition-
            delay 2500ms lets the overshoot settle before the text arrives.
            The existing .cw-reveal → .is-in system handles reduced-motion
            (opacity is 1, transition: none at the reduced rule). */}
        <p className="cw-rev__exits-line cw-reveal">
          Three companies I helped build. An IPO and two acquisitions.
        </p>
      </header>

      <ol className="cw-rev__index" aria-label="Three exits">
        <li className="cw-rev__entry">
          <p className="cw-rev__num" aria-hidden>01.</p>
          <div className="cw-rev__entry-main">
            <p className="cw-rev__deal">
              <strong>Guardicore</strong>
              <span className="cw-rev__arrow" aria-hidden>→</span>
              <strong>Akamai</strong>
            </p>
            <div className="cw-rev__note">
              <p>
                Sales manager in a category saturated with honeypots. I
                generated <strong>$80M in pipeline</strong> and{" "}
                <strong>$14M in revenue</strong>, and ran the market
                research that repositioned the platform around{" "}
                <strong>visibility + east-west microsegmentation</strong>.
              </p>
              <p>
                From those findings I ran a microsegmentation pilot with
                a top-10 North American bank. The repositioned platform
                reached a global systemically important bank, the
                world&rsquo;s largest public biomedical-research funder,
                and a white-shoe Wall Street law firm. Akamai acquired
                shortly after.
              </p>
            </div>
          </div>
          {/* Pass-27 (operator cowork review): data-kind attribute added
              so CSS can target the kind label for elevated weight. */}
          <p className="cw-rev__when" data-kind="acquired">
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
            <div className="cw-rev__note">
              <p>
                Enterprise sales on the team that took SurveyMonkey
                public. I contributed{" "}
                <strong>over $1M in revenue</strong> toward the IPO.
              </p>
              <p>
                I worked the field and brought what I learned back to the
                product team and founders. Field signal from the
                enterprise deals, straight to the people building it.
              </p>
            </div>
          </div>
          {/* Pass-27 (operator cowork review): data-kind attribute added
              so CSS can target the kind label for elevated weight. */}
          <p className="cw-rev__when" data-kind="ipo">
            <span className="cw-rev__when-kind">IPO</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">2018</span>
          </p>
        </li>

        {/* Pass-29 (operator: third exit confirmed): Neuton.AI -> Nordic
            Semiconductor, June 2025 (nordicsemi.com press release). Framed
            "helped launch" — no cap-table claim, unlike Guardicore/SM. */}
        <li className="cw-rev__entry">
          <p className="cw-rev__num" aria-hidden>03.</p>
          <div className="cw-rev__entry-main">
            <p className="cw-rev__deal">
              <strong>Neuton.AI</strong>
              <span className="cw-rev__arrow" aria-hidden>→</span>
              <strong>Nordic Semiconductor</strong>
            </p>
            <div className="cw-rev__note">
              <p>
                I helped launch Neuton.AI — automated machine learning
                that builds models small enough to run on a
                microcontroller.
              </p>
              <p>
                Nordic Semiconductor, a public semiconductor company,
                acquired the technology in 2025.
              </p>
            </div>
          </div>
          <p className="cw-rev__when" data-kind="acquired">
            <span className="cw-rev__when-kind">Acquired</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">2025</span>
          </p>
        </li>
      </ol>
    </div>
  );
}
