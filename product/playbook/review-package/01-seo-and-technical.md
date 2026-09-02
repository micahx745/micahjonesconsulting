# SEO and Technical Audit — `/playbook`

Prepared as raw research material for an external reviewer. Target page:
`https://www.micahjonesconsulting.com/playbook` — the sales page for "The 80%
Wall," a $99 (pre-launch) PDF field manual aimed at solo developers whose
AI-assisted build (Cursor, Claude Code, Lovable, v0, Bolt) works as a demo but
stalls before production. Also checked: the site's home page, `/services`,
`/work`, `/about`, and `/book` (a "book a call" page — not the product; the
product itself lives at `/playbook`, a naming collision worth flagging to the
reviewer up front since the sitemap also lists a separate `/book` URL).

All data below was pulled live on 2026-09-02 via direct HTTP fetches
(`curl`), a real Chromium browser session (network trace via the Performance
Resource Timing API), and web search. Nothing here is inferred from the
repo's source code or from memory. Byte sizes for compressed transfers were
measured with `curl --compressed` (Brotli, matching what a real browser
requests) unless stated otherwise. Where a number is a browser-observed
estimate rather than a certified lab measurement (e.g., no formal Lighthouse
run was performed), that is noted.

---

## 1. On-page metadata (verbatim)

```html
<title>The 80% Wall — a field manual for solo builders — Micah Jones</title>

<meta name="description" content="A field manual for solo builders stuck
between demo and production. Ten chapters, 68 pages, 26 working files, from
the operator who shipped a HIPAA-compliant SaaS solo with the same AI tools
you're using."/>

<link rel="canonical" href="https://www.micahjonesconsulting.com/playbook"/>
```

- `<title>` is 61 characters.
- `<meta name="description">` is 204 characters.
- No `<meta name="robots">` tag is present on the page, and no
  `X-Robots-Tag` HTTP header is sent (checked via response headers). Absence
  of either means the default applies: indexable, followable.
- `<html lang="en">` is set.
- `<meta name="theme-color" content="#9E3C25">` is present (the espresso/rust
  brand color).
- No `<link rel="manifest">` (no PWA manifest). No `hreflang` alternates
  (single-language site).

### Open Graph tags

```html
<meta property="og:title" content="The 80% Wall — a field manual for solo builders"/>
<meta property="og:description" content="Stuck between demo and production? The field manual from the operator who shipped a HIPAA-compliant SaaS solo, on the same AI tools you're using."/>
<meta property="og:url" content="https://www.micahjonesconsulting.com/playbook"/>
<meta property="og:site_name" content="Micah Jones"/>
<meta property="og:image" content="https://www.micahjonesconsulting.com/playbook/opengraph-image-63v67u?54728fea9776c8c1"/>
<meta property="og:image:type" content="image/png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:type" content="website"/>
```

- `og:title` is 47 characters; `og:description` is 145 characters.
- The OG image URL returns HTTP 200, `image/png`, 1200×630, **45,067 bytes**.
  It is a dynamically-generated route (`/playbook/opengraph-image-...`,
  Next.js's `opengraph-image` file convention), not a static asset.

### Twitter Card tags

```html
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="The 80% Wall — a field manual for solo builders"/>
<meta name="twitter:description" content="Stuck between demo and production? The field manual from the operator who shipped a HIPAA-compliant SaaS solo, on the same AI tools you're using."/>
<meta name="twitter:image" content="https://www.micahjonesconsulting.com/playbook/opengraph-image-63v67u?54728fea9776c8c1"/>
<meta name="twitter:image:type" content="image/png"/>
<meta name="twitter:image:width" content="1200"/>
<meta name="twitter:image:height" content="630"/>
```

Same image reused for both Twitter/X and Open Graph. `og:title`/`twitter:title`
differ from the `<title>` tag: the `<title>` tag appends "— Micah Jones" and
the social tags do not.

### For comparison, the other pages' metadata (verbatim)

| Page | `<title>` | Meta description |
|---|---|---|
| `/` | `Micah Jones — Strategy and software, shipped by the same pair of hands` | "Independent operator in Oakland. Four exits behind my work: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. $20M+ in client revenue. Now building Ordani, in beta with active paying users." |
| `/services` | `Services — What I do, and how to hire me — Micah Jones` | "Three services: positioning and go-to-market, end-to-end product building, frontier AI engineering. Hire me on an engagement scoped on a free call, or start a fixed-price package from $500 today." |
| `/work` | `Work — Micah Jones` | "Four case studies with the receipts attached: an acquired security platform, a HIPAA-compliant company I founded, and the content and RFP engines I built for an industry author." |
| `/about` | `About — Micah Jones` | "Independent operator in Oakland. Four exits behind my work: Postmates → Uber, TechValidate → SurveyMonkey IPO, Guardicore → Akamai, Neuton.AI → Nordic Semiconductor. $5B+ combined. $20M+ in client revenue. Now building Ordani, in beta with active paying users." |
| `/book` | `Book a free intro call — Micah Jones` | (not extracted — this is the call-booking page, unrelated to the $99 product) |

---

## 2. Heading outline (document order, `/playbook`)

Confirmed against both the rendered DOM (real `<h1>`/`<h2>`/`<h3>` tags in the
HTTP response) and a live browser session — content is present in the initial
HTML, not injected client-side only.

```
<h1>  The AI handed you the code. Now ship the company.
<h2>  If this is you
<h2>  Read a page
<h2>  One sentence, four rounds apart
<h2>  From the build log
  <h3>  The demo that lied for weeks
<h2>  Contents
<h2>  Chapter one, free
<h2>  Run tonight
<h2>  If your build needs a second pair of hands.
```

Total: **one `<h1>`, eight `<h2>`, one `<h3>`.**

Two visually prominent section labels are **not** headings — they are styled
`<p>` "kicker" elements, so they do not appear in the heading outline or an
accessibility-tree/heading-navigation pass:

- `<p id="lp-ships" class="cw-lp-kicker">What ships</p>` — introduces the
  spec-sheet `<dl>` (pages, chapters, price, refund policy, status).
- `<p class="cw-lp-kicker">The day it ships</p>` — introduces the second
  email-capture form and the FAQ block.

The FAQ content itself (five question/answer pairs — see §3 below) is marked
up as a `<dl>` of `<dt>`/`<dd>` pairs, not as headings and not as an
`<h3>`/`<h4>` per question. It is real server-rendered text (confirmed in the
raw HTML, not just in the React hydration payload), but it will not surface
in a heading-based outline or in any tool that maps FAQ structure from
markup semantics.

---

## 3. Structured data (JSON-LD)

The page ships exactly **two** JSON-LD blocks. Quoted verbatim:

**Block 1 — `Person`:**

```json
{"@context":"https://schema.org","@type":"Person","name":"Micah Jones","url":"https://www.micahjonesconsulting.com","jobTitle":"Independent operator","description":"Oakland-based independent operator. Four exits behind his work: Postmates (Uber, 2020), SurveyMonkey (IPO, 2018), Guardicore (Akamai, 2021), Neuton.AI (Nordic Semiconductor, 2025). $20M+ in client revenue (2013–2023). Building Ordani: HIPAA-compliant practice management for doulas and midwives.","address":{"@type":"PostalAddress","addressLocality":"Oakland","addressRegion":"CA","addressCountry":"US"},"knowsAbout":["Go-to-market strategy","Product building","Product launches","Growth systems","B2B software","Positioning research","HIPAA software"],"worksFor":{"@type":"Organization","name":"Ordani"},"alumniOf":[{"@type":"Organization","name":"Guardicore"},{"@type":"Organization","name":"TechValidate"},{"@type":"Organization","name":"Flexport"},{"@type":"Organization","name":"Cuebiq"},{"@type":"Organization","name":"Postmates"}],"sameAs":["https://www.linkedin.com/in/micah-j/"]}
```

**Block 2 — `Organization`:**

```json
{"@context":"https://schema.org","@type":"Organization","name":"Ordani","description":"Ordani is HIPAA-compliant practice management software for birth workers — doulas, midwives, and perinatal counselors. Built end to end by Micah Jones. In beta with active paying users.","mainEntityOfPage":"https://www.micahjonesconsulting.com/work/ordani","founder":{"@type":"Person","name":"Micah Jones"},"foundingLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressLocality":"Oakland","addressRegion":"CA","addressCountry":"US"}}}
```

These are the **same two blocks that appear on every page of the site**
(confirmed present, identically, in the home page's HTML too) — they are
site-wide author/org markup, not page-specific to `/playbook`.

**Schema types present:** `Person`, `Organization` (via `PostalAddress`,
`Place` as nested types).

**Relevant schema types absent from `/playbook`:**
- `Book` — no markup identifies "The 80% Wall" as a book (title, author,
  number of pages, ISBN if any, etc.)
- `Product` / `Offer` — no markup identifies it as a purchasable product, its
  $99 price, currency, availability status ("coming soon" / pre-order), or
  aggregate rating (none would be truthful yet — there are no reviews).
- `FAQPage` — the five-question FAQ block on the page (see §2 and §6) has no
  corresponding `FAQPage`/`Question`/`Answer` JSON-LD, despite the visible
  content being present in the DOM.
- `BreadcrumbList` — no breadcrumb markup anywhere on the page or site.
- `WebPage` / `CollectionPage` type refinement — the OG tag declares
  `og:type` as `website`, the generic default, rather than something more
  specific.

---

## 4. Sitemap and robots.txt

**`https://www.micahjonesconsulting.com/robots.txt`** (full contents, quoted):

```
User-Agent: *
Allow: /

Host: https://www.micahjonesconsulting.com
Sitemap: https://www.micahjonesconsulting.com/sitemap.xml
```

Nothing is blocked. All crawlers are allowed on all paths.

**`https://www.micahjonesconsulting.com/sitemap.xml`** (full contents, quoted):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://www.micahjonesconsulting.com</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>monthly</changefreq><priority>1</priority></url>
<url><loc>https://www.micahjonesconsulting.com/about</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
<url><loc>https://www.micahjonesconsulting.com/work</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
<url><loc>https://www.micahjonesconsulting.com/services</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
<url><loc>https://www.micahjonesconsulting.com/services/ai-engineering</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
<url><loc>https://www.micahjonesconsulting.com/book</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>
<url><loc>https://www.micahjonesconsulting.com/playbook</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>monthly</changefreq><priority>0.85</priority></url>
<url><loc>https://www.micahjonesconsulting.com/work/guardicore</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>
<url><loc>https://www.micahjonesconsulting.com/work/ordani</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>
<url><loc>https://www.micahjonesconsulting.com/work/rfp-engine</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>
<url><loc>https://www.micahjonesconsulting.com/work/content-engine</loc><lastmod>2026-09-02T08:21:31.210Z</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>
</urlset>
```

**Yes, `/playbook` is in the sitemap**, with `priority=0.85` — the second-
highest priority value in the file after the home page (1.0), tied for
second with `/services/ai-engineering` and above every individual case
study. All 11 sitemap URLs share the identical `<lastmod>` timestamp
(`2026-09-02T08:21:31.210Z`), which means `lastmod` is being generated at
build/deploy time for the whole sitemap rather than reflecting each page's
actual last content change.

No image sitemap or separate sitemap index; this is the only sitemap file
referenced.

---

## 5. Internal linking

### Links INTO `/playbook` from elsewhere on the site

Every page on the site carries `/playbook` in the persistent top nav (labeled
"Playbook") and in the mobile menu overlay — this is site-wide chrome, not a
contextual editorial link. Checked and confirmed present in the raw HTML of
`/`, `/services`, `/work`, `/about`, and `/book`.

Beyond nav chrome, one page links to `/playbook` with dedicated, contextual
anchor text: the **home page**, via a two-up "door" module. Quoted verbatim
(HTML, home page):

```html
<a href="/playbook" class="cw-door cw-door--build cw-reveal">
  <p class="cw-door__kicker">Building solo, with AI</p>
  <h2 class="cw-door__title">The demo took a weekend. The last 20% is eating your month.</h2>
  <p class="cw-door__body">That gap is my daily work. I wrote the field manual for it.</p>
  <span class="cw-door__cta">Read the playbook →</span>
</a>
```

No other page (`/services`, `/work`, `/about`) links to `/playbook` from body
copy — only from the shared nav. No case-study page (`/work/ordani`,
`/work/guardicore`, etc.) references the playbook, despite `/work/ordani`
being the direct source of the "I built a HIPAA-compliant SaaS solo" claim
that the playbook page itself leans on heavily.

### Links OUT of `/playbook`

All outbound links found in the rendered DOM, with anchor text:

| Anchor text | Destination | Context |
|---|---|---|
| Playbook / Services / Work / About / Contact | `/playbook`, `/services`, `/work`, `/about`, `/book` | Persistent nav (appears twice: visible nav + `tabindex="-1"` duplicate, presumably for a mobile drawer) |
| "The case studies →" | `/work` | Byline under the hero subhead |
| "Get chapter one free →" | `#pb-free` | In-page jump link (hero CTA) to the email-capture section |
| "Fixed-price packages →" | `/services#packages` | Cross-sell block near the page bottom |
| "Book a free intro call →" | `/book` | Same cross-sell block |
| `hello@micahjonesconsulting.com` | `mailto:hello@micahjonesconsulting.com` | Site footer |
| "LinkedIn" | `https://www.linkedin.com/in/micah-j/` (`rel="me noopener noreferrer" target="_blank"`) | Site footer |

No outbound link points to any third-party resource related to the subject
matter (no link to Cursor, Claude Code, Anthropic, Vercel, Supabase, Stripe
docs, or any AI-coding-tool site, even though those tools are named
repeatedly in the copy). No outbound links to social platforms other than
LinkedIn (no X/Twitter, no GitHub, no Instagram, no YouTube, no RSS/Substack
feed for the "build log" content the page repeatedly references).

---

## 6. Full visible text and word counts

Extracted from the live server-rendered HTML (script/style tags stripped,
tags converted to line breaks, HTML entities decoded), in document order.
Quoted here in full since the task calls for exact visible copy; a
side-by-side line-by-line transcription with additional annotation also
exists in this package as `03-page-copy.md`.

```
Skip to content
MICAH/JONES
Services
Work
Playbook
About
Contact Menu —
Close ✕ Services Work Playbook About Contact
Micah Jones · Independent operator · Oakland, CA
A field manual for solo builders
The AI handed you the code. Now ship the company.
Ten chapters on what the AI leaves to you: auth, deploys, payments, compliance, the first ten users. I joined Postmates, TechValidate (SurveyMonkey), Guardicore (Akamai) and Neuton.AI early. Four exits, $5B+ combined. I built Ordani solo with Claude Code and Cursor: HIPAA-compliant, active paying users, in beta.
By Micah Jones. The case studies → A line chart. A nearly flat dashed line marks how much of a codebase fits in an AI tool's context window. A second line, rising in four increasingly steep segments, marks the unwritten rules the project accumulates. The two cross at about four fifths along, and that crossing is the wall.
What fits in the window Unwritten rules The wall Build progress 80%
Page 6 · why the wall is arithmetic, not skill
Get chapter one free →
$99 at launch · $149 after · coming soon
If this is you
It got to eighty percent. Then every change broke something that worked yesterday.
The demo looked done. Production turned out to be a different machine entirely.
It shipped. Nobody came.
The wall is not a talent problem. It is arithmetic: the tool's memory runs out, and yours has to take over, on paper, in the repo. This manual is that hand-off, one system per chapter.
§ 0.1
Micah Jones · Oakland
Field note I built Ordani alone with Claude Code and Cursor: a HIPAA-compliant SaaS for birth workers, with active paying users. Same tools you're using. Same wall I hit.
Read a page
§ 01.4 · Why it hits at 80% and not sooner · page 6 of 68
§ 0.2
Field note Nine line-drawn diagrams, each drawn for this book. No stock art anywhere in it.
One sentence, four rounds apart
From chapter two · The spec is the moat The redesign that produced the page you are reading. Same tool. Same week. The sentence was the difference.
Four rounds. All rejected.
make it better.
The AI obliged, four different ways, toward four different averages.
Round five. Shipped in two passes.
nicer than what exists, no cheap gimmicks, photos of real work, keep what already worked.
A one-line WHAT and a three-item NOT. That is the whole change.
§ 0.3
Field note Both sentences are quoted from chapter two. The redesign they describe is the one that produced this page.
From the build log
From the build log Entry · 2026-08-31
The demo that lied for weeks
My own site had three lead forms: contact, a sample-chapter signup, a beta waitlist. All three worked flawlessly in the demo. In production, for weeks, every submission fell into a server log nobody reads, because one environment variable, the email key, was never installed on the live host.
No error. No bounce. The page told every visitor "Got it."
I found out only because I tested a new feature end to end on the live site, and that test failed loudly enough to make me look. Production is a different machine than the demo. And "it works" is a claim about the path you actually tested, never about the code you wrote.
§ 0.4
Field note Thirteen entries like this one in the manual. All true, all dated. None of them are anyone else's story.
Contents
01 Why your build broke at 80% The AI undoes your features · free, below p. 3
02 The spec is the moat Drift, not bugs p. 12
03 The architecture you didn't draw Auth, data, storage, the arrows p. 19
04 Deploy day Env vars, migrations, domains p. 25
05 The security pre-flight Row-level security, leaked keys p. 31
06 Stripe in production Webhooks, refunds, test-to-live p. 37
07 Compliance, when it matters HIPAA, GDPR, SOC 2, and when p. 43
08 The first ten users Ten users from conversations p. 49
09 The distribution loop Second-hand users, the loop p. 56
10 When to hand it off Hire, rent, sell, keep going p. 62
§ 0.5
Field note Every chapter ends in a pre-flight card you run the same night. The cards ship separately as files, too.
Chapter one, free
The real chapter, nine pages, not a teaser. Leave your email and it arrives in about a minute. Send me Chapter 1 →
§ 0.6
Field note No sequence, no drip. One email with the PDF, and a second one the day the manual ships.
Run tonight
checklists/05-security.md · one of ten pre-flight cards, as shipped
§ 0.7
Field note Twenty-six companion files: the ten cards, six prompt files for Claude Code and Cursor, and the templates with worked examples.
What ships
Pages 68
Chapters 10
Pre-flight cards 10
Diagrams 9
Build-log entries 13
Companion files 26
Author Micah Jones · Oakland · built Ordani solo · four exits behind my work
Format PDF + ZIP · every future edition
Price $99 at launch · $149 after
Refund 30 days, no questions
Status Coming soon
The day it ships
Leave your email for chapter one now, and I'll tell you the day the full manual opens, at the launch price. Send me Chapter 1 →
Is this for me?
You used Cursor, Claude Code, Lovable, v0, or Bolt to build something real, and it stalled between demo and production. Then yes.
Do I need to know how to code?
You need to read code and run a terminal. The AI writes; the manual teaches you to steer.
How is this different from a tutorial?
A tutorial shows one happy path. This is the failure modes, from someone who shipped through them.
What if it does not help?
Thirty days, full refund, no questions asked. Reply to the delivery email and I refund it.
Will it go stale?
The tools change monthly. The walls do not. Every future edition is included and goes to the same email.
Past the playbook?
If your build needs a second pair of hands.
Fixed-price packages → Book a free intro call →
I read every message and reply inside two business days.
hello@micahjonesconsulting.com · LinkedIn · Oakland, CA · © 2013–2026 Micah Jones
```

### Word counts

Total visible text on the page (nav chrome + footer + all body content):
**1,050 words.**

Body content only (excluding the persistent nav bar and the site footer,
both of which are identical across every page of the site): **≈1,003 words.**

Per-section breakdown (word count of that section's own text, including its
heading and any "field note" marginalia attached to it):

| Section | Words |
|---|---|
| Nav / header chrome | 26 |
| Hero (kicker, `<h1>`, subhead, byline, wall-chart caption/CTA, price line) | 156 |
| "If this is you" | 104 |
| "Read a page" | 37 |
| "One sentence, four rounds apart" | 104 |
| "From the build log" | 152 |
| "Contents" (table of contents) | 140 |
| "Chapter one, free" | 48 |
| "Run tonight" | 35 |
| "What ships" (spec `<dl>`) | 55 |
| "The day it ships" + FAQ block | 151 |
| "Past the playbook?" cross-sell | 21 |
| Site footer | 21 |
| **Total** | **1,050** |

For scale: a typical double-spaced page of prose is roughly 250–300 words, so
the page's own body copy (≈1,000 words) is on the order of one printed page —
short relative to the 68-page, ten-chapter product it is selling.

---

## 7. Image usage and alt text

Four `<img>` elements render in the page's own content (all via Next.js's
`Image` component, each with a responsive `srcset`). All four have
descriptive, non-generic alt text — **none are missing alt text.** Quoted
verbatim:

| Image (source file) | Alt text | Rendered dimensions | Loading |
|---|---|---|---|
| `/playbook/book-cover.png` | "The cover of The 80% Wall: an espresso spec-sheet page, the title stacked in bone and terracotta display type." | 1819×2572 (intrinsic) | `priority` (eager — this is the LCP candidate) |
| `/hero-context.jpg` | "Micah Jones working at a laptop in front of a whiteboard covered in service architecture." | 1800×1800 | `lazy` |
| `/playbook/spread-wallchart.png` | "Page six of the manual: the wall chart, two lines crossing where unwritten rules outnumber what fits in the context window, above the three reasons the wall hits at 80%." | 1530×1980 | `lazy` |
| `/playbook/companion-card.png` | "A companion file rendered as a pre-flight card: the five security checks, each with a checkbox." | 1283×1150 | `lazy` |

The one non-lazy, `priority`-flagged image is the book cover — consistent
with it being the largest visual element above the fold.

One inline SVG (the animated "wall chart" figure in the hero) is not an
`<img>` at all — it is hand-drawn SVG markup with a `role="img"`,
`aria-describedby`, and a `<desc>` element containing a full text
description of what the chart shows ("A line chart. A nearly flat dashed
line marks how much of a codebase fits in an AI tool's context window...").
This is the site's one approved "signature figure animation," per the
project's own design documentation — it draws itself once on load and does
not repeat or respond to scroll/hover.

No `<picture>` element or `<img>` anywhere on the page lacks an `alt`
attribute. No decorative images are missing `alt=""` either — the two grain-
texture SVG overlays elsewhere in the page shell are marked `aria-hidden`.

---

## 8. Technical: rendering, weight, requests

**Server-rendering:** Confirmed server-rendered, not client-side-only. The
literal HTTP response body (fetched with `curl`, no JavaScript execution)
contains the actual `<h1>`, `<h2>`, `<h3>`, `<dl>`/`<dt>`/`<dd>` (including
the full FAQ text) and all four `<img>` tags with their alt text, byte-for-
byte matching what a browser renders. This is a Next.js App Router page
(confirmed via `_next/static` asset paths and the React Server Components
flight-data payload embedded alongside the HTML for hydration).

**Caching:** The response carries `X-Vercel-Cache: HIT` and an `Age` header
in the tens of thousands of seconds on repeat fetches, meaning the page is
served from Vercel's edge cache (static generation or ISR), not rendered
fresh per request. `Cache-Control: public, max-age=0, must-revalidate` is
set on the HTML document itself (so the edge revalidates it, but a browser
does not cache it), while all `/_next/static/*` JS/CSS/font assets carry
`Cache-Control: public, max-age=31536000, immutable` (standard Next.js
content-hashed asset caching — safe to cache forever since the filename
changes on any content change).

**Page weight and requests** (measured via the Performance Resource Timing
API in a live Chromium session, real network, no cache — i.e., what an
actual first-time visitor's browser transfers, not a synthetic curl count):

| Resource type | Encoded (over-the-wire) bytes |
|---|---|
| Document (the HTML itself) | 12,875 |
| JavaScript (10 chunks) | 174,042 |
| CSS (2 stylesheets) | 22,496 |
| Fonts (3 woff2 files, self-hosted) | 142,872 |
| Images loaded at time of measurement (3 of 4 — see note) | 105,876 |
| Analytics/Speed Insights beacons | ~2 |
| **Total observed** | **≈458 KB** |

Note: this session's automated scroll did not trigger the fourth image
(`companion-card.png`, further down the page) to lazy-load before the
network trace was captured; a curl check of that image at the width the
`srcset` would actually serve (`w=640`, the size used for its layout slot)
adds a further **~23–33 KB**, putting a fully-scrolled page load at
**roughly 480–490 KB total** across **24–25 requests**. This was not
re-measured with a formal Lighthouse run — treat the total as directional,
not a certified score.

**Request count:** 24 requests observed before the fourth image loads (1
document + 10 JS chunks + 2 CSS files + 3 fonts + 3 images + 2 first-party
analytics scripts + 2 analytics beacon calls + 1 duplicate-width image
preload). Vercel Web Analytics and Vercel Speed Insights are both present,
loaded via client-injected `<script>` tags (`/2b48d4e1d39df226/script.js`
and `/_vercel/speed-insights/script.js` respectively) — neither appears as a
literal `<script src>` in the initial HTML, only after hydration, so a
crawler or a plain `curl` of the document will not see them at all.

**Fonts:** Three custom fonts — class names in the `<html>` tag identify
them as Bricolage Grotesque, Hanken Grotesk, and JetBrains Mono — all
self-hosted as `.woff2` under `/_next/static/media/` (via `next/font`), not
loaded from Google Fonts or any external font CDN. Two of the three are
`<link rel="preload" as="font">`'d in the `<head>`, which is good practice
for avoiding font-swap layout shift on the hero text.

**Render-blocking resources:** Two `<link rel="stylesheet">` tags
(`0vg9oudn8li4c.css` and `122f2lcmr6wkw.css`, 22,496 bytes combined,
compressed) load in the conventional blocking manner — no `media="print"`
swap trick, no `rel="preload"` + `onload` deferral pattern. At ~22 KB
compressed this is unlikely to be a significant bottleneck on its own, but
it is technically render-blocking CSS.

**Redirects:** None. `https://www.micahjonesconsulting.com/playbook` resolves
directly with a single 200 response (checked with `curl -L` and
`num_redirects: 0`). The canonical URL, the actual `location.href` in a live
browser, and the sitemap entry all agree exactly (same scheme, same `www`
subdomain, same path, no trailing slash).

---

## 9. Keyword and demand research

This section reports real, current search phrasings and who currently ranks
for them — gathered via live web search on 2026-09-02, not from memory or
assumption. `04-competitive-landscape.md` (elsewhere in this package) covers
the commercial competitor landscape (books, courses, prices) in much greater
depth; this section stays narrower — focused on the actual language buyers
and existing top-ranking content use, for comparison against this page's own
copy.

### 9.1 Established, heavily-used terms in this space

- **"vibe coding"** — the dominant umbrella term as of 2026 for building
  software primarily by prompting an AI tool rather than hand-writing code.
  Extremely active content category: search results for
  `vibe coding app works as demo but breaks in production` returned, among
  others: *"Why Vibe Coding Breaks in Production, and How to Fix It"*
  (kognitos.com), *"Vibe Coding Problems: Why Your App Breaks in Production
  (2026)"* (modall.ca), *"Vibe Coding Failures: 7 Real Apps That Broke in
  Production"* (getautonoma.com), *"Your Vibe-Coded App Works. It Won't
  Survive Production."* (ai.plainenglish.io, Medium).
- **"[vibe coding / AI-built app] production [checklist / readiness]"** — an
  entire sub-genre of checklist content. Found directly ranking:
  - *"The Vibe Coding Master Checklist"* — **Supabase's own blog**
    (supabase.com/blog)
  - *"Vibe Coding Security: The Production Checklist for Shipping
    Vibe-Coded Apps"* — **Retool's own blog** (retool.com/resources)
  - *"Vibe Coding to Production: The Checklist Before You Launch"*
    (raftlabs.com/blog)
  - *"The Production Readiness Checklist for Vibe-Coded Apps"* and
    *"The Complete Deployment Checklist Every Vibe Coder Needs"* — both on
    a dedicated **blog.vibecoder.me**
  - *"Vibe Coding Security Checklist: 25 Checks (2026)"* (fourmeta.com,
    also mirrored on serenitiesai.com)
  - *"Is Your AI-Built App Production Ready? The Checklist"*
    (variantsystems.io)
- **"[Tool] to production"** naming pattern for specific tools, e.g.
  *"Can You Build Production-Ready Apps with Bolt, Cursor, or Lovable AI?"*
  (sidetool.co), *"Cursor vs Claude vs Bolt — AI Coding Tool Comparison for
  Production Code"* (tripleminds.co).
- **"The 80% problem" / "the last 20%" / "last mile problem"** — an
  established framing, independent of and predating this product, for
  almost exactly the same idea "The 80% Wall" is built around. Directly
  found: *"The 80% Problem in Agentic Coding"* by **Addy Osmani**
  (addyo.substack.com — Osmani is a well-known, high-authority engineering
  writer, formerly Head of Chrome Developer Experience at Google), *"The
  80% Problem: The Last 20% Is Where the Engineer Used to Live"*
  (jonathanbeard.io), *"The 80/20 Rule of AI Code — Why the Last 20% Takes
  80% of Your Time"* (dev.to), and *"The Last Mile Problem: AI Can Write
  Code, But Only Policy Can Ship It"* (sonatype.com).
- **"Context rot"** — a specific, actively-written-about technical term for
  AI coding agents degrading/drifting over long sessions as their context
  window fills and earlier decisions get deprioritized or contradicted.
  Multiple dedicated posts exist (mindstudio.ai has at least three: *"What
  Is Context Rot in AI Agents and How Do You Prevent It?"*, *"Context Rot in
  AI Coding Agents"*, *"What Is Context Rot? Why Long AI Coding Sessions
  Produce Worse Results"*), plus an arXiv paper (*"Context Rot in
  AI-Assisted Software Development"*) and a blog post literally titled
  *"The Why Never Gets Written Down: Solving context drift in AI-assisted
  coding"* (codingsoul.org) — a framing very close to this product's own
  "unwritten rules" wall-chart metaphor.
- **"Environment variable" as a named, common failure mode** — confirmed as
  a widely-cited specific cause of AI-built apps failing in production
  (e.g. Kuberns: *"Missing environment variables are the single most common
  reason AI-built apps fail in production"*), which is the exact same
  failure the page's own "build log" story recounts (a missing email-service
  environment variable silently swallowing lead-form submissions).

### 9.2 Buyer-adjacent product and content landscape found via search

Beyond the paid-book competitors already catalogued in
`04-competitive-landscape.md`, these ranked in direct response to
problem-phrased (not brand-phrased) queries:

- **SaaStr** (a large, high-authority startup/SaaS media brand) has run at
  least two pieces directly on this subject: *"The brutal truth about
  'vibe coding' your way to production"* and *"The live complete guide to
  vibe coding without a developer: what we actually learned after building
  5 production apps"* (saastr.com).
- A GitHub repo, **`whawkinsiv/solo-founder-skills`** — "Skillset optimized
  for indie makers, and bootstrapped solo founders building SaaS
  applications with AI tools (Lovable, Replit, Claude Code)" — free,
  open-source, and describes almost the identical buyer this product
  targets.
- Lower-priced/free-adjacent content aimed at the same buyer: *"Cheat Code
  for Building AI-Driven SaaS 2.0"* ($7.99, Gumroad), *"The Artificial
  Solopreneur"* (Gumroad), *"From Zero to $10K"* (Deepak Gupta, a step-by-
  step playbook using AI coding assistants + a $1,000 budget), *"The
  Solo-Founder Playbook: Zero to Hero"* (DEV.to, free).
- Course-format competition: a Udemy course titled *"Claude Code: Building
  Faster with AI, from Prototype to Prod"* explicitly covers "prototyping...
  then productionizing by adding source control, Docker packaging, and
  production-grade tooling."
- Tool-comparison content that a buyer researching *which* AI coding tool to
  use (a plausible earlier-funnel search) would land on instead of this
  product: multiple "Cursor vs Lovable vs Bolt vs v0" roundups (Medium,
  vibecodingacademy.ai, vallettasoftware.com, aiapps.com, till-freitag.com,
  swanbase.co, aibusiness.vc) — none of which currently mention or link to
  this product.

### 9.3 Direct-title search — current visibility

A search for the exact product title, `"The 80% Wall" field manual solo
builders Micah Jones`, returned **zero relevant results** — only unrelated
people also named Micah/Jones and an unrelated construction book (*Building
with Straw Bales: A practical manual for self-builders*). This confirms the
page currently has no organic search visibility for its own name, which is
expected for a page with `Age` header values in the tens of thousands of
seconds (i.e., freshly deployed) and, per the rest of this package, zero
sales or backlinks yet.

### 9.4 What the page's visible copy does and does not say

Checked by exact string search against the page's full visible text
(§6 above):

| Term / phrase | Appears in visible copy? | Count |
|---|---|---|
| "solo" | Yes | 3 |
| "builders" / "builder" | Yes | 1 each |
| "the wall" | Yes | 5 |
| "80%" | Yes | 3 |
| "demo" | Yes | 5 |
| "production" | Yes | 5 |
| "Cursor" | Yes | 4 |
| "Claude Code" | Yes | 4 |
| "Lovable" | Yes | 1 |
| "v0" | Yes | 1 |
| "Bolt" | Yes | 1 |
| "security" | Yes | 3 |
| "HIPAA" | Yes | 3 |
| "compliance" | Yes | 2 |
| "Stripe" | Yes | 1 |
| "deploy" | Yes | 2 |
| "auth" | Yes | 3 |
| "row-level security" | Yes | 1 |
| "environment variable" | Yes | 1 |
| "checklist" (substring, via "checklists/05-security.md") | Yes | 1 |
| "field manual" | Yes | 1 |
| "vibe cod[e/ing]" | **No** | 0 |
| "production-ready" / "production ready" | **No** | 0 |
| "context rot" | **No** | 0 |
| "80% problem" (as a phrase) | **No** | 0 |
| "MVP" | **No** | 0 |
| "prototype" | **No** | 0 |
| "technical debt" | **No** | 0 |
| "indie hacker" | **No** | 0 |
| "solo founder" / "solo developer" (the page says "solo builder(s)" instead) | **No** | 0 |
| "Supabase" (named) | **No** | 0 |

The five named AI coding tools that appear in the page's title, meta
description, or `04-competitive-landscape.md`'s buyer definition (Cursor,
Claude Code, Lovable, v0, Bolt) all appear in the visible copy, but only in
a single sentence — the FAQ answer to "Is this for me?" ("You used Cursor,
Claude Code, Lovable, v0, or Bolt to build something real, and it stalled
between demo and production."). They do not otherwise recur in headings,
the hero, or the table of contents.

---

## Observations

The following are flags, not facts — included separately per the brief for
this package, since everything above this line is intended as neutral raw
material.

- The single sentence naming all five AI coding tools ("Is this for me?")
  is the only place on the page carrying that exact tool-name density, and
  it sits inside a `<dl>` FAQ block with no `FAQPage` structured data and no
  heading markup — the sentence most likely to match a buyer's literal
  search intent is present in the DOM but invisible to any tool that reads
  heading structure or FAQ schema rather than raw text.
- Two schema types that would be low-effort and directly applicable are
  absent: `Book`/`Product` (there is no structured signal anywhere that this
  page sells a specific, priced, dated thing) and `FAQPage` (the FAQ content
  already exists, worded and all, just unmarked).
- The internal link from the home page's "door" module is the only
  contextual (non-nav) internal link into `/playbook` anywhere on the site;
  none of the four case-study pages link to it despite sharing its central
  claim (the Ordani HIPAA-compliant-SaaS story).
- "The 80% problem" / "last mile problem" framing this product's title plays
  on is an active, named, already-well-covered idea elsewhere (Addy Osmani's
  piece in particular), and "context rot" is an established term for close
  to the same phenomenon the page's own wall-chart illustrates — worth the
  reviewer's judgment on whether tying into that existing vocabulary
  (in copy or in metadata) would help this page get found, versus the
  page's current fully original vocabulary ("the wall," "unwritten rules").
