# AI routing: micahjonesconsulting (the single source)

This file is the ONE place the model tiers, the model ids and the routing rules live (idea from Ordani's
`MODEL_TIERING.md`, 2026-09-21). `.claude/CLAUDE.md` carries a compact copy that loads every session; a
SessionStart hook (`.claude/hooks/routing-reminder.py`) prints the table into every session. Change routing
HERE and in that compact copy, never in `~/.claude` (operator 2026-09-20: "i dont want you messing with global
things").

## The rulings behind it (verbatim)
- 2026-09-20, evening: "I dont want deepseek to have such a main driver role and i dont want you messing with
  global things. i just want your permanet repo version to include deepseek. We need to be always [using] all the
  other models to lower claude usage and to get the best answers and highest quality outputs." (The bracketed word
  is his; it is on the brand.json banned list.)
- 2026-09-21: "Make sure the new chat permanetly has the deepseek in our ai routing. Think ordani has a great ai
  routing model tier thing. We are using lots of claude while we need to use deepseek alot, chatgpt, chatgpt, and
  gemeini to cut down on how much claude we use. Next chat will do this things and have the frontier models fable
  and astra and deepseek confirm quality"

## The tiers: who does what
| Work | First choice | Fallback | Never |
|---|---|---|---|
| Reading, summarising, sweeps, classifying, premise checks | DeepSeek: `deepseek-flash` for volume, `deepseek-v4-pro` for anything judged | Gemini | a Claude subagent |
| Drafting copy alternatives | TWO families in parallel: `deepseek-v4-pro` and Sol (Gemini as a third when useful) | | Claude drafting |
| Builds, captures, measuring, fix rounds, gate runs | Sol (`codex-exec.ps1 -Task`) | GLM 5.3 when up; a Sonnet subagent only when the leg needs Chrome or this session's context | Opus or Fable |
| Writing copy with non-ASCII characters into source | the main session | | any Codex executor (LESSONS #46) |
| The LESSONS #3 ledger check, ship decisions, briefs, rulings, commits | the main session (Opus) | | any non-Claude model |
| QUALITY CONFIRMATION at every design or copy checkpoint | THREE independent reads: Fable (one call), Astra (`codex-exec.ps1 -Review`), `deepseek-v4-pro` | Gemini as a fourth | a single PASS |
| Cross-review of a plan or a diff | `scripts/cross-review/run_cross_review.py` (gemini, codex, deepseek; glm when funded) | | |

## Model ids (pin them here, nowhere else)
- Claude: `fable` (claude-fable-5-1), `opus` (claude-opus-5), `sonnet` (claude-sonnet-5). Haiku takes no leg.
- ChatGPT: Astra = `gpt-6-astra` (the juror, `-Review`), Sol = `gpt-5.6-sol` (executor and drafter, `-Task`, or
  `-Review -Model gpt-5.6-sol` to draft read-only). Both through `scripts/codex-exec.ps1` and the ChatGPT login.
- DeepSeek: `deepseek-flash`, `deepseek-v4-pro`, through `scripts/deepseek-exec.ps1`. Confirm ids with `-Models`.
- Gemini: through `scripts/gemini-exec.ps1`; ids confirmed with `-Models` (see that script's STATUS line). The
  cross-review leg uses `gemini-2.5-flash`.
- GLM 5.3: `scripts/claude-glm.ps1` (z.ai Coding Plan), overflow only.

## Commands
- DeepSeek: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deepseek-exec.ps1 -PromptFile <f> -Out <f> -Model deepseek-v4-pro -MaxTokens 48000`
  (the 8000 default returns an EMPTY answer: both tiers are reasoning models).
- Gemini: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/gemini-exec.ps1 -PromptFile <f> -Out <f>`
- Sol, execute: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/codex-exec.ps1 -Task <brief> -Dir <worktree> -Model gpt-5.6-sol`
- Sol, draft (read-only): `... scripts/codex-exec.ps1 -Review -Prompt <f> -Out <f> -Model gpt-5.6-sol -Effort high`
- Astra, judge: `... scripts/codex-exec.ps1 -Review -Prompt <f> -Out <f> -Image a.png,b.png`
- Fable: one `Agent` call with `model: "fable"`, its input written to a file first.

## The rules
1. Before any Claude leg (an `Agent` or `Workflow` call), say which non-Claude model cannot do it and why. The
   honest reasons are: it needs repo tools inside this session, it needs Chrome, or it is the Fable taste gate.
2. Every `Agent` call and every agent inside a `Workflow` names its `model`. Nothing inherits the session model.
   (`CLAUDE_CODE_SUBAGENT_MODEL=sonnet` in `.claude/settings.json` is the safety net, not the plan.)
3. LEGS stamp. Every checkpoint report, and every commit that changes site copy or design, ends with the legs that
   actually ran: `LEGS: fable=N astra=N dspro=N dsflash=N gemini=N sol=N glm=N sonnet=N`. Never report a leg that
   did not run; a dead leg is reported as dead.
4. Quality is confirmed by Fable, Astra and `deepseek-v4-pro`, each read independently. When they split, the
   operator gets each model's pick BY NAME (he asked for exactly that on 2026-09-21) with the main session's
   tie-break and its reason.
5. Budget. `get_usage` at boot and before any Claude fan-out; say the numbers. At 75% of the Claude weekly
   (all-models or Fable) window: Claude only for the ledger, ship calls and the taste gate; everything else to
   DeepSeek, Sol, Gemini and GLM. At 90%: only in-flight production containment.
6. Executors never write non-ASCII copy (Sol turned a U+2019 into "?", LESSONS #46); the main session does.
7. No executor reinterprets an expected value or calls a surprising result intended (LESSONS #25, #46).

## Per-model traps
- DeepSeek: pass `-MaxTokens 32000` or more. No tools and no files: paste the text in. Never send client rows,
  personal data or keys (a third-party provider).
- Sol and Astra (Codex): cannot commit inside a git worktree (LESSONS #18) and write only inside `-Dir`. The Windows
  shell mangles non-ASCII. Astra is rationed to quality gates.
- Gemini: 2.5 models can spend the output budget on thinking; an empty answer with MAX_TOKENS is a budget problem.
- GLM: overflow only, one run at a time.

## History (the dated routing rulings, verbatim, moved here from `.claude/CLAUDE.md` on 2026-09-21)

## Model routing — reset 2026-09-04
Operator ruling, 2026-09-04, verbatim: "leave the main model on fable 5.1 ultracode but us
opus as subagents for majority of the work ... having fable guide all other models doing the
grunt work."

So: **Fable 5.1 is the main model and stays there.** It rules, writes briefs, and judges at
the named checkpoints. It does not run build, deploy, playwright or screenshot loops.
**Opus was the default subagent** (`CLAUDE_CODE_SUBAGENT_MODEL=opus` in
`.claude/settings.json` until 2026-09-11; it is `sonnet` now, see the last amendment) and did the majority of the
work: execution briefs, verification, sweeps, research legs. Still name `model:` on every
Agent and Workflow call: `opus` for execution and verification, `sonnet`/`haiku` only for
trivial lookups, `fable` never from a subagent (the main model IS Fable; fan-out inheriting
Fable is what ended the 5-hour window). What Fable caught on this repo and why it stays on
top: the services-page rebuild, the popularity-badge claim, the title-card timing bug.

Full policy: `C:/Users/micah/.claude/MODEL_ROUTING.md`. The arc shape below is unchanged.

**Amended 2026-09-07 — the executor tier (operator: "this consuming our usage at a fast
rate … I got a z.ai account to use their frontier model to do some grunt work … And maybe
Sonnet 5 too. But we need to produce at a fable 5.1 ultracode level").** Four tiers now:
1. **Fable 5.1 (this session):** rulings, briefs, the JUDGE look at named checkpoints. It
   does not run build/verify/screenshot loops and does not read whole transcripts.
2. **GLM executor (a second Claude Code process via `scripts/claude-glm.ps1`, z.ai Coding
   Plan):** executes `.claude/briefs/*.md` verbatim: builds, fix rounds, verify scripts,
   encodes, screenshots, polish. Its usage is z.ai's quota, not this one. It never rules.
3. **Opus (subagent, in-session):** only where taste or judgement inside execution matters
   and the executor is not running: design-critique legs, the first port of a new pattern.
4. **Sonnet 5 / Haiku (subagents, in-session):** research legs, lookups, mechanical
   verifiers that re-measure a spec. Every Workflow verify/measure leg names `sonnet`
   unless the leg has to look at screenshots as a juror (then `opus`).
Secrets: the z.ai key lives in the user env var `ZAI_CODING_KEY`, set by the operator in
his own shell; it never appears in a chat, a settings file, or a commit. The cross-review
REST leg keeps its own pay-as-you-go key (`GLM_API_KEY`/`ZAI_API_KEY`, or the gitignored
`.claude/.zai-key`) because the Coding Plan's usage policy forbids scripted calls.

**Amended 2026-09-07, same day — three executors and a juror (MODEL_ROUTING §8).** The
operator added ChatGPT Pro (5× Codex usage, weekly reset). Routing: **Codex / gpt-6-astra**
is THE JUROR for every design and copy checkpoint (images attached, `scripts/codex-exec.ps1
-Review`) and the second executor for briefs needing judgement inside execution (`-Brief`,
xhigh); **GLM 5.3** (z.ai Coding Plan, `scripts/claude-glm.ps1`, key = the account's
existing `~/.claude/.zai-key`) runs the mechanical rounds AND the reader/drafter legs;
**Sonnet** is the default in-session leg; **Opus** only when no executor is running;
**Fable** rules, briefs, judges. Spend Codex: its quota resets weekly. (Kimi was named and
withdrawn the same day — the operator had confused it with GLM.)

**Amended 2026-09-08 — Astra is rationed (MODEL_ROUTING §9).** Operator, verbatim: "lots of
sol and only altra for qualty gates. altra is only top tier model we have - fable gone for few
days. we are at 29% chatgpt usage and 6 dayd till reset". So: Astra judges, it does not execute;
a long `codex exec` run of a brief is forbidden while the quota is shared. GLM 5.3 executes
briefs, Sonnet does the measuring and verifying, Opus rules and briefs in Fable's absence.

**Amended 2026-09-11: Claude usage is the bucket to conserve (MODEL_ROUTING §9d).** Operator,
verbatim: "Biggest thing is making sure we dont burn thru usage on this account while still
leveraging fable and opus in critical areas. the other Ais especially glm 5.3 will be very
helpful in this." So: GLM 5.3 executes; Sol (`gpt-5.6-sol`, ChatGPT) drafts, and executes when
GLM is capped; Astra judges at quality gates; Fable or Opus rule only on critical calls (design
direction, copy rulings, briefs, the final judge look, money, public claims, production). The
subagent default is now `sonnet`. A new chat starts from `.planning/handoff/NEXT-SESSION-KICKOFF.md`.

**Amended 2026-09-11, evening: two vendors, two tiers each (MODEL_ROUTING §9e).** Operator,
verbatim: "Use claude models and chatgpt. Lower models do grunt work frontier top models of
each make sure we are deliovering quality. Make sure to really not use too much fable". So:
Sonnet (Claude) and Sol (ChatGPT) do the grunt work: executing briefs, fix rounds, builds,
gates, captures, research, commits. Opus and Astra hold the quality gates: briefs, rulings,
the judge look, design and copy verdicts. Fable is reserved for the rare ruling Opus should
not make alone. GLM is overflow, not the default. Every Agent leg names `model: "sonnet"`.

**Amended 2026-09-16: Fable at the gates, never the main driver.** Operator, verbatim: "i dont
want to pick fableas main driver for useage . we are at a good amount right now our resent is
1am sat and fable is at 52 while week is 64 . just want to make sure that is helping with
planning and quality gates." So: the main session runs on Opus 5. Fable is called as a named
subagent (`model: "fable"`) at the planning and quality gates a kickoff or brief names (picking
a direction, judging mocks or a preview, reading a brief before it commits), one call per gate
with a written input file. Research, capture and measuring legs stay on Sonnet.

**Amended 2026-09-18, evening: more Fable when its bucket has room.** Operator, verbatim: "feel free
to use more of fable. look at usage and usage reset time for fable". So: before choosing a tier, read the
plan limits (`mcp__ccd_session_mgmt__get_usage`: 5-hour, weekly all models, weekly Fable, reset times).
Fable takes the taste and judgement legs (design and copy verdicts, the first design of a surface, briefs,
buyer reads) while its weekly bucket has headroom; builds, captures and measuring stay on Sonnet. The
weekly ALL-MODELS bucket binds first (at the time of this note: 87% used, Fable 61%, both resetting
2026-09-19 00:59 PDT), and every Fable call draws on it too.

**Amended 2026-09-19: the week's routing tiers (new usage week).** Operator, verbatim: "I want to
really implement the AI routing tier to conserve usage this week. Right now chatgpt weekly usage is reset
in 4 hours, and glm is at 74% for the week. So we can use glm and claude for now - using the best models to
ensure quality in design and writing and the cheaper models to do the grunt work." So, until he changes it:
- **Quality tier (design and writing):** Fable (`model: "fable"`, one call per gate with a written input
  file) designs a new surface, drafts or rules on copy, reads briefs, and does the judge and buyer reads.
  Astra (ChatGPT, `scripts/codex-exec.ps1 -Review`, images attached) is the independent juror at design and
  copy checkpoints once ChatGPT resets (2026-09-19 12:17 PDT). The main session runs on Opus 5: it rules,
  briefs, verifies and commits, and does not run build or capture loops.
- **Grunt tier:** GLM 5.3 (`scripts/claude-glm.ps1 -Batch -PromptFile`, prompt on stdin, smoke-test first,
  small runs; LESSONS #36) runs finished briefs, fix rounds, builds, captures and measuring scripts.
  Sonnet subagents (`model: "sonnet"`) take grunt work when GLM is capped or a leg needs in-session tools.
  The main session opens every capture itself (LESSONS #36, #37).
- **Pacing:** read `mcp__ccd_session_mgmt__get_usage` at session start and before every fan-out, and name
  the bucket in one line before launching. Claude weekly all-models is the bucket that stops everything; the
  2026-09-19 week started at 0% (Fable 0%), resetting 2026-09-26 01:00 PDT.

**Amended 2026-09-19, afternoon: ChatGPT is back, tiered (GLM capped).** Operator, verbatim: "think
chatgpt is back so we can use the,. still use it in a tiered way - astra for quality and the lower models for
grunt work. Mix in some of claude too". So, alongside the morning tiers: **Sol** (`gpt-5.6-sol`, via
`scripts/codex-exec.ps1 -Task <promptfile>`, workspace-write, no commits) takes grunt runs -- builds, capture
and measuring scripts, fix rounds -- especially while GLM 5.3 is capped (it hit its z.ai 5-hour limit
2026-09-19 ~13:20 PDT, reset ~21:20 PDT). **Astra** (`gpt-6-astra`, `-Review`, images attached) stays the
independent juror at design and copy checkpoints only. **Sonnet** subagents take in-session grunt legs.
Opus (this session) rules, briefs, verifies and commits; Fable takes the taste gates. Every leg still names
its model, and `get_usage` runs before every Claude fan-out.

**Amended 2026-09-20: DeepSeek joins, pay-as-you-go.** Operator, verbatim: "i have signed up for
deepseek and put $20 on it to use. I want to use it like the other AIs - grunt work, another top model
to give quality feedback." Two slots, and only two:
1. **The cross-review REST juror.** `scripts/cross-review/run_cross_review.py` now carries a fourth
   independent lineage, `--legs deepseek`, on by default. This is the slot that most needed filling:
   the GLM REST leg has been dead since 2026-09-18 (HTTP 429, "Insufficient balance" on the pay-go key)
   and the z.ai Coding-Plan key cannot lawfully stand in for it, because docs.z.ai/devpack/usage-policy
   forbids scripted access. DeepSeek is pay-as-you-go, so it is the compliant replacement. The leg picks
   its model by asking the account (`GET /models`) and preferring `deepseek-v4-pro`, then
   `deepseek-flash` (corrected 2026-09-20: this line first named two ids that do not exist on the
   account; the code was fixed in `9019186`); `DEEPSEEK_MODEL` overrides. Proven offline against a stub server that speaks the
   same dialect: `python scripts/cross-review/test/deepseek_leg_test.py`, 13 assertions, no key, no spend.
2. **A standing grunt tier, not overflow** (operator 2026-09-20, second message:
   *"alos make sure deep seek is included now for the new chat harness so we use it
   consistently"*). `scripts/deepseek-exec.ps1 -PromptFile <file> -Out <file>` runs a prompt as
   ONE pay-as-you-go REST call. Deliberately not a Claude Code process like `claude-glm.ps1`:
   GLM's Coding Plan is sold for that, DeepSeek here is API credit, so a plain call is the
   honest fit and every run costs one visible request. It has no tools, no filesystem and no
   repo access, which decides what to send it: **reading, drafting, summarising, classifying,
   one-shot rewrites, and a second opinion on a written artifact.** Anything that must edit a
   file or run a command goes to a Sonnet subagent or Sol instead. **VERIFIED 2026-09-20**,
   both tiers, end to end, with a clean UTF-8 round-trip; the evidence lines are in the
   script's STATUS comment. THE MODEL NAMES ARE `deepseek-flash` (cheap: sweeps, premise
   checks, volume reads, drafting — the default) and `deepseek-v4-pro` (top tier: a second
   independent opinion on a plan, a diff or a verdict). `deepseek-chat` and
   `deepseek-reasoner` DO NOT EXIST on this account; both were written from memory into the
   first draft, and the API silently aliased one of them, which is how a wrong id survives.
   Confirm with `-Models`, never from memory. BOTH tiers are reasoning models: reasoning
   tokens are charged against completion_tokens, and too small a `-MaxTokens` returns an
   EMPTY answer with finish_reason "length" that looks exactly like a failed call — the
   script reports that as a budget problem, not a failure. PRIVACY: a third-party provider
   outside the US. Send code, diffs, plans and public copy only — never real client rows,
   personal data or tokens.
It does NOT rule, and it does not replace Astra or Fable at a taste gate: a fourth opinion is worth
having precisely because it is independent, and an independent opinion that gets to decide is just
another ruler. Every finding it returns goes through the same disposition protocol as the other legs
(premises verified against the live repo before it is adopted OR dismissed).
SECRETS: the key is resolved from the `DEEPSEEK_API_KEY` user env var, else `~/.claude/.deepseek-key`
(where it lives, operator 2026-09-20), else `.claude/.deepseek-key` (gitignored by the `.claude/.*-key` rule). It is never printed, never committed, never passed
on a command line. The operator pasted a key into chat on 2026-09-20; that key is in a session
transcript on disk and must be treated as exposed and rotated. No key was written to this repo.

**Amended 2026-09-20, evening: every other model, every time; DeepSeek is a tier, not the driver.**
Operator, verbatim except one word: "I dont want deepseek to have such a main driver role and i dont
want you messing with global things. i just want your permanet repo version to include deepseek. We need
to be always [using] all the other models to lower claude usage and to get the best answers and highest
quality outputs." (The bracketed word is his; it is on the brand.json banned list, so the copy-lint hook
would reject it here.) So: routing changes live in THIS file and this repo's scripts, never in
`~/.claude`. DeepSeek keeps exactly the two slots above and never rules. The non-Claude models are the
DEFAULT for every leg they can do, not the exception:
- Reading, sweeps, summaries, drafting alternatives: DeepSeek (`deepseek-flash`; `deepseek-v4-pro` for
  copy drafts). Pass `-MaxTokens 32000` or more: the 8000 default returned an empty answer on every page
  sweep on 2026-09-20.
- Builds, captures, measuring, fix rounds: Sol (`codex-exec.ps1 -Task`), or GLM when it is up; a Sonnet
  subagent only when the leg needs Chrome or this session's context.
- Every design or copy checkpoint, before it reaches him: Astra (`codex-exec.ps1 -Review`, images
  attached) AND a `deepseek-v4-pro` second opinion. Two independent non-Claude reads, both reported.
- Claude tiers only for what no other model can do here: the LESSONS #3 ledger check and every ship
  decision (main session), the taste gate (Fable, one call), and legs that need repo tools in-session.
WHY IT WAS WRITTEN: the Pass-124 session had DeepSeek in its kickoff routing table and routed nothing to
it until the operator said so mid-session. A tier that is only on paper is not a tier in use.
