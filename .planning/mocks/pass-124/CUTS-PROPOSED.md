# Pass-124 — proposed cuts, for ticking

Written 2026-09-20. Operator picked "The cut list" as Pass-124's first move, and adopted the
copy research's audience ruling (both ledgered, LESSONS #3, 2026-09-20).

**The binding rule, carried over from Pass-122 FEWER WORDS: these are STRAIGHT REMOVALS.
Nothing below is reworded. Tick what goes; anything untick stays exactly as it is.**

Every string below was verified verbatim against the LIVE pages on 2026-09-20
(`dpl_8a3pxYPvFvDf4m1Cnu4RmWpJBjqX`, all three domains). A cut that does not match live text
cannot be applied, so each was probed rather than transcribed.

How this list was made: the page-by-page sweep ran on DeepSeek (six pages, ~125k tokens, its
account not the Claude budget). It returned 100+ raw candidates. This file is what survived
judgement here; the rejected ones are listed at the end with the reason, because several of
them were rejected by the ledger rather than by taste.

---

## A. The homepage — the template rhythm

The defect the operator named ("very AI, wordy"), and the independent diagnosis confirmed, is
not vocabulary. It is the evenly-weighted triad and the heading-as-slot. These are its instances.

- [ ] **A1** — `Operating principles`
      The single most consultant-template phrase on the page. The section survives without a label.
- [ ] **A2** — `How I work.`
      Second template heading stacked on the first.
- [ ] **A3** — the numerals only: `01 `, `02 `, `03 ` (from `01 Diagnose`, `02 Build`, `03 Position`)
      Leaves `Diagnose`, `Build`, `Position`. The numbering is the machine tell, not the words.
      Tick A3 for the numerals alone. Tick **A3+** instead if you also want the three labels gone.
- [ ] **A3+** — the whole labels `01 Diagnose`, `02 Build`, `03 Position` (supersedes A3 if ticked)
- [ ] **A4** — `No decks. No discovery debt.`
      "Discovery debt" is coined jargon, one of the two modes you said closes a tab. Leaves
      "Every engagement ships a named artifact in month one."
- [ ] **A5** — `The rules, in plain terms:`
      Template heading above rules that are already in plain terms.
- [ ] **A6** — `Start here`
      Slot label above the Audit block.
- [ ] **A7** — `Running a growing business`
      Template heading.
- [ ] **A8** — `Too big for duct tape. Not ready for an agency retainer.`
      The three-fragment rhythm. Leaves `You get me directly.`, which is the actual point.
- [ ] **A9** — `Diagnosis, a shipped artifact in month one, and a system your team runs without me.`
      Evenly weighted triad, third instance of the same shape on one page.
- [ ] **A10** — `That takes longer than a launch week.`
      Orphan fragment. Leaves "I stay until the narrative sells without me."
- [ ] **A11** — `Building solo, with AI`
      Template heading. NOTE: this touches the open ORDANI "one engineer" question; if you are
      going to answer that one, answer it before ticking this.

## B. /services — the repeated formula

- [ ] **B1** — all four: `Ask about Advisory →`, `Ask about a project →`, `Ask about a retainer →`,
      `Ask about Embedded →`
      This is the "repeated 'Ask about X →' formula" you named yourself in the research prompt.
      Four instances of one sentence shape in one column. NOTE: these are links. Ticking B1 means
      the four shapes lose their inline CTA and are reached by the page's other paths; say so if
      you want the links kept and only the wording pattern addressed, because that would be a
      rewrite, not a cut.
- [ ] **B2** — `Every engagement includes`
- [ ] **B3** — `Three areas of work`
- [ ] **B4** — `Why one person`
- [ ] **B5** — `Next step`
- [ ] **B6** — `For companies`
- [ ] **B7** — `Proof`
      B2 to B7 are six template headings on one page.

## C. /about

- [ ] **C1** — `What I'm known for`
      Template heading.
- [ ] **C2** — `Receipts`
      Template heading.
- [ ] **C3** — `Currently Building`
      Template heading.

## D. /packages

- [ ] **D1** — `The rules, in plain terms:` (the same heading as A5, second instance)
- [ ] **D2** — `Start here `
- [ ] **D3** — `No scoping call, no proposal, no quote to wait for.`
      Three-fragment rhythm. Leaves "Pick one, buy it, and the work starts within the week."

## E. /contact

- [ ] **E1** — `A note`
      Template heading on a 639-character page.

---

## NOT A CUT — one thing to fix regardless

**`app/(foyer)/about/page.tsx:171` renders "End-to-end product builds."**

LESSONS #3 (2026-09-11, decision 9) retired **"End-to-end product building"** as an area name;
"Product building" is the approved name. `scripts/retired-phrases-gate.mjs:135` blocks the exact
string, so the plural form walks straight past it. This is a live near-miss of a dated
retirement on a page you read, and the gate cannot see it.

Two things owed: the line changes to the approved area name (that is a REWRITE, so it needs your
word), and the gate widens to catch the plural. The gate widening happens either way.

---

## REJECTED, and why

These were proposed by the sweep and thrown out here. Recorded so they are not re-proposed.

**Rejected by the ledger — these are protected facts, not template noise:**
- `Revenue and positioning`, `Enterprise sales`, `Product analyst`, `Helped launch · exit 2025`.
  All four are ledgered row tags. LESSONS #3 says of the Enterprise sales tag, in advance:
  "Do not sweep them; a future review that flags them is reporting a false positive." It did.
- `The receipts.` You already ruled this one: "Cut it, screen readers keep it." It is
  `class="cw-sr-only"` on the live page, so it is already invisible and cutting it would take
  the accessible heading with it.
- The /work method line, the ORDANI money line, and the Guardicore did-line. All operator-approved
  exact copy carrying "do not reword without a new dated ruling".
- `Four exits I worked inside`. "Worked inside" is the ledgered umbrella verb, not padding.

**Rejected on function — cutting these removes the page's job, not its padding:**
- Every `Buy the …  →`, `See the …  →`, `Join the waitlist →` and `NAME THE PROBLEM →`. The sweep
  proposed removing every call to action on the site.
- The Audit's deliverable bullets and `Covers one area: …`. That is the offer.
- The nav and skip-link chrome.

**Rejected on taste:**
- `The demo took a weekend. The last 20% is eating your month.` The independent diagnosis called
  this the strongest sentence on the page. Its problem is aim and placement, not padding, and
  moving it is a rewrite.
- `Built for the people who show up for mothers.` The warmest line on the site.

---

## What this list does not do

It does not touch the hero, the voice, or the audience structure. Those are the adopted ruling's
work and they need new copy, which means facts, which means your rulings on the open questions
first. This list is only the subtraction that needs none of that.
