// app/(foyer)/services/page.tsx
//
// Services page — Pass-20. Built per Lena's Pass-19 recommendation:
// the home CLIENTS section should be a teaser that links here; this
// page carries the full services pitch.
//
// Structure: 3 services × 4 engagement tiers (Advisory / Project /
// Retainer / Embedded). No prices — boutique register surfaces tier
// SHAPES (typical scope, duration, first-month deliverable) without
// publishing day rates. Shifts the buyer from "do I have a project
// that fits" to "which tier matches my need."
//
// Section order:
//   1. Header (kicker + h1 + intro)
//   2. Three service sections, each with:
//      - num + title + description
//      - anchor case-study reference (links to /work/[slug])
//      - 4-tier grid (Advisory / Project / Retainer / Embedded)
//   3. Footer CTA (Calendly)
//
// Bone world — continues the CLIENTS section's palette from the home.
import type { Metadata } from "next";
import { MagneticArea } from "@/components/motion/MagneticArea";

export const metadata: Metadata = {
  title: "Services — Three engagement types, four shapes each",
  description:
    "Three services — Positioning & GTM, end-to-end product building, frontier AI engineering. Four engagement shapes per service: advisory, project, retainer, embedded.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/services" },
};

interface Tier {
  name: string;
  scope: string;
  duration: string;
  deliverable: string;
}

interface Service {
  slug: string;
  n: string;
  title: string;
  desc: string;
  anchorLabel: string;
  anchorHref: string;
  anchorNote: string;
  tiers: Tier[];
}

const SERVICES: Service[] = [
  {
    slug: "positioning-gtm",
    n: "01",
    title: "Positioning & GTM",
    // Pass-23: pain-led rewrite. Lead with the buyer's failure mode
    // ("you built it; enterprise teams aren't buying"), then surface
    // the operator's specific work that closes that gap.
    desc: "You built it. Enterprise teams still aren't buying. I run the positioning research, customer interviews, and sales-call analysis that turn a feature-comparison platform into the category buyers actually want. Specialty: selling data and security into financial institutions — banks, insurers, the procurement committees that don't move fast.",
    anchorLabel: "See the engagement",
    anchorHref: "/work/guardicore",
    anchorNote:
      "Anchor: Guardicore → Akamai ($80M pipeline; repositioned from honeypot-lead to visibility + east-west microsegmentation); SurveyMonkey Enterprise ($1M+ contributed toward the Nasdaq IPO).",
    tiers: [
      {
        name: "Advisory",
        // Pass-21 (Claude Chat audit): killed "sounding board" — soft
        // language that appeared on every fractional CMO's site. The
        // Advisory tier across all three services now uses "pressure-
        // test" as the sharper operator-verb.
        scope:
          "Monthly positioning review + narrative pressure-test against live deals + go-to-market decisions.",
        duration: "4-6 hrs/month, ongoing.",
        deliverable:
          "Positioning audit memo (8-10 pages) — your current state vs. the buyer's actual question, with the gap named.",
      },
      {
        name: "Project",
        scope:
          "Full repositioning research → narrative → sales enablement. Customer interviews, sales-call analysis, category research.",
        duration: "8-12 weeks, defined scope.",
        deliverable:
          "30 customer interviews + 50-call sales-call analysis + interim category-shift memo by week 4. Final positioning playbook + sales narrative by close.",
      },
      {
        name: "Retainer",
        scope:
          "Embedded GTM advisor + monthly narrative iteration. Continuous tuning of the message and the channels carrying it.",
        duration: "Month-to-month, 6-month minimum.",
        deliverable:
          "Initial positioning shift + 90-day GTM roadmap + first sales enablement update in month one.",
      },
      {
        name: "Embedded",
        scope:
          "Acting head of GTM strategy for the engagement window. Owns the narrative, partners with product + sales.",
        duration: "3-6 months, 3 days/week.",
        deliverable:
          "Full positioning + GTM playbook + first sales narrative iteration shipped + sales team trained by end of month one.",
      },
    ],
  },
  {
    slug: "product-building",
    n: "02",
    title: "End-to-end product building",
    // Pass-23: pain-led rewrite. The "AI demo dies in production" pain
    // is the most-cited 2026 founder complaint (per market research:
    // Anthropic's Fractional AI acquisition framed this exact gap).
    desc: "Most AI ideas die in the gap between demo and production. Strategy, design, code, security, launch — one operator, one signature, no relay race.",
    anchorLabel: "See the engagement",
    anchorHref: "/work/ordani",
    anchorNote:
      "Anchor: Ordani — HIPAA-grade practice management software, solo built, 14 doula practices in private beta; HR-author full-stack engagement (website + content engine + GTM + bespoke product).",
    tiers: [
      {
        name: "Advisory",
        // Pass-21 (Claude Chat audit): "sounding board" → "pressure-test"
        scope:
          "Monthly product strategy review + technical architecture pressure-test. Roadmap, build-vs-buy, and security posture.",
        duration: "4-6 hrs/month, ongoing.",
        deliverable:
          "Product audit + technical-architecture recommendations memo. Roadmap critique with named tradeoffs.",
      },
      {
        name: "Project",
        scope:
          "Concept → shipped MVP. User research, technical architecture, design system, first features in production.",
        duration: "12-20 weeks, defined scope.",
        deliverable:
          "15-25 user interviews + technical architecture document + design-system foundations + first feature shipped by week 8.",
      },
      {
        name: "Retainer",
        scope:
          "Ongoing product partnership through launch + iteration. Sprint cadence, feature delivery, roadmap stewardship.",
        duration: "Month-to-month, 6-month minimum.",
        deliverable:
          "Sprint cadence established + first feature shipped + 6-month roadmap synced with the founder in month one.",
      },
      {
        name: "Embedded",
        scope:
          "Acting head of product or CTO for the engagement window. Full ownership of build velocity + product quality.",
        duration: "4-8 months, full-time engagement.",
        deliverable:
          "Team setup + first major feature shipped + security and compliance posture documented in month one.",
      },
    ],
  },
  {
    slug: "ai-engineering",
    n: "03",
    title: "Frontier AI engineering",
    // Pass-23: sharper pain-first opener ("your AI works in the
    // notebook" = the canonical AI-prototype-to-production failure
    // mode). Stack named as before; value-prop closes the pitch.
    desc: "Your AI works in the notebook. Production is a different stack — eval infrastructure, orchestration, retrieval, deployment. I run that stack.",
    anchorLabel: "Inquire about an engagement",
    anchorHref: "https://calendly.com/micahmccoyjones/introduction",
    anchorNote:
      "Anchor: ongoing engagements (specifics under NDA). Production stack across frontier models with eval infrastructure, RAG and agent orchestration, prompt-deployment pipelines.",
    tiers: [
      {
        name: "Advisory",
        // Pass-21 (Claude Chat audit): "Sounding board" → pressure-test
        scope:
          "Monthly AI architecture review + LLM strategy pressure-test. Model choice, eval design, failure-mode mitigation.",
        duration: "4-6 hrs/month, ongoing.",
        deliverable:
          "AI stack audit + production-readiness assessment. Named gaps with prioritized fix sequence.",
      },
      {
        name: "Project",
        scope:
          "Production AI feature build — RAG, agent, eval pipeline, orchestration layer. Defined-scope shipped artifact.",
        duration: "6-12 weeks, defined scope.",
        deliverable:
          "Technical design + eval infrastructure + first production deployment by close. Documentation handed to your team.",
      },
      {
        name: "Retainer",
        scope:
          "Embedded AI engineering partnership. Continuous integration of new model capabilities, ongoing eval work, prompt iteration.",
        duration: "Month-to-month, 6-month minimum.",
        deliverable:
          "First eval framework iteration shipped + prompt-deployment pipeline live + documented failure-mode inventory in month one.",
      },
      {
        name: "Embedded",
        scope:
          "Acting head of AI engineering for the engagement window. Owns architecture, deployment, and the bar for production AI quality.",
        duration: "3-6 months, 3-4 days/week.",
        deliverable:
          "AI architecture documented + first production deployment shipped + eval infrastructure foundations live + team onboarded by end of month one.",
      },
    ],
  },
];

// Pass-23 (SEO): JSON-LD for AI-crawler citation (Perplexity, ChatGPT
// search, Claude search, Google AI Overviews). 2026 SEO research
// confirms structured data is the primary AI-visibility lever. Three
// Service entries + a BreadcrumbList, wrapped in @graph so they
// share the @context. Provider is the Person (Micah Jones) defined
// in the root layout's Person LD. Service IDs use the page anchor
// fragments so AI agents can resolve them back to specific sections.
const BASE_URL = "https://www.micahjonesconsulting.com";
const SERVICES_LD = {
  "@context": "https://schema.org",
  "@graph": [
    ...SERVICES.map((service) => ({
      "@type": "Service",
      "@id": `${BASE_URL}/services#${service.slug}`,
      name: service.title,
      description: service.desc,
      serviceType:
        service.slug === "ai-engineering"
          ? "AI Engineering Consulting"
          : service.slug === "product-building"
            ? "Product Development Consulting"
            : "Go-to-Market Strategy Consulting",
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
    <main className="cw-services" data-section data-world="bone">
      {/* Pass-23: Service + BreadcrumbList JSON-LD for AI-search +
          Google rich-result eligibility. Inline rather than via
          metadata.other because Next.js metadata API doesn't ship
          a clean way to inject script tags at SSR time. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_LD) }}
      />
      <header className="cw-services__header">
        <p className="cw-services__kicker">Services</p>
        <h1 className="cw-services__title">
          Three engagements. Four shapes each.
        </h1>
        {/* Pass-21 (Claude Chat audit): cut "No published day rates"
            clause. Defensive — the buyer hadn't asked about day rates
            yet, and mentioning the absence drew attention to it. */}
        <p className="cw-services__intro">
          Three services — positioning &amp; GTM, end-to-end product
          building, frontier AI engineering. Each carries four engagement
          shapes: advisory, project, retainer, embedded. The shapes below
          are explicit about scope, duration, and what lands in the
          first month.
        </p>
        {/* Pass-28 (two-buyer pivot): self-selection line. Routes the
            solo / sub-$50K builder to the playbook so this page stays
            the engagement surface for Buyer A. */}
        <p
          className="cw-services__intro"
          style={{ marginTop: "20px", fontSize: "15px", opacity: 0.72 }}
        >
          This page is for companies hiring an operator on a defined
          engagement. Solo and stuck on an AI build? The{" "}
          <a href="/playbook" className="cw-lede-link">playbook</a>{" "}
          is a better first step.
        </p>
      </header>

      {SERVICES.map((service) => (
        <section
          key={service.slug}
          id={service.slug}
          className="cw-service"
          aria-labelledby={`cw-service-${service.slug}-title`}
        >
          <header className="cw-service__head">
            <p className="cw-service__num">{service.n}</p>
            <h2
              id={`cw-service-${service.slug}-title`}
              className="cw-service__title"
            >
              {service.title}
            </h2>
            <p className="cw-service__desc">{service.desc}</p>
            <p className="cw-service__anchor-note">{service.anchorNote}</p>
            <p className="cw-service__anchor">
              <a
                href={service.anchorHref}
                className="cw-service__anchor-link"
                {...(service.anchorHref.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {service.anchorLabel}{" "}
                <span aria-hidden>→</span>
              </a>
            </p>
          </header>

          <div className="cw-tiers" role="list">
            {service.tiers.map((tier) => (
              <article
                key={tier.name}
                className="cw-tier"
                role="listitem"
              >
                <h3 className="cw-tier__name">{tier.name}</h3>
                <dl className="cw-tier__detail">
                  <dt>Scope</dt>
                  <dd>{tier.scope}</dd>
                  <dt>Duration</dt>
                  <dd>{tier.duration}</dd>
                  <dt>First-month deliverable</dt>
                  <dd>{tier.deliverable}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>
      ))}

      <footer className="cw-services__foot">
        <p className="cw-services__foot-kicker">Next step</p>
        <h2 className="cw-services__foot-title">
          Discovery call before any engagement.
        </h2>
        <p className="cw-services__foot-intro">
          Every engagement starts with a 30-minute call to name the shape
          and the fit. No deck, no sales pitch — just whether the work
          maps to what you actually need.
        </p>
        <div className="cw-services__foot-cta-row">
          <MagneticArea>
            <a
              href="https://calendly.com/micahmccoyjones/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="cw-cta"
            >
              Book a call <span className="cw-arr" aria-hidden>→</span>
            </a>
          </MagneticArea>
          <a href="/" className="cw-cta cw-cta--ghost">
            <span className="cw-arr" aria-hidden>←</span> Back to home
          </a>
        </div>
      </footer>
    </main>
  );
}
