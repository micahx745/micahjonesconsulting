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
// Two world shifts only: object (espresso) → paper (bone) → back cover
// (espresso).
//
// MOTION, REVERSED BY THE OPERATOR 2026-09-01. This header read "Zero reveals,
// zero transitions on this page", from his Pass-55 verdict ("still looks bad. I
// don't see any inspiration from others. find unique things, no animations").
// He later asked for the opposite, verbatim: "ok i like the chart animation
// make it look amazing and built by a world class team." Both are on the record
// rather than one quietly overwriting the other.
// What ships is <WallChart />: the book's own page-6 figure drawn once on load,
// approved in writing by the motion-engineer as a FIGURE animation, not a second
// signature. He first asked for an AI-generated "vibe coding factory" loop; that
// was declined under DESIGN_BAR R12 (AI-generated imagery, named) and the
// illustration ban in .claude/CLAUDE.md.
//
// Claims: ledger phrasings only (docs/LESSONS_LEARNED.md #3); the
// build-log entry is the true 2026-08-31 dead-forms story. Vendor gate
// holds. Waitlist phase: capture only, until the $99 button flips.
import type { Metadata } from "next";
import Image from "next/image";

import { PlaybookSignupForm } from "@/components/color-worlds/PlaybookSignupForm";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { PromptDiff } from "@/components/color-worlds/PromptDiff";
import { WallChart } from "@/components/color-worlds/WallChart";
import { PlaybookBuyButton } from "@/components/PlaybookBuyButton";
import { PLAYBOOK_ON_SALE } from "@/lib/playbook-sale";

// Pass-98 note on the description length. The brief specified a 166-character
// string and recorded it as 156. scripts/render-gate.mjs caps a rendered
// description at 160 because Google cuts the tail, so the word "working" came
// out of "26 working files" — the only edit that drops no number and no
// ledgered phrase. 158 characters as it ships.
const DESCRIPTION =
  "You built it with AI and shipped it. Now get the first ten users. Ten chapters, 69 pages, 26 files, from the operator who shipped a HIPAA-compliant SaaS solo.";

export const metadata: Metadata = {
  // Pass-74. The root layout appends " — Micah Jones" (14 chars), which pushed
  // the rendered title to 61 and the description to 204 — both past where
  // Google cuts. The em-dash became a colon: it buys the character the title
  // needed AND drops the rendered title from two em-dashes to one, which is
  // the LESSONS #11 cap. Numbers are the page's own verified counts.
  //
  // Pass-98: the title now carries the beat 29 of 325 r/buildinpublic bodies
  // wrote for themselves (8.9%), because a title is where search reads and a
  // reader recognises himself. 37 chars here, 51 rendered.
  title: "The 80% Wall: it shipped, nobody came",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.micahjonesconsulting.com/playbook" },
  openGraph: {
    title: "The 80% Wall: it shipped, nobody came",
    description: DESCRIPTION,
    type: "website",
    url: "https://www.micahjonesconsulting.com/playbook",
    siteName: "Micah Jones",
  },
  // opengraph-image.tsx generates twitter:image but NOT twitter:card (verified
  // in the Next 16 file-convention docs), so the card type is set explicitly or
  // the unfurl renders as a small thumbnail.
  twitter: { card: "summary_large_image" },
};

// The book's real table of contents; page numbers are the queried values from
// the assembled 69pp PDF, re-read off its own contents page after the chapter-6
// filecard pushed chapters seven through ten down by one. Regenerate whenever
// pagination moves: these numbers are a promise a buyer can check in seconds,
// and a stale one is the cheapest possible way to look careless.
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
    page: 44,
  },
  {
    n: "08",
    title: "The first ten users",
    tag: "Ten users from conversations",
    page: 50,
  },
  {
    n: "09",
    title: "The distribution loop",
    tag: "Second-hand users, the loop",
    page: 57,
  },
  {
    n: "10",
    title: "When to hand it off",
    tag: "Hire, rent, sell, keep going",
    page: 63,
  },
] as const;

const FAQS = [
  // Pass-98. "vibe-coded" lands here and nowhere else on the page. It is the
  // operator's own target term (app/sitemap.ts, the back-cover copy), and the
  // market count the research leg cited for it is not on disk — so it goes in
  // an FAQ, which feeds FAQPage structured data, rather than in a headline.
  // This also retires "stalled between demo and production", a compound
  // phrasing with no count behind it.
  {
    q: "Is this for me, if I vibe-coded it?",
    a: "You built something real with Cursor, Claude Code, Lovable, v0 or Bolt. It works. Nobody is using it yet, or the next change keeps breaking it. Then yes.",
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

// Pass-98: this used to be a hand-flipped PURCHASE_LIVE constant sitting two
// screens away from the button it described. It now reads the same flag the
// button does (lib/playbook-sale.ts), so the structured data and the page can
// never disagree about whether the book is for sale. Availability is a
// machine-readable factual claim, which is why it is derived and not typed.
const BOOK_URL = "https://www.micahjonesconsulting.com/playbook";

const AVAILABILITY = PLAYBOOK_ON_SALE
  ? "https://schema.org/InStock"
  : "https://schema.org/PreOrder";

// Book + Offer. Every value here is checkable against the artifact itself:
// 69 pages and 10 chapters are counted from the compiled PDF, and the 26
// companion files are counted from the shipped ZIP.
const BOOK_LD = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "The 80% Wall",
  headline: "The 80% Wall",
  bookFormat: "https://schema.org/EBook",
  numberOfPages: 69,
  inLanguage: "en",
  url: BOOK_URL,
  image: "https://www.micahjonesconsulting.com/playbook/book-cover.png",
  description:
    "A field manual for solo founders: why AI-assisted builds stall after they ship, and the systems that carry them through. Ten chapters, 69 pages, 26 companion files.",
  author: {
    "@type": "Person",
    name: "Micah Jones",
    url: "https://www.micahjonesconsulting.com/about",
  },
  publisher: { "@type": "Person", name: "Micah Jones" },
  about: [
    "AI-assisted software development",
    "Shipping to production",
    "Application security",
    "Deployment",
  ],
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
    availability: AVAILABILITY,
    url: BOOK_URL,
    seller: { "@type": "Person", name: "Micah Jones" },
  },
};

// Product, added Pass-98. Book carries the editorial facts; Product is what a
// shopping surface reads, and it is the type that makes price, currency and
// availability legible to a machine. PreOrder until the flag flips, so nothing
// here asserts a purchase the page cannot take.
const PRODUCT_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The 80% Wall",
  description:
    "A field manual for solo founders: ten chapters, 69 pages and 26 companion files on what the AI leaves to you after the code works.",
  url: BOOK_URL,
  image: "https://www.micahjonesconsulting.com/playbook/book-cover.png",
  brand: { "@type": "Person", name: "Micah Jones" },
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "USD",
    availability: AVAILABILITY,
    url: BOOK_URL,
    seller: { "@type": "Person", name: "Micah Jones" },
  },
};

// Breadcrumb, added Pass-98. Two levels, because that is the real depth.
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.micahjonesconsulting.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "The 80% Wall",
      item: BOOK_URL,
    },
  ],
};

// The five questions already on the page, generated from the same array that
// renders them so the two can never drift apart.
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PlaybookPage() {
  return (
    <main className="cw-services cw-lp" data-section>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BOOK_LD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_LD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }}
      />
      {/* 1. THE OBJECT — espresso */}
      <header className="cw-lp-object" data-world="espresso">
        <div className="cw-lp-book">
          {/* The binding stays: it is what makes the cover read as an object.
              The wording on it went (operator, 2026-09-01) — it repeated the
              title at 8px and said nothing the cover did not already say. */}
          <div className="cw-lp-book__spine" aria-hidden />

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
          {/* Pass-98: "solo builders" had zero authors in the asking corpus.
              "solo founders" is what six of them wrote. That is a weak count
              against an unverified file, which is why it changes a kicker and
              not the headline. */}
          <p className="cw-lp-kicker">A field manual for solo founders</p>
          <h1 className="cw-lp-object__title">
            The AI handed you the code. Now ship the company.
          </h1>
          {/* The list order changed in Pass-98 and nothing else did: "the
              first ten users" moved from last to first, because it is the
              pain 8 authors named and the other four are the ones they meet
              on the way to it. */}
          <p className="cw-lp-object__sub">
            Ten chapters on what the AI leaves to you: the first ten users,
            auth, deploys, payments, compliance. I joined Postmates,
            SurveyMonkey, Guardicore (Akamai) and Neuton.AI early. Four exits,
            $5B+ combined. I built Ordani solo with Claude Code and Cursor:
            HIPAA-compliant, active paying users, in beta.
          </p>
          {/* The byline shrank to a name and a link because the history moved
              up into the sub, where the operator was looking for it.
              REVERSAL RECORDED (2026-09-02, operator: "remove the sales part
              too"): this block used to read "Enterprise cybersecurity sales at
              Guardicore". The word "sales" was there on purpose, because an
              unqualified cybersecurity credential beside a chapter called "The
              security pre-flight" implies a technical role the ledger does not
              support. His call, and the resolution keeps it honest: the
              companies are now named as places he JOINED, with no job title
              anywhere, so no role is claimed and none can be inferred wrongly.
              Also gone: $20M+ in client revenue, a consulting number that
              answers a different buyer's question and still lives on /about. */}
          <p className="cw-lp-object__by">
            By Micah Jones. <a href="/work">The case studies</a>{" "}
            <span aria-hidden>→</span>
          </p>
          <WallChart />
          {/* The primary action, as a real button rather than a text link.
              Pass-98 built both states of it. OFF (today): the $99 rail is
              wired and test-verified, but the live Stripe webhook is not
              registered, so the strongest action the page can honour is
              chapter one. ON: the same pill becomes the buy, and chapter one
              demotes to the text link beside it. Nothing in either state
              promises a purchase the page cannot take. */}
          <div className="cw-lp-object__row">
            {PLAYBOOK_ON_SALE ? (
              <>
                <PlaybookBuyButton
                  label="Buy the manual · $99"
                  className="cw-cta cw-lp-object__cta"
                />
                <a href="#pb-free" className="cw-mlink">
                  Or read chapter one free <span aria-hidden>↓</span>
                </a>
                <p className="cw-lp-object__meta">
                  $99 · PDF + ZIP · 30-day refund
                </p>
              </>
            ) : (
              <>
                <a href="#pb-free" className="cw-cta cw-lp-object__cta">
                  Get chapter one free{" "}
                  <span className="cw-arr" aria-hidden>
                    →
                  </span>
                </a>
                <p className="cw-lp-object__meta">
                  $99 at launch · coming soon
                </p>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. THE PAPER — bone. Main column + marginalia rail. */}
      <div className="cw-lp-page" data-world="bone">
        {/* Pass-98 reordered these three and rewrote the third.
            "It shipped. Nobody came." is the operator's own sentence and its
            beat is the most common one in the corpus: 29 of 325
            r/buildinpublic bodies, 8.9%. It was sitting last.
            The line that was FIRST ("It got to eighty percent. Then every
            change broke something that worked yesterday.") measured 1.0% on a
            phrasing-free test, so it was rewritten onto "kept running into",
            which 13 authors used at 7.3x lift. Tuesday is chapter one's own
            example. */}
        <section
          className="cw-lp-block cw-lp-block--breath"
          aria-labelledby="lp-you"
        >
          <div className="cw-lp-block__main">
            <h2 id="lp-you" className="cw-lp-h">
              If this is you
            </h2>
            <div className="cw-lp-lines">
              <p>It shipped. Nobody came.</p>
              <p>
                The demo looked done. Production turned out to be a different
                machine entirely.
              </p>
              <p>
                You kept running into the same thing. Fixed Tuesday, broken
                Friday, because the tool forgot.
              </p>
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
            </figure>
            {/* Pass-98 added the metric and its mechanism. A field note that
                only says "I built a thing" is a claim; one that says what
                moved and what it replaced is a receipt. 40% to 91% is the
                ledgered intake figure and the paper packet is live copy on
                /work/ordani, so nothing new is asserted here. */}
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>Ordani is a
              HIPAA-compliant SaaS for birth workers, in beta with active paying
              users and a public release coming. Its intake replaced a paper
              packet; completion moved from 40% to a measured 91%. I hit this
              wall building it, on the tools you are using now.
            </p>
          </aside>
        </section>

        {/* Pass-98. The second real spread. The wall (page 6) shows the
            argument; the rings (page 51) show the chapter a reader is most
            likely here for. The image has been deployed since Pass-55 and no
            file referenced it. */}
        <section className="cw-lp-block" aria-labelledby="lp-page-rings">
          <div className="cw-lp-block__main">
            <h2 id="lp-page-rings" className="cw-lp-h">
              Where the ten live
            </h2>
            <figure className="cw-lp-spread">
              <Image
                src="/playbook/spread-rings.png"
                alt="Page fifty-one of the manual: three concentric rings, people you know in the middle, people they know around them, strangers at the edge, with the ask that fits each ring."
                width={1530}
                height={1980}
                sizes="(max-width: 1000px) 92vw, 640px"
              />
              <figcaption className="cw-lp-cap">
                § 08.2 · Where the ten actually live · page 51 of 69
              </figcaption>
            </figure>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.2
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Three rings, drawn for the book. Your ten users are one ask away,
              and a hundred conversations is a month of mornings.
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
                § 01.4 · Why it hits at 80% and not sooner · page 6 of 69
              </figcaption>
            </figure>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.3
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Nine line-drawn diagrams, each drawn for this book. No stock art
              anywhere in it.
            </p>
          </aside>
        </section>

        {/* The prompt diff. Sits straight after the spread, where a reader is
            deciding whether the writing is any good, and answers it with the
            book's own words instead of a claim about them. */}
        <section className="cw-lp-block" aria-labelledby="lp-diff">
          <div className="cw-lp-block__main">
            <h2 id="lp-diff" className="cw-lp-h">
              One sentence, four rounds apart
            </h2>
            <PromptDiff />
          </div>
          <aside className="cw-lp-block__rail">
            § 0.4
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Both sentences are quoted from chapter two, word for word.
            </p>
          </aside>
        </section>

        <section
          className="cw-lp-block cw-lp-block--breath"
          aria-labelledby="lp-log"
        >
          <div className="cw-lp-block__main">
            <h2 id="lp-log" className="cw-lp-h">
              One entry
            </h2>
            <article className="cw-lp-log">
              <p className="cw-lp-log__head">
                <span>From the build log</span>
                <span>Entry · 2026-08-31</span>
              </p>
              <h3 className="cw-lp-log__title">The demo that lied for weeks</h3>
              {/* Pass-85. This card previously said the cause was "one
                  environment variable, the email key, was never installed".
                  Asked to confirm it on 2026-09-02 the operator answered "not
                  sure - you were the one you added that", so that cause has NO
                  provenance. It sits under a rail reading "All true, all dated.
                  None of them are anyone else's story", on the page selling a
                  $149 manual, and it mirrors chapter one of the book. An
                  unverifiable cause is exactly the LESSONS #2 defect class.

                  Rewritten onto the ONE version this repo actually documents:
                  LESSONS #8, dated 2026-08-29 - the domain carried zero MX
                  records and no SPF/DKIM/DMARC, so Resend rejected the sends
                  and the leads survived only in a Vercel server log.

                  Count corrected too: it said THREE forms including contact,
                  but no contact form was mounted on any page until 2026-09-02
                  (Pass-76). At the time there were two.

                  NOTE FOR THE BOOK REPO: chapter-01.typ carries this same
                  story and needs the same correction. */}
              <p>
                My own site had two lead forms: a sample-chapter signup and a
                beta waitlist. Both worked flawlessly in the demo. In
                production, every submission fell into a server log nobody
                reads. The sending domain had never been verified, so the mail
                provider refused each message and the address I had published
                could not receive one either.
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
            § 0.5
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              Thirteen entries like this one in the manual. All true, all dated.
              None of them are anyone else&rsquo;s story.
            </p>
          </aside>
        </section>
      </div>

      {/* Pass-98. One quiet full-bleed section, and it is a page of the book:
          the chapter-two opener, at the size it prints. No copy, no heading,
          no caption, because the page has been talking for four blocks and
          this is the pause. It sits OUTSIDE the bone shell on purpose, so the
          WorldSwitcher carries the ground to espresso and back and the reader
          feels the book open rather than reads a claim that it is one.
          R12-legal: a real artifact, not decoration. Nothing here animates. */}
      <section data-section data-world="espresso" className="cw-lp-opener">
        <Image
          src="/playbook/spread-opener-02.png"
          alt="Chapter two opener: The spec is the moat"
          width={1488}
          height={2105}
          sizes="(max-width: 760px) 88vw, 560px"
        />
      </section>

      <div className="cw-lp-page cw-lp-page--cont" data-world="bone">
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
            § 0.6
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
              The whole first chapter, not an excerpt. Leave your email and it
              arrives in about a minute.
            </p>
            <PlaybookSignupForm plain />
          </div>
          <aside className="cw-lp-block__rail">
            § 0.7
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
            {/* The 26 files were a number in a spec row and nowhere else. They
                are the difference between a PDF and a toolkit, so they are
                itemised here. Counts are from the shipped ZIP: 10 + 6 + 9 + a
                README. The two SPEC examples named last appear in no chapter,
                so a buyer had no way to know they exist. */}
            <ul className="cw-lp-files">
              <li>
                <strong>Ten pre-flight checklists.</strong> One per chapter, the
                card above being the security one. You run them the same night.
              </li>
              <li>
                <strong>Six prompt files</strong> for Claude Code and Cursor: a
                session opener, an architecture mapper, an invariant extractor,
                a diff reviewer, a payments wiring prompt, and an outreach
                drafter.
              </li>
              {/* Pass-98 count correction. The archive holds NINE files under
                  templates/; the 26th entry is the README. The 2026-09-03
                  adjudication that said ten counted the README as a template.
                  The probe is `zipfile.namelist()`, not a document. */}
              <li>
                <strong>Nine templates</strong>, including three worked SPEC
                files written end to end: a booking app, a photographer gallery,
                and an internal ops tracker. Also a starter invariants file, an
                architecture sample, and a real env example.
              </li>
            </ul>
          </div>
          <aside className="cw-lp-block__rail">
            § 0.8
            <p className="cw-lp-note">
              <span className="cw-lp-note__lbl">Field note</span>
              The gallery and ops SPEC files appear in no chapter. They are
              there because writing a spec is easier with one you can copy.
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
                <strong>69</strong>
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
              {/* Pass-98: the Author row is the only place the page answers
                  "who are you" beside the price, so it carries the two facts
                  a buyer weighs there. No city, per the 2026-09-02 ruling. */}
              <dt>Author</dt>
              <dd>
                Micah Jones · built Ordani solo · four exits behind my work
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
              <dd>{PLAYBOOK_ON_SALE ? "On sale" : "Coming soon"}</dd>
            </dl>
          </div>
          {/* Pass-98 closed two of the three Pass-61 purchase blockers here.
              ON: the buy is the page's one filled pill and the refund sits
              directly under it, where the decision is made, instead of five
              screens away in an FAQ. OFF: the second email form came out.
              Two forms asking for the same address on one page is a page that
              does not know what it wants; the free chapter block keeps the
              only one, and this column links up to it. */}
          <div>
            {PLAYBOOK_ON_SALE ? (
              <>
                <p className="cw-lp-kicker">The manual</p>
                <PlaybookBuyButton
                  label="Buy the manual · $99"
                  className="cw-cta cw-lp-object__cta"
                />
                <p className="cw-lp-body cw-lp-back__refund">
                  Thirty days, full refund, no questions asked. Reply to the
                  delivery email and I refund it.
                </p>
                <p className="cw-lp-back__alt">
                  <a href="#pb-free" className="cw-mlink">
                    Not today? Chapter one is free, above{" "}
                    <span aria-hidden>↑</span>
                  </a>
                </p>
              </>
            ) : (
              <>
                <p className="cw-lp-kicker">The day it ships</p>
                <p className="cw-lp-back__note">
                  Leave your email for chapter one now, and I&rsquo;ll tell you
                  the day the full manual opens, at the launch price.
                </p>
                <p className="cw-lp-back__alt">
                  <a href="#pb-free" className="cw-mlink">
                    Chapter one, free <span aria-hidden>↑</span>
                  </a>
                </p>
              </>
            )}
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
          {/* Pass-74: was /services#packages. The packages moved to their own
              page in Pass-70, so this dropped a reader who had just clicked
              "Fixed-price packages" onto a page that no longer had any. The
              link still resolved, which is why nothing caught it. */}
          <a href="/packages" className="cw-mlink">
            Fixed-price packages <span aria-hidden>→</span>
          </a>
          <a href="/call" className="cw-mlink">
            Book a free intro call <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
