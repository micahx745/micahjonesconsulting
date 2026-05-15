---
phase: 02-root-layout-lenis-transitions
plan: A
type: execute
wave: 1
depends_on: []
files_modified:
  - app/globals.css
autonomous: true
requirements:
  - TRANS-02
  - TRANS-03
must_haves:
  truths:
    - "app/globals.css defines ::view-transition-old(root) and ::view-transition-new(root) keyframes that animate opacity over 600ms with ease-in-out timing."
    - "A @media (prefers-reduced-motion: reduce) block neutralizes ::view-transition-* animations via animation-duration: 0.001ms !important (no animation:none — that would cause a visible jump)."
    - "The Phase 1 placeholder comment block at the end of app/globals.css is replaced by the real CSS — no leftover '[Phase 2 will add...]' note."
    - "Phase 1's @theme tokens, [data-mode='foyer'/'theater'] selectors, html/body base typography remain untouched (additive change only)."
  artifacts:
    - path: "app/globals.css"
      provides: "View Transition keyframes + reduced-motion kill-switch"
      contains: "::view-transition-old(root)"
    - path: "app/globals.css"
      provides: "Reduced-motion guard"
      contains: "prefers-reduced-motion"
  key_links:
    - from: "::view-transition-old(root) / ::view-transition-new(root) rules"
      to: "@keyframes fade-out / fade-in"
      via: "animation property on each pseudo-element"
      pattern: "animation:.*fade-(out|in)"
    - from: "@media (prefers-reduced-motion: reduce)"
      to: "::view-transition-old/new/group selectors"
      via: "animation-duration: 0.001ms !important"
      pattern: "animation-duration:\\s*0\\.001ms\\s*!important"
---

<objective>
Replace the Phase 1 placeholder comment block at the bottom of `app/globals.css` with the real View Transition pseudo-element keyframes (`::view-transition-old(root)` and `::view-transition-new(root)` fading via 600ms ease-in-out keyframes) AND the `@media (prefers-reduced-motion: reduce)` kill-switch that neutralizes them to ~0ms for vestibular-trigger-sensitive users.

Purpose: REQ TRANS-02 (600ms cross-fade keyframes) + TRANS-03 (reduced-motion CSS kill-switch). This is the CSS half of the View Transition system. The TypeScript half (`<ViewTransition>` wrapper in `app/layout.tsx`) is owned by Plan 02-F.

Output: A globals.css file that, once paired with Phase 4's two route groups, produces a visible 600ms cream→obsidian cross-fade in DevTools Performance panel — and produces near-instant navigation when the user has `prefers-reduced-motion: reduce` enabled.
</objective>

<execution_context>
@C:/Users/micah/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/micah/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/02-root-layout-lenis-transitions/02-RESEARCH.md
@app/globals.css

The current `app/globals.css` (Phase 1 output) ends with a multi-line comment block that explicitly reserves space for Phase 2's keyframes (read the file's last block at lines 95-106 to confirm). This plan REPLACES that comment block with the production CSS. The `@theme` block (lines 1-66), `[data-mode]` selectors (68-79), and `html`/`body` base typography (82-93) MUST remain untouched.

**Why this is its own plan (not bundled with the layout.tsx work):**
The CSS keyframes are independent of the React-side wrapper. Defining them first means Plan 02-F's `app/layout.tsx` integration can mount `<ViewTransition>` knowing the visual handler already exists. No shared file means this plan and 02-B / 02-C / 02-D can all run in Wave 1 parallel without conflict.

**Why the `animation-duration: 0.001ms` trick instead of `animation: none`:**
RESEARCH.md Pitfall 7 + the WAI Animation-from-Interactions guidance: `animation: none` cancels the keyframe trajectory entirely, which can cause a visible "snap" from the captured-old-state to the captured-new-state at the snapshot boundary. The 0.001ms duration preserves the keyframe path but compresses it to an imperceptible duration, producing a clean cut.

**Harness hook awareness:**
`design-tokens.sh` flags hex literals outside the 11-color palette. This plan introduces ZERO hex literals — only CSS keyframes and pseudo-element selectors. `motion-discipline.sh` checks for cursor followers, marquees, `syncTouch:\s*true`, etc. — none triggered by this plan. `copy-lint.sh` operates on string literals — CSS files contain none.

<interfaces>
<!-- Phase 1 globals.css ends with this placeholder block (to be replaced): -->
```css
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

<!-- Note: the placeholder mentioned ::view-transition-group(site-nav) (Phase 3 nav anchor)
     and ::view-transition-*(*) (placeholder syntax). Phase 2 owns ONLY the root
     pseudo-elements + the reduced-motion guard. site-nav anchor is Phase 3. -->
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task A1: Replace globals.css Phase 2 placeholder with view-transition keyframes + reduced-motion guard</name>
  <files>app/globals.css</files>
  <action>
Edit `app/globals.css`. Find the placeholder comment block starting with `/* ============================================================` and the line containing `VIEW TRANSITIONS — Phase 2 owns the keyframes` (currently around lines 95-106). REPLACE that entire comment block with the following production CSS (verbatim from 02-RESEARCH.md Code Examples §3):

```css
/* ============================================================
 * VIEW TRANSITIONS — Phase 2 (TRANS-02, TRANS-03)
 *
 * The foyer↔theater route navigation triggers a 600ms cross-fade.
 * Foyer routes use cream paper background; theater routes use obsidian
 * ground. The browser captures the outgoing root as ::view-transition-old(root)
 * and the incoming root as ::view-transition-new(root), then applies the
 * animations below.
 *
 * Source: blueprint §4d "600ms ease-in-out"; ARCHITECTURE.md §4.1 File 3;
 *         PITFALLS.md B2 (reduced-motion kill-switch).
 *
 * NOTE: The actual background color of each snapshot comes from the
 * route group's data-mode attribute (Phase 4). Phase 2 only animates
 * opacity — the perceived "cream recedes / theater rises" effect comes
 * from the snapshots themselves having different backgrounds.
 * ============================================================ */
:root {
  --duration-mode-fade: 600ms;
}

::view-transition-old(root) {
  animation: var(--duration-mode-fade) ease-in-out both fade-out;
}

::view-transition-new(root) {
  animation: var(--duration-mode-fade) ease-in-out both fade-in;
}

@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ----------------------------------------------------------------
 * Reduced-motion kill-switch (TRANS-03, A11Y-05).
 *
 * View Transitions API does NOT auto-honor prefers-reduced-motion
 * (verified PITFALLS.md B2). We explicitly neutralize all
 * ::view-transition-* pseudo-elements when the user opts in.
 *
 * The 0.001ms duration (vs `animation: none`) preserves the keyframe
 * trajectory but makes it imperceptible — avoids any visible "jump"
 * from start state to end state at the snapshot boundary.
 * Reference: WAI Animation-from-Interactions guidance.
 * ---------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-group(*) {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

IMPORTANT — what NOT to touch:
- Do NOT modify the `@import "tailwindcss";` line at the top.
- Do NOT modify the `@theme { ... }` block (lines 20-66).
- Do NOT modify the `[data-mode="foyer"]` / `[data-mode="theater"]` selectors (lines 71-79).
- Do NOT modify the `html { ... }` or `body { ... }` base typography (lines 82-93).
- Do NOT introduce any new hex literals — `design-tokens.sh` warns on off-palette hex. This task uses zero hex.
- Do NOT add `::view-transition-group(site-nav)` here — that's Phase 3 nav anchor work.

The keyframes use `from { opacity: 1 } to { opacity: 0 }` (NOT just `to { opacity: 0 }`) per RESEARCH.md Pitfall 7 — browsers don't reliably interpolate from the live element's computed style and may produce a single-direction fade that looks janky.

The `--duration-mode-fade: 600ms` custom property on `:root` lets future plans tweak duration in one place if needed.
  </action>
  <verify>
    <automated>cd /c/Users/micah/Code/micahjonesconsulting && grep -n "::view-transition-old(root)" app/globals.css && grep -n "fade-out" app/globals.css && grep -n "prefers-reduced-motion" app/globals.css && grep -n "0.001ms" app/globals.css && ! grep -n "Phase 2 will add" app/globals.css && pnpm typecheck 2>&1 | tail -5</automated>
  </verify>
  <done>
- `app/globals.css` contains `::view-transition-old(root)` and `::view-transition-new(root)` rules each referencing `var(--duration-mode-fade)` and an `ease-in-out` timing function.
- `app/globals.css` contains `@keyframes fade-out` and `@keyframes fade-in` blocks with both `from` and `to` states.
- `app/globals.css` contains `@media (prefers-reduced-motion: reduce)` with `animation-duration: 0.001ms !important` and `animation-iteration-count: 1 !important` on the three view-transition pseudo-element selectors.
- The Phase 1 placeholder text `"Phase 2 will add to this file"` no longer appears in the file.
- `pnpm typecheck` still passes (no regression — CSS file isn't typechecked but the build pipeline must remain green).
  </done>
</task>

</tasks>

<verification>
1. **Grep checks (automated above):**
   - `::view-transition-old(root)` present
   - `fade-out` keyframe present
   - `prefers-reduced-motion` media query present
   - `0.001ms` reduced-motion duration present
   - Phase 1 placeholder text `"Phase 2 will add"` is GONE
2. **Phase 1 carry-forward:** `@import "tailwindcss";`, `@theme {`, `[data-mode="foyer"]`, `html {`, `body {` blocks all still present and unchanged.
3. **Hex audit:** `grep -nE '#[0-9a-fA-F]{6}' app/globals.css | wc -l` should produce the same count as before this plan ran — no new hex literals added.
4. **Note (deferred to Plan 02-G):** the actual `pnpm build` cross-check that confirms CSS doesn't break the build runs in Plan 02-G after all Wave 1 + Wave 2 plans complete.
</verification>

<success_criteria>
- `app/globals.css` ends with the production view-transition CSS block (not the Phase 1 placeholder).
- Selectors, keyframes, and reduced-motion guard match RESEARCH.md Code Examples §3 verbatim.
- Phase 1's earlier sections (Tailwind import, @theme tokens, [data-mode] selectors, html/body base typography) are byte-identical to Phase 1.
- No new hex literals introduced.
- `pnpm typecheck` passes.
</success_criteria>

<output>
After completion, create `.planning/phases/02-root-layout-lenis-transitions/02-A-SUMMARY.md` covering:
- Lines added (the production CSS block at end of globals.css)
- Lines removed (the Phase 1 placeholder comment block)
- Confirmation that Phase 1's @theme / [data-mode] / html / body sections were not touched
- Forward-reference: Phase 4 group layouts will stamp `data-mode` attributes that drive the actual background-color difference; Phase 3 nav will add `::view-transition-group(site-nav)` for the spatial anchor; visible verification of the cross-fade is deferred to Phase 4 once two real routes exist.
</output>
