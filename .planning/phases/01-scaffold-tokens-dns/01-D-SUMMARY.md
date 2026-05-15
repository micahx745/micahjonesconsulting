---
phase: 01-scaffold-tokens-dns
plan: D
status: complete
completed: 2026-05-14
---

# Plan 01-D: Font Cascade — SUMMARY

## What was built

Created `lib/fonts.ts` per RESEARCH.md §6. Three exported font instances from `next/font/google`: `interDisplay` (Inter at display weights), `inter` (Inter at body weights), `sourceSerif` (Source Serif 4 with `axes: ['opsz']`). All three set `adjustFontFallback: true` (Pitfall A1 mitigation — Next.js injects `size-adjust` + `ascent-override` metrics into generated `@font-face` rules to neutralize CLS on first paint).

## Files created

- `lib/fonts.ts` — 46 lines, three named exports

## Configuration matrix

| Export | Family | Weights | Variable | Preload | Special |
|---|---|---|---|---|---|
| `interDisplay` | Inter | 600/700/800 | `--font-inter-display` | true | Display weights for TitleCard 96px headlines |
| `inter` | Inter | 400/500/600 | `--font-inter` | true | Body type |
| `sourceSerif` | Source_Serif_4 | 400/500 | `--font-source-serif` | false | `axes: ['opsz']`, `style: ['normal', 'italic']`, below-the-fold |

All three set `display: 'swap'` and `adjustFontFallback: true`.

## Requirements covered

- SCAFF-04: `next/font/google` loads Inter Display + Inter + Source Serif 4 with `axes: ['opsz']`

## Variable name cross-check

Variable names match the `@theme` block in `app/globals.css` (Plan C):
- `--font-inter-display` → `var(--font-inter-display)` in `--font-display`
- `--font-inter` → `var(--font-inter)` in `--font-sans`
- `--font-source-serif` → `var(--font-source-serif)` in `--font-serif`

Plan E's `app/layout.tsx` concatenates `interDisplay.variable`, `inter.variable`, `sourceSerif.variable` into the `<html>` className so all three CSS variables activate.

## Key files

```yaml
key-files:
  created:
    - lib/fonts.ts
```
