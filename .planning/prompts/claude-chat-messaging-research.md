# Brief for Claude Chat — sharpen every word on micahjonesconsulting.com

I'm an independent operator running a consulting + product practice. The site is built. The framing works. But the COPY across every surface needs to sound more premium, more inevitable, more like the front of a boutique strategy practice and less like an indie hustler. I want you to help me sharpen every line.

Below is everything: the brand voice, the banned-word patterns my build will reject, the site architecture, and every piece of copy on every surface. At the end I list what to research and what to deliver.

---

## 1. Who I am, what I sell

- **Micah Jones.** Black operator, based in Oakland, CA.
- Independent — fractional engagements, not full-time roles.
- Average engagement: $150K–$300K.
- $20M+ in client revenue across a decade (2013–2023).
- Two real enterprise exits at companies I helped build:
  - **Guardicore → Akamai (2021).** I owned the positioning research that repositioned the platform from honeypot-lead to visibility + east-west microsegmentation. Customers included TD Bank, Deutsche Bank, NIH, Peoples Natural Gas. Trillions in digital assets sat behind the deployments.
  - **SurveyMonkey Enterprise (IPO 2018, Nasdaq).** Worked on the customer-evidence engine that became the SurveyMonkey Enterprise product line. Built the positioning + tooling that turned raw survey data into actionable customer evidence. Moved average enterprise deal size up. Equity held through the IPO.
- Currently building **Ordani** — HIPAA-grade practice management software for birth workers (doulas, midwives, perinatal counselors). Solo-built end-to-end on Next.js + Supabase with row-level encryption + two outside security reviews. 14 practices in private beta; hundreds of users active; eight of 14 still active at six months; zero churn.
- Currently doing **Frontier AI engineering** — production AI architecture and orchestration for founders shipping AI-native software. Eval infrastructure, prompt-deployment pipelines, retrieval failure modes. Specifics under NDA.
- Past engagements (named, smaller scope): Flexport, Cuebiq, Postmates.

---

## 2. What I want from you

For every section + every line of copy in this brief:

1. **Diagnose what's working and what's NOT working.** Honest, brutal, specific. No "this is great." If it's not great, say so.
2. **Propose sharpened alternatives.** Multiple options where there's a real choice. Operator-first voice (see §3). Constrained by the banned-word patterns (see §4).
3. **Research the 2026 market for fractional operator positioning** — the specific phrasing patterns successful operator portfolios are using right now. Quote reference sites by name where it helps. The goal is to sound like a peer of the best, not an imitation of the most-templated.
4. **Identify gaps in the messaging.** Sections or surfaces where copy IS missing that would help close a buyer.
5. **Score the current site.** 1–10 on "does this read as boutique consulting practice or as indie hustler?" Then tell me what would move the score up.

---

## 3. Brand voice — what's already locked

The voice is **operator-first, not consultant-first.** The distinction matters: consultants advise; operators own. The copy should sound like someone who has done the work, not pitched it.

Specific patterns I want preserved:

- **Editorial register.** Closer to long-form profile journalism than to SaaS marketing. Sentences carry weight. Punctuation does work. Em-dashes, middle-dots, parallel structures all earn their place.
- **First person singular** ("I owned the positioning research"), not the corporate "we" or third-person.
- **Specific over abstract.** "TD Bank's trading systems" beats "leading financial institutions." Concrete numbers ("$150K deal-size move") beat percentage hand-waves.
- **Earned-not-claimed.** Show the work, don't announce the brilliance. The site should make a buyer go "huh, this person is rare" rather than "this person says they're rare."
- **Restraint over abundance.** Three services is better than seven. Two paragraphs of body copy is better than five.
- **Sharp verbs.** Build, ship, rewrite, repositioned, moved, anchored. Verbs that name what a person actually did.

Voice reference sites I'd want this to sit beside without embarrassment:
- Rauno Freiberg's case-study posts (`rauno.me/craft/vercel`)
- Stripe Press marginalia and book sleeves
- The Gentlewoman contributor credits
- Pinkerton Zweck editorial copy
- Klim Foundry specimen pages
- Linear's About page mixed-register paragraphs
- Jonathan Hoefler's portfolio captions

Voice DO-NOTs:
- No bro-tech / hustle-porn / agency-speak
- No SaaS-landing-page tropes (hero "We help X teams Y by Z")
- No claims that can't survive a buyer's verification question
- No identity-performance (the operator is Black, but the site doesn't market the identity; it surfaces the work)
- No filler-adjective stacking ("a fast, intuitive, modern, premium platform")

---

## 4. Banned-word patterns (my build enforces this)

My build has a copy-lint hook that scans every file before commit and rejects writes containing buzzword terms from a curated ban-list. The full list lives in the project skill `premium-web:copy-lint-rules` — about 30 terms across the standard premium-portfolio categories. I can't enumerate the exact terms in this brief because the lint scans this file too.

Categories you can safely assume are blocked:

- Generic action verbs from the consulting-deck family that mean "did something nice for you" without naming what.
- Adjective families meaning "we made it great" (the smooth-flow / futuristic-edge / agile-forward set).
- Superlative-rank claims (best-of-X, world-X, beyond-X-generation).
- The corporate-alignment noun-of-the-2000s starting with S.
- Cliche buzzword phrases — the ones involving water depth, garden ladders, sewing needles, abstract force, geometric meeting points, temporal returns.
- Buyer-as-path / user-as-traveler metaphors.
- Generic "X-area-noun" placeholders (the catch-all consulting noun ending in -ions).
- Very-deeply-caring adjective families.
- Verb constructions of the "pleasing the user" or "skillfully making something" pattern.
- Verb families of "lifting up" + "opening what was closed."

When in doubt: swap for a specific operator-action verb (built / shipped / rewrote / moved / anchored / partnered) or a specific noun that names the actual artifact (positioning research, RAG pipeline, sales playbook). Operator voice benefits from the swap anyway.

Sentence rules also enforced:
- **Average 14 words per sentence** across any prose section.
- **Hard cap 25 words.** Split anything longer.
- **One adjective per noun, maximum.** "A fast, responsive, modern, mobile-first site" → "A fast site."

---

## 5. Site at a glance

- **Stack:** Next.js 16 App Router + Tailwind v4 + motion v12. Two route groups: `(foyer)` (home, services, AI subpage) and `(theater)` (case studies). Two distinct design registers.
- **Home design language:** "Color Worlds" — sections set `data-world` (terracotta / bone / petrol / espresso) and the page palette cross-fades as you scroll. Bricolage Grotesque display. Hand-drawn marks (a circle around the $20M+ figure). One signature animation (Ordani section sticky-scroll).
- **Case study design language:** "theater" — obsidian background, copper accent, Source Serif 4 italic, film-grain overlay. Different from the home register. This bifurcation is by design — like a magazine: the cover is loud, the inside spread is intimate.
- **Section order on home (top → bottom):**
  1. Hero (terracotta) — rotating-word display H1
  2. Service marquee (terracotta) — scrolling word strip
  3. Revenue + exits (terracotta) — `$20M+` figure + two-entry exits index
  4. Services / CLIENTS (bone) — 3-service teaser linking to `/services`
  5. Ordani (petrol) — live product section with private-beta signup
  6. Shipped (espresso) — 3 cards (HR-author, GTM at scale, Frontier AI) + "Also at" sub-credit
  7. Footer (terracotta) — "LET'S BUILD →"

---

## 6. Everything currently written on the site

Read everything below. Then critique and propose.

### 6.1 Site metadata (root `app/layout.tsx`)

- **Default title:** `Micah Jones — Oakland operator`
- **Title template (per-page):** `%s — Micah Jones`
- **Description:** `Independent operator in Oakland. $20M+ in client revenue. Two exits (Akamai acquisition, SurveyMonkey IPO). Now building Ordani — HIPAA-grade practice management for birth workers.`

### 6.2 Home page

**Hero (terracotta)**

- Eyebrow (mono uppercase, small): `Independent operator · Oakland, CA`
- H1 (Bricolage 800 ALL CAPS, display scale clamp 52–196px). Two lines:
  - Line 1: `I build the`
  - Line 2: rotating-word carousel cycling through `[product. / pipeline. / launch. / system.]` (italic, masked window)
- Sub (body): `Strategy and software, shipped by the same pair of hands. I build go-to-market for clients — and products with real users.`
- Primary CTA: `Book a call →` (links to Calendly)
- Ghost CTA: `See how I work ↓` (anchors to `#clients`)

**Service marquee (terracotta, scrolling)**

Words: `Go-to-market`, `Product`, `Launches`, `Growth`, `Strategy` — separated by `✦`. Loops infinitely.

**Revenue + exits (terracotta)**

- Figure (display): `$20M+` (with hand-drawn circle around it)
- Dek (display weight, multi-line):
  ```
  in client revenue across a decade.
  Two enterprise exits. Named institutional customers.
  Trillions in digital assets secured.
  ```
- **Entry 01 — Guardicore → Akamai · 2021 · Acquired**
  - Body (two paragraphs):
    - "A category saturated with honeypots and no real visibility into the network. Repositioned the platform from honeypot-lead to **visibility + east-west microsegmentation** — letting enterprise security teams see and defend lateral traffic, not just the perimeter."
    - "The repositioned platform reached the procurement committees that actually write the security checks: **TD Bank**'s trading systems, **Deutsche Bank**'s clearing infrastructure, **NIH** research environments, **Peoples Natural Gas**'s operational tech. Trillions in digital assets sat behind the deployments. Akamai acquired shortly after."
- **Entry 02 — SurveyMonkey Enterprise · 2018 · IPO**
  - Body (two paragraphs):
    - "SurveyMonkey customers had survey results but no way to act on them. Built the **customer-evidence engine** that turned raw survey data into the asset enterprise procurement actually pays for — visible proof of customer outcomes, queryable by sales and CS teams."
    - "Moved average enterprise deal size up. Anchored the Nasdaq IPO. Equity held through."

**Services / CLIENTS section (bone)**

- Kicker: `Services`
- Section title (h2): `Strategy that ships, not slides.`
- Three rows:
  - **01 — Positioning & GTM:** `Category-shift research and the narrative that carries the enterprise sale.`
  - **02 — End-to-end product building:** `Concept through shipped product, by the same operator. Strategy, design, code, security, launch.`
  - **03 — Frontier AI engineering:** `Production architecture and orchestration for founders shipping AI-native software.`
- Section CTA at bottom: `See full services →` (links to `/services`)

**Ordani section (petrol, live product)**

- Tagrow (three pills with middle-dot separators): `Live beta · 14 doula practices · Hundreds of users active`
- H2 (display, ink-bleed filter): `Ordani`
- Lede:
  ```
  HIPAA-grade practice management for birth workers — built end-to-end
  by one operator. Row-level encryption inside Supabase RLS, two
  outside security reviews, every read logged. 14 practices, hundreds
  of users; eight active after six months. Zero churn.
  ```
- Sub link: `Visit Ordani →` (placeholder — `href="#"` pending real URL)
- Email signup form below
- Note at bottom (mono uppercase): `Private beta · onboarding new users weekly`

**Shipped section (espresso)**

- Kicker: `Engagements`
- H2 (display): `Shipped.`
- Dek: `Real work in real users' hands. Two platforms acquired and public. A content engine that wins inbound. Frontier AI in production for founders.`
- **Card 1** (tag: `2024–present · Multi-engagement`)
  - H3: `Content + product for an HR author`
  - Body:
    ```
    Algorithm strategy, content engine, and bespoke product work for
    an HR / organizational-equity author. Three engagements through
    one relationship, each routed to a different end-client:
    ```
  - Sub-list (em-dash marker, mono small):
    - A top-tier research university — published-research web platform
    - A Fortune-500 enterprise — internal distribution platform; 30% revenue lift
    - A major American city — website, content engine, GTM, and a bespoke product
  - CTA: `See the engagement →`
- **Card 2** (tag: `Enterprise software · 2013–2023`)
  - H3: `GTM at scale`
  - Body:
    ```
    Positioning, market research, and the data backbone that moved
    deal size and revenue at platforms that sold (Guardicore →
    Akamai) and went public (SurveyMonkey Enterprise on Nasdaq). A
    decade of working directly with product teams in B2B software.
    ```
  - CTA: `See the receipts →`
- **Card 3** (tag: `2025–present · Embedded`)
  - H3: `Frontier AI, shipped.`
  - Body:
    ```
    Production-grade AI work for founders building AI-native software.
    The architecture and orchestration layers that turn frontier
    capability into a product users actually touch. Specifics under
    NDA — available for new engagements.
    ```
  - CTA: `See the engagement →` (links to `/services/ai-engineering`)

**"Also at" sub-credit (beneath the Shipped cards)**

- Eyebrow: `2013 — 2023`
- Line: `Also at Flexport, Cuebiq, and Postmates — growth, GTM, and platform strategy across a decade of enterprise software.`

**Footer (terracotta)**

- Big display link (h2): `LET'S BUILD →` (wraps Calendly)
- Footer row:
  - `Book a call ↗` (Calendly)
  - `hello@micahjonesconsulting.com`
  - `© 2026 — Micah Jones`

**Nav + mobile overlay**

- Wordmark (top-left): `MICAH/JONES`
- Nav links: `Clients`, `Ordani`, `Products`, `Contact`
- Menu button (mobile): `Menu —`
- Overlay close: `Close ✕`
- Overlay meta line: `Micah Jones — Independent operator — Oakland, CA`

### 6.3 `/services` page

**Header**

- Kicker: `Services`
- H1: `Three engagements. Four shapes each.`
- Intro:
  ```
  Three services — positioning & GTM, end-to-end product building,
  frontier AI engineering. Each carries four engagement shapes:
  advisory, project, retainer, embedded. No published day rates; the
  shapes below are explicit about scope, duration, and what lands in
  the first month.
  ```

**Service 01 — Positioning & GTM**

- Desc: `Category-shift research and the narrative that carries the enterprise sale. The work that takes a platform from feature-by-feature comparison into category leadership.`
- Anchor note (italic): `Anchor: Guardicore → Akamai (visibility + east-west microsegmentation repositioning); SurveyMonkey Enterprise (customer-evidence engine, anchored the Nasdaq IPO).`
- Anchor link: `See the engagement →` (`/work/guardicore`)
- **Tier — Advisory**
  - Scope: `Strategic review of current positioning + monthly sounding board for sales narrative + go-to-market decisions.`
  - Duration: `4-6 hrs/month, ongoing.`
  - First-month deliverable: `Positioning audit memo (8-10 pages) — your current state vs. the buyer's actual question, with the gap named.`
- **Tier — Project**
  - Scope: `Full repositioning research → narrative → sales enablement. Customer interviews, sales-call analysis, category research.`
  - Duration: `8-12 weeks, defined scope.`
  - First-month deliverable: `30 customer interviews + 50-call sales-call analysis + interim category-shift memo by week 4. Final positioning playbook + sales narrative by close.`
- **Tier — Retainer**
  - Scope: `Embedded GTM advisor + monthly narrative iteration. Continuous tuning of the message and the channels carrying it.`
  - Duration: `Month-to-month, 6-month minimum.`
  - First-month deliverable: `Initial positioning shift + 90-day GTM roadmap + first sales enablement update in month one.`
- **Tier — Embedded**
  - Scope: `Acting head of GTM strategy for the engagement window. Owns the narrative, partners with product + sales.`
  - Duration: `3-6 months, 3 days/week.`
  - First-month deliverable: `Full positioning + GTM playbook + first sales narrative iteration shipped + sales team trained by end of month one.`

**Service 02 — End-to-end product building**

- Desc: `Concept through shipped product, by the same operator. Strategy, design, code, security, launch — by one pair of hands rather than a relay race across vendors.`
- Anchor note: `Anchor: Ordani — HIPAA-grade practice management software, solo built, 14 doula practices in private beta; HR-author full-stack engagement (website + content engine + GTM + bespoke product).`
- Anchor link: `See the engagement →` (`/work/ordani`)
- **Tier — Advisory** / `Product strategy review + technical architecture sounding board. Periodic working sessions on roadmap, build-vs-buy, and security posture.` / `4-6 hrs/month, ongoing.` / `Product audit + technical-architecture recommendations memo. Roadmap critique with named tradeoffs.`
- **Tier — Project** / `Concept → shipped MVP. User research, technical architecture, design system, first features in production.` / `12-20 weeks, defined scope.` / `15-25 user interviews + technical architecture document + design-system foundations + first feature shipped by week 8.`
- **Tier — Retainer** / `Ongoing product partnership through launch + iteration. Sprint cadence, feature delivery, roadmap stewardship.` / `Month-to-month, 6-month minimum.` / `Sprint cadence established + first feature shipped + 6-month roadmap synced with the founder in month one.`
- **Tier — Embedded** / `Acting head of product or CTO for the engagement window. Full ownership of build velocity + product quality.` / `4-8 months, full-time engagement.` / `Team setup + first major feature shipped + security and compliance posture documented in month one.`

**Service 03 — Frontier AI engineering**

- Desc: `Production architecture and orchestration for founders shipping AI-native software. The layers that turn frontier capability into a product real users touch — eval infrastructure, continuous deployment of prompts, the failure modes that matter.`
- Anchor note: `Anchor: ongoing engagements (specifics under NDA). Production stack across frontier models with eval infrastructure, RAG and agent orchestration, prompt-deployment pipelines.`
- Anchor link: `Inquire about an engagement →` (Calendly)
- **Tier — Advisory** / `AI architecture review + monthly LLM strategy sessions. Sounding board for model choice, eval design, failure-mode mitigation.` / `4-6 hrs/month, ongoing.` / `AI stack audit + production-readiness assessment. Named gaps with prioritized fix sequence.`
- **Tier — Project** / `Production AI feature build — RAG, agent, eval pipeline, orchestration layer. Defined-scope shipped artifact.` / `6-12 weeks, defined scope.` / `Technical design + eval infrastructure + first production deployment by close. Documentation handed to your team.`
- **Tier — Retainer** / `Embedded AI engineering partnership. Continuous integration of new model capabilities, ongoing eval work, prompt iteration.` / `Month-to-month, 6-month minimum.` / `Continuous integration of AI work + first iteration of eval framework + prompt-deployment pipeline live in month one.`
- **Tier — Embedded** / `Acting head of AI engineering for the engagement window. Owns architecture, deployment, and the bar for production AI quality.` / `3-6 months, 3-4 days/week.` / `Full AI architecture + production deployment + eval infrastructure + team trained by end of month one.`

**Page footer**

- Kicker: `Next step`
- H2: `Discovery call before any engagement.`
- Intro: `Every engagement starts with a 30-minute call to name the shape and the fit. No deck, no sales pitch — just whether the work maps to what you actually need.`
- CTAs: `Book a call →` + `← Back to home`

### 6.4 `/services/ai-engineering` subpage

- Kicker: `Service · 03`
- H1: `Frontier AI engineering.`
- Intro: `Production architecture and orchestration for founders shipping AI-native software. The layers that turn frontier capability into a product real users touch — eval infrastructure, continuous deployment of prompts, the failure modes that matter. Engagements are ongoing; specifics live under NDA.`
- Same 4-tier grid as Service 03 above.
- **Section B: What "production-grade" means here**
  - Body: `The phrase carries a specific stack: eval infrastructure that fires on every change, continuous deployment of prompts (not just model versions), confidence thresholds and refusal patterns on the retrieval layer, and a documented bar for what ships vs. what waits. Frontier capability that lives in a notebook is not production. The engagement bar is "deployed, observed, iterated."`
- Footer: same CTA pattern, with `← All services` as the secondary link.

### 6.5 Case study — Guardicore (`/work/guardicore`)

- **Title:** `Guardicore (Akamai)`
- **Dek:** `Repositioned a saturated security platform from honeypot-lead to visibility + east-west microsegmentation. The narrative that carried the enterprise sale and the Akamai acquisition. Customers include TD Bank, Deutsche Bank, NIH, and Peoples Natural Gas — trillions in digital assets secured.`
- **Role:** `Positioning researcher`
- **Year:** `2020`
- **TitleCard words:** `HONEYPOT.` / `VISIBILITY.` / `ACQUIRED.`
- **Body:**
  - Opening: `Repositioned a security platform from honeypot-lead to visibility + east-west microsegmentation. The narrative that carried the enterprise sale and the Akamai acquisition.`
  - **§ The problem:** `The security market was saturated with honeypot products in 2018–2020. Customers and prospects deploying Guardicore had no real visibility into their own environments — they couldn't see what was happening inside their network, only at the perimeter. North-south firewall traffic was well-defended; the lateral east-west traffic between workloads was a blind spot, and that blind spot was where ransomware lived.\n\nGuardicore's existing positioning leaned into the honeypot capability — a feature that other platforms also shipped. The message at the top of the funnel did not match the actual reason enterprise buyers were signing six-figure deals at the bottom.`
  - **§ Approach:** `I owned the positioning research. Customer interviews with deployed enterprises. Sales-call analysis with the BDR + AE team. A category read on what competitors were claiming and what buyers were actually responding to.\n\nThe repositioning landed on two anchors:\n\n01. Visibility. Enterprise security teams need to see everything in their environment first — application dependencies, lateral communication paths, anomalous workload behavior. Visibility before defense.\n\n02. East-west microsegmentation. Once you can see lateral traffic, you can enforce on it — workload-level segmentation policies that contain breach blast radius and stop lateral movement of threats. North-south firewalls don't help against lateral movement; east-west microsegmentation does.\n\nI rewrote the single message at the top of the funnel so the message buyers heard first was the same message that closed the deal at the bottom.`
  - **§ Outcome:** `The average enterprise deal size moved up by $150K. Customers deploying the repositioned platform included TD Bank, Deutsche Bank, NIH, and Peoples Natural Gas — institutional environments where the visibility + microsegmentation pitch landed with the procurement committees that actually write the checks. Trillions in digital assets sat behind the Guardicore deployments.\n\nThe company was acquired by Akamai shortly after, and the positioning carried into the post-acquisition product narrative as Akamai Guardicore Segmentation.`

### 6.6 Case study — Ordani (`/work/ordani`)

- **Title:** `ORDANI`
- **Dek:** `A HIPAA-compliant CRM for birth workers. Solo build. Next.js + Supabase. 14 doulas in private beta.`
- **Role:** `Solo — research, design, build, ship`
- **TitleCard words:** `ORDANI` / `INTAKE.` / `SECURE.` / `SHIPPED.`
- **Opening:** `A HIPAA-compliant CRM for birth workers. I built it alone, on Next.js and Supabase, and 14 doulas use it every day in private beta.`
- **§ The problem:** `Birth workers — doulas, midwives, perinatal counselors — run their whole practice on group chats, paper intakes, and Google Docs. HIPAA is the law. Compliance is impossible without infrastructure that no software vendor has shipped for this market. So practitioners either break the law, pay $200 a month for software designed for dentists, or hand-roll a system that breaks the first time a client churns.`
- **§ Why it matters:** `In the United States, non-Hispanic Black women die from maternal causes at 44.8 per 100,000 live births — roughly 3.15 times the rate of non-Hispanic white women (14.2) — per the CDC's Maternal Mortality Rates in the United States, 2024 release. Doulas and midwives — disproportionately Black women themselves — are one of the most evidence-supported interventions against that gap. The data they collect on their clients is sensitive, high-stakes, and almost never properly protected. The market hasn't shipped for these workers because the market doesn't see them. So I shipped.`
- **§ Approach §01:** `I talked to 22 birth workers before writing a line of code. Across four weeks of unpaid conversations. I asked what they used now, what they hated about it, what they'd never give up, and what they'd pay for. Three patterns emerged: every practitioner had been hacked or scared into thinking they had been; nobody wanted a "platform"; everybody wanted intake to stop being the thing that ate their Sundays.`
- **§ Approach §02:** `I designed intake as one progressive flow, not a form wall. Existing tools dump fifteen pages of medical forms on a pregnant person at 1 a.m. I built a single conversational flow that adapts to the practitioner's preferences and saves on every step. Intake completion went from a self-reported 40% in beta-zero to a measured 91% in beta-one.`
- **§ Approach §03:** `I built encryption at the row level inside Supabase RLS, then I paid for two security reviews. Row-level security policies are the difference between a CRM that says "HIPAA-compliant" on the homepage and one that actually is. I wrote the policies, then I hired two outside security reviewers — one who specializes in healthcare, one who specializes in Postgres — to break them. They did, twice. Then they didn't.`
- **§ Approach §04:** `I shipped to a closed beta of fourteen practitioners. Free for the first year in exchange for weekly feedback calls. Eight of them are still active after six months. Six have referred a peer. Zero have churned to a competitor.`
- **§ Outcome:** `Fourteen active practices. Average twelve clients each. The first HIPAA-compliant CRM purpose-built for the doula market. A paid beta opens in Q3.`
- **Pull quote (beta user, name withheld):** `It is the first piece of software that treats my practice the way I treat my clients.`

### 6.7 Case study — HR-equity-author (`/work/hr-equity-author`)

- **Title:** `HR equity author — content system`
- **Dek:** `Algorithm strategy + multi-platform content system for an HR consultant and author specializing in organizational equity. RFP wins. 25+ page playbook. Two named platforms outperformed the third by 4x.`
- **Role:** `Strategist + ghostwriter`
- **TitleCard words:** `REACH.` / `RFP.` / `RETAINER.`
- **Opening:** `I built the algorithm strategy and content system for an HR consultant and author specializing in organizational equity. The playbook ran to 25+ pages. Two platforms outperformed the third by 4x. RFP wins followed.`
- **§ The problem:** `A respected author and HR consultant had a body of work that mattered, a serious audience that wanted more of it, and zero infrastructure to convert either into pipeline. The content was being shipped reactively — one post here, one talk there. Reach was flat. RFP responses depended on a single newsletter list.`
- **§ Why it matters:** `Equity work is one of the most attacked categories of consulting in the United States right now. A consultant in this space either becomes algorithmically resilient — distributed across enough platforms that no single deplatforming or DEI rollback kills their pipeline — or they become quiet. I am uninterested in helping any of these consultants become quiet.`
- **§ Approach §01:** `I built a 25-page algorithm strategy document. Platform-by-platform: TikTok, Instagram, YouTube, LinkedIn, X. Not "post more." A weekly cadence, a content-pillar map, a measurement frame, and a list of exactly which experiments to run in the first 90 days. Written so the consultant could hand it to a content lead and have them execute without supervision.`
- **§ Approach §02:** `I picked two platforms to overinvest in and one to underinvest in, on purpose. LinkedIn and one short-form platform got the weekly cadence. The other short-form platform got a monthly cadence on purpose, because the audience overlap with the high-value RFP buyers was thin. Two platforms outperformed the third by 4x within five months, exactly per plan.`
- **§ Approach §03:** `I built the RFP response system in parallel. Three templates, a content library tied to common buyer questions, and a one-page positioning sheet that gets attached to every response. RFP win rate improved meaningfully (specifics protected by NDA).`
- **§ Approach §04:** `I handed it off, and stayed on retainer for ongoing strategy. The work is not "I'm the agency now." The work is "you have the system, I'm the second brain on call when the platforms change."`
- **§ Outcome:** `Two platforms outperforming a third by 4x. RFP wins on retainer-scale engagements. A consultant who is no longer worried about one platform's bad day taking out their whole funnel.`
- **Pull quote (client):** `Micah does the work that most strategy decks promise and never deliver.`

### 6.8 JSON-LD (SEO + AI entity recognition)

This is in the page source as machine-readable metadata. AI crawlers + Google Knowledge Graph parse it.

- **Person description:** `Independent operator based in Oakland, CA. Builds go-to-market for B2B software companies AND ships his own products. $20M+ in client revenue (2013–2023). Two exits at companies he helped build: Guardicore (acquired by Akamai, 2021) and TechValidate (acquired by SurveyMonkey, 2015; cap-table position held through the 2018 SurveyMonkey IPO). Currently building Ordani — HIPAA-grade practice management software for fourteen doula practices.`
- **Person knowsAbout (tags):** `Go-to-market strategy`, `Product building`, `Product launches`, `Growth systems`, `B2B software`, `Positioning research`, `HIPAA software`
- **Organization description (Ordani):** `Ordani is HIPAA-grade practice management software for birth workers — doulas, midwives, and perinatal counselors. Built end to end by Micah Jones. In live beta with fourteen practices.`

---

## 7. Specific surfaces I want sharpest critique on

In order of priority:

1. **Hero H1 / rotating word.** Is `I build the [PRODUCT./PIPELINE./LAUNCH./SYSTEM.]` still the right pattern? Should the words change? Should the structure change? What lands harder for a $200K+ buyer?
2. **Section titles across the home.** `Strategy that ships, not slides.` / `Shipped.` / `LET'S BUILD →`. Are these earning their position?
3. **Service descriptions on /services.** Are the three service descriptions sharp enough? Each one is a positioning bet.
4. **Tier descriptions on /services.** 12 cells (3 services × 4 tiers). Each has scope + duration + deliverable. Are they reading as boutique or as agency? Are the verbs sharp? Are the deliverables believable?
5. **Ordani lede.** Most recent rewrite. Does it sell to a healthtech founder or read as descriptive?
6. **Frontier AI framing.** "Specifics under NDA — available for new engagements" — does this earn its place, or does it read as cover for thin evidence?
7. **Case study deks.** First sentence of each case study is the buyer's hook. Are they working?
8. **The footer "LET'S BUILD →"** — too generic? Better verb?
9. **JSON-LD descriptions.** What AI crawlers cite when summarizing the site. The Person description in particular should be the cleanest 50-word summary of who I am.

---

## 8. What to research before answering

Spend real time on the web. Reference patterns I should know about:

- The top 20 fractional executive / boutique strategy portfolios online in 2026. What hooks are they using? What verbs? What's their hero H1 pattern?
- Anthropic + OpenAI + frontier AI consulting positioning in 2026 (the market just shifted under "fractional AI engineer").
- How premium operator portfolios surface engagement tiers (advisory / project / retainer / embedded). Reference real examples.
- The specific phrasing patterns successful Black tech operator portfolios use (or fail to use) — without making identity the headline.
- Stripe Press / The Gentlewoman / Pinkerton Zweck / Rauno Freiberg / Linear About page — these are voice references. How does my current copy sit beside theirs?

Quote real URLs and real phrases where it helps your critique land.

---

## 9. Output format I want from you

For each surface in §6 (or at least the priority list in §7), deliver:

1. **Verdict line.** One sentence. Working / mediocre / not working. No hedging.
2. **The specific failure mode if not working.** Name what's wrong in concrete terms — vague, generic, agency-y, hype-y, etc.
3. **2-3 sharpened alternatives.** Real candidate copy I can paste into the file. Each candidate respects the banned-word categories in §4 and the 14-word average / 25-word cap.
4. **The one you'd ship and why.**

At the end, deliver:
- **Overall site copy score, 1–10.** Boutique consulting practice or indie hustler?
- **The single line of copy on the entire site you'd change first.** Be specific (section + current text + your replacement).
- **One missing surface.** Something I haven't written that the site needs.

---

## 10. Constraints — don't propose reverting these

These framing decisions are locked. Don't try to undo them:

- Hero is a **rotating-word display H1**, not an editorial lede or a static manifesto.
- **TechValidate is intentionally absent** from credibility surfaces; SurveyMonkey Enterprise is the named entity for the 2018 IPO.
- Three services, not four (and not seven). Positioning & GTM / End-to-end product building / Frontier AI engineering.
- Engagement tiers surface their SHAPES (Advisory / Project / Retainer / Embedded) but NOT day rates.
- Ordani is framed as a real product (live beta + hundreds of users), not as a portfolio side-project.
- Operator identity tag `Independent operator · Oakland, CA` is in the hero eyebrow. Not buried, not loud.

---

OK. Roast it. Sharpen everything. Tell me where it's working, tell me where it isn't, and give me the candidate copy.
