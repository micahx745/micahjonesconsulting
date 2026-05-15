---
phase: 01-scaffold-tokens-dns
plan: C
type: execute
wave: 2
depends_on:
  - A
files_modified:
  - app/globals.css
autonomous: true
requirements:
  - TOKEN-01
  - TOKEN-02
  - TOKEN-03
  - TOKEN-04
  - TOKEN-05
  - TOKEN-06
must_haves:
  truths:
    - "`app/globals.css` defines all 11 color tokens from blueprint §4b inside a Tailwind v4 `@theme` block as `--color-*` CSS custom properties."
    - "`--accent-copper-deep #8E3A1E` (5.4:1 vs cream paper, WCAG AA PASS) is defined alongside `--accent-copper #C8542B` (3.85:1, large-text-only) — Pitfall B1 baked into tokens with documenting comment."
    - "`--ordani-sage #5E7158` is defined as a project-scoped token with a comment noting it is permitted only inside `/work/ordani` (enforced via design-tokens.sh allowlist in Phase 8)."
    - "`[data-mode='foyer']` and `[data-mode='theater']` attribute selectors set background-color + color tokens; Phase 4 wraps route-group children with these data-mode attributes."
    - "Font CSS variable slots `--font-display`, `--font-sans`, `--font-serif` are re-declared inside the `@theme` block so Tailwind utility classes (`font-display`, `font-sans`, `font-serif`) resolve — Next.js Discussion #77337 fix."
    - "Spacing tokens for page padding (128/64), gutters (80/16), body measure (68ch), sidenote measure (28ch) are defined per TOKEN-06."
    - "View Transitions keyframes + reduced-motion media query slot is reserved with a comment block; Phase 2 owns the actual `::view-transition-old/new(root)` keyframes."
  artifacts:
    - path: "app/globals.css"
      provides: "Tailwind v4 @theme block with 11 colors, font variable slots, spacing scale, mode-driven defaults"
      contains: "@theme"
      min_lines: 80
  key_links:
    - from: "app/globals.css @theme block"
      to: "Phase 4 group layouts (data-mode wrappers)"
      via: "[data-mode='foyer'] / [data-mode='theater'] attribute selectors"
      pattern: "\\[data-mode=\"foyer\"\\]"
    - from: "app/globals.css font variables"
      to: "lib/fonts.ts (Plan D) + app/layout.tsx (Plan E)"
      via: "--font-inter-display / --font-inter / --font-source-serif variable names match"
      pattern: "var\\(--font-inter-display\\)"
    - from: "app/globals.css --accent-copper-deep"
      to: "Phase 10 a11y pass (body link color enforcement)"
      via: "documented contrast rule in CSS comment + .claude/CLAUDE.md"
      pattern: "5\\.4:1"
---

<objective>
Overwrite `app/globals.css` with the complete `@theme` design-token block from RESEARCH.md §3. This single file is the canonical source for all 11 House Lights color tokens, the font variable cascade, the spacing scale, and the mode-driven defaults that Phase 4 will trigger by stamping `data-mode` attributes on group-layout wrappers.

Purpose: Six requirements covered in one file:
- TOKEN-01: 11 color tokens from blueprint §4b
- TOKEN-02: Mode contract via `data-mode` attribute (CSS side here; Phase 4 wires layouts)
- TOKEN-03: Tailwind reads mode via attribute selectors
- TOKEN-04: `--accent-copper-deep` body-emphasis token (Pitfall B1)
- TOKEN-05: `--ordani-sage` scoped token (allowlist enforced by Phase 8)
- TOKEN-06: 12-col / 80gutter / 4px-base / 68ch body / 128/64 page padding spacing scale

Output: A single CSS file that becomes the design contract for every downstream phase. Phase 6 foyer pages, Phase 7 MDX components, Phase 8 case studies, and Phase 10 a11y all consume the tokens defined here.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/01-scaffold-tokens-dns/01-RESEARCH.md
@.planning/blueprint.md

**Pitfall B1 (RESEARCH §"Common Pitfalls B1"):**
`#C8542B` on `#F5EFE4` is 3.85:1 — FAILS WCAG 2.1 AA for normal body text (requires 4.5:1). `#8E3A1E` on `#F5EFE4` is 5.4:1 — PASSES. Plan C bakes BOTH tokens into the CSS and documents the rule via comment block ABOVE the accent declarations. Plan G (`.claude/CLAUDE.md`) restates the rule for harness PR review. The actual application of `--accent-copper-deep` to body links is Phase 6 (foyer pages) and Phase 10 (a11y pass).

**Pattern (RESEARCH §"Pattern 1"):**
Tailwind v4's `@theme` block writes values into global CSS variables AND generates utility classes. Use `@theme { ... }` (NOT `@theme inline { ... }`) for the token block. `@theme inline` is for wiring external variables without redeclaring them — not needed here because next/font variables are re-declared explicitly per Next.js Discussion #77337.

**Font CSS variable cascade (RESEARCH §"Pattern 2"):**
`next/font/google` generates CSS variables (`--font-inter-display`, `--font-inter`, `--font-source-serif`) via the `variable:` field in `lib/fonts.ts` (Plan D). The variables are attached to `<html>` via className in `app/layout.tsx` (Plan E). Tailwind v4 does NOT auto-discover these — they MUST be re-declared inside `@theme` so `font-display`, `font-sans`, `font-serif` utility classes resolve.

**Mode wiring split (TOKEN-02 — half here, half Phase 4):**
- Phase 1 (this plan): writes the CSS attribute-selector contract `[data-mode="foyer"]` / `[data-mode="theater"]` with default `background-color` + `color` declarations.
- Phase 4 (FOYER-01, THEATER-01): writes the `(foyer)/layout.tsx` and `(theater)/layout.tsx` files that wrap children with `<div data-mode="foyer">` / `<div data-mode="theater">`.

**View Transitions slot (Phase 2 owns):**
This plan reserves a comment block at the bottom of `app/globals.css` documenting where Phase 2 will add `::view-transition-old(root)`, `::view-transition-new(root)` keyframes and the `@media (prefers-reduced-motion: reduce)` kill switch. Phase 1 leaves the slot empty.
</context>

<tasks>

<task type="auto">
  <name>Task C1: Overwrite app/globals.css with complete @theme block + mode-driven defaults</name>
  <files>
    app/globals.css
  </files>
  <action>
Overwrite `C:/Users/micah/Code/micahjonesconsulting/app/globals.css` with the EXACT content from RESEARCH.md §3 "`app/globals.css` — Complete Content". The scaffolder produces a minimal `app/globals.css` with `@import "tailwindcss";` and a few demo styles — this task replaces it entirely.

Final file content (write verbatim from RESEARCH.md §3):

```css
/* ============================================================
 * House Lights — global tokens and base typography
 *
 * Tokens follow blueprint §4b. Mode is route-determined via
 * [data-mode] attribute selectors set by group layouts (Phase 4).
 *
 * ACCESSIBILITY NOTE (PITFALL B1):
 * --accent-copper (#C8542B) is 3.85:1 on cream paper.
 *   ✅ Safe for: large text ≥24px, non-text UI (buttons, focus rings, dividers)
 *   ❌ NOT safe for: body-paragraph link color (axe will flag)
 * --accent-copper-deep (#8E3A1E) is 5.4:1 on cream paper.
 *   ✅ Use for: body-text emphasis, foyer body link color
 *
 * GSAP NOTE: Phase 2 will add ::view-transition-old/new(root) keyframes
 *           and @media (prefers-reduced-motion: reduce) kill-switch.
 *           Phase 1 leaves those slots empty.
 * ============================================================ */
@import "tailwindcss";

@theme {
  /* ---- Colors (blueprint §4b — all 11 tokens) ---- */
  --color-foyer-paper:        #F5EFE4;
  --color-foyer-ink:          #1A1816;
  --color-foyer-ink-soft:     #3A3631;

  --color-theater-ground:     #0D0D0F;
  --color-theater-surface:    #16161A;
  --color-theater-ink:        #EAE6DD;
  --color-theater-ink-soft:   #9C988F;

  /* Single accent across both modes. See PITFALL B1 above for rule. */
  --color-accent-copper:      #C8542B;
  --color-accent-copper-deep: #8E3A1E;

  /* ORDANI-only — permitted via design-tokens.sh allowlist for /work/ordani only (Phase 8). */
  --color-ordani-sage:        #5E7158;

  /* Hairline rules per mode */
  --color-rule-foyer:         #D9D2C4;
  --color-rule-theater:       #2A2A30;

  /* ---- Font cascade (Phase 1 wires next/font CSS variables here) ---- *
   *
   * The next/font/google imports in lib/fonts.ts expose:
   *   --font-inter-display
   *   --font-inter
   *   --font-source-serif
   * via the className on <html> in app/layout.tsx.
   *
   * Tailwind v4 does NOT auto-discover those variables — they must be
   * re-declared inside this @theme block so `font-display` utility resolves.
   * Reference: Next.js Discussion #77337.
   */
  --font-display: var(--font-inter-display), system-ui, sans-serif;
  --font-sans:    var(--font-inter), system-ui, sans-serif;
  --font-serif:   var(--font-source-serif), Georgia, serif;

  /* ---- Spacing (TOKEN-06: 4px base, 12-col, 68ch body, 28ch sidenotes) ---- */
  --spacing-page-x-desktop: 128px;
  --spacing-page-x-mobile:  64px;
  --spacing-gutter-desktop: 80px;
  --spacing-gutter-mobile:  16px;

  --measure-body:           68ch;
  --measure-sidenote:       28ch;
}

/* ---- Mode-driven defaults — applied by [data-mode] on group layout <div> ----
 * Phase 4 stamps these attributes. Phase 1 only writes the CSS contract.
 */
[data-mode="foyer"] {
  background-color: var(--color-foyer-paper);
  color: var(--color-foyer-ink);
}

[data-mode="theater"] {
  background-color: var(--color-theater-ground);
  color: var(--color-theater-ink);
}

/* ---- Base typography ---- */
html {
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "ss02";
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-height: 100dvh;
}

/* ============================================================
 * VIEW TRANSITIONS — Phase 2 owns the keyframes and reduced-motion guard.
 *
 * Phase 2 will add to this file:
 *   ::view-transition-old(root) { animation: ... fade-out; }
 *   ::view-transition-new(root) { animation: ... fade-in; }
 *   ::view-transition-group(site-nav) { animation: none; }
 *   @media (prefers-reduced-motion: reduce) {
 *     ::view-transition-*(*) { animation: none !important; }
 *   }
 * ============================================================ */
```

**Critical writing rules:**
- Hex values MUST match blueprint §4b exactly (no rounding, no case changes — copper is `#C8542B` uppercase).
- The `Pitfall B1` comment block MUST appear above the color tokens; it is the load-bearing reason this file exists.
- The font variable names (`--font-inter-display`, `--font-inter`, `--font-source-serif`) MUST match the `variable:` fields Plan D writes in `lib/fonts.ts` — typos break the cascade silently.
- The View Transitions comment block stays as-is — Phase 2 fills the slot.
  </action>
  <verify>
    <automated>cd C:/Users/micah/Code/micahjonesconsulting && grep -q "@import \"tailwindcss\"" app/globals.css && grep -q "@theme" app/globals.css && grep -q "#F5EFE4" app/globals.css && grep -q "#1A1816" app/globals.css && grep -q "#3A3631" app/globals.css && grep -q "#0D0D0F" app/globals.css && grep -q "#16161A" app/globals.css && grep -q "#EAE6DD" app/globals.css && grep -q "#9C988F" app/globals.css && grep -q "#C8542B" app/globals.css && grep -q "#8E3A1E" app/globals.css && grep -q "#5E7158" app/globals.css && grep -q "#D9D2C4" app/globals.css && grep -q "#2A2A30" app/globals.css && grep -q "\\[data-mode=\"foyer\"\\]" app/globals.css && grep -q "\\[data-mode=\"theater\"\\]" app/globals.css && grep -q "var(--font-inter-display)" app/globals.css && grep -q "5\\.4:1" app/globals.css && echo "PASS — all 11 hex + both data-mode selectors + font cascade + B1 doc" || echo "FAIL"</automated>
  </verify>
  <done>
    All 11 blueprint §4b color tokens present in the @theme block; `[data-mode="foyer"]` and `[data-mode="theater"]` attribute selectors set background-color + color; font variable slots reference `var(--font-inter-display)` etc.; Pitfall B1 contrast rule (5.4:1) documented in comment block; spacing tokens cover page padding + gutters + measures per TOKEN-06; View Transitions slot reserved with placeholder comment.
  </done>
</task>

</tasks>

<verification>
- All 11 hex values from blueprint §4b are present exactly (cross-check against blueprint §4b table)
- `[data-mode="foyer"]` and `[data-mode="theater"]` attribute selectors exist
- `--font-display`, `--font-sans`, `--font-serif` reference `var(--font-inter-display)`, `var(--font-inter)`, `var(--font-source-serif)` — names match what Plan D will produce in `lib/fonts.ts`
- TOKEN-06 spacing tokens defined: page-x-desktop (128px), page-x-mobile (64px), gutter-desktop (80px), gutter-mobile (16px), measure-body (68ch), measure-sidenote (28ch)
- Pitfall B1 contrast rule documented above color tokens
- View Transitions slot comment block present at bottom (Phase 2 fills)
</verification>

<success_criteria>
- TOKEN-01 ✓: All 11 blueprint §4b color tokens as `--color-*` CSS custom properties inside `@theme`
- TOKEN-02 ✓: CSS contract for `[data-mode="foyer"]` and `[data-mode="theater"]` defined (Phase 4 wraps with attribute)
- TOKEN-03 ✓: Tailwind v4 reads mode via attribute selectors (utility classes will resolve mode-specific colors when Phase 4 stamps the attribute)
- TOKEN-04 ✓: `--accent-copper-deep` defined alongside `--accent-copper`; Pitfall B1 rule baked into comment block
- TOKEN-05 ✓: `--ordani-sage` defined with comment noting `/work/ordani` scope (Phase 8 enforces via design-tokens.sh allowlist)
- TOKEN-06 ✓: Spacing scale + measures defined (page padding 128/64, gutter 80/16, body 68ch, sidenote 28ch)
- Phase 2 (TRANS-01..03) can append view-transition keyframes + reduced-motion guard
- Phase 4 (FOYER-01, THEATER-01) can drop `<div data-mode="foyer">` / `<div data-mode="theater">` wrappers and see correct background/color
- Phase 6 + Phase 10 enforce `--accent-copper-deep` for body links per documented rule
</success_criteria>

<output>
After completion, create `.planning/phases/01-scaffold-tokens-dns/01-C-SUMMARY.md` confirming:
- All 11 blueprint §4b color tokens present at exact hex values
- Pitfall B1 contrast rule documented in CSS comment block
- Font variable slots match the names Plan D will produce
- TOKEN-06 spacing scale defined
- View Transitions slot reserved for Phase 2
</output>
