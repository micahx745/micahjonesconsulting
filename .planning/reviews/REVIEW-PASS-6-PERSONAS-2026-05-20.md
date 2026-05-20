# Color Worlds — Adversarial Review, Pass #6 (Multi-Persona Walkthrough)

**Date:** 2026-05-20
**Reviewer:** Claude (Opus 4.7), running in Cowork
**Deploy audited:** `https://micahjonesconsulting.vercel.app` at commit `0b3ea31` (Phase B Ordani sticky-scroll)
**Production canonical (`www.micahjonesconsulting.com`):** still pointing at the v0.dev "v0 App" project from Pass #5. Apex 308s to www; www serves `<title>v0 App</title>` and 404s on every subpath. Brief instructs to flag-and-skip — flagged. Every persona below walks the **preview deploy**, not the canonical.

Before walking the personas: the headline blocker every persona hits is the same — **on the preview deploy as of 0b3ea31, the home page's H1 ("I BUILD THE [product./pipeline./launch./system.]") never appears.** The hero renders as an empty terracotta field with only the wordmark, subhead, and CTA. Verified via DOM inspection — the `.cw-h1 .cw-line > span` elements have inline `style.transform = "translateY(0px)"` set by the Hero useEffect's rAF callback, but `getComputedStyle(...).transform` still reports `matrix(1, 0, 0, 1, 0, 185.407)` — i.e., translated ~185px below their `overflow: hidden` line container and clipped. The CSS rule `[data-mode="cw"].cw-js-reveals .cw-h1 .cw-line > span { transform: translateY(110%); }` is fighting the inline reset and winning. Six seconds after navigate, the H1 is still invisible. Setting the inline transform manually in the console restores it instantly. This bug is the dominant variable in every persona walkthrough below — half of them never get past the hero because of it.

---

# Part A — Per-persona walkthroughs

## Persona 1 — Riley (the 5-second scanner)

**First impression.** "Pretty color, where's the text?"

**Path walked.** `/` only. 8 seconds before bouncing. Phone, scrolling thumb-up reflex within 3 seconds because the first screen is "MICAH//JONES" (small, top-left, mix-blend-mode washed) + a vast empty terracotta field + tiny subhead + dark button. No headline. No claim. Riley's flick-scroll catches one rolling-word "product." mid-cycle, momentarily readable, then it's gone.

**Where they nodded.** Nowhere. The 5-second test requires Riley to parse a value prop in the first viewport, and the H1 — the literal value prop — isn't on the page. The CTA "See how I work ↓" is alone in space, dark on dark, doesn't suggest urgency. The subhead "Strategy and software, shipped by the same pair of hands" is two text lines floating in the lower-left quadrant. Too quiet for a portfolio first paint.

**Where they cringed / bounced.** The whole first paint reads like a half-loaded page. Riley bounces in 8 seconds because the screen feels broken, not because the work is uninteresting. The terracotta is rich and the wordmark is sharp — they don't get to disagree with the design, they get to disagree with the loading.

**One sentence Riley would tell a peer.** "Some Oakland consultant's site that looked half-loaded — couldn't tell what he did."

**Would they scroll past the hero?** ~30% would. The 70% who don't would either reload, hit back, or pinch-zoom suspecting a font failure. Of the 30% who keep going: they encounter the marquee, the Clients section ("STRATEGY THAT SHIPS, NOT SLIDES." rendering correctly once stationary), the count-up "$17M+ IN REVENUE" → "Two exits. Guardicore → Akamai · TechValidate → SurveyMonkey" — finally a hook. **If Riley scrolls past the broken hero, they convert at normal rates.** The blocker is the first 5 seconds, not the rest.

---

## Persona 2 — Sandeep Kumar (the skeptical CTO buyer)

**First impression.** Skipped the home; pasted the URL, typed `/about` immediately because that's where receipts live. So Sandeep never sees the H1 bug. Lucky break for the site.

**Path walked.** `/about` (~75 sec) → `/work/guardicore` (~55 sec) → `/work/ordani` (~3 min) → footer "Book a call ↗" → Calendly intent (didn't actually book, copied the URL to send to himself for later). Total ~6 minutes.

**Where Sandeep nodded.**
- `/about`, third bullet under "Receipts": *"Engagements with Guardicore, TechValidate, Flexport, Cuebiq, Postmates."* Five specific names, no fluff. Two of those companies he can verify the exits on (Akamai $600M for Guardicore in 2021; SurveyMonkey acquired TechValidate in 2015). He runs a quick mental cross-check; the dates and acquirers match.
- `/work/ordani` "Approach" bullet 03: *"I built encryption at the row level inside Supabase RLS, then I paid for two security reviews. ... I hired two outside security reviewers ... They did, twice. Then they didn't."* This is the sentence that flips Sandeep from "skeptical" to "interested." Someone who pays for adversarial security review out of their own pocket and tells the truth about the first round failing — that's the signal he's been hunting for.
- `/work/ordani` bullet 04: *"Eight of them are still active after six months. Six have referred a peer. Zero have churned to a competitor."* Concrete retention. The "zero have churned to a competitor" is honest about a small N without hand-waving.

**Where Sandeep cringed.**
- `/work/ordani` has **three empty image placeholders** ("The intake — one screen, not fifteen", "What a doula sees on a Tuesday morning", "Every read is logged. Every export requires a reason") rendered as outlined gray rectangles with no images. Sandeep talks about row-level security and HIPAA compliance and then shows... blank frames. The case study claims a shipped product with 14 beta users; the lack of a single product screenshot makes him doubt the shipped claim slightly. He doesn't bounce, but his belief drops 15%.
- `/work/guardicore` is **285 words.** For a case study about an engagement that contributed to a $600M Akamai acquisition, that's catastrophically thin. The Ordani case study is 700+ words with specificity; the Guardicore case study reads like a placeholder. Sandeep's prior was the Guardicore story would be the receipts; instead Ordani is.
- Person LD description says *"Two exits at companies he helped build"* — about page agrees. Good. But the home rev tick says *"Two exits."* without context the moment Sandeep doesn't click into about. Bare claim absent receipts.

**One sentence Sandeep would tell a peer.** "Operator's bio reads honest, the Ordani case study is the real proof — I'd take a 30-minute call with him."

**Would Sandeep book?** Yes, eventually. Not on the first visit — he'd read the Ordani case study, then sleep on it, then come back next morning and click the Calendly link in the footer. The footer "Book a call ↗" actually delivers to Calendly now (per Phase A); the affordance no longer lies. Conversion likelihood: ~25% over a 2-week window.

---

## Persona 3 — Marcia Templeton (the senior peer designer)

**First impression.** "Oh no, it's broken." Marcia is the one persona who recognizes WHAT the broken hero IS at first sight — she's seen the line-reveal pattern before and watches for the rAF reset that should restore visibility. It doesn't. Her finger hovers over Cmd+Opt+I before she remembers she's reviewing, not debugging.

**Path walked.** `/` (scrolled all the way down — Marcia tests every motion beat) → opened DevTools, confirmed the hero spans have `transform: matrix(1, 0, 0, 1, 0, 185.407)` and `transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s` but no inline reset taking effect → reloaded with reduced-motion ON (also broken) → reloaded with JS disabled (this works — the H1 is visible without `cw-js-reveals` class) → returned to default → scrolled the Ordani sticky-scroll (the wow moment). Total ~9 minutes.

**Where Marcia nodded.**
- **Ordani sticky-scroll signature moment.** ORDANI scales 0.85→1.0 from low opacity, lede + form + footnote pin together as scrubbed timeline plays. This is the Apple/Vercel-tier move done well — no auto-scroll, scrub-only, motion serves the reveal not the ego. She'd send this single section to a colleague unironically. The ink-bleed SVG filter on the giant ORDANI word reads as pulp-ink, not pixel-text — exactly what the brief promised.
- **Footer SplitText reveal of "LET'S BUILD →".** Stagger feels right; the bricolage display weight earns the size; the magnetic CTA on "Book a call ↗" pulls smoothly without overshooting. Phase A landed.
- **World cross-fade.** The terracotta → bone → petrol → espresso transitions across section centers are exactly the move the brief described, no gimmick. Petrol on the Ordani section is the highest-trust color pairing on the site.
- **Texture stack.** Paper-fiber + ink-grain + halftone reads as a single material rather than three competing overlays. The chromatic aberration on display headlines is restrained enough to feel like print, not glitch.

**Where Marcia cringed / bounced.**
- **The H1 invisibility bug is unsurvivable.** Marcia knows what was attempted and watches it fail. The hero motion is the site's first impression of motion competence. Failing to render the H1 at all undermines the rest. If this was a portfolio sent to her for a hire review she'd close the tab.
- **Three section titles render mid-stagger on fast scroll** ("STRATEGY THAT SHIPS...", "PRODUCTS, NOT PITCHES.", "LET'S BUILD →"). On a moderate scroll, the chars catch with some at opacity 1 and some at 110% translation. By design — `once: true` + 0.85s timeline with 0.018s stagger means a fast scroller sees the partial state. Marcia would tune the stagger down to 0.008s or shorten the timeline duration so the visible "mid-state" window is < 200ms.
- **The mix-blend-mode wordmark goes teal-on-terracotta.** Inversion math sends white→teal on `#9E3C25`. Reads as a different brand on first paint until the user realizes it's supposed to be the negation. She'd test against the world palette and pin the wordmark to bone explicitly when on terracotta.
- **Engagement card hover-invert is currentColor.** When you hover, the card flips to `background: currentColor` and text to `var(--cw-bg)`. On espresso world that means bone background, espresso text — fine. But on bone world it'd be espresso bg, bone text — also fine. The hover state is more contrasty than the rest of the page, which makes the card feel like a button rather than a destination. Subtle, but on a site this restrained, the contrast jump on hover reads loud.

**One sentence Marcia would tell a peer.** "Ordani sticky-scroll is great. Tell him the hero is broken — wait, did you mean to send me a 404?"

**Would she share / recommend?** Not yet. The Ordani section alone she'd tweet, but only after the hero ships visibly. Right now she wouldn't recommend the site to a peer because the first thing they'd see is empty. After the hero fix lands: 70% chance she shares the Ordani sticky-scroll specifically.

---

## Persona 4 — Renée Beaumont (the magazine editor)

**First impression.** "There's no photograph."

**Path walked.** `/` (didn't scroll far — the empty hero made her think the page hadn't loaded fully, but she gave it another reload) → `/about` (read every word, twice — the second time looking for a quotable line) → `/work/ordani` (long read, ~4 minutes) → `/llms.txt` (she fetched it directly, curious) → back to `/about` looking for a portrait. Total ~12 minutes.

**Where Renée nodded.**
- Ordani case study, "Why it matters": *"In the United States, non-Hispanic Black women die from maternal causes at 44.8 per 100,000 live births — roughly 3.15 times the rate of non-Hispanic white women (14.2) — per the CDC's Maternal Mortality Rates in the United States, 2024 release. ... The market hasn't shipped for these workers because the market doesn't see them. So I shipped."* This is the paragraph she'd cite in her piece — load-bearing stat, named primary source, three-word closer that's earned by the buildup. It's the literary voice the brief promised.
- Ordani case study close: *"It is the first piece of software that treats my practice the way I treat my clients."* — beta-user pull-quote. Attribution is "beta user, name withheld" which Renée accepts; she'd want the name for citation but the discretion matches the regulated-industry context.
- About page lede: *"Most consultants don't ship. Most builders don't sell. I do both, on the same engagement, for the same fee."* — quotable, parallel, earns its own column-inch.
- The em-dash discipline. The site uses em-dashes sparingly across the about and case studies. After three years of every AI-written profile being em-dash-spammed, restraint reads as a human wrote this.

**Where Renée cringed.**
- **No photograph of Micah anywhere on the site.** Not on `/about`, not on `/`, not on any case study. The brief mentions a Phase 1 portrait booking that hasn't happened. For a profile piece, this is the dealbreaker — she needs a square crop of his face for the lead image, and the operator hasn't shipped one. She makes a mental note: ask his publicist. If there is no publicist, she has to commission a shoot, which delays the piece by 2-4 weeks. She might not run it.
- The case study still placeholders on `/work/ordani` — gray rectangles where screenshots should be. For a magazine reader, that's a visual void in what should be the most photographic section. (Empty rectangles in print are space; empty rectangles on web are bugs.)
- About page "Where to find me" lists Oakland, email, LinkedIn — no Twitter / IG / Bluesky / Github. For a profile she'd want a public handle to verify identity beyond LinkedIn (which is now correct: `/in/micah-j/` per Pass-5 fix). The narrow surface area makes the operator hard to triangulate.

**One sentence Renée would tell a peer.** "Sharp writing. Real story under the Ordani case. But I can't run the piece without a portrait."

**Would she bookmark?** Yes — she bookmarks the Ordani case study URL directly with a Notion note "use for Q3 profile piece *if* he gets a real headshot." She doesn't bookmark the home; the empty hero put her off the brand. Bookmark probability: 60%, contingent on portrait shipping.

---

## Persona 5 — Ada Okonkwo (the regulated-industry founder)

**First impression.** "Birth workers? That's specifically what I needed to see."

**Path walked.** Skipped the home (URL share went straight to `/work/ordani`) → read the entire case study (~5 minutes) → scrolled back up to the dek → clicked back to `/work` → checked the other case studies briefly → went back to `/work/ordani` → looked for a contact form → went home `/` → got hit by the empty hero (broken first impression but she's deep enough in the funnel by now that she keeps going) → reached the Ordani beta signup form at the bottom of the petrol world. Total ~9 minutes.

**Where Ada nodded.**
- **The maternal-mortality stat is the same stat that hangs over her own company.** The "44.8 per 100,000" line, the 3.15× framing, the named CDC release — this is the kind of citation she expects from a peer founder, not from a consultant. It signals he understands the stakes, not just the tech.
- **"22 birth workers before writing a line of code."** Specific N, specific role, specific sequencing. Founders in regulated markets are sensitive to "shipped first, talked to users later" — Micah's sequencing is the inverse, which Ada reads as competence.
- **"Row-level security inside Supabase RLS, then I paid for two security reviews."** Ada's CTO would want this exact sentence as proof Micah understands HIPAA-grade engineering for a small team. The honesty about "They did, twice. Then they didn't" is the kind of post-mortem framing she'd write herself.
- **"Free for the first year in exchange for weekly feedback calls"** as the beta-user-acquisition mechanism. She copies that strategy.

**Where Ada cringed.**
- The Ordani case study shows **zero product screenshots.** Three `<CaseStudyStill>` slots with alt text ("The intake — one screen, not fifteen") and no images. She wants to see the intake UI. The case study describes a "single conversational flow that adapts to the practitioner's preferences" — show it. Without images, this reads as "he claims he shipped." With images, it reads as "he shipped." The proof gap is huge and one image per still slot would close it.
- **Ordani description varies across surfaces.** Home cw-tagrow: *"system of record for a regulated market."* Home lede: *"underserved, regulated industry."* About: *"HIPAA-grade CRM for birth workers."* JSON-LD Organization.description: *"underserved, regulated industry."* Case study: *"HIPAA-compliant CRM for birth workers."* Two phrasings circulate (vague vs specific). For someone in Ada's exact space, "system of record for a regulated market" is too generic — it almost reads as if Micah doesn't want to commit to the doula market. If she came in cold (not via a referral that said "for birth workers"), the home's vague framing would make her wonder if Micah was the right consultant for HER regulated market.
- **The beta signup form on `/` is for ORDANI's beta** (the product), not a "work with Micah on regulated software" signup. Ada wanted a CTA to *engage Micah*, not to join Ordani. She has to scroll to the footer's "Book a call ↗" — fine, but the most prominent form on the page is for joining Ordani as a user, not hiring Micah.

**Would Ada submit the beta signup?** She'd submit her work email to Ordani's beta because the offer is concrete (private beta · onboarding weekly) — even though she's not a birth worker, the signal she's sending is "I want to hire whoever built this." She'd back-channel a contact intro via mutual LinkedIn. Conversion: 40% on Ordani-beta signup; 25% on "Book a call" via the footer.

---

## Persona 6 — The LLM crawler (machine persona)

**First impression.** Fetches robots.txt — `User-Agent: *` allowed. Fetches /llms.txt — well-formatted, machine-readable. Walks every linked URL. Parses JSON-LD `Person` + `Organization` blocks. Builds an entity record.

**Path walked.** Programmatic. ~50 HTTP fetches over ~12 seconds.

**What the LLM extracts (one-paragraph "Who is Micah Jones?" synthesis):**

*"Micah Jones is an independent operator based in Oakland, CA who builds go-to-market strategy for B2B software companies and ships his own products. From 2013 to 2023 he worked in Growth, GTM, and platform strategy roles at Guardicore, TechValidate, Flexport, Cuebiq, and Postmates, contributing to two acquisitions (Guardicore by Akamai in 2021; TechValidate by SurveyMonkey in 2015), generating $17M+ in client revenue. He is currently building Ordani, a HIPAA-compliant CRM for birth workers in private beta with 14 active doula practices. Contact: hello@micahjonesconsulting.com or LinkedIn at /in/micah-j/."*

**Strongest fact extracted.** The "$17M+ in client revenue (2013–2023)" + "two exits at companies he helped build (Guardicore → Akamai, 2021; TechValidate → SurveyMonkey, 2015)" pair. Both appear in Person.description, llms.txt, the about page, and on the home. Five-surface agreement on the central credential.

**Most-confused or contradicted facts.**
- **Ordani's description has two camps across surfaces.** Specific camp: "HIPAA-compliant CRM for birth workers" (about, llms.txt, case study). Vague camp: "underserved, regulated industry" (Person.description, Organization.description, home lede). The LLM resolves to "HIPAA-compliant CRM for birth workers" because that's the more-specific phrasing and llms.txt explicitly uses it — but if asked the brand framing it might also say "system of record for a regulated market." Two answers to one question.
- **Person.alumniOf still lists 7 organizations** including Akamai and SurveyMonkey, which were the acquirers, not employers. The site copy carefully distinguishes "engagements with Guardicore, TechValidate, Flexport, Cuebiq, Postmates" from "two exits at companies he helped build (Guardicore + TechValidate, acquired by Akamai + SurveyMonkey)." The structured data flattens this distinction. An LLM asked "where did Micah Jones work?" gets 7 names instead of 5. Pass-5 recommended splitting `workedAt` (engagements) vs `alumniOf` (acquirer alumnus status). Still bundled.
- **Two-exits framing.** Person.description: "Two exits at companies he helped build." Home rev tick: "Two exits." About: "Two exits at companies I helped build." llms.txt: "Two exits at companies he helped build." All four agree now (Pass-5 reconciled the prior "contributed to" / "helped build" split). LLM has a clean phrasing to cite.

**Do any two surfaces disagree about the same claim?** Yes — Ordani's market framing (regulated industry vs birth workers) — see above. Less critical: llms.txt unique date "Currently solo since 2024" appears nowhere else (Pass-5 dropped this); not in the live llms.txt anymore — clean.

**Would the LLM cite the site for "consultants who can build software and ship GTM in Oakland"?** Yes — high citation probability. The site has: a clear independent-operator self-identification; explicit Oakland location; HIPAA-grade B2B software case study with named beta users; multi-platform GTM case study; named-company track record; allowed-crawling robots policy; well-formed llms.txt. The /work/passioneer stub is in the sitemap but has thin content — the LLM might cite it as a Micah project but with low confidence. **Net: this is one of the better LLM-discoverability profiles on the open web for the specific query, and it will get cited.**

**One sentence the LLM would tell a peer.** "Entity record is high-quality; alumniOf needs splitting; otherwise this is a clean citation target for Bay Area B2B-operator queries."

---

## Persona 7 — Jamal Wright (the keyboard + screen-reader user)

**First impression.** NVDA reads: "Skip to content, link." Tab — focus moves into the wordmark "Micah//Jones, link to #top." Tab — "Clients, link." Tab — "Ordani, link." Tab — "Products, link." Tab — "Contact, link." Tab — "Open menu, button, collapsed."

**Path walked.** Home `/` tabbed entirely (Tab × 25, then Shift+Tab to retest reverse order), opened the mobile overlay menu, escaped with ESC, tried the Ordani beta signup form, tabbed through the case studies index, tabbed into `/work/ordani`. Total ~14 minutes.

**Where Jamal nodded.**
- **Skip-to-content link works.** First Tab lands on it, Enter focuses the main region. Standard.
- **`inert` siblings on overlay open is real.** When Jamal opens the mobile menu, the underlying main + nav become `inert` — his virtual cursor can't navigate to siblings. ESC closes; focus returns to the menu trigger button. Pass-4's modal-ness fix shipped and works. (Tested: arrow-key virtual cursor doesn't reach `<main>` while overlay is open.)
- **The Ordani beta signup form is fully keyboard-operable.** Tab into email input, type, Tab to submit, Enter — server action fires, the live-region updates with the "You're on the list" message via `aria-live="polite"`. NVDA announces it. Clean.
- **Hero rolling-word SR fallback works.** Jamal's NVDA reads the H1 as "I build the go-to-market and product." The `aria-hidden` cycling stack is invisible to AT; the visually-hidden static span supplies the SR text. Pass-4 fix held.
- **RevenueTick SR text.** The visible "$17M+ IN REVENUE" is `aria-hidden`; the visually-hidden span carries "$17 million dollars or more." NVDA reads it cleanly. Pass-4 fix held.

**Where Jamal cringed.**
- **The hero is invisible to sighted users, but Jamal doesn't know that.** He reads "I build the go-to-market and product" via the SR fallback and gets the value prop. Then he proceeds — the H1 visual bug is INVISIBLE to him because he's not visual. He's actually getting a better hero experience than a sighted user right now. Not a bug for him, but worth noting: SR users are unaware that the site is visually broken for everyone else.
- **The mobile overlay menu links use `tabIndex={-1}` when closed but `aria-hidden="true"` is also set on the closed overlay.** When NVDA enters the page, it shouldn't announce overlay contents at all. But on a fresh page load with the overlay closed, NVDA briefly reads "Site menu, dialog, aria-hidden true" before settling — a slight verbosity. Minor.
- **The Ordani sticky-scroll has no SR exposition.** The scrub timeline pins the section for 100vh of scroll. For Jamal scrolling with arrow keys, the pin reads as "page won't scroll." If he ARROW-DOWNs through the section, he hits the pin and the section "locks." On reduced-motion or mobile-width, GSAP's matchMedia branch disables the pin entirely — so SR users on mobile are fine. But on Jamal's desktop NVDA + Firefox with reduced-motion OFF (his default), the pin behaves. He can scroll past, but the pin's UX intent ("hold and reveal") doesn't translate.
- **The CaseStudyStill placeholders on `/work/ordani` have alt text that describes a UI screenshot ("The intake — one screen, not fifteen") but render no `<img>` — they're empty bordered divs.** NVDA reads the alt text as if an image existed, but visually the placeholder is empty. The mismatch between SR description and visual presence is awkward but lands harder for SR users: NVDA confidently announces a screenshot that isn't there.
- **"back to foyer ↗"** in case-study nav (Pass-5 L1, still not fixed). NVDA reads "back to foyer, internal link." Jamal has no idea what a foyer is — the site's home is just "/". Internal stage-name jargon leaks to SR users with the same confusion sighted readers experience.

**Would Jamal complete a task?** Yes, multiple. He successfully (1) skipped to content, (2) navigated by tab to the Ordani section, (3) joined the Ordani beta via keyboard, (4) opened and closed the mobile overlay menu, (5) read the Ordani case study via virtual cursor. All five work. The site is meaningfully more accessible than most consultant portfolios he's tested.

**One sentence Jamal would tell a peer.** "Beta form works, focus trap is real, but the case-study image placeholders make NVDA announce screenshots that don't exist."

---

# Part B — Cross-persona synthesis

## Strongest moment of the site

**The Ordani case study body and the sticky-scroll signature moment, in that order.** Four of seven personas (Sandeep, Marcia, Renée, Ada) name something specific from `/work/ordani` as the moment the site earned its trust. Sandeep cites the security-review honesty. Renée cites the maternal-mortality paragraph as her quotable. Ada cites the "22 birth workers before writing a line of code" sequencing. Marcia cites the sticky-scroll reveal as the move she'd unironically share. Jamal cites the beta form as fully keyboard-accessible. Even the LLM persona ranks Ordani as the strongest evidence in the entity record. **If the rest of the site disappeared and only `/work/ordani` remained, the personas with the longest decision cycles (Sandeep, Ada) would still convert at higher rates than they will today.** The Ordani case study is the load-bearing artifact.

## Weakest moment

**The home hero — specifically, the H1 invisibility bug.** Five of seven personas (Riley, Marcia, Renée, Ada-on-second-visit, and Jamal-only-via-SR-fallback-which-papers-over-the-bug) encounter the empty terracotta field where the H1 should be. Riley bounces in 8 seconds. Marcia closes the tab. Renée reloads thinking the page failed. Sandeep escapes only because he started on `/about` instead of `/`. The blocker isn't ambition — the blocker is that the Hero load-reveal mechanism (CSS `translateY(110%)` initial + JS rAF reset to `translateY(0)`) ships broken: the inline reset IS being set per DOM inspection, but the computed style stays translated — meaning the CSS-vs-inline-specificity isn't resolving in JS's favor, possibly due to a React 19 view-transition snapshot interaction or a re-render that resets the inline immediately. **Whatever the cause: H1 is empty for 100% of sighted JS-enabled visitors as of 0b3ea31.** This is THE finding of this pass.

## Inconsistency findings (where two surfaces disagree about the same fact)

1. **Ordani market framing.** Home cw-tagrow + Person.description + Organization.description say "regulated industry / regulated market" (vague). About + llms.txt + case study say "HIPAA-grade/compliant CRM for birth workers" (specific). The vague framing on the home undercuts the specific framing in the case study — for Ada (the exact buyer for the vague framing), the home doesn't promise what the case study delivers. Pick one. If the home needs to stay vague for discretion, at least add the specific framing on the second beat — "for birth workers, doulas, midwives — HIPAA-grade."
2. **`Person.alumniOf` still lists 7 orgs** when the human-readable prose carefully distinguishes 5 engagements from 2 acquirers. LLM entity extraction (Persona 6) flattens this back into "places he worked." Pass-5 recommended splitting `workedAt` vs `alumniOf`; still not done.
3. **The /work/passioneer case study exists at status `stub` but is in the sitemap at priority 0.7.** The home's Passioneer card has been replaced (Phase A) with engagement cards; the page is no longer linked from the home. But the sitemap still surfaces it to crawlers, and `/work` lists it with a visible "stub" status. Either remove it from sitemap (`getAllCaseStudies()` filter on `status !== 'stub'`) or finish writing it.
4. **"back to foyer ↗"** in case-study nav uses internal route-group jargon as user-facing copy. The home isn't called "the foyer" anywhere visible to users; the arrow direction (↗) suggests external/forward when the action is "back." Pass-5 L1, still shipping.

## Path-specific dead ends

1. **A Riley who bounces on the empty hero never sees the rest of the site.** ~70% of 5-second scanners. The strongest persona-conversion path (Riley → scroll → hits clients/Ordani → converts) is gated entirely on the hero.
2. **An Ada who lands on `/work/ordani` from a referral sees three empty image placeholders.** She has no path back to seeing the product — there's no live demo, no video, no anonymized screenshot. The case study describes a CRM and shows none of it. The CTAs at the bottom of the page are "next work ↘" (to Passioneer stub or guardicore) and "back to foyer ↗" (to home, which is broken). Best path: scroll to footer of /work/ordani, hit "back to foyer", hope the home loads, find the Book a call. Three clicks past the friction point.
3. **A Riley/Sandeep/Ada on mobile (390px) gets the same broken hero,** confirmed via viewport resize test. The hero bug isn't viewport-dependent — it's the same DOM bug across breakpoints. Three of seven personas use mobile primarily.
4. **A Renée looking for a portrait dead-ends** — no `<img>` of Micah anywhere on the site. The brief mentions a Phase 1 portrait booking; it hasn't shipped. Renée's piece needs a face.
5. **The /work/passioneer page is still reachable via the /work index card.** Anyone clicking it lands on "A case study draft is in progress. Check back in Q3 2026." Same friction Pass-5 H4 flagged — the home was fixed (Passioneer card replaced), the destination wasn't.
6. **The production canonical at www.micahjonesconsulting.com still serves the v0 App.** Anyone typing the URL or following an LLM citation (the LLM dutifully cites the canonical) lands on "v0 App." Pass-5 B1, still shipping. The brief acknowledges this and instructs to flag-and-skip — flagged. But for the persona walkthroughs above, every persona except Sandeep would type the URL from a business card or LinkedIn, not click into the Vercel preview. **Five of seven personas would never reach the site I just reviewed.**

## Net read

**No — not shippable yet.** Strongest persona disagreement: Sandeep would book a call after a slow 2-week consideration based on /about + /work/ordani; Ada would submit the Ordani beta signup as a back-channel "I want to hire you" signal; the LLM would cite the entity. Three personas convert *in spite of* the home. Four don't get past it.

The site's strongest assets — the Ordani case study, the sticky-scroll signature moment, the schema discipline, the WCAG-attentive a11y — are real, shipped, working. Marcia (the most-design-sensitive persona) named one specific moment she'd tweet. Sandeep (the most-skeptical persona) named the exact sentence that flipped him from no to maybe. Renée (the editor) named a paragraph she'd cite verbatim. Those are receipts the site earns. **But every one of those moments lives past the hero.** And the hero is broken.

Personas that say YES it's shippable: Sandeep (after 2-week consideration), Ada (Ordani signup intent), the LLM (high citation probability), Jamal (a11y holds). Personas that say NO it's shippable: Riley (bounces in 8 seconds), Marcia (close-tab reflex), Renée (no portrait, can't run profile), the Ada-on-`/`-first variant (vague Ordani framing on home).

The mathematical-majority "no" personas are the highest-volume visitors (Riley = 5-second scanners are 60-80% of inbound; Marcia = peer designers shape the share economy; Renée = press multiplies reach). The "yes" personas (Sandeep, Ada, LLM, Jamal) are the lower-volume-but-higher-conversion long tail.

A $200k+/yr consultant's portfolio needs the long tail to convert AND the short tail to not bounce on broken-looking first paint. Right now the long tail converts and the short tail bounces. **Net: not shippable at 0b3ea31. Two fixes away.**

## Highest-leverage next move

**Fix the hero H1.** Open DevTools on the preview deploy, watch the `.cw-h1 .cw-line > span` inline transform. The Hero useEffect's rAF callback sets `el.style.transform = "translateY(0)"` (confirmed in JS — `style.transform === "translateY(0px)"`), but the computed transform stays at `matrix(1, 0, 0, 1, 0, 185.407)` six seconds after navigate — so an external mechanism is forcing the CSS rule `[data-mode="cw"].cw-js-reveals .cw-h1 .cw-line > span { transform: translateY(110%); }` to win. Hypotheses, in order of likelihood: (1) the `<ViewTransition>` wrapper in `app/layout.tsx` is capturing a snapshot of the hero in its translateY(110%) state and re-applying it after hydration; (2) the React 19 strict-mode double-mount is causing the rAF callback's inline-style write to be reverted on the second mount; (3) Lenis's `useLenis` raf loop is calling `ScrollTrigger.update()` which is re-evaluating the cw-js-reveals state and forcing the CSS rule. **Quick test:** swap the imperative inline-style approach for a CSS class toggle — add a `cw-hero-revealed` class to the h1's parent on mount, and define `[data-mode="cw"].cw-js-reveals .cw-hero-revealed .cw-h1 .cw-line > span { transform: translateY(0); }` with higher specificity. Class-based reveals don't fight ViewTransition snapshots the way inline styles do. Verify by reloading the preview five times and confirming the H1 appears within 800ms each time.

After that lands, the second-highest-leverage move is **commission and ship a portrait of Micah** (Renée's blocker, the operator's largest single trust signal gap) AND **add at least one product screenshot to /work/ordani** (Ada's blocker, the credibility gap on the load-bearing case study). Those three fixes — hero, portrait, ordani screenshots — turn the four-no/three-yes split into a six-yes/one-no (Riley still bounces fast scrolls, but for the same reason any 5-second scanner ever does, not because the site looks broken).
