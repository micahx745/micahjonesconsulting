// components/color-worlds/WorkFigures.tsx
//
// Pass-122 (.planning/mocks/pass-122/WORK-BRIEF.md; LESSONS #3 "PASS-122
// THEMES AND FIRST PAGE", "Numbers that move"): each poster figure on /work
// assembles once as it arrives, the same move as the home scoreboard's values
// (Bricolage weight 200 -> 800 behind a clip rising off the baseline, 0.8s).
//
// Every figure is real text in the server HTML at its finished weight. That is
// the whole render without JavaScript, under reduced motion, and for any
// figure already in view (or above) when the page loads. Only a figure still
// below the fold at load is armed: it waits unseen (opacity 0; a clip-path
// here would hide it from the observer, which honours the target's own clip)
// until three fifths of it is above the viewport's lower 10%, then runs the
// assembly once. Once per document load: a client navigation back to
// /work shows the finished figures, as the clip does (WorkHeroClip).
//
// Nothing reflows while a figure assembles. Numerals never wrap, and the
// words poster ("five to ten.") has a fixed 3em measure in CSS, so it breaks
// after "five to" at every weight on the way from 200 to 800.
"use client";

import { useEffect } from "react";

// Backstop if `animationend` never arrives (a tab hidden mid-animation).
const BACKSTOP_MS = 1400;
let armedThisLoad = false;

export function WorkFigures() {
  useEffect(() => {
    if (armedThisLoad) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const armed = Array.from(
      document.querySelectorAll<HTMLElement>(".cw-wx-num"),
    ).filter((el) => el.getBoundingClientRect().top >= window.innerHeight);
    if (!armed.length) return;
    armedThisLoad = true;

    const timers = new Map<HTMLElement, number>();
    const finish = (el: HTMLElement) => {
      window.clearTimeout(timers.get(el));
      timers.delete(el);
      el.classList.remove("is-armed", "is-assembling");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.addEventListener("animationend", () => finish(el), {
            once: true,
          });
          timers.set(
            el,
            window.setTimeout(() => finish(el), BACKSTOP_MS),
          );
          el.classList.add("is-assembling");
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.6 },
    );

    for (const el of armed) {
      el.classList.add("is-armed");
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      for (const el of armed) finish(el);
    };
  }, []);

  return null;
}
