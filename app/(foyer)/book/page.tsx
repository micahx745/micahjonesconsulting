// app/(foyer)/book/page.tsx
//
// The free intro call for the ENGAGEMENTS lane, from $5K a month.
//
// HISTORY, because this page has moved twice in two days. Pass-82 retired it:
// the operator ruled booking sits behind the purchase, every CTA went to
// /contact, and /book 308'd there. On 2026-09-03 he reversed that FOR
// ENGAGEMENTS ONLY - "Booking replaces the contact form for engagements" - so
// the page is back and the redirect is gone. The packages lane keeps the
// Pass-82 shape: buy first, then /book/kickoff. /contact stays for everyone
// who just wants to write.
//
// The form and its submission contract are UNTOUCHED throughout, because that
// path is operator-verified ("booked and it worked - invite came through").
import type { Metadata } from "next";
import { BookCallForm } from "@/components/color-worlds/BookCallForm";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Book a free intro call",
  description:
    "Thirty minutes, no deck, no pitch. Bring the problem; I name the shape of the work and whether I am the right person for it. Tue to Thu, Pacific.",
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/book",
  },
};

const TERMS = [
  { k: "Cost", v: "Free" },
  { k: "Length", v: "Thirty minutes" },
  { k: "When", v: "Tue to Thu, 10am to 4pm Pacific" },
  {
    k: "After",
    v: "A calendar invite by email. The video link comes from me before the call.",
  },
];

export default function BookPage() {
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
            Thirty minutes. Bring the problem.
          </h1>
          <p className="cw-bk__dek">
            No deck and no pitch. Bring the problem, and this call is where the
            work starts. If you have notes, bring them. If not, I will ask.
          </p>
          <p className="cw-bk__leave">
            <strong>What you leave with:</strong> a named diagnosis of what is
            stuck, the shape of the work that would fix it, and a straight
            answer on whether you need me at all.
          </p>
          <dl className="cw-bk__terms">
            {TERMS.map((t) => (
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
