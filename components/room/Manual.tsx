// components/room/Manual.tsx — section 06, the field manual.
//
// Pass-101 phase 2, recomposed by §18.
//
// RULE A, page-wide: "the border goes on the list, never on the picture. No
// frame around any photograph or cover." The dashed 1px frame around the cover
// and its 16px of padding are deleted. Both the section-by-section critique
// and the sweep of nine live 2026 pages named that frame as one of the page's
// two boxes.
//
// Then the section, per §18: cover alone in cols 1-5 at 4:5 with an 8px
// radius, the file line under it as a caption; the right column on one measure
// from the seam — eyebrow `The 80% Wall`, head `The 80% Wall.` at --d2 on one
// line, the display sentence DEMOTED to a 28px lede, the three symptoms as the
// hairline ledger, the chapters paragraph at 19px, then a buy LEDGER.
//
// WHY THE DISPLAY LINE MOVES. `The AI handed you the code. Now ship the
// company.` was set at --d2 across three lines mid-page and measured as the
// loudest thing on the site — louder than `go-to-market.`, the one line the
// whole composition exists to deliver. §6 allows exactly two things at poster
// scale: the hero and the ask.
//
// The buy ledger is Stripe Press's shape and the section's ONLY border. Its
// three rows carry the same live strings the old buy block carried, in
// label-value pairs: the free-chapter link, the price and its qualifier, and
// the delivery line split at its own middot.
//
// The cover is public/playbook/book-cover.png (1819x2572), the same file
// /playbook already serves, through next/image so the 263KB PNG is not what a
// phone downloads.
//
// The $99 is a PRICE, not a receipt, so §14.3's no-figures rule does not touch
// it. PLAYBOOK_ON_SALE and the buy flow are untouched and stay on /playbook.
import Image from "next/image";
import Link from "next/link";

export function Manual() {
  return (
    <section
      className="manual wrap"
      id="manual"
      data-anim="0.9"
      aria-label="The field manual"
    >
      <div className="grid">
        <figure className="art">
          <span className="cov" data-rise="10">
            <Image
              src="/playbook/book-cover.png"
              alt="The 80% Wall, book cover"
              width={1819}
              height={2572}
              sizes="(max-width: 899px) 100vw, 40vw"
            />
          </span>
          <figcaption>
            <span className="l meta">the-80-percent-wall.pdf</span>
            <span className="l meta">
              PDF + ZIP &#183; every future edition
            </span>
          </figcaption>
        </figure>
        <div className="copy">
          <div className="sec">
            <div className="eyebrow">
              <span className="l">The 80% Wall</span>
            </div>
            <h2 className="d two" data-anim="0.85">
              The 80% Wall.
            </h2>
          </div>
          <p className="lede">
            The AI handed you the code. Now ship the company.
          </p>
          <div className="lines">
            <p>It shipped. Nobody came.</p>
            <p>
              The demo looked done. Production turned out to be a different
              machine entirely.
            </p>
            <p>
              You kept running into the same thing. Fixed Tuesday, broken
              Friday, because the tool forgot.
            </p>
          </div>
          <p className="body">
            Ten chapters on what the AI leaves to you: the first ten users,
            auth, deploys, payments, compliance. Every chapter ends in a
            pre-flight card you run the same night.
          </p>
          <div className="buyledger">
            <Link className="brow" href="/playbook">
              <span className="lab">Get chapter one free</span>
              <span className="val" />
              <span className="cell" aria-hidden="true">
                &#8594;
              </span>
            </Link>
            <div className="brow">
              <span className="lab">$99</span>
              <span className="val">at launch</span>
              <span className="cell" aria-hidden="true" />
            </div>
            <div className="brow">
              <span className="lab">PDF + ZIP</span>
              <span className="val">every future edition</span>
              <span className="cell" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
