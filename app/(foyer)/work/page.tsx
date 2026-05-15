// app/(foyer)/work/page.tsx
//
// Phase 6 — FOYER-08.
//
// Lists every case study from content/work/*.mdx as a TitleCardComposition
// thumbnail with a ViewTransitionLink wrapper. Uses lib/case-studies.ts —
// which Phase 7 will extend with a Zod schema and Phase 8 will populate
// with real case studies. For Phase 6, only test-slug.mdx is present, so
// the Work index renders a single thumbnail.
//
// Thumbnails use TitleCardComposition (static, server-safe) NOT TitleCard
// (client + GSAP). The pin animation fires on the case-study page itself,
// not here. This preserves the one-signature-motion rule.
//
// Source: blueprint §6 (Work index page type), §7 (TitleCard thumbnails
//         hinted via §4f); REQUIREMENTS.md FOYER-08; Phase 5 RESEARCH §2.1.
import type { Metadata } from "next";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { TitleCardComposition } from "@/components/TitleCardComposition";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Micah Jones — solo product work, growth research, and consulting engagements for founders and birth-worker practices.",
};

export default async function WorkIndexPage() {
  const studies = await getAllCaseStudies();

  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--work-hero">
        <h1 className="foyer-hero foyer-hero--secondary">Work</h1>
        <p className="foyer-prose">
          Case studies of shipped work. Each one names what was built, for whom, and what
          changed.
        </p>
      </section>

      <section className="foyer-section foyer-section--work-grid">
        {studies.length === 0 ? (
          <p className="foyer-prose">Case studies arriving shortly.</p>
        ) : (
          <ul className="work-index-grid">
            {studies.map((study) => (
              <li key={study.slug} className="work-index-card">
                <ViewTransitionLink
                  href={`/work/${study.slug}`}
                  className="work-index-card__link"
                  aria-label={`${study.title} — ${study.dek || "case study"}`}
                >
                  <TitleCardComposition
                    words={study.words}
                    caption={study.dek || study.title}
                    phase="stacked"
                  />
                  <div className="work-index-card__meta">
                    <span className="work-index-card__title">{study.title}</span>
                    {study.dek ? (
                      <span className="work-index-card__dek">{study.dek}</span>
                    ) : null}
                  </div>
                </ViewTransitionLink>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
