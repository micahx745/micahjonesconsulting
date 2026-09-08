# RESUME — micahjonesconsulting (2026-09-08)

## READ THIS FIRST
Fable 5.1 rules; executors run briefs (MODEL_ROUTING §7–§8). Direction:
`.planning/PHASE-MAP-2026-09-04.md`. Passes 97+98 LIVE (deploy approved 2026-09-04). The book chat shares this tree: stage by path.

## Room and Ledger (the new site) — state
- Mock: `.planning/design/WINNING-BRIEF-2026-09-05.md` §1–§18; v7 published, URL be9096fa.
- SITE: branch `design/room-and-ledger` (worktree `.claude/worktrees/p101-integrate`), 50+
  commits, 12 routes ported and axe-clean, verify-room 61/61, build green, tip abfc057.
  Lighthouse mobile 88 / LCP 4.0s (pre-existing). NOT pushed: `git push -u origin
  design/room-and-ledger` is HIS (Vercel preview). /services unported (1 a11y, also on main).
- Clips: `design/video/` (B-loop, A2-hold); 3rd clip A wanted. Composites brief 2026-09-06.
- LESSONS numbering: main #17 vs branch #17/#18 → renumber at merge.

## Executor tier (2026-09-07)
Codex/Astra (ChatGPT Pro, weekly reset — SPEND IT) = juror + 2nd executor
(`scripts/codex-exec.ps1`) · GLM 5.3 = mechanical executor + reader/drafter
(`scripts/claude-glm.ps1`, key ~/.claude/.zai-key, run via `powershell -File`; 5h window
spent 2026-09-08) · Sonnet default in-session · Opus only if no executor · keys only in his shell.
Pass 102 DONE on the branch (12 rows, gates green, QA `.planning/qa/pass-102/`).
Pass 103 (long-form copy): 57/57 ticked rows APPLIED on the branch (Codex applier; Fable
committed per page ad4e11c…9a85226; build green, verify-room 61/61, QA `.planning/qa/pass-103/`).
Running 2026-09-08: verify Workflow wf_dbe6bf5f-577 (diff-vs-table, ledger, verifier rerun,
screenshot read, critic) + Codex reword leg for the 9 REWORD rows + the /about paragraph
order → `.planning/copy/PASS-103-REWORD-drafts.md` → juror → his ticks. Brief §5 bounded (ea725b6).

## Ship gate (his)
Stripe webhook + `whsec_` in Production + one live $500 buy/refund → `PLAYBOOK_ON_SALE=1`.

## Next
Pass 103 verify results → reword table to him · his preview push · merge after his look · 99/100 SEO items.

## Standing traps
Every push auto-deploys · `grep -oiF` false zeroes · copy-lint hook rejects docs that QUOTE
banned words · scratchpad copy.py shadows stdlib (`python -P`) · Bash heredocs collapse
doubled backslashes (build escape bytes from codes) · a branch lives in ONE worktree ·
Codex cannot commit in a worktree (LESSONS #18)
