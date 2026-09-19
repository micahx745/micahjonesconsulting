# Pass-123c brief: the exits scoreboard stops shifting layout (same look)

**Scope: FIXES the home page's exits scoreboard only (`components/color-worlds/ExitScoreboard.tsx` and the
`.cw-exits.is-live` CSS in `app/globals.css`). No other component, page, string or colour changes. The
scoreboard must look the same at every beat, and move the same way between beats.** (LESSONS #39.)

## 1. The ruling
The live scoreboard (Pass-122) shifts layout at every beat: toggling `.is-current` re-flows the list (the
current row grows, `--cw-s` becomes `--cw-p`, the company label changes size, the outcome leaves `sr-only`),
and the FLIP transforms only hide the move. Chrome scores the layout boxes: CLS (session windows) 0.3298 at
390 and 0.1990 at 1440 on the live site (LESSONS #41). Operator 2026-09-19, popup: "Fix it next, same look
(Recommended)": "I brief GLM to move each beat change onto transforms so nothing reflows. The scoreboard
looks exactly as approved. You see before/after frames and the CLS numbers, then a separate push."
Reason: a layout that never changes cannot shift; the approved look is preserved by measuring it, not by
redrawing it.

## 2. Copy
None changes. Every string in the section stays as it is (the visible text of `/` must be identical).

## 3. Mechanism (implement exactly this)
**Measure once, then move actors.** After fonts are ready, measure the flow layout of each of the four
states, then switch the list into "actor mode": every moving piece is absolutely positioned at the list's
origin with a FIXED font size, and a state is nothing but `translate` and `scale` values (the individual CSS
properties, which compose with the existing `transform` animations and never count as layout shifts).

JS (`ExitScoreboard.tsx`; keep every existing guard, F2 logic, `is-offworld`, the IntersectionObserver
assembly gate, ticks and `beatFor()`):
1. Go live as today, but inside `document.fonts.ready.then(...)` (measuring before Bricolage swaps in
   gives wrong boxes). Guard for unmount before it resolves.
2. `measureStates()`: with the section in flow mode (no `is-actors` class; clear the inline `fontSize`,
   `width`, `translate`, `scale` on every actor and `--cw-line-y` on every row), for k = 0..count-1: set
   `.is-current` on deal k only (and its tick), read layout, and record relative to the list's
   `getBoundingClientRect()` (the `ol.cw-exits__row`): `line[k][i]` = top of deal i; `val[k][i]`,
   `co[k][i]` = left, top, height of each deal's `.cw-exits__val` / `.cw-exits__co`; and for i === k only,
   the CURRENT state's computed `font-size` of that deal's val, co and outcome, the outcome's left, top and
   width, and the co's width. All of this runs in one task (no paint between states), with `transition:
   none` set inline on the actors, rows and ticks for the pass and cleared after it, then the section
   left on the real current state.
3. Enter actor mode: add `is-actors` to the section; for each deal i set inline `font-size` on val, co and
   outcome to the CURRENT-state px sizes recorded in step 2, `width` on the outcome to its current-state
   width, and the outcome's `translate` to its own current-state position (it never moves, it only shows).
   Then read each val's and co's base height (translate and scale cleared) as `baseH`.
4. `apply(k, animate)`: for each deal i, `val.style.translate = "<val[k][i].left>px <val[k][i].top>px"`,
   `val.style.scale = String(val[k][i].height / baseH.val[i])`, the same for co, and
   `deal.style.setProperty("--cw-line-y", "<line[k][i]>px")`; toggle `.is-current` on deals and ticks as
   today (colour, outcome visibility and the one-time assembly still key off it). With `animate` false, set
   `transition: none` inline on every actor and row first, force a reflow, then clear it.
5. Replace the FLIP block in `setCurrent` with `apply(next, true)`. Initial state: `apply(beatFor(), false)`.
6. Re-run `measureStates()` + `apply(current, false)` ONLY when `innerWidth` changes (a mobile URL bar
   collapse changes only the height, and `--cw-stage-h` is `svh`, so it must not re-measure).

CSS, one block AFTER every existing `.cw-exits.is-live` rule, each selector prefixed
`[data-mode="cw"] .cw-exits.is-live.is-actors`:
- `.cw-exits__row`: `position: relative;` (it keeps `flex: 1 1 auto` and so its size).
- `.cw-exits__row .cw-exits__deal` and `.cw-exits__row .cw-exits__deal.is-current`: `display: block;
  height: 0; min-height: 0; padding: 0; border: 0; transform: none; translate: none; will-change: auto;`
  (a deal must NOT become the containing block of its children: no transform, translate, filter,
  will-change or position on it).
- `.cw-exits__row .cw-exits__deal + .cw-exits__deal::before`: `content: ""; position: absolute; left: 0;
  right: 0; top: 0; border-top: 1px solid color-mix(in srgb, currentColor 22%, transparent); translate: 0
  var(--cw-line-y, 0px); transition: translate 0.6s cubic-bezier(0.2, 0.7, 0.1, 1);`
- `.cw-exits__val`, `.cw-exits__co`: `position: absolute; left: 0; top: 0; margin: 0; width: max-content;
  white-space: nowrap; transform-origin: 0 0; transition: translate 0.6s cubic-bezier(0.2, 0.7, 0.1, 1),
  scale 0.6s cubic-bezier(0.2, 0.7, 0.1, 1), color 0.3s ease;`
- `.cw-exits__outcome` (every deal): `position: absolute; left: 0; top: 0; height: auto; margin: 0;
  overflow: visible; clip: auto; white-space: normal; opacity: 0;` and `.is-current .cw-exits__outcome`:
  `opacity: 1;` (the existing `cw-exit-caption` entrance keeps running on `transform` and `opacity`; it
  composes with `translate`). Screen readers still read all four outcomes, as today.
Flow mode (no `is-actors`), reduced motion, no JS and the static ledger stay byte-for-byte as they are.

## 4. Motion
Same as today: 0.6s `cubic-bezier(0.2, 0.7, 0.1, 1)` for every move and scale, colour 0.3s, the one-time
weight assembly (0.8s) and the outcome caption (0.45s, 0.2s delay) unchanged. Nothing new moves.

## 5. Verification (commands and expected output; LESSONS #24-#28, #34, #37, #40, #41)
Port 3250, stop the server after each use. BEFORE = the live site (`https://www.micahjonesconsulting.com`,
the same home code as this tree before the edit). Viewports 390x844 (DPR 2, isMobile, hasTouch) and
1440x900.
- V1 `.planning/exec/scoreboard-geom-123c.mjs <base> <out.json>`: load `/`, normal motion; for beat b in
  0..3 scroll (instant) to `Y0 + (b + 0.5) * 0.5 * innerHeight` (Y0 as in `.planning/exec/scrollbar-fit.mjs`),
  wait 1500ms; record the current index, `.cw-exits__stage` top and the nav height, and for every deal the
  TEXT rects (`Range.getClientRects()` union) of val, co and (only if its computed opacity > 0.5) outcome,
  plus each divider's y (BEFORE: `li.getBoundingClientRect().top` for deals 2-4; AFTER: the list's top +
  the row's computed `--cw-line-y`). Run BEFORE and AFTER at both widths.
- V2 `node .planning/exec/scoreboard-geom-compare-123c.mjs before.json after.json`: EXPECT every text rect
  and divider within 1.5px on each edge, the same visible set, the same current index per beat, and
  `stageTop` equal to the nav height at every beat, at both widths; prints PASS/FAIL per item. Prove it
  bites first: run it on a copy of the AFTER file with one val moved by 3px; EXPECT FAIL naming it.
- V3 `node .planning/exec/cls-attrib-123.mjs http://localhost:3250 .planning/qa/pass-123/cls-123c`: EXPECT
  the largest session window <= 0.05 at 390 and at 1440 (target 0). BEFORE is the live 0.3298 / 0.1990.
- V4 frames: the stage at each beat after settling, and 250ms after crossing into beats 1 and 3, BEFORE and
  AFTER at both widths, to `.planning/qa/pass-123/scoreboard/`; compose `sheet-390.png` and `sheet-1440.png`
  (row 1 BEFORE, row 2 AFTER, labelled). Reduced-motion and JS-disabled frames of the section BEFORE and
  AFTER: EXPECT pixel-identical (the static ledger is untouched).
- V5 after the four beats every `.cw-exits__val` has `is-assembled` and none has `is-assembling`.
- V6 `crossfade-contrast.mjs` normal and `--reduced-motion`: EXPECT `"stepsUnder3to1": 0` in both.
- V7 visible text of `/` BEFORE (local build before the edit) vs AFTER: `diff` prints nothing.
- V8 `measureStates()` cost at 390 with 4x CPU throttle (log `performance.now()` around it once): report ms.
- V9 zero console errors across V1 and V4; `scrollWidth` 390 at every stop.
- V10 `pnpm exec prettier --check` on the two files; `pnpm exec tsc --noEmit` exit 0; `pnpm build` exit 0,
  every gate passing; route JS bytes for `/` before and after (report the delta).
The standing rules: no check is passed by editing the work to fit it (LESSONS #37); if V2 or V3 fails,
stop and report the raw numbers.

## 6. Rejected
- The static ledger until fixed: the operator chose the fix with the same look.
- A separate "poster slot" above a fixed ledger: changes the approved look (the current exit expands in
  place, in DOM order).
- Keeping FLIP and animating `top`/`height`: still layout, still scored.
- `contain`, `content-visibility` or a fixed-position wrapper: none of them stops Chrome scoring the shift.
- Scaling UP from the small size: blurry poster text; actors sit at their CURRENT size and scale down.

## 7. Return conditions
V2 or V3 failing, any change the look needs beyond this mechanism, or a font-loading race. The main
session opens V4's sheets before anything reaches the operator; he sees before/after and the CLS numbers
before a push.

## 8. Parked operator decisions
Push timing (a separate approval after he sees the sheets).
