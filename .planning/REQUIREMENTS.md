# Requirements: micahjonesconsulting (House Lights)

**Defined:** 2026-05-14
**Core Value:** A primary-audience visitor — a Black HR consultant, a doula, a birth worker — feels welcomed in the first ten seconds and stays through one case study.

Derived from `.planning/blueprint.md` (verbatim source-of-truth) + the 4 research files in `.planning/research/`. All 22 table-stakes features and 14 P1 differentiators are included; anti-features are listed under Out of Scope with reasoning.

---

## v1 Requirements

### Scaffold & Infrastructure

- [x] **SCAFF-01**: Next.js 16.2 App Router project initialized with TypeScript strict mode
- [x] **SCAFF-02**: Tailwind v4 with `@theme` block in `app/globals.css` (no `tailwind.config.ts`); PostCSS plugin via separate `@tailwindcss/postcss` package
- [x] **SCAFF-03**: `next.config.ts` enables `experimental.viewTransition: true` and wraps with `withMDX()`
- [x] **SCAFF-04**: `next/font/google` loads Inter Display, Inter, Source Serif 4 (with `axes: ['opsz']`); CSS variables re-declared inside `@theme` block
- [x] **SCAFF-05**: `mdx-components.tsx` at repo root (not inside `app/`)
- [x] **SCAFF-06**: `instrumentation.ts` hook runs build-time copy-lint scan across all MDX + component string literals + frontmatter + metadata exports
- [x] **SCAFF-07**: Project CLAUDE.md captures stack rules, single-accent rule, single-motion rule, mode-by-route rule, banned-words discipline
- [x] **SCAFF-08**: `.gitignore` excludes `.next/`, `node_modules/`, `.env.local`, `.vercel/`, `qa/current/` (visual-qa diffs)

### Design Tokens (Foyer + Theater)

- [x] **TOKEN-01**: All 11 color tokens from blueprint §4b defined as CSS custom properties in `@theme` block: `--foyer-paper #F5EFE4`, `--foyer-ink #1A1816`, `--foyer-ink-soft #3A3631`, `--theater-ground #0D0D0F`, `--theater-surface #16161A`, `--theater-ink #EAE6DD`, `--theater-ink-soft #9C988F`, `--accent-copper #C8542B`, `--accent-copper-deep #8E3A1E`, `--ordani-sage #5E7158`, `--rule-foyer #D9D2C4`, `--rule-theater #2A2A30`
- [x] **TOKEN-02**: Group layouts stamp `data-mode="foyer"` / `data-mode="theater"` attributes (no `ThemeProvider`, no `useTheme()` hook)
- [x] **TOKEN-03**: Tailwind theme reads mode via `[data-mode="foyer"]` / `[data-mode="theater"]` attribute selectors
- [x] **TOKEN-04**: Body text emphasis uses `--accent-copper-deep` (5.4:1 vs paper, passes WCAG AA); plain `--accent-copper` only for large text (≥24px) and non-text UI per pitfall B1
- [x] **TOKEN-05**: `--ordani-sage` permitted only inside `content/work/ordani.mdx` and its `<PullQuote>` consumer; enforced via `design-tokens.sh` allowlist extension
- [x] **TOKEN-06**: 12-column grid, 80px gutter desktop / 16px mobile; 4px base spacing rhythm; 68ch body measure, 28ch sidenotes; 128px / 64px page padding per blueprint §4e

### Foyer Mode (Public Rooms)

- [x] **FOYER-01**: Route group `(foyer)` with shared `layout.tsx` stamping `data-mode="foyer"`
- [ ] **FOYER-02**: Home page (`/`) — hero positioning sentence, full-bleed portrait with copper rule, three-card selected-work strip, About teaser, Work With Me teaser, Contact CTA
- [ ] **FOYER-03**: Home hero copy verbatim per blueprint §8: "I help operators ship the work the rest of their org keeps stalling on."
- [ ] **FOYER-04**: About page (`/about`) — two-column layout, left 8-col long-form, right 4-col vertical portrait + credits list (Guardicore/Akamai · Flexport · SurveyMonkey · Cuebiq), Oakland family context paragraph, three numbered values (ship the work / trust the operator / show the receipts)
- [ ] **FOYER-05**: About paragraph verbatim per blueprint §8 (150 words)
- [ ] **FOYER-06**: Work With Me page (`/work-with-me`) — three stacked engagement cards (Strategy Sprint 2-4wk / Embed 8-12wk / Build custom) with one-paragraph descriptions; four-question FAQ; single CTA to contact
- [ ] **FOYER-07**: Contact page (`/contact`) — two-field form (name + what you're working on), Resend Server Action sends transactional reply, Supabase insert archives, two-business-day reply commitment, direct email `hello@micahjonesconsulting.com` as alternate
- [ ] **FOYER-08**: Work index page (`/work`) — preview of all case studies as TitleCard thumbnails (3-6 word stacks), links to `/work/[slug]`
- [x] **FOYER-09**: Foyer nav: five labels (work · about · work with me · contact); copper underline lifts 4px on hover with 200ms cubic-bezier(0.2, 0.8, 0.2, 1)
- [x] **FOYER-10**: Foyer footer: contact pointer + email + two-business-day reply promise

### Theater Mode (Case Studies)

- [x] **THEATER-01**: Route group `(theater)` with shared `layout.tsx` stamping `data-mode="theater"`
- [x] **THEATER-02**: Dynamic case-study route `(theater)/work/[slug]/page.tsx` reads MDX from `content/work/`
- [x] **THEATER-03**: Theater nav: inverted (copper on theater ground), [BACK TO FOYER ↗] link
- [ ] **THEATER-04**: Case-study render order: TitleCard → Dek (Source Serif 4) → Hero still → Problem → Why it matters → Approach (4 numbered subsections) → What it became (stills) → Outcome → PullQuote → [NEXT WORK ↘] / [BACK TO FOYER ↗]
- [ ] **THEATER-05**: Captioned stills component renders dashboard screenshots with 2px warm off-white inner border + 4% film-grain overlay; caption format "name — date" per blueprint §4c

### Foyer ↔ Theater View Transition

- [ ] **TRANS-01**: Root `app/layout.tsx` wraps `{children}` in `<ViewTransition>` from `react` (not `next`)
- [ ] **TRANS-02**: `app/globals.css` defines `::view-transition-old(root)` and `::view-transition-new(root)` 600ms keyframes — cream paper recedes (foyer→theater) and theater ground rises (foyer→theater)
- [ ] **TRANS-03**: `@media (prefers-reduced-motion: reduce)` kill-switch on `::view-transition-*` pseudo-elements (`animation: none !important`) per pitfall B2 — View Transitions does NOT auto-honor reduced motion
- [ ] **TRANS-04**: Feature-detect wrapper (`document.startViewTransition`) falls through to instant nav on Firefox <144 and Safari <18 per pitfall D1
- [ ] **TRANS-05**: Foyer↔theater transition verifiable in DevTools Performance panel as a single browser View Transition (600ms ease-in-out)

### Signature Motion: TitleCard

- [ ] **MOT-01**: `components/TitleCard.tsx` is a `'use client'` component using `@gsap/react`'s `useGSAP()` hook with `scope: ref`
- [ ] **MOT-02**: TitleCard accepts a 3-6 word array prop (validated via Zod or runtime check)
- [ ] **MOT-03**: TitleCard renders vertical word stack at 96px Inter Display 700+; pins for ~600ms on scroll-enter; resolves into smaller caption + first still cross-fade
- [ ] **MOT-04**: GSAP ScrollTrigger registered at module level inside TitleCard file only — no GSAP imports anywhere else
- [ ] **MOT-05**: TitleCard reduced-motion branch: if `prefers-reduced-motion: reduce`, render the resolved (final) state immediately with no pin, no scrub
- [ ] **MOT-06**: TitleCard mobile reflow: 64px word stack, same pin-resolve behavior, verified on iOS Safari with Lenis active
- [ ] **MOT-07**: TitleCard usable as OG image source via Vercel OG (`@vercel/og`) — each case-study route exports `opengraph-image.tsx` composing the TitleCard

### Smooth Scroll: Lenis

- [ ] **LENIS-01**: `components/LenisProvider.tsx` mounts `<ReactLenis root>` in root `app/layout.tsx` (not in any group layout — group layouts unmount across cross-group navigation)
- [ ] **LENIS-02**: Lenis configured with damping ~0.08 ("light, not buttery" per blueprint §4d)
- [ ] **LENIS-03**: Lenis `syncTouch: false` per pitfall D2 — iOS gets native momentum; CLAUDE.md documents this to prevent future "fix" attempts
- [ ] **LENIS-04**: Lenis ↔ ScrollTrigger bridge: `lenis.on('scroll', ScrollTrigger.update)` so TitleCard pin stays accurate
- [ ] **LENIS-05**: Lenis disabled for users with `prefers-reduced-motion: reduce`

### Case Studies (Content)

- [ ] **CASE-01**: MDX frontmatter Zod schema in `lib/case-study-schema.ts`: required fields `title`, `dek`, `role`, `tools[]`, `year`, `status`, `hero?`, `client?`
- [ ] **CASE-02**: Build-time frontmatter validation via `instrumentation.ts` (fails build with line numbers on missing fields); harness `mdx-frontmatter.sh` validates at write boundary
- [ ] **CASE-03**: `content/work/ordani.mdx` written **verbatim** per blueprint §9 — CDC stats (44.8 per 100,000, ~3.15x rate vs 14.2), beta-user quote ("It is the first piece of software..."), 22 birth workers, 91% intake completion, 14 active practices — all attested numbers, no edits
- [ ] **CASE-04**: `content/work/hr-equity-author.mdx` written per blueprint §10 — anonymized HR consultant + author, 25-page playbook, two platforms 4x third, RFP wins
- [ ] **CASE-05**: `content/work/passioneer.mdx` written — AI content platform, short-form (problem / approach / outcome only)
- [ ] **CASE-06**: `content/work/akamai.mdx` written — Guardicore/Akamai positioning research, $150K avg deal-size move
- [ ] **CASE-07**: MDX components: `<TitleCard>`, `<Dek>`, `<CaseStudyStill>`, `<PullQuote>`, `<CopperRule>` — all registered in `mdx-components.tsx`
- [ ] **CASE-08**: PullQuote in Source Serif 4 italic with copper underline-grow animation on scroll-into-view (2s ease)
- [ ] **CASE-09**: Case-study stills server with `next/image` AVIF/WebP, max 500KB enforced by harness `image-budget.sh`
- [ ] **CASE-10**: `lib/case-studies.ts` reads frontmatter via `gray-matter` for index/OG (Pattern hybrid per architecture research)

### Voice & Copy

- [ ] **COPY-01**: `lib/banned.ts` exports the 30-word banned list (blueprint §8 top-9 + harness defaults: unlock, drive, leverage, elevate, synergy, transformative, game-changing, best-in-class, at the intersection of, seamless, seamlessly, cutting-edge, revolutionary, world-class, next-generation, holistic, robust, innovative, dive deep, circle back, low-hanging fruit, move the needle, make an impact, delight users, craft experiences, passionate about, obsessed with, journey, solutions, empower)
- [ ] **COPY-02**: `lib/copy-lint.ts` exports a TypeScript scanner that finds banned words in any string; uses word-boundary regex
- [ ] **COPY-03**: Build fails if banned words appear in `content/**/*.mdx`, `app/**/*.tsx` string literals, `app/**/page.tsx` `metadata` exports, or `content/site.ts` globals — with file and line number
- [ ] **COPY-04**: Voice rules enforced manually by `copy-editor` subagent on every prose-touching PR: ≤25-word sentences, first person (I/we), active voice, named numbers with attribution
- [ ] **COPY-05**: Em-dashes capped at one per page (em-dashes are an AI tell)

### Performance

- [ ] **PERF-01**: LCP ≤ 1800ms on mobile per blueprint §11 and harness `brand.json`
- [ ] **PERF-02**: INP ≤ 200ms per harness budget
- [ ] **PERF-03**: CLS ≤ 0.05 per harness budget
- [ ] **PERF-04**: Lighthouse Performance score ≥ 95 on mobile (harness `perf-budget.sh` runs `chrome-devtools-cli` on build)
- [ ] **PERF-05**: All `public/*.{jpg,jpeg,png,webp,avif}` ≤ 500KB enforced by `image-budget.sh`
- [ ] **PERF-06**: `next/font` `adjustFontFallback: true` for all three families; verify `size-adjust` appears in built `@font-face` rules per pitfall A1
- [ ] **PERF-07**: GSAP imports quarantined to `components/TitleCard.tsx` — no GSAP in other route bundles
- [ ] **PERF-08**: Case-study stills below fold use `loading="lazy"` (above-fold do not)
- [ ] **PERF-09**: Bundle analyzer (`@next/bundle-analyzer`) runs in CI; first-load JS ≤ 90KB on foyer routes

### Accessibility

- [ ] **A11Y-01**: Zero serious/critical axe violations on any route (harness `a11y-reviewer` subagent verifies)
- [ ] **A11Y-02**: All interactive elements have visible focus rings (copper outline-offset 2px in foyer; bone outline in theater)
- [ ] **A11Y-03**: All images have `alt` attributes; decorative images `alt=""`
- [ ] **A11Y-04**: Color contrast meets WCAG AA on every text/background pair (body text uses `--accent-copper-deep` not `--accent-copper` per TOKEN-04)
- [ ] **A11Y-05**: `prefers-reduced-motion: reduce` honored on TitleCard, View Transitions, Lenis, pull-quote underline-grow, hover lifts (per pitfalls B2, A4, MOT-05, LENIS-05)
- [ ] **A11Y-06**: Keyboard nav: tab order matches visual order; skip-to-content link in nav
- [ ] **A11Y-07**: `aria-label` not duplicated on `<Link>` elements wrapping visible text per harness `a11y-reviewer` common-fixes guide

### Responsive Design

- [ ] **RESP-01**: Mobile (390×844 baseline) re-composes — no horizontal scroll, TitleCard reflows to 64px, portrait crop tightens
- [ ] **RESP-02**: Tablet (768×1024 baseline) — two-column About reflows to stacked
- [ ] **RESP-03**: Desktop (1440×900 baseline) — full 12-column grid with 80px gutters
- [ ] **RESP-04**: Visual baselines captured at 390/768/1440 for every route via harness `visual-qa` subagent (Chrome DevTools MCP)

### Open Graph / SEO

- [ ] **OG-01**: Per-route `opengraph-image.tsx` generates dynamic OG image via `@vercel/og`; case-study OG uses TitleCard composition
- [ ] **OG-02**: Per-route `metadata` export sets title (≤60 chars), description (130-155 chars, lead-with-noun-not-action per blueprint §8), `openGraph`, `twitter`
- [ ] **OG-03**: `app/sitemap.ts` exports all foyer routes + every case-study slug
- [ ] **OG-04**: `app/robots.ts` allows Googlebot; disallows `GPTBot` and `Google-Extended` from `/work/*` per pitfall E3 (ORDANI sensitive content)

### Analytics

- [ ] **ANALY-01**: `@vercel/analytics` + `@vercel/speed-insights` mounted at root layout
- [ ] **ANALY-02**: Custom event `case_study_read_complete` fires when scroll depth ≥ 90% on any `/work/*` route, once per session
- [ ] **ANALY-03**: No third-party analytics (no Mixpanel, no Segment, no PostHog, no GA4) per blueprint §11

### Deployment

- [ ] **DEPLOY-01**: Vercel project linked; production domain `micahjonesconsulting.com` configured with DNS
- [x] **DEPLOY-02**: Resend domain verification (DNS TXT) completed Day 1 of build per pitfall research (not Day 14)
- [ ] **DEPLOY-03**: Supabase project linked with `contact_messages` table + RLS policies + service-role key in Vercel env
- [ ] **DEPLOY-04**: Environment variables in Vercel: `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **DEPLOY-05**: Preview deploys gated by `/premium audit` (harness) + GitHub Actions checks (typecheck, lint, build)
- [ ] **DEPLOY-06**: Production deploy via `/premium ship` after all `/premium audit` checks pass

### Harness Integration

- [x] **HARN-01**: Project `.claude/brand.json` exists; populated from `~/Code/premium-web-harness/plugins/vertical-plugins/premium-web/templates/.claude/brand.json` and edited for House Lights (palette, typography foundry=system, motion signature=title-card, voice banned, performance budgets)
- [x] **HARN-02**: Project `.claude/CLAUDE.md` exists; populated from harness template + project-specific overrides (Next.js 16, route group structure, copper-deep-for-body rule, Lenis syncTouch:false)
- [x] **HARN-03**: Project depends on the locally-installed `premium-web` plugin marketplace (already at `~/Code/premium-web-harness`); all 8 plugins enabled and 5 plugin MCPs registered

### Portrait Shoot (Out-of-Band of Dev)

- [x] **PHOTO-01**: Oakland portrait photographer booked within 7 days; 2-hour session targeted; budget $500-$1,200
- [ ] **PHOTO-02**: One vertical portrait shot (for Home full-bleed + About column) and one secondary shot (desk/workspace, for About context); warm-grade color or B&W with natural light per blueprint §4c
- [ ] **PHOTO-03**: Final image deliverables: 2x retina for `public/portrait-main.jpg` and `public/portrait-context.jpg`, each ≤500KB after AVIF conversion

---

## v2 Requirements

Deferred to future release.

### Typography Upgrade

- **TYPE-01**: License Klim Söhne Buch + Tiempos Text (~USD $600 total)
- **TYPE-02**: Migrate from `next/font/google` to `next/font/local` with self-hosted woff2 files
- **TYPE-03**: Update `brand.json.typography.body.foundry` to `"klim"`; create `.claude/font-license.lock` with receipt id
- **TYPE-04**: Update CLAUDE.md and design-director agent to permit Söhne/Tiempos

### Engagement Iteration

- **ITER-01**: Static-to-video hover on Work index tiles (Active Theory steal, blueprint §2) — defer if Day 13 over budget
- **ITER-02**: Newsletter signup at bottom of About page (NOT in nav) — only if newsletter actually exists
- **ITER-03**: Detailed pricing on Work With Me page (currently scope language only)

### Content Expansion

- **CONT-01**: Additional case studies as Micah ships new client work
- **CONT-02**: Periodic blog at separate Substack (NOT on consulting site)

---

## Out of Scope

Explicit exclusions. Documented to prevent scope creep. All have anchoring reasoning from blueprint §13 or pitfall research.

| Feature | Reason |
|---|---|
| Blog on consulting site | Blueprint §6: "no blog. No Now. No Uses. No colophon." Substack lives separately. |
| `/now` page | Blueprint §13 — dev-Twitter tell |
| `/uses` page | Blueprint §13 — dev-Twitter tell |
| Colophon | Blueprint §13 — dev-Twitter tell |
| Decision log | Blueprint §13 — dev-Twitter tell |
| BART / weather / commit widgets | Blueprint §13 — dev-Twitter tells |
| WebGL / Three.js / R3F | Blueprint §11 + §13 — wrong budget, wrong audience; TitleCard + view transition IS the production-flex |
| Spline embeds | Same as WebGL — production-flex for the wrong audience |
| Lottie animations | Solo-operator cliché; date stamp of 2022 |
| Parallax on >2 elements | Blueprint §13 + harness `motion-discipline.sh` |
| Scroll-jacking | Blueprint §13 + harness `motion-discipline.sh` |
| Cursor follower / custom cursor | Blueprint §13 — dated as of mid-2025; harness `motion-discipline.sh` blocks |
| Client logo wall / "trusted by" bar | Blueprint §13 — Micah doesn't have consent on every client + reads as filler |
| Stock photography | Blueprint §4c — only real portrait + screenshots |
| Illustration / icon kits | Blueprint §4c — type is the visual work |
| Newsletter signup in nav | Blueprint §13 — would dilute foyer hospitality |
| Calendly link in first contact volley | Blueprint §7 — start the conversation in email |
| "Select your budget range" dropdown | Blueprint §13 — two fields, real reply |
| Phone number | Blueprint §7 — email-first |
| Intercom / Drift / Crisp chat | Reflexive solo-operator marketer move; wrong register |
| Social share buttons on case studies | Solo-operator marketer reflex |
| Testimonial carousel | Solo-operator marketer reflex; named pull quotes only |
| "Related projects" / "More like this" | Solo-operator marketer reflex |
| Monospace fonts anywhere | Blueprint §13 — Attempt 1 tell; harness `motion-discipline.sh` blocks |
| PP Editorial New | Blueprint §13 — Attempt 2 tell, overdone in 2026 |
| Klim self-hosts at v1 | License deferred to v2 (~$600); harness `font-license.sh` blocks until license arrives |
| Headless CMS (Sanity / Contentful / Payload / Strapi) | Blueprint §11 — five pages don't warrant overhead |
| Third-party analytics (Mixpanel / Segment / PostHog / Amplitude / GA4) | Blueprint §11 — Vercel Analytics only |
| Dark mode toggle | Blueprint §12 CLAUDE.md — mode is route-based, not user-controlled |
| Multi-language i18n | Single-language launch |
| Mobile native app | Web only |
| React Hook Form / Formik | Server Action + native form HTML suffices for two-field contact |
| Framer Motion as signature interaction | Blueprint §4f + §11 + research: GSAP via `useGSAP` is the pattern for TitleCard |
| Locomotive Scroll | Blueprint §11 superseded by Lenis 1.x |
| `@studio-freight/react-lenis` | Retired package; install `lenis` and import from `lenis/react` |
| `tailwind.config.ts` | Tailwind v4 uses `@theme` block only |

---

## Traceability

Populated by gsd-roadmapper on 2026-05-14. All 100 v1 REQ-IDs mapped to exactly one phase in `.planning/ROADMAP.md`.

| Requirement | Phase | Status |
|---|---|---|
| SCAFF-01 | Phase 1 | Pending |
| SCAFF-02 | Phase 1 | Pending |
| SCAFF-03 | Phase 1 | Pending |
| SCAFF-04 | Phase 1 | Pending |
| SCAFF-05 | Phase 1 | Pending |
| SCAFF-06 | Phase 1 | Pending |
| SCAFF-07 | Phase 1 | Pending |
| SCAFF-08 | Phase 1 | Pending |
| TOKEN-01 | Phase 1 | Pending |
| TOKEN-02 | Phase 1 | Pending |
| TOKEN-03 | Phase 1 | Pending |
| TOKEN-04 | Phase 1 | Pending |
| TOKEN-05 | Phase 1 | Pending |
| TOKEN-06 | Phase 1 | Pending |
| FOYER-01 | Phase 4 | Complete |
| FOYER-02 | Phase 6 | Pending |
| FOYER-03 | Phase 6 | Pending |
| FOYER-04 | Phase 6 | Pending |
| FOYER-05 | Phase 6 | Pending |
| FOYER-06 | Phase 6 | Pending |
| FOYER-07 | Phase 6 | Pending |
| FOYER-08 | Phase 6 | Pending |
| FOYER-09 | Phase 3 | Complete |
| FOYER-10 | Phase 3 | Complete |
| THEATER-01 | Phase 4 | Complete |
| THEATER-02 | Phase 4 | Complete |
| THEATER-03 | Phase 4 | Complete |
| THEATER-04 | Phase 7 | Pending |
| THEATER-05 | Phase 7 | Pending |
| TRANS-01 | Phase 2 | Pending |
| TRANS-02 | Phase 2 | Pending |
| TRANS-03 | Phase 2 | Pending |
| TRANS-04 | Phase 2 | Pending |
| TRANS-05 | Phase 2 | Pending |
| MOT-01 | Phase 5 | Pending |
| MOT-02 | Phase 5 | Pending |
| MOT-03 | Phase 5 | Pending |
| MOT-04 | Phase 5 | Pending |
| MOT-05 | Phase 5 | Pending |
| MOT-06 | Phase 5 | Pending |
| MOT-07 | Phase 5 | Pending |
| LENIS-01 | Phase 2 | Pending |
| LENIS-02 | Phase 2 | Pending |
| LENIS-03 | Phase 2 | Pending |
| LENIS-04 | Phase 2 | Pending |
| LENIS-05 | Phase 2 | Pending |
| CASE-01 | Phase 7 | Pending |
| CASE-02 | Phase 7 | Pending |
| CASE-03 | Phase 8 | Pending |
| CASE-04 | Phase 8 | Pending |
| CASE-05 | Phase 8 | Pending |
| CASE-06 | Phase 8 | Pending |
| CASE-07 | Phase 7 | Pending |
| CASE-08 | Phase 7 | Pending |
| CASE-09 | Phase 7 | Pending |
| CASE-10 | Phase 7 | Pending |
| COPY-01 | Phase 2 | Pending |
| COPY-02 | Phase 2 | Pending |
| COPY-03 | Phase 2 | Pending |
| COPY-04 | Phase 2 | Pending |
| COPY-05 | Phase 2 | Pending |
| PERF-01 | Phase 10 | Pending |
| PERF-02 | Phase 10 | Pending |
| PERF-03 | Phase 10 | Pending |
| PERF-04 | Phase 10 | Pending |
| PERF-05 | Phase 10 | Pending |
| PERF-06 | Phase 10 | Pending |
| PERF-07 | Phase 10 | Pending |
| PERF-08 | Phase 10 | Pending |
| PERF-09 | Phase 10 | Pending |
| A11Y-01 | Phase 10 | Pending |
| A11Y-02 | Phase 10 | Pending |
| A11Y-03 | Phase 10 | Pending |
| A11Y-04 | Phase 10 | Pending |
| A11Y-05 | Phase 2 | Pending |
| A11Y-06 | Phase 10 | Pending |
| A11Y-07 | Phase 10 | Pending |
| RESP-01 | Phase 10 | Pending |
| RESP-02 | Phase 10 | Pending |
| RESP-03 | Phase 10 | Pending |
| RESP-04 | Phase 10 | Pending |
| OG-01 | Phase 10 | Pending |
| OG-02 | Phase 10 | Pending |
| OG-03 | Phase 10 | Pending |
| OG-04 | Phase 10 | Pending |
| ANALY-01 | Phase 2 | Pending |
| ANALY-02 | Phase 10 | Pending |
| ANALY-03 | Phase 10 | Pending |
| DEPLOY-01 | Phase 10 | Pending |
| DEPLOY-02 | Phase 1 | Pending |
| DEPLOY-03 | Phase 10 | Pending |
| DEPLOY-04 | Phase 10 | Pending |
| DEPLOY-05 | Phase 10 | Pending |
| DEPLOY-06 | Phase 10 | Pending |
| HARN-01 | Phase 1 | Pending |
| HARN-02 | Phase 1 | Pending |
| HARN-03 | Phase 1 | Pending |
| PHOTO-01 | Phase 1 | Pending |
| PHOTO-02 | Phase 9 | Pending |
| PHOTO-03 | Phase 9 | Pending |

**Coverage:** 100/100 v1 requirements mapped to exactly one phase. ✓

**Note on prompt-stated count:** the orchestrator prompt cited "49 total" requirements but the actual REQUIREMENTS.md contains 100 v1 REQ-IDs across 17 categories. All 100 are mapped above.

---

*Requirements defined: 2026-05-14*
*Last updated: 2026-05-14 — Traceability table populated by gsd-roadmapper*
