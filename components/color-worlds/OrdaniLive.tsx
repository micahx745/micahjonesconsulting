// components/color-worlds/OrdaniLive.tsx
//
// Pass-14 — SEPARATE FLOWS + THE GHOST CURSOR (operator: "show them
// separate but it show like a mouse clicking on one flow and doing it.
// and make the components more realistic towards each flow... maybe the
// payment flow for getting paid via medicare and showing a full amount
// being paid to the doula with no fees from us").
//
// The panel is now a mini product tour: three flows listed as real rows
// (Get paid · Client intake · Birth tracking), a ghost cursor moves in,
// clicks "Get paid", and that flow RUNS as realistic app UI — a
// Medicaid claim goes Processing -> Approved, then the payout breakdown
// lands: $450.00 to the doula, $0.00 to Ordani. Close: "Full amount.
// No platform fee." Then the loop resets.
//
// NOTE (facts): the operator said "medicare"; state doula benefits run
// through MEDICAID, so the UI says Medicaid pending his confirmation —
// flagged in the session log. Amounts are the established $450 demo
// figure. No person names. D-R18 live zone; reduced motion renders the
// finished payout screen, static, timer still ticking.
"use client";

import { useEffect, useRef, useState } from "react";

const TIMER_START = 3 * 3600 + 12 * 60 + 44;

// Phase timeline (ms). idle -> cursor travels -> hover -> click ->
// claim -> approved -> payout -> close+hold -> reset.
const PHASES = [800, 900, 350, 450, 1900, 1600, 2200, 2600] as const;

const FLOWS = [
  { key: "pay", label: "Get paid", meta: "Medicaid + private pay" },
  { key: "intake", label: "Client intake", meta: "forms + HIPAA consent" },
  { key: "track", label: "Birth tracking", meta: "contractions + vitals" },
] as const;

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OrdaniLive() {
  const [seconds, setSeconds] = useState(TIMER_START);
  const [phase, setPhase] = useState(0);
  const [entered, setEntered] = useState(false);
  const phaseRef = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setEntered(true);
      setPhase(7); // finished payout screen, static
      return () => window.clearInterval(t);
    }

    let timeout: number | undefined;
    const step = () => {
      const dur = PHASES[phaseRef.current] ?? 800;
      timeout = window.setTimeout(() => {
        phaseRef.current = (phaseRef.current + 1) % PHASES.length;
        setPhase(phaseRef.current);
        step();
      }, dur);
    };
    const el = rootRef.current;
    const start = () => {
      setEntered(true);
      step();
    };
    if (!el) start();
    else {
      const io = new IntersectionObserver(
        (es) => {
          if (es[0]?.isIntersecting) {
            start();
            io.disconnect();
          }
        },
        { threshold: 0.12 },
      );
      io.observe(el);
    }
    return () => {
      window.clearInterval(t);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  const paySelected = phase >= 3;
  const screenOpen = phase >= 4; // one beat after the click, so the cream screen never shows empty
  const clicking = phase === 3;
  const hovering = phase === 2 || phase === 3;
  const claimVisible = phase >= 4;
  const approved = phase >= 5;
  const payoutVisible = phase >= 6;
  const closed = phase >= 7;

  return (
    <div ref={rootRef} className={`cw-ember__ui${entered ? " is-in" : ""}`}>
      <div className="cw-ember__col" aria-hidden>
        <div
          className={`cw-ember__glass cw-ember__card cw-tour cw-tour--p${phase}`}
          style={{ "--card-i": 0 } as React.CSSProperties}
        >
          {/* header: the birth continues while the business runs */}
          <div className="cw-tour__head">
            <span className="cw-ember__dot" />
            <span className="cw-tour__headlbl">Active birth</span>
            <span className="cw-tour__digits">{fmt(seconds)}</span>
          </div>

          {/* THE FLOWS — separate, real rows. Cursor picks one. */}
          <div className="cw-tour__flows">
            {FLOWS.map((f) => {
              const isPay = f.key === "pay";
              const cls = [
                "cw-tour__flow",
                isPay && hovering ? "is-hover" : "",
                isPay && paySelected ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <div key={f.key} className={cls}>
                  <span className="cw-tour__flowlbl">{f.label}</span>
                  <span className="cw-tour__flowmeta">{f.meta}</span>
                </div>
              );
            })}
          </div>

          {/* THE SCREEN — the selected flow runs as realistic app UI. */}
          <div className={`cw-tour__screen${screenOpen ? " is-open" : ""}`}>
            <div className={`cw-tour__claim${claimVisible ? " is-in" : ""}`}>
              <div className="cw-tour__row">
                <span className="cw-tour__rowlbl">Medicaid claim</span>
                <span className="cw-tour__amt">$450.00</span>
              </div>
              <span
                className={`cw-tour__pill${approved ? " is-approved" : ""}`}
              >
                {approved ? "Approved" : "Processing"}
              </span>
            </div>

            <div className={`cw-tour__payout${payoutVisible ? " is-in" : ""}`}>
              <div className="cw-tour__line">
                <span>Deposit to doula</span>
                <span className="cw-tour__amt">$450.00</span>
              </div>
              <div className="cw-tour__line cw-tour__line--fee">
                <span>Ordani fee</span>
                <span className="cw-tour__amt">$0.00</span>
              </div>
              <div className="cw-tour__line cw-tour__line--total">
                <span>She keeps</span>
                <span className="cw-tour__amt">$450.00</span>
              </div>
            </div>

            <p className={`cw-tour__close${closed ? " is-on" : ""}`}>
              Full amount. No platform fee.
            </p>
          </div>

          {/* THE GHOST CURSOR */}
          <span className={`cw-tour__cursor${clicking ? " is-click" : ""}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path
                d="M5 3l14 8-6.5 1.5L16 19l-3 1.4-3.4-6.6L5 18z"
                fill="#ECE3D0"
                stroke="#2A1F18"
                strokeWidth="1.4"
              />
            </svg>
            <span className="cw-tour__ripple" />
          </span>
        </div>

        <a
          href="/work/ordani"
          className="cw-ember__card cw-ember__cta"
          style={{ "--card-i": 1 } as React.CSSProperties}
        >
          See how it was built
          <span className="cw-ember__arr" aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
