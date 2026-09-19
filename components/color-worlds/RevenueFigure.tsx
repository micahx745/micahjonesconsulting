// Pass-122 (.planning/mocks/pass-122/RECEIPTS-BRIEF.md; operator 2026-09-18,
// LESSONS #3 "PASS-122 THEMES AND FIRST PAGE", themes 1 and 3). Replaces the
// Pass-114 count-up (brand.json motion.countup): this arrival is the one
// hero-number move for the receipts.
//
// $20M+ at poster size, fitted to the content column (two lines under 600px,
// one line above). The server renders it as solid text (copper once JS runs;
// without JS the world map never reaches espresso, so it keeps the world's
// foreground): that is the finished frame without JavaScript, under reduced
// motion, with Save-Data or a 2g connection, and whenever the figure is
// already in view or above at load.
//
// Otherwise, once the window has loaded and the figure is within one viewport
// of the fold, a decorative clip box is mounted over the numerals (the video
// is preload="none" until then, so the home hero's LCP never sees it). When
// half the figure is visible the Tel Aviv clip plays ONCE, muted and inline,
// inside the glyphs, then the box fades and the numerals settle into copper.
//
// The knockout (LESSONS #7: every blend lives inside one isolated box):
//   black box + white glyphs          -> glyph mask
//   video, mix-blend-mode: multiply   -> footage inside the glyphs, black out
//   world ground, mix-blend-mode: lighten -> the black becomes the ground
// The footage grade and framing live on .cw-rec__video in app/globals.css: a
// 0.42 floor with a steep slope, so the glyph interiors hold 3:1 against
// espresso (p5, measured on the rendered page) while faces and hands still
// separate. Every glyph reads as a whole shape.
"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "armed" | "playing" | "settling" | "done";
type ConnectionHint = { saveData?: boolean; effectiveType?: string };

const SETTLE_MS = 900;
// Backstop if `ended` never arrives (a stalled decode): the clip is 4.08s.
const BACKSTOP_MS = 5600;
let playedThisLoad = false;

function Numerals() {
  return (
    <>
      <span className="cw-rec__line">$20</span>
      <span className="cw-rec__line">M+</span>
    </>
  );
}

export function RevenueFigure() {
  const boxRef = useRef<HTMLSpanElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhaseState] = useState<Phase>("idle");

  const setPhase = (next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  };

  // Eligibility + arming.
  useEffect(() => {
    const box = boxRef.current;
    if (!box || playedThisLoad) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: ConnectionHint })
      .connection;
    if (conn?.saveData === true) return;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g")
      return;
    // Already in view or above at load (refresh, deep link): finished frame.
    if (box.getBoundingClientRect().top < window.innerHeight) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const arm = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || phaseRef.current !== "idle") continue;
            if (entry.boundingClientRect.top >= window.innerHeight) {
              // Inside the extended root, still below the fold: mount the
              // clip box so the first frame is ready before it is seen.
              observer?.disconnect();
              setPhase("armed");
            }
            // Arrived in view without ever arming (one jump from far above):
            // leave the finished frame alone.
          }
        },
        { rootMargin: "0px 0px 100% 0px", threshold: 0 },
      );
      observer.observe(box);
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", arm);
      observer?.disconnect();
    };
  }, []);

  // Leave the clip for the settle: on `ended`, on a refused play(), or on the
  // backstop timer. Only ever from "playing", so it runs once.
  const settle = () => {
    if (phaseRef.current === "playing") setPhase("settling");
  };

  // Play once half the figure is visible; flicked past upward = finished.
  useEffect(() => {
    if (phase !== "armed") return;
    const box = boxRef.current;
    const video = videoRef.current;
    if (!box || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (phaseRef.current !== "armed") continue;
          if (entry.intersectionRatio >= 0.5) {
            observer.disconnect();
            playedThisLoad = true;
            setPhase("playing");
            video.muted = true;
            video.play().catch(settle);
          } else if (
            !entry.isIntersecting &&
            entry.boundingClientRect.bottom < 0
          ) {
            observer.disconnect();
            setPhase("done");
          }
        }
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = window.setTimeout(settle, BACKSTOP_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  // The settle: the clip box fades over the copper numerals, then unmounts.
  useEffect(() => {
    if (phase !== "settling") return;
    const t = window.setTimeout(() => setPhase("done"), SETTLE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  const clipMounted =
    phase === "armed" || phase === "playing" || phase === "settling";

  return (
    <div className="cw-rec" data-phase={phase}>
      <p className="cw-rec__num">
        <span className="cw-sr-only">$20M+</span>
        <span className="cw-rec__box" aria-hidden="true" ref={boxRef}>
          <span className="cw-rec__fig">
            <Numerals />
          </span>
          {clipMounted ? (
            <span className="cw-rec__clip">
              <span className="cw-rec__fig cw-rec__fig--mask">
                <Numerals />
              </span>
              <video
                ref={videoRef}
                className="cw-rec__video"
                poster="/media/work-hero-poster-960.avif"
                preload="auto"
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                onEnded={settle}
              >
                <source
                  src="/media/work-hero-720.webm"
                  type='video/webm; codecs="vp9"'
                />
                <source
                  src="/media/work-hero-720.mp4"
                  type='video/mp4; codecs="avc1.640028"'
                />
              </video>
              <span className="cw-rec__floor" />
            </span>
          ) : null}
        </span>
      </p>
      <p className="cw-rec__lbl">In revenue behind my work</p>
    </div>
  );
}
