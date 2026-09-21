# Brief: Pass-126, How I work: same words, better design, on the home and /services (preview build)

Executor: Sol (`scripts/codex-exec.ps1 -Task`), worktree `.claude/worktrees/p124-cuts`, branch `preview/p126-how-i-work`.
HEAD check: `git log -1 --format=%h -- .claude/briefs/pass-126-how-i-work.md` must equal `git rev-parse --short HEAD`.
Written 2026-09-21 by the main session (Opus 5) from Fable's pick (`.planning/reviews/FABLE-126-HOWIWORK-PICK.md`).

## 0. Rules
- You WRITE files; you do not commit (LESSONS #18), push, deploy or edit `.claude/RESUME.md`.
- The copy is LOCKED and lives in `content/how-i-work.ts` (main session wrote it, byte-exact, with two no-break
  spaces). Import it; never retype, reword, re-punctuate or edit that file. Write NO non-ASCII character into any
  file you touch (LESSONS #46).
- No numerals in the section, no boxes/cards, no arrows between steps, no new colour tokens, no GSAP beyond the
  existing `SplitReveal` component, no CSS `animation-timeline` (see section 4), no sticky/held elements.
- Never reinterpret an expected value (LESSONS #25). A bracket that does not match is reported verbatim and you stop.
- Pre-existing untracked folders `.planning/qa/pass-124/home-v2/` to `home-v6/` and `.planning/qa/pass-125/*.log` are not
  yours.

## 1. The shared component: `components/color-worlds/HowIWork.tsx` (server component, no "use client")
Props: `{ variant: "home" | "services" }`. Renders exactly:
```
<div className={`cw-hiw cw-hiw--${variant}`}>
  {variant === "home"
    ? <SplitReveal as="h2" id="cw-howiwork-title" className="cw-secttitle cw-hiw__title">{HOW_I_WORK.heading}</SplitReveal>
    : <h3 id="sv-hiw-title" className="cw-hiw__title">{HOW_I_WORK.heading}</h3>}
  <ol className="cw-hiw__list" role="list">
    {HOW_I_WORK.steps.map((s) => (
      <li key={s.label} className={`cw-hiw__step cw-hiw__step--${s.label.toLowerCase()} cw-reveal`}>
        <div>
          <p className="cw-hiw__label">{s.label}</p>
          <p className="cw-hiw__head">{s.headline}</p>
          <p className="cw-hiw__body">{s.body}</p>
        </div>
      </li>
    ))}
  </ol>
  {variant === "services" ? <p className="cw-hiw__note">{HOW_I_WORK.servicesNote}</p> : null}
  <p className="cw-hiw__more cw-reveal">
    <a href={HOW_I_WORK.moreHref} className="cw-mlink">{HOW_I_WORK.moreLabel} <span aria-hidden>{"\u2192"}</span></a>
  </p>
</div>
```
(`{"\u2192"}` is the arrow written as an ASCII escape; the current markup renders the same character.) Import
`SplitReveal` the way `app/(foyer)/page.tsx` does.

## 2. The home: `app/(foyer)/page.tsx`
Inside `<section ... id="products" ... data-world="espresso" aria-labelledby="cw-howiwork-title">`, replace everything
from the `<SplitReveal as="h2" id="cw-howiwork-title"` element through the closing `</p>` of the
`cw-principles__more` paragraph (the heading, the `<ol className="cw-principles cw-principles--steps">` and the "See the
work" paragraph) with `<HowIWork variant="home" />`. Keep the comments that sit between the kept parts; delete comments
that only described the removed list. Everything after it (the receipts: the sr-only h3, `RevenueFigure`,
`ExitRecord`) stays byte-identical. Section id, world and aria-labelledby unchanged.

## 3. /services: `app/(foyer)/services/page.tsx`
- Replace the whole `<div className="cw-pband__incl" aria-labelledby="sv-incl-title"> ... </div>` block with
  `<HowIWork variant="services" />`, and delete the now-unused `INCLUSIONS` const. Change nothing else in the
  shapes section.
- In the "Why one person" paragraph delete exactly these two sentences and nothing else: "Week one is the scoping
  session and the audit: the foundational work that decides what the engagement is actually for." and "Something named
  ships in month one." The paragraph then reads: "An agency gives you a team and a relay race between them. A full-time
  hire takes three months to find and another to ramp. I am a senior operator you can start this week, on a scope with
  an end date. When the work is bigger than one person, I say so on the call." (Straight cuts; they repeat the steps.)

## 4. CSS: `app/globals.css`
Retire, by deleting: `[data-mode="cw"] .cw-principles--steps .cw-principle { ... }` and `[data-mode="cw"]
.cw-principles__more { ... }` (around line 8247). Re-key `[data-mode="cw"] section:has(.cw-principles--steps)` to
`[data-mode="cw"] #products` (same declarations). Leave every other `.cw-principle*` rule alone.
Then add one block, commented "Pass-126 How I work (Fable pick: Sol's Marked-Up Proof on espresso)":

Grid, at `min-width: 1100px`:
```
.cw-hiw { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); column-gap:24px;
  grid-template-areas: "t t t t t . s s s s s s" ". p p p p p p p . . . ." ". . . b b b b b b b b b" "y y y y y y y y y m m m"; }
.cw-hiw__list { display:contents; list-style:none; margin:0; padding:0; }
.cw-hiw__title { grid-area:t; align-self:start; max-width:4.5em; }
.cw-hiw__step--scope { grid-area:s; align-self:start; }
.cw-hiw__step--plan { grid-area:p; margin-top:72px; }
.cw-hiw__step--build { grid-area:b; margin-top:128px; }
.cw-hiw__step--stay { grid-area:y; margin-top:88px; align-self:last baseline; }
.cw-hiw__more { grid-area:m; margin:0; align-self:last baseline; }
body measures: scope 440px, plan 460px, build 520px, stay 480px (max-width on .cw-hiw__body per step).
```
Below 1100px: `grid-template-columns:minmax(0,1fr)`, areas stacked "t" "s" "p" "b" "y" "m"; title `max-width:none;
margin-bottom:40px`; inner `<div>` indents: plan 16px, build 32px, scope and stay 0; row offsets plan 56px, build
80px, stay 64px; `.cw-hiw__more { margin-top:28px }`.
Type (all `color: inherit`):
- `.cw-hiw__title` (home): keeps `.cw-secttitle`; add `font-size: clamp(44px, 6.5vw, 92px)`.
- `.cw-hiw__label`: JetBrains Mono (`var(--font-cw-mono)`), 12px, 400, uppercase, letter-spacing .14em, line-height 1,
  opacity .9, margin 0 0 14px. Never copper.
- `.cw-hiw__head`: Bricolage (`var(--font-cw-display)`), weight 500, sentence case (`text-transform:none`),
  letter-spacing -.02em, line-height 1.02, margin 0 0 20px, `text-wrap: pretty`, size `clamp(34px, 4.2vw, 60px)`;
  `.cw-hiw__step--build .cw-hiw__head` size `clamp(38px, 5.2vw, 74px)`.
- `.cw-hiw__body`: Hanken (`var(--font-cw-body)`), 400, `clamp(17px, 1.3vw, 18px)`, line-height 1.5, margin 0.
- Copper rule: `.cw-hiw__step > div::before { content:""; display:block; height:2px; width:88px; margin:0 0 16px;
  background:var(--color-accent-copper); transform-origin:left center; }`, width 48px below 1100px. The only copper
  in the steps (copper on espresso fails AA for small text, 3.57:1; a 2px rule is not text).
- `.cw-hiw__note` (services only): Hanken 16px, line-height 1.5, `color: inherit`. At 1100+ `.cw-hiw--services` gets a
  FIFTH template row `"n n n n n n n n n . . ."` after the Stay/link row, `grid-area:n` on the note, margin 40px 0 0.
  Below 1100 it sits in the stack after Stay, before the link (areas "t" "s" "p" "b" "y" "n" "m"), margin 32px 0 0.
/services variant `.cw-hiw--services`: title `font-family:var(--font-cw-display); font-weight:800; text-transform:
uppercase; line-height:.92; letter-spacing:-.025em; font-size: clamp(38px, 4.6vw, 66px); max-width:4.5em` at 1100+;
headlines `clamp(30px, 3.3vw, 48px)`, build `clamp(34px, 3.9vw, 56px)`; row offsets 56/96/64 at 1100+ and 44/60/48
below; the link colour `var(--color-accent-copper-deep)` (the one copper TEXT, AA on bone). Ground: whatever world the
shapes section already has (bone); add none.

MOTION (main-session ruling, overriding Fable's `view()` timelines): use the site's ONE reveal system (the
IntersectionObserver in `components/color-worlds/ScrollReveal.tsx`, `.cw-reveal` / `.is-in`). The native
`animation-timeline: view()` path was deleted on 2026-08-30 because it never played for anyone (comment at the
"Native scroll-driven reveal path DELETED" block), and the page root's `overflow-x: hidden` would freeze it on
/services. So: each step `li` is `.cw-reveal` (it rises 40px and fades in, 0.55s, as today). Add, after the reveal
rules:
```
[data-mode="cw"].cw-js-reveals .cw-hiw__step:not(.is-in) > div::before { transform: scaleX(0); }
[data-mode="cw"] .cw-hiw__step > div::before { transition: transform .7s cubic-bezier(.16,1,.3,1) .15s; }
[data-mode="cw"].cw-js-reveals .cw-hiw__step:not(.is-in) .cw-hiw__body { opacity: 0; transform: translateY(14px); }
[data-mode="cw"] .cw-hiw__body { transition: opacity .55s cubic-bezier(.16,1,.3,1) .12s, transform .55s cubic-bezier(.16,1,.3,1) .12s; }
@media (prefers-reduced-motion: reduce) { [data-mode="cw"] .cw-hiw__step > div::before, [data-mode="cw"] .cw-hiw__body { transform:none !important; opacity:1 !important; } }
```
No JS: `.cw-js-reveals` is never added, so every step renders finished.

## 5. Build and verify (run from the worktree root; brackets are the expected output)
1. `bash .planning/exec/prepush-gates.sh` [last line `PREPUSH: all gates and the build passed`]. It runs every gate
   and `next build --webpack`; do NOT run the bare build instead (LESSONS #47). Run it once.
2. `npx next start -p 3125` in the background.
3. Write `.planning/qa/pass-126/measure.mjs` (puppeteer-core from `C:/tmp/p101tools`, Chrome, deviceScaleFactor 1) and
   run it for 390x844 and 1440x900, reduced motion OFF, after scrolling the whole page in 0.75-viewport steps with
   300ms pauses (so reveals fire). Print JSON to `.planning/qa/pass-126/measure.json`. On `/`:
   - `h2#cw-howiwork-title` text [`How I work.`]; `.cw-hiw__step` count [4]; labels in order [Scope, Plan, Build, Stay];
   - each of the 4 headlines and 4 bodies appears verbatim in `document.body.innerText` after normalising U+00A0 to a
     space [true x8] (read the expected strings from `content/how-i-work.ts` by importing its compiled values or by a
     regex over the file; do not type them);
   - inside `.cw-hiw`: count of digits 0-9 in innerText [0]; elements with computed `position: sticky` [0];
   - reveal probe (the 2026-08-30 DEFECT gate): after the scroll, every `.cw-hiw__step` has class `is-in` [true x4] and
     computed opacity of every `.cw-hiw__body` [1]; the `::before` of each step has computed transform
     [`none` or `matrix(1, 0, 0, 1, 0, 0)`];
   - axe-core serious+critical inside `#products` [0].
   On `/services`: `#sv-hiw-title` text [`How I work.`]; `.cw-hiw__step` count [4]; the note text equals
   `HOW_I_WORK.servicesNote` [true]; the string "Every engagement includes" in innerText [0]; the paragraph under
   "Why one person" contains "Week one is the scoping session" [false] and "When the work is bigger than one person, I
   say so on the call." [true]; axe serious+critical on the page [0]. Horizontal overflow on both pages [<= 0].
4. CLS while scrolling (LESSONS #41): `node .planning/exec/cls-attrib-123.mjs http://localhost:3125/` and
   `.../services` at 390 and 1440 (read that script's header for its arguments) [largest session window <= 0.05 each].
5. Accent crossing (briefs README): `node .planning/exec/crossfade-contrast.mjs` against the local server per its
   header, down and up, normal and reduced motion, 390 and 1440 [0 steps under the floor].
6. Viewport scroll frames (NOT full-page shots; briefs README): copy `.planning/qa/pass-125/scroll-sheet.mjs` from the
   `preview/p125-full-time` branch (`git show preview/p125-full-time:.planning/qa/pass-125/scroll-sheet.mjs`) into
   `.planning/qa/pass-126/`, point it at `/` starting 100px above `#products` and ending when the `$20M+` figure's top
   reaches the viewport middle, and at `/services` from 100px above `#sv-hiw-title` through the "Why one person"
   paragraph. Frames every 0.8 viewport, 700ms settle. Sheets: `sheets/home-hiw-{390,1440}.png`,
   `sheets/services-hiw-{390,1440}.png`. Take the same frames of PRODUCTION (`https://www.micahjonesconsulting.com`)
   for the before: `sheets/home-hiw-{390,1440}-before.png`, `sheets/services-hiw-{390,1440}-before.png`.
7. Stop the server. `git status --short` [the files named in sections 1 to 4 plus new files under
   `.planning/qa/pass-126/`, plus the pre-existing untracked items named in section 0].

## Report back (plain text)
The prepush tail (10 lines), measure.json verbatim, the CLS and crossfade results, the sheet list with sizes,
`git status --short`, and every bracket that did not match, quoted verbatim.
