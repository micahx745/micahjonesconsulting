# Package 1 of 2 — Reddit evidence

**Produced:** 2026-09-03 · **Source:** 5,456 posts cached from a third-party Reddit
archive, ten subreddits, twelve 10-day windows spanning **2025-09-23 → 2026-08-03**.
4,464 posts carry 250+ characters of surviving body text. 3,842 distinct authors.

This is one half of a two-part briefing. The other half — the business, the site,
the playbook — is `02-BUSINESS-CONTEXT.md`, produced by a separate session.
`03-RESEARCH-BRIEF.md` is the instruction that consumes both.

---

## 0. Read this before you use any number below

Every number here is a count of **public Reddit posts**. It is evidence about
**language**, not about market size. The sample excludes everyone who solved the
problem quietly, everyone under contract, and everyone whose failure is
embarrassing to publish under their own handle.

Three specific cautions, because they change how the numbers should be read:

1. **A 12% asking-rate measures willingness to post, not incidence of pain.**
2. **Keyword counts are not comparable between runs.** A different random subset
   of subreddits times out on each fetch. Two identical runs measured the same
   phrase at 42 and 2. Counts from the *cached corpus* (everything in this file)
   are stable; counts from live phrase search are not.
3. **The archive's text search is fuzzy, not exact-substring.** A zero is weak
   evidence of absence.

**The methodological problem that shaped this whole package:** earlier passes
searched Reddit for the operator's own sentences and reported whether strangers
used them. That is confirmation by construction — the book became the site copy,
the site copy became the search patterns, and the patterns found the book. The
only honest signal it produced was a null. **Sections 3 onward seeded nothing
from the product**, and those are the sections worth trusting.

---

## 1. The corpus

| Subreddit | Posts with real bodies | Room |
| --- | ---: | --- |
| buildinpublic | 677 | business |
| SaaS | 666 | business |
| nextjs | 650 | developer |
| microsaas | 576 | business |
| cursor | 494 | developer |
| ClaudeAI | 416 | developer |
| startups | 302 | business |
| webdev | 260 | developer |
| ChatGPTCoding | 212 | developer |
| EntrepreneurRideAlong | 211 | business |

Business subs: 2,432 posts. Developer subs: 2,032 posts.

Raw corpus is `data/corpus.jsonl` in the repo (5,456 lines, ~7.5 MB, gitignored —
it holds user text). Every analysis below runs offline against it, so **any new
question can be answered in seconds at zero cost and zero further load on the
source.** If the research chat wants a cut that is not here, ask for it.

---

## 2. What these communities are made of

Posts were split by **what the post is doing** before any topic was counted,
because the two populations use different vocabularies and mixing them buries
the smaller one. The classifiers key on grammar, not subject matter:

- **showing** — `love to hear`, `honest feedback`, `just launched`, `roast my`, `feedback welcome`
- **stuck** — `I can't`, `how do I`, `any advice`, `has anyone else`, `I keep running into`

**Business subreddits, 2,432 posts, 2,067 distinct authors:**

| Shape | Posts | Share |
| --- | ---: | ---: |
| Showing something | 634 | 26.1% |
| Stuck on something | 195 | 8.0% |
| Both | 89 | 3.7% |
| Neither | 1,514 | 62.3% |

**284 posts (11.7%) from 261 distinct authors contain anyone asking for help.**
That is the addressable corpus for a year.

Developer subreddits: 323 asking posts (15.9%) from 307 distinct authors.

**The most-used phrases across all 2,067 business-sub authors were `love to hear`
(140 authors), `honest feedback` (121), `landing page` (118), `happy to answer`
(84).** These communities are predominantly a shop window.

---

## 3. What the people asking for help are actually stuck on

Ranked by **distinct authors**, never raw frequency — twelve uses by three
accounts is one person's habit; twelve by twelve people is a vocabulary. Filtered
to phrases *more common among askers than among showcasers*, because a phrase
equally common in both is register, not pain.

| Authors | Lift vs showcase | Phrase | Cluster |
| ---: | ---: | --- | --- |
| 27 | 2.2× | **landing page** | distribution |
| 13 | **7.3×** | **kept running** (into) | repeated failure |
| 12 | 3.3× | every single | repeated failure |
| 10 | 2.8× | **real users** | distribution |
| 9 | 2.5× | **cold outreach** | distribution |
| 9 | only here | pain points | research |
| 8 | only here | **i'm stuck** | frame |
| 8 | only here | couldn't find | research |
| 8 | 1.4× | **first users** | distribution |
| 8 | 9.1× | early users | distribution |
| 7 | only here | i'm struggling | frame |
| 7 | 2.2× | **spent months** | sunk time |
| 6 | **13.4×** | **keep running** (into) | repeated failure |
| 6 | 3.3× | conversion rate | distribution |
| 6 | 2.2× | paid ads | distribution |
| 6 | 6.7× | user base | distribution |

**Eight of the top sixteen are distribution.** The dominant unmet need among
people who are stuck is *getting customers*, not *getting to production*.

Full ranked list: `reference/emergent-language.json` → `asking_vocab` (400 entries).

---

## 4. The pain and the money are in different rooms

Both lexicons defined generically; neither taken from the operator's copy.
Measured over asking-posts only.

| Room | Money words | Wall words | Both in one post |
| --- | ---: | ---: | ---: |
| Business subs | **52%** | 20% | **13%** |
| Developer subs | 14% | **35%** | 4% |

Distinctive vocabulary of each room (distinct authors, filtered to phrases at
least 1.5× more common in that room):

- **Business:** landing page (27) · real users (10) · cold outreach (9) · pain points (9) · early users (8) · first users (8) · conversion rate (6)
- **Developer:** claude code (38) · next app (20) · else experienced (15) · app router (12) · can't find (10) · auto mode (8) · mcp server (7) · usage limits (7) · server components (7)

**The developer rooms are framework support, not stalled businesses.** "App
router", "server components", "mcp server" is someone learning a tool. And they
barely mention money.

---

## 5. The intersection — the operator's stated ICP

Posts where someone is **stuck** AND names an **engineering blocker** AND talks
about **money**: **37 posts, 35 distinct authors, across twelve months and five
business subreddits.**

Full evidence with excerpts and permalinks: `handoff/intersection-37.json`.

Three representative titles:

| Sub | Score | Comments | Title |
| --- | ---: | ---: | --- |
| EntrepreneurRideAlong | 27 | 13 | "I spent 6 months building an app that made exactly $0 in revenue" |
| EntrepreneurRideAlong | 0 | 14 | "I'm a product manager, not an engineer. New AI tools let me build a full app solo and now I'm…" |
| SaaS | 1 | 47 | "17yo founder, ~200 cold calls, $0 MRR. My unit economics are broken. Pivot or die?" |

**Note the scores: 27, 0, 1 — against 13, 14 and 47 comments.** The buyer does
not write popular posts; they write quiet ones that get answered. Any sampling
strategy that ranks by score misses nearly all of them.

---

## 6. The finding that most directly challenges existing copy

The playbook page's second sentence is *"Then every change broke something that
worked yesterday."* A pattern built from that sentence — `every change breaks`,
`rewrote it again`, `worked yesterday`, `afraid to touch`, `whack-a-mole` —
scored **a maximum of 3 across 17 subreddits and ~3,700 posts.** Nine of
seventeen returned exactly zero.

The instrument was checked before drawing any conclusion. A deliberately widened
lexicon plus a **phrasing-free proximity rule** (any two of {fix, break, again,
rewrote, deleted, worked} within 45 characters) was re-run over 1,720 posts:

| Measure | Hits | Rate |
| --- | ---: | ---: |
| Narrow lexicon (written from the copy) | 6 | 0.3% |
| Widened lexicon | 40 | 2.3% |
| **Phrasing-free proximity** | **17** | **1.0%** |
| `crickets` in r/buildinpublic, for comparison | 29 | **8.9%** |

The widened lexicon's 6.7× jump is **mostly false positives** — manual reading
found `"used to work"` matching *"while I was working on it"*, `"started over"`
matching a pivot story, `"regressions"` matching *users* forgetting. The clean
number is the proximity test: **1.0%**.

**"It shipped. Nobody came." is roughly nine times more prevalent than the
regression loop — and it is the operator's fifth sentence while the regression
loop is his second.**

Partial rescue: `kept running` and `keep running` carry the two highest lift
scores in the entire dataset (7.3× and 13.4×). **The beat is real; the wording is
not theirs.** People say *"I kept running into…"*.

Data: `reference/regression-null-test.json`.

---

## 7. Subreddit selection, and what was rejected

All 25 candidate names from a prior session were verified against live data —
all resolved, but two carried confidence ratings the data contradicts:

- **r/indiehackers** — rated "high, the exact buyer". Measured: 100 posts, **1** engaged, **3** with body text. The community moved off Reddit.
- **r/venturecapital** — 42 posts, 2 engaged, 3 with bodies.

Pain-density measurement across 17 subreddits (`reference/pain-density.json`)
selected five: **r/SaaS, r/buildinpublic, r/microsaas, r/startups,
r/EntrepreneurRideAlong.** Notable rejections and why:

- **r/LocalLLaMA** — best engagement numbers in the entire table (80 engaged of 100, 82 bodies) and zero buyers. The prose is quantization and VRAM.
- **r/ExperiencedDevs** — highest `out_of_depth` count anywhere, but those posts describe *someone else's* code. That is the consultant's voice, not the buyer's.
- **r/cursor, r/ClaudeAI, r/ChatGPTCoding** — `crickets` = **0** across 545 combined bodies.

Full reasoning: `reference/crawl-scope-ruling.md` and `reference/lane-design.md`.

---

## 8. Open questions this package cannot answer

These need the business context in package 2, or new work:

1. **Which room should the playbook be sold in?** The people with engineering pain are in rooms where 14% mention money. The people with money are stuck on distribution. That is a segmentation decision, not a copy decision.
2. **Is `sameness = 19` in r/SaaS real?** It is the only positioning-pain concentration in 17 subreddits and the entire evidence base for the $5K/mo lane — but the pattern matched "positioning" and "crowded" as bare tokens, and r/SaaS is where founders discuss positioning as a hobby. **Adjudicated figure could be 5.** 19 posts is an hour of manual reading. Unresolved.
3. **What do the 37 intersection posts actually ask for?** Not yet read individually.
4. **Does "landing page" (27 authors, the single largest term) sit inside the current offer set, or outside it?** It sits exactly between building and selling. Needs the service list to answer.
5. **What is the answered/unanswered ratio on the asking posts?** An unanswered question is an open SEO slot; an answered one has an incumbent. Not yet extracted, but cheap from the cache.

---

## 9. Files in this package

| File | What it holds |
| --- | --- |
| `handoff/01-REDDIT-EVIDENCE.md` | this document |
| `handoff/intersection-37.json` | the 37 ICP posts, full excerpts and permalinks |
| `reference/emergent-language.json` | 400 ranked asking-corpus phrases, plus frame extractions |
| `reference/pain-density.json` | 17 subreddits × 7 pain patterns, full counts |
| `reference/regression-null-test.json` | the headline falsification test |
| `reference/subreddit-verification.json` | engagement and body-rate for 25 candidates |
| `reference/crawl-scope-ruling.md` | the full scope analysis (26 KB) |
| `reference/lane-design.md` | the two-lane theme design (24 KB) |
| `data/corpus.jsonl` | 5,456 raw posts — the source everything above is derived from |

Repo: `github.com/micahx745/reddit-research` (private).
