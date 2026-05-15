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
