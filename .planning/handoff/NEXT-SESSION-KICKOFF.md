# Kickoff: micahjonesconsulting SITE chat, Pass-128c after the fourth read (rewritten 2026-09-22 19:40 PDT)

Written by the Opus 5.5 site chat at 245K context (AI_ROUTING rule 9). `.claude/RESUME.md` outranks this file. Open
the new chat in the `p106-live` worktree; the AI ROUTING block should print. Budget first: `get_usage`, say the
numbers, record with `status.py claude ... --window-start 2026-09-22T17:13:00Z`, then `status.py tier`.

## 1. Where things stand
- LIVE unchanged: `main = e091a16`. Revert: promote `dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH`. Any push needs his words.
- Pass-128c built on `preview/p128-jank` `ece8ab4` (p124-cuts worktree). Wi-Fi preview for his phone:
  http://192.168.4.60:3126 (`preview_start` name `preview-p124-cuts`; restart it if down).
- Popup asked 09-22 18:05 PDT. Q2, his pick: "P1 Wi-Fi, this PC (Recommended)". Q1 (E0 as ruled / E1 hairline
  edge now / E2 drop the Audit fade / E3 both), his answer verbatim: "can we include opus 5.5 in this. its new and i
  want to see its thoughts on this". Done: `.planning/reviews/OPUS55-128C-READ.md` (verbatim). Blind: ONE MORE FIX
  (the sell door's edge). After the others: PICK E0, "wording corrected".
- The four reads by name: Astra SHOW HIM AS IS; deepseek-v4-pro NOT YET (item 5, 49 > 45); Fable ONE MORE FIX
  (edge); Opus 5.5 blind ONE MORE FIX, then E0 with corrections.

## 2. Next, in order
1. Check Opus 5.5's premises before re-asking Q1. CHECKED 09-22: the probe runs `--disable-gpu` unless `--gpu`
   (`p124-cuts/.planning/qa/pass-128/scroll-probe.mjs:423`) and all 6 `fix-ab/attrib` logs name "Microsoft Basic
   Render Driver", so 74/49/36 are software-compositor counts. TRUE: the doors ruling is "No cards, no borders"
   (`globals.css:1922-1925`, Pass-6, his words "they look weak"), so E1's bone rule re-cards the doors.
   NOT CHECKED: (a) the `hasPartialUpdate` split, LIVE 74 = 20 full + 54 partial vs PREVIEW 49 = 38 full + 11
   (count DroppedFrame events per arm in the fix-ab traces; a script leg, GLM); (b) a `--gpu` A/B, LIVE vs PREVIEW,
   doors to Audit, n=3 interleaved, no build needed (precedent `detach-ab/Agpu.jsonl`; GLM or Sol brief); (c) the
   nav glyphs on terracotta, about 4.1:1 at 12 px (compute from the tokens; check whether live's hero already fails
   the same way); (d) the 127c brief has no edge must-fix (`pass-127c-doors-build.md:29-31, 57-58`); if so, add one.
2. Re-ask Q1 by popup with the four reads by name, the checked premises, and his phone verdict. E0's text must not
   say 127c "fixes" the edge unless that brief carries the must-fix. If (a) or (b) shows full drops rose, say so
   plainly: it changes the recommendation.
3. Ship only on his push words: fast-forward main to 128c (the 23 commits between are docs; going via live-evolve
   carries harness v2, his call), then card1-128 from card1-126 (`OLD_DPL=dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`), CARD 1
   on both aliases.

## 3. In flight at handoff
- DONE: the GLM sheets (brief `.claude/briefs/opus55-pack-captures.md`): 24/24 routes 200, 137 frames, none under
  5 KB; every file written outside `.planning/qa/opus55-pack/` since dispatch was the main session's (diff_scope.py
  FAILs here only on the worktree's ~100 older untracked logs); both home sheets looked at. Copied to
  `C:/Users/micah/Downloads/opus55-site-review/`. The frame-number box covers the wordmark's "M": a reader must be told.
- His site-wide review CAME BACK (09-22 20:39): `.planning/research/opus55-review-2026-09/REPORT.md`, broken down
  against the queue in `BREAKDOWN.md` there (premises checked; four findings dropped as false). He has the two lists
  in chat. Round 1 ruled 09-22 night (LESSONS #3 "THE OPUS 5.5 SITE REVIEW, ROUND 1"): H1 kept; tool names picked
  by a corpus cut (TODO: count tool names in `C:/Users/micah/Code/reddit-research/`, then each rewrite by popup);
  Lenis kept; contrast left as is, which also CLOSES item 2.1(c), the 128c nav-contrast check. Round 2 (LESSONS #3
  "ROUND 2"): Packages into the nav, second item; the book not yet; the home Audit fine print shortened, exact
  wording to him by popup first; the hero photo is his own (a ledgered fact). STILL TO ASK once the corpus cut lands:
  the /services "notebook" line and the home meta description (both carry the tool names); named clients [C5] is
  his to raise. BUILD after the wording popups: one brief for the nav item, the fine print and the tool-name lines;
  a copy-and-design checkpoint (Fable, Astra, deepseek-v4-pro) before any push.
- Asked, unanswered: the LESSONS #65 sign-out.

## 4. Traps
- The global push gate reads `|vercel` in a quoted string as a deploy (twice on 09-22): use `-e` patterns; the
  PROPOSALS line is in `~/.claude/harness/PROPOSALS.md`.
- The fix-ab probes are software-rendered: never quote their dropped-frame counts as what a phone feels.
- Popups: two questions, recommended first, paths in chat. `git -C`, explicit pathspecs.
