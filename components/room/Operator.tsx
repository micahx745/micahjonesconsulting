// components/room/Operator.tsx — section 02, operator not consultant.
//
// PASS-104B §3 ("Operator A: the long table"). The square stage and its
// two-column register are gone. The film is a shallow full-bleed band
// (100vw, 440px at >=900, 420px at <=899) with the heading set across it as
// ONE display line at >=900 and two at <=899; the paragraph that used to sit
// ON the film (the reason the veil had to reach solid) is off it, in an
// espresso thesis line below the band; the old right-hand register is now a
// horizontal three-track ledger under that; the quote closes the section on
// its own drawn hairline.
//
// Two fixes fix the "too big / pixelated" complaint at once: the CROP is now
// baked into the encode (a 1440x640 crop of B-loop.mp4 at >=900, a
// 1080x1350 crop at <=899 -- see .planning/design/104b/operator.md), so the
// CSS zoom + filter pair that used to fake a square out of a 720x720 source
// is gone (deleted by the PASS-104B §1 commit, ahead of this one), and the
// band's height falls 44% (782.67 -> 440) while the picture's own area holds
// (+3.6%).
//
// `<source media="...">` is NOT honoured on `<video>` (PASS-104B fact 0.2),
// so the responsive pair is swapped by a tiny inline parse-time script,
// exactly the technique Room.tsx uses for the hero film: below 900px the
// 1080x1350 "tall" pair stands (same bytes as before this pass); at >=900 the
// script rewrites both `<source src>` to the 1440x640 "band" pair before the
// browser requests either, and calls `.load()`.
//
// The clip loops (b-loop.mp4 is a ping-pong encode) and does NOT autoplay:
// RoomMotion starts it once #opstage is >=35% visible, and pauses it off
// screen -- unchanged from Pass-101.
const OP_SOURCE_SWAP = `try{if(matchMedia('(min-width:900px)').matches){var v=document.getElementById('opvid');if(v){var s=v.getElementsByTagName('source');if(s[0])s[0].src='/video/b-band-1440.webm';if(s[1])s[1].src='/video/b-band-1440.mp4';v.poster='/video/b-band-poster.jpg';v.load();}}}catch(e){}`;

export function Operator() {
  return (
    <section
      className="op wrap"
      id="operator"
      aria-label="Operator, not consultant"
    >
      <div
        className="opband opstage"
        id="opstage"
        data-anim="0.85"
        data-rise="10"
      >
        <div className="opfilm" aria-hidden="true">
          {/* Below 900px this is the 1080x1350 "tall" crop (b-tall-1080),
              aimed at his face and the near hand (object-position 58% 42%).
              The swap script above rewrites it to the 1440x640 "band" crop
              (b-band-1440, object-position 50% 42%: the table, the papers,
              both hands and his face in three-quarter) at >=900. */}
          <video
            id="opvid"
            muted
            loop
            playsInline
            preload="none"
            poster="/video/b-tall-poster.jpg"
          >
            <source src="/video/b-tall-1080.webm" type="video/webm" />
            <source src="/video/b-tall-1080.mp4" type="video/mp4" />
          </video>
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: OP_SOURCE_SWAP }}
          />
          <div className="still" />
          <div className="veil" />
        </div>
        {/* ONE row at >=900 (the two spans read inline, one sentence); two
            rows at <=899 (§14.7's own mobile ladder). */}
        <h2 className="d two" id="oph2">
          <span className="r">Operator,</span>{" "}
          <span className="r">not consultant.</span>
        </h2>
      </div>

      {/* The one paragraph that used to sit ON the film -- the reason the
          veil had to reach solid (17px body needs 4.5:1; the heading is
          large text and needs only 3:1). Off the film, on espresso, and
          promoted to 28px -- the size the rest of the page's theses run at. */}
      <div className="opthesis">
        <p>
          I help you build it and sell it, on the same engagement, for the same
          fee.
        </p>
      </div>

      {/* The old two-column register, rotated: three tracks, one sentence
          each, the second (Ordani) promoted to its own track instead of
          being the middle clause of a paragraph -- the buyer jury's own
          finding, not any option's. Zero new copy: the three sentences are
          the existing `.opside .lead` spans, verbatim. */}
      <div className="opledger">
        <div className="opl-track">
          <p>
            I joined Postmates, SurveyMonkey, Guardicore (Akamai) and Neuton.AI
            early.
          </p>
        </div>
        <div className="opl-track">
          <p>
            I built Ordani solo with Claude Code and Cursor: HIPAA-compliant,
            active paying users, in beta.
          </p>
        </div>
        <div className="opl-track">
          <p>I am taking new engagements now.</p>
        </div>
      </div>

      <div className="opquote">
        <q>
          Micah does the work that most strategy decks promise and never
          deliver.
        </q>
        <span className="l meta">
          The author, name protected &#183; Receipt
        </span>
      </div>
    </section>
  );
}
