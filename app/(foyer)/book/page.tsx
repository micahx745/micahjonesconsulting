// app/(foyer)/book/page.tsx
//
// /book — self-hosted booking (Pass-18, replaces Calendly). 30-minute
// intro calls, Tue–Thu 10am–4pm Pacific. The form emails both parties
// a real calendar invite with reminders; no third-party scheduler.
//
// Pass-61 opening rebuild. Brief: .claude/briefs/pass-61-page-openings.md.
// Operator: "contact seems off too. needs to be more premium."
//
// It was the least designed page on the site: a mono kicker, the 92px section
// title, a dek, then the form — the same three elements /work, /services and
// /about all opened with. Now it opens on espresso, the site's closing and
// proof register, so arriving here from "Contact" reads as coming inside. Two
// columns: the offer stated plainly on the left, the form on the right. The
// title drops to the /playbook object-title scale, mixed case, because a 92px
// uppercase slab over a form is a shout before a handshake.
//
// DELIBERATELY NOT BUILT: the brief specified the slot picker as a printed
// railway timetable. That rewrites the date input and the time select, which
// are the operator-verified booking path ("booked and it worked — invite came
// through"). The submission contract is untouched here; the timetable is its
// own unit with its own verification, and it needs the calendar sync that is
// still queued before a grid can honestly imply availability.
import type { Metadata } from "next";
import { BookCallForm } from "@/components/color-worlds/BookCallForm";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Book a free intro call",
  description:
    "Book a free 30-minute intro call with Micah Jones. Tuesday through Thursday, 10am to 4pm Pacific. A calendar invite lands in your inbox.",
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/book",
  },
};

// The three things a person actually wants to know before giving up a slot.
const TERMS = [
  { k: "Cost", v: "Free" },
  { k: "Length", v: "Thirty minutes" },
  { k: "When", v: "Tue to Thu, 10am to 4pm Pacific" },
  { k: "After", v: "A calendar invite and a video link, by email" },
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
            No deck and no pitch. We name the shape of the work and whether I am
            the right person for it. If I am not, I say so on the call.
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
