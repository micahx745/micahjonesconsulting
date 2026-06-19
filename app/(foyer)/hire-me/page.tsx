// app/(foyer)/hire-me/page.tsx
//
// /hire-me — Buyer A (companies hiring) landing. Pass-25 two-buyer
// pivot, § 6. Gives a hiring manager the receipts + the four shapes
// they actually post for, without forcing them through the vibe-coder
// funnel. Linked from the home hero's secondary CTA.
//
// MINIMAL build: the CV PDF (public/cv.pdf) is a future operator asset,
// so the primary CTA is "Email me" with "CV on request" — no dead
// download link. Customers are the anonymized descriptive titles used
// consistently across the site (operator cowork direction).
//
// Color Worlds: reuses the cw-services shell + cw-tiers/cw-tier for the
// four shapes; cw-hm-* (globals.css) carries the receipts row,
// verticals, and the title-translation row.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire me — full-time, fractional, or contract",
  description:
    "Three companies I helped build reached an exit. $20M+ in client revenue. Product deployed behind a top-10 North American bank and a global systemically important bank. Now building Ordani solo. Available in four shapes.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/hire-me" },
  openGraph: {
    title: "Hire me — full-time, fractional, or contract",
    description:
      "Three companies I helped build reached an exit, $20M+ in client revenue, product deployed behind global financial institutions. An operator who has owned outcomes, available in four shapes.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/hire-me",
    siteName: "Micah Jones",
  },
};

const RECEIPTS = [
  "Three companies I helped build reached an exit — two on the cap table (Guardicore, TechValidate→SurveyMonkey), one I helped launch (Neuton.AI→Nordic Semiconductor).",
  "$20M+ in client revenue across a decade of enterprise software.",
  "Product deployed behind a top-10 North American bank, a global systemically important bank, and the world's largest public biomedical-research funder.",
  "Earlier, I ran multi-million-dollar cybersecurity procurements from the inside. I know the security questionnaire, the risk review, and the committee that signs.",
  "Built and shipped: a retrieval system that turns an organization's own data into drafted RFP responses, daily.",
] as const;

const SHAPES = [
  {
    name: "Full-time",
    scope:
      "A role I own end to end — product, engineering, or GTM leadership inside your org.",
    fit: "You have a seat to fill and want one operator who has shipped at the procurement level.",
    best: "Series A–C building AI-native software toward enterprise sales or an exit.",
  },
  {
    name: "Fractional",
    scope:
      "Fractional CTO, VP Product, or VP GTM. One to three days a week, on your hardest problem.",
    fit: "You need senior judgment now, not a full-time hire yet.",
    best: "Founders past product-market fit, pre-scale, who need the next motion built.",
  },
  {
    name: "Embedded",
    scope:
      "A defined window — three to six months — owning one outcome inside your team.",
    fit: "You have a specific shipping goal and a deadline.",
    best: "A launch, a repositioning, a production-AI build, an acquisition-readiness push.",
  },
  {
    name: "Advisory",
    scope:
      "Four to six hours a month. A pressure-test on positioning, product, or the AI stack.",
    fit: "You have the team; you want a second read before the expensive decisions.",
    best: "Operators who want the receipts in the room without the headcount.",
  },
] as const;

const VERTICALS = [
  "Financial services",
  "Security",
  "Applied AI & data",
  "Survey & martech",
  "Healthcare",
  "Logistics",
  "Content & media",
] as const;

const TITLES = [
  "Director of Product",
  "Head of Product",
  "VP Product",
  "Staff / Principal Engineer",
  "VP GTM / Head of Sales",
  "Fractional CTO",
  "Founding PM",
  "Head of Applied AI",
] as const;

export default function HireMePage() {
  return (
    <main className="cw-services cw-hire" data-section data-world="bone">
      <header className="cw-services__header">
        <p className="cw-services__kicker">Hire me</p>
        <h1 className="cw-services__title">
          Full-time, fractional, or contract.
        </h1>
        <p className="cw-services__intro">
          Three companies I helped build reached an exit. A HIPAA-grade SaaS I built solo. I&rsquo;ve
          owned outcomes, not just advised on them. Here&rsquo;s the
          shape that fits your seat.
        </p>
      </header>

      {/* Receipts row — the first thing a hiring manager needs. */}
      <section className="cw-hm-receipts" aria-label="Receipts">
        <ol className="cw-hm-receipts__list">
          {RECEIPTS.map((r, i) => (
            <li key={r} className="cw-hm-receipt">
              <span className="cw-hm-receipt__num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="cw-hm-receipt__text">{r}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Four shapes — reuse the services tier grid. */}
      <section className="cw-hm-sect" aria-labelledby="hm-shapes-title">
        <h2 id="hm-shapes-title" className="cw-pb-h2">Four shapes</h2>
        <div className="cw-tiers" role="list">
          {SHAPES.map((s) => (
            <article key={s.name} className="cw-tier" role="listitem">
              <h3 className="cw-tier__name">{s.name}</h3>
              <dl className="cw-tier__detail">
                <dt>Scope</dt>
                <dd>{s.scope}</dd>
                <dt>Fit</dt>
                <dd>{s.fit}</dd>
                <dt>Best for</dt>
                <dd>{s.best}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* Verticals — so a non-tech hiring manager doesn't bounce. */}
      <section className="cw-hm-sect" aria-labelledby="hm-verticals-title">
        <h2 id="hm-verticals-title" className="cw-pb-h2">
          Verticals I&rsquo;ve shipped into
        </h2>
        <ul className="cw-hm-tags">
          {VERTICALS.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </section>

      {/* Title translation — maps the work to the roles HMs post. */}
      <section className="cw-hm-sect" aria-labelledby="hm-titles-title">
        <h2 id="hm-titles-title" className="cw-pb-h2">
          What this tends to get called
        </h2>
        <ul className="cw-hm-tags">
          {TITLES.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {/* Foot CTA — email first (HMs evaluate on paper); call demoted. */}
      <section className="cw-services__foot">
        <p className="cw-services__foot-kicker">Next step</p>
        <h2 className="cw-services__foot-title">
          Send the role. I&rsquo;ll send the receipts.
        </h2>
        <p className="cw-services__foot-intro">
          Email me the seat you&rsquo;re filling and I&rsquo;ll reply
          with a full CV and the closest fit. A call comes after the
          paper, not before.
        </p>
        <div className="cw-services__foot-cta-row">
          <a href="mailto:hello@micahjonesconsulting.com" className="cw-cta">
            Email me <span className="cw-arr" aria-hidden>→</span>
          </a>
          <a
            href="https://calendly.com/micahmccoyjones/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="cw-cta cw-cta--ghost"
          >
            Book a call <span className="cw-arr" aria-hidden>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
