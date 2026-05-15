# Plan 07-B — Dek + CopperRule Components

**Phase:** 07 MDX Infrastructure
**Plan letter:** B
**Wave:** 1 (parallel with 07-A, 07-C, 07-D)
**Requirements supported:** THEATER-04 partial (Dek beat in render order)
**Files touched:**
- `components/Dek.tsx` — CREATE
- `components/CopperRule.tsx` — CREATE
- `app/globals.css` — UPDATE (append `.case-study-dek` + `.case-study-copper-rule` rules)

## Goal

Ship the two simplest MDX-mapped components: `<Dek>` and `<CopperRule>`. Both are pure server components — no `'use client'`, no state, no effects. Sets the visual rhythm for the theater render order (Dek under TitleCard; CopperRule as section break inside MDX bodies).

## Steps

1. **Create `components/Dek.tsx`** verbatim per `07-RESEARCH.md` §5.5:
   - Server component (no `'use client'`)
   - `interface DekProps { children: ReactNode }`
   - Renders `<p className="case-study-dek">{children}</p>`
   - One-paragraph header doc comment citing THEATER-04 + blueprint §9

2. **Create `components/CopperRule.tsx`** verbatim per `07-RESEARCH.md` §5.6:
   - Server component
   - No props
   - Renders `<hr className="case-study-copper-rule" aria-hidden="true" />`
   - One-line doc comment

3. **Append CSS to `app/globals.css`** (subset of `07-RESEARCH.md` §5.11 — only the Dek and CopperRule blocks; the larger Phase 7 CSS block lands progressively across waves):
   - `[data-mode="theater"] .case-study-dek` — Source Serif 4 italic, clamp font size, theater-ink color
   - `[data-mode="theater"] .case-study-copper-rule` — 1px copper top border, centered, max-width 320px
   - Place these inside a new top-level CSS comment block titled `CASE STUDY (THEATER) — Phase 7` so subsequent Wave-1 plans (07-C, 07-D) can append more rules under the same header without conflict

## Verification

- `pnpm typecheck` clean.
- `pnpm build` clean (these components aren't yet wired into routes, so no rendering required at this step — they compile).
- `components/Dek.tsx` and `components/CopperRule.tsx` exist and export the named symbols.
- `app/globals.css` contains a `CASE STUDY (THEATER) — Phase 7` section with the Dek + rule classes.

## Success criteria

The two simplest theater MDX components are server-renderable. They're consumed by `mdx-components.tsx` (07-E) and the dynamic page (07-F). CSS is in place.
