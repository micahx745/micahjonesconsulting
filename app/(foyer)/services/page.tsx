// app/(foyer)/services/page.tsx
//
// Services page — Pass-56 rebuild (operator 2026-09-01: "super busy,
// worded oddly in some places and not clear and or compelling to
// purchase… needs to be simplified"). Page-CRO scorecard on the old
// page: ~55/100 — taxonomy headline, 15 offers, 3×4 matrix (48 dense
// cells), primary CTA at the very bottom, proof buried in "Anchor:"
// parentheticals. Fix: one decision per screen.
//
//   1. Header + TWO DOORS — route the buyer first: engagements (for
//      companies, scoped on a free call) or packages (fixed price).
//   2. Three services, compact: pain line + three outcomes + one
//      receipt in display type with the case-study link. No tables.
//   3. How engagements work — ONE table (four shapes) for all three
//      services, replacing three 4-column matrices.
//   4. Packages (Pass-47 cards kept; intro tightened).
//   5. Espresso foot: the free intro call — the page's one filled pill.
//
// Receipts use ledger phrasings only (docs/LESSONS_LEARNED.md #3).
// Zero animation on this page beyond the site's palette shift.
import type { Metadata } from "next";
import { MagneticArea } from "@/components/motion/MagneticArea";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Services — What I do, and how to hire me",
  description:
    "Three services, two ways to buy them: an engagement from $5K a month, or a fixed-price package at $500, $2,500 or $7,500. One operator, not an agency.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/services" },
};

interface Receipt {
  text: string;
  href?: string;
  label?: string;
}

interface Service {
  slug: string;
  n: string;
  title: string;
  pain: string;
  outcomes: string[];
  receipts: Receipt[];
  serviceType: string;
}

const SERVICES: Service[] = [
  {
    slug: "positioning-gtm",
    n: "01",
    title: "Positioning & GTM",
    // Same pain line the home teaser uses — message match on the click.
    pain: "You built it. Enterprise teams still aren't buying. The gap is positioning, not features.",
    outcomes: [
      "Customer interviews and sales-call analysis that name the question buyers are actually asking.",
      "A positioning shift and a sales narrative your team can run without me.",
      "A plan for selling data and security into banks, insurers, and slow procurement committees.",
    ],
    receipts: [
      {
        text: "Guardicore: $80M in pipeline generated, $14M in revenue. Acquired by Akamai in 2021.",
        href: "/work/guardicore",
        label: "Read the case study",
      },
      { text: "SurveyMonkey Enterprise: $1M+ toward the IPO." },
    ],
    serviceType: "Go-to-Market Strategy Consulting",
  },
  {
    slug: "product-building",
    n: "02",
    title: "End-to-end product building",
    pain: "Most AI ideas die in the gap between demo and production. I work in that gap.",
    outcomes: [
      "Strategy, design, code, security, and launch from one pair of hands. No relay race.",
      "A production build, not a prototype: auth, data, deploy, and the compliance posture written down.",
      "A roadmap with the trade-offs named, agreed with the founder before the first sprint.",
    ],
    receipts: [
      {
        text: "Ordani: a HIPAA-compliant CRM I founded and built. Active paying users in beta, none lost to a competitor.",
        href: "/work/ordani",
        label: "Read the case study",
      },
      {
        text: "An industry author: website, content engine, and go-to-market. Monthly reach grew from 8K to 290K.",
      },
    ],
    serviceType: "Product Development Consulting",
  },
  {
    slug: "ai-engineering",
    n: "03",
    title: "Frontier AI engineering",
    pain: "Your AI works in the notebook. Production is a different stack. I run that stack.",
    // Pass-67: outcomes 2 and 3 absorb the one idea worth keeping from the
    // retired /services/ai-engineering page — its definition of what
    // "production-grade" actually means. Folded into the existing three rather
    // than added as a fourth, so all three services keep the same shape.
    outcomes: [
      "Retrieval, agents, and orchestration built for real load, not the demo.",
      "Evals that fire on every change and catch failures before your customers do.",
      "Prompt deployment as its own pipeline, and a written bar for what ships. Your team runs it after I leave.",
    ],
    receipts: [
      {
        text: "For an industry author: software that reads every new RFP each morning and drafts the first pass at a response. RFP-to-close rate doubled; $3M in contracts won.",
        href: "/work/rfp-engine",
        label: "Read the case study",
      },
      { text: "Current AI engagements are under NDA." },
    ],
    serviceType: "AI Engineering Consulting",
  },
];

// The four engagement shapes — the same four for every service, so
// they are stated ONCE. Advisory's public anchor price stays (Pass-47,
// operator-locked); the rest are scoped on the intro call. Embedded is
// the operator-locked weighted shape.
interface Shape {
  name: string;
  when: string;
  time: string;
  price: string;
  lead?: boolean;
}

const SHAPES: Shape[] = [
  {
    name: "Advisory",
    when: "You want a second operator in the room for the big decisions, a few hours a month.",
    time: "4-6 hours a month, ongoing",
    price: "From $5K a month",
  },
  {
    name: "Project",
    when: "One defined outcome with a start, an end, and a named deliverable.",
    time: "6-20 weeks",
    price: "Scoped on the call",
  },
  {
    name: "Retainer",
    when: "Ongoing partnership through launch and the iteration after it.",
    time: "Month to month, 6-month minimum",
    price: "Scoped on the call",
  },
  {
    name: "Embedded",
    when: "I act as your head of GTM, product, or AI engineering for the window.",
    time: "3-8 months, 3+ days a week",
    price: "Scoped on the call",
    lead: true,
  },
];

// Pass-23 (SEO): JSON-LD for AI-crawler citation. Three Service
// entries + a BreadcrumbList in one @graph. Service IDs use the page
// anchor fragments so agents can resolve them back to sections.
const BASE_URL = "https://www.micahjonesconsulting.com";
const SERVICES_LD = {
  "@context": "https://schema.org",
  "@graph": [
    ...SERVICES.map((service) => ({
      "@type": "Service",
      "@id": `${BASE_URL}/services#${service.slug}`,
      name: service.title,
      description: `${service.pain} ${service.outcomes.join(" ")}`,
      serviceType: service.serviceType,
      provider: {
        "@type": "Person",
        name: "Micah Jones",
        url: BASE_URL,
      },
      areaServed: "Global",
      audience: {
        "@type": "BusinessAudience",
        audienceType:
          "Series A–C founders building AI-native software; B2B SaaS operators preparing for enterprise sales or acquisition.",
      },
    })),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${BASE_URL}/services`,
        },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <main className="cw-services cw-sv">
      <OpeningWorld name="bone" />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }}
      />
      {/* D10 (operator-locked 2026-08): the whole pitch stays in one bone
          section; the closing CTA below is the ONE palette shift on this
          page, into espresso. */}
      <section
        className="cw-services__body"
        data-section
        data-world="bone"
        aria-labelledby="cw-services-title"
      >
        {/* Pass-61 opening (brief: .claude/briefs/pass-61-page-openings.md).
            The kicker, the 88px "What I do, and how to hire me." and the intro
            are GONE. The intro was the doors' own copy said once in prose and
            again in boxes, and the page opened with its own name — the same
            three elements /work, /book and /about all opened with, which is
            what read as machine-made.

            The doors ARE the page now: two full-height columns split by ONE
            rule, no boxes, no radius, no shadow. The form is a two-column
            dinner menu — tasting menu on the left, a la carte on the right.
            One card, two prices, two paths, which is the most hospitable
            decision shape there is, and the constitution asks foyer pages for
            hospitality. Each column ends on a receipt, so the choice is made
            against evidence rather than adjectives.

            The h1 survives as screen-reader-only text: the visible headline is
            now the two column names, but the document still needs one h1. */}
        <h1 id="cw-services-title" className="sr-only">
          Services
        </h1>

        {/* Pass-76b. Each door used to be ONE <a> wrapping everything, with a
            flat proof line in the foot: "Guardicore: $80M in pipeline, $14M in
            revenue." Operator: those read "weak and out of place" — a stat
            with nowhere to go, sitting under the thing you actually came to
            click. They are now the door's second action: a real link into the
            case study that proves the claim, written as the thing the reader
            would want to find out.

            That forced the restructure. A link inside a link is invalid HTML,
            so the card is a <div> and the title, the case link and the CTA are
            three explicit links. The whole-card click target goes away; three
            honest targets beat one that hides two destinations. */}
        <nav className="cw-doors" aria-label="Two ways to hire me">
          <div className="cw-door">
            <span className="cw-door__kicker">For companies</span>
            <a href="#engagements" className="cw-door__name">
              Engagements
            </a>
            <span className="cw-door__body">
              Advisory, project, retainer, or embedded. Scoped together on a
              free 30-minute call.
            </span>
            <span className="cw-door__foot">
              <span className="cw-door__price">From $5K a month</span>
              <a href="/work/guardicore" className="cw-door__case">
                See how I helped a foreign company break into the North American
                market and get acquired
                <span aria-hidden> &rarr;</span>
              </a>
              <a href="#engagements" className="cw-door__go">
                The three services <span aria-hidden>&rarr;</span>
              </a>
            </span>
          </div>
          <div className="cw-door">
            <span className="cw-door__kicker">
              For solo builders and small teams
            </span>
            <a href="/packages" className="cw-door__name">
              Packages
            </a>
            <span className="cw-door__body">
              Three fixed prices. Pick one, email me, and the work starts this
              week.
            </span>
            <span className="cw-door__foot">
              <span className="cw-door__price">$500 · $2,500 · $7,500</span>
              <a href="/work/ordani" className="cw-door__case">
                See how I shipped a HIPAA-compliant product solo, from first
                commit to paying users
                <span aria-hidden> &rarr;</span>
              </a>
              <a href="/packages" className="cw-door__go">
                The three packages <span aria-hidden>&rarr;</span>
              </a>
            </span>
          </div>
        </nav>

        {/* The three services, compact. */}
        <section
          id="engagements"
          className="cw-sv-sec"
          aria-labelledby="cw-sv-eng-title"
        >
          <p className="cw-services__kicker">Engagements</p>
          <h2 id="cw-sv-eng-title" className="cw-service__title">
            Three services, one pair of hands.
          </h2>
          <p className="cw-services__intro">
            Strategy and software from the same person, so nothing is lost in
            the hand-off. Pick the problem; we pick the shape on the call.
          </p>
        </section>

        {SERVICES.map((service) => (
          <section
            key={service.slug}
            id={service.slug}
            className="cw-sv-svc"
            aria-labelledby={`cw-service-${service.slug}-title`}
          >
            <div className="cw-sv-svc__lead">
              <p className="cw-sv-svc__num">{service.n}</p>
              <h3
                id={`cw-service-${service.slug}-title`}
                className="cw-sv-svc__title"
              >
                {service.title}
              </h3>
              <p className="cw-sv-svc__pain">{service.pain}</p>
            </div>
            <div className="cw-sv-svc__detail">
              <p className="cw-sv-svc__lbl">What lands</p>
              <ul className="cw-sv-svc__list">
                {service.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p className="cw-sv-svc__lbl">Proof</p>
              {service.receipts.map((r, i) => (
                <p
                  key={r.text}
                  className={
                    i === 0
                      ? "cw-sv-receipt"
                      : "cw-sv-receipt cw-sv-receipt--minor"
                  }
                >
                  {r.text}
                  {r.href ? (
                    <>
                      {" "}
                      <a href={r.href} className="cw-sv-receipt__link">
                        {r.label} <span aria-hidden>→</span>
                      </a>
                    </>
                  ) : null}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* How engagements work — one table for all three services. */}
        <section
          id="shapes"
          className="cw-sv-sec cw-sv-shapes"
          aria-labelledby="cw-sv-shapes-title"
        >
          <p className="cw-services__kicker">How engagements work</p>
          <h2 id="cw-sv-shapes-title" className="cw-service__title">
            Four shapes. The same four for every service.
          </h2>
          <p className="cw-services__intro">
            You bring the problem. We choose the shape together on the free
            call, and I put the scope and price in writing before anything
            starts.
          </p>
          <table className="cw-sv-table">
            <caption className="sr-only">
              The four engagement shapes compared by fit, time, and price
            </caption>
            <thead>
              <tr>
                <th scope="col">Shape</th>
                <th scope="col">When it fits</th>
                <th scope="col">Time</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {SHAPES.map((s) => (
                <tr key={s.name}>
                  <th scope="row" className="cw-sv-table__name">
                    {s.name}
                    {s.lead ? (
                      <span className="cw-sv-table__tag">Recommended</span>
                    ) : null}
                  </th>
                  <td data-th="When it fits">{s.when}</td>
                  <td data-th="Time">{s.time}</td>
                  <td data-th="Price" className="cw-sv-table__price">
                    {s.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cw-sv-shapes__foot">
            Not sure which shape? That is what the call is for.{" "}
            <a href="/book" className="cw-mlink">
              Book a free intro call <span aria-hidden>→</span>
            </a>
          </p>
          {/* Pass-67: the bridge for the pre-production solo buyer, carried
              over from /services/ai-engineering when that page was retired.
              Pass-56 deleted the header that used to hold it, and this page
              had linked to the book zero times since. */}
          <p className="cw-sv-shapes__foot">
            Pre-production and working solo? The{" "}
            <a href="/playbook" className="cw-lede-link">
              playbook
            </a>{" "}
            covers most of what the advisory shape does, for under $150 rather
            than $5K a month.
          </p>
        </section>

        {/* Pass-70: the two things a company buyer asks that this page did
            not answer. The price note first, because "Scoped on the call" on
            three of four shapes reads as evasive to someone deciding whether
            to spend thirty minutes. NOTE: the review proposed a "$5K to $25K"
            range. That ceiling is not in the fact ledger and I will not invent
            a price, so this says WHEN the number arrives instead of what it
            is. A real range would be stronger and only the operator can set
            it. */}
        <section className="cw-sv-objection" aria-label="How pricing works">
          <h2 className="cw-sv-objection__h">On the price</h2>
          <p>
            Advisory is the only shape with a standing rate, because it is the
            only one with a standing shape: a few hours a month, ongoing. The
            other three are sized to one piece of work, so the number comes out
            of the call. You get it in writing, with the scope, before anything
            starts. No proposal theatre and no discovery fee.
          </p>

          <h2 className="cw-sv-objection__h">Why one person</h2>
          <p>
            An agency gives you a team and a relay race between them. A
            full-time hire takes three months to find and another to ramp. I am
            a senior operator you can start this week, on a scope with an end
            date, and something named ships in month one. When the work is
            bigger than one person, I say so on the call.
          </p>
        </section>

        {/* Pass-70: the packages moved to their own page, /packages. A solo
            builder after a $500 session was loading this page and scrolling
            past enterprise advisory, four engagement shapes and three
            case-study receipts to reach them. The door above goes there now. */}
      </section>

      {/* The ONE palette shift on /services — espresso, the site's
          closing/proof register. D7: one filled pill per page. */}
      <section
        className="cw-services__foot"
        data-section
        data-world="espresso"
        aria-label="Next step"
      >
        <p className="cw-services__foot-kicker">Next step</p>
        <h2 className="cw-services__foot-title">
          A free 30-minute call comes first.
        </h2>
        <p className="cw-services__foot-intro">
          We name the shape and the fit. No deck, no pitch. If the work does not
          map to what you need, I say so on the call.
        </p>
        <div className="cw-services__foot-cta-row">
          <MagneticArea>
            <a href="/book" className="cw-cta">
              Book a free intro call{" "}
              <span className="cw-arr" aria-hidden>
                →
              </span>
            </a>
          </MagneticArea>
          <a href="/" className="cw-mlink">
            <span aria-hidden>←</span> Back to home
          </a>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
