# Kickoff: micahjonesconsulting, continuing Pass-128c at the operator popup (written 2026-09-22)

Written by the Opus 5 session that built and verified Pass-128c. `.claude/RESUME.md` is current state and outranks this
file. Two other chats exist: the landing exemplar (`.planning/handoff/KICKOFF-LANDING-EXEMPLAR.md`) and the harness
research (`.planning/handoff/KICKOFF-HARNESS-RESEARCH.md`). Do not do their work here.

## Harness v2 is live here (added 2026-09-22 by the Harness v2 chat; it outranks section 0's budget text)
- Routing: `.claude/AI_ROUTING.md` (its Harness v2 top section is the amendment section 0.2 asks about). Budget: run
  `get_usage`, record it with `python scripts/harness/status.py claude --five-hour N --weekly N --fable N --resets
  <ISO> --five-hour-resets <ISO> --window-start 2026-09-22T17:13:00Z` (that start holds this week only), then read
  `python scripts/harness/status.py tier`. At 22:21 UTC: 5-hour 5%, weekly 13%, Fable 3%, DeepSeek $7.78 (volume
  held under $5). Section 0.2's 70% and 73% predate his one-time reset.
- Hooks act on this chat: 40 execution calls without his message are denied (delegate, or ask him); an 8th raw image
  asks; past 200K context a warning comes once per 50K; Claude subagents are denied at 75% weekly; a dispatch whose
  brief fails `brief_lint.py` is denied; a RESUME over 2,500 bytes is blocked. Check: `python
  scripts/harness/tests/run_all.py` ends `ALL PASS (17 files)`.
- Executors: GLM through `scripts/claude-glm.ps1 -Batch` (pointer brief, receipt, digest). When GLM is capped, do not
  wait: a Sonnet subagent for repo work, DeepSeek for text-only legs (his words, 2026-09-22). A Claude Code child aimed
  at a third party runs only through a launcher with the LESSONS #65 scrub.
- SECURITY (#65): ask him whether he signed out of the desktop app and claude.ai and back in; record his answer.

## 0. Before anything
1. Open in the `p106-live` worktree; the AI ROUTING block should print (LESSONS #50). If it does not, say so.
2. BUDGET FIRST. Operator 2026-09-22, verbatim: "Claude usage is at 70% for the week and fable is at 73. chatgpt has
   only 8% left for 4 days and 7 hours. GLM is completely reset, deepsek has 11.94$ left in credits from the 20$ i had
   added and we spent around 12 mil tokens within this project and two other projects. Without claude reset on
   Saturday at 1am - we have to tread lightly." Run `get_usage` and say the numbers. If `.claude/AI_ROUTING.md` carries
   an amendment dated after 2026-09-22 (the harness research chat), follow it. Until then: GLM executes (fresh quota),
   Gemini reads visuals, DeepSeek stays inside its credit, ChatGPT only for a ship gate with his OK, and Claude only for
   rulings, the ledger and ship calls. The main session does not open screenshot batches itself: the Pass-128c chat
   opened 23 images, and one Fable read of six images cost 134,828 tokens.
3. The write guard is live (LESSONS #49). `python .claude/hooks/worktree-write-guard.py --self-test` proves it.
4. One popup to confirm the next step before any arc.

## 1. Where things stand
- LIVE, unchanged: `main = e091a16`, `dpl_Bk18zCfBqPb2DjTrkozL2dBs7git` on all three domains. Revert: promote
  `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. Any push to main redeploys and needs his words.
- Pass-128c is BUILT AND VERIFIED on `preview/p128-jank` (p124-cuts worktree) at `ece8ab4`: source `099c07a` (the doors
  band's world is terracotta; SplitReveal retired) plus the gsap package removal and the evidence. Build: PREPUSH pass;
  gsap gate clean (88 files). Live -> fix (390 px, 4x CPU, median of 3): frames over 33 ms 45 -> 2; main-thread p95
  33.4 -> 16.8 ms; style recalc 589 -> 31 ms; dropped frames 74 -> 49; transition events 868 -> 37. CLS 0.0193 (390),
  0.0067 (1440). card1-126 against the local build: 0 failures. Eyes on both sheets and all 20 shots: no regression.
- Brief item 5 FAILED as written (49 > 45). Cause, measured: the Audit heading's 0.55 s fade, which he ruled for (A/B
  `fix-ab/attrib`: 50 vs 36 with that fade off); `will-change` recovers nothing (`fix-ab/willchange`).
- The three reads (`.planning/reviews/PASS-128C-JURY-DISPOSITION.md`): Astra SHOW HIM AS IS; deepseek-v4-pro NOT YET
  (item 5); Fable ONE MORE FIX (on the terracotta ground the terracotta door has lost its edge: at 1440 it reads as
  loose type, at 390 it runs into the Audit heading). Main-session tie-break: ship-ready as ruled; solve the edge in
  the Pass-127c doors rebuild, which has the same problem.
- He has SEEN the doors shots at 390 and 1440 and both scroll sheets. The popup below was NOT asked yet.

## 2. Next, in order
1. The pending popup, two questions, each read BY NAME with the tie-break:
   a. The door edge: "As ruled; edge in 127c (Recommended)" / "Add a hairline edge now" (the Audit box's thin bone
      rule on the sell door, one more build-and-check round) / "Drop the four heading fades" (36 dropped frames,
      inside the brief's 45; every other heading keeps its fade).
   b. The phone preview: push `preview/p128-jank` so Vercel builds a private preview (production untouched; it sits
      behind Vercel Authentication, so he gets a temporary share link, as in Pass-120). Outward-facing: his words first.
   Then ship only on his push words: merge `preview/p128-jank` into `design/live-evolve`; write `card1-128.sh` from
   card1-126 with `OLD_DPL=dpl_Bk18zCfBqPb2DjTrkozL2dBs7git` and 128c markers (the doors section's
   `data-world="terracotta"`, `cw-reveal` on the four headings); CARD 1 with EXPECT_DPL on both aliases.
2. Pass-128d, his to order. The premise was WRONG: the fix fires no link colour fades below the Audit (colour
   transitions 15, against 509 live; espresso and petrol keep terracotta's light text, only bone changed it). The rest
   of the page's cost (`page-ab`: dropped frames 238, frames over 33 ms 44) comes from the exits scoreboard's font-size
   transitions and the How I work steps. Bring options from that data by popup.
3. The doors build (Pass-127c) after 128c merges. FIRST add to its brief: on the terracotta world the sell door has no
   edge (Fable's 128c read), and the rebuild's full-height terracotta plane has the same problem.
4. Exits: the dead swipes on phones, the "Four exits I worked inside" title, Neuton's "Undisclosed", and the NEUTON.AI
   row blank above its caption in `fix-shots/normal-390x844-ordani.png` (maybe the capture skipping the scroll step:
   check on live).
5. Parked by him: the niniaazzopardi flow is built by the landing exemplar and reused here later; the brand row waits
   until then (LESSONS #3 "THE NINIAAZZOPARDI FLOW"). Queue: the held /full-time page, /about voice, Ordani "practice
   management" vs "CRM", open facts, Guardicore LCP p75, K4/K5 race, dead CSS, DeepSeek key rotation.

## 3. Traps learned 2026-09-21/22 (in LESSONS or RESUME)
- `preview_start` reads the MAIN checkout's `.claude/launch.json` when the chat started there: use `prod-p124` (port
  3126), not `preview-p124-cuts`.
- Sol's PowerShell has no `rg` and no `pnpm`, and `curl` means Invoke-WebRequest. Use `git grep` and `curl.exe`; the
  main session runs pnpm.
- Pre-flight every brief expected value in the executor's shell; a timing figure at the sampler's floor is an artifact
  (LESSONS #52). A threshold taken from an A/B arm must come from an arm that matches the ruled design.
- A `cd` in Bash or PowerShell moves the session's primary working directory: use `git -C` and full paths.
- `scroll-probe.mjs` does not record `--inject-css` in its JSONL: keep the CSS files beside the arms and confirm by
  behaviour.

## 4. How to work with him (unchanged)
Popups, two questions at a time, recommended first, read "Other" literally. Show the rendered thing. When models
split, give each pick by name with the tie-break. A LEGS stamp on every checkpoint and every copy or design commit.

## Micah: open the new chat
In the Code tab choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it.`
