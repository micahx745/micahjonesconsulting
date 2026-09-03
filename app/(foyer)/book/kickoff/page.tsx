// app/(foyer)/book/kickoff/page.tsx
//
// The kickoff call a PACKAGE BUYER has already paid for. Reached from
// /services/thanks and from the package delivery email.
//
// Pass-82: this is now the ONLY booking page. The operator ruled 2026-09-02
// that booking sits behind the purchase everywhere, so the free-intro-call
// page at /book is retired and 301s to /contact (next.config.ts). Someone who
// has not bought anything writes a note; someone who has, books here.
//
// noindex: post-purchase page. It should never surface in a search result
// offering a "kickoff call" to a stranger. The render-gate skips META limits
// on noindex pages by design.
//
// The form and its submission contract are UNTOUCHED and must stay that way:
// that path is operator-verified ("booked and it worked - invite came through").
import type { Metadata } from "next";
import { BookCallForm } from "@/components/color-worlds/BookCallForm";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

// "Included with your package", never "Free": they paid. The refund line is
// the one already live on /packages, /services/thanks and in the kickoff
// email ("full refund any time before the kickoff, none after"), stated here
// because this page is the boundary it turns on.

export const metadata: Metadata = {
  title: "Book the kickoff call",
  description:
    "Put the kickoff call for your package on the calendar. Thirty minutes, Tue to Thu, Pacific.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/book/kickoff",
  },
};

const KICKOFF_TERMS = [
  { k: "Cost", v: "Included with your package" },
  { k: "Length", v: "Thirty minutes" },
  { k: "When", v: "Tue to Thu, 10am to 4pm Pacific" },
  {
    k: "After",
    v: "A calendar invite by email now. The video link comes from me before the call.",
  },
  { k: "Refund", v: "Full refund any time before this call, none after." },
];

export default function BookKickoffPage() {
  return (
    <>
      <OpeningWorld name="espresso" />
      <section
        className="cw-bk"
        data-section
        data-world="espresso"
        aria-labelledby="cw-book-title"
      >
        <div className="cw-bk__offer">
          <h1 id="cw-book-title" className="cw-bk__title">
            Thirty minutes. The work starts here.
          </h1>
          <p className="cw-bk__dek">
            No deck and no pitch. You have paid, so this call is where the work
            starts. Bring your intake answers if you have them. If not, bring
            the problem and I will ask.
          </p>
          <p className="cw-bk__leave">
            <strong>What you leave with:</strong> the first deliverable named,
            the date it lands, and what I need from you before then.
          </p>
          <dl className="cw-bk__terms">
            {KICKOFF_TERMS.map((t) => (
              <div key={t.k}>
                <dt>{t.k}</dt>
                <dd>{t.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="cw-bk__form">
          {/* "Slots I hold open", not "available times": availability is
              confirmed by hand until the calendar sync ships, and a page
              should not imply a live calendar it does not have. */}
          <p className="cw-bk__form-label">Slots I hold open</p>
          <BookCallForm />
        </div>
      </section>

      <section className="cw-block cw-bk__foot" data-section data-world="bone">
        <PageFooter />
      </section>
    </>
  );
}
