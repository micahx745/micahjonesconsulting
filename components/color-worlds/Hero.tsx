// components/color-worlds/Hero.tsx
//
// Hero — load reveal + rolling word + parallax.
//
// PROGRESSIVE ENHANCEMENT: baseline HTML is fully visible. The
// initial-hidden state (translateY 110%, opacity 0) only applies when
// the root has `.cw-js-reveals` — added by ScrollReveal on mount.
// No-JS clients see the full hero. Pre-hydration users see the full
// hero. This is identical to the .cw-reveal pattern used elsewhere.
//
// ROLLING WORD A11Y: the cycling stack is aria-hidden; a visually-
// hidden static sibling provides the SR-only fallback "I build the
// system." — read once, not on every cycle.
//
// PARALLAX: rAF-batched + tightened range. Was dx*20/dy*12 — too
// aggressive on display-scale type; cut to dx*6/dy*4. Pointer-fine
// only (excludes touch-laptop users from the unnecessary handler).
//
// ROLLING WORD PAUSE: setInterval pauses when the hero leaves the
// viewport or the tab is hidden.
"use client";

import { useEffect, useRef } from "react";
import { MagneticArea } from "@/components/motion/MagneticArea";

const ROLLING_WORDS = ["product.", "pipeline.", "launch.", "system."] as const;

export function Hero() {
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const rollRef = useRef<HTMLSpanElement | null>(null);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  function captureLine(el: HTMLSpanElement | null) {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  }

  // Load reveal — fires once after mount.
  //
  // Pass-6 fix: switched from inline transform writes to a class toggle.
  // Previous approach set `el.style.transform = "translateY(0)"` from rAF;
  // some interaction (View Transitions snapshot, Lenis raf, or React 19
  // strict-mode double-mount) was re-applying the CSS default after the
  // inline write, leaving the H1 invisible. Class-based reveal wins on
  // specificity and isn't affected by snapshot capture.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return; // CSS handles the static visible state.

    const eyebrow = eyebrowRef.current;
    if (eyebrow) {
      requestAnimationFrame(() => {
        eyebrow.classList.add("is-revealed");
      });
    }

    lineRefs.current.forEach((el, i) => {
      // Inline CSS var carries the stagger index; CSS rule computes
      // the per-line delay from it.
      el.style.setProperty("--reveal-i", String(i));
      requestAnimationFrame(() => {
        el.classList.add("is-revealed");
      });
    });

    subRef.current?.classList.add("is-in");
    ctaRowRef.current?.classList.add("is-in");
  }, []);

  // Rolling word cycle — pauses when hero out of viewport or tab hidden.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const roll = rollRef.current;
    const hero = heroRef.current;
    if (!roll || !hero) return;

    let step = 0;
    let interval: number | null = null;
    let inView = true;
    let tabVisible = !document.hidden;

    function shouldRun() {
      return inView && tabVisible;
    }

    function start() {
      if (interval !== null) return;
      interval = window.setInterval(() => {
        step = (step + 1) % ROLLING_WORDS.length;
        roll!.style.transition = "transform .6s cubic-bezier(.7,0,.2,1)";
        roll!.style.transform = `translateY(-${step}em)`;
        if (step === 0) {
          window.setTimeout(() => {
            if (!roll) return;
            roll.style.transition = "none";
            roll.style.transform = "translateY(0)";
          }, 620);
        }
      }, 1900);
    }
    function stop() {
      if (interval !== null) {
        window.clearInterval(interval);
        interval = null;
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        inView = entry.isIntersecting;
        shouldRun() ? start() : stop();
      },
      { threshold: 0.2 },
    );
    io.observe(hero);

    function onVisibility() {
      tabVisible = !document.hidden;
      shouldRun() ? start() : stop();
    }
    document.addEventListener("visibilitychange", onVisibility);

    if (shouldRun()) start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Parallax — pointer-fine devices only; rAF-batched; tightened range.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
      // Scale the parallax range with viewport so a 4K display doesn't
      // get 19px of drift (which reads as instability, not depth).
      // Caps at the 1920px baseline; sub-1920 scales down proportionally.
      const scale = Math.min(window.innerWidth / 1920, 1);
      h1!.style.transform = `translate(${tx * 6 * scale}px, ${ty * 4 * scale}px)`;
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
      className="cw-hero"
      data-section
      data-world="terracotta"
      id="top"
      aria-label="Hero"
    >
      <div className="cw-eyebrow">
        <span ref={eyebrowRef}>Independent builder — Oakland, CA</span>
      </div>

      <h1 className="cw-h1 cw-shift" ref={h1Ref}>
        <span className="cw-line">
          <span ref={captureLine}>I build the</span>
        </span>
        <span className="cw-line">
          <span ref={captureLine}>
            {/* Screen-reader fallback: the rolling stack is decorative
                motion; the SR-only static label is read once. */}
            <span className="cw-sr-only">go-to-market and product.</span>
            <span className="cw-roll" aria-hidden>
              <span className="cw-stack" ref={rollRef}>
                {ROLLING_WORDS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
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
        <MagneticArea>
          <a href="#clients" className="cw-cta">
            See how I work <span className="cw-arr">↓</span>
          </a>
        </MagneticArea>
        <span className="cw-scrollhint">↓ Scroll</span>
      </div>
    </header>
  );
}
