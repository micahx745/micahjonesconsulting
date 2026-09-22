# Harness v2, run B: E3 brief and digest lint + E4 routing card v3 + B2 budget governor

Brief-Format: v2
Executor: GLM 5.3 through `scripts/claude-glm.ps1 -Batch -Scope harness` (the executor guard from run A is live:
harness scope opens `.claude/hooks/`, `.claude/settings.json`, `.claude/AI_ROUTING.md`, `.claude/CLAUDE.md` and
`.claude/briefs/README.md`, nothing else under `.claude/`). Read `.claude/briefs/harness-v2-00-common.md` first.

## Ruling
E3 makes a brief and a digest checkable by a script, so the main session never re-derives an executor's claims.
E4 puts the post-reset routing into the single source: Opus 5.5 main, Fable at most three gates per arc, GLM the
standing executor under a guard. The words are the main session's, supplied as files you splice in byte for byte,
because executors never write routing prose. B2 gives every session a one-line budget truth: the three Claude bars
that actually exist, the DeepSeek balance and the GLM 429 reset, paced to the real reset time, with a hook that
refuses Claude subagent spawns at 75% weekly. Reason: last week reached 70% by Tuesday because nothing in the
session said so until the operator did.

## Files
This run may create or modify only these:
- `scripts/harness/brief_lint.py` (new)
- `scripts/harness/digest_check.py` (new)
- `scripts/harness/diff_scope.py` (new)
- `scripts/harness/splice_block.py` (new)
- `scripts/harness/status.py` (new)
- `.claude/briefs/README.md` (append one section, E3.4)
- `.claude/AI_ROUTING.md` (spliced by `splice_block.py` only, E4.2)
- `.claude/CLAUDE.md` (spliced by `splice_block.py` only, E4.3)
- `.planning/harness/ROUTING.md` (new, E4.4)
- `.claude/hooks/_transcript.py` (new)
- `.claude/hooks/budget-gate.py` (new)
- `.claude/settings.json` (append two entries, B2.5)
- `scripts/harness/tests/_fixtures.py` (new)
- `scripts/harness/tests/test_e3_lint.py` (new)
- `scripts/harness/tests/test_e4_routing.py` (new)
- `scripts/harness/tests/test_b2_governor.py` (new)
- `scripts/harness/tests/live_b2_balance.py` (new)
- `.planning/harness/digests/run-b.json` (new)
Read-only inputs you must not edit: `.planning/harness/e4/ai-routing-top.md`, `.planning/harness/e4/ai-routing-entry.md`,
`.planning/harness/e4/claude-md-routing.md`.

## Pre-flight
Main session, 2026-09-22 11:05 PDT, on the tree this brief was committed to (actual values):
- `python -c "import hashlib;a=open('.claude/AI_ROUTING.md','rb').read();i=a.find(b'## History (the dated routing rulings');print(i,len(a)-i,hashlib.sha256(a[i:]).hexdigest())"` -> `6133 14737 ae235b9091d2da7e5a129f81729fe4ffe1899dbda028c14ffb10f98e528481b0`
- `python -c "import hashlib;c=open('.claude/CLAUDE.md','rb').read();s=c.find(b'## Model routing (full table');e=c.find(b'**Arc shape (MODEL_ROUTING');print(s,e,hashlib.sha256(c[:s]).hexdigest(),hashlib.sha256(c[e:]).hexdigest())"` -> `6140 7264 811dd038fcedb17dd3871f834674be1e5fc5975413c0640e66d8c3e055d30a3d 0a8477bf9a61558782477e64c030fc47fcb31d19dbee71e605e1b44ab31b2303`
- `test -e scripts/harness/status.py; echo $?` -> `1`
- `python scripts/harness/tests/run_all.py` -> ends `ALL PASS (2 files)`
Print these and the common list first.

## Steps

### E3.1 `scripts/harness/brief_lint.py <brief.md>...`
Stdlib only. For each file:
- No `Brief-Format: v2` in its first 15 lines -> print `SKIP <path> (not Brief-Format: v2)`.
- Otherwise collect the `## ` headings. Required, each matched when the lowercased heading text STARTS with it:
  `ruling`, `files`, `pre-flight`, `steps`, `verification`, `rejected`, `digest`, `return conditions`.
- The Files section has at least one line containing a backticked token.
- The Pre-flight section contains `->` at least once.
- The Verification section has at least one fenced block (a line starting with three backticks) and at least one
  line matching `^\s*(?:[-*]\s*)?Expected\b`.
- Print `PASS <path>` or `FAIL <path>: <reason>; <reason>` (reasons name the missing section or rule, for example
  `missing section: pre-flight`, `verification: no Expected line`).
Exit 1 when any file FAILs, else 0.

### E3.2 `scripts/harness/digest_check.py <digest.json>`
Stdlib only. FAIL reasons: size over 8192 bytes (`size <n> > 8192`); not JSON; not an object; `items` missing or
empty; an item without a non-empty string `claim`; an item whose `evidence` is not a string matching either
`^\$ .+ -> .+` or containing `[A-Za-z0-9_./\\-]+:\d+` (reason `item <k>: evidence needs path:line or "$ cmd -> output"`);
an item whose `confidence` is not `high`, `med` or `low`. Other top-level keys are allowed. Print
`PASS <path> (<n> items, <bytes> bytes)` or `FAIL <path>: <reasons>`; exit 0 or 1.

### E3.3 `scripts/harness/diff_scope.py <brief.md> [--base <rev>]`
Stdlib only; run from the repo root. Allowed entries: every backticked token on a `- ` bullet line inside the brief's
Files section, up to the next `## ` heading. An entry ending in `/` is a directory prefix; `*` works as in
`fnmatch`. Changed paths: `git diff --name-only <base>` (default `HEAD`) plus `git ls-files --others
--exclude-standard`, with `/` separators. Print `PASS diff scope: <n> changed paths, all listed` or
`FAIL diff scope: outside the Files list: <path>, <path>`; exit 0 or 1.

### E3.4 Append to `.claude/briefs/README.md`
Append exactly this section at the end of the file (a blank line before it). Use the Edit tool:
```
## Brief-Format: v2 (Harness v2, operator popups 2026-09-22)

A brief an executor runs carries the line `Brief-Format: v2` in its first 15 lines and these `##` sections:
`Ruling`, `Files`, `Pre-flight`, `Steps`, `Verification`, `Rejected`, `Digest`, `Return conditions`. Site briefs
keep the eight required contents above as well; final copy, layout, motion and parked decisions get their own
sections.
- **Files** lists every path the run may create or modify. After the run,
  `python scripts/harness/diff_scope.py <brief>` fails on any changed path outside the list.
- **Pre-flight** records the actual value of every expected value the main session could run before dispatch, as
  `command -> actual` (LESSONS #52). The executor prints them again first and stops on any difference.
- **Verification** holds commands in fenced blocks, each followed by an `Expected` line.
- **Digest**: the run ends by writing one JSON digest of at most 8 KB whose items each carry a claim, evidence
  (`path:line`, or `$ command -> first line of output`) and a confidence;
  `python scripts/harness/digest_check.py <digest>` passes or fails it. The main session reads the digest and the
  diff, not the executor's transcript.
- `python scripts/harness/brief_lint.py <brief>...` passes or fails a v2 brief and skips older ones.
```

### E3.5 `scripts/harness/tests/test_e3_lint.py`
Fixtures are written to a temp dir by the test itself. Nine checks:
1. A minimal valid v2 brief (all eight sections, a backticked Files bullet, `->` in Pre-flight, a fenced block and
   an `Expected:` line in Verification) -> `PASS`.
2. The same without its Pre-flight section -> `FAIL` whose reason contains `pre-flight`.
3. The same with no `Expected` line in Verification -> `FAIL` whose reason contains `Expected`.
4. A brief without the marker line -> `SKIP`.
5. `brief_lint.py` over every `.claude/briefs/harness-v2-*.md` in the repo -> every line `PASS`, exit 0.
6. A digest with two good items -> `PASS`.
7. A digest padded past 9000 bytes -> `FAIL` whose reason contains `8192`.
8. A digest item with evidence `trust me` -> `FAIL` whose reason contains `evidence`.
9. `diff_scope.py` in a temp git repo (`git init`, commit `a.txt`, a brief whose Files lists `a.txt`): modify
   `a.txt` -> `PASS`; then add `b.txt` -> `FAIL` whose line contains `b.txt`. (Both halves are one check.)
Last line `PASS E3 9/9`, else `FAIL E3 <k> of 9 failed`.

### E4.1 `scripts/harness/splice_block.py`
Stdlib only, bytes in and bytes out (never decode or re-encode):
`python scripts/harness/splice_block.py --file F --start S --end E --replacement R [--append A]`.
Find the first occurrence of the bytes of `S` in F (the file start when `S` is the empty string) and the first
occurrence of `E` after it. Replace the bytes from the start of `S` up to, not including, `E` with the bytes of file
`R`; then, with `--append`, add the bytes of file `A` at the end. Refuse (exit 2, message names the marker) when a
marker is missing or occurs more than once. Write back in place. Print `spliced <F>: <old len> -> <new len> bytes`.

### E4.2 Splice `.claude/AI_ROUTING.md`
```
python scripts/harness/splice_block.py --file .claude/AI_ROUTING.md --start "" --end "## History (the dated routing rulings" --replacement .planning/harness/e4/ai-routing-top.md --append .planning/harness/e4/ai-routing-entry.md
```

### E4.3 Splice `.claude/CLAUDE.md`
```
python scripts/harness/splice_block.py --file .claude/CLAUDE.md --start "## Model routing (full table" --end "**Arc shape (MODEL_ROUTING" --replacement .planning/harness/e4/claude-md-routing.md
```

### E4.4 `.planning/harness/ROUTING.md`
Create it with exactly:
```
# Routing card (pointer)

The routing card from the 2026-09-22 post-reset report lives in `.claude/AI_ROUTING.md`, the single source.
This file exists so the report's path resolves. Do not add routing here.
```

### E4.5 `scripts/harness/tests/test_e4_routing.py`
Six checks:
1. `python .claude/hooks/routing-reminder.py` (env `CLAUDE_PROJECT_DIR` = repo root) prints text containing all of
   `Opus 5.5`, `at most 3 gates per arc`, `GLM 5.3 in a worktree` and `Mechanical loops`.
2. `.claude/AI_ROUTING.md` contains `` `opus` = `claude-opus-5-5` `` and does not contain `(claude-opus-5)`.
3. In the new AI_ROUTING.md, the 14737 bytes starting at the first `## History (the dated routing rulings` hash to
   `ae235b9091d2da7e5a129f81729fe4ffe1899dbda028c14ffb10f98e528481b0`, and the file ends with the bytes of
   `.planning/harness/e4/ai-routing-entry.md`.
4. In the new `.claude/CLAUDE.md`, the bytes before `## Model routing (full table` hash to
   `811dd038fcedb17dd3871f834674be1e5fc5975413c0640e66d8c3e055d30a3d` and the bytes from `**Arc shape (MODEL_ROUTING`
   to the end hash to `0a8477bf9a61558782477e64c030fc47fcb31d19dbee71e605e1b44ab31b2303`; the block between them
   equals the bytes of `.planning/harness/e4/claude-md-routing.md`.
5. `.planning/harness/ROUTING.md` exists and contains `.claude/AI_ROUTING.md`.
6. The AI_ROUTING.md bytes before `## History` and the CLAUDE.md block are pure ASCII.
Last line `PASS E4 6/6`, else `FAIL E4 <k> of 6 failed`.

### B2.1 `scripts/harness/status.py`
Stdlib only (`urllib`, no `requests`). State dir as in the common brief; file `<state>/status.json`. Every write is
a read-modify-write of one top-level block, under a lock file `<state>/status.json.lock` (create with O_EXCL; retry
every 100 ms for 5 s; treat a lock older than 10 s as stale), written to a temp file and renamed into place.
Timestamps are ISO 8601 UTC with `Z`, seconds precision. Subcommands:
- `claude --five-hour P --weekly P --fable P --resets ISO [--five-hour-resets ISO] [--window-start ISO] [--source S]`
  writes `{"claude": {"five_hour_pct", "weekly_pct", "fable_pct", "weekly_resets_utc", "five_hour_resets_utc",
  "window_start_utc", "updated_utc", "source"}}`. `window_start_utc` defaults to resets minus 7 days; `source`
  defaults to `get_usage`. Accept `...Z` and `...000Z` forms.
- `deepseek [--balance-json FILE]`: GET `https://api.deepseek.com/user/balance` with
  `Authorization: Bearer <key>`, the key resolved like `scripts/deepseek-exec.ps1` does (env `DEEPSEEK_API_KEY`,
  else `~/.claude/.deepseek-key`, else `<repo>/.claude/.deepseek-key`), never printed or logged. With
  `--balance-json` it reads that file instead of calling. Writes `{"deepseek": {"total_balance": "<string>",
  "currency", "is_available", "updated_utc"}}` from the first `balance_infos` entry (USD first when both exist).
- `glm-429 (--file PATH | --message TEXT)`: find `\[(1308|1310)\].*?reset at (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})`.
  The stamp is Asia/Shanghai (UTC+8): subtract 8 hours. Writes `{"glm": {"state": "429", "window":
  "five_hour"|"weekly" (1308 or 1310), "reset_utc", "updated_utc"}}`. Exit 3 when nothing matches.
- `glm-ok`: writes `{"glm": {"state": "ok", "updated_utc"}}`.
- `tier`: prints the budget line (B2.2), and a second `RULES NOW:` line when any rule is active.
- `show`: prints the status JSON, then the `tier` output.

### B2.2 The budget line (exact format)
`BUDGET <now yyyy-MM-dd HH:mm>Z | Claude 5h <p>% | weekly <p>% (<band>, target <t>% now, reset <yyyy-MM-dd HH:mm>Z) | Fable <p>% (<band>) | tier <tier> | GLM <state> | DeepSeek <money> | age <m>m`
- Pace: `f` = elapsed / (reset - window start), clamped to 0..1; `target = round(85 * f)`. Band: `ahead` when
  used <= target - 10; `behind` when used >= target + 10; else `on-pace`. Fable uses the same `f`.
- `tier`: `hard-containment` (weekly >= 90), `containment` (weekly >= 75), else `normal`.
- `GLM`: `ok`, `unknown`, or `429 until <yyyy-MM-dd HH:mm>Z` while the reset is in the future.
- `DeepSeek`: `$<balance to 2 places> ok`, `$<balance> HOLD` under 5, or `unknown`.
- No claude block: replace everything from `Claude 5h` through `tier ...` with
  `Claude bars UNKNOWN: run get_usage, then status.py claude`. Claude block older than 6 hours: replace `age <m>m`
  with `STALE <h>h: run get_usage, then status.py claude`.
- `RULES NOW:` joins the sentences that apply, in this order: weekly >= 90 `hard containment: in-flight production
  containment only.`; weekly >= 75 `Claude only for ledger, ship, diff review and taste; Claude subagent spawns are
  denied.`; Fable >= 90 `no Fable.`; Fable >= 70 `Fable only for phase-changing verdicts.`; 5h >= 80 `no new Opus
  or Fable spawns until the 5-hour window rolls off.`; DeepSeek HOLD `DeepSeek volume held (balance under $5).`;
  GLM 429 `GLM capped: route volume to DeepSeek.`

### B2.3 `.claude/hooks/_transcript.py` (shared by the B2, B3, B4 and C2 hooks)
Stdlib only. Functions, exactly these names:
- `load_tail(path, max_bytes=4000000)`: the parsed JSON objects from the last `max_bytes` of the file; skip a
  partial first line and any line that does not parse; `[]` when the path is empty or missing.
- `is_human(obj)`: `type` is `user`, not `isMeta`, not `isSidechain`; the content is a non-empty string, or a list
  holding at least one `text` block; and the text, left-stripped, does not start with any of `<command-name>`,
  `<command-message>`, `<command-args>`, `<local-command`, `<system-reminder>`, `[Request interrupted`,
  `Caveat:`, `<bash-input>`, `<bash-stdout>`, `<bash-stderr>`, `<cross-session-message`, `<task-notification`.
- `human_text(obj)`: that text (string content, or the text blocks joined with newlines).
- `latest_human_text(objs)`: the text of the last human object, or `""`.
- `session_model(objs)`: `message.model` of the last `assistant` object whose model is non-empty and not
  `<synthetic>`, or `""`.
- `tool_uses(obj)`: for an `assistant` object, a list of `(id, name, input)` for its `tool_use` blocks.
- `image_count(obj)`: for a `user` object, the number of `image` blocks inside its `tool_result` blocks' content.
- `last_usage(objs)`: the `message.usage` dict of the last `assistant` object that has one, or `{}`.
(Claude Code writes one line per content block, so one assistant message can span several lines.)

### B2.4 `.claude/hooks/budget-gate.py`
Stdlib only; imports `_transcript` from its own directory (insert that directory into `sys.path`) and the status
logic from `scripts/harness/status.py` (insert `<repo>/scripts/harness`, where repo = the hook's directory's
parent's parent). It reads the stdin payload and branches on `hook_event_name`:
- `HARNESS_ROLE` is `executor`: print nothing, exit 0.
- `SessionStart`: print `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<the tier
  output>"}}`.
- `PreToolUse` for `Agent` or `Task`: allow (print nothing) when the claude block is missing or older than 6 hours,
  or the latest human text contains `budget ok` (any case). Else deny, with the first reason that applies:
  1. weekly >= 75: `budget-gate: weekly all-models <p>% is at or over 75%: Claude narrows to the ledger, ship calls, diff review and the taste gate (AI_ROUTING rule 5). Route this leg to GLM, DeepSeek, Gemini or Sol, or say 'budget ok'.`
  2. 5h >= 80 and the requested `model` (lowercased) is empty or contains `opus` or `fable`: `budget-gate: the 5-hour window is at <p>%: no new Opus or Fable spawns until it rolls off (resets <yyyy-MM-dd HH:mm>Z). Say 'budget ok' to override.`
  3. Fable >= 90 and the model contains `fable`: `budget-gate: weekly Fable is at <p>%: no Fable (AI_ROUTING rule 5). Say 'budget ok' to override.`
  4. Fable >= 70, the model contains `fable`, and the latest human text does not contain `fable ok`: `budget-gate: weekly Fable is at <p>%: Fable only for phase-changing verdicts; say 'fable ok' if this is one.`
  A deny prints the PreToolUse JSON exactly as in run A's E1.1, with this reason.
- Any exception: print nothing, exit 0 (a budget gate never blocks work on its own failure).

### B2.5 Wire it: `.claude/settings.json`
Append to `hooks.SessionStart`:
`{"hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] && exit 0; f=\"${CLAUDE_PROJECT_DIR}/.claude/hooks/budget-gate.py\"; [ -f \"$f\" ] || exit 0; python \"$f\"", "timeout": 10, "statusMessage": "budget line (Harness v2 B2)"}]}`
Append to `hooks.PreToolUse`:
`{"matcher": "Agent|Task", "hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] && exit 0; f=\"${CLAUDE_PROJECT_DIR}/.claude/hooks/budget-gate.py\"; [ -f \"$f\" ] || exit 0; python \"$f\"", "timeout": 10, "statusMessage": "budget gate (Harness v2 B2)"}]}`
Change nothing else.

### B2.6 `scripts/harness/tests/_fixtures.py` (shared by the B2, B3, B4 and C2 tests)
Builders that return dicts in the real transcript shape (one content block per assistant line):
- `human(text)` -> `{"type": "user", "isMeta": False, "isSidechain": False, "message": {"role": "user", "content": text}}`
- `assistant_tool(name, inp, model="claude-opus-5-5", tid=None, usage=None)` -> an assistant line with one
  `tool_use` block (`tid` defaults to a fresh `toolu_<n>`), `message.model`, and `message.usage` when given.
- `tool_result(tid, images=0)` -> a user line whose content is one `tool_result` block; with `images=N`, that
  block's content is N `image` blocks.
- `assistant_text(text, model="claude-opus-5-5", usage=None)`.
- `usage(inp=0, cr=0, cw=0, out=0)` -> the four token fields.
- `write_transcript(path, objs)`: one JSON object per line, UTF-8.
- `run_hook(hook_path, payload, env_extra)`: runs the hook as a subprocess (env = a copy of `os.environ` without
  any `HARNESS_*`, plus `env_extra`), returns `(decision, reason, stdout)` where decision is `allow` (empty stdout),
  `deny`/`ask` (from `permissionDecision`), or `context` (a SessionStart or UserPromptSubmit JSON).

### B2.7 Tests
`scripts/harness/tests/test_b2_governor.py`: every call uses a fresh temp `HARNESS_STATE_DIR`; "now" is real time;
Agent payloads carry `transcript_path` = a fixture transcript. Fifteen checks:
1. `status.py claude --five-hour 5 --weekly 76 --fable 10 --resets <now + 2 days>` exits 0; status.json has
   `weekly_pct` 76.
2. With that state, an Agent call (model `sonnet`, latest human text `go`) -> deny; reason contains `75%`.
3. Same, latest human text `budget ok please` -> allow.
4. weekly 40 -> allow.
5. 5h 85, weekly 40, model `opus` -> deny; reason contains `5-hour`.
6. 5h 85, weekly 40, model `sonnet` -> allow.
7. Fable 72, weekly 40, model `fable`, human `go` -> deny; reason contains `fable ok`.
8. Same with human `fable ok` -> allow.
9. A status.json written with `updated_utc` = now minus 7 hours and weekly 90: the Agent call is allowed, and
   `status.py tier` prints a line containing `STALE`.
10. `glm-429 --message "[1310][Weekly/Monthly Limit Exhausted. Your limit will reset at 2026-09-04 18:30:53]"` ->
    glm `reset_utc` is `2026-09-04T10:30:53Z` and `window` is `weekly`.
11. The same with `[1308]` -> `window` is `five_hour`.
12. `deepseek --balance-json <fixture with total_balance "4.00", currency USD>` -> `tier` contains
    `DeepSeek $4.00 HOLD`.
13. `claude ... --weekly 1 --window-start <now - 1 day> --resets <now + 2.6 days>` -> `tier` contains
    `(ahead, target 24% now,`.
14. A SessionStart payload -> the output parses as JSON and its `additionalContext` starts with `BUDGET `.
15. `HARNESS_ROLE=executor`, weekly 90, an Agent call -> allow (silent).
Last line `PASS B2 15/15`, else `FAIL B2 <k> of 15 failed`.

`scripts/harness/tests/live_b2_balance.py` (live, one free GET): `status.py deepseek` with a temp state dir exits 0;
`total_balance` matches `^\d+(\.\d+)?$`; `currency` is `USD` or `CNY`; `is_available` is a boolean. Last line
`PASS B2-live deepseek balance <currency> <total_balance>`.

## Verification
Run in order; copy each actual last line into the digest.
```
python scripts/harness/tests/test_e3_lint.py
```
Expected last line: `PASS E3 9/9`
```
python scripts/harness/tests/test_e4_routing.py
```
Expected last line: `PASS E4 6/6`
```
python scripts/harness/tests/test_b2_governor.py
```
Expected last line: `PASS B2 15/15`
```
python scripts/harness/tests/live_b2_balance.py
```
Expected last line: `PASS B2-live deepseek balance USD ` followed by the balance (CNY is also a pass).
```
python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print([h.get('matcher','') for h in d['hooks']['PreToolUse']], len(d['hooks']['SessionStart']))"
```
Expected: `['Write|Edit|MultiEdit|NotebookEdit', '*', 'Agent|Task'] 2`
```
python scripts/harness/brief_lint.py .claude/briefs/harness-v2-00-common.md .claude/briefs/harness-v2-a-guard-receipts.md .claude/briefs/harness-v2-b-lint-routing-governor.md
```
Expected: three lines, each starting `PASS`.
```
python scripts/harness/digest_check.py .planning/harness/digests/run-a.json
```
Expected: a line starting `PASS`.
```
python scripts/harness/tests/run_all.py
```
Expected: `PASS E1 37/37`, `PASS E2-offline 3/3`, `PASS B2 15/15`, `PASS E3 9/9`, `PASS E4 6/6` (in file-name
order), then `ALL PASS (5 files)`.
```
python scripts/harness/diff_scope.py .claude/briefs/harness-v2-b-lint-routing-governor.md
```
Expected: a line starting `PASS diff scope:`.

## Rejected
- A second routing document: `.planning/harness/ROUTING.md` is a pointer only.
- Executors writing routing prose: the words come from the main session's files; the executor splices bytes.
- A separate "Opus bar": `get_usage` reports three bars (5-hour, weekly all-models, weekly Fable); a threshold on a
  bar that does not exist never fires.
- 14%/day pace bands: this window was 3.6 days after the one-time reset; pace is computed from the real window start
  and reset.
- A budget gate that fails closed: a missing or stale status file must not stop work; the SessionStart line says
  STALE instead.
- Reading Claude usage from the statusline's stdin: the operator's statusline is global (`~/.claude`); a repo
  wrapper around it is parked as a proposal.

## Digest
`.planning/harness/digests/run-b.json`, as in the common brief; run `"b"`; tests `E3`, `E4`, `B2`, `B2-live`,
`run_all`, `diff_scope`.

## Return conditions
The common list, plus: stop if `splice_block.py` refuses a marker, or a hash in E4.5 differs (never "fix" a hash).

## Parked operator decisions
- Wiring the budget line into the main checkout's untracked `.claude/settings.local.json`, for chats that start
  there (LESSONS #49, #50): his call.
