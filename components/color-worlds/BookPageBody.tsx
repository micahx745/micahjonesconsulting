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
// ---------------------------------------------------------------------------
// Pass-78. This body is shared by TWO routes:
//   /book          intro mode  — the free 30-minute call, the $5K+ lane
//   /book/kickoff  kickoff mode — the call a PACKAGE BUYER has already paid for
//
// Why a second ROUTE and not `?kickoff=1`: reading searchParams opts a page
// into dynamic rendering, so /book would stop emitting a .html file into
// .next/server/app. scripts/render-gate.mjs builds its route map from exactly
// those files, so all six internal links to /book would have started failing
// as "no such route" and broken the build. A static sibling route keeps the
// gate honest and gives the kickoff its own <title>.
//
// Why it exists at all: Pass-76 moved booking behind the purchase and pointed
// /services/thanks and the package email at /book, but /book never learned. A
// buyer who had just paid $500 to $7,500 clicked "Put the kickoff call on my
// calendar now" and landed on a tab reading "Book a free intro call", a Cost
// row reading "Free", and a dek offering to decide "whether I am the right
// person for it" — a question they had already answered with a card. That is
// the moment a refund gets requested.
//
// The form and its submission contract are UNTOUCHED in both modes: that path
// is operator-verified ("booked and it worked — invite came through").
import { BookCallForm } from "@/components/color-worlds/BookCallForm";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

const INTRO_TERMS = [
  { k: "Cost", v: "Free" },
  { k: "Length", v: "Thirty minutes" },
  { k: "When", v: "Tue to Thu, 10am to 4pm Pacific" },
  { k: "After", v: "A calendar invite and a video link, by email" },
];

// "Included with your package", never "Free": they paid. The refund line is
// the one already live on /packages, /services/thanks and in the kickoff
// email ("full refund any time before the kickoff, none after"), stated here
// because this page is the boundary it turns on.
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

export function BookPageBody({ kickoff = false }: { kickoff?: boolean }) {
  const terms = kickoff ? KICKOFF_TERMS : INTRO_TERMS;
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
            {kickoff
              ? "Thirty minutes. The work starts here."
              : "Thirty minutes. Bring the problem."}
          </h1>
          <p className="cw-bk__dek">
            {kickoff
              ? "No deck and no pitch. You have paid, so this call is where the work starts. Bring your intake answers if you have them. If not, bring the problem and I will ask."
              : "No deck and no pitch. We name the shape of the work and whether I am the right person for it. If I am not, I say so on the call."}
          </p>
          <p className="cw-bk__leave">
            <strong>What you leave with:</strong>{" "}
            {kickoff
              ? "the first deliverable named, the date it lands, and what I need from you before then."
              : "a named diagnosis of the gap, the shape of the work that closes it, and a straight answer on whether you need me at all."}
          </p>
          <dl className="cw-bk__terms">
            {terms.map((t) => (
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
