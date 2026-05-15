# Plan 05-C: TitleCard Client Wrapper (GSAP + Lenis↔ScrollTrigger Bridge)

**Phase:** 05 TitleCard Signature Motion
**Requirements:** MOT-01 (`'use client'` + `useGSAP({scope: ref})`), MOT-03 (pin + resolve motion), MOT-04 (GSAP quarantine), MOT-05 (reduced-motion branch), MOT-06 (mobile pin still fires); also closes deferred Phase 2 LENIS-04 (Lenis↔ScrollTrigger bridge)
**Depends on:** 05-A (`lib/title-card-schema.ts`, `app/globals.css` styles); 05-B (`components/TitleCardComposition.tsx`); Phase 2 (`useLenis` re-exported from `components/LenisProvider.tsx`)
**Status:** Ready
**Estimated LOC:** 1 new TSX file (~110 lines)

---

## Goal

Ship `components/TitleCard.tsx` — the `'use client'` wrapper that adds GSAP motion to `TitleCardComposition`. This is the **ONLY** file in the codebase that imports `gsap`, `gsap/ScrollTrigger`, or `@gsap/react`. Enforced by `.claude/CLAUDE.md` line 33 and verified post-write by a grep in 05-E.

The file contains five distinct concerns, in this order:

1. **Module-level `gsap.registerPlugin(useGSAP, ScrollTrigger)`** — pre-component so React 19 StrictMode double-mount doesn't trigger "Plugin already registered" warnings (PITFALLS C1).
2. **Zod runtime validation of props** via `titleCardSchema.parse(props)` — MOT-02 contract.
3. **Lenis↔ScrollTrigger bridge** via `useLenis(() => ScrollTrigger.update())` — closes deferred LENIS-04 from Phase 2. One line.
4. **`useGSAP({ scope: rootRef })` callback** — the entire motion choreography, including:
   - First-line `matchMedia('(prefers-reduced-motion: reduce)')` check that short-circuits to final state if true (MOT-05).
   - Normal path: explicit initial `gsap.set` states, paused timeline, then `ScrollTrigger.create({ pin: true, ... onEnter: () => tl.play(), onLeaveBack: () => tl.reverse() })`.
5. **JSX**: a wrapping ref'd `<div>` containing `<TitleCardComposition>` at `phase="stacked"`.

---

## File Operations

### NEW: `components/TitleCard.tsx`

```tsx
// components/TitleCard.tsx
//
// Phase 5 — MOT-01, MOT-03 (motion), MOT-04 (GSAP quarantine),
// MOT-05 (reduced-motion), MOT-06 (mobile reflow via CSS).
//
// THIS IS THE ONLY FILE IN THE CODEBASE THAT IMPORTS GSAP.
// Enforced by .claude/CLAUDE.md line 33 + verify-step grep:
//   grep -rE "import.*gsap" --include='*.ts' --include='*.tsx' . \
//     | grep -v 'node_modules\|\.next\|TitleCard'
//   expected: zero output
//
// Pattern (per STACK.md §"Motion & Scroll" integration note 4,
//          PITFALLS.md C1, A4):
//   - 'use client' at top
//   - gsap.registerPlugin(useGSAP, ScrollTrigger) at MODULE level
//   - useGSAP({ scope: ref }) wraps the timeline + ScrollTrigger setup
//   - matchMedia('(prefers-reduced-motion: reduce)') is the first check
//     inside the useGSAP callback — short-circuits to the resolved state
//   - useLenis(({scroll}) => ScrollTrigger.update()) bridges Lenis lerp
//     into ScrollTrigger's measurement loop (closes deferred LENIS-04)
//
// The component renders TitleCardComposition (server-safe) inside a
// containing ref'd div. GSAP queries DOM nodes by [data-tc-*] attributes
// scoped to the ref's subtree via useGSAP's scope option.
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@/components/LenisProvider";
import { titleCardSchema, type TitleCardProps } from "@/lib/title-card-schema";
import { TitleCardComposition } from "@/components/TitleCardComposition";

// Module-level plugin registration. MUST be outside the component function
// so React 19 StrictMode double-mount doesn't trigger "Plugin already
// registered" warnings on every navigation (PITFALLS.md C1).
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Pin runway in pixels. Calibrated to feel like ~600ms at Lenis lerp 0.08.
// Tunable — increase to slow the pin, decrease to speed.
const PIN_DISTANCE_PX = 240;

export function TitleCard(props: TitleCardProps) {
  // Validate at runtime. Throws on misuse (e.g., 7 words, 2 words,
  // missing caption). MOT-02 contract.
  const parsed = titleCardSchema.parse(props);

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Bridge Lenis lerp into ScrollTrigger's measurement loop so the pin
  // stays accurate while Lenis is animating scroll position.
  // Closes the deferred LENIS-04 requirement from Phase 2.
  //
  // Important: useLenis returns a no-op subscriber when Lenis is short-
  // circuited (reduced-motion). In that case ScrollTrigger.update is
  // simply never invoked from here — but reduced-motion users also skip
  // the ScrollTrigger setup below, so there's nothing to update anyway.
  useLenis(() => {
    ScrollTrigger.update();
  });

  useGSAP(
    () => {
      // MOT-05 — read prefers-reduced-motion FIRST. If reduce, paint the
      // resolved state immediately and skip ScrollTrigger.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const root = rootRef.current;
      if (!root) return;

      const stack = root.querySelector<HTMLElement>("[data-tc-stack]");
      const resolved = root.querySelector<HTMLElement>("[data-tc-resolved]");
      const caption = root.querySelector<HTMLElement>("[data-tc-caption]");
      const hero = root.querySelector<HTMLElement>("[data-tc-hero]");

      if (!stack || !resolved || !caption) return;

      if (reduce) {
        // MOT-05 — final state, no pin, no scrub.
        gsap.set(stack, { opacity: 0, y: -16, pointerEvents: "none" });
        gsap.set(resolved, { opacity: 1, y: 0 });
        gsap.set(caption, { opacity: 1, y: 0 });
        if (hero) gsap.set(hero, { opacity: 1 });
        return;
      }

      // Normal path — initial states explicit so SSR matches what GSAP
      // immediately overrides on mount.
      gsap.set(stack, { opacity: 1, y: 0 });
      gsap.set(resolved, { opacity: 0 });
      gsap.set(caption, { opacity: 0, y: 8 });
      if (hero) gsap.set(hero, { opacity: 0 });

      // The resolve timeline — paused until ScrollTrigger fires onEnter.
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      });
      tl.to(stack, { opacity: 0, y: -16, duration: 0.5 }, 0);
      tl.to(resolved, { opacity: 1, duration: 0.4 }, 0.05);
      tl.to(caption, { opacity: 1, y: 0, duration: 0.55 }, 0.1);
      if (hero) {
        tl.to(hero, { opacity: 1, duration: 0.65 }, 0.18);
      }

      // The pin trigger. Pin runway is PIN_DISTANCE_PX of scroll, then
      // unpins. Timeline plays on enter; reverses if user scrolls back up
      // through the top of the pin before the unpin.
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${PIN_DISTANCE_PX}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });

      // No manual cleanup needed — useGSAP wraps everything in
      // gsap.context() and calls .revert() on unmount.
      // (PITFALLS.md C1 — manual cleanup fights useGSAP's revert.)
      void trigger; // keep reference; useGSAP handles teardown
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="title-card-root">
      <TitleCardComposition {...parsed} phase="stacked" />
    </div>
  );
}
```

---

## Acceptance

- `pnpm typecheck` clean
- `pnpm build` clean (Turbopack compiles the GSAP imports)
- File `components/TitleCard.tsx` exists, starts with `"use client";`
- File contains `gsap.registerPlugin(useGSAP, ScrollTrigger)` at module scope (verify this is NOT inside the function body)
- Imports `useLenis` from `@/components/LenisProvider`, calls `useLenis(() => ScrollTrigger.update())`
- Inside `useGSAP` callback: `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is the first conditional checked
- GSAP imports are quarantined — `components/TitleCard.tsx` is the **only** match for `grep -rE "import.*gsap" --include='*.ts' --include='*.tsx' . | grep -v 'node_modules\|.next'`

---

## Notes

### On Lenis bridge with no Lenis provider

`useLenis(fn)` from `lenis/react` returns a `LenisInstance | null` (the synchronous return) and subscribes `fn` to scroll events if a `LenisProvider` ancestor exists. When `LenisProvider` short-circuits to `<>{children}</>` for reduced-motion users, there is no Lenis context — `useLenis(fn)` is then a no-op subscription. The hook itself never throws.

If the hook DID throw without a provider, we'd guard with `try/catch` or move the bridge inside the non-reduced-motion useGSAP branch. The 05-RESEARCH risk R3 records this; verify in the runtime check.

### On the `void trigger` line

`ScrollTrigger.create()` returns a trigger instance. We don't reference it after creation because `useGSAP`'s `gsap.context()` tracks all GSAP/ScrollTrigger instances created inside the callback and calls `.revert()` on unmount. The `void trigger` line silences a "never used" warning under strict TypeScript without changing semantics.

### On `anticipatePin: 1`

This option asks ScrollTrigger to set up the pin slightly before it engages, reducing jitter on fast scroll. Documented in the GSAP ScrollTrigger API as the recommended option for any pin that interacts with smooth scroll wrappers (like Lenis).

### On the timeline easing

`power2.inOut` is GSAP's documented "smooth start and finish" cubic — closest analogue to the Phase 3 chrome's `cubic-bezier(0.2, 0.8, 0.2, 1)`. Visually consistent across signature motions.

### On `pinSpacing: true`

This adds the pin distance to the document height so content below the TitleCard doesn't jump up to fill the pinned space. Default is true; we set it explicitly for clarity.

### What if Lenis is active and pin still jitters?

The Lenis↔ScrollTrigger bridge (`useLenis(() => ScrollTrigger.update())`) is the documented fix. If verify shows residual jitter, alternatives include:
- Adding `scrollerProxy` configuration to ScrollTrigger (heavyweight)
- Disabling Lenis on theater routes only (the blueprint considered this; we kept Lenis on theater for now)
- Increasing `anticipatePin` to 2 or 3

Document the actual behavior in 05-VERIFY-OUTPUT.md.
