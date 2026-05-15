---
phase: 02-root-layout-lenis-transitions
plan: C
status: complete
completed: 2026-05-14
requirements:
  - TRANS-04
---

# 02-C view-transition-link

## Outcome

Created new file `components/view-transition-link.tsx` — a `'use client'` drop-in wrapper around `next/link` that intercepts left-click, feature-detects `"startViewTransition" in document`, and either calls `document.startViewTransition(() => router.push(target))` or falls through to plain `router.push(target)` on Safari <18 / Firefox <144.

## Exports

- `ViewTransitionLink({ href, children, className, ...rest })` — JSX.Element wrapping `<Link>` from `next/link` with the click-handler patched in.

## Feature-detect flow

1. Modifier-keys (Cmd/Ctrl/Shift/Alt) → early return, let `next/link` handle (open-in-new-tab semantics preserved).
2. `e.button !== 0` (middle-click, etc.) → early return.
3. `e.preventDefault()` — claim the click.
4. If `"startViewTransition" in document`: wrap router.push in `document.startViewTransition()`.
5. Else (Safari <18, Firefox <144): plain `router.push(target)` — instant nav, no cross-fade, no broken UI.

## Deviation from plan

- The plan's verbatim CSS included a `@ts-expect-error` directive on the `document.startViewTransition()` call, expecting TS 6.0.3 lib.dom.d.ts to not type `Document.startViewTransition`. In practice, the installed `@types/node` + `lib.dom.d.ts` shipped WITH the type, so the directive triggered TS2578 "Unused '@ts-expect-error' directive." Replaced with a plain explanatory comment. Documented inline.

## Verification

- `pnpm typecheck` passes (clean run after removing unused `@ts-expect-error`).
- Grep: `'use client'`, `startViewTransition`, modifier-key guards (`metaKey || e.ctrlKey || e.shiftKey || e.altKey`), `useRouter`, `router.push(target)` all present; zero GSAP / Lenis imports.

## No consumers in Phase 2

The file is dormant. Webpack dead-code-elimination removes it from the bundle if nothing imports it.

## Forward-references

- Phase 3 `<Nav>` imports `ViewTransitionLink` for the five-label foyer nav.
- Phase 6 foyer pages (home selected-work strip, about teaser) import for internal links.
