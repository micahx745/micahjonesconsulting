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
// written on the head. §14.7 gives the head its terminal full stop.
//
// PASS-104B §6, operator-approved 2026-09-08: "Three rows: keep one, add both
// new." The two new rows replace the retired "Hiring for a company rather
// than a build?" row (it duplicated the Engagements block two sections up);
// the AI-tools row is kept, unchanged, and moves to the third slot. The
// register restores §14.4's own ruling (28px/19px, up from the §18 recompose's
// 24/17) and the section gains its one destination: a Rule C chip, verbatim
// from Ask.tsx, pinned to the list's last hairline by the flex column below.
import Link from "next/link";

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
          <dt>
            I built it with Claude Code and it works. Now I cannot change one
            thing without rewriting half of it.
          </dt>
          <dd>
            The tool does not change the work. I read the build top to bottom
            and write down what is load bearing, what is broken, and what to
            fix first. That is the Audit, $2,500.
          </dd>
        </div>
        <div className="q">
          <dt>
            Last time I paid for help, it took so much back and forth that I
            did most of it myself.
          </dt>
          <dd>
            One person reads it, writes it and ships it, and that person is
            me. No account manager, no status meeting, no brief for you to
            write.
          </dd>
        </div>
        <div className="q">
          <dt>Is this for me if I built it with AI coding tools?</dt>
          <dd>
            You built something real with Cursor, Claude Code, Lovable, v0 or
            Bolt. It works. Nobody is using it yet, or the next change keeps
            breaking it. Then yes.
          </dd>
        </div>
      </dl>
      <div className="doorchip">
        <Link className="chip" href="/call">
          <span className="t">Book a free intro call</span>
          <span className="a" aria-hidden="true">
            <span className="gl">&#8594;</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
