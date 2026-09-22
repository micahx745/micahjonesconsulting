# Pass-128b: the second A/B (evidence only; no site file changes)

Executor: Sol (`gpt-5.6-sol`, `scripts/codex-exec.ps1 -Task`), in the p106-live worktree, AFTER Pass-128a. Written
2026-09-21 by the main session (Opus 5).

## 1. The ruling (what this run decides)
Pass-128a (`.planning/qa/pass-128/detach-ab/`) found, from the raw lines and traces:
- Detaching SplitReveal's characters cut compositor DroppedFrame events from 77/77/73 to 65/62/61 (zero overlap);
  the main-thread count of frames over 33 ms did not move (45 vs 46). Grain layers off, and a real GPU, changed
  nothing.
- Every arm dispatched ~850-960 CSS transition events per swipe (transitionstart ~300, transitioncancel ~210)
  against 43-49 touchmove events. Colour transitions run on the main thread every frame.
The operator ruled on 2026-09-21 (LESSONS #3 "THE DOORS WORLD IS TERRACOTTA") that the doors band's `data-world` becomes
`terracotta`, so the hero-to-Audit stretch has no world switch. This run tests that ruling on the live page before it
is built, plus the two suspects still open: ExitScoreboard's page-wide scroll listener, which calls
`section.getBoundingClientRect()` every scroll frame while the section is far below (ROOT-CAUSE R1), and Lenis 1.3.23's
`{ passive: false }` touch and wheel listeners on window (they are registered even with `syncTouch: false`, and a
non-passive touchmove listener makes the browser wait for the main thread before it scrolls). Numbers only; the main
session rules from the raw lines.

## 2. Copy
None. No site copy and no site file changes.

## 3. What to build (one file changes: `.planning/qa/pass-128/scroll-probe.mjs`)
Keep every Pass-128a flag working. Add these, each a no-op when absent:
1. `--world-doors <name>`: after liveness and any `--inject-css`, BEFORE `installRecorders(page)`, in the page:
   `const el = document.querySelector("section.cw-doors-band")`; record `before = el.getAttribute("data-world")`; set
   `data-world` to `<name>`; record `after`. Result line: `worldDoors: {found, before, after}`; null when absent.
   (WorldSwitcher reads the attribute live in its IntersectionObserver callback, `WorldSwitcher.tsx` ~line 124.)
2. `--pin-exits-rect`: same point: `const el = document.querySelector("section.cw-exits")`;
   `const r = el.getBoundingClientRect(); el.getBoundingClientRect = () => r;` (an own property on that element only,
   so ExitScoreboard's per-frame `beatFor()` read stops forcing layout). Result: `pinExits: {found, top: r.top}`.
3. `--passive-touch`: BEFORE `page.goto`, `page.evaluateOnNewDocument(...)` that wraps
   `EventTarget.prototype.addEventListener`: when the type is `touchstart`, `touchmove`, `touchend` or `wheel` and the
   options argument is an object with `passive === false`, pass a copy with `passive: true` and increment
   `window.__passiveForced`. Result: `passiveForced` (the count, read after load); null when absent.
4. Every run, every arm: from that run's own trace file add `droppedFrames` (count of events named `DroppedFrame`),
   `drawFrames` (`DrawFrame`), and `transitionEvents` (events named `EventDispatch` whose `args.data.type` starts with
   `transition`).
5. `--log-transitions` (diagnostic arm only): with the recorders, a capture listener on `document` for
   `transitionstart` and `transitioncancel` that counts by target key `tagName + "." + (first class or "-")` and by
   `propertyName`. Result: `transitionLog: {starts, cancels, topTargets: [[key, n]] x10, topProperties: [[prop, n]] x6}`.
Plain ASCII only (LESSONS #46). Touch nothing outside `.planning/qa/pass-128/`.

## 4. The run
All arms: `--cpu 4 --runs 1`, default URL (www, the live deploy) and target, no `--gpu`, with `--trace`.
- `A`: no new flag. - `W`: `--world-doors terracotta`. - `DW`: `--detach-split --world-doors terracotta`.
- `X`: `--pin-exits-rect`. - `P`: `--passive-touch`.
- `ALL`: `--detach-split --world-doors terracotta --pin-exits-rect --passive-touch`.
Three rounds, interleaved, one run per arm per round:
- round 1: A W DW X P ALL
- round 2: W DW X P ALL A
- round 3: DW X P ALL A W
Then ONE diagnostic run `T`: `--log-transitions` and nothing else.
Outputs: `.planning/qa/pass-128/world-ab/<arm>.jsonl` (appended by the probe), traces
`.planning/qa/pass-128/world-ab/traces/<arm>-r<round>.json`, logs through cmd so they are UTF-8:
`cmd /c "node .planning\qa\pass-128\scroll-probe.mjs <flags> > .planning\qa\pass-128\world-ab\logs\<arm>-r<round>.log 2>&1"`.
Node directly, never bash (LESSONS #47). If Chrome or puppeteer fails, stop and report the exact error. A run that
fails for a transient reason may be re-run ONCE; report both attempts.

## 5. Verification (expected output; a miss is a failure, never reinterpreted)
1. `node --check .planning/qa/pass-128/scroll-probe.mjs` -> exit 0, no output.
2. Six `.jsonl` files with 3 lines each, plus `T.jsonl` with 1 line.
3. Every line: `consoleErrors` is `[]`; `gestureCount` >= 1; `frames` >= 240; `topTraceEventsByDuration` contains
   `UpdateLayoutTree`; `droppedFrames`, `drawFrames`, `transitionEvents` are integers.
4. `A` and `X` and `P` and `T`: `worldSwitchCount` is 2 and `worldBgValues` is `["#9E3C25","#ECE3D0","#9E3C25"]`.
   `W`, `DW`, `ALL`: `worldSwitchCount` is 0 and `worldBgValues` is `["#9E3C25"]`; `worldDoors` is
   `{found: true, before: "bone", after: "terracotta"}`. Any miss in a W arm: that arm is INVALID.
5. `X`, `ALL`: `pinExits.found` is true. `P`, `ALL`: `passiveForced` >= 4. `DW`, `ALL`: the Pass-128a detach checks
   (`charsBefore` >= 29, roots include `cw-offer-title`, `charsAfter` 0, `charsAfterGesture` 0, the `cw-offer-title`
   sample opacity "0" then "1").
6. `A` reproduces Pass-128a's A: median `framesOver33ms` in 40..50 and median `droppedFrames` in 65..85. If not, the
   environment drifted: say so and stop interpreting.
7. `webglRenderer` in every line names a software renderer ("Microsoft Basic Render Driver" or SwiftShader). Pass-128a's
   brief expected only "SwiftShader"; that expectation was the brief's error (WARP is Windows' software renderer), not a
   run failure.
8. `git status --short`: only `.planning/qa/pass-128/scroll-probe.mjs` modified and `.planning/qa/pass-128/world-ab/`
   new (traces `*.runN.json` are gitignored).

## 6. Rejected (do not re-propose)
- More grain or GPU arms: Pass-128a measured both at n=3 with no effect.
- `exp-T1.css`, blocking the GSAP chunk (T3), `content-visibility` (T4), `synthesizeScrollGesture` touch: see 128a.
- Measuring a local build, any site edit, any interpretation paragraph.

## 7. Return
`.planning/qa/pass-128/world-ab/RESULTS.md`: one row per run (arm, round, framesOver33ms, intervalMsP95,
droppedFrames, drawFrames, transitionEvents, UpdateLayoutTree ms, FunctionCall ms, EventDispatch ms,
worldSwitchCount, flag checks ok yes/no); each arm's medians of droppedFrames, framesOver33ms, transitionEvents and
UpdateLayoutTree; `T`'s transitionLog verbatim; every verification item PASS or FAIL with the value seen. No commit
(LESSONS #18); the main session commits.

## 8. Parked operator decisions
SplitReveal (shorten or retire) and the Audit stagger go to him after this run, with its numbers.
