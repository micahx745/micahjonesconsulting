# Harness research brief — making the website-building system top-tier

This is a research + recommendation brief about the **harness** I've built up across 21 iteration passes on micahjonesconsulting.com. The next project (Ordani marketing site) will be built with this same harness. Before that build starts, I want to harden the system: name what's already strong, name the gaps, and bring back specific recommendations for what to add so that future builds ship sites that genuinely convert at the premium operator / vertical-SaaS register.

Your job (whether you're a research-only session, cowork, or me in a fresh session): read this brief, do real web research where indicated, and return a prioritized roadmap of harness improvements.

---

## 1. The harness as it stands today

### 1.1 Tech stack (already wired, working)

- **Framework:** Next.js 16 App Router + React 19. `(foyer)` and `(theater)` route groups for distinct design registers under one app.
- **Styling:** Tailwind v4 with custom `@theme` tokens. Hand-written CSS for the editorial register (`app/globals.css`). No CSS-in-JS.
- **Animation:** `motion` v12 (`useSpring`, `useMotionValue`, `AnimatePresence`). GSAP 3.15 with ScrollTrigger + SplitText for scrub-pinned signature moments and char-stagger reveals. Lenis 1.3 for smooth-scroll. Native CSS `animation-timeline: view()` with `@supports` fallback. View Transitions API in use.
- **Fonts (all free, OFL/Apache):** Bricolage Grotesque (display), Source Serif 4 (editorial italic), JetBrains Mono (marginalia), Hanken Grotesk (body). Klim deferred (license cost).
- **Backend (when needed):** Supabase, Resend (email capture / notifications).
- **Deploy:** Vercel under `passioneer` team. Preview-then-alias workflow: deploy as preview, alias to a stable URL (`micahjonesconsulting.vercel.app`) so the operator's bookmark survives.
- **TypeScript:** strict. `tsx` for build-time scripts.

### 1.2 Design pattern library

Documented patterns that survived iteration and are reusable:

- **Color Worlds.** Each section sets `data-world="terracotta|bone|petrol|espresso"` on itself. A `<WorldSwitcher>` mounted at the root observes sections via IntersectionObserver, picks the section closest to viewport center via a `pickCentered()` helper, and cross-fades the page palette. Cross-section transitions feel cinematic without per-page palette changes.
- **Two-register architecture.** `(foyer)` carries the marketing/home register (terracotta cream, Bricolage 800 ALL CAPS display). `(theater)` carries the case-study register (obsidian, copper accent, Source Serif 4 italic, film-grain overlay). The bifurcation is intentional — like a magazine cover vs an inside spread.
- **Hand-drawn marks.** SVG primitives — `HandCircle`, `HandUnderline`, `HandArrow`, `Signature` — with stroke-dashoffset draw-in animations. Pass-20 refined HandCircle: dual-pass paths (primary + overshoot stroke that closes past the start), turbulence-filter ink grain, `useId`-hashed filter IDs (prevents multiple instances sharing one noise pattern).
- **Magnetic CTAs.** `<MagneticArea>` wrapper uses `useSpring` (mass 0.2 / damping 30 / stiffness 150), 0.3× pull. Applied to revenue-generating primary CTAs (Book a call), NOT to ghost or secondary CTAs.
- **Rotating-word hero.** Two-line H1 with the second line carrying a `<span className="cw-roll">` masked window cycling through 4 italic nouns (`product. / position. / launch. / engine.`). `setInterval` drives inline transform; IO + visibilitychange pause when offscreen / tab-hidden.
- **SplitReveal.** GSAP SplitText char-stagger (stagger 0.012, duration 0.65). Used for section titles that earn cinematic entrance.
- **One signature scroll moment per site.** The Ordani section uses GSAP ScrollTrigger to pin for ~100vh of scroll while content reveals in a scrubbed timeline (tag → title scales 0.85→1 → lede slides up → form → footnote). One per page, never two — pattern owned by `motion-engineer` agent.
- **Editorial specimen card.** Where a case study has no real image, the placeholder card is a typeset block with a thick 4px left rule (magazine pull-quote register) + small mono eyebrow + display-italic title + mono date. Reads as designed restraint, not as missing asset.
- **Service marquee with proper spacing.** CSS scoped to direct children only — `track > span > span` — never descendant `span` (which compounds margins on nested spans). 14px word-margin, 4-12px dot-padding.
- **Operating Principles section.** Bone-world section with 4-5 short numbered statements about how the work happens. Gives buyers language to repeat internally. Standard for premium boutique-consulting register.
- **Contents-page revenue index.** Big figure + dek + numbered `<ol>` of named exits with right-aligned date column. Editorial-magazine pattern instead of "two cards in a row."

### 1.3 Named components (file paths the next session can grep)

- `components/color-worlds/Hero.tsx` — rotating-word display H1
- `components/color-worlds/Nav.tsx` — focus-trap modal overlay menu, mix-blend-difference wordmark
- `components/color-worlds/WorldSwitcher.tsx` — cross-fades data-world palettes
- `components/color-worlds/SplitReveal.tsx` — GSAP SplitText char-stagger
- `components/color-worlds/OrdaniSticky.tsx` — the one pinned scroll moment
- `components/color-worlds/RevenueTick.tsx` — count-up + editorial index
- `components/color-worlds/Grain.tsx` — 4% film-grain SVG overlay
- `components/motion/MagneticArea.tsx` — pointer-spring magnetic wrap
- `components/hand/HandCircle.tsx`, `HandUnderline.tsx`, `HandArrow.tsx`, `Signature.tsx`
- `components/CaseStudyStill.tsx` — image-or-typeset-specimen-card
- `components/TitleCard.tsx`, `Dek.tsx` — case-study page primitives
- `components/CaseStudyReadTracker.tsx` — analytics tracking 90% scroll depth
- `components/view-transition-link.tsx` — View Transitions API wrapper
- `components/LenisProvider.tsx` — smooth-scroll mount
- `components/RevealMount.tsx` — adds `.cw-js-reveals` class on JS-ready (for progressive enhancement)

### 1.4 Quality gates (build-time)

- **Copy-lint hook.** `lib/copy-lint-cli.ts` scans every committed file for ~30 banned buzzwords (the standard premium-portfolio ban-list — empowerment-flavor verbs, hype adjectives, superlative-rank claims, cliche idioms, etc.). Build refuses to ship if hit. Skill at `premium-web:copy-lint-rules` is the source of truth.
- **Frontmatter Zod validation.** `lib/case-study-schema.ts` validates `content/work/*.mdx` frontmatter at build. Throws clear errors on schema violations.
- **TypeScript strict.** `npx tsc --noEmit` is part of the pre-commit chain.
- **Sentence-length rules** (not enforced by hook but in the brand guide): average 14 words / hard cap 25 / one adjective per noun.

### 1.5 Quality gates (review-time)

- **Cowork persona reviews.** Adversarial review prompts written to `.planning/prompts/*.md`. The operator pastes a one-line reference into a separate Claude Code window; cowork executes the review and writes output to `.planning/reviews/REVIEW-PASS-N-*.md`. Personas evolve per round (Maya/David/Marcus/Lena/Tasha — fast-decision buyer, technical founder, design judge, strategy partner, peer/identity).
- **Claude Chat audits.** For dense copy work, the operator pastes a comprehensive brief into Claude Chat (claude.ai web) and receives line-by-line critique. Pass-21 used this pattern to get 15 specific copy recommendations.
- **Plan mode.** For non-trivial implementations, `EnterPlanMode` blocks edits until a plan file is written and approved via `ExitPlanMode`. The plan lives at `~/.claude/plans/*.md`.
- **TaskCreate / TaskUpdate.** Per-pass task tracking with `in_progress` / `completed` status. Visible in the conversation as a progress chip.

### 1.6 Process patterns

- **Pass-based iteration.** Each pass is a discrete commit with a descriptive subject (`feat(pass-21): ...`). Multi-section commit messages name every change. ~20+ passes shipped on micahjonesconsulting.com.
- **Plan files in `.planning/`.** `prompts/` for briefs sent to cowork/Claude Chat; `reviews/` for the outputs they return; `plans/` for plan-mode artifacts.
- **Defensive Edit hygiene.** After two stray-character incidents (Cyrillic + "seudo") in Pass-12, the operator grep-`[^\x00-\x7F]` checks page.tsx after every JSX edit batch.
- **Verify before claiming complete.** Run copy-lint + grep + (where possible) `npx tsc --noEmit` before commit. Never claim "done" without evidence.
- **Operator-decision questions.** Use `AskUserQuestion` for fork-in-the-road decisions (3 services vs 4, where to place Operating Principles, etc.). Don't make unilateral framing calls.
- **Phone-friendly back-and-forth.** Operator often reviews on phone. Pasted prompts and one-line cowork pointers are the standard delivery format.

### 1.7 Voice / copy doctrine

- **Operator-first, not consultant-first.** Consultants advise; operators own.
- **First-person singular.** "I owned the positioning research" — not "we" or third-person.
- **Specific over abstract.** Named customers (TD Bank, Deutsche Bank, NIH, Peoples Natural Gas), named numbers ($150K deal-size move), named years.
- **Earned-not-claimed.** Show the work; don't announce the brilliance.
- **Restraint over abundance.** Three services beats seven. Two paragraphs beats five.
- **Sharp verbs.** Build, ship, rewrite, repositioned, moved, anchored, partnered.
- **Voice references benchmarked against:** Rauno Freiberg's craft posts, Stripe Press marginalia, The Gentlewoman contributor credits, Pinkerton Zweck editorial, Klim foundry specimens, Linear About page, Jonathan Hoefler portfolio captions.

### 1.8 Conversion patterns proven in production

- Dual CTA in hero (primary magnetic + ghost secondary).
- Revenue figure + named institutional customers at the top of the credibility section.
- Live-beta stat pills tagrow (Live beta · 14 practices · Hundreds of users active).
- Engagement-tier shapes surfaced WITHOUT prices (Advisory / Project / Retainer / Embedded).
- "Discovery call" framing for the first conversion (not "demo," not "trial").
- Operating Principles section as the boutique-consulting signature.
- Case-study CTAs as "See the engagement →" / "See the receipts →" — not "Learn more."
- Footer CTA reframes the verb to the buyer's action ("NAME THE PROBLEM →") rather than the operator's ("LET'S BUILD →").

---

## 2. What the top tier looks like in 2026 — research targets

For the next two builds (Ordani marketing site + future engagements), the harness needs to match the top tier. Research the following and report what the bar actually is right now:

### 2.1 Operator + boutique-consulting portfolios
Top 20 fractional executive sites. The hero patterns, the CTA verbs, the service-portfolio shapes. Quote sites by name. What's working in 2026 that micahjonesconsulting.com doesn't yet do?

### 2.2 Vertical-SaaS marketing sites
The Ordani site needs to land as vertical SaaS for birth workers. Reference sites to study: Linear, Vercel, Resend, Cal.com, Pico, Posthog, Stripe, Notion product pages, Superhuman, Plaid, Whoop, Oura, Aura, Glow, Ovia. What patterns do the best vertical-SaaS sites use that the operator harness doesn't have a primitive for yet?

### 2.3 The conversion bar
What conversion rates do the best operator portfolios actually achieve? What rates do the best vertical-SaaS marketing sites achieve at the hero CTA, at scroll-to-pricing, at email-capture? Numbers, not just patterns. Web-search for 2025-2026 CRO benchmarks at the boutique-consulting and seed/Series-A vertical-SaaS tiers.

---

## 3. Known gaps in the harness

### 3.1 Missing component primitives

The harness has portfolio primitives but lacks several that vertical-SaaS marketing needs:

- **Pricing table component.** No primitive exists. Boutique-consulting sites avoid prices; SaaS sites need them. Required for Ordani.
- **FAQ component with structured-data markup.** Required for SEO; not currently a primitive.
- **Testimonial / pull-quote for the foyer register.** Theater has `<PullQuote>` for case studies; foyer doesn't have a matching primitive for the marketing register.
- **Phone / mobile mockup primitive.** Need to show a SaaS UI in a phone frame. No component exists.
- **Customer-logo strip.** A real one — the kind that shows recognizable brand wordmarks/logos with hover-pause. The harness shipped one then killed it (it read filler when there were no logos). Need a better version for when the operator HAS real logos.
- **Stat counter (animated count-up).** RevenueTick is one specific instance. Generalize into a reusable primitive.
- **Email-capture / waitlist form.** OrdaniBetaForm is hardcoded; needed as a reusable primitive with Resend integration.
- **Anchor-link navigation with scrollspy.** Highlight the active section as the user scrolls. Not currently a primitive.
- **Reading-progress indicator** (for long-form pages, case studies, blog posts).
- **Toast / notification system.** No primitive exists; needed for form submissions.
- **Dialog / modal system.** Nav overlay is the only modal pattern; needed for video-launchers, image lightboxes, deep-detail modals.
- **Video embed primitive.** Premium video player (YouTube/Vimeo with custom controls, optional autoplay-on-scroll). None exists.
- **Tabs / segmented control.** For pricing pages with monthly/annual toggle, for feature comparisons.
- **Accordion (with structured-data FAQ).** Same as FAQ above.
- **Skeleton loading states.** Needed if any data fetching happens on the marketing site.

### 3.2 Missing motion + visual capability

- **3D / WebGL.** Three.js + React Three Fiber not wired. Spline embeds not evaluated. For sites that need a hero with depth (some 2026 operator portfolios do), the harness has no path.
- **Lottie animations.** No `lottie-react` integration. Some marketing sites use Lottie for product-feature loops where GSAP is overkill.
- **Theatre.js / advanced motion timelines.** GSAP ScrollTrigger handles scrub-pinned signature moments, but for keyframed multi-element timelines (more complex than the Ordani sticky), Theatre.js is the 2025-2026 standard.
- **CSS scroll-driven animations (`animation-timeline: view()`).** Partially used. The 2026 baseline is to use these natively where supported and fall back to GSAP only when needed. Audit and update.
- **Variable fonts at scale.** Currently use static cuts. Variable axes (weight / width / slant) can produce more expressive typography in a smaller binary. Research what's worth incorporating.
- **CSS Houdini paint worklets.** Marginal. Probably skip but worth knowing.
- **`view-transition-name` for crisp page-to-page transitions.** Used minimally; could be applied to case-study hero → case-study page transitions for cinematic effect.

### 3.3 Missing analytics + CRO

- **GrowthBook / feature-flag system.** Mentioned in early planning artifacts; not wired. Required for A/B testing CTAs, hero variants, pricing pages.
- **Conversion analytics beyond Vercel Analytics.** Need to track per-CTA conversion, scroll-depth-to-CTA-click, form-abandon points.
- **Session replay (PostHog, FullStory, etc.).** Currently none. Premium-buyer sessions deserve replay for qualitative review.
- **Heatmap / scroll-tracking.** Not wired.
- **Form-analytics on email-capture.** Not wired.
- **Lighthouse CI.** Currently manual; should be a CI gate.

### 3.4 Missing process maturity

- **axe-core / Lighthouse CI in GitHub Actions.** Manual today; should run on every PR.
- **Visual regression testing (Percy, Chromatic, Playwright snapshots).** None today. The persona-review process catches visual issues but not consistently across deploys.
- **Performance budgets (Core Web Vitals thresholds).** Not enforced.
- **Image optimization pipeline.** `next/image` is in use but no audit of source images for AVIF/WebP, no automated compression on commit.
- **Sitemap automation.** `app/sitemap.ts` exists but isn't fully wired to new routes (the new `/services` and `/services/ai-engineering` pages may not be in sitemap yet — verify).
- **OG image auditing.** OG images exist but no automated check that every page has a non-default OG.
- **i18n / locale system.** Not needed for the portfolio but the Ordani marketing site may need it eventually.
- **Blog / CMS primitives.** No blog scaffolding. Marketing sites at scale need a `/journal` or `/notes` surface. Decide between MDX (current pattern), Sanity, Contentful, or markdown-only.

---

## 4. Research asks — return prioritized recommendations

For each research area below, return:
- **What the top tier looks like in 2026** (concrete: named libraries, named patterns, named reference sites).
- **What the harness should add** (specific component / library / process).
- **Expected conversion or quality impact** (qualitative — "this would lift hero-to-CTA by ~X%" or "this would close the most common a11y gap").
- **Implementation cost** (Time + dependency complexity).
- **Priority tier** (top-3 / next-7 / speculative).

### Research vector A: Conversion patterns (highest priority)

2024-2026 CRO findings that have been actually validated. The kind of changes that move conversion at the boutique-consulting tier and at the seed-to-Series-A vertical-SaaS tier. Heatmap-validated CTA placement. Above-fold hero patterns. Sticky-nav vs no-nav. Modal-vs-page CTAs. Tier presentation. Pricing-page best practices.

### Research vector B: Component primitives missing from the harness

Reference component libraries that work well with the existing shadcn/Tailwind v4 foundation. Specific recommendations for: pricing tables, FAQ with structured data, testimonials, phone mockups, logo strips, stat counters, waitlist forms, scrollspy navs, video embeds, modals/dialogs, toasts.

### Research vector C: Motion + visual capability

Evaluate against the current motion v12 + GSAP + Lenis + CSS-animation-timeline mix. What library / pattern fills which gap? Specific question: is **Theatre.js** worth adding for keyframed timelines beyond ScrollTrigger? Is **React Three Fiber** worth adding for hero depth? Is **Lottie** worth adding for product-feature loops?

### Research vector D: Premium typography + visual register

The harness uses Bricolage + Source Serif 4 + JetBrains Mono. Evaluate against 2026 alternatives. Are there free/OFL pairings that read more premium for the SaaS register specifically? Variable-font axes worth exploring? Klim is paid (~$600); is it worth the spend now or hold?

### Research vector E: Analytics + experimentation stack

GrowthBook vs Statsig vs PostHog vs LaunchDarkly for the operator's scale. PostHog vs Mixpanel vs Plausible vs Vercel Analytics for product analytics. Specific recommendation: which 2-3 services pair into a stack that handles A/B testing, session replay, conversion analytics, and form-analytics without paying for redundancy?

### Research vector F: CI + quality gates

Specific CI configs to add: Lighthouse CI thresholds, axe-core automation, Playwright visual regression, image-budget enforcement, OG-image audit, sitemap-completeness check. Reference real GitHub Action workflows from sites that have been audited at the top tier.

### Research vector G: Vertical-SaaS marketing-site specifics

For the Ordani build specifically: what patterns are working for vertical-SaaS marketing sites in 2026 that the current operator-portfolio harness doesn't yet have a primitive for? Reference at least 5 specific sites (Linear, Resend, Cal.com, Pico, plus 1-2 healthtech) and name the pattern Ordani should adopt from each.

### Research vector H: The Ordani-specific dual-audience challenge

The Ordani marketing site has two buyers: birth workers (B2B vertical SaaS) and expecting mothers (future B2C marketplace). Most marketing sites address one audience. Reference dual-audience marketing sites that do this well and the patterns they use to keep the site coherent without diluting either pitch.

---

## 5. Output format expected

Return a single markdown document with:

1. **Executive summary.** What the top 3 highest-impact additions to the harness would be, in priority order.
2. **Per-vector findings.** For each of A–H above, the top-tier-2026 finding + the harness add + the expected impact + the cost + the tier.
3. **Roadmap.** A 10-item ordered list: the next 10 additions to the harness, in priority order, with cost annotations.
4. **Reference appendix.** Every named library, named site, named pattern, with a URL. The operator should be able to scan the appendix and decide what to pursue without re-doing the research.
5. **Anti-pattern check.** Any patterns the harness already AVOIDS that the operator should keep avoiding (corporate-buzzword copy, etc.). One paragraph confirming the existing discipline survives the additions you're proposing.

Target length: 2000-3500 words.

---

## 6. Constraints

Things to NOT propose:

- Don't propose paid fonts that cost more than $500/year (Klim is borderline; Pangram Pangram etc. are paid; default to free OFL).
- Don't propose dependencies that would add more than ~150KB gzipped to the marketing-site bundle without naming the trade.
- Don't propose abandoning the existing patterns that are working (Color Worlds, two-mode architecture, hand-drawn marks, magnetic CTAs, Operating Principles section, engagement-tier-shape pricing, discovery-call CTA). These are baseline; build on top.
- Don't propose anything that breaks the banned-word lint or the editorial voice doctrine (operator-first, sharp verbs, restraint).
- Don't propose dark patterns. No exit-intent modals, no fake countdown timers, no scroll-jacking that disorients.

Things to BE careful about:

- The operator builds on Windows. Some node_modules quirks specific to Windows have bitten the project (e.g., a corrupted `tsc.js` install in Pass-11). Recommend tooling that's known to work cleanly on Windows + WSL.
- The operator works on phone often. Tooling that requires Windows-only GUI is fine for the operator's local machine but the build pipeline should be CLI-driven.
- Performance is brand. The audience includes mothers in active labor (Ordani case). Anything that costs Web Vitals points needs to earn them back.

---

## 7. One last thing

The harness has been built up over 21 iteration passes. Most of what's in section 1 of this brief was learned the hard way — typos, dead selectors, banned-word incidents, register-mismatches between sections, View-Transitions snapshot races. The point of this research isn't to add complexity for its own sake. The point is to identify the additions that close conversion gaps or quality gaps that the current system can't close on its own.

Bias toward: **fewer, sharper additions.** Three primitives shipped well beats ten primitives half-shipped. Pick what would move the actual numbers.

When you're done, the operator should be able to read your output and know exactly what to add to the harness before the Ordani marketing site build starts, and why each addition earns its place.
