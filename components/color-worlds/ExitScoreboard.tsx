// Pass-122 (.planning/mocks/pass-122/RECEIPTS-BRIEF.md, theme 2: "the four
// exits step through like a scoreboard"). A client wrapper around the server-
// rendered exit ledger; the ledger itself, every value in it, is server HTML.
//
// Live mode (JS, no reduced motion, native sticky available, and the ledger
// still below the fold at load) adds `.is-live`: the section grows by one
// scroll beat per exit and its stage holds under the nav (CSS sticky). Scroll
// POSITION alone picks the current exit: no snap, no speed change, no timer.
// The current exit sits at poster size with its company and outcome; the other
// three stay a legible ledger. A change of beat moves the value and company
// boxes FLIP-style (one class change, one measure, then a transform
// transition), and each value assembles once, the first time it is current
// (Bricolage weight 200 -> 800 behind a rising clip).
//
// Reduced motion, no JS, an old browser, or a load already at or past the
// ledger: the static ledger, nothing pins.
"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ExitScoreboard({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (
      !CSS.supports("overflow-x", "clip") ||
      !CSS.supports("selector(:has(a))")
    )
      return;
    if (section.getBoundingClientRect().top < window.innerHeight) return;

    const stage = section.querySelector<HTMLElement>(".cw-exits__stage");
    const deals = Array.from(
      section.querySelectorAll<HTMLElement>(".cw-exits__deal"),
    );
    const ticks = Array.from(
      section.querySelectorAll<HTMLElement>(".cw-exits__tick"),
    );
    if (!stage || deals.length !== count) return;

    const nav = document.querySelector<HTMLElement>(".cw-nav");
    const moving: HTMLElement[] = [];
    const rowOf: number[] = [];
    deals.forEach((deal, row) => {
      deal
        .querySelectorAll<HTMLElement>(".cw-exits__val, .cw-exits__co")
        .forEach((el) => {
          moving.push(el);
          rowOf.push(row);
        });
    });
    const values = deals.map((deal) =>
      deal.querySelector<HTMLElement>(".cw-exits__val"),
    );

    let navH = 0;
    let beatPx = 1;
    const measure = () => {
      navH = nav?.offsetHeight ?? 0;
      section.style.setProperty("--cw-nav-h", `${navH}px`);
      beatPx = Math.max(1, (section.offsetHeight - stage.offsetHeight) / count);
    };

    section.style.setProperty("--cw-beats", String(count));
    section.classList.add("is-live");
    measure();

    let current = -1;
    let visible = false;
    const assembled = new Set<number>();

    const assemble = (index: number) => {
      const value = values[index];
      if (!value || assembled.has(index)) return;
      assembled.add(index);
      value.classList.add("is-assembling");
      value.addEventListener(
        "animationend",
        () => {
          value.classList.remove("is-assembling");
          value.classList.add("is-assembled");
        },
        { once: true },
      );
    };

    const setCurrent = (next: number, animate: boolean) => {
      if (next === current) return;
      // FLIP. Rows slide by their top edge (so the hairlines travel with
      // them); the value and company boxes move and scale inside their row.
      const firstRows = animate
        ? deals.map((el) => el.getBoundingClientRect())
        : null;
      const first = animate
        ? moving.map((el) => el.getBoundingClientRect())
        : null;
      if (first) {
        // Freeze any move still in flight so the "last" boxes are clean.
        for (const el of [...deals, ...moving]) {
          el.style.transition = "none";
          el.style.transform = "none";
        }
      }
      deals.forEach((deal, i) =>
        deal.classList.toggle("is-current", i === next),
      );
      ticks.forEach((tick, i) =>
        tick.classList.toggle("is-current", i === next),
      );
      current = next;
      if (first && firstRows) {
        const lastRows = deals.map((el) => el.getBoundingClientRect());
        const last = moving.map((el) => el.getBoundingClientRect());
        deals.forEach((deal, i) => {
          deal.style.transition = "none";
          deal.style.transform = `translateY(${firstRows[i]!.top - lastRows[i]!.top}px)`;
        });
        moving.forEach((el, i) => {
          const a = first[i]!;
          const b = last[i]!;
          if (!b.height) return;
          const row = rowOf[i]!;
          const ra = firstRows[row]!;
          const rb = lastRows[row]!;
          const dx = a.left - ra.left - (b.left - rb.left);
          const dy = a.top - ra.top - (b.top - rb.top);
          el.style.transition = "none";
          el.style.transform = `translate(${dx}px, ${dy}px) scale(${a.height / b.height})`;
        });
        void stage.offsetWidth;
        for (const el of [...deals, ...moving]) {
          el.style.transition = "";
          el.style.transform = "";
        }
      }
      if (visible) assemble(next);
    };

    const beatFor = () => {
      const scrolled = navH - section.getBoundingClientRect().top;
      return Math.min(count - 1, Math.max(0, Math.floor(scrolled / beatPx)));
    };

    setCurrent(beatFor(), false);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setCurrent(beatFor(), true);
      });
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    // The first current value assembles when the stage is actually seen.
    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (visible && current >= 0) assemble(current);
        }
      },
      { threshold: 0.35 },
    );
    seen.observe(stage);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      seen.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      section.classList.remove("is-live");
    };
  }, [count]);

  return (
    <section
      className="cw-exits"
      aria-labelledby="cw-exits-title"
      ref={sectionRef}
    >
      <div className="cw-exits__stage">{children}</div>
    </section>
  );
}
