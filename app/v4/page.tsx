// app/v4/page.tsx
//
// /v4 — preserved "Two Hands" home (warm paper + workshop orange +
// Fraunces display + useSpring image follow). Saved before pivoting to
// "Color Worlds" at /. Archived verbatim 2026-05-19.
import type { Metadata } from "next";
import { ClientList } from "@/components/two-hands/ClientList";
import type { ClientListItem } from "@/components/two-hands/ClientList";

export const metadata: Metadata = {
  title: "Two Hands — archived home",
  description:
    "Preserved snapshot of the Two Hands (warm paper) home. Superseded by the Color Worlds direction at /.",
  robots: { index: false, follow: false },
};

const CLIENT_ITEMS: ClientListItem[] = [
  {
    href: "/work/akamai",
    handle: "Trim",
    title: "Guardicore / Akamai — positioning research",
    sector: "Enterprise security",
    year: "2020",
  },
  {
    href: "/work/hr-equity-author",
    handle: "Reach",
    title: "HR consultant — content + algorithm system",
    sector: "Author platform",
    year: "2024–2025",
  },
];

interface Artifact {
  href?: string;
  title: string;
  category: string;
  status?: string;
  desc: string;
}

const WORKSHOP_ARTIFACTS: Artifact[] = [
  {
    href: "/work/ordani",
    title: "ORDANI",
    category: "Software · HIPAA",
    status: "In beta",
    desc: "A HIPAA-grade CRM for birth workers — solo build on Next.js + Supabase. Fourteen doulas use it daily in private beta.",
  },
  {
    href: "/work/passioneer",
    title: "Passioneer",
    category: "Software · AI",
    status: "Building",
    desc: "An AI content platform. Case study draft pending client sign-off; details in Q3 2026.",
  },
  {
    title: "RAVEN",
    category: "Hardware",
    desc: "A hand-built field comms unit. Photography forthcoming.",
  },
  {
    title: "Cyberdeck",
    category: "Hardware",
    desc: "Portable Linux deck — modular, 3D-printed chassis, mechanical input. In service.",
  },
  {
    title: "Field comms",
    category: "Hardware · Network",
    desc: "OVERSEER NETWORK and a Meshtastic mesh — local off-grid messaging across the Bay.",
  },
  {
    title: "Bambu prints",
    category: "Hardware · Print",
    desc: "Printed on a Bambu Lab P2S — fixtures, brackets, and one-off enclosures for the rest of the workshop.",
  },
];

export default function ArchivedTwoHandsHome() {
  return (
    <div className="th-page">
      <section className="th-hero" aria-labelledby="th-hero-line">
        <h1 id="th-hero-line" className="th-hero__line">
          I&rsquo;m a builder. I build software, hardware,{" "}
          <span className="th-hero__and">and</span> the go-to-market that makes
          them sell — for clients, <span className="th-hero__and">and</span>{" "}
          for myself.
        </h1>
        <div className="th-hero__meta" aria-label="Status">
          <div className="th-hero__meta-line">
            <span className="th-hero__meta-key">Based in</span>
            <span className="th-hero__meta-val">Oakland, CA</span>
          </div>
          <div className="th-hero__meta-line">
            <span className="th-hero__meta-key">Currently</span>
            <span className="th-hero__meta-val">
              Building ORDANI · by appointment
            </span>
          </div>
        </div>
      </section>

      <section id="clients" className="th-section" aria-labelledby="th-clients-title">
        <header className="th-section__head">
          <span className="th-section__num">01 · Clients</span>
          <h2 id="th-clients-title" className="th-section__title">
            What I build for clients.
          </h2>
        </header>
        <ClientList items={CLIENT_ITEMS} />
      </section>

      <section id="workshop" className="th-section" aria-labelledby="th-workshop-title">
        <header className="th-section__head">
          <span className="th-section__num">02 · Workshop</span>
          <h2 id="th-workshop-title" className="th-section__title">
            What I build for myself.
          </h2>
        </header>
        <ul className="th-workshop-grid">
          {WORKSHOP_ARTIFACTS.map((a) => (
            <li key={a.title} className="th-artifact">
              <div className="th-artifact__plate">
                {a.status ? (
                  <span className="th-artifact__status">{a.status}</span>
                ) : null}
                <span className="th-artifact__placeholder">
                  {a.title} — photo forthcoming
                </span>
              </div>
              <div className="th-artifact__head">
                <h3 className="th-artifact__title">
                  {a.href ? <a href={a.href}>{a.title}</a> : a.title}
                </h3>
                <span className="th-artifact__category">{a.category}</span>
              </div>
              <p className="th-artifact__desc">{a.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="companies" className="th-section" aria-labelledby="th-companies-title">
        <header className="th-section__head">
          <span className="th-section__num">03 · Companies</span>
          <h2 id="th-companies-title" className="th-section__title">
            The companies.
          </h2>
        </header>
        <div className="th-companies">
          <span className="th-companies__years">2013 — 2023</span>
          <div>
            <p className="th-companies__list">
              Worked across growth, GTM, and platform strategy with{" "}
              <strong>Guardicore</strong>, <strong>Akamai</strong>,{" "}
              <strong>SurveyMonkey</strong>, <strong>Flexport</strong>,{" "}
              <strong>Cuebiq</strong>, <strong>Postmates</strong>,{" "}
              <strong>Bell Integrator</strong>, and <strong>Moola</strong>.
            </p>
            <p className="th-companies__footnote">
              Per-engagement attribution available under NDA. Tens of millions
              in revenue moved across the decade.
            </p>
          </div>
        </div>
      </section>

      <section id="book" className="th-section" aria-labelledby="th-book-title">
        <header className="th-section__head">
          <span className="th-section__num">04 · Book</span>
          <h2 id="th-book-title" className="th-section__title">
            Book an intro call.
          </h2>
        </header>
        <div className="th-book">
          <span className="th-companies__years">Two-day reply</span>
          <div className="th-book__body">
            <p className="th-book__lede">
              I&rsquo;ve spent ten years sitting between the people who build
              the product and the people who sell it, doing both jobs when I
              had to. Now I take on founders who need both halves to talk to
              each other — and I build my own things on the same workbench.
            </p>
            <a
              href="mailto:hello@micahjonesconsulting.com?subject=Intro call"
              className="th-book__cta"
            >
              <span>Book an intro call</span>
              <span className="th-book__cta-arrow" aria-hidden>
                →
              </span>
            </a>
            <p className="th-book__alt">
              Or write directly —{" "}
              <a href="mailto:hello@micahjonesconsulting.com">
                hello@micahjonesconsulting.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
