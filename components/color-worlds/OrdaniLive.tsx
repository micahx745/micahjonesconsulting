// components/color-worlds/OrdaniLive.tsx
//
// Pass-10 — the Auxon/Wingly component grammar (operator's picks):
// rounded cards, big numerals, mini data-viz, pill chips, organic
// cluster offsets, on a FULL-COLOR photo ("its okay not to shade fade
// the pic. and let it live").
//
// Content = the operator's stated value props (2026-08-30):
//   1. Invoicing without the 17-20% cut other platforms take —
//      "saving doulas thousands of dollars a year."
//   2. $200-500 of software bundled into one place.
// Plus the active-birth timer, compact (the one piece that survived
// every round).
//
// D-R18 live zone: fee bars grow, the bundle checklist ticks through,
// the timer ticks. Reduced motion renders everything complete, static.
// aria-hidden illustrative UI; no person names anywhere.
"use client";

import { useEffect, useRef, useState } from "react";

const TIMER_START = 3 * 3600 + 12 * 60 + 44;
const BUNDLE = [
  "Invoicing",
  "Scheduling",
  "HIPAA forms",
  "Client records",
  "Birth tracking",
] as const;

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OrdaniLive() {
  const [seconds, setSeconds] = useState(TIMER_START);
  const [ticked, setTicked] = useState(0); // bundle items ticked so far
  const [grown, setGrown] = useState(false); // fee bars grown
  const [frozen, setFrozen] = useState(false);
  const tickedRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFrozen(true);
      setGrown(true);
      setTicked(BUNDLE.length);
      return;
    }
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    const g = window.setTimeout(() => setGrown(true), 700);
    // Checklist ticks one item at a time, then holds, then restarts.
    const c = window.setInterval(() => {
      tickedRef.current =
        tickedRef.current >= BUNDLE.length ? 0 : tickedRef.current + 1;
      setTicked(tickedRef.current);
    }, 1100);
    return () => {
      window.clearInterval(t);
      window.clearTimeout(g);
      window.clearInterval(c);
    };
  }, []);

  return (
    <div className={`cw-odemo${frozen ? " is-frozen" : ""}`} aria-hidden>
      {/* CARD 1 — the fee story. Big numeral + comparison bars. */}
      <div className="cw-odemo__card cw-odemo__card--fee">
        <p className="cw-odemo__k">Invoicing fee</p>
        <p className="cw-odemo__big">
          0<span className="cw-odemo__pct">%</span>
        </p>
        <div className="cw-odemo__bars">
          <div className="cw-odemo__barrow">
            <span className="cw-odemo__barlbl">Other platforms</span>
            <span className="cw-odemo__bartrack">
              <span
                className={`cw-odemo__barfill cw-odemo__barfill--them${grown ? " is-grown" : ""}`}
              />
            </span>
            <span className="cw-odemo__barval">17–20%</span>
          </div>
          <div className="cw-odemo__barrow">
            <span className="cw-odemo__barlbl">Ordani</span>
            <span className="cw-odemo__bartrack">
              <span
                className={`cw-odemo__barfill cw-odemo__barfill--us${grown ? " is-grown" : ""}`}
              />
            </span>
            <span className="cw-odemo__barval cw-odemo__barval--us">0%</span>
          </div>
        </div>
        <p className="cw-odemo__foot">
          Doulas keep thousands more a year.
        </p>
      </div>

      {/* CARD 2 — the bundle. Checklist ticks; value chip. */}
      <div className="cw-odemo__card cw-odemo__card--bundle">
        <p className="cw-odemo__k">One login replaces</p>
        <ul className="cw-odemo__list">
          {BUNDLE.map((item, i) => (
            <li
              key={item}
              className={`cw-odemo__item${i < ticked ? " is-on" : ""}`}
            >
              <span className="cw-odemo__box">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <span className="cw-odemo__chip">$200–500 of software</span>
      </div>

      {/* CARD 3 — the live timer, compact. */}
      <div className="cw-odemo__card cw-odemo__card--live">
        <span className="cw-odemo__pulse" />
        <span className="cw-odemo__livek">Active birth</span>
        <span className="cw-odemo__timer">{fmt(seconds)}</span>
      </div>
    </div>
  );
}
