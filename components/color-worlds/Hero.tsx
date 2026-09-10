// components/color-worlds/Hero.tsx
//
// Pass-109 (operator 2026-09-10, approving Astra's H1: "I take AI-built
// products from demo to production."). THE ROTATING WORD IS RETIRED. Recorded,
// not buried: the rotation was operator-locked twice (Pass-12 "I love the first
// hero", then D1's one-shot ruling), and this approval supersedes both. The
// headline now states the offer in one sentence (DESIGN_BAR R7). The sub
// carries the positioning claim explicitly, because the exit record below is
// positioning and go-to-market work, and a headline narrowed to AI delivery
// would otherwise orphan its own receipts (the operator's constraint on the
// approval). Everything below about the roll is history; one revert of the
// Pass-109 commit restores it.
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
// "See how I work ↓" anchors to #clients. (History: the CTA row's own
// Pass-106 and Pass-109 comments below are the current ones.)
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { MagneticArea } from "@/components/motion/MagneticArea";

export function Hero() {
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRowRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

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

      {/* Pass-109: two semantic lines, the second in the italic register the
          rolling word used to carry. Each may wrap on a narrow screen;
          "AI-built" is held together so the hyphen never ends a line. The h1's
          text is one clean sentence for crawlers and screen readers alike ("I
          take AI-built products from demo to production."), so the cw-sr-only
          continuation went with the roll. Pass-68's trailing-space rule still
          applies: the two block lines run together as text. */}
      <h1 className="cw-h1 cw-shift" ref={h1Ref}>
        <span className="cw-line">
          <span ref={captureLine}>
            I take <span className="cw-nowrap">AI-built</span> products{" "}
          </span>
        </span>
        <span className="cw-line cw-line--turn">
          <span ref={captureLine}>from demo to production.</span>
        </span>
      </h1>

      {/* Pass-109: the SUBHEAD carries the positioning claim, explicitly. The
          operator's constraint on approving the new H1: the exit record
          (Guardicore, SurveyMonkey, Postmates, Neuton.AI) is positioning and
          go-to-market work, not demo-to-production work, so without this line
          the receipts below would stop corroborating the claim above them. Its
          first sentence keeps the old headline's own words ("I build the
          go-to-market") and names PRODUCTS, not "them". The first draft said
          "Then I position them", which bound the claim to the H1's "AI-built
          products", and three of the four exits (Guardicore, SurveyMonkey,
          Postmates) are not AI products (Pass-109 review, copy lens). Its
          second is the operator-locked
          positioning line (Wave 1, D-R13), kept verbatim, now after the claim
          instead of alone. The Pass-106 buyer line is gone: it said the buyer's
          product "demos well and stalls before production", which the H1 now
          says outright, and a third block of prose under the headline was part
          of what read as overwhelming. */}
      <p className="cw-sub" ref={subRef}>
        <em>
          I also position products and build the{" "}
          <span className="cw-nowrap">go-to-market</span> that sells them.
        </em>{" "}
        Strategy and software, shipped by the same pair of hands.
      </p>

      {/* Pass-30 (Cowork review): the $149 playbook is OFF the enterprise
          front door entirely — it leaked onto an FIS buyer's first screen.
          It stays reachable from the /services self-select routing line.
          Hero CTAs are now one enterprise ladder: see the proof, hire me,
          talk. */}
      {/* W3 (D7, operator-locked 2026-08-11): ONE filled pill per page —
          "See the work" is home's primary (receipts-first posture).
          Hire-me and Book-a-call demote to the underlined-mono grammar. */}
      {/* Pass-106 (chat research CHAT-105-RESEARCH.md §4 "The opening":
          "Two buttons only"): cut "Hire me" (→ /services). The research
          names /services' three-engagements framing directly: "abstract
          and enterprise-flavoured; a stalled solo builder does not
          self-identify as needing 'Frontier AI engineering.'" Hire-me
          and Book-a-call were both "engage me" asks pointing at
          different pages — cutting the one that leads to the page the
          research flags as weak, keeping the one that answers "how do I
          start" directly. /services is unchanged and still reachable
          from the nav (Nav.tsx) and from three links further down this
          same page — nothing about the route itself is touched. */}
      {/* Pass-109 (Astra #2, operator-approved 2026-09-10: "Do the buy-button
          treatment"). Buying gets the strongest action on the page. The one
          filled pill moves from "See the work" to "Start the Audit", with the
          price and duration beside it so the click is informed, and "See the
          work" drops to the underlined-mono grammar Book-a-call already uses.
          This supersedes W3/D7 above ("See the work" as home's primary). D7's
          intent survives: every filled pill on this page is the SAME action, and
          it goes where the offer section's own "Start the Audit" goes,
          /packages, which opens on the Audit card. Colour is --cw-fg / --cw-bg,
          never --cw-accent: see .cw-buy in globals.css for the four worlds. */}
      <div className="cw-cta-row" ref={ctaRowRef}>
        <span className="cw-buy-group">
          <MagneticArea>
            <a href="/packages" className="cw-buy">
              Start the Audit{" "}
              <span className="cw-arr" aria-hidden>
                →
              </span>
            </a>
          </MagneticArea>
          <span className="cw-buy-meta">$2,500 · two weeks</span>
        </span>
        <a href="#products" className="cw-mlink">
          See the work <span aria-hidden>↓</span>
        </a>
        {/* Pass-93, operator 2026-09-03: "Booking replaces the contact form for
            engagements", reversing Pass-82 for this lane. /contact stays in the
            nav for anyone who would rather write than take a slot. */}
        <a href="/call" className="cw-mlink">
          Book a free intro call <span aria-hidden>→</span>
        </a>
      </div>

      {/* Pass-106 (credential pass, CHAT-105-RESEARCH). The two-chip
          floating stat pair is retired. Diagnosis: a number pinned to
          the photo in display-face NAKED TYPE (.cw-chip__fig) IS the
          badge grammar — the fix isn't moving figures off the photo
          (everything in this hero sits on the photo), it's dropping
          that display treatment for one sentence in the hero's own
          body voice, same register as .cw-sub above it. The per-
          company cash-out (acquirer, price, role) moves to THE LEDGER
          (#products), which gains a fourth row for Neuton.AI to
          complete the claim this line makes — see the page.tsx patch
          in the same set. Both sentences below are copied verbatim
          from shipped copy, not new language: the exits sentence
          matches app/layout.tsx's own metadata description; the
          revenue sentence matches about/page.tsx's revenue bullet.
          Pass-57 (operator 2026-09-01, "keep the exits thing and the
          20 mil") is why both figures stay IN THE HERO at all — this
          patch keeps them, it only retires the stat-object staging.
          NEEDS_RULING: that staging is Pass-7's naked-type grammar,
          chosen after two rounds were rejected as "look weak" / "look
          ai" — confirm the demotion to plain prose before this ships. */}
      {/* CREDENTIAL LINE REMOVED (Pass-107, operator 2026-09-09: "retire the
          hero part that shows the exit and the other thing").

          This REVERSES Pass-57 (operator 2026-09-01, "keep the exits thing and
          the 20 mil"), which is the only reason the figures were still in the
          hero at all. Recorded rather than argued: the earlier ruling is not
          buried, it is superseded, and putting the line back is one revert.

          Why it is safe to lose: nothing goes with it. The exit record inside
          the receipts now carries all four deals with their counterparties,
          years, disclosed figures, the $5.58B sum and the $5B+ under-claim, and
          the ledger's closing row carries $20M+ in client revenue. Both figures
          also remain in the metadata descriptions and the OG images. What the
          hero loses is an ASSERTION made before anything has been shown, which
          is the exact treatment both independent reviews called a badge. */}
    </header>
  );
}
