// components/color-worlds/Hero.tsx
//
// Hero — manifesto stack. Replaces the prior rotating-noun carousel
// ("I build the [pipeline./launch./product./system.]") which the
// operator + reviewers both flagged as: words didn't cohere as a
// sequence, no escalation, gimmicky.
//
// New pattern (per research — Rauno Freiberg's manifesto stack on
// rauno.me + the operator's actual selling point):
//
//     Ship the strategy.
//     Ship the product.
//     Ship the launch.
//     Ship.
//
// Four stacked imperatives, each line earning the next. The final
// "Ship." stands alone — that's the moment of conviction. A hand-
// drawn underline appears beneath the final Ship (HandUnderline
// component) — the one defensible hand-drawn mark in the hero per
// the research's "marks land where the work is" rule.
//
// Choreographed reveal — each line slides up from translateY(110%)
// to 0 in sequence; the underline draws in last. All progressive-
// enhancement gated on .cw-js-reveals (no-JS clients see the full
// stack immediately). Class-based per Pass-6 fix (inline transforms
// lost to View-Transitions snapshot capture).
//
// Parallax + magnetic CTA preserved from prior version. Two CTAs
// now (per operator feedback): primary "Book a call →" + secondary
// "See how I work ↓" anchor link.
"use client";

import { useEffect, useRef } from "react";
import { MagneticArea } from "@/components/motion/MagneticArea";
import { HandUnderline } from "@/components/hand/HandUnderline";

const MANIFEST_LINES = [
  "Ship the strategy.",
  "Ship the product.",
  "Ship the launch.",
  "Ship.",
] as const;

export function Hero() {
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  function captureLine(el: HTMLSpanElement | null) {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el);
  }

  // Load reveal — Pass-8 fix: pure-CSS keyframe animation. The
  // JS class-toggle approach (Pass-6) was racing with View Transitions
  // snapshot capture; on Pass A the `is-revealed` class was queued but
  // never landed, so all four lines arrived simultaneously instead of
  // staggered. CSS keyframes with `animation-delay: calc(...)` driven
  // by the `--reveal-i` custom prop sidestep the race entirely — no
  // class toggle, no rAF, no snapshot interference.
  //
  // useEffect still runs to (a) set the --reveal-i custom prop on
  // each line so CSS can compute the per-line delay, and (b) add the
  // .is-in class on sub/cta-row (those use transition not keyframes
  // so the snapshot stomping doesn't affect them).
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
        <span ref={eyebrowRef}>Independent operator — Oakland, CA</span>
      </div>

      <h1 className="cw-h1 cw-shift" ref={h1Ref} aria-label="Ship the strategy. Ship the product. Ship the launch. Ship.">
        {MANIFEST_LINES.map((line, i) => (
          <span key={i} className="cw-line">
            <span ref={captureLine}>{line}</span>
          </span>
        ))}
        {/* Hand-drawn underline beneath the final "Ship." — the one
            defensible mark in the hero per research's "marks land
            where the work is" rule. */}
        <span className="cw-hero-underline" aria-hidden>
          <HandUnderline
            variant={1}
            delay={1.4}
            color="var(--color-cw-bone)"
          />
        </span>
      </h1>

      <p className="cw-sub" ref={subRef}>
        Most consultants leave the PDF and move on. I stay until users have
        the product in hand.
      </p>

      <div className="cw-cta-row" ref={ctaRowRef}>
        <MagneticArea>
          <a
            href="https://calendly.com/micahmccoyjones/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="cw-cta"
          >
            Book a call <span className="cw-arr">→</span>
          </a>
        </MagneticArea>
        <a href="#clients" className="cw-cta cw-cta--ghost">
          See how I work <span className="cw-arr">↓</span>
        </a>
      </div>
    </header>
  );
}
