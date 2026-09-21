# RESUME — micahjonesconsulting (2026-09-20, Pass-124 DIRECT)

## READ FIRST
Branch `design/live-evolve`, worktree `.claude/worktrees/p106-live`. Build: `npx next build
--webpack`. PROD = `c7b7e32`, `dpl_8a3pxYPvFvDf4m1Cnu4RmWpJBjqX`, 3 domains (read off the
wire; kickoff's `dpl_A6Pq` is stale, #45). Push to main deploys: NOT APPROVED.
Routing: DeepSeek reads/drafts/sweeps (`scripts/deepseek-exec.ps1`, `-MaxTokens 32000+`);
Sonnet for repo/browser; ledger checks + ship decisions stay in the main session.

## Pass-124 state
Copy research saved at `.planning/research/pass-124-copy-research-ANSWER.md`, verified vs
LESSONS #3: 165 claims, 46 clean, 69 flags survived adversarial check. SEO sources HOLD
(2 fixes); voice samples and corpus figures do NOT. Gate row + rulings row in LESSONS #3.
Live site swept clean: zero NEVER-phrases on six pages.
His rulings 2026-09-20: (1) first move = cut list; (2) adopt the research's audience ruling
(shared-problem hero, hiring page off the footer), minus its ORDANI-as-client miscount.

## Homepage: PUSH APPROVED 2026-09-21, deploying
Operator, 2026-09-21, popup, verbatim pick: "Yes, push it (Recommended)", on the question "Push the new
homepage live? This ships the rebuilt homepage, the \" | \" title separator on every page, /about's
\"Product builds.\", and two build-time checks." Covers exactly that. `61db1d7`+docs -> main, deploy,
both aliases, `EXPECT_DPL=<new id> bash .planning/exec/card1-124.sh`. Revert: promote `dpl_9Q3J...`.

## Done since
- Title separator is now " | " site-wide; em-dash gate blocks .tsx, bite-tested (`9d2a277`).

## Waiting on him
- Five fact questions (end of the Pass-124 gate row): Guardicore mechanism, ORDANI "one
  engineer", "landing page" 27 vs 34, east-west swap, "it shipped, nobody came" for the blog.
- Blog unbuilt (no route/type/index/RSS/sitemap); needs the answered-ratio cut first.

## Traps
another session committed here at 19:07 (9019186): commit by explicit pathspec only (#23) ·
grep crashes on long one-line files and reads as zero (#34) · md never prettiered.
