// app/(foyer)/packages/page.tsx
//
// /packages — Pass-70. The fixed-price lane, split out of /services.
//
// From the external review: a solo builder looking for a $500 session had to
// load a 745-word page and scroll past enterprise advisory, four engagement
// shapes and three case-study receipts to reach it. The two buyers were being
// served in one scroll, and the cheaper one was reading the expensive one's
// page first. Packages now have their own address, their own opening, and the
// door on /services points here instead of at an anchor.
//
// Prices are operator-locked (2026-09-01): $500 / $2,500 / $7,500, the 60-day
// credit bridge, refund before kickoff only, the book included with all three.
// CTAs stay mailto on purpose. A Stripe rail exists and is verified in test
// mode, but until it is switched live an email is the honest path, so the
// copy now says what happens after the email instead of just "start".
import type { Metadata } from "next";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Packages: fixed prices, start this week",
  description:
    "Three fixed-price packages for solo builders and small teams: $500, $2,500 and $7,500. No call required. Fees credit toward what you book next within 60 days.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/packages" },
  openGraph: {
    title: "Packages: fixed prices, start this week",
    description:
      "Three fixed-price packages for solo builders and small teams: $500, $2,500 and $7,500. No call required.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/packages",
  },
};

const BASE_URL = "https://www.micahjonesconsulting.com";

// Pass-47: OfferCatalog for the fixed-price packages — real prices, eligible
// for rich results and AI-search citation. Moved here with the packages.
const PACKAGES_LD = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Fixed-price packages",
  url: `${BASE_URL}/packages`,
  itemListElement: [
    {
      "@type": "Offer",
      name: "The Unstick Session",
      price: "500",
      priceCurrency: "USD",
      description:
        "90-minute working call on a stuck AI-assisted build plus a same-day written fix plan.",
    },
    {
      "@type": "Offer",
      name: "The Audit",
      price: "2500",
      priceCurrency: "USD",
      description:
        "Two-week fixed-scope audit: build, production, or traction. Written memo, prioritized fix sequence, debrief call.",
    },
    {
      "@type": "Offer",
      name: "The Sprint",
      price: "7500",
      priceCurrency: "USD",
      description: "One week embedded on one outcome, shipped.",
    },
  ],
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Packages",
      item: `${BASE_URL}/packages`,
    },
  ],
};

export default function PackagesPage() {
  return (
    <>
      <OpeningWorld name="bone" />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PACKAGES_LD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />

      <section
        className="cw-block cw-pkg-page"
        data-section
        data-world="bone"
        aria-labelledby="cw-packages-title"
      >
        <p className="cw-services__kicker">Packages</p>
        <h1 id="cw-packages-title" className="cw-services__title">
          Three fixed prices. Start this week.
        </h1>
        <p className="cw-services__intro">
          For solo builders and small teams who got most of a product out of AI
          tools and stalled on the last stretch. Pick one, email me, and the
          work starts within the week. No scoping call, no proposal, no quote to
          wait for.
        </p>

        <section id="packages" className="cw-pkgs" aria-label="The packages">
          <div className="cw-pkgs__grid">
            <article className="cw-pkg" aria-label="The Unstick Session, $500">
              <h2 className="cw-pkg__name">The Unstick Session</h2>
              <p className="cw-pkg__price">$500</p>
              <p className="cw-pkg__meta">90 minutes + same-day memo</p>
              <p className="cw-pkg__body">
                Ninety minutes live on your stuck build. You leave with a
                written plan the same day.
              </p>
              <ul className="cw-pkg__list">
                <li>What is wrong, in the order to fix it</li>
                <li>The prompts to fix it with</li>
                <li>Your tools, your repo</li>
              </ul>
              <a
                className="cw-pkg__cta"
                href="mailto:micah@micahjonesconsulting.com?subject=The%20Unstick%20Session%20(%24500)&body=Tell%20me%20what%27s%20stuck%2C%20plus%20repo%20or%20host%20links%3A"
              >
                Start by email <span aria-hidden>&rarr;</span>
              </a>
            </article>

            <article
              className="cw-pkg cw-pkg--lead"
              aria-label="The Audit, $2,500, start here"
            >
              <span className="cw-pkg__tag">Start here</span>
              <h2 className="cw-pkg__name">The Audit</h2>
              <p className="cw-pkg__price">$2,500</p>
              <p className="cw-pkg__meta">Two weeks + debrief call</p>
              <p className="cw-pkg__body">
                Pick one flavor: Build (architecture and code), Production
                (security and deploy), or Traction (positioning and
                go-to-market). I go through it top to bottom and hand you the
                written audit. Not sure which one? Start here: the memo tells
                you what to fix first, and the fee credits toward what you book
                next.
              </p>
              <ul className="cw-pkg__list">
                <li>8-10 page audit memo</li>
                <li>Prioritized fix sequence</li>
                <li>One-hour debrief call</li>
              </ul>
              <a
                className="cw-pkg__cta"
                href="mailto:micah@micahjonesconsulting.com?subject=The%20Audit%20(%242%2C500)&body=Tell%20me%3A%201)%20which%20flavor%20(Build%20%2F%20Production%20%2F%20Traction)%202)%20your%20app%20and%20where%20it%27s%20stuck%203)%20links%3A"
              >
                Start by email <span aria-hidden>&rarr;</span>
              </a>
            </article>

            <article className="cw-pkg" aria-label="The Sprint, $7,500">
              <h2 className="cw-pkg__name">The Sprint</h2>
              <p className="cw-pkg__price">$7,500</p>
              <p className="cw-pkg__meta">One week, embedded</p>
              <p className="cw-pkg__body">
                One week on one outcome, shipped: the repositioning, the
                production push, the AI feature. Not a plan. The thing, done.
              </p>
              <ul className="cw-pkg__list">
                <li>One outcome, agreed by email before day one</li>
                <li>Daily progress notes</li>
                <li>Debrief + next-step map</li>
              </ul>
              <a
                className="cw-pkg__cta"
                href="mailto:micah@micahjonesconsulting.com?subject=The%20Sprint%20(%247%2C500)&body=Tell%20me%20the%20one%20outcome%20you%20want%20shipped%3A"
              >
                Start by email <span aria-hidden>&rarr;</span>
              </a>
            </article>
          </div>

          {/* Pass-70: "Start by email" told the buyer the mechanism and not
              the consequence, which is the friction when there is no checkout
              button to press. This says what happens after they send it. */}
          <p className="cw-pkg-page__next">
            Every one of those opens an email with the questions I need. Send it
            and I reply within one business day with a start date.
          </p>

          <p className="cw-pkgs__fine">
            The rules, in plain terms: every package fee credits toward the next
            package or an engagement started within 60 days. Full refund any
            time before kickoff. None after, because by then the work has
            started. All three include The 80% Wall, my field manual for solo
            builders, with its companion files.
          </p>
        </section>

        <p className="cw-pkg-page__cross">
          Hiring for a company rather than a build?{" "}
          <a href="/services" className="cw-lede-link">
            The engagements
          </a>{" "}
          start at $5K a month. Tell me the problem and I will scope it.
        </p>

        <PageFooter />
      </section>
    </>
  );
}
