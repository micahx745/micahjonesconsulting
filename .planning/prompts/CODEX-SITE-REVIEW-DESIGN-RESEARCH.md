# Codex (gpt-6-astra, ultra) — exhaustive review of micahjonesconsulting.com + design research

Two jobs, one report. Depth over speed. You are reviewing a live site for its owner, who
will act on what you write, so a wrong finding costs him a real edit against an imaginary
target. That has happened to this site once already: an earlier external review critiqued
a portrait, a /work/akamai case study and a /work-with-me page that did not exist. The
evidence rule below is what that produced. It is not optional.

If you are running inside the repo (C:/Users/micah/Code/micahjonesconsulting), you may
read docs/DESIGN_BAR.md, .claude/CLAUDE.md, .claude/brand.json and
docs/LESSONS_LEARNED.md section 3 for the full constitution and the claims ledger. If you
are not, everything you need is in this prompt. Do not claim to have read files you did
not open.

## 0. Prove you can fetch, then the evidence rule

FIRST: retrieve https://www.micahjonesconsulting.com/ and quote its <title> back before
anything else. If you cannot fetch live pages, STOP and say so. A review from memory of
this site is worse than none.

Every finding cites the URL, the HTTP status, and the VERBATIM line as it renders live.
Fetch with curl and decode UTF-8 explicitly. If you cannot quote it from the live page,
the finding does not exist. Delete it.

Three traps specific to this site:
- The RSC flight payload doubles a leading "$": "$$500" in the payload is "$500" on the
  page. Not a defect.
- The same sentence often appears twice in the HTML, once in the visible DOM and once in
  that payload. Strip <script> before counting anything. Never report "repeated" without
  confirming the second instance is visible text.
- Share images (og:image) are PNGs rendered server-side. Fetch the URL from the page's
  meta tag and view the image; a text grep cannot see them.

## 1. The surfaces (15 routes, as of 2026-09-04)

/ · /about · /services · /packages · /work · /playbook · /contact · /call ·
/call/kickoff (noindex, post-purchase) · /services/thanks · /playbook/thanks ·
/work/guardicore · /work/ordani · /work/rfp-engine · /work/content-engine
Also: /sitemap.xml · /robots.txt · /llms.txt · the og:image of every route.
(/book and /book/kickoff 308 to /call and /call/kickoff. /work/passioneer 404s by design.)

Read each page the way its buyer would enter it, not front to back. A founder lands on /
from a referral; a solo founder lands on /playbook from a link; a procurement reviewer
opens /work/ordani to check claims.

## 2. What this site is, so you review the right thing

One operator, Oakland, thirteen years inside B2B software, four exits behind his work
($5B+ combined, disclosed deals only), $20M+ in client revenue since 2013. He builds
go-to-market and ships product, alone. Two lanes:
- Engagements for companies, from $5K a month, scoped on a free call at /call.
- Fixed-price packages for solo founders ($500 / $2,500 / $7,500) at /packages, sold by
  Stripe checkout, and a $99 field manual, The 80% Wall, at /playbook.

Facts that change what a finding means:
- /playbook is the most-visited page after the home page and it was rebuilt this week to
  be the proof of his landing-page work, not just a product page. Grade it hardest.
- The manual is NOT on sale yet by design. The page shows "Coming soon", a free-chapter
  email form, and no buy button. Do not report the missing buy button as a defect. The
  checkout exists behind a launch flag.
- Traffic is tiny (about 26 visitors a week). No A/B test is possible. Recommendations
  must stand on evidence from elsewhere, not on this site's data.
- Zero revenue has passed through the site. There are no client logos, no testimonials
  with names, and no reader reviews of the book, and none can be invented.
- Two moves are already scheduled and should be graded, not re-proposed: a fixed-price
  "landing page + first ten users" package for AI-built apps, and a home-page reframe
  from "I build the go-to-market" toward the words buyers use ("real users", "first
  users", "landing page"). If you think either is wrong, say so with evidence.

## 3. JOB A — the exhaustive review

### 3.1 Grade every route against the twenty-rule bar

Pass/fail each, with the observable reason. The load-bearing five are R1, R4, R6, R12,
R20; failing any two caps a page at template tier regardless of the rest.

Type and colour:
- R1 ≤2 typefaces (a mono for labels and data permitted as a narrow third); the display
  face has visible character. Inter/Roboto/Geist as display = automatic fail.
- R2 Real scale contrast: largest display ≥4× body; no two adjacent levels within 15%; ≤5
  active sizes per page (this site accepts 8; report the count).
- R3 Body ≥16px, line length ≤75ch, line-height 1.5–1.7, AA 4.5:1 everywhere including
  muted text.
- R4 One accent per page context doing real work; zero purple/indigo/cyan gradients,
  gradient text, glow/halo/orb decoration.
- R5 No glassmorphism, no one-side accent-border cards, no cards in cards, no radius >16px.
Layout:
- R6 No centred symmetric icon grid; any grid of like items is asymmetric or broken.
- R7 Hero left-aligned or deliberately asymmetric; states the offer in ONE sentence a
  visitor absorbs in ~2 seconds; no pill + headline + subhead + dual-button centre stack.
- R8 Vertical rhythm varies: at least one full-bleed or quiet section; major gaps ~15vh+,
  not a constant 96px.
- R9 Exactly one signature motion, deployed deliberately; not sprinkled, not zero.
- R10 Nav ≤5 items including a bare "Work"; no mega-menu, no "Resources".
- R11 Index entries carry ≤4 data points; depth deferred to dedicated pages.
Imagery and proof:
- R12 Every image is a real artifact: screenshot, document, photograph, hand-made graphic
  tied to the work. Zero stock, 3D, Undraw figures, AI imagery.
- R13 No logo wall without outcomes; no testimonial carousel, star ratings, generated
  avatars, animated counters.
- R14 At least one proof block pairs a named metric WITH its mechanism.
Motion and copy:
- R15 Motion is punctuation: nothing idles; entrances run once, ≤400ms, ease-out,
  transform/opacity only. (One written exception exists: the wall-chart figure on
  /playbook draws once on load. Do not report it.)
- R16 Copy passes the specificity test: zero hype vocabulary (the class of stream·line,
  em·power, seam·less, world·class, cutting·edge, lever·age, un·lock, ele·vate,
  next-gen·eration, best-in·class, and their relatives; strip the interpuncts when you
  grep); zero emoji bullets; time depth as numbers; every headline could only describe
  THIS operator.
- R17 No selling pressure: one CTA style per page, no urgency or scarcity, no popups,
  exit-intent, chat widget, floating CTA bar.
- R18 Footer is logistics only.
Property-level:
- R19 An authored point-of-view surface exists (the manual as a priced published work
  counts).
- R20 The screenshot test: at 50% zoom the page is attributable to this site; if it could
  be any of fifty SaaS templates, fail.

Score each page: 18–20 studio grade, 15–17 competent not commanding, ≤14 template tier.

### 3.2 The buyer lens

Six readers. For each: where they enter, what they read in what order, the exact line
where they leave, and what their next step even is. Score 1–10 on "takes the next step".
1. B2B founder, engagements at $5K a month. Has a product; enterprise buyers stall. Asks:
   has he done THIS for someone like me, and what happens in week one. Clicks a receipt.
2. Solo founder, the packages and the manual. Shipped something with AI tools; nobody
   came, or the next change keeps breaking it. Price-sensitive, allergic to being sold to.
3. Procurement / security reviewer. Adversarial. Tries to falsify every number, checks
   the pages against each other, reads /work/ordani for what it says about health data.
4. Hiring manager / VP. Reads the case studies for judgment and scope. Asks "what did HE
   do versus his team."
5. Peer operator who might refer him. Can I describe what he does in one sentence, and
   would recommending him make me look good?
6. Technical recruiter, thirty seconds. NOTE: the site deliberately does not serve this
   reader and sends them to LinkedIn. Report what they conclude; do not propose a "hire
   me" section.

### 3.3 The claims lens

List every number, name, date, duration and superlative on every page. For each: where
else on the site it appears, whether the renderings agree, and whether an outside reader
could verify it. Internal contradictions between pages are the highest-value finding
here. Also check: every <title> and meta description against its page body; every
og:image against its page; JSON-LD against visible copy; llms.txt against /about.

### 3.4 The craft lens

Type pairing and scale, spacing and measure, vertical rhythm, the one motion, imagery,
and copy register, each judged against the reference set in Job B. Say what is studio
grade and what is template tier, per page, with the line or element that decides it.

### 3.5 Technical, from outside only

TTFB and total transfer per route; the LCP element and its weight; fonts loaded and
whether they preload; heading order; alt text presence and quality; focus visibility;
contrast of muted text; titles ≤60 and descriptions ≤160; canonicals; JSON-LD types per
route and whether they validate; sitemap and robots; internal links between the case
studies and /playbook and /services. Report measurements, not impressions.

### 3.6 The protect list

Before any recommendation: what on this site is genuinely good and must not be "fixed".
Quote it. An earlier review named the build-log entry on /playbook as the best copy on the
site; test that judgment and add your own.

## 4. JOB B — the design research

### 4.1 The reference set

Start with these, all torn down for the current bar (fetched Aug 2026):
pentagram.com · wearecollins.com · koto.com · instrument.com · metalab.com · buck.co ·
locomotive.ca · further.group · rauno.me · work.co.
Then FIND 8–12 MORE that are current in 2026 and read as seven-figure: boutique
consultancies, design and product studios, and 3–4 INDIVIDUAL operator sites (one
person, senior, priced work). Criteria: shipped in the last 18 months or visibly
current; the site itself is the proof of the work; no template origin you can identify.
Name where you found each (award site, newsletter, a firm's own credits). Do not pad
the set with famous agencies that are not current.

For EACH site, one row: URL · first screen (what it asserts, in how many words, aligned
how) · nav (count and items) · the proof pattern (how work and outcomes are shown) ·
type pairing and the display-to-body ratio · palette and accent count · the one motion
gesture · page rhythm (where it goes quiet, where it goes full-bleed) · footer · the ONE
thing it does that micahjonesconsulting.com does not · and whether that thing is legal
under §5 below.

### 4.2 The current idioms

Across the set, what is actually common NOW that was not in 2024, and what has fallen
away. Separate the idioms into ADOPT (legal under §5, serves a buyer) and AVOID (a tell,
a template fingerprint, or banned here). Be specific: not "bold type" but the ratio, the
weight, the case, the measure. Not "motion" but the gesture, its trigger, its duration.

### 4.3 The wording research

How these firms phrase the offer, the proof, the price, the contact ask, the about page,
and the footer. Sentence length, person (I / we / the firm's name), verbs, whether they
name numbers, how they handle "who is this for". Then put this site's copy beside it,
VERBATIM PAIRS: their line, his line, and what the gap is. Cover at least: the home H1
and its dek; the /services door copy; the /packages intro; the /playbook H1, dek and
pain block; the /about opening; every CTA label.

## 5. The line: looking like the firm everyone is watching vs claiming to be one

The owner's ask is that the site read like a multi-million-dollar consulting firm that is
commanding attention right now. Research the LOOK and the REGISTER of such firms. Do not
recommend the CLAIMS. On this site the following are banned outright, and a
recommendation containing one is a failed recommendation: client logo walls, "trusted
by" bars, "as seen in", testimonial carousels, star ratings, reader or customer counts,
animated counters, "most cho·sen" / "most pop·ular" / "best·seller" badges, urgency or
scarcity devices, waitlist numbers, and any social proof the owner cannot substantiate
with a name and a number. The bar's own first paragraph says why: at this tier restraint
IS the signal; the site asserts instead of explains and curates instead of selling.

What IS available to make the site read that way: a named metric with its mechanism; a
priced, named offer; published work presented as work; a real photograph; an authored
point of view; type, space and rhythm; and the absence of everything on the banned list.
Your job is to find how the best current sites do exactly that, and map it onto this one.

## 6. The constitution — every recommendation is checked against this

- Palette: the Color Worlds system, five tokens (terracotta #9E3C25, petrol #1A4548,
  bone #ECE3D0, espresso #2A1F18, saffron #C9982F). One accent per page context. No new
  colour.
- Type: Bricolage Grotesque display, Hanken Grotesk body, JetBrains Mono for labels and
  data only (the permitted narrow third). No new face. No mono body or headings.
- Motion: one signature interaction (the case-study title card) plus one cleared figure
  (the /playbook wall chart, draws once). Nothing else pins, sticks, parallaxes, follows
  the cursor, loops or idles. No Framer Motion. No dark-mode toggle; mode is by route.
- Imagery: real photographs, real screenshots, the book's own pages. No stock,
  illustration, icon kits, 3D or AI imagery.
- Voice: first person singular, never "we". Average sentence ≤25 words. At most one
  em-dash per page and the nav already spends it, so body copy gets none. Named numbers,
  never vague impact language. The hype-vocabulary class in R16 is machine-rejected at
  build.
- Claims: nothing ships that is not in the owner's verified-facts ledger. If a
  recommendation needs a fact the site does not already carry (a client name, a number,
  a date, a title), mark it NEEDS OWNER INPUT. Never propose inventing one.
- Anonymity: the "industry author" client is never named. The birth worker's services
  are never itemised. Ordani (his product) never names its infrastructure vendors and
  never describes how its protections work; "active paying users, in beta, public
  release coming" is its only framing, with no user count.
- Structure: no /now, /uses, /colophon, decision log or other dev-Twitter surface. No
  newsletter signup in the nav, no Calendly in the first volley, no budget dropdown on
  the contact form. Nav stays ≤5.

## 7. Already decided — reporting these is a false positive

- The home H1 rotates its first word; "See the work" is the primary hero CTA.
- The site does not serve recruiters; no job title is shown for the Guardicore role.
- No pipeline figure, no user counts, no churn figure, no "two exits" phrasing.
- The manual is off sale with no buy button, by design, until launch.
- /playbook's pain block leads with "It shipped. Nobody came." and its wall chart animates
  once; the chapter-02 opener is a full-bleed espresso section inside the bone page.
- JetBrains Mono is the cleared narrow third. robots.txt allows all crawlers by design.
- /book redirects to /call. The Retainer row reads "6 months, then month to month".
- "Oakland" lives in metadata only, by ruling.
- The em-dash in the <title> and the nav's "Menu" line are chrome, not body copy.

## 8. Output format, in this order

A. Fetch proof: a table of every route with HTTP status and its <title>.
B. Per-route grades: R1–R20 pass/fail with the observable reason, the score, and which
   of the load-bearing five fail.
C. Findings, ranked by what a buyer would notice first. Each one: URL · status · the
   VERBATIM line or element · what is wrong · why it matters to which reader · the exact
   proposed change (final copy as exact strings, layout in terms of the tokens in §6) ·
   effort · confidence · the falsifier · CONSTITUTION-LEGAL yes/no · NEEDS OWNER INPUT if
   a fact is missing. Tag each KEEP / CHANGE / ADD / CUT.
D. The reference teardown table from §4.1.
E. The current-idiom map from §4.2, split ADOPT / AVOID.
F. The wording pairs from §4.3, verbatim.
G. The protect list.
H. The rejected list: everything you considered and killed, and why. Without this the
   next reviewer re-proposes it.
I. The ten things to do first, each with the reference URL it borrows from and the
   constitution check it passed.

Rules for the report: no page, element or file you did not fetch. No paraphrase where a
quote exists. Mark UNVERIFIABLE where you could not fetch or measure. Never recommend a
fact the site does not carry. Say when a finding is taste rather than measurement, and
say whose.
