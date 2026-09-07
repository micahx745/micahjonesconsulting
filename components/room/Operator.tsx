// components/room/Operator.tsx — section 02, operator not consultant.
//
// Pass-101 phase 2. §14.2: clip B is a SQUARE stage in the left seven columns,
// the heading sits OVER its lower third on a veil, the first paragraph directly
// under the heading still on the film, and the argument's second half sits in
// the right five columns as a register of three rows (§14.7).
//
// At <=899px the film is a full-width square, the heading is over its lower
// third, and the paragraph that sits on the film above is hidden and repeated
// under it (.m-first) so the phone gets the same sentence in a readable place.
//
// The clip loops (it is a ping-pong encode, so neither end shows a cut) and it
// does NOT autoplay: RoomMotion starts it when the square is >= 35% visible.
export function Operator() {
  return (
    <section
      className="op wrap"
      id="operator"
      aria-label="Operator, not consultant"
    >
      <div className="opgrid">
        <div className="opstage" id="opstage" data-anim="0.85" data-rise="10">
          <div className="opfilm" aria-hidden="true">
            <video
              id="opvid"
              muted
              loop
              playsInline
              preload="auto"
              poster="/video/b-poster.jpg"
            >
              <source src="/video/b-loop-720.webm" type="video/webm" />
              <source src="/video/b-loop-720.mp4" type="video/mp4" />
            </video>
            <div className="still" />
            <div className="veil" />
          </div>
          <div className="opover" id="opover">
            <h2 className="d two" id="oph2">
              <span className="r">Operator,</span>
              <span className="r">not consultant.</span>
            </h2>
            <p>
              Most consultants don&#8217;t ship. Most builders don&#8217;t sell.
              I do both, on the same engagement, for the same fee.
            </p>
          </div>
        </div>
        <div className="opside">
          <p className="m-first">
            Most consultants don&#8217;t ship. Most builders don&#8217;t sell. I
            do both, on the same engagement, for the same fee.
          </p>
          <p className="lead">
            <span>
              I joined Postmates, SurveyMonkey, Guardicore (Akamai) and
              Neuton.AI early.
            </span>{" "}
            <span>
              I built Ordani solo with Claude Code and Cursor: HIPAA-compliant,
              active paying users, in beta.
            </span>{" "}
            <span>I am taking new engagements now.</span>
          </p>
          <div className="sig">
            <q>
              Micah does the work that most strategy decks promise and never
              deliver.
            </q>
            <span className="l meta">
              The author, name protected &#183; Receipt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
