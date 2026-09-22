# AI routing: micahjonesconsulting (the single source)

This file is the ONE place the model tiers, the model ids and the routing rules live (idea from Ordani's
`MODEL_TIERING.md`, 2026-09-21). `.claude/CLAUDE.md` carries a compact copy that loads every session. Two
SessionStart hooks put it in front of every session: `.claude/hooks/routing-reminder.py` prints the tiers and the
rules, and `.claude/hooks/budget-gate.py` prints the budget line. Both are wired in this branch's settings; for chats
that start in the main checkout, the routing reminder is also wired in that checkout's untracked
`.claude/settings.local.json` (LESSONS #50). Change routing HERE and in that compact copy, never in `~/.claude`
(operator 2026-09-20: "i dont want you messing with global things").

Harness v2 (2026-09-22) rewrote this top section: Opus 5.5 is the main model, Fable holds at most three gates per
arc, GLM is the standing executor under a guard, and a status file paces the Claude bars to their reset. The history
below it is unchanged.

## The rulings behind it (verbatim)
- 2026-09-20, evening: "I dont want deepseek to have such a main driver role and i dont want you messing with
  global things. i just want your permanet repo version to include deepseek. We need to be always [using] all the
  other models to lower claude usage and to get the best answers and highest quality outputs." (The bracketed word
  is his; it is on the brand.json banned list.)
- 2026-09-21: "Make sure the new chat permanetly has the deepseek in our ai routing. Think ordani has a great ai
  routing model tier thing. We are using lots of claude while we need to use deepseek alot, chatgpt, chatgpt, and
  gemeini to cut down on how much claude we use. Next chat will do this things and have the frontier models fable
  and astra and deepseek confirm quality"
- 2026-09-22, the Harness v2 popups: executor changes "go with all your recs"; budget changes "go your recs";
  wrappers "your recs"; context and visual QA "your recs".

## The tiers: who does what
| Work | First choice | Fallback | Never |
|---|---|---|---|
| Rulings, briefs, diff review, the LESSONS #3 ledger check, ship decisions, commits, the books | the main session: Opus 5.5 | Fable, for a phase-changing ruling only | any non-Claude model; any executor |
| Reading, summarising, sweeps, classifying, premise checks | DeepSeek: `deepseek-flash` for volume, `deepseek-v4-pro` for anything judged | Gemini; GLM when the read needs the repo | a Claude subagent |
| Drafting copy alternatives | TWO families in parallel: `deepseek-v4-pro` and Sol (Gemini as a third when useful) | | Claude drafting |
| Mechanical execution: builds, captures, measuring, fix rounds, gate runs | GLM 5.3 in a worktree (`claude-glm.ps1 -Batch`, pointer brief, executor guard, receipt, digest); Opus 5.5 reviews the diff | Sol (`codex-exec.ps1 -Task`) when GLM is capped; a Sonnet subagent only when the leg needs Chrome or this session's context | Opus or Fable running the loop |
| Judgment-bearing execution: interaction or motion logic, anything a brief cannot spell out | an Opus 5.5 subagent (`model: "opus"`) working in the worktree | | GLM, DeepSeek, Gemini |
| Writing copy with non-ASCII characters into source | the main session | | any executor (LESSONS #46) |
| Visual QA | the deterministic chain (`scripts/harness/visual-qa.mjs`, `scripts/harness/visual_qa.py`), then Opus 5.5 pre-screens ONE downscaled contact sheet | | raw screenshot dumps to any model |
| QUALITY CONFIRMATION at every design or copy checkpoint | THREE independent reads: Fable (one call per gate, at most 3 gates per arc, digest in, images before text), Astra (`codex-exec.ps1 -Review`, one run at a time), `deepseek-v4-pro` | Gemini as a fourth, never the only juror | a single PASS |
| Cross-review of a plan or a diff | `scripts/cross-review/run_cross_review.py --legs deepseek,glmcc,gemini` (add codex while ChatGPT has room) | | |

## Model ids (pin them here, nowhere else)
- Claude: `opus` = `claude-opus-5-5` (Opus 5.5, the main session; the alias resolves to it as of 2026-09-22,
  premise check P7), `fable` = `claude-fable-5-1` (gates only), `sonnet` = `claude-sonnet-5`. Haiku takes no leg.
  An explicit Agent `model: "fable"` is NOT overridden by `CLAUDE_CODE_SUBAGENT_MODEL`, and the shorthand resolves
  (premise checks P4 and P5, commit `b2bfbf9`).
- ChatGPT: Astra = `gpt-6-astra` (the juror, `-Review`), Sol = `gpt-5.6-sol` (executor and drafter, `-Task`, or
  `-Review -Model gpt-5.6-sol` to draft read-only). Both through `scripts/codex-exec.ps1` and the ChatGPT login.
- DeepSeek: `deepseek-flash`, `deepseek-v4-pro`, through `scripts/deepseek-exec.ps1`. Confirm ids with `-Models`.
- Gemini: through `scripts/gemini-exec.ps1`, which moves down its fallback chain on a 429, a 404 or an empty reply.
  Confirm ids with `-Models`. The cross-review leg uses `gemini-2.5-flash`.
- GLM 5.3: `scripts/claude-glm.ps1` (z.ai Coding Plan), the standing executor.

## Commands
- GLM, execute a brief: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/claude-glm.ps1 -Batch -PromptFile <pointer.md> -Dir <worktree> [-Scope harness]`
  The pointer prompt names the brief (prompts over 30000 characters are refused). Every run leaves a line in
  `%LOCALAPPDATA%\harness\micahjonesconsulting\dispatch.jsonl` and a receipt in `...\receipts\`.
- DeepSeek: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -PromptFile <f> -Out <f> -Model deepseek-v4-pro -MaxTokens 48000`
  (the 8000 default returns an EMPTY answer: both tiers are reasoning models). Every call is priced into the ledger.
- Gemini: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/gemini-exec.ps1 -PromptFile <f> -Out <f>`
- Sol, execute: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/codex-exec.ps1 -Task <brief> -Dir <worktree> -Model gpt-5.6-sol`
- Sol, draft (read-only): `... scripts/codex-exec.ps1 -Review -Prompt <f> -Out <f> -Model gpt-5.6-sol -Effort high`
- Astra, judge: `... scripts/codex-exec.ps1 -Review -Prompt <f> -Out <f> -Image a.png,b.png` (one Codex run at a
  time: a lockfile refuses the second).
- Fable, a gate: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/fable-gate.ps1 -Digest <d.json> -Question <q.md> -Out <v.md> [-Images sheet.png]`
  (lean boot, images before text, several judgments per call, at most 3 per arc; it needs his `claude` CLI login),
  or one `Agent` call with `model: "fable"` and its input written to a file first.
- Budget: after every `get_usage`, `python scripts/harness/status.py claude --five-hour N --weekly N --fable N --resets <ISO>`;
  `python scripts/harness/status.py show` prints the tier and the pace.

## The rules
1. Before any Claude leg (an `Agent` or `Workflow` call), say which non-Claude model cannot do it and why. The
   honest reasons are: it needs repo tools inside this session, it needs Chrome, it is judgment-bearing execution,
   or it is the Fable taste gate.
2. Every `Agent` call and every agent inside a `Workflow` names its `model`. Nothing inherits the session model.
   (`CLAUDE_CODE_SUBAGENT_MODEL=sonnet` in `.claude/settings.json` catches unnamed calls; an explicit `model:` wins
   over it.)
3. LEGS stamp. Every checkpoint report, and every commit that changes site copy or design, ends with the legs that
   actually ran: `LEGS: fable=N astra=N dspro=N dsflash=N gemini=N sol=N glm=N sonnet=N opus=N`. Never report a
   leg that did not run; a dead leg is reported as dead.
4. Quality is confirmed by Fable, Astra and `deepseek-v4-pro`, each read independently. When they split, the
   operator gets each model's pick BY NAME (he asked for exactly that on 2026-09-21) with the main session's
   tie-break and its reason.
5. Budget. `get_usage` at boot and before any Claude fan-out; say the numbers and record them with `status.py
   claude`. The SessionStart budget line gives the tier and the pace to the reset. Weekly all-models at 75% or
   more: Claude only for the ledger, ship calls, diff review and the taste gate, and the budget hook denies Claude
   subagent spawns (he overrides with "budget ok"). At 90%: only in-flight production containment. Weekly Fable at
   70% or more: Fable only for phase-changing verdicts; at 90%: no Fable. 5-hour at 80% or more: no new Opus or
   Fable spawns until it rolls off. Pace aims to reach 85% of each weekly bar at its reset, not sooner.
6. Executors never write non-ASCII copy (Sol turned a U+2019 into "?", LESSONS #46); the main session does.
7. No executor reinterprets an expected value or calls a surprising result intended (LESSONS #25, #46).
8. Executors run under the guard (`.claude/hooks/executor-guard.py`): inside their worktree only; no commits; no
   books (RESUME, memory, LESSONS); no constitution; no secrets; no Fable spend; no subagents; no MCP. `-Scope
   harness` opens the harness files and is only for harness briefs. Every run ends with an 8 KB digest. The main
   session reads the digest and the diff, never the raw transcript, and checks the diff against the brief's
   `## Files` list (`python scripts/harness/diff_scope.py <brief>`).
9. Sessions. Keep a chat under 200K context: at 200K the context hook says so, and the chat finishes its unit,
   rewrites the RESUME, writes a kickoff in `.planning/handoff/` and ends with `/clear`. Open every new chat inside
   its worktree, not the main checkout, where the instruction stack loads a second time.
10. Images. The main session opens at most 7 raw images per chat; the image hook asks before the 8th. Past that,
    build one downscaled contact sheet (`python scripts/harness/visual_qa.py --sheet`). Images go before text in
    any juror call.
11. Mechanical loops. After 40 consecutive execution calls on Opus (12 on Fable) with no message from the operator,
    the tier-burn hook denies the next one: write the rest as a brief for GLM. A 4th Fable call in one arc needs
    his "fable ok".
12. Effort by role: medium for mechanical and bookkeeping legs, high for rulings, briefs and diff review, xhigh for
    the one hardest debug. Never carry an old effort setting across a model change.

## Per-model traps
- DeepSeek: pass `-MaxTokens 32000` or more. `deepseek-exec.ps1` has no tools and no files: paste the text in. Its
  Anthropic endpoint does run Claude Code as a tool-using worker (smoke PASS 2026-09-22, commit `4dddde3`); that use
  is NOT adopted, on data residency, and both research reports reject it. Never send client rows, personal data or
  keys (a third-party provider outside the US). A balance under $5 holds volume work.
- GLM 5.3: it can think silently for 8 minutes or more before its first action on a dense brief (MJCONSULT 13,
  2026-09-22), so a quiet process is not a hung one. Make the first action of every run a short pre-flight print.
  Two GLM runs at once is the ceiling he approved on 2026-09-22; on the first 429, back off to one and record the
  reset (`status.py glm-429`; the stamp in the error is Shanghai time).
- Sol and Astra (Codex): cannot commit inside a git worktree (LESSONS #18) and write only inside `-Dir`. The Windows
  shell mangles non-ASCII. One Codex run at a time: parallel runs locked the Windows sandbox account (error 1909,
  `CreateProcessWithLogonW failed`, 2026-09-21). This machine locks that account for 10 minutes after 10 failed
  logons; `-Review` without commands still answers while it is locked. The fix is to wait 10 minutes, or the
  operator unticks "Account is locked out" in lusrmgr.msc; never change the policy. `-Search` passes Codex's live
  web search (its top-level `--search`). A `-Dir` outside a git repo is refused ("Not inside a trusted directory").
  Astra is rationed to quality gates.
- Gemini: 2.5 models can spend the output budget on thinking; an empty answer with MAX_TOKENS is a budget problem,
  and the wrapper does not fall back on it. Free-tier prompts may be used for training: public material only.
  Quotas are per model: gemini-2.5-flash returned HTTP 429 after about 15 image calls at concurrency 6 (2026-09-21)
  while gemini-3-flash-preview and gemini-3.1-flash-lite still answered. `-Image a,b` attaches screenshots.
- Fable: `claude -p` on his Claude account needs a live CLI login (it had expired on 2026-09-22). A subagent boots at
  about 78K tokens, all cache-write with a 5-minute TTL (MJCONSULT 13, 2026-09-22), so batch several judgments into
  one gate rather than counting on a warm session.

