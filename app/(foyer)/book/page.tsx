// app/(foyer)/book/page.tsx
//
// /book — self-hosted booking (Pass-18, replaces Calendly). 30-minute
// intro calls, Tue–Thu 10am–4pm Pacific. The form emails both parties
// a real calendar invite with reminders; no third-party scheduler.
import type { Metadata } from "next";
import { BookCallForm } from "@/components/color-worlds/BookCallForm";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a 30-minute intro call with Micah Jones. Tuesday through Thursday, 10am to 4pm Pacific. A calendar invite lands in your inbox.",
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/book",
  },
};

export default function BookPage() {
  return (
    <section
      className="cw-block"
      data-section
      data-world="bone"
      aria-labelledby="cw-book-title"
    >
      <p className="cw-kicker">Book a call</p>
      <h1 id="cw-book-title" className="cw-secttitle">
        Thirty minutes. Bring the problem.
      </h1>
      <p className="cw-sect-dek">
        Tuesday through Thursday, 10am to 4pm Pacific. Pick a slot and a
        calendar invite lands in your inbox, reminders included. I reply
        with a video link before the call.
      </p>
      <BookCallForm />
      <PageFooter />
    </section>
  );
}
