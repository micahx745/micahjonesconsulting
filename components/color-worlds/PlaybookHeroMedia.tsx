// components/color-worlds/PlaybookHeroMedia.tsx
//
// The /playbook hero media slot (Pass-52, design-director spec): one
// landscape espresso-backed container that ships the real book-cover
// render today and takes the operator-generated "vibe-coding factory"
// loop later with zero reflow — same box, same aspect, the cover
// becomes the poster. The cover's own ground is the same espresso as
// the backdrop, so the letterbox reads as the artifact in its frame.
//
// Video rules (locked in product/playbook/HANDOFF.md): muted autoplay
// loop, playsInline, <4MB, poster fallback; prefers-reduced-motion
// users get the still (CSS hides the video element; the image sibling
// always renders underneath). The video is imagery, not a second
// signature motion.
import Image from "next/image";

export function PlaybookHeroMedia({ videoSrc }: { videoSrc?: string }) {
  return (
    <div className="cw-pb-hero-media">
      <Image
        src="/playbook/book-cover.png"
        alt="The front cover of The 80% Wall: an espresso spec-sheet page, the title stacked in bone and terracotta display type."
        width={1819}
        height={2572}
        priority
        sizes="(max-width: 900px) 92vw, 460px"
        className="cw-pb-hero-media__img"
      />
      {videoSrc ? (
        <video
          className="cw-pb-hero-media__video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/playbook/book-cover.png"
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
