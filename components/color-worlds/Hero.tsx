// components/color-worlds/Hero.tsx
//
// Hero — Editorial Lede (Pass-9).
//
// Replaces the Pass-8 manifesto stack ("Ship the strategy. Ship the
// product. Ship the launch. Ship.") which read flat/didactic and a
// little Rauno-cosplay. Replaces also the hand-underline beneath
// "Ship." which asked for too much attention bookmarking a 4-letter
// word.
//
// New pattern: promote the operator's already-strongest line to the
// H1. The sentence-pair "Most consultants leave the PDF and move on.
// I stay until users have the product in hand." was the sub since
// Pass-8; it's the load-bearing sentence on the whole site. Run it
// as the headline.
//
// Hand-mark migrates to RevenueTick — marks land where the work is.
//
// Reveal: pure-CSS keyframes per Pass-8 lesson (no inline-transform
// writes; View-Transitions snapshot capture won't fight us). Two
// sentence-lines stagger via the same --reveal-i custom prop pattern
// already used for the manifesto. Sub + CTA-row use class-toggle
// transitions which are snapshot-safe because they don't start from
// a CSS-rule-defined hidden state.
"use client";

import { useEffect, useRef } from "react";

const HEADLINE_LINES = [
  "Most consultants leave the PDF and move on.",
  "I stay until users have the product in hand.",
] as const;

export function Hero() {
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  function captureLine(el: HTMLSpanElement | null) {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    lineRefs.current.forEach((el, i) => {
      el.style.setProperty("--reveal-i", String(i));
    });

    subRef.current?.classList.add("is-in");
    ctaRowRef.current?.classList.add("is-in");
  }, []);

  // Parallax on h1 — pointer-fine devices only, rAF-batched, viewport-capped.
  // Reduced amplitude (was 6,4 — now 4,2) for the editorial register; a
  // calmer headline doesn't want as much drift as the all-caps display H1.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!fine) return;

    const h1 = h1Ref.current;
    if (!h1) return;

    let tx = 0;
    let ty = 0;
    let raf = 0;
    let pending = false;

    function onMove(e: PointerEvent) {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    }
    function apply() {
      const scale = Math.min(window.innerWidth / 1920, 1);
      h1!.style.transform = `translate(${tx * 4 * scale}px, ${ty * 2 * scale}px)`;
      pending = false;
    }
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      ref={heroRef}
      className="cw-hero cw-hero--lede"
      data-section
      data-world="terracotta"
      id="top"
      aria-label="Hero"
    >
      <div className="cw-eyebrow">
        <span>Independent operator · Oakland, CA</span>
      </div>

      <h1
        className="cw-h1 cw-h1--lede"
        ref={h1Ref}
        aria-label="Most consultants leave the PDF and move on. I stay until users have the product in hand."
      >
        {HEADLINE_LINES.map((line, i) => (
          <span key={i} className="cw-h1-line">
            <span ref={captureLine}>{line}</span>
          </span>
        ))}
      </h1>

      <p className="cw-sub" ref={subRef}>
        Strategy and software, shipped by the same pair of hands.
      </p>

      <div className="cw-cta-row" ref={ctaRowRef}>
        <a
          href="https://calendly.com/micahmccoyjones/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="cw-cta"
        >
          Book a call <span className="cw-arr" aria-hidden>→</span>
        </a>
        <a href="#clients" className="cw-cta cw-cta--ghost">
          See how I work <span className="cw-arr" aria-hidden>↓</span>
        </a>
      </div>
    </header>
  );
}
