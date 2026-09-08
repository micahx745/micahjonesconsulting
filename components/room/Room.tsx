// components/room/Room.tsx — section 01, the room.
//
// Pass-101 phase 2. The 16:9 stage, the veil, and the headline where the
// finger ends (§14.1, §14.7, §16.2).
//
// Everything that decides WHERE the words land is CSS: --fx / --fy carry the
// fingertip measured on a2-poster-last.jpg at source (372, 413) of 1920x1080,
// and app/room.css positions .hero-copy off them. So the headline lands on the
// finger with scripting off, which is the §14.8 rule the operator's "its not
// loaded for me" bought.
//
// The clip is a FILE, not a data URI (brief §1). Two cuts, webm first so a
// browser that takes it saves 79KB over the mp4. `autoplay muted playsinline`,
// preload="auto", NO loop — clip A runs forward once and holds, which is why
// the poster is the LAST frame.
import Link from "next/link";

export function Room() {
  return (
    <header className="room" id="room">
      <div
        className="stagewrap"
        id="stagewrap"
        data-fx="19.3750"
        data-fy="38.2407"
      >
        <div className="stage" id="stage" aria-hidden="true">
          <video
            id="filmvid"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/video/a2-poster-last.jpg"
          >
            <source src="/video/a2-hold-720.webm" type="video/webm" />
            <source src="/video/a2-hold-720.mp4" type="video/mp4" />
          </video>
          <div className="still" />
          <div className="veil" />
        </div>
        <div className="hero-copy" id="herocopy">
          {/* §16.2: the COPPER row's cap-top is the 4px stop under the
              fingertip and `I build the` sits on the row ABOVE it, over the
              film. The point lands on the "g". */}
          <h1 className="d" id="h1">
            <span className="r r1">I build the</span>
            <span className="r cu">go-to-market.</span>
          </h1>
          <p className="lede">
            Strategy and software, shipped by the same pair of hands. I find the
            gap between what you built and what buyers actually pay for.
          </p>
          <div className="base-row">
            <div className="chips" id="herochips">
              <Link className="chip" href="/call">
                <span className="t">Get a reality check</span>
                <span className="a" aria-hidden="true">
                  <span className="gl">&#8594;</span>
                </span>
              </Link>
              <a className="chip quiet" href="#price">
                <span className="t">See the packages</span>
              </a>
            </div>
            {/* Operator ruling 2026-09-06, verbatim: "Just put somewhere the 5
                billion of exits i have helped with." ONE line, and $5B+ is the
                single named exception to the no-figures rule (§14.8). */}
            <div className="proof" id="heroproof">
              <span className="l now">Four exits, $5B+ combined.</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
