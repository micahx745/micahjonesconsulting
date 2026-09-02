# RESUME — micahjonesconsulting (2026-09-01 PM)

## HARNESS: model gate locked (operator: "put fable at the right gate", usage pressure)
`~/.claude/MODEL_ROUTING.md` is the card, referenced from global + project CLAUDE.md.
Rule: **can a command verify the next decision? No -> Fable. Yes -> Opus/Sonnet.**
The cap that saves the window: `CLAUDE_CODE_SUBAGENT_MODEL: sonnet` in global settings, so
fan-out cannot inherit a top tier; per-call `model:` outranks it and is mandatory on every
Agent call. Knobs verified against the INSTALLED binary (2.1.234) — SUBAGENT_MODEL_FORCE and
ANTHROPIC_DEFAULT_MODEL are ABSENT here (newer builds only, would sit inert). Hooks cannot
change the model. Project settings gained a 22-entry allowlist; vercel + git push stay `ask`.

## Pass-59 (uncommitted): em-dash gate + case-study copy pass
Gate: copy-lint-runner counts em-dashes, fails over 1/page, blocking scope content/**/*.mdx.
LESSONS #11. Copy pass ran as a workflow: 3 Fable editors (one per file) + 3 Sonnet verifiers,
models confirmed from run meta.json, not self-report. guardicore lost "$150K deal size" and
"Trillions in assets" (unledgered) and the one-answer descriptor -> "a federal research agency"
in dek AND outcome; hr-author lost the politics paragraphs and "a top university and a county
government"; ordani's RLS line is now one control among audit log + export gating, first-mover
claim dropped. Hedges stripped from headline numbers. Em-dashes 24 -> 1. Build green.

## QUEUED: tsx em-dash debt (found, deliberately not swept)
6 files / 13 over cap: ai-engineering 5, home 4, layout 3, work/[slug] 3, about 2, playbook 2.
Excluded because sweeping edits copy the operator approved hours earlier. Widening = one array.

## Production state
Live = Pass-53..56c (musrbwwz4). Pass-57/58 (88bbafe) previewed at fcaz5ie9z, NOT pushed.
Prod deploys are CLI; git push alone does not deploy.

## Operator queue
1. Review preview -> "push it". 2. Sweep tsx em-dashes? 3. SECRET ROTATION overdue (Resend,
calendar ICS, Stripe test key). 4. Stripe go-live. 5. Global settings 43KB / 460 allow entries,
worth a prune. 6. Auto-updater off, CLI pinned at 2.1.234.

## Gotchas
- Bash heredocs mangle backslashes on Windows: write regex-bearing TS with Edit, not sed/python.
- Python on Windows writes CRLF -> prettier --write touched TS/TSX before commit.
- `git add` with one bad pathspec adds NOTHING; check `git show --stat` after commit.
- Secrets never inline. Ordani never names vendors. HIPAA-compliant, never -grade.
