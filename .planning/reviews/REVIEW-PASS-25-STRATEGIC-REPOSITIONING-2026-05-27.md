# Pass-25 Strategic Repositioning Brief — micahjonesconsulting.vercel.app

**Prepared:** May 27, 2026
**Operator:** Micah Jones (Oakland, CA)
**Scope:** Copy + structure pivot. Visual/motion redesign and SEO are out of scope.

---

## § 1 — Positioning thesis (≤ 300 words)

**One-sentence positioning:**
**I am the operator who ships product enterprise procurement signs off on — and now the one writing down how solo builders can do a smaller version of the same thing with AI tools.**

Supporting:
- Two cap-table exits. Guardicore (Akamai, 2021) and TechValidate (SurveyMonkey, IPO 2018). Receipts, not slides.
- Roughly $20M in client revenue across 2013–2023. Deployments at TD Bank, Deutsche Bank, NIH, Peoples Natural Gas.
- Now solo-building Ordani on Next.js, Supabase, Vercel, Claude Code, and Cursor. Fourteen practices in private beta. Zero churn at six months.
- That means I do not theorize about the AI-builder stack. I run it in production, against HIPAA, with paying users.

**Why this is defensible.** Most enterprise operators with two exits don't ship code; most vibe coders shipping code don't have enterprise receipts. The intersection is small and verifiable: a real product, deployed, with real users, built solo on the same tools the buyer is using. That is the moat. Buyer A (companies hiring) sees a senior operator who can sit in the chair. Buyer B (vibe coders) sees the rare person who has actually crossed the gap they are stuck at. The brand widens without changing what it is.

---

## § 2 — Buyer A copy direction (companies hiring)

**Search language they use:** "fractional CTO," "fractional VP of Product," "fractional head of GTM," "interim VP Sales," "Staff Engineer contract," "Director of Product contract," "embedded GTM operator," "senior PM with AI experience."

**Signals they need in the first 5 seconds:** named company exits (Akamai, SurveyMonkey IPO), named enterprise customers (TD Bank, Deutsche Bank, NIH), a $/scale figure ($20M client revenue, ~$15M pipeline originated at Guardicore), proof he has owned an outcome (not just consulted), and a way to download the receipts without booking a discovery call.

**Surface to serve them:** Add a dedicated `/hire-me` page (linked from the global nav as "Hire me" in small caps) with a downloadable CV/portfolio PDF and an email CTA. Buyer A should never be forced through the vibe-coder funnel to find the part of the site that proves Micah can sit in a Director-of-Product chair on Monday. The page should map his receipts to the four shapes hiring managers actually post: full-time IC/leadership, fractional executive, embedded contract, advisory. Each shape gets a one-line scope, a fit signal, and a "best for" note. The page should also list the verticals he has shipped into — security, survey/martech, healthcare, logistics — so a healthcare or finance hiring manager doesn't bounce thinking he's a SaaS-only operator. The CTA is "Download my CV (PDF)" plus a direct email link, not Calendly.

---

## § 3 — Buyer B copy direction (vibe coders) — PRIMARY

**Search language they use:** "Cursor keeps breaking my code," "Claude Code regression," "I'm 80% done can't finish," "vibe coding to production," "how to deploy Lovable app," "Stripe in v0," "HIPAA Supabase RLS," "no users no traction AI app," "shipped nobody came." Their pain is documented in their own forum language — e.g., on the Cursor Community Forum (Feb 3, 2025), user Klymix-Dev wrote: "Cursor costing me days of backtracking... it also scraps my entire design, layout, functionality, import calls, dependencies, etc… EVERYTHING… my design now looks like a blind hamster drew it with a crayon in its teeth and cursor has no idea what happened to it." On Indie Hackers (May 2026): "I have a great product with 37 users. I'm exhausted. I feel like I'm shouting into the void."

**Signals they need in the first 5 seconds:** that the author actually shipped a real product solo with these tools (Ordani — HIPAA, Supabase RLS, two outside security reviews, 14 paying-ish practices, zero churn); a price they can afford ($49–$199 range, not $50K); the specific pain pattern named back to them in their own words ("It got to 80% then started breaking things every time I asked for changes"); and a single visible CTA: "Get the playbook — $149."

**Surface to serve them:** The home hero leans 70/30 toward Buyer B. Add a `/stuck` landing page that funnels into the PDF sales page. Add a `/playbook` route for the product itself. The hero copy must lead with the buyer's internal monologue, not Micah's resume. Buyer B does not care about Akamai. They care that someone with Akamai on their CV bothered to write down what they learned shipping the same kind of solo-AI build the reader is stuck on.

---

## § 4 — Tier 1 PDF product spec

### Working title (three options, one pick)

1. **"The 80% Wall: A field manual for solo builders stuck between demo and production."**
2. "From Demo to Deployed: The solo builder's playbook for shipping AI-built software, with users."
3. "Ship Real: A working guide for vibe coders past the prototype, before the launch."

**Pick: #1 — "The 80% Wall."** Because the phrase already exists in the buyer's own forum vocabulary. The "80% wall" is the moment Cursor or Claude Code starts breaking the code every time the operator asks for a change — the most-described pain pattern in the corpus (one Substack solo builder put it: "It looked like 80% of what I wanted. Then I looked closer. No deduplication... The app ran, but it didn't do the thing I wanted it to do."). A title that names the buyer's exact moment of frustration converts. Subtitle does the rest of the work: *A field manual for solo builders stuck between demo and production.* "Field manual" signals practical, dense, and operator-written — not influencer thought leadership.

### Format recommendation

**Hybrid: a 70–90 page PDF + a downloadable companion .zip.** The PDF carries the narrative spine and the diagrams. The .zip carries the artifacts: prompt files for Claude Code and Cursor, a deploy checklist, a security pre-flight checklist, a Stripe-in-production setup, a "distribution loop" template, a sample architecture doc, and three filled-in spec examples. Reasoning: PDFs are searchable, offline, screenshot-able, and feel substantial; .zip companions raise perceived value above a pure-text product without adding cohort/community overhead. No video. Video gets stale every six weeks as the tools update; written word with versioned re-issues holds longer. Sentence-by-sentence editorial restraint (Monocle/WSJ feature voice) does heavier lifting than a course.

### Length

70–90 pages, ten chapters. ~25,000 words. Dense but not bloated. Charts and architecture diagrams should account for ~20% of pages.

### Price point

**$149** at launch, with a $99 early-bird window for the first 100 buyers (price-anchor on the $149 number).

**Reasoning.** This sits in the proven solo-operator sweet spot. Comparables: Justin Welsh's LinkedIn Operating System at $150 (per Scott Stockdale's analysis at scottstockdale.co.uk, Welsh cleared $1.28M across his two $150 courses — the LinkedIn OS and Content OS combined — before migrating the product off Gumroad to his own platform at learn.justinwelsh.me; total business revenue has since surpassed $10M); Marc Lou's ShipFast at $199 (one-time, boilerplate); Pieter Levels' MAKE at $29.99 (the book pre-ordered at $26.99 and listed at $30 at readmake.com; a physical edition on levelsio.com is listed at $35.00, with over 25,000 copies sold per the product page). $49 reads as a leaflet from a junior; $299 prices out the broke vibe coder this is for; $199 collides with Marc Lou's boilerplate, which the buyer perceives as more tangible. $149 says "operator-grade, not influencer-grade, still affordable on a personal card." Raise to $199 after 500 sales with grandfathered pricing for early buyers, per Welsh's playbook.

### Table of contents (10 chapters)

1. **Why your build broke at 80%** — naming the pattern. What actually happens in the context window when Cursor or Claude Code starts undoing your features. The structural reason, not the vibes.
2. **The spec is the moat** — writing the one-page spec the AI keeps re-reading. Why drift, not bugs, is the killer. Template included.
3. **The architecture you didn't draw** — the single diagram every solo build needs. Auth, data, file storage, edge, third-party. Where AI tools quietly cheat on each.
4. **Deploy day** — Vercel, Supabase, environment variables, SSL, domains, secrets. The exact pre-flight list. Everything that bites you the day you go live, in order.
5. **The security pre-flight** — RLS done correctly, the auth pattern that survives, hardcoded keys you didn't know you left, the two checks that catch most vibe-coded vulnerabilities. (Per Veracode's 2025 GenAI Code Security Report: 45% of AI-generated code samples fail basic security tests.)
6. **Stripe in production (without crying)** — webhook reliability, refund flow, subscription edge cases, the test→live failure modes nobody mentions.
7. **Compliance, when it matters** — HIPAA, SOC2, GDPR. When you genuinely need them, when you don't, and what "compliant" actually requires versus what your landing page is allowed to claim.
8. **The first ten users** — getting from launch to the first ten people who keep using it. Where they come from. Why "post on Product Hunt" stopped working in 2025.
9. **The distribution loop** — turning the first ten into the next hundred. Reply, don't broadcast. Channel-specific patterns. The metric that matters before MRR.
10. **When to hand it off** — the signals you have outgrown solo. When to hire, when to fractionalize, when to sell, when to keep going.

Plus an appendix: **Prompt patterns that don't break your codebase** — the working prompt library, with notes on which model handles which task best.

### Distribution / sales platform

**Lemon Squeezy.** Three reasons. (1) Merchant-of-record handles global VAT/sales tax, which a solo operator should never spend a Sunday on. (2) The audience is global and developer-leaning; Lemon Squeezy's checkout, license keys, and Stripe-backed reliability fit. (3) It lets the brand stay first-party — the buyer lands on a `/playbook` page on Micah's domain, the checkout iframes through. Gumroad is the fallback if a same-day launch matters more than tax cleanliness; do not use Stan Store (creator/coach audience mismatch). Use Kit (formerly ConvertKit) or Buttondown for the email list; do not put the buyer on Substack — wrong context.

### Lead-gen flow

1. **Top of funnel:** SEO-tuned `/stuck` landing page and a free 12-page sampler ("Chapter 1: Why your build broke at 80%") in exchange for email. Sampler is a real chapter, not a teaser.
2. **PDF purchase ($149):** Lemon Squeezy checkout. Instant download. Buyer is auto-tagged in Kit.
3. **First seven-day sequence:** five emails. Day 0 — download confirmation + one specific prompt to try tonight. Day 2 — the spec template, with a worked example. Day 4 — the deploy-day checklist. Day 6 — a single case study (anonymized, not Ordani). Day 8 — soft introduction to advisory.
4. **Upsell to discovery call:** an in-PDF callout and a Day-21 email. Copy: "If your build is past the playbook and you need a second pair of hands, here are the four shapes we could work in." Link goes to `/services`, not Calendly. Calendly is one click further. Filter by intent.
5. **Refund policy:** 30-day, no questions. Public. (Comparable: Justin Welsh publicly states a sub-5% refund rate on his $150 courses across 17,000+ students, per his justinwelsh.me newsletter.) Reduces friction without meaningful downside.
6. **Conversion benchmarks to track:** landing → email (target 4–6%), email → PDF buy (target 2–3% over 60 days), PDF buy → discovery-call request (track against Micah's own observed conversion rate from existing engagements — public benchmarks for this specific step are thin and operator-specific is the right baseline anyway), discovery → engagement (existing rate). At $149 × 100 sales/month = $14,900/mo at the floor; the higher value is that even a small percentage of buyers booking a discovery call is a flow of two warm $25–75K engagement leads/month into Tier 2.

---

## § 5 — Site-wide rewrite plan, page by page

### Home — hero

**Verbatim from live site:**
> "Independent operator · Oakland, CA"
> "I build the go-to-market and product. product. position. launch. engine. product."
> "Strategy and software, shipped by the same pair of hands. Enterprise GTM and *a product in private beta with fourteen practices.*"
> "[Book a call →] [See how I work ↓]"

**Verdict:** Modify. The kinetic "product. position. launch. engine." rotator stays — it's the most distinctive element on the page and the only thing that signals "operator who actually does the thing." Subhead has to do new work: signal both buyers without bending either out of shape.

**Proposed rewrite:**
> H1 (keep): *I build the go-to-market and product. position. launch. engine. product.*
> Sub (new): *Two enterprise exits behind me. A HIPAA-grade SaaS in private beta, built solo with the same AI tools you're using. The playbook for shipping past the 80% wall is below.*
> Primary CTA (new): **Get the playbook — $149** → `/playbook`
> Secondary CTA (new): **Hire me** → `/hire-me`
> Tertiary CTA (kept, demoted): See how I work ↓

The 70/30 lean toward Buyer B is delivered by the primary CTA, not by changing the H1. Buyer A is one click from the receipts page; Buyer B is one click from the product they came for.

### Home — Revenue and exits block

**Verbatim:**
> "$20M+ in client revenue across a decade. Two enterprise exits. **Trillions in digital assets behind the deployments.**"
> "01. **Guardicore** → **Akamai**" — block as written.
> "02. **SurveyMonkey Enterprise**" — block as written.

**Verdict:** Modify lightly. The Guardicore block currently reads positioning-only. Rewrite the second sentence to reflect the full sales/GTM/channel breadth.

**Proposed rewrite of the Guardicore block:**
> "01. **Guardicore → Akamai**
> A category saturated with honeypots and no real visibility into the network. I ran sales as a manager wearing several hats — originating roughly $15M in pipeline across three years, building the MSSP and reseller channel, training the sales team, and running the positioning research that repositioned the platform from honeypot-lead to **visibility + east-west microsegmentation**. The repositioned narrative carried the deals at TD Bank, Deutsche Bank, NIH, and Peoples Natural Gas. Akamai acquired shortly after."

SurveyMonkey block stays as written. It already does its job in two sentences.

### Home — Services row

**Verbatim:**
> "Strategy that ships, not slides."
> "01 Positioning & GTM — You built it. Enterprise teams still aren't buying. The gap is positioning, not features."
> "02 End-to-end product building — Most AI ideas die in the gap between demo and production. I work in that gap."
> "03 Frontier AI engineering — Eval, orchestration, deployment — the shipping discipline most AI founders skip."

**Verdict:** Keep all three. Modify the headline.

**Proposed rewrite:**
> Headline: *Three engagements. Built for companies, founders, and operators who need outcomes shipped — not slides.*

The three service cards stay; they already map cleanly to both buyers (companies hiring Micah for an embedded shape; founders graduating from the PDF into a real engagement).

### Home — Operating principles

**Verbatim:**
> "01 — I work where AI prototypes die: the production gap..."
> "02 — Every engagement ships a named artifact in month one. No decks. No discovery debt."
> "03 — I've shipped product deployed at TD Bank, Deutsche Bank, NIH, Peoples Natural Gas. I know what enterprise procurement actually pays for."
> "04 — I've been on the inside of two exits — one acquisition, one IPO. I know what acquisition-ready looks like."

**Verdict:** Modify. Principle #03 violates the brand rule "Evidence before claim. Don't say 'I know what enterprise procurement pays for' — say 'I shipped product deployed at TD Bank…' and stop." Strip the editorial.

**Proposed rewrites:**
> 03 (new): "I shipped product deployed at TD Bank, Deutsche Bank, NIH, and Peoples Natural Gas."
> 04 (new): "I've been on the cap table for two exits — Guardicore to Akamai in 2021, TechValidate to SurveyMonkey, IPO'd in 2018."

Principles #01 and #02 stay.

### Home — Ordani block

**Verbatim:**
> "Live beta — 14 doula practices — Hundreds of users active"
> "Birth workers run their practices on group chats and paper intakes. HIPAA is the law; compliance is impossible without real infrastructure. *I built it.* Row-level encryption, two outside security reviews, fourteen practices in private beta. Zero churn."

**Verdict:** Keep. This block is doing the heaviest work for Buyer B — proof that the playbook author has actually shipped, not just talked. Tighten the credibility chain by one line.

**Proposed addition:**
> Add one line at the end: *"Built solo on Next.js, Supabase, and Vercel. The same stack the playbook teaches."*

That single line collapses the gap between the credibility anchor (Ordani) and the product for sale ($149 playbook).

### Home — Shipped grid ("Engagements")

**Verbatim:**
> "Work that shipped. Two platforms acquired and public. A content engine that wins inbound. Frontier AI in production for founders."

The three engagement cards (HR-equity author, Guardicore/SurveyMonkey GTM, frontier AI engineering) stay.

**Verdict:** Modify the headline only.

**Proposed rewrite:**
> Headline: *Shipped, not pitched.*

The cards underneath already do the work.

### Home — Footer line

**Verbatim:**
> "2013 — 2023. Also at **Flexport**, **Cuebiq**, and **Postmates** — growth, GTM, and platform strategy across a decade of enterprise software."

**Verdict:** Keep as written.

### Home — Final CTA

**Verbatim:**
> "NAME THE PROBLEM →" linked to Calendly.

**Verdict:** Modify. The final CTA should split.

**Proposed rewrite:**
> Two CTAs side by side:
> *Stuck on a build → Get the playbook ($149)*
> *Hiring an operator → Book a call*

### `/about`

I could not fetch `/about` on the preview deployment. **Flag in §9.** The rewrite for `/about` should follow these rules: open with a single line of buyer-relevant pain (not biography), then deliver receipts in chronological reverse (Ordani first, Guardicore second, TechValidate/SurveyMonkey third, Flexport/Cuebiq/Postmates fourth), close with a one-line statement that names what Micah will and won't take on. No mission statement. No values list. Reference voice: a Bloomberg Businessweek operator profile, not a LinkedIn bio.

### `/services`

**Verbatim opening:**
> "Three engagements. Four shapes each."
> "Three services — positioning & GTM, end-to-end product building, frontier AI engineering. Each carries four engagement shapes: advisory, project, retainer, embedded."

**Verdict:** Keep the structure (three services × four shapes). Add a small block at the top that names which buyer this page is for.

**Proposed addition above H1:**
> *For companies hiring an operator on a defined engagement. If you're solo and stuck on an AI-built product, the playbook is probably a better first step → `/playbook`.*

This self-selects Buyer B out of the page (and into the funnel that actually serves them), and signals to Buyer A that this page is theirs.

The rest of the services page stays as written. The four-shapes-per-service grid is already the most operator-credible spine on the site.

### `/services/ai-engineering`

**Verbatim:**
> "Your AI works in the notebook. Production is a different stack. I run eval infrastructure, prompt-deployment pipelines, and the orchestration that turns frontier capability into a product real users touch. Engagements are ongoing; specifics live under NDA."

**Verdict:** Keep. This page is doing fine. Add one line at the end of the B-section that bridges to the playbook for sub-$50K buyers:

> *If your stack is pre-production and you're solo, the field manual at `/playbook` covers most of what the advisory shape covers — for $149 instead of $5K/month.*

This is the canonical Tier-1 → Tier-2 bridge in reverse: telling the right buyer that the cheaper product is the right starting point. Builds trust. Filters in serious advisory buyers, filters out the merely curious.

### `/work` (index)

I could not confirm the existence of a `/work` index page from the homepage links. The home's "Engagements" section may be the only index. **Flag in §9.** If a `/work` index exists, propose: keep the three case studies; add a fourth tile linking to `/playbook` titled *"The playbook — for solo builders stuck mid-build."* This makes the PDF visible as work, not just product.

### `/work/guardicore` — **FULL REWRITE**

**Verbatim from live site:**
> "Repositioned a saturated security platform from honeypot-lead to visibility + east-west microsegmentation. The narrative that carried the enterprise sale and the Akamai acquisition."
> "Role: Positioning researcher. Tools: Customer interviews, Sales-call analysis, Category research, Messaging frameworks. Year: 2020."
> "## The problem ... ## Approach ... ## Outcome — The average enterprise deal size moved up by $150K."

**Verdict:** Kill the "positioning researcher" framing. Replace end to end. The existing copy undersells three years of cross-functional sales/GTM/channel work as a single research engagement. Per the operator: he was a sales manager wearing several hats in a former-military-led org, originating roughly $15M in pipeline, building the MSSP and reseller channel, training the sales team, AND running the positioning research that carried the narrative.

**Proposed rewrite (full page):**

> **Hero strap:** PIPELINE.CHANNEL.NARRATIVE.ACQUIRED.
> **Hero deck:** Three years inside a former-military-led security company. I originated roughly $15M in pipeline, built the MSSP and reseller channel, trained the sales team, and ran the positioning research that carried the Akamai acquisition narrative. Customers included TD Bank, Deutsche Bank, NIH, and Peoples Natural Gas — trillions in digital assets behind the deployments.
>
> **Role line:** Sales manager / multi-hat operator. Pipeline origination, channel build, enablement, positioning research. 2018–2021.
>
> **## The problem**
> The security market was saturated with honeypot products. Customers had no visibility into their own networks. Enterprise buyers were signing six-figure deals for a reason the top-of-funnel message wasn't naming. The pipeline existed, but it had to be built — the company was pre-channel, pre-scale, and the sales motion lived in the founders' heads.
>
> **## What I owned**
>
> **01. Pipeline origination.** I ran the discipline that built roughly $15M in qualified pipeline over three years. Outbound sequencing, account targeting, executive briefings, and the early-stage qualification that filtered tire-kickers out before they ate the AE bandwidth. I sat in the deals.
>
> **02. MSSP and reseller channel.** I built the channel from zero — managed service security providers, regional resellers, integration partners. Channel reps were trained on the same narrative the direct team carried. Channel revenue compounded as the direct motion scaled.
>
> **03. Sales enablement and training.** I trained the BDR and AE team on the repositioned narrative — call structure, objection handling, demo flow, procurement-committee language. The training carried into post-acquisition Akamai Guardicore Segmentation.
>
> **04. Positioning research and the acquisition narrative.** Customer interviews with deployed enterprises. Sales-call analysis with the BDR and AE team. A category read on what competitors claimed and what buyers actually responded to. The repositioning landed on two anchors — *visibility* and *east-west microsegmentation* — and that became the narrative that carried into the Akamai acquisition and the post-acquisition product line.
>
> **## Outcome**
> Roughly $15M originated. The MSSP and reseller channel running at scale by year three. Average enterprise deal size moved up by $150K. Customers included TD Bank, Deutsche Bank, NIH, and Peoples Natural Gas. Akamai acquired in 2021. The positioning carried into Akamai Guardicore Segmentation.

This rewrite gives Buyer A (hiring managers reading the page to evaluate whether Micah can sit in a VP GTM or Director of Sales chair) the receipts they need in the first ten seconds. It also reframes Buyer B's read of Micah from "marketing guy" to "operator who can sell, train, and build channel."

### `/work/ordani`

**Verbatim:**
> "A HIPAA-compliant CRM for birth workers. Solo build. Next.js + Supabase. 14 practices in private beta."

**Verdict:** Keep. This page is doing the heaviest credibility work on the entire site and is already in the right voice. Add one bridge sentence in the closer.

**Proposed addition** (after the existing "## Outcome" paragraph and pull-quote):
> *"What I learned shipping this solo with AI tools — the spec, the architecture, the deploy day, the security review, the first ten users — is written down in the playbook at `/playbook`."*

That sentence converts the page from a case study into the highest-trust entry point to the $149 product.

### `/work/hr-equity-author`

**Verbatim:**
> "Built the algorithm, content, and RFP infrastructure for an industry-authority author. Monthly reach grew from ~8,000 to 290,000+ in five months. RFP-to-close rate doubled."

**Verdict:** Keep entirely. This is the strongest case study on the site — measured outcomes, defensible mechanism, real receipts. Do not touch it. (Note: the slug `hr-equity-author` exposes the vertical; consider renaming to `/work/industry-author` if the operator wants to keep the engagement vertical-neutral on URL inspection. Confirm with operator.)

---

## § 6 — New surfaces needed

### `/hire-me` — Buyer A landing

- **Route:** `/hire-me`. Linked from global nav ("Hire me") and from the Buyer A CTA in the home hero.
- **H1:** *Hire me — full-time, fractional, or contract.*
- **Subhead:** *Two enterprise exits. $20M in client revenue. Product deployed at TD Bank, Deutsche Bank, NIH, and Peoples Natural Gas. Now building Ordani solo. Available in four shapes.*
- **Structure (top to bottom):**
  1. Three-line receipts row (exits, revenue, named customers).
  2. Four engagement shape cards: Full-time IC/leadership; Fractional executive (CTO / VP Product / VP GTM, with US market rate context $8–22K/mo per Fractionus 2026 data); Embedded contract (defined window, 3–6 months); Advisory (4–6 hrs/month).
  3. "Verticals I have shipped into" — security, survey/martech, healthcare, logistics, content/media.
  4. "What hiring managers tend to call this" — a translation row that maps Micah's experience to job titles HMs actually post: *Director of Product, Head of Product, VP Product, Staff/Principal Engineer, VP GTM / Head of Sales, Fractional CTO, Founding PM, Head of Applied AI.*
  5. CTAs: **Download my CV (PDF)** (primary), **Email me** (secondary), **Book 30 min** (tertiary, demoted on purpose — HMs evaluate on paper first).

### `/playbook` — Buyer B landing (PDF sales page)

- **Route:** `/playbook`. Linked from home hero primary CTA, home final CTA, `/services/ai-engineering` outro, `/work/ordani` outro.
- **H1:** *The 80% Wall.*
- **Deck:** *A field manual for solo builders stuck between demo and production.*
- **Structure (top to bottom):**
  1. Pain-led opener (three lines of the buyer's own internal monologue in plain text — no quote marks).
  2. Why this author. One paragraph. Ordani, the receipts, the stack.
  3. Table of contents (the ten chapters from §4).
  4. Sample chapter download (free, in exchange for email).
  5. What's in the companion .zip.
  6. Pricing — $149, anchored against a $5K/month advisory shape.
  7. Buy button (Lemon Squeezy iframe).
  8. FAQ — "Is this for me?" / "Do I need to know how to code?" / "How is this different from a YouTube tutorial?" / "Refund policy."

### `/stuck` (optional) — SEO funnel into `/playbook`

- **Route:** `/stuck`. Specifically SEO-tuned for the three pain patterns. Three sections, each named for the pattern: *"Stuck mid-build" / "Can't launch" / "Launched, no traction."* Each section is 200–300 words of editorial that names the pain in the buyer's language and ends with a CTA to `/playbook`.

### `/cv.pdf` — static asset

- Generated PDF of the CV, downloadable from `/hire-me`. Versioned. Operator updates quarterly.

---

## § 7 — Priority order (ship in this sequence)

1. **`/work/guardicore` — full rewrite.** File: `app/work/guardicore/page.tsx` (or equivalent). Replaces the "positioning researcher" framing with the full multi-hat sales-manager reality. Why it matters: this is the single largest credibility gap on the site for Buyer A, and operator has flagged it as a known defect.
2. **Home hero rewrite + dual CTA.** File: `app/page.tsx`. New subhead, new primary CTA to `/playbook`, secondary CTA to `/hire-me`. Why it matters: nothing else moves until the front door routes to the two buyers.
3. **`/playbook` landing page + sample-chapter capture.** New route. File: `app/playbook/page.tsx`. Sales page wired to Lemon Squeezy; Kit form for the free Chapter 1 capture. Why it matters: this is the new revenue surface and the primary lead-gen funnel; the rest of the site links into it.
4. **`/hire-me` landing page + downloadable CV.** New route. File: `app/hire-me/page.tsx` and `public/cv.pdf`. Why it matters: gives Buyer A a place to land that doesn't force them through the vibe-coder funnel, and gives recruiters a download to share.
5. **Operating principles + Guardicore-block-on-home rewrites.** Files: `app/page.tsx` sections. Strip editorial from principles 3 and 4; rewrite the Guardicore home block to reflect the full sales/GTM/channel breadth. Why it matters: applies the "evidence before claim" rule consistently and aligns the home receipts with the new `/work/guardicore` page.

Ship 1 and 2 same day. 3 within the week. 4 within two weeks. 5 in the same PR as 1.

---

## § 8 — Risks and tradeoffs

1. **The two-buyer tug.** Vibe coders and enterprise hiring managers do not normally share a homepage. The risk is that an HM at a healthcare or finance company lands on the home, sees "$149 playbook" as the primary CTA, and downgrades Micah to "creator." Mitigation: the receipts row (exits, $20M, named customers) sits *above* the CTAs in the hero; the secondary CTA "Hire me" is visible at first paint; and `/hire-me` is in the global nav. The HM should be one click from the receipts page they care about. If after 90 days HM-attributed inbound drops, retest with a slightly more conservative hero — receipts first, playbook second, both CTAs equal weight.
2. **The AI-founder buyer getting diluted.** A founder shopping for $50K of frontier AI engineering may see the $149 playbook in the hero and assume the operator is downmarket. Mitigation: `/services/ai-engineering` stays unchanged; the playbook bridge sentence at the bottom of that page positions the PDF as a free-of-engagement first step, not a downgrade. The frontier-AI buyer rarely lands on the home — they arrive on the service page from search or referral. If conversion on `/services/ai-engineering` drops, kill the playbook bridge sentence on that page only.
3. **Playbook quality risk.** A $149 product from someone with two exits is expected to be denser than a Marc Lou boilerplate. If the PDF ships under-baked, refunds and review damage hurt the brand more than the missing revenue would. Mitigation: do not ship until two outside readers (one technical, one not) have stress-tested it. Treat it as a product launch, not a side project. The Ordani security-review pattern applies here too.
4. **Guardicore narrative correction is sensitive.** The current "positioning researcher" framing is well-written; rewriting it to claim ~$15M in pipeline origination and channel building raises the bar on what someone fact-checking the CV will find. Mitigation: keep every claim narrowly true and verifiable. "Roughly $15M" and "three years" and "MSSP and reseller channel" should hold up to a reference check; do not overreach.
5. **Solo bandwidth.** Running a $149 PDF funnel + a `/hire-me` page + an active Ordani beta + three live engagements is a real load on one person. Mitigation: the playbook is built to be a one-time write + quarterly version bump, not a course requiring weekly delivery. Kit's automation does the email follow-up. Lemon Squeezy does the fulfillment. The funnel should not produce more than a handful of discovery-call requests/week at the projected volumes; that is manageable solo.
6. **Vibe-coder audience volatility.** The category itself may collapse or rename — per Barclays analyst research reported in Business Insider (September 2025), Lovable traffic was down 40% from its June 2025 peak (when it hit $100M ARR); Vercel's v0 was down 64% since May; Bolt.new down 27% since June — with Barclays writing: "This waning traffic begs the question on whether app/site vibecoding has peaked out already." TechStartups.com's December 11, 2025 piece reported verbatim: "AI coding traffic collapsed 76% globally in 12 weeks." Mitigation: title the playbook "The 80% Wall," not "The Vibe Coder's Playbook." The pain pattern survives the category name; the buyer in 2027 may be called something else. Plan a Q4-2026 re-issue regardless.

---

## § 9 — What I could not verify (flag to operator)

1. **`/about` page contents.** The Vercel preview deployment blocked fetching `/about` on the first attempt and the URL was not surfaced in search results either. I quoted from every other page verbatim, but the `/about` rewrite recommendation in §5 is structural only. I need the actual current copy to quote before proposing line-level replacements. **Confirm with operator** or share the live URL with auth.
2. **`/work` index page.** I could not confirm whether `/work` exists as an index page or only as `/work/{slug}` routes. The home's "Engagements" section may be the only index. Confirm with operator.
3. **Existence of a current CV/resume PDF.** The brief implies one exists or is producible but does not confirm. The `/hire-me` page treats it as an asset to be produced if it doesn't already.
4. **"Hundreds of users active" on Ordani.** The homepage says "Hundreds of users active" but `/work/ordani` says "Fourteen active practices. Average twelve clients each" — which would be ~168 active users. Math holds, but the home and case study should agree on a single phrasing. Suggest the home use "168 active users across 14 practices" or keep "Hundreds" only if the number has grown since the case study was written. Confirm with operator.
5. **`/work/passioneer`.** The Ordani page links to `/work/passioneer` as "next work" but Passioneer is not listed in the home Engagements grid. Either the page exists and is unlinked from home, or the link is broken. (Notable: a v0-built earlier version of the consulting site, surfaced in search, described Passioneer as a creator social-platform product — Next.js + TypeScript + Node.js + React + Supabase + Python — but it is unclear whether the current site exposes that page. Confirm.)
6. **TechValidate exit framing.** Brief says "TechValidate acquired by SurveyMonkey in 2015 (equity held through SurveyMonkey's 2018 IPO)." Live site says "SurveyMonkey Enterprise — Acquired … IPO·2018" without distinguishing TechValidate-the-acquisition from SurveyMonkey-the-IPO. Recommend explicitly naming TechValidate in the home block and on `/hire-me` so it reads as two distinct cap-table events. Confirm with operator.
7. **The $20M revenue window.** Brief says "Roughly $20M+ in client revenue across 2013–2023." Site says "$20M+ in client revenue across a decade." Keep aligned across new surfaces.
8. **PDF→discovery-call conversion target.** Public benchmarks for the *PDF buyer → discovery-call request* step specifically are thin; the source previously cited could not be re-verified. Track this against the operator's own observed conversion rate from existing engagements rather than against an external number. Confirm.
9. **Whether Micah has bandwidth for the lead-gen sequence.** The Kit five-email sequence and the bridge from PDF to discovery call assume he wants more inbound. Confirm engagement capacity in Q3 before flipping the funnel live.
10. **"Black founder" framing.** Brief notes Micah is a Black founder. The current site doesn't lead with identity, which is consistent with the operator-brand-not-identity-brand voice. Confirm whether he wants any surface (e.g., `/about`) to name it explicitly, or whether it stays in the work (the Ordani Why-it-matters paragraph about Black maternal mortality already does the heavy lifting). Operator's call.
11. **BirthFlow.** The original task brief mentions BirthFlow as a project to draw memory from. Nothing in the live site references it; it may be an internal/earlier name for Ordani or a separate project. Confirm before any new surface references it.

---

*End of brief. Hand to Claude Code in the order specified in §7.*
