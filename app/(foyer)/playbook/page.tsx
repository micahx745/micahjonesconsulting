// app/(foyer)/playbook/page.tsx
//
// /playbook — Buyer B (solo builders / "vibe coders") landing for the
// Tier-1 product, "The 80% Wall." Pass-25 two-buyer pivot, § 6.
//
// WAITLIST PHASE (operator-approved shape): no Lemon Squeezy checkout
// yet. The page sells the field manual and captures the email for the
// free Chapter 1 sampler ("Why your build broke at 80%"). The $149 /
// $99-early-bird price is shown as the planned price with a "launching
// soon" frame — no fake buy button (house-lights: no unattributed/
// misleading commerce affordances).
//
// Built in the Color Worlds system: reuses the cw-services page shell +
// cw-signup; cw-pb-* classes (globals.css) carry the playbook-specific
// pieces. Bone world (proven readable for long-form, matches /services).
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

// Pass-25 § 4 table of contents — ten chapters. Blurbs are claim-light
// (no unattributed stats) and name the concrete artifact each chapter
// hands the reader.
const CHAPTERS = [
  {
    n: "01",
    title: "Why your build broke at 80%",
    blurb:
      "What happens in the context window when the AI starts undoing your features. The structural reason, not the vibes.",
  },
  {
    n: "02",
    title: "The spec is the moat",
    blurb:
      "The one page the AI keeps re-reading. Why drift, not bugs, is what kills your build. Template included.",
  },
  {
    n: "03",
    title: "The architecture you didn't draw",
    blurb:
      "The single diagram every solo build needs. Auth, data, storage, third parties, and where AI tools quietly cut corners.",
  },
  {
    n: "04",
    title: "Deploy day",
    blurb:
      "Environment variables, databases, domains, SSL, secrets. The pre-flight list, in the order things bite you.",
  },
  {
    n: "05",
    title: "The security pre-flight",
    blurb:
      "Row-level security done right, the auth pattern that survives, and the hardcoded keys you left in. Two checks catch most of it.",
  },
  {
    n: "06",
    title: "Stripe in production",
    blurb:
      "Webhook reliability, refunds, subscription edge cases, and the test-to-live failures nobody warns you about.",
  },
  {
    n: "07",
    title: "Compliance, when it matters",
    blurb:
      "HIPAA, SOC 2, GDPR. When you genuinely need them, when you don't, and what compliant actually requires.",
  },
  {
    n: "08",
    title: "The first ten users",
    blurb:
      "Getting to the first ten people who keep using it. Where they come from, and why posting stopped working.",
  },
  {
    n: "09",
    title: "The distribution loop",
    blurb:
      "Turning the first ten into the next hundred. Reply, don't broadcast. The metric that matters before MRR.",
  },
  {
    n: "10",
    title: "When to hand it off",
    blurb:
      "The signals you've outgrown solo. When to hire, when to rent senior help, when to sell, and when to keep going.",
  },
] as const;

const ZIP = [
  "Ten pre-flight checklists, one per chapter",
  "Six prompt files for Claude Code and Cursor",
  "The SPEC.md template, plus three filled-in examples",
  "A CLAUDE.md invariants starter",
  "USERS.md and LOOP.md templates",
  "A sample architecture doc and .env.example",
] as const;

const FAQS = [
  {
    q: "Is this for me?",
    a: "You used Cursor, Claude Code, Lovable, v0, or Bolt to build something real, and it stalled between demo and production. Then yes.",
  },
  {
    q: "Do I need to know how to code?",
    a: "You need to read code and run a terminal. You don't need a CS degree. The AI writes; the manual teaches you to steer.",
  },
  {
    q: "How is this different from a YouTube tutorial?",
    a: "A tutorial shows one happy path. This is the failure modes — the parts that break after the tutorial ends, from someone who shipped through them.",
  },
  {
    q: "When does it ship, and is there a refund?",
    a: "Launching soon. Leave your email for Chapter 1 and the ship date. Thirty-day refund, no questions, once it's for sale.",
  },
] as const;

export default function PlaybookPage() {
  return (
    <main className="cw-services cw-playbook" data-section data-world="bone">
      {/* Pass-52 hero: asymmetric text + media slot. The slot ships
          the real cover render and takes the factory loop later with
          zero reflow (design-director spec). One CTA style: mlink
          down to the sampler — the filled pill stays the form's. */}
      <header className="cw-pb-hero">
        <div className="cw-pb-hero__text">
          <p className="cw-services__kicker">A field manual for solo builders</p>
          <h1 className="cw-pb-hero__title">The 80% Wall</h1>
          <p className="cw-services__intro">
            Why AI-assisted builds stall between demo and production,
            and the systems that carry them the rest of the way.
          </p>
          <p className="cw-pb-hero__cta">
            <a href="#pb-sampler-title" className="cw-mlink">
              Read Chapter 1 free <span aria-hidden>↓</span>
            </a>
          </p>
        </div>
        <PlaybookHeroMedia />
      </header>

      {/* Pain-led opener — the buyer's own internal monologue, plain
          text, no quote marks (Pass-25 § 6). */}
      <section className="cw-pb-pain" aria-label="If this is you">
        <p>It got to eighty percent. Then every change broke something that worked yesterday.</p>
        <p>The demo looked done. Production turned out to be a different machine entirely.</p>
        <p>It shipped. Nobody came.</p>
      </section>

      {/* Why this author — Ordani receipts + the stack. */}
      <section className="cw-pb-author" aria-labelledby="pb-author-title">
        <p className="cw-pb-eyebrow" id="pb-author-title">Why this one</p>
        <p className="cw-pb-author__body">
          I&rsquo;m not writing this from the sidelines. I built Ordani
          solo — a HIPAA-compliant SaaS for birth workers, written with
          Claude Code and Cursor. Fourteen
          practices in private beta. Two outside security reviews. None
          lost to a competitor at six months. Same stack you&rsquo;re
          using. Same wall I hit.
        </p>
      </section>

      {/* Proof strip (Pass-52): a real interior spread + a real
          companion file, rendered through the book's own Typst
          grammar. Evidence against padded-course skepticism — placed
          after credibility, before the TOC asks for faith. */}
      <section className="cw-pb-proof" aria-labelledby="pb-proof-title">
        <h2 id="pb-proof-title" className="cw-pb-h2">What you&rsquo;re actually buying</h2>
        <div className="cw-pb-proof__grid">
          <figure className="cw-pb-proof__item">
            <Image
              src="/playbook/spread-arch.png"
              alt="An interior page of the book: the five-box architecture map, drawn in petrol line work with a marginalia rail."
              width={1530}
              height={1980}
              sizes="(max-width: 760px) 92vw, 560px"
            />
            <figcaption className="cw-pb-proof__cap">
              Inside the book · § 03.2, the five-box map
            </figcaption>
          </figure>
          <figure className="cw-pb-proof__item">
            <Image
              src="/playbook/companion-card.png"
              alt="A companion file rendered as a pre-flight card: the five security checks, each with a checkbox."
              width={1283}
              height={1150}
              sizes="(max-width: 760px) 92vw, 380px"
            />
            <figcaption className="cw-pb-proof__cap">
              Companion file · checklists/05-security.md, one of ten
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Table of contents — ten chapters. */}
      <section className="cw-pb-sect cw-pb-sect--tight" aria-labelledby="pb-toc-title">
        <h2 id="pb-toc-title" className="cw-pb-h2">Ten chapters</h2>
        <ol className="cw-pb-toc">
          {CHAPTERS.map((c) => (
            <li key={c.n} className="cw-pb-toc__row">
              <span className="cw-pb-toc__num" aria-hidden>{c.n}</span>
              <span className="cw-pb-toc__body">
                <span className="cw-pb-toc__title">{c.title}</span>
                <span className="cw-pb-toc__blurb">{c.blurb}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="cw-pb-appendix">
          Plus an appendix: the prompt patterns that don&rsquo;t break
          your codebase — and which model handles which task best.
        </p>
      </section>

      {/* Free sample chapter — email capture. */}
      <section className="cw-pb-sampler" aria-labelledby="pb-sampler-title">
        <h2 id="pb-sampler-title" className="cw-pb-h2">Read Chapter 1 free</h2>
        <p className="cw-pb-sampler__lede">
          &ldquo;Why your build broke at 80%&rdquo; — the real chapter,
          not a teaser. Leave your email and I&rsquo;ll send it.
        </p>
        <PlaybookSignupForm />
      </section>

      {/* What ships with it — the companion files. */}
      <section className="cw-pb-sect cw-pb-sect--tight" aria-labelledby="pb-zip-title">
        <h2 id="pb-zip-title" className="cw-pb-h2">What ships with it</h2>
        <p className="cw-pb-sect__lede">
          A 68-page PDF, plus the companion download: 26 working
          files, ready to drop into your repo.
        </p>
        <ul className="cw-pb-zip">
          {ZIP.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Pricing — anchored, honest about the waitlist phase. */}
      <section className="cw-pb-price" aria-labelledby="pb-price-title">
        <p className="cw-pb-eyebrow" id="pb-price-title">Pricing</p>
        <p className="cw-pb-price__fig">$149</p>
        <p className="cw-pb-price__body">
          One payment. Ten chapters, the companion files, free
          re-issues. Less than one hour of a $5K-a-month advisory
          retainer.
        </p>
        <p className="cw-pb-price__note">
          {/* W3 (D8/R17, operator-locked): "first hundred buyers" was a
              scarcity device. Same fact, stated as pricing. */}
          Launch price $99; $149 after release. Get Chapter 1 free now,
          and I&rsquo;ll tell you the day it ships.
        </p>
      </section>

      {/* FAQ */}
      <section className="cw-pb-sect" aria-labelledby="pb-faq-title">
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

      {/* Cross-link for the other buyer — past the playbook = an
          engagement; hiring = /hire-me. */}
      <section className="cw-services__foot">
        <p className="cw-services__foot-kicker">Past the playbook?</p>
        <h2 className="cw-services__foot-title">
          If your build needs a second pair of hands.
        </h2>
        <p className="cw-services__foot-intro">
          The manual covers the solo build. If you&rsquo;re past it and
          need someone in the work, the engagement shapes are on the
          services page.
        </p>
        {/* W3 (D7): this page's one filled pill is the Chapter-1 form
            submit above; the cross-links demote to the mono grammar. */}
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
