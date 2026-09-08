// app/(room)/call/page.tsx
//
// The free intro call for the ENGAGEMENTS lane, from $5K a month.
//
// HISTORY, because this page has moved twice in two days. Pass-82 retired it:
// the operator ruled booking sits behind the purchase, every CTA went to
// /contact, and /book 308'd there. On 2026-09-03 he reversed that FOR
// ENGAGEMENTS ONLY - "Booking replaces the contact form for engagements" - so
// the page is back and the redirect is gone. The packages lane keeps the
// Pass-82 shape: buy first, then /call/kickoff. /contact stays for everyone
// who just wants to write.
//
// Pass-98 moved this route from /book to /call, with a 308 behind it. "Book"
// on this site now means the manual at /playbook.
//
// The form and its submission contract are UNTOUCHED throughout, because that
// path is operator-verified ("booked and it worked - invite came through").
//
// PASS-101 PHASE 3 — restyled to Room and Ledger (brief §3: "/call keeps its
// form and logic, restyled"). The route moved from (foyer) to (room), same
// URL. <BookCallForm /> is imported and rendered exactly as before: no prop,
// no wrapper inside it, no change to a field, a name, or the action. It is
// restyled entirely through the cw- class names its own markup already carries
// (app/room-and-ledger.css §10b), so the operator-verified path is byte-for-
// byte the path that was verified.
//
// The four TERMS become the system's REGISTER — a key/value ledger on
// hairlines, which is the shape §14.2's operator column and §15.2's manual
// both use. Same four keys, same four values, same order.
import type { Metadata } from "next";
import { BookCallForm } from "@/components/color-worlds/BookCallForm";

export const metadata: Metadata = {
  title: "Book a free intro call",
  description:
    "Thirty minutes, no deck, no pitch. Bring the problem; I name the shape of the work and whether I am the right person for it. Tue to Thu, Pacific.",
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/call",
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
    <section className="rl-wrap rl-first" aria-labelledby="rl-book-title">
      <div className="rl-sec rl-sec--wide">
        <div className="rl-eyebrow">
          <span className="rl-l">The intro call</span>
        </div>
        {/* PASS-101 polish: --d2, not the poster --d (§14.4). At --d this head
            wrapped to three lines at 1440 (1183 / 737 / 678px). */}
        <h1 id="rl-book-title" className="rl-d two" data-rl="head">
          Thirty minutes. Bring the problem.
        </h1>
      </div>

      <div className="rl-two">
        <div className="rl-two__l">
          <p className="rl-lede" data-rl="rise">
            No deck and no pitch. Bring the problem, and this call is where the
            work starts. If you have notes, bring them. If not, I will ask.
          </p>
          <p className="rl-body rl-air-s" data-rl="rise">
            <strong>What you leave with:</strong> a diagnosis of what is stuck
            and what work would fix it. I also tell you whether you need me at
            all.
          </p>
          <dl className="rl-reg rl-air-m" data-rl-group="terms">
            {TERMS.map((t) => (
              <div key={t.k} data-rl="rule">
                <dt>{t.k}</dt>
                <dd>{t.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rl-two__r">
          {/* "Slots I hold open", not "available times": availability is
              confirmed by hand until the calendar sync ships, and a page
              should not imply a live calendar it does not have. */}
          <div className="rl-form" data-rl="rise">
            <p className="rl-l">Slots I hold open</p>
            <BookCallForm />
          </div>
        </div>
      </div>
    </section>
  );
}
