---
phase: 01-scaffold-tokens-dns
plan: E
type: execute
wave: 2
depends_on:
  - A
files_modified:
  - app/layout.tsx
autonomous: true
requirements:
  - SCAFF-05
must_haves:
  truths:
    - "`app/layout.tsx` is the single root layout — there are NO other root layouts (multiple-root-layout pattern would force full page reloads and kill the foyer↔theater View Transition)."
    - "`app/layout.tsx` imports the three font instances (`interDisplay`, `inter`, `sourceSerif`) from `@/lib/fonts` and concatenates their `.variable` strings into the `<html>` className — the cascade endpoint that makes the CSS variables resolve."
    - "`app/layout.tsx` imports `./globals.css` so the Tailwind v4 `@theme` block + token defaults render on every page."
    - "Default `metadata` export is set: title template (`'%s — Micah Jones'` with default `'Micah Jones — Oakland operator'`), description (positioning sentence verbatim), `metadataBase` set to `https://micahjonesconsulting.com`."
    - "`<html>` element has `suppressHydrationWarning` (next/font sometimes triggers hydration warnings that are false-positive in dev)."
    - "Phase 2 slots remain empty — no `<ViewTransition>`, no `<LenisProvider>`, no `<Analytics>`/`<SpeedInsights>` (those are TRANS-01, LENIS-01, ANALY-01 in Phase 2)."
  artifacts:
    - path: "app/layout.tsx"
      provides: "Root layout with fonts attached and globals.css imported"
      contains: "interDisplay.variable"
      min_lines: 25
      exports:
        - "default"
        - "metadata"
  key_links:
    - from: "app/layout.tsx"
      to: "lib/fonts.ts (Plan D)"
      via: "import { interDisplay, inter, sourceSerif } from '@/lib/fonts'"
      pattern: "from \"@/lib/fonts\""
    - from: "app/layout.tsx"
      to: "app/globals.css (Plan C)"
      via: "import './globals.css'"
      pattern: "import \"./globals.css\""
    - from: "<html> className"
      to: "CSS variable resolution in @theme block"
      via: "interDisplay.variable + inter.variable + sourceSerif.variable concatenation"
      pattern: "interDisplay\\.variable.*inter\\.variable.*sourceSerif\\.variable"
---

<objective>
Overwrite `app/layout.tsx` with the Phase 1 root-layout content from RESEARCH.md §10. This is the single root layout that all foyer + theater routes will inherit. Phase 1 wires only the fonts cascade endpoint, globals.css import, and base metadata — Phase 2 adds the `<ViewTransition>` wrapper, `<LenisProvider>`, and Vercel `<Analytics>` + `<SpeedInsights>` mounts.

Purpose: REQ SCAFF-05 is mostly DEFERRED to Phase 7 (per RESEARCH §"Deferred Ideas" — `mdx-components.tsx` at repo root is Phase 7 because no MDX exists yet). What Phase 1 owns from SCAFF-05's concerns is the *single root layout* contract that the MDX pipeline will inherit when Phase 7 wires it. By writing the root layout per RESEARCH §10, Phase 1 establishes the single-root-layout pattern that Phase 4's route groups will nest into and Phase 7's MDX pipeline will compile against.
Output: One root layout file (`app/layout.tsx`) that imports fonts + globals.css and renders an `<html>/<body>` shell with metadata.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md
@.planning/blueprint.md

**Architecture decision — single root layout (RESEARCH §"Architecture Patterns" + STACK.md):**
The View Transitions API requires a stable document root across foyer↔theater navigation. If foyer and theater each had their own root layout, navigation between them would force a full page reload and the cross-fade would not function. Phase 1 lays down the single root; Phase 4 nests `(foyer)/layout.tsx` and `(theater)/layout.tsx` as nested group layouts that wrap children with `<div data-mode="foyer">` / `<div data-mode="theater">`.

**Font className cascade (RESEARCH §"Pattern 2"):**
`next/font/google` generates a CSS variable per font instance. The variable name is set in `lib/fonts.ts` (Plan D) via the `variable:` field. Next.js exposes a `.variable` string on the returned object that is the className that activates the CSS variable. To make all three font variables resolve, all three `.variable` strings must be concatenated into the `<html>` element's className. The `@theme` block in `app/globals.css` (Plan C) reads the variables via `var(--font-inter-display)` etc.

**Why `suppressHydrationWarning`:**
`next/font/google` injects font className strings into the HTML at build time. In dev mode, occasionally the server-rendered className and client-hydrated className diverge in inconsequential ways (whitespace, font instance instantiation order). `suppressHydrationWarning` silences those false-positives without hiding real hydration mismatches in the children.

**Phase 2 slots (RESEARCH §"Deferred Ideas"):**
Phase 1 leaves the following slots empty so Phase 2 can drop them in without restructuring:
- `<ViewTransition>` wrapper (TRANS-01) — imported from `react`, NOT from `next`
- `<LenisProvider>` client component (LENIS-01) — must mount at root, not in group layouts
- `<Analytics />` + `<SpeedInsights />` (ANALY-01) — imported from `@vercel/analytics/next` and `@vercel/speed-insights/next`

Plan E DELIBERATELY does NOT import or render these. Phase 2 owns wiring per ROADMAP.

**Why `metadataBase`:**
Sets the canonical URL base for OG image paths, sitemap entries, and absolute URLs. Set to `https://micahjonesconsulting.com` even though Phase 10 owns Vercel deploy + DNS — having it set Day 1 means Phase 10 doesn't have to retrofit it.
</context>

<tasks>

<task type="auto">
  <name>Task E1: Overwrite app/layout.tsx with Phase 1 root layout (fonts + globals + metadata)</name>
  <files>
    app/layout.tsx
  </files>
  <action>
Overwrite `C:/Users/micah/Code/micahjonesconsulting/app/layout.tsx` with the EXACT content from RESEARCH.md §10 "`app/layout.tsx` — Phase 1 Scope (Fonts + html shell only)". The scaffolder produced a default `app/layout.tsx` rendering a "Welcome to Next.js" type shell — this task replaces it.

Final file content (write verbatim from RESEARCH.md §10):

```tsx
// Phase 1 scope: <html> + <body>, fonts attached, default metadata.
//
// PHASE 2 will add to this file (TRANS-01..05, LENIS-01..05, ANALY-01):
//   - <ViewTransition name="root"> wrapping {children} (import from 'react')
//   - <LenisProvider> client component wrapping the ViewTransition
//   - <Analytics /> + <SpeedInsights /> from @vercel/analytics/next and /speed-insights/next
//
// Phase 1 leaves slots empty so Phase 2 can drop them in without restructuring.
import type { Metadata } from "next";
import { interDisplay, inter, sourceSerif } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Micah Jones — Oakland operator",
    template: "%s — Micah Jones",
  },
  description:
    "Micah Jones is an Oakland-based operator who builds the systems other people promise to build, and ships them.",
  metadataBase: new URL("https://micahjonesconsulting.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interDisplay.variable} ${inter.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
```

**Critical writing rules:**
- Import path `@/lib/fonts` MUST use the `@/*` alias (paths set in tsconfig.json Plan A Task A3) — NOT a relative `../lib/fonts` import.
- The className concatenation order doesn't functionally matter (each `.variable` is an independent class), but match the RESEARCH ordering for predictability: `interDisplay.variable` first, then `inter.variable`, then `sourceSerif.variable`.
- The description string is the verbatim positioning sentence from blueprint §8. DO NOT paraphrase.
- `metadataBase: new URL("https://micahjonesconsulting.com")` is set Day 1 even though Phase 10 owns deploy.
- DO NOT add `<ViewTransition>`, `<LenisProvider>`, `<Analytics>`, or `<SpeedInsights>` here — Phase 2 owns those.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && grep -q "import { interDisplay, inter, sourceSerif } from \"@/lib/fonts\"" app/layout.tsx && grep -q "import \"./globals.css\"" app/layout.tsx && grep -q "metadataBase: new URL(\"https://micahjonesconsulting.com\")" app/layout.tsx && grep -q "interDisplay.variable" app/layout.tsx && grep -q "inter.variable" app/layout.tsx && grep -q "sourceSerif.variable" app/layout.tsx && grep -q "suppressHydrationWarning" app/layout.tsx && grep -q "Oakland-based operator who builds" app/layout.tsx && ! grep -q "ViewTransition" app/layout.tsx && ! grep -q "LenisProvider" app/layout.tsx && ! grep -q "Analytics" app/layout.tsx && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `app/layout.tsx` imports the three font instances from `@/lib/fonts`, imports `./globals.css`, concatenates the three `.variable` strings into `<html>` className, sets `suppressHydrationWarning`, exports a `metadata` object with title template + description + metadataBase. Phase 2 slots (ViewTransition, LenisProvider, Analytics, SpeedInsights) are NOT present.
  </done>
</task>

</tasks>

<verification>
- `app/layout.tsx` imports from `@/lib/fonts` using the path alias (NOT relative path)
- Three font className `.variable` strings concatenated into `<html>` className
- `import "./globals.css"` present (Tailwind v4 + tokens activate on every route)
- `metadataBase` set to production URL
- Description string matches blueprint §8 positioning sentence verbatim
- No Phase 2 imports/components present (ViewTransition, LenisProvider, Analytics, SpeedInsights all absent)
- `suppressHydrationWarning` present on `<html>`
</verification>

<success_criteria>
- SCAFF-05 (Phase 1 portion) ✓: Single root layout established with fonts cascade endpoint
- Plan D's fonts will resolve in `<html>` because className concatenates their `.variable` strings
- Plan C's `@theme` font variable slots will be hydrated by the CSS variables active on `<html>`
- Phase 2 can extend this file by adding `<ViewTransition>` + `<LenisProvider>` + `<Analytics>`+`<SpeedInsights>` without restructuring
- Phase 4 can nest `(foyer)/layout.tsx` and `(theater)/layout.tsx` as nested group layouts under this single root
- Phase 7 (CASE-07) will create `mdx-components.tsx` at repo root (NOT inside app/), inheriting this root layout's fonts and globals via Next.js MDX compilation pipeline
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-E-SUMMARY.md` confirming:
- Three font `.variable` strings concatenated correctly into `<html>` className
- Import path uses `@/lib/fonts` alias (matches tsconfig.json paths)
- Metadata sets title template + description (verbatim blueprint §8) + metadataBase
- Phase 2 slots remain empty (ViewTransition, LenisProvider, Analytics, SpeedInsights)
</output>
