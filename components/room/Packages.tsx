// components/room/Packages.tsx — section 04, packages and the top tier.
//
// Pass-101 phase 2. §15.5: three cards with a real ground, then Engagements as
// a full-width espresso block carrying the same 2px copper rule the Audit
// carries — connected to the packages by that rule, separated from them by its
// height. Never a fourth price slot.
//
// The three prices and the three chip labels are LIVE strings, read verbatim
// off app/(foyer)/packages/page.tsx (the BuyButton labels) — §14.7 names that
// page as the third verified copy source. The cards link to /packages; the buy
// flow itself is untouched and still lives there.
import Link from "next/link";

export function Packages() {
  return (
    <section
      className="price wrap"
      id="price"
      data-anim="0.9"
      aria-label="Packages"
    >
      <div className="sec">
        <div className="eyebrow">
          <span className="l">Fixed.</span>
        </div>
        <h2 className="d two" data-anim="0.85">
          Three fixed prices. Start this week.
        </h2>
      </div>
      <div className="cards" id="cards">
        <div className="card">
          <span className="nm">The Unstick Session</span>
          <div className="pblock">
            <span className="pr">$500</span>
          </div>
          <p className="one">Ninety minutes live on your stuck build.</p>
          <div className="cta">
            <Link className="chip" href="/packages">
              <span className="t">Buy the Unstick Session</span>
              <span className="a" aria-hidden="true">
                <span className="gl">&#8594;</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="card mark">
          <span className="nm">The Audit</span>
          <div className="pblock">
            <span className="pr">$2,500</span>
            <span className="l">Start here</span>
          </div>
          <p className="one">
            I go through it top to bottom and hand you the written audit.
          </p>
          <div className="cta">
            <Link className="chip" href="/packages">
              <span className="t">Buy the Audit</span>
              <span className="a" aria-hidden="true">
                <span className="gl">&#8594;</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="card">
          <span className="nm">The Sprint</span>
          <div className="pblock">
            <span className="pr">$7,500</span>
          </div>
          <p className="one">One week on one outcome, shipped.</p>
          <div className="cta">
            <Link className="chip" href="/packages">
              <span className="t">Buy the Sprint</span>
              <span className="a" aria-hidden="true">
                <span className="gl">&#8594;</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* §15.5: the top tier. ONE link, no link inside it. "Engagements" and
          the descriptor are the two halves of the freight template's own line,
          split at its separator; nothing is composed. */}
      <Link className="eng" id="ebar" href="/call">
        <span className="side l-side">
          <span className="d two hd">Engagements</span>
          <span className="dsc">advisory, project, retainer, or embedded.</span>
        </span>
        <span className="side r">
          <span className="v">From $5K a month</span>
          <span className="chip">
            <span className="t">Name the problem</span>
            <span className="a" aria-hidden="true">
              <span className="gl">&#8594;</span>
            </span>
          </span>
        </span>
      </Link>
    </section>
  );
}
