# 01a — hooks, context diet, subagent boot (GLM leg 2a, 2026-09-22)

Executor: GLM 5.3 via `claude` in worktree `p106-live`. Scripts: `scripts/settings_extract.py`,
`scripts/usage_names.py` (this dir). Privacy rule held: no transcript opened by hand, no settings
file read by hand, permissions counted not printed. Pre-flight: all six settings paths EXIST.

## Step 1 — settings inventory (hooks, env names, plugins, counts)

Pre-flight (exists/missing): all six EXIST — user settings.json, user settings.local.json,
worktree settings.json, worktree settings.local.json, repo settings.json, repo settings.local.json.

### Hooks that load

| # | file | event | matcher | timeout | command |
|---|------|-------|---------|---------|---------|
| 1 | user settings.json | PostToolUse | '' | default | node gsd-context-monitor.js |
| 2 | user settings.json | PostToolUse | '' | 10 | node tier-burn-monitor.js |
| 3 | user settings.json | PreToolUse | Bash\|PowerShell | 10 | python secret-literal-gate.py |
| 4 | user settings.json | PreToolUse | Agent | 10 | python agent-model-gate.py |
| 5 | user settings.json | SessionStart | '' | 5000 | python global_boot_guard.py |
| 6 | user settings.json | SessionStart | '' | 10 | python concurrent-session-guard.py |
| 7 | worktree settings.json | PostToolUse | Write\|Edit | 30 | python playbook/hook-gate.py |
| 8 | worktree settings.json | PreToolUse | Write\|Edit\|MultiEdit\|NotebookEdit | 10 | worktree-write-guard.py --source branch |
| 9 | worktree settings.json | SessionStart | '' | 15 | routing-reminder.py |
| 10 | repo settings.local.json | PreToolUse | Write\|Edit\|MultiEdit\|NotebookEdit | 10 | worktree-write-guard.py --source main-local |
| 11 | repo settings.local.json | SessionStart | '' | 15 | routing-reminder.py |

(repo settings.json repeats hook 7 only; user settings.local.json has no hooks.)

### Env names (values only for CLAUDE_CODE_*/ANTHROPIC_DEFAULT_*/ANTHROPIC_MODEL)

- user settings.json: `CLAUDE_CODE_SUBAGENT_MODEL = sonnet`, `DISABLE_AUTOUPDATER = <set>`
- worktree settings.json: `CLAUDE_CODE_SUBAGENT_MODEL = sonnet`
- others: none.

### Plugins / statusLine / model

- enabledPlugins (user level): premium-web plugin + its 7 subagents (a11y-reviewer,
  case-study-writer, copy-editor, design-director, motion-engineer, perf-audutor, visual-qa) all
  `true`; `superpowers@superpowers-marketplace: true`; `voltagent-meta@voltagent-subagents: true`.
  10 entries total.
- statusLine (user): command → node gsd-statusline.js. model: unset everywhere.
- permissions counts: user settings.json allow=460 ask=5 deny=4; user local allow=2; worktree
  allow=22; worktree local allow=1; repo allow=22; repo local allow=37. Secret-pattern matches
  across ALL six files: **0**.

### MCP servers (names + types only, from .claude.json)

User level (all stdio): chrome-devtools, claude-context, context7, desktop-commander, github,
sequential-thinking, supabase (7). Project micahjonesconsulting (incl. worktrees p101, p106):
none.

## Step 2 — tool-use counts by name (1432 transcripts, 41,329 tool_use calls)

Date range: 2026-05-27 .. 2026-09-22 (all `C--Users-micah-Code-micahjonesconsulting*` dirs,
subagent files included).

MCP servers by calls: Claude_Browser 927 · chrome-devtools 566 · plugin_premium-web_playwright
465 · 326cc715-…(uuid server) 70 · ccd_session_mgmt 37 · ccd_session 28 · ccd_directory 3 ·
context7 1 · desktop-commander 1 · plugin_premium-web_sequential-thinking 1 · terminal 1.
**Zero calls:** claude-context, github, supabase, sequential-thinking (the user-level stdio ones).

Skills by calls: premium-web:copy-lint-rules 11 · frontend-design 6 · impeccable-typeset 5 ·
superpowers:executing-plans 5 · page-cro 3 · update-config 3 · artifact-capabilities 2 ·
artifact-design 2 · marketing-psychology 2 · 11 more at 1 each (incl. cross-review, run,
security-review, brainstorming).

Agent/Task by subagent_type: general-purpose 64 · default 20 · motion-engineer 7 ·
claude-code-guide 5 · design-director 2 · perf-auditor 2 · Explore/a11y/code-reviewer/visual-qa 1
each. By model: fable 38 · sonnet 38 · inherited/unset 22 · opus 5 · haiku 1.

## Step 3 — plugin + skills inventory (what the always-loaded listing carries)

Marketplace note: premium-web is a DIRECTORY marketplace at `C:/Users/micah/Code/premium-web-harness`
(`known_marketplaces.json`), so its 8 plugins resolve live from there; the `cache/premium-web/<name>`
copies of the 7 agent plugins are GONE from disk (only `premium-web/` and `motion-qa/` remain) —
`installed_plugins.json` still points at the dead cache paths. `motion-qa` is installed but NOT
enabled. `ordani-gsd` is a project-scoped install for birthflowV2, not this repo.

| plugin (enabled) | skills | skill fm bytes | agents | mcp servers | hooks |
|---|---|---|---|---|---|
| a11y-reviewer@premium-web | 0 | 0 | 1 | 0 | 0 |
| case-study-writer@premium-web | 0 | 0 | 1 | 0 | 0 |
| copy-editor@premium-web | 0 | 0 | 1 | 0 | 0 |
| design-director@premium-web | 0 | 0 | 1 | 0 | 0 |
| motion-engineer@premium-web | 0 | 0 | 1 | 0 | 0 |
| perf-auditor@premium-web | 0 | 0 | 1 | 0 | 0 |
| visual-qa@premium-web | 0 | 0 | 1 | 0 | 0 |
| premium-web@premium-web | 3 | 996 | 0 | 5 (.mcp.json: chrome-devtools, playwright, vercel, context7, sequential-thinking; 4 visible in this chat's tools) | 3 (PreToolUse 1, PostToolUse 2) |
| superpowers@superpowers-marketplace 4.1.1 | 14 | 2,263 | 1 | 0 | 1 (SessionStart) |
| voltagent-meta@voltagent-subagents 1.0.0 | 0 | 0 | 10 | 0 | 0 |
| **total** | **17** | **3,259** | **18** | 5 | 4 |

Personal `C:/Users/micah/.claude/skills/`: **720 SKILL.md** (rglob; 645 top-level dirs),
frontmatter name+description = **134,550 bytes**. Grand listing payload = **137,809 bytes**.

**Plugins with NO call in this repo (Step 2):** voltagent-meta (0 calls), case-study-writer
(0 agent calls; the `premium-web:case-study-writer` SKILL call is the premium-web plugin's skill,
not this agent plugin), copy-editor (0 calls). a11y-reviewer, design-director, motion-engineer,
perf-auditor, visual-qa, premium-web and superpowers all have ≥1 call.

**Calibration vs the app's measurement of this chat:** Skills 9,752 tokens against 137,809 bytes
of name+description on disk → 14.1 bytes/token implied (if every SKILL.md were listed verbatim).
Either the listing truncates descriptions / skips nested SKILL.md files, or the app's token figure
is the GLM tokenizer's dense count; the byte figure is the disk ceiling. MCP tools 16,390 tokens
(app) is consistent with 7 user-level stdio servers + premium-web's 5 (playwright alone ~30 tools).

## Step 4 — P2: what a repo file can switch off (docs + measurement)

### Docs (quoted with URL)

(a) enabledPlugins, project vs user — `https://code.claude.com/docs/en/settings`:
> "When the same key appears in more than one place, Claude Code uses the value from the highest level that sets it. The stack below shows the levels, highest on top; a key at a higher level overrides the same key anywhere below it." (order: managed > command line > project local > shared project > user)
> "Claude Code merges JSON you pass with `--settings <file-or-json>` with your settings files by the same rules as the other levels: it takes a key you set here over the same key in local, project, or user settings, and keeps the lower-level value for a key you omit."
> "A session with several repositories starts above the clones and reads only the `enabledPlugins` and `extraKnownMarketplaces` keys from each repository's `.claude/settings.json`."

`https://code.claude.com/docs/en/plugins-reference`:
> "The restriction is specific to `pluginConfigs`: `enabledPlugins` still honors project and local settings."
> "To keep it out of one project in every environment, set `"<name>@synced": false` under `enabledPlugins` in that project's committed `.claude/settings.json`."
No page states the per-plugin-NAME merge of the enabledPlugins map across scopes beyond this project-`false` recipe; the general per-key precedence rule is what applies.

(b) project `.mcp.json` — `https://code.claude.com/docs/en/mcp`: `.mcp.json` only DEFINES project-scope servers; it cannot disable user-level servers. The off-switches live in settings/flags:
> "Add it to `disabledMcpjsonServers`, which blocks it in every permission mode." / "Exclude project settings entirely with `--setting-sources`..." / "Start the session with `--strict-mcp-config`. Claude Code then uses only the MCP servers you pass with `--mcp-config`."
> "When the same server is defined in more than one place, Claude Code connects to it once, using the definition from the highest-precedence source. The entire server entry from that source is used; fields are not merged across scopes." (local > project > user > plugin-provided > claude.ai connectors)

(c) hide for one project — same pages:
> "`disabledMcpServers`: an opt-out list for user-configured servers, plugin servers, servers your organization provides through managed settings, the claude.ai connectors Claude Code fetches itself, and built-in servers that default to on. Claude Code doesn't connect to a server you list here." (per-project, recorded via the /mcp toggle in ~/.claude.json under the project)
Plus project `enabledPlugins: false` (kills a plugin's skills+agents+MCP together) and `disabledMcpjsonServers` for `.mcp.json` servers.

### Measurement (GLM tokenizer, CLI, from the worktree; desktop-app servers NOT included)

Plugins with no call in this repo (Step 2): voltagent-meta, case-study-writer, copy-editor →
`--settings %TEMP%\p106-leg2a-settings.json` = `{"enabledPlugins": {"voltagent-meta@voltagent-subagents": false, "case-study-writer@premium-web": false, "copy-editor@premium-web": false}}`

- (a) as-is: input 39,456 + cache_read 768 + cache_write 0 = **ctx 40,224**
- (b) plugins off: input 6,557 + cache_read 32,960 + cache_write 0 = **ctx 39,517**
- **delta = 707 tokens = 1.76%** — 12 agent listings (10 voltagent + 2 premium-web agents) ≈ 59
  tokens each. Note: GLM endpoint reports no cache_write column; run (b) read run (a)'s cache,
  so the delta is the true content difference, not cache noise.
