# RESUME — micahjonesconsulting (2026-09-21, Pass-124)

## READ FIRST
Branch `design/live-evolve` (worktree `.claude/worktrees/p106-live`). Build: `npx next build --webpack`
(`pnpm build` fails here). Push to main deploys. ROUTING: `.claude/AI_ROUTING.md` is the single source
(tiers, ids, commands, rules; Ordani-style), printed into every session by the SessionStart hook
`.claude/hooks/routing-reminder.py`. DeepSeek, Sol, Gemini (`scripts/gemini-exec.ps1`, 2.5-flash only
today) do the legs; Fable + Astra + deepseek-v4-pro confirm quality. These files are on the branch,
pushed to `main` 2026-09-21, operator verbatim: "push the routing files to main too" (docs,
scripts, harness only; no site file). Next chat: `.planning/handoff/
NEXT-SESSION-KICKOFF.md` (full-time page first).

## LIVE 2026-09-21: main = e8b44e3, dpl_2mGqgwPQ1BwZCHpoi4wek2dupiwH, all three domains
Approval verbatim (LESSONS #3, PASS-124 PUSH APPROVED): "Yes, push it (Recommended)". CARD 1
115/0 again after the routing push (`.planning/exec/card1-124-prod-0921b.txt`); site files unchanged since 48818f1. Revert: promote
`dpl_9Q3JRk47vpd9b9xGnmkruoG5zkEM` (9019186).
Shipped: the rebuilt home (hero "It works. / It just does not sell.", doors under the hero, How I
work as four steps, ORDANI photos off; receipts and NAME THE PROBLEM unchanged), " | " title
separator, /about "Product builds.", mojibake gate, em-dash gate on .tsx. Hero CLS 0.0003 (was 0.0045).

## Owed, none blocking
- "Work with me full-time" page for the hiring manager (the adopted audience ruling). Not started.
- The blog: route, content type, index, RSS, sitemap. Not started; needs the answered-ratio cut first.
- Inner-page cuts (/services, /about, /packages, /contact): parked; the research never read them.
- Open fact questions: ORDANI "one engineer", plain-language east-west swap, "it shipped, nobody
  came" for the blog, "landing page" 27 vs 34 (a data question, main session settles it).
- /work/guardicore mobile LCP: read Speed Insights field p75. K4/K5 harness race fix.
- He should confirm the DeepSeek key he pasted into chat on 09-20 was rotated.

## Traps
another session pushed 9019186 to main on 09-20: read the deploy id off the wire, never a doc (#45) ·
commit by explicit pathspec (#23) · grep crashes on long one-line files and reads as zero (#34) ·
Codex writes '?' for non-ASCII (#46).
