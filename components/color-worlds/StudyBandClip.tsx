// components/color-worlds/StudyBandClip.tsx
//
// Pass-123, Stage 3: the Guardicore study band's photograph plays this clip
// once, layered over the preloaded <Image> in .cs-band__media (app/(theater)/
// work/[slug]/page.tsx), after the window load event and after the title has
// settled, then rests back on the photo. Modelled on WorkHeroClip.tsx
// (Pass-120, DESIGN_BAR R12 exception, brand.json motion.heroclip), but with
// its own module flag (independent of /work's -- see STUDY-BRIEF.md §8.4)
// and no `poster` prop: the <Image> beneath it is the poster and stays the
// page's LCP image, so this component owns nothing but the moving frame.
//
// Gated off entirely under prefers-reduced-motion, Save-Data, and 2g/slow-2g:
// in every one of those cases the effect returns before arming, and the
// video stays at opacity 0 under the photo forever (app/globals.css handles
// the rest-state opacity; this component only ever adds "is-playing").
//
// Otherwise: arms on window `load` (so the clip's own network request never
// competes with LCP) and plays once any part of the video is in the
// viewport -- but never earlier than 1200ms after this component mounted,
// so on a fresh load the title's settle (done 600ms) and the poster's
// assembly (done 800ms) have both landed before the picture moves.
"use client";

import { useEffect, useRef } from "react";

let playedThisLoad = false;

type ConnectionHint = { saveData?: boolean; effectiveType?: string };

export function StudyBandClip() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || playedThisLoad) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: ConnectionHint })
      .connection;
    if (conn?.saveData === true) return;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g")
      return;

    const mounted = performance.now();
    const MAX_ATTEMPTS = 3;
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let intersecting = false;
    let floorSpent = false;
    let attempts = 0;
    let onVisible: (() => void) | null = null;

    const teardown = () => {
      observer?.disconnect();
      observer = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (onVisible) {
        document.removeEventListener("visibilitychange", onVisible);
        onVisible = null;
      }
    };

    // The class goes on when frames actually decode, and so does the flag: a
    // resolved play() promise is not proof that playback began.
    const onPlaying = () => {
      playedThisLoad = true;
      video.classList.add("is-playing");
      teardown();
    };
    const onEnded = () => video.classList.remove("is-playing");
    video.addEventListener("playing", onPlaying, { once: true });
    video.addEventListener("ended", onEnded, { once: true });

    const waitForVisible = () => {
      if (onVisible) return;
      onVisible = () => {
        if (onVisible) {
          document.removeEventListener("visibilitychange", onVisible);
          onVisible = null;
        }
        if (cancelled || playedThisLoad) return;
        if (document.visibilityState !== "visible") return;
        // Only while the band is still on screen. Otherwise the observer stays
        // armed and the clip arrives on the next real intersection.
        if (intersecting) start();
      };
      document.addEventListener("visibilitychange", onVisible);
    };

    const start = () => {
      if (cancelled || playedThisLoad || attempts >= MAX_ATTEMPTS) return;
      attempts += 1;
      video.muted = true;
      video.preload = "auto";
      video.play().catch(() => {
        if (cancelled || playedThisLoad) return;
        // Refused while the reader is looking at the page: a fact about the
        // device (Low Power Mode, a codec gap). The photo stays, nothing
        // retries. Refused while hidden: a fact about one instant, so wait.
        if (document.visibilityState === "visible") {
          teardown();
          return;
        }
        if (attempts >= MAX_ATTEMPTS) {
          teardown();
          return;
        }
        waitForVisible();
      });
    };

    const arm = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (cancelled || playedThisLoad) return;
          intersecting = entries.some((entry) => entry.isIntersecting);
          if (!intersecting) return;
          // The 1200ms floor is mount-relative and exists so the title's settle
          // (600ms) and the poster's assembly (800ms) land first. It is spent
          // once: any retry is already later in wall-clock time than the first
          // attempt, so recomputing it would only ever yield 0.
          if (floorSpent) {
            start();
            return;
          }
          floorSpent = true;
          const wait = Math.max(0, 1200 - (performance.now() - mounted));
          timer = setTimeout(start, wait);
        },
        { threshold: 0 },
      );
      observer.observe(video);
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", arm);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
      // A client navigation mid-play would otherwise leave a detached element
      // still decoding.
      if (!video.paused) video.pause();
      teardown();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="cs-band__clip"
      width={720}
      height={900}
      preload="none"
      muted
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/media/work-hero-720.webm" type='video/webm; codecs="vp9"' />
      <source
        src="/media/work-hero-720.mp4"
        type='video/mp4; codecs="avc1.640028"'
      />
    </video>
  );
}
