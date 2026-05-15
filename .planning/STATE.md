---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: in_progress
last_updated: "2026-05-14T22:30:00.000Z"
progress:
  total_phases: 10
  completed_phases: 6
  total_plans: 35
  completed_plans: 35
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-14)

**Core value:** A primary-audience visitor — a Black HR consultant, a doula, a birth worker — feels welcomed in the first ten seconds and stays through one case study.
**Current focus:** Phase 6 (Foyer Pages) complete; Phase 7 (MDX Infrastructure) next — ready to plan

## Current Position

Phase: 6 of 10 complete; Phase 7 next (MDX Infrastructure)
Plan: 7/7 complete in Phase 6; 0 of TBD in Phase 7
Status: Phase 6 verified PASS (visual MCP-verification at 1440px for all 5 foyer routes; banned-word lint clean; typecheck + build clean; GSAP quarantine intact); pause-between-phases cadence (per --no-transition flag)
Last activity: 2026-05-14 — Phase 6 executed plans 06-A (lib/case-studies.ts + lib/contact-form-schema.ts helpers), 06-B (Home — hero verbatim + portrait slot + selected-work strip + teasers + globals.css Phase 6 CSS block), 06-C (About — two-column 8/4 + 150-word paragraph verbatim + portrait slot + credits + Oakland context + three numbered values), 06-D (Work With Me — three stacked engagement cards + four-question FAQ + → contact CTA), 06-E (Contact — useActionState client form + Server Action Zod → Resend → Supabase + .env.example), 06-F (Work index — TitleCardComposition thumbnails via getAllCaseStudies), 06-G (verify). Verdict: PASS. 7/7 FOYER REQs PASS. 5/5 ROADMAP success criteria PASS. **All five foyer routes are live with real verbatim copy from blueprint §7 + §8.** Hero "I help operators ship the work the rest of their org keeps stalling on." renders at Inter Display 700, fluid clamp(36-72px). About 150-word paragraph reproduced word-for-word from blueprint line 443 in two-column 8/4 grid alongside vertical portrait + credits (guardicore/akamai · flexport · surveymonkey · cuebiq). Work With Me ships three stacked engagement cards (Strategy Sprint / Embed / Build) with copper hairlines + four-question FAQ in `<dl>` definition list. Contact form uses React 19 `useActionState`; Server Action lazy-reads `RESEND_API_KEY` + `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` so build succeeds without env (Phase 10 ops wires them). Work index reads `content/work/*.mdx` via gray-matter through `getAllCaseStudies()`; thumbnails use `TitleCardComposition` (server-safe, no GSAP) to preserve one-signature-motion rule. **Copy-lint clean** — initial run caught the word "solutions" inside two explanatory comments; reworded to reference word indirectly. One blueprint deviation documented: subline "solutions" noun (banned-list line 41) substituted with "consulting" in three places (Home subline + Embed engagement card meta + Embed card body); same operator-voice register. Phase 7 (MDX Infrastructure) now unblocked.

Progress: [██████░░░░] 60%

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
- Last 5 plans: 06-C, 06-D, 06-E, 06-F, 06-G
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

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

None yet.

### Blockers/Concerns

[Issues that affect future work]

- **Phase 6 is complete** — Phase 7 (MDX Infrastructure: case-study schema + mdx-components map + PullQuote + CaseStudyStill) now unblocked. Phase 8 (real case-study MDX content) will populate the Work index automatically.
- **Portrait shoot timing**: Phase 9 depends on the Phase 1 booking landing within ~21 days. If photographer slot slips, Phase 9 slips and Phase 10 launch slips with it. Phase 6 ships portrait *slots* (cream placeholders with copper rule); Phase 9 swaps in real AVIF deliverables.
- **Resend DNS propagation**: 24-72h lag. Submitted Phase 1 so Phase 10 deploy is unblocked. Contact form is code-complete; live integration requires `RESEND_API_KEY` + `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set in Vercel env (Phase 10 ops).
- **PIN_DISTANCE_PX calibration**: 240 is a single constant in `components/TitleCard.tsx`. If Phase 8 case-study feedback says pin feels off-tempo, retune there.
- **Supabase `contact_messages` table + RLS**: Phase 10 ops needs to create the table (columns: `name text`, `message text`, `created_at timestamptz default now()`) with an RLS policy allowing only service-role inserts.

## Session Continuity

Last session: 2026-05-14 (Phase 6 execution + verify)
Stopped at: Phase 6 complete; all five foyer routes live with verbatim copy; ready for `/gsd:plan-phase 7` (MDX Infrastructure — case-study schema, mdx-components map, PullQuote, CaseStudyStill, CopperRule, theater page template)
Resume file: None (use `/gsd:plan-phase 7` to begin MDX infrastructure)
