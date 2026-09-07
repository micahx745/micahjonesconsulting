// components/room/Manual.tsx — section 06, the field manual.
//
// Pass-101 phase 2. §15.2 recomposed the section after "For the book the image
// didnt load": the cover fills columns 1-5 at 4:5 inside the dashed frame with
// the file line under it, and every word moves to columns 6-12 — label, the
// display line at --d2 (never --d: at the poster size it out-shouted the hero),
// the three symptoms as a hairline ledger, the chapters paragraph, then the buy
// block.
//
// The cover is public/playbook/book-cover.png (1819x2572, ratio 0.707), the
// same file /playbook already serves. It goes through next/image so the 263KB
// PNG is not what a phone downloads; the frame's own CSS still decides the crop.
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
          <div className="frame" data-rise="10">
            <span className="cov">
              <Image
                src="/playbook/book-cover.png"
                alt="The 80% Wall, book cover"
                width={1819}
                height={2572}
                sizes="(max-width: 899px) 100vw, 40vw"
              />
            </span>
          </div>
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
              The AI handed you the code. Now ship the company.
            </h2>
          </div>
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
          <div className="buy">
            <div className="v">
              $99<span className="l">at launch</span>
            </div>
            <Link className="chip" href="/playbook">
              <span className="t">Get chapter one free</span>
              <span className="a" aria-hidden="true">
                <span className="gl">&#8594;</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
