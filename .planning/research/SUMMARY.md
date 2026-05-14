# Research Summary — micahjonesconsulting.com (House Lights)

**Project:** Premium agency-tier solo-operator portfolio + MDX case-study marketing site
**Researched:** 2026-05-14
**Overall confidence:** HIGH

The four research files agree on a single architecture: Next.js 16 App Router with route-group-based mode switching (foyer cream / theater dark), one signature GSAP interaction (TitleCard), one signature View Transition (foyer↔theater 600ms dim), MDX-in-repo for case studies, and a harness that auto-catches roughly 70% of the predictable mistakes. The roadmapper should treat the build order as effectively dictated — there is one critical path with a single Day-3 gating dependency (TitleCard) and one set of cross-cutting hardening passes (perf + a11y) that must be planned as a final phase, not retrofitted.

---

## Stack (locked-in)

| Package | Version | Rationale |
|---|---|---|
| `next` | `16.2.6` | **Override of blueprint's "Next.js 15"** — greenfield, zero migration cost; identical `experimental.viewTransition` API; stable Turbopack production builds (50% faster). Trivial revert to 15.2.4 if user objects. |
| `react` / `react-dom` | `19.2.6` | Required by Next 16. `<ViewTransition>` ships in the React canary that App Router uses automatically. **Imported from `react`, NOT from `next` or `react-dom`.** |
| `tailwindcss` + `@tailwindcss/postcss` | `4.3.0` | **No `tailwind.config.ts`** — `@theme` block in `app/globals.css` is the only config surface. PostCSS plugin is a separate package in v4 (first-install footgun). |
| `@next/mdx` + `gray-matter` + `remark-gfm` | `16` / `4` / `4` | Build-time MDX compilation. `mdx-components.tsx` MUST live at repo root (silent failure if misplaced inside `app/`). |
| `gsap` + `@gsap/react` | `3.15.0` / `2.1.2` | **GSAP fully free as of 2025** (Webflow funding). `useGSAP()` hook handles React 19 StrictMode + auto-cleanup. Only used inside `<TitleCard />`. |
| `lenis` | `1.3.23` | Smooth scroll. Import from `lenis/react` subpath. **Old `@studio-freight/react-lenis` is retired — do NOT install.** `syncTouch: false` (the `smoothTouch` deprecation rabbit hole). |
| `resend` + `zod` + `@supabase/supabase-js` | `6` / `4` / `2.105` | Contact form Server Action: validate → send email → archive insert. Supabase is server-only (service-role key, no client SDK). |
| `@vercel/analytics` + `@vercel/speed-insights` | `2` / `1` | Cookieless, no consent banner. One custom event: `case_study_read_complete`. |
| Fonts | `Inter` + `Source_Serif_4` via `next/font/google` | Free path; Söhne+Tiempos paid path deferred to v2. **`axes: ['opsz']` on Source Serif 4** is the most-missed integration detail. |

**Banned at harness layer:** Framer Motion (use CSS transitions), monospace fonts, Klim self-hosts (until license), PP Editorial New, Locomotive Scroll, `@studio-freight/react-lenis`, manual `useEffect` GSAP cleanup, `tailwind.config.ts`, React Hook Form, dark-mode toggle libraries, shadcn-as-default.

**Override from blueprint:** Blueprint §11 and PROJECT.md both name **"Next.js 15"** — research recommends **Next.js 16.2.6** instead. Flagged explicitly; trivial revert if user objects.

→ Full details: [STACK.md](STACK.md) (584 lines)

---

## Table Stakes (all 22 must ship)

Penalty-on-miss baseline. Founders shopping consultants in 2026 assume every one of these is present.

1. Five-page IA (Home, Work index, Case Studies, About, Work With Me, Contact)
2. Home positioning sentence ("I help operators ship the work...")
3. About page (long-form, two-column, 150-word paragraph + values + credit list)
4. Work index page with TitleCard thumbnails
5. **Three case studies minimum** (ORDANI, HR Equity Author, Passioneer+Akamai — 2026 industry floor for credibility)
6. Case-study structure: problem → why → approach → outcome
7. Two-field contact form (name + what you're working on)
8. Working email reply path via Resend
9. Direct email link as form alternate
10. Responsive at 390 / 768 / 1440
11. Open Graph metadata per page (TitleCard composition)
12. Accessible focus states (WCAG 2 AA)
13. Alt text on every image
14. Zero serious/critical axe violations
15. Five-label navigation (foyer + theater variants)
16. Footer with contact pointer + two-day reply promise
17. Page load that doesn't feel janky (LCP < 1.8s mobile, INP < 200ms, CLS < 0.05, Lighthouse Perf ≥ 95)
18. Real Oakland portrait of Micah ($500–$1,200 budget — OUT-OF-BAND of dev, ON-CRITICAL-PATH for launch)
19. One typeface system, consistently used
20. Color palette adhered to (no rogue hex)
21. Outcomes stated with named numbers ("$150K," "14 practices," "8 weeks")
22. Mobile parity (re-composed, not stripped)

---

## Differentiators (P1, all in scope for v1)

1. **TitleCard signature interaction** — pinned vertical word stack at 96px Inter weight 800, GSAP scroll-resolve, cross-fade to first still. Doubles as OG image. Reused on Home + Work index + every case study.
2. **Foyer ↔ theater View Transition** — 600ms cream-recedes / theater-rises dim. The metaphor IS the gesture.
3. **Two-mode site, route-determined** — no toggle, no `useTheme()`, no `<ThemeProvider>`. `data-mode` attribute on route-group layouts; Tailwind v4 reads it via attribute selectors.
4. **One accent (copper #C8542B)** across both modes (ORDANI sage #5E7158 scoped to `/work/ordani` only).
5. **One excellent Oakland portrait**, full-bleed on Home, vertical on About.
6. **Lenis smooth scroll** at root (damping ~0.08; `syncTouch: false` for iOS native momentum).
7. **Two-field contact form** with two-business-day reply commitment — no budget dropdown, no Calendly.
8. **Pull quotes** in Source Serif 4 italic with copper underline-grow on scroll-into-view.
9. **Case studies that take a position** (ORDANI commits to CDC maternal-mortality data; HR Equity commits to algorithmic-resilience position).
10. **Three engagement shapes** (Strategy Sprint / Embed / Build), stacked not gridded.
11. **Voice with named numbers, dry humor, "Black" stated plainly.**
12. **Copy-lint at build time** — 30 banned words, build fails with line numbers.
13. **Open Graph image per case study** generated from TitleCard composition.
14. **Performance as floor, not constraint** (LCP < 1.8s, Lighthouse ≥ 95 — enforced at harness).
15. **Captioned stills like film frames** with 2px inner border + 4% film-grain overlay.
16. **Vercel Analytics + one custom event** (`case_study_read_complete`).
17. **Static-to-video hover** on Work index tiles (P2 — defer if Day 14 over budget).

→ Full details: [FEATURES.md](FEATURES.md)

---

## Anti-Features (will NOT build)

| Category | Refused | Why |
|---|---|---|
| **Dev-Twitter tells** | Blog, Now, Uses, Colophon, decision log, BART/weather/commit widgets | Wrong register for founder-buying-services audience. Five-page IA is the discipline. |
| **Cinematic over-reach** | WebGL, Three.js, R3F, Spline, Lottie, parallax > 2, scroll-jacking | The TitleCard + foyer↔theater dim IS the production-flex. Spend motion budget once. |
| **Solo-operator clichés** | Cursor follower, animated SVG line drawings, "trusted by" logo wall, illustration/icon kits, stock photography | Dated as of mid-2025. Real portrait + captioned stills + type = the visual work. |
| **Marketer reflexes** | Newsletter signup in nav, Calendly in first volley, "select your budget" dropdown, phone number, Intercom/Drift/Crisp chat widget, social share buttons, related projects, testimonial carousel | Hospitality framing — start the conversation in email. |
| **Wrong typography** | Monospace anywhere (Berkeley Mono, Geist Mono, JetBrains, IBM Plex, Söhne Mono), PP Editorial New, Klim self-hosts at v1 | Attempt 1 / Attempt 2 tells. Inter + Source Serif 4 is the v1 path. |
| **Infrastructure overkill** | Headless CMS (Sanity/Contentful/Payload/Strapi), Mixpanel/Segment/PostHog/Amplitude/GA4, dark mode toggle, mobile native app, multi-language i18n, React Hook Form/Formik | Five pages don't justify it. |

→ Full list with reasoning: [FEATURES.md §Anti-Features](FEATURES.md)

---

## Build Order (from architecture research)

Critical path. Phase 4 (TitleCard) is the gating dependency for everything downstream — building it Day 3 in isolation is non-negotiable.

```
Phase 0 — Scaffold (Day 1)
  next.config.ts (experimental.viewTransition + withMDX)
  postcss.config.mjs (Tailwind v4)
  tsconfig.json (strict)
  lib/fonts.ts (next/font/google: Inter Display + Inter + Source Serif 4)

Phase 1 — Root layout + token system (Day 1)
  app/globals.css (@theme block, ::view-transition-old/new keyframes, reduced-motion guard)
  app/layout.tsx (html, fonts attached, <ViewTransition> wrapper from 'react')
  lib/banned.ts + lib/copy-lint.ts + instrumentation.ts

Phase 2 — Shared chrome (Day 2)
  components/LenisProvider.tsx → wired into app/layout.tsx (root, NOT group layout)
  components/Nav.tsx (viewTransitionName: 'site-nav' for spatial anchor)
  components/Footer.tsx
  → VERIFY 600ms foyer↔theater cross-fade renders in DevTools before moving on

Phase 3 — Route group skeletons (Day 2)
  (foyer)/layout.tsx + (foyer)/page.tsx stub  ← data-mode="foyer"
  (theater)/layout.tsx + (theater)/work/[slug]/page.tsx stub  ← data-mode="theater"

Phase 4 — TitleCard [BLOCKER for Phases 5, 7, 8] (Day 3)
  components/TitleCard.tsx — GSAP pin + resolve, useGSAP hook, scope: ref
  Built in isolation, tested with sample words, mobile reflow at 64px verified
  reduced-motion branch implemented
  → REQUIRED by: Home, Work index, all four case studies, OG images

Phase 5 — Foyer pages (Days 4–8)
  Home, About, Work With Me, Contact, Work index
  Contact requires Resend Server Action + Supabase archive

Phase 6 — MDX infrastructure (parallel with Phase 5)
  mdx-components.tsx AT REPO ROOT (silent failure if misplaced)
  lib/case-studies.ts (gray-matter + Zod schema)
  components/CaseStudyStill.tsx, PullQuote.tsx, CopperRule.tsx

Phase 7 — Case studies, theater (Days 9–12)
  ordani.mdx (verbatim per blueprint §9), hr-equity-author.mdx,
  passioneer.mdx, akamai.mdx

Phase 8 — Hardening passes (Days 13–14)
  Perf: bundle analysis, image budget, font subsetting, Lighthouse ≥ 95
  A11y: zero serious/critical axe, focus states, reduced-motion verification
  Copy-lint: zero banned words across all MDX + component strings + frontmatter + metadata
  Cross-browser QA: Chrome stable / Safari 18 / Safari 17 fallback / Firefox 144+ / Firefox 143 fallback
  Visual QA: 390 / 768 / 1440 baselines on every route
  OG images, sitemap.xml, robots.txt
  Vercel deploy + Resend DNS verification (DO DNS DAY 1, NOT DAY 14)
```

→ Full architecture: [ARCHITECTURE.md](ARCHITECTURE.md) (14 sections)

---

## Critical Pitfalls (address in early phases)

| # | Pitfall | Phase | Fix |
|---|---|---|---|
| **B1** | **Copper #C8542B on paper #F5EFE4 fails WCAG AA for body text (3.85:1)** | Day 1 (tokens) | Body emphasis uses `accent.copper-deep #8E3A1E` (5.4:1 PASS). Plain copper only for large text (≥24px) and non-text UI. Bake into Tailwind theme; document in CLAUDE.md. |
| **B2** | **`prefers-reduced-motion` NOT automatic for View Transitions** | Day 2 + Day 3 | Explicit CSS kill-switch on `::view-transition-old/new/group(*)` with `@media (prefers-reduced-motion: reduce) { animation: none !important; }`. GSAP TitleCard reads `matchMedia` and shows final state immediately. |
| **C1** | **GSAP "ReferenceError: window is not defined" on server render** | Day 3 | `'use client'` + `useGSAP()` hook + module-level `gsap.registerPlugin(ScrollTrigger)`. Never manual `useEffect` cleanup. |
| **D2** | **Lenis `syncTouch: true` causes iOS jank** (the `smoothTouch` deprecation rabbit hole) | Day 1 | Keep `syncTouch: false` (the default). iOS gets native momentum scroll — correct. Document in CLAUDE.md to prevent future "fix" attempts. |
| **E1** | **MDX frontmatter drift across case studies** (TitleCard prop-shape mismatch) | Day 3 schema + Days 9–12 enforce | Zod schema in `lib/case-study-schema.ts` validates at build via `instrumentation.ts`. `mdx-frontmatter.sh` hook must validate the full Zod schema, not just "frontmatter exists" — extend if needed. |
| **A4** | **GSAP + Lenis triple-bundle on every route** | Day 3 (establish pattern) | GSAP imports quarantined to `components/TitleCard.tsx` only. Dynamic `import('gsap')` inside `useGSAP`. Lenis at root client provider (not in every page). No Framer Motion. |
| **A1** | **`next/font/google` CLS on first paint** (96px Inter Display reflow blows 0.05 CLS budget) | Day 1 | `adjustFontFallback: true`, `preload: true` for body+display, `preload: false` for serif. Only import weights actually used (Inter Display: `['600','700']`). Verify build output includes `size-adjust` / `ascent-override`. |
| **D1** | **View Transitions API browser-compat gap** (Firefox < 144, Safari < 18) | Day 2 + Day 14 QA | `withViewTransition(updateDOM)` wrapper feature-detects and falls through to instant nav. Test on real Safari 17 / Firefox 143 — fallback is graceful, not broken. |

**Harness coverage:** ~70% of the 24 pitfalls are auto-caught by the 8 hooks. Three pitfalls need hook extensions (B1 copper-on-cream rule semantics, E1 Zod schema validation, D2 `syncTouch: true` blocker). Three pitfalls need Day-14 ops setup (E3 robots.txt, F3 Vercel cache, F4 perf-budget in CI).

→ Full pitfall catalog: [PITFALLS.md](PITFALLS.md)

---

## Open Questions for Roadmapper

1. **Next.js 15 vs 16 — confirm.** Research recommends 16.2.6 (greenfield, zero migration). Blueprint and PROJECT.md name Next.js 15. **Roadmapper should flag this explicitly in Phase 0 and ask the user.**
2. **Portrait shoot timing.** Oakland portrait is OUT-OF-BAND of dev but ON-CRITICAL-PATH for launch quality. Recommend booking before Phase 0 starts.
3. **Resend domain verification — do it Day 1, not Day 14.** DNS propagation risk. Add as Phase 0 task.
4. **Frontmatter source for case studies — Pattern A or hybrid?** Architecture research recommends a hybrid: `lib/case-studies.ts` reads frontmatter via `gray-matter` for index pages + OG generation, while case-study pages use dynamic `import()` to load the rendered MDX body. **Confirm in Phase 6.**
5. **Static-to-video hover on Work index tiles — v1 or v1.1?** Listed as P1 in FEATURES.md but deferrable to v1.1 if 14-day timeline tight. Set the bar in Phase 8 (ship if Day 13 has slack).
6. **ORDANI verbatim vs verbatim-with-Day-9-edits.** Confirm Days 9–10 are pure execution (no rewriting); case-study-writer only fills in stills + captions.
7. **`case_study_read_complete` event threshold.** Scroll depth ≥ 90% on `/work/*` and per-session firing — confirm in Phase 8.
8. **Copy-lint scope.** Does `copy-lint.sh` already scan component prop strings, frontmatter values, and `metadata` exports — or only MDX prose? Verify Day 1 and extend if scope is narrow.
9. **Robots.txt + sitemap.xml authorship.** PITFALLS E3 warns against accidentally `noindex`-ing ORDANI. Confirm Phase-8 task explicitly writes these with recommended directives (allow Googlebot; disallow GPTBot/Google-Extended for case studies).
10. **Phase numbering convention.** Build order uses Phases 0–8. Confirm 0-indexed vs 1-indexed preference.

---

## Confidence Assessment

| Area | Confidence | Notes |
|---|---|---|
| Stack | **HIGH** | Every version verified against npm registry + official docs on 2026-05-14. Next.js 16 docs dated 2026-05-13. GSAP free-license confirmed via Webflow blog + GSAP Standard License. |
| Features | **HIGH** | Every feature maps to a specific blueprint § or PROJECT.md requirement. Cross-checked against 2026 industry portfolio research. |
| Architecture | **HIGH** | Route-groups + single-root-layout + `<ViewTransition>` pattern verified against Next.js View Transitions guide (2026-05-13) + Vercel Labs reference demo. Tailwind v4 `@theme` + `data-mode` pattern verified against Tailwind docs. |
| Pitfalls | **HIGH** (stack-specific) / **MEDIUM** (brand-discipline drift) | Stack pitfalls verified against GSAP issues #603/#606, Next.js #74134/#73838/#62332, Lenis 1.x release notes, Can I Use. Brand-drift extrapolated from industry literature. |

**Overall confidence: HIGH.** The four research files agree on every load-bearing decision. The one explicit divergence from input docs (Next.js 16 vs 15) is flagged and reversible.

### Gaps to address during planning
- **Harness extension scoping** — need to inventory what `copy-lint.sh`, `mdx-frontmatter.sh`, and `motion-discipline.sh` currently catch before deciding which extensions to build.
- **Portrait shoot operational details** — photographer booking, location, wardrobe, B&W vs warm color decision — not in research scope.
- **Klim license decision** — v2 path is researched, but trigger condition for the v2 upgrade is undefined.

---

## Source Documents

- [STACK.md](STACK.md) — 584 lines. Versions, packages, install commands, integration gotchas (8 critical), alternatives considered, what NOT to use, version compatibility matrix.
- [FEATURES.md](FEATURES.md) — 22 table stakes / 17 differentiators / 32 anti-features / feature dependency graph / MVP definition / competitor analysis.
- [ARCHITECTURE.md](ARCHITECTURE.md) — 14 sections. Directory tree, route groups + layout strategy (one root, two groups), View Transitions three-file wiring, font cascade, component boundaries, MDX data flow, build order, anti-patterns.
- [PITFALLS.md](PITFALLS.md) — 1,126 lines. 24 pitfalls across 6 categories. ~70% auto-caught by harness; ~30% manual via subagents or hook extensions.

---

*Synthesis for: micahjonesconsulting.com (House Lights two-mode marketing site)*
*Researched: 2026-05-14 — ready for roadmap*
