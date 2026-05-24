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
            <div className="cw-rev__note">
              <p>
                A category saturated with honeypots and no real
                visibility into the network. Repositioned the platform
                from honeypot-lead to{" "}
                <strong>visibility + east-west microsegmentation</strong>{" "}
                — letting enterprise security teams see and defend
                lateral traffic, not just the perimeter.
              </p>
              <p>
                The repositioned platform reached the procurement
                committees that actually write the security checks:{" "}
                <strong>TD Bank</strong>'s trading systems,{" "}
                <strong>Deutsche Bank</strong>'s clearing infrastructure,{" "}
                <strong>NIH</strong> research environments,{" "}
                <strong>Peoples Natural Gas</strong>'s operational tech.
                Trillions in digital assets sat behind the deployments.
                Akamai acquired shortly after.
              </p>
            </div>
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
            <div className="cw-rev__note">
              <p>
                SurveyMonkey customers had survey results but no way to
                act on them. Built the{" "}
                <strong>customer-evidence engine</strong> that turned
                raw survey data into the asset enterprise procurement
                actually pays for — visible proof of customer outcomes,
                queryable by sales and CS teams.
              </p>
              <p>
                Moved average enterprise deal size up. Anchored the
                Nasdaq IPO. Equity held through.
              </p>
            </div>
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
