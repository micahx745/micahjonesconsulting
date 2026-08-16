// components/color-worlds/OrdaniSticky.tsx
//
// THE signature scroll moment of the entire site.
//
// Pins the Ordani section for ~100vh of scroll. While pinned, the
// content reveals in a scrubbed timeline tied to scroll position —
// the Apple product-page style. Each element gets its own scrubbed
// window of the timeline:
//
//   0% ─── 15% — Live beta tag fades + slides up (small move)
//   10% ── 50% — ORDANI title scales 0.85 → 1.0 + fades in
//   40% ── 70% — Lede paragraph fades + slides up
//   60% ── 90% — Beta signup form fades + slides up
//   85% ── 100% — "Private beta" footnote fades in
//
// The mount-only client component finds the Ordani section by id,
// finds its children by class, removes the .cw-reveal class (which
// would otherwise compete with our timeline), then GSAP owns the
// animation states until cleanup.
//
// Mobile + prefers-reduced-motion: ScrollTrigger is skipped entirely;
// elements remain in their CSS resting state (visible, transformed
// none). Section behaves as a normal vertical block.
//
// WorldSwitcher behavior during pin: the section stays at viewport
// center throughout the pin, so WorldSwitcher fires the petrol world
// once and holds it for the full duration. Once the pin releases,
// the next section (Products) crosses viewport center and the world
// transitions to espresso. Clean.
"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function OrdaniSticky() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Strip .cw-reveal from the targets on mount so the IO-driven reveal
  // doesn't fight GSAP for visibility ownership. Run BEFORE GSAP setup
  // so the elements start in their natural CSS state.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = document.getElementById("ordani");
    if (!section) return;
    const selectors = [".cw-tagrow", ".cw-lede", ".cw-note"];
    selectors.forEach((sel) => {
      const el = section.querySelector(sel);
      el?.classList.remove("cw-reveal");
    });
    // The h2 (Ordani title) doesn't have cw-reveal, only cw-bleed.
    // The beta form's reveal class is on the form's root via cw-reveal
    // inside OrdaniBetaForm — leave that one alone; GSAP targets the
    // wrapping element via .cw-signup parent class.
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const section = document.getElementById("ordani");
      if (!section) return;

      const tag = section.querySelector<HTMLElement>(".cw-tagrow");
      const title = section.querySelector<HTMLElement>("h2");
      const lede = section.querySelector<HTMLElement>(".cw-lede");
      const form = section.querySelector<HTMLElement>(".cw-signup");
      const note = section.querySelector<HTMLElement>(".cw-note");

      if (!tag || !title || !lede || !form || !note) return;

      const mm = gsap.matchMedia();

      // Pointer-fine + motion-OK gets the full sticky-scroll experience.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 760px)",
        () => {
          // Pass-14 (CW-21): tag is INTENTIONALLY left out of the
          // hidden-init array. The 3-pill tagrow ("Live beta · 14
          // doula practices · <vague usage claim>") is the
          // section's strongest social-proof signal and must be
          // visible the moment the section pins — rather than
          // buried at phase 1 of the scrub-timeline behind the
          // giant ORDANI title's scale-in. The tag stays at full
          // opacity from rest. Cowork Pass-13 Block 7 recommendation.
          //
          // Title scales DOWN to 0.85 and fades to 0 — it'll grow +
          // appear at the peak of the scrub.
          gsap.set([lede, form, note], {
            opacity: 0,
            y: 28,
            willChange: "transform, opacity",
          });
          gsap.set(title, {
            scale: 0.85,
            opacity: 0,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          // The pinned timeline. end: "+=100%" gives 1 viewport-height
          // of scroll for the reveal sequence.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=100%",
              pin: true,
              pinSpacing: true,
              scrub: 0.6, // small smoothing so it doesn't snap to scroll
              anticipatePin: 1,
            },
          });

          // Phase 1 (0 → 0.15): Live beta tag enters
          tl.to(
            tag,
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0,
          );

          // Phase 2 (0.10 → 0.50): ORDANI title scales up + fades in
          tl.to(
            title,
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            0.1,
          );

          // Phase 3 (0.40 → 0.70): Lede fades + slides
          tl.to(
            lede,
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
            0.4,
          );

          // Phase 4 (0.60 → 0.90): Beta form fades + slides
          tl.to(
            form,
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
            0.6,
          );

          // Phase 5 (0.85 → 1.00): Footnote fades in
          tl.to(
            note,
            { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
            0.85,
          );

          return () => {
            // matchMedia revert handles ScrollTrigger cleanup
            gsap.set([tag, title, lede, form, note], {
              clearProps: "all",
            });
          };
        },
      );

      // Reduced-motion + touch get a static layout. Just ensure
      // visibility is unchanged from CSS.
      mm.add(
        "(prefers-reduced-motion: reduce), (max-width: 759px)",
        () => {
          // Explicit reset: anything from the desktop matchMedia
          // branch that lingered gets cleared.
          gsap.set([tag, title, lede, form, note], {
            clearProps: "all",
          });
        },
      );
    },
    { scope: containerRef, dependencies: [] },
  );

  // Render a tiny mount marker — the component's effect is global to
  // the Ordani section, not contained to this ref. Returning null
  // would skip useGSAP's scope cleanup; an empty div is the canonical
  // pattern.
  return <div ref={containerRef} aria-hidden style={{ display: "none" }} />;
}
