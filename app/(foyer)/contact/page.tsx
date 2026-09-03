// app/(foyer)/contact/page.tsx
//
// Pass-76. "Contact" in the nav pointed at /book, so the only way to reach
// Micah was to pick a date and a time slot. Operator: contact should be
// "just like send me a note that will get routed to my email".
//
// The booking system is not deleted — it moves to where a scheduled call is
// actually the right next step, which is after somebody has paid. See
// /services/thanks.
//
// Espresso, matching /book's register, so arriving from the nav still reads as
// coming inside rather than landing on a form page.
import type { Metadata } from "next";

import { ContactNoteForm } from "@/components/color-worlds/ContactNoteForm";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a note about what you are working on. It goes straight to my inbox and I answer from there, usually within one business day.",
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <OpeningWorld name="espresso" />
      <section
        className="cw-bk"
        data-section
        data-world="espresso"
        aria-labelledby="cw-contact-title"
      >
        <div className="cw-bk__offer">
          <h1 id="cw-contact-title" className="cw-bk__title">
            Tell me what you are working on.
          </h1>
          <p className="cw-bk__dek">
            Three fields and no calendar. Write what is in front of you: what is
            stuck, what you have tried, and when it needs to move. Send it.
          </p>
          {/* The operator asked for no explanation of the plumbing, so this
              says what the reader gets back rather than how it is routed. */}
          <p className="cw-bk__leave">
            <strong>What you get back:</strong> a straight answer, usually
            within one business day. If what you need is not something I do, I
            will say so and point you at someone better.
          </p>
        </div>

        <div className="cw-bk__form">
          <p className="cw-bk__form-label">A note</p>
          <ContactNoteForm />
        </div>
      </section>

      <section className="cw-block cw-bk__foot" data-section data-world="bone">
        <PageFooter />
      </section>
    </>
  );
}
