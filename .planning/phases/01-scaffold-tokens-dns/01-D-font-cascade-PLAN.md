---
phase: 01-scaffold-tokens-dns
plan: D
type: execute
wave: 2
depends_on:
  - A
files_modified:
  - lib/fonts.ts
autonomous: true
requirements:
  - SCAFF-04
must_haves:
  truths:
    - "`lib/fonts.ts` loads three font instances from `next/font/google`: `Inter` (display weights 600/700/800 via variable `--font-inter-display`), `Inter` (body weights 400/500/600 via variable `--font-inter`), `Source_Serif_4` (weights 400/500 with `axes: ['opsz']`, italic + normal styles, via variable `--font-source-serif`)."
    - "All three font instances set `adjustFontFallback: true` so Next.js injects `size-adjust` and `ascent-override` CSS metrics into the generated `@font-face` rules — neutralizes CLS on first paint per Pitfall A1."
    - "Display Inter (`interDisplay`) and body Inter (`inter`) both have `preload: true` (above-the-fold copy)."
    - "Source Serif 4 (`sourceSerif`) has `preload: false` (below-the-fold deks + pull quotes; saves preload budget)."
    - "All three exports use `display: 'swap'` so headlines render via fallback metrics rather than blocking on font load — combined with `adjustFontFallback`, this prevents CLS on the 96px TitleCard."
  artifacts:
    - path: "lib/fonts.ts"
      provides: "Three exported next/font/google instances with variable, weight, axes, preload, adjustFontFallback configured"
      contains: "Source_Serif_4"
      min_lines: 30
      exports:
        - "interDisplay"
        - "inter"
        - "sourceSerif"
  key_links:
    - from: "lib/fonts.ts variable names"
      to: "app/globals.css @theme block (Plan C)"
      via: "matching CSS variable names: --font-inter-display, --font-inter, --font-source-serif"
      pattern: "variable:\\s*\"--font-inter-display\""
    - from: "lib/fonts.ts exports"
      to: "app/layout.tsx (Plan E)"
      via: "interDisplay.variable + inter.variable + sourceSerif.variable concatenated into <html> className"
      pattern: "interDisplay\\.variable"
---

<objective>
Write `lib/fonts.ts` exactly per RESEARCH.md §6. This file is the single source of truth for the House Lights font cascade: Inter Display (headlines + TitleCard 96px), Inter (body), Source Serif 4 (deks + pull quotes). The exports are consumed by `app/layout.tsx` (Plan E), where each instance's `.variable` is concatenated into the `<html>` className so the CSS variables resolve in the `@theme` block (Plan C).

Purpose: REQ SCAFF-04 — `next/font/google` loads Inter Display, Inter, Source Serif 4 with `axes: ['opsz']`; CSS variables re-declared inside `@theme` block.
Output: A 50-line module that, combined with Plan C's `@theme` font variable slots and Plan E's `<html>` className attachment, completes the font cascade.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md
@.planning/research/SUMMARY.md
@.planning/blueprint.md

**Pitfall A1 — `next/font/google` CLS on first paint (RESEARCH §"Common Pitfalls A1"):**
With `display: 'swap'`, fonts load asynchronously while the browser renders Arial fallback. When real fonts arrive, headlines reflow. At 96px (TitleCard scale, Phase 5), small character-width mismatches blow the 0.05 CLS budget. Fix: `adjustFontFallback: true` asks Next.js to inject `size-adjust` and `ascent-override` CSS metrics into the generated `@font-face` rules, neutralizing the reflow. Known intermittent issue (Next.js #74134, #73838) in 15.x — Phase 1 uses 16.2.6 where the fix is stable. Plan J verifies `.next/static/css/*.css` contains `size-adjust` after first build.

**Source Serif 4 `axes: ['opsz']` (RESEARCH §"Pitfall — Defaulting to display:auto on Source Serif 4"):**
The MOST-missed integration detail per RESEARCH §"Anti-Patterns". Without `axes: ['opsz']`, Source Serif 4 pull quotes at 32px look mechanically thin — the variable-font optical-size axis isn't engaged. With `axes: ['opsz']`, the font renders heavier at smaller sizes (correct typographic optical compensation).

**Weight selection (RESEARCH §"Anti-Patterns"):**
- Inter Display: `['600', '700', '800']` — blueprint §4f calls for "96px Söhne Halbfett ≈ Inter Bold/ExtraBold (weight 700–800)" on TitleCard
- Inter body: `['400', '500', '600']` — body, captions, contact form labels
- Source Serif 4: `['400', '500']` — deks (body weight) + pull quotes (medium emphasis)
- DO NOT import all weights "just in case" — each weight = extra bytes

**Preload strategy:**
- `interDisplay` (preload: true) — TitleCard 96px above-the-fold on every case study + home hero
- `inter` (preload: true) — body type on every page
- `sourceSerif` (preload: false) — deks below-the-fold on case studies, pull quotes mid-page; saves preload budget on home + foyer pages where serif is absent
</context>

<tasks>

<task type="auto">
  <name>Task D1: Write lib/fonts.ts with three next/font/google exports</name>
  <files>
    lib/fonts.ts
  </files>
  <action>
Create `C:/Users/micah/Code/micahjonesconsulting/lib/fonts.ts` with the EXACT content from RESEARCH.md §6 "`lib/fonts.ts` — Complete Content". The `lib/` directory will not exist yet — create it.

Final file content (write verbatim from RESEARCH.md §6):

```ts
// Source: https://nextjs.org/docs/app/getting-started/fonts
//         + STACK.md §"Typography (free path)"
//         + ARCHITECTURE.md §5 "Font Cascade"
//
// IMPORTANT — PITFALL A1:
//   adjustFontFallback: true asks Next.js to inject size-adjust / ascent-override
//   metrics into the generated @font-face rule, which neutralizes CLS on first paint.
//   Known intermittent Next.js issue #74134 in 15.x — verify .next/static/css/*.css
//   contains size-adjust rules after first `pnpm build`.
import { Inter, Source_Serif_4 } from "next/font/google";

// Inter at display weights — used for headlines, TitleCard 96px stack, hero copy.
// Inter at 700/800 scores ~90% Söhne Halbfett similarity per Typewolf 2025 index.
export const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-inter-display",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// Inter at body weights — used for body, foyer caption metadata, contact form.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

// Source Serif 4 — used for deks, pull quotes, About long-form lede.
// axes: ['opsz'] is the most-missed integration detail in 2026; without it the
// pull quotes at 32px look mechanically thin.
// preload: false because serif is below the fold on most foyer pages.
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});
```

**Critical writing rules:**
- Variable names MUST match Plan C's `app/globals.css` `--font-inter-display`, `--font-inter`, `--font-source-serif` exactly. Mismatches cause silent fallback to system fonts.
- `axes: ["opsz"]` ONLY on Source_Serif_4. Inter is not a variable font with named axes (Inter is variable but Google Fonts exposes it via discrete weights only).
- `style: ["normal", "italic"]` ONLY on Source_Serif_4 (pull quotes use italic per blueprint §4d). Inter doesn't need italic at v1.
- `preload: true` on both Inter instances; `preload: false` on Source Serif 4.
- `adjustFontFallback: true` on all three.
- The order matters cosmetically — `interDisplay` first (most-used), then `inter`, then `sourceSerif`.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && test -f lib/fonts.ts && grep -q "import { Inter, Source_Serif_4 } from \"next/font/google\"" lib/fonts.ts && grep -q "export const interDisplay" lib/fonts.ts && grep -q "export const inter" lib/fonts.ts && grep -q "export const sourceSerif" lib/fonts.ts && grep -q "axes: \\[\"opsz\"\\]" lib/fonts.ts && grep -q "weight: \\[\"600\", \"700\", \"800\"\\]" lib/fonts.ts && grep -q "weight: \\[\"400\", \"500\", \"600\"\\]" lib/fonts.ts && grep -q "variable: \"--font-inter-display\"" lib/fonts.ts && grep -q "variable: \"--font-inter\"" lib/fonts.ts && grep -q "variable: \"--font-source-serif\"" lib/fonts.ts && grep -q "adjustFontFallback: true" lib/fonts.ts && echo "PASS" || echo "FAIL"</automated>
  </verify>
  <done>
    `lib/fonts.ts` exists with three exports (`interDisplay`, `inter`, `sourceSerif`); each export sets variable name matching Plan C; Source Serif 4 includes `axes: ["opsz"]` and `style: ["normal", "italic"]`; all three set `adjustFontFallback: true` and `display: "swap"`.
  </done>
</task>

</tasks>

<verification>
- `lib/fonts.ts` exports three constants with names matching what `app/layout.tsx` (Plan E) imports
- Variable names match the `@theme` block in `app/globals.css` (Plan C) exactly
- Source_Serif_4 has `axes: ["opsz"]` (the most-missed integration detail)
- All three set `adjustFontFallback: true` (Pitfall A1 fix)
- Weight arrays match blueprint §4f (`['600', '700', '800']` for display) and body usage (`['400', '500', '600']` for Inter, `['400', '500']` for serif)
- `display: "swap"` on all three (works with adjustFontFallback to neutralize CLS)
- Preload strategy correct: Inter display + Inter body preload, Source Serif 4 does not
</verification>

<success_criteria>
- SCAFF-04 ✓: `next/font/google` loads Inter Display + Inter + Source Serif 4 with `axes: ['opsz']`
- The font cascade is complete when this plan + Plan C + Plan E all land — Tailwind utility classes `font-display`, `font-sans`, `font-serif` resolve in Phase 4+ pages
- After Plan J's `pnpm build`, `.next/static/css/*.css` contains `@font-face` rules with `size-adjust` and `ascent-override` metrics
- TitleCard (Phase 5) at 96px will use Inter Display weight 700+ without CLS
- Pull quotes (Phase 7) at 32px italic will use Source Serif 4 with correct optical-size axis
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-D-SUMMARY.md` confirming:
- Three exports created with matching variable names for Plan C and Plan E
- `axes: ["opsz"]` set on Source Serif 4 (Pitfall noted)
- `adjustFontFallback: true` on all three (Pitfall A1 mitigation)
- Weight + preload strategy aligned with blueprint §4f + usage analysis
</output>
