// components/room/Ask.tsx — section 08, the ask.
//
// Pass-101 phase 2. The copper field, the second and last thing on the page set
// at --d (the hero is the first). §16.3-8: the headline rises 30px and the
// arrow slides in from the left, both 600ms, as the field enters; the chips
// follow 120ms later.
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
            <span className="ar" aria-hidden="true">
              &#8594;
            </span>
          </Link>
        </h2>
        <div className="chips">
          <Link className="chip" href="/call">
            <span className="t">Book a free intro call</span>
            <span className="a" aria-hidden="true">
              <span className="gl">&#8594;</span>
            </span>
          </Link>
          <Link className="chip quiet" href="/packages">
            <span className="t">See the packages</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
