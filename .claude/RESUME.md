# RESUME — micahjonesconsulting (2026-09-21, Pass-125)

## READ FIRST
Branch `design/live-evolve` (worktree `.claude/worktrees/p106-live`). Build: `npx next build --webpack`
(`pnpm build` fails here). Push to main deploys. ROUTING: `.claude/AI_ROUTING.md` is the single source;
the SessionStart hook prints it (it did NOT load in the 09-21 Pass-125 session, which opened at the main
checkout; open the chat in the p106-live worktree). Preview builds go in `.claude/worktrees/p124-cuts`.

## LIVE: main = e8b44e3, dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH, all three domains
Site files unchanged since 48818f1. CARD 1 115/0. Revert: promote `dpl_9Q3JRk47vpd9b9xGnmkruoG5zkEM`.

## IN FLIGHT: Pass-125 "Work with me full-time" page (kickoff item 1)
- Ruled 09-21 (LESSONS #3, `d2fa3a4`): seat = early-stage build-and-sell hire (his pick over "head of");
  ORDANI proof only, nothing on its future; no location (09-02 ruling).
- Drafting: prompt `.planning/prompts/PASS-125-FULLTIME-DRAFT.md`; DeepSeek v4-pro, Sol, Gemini 2.5-flash
  write to `.planning/drafts/pass-125/{deepseek,sol,gemini}-fulltime.md`.
- Next: main-session ledger check of every tagged sentence -> Fable pick (one call) -> brief -> Sol builds
  on a preview branch in p124-cuts -> captures 390/1440 -> Fable + Astra + dspro confirm -> his look -> push.
- Route `/full-time` (NOT `/hire-me`: that 308s to /services since Pass-57). Links: PageFooter + home
  footrow + one /about line; sitemap. Not in primary nav.

## Owed after this page
Inner pages (/services, /about, /packages, /contact) diagnosis; the blog (answered-ratio cut first);
open fact questions (ORDANI "one engineer", east-west plain swap, "it shipped, nobody came", landing page
27 vs 34); Guardicore mobile LCP p75; K4/K5 race; confirm the 09-20 DeepSeek key was rotated.

## Traps
read the deploy id off the wire (#45) · commit by explicit pathspec (#23) · grep crashes on long lines
(#34) · Codex writes '?' for non-ASCII (#46) · "email me" and "sales manager" are gated site-wide.
