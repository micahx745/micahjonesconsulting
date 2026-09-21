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
  ORDANI proof only; no location (09-02 ruling).
- Drafts dspro/Sol/Gemini -> ledger check -> Fable pick (`.planning/reviews/FABLE-125-FULLTIME-PICK.md`,
  blend on Sol A; 2 main-session edits recorded there) -> brief `.claude/briefs/pass-125-full-time.md` (`f665260`).
- PREVIEW: p124-cuts, branch `preview/p125-full-time`, round 4 = `dd774d6` (jury fixes + tie-breaks: Code-first
  order, Astra's Result headline; all measure brackets met). Jury round 1 all "SHOW HIM AFTER FIXES"
  (`.planning/reviews/PASS-125-JURY-DISPOSITION.md`); re-confirmation of round 4 running (Fable, Astra, dspro).
  Served: `prod-p124` in the MAIN checkout's launch.json, port 3126; stop it before any p124-cuts rebuild.
- His calls pending: the page on sight; Result headline + order (picks by name); the Neuton.AI "queuing" line
  (his approved wording, 3 rewrites by name); then apply to design/live-evolve + push approval verbatim.
- Route `/full-time` (NOT `/hire-me`, which 308s to /services). Links: three footers + one /about line.

## Owed after this page
Inner pages (/services, /about, /packages, /contact) diagnosis; the blog (answered-ratio cut first);
open fact questions (ORDANI "one engineer", east-west plain swap, "it shipped, nobody came", landing page
27 vs 34); Guardicore mobile LCP p75; K4/K5 race; confirm the 09-20 DeepSeek key was rotated.

## Traps
read the deploy id off the wire (#45) · commit by explicit pathspec (#23) · grep crashes on long lines
(#34) · Codex writes '?' for non-ASCII (#46) · "email me" and "sales manager" are gated site-wide.
