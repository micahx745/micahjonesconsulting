# Harness v2, run C: B3 tier-burn deny + B4 image-open ask + C2 context-size warning

Brief-Format: v2
Executor: GLM 5.3 through `scripts/claude-glm.ps1 -Batch -Scope harness` (run after run B: it reuses
`.claude/hooks/_transcript.py` and `scripts/harness/tests/_fixtures.py`). Read
`.claude/briefs/harness-v2-00-common.md` first.

## Ruling
Three hooks read the session transcript and hold the three habits that burned the most Claude last week. B3: a
top-tier session in a long mechanical loop is stopped at 40 consecutive execution calls on Opus (12 on Fable)
until the operator speaks, and a 4th Fable call in one arc needs his "fable ok". B4: the 8th raw image in a chat
needs a yes. C2: a chat over 200K context is told, once per 50K band, to hand off. None of them acts in an executor
session. Reason: the global tier-burn monitor only warns (PostToolUse) and changing it is a global edit; a repo
PreToolUse deny is the strongest tool this repo may use.

## Files
This run may create or modify only these:
- `.claude/hooks/tier-burn-deny.py` (new)
- `.claude/hooks/image-open-ask.py` (new)
- `.claude/hooks/context-size-warn.py` (new)
- `.claude/settings.json` (append three entries, C.4)
- `scripts/harness/tests/test_b3_tier_burn.py` (new)
- `scripts/harness/tests/test_b4_image_ask.py` (new)
- `scripts/harness/tests/test_c2_context_warn.py` (new)
- `.planning/harness/digests/run-c.json` (new)

## Pre-flight
Main session, before dispatch (actual values):
- `python -c "import sys;sys.path.insert(0,'.claude/hooks');import _transcript as t;print(sorted(n for n in dir(t) if not n.startswith('_')))"` -> must list at least `human_text, image_count, is_human, last_usage, latest_human_text, load_tail, session_model, tool_uses`
- `python -c "import sys;sys.path.insert(0,'scripts/harness/tests');import _fixtures as f;print(sorted(n for n in dir(f) if not n.startswith('_')))"` -> must list at least `assistant_text, assistant_tool, human, run_hook, tool_result, usage, write_transcript`
- `python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print([h.get('matcher','') for h in d['hooks']['PreToolUse']], 'UserPromptSubmit' in d['hooks'])"` -> `['Write|Edit|MultiEdit|NotebookEdit', '*', 'Agent|Task'] False`
Print these and the common list first.

## Steps
All three hooks: stdlib only; import `_transcript` from their own directory; read the stdin payload; when
`HARNESS_ROLE` is `executor`, print nothing and exit 0; on any exception, print nothing and exit 0 (these are
checkpoints, not security gates). Deny, ask and context outputs use the JSON shapes from runs A and B.

### B3 `.claude/hooks/tier-burn-deny.py` (PreToolUse)
Definitions:
- `EXEC`: `Bash`, `PowerShell`, `Edit`, `Write`, `MultiEdit`, `NotebookEdit`, `Read`, plus any `mcp__` tool whose
  lowercased name contains `claude_browser`, `chrome`, `playwright` or `computer-use`.
- Delegation: a tool named `Agent`, `Task`, `Skill` or `AskUserQuestion`; or a `Bash`/`PowerShell` command matching
  `claude-glm\.ps1|deepseek-exec\.ps1|gemini-exec\.ps1|codex-exec\.ps1|fable-gate\.ps1|run_cross_review\.py`.
- A Fable call: an `Agent`/`Task` whose `input.model`, lowercased, contains `fable`; or a `Bash`/`PowerShell`
  command containing `fable-gate.ps1` and not `-dryrun` (lowercased).
Algorithm (`objs = load_tail(transcript_path)`, `human = latest_human_text(objs).lower()`):
1. When the current call is a Fable call: count the Fable calls among all `tool_uses` in `objs` (skip the current
   `tool_use_id` if present). When that count is 3 or more and `human` does not contain `fable ok`, deny:
   `tier-burn: this would be Fable call <count+1> in this arc (limit 3, AI_ROUTING rule 11). Say 'fable ok' to allow it.`
2. `model = session_model(objs).lower()`. Limit `N` = `int(os.environ.get("HARNESS_TIER_BURN_FABLE") or 12)` when
   it contains `fable`, `int(os.environ.get("HARNESS_TIER_BURN_OPUS") or 40)` when it contains `opus`; any other
   model: allow. (The operator approved 40; the env var lets him lower it from the settings `env` block without a
   code change: the 2026-09-22 usage audit found most costly loops shorter than 40.)
3. When the current call is in `EXEC` and is not delegation: walk `objs` from the end. Stop at the first human
   object. In each assistant object, walk its tool uses from last to first: delegation stops the walk; an `EXEC`
   tool adds 1 (skip the current `tool_use_id`); anything else adds nothing. Then add 1 for the current call. When
   the total is `N` or more, deny:
   `tier-burn: <total> consecutive execution calls on <model> since the operator's last message (limit <N>, AI_ROUTING rule 11). Write the rest as a brief and run it on GLM (scripts/claude-glm.ps1 -Batch -PromptFile <pointer>), or ask the operator to continue.`
4. Otherwise allow.

### B4 `.claude/hooks/image-open-ask.py` (PreToolUse)
- An image call: `Read` whose `file_path` ends `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` or `.bmp` (any case); an
  `mcp__` tool whose lowercased name contains `screenshot`; or an `mcp__` tool whose name ends `__computer` with
  `input.action` of `screenshot` or `zoom`.
- `prior` = the sum of `image_count(o)` over `objs`.
- When the call is an image call, `prior` is 7 or more, and the latest human text (lowercased) does not contain
  `images ok`: decision `deny` when the payload's `permission_mode` is `bypassPermissions`, else `ask`, with reason
  `image-guard: this would be image <prior+1> in this chat (7 raw images is the budget, AI_ROUTING rule 10). Build one downscaled contact sheet instead (python scripts/harness/visual_qa.py --sheet <dir> --out <dir>), or say 'images ok'.`
- Otherwise allow.

### C2 `.claude/hooks/context-size-warn.py` (UserPromptSubmit)
- `u = last_usage(objs)`; `ctx = input_tokens + cache_read_input_tokens + cache_creation_input_tokens` (missing
  fields count 0). Under 200000: print nothing.
- `band = (ctx // 50000) * 50000`. State file `<HARNESS_STATE_DIR>/context-warn.json` maps `session_id` to the
  last band warned. When `band` is not above the stored band, print nothing. Otherwise store it and print
  `{"hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext": "CONTEXT <round(ctx/1000)>K (at or over 200K, AI_ROUTING rule 9): finish the unit in hand, rewrite .claude/RESUME.md, write the kickoff in .planning/handoff/, then /clear. Open the next chat inside its worktree, not the main checkout."}}`

### C.4 Wire them: `.claude/settings.json`
Append to `hooks.PreToolUse` (after the existing entries, in this order):
`{"matcher": "Bash|PowerShell|Edit|Write|MultiEdit|NotebookEdit|Read|Agent|Task|mcp__.*", "hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] && exit 0; f=\"${CLAUDE_PROJECT_DIR}/.claude/hooks/tier-burn-deny.py\"; [ -f \"$f\" ] || exit 0; python \"$f\"", "timeout": 10, "statusMessage": "tier-burn deny (Harness v2 B3)"}]}`
`{"matcher": "Read|mcp__.*", "hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] && exit 0; f=\"${CLAUDE_PROJECT_DIR}/.claude/hooks/image-open-ask.py\"; [ -f \"$f\" ] || exit 0; python \"$f\"", "timeout": 10, "statusMessage": "image-open ask (Harness v2 B4)"}]}`
Add a new key `hooks.UserPromptSubmit` holding:
`[{"hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] && exit 0; f=\"${CLAUDE_PROJECT_DIR}/.claude/hooks/context-size-warn.py\"; [ -f \"$f\" ] || exit 0; python \"$f\"", "timeout": 10, "statusMessage": "context size (Harness v2 C2)"}]}]`
Change nothing else.

### C.5 Tests (fixtures from `_fixtures.py`; every hook call gets a fresh temp `HARNESS_STATE_DIR`)
`scripts/harness/tests/test_b3_tier_burn.py`, fourteen checks. "k prior" means a transcript of one human message
`go` followed by k assistant tool calls of the kind named (each followed by its tool_result); the current call is
not in the transcript and has a new `tool_use_id`.
1. Opus, 38 prior `Bash` (`ls`), current `Bash` -> allow (total 39).
2. Opus, 39 prior `Bash`, current `Bash` -> deny; reason contains `40 consecutive`.
3. As 2, but a human message `continue` after the 20th -> allow.
4. As 2, but an `Agent` call after the 20th -> allow.
5. As 2, but a `Bash` running `powershell -File scripts/claude-glm.ps1 -Batch -PromptFile p.md` after the 20th ->
   allow.
6. Model `claude-sonnet-5`, 60 prior -> allow.
7. Model `claude-fable-5-1`, 11 prior, current `Edit` -> deny; reason contains `limit 12`.
8. Model `claude-fable-5-1`, 10 prior -> allow.
9. Opus, 50 prior `Bash`, current `Grep` -> allow.
10. Opus, 3 prior `Agent` calls with model `fable`, current `Agent` model `fable`, human `go` -> deny; reason
    contains `Fable call 4`.
11. As 10 with the human message `fable ok` -> allow.
12. Opus, 2 prior Fable `Agent` calls, current Fable `Agent` -> allow.
13. Opus, 3 prior `Bash` calls running `fable-gate.ps1 ... -DryRun`, current Fable `Agent` -> allow.
14. `HARNESS_ROLE=executor`, as 2 -> allow.
15. `HARNESS_TIER_BURN_OPUS=15`, Opus, 14 prior `Bash`, current `Bash` -> deny; reason contains `limit 15`.
Last line `PASS B3 15/15`, else `FAIL B3 <k> of 15 failed`.

`scripts/harness/tests/test_b4_image_ask.py`, eight checks:
1. 7 prior image blocks, current `Read x.png`, `permission_mode` `default` -> ask.
2. As 1 with `permission_mode` `bypassPermissions` -> deny.
3. 6 prior -> allow.
4. 7 prior, current `Read x.ts` -> allow.
5. 7 prior, latest human `images ok` -> allow.
6. 7 prior, current `mcp__Claude_Browser__computer` with `{"action": "screenshot"}` -> ask.
7. 7 prior, current `mcp__Claude_Browser__computer` with `{"action": "left_click"}` -> allow.
8. `HARNESS_ROLE=executor`, as 1 -> allow.
Last line `PASS B4 8/8`.

`scripts/harness/tests/test_c2_context_warn.py`, six checks (UserPromptSubmit payloads with `session_id`,
`transcript_path`, `prompt`):
1. Last assistant usage totalling 210,000 (session `s1`) -> context output containing `CONTEXT 210K`.
2. Session `s1` again at 212,000 -> nothing.
3. Session `s2` at 150,000 -> nothing.
4. Session `s1` at 251,000 -> context output containing `CONTEXT 251K`.
5. `HARNESS_ROLE=executor` at 300,000 (session `s3`) -> nothing.
6. A transcript with no usage (session `s4`) -> nothing.
Last line `PASS C2 6/6`.

## Verification
Run in order; copy each actual last line into the digest.
```
python scripts/harness/tests/test_b3_tier_burn.py
```
Expected last line: `PASS B3 15/15`
```
python scripts/harness/tests/test_b4_image_ask.py
```
Expected last line: `PASS B4 8/8`
```
python scripts/harness/tests/test_c2_context_warn.py
```
Expected last line: `PASS C2 6/6`
```
python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print(len(d['hooks']['PreToolUse']), len(d['hooks']['UserPromptSubmit']), len(d['hooks']['SessionStart']))"
```
Expected: `5 1 2`
```
python scripts/harness/tests/run_all.py
```
Expected: every line `PASS`, then `ALL PASS (<n> files)` where n is the number of
`scripts/harness/tests/test_*.py` files present: 8 without run D's three test files, 11 with them.
```
python scripts/harness/diff_scope.py .claude/briefs/harness-v2-c-transcript-hooks.md
```
Expected: a line starting `PASS diff scope:`.

## Rejected
- Denying on a warn threshold of 12 for Opus: Opus 5.5 is the main model and does legitimate short runs; 40 is the
  post-reset report's number and still stops a 125-call loop at call 40.
- Counting Grep and Glob as execution: they are cheap and part of reading a diff; counting them would stop reviews.
- A hook-held Fable counter file: the transcript already records every Fable call; a second record can drift.
- An `ask` decision in bypass mode: bypass skips the prompt, so the hook denies there and names the override.
- Warning on every prompt over 200K: once per 50K band, or the warning trains the reader to skip it.

## Digest
`.planning/harness/digests/run-c.json`; run `"c"`; tests `B3`, `B4`, `C2`, `run_all`, `diff_scope`.

## Return conditions
The common list, plus: stop if `_transcript.py` lacks a function named in the pre-flight (report, do not add it
here: it belongs to run B's files).

## Parked operator decisions
- The same three hooks for chats that start in the main checkout (its untracked `settings.local.json`): his call.
