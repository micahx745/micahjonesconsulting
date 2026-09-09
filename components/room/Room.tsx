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
//
// PASS-104B §2 (fact 0.2): `<source media="...">` is NOT honoured on
// `<video>` — a naive responsive-source markup ships the wrong file to one of
// the two widths. So the swap is a tiny inline script placed IMMEDIATELY
// AFTER the element: it runs during parse, before the browser has requested
// either 720 source, and at >=900px it rewrites both `<source src>` to the
// 1080p pair (already on disk, produced by the section-1 encode commit) and
// calls `.load()`. Below 900px, or with JS off, the 720 pair stands — same
// bytes as before this pass. `.planning/design/104b/hero.md`'s own MECHANISM
// note is explicit that this is a plain `<script>`, not a RoomMotion change:
// zero JavaScript is added to the client bundle.
import Link from "next/link";

const SOURCE_SWAP = `try{if(matchMedia('(min-width:900px)').matches){var v=document.getElementById('filmvid');if(v){var s=v.getElementsByTagName('source');if(s[0])s[0].src='/video/a2-hold-1080.webm';if(s[1])s[1].src='/video/a2-hold-1080.mp4';v.load();}}}catch(e){}`;

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
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: SOURCE_SWAP }}
          />
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
          </div>
        </div>
        {/* PASS-104B §2: the sign. Operator, 2026-09-08: "the 5 billion is
            exit is super weak - maybe be something special like a unquie sign
            that lights up after the go to market part lights up after the
            finger points it way". The rule draws out of the lit word, the
            figure takes current the same way the word did, and the four
            names (verified substrings of Operator.tsx's own sentence) sit on
            the same baseline as the receipt for the claim. Positioned off
            the SAME left edge as the headline — --fx is the one fingertip
            constant that decides every left edge in the hero. */}
        <div className="sign">
          <div className="rule" aria-hidden="true" />
          <div className="row">
            <p className="lg" id="heroproof">
              <span className="l">Four exits,</span> <span className="fig">$5B+</span>{" "}
              <span className="l">combined.</span>
            </p>
            <div className="names">
              <span>Postmates</span>
              <span>SurveyMonkey</span>
              <span>Guardicore</span>
              <span>Neuton.AI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
