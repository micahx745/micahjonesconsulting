// app/(foyer)/work/page.tsx
//
// /work — case study index. Pass-58 rebuild (operator 2026-09-01:
// "work page is weird and weak"). The old page was a kicker, a title,
// and three bare rows. Now each engagement carries its receipts: the
// one figure-bearing line, up to three stat objects (frontmatter
// `stats` — every figure also appears in the study body, LESSONS #2),
// role · year, and one link. Same proof grammar /services uses.
import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Work",
  description:
    "Four case studies with the receipts attached: an acquired security platform, a HIPAA-compliant company I founded, and the content and RFP engines I built for an industry author.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/work" },
  openGraph: {
    title: "Work — Micah Jones",
    description:
      "Four case studies with the receipts attached: an acquired security platform, a HIPAA-compliant company I founded, and the content and RFP engines I built for an industry author.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/work",
  },
};

export default async function WorkIndexPage() {
  // Stubs stay out of the public index (Pass-6 review: readers clicked
  // into Passioneer expecting a case study and found a placeholder).
  const studies = (await getAllCaseStudies()).filter(
    (cs) => cs.status !== "stub",
  );

  return (
    <section
      className="cw-block cw-wk"
      data-section
      data-world="bone"
      aria-labelledby="cw-work-title"
    >
      <p className="cw-kicker">Work</p>
      <h1 id="cw-work-title" className="cw-secttitle">
        Four engagements. Receipts attached.
      </h1>
      <p className="cw-wk__lede">
        An acquired security platform, a company I founded, and two systems I
        built for an industry author. Every number below comes from the study it
        sits next to.
      </p>

      <ol className="cw-wk-list">
        {studies.map((s, i) => (
          <li key={s.slug} className="cw-wk-item">
            <a href={`/work/${s.slug}`} className="cw-wk-item__link">
              <div className="cw-wk-item__lead">
                <p className="cw-wk-item__num">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="cw-wk-item__title">{s.title}</h2>
                <p className="cw-wk-item__line">
                  {s.indexLine ?? `${s.dek.split(". ")[0]}.`}
                </p>
                <p className="cw-wk-item__meta">
                  <span>{s.role}</span>
                  <span aria-hidden> &middot; </span>
                  <span>{s.year}</span>
                </p>
                <span className="cw-wk-item__cta">
                  Read the case study <span aria-hidden>→</span>
                </span>
              </div>
              {s.stats && s.stats.length > 0 ? (
                <ul className="cw-wk-stats" aria-label="Outcome at a glance">
                  {s.stats.map((st) => (
                    <li key={st.lbl}>
                      <strong>{st.fig}</strong>
                      <span>{st.lbl}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </a>
          </li>
        ))}
      </ol>

      <PageFooter />
    </section>
  );
}
