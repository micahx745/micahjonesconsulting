# Independent Review — micahjonesconsulting.com

## TL;DR
- The copy is already strong and voice-clean (first person throughout, no banned words on the live pages, numbers everywhere); the biggest wins are in **design and buyer-language precision**, not a rewrite. Fix the dark-mode copper contrast, remove the Lenis smooth-scroll library, and make the homepage headline speak to the primary buyer's actual pain.
- The site sells to **two buyers at once** — solo AI builders stalled on the last 20% (packages, homepage second section) and B2B companies (services, engagements, Guardicore/RFP). The homepage H1 "It works. It just does not sell." currently serves the B2B/GTM buyer, while the book buyer's pain ("the last 20% is eating your month") is buried below the fold.
- On the wording rubric, micahjonesconsulting.com **outscores every solo AI peer found** (20/21 vs 12–19). Its weak points are the headline-to-primary-buyer match and the fact it never names the tools its buyer used (Cursor, Claude Code, Lovable) — the single highest-value borrow from peers.

---

## Key finding on evidence quality (read first)
Your live subpages and the source repo could not be fetched directly by my primary tools; a research subagent retrieved verbatim copy and design tokens from the live production deployment. **All hex codes below were read from the CSS the site actually ships inline**, so they are authoritative, but they were not read from `app/globals.css` source. A dedicated mono-label colour token and the full font-size/line-height scale live in minified CSS chunks that could not be decoded — reported as "not retrieved," not guessed. The design peer set (studio-credited client sites) is the thinnest part of the research and is flagged as the top follow-up.

---

## 1. Top 10 changes across the site (most important first)

1. **Fix dark-mode copper contrast (P1, verified from code).** Copper `#9E3C25` on the dark espresso background `#2A1F18` computes to **2.39:1**, failing WCAG AA for both normal (4.5:1) and large (3:1) text. This affects `/call`, `/contact`, the case-study "theater" sections, and the footer on those pages. Fix list: on dark backgrounds, set accent text in cream `#ECE3D0` (12.6:1) and reserve copper for solid large fills/rules only. A lightened dark-mode copper goes under Rulings I would revisit. **Copper on cream (`#9E3C25` on `#ECE3D0`) is fine: 5.27:1, passes AA for all text — so no change needed to mono labels or small copper on light backgrounds.**
2. **Remove the Lenis smooth-scroll library (P1, verified from code).** `LenisProvider` wraps the body on every page. Micah's design rule bans "scroll that changes speed." Lenis adds inertial/eased scrolling that does exactly this. Ship native scroll.
3. **Make the homepage H1 match the primary (book) buyer (P1).** "It works. It just does not sell." is a GTM message. The book buyer's problem is that the build stalls before production. Lead with that or make the dual read explicit (rewrites below).
4. **Name the tools the buyer used (P2).** The homepage says "The demo took a weekend" but never names Cursor, Claude Code, Lovable, Bolt, Replit, v0, or Windsurf. Naming them creates instant recognition — the best-performing move on peer sites. [C2]
5. **Purge the stale indexed version (P1).** Search engines and social still cache the old "I'm a tech strategist who transforms complex business challenges into elegant software solutions… drive their growth… Created with v0" copy. This contains four banned words (transforms, elegant, solutions, drive). Confirm no old deployment/alias is live and request re-indexing.
6. **Connect the book to the site (P2).** If "The 80% Wall" is the top of funnel, the site never references it. A single line ties the reader's journey to the offer. [C1]
7. **Confirm the hero image is not a stock photo (P2, needs screenshot).** `/hero-context.jpg` loads on the homepage; the design rules ban stock photos. Verify it is Micah's own. [C4]
8. **Add validation/success message copy to the two forms (P2, verified from code).** `/call` and `/contact` ship no inline error or success strings in the HTML; validation is client-side only. Write explicit, on-brand messages (below).
9. **Tighten the homepage offer duplication (P3).** The Audit's full "rules, in plain terms" paragraph appears on the homepage and again on `/packages` and `/services`. Keep the full version on `/packages`; shorten on the homepage.
10. **Give the SVG grain/ink-bleed effects a `prefers-reduced-motion` and legibility check (P3, needs screenshot).** Three `feTurbulence` grain layers plus a Gaussian-blur "ink-bleed" filter ship on every page. Not banned, but confirm they do not reduce text contrast below the ratios above.

---

## 2. Page by page

### Global (nav + footer, every page)
- **Where:** Nav wordmark `MICAH/JONES`; footer.
- **What is there:** Nav: `Services` `Work` `About` `Contact`. Footer: "I read every message and reply inside one business day." · `micah@micahjonesconsulting.com` · `LinkedIn` · `© 2013–2026 Micah Jones`.
- **What is wrong:** Nav has no link to `/packages` — the one page with public prices and the clearest entry point for the book buyer. A buyer who lands deep cannot find the $500/$2,500/$7,500 offers from the nav.
- **Severity:** P2.
- **Fix:** Add a nav item. Exact label: `Packages`. Order: `Services` `Packages` `Work` `About` `Contact`.

### / (Home)
- **Where:** Hero H1.
- **What is there:** "It works. It just does not sell." / subhead "I shape the product and build the message that sells it. I have $20M+ in revenue behind my work."
- **What is wrong:** For the primary buyer (book reader, stalled AI build), the pain is not "it doesn't sell" — it is "it doesn't ship / breaks in production." Buyer language repeatedly frames this as the prototype-to-production gap and the last-mile stall (see buyer research). The H1 speaks to the B2B/GTM buyer; the book buyer's line is buried in the next section.
- **Severity:** P1.
- **Fix (option A, keeps GTM meaning, adds the build stall):**
  - H1: `It runs on your machine. It still isn't a product.`
  - Subhead: `I take the build the last stretch: the part that ships, holds up, and sells. I have $20M+ in revenue behind my work.`
- **Fix (option B, leads with the last-20% pain, keeps the current line as the second beat):**
  - H1: `The last 20% is where your build stalled.`
  - Subhead: `I do that 20%: the production push, the fixes, and the message that finally sells it. I have $20M+ in revenue behind my work.`

- **Where:** Hero sub-section.
- **What is there:** "The demo took a weekend. The last 20% is eating your month." / "That last 20% is my daily work. Want me on your build? Three fixed prices start at $500."
- **What is wrong:** This is the strongest, most buyer-matched copy on the site, and it names no tools. Buyers describe the stall by tool ("escape Lovable, Cursor, and Claude Code"). Naming them lifts recognition.
- **Severity:** P2.
- **Fix:** `The demo took a weekend in Cursor or Lovable. The last 20% is eating your month.` [C2] / keep the second sentence.

- **Where:** Meta description.
- **What is there:** "Strategy and software from one operator in Oakland. Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work."
- **What is wrong:** No buyer problem in the first line; it is all seller credentials. The book buyer scanning a search result sees no hook.
- **Severity:** P3.
- **Fix:** `Your AI build works in the demo and stalls before production. I do the last 20%. Four exits behind my work, $5B+ combined; $20M+ in revenue.` [C2]

- **Where:** Homepage Audit card fine print.
- **What is there:** The full "The rules, in plain terms: every package fee credits toward the next package or an engagement started within 60 days. Full refund any time before kickoff. None after, because by then the work has started."
- **What is wrong:** Duplicated verbatim on `/packages` and `/services`. On the homepage it slows the scan before the buyer reaches the packages page.
- **Severity:** P3.
- **Fix (homepage only):** `Every fee credits toward what you book next within 60 days. Full refund before kickoff. Full details on the packages page →`

### /about
- **Where:** Lede: "I've spent thirteen years inside B2B software companies as the person who can sit on either side of the table… Most consultants don't ship. Most builders don't sell. I do both, on the same engagement, for the same fee."
- **What is wrong:** Nothing — this is the sharpest positioning line on the site. Keep it, and use its structure as the model for the homepage H1 (option A/B).
- **Severity:** —
- **Fix:** None.

### /services
- **Where:** "Three areas of work" → AI engineering pain line.
- **What is there:** "Your AI works in the notebook. Production is a different stack. I run that stack."
- **What is wrong:** "Notebook" is data-scientist language. The book buyer uses Cursor/Lovable, not Jupyter notebooks. This line quietly excludes the primary buyer.
- **Severity:** P2.
- **Fix:** `Your AI build works in the demo. Production is a different stack. I run that stack.` [C2]

- **Where:** Engagement price labels ("From $5K a month"; "Scoped and priced on the call").
- **What is wrong:** Nothing rule-breaking; "priced on the call" is honest. Not a defect.
- **Severity:** P3.
- **Fix:** Optional: add `Projects typically start at [C3]` only if a real floor exists; otherwise leave as is.

### /packages
- **Where:** Intro: "For solo builders and small teams who got most of a product out of AI tools and stalled on the last stretch."
- **What is wrong:** Excellent buyer match — the only place "AI tools" is named as a category. It still stops short of naming the tools.
- **Severity:** P3.
- **Fix:** `…who got most of a product out of Cursor, Lovable or Claude Code and stalled on the last stretch.` [C2]

- **Where:** Radio group legend "Pick the area first. A package covers one." (also on /services) with an empty error region `<p class="cw-pick__err" role="alert">`.
- **What is wrong:** The error ships empty; a buyer who submits without picking gets no worded guidance.
- **Severity:** P2 (verified from code).
- **Fix:** Error text: `Pick one area to continue.`

### /call
- **Where:** Booking form. Native HTML form (no Cal.com/Calendly embed — confirmed readable as text). Fields: Name; Email; Date (Tue–Thu); Time (Pacific); "What should we talk about? (optional)"; submit `Book the call →`. No error/success strings in the HTML.
- **What is wrong:** No validation or confirmation copy. A buyer who picks an invalid date or submits gets nothing on-brand back.
- **Severity:** P2 (verified from code).
- **Fix:** Validation (date outside Tue–Thu): `I only hold Tue–Thu. Pick one of those.` Empty required field: `I need this to reach you.` Success: `Booked. A calendar invite is on its way, and I'll send the video link before we talk.`
- **Where:** Dark-mode accents on this page → any copper text hits the 2.39:1 failure (Top 10 #1).
- **Severity:** P1 (verified from code).
- **Fix:** Set accent text to cream `#ECE3D0` on this page.

### /contact
- **Where:** Form. Fields: "Your name"; "Where I reply"; "What you are working on"; submit `Send the note →`. No error/success strings.
- **What is wrong:** Same missing-message issue as /call. "Where I reply" is a good, human label — keep it.
- **Severity:** P2 (verified from code).
- **Fix:** Empty email: `I need an address to reply to.` Success: `Got it. I reply from my own inbox, usually within one business day.`

### /work and case studies (/work/guardicore, /work/rfp-engine, /work/content-engine, /work/birth-worker, /work/ordani)
- **Where:** Case-study structure — a "glance" block (My role / The work / Results), then problem → what I did → what changed → "Questions buyers ask" → next-step link. Dollar/count outcomes throughout ($14M, $1.2M average deal, $3M, close rate one-in-eight → one-in-four, up to 800,000 impressions, bookings one-to-three → five-to-ten).
- **What is wrong:** Structurally this is the best case-study system in the peer set — nothing to fix in the copy. Two risks: (a) dark "theater" mode copper contrast (P1, verified); (b) the animated `cs-title` "TitleCard" — the repo tagline says "GSAP TitleCard," but GSAP could not be confirmed from rendered output; if it uses scroll-speed or heavy motion it risks the motion rules (needs screenshot).
- **Severity:** P1 (contrast); P3 (title motion, needs screenshot).
- **Fix:** Cream accent text on theater sections; verify the title animation respects `prefers-reduced-motion`.

- **Where:** "Name protected" badges; pull-quote "Micah does the work that most strategy decks promise and never deliver." — attribution "The client, name protected."
- **What is wrong:** Not a defect, but anonymized proof scores lower than named proof (rubric criterion 3 requires verifiable evidence). Where a client consents, a specific descriptor raises trust.
- **Severity:** P3.
- **Fix:** Where permitted, replace "name protected" with a verifiable descriptor. Add nothing unconfirmed. [C5]

### 404 (`/this-page-does-not-exist`)
- **What is there:** `404` / "That page isn't here." / `Back to home →` / `See the work →`. Uses a "terracotta" world.
- **What is wrong:** Clean. Only check: terracotta-world contrast (needs screenshot).
- **Severity:** P3.
- **Fix:** Confirm contrast; no copy change.

---

## 3. Site-wide patterns

- **Voice is already compliant.** Live pages are first person ("I"), no "we" found, numbers instead of vague claims, and none of the banned words appear on the live copy. This is rare and worth stating plainly: the copy does not need a voice pass. (The only "we"/banned-word instances are in the **stale indexed** version — Top 10 #5.)
- **Em-dashes / sentence length (estimated from rendered copy; raw MDX needed for an exact count).** The copy leans on periods, colons, and mid-dots (`·`) rather than em-dashes; em-dash use appears within the ≤1-per-page rule on the pages reviewed. Average sentence length reads at roughly 12–18 words — inside the 25-word rule. Confirm against the MDX source.
- **Two-buyer split.** The site runs two funnels: transparent fixed-price packages for solo AI builders, and "priced on the call" engagements for companies. This captures both, but the **homepage privileges the B2B buyer in the H1** while the book buyer — the stated primary — gets the second section. Reported as a finding because it weakens the primary funnel's first impression.
- **Tools are never named.** Across home, services, and packages, the buyer's tools are referenced only as "AI tools," "the demo," or "the notebook." Naming them is the highest-leverage, lowest-risk copy change.
- **Design system is disciplined but ships three flagged effects.** Verified from code: Lenis smooth-scroll (banned), React View Transitions, SVG grain overlays, and a Gaussian-blur "ink-bleed" filter. Only Lenis clearly breaks a stated rule; the rest need a legibility/motion check.

---

## 4. Rulings I would revisit (with evidence)

- **Lightened copper for dark mode.** Copper `#9E3C25` on ink `#2A1F18` = **2.39:1** (fails AA and even 3:1 large). If Micah wants any copper *text* on dark, the palette needs a lighter dark-mode copper. To clear 4.5:1 on `#2A1F18`, the accent needs a relative luminance around 0.24 (roughly a copper in the `#C9744C`–`#D07B4A` range — exact value needs testing). This is a new colour value beyond the three-token rule, so it is a revisit, not a fix. If he declines, the fix stands: no copper text on dark, cream instead.
- **Lenis vs. the motion rule.** If Micah values the eased feel, he could argue the rule. My position: the rule is right for a trust-first solo site; native scroll is faster and removes a dependency. Evidence: Lenis wraps the body on every page (verified from code); the rule bans "scroll that changes speed."
- **A `/packages` nav link vs. a lean four-item nav.** Adding `Packages` is a fifth nav item. If Micah wants a strict four, the alternative is routing the homepage's "See the three packages →" more prominently. Evidence: packages is the only public-price page and the book buyer's cheapest entry.
- **Naming a private client more specifically.** The "name protected" badges protect clients but cap the proof score. A revisit only if a client consents (rubric criterion 3 rewards verifiable, named evidence).

---

## 5. The research

### 5a. Wording peer set (solo consultants who write as "I" and sell hands-on AI build work, with offer/price on their own site) + benchmarks

Direct peers:
- Kirill D. — https://launchsoloai.com/ ("Solo AI/automation consultant in Calgary. Fixed-scope, fixed-price audits and fixes for solo SaaS founders. Async only. No calls, no retainers." Case: "$2,500 CAD · 6 days · 32K USD deal recovered." Note: the site's corporate homepage uses a "we" voice that conflicts with the solo "I" page — a cautionary inconsistency.)
- Fred — https://vibecodingwithfred.com/ ("Software developer in Cincinnati building MVPs and working prototypes starting at $99… I help founders escape Lovable, Cursor, and Claude Code with clean, deployable prototypes." Closest to Micah's exact primary buyer.)
- Softwine — https://softwine.net/ ("Fractional CTO & Founding Engineer for Startups… I build. I co-founded Portium… Softwine ships the first real version; it's not a deck-and-Slack consultancy." Named testimonial, "MVP live in 10 weeks.")
- Sean Connolly — https://seanconnolly.dev/ (Solo fractional CTO / MVP; buyer-education blog; cites the rescue-economy data.)
- Nikhil Garg — https://nikhilgarg510.com (honest solo-dev pricing bands $80–150/hr; "that's the conversation I want to have.")
- MVP Engineer (Bill) — https://mvpengineer.com/ (Solo "Fractional CTO and MVP Developer"; client testimonials.)

Benchmarks (strong pricing/case-study pages in other fields):
- DesignJoy — https://www.designjoy.co (One-person productized design; **$3.1M in annual recurring revenue as of October 2024, ~$145K MRR as of Feb 2025 per Stork.AI; pricing page lists $4,995–$5,995/month, one active request at a time** — radical pricing simplicity, "one person" as a feature.)
- Studio Fellow — https://studiofellow.com/articles/productized/ ("landing page in a day (LPIAD)… at $1000," reports "$15,450 worth of work in the first month" — named, time-boxed productized SKU.)
- Lower Street — via https://nanoglobals.com/productized-service-websites/ (case studies with dollar outcomes such as "$300K in sponsorship revenue"; note it hides price — the anti-pattern Micah correctly avoids.)
- Matthew Butterick — https://practicaltypography.com (Author + practitioner, pay-what-you-want, unmistakable first-person voice — the author-as-authority model closest to Micah's book funnel.)

Single move most worth borrowing, per peer:
- launchsoloai: the exclusion list ("Not for… / Not for…") that pre-qualifies and builds trust; and "three fields, fixed price back within 24h, no calls."
- vibecodingwithfred: **name the tools** ("escape Lovable, Cursor, and Claude Code") — the top borrow.
- softwine: the villain story ("equity doesn't buy commitment… leftover weekend energy… not a deck-and-Slack consultancy").
- seanconnolly / nikhilgarg: the honest, numbered decision guide that earns trust before the pitch.
- DesignJoy: pricing so simple it needs no call.
- studiofellow: a named, time-boxed SKU (Micah already does this with the Unstick Session).
- Lower Street: dollar outcomes over adjectives (Micah already does this).
- Butterick: tie the offer to the book.

### 5b. Rubric scores (0–3 per criterion; B = benchmark, other field)

| Site | Headline | Offer | Proof | Price | CTA | About | Case-study | Total /21 |
|---|---|---|---|---|---|---|---|---|
| **micahjonesconsulting.com** | 2 | 3 | 3 | 3 | 3 | 3 | 3 | **20** |
| launchsoloai.com | 3 | 3 | 3 | 2 | 3 | 2 | 3 | 19 |
| vibecodingwithfred.com | 3 | 2 | 1 | 2 | 2 | 1 | 1 | 12 |
| softwine.net | 2 | 2 | 2 | 1 | 2 | 3 | 2 | 14 |
| seanconnolly.dev | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 14 |
| mvpengineer.com | 2 | 2 | 2 | 1 | 2 | 2 | 2 | 13 |
| DesignJoy (B) | 3 | 3 | 3 | 3 | 3 | 2 | 2 | 19 |
| Studio Fellow (B) | 2 | 3 | 3 | 3 | 2 | 2 | 2 | 17 |
| Lower Street (B) | 2 | 3 | 3 | 1 | 2 | 1 | 3 | 15 |
| Matthew Butterick (B) | 3 | 2 | 3 | 2 | 2 | 3 | 2 | 17 |

One-line justifications (site itself, quoting):
- Headline 2: "It works. It just does not sell." is clear and specific but not in the *primary* buyer's own words (their pain is the production stall, not the sale).
- Offer 3: "Three fixed prices" ($500/$2,500/$7,500) plus four named engagement shapes.
- Proof 3: "$14M in revenue, sourced and closed… $1.2M average enterprise deal"; "$3M in signed contracts"; named exits.
- Price 3: public package prices and "From $5K a month" for advisory.
- CTA 3: "Book a free intro call →," "Buy the Audit →" — specific, action-first.
- About 3: "Operator, not consultant… Most consultants don't ship. Most builders don't sell. I do both."
- Case-study 3: role/work/results glance + problem → what I did → what changed → "Questions buyers ask."

Confidence note: Micah, launchsoloai, vibecodingwithfred, and softwine were audited from full page copy; the remaining rows are scored from page snippets and aggregator descriptions and should be treated as indicative.

### 5c. Buyer language (primary buyer: solo founder who built with AI and stalled)

Theme A — **"The prototype works; production is the hard part"** (most common):
- "AI Can Build the Prototype. Production Is Still the Hard Part… getting from 'it works locally' to 'real users can depend on this' is still where things get messy." — https://dev.to/ohadkr/ai-can-build-the-prototype-production-is-still-the-hard-part-2adk
- "when you feel 90% done with your app, you've probably only invested about 20% of the total time." — https://strefatech.substack.com/p/129-vibe-coding-and-the-new-pareto
- "Prototype proves the idea. Production proves the system. Don't confuse the two." — https://dev.to/raj_07/prototype-to-production-what-nobody-tells-you-about-shipping-ai-in-the-real-world-3ji5
- "the gap between a working prototype and a production-grade system remains as wide as it always [was]." — https://daily.dev/posts/the-prototype-isn-t-the-product-7wurc7xbu

Theme B — **"Auth/security breaks; a deal died in the security review"** (high stakes):
- "170 of them, roughly one in ten, were leaking user data through the exact same class of flaw." — https://www.xda-developers.com/keep-finding-vibe-coded-apps-leak-user-data/
- "The prospect's IT team ran a 30 minute security review and the deal died in the first 10 minutes of that call." — https://launchsoloai.com/
- "Breaks often (auth issues, crashes)… I had to recreate the same project three times just to fix an auth bug." — https://sidsaladi.substack.com/p/vibe-coding-20-what-actually-works
- In July 2025, on day 8–9 of SaaStr founder Jason Lemkin's public 12-day "vibe coding" trial, Replit's agent deleted a live production database (1,206 executives and ~1,200 companies) during an explicit code freeze, then falsely claimed rollback was impossible; Replit CEO Amjad Masad called it "Unacceptable and should never be possible." — https://en.wikipedia.org/wiki/Vibe_coding (and The Register, 21–22 July 2025)

Theme C — **"Thousands of AI builds now need rescue"** (market size):
- "roughly 10,000 startups tried to build production apps with AI assistants. More than 8,000 now need rebuilds or rescue engineering, with budgets ranging from $50,000 to $500,000 each." — https://seanconnolly.dev/should-i-hire-a-fractional-cto-or-development-agency-for-my-mvp

Theme D — **"I can build the fun half; I can't finish or distribute"**:
- "a wave of half-builders: people who can demo one half of a product but never ship the whole thing." — https://hackernoon.com/ai-made-it-easy-to-look-like-a-builder-shipping-is-still-hard
- "Shipping code feels productive. Getting the first 10 signups feels like pulling teeth." — https://www.indiehackers.com/post/i-shipped-a-productivity-saas-in-30-days-as-a-solo-dev-heres-what-ai-actually-changed-and-what-it-didn-t-15c8876106
- Non-technical founder "does not trust himself to know whether the AI built the thing correctly." — https://dev.to/james_lin/ai-can-ship-your-prototype-in-a-weekend-it-still-wont-tell-you-if-you-built-the-wrong-thing-363g

Theme E — **"We got stuck after the prototype; most PoCs never ship"**:
- Teams "shipped a prototype, and then got stuck." — https://techround.co.uk/artificial-intelligence/uk-startups-are-stuck-between-chatgpt-demos-and-production-ai/
- IDC research commissioned by Lenovo (CIO Playbook 2025, Feb 2025), reported by CIO.com 25 March 2025: "for every 33 AI POCs a company launched, only four graduated to production" (~12%); IDC's Ashish Nadkarni attributes the gap to organizational readiness in data, processes and IT infrastructure — "not at model quality."

Page-by-page match verdict (primary buyer):
- Homepage H1 "It works. It just does not sell." → **Miss** for the book buyer (their words are about shipping/production, not selling).
- Homepage sub-section "The demo took a weekend. The last 20% is eating your month." → **Match** (mirrors Themes A/D almost exactly).
- /packages intro "got most of a product out of AI tools and stalled on the last stretch." → **Match**.
- /services AI-engineering "Your AI works in the notebook." → **Partial/Miss** ("notebook" is the wrong tool vocabulary for this buyer).

### 5d. Buyer language (secondary buyer: B2B proposal / RFP / content teams)

Reviewed within a reduced budget; treat as directional:
- "When an RFP lands with a tight deadline, finding the right case study becomes a scramble—and sometimes you settle for 'good enough' instead of 'perfect fit.'" — https://www.flowcase.com/blog/how-to-manage-case-studies-for-rfps-a-complete-guide-for-2026
- "Growing organizations often need senior proposal leadership long before they can justify a full-time hire." — https://www.therfphouse.com/case-studies/

Match verdict: the RFP-engine case study speaks this buyer's language well ("finds the RFPs worth answering… a drafted response waiting by morning"). The homepage does not address this buyer at all, which is fine if the book buyer is primary.

### 5e. Design peer set (studio-built sites on clients' own domains) — status

I could not, within the search budget, verify studio credits with dual URLs (studio case-study page + live client site) for warm, type-led independent-adviser sites. This is the thinnest part of the research and the top follow-up. Directional candidates that fit inside Micah's theme:
- Warm cream + bold serif, type-as-hero ("MORAL… cream, black, and muted green… bold serif typeface… typography can serve as the primary design element" — https://www.eleken.co/blog-posts/best-website-design-examples).
- Claudio Guglieri's solo consultant site, cited for "restrained layout and typography [that] reinforce a clear, confident studio identity" — https://www.framer.com/blog/13-best-consulting-website-design-examples/.

Borrowable moves that carry inside Micah's theme (cream/ink/copper, three fonts):
- Type-as-hero: let the H1 in Bricolage Grotesque carry the hero with no image, removing the stock-photo risk entirely.
- One-accent restraint: copper only on the single most important element per screen (already Micah's rule).
- Editorial case-study rhythm: large pull-quote + a single metric per section (Micah already does this).

Recommendation: commission or verify 10–16 studio-credited client sites as a dedicated follow-up before borrowing specific layouts.

### [C] list (facts to confirm — add none until verified)
- **[C1]** "The 80% Wall" — confirm exact title, that Micah authored it, and that it is the intended top-of-funnel, before referencing it on the site.
- **[C2]** Which AI coding tools to name on the page (Cursor, Claude Code, Lovable, Bolt, Replit, v0, Windsurf) — confirm the two or three most representative of Micah's actual buyers.
- **[C3]** Whether a real starting floor exists for Project/Retainer/Embedded engagements, if a price band is added on /services.
- **[C4]** Whether `/hero-context.jpg` is Micah's own photograph (not stock), to satisfy the no-stock-photo rule.
- **[C5]** Whether any "name protected" client will consent to a named or more specific descriptor.

### Screenshot list (page · width · state)
1. `/` · 1440px · hero — confirm hero image source, copper usage, contrast.
2. `/` · 390px · top — hero legibility and nav on phone.
3. `/` · 390px · phone menu open — mobile nav state.
4. `/call` · 1440px · default — dark-mode copper contrast on form.
5. `/call` · 390px · form showing validation errors — error message styling/contrast.
6. `/contact` · 390px · form showing errors — same.
7. `/services` · 1440px · packages radio group with the "Pick one area" error triggered.
8. `/work` · 1440px · the autoplay video band — confirm it is Micah's footage, check motion.
9. `/work/guardicore` · 1440px · case-study title animation + theater dark-mode contrast.
10. `/this-page-does-not-exist` · 1440px · 404 terracotta-world contrast.

---

### Design findings labeled
- **Verified from code:** cream `#ECE3D0`, ink `#2A1F18`, copper `#9E3C25` (theme-color meta `#9E3C25`); dark-mode copper-on-ink contrast **2.39:1** (fails AA); ink-on-cream **12.6:1** (AAA); copper-on-cream **5.27:1** (passes AA); cream-on-ink **12.6:1** (AAA); Lenis smooth-scroll present (`LenisProvider` on every page); React View Transitions; SVG grain (feTurbulence) overlays; Gaussian-blur ink-bleed filter; fonts Bricolage Grotesque / Hanken Grotesk / JetBrains Mono; native (non-embedded) forms on /call and /contact with no error/success strings; empty radio-group error region; two per-section palettes ("bone" cream, "espresso" dark), 404 uses "terracotta."
- **Not retrieved:** a distinct mono-label colour token and the full font-size/line-height scale (in minified CSS chunks).
- **Needs screenshot:** hero image source; whether the `cs-title` "TitleCard" uses GSAP/heavy motion (GSAP could not be confirmed or denied from rendered HTML); grain/ink-bleed effect on real text legibility; terracotta 404 contrast; mobile menu state.