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
