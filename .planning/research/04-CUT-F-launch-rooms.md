# Cut F — Where to launch

Produced 2026-09-04 by an Opus agent in the book arc

**Script:** `C:/Users/micah/Code/reddit-research/cuts/cut_f_launch_rooms.py`
Run from the repo root as `.venv/Scripts/python.exe cuts/cut_f_launch_rooms.py`. Every number
below is printed by that script. It reads `data/corpus.jsonl` and the two reference JSON files
offline; it makes no network call.

**Denominators, reproduced before anything else was counted:**
5,456 raw corpus lines · **4,464 posts** with `len(clean(body)) >= 250` · **3,842 distinct
authors** · **607 ASKING posts** (`STUCK.search` matched the cleaned title + body) from **567
distinct authors** · of which **284 posts / 261 authors** sit in the five BUSINESS subs (SaaS,
buildinpublic, microsaas, startups, EntrepreneurRideAlong). The five DEVELOPER subs are nextjs,
cursor, ClaudeAI, webdev, ChatGPTCoding. The script prints `DENOMINATORS REPRODUCED: YES` and
exits non-zero if any of the seven disagree.

## How to read this

Every corpus number here is a count of **public Reddit posts**, and it is evidence about
**language**, not about market size. It excludes everyone who solved the problem quietly,
everyone under contract, and everyone whose failure is too embarrassing to publish under their
own handle. A zero is **weak evidence of absence**: the archive's text search is fuzzy rather
than exact-substring, three separate fetches with three different windows produced the three
tables below, and they disagree with each other by wide margins on the same subreddit. Counting
is by **distinct authors** wherever a rate implies a person, because cross-posting is common in
this corpus (**107 distinct titles appear more than once**, accounting for 254 of the 4,464 post
rows; 4,317 distinct titles in total). Score and comment count appear as descriptive columns
only; **nothing here is ranked, filtered or sampled by score**, because six of the eight
hand-confirmed launch-silence posts score 4 or lower and would vanish under any score filter.
Their (score, comments) pairs are (1, 0), (1, 3), (1, 3), (2, 2), (3, 0), (4, 4), (27, 35) and
(33, 62) — the two that score above 4 are also the two that drew the most answers, which is
exactly why score cannot stand in for the thing being measured. The composite scores in
Tables 7 and 8 are an arithmetic convenience for putting rooms in order, not a measurement —
their inputs are the measurements, and they are printed beside every composite. And the whole
open-web leg has a hole in it: **Reddit refused every fetch**, so every subreddit rule below is
UNVERIFIED at source and rests on a third-party page instead.

### The seven lexicons, in full

Every pattern used anywhere below, printed by the script under `LEXICONS` and reproduced here so
the classifications can be audited without running Python. The first four are imported from the
repo's existing classifiers, which is why these numbers reconcile with the published package; the
last three were written for this cut. None is seeded from the book or the sales page.

```
STUCK — imported from listen.py; defines ASKING
\b(?:i (?:can'?t|cannot|couldn'?t)|i (?:don'?t|didn'?t) know (?:how|what|why|where)|i(?:'m| am) (?:struggling|
stuck|lost|confused|frustrated|overwhelmed|at a loss)|how (?:do|can|should) i\b|why (?:does|
is|do|are|did) (?:my|the|it)\b|any (?:advice|help|ideas|suggestions)|need (?:help|advice)|
has anyone (?:else )?(?:dealt|had|faced|experienced|solved)|what (?:am i doing wrong|
would you do|should i do)|i (?:keep|kept) (?:getting|running into|hitting))

SHOWCASE — imported from listen.py; reported for context, never used to rank
\b(?:love (?:to hear|feedback|your)|honest feedback|looking for feedback|would love (?:your|
some|any)|feedback (?:welcome|appreciated|would)|happy to answer|answer any questions|
feel free to (?:ask|try|check)|wanted to share|just (?:launched|shipped|released|built|
made)|i(?:'ve| have) been building|introducing|check (?:it|this) out|roast my|rate my|
thoughts\?)

WALL_WORDS — imported from compare_rooms.py
\b(?:deploy|deployment|production|prod|localhost|works locally|build fail|broke|broken|bug|
error|crash|refactor|rewrite|rewrote|auth|database|migration|env var|environment variable|
docker|ci|pipeline|stack trace|typescript|hydration|latency|timeout)\b

MONEY_WORDS — imported from compare_rooms.py
\b(?:revenue|mrr|arr|churn|pricing|price|paid|customer|subscriber|conversion|signup|
sign.?up|acquisition|funnel|cac|ltv|paying|monetis|monetiz|charge|invoice|sales?|lead)\b

CRICKETS — written for this cut
\bcrickets\b

LANDING — written for this cut
\blanding page\b

USERS — written for this cut
\b(?:real|first|early) users\b
```

The four long patterns are wrapped for the page. Every break falls immediately after a `|`, no
line starts or ends with a space, and joining a pattern's lines by plain concatenation returns
the pattern the script compiled — that round trip was asserted before this block was pasted.
Two consequences are worth naming before the tables. `STUCK` matches a phrasing, not an
intention, so a dead-launch post written as a statement is not an asking post. And `WALL_WORDS`
contains bare words like `broke` and `error` that appear in ordinary prose, which lifts wall
rates in every room at once.

---

## Table 1 — The ten corpus rooms

Money, wall and both rates are over that room's **asking posts**. Crickets is over **all** that
room's bodies. `askAu` = distinct authors of asking posts. `LPau` = distinct authors saying
"landing page" anywhere in that room's bodies. `usrAu` = distinct authors saying real / first /
early users. `0cmt%` = share of that room's asking posts that got zero comments. `medSc` = median
score of asking posts, reported and never used to rank.

| Room | Bodies | Ask | Ask% | askAu | Money% | Wall% | Both% | Crick | Crick% | LPau | usrAu | 0cmt% | medSc |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| r/SaaS | 666 | 78 | 11.7% | 76 | 53% | 24% | 18% | 6 | 0.90% | 47 | 26 | 18% | 1.0 |
| r/buildinpublic | 677 | 61 | 9.0% | 60 | 41% | 26% | 15% | 6 | 0.89% | 35 | 26 | 41% | 1.0 |
| r/microsaas | 576 | 46 | 8.0% | 46 | 63% | 22% | 15% | 2 | 0.35% | 28 | 28 | 37% | 1.0 |
| r/startups | 302 | 59 | 19.5% | 56 | 39% | 5% | 0% | 0 | 0.00% | 7 | 8 | 8% | 3.0 |
| r/EntrepreneurRideAlong | 211 | 40 | 19.0% | 37 | 72% | 20% | 18% | 0 | 0.00% | 9 | 6 | 18% | 2.0 |
| r/nextjs | 650 | 117 | 18.0% | 109 | 9% | 56% | 6% | 0 | 0.00% | 21 | 5 | 7% | 2.0 |
| r/cursor | 494 | 89 | 18.0% | 86 | 15% | 22% | 1% | 0 | 0.00% | 0 | 2 | 11% | 2.0 |
| r/ClaudeAI | 416 | 61 | 14.7% | 61 | 26% | 30% | 7% | 0 | 0.00% | 5 | 2 | 2% | 1.0 |
| r/webdev | 260 | 39 | 15.0% | 38 | 8% | 18% | 5% | 0 | 0.00% | 8 | 1 | 13% | 1.0 |
| r/ChatGPTCoding | 212 | 17 | 8.0% | 15 | 12% | 18% | 0% | 0 | 0.00% | 1 | 2 | 35% | 1.0 |
| **BUSINESS (all)** | **2,432** | **284** | **11.7%** | **261** | **52%** | **20%** | **13%** | **14** | **0.58%** | **119** | **89** | **24%** | **1.0** |
| **DEVELOPER (all)** | **2,032** | **323** | **15.9%** | **307** | **14%** | **35%** | **4%** | **0** | **0.00%** | **35** | **12** | **9%** | **2.0** |

The two pooled rows reproduce the published package exactly (business 52% money / 20% wall / 13%
both; developer 14% / 35% / 4%), which is the check that the per-room split below it is the same
instrument, not a new one.

## Table 2 — Every "crickets" post, read in full

Fourteen posts in 4,464 bodies (0.31%) contain the word. A regex hit is a candidate, so all
fourteen were opened and classified by hand. LAUNCH-SILENCE means the author shipped or promoted
their own thing and nobody came.

| id | Room | Class | Asking | Score | Comments | Verdict |
| --- | --- | --- | --- | ---: | ---: | --- |
| 1nstix7 | r/SaaS | LAUNCH-SILENCE | no | 3 | 0 | three months of interviews, built the MVP, no buyers |
| 1nszgef | r/SaaS | RHETORICAL | no | 1 | 0 | engagement-bait challenge; asks readers whether their idea got love or crickets |
| 1oguhnh | r/SaaS | OTHER-SILENCE | no | 2 | 1 | a custom feature built for one client went unused; not a launch |
| 1psez8u | r/SaaS | OTHER-SILENCE | yes | 1 | 1 | no reaction to a deprecation announcement; a good outcome, not a stall |
| 1rupwc9 | r/SaaS | LAUNCH-SILENCE | no | 1 | 0 | own launches died this death; advice framing over a first-person failure |
| 1ruq40r | r/SaaS | LAUNCH-SILENCE | no | 27 | 35 | launched, $0 revenue, four channels tried, explicit ask for what worked |
| 1r5liua | r/buildinpublic | OTHER-SILENCE | no | 2 | 3 | 39 of 47 build-in-public updates got no reaction; post engagement, not a launch |
| 1r5ulij | r/buildinpublic | PROMO | no | 1 | 0 | client goes quiet after delivery; the post is a pitch for the author's invoicing tool |
| 1ruh8b7 | r/buildinpublic | LAUNCH-SILENCE | yes | 1 | 3 | landing page live one month, zero users, asks how others pivoted |
| 1ruhqyr | r/buildinpublic | LAUNCH-SILENCE | no | 33 | 62 | months solo on a working app, everything tried, most days nothing; explicit ask |
| 1ruojdw | r/buildinpublic | LAUNCH-SILENCE | no | 2 | 2 | first days after launch silent, then 14 signups; resolved, and a pitch |
| 1ruqnz5 | r/buildinpublic | LAUNCH-SILENCE | no | 1 | 3 | spam posts, zero-follower tweets, duplicate blogs, none of it beat the silence |
| 1r5he6h | r/microsaas | LAUNCH-SILENCE | no | 4 | 4 | $85 of ads, zero signups, then one organic customer; resolved, advice framing |
| 1rugdz7 | r/microsaas | OTHER-SILENCE | no | 1 | 4 | a feedback survey got no responses; pitch for the author's form tool |

**8 of 14 candidates are genuine launch silence** — 8 posts, **8 distinct authors**, over 4,464
bodies = **0.18% of the corpus**. By room: r/SaaS 3, r/buildinpublic 4, r/microsaas 1. **In the
five developer subs: 0, across 2,032 developer bodies.** Four are silence about something else (a
feature nobody used, a deprecation nobody minded, 39 ignored progress updates, a feedback survey
nobody filled in), one is rhetorical, one belongs to a client inside a product pitch.

Note the classifier disagreement: only **2 of the 8** launch-silence posts were caught by `STUCK`
as asking posts. The people describing a dead launch mostly do not phrase it as a question.

## Table 3 — Verbatim quotes

Each string is asserted character-for-character against the cleaned corpus text by the script,
which prints `VERBATIM=PASS` per row. No author handles anywhere; the permalink is the reference.

| Room | Score | Comments | Quote | Link |
| --- | ---: | ---: | --- | --- |
| r/buildinpublic | 33 | 62 | "building the app is like 20% of the battle. the other 80%? trying to get literally anyone to even SEE it exists" | https://www.reddit.com/r/buildinpublic/comments/1ruhqyr/built_the_entire_app_myself_the_product_is_good/ |
| r/buildinpublic | 1 | 3 | "One month since the landing page went live and... crickets. Zero users" | https://www.reddit.com/r/buildinpublic/comments/1ruh8b7/ulup_elevating_the_collective/ |
| r/SaaS | 27 | 35 | "I dedicated so much time into this and I don't want to abandon this project. What helped you?" | https://www.reddit.com/r/SaaS/comments/1ruq40r/how_did_you_get_your_first_saas_sale_with_zero/ |
| r/SaaS | 3 | 0 | "Built an MVP. Crickets." | https://www.reddit.com/r/SaaS/comments/1nstix7/whats_your_everyone_complains_but_nobody_pays/ |
| r/microsaas | 4 | 4 | "If you are hearing crickets on your launch: stop renting traffic and try building an asset." | https://www.reddit.com/r/microsaas/comments/1r5he6h/about_a_week_ago_i_got_my_very_first_paying/ |

## Table 4 — `reference/pain-density.json`, all 17 subreddits

A **separate fetch** with a per-sub sample, not the 4,464-body corpus. Its crickets column and
Table 1's do not reconcile, and both are printed.

| Subreddit | Posts | Bodies | Authors | pain_hits | density | wall | regression | gate | crickets | sameness | out_of_depth | would_pay | question_title | crick/body | In corpus |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| r/cursor | 500 | 223 | 424 | 46 | 0.206 | 6 | 1 | 6 | 0 | 1 | 4 | 28 | 95 | 0.0% | yes |
| r/ClaudeAI | 500 | 204 | 459 | 44 | 0.216 | 5 | 0 | 10 | 0 | 1 | 7 | 21 | 59 | 0.0% | yes |
| r/ChatGPTCoding | 432 | 118 | 354 | 36 | 0.305 | 4 | 2 | 5 | 0 | 2 | 4 | 19 | 66 | 0.0% | yes |
| r/nextjs | 491 | 293 | 403 | 44 | 0.15 | 6 | 3 | 10 | 4 | 0 | 9 | 12 | 94 | 1.4% | yes |
| r/reactjs | 500 | 287 | 411 | 30 | 0.105 | 3 | 2 | 7 | 2 | 3 | 8 | 5 | 70 | 0.7% | no |
| r/buildinpublic | 500 | 325 | 447 | 111 | 0.342 | 9 | 0 | 5 | 29 | 3 | 18 | 47 | 59 | 8.9% | yes |
| r/microsaas | 500 | 217 | 418 | 87 | 0.401 | 3 | 2 | 4 | 21 | 3 | 13 | 41 | 79 | 9.7% | yes |
| r/SideProject | 500 | 195 | 409 | 49 | 0.251 | 2 | 1 | 7 | 1 | 3 | 14 | 21 | 30 | 0.5% | no |
| r/vibecoding | 500 | 204 | 447 | 44 | 0.216 | 4 | 0 | 8 | 4 | 2 | 6 | 20 | 60 | 2.0% | no |
| r/SaaS | 500 | 304 | 448 | 118 | 0.388 | 6 | 2 | 12 | 14 | 19 | 20 | 45 | 98 | 4.6% | yes |
| r/startups | 500 | 145 | 335 | 66 | 0.455 | 7 | 1 | 5 | 8 | 4 | 13 | 28 | 36 | 5.5% | yes |
| r/Entrepreneur | 500 | 156 | 402 | 49 | 0.314 | 6 | 0 | 5 | 4 | 2 | 9 | 23 | 126 | 2.6% | no |
| r/webdev | 500 | 163 | 442 | 28 | 0.172 | 3 | 0 | 4 | 3 | 1 | 9 | 8 | 89 | 1.8% | yes |
| r/devops | 500 | 186 | 434 | 30 | 0.161 | 5 | 1 | 7 | 0 | 1 | 8 | 8 | 111 | 0.0% | no |
| r/ExperiencedDevs | 500 | 270 | 417 | 50 | 0.185 | 8 | 3 | 4 | 1 | 3 | 21 | 10 | 71 | 0.4% | no |
| r/indiehackers | 500 | 10 | 406 | 2 | 0.2 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 43 | 0.0% | no |
| r/EntrepreneurRideAlong | 500 | 98 | 437 | 47 | 0.48 | 2 | 0 | 6 | 5 | 3 | 8 | 23 | 66 | 5.1% | yes |

Ten of the seventeen are in the corpus. **The disagreement is the finding, not a footnote.**
pain-density measures crickets in r/buildinpublic at 29 of 325 bodies (8.9%); the corpus measures
6 of 677 (0.89%) — a tenfold gap on the same subreddit. It puts r/startups at 8 of 145 (5.5%) and
r/EntrepreneurRideAlong at 5 of 98 (5.1%) where the corpus finds **zero in both**. Different
windows, different samples, fuzzy archive search. **Direction survives that gap; magnitude does
not.** In both instruments crickets concentrates in the business rooms and reads 0 in r/cursor,
r/ClaudeAI, r/ChatGPTCoding and r/devops.

## Table 5 — `reference/subreddit-verification.json`, all 25 candidates

A **third fetch**, ~100 posts each. The only place rooms outside the corpus are visible.

| Subreddit | Status | Posts | Engaged | Eng% | Bodies | Body% | medSc | topSc | In corpus |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| r/SaaS | OK | 100 | 30 | 30% | 47 | 47% | 1 | 281 | yes |
| r/indiehackers | OK | 100 | 1 | 1% | 3 | 3% | 1 | 11 | no |
| r/SideProject | OK | 100 | 11 | 11% | 51 | 51% | 1 | 60 | no |
| r/EntrepreneurRideAlong | OK | 100 | 14 | 14% | 22 | 22% | 1 | 27 | yes |
| r/microsaas | OK | 100 | 20 | 20% | 63 | 63% | 1 | 11 | yes |
| r/buildinpublic | OK | 100 | 26 | 26% | 75 | 75% | 1 | 20 | yes |
| r/webdev | OK | 100 | 14 | 14% | 17 | 17% | 1 | 94 | yes |
| r/nextjs | OK | 72 | 37 | 51% | 45 | 62% | 2 | 241 | yes |
| r/reactjs | OK | 100 | 45 | 45% | 63 | 63% | 1 | 88 | no |
| r/devops | OK | 100 | 29 | 29% | 38 | 38% | 1 | 426 | no |
| r/ClaudeAI | OK | 100 | 34 | 34% | 52 | 52% | 1 | 1215 | yes |
| r/ChatGPTCoding | OK | 100 | 32 | 32% | 48 | 48% | 1 | 50 | yes |
| r/cursor | OK | 100 | 45 | 45% | 53 | 53% | 1 | 66 | yes |
| r/vibecoding | OK | 100 | 10 | 10% | 20 | 20% | 1 | 79 | no |
| r/LocalLLaMA | OK | 100 | 80 | 80% | 82 | 82% | 3 | 647 | no |
| r/startups | OK | 100 | 29 | 29% | 30 | 30% | 1 | 43 | yes |
| r/Entrepreneur | OK | 77 | 42 | 55% | 42 | 55% | 1 | 529 | no |
| r/sales | OK | 100 | 18 | 18% | 19 | 19% | 1 | 128 | no |
| r/ProductManagement | OK | 94 | 44 | 47% | 62 | 66% | 1 | 422 | no |
| r/marketing | OK | 81 | 36 | 44% | 38 | 47% | 1 | 51 | no |
| r/ycombinator | OK | 100 | 27 | 27% | 28 | 28% | 1 | 122 | no |
| r/venturecapital | OK | 42 | 2 | 5% | 3 | 7% | 1 | 73 | no |
| r/cybersecurity | OK | 100 | 31 | 31% | 32 | 32% | 1 | 136 | no |
| r/msp | OK | 100 | 27 | 27% | 26 | 26% | 1 | 92 | no |
| r/ExperiencedDevs | OK | 100 | 34 | 34% | 19 | 19% | 1 | 531 | no |

Three rooms outside the corpus carry body rates that would justify a corpus pass before any
launch decision that involves them: **r/ProductManagement** (62 bodies and 44 engaged of 94 posts
sampled = 66% / 47%), **r/Entrepreneur** (42 and 42 of 77 = 55% / 55%) and **r/reactjs** (63 and
45 of 100 = 63% / 45%). None has ever been measured for money or wall language. r/marketing
(38 and 36 of 81 = 47% / 44%) is the fourth.

## Table 6 — Leg 2, the open web

**Every Reddit fetch was refused on 2026-09-04.** `www.reddit.com` and `old.reddit.com` both
returned "Claude Code is unable to fetch from …", and a Redlib mirror returned HTTP 403. So all
five subreddit rows are **UNVERIFIED at source** and rest on third-party pages whose own dates
are given. Read them as leads to check, not as rules.

| Venue | Gate | Rule as sourced | Source | Status |
| --- | --- | --- | --- | --- |
| r/buildinpublic | FEED | Product mentions expected, spam still removed; progress and milestone posts are the native form | https://oneup.today/best-subreddits-indie-hackers (dated 2026-07-05) | UNVERIFIED at source |
| r/EntrepreneurRideAlong | FEED | Tolerated in case-study format; long-form build-story posts with metrics; posts written as ads removed | https://www.soar.sh/blog/self-promotion-rules-by-subreddit-database (dated 2026-05-31) | UNVERIFIED at source |
| r/microsaas | APPROVAL | Sharing allowed with backstory and tech stack, but **paid courses are removed without mod approval** | https://gofindevo.com/subreddits/microsaas (dated 2026-07-02) | UNVERIFIED at source |
| r/SaaS | THREAD | Max 1 promo mention per 60 days; the only explicit promo lane is Share Your SaaS Saturday | https://www.soar.sh/blog/self-promotion-rules-by-subreddit-database (dated 2026-05-31) | UNVERIFIED at source |
| r/startups | THREAD | Restricted to the Share Your Startup sticky | https://www.soar.sh/blog/self-promotion-rules-by-subreddit-database (dated 2026-05-31) | UNVERIFIED at source; **conflicts** with oneup.today on weekly vs monthly cadence |
| r/nextjs, r/cursor, r/ClaudeAI, r/webdev, r/ChatGPTCoding | UNMEASURED | no rules source obtained | — | UNVERIFIED at source |
| Show HN | FEED | "For books, a sample chapter is ok." Sign-up pages and reading material are off topic. No soliciting upvotes. | https://news.ycombinator.com/showhn.html | **VERIFIED** (fetched 2026-09-04) |
| Hacker News front page | THREAD | Do not use HN primarily for promotion; own stuff part of the time only. Do not solicit upvotes. | https://news.ycombinator.com/newsguidelines.html | **VERIFIED** (fetched 2026-09-04) |
| Product Hunt | APPROVAL | Info products — newsletters, eBooks, reports — must carry expertise not readily found by search; must be usable; no upvote solicitation | https://www.producthunt.com/launch/how-product-hunt-works | **VERIFIED** (fetched 2026-09-04) |
| indiehackers.com forum | FEED | Live post feed; newest posts timestamped one hour old at fetch; site points to X and a newsletter | https://www.indiehackers.com/ | **VERIFIED** (fetched 2026-09-04) |

Gate meanings: **FEED** = an ungated chapter is postable in the normal feed with context.
**THREAD** = restricted to a named promotional thread. **APPROVAL** = paid material needs mod
approval or an editorial bar. **UNMEASURED** = no rules source obtained.

### (a) Where the Indie Hackers community actually lives

`indiehackers.com` is alive. Fetched 2026-09-04, its homepage carries a live "Newest" feed whose
top post is timestamped **one hour old**, with further posts at 4, 6 and 21 hours. It surfaces
an X account and a newsletter; **no Discord was surfaced on the page**. That is the room. The
Reddit room is not: r/indiehackers measured **1 engaged post and 3 bodies out of 100** in
`subreddit-verification.json`, and **10 bodies out of 500** in `pain-density.json` — the two
independent fetches agree that the subreddit is a link dump.

I could not date a "move". No announcement was found, and the searches that claim to describe the
2026 Indie Hackers landscape are SEO content of unknown reliability; one of them asserts
r/indiehackers "runs tactical threads on first users, pricing, and launches", which **both of this
repo's own measurements contradict**. The honest statement is: **the forum on indiehackers.com is
active as of 2026-09-04 (URL and timestamp above); the subreddit is not; no migration event is
documented, and none is claimed here.** A search result surfaced an indiehackers.com post titled
"Kill the forum" (https://www.indiehackers.com/post/kill-the-forum-b186629b51), but on fetching it
that post is dated **2020-10-19** and concerns a third party's own Discourse, not Indie Hackers —
a good example of why a search hit is not a finding.

### (b) Show HN, verified

The Show HN rules page is the only rule set relevant to a paid book that I fetched at source, and
it is decisive: **"For books, a sample chapter is ok."** The same page rules out the alternatives
— "Off topic: blog posts, sign-up pages, newsletters, lists, and other reading material" — and it
asks makers to "make it easy for users to try your thing out, ideally without barriers such as
signups or emails." Upvote solicitation is out: "Please don't ask friends to upvote or comment."
A **free chapter behind an email gate fails Show HN twice** — as a sign-up page, and as a
barrier. An ungated chapter PDF passes on its face.

### (c) Product Hunt

Product Hunt's own launch page sets a bar an excerpt cannot clear alone. Info products —
newsletters, eBooks and reports — must contain "information or expertise that is otherwise not
readily available through a Google search or X"; a launched thing must be "usable", "new" or
carrying "substantive updates since its last launch"; and content completable in a few hours does
not meet the standard. Paying for traffic or upvotes is a removal-and-ban offence. **A single
chapter is not a Product Hunt launch. The 27-file companion pack, released as a usable, ungated
toolkit, is** — it is the artefact on this product that most nearly matches Product Hunt's own
definition of launchable. That is a packaging decision, not a copy decision.

### (c, continued) Hacker News proper

The front page is a different instrument from Show HN and a harsher one. The guidelines say
"Please don't use HN primarily for promotion. It's ok to post your own stuff part of the time",
and "Don't solicit upvotes, comments, or submissions." A chapter posted as an article is judged
purely on whether it is interesting, with no allowance for it being yours. **Show HN is the lane;
the front page is a lottery.**

## Table 7 — Ranked, the ten corpus rooms on measured signal alone

`composite` = mean of three components, each divided by the maximum across the ten rooms:
money-word rate over asking posts · distinct asking authors · crickets rate over all bodies.
Maxima used: money 72% · asking authors 109 · crickets rate 0.90%. Posting rules are not a
component here; score and comments are never components.

| # | Room | Type | money | askAu | crick | COMPOSITE |
| ---: | --- | --- | ---: | ---: | ---: | ---: |
| 1 | r/SaaS | business | 0.73 | 0.70 | 1.00 | **0.807** |
| 2 | r/buildinpublic | business | 0.57 | 0.55 | 0.98 | **0.700** |
| 3 | r/microsaas | business | 0.87 | 0.42 | 0.39 | 0.559 |
| 4 | r/EntrepreneurRideAlong | business | 1.00 | 0.34 | 0.00 | 0.446 |
| 5 | r/nextjs | developer | 0.13 | 1.00 | 0.00 | 0.377 |
| 6 | r/startups | business | 0.54 | 0.51 | 0.00 | 0.350 |
| 7 | r/cursor | developer | 0.20 | 0.79 | 0.00 | 0.330 |
| 8 | r/ClaudeAI | developer | 0.36 | 0.56 | 0.00 | 0.307 |
| 9 | r/webdev | developer | 0.11 | 0.35 | 0.00 | 0.152 |
| 10 | r/ChatGPTCoding | developer | 0.16 | 0.14 | 0.00 | 0.100 |

r/nextjs at #5 is the honest artefact of counting asking authors: it has more of them (109) than
any other room in the corpus, and 9% money language. **Volume of people asking for help is not
the same as a room that buys.**

## Table 8 — Launch fit for an ungated-chapter motion

`fit` = the Table 7 composite × the posting-rules multiplier from Table 6. Multipliers: FEED 1.00
· THREAD 0.40 · APPROVAL 0.15 · UNMEASURED 0.00. A room whose rules could not be fetched scores
0.00 and is not ranked — that is a **missing measurement, not a verdict**; its measured reason for
exclusion is in Table 9.

| # | Room | Gate | Mult | Composite | FIT | Reasoning |
| ---: | --- | --- | ---: | ---: | ---: | --- |
| 1 | r/buildinpublic | FEED | 1.00 | 0.700 | **0.700** | crickets 6 of 677, a hair under the r/SaaS maximum of 6 of 666, and the only room whose native post form is a progress story |
| 2 | r/EntrepreneurRideAlong | FEED | 1.00 | 0.446 | **0.446** | money 72% of 40 asking posts, the corpus maximum, and the case-study form fits a chapter excerpt, but the room is thin — 211 bodies, 37 asking authors |
| 3 | r/SaaS | THREAD | 0.40 | 0.807 | 0.323 | most asking authors of any business room (76) and money 53% of 78 asking posts, but promotion is walled into one weekly thread |
| 4 | r/startups | THREAD | 0.40 | 0.350 | 0.140 | money 39% of 59 asking posts, the lowest of the five business rooms, promo confined to a sticky |
| 5 | r/microsaas | APPROVAL | 0.15 | 0.559 | 0.084 | money 63% of 46 asking posts, highest after EntrepreneurRideAlong, but paid material needs mod approval, which a $99 book squarely is |
| — | r/nextjs | UNMEASURED | 0.00 | 0.377 | 0.000 | see Table 9 |
| — | r/cursor | UNMEASURED | 0.00 | 0.330 | 0.000 | see Table 9 |
| — | r/ClaudeAI | UNMEASURED | 0.00 | 0.307 | 0.000 | see Table 9 |
| — | r/webdev | UNMEASURED | 0.00 | 0.152 | 0.000 | see Table 9 |
| — | r/ChatGPTCoding | UNMEASURED | 0.00 | 0.100 | 0.000 | see Table 9 |

**Off-Reddit venues.** No corpus measurement exists for these, so they are listed on rules fit
alone and are **not** scored against the rooms above.

| Venue | Gate | Verdict | Status |
| --- | --- | --- | --- |
| Show HN | FEED | fits an ungated chapter | VERIFIED 2026-09-04 |
| indiehackers.com forum | FEED | fits an ungated chapter | VERIFIED 2026-09-04 |
| Hacker News front page | THREAD | conditional | VERIFIED 2026-09-04 |
| Product Hunt | APPROVAL | needs more than a chapter | VERIFIED 2026-09-04 |

## Table 9 — Do not launch here

| Room | Measured reason | Denominator |
| --- | --- | ---: |
| r/cursor | crickets 0; money 15% vs wall 22% over asking posts; **0** landing-page authors | 89 asking / 494 bodies |
| r/ClaudeAI | crickets 0; money 26% vs wall 30%; 5 landing-page authors | 61 asking / 416 bodies |
| r/ChatGPTCoding | crickets 0; money 12% vs wall 18%; 1 landing-page author | 17 asking / 212 bodies |
| r/nextjs | crickets 0; money 9% vs wall 56%; 21 landing-page authors | 117 asking / 650 bodies |
| r/webdev | crickets 0; money 8% vs wall 18%; 8 landing-page authors | 39 asking / 260 bodies |
| r/indiehackers | engaged 1, bodies 3 — a link dump, not a conversation | 100 posts sampled |
| r/venturecapital | engaged 2, bodies 3 | 42 posts sampled |
| r/LocalLLaMA | best engagement of all 25 (engaged 80, bodies 82); absent from pain-density.json | 100 posts sampled |
| r/ExperiencedDevs | highest out_of_depth anywhere (21) but crickets 1 — the voice is the reviewer's, not the builder's | 270 bodies (pain-density) |

All five developer rooms together: **crickets 0 across 2,032 bodies**. All five business rooms
together: **crickets 14 across 2,432 bodies**. Distinct "landing page" authors, deduplicated
across the pooled rooms: developer 35 of 2,032 bodies; business 119 of 2,432.

---

## Findings

**1. The launch venue and the sales venue are not the same room, and the split runs along the
same seam the package already found.** Every one of the fourteen crickets posts and all eight
hand-confirmed launch silences sit in the business rooms. The developer rooms — 2,032 bodies,
323 asking posts, 307 asking authors — produce **zero**. But the business rooms produce a lower
rate of people asking for help (11.7% vs 15.9%) and, on the best reading available, are governed
by promotion rules that mostly forbid what a launch is. That second half is the weaker half:
**all five of those rule readings are UNVERIFIED at source** (Table 6 and Limits), and only the
measured half — where the language sits — rests on the corpus. **The room that will let you post
is not the room with the most people in trouble, and the room with the most people in trouble
does not talk about money.**

**2. r/buildinpublic scores highest of the Reddit rooms on both legs at once.** It carries a
crickets rate indistinguishable from the corpus maximum (6 of 677 against r/SaaS's 6 of 666), 60
asking authors, money language in 41% of its 61 asking posts, 35 landing-page authors — and,
alone among the five, a sourced rule saying product mentions are *expected* rather than merely
tolerated. That rule is UNVERIFIED at source like the other four. Its native post form is a
progress story, which is the shape a free chapter about a stalled build already has. That
combination is why it tops Table 8 despite ranking second on measured signal alone.
r/EntrepreneurRideAlong is the only other room carrying the same FEED gate, and it is not far
behind on money — the corpus maximum, 72% of 40 asking posts — but it measures zero crickets
across 211 bodies and a composite of 0.446 against 0.700, which is why it ranks second.
**The counter-signal on r/buildinpublic is in the same row: 41% of its 61 asking posts get zero
comments, the highest silence rate of any room measured.** A post there is more likely to be
permitted and more likely to be ignored.

**3. Show HN is the strongest verified venue in this cut, and it dictates the artefact.** It is
the only rule set I fetched at source that names this exact product category and permits it:
a sample chapter is on topic. It also rules out the delivery mechanism the site currently uses —
"sign-up pages" are off topic, and makers are asked to remove "barriers such as signups or
emails". **An email-gated chapter is not a Show HN. An ungated chapter PDF is.** That is a
concrete, verifiable constraint on the go-to-market rework, not a preference.

**4. Product Hunt wants the companion pack, not the chapter.** Its bar for info products —
expertise "not readily available through a Google search or X", usable, not completable in a few
hours — is a bar a chapter cannot clear and a 27-file working toolkit plausibly can. If a Product
Hunt motion is wanted, the launchable object is the pack.

**5. The corpus contains a stranger's version of the book's own title number, and it is
inverted.** In r/buildinpublic, unprompted, with 62 comments: "building the app is like 20% of
the battle. the other 80%? trying to get literally anyone to even SEE it exists". The book's 80%
is the share of the build that AI finishes. **This author's 80% is distribution.** One post is
one post — but it is the most-answered post in the crickets set, and it sits in the room this cut
ranks first, which makes it a positioning fact worth the operator's attention rather than a
quotable line.

**6. The two distribution terms this cut measured are business-room vocabulary, and one is absent
from r/cursor entirely.** "Landing page" is said by 119 distinct business-room authors of 2,432
bodies and 35 developer-room authors of 2,032; the concentration is r/SaaS (47 of 666 bodies) and
r/buildinpublic (35 of 677), the two rooms this cut ranks highest. r/cursor has **zero across 494
bodies**. Real / first / early users is said by 89 business authors and 12 developer authors on
the same denominators. Both terms are distribution vocabulary, and both live in the rooms where a
launch is possible. This is a measurement about rooms, not about the book: no other chapter's
vocabulary was counted here, so nothing in this cut ranks Chapter 11 against any other chapter.

**7. Three rooms with strong body rates have never been measured for money or wall language:**
r/ProductManagement (62 bodies and 44 engaged of 94 posts sampled = 66% / 47%), r/Entrepreneur
(42 and 42 of 77 = 55% / 55%), r/reactjs (63 and 45 of 100 = 63% / 45%).
Before any launch plan treats the corpus as the map of available rooms, those three are a cheap
corpus pass. This cut cannot say whether they are better than r/buildinpublic; it can say nobody
has looked.

**8. The three fetches disagree by an order of magnitude, and only the direction survives.**
pain-density puts crickets in r/buildinpublic at 29 of 325 sampled bodies (8.9%) where the corpus
measures 6 of 677 (0.89%). It puts r/startups at 8 of 145 (5.5%) where the corpus finds 0 of 302
(0.00%). Any launch plan that quotes a crickets *rate* as a market size is quoting an artefact of
which fetch it read. What both instruments agree on is the ordering: business rooms carry the
word, developer rooms read 0.

## Limits

- **Reddit blocked every rules fetch.** All five subreddit rules are UNVERIFIED at source and
  come from SEO-marketing pages whose incentive is to sell Reddit-posting services. Two of them
  already contradict each other on r/startups' promo cadence. **The rules multipliers in Table 8
  therefore rest on the weakest evidence in this cut, and they change the ranking**: r/SaaS wins
  on measured signal and loses on an unverified rule. Before acting, an operator with a browser
  should read the five sidebars in ten minutes and re-run the script with corrected gates.
- **No rules were obtained for the five developer subs at all.** Their 0.00 fit is a missing
  measurement. They are excluded on measured grounds in Table 9 instead, which is the honest
  basis.
- **Eight posts is eight posts.** The launch-silence finding rests on a hand-read set of 8, from
  8 authors, out of 4,464 bodies. It is a strong claim about *which room* the language appears in
  and a weak claim about *how common* the experience is. `crickets` is one word; people describe
  a dead launch in many others this cut did not search for, and the fuzzy archive search means a
  zero is weak evidence of absence.
- **The corpus is ten subreddits over twelve 10-day windows.** It cannot see X, Discord, Slack
  communities, LinkedIn, newsletters, or indiehackers.com's own forum — the last of which this
  cut verified is alive but could not measure, because measuring it would need a fetch this
  research is not set up to do.
- **Posting rules are not the same as mod behaviour.** A room whose written rule permits a post
  can still remove it. Nothing here measures actual removal rates.
- **This cut cannot say whether a launch would convert.** It measures where the language lives
  and where a post is permitted. It has no evidence at all about whether anyone in these rooms
  buys a $99 book, and the corpus by construction cannot produce that evidence.
- **The composites are ordering conventions.** Equal weighting of three normalised components is
  a choice, not a measurement; a different weighting reorders rooms 3 through 6. The component
  columns are printed beside every composite so the ordering can be redone by hand.
- **What a skeptic's pass changed, 2026-09-04.** All five Table 3 quotes were re-asserted against
  the corpus at their permalinks and still pass character-for-character, so **no quote was
  removed**. Five claims were corrected. The cross-posting figure and the score/comment pairs in
  "How to read this" are now computed and printed by the script instead of asserted, and the
  score sentence had paired real numbers from non-corresponding posts. The r/startups row in
  Table 8 read "thinnest asking volume of the business rooms", which Table 1 contradicts —
  r/EntrepreneurRideAlong has 40 asking posts against r/startups' 59 — and now reports the
  measured fact instead, that r/startups has the lowest money rate of the five. Finding 2 no
  longer calls r/buildinpublic the *only* room scoring on both legs, since
  r/EntrepreneurRideAlong shares its gate. Finding 6 no longer ranks Chapter 11 against other
  chapters, which nothing in this cut measures. Four rates that had drifted away from their
  denominators — two Table 8 rows, the Table 5 prose, and Finding 8 — now carry the counts inline.
  The seven lexicons are printed in the file itself so the classifications can be audited without
  running Python.
