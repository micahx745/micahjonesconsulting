// components/color-worlds/OrdaniLive.tsx
//
// Pass-8 (operator: "i like the float components and have animations
// moving like someone is doing stuff in the app") — floating glass UI
// fragments over the Ordani section's dashboard ground, animating as if
// a practice is being run right now. The SyncDepth reference grammar:
// glass cards with live data floating on imagery.
//
// D-R18: this is the site's ONE sanctioned zone of ambient motion — an
// explicit operator override of the nothing-idles discipline, scoped to
// this component only. Under prefers-reduced-motion everything renders
// static: timer frozen, no pulse, a single unanimated toast.
//
// Content rules: NO person names, no invented client identities — only
// the app's own vocabulary (visits, intakes, invoices, the tracker).
// These fragments are illustrative UI, aria-hidden from assistive tech;
// the section's real copy carries the claims.
"use client";

import { useEffect, useRef, useState } from "react";

const TOASTS = [
  { icon: "✓", text: "Invoice paid", meta: "$450 · package 2 of 3" },
  { icon: "✎", text: "Intake form signed", meta: "HIPAA consent · complete" },
  { icon: "＋", text: "New client added", meta: "prenatal · week 22" },
  { icon: "✓", text: "Visit confirmed", meta: "tomorrow · 12:07 pm" },
] as const;

// Timer starts mid-labor — a birth in progress, not a stopwatch demo.
const TIMER_START_SECONDS = 3 * 3600 + 12 * 60 + 44;

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OrdaniLive() {
  const [seconds, setSeconds] = useState(TIMER_START_SECONDS);
  const [toastIdx, setToastIdx] = useState(0);
  const [toastOn, setToastOn] = useState(true);
  const reducedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    reducedRef.current = reduced;
    if (reduced) return; // static frame: initial timer value, first toast

    // The labor timer ticks every second — the single clearest "someone
    // is in the app right now" signal, and it costs one state write.
    const tick = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // Toast lifecycle: visible 3.2s, gone 0.9s, then the next event.
    let cycle: number;
    const show = window.setInterval(() => {
      setToastOn(false);
      cycle = window.setTimeout(() => {
        setToastIdx((i) => (i + 1) % TOASTS.length);
        setToastOn(true);
      }, 900);
    }, 4100);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(show);
      window.clearTimeout(cycle);
    };
  }, []);

  const toast = TOASTS[toastIdx % TOASTS.length]!;

  return (
    <div className="cw-olive" aria-hidden>
      {/* Card 1 — the birth tracker, ticking. */}
      <div className="cw-olive__card cw-olive__card--tracker cw-reveal">
        <span className="cw-olive__dot" />
        <span className="cw-olive__k">Active birth</span>
        <span className="cw-olive__timer">{fmt(seconds)}</span>
        <span className="cw-olive__meta">contractions logged · 4 min apart</span>
      </div>

      {/* Card 2 — today's schedule, one visit confirming itself. */}
      <div
        className="cw-olive__card cw-olive__card--sched cw-reveal"
        style={{ transitionDelay: "140ms" }}
      >
        <span className="cw-olive__k">Today</span>
        <span className="cw-olive__row">
          <span>Prenatal visit</span>
          <span className="cw-olive__time">12:07 pm</span>
        </span>
        <span className="cw-olive__row">
          <span>Postpartum check</span>
          <span className="cw-olive__time">3:30 pm</span>
        </span>
        <span className="cw-olive__badge">
          <span className="cw-olive__check">✓</span> confirmed
        </span>
      </div>

      {/* Card 3 — the activity toast, cycling app events. */}
      <div
        className={`cw-olive__card cw-olive__card--toast cw-reveal${toastOn ? " is-on" : ""}`}
        style={{ transitionDelay: "280ms" }}
      >
        <span className="cw-olive__toasticon">{toast.icon}</span>
        <span className="cw-olive__toastbody">
          <span className="cw-olive__toasttext">{toast.text}</span>
          <span className="cw-olive__meta">{toast.meta}</span>
        </span>
      </div>
    </div>
  );
}
