# Pass-123c (GLM batch): execute the scoreboard CLS brief

Execute `.claude/briefs/pass-123c-scoreboard-cls.md` (read it whole first): section 3 exactly, then every
check in section 5 with its expected output. Scope: exactly two source files change,
`components/color-worlds/ExitScoreboard.tsx` and `app/globals.css`. New files only under `.planning/exec/`
and `.planning/qa/pass-123/`.

Working dir: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. Do NOT commit, push,
deploy, stash, or run any git command that changes the index or HEAD. Do not edit `.claude/RESUME.md`,
`docs/`, `content/`, or any other source file. Another agent may be writing under `.planning/mocks/pass-123/`:
do not touch that folder.

Order: BEFORE first. The current `.next` is the Pass-123b build of this tree's HEAD, so before any edit run
`pnpm start -p 3250` on it and save the BEFORE visible text of `/` (V7), then stop it. BEFORE geometry and
frames (V1, V4) come from the live site. Then edit, build, and run everything AFTER against
`http://localhost:3250`.

Rules (LESSONS #25, #37): a check can fail the work; never pass it by editing the work, loosening a
tolerance, or changing the brief's numbers. If V2 or V3 fails after an honest implementation, STOP and
report the raw numbers and what you think causes them. Port 3250 must be free before each server start;
stop the server after each use.

Report: `.planning/qa/pass-123/REPORT-123C.md` with every check's raw output, the V2 comparison table per
width and beat, the V3 numbers beside the live 0.3298 / 0.1990, the sheet paths, V8's milliseconds, route JS
bytes before and after, and the full `git diff` of the two files. Do not describe any frame as looking
fine; the main session opens them.

Your FINAL message (batch mode prints only that message) must BEGIN with the marker on this prompt's LAST
line, on its own line (LESSONS #36).

LAST LINE MARKER: pass123c-anvil-72
