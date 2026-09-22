# GLM leg 1: the usage audit (harness research 2026-09-22)

You are an executor. Write and run ONE local script, write the output files named below, print a short summary, and
stop. Do not commit, push, or edit any other file. Work in `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`.

## Hard privacy rule (read it twice)
The session transcripts hold the operator's own words and at least one exposed key. NO transcript text may reach you or
any model.
- Never open, Read, cat, head, tail, grep, rg, Select-String or print any `.jsonl` file, or any line or field value
  from one. Only your script reads them, on this machine.
- The script may output ONLY: numbers, dates, 8-character session-id prefixes, project-dir suffixes, model ids, tool
  names, and the class names defined below. It never keeps message text, thinking, tool inputs (except the fields named
  below), tool-result text or file paths in anything it writes. It ends with an assertion that every string it writes
  is on that allow-list, and it fails loudly if one is not.
- For schema discovery, a helper may print the sorted set of JSON key paths with value TYPES only, never values, for
  the first 300 lines of one file.
- `00-fable-report.md` lines 61-216 hold a draft aggregator written without access to this machine. You may borrow from
  it; the rules in this file win.

## Inputs
- Transcripts: `C:/Users/micah/.claude/projects/<dir>/*.jsonl` for every `<dir>` whose name starts with
  `C--Users-micah-Code-micahjonesconsulting` (the main checkout and each worktree). Subagent transcripts are in
  `<dir>/<session-id>/subagents/*.jsonl` (newer layout) or inline with `"isSidechain": true` (older). Include both.
  Attribute a subagent's usage to its parent session and to the Agent call that spawned it (match by agentId or
  tool_use_id if present, else by timestamp window).
- Selection: the 7 most recent sessions by last event timestamp that have at least 50 unique assistant messages. Exclude
  any file modified in the last 15 minutes (the chat in progress). Report which sessions were chosen.

## Accounting (known traps; handle each one)
1. DEDUPE. Claude Code writes one JSONL line per content block, and each line repeats the same `message.usage`. Count
   usage ONCE per `message.id` (fall back to `requestId`), and union the blocks for classification. Print assistant
   lines vs unique messages per session.
2. Skip entries with no usage and entries whose model is `<synthetic>`.
3. For each unique assistant message: `in` = input_tokens; `cw` = cache_creation_input_tokens, split into
   ephemeral_5m and ephemeral_1h when `usage.cache_creation` is present; `cr` = cache_read_input_tokens;
   `out` = output_tokens; `ctx` = in + cw + cr, the prompt size of that call; model = message.model.
4. Weighted cost `eq`, using API list-price ratios. This is an assumption about how plan limits weigh tokens; say so in
   the output. eq = in x1 + cw_5m x1.25 + cw_1h x2 + cr x R + out x5, where R = 0.025 for claude-fable-*, 0.05 for
   claude-opus-5-5, and 0.1 otherwise. When the 5m/1h split is absent, weight all cw at 1.25 and say so.
5. The tool class of each assistant message comes from its tool_use blocks. A message can have several; split its eq
   evenly between them. The classes:
   image_read (Read of .png .jpg .jpeg .webp .gif .bmp) · text_read · bash (Bash, PowerShell) · search (Grep, Glob,
   ToolSearch) · write_edit (Write, Edit, MultiEdit, NotebookEdit) · agent (Agent or Task: record input.model, or
   "unset", and subagent_type) · browser_shot (a screenshot or zoom action from any mcp tool whose name contains
   browser, chrome or playwright) · browser_other · popup (AskUserQuestion) · usage (get_usage) · workflow · skill ·
   other_mcp · reply (no tool call).
   For write_edit, add a target class from the path WITHOUT storing the path: handoff (RESUME, KICKOFF, handoff,
   briefs), lessons (LESSONS), site (app/, components/, content/, lib/, public/, styles), planning (.planning/),
   harness (.claude/, scripts/), other.
6. CARRY COST, the real price of a tool result. For consecutive assistant messages t and t+1 in the same (sub)session:
   delta(t) = ctx(t+1) - ctx(t) - out(t), clamped at 0 (count the negatives). delta(t) is what the tool results after t
   added to the context, and every later call re-reads it until the session ends or compacts. A compaction is ctx
   falling by more than 40% between consecutive calls, or a compact-summary entry.
   carry(t) = delta(t) x (the number of calls remaining before the next compaction or the end) x that session's R.
   Attribute carry(t) to the tool class of message t.
7. Images: count image blocks in tool results (type "image"). Read width and height from the base64 header in memory
   (PNG IHDR; JPEG SOF0/SOF2) and write nothing else from it. Estimated tokens = ceil(w/28) x ceil(h/28), capped at
   4784. Per session, report the count, the estimated tokens, and the carry of image-bearing results.
8. Loops: a run of 5 or more consecutive assistant messages whose classes all fall in {bash, browser_shot,
   browser_other, search, text_read} is a verify/exec loop. Report the count, the lengths and the eq.
9. Instruction-file load (the doubled-stack question). Get the byte sizes of the files each stack auto-loads. Read them
   with normal file tools; they are not transcripts.
   - global: C:/Users/micah/.claude/CLAUDE.md
   - worktree stack: C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/{CLAUDE.md, AGENTS.md, .claude/CLAUDE.md}
   - main-checkout stack: C:/Users/micah/Code/micahjonesconsulting/{CLAUDE.md, AGENTS.md, .claude/CLAUDE.md}, whichever exist
   - memory index: C:/Users/micah/.claude/projects/C--Users-micah-Code-micahjonesconsulting/memory/MEMORY.md
   Calibration: the app measured this chat's "Memory files" at 9,660 tokens = global + worktree stack + MEMORY.md.
   Derive tokens per byte from that, and estimate the main-checkout stack in tokens. Then find the sessions whose `cwd`
   field changes from the main checkout to a worktree, and estimate the extra cache-read they paid: main-stack tokens x
   the calls after the move x R.

## Outputs (only these paths)
- `.planning/research/harness-2026-09-22/scripts/usage_audit.py` (Python 3 stdlib only; `C:/` style paths; run it with
  PYTHONIOENCODING=utf-8)
- `.planning/research/harness-2026-09-22/00-usage-audit.json` (every number)
- `.planning/research/harness-2026-09-22/00-usage-audit.md`, at most 12 KB, in this order:
  1. TOP BURN PATTERNS: the 10 largest, each with its eq tokens (direct + carry) and its share of the total eq across
     the selected sessions.
  2. T1 sessions: id8, dir suffix, first and last timestamp, main model, unique assistant messages, peak ctx,
     compactions, sums of in/cw/cr/out, eq, subagent eq.
  3. T2 by model: messages, sums, eq, share.
  4. T3 by tool class (main sessions): calls, direct eq, carry, share of the total.
  5. T4 images per session.
  6. T5 subagents: parent id8, the REQUESTED model (input.model) vs the ACTUAL model(s) in the subagent transcript,
     subagent_type, messages, tool calls, image blocks, sum of ctx, last ctx, eq. Flag every requested/actual mismatch.
  7. T6 fixed prefix: the ctx of each session's first assistant message, and the median of its first three.
  8. T7 long context: the eq share of calls with ctx > 200K and > 400K.
  9. T8 instruction files: bytes and estimated tokens per stack; the double-load sessions and their extra cost.
  10. Checks: totals by session = totals by model; lines vs unique messages; negatives clamped; anything you could not
      parse.

## Anchors (approximate. If one is off by more than 25%, report the discrepancy; do not tune the script to hit it)
- A desktop-app session's first call carries roughly 70-80K ctx (this chat's fixed prefix: 70.6K).
- The Pass-128c session (Opus 5, 2026-09-21/22) peaked near 456K ctx and opened about 23 images.
- One Fable juror subagent in that session was reported as "134,828 tokens, 7 tool uses". Say whether that figure
  matches its sum of ctx, its last ctx, or neither, and which model actually answered it.

## Finish
Run the script and check T10. Then print at most 40 lines: the top-10 list, the fixed-prefix median, the double-load
estimate, every requested/actual model mismatch, and anything anomalous. Do not paste file contents or transcript
content into your reply.
