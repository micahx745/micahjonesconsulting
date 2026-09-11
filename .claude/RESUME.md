# RESUME — micahjonesconsulting (2026-09-11)

## READ FIRST

**Dark rebuild REJECTED; the LIVE site is being evolved.** Branch `design/live-evolve`
(worktree `.claude/worktrees/p106-live`), ahead of `main`, merges clean.
**`pnpm build` fails HERE only** (Turbopack font error; Vercel is fine): use
`npx next build --webpack`. **Workflow ignores `CLAUDE_CODE_SUBAGENT_MODEL`**: name `model:`.
Routing is MODEL_ROUTING §9d (2026-09-11): Claude usage is the bucket to conserve. GLM 5.3
executes, Sol drafts and executes when GLM is capped, Astra judges, Fable/Opus rule only.
The project subagent default is now `sonnet` (`.claude/settings.json`).

## State

- Pass-110 and Pass-111a COMMITTED and PUSHED (operator 2026-09-11, verbatim: "yeah push").
  Remote `design/live-evolve` at 7d2c9b4; Vercel preview build: success. `main` untouched.
- HANDOFF READY for a new chat on the operator's other account. Kickoff:
  `.planning/handoff/NEXT-SESSION-KICKOFF.md` (Astra wrote it, Sol fact-checked it, fixes
  applied). Decision queue: `.planning/handoff/DECISIONS-2026-09-11.md` (Sol drafted, Sol
  fact-checked, 9 decisions). The new chat presents the queue only after it has booted and
  proved its tools. GLM capped until 2026-09-12 06:26:46 (z.ai time).

## Waiting on the operator

Decisions 1-9 in DECISIONS-2026-09-11.md; 1-3 block Pass-111b (the /services rebuild).
Merge to `main` · Stripe live $500 test · the two MODEL_ROUTING §9a support questions.

## OPEN

Self-tests for vendor/retired gates (#21) · case-study body starts low under the rail (Astra
d) · `claude-glm.ps1 -Brief` sends a literal `$Brief`: use `-Batch` with a pointer prompt.

## Traps

push to main auto-deploys · capture VIEWPORT, settle first · `python -P` · Git Bash: set
`MSYS_NO_PATHCONV=1` for "/" args · never read an exit code through a pipe · never edit a
running script (#22) · PS 5.1 splits native args at embedded quotes: commit via a Git Bash
heredoc or `-F` · GLM `-Batch`: a pointer prompt only · MORE THAN ONE world renders here: no
fixed text colour, no opacity on text, no `--cw-accent` under text.
