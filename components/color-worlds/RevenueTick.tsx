// components/color-worlds/RevenueTick.tsx
//
// Animated count-up for the revenue line in the Clients section.
// On scroll-into-view, ticks from $0 to $17M+ over 2.4s with ease-out.
//
// The figure is the operator's contribution to direct revenue across
// the 2013-2023 decade (per his own attestation). The "+" softens
// over-precision — we're attesting to magnitude, not auditing a
// specific deal.
//
// The "Two exits" line below is part of the same block; we render it
// here so the credibility moment lives in one component.
"use client";

import { useEffect, useRef, useState } from "react";

const TARGET = 17_000_000;
const DURATION_MS = 2400;

/** Format value as "$X.XM+" with one decimal when mid-flight,
 *  no decimal at exact target so the rest pose is clean. */
function format(v: number, atTarget: boolean): string {
  const millions = v / 1_000_000;
  if (atTarget) return `$${Math.round(millions)}M+`;
  return `$${millions.toFixed(1)}M`;
}

export function RevenueTick() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState("$0.0M");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function runTick() {
      if (reduced) {
        setDisplay(format(TARGET, true));
        setDone(true);
        return;
      }

      const start = performance.now();
      let raf = 0;

      function step(now: number) {
        const t = Math.min((now - start) / DURATION_MS, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        const v = eased * TARGET;
        const isDone = t >= 1;
        setDisplay(format(v, isDone));
        if (isDone) {
          setDone(true);
          return;
        }
        raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);

      return () => cancelAnimationFrame(raf);
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
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cw-rev cw-reveal" ref={rootRef}>
      <p className="cw-revline">
        <span
          className="cw-rev-tick"
          aria-label="17 million dollars or more"
        >
          {display}
          {done ? "" : ""}
        </span>{" "}
        <span className="cw-rev-trail">in revenue, generated.</span>
      </p>
      <p className="cw-rev-exits">
        Two exits.{" "}
        <strong>Guardicore</strong> <span aria-hidden>→</span>{" "}
        <strong>Akamai</strong>
        <span className="cw-rev-exits-sep" aria-hidden>
          {" / "}
        </span>
        <strong>TheValidate</strong> <span aria-hidden>→</span>{" "}
        <strong>SurveyMonkey</strong>.
      </p>
    </div>
  );
}
