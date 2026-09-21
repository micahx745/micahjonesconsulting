// app/(foyer)/services/page.tsx
//
// Services page — Pass-56 rebuild (operator 2026-09-01: "super busy,
// worded oddly in some places and not clear and or compelling to
// purchase… needs to be simplified"). Page-CRO scorecard on the old
// page: ~55/100 — taxonomy headline, 15 offers, 3×4 matrix (48 dense
// cells), primary CTA at the very bottom, proof buried in "Anchor:"
// parentheticals. Fix: one decision per screen.
//
// Pass-111b (operator 2026-09-11, four rulings; brief
// .claude/briefs/pass-111b-services-boxes-and-rail.md). The page sells
// four true things once each:
//   - ONE PRICE: "From $5K a month" is Advisory's and nothing else's
//     (decision 1), so it lives in the Advisory box and nowhere above
//     it. The scoped shapes lead with their live term at figure size.
//   - WHAT EACH SHAPE PROMISES: the approved commitments (decision 2)
//     differentiate the four boxes; the shared promises moved to one
//     ruled "Every engagement includes" row under the band.
//   - WHICH AREA: the three areas render under the shapes, and the
//     package pick travels as Stripe metadata.area (decision 3).
//   - THE RENAME: "AI engineering" (decision 9); "Product building".
// The tables, the .cw-sv-svc-group chapters, the "On the price"
// objection and the page-level price line are gone with them.
//
// Receipts use ledger phrasings only (docs/LESSONS_LEARNED.md #3).
// Zero animation on this page beyond the site's palette shift.
import type { Metadata } from "next";
import { HowIWork } from "@/components/color-worlds/HowIWork";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PackageBand } from "@/components/color-worlds/PackageBand";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { PriceBox } from "@/components/color-worlds/PriceBox";

export const metadata: Metadata = {
  title: "Services: what I do, and how to hire me",
  description:
    "Advisory from $5K a month; project, retainer, or embedded priced on the call. Not ready to commit? Start with the $2,500 Audit instead.",
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
  /** Index into receipts: the one receipt the areas block renders (Pass-111b). */
  proof: number;
}

// Pass-111b §6: reordered to AI engineering, Product building,
// Positioning & GTM (the areas render in this order); titles renamed
// per decision 9. The n field is data-only now; SERVICES_LD follows
// this order.
const SERVICES: Service[] = [
  {
    slug: "ai-engineering",
    n: "03",
    title: "AI engineering",
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
        text: "An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. $3M in signed contracts, close rate doubled.",
        href: "/work/rfp-engine",
        label: "Read the case study",
      },
      // Site copy review 2026-09-02 #21: the second receipt, "Current AI
      // engagements are under NDA.", is gone. It sat under a label that says
      // Proof and proved nothing, diluting the RFP receipt above it.
    ],
    serviceType: "AI Engineering Consulting",
    proof: 0,
  },
  {
    slug: "product-building",
    n: "02",
    title: "Product building",
    // Review #18 (2026-09-02): this line sold the demo-to-production gap,
    // which is service 03's line and the /playbook's pitch, so 02 and 03 read
    // as the same service. 02's proof (Ordani, the content engine) is whole
    // product building. The reviewer proposed ending on "I am the team"; that
    // collides with /work/ordani's "small team" sentence (Pass-63, kept) the
    // same way the Packages door's "solo" did (Pass-78). The licensed claim is
    // that he founded it and writes the code, so the line ends on building.
    pain: "You have the idea, the budget, and customers waiting. What you do not have is the team to build it. I build it.",
    outcomes: [
      "Strategy, design, code, security, and launch, all mine. Nothing gets handed to a second team.",
      "A production build, not a prototype: auth, data, deploy, and the compliance posture written down.",
      "A roadmap with the trade-offs named, agreed with the founder before the first sprint.",
    ],
    receipts: [
      {
        text: "Ordani: a HIPAA-compliant CRM I founded and built. Active paying users in beta, none lost to a competitor, and a public release coming.",
        href: "/work/ordani",
        label: "Read the case study",
      },
      {
        // Pass-78. Two defects. "website" is a deliverable NEITHER case study
        // mentions (zero hits in content-engine.mdx and rfp-engine.mdx), so it
        // was the one unsupported claim in a Proof block. And this was the only
        // receipt on the page with a live case study and no link to it, while
        // the receipt below it links out. Now it names what the study names and
        // goes where the number is proved.
        text: "A social activist: I built the AI content engine that turns one rough video into a week of content. A peak of 800,000 impressions in a month, up from a few thousand.",
        href: "/work/content-engine",
        label: "Read the case study",
      },
    ],
    serviceType: "Product Development Consulting",
    proof: 0,
  },
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
        text: "Guardicore: $14M in revenue at a $1.2M average enterprise deal size. Acquired by Akamai in 2021.",
        href: "/work/guardicore",
        label: "Read the case study",
      },
      {
        text: "SurveyMonkey Enterprise: $1M+ in enterprise sales toward the 2018 IPO.",
      },
      // Operator-supplied 2026-09-03, the first CONSULTING-era positioning
      // receipts on this page. The review's top finding was that section 01
      // proved positioning with two employment roles, so a founder buying
      // positioning saw one proof, from a job that ended in 2021.
      // Both clients stay anonymous, matching how the case studies already
      // refer to them. The birth worker's service list (she added care before
      // and after birth, not only birth itself) is described by its BREADTH
      // rather than itemised: naming those services on a consulting site
      // creates exposure for her practice that the proof does not need.
      {
        text: "A birth worker: repositioned from birth support alone to the full arc of care around it. Bookings went from one to three a month to five to ten, across her whole range instead of one service.",
        href: "/work/birth-worker",
        label: "Read the case study",
      },
    ],
    serviceType: "Go-to-Market Strategy Consulting",
    proof: 2,
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

// Pass-111b §2.1: the approved per-shape commitments (operator
// 2026-09-11, decision 2). A4 (notice terms) and S3 (the Sprint
// remedy) are NOT approved and are not written.
const ADVISORY_LIST = [
  "Two working sessions a month, booked when you need them.",
  "Send me a decision between sessions and get my read within one business day.",
  "A short written note after each session: what we decided and what happens next.",
];
const PROJECT_LIST = [
  "A fixed price for the agreed scope.",
  "A written progress note every week.",
  "A handover at the end: documentation and a walkthrough, so your team runs it without me.",
];
const RETAINER_LIST = [
  "Same-day response on anything that breaks in production.",
  "A monthly written review of what shipped and what is next.",
];
const EMBEDDED_LIST = [
  "In your standups and leadership meetings as part of the team.",
  "A roadmap I own and report on to the CEO.",
  "Before I leave: help hiring the permanent head of the function, and a handover plan.",
];

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
        <h1 id="cw-services-title" className="sr-only">
          Services
        </h1>

        {/* The opening: kicker, Engagements, the sell line and the
            Guardicore proof card (Pass-108/109). Pass-111b deleted the
            page-level "From $5K a month" line and the "Three areas of
            work, inside Engagements" lead: one price, once, and it is
            Advisory's (decision 1). */}
        <section
          id="engagements"
          className="cw-sv-open"
          aria-labelledby="cw-sv-open-title"
        >
          <div className="cw-sv-open__grid">
            <div className="cw-sv-open__lead">
              <p className="cw-services__kicker">For companies</p>
              <h2 id="cw-sv-open-title" className="cw-sv-open__name">
                Engagements
              </h2>
              <p className="cw-sv-open__body">
                Strategy and software from the same person, so nothing is lost
                in the hand-off. Pick the problem; I name the shape on the call.
              </p>
            </div>
            <div className="cw-sv-open__proof">
              <p className="cw-sv-open__proof-lbl">Proof</p>
              <a
                href="/work/guardicore"
                className="cw-door__case cw-sv-open__case"
              >
                See how I helped Guardicore, a Tel Aviv security company, break
                into the North American market with $14M in revenue and get
                acquired by Akamai
                <span aria-hidden> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Pass-111b: the shapes as boxes. No section head — the
            Engagements H2 and sell line above introduce them (CRITIQUE
            H5). The scoped shapes lead with their live term at figure
            size, not the word "Scoped" three times (CRITIQUE H2). */}
        <section
          id="shapes"
          className="cw-sv-sec cw-sv-shapes"
          aria-label="The four engagement shapes"
        >
          <div className="cw-pband cw-pband--shapes">
            <PriceBox
              as="h3"
              id="shape-advisory"
              name="Advisory"
              price={{ from: "From", fig: "$5K", per: "a month" }}
              term="4-6 hours a month, ongoing"
              fit="You want a second operator in the room for the big decisions."
              list={ADVISORY_LIST}
              cta={
                <a href="/call?shape=advisory" className="cw-buy cw-buy--quiet">
                  Ask about Advisory <span aria-hidden>→</span>
                </a>
              }
            />
            <PriceBox
              as="h3"
              id="shape-project"
              name="Project"
              price={{ fig: "6-20 weeks" }}
              term="Scoped and priced on the call"
              fit="One defined outcome with a start, an end, and a named deliverable."
              list={PROJECT_LIST}
              cta={
                <a href="/call?shape=project" className="cw-buy cw-buy--quiet">
                  Ask about a project <span aria-hidden>→</span>
                </a>
              }
            />
            <PriceBox
              as="h3"
              id="shape-retainer"
              name="Retainer"
              price={{ fig: "6 months", per: "then month to month" }}
              term="Scoped and priced on the call"
              fit="I stay on after the project ships: the launch, the first customers, and what they break."
              list={RETAINER_LIST}
              cta={
                <a href="/call?shape=retainer" className="cw-buy cw-buy--quiet">
                  Ask about a retainer <span aria-hidden>→</span>
                </a>
              }
            />
            <PriceBox
              as="h3"
              id="shape-embedded"
              lead
              name="Embedded"
              price={{ fig: "3-8 months", per: "3+ days a week" }}
              term="Scoped and priced on the call"
              fit="I act as your head of GTM, product, or AI engineering for the window."
              list={EMBEDDED_LIST}
              cta={
                <a href="/call?shape=embedded" className="cw-buy">
                  Ask about Embedded <span aria-hidden>→</span>
                </a>
              }
            />
          </div>

          <HowIWork variant="services" />

          {/* The three areas (decision 9's names), rendered from the
              SERVICES array: pain and outcomes verbatim, one receipt
              each (CRITIQUE M3), no numerals, no "Proof" label. */}
          <div className="cw-areas" aria-labelledby="sv-areas-title">
            <h3 id="sv-areas-title" className="cw-areas__h">
              Three areas of work
            </h3>
            <div className="cw-areas__grid">
              {SERVICES.map((service) => {
                const r = service.receipts[service.proof];
                return (
                  <article
                    key={service.slug}
                    id={service.slug}
                    className="cw-area"
                  >
                    <h4 className="cw-area__name">{service.title}</h4>
                    <p className="cw-area__pain">{service.pain}</p>
                    <ul className="cw-area__list">
                      {service.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                    <p className="cw-area__proof">
                      {r?.text}
                      {r?.href ? (
                        <>
                          {" "}
                          <a href={r.href} className="cw-mlink">
                            Read the case study <span aria-hidden>→</span>
                          </a>
                        </>
                      ) : null}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pass-111b: the packages as boxes behind the area picker
            (PackageBand owns the picker, the band and the footer row).
            No kicker — "For companies" is the page's one kicker
            (CRITIQUE H6). */}
        <section
          id="packages"
          className="cw-sv-sec cw-sv-pkgs"
          aria-labelledby="cw-sv-pkgs-title"
        >
          <h2 id="cw-sv-pkgs-title" className="cw-service__title">
            Or start smaller. Three fixed prices.
          </h2>
          <p className="cw-services__intro">
            No scoping call, no proposal. Buy one and the work starts within the
            week.
          </p>
          <PackageBand />
        </section>

        {/* Pass-111b deleted "On the price" (decision 1: the advisory-only
            floor and the scoped-on-the-call facts now live in the boxes).
            "Why one person" stays verbatim. */}
        <section
          className="cw-sv-objection"
          aria-label="Pricing and getting started"
        >
          <h2 className="cw-sv-objection__h">Why one person</h2>
          <p>
            An agency gives you a team and a relay race between them. A
            full-time hire takes three months to find and another to ramp. I am
            a senior operator you can start this week, on a scope with an end
            date. When the work is bigger than one person, I say so on the call.
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
        {/* Pass-82. Was "A free 30-minute call comes first." Booking moved
            behind the purchase (operator, 2026-09-02), so the first step is a
            note, not a calendar slot. The old intro also opened on "We name",
            the one banned pronoun on a solo consultant's page. */}
        <h2 className="cw-services__foot-title">
          A free 30-minute call comes first.
        </h2>
        <p className="cw-services__foot-intro">
          Tell me what is stuck. I listen, then say what the work looks like and
          whether I am the right person for it. If the work does not map to what
          you need, I say so on the call.
        </p>
        <div className="cw-services__foot-cta-row">
          {/* Pass-117: one CTA style on the page (DESIGN_BAR R17). The
              spring-motion wrapper left with .cw-cta. */}
          <a href="/call" className="cw-buy">
            Book a free intro call <span aria-hidden>→</span>
          </a>
          <a href="/" className="cw-mlink">
            <span aria-hidden>←</span> Back to home
          </a>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
