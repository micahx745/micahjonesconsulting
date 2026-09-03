// components/color-worlds/PlaybookHeroMedia.tsx
//
// The /playbook hero media slot — THE OBJECT (Pass-53, design-director
// round 2). The real book-cover render presented as itself: a static
// perspective tilt (≤8°, never mouse-tracked, never idling) and one
// tight edge-light, on the espresso world it shares with the cover's
// own ground. The outer box is the socket for the operator-generated
// factory loop: pass videoSrc and the video mounts in the same stage
// with the cover as its poster — zero reflow. Reduced-motion users
// keep the still (CSS hides the video). The tilt lives on the inner
// stage so the reveal's own transform never fights it.
import Image from "next/image";

export function PlaybookHeroMedia({ videoSrc }: { videoSrc?: string }) {
  return (
    <div
      className={
        videoSrc
          ? "cw-pb-hero-media cw-pb-hero-media--video cw-reveal"
          : "cw-pb-hero-media cw-reveal"
      }
    >
      <div className="cw-pb-hero-media__stage">
        <Image
          src="/playbook/book-cover.png"
          alt="The front cover of The 80% Wall: an espresso spec-sheet page, the title stacked in bone and terracotta display type."
          width={1819}
          height={2572}
          priority
          sizes="(max-width: 900px) 70vw, 340px"
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
    </div>
  );
}
