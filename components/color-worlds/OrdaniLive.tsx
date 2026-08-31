// components/color-worlds/OrdaniLive.tsx
//
// Pass-13 — THE FLOW (operator: "show an active flow of these value
// props using ordani components... the pic shows something that seems
// like a birth worker working - while we have moving animations of the
// component doing something").
//
// The photo now shows the work itself: a doula supporting a laboring
// client (rebozo over the shoulder — a real doula tool). The panel is
// one flow that EXECUTES on a loop while she never touches a screen:
//   header  "Right now, at a birth" + the ticking timer
//   step 1  Contraction logged                (the scene, in the app)
//   step 2  Invoice paid · $450 — fee $0      (the 0% prop, happening)
//   step 3  Intake signed · chart updated     (the bundle, happening)
//   close   "She never left the room."
// A connector line draws downward as each step completes — the flow
// made literal. Glass recipe unchanged from the Ember spec.
//
// D-R18 live zone. Reduced motion: full flow rendered complete and
// static; the timer keeps ticking (content). aria-hidden illustrative
// UI; no person names.
"use client";

import { useEffect, useRef, useState } from "react";

const TIMER_START = 3 * 3600 + 12 * 60 + 44;
const BEAT_MS = 2600;

const STEPS = [
  {
    title: "Contraction logged",
    sub: "9:41 pm · 4 min apart",
  },
  {
    title: "Invoice paid — $450",
    sub: "Fee taken: $0. Others take 17–20%.",
  },
  {
    title: "Intake signed, chart updated",
    sub: "One login. $200–500 of software.",
  },
] as const;

function fmt(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function OrdaniLive() {
  const [seconds, setSeconds] = useState(TIMER_START);
  // 0..STEPS.length: how many steps have completed. STEPS.length holds
  // the finished frame (close line visible), then the loop resets.
  const [done, setDone] = useState(0);
  const [entered, setEntered] = useState(false);
  const doneRef = useRef(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setEntered(true);
      setDone(STEPS.length);
      return () => window.clearInterval(t);
    }

    let stepTimer: number | undefined;
    const el = rootRef.current;
    const start = () => {
      setEntered(true);
      stepTimer = window.setInterval(() => {
        // ...3 -> hold one beat -> reset to 0 -> 1 -> 2 -> 3...
        doneRef.current =
          doneRef.current >= STEPS.length + 1 ? 0 : doneRef.current + 1;
        setDone(Math.min(doneRef.current, STEPS.length));
      }, BEAT_MS);
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
      if (stepTimer) window.clearInterval(stepTimer);
    };
  }, []);

  return (
    <div ref={rootRef} className={`cw-ember__ui${entered ? " is-in" : ""}`}>
      <div className="cw-ember__col" aria-hidden>
        {/* THE FLOW PANEL */}
        <div className="cw-ember__glass cw-ember__card cw-flow" style={{ "--card-i": 0 } as React.CSSProperties}>
          <div className="cw-flow__head">
            <span className="cw-ember__dot" />
            <span className="cw-flow__headlbl">Right now, at a birth</span>
            <span className="cw-flow__digits">{fmt(seconds)}</span>
          </div>

          <ol className="cw-flow__steps">
            {STEPS.map((step, i) => {
              const state =
                done > i ? "is-done" : done === i ? "is-next" : "";
              return (
                <li key={step.title} className={`cw-flow__step ${state}`}>
                  <span className="cw-flow__rail">
                    <span className="cw-flow__node">
                      <span className="cw-flow__check">✓</span>
                    </span>
                    {i < STEPS.length - 1 && (
                      <span className="cw-flow__line">
                        <span className="cw-flow__linefill" />
                      </span>
                    )}
                  </span>
                  <span className="cw-flow__body">
                    <span className="cw-flow__title">{step.title}</span>
                    <span className="cw-flow__sub">{step.sub}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <p className={`cw-flow__close${done >= STEPS.length ? " is-on" : ""}`}>
            She never left the room.
          </p>
        </div>

        {/* Conversion point — opaque bone, unchanged. */}
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
