# Kickoff: micahjonesconsulting, continuing after the 2026-09-21 night session (the Pass-128 jank arc)

Written 2026-09-21 by the Opus 5 session that landed the LESSONS #49 write guard and ran the Pass-128 A/Bs.
`.claude/RESUME.md` is current state and outranks this file. A SEPARATE chat owns the landing-page exemplar
(`.planning/handoff/KICKOFF-LANDING-EXEMPLAR.md`); do not start that work here.

## 0. Before anything
1. Open in the `p106-live` worktree. An "AI ROUTING" block should print at start: the reminder is now also wired in
   the main checkout's untracked `.claude/settings.local.json` (LESSONS #50), because a desktop chat can start in the
   main checkout and be moved into the worktree. If it does not print, say so.
2. Read `.claude/AI_ROUTING.md`. Boot probes in one line: `get_usage`, `scripts/deepseek-exec.ps1 -Smoke`,
   `scripts/gemini-exec.ps1 -Smoke`. Say the numbers. Last read 2026-09-21 18:29 PDT: weekly all-models 65%, Fable 72%
   (at 75%, Claude narrows to ledger, ship and taste); both reset 2026-09-26 01:00 PDT.
3. The write guard is live (LESSONS #49): a Write/Edit into the main checkout from a worktree chat is refused, tagged
   `[main-local]` or `[branch]`. A deliberate main-checkout write he asked for goes through a shell command, with his
   words in RESUME. `python .claude/hooks/worktree-write-guard.py --self-test` proves it and its wiring.
4. One popup to confirm the next step before any arc (LESSONS #3 "FULL-TIME PAGE HELD"); the recommended step is 1 below.

## 1. Where things stand
- LIVE, unchanged: `main = e091a16`, `dpl_Bk18zCfBqPb2DjTrkozL2dBs7git` on all three domains. Revert: promote
  `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. `design/live-evolve` is ahead by docs, briefs, evidence and harness only; any
  push to main redeploys and needs his words.
- The jank fix SOURCE is on `preview/p128-jank` in the p124-cuts worktree at `f4668d7` (not yet built as a whole, not
  measured as a build). It retires SplitReveal (four headings take `.cw-reveal`; the component, its CSS and the GSAP
  gate's allow-list entry are gone) and sets the doors band's `data-world` to terracotta.
- His rulings this session (LESSONS #3, newest last): the order (kickoff order); the guard also in the main checkout's
  local settings; the doors world is terracotta; SplitReveal retired; the Audit's price box stays as is.
- Evidence (`.planning/qa/pass-128/`): `detach-ab/` (128a) and `world-ab/` (128b). On the live page at 4x CPU, forcing
  the doors band to terracotta took frames over 33 ms from 45/40/44 to 2/2/2 and compositor drops from 76/79/79 to
  43/43/44; with SplitReveal's characters also out, drops 35/36/35. Grain, GPU, ExitScoreboard's rect read and Lenis's
  touch listeners: no effect. The cost was the world switch: 336 `a.cw-mlink` colour transitions per swipe (LESSONS #51).

## 2. Next, in order
1. **Pass-128c, build and verify the fix.** In p124-cuts: `git -C .claude/worktrees/p124-cuts rebase design/live-evolve`
   (brings the 128b probe). Dispatch Sol with `.claude/briefs/pass-128c-jank-build-verify.md`, `-Dir` = the p124-cuts
   worktree. Then the brief's section 7: eyes on the sheet and the shots, `card1-126.sh` (the main session runs bash),
   Astra on the before and after sheets. Then ASK him before any Vercel preview deploy for his phone (outward-facing).
   Ship only on his push words: merge `preview/p128-jank` into `design/live-evolve`, then CARD 1 with EXPECT_DPL on both
   aliases.
2. **Pass-128d, new, his to order.** The same colour-switch stutter will happen at every world change below the Audit:
   each switch fades every `a.cw-mlink` and `a.cw-section-cta` on the page, most of them off-screen
   (`world-ab/T.jsonl`). Measure the full page (the probe's `--to` a lower section) and bring him options by popup.
3. **Doors build (Pass-127c)** after 128c merges; section 4b is filled; the brief says how to restore the Pass-127 mocks.
4. Queued by him 09-21: the exits scoreboard's dead swipes on phones, the "Four exits I worked inside" title's presence,
   Neuton's "Undisclosed" (jurors propose from the ledger, he rules).
5. Queue: the held /full-time page, /about voice, Ordani "practice management" vs "CRM", open facts, Guardicore LCP p75,
   K4/K5 race, dead CSS, DeepSeek key rotation ("Not yet, I'll do it"). The blog page is the exemplar chat's.

## 3. Traps learned 2026-09-21 night (all in LESSONS)
- Hooks load from the directory a chat starts in; branch-only hooks never fired in a chat moved into the worktree (#50).
- The main-thread frames metric missed a real compositor improvement; count `DroppedFrame` too. The most frequent
  invalidation was not the cost (#51).
- Hand-typed JSON in Git Bash loses `\\`; the invalid payload made a fail-open hook pass silently. Build payloads with
  `json.dumps` (#49 amendment).
- Brief expected values: scope `git status` to the pass, name WARP ("Microsoft Basic Render Driver") as software, and
  never demand exact float equality (128a items 5-7 and 128b item 8 failed on the brief's own values).
- `screencast-scroll.mjs` writes `./frames` in the current directory: run it in a fresh folder, never in `pass-128/`.
- The machine carries ~385 idle node.exe processes (16 GB RAM, near-zero CPU), MCP servers from older chats; untouched.

## 4. How to work with him (unchanged)
Popups, two questions at a time, recommended first, read "Other" literally. Show the rendered thing (sheets or GIFs at
390 and 1440). When models split, give each pick by name with the tie-break. A LEGS stamp on every checkpoint and every
copy or design commit. Non-Claude models take every leg they can.

## Micah: open the new chat
In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it.`
