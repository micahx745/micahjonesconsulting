# Plan 07-C — CaseStudyStill Component

**Phase:** 07 MDX Infrastructure
**Plan letter:** C
**Wave:** 1 (parallel with 07-A, 07-B, 07-D)
**Requirements supported:** CASE-09, THEATER-05
**Files touched:**
- `components/CaseStudyStill.tsx` — CREATE
- `app/globals.css` — UPDATE (append `.case-study-still` block + film-grain data URI)

## Goal

Ship the `<CaseStudyStill>` component — a captioned still that follows blueprint §4c: 2px warm off-white inner border + 4% film-grain overlay + caption in "name — date" format (date rendered as "Mon YYYY"). Server component using `next/image`. Gracefully renders a placeholder when `src` is omitted (Phase 7 testing — real images land in Phase 8/9).

## Steps

1. **Create `components/CaseStudyStill.tsx`** verbatim per `07-RESEARCH.md` §5.7:
   - Server component (no `'use client'`)
   - `interface CaseStudyStillProps`: `src?`, `alt`, `caption?`, `date` (required), `width? = 1440`, `height? = 900`
   - `formatDate()` helper converts `"YYYY-MM"` → `"Mon YYYY"` (Jan/Feb/Mar/Apr/May/Jun/Jul/Aug/Sep/Oct/Nov/Dec); pass-through for non-ISO inputs
   - Render structure:
     ```
     <figure class="case-study-still">
       <div class="case-study-still__frame">
         {src ? <Image ...> : <div class="case-study-still__placeholder">}
         <div class="case-study-still__grain" aria-hidden />
       </div>
       <figcaption class="case-study-still__caption">{captionText} — {formattedDate}</figcaption>
     </figure>
     ```
   - Caption text: `caption ?? alt`; date suffix from `formatDate(date)`

2. **Append CSS to `app/globals.css`** (the `.case-study-still*` rules from `07-RESEARCH.md` §5.11):
   - `.case-study-still` — figure layout, top/bottom margin
   - `.case-study-still__frame` — relative positioning, 2px solid `var(--color-theater-ink)` border (the warm off-white per blueprint §4c), `overflow: hidden`, theater-surface background
   - `.case-study-still__image` — block, 100% width, auto height
   - `.case-study-still__placeholder` — block, 16:10 aspect-ratio, gradient between two `color-mix` shades of theater-surface
   - `.case-study-still__grain` — absolute inset 0, opacity 0.04, mix-blend-mode overlay, SVG `feTurbulence` data URI background-image at 160×160 tile (the 4% film-grain per §4c)
   - `.case-study-still__caption` — Source Serif 4 italic, 15px, soft theater-ink-soft color

3. **Sanity-check** the SVG data URI:
   - Escape sequence `%23n` represents `#n` (the filter ID anchor in the SVG)
   - Tailwind v4 / Next.js does NOT need additional escaping for data URIs in CSS background-image; the URL is already URL-encoded
   - design-tokens.sh warns only on raw hex literals — `%23n` is not a hex color, so it should pass; if the hook flags it, the data URI gets a `/* design-tokens-allow-data-uri */` comment marker

## Verification

- `pnpm typecheck` clean.
- `pnpm build` clean.
- `components/CaseStudyStill.tsx` exists and exports `CaseStudyStill`.
- `app/globals.css` contains the four `.case-study-still*` selectors.
- The film-grain data URI renders (manual: in dev, the still placeholder shows a visible noise texture on hover-inspection of the overlay div opacity).

## Success criteria

CASE-09 + THEATER-05 implemented. The component is server-renderable, handles missing `src` gracefully, formats the caption per spec, applies the 2px bone border and 4% film-grain per blueprint §4c.
