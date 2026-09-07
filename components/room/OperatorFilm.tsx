// components/room/OperatorFilm.tsx
//
// PASS-101 PHASE 3 — clip B as a ground (WINNING-BRIEF §4 "03", §14.2, §15.1;
// brief §3: "the operator section's register (clip B as a ground on /about)").
//
// The film is the focus: a square stage with the heading set OVER its lower
// third on a measured veil. No band above it, no caption under it, and the
// picture is held still — §4 "03" bans parallax, hover states and scale on it,
// so the only transform in play is the fixed 1.30 framing zoom in the
// stylesheet, which never changes.
//
// R12 / R15 ruling for the record (§5): a filmed loop of the operator is the
// photograph moving, not UI animation. The reduced-motion branch is the R15
// discharge — the <video> goes display:none and its poster is shown, which is
// done in CSS so it holds even if this component never hydrates.
//
// PLAYBACK, per §15.1: `preload="auto"` plus autoplay, and on the first user
// gesture the clip is played again if the browser refused autoplay. It is
// paused whenever it is off screen, which is what keeps a looping film off the
// battery of someone reading the bottom of the page.
//
// The clip is served as a FILE from /public/video (brief §1 and the §7
// rejected list: "Data-URI video on the site"). WebM first, MP4 second.
"use client";

import { useEffect, useRef } from "react";

export function OperatorFilm({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    let visible = false;
    const play = () => {
      // play() rejects on browsers that refuse autoplay; that is the poster's
      // job to cover, so the rejection is swallowed rather than reported.
      void video.play().catch(() => {});
    };

    const io =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                visible = entry.intersectionRatio >= 0.35;
                if (visible) play();
                else video.pause();
              }
            },
            { threshold: [0, 0.35, 1] },
          );
    io?.observe(video);
    if (!io) play();

    const onGesture = () => {
      if (visible || !io) play();
    };
    const events = ["pointerdown", "touchstart", "keydown", "wheel"] as const;
    for (const e of events)
      window.addEventListener(e, onGesture, { passive: true, once: true });

    return () => {
      io?.disconnect();
      for (const e of events) window.removeEventListener(e, onGesture);
    };
  }, []);

  return (
    <div className="rl-opfilm" aria-hidden="true">
      <video
        ref={ref}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster="/video/b-poster.jpg"
        aria-label={label}
      >
        <source src="/video/b-loop-720.webm" type="video/webm" />
        <source src="/video/b-loop-720.mp4" type="video/mp4" />
      </video>
      <div className="still" />
      <div className="veil" />
    </div>
  );
}
