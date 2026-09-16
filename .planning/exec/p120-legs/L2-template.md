# Leg L2: the study template components (sonnet)

Brief §3.1, §3.3, §3.6.3, the §3.6.5 PullQuote attribute, §3.8, §3.10, §4.1 (TitleCard), and the
`template120.mjs` verifier. Read brief lines 1207-1515, 1926-2014, 2266-2268, 2304-2340, 2360-2495,
2496-2680 (skip the CSS blocks: another leg writes `app/globals.css`), and 2680-2740.

## YOUR FILES

- `app/(theater)/work/[slug]/page.tsx` — rewrite per §3.3 (brief line 1314): the head block at line
  1322; then the KEPT functions from today's file (`generateStaticParams`, `dynamicParams`,
  `clampDescription`, `generateMetadata`, with their comments) with exactly two §2.2 changes (brief
  lines 387-388): `generateStaticParams` filters with `.filter(isPublished)` instead of
  `.filter((cs) => cs.status !== "stub")`, and `generateMetadata` uses `clampDescription(cs.description)`
  instead of `clampDescription(cs.dek)`; then the default export block at line 1348. Nothing else from
  the old file survives.
- `components/TitleCard.tsx` — replace whole: block at line 2546.
- `app/(theater)/work/[slug]/opengraph-image.tsx` — replace whole: block at line 2366.
- `mdx-components.tsx` (repo root) — replace whole: block at line 2306.
- `components/study/StudyBlocks.tsx` — new: block at line 1928.
- `components/PullQuote.tsx` — one attribute only (brief lines 2266-2268).
- DELETE `components/TitleCardComposition.tsx`, `components/CaseStudySidebar.tsx`,
  `components/CaseStudyStill.tsx`, `components/Dek.tsx`, `components/CopperRule.tsx`.
- `.planning/exec/template120.mjs` — new: block at line 2740, exactly.

## CONTEXT

Another leg is rewriting `lib/case-study-schema.ts`, `lib/title-card-schema.ts` and
`lib/case-studies.ts` right now (adding `isPublished`, `PublishedCaseStudyMeta`, `SERVICE_LABELS`,
`titleLines`, `description`, `publishedAt`, `entry`, `hero`). Write against those names as the brief
gives them; do not edit those files; do not run tsc.

The kept functions' comments stay as they are, unless one names a retired field from brief line 1060
(`titleCardWords|heroStill|indexLine|CaseStudySidebar|cs.year|cs.tools|cs.role|.stats|.feature`); if
one does, report its text (do not rewrite it).

## OVERRIDES

None for your files beyond the two §2.2 changes above. (The Guardicore band photograph is now
`/media/guardicore-band-960.jpg` at 960x1200 via frontmatter; `page.tsx` reads `cs.hero`, so nothing
changes here.)

## CHECKS (paste raw output)

1. Diff each whole-file result against its block. For `page.tsx`, diff the head and the default export
   against blocks 1322 and 1348, and show the kept functions as they now read.
2. C2, C3, C4, C11, C12, C13 from the table at brief lines 2698-2710. (C4 may still list a lib file the
   other leg has not finished: paste raw and say so.)
3. `node --check .planning/exec/template120.mjs`.
4. `grep -rn "TitleCardComposition\|CaseStudySidebar\|CaseStudyStill\|components/Dek\|CopperRule" app components lib mdx-components.tsx content` — paste raw.
