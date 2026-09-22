# Harness v2, run G: G1 brief_lint count check + G2 dispatch lint hook + G3 RESUME size hook

Brief-Format: v2
Executor: a Sonnet subagent (GLM is capped until 2026-09-22 21:44:53 UTC; the operator chose Sonnet executors for
this arc by popup). The executor guard does not cover an in-session subagent, so the hard rules in
`.claude/briefs/harness-v2-00-common.md` bind as instructions. Read that file first.

## Ruling
LESSONS #60 and #64 (2026-09-22): three briefs carried typed values (a recurrence of #52 and #54), and a RESUME was
committed over its 2,500-byte cap. The operator's standing rule: every caught defect gets a mechanical gate the same
day, and a recurrence graduates the gate to a blocking hook. G1 makes `brief_lint.py` fail a brief whose stated
number of checks disagrees with its numbered list or its `PASS X N/N` line. G2 runs that lint on the brief a dispatch
names and denies the dispatch on a FAIL. G3 blocks, right after the write, a `.claude/RESUME.md` over 2,500 bytes.
Reason: the main session caught these by re-running values by hand; a hook catches them when it does not.

## Files
This run may create or modify only these:
- `scripts/harness/brief_lint.py` (Edit only: G1)
- `.claude/hooks/dispatch-lint.py` (new, G2)
- `.claude/hooks/resume-size.py` (new, G3)
- `.claude/settings.json` (append two entries, G4)
- `scripts/harness/tests/test_g_gates.py` (new)
- `.planning/harness/digests/run-g.json` (new)

## Pre-flight
Main session, 2026-09-22 20:40 UTC, on the tree this brief was committed to (actual values):
- `python scripts/harness/brief_lint.py .claude/briefs/harness-v2-*.md` -> eight lines, each starting `PASS`
- `python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print({k:len(v) for k,v in d['hooks'].items()}, [h.get('matcher','') for h in d['hooks']['PostToolUse']])"` -> `{'PostToolUse': 1, 'PreToolUse': 5, 'SessionStart': 2, 'UserPromptSubmit': 1} ['Write|Edit']`
- `ls scripts/harness/tests/test_*.py | wc -l` -> `14`
- `python scripts/harness/tests/run_all.py` -> ends `ALL PASS (14 files)`
Print these and the common list first.

## Steps

### G1 `scripts/harness/brief_lint.py`: the count check
Add this rule for every Brief-Format v2 brief (a SKIP brief is not checked). Each failure is a reason
`count mismatch (line <n>): says <s>, lists <k>, expects <a>/<b>`, leaving out the parts that were not found:
1. Number words are `zero` to `twenty`; digits count too. A stated count is a match of
   `(?i)\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|\d+) checks\b`
   on a line after its backtick spans are replaced by a space (a count inside backticks is quoted output). The strip
   is exactly this Python (an empty pair is a span too; run G's first pass used `+` and a doubled backtick exposed a
   quoted count):
   ```
   stripped = re.sub(r"`[^`]*`", " ", line)
   ```
2. From the stated line, look at up to the next 4 lines, stopping at a blank line or a line starting `#`. A line
   containing `Last line`: take the numbers of `PASS \S+ (\d+)/(\d+)` on it, and stop. A line matching `^\d+\.\s`
   (a numbered item at column 0): the list starts there; stop.
3. If the stated line itself contains `Last line` and no numbers were taken yet, take them from it.
4. When a list started: count the consecutive numbered items (`^\d+\.\s`), passing over continuation lines (lines
   that start with two spaces and are not blank); the first other line ends the list. Then look at up to 3 lines from
   there, stopping at a blank line or a line starting `#`, for a line containing `Last line`, and take its numbers.
5. FAIL when the stated number, the listed count (when a list started) and both expected numbers (when taken) are not
   all equal.
The main session prototyped exactly this rule: it passes the seven harness-v2 briefs A to F and common, and it fails
brief C as committed at `5bff7b8` with `says 14, lists 15, expects 15/15`.

### G2 `.claude/hooks/dispatch-lint.py` (PreToolUse)
Stdlib only; imports `_transcript` from its own directory. When `HARNESS_ROLE` is `executor`, print nothing and exit
0; on any exception, print nothing and exit 0.
- Text: for `Agent` or `Task`, `tool_input.prompt`; for `Bash` or `PowerShell`, `tool_input.command`, and only when
  that command contains `claude-glm.ps1` or `codex-exec.ps1`. Any other call: allow.
- Base dir: the payload's `cwd` when it is a directory, else the repo root (the hook's directory's parent's parent).
- Briefs: with backslashes turned into `/`, every match of `\.planning/harness/prompts/[A-Za-z0-9_.-]+\.md` in the
  text is a pointer. Read each pointer that exists under the base dir and collect every match of
  `\.claude/briefs/[A-Za-z0-9_.-]+\.md` in it; collect those matches from the text itself as well. Keep the ones that
  exist under the base dir, in first-seen order, without duplicates. None: allow.
- Run `python <repo>/scripts/harness/brief_lint.py <briefs...>` with the base dir as its working directory, timeout
  20 seconds. When an output line starts with `FAIL` and the latest human text (lowercased) does not contain
  `lint ok`, deny with the reason
  `dispatch-lint: <that FAIL line> (LESSONS #60). Fix the brief and commit it, or say 'lint ok' to dispatch anyway.`
  Otherwise allow. The deny JSON is the PreToolUse shape of runs A to C.

### G3 `.claude/hooks/resume-size.py` (PostToolUse)
Stdlib only. When `HARNESS_ROLE` is `executor`, print nothing and exit 0; on any exception, print nothing and exit 0.
When `tool_input.file_path`, with backslashes turned into `/` and lowercased, ends with `.claude/resume.md`, and that
file exists with a size over 2500 bytes, print
`{"decision": "block", "reason": "resume-size: .claude/RESUME.md is <n> bytes (cap 2500, LESSONS #64). Trim it before you commit."}`.
Otherwise print nothing.

### G4 Wire them: `.claude/settings.json`
Append to `hooks.PreToolUse`:
`{"matcher": "Agent|Task|Bash|PowerShell", "hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] && exit 0; f=\"${CLAUDE_PROJECT_DIR}/.claude/hooks/dispatch-lint.py\"; [ -f \"$f\" ] || exit 0; python \"$f\"", "timeout": 30, "statusMessage": "dispatch lint (Harness v2 G2)"}]}`
Append to `hooks.PostToolUse`:
`{"matcher": "Write|Edit|MultiEdit", "hooks": [{"type": "command", "command": "[ \"$HARNESS_ROLE\" = \"executor\" ] && exit 0; f=\"${CLAUDE_PROJECT_DIR}/.claude/hooks/resume-size.py\"; [ -f \"$f\" ] || exit 0; python \"$f\"", "timeout": 10, "statusMessage": "RESUME size (Harness v2 G3)"}]}`
Change nothing else.

### Tests: `scripts/harness/tests/test_g_gates.py`
Hook calls go through `_fixtures.run_hook` (PreToolUse) or a plain subprocess whose stdout is parsed as JSON
(PostToolUse), each with a fresh temp `HARNESS_STATE_DIR`. The test writes every fixture into a temp dir. A counted
brief is the minimal valid v2 brief of `test_e3_lint.py`'s first check whose Steps section also holds the line
`A test, fifteen checks:`, then the fifteen lines `1. x` to `15. x`, then the line ``Last line `PASS T 15/15`.``
Ten checks:
1. `brief_lint.py` on a counted brief -> `PASS`.
2. The same with `fourteen` in place of `fifteen` -> `FAIL`, reason contains `says 14, lists 15, expects 15/15`.
3. A counted brief whose last line is ``Last line `PASS T 14/14`.`` -> `FAIL`, reason contains `count mismatch`.
4. A counted brief whose stated line reads A test, `fourteen checks`: (the count inside one backtick pair) -> `PASS`.
5. dispatch-lint: a temp base dir holding `.planning/harness/prompts/run-t.md` (text: `Read .claude/briefs/t.md.`)
   and `.claude/briefs/t.md` (the brief of check 2); an `Agent` payload with `cwd` = that dir, prompt
   `Read .planning/harness/prompts/run-t.md and do exactly what it says.`, and a transcript whose human text is
   `go` -> deny; reason contains `dispatch-lint` and `count mismatch`.
6. As 5 with the brief of check 1 -> allow.
7. As 5 with the human text `lint ok` -> allow.
8. As 5 but tool `Bash` with command `cat .planning/harness/prompts/run-t.md` -> allow (not a dispatch).
9. `HARNESS_ROLE=executor`, as 5 -> allow.
10. resume-size: a temp dir's `.claude/RESUME.md` at 2501 bytes and an `Edit` payload naming it -> JSON with
    `decision` `block` and a reason containing `2501 bytes`; the same file at 2500 bytes -> no output; a `notes.md`
    at 3000 bytes -> no output. (The three halves are one check.)
Last line `PASS G 10/10`, else `FAIL G <k> of 10 failed`.

## Verification
Run in order; copy each actual last line into the digest.
```
python scripts/harness/tests/test_g_gates.py
```
Expected last line: `PASS G 10/10`
```
python scripts/harness/brief_lint.py .claude/briefs/harness-v2-*.md
```
Expected: eight lines, each starting `PASS`.
```
python scripts/harness/tests/test_e3_lint.py
```
Expected last line: `PASS E3 9/9`
```
python -c "import json;d=json.load(open('.claude/settings.json',encoding='utf-8'));print({k:len(v) for k,v in d['hooks'].items()})"
```
Expected: `{'PostToolUse': 2, 'PreToolUse': 6, 'SessionStart': 2, 'UserPromptSubmit': 1}`
```
python scripts/harness/tests/run_all.py
```
Expected: every line `PASS`, then `ALL PASS (15 files)` (14 at pre-flight, plus `test_g_gates.py`).
```
python scripts/harness/diff_scope.py .claude/briefs/harness-v2-g-gates.md
```
Expected: a line starting `PASS diff scope:`.

## Rejected
- Checking every numbered list in a brief: steps are numbered too; only a stated count of checks makes a numeric
  claim.
- Counting a number inside backticks: `SELFTEST PASS (6 checks)` is quoted output; brief E's Tests section tripped the
  main session's first prototype there.
- A git pre-commit hook: `.git/hooks` is not versioned and every worktree shares it; a Claude Code hook lives in the
  repo.
- Refusing the RESUME write before it happens: PreToolUse cannot know an Edit's resulting size; PostToolUse blocks
  right after it, and the main session trims.

## Digest
`.planning/harness/digests/run-g.json`; run `"g"`; tests `G`, `brief_lint`, `E3`, `settings`, `run_all`,
`diff_scope`.

## Return conditions
The common list, plus: stop if any current harness-v2 brief FAILs the new count check (report the line; never edit
a brief: the main session owns them).

## Parked operator decisions
- Wiring G2 and G3 into the main checkout's untracked `.claude/settings.local.json` too: his call (as #49, #50).
