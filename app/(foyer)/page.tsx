// app/(foyer)/page.tsx
//
// Color Worlds home — single long-scroll. Sections set data-world on
// themselves; WorldSwitcher observes them and cross-fades the page
// palette as each crosses viewport center.
//
// Section order + worlds (Terracotta Workshop palette):
//   Hero         → terracotta
//   Marquee      → terracotta (Pass-20: dot spacing fixed; ✦ now reads
//                              as inline punctuation, not a floating
//                              element)
//   Revenue+exits→ terracotta (Pass-17: moved up from inside CLIENTS;
//                              Pass-20: hand-circle refined per Marcus)
//   Clients      → bone   (Pass-20: services TEASER — 3 services per
//                          Lena's consolidation; rows link to /services
//                          rather than per-row case studies; section-
//                          level "See full services →" CTA reinforces)
//   Ordani       → petrol (Pass-20: lede rewritten with technical
//                          posture surfaced per David)
//   Shipped      → espresso (3 cards + merged "Also at" sub-credit;
//                            Pass-20: Frontier AI card now links to
//                            /services/ai-engineering, not Calendly)
//   Footer       → terracotta
//
// Copy in the mockup is placeholder per the brief — Micah will finalize.
// "No 3D printing, no hardware, no maker content" — workshop bench is
// intentionally absent. "Don't frame Ordani as a side project" — it's
// presented as a live product with beta signup.
import type { Metadata } from "next";
import { Hero } from "@/components/color-worlds/Hero";
import { OrdaniBetaForm } from "@/components/color-worlds/OrdaniBetaForm";
import { OrdaniSticky } from "@/components/color-worlds/OrdaniSticky";
import { SplitReveal } from "@/components/color-worlds/SplitReveal";
import { RevenueTick } from "@/components/color-worlds/RevenueTick";
import { MagneticArea } from "@/components/motion/MagneticArea";

export const metadata: Metadata = {
  // Absolute title prevents the root template ("%s — Micah Jones") from
  // double-suffixing on the home page. Other routes still get the suffix.
  title: {
    absolute:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
  },
  description:
    "Independent operator in Oakland. $20M+ in client revenue. Two exits — Akamai acquisition, SurveyMonkey IPO. Now building Ordani — HIPAA-grade practice management software for fourteen doula practices.",
  alternates: { canonical: "https://www.micahjonesconsulting.com" },
  openGraph: {
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "$20M+ in client revenue. Two exits — Akamai acquisition, SurveyMonkey IPO. Now building Ordani — HIPAA-grade practice management for fourteen doula practices.",
    type: "website",
    url: "https://www.micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "$20M+ in client revenue. Two exits — Akamai acquisition, SurveyMonkey IPO. Now building Ordani.",
  },
};

// Pass-20 (per Lena, Pass-19 review): consolidated 4 services → 3.
// Dropped "Launches" (70% overlap with Go-to-market — demand + narrative
// + cascade is a SUBSET of GTM, not a peer). Dropped "Growth systems"
// (wrong register — reads as YC-stage performance-marketing, not as
// $200K boutique operator). Added "Frontier AI engineering" as a first-
// class service (was previously only surfaced as a Shipped card).
//
// Per-row href + proof fields dropped — the home CLIENTS section is now
// a teaser. Every row links to /services where the full scope/process/
// proof per service lives. Single section-level "See full services →"
// CTA below the row list reinforces the destination.
const CLIENT_OFFERS = [
  {
    n: "01",
    title: "Positioning & GTM",
    desc: "Category-shift research and the narrative that carries the enterprise sale.",
  },
  {
    n: "02",
    title: "End-to-end product building",
    desc: "Concept through shipped product, by the same operator. Strategy, design, code, security, launch.",
  },
  {
    n: "03",
    title: "Frontier AI engineering",
    desc: "Production architecture and orchestration for founders shipping AI-native software.",
  },
] as const;

const SERVICE_MARQUEE = [
  "Go-to-market",
  "Product",
  "Launches",
  "Growth",
  "Strategy",
] as const;

export default function ColorWorldsHome() {
  return (
    <>
      {/* HERO + MARQUEE — terracotta */}
      <Hero />

      <div className="cw-marquee" data-section data-world="terracotta">
        <div className="cw-track">
          {/* Track is duplicated; linear translateX(-50%) loops cleanly. */}
          {[0, 1].map((dupe) => (
            <span key={dupe}>
              {SERVICE_MARQUEE.map((s) => (
                <span key={`${dupe}-${s}`}>
                  {s}
                  <span className="cw-dot" aria-hidden>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* REVENUE + EXITS — terracotta. Pass-17: moved up from inside the
          CLIENTS section. The $20M+ / two exits / trillions claim is the
          credibility hook that earns the reader's attention BEFORE the
          services pitch. Terracotta world continues the hero band
          (hero → marquee → revenue all share terracotta) so the
          credibility moment reads as the closing beat of the hero. */}
      <section
        className="cw-rev-band"
        data-section
        data-world="terracotta"
        aria-labelledby="cw-rev-title"
      >
        <h2 id="cw-rev-title" className="cw-sr-only">
          Revenue and exits
        </h2>
        <RevenueTick />
      </section>

      {/* CLIENTS — bone */}
      <section
        className="cw-block"
        id="clients"
        data-section
        data-world="bone"
        aria-labelledby="cw-clients-title"
      >
        <p className="cw-kicker cw-reveal">Services</p>
        <SplitReveal
          as="h2"
          id="cw-clients-title"
          className="cw-secttitle"
        >
          Strategy that ships, not slides.
        </SplitReveal>

        <ul className="cw-worklist">
          {CLIENT_OFFERS.map((row, i) => (
            <li
              key={row.n}
              className="cw-workrow cw-reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Pass-20 (per Lena, Pass-19 review): whole row wraps
                  in a single anchor to /services. The per-row case-
                  study "Proven at" links are dead — they pushed
                  buyers to case studies when this section is supposed
                  to read services-led. Now: hover any row, click any
                  row → /services. Section CTA below reinforces. */}
              <a href="/services" className="cw-workrow__link">
                <span className="cw-fill" aria-hidden />
                <span className="cw-num">{row.n}</span>
                <span className="cw-title">{row.title}</span>
                <span className="cw-desc">{row.desc}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Pass-20: section-level CTA — single destination, "See full
            services →" reads as the next step into the services pitch
            rather than into a case study. The arrow nudges right on
            hover. */}
        <div className="cw-section-cta-wrap cw-reveal">
          <a href="/services" className="cw-section-cta">
            See full services{" "}
            <span className="cw-section-cta__arr" aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* ORDANI — petrol — live product, NOT a side project.
          The h2 carries .cw-bleed — the one ink-bleed display headline
          per page, per the texture research. Giant Ordani word reads
          as pulp-ink, not pixel-text. */}
      <section
        className="cw-ordani"
        id="ordani"
        data-section
        data-world="petrol"
        aria-labelledby="cw-ordani-title"
      >
        <OrdaniSticky />
        <p className="cw-tagrow cw-reveal">
          <span className="cw-live">Live beta</span>
          <span>14 doula practices</span>
          <span>Hundreds of users active</span>
        </p>
        <h2 id="cw-ordani-title" className="cw-reveal cw-bleed">
          Ordani
        </h2>
        <p className="cw-lede cw-reveal">
          {/* Pass-20: David (Black healthtech founder persona, Pass-19)
              rewrote this lede with the technical posture surfaced
              (RLS encryption, outside security reviews, audit log) +
              the retention specificity (8/14 active at six months,
              zero churn). A founder reading this knows whether to
              take the call; the previous lede sold the contrast
              frame, not the operator's competence. */}
          HIPAA-grade practice management for birth workers — built
          end-to-end by one operator. Row-level encryption inside
          Supabase RLS, two outside security reviews, every read
          logged. 14 practices, hundreds of users; eight active after
          six months. Zero churn.
        </p>
        <p className="cw-lede-sub cw-reveal">
          {/* TODO(operator): Ordani product website is under
              construction. When the public URL ships, replace href="#"
              with the live product URL. Until then the link is inert
              and the OrdaniBetaForm below remains the primary CTA. */}
          <a href="#" className="cw-lede-link">
            Visit Ordani →
          </a>
        </p>

        <OrdaniBetaForm />

        <p className="cw-note cw-reveal">
          Private beta · onboarding new users weekly
        </p>
      </section>

      {/* SHIPPED — espresso. Section rewritten per research: single-word
          header + 3-sentence dek that doubles as proof. */}
      <section
        className="cw-block"
        id="products"
        data-section
        data-world="espresso"
        aria-labelledby="cw-products-title"
      >
        <p className="cw-kicker cw-reveal">Engagements</p>
        <SplitReveal
          as="h2"
          id="cw-products-title"
          className="cw-secttitle"
        >
          Shipped.
        </SplitReveal>
        <p className="cw-sect-dek cw-reveal">
          Real work in real users&rsquo; hands. Two platforms acquired and
          public. A content engine that wins inbound. Frontier AI in
          production for founders.
        </p>

        <ul className="cw-cards">
          {/* Card 1 — author engagement, three sub-engagements at masked
              end-clients. Per operator: re-frame the relationship so the
              card surfaces the breadth of the end-clients Dante was
              serving while I was the operator beneath. Standard premium-
              consulting anonymization pattern ("Fortune-500 retail
              company"). */}
          <li
            className="cw-card cw-reveal"
            style={{ transitionDelay: "0ms" }}
          >
            <a href="/work/hr-equity-author" className="cw-card__link">
              <span className="cw-tag">2024–present · Multi-engagement</span>
              <h3>Content + product for an HR author</h3>
              <p>
                Algorithm strategy, content engine, and bespoke product
                work for an HR / organizational-equity author. Three
                engagements through one relationship, each routed to a
                different end-client:
              </p>
              <ul className="cw-card__sublist" aria-label="Three sub-engagements">
                <li>A top-tier research university — published-research web platform</li>
                <li>A Fortune-500 enterprise — internal distribution platform; 30% revenue lift</li>
                <li>A major American city — website, content engine, GTM, and a bespoke product</li>
              </ul>
              <span className="cw-open">See the engagement →</span>
            </a>
          </li>

          {/* Card 2 — GTM at scale. Per operator, no TechValidate; the
              IPO platform is named as SurveyMonkey Enterprise (the
              product line that anchored the IPO case). Accurate framing
              that uses the bigger recognizable brand. */}
          <li
            className="cw-card cw-reveal"
            style={{ transitionDelay: "120ms" }}
          >
            <a href="/work/guardicore" className="cw-card__link">
              <span className="cw-tag">Enterprise software · 2013–2023</span>
              <h3>GTM at scale</h3>
              <p>
                Positioning, market research, and the data backbone that
                moved deal size and revenue at platforms that sold
                (<strong>Guardicore → Akamai</strong>) and went public
                (<strong>SurveyMonkey Enterprise</strong> on Nasdaq).
                A decade of working directly with product teams in
                B2B software.
              </p>
              <span className="cw-open">See the receipts →</span>
            </a>
          </li>

          {/* Card 3 — frontier AI. New in Pass-12. Operator: "billed as
              another service/case study," 10,000-ft abstraction, no
              specifics. Premium consulting register: "specifics under
              NDA" + "available for new engagements." Links to Calendly
              since the case study hasn't been built yet. */}
          {/* Pass-20 (per Lena, Pass-19 review): card now links to the
              dedicated /services/ai-engineering subpage instead of
              routing AI-engagement intake to the generic Calendly. The
              subpage carries the engagement shapes (4 tiers); Calendly
              becomes the CTA from there, not from this card. */}
          <li
            className="cw-card cw-reveal"
            style={{ transitionDelay: "240ms" }}
          >
            <a
              href="/services/ai-engineering"
              className="cw-card__link"
            >
              <span className="cw-tag">2025–present · Embedded</span>
              <h3>Frontier AI, shipped.</h3>
              <p>
                Production-grade AI work for founders building AI-native
                software. The architecture and orchestration layers that
                turn frontier capability into a product users actually
                touch. Specifics under NDA — available for new
                engagements.
              </p>
              <span className="cw-open">See the engagement →</span>
            </a>
          </li>
        </ul>

        {/* Pass-16: former standalone <section.cw-credits> merged into
            Shipped as an "Also at" sub-credit. The operator flagged
            the standalone section read as an orphan — separate from
            Shipped but not really its own thing. Now it lives inside
            Shipped's espresso world, after the cards, as the secondary-
            engagement line. Guardicore and SurveyMonkey are NOT listed
            here (both already named prominently in the cards above);
            this lists the other named engagements. */}
        <div className="cw-shipped-also cw-reveal">
          <p className="cw-shipped-also__eyebrow">2013 — 2023</p>
          <p className="cw-shipped-also__line">
            Also at <strong>Flexport</strong>, <strong>Cuebiq</strong>,
            and <strong>Postmates</strong> — growth, GTM, and platform
            strategy across a decade of enterprise software.
          </p>
        </div>
      </section>

      {/* FOOTER — terracotta */}
      <footer
        className="cw-foot"
        id="contact"
        data-section
        data-world="terracotta"
        aria-labelledby="cw-build-title"
      >
        <a
          href="https://calendly.com/micahmccoyjones/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="cw-big-link"
          aria-label="Let's build — book a call"
        >
          <SplitReveal
            as="h2"
            id="cw-build-title"
            className="cw-big cw-shift"
            stagger={0.04}
            start="top 85%"
          >
            LET&rsquo;S
            <br />
            BUILD →
          </SplitReveal>
        </a>
        <div className="cw-footrow cw-reveal">
          <MagneticArea>
            <a
              href="https://calendly.com/micahmccoyjones/introduction"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call ↗
            </a>
          </MagneticArea>
          <a href="mailto:hello@micahjonesconsulting.com">
            hello@micahjonesconsulting.com
          </a>
          <span style={{ opacity: 0.5, border: "none" }}>
            © 2026 — Micah Jones
          </span>
        </div>
      </footer>
    </>
  );
}
