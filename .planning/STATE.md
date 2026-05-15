---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: in_progress
last_updated: "2026-05-14T22:30:00.000Z"
progress:
  total_phases: 10
  completed_phases: 9
  total_plans: 50
  completed_plans: 50
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-14)

**Core value:** A primary-audience visitor — a Black HR consultant, a doula, a birth worker — feels welcomed in the first ten seconds and stays through one case study.
**Current focus:** Phase 9 (Portrait Integration) complete; Phase 10 (Hardening, OG/SEO, Production Deploy) next — paused per --no-transition flag

## Current Position

Phase: 9 of 10 complete; Phase 10 next (Hardening, OG/SEO, Production Deploy)
Plan: 3/3 complete in Phase 9; 0 of TBD in Phase 10
Status: Phase 9 verified PASS (2/2 REQ-IDs PHOTO-02 + PHOTO-03 wired with placeholders + AVIF pipeline; 4/4 ROADMAP success criteria addressed; 4 MCP screenshots @ 1440 + 390 confirm portrait slots render with placeholder, copper rule on Home, "Oakland, CA." sub-caption on About, no horizontal scroll at 390); pause-between-phases cadence (per --no-transition flag)
Last activity: 2026-05-14 — Phase 9 executed plans 09-A (added sharp@0.34.5 devDep, wrote scripts/generate-placeholders.mjs, generated public/portrait-main.placeholder.png 1200×1500 15KB + public/portrait-context.placeholder.png 900×1125 10KB; both 4:5 vertical solid foyer-paper PNGs with "PORTRAIT COMING DAY 7-14" Arial overlay), 09-B (wrote components/PortraitImage.tsx server component with fs.existsSync(public/portrait-<variant>.jpg) build-time fallback to placeholder PNG, real-image alt "Micah Jones, Oakland" + "Micah Jones at his Oakland workspace" auto-engages on operator file drop, placeholder strap "placeholder, final portrait Day 7-14" + alt with commas instead of em-dashes to preserve COPY-05; wired into app/(foyer)/page.tsx as `<PortraitImage variant="main" priority />` with copper rule preserved + app/(foyer)/about/page.tsx as `<PortraitImage variant="context" />` with "Oakland, CA." sub-caption preserved; appended 4 CSS blocks to app/globals.css for .portrait-slot--has-image + __image + --placeholder + __strap, all using --color-* tokens), 09-C (appended "Portrait swap" runbook section to .claude/CLAUDE.md before Definition of done documenting the three-step operator flow, captured 4 MCP screenshots in .planning/phases/09-portrait-integration/verification-artifacts/ + Lighthouse JSON report, wrote 09-VERIFY-OUTPUT.md verdict PASS). All static checks clean: typecheck zero errors, pnpm build clean with [copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations + 12/12 static pages generated. GSAP quarantine intact (only components/TitleCard.tsx imports gsap). Lighthouse Accessibility/Best-Practices/SEO/Agentic-Browsing all 100; Performance category excluded by the MCP lighthouse_audit tool — real LCP measurement deferred to Phase 10 with the actual portrait. Phase 10 (Hardening, OG/SEO, Production Deploy — PERF-01..09, A11Y-01..04 + 06..07, RESP-01..04, OG-01..04, ANALY-02..03, DEPLOY-01 + 03..06) now unblocked but paused per --no-transition.

Progress: [█████████░] 90%

## Performance Metrics

**Velocity:**
- Total plans completed: 0 (timer not yet wired)
- Average duration: —
- Total execution time: 0.0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: 08-D, 08-E, 09-A, 09-B, 09-C
- Trend: —

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Direction: House Lights (two-mode site — foyer cream / theater dark)
- Open-source typography path (Inter Display + Inter + Source Serif 4); Klim Söhne/Tiempos deferred to v2
- Single signature motion: TitleCard (built in Phase 5, the ONE motion move that signs the site)
- Next.js 16.2.6 adopted (research recommendation; blueprint named 15 — flag in Phase 1 if user objects)
- Resend DNS verification moved to Phase 1 (Day 1) per pitfall research, not Day 14
- Portrait shoot booking initiated in Phase 1 as out-of-band-of-dev parallel workstream
- **NEW in Phase 5**: Two-file split between server-safe `TitleCardComposition` and client `TitleCard` — keeps GSAP quarantine clean and enables future reuse (e.g., Phase 6 Work index thumbnails) without dragging GSAP into other route bundles.
- **NEW in Phase 5**: OG image (`opengraph-image.tsx`) inlines a Satori-compatible twin of the composition (no Tailwind classes, no CSS variables) because Satori cannot resolve the @theme block. Hex literals inside the OG route are the documented exception to `design-tokens.sh`.
- **NEW in Phase 5**: PIN_DISTANCE_PX = 240 calibrated for ~600ms perceived pin at Lenis lerp 0.08. Tunable in `components/TitleCard.tsx`.
- **NEW in Phase 6**: Home + Work index thumbnails consume `TitleCardComposition` (NOT `TitleCard`) — confirms the Phase 5 split was the right call. The client/GSAP wrapper only mounts on the case-study route itself, preserving the one-signature-motion discipline.
- **NEW in Phase 6**: Contact form uses React 19 `useActionState` for inline thank-you state. The Server Action lazy-reads env vars inside the function body (not at module top) so build passes without `.env.local`. Phase 10 ops wires Resend + Supabase env in Vercel for the live deploy.
- **NEW in Phase 6**: `lib/case-studies.ts` defensively parses `content/work/*.mdx` frontmatter — no Zod yet (Phase 7's job per CASE-01). Derives TitleCard `words[]` from `title` if frontmatter omits `titleCardWords`; sorts published-first then year-descending so Phase 8 case studies bubble above the Phase 4 stub automatically.
- **NEW in Phase 6**: One blueprint deviation — the word "solutions" appears in blueprint §7/§8 (Home subline + Embed engagement card) but is on `lib/banned.ts:41`. Substituted with "consulting" — same operator-voice register, consistent with the "half consulting, half product" framing already in the About paragraph. Documented inline.
- **NEW in Phase 7**: `lib/case-study-schema.ts` Zod schema replaces the defensive parse — drift in any case-study MDX aborts the build with file path + Zod issue. Status enum locked to `"shipped" | "in-flight" | "archived" | "stub"`. `titleCardWords` enforces `.min(3).max(6)` mirroring the existing Phase 5 `titleCardSchema.words` bound.
- **NEW in Phase 7**: `lib/copy-lint-runner.ts` extended with `scanMdxFrontmatter()` pass — `pnpm build` now runs banned-words AND Zod gate in a single pre-step CLI. Single error report aggregates both classes of finding.
- **NEW in Phase 7**: `mdx-components.tsx` lives at REPO ROOT (NOT inside `app/`). Placing it inside `app/` would cause silent render failure where MDX falls back to default HTML primitives. Verified placement at end of execution.
- **NEW in Phase 7**: PullQuote uses CSS `transition: transform 2000ms cubic-bezier(0.2, 0.8, 0.2, 1)` + IntersectionObserver `threshold: 0.4`. NO GSAP — quarantine preserved (verified by grep). Reduced-motion two-layer guard: component sets `data-in-view="true"` immediately + CSS `@media (prefers-reduced-motion: reduce)` killswitch.
- **NEW in Phase 7**: CaseStudyStill film-grain via inline SVG `feTurbulence` data URI at `opacity: 0.04, mix-blend-mode: overlay`. 2px warm off-white border uses `--color-theater-ink` (the bone token from `@theme`). Placeholder branch renders when `src` is undefined (Phase 7 testing — Phase 8/9 supplies real images).
- **NEW in Phase 7**: `next.config.ts` wires `remark-frontmatter` (so YAML doesn't render as content) and `remark-gfm` (tables for Phase 8). Turbopack requires plugins as `[string, options]` tuples for serializability (`[["remark-frontmatter", ["yaml"]], "remark-gfm"]`). Direct module imports fail with "does not have serializable options".
- **NEW in Phase 7**: Render order on `/work/[slug]` enforced in `page.tsx`: TitleCard → header (Dek + meta line role · tools · year) → optional `<CaseStudyStill>` for `frontmatter.heroStill` → MDX body inside `<div class="case-study__body">` → footer `<nav>` with conditional [NEXT WORK ↘] + always [BACK TO FOYER ↗]. Matches blueprint §9 wireframe exactly.
- **NEW in Phase 7**: Negative-frontmatter test (`status: "invalid-enum"` → `pnpm build`) confirmed exit 1 with `[case-study-schema] content/work/test-slug.mdx: status: Invalid option: expected one of "shipped"|"in-flight"|"archived"|"stub"`. This is the binding proof CASE-02 success criterion #1 ("build fails with line numbers on any mismatch") is met.
- **NEW in Phase 9**: Placeholder-then-real-image swap pattern via `<PortraitImage>` server component. `fs.existsSync(process.cwd() + "/public/portrait-<variant>.jpg")` at build time resolves to real image when operator drops the file; falls back to `public/portrait-<variant>.placeholder.png` produced by `scripts/generate-placeholders.mjs` (sharp-based, 4:5 vertical, ~10-15KB each, well under image-budget 500KB cap). Zero code change required for swap — operator's flow is `cp final.jpg public/portrait-main.jpg && pnpm build && vercel --prod`. Documented in `.claude/CLAUDE.md` "Portrait swap" section.
- **NEW in Phase 9**: Hex literals `#F5EFE4` + `#3A3631` appear in `scripts/generate-placeholders.mjs` for SVG-to-PNG generation. This is the third documented exception to `design-tokens.sh` (precedent: Phase 5 OG image inlined hex because Satori cannot resolve CSS custom properties). The script lives under `scripts/` which is outside the build-time scanner scope (scanner walks `app/` and `content/` only). Hex usage is generation tooling, not site type.
- **NEW in Phase 9**: Em-dash discipline in new placeholder text. Strap (`placeholder, final portrait Day 7-14`) + placeholder alt (`Portrait of Micah Jones (placeholder, final shoot Day 7-14)`) use commas instead of em-dashes to avoid bumping the per-page em-dash count over the COPY-05 cap when in placeholder mode. Real-image alt (`Micah Jones, Oakland` + `Micah Jones at his Oakland workspace`) also comma-based for consistency. Function unchanged.
- **NEW in Phase 9**: `sharp@0.34.5` added as devDependency. Used only by `scripts/generate-placeholders.mjs`; not pulled into the production bundle. Cross-platform binary resolved cleanly on Windows native dev; Vercel Linux build will resolve identically at install time.

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

None yet.

### Blockers/Concerns

[Issues that affect future work]

- **Phase 9 is complete** — Phase 10 (Hardening, OG/SEO, Production Deploy) now unblocked. Phase 9 ships placeholder portraits and the `<PortraitImage>` wiring; real photos are operator-side per Phase 1 PORTRAIT-OUTREACH.md and the new `.claude/CLAUDE.md` "Portrait swap" runbook.
- **Portrait shoot timing**: real Oakland portraits are still pending the Phase 1 booking outcome. When they arrive, operator drops them at `public/portrait-{main,context}.jpg` and `pnpm build && vercel --prod` swaps in zero-code. Phase 10 should re-measure LCP on Home mobile slow 4G with the real image (Phase 9 placeholder LCP is artificially fast and informational only).
- **Resend DNS propagation**: 24-72h lag. Submitted Phase 1 so Phase 10 deploy is unblocked. Contact form is code-complete; live integration requires `RESEND_API_KEY` + `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set in Vercel env (Phase 10 ops).
- **PIN_DISTANCE_PX calibration**: 240 is a single constant in `components/TitleCard.tsx`. If Phase 8 case-study feedback says pin feels off-tempo, retune there.
- **Supabase `contact_messages` table + RLS**: Phase 10 ops needs to create the table (columns: `name text`, `message text`, `created_at timestamptz default now()`) with an RLS policy allowing only service-role inserts.

## Session Continuity

Last session: 2026-05-14 (Phase 9 execution + verify)
Stopped at: Phase 9 complete; placeholder PNGs + `<PortraitImage>` server-component wiring shipped; Home + About slots render placeholder; operator swap path is zero-code (drop real .jpg → pnpm build → deploy); 4 MCP screenshots @ 1440 + 390 confirm visual rendering, copper rule on Home, "Oakland, CA." sub-caption on About, no horizontal scroll at 390; ready for `/gsd:plan-phase 10` (Hardening, OG/SEO, Production Deploy)
Resume file: None (use `/gsd:plan-phase 10` to begin hardening + prod deploy)
