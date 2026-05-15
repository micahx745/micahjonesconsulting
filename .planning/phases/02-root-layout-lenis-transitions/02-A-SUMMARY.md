---
phase: 02-root-layout-lenis-transitions
plan: A
status: complete
completed: 2026-05-14
requirements:
  - TRANS-02
  - TRANS-03
---

# 02-A globals.css view-transition keyframes + reduced-motion guard

## Outcome

Replaced the Phase 1 placeholder comment block at the bottom of `app/globals.css` with the production CSS for view transitions (TRANS-02) and the reduced-motion kill-switch (TRANS-03). Also updated the upper doc-block to reflect that Phase 2 has done its work.

## Lines added

- `:root { --duration-mode-fade: 600ms; }` — single CSS custom property so future plans can tune duration in one place.
- `::view-transition-old(root)` and `::view-transition-new(root)` rules each referencing `var(--duration-mode-fade) ease-in-out both` and the respective `fade-out` / `fade-in` keyframe.
- `@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }` + `@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }` (explicit `from` per RESEARCH Pitfall 7 — browsers do not reliably interpolate from the live computed style).
- `@media (prefers-reduced-motion: reduce) { ::view-transition-old(root), ::view-transition-new(root), ::view-transition-group(*) { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; } }` — preserves the keyframe trajectory but compresses it to imperceptible duration (per WAI Animation-from-Interactions guidance; `animation: none` causes a visible snap).

## Lines removed

- The 11-line placeholder comment block starting with `* VIEW TRANSITIONS — Phase 2 owns the keyframes and reduced-motion guard.` and ending with `* ============================================================ */` at the file's end.
- The upper-doc `GSAP NOTE: Phase 2 will add ...` paragraph was rewritten to `Phase 2 added ...` so no stale forward-references remain.

## Phase 1 sections preserved (byte-identical)

- `@import "tailwindcss";`
- `@theme { ... }` block — all 11 color tokens, font cascade, spacing tokens.
- `[data-mode="foyer"]` and `[data-mode="theater"]` selectors.
- `html { ... }` and `body { ... }` base typography.

No new hex literals were introduced (only keyframes and pseudo-element selectors).

## Verification

- `pnpm typecheck` passes (CSS not typechecked, but the build pipeline remains green).
- Grep: `::view-transition-old(root)`, `fade-out`, `prefers-reduced-motion`, `0.001ms` all present; `Phase 2 will add` absent.

## Forward-references

- Phase 4 group layouts stamp `data-mode="foyer"` / `data-mode="theater"` on a wrapper `<div>` — the actual cross-fade between cream paper and obsidian ground only becomes visible once two routes with different `data-mode` attributes exist.
- Phase 3 nav adds `::view-transition-group(site-nav)` for the spatial anchor across transitions; this plan deliberately did NOT add that — out of scope.
- Visible verification of the 600ms cross-fade is deferred to Plan 02-G as DEFERRED-to-Phase-4.
