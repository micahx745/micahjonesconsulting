## Model routing (full table, ids, commands, rules and history: `.claude/AI_ROUTING.md`)
Harness v2 (operator popups 2026-09-22). Opus 5.5 is the main model: it rules, writes briefs, reviews diffs, keeps
the books and commits. By default:
- Reading, sweeps, summaries: DeepSeek (`scripts/deepseek-exec.ps1`, `-MaxTokens 32000+`), Gemini as fallback.
- Drafting copy: two families in parallel, `deepseek-v4-pro` and Sol (`codex-exec.ps1 -Review -Model gpt-5.6-sol`).
- Mechanical execution: GLM in a worktree (`scripts/claude-glm.ps1 -Batch`, pointer brief, executor guard,
  receipt, 8 KB digest); Opus 5.5 reviews the diff. Judgment-bearing execution: an Opus 5.5 subagent.
- Quality at every design or copy checkpoint: Fable (one call, at most 3 gates per arc) AND Astra
  (`codex-exec.ps1 -Review`) AND `deepseek-v4-pro`. When they split, the operator gets each pick by name.
- Claude (this session) keeps: the LESSONS #3 ledger check, ship calls, briefs, rulings, commits, and any copy with
  non-ASCII characters (LESSONS #46).
- Every Agent/Workflow names its model; every checkpoint and copy/design commit carries a `LEGS:` stamp;
  `get_usage` before any Claude fan-out, recorded with `scripts/harness/status.py claude`; at 75% weekly, Claude
  narrows to ledger, ship, diff review and taste. Hooks enforce the budget line, the tier-burn deny, the image ask
  and the 200K context warning.

