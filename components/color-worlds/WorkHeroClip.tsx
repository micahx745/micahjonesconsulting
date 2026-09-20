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
// it again (playedThisLoad). No caption, no disclosure.
//
// A refused play() is handled by WHY it was refused (motion-engineer ruling
// 2026-09-20, amending the MOTION-120-APPROVAL line ":50-52 a refused play()
// is not retried"). Two different things were being treated as one:
//   - Refused while the page is VISIBLE -- iOS Low Power Mode, a codec gap, an
//     autoplay policy on a page the reader is looking at. A fact about the
//     device for this session. The poster stays and nothing retries, exactly
//     as before.
//   - Refused while the page is HIDDEN -- Chrome pauses muted video-only media
//     in a background tab ("AbortError: video-only background media was paused
//     to save power"). A fact about one instant, not the device. Opening the
//     page in a background tab, or switching tabs during the arm window, used
//     to kill the clip for the whole load. brand.json motion.heroclip lists
//     the surfaces that legitimately get the poster alone -- no JS, reduced
//     motion, Save-Data, 2g -- and a backgrounded tab is not one of them.
// So the flag now flips on the "playing" event (frames actually decoding), not
// on the attempt, and a hidden-tab refusal waits for the next visible moment.
// The retry only fires if the frame is STILL in the viewport then, so a reader
// who scrolled away does not get a clip playing off-screen; the observer stays
// armed and the clip arrives on their next real intersection instead. Three
// attempts in total, and any refusal while visible ends it immediately.
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
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g")
      return;

    const MAX_ATTEMPTS = 3;
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let intersecting = false;
    let attempts = 0;
    let onVisible: (() => void) | null = null;

    // Everything this effect armed, released. Called on a real play, on a
    // durable refusal, and on unmount.
    const teardown = () => {
      observer?.disconnect();
      observer = null;
      if (onVisible) {
        document.removeEventListener("visibilitychange", onVisible);
        onVisible = null;
      }
    };

    // The authoritative signal: frames are decoding. A resolved play() promise
    // is not proof that playback began, so the flag hangs off this event.
    const onPlaying = () => {
      playedThisLoad = true;
      teardown();
    };
    video.addEventListener("playing", onPlaying, { once: true });

    const waitForVisible = () => {
      if (onVisible) return; // already waiting
      onVisible = () => {
        if (onVisible) {
          document.removeEventListener("visibilitychange", onVisible);
          onVisible = null;
        }
        if (cancelled || playedThisLoad) return;
        if (document.visibilityState !== "visible") return;
        // Only if the frame is still on screen. If it is not, the observer is
        // still armed and will start the clip on the next real intersection.
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
        // The branch that matters, read at the moment of the refusal.
        if (document.visibilityState === "visible") {
          teardown(); // durable: the poster stays, nothing retries
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
          start();
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
      // Resource hygiene: a client navigation mid-play would otherwise leave a
      // detached element still decoding.
      if (!video.paused) video.pause();
      teardown();
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
      <source
        src="/media/work-hero-720.mp4"
        type='video/mp4; codecs="avc1.640028"'
      />
    </video>
  );
}
