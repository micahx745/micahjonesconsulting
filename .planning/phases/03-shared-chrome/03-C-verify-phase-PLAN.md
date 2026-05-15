# Plan 03-C: Phase 3 Verification

**Phase:** 03 Shared Chrome
**Requirements:** Phase 3 success criteria 1-4 verifiable at build level (visual verification deferred to Phase 4)
**Depends on:** Plans 03-A (Nav component) + 03-B (Footer component) completed
**Status:** Ready
**Estimated LOC:** 1 new MD file (~70 lines)

---

## Goal

Verify Phase 3 implementation passes `pnpm typecheck` + `pnpm build` clean, that Nav and Footer files exist with the expected shape, and that no harness hooks (`copy-lint.sh`, `design-tokens.sh`, `motion-discipline.sh`) would block the changes. Produce `03-VERIFY-OUTPUT.md` documenting REQ-ID coverage and any deviations.

Phase 3 has no consumers (Phase 4 mounts the components). The "visible 4px hover lift" and "visible cross-fade anchor" criteria are deferred to Phase 4 — Phase 3 verifies the plumbing compiles cleanly and the code shape matches the contract.

---

## Verification Commands

Run these in order from `C:/Users/micah/Code/micahjonesconsulting`:

```bash
pnpm typecheck   # EXIT=0 expected
pnpm build       # EXIT=0 expected; copy-lint clean; Next 16 production build succeeds
```

---

## File Operations

### NEW: `.planning/phases/03-shared-chrome/03-VERIFY-OUTPUT.md`

Documents the following REQ-ID coverage matrix:

| REQ-ID | Phase 3 Status | Evidence |
|---|---|---|
| FOYER-09 | PASS (code-level) | `components/Nav.tsx` renders 5 labels (brand + 4 nav links) with `viewTransitionName: "site-nav"`. CSS in `app/globals.css` implements `transform: translateY(-4px)` hover on `.nav-link::after` with `200ms cubic-bezier(0.2, 0.8, 0.2, 1)`. Active state uses `aria-current="page"` selector (no lift, double thickness). Visual verification deferred to Phase 4. |
| FOYER-10 | PASS | `components/Footer.tsx` renders the two-business-day reply promise + `hello@micahjonesconsulting.com` mailto link. Mode-aware top rule via `[data-mode="foyer"] [data-footer-root]` (`--rule-foyer`) and `[data-mode="theater"] [data-footer-root]` (`--rule-theater`). |

Plus the 4 success criteria from ROADMAP:

| Success Criterion | Phase 3 Status |
|---|---|
| #1 Foyer nav 5 labels + copper underline 4px hover at 200ms cubic-bezier | PASS (code) — Phase 4 verifies visually |
| #2 Theater nav inverted (copper on `--theater-ground`) + `[BACK TO FOYER ↗]` link | PASS (code) — Phase 4 verifies visually |
| #3 Both variants carry `viewTransitionName: "site-nav"` | PASS — single component branch, anchor is unified |
| #4 Footer carries email + reply promise; foyer uses `--rule-foyer`, theater uses `--rule-theater` | PASS (code) — Phase 4 verifies visually |

---

## Acceptance Criteria

1. `pnpm typecheck` returns EXIT=0.
2. `pnpm build` returns EXIT=0 with `[copy-lint] ✓ Scanned project. Zero banned-word findings.` log line.
3. `components/Nav.tsx` and `components/Footer.tsx` exist and pass TypeScript strict + `noUncheckedIndexedAccess`.
4. `app/globals.css` contains the appended Phase 3 blocks (Nav chrome + view-transition anchor + Footer) AFTER the existing Phase 2 reduced-motion guard.
5. No new dependencies added to `package.json`.
6. No raw hex literals introduced (verified via grep on the new CSS blocks — all colors via `var(--color-*)`).
7. No `useTheme()`, no React context, no `'use client'` in `components/Nav.tsx` or `components/Footer.tsx`.
8. `next-env.d.ts` may auto-regenerate; ignore that diff.
9. `03-VERIFY-OUTPUT.md` produced with verdict `PASS` and the REQ-ID + success-criterion coverage matrices above.

---

## Out of Scope

- Visual verification of hover lift, copper underline animation, theater inversion, or mode-aware footer rule — Phase 4 mounts the components and verifies these visually in DevTools.
- Lighthouse pass — Phase 10.
- Cross-browser QA — Phase 10.
- A11y axe scan — Phase 10 (Phase 3 just confirms WCAG-AA contrast on the link/text colors via tokens, already audited in 03-RESEARCH.md).

---

## Output File Shape

`03-VERIFY-OUTPUT.md` should contain:

1. Frontmatter (`phase: 03-shared-chrome`, `verdict: PASS`, `verified: 2026-05-14`).
2. Verdict statement.
3. REQ-ID coverage table (FOYER-09, FOYER-10).
4. ROADMAP success criteria coverage table (#1-#4).
5. Command transcripts (`pnpm typecheck`, `pnpm build`).
6. Files touched in Phase 3 (created, modified).
7. Forward references to Phase 4 (consumers of Nav + Footer; visual verification).
8. What Phase 3 did NOT verify (deferred to Phase 4 / Phase 10).
