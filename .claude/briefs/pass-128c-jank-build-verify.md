# Pass-128c: build and verify the jank fix on `preview/p128-jank` (p124-cuts), plus the Pass-128d full-page measurement

Executor: Sol (`gpt-5.6-sol`, `scripts/codex-exec.ps1 -Task`, `-Dir` = the p124-cuts worktree). Written 2026-09-21 by
the main session (Opus 5); amended the same night before dispatch (section 0). BEFORE DISPATCH the main session rebases
`preview/p128-jank` onto `design/live-evolve` in p124-cuts, so the branch carries the Pass-128b probe (`droppedFrames`,
`transitionEvents`, `--world-doors`, `--log-transitions`).

## 0. Amendments before dispatch (2026-09-21 night, main-session pre-flight, LESSONS #52)
- Item 2's grep could never pass: `hooks` does not exist (rg exits 2), the build script in `package.json` names
  `gsap-quarantine-gate.mjs`, and `rg` is not on PowerShell's PATH on this machine. Replaced with three `git grep`
  checks, each run on the tree before dispatch. Item 8 names `curl.exe`: in Windows PowerShell `curl` is an alias.
- Item 6's "under 100 ms" was the analyzer's floor, not a settle time. The door h2s never animate themselves (their
  parent `.cw-door.cw-reveal` does), so their own style never changes. `#cw-offer-title` now carries `.cw-reveal`
  itself: a 0.55 s transition that starts at ScrollReveal's 18% IntersectionObserver threshold. Step 5 adds `static` and
  `revealMs` to the analyzer; item 6 is re-specified.
- The source commit is named by its subject, not by `f4668d7`: the rebase moves the hash (step 0).
- The operator added the Pass-128d full-page measurement to this run (popup 2026-09-21 night, "Yes, same run
  (Recommended)"): step 4b and item 11. Evidence only, no source change.
- Items 7 and 10 made exact (the text normalisation; the analyzer joins the modified list).

## 1. The ruling
Operator 2026-09-21 (LESSONS #3 "THE DOORS WORLD IS TERRACOTTA" and "SPLITREVEAL RETIRED"): the doors band's
`data-world` is terracotta; SplitReveal is retired and its four headings take the standard `.cw-reveal` entrance;
the Audit's price box stays as is. The source change is ALREADY on the branch, in the commit whose subject starts
`Pass-128c (source):` (the main session wrote it: `app/(foyer)/page.tsx`, `components/color-worlds/HowIWork.tsx`,
`app/globals.css`, `scripts/gsap-quarantine-gate.mjs`, `.claude/CLAUDE.md`, and `components/color-worlds/SplitReveal.tsx`
deleted). Do not edit those files.
Evidence (live page, 4x CPU, n=3): doors forced terracotta took frames over 33 ms from 45/40/44 to 2/2/2 and compositor
drops from 76/79/79 to 43/43/44; with SplitReveal's characters also out, drops 35/36/35. ExitScoreboard's rect read and
Lenis's non-passive touch listeners measured no effect and are NOT in this pass.

## 2. Copy
None. The four headings' visible text must equal the live site's, character for character.

## 3. Steps (node and PowerShell only, never bash; logs through `cmd /c "... > log 2>&1"` so they are UTF-8)
0. Pre-check in p124-cuts: `git log -1 --format=%s` starts with `Pass-128c (source):`, and
   `git merge-base --is-ancestor design/live-evolve HEAD` exits 0. If either fails: stop and report.
1. `pnpm remove gsap @gsap/react` (package.json and pnpm-lock.yaml only). If pnpm cannot run here, skip it, report the
   exact error, and go on; the main session runs it.
2. `node .planning/exec/prepush-gates.mjs` (log `.planning/exec/build-p128c.log`) -> last line
   `PREPUSH: all gates and the build passed`. On any failure: stop and report.
3. Start the production server in the background: `Start-Process` running `pnpm exec next start -p 3126` in this
   worktree; record its PID; wait until `http://localhost:3126/` answers 200. Stop it (`Stop-Process -Id <pid>`) at the end.
4. Live vs preview A/B, interleaved, `--cpu 4 --runs 1`, default target, with `--trace`. Make
   `.planning/qa/pass-128/fix-ab/traces/` first (the probe does not create folders):
   `node .planning/qa/pass-128/scroll-probe.mjs --url <URL> --cpu 4 --runs 1 --trace .planning/qa/pass-128/fix-ab/traces/<arm>-r<N>.json --out .planning/qa/pass-128/fix-ab/<arm>.jsonl`
   with arm `LIVE` = `https://www.micahjonesconsulting.com/` and arm `PREVIEW` = `http://localhost:3126/`, in this order:
   round 1 LIVE PREVIEW; round 2 PREVIEW LIVE; round 3 LIVE PREVIEW.
4b. Pass-128d, the full page (evidence only). Make `.planning/qa/pass-128/page-ab/traces/` first. Same arms, same
   interleave and the same flags as step 4, plus `--to "#ordani"`: out `.planning/qa/pass-128/page-ab/<arm>.jsonl`,
   traces `.planning/qa/pass-128/page-ab/traces/<arm>-r<N>.json`. Then one diagnostic run per arm with
   `--log-transitions` added and no `--trace`: out `.planning/qa/pass-128/page-ab/LIVE-T.jsonl` and
   `.planning/qa/pass-128/page-ab/PREVIEW-T.jsonl` (not in the medians). Why `#ordani`: the probe throws unless the
   target's top reaches the viewport top. At 390x844 `#ordani` is the lowest section that can (live section map
   2026-09-21: top 7127, height 796, scrollHeight 8301), and the page ends with the viewport centre inside it, so the
   footer's terracotta never takes over on a phone.
5. Word timing on the preview. In `.planning/qa/pass-128/word-timing-probe.mjs` add a `--url` flag (default
   unchanged). In `.planning/qa/pass-128/analyze-word-timing.mjs` keep every existing field and add, per key:
   `static` = true when the key's own `opacity` and `transform` are identical in every non-null sample (its delta is
   then the sampler's floor, not a settle time); `tRevealStart` = the `t` of the last sample before `tSettled` whose
   opacity is above 0.02 while the previous non-null sample's opacity is at or below 0.02 (null if there is none);
   `revealMs` = `tSettled - tRevealStart` (null if either is null). Make `.planning/qa/pass-128/fix-wt/`, run
   `node .planning/qa/pass-128/word-timing-probe.mjs --url http://localhost:3126/ --runs 3 --out .planning/qa/pass-128/fix-wt/wt`,
   then for N = 1, 2, 3 `node .planning/qa/pass-128/analyze-word-timing.mjs .planning/qa/pass-128/fix-wt/wt.runN.json`,
   saving each output as `.planning/qa/pass-128/fix-wt/analysis.runN.txt`.
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
2. `git grep -n "gsap" -- app components lib content` -> no output; `git grep -nE "^ +.(@gsap/react|gsap).:" -- package.json`
   -> no output; `git grep -c "gsap" -- pnpm-lock.yaml` -> no output. If step 1 was skipped, the second prints lines 13
   and 21 and the third `pnpm-lock.yaml:9`: report them. (Proven on the tree before dispatch: today the first prints
   nothing, the second lines 13 and 21 only, the third `pnpm-lock.yaml:9`.)
3. `fix-ab/LIVE.jsonl` and `fix-ab/PREVIEW.jsonl` have 3 lines each; every line `consoleErrors` `[]`, `gestureCount` >= 1,
   `frames` >= 240, `droppedFrames` an integer.
4. LIVE reproduces the old baseline: median `framesOver33ms` in 40..50, median `droppedFrames` in 65..85,
   `worldSwitchCount` 2.
5. PREVIEW: median `framesOver33ms` <= 5; median `droppedFrames` <= 45; every line `worldSwitchCount` 0 and
   `worldBgValues` `["#9E3C25"]`.
6. Word timing, on every run: `offer_h2_container` has `static` false and `revealMs` in 500..800 (the `.cw-reveal`
   transition is 0.55 s; rAF sampling and the three-sample settle rule add roughly 20-100 ms); `offer_firstchar` and
   `offer_lastchar` print `"status":"never appeared"`; `door1_h2` and `door2_h2` have `static` true. Report
   `deltaEnterToSettled` for `offer_h2_container`, `door1_h2` and `door2_h2` per run for the record, with no threshold
   (for the offer title it includes the wait for the 18% threshold and any 350 ms pause between swipes).
7. On the preview after a full scroll: `document.querySelectorAll(".cw-split__char").length` is 0. For
   `#cw-offer-title`, `#cw-howiwork-title`, `#cw-ordani-title` and `#cw-build-title`, the `textContent` with every
   whitespace run replaced by one space and trimmed equals the live page's, read the same way after a full scroll there,
   all four. On any mismatch print both strings; a mismatch is a FAIL, never explained away.
8. Served HTML (`curl.exe -s http://localhost:3126/`; in Windows PowerShell plain `curl` is Invoke-WebRequest): the `#doors` section tag has `data-world="terracotta"`; the tags of
   `#cw-offer-title`, `#cw-howiwork-title`, `#cw-ordani-title` carry `cw-reveal`; the `a.cw-big-link` tag carries
   `cw-reveal`. Count what renders, not raw payload matches (LESSONS #24).
9. CLS <= 0.05 at 390 and at 1440; `HIW-WRAP-GATE: 0 failures`.
10. `git status --short --untracked-files=no` in p124-cuts shows exactly these modified files: `package.json`,
    `pnpm-lock.yaml`, `.planning/qa/pass-128/word-timing-probe.mjs`, `.planning/qa/pass-128/analyze-word-timing.mjs`
    (only the last two if step 1 was skipped). The new folders under `.planning/qa/pass-128/` are untracked.
11. Pass-128d (step 4b): `page-ab/LIVE.jsonl` and `page-ab/PREVIEW.jsonl` have 3 lines each; every line
    `consoleErrors` `[]`, `gestureCount` >= 1, `frames` >= 240, `droppedFrames` an integer. LIVE: every line
    `worldSwitchCount` 4, with 5 `worldBgValues` starting `"#9E3C25", "#ECE3D0", "#9E3C25"`. PREVIEW: every line
    `worldSwitchCount` 2, with 3 `worldBgValues` starting `"#9E3C25"`. The last `worldBgValues` entry is the same on
    both arms. `page-ab/LIVE-T.jsonl` and `page-ab/PREVIEW-T.jsonl` have one line each, each with a `transitionLog`
    object. No threshold on frames or drops here: this leg is evidence for the operator's options.

## 5. Rejected (do not re-propose)
Editing the five source files above; any GSAP; shortening SplitReveal (not his pick); a price-box stagger (his pick:
as is); the ExitScoreboard guard and passive Lenis listeners (128b: no effect); grain or GPU changes (128a: no effect);
any change for 128d in this pass (evidence only; the options go to the operator by popup).

## 6. Return
`.planning/qa/pass-128/fix-ab/RESULTS.md`: the six-run table (arm, round, framesOver33ms, intervalMsP95,
droppedFrames, transitionEvents, UpdateLayoutTree ms, worldSwitchCount), each arm's medians; the same table and medians
for `page-ab/`, plus both `transitionLog` summaries (starts, cancels, topTargets, topProperties); the word-timing rows
(tEnter, tSettled, deltaEnterToSettled, static, tRevealStart, revealMs); the CLS numbers; the wrap-gate line; and every
verification item PASS or FAIL with the value seen. Stop the server. No commit (LESSONS #18).

## 7. After Sol (main session)
Eyes on `fix-sheet/scroll-all.png` against the live `pass-128/scroll-all.png` and on every `fix-shots/` PNG; start the
server (`preview_start` "preview-p124-cuts") and run `bash .planning/exec/card1-126.sh http://localhost:3126` ->
`FAILURES: 0`; Astra judges the before and after sheets (`codex-exec.ps1 -Review -Image`). Then ASK him before any
Vercel preview deploy for his phone (outward-facing), and ship only on his push words (CARD 1, EXPECT_DPL, both aliases).
The 128d numbers become options for him by popup.
