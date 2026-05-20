// components/color-worlds/Hero.tsx
//
// Hero — the only client-heavy section. Owns:
//   1. Load reveal: eyebrow + headline lines translateY(110% → 0),
//      sub + CTA row fade up. Staggered, kicked off after mount.
//   2. Rolling word: product → pipeline → launch → system, cycling
//      every 1.9s. Matches the mockup's translate-by-step approach
//      with a snap-reset on cycle completion.
//   3. Parallax: small mousemove transform on the h1.
//
// All motion is short-circuited by prefers-reduced-motion via CSS.
// The component still mounts on those clients but the visible effect
// is identical to a static page.
"use client";

import { useEffect, useRef } from "react";

const ROLLING_WORDS = ["product.", "pipeline.", "launch.", "system."] as const;

export function Hero() {
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const rollRef = useRef<HTMLSpanElement | null>(null);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  function captureLine(el: HTMLSpanElement | null) {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  }

  // Load reveal — fires once after mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reveal eyebrow
    const eyebrow = eyebrowRef.current;
    if (eyebrow) {
      eyebrow.style.transition =
        "transform .8s .15s cubic-bezier(.16,1,.3,1)";
      requestAnimationFrame(() => {
        eyebrow.style.transform = "translateY(0)";
      });
    }

    // Reveal headline lines, staggered
    lineRefs.current.forEach((el, i) => {
      el.style.transition = `transform .9s cubic-bezier(.16,1,.3,1)`;
      el.style.transitionDelay = `${0.25 + i * 0.12}s`;
      requestAnimationFrame(() => {
        el.style.transform = "translateY(0)";
      });
    });

    // Reveal sub + cta-row via class toggle (CSS handles the easing).
    subRef.current?.classList.add("is-in");
    ctaRowRef.current?.classList.add("is-in");

    // No further return needed — this is a one-shot reveal.
    void reduced;
  }, []);

  // Rolling word cycle. Matches the mockup's setInterval loop.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const roll = rollRef.current;
    if (!roll) return;

    let step = 0;
    const interval = window.setInterval(() => {
      step = (step + 1) % ROLLING_WORDS.length;
      roll.style.transition = "transform .6s cubic-bezier(.7,0,.2,1)";
      roll.style.transform = `translateY(-${step}em)`;

      // When step rolls back to 0, snap-reset so the next cycle doesn't
      // visibly scroll backwards through the whole list. Snap happens
      // after the animation completes (~620ms).
      if (step === 0) {
        window.setTimeout(() => {
          roll.style.transition = "none";
          roll.style.transform = "translateY(0)";
        }, 620);
      }
    }, 1900);

    return () => window.clearInterval(interval);
  }, []);

  // Parallax — mousemove on the h1.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    const h1 = h1Ref.current;
    if (!h1) return;

    function onMove(e: PointerEvent) {
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      h1!.style.transform = `translate(${dx * 20}px, ${dy * 12}px)`;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <header
      className="cw-hero"
      data-section
      data-world="terracotta"
      id="top"
      aria-label="Hero"
    >
      <div className="cw-eyebrow">
        <span ref={eyebrowRef}>
          Independent builder — Oakland, CA — Available now
        </span>
      </div>

      <h1 className="cw-h1 cw-shift" ref={h1Ref}>
        <span className="cw-line">
          <span ref={captureLine}>I build the</span>
        </span>
        <span className="cw-line">
          <span ref={captureLine}>
            <span className="cw-roll">
              <span className="cw-stack" ref={rollRef}>
                {ROLLING_WORDS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
                {/* Duplicate first word so the snap-reset is invisible
                    in the brief window between -3em transition end and
                    the JS-driven snap back to 0em. */}
                <span>{ROLLING_WORDS[0]}</span>
              </span>
            </span>
          </span>
        </span>
      </h1>

      <p className="cw-sub" ref={subRef}>
        Strategy and software, shipped by the same pair of hands. I build
        go-to-market for clients — <em>and products with real users.</em>
      </p>

      <div className="cw-cta-row" ref={ctaRowRef}>
        <a href="#contact" className="cw-cta" data-cursor data-magnetic>
          Book a call <span className="cw-arr">→</span>
        </a>
        <span className="cw-scrollhint">↓ Scroll</span>
      </div>
    </header>
  );
}
