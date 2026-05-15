// app/(foyer)/work-with-me/page.tsx
//
// Phase 6 — FOYER-06.
//
// Three stacked engagement cards per blueprint §7:
//   01 STRATEGY SPRINT — 2–4 weeks, one deliverable
//   02 EMBED — 8–12 weeks, fractional, two days/week
//   03 BUILD — custom Next.js + Supabase
//
// Plus four-question FAQ per blueprint §7 + answers drafted within the
// scope the orchestrator prompt explicitly granted.
//
// All copy scanned against lib/banned.ts; zero banned-word hits. The
// engagement card copy is adapted from the orchestrator prompt's
// §"Engagement cards copy" block; the original Embed card said "X partner"
// where X is the s-word for "answers to problems" — rephrased to
// "consulting partner" (X is on the banned list at lib/banned.ts:41).
//
// Source: blueprint §7 (Work With Me wireframe + four FAQ questions);
//         REQUIREMENTS.md FOYER-06; orchestrator prompt §"Engagement cards
//         copy" + §"FAQ questions".
import type { Metadata } from "next";
import { ViewTransitionLink } from "@/components/view-transition-link";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js).",
  openGraph: {
    title: "Work with me — Micah Jones",
    description:
      "Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js).",
    type: "website",
    url: "https://micahjonesconsulting.com/work-with-me",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work with me — Micah Jones",
    description:
      "Three engagement shapes for shipping work: Strategy Sprint (two to four weeks), Embed (eight to twelve weeks), Build (custom Next.js).",
  },
};

export default function WorkWithMePage() {
  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--wwm-hero">
        <h1 className="foyer-hero foyer-hero--secondary">
          Three ways to work. One of them probably fits.
        </h1>
      </section>

      {/* ENGAGEMENT CARDS — stacked, not gridded */}
      <section className="foyer-section foyer-section--engagement">
        <ul className="engagement-stack">
          <li className="engagement-card">
            <div className="engagement-card__head">
              <span className="engagement-card__num">01</span>
              <h2 className="engagement-card__name">Strategy Sprint</h2>
              <span className="engagement-card__meta">2–4 weeks · one deliverable</span>
            </div>
            <p className="engagement-card__body">
              Two to four weeks. One deliverable. Positioning, growth audit, or launch plan.
              Best for solo operators who need a second brain for a fortnight.
            </p>
          </li>
          <li className="engagement-card">
            <div className="engagement-card__head">
              <span className="engagement-card__num">02</span>
              <h2 className="engagement-card__name">Embed</h2>
              <span className="engagement-card__meta">8–12 weeks · two days a week</span>
            </div>
            <p className="engagement-card__body">
              Eight to twelve weeks. I sit inside the team as a fractional PM, growth, or
              consulting partner. Two days a week. Best for three to ten person teams.
            </p>
          </li>
          <li className="engagement-card">
            <div className="engagement-card__head">
              <span className="engagement-card__num">03</span>
              <h2 className="engagement-card__name">Build</h2>
              <span className="engagement-card__meta">custom scope</span>
            </div>
            <p className="engagement-card__body">
              Custom scope. I design and build the thing — usually a CRM, intake system, or
              onboarding flow. Next.js, Supabase, Vercel.
            </p>
          </li>
        </ul>
      </section>

      {/* FAQ — four questions per blueprint §7 */}
      <section className="foyer-section foyer-section--faq">
        <h2 className="foyer-eyebrow">FAQ</h2>
        <dl className="faq-list">
          <div className="faq-list__pair">
            <dt className="faq-list__q">How much do you charge?</dt>
            <dd className="faq-list__a">
              Strategy Sprints start in the low five figures. Embeds and Builds get a fixed
              monthly rate after a free 30-minute scoping call. No retainers without scope.
            </dd>
          </div>
          <div className="faq-list__pair">
            <dt className="faq-list__q">Do you take equity?</dt>
            <dd className="faq-list__a">
              Sometimes, for a portion of fee. Cash first, then a small grant if the company
              is one I would have invested in. Never the whole bill.
            </dd>
          </div>
          <div className="faq-list__pair">
            <dt className="faq-list__q">Will you sign an NDA before talking?</dt>
            <dd className="faq-list__a">
              Yes. Send it. A one-page mutual NDA gets signed inside the day. I keep client
              names confidential by default; the case studies on this site name only what the
              client has approved.
            </dd>
          </div>
          <div className="faq-list__pair">
            <dt className="faq-list__q">What if I am not technical?</dt>
            <dd className="faq-list__a">
              Most of my best clients are not technical. I translate between operator
              instinct and engineering reality. You bring the problem; I write the brief and
              ship the work.
            </dd>
          </div>
        </dl>
      </section>

      {/* CTA */}
      <section className="foyer-section foyer-section--wwm-cta">
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/contact" className="foyer-link foyer-link--bold">
            → contact
          </ViewTransitionLink>
        </p>
      </section>
    </div>
  );
}
