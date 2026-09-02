# /playbook — full page transcription

Source: `https://www.micahjonesconsulting.com/playbook` (fetched 2026-09-02) cross-checked
against the source file `app/(foyer)/playbook/page.tsx` and its four child components
(`WallChart.tsx`, `PromptDiff.tsx`, `PlaybookSignupForm.tsx`, `PageFooter.tsx`) plus the
shared site nav (`components/color-worlds/Nav.tsx`). This is a sales/landing page for a
$99 (pre-launch) PDF+ZIP ebook called "The 80% Wall," aimed at people who used an AI
coding tool to build something and got stuck before it was production-ready. The author,
Micah Jones, is also the site owner — this is his own product, sold on his own consulting
site.

The page is built like a physical book: a paperback "cover" object, then a run of
book-like "pages," then a "back cover" with a spec sheet, then a small consulting
cross-sell, then the site footer. It has exactly one animated element (a chart that
draws itself once on page load) and otherwise no scroll animation, parallax, or reveal
effects — the file's code comments say this was a deliberate operator decision ("zero
reveals, zero transitions on this page").

---

## Persistent site chrome (appears on every page, not specific to /playbook)

A fixed top nav bar sits above all page content:

- Wordmark / home link: **"MICAH/JONES"**
- Nav links, in order: **Services** (`/services`) · **Work** (`/work`) · **Playbook**
  (`/playbook`) · **About** (`/about`) · **Contact** (`/book`)
- A "Menu —" button opens a full-screen mobile overlay with the same five links, a
  "Close ✕" button, and this footer line inside the overlay: **"Micah Jones · Independent
  operator · Oakland, CA"**

This chrome is identical across the site; it is not counted in the page's own word count
below.

---

## Document-order walkthrough (what a visitor sees, in order)

1. Site nav bar (chrome, described above)
2. **Section 1 — "The object"** (dark ground, `data-world="espresso"`): book-cover image,
   kicker, headline, subheadline, byline/credentials line, the animated wall chart, the
   free-chapter CTA button, the price meta line
3. **Section 2 — "The paper," block 1 — "If this is you"** (light ground,
   `data-world="bone"`): heading, three short pain-point lines, one body paragraph;
   right-hand margin rail holds a small author photo + caption + a "Field note"
4. **Section 2, block 2 — "Read a page"**: heading, one large screenshot of an actual book
   page (the wall-chart figure) with its own caption; margin rail has a "Field note"
5. **Section 2, block 3 — "One sentence, four rounds apart"**: heading, a two-column
   before/after prompt comparison; margin rail has a "Field note"
6. **Section 2, block 4 — "From the build log"**: heading, one dated first-person story
   card; margin rail has a "Field note"
7. **Section 2, block 5 — "Contents"**: heading, the 10-chapter table of contents; margin
   rail has a "Field note"
8. **Section 2, block 6 — "Chapter one, free"** (`id="pb-free"`, the anchor the hero
   button scrolls to): heading, one line of body copy, the email signup form; margin rail
   has a "Field note"
9. **Section 2, block 7 — "Run tonight"**: heading, one screenshot of a companion
   checklist file with its own caption; margin rail has a "Field note"
10. **Section 3 — "Back cover"** (dark ground, `data-world="espresso"`): left column is a
    "What ships" spec sheet (definition list); right column is "The day it ships" (a short
    note, a second copy of the same email signup form, then the 5-item FAQ)
11. **Section 4 — small cross-sell strip** (dark ground, `data-world="espresso"`): "Past
    the playbook?" kicker, one headline, two outbound links to the consulting side of the
    site
12. **Site footer** (`PageFooter`, shared component): reply-time promise line, then
    contact row (email · LinkedIn · location · copyright)

---

## Section 1 — The object (hero) — ground: espresso (dark)

No numbered `§` code on this section (the `§` marginalia codes start in the paper
section below).

**Visual:** A large photorealistic image of the book's paperback cover, rendered as a
tilted object with a visible spine (`cw-lp-book__spine`), not a flat hero image. Cover
alt text (not visible copy, but present in markup): *"The cover of The 80% Wall: an
espresso spec-sheet page, the title stacked in bone and terracotta display type."*

**Kicker (small label above the headline):**
> A field manual for solo builders

**Headline (H1):**
> The AI handed you the code. Now ship the company.

**Subheadline:**
> Ten chapters on what the AI leaves to you: auth, deploys, payments, compliance, the
> first ten users. I joined Postmates, TechValidate (SurveyMonkey), Guardicore (Akamai)
> and Neuton.AI early. Four exits, $5B+ combined. I built Ordani solo with Claude Code
> and Cursor: HIPAA-compliant, active paying users, in beta.

**Byline:**
> By Micah Jones. [The case studies →] *(links to `/work`)*

**The animated element — the wall chart (`<WallChart />`):**

An inline SVG line chart, 340×168 viewBox, that draws itself once when the page loads
(see "The one animated element" section below for full behavior detail). Its visible
text labels, top to bottom/left to right as they appear in the chart:
- "What fits in the window" (label on the near-flat dashed line)
- "Unwritten rules" (label on the rising line)
- "The wall" (label near where the two lines cross)
- "Build progress" (x-axis label, left end)
- "80%" (x-axis label, right end)

Chart caption (below the chart):
> Page 6 · why the wall is arithmetic, not skill

There is also an SVG `<desc>` (screen-reader-only, not visually rendered) that reads:
> A line chart. A nearly flat dashed line marks how much of a codebase fits in an AI
> tool's context window. A second line, rising in four increasingly steep segments,
> marks the unwritten rules the project accumulates. The two cross at about four fifths
> along, and that crossing is the wall.

**Primary call to action — a button, not a text link:**
- Button text: **"Get chapter one free"** with a trailing arrow (→)
- Destination: `#pb-free` — an in-page anchor jump down to the "Chapter one, free"
  signup block (section 2, block 6). It is NOT an outbound link and does NOT currently
  charge money.
- Meta line directly beneath the button:
  > $99 at launch · $149 after · coming soon

Word count, Section 1 (visible copy only, excluding chart's screen-reader-only `<desc>`):
**103 words.**

---

## Section 2 — The paper (a run of "book page" blocks) — ground: bone (light)

Each block below is laid out as a main column plus a right-hand "margin rail" (a design
device styled to look like a book's margin notes). Each rail carries a `§` section code
and, in six of the seven blocks, a labeled "Field note."

### Block 2.1 — "If this is you" (rail code § 0.1)

**Heading (H2):**
> If this is you

**Three short lines (styled as a distinct list of short statements, not a bulleted
list):**
> It got to eighty percent. Then every change broke something that worked yesterday.
>
> The demo looked done. Production turned out to be a different machine entirely.
>
> It shipped. Nobody came.

**Body paragraph:**
> The wall is not a talent problem. It is arithmetic: the tool's memory runs out, and
> yours has to take over, on paper, in the repo. This manual is that hand-off, one
> system per chapter.

**Margin rail:** `§ 0.1`, then a small author photograph (captioned **"Micah Jones ·
Oakland"**), then a labeled "Field note":
> **Field note** — I built Ordani alone with Claude Code and Cursor: a HIPAA-compliant
> SaaS for birth workers, with active paying users. Same tools you're using. Same wall
> I hit.

(Photo alt text, not visible copy: *"Micah Jones working at a laptop in front of a
whiteboard covered in service architecture."*)

Word count: **102 words** (main column + rail note combined).

### Block 2.2 — "Read a page" (rail code § 0.2)

**Heading (H2):**
> Read a page

**Content:** One large screenshot image of an actual page from the book — a rendering
of page 6, which is the same wall-chart figure the hero animates. Image alt text (not
visible copy): *"Page six of the manual: the wall chart, two lines crossing where
unwritten rules outnumber what fits in the context window, above the three reasons the
wall hits at 80%."*

**Figure caption below the image (this IS visible copy):**
> § 01.4 · Why it hits at 80% and not sooner · page 6 of 68

**Margin rail:** `§ 0.2`, then a "Field note":
> **Field note** — Nine line-drawn diagrams, each drawn for this book. No stock art
> anywhere in it.

Word count: **35 words.**

### Block 2.3 — "One sentence, four rounds apart" (rail code § 0.3)

**Heading (H2):**
> One sentence, four rounds apart

**Content — a before/after "prompt diff" component (`<PromptDiff />`):**

Eyebrow/label above the two-column comparison:
> From chapter two · The spec is the moat

Lede line under the eyebrow:
> The redesign that produced the page you are reading. Same tool. Same week. The
> sentence was the difference.

**Left column ("before"):**
- Label: "Four rounds. All rejected."
- Quoted prompt (styled as a blockquote): "make it better."
- Note below the quote: "The AI obliged, four different ways, toward four different
  averages."

**Right column ("after"):**
- Label: "Round five. Shipped in two passes."
- Quoted prompt (styled as a blockquote): "nicer than what exists, no cheap gimmicks,
  photos of real work, keep what already worked."
- Note below the quote: "A one-line WHAT and a three-item NOT. That is the whole
  change."

**Margin rail:** `§ 0.3`, then a "Field note":
> **Field note** — Both sentences are quoted from chapter two. The redesign they
> describe is the one that produced this page.

Word count: **102 words.**

### Block 2.4 — "From the build log" (rail code § 0.4)

**Heading (H2):**
> From the build log

**Content — a dated story card, styled as a distinct bordered/shaded "log entry"
element:**

Card header row (two pieces of text on the same line):
> From the build log        Entry · 2026-08-31

Card title (H3):
> The demo that lied for weeks

Card body, three paragraphs:
> My own site had three lead forms: contact, a sample-chapter signup, a beta waitlist.
> All three worked flawlessly in the demo. In production, for weeks, every submission
> fell into a server log nobody reads, because one environment variable, the email key,
> was never installed on the live host.
>
> No error. No bounce. The page told every visitor "Got it."
>
> I found out only because I tested a new feature end to end on the live site, and that
> test failed loudly enough to make me look. Production is a different machine than the
> demo. And "it works" is a claim about the path you actually tested, never about the
> code you wrote.

**Margin rail:** `§ 0.4`, then a "Field note":
> **Field note** — Thirteen entries like this one in the manual. All true, all dated.
> None of them are anyone else's story.

Word count: **150 words.**

### Block 2.5 — "Contents" (rail code § 0.5)

**Heading (H2):**
> Contents

**Content — a numbered table of contents, one row per chapter, each row showing a
chapter number, title, a short descriptive tag, and a page number:**

| # | Title | Tag | Page |
|---|---|---|---|
| 01 | Why your build broke at 80% | The AI undoes your features *(marked "· free, below")* | p. 3 |
| 02 | The spec is the moat | Drift, not bugs | p. 12 |
| 03 | The architecture you didn't draw | Auth, data, storage, the arrows | p. 19 |
| 04 | Deploy day | Env vars, migrations, domains | p. 25 |
| 05 | The security pre-flight | Row-level security, leaked keys | p. 31 |
| 06 | Stripe in production | Webhooks, refunds, test-to-live | p. 37 |
| 07 | Compliance, when it matters | HIPAA, GDPR, SOC 2, and when | p. 43 |
| 08 | The first ten users | Ten users from conversations | p. 49 |
| 09 | The distribution loop | Second-hand users, the loop | p. 56 |
| 10 | When to hand it off | Hire, rent, sell, keep going | p. 62 |

Only chapter 01's row carries the "· free, below" tag, distinguishing it as the one
chapter given away for free (it links, in effect, to the signup block below — the row
itself is not a hyperlink, but it is the same chapter promised by the "Get chapter one
free" button and the "Chapter one, free" section).

**Margin rail:** `§ 0.5`, then a "Field note":
> **Field note** — Every chapter ends in a pre-flight card you run the same night. The
> cards ship separately as files, too.

Word count: **137 words** (heading + all ten rows + rail note).

### Block 2.6 — "Chapter one, free" (rail code § 0.6) — anchor `id="pb-free"`

This is the landing target of the hero's "Get chapter one free" button.

**Heading (H2):**
> Chapter one, free

**Body line:**
> The real chapter, nine pages, not a teaser. Leave your email and it arrives in about a
> minute.

**Form (`<PlaybookSignupForm />`) — this is the page's only data-capture form, and it
appears twice on the page (here, and again in the back-cover section):**
- One field: an email input. Visible placeholder text inside the empty field:
  **"you@email.com"**. Its accessible label (`aria-label`, not visible on screen) is
  "Email." Marked required; uses `type="email"` and `autoComplete="email"`.
- Submit button text: **"Send me Chapter 1 →"**. While the request is in flight the
  button text changes to **"Sending…"**.
- Client-side validation message if the typed value fails a basic email-shape check:
  **"That email doesn't look valid."**
- Server-side/generic failure message: **"Something went wrong."** (only shown if the
  server action returns an error other than the client-side one above)
- On success, the form itself is replaced by this confirmation message (no separate
  "thank you" page):
  > Chapter 1 is on its way from micah@micahjonesconsulting.com. Nothing in a few
  > minutes? Check spam.

What the form is asking for: **only an email address.** No name, no other field. What it
does with it, per the source code comments: it calls a server action
(`submitPlaybookSignup`) that captures the email for "the free Chapter 1 sampler" and
"seeds the list for the funnel." There is explicitly no checkout step wired up yet (see
"What the page currently asks for," below).

**Margin rail:** `§ 0.6`, then a "Field note":
> **Field note** — No sequence, no drip. One email with the PDF, and a second one the
> day the manual ships.

Word count: **45 words** (heading + body line + rail note; excludes form field/button
labels, which are counted separately above).

### Block 2.7 — "Run tonight" (rail code § 0.7)

**Heading (H2):**
> Run tonight

**Content:** One screenshot image of a companion checklist file, styled as a card with
five checkbox rows (the image itself; checkbox item text is baked into the image, not
separately extractable as page text). Image alt text (not visible copy): *"A companion
file rendered as a pre-flight card: the five security checks, each with a checkbox."*

**Figure caption below the image (visible copy):**
> checklists/05-security.md · one of ten pre-flight cards, as shipped

**Margin rail:** `§ 0.7`, then a "Field note":
> **Field note** — Twenty-six companion files: the ten cards, six prompt files for
> Claude Code and Cursor, and the templates with worked examples.

Word count: **33 words.**

---

## Section 3 — Back cover — ground: espresso (dark)

Two-column layout. No `§` marginalia codes in this section (that device is specific to
the "paper" section above).

### Left column — "What ships"

**Kicker:**
> What ships

**Content — a spec sheet (definition-list styling: a label, then a value, alternating
down the column):**

| Label | Value |
|---|---|
| Pages | **68** |
| Chapters | **10** |
| Pre-flight cards | **10** |
| Diagrams | **9** |
| Build-log entries | **13** |
| Companion files | **26** |
| Author | Micah Jones · Oakland · built Ordani solo · four exits behind my work |
| Format | PDF + ZIP · every future edition |
| Price | **$99** at launch · $149 after |
| Refund | 30 days, no questions |
| Status | Coming soon |

### Right column — "The day it ships"

**Kicker:**
> The day it ships

**Body note:**
> Leave your email for chapter one now, and I'll tell you the day the full manual
> opens, at the launch price.

**Form:** the same `<PlaybookSignupForm />` component as Block 2.6, with identical field,
placeholder, button text ("Send me Chapter 1 →"), validation, and success message — this
is the page's second copy of the signup form.

**FAQ (five question/answer pairs, styled as a definition list — question as term,
answer directly beneath):**

1. **Is this for me?**
   You used Cursor, Claude Code, Lovable, v0, or Bolt to build something real, and it
   stalled between demo and production. Then yes.
2. **Do I need to know how to code?**
   You need to read code and run a terminal. The AI writes; the manual teaches you to
   steer.
3. **How is this different from a tutorial?**
   A tutorial shows one happy path. This is the failure modes, from someone who shipped
   through them.
4. **What if it does not help?**
   Thirty days, full refund, no questions asked. Reply to the delivery email and I
   refund it.
5. **Will it go stale?**
   The tools change monthly. The walls do not. Every future edition is included and
   goes to the same email.

Word count, Section 3 total (both columns, spec sheet, form labels, and FAQ): **205
words.**

---

## Section 4 — Cross-sell strip — ground: espresso (dark)

**Kicker:**
> Past the playbook?

**Heading (H2):**
> If your build needs a second pair of hands.

**Two links, styled as CTAs, side by side:**
- **"Fixed-price packages →"** → links to `/services#packages`
- **"Book a free intro call →"** → links to `/book`

Word count: **19 words.**

---

## Site footer (`<PageFooter />`, shared component — same on every page, not unique to
/playbook)

**Reply-time promise line:**
> I read every message and reply inside two business days.

**Contact row (four items separated by a middle-dot character, on one line):**
- **hello@micahjonesconsulting.com** (mailto link)
- **LinkedIn** (links to `https://www.linkedin.com/in/micah-j/`, opens in a new tab)
- Oakland, CA (plain text, not a link)
- © 2013–2026 Micah Jones (plain text, not a link)

Word count: **18 words.**

---

## The one animated element — the wall chart

Component: `WallChart.tsx`, mounted once, in the hero (Section 1) only.

**What it is:** An inline SVG line chart (not a video, not a Lottie/GIF) with two data
lines on a shared x/y axis:
1. A nearly flat, dashed line labeled "What fits in the window" — representing how much
   of a codebase fits in an AI tool's context window.
2. A line that rises in four increasingly steep straight segments, labeled "Unwritten
   rules" — representing the unwritten rules a project accumulates as it grows.

The two lines cross at roughly 80% along the x-axis (the x-axis is labeled "Build
progress" on the left and "80%" on the right); a small circle marker sits at that
crossing point, and the label "The wall" sits near it.

**How it animates, per the component's own code comments:**
- It runs **once per page mount**, then stops — it does not loop, and does not react to
  scrolling, hovering, or any other user input.
- The rising "Unwritten rules" line draws itself on load using an SVG `pathLength`/stroke
  animation technique (a "draw-on" effect).
- The near-flat dashed "window" line cannot use that same draw-on technique (a dashed
  stroke and a draw-on animation both need the same CSS property), so instead a solid
  rectangle ("curtain") wipes off it from left to right, revealing the dashed line
  underneath.
- All chart furniture that isn't part of the "argument" (the axis lines) holds
  completely still; only the two data lines and the wipe move.
- The comments state this motion only plays at viewport widths ≥900px and is skipped
  entirely if the visitor's OS/browser has "prefers-reduced-motion" turned on; below
  900px or with reduced motion on, the chart is shown in its finished, static state.
- This is explicitly called out in the code as a one-off exception approved for this
  page only ("a FIGURE animation, not a second signature interaction") — the rest of the
  page has no motion, and the rest of the site's one other signature motion effect
  (a title-card animation used on case-study pages) is a separate, unrelated thing not
  present on this page.

The chart also carries a screen-reader-only text description (an SVG `<desc>` element,
never visible on screen) that states the same argument in prose — quoted above at the
end of Section 1.

---

## Visual world (ground color) per section, in order

The page's own code marks each top-level section with a `data-world` attribute of
either `"espresso"` (a dark ground) or `"bone"` (a light ground). In order down the
page:

1. Section 1 (hero/"the object") — **espresso** (dark)
2. Section 2, all seven blocks ("the paper") — **bone** (light) — this is one continuous
   light-ground wrapper around all seven blocks, not seven separate world switches
3. Section 3 ("back cover") — **espresso** (dark)
4. Section 4 (cross-sell strip) — **espresso** (dark)

So the visitor experiences exactly two ground-color transitions while scrolling: dark
→ light (entering "the paper"), then light → dark (entering "the back cover," which
stays dark through the cross-sell strip and into the footer). The source code's own
comments describe this as "Two world shifts only: object (espresso) → paper (bone) →
back cover (espresso)."

---

## What the page currently asks for

- **The only interactive ask on the page today is an email address**, submitted through
  one of the two identical signup forms (Block 2.6 and the right column of Section 3),
  in exchange for a free download of chapter one (a 9-page PDF, sent by email "in about
  a minute").
- **The hero's primary button ("Get chapter one free") does not process any payment.**
  It is an in-page anchor link (`#pb-free`) that scrolls down to the free-chapter signup
  form — it does not go to an external checkout page.
- **The $99 purchase flow is not live.** Per the source code's own comments: "the $99
  rail is built and proven in test mode but the operator is flipping [the payment
  processor] last, so the strongest action that actually works today is chapter one."
  The page states the price in three places (the hero meta line, the "What ships" spec
  sheet, and implicitly nowhere else) but every price mention is paired with "coming
  soon" or "Status: Coming soon" — there is no working "Buy" button anywhere on the
  page as it stands.
- The code comments also note what the button will say once payment is switched on:
  the same button will read "Buy the manual · $99," and the current free-chapter email
  link will move to a secondary/"not today" position beneath it. That is a planned
  future state, not something visible on the live page today.
- Two secondary, non-payment outbound links exist at the very bottom of the page
  content (Section 4), routing the visitor to the author's separate consulting
  services (`/services#packages` and `/book`) rather than anything related to the book
  itself.

---

## Word counts

| Section | Words |
|---|---|
| 1 — Hero / "the object" | 103 |
| 2.1 — "If this is you" | 102 |
| 2.2 — "Read a page" | 35 |
| 2.3 — "One sentence, four rounds apart" | 102 |
| 2.4 — "From the build log" | 150 |
| 2.5 — "Contents" | 137 |
| 2.6 — "Chapter one, free" | 45 |
| 2.7 — "Run tonight" | 33 |
| 3 — Back cover (spec sheet + FAQ) | 205 |
| 4 — Cross-sell strip | 19 |
| Site footer | 18 |
| **Total (page content, excluding persistent nav chrome)** | **949** |

(Counts are of visible, on-page prose/labels only — headings, body copy, captions, form
labels/placeholders/button text, and list/table content. They exclude image `alt` text
and the SVG's screen-reader-only `<desc>`, since neither is visible to a sighted visitor;
both are quoted in full above for reference. They also exclude the persistent site nav
bar and its mobile-overlay copy, since that chrome is identical across every page on the
site, not specific to this page.)

---

## Observations

*(Flagged per instructions — factual notes for the reviewer, not recommendations.)*

- The page's own source-code comments (left in place as authorial history, not removed)
  document that this page went through at least two prior "Pass" versions the operator
  rejected outright — one verdict quoted verbatim in the code: *"still looks bad. I
  don't see any inspiration from others. find unique things, no animations."* The
  current version is described in the same comments as a deliberate reaction to that
  feedback, rebuilding the page around "the book's own print grammar instead of a
  landing-page template."
- The comments also record a later, contradictory instruction from the same operator
  asking for the chart animation specifically ("i like the chart animation make it look
  amazing and built by a world class team"), and an even earlier request for an
  "AI-generated 'vibe coding factory' loop" animation that was declined by an internal
  review process citing a house style rule against AI-generated imagery. None of this
  history is visible to a site visitor; it's only present in code comments.
- The credentials line in the hero ("I joined Postmates, TechValidate (SurveyMonkey),
  Guardicore (Akamai) and Neuton.AI early") names four companies but no job titles at
  any of them. A code comment explains this was a deliberate late edit: an earlier draft
  said "Enterprise cybersecurity sales at Guardicore," which was removed at the
  operator's request specifically because, in the comment's own words, "an unqualified
  cybersecurity credential beside a chapter called 'The security pre-flight' implies a
  technical role the ledger does not support."
- The chapter 5 table-of-contents entry is titled "The security pre-flight" with the tag
  "Row-level security, leaked keys" — this is the chapter whose credibility the above
  observation concerns.
- "Four exits, $5B+ combined" (hero) and "four exits behind my work" (back-cover spec
  sheet) both appear as bare claims on the page with no citation, footnote, or
  named-company breakdown of which exit contributed what.
