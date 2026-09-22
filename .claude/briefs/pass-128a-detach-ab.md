# Pass-128a: the detach A/B (evidence only; no site file changes)

Executor: Sol (`gpt-5.6-sol`, `scripts/codex-exec.ps1 -Task`), in the p106-live worktree. Written 2026-09-21 by the
main session (Opus 5). Source of the question: `.planning/qa/pass-128/ROOT-CAUSE.md` section 2.

## 1. The ruling (what this run decides)
"Scrolling isn't smooth" on his phone is not root-caused. At 1x CPU the live home scrolls clean (2 frames over 33 ms,
p95 16.8 ms, `cpu1-baseline.jsonl`); at 4x CPU it drops frames (45 over 33 ms, p95 33.4 ms, `cpu4-baseline.jsonl`,
`confirm-base.jsonl`). So some per-frame work eats the budget. Two suspects were never tested properly:
(a) SplitReveal's per-character inline-style writes (Chrome names `DIV.cw-split__char`, "Inline CSS style declaration
was mutated", ~750 invalidations per run, `invalidation.txt`); the CSS neutralizer `exp-T1.css` did not stop GSAP's
writes, so its null result tested nothing. (b) The four fixed full-viewport mix-blend grain and vignette layers (one
n=1 A/B only). This run measures both, interleaved, n=3 per arm, and reports numbers. It does not interpret them;
the main session rules from the raw lines.

## 2. Copy
None. This pass changes no site copy and no site file.

## 3. What to build (one file changes: `.planning/qa/pass-128/scroll-probe.mjs`)
Add two flags. With neither flag the probe must behave exactly as it does now (arm A is the old baseline).
1. `--detach-split`. After the liveness check and after any `--inject-css`, BEFORE `installRecorders(page)`, run in
   the page: collect every `.cw-split__char`; its root is `(char.closest(".cw-split__word") || char).parentElement`;
   for each distinct root, keep one sample char node in `window.__detachedSamples` (with the root's id), record its
   inline `style.opacity`, then set `root.textContent = root.textContent` (the characters leave the document; GSAP's
   tween keeps its references and keeps writing, now to detached nodes, so its JS cost stays and only the style
   invalidation goes). Return `{charsBefore, roots: [ids], charsAfter}` where `charsAfter` is the count of
   `.cw-split__char` still in the document. After the gesture and `SETTLE_MS`, read `charsAfterGesture` (same count)
   and, per sample, `opacityAfter`. Put all of it in the run's result line as `detach: {...}`; `detach: null` when the
   flag is absent.
2. `--gpu`. Drop `"--disable-gpu"` from the launch args. Nothing else changes.
3. Every run (all arms) records `webglRenderer`: in a SEPARATE throwaway page (`browser.newPage()`, `about:blank`,
   closed before the measured page opens) read `UNMASKED_RENDERER_WEBGL` via `WEBGL_debug_renderer_info` (fall back to
   `gl.RENDERER`, or the string `no-webgl`). Never create a WebGL context in the measured page.
Plain ASCII only in every file you write (LESSONS #46). Do not touch app/, components/, lib/, content/, public/,
scripts/, or any file outside `.planning/qa/pass-128/`.

## 4. The run
Arms (all with `--cpu 4 --runs 1`, default URL and default target, `--trace` for the UpdateLayoutTree totals):
- `A`: no new flag. - `D`: `--detach-split`. - `G`: `--inject-css .planning/qa/pass-128/ab-hide-grain.css`.
- `DG`: `--detach-split --inject-css .planning/qa/pass-128/ab-hide-grain.css`. - `Agpu`: `--gpu`.
- `Ggpu`: `--gpu --inject-css .planning/qa/pass-128/ab-hide-grain.css`.
Three rounds, interleaved, one run per arm per round, in this order:
- round 1: A D G DG Agpu Ggpu
- round 2: D G DG Agpu Ggpu A
- round 3: G DG Agpu Ggpu A D
Each run: `--out .planning/qa/pass-128/detach-ab/<arm>.jsonl` (the probe appends) and
`--trace .planning/qa/pass-128/detach-ab/traces/<arm>-r<round>.json`. Run node directly, never bash (the Codex sandbox
cannot start bash, LESSONS #47). Log each run through cmd so the log is UTF-8, not UTF-16:
`cmd /c "node .planning\qa\pass-128\scroll-probe.mjs <flags> > .planning\qa\pass-128\detach-ab\logs\<arm>-r<round>.log 2>&1"`.
If Chrome or puppeteer fails to launch, stop and report the exact error; do not retry verbatim (mechanism first).
A run that fails for a transient reason may be re-run ONCE; report both attempts.

## 5. Verification (commands with the expected output; a miss is a failure, never reinterpreted)
1. `node --check .planning/qa/pass-128/scroll-probe.mjs` -> exit 0, no output.
2. Each `.jsonl` has exactly 3 lines (one per round); 18 lines in total.
3. Every line: `consoleErrors` is `[]`; `worldSwitchCount` is 2; `gestureCount` >= 1; `frames` >= 240;
   `topTraceEventsByDuration` is non-null and contains `UpdateLayoutTree`.
4. Every `D` and `DG` line: `detach.charsBefore` >= 29; `detach.roots` contains `cw-offer-title`;
   `detach.charsAfter` is 0; `detach.charsAfterGesture` is 0; the `cw-offer-title` sample has opacity "0" before and
   "1" after (proof the tween still ran, on detached nodes). Every `A`, `G`, `Agpu`, `Ggpu` line: `detach` is null.
5. `A` lines reproduce the old baseline: median `framesOver33ms` in 40..50 (old: 45, spread 2) and every
   `intervalMsP95` is 33.4. If not, the environment drifted: say so and stop interpreting.
6. `webglRenderer`: in `A`, `D`, `G`, `DG` it names SwiftShader or no-webgl (software). In `Agpu` and `Ggpu` it names a
   hardware adapter (ANGLE with Intel, NVIDIA or AMD). If `Agpu` still reads SwiftShader, mark both gpu arms INVALID.
7. `git status --short` shows only `.planning/qa/pass-128/scroll-probe.mjs` modified and `.planning/qa/pass-128/detach-ab/`
   new (traces there are `*.runN.json`, gitignored by `.planning/qa/pass-128/.gitignore`).

## 6. Rejected (do not re-propose)
- Re-running `exp-T1.css`: it restyles the characters but GSAP keeps writing to them; it cannot test the suspect.
- Blocking the GSAP chunk (T3): breaks the page's JS, 21x worse. `content-visibility` on sections (T4): no change.
- `Input.synthesizeScrollGesture` with touch: a no-op on Chrome 153; the probe's manual touch dispatch stays.
- Measuring a local build: the complaint is the live deploy (`dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`); measure www.
- Any fix, any site edit, any interpretation paragraph: evidence only; the fix waits for his three calls.

## 7. Return
Write `.planning/qa/pass-128/detach-ab/RESULTS.md`: one table, one row per run (arm, round, framesOver33ms,
intervalMsP95, UpdateLayoutTree ms, Paint ms, FunctionCall ms, webglRenderer, detach ok yes/no), then each arm's
median framesOver33ms and median UpdateLayoutTree ms, then every verification item above as PASS or FAIL with the
value seen. No commit (Codex cannot commit in a worktree, LESSONS #18); the main session commits.

## 8. Parked operator decisions (asked after this run, by popup)
The three calls in ROOT-CAUSE.md "What a fix pass needs from the operator": SplitReveal shorten or retire; the doors
band's world; staggering the Audit's entrances. A fourth only if the grain arms move the numbers: what the grain does
on phones.
