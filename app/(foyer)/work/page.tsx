// app/(foyer)/work/page.tsx
//
// /work, Pass-122 (.planning/mocks/pass-122/WORK-BRIEF.md): the Pass-120 page
// evolved in the existing theme with the home receipts' grammar. Paper, the
// bone world, top to bottom.
//
// 1. The opening, per THE /WORK HEADER (operator 2026-09-16) and PASS-121
//    DIRECTION AND /WORK HEADING (2026-09-17), LESSONS #3: the heading, the
//    plain description of what the page holds, and one small entry into the
//    featured study, Guardicore, the study the Tel Aviv clip belongs to. The
//    clip is the DESIGN_BAR R12 exception of 2026-09-16 (brand.json
//    motion.heroclip), now a 4:5 thumbnail inside that entry.
// 2. The studies. Every figure at one poster size, fitted to the widest
//    numeral ("800,000"), copper, with its line under it as one unit; each
//    assembles once as it arrives (WorkFigures). The birth worker's poster is
//    its line's own phrase (figurePhrase); ORDANI has no numeral figure and
//    gets no poster (the brief).
// 3. The method line, moved down: its ruling says it may not open /work.
// 4. The record block at #record, where /work/postmates and /work/neuton land
//    (next.config.ts, 308), and the cross-link line.
//
// Rulings kept: no year beside a role (LESSONS #3, 2026-09-15); no caption on
// the photograph or the clip (operator 2026-09-16). Every visible string
// renders from content: the entry frontmatter of each study, SERVICE_LABELS,
// and content/work-page.ts. The one kept literal is the cross-link line. The
// splits below (heading at its comma, a figure into its words and numerals, a
// line around its figurePhrase) only wrap spans around the approved strings;
// the visible text is unchanged, and scripts/work-entry-gate.mjs reads it back.
import type { Metadata } from "next";
import { preload } from "react-dom";
import {
  getAllCaseStudies,
  isPublished,
  type PublishedCaseStudyMeta,
} from "@/lib/case-studies";
import { SERVICE_LABELS } from "@/lib/case-study-schema";
import {
  METHOD_LINE,
  RECORD,
  WORK_DESCRIPTION,
  WORK_HEADING,
} from "@/content/work-page";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { WorkFigures } from "@/components/color-worlds/WorkFigures";
import { WorkHeroClip } from "@/components/color-worlds/WorkHeroClip";
import { ViewTransitionLink } from "@/components/view-transition-link";

const HERO_POSTER = "/media/work-hero-poster-960.avif";

// The featured study: the one the Tel Aviv clip belongs to (the brief, rule 1).
const FEATURED_SLUG = "guardicore";

// Studies whose figurePhrase carries the poster role. The brief names the
// birth worker only; ORDANI's phrase stays inside its line.
const POSTER_PHRASE_SLUGS = new Set(["birth-worker"]);

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

type Entry = PublishedCaseStudyMeta["entry"];

// "Up to 800,000" -> words "Up to", numerals "800,000"; "$14M" -> numerals only.
function splitFigure(figure: string) {
  const m = figure.match(/^(.*?)\s*(\$?\d[\d.,]*[A-Za-z+%]*)$/);
  return { words: m?.[1] ?? "", numerals: m?.[2] ?? figure };
}

function Headline({ slug, entry }: { slug: string; entry: Entry }) {
  if (entry.figure) {
    const { words, numerals } = splitFigure(entry.figure);
    // A comma drops further below the baseline than the $ tail does; its
    // caption sits a step lower (CSS).
    const comma = numerals.includes(",");
    return (
      <h2 className={`cw-wx-study__h${comma ? " cw-wx-study__h--comma" : ""}`}>
        <span className="cw-wx-study__fig">
          {words ? (
            <>
              <span className="cw-wx-study__kick">{words}</span>{" "}
            </>
          ) : null}
          <span className="cw-wx-num">{numerals}</span>
        </span>{" "}
        <span className="cw-wx-study__line">{entry.line}</span>
      </h2>
    );
  }

  const phrase = entry.figurePhrase;
  const at = phrase ? entry.line.indexOf(phrase) : -1;
  if (phrase && at > 0 && POSTER_PHRASE_SLUGS.has(slug)) {
    const lead = entry.line.slice(0, at).trimEnd();
    const rest = entry.line.slice(at + phrase.length);
    // Punctuation joins the poster as ONE string: two JSX text nodes render
    // as "ten<!-- -->.", which the entry gate reads as "ten ." (LESSONS #38).
    const tail = /^[.,;:!?]*$/.test(rest) ? rest : "";
    return (
      <h2 className="cw-wx-study__h cw-wx-study__h--phrase">
        <span className="cw-wx-study__lead">{lead}</span>{" "}
        <span className="cw-wx-num cw-wx-num--words">{phrase + tail}</span>
        {tail ? null : <span className="cw-wx-study__lead">{rest}</span>}
      </h2>
    );
  }

  return (
    <h2 className="cw-wx-study__h cw-wx-study__h--plain">
      <span className="cw-wx-study__line">{entry.line}</span>
    </h2>
  );
}

export default async function WorkIndexPage() {
  const studies = (await getAllCaseStudies()).filter(isPublished);
  const featured = studies.find((s) => s.slug === FEATURED_SLUG);
  const [headA, headB] = WORK_HEADING.split(/(?<=,) /);

  // The clip's poster sits in the first viewport at both widths, now as a
  // thumbnail: preloaded so the frame is never empty, but at default
  // priority, since the heading, not the poster, is the page's largest paint.
  preload(HERO_POSTER, { as: "image", type: "image/avif" });

  return (
    <>
      <OpeningWorld name="bone" />

      <section
        className="cw-wx cw-wx-open"
        data-section
        data-world="bone"
        aria-labelledby="cw-wx-title"
      >
        <h1 id="cw-wx-title" className="cw-wx-open__h">
          {headB ? (
            <>
              <span className="cw-wx-open__hl">{headA}</span>{" "}
              <span className="cw-wx-open__hl">{headB}</span>
            </>
          ) : (
            WORK_HEADING
          )}
        </h1>
        <div className="cw-wx-open__row">
          <p className="cw-wx-open__desc">{WORK_DESCRIPTION}</p>
          {featured?.entry.figure ? (
            <ViewTransitionLink
              href={`/work/${featured.slug}`}
              className="cw-wx-feat"
            >
              <span className="cw-wx-feat__media" aria-hidden="true">
                <WorkHeroClip poster={HERO_POSTER} />
              </span>
              <span className="cw-wx-feat__text">
                <span className="cw-wx-feat__ctx">
                  {featured.entry.context}
                </span>{" "}
                <span className="cw-wx-feat__fig">
                  {featured.entry.figure}
                  <span className="cw-wx-feat__go" aria-hidden="true">
                    {"→"}
                  </span>
                </span>
              </span>
            </ViewTransitionLink>
          ) : null}
        </div>
      </section>

      <section className="cw-wx cw-wx-studies" data-section data-world="bone">
        <ol className="cw-wx-list">
          {studies.map((s) => (
            <li key={s.slug} className="cw-wx-list__item">
              <ViewTransitionLink
                href={`/work/${s.slug}`}
                className="cw-wx-study"
              >
                <p className="cw-wx-study__ctx">{s.entry.context}</p>
                <Headline slug={s.slug} entry={s.entry} />
                <div className="cw-wx-study__more">
                  <p className="cw-wx-study__did">{s.entry.did}</p>
                  <p className="cw-wx-label cw-wx-study__svc">
                    {SERVICE_LABELS[s.service]}
                  </p>
                </div>
              </ViewTransitionLink>
            </li>
          ))}
        </ol>
        <p className="cw-wx-method">{METHOD_LINE}</p>
        <WorkFigures />
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
                  <ViewTransitionLink href={row.href}>
                    {row.company}
                  </ViewTransitionLink>
                ) : (
                  row.company
                )}
              </p>
              <p className="cw-wx-rec__meta">
                <span className="cw-wx-label cw-wx-rec__role">{row.role}</span>
                <span className="cw-wx-label cw-wx-rec__what">
                  {row.outcome}
                </span>
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
