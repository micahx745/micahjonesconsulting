// app/(foyer)/work/page.tsx
//
// /work — case study index for SEO + internal linking.
//
// Lists every case study with its title, dek, and meta. Each link goes
// to /work/[slug] (existing theater route). Server-rendered. No client
// JS needed — this is a pure SEO + navigation page.
import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Work",
  description:
    "Case studies from a decade of GTM, product, and platform engagements. Guardicore, TechValidate, HR equity author, and Ordani.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/work" },
  openGraph: {
    title: "Work — Micah Jones",
    description:
      "Case studies from a decade of GTM, product, and platform engagements.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/work",
  },
};

export default async function WorkIndexPage() {
  // Hide stubs from the public index — Pass-6 review caught readers
  // clicking into Passioneer expecting a case study and finding
  // "check back Q3 2026." Stubs live in MDX until they're real.
  const studies = (await getAllCaseStudies()).filter(
    (cs) => cs.status !== "stub",
  );

  return (
    <section
      className="cw-block"
      data-section
      data-world="bone"
      aria-labelledby="cw-work-title"
    >
      <p className="cw-kicker">Work</p>
      <h1 id="cw-work-title" className="cw-secttitle">
        Selected case studies.
      </h1>

      <ul className="cw-work-list">
        {studies.map((s) => (
          <li key={s.slug} className="cw-work-item">
            <a href={`/work/${s.slug}`} className="cw-work-item__link">
              <h2 className="cw-work-item__title">{s.title}</h2>
              <p className="cw-work-item__dek">{s.dek}</p>
              <p className="cw-work-item__meta">
                <span>{s.year}</span>
                <span aria-hidden> &middot; </span>
                <span>{s.role}</span>
                <span aria-hidden> &middot; </span>
                <span>{s.status}</span>
              </p>
            </a>
          </li>
        ))}
      </ul>

      <p className="cw-about__back">
        <a href="/about">&larr; More about how I work</a>
        <span aria-hidden> &middot; </span>
        <a href="/">Back to home</a>
      </p>
    </section>
  );
}
