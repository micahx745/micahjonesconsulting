// app/(foyer)/work/page.tsx
//
// /work — case study index. Pass-61 opening rebuild.
//
// Operator (2026-09-01): "work again when i first open it it does not entice
// me to look more — web design is part of my services in a way so i need this
// to look premium without screaming AI."
//
// The diagnosis: this page opened with its own name. A mono kicker reading
// "WORK", the section title at 92px, and a lede repeating what the list below
// already said. /services, /book and /about opened the identical three
// elements in the identical order — four pages, one template, which is what
// reads as machine-made. The two pages the operator likes (home, /playbook)
// both open with an OBJECT: a photograph with type over it, and the book
// presented as a physical thing.
//
// The move: open on ONE engagement, as an auction-catalogue lot. Christie's
// and Phillips have used that form for decades because buyers trust it: one
// object, a lot number, the estimate in large numerals, provenance in small
// caps. Left, the figure at hero scale with its line. Right, the Tel Aviv
// photograph as a bordered exhibit. Beneath, a mono provenance line. No
// kicker, no headline sentence: the figure IS the headline.
//
// Which study leads is hand-set (`order` in frontmatter), because the default
// status-then-year sort had buried the Akamai acquisition under a
// name-protected engagement. The lot's figure and line come from the leading
// study's `feature` frontmatter, so this page invents nothing.
//
// The exhibit is a CROP of an Instagram screenshot. Pass-76 REPLACED the
// earlier crop (guardicore-telaviv-detail.jpg) on the operator's call: it was
// framed so tightly to exclude every other face that all it showed was a hand
// on a tablecloth, which read as a stock detail shot rather than a person.
//
// public/guardicore-telaviv-session.jpg is the wider frame. It keeps the
// operator mid-discussion, the notes and the table. Two deliberate changes
// from the source: the "TEL AVIV, ISRAEL" location sticker is cropped out, and
// a second Instagram sticker sitting on the tablecloth was patched with
// adjacent cloth (a platform UI artifact removed; no content of the scene
// altered). TRADE-OFF, on the record: unlike the old crop, this one DOES ship
// part of a colleague's face at the lower right, in profile. That is the cost
// of showing the room, and the operator asked for the room.
import type { Metadata } from "next";
import Image from "next/image";
import { getAllCaseStudies } from "@/lib/case-studies";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Work: pipeline, products, and exits",
  description:
    "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and 36x reach for an author.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/work" },
  openGraph: {
    title: "Work: pipeline, products, and exits",
    description:
      "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and 36x reach for an author.",
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

  const [lead, ...rest] = studies;
  const total = String(studies.length).padStart(2, "0");

  return (
    <>
      <OpeningWorld name="espresso" />

      {lead ? (
        <section
          className="cw-lot"
          data-section
          data-world="espresso"
          aria-labelledby="cw-work-title"
        >
          <div className="cw-lot__figure">
            {/* Pass-67: the figure and its line are ONE h1. They were an h1
                containing only "$80M" and a separate paragraph, which gave the
                page's most important heading no sentence and no subject: a
                number alone reads to a crawler, and to a skimmer, as a brag
                rather than a claim. The two spans keep the exact visual
                (display figure over a 21px line); only the semantics changed. */}
            <h1 id="cw-work-title" className="cw-lot__h1">
              <span className="cw-lot__fig">
                {lead.feature?.fig ?? lead.stats?.[0]?.fig ?? lead.title}
              </span>{" "}
              <span className="cw-lot__line">
                {lead.feature?.line ?? lead.indexLine ?? lead.dek}
              </span>
            </h1>
            <p className="cw-lot__prov">
              <span>01 of {total}</span>
              <span aria-hidden> · </span>
              <span>{lead.title}</span>
              <span aria-hidden> · </span>
              <span>{lead.role}</span>
              <span aria-hidden> · </span>
              <span>{lead.year}</span>
            </p>
            <a href={`/work/${lead.slug}`} className="cw-lot__cta">
              Read the case study <span aria-hidden>→</span>
            </a>
          </div>

          <figure className="cw-lot__exhibit">
            <Image
              src="/guardicore-telaviv-session.jpg"
              alt="A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."
              width={770}
              height={575}
              priority
              sizes="(max-width: 900px) 100vw, 420px"
            />
            <figcaption>Working session · Tel Aviv · 2018-2021</figcaption>
          </figure>
        </section>
      ) : null}

      <section
        className="cw-block cw-wk"
        data-section
        data-world="bone"
        aria-labelledby="cw-work-rest-title"
      >
        <h2 id="cw-work-rest-title" className="cw-wk__rest-title">
          The rest of the record
        </h2>

        <ol className="cw-wk-list">
          {rest.map((s, i) => (
            <li key={s.slug} className="cw-wk-item">
              <a href={`/work/${s.slug}`} className="cw-wk-item__link">
                <div className="cw-wk-item__lead">
                  <p className="cw-wk-item__num">
                    {String(i + 2).padStart(2, "0")}
                  </p>
                  <h3 className="cw-wk-item__title">{s.title}</h3>
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

        {/* Review 2026-09-02 #11: "See the work" is the primary hero CTA, and
            the page it lands on closed on the footer with nothing asking for
            the sale. One line in the catalogue voice, prices as they stand on
            /services and /packages. No entity in the text after either </a>
            (LESSONS #6). */}
        <p className="cw-wk__cross">
          The next entry in this record could be yours.{" "}
          <a href="/services" className="cw-lede-link">
            Engagements
          </a>{" "}
          from $5K a month;{" "}
          <a href="/packages" className="cw-lede-link">
            packages
          </a>{" "}
          at $500, $2,500 and $7,500.
        </p>

        <PageFooter />
      </section>
    </>
  );
}
