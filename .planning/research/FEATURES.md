# Feature Research

**Domain:** Premium agency-tier solo-operator portfolio + case-study marketing site
**Researched:** 2026-05-14
**Confidence:** HIGH (blueprint is exceptionally specific; cross-checked against 2026 industry sources)

**Audience served:**
- Primary: founders of $5–50M companies who care about how their brand actually looks
- Primary (secondary lens): Black HR consultants, doulas, birth workers, equity practitioners
- Tertiary: design-engineering peers / potential collaborators

**Intent:** A primary-audience visitor feels welcomed in the first ten seconds and stays through one case study. Everything else is a means to that end (blueprint §14, item 10).

**Sources of truth:**
- `.planning/PROJECT.md` (Active Requirements, Out-of-Scope)
- `.planning/blueprint.md` §§2, 3, 4, 6, 7, 11, 13, 14
- 2026 industry patterns (consultant portfolios, Awwwards 2025 winners)

---

## Feature Landscape

### Table Stakes (Users Expect These — Missing = Site Feels Broken)

Penalty-on-miss features. Founders shopping operators in 2026 assume each of these is present; a solo consultant who skips one looks unserious. None are negotiable.

| Feature | Why Expected | Complexity | Source | Notes |
|---------|--------------|------------|--------|-------|
| **Five-page IA (Home, Work index, Case Studies, About, Work With Me, Contact)** | Industry baseline for premium consultant/agency sites; Clay/Locomotive/basement all run ≤6 pages | LOW | Blueprint §6 | Counts Work index + case-study template as one IA unit |
| **Home page hero with positioning sentence** | First-screen "who are you, what do you do" answer; founders bail in <10s without one | LOW | Blueprint §7, §8 | "I help operators ship the work the rest of their org keeps stalling on." |
| **About page (long-form, two-column)** | Solo operators MUST establish trust; primary audience needs to know who they are working with | LOW | Blueprint §7, §8 | 150-word about paragraph, vertical portrait, credit list, Oakland context, three values |
| **Work index page (case-study previews)** | Standard portfolio entry-point; expected by every visitor evaluating the work | LOW | Blueprint §6 | TitleCard thumbnails per case study |
| **At least 3 case study pages** | 2026 industry minimum (3–5 case studies for credibility per consultant portfolio research); fewer = "this person doesn't have receipts" | MEDIUM | Blueprint §6, §9, §10 | ORDANI (long-form), HR Equity Author (anonymized), Passioneer + Akamai (short-form) |
| **Case-study structure: problem → why it matters → approach → outcome** | Industry standard case-study skeleton (Instrument's "one-sentence problem statement at top + year-by-year story") | LOW | Blueprint §8 (5-movement framework) | Title Card → Dek → Problem → Why → Approach (4 numbered) → What it became → Outcome → Pull quote |
| **Contact form** | Founders need a single, frictionless way to start a conversation | LOW | Blueprint §7 | Two fields only (name + what you're working on) — see Differentiators for the restraint move |
| **Working email reply path** | Form submissions that go nowhere = silent failure; founders test it | LOW | Blueprint §11, PROJECT.md | Resend integration with two-business-day reply commitment |
| **Direct email link as alternate to form** | Some founders refuse to fill forms; expected as escape hatch | LOW | Blueprint §7 | "Or email me directly: hello@micahjonesconsulting.com" |
| **Responsive layouts at 390 / 768 / 1440** | Mobile traffic dominates in 2026; founders preview the site on their phones | MEDIUM | PROJECT.md (visual-qa baselines) | Title Card must pin on mobile; portrait reflows to tighter crop (§14, item 9) |
| **Working metadata for social cards (OG image, title, description per page)** | Founders share links in Slack/iMessage; broken preview = "amateur" | LOW | Blueprint §4f (TitleCard as OG image) | Title Card doubles as Open Graph image per case study |
| **Accessible focus states** | WCAG 2 AA baseline; legal + audience-respect requirement | LOW | PROJECT.md (a11y-reviewer pass) | Keyboard nav must visibly land on every interactive element |
| **Alt text on every image** | WCAG 2 AA; doula and birth-worker audience may use screen readers or low-vision tooling | LOW | PROJECT.md (a11y-reviewer pass) | Captions on stills also serve this dual purpose |
| **No serious/critical axe violations** | Industry baseline for accessibility in 2026; enforced by harness | LOW | PROJECT.md, Blueprint §14 | a11y-reviewer agent runs on every route |
| **Navigation with five labels (work, about, work with me, contact)** | Founders scan the nav in <2s; missing nav = broken | LOW | Blueprint §7 wireframe | Two modes: foyer nav (ink on cream) + theater nav (copper on ground) |
| **Footer with contact pointer** | Standard expectation; signals "I'm reachable" | LOW | Blueprint §7 | "contact · email · two-day reply promise" |
| **Page load that doesn't feel janky** | Premium signal is "nothing feels janky" (blueprint §3, item 9); slow site = "I don't care" | MEDIUM | Blueprint §3, PROJECT.md | LCP < 1.8s mobile, INP < 200ms, CLS < 0.05, Lighthouse Perf ≥ 95 |
| **Real portrait of the operator (not stock, not avatar)** | 2026 industry consensus: solo operators MUST show their face; blueprint §3 item 3 and §14 item 1 — "A v0 site has a stock photo or no photo. A 10/10 site has a single $1,000-grade portrait." | LOW (assets) / MEDIUM (sourcing) | Blueprint §4c, §14, PROJECT.md | Premium portrait shoot $500–$1,200 budget; B&W or warm color, available light, Oakland location |
| **One typeface system, consistently used** | Premium tier expectation; Locomotive ships with two typefaces and four styles | LOW | Blueprint §4a | Inter Display + Inter + Source Serif 4 via next/font/google |
| **Color palette adhered to (no rogue hex literals)** | Premium signal is restraint; rogue colors signal "didn't think about it" | LOW | Blueprint §4b, PROJECT.md (design-tokens.sh) | Foyer paper/ink + theater ground/ink + one accent copper |
| **Outcomes stated with named numbers** | "$150K," "14 practices," "8 weeks" — never "significant impact" | LOW | Blueprint §8 voice rules | Founders weight specifics 10x over abstractions |
| **Mobile parity (not a stripped-down mobile)** | Blueprint §14 item 9: "A v0 site stacks. A 10/10 site re-composes." | MEDIUM | Blueprint §14, PROJECT.md | Title Card pins on mobile; portrait reflows |

**Confidence on table stakes:** HIGH. These map directly to blueprint requirements + corroborated by 2026 consultant portfolio research showing positioning statement, 3–5 case studies, problem→outcome structure, accessible contact, and credibility-first design as universal expectations.

---

### Differentiators (Competitive Advantage)

Features that make this site read as Micah's specifically — not a Clay-clone, not editorial-calm, not dev-Twitter. These are the signature moves that earn the "House Lights" positioning. Aligned to blueprint §4 (chosen direction), §5 (why not Clay-clone), and §14 (10/10 bar).

| Feature | Value Proposition | Complexity | Source | Notes |
|---------|-------------------|------------|--------|-------|
| **TitleCard signature interaction** (pinned vertical word stack, GSAP scroll-resolve, cross-fade to first still) | This is THE single signature motion that signs the site. Borrowed in spirit from Bozoma Saint John's vertical word-stack hero, recast as a chapter-card device. Per blueprint §3 item 10: "A signature interaction. Pick one. Just one." | HIGH | Blueprint §4f, §7, §14 item 3, PROJECT.md | 96px Inter Display Bold (free path), pin ~600ms, resolves to caption + still cross-fade. Reusable React component `<TitleCard />` at `components/TitleCard.tsx`. Doubles as OG/social card per case study. |
| **Foyer ↔ theater View Transitions API transition** (cream paper recedes, theater ground rises, ~600ms) | The metaphor IS the gesture: "lights dimming when you enter the work." Diverges from Clay-tier convention (drop visitor into the show) by going hospitality-then-craft. This is the literal embodiment of the "House Lights" direction. | HIGH | Blueprint §4d, §1, §5, PROJECT.md | ease-in-out 600ms. View Transitions API at route boundary. Foyer routes → theater routes (`/work/*`) trigger the dim; reverse on back. |
| **Two-mode site (foyer + theater) with route-based mode** | Diverges from every Clay-peer (which is uniformly dark or uniformly light). The foyer is warm cream + copper + Inter Display — agency homepages have moved toward warmer, lighter foyers in 2026 per blueprint §3 item 12. The theater is dark cinematic for case studies. No dark mode toggle; mode is route-based. | MEDIUM | Blueprint §1, §4, §6, PROJECT.md | Tailwind v4 `@theme` block exposes both palettes; route groups in App Router gate which palette is active. Per Clay/Locomotive/Active Theory/Anton & Irene: dark for cinematic, light for foyer. |
| **One accent color (copper #C8542B), used with confidence across both modes** | Per blueprint §3 item 2: "One accent color, used with confidence. Two accents is one too many." Active Theory uses one violet #A970FF; basement uses one orange #FF4D00; April Dunford uses one orange. Copper is the metallic, oxidized accent — reads as "builder's metal" without saying it. | LOW | Blueprint §3 item 2, §4b, §5 | Copper crosses the foyer/theater boundary as the only constant color. ORDANI sage #5E7158 is permitted ONLY inside `/work/ordani` route. |
| **One excellent portrait of Micah, treated like a film still** | Per blueprint §3 item 3 and §14 item 1. The portrait IS the trust signal. Diverges from agency convention (no portrait OR a team grid) by going Anton & Irene "founders-as-the-hero" route, refactored for a Black founder. | LOW (display) / MEDIUM (sourcing) | Blueprint §4c, §14, PROJECT.md | Full-bleed on Home; vertical crop on About; tighter mobile crop. WebP/AVIF via `next/image`. |
| **Lenis smooth scroll at layout root (damping ~0.08)** | Premium signal: nothing feels janky. Damping kept light (not buttery) per basement.studio's stack. Subtle, not theatrical. | LOW | Blueprint §4d, PROJECT.md | Lenis 1.3+ at layout root. |
| **Two-field contact form ("name" + "what you are working on") with two-business-day reply commitment** | Per blueprint §3 item 8: "A contact form that respects the visitor. Two or three fields, conversational copy, a real reply guarantee." Diverges from every B2B form on the planet by NOT asking for budget range, company size, role, source, or "How did you hear about us." | LOW | Blueprint §7, §13, PROJECT.md | Resend transactional email + Supabase archive. Single email link as alternate. |
| **Pull quote treatment in Source Serif 4 italic with copper underline-grow on enter** | Per blueprint §4d (motion language) + §8 (case-study framework). One pull quote per case study; "real, attributed even if 'name withheld.'" Two-second underline grow on scroll-into-view. | MEDIUM | Blueprint §4d, §7, §8 | Component-level Framer Motion animation; sage color permitted inside ORDANI for the quote. |
| **Case study with point of view (problem → why it matters → approach → outcome)** | Per blueprint §14 item 4: "A v0 case study lists what was built. A 10/10 case study makes the case for why it mattered, and is willing to be wrong out loud." ORDANI commits to the CDC maternal-mortality data; HR Equity Author commits to a position on algorithmic resilience. | MEDIUM | Blueprint §8, §9, §10 | Five-movement structure. Each case study commits to a position. |
| **Three engagement shapes (Strategy Sprint / Embed / Build)** stacked, not gridded | Diverges from agency "Services" pages by going specific ("2–4 weeks, one deliverable" vs "We offer strategy and execution"). Per blueprint §3 item 4: "A short, opinionated voice." | LOW | Blueprint §7 (Work With Me wireframe) | Stacked layout (not grid) reinforces "one of these probably fits." |
| **Voice with named numbers, dry humor at joints, "Black" stated plainly** | Per blueprint §8 voice rules. Diverges from solo-consultant cliché (vague, polished, agnostic) by having actual opinions, named clients, real metrics, and explicit identity. | LOW (writing) / MEDIUM (enforcement) | Blueprint §8, PROJECT.md (copy-lint.sh) | Enforced at hook layer: 30 banned words from blueprint §8 + harness slop-words.txt. Build fails on banned words. |
| **Copy-lint at build time** (banned words list, build fails with line numbers) | Discipline that would otherwise require a senior editor reviewing every PR. Custom TypeScript module + `instrumentation.ts` hook. | MEDIUM | PROJECT.md (active req), Blueprint §12 | `lib/copy-lint.ts` + `instrumentation.ts`. 30 banned words from blueprint §8. |
| **Open-Graph image generated from TitleCard per case study** | Each share looks like a film poster, not a generic favicon-plus-title-bar. The TitleCard is already the page's visual identity; reusing it as social card is the Locomotive-grade move. | MEDIUM | Blueprint §4f | Static export of TitleCard composition per case study route; `opengraph-image.tsx` in Next.js App Router. |
| **Performance as floor, not constraint (LCP < 1.8s, Lighthouse Perf ≥ 95)** | Per blueprint §14 item 6: "A v0 site is slow because it doesn't care. A 10/10 site is fast because nothing else would feel honest." Active Theory hits 1.3s LCP with WebGL — Micah hits sub-1.8s without it. | MEDIUM | Blueprint §3 item 9, §14, PROJECT.md (perf-budget.sh, image-budget.sh) | Enforced at harness layer. Max image 500KB. |
| **Static-to-video hover on case-study tiles** (refactored from Active Theory's "trailer-on-hover") | Per blueprint §2 Tier 1: "the 'trailer-on-hover' idea (refactored as static-to-video on hover for ORDANI)." A subtle hover bloom on the Work index cards — not the Active Theory WebGL bloom, but a static-to-loop-video swap | MEDIUM | Blueprint §2 Tier 1 (Active Theory steal) | Optional differentiator; can defer to v1.1 if timeline tight. Caps at 2px lift + video swap, no scale or rotate. |
| **Captioned stills like film frames** ("Doula intake flow, March 2026") with 2px warm off-white inner border + 4% film-grain overlay | Per blueprint §4c. Treats client artifacts as art objects, borrowed from Clay's "artwork first" approach. Diverges from solo-operator screenshot dumps by giving each still a caption + frame treatment. | MEDIUM | Blueprint §4c, §2 (Clay steal) | CSS-only inner border + grain overlay; no per-image masking required. |
| **Vercel Analytics + one custom event (case-study read-time)** | Diverges from "I track everything" by tracking only the metric that matters — does anyone actually read a case study? Per blueprint §11. | LOW | Blueprint §11, PROJECT.md | Single custom event in `app/work/[slug]/page.tsx`. No Mixpanel/Segment/PostHog. |

**Confidence on differentiators:** HIGH. Every entry maps to a specific blueprint section. The TitleCard, foyer↔theater transition, one accent, and one portrait are the four explicit "signature moves" listed in the quality gate.

---

### Anti-Features (Commonly Built, Explicitly Refused)

Features that other solo operators ship reflexively, and that this site deliberately does NOT build. Each entry cites blueprint §13 (anti-patterns) or specific reasoning from §11/§14.

| Feature | Why Requested (Surface Appeal) | Why Refused (Actual Problem) | Alternative |
|---------|-------------------------------|------------------------------|-------------|
| **Blog** | "Content marketing builds SEO and authority." | Per blueprint §6: "No blog. No Now. No Uses. No colophon." Five-page IA is the discipline. A blog signals "I'll get to writing this eventually" — broken promise. | If Micah writes long-form, it ships as a case study or lives off-site (e.g., Substack), linked from About at most. |
| **"Now" page** | "Personality, transparency, indie-web spirit." | Per blueprint §13: "dev-Twitter tells." Reads as performance of self-awareness, not work. | Oakland context lives in the About page paragraph. |
| **"Uses" page** | "Other engineers do it; signals craft." | Per blueprint §13: "dev-Twitter tells." Tooling list is not the work; the work is the work. | If audience asks, it goes in a case study's Approach section in passing ("Next.js + Supabase") — not as a standalone manifesto. |
| **Colophon** | "Designers do it." | Per blueprint §13: same dev-Twitter pattern. Wrong audience — founders of $5–50M companies don't read colophons. | Typeface choice gets one sentence in About (the Buck-style explicit reasoning move). |
| **Decision log / "Building in public" log** | "Indie-hacker authenticity." | Per blueprint §13: dev-Twitter tell. Wrong register for a founder-buying-services audience. | Decisions show in the work itself — the ORDANI case study IS the decision log. |
| **Live BART status / weather / commit-feed widget** | "Cute, makes the site feel alive." | Per blueprint §13: explicit "telemetry panel" rejection. Telegraphs "I am a hobbyist." | None — refused outright. |
| **WebGL / 3D / Three.js / Spline hero scenes** | "Cinematic, modern, premium-coded." | Per blueprint §11 + §13: "Wrong budget, wrong audience. WebGL would dilute the gesture, blow up the bundle, and read as production-flex for an audience that doesn't reward it." | The TitleCard pin IS the cinematic gesture. The foyer→theater transition is the dim. WebGL would dilute both. |
| **Client logo wall / "Trusted by" / "As Seen In" carousel** | "Social proof, third-party validation." | Per blueprint §3 item 7 + §13: "Micah doesn't have client consent + reads as filler from solo operators." | Akamai, Flexport, SurveyMonkey, Cuebiq sit in a two-line credit list inside About. Never on the home. |
| **Cursor follower / custom cursor** | "Feels bespoke, agency-y." | Per blueprint §4d + §13: "Dated as of mid-2025." Native cursor is the correct choice in 2026. Enforced by harness `motion-discipline.sh`. | Native cursor. Hover states do the work (copper underline lift, 1px→2px border thicken). |
| **Newsletter signup in navigation** | "Build the list, own the audience." | Per blueprint §13: "would dilute foyer hospitality; reads as a marketer's reflex." | If a newsletter ever exists, it lives at the bottom of About, never at the top of every page. |
| **Calendly link in first contact volley** | "Reduce friction, book the meeting." | Per blueprint §7 + §13: "The conversation starts in email." A Calendly link signals "I want to optimize you into a slot," not "I want to read what you're working on." | Two-field form → two-business-day email reply → conversation establishes fit → meeting comes from there. |
| **"Select your budget range" dropdown on contact form** | "Qualify the lead before responding." | Per blueprint §3 item 8 + §13: "Two fields, a real reply." Qualifying upfront is the agency-RFP convention Micah explicitly rejects. | Name + what you're working on. Budget conversation happens in the email exchange where Micah can match scope to engagement shape. |
| **Phone number on contact** | "Old-school accessibility." | Per blueprint §7: "No phone." Founders shopping operators in 2026 want async; phone signals "I'm available all day." | Email is the channel. Two-business-day commitment is the promise. |
| **Stock photography** | "Quick visual fill, low cost." | Per blueprint §4c: "Anything that isn't a photograph or screenshot is type. No stock. No illustration. No 3D. No icon kit." | One real portrait of Micah. Captioned product stills. Type does the rest of the visual work. |
| **Illustration / icon kits** | "Modern SaaS look." | Per blueprint §4c: same rule. Solo-operator illustration usually reads as Notion-tier, which fights the cinematic register. | Type. Whitespace. Hairline rules. |
| **Monospace fonts anywhere** | "Looks like a builder, looks technical." | Per blueprint §13: "Mono is the Attempt 1 tell." Berkeley Mono, Geist Mono, JetBrains Mono, Söhne Mono, IBM Plex Mono — all banned. Enforced by harness `motion-discipline.sh`. Wrong register for a Black HR consultant / doula reading the site. | Inter (sans) for body. Source Serif 4 for deks/pull quotes. That's it. |
| **PP Editorial New / "warm paper studio" framing** | "Indie editorial, post-Klim aesthetic." | Per blueprint §13: "That was Attempt 2." Overdone in 2026. | Inter Display + Inter + Source Serif 4 (free path) or Söhne + Tiempos (paid path deferred to v2). |
| **Dark mode toggle** | "User preference, expected feature." | Per blueprint §12 CLAUDE.md: "Mode is route-based, not user-controlled." A toggle implies the modes are arbitrary; the foyer→theater dim is the entire content design. | Foyer routes are light. Theater routes (`/work/*`) are dark. View Transition is the bridge. |
| **Headless CMS (Sanity, Contentful, Payload, Strapi, etc.)** | "Editing comfort, content team scalability." | Per blueprint §11: "Five pages and a handful of case studies do not need Sanity or Contentful." Adds infrastructure, deploy lag, vendor lock-in, and a draft preview system Micah doesn't need. | MDX files in the repo (`content/work/*.mdx`). Editor = VS Code. |
| **Multi-language / i18n** | "Reach broader audience." | Per PROJECT.md: "single language launch." English-language audience is the validated audience. | Defer indefinitely; revisit if a non-English engagement materializes. |
| **Mixpanel / Segment / PostHog analytics** | "Product-led growth observability." | Per blueprint §11: "Vercel Analytics only." This is a marketing site, not a product. Heavy analytics signals "I am optimizing you." | Vercel Analytics + one custom event for case-study read-time. |
| **Mobile native app** | "Reach mobile audience." | Per PROJECT.md out-of-scope: "web only (consistent with the audience using browsers)." | Responsive web. Title Card pins on mobile; portrait reflows. |
| **Parallax > 2 layers** | "Depth, cinematic feel." | Per harness `motion-discipline.sh`: parallax-on->2 blocked. Per blueprint §4d: motion is restrained to TitleCard + foyer↔theater. | None. The TitleCard pin IS the depth move. |
| **Scroll-jacking / locked scroll narrative** | "Cinematic case-study presentation." | Per harness `motion-discipline.sh`: scroll-jacking blocked. Per blueprint §3 item 11 (Locomotive's own admission): "We avoided excessive animations and gadgets to convey only the essentials." | Native scroll + Lenis smoothing. TitleCard pins for 600ms then releases. |
| **Loading spinners / skeleton screens after first paint** | "Perceived performance." | Per blueprint §4d: "a brief 300ms type-set animation on first paint of the home headline. After that, no loaders." | Static content via Next.js SSG/RSC. No client-side loading states. |
| **Animated SVG line drawings** | "Indie-developer signature." | Per blueprint §4d motion budget: only TitleCard + foyer↔theater earn motion. SVG line drawings read as 2019 "growth marketing site" cliché. | None. |
| **Testimonial carousel** | "Social proof." | Slot machine of testimonials reads as desperate. Pull quote inside each case study is the credible move. | One pull quote per case study, attributed even if "name withheld." |
| **"Schedule a call" floating widget (Intercom, Drift, Crisp, etc.)** | "Conversion optimization." | Pop-up chat on a hospitality-first site is the antithesis of the foyer metaphor. | Email. |
| **Pricing page with quoted dollar amounts** | "Transparency." | Per blueprint §7 Work With Me: "pricing or scope language without quoting numbers." Numbers anchor the conversation to budget before scope; Micah's three engagement shapes anchor to fit first. | "Starts at [scope range]" language. Real number negotiated in email. |
| **Author bio at the bottom of case studies** | "Recap who wrote this." | Solo operator — Micah is the author by default. Repeating the bio at the bottom of every case study is the WordPress reflex. | Theater nav inverts to copper-on-ground; that's enough Micah-signature. |
| **Cookie consent banner (when not legally required)** | "Looks compliant." | Vercel Analytics is cookieless by default per Vercel docs; Resend doesn't set tracking cookies. No banner needed. Banner clutter is anti-hospitality. | If GDPR cookies enter v2, surface the consent in the footer as a minimal link, not a blocking banner. |
| **Social share buttons on case studies** | "Encourage shares." | Founders share via Slack/iMessage paste-in. Share buttons cluttered the 2010s; they read as desperate in 2026. The TitleCard OG image is the share infrastructure. | None on-page. The page's social card does the work. |
| **Related projects / "you might also like" grids** | "Increase engagement, lower bounce." | The Work index already lists all the projects. Per blueprint §7 ORDANI wireframe: footer is just `[NEXT WORK ↘] [BACK TO FOYER ↗]`. | Single "Next work" link + "Back to foyer" link at the end of each case study. |

**Confidence on anti-features:** HIGH. Every entry cites a specific blueprint section, harness hook, or out-of-scope item from PROJECT.md.

---

## Feature Dependencies

```
[Foyer mode tokens (paper, ink, copper)]
    └──required by──> [Home page]
    └──required by──> [About page]
    └──required by──> [Work With Me page]
    └──required by──> [Contact page]
    └──required by──> [Work index page]

[Theater mode tokens (ground, ink, surface, copper)]
    └──required by──> [Case study pages — ORDANI, HR Equity, Passioneer, Akamai]

[Foyer ↔ theater View Transition]
    └──requires──> [Foyer mode tokens]
    └──requires──> [Theater mode tokens]
    └──requires──> [Route groups in App Router gating which palette is active]
    └──requires──> [Browser View Transitions API support (Next.js 15 wrapper)]

[<TitleCard /> component]
    └──requires──> [GSAP 3.12+ + ScrollTrigger]
    └──requires──> [Inter Display Bold via next/font/google]
    └──required by──> [ORDANI case study]
    └──required by──> [HR Equity Author case study]
    └──required by──> [Passioneer case study]
    └──required by──> [Akamai case study]
    └──required by──> [Work index page (TitleCard thumbnails)]
    └──optional in──> [Home page hero]
    └──doubles as──> [Open Graph image per case study]

[Lenis smooth scroll at layout root]
    └──must coexist with──> [<TitleCard /> GSAP ScrollTrigger]
    └──must coexist with──> [Native scroll for accessibility (reduced-motion bypass)]

[Contact form]
    └──requires──> [Resend transactional email integration]
    └──requires──> [Supabase contact archive table]
    └──requires──> [Two-business-day reply commitment (operational, not technical)]

[Case study pages]
    └──requires──> [MDX via @next/mdx]
    └──requires──> [Frontmatter schema enforced by harness mdx-frontmatter.sh]
    └──requires──> [Stills served via next/image with WebP/AVIF]
    └──requires──> [Image budget enforced by harness image-budget.sh (max 500KB)]

[Copy-lint at build]
    └──requires──> [Banned words list (30 from blueprint §8 + harness slop-words.txt)]
    └──requires──> [lib/copy-lint.ts TypeScript module]
    └──requires──> [instrumentation.ts hook in Next.js 15]
    └──enforces on──> [All MDX content]
    └──enforces on──> [Site copy (content/site.ts)]

[Premium portrait shoot]
    └──blocks──> [Home full-bleed portrait section]
    └──blocks──> [About vertical portrait section]
    └──out-of-band of dev──> [$500–$1,200 budget, 2-hour Oakland session]

[Performance budget (LCP < 1.8s, Lighthouse ≥ 95)]
    └──requires──> [Image budget compliance (500KB max)]
    └──requires──> [Font subsetting (Inter Display + Inter + Source Serif 4)]
    └──requires──> [Lazy-loading of stills below the fold in case studies]
    └──requires──> [Vercel Edge / static export where possible]

[A11y baseline (WCAG 2 AA, no serious/critical axe)]
    └──requires──> [Alt text on every image]
    └──requires──> [Visible focus states (copper underline lift, 1px→2px border)]
    └──requires──> [Reduced-motion bypass for TitleCard + View Transition]
    └──requires──> [Contrast ratio compliance in BOTH foyer and theater palettes]

[Theater mode case studies] ──conflicts──> [Dark mode toggle]
    (Mode is route-based, not user-controlled — toggle would dilute the foyer→theater metaphor)

[Single accent (copper)] ──conflicts──> [ORDANI sage outside /work/ordani]
    (Sage is scoped to a single route; enforced by design-tokens.sh harness hook)

[MDX content] ──conflicts──> [Headless CMS (Sanity/Contentful)]
    (Five pages don't warrant the overhead; MDX in repo is the chosen path)
```

### Dependency Notes

- **Foyer/theater palettes block all page work.** Cannot ship any page until the Tailwind v4 `@theme` block + route groups are in place. Day 1 of the 14-day timeline per blueprint §12.
- **`<TitleCard />` blocks all case studies + Work index thumbnails.** Per blueprint §12 timeline: Day 3 builds and tests TitleCard standalone before Day 9 ORDANI case study. Skipping this order means rebuilding case studies once the component lands.
- **View Transition handler blocks foyer↔theater dim.** Per blueprint §12 Day 2: nav, footer, and View Transition handler ship together. Without it, the foyer/theater split feels like two unrelated sites.
- **Resend integration blocks Contact page completion.** Form is broken without it. Single API key + one Resend "from" address.
- **Premium portrait blocks Home + About visual completeness.** Site can technically ship without it (placeholder), but blueprint §14 item 1 calls a v0 site without a real portrait a v0 site. Portrait shoot is OUT-OF-BAND of dev but ON-CRITICAL-PATH for launch quality.
- **Copy-lint blocks MDX merge.** Build fails on banned words; case-study writing must pass `copy-lint.sh` at the write boundary. This is a feature (not a bug) — it prevents slop in PRs.
- **Lenis + GSAP coexistence is a known integration risk.** Both touch scroll. Per blueprint §11: Lenis at layout root, GSAP ScrollTrigger only inside `<TitleCard />`. ScrollTrigger must be configured to read Lenis's scroll position (standard pattern, well-documented).
- **Theater mode and dark mode toggle are mutually exclusive.** Adding a toggle later would require refactoring the View Transition logic. Decide once: mode is route-based.

---

## MVP Definition

### Launch With (v1) — The 14-Day Build

Minimum viable site that ships the House Lights direction. Every item below is blocking for launch.

- [ ] **Foyer mode tokens (paper, ink, copper, rules) in Tailwind v4 `@theme`** — Day 1
- [ ] **Theater mode tokens (ground, surface, ink, ink-soft, rules) in Tailwind v4 `@theme`** — Day 1
- [ ] **Inter Display + Inter + Source Serif 4 via next/font/google** — Day 1
- [ ] **Route groups for foyer vs theater in App Router** — Day 1
- [ ] **Nav + footer in both modes** — Day 2
- [ ] **View Transition handler for foyer ↔ theater (600ms)** — Day 2
- [ ] **`<TitleCard />` reusable React component (GSAP pin + resolve)** — Day 3
- [ ] **Home page (foyer)** — Day 4
- [ ] **About page (foyer)** — Day 5
- [ ] **Work With Me page (foyer)** — Day 6
- [ ] **Contact page (foyer) + Resend integration + two-field form** — Day 7
- [ ] **Work index page (foyer) with TitleCard thumbnails** — Day 8
- [ ] **ORDANI case study (theater, full MDX per blueprint §9)** — Days 9–10
- [ ] **HR Equity Author case study (theater, anonymized per §10)** — Day 11
- [ ] **Passioneer case study (theater, short-form)** — Day 12
- [ ] **Akamai case study (theater, short-form)** — Day 12
- [ ] **One real Oakland portrait of Micah** — out-of-band, ON-CRITICAL-PATH
- [ ] **Lenis smooth scroll at layout root** — Day 13
- [ ] **Performance pass: LCP < 1.8s mobile, Lighthouse ≥ 95** — Day 13
- [ ] **Image optimization (WebP/AVIF, < 500KB each)** — Day 13
- [ ] **Copy-lint pass (zero banned words across all MDX + copy)** — Day 14
- [ ] **A11y pass (no serious/critical axe violations, AA contrast, focus states, reduced-motion bypass)** — Day 14
- [ ] **Visual QA at 390 / 768 / 1440 baselines** — Day 14
- [ ] **Open Graph image per case study (TitleCard composition)** — Day 14
- [ ] **Vercel deploy on micahjonesconsulting.com** — Day 14
- [ ] **Vercel Analytics + one custom event (case-study read-time)** — Day 14

### Add After Validation (v1.x)

Features to add once the site is live and the first 30 days of visitor behavior is in.

- [ ] **Static-to-video hover on Work index tiles** — add if v1 case-study read-through rate is < 40% on Work index
- [ ] **Buck-style "why this typeface" sentence in About** — add when typography upgrade lands (v2)
- [ ] **One more case study (a fifth project)** — add when next engagement closes
- [ ] **Newsletter signup at the bottom of About** — ONLY if Micah commits to a monthly cadence; otherwise it's a broken promise

### Future Consideration (v2+)

Defer until product-market fit is established or budget unlocks.

- [ ] **Söhne + Tiempos (Klim) self-hosted typography upgrade** — defer until ~$600 budget unlocks; document upgrade path
- [ ] **Animated portrait Ken-Burns subtle pan on Home hero** — defer until motion-engineer confirms it doesn't violate "one signature motion" rule
- [ ] **Per-case-study mini-site treatment (own typography per project)** — Immersive Garden / Buck pattern; defer until 6+ case studies exist
- [ ] **Email-based newsletter via Resend Audiences** — defer until Micah has 50+ subscribers organically and a content cadence

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Foyer mode tokens + theater mode tokens | HIGH | LOW | **P1** |
| Five-page IA scaffolding | HIGH | LOW | **P1** |
| `<TitleCard />` signature interaction | HIGH | HIGH | **P1** |
| Foyer ↔ theater View Transition | HIGH | HIGH | **P1** |
| ORDANI case study (full MDX) | HIGH | MEDIUM | **P1** |
| Premium portrait (real, Oakland-shot) | HIGH | MEDIUM | **P1** |
| Two-field contact form + Resend | HIGH | LOW | **P1** |
| Copy-lint at build time | MEDIUM | MEDIUM | **P1** |
| Performance budget compliance | MEDIUM | MEDIUM | **P1** |
| A11y WCAG 2 AA compliance | MEDIUM | MEDIUM | **P1** |
| Open Graph TitleCard per case study | MEDIUM | MEDIUM | **P1** |
| Lenis smooth scroll | MEDIUM | LOW | **P1** |
| Three other case studies (HR Equity, Passioneer, Akamai) | MEDIUM | MEDIUM | **P1** |
| Vercel Analytics + read-time event | LOW | LOW | **P1** |
| Static-to-video hover on Work index | LOW | MEDIUM | P2 |
| Buck-style typeface-reason sentence in About | LOW | LOW | P2 |
| Söhne + Tiempos upgrade | LOW | HIGH (budget) | P3 |
| Per-case-study mini-site art direction | LOW | HIGH | P3 |
| Newsletter signup at bottom of About | LOW | LOW | P3 |

**Priority key:**
- **P1**: Must have for launch — blocks the 14-day timeline
- **P2**: Should have, add post-launch in the first 30 days
- **P3**: Nice to have, future consideration (v2+)

---

## Competitor Feature Analysis

Mapped against the seven explicit reference sites called out in the prompt + blueprint §2.

| Feature | Clay (Tier 1 agency) | Active Theory (Tier 1 agency) | Locomotive (Tier 1 agency) | April Dunford (Tier 3 solo) | Frank Chimero (Tier 3 solo) | Pyer Moss (Tier 3 brand) | Bozoma Saint John (Tier 3 solo) | **Micah's approach** |
|---------|--------|--------|--------|--------|--------|--------|--------|--------|
| **Signature interaction** | Serif/sans pairing as voice | WebGL "trailer-on-hover" | Letter-shuffle pixel lazy-load | Two books as product objects | National 2 typography as proof | Bot-blocking + display contrast | Vertical word-stack hero | **TitleCard (vertical word-stack pin + resolve) — Bozoma-inspired** |
| **Mode (light/dark)** | Light foyer + light case studies | Uniform dark | Uniform light | Light + orange accent | Light editorial | Mixed (luxury fashion) | Mixed (light + portrait) | **Foyer light + theater dark, route-based** |
| **Accent color** | Restrained, multi-hue | One violet #A970FF | Black + white only | One orange | None (typographic) | None (typographic + B&W) | Black + white + photo | **One copper #C8542B + ORDANI sage scoped to one route** |
| **Portrait of founder(s)** | Senior team photos | None (work is the show) | None (work is the show) | None on home | None | None of founder | One bold portrait | **One Oakland portrait, full-bleed on Home, vertical on About** |
| **Case-study format** | "Artwork first" | WebGL R&D demos | Cinematic destinations | Two books = case studies | Essays linked from home | Editorial film releases | Profile + accolades | **Problem → Why it matters → Approach (4 numbered) → Outcome → Pull quote** |
| **IA length** | ~5–6 pages | ~5 pages | ~5 pages | ~4 pages | ~5 pages | E-commerce | ~3 pages | **5 pages + case studies** |
| **Client logo wall** | YES (FB, Slack, Google, Amazon, Snapchat) | NO | NO | NO | NO | NO (luxury, doesn't need it) | NO | **NO** — credits in two-line list inside About |
| **Newsletter signup** | NO | NO | NO | NO (book sales drive list) | NO | E-commerce email | NO | **NO** (v1); v2 only if cadence committed |
| **Cursor follower** | NO | NO (historically YES) | NO | NO | NO | NO | NO | **NO** (dated as of mid-2025) |
| **Blog / Now / Uses** | YES blog | NO | YES blog | NO | YES essays | NO | NO | **NO** (all three) |
| **Contact form fields** | Multi-field form | Email link | Multi-field form | Email link | Email link | E-commerce checkout | Email link | **Two fields (name + what you're working on)** |
| **Typography** | Serif + sans (Inter neighborhood) | Monument Grotesk + mono | PP Editorial New / Locomotive | Custom + sans | Klim National 2 | Display serif + sans | Display sans + serif | **Inter Display + Inter + Source Serif 4 (open path); Söhne + Tiempos v2** |
| **Performance budget** | High | LCP ~1.3s (with WebGL) | Awwwards-tier | Webflow standard | Static, fast | E-commerce performant | Standard | **LCP < 1.8s, Lighthouse ≥ 95 mobile** |

**Pattern read:** Micah's site borrows the foyer/theater split from nobody (it's the divergence), the TitleCard from Bozoma Saint John (recast as chapter card), the "one accent" discipline from Active Theory/basement/April Dunford, the "real portrait as trust signal" from Anton & Irene (refactored for a Black founder), the "artwork-first stills" treatment from Clay, the "problem-statement-first case study" from Instrument, and the "named-numbers voice" from basement + MetaLab. The combination is original; the parts are well-precedented.

---

## Sources

- **`.planning/PROJECT.md`** — Active Requirements (lines 18–42), Out of Scope (lines 43–61), Constraints (lines 86–97)
- **`.planning/blueprint.md`** §§1, 2, 3, 4 (and 4a/b/c/d/e/f), 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
- [Top 20 UX Designer Portfolio Websites in 2026](https://www.casestudy.club/journal/ux-designer-portfolio) — 2026 portfolio expectations
- [Consultant Websites: 20+ Inspiring Examples (2026)](https://www.sitebuilderreport.com/inspiration/consulting-websites) — consultant table-stakes
- [Best Portfolio Website Builders for Consultants in 2026](https://myseera.com/blog/best-portfolio-builders-consultants-2026) — credibility-first design patterns
- [Case Study Pages — Awwwards inspiration](https://www.awwwards.com/inspiration/case-studies-pages-basis) — 2025 case-study patterns
- [Case Study: Upperquad Website Redesign — Awwwards](https://www.awwwards.com/case-study-upperquad-website-redesign.html) — 2025 agency redesign benchmark

---
*Feature research for: premium solo-operator portfolio + case-study marketing site*
*Researched: 2026-05-14*
