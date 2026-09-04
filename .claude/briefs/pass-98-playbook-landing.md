# Pass-98 — /playbook: the page is the proof

DIRECT segment, Fable 5.1, 2026-09-04. Executes on Opus. Materials: one Opus workflow
(`wf_64ddc31b-88a`), five reads, every string below traced to a file. Research:
`.planning/research/01-REDDIT-EVIDENCE.md`, `03-FABLE-RESEARCH-LEG.md`. Direction:
`.planning/PHASE-MAP-2026-09-04.md`. Prior brief for this page: `pass-61-playbook-cro.md`,
whose three purchase blockers are still open and are closed here.

**Precondition: Pass 97 has landed** (the eight Class A defects in
`.planning/RESEARCH-TO-ACTION-MAP-2026-09-04.md` §3). This pass moves `/book`; do not
reintroduce the "You have paid" or "we" defects when the file moves.

## 1. The ruling

The page scores 15/20 on DESIGN_BAR §6 and passes all five load-bearing criteria, so it is
not a rebuild. It fails R2, R3, R8, R14, R17, and its pain block leads with the one
sentence the research measured at 1.0% while the 8.9% beat sits third. It has a finished
$99 checkout that no button calls. This pass reorders the pain, fixes the five measured
failures, mounts two more real pages of the book, lands the buy action behind a flag, and
moves `/book` to `/call`. It does not change the H1, the WallChart, the world system, the
block grammar, or the sample chapter.

Reason: the persona review called this page's build-log entry the best copy on the site
and the R20 test passes on its print grammar. The identity is right. The hierarchy and the
first pain line are wrong, and the type scale is loose. Fix what is measured, keep what is
attributable.

## 2. Final copy — exact strings

Zero em-dashes in any of these. Zero words from `02-APPENDIX-voice-rules.json`. First
person. Every number is in the ledger.

### 2.1 Hero (`section.hero-object`, page.tsx 234-298)

- Kicker. Find `A field manual for solo builders`. Replace: `A field manual for solo founders`
  (also in `<title>`, meta, OG subline, below). Reason: "solo builders" has zero authors in
  the asking corpus; the Fable leg reports "solo founder" at 6, against a file that is not
  on disk, so the attest run could not confirm it. Less wrong, not attested; that is why
  it is a kicker and not a headline.
- H1: **unchanged.** `The AI handed you the code. Now ship the company.` It is the
  operator's line, not market language, and it is the thesis. Rejected alternatives in §6.
- Dek. Find the sentence beginning `Ten chapters on what the AI leaves to you: auth,`.
  Replace the whole dek with:
  `Ten chapters on what the AI leaves to you: the first ten users, auth, deploys, payments, compliance. I joined Postmates, SurveyMonkey, Guardicore (Akamai) and Neuton.AI early. Four exits, $5B+ combined. I built Ordani solo with Claude Code and Cursor: HIPAA-compliant, active paying users, in beta.`
  Only the list order changes ("first users", 8 authors, moves to the front).
- Meta line beside the CTA. Find `$99 at launch · $149 after · coming soon`. Replace with
  the flag-dependent string in §2.7. The `$149 after` anchor renders in the spec card only,
  once on the page.

### 2.2 Pain block (`section.lp-you`, page.tsx 302-344)

Three display-weight lines, in this order, each its own `<p>`:

1. `It shipped. Nobody came.`
2. `The demo looked done. Production turned out to be a different machine entirely.`
3. `You kept running into the same thing. Fixed Tuesday, broken Friday, because the tool forgot.`

Line 1 is the operator's own sentence; its beat is `crickets`, 29 of 325 r/buildinpublic
bodies (8.9%), `01-REDDIT-EVIDENCE.md:186`. Line 3 replaces `It got to eighty percent.
Then every change broke something that worked yesterday.` (1.0% on the phrasing-free test,
`:170-191`); "kept running into" is 13 authors at 7.3× lift, `:102`. "Tuesday" is chapter
1's own example.

The diagnosis paragraph that follows (`The wall is not a talent problem…`) is unchanged.

Field note § 0.1. Find `Ordani is a HIPAA-compliant SaaS for birth workers, in beta with active paying users and a public release coming. I hit this wall building it, on the tools you are using now.`
Replace:
`Ordani is a HIPAA-compliant SaaS for birth workers, in beta with active paying users and a public release coming. Its intake replaced a paper packet; completion moved from 40% to a measured 91%. I hit this wall building it, on the tools you are using now.`
This is the R14 fix: one metric with its mechanism. "40% to a measured 91%" is ledgered;
the paper-intake mechanism is live copy on `/` ("group chats and paper intakes"). If
`grep -c "paper" .planning/snapshots/2026-09-04/work_ordani.txt` returns 0, drop the
mechanism clause and keep the number.

### 2.3 New block: `section.lp-page-rings` — insert directly after `lp-you`

Same markup as `lp-page` (`.cw-lp-block` > `.cw-lp-spread` figure + `.cw-lp-cap` + rail
`.cw-lp-note`). H2: `Where the ten live`. Image: `/playbook/spread-rings.png` (1530×1980,
deployed, unreferenced by any file today). `sizes="(max-width: 1000px) 92vw, 640px"`.
Figcaption: `§ 08.2 · Where the ten actually live · page 51 of 69`.
Rail field note (§ 0.2, renumber the rest): `Three rings, drawn for the book. Your ten users are one ask away, and a hundred conversations is a month of mornings.`
(Second sentence paraphrases chapter 8 line 53; it is the operator's book, not a claim.)

`lp-page` (the wall spread, page 6) stays exactly as it is. Two spreads: the wall, then the
rings.

### 2.4 New block: the full-bleed opener — insert between `lp-log` and `lp-toc`

A `<section data-section data-world="espresso" class="cw-lp-opener">` outside the
`.cw-lp-page` bone shell, so the site's WorldSwitcher cross-fades the ground. Inside: one
`<Image>` of `/playbook/spread-opener-02.png` (1488×2105) at `max-width: 560px`, centred,
`alt="Chapter two opener: The spec is the moat"`. No copy, no heading, no caption. Padding
`128px 0` desktop, `80px 0` under 760px. This is R8's one full-bleed, quiet section, and
it is R12-legal: it is a page of the book. Reduced-motion: nothing to reduce.

### 2.5 `section.pb-free` — the ONE email form

Keep the form here. Copy unchanged (`Chapter one, free` / `The whole first chapter, not an
excerpt…` / `Send me chapter one →`). Field note unchanged. This block is the only `<form>`
on the page after this pass.

### 2.6 `section.lp-run` — the count defect

Find `Ten templates, including three worked SPEC files`. Replace `Ten` with `Nine`. The
shipped ZIP holds nine files under `templates/`; the 26th entry is `README.md`. The spec
row `Companion files 26` stays. Ledger entry required, §8.

### 2.7 Back cover (`section.lp-ships`, page.tsx 564-630) and the sale flag

Add `lib/playbook-sale.ts`:
```ts
export const PLAYBOOK_ON_SALE = process.env.PLAYBOOK_ON_SALE === "1";
```
Read it in the page (server component). Two states, both built and both verified. Default
is OFF. The operator flips it with the env var plus a redeploy (env only applies to a new
deployment).

**Spec card rows** (left column), both states: `Pages 69 · Chapters 10 · Pre-flight cards
10 · Diagrams 9 · Build-log entries 13 · Companion files 26 · Author … · Format PDF + ZIP ·
every future edition · Price $99 at launch · $149 after · Refund 30 days, no questions ·
Status …`.
- Author row. Find `<dd>Micah Jones</dd>`. Replace: `<dd>Micah Jones · built Ordani solo · four exits behind my work</dd>`. (Pass-61 QW5, minus Oakland per the 2026-09-02 ruling.)
- Status row: OFF → `Coming soon`. ON → `On sale`.

**Right column, OFF state** (today's copy, minus the second form):
- Kicker `The day it ships`.
- `Leave your email for chapter one now, and I'll tell you the day the full manual opens, at the launch price.`
- A text link, `.cw-mlink`, `Chapter one, free ↑` → `#pb-free`. No form here.

**Right column, ON state:**
- Kicker `The manual`.
- Primary pill (`.cw-cta`, the page's one filled style): `Buy the manual · $99 →`, posting
  to `createPlaybookCheckout` (reuse `components/BuyButton.tsx` if it takes an action
  prop; otherwise copy it to `components/PlaybookBuyButton.tsx`, same markup, same class,
  no new styles).
- Directly under the pill, `.cw-lp-body` at 17px: `Thirty days, full refund, no questions asked. Reply to the delivery email and I refund it.` (Pass-61 blocker 2: the refund sits where the decision is.)
- Under that, `.cw-mlink`: `Not today? Chapter one is free, above ↑` → `#pb-free`.

**Hero CTA row, both states:**
- OFF: pill `Get chapter one free →` → `#pb-free`. Meta line: `$99 at launch · coming soon`.
- ON: pill `Buy the manual · $99 →` → checkout. Text link beside it, `.cw-mlink`: `Or read chapter one free ↓` → `#pb-free`. Meta line: `$99 · PDF + ZIP · 30-day refund`.

### 2.8 FAQ (`FAQS` array, page.tsx ~149)

Entry 1. Find q `Is this for me?`. Replace q: `Is this for me, if I vibe-coded it?`
Replace a: `You built something real with Cursor, Claude Code, Lovable, v0 or Bolt. It works. Nobody is using it yet, or the next change keeps breaking it. Then yes.`
This is the only place the phrase "vibe-coded" lands. It is the operator's own target term
(`app/sitemap.ts:64`, `page.tsx:606`); the market count the leg cites is not on disk, so it
is placed in an FAQ, which feeds FAQPage JSON-LD, and not in a headline. It also retires
"stalled between demo and production", a compound with no count.
Entries 2-5 unchanged.

### 2.9 Metadata

- `<title>`: `The 80% Wall: it shipped, nobody came` (the layout appends the suffix; total
  51 chars).
- Description: `You built it with AI and shipped it. Now get the first ten users. Ten chapters, 69 pages, 26 working files, from the operator who shipped a HIPAA-compliant SaaS solo.` (156 chars.)
- OG image (`app/(foyer)/playbook/opengraph-image.tsx`): punch unchanged (the H1). Subline:
  find `solo builders`, replace `solo founders`.
- JSON-LD: keep Book and FAQPage. Add `Product` with `offers: Offer { price: "99",
  priceCurrency: "USD", availability: PLAYBOOK_ON_SALE ? InStock : PreOrder, url:
  https://www.micahjonesconsulting.com/playbook }` and `BreadcrumbList` (Home → Playbook).

### 2.10 `/book` → `/call`

Move `app/(foyer)/book/` to `app/(foyer)/call/` (both routes). Add permanent redirects
`/book → /call`, `/book/kickoff → /call/kickoff` in `next.config`. Update every reference:
the 7 hrefs across `/`, `/services`, `/playbook`, `/services/thanks`; `app/sitemap.ts`;
both pages' `alternates.canonical`; `lib/package-delivery.ts` (the kickoff email links
`/book/kickoff`); `app/actions/book-call.ts` if it names the route; JSON-LD on `/`. Keep
the copy-lint and render-gate green. Titles unchanged.

### 2.11 `/work/ordani` → `/playbook`

Append to `content/work/ordani.mdx`, after the last body paragraph, one line:
`The manual I wrote from this build: [The 80% Wall](/playbook).`
No other case study changes.

## 3. Layout spec — existing tokens and classes only

Everything below uses classes that exist in `app/globals.css` (lines 4806-5503, the
`cw-lp-*` family) and the five colour tokens. Invent nothing. Do not use `--cw-accent` for
any new colour rule: it resolves to espresso before hydration and terracotta after; set
literal tokens the way `.cw-lp-object__cta` does.

### 3.1 Type scale (R2, R3)

Collapse 17 active sizes to 8. Target steps: **74 / 48 / 32 / 24 / 20 / 17 / 14 / 11**.
Adjacent ratios all ≥ 1.18, so nothing sits inside the 15% bar. R2's count criterion stays
a documented fail at 8; the 4× floor and adjacency pass. Do not chase 5.

| Class | Now | New |
| --- | --- | --- |
| `.cw-lp-object__title` | `clamp(40px, 4.6vw, 62px)` | `clamp(44px, 5.4vw, 74px)` |
| `.cw-lp-body`, `.cw-lp-log p`, `.cw-lp-files li`, `.cw-lp-faq dd` | 17 / 15 / 15 / 15 | 17 |
| `.cw-lp-note`, `.cw-lp-object__by` | 13 / 14 | 14 |
| `.cw-lp-cap`, `.cw-lp-toc__tag`, `.cw-lp-toc__page`, every other mono label | 8-12 | 11 |
| Anything at 16, 18, 19, 22 | — | nearest kept step (17 or 20 or 24) |

Opus produces the full before/after table from a computed-style probe as part of
execution and appends it to this brief.

### 3.2 Contrast (R3)

Every mono label currently reaches its muted look through `opacity`. Remove the opacity and
set colour by world: on bone ground `color: var(--color-cw-petrol)` (about 8:1), on espresso
ground `color: var(--color-cw-saffron)` (6.13:1). Affected: `.cw-lp-toc__page`,
`.cw-lp-toc__tag`, `.cw-lp-cap`, `.cw-wallchart__cap`, and any label the probe finds under
4.5:1. Body text ≥ 16px everywhere.

### 3.3 Rhythm (R8)

`.cw-lp-block { margin: 0 0 96px }` (from 84). Add `.cw-lp-block--breath { margin-bottom: 160px }`
(17.8vh at 900) on `lp-you` and on `lp-log`. Under 760px: 64px and 104px. The opener
section (§2.4) carries its own padding. Result: gaps vary, one gap clears 15vh, one section
is full-bleed and quiet.

### 3.4 Grid

Unchanged: `minmax(0,640px)` main + 210px rail, 56px gap, left-hung. The new rings block
and the back cover use it as they stand.

## 4. Motion

Nothing new. `<WallChart />` stays as the one figure, unchanged, with its written
exception. `ScrollReveal` remains unmounted on this page (0 `.cw-reveal` today; keep 0).
The opener image does not animate. Still forbidden, from Pass-61: sticky buy bar,
exit-intent, countdown, any pinned or follower element, any second animated figure. The
rings diagram is a static render, never an animation.

## 5. Verification — commands and expected output

Run from the repo root after `pnpm build` passes (copy-lint, vendor-gate, render-gate).

```
python scripts/snapshot-live.py                       # or against localhost; writes a dated dir
python - <<'EOF'
import re,io,sys; sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
t=open('.planning/snapshots/LATEST/playbook.txt',encoding='utf-8').read()
raw=open('.planning/snapshots/LATEST/playbook.raw.html',encoding='utf-8').read()
chk={'It shipped. Nobody came.':1,'kept running into':1,'worked yesterday':0,'solo builders':0,
     'solo founders':1,'Nine templates':1,'Ten templates':0,'vibe-coded':1,'$149 after':1,
     'measured 91%':1,'Where the ten live':1,'page 51 of 69':1,'between demo and production':0}
for k,v in chk.items(): print(('OK ' if t.count(k)==v else 'FAIL '),repr(k),t.count(k),'expected',v)
print('forms:',raw.count('<form'),'expected 1')
print('email inputs:',raw.count('name="email"'),'expected 1')
print('opener img:',raw.count('spread-opener-02.png'),'expected 1')
print('rings img:',raw.count('spread-rings.png'),'expected 1')
print('cw-reveal:',raw.count('cw-reveal'),'expected 0')
print('hrefs to /book:',raw.count('href="/book'),'expected 0')
import json
ld=[json.loads(m) for m in re.findall(r'<script type="application/ld\+json">(.*?)</script>',raw,re.S)]
print('ld types:',sorted(set(str(d.get('@type')) for d in ld)),'expect Book, FAQPage, Product, BreadcrumbList, Person, Organization')
EOF
python -c "import zipfile;z=zipfile.ZipFile('product/playbook/output/the-80-percent-wall-companion.zip').namelist();print(len(z),'expected 26;',sum(1 for n in z if n.startswith('templates/')),'templates expected 9')"
curl -sI https://www.micahjonesconsulting.com/book | grep -i "^HTTP\|^location"      # 308, location: /call
curl -sI https://www.micahjonesconsulting.com/book/kickoff | grep -i "^HTTP\|^location"   # 308, /call/kickoff
grep -rn '"/book' app lib components content | grep -v next.config                  # expect no output
python scripts/retired-phrase-grep.py 2>/dev/null || python /tmp/precise.py         # retired phrases 0, banned words 0
```

Two states of the flag:
```
PLAYBOOK_ON_SALE=  pnpm build   → snapshot: 'Buy the manual' 0, 'Get chapter one free' 1, 'Coming soon' 1
PLAYBOOK_ON_SALE=1 pnpm build   → snapshot: 'Buy the manual' 2, 'On sale' 1, 'Not today?' 1
```

Type and contrast probe (Playwright or the browser MCP, at 1440 and 390): computed
`font-size` of every text node on the page, distinct values ≤ 8, largest / `.cw-lp-body`
≥ 4.0 at 1440; computed contrast of every mono label ≥ 4.5:1. Append the table here.

The ledger: `grep -c "Nine templates\|nine templates" docs/LESSONS_LEARNED.md` → 1 (§8).

## 6. The rejected list

- **H1 alternatives** from the Fable leg (`It shipped. Nobody came. Here's the manual for
  the last part.` / `You got it working. The users never came.`). Rejected: a Reddit
  complaint as an H1 reads as a tell; a thesis reads as an author. The beat lives in the
  pain block and the title, where search and recognition happen.
- **Replacing the WallChart with the rings diagram in the hero.** Rejected: the WallChart
  is the page's identity and the one cleared figure; a second animated figure is refused.
  The rings get their own spread instead.
- **Swapping the free sample to chapter 8 in this pass.** Deferred to the book arc: it is a
  two-repo change (`build:sample` and `publish-to-site.mjs` hardcode chapter 1; chapter 8
  needs `edition-status()`, a sales colophon, an Ordani introduction and a defined
  "invariants"), plus eight page anchors and the email strings here. The page's chapter-one
  copy is honest about what the sample is. Edit list in §8.
- **Dropping `$149 after` entirely.** Rejected until the operator sets a trigger: it is
  printed in the book at p.42 and removing it from the site alone creates a mismatch. It
  renders once now, in the spec card, instead of twice.
- **"solo founder" or "vibe coders" as the kicker or a headline.** Rejected: 6 authors and
  an unverifiable count respectively. Kicker gets "solo founders"; "vibe-coded" gets one
  FAQ.
- **"landing page" anywhere on this page.** Rejected: the corpus's largest term (27) is
  routed to the Pass 99 offer, not the book page.
- **Swapping the page-6 wall spread for the page-20 architecture spread.** Rejected for
  scope; the wall at reading size and the wall as a figure are different jobs.
- **Any testimonial, reader count, launch timer, waitlist number, bundle, payment plan,
  pay-what-you-want, tool logo strip, or `$5K/month` anchor.** Still rejected, per Pass-61.
- **Removing JetBrains Mono.** Rejected: it is the R1 narrow third, cleared in Pass-37;
  the constitution prose was corrected on 2026-09-04.
- **Chasing R2's ≤5 sizes.** Rejected for this pass; 17 → 8 is the win.
- **Changing the home H1.** Not this pass; the site follows the page (phase map, ruling G).

## 7. Return conditions — where Fable comes back

1. First preview at **390 and 1440**, with the opener section specifically checked at 390
   (an espresso full-bleed inside the bone run is the one visual risk in this pass).
2. Copy against the ledger by `curl -s | grep`, using the §5 script, not screenshots.
3. One buyer read at the ship gate, in the ON state, from the hero to the checkout URL.

Anything else lands from this brief without me.

## 8. Parked operator decisions and follow-ups

1. **Register the Stripe webhook, set `STRIPE_WEBHOOK_SECRET` in Production, one live
   buy and refund** (`docs/MONEY-RAIL-TEST.md`). The flag stays OFF until this is done.
2. **Flip `PLAYBOOK_ON_SALE=1`** on the launch date. Env plus redeploy.
3. **Ledger entry**, `docs/LESSONS_LEARNED.md` §3: "Companion files: 26 ZIP entries = README
   + 10 checklists + 6 prompts + 9 templates. The page says 'Nine templates'. The
   2026-09-03 adjudication that said ten was wrong; the probe is the ZIP namelist, not a
   document." Opus adds it in this pass; it is a correction, not a new fact.
4. **Chapter 8 as the free sample** — the book arc. Site side: `page.tsx:83` free flag to
   entry 08, `:288`, `:470`, `:490`, `:495-497`, `:616`; `app/actions/playbook-signup.ts:62,
   63-79, 106, 108`; `PlaybookSignupForm.tsx:58, 77`; `lib/chapter1-pdf.ts` rename. Book
   side: `chapter-08.typ:21` Status via `edition-status()`, `:137-150` sales colophon,
   Ordani introduced, "invariants" defined at `:95`; `package.json build:sample` and
   `publish-to-site.mjs JOBS[2]` re-pointed.
5. **Chapter 8, line 31, is coupled to this page:** "The sales page of this manual opens
   with three sentences of pain, and this chapter is the third one." After this pass it is
   the first one. Change "third" → "first" in `the-80-percent-wall/src/chapter-08.typ:31`
   before the book goes on sale. Nobody sees the mismatch until then (the sample is
   chapter 1).
6. **Re-publish the frozen copy.** `product/playbook/` is stale: the site's own gate reports
   10 findings against it that the book repo does not have. Run `publish:site` from the
   book repo, then commit here.
7. **The $149 trigger** (a date, or an interval after launch). Moves the book's p.42 too.
8. **A portrait for the page.** `hero-context.jpg` is mounted small in the rail; a real
   photograph at the back cover beside the Author row is the remaining "who are you"
   answer. R12: photograph only.
9. **Chapter 8 carries "twenty years of selling"** at `chapter-08.typ:59`, unledgered. Not
   this repo; flagged for the book session.
