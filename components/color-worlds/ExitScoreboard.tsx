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
// Pass-123c (operator 2026-09-19, "Fix it next, same look"): toggling
// `.is-current` re-flowed the list at every beat and Chrome scored the layout
// boxes — CLS 0.33 at 390, 0.20 at 1440 (LESSONS #41). The FLIP transforms
// hid the move from the eye, not from the shift scorer. After the fonts are
// ready, the flow layout of all four states is measured ONCE
// (`measureStates()`), then the list switches to actor mode (`.is-actors`):
// every moving piece is absolutely positioned, and a beat change is nothing but
// `translate` plus each state's own `font-size`, and the `--cw-line-y` of the
// hairlines. Moving an actor cannot shift the page: its start point never moves
// and nothing else reflows, so its size may change with it (fix round 2,
// operator 2026-09-19 "Make it exact first" — scaling kept display letterforms
// on the small values, which measured 6.99-17.54px narrow, because Bricolage
// carries an opsz axis). The approved look is preserved by measuring it, not by
// redrawing it.
//
// Reduced motion, no JS, an old browser, or a load already at or past the
// ledger: the static ledger, nothing pins.
"use client";

import { useEffect, useRef, type ReactNode } from "react";

// F2 (cross-review, Pass-122): the browser restores scrollY natively on
// back-navigation before this effect runs, so a below-the-fold check at
// mount would wrongly skip going live for a reader returning mid-section.
// Once the section has gone live for this document load, later mounts
// (client nav back to /) go live unconditionally; beatFor() already
// handles entering mid-section from any scroll position.
let wentLiveThisLoad = false;

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
      !CSS.supports("selector(:has(a))") ||
      !CSS.supports("height", "1svh")
    )
      return;
    if (
      !wentLiveThisLoad &&
      section.getBoundingClientRect().top < window.innerHeight
    )
      return;

    // Pass-123c: measuring before Bricolage swaps in gives wrong boxes, so
    // the whole go-live runs after the fonts. The effect may unmount before
    // fonts.ready resolves; `disposed` stops it, and `teardown` (set once the
    // listeners exist) undoes a live section.
    let disposed = false;
    let teardown: (() => void) | null = null;

    document.fonts.ready.then(() => {
      if (disposed) return;

      const stage = section.querySelector<HTMLElement>(".cw-exits__stage");
      const row = section.querySelector<HTMLElement>(".cw-exits__row");
      const deals = Array.from(
        section.querySelectorAll<HTMLElement>(".cw-exits__deal"),
      );
      const ticks = Array.from(
        section.querySelectorAll<HTMLElement>(".cw-exits__tick"),
      );
      const vals = deals.map((deal) =>
        deal.querySelector<HTMLElement>(".cw-exits__val"),
      );
      const cos = deals.map((deal) =>
        deal.querySelector<HTMLElement>(".cw-exits__co"),
      );
      const outs = deals.map((deal) =>
        deal.querySelector<HTMLElement>(".cw-exits__outcome"),
      );
      if (
        !stage ||
        !row ||
        deals.length !== count ||
        vals.some((el) => !el) ||
        cos.some((el) => !el) ||
        outs.some((el) => !el)
      )
        return;
      // The guard above proved every actor exists; these narrowed views carry
      // that into the loops (the nullable arrays stay for the guard itself).
      const valEls = vals as HTMLElement[];
      const coEls = cos as HTMLElement[];
      const outEls = outs as HTMLElement[];

      const nav = document.querySelector<HTMLElement>(".cw-nav");

      let navH = 0;
      let beatPx = 1;
      const measure = () => {
        navH = nav?.offsetHeight ?? 0;
        section.style.setProperty("--cw-nav-h", `${navH}px`);
        beatPx = Math.max(
          1,
          (section.offsetHeight - stage.offsetHeight) / count,
        );
      };

      section.style.setProperty("--cw-beats", String(count));
      section.classList.add("is-live");
      wentLiveThisLoad = true;
      measure();

      // FIX A (confirmed contrast failure): the current exit's value and its
      // beat ticks render copper, which fails AA once WorldSwitcher crossfades
      // the root to a non-espresso world while a beat is still pinned under the
      // nav. Watch the root's inline --cw-bg (WorldSwitcher writes it directly,
      // no React state) and flag the section whenever the page is not espresso,
      // so CSS can swap the current value/ticks to the world's own foreground.
      const worldRoot = document.querySelector<HTMLElement>('[data-mode="cw"]');
      const ESPRESSO_BG = "#2A1F18";
      const syncOffworld = () => {
        const bg =
          worldRoot?.style.getPropertyValue("--cw-bg").trim().toUpperCase() ??
          "";
        section.classList.toggle("is-offworld", bg !== ESPRESSO_BG);
      };
      syncOffworld();
      const worldObserver = worldRoot
        ? new MutationObserver(syncOffworld)
        : null;
      worldObserver?.observe(worldRoot!, { attributeFilter: ["style"] });

      let current = -1;
      let visible = false;
      const assembled = new Set<number>();

      const assemble = (index: number) => {
        const value = vals[index];
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

      // Pass-123c, step 2: the flow layout of every state, read in one task.
      // With the section in flow mode and `transition: none` inline (so no
      // in-flight move can pollute a rect), `.is-current` steps through the
      // deals; everything is recorded relative to the row's box. For i === k
      // only, the CURRENT state's font sizes and the outcome's / company's
      // boxes are recorded: actors sit at their current-state size and scale
      // down, so poster text never rasterises up from the small size.
      type ActorBox = { left: number; top: number; height: number };
      const stateLine: number[][] = [];
      const stateVal: ActorBox[][] = [];
      const stateFs = { val: [] as number[][], co: [] as number[][] };
      const stateCo: ActorBox[][] = [];
      const curPx = {
        val: [] as number[],
        co: [] as number[],
        out: [] as number[],
      };
      const outBox: { left: number; top: number; width: number }[] = [];
      const coW: number[] = [];
      // Pass-123c fix round 1: where each actor RESTS in actor mode, measured,
      // never assumed. Round 0 translated to row coordinates on the assumption
      // that the row was every actor's containing block; the render put each
      // deal's actors one flex slot too low (176px at 390, 188px at 1440, per
      // deal index). A move is now target minus resting place, so it lands
      // correctly whatever the containing block turns out to be.
      const base = {
        val: [] as ActorBox[],
        co: [] as ActorBox[],
        out: [] as ActorBox[],
        line: [] as number[],
      };
      let measureLogged = false;

      const measureStates = () => {
        const t0 = performance.now();
        section.classList.remove("is-actors");
        const pass = [...deals, ...ticks, ...valEls, ...coEls, ...outEls];
        for (const el of pass) el.style.transition = "none";
        // Pass-123c fix round 1: freeze the entrance animations too. Toggling
        // `.is-current` restarts the outcome's caption keyframes, whose first
        // frame is translateY(8px); measuring in the same task read that
        // offset and pinned every outcome 8px low. The value's assembly is
        // frozen for the same reason (its weight changes its width).
        for (const el of [...valEls, ...outEls]) el.style.animation = "none";
        for (const el of [...valEls, ...coEls, ...outEls]) {
          el.style.fontSize = "";
          el.style.width = "";
          el.style.translate = "";
          el.style.scale = "";
        }
        for (const deal of deals) deal.style.removeProperty("--cw-line-y");
        for (let k = 0; k < count; k++) {
          deals.forEach((deal, i) =>
            deal.classList.toggle("is-current", i === k),
          );
          ticks.forEach((tick, i) =>
            tick.classList.toggle("is-current", i === k),
          );
          const rowR = row.getBoundingClientRect();
          stateLine[k] = [];
          stateVal[k] = [];
          stateFs.val[k] = [];
          stateFs.co[k] = [];
          stateCo[k] = [];
          for (let i = 0; i < count; i++) {
            stateLine[k]![i] = deals[i]!.getBoundingClientRect().top - rowR.top;
            const vR = vals[i]!.getBoundingClientRect();
            stateVal[k]![i] = {
              left: vR.left - rowR.left,
              top: vR.top - rowR.top,
              height: vR.height,
            };
            const cR = cos[i]!.getBoundingClientRect();
            stateCo[k]![i] = {
              left: cR.left - rowR.left,
              top: cR.top - rowR.top,
              height: cR.height,
            };
            // Pass-123c fix round 2 (operator 2026-09-19, "Make it exact
            // first"): every state's own font size, so a value RENDERS at the
            // size it has today instead of being scaled to it. Bricolage
            // carries an opsz axis, so scaled-down display type keeps display
            // letterforms and read 6.99-17.54px narrow; at its real size it is
            // the same ink as the live page. Size is not a layout shift here:
            // each actor is absolutely positioned at a fixed top/left, so its
            // box grows from a start point that never moves and nothing else
            // reflows.
            stateFs.val[k]![i] = parseFloat(
              getComputedStyle(vals[i]!).fontSize,
            );
            stateFs.co[k]![i] = parseFloat(getComputedStyle(cos[i]!).fontSize);
            if (i === k) {
              curPx.val[i] = parseFloat(getComputedStyle(vals[i]!).fontSize);
              curPx.co[i] = parseFloat(getComputedStyle(cos[i]!).fontSize);
              curPx.out[i] = parseFloat(getComputedStyle(outs[i]!).fontSize);
              const oR = outs[i]!.getBoundingClientRect();
              outBox[i] = {
                left: oR.left - rowR.left,
                top: oR.top - rowR.top,
                width: oR.width,
              };
              coW[i] = cR.width;
            }
          }
        }
        // Leave the section on the real current state, then drop the freeze.
        deals.forEach((deal, i) =>
          deal.classList.toggle("is-current", i === current),
        );
        ticks.forEach((tick, i) =>
          tick.classList.toggle("is-current", i === current),
        );
        for (const el of pass) el.style.transition = "";
        for (const el of [...valEls, ...outEls]) el.style.animation = "";
        if (!measureLogged) {
          measureLogged = true;
          console.log(
            `cw-exits measureStates: ${(performance.now() - t0).toFixed(1)}ms`,
          );
        }
      };

      // Pass-123c, step 3: actor mode. Fixed current-state font sizes, the
      // outcome pinned at its own current-state position (it never moves, it
      // only shows), then the base heights the scales divide by.
      const enterActors = () => {
        // Pass-123c fix round 1: freeze first. On a width change the actors
        // still carry the previous state's translate, and clearing it with
        // transitions live would animate away from it, so the rects below
        // would read a moving element instead of its resting place.
        for (const el of [...valEls, ...coEls, ...outEls]) {
          el.style.transition = "none";
        }
        for (let i = 0; i < count; i++) {
          vals[i]!.style.fontSize = `${curPx.val[i]}px`;
          cos[i]!.style.fontSize = `${curPx.co[i]}px`;
          outs[i]!.style.fontSize = `${curPx.out[i]}px`;
          outs[i]!.style.width = `${outBox[i]!.width}px`;
          // Every inline move cleared, so the rects below are resting places.
          for (const el of [vals[i]!, cos[i]!, outs[i]!]) {
            el.style.translate = "";
            el.style.scale = "";
          }
          deals[i]!.style.removeProperty("--cw-line-y");
        }
        section.classList.add("is-actors");
        const rowR = row.getBoundingClientRect();
        const rel = (el: HTMLElement): ActorBox => {
          const r = el.getBoundingClientRect();
          return {
            left: r.left - rowR.left,
            top: r.top - rowR.top,
            height: r.height,
          };
        };
        for (let i = 0; i < count; i++) {
          base.val[i] = rel(vals[i]!);
          base.co[i] = rel(cos[i]!);
          base.out[i] = rel(outs[i]!);
          base.line[i] = deals[i]!.getBoundingClientRect().top - rowR.top;
          // The outcome only shows for its own current state, so its move is
          // fixed: its current-state target minus where it rests.
          outs[i]!.style.translate =
            `${outBox[i]!.left - base.out[i]!.left}px ` +
            `${outBox[i]!.top - base.out[i]!.top}px`;
        }
        // Unfreeze: apply() sets the state next, with its own freeze when it
        // must not animate.
        void stage.offsetWidth;
        for (const el of [...valEls, ...coEls, ...outEls]) {
          el.style.transition = "";
        }
      };

      // Pass-123c, step 4: a state is nothing but translate, scale and
      // --cw-line-y values. `.is-current` still toggles as today: colour, the
      // outcome's visibility and the one-time assembly key off it.
      const apply = (k: number, animate: boolean) => {
        if (!animate) {
          for (const el of [...deals, ...valEls, ...coEls, ...outEls]) {
            el.style.transition = "none";
          }
          void stage.offsetWidth;
        }
        for (let i = 0; i < count; i++) {
          // Position: target minus resting place (both in row coordinates).
          // Size: the state's own font size (fix round 2), so the ink is the
          // same as the live page's at both sizes. An absolutely positioned
          // actor grows from a start point that does not move and nothing
          // else reflows, so a size change here is not a layout shift.
          const v = stateVal[k]![i]!;
          const vb = base.val[i]!;
          vals[i]!.style.translate =
            `${v.left - vb.left}px ${v.top - vb.top}px`;
          vals[i]!.style.fontSize = `${stateFs.val[k]![i]}px`;
          const c = stateCo[k]![i]!;
          const cb = base.co[i]!;
          cos[i]!.style.translate = `${c.left - cb.left}px ${c.top - cb.top}px`;
          cos[i]!.style.fontSize = `${stateFs.co[k]![i]}px`;
          deals[i]!.style.setProperty(
            "--cw-line-y",
            `${stateLine[k]![i]! - base.line[i]!}px`,
          );
        }
        deals.forEach((deal, i) =>
          deal.classList.toggle("is-current", i === k),
        );
        ticks.forEach((tick, i) =>
          tick.classList.toggle("is-current", i === k),
        );
        if (!animate) {
          void stage.offsetWidth;
          for (const el of [...deals, ...valEls, ...coEls, ...outEls]) {
            el.style.transition = "";
          }
        }
      };

      const setCurrent = (next: number, animate: boolean) => {
        if (next === current) return;
        apply(next, animate);
        current = next;
        if (visible) assemble(next);
      };

      const beatFor = () => {
        const scrolled = navH - section.getBoundingClientRect().top;
        return Math.min(count - 1, Math.max(0, Math.floor(scrolled / beatPx)));
      };

      measureStates();
      enterActors();
      setCurrent(beatFor(), false);

      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          setCurrent(beatFor(), true);
        });
      };
      // A mobile URL bar collapse changes only the height, and --cw-stage-h is
      // svh, so re-measuring is gated on an innerWidth change alone.
      let lastW = window.innerWidth;
      const onResize = () => {
        measure();
        if (window.innerWidth !== lastW) {
          lastW = window.innerWidth;
          measureStates();
          enterActors();
          if (current >= 0) apply(current, false);
        }
        onScroll();
      };

      // The first current value assembles when the stage is actually seen at
      // 35% (F1): isIntersecting alone flips true at the first intersecting
      // pixel per the IO spec, which fired the assembly long before the stage
      // was "actually seen" as the comment above always intended.
      const seen = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
            if (visible && current >= 0) assemble(current);
          }
        },
        { threshold: 0.35 },
      );
      seen.observe(stage);

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      teardown = () => {
        cancelAnimationFrame(raf);
        seen.disconnect();
        worldObserver?.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        section.classList.remove("is-live", "is-actors", "is-offworld");
      };
    });

    return () => {
      disposed = true;
      teardown?.();
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
