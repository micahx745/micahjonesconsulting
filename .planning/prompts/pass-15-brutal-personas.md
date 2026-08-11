# Pass #15 — Brutal persona review

You are reviewing `micahjonesconsulting.com` after Pass-14 just shipped. **The operator wants brutal feedback.** Not polite. Not balanced. Not "on balance, this works but..." — the kind of cutting critique a real buyer would say privately in a Slack DM to a friend who asked "should I hire this guy?"

Your job is to embody four named personas, in order, and write what each of them would think after 90 seconds on the site. Then synthesize the patterns across all four.

**Stable preview URL:** https://micahjonesconsulting.vercel.app (aliased to the Pass-14 deploy as of Pass-14 ship). HEAD: `a8da758` on `main`.

**Get it running locally if you want depth:**
```
git fetch origin main && git checkout a8da758
pnpm install
pnpm run dev
```

Open `http://localhost:3000` and screenshot at **390 / 768 / 1440** for each persona. Each persona has different attention patterns and will look at different things.

## What's already settled — do NOT relitigate framing

The operator made these calls deliberately. Personas can react to them but should not propose reverting them:

- Hero: rotating-word display H1 ("I BUILD THE [PRODUCT./PIPELINE./LAUNCH./SYSTEM.]")
- TechValidate dropped from all credibility surfaces; SurveyMonkey Enterprise is the named entity for the 2018 IPO
- Shipped section is 3 cards: HR-author 3-engagement / GTM at scale (Guardicore + SurveyMonkey Enterprise) / Frontier AI (specifics under NDA, links to Calendly)
- Ordani section frames the work as a real product, not a side hustle
- Operator identity ("Independent operator · Oakland, CA") is in the hero eyebrow

Personas can react to HOW these surface (does the framing land?). They should not propose alternative framings.

---

## The four personas

### Persona 1 — Maya Lee, VP Growth at a Series B AI security startup

**Background.** 38, ex-Cloudflare, now VP Growth at a 70-person AI security company (Series B, $14M ARR, $40M raised). Reports to a CMO who's burned three GTM consultants in the past 18 months — one shipped a 60-page deck and ghosted, one disappeared after the first invoice, one stayed forever and never moved the number. Maya has a $300k/yr discretionary budget for outside help and her CEO is asking pointed questions about pipeline velocity. She's the fast-decision buyer — she'll spend 90 seconds on a portfolio site before deciding whether to book the intro call. She's been forwarded Micah's URL by a peer at another security company who said "this guy actually shipped at Guardicore — worth talking to."

**What Maya cares about.**
- Does the hero make her want to scroll, or does it look like every other operator portfolio she's seen this quarter?
- The $20M+ figure — does it feel like a real, attributable number or like a vague claim?
- The Guardicore → Akamai story — she ALREADY knows Guardicore exists, so this needs to add detail she didn't know. Does it?
- "Specifics under NDA" on the Frontier AI card — does this read as appropriate operator discretion, or as "this person doesn't actually have AI clients"?
- The "Book a call" CTA — does it feel low-friction enough that she'd actually click it in the next 5 minutes?

**Brutal directives for Maya.**
- She has zero patience for typography that feels like it's "trying."
- She has even less patience for unattributed numbers.
- She would say privately what she'd never say in an LinkedIn comment.

**What Maya writes:**
1. First-30-seconds reaction (one paragraph, her voice).
2. The three specific things that gave her pause (numbered list, each one sentence).
3. The one thing she'd want to verify on a 15-minute intro call BEFORE writing a check (one sentence).
4. Verdict: would she book the call? (Yes / No / Maybe, with one-sentence rationale.)

---

### Persona 2 — David Okonkwo, founder of a Series A healthtech startup

**Background.** 35, second-time founder. Lost his first company (an EHR add-on) after a 3-year grind and a brutal acquihire. His new company builds a HIPAA-grade clinical workflow platform for outpatient mental health practices — closing his Series A this quarter ($9M, lead investor wants to introduce more diverse founder-operators to his portfolio companies, which is how David found Micah's URL). David is the most skeptical persona on this list because:
- He's been a founder. He knows what it takes to ship HIPAA-grade software end-to-end. He's looking at Ordani with X-ray vision.
- He's been burned by "fractional CTO" types who turned out to be product managers in disguise.
- He cares whether Micah is a REAL operator or a strategy-consultant-with-a-side-project-pretending-to-be-a-builder.

**What David cares about.**
- The Ordani section: does this read as a real product? Is "14 doula practices · hundreds of users active" verifiable? What's the URL of Ordani — wait, the link goes to `/work/ordani` (case study), not to an Ordani product site. Red flag or fine?
- The HIPAA-grade claim — has this been audited? Who runs the BAAs? David will mentally check whether the operator would survive a real HIPAA conversation.
- The Frontier AI card: "Production-grade AI work for founders building AI-native software." — is this a real practice with real clients, or aspiration in NDA clothing?
- Does anywhere on the site show actual product screenshots, code, or technical depth? Or is it all positioning and prose?

**Brutal directives for David.**
- He's been burned. He will assume the worst until proven otherwise.
- He's a builder. He judges everything against shipped reality.
- He's Black and the operator is Black — he wants this to work but won't let that bias his read.

**What David writes:**
1. First-30-seconds reaction.
2. Five specific technical-credibility questions he wants answered before he'd take a call (numbered list).
3. The single trust signal he wishes was on the site but isn't (one sentence).
4. Verdict: would he book the call? Why or why not?

---

### Persona 3 — Marcus Chen, design-engineer / partner at a creative-technology studio

**Background.** 32, partner at a 6-person creative-tech studio doing brand + interactive work for clients like Linear, Vercel, and a couple of design-aware AI companies. Studio's portfolio is the kind of thing that gets quoted in Sidebar and SitesInspire roundups. Marcus is NOT a buyer — he'd never hire Micah; Micah isn't his peer. But Marcus is the persona who would judge the SITE'S CRAFT mercilessly. The operator wants to know: does this site look like premium operator portfolio, or like it was made by a consultant who watched too many Rauno Freiberg videos?

**What Marcus cares about.**
- The rotating-word hero pattern: Rauno Freiberg used this in ~2022; by 2026 every operator portfolio has copied it. Is Micah's version fresh, or is it costume?
- Bricolage Grotesque — a free-tier font. Does it work at this scale, or does it betray the budget?
- The ".cw-shift" chromatic-aberration text-shadow — earned texture or affectation?
- The hand-drawn elements (hand-circle around $20M+, hand-underline that's been removed from the hero) — are they doing work?
- The color worlds cross-fade pattern — does it support the narrative or distract from it?
- Spacing, scale, hierarchy — does the site have a point of view, or is it pattern-matched from current trends?
- Mobile execution — does the desktop polish translate, or does it fall apart at 390?

**Brutal directives for Marcus.**
- He has no skin in the game except taste. His opinion is purely aesthetic + structural.
- He's seen 500 operator portfolios this year. He's tired.
- He calls out when something is "doing a Rauno" without earning it.

**What Marcus writes:**
1. First-8-seconds reaction (this is the budget a design-aware viewer gives any portfolio).
2. The three craft choices that work.
3. The three craft choices that don't work.
4. The single thing that would make this feel like a portfolio with a point of view, not a pattern match.
5. Score 1-10 on overall craft. No bullshit. No grade inflation.

---

### Persona 4 — Tasha Williams, Black founder of a Series A AI infrastructure startup

**Background.** 41, Berkeley CS PhD, ex-Anthropic research engineer, now founder of an AI infra company that just closed $11M Series A. Tasha is on Micah's site because a mutual friend in the Black tech network DM'd her the link with "you should know this guy exists." Tasha is not necessarily a buyer — she might be a peer, a referral source, a future hire conversation, or just someone who'd talk to him at a Black-in-tech dinner. She's the persona that judges whether Micah is LEGIBLE as a person on this site, not just as a portfolio of deliverables.

**What Tasha cares about.**
- Who is Micah Jones? Is he a personality, or is he a list of engagements? Premium operator portfolios usually walk a line between "I'm a person" and "I'm a brand" — does this one do that, or does it tilt all the way to brand?
- The "Independent operator · Oakland, CA" tag — Oakland is doing positioning work. Does it earn that work, or is it filler?
- Identity surfacing: does the operator's identity (Black, Bay Area, deep-tech, second-act builder) come through on the site, or is it completely absent? Either extreme would be a tell — totally absent reads as "I'm trying to be raceless and that's its own thing," totally loud reads as "I'm marketing my identity." What's the middle? Does the site find it?
- Voice: in the body copy, does Micah sound like a person, or like an LLM-flavored consultant?
- The Ordani section — practice management for doulas (predominantly women-of-color labor) is a meaningful positioning move. Does the site surface that, or treat it as a generic vertical SaaS play?
- Is there ANY actual human warmth on this site, or is it all editorial register and display type?

**Brutal directives for Tasha.**
- She's seen what bad "Black tech operator" portfolios look like (corny, performative, palette-of-Pan-African-colors caricatures).
- She's also seen what overcorrected portfolios look like (raceless to the point of erasure).
- She'll call out either failure mode directly.

**What Tasha writes:**
1. First impression — does she want to read more, or close the tab? (One paragraph.)
2. The most interesting thing on the site that reveals who Micah is as a person, not just a portfolio.
3. The most missing thing — what should be on this site but isn't, that would make Micah legible as a human?
4. Verdict: would she DM Micah after seeing this? Would she refer him? Would she warn a friend off him? (Pick one.)

---

## After the four persona reviews — synthesis

Step back from the personas and answer in your own voice:

1. **The consistent friction point.** What's the ONE thing that all four (or at least three of four) personas independently flagged? This is the most important finding.
2. **The consistent compliment.** What's the ONE thing that all four (or at least three of four) personas independently liked? This is what the operator should NOT change.
3. **The most surprising verdict.** Which persona's read most contradicts the operator's intent for the site? Why?
4. **The smallest change with the biggest cross-persona impact.** Be specific: file path + suggested edit + which personas it'd move from "no/maybe" to "yes."

## Constraints

- Each persona writes in their OWN voice — don't homogenize them. Maya talks fast and uses Slack-DM cadence. David is technical and skeptical. Marcus is detached and tired. Tasha is warm but unsparing.
- Don't soften the brutal framing. The operator explicitly asked for unvarnished feedback. Polite is the failure mode here, not the goal.
- Don't propose reverting Pass-12/14 framing decisions (rotating-word hero, dropped TechValidate, 3-card Shipped, AI card framing, Ordani as live product). Personas can react to HOW these are surfaced.
- Don't make up numbers. If a persona wants verification of a number, name what they want verified — don't invent data.

## Deliverable

Four persona blocks, then synthesis. Total target length: 1800-2400 words. Tight prose. Persona voices distinct. No filler. The operator should be able to read this once and know exactly what to fix next.

Write to `.planning/reviews/REVIEW-PASS-15-PERSONAS-2026-05-23.md` so it lands in the same folder as prior reviews.
