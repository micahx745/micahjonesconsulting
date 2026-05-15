---
phase: 02-root-layout-lenis-transitions
plan: G
status: complete
completed: 2026-05-14
requirements:
  - TRANS-05
---

# 02-G phase verification

## Outcome

Ran the Phase 2 integration verification battery. Wrote `.planning/phases/02-root-layout-lenis-transitions/02-VERIFY-OUTPUT.md` (PASS verdict, 17/17 REQ-IDs accounted for).

## Verification commands run

1. **`pnpm typecheck`** — clean, exit 0.
2. **`pnpm build` (initial clean)** — clean, exit 0; `[copy-lint] ✓ Scanned project. Zero banned-word findings.` log line emitted; Next.js compiled successfully with `viewTransition` experiment active.
3. **`pnpm build` (negative test)** — injected `app/__copy-lint-test.tsx` with literal `"drive results"`; build FAILED with `app/__copy-lint-test.tsx:1:22 — "drive" in: "...xport const test = "drive results";..."` and `Build aborted.` Exit 1 (ELIFECYCLE).
4. **`pnpm build` (clean after cleanup)** — removed test file; clean build returned, success log line back, exit 0.
5. **`pnpm dev` smoke** — bound to 3001 (3000 in use by unrelated process), `Ready in 988ms`, `curl http://localhost:3001/` returned `HTTP/1.1 404 Not Found` with `X-Powered-By: Next.js` (expected — Phase 2 has no routes). No `ReferenceError`, `TypeError`, or hydration-mismatch errors in stderr.

## Substantive deviation discovered + resolved

**Plan 02-D assumed `register()` in `instrumentation.ts` would fire during `next build` when gated on `NEXT_PHASE === "phase-production-build"`.** Verification proved this incorrect: per Next.js 16 docs (verified against `node_modules/next/dist/docs/01-app/02-guides/instrumentation.md`), `register()` only fires when a new SERVER instance starts (next dev, next start), NOT during `next build`. The diagnostic logging confirmed: `register()` was never called during `pnpm build`.

**Resolution:** Created `lib/copy-lint-cli.ts` (thin Node CLI) and wired `package.json` build script: `"build": "tsx lib/copy-lint-cli.ts && next build"`. The runner code (`lib/copy-lint-runner.ts`) is unchanged. `instrumentation.ts` reverted to a no-op slot preserving the convention for future runtime observability wiring. Added `tsx@4.22.0` as devDep to execute the TS CLI with full `@/` path-alias resolution.

The deviation is documented in detail in `02-VERIFY-OUTPUT.md` under "Substantive deviation from plan (documented)".

## REQ-ID outcomes

- TRANS-01 PASS, TRANS-02 PASS, TRANS-03 PASS, TRANS-04 PASS.
- **TRANS-05 DEFERRED** to Phase 4 cross-check (no two routes in Phase 2; the visible 600ms cross-fade requires `data-mode="foyer"` and `data-mode="theater"` on adjacent route groups).
- LENIS-01 PASS, LENIS-02 PASS, LENIS-03 PASS, LENIS-05 PASS.
- **LENIS-04 DEFERRED-ACTIVATION** to Phase 5 (useLenis re-exported; GSAP bridge wires in `components/TitleCard.tsx`).
- COPY-01 PASS, COPY-02 PASS, **COPY-03 PASS** (via package.json build script — deviation noted above; negative test confirms), COPY-04 PASS, COPY-05 PASS.
- A11Y-05 PASS (the View-Transition + Lenis portions; TitleCard / PullQuote / hover-lift portions belong to downstream phases).
- ANALY-01 PASS.

**Coverage: 17/17 — 15 PASS + 2 DEFERRED-with-explicit-forward-reference.**

## Cleanup performed

- `app/__copy-lint-test.tsx` removed after negative test (cleanup verified with `test ! -f`).
- Dev server process (PID 28968) terminated; port 3001 released.
- No leftover test artifacts.

## Files produced

- `.planning/phases/02-root-layout-lenis-transitions/02-VERIFY-OUTPUT.md` (primary verification deliverable; verdict PASS).
- `lib/copy-lint-cli.ts` (build-time CLI wrapper — deviation product).
- `package.json` modifications (`build` script + `lint:copy` script + `tsx` devDep).
- `instrumentation.ts` reverted to no-op shape (kept as convention slot).

## Forward-references

- **Phase 3** (Shared Chrome — Nav + Footer) consumes `<ViewTransitionLink>` from `@/components/view-transition-link` for nav links and adds `viewTransitionName: "site-nav"` CSS prop + matching `::view-transition-group(site-nav)` keyframe.
- **Phase 4** (Route-Group Skeletons) verifies TRANS-05 visually by creating foyer + theater group layouts and capturing the DevTools Performance panel during navigation.
- **Phase 5** (TitleCard) activates LENIS-04 by wiring `useLenis(({ scroll }) => ScrollTrigger.update())` in `components/TitleCard.tsx`.

Phase 2 closes. Phase 3 cleared to start.
