# Pass-118 — Tuned font fallbacks: the stand-in fonts take the same lines as the real ones

Written 2026-09-14 by the ruling tier (Opus 5). Worktree `.claude/worktrees/p106-live`, branch
`design/live-evolve`. Evidence: `.planning/reviews/PERF-118A-FINDINGS.md` (round 2, Sol-checked).

## 0. Status

- Operator 2026-09-14, verbatim: "go with 1". Option 1 was: tune the fallback fonts so the
  stand-ins take the same space as Bricolage and Hanken in the hero; no visible change; proven with
  the same probe (CLS <= 0.05 on 10 of 10 loads) plus Lighthouse.
- Deploy is not approved by this ruling. Push, merge to `main` and deploy each need his words.

## 1. The ruling

Home CLS (0.290 in the probe, 0.182 in Lighthouse devtools) is the web fonts replacing their Arial
stand-ins: with fonts blocked it is 0.000 on every load. The stand-ins are next/font's generated
faces (Bricolage: Arial at size-adjust 105.43%; Hanken: Arial at 100.94%). They wrap the hero
differently from the real fonts, so the headline and sub line change line count when the fonts
arrive. Replace the two generated stand-ins with our own, whose `size-adjust` is measured on this
site's rendered text so that every above-the-fold text element keeps its line count and height when
the real font swaps in. Reason: it removes the reflow without changing what any visitor sees once
fonts load, keeps `display: swap`, and adds no motion or layout rule. JetBrains Mono is out of scope
(its only shift source measured 0.001).

## 2. Copy

None. No visible string changes.

## 3. Spec

3.1 `lib/fonts.ts`. For `bricolage` only: `adjustFontFallback: false` and
`fallback: ["Bricolage Tuned Fallback"]`. For `hankenGrotesk` only: `adjustFontFallback: false` and
`fallback: ["Hanken Tuned Fallback"]`. Nothing else in the file changes (`display: "swap"` and
`preload` stay). `jetbrainsMono` is untouched.

3.2 `app/globals.css`, appended at the very end, this block with the two measured values filled in
(the only change to the file):

```css
/* ================================================================
 * Pass-118 (operator 2026-09-14): tuned font fallbacks.
 * next/font's generated Arial stand-ins wrapped the hero differently
 * from the real faces, so the swap reflowed it (home CLS 0.290 in
 * the probe, 0 with fonts blocked). size-adjust measured on this
 * site by .planning/exec/fallback118.mjs; vertical overrides keep
 * next/font's metrics rescaled to the new size-adjust.
 * ================================================================ */
@font-face {
  font-family: "Bricolage Tuned Fallback";
  src: local("Arial");
  size-adjust: <SB>%;
  ascent-override: <AB>%;
  descent-override: <DB>%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "Hanken Tuned Fallback";
  src: local("Arial");
  size-adjust: <SH>%;
  ascent-override: <AH>%;
  descent-override: <DH>%;
  line-gap-override: 0%;
}
```

Fill rule, no judgement: `<SB>` and `<SH>` are the `chosen` values printed by §3.3. Then
`<AB>` = 88.21 x 105.43 / SB, `<DB>` = 25.61 x 105.43 / SB, `<AH>` = 99.07 x 100.94 / SH,
`<DH>` = 30.02 x 100.94 / SH, each rounded to 2 decimals. (88.21, 25.61, 105.43, 99.07, 30.02 and
100.94 are next/font's generated values, read from production CSS on 2026-09-14.)

3.3 `.planning/exec/fallback118.mjs` (new; the tuner). puppeteer-core from
`C:/tmp/p101tools/package.json`, Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`,
against a local production build of the CURRENT branch (fonts not yet changed), base
`http://localhost:3200`. For each face F in {Bricolage, Hanken}, each page in {`/`, `/services`},
each width in {390, 412, 768, 1440} (412 with deviceScaleFactor 1.75 and mobile; the others at 1):
- Load the page, wait for `document.fonts.ready` plus 1s, reduced motion on.
- Record the REAL state: every element with its own non-empty text node, visible (box > 2px), whose
  computed first font family is F's real family, and whose top is inside the first viewport height.
  For each: line count (distinct rounded `top` values of a Range's `getClientRects()`) and box height.
- Inject a candidate face `@font-face { font-family: "Cand"; src: local("Arial"); size-adjust: S%;
  ascent-override and descent-override by the §3.2 formula; line-gap-override: 0% }` and override
  ONLY F's variable on the root (`:root:root { --font-bricolage: "Cand" }` for Bricolage,
  `--font-hanken` for Hanken), so the other face stays real. Await `document.fonts.load` for "Cand".
- For S from 80.00 to 115.00 in steps of 0.25, count mismatches over the same elements: line count
  differs, or box height differs by more than 1px.
- A value S is feasible when its mismatch count is 0 on both pages at all four widths. `chosen` is
  the middle value of the longest contiguous run of feasible S, rounded to 0.25. Print, per face:
  `F feasible runs: a-b, c-d ... chosen: X` or, if none, `F feasible: none; best S=Y with N
  mismatches:` followed by each mismatch (page, width, element, real lines/height, cand lines/height).
- Then a combined check with both candidate faces at their chosen values: print
  `combined mismatches: N`.
- Write `.planning/qa/pass-118/fallback118.json` with every S's mismatch count per page and width.
- Geometry dump: the REAL-state elements (page, width, a selector path, line count, and rect x, y,
  width, height) go to `.planning/qa/pass-118/geometry-before.json`, or `geometry-after.json` when
  run with `--after`. `--compare` reads both and prints `geometry diffs: N` (a diff is any rect value
  more than 0.5px apart, or a line count that differs, or an element present in one file only).
- `--verify`: no candidate and no search. For each page and width, record the elements with web
  fonts blocked (request interception aborts `.woff2` and `.woff`) and with fonts loaded, and print
  `verify mismatches: N` over the same line-count and 1px height rule.
- Bite proof, before any search (LESSONS #26): with S = 105.43 for Bricolage and 100.94 for Hanken
  (next/font's current values), print `bite mismatches: N`. Expected N >= 1 on `/` at 412, since the
  probe measured the hero reflowing at those values. If N = 0 the tuner cannot see the defect: stop.

## 4. Motion

None. No animation, transition or timing changes.

## 5. Verification

Git Bash, `MSYS_NO_PATHCONV=1`, exit codes read directly. The standing clauses in
`.claude/briefs/README.md` apply (count what renders, never reinterpret an expect, measure the
render, scope from the layout). Server lifecycle as in `pass-117-services-type-ladder.md` §10.3.

5.1 Before any edit, on the current branch: `npx next build --webpack` exit 0; start the server;
`node .planning/exec/perf118a.mjs --q1 --loads 5 --base http://localhost:3200`, then
`node .planning/exec/perf118a-tables.mjs` → the `q1-A` row CLS max > 0.05 (the local bite: the
defect reproduces on a local build). Copy `.planning/qa/pass-118a/probe.json` to
`.planning/qa/pass-118/probe-before.json`, then `git checkout -- .planning/qa/pass-118a/probe.json`
(the probe writes over Pass-118a's committed data; restore it every time).
Also `node .planning/exec/fallback118.mjs` → `bite mismatches:` >= 1, then the runs and `chosen`
for both faces, `combined mismatches: 0`, and `geometry-before.json` written. Stop the server. If either face prints `feasible: none` or combined mismatches are
not 0: stop and report the printed mismatches. The judge rules.

5.2 Apply §3.1 and §3.2 with the chosen values. Static, each exit 0 or the stated count:
`npx prettier --check lib/fonts.ts app/globals.css`; `git diff --name-only -- . ':(exclude).planning' ':(exclude).claude'`
→ exactly `app/globals.css` and `lib/fonts.ts`; `git diff -U0 app/globals.css | grep -c '^@@'` → `1`;
`npx tsx lib/copy-lint-cli.ts`; `node scripts/retired-phrases-gate.mjs`;
`node scripts/accent-states-lint.mjs`; `node scripts/gsap-quarantine-gate.mjs`.

5.3 Build and serve: `npx next build --webpack` exit 0; `npx tsc --noEmit` exit 0; start the server.
- The served CSS carries the tuned stack: `curl -s http://localhost:3200/` → take each
  `/_next/static/...css` href, fetch, and count `Bricolage Tuned Fallback` and
  `Hanken Tuned Fallback` → each >= 1; count `Bricolage Grotesque Fallback` and
  `Hanken Grotesk Fallback` → each 0.
- `node .planning/exec/fallback118.mjs --verify` (the tuner in verify mode: no candidate injection;
  it compares the page with web fonts blocked against the page with fonts loaded, same elements,
  same widths) → `verify mismatches: 0`.
- `node .planning/exec/perf118a.mjs --q1 --q2 --base http://localhost:3200` then
  `node .planning/exec/perf118a-tables.mjs` → `q1-A` and `q2-A` rows: CLS max <= 0.05 on every
  load (10 and 5). Copy `.planning/qa/pass-118a/probe.json` to
  `.planning/qa/pass-118/probe-after.json`, then `git checkout -- .planning/qa/pass-118a/probe.json`.
- Geometry parity with fonts loaded: `node .planning/exec/fallback118.mjs --after` then
  `node .planning/exec/fallback118.mjs --compare` → `geometry diffs: 0`. The real fonts render
  exactly as before.
- `node .planning/exec/type117.mjs http://localhost:3200` → `type117 failures: 0`.
- `node scripts/render-gate.mjs`; `node scripts/axe-worlds.mjs http://localhost:3200 / /services /packages`;
  `node scripts/layout-gate.mjs http://localhost:3200`; `bash .planning/exec/card1-115.sh http://localhost:3200`
  → exit 0, `card1 failures: 0`.
- Stop the server.

5.4 After an approved deploy only (not in this pass's commit): on production, `perf118a.mjs --q1 --q2`
plus the tables → CLS max <= 0.05 on every load; Lighthouse devtools 3 runs per URL → CLS <= 0.05
each. If production fails, revert by promoting the previous deployment.

## 6. Rejected

- `display: optional` for Bricolage (option 2): no shift, but slow first visits could see the
  headline in the stand-in. The operator chose 1.
- Fixed heights on the hero text (option 3): changes layout and needs design review.
- Keeping next/font's generated fallback and adding a second one: the generated face always matches
  local Arial first, so a second fallback is never used.
- A per-weight fallback (`local("Arial Bold")` for 600-800): not needed unless §3.3 finds no
  feasible single value; if so the judge rules on it, the executor does not add it.
- Tuning JetBrains Mono: its measured shift was 0.001.
- Hand-picking values from font files or a calculator: the value is measured on this site's render.
- `font-size-adjust` on elements: it matches x-height, not the wrap width that causes the reflow.
- Any change to sizes, weights, letter-spacing, line-height or layout.

## 7. Return conditions

The judge returns after §5.3: reads the tuner output, the before and after tables, and the gate
lines. One Astra look: two 412 frames of `/` with web fonts blocked (stand-in state) before and after,
and the fonts-loaded frame, judging whether the swap is now invisible in layout. Deploy on the
operator's words, then §5.4.

## 8. Parked operator decisions

- Android has no local Arial, so both the old and the tuned stand-ins fall through to the system
  sans there; this pass does not change Android. Vercel Speed Insights field CLS by device would
  show whether that matters.
- The JavaScript cost on `/services` LCP (0.57s in the probe) is a separate pass.

## 9. Commit

Explicit pathspec after `git diff --cached --name-only` (LESSONS #23):
`git commit -F <msg> -- lib/fonts.ts app/globals.css .planning/exec/fallback118.mjs .planning/qa/pass-118`
Subject: `Pass-118: tuned font fallbacks (Bricolage <SB>%, Hanken <SH>%): the swap keeps every hero line`.
Body: the tuner's chosen lines, both tables' q1-A and q2-A rows before and after, and the gate lines.
Do not push.

## 10. Fix-list from the Sol plan review

Source: `.planning/reviews/SOL-118-BRIEF-REVIEW.md` (gpt-5.6-sol, 2026-09-14). Items 10-15 there
confirmed, from `node_modules/next` source, the premises the fix depends on: `adjustFontFallback:
false` plus `fallback` drops the generated face in a production build; the §3.2 rescale matches
`server/font-utils.js`; the `:root:root` override reaches every consumer; nothing depends on the
generated names; the probe can reproduce the swap on localhost; no standing gate collides. Where
this section conflicts with an earlier one, it wins.

10.1 (Sol 1) Wording. Every "CLS" in this brief that cites 0.290 or the §5 probe thresholds means
the probe's all-shift lab estimate from `perf118a-tables.mjs`, not a standards-filtered CLS.
Reports say "all-shift CLS". The Lighthouse numbers remain Lighthouse CLS.

10.2 (Sol 2) `lib/fonts.ts` also replaces lines 9-11 (the Pitfall A1 comment) with exactly:

```ts
// IMPORTANT — PITFALL A1 (revised Pass-118, 2026-09-14):
//   next/font's generated Arial fallbacks (adjustFontFallback: true) wrapped the
//   hero differently from the real faces, so the swap reflowed it. Bricolage and
//   Hanken set adjustFontFallback: false and name tuned fallbacks declared in
//   app/globals.css (size-adjust measured by .planning/exec/fallback118.mjs).
//   JetBrains Mono keeps the generated fallback.
```

10.3 (Sol 3) The fallback-metric cause is a hypothesis until the §3.3 bite passes. `bite
mismatches: 0` stops the pass before any edit.

10.4 (Sol 4) Viewports, exactly: 390x844 (deviceScaleFactor 1, mobile, touch); 412x823
(deviceScaleFactor 1.75, mobile, touch); 768x1024 (1, desktop); 1440x900 (1, desktop). Scroll is
0. "First viewport" means `getBoundingClientRect().top < window.innerHeight` in CSS pixels.

10.5 (Sol 5) An element is measured when it has at least one direct child text node with non-empty
trimmed text, its box is wider and taller than 2px, its computed `visibility` is not `hidden` and
`display` is not `none`, it is not inside `.sr-only` or `[hidden]`, and its first computed font
family (quotes stripped) is the face under test. Nested text spans are measured as their own
elements. Line count: `Range.selectNodeContents(el)`, `getClientRects()` with width > 0.5, count
distinct `Math.round(top)`. Box height: `getBoundingClientRect().height` rounded to 0.1. The REAL
state's element list is the membership for that page and width; in search mode the same DOM nodes
are re-measured. Across page loads (verify, geometry) an element's key is its structural path from
`body`: tag names with `:nth-of-type(n)` at each step and no class names, since the next/font class
hashes change between builds.

10.6 (Sol 6) Candidate lifecycle: for each S, create `new FontFace("Cand" + Math.round(S * 100),
'local("Arial")', { sizeAdjust, ascentOverride, descentOverride, lineGapOverride: "0%" })`, add it
to `document.fonts`, `await face.load()`, set the variable to that unique family, wait two
`requestAnimationFrame` ticks, measure, then delete the face from `document.fonts`. If any face's
status is not `loaded`, print `candidate face failed to load from local Arial` and exit 1. Ties:
equal longest feasible runs → the run whose midpoint is closest to 100; a midpoint between 0.25 steps
rounds down; equal best-S counts → fewer mismatches wins, then the S closest to 100.

10.7 (Sol 7) Modes, each running only what it names:
- default: bite, search for both faces, combined check, and `geometry-before.json` (the REAL state
  on the current build).
- `--after`: only the REAL-state dump to `geometry-after.json`.
- `--compare`: no browser; compares the two geometry files by structural key and prints
  `geometry diffs: N`.
- `--verify --label before|after`: fonts blocked against fonts loaded on every route in 10.8, writes
  `verify-<label>.json`, prints `verify <route> <width> mismatches: N` lines and
  `verify total mismatches: N`.

10.8 (Sol 8) The variables are global, so swap parity is also checked beyond the two tuned pages.
Routes for `--verify`: `/`, `/services`, `/packages`, `/about`, `/work`, `/contact`,
`/work/guardicore`, `/call`, at all four widths. Run `--verify --label before` in §5.1 (current
build) and `--verify --label after` in §5.3. Gates: `/` and `/services` read 0 mismatches after at
every width, and no route and width reads more mismatches after than before. The tuned search stays
on `/` and `/services`.

10.9 (Sol 9) Android is unchanged and parked (§8); the 10.6 load check makes a missing local Arial
fail loudly on the tuning machine.

## 11. Judge ruling after the first tuner run (2026-09-14): the sweep floor was wrong

First run on the local before-build: `bite mismatches: 4` (the tuner sees the reflow);
`Bricolage feasible runs: 80.00-83.50 chosen: 81.75`; `Hanken feasible: none; best S=80.00 with
15 mismatches`, every mismatch a candidate taking MORE lines than the real face. Both results sit
on the sweep's lower bound. Direct measurement (`.planning/exec/ratio118.mjs`, text width in the
real face against Arial at the same size, weight, spacing and case) gives the width-parity
size-adjust: Hanken 72.26-76.77% (sub line 74.65%, list items 75.57-76.77%, /services opening
72.26%); Bricolage 72.78-86.21% (optical sizing narrows large text: hero 72.78-78.53%, names and
buttons 79.43-86.21%). next/font's generated 100.94% and 105.43% are 25-30% too wide for these
faces. So §3.3's range becomes S from 60.00 to 115.00 in 0.25 steps for both faces; nothing else
changes. The `ch` hypothesis was checked and rejected: `.cw-sub` is capped at 620px and the box list
items have no `ch` width, yet both mismatched.

## 12. Judge ruling after the second tuner run (2026-09-14): the chosen values, and two `ch` widths

Second run, sweep 60-115: `bite mismatches: 4`; `Bricolage feasible runs: 78.50-83.50 chosen:
81.00`; `Hanken feasible: none; best S=76.00 with 7 mismatches`. Per-width counts from
`fallback118.json`: Hanken is 0 on `/` at every width and on `/services` at 390 and 412 for every
S from 74.50 to 76.00, and `/services` at 768 and 1440 holds 2-3 and 4 mismatches for EVERY S from
70.00 to 76.00. A count that does not move with S is not a width mismatch. The seven elements are
`.cw-sv-open__body` (`max-width: 46ch`, `globals.css:7132`) and `.cw-pbox__fit` (`max-width: 34ch`,
`globals.css:2787`) and the list items beside them: `ch` resolves from the fallback's own "0" during
the swap, so the box shrinks with the stand-in and no size-adjust can hold the wrap. (§11 rejected
`ch` on two other elements; it was right about those and wrong in general.)

Rulings:
- `<SB>` = 81.00 (middle of 78.50-83.50). `<SH>` = 75.25, the middle of the 74.50-76.00 plateau, not
  the tie rule's 76.00, which sits on the plateau's edge (76.50 reads 9). Overrides by the §3.2
  formula: `<AB>` 114.81, `<DB>` 33.33, `<AH>` 132.89, `<DH>` 40.27.
- The two `ch` widths become the same length in `em`, measured on the real face
  (`.planning/exec/zero118.mjs`: Hanken 400's "0" is 0.56em; `.cw-sv-open__body` 566.72px at 22px,
  `.cw-pbox__fit` 304.64px at 16px). In place, nothing else on either rule changes:
  `globals.css:2787` `max-width: 34ch;` → `max-width: 19.04em;` and `globals.css:7132`
  `max-width: 46ch;` → `max-width: 25.76em;`, each with a one-line comment. Rendered width with fonts
  loaded is identical (34 x 0.56 = 19.04, 46 x 0.56 = 25.76). No media rule sets either width.
- §5.2's hunk check becomes `git diff -U0 app/globals.css | grep -c '^@@'` → `3`.
- The §10.8 gate stands as written: `/` and `/services` at 0 verify mismatches at every width after,
  and no route worse than before (`verify total mismatches: 95` before). Other routes keep their
  own `ch` widths in this pass.

## 13. Judge ruling after the first after-build (2026-09-14): v2 of the fallback design

The v1 build (single tuned face per family, S 81.00 and 75.25, two `ch` widths in `em`) passed
type117, render, axe, layout and card1, cut `/services` all-shift CLS from 0.037 to 0.001, and cut
probe LCP on `/` from 2190 to 1386 and on `/services` from 1628 to 1052. It failed four gates:
1. `geometry diffs: 4`, all the `/services` proof link's "→" span, 5.38px narrower with fonts
   loaded. U+2192 is outside every real face's `unicode-range` (they carry U+2191 and U+2193), so
   the arrow always renders in the fallback, which v1 shrank from 105.43% to 81%. Every "→" on the
   site changed size.
2. `/call` 768 and 1440 got one mismatch worse ("Tue to Thu, 10am to 4pm Pacific" wraps while
   fonts load). `ch` resolves from the "0" of the face that renders it: next/font's Arial at
   100.94% gives 0.561em, Hanken's real "0" is 0.560em, v1's tuned face gives 0.418em. Every
   `ch`-sized box on the site shrinks by a quarter during the swap in v1.
3. `/services` 768: one list item still wraps during the swap.
4. `/` all-shift CLS 0.146 on 10 of 10 loads. `.planning/exec/ctarow118.mjs` shows the cause:
   JetBrains Mono. With fonts blocked the hero's mono links measure 169.5px ("See the work") and
   285.1px ("Book a free intro call") against 128.6px and 228.7px loaded, so "See the work" takes
   its own row and `.cw-cta-row` is 169.8px tall against 112.8px. §1 excluded JetBrains Mono on a
   0.001 source reading; the row was listed in 118a as a moved element and misread as a
   Bricolage or Hanken effect. That exclusion is withdrawn. The text-element scope of §3.3 and
   §10.5 could not see a flex row changing height (the LESSONS #28 class of gap).

Rulings, v2. They replace §3.1, §3.2 and the tuner scope where they conflict.
- JetBrains Mono gets a tuned fallback: `local("Courier New")` at `size-adjust: 100%`,
  `ascent-override: 102%`, `descent-override: 30%`, `line-gap-override: 0%`. Measured
  (`.planning/exec/mono118.mjs`): JetBrains Mono against Courier New width parity 99.95-99.99% on
  every mono label, "0" 60.00 against 60.02 at 100px. The overrides are next/font's generated
  JetBrains values (75.79% and 22.29% at 134.59%) rescaled to 100%. `lib/fonts.ts`:
  `adjustFontFallback: false`, `fallback: ["JetBrains Mono Tuned Fallback"]`, and the Pitfall A1
  comment's last line becomes "JetBrains Mono uses a Courier New fallback at 100% (same advance)."
- Bricolage and Hanken each get TWO faces under their tuned family name, in this order: first a
  legacy face with next/font's generated values and no `unicode-range` (Bricolage: Arial 105.43%,
  88.21%, 25.61%; Hanken: Arial 100.94%, 99.07%, 30.02%), then the tuned face with the §3.2 values
  and a `unicode-range` equal to the union of that real family's served ranges with U+0030
  removed. The later rule is checked first for a character both cover (CSS Fonts 4), so letters
  and digits other than 0 use the tuned metrics, while "0" (so `ch` keeps its length) and every
  character the real face lacks (such as "→") keep today's fallback metrics. Ranges, from the
  served CSS on 2026-09-14:
  - both families: `U+0000-002F, U+0031-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD, U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF, U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303, U+0309, U+0323, U+1EA0-1EF9`
  - Hanken adds: `U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F`
- The two `ch`→`em` conversions stay: they render identically and remove the last 0.2% gap between
  the legacy "0" and Hanken's.
- The tuner's scope widens from text elements to EVERY element whose top is in the first viewport
  (still excluding `.sr-only`, `[hidden]` and boxes of 2px or less). A mismatch is a top or height
  more than 1px apart, or a text element's line count differing. Left and width changes are
  reported, not gated. This applies to the search, the combined check, `--verify` and `--compare`.
- The search re-runs on the v1 after-build (it has the `em` widths) with the two-face candidate
  for the face under test; the other two families stay real. JetBrains Mono is not searched; the
  combined check includes it at 100%.
- Before-baselines come from production (the live site is exactly the pre-118 state):
  `--verify --label before --base https://www.micahjonesconsulting.com` and
  `--geometry --label before --base https://www.micahjonesconsulting.com`; after-runs use
  localhost on the v2 build. Geometry with fonts loaded must read `geometry diffs: 0`; the gates of
  §10.8 and the probe gate (`/` and `/services` all-shift CLS <= 0.05 on every load) stand.
