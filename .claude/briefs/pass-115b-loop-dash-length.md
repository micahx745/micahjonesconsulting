# Pass 115b: the loop's dash length, measured where the stroke is drawn

Executor: GLM 5.3 via `scripts/claude-glm.ps1 -Batch`. Worktree
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Do not touch the main checkout. Do not push. Do not deploy. Stage by
explicit path; `git commit -F <abs msg> -- <paths>` after printing
`git diff --cached --name-only`. Pass-115 (032ce79) has landed; build on it.

Read first: this brief, `components/hand/HandCircle.tsx`,
`components/color-worlds/RevenueFigure.tsx`, `.planning/exec/circle115.mjs`,
`.planning/exec/countup114.mjs`, `.claude/briefs/README.md` (standing clauses), and
`.planning/qa/pass-115/home-rec-done-1440.png` (look at it).

## 0. The ruling

Operator 2026-09-12: "fix the circle then push". Pass-115 passed every geometric check and
the capture still shows no loop: a top stroke, a separate bottom stroke from about x 287 to
727, and both sides missing. The Pass-114 capture shows the same broken arcs, so this predates
Pass-115 and was part of what Astra failed.

Judge's hypothesis, to be PROVEN in §1 before any edit: `HandCircle` sets
`strokeDasharray` and `strokeDashoffset` to `getTotalLength()`, a length in SVG user units,
but both paths carry `vectorEffect="non-scaling-stroke"`, under which Chrome lays dashes out
in screen pixels. The loop box is about 4.5 times its viewBox at 1440, so one "full-length"
dash covers only a fraction of the stroke and the rest renders as gap.

**Ruling: keep `non-scaling-stroke`; compute the dash length in screen pixels at the moment
it is used, and clear the dash entirely once a frame is final.** Reason, one line: the stroke
has to be drawn in the space the browser draws it in, and a finished mark must not depend on
a length that a later resize could invalidate.

The checks that passed measured the model (`getPointAtLength`), never the pixels. §3 adds
the missing check, C11, and it must be seen FAILING on the current code before the fix.

## 1. Prove the mechanism (before any edit)

Add a `--probe` mode to `.planning/exec/circle115.mjs`. At 1440x900 dpr 1 with reduced motion
on, figure centred, for each of the two paths of `.cw-rec .hand-circle`: `user` =
`getTotalLength()`; `screen` = the sum of distances between 400 consecutive
`getPointAtLength` samples each mapped through `getScreenCTM()` to client coordinates; print
`P1 path<i>: user=<u> screen=<s> ratio=<s/u>` (2 decimals).

Expect the ratio above 2.0 for both paths. **If either ratio is 2.0 or below, the hypothesis
is wrong: stop, edit nothing, and report the raw probe output.**

## 2. Implementation (`components/hand/HandCircle.tsx` only)

- Add `function screenLength(el: SVGPathElement): number`: if the path's
  `vector-effect` attribute is `non-scaling-stroke`, return the §1 screen length from 200
  samples through `el.getScreenCTM()` (when the CTM is null, fall back to
  `getTotalLength()`); otherwise return `getTotalLength()`. Return `Math.ceil(length) + 2`.
- **Final frame** (every branch that shows the finished stroke: `instant`, reduced motion,
  controlled `instant || reduced`): `transition = "none"`, `strokeDasharray = "none"`,
  `strokeDashoffset = "0"`.
- **Hidden** (controlled `play === false`): `S = screenLength(el)`;
  `strokeDasharray = \`${S} ${S}\``; `strokeDashoffset = \`${S}\``; `transition = "none"`.
- **`drawIn`**: `S = screenLength(el)` measured when it runs; `strokeDasharray = \`${S} ${S}\``;
  `strokeDashoffset = \`${S}\``; then the existing rAF, transition string, timing and easing
  exactly as they are, to `strokeDashoffset = "0"`. Add a one-shot `transitionend` listener
  on that element which sets `strokeDasharray = "none"` so the drawn mark survives a resize.
  In reduced motion `drawIn` takes the final-frame branch.
- Keep the existing `motion-ok` comment on the transition line. No timing, easing, delay,
  path, prop or geometry change. `RevenueFigure.tsx`, `app/globals.css`: untouched.

## 3. The missing check: C11, rendered stroke coverage

Add to `.planning/exec/circle115.mjs`, run after C10:

- Hide the glyphs only: `visibility: hidden` on `.cw-rec__tick`. The loop stays visible.
  Take a full-frame screenshot (clip renders unscrolled here) and decode it in `about:blank`.
- Sample the FIRST path at 200 evenly spaced lengths and the SECOND at 80, each mapped through
  `getScreenCTM()` to client coordinates, times dpr for device pixels.
- A sample is covered when some pixel within 3 CSS px of it differs from the section
  background (median of a 20x20 block 0.4 of the ink height above the loop's top-left)
  by more than 40 on its largest channel.
- Print `C11 stroke coverage primary: got R, expect >= 0.97` and
  `C11 stroke coverage overshoot: got R, expect >= 0.90` (R to 3 decimals).
- Restore the tick's visibility.

Run C11 in three states and label each line with its state:
1. `reduced`: 1440x900 dpr 1, reduced motion on, finished frame.
2. `played`: 1440x900 dpr 1, reduced motion OFF, the countup114 real-run scroll (arm zone,
   hold 250ms, centre), then wait 3200ms so the draw has finished.
3. `reduced-390`: 390x844 dpr 2, reduced motion on.

`circle failures` now counts C1 to C11 across every state.

## 4. Order of work and verification (Git Bash, `MSYS_NO_PATHCONV=1`, exit codes direct)

The standing clauses apply: a missed `expect` is a failure; never reinterpret one.

1. Build is current at 032ce79. Start `npx next start --port 3200` (kill any earlier server on
   3200 by PID). Run `node .planning/exec/circle115.mjs --probe` → §1 block. Stop on ratio <= 2.0.
2. Add C11 (§3). Run `node .planning/exec/circle115.mjs` on the UNCHANGED component and print
   the whole block. **Expect C11 to FAIL** in at least the `reduced` state at 1440. If C11
   passes everywhere on the unchanged code, the check cannot see the defect: stop and report.
3. Stop the server by PID. Apply §2. Static gates, each exit 0: `npx tsc --noEmit` ·
   `npx tsx lib/copy-lint-cli.ts` · `node scripts/retired-phrases-gate.mjs` ·
   `node scripts/accent-states-lint.mjs` · `node scripts/gsap-quarantine-gate.mjs` ·
   `npx prettier --check components/hand/HandCircle.tsx` · `npx next build --webpack`.
4. Start the server again. `node .planning/exec/circle115.mjs` → `circle failures: 0`
   (C1 to C11, every state). `node .planning/exec/countup114.mjs` → `countup failures: 0`.
   `node scripts/render-gate.mjs` exit 0. `node scripts/axe-worlds.mjs http://localhost:3200 /`
   exit 0. Stop the server by PID.
5. countup114 rewrites the Pass-114 PNGs: restore them with
   `git checkout -- .planning/qa/pass-114/` before staging.

Fix rule: you may fix a measurement bug in the scripts once. Never change a threshold, a path,
a timing, or the §2 method to pass. On a remaining failure, stop before the commit and report.

**Captures** into `.planning/qa/pass-115b/`, same framing as Pass-115: `home-rec-done-1440.png`
and `home-rec-done-390.png` (reduced motion, finished frame), `home-rec-played-1440.png`
(motion on, 3200ms after the play scroll), `home-receipts-1440.png`.

## 5. Rejected

- Dropping `non-scaling-stroke`: under `aspect="none"` the 3-unit stroke would render about
  14px thick at 1440 and 5px at 390, and unevenly by direction.
- The `pathLength` attribute: how it combines with non-scaling-stroke dashes varies by engine.
- A huge fixed dasharray: the 1100ms draw would sit blank for most of its duration.
- Fixing `HandUnderline.tsx` (same pattern): nothing mounts it. Separate item for the judge.
- Any geometry, timing, easing, or copy change.

## 6. Commit

`Pass-115b: the hand loop's dash measured in screen pixels, so the whole loop renders (operator 2026-09-12)`
with `components/hand/HandCircle.tsx`, `.planning/exec/circle115.mjs`,
`.planning/qa/pass-115b/`. The body carries the §1 probe block, the failing C11 lines from step
2, and the passing C11 lines from step 4. Then `.claude/RESUME.md` alone (merge from the
committed file, at most 2500 bytes, `wc -c` printed). Do not push.

## 7. Return (judge, at most 3 calls)

The probe block, both C11 blocks (failing before, passing after), `countup failures`, and the
three rec captures. Then one Astra look (the Pass-115 prompt), then the judge pushes
`design/live-evolve` only.
