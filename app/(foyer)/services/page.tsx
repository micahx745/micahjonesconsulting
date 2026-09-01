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
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Services — What I do, and how to hire me",
  description:
    "Three services: positioning and go-to-market, end-to-end product building, frontier AI engineering. Hire me on an engagement scoped on a free call, or start a fixed-price package from $500 today.",
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
        text: "Ordani: a HIPAA-compliant CRM I founded and built. Hundreds of birth workers pay for it; none lost to a competitor.",
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
    outcomes: [
      "Retrieval, agents, and orchestration built for real load, not the demo.",
      "Evals that catch the failures before your customers do.",
      "A deployment pipeline your team can run after I leave.",
    ],
    receipts: [
      {
        text: "For an industry author: software that reads every new RFP each morning and drafts the first pass at a response. RFP-to-close rate doubled; $3M in contracts won.",
        href: "/work/hr-equity-author",
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

// Pass-47: OfferCatalog for the fixed-price packages — real prices,
// eligible for rich results and AI-search citation.
const PACKAGES_LD = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Fixed-price packages",
  url: "https://www.micahjonesconsulting.com/services#packages",
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

export default function ServicesPage() {
  return (
    <main className="cw-services cw-sv">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PACKAGES_LD) }}
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
        <header className="cw-services__header">
          <p className="cw-services__kicker">Services</p>
          <h1 id="cw-services-title" className="cw-services__title">
            What I do, and how to hire me.
          </h1>
          <p className="cw-services__intro">
            Three services. Two ways to buy them: an engagement scoped on a free
            call, or a fixed-price package you can start today.
          </p>
        </header>

        {/* The two doors — the routing decision comes before the pitch. */}
        <nav className="cw-sv-doors" aria-label="Two ways to hire me">
          <a href="#engagements" className="cw-sv-door">
            <span className="cw-sv-door__kicker">For companies</span>
            <span className="cw-sv-door__name">Engagements</span>
            <span className="cw-sv-door__body">
              Advisory, project, retainer, or embedded. Scoped together on a
              free 30-minute call.
            </span>
            <span className="cw-sv-door__meta">
              <span>From $5K a month</span>
              <span>
                The three services <span aria-hidden>→</span>
              </span>
            </span>
          </a>
          <a href="#packages" className="cw-sv-door">
            <span className="cw-sv-door__kicker">
              For solo builders and small teams
            </span>
            <span className="cw-sv-door__name">Packages</span>
            <span className="cw-sv-door__body">
              Three fixed prices. Pick one, email me, and the work starts this
              week.
            </span>
            <span className="cw-sv-door__meta">
              <span>$500 to $7,500</span>
              <span>
                The three packages <span aria-hidden>→</span>
              </span>
            </span>
          </a>
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
        </section>

        {/* Pass-47 — self-serve packages (operator-locked 2026-09-01:
          $500 / $2,500 / $7,500; credit bridge; refund before kickoff
          only). CTAs are honest commerce: email starts the work today,
          fulfilled manually; Stripe checkout replaces the mailto when
          the money path is verified end to end. */}
        <section
          id="packages"
          className="cw-pkgs"
          aria-labelledby="cw-pkgs-title"
        >
          <p className="cw-services__kicker">Packages</p>
          <h2 id="cw-pkgs-title" className="cw-service__title">
            Three fixed prices. Start this week.
          </h2>
          <p className="cw-services__intro">
            Built for solo builders and small teams. Pick one, email me, and the
            work starts within the week. No call required.
          </p>
          <div className="cw-pkgs__grid">
            <article className="cw-pkg" aria-label="The Unstick Session, $500">
              <h3 className="cw-pkg__name">The Unstick Session</h3>
              <p className="cw-pkg__price">$500</p>
              <p className="cw-pkg__meta">90 minutes + same-day memo</p>
              <p className="cw-pkg__body">
                Ninety minutes live on your stuck build, then a same-day written
                fix plan: what is wrong, the order to fix it, and the prompts to
                do it with.
              </p>
              <ul className="cw-pkg__list">
                <li>90-minute working call</li>
                <li>Same-day written fix plan</li>
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
              aria-label="The Audit, $2,500, recommended"
            >
              <span className="cw-pkg__tag">Recommended</span>
              <h3 className="cw-pkg__name">The Audit</h3>
              <p className="cw-pkg__price">$2,500</p>
              <p className="cw-pkg__meta">Two weeks + debrief call</p>
              <p className="cw-pkg__body">
                Pick one flavor: Build (architecture and code), Production
                (security and deploy), or Traction (positioning and
                go-to-market). I go through it top to bottom and hand you the
                written audit.
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
              <h3 className="cw-pkg__name">The Sprint</h3>
              <p className="cw-pkg__price">$7,500</p>
              <p className="cw-pkg__meta">One week, embedded</p>
              <p className="cw-pkg__body">
                One week on one outcome, shipped: the repositioning, the
                production push, the AI feature. Not a plan. The thing, done.
              </p>
              <ul className="cw-pkg__list">
                <li>One outcome, shipped</li>
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
          <p className="cw-pkgs__fine">
            The rules, in plain terms: every package fee credits toward the next
            package or an engagement started within 60 days. Full refund any
            time before kickoff, none after, because the work starts fast. All
            three include The 80% Wall, my field manual for solo builders, with
            its companion files.
          </p>
        </section>
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
