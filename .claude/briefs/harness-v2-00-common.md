# Harness v2: the rules for every executor run (read this before your run's brief)

Brief-Format: v2
Written 2026-09-22 by the main session (Opus 5.5, chat "LANDING PAGE 2"). Branch `harness/v2`, worktree
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/harness-v2`, branched from `design/live-evolve` at
`4dddde3`.

## Ruling
The operator approved sixteen repo-level harness changes by popup on 2026-09-22. The main session writes the
briefs, reviews every diff, re-runs the tests and commits. GLM executes. DeepSeek and Gemini verify the combined
diff. No Fable calls in this arc. Reason: the ruling is the scarce part; the loop that implements it belongs on GLM.

Operator answers, verbatim (popups 2026-09-22): executor changes E1-E4 "go with all your recs"; budget changes
B1-B4 "go your recs"; wrappers W1-W4 "your recs"; context and visual QA C1-C4 "your recs"; installer "This chat
installs (Recommended)"; GLM concurrency "Two at once, back off (Recommended)".

## Files
- `.claude/briefs/harness-v2-00-common.md` (this file) is read-only for every run. Each run's own brief lists the
  only files that run may create or modify.

## Pre-flight
Main session, 2026-09-22 10:35 PDT, in the worktree (actual values):
- `python --version` -> `Python 3.14.0` (PIL and numpy import; requests does not)
- `node --version` -> `v22.20.0`
- `where claude` -> `C:\Users\micah\.local\bin\claude.exe` (Claude Code 2.1.266)
- `powershell -NoProfile -Command "$PSVersionTable.PSVersion.ToString()"` -> `5.1.22621.6133`
- `echo $LOCALAPPDATA` -> `C:\Users\micah\AppData\Local`
- `test -d node_modules; echo $?` -> `1` (this worktree has no node_modules: no sharp, no playwright)
Every run prints these actual values first, before any edit, and stops if one differs.

## Steps (the hard rules; they bind every run)
1. Work only inside the worktree above. Read and write nothing in the main checkout or any other worktree.
2. Git is read-only for you: `status`, `diff`, `log`, `show`, `ls-files`, `grep`, `rev-parse`. Never commit, push,
   pull, fetch, stash, reset, checkout, switch, restore, add, rm, mv, tag, branch, merge, rebase, apply or config.
   The main session commits.
3. Never write `.claude/RESUME.md`, any `MEMORY.md`, `docs/LESSONS_LEARNED.md`, `CLAUDE.md`, `AGENTS.md`,
   `.claude/settings.local.json`, or any `.env*` or key file. Never read a `.env*` or key file, and never print an
   environment variable that holds a key or token.
4. Create or modify only the files your brief's `## Files` section lists. Anything else: stop and report.
5. ASCII only in every file you write: code, comments, docs, JSON. No curly quotes, no em or en dashes, no arrows,
   no single-character >= or <= signs, no ellipsis character (LESSONS #46). The premium-web copy-lint hook rejects
   `.md`, `.ts`, `.tsx`, `.html`, `.css`, `.astro` and `.jsx` writes that contain a banned word as a whole word
   (the plugin's list plus `.claude/brand.json` `voice.banned`, mostly marketing verbs and adjectives; the verb
   for switching a feature back on was caught on 2026-09-22). If a write is rejected, reword the prose (for
   example "switch on") and report it as a deviation; never edit the hook or the list.
6. Create files with the Write tool; change them with the Edit tool. No heredocs, no Set-Content or Out-File, no
   echo-redirection for file content: they mangle backslashes and add byte-order marks. JSON files are UTF-8
   without a BOM.
7. Python is `python` (3.14; stdlib, PIL and numpy). Use `C:/` forward-slash paths inside Python. Set
   `PYTHONIOENCODING=utf-8` when a script prints. PowerShell is Windows PowerShell 5.1: no `&&`, no ternary, no
   `?.`. Run a PowerShell script as `powershell -NoProfile -ExecutionPolicy Bypass -File <script> <args>`.
8. No network except the live tests your brief names. No installs of any kind (npm, pnpm, pip, or an npx that
   downloads). No MCP tools, no subagents, no WebFetch or WebSearch.
9. The expected values are the test. Never edit a test, a fixture or the work to make a check pass, and never
   reinterpret an expected value (LESSONS #25, #37). If a check fails and you believe the brief is wrong, stop and
   report the raw output with your reason.
10. Runtime state (status, receipts, ledgers, locks, the guard log) lives in the state directory:
    `%LOCALAPPDATA%/harness/micahjonesconsulting`, overridden by the env var `HARNESS_STATE_DIR`. Every test sets
    `HARNESS_STATE_DIR` to a fresh temp directory. Nothing runtime is written inside the repo.
11. Start by printing the pre-flight values (your first action, before reading anything long). End by writing your
    digest and printing the short summary described under `## Digest`.

## Verification
Every run ends with its own brief's verification commands, run in the order given, and copies each actual last
line into its digest. Once run A has created it, every run also ends with:
```
python scripts/harness/tests/run_all.py
```
Expected: one `PASS <code> ...` line per offline test file present, then `ALL PASS (<n> files)`, exit code 0.

## Rejected
- Executors committing, stashing, pushing or writing the books (RESUME, memory, LESSONS): Sol once rewrote a RESUME
  wholesale. One writer per file.
- Downloading anything: installs are an operator decision.
- A second routing document: `.claude/AI_ROUTING.md` stays the single source.
- DeepSeek as a tool-using executor: both research reports reject it on data residency; the 2026-09-22 smoke test
  only proved it works.
- An idle watchdog on GLM runs: GLM-5.3 can think silently for 8+ minutes before its first action (MJCONSULT 13,
  2026-09-22). Runs get a wall-clock timeout only.

## Digest
Every run writes `.planning/harness/digests/run-<letter>.json`, at most 8192 bytes, UTF-8 without BOM, shaped:
```
{"run": "a",
 "items": [{"claim": "one sentence", "evidence": "path:line  OR  $ command -> first line of its output", "confidence": "high|med|low"}],
 "tests": [{"code": "E1", "command": "...", "result": "PASS|FAIL", "last_line": "..."}],
 "deviations": ["anything you did that the brief did not say, and why"],
 "files_changed": ["..."]}
```
Then print at most 12 lines: each test code with PASS or FAIL, then each deviation.

## Return conditions (stop, write the digest, report)
- A pre-flight actual value differs from the brief.
- A check fails, and passing it would need a change outside your `## Files` list or an edit to a test or fixture.
- A hook denies a tool call you did not expect to be denied (copy the reason verbatim into the digest).
- A z.ai 429 (copy the error body: it carries the reset time, in Shanghai time).
