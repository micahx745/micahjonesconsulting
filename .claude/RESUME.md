# RESUME — micahjonesconsulting (2026-09-22 10:25: harness research running; Pass-128c at the popup)

## READ FIRST
This chat: harness research, state in `.planning/research/harness-2026-09-22/plan.md` (kickoff
`.planning/handoff/KICKOFF-HARNESS-RESEARCH.md`). Pass-128c continues from `.planning/handoff/NEXT-SESSION-KICKOFF.md`.
Landing exemplar = its own chat. Branch `design/live-evolve` (p106-live). Build: `node .planning/exec/prepush-gates.mjs`
(#47). Push to main deploys. Routing: `.claude/AI_ROUTING.md`. Write guard live (#49, #50).

## BUDGET (LESSONS #3 "THE BUDGET RESET; OPUS 5.5"; get_usage 09-22 10:13 PDT)
Weekly 1%, Fable 1%, 5-hour 5%; weekly bars still reset Sat 09-26 01:00 PDT (a 3.6-day window). Main: Opus 5.5.
ChatGPT 8%: ship gates only. GLM: executor. DeepSeek $11.94 (research cap $3). Gemini: reader, visuals.

## HARNESS RESEARCH (in progress; no site code, no push)
SCOPE CUT (plan.md): chat "LANDING PAGE 2" installs Harness v2 (branch harness/v2). Here: GLM legs 1, 2a, 2b ->
commit -> send it the hash + paths -> STOP (confirm with him). Don't edit AI_ROUTING/hooks/settings/scripts.
P4/P5/P7 settled (b2bfbf9). Running: leg 1 attempt 2 (GLM first thinks can take 9 min: not a hang).

## LIVE: main = e091a16, dpl_Bk18zCfBqPb2DjTrkozL2dBs7git, all three domains (Pass-126)
Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. A push needs his words.

## PASS-128c: BUILT AND VERIFIED, NOT SHIPPED (`preview/p128-jank` at `ece8ab4`, p124-cuts)
Frames over 33 ms 45 -> 2, p95 33.4 -> 16.8 ms, drops 74 -> 49; CLS 0.019/0.007. Item 5 FAIL (49 > 45) = the Audit
heading fade he ruled for. Reads: Astra SHOW HIM AS IS; dspro NOT YET; Fable ONE MORE FIX (terracotta door edge).
He saw the doors shots and both sheets. PENDING popup: door edge (rec: solve in 127c) + phone preview.

## NEXT (after 128c)
128d options · 127c doors build (terracotta-edge problem in its brief) · exits items incl. NEUTON.AI row at 390.

## PARKED BY HIM / QUEUE
niniaazzopardi flow (exemplar builds, site reuses). HELD /full-time · /about voice · Ordani "practice management" vs
"CRM" · open facts · Guardicore LCP p75 · K4/K5 race · dead CSS · DeepSeek key rotation ("Not yet, I'll do it").

## Traps
explicit pathspecs (#23) · executors: no non-ASCII (#46), no bash; Sol has no rg/pnpm · pre-flight brief values in
the executor's shell (#52) · a `cd` moves the session's primary dir: use `git -C` · preview_start reads MAIN's
launch.json (`prod-p124`).
