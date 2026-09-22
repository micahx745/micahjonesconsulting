# Harness v2, run D: W1 Codex lockfile + W2 Gemini fallback + W3 DeepSeek cost ledger + W4 cross-review GLM leg + E2.7 receipt is_error

Brief-Format: v2
Executor: GLM 5.3 through `scripts/claude-glm.ps1 -Batch` (default scope: nothing under `.claude/` changes).
Read `.claude/briefs/harness-v2-00-common.md` first. Amended 2026-09-22 by the main session (kickoff): a Sonnet
subagent stands in for GLM while GLM is capped; the executor guard does not cover an in-session subagent, so the
common brief's hard rules bind as instructions.

## Ruling
Four wrapper fixes, each for a failure that happened this month. W1: two parallel Codex runs locked the Windows
sandbox account (error 1909), so a lockfile refuses the second. W2: Gemini quotas are per model and several ids
return 429 or 404, so the wrapper walks a fallback chain and says which model answered. W3: the DeepSeek credit was
guessed, not tracked, so every call is priced into a ledger and volume stops under $5. W4: the GLM REST leg of the
cross-review has been dead since 2026-09-18 and the Coding Plan forbids scripted REST, so a new `glmcc` leg runs the
review through the Claude Code executor (a coding tool, which the plan allows) in readonly scope. E2.7 (LESSONS
#59): a capped GLM run's receipt said `is_error: false` (exit code 1, `glm_429` true), because the receipt judged
failure only by whether the child's JSON parsed; a receipt judges failure from the exit code and the 429 flag as
well as the child's own report. Reason: each is a repeat failure with a known mechanical fix.

## Files
This run may create or modify only these:
- `scripts/codex-exec.ps1` (Edit only)
- `scripts/gemini-exec.ps1` (Edit only)
- `scripts/deepseek-exec.ps1` (Edit only)
- `scripts/harness/deepseek-rates.json` (new, W3.1)
- `scripts/cross-review/run_cross_review.py` (Edit only)
- `scripts/claude-glm.ps1` (Edit only: the one `is_error` line, E2.7)
- `scripts/harness/tests/test_e2_launcher.py` (Edit only: case 4 and the count, E2.7)
- `scripts/harness/tests/test_w1_codex_lock.py` (new)
- `scripts/harness/tests/test_w3_ledger.py` (new)
- `scripts/harness/tests/test_w4_static.py` (new)
- `scripts/harness/tests/live_w2_gemini_fallback.py` (new)
- `scripts/harness/tests/live_w3_smoke.py` (new)
- `scripts/harness/tests/live_w4_xreview.py` (new)
- `.planning/harness/digests/run-d.json` (new)

## Pre-flight
Main session, 2026-09-22 11:20 PDT, after fold 1 (`6e96bea`) brought in the landing branch's two wrappers (actual
values):
- `python scripts/cross-review/run_cross_review.py --help` -> lists `--mode {plan,diff,manuscript}`, `--input`,
  `--out`, `--glm-timeout`, `--deepseek-timeout`, `--codex-timeout`, and `--legs LEGS` described as
  `comma-separated subset of: gemini,codex,glm,deepseek` (the help prints no default; the default is
  `scripts/cross-review/run_cross_review.py:665`, `default="gemini,codex,glm,deepseek"`)
- `ls scripts/cross-review/test/` -> `deepseek_leg_test.py`
- `wc -l scripts/codex-exec.ps1 scripts/gemini-exec.ps1 scripts/deepseek-exec.ps1` -> `64`, `241`, `214` lines
  (fold 1 gave codex-exec `-Search` and gemini-exec `-Image`)
- Main session, 2026-09-22 18:52 UTC, after run B was committed (`6bafa41`):
  `grep -n "is_error = " scripts/claude-glm.ps1` -> `178:    is_error = ($null -eq $parsed)`;
  `python scripts/harness/tests/test_e2_launcher.py` -> `PASS E2-offline 3/3`;
  `python -c "import shutil;print(shutil.which('claude'))"` -> `C:\users\micah\.local\bin\claude.EXE`
Executor pre-flight, printed before any edit:
- `python scripts/cross-review/test/deepseek_leg_test.py` -> record its last line (it must be the same after W4).
- `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/gemini-exec.ps1 -Models` -> record which of
  `gemini-2.5-flash`, `gemini-3-flash-preview`, `gemini-3.1-flash-lite`, `gemini-2.5-flash-lite` are listed.
- `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -Smoke` -> record the exact line it
  prints with the token counts (for example `reply=OK tokens_in=40 tokens_out=14`). This is the one live call W3's
  live test compares against.

## Steps
State dir in every wrapper: `$env:HARNESS_STATE_DIR`, else `Join-Path $env:LOCALAPPDATA 'harness\micahjonesconsulting'`
(create it when missing). Keep every existing behaviour, parameter and message that these steps do not change.

### W1 `scripts/codex-exec.ps1`: one Codex run at a time
1. Add `[switch]$DryRun`.
2. Before any Codex invocation, in every mode (`-Brief`, `-Task`, `-Review`), `-Search` runs included (fold 1's
   `-Search` is a switch on `-Review` and `-Task`, not a mode of its own), after the existing argument checks,
   acquire `<state>\codex.lock`: create it with `[IO.File]::Open(<path>, 'CreateNew', 'Write', 'None')` and write
   `{"pid": <PID>, "started_utc": "...", "mode": "...", "dir": "..."}` (UTF-8 without BOM).
3. If it already exists: read it. When `Get-Process -Id <pid> -ErrorAction SilentlyContinue` finds the process,
   `Write-Output "codex-exec: another Codex run holds the lock (pid <pid>, mode <mode>, started <utc>). One Codex run at a time: parallel runs locked the Windows sandbox account (error 1909)."`
   and `exit 3`. Otherwise (dead pid, or the file does not parse) `Write-Output "codex-exec: reclaimed a stale lock (pid <pid> is not running)."`
   and overwrite it with this run's record.
4. Release in a `finally` block: delete the lock only when it still records this run's PID.
5. With `-DryRun`: after acquiring, `Write-Output "DRY RUN: would run codex <mode> in <dir>"`, release, `exit 0`.
   Codex is never started.

### W2 `scripts/gemini-exec.ps1`: fallback chain
Read the current file first: fold 1 (`6e96bea`) replaced it with the landing branch's version, which adds `-Image`.
The main session read that version on 2026-09-22: it sends one `Invoke-WebRequest` to one model (lines 186-194) and
walks no chain, so W2 is built in full. If the file you read does walk models, keep its walk, add only what is
missing (`MODEL-USED`, the MAX_TOKENS rule, exit 4) and record that in `deviations`. Every model in the chain gets
the same body, `-Image` parts included, and the rule that skips the 2 MB body guard when `-Image` is given stays.
1. Add `[string]$Chain = "gemini-3-flash-preview,gemini-3.1-flash-lite,gemini-2.5-flash-lite"` and
   `[switch]$NoFallback`. Drop from the default `$Chain` any id the pre-flight `-Models` listing did not show, and
   say so in the digest's `deviations`.
2. Order: `$Model` first, then each `$Chain` id not already tried. `-NoFallback`: `$Model` only. `-Smoke` and
   `-Models` keep their current behaviour.
3. Per model, make the call exactly as today, then:
   - Non-empty text: `[Console]::Error.WriteLine("MODEL-USED: <model>")`, then output as today, exit 0.
   - HTTP 404, 429, 500 or 503; HTTP 400 whose body contains `not found` (any case); or an empty answer whose
     finishReason is not `MAX_TOKENS`: `[Console]::Error.WriteLine("gemini-exec: <model> -> <HTTP code, or empty (<finishReason>)>, trying the next model")`
     and continue.
   - An empty answer with finishReason `MAX_TOKENS`: `Write-Output "gemini-exec: <model> spent the budget on thinking (MAX_TOKENS): raise -MaxTokens; no fallback."`, exit 5.
   - Any other HTTP error: fail as today (no fallback: a bad request fails on every model).
4. Every model failed: `Write-Output "gemini-exec: every model in the chain failed (<model>: <why>; ...). Route this leg to Fable or skip it."`, exit 4.

### W3 `scripts/deepseek-exec.ps1`: cost ledger and the $5 hold
1. Create `scripts/harness/deepseek-rates.json` with exactly:
```
{
  "checked": "2026-09-22, research report 00b section 1 (deepseek-flash serves V4.1-Flash)",
  "currency": "USD",
  "per_million": {
    "deepseek-flash": {"offpeak": {"input": 0.15, "cache_hit": 0.003, "output": 0.60}, "peak": {"input": 0.30, "cache_hit": 0.006, "output": 1.20}},
    "deepseek-v4-pro": {"offpeak": {"input": 0.66, "cache_hit": 0.66, "output": 1.98}, "peak": {"input": 1.32, "cache_hit": 1.32, "output": 3.96}}
  },
  "peak_utc": {"days": "Mon-Fri", "hours": [[1, 4], [6, 10]]},
  "note": "The v4-pro cache-hit price is not in the report: it is priced as input, an upper bound. Peak is 2x off-peak per the report."
}
```
2. Add `[switch]$Force` and `[string]$LedgerFixture = ""` (comment: `# test-only: a saved API response to use instead of the call`).
3. Hold: before any call except `-Smoke` and `-Models`, when `<state>\status.json` has a `deepseek` block whose
   `updated_utc` is under 24 hours old and whose `total_balance` is under 5, and `-Force` is not set:
   `Write-Output "deepseek-exec: balance `$<balance> is under `$5: volume is held (AI_ROUTING). Pass -Force for a critical leg."`, exit 6.
4. With `-LedgerFixture`, read that file's JSON as the API response instead of calling the API; everything after
   the call (output, token line, ledger) runs as normal.
5. After every successful response (including `-Smoke`, excluding `-Models`), append one compact JSON line to
   `<state>\deepseek-ledger.jsonl` (UTF-8 without BOM), keys in this order: `utc`, `model`, `peak` (true when the
   UTC day is Monday to Friday and the UTC hour is in [1,4) or [6,10)), `prompt_tokens`, `cache_hit`
   (`usage.prompt_cache_hit_tokens`, else 0), `cache_miss` (`usage.prompt_cache_miss_tokens`, else prompt_tokens
   minus cache_hit), `completion_tokens`, `reasoning_tokens` (`usage.completion_tokens_details.reasoning_tokens`,
   else 0), `est_usd` (`(cache_hit * cache_hit_rate + cache_miss * input_rate + completion_tokens * output_rate) / 1e6`,
   rates for the model and the peak flag, rounded to 6 places; an unknown model uses deepseek-v4-pro's rates),
   `label` (the prompt file's leaf name, or `smoke`).

### W4 `scripts/cross-review/run_cross_review.py`: the `glmcc` leg
1. A new leg key `glmcc`, printed as `GLM(CC)` in the leg table, run only when `--legs` names it (the default
   stays `gemini,codex,glm,deepseek`). Add `--glmcc-timeout` (default 1200 seconds: GLM can think silently for 8+
   minutes).
2. The leg's instruction comes from `_instruction_for`, the same text the REST legs get (the file's own rule:
   every leg resolves its instruction there).
3. Transport: write the leg's full text (instruction plus material) to
   `<state>/runs/xr-glmcc-<UTC yyyyMMdd-HHmmss>.material.md` (UTF-8). Write a pointer prompt next to it,
   `...prompt.md`, exactly: `You are a reviewer. Read the file <material path> in full and follow the instructions at its top. Reply with the review only, at most 8 KB.`
   Run `powershell -NoProfile -ExecutionPolicy Bypass -File <repo>/scripts/claude-glm.ps1 -Batch -Scope readonly -PromptFile <pointer> -Dir <repo> -MaxTurns 30 -TimeoutMin <ceil(glmcc_timeout / 60)>`
   with `encoding="utf-8", errors="replace"`. The review is stdout without its final `RECEIPT: ` line, cut to 8192
   UTF-8 bytes with `\n[truncated at 8 KB]` appended when cut. A non-zero exit is a failed leg, reported like the
   other legs' failures.

### E2.7 `scripts/claude-glm.ps1`: is_error from the exit code and the 429 flag (LESSONS #59)
1. Replace line 178 with exactly:
   `    is_error = (($null -eq $parsed) -or ($exitCode -ne 0) -or $glm429 -or ($null -ne $parsed -and $parsed.is_error -eq $true))`
   Change nothing else in the file.
2. `scripts/harness/tests/test_e2_launcher.py`: add case 4 and change the count from 3 to 4 in the PASS and FAIL
   lines. `run_launcher` gains an optional `env_extra` dict, merged into the child env after the `HARNESS_` strip.
   Case 4 has two halves and counts as one check. Each half makes a fresh temp dir `fake` holding `reply.json` and
   `claude.cmd`, whose text is exactly these three lines (with the half's exit code):
   ```
   @echo off
   type "%~dp0reply.json"
   exit /b <code>
   ```
   `env_extra`: `PATH` = `fake` + `os.pathsep` + the current PATH, and `ZAI_CODING_KEY` = `offline-test-dummy` (the
   launcher then reads no key file, and the fake calls nothing). Precondition, asserted before the launcher runs:
   `shutil.which("claude", path=<that PATH>)` resolves to a file inside `fake`; if it does not, the check fails
   without running the launcher. Each half runs `-Batch -PromptFile <a short prompt file> -Dir <repo>` with a fresh
   temp `HARNESS_STATE_DIR`; the receipt is the file named on the stdout line that starts `RECEIPT: `.
   a. `reply.json` = `{"type": "result", "subtype": "success", "is_error": false, "result": "API Error: 429 [1308][Usage limit reached for 5 hour. Your limit will reset at 2026-09-22 14:44:53]", "session_id": "e2-offline-4a"}`,
      code 1 -> launcher exit 1; receipt `exit_code` 1, `glm_429` true, `is_error` true.
   b. `reply.json` = `{"type": "result", "subtype": "success", "is_error": false, "result": "OK", "session_id": "e2-offline-4b"}`,
      code 0 -> launcher exit 0; receipt `exit_code` 0, `glm_429` false, `is_error` false.
   Last line `PASS E2-offline 4/4`, else `FAIL E2-offline <k> of 4 failed`.

### Tests
Each wrapper call gets a fresh temp `HARNESS_STATE_DIR`.
`scripts/harness/tests/test_w1_codex_lock.py` (offline), three checks, all with `-Review -Prompt <temp .md> -Out <temp .md> -DryRun`:
1. No lock -> exit 0; output contains `DRY RUN`; no lock file afterwards.
2. A lock naming the PID of a live `python -c "import time; time.sleep(60)"` child (killed after the check) -> exit
   3; output contains `holds the lock` and that PID; the lock file is unchanged.
3. A lock naming PID 999999 -> exit 0; output contains `reclaimed a stale lock` and `DRY RUN`; no lock file
   afterwards.
Last line `PASS W1 3/3`.

`scripts/harness/tests/test_w3_ledger.py` (offline), three checks, all with `-PromptFile <temp> -Model deepseek-flash -LedgerFixture <fixture>`, where the fixture is
`{"model": "deepseek-flash", "choices": [{"message": {"content": "OK"}, "finish_reason": "stop"}], "usage": {"prompt_tokens": 1000, "prompt_cache_hit_tokens": 400, "prompt_cache_miss_tokens": 600, "completion_tokens": 200, "completion_tokens_details": {"reasoning_tokens": 150}}}`:
1. Exit 0; the ledger has one line with `cache_hit` 400, `cache_miss` 600, `completion_tokens` 200,
   `reasoning_tokens` 150, and an `est_usd` equal to the formula recomputed by the test from
   `deepseek-rates.json` and the line's own `peak` flag.
2. A `status.json` whose deepseek block has `total_balance` `"4.00"` and `updated_utc` now -> exit 6; output
   contains `under $5`.
3. The same with `-Force` -> exit 0.
Last line `PASS W3 3/3`.

`scripts/harness/tests/test_w4_static.py` (offline), two checks: importing the runner module (insert
`scripts/cross-review` into `sys.path`), `_instruction_for("glmcc")` returns a non-empty string; and
`python scripts/cross-review/run_cross_review.py --help` lists `--glmcc-timeout`. Last line `PASS W4 2/2`.

`scripts/harness/tests/live_w2_gemini_fallback.py` (live, free tier), prompt file text `Reply with the single word OK.`:
1. `-Model gemini-nonexistent-test -PromptFile <it> -MaxTokens 2000` -> exit 0; stderr contains
   `gemini-nonexistent-test ->` and `MODEL-USED: gemini-`; stdout contains `OK`.
2. `-Model gemini-nonexistent-a -Chain gemini-nonexistent-b -PromptFile <it>` -> exit 4; output contains
   `every model in the chain failed`.
Last line `PASS W2-live 2/2`.

`scripts/harness/tests/live_w3_smoke.py` (live, one flash call): `-Smoke` -> exit 0; the ledger has exactly one
line with `label` `smoke`; its `prompt_tokens` and `completion_tokens` equal the two numbers in the token line the
script printed (the pre-flight recorded that line's format); `est_usd` is above 0 and under 0.01. Last line
`PASS W3-live ledger <est_usd>`.

`scripts/harness/tests/live_w4_xreview.py` (live: one DeepSeek call and one GLM run): a temp plan file of five
lines (a toy plan to add a `--version` flag to a script) and
`python scripts/cross-review/run_cross_review.py --mode plan --input <plan> --legs deepseek,glmcc --out <temp out>`
-> exit 0; the leg table shows both `DEEPSEEK` and `GLM(CC)` legs as OK; each leg's review is at most 8192 bytes.
Last line `PASS W4-live 2 legs OK`.
While GLM is capped (before 2026-09-22 21:44:53 UTC, 14:44:53 PDT; check with
`python -c "import datetime;print(datetime.datetime.now(datetime.timezone.utc).isoformat())"`), write this test but
do not run it, and record in the digest's tests `{"code": "W4-live", "command": "python scripts/harness/tests/live_w4_xreview.py", "result": "DEAD", "last_line": "not run: GLM capped until 21:44 UTC"}`.
The main session runs it after the reset.

## Verification
Run in order; copy each actual last line into the digest.
```
python scripts/harness/tests/test_w1_codex_lock.py
```
Expected last line: `PASS W1 3/3`
```
python scripts/harness/tests/test_w3_ledger.py
```
Expected last line: `PASS W3 3/3`
```
python scripts/harness/tests/test_w4_static.py
```
Expected last line: `PASS W4 2/2`
```
python scripts/cross-review/test/deepseek_leg_test.py
```
Expected: the same last line the executor pre-flight recorded.
```
python scripts/harness/tests/live_w2_gemini_fallback.py
```
Expected last line: `PASS W2-live 2/2`
```
python scripts/harness/tests/live_w3_smoke.py
```
Expected last line: `PASS W3-live ledger ` followed by a number under 0.01.
```
python scripts/harness/tests/live_w4_xreview.py
```
Expected last line: `PASS W4-live 2 legs OK` (before 21:44:53 UTC: not run, recorded DEAD as above).
```
python scripts/harness/tests/test_e2_launcher.py
```
Expected last line: `PASS E2-offline 4/4`
```
python scripts/harness/tests/run_all.py
```
Expected: every line `PASS`, then `ALL PASS (<n> files)` where n is the number of `scripts/harness/tests/test_*.py`
files present.
```
python scripts/harness/diff_scope.py .claude/briefs/harness-v2-d-wrappers.md
```
Expected: a line starting `PASS diff scope:`. (If run B has not landed, `diff_scope.py` does not exist yet: record
`not run: run B pending` instead.)

## Rejected
- A Codex lock that waits instead of refusing: a silent wait on a 20-minute Astra run looks like a hang; the caller
  decides.
- Falling back on MAX_TOKENS: the next model hits the same budget wall; the fix is a larger -MaxTokens.
- Refreshing the DeepSeek balance on every call: one more request per call; `status.py deepseek` refreshes on
  demand.
- Making `glmcc` a default leg: it changes every existing caller's run time and spend; the routing card names it.
- A GLM REST leg on the Coding Plan key: its usage policy forbids scripted calls.

## Digest
`.planning/harness/digests/run-d.json`; run `"d"`; tests `W1`, `W3`, `W4`, `xr-test`, `W2-live`, `W3-live`,
`W4-live` (DEAD while GLM is capped), `E2-offline`, `run_all`, `diff_scope`.

## Return conditions
The common list, plus: stop if `deepseek_leg_test.py` changes its last line after W4, or if the pre-flight shows
none of the default chain ids listed.

## Parked operator decisions
- Whether `glmcc` replaces `codex` in the default legs while ChatGPT is at 8%: his call.
