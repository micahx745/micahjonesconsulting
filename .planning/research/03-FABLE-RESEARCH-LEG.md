# The 80% Wall — Strategy Document (Reddit evidence + outside data)

## TL;DR
- **The playbook is pointed at a real pain in the wrong words and sold to the wrong room. Fix the room first:** lead with distribution ("It shipped. Nobody came." — 8.9% of r/buildinpublic bodies), not the regression loop (1.0%).
- **The offer the data says exists and you don't sell** is a productized "landing page + first users" package for AI‑built apps: "landing page" is the single largest term in the asking corpus at 27 distinct authors, and real/first/early users add 26 more authors combined.
- **Your live home page already pivoted to "I build the go-to-market" while the playbook page still leads with the engineering wall** — the two pages now contradict each other. Reconcile them around distribution, and stop leaning the $5K/mo lane on `sameness` = 19 (an upper bound that could be 5).

---

## E0. THE RULING

**Verdict: primarily RIGHT PAIN SOLD TO THE WRONG ROOM, compounded by RIGHT PAIN IN THE WRONG WORDS. It is not "wrong pain."**

The wall is a real pain — `wall` scores 2–9 per sub and `gate` 4–12, and a live commercial vibe‑code‑rescue market exists (agencies at $3,000–$40,000; hundreds of freelance "fixers"). So the engineering wall is not imaginary. But three facts move the verdict off "wrong words alone":

1. **Wrong words.** Your second playbook sentence — the regression loop ("every change broke something that worked yesterday") — measures **1.0%** on the cleanest phrasing‑free test (17 of 1,720 posts across 8 subs). Your fifth sentence, "It shipped. Nobody came.", measures **8.9%** (`crickets` 29 of 325 in r/buildinpublic). The regression beat is roughly nine times rarer than crickets, and it sits three sentences higher on the page. The beat is real but the phrasing is yours: "kept running" / "keep running" carry the two highest lift scores in the whole dataset (7.3× and 13.4×), so people write "I kept running into…", not "every change broke something."

2. **Wrong room.** The public expressions of the wall live in developer subs, and those rooms don't buy: `crickets` = 0 across 545 combined bodies in cursor / ClaudeAI / ChatGPTCoding (the population hasn't launched); developer‑sub money language = 14% vs wall 35%. Selling a $99 book to the room that has the wall pain is selling to a pre‑launch room with almost no money language.

3. **The money is on a different pain.** Business subs run 52% money language, and their dominant unmet need is distribution: **8 of the top 16 asking phrases** are distribution (landing page 27, real users 10, cold outreach 9, first users 8, early users 8–9, conversion rate 6, paid ads 6, user base 6).

**Reading the 37 intersection posts (B5).** By my classification: (a) post‑launch distribution stalls — #1, #3, #6/#12/#32, #11, #15, #17, #29, #30 (~8); (b) pre‑launch validation — #2, #8, #9, #13, #25, #33, #34 (~7); (c) unambiguous engineering blockers — only **#14** (auth architecture) and **#21** (the one genuine regression‑loop story), and both authors can already ship; (d) showcases / off‑topic / spam — #5, #7, #10, #16, #19, #20, #22, #23, #26–28, #31, #35, #36, #37 (~14). The intersection that is supposed to be your ICP is dominated by distribution and validation, not the wall. That is the single strongest piece of evidence for the ruling.

**What would change my mind (falsifiers for the ruling):** (i) an answered/unanswered corpus cut showing the wall/regression pain is present but *suppressed* by posting‑shame — but B6 already tests and weakens this: `wall` scores 2–9 in the same subs where regression scores 0, so self‑blame is not suppressed wholesale; (ii) a `would_pay`‑revealed cut (named number or completed transaction only) that concentrates on engineering help rather than distribution; (iii) the 19 `sameness` posts adjudicating as real positioning‑with‑money demand rather than r/SaaS hobby‑talk.

**Where Package 1 and Package 2 contradict each other (I rule on each):**
- **ICP (C9a) vs the money/pain split (B4).** C9a says the buyer is a solo dev stuck demo→production and the wall is the primary pain. B4 shows the wall room barely mentions money and the money room is stuck on distribution. **Rule: B4 wins.** The wall is a feature of the product's *subject*, not the buyer's wallet.
- **Belief (h): dev subs are where playbook buyers are.** Contradicted by crickets = 0, would_pay at the floor, population pre‑launch. **Rule: false. Sell in the business subs.**
- **Belief (i): distribution chapters are the back of the book.** Contradicted by distribution being the dominant unmet need. **Rule: move them forward on the sales page (not necessarily in the book).**
- **"solo builder" (site term) vs "solo founder."** "solo founder" is attested by 6 asking authors; "solo builder" does not appear in the top 140. **Rule: prefer "solo founder," though neither clears the ≥8 headline bar; use both only as kicker/body language, not as the load‑bearing headline noun.**
- **Home page vs playbook page.** The LIVE home H1 is now *"I build the go-to-market. Also product, data platforms, and RFP engines."* — distribution‑forward. The playbook page still leads with the engineering wall (H1 "The AI handed you the code. Now ship the company.", chart caption "why the wall is arithmetic"). **Rule: the site already half‑agrees with the data on the home page and disagrees with itself on the playbook page. Reconcile toward distribution.**
- **JetBrains Mono.** House rule C7 says "no monospace fonts anywhere," yet JetBrains Mono is loaded and used for § codes/footers. **Rule: real violation; remove the font or amend the rule.**
- **File count.** The brief says 27 companion files; Package 2 (back cover + C6) says 26. **Rule: 26 is the sourced figure; correct the brief.**

---

## E1. THIS WEEK (≤5 working days)

**1. Reorder the playbook "If this is you" block; demote the regression loop.**
Change · New order: (1) "It shipped. Nobody came." (2) the production/wall line. (3) the regression line — reworded from market vocabulary or cut. Replace "every change broke something that worked yesterday" with the attested beat: "I kept running into the same thing" (kept/keep running = 21/14 authors, highest lift in the set). Evidence · crickets 29/325 = 8.9% vs regression 17/1,720 = 1.0%; kept/keep running lift 7.3×/13.4×. Confidence · **High** (direct measurement in hand). Effort · 1 hour. Falsifier · an answered/unanswered cut showing regression is suppressed, not absent (B6 already argues against this). **I agree with the scope ruling's proposed ordering.**

**2. Fix the Google index / stale‑content liability.**
Change · Google still serves your old v0 page (the live search result reads "tech strategist… Flexport… Created with v0" plus a HIPAA‑CRM‑for‑doulas blurb). That contradicts the verified‑facts ledger and is your only organic footprint. Force a re‑crawl (Search Console URL inspection + "Request indexing" on /, /services, /work, /playbook; confirm canonical + sitemap). Evidence · a name search for "The 80% Wall" returns zero relevant results (C2); live results show superseded copy. Confidence · **High.** Effort · 1–2 hours. Falsifier · Search Console shows new pages already indexed → the problem is content, not crawl.

**3. Rename /book (call booking) → /call or /intro.**
Change · Kill the /book vs /playbook collision. Evidence · the playbook cross‑sell CTA "Book a free intro call →" points to /book, one letter from the product page. Confidence · **High.** Effort · 1 hour (redirect).

**4. Add Book + Product/Offer + FAQPage structured data to /playbook.**
Change · Only site‑wide Person/Org JSON‑LD exists today. Add Book, Product/Offer ($99/$149), FAQPage (you already have 5 FAQ Q&As in copy), and BreadcrumbList. Evidence · C5 audit. Confidence · **High.** Effort · 2–3 hours.

**5. Remove the JetBrains Mono violation (or amend the house rule).**
Change · One or the other; today the build gate and the live page disagree. Confidence · **High.** Effort · 1 hour.

**12 (do it now — it's a one‑hour win). Add case‑study → playbook internal links, especially /work/ordani → /playbook.**
Change · /work/ordani is the source of the book's central claim and currently doesn't link to it. Confidence · **High.** Effort · 1 hour.

## E2. THIS MONTH

**6. Launch a productized "landing page + first users" package — the offer the data says exists and you don't sell.**
Change · A fixed‑price package: a teardown of the landing page for the thing they vibe‑coded, plus a first‑10‑users outreach plan, delivered as a private video + one‑page plan. Position it explicitly *for AI‑built apps* to differentiate from generic roasters. Evidence · "landing page" = 27 distinct asking authors (largest term in the set; sits between building and selling); real/first/early users = 26 authors combined; cold outreach = 9. Market comps: Olly Meakings' Roast My Landing Page is **$350** for a 15‑minute private video within 48 hours (800+ pages roasted, ~$300K earned); roastd.io $179; CrowdTamers GTM teardown $800; Demand Curve's Growth Program $1,200. Price · $500 (teardown) / $1,500 (teardown + plan + one follow‑up). Confidence · **High** on demand; **Medium** on selling it cold with zero proof. Effort · 3–5 days. Falsifier · a "landing page posts read individually" cut showing those 27 authors want *building* help (Framer/Webflow) not *conversion/distribution* help.

**7. Reframe the playbook sales page around "shipped, nobody came," and make Chapter 8 the free sample.**
Change · Sell the book to the person who already shipped and got crickets: chapters 8–9 (first ten users / distribution loop) answer the loudest pain; chapters 2–7 become "why your next build won't stall." **Swap the free sample from Chapter 1** (least‑attested beat, the 80%/regression wall at 1.0%) **to Chapter 8** ("The first ten users"), which matches the dominant pain. Honesty guardrail: the book is still mostly engineering (ch 8–9 = 13 of 68 pages), so don't promise a distribution bible — promise "ship it *and* get your first ten users," which the book already delivers. Price · **keep $99 launch / $149 after.** Validation: Steve Schoger stated on X (@steveschoger, Dec 11, 2020) that Refactoring UI "has since sold over 20,000 copies and is yet to have a single day without a sale" at exactly $99/$149; pay‑what‑you‑want (rejected in C8) correctly undercuts this. Confidence · **Medium‑High.** Effort · 2–3 days. Falsifier · a refund spike on the first ~20 sales from buyers who expected a marketing book.

**8. Reconcile the home page to a single spear.**
Change · The live H1 "I build the go-to-market. Also product, data platforms, and RFP engines." dilutes across four things. Cut to one outcome in the first screen; move the rest to a secondary line. Note "go‑to‑market" is B2B jargon, not attested asker vocabulary (askers say landing page / real users / first users). Confidence · **Medium.** Effort · 1 day.

**9. First honest distribution motion: a Show HN of an ungated Chapter 8, plus build‑in‑public numbers.**
Change · With zero audience, borrow the Arvid Kahl / Refactoring UI playbook: publish an ungated HTML version of one full chapter and share real sales numbers. Constraint: Hacker News "Show HN" kills signup walls and paywalls and forbids soliciting upvotes; a paid PDF behind an email gate will not survive there, but a genuinely free, complete chapter (or a book *with* sample chapters) is explicitly allowed. Evidence · Arvid Kahl told the Writer on the Side podcast (Ep. 049) he made **"over $8,400 in 1 week"** selling Zero to Sold on Amazon + Gumroad, launching off a free‑chapter + owned‑audience motion and a #4 Product‑of‑the‑Week Product Hunt run. Confidence · **Medium.** Effort · 2–3 days. Falsifier · a Show HN that draws traffic but zero email captures → the free chapter isn't landing the pain.

## E3. THIS QUARTER

**10. Decide the $2,500 tier: production‑readiness / security pre‑flight audit for AI‑built apps.**
Change · A fixed‑price audit (env vars, RLS/IDOR, Stripe webhook verification, deploy) for vibe‑coded apps, leaning on your HIPAA/security credibility. Evidence · wall 2–9/sub, gate 4–12; a priced market exists — Relux Works advertises a **$3,000 audit (one week), a $10,000 stabilization sprint, and a $15,000–40,000 migration**, audit fee credited; per 404 Media's "The Software Engineers Paid to Fix Vibe Coded Messes" (Sep 2025), VibeCodeFixers.com has "almost 300" developer profiles and Fiverr's "vibe coding" category currently shows 133 services. Confidence · **Medium** (crowded with agencies; your edge is the security angle + the book as proof). Effort · 2–3 days to scope. Falsifier · a would_pay‑revealed cut showing engineering‑help buyers are rarer than distribution buyers (likely, per B4).

**11. Build the SEO wedge nobody owns: distribution for the person who vibe‑coded it.**
Change · Two page types, two jobs. (a) *Rank/traffic* pages targeting developer‑room long‑tail production failures ("stripe webhook not firing," "env var missing in production," "context rot") — these carry the query volume and specific long‑tail. (b) *Convert* pages targeting business‑room buyers (landing page / first users). **Do not fight for** "vibe coding production checklist" (owned by Supabase, RaftLabs, Clarista, vibecoder.me) **or** "80% problem" — Addy Osmani named it in "The 80% Problem in Agentic Coding" (addyo.substack.com, Jan 2026, building on Karpathy's "80% agent coding and 20% edits+touchups"), and it is a naming collision with your product you will always lose to the originator. The white space is the intersection: **AI‑built + distribution** — the checklists don't speak to distribution and the distribution incumbents (Demand Curve, "first 100 users" content) don't speak to AI‑built. Only low‑authority blogs (Postiv, Okara, Octave) are staking it out. Confidence · **Medium.** Effort · ongoing.

---

## E4. THE SEVEN QUESTIONS

### Q1 — Positioning (H1 candidates)
Rule applied: ≥8 distinct authors for content words; first person allowed; no growth‑marketing forbidden vocabulary; sentences <25 words.

**Home page (business‑room buyers, distribution):**
- **A. "You shipped it. Nobody came. I fix that."** From crickets (29 authors / 8.9% in r/buildinpublic) + "real users" register. Clears the bar. Title: "Micah Jones — you shipped it, nobody came. Distribution for AI‑built products." Meta: "You built it with AI. It works. Nobody's signed up. I build the landing page and the first users — the part the tools don't."
- **B. "You built it. Now get real users."** "real users" = 10–12 authors (clears ≥8). Title: "Micah Jones — get real users for your AI‑built app." Meta: "The demo took a weekend. Real users are the hard part. That's my work."
- **C. "I build the landing page and the first users."** "landing page" 27 + "first users" 8 — the most attested candidate. Title: "Micah Jones — landing pages and first users for solo founders." Meta: "Independent operator, Oakland. Four exits behind my work. Now I build the go‑to‑market for people who shipped with AI." **Recommended.**
- *On the current live H1 "I build the go-to-market…":* correct in intent but speaks jargon, not the market's words. Prefer C.

**Playbook page:**
- **A. "It shipped. Nobody came. Here's the manual for the last part."** crickets 8.9% — most attested. Title: "The 80% Wall — it shipped, nobody came. A field manual for solo founders."
- **B. "The AI handed you the code. Now ship the company."** (current) — on‑strategy (company, not code) but **not traceable to attested language** ("ship the company" is yours). Keep as fallback only.
- **C. "You got it working. The users never came."** wall ("working") + crickets — traceable to the crickets beat.
- *Attestation caveat:* "80%"/"the wall" are the **product name** (no attestation required), but as *headline search terms* they collide with Osmani's "80% problem" — don't rely on them to rank.

### Q2 — Services
- **$500 fixed → REPURPOSE as the "landing page + first users" teardown** (E1 #6). The survivor and the growth engine. Comps $179–$800.
- **$2,500 fixed → REPOSITION as the AI‑built production/security pre‑flight audit** (E3 #10). Survives on your HIPAA edge; crowded otherwise.
- **$7,500 fixed → keep as end‑to‑end build‑to‑production**, but it's the weakest‑attested tier (the wall room barely mentions money). Low confidence; keep, don't lead with it.
- **$5K/mo engagement → survives, but reframe from "positioning (sameness)" to "distribution / first‑users GTM."** Critical: the live home page frames engagement #1 as "Positioning & GTM: You built it, enterprise teams still aren't buying. The gap is positioning, not features." **That leans on `sameness` = 19, an explicit upper bound that could adjudicate to 5.** If you keep the positioning framing you are betting the lane on 19 posts that might be 5. **De‑risk it** by re‑anchoring on the distribution cluster (landing page 27, users 26 combined, cold outreach 9), which does not depend on sameness at all — then if sameness collapses to 5, the lane still stands.
- **The offer the data says exists and you don't sell:** the landing‑page + first‑users package — the highest‑confidence new offer because it is built on the single largest term in the set.

### Q3 — The playbook
Change the **funnel position and page framing**, and lightly change **chapter emphasis** — not the book's substance.
- Lead the sales page with crickets/distribution (chapters 8–9); position chapters 2–7 as insurance against the next stall.
- **Free sample: switch Chapter 1 → Chapter 8.** Chapter 1 is the least‑attested beat (1.0%); Chapter 8 ("The first ten users") maps to the dominant pain and is the better hook.
- **Price: keep $99 launch / $149 after** (Refactoring UI validates it; pay‑what‑you‑want correctly rejected).

### Q4 — SEO
- **Page → target query:** Home → brand + "get real users for AI‑built app" (convert). /services + new /packages → "landing page teardown / first users" (convert; where "landing page" 27 maps). /playbook → "The 80% Wall" brand + "shipped nobody came" (convert). New long‑tail articles → dev‑room production failures (rank/traffic): "context rot," "stripe success page not proof of payment," "env var missing in production," "IDOR / everyone is admin." /work/* → credibility (convert).
- **Rank vs convert / dev vs business:** developer rooms have the query volume and long‑tail (rank); business rooms have the buyers (convert). Keep them as different pages with different jobs — don't make the buyer pages chase dev traffic.
- **Defensible wedge:** AI‑built + distribution. Concede "vibe coding production checklist" and "80% problem."
- **Adopt in metadata:** "vibe coding" (attested by 10; the dominant umbrella term) yes, in body/meta; "context rot" and "80% problem" only inside long‑tail articles that cite the originators, never as your headline claim.
- **Structured data:** add Book, Product/Offer, FAQPage, BreadcrumbList.
- **"landing page" (27) maps to** the new /packages teardown page.
- **Corpus cut wanted:** answered/unanswered ratio per asking phrase (unanswered = open SEO slot; answered = incumbent).

### Q5 — Site design
- **First screen of home must:** name who it's for (shipped‑with‑AI solo founders), name the outcome (real users / first users), one CTA. Cut "Also product, data platforms, and RFP engines" from the H1 (move to a secondary line).
- **Cut / fix:** rename /book → /call; add case‑study→playbook links; consolidate the duplicate email forms on /playbook (hero anchor + block 2.6 target the same capture — keep one visible form). Nav (5 items) is fine.
- **C8 "open to argument" rulings:** (a) **Ungated sample — partially reverse.** Keep the email gate for the full PDF, but publish an ungated HTML version of one complete chapter for SEO and for Show HN (which kills signup‑walled launches). You lose nothing the research favored and gain a launch surface. (b) **Cover size on mobile — uphold the cover‑as‑object** for now (it's the page's one design idea and you have no traffic to test on); A/B test shrinking it once traffic exists.
- All inside C7 (no stock/AI imagery, one motion already spent, no false scarcity).

### Q6 — Sequence (impact × confidence ÷ effort)
Scored 1–5 each; effort inverted (1 = trivial, 5 = large).

| # | Recommendation | Impact | Conf | Effort | Score |
|---|---|---|---|---|---|
| 1 | Reorder "If this is you"; demote regression | 4 | 5 | 1 | 20.0 |
| 2 | Fix Google index of stale v0 page | 4 | 4 | 1 | 16.0 |
| 3 | Rename /book → /call | 3 | 5 | 1 | 15.0 |
| 12 | Case‑study → playbook internal links | 3 | 5 | 1 | 15.0 |
| 4 | Add Book/Offer/FAQ schema | 3 | 5 | 2 | 7.5 |
| 6 | "Landing page + first users" package | 5 | 4 | 3 | 6.7 |
| 7 | Reframe playbook page + swap free sample | 5 | 4 | 3 | 6.7 |
| 8 | Reconcile home to one spear | 4 | 3 | 2 | 6.0 |
| 9 | Show HN of ungated Chapter 8 | 4 | 3 | 3 | 4.0 |
| 11 | SEO wedge (AI‑built + distribution) | 5 | 3 | 5 | 3.0 |
| 10 | $2,500 production/security audit | 3 | 3 | 3 | 3.0 |

Do 1, 2, 3, 12, 4 this week; 6, 7, 8, 9 this month; 10, 11 this quarter.

### Q7 — Falsification for the top three
- **#1 (reorder toward crickets).** Wrong if an answered/unanswered cut shows the regression/wall beat is present but *suppressed* (high unanswered rate on self‑blaming engineering posts) rather than absent. Cheapest test: pull answered‑ratio for `regression`, `wall`, `crickets` from the cache (seconds) + read the 29 crickets posts vs the 17 regression‑proximity posts individually (1 hour).
- **#6 (landing‑page + first‑users package).** Wrong if the "landing page" posts, read individually, ask for *building* help (Framer/Webflow/"how do I make a landing page") not *conversion/distribution* help. Cheapest test: the "landing page posts read individually" cut (seconds) + a 2‑week live test — put the $500 teardown live, post 3 genuinely helpful replies in r/SaaS + r/microsaas offering it, measure whether ≥2 qualified enquiries arrive.
- **#7 (reframe playbook; Chapter 8 free).** Wrong if switching the free sample to Chapter 8 doesn't lift email captures over Chapter 1, or if early buyers refund citing "expected a marketing book." Cheapest test: A/B the free‑chapter offer for 100 visitors per arm (needs traffic from #9 first); watch refund reasons on the first 20 paid sales.

---

## E5. WHAT I AM NOT RECOMMENDING, AND WHY
- **Abandoning the wall / the book's engineering core.** The wall is real (priced rescue market; wall 2–9, gate 4–12). Reposition it as insurance, don't throw it away.
- **Chasing "vibe coding production checklist" or "80% problem" for SEO.** Owned by Supabase/RaftLabs/Clarista and by Addy Osmani respectively; "80% problem" is also a naming collision you'll always lose to the originator.
- **Leading the $5K/mo lane on "positioning/sameness."** `sameness` = 19 is an explicit upper bound that could be 5. I re‑anchor the lane on the distribution cluster instead. If you want the positioning framing, first adjudicate the 19 posts (one hour of work).
- **Re‑proposing the C8 rejections I agree with:** AI‑generated hero (banned imagery), pay‑what‑you‑want (undercuts $99), countdown/"N left" (banned + distrusted), team‑seat calculator (personal manual), sound effects/mini‑games (wrong register). Upheld.
- **A developer‑sub go‑to‑market for the book.** Belief (h) is contradicted by crickets = 0 and the pre‑launch population there. Don't spend the launch in cursor/ClaudeAI.
- **Unresolved — stated as such:** whether the wall pain is genuinely rare or merely under‑posted is *not fully resolved* by Package 1 alone. It's resolvable in ~1 hour with the answered/unanswered cut + reading the 29 crickets and 17 regression posts. Until then, treat every wall‑lane recommendation as provisional. A confident wall‑first page built on the 1.0% number would be worse than running that hour of work first.

## E6. DATA REQUESTS (named corpus cuts)
1. **Answered/unanswered ratio per asking phrase** — which distribution/wall phrases are open SEO slots (unanswered) vs have incumbents (answered). Answers Q4 and the ruling's suppression falsifier.
2. **The 19 `sameness` posts, adjudicated individually** — is the $5K/mo positioning lane real, or r/SaaS hobby‑talk? Determines whether to keep the positioning framing.
3. **The "landing page" posts (27 authors) read individually** — building help vs conversion/distribution help. Falsifier for the #6 package.
4. **`would_pay`‑revealed split by cluster** (named number or completed transaction only; never summed with stated) — does revealed willingness‑to‑pay concentrate on distribution or engineering? Adjudicates services.
5. **"kept running into ___" completions** — the attested language to seed the reworded regression line and the "first users" copy.

## E7. SOURCES (what I searched, what I found)
- **Live site (fetched):** micahjonesconsulting.com home — current H1 "I build the go-to-market. Also product, data platforms, and RFP engines."; three engagements (Positioning & GTM / End‑to‑end product building / Frontier AI engineering); door module "The demo took a weekend. The last 20% is eating your month." → /packages; receipts (Guardicore $14M / acquired by Akamai; SurveyMonkey $1M+ toward IPO; Postmates acquired by Uber $2.65B; content engine 8K→290K; RFP engine $3M; Ordani active paying users). Child pages /services, /packages, /playbook, /work/ordani could not be fetched (the fetcher only accepts URLs surfaced by search, and those child pages aren't indexed). **Google still serves the superseded v0 home copy** ("tech strategist… Flexport… Created with v0").
- **Vibe‑coding production‑checklist incumbents:** supabase.com (The Vibe Coding Master Checklist); raftlabs.com (six checks); getautonoma.com; slash.co; clarista.io (14‑point, "budget 4–12 weeks"); blog.vibecoder.me (25‑item).
- **"80% problem" / "last 20%":** Addy Osmani, "The 80% Problem in Agentic Coding" (addyo.substack.com, Jan 2026), building on Karpathy's "80% agent coding and 20% edits+touchups"; Osmani, "The New Software Lifecycle" (addyosmani.com) — verbatim "Past the crossover, vibe coding costs 3x to 10x more per feature," flagged by Osmani as "illustrative, not a measured constant"; Hacker News threads.
- **Landing‑page roast/teardown pricing:** landingpageroasts.gumroad.com — Olly Meakings **$350**, 15‑min private video in 48 hours, "800+ landing pages… almost $300,000" (corroborated by spp.co case study); roastd.io $179; thegood.com (free, upsell ~"$120k/year"); crowdtamers.gumroad.com GTM teardown $800; pages.report.
- **Positioning pricing:** aprildunford.com (Section4 course $750/$1,000; workshop $50K–100K+ per positioningexpert.com); PitchKitchen sprints $17K–75K, Open Kitchen $5K–8K/mo.
- **Vibe‑code rescue market:** relux.works (**$3,000 audit / 1 week; $10,000 stabilization; $15,000–40,000 migration**, audit credited; "fix one bug, three more appear… explained it to the AI seventeen times"); pragmaticcoders.com; redwerk.com; techavidus.com; pimpyourcode.com; vibecoderescue.com; solutyics.com. Per 404 Media (Sep 2025), VibeCodeFixers.com has "almost 300" developer profiles and Fiverr's "vibe coding" category shows 133 services.
- **First‑users / distribution incumbents:** demandcurve.com (Growth Program $1,200; ~95K subscribers, self‑reported); softformance.com; beyondlabs.io; freecodecamp.org; Rob Walling "The SaaS Playbook."
- **Book‑launch mechanics (zero audience):** Steve Schoger on X (@steveschoger, Dec 11, 2020) — Refactoring UI "$99/$149… over 20,000 copies… yet to have a single day without a sale," launched off an owned Twitter audience + free chapters; Arvid Kahl on Writer on the Side Ep. 049 — Zero to Sold made "over $8,400 in 1 week" on Amazon + Gumroad, Product Hunt #4 Product of the Week (thebootstrappedfounder.com); newsletter ~21.3K subscribers (Passionfroot media kit). HN Show HN rules: books allowed only *with* sample chapters; signup walls/paywalls/thin AI wrappers punished; soliciting upvotes detected and killed (favors.dev, kbaise.com, stackmatix.com).
- **Creator‑audience context (who serves this pain):** Lenny Rachitsky, "1,000,000" (lennysnewsletter.com, Mar 4, 2025) — "one million subscribers… over a quarter are founders"; Harry Dry / Marketing Examples ~130K (secondhand, corroborated); Demand Curve ~95K (self‑reported).
- **Emerging low‑authority "you built it, nobody came" claimants:** postiv.ai, okara.ai, octaveagency.com, dev.to VIBE_ marketplace.
- **Could NOT verify:** hard monthly search‑volume integers for any candidate term — gated behind Ahrefs/Semrush logins. The open web returned only directional signals (one low‑authority blog claims "vibe coding" grew to ~60K/mo by March 2026; a LinkedIn post claimed "+6700% in three months"). **Before committing SEO effort, run the 15 candidate strings through Ahrefs Keywords Explorer or Semrush Keyword Overview for hard US/global volumes and true keyword difficulty.** This is the one input I could not source honestly, and it should gate recommendation #11 (not #6, which stands on distinct‑author counts, not search volume).

---
*Methodology note honored throughout: every count is weighted by distinct authors, quoted with its denominator, and treated as evidence about language, not market size. No market‑size number is derived. `sameness` = 19 and `would_pay` are treated as upper bounds and flagged wherever load‑bearing (the $5K/mo lane). No testimonials, numbers, or claims about the operator were invented; the one factual gap I could not close (keyword volumes) is stated as such rather than papered over.*