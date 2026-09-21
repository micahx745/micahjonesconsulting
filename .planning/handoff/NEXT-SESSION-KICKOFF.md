# Kickoff: micahjonesconsulting, Pass-125 — the rest of the site, on the other models

Written 2026-09-21 by the Opus 5 session that shipped the Pass-124 homepage. `.claude/RESUME.md` is
current state and outranks this file. Supersedes the Pass-124 kickoff (git history keeps it).

## 0. Before anything: the routing (operator 2026-09-21, verbatim)
"We are using lots of claude while we need to use deepseek alot, chatgpt, chatgpt, and gemeini to cut down
on how much claude we use. Next chat will do this things and have the frontier models fable and astra and
deepseek confirm quality."

1. A SessionStart hook (`.claude/hooks/routing-reminder.py`) should have printed an "AI ROUTING" block into
   this session. If it did not, tell him: he opens `/hooks` once, or restarts, so the new project hook loads.
2. Read `.claude/AI_ROUTING.md` in full. It is the single source: the tier table, model ids, commands, rules,
   per-model traps, and the dated rulings behind them. Do not add routing anywhere else, and never in
   `~/.claude` (he refused global changes on 2026-09-20).
3. Boot probes, cheap, and say the results in one line:
   `mcp__ccd_session_mgmt__get_usage` · `scripts/deepseek-exec.ps1 -Smoke` · `scripts/gemini-exec.ps1 -Smoke`.
   Gemini answers on `gemini-2.5-flash` only today (pro tiers 429/404, newer flash 503; see the script's
   STATUS). A paid Gemini tier is HIS spend call, parked.
4. The shape of every copy or design unit, as proved on the homepage:
   drafts from two non-Claude families (DeepSeek v4-pro + Sol, Gemini when useful) → the main session
   checks every fact against LESSONS #3 → Fable picks (one call) → build on a PREVIEW branch by Sol →
   the main session opens every capture → Fable, Astra AND deepseek-v4-pro confirm quality → he judges the
   RENDERED page → he approves the push verbatim. Every checkpoint carries a `LEGS:` stamp.

## 1. What he taught this pass (do not relearn these)
- **Never hand him a tick list of cuts.** He asked "did the research not say what to say and what to cut?"
  Apply the research's direction as one proposal he judges on sight; ask only what is his to decide.
- **When models disagree, give him each pick BY NAME** (Fable's, Astra's, DeepSeek's) with your tie-break.
- **Do not hide or rename what he relies on** (the How I work heading) on your own reading of a critique.
- **Month-one inflation:** drafts kept merging "Something named ships in month one" with the production
  build. The approved promises are separate; the fact check must catch that every time.
- **Executors write no non-ASCII copy** (LESSONS #46; `scripts/mojibake-gate.mjs` now fails the build).
- A secrets hook false-positives on file names containing `re_tool_`; reference such paths with a wildcard.

## 2. Where things stand
LIVE: `main = 48818f1`, `dpl_6mBZ6hbC6TWc3r3g3Keku9zGSfs2` on all three domains, CARD 1 115/0
(`.planning/exec/card1-124.sh`, run with `EXPECT_DPL=<id read off the wire>`). Revert: promote
`dpl_9Q3JRk47vpd9b9xGnmkruoG5zkEM`. Branch `design/live-evolve` in worktree `.claude/worktrees/p106-live`.
A second worktree `.claude/worktrees/p124-cuts` (node_modules installed, detached at `61db1d7`) is the
preview build box: put a preview branch there, never in p106-live, where another session may be working.
Build: `npx next build --webpack` (`pnpm build` fails on this machine). Push to main deploys.

## 3. The work, in the order I would take it
1. **"Work with me full-time" page** for the hiring manager (the audience ruling he adopted: its own page,
   linked from the footer and once from /about, not in the primary nav; lead with how he thinks and what he
   has owned, not package prices). New page, new copy: drafts, fact check, Fable pick, preview, three
   confirmations, his look. Facts only from LESSONS #3; no personal tenure years; no role titles beyond
   what the ledger allows ("worked inside", the Postmates product-analyst title).
2. **The inner pages** (/services, /about, /packages, /contact). The research never read them. Run the same
   diagnosis the research ran on the home (DeepSeek and Sol read the live text; Gemini as a third), then one
   proposal per page he judges on sight. The parked cut list (`.planning/mocks/pass-124/CUTS-PROPOSED.md`)
   is input, not a tick list. B1 ("Ask about" buttons) is rejected on function; keep them.
3. **The blog** is unbuilt: route, MDX content type and schema, index, RSS, sitemap entries. Before any topic
   list, cut the answered-ratio data from the local corpus (`C:/Users/micah/Code/reddit-research/`); the
   research never saw it. Rates ("8.9%", "1.0%") are NEVER publishable; the corpus figure is 4,464 posts.
   Whether "it shipped, nobody came" may carry the blog is HIS ruling (it was the held-back book's title).
4. **Open fact questions, his:** ORDANI built "as one engineer"; the plain-language Guardicore east-west
   line (a rejected rewrite needs a new dated ruling). Settle yourself from the data: "landing page" 27 vs
   the ledgered 34 authors.
5. **Smaller, owed:** read Speed Insights field p75 for /work/guardicore mobile LCP; the K4/K5 harness race
   (scrollIntoView vs Lenis); ask him to confirm the DeepSeek key he pasted into chat on 09-20 was rotated.

## 4. How to work with him
Popups, two questions at a time, recommended option first, read "Other" literally. Show the real rendered
page (sheets at 390 and 1440, and the preview served for scrolling), never only a document. A badly reading
sentence goes to him at once with rewrites. Lead with what happened and what he must decide.

## Micah: open the new chat
In the Claude desktop app's Code tab, choose the `p106-live` worktree, pick **Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/NEXT-SESSION-KICKOFF.md and follow it. Start with the full-time page.`
