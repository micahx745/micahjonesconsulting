# Cut G — re-attesting "vibe coding" and "solo founder"

Produced 2026-09-04 by an Opus agent in the book arc

**Script:** `C:/Users/micah/Code/reddit-research/cuts/cut_g_reattest.py`
(run from `C:/Users/micah/Code/reddit-research` with `.venv/Scripts/python.exe`;
it prints every number and every table below).

**Denominators, reproduced by the script before anything else was counted:**
5,456 raw corpus lines · **4,464 posts / 3,842 distinct authors** with
`len(clean(body)) >= 250` · **ASKING = 607 posts / 567 distinct authors**
(`STUCK.search` matched) · **business-room asking = 284 posts / 261 authors**
(r/SaaS, r/buildinpublic, r/microsaas, r/startups, r/EntrepreneurRideAlong) ·
**developer-room asking = 323 posts / 307 authors** (r/nextjs, r/cursor,
r/ClaudeAI, r/webdev, r/ChatGPTCoding) · **SHOWCASE = 1,019 posts / 929 authors**
(`SHOWCASE.search` matched). All five reproduce the published package exactly.
`listen.py`'s own printout says "showing 905" because it excludes the 114 posts
that are both showcase and asking; this cut follows the brief and includes them.

## How to read this

Every number here is a count of **public Reddit posts**, so it is evidence about
**language** — which words strangers reach for unprompted — and not about market
size. Nobody who solved the problem quietly, or is under contract, or found the
failure too embarrassing to publish, is in this sample. A zero is weak evidence
of absence, not proof of it: the archive the corpus came from searches fuzzily,
and the corpus is twelve 10-day windows, not a census. Counts are **distinct
authors**, never post frequency, because cross-posting is common — the nine
"solo founder" asking posts collapse to eight authors on exactly that account.
Score is printed as a descriptive column only; nothing here is ranked, filtered
or sampled by it, and the highest-scoring post in the vibe set (206) is the one
*least* like the buyer.

---

## Why this cut exists

`01-APPENDIX-phrase-bank-attested.json` killed both phrases on 2026-09-04. The
stated reason for "vibe coding" was that "The claimed count of 10 does not exist
in any on-disk evidence file"; the reason for "solo founder" was the same class
of failure. Both kills were correct **about that repo**. The file that carries
the counts — `reference/emergent-language.json` — lives in the corpus repo, not
in `micahjonesconsulting`. It is on disk there, it was read for this cut, and it
says what the earlier agent was told it said.

## Leg 1 — the file the phrase bank could not see

`C:/Users/micah/Code/reddit-research/reference/emergent-language.json`, header
`corpus=4464 asking=607 showing=905`, `asking_vocab` = 400 phrases, cut-off 3
authors. The four entries in those 400 that touch either family, quoted exactly:

| Rank of 400 | Entry, verbatim |
| ---: | --- |
| 43 | `{"phrase": "vibe coding", "authors": 10, "posts": 10}` |
| 102 | `{"phrase": "solo founder", "authors": 6, "posts": 7}` |
| 141 | `{"phrase": "saas founders", "authors": 5, "posts": 5}` |
| 359 | `{"phrase": "every founder", "authors": 3, "posts": 4}` |

Both disputed counts exist, unchanged, and rank inside the top quarter and top
half of the ranked asking vocabulary respectively.

## Leg 2A — "vibe coding", every spelling

Distinct authors / posts. Denominators are the column headers.

| Spelling | ALL BODIES (3,842 authors) | ASKING (567) | BIZ ASK (261) | DEV ASK (307) | SHOWCASE (929) |
| --- | ---: | ---: | ---: | ---: | ---: |
| vibe coding | 74/74 | **10/10** | 4/4 | 6/6 | 18/18 |
| vibe-coding | 14/14 | 1/1 | 0/0 | 1/1 | 6/6 |
| vibecoding | 11/12 | 1/1 | 0/0 | 1/1 | 5/5 |
| vibe coded | 18/19 | 1/1 | 1/1 | 0/0 | 9/9 |
| vibe-coded | 13/13 | 3/3 | 1/1 | 2/2 | 2/2 |
| vibe code | 7/7 | 1/1 | 0/0 | 1/1 | 3/3 |
| vibe coder | 6/6 | 1/1 | 0/0 | 1/1 | 1/1 |
| **ANY vibe-cod\* (union)** | **146/148** | **19/19** | **7/7** | **12/12** | **41/41** |

The union is not the sum; one post can carry two spellings. The bigram row
reproduces `emergent-language.json` exactly at 10 authors / 10 posts, which is
the number the phrase bank could not find and killed. The published counter
tokenised on whitespace, so it never saw `vibecoding` or `vibe-coded`: the
honest family figure is 19 asking authors of 567, not 10.

## Leg 2B — "solo founder" and its rival nouns

Distinct authors / posts, same denominators.

| Noun | ALL BODIES (3,842) | ASKING (567) | BIZ ASK (261) | DEV ASK (307) | SHOWCASE (929) |
| --- | ---: | ---: | ---: | ---: | ---: |
| **solo founder** (sing.+pl.) | 69/75 | **8/9** | **8/9** | 0/0 | 33/38 |
| — solo founder (singular) | 44/47 | 6/7 | 6/7 | 0/0 | 21/23 |
| — solo founders (plural) | 28/31 | 2/2 | 2/2 | 0/0 | 13/16 |
| solo builder | 9/10 | 1/1 | 1/1 | 0/0 | 4/4 |
| solo dev | 30/32 | 3/3 | 2/2 | 1/1 | 11/12 |
| solo developer | 10/10 | 2/2 | 2/2 | 0/0 | 3/3 |
| indie hacker | 31/32 | 3/4 | 3/4 | 0/0 | 12/13 |
| non-technical founder | 9/10 | 2/3 | 2/3 | 0/0 | 4/4 |
| one-person (hyphenated) | 4/4 | 2/2 | 1/1 | 1/1 | 3/3 |
| one person (spaced) | 32/32 | 7/7 | 6/6 | 1/1 | 9/9 |
| bootstrapped founder | 4/4 | 1/1 | 1/1 | 0/0 | 0/0 |
| technical founder | 20/21 | 5/6 | 5/6 | 0/0 | 7/7 |

The singular row reproduces `emergent-language.json` exactly at 6 authors / 7
posts. "one person (spaced)" is a fuzzy noun — it matches "I asked one person" —
so it is reported and used for no verdict.

## Leg 3A — the 19 asking posts that use a vibe spelling, read individually

The brief allowed 40; the corpus supplies 19, so all 19 were opened in full and
classified by hand. **SELF** = the author applies the label to their own build or
practice. **PEJ** = used to dismiss or warn, and not applied to the author's own
work. **NEUTRAL** = topic word, market category, or someone else's build with no
verdict attached. Stated tie-break, so it can be argued with: when an author both
labels their own work and dismisses others with it, SELF wins and `warns` is set.

| id | Sub | Room | Class | Warns | Score | Why |
| --- | --- | --- | --- | --- | ---: | --- |
| 1nsp9g0 | cursor | DEV | SELF | yes | 0 | his own Cursor build; title frames it as the method's downside |
| 1ofashm | ChatGPTCoding | DEV | SELF | yes | 0 | "vibecoding a website with 0 coding experience"; fears being a "dumb vibecoder" |
| 1po1eex | nextjs | DEV | SELF | – | 0 | "Most things i've created where vibecoded using Claude" |
| 1ps6ys9 | ClaudeAI | DEV | PEJ | – | 206 | inherited someone else's "mass vibe-coded monolith" |
| 1psjb5d | ClaudeAI | DEV | SELF | yes | 0 | "I now started with some serious vibe coding", and won't hire one |
| 1q7z62u | ChatGPTCoding | DEV | SELF | – | 0 | 'Day 14 of "Vibe-coding until I reach 100K"' |
| 1qfcro8 | cursor | DEV | SELF | – | 0 | "I am vibe coding mostly, but with solid requirements" |
| 1qgfqeh | microsaas | BIZ | NEUTRAL | – | 1 | scare-quoted; asks whether such freelancers move faster |
| 1qgopv2 | webdev | DEV | SELF | – | 0 | "I want to vibe code this" — a 2-day gift app |
| 1r5pb34 | EntrepreneurRideAlong | BIZ | PEJ | – | 0 | "freelance vibe coders on Fiverr" = the cheap tier he undercuts |
| 1sji3bw | buildinpublic | BIZ | SELF | – | 2 | shipped his first project "entirely through vibe coding" |
| 1t94ie9 | webdev | DEV | NEUTRAL | – | 1 | asks for '"vibe coding" shortcuts'; own work not labelled |
| 1t9b9r0 | buildinpublic | BIZ | SELF | – | 1 | software engineer, "started vibe coding 1-2 years back" |
| 1t9edaa | buildinpublic | BIZ | NEUTRAL | – | 1 | an analogy for his marketing product, not his build method |
| 1ts616h | nextjs | DEV | PEJ | – | 0 | a CTO on colleagues' vibe-coded apps he has to host |
| 1ty6rhf | nextjs | DEV | SELF | – | 3 | "a beginner who's been vibe coding and created an app" |
| 1tzbge2 | microsaas | BIZ | SELF | – | 3 | "I vibe-coded an application", now worth selling to his employer |
| 1tzraiv | SaaS | BIZ | PEJ | – | 0 | frontend dev; "vibe coded" is the generic-UI smell to avoid |
| 1uoh3m5 | ClaudeAI | DEV | SELF | – | 1 | titles his own Claude build "vibe coding a web app" |

| Class | Posts | Authors | BIZ authors | DEV authors |
| --- | ---: | ---: | ---: | ---: |
| SELF | 12 | 12 | 3 | 9 |
| PEJORATIVE | 4 | 4 | 2 | 2 |
| NEUTRAL-OR-TOPIC | 3 | 3 | 2 | 1 |

SELF is 12/19 = 63% of the 19 asking posts that use the word; PEJORATIVE is
4/19 = 21%. Three of the twelve SELF posts also dismiss other people with it.

### Three verbatim quotes per class

**SELF**

> "I built it entirely through vibe coding." — r/buildinpublic,
> https://www.reddit.com/r/buildinpublic/comments/1sji3bw/72_hours_ago_i_shipped_the_first_real_project_of/

> "Five months ago, I vibe-coded an application that has turned out to have genuine business value." — r/microsaas,
> https://www.reddit.com/r/microsaas/comments/1tzbge2/need_some_advice_in_a_payout_negociation/

> "I'm a beginner who's been vibe coding and created an app" — r/nextjs,
> https://www.reddit.com/r/nextjs/comments/1ty6rhf/capacitor_nextjs_app_not_filling_iphone_screen/

**PEJORATIVE**

> "How to make your UI not look vibe coded?" — r/SaaS (title),
> https://www.reddit.com/r/SaaS/comments/1tzraiv/how_to_make_your_ui_not_look_vibe_coded/

> "Freelance vibe coders on Fiverr: $2K-$5K, fast turnaround, but they're just prompting code with zero product thinking" — r/EntrepreneurRideAlong,
> https://www.reddit.com/r/EntrepreneurRideAlong/comments/1r5pb34/im_a_product_manager_not_an_engineer_new_ai_tools/

> "I onboarded into a mass vibe-coded monolith. Here's what I did to survive it." — r/ClaudeAI (title),
> https://www.reddit.com/r/ClaudeAI/comments/1ps6ys9/i_onboarded_into_a_mass_vibecoded_monolith_heres/

**NEUTRAL-OR-TOPIC**

> "Have developers who use AI heavily or "vibe coding" moved faster or contributed more creatively than traditional freelancers?" — r/microsaas,
> https://www.reddit.com/r/microsaas/comments/1qgfqeh/if_you_had_50000_to_speed_up_saas_development_how/

> "I have a vision like vibe coding made coding easy. Now it's time for vibe marketing" — r/buildinpublic,
> https://www.reddit.com/r/buildinpublic/comments/1t9edaa/appsaas_founders_are_cooked_at_marketing_i_was/

> "Any "vibe coding" shortcuts or architectural shifts would be much appreciated!" — r/webdev,
> https://www.reddit.com/r/webdev/comments/1t94ie9/scaling_product_image_matching_across_150_brand/

## Leg 3B — the 9 asking posts that use "solo founder", read individually

The brief allowed 30; the corpus supplies 9, so all 9 were read. **SELF** =
explicit ("I'm a solo founder"). **IMPLIED** = generic phrasing about a class the
author plainly belongs to. **OTHERS** = used of a customer, a client, or the reader.

| id | Sub | Uses it of | Score | Why |
| --- | --- | --- | ---: | --- |
| 1p3wo6a | startups | SELF | 0 | "suggestions for an new solo founder in this phases?" |
| 1psf3l1 | buildinpublic | OTHERS | 1 | "if you're a solo founder or indie maker" — his buyer |
| 1qgkcb4 | SaaS | IMPLIED | 20 | "sucks for a solo founder", describing his own projects |
| 1ruri4g | EntrepreneurRideAlong | OTHERS | 0 | a client of his agency work |
| 1t95x3u | EntrepreneurRideAlong | IMPLIED | 1 | "how solo founders here handle this?"; "I am one person" |
| 1tzoqzp | buildinpublic | SELF | 3 | "I'm a solo founder." |
| 1tzos0u | microsaas | SELF | 1 | same author, same post, cross-posted |
| 1tzrp1h | SaaS | IMPLIED | 0 | "For solo founders…", his own SaaS stalled at 3 sales |
| 1uob4kr | SaaS | SELF | 5 | "Currently I am solo founder with the help of AI" |

| Class | Posts | Authors |
| --- | ---: | ---: |
| SELF | 4 | 3 |
| IMPLIED | 3 | 3 |
| OTHERS | 2 | 2 |

**Self-applied (SELF + IMPLIED): 7 posts / 6 of the 8 distinct asking authors.**
Two use it of somebody else.

Verbatim, one per class:

> "I'm a solo founder." — r/buildinpublic,
> https://www.reddit.com/r/buildinpublic/comments/1tzoqzp/spent_36_days_building_this_for_myself_150/

> "the problem is that executing a mobile strategy usually sucks for a solo founder." — r/SaaS,
> https://www.reddit.com/r/SaaS/comments/1qgkcb4/why_i_stopped_building_webonly_saas_and_how_i/

> "The bundle is the play if you're a solo founder or indie maker." — r/buildinpublic,
> https://www.reddit.com/r/buildinpublic/comments/1psf3l1/just_shipped_a_marketing_skill_kit_for_claude/

## Leg 5 — do these two populations talk about money?

The script numbers this section LEG 5. Its LEG 4A and 4B are the verbatim quote
blocks printed above under Leg 3A and Leg 3B; its LEG 4C is the corpus window
and the sensitivity check, both reported here under Limits.

`WALL_WORDS` and `MONEY_WORDS` imported verbatim from `compare_rooms.py`, and
reproduced below exactly as the script prints them, so the two lexicons can be
audited from this file alone rather than by re-running the script:

```
WALL_WORDS  = \b(?:deploy|deployment|production|prod|localhost|works locally|build fail|broke|broken|bug|error|crash|refactor|rewrite|rewrote|auth|database|migration|env var|environment variable|docker|ci|pipeline|stack trace|typescript|hydration|latency|timeout)\b
MONEY_WORDS = \b(?:revenue|mrr|arr|churn|pricing|price|paid|customer|subscriber|conversion|signup|sign.?up|acquisition|funnel|cac|ltv|paying|monetis|monetiz|charge|invoice|sales?|lead)\b
```

Both are lists of single generic words and short technical terms; the longest
entries in either are "environment variable" and "works locally". `WALL_WORDS`
carries "broke" and "broken" as bare words, and does not contain the word "wall"
despite the variable's name. Wall and money are non-exclusive columns; "both"
and "neither" are exclusive.

| Population | Posts | Wall | Money | Both | Neither |
| --- | ---: | ---: | ---: | ---: | ---: |
| all asking posts | 607 | 28% | 32% | 8% | 49% |
| — business-room asking | 284 | 20% | 52% | 13% | 42% |
| — developer-room asking | 323 | 35% | 14% | 4% | 55% |
| asking + any vibe-cod\* | 19 | 42% | 42% | 26% | 42% |
| asking + "solo founder(s)" | 9 | 33% | 78% | 33% | 22% |

## Verdicts

The bar the 2026-09-03 Fable leg set: **at least 8 distinct asking authors for a
headline word.**

**"vibe coding" — ATTESTED corpus-wide, and it fails the bar in the room the
book is being sold in.** Across all seven spellings, 19 of the 567 distinct
authors of the 607 asking posts use it; the bigram alone accounts for 10 of
those 567, which is the published figure the phrase bank killed. Across all
4,464 bodies it is 146 of 3,842 distinct authors. That figure is not comparable
to the ranked table in §3 of `handoff/01-REDDIT-EVIDENCE.md`, which counts
distinct authors of the 607 asking posts and is filtered to phrases commoner
among askers than among showcasers. On the table's own terms the vibe family is
19 of 567 asking authors against 41 of 929 showcase authors, so it leans
showcase and that filter would have excluded it. But the split is lopsided: 12
of the 307 developer-room asking authors against **7 of the 261 business-room
asking authors**, one short of the bar. The kill is overturned on the facts. The word is real, common, and
in the wrong room.

The register finding matters more than the count. Of the 19 asking posts, 12
apply the label to their own build, 4 use it to dismiss or warn, and 3 use it as
a bare topic word. Three of the twelve self-labellers *also* use it against other
people in the same post — a builder can call his own work vibe-coded and refuse
to hire a vibe coder in the same breath. That is a word carrying its own
contempt. Roughly one asking post in five that uses the word — 4 of the 19 —
uses it to dismiss or warn and never to describe the author's own work, and the
most dismissive uses come from the people with the most standing: a CTO hosting
his colleagues' apps, a staff engineer who inherited a monolith, a frontend
developer who can spot the UI at a glance.

**"solo founder" — ATTESTED, exactly at the bar, and only because the plural
counts.** 8 of the 567 distinct asking authors, across 9 posts; one of those
posts is a cross-post, so ranking by posts would have reported 9 and been wrong.
The singular alone is 6 of 567, which reproduces `emergent-language.json` and
the earlier Fable ruling exactly. The kill is overturned. The room split is
absolute: all 8 are in the business subs and **0 are in the developer subs**.
Nothing else in the noun table comes close — "technical founder" 5, "indie
hacker" 3, "solo dev" 3, "solo developer" 2, "non-technical founder" 2,
"bootstrapped founder" 1, and the site's own "solo builder" **1 of 567**. Six of
the eight authors use it of themselves; the other two use it of a customer or a
reader they are selling to, which is worth noticing, because a noun that
marketers already point at buyers is a noun readers have been sold to with before.

**The two findings point in opposite directions, and that is the useful part.**
"Solo founder" is a business-room word with zero developer-room presence; the
vibe family is a developer-room word that misses the business-room bar. The book
addresses one audience with a noun the business room uses and a build-method
word the developer room uses. Read against the go-to-market question the arc is
deciding: the audience noun is safe to lead with, the method word is not. If the
method word appears in a headline it should describe the *work*, never the
*reader*. In 4 of the 19 asking posts that use any vibe-cod\* spelling — 21% —
the word is aimed at somebody else's work to dismiss it, and the sales page
cannot know which fifth of its readers is reading it that way.

One incidental data point for the candidate chapter 11 subject: the single
highest-lift landing-page-adjacent post in this set is `1tzraiv`, a r/SaaS
asking post titled "How to make your UI not look vibe coded?" — someone whose
stated problem is that the AI-built page *looks* AI-built. That is a conversion
problem described as a craft problem, and it sits in the business room.

## Phrase-bank entries

Exactly the shape of the `attested` entries in
`01-APPENDIX-phrase-bank-attested.json`, printed by the script. **That file was
not edited by this cut.**

```json
[
 {
  "phrase": "vibe coding",
  "count": "19 distinct ASKING authors across all spellings (vibe coding / vibe-coding / vibecoding / vibe coded / vibe-coded / vibe code / vibe coder) of the 567 distinct authors of the 607 asking posts; 10 for the bigram 'vibe coding' alone, which reproduces reference/emergent-language.json exactly (authors 10, posts 10, rank 43 of 400); 146 distinct authors across all 4,464 bodies; only 7 of the 261 business-room asking authors",
  "source": "C:/Users/micah/Code/reddit-research/reference/emergent-language.json -> asking_vocab entry {\"phrase\": \"vibe coding\", \"authors\": 10, \"posts\": 10}; re-measured against data/corpus.jsonl by cuts/cut_g_reattest.py (2026-09-04); reported in .planning/research/04-CUT-G-reattest-vibe-solo.md",
  "slot": "BODY and SUBHEAD, not the headline noun for the business room. Clears the >=8 bar corpus-wide (19 asking authors) and misses it in the room the Fable leg ruled the book sells in (7 of 261). Register: of the 19 asking posts that use it, 12 apply it to their own build, 4 use it to dismiss or warn. Room: DEVELOPER-leaning (12 of 307 dev asking authors vs 7 of 261 business). Overturns the 2026-09-04 kill, whose stated reason was that the count of 10 was not on disk; it is on disk in the corpus repo."
 },
 {
  "phrase": "solo founder",
  "count": "8 distinct ASKING authors (9 posts, one of them a cross-post) of the 567 distinct authors of the 607 asking posts, counting singular and plural; 6 authors / 7 posts for the singular alone, which reproduces reference/emergent-language.json exactly (authors 6, posts 7, rank 102 of 400); 69 distinct authors across all 4,464 bodies; 8 of the 261 business-room asking authors and 0 of the 307 developer-room ones",
  "source": "C:/Users/micah/Code/reddit-research/reference/emergent-language.json -> asking_vocab entry {\"phrase\": \"solo founder\", \"authors\": 6, \"posts\": 7}; re-measured against data/corpus.jsonl by cuts/cut_g_reattest.py (2026-09-04); reported in .planning/research/04-CUT-G-reattest-vibe-solo.md",
  "slot": "HEADLINE NOUN for the business room, at the bar and not above it: 8 of 567 asking authors, all 8 of them in the business subs and 0 in the developer subs — the only self-description noun that clears >=8. Rivals, distinct asking authors of 567: solo builder 1, solo dev 3, solo developer 2, indie hacker 3, non-technical founder 2, bootstrapped founder 1, technical founder 5. 6 of the 8 use it of themselves. Overturns the 2026-09-04 kill; confirms the earlier ruling to prefer it over the site's 'solo builder'."
 }
]
```

## Limits

- **This cut cannot see incidence, only vocabulary.** 19 asking authors saying
  "vibe coding" is not 19 potential buyers, and 4,445 posts not saying it is not
  evidence that those people build differently. People who ship without posting,
  people under NDA, and people whose failure is embarrassing are all absent.
- **A zero is weak.** "solo founder" scoring 0 in 307 developer-room asking
  authors is a real asymmetry, but the corpus is a set of sampled windows drawn
  through a fuzzy third-party archive, not a census of those subreddits.
- **The classification is one reader's judgment on 28 posts** (19 vibe + 9 solo,
  a count the script prints). SELF vs PEJORATIVE is a call, and the tie-break
  rule (self-application wins) is stated precisely so a second reader can
  overturn it. Three posts sit on that line; reclassifying all three as
  PEJORATIVE moves the register split from SELF 63% / PEJ 21% to SELF 47% /
  PEJ 37% and changes the recommendation.
- **Eight is a small number to hang a headline on.** "solo founder" clears the
  bar by zero margin and only with the plural folded in. One more cross-post
  discovered, or one author reclassified, and it fails.
- **Spelling coverage is finite.** The seven spellings named in the brief plus
  the union regex will miss "vibe-coder", other inflections, and anything the
  cleaner strips — the union pattern is printed in the script so the gap can be
  audited.
- **The corpus is a year old at the far end.** The script reads `created_utc`
  across the 4,464 bodies and prints the window: **2025-09-23 to 2026-08-03**.
  "vibe coding" is a term whose connotation is still moving. The 21% pejorative
  share — 4 of the 19 asking posts using any vibe-cod\* spelling — is a
  measurement of that year, not of today.
- **Nothing here tests whether either phrase sells.** Attestation says strangers
  use the word unprompted. It says nothing about click-through, conversion, or
  whether a buyer who calls himself a solo founder will pay $99.
- **One comparison was withdrawn under review (2026-09-04).** The Verdicts
  section originally read "146 of 3,842 distinct authors — larger than any term
  in the published §3 table". The §3 table ranks distinct authors of the 607
  asking posts, so a count over all 4,464 bodies is not comparable to it; the
  claim has been replaced with the like-for-like figures (19 of 567 asking
  authors against 41 of 929 showcase authors, which §3's asker-skew filter would
  have excluded). No quotation was removed. Every quoted fragment in this file —
  36 of them, extracted mechanically from the blockquotes and the "why" columns —
  was re-checked against the raw `title`/`body` fields of the right post in
  `data/corpus.jsonl`, normalising case, whitespace and curly quotes and treating
  an ellipsis as a truncation mark; all 36 are verbatim. The script also asserts
  each of the 17 quotes it prints against the corpus before printing it.
