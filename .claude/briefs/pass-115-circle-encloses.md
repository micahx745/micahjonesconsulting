# Pass 115: the $20M+ hand loop, redrawn to enclose the number

Executor: GLM 5.3 via `scripts/claude-glm.ps1 -Batch` (operator 2026-09-12: conserve the
Claude account). Worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`,
branch `design/live-evolve`. Do not touch the main checkout. Do not push. Do not deploy. Stage
by explicit path; commit with `git commit -F <abs msg> -- <paths>` after printing
`git diff --cached --name-only` (LESSONS #23). Pass-114 (0c9c031) has landed; build on it.

Read before the first edit: this whole brief, `components/hand/HandCircle.tsx`,
`components/color-worlds/RevenueFigure.tsx`, the `.cw-receipts__title` and `.cw-rec*` rules in
`app/globals.css`, `.planning/reviews/astra-114-countup.md`, `.claude/briefs/README.md`
(the two standing Verification clauses), `.planning/exec/countup114.mjs`.

## 0. The ruling

Operator, 2026-09-12, verbatim: "fix the circle then push". Astra's Pass-114 look failed the
circle: the `$` breaks out of the oval top and bottom, the `+` sits outside the right stroke, and
at 390 it reads biased left. The judge measured why. The old loop is an ellipse the same size as
the glyph box, and an ellipse touches its box at only four points, so any such loop must cut the
corners. Numeric search over loop shapes (scratch, 2026-09-12) found that a round circle needs a
left hang of 0.60 to 0.85 of the ink height past the `$` (123 to 178px at 1440), and even a
near-square loop needs about 0.30. The number sits flush on the 40px column edge, so no loop can
enclose it where it stands.

**Ruling: keep a hand-drawn loop, rounded rather than a box (control factor about 0.9), sized
from the measured ink box in em so it holds at every width, and indent the figure so the loop's
outer left edge sits on the column edge where the number starts today.** The title and the
label stay on the column edge; the loop aligns to them, the number sits inside it. Vertical
spacing grows by exactly the loop's overhang so the title and label keep their current gaps.
Reason, one line: the mark has to land on the whole number, and the grid line it answers to is
the column edge, not the glyph.

Motion is unchanged: same 2.65s exception, same draw-in timings, same `play`/`instant`
contract. Dash lengths come from `getTotalLength()` and follow the new path on their own.

## 1. Exact geometry

**New path variant `3` in `HandCircle.tsx` `PATHS`** (viewBox stays `0 0 180 60`; variants 1
and 2 stay untouched as the record):

```
3: {
  primary:
    "M 100 0.5 C 12 -0.5, 0 2, 0 31 C 0 57, 10 60, 88 60 C 171 60, 180 57, 180 29 C 180 2, 170 0, 92 0.5",
  overshoot: "M 116 1.5 C 46 0.5, 2.5 0.5, 2 12",
},
```

Judge's verification of these strings in true aspect, ink aspect W/H from 3.10 to 3.35, margins
below: all four ink corners inside the primary loop with clearance at least 0.077 H (16px at
1440, about 6px at 390); overshoot at least 0.106 H outside the ink; centre offset under 0.002 H.

**Two new optional props on `HandCircle`, both backward compatible:**
- `aspect?: "meet" | "none"` — default `"meet"`; sets `preserveAspectRatio` to
  `xMidYMid meet` or `none`. With `none` the loop maps linearly onto the box and the existing
  `vectorEffect="non-scaling-stroke"` keeps the stroke width uniform.
- `boxStyle?: React.CSSProperties` — merged OVER the existing inline style object
  (`{ ...default, ...boxStyle }`), so a caller can replace `inset`/`width`/`height`.
Extend the `variant` type to `1 | 2 | 3`.

## 2. Measure the ink box first (M1, before any edit, printed in the commit body)

Script `.planning/exec/circle115.mjs` (puppeteer-core from `C:/tmp/p101tools`, Chrome at
`C:/Program Files/Google/Chrome/Application/chrome.exe`). Measurement routine, reused by §4:

- Emulate `prefers-reduced-motion: reduce` (finished frame, nothing moves). Load `/`, scroll
  `.cw-rec` to the viewport centre, wait 400ms.
- `F` = computed `font-size` of `.cw-rec__num` in px. `wrap` = rect of `.cw-rec__wrap`.
- Hide the loop: set `visibility: hidden` on `.cw-rec .hand-circle`.
- Clip: x from `wrap.left - 0.3F` to `wrap.right + 0.3F`; y from
  `max(wrap.top - 0.25F, titleRect.bottom + 1)` to `min(wrap.bottom + 0.25F, lblRect.top - 1)`,
  where `titleRect` is `.cw-receipts__title` and `lblRect` is `.cw-rec__lbl`.
  `page.screenshot({clip, encoding: "base64"})`.
- Decode in a separate `about:blank` page: `Image` from the data URL, draw to a canvas,
  `getImageData`. Background = the median RGB of the four 6x6 corner blocks. Ink = pixels whose
  largest channel difference from background exceeds 60. The ink box is the bounding box of ink
  pixels, divided by the device scale factor, offset by the clip origin (CSS px).
- Restore the loop's visibility.
- Print, in em (divide by `F`), 3 decimals: `L` = inkLeft minus wrap.left, `T` = inkTop minus
  wrap.top, `W` = ink width, `H` = ink height, and the ratio `W/H`.

Run M1 at 1440x900 (dpr 1) and at 390x844 (dpr 2). Use the **1440** values below. If `W/H`
differs between widths by more than 0.03, print that and continue (the numbers are
font-relative and should match).

## 3. Implementation (formulas are the ruling; only their inputs are measured)

With the 1440 values, 3 decimals, rounded UP:

- `hx = 0.32 * H`, `hy = 0.21 * H`
- Loop box, relative to the wrap, in em: `left = L - hx`, `top = T - hy`,
  `width = W + 2*hx`, `height = H + 2*hy`
- Indent `X = max(0, hx - L)`; vertical room `Y = hy`

**`components/color-worlds/RevenueFigure.tsx`:** the `HandCircle` call becomes
`variant={3} aspect="none" boxStyle={{ inset: "auto", left: "<left>em", top: "<top>em", width: "<width>em", height: "<height>em" }}`
with the numbers written as literals. Every other prop and every line of the state machine
stays exactly as Pass-114 left it. Add one comment line above the call citing Pass-115 and this
brief.

**`app/globals.css`:** amend two existing rules only.
- `[data-mode="cw"] .cw-rec__wrap` gains `margin-left: <X>em;` — the loop's outer left edge
  then lands on the column edge, where the title and label start.
- `[data-mode="cw"] .cw-rec__num` gains `padding-block: <Y>em;` — the loop's overhang above and
  below, so the title and label keep their current gaps to the topmost and bottommost mark.
  Padding, not margin: adjacent vertical margins collapse and would not add.
- A comment on each line citing Pass-115. No colour, font, or other rule changes.

Nothing else moves. `SplitReveal`, Lenis, the view transition, TitleCard, the count timings,
the label copy: untouched.

## 4. Verification (Git Bash, `MSYS_NO_PATHCONV=1`, exit codes read directly)

The two standing clauses in `.claude/briefs/README.md` apply: a chk whose `got` misses its
`expect` is a failure, and the executor never reinterprets an expected value.

Static gates, each exit 0: `npx tsc --noEmit` · `npx tsx lib/copy-lint-cli.ts` ·
`node scripts/retired-phrases-gate.mjs` · `node scripts/accent-states-lint.mjs` ·
`node scripts/gsap-quarantine-gate.mjs` ·
`npx prettier --check components/hand/HandCircle.tsx components/color-worlds/RevenueFigure.tsx app/globals.css` ·
`npx next build --webpack`.

Then `npx next start --port 3200` (kill any earlier server on 3200 by PID first) and
`node .planning/exec/circle115.mjs`. After the §2 measurement, at each width (1440x900 dpr 1,
then 390x844 dpr 2, reduced motion on), with the loop visible: sample the FIRST path of
`.cw-rec .hand-circle` at 400 points via `getPointAtLength`, mapped to client coordinates with
`getScreenCTM()`; sample the SECOND path at 150 points the same way. Print one line per check:

- `C1 corners inside loop: got N, expect 4` (even-odd point-in-polygon, ink box corners)
- `C2 min corner clearance: got Xpx, expect >= <0.05*inkH>px` (corner to loop polyline)
- `C3 overshoot points inside ink box: got N, expect 0`
- `C4 loop left to column edge: got Xpx, expect <= 3` (abs of loop min x minus title left)
- `C5 loop inside viewport: got true|false, expect true` (min x >= 0, max x <= innerWidth)
- `C6 title clearance: got Xpx, expect >= 12` (loop min y minus title bottom)
- `C7 label clearance: got Xpx, expect >= 8` (label top minus loop max y)
- `C8 centre x offset: got R, expect <= 0.02` (abs loop centre x minus ink centre x, over ink width)
- `C9 centre y offset: got R, expect <= 0.04` (same for y, over ink height)
- `C10 tick text: got "…", expect "$20M+"`

End with `circle failures: N` over both widths; the script exits 1 if N is not 0.

Then, same server: `node .planning/exec/countup114.mjs` → `countup failures: 0` (the Pass-114
contract must survive, including chk4's dashoffset of 0 at 3000ms and chk5's CLS of 0).
`node scripts/render-gate.mjs` exit 0. `node scripts/axe-worlds.mjs http://localhost:3200 /`
exit 0. Stop the server by PID when done.

**Fix rule.** The path strings, `0.32`, `0.21`, `aspect="none"`, and the indent/padding method
are the ruling. On a failed check the executor may fix only a measurement bug or a wrong
application of the §3 formulas, once. If a C-check still fails, stop before the commit and
report the raw block. Never change the geometry constants to pass.

**Captures** into `.planning/qa/pass-115/`, reduced motion on, figure centred, same framing as
Pass-114's: `home-rec-done-1440.png`, `home-rec-done-390.png`, and `home-receipts-1440.png`
(from the section title through the four exits, so the indent and spacing read in context).

## 5. Rejected

- A round circle around the whole figure: 123 to 178px of left hang at 1440 (judge's search).
- Leaving the number on the column edge and hanging the loop into the gutter: the gutter is
  40px at 1440 and about 20px at 390; the loop needs about 67 and 25.
- Shrinking the figure to make room: the proof scale is part of the approved composition.
- An underline or bracket instead of a loop: brand.json `motion.countup` says the circle
  closes; changing the mark is an operator ruling.
- A square box: reads as a UI frame, not a pen.
- Editing variants 1 and 2 in place: kept as the record.
- Margin instead of padding for the vertical room: adjacent margins collapse.
- Any change to timings, easing, the state machine, or a second animated element.

## 6. Commit

`Pass-115: the $20M+ hand loop redrawn to enclose the number (operator 2026-09-12, Astra 114 Q2)`
with `components/hand/HandCircle.tsx`, `components/color-worlds/RevenueFigure.tsx`,
`app/globals.css`, `.planning/exec/circle115.mjs`, `.planning/qa/pass-115/`; the body carries
the M1 numbers at both widths and the computed `left/top/width/height/X/Y`. Then
`.claude/RESUME.md` alone (merge from the committed file, at most 2500 bytes, `wc -c` printed).
Do not push.

## 7. Return (judge, at most 3 calls)

The `circle failures` block for both widths, the `countup failures` line, and
`home-rec-done-1440` plus `home-rec-done-390`. Astra then gets one look: the same Q2 as Pass-114
plus "does the indent read as intentional". After a PASS the judge pushes
`design/live-evolve` only, per the operator's "fix the circle then push". Fast-forwarding main
to production stays a separate operator go-ahead.
