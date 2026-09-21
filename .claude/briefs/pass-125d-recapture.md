# Brief: Pass-125d, rebuild + recapture after one spacing fix (preview branch, round 4)

Executor: Sol (`scripts/codex-exec.ps1 -Task`), worktree `.claude/worktrees/p124-cuts`, branch `preview/p125-full-time`.
HEAD check: `git log -1 --format=%h -- .claude/briefs/pass-125d-recapture.md` must equal `git rev-parse --short HEAD`.
Standing rules of `.claude/briefs/pass-125-full-time.md` section 0 bind. You change NO source file. Build, measure,
capture only. Pre-existing untracked `.planning/qa/pass-124/home-v2/` to `home-v6/` are not yours.
Run the build ONCE; do not re-run it after the captures (round 3's extra re-run failed on an npm cache lock).

The main session added `.cw-ft-sect` (64px top margin, 48px under 760px) to the "Write to me." heading in the last
commit: round 3's captures showed it flush under the record's last line.

1. `npx next build --webpack` [exit 0].
2. `npx next start -p 3125` in the background.
3. Add one check to `.planning/qa/pass-125/measure.mjs` on `/full-time` at both widths: `contactHeadingGap`, the
   distance in px from the bottom of the element before `#cw-ft-contact-title` to that heading's top [>= 44 at 390,
   >= 60 at 1440]. Run it; overwrite `measure.json`. Every other bracket as in `.claude/briefs/pass-125c-jury-fixes.md`.
4. Run `.planning/qa/pass-125/scroll-sheet.mjs` with the suffix `r4` (frames `scroll/ft-<width>-r4-<nn>.png`, sheets
   `sheets/full-time-scroll-390-r4.png` and `...-1440-r4.png`).
5. Stop the server. `git status --short` [measure.mjs and measure.json modified; new r4 files under
   `.planning/qa/pass-125/`; the pre-existing pass-124 folders].

Report: measure.json verbatim, file list with sizes, git status, every bracket that did not match, quoted verbatim.
