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
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const start = () => {
      if (cancelled || playedThisLoad) return;
      playedThisLoad = true;
      video.muted = true;
      video.preload = "auto";
      video.addEventListener(
        "playing",
        () => video.classList.add("is-playing"),
        { once: true },
      );
      video.addEventListener(
        "ended",
        () => video.classList.remove("is-playing"),
        { once: true },
      );
      video.play().catch(() => {
        // Refused: the photo stays, and nothing retries.
      });
    };

    const arm = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (cancelled || playedThisLoad) return;
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
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
      observer?.disconnect();
      if (timer) clearTimeout(timer);
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
