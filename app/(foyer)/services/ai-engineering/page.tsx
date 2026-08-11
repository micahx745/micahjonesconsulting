// app/(foyer)/services/ai-engineering/page.tsx
//
// Frontier AI engineering subpage — Pass-20. The home's Frontier AI
// card (third card in the Shipped grid) used to link to Calendly; per
// Lena's Pass-19 review, that routed AI engagement intake to the
// generic discovery call without segmentation. This subpage is the
// contextualized destination — AI engagement shape, then a routed
// inquiry.
//
// Focused single-service deep dive: the same 4-tier structure as the
// /services index, but only Frontier AI engineering. Includes the
// process notes and the failure modes the operator considers part of
// "production-grade AI" — the things David (Black healthtech founder
// persona, Pass-19) asked about as technical-credibility checks.
import type { Metadata } from "next";
import { MagneticArea } from "@/components/motion/MagneticArea";
import { SpecTable } from "@/components/color-worlds/SpecTable";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "Frontier AI engineering — Services",
  description:
    "Production AI architecture and orchestration for founders shipping AI-native software. Four engagement shapes — advisory, project, retainer, embedded. Eval infrastructure, prompt-deployment pipelines, and the failure modes that matter.",
  alternates: {
    canonical:
      "https://www.micahjonesconsulting.com/services/ai-engineering",
  },
};

interface Tier {
  name: string;
  scope: string;
  duration: string;
  deliverable: string;
}

const TIERS: Tier[] = [
  {
    name: "Advisory",
    scope:
      "AI architecture review + monthly LLM strategy pressure-test. Model choice, eval design, failure-mode mitigation.",
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
];

// Pass-23 (SEO): BreadcrumbList JSON-LD for AI-search citation +
// Google breadcrumb-rich-result eligibility.
const BASE_URL_AI = "https://www.micahjonesconsulting.com";
const AI_PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL_AI },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${BASE_URL_AI}/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Frontier AI Engineering",
      item: `${BASE_URL_AI}/services/ai-engineering`,
    },
  ],
};

export default function AIEngineeringPage() {
  return (
    <main className="cw-services" data-section data-world="bone">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(AI_PAGE_LD) }}
      />
      <header className="cw-services__header">
        <p className="cw-services__kicker">Service · 03</p>
        <h1 className="cw-services__title">Frontier AI engineering.</h1>
        {/* Pass-23: pain-led intro rewrite. Was descriptive; now leads
            with the canonical "AI works in the notebook" failure mode
            and surfaces the operator's specific shipping discipline. */}
        <p className="cw-services__intro">
          Your AI works in the notebook. Production is a different stack.
          I run eval infrastructure, prompt-deployment pipelines, and the
          orchestration between model and user. Engagements are ongoing;
          specifics live under NDA.
        </p>
      </header>

      <section
        id="ai-engineering"
        className="cw-service"
        aria-labelledby="cw-ai-tiers-title"
      >
        <header className="cw-service__head">
          <p className="cw-service__num">A</p>
          <h2
            id="cw-ai-tiers-title"
            className="cw-service__title"
          >
            Engagement shapes
          </h2>
          <p className="cw-service__desc">
            Four shapes, increasing in commitment. The right shape
            depends on whether you need an architecture review, a
            shipped artifact, an ongoing partner, or full ownership of
            the AI stack.
          </p>
        </header>

        {/* W2 (P0-2/D4-D5): comparative spec table replaces the four-up
            card grid; Embedded weighted per the operator lock. */}
        <SpecTable
          caption="Frontier AI engineering — four engagement shapes compared by scope, duration, and first-month deliverable"
          rowLabels={["Scope", "Duration", "First-month deliverable"]}
          weighted="Embedded"
          columns={TIERS.map((tier) => ({
            name: tier.name,
            cells: [tier.scope, tier.duration, tier.deliverable],
          }))}
        />
      </section>

      <section
        id="what-production-means"
        className="cw-service"
        aria-labelledby="cw-ai-prod-title"
      >
        <header className="cw-service__head">
          <p className="cw-service__num">B</p>
          <h2 id="cw-ai-prod-title" className="cw-service__title">
            What &ldquo;production-grade&rdquo; means here
          </h2>
          <p className="cw-service__desc">
            The phrase carries a specific stack: eval infrastructure
            that fires on every change, continuous deployment of
            prompts (not just model versions), confidence thresholds
            and refusal patterns on the retrieval layer, and a
            documented bar for what ships vs. what waits. Frontier
            capability that lives in a notebook is not production. The
            engagement bar is &ldquo;deployed, observed, iterated.&rdquo;
          </p>
          {/* Pass-28 (two-buyer pivot): reverse bridge — point the
              solo / sub-$50K buyer to the playbook as the right first
              step, not a downgrade. Filters in serious advisory buyers. */}
          <p
            className="cw-service__desc"
            style={{ marginTop: "16px", fontStyle: "italic", opacity: 0.8 }}
          >
            If your stack is pre-production and you&rsquo;re solo, the{" "}
            <a href="/playbook" className="cw-lede-link">playbook</a>{" "}
            covers most of what the advisory shape does — for $149, not
            $5K a month.
          </p>
        </header>
      </section>

      {/* W3 (P1-7/R18 + D7): CTA out of <footer>; one filled pill;
          logistics footer appended. */}
      <section className="cw-services__foot" aria-label="Next step">
        <p className="cw-services__foot-kicker">Next step</p>
        <h2 className="cw-services__foot-title">
          Discovery call for AI engagements.
        </h2>
        <p className="cw-services__foot-intro">
          The call covers your current stack, the failure modes that
          worry you, and whether the engagement shape on this page
          matches what you actually need.
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
          <a href="/services" className="cw-mlink">
            <span aria-hidden>←</span> All services
          </a>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
