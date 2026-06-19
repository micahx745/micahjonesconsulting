// components/color-worlds/Hero.tsx
//
// Hero — restore the rotating-word display H1 (Pass-12).
//
// Background: the original Color Worlds hero ran "I build the
// [product./pipeline./launch./system.]" with the bracketed word
// cycling through. Pass-A replaced this with a four-line manifesto
// stack ("Ship the strategy / Ship the product / ..."). Pass-9
// replaced that with an editorial two-sentence lede ("Most
// consultants leave the PDF...").
//
// Operator feedback on Pass-9: "I love the first hero" — wanted the
// rotating word back. Also called the editorial-register font (Bricolage
// 600 mixed-case at clamp 36-88px) "cheap." Restoring the original
// display treatment: 800 weight, ALL CAPS, clamp(52, 12.5vw, 196)
// — the same Bricolage face renders authoritatively at display scale
// and weight.
//
// PROGRESSIVE ENHANCEMENT: the baseline HTML is fully visible. The
// initial-hidden state (translateY 110%, opacity 0) only applies when
// the root has `.cw-js-reveals` — added by ScrollReveal on mount.
//
// ROLLING WORD A11Y: the cycling stack is aria-hidden; a visually-
// hidden static sibling provides the SR-only fallback "go-to-market
// and product." — read once, not on every cycle.
//
// ROLLING WORD MOTION: setInterval drives an inline transform on the
// stack. Pass-6+ avoided inline-style writes for reveal STATIC states
// (View-Transitions snapshot stomping was the bug). The rotating word
// isn't a static reveal — it's a perpetual loop with no "is-revealed"
// terminal state to fight, so the snapshot captures one instant of the
// cycle and that's fine. IO + visibilitychange pause when offscreen.
//
// PARALLAX: rAF-batched + viewport-scaled. dx*6/dy*4 on the H1.
// Pointer-fine only (excludes touch-laptop users from the unnecessary
// handler).
//
// CTAs: dual CTA per operator brand. Primary "Book a call" wrapped
// in MagneticArea — operators converting calls want the spring. Ghost
// "See how I work ↓" anchors to #clients.
"use client";

import { useEffect, useRef } from "react";
import { MagneticArea } from "@/components/motion/MagneticArea";

// Pass-31 (Cowork round 2): every word now reads as a clean sentence
// after the fixed stem "I build the ___". Dropped "position." / "launch."
// (awkward after "the"). Added "data platform." + "RFP engine." — they
// name the real RAG RFP-scanning software and signal data/fintech +
// procurement range, pulling the enterprise-data category by general
// credibility, never naming a buyer, never presuming a problem.
const ROLLING_WORDS = [
  "go-to-market.",
  "product.",
  "data platform.",
  "RFP engine.",
] as const;

export function Hero() {
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const rollRef = useRef<HTMLSpanElement | null>(null);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  function captureLine(el: HTMLSpanElement | null) {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  }

  // Load reveal — pure-CSS keyframe driven by --reveal-i custom prop
  // set per-line. Matches the Pass-8 pattern that survived View-
  // Transitions snapshot capture (no inline-transform writes for the
  // static reveal — class toggle on the parent root via ScrollReveal
  // signals .cw-js-reveals, and the CSS owns from/to states).
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
          // Snap back to top with no transition so the loop closes
          // without visibly scrubbing backwards through the words.
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
        if (shouldRun()) start();
        else stop();
      },
      { threshold: 0.2 },
    );
    io.observe(hero);

    function onVisibility() {
      tabVisible = !document.hidden;
      if (shouldRun()) start();
      else stop();
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
      <h1 className="cw-h1 cw-shift" ref={h1Ref}>
        <span className="cw-line">
          <span ref={captureLine}>I build the</span>
        </span>
        <span className="cw-line">
          <span ref={captureLine}>
            {/* Screen-reader fallback: the rolling stack is decorative
                motion; the SR-only static label is read once. */}
            <span className="cw-sr-only">go-to-market, product, and data platforms.</span>
            <span className="cw-roll" aria-hidden>
              <span className="cw-stack" ref={rollRef}>
                {ROLLING_WORDS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
                {/* Duplicate first word at end so the loop close
                    doesn't visibly scrub backwards through the stack. */}
                <span>{ROLLING_WORDS[0]}</span>
              </span>
            </span>
          </span>
        </span>
      </h1>

      <p className="cw-sub" ref={subRef}>
        Three companies I helped build reached an exit — an IPO and two
        acquisitions.{" "}
        <em>
          I sell and position data and security into banks, insurers,
          and regulated buyers.
        </em>
      </p>

      {/* Pass-30 (Cowork review): the $149 playbook is OFF the enterprise
          front door entirely — it leaked onto an FIS buyer's first screen.
          It stays reachable from the /services self-select routing line.
          Hero CTAs are now one enterprise ladder: see the proof, hire me,
          talk. */}
      <div className="cw-cta-row" ref={ctaRowRef}>
        <MagneticArea>
          <a href="#products" className="cw-cta">
            See the work <span className="cw-arr" aria-hidden>↓</span>
          </a>
        </MagneticArea>
        <a href="/hire-me" className="cw-cta cw-cta--ghost">
          Hire me <span className="cw-arr" aria-hidden>→</span>
        </a>
        <a
          href="https://calendly.com/micahmccoyjones/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="cw-cta cw-cta--ghost"
        >
          Book a call <span className="cw-arr" aria-hidden>↗</span>
        </a>
      </div>

    </header>
  );
}
