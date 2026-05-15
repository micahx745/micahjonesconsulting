---
phase: 01-scaffold-tokens-dns
plan: B
type: execute
wave: 2
depends_on:
  - A
files_modified:
  - next.config.ts
  - postcss.config.mjs
autonomous: true
requirements:
  - SCAFF-02
  - SCAFF-03
must_haves:
  truths:
    - "`next.config.ts` enables `experimental.viewTransition: true` so React's <ViewTransition> primitive resolves in Phase 2 wiring."
    - "`next.config.ts` wraps the config with `withMDX()` from `@next/mdx` so .mdx files can be loaded as page modules (Phase 7 uses)."
    - "`next.config.ts` declares `pageExtensions: ['ts', 'tsx', 'md', 'mdx']` so MDX content/work pages resolve in Phase 7."
    - "`postcss.config.mjs` uses `@tailwindcss/postcss` (NOT `tailwindcss`) as the PostCSS plugin — Tailwind v4 first-install footgun avoided."
  artifacts:
    - path: "next.config.ts"
      provides: "Next.js build configuration with viewTransition + MDX"
      contains: "viewTransition: true"
    - path: "postcss.config.mjs"
      provides: "PostCSS pipeline wiring Tailwind v4"
      contains: "@tailwindcss/postcss"
  key_links:
    - from: "next.config.ts"
      to: "Phase 2 ViewTransition wrapper in app/layout.tsx"
      via: "experimental.viewTransition: true flag"
      pattern: "viewTransition:\\s*true"
    - from: "next.config.ts"
      to: "Phase 7 mdx-components.tsx + content/work/*.mdx"
      via: "withMDX() wrapper + pageExtensions includes mdx"
      pattern: "pageExtensions.*mdx"
    - from: "postcss.config.mjs"
      to: "app/globals.css @theme block (Plan C)"
      via: "@tailwindcss/postcss plugin"
      pattern: "@tailwindcss/postcss"
---

<objective>
Write `next.config.ts` and `postcss.config.mjs` with the exact content from RESEARCH.md §2 and §4. These two files configure Next.js 16's build pipeline so:
1. The View Transitions API is enabled (`experimental.viewTransition: true`) — required for Phase 2's `<ViewTransition>` wrapper to function.
2. MDX files compile to page modules via `withMDX()` — required for Phase 7's case-study render path.
3. Tailwind v4 PostCSS plugin is wired (`@tailwindcss/postcss`, NOT `tailwindcss` direct) — the v4 first-install footgun is avoided.

Purpose: REQ SCAFF-02 (Tailwind v4 PostCSS plugin separate package) + SCAFF-03 (next.config.ts with viewTransition + withMDX). These are the build-system foundation files.
Output: Two configuration files that Phase 2 (TRANS-01) and Phase 7 (CASE-07) build on top of.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md

**Scope:** This plan overwrites the scaffolder's default `next.config.ts` and `postcss.config.mjs`. The scaffolder produces functional defaults but they lack the `experimental.viewTransition` flag, the `withMDX()` wrapper, and the `pageExtensions` allow-list.

**Pitfall — Tailwind v4 PostCSS plugin separation (RESEARCH §"Common Pitfalls" + STACK.md):**
The most common first-install error in 2025–2026 is using `tailwindcss` directly as a PostCSS plugin. v4 moved the plugin into a separate package — `@tailwindcss/postcss`. The scaffolder MAY have produced a correct `postcss.config.mjs` already (Next 16 + `--tailwind` flag does emit the right config), but this plan overwrites it deterministically.

**Sources:**
- Next.js viewTransition config: https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition (2026-05-13)
- Next.js MDX guide: https://nextjs.org/docs/app/guides/mdx
- Next.js pageExtensions: https://nextjs.org/docs/app/api-reference/config/next-config-js/pageExtensions
- Tailwind v4 PostCSS install: https://tailwindcss.com/docs/installation/using-postcss
</context>

<tasks>

<task type="auto">
  <name>Task B1: Overwrite next.config.ts with viewTransition + withMDX</name>
  <files>
    next.config.ts
  </files>
  <action>
Overwrite `C:/Users/micah/Code/micahjonesconsulting/next.config.ts` with the EXACT content from RESEARCH.md §2 "`next.config.ts` — Complete Content". Write the file verbatim from research; do not paraphrase.

Final file content:

```ts
// Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition (2026-05-13)
//         + https://nextjs.org/docs/app/guides/mdx
//         + https://nextjs.org/docs/app/api-reference/config/next-config-js/pageExtensions
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .mdx and .md files to be treated as page modules
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Enable React's <ViewTransition> primitive for foyer↔theater route navigation.
  // The component itself is imported from 'react' (not 'next') in app/layout.tsx (wired in Phase 2).
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({
  // MDX plugins are silent for Phase 1 — Phase 7 enables remark-gfm for case-study tables.
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

After saving, do NOT yet run `pnpm typecheck` — Plan E's `app/layout.tsx` rewrite and Plan C's `app/globals.css` rewrite need to land first. Plan J does the final integrated typecheck + build verification.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && grep -q "viewTransition: true" next.config.ts && grep -q "createMDX" next.config.ts && grep -q "pageExtensions" next.config.ts && grep -q "mdx" next.config.ts && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `next.config.ts` exists with `experimental.viewTransition: true`, `pageExtensions: ['ts', 'tsx', 'md', 'mdx']`, and the `withMDX()` wrapper. The file's default export is `withMDX(nextConfig)`.
  </done>
</task>

<task type="auto">
  <name>Task B2: Overwrite postcss.config.mjs with Tailwind v4 plugin</name>
  <files>
    postcss.config.mjs
  </files>
  <action>
Overwrite `C:/Users/micah/Code/micahjonesconsulting/postcss.config.mjs` with the EXACT content from RESEARCH.md §4 "`postcss.config.mjs` — Complete Content". Write verbatim.

Final file content:

```js
// Source: https://tailwindcss.com/docs/installation/using-postcss
// Tailwind v4 requires the SEPARATE @tailwindcss/postcss package as the PostCSS plugin.
// Using `tailwindcss` directly here errors with "trying to use tailwindcss directly as a PostCSS plugin".
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**Critical:** The key inside `plugins` MUST be `"@tailwindcss/postcss"` (with the `@tailwindcss/` prefix), NOT `"tailwindcss"`. Using `"tailwindcss"` will error on `pnpm build` with: "It looks like you're trying to use tailwindcss directly as a PostCSS plugin."
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && grep -q "@tailwindcss/postcss" postcss.config.mjs && ! grep -q "\"tailwindcss\":" postcss.config.mjs && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `postcss.config.mjs` references `@tailwindcss/postcss` (NOT `tailwindcss` direct) as the PostCSS plugin.
  </done>
</task>

</tasks>

<verification>
- `next.config.ts` is valid TypeScript (will be verified via `pnpm typecheck` in Plan J)
- `next.config.ts` exports `withMDX(nextConfig)` with `experimental.viewTransition: true`
- `postcss.config.mjs` references `@tailwindcss/postcss` package (which was installed in Plan A Step 2)
- Both files match RESEARCH.md §2 and §4 verbatim
</verification>

<success_criteria>
- `next.config.ts` enables View Transitions API + MDX page modules
- `postcss.config.mjs` correctly wires Tailwind v4's separate PostCSS plugin package
- Phase 2 (TRANS-01) can import `<ViewTransition>` from `react` and have it function
- Phase 7 (CASE-07) can drop `mdx-components.tsx` at repo root and have MDX files compile
- Plan C's `app/globals.css` `@theme` block will be processed by Tailwind v4 via this PostCSS pipeline
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-B-SUMMARY.md` noting that next.config.ts and postcss.config.mjs match RESEARCH.md §2 and §4 verbatim, and confirming the v4 PostCSS plugin separation pitfall was avoided.
</output>
