# Cut C — Would-pay, revealed

Produced 2026-09-04 by an Opus agent in the book arc

**Script:** `C:/Users/micah/Code/reddit-research/cuts/cut_c_would_pay.py`
(run from the repo root with `.venv/Scripts/python.exe`; it prints every table
below, and `--md-tables` emits the per-post tables as the markdown reproduced here)

**Question:** when people in this corpus name a number or a completed purchase
for help or a resource, is the money on engineering or on distribution, and does
it go to a book, a course, a tool, or a person?

**Denominators**, reproduced by the script before anything else and matching the
published package exactly:

| | posts | distinct authors |
| --- | ---: | ---: |
| corpus lines | 5,456 | |
| bodies with `len(clean(body)) >= 250` | **4,464** | **3,842** |
| ASKING (`STUCK` matched) | 607 | 567 |
| ASKING, five BUSINESS subs | 284 | 261 |
| ASKING, five DEVELOPER subs | 323 | 307 |
| SHOWCASE (`SHOWCASE` matched) | 1,019 | 929 |

**This cut draws its candidates from all 4,464 posts, not from the 607 asking
posts.** Money gets named as often in a victory lap as in a cry for help.

Candidates: **346 posts / 318 distinct authors (7.8% of posts)**. Every one was
opened in full and classified by hand. **105 were kept** — 95 REVEALED, 10
STATED — from **105 distinct authors, 2.7% of the 3,842 authors in the corpus.**
241 candidates were rejected, most of them because the number was the author's
own revenue, their own product's price, their MRR, or somebody else's spend.

## How to read this

Every number here is a count of **public Reddit posts**. It is evidence about
**language** — about what people say they paid for — not about market size, and
certainly not about what a market would pay. A zero is weak evidence of absence:
the archive's text search is fuzzy, the corpus is twelve 10-day windows rather
than a continuous year, and a purchase nobody posted about is invisible here.
Counts are of **distinct authors**, never raw posts; four cross-post groups were
found by hand and collapsed to a single row each before counting, because the
same post appears in up to three subreddits. Nothing is ranked, filtered or
sampled by score: score appears only as a descriptive column, and **60 of the
105 kept rows scored 2 or less** (min 0, median 2, max 699). Every quote —
in the tables and in the narrative below — is verbatim and is verified at runtime
to be a substring of the cleaned post; the corpus preserves Reddit's backslash
escapes, so a quote may contain a literal backslash.

## The instrument

**Candidate rule (i):** a dollar amount, or a number with a `k` suffix, within
120 characters of a purchase verb (`paid, spent, hired, bought, subscribed,
invested, cost me, charged me`, and near neighbours) or of a resource noun
(`course, book, coach, consultant, freelancer, agency, developer, dev,
contractor, upwork, fiverr, audit, ads, marketing, designer, copywriter,
credits, subscription`, and near neighbours).
**Candidate rule (ii):** `would pay, happy to pay, willing to pay, worth paying,
I'd pay`. The full regexes are printed by the script. The printed regex carries a
sixth alternative, `i would pay`, which is redundant: `would pay` already matches
it at a word boundary, and the five-phrase and six-alternative forms select the
identical 39 posts.

**Kept only where the spend is the author's own outlay** — not their revenue,
not the price of their own product, not their MRR, not a client's budget.

- **REVEALED** — a completed purchase, past tense, amount named.
- **STATED** — a declared willingness to pay or a live budget, not yet spent.

**Object.** `ENGINEERING` = paying a human or a firm for engineering work, or
paying for hosting and infrastructure. `DISTRIBUTION` = getting customers: ads,
an agency, a landing page, SEO, outreach, copy, PR, a launch, a paid listing.
`TOOLING` = AI builder credits, model APIs and coding subscriptions used to
build. `MIXED` = the named amount covers more than one object and the post does
not split it — kept as its own bucket rather than guessed at. `OTHER` = legal,
platform fees, exam prep, or a spend the post never explains.

**Form.** `TOOL`, `ADS`, `PERSON-OR-SERVICE`, `COURSE`, `BOOK`, `COMMUNITY`,
`UNSPECIFIED`, `MIXED`.

One row per post: where a post names two outlays, the row carries the larger
named amount and the note records the other. Two rows are flagged
**[suspect]** — one reads as vendor placement, one reads as fiction — and every
count below is reported both with and without them.

## Table 1. The per-post table

### REVEALED rows

| sub | score | object | form | amount as written | verbatim quote (<=25 words) | permalink | note |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| r/SaaS | 2 | DISTRIBUTION | TOOL | $100+ every month | "I was tired of paying $100+ every month for tools packed with upsells and features I never touched" | https://www.reddit.com/r/SaaS/comments/1nsshe0/spent_9_months_to_build_a_new_seo_tool_would_love/ | SEO tool subscriptions (names Ahrefs, Semrush as the expensive incumbents) |
| r/SaaS | 4 | TOOLING | TOOL | Cursor $70, Railway $25, OpenAI $30, Chrome store $5, ElevenLabs $11 | "here is where i spent money : Cursor - $70 Railway - $25. OpenAI API - $30" | https://www.reddit.com/r/SaaS/comments/1oguicg/i_tried_building_saas_prodcut_under_200_and_it/ | itemised; $111 of the $141 is AI tooling, $25 is hosting, $5 a store fee |
| r/SaaS | 432 | OTHER | PERSON-OR-SERVICE | $50k | "We burned through an extra $50k not because our developers were slow, but because we were idiots about what an MVP actually costs" | https://www.reddit.com/r/SaaS/comments/1ogq0vu/i_wasted_50k_because_i_thought_the_code_was_the/ | author says explicitly it was NOT code: legal, ads and support; names a $5,000 lawyer bill inside it |
| r/SaaS | 0 | DISTRIBUTION | ADS | around $250 | "Ran 2 Google Ads campaigns + 1 LinkedIn ad. Total spend: around $250." | https://www.reddit.com/r/SaaS/comments/1ogpt65/hit_10k_users_in_a_day_after_a_1_week_build/ | Google + LinkedIn ads for a directory launch |
| r/SaaS | 0 | OTHER | UNSPECIFIED | $250 | "I spent 3.5 months and $250 and my SaaS still failed" | https://www.reddit.com/r/SaaS/comments/1p4wyie/i_spent_35_months_and_250_and_my_saas_still_failed/ | the post never says what the $250 bought; cross-posted to buildinpublic and nextjs |
| r/SaaS | 1 | TOOLING | TOOL | ~$0.12/min of no-code tooling; ~$80/month per client | "I realized I built a business model where my success might kill me" | https://www.reddit.com/r/SaaS/comments/1p4s0f8/17yo_founder_200_cold_calls_0_mrr_my_unit/ | 17-year-old; no-code voice tooling is his cost of goods; 200 cold calls, 0 sales |
| r/SaaS | 1 | ENGINEERING | PERSON-OR-SERVICE | 10k on Upwork | "Last year when I did this I spent 10k on Upwork and got a garbage result from some chop shop." | https://www.reddit.com/r/SaaS/comments/1pshvqn/mvp_in_2_weeks/ | says 'never again'; this year he will vibe-prototype the MVP himself |
| r/SaaS | 0 | DISTRIBUTION | TOOL | $500/month | "I was using around 45,000 AI credits per month inside Instantly. That was costing me $500/month" | https://www.reddit.com/r/SaaS/comments/1pscwan/psa_for_anyone_doing_cold_email_with_ai/ | cold-email AI credits; moved to his own OpenAI key at $125/month. Cross-posted to microsaas |
| r/SaaS | 1 | DISTRIBUTION | TOOL | maybe $25 | "whole thing cost me maybe $25 for 180 videos" | https://www.reddit.com/r/SaaS/comments/1qglol4/built_an_automated_personalized_video_outreach/ | scraping + enrichment + video APIs for a cold outreach campaign |
| r/SaaS | 22 | DISTRIBUTION | TOOL | $228/month | "I spent $228/month routing website visitors into LinkedIn campaigns. It generates $22,000/month in pipeline." | https://www.reddit.com/r/SaaS/comments/1sg0dd7/i_spent_228month_routing_website_visitors_into/ | three stacked outbound tools |
| r/SaaS | 0 | TOOLING | TOOL | $800/month | "Does anyone actually know if they're using the right AI model for their prompts? Because I didn't — and it cost me $800/month." | https://www.reddit.com/r/SaaS/comments/1sfvkqe/does_anyone_actually_know_if_theyre_using_the/ | model-choice overspend; built a router to fix it |
| r/SaaS | 6 | DISTRIBUTION | ADS | $20 | "I spent $20 on Meta ads for my SaaS. Here's every number and what I learned." | https://www.reddit.com/r/SaaS/comments/1uoh80l/i_spent_20_on_meta_ads_for_my_saas_heres_every/ | 83 landing page visits at $0.24, 0 downloads, 0 form submissions |
| r/buildinpublic | 0 | OTHER | TOOL | $99/year | "My only cost is the $99/year developer account" | https://www.reddit.com/r/buildinpublic/comments/1ogl2qj/experimenting_with_pricing_tiers_90_off_yearly/ | Apple developer program fee named as the entire cost of the product |
| r/buildinpublic | 2 | DISTRIBUTION | ADS | CPC $0.09, CPI $0.33 | "Running small-scale Google Ads (Android, North America only) until next update" | https://www.reddit.com/r/buildinpublic/comments/1ogh6vw/link2me_weekly_report_3_building_in_public/ | unit prices only; the post never names a campaign total |
| r/buildinpublic | 2 | TOOLING | TOOL | $85 upgrade | "From start to beta took about 2.5 weeks and cost me an $85 upgrade from Claude Pro to Claude Max." | https://www.reddit.com/r/buildinpublic/comments/1qgnglf/saved_10k_by_porting_my_ios_app_to_android_myself/ | declined $10-12K developer quotes for the same Android port. Cross-posted to ClaudeAI |
| r/buildinpublic | 0 | TOOLING | TOOL | $1,200+ | "One of us shipped an AI feature on a Friday. By Monday, there was a $1,200+ bill waiting." | https://www.reddit.com/r/buildinpublic/comments/1r5l28f/week_1_of_building_an_api_cost_protection/ | an unintended LLM bill, not a chosen purchase |
| r/buildinpublic | 2 | DISTRIBUTION | TOOL | $55 per 1000 leads | "once I've stacked all the services for scraping, cleaning, finding emails, AI personalization and email verification I suddenly got at $55 per 1000" | https://www.reddit.com/r/buildinpublic/comments/1r5ewn7/i_shipped_lead_gen_ai_agent_in_a_mobile_app_with/ | rebuilt the stack himself to get under $20 per 1000 |
| r/buildinpublic | 1 | MIXED | TOOL | $3 | "I was able to bring the cost down of running my startup to literally just $3" | https://www.reddit.com/r/buildinpublic/comments/1sjsv0e/how_to_run_your_startup_for_free_100_discounts/ | cloud credits + Lovable + domains, hunted for discounts. Cross-posted to microsaas |
| r/buildinpublic | 2 | MIXED | TOOL | ~$80/month | "Total monthly costs: \~$80 (Supabase, API calls, domain)" | https://www.reddit.com/r/buildinpublic/comments/1sjim0n/month_2_building_admitodds_415_users_18_paying/ | hosting + AI API + domain, not split; $0 spent on ads |
| r/buildinpublic | 3 | TOOLING | TOOL | $20 in half an hour | "I did accidentally burn $20 in API costs in half an hour just yesterday after hitting my weekly quota" | https://www.reddit.com/r/buildinpublic/comments/1v61dq3/case_study_i_built_a_job_board_and_made_13k_after/ | also pays Claude Pro; job-board revenue of $1.3k over 6 months |
| r/buildinpublic | 2 | DISTRIBUTION | ADS | $30 | "One of them cost me $30 (sorry, I lied a little about the $0 😅, but almost!)" | https://www.reddit.com/r/buildinpublic/comments/1v60wyj/i_launched_my_first_ai_saas_and_got_2000_users_in/ | a paid bot-directory listing; his single best acquisition channel |
| r/microsaas | 1 | ENGINEERING | TOOL | $4.15/month | "Running production custom domain SaaS for $4.15/month - here's the stack" | https://www.reddit.com/r/microsaas/comments/1p4wk3r/running_production_custom_domain_saas_for/ | Fly.io only; Vercel, Supabase and Resend on free tiers |
| r/microsaas | 1 | MIXED | TOOL | ~$200/mo | "Costs: ~$200/mo (hosting, AI API)" | https://www.reddit.com/r/microsaas/comments/1psk2cz/microsaas_texttoanimation_tool_for_video_editors/ | hosting + AI API, not split; MRR $0, pre-launch |
| r/microsaas | 17 | DISTRIBUTION **[suspect]** | TOOL | under $850 over 4 months | "Total investment over 4 months was under $850. Directory service $127, Shopify $29 monthly, email tool $35 monthly" | https://www.reddit.com/r/microsaas/comments/1ps6cho/from_890month_to_8400_in_4_months_using_organic/ | e-commerce, not software; reads as a written-up case study |
| r/microsaas | 2 | DISTRIBUTION | TOOL | $40 a month | "instead of paying $40 a month for 40 alerts like I did last month you would pay $1.20" | https://www.reddit.com/r/microsaas/comments/1r5naiv/get_called_out_for_being_a_bot_with_listnr/ | social-listening alerts, so he can reply to high-intent posts |
| r/microsaas | 2 | DISTRIBUTION | ADS | $15 CAC per trial start | "I run paid ads to acquire customers at an average of $15 CAC for a Trial start." | https://www.reddit.com/r/microsaas/comments/1r5jvz1/what_do_you_consider_a_good_conversion_rate_for_a/ | 40-50% of trials cancel before expiry |
| r/microsaas | 4 | DISTRIBUTION | ADS | about $85 | "I spent about $85 and got exactly zero signups." | https://www.reddit.com/r/microsaas/comments/1r5he6h/about_a_week_ago_i_got_my_very_first_paying/ | Google Ads at ~$3.50/click; his first paying customer came from a free side tool |
| r/microsaas | 0 | DISTRIBUTION | TOOL | $38/month | "Total: $38/month vs the $100+ I was ready to spend" | https://www.reddit.com/r/microsaas/comments/1r5fh83/tested_8_ai_research_tools_for_my_saas_content/ | content-research stack after testing 8 tools; names a $100/month self-imposed ceiling |
| r/microsaas | 2 | TOOLING | TOOL | $1,300 over 3 years | "I spent $1,300 on a dead project. The idea still won't leave me alone." | https://www.reddit.com/r/microsaas/comments/1rus1yc/i_spent_1300_on_a_dead_project_the_idea_still/ | tool subscriptions that kept billing while the project sat idle |
| r/microsaas | 1 | OTHER | TOOL | $99 Apple Developer fee | "Development cost: my time + $99 Apple Developer fee" | https://www.reddit.com/r/microsaas/comments/1rul449/solobuilt_a_niche_ios_breathing_app_my_micro_saas/ | second author in the set to name the Apple fee as the whole build cost |
| r/microsaas | 1 | TOOLING | TOOL | $15/M operating cost | "How I’m building a Micro-SaaS with a $15/M operating cost" | https://www.reddit.com/r/microsaas/comments/1ruh4te/how_im_building_a_microsaas_with_a_15m_operating/ | free-tier Supabase; the spend is the agentic IDE subscription |
| r/microsaas | 2 | OTHER | COURSE | almost 1k dollars | "I also spent almost 1k dollars on this shit because of expensive courses and stupid decisions." | https://www.reddit.com/r/microsaas/comments/1sjlc42/19yo_from_kazakhstan_built_a_microsaas_for_ielts/ | IELTS exam-prep courses, not business or engineering education. The only COURSE row in the set |
| r/microsaas | 1 | DISTRIBUTION | ADS | $100 on 9 clicks | "I burnt $100 on 9 clicks." | https://www.reddit.com/r/microsaas/comments/1sjk2g2/im_50_and_i_launched_my_first_micro_saas_a_weeks/ | 25-year corporate launch career; also ran Reddit ads before the signup event fired |
| r/microsaas | 1 | DISTRIBUTION | TOOL | $600+/year | "I got tired of paying $600+/year to track my brand mentions." | https://www.reddit.com/r/microsaas/comments/1sjg8lt/i_got_tired_of_paying_600year_to_track_my_brand/ | cancelled and rebuilt the category in a weekend with an AI coding tool |
| r/microsaas | 1 | MIXED | TOOL | $10-50/month | "Total cost to keep it alive is $10-50/month" | https://www.reddit.com/r/microsaas/comments/1uo51tx/got_tired_of_building_standard_ai_chatbots_so_i/ | Vercel + OpenRouter free tier; hosting and model spend not split |
| r/microsaas | 5 | MIXED | TOOL | over $150/mo | "I realized we were wasting over $150/mo on forgotten trials and unused seats." | https://www.reddit.com/r/microsaas/comments/1uo4n4a/why_we_refused_to_use_plaidbank_logins_for_our/ | micro-SaaS tools, AI APIs and hosting platforms, not split |
| r/startups | 29 | MIXED | MIXED | $3-5k monthly | "Monthly spend is like $3-5k (mostly SaaS subscriptions, ads, some freelancer payments)" | https://www.reddit.com/r/startups/comments/1ogv565/best_business_credit_card_for_startup_spend/ | the only row in the set that names tools, ads and people together |
| r/startups | 2 | DISTRIBUTION | ADS | 66 euros | "So I decided to run two ad campaigns here on Reddit since it has a large portion of my target audience" | https://www.reddit.com/r/startups/comments/1og2jn8/is_my_idea_worth_pursuing_after_a_failed_ad/ | euros, so excluded from the USD medians; 257 clicks, 11 waitlist signups |
| r/startups | 5 | OTHER | UNSPECIFIED | around 6k in startup costs | "I’m pre revenue, and have spent around 6k in startup costs." | https://www.reddit.com/r/startups/comments/1p4ktzr/is_it_worth_it_to_pay_someone_to_do_my_taxes_as_a/ | post is about whether to pay an accountant; hesitant because of the cost |
| r/startups | 0 | DISTRIBUTION | UNSPECIFIED | about $1,000 | "Spent about $1,000 on marketing in week one" | https://www.reddit.com/r/startups/comments/1r4qa2q/i_was_given_5_minutes_for_an_investor_pitch_what/ | channel never named; 297 paid downloads in 90 days |
| r/startups | 0 | MIXED | PERSON-OR-SERVICE | thousands of dollars in the hole | "I found a teacher and paid her to be available for when people could book demo classes" | https://www.reddit.com/r/startups/comments/1vdlxqn/looking_for_advice_for_online_language_school_i/ | online language school; paid a teacher AND runs Google + Meta ads; no figure given |
| r/startups | 4 | TOOLING | TOOL | about $100 so far | "I’ve spent about $20 so far in AI costs and they’re also covered by the $200 credits" | https://www.reddit.com/r/startups/comments/1vbqxdp/do_i_need_to_get_lawyer_review_for_my_app_before/ | weighing $500 for a lawyer review of an AI pregnancy app and resisting it |
| r/EntrepreneurRideAlong | 3 | DISTRIBUTION | ADS | $8K over 4 months | "Burned $8K on Facebook and LinkedIn ads over 4 months. Got maybe 12 customers out of it." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1og58ag/whats_working_and_what_isnt_for_saas_growth/ | CAC over $380; also outsourced SEO content and link building, and hired a part-time VA at $800/month |
| r/EntrepreneurRideAlong | 1 | TOOLING | TOOL | under $100 | "Stack cost was under $100 to build." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1qgau75/lessons_from_building_a_grant_search_engine_with/ | ex-investment-banker; Firecrawl, Pinecone, embeddings, Lovable, free-tier Supabase |
| r/EntrepreneurRideAlong | 0 | TOOLING | TOOL | about $200/month in AI subscriptions | "one I had previously been quoted $70k to build" | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1r5pb34/im_a_product_manager_not_an_engineer_new_ai_tools/ | 16-year PM, non-engineer; built the $70k app himself, now pricing it as a service |
| r/EntrepreneurRideAlong | 1 | DISTRIBUTION | PERSON-OR-SERVICE | $150 per SKU | "I was paying a photographer $150 per SKU for lifestyle shots." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1tzgoub/week_12_update_ai_product_photography_saved_me/ | replaced the photographer with about $4 of AI credits for lifestyle shots; kept him for hero shots |
| r/EntrepreneurRideAlong | 0 | DISTRIBUTION | TOOL | around $310/month | "total monthly cost around $310. for multichannel i added Dripify at $79/mo for the linkedin sequences" | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1tz8563/multichannel_vs_email_only_outbound_6_months_of/ | six-month email-only vs multichannel test; cost per meeting $47 vs $89 |
| r/EntrepreneurRideAlong | 2 | DISTRIBUTION | ADS | about $130 | "So far (last two weeks) I've spent about $130 and made 20 sales from this campaign." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1unysy7/looking_for_advice_scaling_ads_reach/ | Facebook ads for a nomad summit; CPL 55 cents |
| r/EntrepreneurRideAlong | 1 | ENGINEERING **[suspect]** | PERSON-OR-SERVICE | $18k-$30k/month for 3 engineers | "Went dedicated offshore for the long-term product build, used staff aug for a security audit and data migration sprint." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1unbm1y/dedicated_offshore_dev_team_vs_staff_augmentation/ | mid-market IT, not a solo builder; names specific vendors and reads as placement |
| r/nextjs | 0 | DISTRIBUTION | ADS | over 500k in two decades | "I’ve spent over 500k in two decades trying to keep my business visible online." | https://www.reddit.com/r/nextjs/comments/1ofh6go/not_a_vc_or_a_tech_bro_i_run_a_moving_company/ | a moving company owner, now building a Next.js/Supabase directory. Largest revealed figure in the set |
| r/cursor | 36 | TOOLING | TOOL | $270 this month | "I've spent $270 this month because Auto is a complete pile of garbage." | https://www.reddit.com/r/cursor/comments/1nsa290/cursors_pricing_is_dumb/ |  |
| r/cursor | 0 | TOOLING | TOOL | $20/month | "I'd prefer to use the credits I'm already paying $20/month for through ChatGPT Plus" | https://www.reddit.com/r/cursor/comments/1nrsteh/connect_chat_gpt_plus_to_cursor_to_use_codex/ | also on a Cursor Pro plan; trying to avoid paying twice |
| r/cursor | 6 | TOOLING | TOOL | $200/month | "Plan: Ultra Spend per month: $200 Usage based pricing limit: $0 (deactivated)" | https://www.reddit.com/r/cursor/comments/1nrpk3f/how_do_you_use_cursor_plans_models_hours_per_day/ | 3-4 hours of coding a day; says the Ultra plan is always maxed out |
| r/cursor | 8 | TOOLING | TOOL | $200 pay-as-you-go on top, $50 used | "accepted $200 in pay as you go billing which says it's used $50" | https://www.reddit.com/r/cursor/comments/1nqsrkw/sort_your_billing_out_cursor/ |  |
| r/cursor | 0 | TOOLING | TOOL | $10 plan | "I also have Windsurf $10 plan, which gives me 500 free requests." | https://www.reddit.com/r/cursor/comments/1nql9oh/i_dont_really_see_the_use_case_of_cursor_anymore/ | argues the same work costs 80% less off Cursor |
| r/cursor | 1 | TOOLING | TOOL | $60 plan, $30-45 used | "I usually spend around $30-45 worth of my $60 in tokens" | https://www.reddit.com/r/cursor/comments/1of5lcx/60_plan_vs_20_with_budget/ |  |
| r/cursor | 99 | TOOLING | TOOL | ~$200/month, then $60 | "Spent like $200/month between subscriptions and API usage thinking the extra autonomy would be worth it" | https://www.reddit.com/r/cursor/comments/1oew917/came_back_to_cursor_after_4_months_on_claude/ | cut it to $60 by switching tools |
| r/cursor | 0 | TOOLING | TOOL | $200 plan + $80 overage | "I upgraded to the Ultra plan for $200 thinking that my usage so far would be covered." | https://www.reddit.com/r/cursor/comments/1p38em5/is_this_greed_or_incompetence/ |  |
| r/cursor | 0 | TOOLING | TOOL | $200 | "I bought the Ultra plan on Cursor. It was $200" | https://www.reddit.com/r/cursor/comments/1ps4218/never_buy_the_200_item_at_the_cursor/ |  |
| r/cursor | 20 | TOOLING | TOOL | $2k last month | "My spend last month was $2k, so dialing that down cause I dont have that much to burn" | https://www.reddit.com/r/cursor/comments/1prkvua/built_2_apps_and_revamped_another_this_year_ama_p/ | 14-16 hours a day, 2-3 agents at a time |
| r/cursor | 31 | TOOLING | TOOL | 200.00 USD | "I paid for Ultra on the 14th of Dec, 2025. Got five days of use from it" | https://www.reddit.com/r/cursor/comments/1prkco0/cursor_stole_my_200_subscription/ |  |
| r/cursor | 4 | TOOLING | TOOL | US$0.71 for 68.7K tokens | "if US$0.09 is what I would get charged for 39.4K tokens" | https://www.reddit.com/r/cursor/comments/1prb3e3/how_are_requests_priced/ |  |
| r/cursor | 0 | TOOLING | TOOL | $20 in 2-3 days | "you used up my $20 in 3 days. You're a total disappointment!" | https://www.reddit.com/r/cursor/comments/1pra4ln/is_cursor_pro_a_scam_20_gone_in_2_days_and_custom/ |  |
| r/cursor | 0 | TOOLING | TOOL | $970 in 3 weeks | "$970 spent so far. I’m rebuilding NASA over here." | https://www.reddit.com/r/cursor/comments/1qgczzm/my_cursor_usage_in_3_weeks_15_billion_tokens/ | 8-13 hours a day, several shipped projects |
| r/cursor | 0 | TOOLING | TOOL | $20 + $20 | "I'm using the $20 cursor plan and also paying $20 for claude code." | https://www.reddit.com/r/cursor/comments/1qffvg0/confused_about_how_to_use_cursor_comnands_and/ |  |
| r/cursor | 2 | TOOLING | TOOL | $300 in extra usage | "I'm now at $300 in this month's extra usage so I want to upgrade to Ultra" | https://www.reddit.com/r/cursor/comments/1r5j6l1/if_i_sign_up_to_ultra_is_my_outstanding_extra/ |  |
| r/cursor | 12 | TOOLING | TOOL | $20/month | "I created a Cursor account and paid for a Pro subscription ($20/month)." | https://www.reddit.com/r/cursor/comments/1r5dfh3/cannot_stop_subscription_because_my_google/ | cannot cancel; locked out of the work Google account he signed up with |
| r/cursor | 17 | TOOLING | TOOL | $1 per hour on an OSS model | "I can literally work with it for an hour and spend $1." | https://www.reddit.com/r/cursor/comments/1r4ovzj/why_doesnt_cursor_host_oss_models_like_minimax/ |  |
| r/cursor | 22 | TOOLING | TOOL | $400 in credits | "I burned through my $400 allowed credits in cursor much faster than before" | https://www.reddit.com/r/cursor/comments/1rudzb5/claude_code_within_cursor/ |  |
| r/cursor | 14 | TOOLING | TOOL | ~$450 annual seat | "Cursor billed us $450 for a seat that existed for seconds" | https://www.reddit.com/r/cursor/comments/1rtvvdd/cursor_billed_us_450_for_a_seat_that_existed_for/ | a team, not a solo builder |
| r/cursor | 5 | TOOLING | TOOL | $1,400 this month | "This month I hit $1,200 in Claude API costs inside Cursor (Opus 4.6 + Sonnet 4.6) on top of the $200/mo Ultra plan." | https://www.reddit.com/r/cursor/comments/1sjovry/1400month_with_cursor_claude_api_how_are_you/ | freelance IT engineer running several client projects |
| r/cursor | 7 | TOOLING | TOOL | $1,513.23 in one billing window | "Well, I managed to hit 100% Auto and API on my Ultra subscription for Cursor." | https://www.reddit.com/r/cursor/comments/1shmcqk/usage_summary_actual_value_of_the_200_cursor/ | author says the table itself was assembled by AI from his usage export |
| r/cursor | 18 | ENGINEERING **[suspect]** | PERSON-OR-SERVICE | 85k each, three hires | "We ended up hiring three of them at 85k each" | https://www.reddit.com/r/cursor/comments/1t75egf/hired_three_junior_devs_last_month/ | employment, not project fees; the post reads as a story and may be fiction |
| r/cursor | 3 | TOOLING | TOOL | $20/month, now lapsed | "My Claude Pro subscription just ended. I was originally planning to switch to the $60 Cursor plan" | https://www.reddit.com/r/cursor/comments/1t72zpd/claude_pro_20_vs_cursor_pro_60_after_the_new/ |  |
| r/cursor | 0 | TOOLING | TOOL | $40/month now, $100/month budget | "My total budget is around $100/month, and I have no problem spending most or even all of it on a single tool" | https://www.reddit.com/r/cursor/comments/1tybko5/moving_from_mvp_to_real_product_codex_cursor/ | non-programmer; plans to bring in professional developers to review the code before release, no figure named |
| r/cursor | 1 | TOOLING | TOOL | $20.87 | "Current dashboard values: Total Spend: $20.87 Included: $20.87" | https://www.reddit.com/r/cursor/comments/1ty9gfv/need_help_understanding_the_usage_dashboard/ |  |
| r/cursor | 10 | TOOLING | TOOL | $100 cancelled, $20 started | "Just recently cancelled the Codex $100 plan after their 10x rate limit was over, jumped on Cursor $20 plan" | https://www.reddit.com/r/cursor/comments/1uo1iy0/cursor_ultra_20x_100_1st_month_or_keep_codex_5x/ |  |
| r/cursor | 6 | TOOLING | TOOL | $250/month plus ~$250 on demand | "Cursor charged me close to $250 in on-demand charges" | https://www.reddit.com/r/cursor/comments/1umhgjy/out_of_control_cursor_usage_billing_500_bills/ |  |
| r/cursor | 38 | TOOLING | TOOL | $0.61 for one request | "I made a request that consumed around 2 million tokens. It cost me $0.61" | https://www.reddit.com/r/cursor/comments/1vcppmc/beware_teamenterprise_users_gpt56_luna_cost_me/ |  |
| r/ClaudeAI | 0 | TOOLING | TOOL | $200 + $20 a month | "My $200 Claude subscription and a $20 ChatGPT subscription are still cheaper than what I would have spent with APIs." | https://www.reddit.com/r/ClaudeAI/comments/1ogphdu/first_ios_app_got_approved_built_in_7_days/ | shipped a free iOS app in about 7 days |
| r/ClaudeAI | 18 | TOOLING | TOOL | $450 in API credits | "I'm not sure what to use these credits on but I bought them a year ago" | https://www.reddit.com/r/ClaudeAI/comments/1p4pu4i/i_have_450_in_api_credits_to_burn_within_the_next/ | bought a year ago, about to expire unused |
| r/ClaudeAI | 9 | TOOLING | TOOL | $11 in credits | "Claude Code got it working for $11 in credits." | https://www.reddit.com/r/ClaudeAI/comments/1p4liw0/my_thoughts_on_claude_code_web_nonsde/ | names $20 as the amount he would risk on a tightly scoped problem |
| r/ClaudeAI | 14 | TOOLING | TOOL | ~$50 per intense session | "An intense session could cost $50, and over the last month I spent about 2x as much as I would on the Max plan." | https://www.reddit.com/r/ClaudeAI/comments/1psbwbj/quality_difference_between_opus_45_on_max_and_api/ |  |
| r/ClaudeAI | 4 | TOOLING | TOOL | $200 a month | "I have been hitting weekly limits in Max20 in about 4 days, which is frustrating at $200 a month." | https://www.reddit.com/r/ClaudeAI/comments/1r5v4jh/anyone_tried_the_new_gemini_deep_think_against/ | systems biology research, not software sales |
| r/ClaudeAI | 45 | TOOLING | TOOL | $20/month, wants a ~$50 tier | "I've been on Pro for a while and I regularly hit the usage limit" | https://www.reddit.com/r/ClaudeAI/comments/1rutad1/how_do_you_handle_the_gap_between_pro_20_and_max/ | explicitly names a ~$50 tier as his sweet spot |
| r/ClaudeAI | 7 | TOOLING | TOOL | $10 of extra usage | "I purchased $10 of extra usage to finish that night." | https://www.reddit.com/r/ClaudeAI/comments/1rusx5n/need_help_understanding_weekly_limit/ |  |
| r/ClaudeAI | 14 | TOOLING | TOOL | $20 | "The best $20 I've ever spent" | https://www.reddit.com/r/ClaudeAI/comments/1uob7yw/big_thanks_to_all_those_ai_companies_devs_out/ | building games for fun after cancer treatment; not a business spend |
| r/ClaudeAI | 699 | TOOLING | TOOL | $200/mo subscription + $20 accidental API | "even though I pay $200/mo for a subscription" | https://www.reddit.com/r/ClaudeAI/comments/1vdtzhm/warning_for_those_that_havent_experienced_this_yet/ |  |
| r/ClaudeAI | 0 | TOOLING | TOOL | hundreds on Max | "Earnings: $0 after spending hundreds on Max" | https://www.reddit.com/r/ClaudeAI/comments/1vdra1w/earnings_0_after_spending_hundreds_on_max/ | close to a million lines over five months, no revenue |
| r/ChatGPTCoding | 19 | TOOLING | TOOL | $15 sub | "I bought a Windsurf pro $15 sub just to have some additional quota" | https://www.reddit.com/r/ChatGPTCoding/comments/1nqk0hw/codex_on_windsurf_is_horseshit/ |  |
| r/ChatGPTCoding | 12 | MIXED | TOOL | $599 OpenAI + ~$500 AWS in one day | "4,727 new users in 24 hours $599 OpenAI bill in a single day" | https://www.reddit.com/r/ChatGPTCoding/comments/1og4cv3/how_a_free_for_life_promo_for_my_ai_fitness_app/ | the only row where distribution working caused the build-side bill |
| r/ChatGPTCoding | 21 | TOOLING | TOOL | $1,500 in a single day | "One of ours burned $1,500 in a single day!" | https://www.reddit.com/r/ChatGPTCoding/comments/1ro9772/has_anyone_figured_out_how_to_track_perdeveloper/ | a 50-developer enterprise account, not a solo builder |
| r/ChatGPTCoding | 597 | TOOLING | TOOL | $20 | "I am a college student and cannot spend my $20 everywhere randomly just to not be satisfied" | https://www.reddit.com/r/ChatGPTCoding/comments/1sb9kou/claude_pro_limits_are_driving_me_crazy/ |  |
| r/nextjs | 1 | TOOLING | TOOL | $127 charged, $15 expected | "i subscribed to this growth model considering only $15 will be deducted but they ended up deducting $127" | https://www.reddit.com/r/nextjs/comments/1t1t9o7/sanity_studio_billing/ | a CMS subscription; the author runs a small business and asks how to get a refund |
| r/webdev | 0 | TOOLING | TOOL | $4,082 in overages in 7 days | "7068 credits used. 7000 included. $4,082 in overages. one single day was $1,178." | https://www.reddit.com/r/webdev/comments/1tzodc2/githubs_new_ai_credits_system_cost_me_4k_in_7/ | was paying about $500/week before the switch to usage-based credits |

### STATED rows

| sub | score | object | form | amount as written | verbatim quote (<=25 words) | permalink | note |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| r/SaaS | 1 | ENGINEERING | PERSON-OR-SERVICE | $14,000 / 2 months | "Budget: $14,000 USD Timeline: 2 months Ongoing: $1,000 - $5,000/month maintenance after launch" | https://www.reddit.com/r/SaaS/comments/1t9cihq/hiring_pmcto_or_agency_to_build_launch_a_micro/ | wants the same hire to build the platform AND drive completion volume |
| r/microsaas | 1 | ENGINEERING | PERSON-OR-SERVICE | $50,000 | "If you had $50,000 to speed up the SaaS development process, what would you spend it on?" | https://www.reddit.com/r/microsaas/comments/1qgfqeh/if_you_had_50000_to_speed_up_saas_development_how/ | framed as a hypothetical; author is technical and says past freelancers slowed him down |
| r/microsaas | 1 | ENGINEERING | PERSON-OR-SERVICE | $200/month per dev, $1000 total | "I can literally hire 1 dev for 10 months with $1000 total budget" | https://www.reddit.com/r/microsaas/comments/1r5gkui/im_planning_to_start_1m_arr_saas_i_need_your_help/ | marketer in Africa planning to hire local developers cheaply and spend the rest on marketing |
| r/startups | 4 | ENGINEERING | PERSON-OR-SERVICE | $4,000/month + 4% equity | "Pay Options: A: $4,000/month + 4% equity. B: $5,000/month + 3% equity." | https://www.reddit.com/r/startups/comments/1prg80b/first_time_poster_here_need_some_advice_i_will/ | terms proposed by a CTO candidate; the author is contesting them. Already paying an outsourced team, no figure named |
| r/startups | 26 | DISTRIBUTION | ADS | 100k over 3 months | "I have 100k to spend on marketing for our 100% free walking/step health game." | https://www.reddit.com/r/startups/comments/1tyo4np/i_have_100k_to_spend_on_marketing_the_next_3/ | creators, micro-creators and paid UGC media; target under EUR 1.50 per install |
| r/webdev | 0 | DISTRIBUTION | PERSON-OR-SERVICE | $30-$40 per hour | "we are looking for a Caller/Interviewer to act as the bridge between our developers and our clients" | https://www.reddit.com/r/webdev/comments/1r5pkk4/hiring_technical_interviewer_client_liaison_for/ | an offshore dev agency buying client-facing English, not engineering |
| r/nextjs | 0 | ENGINEERING | PERSON-OR-SERVICE | $3,000 via escrow | "Budget: $3,000 (via escrow upon completion and bug-free delivery)" | https://www.reddit.com/r/nextjs/comments/1og1jh9/hiring_fullstack_developer_needed_tiktok_scraper/ | partially built already; open to continuation or full rebuild |
| r/cursor | 1 | TOOLING | TOOL | unlimited $ budget | "i have unlimited $ budget to pay for it (relative to armies of $100/h programmers)" | https://www.reddit.com/r/cursor/comments/1qgkj8b/can_cursor_do_multi_model_problem_solving_yet/ | wants multi-model review built into the IDE; prices it against hiring programmers |
| r/cursor | 8 | TOOLING | TOOL | $20 max | "now I can spend max is $20 I work for 9 hours and I have a lot of coding work to do" | https://www.reddit.com/r/cursor/comments/1vceatz/cursor_or_claude_code/ | has never used an AI coding tool; choosing his first subscription |
| r/cursor | 2 | TOOLING | TOOL | $20/month, held off | "I was literally on the verge of purchasing the $20/month Cursor Pro plan a few days ago." | https://www.reddit.com/r/cursor/comments/1vcdexu/holding_off_my_pro_subscription_until_the/ | says he would gladly pay for an uninterrupted tier; refusing the metered one |


## Table 2. Distinct-author counts by object and by form

REVEALED and STATED are never summed. Each table carries its own denominator.

**REVEALED, by object — denominator 95 distinct revealed authors, out of 3,842
authors in the corpus:**

| object | posts | authors | share of 95 | authors excluding suspect rows |
| --- | ---: | ---: | ---: | ---: |
| TOOLING | 54 | 54 | 56.8% | 54 |
| DISTRIBUTION | 23 | 23 | 24.2% | 22 |
| MIXED | 8 | 8 | 8.4% | 8 |
| OTHER | 6 | 6 | 6.3% | 6 |
| **ENGINEERING** | **4** | **4** | **4.2%** | **2** |

**REVEALED, by form — denominator 95 distinct revealed authors:**

| form | posts | authors | share of 95 | authors excluding suspect rows |
| --- | ---: | ---: | ---: | ---: |
| TOOL | 73 | 73 | 76.8% | 72 |
| ADS | 11 | 11 | 11.6% | 11 |
| PERSON-OR-SERVICE | 6 | 6 | 6.3% | 4 |
| UNSPECIFIED | 3 | 3 | 3.2% | 3 |
| COURSE | 1 | 1 | 1.1% | 1 |
| MIXED | 1 | 1 | 1.1% | 1 |
| BOOK | 0 | 0 | 0.0% | 0 |
| COMMUNITY | 0 | 0 | 0.0% | 0 |

**STATED, by object — denominator 10 distinct stated authors, out of 3,842
authors in the corpus:**

| object | posts | authors | share of 10 |
| --- | ---: | ---: | ---: |
| ENGINEERING | 5 | 5 | 50.0% |
| TOOLING | 3 | 3 | 30.0% |
| DISTRIBUTION | 2 | 2 | 20.0% |
| MIXED | 0 | 0 | 0.0% |
| OTHER | 0 | 0 | 0.0% |

**STATED, by form — denominator 10 distinct stated authors:**

| form | posts | authors | share of 10 |
| --- | ---: | ---: | ---: |
| PERSON-OR-SERVICE | 6 | 6 | 60.0% |
| TOOL | 3 | 3 | 30.0% |
| ADS | 1 | 1 | 10.0% |
| COURSE | 0 | 0 | 0.0% |
| BOOK | 0 | 0 | 0.0% |
| COMMUNITY | 0 | 0 | 0.0% |
| UNSPECIFIED | 0 | 0 | 0.0% |
| MIXED | 0 | 0 | 0.0% |

## Table 3. Build side or sell side

| | REVEALED (of 95 authors) | STATED (of 10 authors) |
| --- | ---: | ---: |
| BUILD SIDE (engineering + tooling) | 58 posts / 58 authors / **61.1%** | 8 posts / 8 authors / **80.0%** |
| SELL SIDE (distribution) | 23 posts / 23 authors / **24.2%** | 2 posts / 2 authors / **20.0%** |
| MIXED (not splittable) | 8 / 8 / 8.4% | 0 |
| OTHER | 6 / 6 / 6.3% | 0 |

## Table 4. Object by room

Business subs hold 2,432 of the 4,464 posts, developer subs 2,032. Denominator
for the REVEALED columns is 95 distinct revealed authors; for STATED, 10.

**REVEALED:**

| object | business posts | business authors | developer posts | developer authors |
| --- | ---: | ---: | ---: | ---: |
| ENGINEERING | 3 | 3 | 1 | 1 |
| TOOLING | 11 | 11 | **43** | **43** |
| DISTRIBUTION | **22** | **22** | 1 | 1 |
| MIXED | 7 | 7 | 1 | 1 |
| OTHER | 6 | 6 | 0 | 0 |

**STATED:**

| object | business posts | business authors | developer posts | developer authors |
| --- | ---: | ---: | ---: | ---: |
| ENGINEERING | 4 | 4 | 1 | 1 |
| TOOLING | 0 | 0 | 3 | 3 |
| DISTRIBUTION | 1 | 1 | 1 | 1 |

Totals: business subs contributed 49 revealed posts from 49 authors, developer
subs 46 from 46.

## Table 5. Median named amount per object, where n >= 3

USD only. One euro row and three figureless rows ("thousands", "hundreds",
"unlimited") are excluded, so `n` is per object. **These medians mix one-off,
monthly, per-unit and annual prices** — the basis mix is shown so the mixing is
visible, and a monthly-only comparison follows.

**REVEALED:**

| object | rows | with a USD figure | median | median excluding suspect rows | basis mix |
| --- | ---: | ---: | ---: | ---: | --- |
| ENGINEERING | 4 | 4 | $17,000 | n<3 (2 rows) | month 2, one-off 1, year 1 |
| TOOLING | 54 | 53 | $127 | $127 | day 1, month 35, one-off 11, unit 4, unknown 1, week 1, year 1 |
| DISTRIBUTION | 23 | 22 | $115 | $100 | month 6, one-off 12, unit 4, year 1 |
| MIXED | 8 | 7 | $150 | $150 | day 1, month 6, unknown 1 |
| OTHER | 6 | 6 | $625 | $625 | one-off 4, year 2 |

The ENGINEERING median of $17,000 is carried entirely by the two suspect rows.
**Drop them and engineering has only two priced rows left in 4,464 posts, which
is below the reporting threshold this cut set for itself.**

**REVEALED, monthly-basis rows only — the only like-for-like comparison:**

| object | rows with basis = month | median $/month |
| --- | ---: | ---: |
| TOOLING | 35 | **$200** |
| DISTRIBUTION | 6 | $164 |
| MIXED | 6 | $115 |
| ENGINEERING | 2 | n<3 |

**STATED:**

| object | rows | with a USD figure | median | basis mix |
| --- | ---: | ---: | ---: | --- |
| ENGINEERING | 5 | 5 | **$4,000** | month 2, one-off 3 |
| TOOLING | 3 | 2 | n<3 | month 2, unknown 1 |
| DISTRIBUTION | 2 | 2 | n<3 | one-off 1, unit 1 |

## Table 6. Does the money go to a book, a course, a community, or a person?

| | REVEALED (of 95 authors) | STATED (of 10 authors) |
| --- | ---: | ---: |
| a person or a service | 6 posts / 6 authors / 6.3% | 6 posts / 6 authors / **60.0%** |
| a book, a course or a community | 1 post / 1 author / **1.1%** | 0 / 0 / 0.0% |
| a tool or an ad platform | 84 posts / 84 authors / **88.4%** | 4 posts / 4 authors / 40.0% |

## Table 7. Robustness probe — books and courses with the amount gate removed

The main table requires a named amount. A book or a course bought without a
price named could never reach it, so the answer to "book or course?" would be an
artefact of the gate. This probe drops the gate entirely and searches all 4,464
posts for a bought book, course, bootcamp, mastermind or cohort.

**Five posts, five distinct authors — 0.13% of the 3,842 authors.** For scale,
over the same 4,464 posts the bare word "course"/"courses" appears in 111 posts
and "book"/"books" in 72. The word is common; the purchase is not. Every hit was
read in full and judged by hand. **None of the five names an amount**, which is
why none could have reached the main table.

### Book / course / cohort probe, every hit

| sub | verdict | verbatim quote | permalink | note |
| --- | --- | --- | --- | --- |
| r/EntrepreneurRideAlong | A REAL PURCHASE - and it is distribution | "I decided to buy some outreach coaching. Got big promises on how they would help me." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1tz6bhd/my_freelance_and_lead_gen_odyssey_got_beaten_down/ | the coaching was lazy and he got his money back; he then took a lead-gen course from a contact, which 'helped me kind of shape an offering'. No amount for either. |
| r/EntrepreneurRideAlong | A REAL PURCHASE - and it is distribution | "I've bought a couple books on marketing though, I read Ryan Holiday's Trust Me, I'm Lying" | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1unen1a/the_next_book_you_should_read_is_the_one_that/ | a whole post about buying books to close a gap; his named gap is marketing. No amount. |
| r/EntrepreneurRideAlong | a purchase, but abandoned and unrelated to a product | "Even signed up for online courses to potentially branch into mechanical engineering. Quit." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1nsh2sm/0_in_my_pocket_broke_bipolar_and_burned_out/ | no amount; the author has $10 to his name |
| r/ClaudeAI | not relevant | "I was in bands and took courses in songwriting" | https://www.reddit.com/r/ClaudeAI/comments/1r5pz99/can_someone_give_me_some_feedback_on_how_im_using/ | songwriting courses, roughly 25 years ago |
| r/buildinpublic | not a purchase | "so i got an idea why not I also show who joined the list recently?" | https://www.reddit.com/r/buildinpublic/comments/1r58fz2/a_small_tweak_in_ui_got_me_5x_more_waitlist_users/ | the match is a social-proof widget on someone else's course platform |

## Table 8. Read and excluded — the reason is itself evidence

None of these enters any count.

### Read and excluded

| sub | why excluded | verbatim quote | permalink |
| --- | --- | --- | --- |
| r/buildinpublic | a refusal, not a purchase | "I looked at DocSend but $300/mo for what's basically a fancy Dropbox with analytics feels insane" | https://www.reddit.com/r/buildinpublic/comments/1sjpsf7/selling_my_saas_400k_arr_and_the_data_room/ |
| r/startups | quotes received, never paid | "Agency quotes are running $500–1500 per creative" | https://www.reddit.com/r/startups/comments/1rucryl/whats_the_best_tool_for_ad_creatives_and_product/ |
| r/startups | fees demanded of the author and resisted | "Venture Studio that recruited me wants to charge $20k/mo in service fees." | https://www.reddit.com/r/startups/comments/1sjqz9c/venture_studio_that_recruited_me_wants_to_charge/ |
| r/cursor | a refusal, not a purchase | "just not sure I can justify $20 every time someone opens a PR" | https://www.reddit.com/r/cursor/comments/1rtlird/claude_code_review_20_every_pr/ |
| r/cursor | a refusal after eight hours of failure | "But, if I spend $20 I can keep trying. I'm not inspired to do this." | https://www.reddit.com/r/cursor/comments/1p4vcam/newbie_not_a_good_experience/ |
| r/microsaas | an unaffordable $10, not a purchase | "the $10 USD barrier is very real at this moment lol" | https://www.reddit.com/r/microsaas/comments/1p45l61/i_built_a_free_tool_to_publish_share_products/ |
| r/startups | a client's spend, reported by the consultant who was paid | "A founder I worked with hit $5k MRR, and their Vercel bill jumped from $50 to $1,200" | https://www.reddit.com/r/startups/comments/1qgesck/i_will_not_promotea_founder_i_worked_with_hit_5k/ |
| r/nextjs | a refusal, and the author's own product price | "I know not every dev can afford that (I certainly couldn't)" | https://www.reddit.com/r/nextjs/comments/1shxz7v/i_got_tired_of_setting_up_auth_and_stripe_for/ |


## Table 9. The other side of the transaction

What sellers in this corpus say they charge or were paid. Not the author's own
outlay, so excluded from every count, but it is the only read this corpus gives
on what help costs when someone does buy it.

### The other side of the transaction

| sub | verbatim quote | permalink |
| --- | --- | --- |
| r/EntrepreneurRideAlong | "A stranger messaged me and paid $3,000 to build his app idea." | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1uo7dtk/a_stranger_messaged_me_and_paid_3000_to_build_his/ |
| r/nextjs | "SaaS MVP — starting at $1,500" | https://www.reddit.com/r/nextjs/comments/1rs4oia/are_you_in_need_of_a_fullstack_developer/ |
| r/buildinpublic | "I’m offering a full Swiss-Engineered landing page build for $150 (Record Low)." | https://www.reddit.com/r/buildinpublic/comments/1rums4n/im_the_lead_at_devablestudio_im_doing_3_technical/ |
| r/EntrepreneurRideAlong | "MVP agencies: $15K-$50K+, 3-4 months, lots of meetings" | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1r5pb34/im_a_product_manager_not_an_engineer_new_ai_tools/ |
| r/EntrepreneurRideAlong | "Setup fee: $1,500 (one-time)" | https://www.reddit.com/r/EntrepreneurRideAlong/comments/1tz4j1a/i_made_11400_last_month_reselling_websites_to/ |
| r/buildinpublic | "Pay $50k–$250k for a full audit (which takes months)." | https://www.reddit.com/r/buildinpublic/comments/1nsg7yg/launching_smart_contract_peer_review_tool_for_devs/ |


## Findings

**The verdict, in two sentences.** The revealed money is on the build side —
58 of 95 authors (61.1%) named engineering or tooling against 23 (24.2%) who
named distribution — but that is almost entirely one thing: **54 of the 95 named
an AI coding subscription, and only 4 named paying a human being to do
engineering, 2 once the suspect rows are dropped.** It does not go to books or
courses: **1 of 95 revealed authors bought a course, none bought a book or a
community, and 84 of 95 (88.4%) paid a tool or an ad platform**, so what looks
like build-side willingness to pay is a $20-to-$200 monthly subscription habit,
not a market for help.

**The build side is a subscription, not a service.** The TOOLING bucket is 54
authors and the monthly median is $200. Strip the room split away and the shape
is unmistakable: 43 of those 54 are in the developer subs, where naming a Cursor
or Claude bill is practically the local dialect. The largest
tooling figures in the set are overwhelmingly complaints — an accidental $4,082 of GitHub
overages in seven days, $1,500 burned in a single day by one developer on a
50-seat account, $1,513.23 in one Cursor billing window, a $2,000 month someone
is "dialing that down cause I dont have that much to burn". These are people who
pay readily and resent it. One of them, on r/ClaudeAI, captures the mood:
*"Earnings: $0 after spending hundreds on Max"* — though that is one author's
self-reported outcome, and this cut measures revenue for none of the other 53
tooling authors.

**Almost nobody is buying engineering help.** Across 4,464 posts and 3,842 authors,
four people named money paid to a human for engineering. Two of those four are
the rows I flagged as suspect: an offshore-vendor comparison that reads as
placement, and a hiring anecdote that reads as fiction. The two that survive are
a founder who *"spent 10k on Upwork and got a garbage result from some chop
shop"* and says never again, and a solo builder paying Fly.io **$4.15 a month.**
That is the entire revealed market for engineering help in a year of ten
subreddits. Meanwhile the corpus is full of engineering help being *declined*:
$70k quoted and refused in favour of Claude Code, $10-12K of Android port quotes
refused for an $85 plan upgrade, $500 for a lawyer's review weighed and resisted
on an app with $100 of costs, AI code review at $20 a pull request judged
unjustifiable, and $20 refused outright by a beginner after eight hours of
failure.

**The stated money flips the object and the form.** Ten authors declared a
willingness to pay rather than a completed purchase, and among them the
proportions invert: **5 of 10 named engineering, 6 of 10 named a person rather
than a tool, and the median stated engineering figure is $4,000** against a
revealed tooling median of $200 a month. The stated rows are a $14,000 platform
build, a $50,000 development budget, a $3,000 escrow, a $4,000/month CTO offer,
and a marketer planning to hire a developer for ten months on $1,000. **People
say they would pay someone; they are observed paying a subscription.** That gap
is the most decision-relevant number in this cut, and it cuts both ways: it is
either latent demand nobody has packaged, or it is talk.

**The rooms want different things, and only one of them is buying distribution.**
In the five business subs, distribution is the biggest revealed object — 22 of
49 authors — and tooling is 11. In the five developer subs it is 43 tooling
against 1 distribution. Distribution money in the business rooms is small,
frequent, and often disappointing: $20 on Meta ads for 83 visits and zero
conversions; $85 on Google Ads for zero signups, after which the first customer
arrived through a free tool; $100 for nine clicks; 66 euros for 257 clicks and
11 waitlist signups; $8,000 across four months for maybe twelve customers and a
CAC over $380. The revealed distribution median is $115 (basis mixed) and $164 a
month for the monthly rows. **These are people who have paid for distribution and
can tell you exactly how much it cost.** Not all of it disappointed, and the
counter-examples are in the same table: $228 a month of stacked outbound tooling
that the author says generates $22,000 a month in pipeline, $130 of Facebook ads
against 20 sales, and a $30 directory listing that "brought me the most users".
The losses are simply the ones written up in the most detail.

**Books and courses are close to absent, and the exceptions are about
distribution.** One revealed COURSE row exists in the whole set, and the courses
were IELTS exam prep, not business or engineering. Removing the amount gate
entirely finds five posts in 4,464 that name a bought book, course, bootcamp,
mastermind or cohort. Three are irrelevant. **The two real ones are both
distribution purchases:** a consultant who bought outreach coaching (lazy, money
refunded) and then took a lead-gen course that *"helped me kind of shape an
offering"*, and a builder whose entire post is about buying books to close a
gap — the gap he names is marketing. Nobody in this corpus reports buying a
book or a course about shipping software.

**A note on which numbers are large.** The four largest figures anywhere in the
revealed set are a moving-company owner's *"over 500k in two decades"* on Google,
Yelp, Facebook and Angi ads; a $50k MVP overrun that the author says was
explicitly *not* code; three $85k engineering hires (suspect); and an offshore
team at $18-30k a month (suspect). The largest stated figure is $100k of
marketing over three months. **Every large, credible number in this cut is
distribution or overhead. Every large engineering number is either refused, a
quote, or flagged.**

## What this cannot say

The sample is small: 105 people out of 3,842, and 95 of those name a completed
purchase. A named number is **willingness to post, not willingness to pay** —
posting a spend is a rhetorical act, and the rooms reward some spends (an ad
experiment with a full breakdown, a Cursor bill worth complaining about) and
punish others (an agency invoice you would rather not admit to). The people
quietly paying an engineer under contract have no reason to write the post at
all, which is exactly the population the 61%/24% split cannot see. Nothing here
establishes that a book about shipping software would or would not sell; it
establishes only that this corpus contains almost no record of anyone buying
one.

## Limits

- **The amount gate does most of the exclusion.** Rule (i) needs a figure within
  120 characters of a purchase verb or resource noun. A purchase whose price is
  never named is invisible to the main table — which is why the book/course
  probe exists, and why it found two real purchases the main table could never
  have reached. There are certainly others of every kind.
- **Rule (ii) is narrow.** Five phrases. "I'd happily throw money at this",
  "shut up and take my money", "where do I sign" and every other idiom of
  willingness are absent from the instrument, so the STATED bucket of 10 is a
  floor, not a measurement.
- **Rooms are not populations.** The developer subs' 43 tooling rows are partly
  an artefact of what r/cursor and r/ClaudeAI are *for*: billing-complaint venues
  attached to paid products. The high tooling count is a fact about where people complain
  about subscriptions, not proof that developers spend more than founders.
- **Objects are a judgment.** ENGINEERING here follows the cut's own brief and
  includes hosting, which is why a $4.15/month Fly.io bill sits in the same
  bucket as a $10,000 Upwork contract. The MIXED bucket exists because eight
  posts genuinely could not be split; a different reader would distribute those
  eight differently and move the 61.1%/24.2% split by several points.
- **The medians mix bases.** One-off spends, monthly subscriptions, per-click
  prices and annual fees are pooled to reach n>=3. The monthly-only table is the
  only like-for-like comparison, and it supports just two objects.
- **Two rows are flagged, more may deserve it.** Vendor-authored posts and
  LLM-written case studies are common in these subs and I could only flag the
  ones that announced themselves. Several kept rows read as polished content
  marketing; if a skeptic dropped every row that reads that way, the DISTRIBUTION
  count would fall further than the TOOLING count.
- **Cross-posts were collapsed by hand,** not by a similarity measure. Four
  groups were found. If a fifth exists with reworded text, one author is counted
  twice somewhere in the 105.
- **Twelve 10-day windows, not a year.** Prices moved inside the window: several
  Cursor and Claude rows describe plans and limits that no longer exist, so the
  tooling medians are a snapshot of a repricing market, not a stable rate card.
- **This cut cannot see comments,** where "how much did that cost you?" is
  answered far more often than in a post body, and cannot see anything anyone
  paid for and did not write about.
- **One quote in the narrative was wrong and has been corrected.** A cross-review
  of this file against the corpus found that the Findings section quoted post
  `1prkvua` as *"dialing down cause I dont have that much to burn"*. The post
  says *"dialing **that** down"*. The dropped word changed no number, no
  classification and no table — the row for that post carried the sentence
  correctly all along — but the fragment as published was not verbatim, and this
  file's own standard is that a quote either survives a substring check against
  the corpus or does not appear. It now reads as the corpus does. The cause was
  structural rather than careless: the script verified every quote in every
  table at runtime and never looked at the prose, so the quotes a reader meets
  first were the one class nothing checked. The script now verifies the eight
  narrative fragments on identical terms and exits non-zero if one drifts;
  feeding it the original wording reproduces the failure.
