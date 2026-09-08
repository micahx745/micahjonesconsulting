# Pass 102 — Step A, the reading (GLM 5.3, independent run)

Written 2026-09-08 by the GLM executor, per `.claude/briefs/pass-102-wording-round.md` §2. This is
the reading only. **No proposals appear in this file**; drafting lives in
`PASS-102-PROPOSALS-glm.md`. Judging is a separate Astra run (Step C), the operator ticks (Step D).

Inputs read in one pass: `01-REDDIT-EVIDENCE.md`, `01-APPENDIX-phrase-bank-attested.json` (30
attested, 8 killed), `01-APPENDIX-intersection-37.json` (37 posts), `02-BUSINESS-CONTEXT.md`,
`02-APPENDIX-voice-rules.json`, `C:/Users/micah/Code/reddit-research/reports/scan-2026-09-03.md`,
`docs/LESSONS_LEARNED.md` §3, `.claude/brand.json` (voice), and the branch's rendered text on
`/`, `/packages`, `/playbook`, `/work`, `/about`, `/call` (visible DOM nodes, port 3011; scratch
files `_extract-*.json`, not committed). 02-BUSINESS-CONTEXT predates Pass-101, so every CURRENT
string below comes from the branch's rendered DOM, not from that document.

Tally method: case-insensitive substring count of each attested phrase over title+excerpt of all
37 intersection posts (apostrophes normalized; verbatim sentences matched on distinctive
substrings). Script: `.planning/copy/_tally.py` (scratch, not committed). Thread ids are post
numbers into the 37-post JSON (`#N` = array index N−1).

---

## 1. Ranked tally — the 30 attested phrases by frequency across the intersection set

| # | Phrase | Intersection posts | Hits | Corpus count (phrase bank) | Room / cluster |
|---|--------|--------------------|------|----------------------------|----------------|
| 1 | claude code | #1, #4 | 2 | 38 distinct authors — largest term anywhere | developer |
| 2 | landing page | #5, #8 | 2 | 27 asking authors, 2.2× | business / distribution |
| 3 | love to hear / honest feedback / happy to answer | #5, #30 | 2 | 140 / 121 / 84 authors — showcase register, not pain | business / register |
| 4 | "I built a tiny SaaS… 3 real payments… No sales. No repeatable traffic." | #11 | 2 keys | verbatim, n=1 | business |
| 5 | "every update risked breaking it… rewriting everything from scratch" | #21 | 2 keys | verbatim, n=1 — the ONE supporting current copy | business |
| 6 | every single | #29 | 1 | 12 asking authors, 3.3× | business / repeated failure |
| 7 | real users | #14 | 1 | 10 asking authors, 2.8× | business / distribution |
| 8 | couldn't find | #34 | 1 | 8 asking authors, only-here | business / research |
| 9 | keep running | #18 | 1 | 6 asking authors, 13.4× — HIGHEST lift in dataset | business / repeated failure |
| 10 | "My biggest problem right now is distribution." | #26 | 1 | verbatim, n=1 | business |
| 11 | "the honest reason it died wasn't the product… zero system for marketing." | #29 | 1 | verbatim, n=1 | business |
| 12 | "The hard part of building software was never really the coding…" | #4 | 1 | verbatim, n=1 | business |
| 13 | "I'm hitting a wall, and I need a reality check from experienced founders." | #2 | 1 | verbatim, n=1 (score 1, comments 47 — loudest thread) | business |
| 14 | "But instead of marketing it, I spent the last two weeks obsessing over 'UX gaps'…" | #15 | 1 | verbatim, n=1 | business |
| 15 | "I'm hitting the classic 'build it vs. sell it first' dilemma." | #8 | 1 | verbatim, n=1 | business |
| 16 | next app | — | 0 | 20 authors | developer |
| 17 | kept running | — | 0 | 13 asking authors, 7.3× (ledger §3 says 21 — see §5) | business / repeated failure |
| 18 | cold outreach | — | 0 | 9 asking authors, 2.5× | business / distribution |
| 19 | pain points | — | 0 | 9 asking authors, only-here | business / research |
| 20 | i'm stuck | — | 0 | 8 asking authors, only-here | business / frame |
| 21 | first users | — | 0 | 8 asking authors, 1.4× | business / distribution |
| 22 | early users | — | 0 | 8 asking authors, 9.1× — highest distribution lift | business / distribution |
| 23 | i'm struggling | — | 0 | 7 asking authors, only-here | business / frame |
| 24 | spent months | — | 0 | 7 asking authors, 2.2× | business / sunk time |
| 25 | conversion rate | — | 0 | 6 asking authors, 3.3× | business / distribution |
| 26 | paid ads | — | 0 | 6 asking authors, 2.2× | business / distribution |
| 27 | user base | — | 0 | 6 asking authors, 6.7× | business / distribution |
| 28 | crickets | — | 0 | 29 hits / 8.9% of r/buildinpublic; 0 in 545 dev-room bodies | business (buildinpublic) |
| 29 | go-to-market | — | 0 | **NEGATIVE: 0 occurrences** of "go-to-market", "go to market", "gtm" in the measured package | — |
| 30 | sameness | — | 0 | **NEGATIVE: 19 in r/SaaS is an explicit upper bound** ("could be 5") | — |

Reading of the tally:

- **14 of 30 phrases score zero in the 37-post set.** They are corpus-level attestations (counted
  across ~3,700 posts), not intersection members. Zero here does not unattest them; it bounds
  them: the intersection set is 37 posts, ~1% of the corpus.
- The 8 verbatim sentences are n=1 anchors **by construction** — they were chosen as the single
  best representative of a class, not as frequency claims. Their value is phrasing, not prevalence.
- **The tense split matters for §06 of the home.** "kept running" (past) is the corpus-wide
  asking form (13 authors, 7.3×) but scores 0 in the intersection; the intersection's only member
  of that family is present tense: #18 "I keep running into the same problem — I need real
  feedback on my product…not friends and family who say 'looks great!'" (r/SaaS, score 1,
  comments 2). Same verb family, both attested; the live line "You kept running into the same
  thing." carries the attested past form.
- "claude code" appears inside the intersection (#1, #4) even though its home room is developer
  subs. #4 uses it exactly the way the FAQ answer does: "Last month using AI coding tools (Claude
  Code specifically) I managed to build a web app from the ground up."

## 2. Register facts (from 01-REDDIT-EVIDENCE, held fixed)

- Buyer posts are quiet and discussed: intersection posts score 0–2 with comments 0–47 (#2 is
  score 1 / comments 47 — the loudest thread in the set). Low score + high comments is the buyer
  signature; high score is the showcase signature.
- "love to hear / honest feedback / happy to answer" are the three most-used phrases in the whole
  business corpus (140 / 121 / 84 authors) but they are **register, not pain** — common to
  showcasers too. The filtering rule: a phrase equally common in both registers is a greeting
  convention. In the intersection both uses are askers (#5, #30), and #30 wields it as the actual
  ask: "watching my growth die in real-time. Need honest feedback."
- Replies are a second voice, labeled as such and not counted as buyer words: the scan report's
  reply register ("the cost of building collapsed but the cost of acquiring users didnt… thats
  the actual gap nobody talks about", u/VirtualToe3614; "most people sitting on an idea need a
  fast no way more than they need auth and payments wired up", u/Boring_Goose_4384) matches the
  askers' beat from the other side of the table.
- The falsification ruling (§6): "It shipped. Nobody came." is ~9× LESS prevalent than "crickets"
  in r/buildinpublic; "The beat is real; the wording is not theirs. People say 'I kept running
  into…'"

## 3. Page-section readings

Each block: the buyer's situation in their attested words (quote + thread id), the objection they
raise, the phrase they use for the outcome, the words they never use.

### Home — hero (`I build the [rotating noun].` / "Strategy and software, shipped by the same pair of hands…")

- Situation: "My biggest problem right now is distribution." (#26, r/SaaS, score 1, comments 0);
  "I got 3 real payments after an accidental community spike. Then nothing. No sales. No
  repeatable traffic." (#11, r/SaaS, score 0, comments 6); "16 users. 0 paying… I didn't know
  who to talk to. I didn't know where they were" (#29, r/buildinpublic, score 1, comments 0).
- Objection at this depth: none yet — they arrive already naming the problem themselves.
- Outcome phrase: "repeatable traffic" (#11); "real payments" (#11); "signups/week" (#30,
  r/buildinpublic, score 1, comments 0: "March: 58 signups/week — Now (May): 16 signups/week").
- Words they never use: **"go-to-market"** (and "gtm", "go to market") — 0 occurrences in the
  measured package, and it is LIVE in the branch's H1 rotation. Also absent from the counted
  asking vocabulary: "strategy", "consultant", "narrative".

### Home — §02 Operator / About intro ("Most consultants don't ship. Most builders don't sell.")

- Situation: "the honest reason it died wasn't the product. the product was fine. it was that I
  had zero system for marketing." (#29); "I'm hitting the classic 'build it vs. sell it first'
  dilemma." (#8, r/microsaas, score 2, comments 10).
- Objection: "I'm hitting a wall, and I need a reality check from experienced founders." (#2) —
  the buyer asks for experienced-practitioner judgment, not a deck; the quiet score-1 post drew
  47 comments.
- Outcome phrase: "a system for marketing" (#29, stated as the thing they lacked); "what to build,
  how to scope it, what to cut, what matters to users" (#4).
- Words they never use: "consultant", "operator", "positioning" — none appear in the counted
  asking vocabulary; buyers call the other side "experienced founders" (#2).

### Home — §03 How I work (01 Diagnose / 02 Build / 03 Position)

- Situation: "But instead of marketing it, I spent the last two weeks obsessing over 'UX gaps'
  that I felt were show-stoppers." (#15, r/buildinpublic, score 1, comments 3) — the
  wrong-work-instead-of-selling beat, verbatim; "It was always figuring out what to build, how to
  scope it, what to cut, what matters to users." (#4).
- Objection: friends-and-family feedback is worthless to them — "not friends and family who say
  'looks great!'" (#18).
- Outcome phrase: "what matters to users" (#4); "real feedback" (#18).
- Words they never use: "diagnose", "narrative", "artifact" (not in the counted asking
  vocabulary; buyers say "figure out", "scope", "cut").

### Home — §04 packages cards / Packages page intro

- Situation: "every update risked breaking it. i couldn't improve it without basically rewriting
  everything from scratch" (#21, r/SaaS, score 1, comments 1 — the Unstick buyer, and the ONE
  verbatim that supports existing copy); "I never finished one… I don't know how to enter the
  market" (#13); "I spent 6 months building an app that made exactly $0 in revenue… Zero
  marketing — Thought 'if you build it, they will come'" (#6, and the same shape in #12, #32).
- Objection: "I'm stuck" (8 asking authors, only-here) is the frame they open with; #27
  "restarted this project over 6 times… 40 failed deployments" is the sunk-time version.
- Outcome phrase: "what to cut, what matters" (#4); "the order to fix it" has no corpus twin, but
  "Fix one bug, create three more" (#24) is the loop they want ordered.
- Words they never use: **"solo builders"** and **"solo founder"** — killed, zero corpus
  occurrences; "solo builders" is LIVE in the /packages intro. Buyers self-name as "founders"
  (#2, #29), builders of "a tiny SaaS" (#11), or say nothing about size at all.

### Home — §05 receipts / Work page

- Situation: they account for themselves in payments and signups: #11 "3 real payments… No
  repeatable traffic"; #30 "58 signups/week → 16 signups/week"; #29 "16 users. 0 paying."
- Objection: #30's is the model objection for this section: "My SaaS signups dropped 72% in 2
  months - I need honest feedback on what's broken."
- Outcome phrase: "close rate" (the RFP outcome row; corpus cousin "conversion rate", 6 asking
  authors, 3.3×); "repeatable traffic" (#11).
- Words they never use: "receipts", "proof line" — section furniture, not buyer words; harmless
  framing, but no attestation exists for them either way.

### Home — §06 The 80% Wall block / Playbook "If this is you"

- Situation: "It shipped. Nobody came." is the operator's sentence (killed; corpus twin is
  "crickets", 29 hits / 8.9% of r/buildinpublic, 0 in dev rooms). The honest buyers' versions:
  "Then nothing. No sales. No repeatable traffic." (#11); "a lot of silence" (#3, "posting the
  product everywhere and hoping the right people magically appear"); "I was just guessing every
  single day" (#29).
- The stuck-build line "You kept running into the same thing. Fixed Tuesday, broken Friday,
  because the tool forgot." carries the attested verb ("kept running", 13 asking authors, 7.3×;
  ledger says 21) with zero intersection hits — the family's only intersection member is
  present-tense (#18 "I keep running into the same problem").
- "The demo looked done. Production turned out to be a different machine entirely." — the
  killed entry is the PAIRED claim "stuck between demo and production"; only the "i'm stuck"
  half survives attested (8 authors, only-here). The scan report's loose keyword matches ("works
  locally" 37, "breaks in production" 12) are unclassified and not counts.
- "The AI handed you the code. Now ship the company." — buyers state the same beat as: "The hard
  part of building software was never really the coding." (#4) and reply-register "getting to a
  working prototype was never the hard part" (scan report, labeled reply voice).
- Objection: "You built something real with Cursor, Claude Code, Lovable, v0 or Bolt" — "Claude
  Code" is the best-attested term on the whole site (38 authors; intersection #1, #4).
- Outcome phrase: "the first ten users" — corpus cousins "first users" (8, 1.4×), "early users"
  (8, 9.1×); #29's failure version "16 users. 0 paying".
- Words they never use: **"the 80% Wall" as a search term** (killed — operator naming, no corpus
  count); "the wall / gate" as a pain PATTERN is killed, with exactly one verbatim exception:
  "I'm hitting a wall" (#2, n=1).

### Home — §07 objections / Playbook FAQ

- Situation: #30 is the live objection in the wild: "I'm hitting a wall… I need honest feedback on
  what's broken" (composed of #2's frame + #30's ask).
- The DT "Is this for me, if I vibe-coded it?" uses **"vibe-coded"** — the bank KILLED "vibe
  coding" (claimed count of 10 not on disk in `.planning/research/`). Tension, not a resolution:
  the scan report (a named brief input) shows "vibe coded" at 31 keyword matches in
  unclassified rooms. The buyers' own attested self-description is tool-named, not
  method-named: "AI coding tools (Claude Code specifically)" (#4).
- Objection: buyers' trust language is "honest feedback" (121 authors, register caveat) and
  "reality check" (#2, n=1).
- Outcome phrase: "Then yes." has no corpus twin; the honest form is #34's builder logic: "I
  couldn't find a clean tool… so I just built one."
- Words they never use: "vibe coding" (killed for market backing); they also do not ask "is this
  for me" — they ask "is this worth my time" shaped as #2's reality-check.

### Home — §08 ask / Call page ("Name the problem." / "Thirty minutes. Bring the problem.")

- Situation: the call page IS #2's ask: "I'm hitting a wall, and I need a reality check from
  experienced founders." — score 1, comments 47, the most-answered post in the set.
- Objection they raise before booking: #15's — they fear wasting the session on the wrong thing
  ("instead of marketing it, I spent the last two weeks obsessing over 'UX gaps'").
- Outcome phrase: "a reality check" (#2); "honest feedback" (#30, #5); "what you leave with"
  echoes #2's expectation that experienced founders can name the thing.
- Words they never use: "intro call", "discovery", "thirty minutes" — scheduling furniture; no
  attestation either way. Their word for the moment is the ask itself: "I need a reality check."

### Playbook page (hero, spec, contents, companion)

- Situation: same §06 set, plus the money timeline: #6/#12/#32 "made exactly $0… Feature creep…
  Perfect code obsession… Zero marketing"; #21 for the rewrite half; #4 for the scoping half.
- Objection: "Do I need to know how to code?" — buyers answer it themselves: #4 "managed to
  build a web app from the ground up" WITHOUT that background ("I don't have the knowledge to
  architect a decent project").
- Outcome phrase: "run tonight" maps to nothing in the corpus; the buyers' urgency phrase is
  "reality check" (#2) and "what's broken" (#30).
- Words they never use: **"A field manual for solo founders"** — "solo founder" is KILLED and
  LIVE as the /playbook subtitle; also "field manual" (no corpus occurrence). "Pre-flight",
  "SPEC", "invariants" are book vocabulary (fine as product naming, not as buyer words).
- Title tag: "The 80% Wall: it shipped, nobody came — Micah Jones" carries BOTH a killed phrase
  AND (in the em-dash form) the one-per-page em-dash; flagged, not judged here.

### About page

- Same §02 evidence. Specifics: "I've spent thirteen years inside B2B software companies" —
  buyers never describe vendors this way; they describe the fix as "experienced founders" (#2).
- "What I'm known for": buyers' outcome language for this content is #29's "zero system for
  marketing" — the word "system" is theirs, in the negative; they lack one and say so.
- Words they never use: "GTM" (0 occurrences, anywhere); "known for" (no corpus twin). "Receipts"
  again is furniture.

## 4. Killed and negative flags — every instance now live on the branch

| Phrase | Status | Live on the branch now (rendered DOM, port 3011) |
|--------|--------|---------------------------------------------------|
| "It shipped. Nobody came." | KILLED (operator wording, ~9× less prevalent than "crickets") | home §06 block; /playbook "If this is you" first line; /playbook `<title>` ("it shipped, nobody came") |
| "solo builders" | KILLED (zero corpus) | /packages intro: "For solo builders and small teams…" |
| "solo founder" | KILLED (zero corpus) | /playbook subtitle: "A field manual for solo founders" |
| "vibe coding / vibe-coded" | KILLED for market backing (count not on disk; scan tension: 31 loose matches) | home §07 DT; /playbook FAQ DT |
| "go-to-market" | NEGATIVE (0 occurrences of all three spellings) | home H1 rotation noun; /packages Audit flavor "Traction (positioning and go-to-market)"; /about "GTM strategy in the morning" |
| "the 80% Wall" (as search term) | KILLED (operator naming) | product name across home, /playbook, footer — naming is operator prerogative; flagged for the juror, not judged |
| "the wall / gate" (as pain pattern) | KILLED (no count), ONE verbatim exception n=1 ("I'm hitting a wall", #2) | /playbook "The wall is not a talent problem…" |
| "every change broke something that worked yesterday" | KILLED (operator wording) | not live in this exact form; its surviving cousin "Fixed Tuesday, broken Friday, because the tool forgot" rides the attested "kept running" line |

## 5. Discrepancies the juror should carry

1. **"kept running": 13 vs 21.** 01-REDDIT-EVIDENCE §3 counts 13 distinct asking authors; the
   claims ledger (LESSONS §3 emergent-language reference) says 21. The phrase bank's attested
   figure is 13. Proposals should cite 13 (the attested number) and note the ledger's 21.
2. **"vibe coding": killed in the bank, 31 loose matches in the scan report.** The bank's kill
   reason is "the claimed count of 10 does not exist in any on-disk evidence file"; the scan
   report's 31 is a keyword-sweep figure in unclassified rooms, not an asking-author count. Both
   facts stand; only the juror/operator can rule on the FAQ wording.
3. **The intersection is 1% of the corpus.** Fourteen phrases with zero intersection hits remain
   attested corpus-wide; zero-in-intersection must not be read as unattested.
4. **02-BUSINESS-CONTEXT copy inventory is pre-Pass-101** and was used only for background;
   every CURRENT string in the proposals table comes from the branch's rendered DOM.

*End of the reading. No proposals in this file.*
