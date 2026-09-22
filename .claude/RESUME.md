# RESUME — micahjonesconsulting (2026-09-22 15:25 PDT: Harness v2 installed on harness/v2; his calls pending)

## READ FIRST
His call (09-22): new chats, harness on. SITE chat opens in `p106-live`: `.planning/handoff/NEXT-SESSION-KICKOFF.md`
(Pass-128c at the popup). LANDING chat opens in `landing-exemplar`: its RESUME. Harness follow-ups and his pending
decisions: `.planning/handoff/KICKOFF-AFTER-HARNESS-V2.md`.
SECURITY (LESSONS #65, `8a4f3b2`): a `claude -p` child launched from the desktop app sent his host Claude OAuth
tokens (about 20, short-lived) to api.deepseek.com (401). HIS ACTION: sign out of the desktop app and claude.ai, then
back in. Both third-party launchers now scrub; `test_h_host_auth.py` gates it.

## BUDGET: `python scripts/harness/status.py tier` (22:21 UTC)
5-hour 5%, weekly 13% on-pace, Fable 3%; weekly resets Sat 09-26 01:00 PDT. GLM ok. DeepSeek $7.78 (hold at $5).
ChatGPT 8%. `status.py claude` this week needs `--window-start 2026-09-22T17:13:00Z`.

## HARNESS V2: DONE (branch `harness/v2`, 63 commits since `438d1ad`; not pushed, not merged: his call)
E1-E4, B1-B4, W1-W4, C1-C4, G gates, H scrub; run_all ALL PASS (17 files). Cross-review
`.planning/harness/xreview-2026-09-22.md`; harness map `.planning/research/harness-2026-09-22/01-harness-map.md`;
LESSONS #60-#65. Queue and proposals: the kickoff above.

## LIVE: main = e091a16 (Pass-126). Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. A push needs his words.

## PASS-128c: BUILT, NOT SHIPPED (`preview/p128-jank` `ece8ab4`); PENDING popup: door edge + phone preview.
Kickoff: `.planning/handoff/NEXT-SESSION-KICKOFF.md`.

## QUEUE
128d · 127c doors · exits NEUTON.AI 390 · /about voice · Ordani wording · open facts · Guardicore LCP · dead CSS ·
DeepSeek key rotation · harness queue (kickoff).

## Traps
explicit pathspecs (#23) · executors ASCII (#46) · run pre-flight values (#52, #54, #60) · GLM thinks silently (#53)
· `git -C`, no `cd` out (#64) · RESUME cap hook (#64) · host-auth scrub before a third-party claude child (#65).
