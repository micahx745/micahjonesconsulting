# Sol task: fact-check the handoff pair, 2026-09-11

You are a verification leg. Read-only. Your final message IS the report: markdown only.

Two drafts will be handed to a new Claude chat as its only briefing. A wrong path, a stale
commit, a wrong price or an invented quote in them sends that chat the wrong way for a whole
session. Find every such error.

## Files under test

1. `.planning/handoff/KICKOFF-DRAFT-ASTRA.md`, the kickoff prompt.
2. `.planning/handoff/DECISIONS-2026-09-11.md`, the operator's decision queue.

## Check every factual claim against the repo and the machine

- Every path and executable: does it exist exactly as written? Worktree root is
  `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`.
- Every branch name and commit hash: `git -C <worktree> log --oneline -8` and
  `git -C <worktree> branch --show-current`. Expected head 7d2c9b4 or later on
  design/live-evolve.
- Every section reference: `C:/Users/micah/.claude/MODEL_ROUTING.md` §6, §8, §9, §9a, §9b, §9c,
  §9d; `docs/LESSONS_LEARNED.md` #3, #19, #20, #21, #22; `docs/DESIGN_BAR.md` R13, R15;
  `.planning/design/DIRECTION-110.md` §3.3. Does the section exist and say what the draft says?
- Every quote attributed to the operator: find it verbatim in the repo or in MODEL_ROUTING.md.
  A quote you cannot find is a finding.
- Every price, figure, date and product name: find its source file.
- Every launcher flag the kickoff tells the chat to use: confirm the flag exists in the
  script's `param(` block (`scripts/claude-glm.ps1`, `scripts/claude-alt.ps1`,
  `scripts/codex-exec.ps1`).
- Anything the kickoff says the chat can or cannot do on the other account: is it consistent
  with MODEL_ROUTING §9a and §9d?
- Anything stale carried over from `.planning/handoff/EXECUTOR-TIER-CARD.md` or the old
  kickoff (Pass-104b, design/room-and-ledger, p101-integrate).

## Report format

A table per file: claim (short) | verdict (OK, WRONG, STALE, UNSOURCED) | evidence (path:line
or command output). List only WRONG, STALE and UNSOURCED rows in full; count the OK rows in
one line. End with the three fixes that matter most. No em-dashes.
