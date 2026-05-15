---
phase: 01-scaffold-tokens-dns
plan: B
status: complete
completed: 2026-05-14
---

# Plan 01-B: Build Configs — SUMMARY

## What was built

Overwrote `next.config.ts` and `postcss.config.mjs` with the canonical House Lights configurations from RESEARCH.md §2 and §4. Tailwind v4 first-install footgun (separate `@tailwindcss/postcss` package) avoided. `experimental.viewTransition: true` enabled for Phase 2's React `<ViewTransition>` primitive. `withMDX()` wrapper + `pageExtensions: ['ts', 'tsx', 'md', 'mdx']` set so Phase 7 can drop in MDX case-study files.

## Files modified

- `next.config.ts` — overwritten. Imports `createMDX` from `@next/mdx`, declares `pageExtensions`, sets `experimental.viewTransition: true`, exports `withMDX(nextConfig)`.
- `postcss.config.mjs` — overwritten. Single plugin: `"@tailwindcss/postcss"` (NOT `"tailwindcss"`).

## Key files

```yaml
key-files:
  created: []
  modified:
    - next.config.ts
    - postcss.config.mjs
```

## Verification

- `next.config.ts` contains `viewTransition: true`, `createMDX`, `pageExtensions`, `mdx`
- `postcss.config.mjs` contains `@tailwindcss/postcss`, does NOT contain `"tailwindcss":` directly
- Both files match RESEARCH.md §2 and §4 verbatim

## Notes

The scaffolder already wrote a `postcss.config.mjs` with the correct `@tailwindcss/postcss` reference (Next 16 with `--tailwind` flag does this correctly). This plan made the configuration deterministic by writing it verbatim from RESEARCH. The previous scaffolder export was `const config = {...}; export default config;` — the new version is a direct `export default {...}`, semantically identical but matches RESEARCH §4.
