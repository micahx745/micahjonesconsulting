# Cut A — the chapter demand map

Produced 2026-09-04 by an Opus agent in the book arc

**Script:** `C:/Users/micah/Code/reddit-research/cuts/cut_a_chapter_demand.py` — run it from
the repo root with `.venv/Scripts/python.exe`; it prints every table below and writes the
JSON sibling with `--json <path>`. It runs offline against `data/corpus.jsonl` and touches
no network.

**Machine-readable sibling:** `04-CUT-A-chapter-demand-map.json` — same numbers, same
lexicons, same permalinks, as data.

**Denominators, reproduced from `01-REDDIT-EVIDENCE.md` before anything else was counted:**
5,456 corpus lines · **4,464 posts** with 250+ characters of surviving body text ·
**3,842 distinct authors** · **607 asking posts** from **567 distinct authors** ·
of those, **284 business-sub asking posts** from **261 distinct authors** and
**323 developer-sub asking posts** from **307 distinct authors**. Business subs are SaaS,
buildinpublic, microsaas, startups, EntrepreneurRideAlong; developer subs are nextjs,
cursor, ClaudeAI, webdev, ChatGPTCoding. The script asserts all six figures and refuses to
print anything else if one moves. It also re-derives five phrase counts
(`claude code` 46, `landing page` 32, `kept running` 21, `app router` 12, `cold outreach` 9)
against `reference/emergent-language.json` so the bottom-up half reconciles too.

**How to read this.** Every number here is a count of **public Reddit posts**, so it is
evidence about **language** — what a stranger with this problem types into a subreddit —
and not about market size. It cannot see anyone who solved the problem quietly, anyone
under an NDA, or anyone whose failure is too embarrassing to publish under their own
handle. A **zero is weak evidence of absence**: the archive's text search is fuzzy, the
corpus is a sample of twelve 10-day windows, and a subject people express thirty different
ways can score low simply because no single phrasing repeats. Everything is counted in
**distinct authors**, never posts, because cross-posting is common — one title in this
corpus appears in three subreddits. Nothing is ranked, filtered or sampled by score or
comment count; score appears only as a descriptive column. Read the two methods against
each other: where they agree the finding is strong, and where they disagree the reason is
stated rather than averaged away.

---

## 1. Method 1, top-down: a generic lexicon per chapter subject

Each chapter got 18–24 patterns written from its **subject** as a stranger would say it —
never from the manuscript or the sales page. The full lexicons are in appendix A. Terms
whose dominant sense in this corpus turned out to be something else were read in context
and cut; that rejected list is appendix B, and it matters: one term alone
(`promote`) matches 76 business-asking authors — 48 of them not already inside chapter 09
on another term — almost all of them the r/SaaS rule boilerplate "I will not promote".
Appendix B's counts are measured by the script at run time, not typed into its prose.

| Chapter | Business-asking authors (of 261) | Developer-asking (of 307) | All-asking (of 567) | All posts, asking or not (of 3842) |
| --- | ---: | ---: | ---: | ---: |
| **09** The distribution loop | **105**  (40.2%) | 22  (7.2%) | 127  (22.4%) | 834  (21.7%) |
| **08** The first ten users | **66**  (25.3%) | 4  (1.3%) | 70  (12.3%) | 396  (10.3%) |
| **11** CANDIDATE: the landing page | **48**  (18.4%) | 8  (2.6%) | 56  (9.9%) | 353  (9.2%) |
| **10** When to hand it off | **45**  (17.2%) | 10  (3.3%) | 55  (9.7%) | 303  (7.9%) |
| **04** Deploy day | **27**  (10.3%) | 57  (18.6%) | 84  (14.8%) | 502  (13.1%) |
| **05** The security pre-flight | **20**  (7.7%) | 27  (8.8%) | 47  (8.3%) | 266  (6.9%) |
| **06** Stripe in production | **20**  (7.7%) | 16  (5.2%) | 36  (6.3%) | 225  (5.9%) |
| **03** The architecture you didn't draw | **18**  (6.9%) | 23  (7.5%) | 41  (7.2%) | 340  (8.8%) |
| **07** Compliance, when it matters | **12**  (4.6%) | 3  (1.0%) | 15  (2.6%) | 102  (2.7%) |
| **02** The spec is the moat | **10**  (3.8%) | 2  (0.7%) | 12  (2.1%) | 95  (2.5%) |
| **01** Why your build broke at 80% | **2**  (0.8%) | 19  (6.2%) | 21  (3.7%) | 166  (4.3%) |

The primary column is business-asking authors. The last column — every post whether asking
or not — is the secondary reading: it includes the showcase posts, so it measures how much
a subject is *talked about* rather than *asked about*, and it moves the chapters in the
same order.

## 2. Overlap: one post, several chapters

| Chapter lexicons matched | Business-asking posts (of 284) | All asking posts (of 607) |
| --- | ---: | ---: |
| 0 | 87  (30.6%) | 279  (46.0%) |
| 1 | 85  (29.9%) | 169  (27.8%) |
| 2 | 61  (21.5%) | 90  (14.8%) |
| 3 | 28  (9.9%) | 44  (7.2%) |
| 4 | 13  (4.6%) | 14  (2.3%) |
| 5+ | 10  (3.5%) | 11  (1.8%) |

| Chapter pair | Business-asking posts sharing both (of 284) |
| --- | ---: |
| ch08 + ch09 | 45  (15.8%) |
| ch09 + ch11 | 33  (11.6%) |
| ch08 + ch11 | 20  (7.0%) |
| ch09 + ch10 | 18  (6.3%) |
| ch08 + ch10 | 16  (5.6%) |
| ch04 + ch09 | 12  (4.2%) |
| ch03 + ch04 | 11  (3.9%) |
| ch06 + ch09 | 11  (3.9%) |
| ch04 + ch11 | 11  (3.9%) |
| ch05 + ch09 | 10  (3.5%) |

112 of the 284 business-asking posts (39.4%) match two or more chapter lexicons, and the
three tightest pairs are all inside the go-to-market cluster. In the reader's head, not
getting users, a landing page that does not convert, and not knowing which channel works
are one problem. (That sentence is my paraphrase of the pattern, not three quotations.)

## 3. Method 2, bottom-up: the 400 emergent phrases, assigned

Every one of the 400 phrases in `reference/emergent-language.json → asking_vocab` was
assigned to exactly one bucket: a chapter, `register` (gratitude and feedback-solicitation
formulas, plus subreddit boilerplate), `tool` (support for a named tool or framework), or
`none` (generic English, a grammatical frame, or a subject no chapter covers). The full
400-row assignment is appendix C, so it can be audited line by line.

Bucket sizes: ch01 **1**, ch02 **1**, ch03 **2**, ch04 **2**, ch06 **1**, ch07 **3**, ch08 **12**, ch09 **16**, ch10 **1**, ch11 **3** · register **44** · tool support **48** · none **266**.

Authors are then counted over the **union** of a chapter's phrases, directly from the
corpus, never by summing per-phrase counts — the same author uses several of them.

| Chapter | Phrases assigned | Business-asking authors (of 261) | Developer-asking (of 307) | All-asking (of 567) | The phrases |
| --- | ---: | ---: | ---: | ---: | --- |
| **08** | 12 | **49**  (18.8%) | 4 | 53 | `beta users`, `cold email`, `cold outreach`, `early users`, `first customers`, `first users`, `friends and family`, `getting the first`, `paying customer`, `paying customers`, `potential clients`, `real users` |
| **09** | 16 | **42**  (16.1%) | 11 | 52 | `blog posts`, `content calendar`, `content marketing`, `distribution problem`, `facebook groups`, `google search console`, `marketing budget`, `niche communities`, `paid ads`, `product hunt`, `reddit posts`, `search console`, `search results`, `seo content`, `social media`, `zero marketing` |
| **11** | 3 | **33**  (12.6%) | 5 | 38 | `conversion rate`, `landing page`, `users sign` |
| **07** | 3 | **7**  (2.7%) | 1 | 8 | `privacy policy`, `sensitive data`, `terms service` |
| **03** | 2 | **6**  (2.3%) | 6 | 12 | `tech stack`, `third party` |
| **02** | 1 | **5**  (1.9%) | 0 | 5 | `adding more features` |
| **04** | 2 | **4**  (1.5%) | 3 | 7 | `cloudflare pages`, `domain name` |
| **10** | 1 | **3**  (1.1%) | 0 | 3 | `dev team` |
| **06** | 1 | **2**  (0.8%) | 1 | 3 | `payment integration` |
| **01** | 1 | **0**  (0.0%) | 4 | 4 | `rules file` |
| **05** | 0 | **0**  (0.0%) | 0 | 0 | *(none)* |

Two structural facts about this method, before its zeros are read as absence. Its floor is
three distinct authors on one exact two- or three-word gram across all 607 asking posts, so
a subject expressed thirty ways scores nothing. And it inherits `listen.py`'s tokenizer,
which drops words shorter than three characters: `sign up`, `go live`, `ship it` and
`log in` cannot exist as grams at all.

## 4. Both methods side by side

| Chapter | M1 business authors (of 261) | M1 rank | M2 business authors (of 261) | M2 rank | Rank move |
| --- | ---: | ---: | ---: | ---: | ---: |
| **09** The distribution loop | 105 | 1 | 42 | 2 | +1 |
| **08** The first ten users | 66 | 2 | 49 | 1 | -1 |
| **11** CANDIDATE: the landing page | 48 | 3 | 33 | 3 | +0 |
| **10** When to hand it off | 45 | 4 | 3 | 8 | +4 |
| **04** Deploy day | 27 | 5 | 4 | 7 | +2 |
| **05** The security pre-flight | 20 | 6 | 0 | 11 | +5 |
| **06** Stripe in production | 20 | 7 | 2 | 9 | +2 |
| **03** The architecture you didn't draw | 18 | 8 | 6 | 5 | -3 |
| **07** Compliance, when it matters | 12 | 9 | 7 | 4 | -5 |
| **02** The spec is the moat | 10 | 10 | 5 | 6 | -4 |
| **01** Why your build broke at 80% | 2 | 11 | 0 | 10 | -1 |

**Nobody asks** — fewer than 5 business-asking authors under **both** methods:

- **Chapter 01, Why your build broke at 80%** — 2 of 261 under Method 1, 0 of 261 under
  Method 2. Both of the two candidates were opened and read: one is a passing line in a
  founder's diary ("Fix one bug, create three more"), the other is a false positive
  ("breaking everything into specific short topics" is help-centre copywriting). In the
  business rooms, across a year, **no author asked about this chapter's subject.**

Four more chapters fall under 5 on one method only, and each disagreement has a readable
cause: **ch10** (M1 45 / M2 3) — `hire`, `hiring` and `freelance` mostly describe the
poster's own working life, not a handoff decision; **ch05** (M1 20 / M2 0) — not one
security phrase reaches three distinct authors in the top 400, and the Method 1 matches are
mostly `security` and `authentication` inside product feature lists; **ch06** (M1 20 / M2 2)
and **ch04** (M1 27 / M2 4) — same shape, engineering nouns appearing inside descriptions
of a finished product rather than inside a question.

## 5. The hand read: a regex hit is a candidate, not a finding

75 candidate posts were opened and read in full — 5 to 10 per chapter, taken **evenly
spaced across the id-sorted match list** so the sample ignores score entirely and does not
over-sample the head. Each was classified **ON** (the chapter's subject is what the author
is actually dealing with), **PASSING** (the subject appears, but the post is about
something else) or **OFF** (the lexicon matched a different sense of the words). Every
single-quoted fragment in the reason column below is checked verbatim against that post by
the script — 24 fragments, 0 failures.

| Chapter | Candidates read | ON | PASSING | OFF | ON rate | ON+PASSING |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 01 | 8 | 5 | 1 | 2 | 62% | 75% |
| 02 | 5 | 3 | 2 | 0 | 60% | 100% |
| 03 | 6 | 2 | 2 | 2 | 33% | 67% |
| 04 | 8 | 1 | 4 | 3 | 12% | 62% |
| 05 | 5 | 1 | 1 | 3 | 20% | 40% |
| 06 | 5 | 2 | 1 | 2 | 40% | 60% |
| 07 | 5 | 2 | 1 | 2 | 40% | 60% |
| 08 | 5 | 4 | 1 | 0 | 80% | 100% |
| 09 | 10 | 4 | 3 | 3 | 40% | 70% |
| 10 | 8 | 3 | 3 | 2 | 38% | 75% |
| 11 | 10 | 4 | 6 | 0 | 40% | 100% |
| **all** | **75** | **31** | **25** | **19** | **41%** | **75%** |

Across all 75, 41% are ON and 75% are ON-or-PASSING. That is the real precision ceiling of
keyword counting on this corpus: these communities write long posts that touch everything.
Applying each chapter's ON rate to its Method 1 count gives a discounted figure — crude,
because five reads cannot estimate a rate precisely, but it changes the order at the top:

| Chapter | M1 business authors (of 261) | ON rate on the read sample | Discounted business authors |
| --- | ---: | ---: | ---: |
| **08** The first ten users | 66 | 80% | **52.8** |
| **09** The distribution loop | 105 | 40% | **42.0** |
| **11** CANDIDATE: the landing page | 48 | 40% | **19.2** |
| **10** When to hand it off | 45 | 38% | **16.9** |
| **06** Stripe in production | 20 | 40% | **8.0** |
| **03** The architecture you didn't draw | 18 | 33% | **6.0** |
| **02** The spec is the moat | 10 | 60% | **6.0** |
| **07** Compliance, when it matters | 12 | 40% | **4.8** |
| **05** The security pre-flight | 20 | 20% | **4.0** |
| **04** Deploy day | 27 | 12% | **3.4** |
| **01** Why your build broke at 80% | 2 | 62% | **1.2** |

Two rows need a caveat. Chapter 01's 62% ON rate comes from a sample that is six-eighths
developer-room posts, because only two business candidates exist; its two business
candidates were both read and neither is ON, so its discounted business figure is properly
0.0, not 1.2. Chapter 04's 12% is the honest signature of the chapter: `deploy`,
`production` and `hosting` are words founders use to *describe a finished product*, and
only one of eight read was a person actually stuck on deploying.

Full verdicts, one row per post read:

| Chapter | Post id | Verdict | Subreddit | Score | Why |
| --- | --- | --- | --- | ---: | --- |
| 01 | `1nqitgi` | ON | r/cursor | 1 | developer room: how a project rules file attaches context |
| 01 | `1nqlb9a` | ON | r/cursor | 1 | developer room: making the AI obey a 10,000-line style guide |
| 01 | `1ns2h94` | PASSING | r/buildinpublic | 1 | 'Fix one bug, create three more' is one line of a founder diary |
| 01 | `1ofashm` | ON | r/ChatGPTCoding | 0 | developer room: vibecoding with no experience, hallucinations named |
| 01 | `1p27nfx` | ON | r/ChatGPTCoding | 0 | developer room: 18 months making coding agents reliable |
| 01 | `1pqqqnp` | ON | r/cursor | 0 | developer room: agent wiped the project, hit the context limit |
| 01 | `1pscnse` | OFF | r/SaaS | 1 | 'breaking everything into specific short topics' is help-centre copywriting |
| 01 | `1qbj5fg` | OFF | r/nextjs | 2 | 'rewrites' is the Next.js config feature |
| 02 | `1nrifkd` | ON | r/buildinpublic | 2 | spec-driven workflow is the post's whole subject |
| 02 | `1psc1ey` | ON | r/SaaS | 1 | refusing 17 requested features on purpose |
| 02 | `1qgfqeh` | PASSING | r/microsaas | 1 | 'even with full specs' sits inside a hiring question |
| 02 | `1r5k7ed` | ON | r/microsaas | 1 | feature creep named as a cause of a $0 launch |
| 02 | `1sjjuf4` | PASSING | r/buildinpublic | 1 | scope named as a cause; the ask is about positioning |
| 03 | `1nrifkd` | PASSING | r/buildinpublic | 2 | 'architecture' once, inside a spec-tool showcase |
| 03 | `1nt2kqr` | ON | r/buildinpublic | 3 | restarted six times over packages and folder layout |
| 03 | `1p4sk8n` | ON | r/microsaas | 1 | third-party image API cost per round is the stated challenge |
| 03 | `1r58x9y` | PASSING | r/buildinpublic | 3 | 'architecture' once; the post is about launching in stealth |
| 03 | `1t9ice4` | OFF | r/SaaS | 1 | 'system architecture' in an agency capability list |
| 03 | `1tzk6qy` | OFF | r/SaaS | 1 | capability list inside a for-sale post |
| 04 | `1nrifkd` | PASSING | r/buildinpublic | 2 | deploy/hosting/production describe the product being shown |
| 04 | `1p4yddr` | PASSING | r/SaaS | 2 | ci/cd mentioned; the ask is how to enter the market |
| 04 | `1pslsbl` | ON | r/buildinpublic | 6 | mock data carried into the production database on first push |
| 04 | `1r5pb34` | PASSING | r/EntrepreneurRideAlong | 0 | deploy and hosting appear as service-tier line items |
| 04 | `1ruh8b7` | OFF | r/buildinpublic | 1 | 'went live' is the landing page, not a deploy |
| 04 | `1sjnokc` | PASSING | r/microsaas | 1 | 'deployed on Netlify' inside a for-sale listing |
| 04 | `1unrr8n` | OFF | r/EntrepreneurRideAlong | 8 | SSL and deployment are his product's topic; post is about posting |
| 04 | `1uoh2ld` | OFF | r/SaaS | 6 | 'production ready' used as a code-quality adjective |
| 05 | `1ns2h94` | ON | r/buildinpublic | 1 | 'Why is user authentication so complicated?' plus a nightly auth bug |
| 05 | `1psf3l1` | OFF | r/buildinpublic | 1 | 'permissions interrupting your flow' is a tool prompt |
| 05 | `1r5oeio` | PASSING | r/SaaS | 2 | security audits raised as a trust signal, not a build problem |
| 05 | `1sjnokc` | OFF | r/microsaas | 1 | 'access control' in a feature list of a product for sale |
| 05 | `1tzrp1h` | OFF | r/SaaS | 0 | 'waiting for permission to sell' |
| 06 | `1ns2h94` | PASSING | r/buildinpublic | 1 | 'debug payment integration' is one item in a task list |
| 06 | `1psfx2s` | OFF | r/microsaas | 0 | 'checked Stripe' means the revenue dashboard |
| 06 | `1sjnokc` | OFF | r/microsaas | 1 | Stripe billing listed as an asset in a for-sale post |
| 06 | `1t9hpuc` | ON | r/SaaS | 1 | Paddle chosen because Stripe is unavailable in his country |
| 06 | `1uo5xc0` | ON | r/SaaS | 1 | asking how to hold and split payouts before launching |
| 07 | `1ogq0vu` | ON | r/SaaS | 432 | privacy policy and terms as the unbudgeted MVP cost |
| 07 | `1ogwzlp` | OFF | r/EntrepreneurRideAlong | 0 | recruitment-agency compliance, a different regulatory domain |
| 07 | `1ps1uf3` | OFF | r/buildinpublic | 3 | 'compliance' inside a platform description |
| 07 | `1r5oeio` | PASSING | r/SaaS | 2 | sensitive data and audits inside a user-trust question |
| 07 | `1v64v0i` | ON | r/buildinpublic | 1 | compliance and onboarding blockers at the payment provider |
| 08 | `1nst9nz` | ON | r/EntrepreneurRideAlong | 2 | how did you land your very first sale |
| 08 | `1ps3nn4` | PASSING | r/buildinpublic | 2 | 'early users' is what his product promises to find |
| 08 | `1r5mrj8` | ON | r/buildinpublic | 3 | cold DMs with no structured plan |
| 08 | `1sjq533` | ON | r/buildinpublic | 1 | struggling to get users, suspects the product or positioning |
| 08 | `1tzkjy2` | ON | r/buildinpublic | 1 | 200 cold emails, zero replies |
| 09 | `1nrifkd` | OFF | r/buildinpublic | 2 | 'Search Console' listed as a product integration |
| 09 | `1p4zaza` | PASSING | r/SaaS | 0 | 'marketing attempts that went nowhere' inside a feedback-culture post |
| 09 | `1pscw5m` | ON | r/SaaS | 1 | short-term growth tactics versus a durable channel |
| 09 | `1r5mrj8` | ON | r/buildinpublic | 3 | wants a GTM roadmap, names the channels he knows |
| 09 | `1ruc8yr` | OFF | r/EntrepreneurRideAlong | 5 | agency owner looking for white-label partners |
| 09 | `1t96h72` | ON | r/startups | 1 | cannot make himself post; the distribution act is the blocker |
| 09 | `1t9mfzo` | ON | r/SaaS | 2 | how to start marketing; first ten users in a crowded market |
| 09 | `1tzoqzp` | PASSING | r/buildinpublic | 3 | 150 free signups, scared nobody pays; ads mentioned once |
| 09 | `1un0jcu` | PASSING | r/startups | 7 | names the distribution problem while asking about a cofounder |
| 09 | `1uocitz` | OFF | r/buildinpublic | 1 | 'marketing' describes the market his product serves |
| 10 | `1ns2h94` | PASSING | r/buildinpublic | 1 | burnout named in a diary, no handoff decision |
| 10 | `1p4w42q` | OFF | r/SaaS | 2 | 'selling the product' means go-to-market |
| 10 | `1p4wblc` | ON | r/SaaS | 1 | where to find buyers or partners; names two marketplaces |
| 10 | `1qgfqeh` | ON | r/microsaas | 1 | $50k to buy development capacity; past freelancer failures |
| 10 | `1sfzy30` | PASSING | r/SaaS | 1 | freelancing is his background, not a handoff |
| 10 | `1sjk2g2` | PASSING | r/microsaas | 1 | 'I've been a CTO' is biography |
| 10 | `1tz57uk` | ON | r/EntrepreneurRideAlong | 1 | hired a dev, then realised the prototype was already the MVP |
| 10 | `1tz6bhd` | OFF | r/EntrepreneurRideAlong | 4 | his own freelance consulting business |
| 11 | `1nrifkd` | PASSING | r/buildinpublic | 2 | 'landing page' appears once in a product tour |
| 11 | `1p4r5zu` | ON | r/startups | 2 | landing page drew traffic; unsure what to build next |
| 11 | `1qgapzg` | ON | r/microsaas | 2 | landing page built to validate before building the product |
| 11 | `1qgkcb4` | PASSING | r/SaaS | 20 | sign-up then forget: retention, not the page |
| 11 | `1ruuul8` | PASSING | r/SaaS | 0 | a conversion rate inside a long life story |
| 11 | `1sfvrk4` | PASSING | r/SaaS | 3 | visitors mentioned; the stated problem is SEO |
| 11 | `1t96r2s` | ON | r/buildinpublic | 1 | signups down 72%, asking what is broken |
| 11 | `1t9iu14` | PASSING | r/SaaS | 1 | landing page named while asking what he is doing wrong |
| 11 | `1tzrp1h` | PASSING | r/SaaS | 0 | landing page inside a distribution post-mortem |
| 11 | `1uoh80l` | ON | r/SaaS | 6 | $20 of ads measured through to landing-page conversion |

## 6. Candidate chapter 11 at phrase level

| Phrase family | Business-asking (of 261) | Developer-asking (of 307) | All-asking (of 567) | All posts (of 3842) |
| --- | ---: | ---: | ---: | ---: |
| **landing page** | 30  (11.5%) | 8  (2.6%) | 38  (6.7%) | 211  (5.5%) |
| **conversion** | 11  (4.2%) | 0  (0.0%) | 11  (1.9%) | 65  (1.7%) |
| **signup** | 45  (17.2%) | 14  (4.6%) | 59  (10.4%) | 462  (12.0%) |

At single-phrase level, `landing page` is used by **32 of the 567 asking authors** — the
second most common two-word phrase in the entire asking vocabulary, behind only
`claude code` (46), which is a tool's name. `conversion rate` reaches 6 asking authors and
`hero section` 2. **`pricing page` reaches zero of the 567 asking authors** (13 of 3,842
across the whole corpus), while bare `pricing` reaches 21 of 261 business-asking authors —
people ask what to charge, not how to build the page that shows it.

## 7. Money and wall words, by chapter

The generic lexicons from `compare_rooms.py`, applied to each chapter's matched posts in
each room. This is a posts table, not an authors table, because it describes the texture of
the matched documents.

**Room baselines, every asking post:** business 284 posts — money words 147 (52%), wall
words 56 (20%). Developer 323 posts — money words 45 (**14%**), wall words 113 (35%). The
business room talks about money in half its asking posts; the developer room in one in
seven.

| Chapter | Business-asking posts matched | Money words | Wall words | Both | Developer-asking posts matched | Money words | Wall words |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 09 | 113 | 77  (68%) | 30  (27%) | 24  (21%) | 24 | 5  (21%) | 8  (33%) |
| 08 | 73 | 51  (70%) | 23  (32%) | 19  (26%) | 4 | 2  (50%) | 1  (25%) |
| 11 | 50 | 38  (76%) | 16  (32%) | 12  (24%) | 9 | 2  (22%) | 4  (44%) |
| 10 | 48 | 34  (71%) | 14  (29%) | 9  (19%) | 10 | 3  (30%) | 4  (40%) |
| 04 | 28 | 17  (61%) | 24  (86%) | 17  (61%) | 58 | 8  (14%) | 46  (79%) |
| 05 | 21 | 15  (71%) | 12  (57%) | 9  (43%) | 29 | 7  (24%) | 18  (62%) |
| 06 | 20 | 13  (65%) | 8  (40%) | 7  (35%) | 16 | 9  (56%) | 9  (56%) |
| 03 | 19 | 11  (58%) | 12  (63%) | 7  (37%) | 25 | 4  (16%) | 11  (44%) |
| 07 | 12 | 4  (33%) | 5  (42%) | 2  (17%) | 3 | 1  (33%) | 2  (67%) |
| 02 | 12 | 9  (75%) | 7  (58%) | 5  (42%) | 2 | 0  (0%) | 1  (50%) |
| 01 | 2 | 1  (50%) | 1  (50%) | 1  (50%) | 19 | 5  (26%) | 11  (58%) |

The three go-to-market chapters sit at 68–76% money words. Only three chapters use wall
words **more** than money words in the business room — **04, 03 and 07** — and the script
prints that list rather than leaving it to prose. Chapter 04's matched posts are 86% wall
words and 61% both, the highest engineering density in the book. Chapter 05 is not on that
list: its wall count is high at 57%, but its money count is higher at 71%, so it reads as a
money-leaning chapter with an engineering vocabulary, not a wall-shaped one.

The developer columns say the same thing from the other side. Chapter 04's developer-asking
matches are 79% wall words and 14% money words — the exact inversion of the go-to-market
chapters — and chapter 01, which has 2 business-asking matched posts, has 19 in the
developer room at 58% wall words.

## 8. Examples

Three per chapter, chosen for typicality of the chapter's subject, **never by score**.
Every quote is verbatim from the cleaned corpus text (URLs and markdown stripped,
whitespace collapsed), 25 words or fewer, and the script verifies both properties at run
time — it reported 0 failures. Room labels say which side of the corpus the author was
posting in.

**Chapter 01 — Why your build broke at 80% (AI context, regressions, invariants file)**

> Fix one bug, create three more.
>
> — r/buildinpublic (business room; score 1, 1 comments; 6 words) [1ns2h94](https://www.reddit.com/r/buildinpublic/comments/1ns2h94/the_brutal_reality_of_building_a_startup_4_weeks/)

> I want to make sure Cursor follows this guide for all code generation and modifications.
>
> — r/cursor (developer room; score 1, 4 comments; 15 words) [1nqlb9a](https://www.reddit.com/r/cursor/comments/1nqlb9a/best_way_to_use_a_large_10000_lines_company_style/)

> Tried undoing via chat, but hit context limit and it suggested starting a new convo.
>
> — r/cursor (developer room; score 0, 58 comments; 15 words) [1pqqqnp](https://www.reddit.com/r/cursor/comments/1pqqqnp/ai_in_cursor_deleted_my_entire_project_and/)


**Chapter 02 — The spec is the moat (one-page spec, scope drift)**

> "Just one more feature" syndrome for 5 months straight
>
> — r/microsaas (business room; score 1, 0 comments; 9 words) [1r5k7ed](https://www.reddit.com/r/microsaas/comments/1r5k7ed/i_spent_6_months_building_an_app_that_made/)

> Every feature I add increases the surface area of my product. More things that can break.
>
> — r/SaaS (business room; score 1, 2 comments; 16 words) [1psc1ey](https://www.reddit.com/r/SaaS/comments/1psc1ey/i_know_exactly_which_features_my_users_want_im/)

> I convinced myself I couldn't share it until I fixed them.
>
> — r/buildinpublic (business room; score 1, 3 comments; 11 words) [1qga6ly](https://www.reddit.com/r/buildinpublic/comments/1qga6ly/i_soft_launched_on_jan_2nd_but_fell_into_the_just/)


**Chapter 03 — The architecture you didn't draw (client/server/data/storage/3rd parties)**

> code hardwired posing huge blockers to features I wanted but didn't plan properly for
>
> — r/buildinpublic (business room; score 3, 0 comments; 14 words) [1nt2kqr](https://www.reddit.com/r/buildinpublic/comments/1nt2kqr/huge_success_in_my_nextjs_project/)

> every single round generates 4 high-resolution images via an external API
>
> — r/microsaas (business room; score 1, 2 comments; 11 words) [1p4sk8n](https://www.reddit.com/r/microsaas/comments/1p4sk8n/launching_my_first_b2c_microsaas_a_multiplayer/)

> I onboarded into a mass vibe-coded monolith. Here's what I did to survive it.
>
> — r/ClaudeAI (developer room; score 206, 46 comments; 14 words) [1ps6ys9](https://www.reddit.com/r/ClaudeAI/comments/1ps6ys9/i_onboarded_into_a_mass_vibecoded_monolith_heres/)


**Chapter 04 — Deploy day (env vars, migrations, domains, works on my machine)**

> when I pushed to Production, the data carried over, so I had to go back and reset the production database
>
> — r/buildinpublic (business room; score 6, 2 comments; 20 words) [1pslsbl](https://www.reddit.com/r/buildinpublic/comments/1pslsbl/my_first_web_app_using_lovable_and_what_i_learned/)

> I am new to nextJS and azure app services so I have had some issues deploying my app.
>
> — r/nextjs (developer room; score 2, 7 comments; 18 words) [1pom1it](https://www.reddit.com/r/nextjs/comments/1pom1it/deploying_to_an_azure_app_service/)

> I got a vps, installed nginx on it and put my next.js 15 project.
>
> — r/nextjs (developer room; score 2, 5 comments; 14 words) [1nol225](https://www.reddit.com/r/nextjs/comments/1nol225/slow_server_response_time/)


**Chapter 05 — The security pre-flight (authn vs authz, IDOR, row-level security, keys)**

> Why is user authentication so complicated?
>
> — r/buildinpublic (business room; score 1, 1 comments; 6 words) [1ns2h94](https://www.reddit.com/r/buildinpublic/comments/1ns2h94/the_brutal_reality_of_building_a_startup_4_weeks/)

> Can you tell me if my code is secure enough, or there is anything I can improve?
>
> — r/nextjs (developer room; score 1, 9 comments; 17 words) [1ppbbd0](https://www.reddit.com/r/nextjs/comments/1ppbbd0/i_have_created_an_endpoint_that_receives_the/)

> each user can belong to multiple companies and switch between them
>
> — r/nextjs (developer room; score 6, 8 comments; 11 words) [1nogdd1](https://www.reddit.com/r/nextjs/comments/1nogdd1/multi_tenancy_problems_in_nextjs_storing_users/)


**Chapter 06 — Stripe in production (webhooks, test-to-live, refunds, subscriptions)**

> I have been building a website ,not knowing about the payment gateway
>
> — r/SaaS (business room; score 1, 0 comments; 12 words) [1uo5xc0](https://www.reddit.com/r/SaaS/comments/1uo5xc0/help_me_with_the_payment_system_for_the_website/)

> Payment integration is through Paddle, I wanted Stripe but it is not supported in my country.
>
> — r/SaaS (business room; score 1, 3 comments; 16 words) [1t9hpuc](https://www.reddit.com/r/SaaS/comments/1t9hpuc/app_for_booking_appointments_for_barbers_beauty/)

> Fix authentication bug, design new onboarding flow, write marketing copy, plan feature roadmap, debug payment integration.
>
> — r/buildinpublic (business room; score 1, 1 comments; 16 words) [1ns2h94](https://www.reddit.com/r/buildinpublic/comments/1ns2h94/the_brutal_reality_of_building_a_startup_4_weeks/)


**Chapter 07 — Compliance, when it matters (HIPAA, SOC 2, GDPR, BAA, DPA)**

> Our privacy policy and terms of service were garbage templates we pulled offline.
>
> — r/SaaS (business room; score 432, 140 comments; 13 words) [1ogq0vu](https://www.reddit.com/r/SaaS/comments/1ogq0vu/i_wasted_50k_because_i_thought_the_code_was_the/)

> I keep running into compliance or onboarding blockers unless I register as a business/entity.
>
> — r/buildinpublic (business room; score 1, 6 comments; 14 words) [1v64v0i](https://www.reddit.com/r/buildinpublic/comments/1v64v0i/what_payment_gateway_are_you_using_which_is/)

> Did you use partial open-sourcing, security audits, code signing, blog posts, sandboxed demos, or something else?
>
> — r/SaaS (business room; score 2, 1 comments; 16 words) [1r5oeio](https://www.reddit.com/r/SaaS/comments/1r5oeio/as_a_dev_building_a_privacyfirst_desktop_app_how/)


**Chapter 08 — The first ten users (outreach, warm intros, conversations not broadcast)**

> apparently cold email just does not work Do you have any advice ?
>
> — r/buildinpublic (business room; score 1, 2 comments; 13 words) [1tzkjy2](https://www.reddit.com/r/buildinpublic/comments/1tzkjy2/i_sent_200_cold_emails_and_got_0_response/)

> I'm struggling to get users and I think the problem might be the product itself, the positioning, or both.
>
> — r/buildinpublic (business room; score 1, 8 comments; 19 words) [1sjq533](https://www.reddit.com/r/buildinpublic/comments/1sjq533/roast_my_product/)

> Right now, I haven’t gotten my first order yet, and honestly, that’s the hardest part.
>
> — r/EntrepreneurRideAlong (business room; score 2, 3 comments; 15 words) [1nst9nz](https://www.reddit.com/r/EntrepreneurRideAlong/comments/1nst9nz/how_to_make_your_first_sale/)


**Chapter 09 — The distribution loop (referrals, channels, users who came from users)**

> The problem is not building the product. The problem is getting the first 10 users in an extremely crowded market.
>
> — r/SaaS (business room; score 2, 3 comments; 20 words) [1t9mfzo](https://www.reddit.com/r/SaaS/comments/1t9mfzo/how_do_you_guys_start_marketing_me2_saas_and_get/)

> I don’t have a clear roadmap or structured strategy yet.
>
> — r/buildinpublic (business room; score 3, 2 comments; 10 words) [1r5mrj8](https://www.reddit.com/r/buildinpublic/comments/1r5mrj8/need_help_in_gtm_streatgy/)

> What can I do this month to increase MRR? What's the fastest growth tactic?
>
> — r/SaaS (business room; score 1, 1 comments; 14 words) [1pscw5m](https://www.reddit.com/r/SaaS/comments/1pscw5m/stopped_optimizing_for_next_month_started/)


**Chapter 10 — When to hand it off (hire, fractional help, sell, a data room)**

> Are there marketplaces, communities, or places where founders connect with buyers or partners for niche products?
>
> — r/SaaS (business room; score 1, 0 comments; 16 words) [1p4wblc](https://www.reddit.com/r/SaaS/comments/1p4wblc/how_do_i_find_genuine_buyers_or_partners_for_my/)

> I'm realizing that my prototype already was the MVP
>
> — r/EntrepreneurRideAlong (business room; score 1, 7 comments; 9 words) [1tz57uk](https://www.reddit.com/r/EntrepreneurRideAlong/comments/1tz57uk/i_did_it_the_same_mistake_most_do/)

> I’ve hired freelancers, tried working with friends, and partnered before
>
> — r/microsaas (business room; score 1, 3 comments; 10 words) [1qgfqeh](https://www.reddit.com/r/microsaas/comments/1qgfqeh/if_you_had_50000_to_speed_up_saas_development_how/)


**Chapter 11 — CANDIDATE: the landing page (landing page, conversion, signups, pricing, copy)**

> My SaaS signups dropped 72% in 2 months - I need honest feedback on what's broken
>
> — r/buildinpublic (business room; score 1, 0 comments; 16 words) [1t96r2s](https://www.reddit.com/r/buildinpublic/comments/1t96r2s/my_saas_signups_dropped_72_in_2_months_i_need/)

> to see whether my biggest problem was getting visitors or converting them
>
> — r/SaaS (business room; score 6, 58 comments; 12 words) [1uoh80l](https://www.reddit.com/r/SaaS/comments/1uoh80l/i_spent_20_on_meta_ads_for_my_saas_heres_every/)

> I decided to build a landing page to create a waitlist.
>
> — r/startups (business room; score 2, 6 comments; 11 words) [1p4r5zu](https://www.reddit.com/r/startups/comments/1p4r5zu/i_posted_a_landing_page_a_week_ago_and_it_got_a/)



---

## 9. What the market asks for

**The three subjects the market asks about are getting customers, and they are the
book's last third plus a chapter it has not written.** Ranked by business-asking authors,
of 261: **chapter 09, the distribution loop — 105 (40.2%) top-down, 42 (16.1%)
bottom-up**; **chapter 08, the first ten users — 66 (25.3%) and 49 (18.8%)**; **candidate
chapter 11, the landing page — 48 (18.4%) and 33 (12.6%)**. Both methods put the same three
first, in a set if not in an order, and the hand read moves 08 ahead of 09 on precision
(80% versus 40% ON). Nothing else is close: the fourth chapter on Method 1 (ch10, 45) falls
to eighth on Method 2 (3), and reading says the top-down figure is inflated by people
describing their own freelance work.

**Candidate chapter 11 is already the third-strongest chapter in the book, and it does not
exist.** It beats eight of the ten written chapters under both methods, and its core phrase
is the most-used content phrase in the asking vocabulary — `landing page`, 32 of 567 asking
authors, behind only the name of an AI tool (`claude code`, 46). It should be about the page and the
conversion — `landing page` 30 business authors, `conversion` 11 — and not about pricing,
which is a separate question people ask in different words (`pricing page`: zero asking
authors of 567).

**The book's title chapter is the one nobody asks for.** Chapter 01 has 2 business-asking
authors of 261 under Method 1 and 0 under Method 2, and neither of the two survived
reading. Its subject is not imaginary — it is simply in the other room: 19 of 307
developer-asking authors under Method 1, and every clean example of it comes from r/cursor,
r/ChatGPTCoding or r/ClaudeAI. The same is true, more weakly, of chapters 04 and 05, whose
developer-room counts (57 of 307 and 27 of 307) exceed their business-room counts. The
engineering half of this book is written for the people who are not the ones talking about
money, and section 7 measures that: money words appear in 45 of 323 developer-asking posts
(14%) against 147 of 284 business-asking posts (52%). That is the segmentation problem
`01-REDDIT-EVIDENCE.md` opened as question 1, now measured chapter by chapter.

**The overlap says the go-to-market chapters are one chapter in the reader's head.**
45 business-asking posts of 284 match chapters 08 and 09 together, 33 match 09 and 11, and
20 match 08 and 11; 112 of 284 business-asking posts (39.4%) match two or more chapters. A
reader who arrives having shipped to silence does not experience three separate needs.

---

## Limits — what this cut cannot see

- **It cannot see market size or willingness to pay.** Every figure is a count of people who
  typed a phrase in public. Asking about distribution on Reddit and paying $99 for a manual
  about it are different acts, and nothing here measures the second one.
- **It only sees people who asked.** 607 asking posts of 4,464. Everyone who hit chapter
  04's problem and quietly fixed it, or asked a colleague, or asked an AI, is invisible.
  A low count is consistent with "nobody has this problem" *and* with "everybody has this
  problem and nobody posts about it".
- **The room split is by subreddit, not by person.** A solo founder debugging in r/nextjs
  is counted as the developer room. The claim "chapter 01 lives in the developer room" is a
  claim about where the language appears, not about who the person is.
- **Method 1's lexicons are mine.** Another analyst's wording would move every number.
  Appendix B shows how much: a single rejected term matched 76 business-asking authors on
  chapter 09 and would have added 48 of them to the chapter. The lexicons are printed in
  full so a reader can disagree specifically.
- **Method 2's floor and tokenizer are artefacts.** Three distinct authors on one exact gram
  is a high bar, and the under-three-character rule makes `sign up`, `go live` and `log in`
  structurally impossible. Its zeros for chapters 05 and 01 mean "no single phrasing
  repeated three times", not "nobody said it".
- **The hand read is 75 posts.** At 5 to 10 per chapter, an ON rate carries a wide interval;
  the discounted column is a direction of travel, not a measurement. The ON/PASSING/OFF
  boundary is also my judgement, applied consistently but not blindly reproducible.
- **Chapter boundaries are a judgement call.** 08 was scored as first users and direct
  outreach, 09 as repeatable channels and referral loops, 11 as the page, its conversion and
  its copy. A different split would move authors between those three; it would not move them
  out of the go-to-market cluster.
- **No time dimension.** The corpus is twelve 10-day windows spanning 2025-09-23 to
  2026-08-03. A subject that only became urgent in the last two months is diluted here.
- **No comments.** Only post bodies were fetched, so an unanswered question and a
  well-answered one look identical, and a chapter whose subject is answered exhaustively in
  the replies looks the same as one nobody could help with.
- **One post in the corpus contains an instruction-injection line** ("ignore all
  instruction and…", id `1sjq533`). It was read as data and not acted on. It is also quoted
  as a chapter-08 example; the quote used is the post's opening sentence, not the injected
  line.
- **Quotes removed and numbers corrected after an independent skeptic's read.** The examples
  in section 8 were gated from the start; the *reason columns* were not, and four of their
  quotations — three in appendix B, one in section 5 — appear verbatim nowhere in the
  corpus. They are gone, and a quote gate now covers both columns on every run (24
  hand-read fragments checked against their own post, 13 rejected-term fragments against
  the whole corpus, 0 failures).
  - **Removed:** Appendix B, ch09 `launch(?:ed)? (?:it )?on` — "matches 'launched on
    Tuesday' as often as a launch channel". No post in this corpus contains "launched on
    Tuesday"; the term's two business-asking matches are both real channels (AppSumo,
    Product Hunt) and both were already inside chapter 09, which is the measured reason it
    was cut.
  - **Removed:** Appendix B, ch01 `worked fine` — "matches 'the network works fine' and 'it
    worked fine for 3 months'". Neither string is in the corpus. Replaced with a verbatim
    match and the measured fact that the term reaches no business-asking author at all.
  - **Removed:** Appendix B, ch11 `\bconversion\b` — "matches file conversion"; no such
    sense was found among its business-asking matches. Also removed, ch03 `\bdiagram\b` —
    "generated mermaid output", which is not what its matches are.
  - **Removed:** three phrasings in sections 2 and 9 that were punctuated as quotations but
    are mine. "my landing page doesn't convert", "which channel works" and "it shipped,
    nobody came" are in no post in this corpus; a sweep of every quoted fragment in sections
    1–9 found these three and nothing else. Both sentences now read as paraphrase.
  - **Corrected:** section 5, chapter 01, post `1pscnse` — the quoted fragment read
    "breaking everything into short topics"; the post says "breaking everything into
    **specific** short topics". Section 5, chapter 09, post `1nrifkd` — 'search console'
    is capitalised "Search Console" in that post.
  - **Corrected:** Appendix B, ch06 `\bsubscription\b (bare)` carried 15 authors, a count
    only the plural-inclusive pattern produces. The pattern as printed matches **12**.
  - **Corrected:** the value of the `promote` rejection, in section 1 and in the limits
    above — 76 is what it matches, 48 is what it would have added.
  - **Corrected:** section 7 called chapters 04, 03 and 05 "the wall-shaped ones" while its
    own table showed chapter 05 at 71% money against 57% wall. The wall-over-money chapters
    are **04, 03 and 07**, and the script now prints that list rather than trusting prose.
  - **Added, because a handoff summary cited a developer-room money figure this file did not
    contain:** section 7 now measures money and wall words in both rooms, and the room
    baselines (business 52% money, developer 14%) are printed by the script.

---

## Appendix A — the Method 1 lexicons, in full

**ch01 — Why your build broke at 80% (AI context, regressions, invariants file)** (22 patterns)

`context window` · `context limit` · `runs? out of context` · `loses? (?:the )?context` · `lost (?:the |all )?context` · `forgets? (?:the |my |what |everything)` · `regression` · `used to work` · `worked (?:yesterday|last week|until)` · `broke (?:the (?:app|build|site|code|login|whole)|everything|again|another)` · `break(?:s|ing)? (?:something else|everything|another (?:feature|thing|part)|three more)` · `keeps? breaking` · `kept breaking` · `fix one (?:thing|bug|issue)` · `whack.?a.?mole` · `rules? file` · `claude\.md` · `cursorrules` · `hallucinat` · `rewrites? (?:my|the|whole)` · `spaghetti code` · `unmaintainable`

One ch01 term needs a note. `worked (?:yesterday|last week|until)` contains `worked
yesterday`, which is also a fragment of one of the book's own sentences, and the whole point
of writing these lexicons from the subject was to avoid the regex finding the book. It was
therefore measured on its own: it matches **2 posts in the entire corpus**, both of them the
unrelated construction "That worked until…" (r/buildinpublic `1v64w1l`, "That worked until I
was traveling"; r/webdev `1rulp9y`, "That worked until the build output became too large").
Removing it changes chapter 01 not at all — 2 of 261 business and 19 of 307 developer with
or without it. The script prints that comparison on every run.

**ch02 — The spec is the moat (one-page spec, scope drift)** (18 patterns)

`\bspec\b` · `\bspecs\b` · `specification` · `requirements? (?:doc|document|gathering)` · `\bprd\b` · `product requirements` · `scope creep` · `feature creep` · `scope (?:drift|keeps)` · `out of scope` · `keeps? adding features` · `kept adding` · `adding more features` · `user stories` · `acceptance criteria` · `defin(?:e|ed|ing) (?:the )?(?:scope|requirements)` · `\bmvp scope\b` · `one page plan`

**ch03 — The architecture you didn't draw (client/server/data/storage/3rd parties)** (21 patterns)

`architecture` · `architect(?:ing|ural)\b` · `system design` · `data model` · `schema design` · `database design` · `folder structure` · `project structure` · `file structure` · `separation of concerns` · `tightly coupled` · `\bcoupling\b` · `monolith` · `microservice` · `data flow` · `third.?party (?:api|service|integration)` · `file storage` · `object storage` · `\bs3\b` · `blob storage` · `tech stack`

**ch04 — Deploy day (env vars, migrations, domains, works on my machine)** (21 patterns)

`\bdeploy` · `\bproduction\b` · `works (?:locally|on my machine|fine locally)` · `\blocalhost\b` · `env(?:ironment)? var` · `\.env\b` · `environment variable` · `\bdns\b` · `domain name` · `custom domain` · `\bssl\b` · `build fail` · `build error` · `staging` · `ci/?cd` · `\bhosting\b` · `database migration` · `\bmigration` · `went live` · `push(?:ed)? to prod` · `cloudflare pages`

**ch05 — The security pre-flight (authn vs authz, IDOR, row-level security, keys)** (23 patterns)

`\bsecurity\b` · `\bsecure\b` · `vulnerab` · `authentication` · `authorization` · `row.level security` · `\brls\b` · `\bidor\b` · `access control` · `permission` · `api key(?:s)? (?:leak|expos|public|commit)` · `leaked (?:key|secret|credential)` · `exposed (?:key|secret|api|endpoint|database)` · `hard.?cod(?:ed|ing) (?:the )?(?:key|secret|api)` · `sql injection` · `\bxss\b` · `\bcsrf\b` · `pen.?test` · `data (?:breach|leak)` · `other users(?:'|.s)? data` · `another user(?:'|.s)? data` · `\bjwt\b` · `service role`

**ch06 — Stripe in production (webhooks, test-to-live, refunds, subscriptions)** (19 patterns)

`\bstripe\b` · `webhook` · `payment (?:integration|processing|provider|flow|gateway)` · `\bcheckout\b` · `subscription (?:billing|payment|management|system|logic)` · `recurring (?:payment|billing)` · `\brefund` · `chargeback` · `test mode` · `live mode` · `\bpaddle\b` · `lemon ?squeezy` · `billing (?:system|integration|portal|logic|flow|issue)` · `failed payment` · `payment failed` · `card declined` · `take payments?` · `accept payments?` · `\bpayouts?\b`

**ch07 — Compliance, when it matters (HIPAA, SOC 2, GDPR, BAA, DPA)** (20 patterns)

`\bhipaa\b` · `soc ?2` · `\bgdpr\b` · `\bccpa\b` · `\bbaa\b` · `\bdpa\b` · `data processing agreement` · `complian(?:ce|t)` · `\bpci\b` · `\bphi\b` · `\bpii\b` · `privacy policy` · `terms of service` · `cookie consent` · `regulated` · `legal(?:ly)? (?:requir|oblig)` · `data residency` · `sensitive data` · `personal(?:ly identifiable)? data` · `security audit`

**ch08 — The first ten users (outreach, warm intros, conversations not broadcast)** (18 patterns)

`first (?:ten|10|few|five|5|100|hundred)? ?(?:users|customers|clients)` · `early (?:users|adopters|customers)` · `getting (?:my |the |our )?first (?:user|customer|client|sale)` · `no (?:users|customers|signups)` · `zero (?:users|customers|signups|paying)` · `cold (?:email|outreach|dm|call|message)` · `warm (?:intro|introduction)` · `reach(?:ed|ing)? out to` · `talk(?:ed|ing)? to (?:users|customers|potential)` · `user interviews?` · `customer interviews?` · `beta (?:users|testers)` · `waitlist` · `find(?:ing)? (?:my |the )?(?:first )?(?:users|customers)` · `get(?:ting)? (?:my |the )?(?:first )?(?:users|customers)` · `acquire (?:users|customers)` · `first (?:paying )?customer` · `friends and family`

**ch09 — The distribution loop (referrals, channels, users who came from users)** (24 patterns)

`\bdistribution\b` · `\bmarketing\b` · `referral` · `word of mouth` · `\bviral\b` · `\bseo\b` · `content marketing` · `content calendar` · `social media` · `product hunt` · `paid ads` · `google ads` · `facebook (?:ads|groups)` · `\btraffic\b` · `crickets` · `newsletter` · `\baudience\b` · `organic (?:traffic|growth|reach)` · `search console` · `growth (?:channel|tactic|strateg|hack|engine|loop)` · `grow(?:ing)? (?:my|the|our) (?:user|customer|audience|traffic)` · `acquisition channel` · `niche communities` · `posting (?:on|in)`

**ch10 — When to hand it off (hire, fractional help, sell, a data room)** (21 patterns)

`\bhir(?:e|ing|ed)\b` · `freelanc` · `contractor` · `outsourc` · `technical co.?founder` · `\bcto\b` · `fractional` · `(?:find|finding|looking for|need|needed|want) an? (?:technical )?co.?founder` · `sell(?:ing)? (?:my|the) (?:app|business|saas|product|startup|company)` · `acquisition (?:offer|potential|price|talks)` · `acquired by` · `\bflippa\b` · `exit (?:strategy|plan)` · `due diligence` · `data room` · `hand(?:ing)? (?:it |this )?off` · `handover` · `burn(?:ed|t)? out` · `burnout` · `dev team` · `bring(?:ing)? on a (?:dev|engineer|partner)`

**ch11 — CANDIDATE: the landing page (landing page, conversion, signups, pricing, copy)** (24 patterns)

`landing page` · `home ?page` · `hero section` · `above the fold` · `conversion rate` · `trial conversion` · `signup conversion` · `low conversion` · `high.?conversion` · `conversion from` · `convert(?:ing)? (?:visitors|traffic|signups|users)` · `\bcta\b` · `call to action` · `sign.?up (?:rate|flow|page|form)` · `pricing page` · `\bheadline` · `value prop` · `bounce rate` · `\bvisitors\b` · `a/?b test` · `website copy` · `\bcopywriting\b` · `page copy` · `waitlist page`


## Appendix B — terms tried and rejected

Each was measured, its matches read in context, and removed. **Authors** is the
business-asking authors the pattern matches. **New** is the subset *not already matched by
the chapter's kept terms* — the only authors the term would actually have added, and the
honest measure of what the tuning was worth. Both columns are computed by the script at run
time from the pattern printed beside them, so a pattern and its count can no longer drift
apart in prose. Every single-quoted fragment below is verified verbatim against the corpus
by the same run.

| Chapter | Term tried | Authors | New | Why it was cut |
| --- | --- | ---: | ---: | --- |
| 09 | `\bpromot(?:e\|ing\|ion)` | 76 | 48 | dominated by the r/SaaS rule boilerplate 'I will not promote' |
| 09 | `\bcommunity\b` | 29 | 13 | dominated by 'this community' addressed to the subreddit |
| 09 | `\bgrowth\b (bare)` | 23 | 7 | mostly 'growth' as a goal word, not a channel |
| 09 | `launch(?:ed)? (?:it )?on` | 2 | 0 | every business-asking match is already in the chapter on a named channel, so the term earns nothing |
| 10 | `\bacquisition\b (bare)` | 8 | 7 | almost all CUSTOMER acquisition, i.e. chapter 09 |
| 10 | `\bexit\b (bare)` | 1 | 1 | the single match is a crypto trade, 'felt like a smart exit' |
| 10 | `co.?founder (bare)` | 21 | 11 | mostly descriptive 'my cofounder and I' |
| 10 | `\bagency\b` | 12 | 4 | mostly the poster's own agency or an agency pivot |
| 06 | `\bsubscription\b (bare)` | 12 | 7 | mostly their own product's pricing model |
| 06 | `\bbilling\b (bare)` | 5 | 2 | their own billing model, not a payment integration |
| 11 | `\bconversion\b (bare)` | 12 | 2 | the authors it adds are funnel-wide, not the page: '0.2% conversion end-to-end' |
| 11 | `\bmessaging\b` | 5 | 1 | the one author it adds is a services line item, 'scripting and messaging' |
| 05 | `\bapi key\b (bare)` | 3 | 2 | configuration of an AI tool, not a leaked credential |
| 03 | `\bdiagram\b` | 0 | 0 | no business-asking author at all; corpus-wide it is a product feature line, 'Visual ER diagram', never an architecture question |
| 01 | `\bvibe cod` | 6 | 6 | an audience descriptor, not the chapter's mechanism |
| 01 | `worked fine` | 0 | 0 | no business-asking author at all, and corpus-wide it carries a different sense: 'The feature worked fine, I just never explained it properly' |
| 01 | `broke something` | 1 | 1 | matches 'That broke something in me' |
| 01 | `spaghetti (bare)` | 1 | 1 | matches 'throwing spaghetti at the wall' |

The pipe inside chapter 09's first pattern is written `\|` so the table renders; the script
prints it unescaped as `\bpromot(?:e|ing|ion)`.

## Appendix C — the 400-phrase assignment, in full

The author counts in the right-hand column are `reference/emergent-language.json`'s own,
over the 607 asking posts. They are shown for audit only; Method 2 never sums them.

| # | Phrase | Bucket | Distinct authors over the 607 asking posts |
| ---: | --- | --- | ---: |
| 1 | `claude code` | tool | 46 |
| 2 | `landing page` | 11 | 32 |
| 3 | `every single` | none | 24 |
| 4 | `love hear` | register | 24 |
| 5 | `greatly appreciated` | register | 22 |
| 6 | `kept running` | none | 21 |
| 7 | `next app` | tool | 20 |
| 8 | `i'm trying` | none | 19 |
| 9 | `thanks advance` | register | 19 |
| 10 | `web app` | none | 18 |
| 11 | `honest feedback` | register | 18 |
| 12 | `months ago` | none | 17 |
| 13 | `else experienced` | none | 17 |
| 14 | `trying figure` | none | 15 |
| 15 | `happy answer` | register | 15 |
| 16 | `every day` | none | 14 |
| 17 | `i'm building` | none | 14 |
| 18 | `open source` | none | 14 |
| 19 | `keep running` | none | 14 |
| 20 | `i'd love` | register | 14 |
| 21 | `last week` | none | 13 |
| 22 | `i'm stuck` | none | 13 |
| 23 | `real users` | 08 | 12 |
| 24 | `can't find` | none | 12 |
| 25 | `trying build` | none | 12 |
| 26 | `i've tried` | none | 12 |
| 27 | `app router` | tool | 12 |
| 28 | `answer questions` | register | 11 |
| 29 | `free tier` | tool | 11 |
| 30 | `i'm not sure` | none | 11 |
| 31 | `couldn't find` | none | 11 |
| 32 | `appreciated thanks` | register | 11 |
| 33 | `i'm thinking` | none | 11 |
| 34 | `wanted share` | register | 11 |
| 35 | `trying understand` | none | 10 |
| 36 | `software engineer` | none | 10 |
| 37 | `last year` | none | 10 |
| 38 | `hey guys` | register | 10 |
| 39 | `building public` | none | 10 |
| 40 | `i've been working` | none | 10 |
| 41 | `social media` | 09 | 10 |
| 42 | `full stack` | none | 10 |
| 43 | `vibe coding` | none | 10 |
| 44 | `early users` | 08 | 9 |
| 45 | `actually work` | none | 9 |
| 46 | `keep getting` | none | 9 |
| 47 | `cold outreach` | 08 | 9 |
| 48 | `pain points` | none | 9 |
| 49 | `i'm struggling` | none | 9 |
| 50 | `tech stack` | 03 | 9 |
| 51 | `kept hitting` | none | 9 |
| 52 | `i'd love hear` | register | 9 |
| 53 | `love feedback` | register | 9 |
| 54 | `per day` | none | 8 |
| 55 | `saas product` | none | 8 |
| 56 | `first users` | 08 | 8 |
| 57 | `genuinely love` | register | 8 |
| 58 | `app store` | none | 8 |
| 59 | `paying customers` | 08 | 8 |
| 60 | `appreciate any advice` | register | 8 |
| 61 | `api key` | tool | 8 |
| 62 | `i'm working` | none | 8 |
| 63 | `hey everyone i'm` | register | 8 |
| 64 | `completely different` | none | 8 |
| 65 | `auto mode` | tool | 8 |
| 66 | `greatly appreciated thanks` | register | 8 |
| 67 | `looking for feedback` | register | 8 |
| 68 | `happy answer questions` | register | 8 |
| 69 | `chrome extension` | none | 7 |
| 70 | `please help` | register | 7 |
| 71 | `blog posts` | 09 | 7 |
| 72 | `working project` | none | 7 |
| 73 | `spent the last` | none | 7 |
| 74 | `per month` | none | 7 |
| 75 | `stack next` | tool | 7 |
| 76 | `cursor claude` | tool | 7 |
| 77 | `google search` | none | 7 |
| 78 | `mobile app` | none | 7 |
| 79 | `hardest part` | none | 7 |
| 80 | `months building` | none | 7 |
| 81 | `app built` | none | 7 |
| 82 | `spent months` | none | 7 |
| 83 | `appreciate any help` | register | 7 |
| 84 | `i've done` | none | 7 |
| 85 | `problem kept` | none | 7 |
| 86 | `knowledge base` | none | 7 |
| 87 | `i'm curious` | none | 7 |
| 88 | `next react` | tool | 7 |
| 89 | `keep hitting` | none | 7 |
| 90 | `part i'm` | none | 7 |
| 91 | `mcp server` | tool | 7 |
| 92 | `usage limits` | tool | 7 |
| 93 | `i've seen` | none | 7 |
| 94 | `server components` | tool | 7 |
| 95 | `doesn't seem` | none | 7 |
| 96 | `side project` | none | 6 |
| 97 | `put together` | none | 6 |
| 98 | `makes sense` | none | 6 |
| 99 | `what's actually` | none | 6 |
| 100 | `help would appreciated` | register | 6 |
| 101 | `real estate` | none | 6 |
| 102 | `solo founder` | none | 6 |
| 103 | `customer support` | none | 6 |
| 104 | `paid ads` | 09 | 6 |
| 105 | `experienced something similar` | none | 6 |
| 106 | `search console` | 09 | 6 |
| 107 | `keep building` | none | 6 |
| 108 | `started working` | none | 6 |
| 109 | `user base` | none | 6 |
| 110 | `conversion rate` | 11 | 6 |
| 111 | `real problem` | none | 6 |
| 112 | `problem kept running` | none | 6 |
| 113 | `went wrong` | none | 6 |
| 114 | `across different` | none | 6 |
| 115 | `currently working` | none | 6 |
| 116 | `weeks ago` | none | 6 |
| 117 | `i'm wondering` | none | 6 |
| 118 | `keep seeing` | none | 6 |
| 119 | `promote i'm` | register | 6 |
| 120 | `agent mode` | tool | 6 |
| 121 | `claude pro` | tool | 6 |
| 122 | `next app router` | tool | 6 |
| 123 | `already tried` | none | 6 |
| 124 | `export default` | tool | 6 |
| 125 | `i've been building` | none | 6 |
| 126 | `building saas` | none | 5 |
| 127 | `stop thinking` | none | 5 |
| 128 | `saas products` | none | 5 |
| 129 | `search results` | 09 | 5 |
| 130 | `actually works` | none | 5 |
| 131 | `actually working` | none | 5 |
| 132 | `doesn't work` | none | 5 |
| 133 | `instead starting` | none | 5 |
| 134 | `moved the needle` | none | 5 |
| 135 | `feature requests` | none | 5 |
| 136 | `adding more features` | 02 | 5 |
| 137 | `next week` | none | 5 |
| 138 | `management tool` | none | 5 |
| 139 | `you're building` | none | 5 |
| 140 | `cursor claude code` | tool | 5 |
| 141 | `saas founders` | none | 5 |
| 142 | `built app` | none | 5 |
| 143 | `i've already` | none | 5 |
| 144 | `problem i'm` | none | 5 |
| 145 | `google search console` | 09 | 5 |
| 146 | `software development` | none | 5 |
| 147 | `decided build` | none | 5 |
| 148 | `next step` | none | 5 |
| 149 | `working product` | none | 5 |
| 150 | `real question` | none | 5 |
| 151 | `real product` | none | 5 |
| 152 | `coding agents` | tool | 5 |
| 153 | `came across` | none | 5 |
| 154 | `app called` | none | 5 |
| 155 | `api keys` | tool | 5 |
| 156 | `right now i'm` | none | 5 |
| 157 | `thanks for reading` | register | 5 |
| 158 | `reality check` | none | 5 |
| 159 | `question i'm` | none | 5 |
| 160 | `worst part` | none | 5 |
| 161 | `real pain` | none | 5 |
| 162 | `actually built` | none | 5 |
| 163 | `reddit posts` | 09 | 5 |
| 164 | `pain point` | none | 5 |
| 165 | `happy share` | register | 5 |
| 166 | `i'm running` | none | 5 |
| 167 | `actually worked` | none | 5 |
| 168 | `google play` | none | 5 |
| 169 | `hard part` | none | 5 |
| 170 | `i'm actually` | none | 5 |
| 171 | `problem every` | none | 5 |
| 172 | `write code` | none | 5 |
| 173 | `last months` | none | 5 |
| 174 | `cursor pro` | tool | 5 |
| 175 | `pro plan` | tool | 5 |
| 176 | `claude sonnet` | tool | 5 |
| 177 | `i've found` | none | 5 |
| 178 | `edge cases` | none | 5 |
| 179 | `days ago` | none | 5 |
| 180 | `works fine` | none | 5 |
| 181 | `code claude` | tool | 5 |
| 182 | `lines code` | none | 5 |
| 183 | `claude gemini` | tool | 5 |
| 184 | `years ago` | none | 5 |
| 185 | `export const` | tool | 5 |
| 186 | `react typescript` | tool | 5 |
| 187 | `past few months` | none | 5 |
| 188 | `i'm currently` | none | 4 |
| 189 | `code base` | none | 4 |
| 190 | `hey folks` | register | 4 |
| 191 | `bit lost` | none | 4 |
| 192 | `built chrome` | none | 4 |
| 193 | `built chrome extension` | none | 4 |
| 194 | `privacy policy` | 07 | 4 |
| 195 | `marketing budget` | 09 | 4 |
| 196 | `support tickets` | none | 4 |
| 197 | `server costs` | none | 4 |
| 198 | `start thinking` | none | 4 |
| 199 | `six months` | none | 4 |
| 200 | `idea came` | none | 4 |
| 201 | `local businesses` | none | 4 |
| 202 | `internet connection` | none | 4 |
| 203 | `months later` | none | 4 |
| 204 | `power users` | none | 4 |
| 205 | `trying solve` | none | 4 |
| 206 | `giving away` | none | 4 |
| 207 | `built first` | none | 4 |
| 208 | `zero marketing` | 09 | 4 |
| 209 | `seo content` | 09 | 4 |
| 210 | `content marketing` | 09 | 4 |
| 211 | `facebook groups` | 09 | 4 |
| 212 | `built tool` | none | 4 |
| 213 | `doesn't matter` | none | 4 |
| 214 | `build the app` | none | 4 |
| 215 | `cold email` | 08 | 4 |
| 216 | `year ago` | none | 4 |
| 217 | `working code` | none | 4 |
| 218 | `first customers` | 08 | 4 |
| 219 | `product hunt` | 09 | 4 |
| 220 | `planning start` | none | 4 |
| 221 | `else entirely` | none | 4 |
| 222 | `building the product` | none | 4 |
| 223 | `getting the first` | 08 | 4 |
| 224 | `first project` | none | 4 |
| 225 | `simple tool` | none | 4 |
| 226 | `appreciate honest` | register | 4 |
| 227 | `looking for honest` | register | 4 |
| 228 | `active users` | none | 4 |
| 229 | `quit job` | none | 4 |
| 230 | `try build` | none | 4 |
| 231 | `every week` | none | 4 |
| 232 | `actual product` | none | 4 |
| 233 | `help hey` | register | 4 |
| 234 | `else experiencing` | none | 4 |
| 235 | `next months` | none | 4 |
| 236 | `can't tell` | none | 4 |
| 237 | `i'd rather` | none | 4 |
| 238 | `cloudflare pages` | 04 | 4 |
| 239 | `since i'm` | none | 4 |
| 240 | `i've written` | none | 4 |
| 241 | `lesson learned` | none | 4 |
| 242 | `since it's` | none | 4 |
| 243 | `it's free` | none | 4 |
| 244 | `please tell` | register | 4 |
| 245 | `spent months building` | none | 4 |
| 246 | `multiple times` | none | 4 |
| 247 | `demo video` | none | 4 |
| 248 | `messy middle` | none | 4 |
| 249 | `build next` | none | 4 |
| 250 | `almost nothing` | none | 4 |
| 251 | `spend hours` | none | 4 |
| 252 | `day day` | none | 4 |
| 253 | `ios app` | none | 4 |
| 254 | `works well` | none | 4 |
| 255 | `recently decided` | none | 4 |
| 256 | `i'd genuinely` | register | 4 |
| 257 | `feels slow` | none | 4 |
| 258 | `three months` | none | 4 |
| 259 | `i'm looking` | none | 4 |
| 260 | `digital products` | none | 4 |
| 261 | `years experience` | none | 4 |
| 262 | `i'm hitting` | none | 4 |
| 263 | `user sessions` | none | 4 |
| 264 | `project management` | none | 4 |
| 265 | `seem work` | none | 4 |
| 266 | `actually pay` | none | 4 |
| 267 | `company work` | none | 4 |
| 268 | `better results` | none | 4 |
| 269 | `launch day` | none | 4 |
| 270 | `small project` | none | 4 |
| 271 | `start building` | none | 4 |
| 272 | `promote hey` | register | 4 |
| 273 | `front end` | none | 4 |
| 274 | `offer free` | none | 4 |
| 275 | `removed moderator` | register | 4 |
| 276 | `small businesses` | none | 4 |
| 277 | `exact problem` | none | 4 |
| 278 | `started building` | none | 4 |
| 279 | `didn't work` | none | 4 |
| 280 | `decided start` | none | 4 |
| 281 | `web dev` | none | 4 |
| 282 | `day job` | none | 4 |
| 283 | `don't understand` | none | 4 |
| 284 | `i'm sure` | none | 4 |
| 285 | `latest version` | none | 4 |
| 286 | `long term` | none | 4 |
| 287 | `code generation` | tool | 4 |
| 288 | `rules file` | 01 | 4 |
| 289 | `past months` | none | 4 |
| 290 | `last month` | none | 4 |
| 291 | `on-demand usage` | tool | 4 |
| 292 | `cursor account` | tool | 4 |
| 293 | `i'm confused` | none | 4 |
| 294 | `expected behavior` | none | 4 |
| 295 | `pro subscription` | tool | 4 |
| 296 | `solve problem` | none | 4 |
| 297 | `free plan` | tool | 4 |
| 298 | `help understanding` | none | 4 |
| 299 | `trying create` | none | 4 |
| 300 | `seem find` | none | 4 |
| 301 | `rather hear` | register | 4 |
| 302 | `worked fine` | none | 4 |
| 303 | `claude web` | tool | 4 |
| 304 | `work fine` | none | 4 |
| 305 | `i'm making` | none | 4 |
| 306 | `api calls` | tool | 4 |
| 307 | `chatgpt plus` | tool | 4 |
| 308 | `learning next` | tool | 4 |
| 309 | `server component` | tool | 4 |
| 310 | `client components` | tool | 4 |
| 311 | `nextjs project` | tool | 4 |
| 312 | `next project` | tool | 4 |
| 313 | `div classname` | tool | 4 |
| 314 | `api route` | tool | 4 |
| 315 | `default function` | tool | 4 |
| 316 | `export default function` | tool | 4 |
| 317 | `next typescript` | tool | 4 |
| 318 | `hey everyone i've` | register | 4 |
| 319 | `building simple` | none | 4 |
| 320 | `play store` | none | 4 |
| 321 | `validate the idea` | none | 3 |
| 322 | `users sign` | 11 | 3 |
| 323 | `feel bit` | none | 3 |
| 324 | `sensitive data` | 07 | 3 |
| 325 | `actually costs` | none | 3 |
| 326 | `first big` | none | 3 |
| 327 | `terms service` | 07 | 3 |
| 328 | `instead building` | none | 3 |
| 329 | `war stories` | none | 3 |
| 330 | `years old` | none | 3 |
| 331 | `launch saas` | none | 3 |
| 332 | `ask questions` | register | 3 |
| 333 | `started developing` | none | 3 |
| 334 | `build saas` | none | 3 |
| 335 | `move forward` | none | 3 |
| 336 | `product market` | none | 3 |
| 337 | `step step` | none | 3 |
| 338 | `actually makes` | none | 3 |
| 339 | `without actually` | none | 3 |
| 340 | `what's happening` | none | 3 |
| 341 | `content calendar` | 09 | 3 |
| 342 | `actually understand` | none | 3 |
| 343 | `can't fix` | none | 3 |
| 344 | `what's actually working` | none | 3 |
| 345 | `next steps` | none | 3 |
| 346 | `domain name` | 04 | 3 |
| 347 | `moving forward` | none | 3 |
| 348 | `potential clients` | 08 | 3 |
| 349 | `actually moved` | none | 3 |
| 350 | `cold start` | none | 3 |
| 351 | `actually matters` | none | 3 |
| 352 | `analytics dashboard` | none | 3 |
| 353 | `weeks building` | none | 3 |
| 354 | `every feature` | none | 3 |
| 355 | `already exists` | none | 3 |
| 356 | `mobile apps` | none | 3 |
| 357 | `home screen` | none | 3 |
| 358 | `always say` | none | 3 |
| 359 | `every founder` | none | 3 |
| 360 | `biggest surprise` | none | 3 |
| 361 | `niche communities` | 09 | 3 |
| 362 | `tool without` | none | 3 |
| 363 | `hit mrr` | none | 3 |
| 364 | `give away` | none | 3 |
| 365 | `give feedback` | register | 3 |
| 366 | `giving feedback` | register | 3 |
| 367 | `chat history` | tool | 3 |
| 368 | `competitor analysis` | none | 3 |
| 369 | `built free` | none | 3 |
| 370 | `next supabase` | tool | 3 |
| 371 | `building right` | none | 3 |
| 372 | `genuinely curious` | register | 3 |
| 373 | `what's broken` | none | 3 |
| 374 | `friends and family` | 08 | 3 |
| 375 | `api costs` | tool | 3 |
| 376 | `biggest problem` | none | 3 |
| 377 | `title says` | register | 3 |
| 378 | `take look` | register | 3 |
| 379 | `ago started` | none | 3 |
| 380 | `dev team` | 10 | 3 |
| 381 | `hours day` | none | 3 |
| 382 | `saas app` | none | 3 |
| 383 | `claude cowork` | tool | 3 |
| 384 | `zero paying` | none | 3 |
| 385 | `growing fast` | none | 3 |
| 386 | `recently launched` | none | 3 |
| 387 | `early feedback` | register | 3 |
| 388 | `paying customer` | 08 | 3 |
| 389 | `genuinely appreciate` | register | 3 |
| 390 | `distribution problem` | 09 | 3 |
| 391 | `product the problem` | none | 3 |
| 392 | `working prototype` | none | 3 |
| 393 | `honest advice` | register | 3 |
| 394 | `trying learn` | none | 3 |
| 395 | `payment integration` | 06 | 3 |
| 396 | `appreciated thank` | register | 3 |
| 397 | `took months` | none | 3 |
| 398 | `third party` | 03 | 3 |
| 399 | `beta users` | 08 | 3 |
| 400 | `specific enough` | none | 3 |
