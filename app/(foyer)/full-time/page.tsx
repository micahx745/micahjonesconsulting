import type { Metadata } from "next";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { FULL_TIME } from "@/content/full-time";

export const metadata: Metadata = {
  title: FULL_TIME.title,
  description: FULL_TIME.description,
  alternates: {
    canonical: "https://www.micahjonesconsulting.com/full-time",
  },
  openGraph: {
    title: `${FULL_TIME.title} | Micah Jones`,
    description: FULL_TIME.description,
    type: "profile",
    url: "https://www.micahjonesconsulting.com/full-time",
  },
};

export default function FullTimePage() {
  const c = FULL_TIME.contact;

  return (
    <>
      <OpeningWorld name="bone" />
      <section
        className="cw-block"
        data-section
        data-world="bone"
        aria-labelledby="cw-ft-title"
      >
        <p className="cw-kicker">{FULL_TIME.kicker}</p>
        <h1 id="cw-ft-title" className="cw-secttitle">
          {FULL_TIME.h1}
        </h1>
        <div className="cw-about">
          <p className="cw-about__lede">{FULL_TIME.lede}</p>
        </div>
      </section>

      <section
        className="cw-block"
        data-section
        data-world="espresso"
        aria-labelledby="cw-ft-think-title"
      >
        <h2 id="cw-ft-think-title" className="cw-secttitle">
          {FULL_TIME.thinkHeading}
        </h2>
        <ol className="cw-principles cw-principles--steps">
          {FULL_TIME.principles.map((p, i) => (
            <li
              key={p.label}
              className="cw-principle cw-reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <p className="cw-principle__name">{p.label}</p>
                <p className="cw-principle__artifact">{p.headline}</p>
                <p className="cw-principle__text">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="cw-about">
          <h2 id="cw-ft-record-title" className="cw-about__h">
            {FULL_TIME.recordHeading}
          </h2>
          <p>{FULL_TIME.record}</p>
          <h2 id="cw-ft-contact-title" className="cw-about__h">
            {FULL_TIME.contactHeading}
          </h2>
          <p>
            {c.before}
            <a href={`mailto:${c.email}`}>{c.email}</a>
            {c.middle}
            <a
              href={c.linkedinHref}
              rel="me noopener noreferrer"
              target="_blank"
            >
              {c.linkedin}
            </a>
            {c.after}
          </p>
          <PageFooter fullTimeLink={false} />
        </div>
      </section>
    </>
  );
}
