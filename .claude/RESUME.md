# RESUME — micahjonesconsulting (2026-09-21, after the Pass-126 push)

## READ FIRST
Branch `design/live-evolve` (`.claude/worktrees/p106-live`). Build: `node .planning/exec/prepush-gates.mjs`
(LESSONS #47). Push to main deploys. Routing: `.claude/AI_ROUTING.md`. Preview builds: `.claude/worktrees/p124-cuts`
(`preview-p124-cuts` in THIS worktree's launch.json serves it on 3126).

## LIVE: main = e091a16, dpl_Bk18zCfBqPb2DjTrkozL2dBs7git, all three domains (Pass-126; card1-126 157/0)
Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. Branch is ahead by docs only (unpushed; a push needs his words).

## NOW (09-21, LESSONS #3 "THE DOORS: ANOTHER ROUND; THE BLOG STARTS WITH FIRST USERS")
- DOORS round 2 (Pass-127b): round 1 A-E in `p124-cuts/.planning/mocks/pass-127/doors/` (jury Fable C, Astra C,
  DeepSeek B); he picked "another round": a real moment like the $20M+ clip, bigger scale, top-studio craft; every
  phone swipe must advance. Drafters DeepSeek v4-pro + Sol + Gemini, Sol captures scroll frames, 3 jurors, his pick.
- BLOG piece 1: first users after launch, advice-led (his format words in LESSONS #3), NOT "it shipped, nobody
  came". DeepSeek + Sol draft titles/outline from live /work facts; I ledger-check; he picks. Evidence:
  `.planning/research/BLOG-TITLES-CHECK-2026-09-21.md` + `04-CUT-I`.
- BUG (his phone, live): scroll not smooth, colour switch hero->Audit glitchy, words slow (LESSONS #3 "LIVE HOME ON HIS
  PHONE"). Workflow wf_24b793b4-f2b (sonnet, evidence only): probe + 3 investigators + repro + sequential A/B, in
  `.planning/qa/pass-128/`. No fix before root cause; fix ships on his push words.
- NEXT after doors: exits scoreboard on phones (dead swipes), exits title presence, Neuton "Undisclosed" (jurors
  propose, he rules).

## QUEUE: his to order (ask by popup before any page arc; LESSONS #3 "FULL-TIME PAGE HELD")
- HELD /full-time (approved in content): `preview/p125-full-time` (`708ac61`); ship = `git revert 95cb41b` on the
  branch, then card1-125 rebased on card1-126 + its own push words.
- Inner pages (/about never got the research's voice; "practice management" vs "CRM" for Ordani).
- Open facts: ORDANI "one engineer", east-west plain swap, "it shipped, nobody came", landing page 27 vs 34.
- Guardicore mobile LCP p75; K4/K5 harness race; dead CSS `cw-principle__artifact`, `cw-pband__incl` (no importer).
- DeepSeek key rotation: he said 09-21 "Not yet, I'll do it".

## Traps
deploy id off the wire (#45) · explicit pathspecs (#23) · executors write no non-ASCII (#46), cannot run bash ·
PowerShell `*>` logs are UTF-16 (brief Sol to use `cmd /c "... > log 2>&1"`) · geometry checks measure the
finished frame (#48) · never commit in a worktree while an executor runs · `MSYS_NO_PATHCONV=1` for `/` args.
