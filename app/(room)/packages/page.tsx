// app/(room)/packages/page.tsx
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
//
// Pass-92: the CTAs are Stripe checkout now. They were mailto while the rail
// sat test-only; the operator confirmed the live key on 2026-09-03 and asked
// for immediate purchase. A persona review had found the buyer only discovered
// a checkout existed on /services/thanks, which they reach AFTER paying.
// If the key ever goes missing the action returns a plain-English fallback
// naming the email address, so it degrades to the old path in words rather
// than a dead button.
//
// PASS-101 PHASE 3 — restyled to Room and Ledger (WINNING-BRIEF §14.5, §15.5;
// brief §3: "the three cards + the Engagements tier exactly as the home's
// section, with the page's own live copy ... inside the card geometry; the buy
// flow untouched"). What changed and what did not:
//   - The route MOVED from (foyer) to (room). Same URL. It loses the Color
//     Worlds chrome and gains the bar and the foot.
//   - Every string on the page is the string that was here, in the order it
//     was here. The <BuyButton> calls, their skuKeys and their labels are
//     byte-identical; the Stripe rail is not touched.
//   - The three articles take the §15.5 card: 1px hairline box, 8px radius,
//     28px interior, the name at 24px Hanken 500, the price at 72px Anybody,
//     the meta line as the label-style suffix on the price baseline, the
//     feature list as a hairline ledger, and the buy button as the card's
//     full-width chip. The Audit keeps a 2px COPPER TOP RULE and "Start here"
//     — a rule over one of three peers is a rank; a box around it is a badge.
//   - The cross-sell line becomes the ENGAGEMENTS TIER, the espresso plate
//     §15.5 rules ("Engagements is the highest paying form ... make that
//     special looking ... but still connected with the packagers"). Its link
//     is this page's own link, /services — NOT the mock's /call. Its figure
//     reads "From $5K a month", the live string the home and /services both
//     run, in place of "start at $5K a month", which is the same fact in the
//     same words; the rest of the sentence is unchanged and unmoved. Logged
//     for the §15.8 wording round rather than settled here.
//   - The OfferCatalog and BreadcrumbList JSON-LD are unchanged.
import type { Metadata } from "next";
import { BuyButton } from "@/components/BuyButton";

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
        className="rl-wrap rl-first"
        aria-labelledby="rl-packages-title"
        id="packages"
      >
        <div className="rl-sec rl-sec--wide">
          <div className="rl-eyebrow">
            <span className="rl-l">Packages</span>
          </div>
          <h1 id="rl-packages-title" className="rl-d" data-rl="head">
            Three fixed prices. Start this week.
          </h1>
        </div>
        <p className="rl-lede" data-rl="rise">
          For solo builders and small teams who got most of a product out of AI
          tools and stalled on the last stretch. Pick one, buy it, and the work
          starts within the week. No scoping call, no proposal, no quote to wait
          for.
        </p>

        <div className="rl-cards rl-air-m" data-rl-group="cards">
          <article
            className="rl-card"
            aria-label="The Unstick Session, $500"
            data-rl="rise"
          >
            <h2 className="nm">The Unstick Session</h2>
            <div className="pblock">
              <span className="pr rl-num">$500</span>
              <span className="rl-l">90 minutes + same-day memo</span>
            </div>
            <p className="one">
              Ninety minutes live on your stuck build. You leave with a written
              plan the same day.
            </p>
            <ul className="rl-list">
              <li>What is wrong, in the order to fix it</li>
              <li>The prompts to fix it with</li>
              <li>Your tools, your repo</li>
            </ul>
            <div className="cta">
              <BuyButton
                skuKey="unstick-500"
                label="Buy the Unstick Session"
                className="rl-buy"
              />
            </div>
          </article>

          <article
            className="rl-card mark"
            aria-label="The Audit, $2,500, start here"
            data-rl="rise"
          >
            {/* PASS-101 §18: the mark's two devices are a 1px copper border on
                four sides and an inline `Start here` PILL on the name line.
                It used to sit against the $2,500 baseline as a bare caption,
                which read as a stray label on the price. */}
            <span className="nmrow">
              <h2 className="nm">The Audit</h2>
              <span className="tag">Start here</span>
            </span>
            <div className="pblock">
              <span className="pr rl-num">$2,500</span>
              <span className="rl-l">Two weeks + debrief call</span>
            </div>
            <p className="one">
              Pick one flavor: Build (architecture and code), Production
              (security and deploy), or Traction (positioning and go-to-market).
              I go through it top to bottom and hand you the written audit. Not
              sure which one? Start here: the memo tells you what to fix first,
              and the fee credits toward what you book next.
            </p>
            <ul className="rl-list">
              <li>8-10 page audit memo</li>
              <li>Prioritized fix sequence</li>
              <li>One-hour debrief call</li>
            </ul>
            <div className="cta">
              <BuyButton
                skuKey="audit-2500"
                label="Buy the Audit"
                className="rl-buy"
              />
            </div>
          </article>

          <article
            className="rl-card"
            aria-label="The Sprint, $7,500"
            data-rl="rise"
          >
            <h2 className="nm">The Sprint</h2>
            <div className="pblock">
              <span className="pr rl-num">$7,500</span>
              <span className="rl-l">One week, embedded</span>
            </div>
            <p className="one">
              One week on one outcome, shipped: the repositioning, the
              production push, the AI feature. Not a plan. The thing, done.
            </p>
            <ul className="rl-list">
              <li>One outcome, agreed by email before day one</li>
              <li>Daily progress notes</li>
              <li>Debrief + next-step map</li>
            </ul>
            <div className="cta">
              <BuyButton
                skuKey="sprint-7500"
                label="Buy the Sprint"
                className="rl-buy"
              />
            </div>
          </article>
        </div>

        {/* PASS-101 §18: "Engagements is the fourth object in the SAME system
            ... Special by ground, connected by grammar." Same order as the
            home's: the name in the card's name slot, `From $5K a month` in the
            price slot under it, the sentence under that, and ONE chip right.
            The 72px figure used to sit in the RIGHT cell beside the chip,
            which put a display figure and a button on one line and left the
            block's whole middle empty. ONE <a>, no link inside it; the link is
            this page's own /services link, kept to the byte. */}
        <a className="rl-eng" href="/services" data-rl="rise">
          <span className="side l-side">
            <span className="hd">Engagements</span>
            <span className="v rl-num">From $5K a month</span>
            <span className="dsc">
              Hiring for a company rather than a build? Tell me the problem and
              I will scope it.
            </span>
          </span>
          <span className="side r">
            <span className="rl-chip">
              <span className="t">The engagements</span>
              <span className="a" aria-hidden>
                <span>&#8594;</span>
              </span>
            </span>
          </span>
        </a>

        {/* Pass-70: "Start by email" told the buyer the mechanism and not
            the consequence, which is the friction when there is no checkout
            button to press. This says what happens after they send it. */}
        {/* Pass-92: was "opens an email ... I reply within one business day
            with a start date", written when the CTAs were mailto. They are
            Stripe checkout now, so this says what actually happens after the
            card clears. The booking link is /call/kickoff, which is where
            lib/package-delivery.ts already points. */}
        <p className="rl-lede rl-air-m" data-rl="rise">
          Each one goes straight to checkout. The moment your card clears you
          get a kickoff email: the intake questions, a link to book the call,
          and the manual with its companion files attached.
        </p>

        <p className="rl-body rl-air-s" data-rl="rise">
          The rules, in plain terms: every package fee credits toward the next
          package or an engagement started within 60 days. Full refund any time
          before kickoff. None after, because by then the work has started. All
          three include The 80% Wall, my field manual for solo builders, with
          its companion files, attached to the kickoff email the moment you buy.
        </p>
      </section>
    </>
  );
}
