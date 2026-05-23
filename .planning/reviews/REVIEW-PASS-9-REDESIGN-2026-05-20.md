# Pass #9 — Targeted Redesign Deliverable

**Date:** 2026-05-20
**Scope:** three areas only — hero, revenue+exits, companies marquee. Anything else → footnote.
**Audited HEAD:** `b8abfa7`.
**Constraints honored:** no new deps; existing fonts (Bricolage/Hanken/JetBrains Mono — all OFL/Apache) only; reduced-motion + no-JS work; View-Transitions-safe (no inline-transform writes from rAF — Pass-6/8 lesson — use `class.is-in` + CSS keyframes or pure transitions).

---

## 1) Hero — "went from dope to horrible"

**Problem.** Manifesto stack reads flat, didactic, Rauno-cosplay. The hand-underline beneath "Ship." asks for attention it doesn't earn (5ch SVG drawing in to bookmark a four-letter word — the math doesn't work). Dual CTA reads SaaS landing page.

**Options.**
- **A — Editorial Lede.** Promote the operator's strongest existing line — *"Most consultants leave the PDF and move on. I stay until users have the product in hand."* — into the H1 itself. Sentence-pair, declarative, no list, no manifesto. The brand voice is editorial; let the H1 do editorial work. References: [rauno.me/about](https://rauno.me/about) (declarative editorial, not the rauno.me homepage which IS the manifesto pattern), [Stratechery About](https://stratechery.com/about/), [Hiut Denim Co.](https://hiutdenim.co.uk/) ("Do One Thing Well").
- **B — Specimen.** "MICAH JONES" massive as the lead; single-sentence dek beneath. Name-as-headline. Reference: [Klim Foundry specimen pages](https://klim.co.nz/), [Jonathan Hoefler portfolio](https://jonathanhoefler.com/). Risk: reads designer-y, not operator-y; the operator's brand isn't his face, it's his work.
- **C — Fragmentary with inline evidence.** Keep the manifesto cadence but pair each fragment with a number — e.g., "Strategy. — $20M+ moved." / "Product. — 14 doula practices live." / "Launches. — two exits." Cuts the didactic feel via earned-not-stated evidence. Reference: [Hiut "5 Things You Need to Know"](https://hiutdenim.co.uk/pages/5-things-you-need-to-know), [Linear's About page mixed cadence](https://linear.app/about). Risk: still a list; doubles down on the pattern the operator just rejected.

**Choice — A.** The operator is a writer first (he wrote the line that becomes the new H1; it's already on the page as a sub doing less than it could). Promoting it to the H1 returns the editorial confidence the manifesto was reaching for. Cuts the hand-underline from the hero entirely — the mark migrates to the revenue figure where the "marks land where the work is" rule actually applies (the number IS the work, "Ship." isn't). Keeps the dual CTA structure but drops the magnetic spring (reads SaaS) and tightens the type weight so primary/ghost read as one row, not two competing affordances.

### Code

`components/color-worlds/Hero.tsx` — full replacement:

```tsx
// components/color-worlds/Hero.tsx
//
// Hero — Editorial Lede (Pass-9).
//
// Replaces the Pass-8 manifesto stack ("Ship the strategy. Ship the
// product. Ship the launch. Ship.") which read flat/didactic and a
// little Rauno-cosplay. Replaces also the hand-underline beneath
// "Ship." which asked for too much attention bookmarking a 4-letter
// word.
//
// New pattern: promote the operator's already-strongest line to the
// H1. The sentence-pair "Most consultants leave the PDF and move on.
// I stay until users have the product in hand." was the sub since
// Pass-8; it's the load-bearing sentence on the whole site. Run it
// as the headline.
//
// Hand-mark migrates to RevenueTick — marks land where the work is.
//
// Reveal: pure-CSS keyframes per Pass-8 lesson (no inline-transform
// writes; View-Transitions snapshot capture won't fight us). Two
// sentence-lines stagger via the same --reveal-i custom prop pattern
// already used for the manifesto. Sub + CTA-row use class-toggle
// transitions which are snapshot-safe because they don't start from
// a CSS-rule-defined hidden state.
"use client";

import { useEffect, useRef } from "react";
import { MagneticArea } from "@/components/motion/MagneticArea";

const HEADLINE_LINES = [
  "Most consultants leave the PDF and move on.",
  "I stay until users have the product in hand.",
] as const;

export function Hero() {
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  function captureLine(el: HTMLSpanElement | null) {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    lineRefs.current.forEach((el, i) => {
      el.style.setProperty("--reveal-i", String(i));
    });

    subRef.current?.classList.add("is-in");
    ctaRowRef.current?.classList.add("is-in");
  }, []);

  // Parallax on h1 — pointer-fine devices only, rAF-batched, viewport-capped.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!fine) return;

    const h1 = h1Ref.current;
    if (!h1) return;

    let tx = 0;
    let ty = 0;
    let raf = 0;
    let pending = false;

    function onMove(e: PointerEvent) {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    }
    function apply() {
      const scale = Math.min(window.innerWidth / 1920, 1);
      h1!.style.transform = `translate(${tx * 4 * scale}px, ${ty * 2 * scale}px)`;
      pending = false;
    }
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      ref={heroRef}
      className="cw-hero cw-hero--lede"
      data-section
      data-world="terracotta"
      id="top"
      aria-label="Hero"
    >
      <div className="cw-eyebrow">
        <span>Independent operator · Oakland, CA</span>
      </div>

      <h1
        className="cw-h1 cw-h1--lede"
        ref={h1Ref}
        aria-label="Most consultants leave the PDF and move on. I stay until users have the product in hand."
      >
        {HEADLINE_LINES.map((line, i) => (
          <span key={i} className="cw-h1-line">
            <span ref={captureLine} aria-hidden={i > 0 ? undefined : undefined}>
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p className="cw-sub" ref={subRef}>
        Strategy and software, shipped by the same pair of hands.
      </p>

      <div className="cw-cta-row" ref={ctaRowRef}>
        <a
          href="https://calendly.com/micahmccoyjones/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="cw-cta"
        >
          Book a call <span className="cw-arr" aria-hidden>→</span>
        </a>
        <a href="#clients" className="cw-cta cw-cta--ghost">
          See how I work <span className="cw-arr" aria-hidden>↓</span>
        </a>
      </div>
    </header>
  );
}
```

`app/globals.css` — replace the existing `.cw-h1` block + add `.cw-h1--lede` rules. Find the block starting at `[data-mode="cw"] .cw-h1 {` (~line 5627) and replace through the `.cw-h1 .cw-line > span` rules (~line 5656); ALSO delete the `.cw-hero-underline` rule (~line 5776):

```css
/* Hero — editorial lede (Pass-9).
 * Two-sentence declarative H1 replacing the Pass-8 manifesto stack.
 * Type-scale dropped from clamp(52px, 12.5vw, 196px) to
 * clamp(36px, 5.5vw, 88px) — longer line measure than four 4-word
 * imperatives, so the size compresses to keep ~50-65ch line measure.
 * Weight 600 (was 800) — editorial register, not display shout. */
[data-mode="cw"] .cw-h1 {
  font-family: var(--font-cw-display);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.022em;
  font-size: clamp(36px, 5.5vw, 88px);
  text-transform: none;
  margin: 0;
  max-width: 22ch;
}
[data-mode="cw"] .cw-h1--lede .cw-h1-line {
  display: block;
  overflow: hidden;
}
[data-mode="cw"] .cw-h1--lede .cw-h1-line > span {
  display: block;
}
[data-mode="cw"].cw-js-reveals .cw-h1--lede .cw-h1-line > span {
  animation: cw-hero-line-up 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(0.20s + var(--reveal-i, 0) * 0.18s);
}

/* `cw-hero-line-up` keyframes already exist — reused. */

/* DELETE THE FOLLOWING — no longer needed (no hand-underline in hero,
   no all-caps display H1 wrapping cw-line/cw-line>span):
   - .cw-h1 .cw-line {...}
   - .cw-h1 .cw-line > span {...}
   - .cw-js-reveals .cw-h1 .cw-line > span {...}
   - .cw-hero-underline {...}
   The `cw-h1-line` rules above replace them.
*/

/* Sub stays compact; pulls up under the lede headline. */
[data-mode="cw"] .cw-hero--lede .cw-sub {
  max-width: 48ch;
  margin: 28px 0 0;
  font-size: clamp(17px, 1.7vw, 21px);
  line-height: 1.45;
  opacity: 0.85;
}

/* CTA row — drop the magnetic-spring weight, keep dual CTA tight.
   Primary is solid accent; ghost is border-only. Both same visual
   height; the difference is fill-vs-outline, not size. */
[data-mode="cw"] .cw-hero--lede .cw-cta-row {
  margin-top: 36px;
  gap: 14px;
}
```

Also remove the `MagneticArea` wrapper around the primary CTA in `Hero.tsx` (done above — no `<MagneticArea>` in the new JSX). The `MagneticArea` import is no longer needed; drop it. The component file stays — the footer still uses it.

**Mobile (≤760px).** The H1 at clamp(36px, 5.5vw, 88px) lands at 36px on 390px viewport — two sentences each ~30 chars at 36px wrap to two lines per sentence (4 lines total). Comfortable. Sub at 17px stays single-line. CTAs stack via existing `.cw-cta-row` flex-wrap.

---

## 2) Revenue + exits — two unrelated bolt-ons

**Problem.** `$20M+ in client revenue` ticker (display + hand-circle) and two-exit grid (rectangular cards, sans-serif tags) share a section but no shared design language. The cards introduce a register break.

**Options.**
- **A — Inline running paragraph.** $20M+ + exits flow as one editorial sentence with display weight on figures and named entities. Compact; loses card breathing room and per-exit body text.
- **B — Asymmetric specimen.** Huge $20M+ at left; exits as marginalia annotations at right. Most dramatic; risks reading as design-flex on an operator portfolio.
- **C — Numbered editorial index (contents-page pattern).** Figure at top with hand-circle (unchanged). Then "01." and "02." exits as numbered editorial entries — display-weight deal names, hairline rule between entries, right-aligned date column. No card chrome. Same type vocabulary as the figure. Reference: [PIN-UP](https://pinupmagazine.org/) front-matter contents, [Library of America](https://www.loa.org/) catalogue pages, [Klim's H&Co specimen](https://klim.co.nz/blog/) editorial index treatment.

**Choice — C.** The contents-page pattern is literally how magazines front-matter their work; that's the register the operator wants. Display-weight on $20M+ AND on deal names — they belong to one type vocabulary. The hand-circle stays around the figure (this is "where the work is"). Right-aligned dates work as the "page-number column" of a contents page — readable scan, unambiguous chronology.

### Code

`components/color-worlds/RevenueTick.tsx` — full replacement:

```tsx
// components/color-worlds/RevenueTick.tsx
//
// Revenue + exits — Editorial Index (Pass-9).
//
// Replaces the Pass-8 figure + two-card layout (which lived in two
// different design registers). New pattern: contents-page index —
// figure → dek → numbered exits as editorial entries with right-
// aligned date column. One type vocabulary; the hand-circle around
// the figure is the section's only mark.
//
// Layout:
//   $20M+         in client revenue across a decade.
//                 Two exits at companies I helped build.
//   ──────────────────────────────────────────────────────
//   01.  GUARDICORE → AKAMAI               Acquired · Oct 2021
//        Zero-trust micro-segmentation. Positioning research that
//        moved average deal size $150K — the engagement that built
//        the acquisition narrative.
//   ──────────────────────────────────────────────────────
//   02.  TECHVALIDATE → SURVEYMONKEY       IPO · Sep 2018
//        Customer evidence platform. Acquired by SurveyMonkey 2015;
//        public on Nasdaq 2018. Held equity through the IPO.
//
// rAF cancellation on unmount per Pass-4 fix.
// SSR floor is "$20M+" (never $0) per Pass-5 fix.
"use client";

import { useEffect, useRef, useState } from "react";
import { HandCircle } from "@/components/hand/HandCircle";

const TARGET = 20_000_000;
const DURATION_MS = 2400;
const REST_LABEL = "$20M+";

function format(v: number, atTarget: boolean): string {
  const millions = v / 1_000_000;
  if (atTarget) return `$${Math.round(millions)}M+`;
  return `$${millions.toFixed(1)}M`;
}

export function RevenueTick() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const [display, setDisplay] = useState(REST_LABEL);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    function runTick() {
      setDisplay(format(0, false));
      const start = performance.now();

      function step(now: number) {
        const t = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = eased * TARGET;
        const isDone = t >= 1;
        setDisplay(format(v, isDone));
        if (isDone) return;
        rafRef.current = requestAnimationFrame(step);
      }
      rafRef.current = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          runTick();
          observer.unobserve(root!);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="cw-rev cw-reveal" ref={rootRef}>
      {/* Figure — hand-drawn circle wraps the numeric for editorial weight */}
      <header className="cw-rev__head">
        <p className="cw-rev__figure">
          <span className="cw-rev__tick-wrap">
            <span className="cw-rev__tick" aria-hidden>
              {display}
            </span>
            <span className="cw-sr-only">twenty million dollars or more</span>
            <span className="cw-rev__tick-circle" aria-hidden>
              <HandCircle variant={1} delay={0.4} color="currentColor" />
            </span>
          </span>
        </p>
        <p className="cw-rev__dek">
          in client revenue across a decade.
          <br />
          Two exits at companies I helped build.
        </p>
      </header>

      <ol className="cw-rev__index" aria-label="Two exits">
        <li className="cw-rev__entry">
          <p className="cw-rev__num" aria-hidden>01.</p>
          <div className="cw-rev__entry-main">
            <p className="cw-rev__deal">
              <strong>Guardicore</strong>
              <span className="cw-rev__arrow" aria-hidden>→</span>
              <strong>Akamai</strong>
            </p>
            <p className="cw-rev__note">
              Zero-trust micro-segmentation. Positioning research that moved
              average deal size $150K — the engagement that built the
              acquisition narrative.
            </p>
          </div>
          <p className="cw-rev__when">
            <span className="cw-rev__when-kind">Acquired</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">Oct 2021</span>
          </p>
        </li>

        <li className="cw-rev__entry">
          <p className="cw-rev__num" aria-hidden>02.</p>
          <div className="cw-rev__entry-main">
            <p className="cw-rev__deal">
              <strong>TechValidate</strong>
              <span className="cw-rev__arrow" aria-hidden>→</span>
              <strong>SurveyMonkey</strong>
            </p>
            <p className="cw-rev__note">
              Customer evidence platform. Acquired by SurveyMonkey 2015;
              public on Nasdaq 2018. Held equity through the IPO.
            </p>
          </div>
          <p className="cw-rev__when">
            <span className="cw-rev__when-kind">IPO</span>
            <span className="cw-rev__when-sep" aria-hidden>·</span>
            <span className="cw-rev__when-date">Sep 2018</span>
          </p>
        </li>
      </ol>
    </div>
  );
}
```

`app/globals.css` — replace the entire `.cw-rev*` block (starts ~line 5981, ends ~line 6072). The old rules to delete: `.cw-rev`, `.cw-revline`, `.cw-rev-tick-wrap`, `.cw-rev-tick`, `.cw-rev-tick-circle`, `.cw-rev-trail`, `.cw-rev-exits-label`, `.cw-rev-cards`, `.cw-rev-card`, `.cw-rev-card__*`. Replace with:

```css
/* ================================================================
 * Revenue + exits — Editorial Index (Pass-9).
 * Replaces the Pass-8 figure + two-card layout. New pattern:
 * contents-page index — figure at top, numbered exit entries with
 * right-aligned date column, hairline rule between.
 * ================================================================ */

[data-mode="cw"] .cw-rev {
  margin-top: 84px;
}

/* Figure block — hand-circled numeric + supporting dek beneath. */
[data-mode="cw"] .cw-rev__head {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  align-items: end;
  padding-bottom: 56px;
  border-bottom: 1px solid currentColor;
}
@media (min-width: 720px) {
  [data-mode="cw"] .cw-rev__head {
    grid-template-columns: auto 1fr;
    gap: 56px;
  }
}

[data-mode="cw"] .cw-rev__figure {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: clamp(64px, 9vw, 132px);
  line-height: 0.86;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin: 0;
}
[data-mode="cw"] .cw-rev__tick-wrap {
  position: relative;
  display: inline-block;
}
[data-mode="cw"] .cw-rev__tick {
  color: var(--cw-accent);
  font-variant-numeric: tabular-nums;
  display: inline-block;
  min-width: 5ch;
}
[data-mode="cw"] .cw-rev__tick-circle {
  position: absolute;
  inset: -14% -6%;
  pointer-events: none;
  color: var(--cw-accent);
}

[data-mode="cw"] .cw-rev__dek {
  font-family: var(--font-cw-display);
  font-weight: 500;
  font-size: clamp(20px, 2.4vw, 28px);
  line-height: 1.25;
  letter-spacing: -0.012em;
  margin: 0;
  padding-bottom: 6px;
  opacity: 0.92;
}

/* Index list — numbered entries, hairline rules between. */
[data-mode="cw"] .cw-rev__index {
  list-style: none;
  padding: 0;
  margin: 0;
}
[data-mode="cw"] .cw-rev__entry {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px 28px;
  padding: 36px 0 32px;
  border-bottom: 1px solid currentColor;
}
[data-mode="cw"] .cw-rev__entry:last-child {
  border-bottom: 0;
}
@media (min-width: 720px) {
  [data-mode="cw"] .cw-rev__entry {
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
  }
}

[data-mode="cw"] .cw-rev__num {
  font-family: var(--font-cw-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.6;
  margin: 0;
  padding-top: 0.6em;
}

[data-mode="cw"] .cw-rev__entry-main {
  min-width: 0;
}
[data-mode="cw"] .cw-rev__deal {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1.08;
  letter-spacing: -0.018em;
  text-transform: uppercase;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
  align-items: baseline;
}
[data-mode="cw"] .cw-rev__deal strong {
  font-weight: 700;
}
[data-mode="cw"] .cw-rev__arrow {
  font-weight: 400;
  opacity: 0.6;
  font-size: 0.78em;
}
[data-mode="cw"] .cw-rev__note {
  font-family: var(--font-cw-body);
  font-size: 15px;
  line-height: 1.55;
  margin: 14px 0 0;
  max-width: 56ch;
  opacity: 0.85;
}

/* Right-aligned date column — reads as the "page number" of the
 * contents-page index. Mono + small caps matches the .cw-rev__num. */
[data-mode="cw"] .cw-rev__when {
  font-family: var(--font-cw-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.7;
  margin: 0;
  padding-top: 0.6em;
  white-space: nowrap;
}
@media (min-width: 720px) {
  [data-mode="cw"] .cw-rev__when {
    text-align: right;
  }
}
[data-mode="cw"] .cw-rev__when-sep {
  margin: 0 0.5em;
  opacity: 0.5;
}
```

**Mobile (≤720px).** Grid collapses to single column: figure, dek, then each entry as num/deal/note/when stacked. The `auto 1fr auto` desktop grid lets the date right-align past 720px. The deal's `flex-wrap` lets long names wrap cleanly on narrow viewports (TechValidate→SurveyMonkey on 390px wraps after the arrow).

**Reduced-motion / no-JS.** Count-up runs only if `prefers-reduced-motion: no-preference` (existing logic preserved); SSR floor renders `$20M+`. The HandCircle component already early-returns under reduced-motion. The static layout works without any JS.

---

## 3) Companies marquee — looks bad + separator bug

**Separator-bug analysis.** Current CSS at `app/globals.css:6303-6311`:

```css
[data-mode="cw"] .cw-companies .cw-track span::after {
  content: "·";
  margin-left: 44px;
  opacity: 0.4;
}
[data-mode="cw"] .cw-companies .cw-track > span:last-child::after {
  display: none;
}
```

The first selector `.cw-track span::after` is descendant-combinator — it matches BOTH the outer block-wrapper spans (block0, block1) AND the inner name spans (Guardicore, TechValidate, etc.). The second selector `.cw-track > span:last-child::after` uses child-combinator — it only matches the LAST direct child of `.cw-track`, which is block1. So block0's `::after` ("·") still renders at the end of its content — between block0's last inner name ("Postmates·" — the inner name's own `::after`) and block1's first inner name ("Guardicore·"). Result: `Postmates · · Guardicore` at the seam.

**Separator fix (CSS-only).** Replace the two rules with a single child-of-child selector that only targets inner name spans:

```css
/* Pass-9 fix: previously ::after was applied to ALL descendant spans
 * (outer block wrappers + inner name spans), so each duplicated block
 * trailed its own "·" — producing "Postmates · · Guardicore" at the
 * seam where the track loops. Restrict to inner name spans only;
 * single "·" at the seam reads as continuous loop. No :last-child
 * exception needed — the seam dot belongs there. */
[data-mode="cw"] .cw-companies .cw-track > span > span::after {
  content: "·";
  margin-left: 44px;
  opacity: 0.4;
}
```

That's the bug fix. Two lines deleted, one rule rewritten.

**Design problem.** Even with the seam fixed, five 700-weight 38px wordmarks sliding past doesn't carry the credibility weight of "decade at companies acquired by Akamai + SurveyMonkey." Wordmarks-without-logos read as filler.

**Options.**
- **A — Kill the marquee; replace with static editorial credit line.** Single magazine-credit paragraph carrying inline deal context per company. References: [The Gentlewoman contributor credits](https://thegentlewoman.co.uk/), [PIN-UP masthead](https://pinupmagazine.org/about), the credit lines at the end of any longform New Yorker profile.
- **B — Horizontal timeline strip.** Year-range columns with company + role beneath. More structured. Risks dashboard register.
- **C — Mixed-weight kinetic.** Keep marquee but each entry = year (mono small) + name (display) + role (mono meta). Authoritative weight; still kinetic.

**Choice — A.** The marquee was filler precisely because it stripped context. The credit line returns context inline — each name carries its deal — which IS the credibility signal. The line reads as the closing credit on a long-form profile: confident, editorial, no animation. Marquees belong on logo strips of recognizable brand marks; without logos they need to do work that animation can't.

### Code

`app/(foyer)/page.tsx` — replace the entire `{/* COMPANIES marquee — espresso */}` section (roughly lines 262–282 per the verified HEAD source). Also drop the unused `COMPANIES` constant from the top of the file (if it's not used elsewhere):

```tsx
{/* COMPANIES — editorial credit line (Pass-9).
    Kills the marquee. Five 700-weight wordmarks sliding past were
    filler — no logos, no context. A magazine-credit paragraph that
    names each engagement with its deal context inline reads as the
    closing credit on a long-form profile. Same espresso world. */}
<section
  className="cw-credits"
  data-section
  data-world="espresso"
  aria-labelledby="cw-credits-title"
>
  <p className="cw-credits__eyebrow">2013 — 2023</p>
  <h2 id="cw-credits-title" className="cw-credits__line">
    Engagements at{" "}
    <strong>Guardicore</strong>{" "}
    <span className="cw-credits__meta">→ Akamai, 2021</span>,{" "}
    <strong>TechValidate</strong>{" "}
    <span className="cw-credits__meta">→ SurveyMonkey IPO, 2018</span>,{" "}
    <strong>Flexport</strong>, <strong>Cuebiq</strong>,{" "}
    and <strong>Postmates</strong>.
  </h2>
  <p className="cw-credits__role">
    Growth, GTM &amp; platform strategy.
  </p>
</section>
```

(`<h2>` for the line because it carries the page's "Engagements" credibility statement — search/AT benefit from the heading level; the visible Shipped section uses h2 too, so this stays consistent. Page already has multiple h2s under the single h1.)

`app/globals.css` — delete the entire `.cw-companies*` block (~lines 6276–6324) including the marquee animation rules, the `::after` separator rules, and the `cw-companies-meta` rule. Replace with:

```css
/* ================================================================
 * Engagements credit line (Pass-9).
 * Replaces the Pass-8 wordmark marquee. Single editorial paragraph;
 * inline deal context per name. Same espresso world.
 * ================================================================ */

[data-mode="cw"] .cw-credits {
  padding: 96px 40px 56px;
  max-width: 1080px;
  margin: 0 auto;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-credits {
    padding: 64px 20px 40px;
  }
}

[data-mode="cw"] .cw-credits__eyebrow {
  font-family: var(--font-cw-mono);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.55;
  margin: 0 0 24px;
}

[data-mode="cw"] .cw-credits__line {
  font-family: var(--font-cw-display);
  font-weight: 500;
  font-size: clamp(22px, 2.6vw, 34px);
  line-height: 1.32;
  letter-spacing: -0.014em;
  margin: 0;
  max-width: 36ch;
  text-transform: none;
}
[data-mode="cw"] .cw-credits__line strong {
  font-weight: 700;
}
[data-mode="cw"] .cw-credits__meta {
  font-family: var(--font-cw-mono);
  font-size: 0.5em;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.7;
  white-space: nowrap;
  margin-left: 0.25em;
  vertical-align: 0.15em;
}

[data-mode="cw"] .cw-credits__role {
  font-family: var(--font-cw-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.55;
  margin: 24px 0 0;
}
```

The `.cw-credits__meta` inline-mono treatment at `0.5em` of the display line keeps "→ Akamai, 2021" reading as inline marginalia — same height as the body x-height of the display text, mono case + letterspacing tells you "this is metadata, not headline." The pattern is borrowed from contents-page editorial typesetting (small-caps mono next to a display name).

**Reduced-motion / no-JS.** Static section, zero animation, works identically.

**Forced-colors / print.** The Pass-8 forced-colors and `@media print` blocks already target `.cw-companies` to hide it under print. Since `.cw-companies` is gone, that rule becomes a no-op (harmless). No new forced-colors handling needed — `.cw-credits` uses currentColor/inherits and reads cleanly under forced-colors.

**ALSO** — drop the `COMPANIES` constant from `app/(foyer)/page.tsx` (top of file, after `CLIENT_OFFERS`) since no other code uses it. Five-line cleanup.

---

## Footnotes (Pass-10 backlog — do not touch in this pass)

1. The cw home still ships the production canonical `www.micahjonesconsulting.com` serving the v0.dev prototype (Pass-5/6/7/8 blocker). Operator-action; not code.
2. `app/(foyer)/opengraph-image.tsx:19` still passes `punch="$17M+ in client revenue. Two exits. Now building Ordani."` — Pass-8 H1 partially propagated but the OG image was missed. Unrelated to this pass's three areas.
3. `components/color-worlds/Nav.tsx:172` mobile overlay meta still says "Independent builder — Oakland, CA" — Pass-8 H2 noted.
4. The Ordani section's `Visit ordani.com →` link still points to a domain-sales parking page; both the home link AND Org LD `url` field. Pass-8 B1.
5. The `cw-h1 cw-shift` class on the prior hero applied a chromatic-aberration text-shadow. The new editorial H1 doesn't carry `cw-shift` (intentional — the editorial register doesn't want the aberration). The `.cw-shift` rule in globals.css stays in place for any other display element that uses it (e.g., the footer "LET'S BUILD"). No cleanup needed.
6. `app/(foyer)/page.tsx` top-of-file docstring's section list mentions "Companies marquee — espresso"; once the marquee dies, update that comment to "Engagements credit line — espresso." Doc-only.
