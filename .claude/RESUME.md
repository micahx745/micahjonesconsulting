# RESUME — micahjonesconsulting (2026-09-11)

## READ FIRST

**Dark rebuild REJECTED; the LIVE site is being evolved.** Branch `design/live-evolve`
(worktree `.claude/worktrees/p106-live`), ahead of `main`, merges clean.
**`pnpm build` fails HERE only** (Turbopack font error; Vercel is fine): use
`npx next build --webpack`. **Workflow ignores `CLAUDE_CODE_SUBAGENT_MODEL`**: name `model:`.
Operator 2026-09-11: "make sure you are using the harness using other AI models": GLM 5.3
executes briefs, Sol `gpt-5.6-sol` drafts, Astra judges, Claude rules and verifies.

## State

- Pass-110 COMMITTED (GLM executed; review workflow 7/7; lint rewritten after the review broke
  it 7 ways, now self-tests in every build). World gate: 0 findings, KNOWN empty.
- Pass-111a: GLM running (brief `pass-111a-boxes-receipts-ordani.md`, pointer
  `.planning/exec/glm111a-prompt.txt`, report `.planning/exec/glm111a-report.txt`). It does
  NOT commit: check its diff, re-run gates, Astra on the captures, then commit.
- Design: `.planning/design/DIRECTION-110.md` + `CRITIQUE-110.md`.

## Waiting on the operator (asked 2026-09-11)

1 engagement price floor · 2 per-shape commitments (DIRECTION §3.3) · 3 package pick to
Stripe (backend) · 4 count-up override of R13/R15 · 5 case-study lines (Hennessy, "foreign",
"led to") · 6 Ordani screenshots · 7 the paid book PDF's chapter-6 heading still uses the
now-banned term (fix lives in the book repo). Rename "AI engineering" unless he vetoes.
Pass-111b (/services rebuild) waits on 1-3.

## OPEN

Merge to `main` (operator) · push each pass (ask) · Stripe live $500 test.

## Traps

push to main auto-deploys · capture VIEWPORT, settle first · `python -P` · Git Bash: set
`MSYS_NO_PATHCONV=1` for "/" args · never read an exit code through a pipe · GLM `-Batch`: a
pointer prompt only · MORE THAN ONE world renders here: no fixed text colour, no opacity on
text, no `--cw-accent` under text or as a link's only cue.
