# Cut D — The competitive set

Produced 2026-09-04 by an Opus agent in the book arc

**Script:** `C:/Users/micah/Code/reddit-research/cuts/cut_d_competitive_set.py`
Run it from the repo root with `.venv/Scripts/python.exe cuts/cut_d_competitive_set.py`.
Every number below is printed by that file. Nothing here is book copy.

**Denominators, reproduced before anything else ran (the script asserts all seven
and stops if any moves):** 5,456 corpus lines · **4,464 posts** with
`len(clean(body)) >= 250` · **3,842 distinct authors** · **607 asking posts**
(`STUCK.search(clean(title + '. ' + body))`) from **567 distinct authors** ·
**284 asking posts / 261 authors** in the five BUSINESS subs (SaaS,
buildinpublic, microsaas, startups, EntrepreneurRideAlong). DEVELOPER subs are
nextjs, cursor, ClaudeAI, webdev, ChatGPTCoding.

## How to read this

Every corpus count here is a count of **public Reddit posts**, so it is evidence
about **language** — what this audience names out loud — and not about market
size. A zero is weak evidence of absence: the archive's text search is fuzzy,
people cite things without naming them, and the sample excludes everyone who
solved the problem quietly. All counting is by **distinct author**, never by post
frequency, because cross-posts are common; score and comment count appear only as
descriptive columns and were never used to rank, filter or sample. A regex hit is
a candidate, not a finding — every candidate in Leg 1 was opened in full and
classified by hand, and the rejections are printed with their reasons. That
applies to the Leg 1g disappointment lexicon too: it hits 9 posts, one of which
does not survive reading, so the lexicon count and the hand-read count are
printed separately and are different numbers. Every lexicon is printed in the
script output so it can be audited; none was written from the book's or the sales
page's own sentences. Quotes are cut at 25 words from the raw post text, and
every one in this file was re-checked mechanically as a verbatim substring of the
post at its permalink. The outer quote marks are this file's, not the poster's, so a quote
ending mid-sentence — sometimes part-way through a quotation the poster was
themselves making — is the 25-word cut, not the end of what they wrote. Leg 2 is
the open web read on 2026-09-04; a row marked UNVERIFIED could not be fetched
today.

---

## Leg 1 — What this audience actually names

### Table 1a. The seed list, over all 4,464 posts and the 607 asking posts

CAND = regex candidates. CONF = confirmed by reading each one. AUTH = distinct
authors over CONF. ASKP / ASKA = confirmed posts and distinct authors inside the
607-post / 567-author asking corpus.

| Item | CAND | CONF | AUTH | ASKP | ASKA | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Refactoring UI | 0 | 0 | **0** | 0 | 0 | no candidate anywhere in 4,464 posts |
| Zero to Sold | 0 | 0 | **0** | 0 | 0 | no candidate anywhere in 4,464 posts |
| The Embedded Entrepreneur | 0 | 0 | **0** | 0 | 0 | no candidate anywhere in 4,464 posts |
| Demand Curve | 0 | 0 | **0** | 0 | 0 | no candidate anywhere in 4,464 posts |
| The Mom Test | 5 | 4 | **4** | 0 | 0 | 1 of 5 rejected by hand |
| The Lean Startup | 3 | 3 | **3** | 1 | 1 | all confirmed |
| Obviously Awesome / April Dunford | 0 | 0 | **0** | 0 | 0 | no candidate anywhere |
| Traction (Wickman / Weinberg) | 3 | 1 | **1** | 0 | 0 | 2 of 3 rejected by hand |
| $100M Offers / Alex Hormozi | 2 | 2 | **2** | 0 | 0 | all confirmed |
| Rob Walling / SaaS Playbook / MicroConf | 5 | 1 | **1** | 0 | 0 | 4 of 5 rejected by hand |
| Arvid Kahl / The Bootstrapped Founder | 4 | 0 | **0** | 0 | 0 | 4 candidates, all false positives |
| Pieter Levels / levelsio | 2 | 2 | **2** | 1 | 1 | all confirmed |
| Marc Lou / ShipFast | 3 | 0 | **0** | 0 | 0 | 3 candidates, all false positives |
| Indie Hackers | 31 | 10 | **10** | 1 | 1 | 21 of 31 rejected by hand |
| Starter Story | 3 | 3 | **3** | 2 | 2 | all confirmed |
| Lenny's Newsletter / Lenny Rachitsky | 1 | 1 | **1** | 0 | 0 | all confirmed |
| Y Combinator / YC / Paul Graham | 19 | 18 | **17** | 8 | 7 | 1 of 19 rejected by hand |
| **Product Hunt** | 73 | 73 | **66** | 6 | 6 | all 73 confirmed by hand |
| Show HN / Hacker News | 9 | 9 | **9** | 0 | 0 | all confirmed |
| Justin Welsh | 0 | 0 | **0** | 0 | 0 | no candidate anywhere |
| Dan Koe | 0 | 0 | **0** | 0 | 0 | no candidate anywhere |
| Growth.Design | 0 | 0 | **0** | 0 | 0 | no candidate anywhere |
| Harry Dry / Marketing Examples | 0 | 0 | **0** | 0 | 0 | no candidate anywhere |
| First 1000 / Ali Abouelatta | 1 | 0 | **0** | 0 | 0 | 1 candidate, a false positive |
| Julian Shapiro | 0 | 0 | **0** | 0 | 0 | no candidate anywhere |

**13 of the 25 seeded items are named by zero authors** in 4,464 posts by 3,842
people. Paul Graham: zero. Refactoring UI — the book whose $99/$149 ladder this
book copies — zero.

### Table 1b. One verbatim quote per confirmed item

Score and comments are descriptive only. Permalink is the reference; no handles.

| Item | Quote (verbatim, ≤25 words) | Sub · score/comments · permalink |
| --- | --- | --- |
| The Mom Test | "ROAS > 1, then scale. * ROAS < 0.6 or no spend: * App lacks demand: talk to users, apply The Mom Test principles. *" | r/SaaS · 5/8 · https://www.reddit.com/r/SaaS/comments/1nt236q/how_to_go_from_0_to_200kmonth/ |
| The Lean Startup **[asking]** | "had to hire a part time support person way sooner than we planned. This is the stuff the "lean startup" gurus conveniently forget to mention." | r/SaaS · 432/140 · https://www.reddit.com/r/SaaS/comments/1ogq0vu/i_wasted_50k_because_i_thought_the_code_was_the/ |
| Traction (Wickman) | "CHART, WE NEED ACCOUNTING?!?! Still running a $10m business on a spreadsheet. Read the book “Traction” by Gino Wickman. Promoted an agent to operations. PRO" | r/EntrepreneurRideAlong · 0/27 · https://www.reddit.com/r/EntrepreneurRideAlong/comments/1r5ila3/i_bootstrapped_a_40m_company_over_night/ |
| $100M Offers / Hormozi | "Learning * Study business models and ads from CalAI, Rise, Quittr via Meta Ad Library. * Read $100M Offers and $100M Leads by Alex Hormozi." | r/SaaS · 5/8 · https://www.reddit.com/r/SaaS/comments/1nt236q/how_to_go_from_0_to_200kmonth/ |
| Rob Walling | "plugins for bubble and monday dot com, based on the Stair step approach of bootstrapping by Rob Walling. Now I’m honestly confused about where to" | r/EntrepreneurRideAlong · 1/0 · https://www.reddit.com/r/EntrepreneurRideAlong/comments/1t99mep/been_grinding_for_4_years_should_i_focus_on/ |
| Pieter Levels **[asking]** | "find a job after taking 5 years of break due to taking care of my child. I got inspired by levelsio and make startup projects" | r/ClaudeAI · 0/10 · https://www.reddit.com/r/ClaudeAI/comments/1ogkfmg/earning_money_from_claude_made_apps/ |
| Indie Hackers **[asking]** | "set your tone and posting frequency and it generates ready to use posts for Reddit, X, and Indie Hackers. the part I use most is" | r/buildinpublic · 1/0 · https://www.reddit.com/r/buildinpublic/comments/1t9edaa/appsaas_founders_are_cooked_at_marketing_i_was/ |
| Starter Story **[asking]** | "I analyzed 19 Starter Story interviews to find what actually gets founders to $10K MRR - here are the patterns. **TL;DR:**" | r/SaaS · 77/63 · https://www.reddit.com/r/SaaS/comments/1r5u6qu/i_analyzed_19_starter_story_interviews_to_find/ |
| Lenny Rachitsky | "they build relationships that no cold email sequence can. **5. one channel, stupidly deep** lenny rachitsky analyzed how the biggest apps got their first users" | r/microsaas · 11/10 · https://www.reddit.com/r/microsaas/comments/1r5dk0j/i_noticed_every_founder_asks_ai_the_same_first/ |
| Y Combinator **[asking]** | "the post. Trigger curiosity instead. * Turn any life event into content: "Got rejected from YC? Post about it. Paid 5 influencers and it flopped?" | r/SaaS · 77/63 · https://www.reddit.com/r/SaaS/comments/1r5u6qu/i_analyzed_19_starter_story_interviews_to_find/ |
| **Product Hunt [asking]** | "and real users into the system. Here’s everything we’re currently doing: **1. Launching on Product Hunt** Mostly for visibility and early feedback, although I know" | r/SaaS · 2/3 · https://www.reddit.com/r/SaaS/comments/1t9mfzo/how_do_you_guys_start_marketing_me2_saas_and_get/ |
| Show HN / Hacker News | "Show HN: The truth layer. Hey r/SaaS, You guys have no idea how much value I’ve got from reading all" | r/SaaS · 2/1 · https://www.reddit.com/r/SaaS/comments/1ogp5fl/show_hn_the_truth_layer/ |

### Table 1c. The rejections — why a regex hit was not a finding

| Post | Rejected because |
| --- | --- |
| 1nspdqk | The Mom Test: a headline-readability heuristic ("would your mom understand"), not Fitzpatrick's book |
| 1p4s0f8 | Traction: the metric, used as a bullet label |
| 1nrspf0 | Traction: part of the poster's own Notion product name |
| 1r5u6qu | Walling: "B2B SaaS Playbook" is the poster's own coinage |
| 1ogm82z, 1ogbt70, 1tzmezr | Walling: generic "MicroSaaS playbook" — twice, a bundle the poster sells |
| 1r5lf6p, 1tzj3np, 1psfj4d, 1sjhupi | Arvid Kahl: "bootstrapped founder(s)" as an audience descriptor or self-description |
| 1t9edaa, 1sjvaqg, 1r3cz8j | ShipFast: "ship fast" as a verb phrase |
| 1ns2oxz | First 1000: "free for the first 1000 users" — a pricing offer |
| 1ogp5fl | YC: the string is a `news.ycombinator.com` link; counted under Hacker News |

Plus **21 of the 31 Indie Hackers candidates**, which use "indie hackers" only as
a name for the reader ("Hey indie hackers", "built for indie hackers"), never as
a place the poster goes for advice.

### Table 1d. The discovery pass

Capitalised two-to-four-word titles within 60 characters of *book, read, course,
newsletter, podcast* or *recommend*, over all 4,464 posts.

**296 candidate strings. 18 reach two or more distinct authors. Not one of the 18
is a book, a course, a newsletter, a podcast or a creator.** Here they are, in
full: So I (11) · Claude Code (9) · Cache Read (4) · If I (4) · When I (4) ·
Should I (3) · Then I (3) · Best IPTV (2) · But I (2) · Cache Write (2) · IPTV
Smarters (2) · OS. I (2) · Recommended IPTV (2) · Server Actions (2) · Server
Component (2) · So I'm (2) · The AI (2) · What I (2).

Hand-reading the whole candidate list, these are the only real named works:

| Work | Sub | Authors | Note |
| --- | --- | ---: | --- |
| Traction, Gino Wickman | EntrepreneurRideAlong | 1 | also a seed hit |
| The Win Without Pitching Manifesto, Blair Enns | EntrepreneurRideAlong | 1 | new |
| MJ DeMarco | EntrepreneurRideAlong | 1 | new |
| Trust Me, I'm Lying, Ryan Holiday | EntrepreneurRideAlong | 1 | new |
| Contagious, Jonah Berger | EntrepreneurRideAlong | 1 | new |
| Designing Data-Intensive Applications, Kleppmann | webdev | 1 | new, engineering |
| Harvard CS50 / Karpathy Neural Nets / 3Blue1Brown | startups | 1 | new, engineering |
| Aspireship / CourseCareers / AWS Cloud Practitioner (Udemy) | SaaS | 1 | new, sales career |
| The Debugging Decay Index (a paper) | ChatGPTCoding | 1 | new, engineering |
| SuperClaude Framework | ClaudeAI | 1 | new, a tool |
| $100M Offers / $100M Leads, Hormozi | SaaS | 1 | also a seed hit |
| The Mom Test / Lean Startup | startups | 1 | also a seed hit |

**12 works, in 10 posts, from 10 distinct authors of 3,842.** Nine of them are new
to the seed list, in 7 posts from 7 authors. One r/EntrepreneurRideAlong post
carries three of them and is the corpus's only what-should-I-read thread:

> "subjects. I was listening to a Youtube video with the author MJ Demarco, and
> someone asked him "what book would you recommend to a business"
> — r/EntrepreneurRideAlong · score 3, 2 comments ·
> https://www.reddit.com/r/EntrepreneurRideAlong/comments/1unen1a/the_next_book_you_should_read_is_the_one_that/

### Table 1e. How much of the corpus names anything at all

| | Posts | Denominator | Rate | Authors |
| --- | ---: | ---: | ---: | ---: |
| Names any seeded or discovered item | 125 | 4,464 | 2.8% | 116 of 3,842 |
| …inside the asking corpus | 18 | 607 | 3.0% | 17 of 567 |
| **of which a CHANNEL** (Product Hunt / HN / Indie Hackers / YC) | 105 | 4,464 | **2.4%** | 96 |
| **of which a TEACHER** (a book, course, newsletter, creator) | 20 | 4,464 | **0.4%** | 20 |
| …teacher, inside the asking corpus | 3 | 607 | **0.5%** | 3 of 567 |
| …channel, inside the asking corpus | 15 | 607 | 2.5% | 14 of 567 |

The 20 teacher-naming posts, split with the generic lexicons imported from
`compare_rooms.py` (both printed in the script output):

| Room | Posts | Authors | Wall-words | Money-words |
| --- | ---: | ---: | ---: | ---: |
| BUSINESS subs | 16 | 16 | 3 | 9 |
| DEVELOPER subs | 4 | 4 | 1 | 0 |

Channels, by distinct author: **Product Hunt 66** · Y Combinator 17 · Indie
Hackers 10 · Show HN / Hacker News 9.

### Table 1f. What the askers say about published advice

Three of the 607 asking posts, from 3 of the 567 authors, say anything about
bought or published advice. All three, verbatim:

| Quote (≤25 words) | Sub · score/comments · permalink |
| --- | --- |
| "part time support person way sooner than we planned. This is the stuff the "lean startup" gurus conveniently forget to mention. An MVP isn't just" | r/SaaS · 432/140 · https://www.reddit.com/r/SaaS/comments/1ogq0vu/i_wasted_50k_because_i_thought_the_code_was_the/ |
| "spaces, events, signals, recurring dynamics, contradictions, and evidence. The goal is not generic advice. The goal is to help someone understand what is happening in" | r/buildinpublic · 1/0 · https://www.reddit.com/r/buildinpublic/comments/1tzemhz/what_would_you_call_an_ai_system_that_models_your/ |
| "should transition from "get users at any cost" to "actually charge what it's worth"? I've read a hundred blog posts about this and none of" | r/startups · 16/36 · https://www.reddit.com/r/startups/comments/1sjhupi/i_will_not_promote_we_hit_1_product_of_the_week/ |

### Table 1g. The channel they do name, in their own words

A generic disappointment lexicon (printed in the script) applied only to the 73
hand-confirmed Product Hunt posts, then every hit opened and read. The lexicon
hits **9 posts from 8 distinct authors** of the 66 who name Product Hunt. One of
the nine does not survive reading (below), so what the table carries is **8
posts from 7 distinct authors** — and that 7, not the lexicon's 8, is the number
this file quotes for writing a launch up as a failure. Eight posts but seven
authors because one post is cross-posted to r/buildinpublic and r/microsaas — the
exact reason nothing in this cut counts posts.

| Quote (verbatim, ≤25 words) | Sub · score/comments · permalink |
| --- | --- |
| "I launched on Product Hunt with zero audience. It was a reality check.. I launched my app on Product Hunt today with zero audience. 8" | r/SaaS · 5/6 · https://www.reddit.com/r/SaaS/comments/1uo51ni/i_launched_on_product_hunt_with_zero_audience_it/ |
| "I launched on Product Hunt, got the traffic, got the users... but 0 conversions. What am I missing?. I recently launched [PDFMyHTML](http://www.pdfmyhtml.com) on Product" | r/buildinpublic · 1/0 · https://www.reddit.com/r/buildinpublic/comments/1qgnirk/i_launched_on_product_hunt_got_the_traffic_got/ |
| *(same post, cross-posted)* | r/microsaas · 1/1 · https://www.reddit.com/r/microsaas/comments/1qgno7r/i_launched_on_product_hunt_got_the_traffic_got/ |
| "experimented with: * Posting on Hacker News (minimal traction) * Launching on Product Hunt (no upvotes) * Building in public on Twitter/X (but my account" | r/buildinpublic · 13/16 · https://www.reddit.com/r/buildinpublic/comments/1sjp4uk/what_actually_works_for_marketing_a_tech_startup/ |
| "feel proud of it. Commercially, it is basically invisible. So far I tried: * Product Hunt: almost no traffic * Twitter/X: nobody cared * software" | r/buildinpublic · 1/0 · https://www.reddit.com/r/buildinpublic/comments/1t98jwy/i_think_i_built_the_best_product_in_my_niche_but/ |
| "posted on reddit a few times, some posts hit some didn’t weeks 12-14: launched on product hunt. got maybe 20 real upvotes after the algorithm" | r/buildinpublic · 19/20 · https://www.reddit.com/r/buildinpublic/comments/1tzj3np/150_users_in_100_days_with_0_spent_on_marketing/ |
| "Do you find Product Hunt useful?. I've tried it a few times, but I feel like there's no way to actually acquire any customers or" | r/microsaas · 1/2 · https://www.reddit.com/r/microsaas/comments/1ps5ku1/do_you_find_product_hunt_useful/ |
| "then I can add it to my product discovery website for free. Let's be honest: Product Hunt has lost its way. It’s no longer about" | r/microsaas · 1/33 · https://www.reddit.com/r/microsaas/comments/1tzh4q2/drop_your_startup_then_i_can_add_it_to_my_product/ |

The ninth hit (r/microsaas ·
https://www.reddit.com/r/microsaas/comments/1r5dk0j/i_noticed_every_founder_asks_ai_the_same_first/)
matched on "got maybe 20 upvotes total" about self-posting in startup subs rather
than about Product Hunt. It is excluded, and its author is the difference between
the lexicon's 8 authors and the 7 this file reports.

---

## Leg 2 — The open web, read 2026-09-04

WebSearch and WebFetch only. Every row carries the URL it was read from.
**19 rows; 14 fetched and verified; 5 carry an UNVERIFIED field.**
Promise column: at most 20 verbatim words from the page.

| Item | Price | Format | Promise (their words) | Audience | What it does not cover that this book does | URL |
| --- | --- | --- | --- | --- | --- | --- |
| Refactoring UI | $99 Essentials / **$149 Complete**; teams $399–$2,749 | 218-page PDF + 3 videos; $149 adds gallery, palettes, fonts, 200 icons | "Make your ideas look awesome, without relying on a designer." | Developers who cannot design | Stops at the pixels: no production, no security, no first users. Only the price shape is shared. | https://www.refactoringui.com/ |
| Zero to Sold (Kahl) | $20 ebook / $20 audio / $9.99+ Amazon | Ebook, paperback, hardcover, audiobook | "How to Start, Run, and Sell a Bootstrapped Business" | Bootstrappers, whole lifecycle | Not an engineering manual; assumes you can already build and ship it. | https://zerotosold.com/ |
| The Embedded Entrepreneur (Kahl) | $20 ebook+toolkit / $20 audio / $9.99+ | Ebook + toolkit, audiobook, print | "Embedded Entrepreneurs find customers and build a solution with them." | Audience-first founders | Starts before the build, so has nothing for a thing already built. | https://embeddedentrepreneur.com/ |
| Demand Curve Growth Program | $100/mo billed quarterly (~$1,200/yr) | Membership: 50+ courses, playbooks, templates, AI co-pilot, coaching | "Build your growth engine" | Startups launched, no traction | No engineering content at all; a subscription, not a thing you own. | https://www.demandcurve.com/growth-program |
| The Mom Test | **UNVERIFIED** $10 Gumroad PDF (search snippet; the Gumroad page rendered no price) | Paperback, Kindle, audiobook, PDF | "How to talk to customers & learn if your business is a good idea" | Anyone validating an idea | Pre-build conversations. Nothing about shipping, nothing about selling. | https://www.momtestbook.com/ |
| ShipFast (Marc Lou) | $199 / $249 / $299 bundled | Next.js boilerplate, lifetime updates, unlimited projects | "Ship your startup in days, not weeks" | Indie makers, founders | Code to start from, not judgment about what to do once it is built. | https://shipfa.st/ |
| CodeFast (Marc Lou) | $169 alone / $299 bundled | 12 hours video, 215 lessons, Discord, lifetime | "Learn to code in weeks, not months" | Beginners | Teaches building. Stops at the launch. | https://codefa.st/ |
| Rob Walling's books | $10 ebook / $12–$17 audio / $20 bundle each | The SaaS Playbook, Exit Strategy, Start Small Stay Small, Keeping Your Sh*t Together | "Build a multimillion dollar startup without venture capital" | SaaS bootstrappers past first customers | Strategy above the code. No pre-flight, no deploy day, no Stripe chapter. | https://saasplaybook.com/order |
| "First 100 users" (EverFeatured) | Free (upsell: paid listing) | Blog guide, 12 tactics | "12 tactics that actually work in 2026 for getting real, active users" | Indie makers, SaaS founders, solo builders from zero | Free, generic, not written for something built with AI. | https://www.everfeatured.com/guides/how-to-get-first-100-users |
| "First 1,000 users" (Firsto, Growthmode, Boolean, First 1000 Users Guide) | Free | Blog posts + one interactive guide | **UNVERIFIED** — firsto.co returned HTTP 403; the rest seen only in search results | Founders after launch | Undifferentiated: the same directory list every time. | https://firsto.co/blog/first-1000-users-after-launch |
| Supabase, The Vibe Coding Master Checklist | Free | Blog checklist: security, data, performance, deployment | "Get your app ready for production" | People with an AI-built prototype | Explicitly stops at production. No users, no marketing, no distribution. | https://supabase.com/blog/the-vibe-coding-master-checklist |
| RaftLabs / Clarista / vibecoder.me checklists | Free | Six checks; a 14-point list naming 4–12 weeks; a 25-item list | **UNVERIFIED** — all three URLs 404'd today; recorded from the 2026-09-03 leg | Vibe coders heading to production | Same gap: production only. | https://www.raftlabs.com/blog/vibe-coding-checklist/ |
| Relux Works (vibe-code rescue) | **$3,000 audit** (1 week) / from $10,000 stabilisation / $15,000–$40,000 migration | Done-for-you senior engineering, fixed scope, audit credited | "We take over AI-generated codebases, fix complex bugs AI tools can't, close security holes" | Founders on Lovable, Cursor, Bolt, v0, Replit | Does the work instead of teaching it, at 30× the price, and still stops at production. | https://relux.works/en/vibe-code-rescue/ |
| Wavect (vibe coding rescue) | **UNVERIFIED** — no price on page; "a fixed fee" after a scoping audit | Fixed-scope audit then full rescue | "We read the code the model never did, close the security and data holes, add tests" | Lovable / Bolt / Cursor / Replit / Claude Code builds | Done-for-you, price on application, no distribution. | https://wavect.io/services/vibe-coding-rescue/ |
| AxonBuild rescue-price survey | $299 to $40,000 (their headline range) | Blog survey | **UNVERIFIED** — read from search results only | People pricing a rescue | A price list, not a manual. | https://axonbuild.com/blog/vibe-coding-cleanup-cost |
| Roast My Landing Page (Olly Meakings) | **UNVERIFIED** — the domain now 302s to landingpagesexplained.com; the $350 figure is from the 2026-09-03 leg | 15-minute private video teardown in 48 hours | **UNVERIFIED** — no promise readable from the live page | SaaS and creator founders | One page, one video. No engineering, no product, no sequence. | https://www.roastmylandingpage.com/ |
| roastd.io | Free AI audit / **$179** expert video (from $399) / $2,500 unlimited for a year | Screenshot + AI analysis; up to 20-minute expert video in 48 hours | "Get roasted. Get customers" | Startups and indie makers; agencies at the top tier | One page. Nothing behind it, nothing about what to do next. | https://roastd.io/ |
| **The Vibe Coding Playbook** (Siraj Raval, Wiley) — **not in the 2026-09-03 leg** | **$35 paperback / $21 ebook** | 256-page trade book, published 2026-04-21 | "entrepreneurs with limited (or non-existent) coding skills who want to build profitable software companies" | Non-technical founders using gen-AI code assistants | The nearest direct competitor: AI-built plus business, from a real publisher, at a third of the price. Weighted to building, not to first users. | https://www.barnesandnoble.com/w/the-vibe-coding-playbook-siraj-raval/1148172217 |
| **Vibe Coding Ebook** (vibecodingebook.com) — **not in the 2026-09-03 leg** | **$9/mo or $79/yr** | 24 chapters, 200+ prompts, 10 videos, monthly updates, free 7-page quick start | "The Definitive Guide to AI-Native Development" | Beginner to advanced AI-assisted developers | A subscription, not a manual, and no user-acquisition chapters at all. | https://www.vibecodingebook.com/ |

### The price ladder

| Band | Who is there |
| --- | --- |
| Free | Supabase, RaftLabs, Clarista, vibecoder.me checklists; EverFeatured, Firsto, Growthmode |
| $9/mo, $79/yr | Vibe Coding Ebook |
| $10 | The Mom Test; every Rob Walling ebook |
| $20 | Zero to Sold; The Embedded Entrepreneur |
| $21–$35 | The Vibe Coding Playbook (Wiley) |
| **$99 / $149** | **Refactoring UI — and The 80% Wall** |
| $169–$299 | CodeFast; ShipFast; the two bundled |
| $179 | roastd.io expert video |
| ~$350 | Roast My Landing Page (UNVERIFIED) |
| ~$1,200/yr | Demand Curve Growth Program |
| $2,500 | roastd.io unlimited, one year |
| $3,000–$40,000 | Relux Works vibe-code rescue; AxonBuild puts the market at $299–$40,000 |

---

## Findings

**1. This audience does not have a canon, and the book is not competing with one.**
Across 4,464 posts from 3,842 people, exactly **20 posts by 20 authors — 0.4% —
name a book, a course, a newsletter or a teacher of any kind.** Inside the 607
asking posts it is **3 posts by 3 authors, 0.5%**. Thirteen of the twenty-five
seeded names draw zero. Nobody in this corpus has heard of Refactoring UI, Zero
to Sold, The Embedded Entrepreneur, Demand Curve, April Dunford, Justin Welsh,
Dan Koe, Growth.Design, Harry Dry, Julian Shapiro or Paul Graham — or at least
nobody says so. The competitive set the operator has been benchmarking against is
invisible to the people the book is for.

**2. What they name instead is channels, at six times the rate.** 105 posts and
**96 distinct authors** name a place to post — Product Hunt, Hacker News, Indie
Hackers, YC — against 20 authors naming anything that teaches. **Product Hunt
alone is 66 distinct authors, more than three times every book, course and
creator in this cut combined.** Read one by one, some of those Product Hunt posts
are launch post-mortems: a generic disappointment lexicon hits 9 of the 73, and 8
posts from **7 distinct authors** survive reading as post-mortems, quoted with
permalinks in Table 1g. Seven authors is 0.2% of 3,842, so that is a finding
about how those seven write, not a measurement of what this audience as a whole
knows or does not know. The claim the corpus does support at scale is the
asymmetry itself: 96 authors name somewhere to push the button, 20 name anyone
who teaches, and every disappointment this cut can see is written from after the
button rather than before it. That is a distribution-shaped hole, and it is
shaped like chapters 8 and 9.

**3. "Indie Hackers" is what they call themselves, not where they go.** 21 of the
31 candidate posts use it as an audience label — "Hey indie hackers", "built for
indie hackers" — and only 10 as a place. Combined with the published package's
finding that r/indiehackers had 1 engaged post in 100, the community that named
this whole identity is now mostly a demographic noun.

**4. The discovery pass is the strongest negative result in the cut.** 296
capitalised title-shaped strings sit within 60 characters of *book*, *read*,
*course*, *newsletter*, *podcast* or *recommend*. Eighteen reach two authors.
Every one of the eighteen is a sentence opener ("So I", "When I"), a tech term
("Server Actions", "Cache Read"), or IPTV spam. To find a genuinely named work you
have to go down to single authors, and there are nine of them, seven posts, seven
people. The corpus contains **one** what-should-I-read thread in twelve months.

**5. The one book-shaped signal that does exist is not a how-to; it is a
complaint about how-tos.** The single loudest asking post naming any of this
(432 score, 140 comments) says the *"lean startup" gurus conveniently forget to
mention* the operational cost of an MVP. The third says *"I've read a hundred
blog posts about this and none of"* answer the question. Where this audience
engages with published advice at all, the register is *it did not go far enough*.

**6. On the open web the field is barbelled, and the $99–$149 band is nearly
empty.** Below $35 sit every book that treats this subject — The Mom Test, Walling,
Kahl, and now Wiley's *The Vibe Coding Playbook* at $21–$35. Above $1,200 sit
Demand Curve, the teardown retainers, and the rescue shops at $3,000 to $40,000.
Between them this cut found three products: Refactoring UI at exactly $99/$149,
CodeFast at $169, ShipFast at $199–$249. **All three teach you to build, and none
of the three promises users** — Refactoring UI stops at the pixels, CodeFast
stops at the launch, ShipFast ships a boilerplate. Three is a spot-check, not a
census: Leg 2 priced the named competitors in the brief, it did not enumerate
everything sold between $99 and $299, so read this as the band being thin where
the book sits, not as proof the band is empty.

**7. Two new competitors the 2026-09-03 leg did not have.** *The Vibe Coding
Playbook* (Siraj Raval, Wiley, published 2026-04-21, $35/$21, 256 pages) is the
nearest direct rival: AI-built plus business, from a real publisher, at a third of
the price — but its own description is weighted to building, and it does not
promise first users. *Vibecodingebook.com* ($9/mo, $79/yr, 24 chapters, 200+
prompts) has explicitly no user-acquisition chapters. Neither closes the gap; both
compress the price.

**8. The free tier owns production, and only production.** Supabase's checklist
verbatim promises to *"Get your app ready for production"* and, confirmed on the
page, covers no marketing, no acquisition, no distribution. So do RaftLabs,
Clarista and vibecoder.me. Chapters 1–7 of this book are competing with free
content that stops in exactly the same place. Chapters 8–10 are competing with
generic listicles and a $1,200/yr membership.

### Where a $99-launch / $149-later, engineering-plus-first-users manual sits

It sits in a band this corpus has never heard of, at a price only Refactoring UI
occupies, promising the one thing the free tier stops short of. That is not a bad
position — it is an unattested one, and the two halves of the promise are attested
very unequally. The engineering half competes with free checklists and with
$3,000 rescues, and 0.4% of this audience names any teacher at all (Table 1e: 20
posts of 4,464, 20 authors of 3,842), so the book cannot win on authority it does
not have. The first-users half competes with free listicles that 96 distinct
authors' worth of channel-talk suggests are not working: they know Product Hunt,
66 of them name it, and 7 of those write it up as a failure (Table 1g) — *"I
launched on Product Hunt, got the traffic, got the users... but 0 conversions.
What am I missing?"* (r/buildinpublic,
https://www.reddit.com/r/buildinpublic/comments/1qgnirk/i_launched_on_product_hunt_got_the_traffic_got/).
The two sentences that most directly license this book are an asker at 432 score saying
the *"lean startup" gurus conveniently forget to mention* what it actually costs
to run the thing, and one at 16 saying *"I've read a hundred blog posts about this
and none of"* answered the question. Both are complaints that the existing
material is too shallow, not that it is missing. **Go-to-market should lead with
the day after the launch button, because that is where these posts are written
from — and it should sell depth against free advice, not novelty, because the
audience is not comparison-shopping a canon it has never named.**

---

## Limits

- **A count of public posts is evidence about language, never about market size.**
  Nobody naming Refactoring UI does not mean nobody owns it; it means nobody
  mentioned it in a Reddit post over twelve months. People cite ideas without
  citing sources constantly, and this cut can only see the citation.
- **A zero is weak evidence of absence.** The archive's text search is fuzzy, the
  corpus is twelve 10-day windows and not a census, and 5,456 posts from ten subs
  is a keyhole.
- **The seed list is the brief's, not the audience's.** It was chosen from the
  operator's competitive frame. The discovery pass exists to correct that, but a
  60-character proximity window around six cue words will miss any recommendation
  phrased without them.
- **The discovery pass cannot see lowercase or single-word names** (`levelsio`,
  `hormozi`, a bare URL), and it drowns in sentence openers. Its negative result
  is strong; its positive result is a floor, not a ceiling.
- **"Channel" versus "teacher" is my classification, not the posters'.** A YC talk
  or a Starter Story interview is arguably both. Product Hunt was counted as a
  channel throughout, which is the reading its 73 posts support but not the only
  one.
- **Leg 2 is one day's snapshot of live pricing.** Five rows are UNVERIFIED and
  say so. Relux Works' front page today reads *"Fixed-price MVPs: From $20k"*
  while its rescue page still shows the $3,000 audit the same day — that front
  page is not a competitor row and is not in the ladder, so it is captured
  separately in the script's live spot-check block. Roast My Landing Page's domain
  now redirects away, so its $350 is carried from the 2026-09-03 leg and could be
  stale. Prices move; the ladder's *shape* is the durable finding, not its rungs.
- **This cut cannot see** what any of these products actually sell — conversion,
  refunds, repeat purchase — nor whether anyone in the corpus bought any of them
  and simply did not post about it. It cannot see private communities, Discords,
  paid newsletters, YouTube, or X, which is where the 2026-09-03 leg found most of
  this audience's creators. **A book being unnamed on Reddit is not a book being
  unread.**
- **Corrections applied after an independent skeptic's read, 2026-09-04.** Four
  things were wrong and are now fixed in the script first and this file second.
  (1) The Leg 1g disappointment lexicon shipped carrying the alternative *nobody
  came*, which is verbatim the book's own tagline — confirmation by construction,
  and the exact thing a bottom-up cut exists to avoid. It is deleted. It matched
  zero posts in the 4,464, so no count moved; this was verified by re-running, not
  assumed. No substitute was added, because the nearest corpus-attested candidate
  (*crickets*) matches one further post and would have moved a count. (2) Table
  1g's post-mortem figure was being quoted as the lexicon's 8 authors while the
  table itself displays the 7 that survive its own hand-exclusion. The script now
  prints both numbers; Finding 2 and the closing paragraph now say 7. (3)
  vibecodingebook.com's tagline was quoted with an inserted word, as "AI-native
  software development"; the page reads *"The Definitive Guide to AI-Native
  Development"*. (4) The $20k Relux Works figure above was true but was not
  printed by the script, against this file's opening claim; it is now captured
  there as a live spot-check with its own URL. No corpus quote was removed: every
  quote in this file was re-checked mechanically against the post at its
  permalink and every one is verbatim, including the curly quote marks inside the
  Traction quote in Table 1b, which are the poster's own and are reproduced as
  they appear. The skeptic's read had those marks down as silently normalised to
  straight ASCII; they were not, and the bytes say so.
