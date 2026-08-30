// app/(foyer)/about/page.tsx
//
// /about — depth bio for E-E-A-T + topical authority. This is the page
// Google + AI tools cite when answering "who is Micah Jones" / "Black
// operator Oakland" / "operator with three exits."
//
// Content discipline: facts the operator can defend. No hyperbole.
// Numbers that are real. Names that exist.
import type { Metadata } from "next";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { PortraitImage } from "@/components/PortraitImage";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "About",
  description:
    "Independent operator in Oakland. Four exits behind my work: Postmates → Uber, TechValidate → SurveyMonkey IPO, Guardicore → Akamai, Neuton.AI → Nordic Semiconductor. $5B+ combined. $20M+ in client revenue. Now building Ordani, used by 200 birth workers.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/about" },
  openGraph: {
    title: "About — Micah Jones",
    description:
      "Independent operator in Oakland. Four exits behind my work, $5B+ combined. $20M+ in client revenue. Building Ordani, used by 200 birth workers.",
    type: "profile",
    url: "https://www.micahjonesconsulting.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* INTRO — bone. Calm editorial opening; mirrors the home's
          about-brief register. */}
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

        {/* Two-column intro: lede left, portrait right — the design review's
            "/about spends half a 1440px canvas on nothing" note. The portrait
            renders only once public/portrait-context.jpg exists; until then
            PortraitImage returns null and .cw-about-intro collapses to the
            single column it is today (see globals.css :has() rule). */}
        <div className="cw-about-intro">
          <div className="cw-about">
            <p className="cw-about__lede">
              I&rsquo;ve spent a decade inside B2B software companies as the
              person who can sit on either side of the table: GTM strategy in
              the morning, shipping product in the afternoon. Most consultants
              don&rsquo;t ship. Most builders don&rsquo;t sell. I do both, on
              the same engagement, for the same fee.
            </p>
          </div>
          <PortraitImage variant="context" />
        </div>
      </section>

      {/* RECEIPTS onward — espresso. D10 (operator-locked 2026-08):
          the site's one signature gesture (palette-shift, R9) now has an
          instance on /about — the lights dim as the page moves from
          intro into proof, matching the home's Shipped section which
          uses the same espresso world for its evidence beat. */}
      <section
        className="cw-block"
        data-section
        data-world="espresso"
        aria-labelledby="cw-about-receipts-title"
      >
        <div className="cw-about">
          <h2 id="cw-about-receipts-title" className="cw-about__h">
            Receipts
          </h2>
          <ul className="cw-about__list">
            <li>
              {/* Explicit {" "} join: Next 16's RSC serializer drops the
                  leading space of a text node that follows an inline
                  element WHEN the text contains an HTML entity (verified
                  against the built output — the review's "$20M+in" catch). */}
              <strong>$20M+</strong>{" "}in client revenue (2013&ndash;2023).
            </li>
            <li>
              {/* Four-exit update (operator, 2026-08-30): Postmates joins.
                  Role split stays honest: two cap-table, one helped launch,
                  one worked inside. $5B+ = disclosed deal values only
                  (Uber $2.65B + SVMK IPO $2.33B + Akamai $600M; Neuton
                  undisclosed) — sources in content/citations.ts. */}
              <strong>Four companies I worked inside reached an exit.</strong>{" "}
              Postmates (Uber, 2020). TechValidate (held through the
              SurveyMonkey IPO, 2018). Guardicore (Akamai, 2021).
              Neuton.AI (technology acquired by Nordic Semiconductor,
              2025). Two carried my name on the cap table; the disclosed
              deals total <strong>$5B+</strong>.
            </li>
            <li>
              {/* W3 (D9/R13, operator-locked): Flexport/Cuebiq/Postmates
                  cut — named companies carried no figure. Guardicore and
                  TechValidate stay named in the exits bullet above, where
                  their figures live. */}
              Growth, GTM, and platform strategy roles across a decade of
              enterprise software.
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
              <strong>End-to-end product builds.</strong>{" "}Ordani &mdash; HIPAA-grade
              practice management used by 200 birth workers. Solo
              build on Next.js + Supabase. Live beta.
            </li>
          </ul>

          <h2 className="cw-about__h">Currently</h2>
          <p>
            Building <strong>Ordani</strong> in private beta. Taking on a
            limited number of advisory engagements with teams at the
            product-and-GTM seam — where the sales team and the product
            team have stopped talking to each other.
          </p>
          <p>
            <a href="/work">See the case studies →</a>
          </p>

          {/* "Where to find me" list removed — the logistics footer below
              carries email/LinkedIn/location now (no duplication). */}
          {/* W3 (P1-7/R18): the bare back-link page-ending is replaced by
              the standard logistics footer. Home stays one nav-click away. */}
          <PageFooter />
        </div>
      </section>
    </>
  );
}
