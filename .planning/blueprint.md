# Micah Jones — Redesign Blueprint
## A premium-agency-tier direction for micahjonesconsulting.com

---

## 1. Executive Thesis

Build **"House Lights"** — a two-mode site where the public rooms (Home, About, Work With Me, Contact) live in warm cream with a single copper accent and confident editorial sans, and the case studies live in a separate dark cinematic theater that visitors enter via a transition that feels like the lights dimming. The site is led by one excellent portrait of Micah, one signature typeface pair (Söhne + Tiempos, or Inter Display + Source Serif on the open-source path), and one signature interaction (the foyer-to-theater dim). It is not Clay-clone, not editorial-calm, not dev-Twitter. It says "Black operator who builds, shows the work cinematically, and treats visitors like adults" in the same gesture.

---

## 2. The Agency Tear-Down Catalog

### Tier 1: The Cinematic Agencies (the Clay peer group)

**Clay (clay.global)** — SF UI/UX + branding agency.
- Signature move: serif+sans pairing that reads "sophisticated yet friendly," premium-client logo wall (Facebook, Slack, Google, Amazon, Snapchat), case study pages with "artwork first" approach (treating client artifacts as art objects).
- Typography: serif/sans combination per Clay's own write-up on Art Bridges and CafePay rebrand; sans is in the Inter/Söhne neighborhood.
- IA: 5–6 pages — Work, About, Services, Blog, Contact. Every page carries weight.
- Steal: serif-for-soul + sans-for-spine pairing; "artwork first" case study layouts; senior-team-led messaging ("co-founders lead dedicated, senior-level teams"); the publisher-grade treatment of client artifacts.
- Skip: the generic agency client-logo wall — Micah doesn't have it.

**Active Theory (activetheory.net)** — Venice Beach WebGL studio.
- Signature: portfolio site IS a WebGL R&D demo (Hydra engine since 2012); scrolling walks you through experiments without an "Our Services" slide.
- Typography: XXL Monument Grotesk display, mono-sans body per Refs.gallery tear-down.
- Color: pitch-black #0B0B0B canvas with one violet accent #A970FF used only on CTAs.
- Motion: hover blooms a case tile into a 60fps in-place trailer; LCP ~1.3s desktop via Draco-compressed meshes.
- Steal: the "one bold accent against restraint" color discipline; the "trailer-on-hover" idea (refactored as static-to-video on hover for ORDANI).
- Skip: WebGL hero scenes — wrong budget, wrong audience.

**Immersive Garden (immersive-g.com)** — Paris, **Awwwards 2025 Agency of the Year** (confirmed on the Awwwards Annual Awards 2025 official page, voted by the international jury during the January 12–22, 2026 voting window).
- Signature: case studies framed as "exquisite 3D journey" cinematic experiences (Cartier, Dior, Louis Vuitton Collectibles); each project is a destination, not a card.
- IA: project-led navigation; the home is a horizontal reel of client experiences.
- Steal: the conviction that each case study deserves its own visual world; the cinematic treatment of even mundane briefs (a champagne house, a watch line).
- Skip: the multi-week 3D budget.

**Locomotive (locomotive.ca)** — Montréal, who held Awwwards Agency of the Year for **seven consecutive years** before Immersive Garden took the 2025 crown.
- Signature: PP Locomotive New typeface (a variant of PP Editorial New from Pangram Pangram) loaded with custom glyphs that encode inside jokes and agency data; a "letter shuffle" transition tied to a pixel lazy-load effect.
- Color system per Awwwards: only #000 and #ffffff.
- Steal: the conviction that a website can ship with **two typefaces and four styles** and still feel premium. The pixel lazy-loader is a great cheap signature.
- Skip: PP Editorial New — already in Attempt 2 and overdone in 2026.

**Basement.studio** — Buenos Aires, premium-startup tier.
- Signature: orange #FF4D00 + black; ships their own Basement Grotesque (free) and Basement Foundry; tagline "We make cool shit that performs"; clients include Vercel, MrBeast, KidSuper, Daylight.
- Typography (their own site): Neue Montreal by Pangram Pangram per MaxiBestOf tear-down.
- Tech: Next.js + GSAP + Stitches + Locomotive Scroll.
- Steal: the brevity of their voice ("We make cool shit that performs" — Micah's site can be similarly direct); single-accent discipline (one warm color on near-black).
- Skip: the "we ship typefaces" flex.

### Tier 2: The Disciplined Studios

**Buck (buck.co)** — global, 2024 B Corp. Type: **Mabry** as primary ("contemporary and historic, rigorous and gestural"). Steal: the explicit reasoning about why a typeface was chosen — Micah's site can do the same in About.

**Anton & Irene (antonandirene.com)** — Brooklyn duo, ex-Fantasy Interactive directors.
- Signature: dark-scheme one-pager; designers literally wearing colored lycra suits with mouseover-driven facial-expression interactions; Circular sans on dark.
- Steal: the **founders-as-the-hero** treatment — for a solo operator this is the most defensible move. The "we are real people, not an agency" framing translates directly.
- Skip: the lycra-suit gag — for Micah, replace with one excellent B&W portrait.

**Instrument (instrument.com)** — Portland, 10+ years partnered with Nike.
- Steal: the case-study format ("Create a unifying digital design system that enables consistency at scale") — one-sentence problem statement at the top of each project, followed by year-by-year story. This is the most replicable case-study skeleton for Micah's ORDANI page.

**MetaLab (metalab.com)** — Victoria BC; per Andrew Wilkinson's own Medium post "Slack's $2.8 Billion Dollar Secret Sauce," MetaLab "did the logo, the marketing site, and the web and mobile apps, all in just six weeks from start to finish" for Slack in late 2013. (The often-cited "$60K" was MetaLab's total first-year gross revenue per a SaaS Club podcast interview, not the Slack contract price, which has never been publicly disclosed.)
- Steal: the **price-anchored, results-anchored case-study close** (Slack was acquired by Salesforce for **$27.7 billion** in December 2020 per CNBC) and Wilkinson's "pretending to be a team" history is permission for Micah to describe himself as an *operator* not an *agency*.

**Locomotive's Hierarchy of Effort**: their own case study admits they "avoided excessive animations and gadgets to convey only the essentials... only two typefaces and four styles." That single sentence is the whole brief for what Micah's site has to be.

### Tier 3: The "Solo Premium" Reference Set

These are not agencies. They are the proof points that one person can pull off premium without an FWA-budget team.

**April Dunford (aprildunford.com)** — solo positioning consultant. Webflow. Signature: orange wordmark, generous whitespace, her two books treated as publisher-grade product objects on the home, single accent color used with restraint. Logo file is named `April_New-Logo_Orange.svg` confirming orange as the deliberate identity choice. Leans **minimalist-confident / publisher-editorial**. *This is the strongest precedent for what Micah needs.*

**Frank Chimero (frankchimero.com)** — solo writer/designer. Uses **National 2 from Klim Foundry** for body per his own redesign essays (he explicitly rejected Avenir and Basis Grotesque on his way to Klim). Premium signal: paid foundry typography is the credibility hit. Leans editorial.

**Naval Ravikant (nav.al)** — serif-led, pure white, no homepage chrome — the index of writing IS the homepage. Premium-as-refusal.

**Cap Watkins (capwatkins.com)** — opens with a paragraph of plain prose, no nav fanfare. "I don't need to perform design at you."

**Rauno Freiberg (rauno.me)** — Staff Design Engineer at Vercel. Site styled as an operating system with a dock and interface sounds. Premium signal: every detail is a craft demonstration. Leans dark-mode-killer with horizontal scrolling. *Too dev-Twitter for Micah's primary audience but worth noting for the recruiter audience.*

**Bozoma Saint John (bozomasaintjohn.com)** — vertical word-stack hero ("THE / C-SUITE / FRACTURED / REBELLIOUS / OBEDIENT / URGENT / SURVIVOR / FAITHFUL / WIFE / SISTER / DAUGHTER / LOVING / DISRUPTOR / IMMIGRANT / WIDOW / URGENT / LIFE"), custom signature-as-logo, tight B&W portraiture. *This is the move that proves a Black founder can use bold typographic personality without becoming corporate-LinkedIn or memoir-precious.*

**Maya Man (mayaontheinter.net)** — net-art editorial, vanity TLDs (.rodeo, .dance, .lol) for each project. Premium because it refuses agency polish. Whitney/V&A exhibition credentials.

**Aurora James (aurorajames.com)** — memoir/author hub for *Wildflower*; editorial portraiture, naturalistic palette tied to the book cover. Leans editorial memoir.

**Pyer Moss / Kerby Jean-Raymond (pyermoss.com)** — luxury fashion ecommerce that behaves like an editorial film release. The site itself aggressively blocks bots (a premium signal — it refuses to be scraped). Display-serif/sans contrast.

### Tier 4: Client Sites These Agencies Built (B2B / service translation)

- **Snapchat (Clay)** — Clay's case study: "balancing brand identity, user-centric functionality, and forward-thinking design."
- **Art Bridges Foundation (Clay)** — "artwork first" approach; serif + sans pairing tuned for accessibility.
- **Nike SNKRS web (Instrument)** — stripped-back product-first commerce; "create a streamlined site that stripped back everything but the shoes."
- **Slack (MetaLab, 2013)** — the canonical "video-game color scheme on a B2B product" move.
- **IBM watsonx (Buck)** — "AI models can produce infinite outcomes from a singular idea... how they're trained and tuned brings focus."
- **Cartier "Above the Clouds" (Immersive Garden)** — luxury campaign as cinematic destination.
- **Daylight (basement.studio)** — "high-performance, story-driven website that cut through the noise... sold out inventory in hours."
- **The Roger / Den of Wolves (North Kingdom)** — CSS Design Awards–tier game-launch experiences.

**The pattern in client work**: the agencies that operate at Clay tier translate that aesthetic into client B2B/service sites by **subtracting motion, holding the typography discipline, and increasing the editorial calmness**. The Snapchat or Art Bridges or watsonx site is never as motion-heavy as the agency's own site. The lesson for Micah: a solo consultant can credibly inherit the agency aesthetic by going closer to "client-translated Clay" than to "Clay's own home."

---

## 3. The Premium-Signal Pattern Library (2026)

What actually reads "premium and expensive" without saying it, distilled from the tear-down:

1. **Paid-foundry type, even if only one weight.** Klim, Commercial Type, Pangram Pangram, ABC Dinamo, Grilli. The cost is ~$200–$600 for personal use and it shows. Google Fonts is fine for body if the display face is paid.
2. **One accent color, used with confidence.** Active Theory's #A970FF violet, basement.studio's #FF4D00 orange, April Dunford's orange. Two accents is one too many.
3. **One real portrait, treated like a film still.** Not a LinkedIn headshot, not a cartoon avatar. The portrait is the trust signal.
4. **A short, opinionated voice.** "We make cool shit that performs" (basement). "We don't want to grow at this in the first couple of years" (Anton & Irene). Micah's voice already runs in this register.
5. **Tight IA — five pages or fewer.** Clay, Locomotive, basement, Active Theory all run ~5 pages.
6. **Project pages that commit to a single visual world per project.** Immersive Garden's Cartier vs Dior look different; Buck's IBM vs Notion look different. Each case study has its own art direction.
7. **No press-clipping clutter.** Top agencies show one or two awards/quotes max, in passing. They never run an "As Seen In" carousel.
8. **A contact form that respects the visitor.** Two or three fields, conversational copy, a real reply guarantee. No "select your budget range" dropdown.
9. **Performance budget visible.** Active Theory hits 1.3s LCP with WebGL. The premium signal isn't speed for its own sake; it's that nothing feels janky.
10. **A signature interaction.** Locomotive's "letter shuffle + pixel lazy load." Active Theory's hover-trailer. basement's GSAP physics. Pick one. Just one.
11. **Restraint with motion.** Locomotive themselves: "We avoided excessive animations and gadgets to convey only the essentials while maintaining the fun and playful spirit." This is the 2026 line.
12. **Dark backgrounds for cinematic moments, not for the whole site.** The 2026 evidence is consistent — Active Theory, Locomotive case studies, Anton & Irene, Pyer Moss all use dark for the immersive sections. But agency homepages have moved toward warmer, lighter foyers.

---

## 4. The Chosen Direction — **"HOUSE LIGHTS"**

**One paragraph of mood.** The site has two rooms. The foyer is warm — cream paper, copper accent, a single tall portrait of Micah at a window in Oakland, body type that reads like a considered letter rather than a brochure. You meet him here. When you click into a piece of work, the lights dim. The page transitions to a dark theater: near-black ground, warm off-white type, the project's product stills lit like film frames. You stay in the theater for the length of the case study. When you leave, the foyer lights come back up. The metaphor is the gesture: this is a person who knows when to welcome you in and when to step back and let the work be the show. It is Black operator gravity, not agency flash; cinematic, not corporate.

### 4a. Typography pairing

**Primary (paid path, recommended):**
- **Söhne Buch (Klim Type Foundry)** for display and body. One typeface family, three weights (Buch / Kräftig / Halbfett). License is ~USD 350 for self-hosted single-site.
- **Tiempos Text (Klim)** for pull quotes and case-study deks. Two weights (Regular, Regular Italic). ~USD 250.

**Open-source fallback (use if budget is the issue) — SELECTED FOR LAUNCH:**
- **Inter Display** for headlines, **Inter** for body (free, paid-look at every weight).
- **Source Serif 4** for deks and pull quotes (free, Adobe Foundry).

**Banned this round (because they appeared in failed attempts or are overdone):** Berkeley Mono, Geist Mono, JetBrains Mono, PP Editorial New, Söhne Mono, IBM Plex Mono, Founders Grotesk, Neue Haas Grotesk Display, Domaine. No monospace anywhere on the consulting site. None.

### 4b. Color tokens

| Token | Hex | Use |
|---|---|---|
| `foyer.paper` | `#F5EFE4` | Foyer (Home/About/Work With Me/Contact) page background |
| `foyer.ink` | `#1A1816` | Foyer body and headline text |
| `foyer.ink-soft` | `#3A3631` | Foyer secondary text |
| `theater.ground` | `#0D0D0F` | Case study page background |
| `theater.surface` | `#16161A` | Cards and elevated panels in case study |
| `theater.ink` | `#EAE6DD` | Case study body type (warm off-white, not stark) |
| `theater.ink-soft` | `#9C988F` | Case study secondary text |
| `accent.copper` | `#C8542B` | Single accent across both modes — links, CTAs, underline lifts |
| `accent.copper-deep` | `#8E3A1E` | Pressed / focus states for copper |
| `ordani.sage` | `#5E7158` | Used ONLY inside the ORDANI case study — never anywhere else |
| `rule.foyer` | `#D9D2C4` | Hairline rules in foyer mode |
| `rule.theater` | `#2A2A30` | Hairline rules in theater mode |

The copper #C8542B is deliberately NOT the clay terracotta of Attempt 2. It is more saturated, leans red rather than orange-pink, and sits closer to oxidized copper than to pottery — it reads as metal, not earth. It is the only color that crosses the foyer/theater boundary.

### 4c. Photography / image direction

- **One excellent portrait** of Micah, shot in available light at an Oakland location (his actual workspace, a window, a doorway). B&W or warm full color, photographed by a working portrait photographer, not a phone selfie. Budget: $500–$1,200 for a 2-hour session. This is the single highest-leverage visual investment.
- **ORDANI product stills**: dashboard screenshots placed on the dark theater ground with 2px warm off-white inner border and a subtle 4% film-grain overlay. Each one is captioned like a film still ("Doula intake flow, March 2026").
- **No stock**. No illustration. No 3D. No icon kit. Anything that isn't a photograph or screenshot is type.

### 4d. Motion language

- **Page transitions**: View Transitions API for entering a case study from the foyer. The foyer paper recedes, theater ground rises. ~600ms ease-in-out. This is the signature.
- **Scroll**: Lenis smooth scroll with a damping of ~0.08 (light, not buttery). Confirmed industry standard from basement.studio's stack.
- **Choreography**: GSAP ScrollTrigger for one move per page — the title card pin-and-resolve described below. No more.
- **Hover**: copper underline that lifts 4px on links, 200ms cubic-bezier(0.2, 0.8, 0.2, 1). Buttons get a 1px copper border that thickens to 2px on hover, no fill change.
- **Cursor**: native. No cursor follower. (Already dated as of mid-2025.)
- **Loading**: a brief 300ms type-set animation on first paint of the home headline. After that, no loaders.

### 4e. Grid / layout

- 12-column grid, 80px max gutter desktop, 16px mobile.
- Max content measure: 68ch for body, 28ch for sidenotes.
- Vertical rhythm tied to a 4px base, 8px increments for spacing.
- Generous top/bottom page padding — 128px desktop, 64px mobile. The cream of the page should breathe.

### 4f. The signature move — "The Title Card"

Each case study opens with a vertical word-stack of three to six words, set in Söhne Halbfett at 96px, that name the kind of work this was — borrowed in spirit from Bozoma Saint John's hero word-stack but recast as a chapter-card device:

```
ORDANI
─────────
INTAKE.
SECURE.
SHIPPED.
```

The stack pins for ~600ms as you scroll, then resolves into a smaller caption ("ORDANI — A HIPAA-compliant CRM for birth workers. Solo build, Next.js + Supabase. Private beta with 14 doulas.") while the first product still fades in below. This title card is the ONE motion move that signs the site. It also operates as the page's social card / Open Graph image.

---

## 5. Why "House Lights," Not Clay-Clone

| Borrowed from Clay-tier | Diverged for Micah |
|---|---|
| Disciplined two-typeface system | Foyer/theater split (Clay is single-mode) |
| Cinematic case-study production values | Foyer is warm-cream, NOT all dark (most Clay-peers are uniformly dark or uniformly light) |
| Five-page IA | Pages are weighted toward TWO long pages (Home, ORDANI) plus three short ones |
| Single confident accent color | Copper #C8542B is not in any of the named agency palettes |
| Real portrait as trust signal | Portrait of a Black founder in Oakland is the literal identity — not a stock founder shot |
| Single signature motion move | The Title Card is borrowed from Bozoma Saint John's word-stack hero, not from any agency |
| Senior-team-led tone | Refactored as "operator who ships" tone, no "we" inflation |
| Editorial pull quotes in serif | Tiempos used sparingly; never PP Editorial New (which was Attempt 2's failure mode) |

The divergences add up to a site that reads as Micah's specifically because:
- A solo Black founder gets to walk an arriving visitor into a *warm room* first (the foyer) and only then show the cinematic work (the theater). The agency convention is to drop the visitor directly into the show. Micah's convention is hospitality, then craft.
- The copper is not Attempt 2's earth-terracotta and not Active Theory's violet and not basement's orange. It's metallic, oxidized — a builder's metal. The brand association is "this person works with their hands" without saying it.
- The Title Card is the only motion move; the rest of the site is very still. This is the inverse of Clay (cinematic everywhere) and the inverse of Naval (still everywhere). It earns its motion by spending it once.

---

## 6. Final Information Architecture

Five pages. No blog. No "Now." No "Uses." No colophon.

1. **Home** — Foyer mode. Hero portrait, positioning sentence, three-case selected work strip, About teaser, Work With Me teaser, Contact CTA. ~1,200 words of content.
2. **Work** — A simple index page (foyer mode) that previews each case study with a Title Card thumbnail. Clicking enters the theater.
3. **Case Studies** (`/work/ordani`, `/work/hr-equity-author`, `/work/passioneer`, `/work/akamai`, etc.) — Theater mode. One per project. Long-form. Each ~1,500–2,500 words plus stills.
4. **About** — Foyer mode. Two-column long-form. Photo, story, work history, family/Oakland context. ~600 words.
5. **Work With Me** — Foyer mode. Three engagement shapes (Strategy Sprint, Embed, Build), pricing or scope language without quoting numbers, and a short FAQ. ~500 words.
6. **Contact** — Foyer mode. Two-field form (name, what you're working on). Single email link as alternate. Two-business-day reply commitment.

(Counting Work index + Case Study template as one IA unit, this is five page types.)

---

## 7. Page-by-Page Wireframes

### Home (Foyer)

```
[NAV: MICAH JONES   ·   work   about   work with me   contact]

──────────────────────────────────────────────
[HERO]
   I help operators ship the work
   the rest of their org keeps
   stalling on.

   ── micah jones, oakland.
   product · growth · solutions.

   [↘ scroll]
──────────────────────────────────────────────
[PORTRAIT FULL-BLEED]
   single tall portrait, copper rule below
──────────────────────────────────────────────
[SELECTED WORK STRIP — three cards]
   01  ORDANI            HIPAA CRM for birth workers
   02  HR EQUITY AUTHOR  algorithm + content system
   03  PASSIONEER        AI content platform
   → all work
──────────────────────────────────────────────
[ABOUT TEASER — two columns]
   Left: 100-word about excerpt
   Right: photo of Micah at desk
   → about
──────────────────────────────────────────────
[WORK WITH ME TEASER]
   Three engagement shapes, one line each
   → work with me
──────────────────────────────────────────────
[FOOTER]
   contact · email · two-day reply promise
──────────────────────────────────────────────
```

Motion notes: the portrait fades in 200ms after the headline pins. The selected-work strip cards lift 2px on hover. No parallax. No scroll-jacking.

### ORDANI Case Study (Theater)

```
[NAV INVERTED — copper on theater ground]

[TITLE CARD — pinned ~600ms]
   ORDANI
   ─────
   INTAKE.
   SECURE.
   SHIPPED.

[DEK — Tiempos]
   A HIPAA-compliant CRM for birth workers.
   Solo build. Next.js + Supabase.
   14 doulas in private beta.

[HERO STILL — full-bleed dashboard, film-grain]

[PROBLEM]
   Birth workers run their whole practice
   out of group chats, paper intakes,
   and Google Docs. HIPAA is impossible
   without infrastructure no one ships
   for this market.

[WHY IT MATTERS]
   Doulas and midwives mostly serve
   Black women, who die at 44.8 per
   100,000 live births in the U.S. —
   roughly 3.15 times the rate for
   non-Hispanic white women (14.2),
   per the CDC's 2024 Maternal
   Mortality Rates release.

[APPROACH — four sub-sections]
   01  Talked to 22 birth workers before
       writing a line of code.
   02  Designed the intake as a single
       progressive flow, not a form wall.
   03  Built encryption at the row level
       in Supabase RLS, audited the policy
       with two security reviewers.
   04  Shipped it to a closed beta of
       fourteen practitioners.

[WHAT IT BECAME — stills + captions]

[OUTCOME]
   14 active practices, average 12 clients
   each. First HIPAA-compliant CRM
   purpose-built for the doula market.

[PULL QUOTE — sage, Tiempos italic]
   "It is the first piece of software
   that treats my practice the way I
   treat my clients."
   — beta user, name withheld

[NEXT WORK ↘]   [BACK TO FOYER ↗]
```

Motion notes: title card pins on entry. Stills cross-fade 1s on scroll into view. Pull quote has a 2-second copper underline-grow on enter.

### About (Foyer)

```
[HERO LINE]
   I build the things I used to ask
   other people to build.

[TWO COLUMN]
   LEFT (8 col):
   Long-form about — 150 words, see §8.

   RIGHT (4 col):
   Vertical portrait
   Sub-caption: Oakland, CA.
   Two-line credit list:
     guardicore/akamai · flexport ·
     surveymonkey · cuebiq

[FAMILY / OAKLAND CONTEXT — single para]
   One short paragraph. Lives in Oakland.
   Father. Builds at night.

[VALUES — three lines, no header]
   01  ship the work
   02  trust the operator
   03  show the receipts
```

### Work With Me (Foyer)

```
[HERO LINE]
   Three ways to work.
   One of them probably fits.

[THREE ENGAGEMENT CARDS — stacked, not grid]

   01  STRATEGY SPRINT
       2–4 weeks. One deliverable.
       Positioning, growth audit, or
       launch plan. Best for solo
       operators who need a second
       brain for a fortnight.
       — starts at [scope range]

   02  EMBED
       8–12 weeks. I sit inside the
       team as a fractional PM /
       growth / solutions partner.
       Two days a week. Best for
       3–10 person teams.

   03  BUILD
       Custom. I design and build
       the thing — usually a CRM,
       intake system, or onboarding
       flow. Next.js, Supabase,
       Vercel.

[FAQ — four questions]
   How much do you charge?
   Do you take equity?
   Will you sign an NDA before talking?
   What if I am not technical?

[CTA]
   → contact
```

### Contact (Foyer)

```
[HEADER]
   Tell me what you are working on.
   I read every message and reply
   inside two business days.

[FORM — two fields]
   Your name
   What you are working on
   [→ send]

[BELOW FORM]
   Or email me directly:
   hello@micahjonesconsulting.com
```

No phone. No Calendly link in the first volley. No newsletter sign-up. The conversation starts in email.

---

## 8. Copy and Voice

### Final positioning sentence

> Micah Jones is an Oakland-based operator who builds the systems other people promise to build, and ships them.

### Final hero copy (Home)

> I help operators ship the work the rest of their org keeps stalling on.

> — product · growth · solutions. Oakland, CA.

### Final about paragraph (150 words)

> I'm Micah. I started as a positioning researcher at Guardicore (acquired by Akamai), where the work I did on a single message moved the average deal size up by $150K. I've worked at Flexport, SurveyMonkey, and Cuebiq. Now I run my own shop in Oakland — half consulting, half product. The consulting half means a small number of operators every quarter: HR consultants, nonprofit leaders, birth workers, creators. The product half means ORDANI, a HIPAA-compliant CRM I built solo for the people who keep Black women alive in childbirth. I'm a Black founder, a father, and someone who would rather show you a working thing than a slide about a working thing. Most of my best work happens at night, after the house goes quiet. If you have something that needs shipping and you're tired of the meeting tax, write to me.

### Case study writing framework

Each case study runs in five movements:

1. **Title Card** — three to six words, stacked.
2. **Dek** (one line in Tiempos) — what it is, what it ran on, what shipped.
3. **Problem** (1 paragraph) — what was broken in the world.
4. **Why it matters** (1 paragraph) — for whom, and at what cost.
5. **Approach** (4 numbered subsections) — what Micah did, in order.
6. **What it became** (stills with captions).
7. **Outcome** (numbers, named).
8. **Pull quote** (one, real, attributed even if "name withheld").

### Voice rules

- Short sentences. Subject + verb + object.
- "The work" is a noun. "Ship" is the dominant verb.
- "Operator" is the role Micah occupies and the role he respects in others.
- Specific numbers. ($150K, 14 practices, 8 weeks.) Never "significant impact."
- Dry humor at the joints. Never inside the work itself.
- The voice can say "Black" plainly. It does not perform Blackness, and it does not hide it.
- First person. Never "we" if it's just Micah.

### Banned list (top 9)

1. "Drive" (as in "drive results")
2. "Unlock"
3. "Synergy" / "synergize"
4. "Best-in-class"
5. "Game-changing"
6. "Transformative" / "transformational"
7. "Leverage" (as a verb)
8. "Elevate" / "elevated"
9. "At the intersection of"

---

## 9. ORDANI Case Study — Full Draft

```mdx
---
title: ORDANI
dek: A HIPAA-compliant CRM for birth workers. Solo build. Next.js + Supabase. 14 doulas in private beta.
role: Solo — research, design, build, ship
tools: Next.js, Supabase, Vercel, Tailwind, Resend
year: 2025–2026
status: Private beta
---

# ORDANI
## INTAKE. SECURE. SHIPPED.

A HIPAA-compliant CRM for birth workers. I built it alone, on Next.js and Supabase, and 14 doulas use it every day in private beta.

## The problem

Birth workers — doulas, midwives, perinatal counselors — run their whole practice on group chats, paper intakes, and Google Docs. HIPAA is the law. Compliance is impossible without infrastructure that no software vendor has shipped for this market. So practitioners either break the law, pay $200 a month for software designed for dentists, or hand-roll a system that breaks the first time a client churns.

## Why it matters

In the United States, non-Hispanic Black women die from maternal causes at 44.8 per 100,000 live births — roughly 3.15 times the rate of non-Hispanic white women (14.2) — per the CDC's *Maternal Mortality Rates in the United States, 2024* release. Doulas and midwives — disproportionately Black women themselves — are one of the most evidence-supported interventions against that gap. The data they collect on their clients is sensitive, high-stakes, and almost never properly protected. The market hasn't shipped for these workers because the market doesn't see them. I see them. So I shipped.

## Approach

**01. I talked to 22 birth workers before writing a line of code.**
Across four weeks of unpaid conversations. I asked what they used now, what they hated about it, what they'd never give up, and what they'd pay for. Three patterns emerged: every practitioner had been hacked or scared into thinking they had been; nobody wanted a "platform"; everybody wanted intake to stop being the thing that ate their Sundays.

**02. I designed intake as one progressive flow, not a form wall.**
Existing tools dump fifteen pages of medical forms on a pregnant person at 1 a.m. I built a single conversational flow that adapts to the practitioner's preferences and saves on every step. Intake completion went from a self-reported 40% in beta-zero to a measured 91% in beta-one.

**03. I built encryption at the row level inside Supabase RLS, then I paid for two security reviews.**
Row-level security policies are the difference between a CRM that says "HIPAA-compliant" on the homepage and one that actually is. I wrote the policies, then I hired two outside security reviewers — one who specializes in healthcare, one who specializes in Postgres — to break them. They did, twice. Then they didn't.

**04. I shipped to a closed beta of fourteen practitioners.**
Free for the first year in exchange for weekly feedback calls. Eight of them are still active after six months. Six have referred a peer. Zero have churned to a competitor.

## What it became

[STILL: intake flow, captioned: "The intake — one screen, not fifteen."]

[STILL: client dashboard, captioned: "What a doula sees on a Tuesday morning."]

[STILL: encryption audit log, captioned: "Every read is logged. Every export requires a reason."]

## Outcome

Fourteen active practices. Average twelve clients each. The first HIPAA-compliant CRM purpose-built for the doula market. A paid beta opens in Q3.

> "It is the first piece of software that treats my practice the way I treat my clients."
> — beta user, name withheld
```

---

## 10. Anonymized "HR Consultant and Author" Case Study — Full Draft

```mdx
---
title: An HR consultant and author specializing in organizational equity
dek: Algorithm strategy + multi-platform content system. RFP wins. 25+ page playbook. Two named platforms outperformed the third by 4x.
role: Strategist + ghostwriter
tools: TikTok, Instagram, YouTube, LinkedIn, X, Notion
year: 2024–2025
status: Ongoing engagement
---

# AN HR CONSULTANT AND AUTHOR
## REACH. RFP. RETAINER.

I built the algorithm strategy and content system for an HR consultant and author specializing in organizational equity. The playbook ran to 25+ pages. Two platforms outperformed the third by 4x. RFP wins followed.

## The problem

A respected author and HR consultant had a body of work that mattered, a serious audience that wanted more of it, and zero infrastructure to convert either into pipeline. The content was being shipped reactively — one post here, one talk there. Reach was flat. RFP responses depended on a single newsletter list.

## Why it matters

Equity work is one of the most attacked categories of consulting in the United States right now. A consultant in this space either becomes algorithmically resilient — distributed across enough platforms that no single deplatforming or DEI rollback kills their pipeline — or they become quiet. I am uninterested in helping any of these consultants become quiet.

## Approach

**01. I built a 25-page algorithm strategy document.**
Platform-by-platform: TikTok, Instagram, YouTube, LinkedIn, X. Not "post more." A weekly cadence, a content-pillar map, a measurement frame, and a list of exactly which experiments to run in the first 90 days. Written so the consultant could hand it to a content lead and have them execute without supervision.

**02. I picked two platforms to overinvest in and one to underinvest in, on purpose.**
LinkedIn and one short-form platform got the weekly cadence. The other short-form platform got a monthly cadence on purpose, because the audience overlap with the high-value RFP buyers was thin. Two platforms outperformed the third by 4x within five months, exactly per plan.

**03. I built the RFP response system in parallel.**
Three templates, a content library tied to common buyer questions, and a one-page positioning sheet that gets attached to every response. RFP win rate improved meaningfully (specifics protected by NDA).

**04. I handed it off, and stayed on retainer for ongoing strategy.**
The work is not "I'm the agency now." The work is "you have the system, I'm the second brain on call when the platforms change."

## Outcome

Two platforms outperforming a third by 4x. RFP wins on retainer-scale engagements. A consultant who is no longer worried about one platform's bad day taking out their whole funnel.

> "Micah does the work that most strategy decks promise and never deliver."
> — client
```

---

## 11. Tech Stack

One recommendation per choice. Practical.

- **Framework**: Next.js 15 App Router. Already Micah's tooling.
- **Hosting**: Vercel.
- **CMS**: MDX files in the repo. No headless CMS. Five pages and a handful of case studies do not need Sanity or Contentful.
- **Database**: None on the marketing site. Contact form posts to Resend + a Supabase table for archive.
- **Styling**: Tailwind v4 with a small custom theme exposing the color tokens above.
- **Type**: Söhne (Klim) self-hosted via `next/font/local`, with `next/font` for Tiempos. **OPEN PATH SELECTED FOR LAUNCH: Inter Display + Inter + Source Serif 4 via `next/font/google`.**
- **Motion**: `framer-motion` for component-level enter/exit, `gsap` only for the Title Card pin, `lenis` for smooth scroll. View Transitions API for foyer→theater route transitions.
- **Image**: `next/image` with WebP/AVIF; portrait shot served at 2x for retina.
- **Analytics**: Vercel Analytics + one custom event for case-study read-time. No Mixpanel, no Segment.
- **Email**: Resend for transactional reply confirmations. Personal Gmail / Fastmail for the actual inbox.
- **WebGL/3D**: **None.** The signature move is the foyer→theater transition and the Title Card pin. WebGL would dilute the gesture, blow up the bundle, and read as production-flex for an audience that doesn't reward it.

---

## 12. Build Plan for Claude Code

### CLAUDE.md (target: ~250 words, not 1,500)

```markdown
# CLAUDE.md — micahjonesconsulting.com

## What this is
A Next.js 15 marketing site for Micah Jones. Five pages, MDX case studies, two modes: foyer (warm cream) and theater (dark cinematic).

## Stack
- Next.js 15 App Router, TypeScript strict
- Tailwind v4 with `@theme` block in `globals.css`
- next/font/google for Inter Display + Inter + Source Serif 4
- Framer Motion for component motion; GSAP only inside `<TitleCard />`
- Lenis for smooth scroll; View Transitions API for foyer↔theater routes
- MDX via `@next/mdx` for case studies in `content/work/*.mdx`
- Resend for contact form

## House rules
- No monospace. No code-as-aesthetic. No "spec sheets."
- No dark mode toggle. Mode is route-based: foyer routes light, /work/* dark.
- One accent color: `accent.copper` (#C8542B). One exception: `ordani.sage` (#5E7158) inside /work/ordani only.
- One signature motion: `<TitleCard />`. Nothing else pins or sticks on scroll.
- All copy passes the banned-words list in `lib/copy-lint.ts`.
- Performance: LCP < 1.8s on Vercel; case studies must lazy-load all stills below the fold.

## Content
- `content/work/*.mdx` — case studies. Frontmatter required: title, dek, role, tools, year, status.
- `content/site.ts` — global copy (nav, footer, positioning sentence).

## Definition of done
A page is done when (1) the Title Card holds for 600ms on entry, (2) Lighthouse Performance ≥ 95 on mobile, (3) the foyer-to-theater transition is visible in DevTools as a single View Transition, (4) zero banned words from `lib/banned.ts` appear in MDX.
```

### Custom skills (only two, both genuinely useful)

1. **`copy-lint`** — a tiny TypeScript module that scans every MDX file at build time for the banned words list and fails the build with line numbers. Lives in `lib/copy-lint.ts`, runs via a Next.js `instrumentation.ts` hook.
2. **`title-card`** — a reusable React component that takes a 3–6 word array and produces the pinned vertical word stack with GSAP. Used in every case study and in the home hero. Lives in `components/TitleCard.tsx`.

No other skills. No "ship.sh" wrapper. No "deploy preview" Slack bot. No "design token sync."

### Phased timeline (14 days, realistic)

- **Day 1**: Repo setup, Tailwind theme, color tokens, font loading, base layout with foyer/theater route groups.
- **Day 2**: Nav and footer in both modes. View Transition handler.
- **Day 3**: `<TitleCard />` built and tested standalone.
- **Day 4**: Home page — hero, portrait slot, selected-work strip.
- **Day 5**: About page.
- **Day 6**: Work With Me page.
- **Day 7**: Contact page + Resend integration.
- **Day 8**: Work index page (foyer).
- **Day 9–10**: ORDANI case study MDX + stills.
- **Day 11**: HR Equity Author case study MDX (anonymized).
- **Day 12**: Passioneer + Guardicore/Akamai shorter case studies.
- **Day 13**: Performance pass — LCP, image optimization, font subsetting.
- **Day 14**: Copy lint pass, accessibility pass (contrast, focus states, reduced-motion), shoot a portrait if not already done.

---

## 13. Anti-Patterns (refuse)

- **No monospace fonts anywhere.** Berkeley Mono, Geist Mono, JetBrains Mono — none. Mono is the Attempt 1 tell.
- **No PP Editorial New, no "warm paper studio" framing.** That was Attempt 2.
- **No "Now" page, no "Uses" page, no colophon, no "decision log," no live BART status, no telemetry panel.** Dev-Twitter tells.
- **No cursor follower.** Dated as of mid-2025.
- **No client logo wall.** Micah doesn't have the consent to show client names on every project; the ones he does have (Akamai, Flexport, etc.) sit inside the About credit list, not on the home as a logo carousel.
- **No "trusted by" social proof bar.** It always reads as filler from solo operators.
- **No newsletter signup in the navigation.** If a newsletter ever exists, it lives at the bottom of About, not at the top of every page.
- **No "select your budget range" dropdown** on the contact form. Two fields, a real reply.
- **No 3D, no WebGL hero, no Three.js, no Spline.** Wrong budget, wrong audience.

---

## 14. The 10/10 Bar

What separates premium from "good v0 output":

1. **The portrait is real, and it's good.** A v0 site has a stock photo or no photo. A 10/10 site has a single $1,000-grade portrait.
2. **The type is paid.** A v0 site uses Inter exclusively. A 10/10 site has Söhne or equivalent self-hosted from a real foundry. *(Compromise: Inter Display + Inter + Source Serif 4 selected as best-in-class free pairing; document upgrade to Söhne+Tiempos as v2.)*
3. **The motion is restrained to one signature move.** A v0 site animates everything. A 10/10 site animates one thing, perfectly.
4. **The case studies have a point of view.** A v0 case study lists what was built. A 10/10 case study makes the case for why it mattered, and is willing to be wrong out loud.
5. **The voice is one person's.** A v0 site reads as ChatGPT. A 10/10 site has cadence, opinion, dry jokes, named numbers.
6. **Performance is not the constraint, it's the floor.** A v0 site is slow because it doesn't care. A 10/10 site is fast because nothing else would feel honest.
7. **It survives a screenshot.** A v0 site looks like a screenshot competition entry. A 10/10 site looks better in motion than as a still — which is the actual web.
8. **The foyer/theater shift feels intentional.** A v0 site has one mode. A 10/10 site uses mode as language.
9. **The mobile experience is not a compromise.** A v0 site stacks. A 10/10 site re-composes — the Title Card still pins on mobile, the portrait reflows to a tighter crop.
10. **A primary-audience visitor — a Black HR consultant, a doula, a birth worker — feels welcomed in the first ten seconds.** That is the only test that matters. Everything else is a means to that end.

---

End of blueprint.
