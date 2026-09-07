// components/room/Objections.tsx — section 07, the objections.
//
// Pass-101 phase 2, recomposed by §18.
//
// §15.3 put three equal columns in the price cards' geometry after "the
// objections part still look bad". The critique measured what that actually
// produced: three ragged feet ending at three different heights, under a head
// that sat alone on two lines with the entire right half of the band empty.
//
// §18: "Eyebrow `Objections` (label style) 20px above the head at --d2. Then
// TWO columns: the head stays in cols 1-5, the list is ONE column from
// x = 600 ... Rows close on their own hairlines; no ragged feet."
//
// `Objections` already exists as a string (§18's copy note); nothing new is
// written. §14.7 gives the head its terminal full stop.
export function Objections() {
  return (
    <section
      className="faq wrap"
      id="faq"
      data-anim="0.9"
      aria-label="The objections"
    >
      <div className="sec">
        <div className="eyebrow">
          <span className="l">Objections</span>
        </div>
        <h2 className="d two" data-anim="0.85">
          The objections, in your words.
        </h2>
      </div>
      <dl className="qs">
        <div className="q">
          <dt>Is this for me, if I vibe-coded it?</dt>
          <dd>
            You built something real with Cursor, Claude Code, Lovable, v0 or
            Bolt. It works. Nobody is using it yet, or the next change keeps
            breaking it. Then yes.
          </dd>
        </div>
        <div className="q">
          <dt>What if it does not help?</dt>
          <dd>
            Thirty days, full refund, no questions asked. Reply to the delivery
            email and I refund it.
          </dd>
        </div>
        <div className="q">
          <dt>Hiring for a company rather than a build?</dt>
          <dd>
            The engagements start at $5K a month. Tell me the problem and I will
            scope it.
          </dd>
        </div>
      </dl>
    </section>
  );
}
