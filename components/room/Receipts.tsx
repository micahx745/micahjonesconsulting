// components/room/Receipts.tsx — section 05, the record.
//
// Pass-101 phase 2, recomposed by §18.
//
// §15.6 consolidated the index; §17 re-opened it to THREE rows. §18 recomposes
// the row itself: "row 72px, name cols 1-5 at 28px 100% ink, caption from
// x = 600 at 28px 60% ink (one size; rank by colour and column), the arrow in
// a 32px cell flush right ... The head carries the count. `See the rest →`
// stops being a row: a pill."
//
// THE COUNT. §18's draft wrote `07`, a number from the mock. The repo holds
// FOUR non-stub case studies and `See the rest` lands on the index that lists
// exactly those four, so the count is READ from lib/case-studies.ts — the same
// call /work makes — rather than printed as a literal nobody can check. A
// count is a fact and facts come from the live source (brief §0).
//
// §14.3 governs the captions: no years, no specific figures. Guardicore's
// "$14M in revenue" and the RFP engine's "$3M in contracts won" take the two
// permitted magnitude rewrites; the content engine's caption is its dek's own
// third sentence, which carries no figure at all and needed no rewrite.
//
// The industry author is never named — the case studies say "an industry
// author" and so does this index.
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";

export async function Receipts() {
  const count = (await getAllCaseStudies()).filter(
    (cs) => cs.status !== "stub",
  ).length;

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
          <span className="l count">{String(count).padStart(2, "0")}</span>
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
            money and fewer hours to produce
          </div>
          <span className="ar" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      </div>
      {/* §15.6: the one operator-supplied string on the page, in his own
          words, registered as such in both copy gates. §18 takes it out of the
          ledger — a way out is not a fourth receipt — and gives it the pill. */}
      <Link className="prfx" href="/work">
        <span className="who">See the rest</span>
        <span className="ar" aria-hidden="true">
          &#8594;
        </span>
      </Link>
    </section>
  );
}
