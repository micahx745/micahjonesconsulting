// app/(foyer)/work/page.tsx
//
// /work, Pass-120 Direction B (.planning/reviews/FABLE-120-DESIGN.md section 2).
// Paper from top to bottom, the bone world: the lead study at hero scale beside
// the Tel Aviv clip, the method line, four entries of four data points each
// (DESIGN_BAR R11), and the record block at #record, where /work/postmates and
// /work/neuton land (next.config.ts, 308).
//
// Rulings: no year beside a role (LESSONS #3, 2026-09-15); no caption on the
// photograph or the clip (operator 2026-09-16); the clip is the DESIGN_BAR R12
// exception of 2026-09-16 (brand.json motion.heroclip). Every visible string
// renders from content: the entry frontmatter of each study, SERVICE_LABELS,
// and content/work-page.ts. The one kept literal is the cross-link line.
//
// Replaces the Pass-61 catalogue lot and the Pass-58 study list.
import type { Metadata } from "next";
import { preload } from "react-dom";
import { getAllCaseStudies, isPublished } from "@/lib/case-studies";
import { SERVICE_LABELS } from "@/lib/case-study-schema";
import { METHOD_LINE, RECORD } from "@/content/work-page";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { WorkHeroClip } from "@/components/color-worlds/WorkHeroClip";
import { ViewTransitionLink } from "@/components/view-transition-link";

const HERO_POSTER = "/media/work-hero-poster-960.avif";
const HERO_ALT =
  "A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses.";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Work: revenue, products, and exits",
  description:
    "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/work" },
  openGraph: {
    title: "Work: revenue, products, and exits",
    description:
      "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/work",
  },
};

export default async function WorkIndexPage() {
  const studies = (await getAllCaseStudies()).filter(isPublished);
  const [lead, ...rest] = studies;

  // The poster is the LCP candidate at both widths. Preload it from the head so
  // it starts before the body parses; the video itself loads nothing until the
  // clip starts (preload="none" in WorkHeroClip).
  preload(HERO_POSTER, {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
  });

  return (
    <>
      <OpeningWorld name="bone" />

      {lead ? (
        <section
          className="cw-wx cw-wx-lead"
          data-section
          data-world="bone"
          aria-labelledby="cw-wx-lead-title"
        >
          <ViewTransitionLink
            href={`/work/${lead.slug}`}
            className="cw-wx-lead__link"
          >
            <p className="cw-wx-ctx cw-wx-lead__ctx">{lead.entry.context}</p>
            <h1 id="cw-wx-lead-title" className="cw-wx-lead__h1">
              <span className="cw-wx-lead__fig">{lead.entry.figure}</span>{" "}
              <span className="cw-wx-lead__line">{lead.entry.line}</span>
            </h1>
            <p className="cw-wx-lead__did">{lead.entry.did}</p>
            <p className="cw-wx-label cw-wx-lead__svc">
              {SERVICE_LABELS[lead.service]}
            </p>
          </ViewTransitionLink>

          <figure className="cw-wx-lead__media" aria-label={HERO_ALT}>
            <WorkHeroClip poster={HERO_POSTER} />
          </figure>
        </section>
      ) : null}

      <section
        className="cw-wx cw-wx-studies"
        data-section
        data-world="bone"
        aria-labelledby="cw-wx-method"
      >
        <h2 id="cw-wx-method" className="cw-wx-method">
          {METHOD_LINE}
        </h2>
        <ol className="cw-wx-list">
          {rest.map((s) => (
            <li key={s.slug} className="cw-wx-list__item">
              <ViewTransitionLink href={`/work/${s.slug}`} className="cw-wx-entry">
                <div className="cw-wx-entry__a">
                  <p className="cw-wx-ctx cw-wx-entry__ctx">{s.entry.context}</p>
                  <h3 className="cw-wx-entry__line">
                    {s.entry.figure ? `${s.entry.figure} ${s.entry.line}` : s.entry.line}
                  </h3>
                </div>
                <div className="cw-wx-entry__b">
                  <p className="cw-wx-entry__did">{s.entry.did}</p>
                  <p className="cw-wx-label cw-wx-entry__svc">
                    {SERVICE_LABELS[s.service]}
                  </p>
                </div>
              </ViewTransitionLink>
            </li>
          ))}
        </ol>
      </section>

      <section
        id={RECORD.id}
        className="cw-wx cw-wx-rec"
        data-section
        data-world="bone"
        aria-labelledby="cw-wx-rec-title"
      >
        <h2 id="cw-wx-rec-title" className="cw-wx-rec__h">
          {RECORD.heading}
        </h2>
        <p className="cw-wx-rec__line">{RECORD.line}</p>
        <ol className="cw-wx-rec__list">
          {RECORD.rows.map((row) => (
            <li key={row.company} className="cw-wx-rec__row">
              <p className="cw-wx-rec__co">
                {row.href ? (
                  <ViewTransitionLink href={row.href}>{row.company}</ViewTransitionLink>
                ) : (
                  row.company
                )}
              </p>
              <p className="cw-wx-rec__meta">
                <span className="cw-wx-label cw-wx-rec__role">{row.role}</span>
                <span className="cw-wx-label cw-wx-rec__what">{row.outcome}</span>
              </p>
              <p className="cw-wx-rec__desc">{row.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="cw-wx cw-wx-close">
        {/* Review 2026-09-02 #11, kept: the page still closes with one line
            asking for the work. It sits outside #record (the record block
            carries no CTA). No entity after either </a> (LESSONS #6). */}
        <p className="cw-wx-cross">
          The next entry in this record could be yours.{" "}
          <a href="/services" className="cw-wx-link">
            Engagements
          </a>{" "}
          scoped on a call;{" "}
          <a href="/packages" className="cw-wx-link">
            packages
          </a>{" "}
          at $500, $2,500 and $7,500.
        </p>
        <PageFooter />
      </div>
    </>
  );
}
