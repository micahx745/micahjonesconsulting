# Evidence read: is Pass-128c ready to show the owner on his phone?

You are one of three independent readers and you see text only; the others do not see your answer. The design was
ruled by the owner and is not in question: the band with the two doors under the hero keeps the page's terracotta
ground (no switch to bone and back), and four headings lose their letter-by-letter reveal (1.1 s) for the site's
standard 0.55 s fade. Judge the EVIDENCE below: the brief's verification section, the executor's results, and the
main session's additions.

Questions:
1. Does the evidence show the fix does what it claims, that the scroll stutter caused by the colour switch is gone?
   Name any claim the numbers do not support.
2. Item 5 failed (fixed build median dropped frames 49 against the brief's <=45). The main session says the threshold
   came from an arm in which the Audit heading had no entrance at all, while the ruled design gives it the standard
   fade, and it ran an attribution A/B (below). Is that diagnosis sound? What would falsify it?
3. Item 9 failed inside the executor's sandbox (Chrome could not launch there); the main session re-ran the exact
   command outside the sandbox. Is that an acceptable disposition?
4. Is there anything in the evidence that should stop a phone preview?

Hand back, plain text: VERDICT: READY FOR HIS PHONE | NOT YET (why). Then at most five numbered findings, most
important first. No preamble.

## The brief's verification section (as dispatched)
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


## The executor's results (RESULTS.md, verbatim)
# Pass-128c / Pass-128d results

Run date: 2026-09-21 (America/Los_Angeles)

Overall result: **FAIL**. The default-target PREVIEW median `droppedFrames` was 49 (required <=45). The exact CLS gate also timed out at Chrome launch in this restricted executor; an otherwise identical sandbox-launch copy measured both widths below the threshold, but that supplemental result does not turn the exact-command failure into a pass.

## Environment and pre-checks

- HEAD: `Pass-128c (source): SplitReveal retired, the doors world is terracotta (operator rulings 2026-09-21, LESSONS #3)`.
- `git merge-base --is-ancestor design/live-evolve HEAD`: exit 0.
- `pnpm remove gsap @gsap/react` was skipped because PowerShell reported: `pnpm : The term 'pnpm' is not recognized as the name of a cmdlet, function, script file, or operable program.`
- Corepack was also unavailable as a fallback because it received `EPERM` creating `C:\Users\micah\AppData\Local\node\corepack\v1`.
- The already-built production app was therefore started with the local Next binary through Node. It answered HTTP 200 on port 3126.
- `PREPUSH: all gates and the build passed` was the exact last line of `.planning/exec/build-p128c.log`.

## Pass-128c default-target A/B

Runs were interleaved LIVE/PREVIEW, PREVIEW/LIVE, LIVE/PREVIEW. `UpdateLayoutTree ms` is the trace total.

| Arm | Round | framesOver33ms | intervalMsP95 | droppedFrames | transitionEvents | UpdateLayoutTree ms | worldSwitchCount |
|---|---:|---:|---:|---:|---:|---:|---:|
| LIVE | 1 | 43 | 33.4 | 78 | 874 | 588.83 | 2 |
| PREVIEW | 1 | 2 | 16.7 | 51 | 31 | 30.97 | 0 |
| PREVIEW | 2 | 2 | 16.8 | 49 | 37 | 30.62 | 0 |
| LIVE | 2 | 45 | 33.4 | 72 | 843 | 616.01 | 2 |
| LIVE | 3 | 46 | 33.4 | 74 | 868 | 498.72 | 2 |
| PREVIEW | 3 | 2 | 16.8 | 49 | 37 | 34.06 | 0 |

| Arm median | framesOver33ms | intervalMsP95 | droppedFrames | transitionEvents | UpdateLayoutTree ms | worldSwitchCount |
|---|---:|---:|---:|---:|---:|---:|
| LIVE | 45 | 33.4 | 74 | 868 | 588.83 | 2 |
| PREVIEW | 2 | 16.8 | 49 | 37 | 30.97 | 0 |

All six runs had `consoleErrors: []`, `gestureCount: 1`, at least 240 frames, and integer `droppedFrames`. PREVIEW's three `worldBgValues` arrays were exactly `["#9E3C25"]`; LIVE's were `["#9E3C25", "#ECE3D0", "#9E3C25"]`.

## Pass-128d full-page A/B (`--to #ordani`)

Runs used the same interleave. No frame/drop threshold applies to this evidence leg.

| Arm | Round | framesOver33ms | intervalMsP95 | droppedFrames | transitionEvents | UpdateLayoutTree ms | worldSwitchCount |
|---|---:|---:|---:|---:|---:|---:|---:|
| LIVE | 1 | 98 | 33.3 | 296 | 1268 | 878.93 | 4 |
| PREVIEW | 1 | 44 | 16.8 | 245 | 370 | 273.73 | 2 |
| PREVIEW | 2 | 46 | 16.8 | 235 | 364 | 289.83 | 2 |
| LIVE | 2 | 90 | 33.3 | 284 | 1205 | 778.40 | 4 |
| LIVE | 3 | 89 | 33.3 | 287 | 1197 | 779.14 | 4 |
| PREVIEW | 3 | 41 | 16.8 | 238 | 350 | 293.71 | 2 |

| Arm median | framesOver33ms | intervalMsP95 | droppedFrames | transitionEvents | UpdateLayoutTree ms | worldSwitchCount |
|---|---:|---:|---:|---:|---:|---:|
| LIVE | 90 | 33.3 | 287 | 1205 | 779.14 | 4 |
| PREVIEW | 44 | 16.8 | 238 | 364 | 289.83 | 2 |

All six runs had `consoleErrors: []`, `gestureCount >= 1`, at least 240 frames, and integer `droppedFrames`. LIVE used `#9E3C25 -> #ECE3D0 -> #9E3C25 -> #2A1F18 -> #1A4548`; PREVIEW used `#9E3C25 -> #2A1F18 -> #1A4548`. Both ended at `#1A4548`.

### Transition-log diagnostics

- LIVE-T: starts 430; cancels 210.
  - topTargets: `A.cw-mlink` 344; `A.cw-section-cta` 86; `P.cw-exits__val` 59; `P.cw-exits__co` 50; `SPAN.cw-exits__tick` 14; `LI.cw-hiw__step` 12; `NAV.cw-nav` 10; `DIV.cw-js-reveals` 9; `P.cw-hiw__body` 8; `SPAN.cw-rec__line` 8.
  - topProperties: `color` 509; `opacity` 35; `translate` 31; `transform` 28; `font-size` 20; `background-color` 17.
- PREVIEW-T: starts 150; cancels 0.
  - topTargets: `P.cw-exits__val` 37; `P.cw-exits__co` 24; `LI.cw-hiw__step` 12; `SPAN.cw-exits__tick` 11; `LI.cw-exits__deal` 9; `H2.cw-secttitle` 8; `P.cw-hiw__body` 8; `NAV.cw-nav` 5; `DIV.-` 4; `DIV.cw-offer__box` 4.
  - topProperties: `opacity` 38; `translate` 37; `transform` 31; `font-size` 20; `color` 15; `background-color` 9.

## Word timing

Times are milliseconds. `—` denotes null/not applicable.

| Run | Key | tEnter | tSettled | deltaEnterToSettled | static | tRevealStart | revealMs |
|---:|---|---:|---:|---:|---|---:|---:|
| 1 | h1_line1 | 310 | 1676 | 1366 | false | — | — |
| 1 | h1_line2 | 310 | 1764 | 1455 | false | — | — |
| 1 | sub | 310 | 964 | 654 | false | — | — |
| 1 | door1_h2 | 1477 | 1515 | 38 | true | — | — |
| 1 | door2_h2 | 2109 | 2148 | 39 | true | — | — |
| 1 | offer_h2_container | 2626 | 3292 | 667 | false | 2709 | 584 |
| 1 | offer_firstchar | — | — | — | — | — | — (`never appeared`) |
| 1 | offer_lastchar | — | — | — | — | — | — (`never appeared`) |
| 1 | audit_h3 | 3009 | 3044 | 35 | true | — | — |
| 2 | h1_line1 | 292 | 1649 | 1357 | false | — | — |
| 2 | h1_line2 | 292 | 1729 | 1437 | false | — | — |
| 2 | sub | 292 | 932 | 640 | false | — | — |
| 2 | door1_h2 | 1446 | 1516 | 70 | true | — | — |
| 2 | door2_h2 | 2126 | 2167 | 41 | true | — | — |
| 2 | offer_h2_container | 2643 | 3295 | 652 | false | 2727 | 568 |
| 2 | offer_firstchar | — | — | — | — | — | — (`never appeared`) |
| 2 | offer_lastchar | — | — | — | — | — | — (`never appeared`) |
| 2 | audit_h3 | 3060 | 3094 | 34 | true | — | — |
| 3 | h1_line1 | 320 | 1712 | 1392 | false | — | — |
| 3 | h1_line2 | 320 | 1801 | 1480 | false | — | — |
| 3 | sub | 320 | 995 | 674 | false | — | — |
| 3 | door1_h2 | 1511 | 1549 | 38 | true | — | — |
| 3 | door2_h2 | 2128 | 2166 | 38 | true | — | — |
| 3 | offer_h2_container | 2644 | 3311 | 667 | false | 2730 | 581 |
| 3 | offer_firstchar | — | — | — | — | — | — (`never appeared`) |
| 3 | offer_lastchar | — | — | — | — | — | — (`never appeared`) |
| 3 | audit_h3 | 3027 | 3061 | 34 | true | — | — |

Required record values (`deltaEnterToSettled`): offer 667/652/667 ms; door 1 38/70/38 ms; door 2 39/41/38 ms.

## Layout and visual evidence

- Exact CLS command: **FAIL**. `node .planning/qa/pass-126/cls-page.mjs http://localhost:3126/ "#doors"` consistently timed out after 30,000 ms at Puppeteer's Chrome launch handshake. The gate omits `--no-sandbox`, while the successful QA probes in this restricted executor supply it.
- Supplemental, unchanged calculation with only `args: ["--no-sandbox"]` added to an untracked copy: 390 `largestWindow` 0.00186 (1 entry); 1440 `largestWindow` 0.00709 (19 entries). Both measured values are <=0.05.
- Wrap gate: `HIW-WRAP-GATE: 0 failures`.
- Contact sheet: `fix-sheet/scroll-all.png`, 1380x967, 30 of 119 manifest frames. Pillow was missing from both installed Python interpreters, so Pillow 12.3.0 was installed to a task-scoped temp directory and used through `PYTHONPATH`; the copied builder was unchanged.
- Screenshots: 20 PNGs in `fix-shots/`: five targets x two viewports x normal/reduced motion. Every file is exactly 390x844 or 1440x900, as named, after a 1.5-second settle.

## Copy and served HTML

- PREVIEW `.cw-split__char` count after a full scroll: 0.
- Normalized copy matches LIVE for all four keys:
  - `#cw-offer-title`: `Two weeks to know what to fix first.`
  - `#cw-howiwork-title`: `How I work.`
  - `#cw-ordani-title`: `Ordani`
  - `#cw-build-title`: `NAME THEPROBLEM →`
- The literal `curl.exe -s http://localhost:3126/` response, parsed with JavaScript disabled so RSC payload strings are not counted as rendered tags, contains:
  - `<section class="cw-doors-band" id="doors" data-section="true" data-world="terracotta" ...>`
  - `<h2 id="cw-offer-title" class="cw-secttitle cw-reveal">`
  - `<h2 id="cw-howiwork-title" class="cw-secttitle cw-hiw__title cw-reveal">`
  - `<h2 id="cw-ordani-title" class="cw-secttitle cw-reveal">`
  - `<a href="/call" class="cw-big-link cw-reveal" ...>`

## Verification checklist

1. **PASS** — pre-push log's last line is exactly `PREPUSH: all gates and the build passed`.
2. **PASS (documented skipped-pnpm path)** — no `gsap` output under `app components lib content`; package references remain at `package.json:13` (`@gsap/react`) and `package.json:21` (`gsap`); lock count is `pnpm-lock.yaml:9`, exactly as the runbook says to report when step 1 is skipped.
3. **PASS** — default-target JSONL files have 3 lines per arm; every run has no console errors, gesture count >=1, frames >=240, and integer dropped frames.
4. **PASS** — LIVE medians: `framesOver33ms` 45, `droppedFrames` 74, `worldSwitchCount` 2.
5. **FAIL** — PREVIEW median `framesOver33ms` 2 passes; world switch/color requirements pass; median `droppedFrames` is 49, above the <=45 requirement.
6. **PASS** — offer is non-static with `revealMs` 584/568/581; both offer character selectors never appeared; both door headings are static in all runs. Required deltas are recorded above.
7. **PASS** — no preview split-character nodes; all four normalized strings equal LIVE.
8. **PASS** — served rendered tags carry terracotta/`cw-reveal` exactly as required.
9. **FAIL** — the exact CLS gate timed out before emitting values; the supplemental sandbox-compatible run measured 0.00186/0.00709. The wrap gate passed with 0 failures.
10. **PASS** — `git status --short --untracked-files=no` shows only `.planning/qa/pass-128/analyze-word-timing.mjs` and `.planning/qa/pass-128/word-timing-probe.mjs`, the expected pair when step 1 is skipped. Evidence folders are untracked.
11. **PASS** — full-page files have 3 lines per arm and valid run fields; LIVE has 4 switches/5 expected colors, PREVIEW has 2/3, both end at `#1A4548`, and both `-T` files contain a `transitionLog` object.


## The main session's additions (after the executor's run)
- `pnpm remove gsap @gsap/react` run by the main session (pnpm was not on the executor's PATH). Item 2's three greps
  now print nothing; item 10 now shows exactly package.json, pnpm-lock.yaml and the two probe scripts.
- Rebuilt after the removal: last line `PREPUSH: all gates and the build passed`; `gsap-quarantine-gate: clean (88 files)`.
- The exact item 9 command, run outside the sandbox on that build: `{"390":{"entries":1,"largestWindow":0.0193},"1440":{"entries":18,"largestWindow":0.00665}}`.
- The served-page check `card1-126.sh` against the local build: `FAILURES: 0` (74 checks passed).
- Dropped frames per 500 ms after the first touch, from the traces (same probe, 390 px, 4x CPU):
  live today 7/12/17/6/15/15/6 (total 78); last night's live arm with the doors forced terracotta and the letters
  detached (the source of the <=45) 6/13/8/4/4 (35), where detaching left the Audit heading visible at once, with no
  entrance; last night's terracotta-only arm, letter cascade intact, 6/13/8/15/1 (43); the fixed build 6/13/11/14/6/1 (51).
- Attribution A/B on the local server, interleaved, n=3: P = the fixed build as built, drops 50/49/50 (median 50);
  N = the same build with only the Audit heading's fade switched off by injected CSS
  (`#cw-offer-title.cw-reveal { transition: none; opacity: 1; transform: none }`), drops 36/36/37 (median 36). The
  1.5-2.0 s bucket is 14-15 in P and 3 in N. Frames over 33 ms are 2 in every run of both arms.
- Eyes on both contact sheets and all 20 shots: no regression from this change. Before: the nav turns bone from frame
  #60, the Audit arrives on bone, a washed crossfade at #120. After: terracotta throughout. Pre-existing, not touched
  by this pass: in the normal-motion 390 Ordani shot the last exits row shows its caption but not its name and value.
- The 128d full-page diagnostic shows no link colour transitions at the two world switches left below the Audit on
  the fixed build (color 15 in total, against 509 live): espresso and petrol keep terracotta's light text; only the
  bone band changed the text colour.
