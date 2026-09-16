// components/color-worlds/WorkHeroClip.tsx
//
// Pass-120: the /work hero clip. DESIGN_BAR R12 exception (operator 2026-09-16,
// "Use the AI clip anyway"), brand.json motion.heroclip. Not a precedent.
//
// The server renders the <video> with its poster, which is frame 0 of the clip
// (the photograph as it went in, no generated motion). That poster is the whole
// render without JavaScript, under prefers-reduced-motion, with Save-Data on,
// and on a 2g connection: in those cases play() is never called.
//
// Otherwise, after the window load event (so the clip never competes with LCP)
// and once any part of the frame is in the viewport, it plays ONCE per document:
// muted, inline, no loop, no controls, and it holds its last frame. A client
// navigation back to /work remounts the video on its poster and does not play
// it again (playedThisLoad). If play() is refused (iOS Low Power Mode, a codec
// gap), the poster simply stays. No caption, no disclosure.
"use client";

import { useEffect, useRef } from "react";

let playedThisLoad = false;

type ConnectionHint = { saveData?: boolean; effectiveType?: string };

export function WorkHeroClip({ poster }: { poster: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || playedThisLoad) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: ConnectionHint })
      .connection;
    if (conn?.saveData === true) return;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const arm = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (cancelled || playedThisLoad) return;
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          playedThisLoad = true;
          video.muted = true;
          video.preload = "auto";
          video.play().catch(() => {
            // Refused: the poster stays, and nothing retries.
          });
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
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="cw-wx-lead__clip"
      width={720}
      height={900}
      poster={poster}
      preload="none"
      muted
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/media/work-hero-720.webm" type='video/webm; codecs="vp9"' />
      <source src="/media/work-hero-720.mp4" type='video/mp4; codecs="avc1.640028"' />
    </video>
  );
}
