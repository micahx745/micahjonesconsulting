# Plan 06-C — About page (app/(foyer)/about/page.tsx)

**Phase:** 06 Foyer Pages
**Plan letter:** C
**Wave:** 2 (parallel with 06-B / 06-D / 06-F)
**Requirements supported:** FOYER-04 (About composition), FOYER-05 (150-word paragraph verbatim)
**Files touched:**
- `app/(foyer)/about/page.tsx` — CREATE
- (No CSS work — 06-B appends the shared Phase 6 CSS block which About consumes)

## Goal

Build the About page per blueprint §7 + §8:
- Hero line: "I build the things I used to ask other people to build."
- Two-column grid (8/4 desktop, stacked mobile): left holds the 150-word About paragraph verbatim from §8; right holds the vertical portrait slot + Oakland sub-caption + credits list.
- Oakland family-context single paragraph below.
- Three numbered values: 01 ship the work / 02 trust the operator / 03 show the receipts.

All copy verbatim. Portrait slot is a placeholder (Phase 9 fills the image).

## Steps

1. Create `app/(foyer)/about/page.tsx` verbatim from 06-RESEARCH §3.5.
2. Verify the 150-word paragraph matches blueprint §8 word-for-word. Em-dash count: 1 ("Now I run my own shop in Oakland — half consulting…"). Within the §8 source the paragraph has exactly one em-dash, matching the CLAUDE.md COPY-05 cap.

## Verification

- `pnpm typecheck` clean.
- `pnpm lint:copy` clean (the §8 paragraph is pre-vetted; the family-context paragraph + values list scanned manually in research).
- Word-count check on the long-form paragraph: 150 words ±2 (the §8 paragraph as written is 150 words).
- Em-dash count: 1 in the long-form paragraph (verified via grep).

## Success criteria

- 150-word About paragraph renders verbatim per blueprint §8.
- Two-column grid stacks at <960px, splits 8/4 at ≥960px.
- Vertical portrait slot renders as aspect-[4/5] placeholder with copper-tinted hairline.
- Credits list shows: guardicore/akamai · flexport · surveymonkey · cuebiq.
- Three numbered values render in order with 01/02/03 prefix.
