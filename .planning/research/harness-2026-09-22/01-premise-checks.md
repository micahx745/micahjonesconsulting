# 01 premise checks P1-P8 (harness research 2026-09-22)

Each check has a verdict and its evidence (file:line, or a command and its output). Sources: `smoke/*.txt`,
`00-usage-audit.md` (GLM leg 1), `01a-hooks-diet-boot.md` (GLM leg 2a, steps 1-4; GLM then hit its 5-hour limit, and
the 429 body reset time was 2026-09-23 05:44:53 Shanghai = 2026-09-22 14:44:53 PDT).

- **P1 Stop hooks: CONFIRMED, none load.** The 11 hooks that load are PostToolUse, PreToolUse and SessionStart only
  (`01a-hooks-diet-boot.md` Step 1 table, from `scripts/settings_extract.py` over all six settings files). This agrees
  with LANDING PAGE 2: the four Stop hooks on disk belong to hookify and ralph, which are not enabled. 00b's R0 (the
  Stop-nudge kill) has nothing to act on in this repo.
- **P2 Context diet: 00b's mechanism is WRONG, and the repo-level lever is small.** A project `.mcp.json` only defines
  project servers; it cannot switch off user-level ones (https://code.claude.com/docs/en/mcp, quoted in 01a Step 4).
  The repo-level lever is `enabledPlugins: false` in the project's `.claude/settings.json`
  (https://code.claude.com/docs/en/plugins-reference). Measured on a GLM CLI session: switching off the 3 plugins with
  no call in this repo (voltagent-meta, case-study-writer, copy-editor) cut the prefix 40,224 -> 39,517 tokens (707,
  1.76%). The bigger items are his, not the repo's: 720 personal skills under `~/.claude/skills` (134,550 bytes of
  name+description on disk), and 4 user-level MCP servers with zero calls in this repo since 2026-05-27 (claude-context,
  github, supabase, sequential-thinking; 41,329 tool calls counted). `disabledMcpServers` can switch servers off per
  project, but the /mcp toggle records it in `~/.claude.json` (his file).
- **P3 Double-load: 00b's "~9.6K" is WRONG; measured 6,409 tokens/turn, 0.7% of cost.** 9,660 tokens is this chat's
  whole Memory-files category (global + worktree stack + MEMORY.md). The main-checkout stack is 19,423 bytes, about
  6,409 tokens at the calibrated 0.33 tokens/byte (00-usage-audit.md T8). 6 of 7 sessions moved main -> worktree
  within a minute of starting, and paid 962K weighted tokens extra in total, 0.7% of the sample. The docs sentence on
  nested-worktree loading was not fetched (GLM capped); the verdict does not depend on it.
- **P4 Subagent model override: FALSE as both reports state it.** With `CLAUDE_CODE_SUBAGENT_MODEL=sonnet` set at the
  user AND the worktree level (01a Step 1), an Agent call with `model: "fable"` was answered by claude-fable-5-1
  (`smoke/subagent-probe.txt`). History agrees: 0 requested/actual mismatches over 35 subagent runs, every Fable juror
  answered as claude-fable-5-1, and unset-model subagents answered as claude-sonnet-5 (00-usage-audit.md T5). The
  variable sets the default and does not override an explicit model.
- **P5 `fable` shorthand: EXISTS in this app** (00b says it does not). It resolves to claude-fable-5-1
  (`smoke/subagent-probe.txt`). Agent calls by model since May: fable 38, sonnet 38, unset 22, opus 5, haiku 1 (01a
  Step 2).
- **P6 Visual QA off Claude vs LESSONS #36/#37: the rule stands, and it is cheap to keep.** #36
  (`docs/LESSONS_LEARNED.md:2184-2186`): "A batch run's report is not evidence about a render: the main session opens
  the captures, and visual checks the executor runs are measurements (bounding boxes, overlaps), not 'looks fine'."
  #37 (`:2216-2220`): a check can fail the work but never be passed by editing the work; contrast is measured at rest
  and hovered on every ground; overlap on both axes. Any visual-QA change must keep an independent look at the real
  render (never the executor's own report) plus deterministic measurements. The audit puts images at 4.2% of weighted
  cost with carry, so the look can stay on Claude as one downscaled montage per gate.
- **P7 `opus` alias: TRUE, it now resolves to claude-opus-5-5** (`smoke/subagent-probe.txt`).
  `.claude/AI_ROUTING.md:33` still pins claude-opus-5; LANDING PAGE 2's E4 re-pins it on `harness/v2`.
- **P8 Lean subagent boot: NOT MEASURED here** (GLM capped before step 5). Baseline: a do-nothing general-purpose
  subagent boots at 78,250 tokens, all cache-write (5-minute TTL), and a resume within 45 s reuses about 47%
  (`smoke/subagent-probe.txt`). Harness v2's C4 builds and measures a lean boot.

Also found (01a): `installed_plugins.json` points the 7 premium-web agent plugins at cache paths that no longer exist
on disk; they resolve live from the directory marketplace at `C:/Users/micah/Code/premium-web-harness`. `motion-qa` is
installed but not enabled. None of the six settings files holds a secret-shaped string (0 matches; counts only).
