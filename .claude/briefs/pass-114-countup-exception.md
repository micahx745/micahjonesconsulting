# Pass 114: the $20M+ count-up, as a recorded exception

Executor: Sonnet (Claude, either account) per MODEL_ROUTING §9e. Worktree
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`, branch
`design/live-evolve`. Do not touch the main checkout. Do not push. Do not deploy. Stage by
explicit path; commit with `git commit -F <abs msg> -- <paths>` after reading
`git diff --cached --name-only` (LESSONS #23). Run Pass-113 first if it has not landed.

Read before the first edit: `.planning/design/DIRECTION-110.md` §5.1 (the spec this brief
transcribes), `.planning/design/CRITIQUE-110.md` LOW-7, `docs/DESIGN_BAR.md` R13 and R15,
`.claude/brand.json` `motion`, `components/color-worlds/RevenueFigure.tsx`,
`components/hand/HandCircle.tsx`, the `.cw-rec*` rules in `app/globals.css`, and
`.claude/CLAUDE.md` "One signature motion".

## 0. The ruling

Operator, 2026-09-11, decision 4, chosen against the recommendation to keep it static:
**Approve the exception.** The home `$20M+` figure counts once from `$0M` to `$20M+` over
1.2 seconds and the hand-drawn circle closes after it, finishing at 2.65 seconds. It runs on
`/` only, once per page load, is skipped under reduced motion, and the finished frame is
what SSR, no-JS and a deep link render. This overrides DESIGN_BAR R13 ("no animated
counters") and R15 (≤400ms entrances) for this one element, and it is NOT a second
signature: it does not pin, stick, parallax, or follow the cursor, and it never couples to
scroll position after it starts. Reason, one line: the operator wants the proof moment to
be seen happening, once, and has accepted the rule cost in writing.

## 1. Record the exception first (docs, then code)

**`docs/DESIGN_BAR.md`.** Append one sub-bullet directly under R13 and one under R15, each
exactly:
- under R13: `  - Exception (operator 2026-09-11, decision 4): the home page's own $20M+ figure counts once from $0M to $20M+ over 1.2s, on / only, once per load, skipped under reduced motion, finished frame as the no-JS render. It is a single authored proof moment, not a stat ticker, and not a precedent.`
- under R15: `  - Exception (operator 2026-09-11, decision 4): the same $20M+ count and its circle run 2.65s total, once, never on scroll after start. Recorded in brand.json motion.countup.`

**`.claude/brand.json`, `motion`.** Add a key `countup` after `figure`:
```
"countup": {
  "id": "revenue-countup",
  "description": "Home /: the $20M+ figure counts from $0M to $20M+ over 1200ms (ease 1-(1-t)^3) once the figure is half in view, and the hand circle draws in from 0.6s, finishing at 2.65s. Runs once per load, on / only. Skipped (finished frame) under prefers-reduced-motion, without JS, on a deep link, and when the figure is already in view at load. Never couples to scroll after it starts. Operator exception to R13 and R15, 2026-09-11, decision 4; not a second signature.",
  "files": ["components/color-worlds/RevenueFigure.tsx", "components/hand/HandCircle.tsx", "app/globals.css"]
}
```

**`.claude/CLAUDE.md`, "One signature motion".** After the "No figure animation is mounted"
paragraph, add:
`**One recorded count-up exception** (`motion.countup` in `brand.json`): the home `$20M+` figure counts once and its circle draws in after it, 2.65s total, on `/` only, skipped under reduced motion, finished frame without JS. Operator override of R13 and R15 on 2026-09-11 (decision 4), against the harness's recommendation to keep it static. It is not a second signature and not a precedent; the motion-engineer's standing answer to any further animated figure or counter remains no.`

## 2. Implementation (DIRECTION-110 §5.1, transcribed; LOW-7 applied)

`components/color-worlds/RevenueFigure.tsx` becomes `"use client"`. Markup:

```
<div className="cw-rec">
  <p className="cw-rec__num">
    <span className="cw-sr-only">More than 20 million dollars</span>
    <span className="cw-rec__wrap" aria-hidden="true">
      <span className="cw-rec__ghost">$20M+</span>
      <span className="cw-rec__tick" ref={tickRef} dangerouslySetInnerHTML={{ __html: "$20M+" }} />
      <HandCircle variant={1} color="currentColor" play={play} instant={instant} delay={0.6} />
    </span>
  </p>
  <p className="cw-rec__lbl">In client revenue since 2013</p>
</div>
```

The tick's text is written only through `tickRef.current.textContent`; React never manages
its children (the constant `__html` means a re-render never touches it: CRITIQUE LOW-7).
`$20M+` is therefore the SSR and no-JS render.

CSS, existing `.cw-rec*` rules amended only where they differ: `.cw-rec__wrap { position: relative; display: inline-grid }`; `.cw-rec__ghost { grid-area: 1/1; visibility: hidden }`; `.cw-rec__tick { grid-area: 1/1; justify-self: start; white-space: nowrap }`; `.cw-rec__num` keeps `font-variant-numeric: tabular-nums`. The cell is sized by the ghost, so the count never shifts layout (CLS 0). No colour rule changes; the stroke stays `currentColor`.

State machine (all refs and one `useState` pair for `play`/`instant`; never set state per frame):
- **On mount:** if `matchMedia("(prefers-reduced-motion: reduce)").matches`, set `instant = true` and stop. If `wrap.getBoundingClientRect().top < window.innerHeight`, set `instant = true` and stop (in view or above at load: refresh, deep link). Otherwise state = `waiting`.
- **Arm observer** (`rootMargin: "0px 0px 100% 0px"`, threshold 0): on intersecting with `boundingClientRect.top >= innerHeight` while `waiting`: `tick.textContent = "$0M"`, `play = false` (the circle's paths hidden), state = `armed`. On not-intersecting with `boundingClientRect.bottom < 0` while `armed` (flicked past upward): `tick.textContent = "$20M+"`, `instant = true`, state = `done`.
- **Play observer** (threshold 0.5): on intersecting while `armed`: start the count, `play = true`, state = `playing`.
- **Count:** duration 1200ms; `eased = 1 - (1 - t) ** 3`; text `` `$${Math.round(eased * 20)}M` `` per frame, and exactly `$20M+` at `t >= 1`; then state = `done`.
- **Unmount:** cancel the rAF, disconnect both observers.

`components/hand/HandCircle.tsx` gains `play?: boolean` (backward compatible). When `play`
is `undefined`, the existing internal path runs unchanged. In controlled mode: reduced motion
or `instant` sets the final frame with no transition; `play === false` hides both paths
(`stroke-dasharray = stroke-dashoffset = length`); `play === true` runs the existing
`drawIn(primary, 0)` then `drawIn(overshoot, 0.95)` with the given `delay` (0.6s), so the
primary stroke runs 0.6s to 1.7s and the overshoot 1.55s to 2.65s.

## 3. Motion limits

Only this element animates. No scroll coupling after start (the observers only start it or
finish it). No loop. No change to `SplitReveal`, Lenis, or the view transition. The
`motion-discipline.sh` hook must stay silent: no cursor follower, no scroll-snap, no marquee.

## 4. Verification (Git Bash, `MSYS_NO_PATHCONV=1`, exit codes read directly)

Static gates: tsc · copy-lint · retired gate · accent lint · gsap gate (RevenueFigure must
not import gsap) · prettier `--check` on the two components and `app/globals.css` · build.

Server on 3200, then `.planning/exec/countup114.mjs` (puppeteer-core from
`C:/tmp/p101tools`, Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`),
printing a `chk` line per assertion and `countup failures: N`:

1. **No JS:** `page.setJavaScriptEnabled(false)`, load `/` at 1440x900: `.cw-rec__tick`
   text is `$20M+`; both circle paths have no `stroke-dashoffset` style set (drawn whole).
2. **Reduced motion:** `page.emulateMediaFeatures([{name:"prefers-reduced-motion", value:"reduce"}])`, load, scroll the figure to centre, wait 300ms: tick is `$20M+`; no frame ever
   showed `$0M` (poll every 50ms from load: record the set of texts seen; expect `{"$20M+"}`).
3. **In view at load:** load `/#receipts` (or the figure's own section id; read it from
   `app/(foyer)/page.tsx`) so the figure is in the first viewport: tick is `$20M+` within
   300ms and never `$0M`.
4. **The real run:** load `/` at 1440x900 (figure below the fold: assert
   `getBoundingClientRect().top > innerHeight` first, else the test is invalid and says so),
   wait 500ms, scroll so the figure is centred; poll the tick every 50ms for 3.2s. Expect:
   first non-`$20M+` value seen is `$0M`; the values are non-decreasing; `$20M+` is reached
   between 1100 and 1500ms after the first `$1M`+; at 3000ms both circle paths report
   `stroke-dashoffset` of `0` (or unset). Capture `home-rec-mid-1440` at ~600ms into the
   count and `home-rec-done-1440` at 3200ms. Also run the same at 390x844 (2x) for
   `home-rec-done-390`.
5. **CLS:** during run 4, a `PerformanceObserver({type:"layout-shift", buffered:true})`
   collected from before the scroll to 3200ms after: sum of `value` for entries whose
   `sources` include an element inside `.cw-rec` is `0`.
6. **Once only:** after run 4 finishes, scroll up out of view and back down, wait 1500ms:
   the tick never leaves `$20M+` (poll set is `{"$20M+"}`).
7. **Flick-past:** load `/`, wait 500ms, `window.scrollTo(0, document.body.scrollHeight)`
   in one jump, wait 300ms, scroll back to the figure: tick is `$20M+` and the circle is
   drawn (state `done`, no count).

Then `render-gate` exit 0 and `axe-worlds` on `/` exit 0 (no colour change, but the DOM
changed).

## 5. Rejected

- Keeping it static: the operator ruled against the recommendation; recorded.
- A second animated figure or any other counter: the exception is one element; CLAUDE.md
  says the next answer is no.
- Setting React state per frame, or letting React own the tick's text: LOW-7.
- Starting the count on load regardless of position: a refresh mid-page must show the
  finished frame.
- Any easing other than `1-(1-t)^3` or any duration other than 1200ms: the ruling is the
  DIRECTION spec, not a new one.

## 6. Commit

`Pass-114: the $20M+ count-up, recorded as an operator exception to R13 and R15 (2026-09-11, decision 4)`
with the two components, `app/globals.css`, `docs/DESIGN_BAR.md`, `.claude/brand.json`,
`.claude/CLAUDE.md`, `.planning/exec/countup114.mjs`, `.planning/qa/pass-114/`; then
`.claude/RESUME.md` alone (≤2500 bytes). Do not push.

## 7. Return (judge ≤3 calls; then one Astra look)

`home-rec-mid-1440`, `home-rec-done-1440`, and the `countup failures` block. Astra gets
the two 1440 captures plus `home-rec-done-390` with one question: does the moment read as
authored proof or as a stat ticker, and does the drawn circle land on the settled number.
