// app/(room)/work/page.tsx
//
// /work — the case-study index.
//
// Pass-61 opened this page on ONE engagement set as an auction-catalogue lot,
// because the page used to open with its own name: a kicker reading "WORK", a
// 92px title and a lede repeating what the list below already said. Four pages
// opened with the identical three elements in the identical order, which is
// what reads as machine-made.
//
// PASS-101 PHASE 3 (WINNING-BRIEF §15.6; brief §3: "/work: the receipts index
// (name · caption · →) over all case studies"). The lot and the two-shape list
// under it are replaced by ONE ledger: every study is a row, every row is
// name · caption · arrow, and the row's caption is that study's own
// `indexLine` frontmatter. Nothing on this page is written here — the names,
// the lines, the roles and the years all come out of content/work/*.mdx, and
// the sort is the same `order`-then-status-then-year sort lib/case-studies.ts
// has always run.
//
// What the ruling keeps from Pass-61: the page opens on an OBJECT. The Tel
// Aviv exhibit stays, directly under the head and above the ledger, with its
// own live caption. It is the one photograph on the page.
//
// What it drops: the lot's figure at hero scale, the ordinals, the per-study
// stat chips and the two competing list shapes. §15.6's index is one shape
// repeated, and the point of an index is that every line is the same kind of
// line.
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

  return (
    <section
      className="rl-wrap rl-first"
      aria-labelledby="rl-work-title"
      id="record"
    >
      <div className="rl-sec rl-sec--wide">
        <div className="rl-eyebrow">
          <span className="rl-l">Record</span>
        </div>
        {/* PASS-101 polish: --d2, not the poster --d (§14.4 — --d is the hero
            and the ask). At --d this head wrapped to three lines at 1440
            (1038 / 1249 / 502px), the last one a stub. */}
        <h1 id="rl-work-title" className="rl-d two" data-rl="head">
          The receipts. Every line below is real.
        </h1>
      </div>

      <figure className="rl-figure rl-figure--half rl-air-m" data-rl="media">
        <Image
          src="/guardicore-telaviv-session.jpg"
          alt="A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."
          width={770}
          height={575}
          priority
          sizes="(max-width: 900px) 100vw, 620px"
        />
        <figcaption>
          <span className="rl-l meta">
            Working session &middot; Tel Aviv &middot; 2018-2021
          </span>
        </figcaption>
      </figure>

      <div className="rl-index rl-air-l" data-rl-group="index">
        {studies.map((s) => (
          <a
            key={s.slug}
            className="rl-prf"
            href={`/work/${s.slug}`}
            data-rl="rule"
          >
            <div className="who">{s.title}</div>
            <div className="cap">
              {s.indexLine ?? `${s.dek.split(". ")[0]}.`}
              <span className="rl-l meta">
                {s.role}
                <span aria-hidden> &middot; </span>
                {s.year}
              </span>
            </div>
            <span className="ar" aria-hidden>
              &#8594;
            </span>
          </a>
        ))}
      </div>

      {/* Review 2026-09-02 #11: "See the work" is the primary hero CTA, and
          the page it lands on closed on the footer with nothing asking for
          the sale. One line in the catalogue voice, prices as they stand on
          /services and /packages. No entity in the text after either </a>
          (LESSONS #6). */}
      <p className="rl-lede rl-air-m" data-rl="rise">
        The next entry in this record could be yours.{" "}
        <a href="/services" className="rl-link">
          Engagements
        </a>{" "}
        from $5K a month;{" "}
        <a href="/packages" className="rl-link">
          packages
        </a>{" "}
        at $500, $2,500 and $7,500.
      </p>
      {/* PASS-101 SS18: the page closed on a hanging paragraph with nothing to
          press. Every other section on the system ends in ONE chip (Rule C),
          and this is the page the home's primary CTA lands on. The label is
          the bar's and the foot's own live string; nothing is written here. */}
      <div className="rl-chips rl-air-s" data-rl="rise">
        <a className="rl-chip" href="/call">
          <span className="t">Name the problem</span>
          <span className="a" aria-hidden="true">
            <span>&#8594;</span>
          </span>
        </a>
      </div>
    </section>
  );
}
