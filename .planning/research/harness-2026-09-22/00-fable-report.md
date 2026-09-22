# Harness Model-Leverage: Move Volume Off Claude, Keep Frontier Quality
### Deep research for Micah Jones — Ordani (primary), Perfect Landing Page, MJCONSULT — as of Tuesday 2026-09-22

**The single most important finding:** Two of the four "cheap" providers you already pay for — GLM (z.ai) *and* DeepSeek — now expose Anthropic-compatible, **tool-using** endpoints, so both can run as second Claude Code processes that read files, run scripts, and edit code. That changes the whole design: the biggest Claude savings this week come not from smarter reading but from **(1) moving all visual QA off Claude to deterministic tools + one cheap-vision montage, (2) promoting GLM from reviewer to mechanical executor in an isolated worktree with an Opus diff-review, and (3) killing re-cache and fixed-prefix waste.** Everything below is built to be dropped into your next Fable session; the UNTIL-SATURDAY card and ranked tables are first so they survive a phone read.

> **A correction to your own brief:** Document 2/3 describe DeepSeek as "text-only REST, no tools." That is now **outdated**. DeepSeek's official docs document an Anthropic-format endpoint (`https://api.deepseek.com/anthropic`) with **full tool calling and MCP support** (verified below). This does not change your privacy rule — it changes what DeepSeek *could* do if you ever chose to point Claude Code at it.

---

## TL;DR (the core question, answered)
- **Route Claude to planning, orchestration, rulings, taste, and final verdicts ONLY.** Send volume reading/extraction to DeepSeek-flash, sweeps/first-pass reviews and *mechanical execution* to the GLM Claude-Code process (fully reset = your primary volume tier this week), strong second opinions to deepseek-v4-pro, visual QA to deterministic tools (Lighthouse/axe/pixelmatch) with one downscaled montage to Gemini/Fable, and keep Codex OFF (~8% left). Guard every hop with a deterministic gate (quote/cite/lint/Lighthouse), a committed verify chain the executor can't edit, a receipt, and an Opus diff-review or Fable verdict.
- **This week (until Sat 2026-09-26 01:00 PDT):** cap Claude at ≤15 top-tier tool calls/arc, check `/usage` before any fan-out, no Claude volume fan-out, defer all global `~/.claude` edits and the pending push. At weekly ≥75% narrow Claude to ledger/ship/taste; ≥90% containment only.
- **Durable:** ship an agent-runner + cross-review runner + `status.json` budget governor + pointer-brief + receipt kit as **repo** changes now (installable) and **propose** the user-global generalization for after the reset (needs your explicit yes).

---

## 1. ORDANI (PRIMARY PRIORITY)

### 1a. `UNTIL-SATURDAY.md` — verbatim, ready to drop in `.planning/harness/2026-09-22-model-leverage/`

```
# UNTIL SATURDAY 2026-09-26 01:00 PDT (08:00 UTC) — ROUTING CARD
# State 2026-09-22: Claude weekly ~70-71%, Fable 73%. Codex ~8% (OFF). GLM reset=PRIMARY volume. DeepSeek $11.94.
# Both Claude buckets reset Sat 01:00 PDT. Rolling 5-hour window also applies.

DAILY CLAUDE CAP: <=15 top-tier tool calls per arc (MODEL_ROUTING.md §6).
  Read-only Bash is free but cap OUTPUT with head/wc or a one-line Python summary.
5-HOUR RULE: run /usage before any Claude fan-out. If the 5h bar >60%, pause volume-adjacent Claude work.
NO CLAUDE VOLUME: no Workflow fan-out, no /deep-research Claude fan-out, no Explore/general-purpose/Sonnet
  spawns for sweeps or reviews. Any Claude subagent needs operator OK first (questions box + recommendation).

JOB CLASS            -> MODEL/TOOL              -> COMMAND                                   -> GUARD                       -> STOP CONDITION
volume read/extract  -> DeepSeek flash          -> scripts/deepseek-agent.sh (pointer)       -> cite-gate + quote-gate      -> balance <$5 -> hold volume
sweep/first-pass rev -> GLM agent               -> scripts/glm-agent.sh (pointer brief)      -> Opus spot-audit 1-in-N      -> GLM 429 -> DeepSeek
code-review leg      -> GLM + DeepSeek parallel -> scripts/cross-review/run_cross_review.py  -> Fable/Opus dispose by name  -> both 429 -> defer leg
mechanical executor  -> GLM in isolated worktree-> glm-agent.sh + committed verify chain     -> Opus diff review + receipt  -> diff touches .claude/** -> REJECT
strong 2nd opinion   -> deepseek-v4-pro         -> deepseek-agent.sh model=deepseek-v4-pro   -> Fable adjudicates a split   -> empty output -> raise max_tokens>=32k
visual QA            -> NO LLM (+Gemini probe)  -> lighthouse/axe/pixelmatch; gemini-exec     -> deterministic thresholds    -> Gemini 429 -> ONE Fable montage call
web-search leg       -> Gemini (if probe up)    -> gemini-exec.ps1                            -> URLs verified               -> 429 -> capped Fable pass (<=5 srch)
plan/ruling/verdict  -> Fable / Opus ONLY       -> main session                              -> THE irreplaceable spend     -> weekly>=75% narrow; >=90% containment
bookkeeping (RESUME) -> Opus main writer ONLY   -> one writer per file                       -> executors NEVER write memory-> always
handoff prompt       -> Opus writes pointer     -> file brief; agent Reads it                -> argv <30,000 UTF-16 units   -> use pointer brief ALWAYS

THRESHOLDS: Claude weekly >=75% -> ledger/ship/taste only. >=90% -> production containment only.
GLM 429 carries an INLINE reset time in the error body (Asia/Shanghai UTC+8) -> record it in status.json.
DeepSeek: check GET /user/balance; if total_balance <$5 -> hold volume. This research spends <= $3.
DEFER TO AFTER RESET: all global ~/.claude edits; new phase seeds; the push awaiting operator OK (origin/main f9f1022f5->HEAD).
CODEX: OFF. At most one decisive check, operator OK first, ONE run at a time (Windows sandbox lockout).
PRIVACY: nothing with client/personal data or keys to any third-party API. DeepSeek is outside the US.
  Auto-mode classifier blocks a sibling product's internal docs to DeepSeek until operator names the exact file.
```

### 1b. Q1–Q7 answered with evidence

**Q1 — Where do Claude tokens go? (the aggregator)**
Transcript layout (verified against Claude Code JSONL schema and multiple GitHub parsers): main thread at `C:/Users/micah/.claude/projects/<encoded-cwd>/<session-uuid>.jsonl`. **Current builds write subagents to a separate sidecar directory** `<session-uuid>/subagents/agent-<id>.jsonl` — every line carries `isSidechain: true`, `agentId`, and the parent's `sessionId`; the meta file `<...>/subagents/agent-<id>.meta.json` holds `{"agentType": "...", "spawnDepth": N}`. Main-session files in current builds contain **zero** sidechain lines; an *older* layout interleaved `isSidechain:true` lines into the main file. The script handles both. Token accounting is in `message.usage`: `input_tokens`, `output_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens`. Line `type` values: `user`, `assistant`, `system`, `summary`, `file-history-snapshot`. Transcripts auto-delete after ~30 days by default, so run soon.

Runnable, read-only, stdlib-only, Windows-safe aggregator (your Fable/Opus session or a GLM executor runs it locally — nothing leaves the machine):

```python
# aggregate_claude_tokens.py  — READ ONLY. stdlib only. Run: set PYTHONIOENCODING=utf-8 && python aggregate_claude_tokens.py
import os, json, glob, io, collections, datetime
ROOT = r"C:/Users/micah/.claude/projects"
DAYS = 7
NOW = datetime.datetime.now(datetime.timezone.utc)
EXEC_TOOLS = {"Bash","Edit","Write","MultiEdit","NotebookEdit"}   # "execution" tool calls
WORK_KEYWORDS = {  # crude work-class heuristic from agent name / first user text
    "executor":("execut","implement","apply","build","fix"),
    "reviewer":("review","audit","critique","lint"),
    "orchestrator":("plan","orchestrat","route","dispatch"),
    "research":("research","investigate","search","extract"),
    "bookkeeping":("resume","memory","bead","receipt","vault","commit"),
}
def classify(text):
    t=(text or "").lower()
    for cls,keys in WORK_KEYWORDS.items():
        if any(k in t for k in keys): return cls
    return "other"
def iter_lines(path):
    try:
        with io.open(path,"r",encoding="utf-8",errors="replace") as f:
            for ln in f:
                ln=ln.strip()
                if not ln: continue
                try: yield json.loads(ln)
                except ValueError: continue   # last line may be a partial write
    except OSError: return
def recent(ts):
    try:
        d=datetime.datetime.fromisoformat(ts.replace("Z","+00:00"))
        return (NOW-d).days < DAYS
    except Exception: return True
def project_of(path):
    p=os.path.dirname(path)
    return os.path.basename(p if "subagents" not in p else os.path.dirname(os.path.dirname(p)))
rows=collections.defaultdict(lambda: collections.Counter())
tool_by=collections.defaultdict(collections.Counter)
firsttext=collections.defaultdict(str)
img=collections.defaultdict(int)
exec_run=collections.defaultdict(int); exec_max=collections.defaultdict(int)
boot=collections.defaultdict(int)
main=glob.glob(os.path.join(ROOT,"*","*.jsonl"))
subs=glob.glob(os.path.join(ROOT,"*","*","subagents","*.jsonl"))
for path in main+subs:
    is_side = "subagents" in path
    key=None
    for obj in iter_lines(path):
        if not recent(obj.get("timestamp","")): continue
        proj=project_of(path); sid=obj.get("sessionId","?"); model=None
        msg=obj.get("message") or {}
        model=msg.get("model") or "-"
        side = bool(obj.get("isSidechain")) or is_side
        key=(proj,sid,side,model)
        u=msg.get("usage") or {}
        rows[key]["input"]+=u.get("input_tokens",0)
        rows[key]["cache_read"]+=u.get("cache_read_input_tokens",0)
        rows[key]["cache_creation"]+=u.get("cache_creation_input_tokens",0)
        rows[key]["output"]+=u.get("output_tokens",0)
        # boot bytes: first assistant usage's cache_creation is a good proxy for the loaded prefix
        if boot[(proj,sid,side)]==0 and u.get("cache_creation_input_tokens"):
            boot[(proj,sid,side)]=u["cache_creation_input_tokens"]
        content=msg.get("content")
        if obj.get("type")=="user" and not firsttext[(proj,sid,side)]:
            firsttext[(proj,sid,side)]=content if isinstance(content,str) else json.dumps(content)[:400]
        if isinstance(content,list):
            for b in content:
                if not isinstance(b,dict): continue
                if b.get("type")=="tool_use":
                    name=b.get("name","?"); tool_by[key][name]+=1
                    if name in EXEC_TOOLS:
                        exec_run[key]+=1; exec_max[key]=max(exec_max[key],exec_run[key])
                    else: exec_run[key]=0
                if b.get("type")=="image" or (b.get("type")=="tool_result" and "image" in json.dumps(b)[:200]):
                    img[key]+=1
print("date_scan\tproject\tsession\tsidechain\tmodel\tinput\tcache_read\tcache_creation\toutput\ttool_calls\timage_reads\tlongest_exec_run\twork_class\tboot_tokens\tcache_hit_ratio")
sinks=[]
for key,c in rows.items():
    proj,sid,side,model=key
    tot_in=c["input"]+c["cache_read"]+c["cache_creation"]
    chr_=(c["cache_read"]/tot_in) if tot_in else 0.0
    wc=classify(firsttext.get((proj,sid,side),""))
    tools=";".join("%s=%d"%(k,v) for k,v in tool_by[key].most_common())
    total=tot_in+c["output"]
    sinks.append((total,proj,sid,side,model,c,tools,img[key],exec_max[key],wc,boot[(proj,sid,side)],chr_))
sinks.sort(reverse=True)
for total,proj,sid,side,model,c,tools,im,em,wc,bt,chr_ in sinks:
    print("%s\t%s\t%s\t%s\t%s\t%d\t%d\t%d\t%d\t%s\t%d\t%d\t%s\t%d\t%.3f"%(
        NOW.date(),proj,sid[:8],"Y" if side else "N",model,c["input"],c["cache_read"],
        c["cache_creation"],c["output"],tools,im,em,wc,bt,chr_))
print("\n# TOP 10 SINKS (by total tokens)")
for r in sinks[:10]:
    print("#  %d tok  %s  %s  side=%s  %s  work=%s"%(r[0],r[1],r[2][:8],"Y" if r[3] else "N",r[4],r[9]))
```
Output columns exactly as your brief requested: `date, project, session_id, is_sidechain, model, input, cache_read, cache_creation, output, tool_calls_by_tool, image_reads, longest_exec_run, work_class, boot_tokens, cache_hit_ratio`, plus a top-10 sink block. **Fallback if fields differ:** the script skips unparseable lines and treats a missing `usage`/`model` as 0/"-", so a schema drift degrades gracefully rather than crashing. If a session tool exposes usage (`/usage`, `/cost`), reconcile the script's per-model totals against it — the script measures *transcript* tokens, not the plan-limit weighting Anthropic applies, so expect a systematic offset.

**Q2 — What can move (per-work-class table + the GLM-executor verdict)**

| Work class | Current tier | Cheapest tier that meets the bar | Evidence | Guard that holds quality |
|---|---|---|---|---|
| Premise check | Opus | GLM/DeepSeek-flash | reads only, no judgment | Opus reads the one-line answer |
| Sweep | Sonnet subagent | GLM agent | GLM review returned 10 findings last session | Opus spot-audit 1-in-N against live source |
| First-pass review | Sonnet/Opus | GLM + DeepSeek parallel | DeepSeek review found 6 real MINORs; GLM 10 (1 refuted) | Fable/Opus disposes each by name |
| Code-review leg | Opus | cross-review runner (GLM+DeepSeek) | both endpoints tool/text-capable | verdict-grade adjudication |
| Plan-check | Fable/Opus | **stays Fable/Opus** | volume refuters caught no phase-changing defect (MODEL_TIERING 08-23) | — |
| Mechanical executor | Sonnet (333k tok/task) | **GLM in worktree** | see verdict below | committed verify chain + Opus diff + receipt |
| Verify-chain run | Sonnet | GLM/any (deterministic) | it's a committed script | the chain itself, executor can't edit it |
| Board/receipt/RESUME | Opus | **stays Opus (one writer)** | Sol once rewrote a resume file wholesale | executors never write memory files |
| Handoff prompt | Opus | Opus writes; agent Reads | argv 30k limit | pointer brief |

**GLM-as-executor verdict: YES, with four prerequisites.** GLM can execute your fixture-pinned, exact-verify-chain tasks in an isolated worktree with Opus reviewing the diff. Prerequisites:
1. **The write-scope guard.** Your bead 2169 (installed Claude Code ignores `Write(path)` rules; only `Edit(path)` matches) is directionally consistent with public docs but the robust fix does **not** depend on getting Write(path) rules to bind. Public docs confirm: (a) deny > ask > allow, and a settings **deny** always wins; (b) a PreToolUse hook returning `permissionDecision:"deny"` fires *before* permission-mode checks and holds even under `--dangerously-skip-permissions`, but a hook "allow" cannot loosen a deny; (c) the **only allow-list-shaped boundary is the project root + `--add-dir`/`additionalDirectories`**. So scope GLM to the worktree by launching it *inside* the worktree with `--add-dir <worktree>` and a default-deny + PreToolUse hook that denies any path outside it — not by trusting Write(path) rules.
2. **Pointer/stdin briefs** (argv is capped, see Q3).
3. **A receipt file + durable dispatch record** — background agents die with their session (your T2.2 loss), so the dispatcher writes `dispatch.jsonl` (agent, brief path, start ts, pid) and each leg writes a `receipt.json` on completion.
4. **Opus reviews the diff** and the committed verify chain runs; GLM never touches `.claude/**` or memory files.
**Estimated Claude tokens freed:** your measured Sonnet executor was **333k tokens / 54 tool calls / 28 min** for one 666-line hook task. If 284-style mechanical tasks run ~3–6/week, moving them to GLM frees roughly **1.0M–2.0M Claude tokens/week** (ESTIMATE, basis = 333k × tasks/week). Failure mode: GLM writes something subtly wrong that the verify chain doesn't catch → gate = Opus diff-review is mandatory, not optional, and the chain must be verdict-grade (a control proven both ways).

**Q3 — Transports and limits**
- **argv vs stdin vs pointer.** Windows `CreateProcessW` caps the command line at **32,767 characters including the terminating null** (Microsoft docs, verbatim). Your `scripts/glm-agent.sh` spends ~1,586 on its own flags, and an 86 KB inline input was refused last session — so **always use pointer briefs** (agent Reads the material from a file). Prefer stdin piping where the wrapper supports it.
- **max-turns / timeouts.** `claude -p --max-turns N` bounds a headless run; always wrap in `timeout <sec> claude -p ...` or a confused run hangs until killed. `--output-format json` exposes `total_cost_usd`, `session_id`, `is_error` for logging.
- **DeepSeek empty output.** Reasoning is ON by default; if `max_tokens` is too small the reasoning budget consumes everything and the visible answer is empty. Set **max_tokens ≥ 32k**. Critically, **DeepSeek silently swallows unknown params** (a made-up param returns HTTP 200), so `max_completion_tokens` does nothing on that endpoint — you cannot tell a cap took effect until the bill. Budget by setting `max_tokens` and by disabling thinking when you don't need it.
- **429 → status file.** GLM 429 body carries the reset time **inline** (see Q4). DeepSeek 429 is per-`user_id` concurrency.
- **Parallelism (safe probe protocol).** DeepSeek **documents** concurrency: **2,500 concurrent for deepseek-flash, 500 for deepseek-v4-pro** per user_id (429 on exceed). GLM publishes **no** concurrency number (dynamic, ordered Max>Pro>Lite; operational guidance ~1 project on Lite, 1–2 Pro, 2+ Max). Probe protocol: start at 2 parallel GLM agents, watch for 429, back off on first 429 and record the inline reset time; never assume a fixed ceiling.

**Q4 — Budget governance (`policy.json` + `status.json`)**
`status.json` schema (proposed): `{"claude":{"weekly_pct":71,"fable_pct":73,"five_hour_pct":?,"reset":"2026-09-26T08:00:00Z"},"codex":{"pct_left":8,"reset":"..."},"glm":{"state":"ok|429","reset_local":"2026-..+08:00"},"deepseek":{"total_balance":"11.94","currency":"USD","is_available":true},"gemini":{"state":"429|ok"}}`. `policy.json` maps thresholds → routing flips.

**How each feed is obtained (verified):**
- **DeepSeek — VERIFIED.** `GET https://api.deepseek.com/user/balance`, header `Authorization: Bearer $DEEPSEEK_API_KEY`. Returns exactly (official docs sample, verbatim): `{"is_available": true, "balance_infos": [{"currency": "CNY", "total_balance": "110.00", "granted_balance": "10.00", "topped_up_balance": "100.00"}]}`. Currencies documented: `USD` and `CNY`; all amounts are **strings** (use decimal parsing). curl (no real key): `curl -s https://api.deepseek.com/user/balance -H "Authorization: Bearer $DEEPSEEK_API_KEY"`.
- **z.ai — NO documented endpoint.** Confirmed by z.ai's own feedback repo (a user asks them to "expose a usage endpoint … instead of forcing users to grep logs"). The **reliable, behavior-documented signal is the 429 body**, which carries the reset time *inline in `error.message`* — verbatim captured live: `{"type":"error","error":{"type":"rate_limit_error","code":"1310","message":"[1310][Weekly/Monthly Limit Exhausted. Your limit will reset at 2026-09-04 18:30:53]"}}`. Code **1308 = 5-hour limit**, **1310 = weekly/monthly**; the stamp is **Asia/Shanghai UTC+8** and there is **no `Retry-After` header** — parse the string with a +08:00 offset (an OmniRoute bug over-locked ~8h by treating it as UTC). An **undocumented** `GET https://api.z.ai/api/monitor/usage/quota/limit` exists (community-reverse-engineered across 3 repos; returns per-window pct + `nextResetTime` epoch-ms) — **UNVERIFIED against any z.ai primary source; use at your own risk.**
- **Anthropic** — `/usage` (aliases `/cost`, `/stats`, read-only) or Settings→Usage; Max shows **two weekly bars** (all-models + Opus-only), confirming Opus is metered on its own weekly track. No public token numbers; operator reads the bars.
- **Codex %** — operator input (no clean programmatic read on ChatGPT-plan sign-in; `/status` inside a Codex CLI session shows remaining).

**Threshold → routing-flip table:** DeepSeek `total_balance` < $5 → hold volume (fall to GLM). GLM 429 → DeepSeek-flash for volume; record reset. Both 429 → defer the leg. Claude weekly ≥75% → Claude narrows to ledger/ship/taste. ≥90% → containment only. Enforced by a **SessionStart hook** that reads `status.json` and injects the active tier as `additionalContext`, plus a **PreToolUse hook** that denies a Claude Task spawn with reason "route to GLM — status.json says weekly ≥75%".

**Q5 — Context diet**
Measure the bytes of every auto-loaded surface with the script spec below. Your measured fixed prefix is **~70K tokens/turn**: system tools ~30.6K, MCP tool definitions ~16.4K, skills list ~9.8K, instruction/memory files ~9.6K (global + project CLAUDE.md + design constitution; **loads twice when a chat starts in main and moves into a worktree**), system prompt ~4.1K. Diet candidates and the gate each must not lose:
- **MCP definitions (16.4K):** disable unused servers per-project via `.mcp.json` / `enabledMcpjsonServers` / `disallowedTools`. Gate: none lost if the server is genuinely unused in Ordani.
- **Skills list (9.8K):** progressive disclosure — a skill's body loads only when invoked; prune plugins not used in Ordani. Gate: keep the premium-design-loop and copy/blog-lint skills.
- **Duplicate instruction load:** start the session in the worktree, or split CLAUDE.md so the worktree doesn't re-inject the whole global constitution. Gate: the routing table and privacy rules must still load once.
- **284 Wave 4** (CLAUDE.md prose compression) saves input tokens on **every cached turn** but misses the MCP/skills bulk — so it's necessary but not sufficient; do it *and* the MCP/skills trim. Don't duplicate Wave 4's work; quantify with the script and hand it the delta.

Context-diet measurement script spec (stdlib, read-only): for each of `C:/Users/micah/birthflowV2/birthflowV2/.claude/*.md`, `C:/Users/micah/.claude/CLAUDE.md`, `MEMORY.md`, each SessionStart-injected file, and the skills dir, print `path, bytes, approx_tokens (bytes/4), loads_per_turn (1 or 2)`; sum to a "fixed prefix" total and flag any file >2 KB not behind a lazy `@import`.

**Q6 — The generic layer (website builders)**
Which Ordani pieces generalize and how they ship: the **agent runner scripts** (`glm-agent.sh`, `deepseek-agent.sh`), the **cross-review runner**, the **receipt/dispatch record**, the **routing `policy.json`/`status.json`**, **pointer briefs**, and **budget status** all generalize. Ship them as **user-global scripts + ONE skill** (simpler than a plugin, and a skill's body only loads on invoke) — **as a proposal, since global edits need your explicit yes.** Website work → model map:
- copy / SEO / meta review → DeepSeek-flash or GLM (deterministic banned-words/blog-lint first).
- bulk page sweeps → GLM agent.
- Lighthouse / axe / visual diffs → **NO LLM** (headless Chrome + Lighthouse CI + axe-core + pixelmatch/BackstopJS + dead-swipe/dead-link detectors).
- taste + final aesthetic gate → **Fable, one call**, fed a digest + one downscaled montage.
Premium-web plugin agents re-modeled: **design-director, case-study-writer → Fable gate only**; **copy-editor, perf-auditor, a11y-reviewer → DeepSeek/GLM + deterministic checks**; **motion-engineer, visual-qa → headless Chrome capture + Gemini/Fable montage**. Each agent's `.md` frontmatter should set `model:` explicitly (alias `sonnet|opus|haiku|fable` or full ID like `claude-opus-5`); a hard ceiling is `CLAUDE_CODE_SUBAGENT_MODEL` which **forces every subagent onto one model** regardless of frontmatter — useful as a "cost ceiling" env for a trickle week.

**Q7 — Outside practice (cited)**
- **Multi-provider via env vars is confirmed:** point a second Claude Code process with `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN` at `https://api.z.ai/api/anthropic` (GLM) or `https://api.deepseek.com/anthropic` (DeepSeek). z.ai is the only provider besides Anthropic offering a true Anthropic-compatible surface; DeepSeek's maps `claude-opus*`→`deepseek-v4-pro`, `claude-sonnet*`/`claude-haiku*`→`deepseek-flash`, and documents that image/document content types are **not** fully supported.
- **Router vs separate processes:** `claude-code-router` (musistudio, MIT — **37.3k stars / 3.1k forks**, latest v3.1.1 as of Sept 2026) routes `default/background/think/longContext/webSearch` per-request inside one session. **I recommend against it for you.** Risks that hit your setup specifically: tool-call fidelity loss across protocol translation, **prompt-cache loss** (fatal given cache economics below), and secrets flowing through a local proxy. Your **separate-process-per-provider** design is safer for cache discipline and the no-third-party-data rule; keep it.
- **Headless workers / per-subagent models / caching discipline** are all first-class in Claude Code (see A, D below).

### 1c. RANKED TABLE (Ordani + generic)

| id | change | scope | Claude tokens saved/wk (est + basis) | quality guard | effort | lands in | risk |
|----|--------|-------|-------------------------------|---------------|--------|----------|------|
| R1 | Visual QA → deterministic + 1 montage | both | **very high** — 134,828/Fable-juror × N gates + 23-image Opus turns re-billed every turn | Lighthouse/axe/pixelmatch thresholds + Fable 1-call montage | med | 284 amendment + user-global kit | med |
| R2 | GLM mechanical executor in worktree | Ordani | **1.0–2.0M** — 333k/task × 3–6 tasks/wk | Opus diff review + committed verify chain + receipt; `--add-dir` scope | med | 284 T4.2/T4.3 amendment | med |
| R3 | Context diet (MCP off, skills prune, de-dupe) | both | **~35–70K/turn × turns** (fixed prefix) | keep routing/privacy/design gates; lazy-load | low | 284 Wave 4 + kit | low |
| R4 | `status.json`/`policy.json` budget governor | both | indirect (prevents overspend) | threshold-driven PreToolUse deny | med | 284 T4.1 | low |
| R5 | Cache discipline + session-length rule | both | **high** — avoids full-price re-cache of 100K+ prefixes | finalize CLAUDE.md, load stable first, /compact | low | user-global kit | low |
| R6 | DeepSeek as tool-using agent (optional) | both | med | privacy classifier (NO PHI/keys); operator-named source | med | operator decision | **high** (data residency) |
| R7 | cross-review runner (GLM+DeepSeek parallel) | both | med — replaces Opus review legs | verdict-grade Fable/Opus adjudication | low | repo now | low |

### 1d. `BRIEF.md` (executable — top changes, exact strings, verification WITH expected output)

Respecting your box quirks (heredocs mangle backslashes → write files with the Write tool; Edit decodes `\uXXXX`; Python needs `C:/` paths + `PYTHONIOENCODING=utf-8`; never `grep -i -F`; never write a `SKIP_`+`=` token in Bash text):

1. **Install the aggregator** (R-Q1): Write `scripts/harness/aggregate_claude_tokens.py` (body in Q1). Verify:
   `set PYTHONIOENCODING=utf-8 && python scripts/harness/aggregate_claude_tokens.py | head -20`
   Expected: a TSV header row starting `date_scan	project	session	sidechain	model	...` then rows; a `# TOP 10 SINKS` block. Non-zero rows for the last 7 days.
2. **GLM executor scope guard** (R2): add a PreToolUse hook `scripts/hooks/deny_outside_worktree.py` that reads `tool_input.file_path`, and returns `{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"outside worktree"}}` (exit 0) when the path is not under the launch worktree or matches `.claude/`. Launch GLM with `--add-dir <worktree>`. Verify with a fixture that tries to write `.claude/x` → expect deny; a write inside the worktree → expect allow.
3. **status.json feeder** (R4): Write `scripts/harness/update_status.py` calling DeepSeek `/user/balance` (curl form above) and writing `total_balance`. Verify: `python scripts/harness/update_status.py && type .planning\harness\status.json` shows `"deepseek": {"total_balance": "...", "is_available": true}`.
4. **cross-review runner** (R7): confirm `scripts/cross-review/run_cross_review.py` dispatches GLM + DeepSeek pointer briefs in parallel and writes 8-KB schema files. Verify the leg table prints both providers.

**Rejected (with reasons):** single-session router (cache loss + secrets through proxy); giving GLM/DeepSeek memory-file write (Sol precedent); Claude volume fan-out (operator rule + cost); reading long executor outputs in full (use digests).

### 1e. OPERATOR QUESTIONS (recommendation first)
1. **GLM as mechanical executor?** *Recommend YES, scoped to a worktree with `--add-dir`, Opus diff-review mandatory.* Trade-off: frees ~1–2M Claude tokens/week vs. a subtle-bug risk the verify chain must catch.
2. **Spend up to $3 of DeepSeek on this research's adversarial leg?** *Recommend YES* — $2 cap, off-peak (half price), leaves ~$9.94.
3. **Ship the generalization to user-global `~/.claude` after Saturday?** *Recommend "approve in principle, install after reset"* — global edits need your explicit yes; nothing touches global this week.
4. **Push the pending `origin/main f9f1022f5→HEAD`?** *Recommend defer to the 284 lane* — not this chat's lane.

---

## 2. GENERIC / SHARED USER-GLOBAL LAYER (proposals — global edits need your yes)

**Routing table v2 (markdown):** identical shape to the UNTIL-SATURDAY card but durable — reading/sweeps → DeepSeek(GLM fallback); drafting → deepseek-v4-pro ∥ Sol; builds/captures/fix rounds → GLM(Sol when Codex funded); visual QA → no-LLM + montage; three independent reads at each design/copy checkpoint (Fable one call, Astra, deepseek-v4-pro), splits surfaced by name; main Claude keeps ledger/ship/briefs/rulings/commits/non-ASCII copy.

**Hook specs (event, matcher, condition, decision, message):**
- *Tier-burn deny:* PreToolUse | `Bash|Edit|Write` | ≥N consecutive execution calls on Fable/Opus (from statusline) | **deny** | "route to GLM — top tier is executing mechanically."
- *Executor memory guard:* PreToolUse | `Write|Edit|MultiEdit` | path matches `RESUME|MEMORY|*.resume|vault` **and** actor is an executor agent | **deny** | "executors never write resume/memory files."
- *Image-open warning:* PreToolUse | `Read` | tool_input path is an image and session image-count ≥ threshold | **ask** | "opening many images on the main session — montage instead?"
- *Budget deny:* PreToolUse | `Task` (Claude subagent) | `status.json` weekly ≥75% | **deny** | "weekly ≥75%: Claude narrowed to ledger/ship/taste."
- *SessionStart budget inject:* SessionStart | — | always | `additionalContext` = active tier + reset times from `status.json`.

**Wrapper specs:** Gemini model-fallback chain on 429/404/empty (`gemini-3-flash-preview → gemini-2.5-flash → gemini-2.5-flash-lite`, then abort to Fable montage); a **Codex lockfile** (`codex.lock`; refuse a second concurrent run — Windows sandbox lockout); a **DeepSeek per-call cost ledger** (log input/cache/output tokens × off-peak/peak rate from the response `usage`); a **GLM 429 → status.json writer** (parse the inline Shanghai-time reset, store as UTC); **receipts/dispatch records** (`dispatch.jsonl` + per-leg `receipt.json`) so background agents leave a durable trail.

**Brief template "Opus rules → GLM executes → DeepSeek/Gemini verify → Opus judges" + DIGEST FORMAT.** Digest the cheap tiers hand back so Fable/Opus judge *without reading raw files*: `{"claim": "...", "evidence": "path:line OR command+first-line-of-output", "confidence": "high|med|low", "est_claude_tokens_saved_per_week": N, "risk": "..."}` — max 8 KB per leg, one file per leg.

**THE FRONTIER-QUALITY GUARANTEE — minimal points where Fable/Opus/Astra must still be spent, with a tool-call budget:**
- **Fable:** the final aesthetic/taste gate and any phase-changing verdict — **1 call per gate**, fed a digest + one downscaled montage (never raw screenshots).
- **Opus (main session):** briefs, rulings, the verified-facts ledger check, ship decisions, commits, non-ASCII copy, and **the executor diff-review** — **≤15 top-tier tool calls per arc**.
- **Astra (Codex juror):** only while Codex is funded — a decisive image-attached review, **1 run, operator OK first.**
Everything else (reading, drafting, sweeps, first-pass review, mechanical execution, deterministic QA) is off Claude.

---

## 3. LANDING-PAGE PROJECT

**DIAGNOSIS (<300 words).** Claude spend concentrated in the **Opus main session** (~68% of a 1M context by end, several hundred tool calls), not in the research pipeline — which correctly cost almost no Claude (1,183 deepseek-flash extractions, deepseek-v4-pro map-reduce, deterministic quote/cite gates, blind jury). The burn came from three habits: **(1) debugging mechanics loops** on the top tier (PowerShell quoting, `Set-Content -Encoding UTF8` BOM breaking JSON.parse, one-element-array unrolls, probe bugs, re-runs after rate limits) — the tier-burn hook fired at 30 consecutive execution calls; **(2) reading long executor outputs in full** (syntheses, verdicts, logs) instead of digests; **(3) babysitting background jobs** for hours. The fix is structural: keep the top tier off mechanical runs entirely (route to GLM), feed it digests not raw files, and shorten sessions to protect the cache.

**Top-10 Harness v2 changes (ranked by Claude saved per unit of quality risk):**
| # | change | from→to | saving | risk & guard | mechanical test | who builds |
|---|--------|---------|--------|--------------|-----------------|-----------|
| 1 | Visual QA off Claude | Opus/Fable→no-LLM+montage | very high | miss subtle regressions / pixelmatch+Lighthouse thresholds | diff a known-good vs known-bad capture → detector fires | GLM |
| 2 | Mechanical debugging → GLM executor | Opus→GLM worktree | high | wrong fix / committed verify chain + Opus diff | verify chain green on fixture | GLM |
| 3 | Digests not raw reads | Opus reads all→8KB digest | high | lost nuance / digest schema + spot audit | digest ≤8KB, cites path:line | GLM |
| 4 | Session-length + handoff rule | long→<200K + kickoff file | high (cache) | context loss / RESUME + kickoff | new chat cold-starts from kickoff | Opus |
| 5 | Context diet (MCP/skills) | 70K→~35K prefix | med-high | lose a gate / keep design+lint skills | prefix bytes measured before/after | GLM |
| 6 | Tier-burn deny (not warn) | warn→deny+route | med | false stop / N tuned high | 12 exec calls on Fable → deny fires | GLM |
| 7 | Budget meters + hard caps | none→status.json | med | over-cap / per-vendor threshold | balance<$5 → volume held | GLM |
| 8 | Brief pre-flight to executor | Opus redoes→executor verifies | med | wrong expected values / executor prints actual first | 3 briefs, expected==actual | GLM |
| 9 | Image-open warning hook | silent→ask at N images | med | annoyance / threshold | opening 5th image → ask | GLM |
| 10 | Codex lockfile | ad-hoc→lock | low (prevents lockout) | none / lock | 2nd run refused | GLM |

**BUDGET PLAN until Sat 2026-09-26 01:00 PDT:**
- **(a) Finish the landing page** — daily cap **≤10 Opus tool calls + ≤2 Fable calls**. Build brief for the chosen mock: Opus writes it (exact strings, layout, verification WITH expected output, rejected list); **GLM builds**; phone/desktop captures + dead-swipe + Lighthouse run **no-LLM**; Fable one montage verdict; operator phone test. Switch-over: if Opus hits 10 calls, defer polish to GLM + a next-day Fable gate.
- **(b) Install harness changes** — **GLM does the building**, Opus only reviews diffs (≤5 calls/day). Switch-over: GLM 429 → DeepSeek for non-tool legs, else pause installs.
- **(c) Two other projects at a trickle** — **≤3 Opus calls/day each**, ledger/ship only; everything else deferred to after reset.
- **Global switch-over rule:** any bucket hitting its daily cap → that work stops for the day, not "borrow from tomorrow." Claude weekly ≥75% → all three collapse to ledger/ship/taste.

---

## 4. MJCONSULT (sections A–G)

**A. How Max usage is counted, and your expensive habits ranked.** Max carries a rolling **5-hour** window plus a **weekly** cap, and Max shows **two weekly bars** (all-models + Opus-only) — Opus is metered on its own track (no public numbers; read Settings→Usage). Every turn re-sends the whole conversation as input; **prompt caching** makes the re-send cheap *only while warm*: cache-read tokens are **0.1× the base input price**, a 5-min cache write is **1.25×**, a 1-hour write **2×** — and on **Fable 5.1 specifically, cache hits/refreshes are 0.025× base input** (a big reason to keep Fable's cache warm). On Pro/Max there's no per-token bill, but **re-caching still counts against your limits**. Idle >~1 hour on a 100K+ session forces a full re-cache. Images cost `(width×height)/750` tokens (Anthropic docs, verbatim: "*tokens = (width px * height px)/750*"; a 1000×1000 image ≈1,334 tokens, 1092×1092 ≈1,590), capped after resize (long edge historically 1,568px; Opus 4.7+ raised the ceiling and made images ~3× costlier). **Your expensive habits, ranked:**
1. **Opening many images on the main session.** 23 images to ~456K context, and every subsequent turn re-bills ~456K input. This is your #1 sink. (Fix: montage + text-first evidence; image-open warning hook.)
2. **The Fable juror at 134,828 tokens for 6 screenshots.** (Fix: one downscaled montage, a written checklist, digest back.)
3. **Long sessions that blow the cache.** 456K/586K contexts re-cached after idle. (Fix: /compact, <200K sessions, kickoff handoffs.)
4. **The ~70K fixed per-turn prefix** (MCP 16.4K + skills 9.8K + duplicated instruction files). (Fix: disable unused MCP, prune skills, de-dupe worktree load.)
5. **Sol/GLM briefs carrying wrong expected values** (three in a row) forcing Opus to redo pre-flight. (Fix: executor prints actual values first.)

**B. Best role per model family.**
- **Claude:** Fable = taste/verdict (1 call/gate; cache is nearly free at 0.025×). Opus = orchestration/rulings/ledger/commits/diff-review. Sonnet = only when a leg needs this session's tools/browser.
- **GLM (z.ai):** your **primary tool-using executor** via `https://api.z.ai/api/anthropic`. GLM-5.3/5.3-Flash are the only served models (5.2/5.1/4.7 auto-route). **z.ai policy caveat:** the Coding Plan is "only for officially supported coding tools," data terms are **unpublished** (no documented ZDR, Chinese company) — so **no client/personal data**, same as DeepSeek. Off-peak (most US hours) is half-cost.
- **Gemini for visual QA:** **usable as a *second* opinion, not a sole juror.** Evidence: on the *MLLM-as-a-UI-Judge* benchmark, frontier MLLMs "approximate human preferences on some dimensions but diverge on others"; on Multimodal RewardBench the best VLM judges (Claude/Gemini/GPT) top out at **~72% accuracy**. Your own session saw a Gemini draft **silently drop 10 of 11 required sections** and pass shallow checks. So: Gemini/other vision models are fine for *checklist-against-screenshot* first passes behind deterministic gates, never as the final aesthetic authority. Free tier is Flash/Flash-Lite only (Pro moved behind billing); **Flash ~10 RPM / 250K TPM / 500–1,500 RPD**, **Pro ~50 RPD** — enough to test, not to run a batch. Free-tier prompts may be used for training → **no client data**.
- **DeepSeek:** deepseek-flash (V4.1-Flash) for volume; deepseek-v4-pro for a judged second opinion. **Automatic prefix caching** makes repeated input cheap (cache-hit input from ~$0.003/M off-peak). Off-peak (weekends + most US hours) is half price. Cost control: `GET /user/balance` before spend; set `max_tokens ≥ 32k` (empty-output trap); note peak = 01:00–04:00 & 06:00–10:00 UTC Mon–Fri. **Data residency: China; no client/personal data.**
- **ChatGPT's last 8%:** spend it on **at most one decisive Astra juror pass** (image-attached, operator OK first), one run at a time. Do not start builds on Sol — it will exhaust before Saturday and risks the Windows lockout.

**C. Orchestration patterns + evidence + guards.** Cascade (cheap extraction → frontier adjudication) and route-then-verify are the right spine; the FrugalGPT-style cascade and small-model-extraction + frontier-adjudication both hold quality *when a deterministic gate sits between stages* (your quote-gate caught 97.8% verbatim, cite-gate caught 3 bad ids). LLM-as-judge has documented **position, verbosity, and self-preference biases** — so (a) **blind** juries, (b) **never judge a model's output with the same model family**, (c) surface splits by name, (d) spot-audit a sample. Structured digests beat raw reads for the frontier judge. "Executor cannot edit the verify chain" is enforced by commit-pinning the tests + worktree isolation + a PreToolUse deny on `.claude/**`.

**D. Concrete changes ranked** — see the Master table (§5). Key MJCONSULT-specific ones: move visual QA off Claude (§3 #1); shrink juror inputs to **one downscaled montage + text-first evidence** (cuts a 134,828-token juror to a fraction); session-length/handoff rules; cut the ~70K fixed prefix (disable unused MCP servers via `.mcp.json`, prune skills, de-dupe the worktree double-load); budget meters + hard caps (§Q4); delegate brief pre-flight to the executor (it prints actual values before Opus trusts them); the image-open warning hook.

**E. Day-by-day Tue→Sat 01:00.**
- **Tue (today):** run the Q1 aggregator; write UNTIL-SATURDAY; install R7 cross-review + R4 status.json (repo). Opus ≤12 calls.
- **Wed:** GLM executes the top mechanical fixes; Opus reviews diffs only. Visual QA no-LLM. Fable 0–1 call.
- **Thu:** context diet (MCP/skills) via GLM; measure prefix before/after. Landing-page build brief written by Opus, built by GLM.
- **Fri:** finish landing page (captures/Lighthouse/dead-swipe no-LLM; one Fable montage verdict; phone test). Trickle the two other projects.
- **Sat pre-01:00:** freeze; defer global changes + the push to the post-reset 284 lane.
- **Every day:** `/usage` first; at ≥75% weekly collapse to ledger/ship/taste.

**F. Local transcript-tally script** — the Q1 aggregator (§1b) is exactly this; it tallies by image reads, tool output, subagents, verification loops, and work class, and **nothing leaves the machine** (stdlib only, read-only). Reference it directly.

**G. What NOT to do.** Don't send anything with client/personal data or keys to DeepSeek/GLM/Gemini (all outside the US or training-on-free-tier). Don't let an executor write RESUME/MEMORY. Don't use a single-session router (cache loss + secrets through a proxy). Don't make Gemini the sole aesthetic juror. Don't run two Codex tasks at once. Don't edit `~/.claude` without your explicit yes. Don't open many images on the main session. Don't read raw executor logs in full.

---

## 5. MASTER RANKED TABLE (all three projects)

| change | project(s) | Claude tokens saved (est + reasoning) | quality risk | check that proves it | who executes | effort | when |
|--------|-----------|----------------------------------------|--------------|----------------------|--------------|--------|------|
| Visual QA → deterministic + 1 montage | all | very high (134,828/juror; 456K-context turns re-billed) | med | known-bad capture → detector fires | GLM + scripts | med | this week |
| GLM mechanical executor in worktree | Ordani, landing, mjconsult | 1–2M/wk (333k/task × 3–6) | med | verify chain green on fixture + Opus diff | GLM | med | this week (repo) |
| Digests not raw reads | all | high (Opus stops reading logs) | low | digest ≤8KB cites path:line | GLM | low | this week |
| Cache discipline + <200K sessions | all | high (avoids full re-cache; Fable cache 0.025×) | low | no "cache expired" prompt on resume | Opus | low | this week |
| Context diet (MCP/skills/de-dupe) | all | ~35K/turn × turns | low | prefix bytes before/after | GLM | low | this week |
| status.json + policy.json governor | all | indirect (no overspend) | low | balance<$5 → volume held | GLM | med | this week (repo) |
| cross-review runner (GLM+DeepSeek) | all | med (replaces Opus review legs) | low | both providers in leg table | GLM | low | this week (repo) |
| Tier-burn deny + image-open warn hooks | all | med | med | 12 exec calls → deny; 5th image → ask | GLM | low | this week (repo) |
| Codex lockfile | all | low (prevents lockout) | none | 2nd run refused | GLM | low | this week |
| Generalize to user-global kit | all | med (reuse) | low | kit installs in a website repo | Opus proposes | med | **after reset** |
| DeepSeek as tool-using agent | all | med | **high (residency)** | privacy classifier blocks PHI | operator | med | operator decision |

---

## 6. DECISIONS FOR MICAH (≤6, recommendation first)
1. **Promote GLM to mechanical executor?** *(a) Yes, worktree-scoped + Opus diff-review [rec];* (b) reviewer-only for now; (c) no. — Frees ~1–2M Claude tokens/wk vs. a subtle-bug risk the verify chain must catch.
2. **Move visual QA fully off Claude?** *(a) Yes — deterministic + 1 Fable montage [rec];* (b) keep Fable juror but montage only; (c) unchanged. — Biggest single saving; risk is missing sub-grid taste issues (Fable montage covers the final call).
3. **Spend ≤$3 DeepSeek on the adversarial research leg?** *(a) Yes, $2 cap off-peak [rec];* (b) $1; (c) skip. — Cheap red-team of the top recs; leaves ~$9.94.
4. **How to spend ChatGPT's last 8%?** *(a) Hold for one decisive Astra juror pass, operator OK [rec];* (b) one Sol build; (c) don't touch. — Astra's image-judging is the higher-value use of a scarce bucket.
5. **Ship the user-global kit after Saturday?** *(a) Approve in principle, install post-reset [rec];* (b) repo-only forever; (c) decide later. — Global edits need your explicit yes; nothing global happens this week.
6. **Gemini's role in visual QA?** *(a) Second opinion behind deterministic gates only [rec];* (b) primary vision judge; (c) unused. — ~72% judge accuracy and a silent-section-drop precedent argue against sole authority.

---

## 7. HAND-OFF TO CLAUDE CODE (repo-level; an Opus session turns each into a GLM brief)

**Ordani:**
1. Write `scripts/harness/aggregate_claude_tokens.py` (Q1 body); run it; commit the output snapshot into the dossier.
2. Write `scripts/hooks/deny_outside_worktree.py` (PreToolUse deny outside `--add-dir` worktree + `.claude/`).
3. Write `scripts/harness/update_status.py` (DeepSeek `/user/balance` → `status.json`; GLM 429 inline-reset parser, Shanghai→UTC).
4. Confirm `scripts/cross-review/run_cross_review.py` dispatches GLM+DeepSeek pointer briefs in parallel, 8-KB schema files.
5. Add tier-burn deny + image-open warn hooks; Codex lockfile.
6. Context diet: disable unused MCP servers via `.mcp.json`; prune non-Ordani skills; fix worktree double-load.

**Landing page / MJCONSULT:** same 1–6, plus wire the no-LLM visual-QA chain (Lighthouse/axe/pixelmatch/dead-swipe) as a pre-push gate, and the Gemini-fallback + DeepSeek-cost-ledger wrappers.

*(Global items — the user-global kit generalization — are in Decisions, not here.)*

---

## 8. REJECTED IDEAS (one line each)
- **Single-session router (claude-code-router):** kills prompt caching and routes secrets through a local proxy — your separate-process design is safer.
- **Give GLM/DeepSeek memory-file write:** Sol wholesale-rewrote a resume file once; executors never write memory.
- **Gemini as sole aesthetic juror:** ~72% judge accuracy + a silent 10-of-11-section drop; second opinion only.
- **Claude volume fan-out for sweeps/reviews:** violates the operator rule and is the expensive path.
- **Reading long executor outputs in full:** use the 8-KB digest schema.
- **Two concurrent Codex tasks:** Windows sandbox account lockout (CreateProcessWithLogonW → error 1909).
- **Trusting `Write(path)` permission rules to scope an executor:** they don't bind (bead 2169); use default-deny + `--add-dir` + a PreToolUse hook.
- **Relying on `max_completion_tokens` to cap DeepSeek:** silently swallowed; set `max_tokens` and disable thinking.

---

## 9. SOURCES (URL · date checked 2026-09-22 · version/notes)
**Anthropic / Claude Code:** platform.claude.com/docs/en/build-with-claude/prompt-caching (cache-read 0.1×, 5-min write 1.25×, 1-hr 2×; **Fable 5.1 hits/refreshes 0.025×**); code.claude.com/docs/en/costs (/usage attribution, plan rows); code.claude.com/docs/en/hooks & platform.claude.com/docs/en/agent-sdk/hooks & /permissions (PreToolUse deny precedence, deny>ask>allow, hook fires before mode check, `--add-dir`/additionalDirectories only allow-list boundary, PreToolUse doesn't see @-refs); code.claude.com/docs/en/sub-agents (model frontmatter `sonnet|opus|haiku|fable`/full ID, `CLAUDE_CODE_SUBAGENT_MODEL` hard override, `--agents` fields); code.claude.com/docs/en/headless (claude -p, --max-turns, --output-format json, --allowedTools, --append-system-prompt); platform.claude.com/docs/en/release-notes/system-prompts/claude-fable-5-1 (model strings `claude-fable-5-1/opus-5/sonnet-5/haiku-4-5`); anthropic.com/claude-fable-and-mythos-5-1; Anthropic vision docs (tokens=(w×h)/750, 1000² ≈1334). Weekly/5-hr + Opus-only bar mechanics: morphllm.com/claude-code-usage-limits, axonbuild.com, claudelimit.com (no public token numbers; Settings→Usage). Image 3× on Opus 4.7: claudecodecamp.com.
**JSONL schema:** github.com/juliensimon/canopy#92, github.com/kamp-us/phoenix#8404, adityabawankule.io (subagents in `<session>/subagents/agent-<id>.jsonl`, `isSidechain`, `agentId`, `message.usage` fields; ~30-day retention).
**z.ai / GLM:** docs.z.ai/api/anthropic (`https://api.z.ai/api/anthropic`), docs.z.ai/devpack/overview (GLM-5.3/5.3-Flash only; 5.2/5.1/4.7 auto-route), aipricing.guru & glm-ai.chat & zentor.ai (Lite/Pro/Max $18/$72/$160; 5-hr+weekly credits; no published concurrency; off-peak half); layer3labs.io/guides/z-ai-review (unpublished data terms); 429 inline reset (Asia/Shanghai UTC+8, codes 1308/1310, no Retry-After) — captured live bodies (print-bench #545, OmniRoute #14479) + z.ai feedback repo (no documented usage endpoint); undocumented `/api/monitor/usage/quota/limit` (community, **UNVERIFIED**).
**DeepSeek:** api-docs.deepseek.com/guides/anthropic_api (`https://api.deepseek.com/anthropic`, tool calling + MCP, opus→v4-pro / sonnet+haiku→flash, images not fully supported); api-docs.deepseek.com/api/get-user-balance (**`is_available` + `balance_infos[]{currency,total_balance,granted_balance,topped_up_balance}` — strings; sample verbatim**); api-docs.deepseek.com/quick_start/rate_limit (2,500 flash / 500 v4-pro concurrency per user_id); pricing (justinmckelvey.com, benchlm.ai — flash $0.15/$0.60 off-peak, cache from $0.003; v4-pro $0.66/$1.98 off-peak; peak 01–04 & 06–10 UTC Mon–Fri); dev.to/haoxiangli (empty-output + swallowed-param trap).
**OpenAI Codex:** help.openai.com/en/articles/20001354 & chatgpt.com/codex/pricing (gpt-6-astra recommended, gpt-5.6-sol fallback; Codex+Work shared pool; /status); blakecrosley.com/guides/codex (astra Sept 3–4 2026; 272K context); github.com/openai/codex issues #27170, #18620 (CreateProcessWithLogonW 1326/1909 Windows sandbox lockout; "10 failed logons" is Windows default policy, **UNVERIFIED** in-issue).
**Gemini:** ai.google.dev/gemini-api/docs/rate-limits; aipromptshub.co & pecollective.com & aifreeapi.com (free = Flash/Flash-Lite; Flash ~10 RPM/250K TPM/500–1,500 RPD; Pro ~50 RPD behind billing; free-tier trains). UI-judge reliability: arxiv 2510.08783 (MLLM as UI Judge), arxiv 2502.14191 (Multimodal RewardBench ~72%), futureagi.com (self-preference guidance).
**Routers/Windows:** github.com/musistudio/claude-code-router (**37.3k★/3.1k forks, v3.1.1, MIT**); learn.microsoft.com CreateProcessW (**cmd line max 32,767 chars incl. null**).

---

### Version-sensitivity & confidence flags
- **VERIFIED (primary):** all current model names (Claude Fable 5.1/Opus 5/Sonnet 5/Haiku 4.5; GLM-5.3/5.3-Flash; gpt-6-astra/gpt-5.6-sol; deepseek-flash/v4-pro; Gemini 2.5 Flash/Flash-Lite); DeepSeek Anthropic endpoint + tool calling + `/user/balance` schema; GLM Anthropic endpoint; z.ai 429 mechanics; cache pricing incl. Fable 0.025×; image formula; Codex Windows lockout; JSONL layout; hook/permission precedence; Windows argv 32,767.
- **UNVERIFIED:** the undocumented z.ai `/api/monitor/usage/quota/limit` endpoint (community only); the exact "10 failed logons" Codex lockout threshold (Windows default, not in-issue).
- **ASSUMPTION/ESTIMATE:** GLM-executor weekly savings (333k/task × 3–6 tasks); "very high" visual-QA savings (scaled from 134,828/juror and 456K-context turns) — both depend on your actual task counts, which the Q1 aggregator will confirm.
- **Cite as "measured last session"** (not re-derivable here): Fable juror 134,828 tokens/6 screenshots; Sonnet executor 333k tokens/54 calls/28 min; Sol brief 187,218 tokens; DeepSeek review 914s/3.9KB/6 MINORs; GLM review 10 findings (1 refuted); ~110 ms/hook; ~70K fixed prefix; 456K/586K contexts; weekly moves 63→70% and 68→71%.