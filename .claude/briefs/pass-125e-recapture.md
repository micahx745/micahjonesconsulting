# Brief: Pass-125e, rebuild + recapture after two layout fixes (preview branch, round 5)

Executor: Sol (`scripts/codex-exec.ps1 -Task`), worktree `.claude/worktrees/p124-cuts`, branch `preview/p125-full-time`.
HEAD check: `git log -1 --format=%h -- .claude/briefs/pass-125e-recapture.md` must equal `git rev-parse --short HEAD`.
Standing rules of `.claude/briefs/pass-125-full-time.md` section 0 bind. You change NO source file. Build ONCE, measure,
capture. Pre-existing untracked `.planning/qa/pass-124/home-v2/` to `home-v6/` are not yours.

The main session's last commit: (a) under 760px the /full-time principle headlines use `text-wrap: pretty` instead of
balance (Fable found "SOFTWARE" alone on the middle line of the Code headline at 390); (b) the /about "Alongside it"
paragraph gets the same 1.25em top gap as the full-time line under it.

1. `npx next build --webpack` [exit 0].
2. `npx next start -p 3125` in the background.
3. Add one check to `.planning/qa/pass-125/measure.mjs` on `/full-time` at both widths: `artifactSingleWordLine`, for
   each `.cw-principle__artifact`, true if ANY rendered line of it holds exactly one word (group the words by the top
   of their client rects, using a Range per word) [false for all four at both widths]. Keep every other check. Run;
   overwrite `measure.json`.
4. `.planning/qa/pass-125/scroll-sheet.mjs` with suffix `r5` (frames and the two sheets), and `/about` with the new
   line in the upper third at 390x844 and 1440x900 -> `about-currently-390-r5.png`, `about-currently-1440-r5.png`.
5. Stop the server. `git status --short` [measure.mjs and measure.json modified; new r5 files under
   `.planning/qa/pass-125/`, including this round's log; the pre-existing pass-124 folders].

Report: measure.json verbatim, file list with sizes, git status, every bracket that did not match, quoted verbatim.
