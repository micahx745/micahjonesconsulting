// components/room/Ask.tsx — section 08, the ask.
//
// Pass-101 phase 2, recomposed by §18.
//
// The copper field, the second and last thing on the page set at --d (the hero
// is the first). §18: "min-height 0, padding 120px; the field is its content.
// The floating 56px arrow is deleted; the chips carry the arrow. The reply
// promise leaves the foot and sits right-aligned in the field's right third at
// 19px espresso, max 26ch, baseline-aligned to the headline's last line."
//
// The 720px floor left ~280px of dead copper under the chips with the whole
// right half of the field empty, and the floating glyph was a third arrow
// language on a page where every chip already carries one.
//
// The reply promise is a live string; it MOVED here from the foot, it was not
// written here.
//
// §16.3-8 still governs the entrance: the headline rises 30px over 600ms as
// the field enters, the promise rides with it, and the chips follow 120ms
// later — now sliding in from the left, which is where the deleted arrow's
// half of that item goes.
import Link from "next/link";

export function Ask() {
  return (
    <section
      className="ask wrap"
      id="contact"
      data-anim="0.9"
      aria-label="Name the problem"
    >
      <div className="block">
        <h2 className="d">
          <Link id="asklink" href="/call">
            Name the problem.
          </Link>
        </h2>
        <p className="promise">
          I read every message and reply inside one business day.
        </p>
        <div className="chips">
          <Link className="chip" href="/call">
            <span className="t">Book a free intro call</span>
            <span className="a" aria-hidden="true">
              <span className="gl">&#8594;</span>
            </span>
          </Link>
          <Link className="chip quiet" href="/packages">
            <span className="t">See the packages</span>
            <span className="a" aria-hidden="true">
              <span className="gl">&#8594;</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
