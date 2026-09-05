# Cut E — answered or unanswered, per asking phrase

Produced 2026-09-04 by an Opus agent in the book arc

**Script:** `C:/Users/micah/Code/reddit-research/cuts/cut_e_answered_ratio.py`
(run from that repo root with `.venv/Scripts/python.exe`; it prints every number
in this file, offline against `data/corpus.jsonl`, no network)

**Denominators, reproduced by the script before anything else runs:**

| Quantity | Count | Expected |
| --- | ---: | ---: |
| raw corpus lines | 5,456 | 5,456 |
| posts with `len(clean(body)) >= 250` | 4,464 | 4,464 |
| distinct authors of those posts | 3,842 | 3,842 |
| ASKING posts (`STUCK.search` matched) | 607 | 607 |
| distinct ASKING authors | 567 | 567 |
| ASKING posts in the 5 BUSINESS subs | 284 | 284 |
| distinct BUSINESS asking authors | 261 | 261 |
| ASKING posts in the 5 DEVELOPER subs | 323 | 323 |
| distinct DEVELOPER asking authors | 307 | 307 |

The script asserts these and exits rather than proceed on a denominator it
cannot reproduce. It also reconciles all 60 emergent phrases against their
published author counts in `reference/emergent-language.json`: **all 60 match
exactly.**

## How to read this

Every number here is a count of **public Reddit posts**, so it is evidence about
**language**, not about market size — nobody who solved the problem quietly, or
is under contract, or is too embarrassed to post under their own handle appears
anywhere in it, and a zero is weak evidence of absence rather than proof of one
(the archive's text search is fuzzy, not exact-substring, and its subreddit
coverage is a sample). Two limits specific to this cut. First, **the corpus
carries no comment bodies, only `num_comments`** — so "answered" here means
"received replies", and it cannot tell a considered answer from a one-line
reply, a self-reply, or a bot. Second, those reply counts are **settled**: the
archive's engagement pass lands about 36 hours after a post appears, the oldest
post here is from 2025-09-23, the newest from 2026-08-03, and the newest was
already **30 days old** when the corpus was fetched, with zero posts missing a
comment count. Counts are ranked by **distinct authors, never post frequency**,
because cross-posting is common in this corpus — the flagship "I spent 6 months
building an app that made exactly $0 in revenue" post appears in three subs.
Score is used nowhere as a ranking key; the buyer writes quiet posts. And a
regex hit is a candidate, not a finding: the last two sections are 23 posts
opened and read in full, and they revise the headline table downward.

**The unanswered metric is author-level.** An author counts as unanswered on a
phrase only if **every** post of theirs carrying it drew zero replies, so a
cross-post cannot inflate the rate. `0c-post%` is the post-level version, shown
beside it for comparison.

---

## Lexicons

Three, all printed in the script so they can be audited.

**(A) Emergent — the top 60 `asking_vocab` phrases** of
`reference/emergent-language.json`, ranked there by distinct authors over the
607 asking posts. Nothing hand-written; it came out of the corpus. Matched as
membership in each post's own 2-/3-gram set, exactly the way those counts were
produced — which is why all 60 reconcile.

**(B) Families — named in the cut brief, written generically from the subject.**
No sentence of the book or the sales page was consulted. Regex,
case-insensitive, against `clean(title + '. ' + body)`:

| Family | Pattern |
| --- | --- |
| landing page | `\blanding\s+pages?\b` |
| real/first/early users, first customers | `\b(?:real\|first\|early)\s+users?\b\|\bfirst\s+customers?\b` |
| cold outreach, cold email | `\bcold\s+(?:outreach\|email(?:s\|ing)?)\b` |
| conversion rate, signups | `\bconversion\s+rates?\b\|\bsign[\s\-]?ups?\b` |
| paid ads | `\bpaid\s+(?:ads?\|advertising)\b` |
| crickets, no signups, nobody signed up | `\bcrickets\b\|\bno\s+sign[\s\-]?ups?\b\|\bzero\s+sign[\s\-]?ups?\b\|\b(?:nobody\|no\s+one)\s+signed\s+up\b` |
| kept/keep running into | `\bke(?:pt\|ep\|eps)\s+running\s+into\b` |
| every single | `\bevery\s+single\b` |
| spent months | `\bspent\s+(?:[\w\-]+\s+){0,2}?months?\b` |
| i'm stuck | `\bi\s*(?:'\|’)?\s*m\s+stuck\b\|\bi\s+am\s+stuck\b` |
| vibe coding (all spellings) | `\bvibe[\s\-]?cod(?:e\|es\|ed\|ing\|er\|ers)\b\|\bvibecod(?:e\|es\|ed\|ing\|er\|ers)\b` |
| solo founder | `\bsolo\s+founders?\b` |
| stripe, webhook | `\bstripe\b\|\bweb\s?hooks?\b` |
| deploy, production, works locally | `\bdeploy(?:s\|ed\|ing\|ment\|ments)?\b\|\bproduction\b\|\bworks?\s+(?:fine\s+)?(?:locally\|on\s+my\s+machine)\b` |
| auth, login | `\bauth(?:entication\|orization)?\b\|\blogins?\b\|\blogging\s+in\b\|\bsign[\s\-]?in\b` |
| hipaa, soc 2, gdpr | `\bhipaa\b\|\bsoc\s?-?\s?2\b\|\bgdpr\b` |
| hire, co-founder, contractor | `\bhir(?:e\|es\|ed\|ing)\b\|\bco[\s\-]?founders?\b\|\bcontractors?\b` |
| spec, requirements | `\bspecs?\b\|\bspecification[s]?\b\|\brequirements?\b` |

**(C) Chapters — one lexicon per chapter subject.** Written from the subject and
nothing else; the manuscript was not opened while writing them. They overlap on
purpose (a post about a payment webhook failing in production is chapter 04 and
chapter 06 at once), so the rows do not sum to 607. Full patterns are in the
script under `CHAPTERS`.

**(D) Money/wall split** — `WALL_WORDS` and `MONEY_WORDS` are imported unchanged
from `compare_rooms.py`, the same generic lexicons behind the published split.

---

## Table 1 — every phrase, ranked by distinct authors

All rows are drawn from the 607 asking posts / 567 distinct asking authors.
`0c%` = share of that row's own authors whose every matching post drew zero
replies. `<=2c%` = same, at most two replies. `0c-post%` = share of that row's
own posts with zero replies. `med` = median `num_comments` per matching post.
Rows tagged `[family]` come from lexicon (B); the rest are emergent phrases.

| Phrase | Posts | Authors | 0c/auth | 0c% | ≤2c% | 0c-post% | Med | biz/dev authors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| deploy, production, works locally [family] | 59 | 58 | 9/58 | 16% | 31% | 15% | 4 | 24/34 |
| claude code | 46 | 46 | 2/46 | 4% | 35% | 4% | 6 | 8/38 |
| auth, login [family] | 47 | 45 | 7/45 | 16% | 40% | 15% | 5 | 16/29 |
| hire, co-founder, contractor [family] | 44 | 43 | 5/43 | 12% | 28% | 11% | 10 | 37/6 |
| landing page [family] | 35 | 34 | 5/34 | 15% | 32% | 14% | 3 | 29/5 |
| kept/keep running into [family] | 40 | 34 | 6/34 | 18% | 47% | 20% | 3 | 18/16 |
| landing page | 33 | 32 | 5/32 | 16% | 31% | 15% | 3 | 27/5 |
| conversion rate, signups [family] | 34 | 32 | 7/32 | 22% | 47% | 21% | 4 | 28/4 |
| real/first/early users, first customers [family] | 29 | 29 | 2/29 | 7% | 21% | 7% | 7 | 25/4 |
| every single | 26 | 24 | 2/24 | 8% | 33% | 8% | 7 | 12/12 |
| love hear | 26 | 24 | 4/24 | 17% | 46% | 15% | 3 | 20/4 |
| every single [family] | 26 | 24 | 2/24 | 8% | 33% | 8% | 7 | 12/12 |
| greatly appreciated | 24 | 22 | 2/22 | 9% | 27% | 17% | 4 | 6/16 |
| stripe, webhook [family] | 22 | 22 | 4/22 | 18% | 32% | 18% | 4 | 10/12 |
| kept running | 27 | 21 | 6/21 | 29% | 57% | 30% | 2 | 13/8 |
| next app | 20 | 20 | 2/20 | 10% | 30% | 10% | 6 | 0/20 |
| i'm trying | 19 | 19 | 2/19 | 11% | 32% | 11% | 3 | 4/15 |
| thanks advance | 19 | 19 | 0/19 | 0% | 26% | 0% | 7 | 3/16 |
| vibe coding (all spellings) [family] | 19 | 19 | 4/19 | 21% | 26% | 21% | 6 | 7/12 |
| web app | 18 | 18 | 3/18 | 17% | 33% | 17% | 3 | 9/9 |
| honest feedback | 19 | 18 | 4/18 | 22% | 50% | 21% | 3 | 17/1 |
| months ago | 17 | 17 | 5/17 | 29% | 53% | 29% | 2 | 13/4 |
| else experienced | 18 | 17 | 0/17 | 0% | 18% | 6% | 4 | 2/15 |
| i'm stuck [family] | 18 | 17 | 2/17 | 12% | 18% | 11% | 7 | 10/7 |
| trying figure | 15 | 15 | 3/15 | 20% | 40% | 20% | 4 | 9/6 |
| happy answer | 19 | 15 | 2/15 | 13% | 33% | 16% | 4 | 8/7 |
| every day | 15 | 14 | 3/14 | 21% | 43% | 20% | 3 | 12/2 |
| i'm building | 15 | 14 | 3/14 | 21% | 50% | 20% | 2 | 7/7 |
| open source | 15 | 14 | 5/14 | 36% | 50% | 40% | 2 | 6/8 |
| keep running | 14 | 14 | 0/14 | 0% | 36% | 0% | 3 | 6/8 |
| i'd love | 14 | 14 | 3/14 | 21% | 36% | 21% | 3 | 11/3 |
| last week | 13 | 13 | 2/13 | 15% | 38% | 15% | 3 | 9/4 |
| i'm stuck | 14 | 13 | 2/13 | 15% | 23% | 14% | 4 | 8/5 |
| real users | 12 | 12 | 0/12 | 0% | 0% | 0% | 7 | 10/2 |
| can't find | 12 | 12 | 3/12 | 25% | 50% | 25% | 2 | 2/10 |
| trying build | 12 | 12 | 2/12 | 17% | 42% | 17% | 3 | 8/4 |
| i've tried | 13 | 12 | 2/12 | 17% | 25% | 23% | 4 | 4/8 |
| app router | 12 | 12 | 1/12 | 8% | 17% | 8% | 7 | 0/12 |
| cold outreach, cold email [family] | 13 | 12 | 4/12 | 33% | 50% | 31% | 3 | 12/0 |
| answer questions | 11 | 11 | 4/11 | 36% | 64% | 36% | 1 | 6/5 |
| free tier | 11 | 11 | 3/11 | 27% | 64% | 27% | 2 | 8/3 |
| i'm not sure | 11 | 11 | 2/11 | 18% | 27% | 18% | 12 | 3/8 |
| couldn't find | 11 | 11 | 5/11 | 45% | 73% | 45% | 1 | 8/3 |
| appreciated thanks | 12 | 11 | 1/11 | 9% | 45% | 17% | 2 | 1/10 |
| i'm thinking | 12 | 11 | 1/11 | 9% | 18% | 8% | 8 | 6/5 |
| wanted share | 11 | 11 | 3/11 | 27% | 55% | 27% | 2 | 9/2 |
| trying understand | 11 | 10 | 0/10 | 0% | 30% | 0% | 4 | 4/6 |
| software engineer | 10 | 10 | 3/10 | 30% | 50% | 30% | 2 | 7/3 |
| last year | 10 | 10 | 0/10 | 0% | 20% | 0% | 3 | 8/2 |
| hey guys | 12 | 10 | 1/10 | 10% | 40% | 25% | 2 | 5/5 |
| building public | 11 | 10 | 3/10 | 30% | 40% | 27% | 10 | 9/1 |
| i've been working | 10 | 10 | 3/10 | 30% | 60% | 30% | 2 | 8/2 |
| social media | 11 | 10 | 1/10 | 10% | 10% | 9% | 3 | 9/1 |
| full stack | 10 | 10 | 0/10 | 0% | 10% | 0% | 9 | 3/7 |
| vibe coding | 10 | 10 | 4/10 | 40% | 50% | 40% | 2 | 4/6 |
| spec, requirements [family] | 11 | 10 | 4/10 | 40% | 50% | 45% | 1 | 4/6 |
| early users | 9 | 9 | 1/9 | 11% | 33% | 11% | 7 | 8/1 |
| actually work | 9 | 9 | 3/9 | 33% | 56% | 33% | 1 | 3/6 |
| keep getting | 9 | 9 | 2/9 | 22% | 33% | 22% | 7 | 4/5 |
| cold outreach | 10 | 9 | 3/9 | 33% | 33% | 30% | 5 | 9/0 |
| pain points | 14 | 9 | 2/9 | 22% | 33% | 21% | 5 | 9/0 |
| i'm struggling | 9 | 9 | 1/9 | 11% | 22% | 11% | 6 | 7/2 |
| tech stack | 9 | 9 | 3/9 | 33% | 56% | 33% | 2 | 5/4 |
| kept hitting | 10 | 9 | 3/9 | 33% | 67% | 40% | 1 | 4/5 |
| i'd love hear | 9 | 9 | 3/9 | 33% | 44% | 33% | 3 | 9/0 |
| love feedback | 10 | 9 | 5/9 | 56% | 78% | 60% | 0 | 6/3 |
| spent months [family] | 11 | 9 | 2/9 | 22% | 44% | 27% | 5 | 9/0 |
| per day | 8 | 8 | 1/8 | 12% | 50% | 12% | 2 | 7/1 |
| saas product | 10 | 8 | 1/8 | 12% | 38% | 10% | 3 | 7/1 |
| first users | 8 | 8 | 2/8 | 25% | 38% | 25% | 3 | 8/0 |
| genuinely love | 8 | 8 | 2/8 | 25% | 62% | 25% | 2 | 6/2 |
| app store | 8 | 8 | 3/8 | 38% | 75% | 38% | 2 | 8/0 |
| paying customers | 10 | 8 | 1/8 | 12% | 25% | 20% | 6 | 7/1 |
| appreciate any advice | 8 | 8 | 1/8 | 12% | 25% | 12% | 4 | 6/2 |
| solo founder [family] | 9 | 8 | 2/8 | 25% | 38% | 22% | 4 | 8/0 |
| paid ads [family] | 7 | 6 | 0/6 | 0% | 0% | 0% | 8 | 6/0 |
| crickets, no signups, nobody signed up [family] | 4 | 4 | 0/4 | 0% | 25% | 0% | 3 | n<5 |
| hipaa, soc 2, gdpr [family] | 0 | 0 | 0/0 | 0% | 0% | 0% | 0 | n<5 |

Two rows to note before anything else. **`hipaa, soc 2, gdpr` matches zero of
the 607 asking posts** — the only phrase in the set that matches nothing.
**`crickets, no signups, nobody signed up` matches 4 posts from 4 authors**, all
of them answered; `crickets` is a word people use when reporting a launch, not
when asking for help, which is why the published package found 29 of them in
r/buildinpublic across all posts and this cut finds almost none among askers.

## Table 2 — top 20 open slots

Highest share of askers who got no reply at all. Phrases with at least 5
distinct authors only; **76 of the 78 rows qualify** (the two that do not are
the two above).

| Phrase | Posts | Authors | 0c/auth | 0c% | ≤2c% | 0c-post% | Med | biz/dev authors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| love feedback | 10 | 9 | 5/9 | 56% | 78% | 60% | 0 | 6/3 |
| couldn't find | 11 | 11 | 5/11 | 45% | 73% | 45% | 1 | 8/3 |
| vibe coding | 10 | 10 | 4/10 | 40% | 50% | 40% | 2 | 4/6 |
| spec, requirements [family] | 11 | 10 | 4/10 | 40% | 50% | 45% | 1 | 4/6 |
| app store | 8 | 8 | 3/8 | 38% | 75% | 38% | 2 | 8/0 |
| answer questions | 11 | 11 | 4/11 | 36% | 64% | 36% | 1 | 6/5 |
| open source | 15 | 14 | 5/14 | 36% | 50% | 40% | 2 | 6/8 |
| cold outreach, cold email [family] | 13 | 12 | 4/12 | 33% | 50% | 31% | 3 | 12/0 |
| actually work | 9 | 9 | 3/9 | 33% | 56% | 33% | 1 | 3/6 |
| cold outreach | 10 | 9 | 3/9 | 33% | 33% | 30% | 5 | 9/0 |
| tech stack | 9 | 9 | 3/9 | 33% | 56% | 33% | 2 | 5/4 |
| kept hitting | 10 | 9 | 3/9 | 33% | 67% | 40% | 1 | 4/5 |
| i'd love hear | 9 | 9 | 3/9 | 33% | 44% | 33% | 3 | 9/0 |
| software engineer | 10 | 10 | 3/10 | 30% | 50% | 30% | 2 | 7/3 |
| building public | 11 | 10 | 3/10 | 30% | 40% | 27% | 10 | 9/1 |
| i've been working | 10 | 10 | 3/10 | 30% | 60% | 30% | 2 | 8/2 |
| months ago | 17 | 17 | 5/17 | 29% | 53% | 29% | 2 | 13/4 |
| kept running | 27 | 21 | 6/21 | 29% | 57% | 30% | 2 | 13/8 |
| free tier | 11 | 11 | 3/11 | 27% | 64% | 27% | 2 | 8/3 |
| wanted share | 11 | 11 | 3/11 | 27% | 55% | 27% | 2 | 9/2 |

## Table 3 — top 20 incumbents

Lowest share of askers who got no reply: somebody is already answering these.
Same 5-author floor.

| Phrase | Posts | Authors | 0c/auth | 0c% | ≤2c% | 0c-post% | Med | biz/dev authors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| paid ads [family] | 7 | 6 | 0/6 | 0% | 0% | 0% | 8 | 6/0 |
| full stack | 10 | 10 | 0/10 | 0% | 10% | 0% | 9 | 3/7 |
| last year | 10 | 10 | 0/10 | 0% | 20% | 0% | 3 | 8/2 |
| trying understand | 11 | 10 | 0/10 | 0% | 30% | 0% | 4 | 4/6 |
| real users | 12 | 12 | 0/12 | 0% | 0% | 0% | 7 | 10/2 |
| keep running | 14 | 14 | 0/14 | 0% | 36% | 0% | 3 | 6/8 |
| else experienced | 18 | 17 | 0/17 | 0% | 18% | 6% | 4 | 2/15 |
| thanks advance | 19 | 19 | 0/19 | 0% | 26% | 0% | 7 | 3/16 |
| claude code | 46 | 46 | 2/46 | 4% | 35% | 4% | 6 | 8/38 |
| real/first/early users, first customers [family] | 29 | 29 | 2/29 | 7% | 21% | 7% | 7 | 25/4 |
| app router | 12 | 12 | 1/12 | 8% | 17% | 8% | 7 | 0/12 |
| every single [family] | 26 | 24 | 2/24 | 8% | 33% | 8% | 7 | 12/12 |
| every single | 26 | 24 | 2/24 | 8% | 33% | 8% | 7 | 12/12 |
| i'm thinking | 12 | 11 | 1/11 | 9% | 18% | 8% | 8 | 6/5 |
| appreciated thanks | 12 | 11 | 1/11 | 9% | 45% | 17% | 2 | 1/10 |
| greatly appreciated | 24 | 22 | 2/22 | 9% | 27% | 17% | 4 | 6/16 |
| social media | 11 | 10 | 1/10 | 10% | 10% | 9% | 3 | 9/1 |
| hey guys | 12 | 10 | 1/10 | 10% | 40% | 25% | 2 | 5/5 |
| next app | 20 | 20 | 2/20 | 10% | 30% | 10% | 6 | 0/20 |
| i'm trying | 19 | 19 | 2/19 | 11% | 32% | 11% | 3 | 4/15 |

## Table 4 — the book's own subjects

Same measurement, chapter lexicons. Rows overlap by design and do not sum to
607. Ranked by unanswered share, open slot at the top.

| Chapter subject | Posts | Authors | 0c/auth | 0c% | ≤2c% | 0c-post% | Med | biz/dev authors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 02 the spec (one-page spec, scope drift) | 15 | 12 | 4/12 | 33% | 42% | 40% | 3 | 6/6 |
| 09 the distribution loop (referrals, users from users) | 44 | 40 | 9/40 | 22% | 35% | 23% | 6 | 37/3 |
| 06 stripe in production (webhooks, test-to-live, refunds) | 72 | 71 | 14/71 | 20% | 37% | 21% | 4 | 37/34 |
| 11 CANDIDATE landing page (conversion, signups, pricing) | 60 | 57 | 11/57 | 19% | 39% | 18% | 3 | 49/8 |
| 10 when to hand it off (hire, fractional, sell, data room) | 75 | 71 | 13/71 | 18% | 34% | 19% | 6 | 61/10 |
| 07 compliance (HIPAA, SOC 2, GDPR, BAA/DPA) | 6 | 6 | 1/6 | 17% | 67% | 17% | 2 | 3/3 |
| 08 the first ten users (outreach, warm intros) | 52 | 48 | 8/48 | 17% | 33% | 19% | 4 | 44/4 |
| 03 architecture (client, server, data, trust lines) | 52 | 48 | 7/48 | 15% | 31% | 15% | 4 | 15/33 |
| 01 build broke at 80% (context, regressions) | 7 | 7 | 1/7 | 14% | 43% | 14% | 6 | 2/5 |
| 04 deploy day (env vars, migrations, domains) | 70 | 69 | 9/69 | 13% | 28% | 13% | 5 | 24/45 |
| 05 security pre-flight (authn/authz, IDOR, RLS, keys) | 70 | 66 | 8/66 | 12% | 32% | 11% | 6 | 23/43 |

## Table 4b — reach of each chapter lexicon

Asking posts (of 607 / 567 authors) against the whole body corpus (4,464 posts /
3,842 authors). A subject can be thin among askers and still common in the
corpus at large; that is a different finding.

| Chapter subject | Ask posts | Ask authors | All posts | All authors | Ask share of all posts |
| --- | ---: | ---: | ---: | ---: | ---: |
| 01 build broke at 80% (context, regressions) | 7 | 7 | 80 | 73 | 9% |
| 02 the spec (one-page spec, scope drift) | 15 | 12 | 150 | 138 | 10% |
| 03 architecture (client, server, data, trust lines) | 52 | 48 | 404 | 377 | 13% |
| 04 deploy day (env vars, migrations, domains) | 70 | 69 | 453 | 420 | 15% |
| 05 security pre-flight (authn/authz, IDOR, RLS, keys) | 70 | 66 | 456 | 414 | 15% |
| 06 stripe in production (webhooks, test-to-live, refunds) | 72 | 71 | 556 | 511 | 13% |
| 07 compliance (HIPAA, SOC 2, GDPR, BAA/DPA) | 6 | 6 | 80 | 77 | 8% |
| 08 the first ten users (outreach, warm intros) | 52 | 48 | 296 | 265 | 18% |
| 09 the distribution loop (referrals, users from users) | 44 | 40 | 346 | 295 | 13% |
| 10 when to hand it off (hire, fractional, sell, data room) | 75 | 71 | 480 | 422 | 16% |
| 11 CANDIDATE landing page (conversion, signups, pricing) | 60 | 57 | 473 | 423 | 13% |

## Table 5 — chapter subjects by room

Denominators: 261 business asking authors, 307 developer asking authors.

| Chapter subject | Biz authors | Biz 0c% | Dev authors | Dev 0c% |
| --- | ---: | ---: | ---: | ---: |
| 01 build broke at 80% (context, regressions) | 2 | 50% | 5 | 0% |
| 02 the spec (one-page spec, scope drift) | 6 | 33% | 6 | 33% |
| 03 architecture (client, server, data, trust lines) | 15 | 33% | 33 | 6% |
| 04 deploy day (env vars, migrations, domains) | 24 | 33% | 45 | 2% |
| 05 security pre-flight (authn/authz, IDOR, RLS, keys) | 23 | 26% | 43 | 5% |
| 06 stripe in production (webhooks, test-to-live, refunds) | 37 | 38% | 34 | 0% |
| 07 compliance (HIPAA, SOC 2, GDPR, BAA/DPA) | 3 | 0% | 3 | 33% |
| 08 the first ten users (outreach, warm intros) | 44 | 18% | 4 | 0% |
| 09 the distribution loop (referrals, users from users) | 37 | 24% | 3 | 0% |
| 10 when to hand it off (hire, fractional, sell, data room) | 61 | 21% | 10 | 0% |
| 11 CANDIDATE landing page (conversion, signups, pricing) | 49 | 22% | 8 | 0% |

## Baselines

So that no rate above floats free.

| Population | Denominator | 0c-auth | ≤2c-auth | 0c-post | Median comments |
| --- | --- | ---: | ---: | ---: | ---: |
| all asking posts | 607 posts / 567 authors | 84/567 = 15% | 35% | 98/607 = 16% | 4 |
| business asking | 284 posts / 261 authors | 60/261 = 23% | 43% | 68/284 = 24% | 3 |
| developer asking | 323 posts / 307 authors | 24/307 = 8% | 28% | 30/323 = 9% | 5 |
| showcase-only (not asking) | 905 posts / 835 authors | 249/835 = 30% | — | — | 2 |

## Table 6 — who gets ignored, by what they talk about

`WALL_WORDS` and `MONEY_WORDS` imported unchanged from `compare_rooms.py`. Every
asking post falls in exactly one of four cells.

| Room | Cell | Posts | Authors | 0c/auth | 0c% | ≤2c% | Med |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| all asking (607 / 567) | wall only | 118 | 113 | 13/113 | 12% | 32% | 4 |
| all asking (607 / 567) | money only | 141 | 128 | 16/128 | 12% | 29% | 5 |
| all asking (607 / 567) | **both** | 51 | 49 | 12/49 | **24%** | 41% | 3 |
| all asking (607 / 567) | neither | 297 | 282 | 43/282 | 15% | 38% | 3 |
| business (284 / 261) | wall only | 19 | 18 | 7/18 | **39%** | 56% | 2 |
| business (284 / 261) | money only | 110 | 97 | 16/97 | 16% | 34% | 4 |
| business (284 / 261) | **both** | 37 | 35 | 12/35 | **34%** | 57% | 2 |
| business (284 / 261) | neither | 118 | 112 | 25/112 | 22% | 44% | 3 |
| developer (323 / 307) | wall only | 99 | 95 | 6/95 | 6% | 27% | 5 |
| developer (323 / 307) | money only | 31 | 31 | 0/31 | 0% | 13% | 9 |
| developer (323 / 307) | both | 14 | 14 | 0/14 | 0% | 0% | 8 |
| developer (323 / 307) | neither | 179 | 170 | 18/170 | 11% | 34% | 4 |

## Hand classification — 23 zero-comment posts, read in full

Every zero-comment asking post carrying six of the top-ranked open-slot phrases
(`spec, requirements`; the chapter-02 lexicon; `cold outreach, cold email`;
`couldn't find`; `vibe coding`; `love feedback`) was opened and its full body
read. That is **23 of the 98 zero-comment asking posts (23%)** — every
zero-comment post under those phrases, not a random sample of the 607. The 23
are 21 distinct pieces of writing; the remainder are cross-posts.

| Classification | Posts | Share |
| --- | ---: | ---: |
| question — primary act is asking for help with a stated problem | 6 | 26% |
| showcase — presents a product or build; the classifier fired on narrative or a closing feedback request | 14 | 61% |
| advice — the author is giving an answer or a retrospective, not asking | 2 | 9% |
| listing — the author is selling something | 1 | 4% |

Each quotation below is verbatim; the script asserts it is an exact substring of
that post's cleaned text and prints its word count before printing it. Handles
are never printed.

| Sub | Score | Comments | Class | Quote | Permalink |
| --- | ---: | ---: | --- | --- | --- |
| r/buildinpublic | 1 | 0 | question | "I'm a solo technical founder, marketing isn't my strength" | https://www.reddit.com/r/buildinpublic/comments/1t96r2s/my_saas_signups_dropped_72_in_2_months_i_need/ |
| r/buildinpublic | 1 | 0 | question | "The app works, closed testers seem to like it, but I'm stuck on what to do next for distribution." | https://www.reddit.com/r/buildinpublic/comments/1t9arfn/how_do_you_actually_get_your_first_100_users_for/ |
| r/buildinpublic | 1 | 0 | question | "I’ve created a bunch of applications but I’ve never been able to release a single one of them." | https://www.reddit.com/r/buildinpublic/comments/1t9b9r0/how_do_i_stop_improving_my_product/ |
| r/SaaS | 1 | 0 | question | "i literally put my all into this my car my harley bike" | https://www.reddit.com/r/SaaS/comments/1t9f1s7/i_need_help_my_guys/ |
| r/webdev | 1 | 0 | question | "I’m currently deep in the trenches of a product matching project and I’ve hit a wall with my current architecture" | https://www.reddit.com/r/webdev/comments/1t94ie9/scaling_product_image_matching_across_150_brand/ |
| r/cursor | 1 | 0 | question | "I searched the internet up and down but couldn't find anything pointing towards a solution" | https://www.reddit.com/r/cursor/comments/1nq1fvp/oauth_issue_when_authorizing_mcp_any_ideas/ |
| r/microsaas | 1 | 0 | advice | "Nobody warned me how easy it is to waste months building something nobody wants" | https://www.reddit.com/r/microsaas/comments/1r5k7ed/i_spent_6_months_building_an_app_that_made/ |

---

# Findings

**1. The rooms answer at completely different rates, and it is not close.** A
developer asking post gets a median of 5 replies and its author is ignored 8% of
the time (24 of 307 authors). A business asking post gets a median of 3 and its
author is ignored 23% of the time (60 of 261). Post-level the gap is the same
shape: 30 of 323 developer posts (9%) against 68 of 284 business posts (24%).
The developer subreddits are a functioning answer machine; the business
subreddits are not. Table 5 makes the same point per chapter. On the three
engineering subjects with a substantial population in both rooms, the developer
rooms leave between **2% and 6%** of askers unanswered (chapter 04, 45 authors,
2%; chapter 05, 43 authors, 5%; chapter 03, 33 authors, 6%). The business rooms
leave **26% to 33%** of the askers on those same three unanswered (chapter 03,
15 authors, 33%; chapter 04, 24 authors, 33%; chapter 05, 23 authors, 26%).
Chapter 06 splits the same way and harder: **0% of its 34 developer-room authors
against 38% of its 37 business-room authors**, the worst business-room rate of
any chapter with a substantial business population. (Chapter 01's business rate
reads 50%, but on 2 authors, below the 5-author floor used everywhere else
here.) That is also why chapter 06 is not counted among the
incumbented subjects in Finding 2. Its overall rate, 14 of 71 authors at 20%,
sits above the 15% all-asking baseline, because half its population is asking in
the room that does not answer. The same question gets answered in one room and
ignored in the other.

**2. The book's engineering chapters are the most-incumbented subjects in the
set.** Chapters 04, 05, 03 and 01 sit at the bottom of the unanswered ranking —
13%, 12%, 15% and 14% against a 15% all-asking baseline — with the developer
rooms doing the answering (chapter 04: 45 of 69 authors are developer-room; 05:
43 of 66; 03: 33 of 48). Chapter 06 is an engineering subject too and is
deliberately not in that list: it is answered at 0% in the developer rooms but
at 38% in the business rooms, and its overall 20% of 71 authors puts it above
the baseline, not below it. Deploy day and the security pre-flight are 70 asking
posts each, which is genuine demand, but somebody already replies to almost
every one of those posts in the room where they are asked. Chapter 01, the
book's title chapter, is the thinnest subject measured: **7 asking posts from 7
authors**, 80 posts / 73 authors across the whole 4,464-post corpus, and 5 of
its 7 asking authors are in the developer rooms where the unanswered rate is 0%.
That is consistent with the published regression null, from an independent
lexicon.

**3. The go-to-market chapters are where askers get dropped, and they are almost
entirely a business-room population.** Chapter 09 is the highest-ranked
substantial open slot: **9 of 40 authors unanswered, 22%**, and 37 of its 40
authors are business-room. Chapter 11, the candidate landing-page chapter, is
**11 of 57, 19%**, with 49 of 57 authors business-room and only 8 developer-room
— and it is the second-largest business-room subject in the set. Chapter 10 is
**13 of 71, 18%** with 61 of 71 business-room. Chapter 08 is **8 of 48, 17%**
with 44 of 48 business-room. In each of those four, the business slice carries
the whole unanswered rate (09: 24% biz against 0% dev; 11: 22% against 0%; 10:
21% against 0%; 08: 18% against 0%). The developer rooms answer their handful of
distribution questions perfectly and there are almost none of them (3, 8, 10 and
4 authors respectively).

**4. The two most-ignored cells in the corpus are both business-room and both
carry an engineering blocker; the book's stated ICP is the second of them.**
Ranked by unanswered share, the worst cell of the twelve in Table 6 is business
wall-only — an engineering blocker with no money word — at **7 of 18 authors
(39%)**, on the smallest base of the four business cells. The second worst is
the ICP cell: of the 261 business asking authors, 35 write posts carrying
**both** wall words and money words, and **12 of those 35 (34%) got no reply at
all**. Both sit far above the money-only cell at 16% (16 of 97) and the neither
cell at 22% (25 of 112). The ICP cell is the more substantive of the two — 35
authors rather than 18, and the blocker-plus-money combination the book is
actually written for — but on rate alone it is second, not first. The mirror
cell in the developer rooms is 0 of 14. Somebody who shows up in a business
subreddit naming an engineering problem, with or without a revenue number
attached, is among the likeliest people in this corpus to be ignored — which is
an argument for the book's existence and against expecting a business subreddit
to be the channel that finds them.

**5. `spec, requirements` is the top-ranked open slot among the book's own
subjects, and it is genuine but thin.** Chapter 02's lexicon: **4 of 12 authors
unanswered, 33%**, worst of the eleven chapters, and its post-level rate is 40%
(6 of 15). But it is 12 authors, 6 business and 6 developer, and 150 posts
across the whole corpus. It is the smallest substantial subject after chapters
01 and 07. Treat it as a signal that nobody answers spec questions, not as
evidence of volume.

**6. Compliance is not asked about at all.** The `hipaa, soc 2, gdpr` family
matches **0 of 607 asking posts** — the only phrase in a set of 78 that matches
nothing. The wider chapter-07 lexicon, which adds "compliance", "compliant",
"BAA", "PCI" and "regulated", finds **6 asking posts from 6 authors**, and 80
posts / 77 authors across the whole 4,464-post corpus. These communities do not
raise compliance in public, in either room. Given the fuzzy archive search this
is weak evidence of absence rather than proof, but it is the strongest zero in
the cut.

**7. The mechanical ranking overstates open slots, and reading corrects it.** Of
the 23 zero-comment posts opened, only **6 (26%) are genuine questions**; 14
(61%) are showcase posts whose asking classifier fired on narrative ("I kept
hitting", "I couldn't find") or on a closing request for feedback, 2 are
retrospectives handing out advice, and 1 is a codebase for sale. That is why the
top of Table 2 is dominated by showcase register — `love feedback` (5 of 9
authors, 56% unanswered), `answer questions` (4 of 11, 36%), `i'd love hear` (3
of 9, 33%), `wanted share` (3 of 11, 27%), `i've been working` (3 of 10, 30%),
`building public` (3 of 10, 30%). Every one of those rates sits on ten authors
or so; they are directional, not precise. Those are not
unanswered questions; they are ignored launch posts, and the showcase-only
baseline confirms it at **249 of 835 authors, 30% unanswered, median 2 replies**
— exactly double the asking baseline of 15%. A phrase whose high unanswered rate
comes from showcase contamination is not a content opportunity. The
subject-level rows in Table 4 are far less exposed to this, because a chapter
lexicon keys on topic rather than on posting register.

**8. The distribution phrases that are answered are answered fast.** `real
users` (12 authors, 0% unanswered, 0% at-or-below-two, median 7), `paid ads` (6
authors, 0%, median 8), `real/first/early users, first customers` (29 authors,
7%, median 7) and `social media` (10 authors, 10%, median 3) are among the most
reliably answered rows in the whole set. So the business rooms are not silent on
distribution in general — they answer the generic version of the question
readily. What they drop is the specific, numbers-carrying version: the 72%
signup drop, the first-100-users plan for a named niche, the person out of
runway. All three of those are in the hand-read question set and all three drew
zero replies.

**Which of the book's subjects are open slots and which are crowded.** Against
an all-asking baseline of 15% unanswered (84 of 567 authors) and a business-room
baseline of 23% (60 of 261), the crowded subjects are the engineering chapters:
05 at 12% of 66 authors, 04 at 13% of 69, 03 at 15% of 48, 01 at 14% of 7 — all
at or below baseline, all answered in the developer rooms at 0-6%, and 01 so
thin (7 asking posts, 80 corpus-wide) that its ranking barely means anything.
The open slots are the go-to-market chapters, and they are open specifically in
the business rooms: 09 at 22% of 40 authors (37 business-room), 11 at 19% of 57
(49 business-room), 10 at 18% of 71 (61 business-room), 08 at 17% of 48 (44
business-room). Chapter 02 ranks highest of all at 33% of 12 authors but on the
smallest base of any substantial subject. Chapter 07 is not a slot at all, open
or crowded — 6 asking authors, and its narrow lexicon matches zero of 607. On
this evidence the ungated material that could rank lives in chapters 08-11 and
the audience for it is the business room; the engineering chapters are the part
of the book a reader already has a free answer for, which is an argument for
keeping them as the paid depth rather than the front door.

---

# Limits

- **No comment bodies.** "Answered" means `num_comments > 0`. A post with 4
  replies may have four "commenting for reach" one-liners; a post with 0 may have
  been answered in DMs, in a linked thread, or by the author editing the post. The
  cut cannot distinguish a good answer from a bad one, and therefore cannot show
  that an incumbent answer is *correct* — only that somebody replied.
- **Removed, deleted and locked posts are invisible.** A post moderators removed
  minutes after it appeared would look like an unanswered question here. The
  corpus carries no removal flag.
- **The sample is public posts in ten subreddits over twelve 10-day windows.** It
  cannot see Discord, Slack, private communities, the people who asked nobody, or
  the whole population who never post. A 22% unanswered rate is 22% of the people
  who chose to post in these rooms during those windows.
- **The archive's text search is fuzzy** and its per-window coverage varies, so a
  zero — including the compliance zero — is weak evidence of absence.
- **Chapter lexicons are my construction.** They map to subjects and overlap
  heavily by design; a different reasonable lexicon would move a chapter's row by
  several points. Every pattern is printed in the script so a reader can disagree
  precisely. The emergent phrase rows carry no such risk — all 60 reconcile
  exactly with the published counts.
- **One chapter-lexicon fragment was removed after review, on 2026-09-04.** The
  chapter-01 pattern carried `\bworked\s+yesterday\b`, which is an exact
  substring of a sentence in the manuscript. It could not be claimed as written
  from the subject alone, so it was deleted from the script and the cut re-run.
  It had matched **0 of the 4,464 corpus posts**, so no number in this file
  moved: chapter 01 is 7 asking posts / 7 authors, 80 posts / 73 authors
  corpus-wide, before and after. The removal is recorded in the script beside
  the pattern. No other fragment in any lexicon is drawn from the manuscript;
  `crickets` and `kept/keep running into` were named in the cut brief.
- **The seven verbatim quotations were re-asserted on the re-run** and all seven
  print `VERBATIM=OK` against their post's cleaned text. None was removed.
- **The hand-read sample is 23 of 98 zero-comment asking posts, chosen by
  phrase, not at random.** The 26%-genuine-question figure is a correction in the
  right direction, not a corpus-wide estimate; a random sample of the 98 could
  land meaningfully higher or lower.
- **This cut cannot see demand for a book.** An unanswered Reddit question is
  evidence that a free answer did not arrive in that thread. It is not evidence
  that the asker would pay $99, and it says nothing about search volume, which is
  a different measurement on a different instrument.
- **Correlation of subject with room is not causation.** The engineering
  chapters look crowded partly because engineering questions get asked where
  engineers are. The right read is "this subject already has an incumbent in the
  room where it is asked", not "nobody needs this".
