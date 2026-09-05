New phase, new repo: THE BOOK. Rework The 80% Wall to fit the narrative the research
landed on, and make it sell to more people. The site is done for now; do not touch it
except through the one script that publishes into it.

Repo: C:/Users/micah/Code/the-80-percent-wall  (Typst source in src/, output/ holds the
built PDFs, companion/ the 26 files, scripts/publish-to-site.mjs pushes the sample and
the frozen copy into the site repo). Start there.

Model: main on Fable 5.1, Opus as the default subagent doing the majority of the work.
Check the repo's .claude/ first. No .claude/ → run fable-harness-init BEFORE the first
Write, then set CLAUDE_CODE_SUBAGENT_MODEL=opus in its .claude/settings.json the way
C:/Users/micah/Code/micahjonesconsulting/.claude/settings.json does. Read
C:/Users/micah/.claude/MODEL_ROUTING.md §6: Fable rules and writes briefs, Opus executes,
Fable judges at named checkpoints. 15 Fable tool calls per arc. Read
C:/Users/micah/.claude/playbooks/document-artifacts.md (the Typst pipeline, the
page-walkthrough gate, certified ≠ sendable) and marketing.md before the first edit.

THE DIRECTION, in my words: "rework the playbook and the pitch of the playbook …
focusing on GTM stuff instead of engineering … really help this book sell to more
people." That is the ruling. How far the book's balance shifts is NOT yet ruled — it is
the first thing you bring back to me, with evidence.

READ THESE FIRST, in order. All absolute paths; all in the site repo
C:/Users/micah/Code/micahjonesconsulting unless noted.
  1. .planning/PHASE-MAP-2026-09-04.md — ruling C is the book; it was deliberately light
     (sample Ch1→Ch8, a real artifact for Ch10, Ch1's opener re-pitched, never a rewrite
     into a marketing book). Treat it as the floor, not the ceiling.
  2. .planning/research/01-REDDIT-EVIDENCE.md — 5,456 posts, ten subs, twelve months.
     §3 the asking vocabulary, §4 the pain and the money are in different rooms, §6 the
     regression beat measured at 1.0% against crickets at 8.9%, §8 the open questions.
  3. .planning/research/03-FABLE-RESEARCH-LEG.md — the strategy leg. E0 the ruling
     (right pain, wrong words, wrong room), E1 #7 and E4 Q3 are about the book: lead with
     "shipped, nobody came", make Ch8 the sample, keep $99/$149 (Refactoring UI), the
     honesty guardrail that ch8–9 are 13 of 69 pages. Its counts are wrong in four places
     — see 4.
  4. .planning/research/01-APPENDIX-phrase-bank-attested.json — 30 phrases attested, 8
     killed. The kills matter: "It shipped. Nobody came." and every regression-loop
     phrasing are OUR wording, not the market's; "vibe coding" and "solo founder" were
     killed only because their source file was not on disk. It is on disk in the reddit
     repo (below). Re-attest them there before using either.
  5. .planning/research/01-APPENDIX-intersection-37.json — the 37 ICP posts with
     permalinks. Read them yourself. Only two are engineering blockers.
  6. .planning/handoff/04-BOOK-MATERIALS.md — Opus read chapters 1 and 8 in full and
     inventoried every artifact: word counts, openings verbatim, Ch8's four standalone
     gaps, the sample delivery chain (build:sample and publish-to-site.mjs hardcode Ch1),
     the nine diagrams, thirteen build-log entries, the count defects.
  7. .claude/briefs/pass-98-playbook-landing.md §8 — the parked book items with exact
     lines: Ch8:31 "third"→"first" (the page now leads with crickets, so the chapter's
     own count is wrong); the cover art still prints "SOLO BUILDERS" while the page says
     founders; "twenty years of selling" at Ch8:59 is unledgered; the $149 anchor at p.42.
  8. .planning/reviews/CROSS-REVIEW-PLAYBOOK-MANUSCRIPT-2026-09-02.md — Gemini, Codex and
     GLM BLOCKed the manuscript once on claim defects (since fixed) and unanimously found
     Ch10 thin: "no handoff checklist, no due-diligence prep beyond metaphor."
  9. docs/LESSONS_LEARNED.md §3 — the claims ledger. It governs the book too (LESSONS #14:
     a claim sweep scoped to the site cannot see the product). The book repo's
     scripts/ordani-claims-gate.mjs scans clean today; keep it that way.
 10. .planning/research/02-BUSINESS-CONTEXT.md §4 — the book as sold, and
     02-APPENDIX-voice-rules.json — first person, ≤25 words, the 35 forbidden words.

THE REDDIT RESEARCH APP. github.com/micahx745/reddit-research (private). Find the local
clone; if it is not on this machine, clone it. It holds data/corpus.jsonl (the 5,456
posts, gitignored, ~7.5 MB), reference/emergent-language.json (the 400 ranked asking
phrases — the file the attest run could not find), reference/pain-density.json,
reference/regression-null-test.json, reference/subreddit-verification.json,
reference/crawl-scope-ruling.md, reference/lane-design.md, and OAuth for new crawls.
Every analysis runs offline against the cache in seconds. Use it. The cuts this book
needs, in priority order — each one lands as a file in the site repo's
.planning/research/ before it is used, never as a summary in chat:
  a. Chapter-demand map: for each of the ten chapter titles, plus a candidate eleventh
     ("the landing page for the thing you vibe-coded"), the asking-corpus phrases that map
     to it, by DISTINCT AUTHORS. Which chapters is the market asking for, and which does
     nobody ask for.
  b. The "landing page" posts (27 authors, the largest term in the corpus, and there is
     no chapter on it) read individually: do they want building help (Framer, Webflow) or
     conversion and first-users help? This is the falsifier for adding the chapter.
  c. A would_pay-revealed cut: posts that name a number or a completed purchase for help
     or a resource. Engineering or distribution? Books, courses, or people?
  d. The competitive set: every book, course, newsletter, or creator askers name
     (Refactoring UI, Zero to Sold, Demand Curve, "first 100 users" content, and whatever
     else appears). What a $99 field manual is up against, in their words.
  e. Answered/unanswered ratio per asking phrase (§8 Q5 — an unanswered question is an
     open slot for an ungated chapter to rank in).
  f. Where to launch: per subreddit, the money/wall split and the crickets rate, so the
     Show HN / ungated-chapter motion (leg E1 #9) goes to the room that buys. Note
     r/indiehackers moved off Reddit — find where, that is outside the scraper.
  g. Re-attest "vibe coding" and "solo founder" against emergent-language.json.
  h. Only if the book will touch positioning: adjudicate the 19 "sameness" posts by hand.
  i. If a new crawl is warranted, dedupe by author and score by specificity, never by
     upvotes — the buyer writes quiet posts (scores 0, 1, 27 against 14, 47, 13 comments).

FIRST MOVE. Do NOT edit a chapter. Read everything above, run cuts a–g, then produce
ONE document in the site repo at .planning/handoff/BOOK-RESEARCH-TO-ACTION-MAP.md:
per chapter (and per candidate chapter), (a) the market evidence by distinct authors,
(b) the chapter's current opening and its pre-flight card VERBATIM, (c) the proposed
change, (d) whether it needs my ruling. Then the decisions, numbered, that I rule on
before any Typst is touched. Verify every "current text" quote against src/, never
against a document about the book.

THE DECISION I HAVE NOT MADE, which the map must put first: how far the balance shifts.
  - Light touch, as ruled: sample to Ch8, Ch10 artifact, Ch1 opener, the strays.
  - Plus one chapter: the landing page for the AI-built app — the most evidence-backed
    addition (27 authors, no chapter, and it is the Pass 99 offer and the sales page's own
    subject, so book, page and package become one argument).
  - A rebalance toward GTM: distribution chapters move forward or grow; engineering
    chapters compress. Costly, and the falsifier is a refund spike from readers who
    expected the engineering. Only if cut (c) says the money is there.
Bring the evidence, recommend one, and stop.

HARD RULES.
  - Never publish a fact the ledger does not carry. A number, a name, a date, a duration
    that is not in docs/LESSONS_LEARNED.md §3 is NEEDS OPERATOR INPUT. "Twenty years of
    selling" is the live example.
  - The industry author is never named. The birth worker's service list is never
    itemised. Ordani surfaces never name vendors or describe how its protections work.
    "Active paying users, in beta, public release coming" is the only Ordani framing.
  - Quote current chapter text verbatim, from src/, with the file and line. A proposal
    that paraphrases what the book says now cannot be evaluated.
  - A review is a reader, not an oracle: the cross-review, the persona review, and the
    Fable leg each got something wrong under checking. Verify against src/ and the corpus.
  - The site repo's product/playbook/ is a frozen copy and it is STALE (chapter-08.typ
    differs; the site's own gate finds 10 findings in it that the book repo does not
    have). Nobody edits it. `npm run publish:site` from the book repo refreshes it, then
    the site builds and deploys. That is the only path a book change takes to a buyer.
  - The sample delivery chain is hardcoded to chapter 1 in package.json (build:sample)
    and scripts/publish-to-site.mjs (JOBS[2] → lib/chapter1-pdf.ts). Swapping the sample
    is a two-repo change; the site-side anchors are listed in the brief §8.4.
  - The page went live today leading with "It shipped. Nobody came." as its FIRST pain
    line, and Ch8:31 still says it is "the third one". Nobody sees the mismatch until the
    book is on sale (the sample is Ch1). Fix it before the flag flips.
  - Price stays $99 launch / $149 after unless I say otherwise. The $149 trigger is open;
    it moves p.42 and the site's spec card together.
  - The book has never sold. There are no reader quotes. Do not invent one; propose an
    early-reader program instead if the map needs proof.
  - Run the manuscript through /cross-review (Gemini + Codex + GLM) before anything
    ships; the harness lives in the site repo's .claude/skills/cross-review/. A CONFIRMED
    block-class finding blocks the ship, not the build.
  - Deploy of the site is mine. Quote my approval with a date in the resume before it runs.

Arc shape: DIRECT on Fable ends by committing the map, then (after I rule) a brief per
pass in .claude/briefs/ with exact strings and a rejected list; EXECUTE on Opus;
Fable returns at named checkpoints only — the built PDF walked page by page, the
sample rendered and emailed to me, the claims gate green. Rewrite the resume after
every task and before any context switch. Stage by explicit path; two sessions can
share a tree.
