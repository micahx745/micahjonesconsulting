// app/(foyer)/page.tsx
//
// Color Worlds home — single long-scroll. Sections set data-world on
// themselves; WorldSwitcher observes them and cross-fades the page
// palette as each crosses viewport center.
//
// Section order matches the brief:
//   Hero       → tangerine
//   Marquee    → tangerine
//   Clients    → cream
//   Ordani     → cobalt   (live beta + email signup)
//   Products   → ink
//   Companies  → ink
//   Footer     → tangerine
//
// Copy in the mockup is placeholder per the brief — Micah will finalize.
// "No 3D printing, no hardware, no maker content" — workshop bench is
// intentionally absent. "Don't frame Ordani as a side project" — it's
// presented as a live product with beta signup.
import type { Metadata } from "next";
import { Hero } from "@/components/color-worlds/Hero";
import { OrdaniBetaForm } from "@/components/color-worlds/OrdaniBetaForm";
import { SplitReveal } from "@/components/color-worlds/SplitReveal";
import { RevenueTick } from "@/components/color-worlds/RevenueTick";

export const metadata: Metadata = {
  title: "Micah Jones — Strategy and software, shipped by the same pair of hands",
  description:
    "I build go-to-market for clients — and products with real users. Oakland.",
  openGraph: {
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "I build go-to-market for clients — and products with real users. Oakland.",
    type: "website",
    url: "https://micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "I build go-to-market for clients — and products with real users. Oakland.",
  },
};

const CLIENT_OFFERS = [
  {
    n: "01",
    title: "Go-to-market",
    desc: "Positioning, motion, and the plan to win the market.",
  },
  {
    n: "02",
    title: "Product building",
    desc: "From idea to working software — designed and shipped.",
  },
  {
    n: "03",
    title: "Launches",
    desc: "Demand, narrative, and the cascade that follows a launch.",
  },
  {
    n: "04",
    title: "Growth systems",
    desc: "The repeatable engine underneath the numbers.",
  },
] as const;

const COMPANIES = [
  "Guardicore",
  "Akamai",
  "TheValidate",
  "SurveyMonkey",
  "Flexport",
  "Cuebiq",
  "Postmates",
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
      {/* HERO + MARQUEE — tangerine */}
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

      {/* CLIENTS — cream */}
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

        <ul className="cw-worklist cw-reveal">
          {CLIENT_OFFERS.map((row) => (
            <li key={row.n} className="cw-workrow" data-cursor>
              <span className="cw-fill" aria-hidden />
              <span className="cw-num">{row.n}</span>
              <span className="cw-title">{row.title}</span>
              <span className="cw-desc">{row.desc}</span>
            </li>
          ))}
        </ul>

        <RevenueTick />
      </section>

      {/* ORDANI — federal blue — live product, NOT a side project.
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
        <p className="cw-tagrow cw-reveal">
          <span className="cw-live">Live beta</span> —{" "}
          <span>system of record for a regulated market</span>
        </p>
        <h2 id="cw-ordani-title" className="cw-reveal cw-bleed">
          Ordani
        </h2>
        <p className="cw-lede cw-reveal">
          A new system of record for an underserved, regulated industry — built
          end to end and already in the hands of real users. Join the beta and
          help shape what ships next.
        </p>

        <OrdaniBetaForm />

        <p className="cw-note cw-reveal">
          Private beta · onboarding new users weekly
        </p>
      </section>

      {/* PRODUCTS — ink */}
      <section
        className="cw-block"
        id="products"
        data-section
        data-world="espresso"
        aria-labelledby="cw-products-title"
      >
        <p className="cw-kicker cw-reveal">More things I&rsquo;ve built</p>
        <SplitReveal
          as="h2"
          id="cw-products-title"
          className="cw-secttitle"
        >
          Products, not pitches.
        </SplitReveal>

        <ul className="cw-cards">
          <li className="cw-card cw-reveal" data-cursor>
            <span className="cw-tag">AI content platform</span>
            <h3>Passioneer</h3>
            <p>
              An AI-native platform for creators — streaming chat, generation,
              and a publishing pipeline in one place.
            </p>
            <span className="cw-open">See more →</span>
          </li>
        </ul>
      </section>

      {/* COMPANIES marquee — espresso */}
      <section
        data-section
        data-world="espresso"
        style={{ paddingBottom: 40 }}
      >
        <p className="cw-companies-meta cw-reveal">
          2013 — 2023 · Growth, GTM &amp; platform strategy · Attributions under
          NDA
        </p>
        <div className="cw-companies" style={{ marginTop: 22 }}>
          <div className="cw-track">
            {[0, 1].map((dupe) => (
              <span key={dupe}>
                {COMPANIES.map((c) => (
                  <span key={`${dupe}-${c}`}>{c}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER — tangerine */}
      <footer
        className="cw-foot"
        id="contact"
        data-section
        data-world="terracotta"
        aria-labelledby="cw-build-title"
      >
        <h2 id="cw-build-title" className="cw-big cw-reveal cw-shift">
          LET&rsquo;S
          <br />
          BUILD <span className="cw-arr">→</span>
        </h2>
        <div className="cw-footrow cw-reveal">
          <a
            href="mailto:hello@micahjonesconsulting.com?subject=Intro call"
            data-cursor
            data-magnetic
          >
            Book a call ↗
          </a>
          <a href="mailto:hello@micahjonesconsulting.com" data-cursor>
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
