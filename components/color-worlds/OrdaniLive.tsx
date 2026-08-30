// components/color-worlds/OrdaniLive.tsx
//
// Pass-11 — the ACTUAL Auxon grammar (full shot finally studied):
//   • frosted-glass panels the photo bleeds through (backdrop blur,
//     low-alpha tint, 1px light border, 20px radius) — never solid cards
//   • big stat numerals + small labels + delta-style chips
//   • dashed leader-line ANNOTATIONS pointing into the scene itself —
//     Auxon labels the cyclist; we label the paper intake on the couch
//   • a REC-style timer pill in the panel's top corner
//
// Content stays the operator's value props (D-R19): 0% invoicing vs the
// 17–20% cut, and the $200–500 bundle. D-R18 live zone: bars grow,
// checklist ticks, timer ticks, leader lines draw. Reduced motion =
// complete story, static. aria-hidden; no person names.
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
  const [ticked, setTicked] = useState(0);
  const [grown, setGrown] = useState(false);
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
    const g = window.setTimeout(() => setGrown(true), 800);
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
      {/* REC-style timer pill — Auxon's ● 00:18:24, ours is a birth. */}
      <div className="cw-odemo__rec">
        <span className="cw-odemo__pulse" />
        Active birth · <span className="cw-odemo__rectime">{fmt(seconds)}</span>
      </div>

      {/* SCENE ANNOTATIONS — dashed leaders into the photograph. */}
      <div className="cw-odemo__note cw-odemo__note--paper">
        <span className="cw-odemo__notelbl">
          The old way: <strong>paper intake</strong>
        </span>
        <span className="cw-odemo__leader" />
      </div>
      <div className="cw-odemo__note cw-odemo__note--client">
        <span className="cw-odemo__leader cw-odemo__leader--left" />
        <span className="cw-odemo__notelbl">
          Week 32 · <strong>full-spectrum care</strong>
        </span>
      </div>

      {/* GLASS STACK — right rail, photo bleeding through. */}
      <div className="cw-odemo__stack">
        {/* Fee card: big numeral + label + delta chip, Auxon-style. */}
        <div className="cw-odemo__glass cw-odemo__glass--fee">
          <div className="cw-odemo__stat">
            <span className="cw-odemo__big">0%</span>
            <span className="cw-odemo__statlbl">
              invoicing fee
              <span className="cw-odemo__delta">Ordani</span>
            </span>
          </div>
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
          </div>
          <p className="cw-odemo__foot">Doulas keep thousands more a year.</p>
        </div>

        {/* Bundle card: ticking checklist + value chip. */}
        <div className="cw-odemo__glass cw-odemo__glass--bundle">
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
      </div>
    </div>
  );
}
