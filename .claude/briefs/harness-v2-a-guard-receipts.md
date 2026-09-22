# Harness v2, run A: E1 executor guard + E2 dispatch log and receipts

Brief-Format: v2
Executor: GLM 5.3 through `scripts/claude-glm.ps1 -Batch`. The guard you build is not live during this run (hooks
load at session start). Read `.claude/briefs/harness-v2-00-common.md` first: its rules bind this run.

## Ruling
Every later run executes under the guard this run builds and leaves the trail this run builds. E1 is a PreToolUse
hook that acts ONLY in sessions the GLM launcher marks as executors. It denies: writes outside the worktree, writes
to the books and the constitution, `.claude/**` writes outside harness scope, reads of secret files, git writes, key
printing, Fable spend, subagents, MCP tools and network tools. E2 makes the launcher record every run in a dispatch
log and write a receipt when the run ends. Reason: `Write(path)` permission rules do not bind in this Claude Code
build (bead 2169), and nothing in settings confines a run started with --dangerously-skip-permissions. A PreToolUse
deny does, and it holds under that flag.

## Files
This run may create or modify only these:
- `.claude/hooks/executor-guard.py` (new)
- `.claude/settings.json` (append one PreToolUse entry; change nothing else)
- `scripts/claude-glm.ps1` (modify with the Edit tool only; never rewrite it whole)
- `scripts/harness/tests/run_all.py` (new)
- `scripts/harness/tests/test_e1_executor_guard.py` (new)
- `scripts/harness/tests/test_e2_launcher.py` (new)
- `scripts/harness/tests/live_e2_smoke.py` (new)
- `.env.probe.local` (new fixture for the main session's live probe; gitignored by `.env*.local`; content exactly
  the line `CANARY=not-a-secret` and a newline)
- `.planning/harness/digests/run-a.json` (new)

## Pre-flight
Main session, 2026-09-22 10:45 PDT (actual values), plus the common list:
- `git rev-parse --abbrev-ref HEAD` -> `harness/v2`
- `python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print([h['matcher'] for h in d['hooks']['PreToolUse']])"` -> `['Write|Edit|MultiEdit|NotebookEdit']`
- `test -e .claude/hooks/executor-guard.py; echo $?` -> `1`
- `test -e scripts/harness; echo $?` -> `1`

## Steps

### E1.1 The hook: `.claude/hooks/executor-guard.py`
Python 3 stdlib only, ASCII only. Module docstring (4-8 lines): what it does, that it is inert unless
`HARNESS_ROLE=executor`, and that it comes from this brief.

Environment it reads:
- `HARNESS_ROLE`: the guard acts only when this equals `executor`.
- `HARNESS_WORKTREE`: absolute path of the worktree the executor may write.
- `HARNESS_EXECUTOR_SCOPE`: `default` (when unset), `harness` or `readonly`.
- `HARNESS_STATE_DIR`: when unset, `<LOCALAPPDATA or tempfile.gettempdir()>/harness/micahjonesconsulting`.

Behaviour:
- Role is not `executor`: read and discard stdin, print nothing, exit 0. Any exception on this path: exit 0 silently.
- Role is `executor`: parse the stdin JSON (fields used: `session_id`, `cwd`, `tool_name`, `tool_input`) and decide.
  Any exception (bad JSON, missing `HARNESS_WORKTREE`, anything) is a deny with rule `internal-error` (fail closed).
- Allow: print nothing, exit 0.
- Deny: print exactly one line of JSON and exit 0:
  `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "executor-guard: <rule>: <target>. <hint>"}}`
  then append the log line (E1.6). A logging failure never changes the decision.

### E1.2 Paths
- `to_win(p)`: `/c/Users/x` (Git Bash style) becomes `C:/Users/x`; `/c` alone becomes `C:/`.
- `norm(p, base)`: apply `to_win`; if still not absolute, join it to `base`; return
  `os.path.normcase(os.path.abspath(p))`. `base` is the payload `cwd`, else `HARNESS_WORKTREE`.
- `inside(p, root)`: true when `p` equals `norm(root)` or starts with `norm(root)` plus `os.sep`.
- `rel`: `os.path.relpath(p, norm(worktree))` with backslashes turned to `/`, lowercased.
- `<target>` in messages: the normalized path with `/` separators; for shell tools, the first 120 characters of the
  command with tokens redacted (E1.6).

### E1.3 Tool classes
- Write tools: `Write`, `Edit`, `MultiEdit`, `NotebookEdit`. Path = `tool_input.file_path` or `notebook_path`.
- Read tools: `Read`, `NotebookRead`, `Grep`, `Glob`, `LS`. Path = `file_path`, `notebook_path` or `path`; for
  `Grep`/`Glob`/`LS` with no path, the base dir. Pattern text = `Glob.pattern` and `Grep.glob`.
- Shell tools: `Bash`, `PowerShell`. Command = `tool_input.command`.
- `Agent` and `Task`: deny `no-subagents`. Any name starting `mcp__`: deny `no-mcp`. `WebFetch`, `WebSearch`: deny
  `no-network`. Every other tool: allow.

### E1.4 Predicates (all case-insensitive)
- `secret_name(basename)`: true for `.env` and `.env.<anything>` EXCEPT `.env.example`, `.env.sample`,
  `.env.template`; names ending `.pem`, `.p12`, `.pfx`, `.key`; names matching `^\.[a-z0-9]+-key$` (e.g.
  `.zai-key`); names starting `id_rsa`, `id_ed25519`, `id_ecdsa`; exactly `.credentials.json`, `credentials.json`,
  `.netrc`, `.npmrc`, `.pypirc`.
- `SECRET_TEXT`, any of these regexes matching a command or a pattern string:
  - `(?:^|[\s'"=/\\:(])\.env(?:\.(?!example\b|sample\b|template\b)[A-Za-z0-9_-]+)*(?=$|[\s'";|&)>*])`
  - `\.[A-Za-z0-9]+-key\b`
  - `\bid_(?:rsa|ed25519|ecdsa)\b`
  - `\.credentials\.json\b`
  - `\.(?:pem|p12|pfx)\b`
- `SECRET_ENV`, any of:
  - `\$\{?[A-Za-z_]*(?:KEY|TOKEN|SECRET|PASSWORD)[A-Za-z0-9_]*\}?`
  - `\$env:[A-Za-z_]*(?:KEY|TOKEN|SECRET|PASSWORD)`
  - `%[A-Za-z_]*(?:KEY|TOKEN|SECRET|PASSWORD)[A-Za-z_]*%`
  - `^\s*(?:env|printenv|set)\s*(?:$|\|)`
  - `(?:Get-ChildItem|gci|dir|ls)\s+env:`
  - `GetEnvironmentVariable`
- `GIT_WRITE`:
  `\bgit(?:\s+-C\s+(?:"[^"]*"|'[^']*'|\S+))*(?:\s+-c\s+\S+)*\s+(?:commit|push|pull|fetch|stash|reset|clean|checkout|switch|restore|rebase|merge|cherry-pick|revert|am|apply|tag|branch|worktree|config|add|rm|mv|gc|prune|update-ref|filter-branch|notes|submodule|remote)\b`
- `WRITE_ISH`:
  `(?<![0-9&>=-])>>?(?![&=])|\btee\b|\bsed\s+-i|\bset-content\b|\badd-content\b|\bout-file\b|\bcopy-item\b|\bmove-item\b|\bremove-item\b|\bnew-item\b|\brename-item\b|\brm\b|\bmv\b|\bcp\b|\bdel\b|\berase\b|\bwritealltext\b|\bappendalltext\b|\bwritealllines\b|\btruncate\b`
- `PROTECTED_NAMES`: `resume.md`, `memory.md`, `lessons_learned.md`, `agents.md`, `claude.md`,
  `settings.local.json`.
- `protected(rel, scope)`: basename is `resume.md`, `memory.md`, `lessons_learned.md`, `agents.md` or
  `settings.local.json`; or basename is `claude.md` unless scope is `harness` and rel is exactly
  `.claude/claude.md`.
- `harness_allowed(rel)`: rel starts with `.claude/hooks/`, or rel is one of `.claude/settings.json`,
  `.claude/ai_routing.md`, `.claude/claude.md`, `.claude/briefs/readme.md`.

### E1.5 Decision order (first match wins)
Write tools:
1. scope `readonly` -> `readonly-scope`
2. not inside the worktree -> `outside-worktree`
3. rel is `.git` or starts with `.git/` -> `dot-git`
4. `secret_name(basename)` -> `secret-file`
5. `protected(rel, scope)` -> `protected-file`
6. rel starts with `.claude/`: allow when scope is `harness` and `harness_allowed(rel)`, else `claude-dir`
7. allow

Read tools:
1. `secret_name(basename of the path)`, or `SECRET_TEXT` matches the pattern text -> `secret-file`
2. the path is not inside the worktree, the state dir or `tempfile.gettempdir()` -> `read-outside`
3. allow

Shell tools:
1. scope `readonly` -> `readonly-scope`
2. `GIT_WRITE` -> `git-write`
3. `SECRET_TEXT` -> `secret-file`
4. `SECRET_ENV` -> `secret-env`
5. the lowercased command contains `fable-gate.ps1` and not `-dryrun` -> `fable-spend`
6. the lowercased command contains a `PROTECTED_NAMES` entry and `WRITE_ISH` matches -> `protected-file`
7. scope is not `harness`, the command contains `.claude/` or `.claude\`, and `WRITE_ISH` matches -> `claude-dir`
8. allow

Hints (the text after `<target>. `), exactly:
- `outside-worktree`: `Executors write only inside HARNESS_WORKTREE.`
- `dot-git`: `Never write inside .git.`
- `secret-file`: `Secret files never enter an executor's context.`
- `protected-file`: `The main session keeps the books and the constitution; report instead.`
- `claude-dir`: `Files under .claude/ need harness scope and the harness allow-list.`
- `read-outside`: `Executors read only inside the worktree, the state dir and the temp dir.`
- `git-write`: `Git is read-only for executors; the main session commits.`
- `secret-env`: `Never print environment variables that hold keys.`
- `fable-spend`: `Executors never spend Fable; use -DryRun.`
- `no-subagents`: `No subagents in executor runs.`
- `no-mcp`: `No MCP tools in executor runs.`
- `no-network`: `No network tools in executor runs; the brief carries the facts.`
- `readonly-scope`: `Readonly scope: Read, Grep and Glob only.`
- `internal-error`: `The guard failed closed.`

### E1.6 The deny log
Append one JSON line per deny to `<HARNESS_STATE_DIR>/guard.log` (create the directory if needed):
`{"utc": "<ISO 8601, Z>", "session_id": "...", "tool": "...", "rule": "...", "target": "..."}`. Before logging or
printing a shell target, redact with `re.sub(r'(sk-|gho_|ghp_|re_)[A-Za-z0-9_\-]{8,}', r'\1<redacted>', s)`.

### E1.7 Wire it: `.claude/settings.json`
Append this object to `hooks.PreToolUse` (after the existing entry) and change nothing else:
```
{"matcher": "*", "hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] || exit 0; python \"${CLAUDE_PROJECT_DIR}/.claude/hooks/executor-guard.py\"", "timeout": 10, "statusMessage": "executor guard (Harness v2 E1)"}]}
```
The shell pre-check keeps Python off every non-executor tool call. If the script is missing, `python` exits 2,
which blocks the call: fail closed for executors.

### E1.8 The test: `scripts/harness/tests/test_e1_executor_guard.py`
Runs the hook as a subprocess per case (`[sys.executable, <repo>/.claude/hooks/executor-guard.py]`, stdin = payload
JSON, `encoding="utf-8"`, timeout 20 s). The environment is a copy of `os.environ` with every `HARNESS_*` removed,
then the case's values set, and `HARNESS_STATE_DIR` set to a fresh temp dir shared by all cases.
- `WT` = a fresh `tempfile.mkdtemp()` (the fake worktree).
- `OUT` = `os.path.join(os.path.expanduser("~"), "harness-guard-test-outside")`. Never created; used only in
  payloads. It sits outside the temp dir on purpose.
- Every payload: `{"session_id": "test-e1", "transcript_path": "", "cwd": WT, "hook_event_name": "PreToolUse",
  "tool_name": ..., "tool_input": {...}}`.
- Decision: empty stdout -> `allow`; otherwise parse it and read `permissionDecision`. Each deny must have a reason
  starting `executor-guard: <rule>:`.
- Role column: `exec` means `HARNESS_ROLE=executor` with `HARNESS_WORKTREE=WT`; `none` means no `HARNESS_*` vars.

| # | role / scope | tool | input | expect |
|---|---|---|---|---|
| 1 | none | Write | `WT/.claude/RESUME.md` | allow |
| 2 | exec / default | Write | `WT/app/page.tsx` | allow |
| 3 | exec / default | Write | `OUT/x.txt` | deny outside-worktree |
| 4 | exec / default | Write | relative `../escape.txt` | deny outside-worktree |
| 5 | exec / default | Write | relative `src/b.ts` | allow |
| 6 | exec / default | Write | `OUT/y.txt` in Git Bash form (`/c/Users/...`) | deny outside-worktree |
| 7 | exec / default | Write | `WT/.claude/RESUME.md` | deny protected-file |
| 8 | exec / default | Edit | `WT/docs/LESSONS_LEARNED.md` | deny protected-file |
| 9 | exec / default | Write | `WT/CLAUDE.md` | deny protected-file |
| 10 | exec / default | Edit | `WT/.claude/hooks/x.py` | deny claude-dir |
| 11 | exec / harness | Edit | `WT/.claude/hooks/x.py` | allow |
| 12 | exec / harness | Edit | `WT/.claude/settings.json` | allow |
| 13 | exec / harness | Write | `WT/.claude/settings.local.json` | deny protected-file |
| 14 | exec / harness | Write | `WT/.claude/briefs/harness-v2-a-guard-receipts.md` | deny claude-dir |
| 15 | exec / harness | Edit | `WT/.claude/briefs/README.md` | allow |
| 16 | exec / default | Write | `WT/.git/config` | deny dot-git |
| 17 | exec / default | Read | `WT/.env.local` | deny secret-file |
| 18 | exec / default | Read | `WT/.env.example` | allow |
| 19 | exec / default | Read | `~/.claude/.zai-key` | deny secret-file |
| 20 | exec / default | Read | `OUT/notes.md` | deny read-outside |
| 21 | exec / default | Grep | `{"pattern": "x", "path": WT, "glob": "**/.env*"}` | deny secret-file |
| 22 | exec / default | Bash | `git commit -m x` | deny git-write |
| 23 | exec / default | Bash | `git -C . status --short` | allow |
| 24 | exec / default | Bash | `cat .env.local` | deny secret-file |
| 25 | exec / default | Bash | `echo $ZAI_CODING_KEY` | deny secret-env |
| 26 | exec / default | Bash | `echo done > .claude/RESUME.md` | deny protected-file |
| 27 | exec / default | PowerShell | `powershell -File scripts/fable-gate.ps1 -Digest d.json -Question q.md -Out o.md` | deny fable-spend |
| 28 | exec / default | PowerShell | the same command with ` -DryRun` appended | allow |
| 29 | exec / default | Agent | `{"description": "x", "prompt": "y", "model": "sonnet"}` | deny no-subagents |
| 30 | exec / default | mcp__supabase__execute_sql | `{"query": "select 1"}` | deny no-mcp |
| 31 | exec / default | WebFetch | `{"url": "https://example.com", "prompt": "x"}` | deny no-network |
| 32 | exec / readonly | Write | `WT/a.txt` | deny readonly-scope |
| 33 | exec / readonly | Bash | `ls` | deny readonly-scope |
| 34 | exec / readonly | Read | `WT/app/page.tsx` | allow |
| 35 | exec / default | (stdin is the text `not json`) | | deny internal-error |
| 36 | none | (stdin is the text `not json`) | | allow |
| 37 | | after cases 1-36: lines in `guard.log` | | equals the number of deny cases above (21) |

On each failure print `FAIL E1 case <n>: expected <expect> got <decision> [<reason>]`. The last line is
`PASS E1 37/37` when all pass, else `FAIL E1 <k> of 37 failed`. Exit 0 only on PASS.

### E2.1 Launcher parameters: `scripts/claude-glm.ps1`
Add to the `param()` block:
- `[ValidateSet('default','harness','readonly')][string]$Scope = 'default'`
- `[int]$MaxTurns = 400`
- `[int]$TimeoutMin = 120`

### E2.2 Refuse long prompts before anything else
Immediately after `param()`, before key resolution: when `-Batch` is set, require `-PromptFile` to exist (keep the
existing message), read it (`Get-Content -Raw -Encoding UTF8`), and when it is longer than 30000 characters, run
`Write-Output "claude-glm: prompt is <N> characters (limit 30000). Put the material in a file and point the executor at it (LESSONS #36)."`
and `exit 2`. Nothing is dispatched and no process starts.

### E2.3 Mark the child as an executor
After the existing env block, set: `$env:HARNESS_ROLE = 'executor'`, `$env:HARNESS_WORKTREE = (Resolve-Path
$Dir).Path`, `$env:HARNESS_EXECUTOR_SCOPE = $Scope`. When `$env:HARNESS_STATE_DIR` is empty, set it to
`Join-Path $env:LOCALAPPDATA 'harness\micahjonesconsulting'`. Create `<state>\runs` and `<state>\receipts`.

### E2.4 `function Invoke-Recorded([string]$PromptText, [string]$Mode, [string]$PromptLabel)`
1. `$runId = 'glm-' + [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss') + '-' + ('{0:x4}' -f (Get-Random -Maximum 65536))`
2. Files in `<state>\runs\`: `<runId>.prompt.md` (the prompt, UTF-8 without BOM, through
   `[IO.File]::WriteAllText`), `<runId>.json` (stdout), `<runId>.err` (stderr), `<runId>.out.md` (the result).
3. Append one compact JSON line to `<state>\dispatch.jsonl` (UTF-8 without BOM, `[IO.File]::AppendAllText`), an
   `[ordered]` hashtable with keys in this order: `run_id`, `started_utc` (`yyyy-MM-ddTHH:mm:ssZ`), `dir`,
   `prompt_file` (`$PromptLabel`), `scope`, `model`, `mode`, `launcher_pid` (`$PID`).
4. Arguments: mode `smoke` -> `-p --output-format json --max-turns 1`. Mode `batch` with scope `readonly` ->
   `-p --allowedTools Read,Grep,Glob --output-format json --max-turns <MaxTurns>`. Mode `batch` otherwise ->
   `-p --dangerously-skip-permissions --output-format json --max-turns <MaxTurns>`.
5. Start: `$exe = (Get-Command claude -CommandType Application | Select-Object -First 1).Source`, then
   `Start-Process -FilePath $exe -ArgumentList <args> -WorkingDirectory $Dir -RedirectStandardInput <prompt copy>
   -RedirectStandardOutput <json> -RedirectStandardError <err> -NoNewWindow -PassThru`, then `$null = $p.Handle`.
6. `WaitForExit($TimeoutMin * 60000)`. On timeout: `taskkill /T /F /PID <id>`, `timed_out = true`, exit code 124.
   Otherwise `WaitForExit()` once more and take `ExitCode`.
7. Parse the stdout JSON (`ConvertFrom-Json`); on failure the result text is the raw stdout. Write the `result` text
   to `<runId>.out.md`.
8. 429: when the stderr text or the result matches `rate_limit_error|\[1308\]|\[1310\]`, set `glm_429 = true`. If
   `Join-Path $PSScriptRoot 'harness\status.py'` exists, run `python <it> glm-429 --file <json>`; if that exits 3, run
   it again with `--file <err>`. (status.py arrives in run B; until then only the flag is recorded.)
9. `guard_denies`: the number of lines in `<state>\guard.log` containing the run's `session_id` (0 when either is
   missing).
10. Receipt `<state>\receipts\<runId>.json`, `[ordered]`, `ConvertTo-Json -Depth 6`, UTF-8 without BOM, with keys:
    `run_id`, `started_utc`, `ended_utc`, `exit_code`, `timed_out`, `is_error` (true when there is no parsed
    result), `subtype`, `num_turns`, `duration_ms`, `session_id`, `usage`, `total_cost_usd`, `glm_429`,
    `guard_denies`, `prompt_copy`, `out_file`, `err_file`.
11. `Write-Output` the result text, then `Write-Output "RECEIPT: <receipt path>"`. Return the exit code.

### E2.5 Wire the modes
- `-Smoke`: `exit (Invoke-Recorded 'Reply with the single word OK.' 'smoke' 'smoke')`.
- `-Batch`: `exit (Invoke-Recorded $text 'batch' $PromptFile)` (the text read in E2.2). Remove the old stdin pipe.
- Interactive modes stay. Replace the `-Brief` prompt string with exactly:
  `You are the EXECUTOR. Read $Brief and execute it verbatim: every step, every verification command with its expected output. Do not commit, push, stash or change branches, and do not write .claude/RESUME.md, MEMORY.md, docs/LESSONS_LEARNED.md, CLAUDE.md or AGENTS.md: the main session commits and keeps the books. Never deploy, never bypass a hook, never change a price, fact, link or live string. Stop and report on any return condition in the brief, and end with the digest the brief names.`
- In the header comment's usage lines, add (ASCII):
  `#   ... -File scripts/claude-glm.ps1 -Batch -PromptFile <pointer.md> -Dir <worktree> [-Scope default|harness|readonly]`
  `#   Every -Smoke/-Batch run appends to <state>\dispatch.jsonl and writes <state>\receipts\<run_id>.json (Harness v2 E2).`

### E2.6 Tests
`scripts/harness/tests/test_e2_launcher.py` (offline; each launcher call gets `HARNESS_STATE_DIR` = a fresh temp
dir and runs `powershell -NoProfile -ExecutionPolicy Bypass -File <repo>/scripts/claude-glm.ps1 ...`):
1. A prompt file of 30001 `a` characters with `-Batch -PromptFile <it> -Dir <repo>`: exit code 2; output contains
   `limit 30000` and `LESSONS #36`; `<state>/dispatch.jsonl` does not exist.
2. A short prompt file with `-Batch -PromptFile <it> -Dir <repo> -Scope bogus`: exit code not 0; output contains
   `Scope`; `<state>/dispatch.jsonl` does not exist.
3. The script text contains each of: `--output-format`, `HARNESS_ROLE`, `HARNESS_EXECUTOR_SCOPE`,
   `dispatch.jsonl`, `receipts`, `RECEIPT:`, `30000`.
Last line `PASS E2-offline 3/3`, else `FAIL E2-offline <k> of 3 failed` and the reasons above it.

`scripts/harness/tests/live_e2_smoke.py` (live: one tiny GLM call): run the launcher with `-Smoke -Dir <repo>`,
`HARNESS_STATE_DIR` = a fresh temp dir, timeout 300 s. Pass when all hold: exit code 0; a stdout line starts
`RECEIPT: `; `dispatch.jsonl` has exactly 1 line and its `mode` is `smoke`; `receipts/` holds exactly one `.json`;
that receipt has `is_error` false and `num_turns` of at least 1; its `out_file` text contains `OK`. Last line
`PASS E2-live smoke receipt <run_id>`.

`scripts/harness/tests/run_all.py`: find `scripts/harness/tests/test_*.py` (sorted), plus `live_*.py` when `--live`
is given. Run each as `python <file>` from the repo root with `PYTHONIOENCODING=utf-8`, timeout 600 s. Print each
file's last non-empty stdout line; when its exit code is not 0 and that line does not start with `FAIL`, print
`FAIL <file>: exit <code>: <line>` instead. End with `ALL PASS (<n> files)` and exit 0, or `FAILURES: <k> of <n>`
and exit 1.

### E2.7 The probe fixture
Create `.env.probe.local` containing the line `CANARY=not-a-secret` and a newline. The main session's live guard
probe uses it after this run.

## Verification
Run in order; copy each actual last line into the digest.
```
python -c "import json;json.load(open('.claude/settings.json',encoding='utf-8'));print('settings ok')"
```
Expected: `settings ok`
```
python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print([h['matcher'] for h in d['hooks']['PreToolUse']])"
```
Expected: `['Write|Edit|MultiEdit|NotebookEdit', '*']`
```
python scripts/harness/tests/test_e1_executor_guard.py
```
Expected last line: `PASS E1 37/37`
```
python scripts/harness/tests/test_e2_launcher.py
```
Expected last line: `PASS E2-offline 3/3`
```
python scripts/harness/tests/live_e2_smoke.py
```
Expected last line: `PASS E2-live smoke receipt glm-` then 15 digits and dashes, then 4 hex characters.
```
python scripts/harness/tests/run_all.py
```
Expected: `PASS E1 37/37`, `PASS E2-offline 3/3`, `ALL PASS (2 files)`, exit 0.
```
git status --short
```
Expected, exactly these lines (any order); `.env.probe.local` does not appear because it is ignored:
```
 M .claude/settings.json
 M scripts/claude-glm.ps1
?? .claude/hooks/executor-guard.py
?? .planning/harness/digests/
?? scripts/harness/
```

## Rejected
- `Write(path)` permission rules as the boundary: they do not bind in this build (bead 2169).
- A shell-command allow-list for executors: too brittle. The guard denies the dangerous classes, and the main
  session checks every diff against the brief's `## Files` list.
- Denying reads in the temp dir: tests and receipts live there.
- A JSON-only hook config with no shell pre-check: every tool call in every session would start Python.

## Digest
`.planning/harness/digests/run-a.json`, shaped as in the common brief, run `"a"`, tests `E1`, `E2-offline`,
`E2-live`, `run_all`.

## Return conditions
The common list, plus: if `live_e2_smoke.py` fails on a z.ai refusal, stop and copy the error body.

## Parked operator decisions
None for this run.
