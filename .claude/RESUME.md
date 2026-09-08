# RESUME — micahjonesconsulting (2026-09-07)

## READ THIS FIRST
Fable 5.1 rules; executors run briefs (MODEL_ROUTING §7–§8). Direction:
`.planning/PHASE-MAP-2026-09-04.md`. Passes 97+98 LIVE (deploy approved 2026-09-04 "deploy
it"). The book chat shares this tree: stage by path.

## Room and Ledger (the new site) — state
- Mock: `.planning/design/WINNING-BRIEF-2026-09-05.md` §1–§18 (rulings, Astra review §12,
  his reviews §14–§17, the recomposition §18); v7 published, same URL be9096fa.
- SITE: branch `design/room-and-ledger` (worktree `.claude/worktrees/p101-integrate`), 46+
  commits, 12 routes ported and axe-clean, verify-room 61/61, build green, tip 501c12b.
  Lighthouse mobile 88 / LCP 4.0s (pre-existing). NOT pushed: `git push -u origin
  design/room-and-ledger` is HIS (Vercel preview). /services unported (1 a11y, also on main).
- Clips: `design/video/` (B-loop, A2-hold). A 3rd clip A wanted (point lower; prompt in the
  video brief). Composites: `COMPOSITE-BRIEF-2026-09-06.md`.
- LESSONS numbering: main #17 vs branch #17/#18 → renumber at merge.

## Executor tier (2026-09-07)
Codex/Astra (ChatGPT Pro, weekly reset — SPEND IT) = juror + 2nd executor
(`scripts/codex-exec.ps1`) · GLM 5.3 = mechanical executor + reader/drafter (`scripts/claude-glm.ps1`; VERIFIED
"OK" 2026-09-07 with the existing ~/.claude/.zai-key; run via `powershell -File`) · Sonnet default in-session · Opus only if no
executor · keys only in his shell. Pass 102: both drafts + Astra's verdicts + the TICK TABLE are on the branch
(`.planning/copy/PASS-102-TICK-TABLE.md`, 12 accepted rows). WAITING ON HIS TICKS → Step E
(GLM applies via `claude-glm.ps1 -Batch`). Headline stays per the juror.

## Ship gate (his)
Stripe webhook + `whsec_` in Production + one live $500 buy/refund → `PLAYBOOK_ON_SALE=1`.

## Next
Pass 102 wording · merge the branch after his preview look · 99/100 SEO items.

## Standing traps
Every push auto-deploys · `grep -oiF` false zeroes · copy-lint hook rejects docs that QUOTE
banned words · scratchpad copy.py shadows stdlib (`python -P`) · Bash heredocs collapse
doubled backslashes (build escape bytes from codes) · a branch lives in ONE worktree ·
a review is a reader, not an oracle.
