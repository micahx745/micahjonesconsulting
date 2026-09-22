# Post-Reset Harness Redesign — Fable 5.1 + the New Opus (Opus 5.5) Across Ordani, Landing Page, MJConsult

*Prepared for Micah Jones. Current as of Saturday 2026-09-26 (weekly Claude budget freshly reset). Version-sensitive facts flagged with date/version checked.*

## TL;DR
- **"The new Opus" is Claude Opus 5.5, shipped 2026-09-22 (`claude-opus-5-5`, $4/$20 per Mtok, $0.20 cache reads — 40% cheaper per workload and ~30% faster than Opus 5, and Anthropic says it matches Fable 5.1 on most work).** With a fresh weekly budget, make Opus 5.5 the main session, move *judgment-bearing and PHI-adjacent* executor legs back from GLM to Opus 5.5, and use Fable 5.1 as a taste/verdict gate (≤3 per arc), while everything cheap-and-guarded (reading, extraction, sweeps, mechanical bulk, deterministic QA, research synthesis) stays off Claude.
- **Pace, don't minimize.** Run a three-bar governor (all-models weekly, Opus weekly, Fable/top-tier weekly — the last is capped at 50% of your weekly limit on Max) targeting ~12–14%/day; because Opus 5.5 drains the Opus bar ~40% slower per task, last week's plan that hit 70% by Tuesday should land near ~42% this week. Spend the slack on Opus executors and extra Fable gates; cut back to GLM + one Fable gate if behind.
- **Ship the Stop-nudge kill first — now doc-confirmed.** A Stop hook returning `block` re-invokes the model (whole turn re-sent); SessionStart/UserPromptSubmit inject context *without* a new turn. Feed `status.json` from the `rate_limits` object Claude Code passes to the statusline on stdin (there is still no official Max usage API).

---

## 1. Model verification block (primary sources, checked 2026-09-22 / 2026-09-26)

**Claude Opus 5.5 — the new Opus. VERIFIED.**
- Released 2026-09-22 (Reuters; Bloomberg). Official docs: platform.claude.com "What's new in Claude Opus 5.5"; anthropic.com/claude-opus-5-5.
- Model string `claude-opus-5-5`; Bedrock `anthropic.claude-opus-5-5`; Google Cloud / Foundry / Claude Platform on AWS all `claude-opus-5-5`.
- Claude Code: the `opus` alias resolves to Opus 5.5 on Max; select explicitly with `/model claude-opus-5-5`. It is the default model on Claude Max.
- Pricing: **$4/M input, $20/M output; cache read $0.20/M (0.05× base input); 5-min cache write $5/M; 1-hour cache write $8/M; 512-token minimum cacheable prompt.** Batch 50% off ($2/$10). Fast mode Claude API only (not Bedrock/Vertex/Foundry), $8/$40.
- Context window 1M / 128K output (family standard; the Opus 5.5 "what's new" page defers to the model page — ASSUMPTION 1M, high confidence).
- Effort: five levels; **API default is `medium`** (Opus 5 was `high`). Thinking is **always on** — `thinking:{"type":"disabled"}` or a manual budget returns HTTP 400. More thinking per turn at a given effort than Opus 5.
- Behavior changes that touch the harness: **text between tool calls now returns in `thinking` blocks** (progress narration goes quiet unless `display` is set); **no forced tool use** (`tool_choice:any`/`tool` → 400); **sharper reading of charts, diagrams, screenshots without tools**; a new biology safety classifier and a `reasoning_extraction` refusal category.
- Max plan: available now; ships with higher 5-hour limits on Pro/Max/Team and a one-time, saveable rate-limit reset.

**Claude Fable 5.1 — top tier. VERIFIED.**
- Released 2026-09-01 (`claude-fable-5-1`); anthropic.com/claude-fable-and-mythos-5-1; AWS what's-new.
- Pricing: **$10/M input, $50/M output; cache reads $0.25/M (0.025× base — this CONFIRMS the prior report's "0.025× base input" claim); 5-min cache write $12.50/M; 1-hour $20/M.** 1M context, 128K output, always-on adaptive thinking, default effort `high`.
- Availability: Pro, Max, Team, Enterprise. It **can** be the main session model in Claude Code via `/model claude-fable-5-1` or `--model claude-fable-5-1`, and a subagent via the full string in `model:` frontmatter (the `opus` shorthand now maps to Opus 5.5; there is no `fable` shorthand — use the full string).
- Metering on Max: **Fable is capped at 50% of your weekly usage limits** and reports on its own top-tier bar (this matches the "Fable 73%" separate reading you saw). Hitting the Fable cap ends Fable access, not your week; Claude Code prompts you to switch to Opus.

**Is there anything newer than Opus 5.5?** No. As of the reset there is no Opus 5.6/6 or Fable 5.2 in Anthropic's docs; Opus 5.5 (2026-09-22) and Fable 5.1 (2026-09-01) are the current top two, with Fable/Mythos 5.1 the newest models overall. Design for Opus 5.5 as "the new Opus." (UNVERIFIED: any release in the 2026-09-23→26 window — searched, none found.)

**Vision economics (docs checked 2026-09-22).** Both Opus 5.5 and Fable 5.1 are in Anthropic's **high-resolution vision tier** (Claude 4.7+). Per the Claude Platform Vision docs: *"Claude views images in patches instead of pixels. Each patch is a 28×28-pixel block of the image, referred to as a visual token. An image, therefore, costs ⌈width / 28⌉ × ⌈height / 28⌉ visual tokens."* Caps: max long edge 2576px, max 4784 visual tokens. The circulating "images ~3× costlier on 4.7+" is TRUE and is the *high-res-tier vs standard-tier* jump — verbatim from the Vision docs: *"High-resolution images on Claude Opus 4.7 can use up to approximately 3x more image tokens than on prior models (4784 versus 1568 tokens per image)"* — **not a new Opus 5.5 / Fable 5.1 increase.** A 1512×982 screenshot ≈ 1,944 tokens (≈$0.0078 on Opus 5.5, ≈$0.0194 on Fable 5.1); 1920×1080 ≈ 2,691 tokens. The docs recommend downscaling when you don't need the fidelity; multiple images can be sent in one request for joint comparison and Claude "works best when images come before text."

**Other providers (checked 2026-09-21/22):**
- **GLM (z.ai Coding Plan):** current models **GLM-5.3 / GLM-5.3-Flash** (older names route to these silently). Weekly quota resets 7 days from subscription date; 5-hour rolling. Peak 14:00–18:00 UTC+8. Anthropic-compatible endpoint `https://api.z.ai/api/anthropic` as designed.
- **DeepSeek:** `deepseek-flash` now serves **V4.1-Flash** at $0.15/$0.60 off-peak ($0.30/$1.20 peak; cache-hit input $0.003 off-peak); `deepseek-v4-pro` (V4 Pro 0813) at $0.66/$1.98 off-peak. **Peak = 01:00–04:00 and 06:00–10:00 UTC, Mon–Fri;** off-peak is half price and covers all other hours + weekends. `deepseek-flash` accepts images (≤1024 tokens each); `deepseek-v4-pro` does NOT accept images. `/user/balance` schema unchanged. Anthropic endpoint `https://api.deepseek.com/anthropic` still live (still not adopted — privacy rule).
- **OpenAI Codex / ChatGPT Pro:** current Codex family is GPT-5.6 (Sol/Terra/Luna). Weekly window: a new weekly period starts with the first request after a reset; next auto-reset 7 days later. Instant paid resets available to Plus/Pro (saveable). GPT-5.6 Sol is real (`sol` executor). `gpt-6-astra` juror is operator-named (UNVERIFIED against OpenAI docs).
- **No official Anthropic usage API for Max exists** (open request anthropics/claude-code#13585). The supported feed is the `rate_limits.five_hour` / `rate_limits.seven_day` object Claude Code passes to statusline scripts on stdin; the unofficial OAuth `/api/oauth/usage` endpoint backs `/usage`.

---

## 2. Steady-state routing card (drop-in for `.planning/harness/ROUTING.md`, replaces UNTIL-SATURDAY.md)

*One page. Job class → model+effort → command/wrapper → guard → flip condition. Pace bands at bottom. (O)=Ordani, (L)=Landing, (M)=MJConsult where marked.*

| Job class | Model + effort | Command / wrapper | Guard | Flip / stop |
|---|---|---|---|---|
| Premise/plan check | Opus 5.5, high | main session | one writer; digest-in | Fable if phase-changing |
| Research synthesis, reading, extraction | DeepSeek-flash (V4.1); GLM-5.3 fallback | `deepseek-agent.sh` / `deepseek-exec.ps1` | no PHI/keys; synthetic fixtures only | GLM 429→DeepSeek; balance <$5 hold |
| Sweeps / first-pass review | GLM-5.3 | `glm-agent.sh` (O) / `claude-glm.ps1 -Batch` | pointer brief only (argv cap) | GLM 429→DeepSeek |
| Code-review leg | GLM-5.3 ∥ DeepSeek-v4-pro | `cross-review/run_cross_review.py` | ≤8KB digest each, fixed schema | adjudicate by Opus 5.5 |
| Adversarial read (2nd opinion) | DeepSeek-v4-pro routine; **Fable 5.1 on final pre-ship gate only** | `deepseek-exec.ps1` / Fable gate | DeepSeek max_tokens ≥32k | Fable only if ship-blocking |
| Mechanical executor (bulk) | GLM-5.3 in worktree | `--add-dir`, default-deny, PreToolUse deny outside worktree + `.claude/**` | committed verify chain executor can't edit; receipt | **mandatory Opus 5.5 diff review** |
| Judgment-bearing / PHI-adjacent executor | **Opus 5.5, high** in worktree | main or pinned subagent | verify chain + receipt | never GLM/DeepSeek if PHI-adjacent |
| Verify-chain run | none (deterministic) | committed scripts | executor cannot edit | — |
| Diff review | **Opus 5.5, high** | main session | reads diff not raw logs | — |
| Bookkeeping / ledger | Opus 5.5, medium | main session, one writer | executors never write resume/memory | — |
| Handoff | pointer brief (no model) | `dispatch.jsonl` + `receipt.json` | one writer | — |
| Copy drafting (volume) | DeepSeek-v4-pro ∥ Sol | `deepseek-exec.ps1` / `codex-exec.ps1 -Task` | no client data to Gemini free | final non-ASCII copy → Opus 5.5 |
| Visual QA (mechanical) | NO LLM | Lighthouse/axe/pixelmatch/BackstopJS, dead-swipe/dead-link | — | — |
| Visual QA (pre-screen) | **Opus 5.5, medium** — reads screenshots natively | main session, images before text | downscale; ≤N images (image guard) | escalate taste to Fable |
| Aesthetic / phase verdict | **Fable 5.1, high**, 1 call/gate, ≤3/arc | persistent gate session | digest + screenshots (images before text), never raw logs | deny beyond cap w/o operator OK |
| Web-search leg | Gemini if up; capped Fable pass else | `gemini-exec.ps1` (3-flash→2.5-flash→2.5-flash-lite) | no client data (free tier trains) | — |
| Image-attached juror | gpt-6-astra (Codex reset) | `codex-exec.ps1 -Review` | ONE run at a time (lockfile) | Fable if Codex down |
| Brief pre-flight | Opus 5.5, medium | main session | verify expected values before dispatch | — |

**Pace bands (per bar): on-pace ≤14%/day cumulative** (day N target = 14×N%). **Ahead** (cumulative <12×N%): spend slack — up-tier more executors to Opus 5.5, add a Fable gate, raise effort to xhigh on the hardest debug. **Behind** (>16×N%): containment — Opus 5.5 only for rulings/diff/ship/taste, GLM executes everything, Fable for phase-changing verdicts only. **5-hour rule:** the rolling 5h window can block you mid-arc even when weekly is healthy; if 5h ≥80%, pause new Opus/Fable spawns and let it roll off before the next gate.

---

## 3. Q1 — per-work-class × per-project decision table

Model, effort, why, guard, Claude cost/unit (ESTIMATE + basis from measured facts).

| Work class | Ordani | Landing | MJConsult | Effort | Why / guard | Claude cost/unit |
|---|---|---|---|---|---|---|
| Premise check | Opus 5.5 | Opus 5.5 | Opus 5.5 | high | frontier framing; one writer | ~20–40k tok |
| Sweep | GLM-5.3 | GLM-5.3 | GLM-5.3 | — | near-zero Claude; guard holds | ~0 Claude |
| First-pass review | GLM-5.3 | GLM-5.3 | GLM-5.3 | — | cheap; Opus adjudicates | ~0 Claude |
| Code-review leg | GLM ∥ DeepSeek → Opus adjudicate | same | same | Opus high | cross-review digest schema | adjudication ~30–60k tok |
| Plan-check | Opus 5.5 | Opus 5.5 | Opus 5.5 | high | rulings only on Claude | ~20–40k tok |
| Adversarial read | DeepSeek-v4-pro; Fable final gate | DeepSeek; Fable final | DeepSeek | Fable high | Fable only ship-blocking | Fable ~130k tok/gate |
| Mechanical executor | GLM worktree | GLM worktree | GLM worktree | — | verify chain + Opus diff | ~0 Claude + diff |
| Judgment/PHI executor | **Opus 5.5** | Opus 5.5 (judgment) | Opus 5.5 (judgment) | high | PHI can't leave first party | ~200–333k tok/task |
| Verify-chain run | deterministic | deterministic | deterministic | — | executor can't edit | 0 |
| Diff review | Opus 5.5 | Opus 5.5 | Opus 5.5 | high | mandatory after GLM | ~30–60k tok |
| Bookkeeping | Opus 5.5 | Opus 5.5 | Opus 5.5 | medium | one writer; not executors | ~5–15k tok |
| Handoff | pointer brief | pointer brief | pointer brief | — | dispatch/receipt | 0 |
| Copy drafting | DeepSeek/Sol → Opus final | DeepSeek/Sol → Opus final | Sol → Opus final | — | final taste on Opus | draft ~0; final ~10–30k |
| Visual QA | deterministic + Opus pre-screen | deterministic + Opus pre-screen + Fable verdict | deterministic + Opus | Opus medium | Opus reads shots natively | pre-screen ~5–20k; Fable ~130k |
| Aesthetic verdict | Fable (phase) | **Fable (mock/final)** | Fable (taste) | high | 1/gate, ≤3/arc | ~130k tok/gate |
| Research synthesis | DeepSeek pipeline | DeepSeek pipeline | DeepSeek | — | costs ~0 Claude; keep | ~0 Claude |
| Brief pre-flight | Opus 5.5 | Opus 5.5 | Opus 5.5 | medium | verify expected values | ~5–15k tok |

**What moves back onto Claude:** judgment-bearing/PHI-adjacent executors (GLM→Opus 5.5); the final adversarial read on ship gates (DeepSeek→Fable). **What stays off:** all reading/extraction/sweeps/first-pass/mechanical-bulk/deterministic-QA/research-synthesis — the guard already holds quality at ~0 Claude, and Opus 5.5 being cheaper does not beat "free + correct." Basis for costs: measured 333k-token/54-call/28-min Sonnet hook task; 134,828-token/7-call Fable 6-screenshot juror; 70K fixed web context; 9.6K worktree double-load.

---

## 4. Q2 — Fable / Opus 5.5 usage contract

- **Main-session choice: Opus 5.5 main + Fable gates.** Opus 5.5 is 40% cheaper per workload and matches Fable on most work, so making Fable the main model would burn the 50%-capped top-tier bar for work Opus does equally well. Use **Fable main only for a pure planning arc** where the entire arc is taste/architecture judgment and no mechanical execution happens.
- **Effort by role:** mechanical/bookkeeping `medium`; rulings/diff/plan `high`; hardest debugging `xhigh`; reserve `max` for a single stuck root-cause hunt. Opus 5.5 thinks more per turn at a level than Opus 5 and thinking cannot be disabled — set `max_tokens` generously and do NOT carry over old effort settings (re-sweep).
- **Cache discipline for Fable:** a fresh Fable *subagent* reloads project CLAUDE.md + user CLAUDE.md + MEMORY.md at spawn (measured), so one-shot gate subagents pay that boot each time. Prefer running the ≤3 gates inside **one persistent Fable-capable session** so the prefix cache stays warm (cache reads at 0.025× base). (ESTIMATE: whether the Max weekly bar discounts cache-read tokens is undocumented — treat warm-cache savings as real on dollars, uncertain on bar-share.)
- **Digest-in / verdict-out contract:** Fable sees a text digest (the claim, the evidence path:line/command+output, the decision needed) plus screenshots ordered **images-before-text**; it returns a short verdict + rationale. **Fable never sees:** raw executor logs or raw multi-image screenshot dumps.
- **Gates per arc:** now that budget exists, cap at **3** (was 1): one mid-arc taste check, one pre-ship aesthetic verdict, one phase-changing ruling.
- **Should Fable do the adversarial read DeepSeek did?** Only on the final ship-blocking gate. DeepSeek-v4-pro stays the routine second opinion (near-zero Claude); Fable's adversarial pass is worth its bar-share only where shipping a wrong call is expensive.

---

## 5. Q3 — burn-rate plan for the week

**Three bars to pace independently on Max:** (A) all-models weekly; (B) Opus weekly (Opus 5.5 counts — historically binds first); (C) Fable/top-tier weekly (capped at 50% of weekly). All reset at your fixed account time one week out; 5-hour rolling underneath.

**Daily targets:** on-pace = 14%/day cumulative on A and B. Because Opus 5.5 drains B ~40% slower per task than Opus 5, the same plan that hit 70% by Tuesday last week should land near ~42% this week — that is the headroom. Fable bar C: pace to ~7%/day so it lasts the week under its 50% ceiling.

**`policy.json` v3 thresholds (recalibrated):**
- Bar A (all-models): ≥75% → containment-lite (Opus for rulings/diff/ship/taste; GLM executes); ≥90% → hard containment (ledger/ship/taste only).
- Bar B (Opus): ≥60% → stop up-tiering executors to Opus, route mechanical to GLM; ≥80% → Opus for diff/ship/ruling only.
- Bar C (Fable): ≥35% → Fable gates only for phase-changing verdicts; ≥45% → Fable off, Opus 5.5 absorbs aesthetic pre-screen (it reads screenshots natively).
- Cross-provider (unchanged): GLM 429 → DeepSeek; DeepSeek balance <$5 → hold volume; Codex OFF by default, one run at a time.

**Recalibrated hook parameters:**
- Tier-burn PreToolUse **DENY** (not warn) after **N=40 consecutive execution tool calls on Opus 5.5** (was 30 warn) with reason "route mechanical loop to GLM"; **N=3 consecutive Fable calls** in an arc → DENY w/o operator override. Higher Opus N because 5.5 is cheaper, but it must be a hard deny to kill the mechanical-loop failure mode.
- PreToolUse **Task-spawn deny** when Bar A ≥75% OR Bar B ≥80%.
- PreToolUse **image-open ask** before the main session opens its **Nth image (N=8)** — Opus 5.5 reading shots well is a reason to *cap*, not uncap, raw image opens.
- SessionStart **budget inject** (additionalContext, no extra turn): current A/B/C %, pace band, active tier.

**Usage feed:** statusline script reads `rate_limits.five_hour`/`.seven_day` from stdin (no network) → writes `status.json` (5h%, A%, B%, C%, reset ISO times, pace band); falls back to `/api/oauth/usage` if stdin absent. GLM 429 body (codes 1308 five-hour / 1310 weekly) → Shanghai→UTC parser → `status.json`. DeepSeek `/user/balance` → `status.json`. `/usage`, `/cost`, `/context` read by operator; Codex % and Anthropic `/usage` entered by operator.

**Ahead-of-pace → spend on quality:** (1) up-tier more executor legs to Opus 5.5; (2) add the 2nd/3rd Fable gate; (3) raise effort to xhigh on the one hardest debug; (4) run the pre-ship adversarial read on Fable instead of DeepSeek. **Behind → cut:** drop to 1 Fable gate, GLM executes all, Opus for diff/ship/ruling only.

---

## 6. Q4 — new-capabilities findings and impact

- **Opus 5.5 default effort `medium` + thinking always-on + more thinking/turn** (platform docs): re-sweep effort per role; never disable thinking; budget `max_tokens`. Routine legs get cheaper at medium; don't blindly carry old `high`.
- **Text between tool calls returns in `thinking` blocks** (docs): any parser reading executor/subagent output must select blocks by `type`, and progress narration is quiet by default. The Q1 aggregator and receipt writers must not assume `text` blocks.
- **Sharper chart/screenshot reading without tools** (Opus 5.5 docs): main session pre-screens visual QA; fewer Fable gates and less need for the Gemini montage second-opinion. R1 visual-QA design shifts to deterministic tools + Opus pre-screen + one Fable verdict.
- **No forced tool use on Opus 5.5** (`tool_choice:any/tool` → 400): any wrapper that forced a tool must switch to `auto` + strict tool use / structured outputs.
- **Compaction-on-demand (beta, `compact-2026-09-04`) and mid-conversation tool changes that preserve cache**: real context-diet levers for long arcs; drop unused MCP tools mid-session without losing the prefix cache.
- **Hooks (doc-confirmed, fact 8 TRUE):** Stop `decision:block` prevents the turn ending and re-engages the model (whole context re-sent). Per the Claude Code Hooks reference (code.claude.com/docs/en/hooks), re-invocation carries `stop_hook_active: true` and there is a hard safety cap `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` (default 9): *"A hook blocked the turn from ending 9 consecutive times — overriding and ending turn. For Stop/SubagentStop hooks, check stop_hook_active in the input and return success while it's true."* **SessionStart and UserPromptSubmit inject plain stdout / `additionalContext` as context without a new turn.** So R0 is correct: never deliver reminders via Stop. PreToolUse `permissionDecision` supports deny/allow/ask/defer and can only tighten, never loosen, settings.
- **Subagent model config:** `model:` frontmatter accepts sonnet/haiku/opus/inherit/default and full strings; `CLAUDE_CODE_SUBAGENT_MODEL` forces every subagent onto one model (a session-wide cost ceiling). Pin premium-web agents (design-director, visual-qa) to `claude-fable-5-1`; set `CLAUDE_CODE_SUBAGENT_MODEL` to a GLM/Sonnet-class ceiling during containment.
- **Headless `claude -p`** flags in play: `--model`, `--effort`, `--permission-mode`, `--allowedTools`, `--append-system-prompt`, `--add-dir`, `--settings`, `--max-turns`, `--output-format json` (an internal-error hang was fixed so `-p` now exits 1 instead of hanging).
- **Image tokenization unchanged from 4.7 tier** for both new models (see §1): a 1512×982 shot ≈ 1,944 tokens.
- **1M context on Max:** Opus auto-upgraded to 1M on Max with no config.

---

## 7. Q5 — per-project changes

### 7.1 ORDANI (primary; ~half the effort)

**Install order this week (Opus 5.5 main):**
1. **Stop-hook audit as a 284 amendment (T2.x).** Enumerate the 10 Stop hooks; keep only true gates as Stop `block` guarded by `stop_hook_active` (respect the default cap of 9); move every nudge to SessionStart/UserPromptSubmit `additionalContext`; tag each surviving nudge `[STOP-NUDGE]`. Basis: doc-confirmed re-invocation; the T2.1 bypass-notice that re-fired every reply until hotfix 756267f9e is the exact failure to prevent.
2. **`status.json` + `policy.json` v3 (T4.1).** Add pace fields (A/B/C %, 5h%, band, reset ISO), the three-bar thresholds, the GLM Shanghai parser, DeepSeek balance. `status.json` is one-writer (Opus).
3. **GLM mechanical-executor rollout with mandatory Opus 5.5 diff review.** Worktree `--add-dir`, default-deny, PreToolUse deny outside worktree and on `.claude/**` (write scope enforced by default-deny + hook, *not* `Write(path)` rules — bead 2169). Executor writes one ≤8KB receipt; never resume/memory/vault.
4. **T2.2 reconcile.** Opus 5.5 diff-reviews the unreviewed tree work *first*; stage by explicit path only, no `git add -A`, no AI attribution. Then the pending push origin/main f9f1022f5→HEAD proceeds only with operator OK in the 284 lane.
5. **Amend T4.2/T4.3 and Wave 4.** T4.2/T4.3: feed the governor and add the Task-spawn deny. Wave 4 T6.0–T6.3 (CLAUDE.md compression) and T7.0 (cold-start export): unchanged in intent, but compression now also targets the worktree double-load.

**HIPAA / PHI-safe routing (decisive):** Anthropic (Opus 5.5, Fable) is the **first party** under your commercial terms — it is not a "third-party API." **The privacy rule ("nothing with client data to any third-party API") therefore forbids GLM, DeepSeek, Gemini, and Codex from touching PHI-adjacent material, and *permits* Claude to.** PHI-adjacent in a birth-worker SaaS = real or realistic seed data, any row/name from the Ordani DB (never reproduce a real user name), migrations that embed data, fixtures carrying DOB/address/contact, and clinical free-text. Consequence: **any executor leg touching PHI-adjacent code must be Opus 5.5, never GLM/DeepSeek.** External agents get synthetic fixtures only; the auto-mode classifier keeps blocking a sibling product's internal docs to DeepSeek until you name the exact file.
**Where Fable sits in 284's chain:** Fable = the phase-changing verdict ("284 complete") and any taste gate; Opus 5.5 owns the verified-facts ledger check, diff review, and ship decision.
Box quirks: write hook/JSON files with the Write tool (heredocs mangle backslashes); Edit decodes `\uXXXX`; Python scripts use `C:/` paths + `PYTHONIOENCODING=utf-8`; never `grep -i -F`; never write a `SKIP_`-name-then-`=` in Bash text.

**Verification commands (expected output):**
- `wsl bd list --phase 284` → shows T2.x/T4.x with updated states; `RESUME.md` ≤2560 bytes, STAGE line owned by 284.
- `python C:/Users/micah/.claude/scripts/status_check.py` → prints A/B/C %, band; exits 0.
- `claude -p "print /usage" --output-format json` (operator) → weekly A and Opus B rows present.

### 7.2 LANDING PAGE

- **Build brief:** Opus 5.5 (high). **Build:** GLM in worktree for mechanical scaffolding; Opus 5.5 executor for judgment-heavy interaction/motion logic; mandatory Opus 5.5 diff review either way.
- **Captures/gates:** no-LLM (Lighthouse/axe/pixelmatch/BackstopJS, dead-swipe/dead-link). **Pre-screen:** Opus 5.5 reads the captures natively (images before text). **Verdict:** one Fable call on the chosen mock. **Juror:** gpt-6-astra image-attached review now that Codex reset (`codex-exec.ps1 -Review`, one run at a time, cannot commit in worktrees).
- **Install order:** governor + routing card first, then the build. Finish the chosen mock this week; keep Claude fan-out off without operator OK.

### 7.3 MJCONSULT (Next.js 16)

- **Context diet 70K → target ~40K:** disable unused MCP servers per project via `.mcp.json` (~16.4K of tool defs), prune the skills list (~9.8K), fix the worktree double-load of instruction/memory (~9.6K, loads twice when a chat starts in the main checkout then moves into a worktree). System tools (~30.6K) and system prompt (~4.1K) are fixed.
- **Model:** Opus 5.5 main + one Fable taste gate. **Image-open guard** (PreToolUse ask at N=8). **Sol** drafts copy (Codex reset), **GLM** does mechanical Next.js work with Opus 5.5 diff review.

---

## 8. Q6 — user-global generalization kit (PROPOSAL; needs explicit operator "yes")

**Form:** scripts + one skill, NOT a plugin (a plugin reloads its agents/skills into every session's context; a skill loads on demand). Lives under `~/.claude/scripts/` + `~/.claude/skills/burn-governor/`.

**Contents:**
- `statusline-usage.sh` — reads `rate_limits` from stdin → `status.json` (A/B/C%, 5h%, resets, band); `/api/oauth/usage` fallback.
- `glm-429-parse.py` — 429 body (codes 1308/1310) Shanghai→UTC → `status.json`.
- `deepseek-balance.py` — `/user/balance` → `status.json`.
- `policy-loader.py` — merges `~/.claude/routing/policy.json` defaults with repo `.claude/routing/policy.json` overrides (repo wins).
- Hooks: `session-start-tier.sh` (SessionStart inject), `pretooluse-budget-deny.sh` (Task-spawn deny), `pretooluse-tier-burn.sh` (consecutive-exec deny), `pretooluse-image-ask.sh`, `pretooluse-executor-writeguard.sh` (deny resume/memory/vault).
- `dispatch.py` / `receipt.py` — durable dispatch.jsonl + per-leg receipt.json.
- `cross-review/run_cross_review.py` — GLM ∥ DeepSeek digest-schema runner.
- Skill `burn-governor` — reads `status.json`, returns the active routing tier + pace advice.

**Per-project override:** each repo ships `.claude/routing/policy.json` with its own thresholds and model pins (Ordani stricter PHI routing; Landing more Fable gates; MJConsult tighter context budget). Repo overrides global.

**Proposal text for your yes:**
> "Proposing a user-global kit under ~/.claude: read-only usage/balance readers, a policy loader, five PreToolUse/SessionStart hooks (budget deny, tier-burn deny, image ask, executor write-guard, tier inject), dispatch/receipt writers, and one on-demand `burn-governor` skill. No secrets in any command; no model does fan-out without your OK; ~/.claude is touched only on this explicit yes. Repos override via `.claude/routing/policy.json`. Reply 'yes global kit' to install; otherwise I ship the repo-level pieces only."

---

## 9. Ranked table v3

| id | change | project(s) | quality gained (what/why) | Claude tokens cost/saved per week (est + basis) | guard | effort | lands in | risk |
|---|---|---|---|---|---|---|---|---|
| R0 | Stop-nudges → SessionStart/UserPromptSubmit | all | stops whole-turn re-invocation; frees turns | SAVES ~1–3 turns/session × ~70K web ctx = ~0.2–1M/wk | `stop_hook_active`; cap 9; `[STOP-NUDGE]` tag | S | 284 amend + kit | low |
| R1 | visual QA: deterministic + Opus pre-screen + 1 Fable verdict | Landing, O, M | native screenshot reading; fewer gates | Opus pre-screen ~5–20k/gate; Fable ~130k/verdict | image guard; images-before-text | M | repo | low |
| R2 | up-tier judgment/PHI executor GLM→Opus 5.5 | Ordani first | frontier correctness where wrong is costly / PHI can't leave first party | COST ~200–333k/task (basis 333k Sonnet hook), −40% bar-share vs Opus 5 | verify chain + Opus diff | H | repo | med (Opus-bar burn) |
| R3 | context diet + worktree double-load fix | M, all | smaller boot; more room before compaction | SAVES ~10–20k boot/turn (basis 70K fixed, 9.6K doubles) | one writer | M | repo | low |
| R4 | three-bar governor (A/B/C) + policy v3 | all | deliberate pacing; no Tuesday-70% | SAVES the overrun (basis 63→70% in 24h) | stdin rate_limits; operator enters Codex/Anthropic % | M | 284 T4.x + kit | low |
| R5 | Fable gates 1→≤3, persistent warm-cache session | all | more top-tier taste per arc | COST ~130k/gate on C-bar (0.025× cache) | ≤3/arc deny; digest-in | M | repo + kit | med (C-bar) |
| R6 | cache discipline + <200K sessions + kickoff handoffs | all | cheaper reuse; avoids 456K bloat | SAVES cache-read at 0.05×/0.025× base | one writer | S | repo | low |
| R7 | cross-review runner | all | two cheap reviewers, Opus adjudicates | ~0 Claude + ~30–60k adjudication | ≤8KB digest schema | S | kit | low |
| R8 | (rejected) DeepSeek as tool-using agent | — | — | — | privacy rule | — | — | — |

---

## 10. Q7 — what NOT to change + new failure modes

**Keep exactly as v2 (and why):**
- **Privacy/PHI routing** — non-negotiable; Opus 5.5 being cheap changes nothing here.
- **Research pipeline** (1,183 DeepSeek-flash extractions, v4-pro map-reduce, quote-gate 97.8%, cite-gate, blind 3-juror jury) — costs ~0 Claude; do not "upgrade" it onto Claude.
- **Deterministic visual QA** — pixels don't need a model.
- **One-writer-per-file; executors never write resume/memory/vault** — Sol's wholesale resume-rewrite is why.
- **No Claude volume fan-out without operator OK** — more important now that budget "feels" available.
- **Codex one-at-a-time lockfile** (CreateProcessWithLogonW error 1909); DeepSeek `max_tokens ≥32k`; never trust `Write(path)` rules; never a secret in a command.

**New failure modes the fresh budget introduces, and the gate that catches each:**
1. **Sliding back into Opus mechanical loops** ("budget's there") → tier-burn PreToolUse **DENY** at N=40 consecutive exec calls + pace governor Bar B.
2. **Fable used for reading/cheap tasks** (0.025× cache tempts) → PreToolUse deny Fable except via named gate; ≤3/arc.
3. **Stop nudges creeping back** → CI/lint check that no Stop hook emits `block`/context except whitelisted gates; `[STOP-NUDGE]` tag audit.
4. **Opus 5.5 "more thinking/turn" silently inflating output** → explicit effort per role; Q1 aggregator watches output-token/turn.
5. **Opening many raw screenshots because 5.5 reads them well** → image-open ask at N=8; downscale + images-before-text.

---

## 11. Decisions for Micah (≤6; recommended first)

1. **Main model:** *Opus 5.5 main + Fable gates* (recommended) vs Fable-main planning arcs. Trade-off: Opus 5.5 is 40% cheaper and matches Fable on most work; Fable-main burns the 50%-capped bar fast.
2. **Executor up-tier scope:** *PHI-adjacent + judgment → Opus 5.5; pure-mechanical → GLM* (recommended) vs all-GLM-with-diff. Trade-off: correctness/compliance vs Opus-bar burn.
3. **Pace cushion:** *finish week ~85% (12%/day)* (recommended) vs full 14%/day. Trade-off: safety margin vs unused budget.
4. **Fable gates/arc:** *≤3* (recommended) vs keep 1. Trade-off: taste vs top-tier bar.
5. **User-global kit:** *approve the proposal* (recommended) vs repo-only. Trade-off: one-time global edit vs re-implementing per repo.
6. **Effort defaults:** *medium mechanical / high rulings / xhigh hardest* (recommended) vs leave carried-over. Trade-off: cost control vs re-sweep effort.

---

## 12. Hand-off to Claude Code (repo-level only; global items are Decision 5)

**Ordani:** (1) audit 10 Stop hooks → gates vs nudges, move nudges to SessionStart/UserPromptSubmit, tag `[STOP-NUDGE]`; (2) write `.claude/routing/policy.json` v3 (Write tool) + `status.json` schema; (3) install GLM worktree executor + PreToolUse deny hooks; (4) Opus 5.5 diff-review T2.2 tree work, stage by explicit path; (5) amend T4.1/T4.2/T4.3 + Wave 4 per §7.1; (6) add pace fields; verify with `wsl bd list --phase 284` and `status_check.py`.
**Landing:** (1) install routing card + governor; (2) Opus 5.5 build brief; (3) GLM/Opus 5.5 build in worktree + Opus diff review; (4) deterministic captures + Opus pre-screen + one Fable verdict (images before text); (5) gpt-6-astra juror via `codex-exec.ps1 -Review`.
**MJConsult:** (1) `.mcp.json` disable unused servers; (2) prune skills; (3) fix worktree double-load; (4) image-open guard; (5) Opus 5.5 main + one Fable taste gate; (6) Sol copy + GLM mechanical + Opus diff.

---

## 13. Rejected ideas (one line each)

- Single-session routers (claude-code-router): cache loss + secrets through a proxy.
- DeepSeek as tool-using agent (its Anthropic endpoint): privacy rule (outside US).
- Gemini as sole aesthetic juror: MLLM-as-UI-judge reliability is only adequate for early-stage screening, not a final verdict. The "MLLM as a UI Judge" study (arXiv 2510.08783) reports *"With ±1-accuracy of 72-77%, they provide sufficient reliability for early-stage decision making"*; on the harder Visual Aesthetic Benchmark (arXiv 2605.12684) the strongest model, Claude Sonnet 4.6, *"reaches 26.5% on TB-1 pass^3, 42.4 points below the human baseline of 68.9%."* Use Gemini as a second opinion only.
- Executor memory-file writes; reading raw executor logs; two concurrent Codex tasks; trusting `Write(path)` rules; relying on `max_completion_tokens` for DeepSeek.
- Fable as main session for mechanical arcs: burns the 50%-capped top-tier bar for work Opus 5.5 does equally well.

---

## 14. Confidence ledger (VERIFIED / UNVERIFIED / ESTIMATE)

**VERIFIED (primary docs, dates in §1):** Opus 5.5 string/pricing/cache/effort/behavior/availability (platform.claude.com "What's new in Claude Opus 5.5", anthropic.com/claude-opus-5-5, Reuters/Bloomberg 2026-09-22); Fable 5.1 string/pricing/0.025× cache/Max-50%-cap (anthropic.com, AWS, code.claude.com model-config); Max two-weekly-bars + 5h rolling; no official Max usage API (#13585); statusline `rate_limits` stdin feed; Stop re-invocation + `stop_hook_active` + `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`=9 + SessionStart/UserPromptSubmit no-turn injection (code.claude.com/docs/en/hooks); subagent `model:`/`CLAUDE_CODE_SUBAGENT_MODEL`; GLM-5.3 models + reset cadence + UTC+8 peak (docs.z.ai); DeepSeek V4.1-Flash/V4-Pro pricing + UTC peak windows + image rules (api-docs.deepseek.com); Codex weekly-reset mechanics + GPT-5.6 family (developers.openai.com, help.openai.com); vision tier formula ⌈w/28⌉×⌈h/28⌉ + "3× is 4.7-gen (4784 vs 1568), not new" (Claude Platform Vision docs).
**UNVERIFIED:** any Anthropic release in the 2026-09-23→26 window (none found); `gpt-6-astra` against OpenAI docs (operator-named); whether the Max weekly bar discounts cache-read tokens; exact Opus 5.5 context window (deferred to model page; assumed 1M); no Fable-5.1-specific "reads charts without tools" statement (Fable shares the high-res vision infra but the guidance is documented for Opus 5.5).
**ESTIMATE (basis in tables):** all per-unit Claude token costs (from measured 333k Sonnet hook, 134,828 Fable juror, 70K fixed web context, 9.6K double-load); the −40% bar-share translation of Opus 5.5's price cut; R0/R3/R4 weekly savings.
