# Pass-128c: build and verify the jank fix on `preview/p128-jank` (p124-cuts)

Executor: Sol (`gpt-5.6-sol`, `scripts/codex-exec.ps1 -Task`, `-Dir` = the p124-cuts worktree). Written 2026-09-21 by
the main session (Opus 5). BEFORE DISPATCH the main session rebases `preview/p128-jank` onto `design/live-evolve` in
p124-cuts, so the branch carries the Pass-128b probe (`droppedFrames`, `transitionEvents`, `--world-doors`).

## 1. The ruling
Operator 2026-09-21 (LESSONS #3 "THE DOORS WORLD IS TERRACOTTA" and "SPLITREVEAL RETIRED"): the doors band's
`data-world` is terracotta; SplitReveal is retired and its four headings take the standard `.cw-reveal` entrance;
the Audit's price box stays as is. The source change is ALREADY on the branch at `f4668d7` (the main session wrote it:
`app/(foyer)/page.tsx`, `components/color-worlds/HowIWork.tsx`, `app/globals.css`, `scripts/gsap-quarantine-gate.mjs`,
`.claude/CLAUDE.md`, and `components/color-worlds/SplitReveal.tsx` deleted). Do not edit those files.
Evidence (live page, 4x CPU, n=3): doors forced terracotta took frames over 33 ms from 45/40/44 to 2/2/2 and compositor
drops from 76/79/79 to 43/43/44; with SplitReveal's characters also out, drops 35/36/35. ExitScoreboard's rect read and
Lenis's non-passive touch listeners measured no effect and are NOT in this pass.

## 2. Copy
None. The four headings' visible text must equal the live site's, character for character.

## 3. Steps (node and PowerShell only, never bash; logs through `cmd /c "... > log 2>&1"` so they are UTF-8)
1. `pnpm remove gsap @gsap/react` (package.json and pnpm-lock.yaml only). If pnpm cannot run here, skip it, report the
   exact error, and go on; the main session runs it.
2. `node .planning/exec/prepush-gates.mjs` (log `.planning/exec/build-p128c.log`) -> last line
   `PREPUSH: all gates and the build passed`. On any failure: stop and report.
3. Start the production server in the background: `Start-Process` running `pnpm exec next start -p 3126` in this
   worktree; record its PID; wait until `http://localhost:3126/` answers 200. Stop it (`Stop-Process -Id <pid>`) at the end.
4. Live vs preview A/B, interleaved, `--cpu 4 --runs 1`, default target, with `--trace`:
   `node .planning/qa/pass-128/scroll-probe.mjs --url <URL> --cpu 4 --runs 1 --trace .planning/qa/pass-128/fix-ab/traces/<arm>-r<N>.json --out .planning/qa/pass-128/fix-ab/<arm>.jsonl`
   with arm `LIVE` = `https://www.micahjonesconsulting.com/` and arm `PREVIEW` = `http://localhost:3126/`, in this order:
   round 1 LIVE PREVIEW; round 2 PREVIEW LIVE; round 3 LIVE PREVIEW.
5. Word timing on the preview: add a `--url` flag to `.planning/qa/pass-128/word-timing-probe.mjs` (default unchanged),
   run it against `http://localhost:3126/` with `--runs 3`, analyse with `analyze-word-timing.mjs` as before, and report
   `t_enter` to `t_settled` for `#cw-offer-title` and both door h2s, per run.
6. Contact sheet of the preview: make `.planning/qa/pass-128/fix-sheet/`, copy `build-contact-sheets.py` into it, run
   `node ..\screencast-scroll.mjs --url http://localhost:3126/ --cpu 4` WITH THAT FOLDER AS THE CURRENT DIRECTORY (the
   tool writes `./frames`; never run it in `pass-128/` itself, whose `frames/` is the live evidence), then
   `python build-contact-sheets.py` there -> `fix-sheet/scroll-all.png`.
7. Screenshots (`.planning/qa/pass-128/fix-shots/`), at 390x844 and 1440x900, each after the section is at mid-screen
   and 1.5 s of settle: the doors band, the Audit (`#cw-offer-title` and the price box), `#cw-howiwork-title`,
   `#cw-ordani-title`, the closing link. Then the same five with `prefers-reduced-motion: reduce` emulated.
8. `node .planning/qa/pass-126/cls-page.mjs http://localhost:3126/ "#doors"` and
   `node .planning/qa/pass-126/hiw-wrap-gate.mjs http://localhost:3126`.

## 4. Verification (expected output; a miss is a failure, never reinterpreted)
1. Step 2's last line is exactly `PREPUSH: all gates and the build passed`.
2. `rg -n "gsap" app components lib content hooks package.json` -> no match (if step 1 was skipped: only package.json).
3. `fix-ab/LIVE.jsonl` and `fix-ab/PREVIEW.jsonl` have 3 lines each; every line `consoleErrors` `[]`, `gestureCount` >= 1,
   `frames` >= 240, `droppedFrames` an integer.
4. LIVE reproduces the old baseline: median `framesOver33ms` in 40..50, median `droppedFrames` in 65..85,
   `worldSwitchCount` 2.
5. PREVIEW: median `framesOver33ms` <= 5; median `droppedFrames` <= 45; every line `worldSwitchCount` 0 and
   `worldBgValues` `["#9E3C25"]`.
6. Word timing: `#cw-offer-title` settles in under 100 ms on every run (the door h2s measured 38-72 ms).
7. On the preview after a full scroll: `document.querySelectorAll(".cw-split__char").length` is 0; the normalised
   `textContent` of `#cw-offer-title`, `#cw-howiwork-title`, `#cw-ordani-title`, `#cw-build-title` equals the live
   page's, all four.
8. Served HTML (`curl -s http://localhost:3126/`): the `#doors` section tag has `data-world="terracotta"`; the tags of
   `#cw-offer-title`, `#cw-howiwork-title`, `#cw-ordani-title` carry `cw-reveal`; the `a.cw-big-link` tag carries
   `cw-reveal`. Count what renders, not raw payload matches (LESSONS #24).
9. CLS <= 0.05 at 390 and at 1440; `HIW-WRAP-GATE: 0 failures`.
10. `git status --short --untracked-files=no` in p124-cuts shows only `package.json` and `pnpm-lock.yaml` modified
    (plus `word-timing-probe.mjs`); the new folders under `.planning/qa/pass-128/` are untracked.

## 5. Rejected (do not re-propose)
Editing the five source files above; any GSAP; shortening SplitReveal (not his pick); a price-box stagger (his pick:
as is); the ExitScoreboard guard and passive Lenis listeners (128b: no effect); grain or GPU changes (128a: no effect).

## 6. Return
`.planning/qa/pass-128/fix-ab/RESULTS.md`: the six-run table (arm, round, framesOver33ms, intervalMsP95,
droppedFrames, transitionEvents, UpdateLayoutTree ms, worldSwitchCount), each arm's medians, the word-timing rows, the
CLS numbers, the wrap-gate line, and every verification item PASS or FAIL with the value seen. Stop the server. No
commit (LESSONS #18).

## 7. After Sol (main session)
Eyes on `fix-sheet/scroll-all.png` against the live `pass-128/scroll-all.png` and on every `fix-shots/` PNG; start the
server (`preview_start` "preview-p124-cuts") and run `bash .planning/exec/card1-126.sh http://localhost:3126` ->
`FAILURES: 0`; Astra judges the before and after sheets (`codex-exec.ps1 -Review -Image`). Then ASK him before any
Vercel preview deploy for his phone (outward-facing), and ship only on his push words (CARD 1, EXPECT_DPL, both aliases).
