---
phase: 02-root-layout-lenis-transitions
verdict: PASS
verified: 2026-05-14
---

# Phase 2 Verification — 02-VERIFY-OUTPUT.md

## Verdict: PASS

All Wave-1 + Wave-2 plans integrate cleanly. `pnpm typecheck`, `pnpm build`, and `pnpm dev` succeed. The build-time copy-lint scanner enforces banned-word detection (negative test confirms). The visible 600ms cross-fade verification (TRANS-05) is DEFERRED to Phase 4 cross-check — Phase 2 has no two routes to navigate between.

## Substantive deviation from plan (documented)

**Plan 02-D specified the copy-lint scanner would run from `instrumentation.ts` `register()` gated on `NEXT_PHASE === 'phase-production-build'`.** Verification revealed this assumption is incorrect for Next.js 16: per `node_modules/next/dist/docs/01-app/02-guides/instrumentation.md` and `01-app/03-api-reference/03-file-conventions/instrumentation.md`, `register()` fires "once when a new Next.js **server** instance is initiated" (next dev, next start) — NOT during `next build`. The scanner therefore could not satisfy COPY-03 from instrumentation.ts.

**Resolution adopted:** Created `lib/copy-lint-cli.ts` (a thin Node CLI that calls `runCopyLint()`) and wired `package.json` `build` script to invoke it as a pre-build step: `"build": "tsx lib/copy-lint-cli.ts && next build"`. The runner code itself (`lib/copy-lint-runner.ts`) is unchanged from the plan. `instrumentation.ts` is preserved as a no-op slot for future runtime observability wiring (OpenTelemetry / Sentry / similar).

**Added dependency:** `tsx@4.22.0` as devDep (to execute the TypeScript CLI; `@/` path aliases and project tsconfig get respected). Bundle impact: zero (devDep only).

**Net result:** COPY-03 satisfied. `pnpm build` fails with `file:line:column` reporting on banned-word findings; clean rebuilds emit `[copy-lint] ✓ Scanned project. Zero banned-word findings.` log line. Negative test confirms.

## REQ-ID Coverage Cross-Check

| REQ-ID | Status | Verified By |
|--------|--------|-------------|
| TRANS-01 | PASS | `app/layout.tsx` imports `ViewTransition` from "react", JSX wraps `{children}` inside `<LenisProvider>`. |
| TRANS-02 | PASS | `app/globals.css` contains `::view-transition-old(root)` and `::view-transition-new(root)` keyframes with `var(--duration-mode-fade)` (600ms) ease-in-out and explicit `from { opacity: 1; }` / `to { opacity: 0; }` patterns. |
| TRANS-03 | PASS | `app/globals.css` contains `@media (prefers-reduced-motion: reduce)` block applying `animation-duration: 0.001ms !important` and `animation-iteration-count: 1 !important` to ::view-transition-old/new(root) and ::view-transition-group(*). |
| TRANS-04 | PASS | `components/view-transition-link.tsx` exports `ViewTransitionLink` with `"startViewTransition" in document` feature-detect, modifier-key + middle-click pass-through, and `router.push` fallback for Safari <18 / Firefox <144. |
| TRANS-05 | DEFERRED | Visible cross-fade requires two route groups with different `data-mode` background colors. Phase 2 has no routes (Phase 1's `_not-found` is the only route; Phase 4 creates foyer + theater route group skeletons). Phase 4 will verify the 600ms cross-fade visually in DevTools Performance panel. |
| LENIS-01 | PASS | `app/layout.tsx` imports `LenisProvider` from `@/components/LenisProvider` and mounts it as outermost wrapper inside `<body>`. |
| LENIS-02 | PASS | `components/LenisProvider.tsx` `<ReactLenis>` configured with `lerp: 0.08`. |
| LENIS-03 | PASS | `components/LenisProvider.tsx` `<ReactLenis>` configured with `syncTouch: false` (locked per PITFALL D2). |
| LENIS-04 | DEFERRED-ACTIVATION | `components/LenisProvider.tsx` re-exports `useLenis` from "lenis/react" so Phase 5 TitleCard can wire `useLenis(({ scroll }) => ScrollTrigger.update())`. No GSAP imports in Phase 2 (quarantine per `.claude/CLAUDE.md` line 33). |
| LENIS-05 | PASS | `components/LenisProvider.tsx` `useReducedMotion()` hook short-circuits to `<>{children}</>` when `prefers-reduced-motion: reduce` matches (SSR-safe via useEffect-gated `window.matchMedia`). |
| COPY-01 | PASS | `lib/banned.ts` (Phase 1) exports `BANNED_WORDS` (30 entries), consumed transitively via `lib/copy-lint.ts`. |
| COPY-02 | PASS | `lib/copy-lint.ts` (Phase 1) exports `scanString`, consumed directly by `lib/copy-lint-runner.ts`. |
| COPY-03 | PASS | `lib/copy-lint-runner.ts` walks `content/**` + `app/**`, throws Error on findings. `lib/copy-lint-cli.ts` (thin Node CLI) invokes the runner. `package.json` `build` script runs it before `next build` (`"build": "tsx lib/copy-lint-cli.ts && next build"`). **Negative test confirmed**: injecting `"drive results"` into `app/__copy-lint-test.tsx` caused build to fail with `app/__copy-lint-test.tsx:1:22 — "drive" in: "...xport const test = "drive results";..."` and exit 1. Removing the file restored a clean build. See deviation note above for why this lives in package.json build script rather than `instrumentation.ts` `register()`. |
| COPY-04 | PASS | `.claude/CLAUDE.md` Voice section `### Enforcement (Phase 2)` subsection documents the copy-editor subagent enforcement contract (sentence cap of 25 words avg, first person locked, active voice, named numbers). |
| COPY-05 | PASS | `.claude/CLAUDE.md` Voice section `### Enforcement (Phase 2)` subsection documents the em-dash cap (>1 per file triggers subagent rewrite request). |
| A11Y-05 | PASS | `app/globals.css` reduced-motion guard on ::view-transition-* selectors + `components/LenisProvider.tsx` reduced-motion short-circuit both implemented. (TitleCard pin, PullQuote underline-grow, hover lift portions of A11Y-05 are downstream — Phase 5 / Phase 7 / Phase 3+.) |
| ANALY-01 | PASS | `app/layout.tsx` imports `Analytics` from `@vercel/analytics/next` (not `/react` — deferred-script subpath) and `SpeedInsights` from `@vercel/speed-insights/next`; both mounted as siblings of `<LenisProvider>` inside `<body>`. |

**Coverage:** 17/17 — 15 PASS + 2 DEFERRED-with-explicit-forward-reference (TRANS-05 to Phase 4 visual check; LENIS-04 to Phase 5 GSAP-bridge activation).

## Command Transcripts

### `pnpm typecheck` (clean)

```
> micahjonesconsulting@0.1.0 typecheck C:\Users\micah\Code\micahjonesconsulting
> tsc --noEmit

EXIT=0
```

### `pnpm build` (clean — initial)

```
> micahjonesconsulting@0.1.0 build C:\Users\micah\Code\micahjonesconsulting
> tsx lib/copy-lint-cli.ts && next build

[copy-lint] ✓ Scanned project. Zero banned-word findings.
▲ Next.js 16.2.6 (Turbopack)
- Experiments (use with caution):
  ✓ viewTransition

  Creating an optimized production build ...
✓ Compiled successfully in 1091ms
  Running TypeScript ...
  Finished TypeScript in 1301ms ...
  Collecting page data using 4 workers ...
  Generating static pages using 4 workers (0/3) ...
✓ Generating static pages using 4 workers (3/3) in 369ms
  Finalizing page optimization ...

Route (app)
─ ○ /_not-found

○  (Static)  prerendered as static content

EXIT=0
```

### `pnpm build` (negative — banned word injected)

```
> micahjonesconsulting@0.1.0 build C:\Users\micah\Code\micahjonesconsulting
> tsx lib/copy-lint-cli.ts && next build


[copy-lint] 1 banned word finding(s):

  app/__copy-lint-test.tsx:1:22 — "drive" in: "...xport const test = "drive results";..."

copy-lint: 1 banned word(s) found across project. Fix the prose or update lib/banned.ts. Build aborted.
 ELIFECYCLE  Command failed with exit code 1.
```

### `pnpm build` (clean — after negative cleanup)

```
[copy-lint] ✓ Scanned project. Zero banned-word findings.
▲ Next.js 16.2.6 (Turbopack)
- Experiments (use with caution):
  ✓ viewTransition

  Creating an optimized production build ...
✓ Compiled successfully in 1081ms
  Running TypeScript ...
  Finished TypeScript in 1336ms ...
  Collecting page data using 4 workers ...
  Generating static pages using 4 workers (0/3) ...
✓ Generating static pages using 4 workers (3/3) in 369ms
  Finalizing page optimization ...

Route (app)
─ ○ /_not-found

○  (Static)  prerendered as static content

EXIT=0
```

### `pnpm dev` (smoke test)

```
> micahjonesconsulting@0.1.0 dev C:\Users\micah\Code\micahjonesconsulting
> next dev

⚠ Port 3000 is in use by process 3412, using available port 3001 instead.
▲ Next.js 16.2.6 (Turbopack)
- Local:         http://localhost:3001
- Network:       http://192.168.4.43:3001
✓ Ready in 988ms
- Experiments (use with caution):
  ✓ viewTransition

 HEAD / 404 in 1413ms (next.js: 1286ms, application-code: 127ms)
```

`curl -sI http://localhost:3001/`:
```
HTTP/1.1 404 Not Found
Cache-Control: no-cache, must-revalidate
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
X-Powered-By: Next.js
Content-Type: text/html; charset=utf-8
```

`X-Powered-By: Next.js` confirms this is our server (port 3000 was occupied by an unrelated dev server with NextAuth — Next picked 3001). 404 is expected — Phase 2 has no routes (only the Next default `_not-found`). No `ReferenceError`, `TypeError`, or hydration-mismatch errors in stderr.

## Forward-References Documented

- **TRANS-05** — visible 600ms cross-fade verification deferred to Phase 4. Phase 4 will:
  1. Create `(foyer)/layout.tsx` stamping `data-mode="foyer"` on a wrapper `<div>`.
  2. Create `(theater)/work/[slug]/page.tsx` stub stamping `data-mode="theater"`.
  3. Visit `/` and click into `/work/test-slug`, capture DevTools Performance panel showing single 600ms ease-in-out View Transition.
- **LENIS-04** — `useLenis` re-export shipped from `@/components/LenisProvider`. Phase 5 TitleCard activates the GSAP bridge via `useLenis(({ scroll }) => ScrollTrigger.update())`.

## What Phase 2 Did NOT Verify (deferred to later phases per RESEARCH.md "Verification Approach")

- Visible cross-fade animation — Phase 4 (needs two routes).
- Lenis ↔ ScrollTrigger bridge runtime behavior — Phase 5 (needs GSAP).
- Visual QA at 390/768/1440 — Phase 10 (nothing visible to QA in Phase 2).
- Lighthouse Performance ≥ 95 — Phase 10 hardening pass.

## Plan Manifest

All seven plans (A-G) executed in three waves:

- **Wave 1 (parallel):**
  - 02-A globals.css view-transition keyframes + reduced-motion (TRANS-02, TRANS-03)
  - 02-B LenisProvider (LENIS-01..03, LENIS-05, A11Y-05 portion, LENIS-04 deferred activation)
  - 02-C view-transition-link (TRANS-04)
  - 02-D copy-lint-runner + instrumentation.ts (COPY-01..03)
  - 02-E CLAUDE.md policy enforcement (COPY-04, COPY-05)
- **Wave 2 (depends on Wave 1):**
  - 02-F app/layout.tsx integration (TRANS-01, LENIS-01 mount, ANALY-01)
- **Wave 3 (depends on Wave 2):**
  - 02-G verification (TRANS-05 deferral documentation, runtime verification of COPY-03)

## Files Touched in Phase 2

Created (6 files):
- `components/LenisProvider.tsx`
- `components/view-transition-link.tsx`
- `lib/copy-lint-runner.ts`
- `lib/copy-lint-cli.ts` *(deviation: needed because Next.js 16 instrumentation.ts doesn't run during build — see deviation note)*
- `.planning/phases/02-root-layout-lenis-transitions/02-A..F-SUMMARY.md` (5 files)
- `.planning/phases/02-root-layout-lenis-transitions/02-VERIFY-OUTPUT.md` (this file)

Modified (4 files):
- `app/layout.tsx`
- `app/globals.css`
- `instrumentation.ts` *(reverted to no-op slot — see deviation)*
- `.claude/CLAUDE.md`
- `package.json` *(added build pre-step + lint:copy script + tsx devDep)*

No runtime dep changes — `tsx@4.22.0` is devDep only (executes the build-time CLI; not bundled into the app).

## Phase 3 Readiness

Phase 3 (Shared Chrome — Nav + Footer) can now consume:
- `<ViewTransitionLink>` from `@/components/view-transition-link` for nav links
- `viewTransitionName: "site-nav"` CSS prop on the Nav component for spatial anchor across transitions (Phase 3 adds the CSS keyframe)
- Cross-cutting smooth scroll (LenisProvider already mounted at root)
- Build-time copy-lint enforcement (any banned word in nav labels or footer prose will fail the build)

Phase 4 (Route-Group Skeletons) can verify TRANS-05 by creating two routes with different `data-mode` attributes.

Phase 5 (TitleCard) can consume `useLenis` from `@/components/LenisProvider` for the GSAP ScrollTrigger bridge.
