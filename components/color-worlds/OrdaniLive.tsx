// components/color-worlds/OrdaniLive.tsx
//
// Pass-9 (operator: small ghost-floats "look weird... use components that
// are larger doing things - real animations... websites have components
// that emulate someone doing something with that feature set").
//
// The Stripe/Linear product-demo grammar: ONE large, crisp, rebuilt
// piece of app UI in the foreground that performs a usage story on a
// loop. Three beats, ~4.6s each:
//   1. INTAKE  — fields fill themselves, consent ticks, SIGNED stamps.
//   2. VISIT   — a new appointment row arrives and confirms itself.
//   3. INVOICE — the status chip flips Pending → Paid.
// A labor timer ticks in the panel header the whole time.
//
// D-R18: the one sanctioned live-motion zone. Reduced motion freezes
// everything at a complete, legible frame (intake signed, visit
// confirmed, invoice paid, timer static).
//
// Content rules: app vocabulary only, no person names. aria-hidden —
// illustrative UI; the section's prose carries the claims.
"use client";

import { useEffect, useRef, useState } from "react";

const TIMER_START = 3 * 3600 + 12 * 60 + 44;
const BEAT_MS = 4600;

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OrdaniLive() {
  const [seconds, setSeconds] = useState(TIMER_START);
  const [beat, setBeat] = useState(0); // 0 intake · 1 visit · 2 invoice
  const [frozen, setFrozen] = useState(false);
  const beatRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFrozen(true); // complete story, no motion
      return;
    }
    const tick = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    const step = window.setInterval(() => {
      beatRef.current = (beatRef.current + 1) % 3;
      setBeat(beatRef.current);
    }, BEAT_MS);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(step);
    };
  }, []);

  // A beat is "done" once passed this cycle (or always, when frozen).
  const done = (b: number) => frozen || beat > b;
  const active = (b: number) => !frozen && beat === b;

  return (
    <div
      className={`cw-odemo${frozen ? " is-frozen" : ""} cw-odemo--beat${beat}`}
      aria-hidden
    >
      {/* Panel chrome — the app's own register: cream, serif greeting. */}
      <div className="cw-odemo__bar">
        <span className="cw-odemo__brand">
          <span className="cw-odemo__mark" /> Ordani
        </span>
        <span className="cw-odemo__timer">
          <span className="cw-odemo__pulse" />
          Active birth · {fmt(seconds)}
        </span>
      </div>

      {/* BEAT 1 — intake signing itself */}
      <div className={`cw-odemo__card${active(0) ? " is-live" : ""}`}>
        <p className="cw-odemo__k">Client intake</p>
        <div className="cw-odemo__field" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="cw-odemo__lbl">Due date</span>
          <span className="cw-odemo__val">Nov 14</span>
        </div>
        <div className="cw-odemo__field" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="cw-odemo__lbl">Care plan</span>
          <span className="cw-odemo__val">Full spectrum · 3 visits</span>
        </div>
        <div className="cw-odemo__field" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="cw-odemo__lbl">HIPAA consent</span>
          <span className="cw-odemo__val cw-odemo__tick">✓</span>
        </div>
        <span className="cw-odemo__stamp">Signed</span>
      </div>

      {/* BEAT 2 — a visit books and confirms */}
      <div className={`cw-odemo__card${active(1) ? " is-live" : ""}${done(0) || active(1) ? "" : " is-waiting"}`}>
        <p className="cw-odemo__k">Schedule</p>
        <div className="cw-odemo__row">
          <span>Prenatal visit</span>
          <span className="cw-odemo__time">Thu · 12:07 pm</span>
        </div>
        <div className={`cw-odemo__row cw-odemo__row--new${done(1) || active(1) ? " is-in" : ""}`}>
          <span>Postpartum check</span>
          <span className="cw-odemo__time">Fri · 3:30 pm</span>
        </div>
        <span className={`cw-odemo__badge${done(1) || active(1) ? " is-on" : ""}`}>
          ✓ confirmed
        </span>
      </div>

      {/* BEAT 3 — invoice flips to paid */}
      <div className={`cw-odemo__card${active(2) ? " is-live" : ""}${done(1) || active(2) ? "" : " is-waiting"}`}>
        <p className="cw-odemo__k">Invoice</p>
        <div className="cw-odemo__row">
          <span>Package 2 of 3</span>
          <span className="cw-odemo__amt">$450</span>
        </div>
        <span
          className={`cw-odemo__chip${done(2) || active(2) ? " is-paid" : ""}`}
        >
          {done(2) || active(2) ? "Paid" : "Pending"}
        </span>
      </div>
    </div>
  );
}
