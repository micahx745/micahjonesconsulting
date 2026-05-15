---
phase: 01-scaffold-tokens-dns
plan: E
status: complete
completed: 2026-05-14
---

# Plan 01-E: Root Layout — SUMMARY

## What was built

Overwrote `app/layout.tsx` with the Phase 1 root layout from RESEARCH.md §10. Single root layout (required for View Transitions API — multiple root layouts would force full page reloads and kill the cross-fade). Phase 1 wires the fonts cascade endpoint + globals.css import + base metadata; Phase 2 will add `<ViewTransition>`, `<LenisProvider>`, `<Analytics>`, `<SpeedInsights>`.

## Files modified

- `app/layout.tsx` — replaced scaffolder default (Geist fonts + "Create Next App" metadata)

## Implementation

- Imports `interDisplay`, `inter`, `sourceSerif` from `@/lib/fonts` using `@/*` path alias
- Imports `./globals.css` (activates Tailwind v4 `@theme` tokens on every route)
- `metadata` export:
  - `title.default = "Micah Jones — Oakland operator"`
  - `title.template = "%s — Micah Jones"`
  - `description = "Micah Jones is an Oakland-based operator who builds the systems other people promise to build, and ships them."` (blueprint §8 verbatim)
  - `metadataBase = new URL("https://micahjonesconsulting.com")`
- `<html lang="en" suppressHydrationWarning>` with className concatenating all three `.variable` strings
- Empty `<body>{children}</body>` shell

## Phase 2 slots intentionally empty

The Phase 1 layout deliberately omits these imports/components so Phase 2 can drop them in without restructuring:
- `<ViewTransition name="root">` (TRANS-01)
- `<LenisProvider>` (LENIS-01)
- `<Analytics />` + `<SpeedInsights />` (ANALY-01)

The doc-block at the top of `app/layout.tsx` references these by name as a future-self note. The runtime code does NOT import them.

## Requirements covered

- SCAFF-05 (Phase 1 portion): Single root layout established with fonts cascade endpoint. `mdx-components.tsx` itself remains a Phase 7 deferral per RESEARCH §"Deferred Ideas".

## Key files

```yaml
key-files:
  modified:
    - app/layout.tsx
```
