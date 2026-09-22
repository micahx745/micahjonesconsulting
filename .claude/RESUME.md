# RESUME — micahjonesconsulting (2026-09-22 11:55 PDT: Harness v2 run B in; run D out to Sonnet)

## READ FIRST
Harness v2 = branch `harness/v2`, worktree `.claude/worktrees/harness-v2`. Runs from
`.planning/handoff/KICKOFF-HARNESS-V2-CONTINUE.md`: Sonnet executes B-F, GLM only the harness map after 14:44 PDT.
`design/live-evolve` holds off AI_ROUTING, hooks, settings.json and the exec wrappers until harness/v2 merges.
Pass-128c: `.planning/handoff/NEXT-SESSION-KICKOFF.md`. Build: `node .planning/exec/prepush-gates.mjs` (#47).

## BUDGET: `python scripts/harness/status.py tier` (recorded 11:51 PDT)
5-hour 27%, weekly 7% on-pace, Fable 3%; weekly resets Sat 09-26 01:00 PDT. GLM 429 until 14:44 PDT. DeepSeek
$11.29. ChatGPT 8%: ship gates only. His CLI login expired. This week, `status.py claude` needs
`--window-start 2026-09-22T17:13:00Z` (the one-time reset); the default assumes 7 days.

## HARNESS V2 (his popups 09-22: all 16 approved; "Fresh chat now, Sonnet executes")
DONE: E1, E2, briefs, merge `9cc32cc`, fold `6e96bea` `bba678d` `96c1c36`, run B `e8f6865`..`6bafa41` (1 review
fix), run D `34032de`..`c7ea502` (E2.7 widened at review: lines 162-163 leaked into the exit code), run C
`899185b`..`545a28f` (hooks live), E `6dd2446`..`ebcdddf`, F part 1 `ff989b9`..`ce902e9`. LESSONS #60-64.
NOW: run G (gates for #60/#64). AFTER 21:44 UTC (timer set): F part 2 + W4-live, the map on GLM, cross-review.
Context: his popup "K1 Continue here (Recommended)". Not pushed, not merged. LESSONS next free: #60.

## LIVE: main = e091a16, dpl_Bk18zCfBqPb2DjTrkozL2dBs7git, all three domains (Pass-126)
Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. A push needs his words.

## PASS-128c: BUILT, NOT SHIPPED (`preview/p128-jank` `ece8ab4`)
Frames >33 ms 45 -> 2; Item 5 FAIL (49 > 45) = the fade he ruled for. Astra SHOW; dspro NOT YET; Fable ONE MORE
FIX (door edge). PENDING popup: door edge (rec: 127c) + phone preview.

## QUEUE
128d options · 127c doors · exits incl. NEUTON.AI at 390 · niniaazzopardi flow · HELD /full-time · /about voice ·
Ordani wording · open facts · Guardicore LCP p75 · K4/K5 race · dead CSS · DeepSeek key rotation · global proposals.

## Traps
explicit pathspecs (#23) · no non-ASCII from executors (#46) · pre-flight brief values (#52, #54) · GLM thinks 9 min
silently (#53) · use `git -C` · Write tool, not heredocs · copy-lint bans more than brand.json (#58).
