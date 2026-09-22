# Kickoff: harness research. Carry the week on the other models, keep frontier quality (2026-09-22)

Written 2026-09-22 by the Opus 5 session that ran Pass-128c, at the operator's request, verbatim: "I need you to give me
a prompt for fable research to go deep into our harness and see any improvements we can make so really take
advantanage of the other models and maintain claude useage until saturday . I want top frontier model quality tho when
it comes to the planning, orchestration, and output."

INPUT FIRST (operator 2026-09-22: "i need the research prompt here it wont read a repo or my pc - its chat"): the web
research runs in a Fable chat with `.planning/handoff/FABLE-RESEARCH-PROMPT-HARNESS.md`, which cannot read the repo.
Its report is this chat's first input: verify each of its claims against the repo before adopting or dismissing it
(LESSONS #1), then run the measurement and proposals below, using the report's estimates as hypotheses to confirm.

This chat is RESEARCH and PROPOSALS about the operating harness. It changes no site code, pushes nothing, deploys
nothing. The Pass-128c work (`NEXT-SESSION-KICKOFF.md`) and the landing exemplar (`KICKOFF-LANDING-EXEMPLAR.md`) are
other chats; do not do their work here.

## 0. The budget this research lives inside (his words, 2026-09-22, verbatim)
"Claude usage is at 70% for the week and fable is at 73. chatgpt has only 8% left for 4 days and 7 hours. GLM is
completely reset, deepsek has 11.94$ left in credits from the 20$ i had added and we spent around 12 mil tokens within
this project and two other projects. Without claude reset on Saturday at 1am - we have to tread lightly."
(get_usage minutes later: weekly all-models 71%, Fable 73%, both reset 2026-09-26 01:00 PDT.) So:
- CLAUDE (the main session and any Fable call): planning, orchestration, rulings, the final synthesis. Nothing a script
  or another model can do. `get_usage` at start and before every Claude leg; say the numbers. At 75% of either weekly
  bucket, Claude narrows to the ledger, ship calls and the taste gate (AI_ROUTING rule 5).
- FABLE: exactly TWO calls, each an `Agent` with `model: "fable"` and its input written to a file first. Gate A:
  critique the research plan before any reading starts. Gate B: write the ranked proposals from the audit and the map.
  If you, the main session, ARE Fable: skip those subagent calls, keep your own tool calls under 25, and never open raw
  transcripts or images yourself.
- GLM 5.3 (fresh quota; a Claude Code process on z.ai with its own tools, so it can read files and run scripts): the
  default reader and executor here. Smoke first:
  `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Smoke`; runs:
  `... scripts/claude-glm.ps1 -Batch -PromptFile <file> -Dir <p106-live>`. One run at a time, small runs (LESSONS #36).
- DEEPSEEK ($11.94 left, pay-as-you-go): cap this research at $3. `deepseek-flash` for volume, `deepseek-v4-pro` for
  ONE independent read of the proposals, `-MaxTokens 32000` or more. Text only, and never raw transcripts (section 3).
- GEMINI (per-model free quotas, multimodal): the second independent reader of the proposals, and any visual.
- CHATGPT (Sol and Astra, 8% for about 4 days 7 hours): DO NOT USE in this research. It is kept for a ship gate.

## 1. The question
Where does Claude usage actually go on this repo, and which harness changes move that work to GLM, DeepSeek, Gemini
and plain scripts without lowering the quality of rulings, briefs, design and copy verdicts, and ship calls? Deliver
changes that can be live well before Saturday 01:00 PDT and stay useful after the reset.

## 2. Seeds (measured 2026-09-21/22 in the Pass-128c chat; verify, then build on them)
- One Fable juror call with six images cost 134,828 subagent tokens (7 tool uses, 3.9 min); the read itself is in
  `.planning/reviews/PASS-128C-JURY-DISPOSITION.md`.
- The Pass-128c main session (Opus 5) opened 23 images itself (2 contact sheets, 20 screenshots, 1 photo) and did the
  brief pre-flight and a trace analysis in its own context; it held 409K tokens of context at the jury stage and 456K
  at handoff. Weekly all-models went 68% -> 71% and Fable 72% -> 73% during it, with the landing-exemplar chat running
  in parallel.
- Sol's one brief run cost 187,218 ChatGPT tokens (`.planning/exec/sol-128c.log`).
- A chat that starts in the main checkout and moves into a worktree loads two CLAUDE.md stacks (the main checkout's
  and the worktree's), plus the global layer, on every turn. Measure that overhead.
- Three briefs in a row carried expected values that failed on their own terms (LESSONS #52), and the main session
  paid for the pre-flight itself.

## 3. What gets read, and by whom
The main session reads ONLY this file, `.claude/RESUME.md`, `.claude/AI_ROUTING.md`, and the digests the other models
write. GLM (or a script it writes) reads everything else:
- Repo harness: `CLAUDE.md`, `AGENTS.md`, `.claude/CLAUDE.md`, `.claude/AI_ROUTING.md`, `.claude/settings.json`,
  `.claude/hooks/*`, `.claude/briefs/README.md`, `.claude/STANDING_TECHNIQUES.md`, `docs/LESSONS_LEARNED.md` (#1-#52;
  routing-heavy: #18, #25, #36, #37, #45-#52), `docs/DESIGN_BAR.md`, `scripts/codex-exec.ps1`,
  `scripts/deepseek-exec.ps1`, `scripts/gemini-exec.ps1`, `scripts/claude-glm.ps1`, `scripts/cross-review/`,
  `.planning/exec/prepush-gates.mjs`, and the premium-web plugin's hooks and agents (`~/Code/premium-web-harness`).
- The landing-exemplar worktree, READ-ONLY (its chat is live): its AI_ROUTING traps, the DeepSeek map-reduce synthesis
  chain, the quote and citation gates, the GLM digest builder (`.claude/worktrees/landing-exemplar/`).
- Ordani's tiering, which the operator named as the model to learn from:
  `C:/Users/micah/birthflowV2/birthflowV2/.claude/MODEL_TIERING.md`.
- The global layer, READ-ONLY (operator 2026-09-20: "i dont want you messing with global things"):
  `~/.claude/CLAUDE.md`, `~/.claude/MODEL_ROUTING.md`, `~/.claude/ULTRACODE_OPERATING_PATTERNS.md`,
  `~/.claude/playbooks/`.
- Usage evidence: the session transcripts (JSONL) in `~/.claude/projects/C--Users-micah-Code-micahjonesconsulting*`
  (the main checkout and each worktree), the last 5-7 sessions. A LOCAL script (GLM writes it, node or python) tallies
  per session and per assistant message: input, cache-read, cache-write and output tokens, the model, and the tool
  called (an image Read vs a text Read, Bash, Agent with its model, Write/Edit). It sorts turns into activity classes:
  image viewing, file reading, tool-output dumps, subagent calls, verification loops, popups and rulings, handoff
  writing. Commit the script and its output tables.

PRIVACY, a hard rule: the transcripts hold the operator's own words and at least one exposed key (AI_ROUTING,
2026-09-20). No raw transcript text leaves this machine. DeepSeek and Gemini see ONLY aggregated numbers and the
digests: never message text, never file contents that hold secrets, never client data.

## 4. Method (Fable critiques it at gate A before anything runs)
1. Boot: `get_usage`; smoke GLM, DeepSeek (`-Smoke`) and Gemini (`-Smoke`); say the numbers.
2. Gate A: write `.planning/research/harness-2026-09-22/plan.md` (this section plus your adjustments); one Fable call
   critiques it; adopt or dismiss each point, with the reason written down.
3. GLM leg 1: the usage-audit script and its tables -> `00-usage-audit.md`: the top burn patterns, each with its token
   count and its share of the total.
4. GLM leg 2: the harness map -> `01-harness-map.md`: every rule, hook, script and routing clause with its file:line,
   what it costs Claude per session, and whether it is enforced (a hook or a gate) or prose only.
5. Candidates: GLM and `deepseek-flash` each draft improvement candidates from 00 and 01, independently (Claude does
   not draft them); a script merges and de-duplicates them into `02-candidates.md`.
6. Gate B: one Fable call writes `02-proposals.md`, ranked. For each proposal: the change at file level; the Claude
   tokens it saves, computed from the audit; the quality risk and the deterministic check that covers it; who
   executes it; repo-level or global (global items are listed for his ruling, never done); effort. It also carries a
   one-page "tread lightly until Saturday" interim routing.
7. Independent reads of 02-proposals: `deepseek-v4-pro` (one call) and Gemini (one call) -> `03-reads.md`; each pick by
   name, then the main session's tie-break and its reason.
8. Popup to the operator, two questions at a time, recommended first: which proposals to implement now, and the
   interim routing. His words go into LESSONS #3 verbatim.
9. Write `.claude/briefs/harness-2026-09-22-implement.md` for GLM: exact changes, and verification commands with
   expected output, pre-flighted in GLM's own shell (LESSONS #52). Commit it and hand GLM the brief. The routing
   ruling, once made, goes into `.claude/AI_ROUTING.md` as a dated amendment and into its compact copy in
   `.claude/CLAUDE.md`.

## 5. Ideas to test, not to assume (each needs a number from 00 or a file:line from 01)
- Visual QA off Claude: Gemini (multimodal) or GLM reads screenshots and contact sheets against a written checklist
  and returns text; Claude sees at most one downscaled montage, at the final gate only.
- GLM as the default executor while it has quota (briefs, builds, probes, captures); Sol and Astra kept for ship gates.
- Budget meters: `deepseek-exec.ps1` prints the cost of each call and a running total, with a hard cap;
  `codex-exec.ps1` refuses without an explicit flag while ChatGPT is low; a SessionStart line shows every vendor's
  remaining budget from a small JSON the operator or the scripts update.
- Context hygiene: the per-turn cost of the doubled CLAUDE.md stack; a handoff at a context threshold; digests instead
  of re-reads; smaller juror inputs (one montage, text-first evidence).
- Brief pre-flight done by GLM in the executor's shell, not by the main session.
- A PreToolUse hook that warns the main session before it Reads more than N images in a turn, or a PNG over a size,
  and points to the Gemini or GLM visual leg.
- Whatever the landing-exemplar chat or Ordani already does better.

## 6. Quality bar ("top frontier model quality")
Every claim in 02-proposals carries a number from the audit or a file:line. Every proposal has a deterministic check.
The reads are independent and reported by name. No proposal moves a ruling, a brief, a ship call, the LESSONS #3 ledger
check, or a non-ASCII copy write (LESSONS #46) off the main session or Fable. What changes is who does the grunt work
and how much Claude reads, never who decides.

## 7. Boundaries
Work in the p106-live worktree (`design/live-evolve`); the write guard is live (LESSONS #49). Write only under
`.planning/research/harness-2026-09-22/`, the brief, `.claude/RESUME.md`, `docs/LESSONS_LEARNED.md`, and, after his
ruling, `.claude/AI_ROUTING.md` and the `.claude/CLAUDE.md` compact copy. Never `~/.claude`. No site code, no push, no
deploy. Every commit names its paths (LESSONS #23) and ends with a LEGS stamp. Do not touch the Pass-128c decisions
(the door edge, the phone preview) or the landing exemplar.

## Micah: open the new chat
In the Code tab choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/KICKOFF-HARNESS-RESEARCH.md and follow it.`

Opus 5 orchestrates. Fable writes the plan critique and the final ranking in two calls, which keeps Fable's quality
where it counts at a fraction of its bucket. If you pick Fable as the main model instead, section 0 covers that case.
