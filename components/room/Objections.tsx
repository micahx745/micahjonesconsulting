// components/room/Objections.tsx — section 07, the objections.
//
// Pass-101 phase 2. §15.3, after "the objections part still look bad": three
// equal columns in the price cards' own geometry — (content - 48)/3 on a 24px
// gap — each opening on a hairline. Question 24px Hanken 500, answer 17px at
// 80% ink. Stacked 40px apart at 390.
//
// §14.7 gives the head its terminal full stop.
export function Objections() {
  return (
    <section
      className="faq wrap"
      id="faq"
      data-anim="0.9"
      aria-label="The objections"
    >
      <div className="sec">
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
