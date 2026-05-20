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
// components/color-worlds/RevenueTick.tsx
//
// Animated count-up for the revenue credibility line. SSR ships with
// "$17M+" as the resting state so JS-disabled + pre-hydration users see
// the actual claim, not "$0.0M". On mount (with JS, motion allowed),
// snap back to $0.0M and animate up to $17M+ when the section enters
// view. Static-by-default, animated-as-progressive-enhancement.
"use client";

import { useEffect, useRef, useState } from "react";

const TARGET = 17_000_000;
const DURATION_MS = 2400;
const REST_LABEL = "$17M+";

/** Format value as "$X.XM" mid-flight, "$XXM+" at rest. */
function format(v: number, atTarget: boolean): string {
  const millions = v / 1_000_000;
  if (atTarget) return `$${Math.round(millions)}M+`;
  return `$${millions.toFixed(1)}M`;
}

export function RevenueTick() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  // SSR floor — always show the credibility number, never zero.
  const [display, setDisplay] = useState(REST_LABEL);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return; // SSR floor is already correct; nothing to animate.

    // Snap back to zero before animating up — but only after we've
    // confirmed we're going to animate. If the observer never fires
    // (e.g. user never scrolls there), the SSR rest state stays.
    function runTick() {
      setDisplay(format(0, false));
      const start = performance.now();
      let raf = 0;

      function step(now: number) {
        const t = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        const v = eased * TARGET;
        const isDone = t >= 1;
        setDisplay(format(v, isDone));
        if (isDone) return;
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
        <span className="cw-rev-tick" aria-label="seventeen million dollars or more">
          {display}
        </span>{" "}
        <span className="cw-rev-trail">in revenue.</span>
      </p>
      <p className="cw-rev-exits">
        Two exits.{" "}
        <strong>Guardicore</strong> <span aria-hidden>→</span>{" "}
        <strong>Akamai</strong>
        <span className="cw-rev-exits-sep" aria-hidden>
          {" · "}
        </span>
        <strong>TechValidate</strong> <span aria-hidden>→</span>{" "}
        <strong>SurveyMonkey</strong>.
      </p>
    </div>
  );
}
