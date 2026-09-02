// app/(foyer)/playbook/page.tsx
//
// Pass-55 — "The manual, opened." Operator verdict on the Pass-53/54
// launch page (2026-09-01): "still looks bad. I don't see any
// inspiration from others. find unique things, no animations."
//
// The direction, locked with the operator ("go"): the page is built
// from the BOOK's own print grammar instead of a landing-page
// template. Named moves and their sources:
//   1. The cover as an object, at scale, with a spine — Stripe Press.
//   2. Then the page turns to paper: bone ground, the marginalia rail,
//      § codes, field notes — the book's own pages.
//   3. One real spread at reading size, so the buyer reads the method
//      before the ask — Practical UI (teach on the page) + Refactoring
//      UI (interior-first).
//   4. The dated build-log card, the book's most trust-building
//      element (buyer-persona review), rendered as itself.
//   5. Contents as the book's TOC, chapter one marked free inline —
//      Shape Up + Every Layout.
//   6. What ships and the price as a spec card in the cover's own
//      AUTHOR / CHAPTERS / REV grammar.
// Zero reveals, zero transitions on this page. Two world shifts only:
// object (espresso) → paper (bone) → back cover (espresso).
//
// Claims: ledger phrasings only (docs/LESSONS_LEARNED.md #3); the
// build-log entry is the true 2026-08-31 dead-forms story. Vendor gate
// holds. Waitlist phase: capture only, until the $99 button flips.
import type { Metadata } from "next";
import Image from "next/image";

import { PlaybookSignupForm } from "@/components/color-worlds/PlaybookSignupForm";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "The 80% Wall — a field manual for solo builders",
  description:
    "A field manual for solo builders stuck between demo and production. Ten chapters, 68 pages, 26 working files, from the operator who shipped a HIPAA-compliant SaaS solo with the same AI tools you're using.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/playbook" },
  openGraph: {
    title: "The 80% Wall — a field manual for solo builders",
    description:
      "Stuck between demo and production? The field manual from the operator who shipped a HIPAA-compliant SaaS solo, on the same AI tools you're using.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/playbook",
    siteName: "Micah Jones",
  },
  // opengraph-image.tsx generates twitter:image but NOT twitter:card (verified
  // in the Next 16 file-convention docs), so the card type is set explicitly or
  // the unfurl renders as a small thumbnail.
  twitter: { card: "summary_large_image" },
};

// The book's real table of contents; page numbers are the queried
// values from the assembled 68pp PDF. Regenerate when pagination moves.
const CHAPTERS = [
  {
    n: "01",
    title: "Why your build broke at 80%",
    tag: "The AI undoes your features",
    page: 3,
    free: true,
  },
  { n: "02", title: "The spec is the moat", tag: "Drift, not bugs", page: 12 },
  {
    n: "03",
    title: "The architecture you didn't draw",
    tag: "Auth, data, storage, the arrows",
    page: 19,
  },
  {
    n: "04",
    title: "Deploy day",
    tag: "Env vars, migrations, domains",
    page: 25,
  },
  {
    n: "05",
    title: "The security pre-flight",
    tag: "Row-level security, leaked keys",
    page: 31,
  },
  {
    n: "06",
    title: "Stripe in production",
    tag: "Webhooks, refunds, test-to-live",
    page: 37,
  },
  {
    n: "07",
    title: "Compliance, when it matters",
    tag: "HIPAA, GDPR, SOC 2, and when",
    page: 43,
  },
  {
    n: "08",
    title: "The first ten users",
    tag: "Ten users from conversations",
    page: 49,
  },
  {
    n: "09",
    title: "The distribution loop",
    tag: "Second-hand users, the loop",
    page: 56,
  },
  {
    n: "10",
    title: "When to hand it off",
    tag: "Hire, rent, sell, keep going",
    page: 62,
  },
] as const;

const FAQS = [
  {
    q: "Is this for me?",
    a: "You used Cursor, Claude Code, Lovable, v0, or Bolt to build something real, and it stalled between demo and production. Then yes.",
  },
  {
    q: "Do I need to know how to code?",
    a: "You need to read code and run a terminal. The AI writes; the manual teaches you to steer.",
  },
  {
    q: "How is this different from a tutorial?",
    a: "A tutorial shows one happy path. This is the failure modes, from someone who shipped through them.",
  },
  {
    q: "What if it does not help?",
    a: "Thirty days, full refund, no questions asked. Reply to the delivery email and I refund it.",
  },
  {
    q: "Will it go stale?",
    a: "The tools change monthly. The walls do not. Every future edition is included and goes to the same email.",
  },
] as const;

export default function PlaybookPage() {
  return (
    <main className="cw-services cw-lp" data-section>
      {/* 1. THE OBJECT — espresso */}
      <header className="cw-lp-object" data-world="espresso">
        <div className="cw-lp-book">
          <div className="cw-lp-book__spine" aria-hidden>
            <span>The 80% Wall · Micah Jones · First edition</span>
          </div>
          <Image
            src="/playbook/book-cover.png"
            alt="The cover of The 80% Wall: an espresso spec-sheet page, the title stacked in bone and terracotta display type."
            width={1819}
            height={2572}
            priority
            sizes="(max-width: 900px) 88vw, 520px"
          />
        </div>
        <div className="cw-lp-object__text">
          <p className="cw-lp-kicker">A field manual for solo builders</p>
          <h1 className="cw-lp-object__title">
            Your build got to 80%. Here is the rest of the way.
          </h1>
          <p className="cw-lp-object__sub">
            Ten chapters on the walls between demo and production, and the
            systems that carry a solo build through them. Sixty-eight pages.
            Twenty-six working files. Every build-log entry true and dated.
          </p>
          <div className="cw-lp-object__row">
            <a href="#pb-free" className="cw-mlink">
              Read chapter one free, by email <span aria-hidden>↓</span>
            </a>
            <p className="cw-lp-object__meta">$99 at launch · $149 after</p>
          </div>
        </div>
      </header>

      {/* 2. THE PAPER — bone. Main column + marginalia rail. */}
      <div className="cw-lp-page" data-world="bone">
        <section className="cw-lp-block" aria-labelledby="lp-you">
          <div className="cw-lp-block__main">
            <h2 id="lp-you" className="cw-lp-h">
              If this is you
            </h2>
            <div className="cw-lp-lines">
              <p>
                It got to eighty percent. Then every change broke something that
                worked yesterday.
              </p>
              <p>
                The demo looked done. Production turned out to be a different
                machine entirely.
              </p>
              <p>It shipped. Nobody came.</p>
            </div>
            <p className="cw-lp-body">
              The wall is not a talent problem. It is arithmetic: the
              tool&rsquo;s memory runs out, and yours has to take over, on
              paper, in the repo. This manual is that hand-off, one system per
              chapter.
            </p>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.1
            <figure className="cw-lp-author">
              <Image
                src="/hero-context.jpg"
                alt="Micah Jones working at a laptop in front of a whiteboard covered in service architecture."
                width={1800}
                height={1800}
                sizes="(max-width: 999px) 40vw, 210px"
                className="cw-lp-author__img"
              />
              <figcaption className="cw-lp-author__cap">
                Micah Jones · Oakland
              </figcaption>
            </figure>
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>I built Ordani
              alone with Claude Code and Cursor: a HIPAA-compliant SaaS for
              birth workers, with active paying users. Same tools you&rsquo;re
              using. Same wall I hit.
            </p>
          </aside>
        </section>

        <section className="cw-lp-block" aria-labelledby="lp-page">
          <div className="cw-lp-block__main">
            <h2 id="lp-page" className="cw-lp-h">
              Read a page
            </h2>
            <figure className="cw-lp-spread">
              <Image
                src="/playbook/spread-wallchart.png"
                alt="Page six of the manual: the wall chart, two lines crossing where unwritten rules outnumber what fits in the context window, above the three reasons the wall hits at 80%."
                width={1530}
                height={1980}
                sizes="(max-width: 1000px) 92vw, 640px"
              />
              <figcaption className="cw-lp-cap">
                § 01.4 · Why it hits at 80% and not sooner · page 6 of 68
              </figcaption>
            </figure>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.2
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Nine line-drawn diagrams, each drawn for this book. No stock art
              anywhere in it.
            </p>
          </aside>
        </section>

        <section className="cw-lp-block" aria-labelledby="lp-log">
          <div className="cw-lp-block__main">
            <h2 id="lp-log" className="cw-lp-h">
              From the build log
            </h2>
            <article className="cw-lp-log">
              <p className="cw-lp-log__head">
                <span>From the build log</span>
                <span>Entry · 2026-08-31</span>
              </p>
              <h3 className="cw-lp-log__title">The demo that lied for weeks</h3>
              <p>
                My own site had three lead forms: contact, a sample-chapter
                signup, a beta waitlist. All three worked flawlessly in the
                demo. In production, for weeks, every submission fell into a
                server log nobody reads, because one environment variable, the
                email key, was never installed on the live host.
              </p>
              <p>
                No error. No bounce. The page told every visitor &ldquo;Got
                it.&rdquo;
              </p>
              <p>
                I found out only because I tested a new feature end to end on
                the live site, and that test failed loudly enough to make me
                look. Production is a different machine than the demo. And
                &ldquo;it works&rdquo; is a claim about the path you actually
                tested, never about the code you wrote.
              </p>
            </article>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.3
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Thirteen entries like this one in the manual. All true, all dated.
              None of them are anyone else&rsquo;s story.
            </p>
          </aside>
        </section>

        <section className="cw-lp-block" aria-labelledby="lp-toc">
          <div className="cw-lp-block__main">
            <h2 id="lp-toc" className="cw-lp-h">
              Contents
            </h2>
            <ol className="cw-lp-toc">
              {CHAPTERS.map((c) => (
                <li key={c.n}>
                  <span className="cw-lp-toc__num" aria-hidden>
                    {c.n}
                  </span>
                  <span>
                    <span className="cw-lp-toc__title">{c.title}</span>
                    <span className="cw-lp-toc__tag">
                      {c.tag}
                      {"free" in c && c.free ? <em> · free, below</em> : null}
                    </span>
                  </span>
                  <span className="cw-lp-toc__page">p. {c.page}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.4
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Every chapter ends in a pre-flight card you run the same night.
              The cards ship separately as files, too.
            </p>
          </aside>
        </section>

        <section className="cw-lp-block" aria-labelledby="pb-free" id="pb-free">
          <div className="cw-lp-block__main">
            <h2 className="cw-lp-h">Chapter one, free</h2>
            <p
              className="cw-lp-body"
              style={{ marginTop: 0, marginBottom: 22 }}
            >
              The real chapter, nine pages, not a teaser. Leave your email and
              it arrives in about a minute.
            </p>
            <PlaybookSignupForm plain />
          </div>
          <aside className="cw-lp-block__rail">
            § 0.5
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              No sequence, no drip. One email with the PDF, and a second one the
              day the manual ships.
            </p>
          </aside>
        </section>

        <section className="cw-lp-block" aria-labelledby="lp-run">
          <div className="cw-lp-block__main">
            <h2 id="lp-run" className="cw-lp-h">
              Run tonight
            </h2>
            <figure className="cw-lp-spread">
              <Image
                src="/playbook/companion-card.png"
                alt="A companion file rendered as a pre-flight card: the five security checks, each with a checkbox."
                width={1283}
                height={1150}
                sizes="(max-width: 1000px) 92vw, 640px"
              />
              <figcaption className="cw-lp-cap">
                checklists/05-security.md · one of ten pre-flight cards, as
                shipped
              </figcaption>
            </figure>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.6
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Twenty-six companion files: the ten cards, six prompt files for
              Claude Code and Cursor, and the templates with worked examples.
            </p>
          </aside>
        </section>
      </div>

      {/* 3. BACK COVER — espresso. The spec card is the price. */}
      <section
        className="cw-lp-back"
        data-world="espresso"
        aria-labelledby="lp-ships"
      >
        <div className="cw-lp-back__grid">
          <div>
            <p className="cw-lp-kicker" id="lp-ships">
              What ships
            </p>
            <dl className="cw-lp-spec">
              <dt>Pages</dt>
              <dd>
                <strong>68</strong>
              </dd>
              <dt>Chapters</dt>
              <dd>
                <strong>10</strong>
              </dd>
              <dt>Pre-flight cards</dt>
              <dd>
                <strong>10</strong>
              </dd>
              <dt>Diagrams</dt>
              <dd>
                <strong>9</strong>
              </dd>
              <dt>Build-log entries</dt>
              <dd>
                <strong>13</strong>
              </dd>
              <dt>Companion files</dt>
              <dd>
                <strong>26</strong>
              </dd>
              <dt>Author</dt>
              <dd>
                Micah Jones · Oakland · built Ordani solo · four exits behind my
                work
              </dd>
              <dt>Format</dt>
              <dd>PDF + ZIP · every future edition</dd>
              <dt>Price</dt>
              <dd>
                <strong>$99</strong> at launch · $149 after
              </dd>
              <dt>Refund</dt>
              <dd>30 days, no questions</dd>
              <dt>Status</dt>
              <dd>Coming soon</dd>
            </dl>
          </div>
          <div>
            <p className="cw-lp-kicker">The day it ships</p>
            <p className="cw-lp-back__note">
              Leave your email for chapter one now, and I&rsquo;ll tell you the
              day the full manual opens, at the launch price.
            </p>
            <PlaybookSignupForm plain />
            <dl className="cw-lp-faq">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="cw-services__foot" data-world="espresso">
        <p className="cw-services__foot-kicker">Past the playbook?</p>
        <h2 className="cw-services__foot-title">
          If your build needs a second pair of hands.
        </h2>
        <div className="cw-services__foot-cta-row">
          <a href="/services#packages" className="cw-mlink">
            Fixed-price packages <span aria-hidden>→</span>
          </a>
          <a href="/book" className="cw-mlink">
            Book a free intro call <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
