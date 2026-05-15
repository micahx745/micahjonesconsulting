# Plan 05-A: TitleCard Schema + Presentation Styles

**Phase:** 05 TitleCard Signature Motion
**Requirements:** MOT-02 (Zod schema for 3-6 word array), MOT-03 (visual structure — typography portion), MOT-06 (mobile reflow CSS)
**Depends on:** Phase 1 (`@theme` block in `app/globals.css`, font CSS variables); Phase 2 (no direct dep but reduced-motion CSS pattern carries forward)
**Status:** Ready
**Estimated LOC:** 1 new TS file (~30 lines) + ~85 lines appended to `app/globals.css`

---

## Goal

Lay the foundation for Phase 5 by writing the two non-component pieces that the rest of the phase depends on:

1. **`lib/title-card-schema.ts`** — single source-of-truth Zod schema for TitleCard props. Used by `TitleCard.tsx` (runtime validation, MOT-02), the OG route (Phase 5-D), and later by Phase 7's MDX frontmatter loader.
2. **`app/globals.css` append** — typography for the vertical word stack (96px desktop / 64px mobile, MOT-03 + MOT-06), caption (Source Serif 4 italic), hero slot, and the `@media (prefers-reduced-motion: reduce)` CSS safety net that ensures the resolved state is visible even if JS fails to mount.

Both files are small, foundational, and independent of GSAP — written in Wave 1 so Wave 2's `TitleCardComposition.tsx` and `TitleCard.tsx` can compile against them.

---

## File Operations

### NEW: `lib/title-card-schema.ts`

```ts
// lib/title-card-schema.ts
//
// Phase 5 — MOT-02. Zod schema for the TitleCard component props.
//
// Why a schema (not just TS types):
//   - Catches MDX frontmatter drift at render-time (Phase 7 will pipe
//     content/work/*.mdx frontmatter `titleCardWords` through this schema).
//   - Provides a single source-of-truth that the OG route also uses.
//   - The min/max bounds (3..6 words) are the blueprint §4f spec — turning
//     them into a runtime validator prevents future PRs from drifting past.
//
// Source: blueprint §4f ("three to six words"); REQUIREMENTS.md MOT-02;
//         STACK.md §"Email / Form / Data" (zod is already a project dep).
import { z } from "zod";

export const titleCardSchema = z.object({
  /** 3 to 6 short words, each non-empty. Renders as a vertical stack. */
  words: z
    .array(z.string().min(1, "word must be non-empty"))
    .min(3, "TitleCard requires at least 3 words")
    .max(6, "TitleCard supports at most 6 words"),

  /** One-sentence caption shown after the resolve. Source Serif 4 italic. */
  caption: z.string().min(1, "caption is required"),

  /** Optional path to a hero still — fades in below the caption after the resolve. */
  heroSrc: z.string().optional(),

  /** Alt text for the hero still. Required if heroSrc is set. */
  heroAlt: z.string().optional(),
});

export type TitleCardProps = z.infer<typeof titleCardSchema>;
```

### MODIFIED: `app/globals.css` — append at end of file

```css
/* ============================================================
 * TITLE CARD — Phase 5 (MOT-03 visual structure + MOT-06 mobile reflow)
 *
 * The vertical word stack is the signature element. Inter Display 700
 * (weight imported in lib/fonts.ts), 96px desktop / 64px mobile,
 * negative letter-spacing for tight stack rhythm.
 *
 * The caption uses Source Serif 4 italic at 22px (foyer caption rhythm
 * carried into theater). The hero slot is a responsive box.
 *
 * Initial visibility is controlled by inline `style={{opacity: ...}}` in
 * TitleCardComposition; GSAP overrides on mount in TitleCard. This file
 * only carries TYPOGRAPHY + LAYOUT, not motion state.
 *
 * The data-title-card scope ensures multiple TitleCards on the same page
 * (Phase 6 Work index) don't share state.
 *
 * Source: blueprint §4f; REQUIREMENTS.md MOT-03, MOT-06.
 * ============================================================ */

[data-title-card] {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100dvh;          /* fills the viewport so pin has room */
  padding: 64px var(--spacing-page-x-mobile);
  width: 100%;
}

@media (min-width: 768px) {
  [data-title-card] {
    padding: 128px var(--spacing-page-x-desktop);
  }
}

/* The vertical word stack — pinned during the GSAP reveal */
.title-card-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.title-card-word {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 64px;             /* MOT-06 — mobile reflow */
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: inherit;              /* foyer ink or theater bone, set by [data-mode] ancestor */
}

@media (min-width: 768px) {
  .title-card-word {
    font-size: 96px;           /* blueprint §4f */
  }
}

/* The resolved state — caption + hero, layered on top of the (faded) stack */
.title-card-resolved {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding: inherit;
  pointer-events: none;        /* GSAP toggles via inline style; layout pre-positioned */
}

.title-card-caption {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 20px;
  line-height: 1.5;
  letter-spacing: -0.005em;
  max-width: 64ch;
  color: inherit;
}

@media (min-width: 768px) {
  .title-card-caption {
    font-size: 22px;
  }
}

.title-card-hero {
  position: relative;
  width: 100%;
  max-width: 720px;
  aspect-ratio: 4 / 3;
  background-color: var(--color-theater-surface);
  border: 2px solid var(--color-theater-ink);
  overflow: hidden;
}

.title-card-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.title-card-hero--placeholder {
  background-color: var(--color-theater-surface);
}

/* MOT-05 reduced-motion safety net.
 * The TitleCard component itself reads matchMedia and short-circuits, but
 * if the JS fails to mount (network blip, JS disabled, hydration error),
 * the CSS here ensures the user STILL sees the resolved state — never
 * a frozen pin or a flash of stacked-only content. */
@media (prefers-reduced-motion: reduce) {
  [data-title-card] [data-tc-stack] {
    opacity: 0 !important;
  }
  [data-title-card] [data-tc-resolved] {
    opacity: 1 !important;
  }
  [data-title-card] [data-tc-caption] {
    opacity: 1 !important;
    transform: none !important;
  }
  [data-title-card] [data-tc-hero] {
    opacity: 1 !important;
  }
}
```

---

## Acceptance

- `pnpm typecheck` clean (the schema file should compile cleanly)
- `pnpm build` clean (the appended CSS should not break the Tailwind v4 build)
- File `lib/title-card-schema.ts` exists and exports `titleCardSchema`, `TitleCardProps`
- `app/globals.css` contains a `[data-title-card]` selector block (verify with `grep "data-title-card" app/globals.css`)
- The reduced-motion safety net `@media (prefers-reduced-motion: reduce) { [data-title-card]` is present
- No banned words introduced (copy-lint scanner does not run on `.css` files, but the schema strings are clean)

---

## Notes

- Zod is already a project dependency (Phase 2 contact-form validation prep). No `pnpm add` needed.
- The schema uses `z.array(z.string().min(1)).min(3).max(6)` to enforce both per-word non-empty AND array size constraints.
- The CSS uses `data-tc-stack`, `data-tc-resolved`, `data-tc-caption`, `data-tc-hero` attribute selectors — these match what `TitleCardComposition.tsx` (05-B) will write and what `TitleCard.tsx` (05-C) will query via `useGSAP({scope})`.
- The `.title-card-hero` border uses `--color-theater-ink` (bone) per blueprint §4c's "2px warm off-white inner border" — same border used by Phase 7's `<CaseStudyStill>`. This anticipates that consistency.
- Reduced-motion CSS uses `!important` deliberately — it's a fail-safe for the case where GSAP fails to mount. The runtime check in `TitleCard.tsx` is the primary mechanism (MOT-05); this is belt-and-suspenders.
