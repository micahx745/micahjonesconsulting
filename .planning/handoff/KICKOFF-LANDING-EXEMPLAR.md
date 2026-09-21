# Kickoff: the landing-page exemplar (blog post 2 as an awe-inspiring landing page, reusable for Ordani)

Written 2026-09-21 by the Opus 5 session that locked the three blog posts. A NEW chat, separate from the mjconsult
continuation (`.planning/handoff/NEXT-SESSION-KICKOFF.md`). Ruling: LESSONS #3 "POSTS 2 AND 3 LOCKED; THE LANDING-PAGE
POST BECOMES AN EXEMPLAR PAGE".

## The ask, his words (verbatim, 2026-09-21)
"I want this page to look amazing. I want to spawn a new chat that starts with tons of research using deepseek (claude
and chatgpt give it a gameplan on where to research and what to look for). I want this page to serve as the foundation
for the Ordani page - be able to plug in specifics of ordani. so basically have this blogs materiall be amazing but also
the actual page be an exmaple of an awe inspiring amazing landing page that i can reuse for ordani afterwards. This new
chat will need to use deepseek ALOT and use fable and astra and chatgpt and other models for quality and other things.
Maybe readjust the harness to add website skills, hooks and plugins great for building a great site."

## What gets built
The page for post 2, "Why isn't my landing page converting?" (words LOCKED: `.planning/drafts/blog-02/POST-2-LOCKED.md`),
designed so the page itself practices what the post preaches, and built as a REUSABLE landing-page system: content and
brand as data (slots and tokens), components that do not know which product they sell, and a short "plug in Ordani"
note, so Ordani's landing page (repo `C:/Users/micah/birthflowV2/`, its own palette incl. sage #5E7158) can be produced
by filling the slots. Posts 1 and 3 (`POST-1-LOCKED.md`, `POST-3-LOCKED.md`) and the /blog index reuse the system later.
The locked words do not change without his ruling; propose any additions (an interactive example, a diagram of real
numbers) by popup.

## Phase 0: boot
1. New worktree from `design/live-evolve`, branch `design/landing-exemplar` (do not touch `p124-cuts`, where the doors
   build runs). Read `.claude/AI_ROUTING.md`; `get_usage`, `scripts/deepseek-exec.ps1 -Smoke`, `scripts/gemini-exec.ps1
   -Smoke`; say the numbers.
2. First popup (two questions): (a) does the exemplar wear the site's existing theme (Color Worlds, Bricolage/Hanken,
   the Pass-122 permissions), with tokens swappable for Ordani (recommended), or a neutral system both brands skin?
   (b) the harness additions, see Phase 3 (proposed, never installed without his yes; repo-level only, never
   `~/.claude`: his 2026-09-20 ruling).

## Phase 1: research, DeepSeek-heavy (his instruction)
DeepSeek has no web access: it reads what it is given. So:
1. GAME PLAN: one Fable call and one Sol/Astra call independently write where to research and what to look for (the
   best landing pages and blog-posts-as-landing-pages of 2025-2026, the studios in `.planning/research/pass-122-research-answer.md`,
   conversion evidence with named sources, what makes a page reusable across brands, Ordani's buyers: birth workers). The
   main session merges them into one research brief.
2. FETCH: the cheap layer gathers the sources (the `tavily-web` or `firecrawl-scraper` skills, curl, Sol); screenshots
   where the design is the point.
3. READ AT VOLUME: `deepseek-flash` extracts from every source to a fixed schema; `deepseek-v4-pro` synthesises. Paste
   text in; never send client rows or keys.
4. QUALITY: Fable, Astra and `deepseek-v4-pro` read the synthesis independently; he gets their picks by name.

## Phase 2: directions, then the build
The Pass-127 doors pipeline, which worked: blind drafts from several models as self-contained HTML mocks, captured at
390 and 1440 with scroll frames and the dead-swipe detector, three blind jurors, his pick. Then a brief in
`.claude/briefs/`, Sol builds on a preview, and the gates below, his phone test, his push words.

## Phase 3: harness additions to PROPOSE (his "maybe"; popup first)
Repo-level skills already available to invoke: `frontend-design`, `impeccable-*`, `web-performance-optimization`,
`scroll-experience`, `page-cro`, `copywriting`. Candidate repo hooks: `blog-lint.mjs` on blog content writes; the
dead-swipe detector and `.planning/qa/pass-128/scroll-probe.mjs` as pre-push gates for scroll-driven pages; CLS/LCP
from `.planning/qa/pass-126/cls-page.mjs`. Plugins: `premium-web` is installed; search for others with his yes.

## Gates that already exist (use them)
`node .planning/exec/prepush-gates.mjs` (all build gates) · `node .planning/exec/blog-lint.mjs` (the blog voice) ·
dead-swipe detector (`.planning/mocks/pass-127/doors-r2/capture-127b.mjs` + `sheets-127b.py`) · `scroll-probe.mjs`
(frame jank at 4x CPU; note its touch-gesture workaround) · the LESSONS #3 ledger for any fact (the about-me foot).

## Lessons that apply here (do not relearn them)
No per-character GSAP reveals (Pass-128: 1.1 s to settle, the most frequent per-frame style write). Every phone swipe
must visibly change a scroll-held moment. Measure the finished frame. Juries judge against "does this kill it", not
against each other. Blog copy: generic advice, no work stories, no pitch, the ledgered foot.

## Micah: open the new chat
In the Claude desktop app's Code tab, choose the `micahjonesconsulting` repo (the chat creates its own worktree), pick
**Opus 5**, and paste:

`Read C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live/.planning/handoff/KICKOFF-LANDING-EXEMPLAR.md and follow it.`
