# RESUME — micahjonesconsulting (2026-09-22 14:50 PDT: Harness v2 B-G in; F part 2 + map + W4-live running)

## READ FIRST: SECURITY (LESSONS #65, `8a4f3b2`)
A `claude -p` child launched from the desktop app sent his host Claude OAuth tokens (about 20, short-lived) to
api.deepseek.com (401, rejected). HIS ACTION: sign out of the Claude desktop app and claude.ai, sign back in.
Both third-party launchers now scrub host-auth vars; test_h_host_auth.py gates it. `claude-alt.ps1`: queued.

## WHERE
Branch `harness/v2`, worktree `.claude/worktrees/harness-v2`, kickoff `.planning/handoff/KICKOFF-HARNESS-V2-CONTINUE.md`.
`design/live-evolve` holds off AI_ROUTING, hooks, settings.json and the wrappers until harness/v2 merges.

## BUDGET: `python scripts/harness/status.py tier` (get_usage 14:46 PDT)
5-hour 45% (rolls over 14:50), weekly 12% on-pace, Fable 3%. GLM reset 14:44. DeepSeek about $11.2. ChatGPT 8%.
`status.py claude` this week needs `--window-start 2026-09-22T17:13:00Z`.

## HARNESS V2 (his popups 09-22; "K1 Continue here"; "use deepseek ... instead of waiting on glm")
DONE: E1-E4, B1-B4, W1-W4, C2-C4, G gates (dispatch-lint, resume-size), F part 1, cross-review `b1ab650`,
LESSONS #60-#65, P3 `919aaa1`. RUNNING: F part 2 (Sonnet; measures via measure-prefix.ps1 on DeepSeek), the map
(Sonnet; writes to <state>/map-out, I copy it in), W4-live (GLM, scrubbed). THEN: review + commit each, mini
cross-review of F2's settings diff, close. Not pushed, not merged: his call.

## LIVE: main = e091a16 (Pass-126). Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. A push needs his words.

## PASS-128c: BUILT, NOT SHIPPED (`preview/p128-jank` `ece8ab4`); PENDING popup: door edge + phone preview.

## QUEUE
xreview queue (status lock, overflow names, run_hook error, Fable count per chat) · claude-alt scrub · 128d · 127c
doors · exits NEUTON.AI 390 · /about voice · Ordani wording · open facts · Guardicore LCP · dead CSS · key rotation.

## Traps
explicit pathspecs (#23) · executors ASCII (#46) · run pre-flight values (#52, #54, #60) · GLM thinks silently (#53)
· `git -C`, no `cd` out (#64) · RESUME cap hook (#64) · host-auth scrub before third-party claude (#65).
