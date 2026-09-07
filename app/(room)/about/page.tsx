// app/(room)/about/page.tsx
//
// /about — depth bio for E-E-A-T + topical authority. This is the page
// Google + AI tools cite when answering "who is Micah Jones" / "Black
// operator Oakland" / "operator with three exits."
//
// Content discipline: facts the operator can defend. No hyperbole.
// Numbers that are real. Names that exist.
//
// PASS-101 PHASE 3 (WINNING-BRIEF §14.2, §14.7; brief §3: "/about: the
// operator section's register (clip B as a ground on /about, the register
// rows)"). The page now OPENS on the operator section from the mock, at page
// scale: clip B fills a square stage, "Operator, not consultant." sits over
// its lower third on the measured veil, and the argument runs down the right
// column as a register of hairline rows.
//
// Every string is the string that was on this page. The two halves of the
// opening lede are split at its own sentence boundary — the first sentence
// opens the register column, the last three sit over the film, which is where
// §14.2 puts them. The three Receipts bullets become the three register rows
// they already were. Nothing is composed, and no figure moves: $20M+ since
// 2013, four exits, $5B+ disclosed, $1.2M average deal, 8,000 to 290,000, all
// as they stood.
//
// The film is R12/R15-cleared by §5: a filmed loop of the operator is the
// photograph moving, not UI animation, and the reduced-motion branch (poster,
// no video) is the discharge. It is held still — no parallax, no hover, no
// scale beyond the fixed framing zoom that never changes.
//
// <PortraitImage /> stays mounted and still renders NOTHING until a real file
// exists in public/ (the documented operator drop-in flow in .claude/CLAUDE.md
// must keep working). It moved from the old two-column intro, which the film
// replaces, to the "Currently" block.
import type { Metadata } from "next";
import Image from "next/image";
import { PortraitImage } from "@/components/PortraitImage";
import { OperatorFilm } from "@/components/room/OperatorFilm";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Operator, not consultant",
  description:
    "Thirteen years inside B2B software: go-to-market in the morning, shipping product in the afternoon. Four exits behind my work, $5B+ combined. Oakland, CA.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/about" },
  openGraph: {
    title: "Operator, not consultant — Micah Jones",
    description:
      "Thirteen years inside B2B software: go-to-market in the morning, shipping product in the afternoon. Four exits behind my work, $5B+ combined.",
    type: "profile",
    url: "https://www.micahjonesconsulting.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* §14.2 — the overlay. The film is the focus: no band above it, no
          heading below the frame. */}
      <section
        className="rl-op rl-wrap rl-first"
        aria-labelledby="rl-about-title"
      >
        <div className="rl-opgrid">
          <div className="rl-opstage">
            <OperatorFilm label="Micah at a workshop table with colleagues" />
            <div className="rl-opover">
              <h1 id="rl-about-title" className="rl-d two" data-rl="head">
                <span className="r">Operator,</span>
                <span className="r">not consultant.</span>
              </h1>
              <p>
                Most consultants don&rsquo;t ship. Most builders don&rsquo;t
                sell. I do both, on the same engagement, for the same fee.
              </p>
            </div>
          </div>

          <div className="rl-opside">
            <p className="m-first">
              Most consultants don&rsquo;t ship. Most builders don&rsquo;t sell.
              I do both, on the same engagement, for the same fee.
            </p>
            <p>
              I&rsquo;ve spent thirteen years inside B2B software companies as
              the person who can sit on either side of the table: GTM strategy
              in the morning, shipping product in the afternoon.
            </p>

            <h2 className="rl-l">Receipts</h2>
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
            {/* Operator ruling 2026-09-02: the $20M+ HOLDS TO TODAY. The
                closed range read as a practice that stopped in 2023, two
                lines above a heading called "Currently". Ledgered in
                LESSONS #3 as "since 2013", open-ended. */}
            <ul className="lead" data-rl-group="register">
              <li>
                <strong>$20M+</strong> in client revenue since 2013.
              </li>
              {/* Four-exit update (operator, 2026-08-30): Postmates joins.
                  Role split stays honest: two cap-table, one helped launch,
                  one worked inside. $5B+ = disclosed deal values only
                  (Uber $2.65B + SVMK IPO $2.33B + Akamai $600M; Neuton
                  undisclosed) — sources in content/citations.ts. */}
              <li>
                <strong>Four companies I worked inside reached an exit.</strong>{" "}
                Postmates (Uber, 2020). SurveyMonkey (IPO, 2018). Guardicore
                (Akamai, 2021). Neuton.AI (technology acquired by Nordic
                Semiconductor, 2025). SurveyMonkey and Guardicore carried my
                name on the cap table; the disclosed deals total{" "}
                <strong>$5B+</strong>.
              </li>
              {/* W3 (D9/R13, operator-locked): Flexport/Cuebiq/Postmates
                  cut — named companies carried no figure. Guardicore and
                  TechValidate stay named in the exits bullet above, where
                  their figures live. */}
              <li>
                Growth, GTM, and platform strategy roles across thirteen years
                of enterprise software.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rl-wrap rl-sec-air" aria-labelledby="rl-known-title">
        {/* Pass-76. The second photograph the operator asked for, placed
            here rather than in the intro because the Guardicore exit is the
            receipt directly above it — the picture is that engagement. Same
            frame as the /work exhibit; see that file's header for the crop
            and sticker-removal notes. */}
        <figure className="rl-figure rl-figure--half" data-rl="media">
          <Image
            src="/guardicore-telaviv-session.jpg"
            alt="A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."
            width={770}
            height={575}
            sizes="(min-width: 900px) 620px, 100vw"
          />
        </figure>

        <div className="rl-sec rl-sec--wide rl-air-l">
          <h2 id="rl-known-title" className="rl-d two" data-rl="head">
            What I&rsquo;m known for
          </h2>
        </div>

        <ul className="rl-ledger" data-rl-group="known">
          {/* Pass-67: was "average deal size moved $150K", the delta claim
              the operator superseded on 2026-09-01 with an absolute of
              $1.2M. The case study was swept the same day; this page was
              missed, so a retired figure sat live for hours. LESSONS #3
              bans restating the $150K version. Removing the em-dash also
              brings this page under the one-per-page cap. */}
          <li data-rl="rule">
            <span className="term">
              Positioning research that moves deal size.
            </span>
            <span className="stmt">
              The Guardicore engagement that ended in the Akamai acquisition
              began with a single rewritten sentence. The average enterprise
              deal there was $1.2M.
            </span>
          </li>
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
          <li data-rl="rule">
            <span className="term">GTM systems that compound.</span>
            <span className="stmt">
              For one industry author, a content engine took monthly reach from
              8,000 to 290,000 in five months. The RFP software I built for the
              same author doubled their close rate inside six months.
            </span>
          </li>
          <li data-rl="rule">
            <span className="term">End-to-end product builds.</span>
            <span className="stmt">
              Ordani, HIPAA-compliant practice management for birth workers,
              with active paying users in beta. I founded it and I write the
              code. Public release coming.
            </span>
          </li>
        </ul>
      </section>

      <section className="rl-wrap rl-sec-air" aria-labelledby="rl-now-title">
        <div className="rl-sec rl-sec--wide">
          <h2 id="rl-now-title" className="rl-d two" data-rl="head">
            Currently
          </h2>
        </div>
        <div className="rl-two">
          <div className="rl-two__l">
            {/* Origin line (operator, 2026-08-30, his words polished per his
                instruction): infant mortality + giving birth workers their
                hours back. Deliberately uncited prose; the CDC-cited figures
                live in the Ordani case study via citations.ts. */}
            <p className="rl-lede" data-rl="rise">
              Building <strong>Ordani</strong>. This country loses too many
              mothers and infants, and the people working hardest to change that
              were buried in the business side of the work. I built the tool
              that hands them their hours back, so the work stays about the
              mothers and the babies.
            </p>
            {/* Pass-83 (review #25): "a limited number of" was scarcity with no
                ledger behind it, and "advisory" narrowed the offer to the
                talking shape when the lede two screens up says I ship on the
                same engagement. Now the plain picture, and the page's only
                link to what I sell. */}
            {/* Capacity, operator 2026-09-03: "Im taking work. No need to put
                specifics on how many." A referrer could not tell from this page
                whether he was available at all - it said "Building Ordani" and
                then described engagements in the abstract. No count: an invented
                number reads as a tactic, and a real one has to be maintained. */}
            <p className="rl-body rl-air-m" data-rl="rise">
              Alongside it:{" "}
              <a href="/services" className="rl-link">
                engagements
              </a>{" "}
              with teams where the sales side and the product side have stopped
              talking to each other. I sit on both sides until they do. I am
              taking new engagements now.
            </p>
            {/* Internal link added 2026-09-02: an SEO pass found only two
                contextual links into /playbook on the whole site, and none from
                the author page, which is where a reader who trusts him goes
                next. Phrased so it claims the book exists, not that it is
                currently for sale. */}
            <p className="rl-body rl-air-s" data-rl="rise">
              I also wrote{" "}
              <a href="/playbook" className="rl-link">
                The 80% Wall
              </a>
              , a field manual on the part of a build the AI leaves to you once
              the demo works.
            </p>
            <div className="rl-chips rl-air-m" data-rl="rise">
              <a className="rl-chip" href="/work">
                <span className="t">See the case studies</span>
                <span className="a" aria-hidden>
                  <span>&#8594;</span>
                </span>
              </a>
            </div>
          </div>
          <div className="rl-two__r">
            <PortraitImage variant="context" />
          </div>
        </div>
      </section>
    </>
  );
}
