# GLM leg 2b: the harness map (harness research 2026-09-22)

You are an executor. Write only the outputs named below. Do not commit, push, or edit any other file. Work in the
directory you were launched in (`claude-glm.ps1 -Dir`); every repo path below is relative to it, and "this repo" means
that tree. It must contain the research inputs from `design/live-evolve` at `f8538ce` or later. Privacy: never open a `.jsonl` transcript, a
key or credentials file, `C:/Users/micah/.claude.json`, or any `settings*.json` (`01a-hooks-diet-boot.md` already holds
the hooks, from a script that prints allow-listed fields only).

## Context budget (your window is 200K)
Many sources are large. For any file over 20 KB, grep its headings first (`^#`) and read only the sections that state
rules. `docs/LESSONS_LEARNED.md` is very large: never read it whole. Grep its entry headings for #1-#52, and read the full
text of #18, #25, #36, #37 and #45-#52 only. Append rows to `.planning/research/harness-2026-09-22/01-harness-map.rows.tmp`
as you go, so a compaction loses nothing, and assemble the final file at the end.

## `01-harness-map.md` (at most 15 KB)
One table row per rule, hook, script or routing clause in:
- this repo: `CLAUDE.md`, `AGENTS.md`, `.claude/CLAUDE.md`, `.claude/AI_ROUTING.md`, `.claude/hooks/*`,
  `.claude/briefs/README.md`, `.claude/STANDING_TECHNIQUES.md`, `docs/LESSONS_LEARNED.md` (the entries above),
  `docs/DESIGN_BAR.md` (rules R1-R15, one row each), `scripts/codex-exec.ps1`, `scripts/deepseek-exec.ps1`,
  `scripts/gemini-exec.ps1`, `scripts/claude-glm.ps1`, `scripts/cross-review/`, `.planning/exec/prepush-gates.mjs`;
- the premium-web plugin, `C:/Users/micah/Code/premium-web-harness` (hooks and agents), READ-ONLY;
- the global layer, READ-ONLY: `C:/Users/micah/.claude/CLAUDE.md`, `C:/Users/micah/.claude/MODEL_ROUTING.md`,
  `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`, `C:/Users/micah/.claude/playbooks/*.md`.
Columns: id · file:line · the rule in 15 words or fewer · loaded every turn? (bytes, and tokens = bytes x the
tokens-per-byte in `00-usage-audit.json` if it has one, else bytes / 3.6) · enforced by (a hook or gate, file:line) or
PROSE ONLY · duplicates or contradicts (ids).

After the table:
- (a) Contradictions and stale clauses, both sides quoted with file:line. Include the model ids: on 2026-09-22 this
  chat measured `opus` resolving to claude-opus-5-5 and `fable` to claude-fable-5-1, and an explicit Agent model was
  NOT overridden by `CLAUDE_CODE_SUBAGENT_MODEL` (`smoke/subagent-probe.txt`). Flag every clause that says otherwise.
- (b) The budget meters that exist today: does `deepseek-exec.ps1` print the cost of a call; does `codex-exec.ps1`
  have a lockfile or a refuse flag; does any hook show a vendor's remaining budget.
- (c) What the landing-exemplar worktree (`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/landing-exemplar/`,
  READ-ONLY; its chat is live: its AI_ROUTING traps, the DeepSeek map-reduce synthesis chain, the quote and citation
  gates, the GLM digest builder) and Ordani (`C:/Users/micah/birthflowV2/birthflowV2/.claude/MODEL_TIERING.md`,
  READ-ONLY) do better than this repo. Each item needs a file:line, and whether this repo could reuse it as is.

## `01-premise-checks.md` (at most 6 KB)
- P3: WebFetch https://code.claude.com/docs/en/memory and quote, with the URL, the sentence that says which CLAUDE.md
  files load for a session whose cwd is a worktree nested inside the main checkout (`<main>/.claude/worktrees/<name>`).
  Note that this chat started in the worktree, and its context listed only the global file, the worktree's CLAUDE.md,
  AGENTS.md and `.claude/CLAUDE.md`, and MEMORY.md. If the page will not load, say so; do not guess.
- P6: quote LESSONS #36 and #37 with file:line. Then one paragraph: the rule they set about who opens captures, why,
  and what any "visual QA off Claude" proposal must keep.
Each item: a verdict line, then the evidence as file:line or a command with its first output line.

## Finish
Delete `01-harness-map.rows.tmp`. Print at most 25 lines: the count of rows, of PROSE ONLY rules, and of
contradictions, plus the P3 and P6 verdicts. Do not paste file contents into your reply.
