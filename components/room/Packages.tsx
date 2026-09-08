// components/room/Packages.tsx — section 04, packages and the top tier.
//
// Pass-101 phase 2, recomposed by §18: "Packages + Engagements, one card
// system."
//
// §15.5 gave the three cards a real ground and marked the Audit with a 2px
// copper TOP rule; Engagements was a full-width espresso slab in a different
// box language — 16px radius, its name at --d2, its figure at 64px, a 220px
// floor. Both the section-by-section critique and the sweep of nine live 2026
// pages named that slab as one of the page's two boxes.
//
// §18: "The Audit carries exactly two devices: a 1px copper border on all four
// sides and an inline `Start here` pill on the name line; the 2px top rule is
// deleted. Engagements is the fourth object in the SAME system ... Special by
// ground, connected by grammar."
//
// So all four objects now share one grammar — name at 24px Hanken 500, a price
// slot, a sentence, ONE chip (Rule C) — and Engagements is set apart by its
// ground alone.
//
// The three prices and the three chip labels are LIVE strings, read verbatim
// off the packages page (the BuyButton labels). The cards link to /packages;
// the buy flow itself is untouched and still lives there.
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
          <span className="nmrow">
            <span className="nm">The Unstick Session</span>
          </span>
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
          {/* §18: the mark's second device, on the NAME line — not crammed
              against the $2,500 baseline, where it read as a stray caption. */}
          <span className="nmrow">
            <span className="nm">The Audit</span>
            <span className="tag">Start here</span>
          </span>
          <div className="pblock">
            <span className="pr">$2,500</span>
          </div>
          <p className="one">
            I go through it top to bottom and tell you what’s broken, in
            writing.
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
          <span className="nmrow">
            <span className="nm">The Sprint</span>
          </span>
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
      {/* §18: the fourth object in the same system. Name, price slot,
          sentence, one chip — the card's grammar on the top tier's ground.
          "Engagements" and the descriptor are still the two halves of the
          freight template's own line, split at its separator; nothing is
          composed. */}
      <Link className="eng" id="ebar" href="/call">
        <span className="side l-side">
          <span className="hd">Engagements</span>
          <span className="v">From $5K a month</span>
          <span className="dsc">advisory, project, retainer, or embedded.</span>
        </span>
        <span className="side r">
          <span className="chip">
            <span className="t">Get a reality check</span>
            <span className="a" aria-hidden="true">
              <span className="gl">&#8594;</span>
            </span>
          </span>
        </span>
      </Link>
    </section>
  );
}
