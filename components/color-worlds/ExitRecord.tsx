// components/color-worlds/ExitRecord.tsx
//
// THE EXIT RECORD — Pass-106.
//
// What it replaces and why. The ledger carried a single summary row reading
// "Four exits · Disclosed value only → $5B+ combined". Both independent reviews
// of this site said the same thing about that treatment, in different words: a
// number asserted on its own reads as a BADGE, and the same number cashed out
// into named outcomes reads as a TRACK RECORD. Astra: "a single number floating
// alone reads as a badge; the same number attached to four named outcomes reads
// as a track record. Attach, don't assert."
//
// The operator's own framing of the job: "$5 billion in exits is a huge signal
// that I can be trusted." So the object's purpose is TRUST, not decoration —
// which is why it is not a picture. A photograph of a sign saying $5B+ is a
// boast about oneself; a record a stranger can check is evidence. The site
// already owns the strongest version of that move in its own words, one line
// below: "Ask about any of them."
//
// THE ARITHMETIC IS THE POINT. Four deals, each with its counterparty, its year
// and its disclosed figure, then a rule, then the sum — and then the fact that
// makes it credible rather than impressive: the disclosed deals total $5.58B
// and the site claims $5B+. Micah rounds DOWN. That under-claim was invisible
// before this component; it is the single most trust-building detail in the
// whole record and it was sitting unused in content/citations.ts.
//
// NOTHING HERE IS A LITERAL. Every company, counterparty, year and figure is
// read from CITATIONS.EXITS_COMBINED_VALUE, whose quotedStatistics carry the
// SEC filing and acquirer press release behind each number (Pitfall E2: numbers
// render from the citation object, never as literals in prose). Neuton.AI's
// price was never made public, so its `value` is null, it prints "Undisclosed"
// rather than a figure, and it contributes zero to the sum. Declining to pad
// the one deal nobody can check is itself part of the signal.
//
// MOTION. The columns rise and fade in sequence, the rule draws left to right,
// the total resolves last — so a reader watches the record assemble rather than
// meeting a finished claim. Transform and opacity only, the house curve, runs
// once and terminates, every rest state is the finished frame, and the whole
// set is inert under prefers-reduced-motion. It rides the site's existing
// .cw-reveal system rather than adding a second mechanism, so with scripting
// off the finished frame is what renders.
//
// Server Component. No client JS of its own.
import { CITATIONS } from "@/content/citations";

const EXITS = CITATIONS.EXITS_COMBINED_VALUE;

export function ExitRecord() {
  return (
    <section className="cw-exits" aria-labelledby="cw-exits-title">
      <h3 className="cw-exits__title" id="cw-exits-title">
        Four exits, in the open
      </h3>

      <ol className="cw-exits__row" role="list">
        {EXITS.DEALS.map((d, i) => (
          <li
            key={d.company}
            className="cw-exits__deal cw-reveal"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <p className="cw-exits__year">{d.year}</p>
            <p className="cw-exits__co">{d.company}</p>
            <p className="cw-exits__ev">
              {d.event} {d.counterparty}
            </p>
            <p
              className={
                d.value
                  ? "cw-exits__val"
                  : "cw-exits__val cw-exits__val--undisclosed"
              }
            >
              {d.value ?? "Undisclosed"}
            </p>
            <p className="cw-exits__note">{d.note}</p>
          </li>
        ))}
      </ol>

      <div className="cw-exits__rule cw-reveal" aria-hidden />

      {/* The sum, and then the under-claim. Reading order matters: a buyer sees
          what the deals actually add to BEFORE they see the smaller number the
          site is willing to put its name to. */}
      <dl
        className="cw-exits__sum cw-reveal"
        style={{ transitionDelay: "420ms" }}
      >
        <div className="cw-exits__sumrow">
          <dt>Disclosed total</dt>
          <dd className="cw-exits__total">{EXITS.DISCLOSED_TOTAL}</dd>
        </div>
        <div className="cw-exits__sumrow cw-exits__sumrow--claim">
          <dt>Stated on this site</dt>
          {/* No em-dash here. The page's cap is ONE and the nav's "Menu —
              Close" already spends it; render-gate failed this build until the
              dash became a comma. */}
          <dd>
            {EXITS.CLAIMED_FLOOR}
            <span>, the conservative floor</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
