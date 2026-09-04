# 02-BUSINESS-CONTEXT.md

Compiled 2026-09-03 from the live site at `https://www.micahjonesconsulting.com`,
the repository, the claims ledger (`docs/LESSONS_LEARNED.md` #3), the design
system (`.claude/brand.json`), the Stripe catalog (`lib/catalog.ts`) and the book
source repo (`the-80-percent-wall`).

All quoted copy was extracted mechanically from the rendered DOM of the live
pages, scripts stripped, on 2026-09-03. Where a statement is inference rather
than a reading, it is marked `[INFERRED]`. Where a fact is not known, it is
marked `UNKNOWN` and not estimated.

Companion file: `02-APPENDIX-voice-rules.json` carries the machine-readable voice
constraints, including the full banned-word list. It is a separate file because
this repository's write gate rejects any document containing those words in
prose — including a document that is only quoting them.

---

## 1. Identity and constraints

**As the site presents him.** One person. `/about` H1:

> Operator, not consultant.

> I've spent thirteen years inside B2B software companies as the person who can
> sit on either side of the table: GTM strategy in the morning, shipping product
> in the afternoon. Most consultants don't ship. Most builders don't sell. I do
> both, on the same engagement, for the same fee.

Micah Jones, Oakland, CA. Solo — the voice rule in `.claude/brand.json` is
`person: first-singular`, and the word "we" is treated as a defect in copy
review. Site says, `/services`:

> When the work is bigger than one person, I say so on the call.

**Time available per week for delivery.** `UNKNOWN`. Not stated anywhere on the
site and not recorded in the repo.

**Capacity.** Stated qualitatively only, and deliberately without a number.
`/about`, added 2026-09-03 on the operator's instruction ("Im taking work. No
need to put specifics on how many im taking etc."):

> I am taking new engagements now.

**Concurrent commitment.** He is simultaneously building Ordani, a HIPAA-compliant
SaaS, as founder and sole engineer. `/about`:

> Currently · Building Ordani.

**Hard constraints, from the ledger and the design constitution:**

| Constraint | Source |
| --- | --- |
| Never names Ordani's infrastructure vendors | VENDOR GATE, ledger, 2026-08-31, mechanical |
| Never describes how Ordani's security works | SECURITY-DETAIL GATE, ledger, 2026-09-01 |
| Never names the enterprise customers behind Guardicore deployments (TD Bank / Deutsche Bank / NIH / Davis Polk explicitly banned) | Ledger |
| The industry-author client is anonymous on every surface; the operator named them privately 2026-09-03 and the site must continue not to | Ledger, 2026-09-03 |
| No stock photography, illustration, icon kits or 3D | `.claude/CLAUDE.md` |
| No monospace typefaces anywhere | `.claude/CLAUDE.md`, enforced by hook |
| No second accent colour, no second signature animation, no dark-mode toggle | `.claude/CLAUDE.md` |

**Industries he will not take:** `UNKNOWN`. Nothing on the site or in the repo
records a refused industry.

**What he will not do at any price:** not stated as such. The nearest published
statement is the anti-agency positioning on `/services`:

> An agency gives you a team and a relay race between them.

---

## 2. The offers, exactly as sold

### Engagements — `/services`

Verbatim door copy:

> **For companies** · **Engagements** · Advisory, project, retainer, or embedded.
> Scoped together once you tell me the problem. · **From $5K a month**

Three named services, verbatim, each with its own pain line:

| # | Verbatim name | Verbatim pain line |
| --- | --- | --- |
| 01 | Positioning & GTM | "You built it. Enterprise teams still aren't buying. The gap is positioning, not features." |
| 02 | End-to-end product building | "You have the idea, the budget, and customers waiting. What you do not have is the team to build it. I build it." |
| 03 | Frontier AI engineering | "Your AI works in the notebook. Production is a different stack. I run that stack." |

Four engagement shapes are published in a table on `/services`: Advisory,
Project, Retainer, Embedded. Advisory is the only one with a published rate
("4-6 hours a month, ongoing · From $5K a month"). The Retainer row reads
"Month to month, 6-month minimum", which is internally contradictory and has been
flagged but not ruled on.

What is delivered, verbatim:

> Every engagement ships a named artifact in month one. No decks. No discovery debt.

> Week one is the scoping session and the audit: the foundational work that
> decides what the engagement is actually for.

**Duration:** not published beyond "month one" and the retainer's 6-month
minimum.

**Has it sold?** `UNKNOWN` as a count. The `$20M+ in client revenue since 2013`
claim covers the practice as a whole; the site names no engagement client and
links no engagement case study. Two consulting-era positioning outcomes were
added 2026-09-03 (see §6).

### Packages — `/packages`

H1: *"Three fixed prices. Start this week."*

| Verbatim name | Price | Verbatim one-line description | Delivered | Duration |
| --- | --- | --- | --- | --- |
| The Unstick Session | $500 | "Ninety minutes live on your stuck build. You leave with a written plan the same day." | "What is wrong, in the order to fix it", "The prompts to fix it with", "Your tools, your repo" | 90 minutes + same-day memo |
| The Audit | $2,500 | "Pick one flavor: Build (architecture and code), Production (security and deploy), or Traction (positioning and go-to-market). I go through it top to bottom and hand you the written audit." | "8-10 page audit memo", "Prioritized fix sequence", "One-hour debrief call" | Two weeks + debrief call |
| The Sprint | $7,500 | "One week on one outcome, shipped: the repositioning, the production push, the AI feature. Not a plan. The thing, done." | "One outcome, agreed by email before day one", "Daily progress notes", "Debrief + next-step map" | One week, embedded |

The Audit carries a "START HERE" badge.

Terms, verbatim:

> The rules, in plain terms: every package fee credits toward the next package or
> an engagement started within 60 days. Full refund any time before kickoff. None
> after, because by then the work has started. All three include The 80% Wall, my
> field manual for solo builders, with its companion files, attached to the
> kickoff email the moment you buy.

Stripe lookup keys and amounts, from `lib/catalog.ts`: `unstick-500` (50000),
`audit-2500` (250000), `sprint-7500` (750000).

**Has it sold? ZERO. This is a hard fact, not an estimate.** The Stripe checkout
buttons were wired on 2026-09-03; before that every CTA was a `mailto:` and no
purchase was possible on the site. Checkout then failed on every click because
production held a Stripe key *ID* rather than the secret key, and only began
authenticating on 2026-09-03. **No package has ever been bought through the site.**

### The playbook — `/playbook`

> **The 80% Wall** — "$99 at launch · $149 after · coming soon"

**Status: not on sale.** The spec card reads "Status · Coming soon" with no
date. The only live conversion on the page is the free chapter-one email capture.

**Has it sold? ZERO.** It has never been purchasable.

### Free / lead-magnet offer — `/playbook`

CTA verbatim: *"Get chapter one free →"*

> The real chapter, ten pages, not a teaser. Leave your email and it arrives in
> about a minute.

This is currently the site's only working conversion event, and it captures an
email rather than money.

### A live inconsistency worth recording

`/packages` still carries pre-checkout copy in its intro:

> Pick one, email me, and the work starts within the week. No scoping call, no
> proposal, no quote to wait for.

The buttons on that same page now read "Buy the Unstick Session", "Buy the
Audit", "Buy the Sprint" and go to Stripe. The intro was not updated when the
CTAs were. It is wrong as of 2026-09-03.

---

## 3. Verbatim copy inventory

### H1 by URL

| Path | H1, verbatim |
| --- | --- |
| `/` | I build the go-to-market. Also product, data platforms, and RFP engines. |
| `/about` | Operator, not consultant. |
| `/services` | Services |
| `/packages` | Three fixed prices. Start this week. |
| `/work` | $14M in revenue for a Tel Aviv security company breaking into North America. Acquired by Akamai in 2021. |
| `/playbook` | The AI handed you the code. Now ship the company. |
| `/contact` | Tell me what you are working on. |
| `/book` | Thirty minutes. Bring the problem. |
| `/book/kickoff` | Thirty minutes. The work starts here. |
| `/work/guardicore` | Guardicore (Akamai) |
| `/work/ordani` | ORDANI |
| `/work/rfp-engine` | RFP engine for an industry author |
| `/work/content-engine` | AI content engine for an industry author |
| `/services/thanks` | Check your inbox. |
| `/playbook/thanks` | Check your inbox. |

Note: the `/` H1 contains a rotating word. The server-rendered string is the one
above; the visible first word cycles. The operator asked for the rotation by name
and it is locked.

Note: the `/services` H1 is the bare word "Services" and is visually hidden
(`sr-only`); the page opens on the two doors instead. `[INFERRED]` from the
rendered markup and the Pass-63 note in the repo.

### Title tags

| Path | `<title>`, verbatim |
| --- | --- |
| `/` | Micah Jones — Strategy and software, shipped by one person |
| `/about` | Operator, not consultant — Micah Jones |
| `/services` | Services: what I do, and how to hire me — Micah Jones |
| `/packages` | Packages: fixed prices, start this week — Micah Jones |
| `/work` | Work: pipeline, products, and exits — Micah Jones |
| `/playbook` | The 80% Wall: field manual for solo builders — Micah Jones |
| `/contact` | Contact — Micah Jones |
| `/book` | Book a free intro call — Micah Jones |
| `/book/kickoff` | Book the kickoff call — Micah Jones |
| `/work/guardicore` | Guardicore (Akamai) — Micah Jones |
| `/work/ordani` | ORDANI — Micah Jones |
| `/work/rfp-engine` | RFP engine for an industry author — Micah Jones |
| `/work/content-engine` | AI content engine for an industry author — Micah Jones |
| `/services/thanks` | Check your inbox: next steps — Micah Jones |
| `/playbook/thanks` | Check your inbox: The 80% Wall — Micah Jones |

### Meta descriptions

| Path | `<meta name="description">`, verbatim |
| --- | --- |
| `/` | Strategy and software from one operator in Oakland. Four exits behind my work, $5B+ combined. $20M+ in client revenue. |
| `/about` | A decade inside B2B software: go-to-market in the morning, shipping product in the afternoon. Four exits behind my work, $5B+ combined. Oakland, CA. |
| `/services` | Three services, two ways to buy them: an engagement from $5K a month, or a fixed-price package at $500, $2,500 or $7,500. One operator, not an agency. |
| `/packages` | Three fixed-price packages for solo builders and small teams: $500, $2,500 and $7,500. No call required. Fees credit toward what you book next within 60 days. |
| `/work` | Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and 36x reach for an author. |
| `/playbook` | For solo builders stuck between demo and production. Ten chapters, 69 pages, 26 working files, from the operator who shipped a HIPAA-compliant SaaS solo. |
| `/contact` | Send a note about what you are working on. It goes straight to my inbox and I answer from there, usually within one business day. |
| `/book` | Thirty minutes, no deck, no pitch. Bring the problem; we name the shape of the work and whether I am the right person for it. Tue to Thu, Pacific. |
| `/book/kickoff` | Put the kickoff call for your package on the calendar. Thirty minutes, Tue to Thu, Pacific. |
| `/work/guardicore` | $14M in revenue. The research and data science behind repositioning a Tel Aviv security company for North American buyers. |
| `/work/ordani` | A HIPAA-compliant CRM for birth workers, and a company I founded and built. Active paying users in beta, none lost to a competitor. Public release coming. |
| `/work/rfp-engine` | $3M in contracts won through software I built for an industry-authority author, government contracts among them. |
| `/work/content-engine` | I built the AI content engine and the distribution strategy behind an industry-authority author's reach. |

**Three known defects in this table.** `/about`'s description says "A decade"
while the page body now says "thirteen years" — the meta was not updated.
`/about` and `/` descriptions still say "Oakland" though the visible city
strapline was deliberately removed on 2026-09-02; the operator ruled on
2026-09-03 to keep the city in metadata for local search. The `/book` description
says "we name the shape", which breaks the first-person voice rule.

### Hero paragraphs, in full

**`/` (home), the sentence under the H1:**

> I find the gap between what you built and what buyers actually pay for.

**`/services`, the engagements intro:**

> Strategy and software from the same person, so nothing is lost in the hand-off.
> Pick the problem; I name the shape on the call.

**`/playbook`, the object sub:**

> Ten chapters on what the AI leaves to you: auth, deploys, payments, compliance,
> the first ten users. I joined Postmates, SurveyMonkey, Guardicore (Akamai) and
> Neuton.AI early. Four exits, $5B+ combined. I built Ordani solo with Claude Code
> and Cursor: HIPAA-compliant, active paying users, in beta.

**`/packages`, the intro (contains the stale email instruction noted in §2):**

> For solo builders and small teams who got most of a product out of AI tools and
> stalled on the last stretch. Pick one, email me, and the work starts within the
> week. No scoping call, no proposal, no quote to wait for.

### CTA button labels, verbatim

| Label | Destination | Page |
| --- | --- | --- |
| See the work ↓ | `#products` | `/` (primary hero CTA, operator-locked) |
| Hire me → | `/services` | `/` |
| Book a free intro call → | `/book` | `/`, `/services` (×2), `/playbook` |
| NAME THE PROBLEM → | `/book` | `/` (footer big link) |
| See full services → | `/services` | `/` |
| Read the playbook → | `/playbook` | `/` |
| See the three packages → | `/packages` | `/` |
| See how it was built → | `/work/ordani` | `/` |
| The three services → | `#engagements` | `/services` |
| The three packages → | `/packages` | `/services` |
| Buy the Unstick Session → | Stripe checkout | `/packages` |
| Buy the Audit → | Stripe checkout | `/packages` |
| Buy the Sprint → | Stripe checkout | `/packages` |
| Get chapter one free → | `#pb-free` | `/playbook` |
| Fixed-price packages → | `/packages` | `/playbook` |
| Send the note → | form submit | `/contact` |
| Book the call → | form submit | `/book`, `/book/kickoff` |
| Read the case study → | case study | `/work`, `/services` |
| ← Back to home | `/` | `/services` |
| Menu — | nav toggle | every page |

### The problem statements — the sentences to test against market language

These are the places the site states the customer's problem in the customer's own
terms. They are the highest-value comparison targets.

**1. `/services`, engagements lane:**

> You built it. Enterprise teams still aren't buying. The gap is positioning, not
> features.

**2. `/playbook`, "If this is you":**

> It got to eighty percent. Then every change broke something that worked
> yesterday. The demo looked done. Production turned out to be a different machine
> entirely. It shipped. Nobody came.

**3. `/playbook`, the central diagnosis:**

> The wall is not a talent problem. It is arithmetic: the tool's memory runs out,
> and yours has to take over, on paper, in the repo. This manual is that hand-off,
> one system per chapter.

**4. `/`, the home doors:**

> The demo took a weekend. The last 20% is eating your month.

> Too big for duct tape. Not ready for an agency retainer.

**5. `/packages`, the buyer description:**

> For solo builders and small teams who got most of a product out of AI tools and
> stalled on the last stretch.

---

## 4. The playbook product

**Title:** The 80% Wall. Subtitle on the site: "field manual for solo builders".

**Page count:** 69 pages, stated three times on `/playbook` and confirmed against
the shipped PDF.

**Price:** "$99 at launch · $149 after". Status: "Coming soon". No launch date is
published. Price history: `UNKNOWN` beyond the current two-tier statement; the
$149 raise date has been an open operator decision since 2026-09-01 and is
unresolved.

**Table of contents, verbatim from the published TOC:**

| # | Chapter title |
| --- | --- |
| 01 | Why your build broke at 80% |
| 02 | The spec is the moat |
| 03 | The architecture you didn't draw |
| 04 | Deploy day |
| 05 | The security pre-flight |
| 06 | Stripe in production |
| 07 | Compliance, when it matters |
| 08 | The first ten users |
| 09 | The distribution loop |
| 10 | When to hand it off |

**Companion files.** The site says "Companion files · 26". Counted from the
shipped ZIP on 2026-09-03: 27 files, of which 26 are content plus a README.
Filenames:

```
README.md
checklists/01-context-habits.md        checklists/06-stripe.md
checklists/02-spec-ritual.md           checklists/07-compliance.md
checklists/03-architecture-locks.md    checklists/08-first-ten.md
checklists/04-deploy-day.md            checklists/09-distribution.md
checklists/05-security.md              checklists/10-handoff.md
prompts/architecture-map.md            prompts/session-opener.md
prompts/diff-review.md                 prompts/stripe-wiring.md
prompts/invariant-extractor.md
prompts/outreach-drafter.md
templates/ARCHITECTURE-sample.md       templates/SPEC-example-ops.md
templates/CLAUDE-invariants-starter.md templates/SPEC-template.md
templates/DATA-ROOM.md-template.md     templates/USERS.md-template.md
templates/LOOP.md-template.md          templates/env.example
templates/SPEC-example-booking.md
templates/SPEC-example-gallery.md
```

**The central claim, in the book's own words:**

> The wall is not a talent problem. It is arithmetic: the tool's memory runs out,
> and yours has to take over, on paper, in the repo.

**Who it says it is for, verbatim:**

> For solo builders stuck between demo and production.

> It got to eighty percent. Then every change broke something that worked
> yesterday.

**What it promises:**

> Ten chapters on what the AI leaves to you: auth, deploys, payments, compliance,
> the first ten users.

> Every chapter ends in a pre-flight card you run before you ship.

**Reader feedback:** `UNKNOWN`. No reader quotes exist because the book has never
been sold. Real early-reader quotes have been an open operator to-do since
2026-09-01 and none have been supplied. `/playbook` carries no testimonial.

**Independent review.** The manuscript was cross-reviewed by three non-Claude
models on 2026-09-02 (Gemini, GLM, Codex). Verdict: BLOCK, on three claim
defects, all since corrected. The unanimous improvement finding was that
chapter 10 is visibly thinner than the other nine.

---

## 5. Claims and their provenance

The repository maintains a claims ledger at `docs/LESSONS_LEARNED.md` §3,
"Verified-facts ledger; never resurrect corrected claims". Its operative rules
are reproduced below rather than described. Every entry is operator-confirmed
and dated.

### Live claims and their status

| Claim, verbatim | Source / date | Defensible? |
| --- | --- | --- |
| "$14M in revenue" (Guardicore) | Ledger, operator-confirmed | Yes |
| "$1.2M average enterprise deal size" | Ledger, operator-supplied 2026-09-01 | Yes; supersedes an earlier "$150K delta" claim which must never be restated |
| "Acquired by Akamai in 2021" | Public record | Yes |
| "Trillions in financial assets sit protected behind those deployments" | Operator-confirmed; cut once as unverifiable and restored the same morning | Approved, do not re-cut |
| "$1M+ in enterprise sales toward the 2018 IPO" (SurveyMonkey) | Ledger | Yes |
| "Four companies I worked inside reached an exit" | Operator update 2026-08-30 | Yes |
| "$5B+ combined" | Disclosed deals only: Uber–Postmates $2.65B + SVMK first-day IPO $2.33B + Akamai–Guardicore $600M = $5.58B; Neuton undisclosed, contributes $0. Sources pinned in `content/citations.ts` | Yes, **only when stated across all four**. Never restate about a subset |
| "SurveyMonkey and Guardicore carried my name on the cap table" | Operator-confirmed 2026-09-03, after the claim was explained to him | Yes |
| "Product analyst · 2020" (Postmates) | Operator-confirmed 2026-09-03 | Yes |
| "$20M+ in client revenue since 2013" | Operator 2026-09-03: "20 mil holds to today" | Yes. Open-ended; never re-close the range |
| "Monthly reach grew from 8,000 to 290,000 in five months, a 36× lift" | Ledger | Yes |
| "Eight platforms" (content engine) | Operator 2026-09-03: "We did ship on YouTube" | Yes |
| "$3M in contracts won", "close rate doubled" | Ledger | Yes |
| "Intake completion moved from 40% to a measured 91%" | Ledger | Yes |
| "Active paying users … in beta … public release coming" | Operator 2026-08-31, replacing a retired user count | Yes, in exactly this framing |
| "none lost to a competitor" | Operator-confirmed | Yes |
| "HIPAA-compliant" | Operator-confirmed | Yes. Never "HIPAA-grade" |
| "non-Hispanic Black women die from maternal causes at 44.8 per 100,000 live births … 3.15 times the rate of non-Hispanic white women (14.2)" | CDC NCHS, pinned in `content/citations.ts` | Yes; independently verified 2026-09-03 |
| "Organic bookings up 30%" (birth worker) | Operator-supplied 2026-09-03 | Yes, newly ledgered. No third-party verification exists |
| "thirteen years" | Operator 2026-09-03 | Yes |

### Standing prohibitions — things already ruled out and why

Reproduced from the ledger. Each was live at some point and was retired on
operator instruction.

- **"hundreds of birth workers" / "200 birth workers" / any Ordani user count.**
  Retired 2026-08-31, operator: "just say it has active paying users, it's in
  beta, we're releasing to public soon". Also never **"Zero churn"**.
- **"$80M in pipeline"** and any Guardicore job title. Retired from all public
  surfaces 2026-09-03, operator: "just drop the pipelione number site wide. put
  the rev number. dont want to be specific on roles. i know recruitors might not
  like that but i prefer it." The figure remains true in the ledger; it simply no
  longer renders. **This removed the largest number on the site**, because it sat
  beside "so the account executives spent their time on real deals" and could not
  be attributed.
- **"$15M pipeline", "trained the sales team", "built the channel"** — never.
- **"customer-evidence engine", "anchored the Nasdaq IPO"** — never.
- **"Two exits"**, and **"Three companies I helped build reached an exit"** — retired.
- **Never claim Neuton equity.**
- **VENDOR GATE:** Ordani surfaces never name infrastructure vendors. Mechanical
  since 2026-08-31 after a second recurrence.
- **SECURITY-DETAIL GATE:** Ordani surfaces never describe how its protections
  work — no row-level policies, no encryption placement. Operator 2026-09-01:
  "dont make specific security stuff on the app". Teaching the mechanism
  generically is fine; naming Ordani beside it is not.
- **Never name the enterprise customers** behind Guardicore deployments. TD Bank,
  Deutsche Bank, NIH and Davis Polk are explicitly banned. The published form is
  the descriptor only ("a global systemically important bank", "a white-shoe Wall
  Street law firm").
- **"world's largest public ..."** — retired 2026-09-01 on a buyer-review finding.
- **"The two largest engagements that closed were both six-figure retainers"** —
  cut 2026-09-03, operator: "Cut it". Never ledgered, unverifiable.
- **The industry author is never named.**
- **TechValidate** must not reappear; the employer is SurveyMonkey (operator
  2026-09-03).

**Gate:** the ledger requires grepping the whole tree for the NEVER-phrases
before every commit touching copy.

---

## 6. Evidence I already hold

### Published case studies

| Study | Headline evidence, verbatim | Client named? |
| --- | --- | --- |
| `/work/guardicore` | "$14M in revenue. Average enterprise deal size, $1.2M." + "A product built in Tel Aviv ended up deployed behind a global systemically important bank and a federal research agency." | Yes — Guardicore/Akamai, both public |
| `/work/ordani` | "Intake completion moved from 40% to a measured 91%. Active paying users in beta." | It is his own company |
| `/work/rfp-engine` | "$3M in contracts won", "RFP-to-close rate doubled inside six months" | No — "an industry author" |
| `/work/content-engine` | "Monthly reach grew from 8,000 to 290,000 in five months, a 36× lift" | No — "an industry author" |

### Testimonials

Two exist, both anonymous:

> "Micah does the work that most strategy decks promise and never deliver."
> — The author, name protected (`/work/rfp-engine`)

Operator confirmed 2026-09-03 that this is a real quote ("Real — they said it").

> — A beta user, name withheld (`/work/ordani`)

**Permission status:** `UNKNOWN` in both cases. No written permission is recorded
in the repo. Both are published anonymously, which is the operator's stated
preference, but no permission artifact exists.

### Consulting-era positioning outcomes, added 2026-09-03

> A birth worker: repositioned from birth support alone to the full arc of care
> around it. Organic bookings up 30%, and inquiries arriving across her whole
> range instead of one service.

> An industry author: repositioned toward the buyers who award contracts. $3M in
> contracts won through the RFP software that followed.

Operator's own words for the first: "organic bookings went up 30% and her
inquires went from 100% normal birth support - to a diverse set of customers
(abortion, prepping to get pregnant, miscarriage support, etc)". The service list
is deliberately **not** itemised on the site — publishing abortion and
miscarriage care on a consulting marketing page creates exposure for her practice
that the proof does not require.

### What the evidence conspicuously lacks

This list is the honest answer and matters more than the list above.

- **No named consulting client anywhere.** The `$20M+ since 2013` figure names no
  one and links to nothing. Both positioning receipts are anonymous.
- **No B2B software company as a consulting client.** The two positioning
  receipts are a birth worker and an author. The engagements lane sells to
  "companies" whose enterprise buyers are stalling, and has no consulting
  evidence from that segment. Its proof is two *employment* roles.
- **No testimonial with a name attached.** Both are anonymous.
- **No reader feedback on the book.** It has never sold.
- **No evidence of package delivery.** No package has ever been bought.
- **No before/after artifact** — no audit memo sample, no spec, no redacted
  deliverable is published anywhere.
- **No logos, no client list.** Deliberate: a logo wall is explicitly banned in
  the design constitution.
- **No permission records** for the two testimonials.

---

## 7. Traffic, funnel and current SEO reality

### Traffic

**All traffic figures: `UNKNOWN`.** And this is not simply missing data — it is a
finding:

`@vercel/analytics` (v2.0.1) and `@vercel/speed-insights` (v1.3.1) are installed
in `package.json` and `<Analytics />` and `<SpeedInsights />` are mounted in
`app/layout.tsx`. But the Vercel Web Analytics API returns **404 Web Analytics
not found** for this project, and the `/_vercel/insights/script.js` tag does not
appear in the served HTML. **The feature has never been enabled on the Vercel
project, so no traffic data has ever been collected.** The code believes it is
tracking; nothing is.

| Metric | Value |
| --- | --- |
| Sessions / pageviews | `UNKNOWN` — never collected |
| Traffic sources | `UNKNOWN` — never collected |
| Top landing pages | `UNKNOWN` — never collected |
| Keyword rankings | `UNKNOWN` — no Search Console data in the repo |
| Email list size | `UNKNOWN` |
| Where enquiries come from today | `UNKNOWN` |

### Funnel — conversion events that exist in code

| Event | Path | Status |
| --- | --- | --- |
| Contact note | `/contact` → Resend + Supabase archive | Live. Two defects were fixed 2026-09-02: the form had no email field and `replyTo` was undefined, so every note would have arrived unanswerable |
| Free chapter capture | `/playbook` → Resend | Live. The only conversion that has plausibly ever fired |
| Ordani beta waitlist | `/` → Resend | Live |
| Intro call booking | `/book` → self-hosted, sends a real ICS invite | Live, operator-verified ("booked and it worked — invite came through") |
| Package purchase | `/packages` → Stripe Checkout | **Live as of 2026-09-03, never completed by anyone.** No live webhook endpoint is registered, so a completed purchase would take the money and send no kickoff email |
| Book purchase | Stripe rail exists | Not on sale |

**Known live gap as of writing:** the Stripe webhook destination for
`https://www.micahjonesconsulting.com/api/stripe/webhook` is **not registered** in
the live Stripe dashboard, and `STRIPE_WEBHOOK_SECRET` is `[INFERRED]` not set in
Vercel Production. Until both are done, a real purchase silently delivers nothing.

### Technical SEO state — what is actually true

| Item | State |
| --- | --- |
| `sitemap.xml` | Live, 12 URLs |
| `robots.txt` | Live. Allows Googlebot; blocks GPTBot and Google-Extended |
| `llms.txt` | Live — an unusual asset most competitors will not have |
| JSON-LD | Present on the home page (Person + Organization); case studies carry article schema |
| Titles / descriptions | Machine-enforced ≤60 / ≤160 chars by `scripts/render-gate.mjs` at build time |
| Internal links | Machine-enforced: every internal href and fragment must resolve, or the build fails |
| Canonicals | Set per page |
| Core Web Vitals | Budgets declared (LCP ≤1800ms, INP ≤200ms, CLS ≤0.05, Lighthouse ≥95). **Actual measured values: `UNKNOWN`** — Speed Insights is mounted but, like Analytics, not enabled |
| Indexation | `UNKNOWN`. No Search Console access is recorded |
| Noindex pages | `/book/kickoff`, `/services/thanks`, `/playbook/thanks`, the 404 |

---

## 8. Design and brand constraints

### Palette, verbatim hex values from `.claude/brand.json`

| Token | Hex |
| --- | --- |
| `foyer-paper` | `#F5EFE4` |
| `foyer-ink` | `#1A1816` |
| `foyer-ink-soft` | `#3A3631` |
| `theater-ground` | `#0D0D0F` |
| `theater-surface` | `#16161A` |
| `theater-ink` | `#EAE6DD` |
| `theater-ink-soft` | `#9C988F` |
| `accent-copper` | `#C8542B` |
| `accent-copper-deep` | `#8E3A1E` |
| `ordani-sage` | `#5E7158` |
| `rule-foyer` | `#D9D2C4` |
| `rule-theater` | `#2A2A30` |

One accent only. `accent-copper` on `foyer-paper` is 3.85:1 and **fails WCAG AA
for body text**; `accent-copper-deep` (5.4:1) is mandatory for body-text emphasis
and foyer body links. `ordani-sage` is permitted only inside `/work/ordani`.

**Two modes, route-determined.** Foyer pages (cream paper) vs theater pages
(obsidian) — `/work/[slug]` is theater. There is no theme toggle and adding one
is banned.

### Typography

| Role | Family | Weights |
| --- | --- | --- |
| Display | Inter Display | 600, 700, 800 |
| Body | Inter | 400, 500, 600 |
| Serif | Source Serif 4 (`opsz` axis) | 400, 500 |
| Mono | **None — monospace is banned anywhere on the site** |

### Motion policy

One signature interaction only: `<TitleCard />` on case-study heroes (~600ms
hold), plus a 600ms foyer↔theater view transition. One additional *figure*
animation is permitted by written exception — `<WallChart />` on `/playbook`,
which draws the book's own page-6 diagram once on load, at ≥900px, with a
reduced-motion kill switch.

Mechanically banned: cursor followers, scroll-jacking, marquees, `syncTouch: true`.
A second signature motion is refused by policy.

### Voice rules that constrain copy

- **First person singular.** "we" is a defect.
- **Average sentence ≤25 words**; anything over 35 is rewritten.
- **At most one em-dash per rendered page**, and the nav's "Menu —" already
  spends it, so body copy gets zero. Machine-enforced by the render gate.
- **35 forbidden marketing words**, rejected at build time. The full list is in
  the companion file `02-APPENDIX-voice-rules.json`, together with the preferred
  verbs (build, ship, rewrite, cut, tune, bet, show).
- **Named numbers required** — never vague impact language.

### Stack, and what a change costs to ship

Next.js 16.2.6 (App Router, Turbopack), React 19.2.6, TypeScript strict,
Tailwind v4 (CSS-first, no JS config), MDX case studies, GSAP 3.15 quarantined to
one component, Lenis smooth scroll, Resend, Supabase (server-side only), Stripe,
hosted on Vercel.

A copy change is a source edit plus `pnpm build`, which runs a word lint, a
vendor gate and a four-check render gate (links, metadata, glued inline elements,
em-dash caps) before it can deploy. **Any change that breaks a voice or claims
rule fails the build rather than shipping.** `[INFERRED]` cost of a typical copy
change: minutes, not hours — but a change that needs a new *fact* cannot ship at
all until the operator supplies and dates it.

### Already ruled out aesthetically

No stock photography, illustration, icon kits or 3D — type and real photographs
only. No client logo wall, no "trusted by" bar, no newsletter signup in the nav,
no Calendly link in the first volley, no budget dropdown on the contact form. No
`/now`, `/uses` or `/colophon` page. No decision log.

### A live inconsistency in the brand file

`.claude/brand.json` still declares the primary audience as:

> "Founders of $5-50M companies who care about how their brand actually looks;
> and Black HR consultants, doulas, birth workers, and equity practitioners — the
> people Micah's work serves."

That does not match the site's current two-lane positioning (B2B software
companies with stalled enterprise sales; solo builders stuck at 80%). The brand
file was not updated as the positioning moved.

---

## 9. What I have already tried, and what I already believe

### Positioning tested and abandoned

- **User counts as social proof.** "hundreds of birth workers" ran across the site
  and the book. Retired 2026-08-31 on operator instruction; replaced by "active
  paying users, in beta, public release coming". Reason: the operator did not
  want a number published at this stage.
- **Pipeline as the headline number.** "$80M in pipeline" was the largest figure
  on the site and the hero stat of `/work`. Removed entirely on 2026-09-03
  because it could not be attributed — the case study claimed it one line above
  "so the account executives spent their time on real deals". The operator chose
  removal over clarification.
- **Job titles.** Guardicore's role is now "Revenue and positioning" rather than a
  title. Operator accepted the recruiter cost explicitly: "i know recruitors might
  not like that but i prefer it."
- **The Medicaid claim.** The home page said Ordani was "processing Medicaid
  claims fee-free and keeping hundreds of dollars in birth workers' pockets".
  Removed 2026-09-03 as a regulated-sounding claim with no ledger entry behind it.
- **A separate `/services/ai-engineering` page.** Retired and 301'd into
  `/services`.
- **A scrolling marquee on the home page.** Removed 2026-09-01 as an
  AI-built-site tell.
- **An AI-generated "vibe coding factory" video loop** for `/playbook`. The
  operator asked for it; it was declined under the no-AI-imagery rule and replaced
  with the hand-drawn wall chart.

### Funnel structures tried and reversed

- **Booking as the primary CTA** → removed 2026-09-02 ("booking behind the
  purchase everywhere") → **restored for engagements only** 2026-09-03 ("Booking
  replaces the contact form for engagements"). The current state is deliberate
  asymmetry: engagements book a call, packages buy first and book after.
- **`mailto:` as the package purchase path** → replaced with Stripe Checkout
  2026-09-03.
- **"Contact" in the nav pointing at `/book`** — meaning reaching him cost a
  calendar slot. Fixed 2026-09-02 when `/contact` was finally mounted; a complete
  contact action had sat unused in the codebase since an early phase.

### Copy changed, and what happened

**No conversion outcome is known for any copy change.** Analytics has never been
enabled, so every copy decision in this repo has been made on judgement,
operator instinct, or model review — never on measured behaviour. This is the
single largest gap in the business context, and the research chat should treat
every past copy decision as untested.

The one signal available is qualitative: an external six-persona review on
2026-09-03 scored the site B2B founder 6/10, solo builder 7/10, recruiter 2/10
(by design), hiring manager 6/10, procurement 5/10, referrer 7/10.

### Priors — beliefs, not findings

Labelled honestly so the research chat can challenge rather than confirm them.

1. **[BELIEF] The two audiences barely overlap.** The site is built as two lanes
   (companies at $5K+/mo; solo builders at $99–$7,500) on the assumption they are
   different populations wanting different things. Untested.
2. **[BELIEF] Solo builders stuck at 80% are a real, reachable market.** The whole
   book and packages lane rest on this. No sales data exists to support it.
3. **[BELIEF] "The gap is positioning, not features" is the founder's own
   language.** This is the site's central diagnostic claim for the engagements
   lane and it has never been validated against how founders actually describe
   the problem.
4. **[BELIEF] Receipts-first beats pitch-first.** "See the work" is the locked
   primary CTA on the strength of this. Untested.
5. **[BELIEF] Premium positioning requires suppressing price-sensitivity signals.**
   The reason a "cheaper than a VA" framing was rejected.
6. **[BELIEF, newly formed 2026-09-03] People already paying for AI output through
   a middleman are a market.** From one observed prospect paying $1,500/month for
   a VA producing AI content. **N of 1.** No research has validated it.
7. **[BELIEF] The recruiter audience should not be served.** Ruled deliberately;
   the site sends recruiters to LinkedIn and scores 2/10 for them on purpose.
8. **[BELIEF] The em-dash and forbidden-word rules materially reduce the
   "AI-written" read.** Machine-enforced at significant effort. No evidence any
   buyer has ever noticed.

### The honest summary of commercial traction

**Zero recorded revenue through this website.** No package has been purchased, the
book has never been on sale, traffic has never been measured, and the email list
size is unknown. The `$20M+ in client revenue since 2013` predates the site and
came through channels the site does not describe. Every structural decision
documented above was made without a single measured conversion.
