---
phase: 01-scaffold-tokens-dns
plan: C
status: complete
completed: 2026-05-14
---

# Plan 01-C: Design Tokens — SUMMARY

## What was built

Overwrote `app/globals.css` with the complete Tailwind v4 `@theme` block from RESEARCH.md §3. All 11 blueprint §4b color tokens, font cascade variable re-declarations, spacing scale, mode-driven attribute selectors, and View Transitions slot reservation now live in one file. This is the canonical design contract every downstream phase consumes.

## Files modified

- `app/globals.css` — completely overwritten. Replaced scaffolder default (Geist demo styles + dark-mode media query) with House Lights tokens.

## Token coverage

- **Colors (11):** foyer-paper #F5EFE4, foyer-ink #1A1816, foyer-ink-soft #3A3631, theater-ground #0D0D0F, theater-surface #16161A, theater-ink #EAE6DD, theater-ink-soft #9C988F, accent-copper #C8542B, accent-copper-deep #8E3A1E, ordani-sage #5E7158 (scoped), rule-foyer #D9D2C4, rule-theater #2A2A30
- **Pitfall B1 contrast rule documented:** comment block above color tokens explains 3.85:1 vs 5.4:1 distinction
- **Mode contract:** `[data-mode="foyer"]` and `[data-mode="theater"]` attribute selectors set background-color + color (Phase 4 wraps route groups with these data-mode attributes)
- **Font cascade re-declaration:** `--font-display`, `--font-sans`, `--font-serif` reference `var(--font-inter-display)`, `var(--font-inter)`, `var(--font-source-serif)` — names match Plan D's `lib/fonts.ts` exactly
- **Spacing (TOKEN-06):** `--spacing-page-x-desktop: 128px`, `--spacing-page-x-mobile: 64px`, `--spacing-gutter-desktop: 80px`, `--spacing-gutter-mobile: 16px`, `--measure-body: 68ch`, `--measure-sidenote: 28ch`
- **View Transitions slot:** reserved with a comment block at bottom; Phase 2 fills with `::view-transition-old/new(root)` keyframes + `prefers-reduced-motion` kill switch

## Requirements covered

- TOKEN-01: All 11 color tokens defined as CSS custom properties in `@theme`
- TOKEN-02: CSS contract for `[data-mode]` attribute selectors (Phase 4 wires layouts)
- TOKEN-03: Tailwind reads mode via attribute selectors
- TOKEN-04: `--accent-copper-deep` body-emphasis token (Pitfall B1)
- TOKEN-05: `--ordani-sage` scoped token (allowlist enforced Phase 8)
- TOKEN-06: 12-col / 80gutter / 4px-base / 68ch body / 128/64 page padding spacing scale

## Key files

```yaml
key-files:
  modified:
    - app/globals.css
```

## Note on encoding

The CSS comment block uses the ASCII text "Safe for" / "NOT safe for" / "Use for" instead of emoji checkmarks/X — Windows console encoding can mangle UTF-8 emoji in build output. The semantic meaning is preserved and Plan G's `.claude/CLAUDE.md` documents the same rule.
