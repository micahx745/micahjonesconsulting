// app/(room)/call/kickoff/page.tsx
//
// The kickoff call a PACKAGE BUYER has already paid for. Reached from
// /services/thanks and from the package delivery email.
//
// Pass-82: this is now the ONLY booking page. The operator ruled 2026-09-02
// that booking sits behind the purchase everywhere; the free-intro-call page
// came back for engagements on 2026-09-03. Someone who has not bought anything
// writes a note or books an intro call; someone who has, books here.
//
// Pass-98: this route was /book/kickoff. Both booking routes moved to /call so
// the word "book" means the 69-page manual at /playbook and nothing else. The
// old paths 308 (next.config.ts) because they are printed in delivery emails
// that are already in people's inboxes.
//
// noindex: post-purchase page. It should never surface in a search result
// offering a "kickoff call" to a stranger. The render-gate skips META limits
// on noindex pages by design.
//
// The form and its submission contract are UNTOUCHED and must stay that way:
// that path is operator-verified ("booked and it worked - invite came through").
//
// PASS-101 PHASE 3 — restyled with /call, which it shares a shape with. Same
// URL, same <BookCallForm /> call, same five terms in the same order; the
// terms take the system's register and the form is restyled through the class
// names its own markup already carries. Nothing in the submission path moved.
import type { Metadata } from "next";
import { BookCallForm } from "@/components/color-worlds/BookCallForm";

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
    canonical: "https://www.micahjonesconsulting.com/call/kickoff",
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
    <section className="rl-wrap rl-first" aria-labelledby="rl-kickoff-title">
      <div className="rl-sec rl-sec--wide">
        <div className="rl-eyebrow">
          <span className="rl-l">The kickoff call</span>
        </div>
        <h1 id="rl-kickoff-title" className="rl-d" data-rl="head">
          Thirty minutes. The work starts here.
        </h1>
      </div>

      <div className="rl-two">
        <div className="rl-two__l">
          <p className="rl-lede" data-rl="rise">
            No deck and no pitch. You have paid, so this call is where the work
            starts. Bring your intake answers if you have them. If not, bring
            the problem and I will ask.
          </p>
          <p className="rl-body rl-air-s" data-rl="rise">
            <strong>What you leave with:</strong> the first deliverable named,
            the date it lands, and what I need from you before then.
          </p>
          <dl className="rl-reg rl-air-m" data-rl-group="terms">
            {KICKOFF_TERMS.map((t) => (
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
