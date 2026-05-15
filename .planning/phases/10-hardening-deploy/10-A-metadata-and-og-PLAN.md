# 10-A — Per-route metadata + Foyer OG image composition

**Covers:** OG-01, OG-02
**Depends on:** Phase 6 foyer pages, Phase 5 theater OG pattern
**Estimated effort:** 1 hour
**Files touched:** 11 (1 new component, 5 new OG routes, 5 metadata edits, 1 generateMetadata)

---

## Pre-flight

1. Confirm `next/og` is available (transitively via `next` 16.2.6 — yes, see Phase 5 OG route already imports `ImageResponse from "next/og"`).
2. Confirm `cs.dek` is non-empty across all 4 case studies (Phase 8 frontmatter verified).

---

## Changes

### 1. Create `components/og/foyer-og-composition.tsx`

Verbatim per 10-RESEARCH.md §2.2. Export `FoyerOGComposition({ eyebrow, description })`.

### 2. Create 5 foyer OG image routes

| File | Eyebrow | Description |
|------|---------|-------------|
| `app/(foyer)/opengraph-image.tsx` | "OAKLAND OPERATOR" | "Premium two-mode portfolio for Micah Jones, Oakland-based operator. Product, growth, consulting for founders and birth-worker practices." |
| `app/(foyer)/about/opengraph-image.tsx` | "ABOUT" | "Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product." |
| `app/(foyer)/work-with-me/opengraph-image.tsx` | "WORK WITH ME" | "Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js)." |
| `app/(foyer)/contact/opengraph-image.tsx` | "CONTACT" | "Two-field note form for Micah Jones. Two-business-day reply commitment. Or email hello@micahjonesconsulting.com any time." |
| `app/(foyer)/work/opengraph-image.tsx` | "WORK" | "Case studies from Micah Jones: ORDANI HIPAA-compliant CRM for birth workers, HR equity playbook, Passioneer, Akamai positioning research." |

Each follows the template in 10-RESEARCH.md §2.3.

### 3. Update per-route metadata exports

**Home (`app/(foyer)/page.tsx`)**: replace existing `metadata` with full version (title + description + openGraph + twitter). Per 10-RESEARCH.md §2.4.

**About (`app/(foyer)/about/page.tsx`)**: add `metadata` export at top of file. Per 10-RESEARCH.md §2.4.

**Work With Me (`app/(foyer)/work-with-me/page.tsx`)**: add `metadata` export at top of file. Per 10-RESEARCH.md §2.4.

**Contact (`app/(foyer)/contact/page.tsx`)** is a Client Component — cannot export metadata. Instead, create `app/(foyer)/contact/layout.tsx` (Server Component, metadata-only). Per 10-RESEARCH.md §9.

**Work index (`app/(foyer)/work/page.tsx`)**: add `metadata` export at top of file. Per 10-RESEARCH.md §2.4.

### 4. Add `generateMetadata` to theater case-study page

In `app/(theater)/work/[slug]/page.tsx`, add the async function from 10-RESEARCH.md §2.4 (case-study section) above the default export. Reads `cs.title` + `cs.dek` from frontmatter.

---

## Verification

1. `pnpm typecheck` clean.
2. `pnpm build` clean (copy-lint passes on all new strings).
3. Inspect built sitemap (after 10-B) lists `<image:image>` URLs (not required; nice-to-have).
4. Hit `http://localhost:3000/opengraph-image` in dev (after `pnpm dev`) — expect 1200×630 PNG.
5. Hit `http://localhost:3000/about/opengraph-image`, `.../work-with-me/opengraph-image`, etc. — expect 1200×630 PNGs.
6. Hit `http://localhost:3000/work/ordani/opengraph-image` — expect 1200×630 PNG (Phase 5 path; unchanged behavior).

---

## Rollback

If verification fails, all changes are additive (new files) or surgical (metadata-only additions). Revert the page diffs first; the new OG image routes can be left in place — they don't affect existing rendering.
