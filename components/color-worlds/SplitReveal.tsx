// components/color-worlds/SplitReveal.tsx
//
// Section-title char-by-char reveal using GSAP 3.13 SplitText (now
// free under Webflow's stewardship as of April 30, 2025).
//
// Splits the wrapped text into per-character spans, hides them below
// the baseline, then plays a staggered slide-up when the element
// enters the viewport. Uses gsap.context (via @gsap/react useGSAP)
// for automatic cleanup on unmount.
//
// Why SplitText for SECTION TITLES specifically:
//   - The hero already has its own line-slide reveal. Char-reveal there
//     would compete; char-reveal in mid-page section titles READS as a
//     premium beat, not a competing effect.
//   - Character cascade is the strongest "this site has texture" motion
//     move that doesn't require photography or 3D.
//
// Respects prefers-reduced-motion via gsap.matchMedia.
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType, ReactNode } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface SplitRevealProps {
  /** Element tag to render. Default h2. */
  as?: ElementType;
  /** Forwarded to the rendered element. Important — aria-labelledby
   *  references on parent sections need this to resolve. */
  id?: string;
  /** Content — should be plain text (gets split into chars). */
  children: ReactNode;
  className?: string;
  /** Stagger per char in seconds. Default 0.012 — tightened from
   *  0.018 per Pass-6 review; longer staggers showed a visible
   *  half-revealed mid-state on fast scrolls. */
  stagger?: number;
  /** Delay from scroll-trigger fire, in seconds. Default 0. */
  delay?: number;
  /** Viewport position that fires the reveal. Default "top 75%". */
  start?: string;
}

export function SplitReveal({
  as: Tag = "h2",
  id,
  children,
  className,
  stagger = 0.012,
  delay = 0,
  start = "top 75%",
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, {
          type: "chars,words",
          // Wrap each char in an inline-block so transforms work.
          charsClass: "cw-split__char",
          wordsClass: "cw-split__word",
        });

        gsap.set(split.chars, {
          yPercent: 110,
          opacity: 0,
        });

        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          // Shortened from 0.85s to 0.65s per Pass-6 review — fast
          // scrollers were catching a multi-second half-revealed window.
          duration: 0.65,
          stagger,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });

        return () => {
          split.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // No motion — leave the text as-is, already visible per default
        // CSS. Nothing to do.
      });
    },
    { scope: containerRef },
  );

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      id={id}
      className={className}
    >
      {children}
    </Tag>
  );
}
