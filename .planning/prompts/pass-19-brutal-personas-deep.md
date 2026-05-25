# Pass #19 — Brutal persona review (deep)

You are reviewing `micahjonesconsulting.com` after Pass-17 just shipped. **The operator wants exhaustive, brutal feedback** — not polite, not balanced. Cutting critique only, with file:line and proposed fixes. The operator has flagged seven specific concerns this turn (listed below) and wants each persona's lens applied to all of them.

This is a DEEPER pass than the Pass-15 persona review — it goes after polish (marquee spacing, hand-circle craft, case-study pictureless frames), strategy (services portfolio, Frontier AI positioning), and selling (Ordani lede). Personas should be willing to call BS where they see it.

**Stable preview URL:** https://micahjonesconsulting.vercel.app (aliased to the Pass-17 deploy). HEAD: `40a0860` on `main`.

**Get it running locally:**
```
git fetch origin main && git checkout 40a0860
pnpm install
pnpm run dev
```

Open `http://localhost:3000`. Visit ALSO `/work/guardicore`, `/work/ordani`, `/work/hr-equity-author` — the case-study pages are a focus area this round.

Screenshot at **390 / 768 / 1440** for each surface.

## What Pass-17 just shipped

So you're reviewing the CURRENT state, not a previous one:

- **Hero** is the restored rotating-word display H1 ("I BUILD THE [PRODUCT./PIPELINE./LAUNCH./SYSTEM.]") — Bricolage 800 ALL CAPS clamp(52-196). Dual CTA with magnetic primary "Book a call" + ghost "See how I work ↓".
- **Service marquee** scrolls beneath the hero — words separated by ✦ dots.
- **Revenue + exits** moved up to right after the marquee (Pass-17). Terracotta world; `$20M+` figure with hand-drawn circle, dek line ("Two enterprise exits. Named institutional customers. Trillions in digital assets secured."), then two-entry editorial index. Guardicore body is now two paragraphs with named customers embedded as narrative texture (TD Bank's trading systems, Deutsche Bank's clearing infrastructure, NIH research environments, Peoples Natural Gas's operational tech). SurveyMonkey body is also two paragraphs ending with the IPO outcome.
- **CLIENTS section** ("Strategy that ships, not slides.") — kicker `Services`. Four-row services grid. Pass-17: row container is a `<div>` (not `<a>`); only the small "Proven at [Client] →" anchor at the bottom of each row is the click target.
- **Ordani section** — three-pill tagrow ("Live beta · 14 doula practices · Hundreds of users active"), lede paragraph, "Visit Ordani →" placeholder link (href="#" pending real URL).
- **Shipped section** — three cards (HR-author 3-engagement / GTM at scale Guardicore+SurveyMonkey Enterprise / Frontier AI). Frontier AI card currently links to Calendly. "Also at" sub-credit beneath the cards (Flexport, Cuebiq, Postmates).
- **Footer** — "LET'S BUILD →" wrapping a Calendly link.

Case studies use the `(theater)` route group with its own design language (theater-obsidian register), distinct from the Color Worlds home. Pass-17 updated the inline CaseStudyStill placeholder to be an editorial specimen card (small mono eyebrow + display italic title + mono date) — but the surrounding page layout is unchanged from earlier passes.

## What's settled — do NOT relitigate

The operator made these calls deliberately across earlier passes. Personas can react to HOW these are surfaced but should NOT propose reverting them:

- Hero is rotating-word display H1, not editorial lede.
- TechValidate dropped from all credibility surfaces; SurveyMonkey Enterprise is the named entity for 2018 IPO.
- Revenue + exits section position (right after marquee, terracotta world).
- Three-card Shipped section structure.
- Ordani positioned as a live product (not a side project); 14 doula practices, hundreds of users.
- Operator identity ("Independent operator · Oakland, CA") in hero eyebrow.

## NEW operator concerns — top priorities for this review

The operator flagged seven specific issues this turn. Treat them as the BLOCKING items each persona must address:

### 1. Case study pages still look "pictureless frame"
Visit `/work/guardicore` and `/work/ordani` and `/work/hr-equity-author`. The Pass-17 editorial-specimen placeholder is in place but the operator says the pages still read as "missing image" templates. **The bigger question:** does the entire `(theater)` route group's design language (theater-obsidian) still feel disconnected from the Color Worlds home? Persona Marcus (design partner) is the lead reviewer here.

### 2. Frontier AI card links to Calendly — operator says this is wrong
On the home, Card 3 in the Shipped grid says "Frontier AI, shipped." with body about "Production-grade AI work for founders... Specifics under NDA — available for new engagements." The link is the operator's Calendly URL. The operator says this isn't the right destination. Each persona should weigh in: should this link to (a) a placeholder `/work/ai-engineering` stub case study, (b) a services page, (c) be unlinked / read-only marketing, or (d) something else? Persona Lena (strategy partner, new this round) is the lead reviewer.

### 3. Service marquee word spacing reads tacky / not uniform
The service marquee (terracotta band beneath the hero) scrolls words like `Go-to-market ✦ Product ✦ Launches ✦ Growth ✦ Strategy`. The operator says the spacing between words looks inconsistent and not premium. **Diagnosed root cause:** the CSS rule at `app/globals.css:5818` applies `margin: 0 26px` to ALL descendant spans of `.cw-marquee .cw-track`, which matches both the outer per-word spans AND the inner `.cw-dot` spans. The result is compound margins on every element — roughly 104px between words, with the ✦ dot floating in an oversized gap. Persona Marcus should propose the specific CSS fix.

### 4. Hand-drawn circle around `$20M+` not premium enough
The HandCircle SVG component (`components/hand/HandCircle.tsx`) uses `preserveAspectRatio="none"` (line 79), which stretches the curve to whatever container aspect it wraps. On the wide `$20M+` figure (clamp 80-168 since Pass-16), the circle gets distorted into a stretched ellipse. The stroke is 2.4px. The path is hand-feeling but the stretch kills the "drawn by a person" effect. Persona Marcus should propose specific refinements: stroke weight, aspect-ratio handling, possibly a different variant, possibly a paper-grain texture or fine-tip-pen aesthetic.

### 5. CLIENTS section "Strategy that ships, not slides." — operator wants it linking to SERVICES (third request)
This is the third time the operator has flagged this section. Pass-16 reframed it as "Services" kicker. Pass-17 made only the proof line clickable. The operator still says it doesn't read as services-led. **The unsolved question:** does the operator want a `/services` page that this section LINKS to? A different framing entirely? A redesign where the row title itself becomes the link to a service-page (not the case study)? Persona Lena should propose the structural fix.

### 6. Ordani lede paragraph not enticing / selling enough
Current Ordani lede: *"HIPAA-grade practice management for birth workers, built end to end. Doulas had been running their practice on Google Docs and group chats for a decade — they have proper software now."*

The operator says this reads as descriptive, not as selling. Persona David (Black healthtech founder) should react and propose a sharper alternative.

### 7. Services portfolio — what should Micah actually offer?
The operator asks: based on the case study portfolio (Guardicore positioning, SurveyMonkey customer-evidence engine, Ordani solo HIPAA-build, HR-author algorithm/content/product, Frontier AI engagements), what services should be offered? Are the current 4 services (Go-to-market, Product building, Launches, Growth systems) the right framing — or should they consolidate, expand, or pivot? Persona Lena leads this analysis.

## The four personas

Each persona writes in their own voice — don't homogenize. Maya talks fast (Slack-DM cadence). David is technical and skeptical (will X-ray Ordani for builder credibility). Marcus is detached and tired (the polish judge). Lena is strategic and direct (the boutique-consulting voice).

### Persona 1 — Maya Lee, VP Growth at a Series B AI security startup
**Background.** 38, ex-Cloudflare, $14M ARR security company, has $300k/yr discretionary outside-help budget. Has been burned by three GTM consultants who shipped decks and ghosted. Found Micah via LinkedIn referral from a peer at another security company. Fast-decision buyer — 90 seconds on the site before booking the call.

**What Maya reviews:**
- Hero rotation + the new "revenue right after hero" flow. Does the credibility hook work at this position, or does it overwhelm the buyer before they know what Micah does?
- The new Guardicore body (TD Bank / Deutsche / NIH / PNG + trillions narrative): does it make her want to read the case study?
- The CLIENTS section: does she understand WHAT MICAH DOES from the 4 services and the "Proven at" links?
- The Frontier AI card: would she ever click "Inquire ↗" to her Calendly, given she's already considering booking the main "Book a call"?

**Maya's brutal directives:**
- Zero patience for unattributed numbers. If she can't verify a claim quickly, it's suspect.
- Hates aesthetic polish that doesn't track to outcomes she can sell internally.
- Would say privately in a Slack DM to a friend what she'd never say in a LinkedIn comment.

**What Maya writes:**
1. First-30-seconds reaction (one paragraph, her voice).
2. Does the revenue-up-top flow work for HER buyer type? Verdict + why.
3. The single phrase or number on the page that would close her on booking the call.
4. The single thing she'd verify on a 15-minute intro call before writing a check.

### Persona 2 — David Okonkwo, Black founder of a Series A healthtech startup
**Background.** 35, second-time founder, building HIPAA-grade clinical workflow software, closing $9M Series A this quarter. Has founded before. Knows what end-to-end HIPAA shipping costs and looks like. Will X-ray Ordani.

**What David reviews:**
- The Ordani section in particular: the new lede (operator says it's not enticing — does David agree?), the three-pill tagrow, the "Visit Ordani →" placeholder link.
- The Ordani case study page (`/work/ordani`): does the page LOOK like a real product's case study, or like a portfolio item dressed up as a product?
- The Frontier AI card: as a founder shipping AI-native software, would he engage Micah on this framing? "Specifics under NDA" — does it read as appropriate or as thin?
- The case-study placeholder cards (new in Pass-17 — editorial specimen treatment). Does the new placeholder land as designed restraint or still as a missing-image hole?

**David's brutal directives:**
- He's been burned by fractional-CTO types who turned out to be product managers in disguise.
- He's Black and the operator is Black — he wants this to work but won't let that bias the read.
- He cares whether Micah is a REAL operator who ships, not a strategy consultant with a side project.

**What David writes:**
1. First-30-seconds reaction.
2. Rewrite the Ordani lede in 1-2 sentences that WOULD sell him. Operator wants a candidate; provide one.
3. Five technical-credibility questions he'd want answered before engaging Micah on the Frontier AI work.
4. Verdict on the case-study pages: do they hold up as the deeper-funnel evidence Micah needs?

### Persona 3 — Marcus Chen, partner at a creative-tech studio
**Background.** 32, partner at a 6-person studio doing brand + interactive for clients like Linear, Vercel, design-aware AI companies. NOT a buyer. The taste judge. He's seen 500 operator portfolios this year and is tired.

**What Marcus reviews — the polish concerns are HIS:**
- **Service marquee spacing (operator concern #3).** Diagnose the root cause. Propose a specific CSS fix: what selector specificity should change, what should the per-word margin be, what should the dot spacing be. Include exact `app/globals.css:5818` replacement.
- **Hand-circle on `$20M+` (operator concern #4).** Diagnose why it doesn't read premium (the `preserveAspectRatio="none"` distortion is the main culprit at the new figure scale). Propose specific refinements to `components/hand/HandCircle.tsx`: stroke weight, aspect-ratio handling, possibly a paper-grain texture, possibly multi-stroke variant (overshooting tail strokes). Reference premium hand-mark examples by name (Pinkerton Zweck, Klim foundry, hand-illustrated specimens) where useful.
- **Case-study page design (operator concern #1).** Visit `/work/guardicore` and `/work/ordani`. The page uses the `(theater)` route group with its own design language — film-grain overlay, copper accent, Source Serif 4 italic. The Pass-17 specimen-card placeholder is in place. Does the page LOOK designed-pictureless or does it look unfinished? If unfinished, what's the smallest set of changes to make it land?
- **Type system overall.** Bricolage Grotesque (CW home) vs. Source Serif 4 (theater case studies). Is the bifurcation working, or does it read as "two different sites"?

**Marcus's brutal directives:**
- No skin in the game except taste. Pure aesthetic + structural critique.
- Won't soften a critique to be polite.
- Will name specific reference work where Micah's site falls short.

**What Marcus writes:**
1. First-8-seconds reaction (the budget a design-aware viewer gives any portfolio).
2. The marquee fix — exact code (CSS replacement at `globals.css:5818`).
3. The hand-circle fix — exact code or specific design direction for `components/hand/HandCircle.tsx`.
4. The case-study-page verdict + a smallest-possible-improvement proposal (no full redesign — propose the 1-2 changes that would lift it the most).
5. Overall craft score 1-10. No grade inflation.

### Persona 4 — NEW: Lena Marchetti, partner at a boutique strategy consulting firm
**Background.** 44, partner at a 12-person boutique strategy firm that competes with the small-engagement end of MBB. Her firm's average engagement is $180K, average duration 4-6 months. Lena is NOT a buyer of Micah's services and isn't going to refer him to her clients (she'd be competing). But she's a sharp evaluator of:
- How operators package and price services
- Whether a portfolio reads as a boutique consulting practice (premium register) or as an indie hustler
- Strategic positioning (the META positioning: where Micah sits in the market)

**What Lena reviews — the strategy concerns are HERS:**

**A. Services portfolio (operator concern #7).** Looking at the case studies (Guardicore positioning, SurveyMonkey customer-evidence engine, Ordani solo HIPAA-build, HR-author algorithm/content/product, Frontier AI engagements), what's the SHARPEST service portfolio Micah could offer? The current 4 services are:
- 01 Go-to-market — "Positioning, market research, and the narrative that closes enterprise deals."
- 02 Product building — "From strategy to working software, shipped end to end."
- 03 Launches — "Demand, narrative, and the cascade that follows a launch."
- 04 Growth systems — "The repeatable engine underneath the numbers."

Lena should react: do these read as four distinct services or as overlapping framings of the same work? Specifically, does "Launches" overlap with "Go-to-market"? Does "Growth systems" overlap with both?

**A proposed alternative 3-service portfolio** (Lena should critique vs. the current 4):
- **01 Positioning & GTM** — strategic positioning research + go-to-market strategy. Anchor: Guardicore + SurveyMonkey.
- **02 Product building** — concept → shipped product, end-to-end (strategy + design + code + ship). Anchor: Ordani + HR-author full-stack engagement.
- **03 Frontier AI engineering** — production AI for founders building AI-native software. Anchor: ongoing engagements (specifics under NDA).

Is the 3-service version cleaner than the 4-service grid? Or does it lose something important?

**B. CLIENTS section structural fix (operator concern #5).** The operator has flagged THREE times that the section should read as services-led, not case-study-led. Despite Pass-16 + Pass-17 changes, it still reads wrong. Lena should propose the actual structural fix:
- Option (i): Create a `/services` page; CLIENTS section becomes a teaser that LINKS to `/services` (rather than to case studies). The row titles link to per-service pages with full scope/pricing/proof.
- Option (ii): Strip case-study links entirely from the CLIENTS rows. Pure services description. Case studies live only in the Shipped section.
- Option (iii): Section CTA at the bottom: "See all services →" → `/services` page. Keep the per-row case-study proof link as is.
- Option (iv): Rename the section to make services explicit ("Four engagement types" or similar).

Which option BEST solves the operator's repeated frustration? What's the smallest change that lands?

**C. Frontier AI card destination (operator concern #2).** The card currently links to Calendly. Lena should propose: should it link to (i) `/work/ai-engineering` stub case study (needs creation), (ii) `/services/ai-engineering` page (needs creation), (iii) be unlinked / read-only with a "Currently engaging" eyebrow, (iv) something else?

**D. Pricing/packaging signals.** Premium fractional positioning typically surfaces engagement tiers (advisory, project, retainer, embedded). Does Micah's site need to surface this? Or is it intentional restraint (no prices public)?

**Lena's brutal directives:**
- She views Micah's portfolio as a competitor in the boutique-consulting market would.
- She'll call out where the portfolio reads "indie hustler" vs. "boutique practice."
- She knows what $200k+ engagements look like at her own firm; benchmark against that.

**What Lena writes:**
1. First impression — does this site read as a boutique consulting practice or as an indie operator?
2. Verdict on the 3-service portfolio proposal: keep current 4, switch to proposed 3, or different cut entirely.
3. Specific structural fix for the CLIENTS section (which option from A-D above, with file:line for the change).
4. Recommendation on the Frontier AI card destination.
5. Pricing/packaging recommendation: surface tiers or stay private?

## After the four personas — synthesis

Step back and answer in your own voice:

1. **The consistent friction point.** What's the ONE thing that THREE or four personas independently flagged? This is the operator's biggest single fix.
2. **The consistent compliment.** What's the ONE thing all four personas independently liked? The operator should not change this.
3. **The biggest single open question.** Of the seven operator concerns, which one has the LEAST clear path forward across personas? That's where the next plan needs more discovery before execution.
4. **The smallest cross-persona change.** Which single file + line change would move the most personas from "no/maybe" to "yes"? Be specific: file path + exact replacement.

## Constraints

- Don't propose reverting Pass-12/14/16/17 framing decisions listed in "What's settled" above.
- Don't add new dependencies.
- Klim foundry fonts are deferred (license).
- Forced-colors + print stylesheets exist near the bottom of `globals.css`; honor them when proposing CSS.
- Per the operator's transparency note: Pass-12 had two stray-character typo incidents that were repaired. Visually verify rendered output, not just source.
- Vercel preview-protection toolbar is visible on screenshots — that's an operator-action item (Vercel dashboard); ignore it as a craft issue.

## Deliverable format

Four persona blocks, then synthesis. Total target length: 2400-3200 words. Tight prose. Persona voices distinct. No filler.

For Marcus's marquee + hand-circle fixes: include EXACT CSS/code replacements (the operator wants to be able to paste them directly).

For Lena's services portfolio + structural recommendations: include file paths + line numbers + suggested edits.

Write the output to `.planning/reviews/REVIEW-PASS-19-PERSONAS-DEEP-2026-05-23.md` so it lands in the usual reviews folder alongside prior cowork outputs.
