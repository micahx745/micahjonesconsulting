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
import { BookPageBody } from "@/components/color-worlds/BookPageBody";

export const metadata: Metadata = {
  title: "Book a free intro call",
  description:
    "Thirty minutes, no deck, no pitch. Bring the problem; we name the shape of the work and whether I am the right person for it. Tue to Thu, Pacific.",
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/book",
  },
};

export default function BookPage() {
  return <BookPageBody />;
}
