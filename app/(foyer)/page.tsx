// app/(foyer)/page.tsx
//
// Color Worlds home — single long-scroll. Sections set data-world on
// themselves; WorldSwitcher observes them and cross-fades the page
// palette as each crosses viewport center.
//
// Section order + worlds (Terracotta Workshop palette):
//   Hero       → terracotta
//   Marquee    → terracotta
//   Clients    → bone
//   Ordani     → petrol   (live beta + email signup)
//   Products   → espresso
//   Companies  → espresso
//   Footer     → terracotta
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
  // Absolute title prevents the root template ("%s — Micah Jones") from
  // double-suffixing on the home page. Other routes still get the suffix.
  title: {
    absolute:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
  },
  description:
    "Independent operator. $17M+ in client revenue. Two exits: Guardicore → Akamai, TechValidate → SurveyMonkey. Now building Ordani in Oakland.",
  alternates: { canonical: "https://www.micahjonesconsulting.com" },
  openGraph: {
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "Independent operator. $17M+ in client revenue. Two exits. Now building Ordani in Oakland.",
    type: "website",
    url: "https://www.micahjonesconsulting.com",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Micah Jones — Strategy and software, shipped by the same pair of hands",
    description:
      "Independent operator. $17M+ in client revenue. Two exits. Now building Ordani in Oakland.",
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

// Marquee shows companies Micah BUILT AT — not the companies that
// acquired them. Akamai and SurveyMonkey are the acquirers and they
// already appear in the exits credibility line; including them here
// would double-bill the same achievement.
const COMPANIES = [
  "Guardicore",
  "TechValidate",
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

        <ul className="cw-worklist cw-reveal">
          {CLIENT_OFFERS.map((row) => (
            <li key={row.n} className="cw-workrow">
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
          <li className="cw-card cw-reveal">
            <a href="/work/hr-equity-author" className="cw-card__link">
              <span className="cw-tag">Author platform</span>
              <h3>Algorithm + content for an author</h3>
              <p>
                Multi-platform algorithm and content strategy for an author
                working in HR and organizational change. Inbound proposal
                wins. A 25+ page playbook. Two of three named platforms
                outperformed the third by 4&times;.
              </p>
              <span className="cw-open">See the engagement →</span>
            </a>
          </li>
          <li className="cw-card cw-reveal">
            <a href="/about" className="cw-card__link">
              <span className="cw-tag">Enterprise software · 2013–2023</span>
              <h3>GTM at scale</h3>
              <p>
                Growth, GTM, and platform strategy at companies acquired
                by Akamai and SurveyMonkey, plus engagements across
                Flexport, Cuebiq, and Postmates. A decade of moving the
                numbers in B2B software.
              </p>
              <span className="cw-open">See the receipts →</span>
            </a>
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
          2013 — 2023 · Growth, GTM &amp; platform strategy
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

      {/* FOOTER — terracotta */}
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
            href="https://calendly.com/micahmccoyjones/introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call ↗
          </a>
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
