// app/(foyer)/playbook/page.tsx
//
// Pass-53 — the launch page. Operator brief (2026-09-01): the prior
// version "feels weak… I need to feel special… make them want to buy…
// too wordy… no trust signals… no restraint, go wild." Design-director
// round 2 ruled: THE OBJECT hero (the real cover, static tilt, one
// edge-light; the media box stays the factory-loop socket), an
// espresso → bone → espresso world arc as this page's signature moment
// (the site's own crossfade rearranged, not a second motion), the TOC
// as a page-numbered index, a full-bleed filmstrip of real spreads,
// and a ledger-verbatim trust strip. Word budget from the 2026
// exemplar research: hero ≤45 words, page ≤900 words of prose.
// Waitlist phase: one CTA style (the free chapter) until the $99
// button flips at go-live.
import type { Metadata } from "next";
import Image from "next/image";

import { PlaybookSignupForm } from "@/components/color-worlds/PlaybookSignupForm";
import { PlaybookHeroMedia } from "@/components/color-worlds/PlaybookHeroMedia";
import { PageFooter } from "@/components/color-worlds/PageFooter";

export const metadata: Metadata = {
  title: "The 80% Wall — a field manual for solo builders",
  description:
    "A field manual for solo builders stuck between demo and production. From the operator who shipped Ordani solo — HIPAA-compliant, on the same AI tools you're using.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/playbook" },
  openGraph: {
    title: "The 80% Wall — a field manual for solo builders",
    description:
      "Stuck between demo and production? The field manual from the operator who shipped a HIPAA-compliant SaaS solo, on the same AI tools you're using.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/playbook",
    siteName: "Micah Jones",
  },
};

// The book's real table of contents. Page numbers are the queried
// values from the assembled 68pp PDF; regenerate when pagination moves.
// Each row carries a five-word tag naming the failure it covers, so a
// buyer can find their own wall by name (persona cold read, Pass-54).
const CHAPTERS = [
  { n: "01", title: "Why your build broke at 80%", tag: "The AI undoes your features", page: 3 },
  { n: "02", title: "The spec is the moat", tag: "Drift, not bugs", page: 12 },
  { n: "03", title: "The architecture you didn't draw", tag: "Auth, data, storage, the arrows", page: 19 },
  { n: "04", title: "Deploy day", tag: "Env vars, migrations, domains", page: 25 },
  { n: "05", title: "The security pre-flight", tag: "Row-level security, leaked keys", page: 31 },
  { n: "06", title: "Stripe in production", tag: "Webhooks, refunds, test-to-live", page: 37 },
  { n: "07", title: "Compliance, when it matters", tag: "HIPAA, GDPR, SOC 2, and when", page: 43 },
  { n: "08", title: "The first ten users", tag: "Ten users from conversations", page: 49 },
  { n: "09", title: "The distribution loop", tag: "Second-hand users, the loop", page: 56 },
  { n: "10", title: "When to hand it off", tag: "Hire, rent, sell, keep going", page: 62 },
] as const;

// Real interior pages, rendered from the book's Typst source
// (product/playbook). Body pages are US Letter; chapter openers are
// the cover-register page (A4 ratio) — hence the two sizes.
const SPREADS = [
  {
    src: "/playbook/spread-wallchart.png",
    w: 1530,
    h: 1980,
    cap: "§ 01.4 · The wall",
    alt: "Book page: the wall chart, two lines crossing at the point where unwritten rules outnumber the context window.",
  },
  {
    src: "/playbook/spread-window.png",
    w: 1530,
    h: 1980,
    cap: "§ 01.2 · The window",
    alt: "Book page: the transcript-window diagram, the oldest blocks falling out, above a terracotta pull quote.",
  },
  {
    src: "/playbook/spread-opener-02.png",
    w: 1488,
    h: 2105,
    cap: "02 · Chapter opener",
    alt: "Book page: the dark chapter-two opener with a large terracotta numeral and the spec block.",
  },
  {
    src: "/playbook/spread-arch.png",
    w: 1530,
    h: 1980,
    cap: "§ 03.2 · Five boxes",
    alt: "Book page: the five-box architecture map in petrol line work, one lock per arrow.",
  },
  {
    src: "/playbook/spread-money.png",
    w: 1530,
    h: 1980,
    cap: "§ 06.2 · Money flow",
    alt: "Book page: the money-flow diagram, browser to Stripe to your server, the success page crossed out.",
  },
  {
    src: "/playbook/spread-rings.png",
    w: 1530,
    h: 1980,
    cap: "§ 08.2 · The rings",
    alt: "Book page: three concentric trust rings around you, labelled with where the first ten users live.",
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
] as const;

export default function PlaybookPage() {
  return (
    <main className="cw-services cw-playbook" data-section>
      {/* ACT ONE · espresso. The object and the tension, in the book's
          own dark register. */}
      <header className="cw-pb-hero" data-world="espresso">
        <div className="cw-pb-hero__text">
          <p className="cw-services__kicker cw-reveal">
            68 pages · 10 chapters · 26 companion files · PDF
          </p>
          <h1 className="cw-pb-hero__title cw-reveal">Your build got to 80%.</h1>
          <p className="cw-pb-hero__sub cw-reveal">
            The rest of the way: ten chapters on the walls between demo
            and production, and the systems that get you through.
          </p>
          <p className="cw-pb-hero__cta cw-reveal">
            <a href="#pb-sampler-title" className="cw-mlink">
              Read chapter 1 free <span aria-hidden>↓</span>
            </a>
          </p>
        </div>
        <PlaybookHeroMedia />
      </header>

      {/* Pain, then the mirror. Plain text, no quote marks. */}
      <section className="cw-pb-pain" data-world="espresso" aria-label="If this is you">
        <p>It got to eighty percent. Then every change broke something that worked yesterday.</p>
        <p>The demo looked done. Production turned out to be a different machine entirely.</p>
        <p>It shipped. Nobody came.</p>
      </section>
      <section className="cw-pb-after" data-world="espresso" aria-label="After the manual">
        <p>It gets to a hundred. Every change stays fixed, because the rules live in the repo now.</p>
        <p>Production is a checklist you ran, not a machine you fear.</p>
        <p>It shipped. Ten people came back, one conversation at a time.</p>
      </section>

      {/* ACT TWO · bone. The credible human, then the evidence. Trust
          strip phrasings are ledger-locked (docs/LESSONS_LEARNED.md #3). */}
      <section className="cw-pb-trust" data-world="bone" aria-labelledby="pb-trust-title">
        <p className="cw-pb-eyebrow" id="pb-trust-title">Who wrote it · Micah Jones</p>
        <p className="cw-pb-trust__line cw-reveal">
          I built Ordani solo with Claude Code and Cursor. A
          HIPAA-compliant SaaS. Hundreds of birth workers pay for it.
        </p>
        <p className="cw-pb-trust__body">
          Before that I worked inside four companies that reached an
          exit, $5B+ combined, and my consulting work has produced $20M+
          in client revenue. The same playbook, written for AI-built
          software. Same stack you&rsquo;re using. Same wall I hit:
          this August, three of my live forms said &ldquo;Got it&rdquo;
          for weeks and delivered nothing, because one environment
          variable never reached the host.
        </p>
      </section>

      {/* Filmstrip — six real spreads, native horizontal scroll, no
          autoplay. Chrome stays currentColor; the petrol and saffron
          inside the renders never migrate to the page. */}
      <section className="cw-pb-film" data-world="bone" aria-labelledby="pb-film-title">
        <h2 id="pb-film-title" className="cw-pb-h2 cw-pb-film__title">Inside</h2>
        <p className="cw-pb-eyebrow cw-pb-film__hint">Six real spreads · scroll <span aria-hidden>→</span></p>
        <ul className="cw-pb-film__strip">
          {SPREADS.map((s) => (
            <li key={s.src} className="cw-pb-film__item">
              <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(max-width: 760px) 78vw, 440px" />
              <span className="cw-pb-film__cap">{s.cap}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Demonstration — one complete companion file, rendered through
          the book's own pre-flight grammar. */}
      <section className="cw-pb-demo" data-world="bone" aria-labelledby="pb-demo-title">
        <p className="cw-pb-eyebrow" id="pb-demo-title">Run tonight</p>
        <p className="cw-pb-demo__lede">
          Every chapter ends in a pre-flight card. Here is the one
          from chapter five, as it ships in the companion files.
        </p>
        <figure className="cw-pb-demo__card cw-reveal">
          <Image
            src="/playbook/companion-card.png"
            alt="A companion file rendered as a pre-flight card: the five security checks, each with a checkbox."
            width={1283}
            height={1150}
            sizes="(max-width: 760px) 92vw, 640px"
          />
          <figcaption className="cw-pb-proof__cap">
            checklists/05-security.md · one of ten
          </figcaption>
        </figure>
      </section>

      {/* The index is the proof: titles and real page numbers. */}
      <section className="cw-pb-sect cw-pb-sect--tight" data-world="bone" aria-labelledby="pb-toc-title">
        <h2 id="pb-toc-title" className="cw-pb-h2">Ten chapters</h2>
        <ol className="cw-pb-toc cw-pb-toc--index">
          {CHAPTERS.map((c) => (
            <li key={c.n} className="cw-pb-toc__row cw-pb-toc__row--index">
              <span className="cw-pb-toc__num" aria-hidden>{c.n}</span>
              <span className="cw-pb-toc__body">
                <span className="cw-pb-toc__title">{c.title}</span>
                <span className="cw-pb-toc__tag">{c.tag}</span>
              </span>
              <span className="cw-pb-toc__page">p. {c.page}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Free sample chapter — email capture. The page's one filled
          pill lives in this form. */}
      <section className="cw-pb-sampler" data-world="bone" aria-labelledby="pb-sampler-title">
        <h2 id="pb-sampler-title" className="cw-pb-h2">Read chapter 1 free</h2>
        <p className="cw-pb-sampler__lede">
          The real chapter, nine pages, not a teaser. Leave your email
          and I&rsquo;ll send it.
        </p>
        <PlaybookSignupForm />
      </section>

      {/* What ships — counted from the source, not estimated. */}
      <section className="cw-pb-sect cw-pb-sect--tight" data-world="bone" aria-labelledby="pb-zip-title">
        <h2 id="pb-zip-title" className="cw-pb-h2">What ships</h2>
        <ul className="cw-pb-counts">
          <li><strong>68</strong> pages</li>
          <li><strong>10</strong> pre-flight cards</li>
          <li><strong>9</strong> line-drawn diagrams</li>
          <li><strong>13</strong> dated build-log entries</li>
          <li><strong>26</strong> companion files</li>
          <li><strong>6</strong> prompt files for Claude Code and Cursor</li>
        </ul>
        <p className="cw-pb-counts__note">
          The 26 companion files: the ten cards, the six prompt files,
          and the templates with worked examples: SPEC.md, CLAUDE.md,
          USERS.md, LOOP.md, .env, an architecture doc.
        </p>
      </section>

      {/* ACT THREE · espresso. The commitment beat. */}
      <section className="cw-pb-price" data-world="espresso" aria-labelledby="pb-price-title">
        <p className="cw-pb-eyebrow" id="pb-price-title">Launch price</p>
        <p className="cw-pb-price__fig cw-reveal">$99</p>
        <p className="cw-pb-price__body">
          $149 after release. One payment: the PDF, the companion
          files, every future edition. Thirty-day refund, no questions.
        </p>
        <p className="cw-pb-price__note">
          {/* W3 (D8/R17, operator-locked): "first hundred buyers" was a
              scarcity device. Same fact, stated as pricing. The capture
              lives here too so the page's last action is never
              "scroll back up" (persona cold read, Pass-54). */}
          Not for sale yet. Leave your email for chapter 1 and I&rsquo;ll
          tell you the day it ships.
        </p>
        <div className="cw-pb-price__form">
          <PlaybookSignupForm />
        </div>
      </section>

      <section className="cw-pb-sect" data-world="espresso" aria-labelledby="pb-faq-title">
        <h2 id="pb-faq-title" className="cw-pb-h2">Questions</h2>
        <dl className="cw-pb-faq">
          {FAQS.map((f) => (
            <div key={f.q} className="cw-pb-faq__item">
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Cross-link for the other buyer. The mono grammar keeps the
          page to one filled pill. */}
      <section className="cw-services__foot" data-world="espresso">
        <p className="cw-services__foot-kicker">Past the playbook?</p>
        <h2 className="cw-services__foot-title">
          If your build needs a second pair of hands.
        </h2>
        <div className="cw-services__foot-cta-row">
          <a href="/services" className="cw-mlink">
            See the engagements <span aria-hidden>→</span>
          </a>
          <a href="/hire-me" className="cw-mlink">
            Hiring an operator <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
