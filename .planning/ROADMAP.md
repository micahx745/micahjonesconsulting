# Roadmap: micahjonesconsulting (House Lights)

## Overview

Ten phases from cold repo to production deploy on `micahjonesconsulting.com`. Derived from the architecture research's critical path (scaffold → tokens → chrome → route skeletons → TitleCard → foyer pages → MDX infra → case studies → photography → hardening) and the 100 v1 REQ-IDs in REQUIREMENTS.md. Phase 5 (TitleCard) is the gating dependency — it must exist before Home, Work index, every case study, and every OG image. Phase 10 (hardening) is the final pass; perf and a11y are planned, never retrofitted. The portrait shoot (PHOTO-01..03) is an out-of-band-of-dev workstream that the user must initiate Day 1 and integrate in Phase 9. Resend DNS (DEPLOY-02) is moved to Phase 1 per pitfall research, not Day 14.

**Note on REQ-ID count:** the prompt instructions cited "49 total" but the actual REQUIREMENTS.md contains **100 v1 REQ-IDs across 17 categories**. All 100 are mapped below.

**Note on Next.js version:** the architecture research recommends Next.js 16.2.6 (greenfield, zero migration cost). The blueprint and PROJECT.md name Next.js 15. SCAFF-01 in REQUIREMENTS.md already adopts 16.2 per research. Phase 1 will lock the version in `package.json` at install time.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED) — none yet

- [ ] **Phase 1: Scaffold, Tokens, DNS** - Day-1 foundation: Next.js + Tailwind v4 + fonts + design tokens + harness wiring + Resend DNS verification kickoff + portrait shoot booking
- [ ] **Phase 2: Root Layout, Lenis, View Transitions, Copy Discipline** - `app/layout.tsx`, ViewTransition wrapper, Lenis at root, copy-lint module, reduced-motion CSS, Vercel Analytics
- [ ] **Phase 3: Shared Chrome (Nav + Footer)** - Foyer + theater nav and footer variants with `viewTransitionName: "site-nav"` spatial anchor
- [ ] **Phase 4: Route-Group Skeletons** - `(foyer)/layout.tsx` and `(theater)/layout.tsx` stamping `data-mode`; verifiable 600ms cross-fade in DevTools on empty pages
- [ ] **Phase 5: TitleCard Signature Motion [BLOCKER]** - `components/TitleCard.tsx` built in isolation with GSAP pin + resolve, mobile reflow, reduced-motion branch, Vercel OG composition
- [ ] **Phase 6: Foyer Pages** - Home, About, Work With Me, Contact (with Resend Server Action + Supabase archive), Work index
- [ ] **Phase 7: MDX Infrastructure** - `mdx-components.tsx`, case-study Zod schema, `lib/case-studies.ts`, theater page template, captioned stills, pull quotes
- [ ] **Phase 8: Case Studies (Theater Content)** - ORDANI (verbatim), HR Equity Author (anonymized), Passioneer, Akamai
- [ ] **Phase 9: Portrait Integration** - Receive Oakland portrait deliverables; integrate `portrait-main.jpg` (Home full-bleed) + `portrait-context.jpg` (About column) at <500KB AVIF
- [ ] **Phase 10: Hardening, OG/SEO, Production Deploy** - Perf budget, a11y zero-critical, responsive baselines, OG images, sitemap/robots.txt, Vercel deploy, Supabase + Resend env, custom domain

## Phase Details

### Phase 1: Scaffold, Tokens, DNS
**Goal**: A cold repo becomes a typecheck-passing Next.js 16 project with the design-token system, font cascade, harness integration, and out-of-band workstreams (DNS, photography) initiated on Day 1.
**Depends on**: Nothing (first phase)
**Requirements**: SCAFF-01, SCAFF-02, SCAFF-03, SCAFF-04, SCAFF-05, SCAFF-06, SCAFF-07, SCAFF-08, TOKEN-01, TOKEN-02, TOKEN-03, TOKEN-04, TOKEN-05, TOKEN-06, HARN-01, HARN-02, HARN-03, DEPLOY-02, PHOTO-01
**Success Criteria** (what must be TRUE):
  1. `pnpm install && pnpm typecheck && pnpm build` succeeds on a clean checkout with Next.js 16.2, Tailwind v4 `@theme` block, MDX wrapper, and `experimental.viewTransition: true` configured.
  2. `app/globals.css` defines all 11 color tokens from blueprint §4b as CSS custom properties readable by `[data-mode="foyer"]` and `[data-mode="theater"]` attribute selectors, with `--accent-copper-deep` documented as the body-text emphasis token (5.4:1 vs cream).
  3. `next/font/google` loads Inter Display, Inter, and Source Serif 4 (with `axes: ['opsz']`) and built `@font-face` output includes `size-adjust` / `ascent-override` metrics (verifiable in `.next/static`).
  4. `.claude/brand.json` and `.claude/CLAUDE.md` exist with House-Lights-specific overrides; the harness blocks any test PR that imports a monospace font, a Klim foundry without license, or a banned word in a string literal.
  5. Resend domain verification DNS TXT record is submitted at the registrar Day 1 (verification can lag 24-72h — start clock now, not Day 14).
  6. Oakland portrait photographer outreach is initiated (booking request sent or shortlist contacted); session targeted within 7 days; budget envelope confirmed at $500-$1,200.
**Plans:** 10 plans
- [ ] 01-A-scaffold-install-PLAN.md — Scaffold Next.js 16.2 + lock dependency stack + tsconfig strict + .gitignore + cleanup placeholders (SCAFF-01, SCAFF-08)
- [ ] 01-B-build-configs-PLAN.md — Write next.config.ts (viewTransition + withMDX) + postcss.config.mjs (@tailwindcss/postcss) (SCAFF-02, SCAFF-03)
- [ ] 01-C-design-tokens-PLAN.md — Write app/globals.css @theme block with 11 colors + font vars + spacing + mode-driven defaults (TOKEN-01..06)
- [ ] 01-D-font-cascade-PLAN.md — Write lib/fonts.ts with Inter Display + Inter + Source Serif 4 (opsz axis) (SCAFF-04)
- [ ] 01-E-root-layout-PLAN.md — Write app/layout.tsx single root with fonts attached + metadata (SCAFF-05)
- [ ] 01-F-copy-lint-scaffold-PLAN.md — Write lib/banned.ts (30 words) + lib/copy-lint.ts + instrumentation.ts (no-op register) (SCAFF-06)
- [ ] 01-G-harness-claude-PLAN.md — Write .claude/brand.json + .claude/CLAUDE.md with House Lights overrides (SCAFF-07, HARN-01..03)
- [ ] 01-H-resend-dns-runbook-PLAN.md — Operator runbook docs/RESEND-DNS-SETUP.md for Resend DNS verification Day 1 (DEPLOY-02)
- [ ] 01-I-portrait-outreach-PLAN.md — Operator runbook docs/PORTRAIT-OUTREACH.md with 5-name shortlist + inquiry email template (PHOTO-01)
- [ ] 01-J-verify-scaffold-PLAN.md — Integration test: pnpm install + typecheck + build + cross-checks; produces 01-VERIFY-OUTPUT.md

### Phase 2: Root Layout, Lenis, View Transitions, Copy Discipline
**Goal**: The single root `app/layout.tsx` ships with the View Transition wrapper, Lenis smooth scroll (`syncTouch: false`), the build-time copy-lint scanner, reduced-motion CSS kill-switches, and Vercel Analytics — the cross-cutting infrastructure that every page inherits.
**Depends on**: Phase 1
**Requirements**: TRANS-01, TRANS-02, TRANS-03, TRANS-04, TRANS-05, LENIS-01, LENIS-02, LENIS-03, LENIS-04, LENIS-05, COPY-01, COPY-02, COPY-03, COPY-04, COPY-05, A11Y-05, ANALY-01
**Success Criteria** (what must be TRUE):
  1. The root layout wraps `{children}` in `<ViewTransition>` from `react`; `app/globals.css` defines `::view-transition-old(root)` and `::view-transition-new(root)` 600ms keyframes; `@media (prefers-reduced-motion: reduce)` neutralizes animation duration to 0s.
  2. `components/LenisProvider.tsx` mounts `<ReactLenis root>` exactly once in the root layout (NOT in a group layout) with `syncTouch: false`, damping ~0.08, disabled for reduced-motion; Lenis-ScrollTrigger bridge wires `lenis.on('scroll', ScrollTrigger.update)`.
  3. `pnpm build` fails with file + line number if any string in `app/**`, `content/**/*.mdx`, or `metadata` exports contains a banned word from `lib/banned.ts` (the 30-word list).
  4. The feature-detect View Transitions wrapper falls through to instant navigation on browsers without `document.startViewTransition` (verified in Safari 17 + Firefox 143 fallback path).
  5. Vercel Analytics + Speed Insights are mounted at root and reporting in the Vercel dashboard within 5 minutes of a deploy ping.
**Plans**: TBD

### Phase 3: Shared Chrome (Nav + Footer)
**Goal**: Foyer nav (copper underline lift on hover) and theater nav (inverted, copper-on-obsidian, `[BACK TO FOYER ↗]` affordance) render correctly per mode; footer carries the two-business-day reply promise on every page.
**Depends on**: Phase 2
**Requirements**: FOYER-09, FOYER-10
**Success Criteria** (what must be TRUE):
  1. Foyer nav renders five labels (work · about · work with me · contact) with a copper underline that lifts 4px on hover at 200ms cubic-bezier(0.2, 0.8, 0.2, 1).
  2. Theater nav renders inverted (copper on `--theater-ground`) with `[BACK TO FOYER ↗]` link.
  3. Both nav variants carry `viewTransitionName: "site-nav"` so the nav remains visually anchored through the foyer↔theater cross-fade (anchored, not faded).
  4. The footer carries `hello@micahjonesconsulting.com` and the two-business-day reply promise; footer is mode-aware (foyer uses `--rule-foyer`, theater uses `--rule-theater`).
**Plans**: TBD

### Phase 4: Route-Group Skeletons
**Goal**: `(foyer)` and `(theater)` route groups exist with empty layout stubs that stamp `data-mode` correctly; navigating between them visibly produces the 600ms cross-fade in DevTools Performance panel — the metaphor IS the gesture, verified before any content is built.
**Depends on**: Phase 3
**Requirements**: FOYER-01, THEATER-01, THEATER-02, THEATER-03
**Success Criteria** (what must be TRUE):
  1. Visiting `/` renders a stub page with `<html>` containing a child with `data-mode="foyer"`; visiting `/work/test-slug` renders a stub with `data-mode="theater"`.
  2. Clicking from `/` to `/work/test-slug` produces a visible 600ms ease-in-out cross-fade between cream paper and theater ground in DevTools Performance panel as a single browser View Transition.
  3. The reverse navigation (theater → foyer) also produces the cross-fade (paper rises, theater recedes).
  4. The `<Nav>` element remains visually anchored across the transition (does not fade with the page body) because of `viewTransitionName: "site-nav"`.
  5. `(theater)/work/[slug]/page.tsx` reads a stub MDX file successfully (full case-study render deferred to Phase 8 — at this point the route resolves and the theater chrome paints).
**Plans**: TBD

### Phase 5: TitleCard Signature Motion [BLOCKER]
**Goal**: `components/TitleCard.tsx` is built and tested in isolation as the single signature interaction. GSAP imports are quarantined to this file. The component is verified at 96px desktop, 64px mobile, with reduced-motion fallback, before any consumer (Home, Work index, case studies, OG images) is built.
**Depends on**: Phase 4
**Requirements**: MOT-01, MOT-02, MOT-03, MOT-04, MOT-05, MOT-06, MOT-07
**Success Criteria** (what must be TRUE):
  1. A standalone test route renders `<TitleCard words={["ORDANI", "INTAKE.", "SECURE.", "SHIPPED."]} />`: the 96px Inter Display 700+ vertical word stack pins for ~600ms on scroll-enter, then resolves into a smaller caption plus first-still cross-fade.
  2. On a 390px mobile viewport with Lenis active (verified on real iOS Safari), the same TitleCard reflows to 64px and the pin-resolve sequence completes without overflow.
  3. With OS reduced-motion enabled, the TitleCard renders the resolved (final) state immediately — no pin, no scrub.
  4. `pnpm build` succeeds; bundle analyzer shows GSAP imports present only in the route bundles that consume TitleCard, never in the Contact or About bundle (first-load JS ≤ 90KB on TitleCard-free foyer routes).
  5. A test case-study route exports `opengraph-image.tsx` that composes the TitleCard via `@vercel/og` and renders a valid 1200×630 OG image at `/work/test-slug/opengraph-image`.
**Plans**: TBD

### Phase 6: Foyer Pages
**Goal**: Five foyer routes ship with verbatim copy from blueprint §8: Home (positioning sentence + portrait slot + selected-work strip), About (two-column long-form + Oakland context + three numbered values), Work With Me (three stacked engagement shapes + four-question FAQ), Contact (two-field form posting to Resend Server Action + Supabase archive), Work index (TitleCard thumbnails of all case studies).
**Depends on**: Phase 5
**Requirements**: FOYER-02, FOYER-03, FOYER-04, FOYER-05, FOYER-06, FOYER-07, FOYER-08
**Success Criteria** (what must be TRUE):
  1. Home (`/`) renders the hero positioning sentence ("I help operators ship the work the rest of their org keeps stalling on."), a full-bleed portrait slot with copper rule, three selected-work cards, About teaser, Work With Me teaser, Contact CTA — all verbatim per blueprint §8 with zero banned words.
  2. About (`/about`) renders the 150-word paragraph verbatim, the left 8-column long-form, the right 4-column vertical portrait slot + credits list (Guardicore/Akamai · Flexport · SurveyMonkey · Cuebiq), the Oakland family-context paragraph, and the three numbered values (ship the work / trust the operator / show the receipts).
  3. Work With Me (`/work-with-me`) renders the three engagement cards stacked (not gridded) with one-paragraph descriptions (Strategy Sprint 2-4wk / Embed 8-12wk / Build custom), the four-question FAQ, and a single CTA to `/contact`.
  4. Contact (`/contact`) renders the two-field form (name + what you're working on); submitting the form invokes a Server Action that validates with Zod, calls `resend.emails.send()`, inserts a row into Supabase `contact_messages`, and renders an inline thank-you state — verified end-to-end with a test submission landing in Micah's inbox.
  5. Work index (`/work`) renders a TitleCard thumbnail for each case study (using the Phase 5 component with frontmatter-supplied words), linking to `/work/[slug]`.
**Plans**: TBD

### Phase 7: MDX Infrastructure
**Goal**: The case-study render template, MDX component map, frontmatter Zod schema, and reusable case-study components (PullQuote, CaseStudyStill, CopperRule, Dek) are in place — ready to receive content. Build-time validation fails the build on any frontmatter drift.
**Depends on**: Phase 6 (Work index needs case-studies.ts listing; building MDX infra serves both the index and the case-study pages)
**Requirements**: CASE-01, CASE-02, CASE-07, CASE-08, CASE-09, CASE-10, THEATER-04, THEATER-05
**Success Criteria** (what must be TRUE):
  1. `lib/case-study-schema.ts` defines a Zod schema for frontmatter (title, dek, role, tools[], year, status, titleCardWords, heroStill?, client?); `instrumentation.ts` runs the schema across every `content/work/*.mdx` at build and fails with line numbers on any mismatch.
  2. `mdx-components.tsx` at repo root (NOT inside `app/`) maps `<TitleCard>`, `<Dek>`, `<CaseStudyStill>`, `<PullQuote>`, `<CopperRule>` so a sample MDX file uses them without explicit imports.
  3. `(theater)/work/[slug]/page.tsx` reads frontmatter via `lib/case-studies.ts` (gray-matter hybrid) for index/OG, then renders the MDX body via dynamic `import()`; the render order is verifiable: TitleCard → Dek → Hero still → Problem → Why it matters → Approach (4 numbered) → What it became → Outcome → PullQuote → [NEXT WORK ↘] / [BACK TO FOYER ↗].
  4. `<CaseStudyStill>` renders next/image with the 2px warm off-white inner border + 4% film-grain CSS overlay and the "name — date" caption per blueprint §4c; `image-budget.sh` blocks any added still > 500KB.
  5. `<PullQuote>` renders in Source Serif 4 italic with a copper underline-grow animation on scroll-into-view (2s ease), honoring reduced-motion.
**Plans**: TBD

### Phase 8: Case Studies (Theater Content)
**Goal**: All four case studies ship as MDX files: ORDANI verbatim per blueprint §9 (including the locked CDC maternal-mortality citations), HR Equity Author anonymized per §10, Passioneer short-form, Akamai/Guardicore short-form. Every case study passes the Zod schema, copy-lint, and image-budget hooks.
**Depends on**: Phase 7
**Requirements**: CASE-03, CASE-04, CASE-05, CASE-06
**Success Criteria** (what must be TRUE):
  1. `/work/ordani` renders the full ORDANI case study verbatim per blueprint §9 — including the CDC statistics (44.8 per 100,000 live births, ~3.15× rate, sourced via `content/citations.ts` not literal in prose), 22 birth workers, 91% intake completion, 14 active practices, and the "It is the first piece of software..." pull quote attributed to "beta user, name withheld". The sage `#5E7158` color appears only inside this route.
  2. `/work/hr-equity-author` renders the anonymized HR consultant + author case study per blueprint §10 — 25-page playbook, two platforms outperforming a third by 4×, RFP wins, attributed pull quote.
  3. `/work/passioneer` renders the AI content platform short-form case study (problem / approach / outcome only).
  4. `/work/akamai` renders the Guardicore/Akamai positioning research short-form, including the $150K average deal-size move attributed correctly.
  5. `pnpm build` produces static prerenders for all four case-study slugs (via `generateStaticParams`) with zero copy-lint or frontmatter violations; each case study's RSC payload is < 200KB per pitfall A5.
**Plans**: TBD

### Phase 9: Portrait Integration
**Goal**: Receive the Oakland portrait deliverables from Phase 1's booking workstream; integrate `portrait-main.jpg` (Home full-bleed) and `portrait-context.jpg` (About column) at ≤500KB each after AVIF conversion via next/image.
**Depends on**: Phase 6 (foyer pages exist with portrait slots) AND Phase 1 (booking initiated)
**Requirements**: PHOTO-02, PHOTO-03
**Success Criteria** (what must be TRUE):
  1. `public/portrait-main.jpg` exists at 2× retina resolution, ≤500KB after AVIF conversion by next/image; visible full-bleed on Home with copper rule below per blueprint §4c (warm-grade color or B&W with natural light, Oakland location).
  2. `public/portrait-context.jpg` exists at 2× retina resolution, ≤500KB after AVIF conversion; integrated in the About right column with sub-caption "Oakland, CA."
  3. The portrait on Home achieves LCP ≤ 1.8s on simulated mobile slow 4G (verified via Lighthouse) when set as `<Image priority>`.
  4. `image-budget.sh` passes on both portrait assets; no horizontal scroll at 390px viewport (portrait crop reflows tighter per RESP-01).
**Plans**: TBD

### Phase 10: Hardening, OG/SEO, Production Deploy
**Goal**: The cross-cutting hardening pass: zero serious/critical axe violations; Lighthouse Performance ≥95 mobile across all routes; visual baselines captured at 390/768/1440; OG images render via Vercel OG; sitemap.xml + robots.txt configured to allow Googlebot and disallow AI-training crawlers on `/work/*`; Vercel production deploy on `micahjonesconsulting.com` with Supabase + Resend env wired.
**Depends on**: Phase 9
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06, PERF-07, PERF-08, PERF-09, A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-06, A11Y-07, RESP-01, RESP-02, RESP-03, RESP-04, OG-01, OG-02, OG-03, OG-04, ANALY-02, ANALY-03, DEPLOY-01, DEPLOY-03, DEPLOY-04, DEPLOY-05, DEPLOY-06
**Success Criteria** (what must be TRUE):
  1. Lighthouse Performance ≥ 95 on mobile for `/`, `/about`, `/work-with-me`, `/contact`, `/work`, `/work/ordani`, `/work/hr-equity-author`, `/work/passioneer`, `/work/akamai`; LCP ≤ 1800ms, INP ≤ 200ms, CLS ≤ 0.05 on each.
  2. Zero serious/critical axe violations on every route (harness `a11y-baseline.sh` passes on build); body emphasis uses `--accent-copper-deep` (5.4:1) not `--accent-copper` (3.85:1); focus rings visible on every interactive element in both modes; skip-to-content link works keyboard-only.
  3. Visual QA baselines at 390/768/1440 captured for every route via `visual-qa` agent — no horizontal scroll on mobile; About reflows to stacked at 768; full 12-column grid renders at 1440.
  4. Every case-study route exports `opengraph-image.tsx` composing its TitleCard via `@vercel/og`; per-route `metadata` sets title (≤60 chars), description (130-155 chars), `openGraph`, `twitter`; `app/sitemap.ts` exports all foyer routes + every case-study slug; `app/robots.ts` allows Googlebot and disallows `GPTBot` + `Google-Extended` from `/work/*`.
  5. `micahjonesconsulting.com` resolves to the Vercel production deploy with valid SSL; Resend domain is verified (DNS TXT from Phase 1 propagated); Supabase `contact_messages` table exists with RLS policies + service-role key in Vercel env; submitting the live contact form lands an email in Micah's inbox and a row in Supabase within 5 seconds; `case_study_read_complete` custom event fires at scroll depth ≥ 90% on a `/work/*` route, once per session, in Vercel Analytics.
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
(Phase 1 also initiates two out-of-band workstreams — Resend DNS verification and portrait shoot booking — that complete during Phases 9 and 10.)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Scaffold, Tokens, DNS | 0/10 | Not started | - |
| 2. Root Layout, Lenis, View Transitions, Copy Discipline | 0/TBD | Not started | - |
| 3. Shared Chrome (Nav + Footer) | 0/TBD | Not started | - |
| 4. Route-Group Skeletons | 0/TBD | Not started | - |
| 5. TitleCard Signature Motion [BLOCKER] | 0/TBD | Not started | - |
| 6. Foyer Pages | 0/TBD | Not started | - |
| 7. MDX Infrastructure | 0/TBD | Not started | - |
| 8. Case Studies (Theater Content) | 0/TBD | Not started | - |
| 9. Portrait Integration | 0/TBD | Not started | - |
| 10. Hardening, OG/SEO, Production Deploy | 0/TBD | Not started | - |

## Coverage

All 100 v1 REQ-IDs from REQUIREMENTS.md are mapped to exactly one phase. Breakdown by category:

| Category | REQ-IDs | Phase(s) |
|---|---|---|
| Scaffold & Infrastructure | SCAFF-01..08 (8) | 1 |
| Design Tokens | TOKEN-01..06 (6) | 1 |
| Foyer Mode | FOYER-01 (1) → 4; FOYER-02..08 (7) → 6; FOYER-09..10 (2) → 3 | 3, 4, 6 |
| Theater Mode | THEATER-01..03 (3) → 4; THEATER-04..05 (2) → 7 | 4, 7 |
| View Transition | TRANS-01..05 (5) | 2 |
| Signature Motion (TitleCard) | MOT-01..07 (7) | 5 |
| Smooth Scroll (Lenis) | LENIS-01..05 (5) | 2 |
| Case Studies | CASE-01, 02, 07..10 (6) → 7; CASE-03..06 (4) → 8 | 7, 8 |
| Voice & Copy | COPY-01..05 (5) | 2 |
| Performance | PERF-01..09 (9) | 10 |
| Accessibility | A11Y-05 (1) → 2; A11Y-01..04, 06..07 (6) → 10 | 2, 10 |
| Responsive Design | RESP-01..04 (4) | 10 |
| Open Graph / SEO | OG-01..04 (4) | 10 |
| Analytics | ANALY-01 (1) → 2; ANALY-02..03 (2) → 10 | 2, 10 |
| Deployment | DEPLOY-02 (1) → 1; DEPLOY-01, 03..06 (5) → 10 | 1, 10 |
| Harness Integration | HARN-01..03 (3) | 1 |
| Portrait Shoot | PHOTO-01 (1) → 1; PHOTO-02..03 (2) → 9 | 1, 9 |

**Total mapped:** 100/100 ✓ (no orphans, no duplicates)

---

*Roadmap created: 2026-05-14 by gsd-roadmapper*
*Depth: comprehensive (10 phases)*
*Parallelization: enabled per config.json*
