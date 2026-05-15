---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: in_progress
last_updated: "2026-05-14T23:30:00.000Z"
progress:
  total_phases: 10
  completed_phases: 7
  total_plans: 42
  completed_plans: 42
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-14)

**Core value:** A primary-audience visitor — a Black HR consultant, a doula, a birth worker — feels welcomed in the first ten seconds and stays through one case study.
**Current focus:** Phase 7 (MDX Infrastructure) complete; Phase 8 (Case Studies — ORDANI verbatim + 3 others) next — ready to plan

## Current Position

Phase: 7 of 10 complete; Phase 8 next (Case Studies — Theater Content)
Plan: 7/7 complete in Phase 7; 0 of TBD in Phase 8
Status: Phase 7 verified PASS (8/8 REQ-IDs implemented with observable evidence, 5/5 ROADMAP success criteria met, MCP screenshots captured at 1440×900, negative-frontmatter test confirms the CASE-02 Zod gate aborts build with exit 1 + clear file path + valid-options list; GSAP quarantine intact); pause-between-phases cadence (per --no-transition flag)
Last activity: 2026-05-14 — Phase 7 executed plans 07-A (lib/case-study-schema.ts Zod + lib/case-studies.ts schema-validated rewrite + lib/copy-lint-runner.ts frontmatter Zod gate + foyer call-site `cs.words → cs.titleCardWords` rename), 07-B (components/Dek.tsx + components/CopperRule.tsx server components + globals.css Dek/rule rules), 07-C (components/CaseStudyStill.tsx server with next/image + placeholder fallback + 2px bone border + 4% film-grain SVG-feTurbulence data URI + "Mon YYYY" date formatter), 07-D (components/PullQuote.tsx client with IntersectionObserver + CSS keyframes copper underline-grow 2s + reduced-motion safe + NO GSAP), 07-E (mdx-components.tsx at REPO ROOT maps TitleCard/Dek/CaseStudyStill/PullQuote/CopperRule), 07-F (app/(theater)/work/[slug]/page.tsx full render order TitleCard → Dek + meta → optional hero → MDX body → footer nav, via gray-matter+dynamic-import hybrid; next.config.ts wires remark-frontmatter+remark-gfm), 07-G (test-slug.mdx richer body + full verify matrix). Verdict: PASS. **All five reusable case-study MDX components are live. The negative-frontmatter test (status: "invalid-enum" → build abort with `[case-study-schema] content/work/test-slug.mdx: status: Invalid option: expected one of "shipped"|"in-flight"|"archived"|"stub"`) is the binding proof CASE-02 works.** Render order on `/work/test-slug` matches blueprint §9 wireframe exactly (verified visually + by DOM grep). Phase 8 (Case Studies — Theater Content: ORDANI verbatim + HR Equity Author + Passioneer + Akamai) now unblocked.

Progress: [███████░░░] 70%

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
- Last 5 plans: 07-C, 07-D, 07-E, 07-F, 07-G
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

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

None yet.

### Blockers/Concerns

[Issues that affect future work]

- **Phase 7 is complete** — Phase 8 (Case Studies — Theater Content: ORDANI verbatim per blueprint §9, HR Equity Author anonymized per §10, Passioneer short-form, Akamai/Guardicore short-form) now unblocked. The MDX infrastructure (schema, components, render template) is in place; Phase 8 just ships content.
- **Portrait shoot timing**: Phase 9 depends on the Phase 1 booking landing within ~21 days. If photographer slot slips, Phase 9 slips and Phase 10 launch slips with it. Phase 6 ships portrait *slots* (cream placeholders with copper rule); Phase 9 swaps in real AVIF deliverables.
- **Resend DNS propagation**: 24-72h lag. Submitted Phase 1 so Phase 10 deploy is unblocked. Contact form is code-complete; live integration requires `RESEND_API_KEY` + `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set in Vercel env (Phase 10 ops).
- **PIN_DISTANCE_PX calibration**: 240 is a single constant in `components/TitleCard.tsx`. If Phase 8 case-study feedback says pin feels off-tempo, retune there.
- **Supabase `contact_messages` table + RLS**: Phase 10 ops needs to create the table (columns: `name text`, `message text`, `created_at timestamptz default now()`) with an RLS policy allowing only service-role inserts.

## Session Continuity

Last session: 2026-05-14 (Phase 7 execution + verify)
Stopped at: Phase 7 complete; MDX infrastructure in place; `/work/test-slug` renders the full blueprint §9 order with all 5 reusable components; CASE-02 Zod gate verified at build via negative test; ready for `/gsd:plan-phase 8` (Case Studies — Theater Content)
Resume file: None (use `/gsd:plan-phase 8` to begin case-study content)
