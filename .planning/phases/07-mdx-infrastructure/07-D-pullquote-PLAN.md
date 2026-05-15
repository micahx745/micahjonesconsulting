# Plan 07-D — PullQuote Component

**Phase:** 07 MDX Infrastructure
**Plan letter:** D
**Wave:** 1 (parallel with 07-A, 07-B, 07-C)
**Requirements supported:** CASE-08
**Files touched:**
- `components/PullQuote.tsx` — CREATE
- `app/globals.css` — UPDATE (append `.case-study-pull-quote` block with copper underline-grow keyframes + reduced-motion guard)

## Goal

Ship `<PullQuote>` with the signature copper underline-grow on scroll-into-view (2s ease). Client component (needs IntersectionObserver). **Does NOT import GSAP** — uses CSS `@keyframes`/transitions + IntersectionObserver to toggle a `data-in-view` attribute. Reduced-motion users render with the underline already drawn.

## Steps

1. **Create `components/PullQuote.tsx`** verbatim per `07-RESEARCH.md` §5.8:
   - `'use client'` directive
   - Import only React hooks (`useEffect`, `useRef`, `useState`) + `ReactNode` type — NO `gsap`, NO `@gsap/react`
   - `interface PullQuoteProps { children: ReactNode; attribution?: string }`
   - `useEffect` body:
     1. Read `prefers-reduced-motion: reduce` via `matchMedia`
     2. If reduced-motion: `setInView(true)` and return (skips Observer)
     3. Otherwise: instantiate `IntersectionObserver` with `threshold: 0.4`; on intersect, `setInView(true)` and `observer.disconnect()`
     4. Cleanup function disconnects the observer on unmount
   - Render:
     ```
     <figure ref={ref} class="case-study-pull-quote" data-in-view={inView ? "true" : "false"}>
       <blockquote class="case-study-pull-quote__quote">{children}</blockquote>
       {attribution && <figcaption class="case-study-pull-quote__attribution">— {attribution}</figcaption>}
     </figure>
     ```

2. **Append CSS to `app/globals.css`** (the `.case-study-pull-quote*` rules from `07-RESEARCH.md` §5.11):
   - `.case-study-pull-quote` — figure margin, max-width 56ch
   - `.case-study-pull-quote__quote` — Source Serif 4 italic, clamp font size 24-32px, position relative, padding-bottom 16px (for the ::after underline)
   - `.case-study-pull-quote__quote::after` — copper bar 2px height, `transform: scaleX(0)`, `transform-origin: left center`, `transition: transform 2000ms cubic-bezier(0.2, 0.8, 0.2, 1)`
   - `.case-study-pull-quote[data-in-view="true"] .case-study-pull-quote__quote::after` — `transform: scaleX(1)` (triggers the grow)
   - `.case-study-pull-quote__attribution` — Source Serif 4, sans? no — match dek meta line: sans, 0.85rem, letter-spacing 0.04em, theater-ink-soft color
   - `@media (prefers-reduced-motion: reduce) { ::after { transition: none !important; transform: scaleX(1) !important; } }` — defense-in-depth (component sets `data-in-view=true` immediately under reduced-motion, but CSS also kills the transition to make absolutely sure no animation runs)

3. **Verify no GSAP import** at end of plan:
   - `grep -nE "import.*gsap" components/PullQuote.tsx` → zero matches
   - Same grep across `components/Dek.tsx`, `components/CopperRule.tsx`, `components/CaseStudyStill.tsx` → zero matches

## Verification

- `pnpm typecheck` clean.
- `pnpm build` clean.
- `components/PullQuote.tsx` exists, exports `PullQuote`, starts with `'use client'`.
- `app/globals.css` contains the `.case-study-pull-quote*` selectors including the `[data-in-view="true"]` trigger and the reduced-motion guard.
- Grep confirms no GSAP imports outside `components/TitleCard.tsx`.

## Success criteria

CASE-08 implemented. PullQuote uses CSS + IntersectionObserver, not GSAP. Reduced-motion users render with the final-state underline immediately. The 2s copper underline-grow animates on scroll-into-view for motion-OK users.
