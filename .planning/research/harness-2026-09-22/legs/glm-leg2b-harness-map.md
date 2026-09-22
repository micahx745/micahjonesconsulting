# GLM leg 2b: the harness map (harness research 2026-09-22)

Amended 2026-09-22 by the main session of `harness/v2` (LANDING PAGE 2's successor), before the run: this worktree
runs the Harness v2 executor guard, which denies reads outside the worktree, the state dir and the temp dir, and
denies WebFetch. So every source outside this repo is read from a staged copy under
`C:/Users/micah/AppData/Local/harness/micahjonesconsulting/map-inputs/` (`MANIFEST.tsv` there maps each copy to its
original path; cite the ORIGINAL path in every file:line), and `01-premise-checks.md` is not yours to write.

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
- the premium-web plugin, `C:/Users/micah/Code/premium-web-harness` (hooks and agents), READ-ONLY: the copies under
  `map-inputs/premium-web/`;
- the global layer, READ-ONLY: `C:/Users/micah/.claude/CLAUDE.md`, `C:/Users/micah/.claude/MODEL_ROUTING.md`,
  `C:/Users/micah/.claude/ULTRACODE_OPERATING_PATTERNS.md`, `C:/Users/micah/.claude/playbooks/*.md`: the copies under
  `map-inputs/global/`.
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
  READ-ONLY) do better than this repo. Each item needs a file:line, and whether this repo could reuse it as is. Read
  the landing and Ordani sources from `map-inputs/landing/` and `map-inputs/ordani/` (the landing copies are the
  branch `design/landing-exemplar` as committed).
- This repo now carries Harness v2 (runs A to G on branch `harness/v2`): map its hooks and scripts as they stand.

## `01-premise-checks.md`: not in this run
P3 needs WebFetch, which the executor guard denies: the main session does it. P6 is settled (`f8538ce`). Do not open
or write this file.

## Finish
Delete `01-harness-map.rows.tmp`. Print at most 25 lines: the count of rows, of PROSE ONLY rules, and of
contradictions. Do not paste file contents into your reply.
