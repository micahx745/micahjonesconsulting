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
// TYPE-ONLY import. Importing titleCardSchema as a value here dragged Zod into
// the client bundle on every case-study route (~65KB transferred, measured).
// The MOT-02 runtime contract is unchanged — validation moved to the server
// component that renders this (app/(theater)/work/[slug]/page.tsx), so a bad
// frontmatter shape still throws, just earlier and without shipping a
// validator to the browser. Frontmatter is additionally validated at build
// time by lib/case-study-schema.ts via the copy-lint gate.
import type { TitleCardProps } from "@/lib/title-card-schema";
import { TitleCardComposition } from "@/components/TitleCardComposition";

// Module-level plugin registration. MUST be outside the component function
// so React 19 StrictMode double-mount doesn't trigger "Plugin already
// registered" warnings on every navigation (PITFALLS.md C1).
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Pin runway in pixels. Calibrated to feel like ~600ms at Lenis lerp 0.08.
// Tunable — increase to slow the pin, decrease to speed.
const PIN_DISTANCE_PX = 240;

export function TitleCard(parsed: TitleCardProps) {
  // Props arrive pre-validated by the server component (see the type-only
  // import note above). MOT-02 contract still holds.
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
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Pass-30 (mobile audit 2026-08-31): at phone widths the pin's
      // resolved state left a ~70%-empty first screen with no visible
      // title (the stack fades out; the sr-only H1 is the only title).
      // Under 768px the TitleCard is a STATIC composition — stack and
      // caption both visible, in flow (globals.css flex rules), no pin,
      // no pin-spacer. Desktop keeps the signature pin untouched.
      const mobile = window.matchMedia("(max-width: 767px)").matches;

      const root = rootRef.current;
      if (!root) return;

      const stack = root.querySelector<HTMLElement>("[data-tc-stack]");
      const resolved = root.querySelector<HTMLElement>("[data-tc-resolved]");
      const caption = root.querySelector<HTMLElement>("[data-tc-caption]");
      const hero = root.querySelector<HTMLElement>("[data-tc-hero]");

      if (!stack || !resolved || !caption) return;

      if (mobile && !reduce) {
        gsap.set(stack, { opacity: 1, y: 0 }); // motion-ok: static final state, mobile skips the pin entirely
        gsap.set(resolved, { opacity: 1, y: 0 }); // motion-ok: static final state, no reveal
        gsap.set(caption, { opacity: 1, y: 0 }); // motion-ok: static final state, no reveal
        if (hero) gsap.set(hero, { opacity: 1 });
        return;
      }

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

      // The resolve timeline — driven by scroll progress across the pin
      // runway (scrub, below), not by onEnter/onLeaveBack. `paused: true`
      // is kept so the timeline never auto-plays on its own; ScrollTrigger
      // sets its progress directly from scroll position.
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      });
      tl.to(stack, { opacity: 0, y: -16, duration: 0.5 }, 0); // motion-ok: dissolve driven by scrub progress across the pin runway, not autoplay
      tl.to(resolved, { opacity: 1, duration: 0.4 }, 0.05); // motion-ok: resolve fade tied to scrub progress
      tl.to(caption, { opacity: 1, y: 0, duration: 0.55 }, 0.1); // motion-ok: caption reveal tied to scrub progress
      if (hero) {
        tl.to(hero, { opacity: 1, duration: 0.65 }, 0.18); // motion-ok: hero reveal tied to scrub progress
      }

      // The pin trigger. Pin runway is PIN_DISTANCE_PX of scroll, then
      // unpins. `scrub` binds the timeline's progress directly to scroll
      // position through the runway — at scrollY 0 progress is 0, so the
      // stack is visible at rest on load, and the dissolve tracks the
      // scrollbar (forward and reverse) instead of firing on mount via
      // onEnter (Pass-fix: onEnter fired immediately because "top top"
      // was already satisfied at scrollY 0, dissolving the stack before
      // the visitor scrolled at all).
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${PIN_DISTANCE_PX}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        animation: tl,
        scrub: 0.3,
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
