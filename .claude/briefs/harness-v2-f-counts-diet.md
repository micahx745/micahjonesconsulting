# Harness v2, run F: B1 tool-use counts + C1 context diet

Brief-Format: v2
Executor: GLM 5.3 through `scripts/claude-glm.ps1 -Batch -Scope harness` (C1 edits `.claude/settings.json`).
Run last: after runs B and C have wired their hooks. Read `.claude/briefs/harness-v2-00-common.md` first.

## Ruling
B1 has two halves. The token half is MJCONSULT 13's `usage_audit.py` (commit `95de6f4`, operator ruling "This chat
installs": its audit replaces a second token aggregator). The half built here counts what C1 needs and the audit
does not break out: calls per MCP server, per skill and per subagent type, the longest execution run per top-tier
session, and image blocks per session. C1 then switches off, in project settings only, the plugins and MCP servers
this repo has not called in 30 days, keeps everything the premium-web gates use, and measures the fixed prefix
before and after. Reason: the prefix is about 70K tokens on every turn of every session, and a server nobody calls
still costs its tool list on each of them.

## Files
This run may create or modify only these:
- `scripts/harness/tool_use_counts.py` (new)
- `scripts/harness/tests/test_b1_counts.py` (new)
- `scripts/harness/tests/live_b1_counts.py` (new)
- `.planning/harness/c1-counts.tsv` (new: the 30-day counts C1 decided on)
- `.planning/harness/c1-measure.json` (new: the prefix before and after)
- `.claude/settings.json` (C1.3 only)
- `scripts/harness/tests/test_c1_settings.py` (new)
- `scripts/harness/tests/live_c1_measure.py` (new)
- `.planning/harness/digests/run-f.json` (new)

## Pre-flight
Main session, before dispatch (actual values):
- `test -e .planning/research/harness-2026-09-22/scripts/usage_audit.py; echo $?` -> `0` (merged from
  `design/live-evolve`)
- `python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print(len(d['permissions']['allow']), 'deny' in d['permissions'], 'enabledPlugins' in d)"` -> `22 False False`
- The operator's user-level plugins that are switched on (read by the main session from `~/.claude/settings.json`
  on 2026-09-22; do not read that file yourself): `a11y-reviewer@premium-web`, `case-study-writer@premium-web`,
  `copy-editor@premium-web`, `design-director@premium-web`, `motion-engineer@premium-web`,
  `perf-auditor@premium-web`, `premium-web@premium-web`, `superpowers@superpowers-marketplace`,
  `visual-qa@premium-web`, `voltagent-meta@voltagent-subagents`.
- MCP servers visible to the main session on 2026-09-22 (from its tool list): the app's own `ccd_*` servers,
  `Claude_Browser`, `visualize`, `terminal`, `claude-in-chrome`, `computer-use`, `scheduled-tasks`, `mcp-registry`,
  `chrome-devtools`, `claude-context`, `context7`, `desktop-commander`, `github`, `sequential-thinking`, `supabase`,
  `plugin_premium-web_chrome-devtools`, `plugin_premium-web_context7`, `plugin_premium-web_playwright`,
  `plugin_premium-web_sequential-thinking`, and four connectors named by id: `1a59c906-04da-521d-bda7-7f71b9f9e01c`
  (Claude Docs), `326cc715-78b6-42f0-9663-b41db75ef882` (Vercel), `d225a347-61d5-43c3-8c0a-876319bd80ca`
  (Supabase), `6f616b42-0ed8-571e-823f-ee4aca6b7ce9`.
Print these and the common list first.

## Steps

### B1.1 `scripts/harness/tool_use_counts.py`
Stdlib only, read-only; it prints only names, 8-character session prefixes and numbers, never message text.
`python scripts/harness/tool_use_counts.py [--root DIR] [--project SUBSTR] [--days N]` (defaults
`C:/Users/micah/.claude/projects`, `micahjonesconsulting`, 30).
- Files: `<root>/<dir>/*.jsonl` and `<root>/<dir>/*/subagents/*.jsonl` for every `<dir>` whose name contains the
  project substring. Lines older than N days (by `timestamp`) are skipped; lines without one are kept.
- Tool uses are de-duplicated by their `id`.
- MCP server: for a tool named `mcp__<server>__<tool>`, the part between the first `mcp__` and the next `__`.
- Skill: the `Skill` tool's `input.skill` (else `input.name`).
- Subagent type: `Agent`/`Task` `input.subagent_type`, else `unset`.
- Longest execution run per main session whose model contains `opus` or `fable`: the same EXEC set and resets as
  run C's tier-burn hook (a human message or a delegation ends a run).
- Images per session: `image` blocks inside `tool_result` content.
Output, tab-separated, exactly these five headers in this order, rows sorted by count descending then name:
```
# MCP SERVERS (calls, <N>d, project=<SUBSTR>)
# SKILLS (calls)
# SUBAGENT TYPES (calls)
# LONGEST EXEC RUNS (top 10 sessions on opus or fable)
# IMAGES (top 10 sessions)
```
Each header is followed by a column line (`server	calls`, `skill	calls`, `subagent_type	calls`,
`session	model	longest_run`, `session	image_blocks`) and its rows.

### B1.2 Tests
`scripts/harness/tests/test_b1_counts.py` (offline). The test builds a synthetic root with `_fixtures.py`:
project dir `C--Users-micah-Code-micahjonesconsulting` holding one session with 3 `mcp__github__search` calls,
1 `mcp__supabase__list_tables`, 2 `Skill` calls (`superpowers:brainstorming`), 1 `Agent` (`general-purpose`), an
Opus run of 5 `Bash` calls, then a human message, then 3 `Edit` calls, and 2 image blocks in tool results; a
subagent file under `<session>/subagents/agent-1.jsonl` with 1 `mcp__context7__query`; and a second project dir
`C--Users-micah-other` with 4 `mcp__github__search` calls, which must NOT count. Five checks, one per section:
github 3, supabase 1, context7 1; `superpowers:brainstorming` 2; `general-purpose` 1; longest run 5; images 2.
Last line `PASS B1 5/5`.
`scripts/harness/tests/live_b1_counts.py`: `--days 7` on the real root exits 0, prints all five headers, and the MCP
SERVERS section has at least one row with a count above 0. Last line `PASS B1-live 5 sections`.

### C1.1 Record the counts
Run `python scripts/harness/tool_use_counts.py --days 30` and save its output as `.planning/harness/c1-counts.tsv`
(Write tool, the output verbatim).

### C1.2 Measure the prefix BEFORE any settings change
In the worktree root, run twice and keep the second:
`claude -p "Reply with the single word OK." --output-format json --max-turns 1`
(this runs on GLM, because your session's environment points Claude Code at z.ai). The prefix is
`usage.input_tokens + usage.cache_creation_input_tokens + usage.cache_read_input_tokens`. Keep the number for C1.4.

### C1.3 Apply the diet to `.claude/settings.json`
- `enabledPlugins`: add the key; set `false` for `superpowers@superpowers-marketplace` when the counts show zero
  `superpowers:` skills and zero `superpowers:` subagent types, and for `voltagent-meta@voltagent-subagents` when
  they show zero `voltagent-meta:` subagent types. Never set a `@premium-web` plugin to false (its hooks and the
  /premium audit agents are gates).
- `permissions.deny`: add the key; add `"mcp__<server>"` for each of these with zero calls in `c1-counts.tsv`:
  `github`, `desktop-commander`, `claude-context`, `context7`, `sequential-thinking`, `supabase`,
  `chrome-devtools`, `mcp-registry`, `scheduled-tasks`, `1a59c906-04da-521d-bda7-7f71b9f9e01c`,
  `326cc715-78b6-42f0-9663-b41db75ef882`, `d225a347-61d5-43c3-8c0a-876319bd80ca`,
  `6f616b42-0ed8-571e-823f-ee4aca6b7ce9`. Never deny `ccd_*`, `Claude_Browser`, `visualize`, `terminal`,
  `claude-in-chrome`, `computer-use`, or any `plugin_premium-web_*` server, whatever the counts say.
- Change nothing else: `env`, `hooks` and the 22 `permissions.allow` entries stay as they are.

### C1.4 Measure AFTER, and record
Run the C1.2 command twice again and keep the second. Write `.planning/harness/c1-measure.json`:
`{"measured_on": "glm-5.3 via z.ai (claude.ai connectors do not load on this login, so their share is not in these numbers)", "before_prefix": N, "after_prefix": M, "delta": N-M, "disabled_plugins": [...], "denied_servers": [...]}`.

### C1.5 Tests
`scripts/harness/tests/test_c1_settings.py` (offline), four checks: settings.json parses and still has 22
`permissions.allow` entries and its hook entries; no `@premium-web` plugin is false; every `mcp__X` deny entry's
server X is on the C1.3 candidate list and shows 0 in `c1-counts.tsv` (a server absent from the file counts as 0);
no deny entry names a keep-list server. Last line `PASS C1 4/4`.
`scripts/harness/tests/live_c1_measure.py`: runs the C1.2 command once more and passes when its prefix is below
`before_prefix` in `c1-measure.json`. Last line `PASS C1-live prefix <before> -> <now>`.

## Verification
Run in order; copy each actual last line into the digest.
```
python scripts/harness/tests/test_b1_counts.py
```
Expected last line: `PASS B1 5/5`
```
python scripts/harness/tests/live_b1_counts.py
```
Expected last line: `PASS B1-live 5 sections`
```
python -c "import json;m=json.load(open('.planning/harness/c1-measure.json'));print(m['before_prefix']>m['after_prefix'], m['delta'])"
```
Expected: `True` followed by a positive number. If the prefix did not shrink, stop and report the two numbers: the
main session rules on whether deny rules take tools out of the context in this build.
```
python scripts/harness/tests/test_c1_settings.py
```
Expected last line: `PASS C1 4/4`
```
python scripts/harness/tests/live_c1_measure.py
```
Expected last line: `PASS C1-live prefix ` followed by the two numbers.
```
python scripts/harness/tests/run_all.py
```
Expected: every line `PASS`, then `ALL PASS (<n> files)` where n is the number of `scripts/harness/tests/test_*.py`
files present.
```
python scripts/harness/diff_scope.py .claude/briefs/harness-v2-f-counts-diet.md
```
Expected: a line starting `PASS diff scope:`.

## Rejected
- A project `.mcp.json` to switch servers off: a project `.mcp.json` only adds servers (premise check P2).
- Pruning `~/.claude/skills`: the biggest part of the skills list, and a global edit: a proposal for the operator.
- A second token aggregator: MJCONSULT 13's `usage_audit.py` already covers tokens, with an allow-list assertion
  that it writes no text.
- Denying a server that was called even once in 30 days: the counts decide, and the operator switches one back on
  by deleting its line.

## Digest
`.planning/harness/digests/run-f.json`; run `"f"`; tests `B1`, `B1-live`, `C1-measure`, `C1`, `C1-live`,
`run_all`, `diff_scope`; list the disabled plugins and denied servers as items.

## Return conditions
The common list, plus: stop if the prefix did not shrink (see Verification), or if a premium-web gate stops loading
(`python .claude/hooks/routing-reminder.py` must still print the routing).

## Parked operator decisions
- Pruning `~/.claude/skills` (global): a proposal.
- The connector share of the diet is measured in his next Claude session (`get_usage`, the "MCP tools" category,
  16,390 tokens before).
