# Pass-123 study band (GLM batch): ONE stage of the brief

Execute ONE stage of `.planning/mocks/pass-123/STUDY-BRIEF.md`: the stage named on the line
`STAGE:` at the end of this prompt. Read the whole brief first (the stage depends on §1-§4 and on the
checks listed under "The checks in `band123.mjs`"). Do that stage's steps in order, each with its expected
output, then STOP and report. Do not start the next stage.

Working dir: `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. Do NOT commit, push,
deploy, stash, or run any git command that changes the index or HEAD (read-only `git status` / `git diff`
are fine). Edit only the files the brief's scope and your stage name. Port 3236 (free before each start;
stop the server when the stage ends and confirm it is free).

Rules (the brief's §5 standing clauses; LESSONS #25, #37): a `got` that differs from its `expect` is a FAIL;
never pass a check by editing the work, a tolerance, a size, a string or the brief. Stop and report the raw
output; the main session rules. Do not describe any capture as looking fine: the main session opens them.

Report to `.planning/qa/pass-123/band/REPORT-STAGE-<N>.md`: every command with its raw output, every
PASS/FAIL line, the files you changed (`git status --short`), and anything the brief did not anticipate.

Your FINAL message (batch mode prints only that message) must BEGIN with the marker on this prompt's LAST
line, on its own line (LESSONS #36).
