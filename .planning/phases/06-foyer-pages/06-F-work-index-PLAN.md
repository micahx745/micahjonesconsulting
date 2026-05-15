# Plan 06-F — Work index (app/(foyer)/work/page.tsx)

**Phase:** 06 Foyer Pages
**Plan letter:** F
**Wave:** 2 (parallel with 06-B / 06-C / 06-D)
**Requirements supported:** FOYER-08 (Work index with TitleCard thumbnails)
**Files touched:**
- `app/(foyer)/work/page.tsx` — CREATE

## Goal

Build the Work index page that lists every case study from `content/work/*.mdx` (via `getAllCaseStudies()` from 06-A) as a `TitleCardComposition phase="stacked"` thumbnail, each wrapped in a `ViewTransitionLink` to `/work/[slug]`. Phase 6 has only `test-slug.mdx`, so one thumbnail renders today; Phase 8 case studies will be picked up automatically once the MDX files land.

Important: thumbnails are STATIC. The client `<TitleCard>` (with GSAP pin) is NOT used here — that would fire the signature motion on every thumbnail AND drag GSAP into the foyer Work-index bundle. The pin animates on the case study itself.

## Steps

1. Create `app/(foyer)/work/page.tsx` verbatim from 06-RESEARCH §3.8.
2. Confirm import is from `@/components/TitleCardComposition` (server-safe), NOT `@/components/TitleCard` (client + GSAP).

## Verification

- `pnpm typecheck` clean.
- `pnpm lint:copy` clean.
- Build output: the `/work` route bundle should NOT include GSAP (verifiable via `grep -r "gsap" .next/server/app/work` returning zero or only false-positive matches from other routes).
- Visual: at /work, single thumbnail renders for `test-slug`. Title and dek rendered as meta below the thumbnail.

## Success criteria

- `/work` lists all `content/work/*.mdx` files as thumbnails (1 file today, 4+ post-Phase 8).
- Each thumbnail is a `TitleCardComposition phase="stacked"` — vertical word stack visible, caption + hero hidden via CSS scoping.
- Each thumbnail wraps in `ViewTransitionLink` to `/work/[slug]` so the click triggers the foyer↔theater cross-fade.
- Empty-state fallback message renders if `getAllCaseStudies()` returns zero entries (defensive coding for the case where someone removes the test-slug file).
