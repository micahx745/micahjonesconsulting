# Plan 07-F — Dynamic Theater Case-Study Page

**Phase:** 07 MDX Infrastructure
**Plan letter:** F
**Wave:** 3 (depends on Wave 1 schema + helpers and Wave 2 mdx-components map)
**Requirements supported:** THEATER-04
**Files touched:**
- `app/(theater)/work/[slug]/page.tsx` — UPDATE (replace Phase 4 stub with real MDX render)
- `app/globals.css` — UPDATE (append the case-study render rules: `.case-study`, `.case-study__header`, `.case-study__meta`, `.case-study__body h2/p/ul/li`, `.case-study__nav`, etc.)

## Goal

Replace the Phase 4 stub page with the real render pipeline:
1. Validate slug + load case-study frontmatter via `getCaseStudyBySlug` (Plan 07-A)
2. Dynamic `import()` the MDX body via `@/content/work/${slug}.mdx`
3. Render in blueprint §9 order: TitleCard → Dek + meta → optional hero still → MDX body → footer nav ([NEXT WORK ↘] [BACK TO FOYER ↗])
4. Call `notFound()` on unknown slug
5. Wire `generateStaticParams` so all known case studies prerender at build

## Steps

1. **Rewrite `app/(theater)/work/[slug]/page.tsx`** verbatim per `07-RESEARCH.md` §5.9:
   - Imports: `notFound` from `next/navigation`; `TitleCard`, `Dek`, `CaseStudyStill`, `ViewTransitionLink` from `@/components/*`; `getAllCaseStudies`, `getCaseStudyBySlug`, `getNextCaseStudy` from `@/lib/case-studies`
   - `export async function generateStaticParams()` returning `[{ slug }]` for every known study
   - `export const dynamicParams = true` (Phase 7 — Phase 10 may flip to false)
   - `TheaterCaseStudyPage` server component:
     - Resolve `slug` from awaited params
     - Load `cs = await getCaseStudyBySlug(slug)`; if null, `notFound()`
     - Dynamic `import('@/content/work/${slug}.mdx')` → `MDXContent = mod.default`
     - `next = await getNextCaseStudy(slug)`
     - Return article with the 5-section render order:
       1. `<TitleCard words={cs.titleCardWords} caption={cs.dek} heroSrc={cs.heroStill} heroAlt={cs.title} />`
       2. `<header class="case-study__header"><Dek>{cs.dek}</Dek><p class="case-study__meta">{role · tools · year}</p></header>`
       3. `{cs.heroStill ? <CaseStudyStill src=... alt=... date={cs.year} /> : null}`
       4. `<div class="case-study__body"><MDXContent /></div>` (the MDX body provides Problem / Why / Approach / Outcome / PullQuote)
       5. `<nav class="case-study__nav">{next && <ViewTransitionLink to={/work/${next.slug}}>next work ↘</...>}<ViewTransitionLink to="/">back to foyer ↗</...></nav>`

2. **Append CSS to `app/globals.css`** — the remaining `[data-mode="theater"] .case-study*` rules from `07-RESEARCH.md` §5.11 that weren't covered by Waves 1's Dek/CopperRule/Still/PullQuote plans:
   - `.case-study` outer padding (matches foyer-page padding rhythm)
   - `.case-study__header` — max-width 64ch, vertical margins
   - `.case-study__meta` — sans, 0.85rem, letter-spacing, theater-ink-soft, dots for separators, copper role color
   - `.case-study__body` — max-width 64ch, body type, line-height 1.7
   - `.case-study__body h2` — Inter Display 600, clamp 26-36px, generous top margin
   - `.case-study__body h2:first-child` — zero top margin (avoids stacking with previous section)
   - `.case-study__body p` — bottom margin 20px
   - `.case-study__body ul / li` — list-style none, em-dash prefix in copper, padding-left
   - `.case-study__nav` — top margin 128px, top border, flex column on mobile / row on desktop
   - `.case-study__nav-link` — sans 0.95rem, copper, lowercase, position relative + 1px copper underline that lifts 4px on hover (mirrors foyer nav hover pattern)
   - reduced-motion guard on the nav-link hover transform

3. **Sanity-check the MDX dynamic import pattern.** Next.js 16 supports template-literal dynamic imports for files matching a known set. The pattern `import(`@/content/work/${slug}.mdx`)` is the same one used in ARCHITECTURE §7.2 Pattern A. If the bundler emits a warning, we record it in 07-VERIFY-OUTPUT.md and confirm the route still resolves at runtime — Phase 8 will add explicit slug-map fallback if needed.

## Verification

- `pnpm typecheck` clean.
- `pnpm build` clean — produces a static prerender for `/work/test-slug` (the only existing slug).
- Hitting `/work/test-slug` in dev returns 200 and renders all five sections.
- `notFound()` fires on `/work/this-does-not-exist` (returns 404 page).
- The `<TitleCard>` consumes `cs.titleCardWords` + `cs.dek` correctly (props validated by Phase 5's `titleCardSchema.parse` inside the client component).

## Success criteria

THEATER-04 implemented. The dynamic theater page renders case studies in the documented order (TitleCard → Dek → hero → MDX body → footer nav). The frontmatter and MDX body are loaded via the hybrid pattern (gray-matter + dynamic import) per ARCHITECTURE §7.2.
