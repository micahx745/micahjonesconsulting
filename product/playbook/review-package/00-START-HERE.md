# Deep review: "The 80% Wall" — the book and the page that sells it

**Prepared 2026-09-02 for an outside reviewer.** You have no access to the repo
or the analytics. Everything you need is in this folder.

**What I want from you:** find the gaps. What stops this selling, what would
make it sell a lot, and what is wrong or weak that the people close to it have
stopped seeing. Be blunt. Praise is worthless here.

---

## The product

A **68-page PDF field manual** plus **26 companion files**, sold once for **$99**
by a solo consultant. No subscription. Every future edition included.

**Subject:** why AI-assisted builds stall between a working demo and production,
and the systems that carry them through. Ten chapters: auth, deploys, payments,
security, compliance, first users, distribution, handoff.

**The buyer:** a solo developer or technical founder who used Cursor, Claude
Code, Lovable, v0 or Bolt, got something that works on their laptop, and hit the
wall where real users, real data and real money break it. Smart, allergic to
hype, uses these tools daily, spots marketing language instantly.

**The author:** Micah Jones. Four companies he worked inside reached an exit
($5B+ combined disclosed value). $20M+ in client revenue. Built Ordani solo with
Claude Code and Cursor: a HIPAA-compliant SaaS with active paying users, in
beta.

---

## Where it stands right now

- The page is **live** at `https://www.micahjonesconsulting.com/playbook`.
- It is in **waitlist phase**. The button captures an email for a free chapter
  one. **The $99 purchase is built and proven but not switched on yet.**
- The Stripe rail is real: hosted checkout, webhook, automatic delivery of the
  PDF and the ZIP, refund handling. Live prices exist. It has been tested end to
  end twice.
- **Zero sales so far.** Nothing has launched. There are no customers, no
  reviews, no testimonials, and no traffic data worth reading.

That last point matters for your recommendations: **assume no existing
audience.** Advice that depends on social proof, review counts, or an email list
does not apply yet, unless you also say how to get the first one honestly.

---

## Hard constraints

These are house rules, some enforced by an automated build gate. A suggestion
that breaks one is worse than no suggestion, because it cannot be used.

**Honesty**

- No false scarcity. No countdown timers, no "only N left", no fake viewer
  counts, no popularity badges. One was killed on this site already for being an
  unverifiable claim.
- **No invented testimonials or numbers, ever.** There are no customers yet, so
  there are no quotes. If you propose social proof, say exactly how to obtain it
  honestly first.
- Every factual claim traces to a verified-facts ledger. Specific phrasings are
  locked. For example: "four companies I worked inside reached an exit", never
  "helped build"; "HIPAA-compliant", never "HIPAA-grade"; Ordani has "active
  paying users" and **no public user count**; no client is ever named.

**Design**

- No stock photography, illustration, icon kits, or 3D. Type and real
  photographs or screenshots only. AI-generated imagery is banned by name.
- No monospace fonts anywhere.
- One signature motion for the whole site, already spent. One figure animation
  exists on this page (a chart that draws itself once). Nothing else animates,
  pins, sticks, parallaxes or follows the cursor.
- No logo wall, no "trusted by" bar, no newsletter signup in the nav, no live
  chat widget.

**Voice**

- First person. Average sentence under 25 words. Named numbers, never vague
  claims of impact. At most one em-dash per page.
- A list of 30 forbidden words is enforced at build time: hype verbs,
  superlatives, and the usual growth-marketing vocabulary. Write plainly and you
  will not trip it. If a phrase feels like it belongs on a startup landing page,
  assume it is on the list.

---

## Already considered and rejected

Do not re-propose these. Do argue if you think a rejection was wrong, but engage
with the reason.

| Idea | Why it was rejected |
|---|---|
| AI-generated "vibe coding factory" hero animation | Banned imagery rule; also showed a factory that never stalls, for a book about stalling |
| Ungated free sample (no email) | Research favoured it; the operator chose to keep the email gate |
| Pay-what-you-want pricing | Undercuts a $99 premium position |
| Countdown / "N left" discount | Banned, and the audience distrusts it |
| Team seat calculator | It is a personal manual, not a team licence |
| Sound effects, mini-games on the sales page | Wrong register for a field manual |
| Shrinking the cover on mobile to lift the CTA | Real finding, but the cover-as-object is the page's one design idea. Open to argument. |

---

## What I actually want answered

**The page**

1. A visitor lands cold. Where exactly do they lose interest? Quote the line.
2. It scored 76/100 for email capture and 68/100 for purchase readiness on a
   conversion framework. What is the single biggest thing holding the purchase
   score down, given the constraints above?
3. Is the hero right? It reads "The AI handed you the code. Now ship the
   company." Does that land, or is it trying too hard?
4. What is missing from the page that a $99 buyer needs and is not getting?

**SEO and discovery**

5. This page is essentially invisible in search. What would actually move it?
   Be specific about terms, structure, and what content would have to exist.
6. Structured data, internal linking, the share card: what is wrong or absent?
7. Where do these buyers actually look? Search is probably not the main channel.
   Say what is.

**The book itself** (read it, do not skim)

8. Is it worth $99? Judge it against what a developer can get free.
9. Which chapter is weakest, and what would fix it?
10. What is promised on the page but under-delivered in the book, or the reverse:
    what is strong in the book and invisible on the page?
11. What is missing entirely that a buyer would expect?

**Making it sell**

12. If this had to reach a few hundred buyers, how? Concretely, with the honest
    constraint that there is no audience and no social proof yet.
13. Is $99 right? What earns a higher tier, if anything?
14. If only one change could be made, which one would matter most, and why that
    one over the others?

---

## What is in this package

| Path | What it is |
|---|---|
| `01-seo-and-technical.md` | Metadata, headings, structured data, sitemap, robots, keyword and competitor research |
| `02-book-contents.md` | Chapter-by-chapter map of the real book, its artifacts, and quoted passages |
| `03-page-copy.md` | The full sales page transcribed in order, verbatim, with word counts |
| `04-competitive-landscape.md` | Competing and comparable products with prices, positioning and how they sell |
| `the-book/the-80-percent-wall.pdf` | **The actual 68-page book.** Read it. |
| `the-book/chapter-1-free-sample.pdf` | What a visitor gets free for an email |
| `the-book/the-80-percent-wall-companion.zip` | The 26 companion files |
| `screenshots/desktop-01..08.jpg` | The live page, top to bottom, at 1440x900 |
| `screenshots/mobile-01..12.jpg` | The live page, top to bottom, at 390x844 |
| `screenshots/og-share-card.jpg` | What the link looks like when shared |
| `page-renders/` | The cover, six interior spreads, and the companion card |

The screenshots are sequential viewport captures, so read them in order to
experience the page the way a visitor scrolls it.

---

## One thing to know about the format

The book and the page share a deliberate design language: a marginalia rail with
§ numbers, "field notes", dated "from the build log" war stories, pre-flight
checklists, and hand-drawn diagrams. The build-log entries are all true and
dated, and that is meant to be the product's core trust asset.

Tell me if that reads as craft or as affectation. Nobody close to it can judge
that any more.
