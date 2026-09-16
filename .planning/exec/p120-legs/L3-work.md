# Leg L3: the /work index, the clip component, the redirects (sonnet)

Brief §3b.1 to §3b.4, §3b.8, and the §3b.12 clipnav verifier. Read brief lines 3032-3415, 3934-4000
and 4027-4270. Skip §3b.5 (CSS) and §3b.7 (media): other owners.

## YOUR FILES

- `app/(foyer)/work/page.tsx` — replace whole: block at line 3124 (with O-e).
- `components/color-worlds/WorkHeroClip.tsx` — new: block at line 3316.
- `next.config.ts` — insert the block at line 3939 exactly where §3b.8 says (anchor by the quoted text).
- `.planning/exec/clipnav120.mjs` — new: block at line 4176, exactly.

## OVERRIDES

- **O-e** (brief O9): in `app/(foyer)/work/page.tsx` both `title: "Work: pipeline, products, and exits",`
  lines (metadata.title and openGraph.title) become `title: "Work: revenue, products, and exits",`.

No other departure. The media files already exist in `public/media` (`work-hero-720.mp4`,
`work-hero-720.webm`, `work-hero-poster-960.avif`, plus `guardicore-band-960.jpg` from O5). Do not
touch `public/media`.

## CONTEXT

Other legs are writing `lib/case-study-schema.ts`, `lib/case-studies.ts`, `content/work-page.ts` and
`app/globals.css` right now. Do not edit them; do not run tsc.

## CHECKS (paste raw output)

1. Diff `page.tsx` and `WorkHeroClip.tsx` against their blocks (page.tsx: only O-e may differ). Show the
   `next.config.ts` diff (`git diff -- next.config.ts`).
2. The §3b.12 W2 static greps that read only your files (list which you ran and which you skipped
   because they read another leg's file).
3. `node --check .planning/exec/clipnav120.mjs`.
