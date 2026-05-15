# Plan 06-B — Home page (app/(foyer)/page.tsx)

**Phase:** 06 Foyer Pages
**Plan letter:** B
**Wave:** 2 (depends on 06-A helpers)
**Requirements supported:** FOYER-02 (Home composition), FOYER-03 (hero copy verbatim)
**Files touched:**
- `app/(foyer)/page.tsx` — REPLACE (was Phase 4 stub)
- `app/globals.css` — APPEND (Phase 6 foyer-page CSS block from 06-RESEARCH §3.10)

## Goal

Replace the Phase 4 stub Home with the full composition per blueprint §7: hero positioning sentence + subline (FOYER-03 verbatim), full-bleed portrait slot with copper rule, three-card selected-work strip via `TitleCardComposition`, About teaser, Work With Me teaser, Contact CTA. Server Component. No client `<TitleCard>` consumption (preserves one-signature-motion rule).

Also lands the appendable Phase 6 CSS block in `globals.css` (this plan owns the CSS append so subsequent page plans don't fight over the same file).

## Steps

1. Replace `app/(foyer)/page.tsx` verbatim with 06-RESEARCH §3.4 content.
2. Append the Phase 6 CSS block (06-RESEARCH §3.10) at the end of `app/globals.css`. Use Edit tool to insert the block after the existing TitleCard styles closing brace.
3. Visual sanity: hero verbatim string match against blueprint §8.

## Verification

- `pnpm typecheck` clean.
- `pnpm lint:copy` clean (hero + subline + teasers all use blueprint-verbatim language, audited in research).
- `pnpm build` clean — Next.js prerenders `/` as static or server-streamed.
- The hero `<h1>` text matches FOYER-03 EXACTLY: "I help operators ship the work the rest of their org keeps stalling on."

## Success criteria

- Hero copy verbatim per blueprint §8.
- Portrait slot is a styled `<div>` placeholder (no `<img>`, no `<Image>`).
- Three selected-work `<TitleCardComposition phase="stacked">` cards rendering with derived words from `test-slug.mdx` frontmatter (will be one card for Phase 6 since only one MDX exists).
- About teaser, Work With Me teaser, Contact CTA all present with `→` link affordance to respective routes via `ViewTransitionLink`.
