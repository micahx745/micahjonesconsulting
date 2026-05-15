---
phase: 02-root-layout-lenis-transitions
plan: B
status: complete
completed: 2026-05-14
requirements:
  - LENIS-01
  - LENIS-02
  - LENIS-03
  - LENIS-04
  - LENIS-05
  - A11Y-05
---

# 02-B LenisProvider

## Outcome

Created new file `components/LenisProvider.tsx` — a `'use client'` component that wraps children in `<ReactLenis root>` with locked configuration, short-circuits to native scroll when `prefers-reduced-motion: reduce`, and re-exports `useLenis` so Phase 5's TitleCard can bridge Lenis scroll events into GSAP ScrollTrigger.

## Exports

- `LenisProvider` — wraps `{children}` with `<ReactLenis root options={...}>` or with a fragment when reduced-motion is on.
- `useLenis` — re-exported from `lenis/react` so consumers can `import { useLenis } from '@/components/LenisProvider'` (Phase 5 TitleCard).

## Configuration (locked)

| Option | Value | Reason |
|--------|-------|--------|
| `lerp` | `0.08` | LENIS-02. Blueprint §4d "damping ~0.08, light not buttery". |
| `duration` | `1.2` | Lenis default — governs `scrollTo()` calls. |
| `syncTouch` | `false` | LENIS-03 + PITFALL D2. iOS gets native momentum. `motion-discipline.sh` rejects `syncTouch: true`. |
| `smoothWheel` | `true` | Desktop foyer reading rhythm. |

## Reduced-motion handling

`useReducedMotion()` is a SSR-safe hook:
- Initial server render: `false` (matches server-rendered HTML, prevents hydration mismatch).
- After hydration: `useEffect` reads `window.matchMedia("(prefers-reduced-motion: reduce)")` and subscribes to `change` events for live toggling.
- When true: `LenisProvider` returns `<>{children}</>` (no Lenis active — native OS scroll preserved). Satisfies LENIS-05 + A11Y-05.

## What this file does NOT contain

- Zero imports from `gsap`, `@gsap/react`, or `gsap/ScrollTrigger`. Phase 2 GSAP quarantine per `.claude/CLAUDE.md` line 33.
- Zero imports from `@studio-freight/react-lenis` (retired package).
- No top-level `window.matchMedia` access — must stay inside `useEffect` (SSR safety, RESEARCH Pitfall 5).
- No `<Providers>` wrapper component — premature abstraction.

## Verification

- `pnpm typecheck` passes.
- Grep: `'use client'`, `ReactLenis`, `from "lenis/react"`, `lerp: 0.08`, `syncTouch: false`, `export { useLenis }` all present; `syncTouch: true`, `studio-freight`, `import.*gsap` all absent.

## Forward-references

- Plan 02-F mounts this provider as outermost wrapper inside `<body>` in `app/layout.tsx`.
- Phase 5 TitleCard activates the Lenis↔ScrollTrigger bridge via `useLenis(({ scroll }) => ScrollTrigger.update())` — that's where GSAP imports become permissible.

## Explicit deferral

- **LENIS-04** plumbed (`useLenis` re-exported) but NOT activated in Phase 2. Phase 5's TitleCard wires the actual GSAP bridge inside its own component.
