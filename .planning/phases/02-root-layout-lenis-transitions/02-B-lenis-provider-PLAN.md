---
phase: 02-root-layout-lenis-transitions
plan: B
type: execute
wave: 1
depends_on: []
files_modified:
  - components/LenisProvider.tsx
autonomous: true
requirements:
  - LENIS-01
  - LENIS-02
  - LENIS-03
  - LENIS-04
  - LENIS-05
  - A11Y-05
must_haves:
  truths:
    - "components/LenisProvider.tsx is a 'use client' component that wraps children in <ReactLenis root> with lerp: 0.08, duration: 1.2, syncTouch: false, smoothWheel: true."
    - "When window.matchMedia('(prefers-reduced-motion: reduce)') matches, LenisProvider short-circuits and renders {children} without ReactLenis active — native scroll preserved for vestibular-sensitive users (LENIS-05 / A11Y-05)."
    - "The useReducedMotion hook is SSR-safe: returns false on first server render, updates after hydration via useEffect — no ReferenceError: window is not defined."
    - "LenisProvider re-exports useLenis from 'lenis/react' so Phase 5's TitleCard can bridge Lenis↔ScrollTrigger (LENIS-04 — deferred activation; the export is in place but no GSAP code in Phase 2)."
    - "The file imports from 'lenis/react' (the supported subpath as of Lenis 1.3.23) — NOT from the retired '@studio-freight/react-lenis' package."
    - "No GSAP imports anywhere in this file (Phase 2 quarantine — GSAP is Phase 5 only)."
  artifacts:
    - path: "components/LenisProvider.tsx"
      provides: "Root-mount Lenis smooth-scroll provider with reduced-motion guard"
      contains: "ReactLenis"
      exports: ["LenisProvider", "useLenis"]
      min_lines: 40
  key_links:
    - from: "LenisProvider component"
      to: "lenis/react ReactLenis component"
      via: "JSX render"
      pattern: "<ReactLenis\\s+root"
    - from: "useReducedMotion hook"
      to: "matchMedia('(prefers-reduced-motion: reduce)')"
      via: "useEffect"
      pattern: "matchMedia.*prefers-reduced-motion"
    - from: "LenisProvider"
      to: "Phase 5 TitleCard"
      via: "re-exported useLenis hook"
      pattern: "export\\s*\\{\\s*useLenis\\s*\\}\\s*from\\s*['\"]lenis/react['\"]"
---

<objective>
Create the new file `components/LenisProvider.tsx` as a `'use client'` React component that wraps its children in `<ReactLenis root>` (from `lenis/react`) with the locked configuration (lerp: 0.08, duration: 1.2, syncTouch: false, smoothWheel: true), short-circuits to native scroll when `prefers-reduced-motion: reduce` is active, and re-exports the `useLenis` hook so Phase 5's TitleCard can bridge Lenis scroll events to GSAP ScrollTrigger.

Purpose: REQs LENIS-01..05 + A11Y-05 (View-Transition-and-Lenis portion).
- LENIS-01: `<ReactLenis root>` mounted at the root layout (this plan creates the component; Plan 02-F mounts it in `app/layout.tsx`).
- LENIS-02: `lerp: 0.08` per blueprint §4d "damping ~0.08, light not buttery".
- LENIS-03: `syncTouch: false` locked — iOS gets native momentum.
- LENIS-04: `useLenis` re-export READY for Phase 5; no GSAP import / no `ScrollTrigger.update()` call yet (GSAP is Phase 5 only).
- LENIS-05 / A11Y-05: Short-circuit when reduced-motion is on.

Output: A standalone client provider component that is dormant until Plan 02-F wires it into `app/layout.tsx`. No consumers in Phase 2 beyond Plan 02-F. Phase 5's TitleCard becomes the first downstream useLenis consumer.
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
@.claude/CLAUDE.md
@package.json

The `lenis@1.3.23` package is already installed (verified in package.json). The `lenis/react` subpath exports `ReactLenis` and `useLenis`.

**SSR safety (Pitfall 5 in RESEARCH.md):** `window.matchMedia(...)` cannot be called at module top-level — it throws `ReferenceError: window is not defined` during Next.js SSR. The `useReducedMotion` hook below uses the canonical pattern: `useState(false)` for initial render (matches server-rendered HTML), `useEffect` to read matchMedia after hydration, and a change listener for live updates. This is the same shape Framer Motion uses internally.

**Order matters (Pitfall 1 in RESEARCH.md):** Plan 02-F will mount LenisProvider AS THE OUTERMOST wrapper around `<ViewTransition>{children}</ViewTransition>`. LenisProvider intercepts scroll for the whole document; ViewTransition's snapshot machinery is inside it. This plan does NOT mount anything — it just creates the component. The order question is owned by Plan 02-F.

**Why `syncTouch: false` is locked (Pitfall D2 / .claude/CLAUDE.md line 45):** iOS native momentum scroll is correct. `syncTouch: true` overrides the OS gesture, introduces stutter, and the `motion-discipline.sh` harness hook will REJECT any commit containing `syncTouch:\s*true`. Do not change this value.

**Why re-export `useLenis` here:** Phase 5's TitleCard needs to call `useLenis(({ scroll }) => ScrollTrigger.update())` to bridge Lenis's lerped scroll with GSAP's pin/scrub. Re-exporting from LenisProvider documents that this component IS the integration point. Phase 5 imports as `import { useLenis } from '@/components/LenisProvider'`. (Alternative would be importing directly from `lenis/react`, but the re-export makes the contract explicit.)

**Phase 2 quarantine (LENIS-04 deferred activation):** This file imports ZERO from `gsap`, `@gsap/react`, or `gsap/ScrollTrigger`. The Lenis↔ScrollTrigger bridge is documented in a JSDoc but NOT activated. Phase 5's TitleCard wires the actual bridge inside its own `useGSAP` block. If anyone attempts to import GSAP here in Phase 2, the harness `motion-discipline.sh` enforcement plus the project's GSAP quarantine rule (.claude/CLAUDE.md line 33) blocks the commit.

**Harness hook awareness:**
- `motion-discipline.sh` regex bans: `cursor.*follow`, `MouseFollower`, `scroll-snap-type:\s*y\s+mandatory`, `marquee`, `<Marquee`, `font-mono`, `font-family:\s*ui-monospace`, `syncTouch:\s*true`. None of these appear in the content this plan writes. The hook MUST be satisfied (syncTouch is explicitly `false`).
- `copy-lint.sh` checks string literals. JSDoc comments are not string literals so banned words in comments would not trip the hook. Verify nonetheless: no banned words appear in this plan's content.
- `font-license.sh` checks for Klim imports without license lock — no fonts referenced here.

<interfaces>
<!-- Already-installed packages this plan consumes -->

From `lenis/react` (lenis@1.3.23):
```typescript
export function ReactLenis(props: {
  root?: boolean;
  options?: LenisOptions;
  children?: React.ReactNode;
}): JSX.Element;

export function useLenis(callback?: (lenis: { scroll: number; /* ... */ }) => void): Lenis | undefined;
```

From `react` (19.2.6):
```typescript
export function useState<T>(initial: T): [T, (next: T) => void];
export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
```

<!-- This plan creates these exports (Phase 5 + Plan 02-F will consume): -->

From `@/components/LenisProvider` (NEW):
```typescript
export function LenisProvider(props: { children: React.ReactNode }): JSX.Element;
export { useLenis } from "lenis/react";  // re-export for Phase 5
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task B1: Create components/LenisProvider.tsx</name>
  <files>components/LenisProvider.tsx</files>
  <action>
Create the new file `components/LenisProvider.tsx` (the `components/` directory may not exist yet — create it). Write the following content VERBATIM (from 02-RESEARCH.md Code Examples §2):

```tsx
// components/LenisProvider.tsx
//
// Phase 2 — LENIS-01..05 + A11Y-05 (View-Transition-and-Lenis portion).
//
// Mounts <ReactLenis root> exactly once at the root layout. Reads
// prefers-reduced-motion via a hook that respects SSR (returns false on
// first render, updates after hydration) so we never call matchMedia at
// module top-level (Pitfall: ReferenceError: window is not defined).
//
// When reduced-motion is on, we short-circuit and render children directly
// without Lenis active (LENIS-05). Native scroll provides the correct UX
// for vestibular-sensitive users.
//
// Re-exports useLenis from 'lenis/react' so Phase 5 TitleCard can bridge:
//   import { useLenis } from '@/components/LenisProvider';
//   useLenis(({ scroll }) => ScrollTrigger.update());
// This keeps the integration point explicit and documented.
//
// LENIS-04 forward-reference: Phase 5 wires the actual Lenis↔ScrollTrigger
// bridge inside components/TitleCard.tsx. Phase 2 only exposes the hook
// (no GSAP imports here — quarantine rule per .claude/CLAUDE.md line 33).
//
// Source: STACK.md §"Motion & Scroll" + integration note 3;
//         PITFALLS.md C2 (SSR safety), D2 (syncTouch:false locked).
"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

// Re-export for Phase 5 consumption (TitleCard's Lenis↔ScrollTrigger bridge).
export { useLenis } from "lenis/react";

/**
 * Track prefers-reduced-motion. SSR-safe: returns false on first server render,
 * updates after client hydration. Listens for live media-query changes.
 */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  // LENIS-05 / A11Y-05 — short-circuit when user prefers reduced motion.
  // Native scroll is the correct UX here; Lenis would override OS-level
  // vestibular accommodations.
  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        // LENIS-02 — blueprint §4d "damping ~0.08, light not buttery".
        // `lerp` is the canonical damping parameter per Lenis README.
        // Default is 0.1; 0.08 is slightly lighter.
        lerp: 0.08,

        // Recommended secondary tuning. Lenis uses lerp OR duration;
        // setting both works (duration governs scroll-to() calls, lerp
        // governs wheel input). Keep duration at the documented default.
        duration: 1.2,

        // LENIS-03 / PITFALLS.md D2 — locked false.
        // iOS gets native momentum scroll, which is correct.
        // DO NOT enable. Documented in .claude/CLAUDE.md.
        syncTouch: false,

        // Wheel input smoothing — required for desktop foyer reading rhythm.
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

IMPORTANT — what must NOT change:
- The `'use client'` directive MUST be the first line (after no leading whitespace).
- `syncTouch: false` MUST stay literally `false`. Setting it to `true` will fail the `motion-discipline.sh` harness hook AND degrade iOS UX.
- Do NOT import from `gsap`, `@gsap/react`, or `gsap/ScrollTrigger` here — Phase 2 GSAP quarantine.
- Do NOT import from `@studio-freight/react-lenis` — retired package; use `lenis/react`.
- Do NOT call `window.matchMedia` at module top-level — must stay inside `useEffect`.
- Do NOT introduce a `<Providers>` wrapper component — premature abstraction (RESEARCH.md Pattern 1).
- Do NOT add any banned words from `lib/banned.ts` in JSDoc comments — verify before commit. (Comments are not string literals so the hook should not trip, but be cautious.)
  </action>
  <verify>
    <automated>cd /c/Users/micah/Code/micahjonesconsulting && test -f components/LenisProvider.tsx && grep -q "use client" components/LenisProvider.tsx && grep -q "ReactLenis" components/LenisProvider.tsx && grep -q "from \"lenis/react\"" components/LenisProvider.tsx && grep -q "lerp: 0.08" components/LenisProvider.tsx && grep -q "syncTouch: false" components/LenisProvider.tsx && grep -q "export { useLenis }" components/LenisProvider.tsx && ! grep -q "syncTouch: true" components/LenisProvider.tsx && ! grep -q "studio-freight" components/LenisProvider.tsx && ! grep -q "import.*gsap" components/LenisProvider.tsx && pnpm typecheck 2>&1 | tail -10</automated>
  </verify>
  <done>
- File `components/LenisProvider.tsx` exists.
- File starts with `"use client";` directive.
- File imports `ReactLenis` from `"lenis/react"` (NOT from `@studio-freight/react-lenis`).
- File re-exports `useLenis` from `"lenis/react"`.
- `<ReactLenis root options={{ ... }}>` block uses `lerp: 0.08`, `duration: 1.2`, `syncTouch: false`, `smoothWheel: true`.
- A `useReducedMotion()` hook reads `window.matchMedia("(prefers-reduced-motion: reduce)")` inside `useEffect` (not at module top-level).
- When `useReducedMotion()` returns `true`, `LenisProvider` returns `<>{children}</>` (short-circuit).
- The file contains zero `import` statements referencing `gsap`, `@gsap/react`, or `gsap/ScrollTrigger`.
- `pnpm typecheck` passes with zero new errors.
  </done>
</task>

</tasks>

<verification>
1. **File exists + structure** — automated grep above confirms `'use client'`, `ReactLenis`, `lenis/react`, `lerp: 0.08`, `syncTouch: false`, `useLenis` re-export.
2. **Anti-pattern absence** — automated grep confirms zero `syncTouch: true`, zero `studio-freight`, zero `gsap` imports.
3. **TypeScript** — `pnpm typecheck` passes; the new file slots into the existing tsconfig path alias `@/components/LenisProvider`.
4. **SSR safety** — confirmed by reading the file: `matchMedia` is inside `useEffect`, `useState` initial is `false`. No `if (typeof window !== 'undefined')` guards needed because matchMedia access is gated by useEffect lifecycle.
5. **Integration with downstream:** the re-exported `useLenis` is consumable as `import { useLenis } from "@/components/LenisProvider"` from Phase 5's `components/TitleCard.tsx`.
</verification>

<success_criteria>
- `components/LenisProvider.tsx` exists with the exact RESEARCH.md §2 contents.
- All five Lenis requirements + A11Y-05 (View Transition + Lenis portion) wired:
  - LENIS-01 (mount-ready — Plan 02-F actually mounts it).
  - LENIS-02 (`lerp: 0.08`).
  - LENIS-03 (`syncTouch: false`).
  - LENIS-04 (`useLenis` re-exported; Phase 5 activates the GSAP bridge).
  - LENIS-05 + A11Y-05 (reduced-motion short-circuit).
- Zero GSAP imports.
- Zero retired-package imports.
- `pnpm typecheck` clean.
</success_criteria>

<output>
After completion, create `.planning/phases/02-root-layout-lenis-transitions/02-B-SUMMARY.md` covering:
- New file: `components/LenisProvider.tsx`
- Exports: `LenisProvider` (component) + `useLenis` (re-export)
- Configuration: lerp 0.08, duration 1.2, syncTouch false, smoothWheel true
- Reduced-motion handling: useReducedMotion hook with useEffect-gated matchMedia
- Forward-references:
  - Plan 02-F mounts this provider as outermost wrapper in app/layout.tsx
  - Phase 5 TitleCard activates the Lenis↔ScrollTrigger bridge via `useLenis(() => ScrollTrigger.update())`
- Explicit deferral: LENIS-04 (Lenis↔ScrollTrigger bridge) is plumbed (useLenis exported) but NOT activated in Phase 2 — Phase 5's TitleCard wires the actual bridge inside its own component (GSAP quarantine per .claude/CLAUDE.md line 33).
</output>
