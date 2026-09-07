// components/room/Receipts.tsx — section 05, the record.
//
// Pass-101 phase 2. §15.6 consolidated the index to two rows and a way out.
// §17 (operator, 2026-09-06, verbatim: "receipts - we should add the content ai
// part to the list so we have three") re-opens it to THREE, and that ruling
// names this pass: "Binds v7 and Pass 101." The geometry, the hairlines and the
// row-shaped `See the rest` link are the verified template's; only the count
// moved, and the third row's name and caption are read verbatim off
// content/work/content-engine.mdx, which is one of the gate's verified sources.
//
// §14.3 governs the captions: no years, no specific figures. Guardicore's
// "$14M in revenue" and the RFP engine's "$3M in contracts won" take the two
// permitted magnitude rewrites; the content engine's caption is its dek's own
// third sentence, which carries no figure at all and needed no rewrite.
//
// The industry author is never named — the case studies say "an industry
// author" and so does this index.
import Link from "next/link";

export function Receipts() {
  return (
    <section
      className="proofsec wrap"
      id="proof"
      data-anim="0.9"
      aria-label="The record"
    >
      <div className="sec">
        <div className="eyebrow">
          <span className="l">Record</span>
        </div>
        <h2 className="d two" data-anim="0.85">
          The receipts. Every line below is real.
        </h2>
      </div>
      <div className="ledger">
        <Link className="prf" href="/work/guardicore">
          <div className="who">Guardicore</div>
          <div className="cap">
            Millions in revenue &#183; acquired by Akamai
          </div>
          <span className="ar" aria-hidden="true">
            &#8594;
          </span>
        </Link>
        <Link className="prf" href="/work/rfp-engine">
          <div className="who">RFP engine for an industry author</div>
          <div className="cap">
            Millions in contracts won &#183; close rate doubled
          </div>
          <span className="ar" aria-hidden="true">
            &#8594;
          </span>
        </Link>
        <Link className="prf" href="/work/content-engine">
          <div className="who">AI content engine for an industry author</div>
          <div className="cap">
            Videos, blogs, newsletters, and digital events cost the author less
            money and fewer hours to produce.
          </div>
          <span className="ar" aria-hidden="true">
            &#8594;
          </span>
        </Link>
        {/* §15.6: the one operator-supplied string on the page, in his own
            words, registered as such in both copy gates. */}
        <Link className="prfx" href="/work">
          <div className="who">See the rest</div>
          <span className="ar" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      </div>
    </section>
  );
}
