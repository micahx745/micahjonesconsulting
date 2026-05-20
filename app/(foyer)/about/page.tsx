// app/(foyer)/about/page.tsx
//
// /about — depth bio for E-E-A-T + topical authority. This is the page
// Google + AI tools cite when answering "who is Micah Jones" / "Black
// operator Oakland" / "operator with two exits."
//
// Content discipline: facts the operator can defend. No hyperbole.
// Numbers that are real. Names that exist.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Micah Jones",
  description:
    "Independent operator in Oakland. $17M+ in client revenue. Two exits — Guardicore → Akamai, TechValidate → SurveyMonkey. Now building Ordani.",
  alternates: { canonical: "https://micahjonesconsulting.com/about" },
  openGraph: {
    title: "About — Micah Jones",
    description:
      "Independent operator in Oakland. $17M+ in client revenue. Two exits. Building Ordani.",
    type: "profile",
    url: "https://micahjonesconsulting.com/about",
  },
};

export default function AboutPage() {
  return (
    <section
      className="cw-block"
      data-section
      data-world="bone"
      aria-labelledby="cw-about-title"
    >
      <p className="cw-kicker">About</p>
      <h1 id="cw-about-title" className="cw-secttitle">
        Operator, not consultant.
      </h1>

      <div className="cw-about">
        <p className="cw-about__lede">
          I&rsquo;ve spent a decade inside B2B software companies as the
          person who can sit on either side of the table: GTM strategy in
          the morning, shipping product in the afternoon. Most consultants
          don&rsquo;t ship. Most builders don&rsquo;t sell. I do both, on
          the same engagement, for the same fee.
        </p>

        <h2 className="cw-about__h">Receipts</h2>
        <ul className="cw-about__list">
          <li>
            <strong>$17M+</strong> in attributable client revenue across
            engagements 2013&ndash;2023.
          </li>
          <li>
            Contributed to <strong>two acquisitions</strong>: Guardicore
            (acquired by Akamai, 2021) and TechValidate (acquired by
            SurveyMonkey, 2015).
          </li>
          <li>
            Engagements with <strong>Guardicore, TechValidate, Flexport,
            Cuebiq, Postmates</strong>, and others — Growth, GTM, and
            platform strategy roles.
          </li>
        </ul>

        <h2 className="cw-about__h">What I&rsquo;m known for</h2>
        <ul className="cw-about__list">
          <li>
            <strong>Positioning research that moves deal-size.</strong> The
            Guardicore engagement that became the Akamai acquisition began
            with a single rewritten sentence — average deal size moved
            $150K.
          </li>
          <li>
            <strong>GTM systems that compound.</strong> Algorithm strategy +
            content systems for an HR consultant returned 4× platform lift
            and RFP wins inside one year.
          </li>
          <li>
            <strong>End-to-end product builds.</strong> Ordani — HIPAA-grade
            CRM for birth workers — solo build on Next.js + Supabase. Live
            beta with users.
          </li>
        </ul>

        <h2 className="cw-about__h">Currently</h2>
        <p>
          Building <strong>Ordani</strong> in private beta. Taking on a
          limited number of advisory engagements with founders at the
          product-and-GTM seam — the ones where the sales team and product
          team have stopped talking to each other.
        </p>

        <h2 className="cw-about__h">Where to find me</h2>
        <ul className="cw-about__list">
          <li>Oakland, CA &middot; by appointment</li>
          <li>
            <a href="mailto:hello@micahjonesconsulting.com">
              hello@micahjonesconsulting.com
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/micahjones/"
              rel="me noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
        </ul>

        <p className="cw-about__back">
          <a href="/">&larr; Back to home</a>
        </p>
      </div>
    </section>
  );
}
