// app/(foyer)/page.tsx
//
// Color Worlds home — single long-scroll. Sections set data-world on
// themselves; WorldSwitcher observes them and cross-fades the page
// palette as each crosses viewport center.
//
// Section order + worlds (Terracotta Workshop palette):
//   Hero         → terracotta
//   Marquee      → terracotta
//   Clients      → bone
//   Ordani       → petrol   (live beta + email signup)
//   Products     → espresso
//   Engagements  → espresso (Pass-9: replaced wordmark marquee with
//                            editorial credit line — inline deal context)
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

// Each offering links to a case study that demonstrates it — keeps
// the home as the front of a real nav surface instead of "interactive
// theater" (per review pass #4 B5).
const CLIENT_OFFERS = [
  {
    n: "01",
    title: "Go-to-market",
    desc: "Positioning, motion, and the plan to win the market.",
    href: "/work/guardicore",
  },
  {
    n: "02",
    title: "Product building",
    desc: "From idea to working software — designed and shipped.",
    href: "/work/ordani",
  },
  {
    n: "03",
    title: "Launches",
    desc: "Demand, narrative, and the cascade that follows a launch.",
    href: "/work/hr-equity-author",
  },
  {
    n: "04",
    title: "Growth systems",
    desc: "The repeatable engine underneath the numbers.",
    href: "/work",
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
                  <span className="cw-dot"> ✦ </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* CLIENTS — bone */}
      <section
        className="cw-block"
        id="clients"
        data-section
        data-world="bone"
        aria-labelledby="cw-clients-title"
      >
        <p className="cw-kicker cw-reveal">What I build for clients</p>
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
              <a href={row.href} className="cw-workrow__link">
                <span className="cw-fill" aria-hidden />
                <span className="cw-num">{row.n}</span>
                <span className="cw-title">{row.title}</span>
                <span className="cw-desc">{row.desc}</span>
              </a>
            </li>
          ))}
        </ul>

        <RevenueTick />
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
          HIPAA-grade practice management for birth workers, built end to
          end. Doulas had been running their practice on Google Docs and
          group chats for a decade — they have proper software now.
        </p>
        <p className="cw-lede-sub cw-reveal">
          <a href="/work/ordani" className="cw-lede-link">
            Read the case study →
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
          <li
            className="cw-card cw-reveal"
            style={{ transitionDelay: "240ms" }}
          >
            <a
              href="https://calendly.com/micahmccoyjones/introduction"
              target="_blank"
              rel="noopener noreferrer"
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
              <span className="cw-open">Inquire ↗</span>
            </a>
          </li>
        </ul>
      </section>

      {/* ENGAGEMENTS — editorial credit line (Pass-9, was COMPANIES marquee).
          Kills the marquee. Five 700-weight wordmarks sliding past were
          filler — no logos, no context. A magazine-credit paragraph that
          names each engagement with its deal context inline reads as the
          closing credit on a long-form profile. Same espresso world. */}
      <section
        className="cw-credits"
        data-section
        data-world="espresso"
        aria-labelledby="cw-credits-title"
      >
        <p className="cw-credits__eyebrow">2013 — 2023</p>
        <h2 id="cw-credits-title" className="cw-credits__line">
          {/* Pass-14 (CW-19): TechValidate dropped from credit line so
              the line is consistent with the upper credibility moments
              (revenue index + Shipped Card 2) which both also dropped
              the TechValidate name in Pass-12. The IPO/SurveyMonkey
              narrative lives in the revenue section now; this line is
              the secondary-engagement credit. */}
          Engagements at{" "}
          <strong>Guardicore</strong>{" "}
          <span className="cw-credits__meta">→ Akamai, 2021</span>,{" "}
          <strong>Flexport</strong>, <strong>Cuebiq</strong>,{" "}
          and <strong>Postmates</strong>.
        </h2>
        <p className="cw-credits__role">
          Growth, GTM &amp; platform strategy.
        </p>
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
