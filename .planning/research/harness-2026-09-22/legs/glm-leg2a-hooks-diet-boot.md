# GLM leg 2a: hooks, the context diet, and subagent boot size (harness research 2026-09-22)

You are an executor. Write only the outputs named below. Do not commit, push, or edit any other file. Work in
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`.

## Hard privacy rule
- Never open a `.jsonl` transcript. Only your scripts read them, and they print labels and counts only (leg 1's rules,
  `legs/glm-leg1-usage-audit.md`).
- Never open a key or credentials file (`*-key`, `.zai-key`, `.deepseek-key`, `.credentials.json`, `.env*`).
- Never open `C:/Users/micah/.claude.json` or any `settings*.json` with Read, cat or type. Step 1's script reads them
  and prints only allow-listed fields. Never print a permission entry, an env value outside the allow-list, a URL
  query string or a header.

## Step 1: `scripts/settings_extract.py` (Python stdlib)
For each file that exists: `C:/Users/micah/.claude/settings.json`, `C:/Users/micah/.claude/settings.local.json`,
`<worktree>/.claude/settings.json`, `<worktree>/.claude/settings.local.json`,
`C:/Users/micah/Code/micahjonesconsulting/.claude/settings.json`,
`C:/Users/micah/Code/micahjonesconsulting/.claude/settings.local.json`. Print:
- every hook: event, matcher, command, timeout;
- env variable NAMES, with values only for names that start with CLAUDE_CODE_ or ANTHROPIC_DEFAULT_ or equal
  ANTHROPIC_MODEL (print "<set>" for the rest);
- enabledPlugins (name: boolean); statusLine (type, command); model;
- the COUNT of permissions.allow / ask / deny entries, and the COUNT of entries matching
  `(gho_|ghp_|github_pat_|sk-[A-Za-z0-9]|sk_[A-Za-z0-9]|re_[A-Za-z0-9]{8}|AKIA[0-9A-Z]{12}|xox[bp]-)`. Never an entry.
From `C:/Users/micah/.claude.json` print only the NAMES and types (stdio/http/sse) of the mcpServers at user level and
under project keys that contain `micahjonesconsulting`. Never args, env, headers or URLs.

## Step 2: `scripts/usage_names.py` (Python stdlib; the script alone reads transcripts)
Over ALL transcripts in the `C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting*` dirs, subagent
files included: count tool_use calls by MCP server (the `<server>` in `mcp__<server>__<tool>`), Skill calls by the
`skill` input field, and Agent/Task calls by `subagent_type` and `model`. Print the counts sorted, and the date range.

## Step 3: inventory
For each plugin that Step 1 shows enabled, find it under `C:/Users/micah/.claude/plugins/`. Count its skills (SKILL.md
files), agents, MCP servers and hooks, and total the bytes of its skills' frontmatter `name` + `description` (the
always-loaded skills listing carries exactly that). Do the same for `C:/Users/micah/.claude/skills/`. Calibrate against
the app's measurement of this chat: Skills 9,752 tokens, MCP tools 16,390 tokens, System tools 30,645 tokens.

## Step 4: P2, what a repo file can switch off
WebFetch https://code.claude.com/docs/en/settings , https://code.claude.com/docs/en/plugins-reference (or
https://code.claude.com/docs/en/plugins) and https://code.claude.com/docs/en/mcp . Quote, with the URL, the exact
sentences on: (a) how `enabledPlugins` in project settings combines with user settings; (b) what a project `.mcp.json`
can and cannot disable; (c) any setting that hides skills or MCP servers for one project. If a page will not load, say
so; do not guess.
Then MEASURE on your own endpoint (your environment already points at z.ai). From the worktree, run
`claude -p "Reply with the single word OK." --output-format json --max-turns 1` twice: (a) as it is; (b) with
`--settings <a file in %TEMP%>` whose JSON sets `enabledPlugins` to false for every plugin that Step 2 shows no call to
in this repo. Report ctx = input + cache_read + cache_write of each first call, the delta, and the delta in %. These
are GLM-tokenizer counts from a CLI session, and the desktop app adds its own servers. Say so.

## Step 5: P8, subagent boot size
The main session measured a do-nothing general-purpose subagent in the desktop app at 78,250 tokens, all cache-write
with a 5-minute TTL; continued 45 s later, it read 36,669 from cache and re-wrote 41,642 (`smoke/subagent-probe.txt`).
Measure whether a tools-restricted agent boots smaller. In a fresh %TEMP% dir, run on your endpoint
`claude -p "Use the lean agent to reply OK, then reply with its answer." --output-format json --max-turns 3 --agents <json>`
where agent `lean` has description "probe", prompt "Reply with the single word OK.", and tools ["Read"]. Then run the
same with an agent `wide` that has no `tools` field. Read each subagent's first-call ctx from its transcript (under
`C:/Users/micah/.claude/projects/<temp-dir-slug>/`) with a script that prints only numbers. PowerShell 5.1 mangles
embedded double quotes in native arguments: put the --agents JSON in a file and launch claude from a small Python or
Node script that passes an argument list. Report both ctx numbers and their ratio.

## Step 6: P1, hooks that re-invoke the model or inject context
Another chat reports P1 settled: "No Stop hook loads in this repo; the four on disk belong to hookify and ralph, which
aren't enabled." Confirm or refute that from Step 1's output and the enabled plugins' hooks.json, in one line with
file:line. Then, for every UserPromptSubmit and SessionStart hook that does load, state what it injects into context,
how many bytes per firing, and when it fires.

## Outputs (only these)
`.planning/research/harness-2026-09-22/scripts/settings_extract.py`,
`.planning/research/harness-2026-09-22/scripts/usage_names.py`,
`.planning/research/harness-2026-09-22/01a-hooks-diet-boot.md` (at most 10 KB): the Step 1 hook table; the Step 2
counts; the Step 3 inventory, naming the plugins with no call in this repo; the P2 quotes and measurement; the P8
measurement; the P1 verdicts.

## Finish
Print at most 30 lines: the verdicts for P1, P2 and P8 with their numbers. Do not paste file contents or transcript
content into your reply.
