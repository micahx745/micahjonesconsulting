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
import Image from "next/image";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PortraitImage } from "@/components/PortraitImage";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Operator, not consultant",
  description:
    "A decade inside B2B software: go-to-market in the morning, shipping product in the afternoon. Four exits behind my work, $5B+ combined. Oakland, CA.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/about" },
  openGraph: {
    title: "Operator, not consultant — Micah Jones",
    description:
      "A decade inside B2B software: go-to-market in the morning, shipping product in the afternoon. Four exits behind my work, $5B+ combined.",
    type: "profile",
    url: "https://www.micahjonesconsulting.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <OpeningWorld name="bone" />
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
              {/* Next 16's RSC serializer drops the leading space of a text
                  node that follows an inline element WHEN that text contains
                  an HTML ENTITY, so this line shipped as "$20M+in client
                  revenue" — the first receipt on the page, live.

                  The documented fix was an explicit {" "} join, and the
                  comment here claimed one for three passes while the code
                  used a literal space. That is not carelessness: prettier
                  COLLAPSES `</strong>{" "}` + newline back into a literal
                  space whenever the result fits on one line, so the
                  prescribed fix silently un-applies itself on the next
                  format. That is why LESSONS #6 kept recurring.

                  The durable fix is to remove the TRIGGER. The entity is
                  what makes the serializer drop the space, so the en-dash is
                  written as a literal character. No entity, no drop, and
                  nothing for prettier to undo. Enforced by the render-gate
                  GLUE check, which reads the rendered bytes. */}
              <strong>$20M+</strong> in client revenue (2013–2023).
            </li>
            <li>
              {/* Four-exit update (operator, 2026-08-30): Postmates joins.
                  Role split stays honest: two cap-table, one helped launch,
                  one worked inside. $5B+ = disclosed deal values only
                  (Uber $2.65B + SVMK IPO $2.33B + Akamai $600M; Neuton
                  undisclosed) — sources in content/citations.ts. */}
              <strong>Four companies I worked inside reached an exit.</strong>{" "}
              Postmates (Uber, 2020). TechValidate (held through the
              SurveyMonkey IPO, 2018). Guardicore (Akamai, 2021). Neuton.AI
              (technology acquired by Nordic Semiconductor, 2025). Two carried
              my name on the cap table; the disclosed deals total{" "}
              <strong>$5B+</strong>.
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

          {/* Pass-76. The second photograph the operator asked for, placed
              here rather than in the intro because the Guardicore exit is the
              bullet directly above it — the picture is that engagement. Same
              frame as the /work exhibit; see that file's header for the crop
              and sticker-removal notes. */}
          <figure className="cw-ab-fig">
            <Image
              src="/guardicore-telaviv-session.jpg"
              alt="A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."
              width={770}
              height={575}
              sizes="(min-width: 900px) 620px, 100vw"
              className="cw-ab-fig__img"
            />
            <figcaption className="cw-ab-fig__cap">
              Working session <span aria-hidden>·</span> Tel Aviv{" "}
              <span aria-hidden>·</span> 2018&ndash;2021
            </figcaption>
          </figure>

          <h2 className="cw-about__h">What I&rsquo;m known for</h2>
          <ul className="cw-about__list">
            <li>
              {/* Pass-67: was "average deal size moved $150K", the delta claim
                  the operator superseded on 2026-09-01 with an absolute of
                  $1.2M. The case study was swept the same day; this page was
                  missed, so a retired figure sat live for hours. LESSONS #3
                  bans restating the $150K version. Removing the em-dash also
                  brings this page under the one-per-page cap. */}
              <strong>Positioning research that moves deal size.</strong> The
              Guardicore engagement that ended in the Akamai acquisition began
              with a single rewritten sentence. The average enterprise deal
              there was $1.2M.
            </li>
            <li>
              {/* Pass-67: was "for an HR consultant returned 4× platform lift".
                  Two defects. The sector label leaked a client the ledger
                  anonymises, and it did so next to a redirect that used to name
                  them. And 4× is the two-prioritised-platforms-beat-the-third
                  figure, not the reach lift, so quoting it here read as a
                  contradiction of the case study's 36×. Now the case study's
                  own headline numbers, which trace. */}
              {/* Pass-78: this credited ONE product with BOTH results. The
                  close rate was doubled by the RFP software (see
                  /work/rfp-engine), not by the content engine, and
                  content-engine.mdx makes no close-rate claim at all. Same
                  author, two separate engagements. Now split, each clause
                  naming the thing that produced its own number. "for the same
                  author", not "next": the build order is not on record. */}
              <strong>GTM systems that compound.</strong> For one industry
              author, a content engine took monthly reach from 8,000 to 290,000
              in five months. The RFP software I built for the same author
              doubled their close rate inside six months.
            </li>
            <li>
              <strong>End-to-end product builds.</strong> Ordani,
              HIPAA-compliant practice management for birth workers, with active
              paying users in beta. I founded it and I write the code. Public
              release coming.
            </li>
          </ul>

          <h2 className="cw-about__h">Currently</h2>
          {/* Origin line (operator, 2026-08-30, his words polished per his
              instruction): infant mortality + giving birth workers their
              hours back. Deliberately uncited prose; the CDC-cited figures
              live in the Ordani case study via citations.ts. */}
          <p>
            Building <strong>Ordani</strong>. This country loses too many
            mothers and infants, and the people working hardest to change that
            were buried in the business side of the work. I built the tool that
            hands them their hours back, so the work stays about the mothers and
            the babies.
          </p>
          {/* Pass-83 (review #25): "a limited number of" was scarcity with no
              ledger behind it, and "advisory" narrowed the offer to the
              talking shape when the lede two screens up says I ship on the
              same engagement. Now the plain picture, and the page's only
              link to what I sell. */}
          <p>
            Alongside it: <a href="/services">engagements</a> with teams where
            the sales side and the product side have stopped talking to each
            other. I sit on both sides until they do.
          </p>
          {/* Internal link added 2026-09-02: an SEO pass found only two
              contextual links into /playbook on the whole site, and none from
              the author page, which is where a reader who trusts him goes
              next. Phrased so it claims the book exists, not that it is
              currently for sale. */}
          <p>
            I also wrote <a href="/playbook">The 80% Wall</a>, a field manual on
            the part of a build the AI leaves to you once the demo works.
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
