# RESUME — micahjonesconsulting (2026-09-01 PM)

## HARNESS: model gate locked (operator: "put fable at the right gate", usage pressure)
`~/.claude/MODEL_ROUTING.md` is the card; global + project CLAUDE.md point at it.
Rule: **can a command verify the next decision? No -> Fable. Yes -> Opus/Sonnet.**
The cap: `CLAUDE_CODE_SUBAGENT_MODEL: sonnet` in global settings, so fan-out cannot inherit a
top tier; per-call `model:` outranks it and is mandatory on every Agent call. Knobs verified
against the INSTALLED binary (2.1.234) — SUBAGENT_MODEL_FORCE and ANTHROPIC_DEFAULT_MODEL are
ABSENT here (newer builds only, inert). Hooks cannot change the model. Backups
`*.bak-pre-model-routing`.

## Pass-59 (26e3ed7) em-dash gate + case-study copy pass — previewed, NOT pushed
Gate: copy-lint-runner fails the build over 1 em-dash/page, scope content/**/*.mdx (LESSONS
#11). Copy pass ran as a workflow: 3 Fable editors (one per file) + 3 Sonnet verifiers, models
confirmed from run meta.json, not self-report. guardicore lost "$150K deal size" + "Trillions
in assets" (unledgered) and the one-answer descriptor -> "a federal research agency";
hr-author lost the politics paragraphs + "a top university and a county government"; ordani's
RLS line is one control among audit trail + export gate, first-mover claim dropped. Em-dashes
24 -> 1. Verifiers caught a sentence duplicated verbatim in ordani (fixed) and two ledger-drift
rows (LESSONS #3 now records both). Preview-verified.

## QUEUED: tsx em-dash debt (found, deliberately not swept)
6 files / 13 over cap: ai-engineering 5, home 4, layout 3, work/[slug] 3, about 2, playbook 2.
Excluded because sweeping edits copy the operator approved hours earlier. Widening = one array.

## Production state
Live = Pass-53..56c (musrbwwz4). UNPUSHED: Pass-57/58 (88bbafe) + Pass-59 (26e3ed7).
Latest preview 7868lag3i. Prod deploys are CLI; git push alone does not deploy.

## Operator queue
1. Review preview -> "push it" (ships 57/58/59). 2. Sweep tsx em-dashes? 3. Ordani says both
"encryption at the row level" (heading/tools) and "row-level security policies" (body) —
different controls; operator call. 4. SECRET ROTATION overdue (Resend, calendar ICS, Stripe
test). 5. Stripe go-live. 6. Global settings 43KB / 460 allow entries, worth a prune.

## Gotchas
- Windows heredocs mangle backslashes: write regex-bearing TS with Edit, not python.
- Python writes CRLF -> prettier --write touched TS/TSX before commit.
- Secrets never inline. Ordani never names vendors. HIPAA-compliant, never -grade.
