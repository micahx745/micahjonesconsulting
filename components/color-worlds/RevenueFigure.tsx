// Pass-114 (operator 2026-09-11, decision 4): the $20M+ figure counts once
// from $0M to $20M+ over 1200ms, and the hand circle closes after it, finishing
// at 2.65s. A recorded exception to DESIGN_BAR R13 and R15 — see
// brand.json motion.countup and the recorded-exception paragraph in
// .claude/CLAUDE.md. Not a second signature and not a precedent.
//
// CRITIQUE-110 LOW-7: the tick span renders with dangerouslySetInnerHTML and
// NO React children, so a re-render never reconciles against the text node
// that textContent replaced. All tick writes go through tickRef.current
// .textContent. React state changes exactly three times (play, instant) —
// never per frame.
"use client";

import { useEffect, useRef, useState } from "react";
import { HandCircle } from "@/components/hand/HandCircle";

const FINAL_TEXT = "$20M+";
const COUNT_MS = 1200;

export function RevenueFigure() {
  const tickRef = useRef<HTMLSpanElement | null>(null);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const stateRef = useRef<"waiting" | "armed" | "playing" | "done">("waiting");
  const rafRef = useRef(0);
  const [instant, setInstant] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const tick = tickRef.current;
    const wrap = wrapRef.current;
    if (!tick || !wrap) return;

    // Reduced motion, or the figure already in view / above at load (refresh,
    // deep link): the finished frame, and nothing else ever happens.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stateRef.current = "done";
      setInstant(true);
      return;
    }
    if (wrap.getBoundingClientRect().top < window.innerHeight) {
      stateRef.current = "done";
      setInstant(true);
      return;
    }

    // Arm observer: the extended root reaches one viewport below the fold, so
    // the figure arms before it is visible. A flick past upward finishes it.
    const armObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (
              stateRef.current === "waiting" &&
              entry.boundingClientRect.top >= window.innerHeight
            ) {
              tick.textContent = "$0M";
              setPlay(false);
              stateRef.current = "armed";
            } else if (
              stateRef.current === "waiting" &&
              entry.boundingClientRect.top < window.innerHeight
            ) {
              // Arrived already in view without ever arming: a single jump
              // from above the arm zone skips the extended root entirely, so
              // no not-intersecting callback can fire either. That is the
              // flick-past case (DIRECTION-110 premise 4) — settle finished.
              tick.textContent = FINAL_TEXT;
              setInstant(true);
              stateRef.current = "done";
            }
          } else if (
            stateRef.current === "armed" &&
            entry.boundingClientRect.bottom < 0
          ) {
            // Flicked past upward while armed: settle on the finished frame.
            tick.textContent = FINAL_TEXT;
            setInstant(true);
            stateRef.current = "done";
          }
        });
      },
      { rootMargin: "0px 0px 100% 0px", threshold: 0 },
    );

    // Play observer: half the figure visible starts the count. It only ever
    // starts or finishes the moment — never couples to scroll after it starts.
    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && stateRef.current === "armed") {
            stateRef.current = "playing";
            setPlay(true);
            const start = performance.now();
            const step = (now: number) => {
              const t = Math.min((now - start) / COUNT_MS, 1);
              const eased = 1 - (1 - t) ** 3;
              tick.textContent =
                t >= 1 ? FINAL_TEXT : `$${Math.round(eased * 20)}M`;
              if (t < 1) {
                rafRef.current = requestAnimationFrame(step);
              } else {
                stateRef.current = "done";
              }
            };
            rafRef.current = requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 },
    );

    armObserver.observe(wrap);
    playObserver.observe(wrap);

    return () => {
      cancelAnimationFrame(rafRef.current);
      armObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  return (
    <div className="cw-rec">
      <p className="cw-rec__num">
        <span className="cw-sr-only">More than 20 million dollars</span>
        <span className="cw-rec__wrap" aria-hidden="true" ref={wrapRef}>
          <span className="cw-rec__ghost">$20M+</span>
          <span
            className="cw-rec__tick"
            ref={tickRef}
            dangerouslySetInnerHTML={{ __html: FINAL_TEXT }}
          />
          <HandCircle
            variant={1}
            color="currentColor"
            play={play}
            instant={instant}
            delay={0.6}
          />
        </span>
      </p>
      <p className="cw-rec__lbl">In client revenue since 2013</p>
    </div>
  );
}
