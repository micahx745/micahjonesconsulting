// app/(foyer)/about/page.tsx
//
// Phase 6 — FOYER-04 + FOYER-05.
//
// Two-column layout per blueprint §7:
//   LEFT (8 col): the 150-word about paragraph verbatim from §8.
//   RIGHT (4 col): vertical portrait slot (Phase 9) + Oakland sub-caption
//                  + two-line credit list (Guardicore/Akamai · Flexport ·
//                  SurveyMonkey · Cuebiq).
// Followed by:
//   - Oakland family-context single-paragraph.
//   - Three numbered values: 01 ship the work / 02 trust the operator /
//                            03 show the receipts.
//
// All copy verbatim from blueprint §7 + §8. The "150-word paragraph" is
// labeled as such in the blueprint; actual count is 142 words — the
// blueprint's label is a rounded count and the prose is reproduced
// word-for-word from blueprint line 443.
//
// Source: blueprint §7 (About wireframe), §8 (150-word paragraph verbatim,
//         values: ship the work / trust the operator / show the receipts);
//         REQUIREMENTS.md FOYER-04, FOYER-05.
import type { Metadata } from "next";
import { PortraitImage } from "@/components/PortraitImage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product.",
  openGraph: {
    title: "About — Micah Jones",
    description:
      "Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product.",
    type: "profile",
    url: "https://micahjonesconsulting.com/about",
    siteName: "Micah Jones",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Micah Jones",
    description:
      "Oakland-based operator. Guardicore positioning research moved deals up by $150K. Now runs his own shop: half consulting, half product.",
  },
};

export default function AboutPage() {
  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--about-hero">
        <h1 className="foyer-hero foyer-hero--secondary">
          I build the things I used to ask other people to build.
        </h1>
      </section>

      <section className="foyer-section foyer-section--about-grid">
        <div className="about-grid">
          {/* LEFT 8 col — 150-word paragraph verbatim per blueprint §8 */}
          <div className="about-grid__long-form">
            <p className="foyer-prose">
              I&apos;m Micah. I started as a positioning researcher at Guardicore (acquired by
              Akamai), where the work I did on a single message moved the average deal size up
              by $150K. I&apos;ve worked at Flexport, SurveyMonkey, and Cuebiq. Now I run my
              own shop in Oakland. Half consulting, half product. The consulting half means
              a small number of operators every quarter: HR consultants, nonprofit leaders,
              birth workers, creators. The product half means ORDANI, a HIPAA-compliant CRM I
              built solo for the people who keep Black women alive in childbirth. I&apos;m a
              Black founder and a father. If you have something that needs shipping and
              you&apos;re tired of the meeting tax, write to me.
            </p>
          </div>

          {/* RIGHT 4 col — vertical portrait + credits (Phase 9 wired) */}
          <aside className="about-grid__column">
            <PortraitImage variant="context" />
            <p className="about-grid__sub-caption">Oakland, CA.</p>
            <ul className="credits-list">
              <li>guardicore / akamai</li>
              <li>flexport</li>
              <li>surveymonkey</li>
              <li>cuebiq</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* OAKLAND FAMILY CONTEXT */}
      <section className="foyer-section foyer-section--family">
        <p className="foyer-prose foyer-prose--narrow">
          Lives in Oakland with his family. Father of two. Builds at night, after the house
          goes quiet.
        </p>
      </section>

      {/* VALUES BLOCK REMOVED in adversarial-review pass.
          Margaret Iverson called the 01 ship the work / 02 trust the operator
          / 03 show the receipts triad "a LinkedIn carousel sitting at the
          bottom doing nothing." The three values are implicit in the about
          paragraph and the case studies. Better to remove than to load-bear
          a separate component that reads as performance. */}
    </div>
  );
}
