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
    "Three services — Positioning & GTM, end-to-end product building, frontier AI engineering. Four engagement shapes per service: advisory, project, retainer, embedded. No published day rates; engagement shapes are explicit.",
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
    desc: "Category-shift research and the narrative that carries the enterprise sale. The work that takes a platform from feature-by-feature comparison into category leadership.",
    anchorLabel: "See the engagement",
    anchorHref: "/work/guardicore",
    anchorNote:
      "Anchor: Guardicore → Akamai (visibility + east-west microsegmentation repositioning); SurveyMonkey Enterprise (customer-evidence engine, anchored the Nasdaq IPO).",
    tiers: [
      {
        name: "Advisory",
        scope:
          "Strategic review of current positioning + monthly sounding board for sales narrative + go-to-market decisions.",
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
    desc: "Concept through shipped product, by the same operator. Strategy, design, code, security, launch — by one pair of hands rather than a relay race across vendors.",
    anchorLabel: "See the engagement",
    anchorHref: "/work/ordani",
    anchorNote:
      "Anchor: Ordani — HIPAA-grade practice management software, solo built, 14 doula practices in private beta; HR-author full-stack engagement (website + content engine + GTM + bespoke product).",
    tiers: [
      {
        name: "Advisory",
        scope:
          "Product strategy review + technical architecture sounding board. Periodic working sessions on roadmap, build-vs-buy, and security posture.",
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
    desc: "Production architecture and orchestration for founders shipping AI-native software. The layers that turn frontier capability into a product real users touch — eval infrastructure, continuous deployment of prompts, the failure modes that matter.",
    anchorLabel: "Inquire about an engagement",
    anchorHref: "https://calendly.com/micahmccoyjones/introduction",
    anchorNote:
      "Anchor: ongoing engagements (specifics under NDA). Production stack across frontier models with eval infrastructure, RAG and agent orchestration, prompt-deployment pipelines.",
    tiers: [
      {
        name: "Advisory",
        scope:
          "AI architecture review + monthly LLM strategy sessions. Sounding board for model choice, eval design, failure-mode mitigation.",
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
          "Continuous integration of AI work + first iteration of eval framework + prompt-deployment pipeline live in month one.",
      },
      {
        name: "Embedded",
        scope:
          "Acting head of AI engineering for the engagement window. Owns architecture, deployment, and the bar for production AI quality.",
        duration: "3-6 months, 3-4 days/week.",
        deliverable:
          "Full AI architecture + production deployment + eval infrastructure + team trained by end of month one.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="cw-services" data-section data-world="bone">
      <header className="cw-services__header">
        <p className="cw-services__kicker">Services</p>
        <h1 className="cw-services__title">
          Three engagements. Four shapes each.
        </h1>
        <p className="cw-services__intro">
          Three services — positioning &amp; GTM, end-to-end product
          building, frontier AI engineering. Each carries four engagement
          shapes: advisory, project, retainer, embedded. No published day
          rates; the shapes below are explicit about scope, duration, and
          what lands in the first month.
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
