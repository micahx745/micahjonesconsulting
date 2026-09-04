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
// ROLLING WORD MOTION (D1, operator-locked 2026-08): one-shot, not a
// perpetual loop. setTimeout chain drives an inline transform on the
// stack, stepping through ROLLING_WORDS once and landing on the
// duplicated first word at the end of the stack ("go-to-market.") —
// that duplicate exists so the terminal frame never has to scrub
// backwards to close a loop. Pass-6+ avoided inline-style writes for
// reveal STATIC states (View-Transitions snapshot stomping was the
// bug); this now DOES have a terminal "is-revealed" state (the final
// translateY), so a snapshot mid-sequence or post-sequence both land
// on a stable frame — fine either way. IO starts the sequence once,
// the first time the hero is >=20% visible, then disconnects (no
// pause/resume machinery — there's nothing left to loop).
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
import Image from "next/image";
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
  // Pass-69: the .cw-roll box itself, so its width can ease with the roll.
  const rollBoxRef = useRef<HTMLSpanElement | null>(null);
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

  // Rolling word — one-shot on first view (D1). Starts the first time the hero
  // crosses 20% visible, steps once at the original 1900ms cadence, and lands
  // back on "go-to-market." (no loop, nothing to pause or resume).
  //
  // Pass-69 — ONE WORD IN THE DOM AT A TIME.
  //
  // The stack used to hold all four words plus a duplicate, so the h1's text
  // content read "I build the go-to-market, product, and data platforms.
  // go-to-market.product.data platform.RFP engine.go-to-market." to anything
  // reading text rather than looking at pixels. Screen readers were always
  // fine (the stack is aria-hidden and there is a cw-sr-only sentence beside
  // it), but every crawler saw that.
  //
  // Now the server renders ONE word. Each step appends the next word below the
  // 1em overflow-hidden window, translates the stack up by exactly 1em, then
  // drops the consumed word and resets the transform with no transition. So:
  // one word in the initial HTML, one word at rest, two only during a 600ms
  // transition. The motion is unchanged because the mechanic is unchanged.
  //
  // The roll's width is driven explicitly, because with one child the
  // inline-block would otherwise snap between word widths at cleanup instead
  // of easing with the roll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const stack = rollRef.current;
    const roll = rollBoxRef.current;
    const hero = heroRef.current;
    if (!stack || !roll || !hero) return;

    let started = false;
    const timeouts: number[] = [];
    const EASE = "cubic-bezier(.7,0,.2,1)";

    function step(i: number) {
      const current = stack!.firstElementChild as HTMLElement | null;
      if (!current) return;
      // Land back on the first word, the way the duplicate used to.
      const word = ROLLING_WORDS[(i + 1) % ROLLING_WORDS.length]!;

      const next = document.createElement("span");
      next.textContent = word;
      stack!.appendChild(next);

      // Width first, so the box eases instead of snapping when the old word
      // is dropped. Read it before any transition is attached.
      const target = next.getBoundingClientRect().width;

      requestAnimationFrame(() => {
        roll!.style.transition = `width .6s ${EASE}`; // motion-ok: matches the pre-existing 600ms roll duration
        roll!.style.width = `${target}px`;
        stack!.style.transition = `transform .6s ${EASE}`; // motion-ok: pre-existing rolling-word duration, unchanged
        stack!.style.transform = "translateY(-1em)";
      });

      const cleanup = window.setTimeout(() => {
        current.remove();
        stack!.style.transition = "none"; // motion-ok: instant reset of a finished step, never animated
        stack!.style.transform = "none";
      }, 640);
      timeouts.push(cleanup);
    }

    function runSequence() {
      if (started) return;
      started = true;
      // Lock the starting width so the first step has something to ease from.
      roll!.style.width = `${roll!.getBoundingClientRect().width}px`;
      for (let i = 0; i < ROLLING_WORDS.length; i++) {
        timeouts.push(window.setTimeout(() => step(i), (i + 1) * 1900));
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          runSequence();
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(hero);

    return () => {
      io.disconnect();
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Chip drift (Pass-4) — scroll-linked, same philosophy as the service
  // strip (D2): progress derives from the hero's own rect every scroll
  // frame, written to --hero-scroll on the hero root; each chip's CSS
  // multiplies it by its own --drift. User-driven, no idle loop; the
  // reduced-motion guard means the var is never set and chips sit still.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const hero = heroRef.current;
    if (!hero) return;

    let raf = 0;
    let pending = false;
    function apply() {
      const rect = hero!.getBoundingClientRect();
      // 0 at load, 1 when the hero has fully scrolled past.
      const progress = Math.min(
        Math.max(-rect.top / Math.max(rect.height, 1), 0),
        1,
      );
      hero!.style.setProperty("--hero-scroll", progress.toFixed(4));
      pending = false;
    }
    function onScroll() {
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(apply);
      }
    }
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
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
      className="cw-hero cw-hero--photo"
      data-section
      data-world="terracotta"
      id="top"
      aria-label="Hero"
    >
      {/* Pass-4 (D-R15): the photographic ground — the operator at his
          laptop in front of a whiteboard of real system diagrams. The
          reference language he picked (SyncDepth / Nixtio / PeakHealth):
          full-bleed photo, display type OVER it, proof chips floating on
          it. Duotone comes from CSS (grayscale + terracotta→espresso
          veil), NOT mix-blend-mode — LESSONS #7. The photo is treated as
          ground; the H1/sub carry the message, so the image is decorative
          to assistive tech. */}
      <div className="cw-hero__ground" aria-hidden>
        <Image
          src="/hero-context.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="cw-hero__photo"
        />
        <div className="cw-hero__veil" />
      </div>

      <h1 className="cw-h1 cw-shift" ref={h1Ref}>
        <span className="cw-line">
          {/* Pass-68: trailing space. The two lines are separate block spans,
              so visually they stack, but as TEXT they ran together and every
              crawler read "I build thego-to-market". A real defect regardless
              of what happens to the rotation itself. */}
          <span ref={captureLine}>I build the </span>
        </span>
        <span className="cw-line">
          <span ref={captureLine}>
            {/* Pass-69: the roll comes FIRST and the screen-reader line
                continues from it, so the h1 reads as prose to anything
                consuming text: "I build the go-to-market. Also product, data
                platforms, and RFP engines." It used to be the other way
                round, which left the visible word stranded after a complete
                sentence. The roll stays aria-hidden so a screen reader hears
                this once instead of re-announcing on every step. */}
            <span className="cw-roll" aria-hidden ref={rollBoxRef}>
              {/* Pass-69: ONE word server-rendered. The effect above appends
                  the next word for the duration of each 600ms step and drops
                  the consumed one, so the h1's text is a clean sentence in the
                  initial HTML and again at rest. */}
              <span className="cw-stack" ref={rollRef}>
                <span>{ROLLING_WORDS[0]}</span>
              </span>
            </span>
            <span className="cw-sr-only">
              {" "}
              Also product, data platforms, and RFP engines.
            </span>
          </span>
        </span>
      </h1>

      {/* Wave 1 (D-R13): the operator-locked positioning line IS the sub,
          alone. Pass-4: the proof deck is now the chip cluster on the
          photo (the band it once deferred to is gone). */}
      <p className="cw-sub" ref={subRef}>
        <em>Strategy and software, shipped by the same pair of hands.</em>
      </p>

      {/* Pass-30 (Cowork review): the $149 playbook is OFF the enterprise
          front door entirely — it leaked onto an FIS buyer's first screen.
          It stays reachable from the /services self-select routing line.
          Hero CTAs are now one enterprise ladder: see the proof, hire me,
          talk. */}
      {/* W3 (D7, operator-locked 2026-08-11): ONE filled pill per page —
          "See the work" is home's primary (receipts-first posture).
          Hire-me and Book-a-call demote to the underlined-mono grammar. */}
      <div className="cw-cta-row" ref={ctaRowRef}>
        <MagneticArea>
          <a href="#products" className="cw-cta">
            See the work{" "}
            <span className="cw-arr" aria-hidden>
              ↓
            </span>
          </a>
        </MagneticArea>
        <a href="/services" className="cw-mlink">
          Hire me <span aria-hidden>→</span>
        </a>
        {/* Pass-93, operator 2026-09-03: "Booking replaces the contact form for
            engagements", reversing Pass-82 for this lane. /contact stays in the
            nav for anyone who would rather write than take a slot. */}
        <a href="/call" className="cw-mlink">
          Book a free intro call <span aria-hidden>→</span>
        </a>
      </div>

      {/* Pass-5: the proof chips as STAT OBJECTS (operator: v1 chips
          "look weak"). Figure at display scale in the display face,
          label in mono beneath — the SyncDepth/PeakHealth object
          grammar, not a text pill. The four-exit story leads
          (operator instruction 2026-08-30; $5B+ = disclosed deals
          only, sources in content/citations.ts). Scroll counter-drift
          unchanged: user-driven, dead under reduced motion.
          Pass-57 (operator 2026-09-01: "cut down on the attributes…
          keep the exits thing and the 20 mil"): TWO stats, anchored
          bottom-right as a pair so the photo's face stays clear. */}
      <ul className="cw-chips" aria-label="Track record at a glance">
        <li
          className="cw-chip cw-chip--lead cw-reveal"
          style={
            {
              "--drift": "-22px",
              transitionDelay: "500ms",
            } as React.CSSProperties
          }
        >
          <strong className="cw-chip__fig">$5B+</strong>
          <span className="cw-chip__lbl">combined value of four exits</span>
          <span className="cw-chip__sub">
            Postmates · SurveyMonkey · Guardicore · Neuton.AI
          </span>
        </li>
        <li
          className="cw-chip cw-reveal"
          style={
            {
              "--drift": "30px",
              transitionDelay: "620ms",
            } as React.CSSProperties
          }
        >
          <strong className="cw-chip__fig">$20M+</strong>
          <span className="cw-chip__lbl">client revenue</span>
        </li>
      </ul>
    </header>
  );
}
