// app/(room)/playbook/page.tsx
//
// Pass-55 — "The manual, opened." Operator verdict on the Pass-53/54
// launch page (2026-09-01): "still looks bad. I don't see any
// inspiration from others. find unique things, no animations."
//
// The direction, locked with the operator ("go"): the page is built
// from the BOOK's own print grammar instead of a landing-page
// template. Named moves and their sources:
//   1. The cover as an object, at scale — Stripe Press.
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
//
// PASS-101 PHASE 3 (WINNING-BRIEF §15.2; brief §3 item 2: "the manual
// section's composition at page scale (cover left in the dashed frame, ledger
// right), then the page's existing content ... in the system's type and
// grounds; PLAYBOOK_ON_SALE untouched").
//
// The page OPENS on §15.2 at page scale: the cover fills columns 1-5 at 4:5
// inside the dashed frame with the file line under it, and every word moves to
// columns 6-12 — the label, the display line at --d2 (never --d: at the poster
// size it out-shouts the cover it is describing), the chapters paragraph, the
// byline, the figure, then the buy block with $99 at 64px.
//
// BOTH PLAYBOOK_ON_SALE BRANCHES ARE UNTOUCHED. Same flag, same
// <PlaybookBuyButton> call with the same label, same hrefs, same fallback copy
// in both states. The only change is that "$99 at launch · coming soon" is set
// as the figure and its label rather than as one 14px line, which is §15.2's
// own composition of the same string.
//
// Everything after the hero keeps its markup, its order and its words, and
// takes the system's type and grounds: the marginalia rail becomes the block's
// right column, the § codes and field notes take the label style, the spreads
// take the one media frame, the contents take the ledger, and the back cover's
// spec card becomes the register on espresso.
//
// <WallChart />, <PromptDiff />, <PlaybookSignupForm /> and
// <PlaybookBuyButton /> are rendered exactly as before. None of their internals
// is touched; they are restyled through the class names their own markup
// carries (app/room-and-ledger.css §15).
import type { Metadata } from "next";
import Image from "next/image";

import { PlaybookSignupForm } from "@/components/color-worlds/PlaybookSignupForm";
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
  title: "The 80% Wall: now ship the company",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.micahjonesconsulting.com/playbook" },
  openGraph: {
    title: "The 80% Wall: now ship the company",
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
  { n: "02", title: "The spec is the moat", tag: "When the build drifts", page: 12 },
  {
    n: "03",
    title: "The architecture you didn't draw",
    tag: "Auth, data, storage, and how they connect",
    page: 19,
  },
  {
    n: "04",
    title: "Deploy day",
    tag: "Environment variables, migrations, domains",
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
    tag: "HIPAA, GDPR, SOC 2: when each matters",
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
    tag: "Users who bring more users",
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
    q: "Is this for me if I built it with AI coding tools?",
    a: "You built something real with Cursor, Claude Code, Lovable, v0 or Bolt. It works. Nobody is using it yet, or the next change keeps breaking it. Then yes.",
  },
  {
    q: "Do I need to know how to code?",
    a: "You need to read code and run a terminal. The AI writes; I show you how to steer.",
  },
  {
    q: "How is this different from a tutorial?",
    a: "A tutorial shows one happy path. I show what breaks and how I shipped through it.",
  },
  {
    q: "What if it does not help?",
    a: "Thirty days, full refund, no questions asked. Reply to the delivery email and I refund it.",
  },
  {
    q: "Will it go stale?",
    a: "The tools change monthly. The problems stay. Every future edition is included and goes to the same email.",
  },
] as const;

// Pass-98: this used to be a hand-flipped PURCHASE_LIVE constant sitting two
// screens away from the button it described. It now reads the same flag the
// button does (lib/playbook-sale.ts), so the structured data and the page can
// never disagree about whether the book is for sale. Availability is a

const BOOK_URL = "https://www.micahjonesconsulting.com/playbook";

const AVAILABILITY = PLAYBOOK_ON_SALE
  ? "https://schema.org/InStock"
  : "https://schema.org/PreOrder";

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
    <>
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

      {/* §15.2 — the manual, at page scale. */}
      <section
        className="rl-manual rl-wrap rl-first"
        aria-labelledby="rl-playbook-title"
      >
        <div className="rl-grid">
          <figure className="art" data-rl="media">
            <div className="frame">
              <span className="cov">
                <Image
                  src="/playbook/book-cover.png"
                  alt="The cover of The 80% Wall: an espresso spec-sheet page, the title stacked in bone and terracotta display type."
                  width={1819}
                  height={2572}
                  priority
                  sizes="(max-width: 900px) 92vw, 520px"
                />
              </span>
            </div>
            <figcaption>
              <span className="rl-l meta">the-80-percent-wall.pdf</span>
              <span className="rl-l meta">
                PDF + ZIP &middot; every future edition
              </span>
            </figcaption>
          </figure>

          <div className="copy">
            <div className="rl-sec rl-sec--wide">
              {/* Pass-98: "solo builders" had zero authors in the asking
                  corpus. "solo founders" is what six of them wrote. That is a
                  weak count against an unverified file, which is why it
                  changes a kicker and not the headline. */}
              <div className="rl-eyebrow">
                <span className="rl-l">
                  A field manual for people building on their own
                </span>
              </div>
              <h1 id="rl-playbook-title" className="rl-d two" data-rl="head">
                The AI handed you the code. Now ship the company.
              </h1>
            </div>

            {/* The list order changed in Pass-98 and nothing else did: "the
                first ten users" moved from last to first, because it is the
                pain 8 authors named and the other four are the ones they meet
                on the way to it. */}
            <p className="rl-lede">
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
            <p className="rl-l meta">
              By Micah Jones.{" "}
              <a href="/work" className="rl-link">
                The case studies
              </a>{" "}
              <span className="rl-ar" aria-hidden>
                &#8594;
              </span>
            </p>

            <WallChart />

            {/* The primary action, as a real button rather than a text link.
                Pass-98 built both states of it. OFF (today): the $99 rail is
                wired and test-verified, but the live Stripe webhook is not
                registered, so the strongest action the page can honour is
                chapter one. ON: the same pill becomes the buy, and chapter one
                demotes to the text link beside it. Nothing in either state
                promises a purchase the page cannot take. */}
            <div className="buy">
              {PLAYBOOK_ON_SALE ? (
                <>
                  <div className="v rl-num">
                    $99
                    <span className="rl-l">
                      PDF + ZIP &middot; 30-day refund
                    </span>
                  </div>
                  <PlaybookBuyButton
                    label="Buy the manual · $99"
                    className="rl-buy rl-buy--auto"
                  />
                  <a href="#pb-free" className="rl-link">
                    Or read chapter one free <span aria-hidden>&darr;</span>
                  </a>
                </>
              ) : (
                <>
                  <div className="v rl-num">
                    $99
                    <span className="rl-l">at launch &middot; coming soon</span>
                  </div>
                  <a href="#pb-free" className="rl-chip">
                    <span className="t">Get chapter one free</span>
                    <span className="a" aria-hidden>
                      <span>&#8594;</span>
                    </span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pass-98 reordered these three and rewrote the third.
          "It shipped. Nobody came." is the operator's own sentence and its
          beat is the most common one in the corpus: 29 of 325
          r/buildinpublic bodies, 8.9%. It was sitting last.
          The line that was FIRST ("It got to eighty percent. Then every
          change broke something that worked yesterday.") measured 1.0% on a
          phrasing-free test, so it was rewritten onto "kept running into",
          which 13 authors used at 7.3x lift. Tuesday is chapter one's own
          example. */}
      <div className="rl-wrap">
        <section className="rl-block" aria-labelledby="lp-you">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 id="lp-you" className="rl-d two" data-rl="head">
                If this is you
              </h2>
            </div>
            <div className="rl-lines" data-rl-group="symptoms">
              <p data-rl="rule">It shipped. Nobody came.</p>
              <p data-rl="rule">
                The demo looked done. Production turned out to be a different
                machine entirely.
              </p>
              <p data-rl="rule">
                You kept running into the same thing. Fixed Tuesday, broken
                Friday. The tool forgot.
              </p>
            </div>
            <p className="rl-body rl-air-m">
              The wall is not a talent problem. It is arithmetic: the
              tool&rsquo;s memory runs out, and yours has to take over, on
              paper, in the repo. This manual is that hand-off, one system per
              chapter.
            </p>
          </div>
          <aside className="rail">
            <span className="rl-l">§ 0.1</span>
            <figure className="rl-figure" data-rl="media">
              <Image
                src="/hero-context.jpg"
                alt="Micah Jones working at a laptop in front of a whiteboard covered in service architecture."
                width={1800}
                height={1800}
                sizes="(max-width: 999px) 40vw, 260px"
              />
            </figure>
            {/* Pass-98 added the metric and its mechanism. A field note that
                only says "I built a thing" is a claim; one that says what
                moved and what it replaced is a receipt. 40% to 91% is the
                ledgered intake figure and the paper packet is live copy on
                /work/ordani, so nothing new is asserted here. */}
            <p className="rl-note">
              <span className="rl-l">Field note</span>Ordani is a
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
        <section className="rl-block" aria-labelledby="lp-page-rings">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 id="lp-page-rings" className="rl-d two" data-rl="head">
                Where the ten live
              </h2>
            </div>
            <figure className="rl-figure" data-rl="media">
              <Image
                src="/playbook/spread-rings.png"
                alt="Page fifty-one of the manual: three concentric rings, people you know in the middle, people they know around them, strangers at the edge, with the ask that fits each ring."
                width={1530}
                height={1980}
                sizes="(max-width: 1000px) 92vw, 640px"
              />
              <figcaption>
                <span className="rl-l meta">
                  § 08.2 &middot; Where the ten actually live &middot; page 51
                  of 69
                </span>
              </figcaption>
            </figure>
          </div>
          <aside className="rail">
            <span className="rl-l">§ 0.2</span>
            <p className="rl-note">
              <span className="rl-l">Field note</span>
              Three rings, drawn for the book. Your ten users are one ask away,
              and a hundred conversations is a month of mornings.
            </p>
          </aside>
        </section>

        <section className="rl-block" aria-labelledby="lp-page">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 id="lp-page" className="rl-d two" data-rl="head">
                Read a page
              </h2>
            </div>
            <figure className="rl-figure" data-rl="media">
              <Image
                src="/playbook/spread-wallchart.png"
                alt="Page six of the manual: the wall chart, two lines crossing where unwritten rules outnumber what fits in the context window, above the three reasons the wall hits at 80%."
                width={1530}
                height={1980}
                sizes="(max-width: 1000px) 92vw, 640px"
              />
              <figcaption>
                <span className="rl-l meta">
                  § 01.4 &middot; Why it hits at 80% and not sooner &middot;
                  page 6 of 69
                </span>
              </figcaption>
            </figure>
          </div>
          <aside className="rail">
            <span className="rl-l">§ 0.3</span>
            <p className="rl-note">
              <span className="rl-l">Field note</span>
              Nine line-drawn diagrams, all drawn for this book. No stock art.
            </p>
          </aside>
        </section>

        {/* The prompt diff. Sits straight after the spread, where a reader is
            deciding whether the writing is any good, and answers it with the
            book's own words instead of a claim about them. */}
        <section className="rl-block" aria-labelledby="lp-diff">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 id="lp-diff" className="rl-d two" data-rl="head">
                One sentence, four rounds apart
              </h2>
            </div>
            <PromptDiff />
          </div>
          <aside className="rail">
            <span className="rl-l">§ 0.4</span>
            <p className="rl-note">
              <span className="rl-l">Field note</span>
              Both sentences are quoted from chapter two, word for word.
            </p>
          </aside>
        </section>

        <section className="rl-block" aria-labelledby="lp-log">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 id="lp-log" className="rl-d two" data-rl="head">
                One entry
              </h2>
            </div>
            <article className="rl-log" data-rl="rise">
              <p className="head">
                <span className="rl-l">From the build log</span>
                <span className="rl-l">Entry &middot; 2026-08-31</span>
              </p>
              <h3 className="title">The demo that lied for weeks</h3>
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
          <aside className="rail">
            <span className="rl-l">§ 0.5</span>
            <p className="rl-note">
              <span className="rl-l">Field note</span>
              Thirteen entries like this one in the manual. All true, all dated,
              all mine.
            </p>
          </aside>
        </section>
      </div>

      {/* Pass-98. One quiet full-bleed section, and it is a page of the book:
          the chapter-two opener, at the size it prints. No copy, no heading,
          no caption, because the page has been talking for four blocks and
          this is the pause. R12-legal: a real artifact, not decoration.
          Nothing here animates beyond the system's own 10px media rise. */}
      <section className="rl-opener" aria-hidden="true">
        <Image
          src="/playbook/spread-opener-02.png"
          alt=""
          width={1488}
          height={2105}
          sizes="(max-width: 760px) 88vw, 560px"
          data-rl="media"
        />
      </section>

      <div className="rl-wrap">
        <section className="rl-block" aria-labelledby="lp-toc">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 id="lp-toc" className="rl-d two" data-rl="head">
                Contents
              </h2>
            </div>
            <ol className="rl-toc" data-rl-group="toc">
              {CHAPTERS.map((c) => (
                <li key={c.n} data-rl="rule">
                  <span className="rl-l num" aria-hidden>
                    {c.n}
                  </span>
                  <span className="body">
                    <span className="title">{c.title}</span>
                    <span className="rl-l meta tag">
                      {c.tag}
                      {"free" in c && c.free ? <em> · free, below</em> : null}
                    </span>
                  </span>
                  <span className="rl-l meta page rl-num">p. {c.page}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="rail">
            <span className="rl-l">§ 0.6</span>
            <p className="rl-note">
              <span className="rl-l">Field note</span>
              Every chapter ends in a pre-flight card you run the same night.
              The cards ship separately as files, too.
            </p>
          </aside>
        </section>

        <section className="rl-block" aria-labelledby="pb-free" id="pb-free">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 className="rl-d two" data-rl="head">
                Chapter one, free
              </h2>
            </div>
            <p className="rl-lede">
              Get the whole first chapter. Leave your email and it
              arrives in about a minute.
            </p>
            <div className="rl-form rl-air-m">
              <PlaybookSignupForm plain />
            </div>
          </div>
          <aside className="rail">
            <span className="rl-l">§ 0.7</span>
            <p className="rl-note">
              <span className="rl-l">Field note</span>
              One email with the PDF. A second on the
              day the manual ships. No sequence, no drip.
            </p>
          </aside>
        </section>

        <section className="rl-block" aria-labelledby="lp-run">
          <div className="main">
            <div className="rl-sec rl-sec--wide">
              <h2 id="lp-run" className="rl-d two" data-rl="head">
                Run tonight
              </h2>
            </div>
            <figure className="rl-figure" data-rl="media">
              <Image
                src="/playbook/companion-card.png"
                alt="A companion file rendered as a pre-flight card: the five security checks, each with a checkbox."
                width={1283}
                height={1150}
                sizes="(max-width: 1000px) 92vw, 640px"
              />
              <figcaption>
                <span className="rl-l meta">
                  checklists/05-security.md &middot; one of ten pre-flight
                  cards, as shipped
                </span>
              </figcaption>
            </figure>
            {/* The 26 files were a number in a spec row and nowhere else. They
                are the difference between a PDF and a toolkit, so they are
                itemised here. Counts are from the shipped ZIP: 10 + 6 + 9 + a
                README. The two SPEC examples named last appear in no chapter,
                so a buyer had no way to know they exist. */}
            <ul className="rl-ledger rl-air-m" data-rl-group="files">
              <li data-rl="rule">
                <span className="term">Ten pre-flight checklists.</span>
                <span className="stmt">
                  One per chapter, the card above being the security one. You
                  run them the same night.
                </span>
              </li>
              <li data-rl="rule">
                <span className="term">Six prompt files</span>
                <span className="stmt">
                  for Claude Code and Cursor: a session opener, an architecture
                  mapper, an invariant extractor, a diff reviewer, a payments
                  wiring prompt, and an outreach drafter.
                </span>
              </li>
              {/* Pass-98 count correction. The archive holds NINE files under
                  templates/; the 26th entry is the README. The 2026-09-03
                  adjudication that said ten counted the README as a template.
                  The probe is `zipfile.namelist()`, not a document. */}
              <li data-rl="rule">
                <span className="term">Nine templates</span>
                <span className="stmt">
                  , including three complete SPEC files: a
                  booking app, a photographer gallery, and an internal ops
                  tracker. Also a starter invariants file, an architecture
                  sample, and a real env example.
                </span>
              </li>
            </ul>
          </div>
          <aside className="rail">
            <span className="rl-l">§ 0.8</span>
            <p className="rl-note">
              <span className="rl-l">Field note</span>
              The gallery and ops SPEC files appear in no chapter. I included
              them so you have a spec to copy.
            </p>
          </aside>
        </section>
      </div>

      {/* 3. BACK COVER — espresso. The spec card is the price. */}
      <section className="rl-back rl-wrap" aria-labelledby="lp-ships">
        <div className="rl-two">
          <div className="rl-two__l">
            <p className="rl-l" id="lp-ships">
              What ships
            </p>
            <dl className="rl-reg rl-air-s" data-rl-group="spec">
              <div data-rl="rule">
                <dt>Pages</dt>
                <dd className="rl-num">69</dd>
              </div>
              <div data-rl="rule">
                <dt>Chapters</dt>
                <dd className="rl-num">10</dd>
              </div>
              <div data-rl="rule">
                <dt>Pre-flight cards</dt>
                <dd className="rl-num">10</dd>
              </div>
              <div data-rl="rule">
                <dt>Diagrams</dt>
                <dd className="rl-num">9</dd>
              </div>
              <div data-rl="rule">
                <dt>Build-log entries</dt>
                <dd className="rl-num">13</dd>
              </div>
              <div data-rl="rule">
                <dt>Companion files</dt>
                <dd className="rl-num">26</dd>
              </div>
              {/* Pass-98: the Author row is the only place the page answers
                  "who are you" beside the price, so it carries the two facts
                  a buyer weighs there. No city, per the 2026-09-02 ruling. */}
              <div data-rl="rule">
                <dt>Author</dt>
                <dd>
                  Micah Jones &middot; built Ordani solo &middot; four exits
                  behind my work
                </dd>
              </div>
              <div data-rl="rule">
                <dt>Format</dt>
                <dd>PDF + ZIP &middot; every future edition</dd>
              </div>
              <div data-rl="rule">
                <dt>Price</dt>
                <dd>
                  <span className="rl-num">$99</span>{" "}at launch &middot; $149
                  after
                </dd>
              </div>
              <div data-rl="rule">
                <dt>Refund</dt>
                <dd>30 days, no questions</dd>
              </div>
              <div data-rl="rule">
                <dt>Status</dt>
                <dd>{PLAYBOOK_ON_SALE ? "On sale" : "Coming soon"}</dd>
              </div>
            </dl>
          </div>
          {/* Pass-98 closed two of the three Pass-61 purchase blockers here.
              ON: the buy is the page's one filled pill and the refund sits
              directly under it, where the decision is made, instead of five
              screens away in an FAQ. OFF: the second email form came out.
              Two forms asking for the same address on one page is a page that
              does not know what it wants; the free chapter block keeps the
              only one, and this column links up to it. */}
          <div className="rl-two__r">
            {PLAYBOOK_ON_SALE ? (
              <>
                <p className="rl-l">The manual</p>
                <div className="rl-air-s">
                  <PlaybookBuyButton
                    label="Buy the manual · $99"
                    className="rl-buy rl-buy--auto"
                  />
                </div>
                <p className="rl-body rl-air-s">
                  Thirty days, full refund, no questions asked. Reply to the
                  delivery email and I refund it.
                </p>
                <p className="rl-air-s">
                  <a href="#pb-free" className="rl-link">
                    Not today? Chapter one is free, above{" "}
                    <span aria-hidden>&uarr;</span>
                  </a>
                </p>
              </>
            ) : (
              <>
                <p className="rl-l">The day it ships</p>
                <p className="rl-body rl-air-s">
                  Leave your email for chapter one. I&rsquo;ll tell you
                  the day the full manual opens at the launch price.
                </p>
                <p className="rl-air-s">
                  <a href="#pb-free" className="rl-link">
                    Chapter one, free <span aria-hidden>&uarr;</span>
                  </a>
                </p>
              </>
            )}
            <dl className="rl-qs rl-qs--stack rl-air-m" data-rl-group="faq">
              {FAQS.map((f) => (
                <div className="rl-q" key={f.q} data-rl="rule">
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="rl-wrap rl-sec-air" aria-labelledby="rl-past-title">
        <div className="rl-sec rl-sec--wide">
          <div className="rl-eyebrow">
            <span className="rl-l">Past the playbook?</span>
          </div>
          <h2 id="rl-past-title" className="rl-d two" data-rl="head">
            If your build needs a second pair of hands.
          </h2>
        </div>
        <div className="rl-chips" data-rl="rise">
          {/* Pass-74: was /services#packages. The packages moved to their own
              page in Pass-70, so this dropped a reader who had just clicked
              "Fixed-price packages" onto a page that no longer had any. The
              link still resolved, which is why nothing caught it. */}
          <a href="/packages" className="rl-chip">
            <span className="t">Fixed-price packages</span>
            <span className="a" aria-hidden>
              <span>&#8594;</span>
            </span>
          </a>
          <a href="/call" className="rl-chip quiet">
            <span className="t">Book a free intro call</span>
          </a>
        </div>
      </section>
    </>
  );
}
