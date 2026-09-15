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
