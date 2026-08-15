---
description: Independent cross-model review (Gemini + Codex + GLM) of a plan before building, or of a diff before the CARD 1 ship flow. Breaks the Claude-verifies-Claude monoculture. Zero ambient cost — runs only when invoked.
---

# /cross-review

THIN POINTER. The protocol lives in `.claude/skills/cross-review/SKILL.md`
(target construction, legs, disposition protocol, verdict) and
`.claude/cross-review-prompt.md` (reconciliation, rounds, stop rule). This file
deliberately restates nothing — the upstream copy of it drifted stale twice by
duplicating the procedure.

## Usage
- `/cross-review plan [<path>]` — review a plan/decision doc BEFORE the first
  `Pass-N` commit of an arc. Defaults to the newest file in `.planning/reviews/`.
- `/cross-review diff [<base>]` — review `git diff <base>..HEAD` AFTER
  `pnpm build` + `/premium audit` pass and BEFORE the CARD 1 ship flow.
  `<base>` defaults to `origin/main` (this repo holds Pass-N commits behind an
  operator deploy gate, so `origin/main..HEAD` is exactly "not yet live").
  NEVER bare `git diff` — this repo commits per Pass, so the tree is clean at
  the checkpoint and bare `git diff` reviews an EMPTY diff.

On invocation: follow `.claude/skills/cross-review/SKILL.md` §How verbatim.
Skip only with `SKIP_CROSS_REVIEW=1`.
