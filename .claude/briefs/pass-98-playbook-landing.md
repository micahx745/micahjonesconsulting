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
- Description: `You built it with AI and shipped it. Now get the first ten users. Ten chapters, 69 pages, 26 working files, from the operator who shipped a HIPAA-compliant SaaS solo.` (156 chars by this brief's count; the string measures 166 and the render gate caps at 160 — see the deviation record in §9.)
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
imgs=re.findall(r'<img\b[^>]*>',raw)
print('opener img:',sum(1 for i in imgs if 'spread-opener-02.png' in i),'expected 1')
print('rings img:',sum(1 for i in imgs if 'spread-rings.png' in i),'expected 1')
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

The two image lines count `<img>` elements, not raw substrings. `next/image` emits a
ten-entry `srcset`, so `raw.count('spread-rings.png')` reads 10 for a single mounted
image, and would read the same 10 for two images at five entries each. Counting the tag
is what the block means and is the stricter of the two tests.

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
6. **Re-publish the frozen copy.** `product/playbook/` is stale: `scripts/ordani-claims-gate.mjs`
   reports 10 findings against it that the book repo does not have, all of them in
   `product/playbook/src/chapter-0{1,3,5,7,8}.typ` and `chapter-10.typ` (4 retired user
   counts, 6 security-mechanism sentences near Ordani's name). That gate is not in the
   `pnpm build` chain, so it blocks nothing; the copy is frozen and Pass 98 did not touch
   it. Run `publish:site` from the book repo, then commit here.
7. **The $149 trigger** (a date, or an interval after launch). Moves the book's p.42 too.
8. **A portrait for the page.** `hero-context.jpg` is mounted small in the rail; a real
   photograph at the back cover beside the Author row is the remaining "who are you"
   answer. R12: photograph only.
9. **Chapter 8 carries "twenty years of selling"** at `chapter-08.typ:59`, unledgered. Not
   this repo; flagged for the book session.


## 9. Execution record — type and contrast probe

Opus, 2026-09-04, against the OFF build served from `next start -p 3111`. Playwright,
Chromium. Method: walk every text node in `<body>`; skip `script`/`style`/`title`/`desc`,
`display:none`, `visibility:hidden`, zero-box and above-viewport elements; record the
parent's computed `font-size`. Contrast composites the element's colour through every
ancestor `opacity` onto its ground, where the ground is the nearest opaque ancestor
background or, failing that, the section's own `data-world` colour (the root repaints as
you scroll, so measuring against the live root would grade every off-screen section
against the wrong world). Fixed chrome with no `data-world` ancestor is measured against
the live root pair, which globals.css:1649 establishes as an AA pair in every world.

### Before / after, every class this pass touched

| Class | Before | After | Step |
| --- | --- | --- | --- |
| `.cw-lp-object__title` | `clamp(40px, 4.6vw, 62px)` | `clamp(48px, 5.4vw, 74px)` | 74 / 48 |
| `.cw-services__foot-title` (scoped to `.cw-lp`) | `clamp(28px, 3.4vw, 48px)` | `clamp(32px, 3.4vw, 48px)` | 48 / 32 |
| `.cw-lp-h` | `clamp(26px, 2.6vw, 32px)` | `clamp(24px, 2.6vw, 32px)` | 32 / 24 |
| `.cw-lp-lines p` | `clamp(20px, 2vw, 24px)` | unchanged | 24 / 20 |
| `.cw-lp-log__title` | 22 | 24 | 24 |
| `.cw-lp-toc__num` | 22 | 24 | 24 |
| `.cw-wordmark` (scoped by `:has(.cw-lp)`) | 22 | 24 | 24 |
| `.cw-lp-object__sub` | 18 | 20 | 20 |
| `.cw-lp-spec dd strong` | 18 | 20 | 20 |
| `.cw-lp-object__cta` (`.cw-cta` was 19) | 19 | 20 | 20 |
| `.cw-diff__quote` | `clamp(17px, 1.7vw, 20px)` | unchanged | 20 / 17 |
| `.cw-lp-body` | 17 | unchanged | 17 |
| `.cw-lp-toc__title` | 17 | unchanged | 17 |
| `.cw-signup button` | 17 | unchanged | 17 |
| `.cw-lp-log p` | 15 | 17 | 17 |
| `.cw-lp-files li` | 15 | 17 | 17 |
| `.cw-lp-faq dd` | 15 | 17 | 17 |
| `.cw-diff__lede` | 16 | 17 | 17 |
| `.cw-lp-back__note` | 16 | 17 | 17 |
| `.cw-signup input` (scoped) | 16 | 17 | 17 |
| `.cw-pagefoot__promise` (scoped) | 16 | 17 | 17 |
| `.cw-lp-object__by` | 14 | unchanged | 14 |
| `.skip-to-content` | 14 | unchanged | 14 |
| `.cw-lp-note` | 13 | 14 | 14 |
| `.cw-diff__note` | 13 | 14 | 14 |
| `.cw-lp-kicker` | 11 | unchanged | 11 |
| `.cw-lp-object__meta` | 11 | unchanged | 11 |
| `.cw-lp-block__rail` | 11 | unchanged | 11 |
| `.cw-lp-toc__page` | 11 | unchanged | 11 |
| `.cw-lp-spec` | 11 | unchanged | 11 |
| `.cw-diff__eyebrow`, `.cw-diff__lbl` | 11 | unchanged | 11 |
| `.cw-wallchart__cap` | 11 | unchanged | 11 |
| `.cw-lp-note__lbl` | 10 | 11 | 11 |
| `.cw-lp-cap` | 10 | 11 | 11 |
| `.cw-lp-log__head` | 10 | 11 | 11 |
| `.cw-lp-toc__tag` | 10 | 11 | 11 |
| `.cw-lp-faq dt` | 10 | 11 | 11 |
| `.cw-lp-author__cap` (mounted nowhere) | 10 | 11 | 11 |
| `.cw-mlink`, `.cw-msg` (scoped) | 12 | 11 | 11 |
| `.cw-pagefoot__row` (scoped) | 12 | 11 | 11 |
| `.cw-services__foot-kicker` (scoped) | 12 | 11 | 11 |
| `.cw-navlinks`, `.cw-menubtn` (scoped by `:has`) | 12 | 11 | 11 |
| `.cw-wallchart__lbl` | 8 | 11 | 11 |

**Deviations from §3.1, both to keep the eight-step rule the table exists to serve.** The
brief's hero minimum was 44px and its `.cw-lp-h` minimum stayed 26px. `clamp()` renders
its MINIMUM at 390, so a min that is not a step puts a ninth and tenth value on the page
at that width. 48 and 24 are steps; 44 and 26 are not. The full deviation list, type and
copy together, is at the end of this section.

### Result — 1440 x 900

Distinct computed sizes: **8**. Values: **74, 48, 32, 24, 20, 17, 14, 11**.
Largest / `.cw-lp-body` = 74 / 17 = **4.35** (floor 4.0). Adjacent ratios: 1.54, 1.50,
1.33, 1.20, 1.18, 1.21, 1.27 — every one clears the 15% bar.

### Result — 390 x 844

Distinct computed sizes: **7**. Values: **48, 32, 24, 20, 17, 14, 11** — a subset of the
same eight. Largest / body = 2.82 (the brief sets the 4.0 floor at 1440).

### Mono labels, worst first (1440, composited)

| Label | px | Contrast | Ground |
| --- | --- | --- | --- |
| `.cw-lp-block__rail` | 11 | 5.27 | bone |
| `.cw-lp-note__lbl` | 11 | 5.27 | bone |
| `.cw-lp-toc__tag em` | 11 | 5.27 | bone |
| `.cw-lp-object__meta` | 11 | 5.42 | espresso |
| `.cw-lp-kicker` | 11 | 6.13 | espresso |
| `.cw-lp-spec dt` | 11 | 6.13 | espresso |
| `.cw-lp-cap` | 11 | 8.28 | bone |
| `.cw-lp-toc__tag` | 11 | 8.28 | bone |
| `.cw-lp-toc__page` | 11 | 8.28 | bone |
| `.cw-lp-spec dd` | 11 | 10.43 | espresso |
| `.cw-services__foot-kicker` | 11 | 10.43 | espresso |
| `.cw-navlinks a` | 11 | 10.84 | live world pair |
| `.cw-mlink` | 11 | 12.59 | espresso |

Minimum 5.27 against a 4.5 floor. Identical at 390. Five labels were repaired to get
there, four of them named in §3.2 and one the probe found:

| Label | Was | Measured | Now | Measures |
| --- | --- | --- | --- | --- |
| `.cw-lp-toc__page` | bone ground, `opacity: 0.55` | 3.43 | `--color-cw-petrol`, no opacity | 8.28 |
| `.cw-lp-cap` | bone ground, `opacity: 0.6` | 3.95 | `--color-cw-petrol` | 8.28 |
| `.cw-lp-toc__tag` | bone ground, `opacity: 0.6` | 3.95 | `--color-cw-petrol` | 8.28 |
| `.cw-wallchart__cap` | espresso ground, `opacity: 0.45` | 3.67 | `--color-cw-saffron` | 6.13 |
| `.cw-lp-note__lbl` | terracotta inside `.cw-lp-note`'s `opacity: 0.82` | 3.83 | parent opacity replaced by an equivalent `color-mix`, so nothing inherits it | 5.27 |
| `.cw-lp-log__head span:last-child` | `color-mix(bone 50%)` on espresso | 4.20 | `color-mix(bone 75%)` | 7.66 |

The last one was not on the §3.2 list and is not mono; it is the build-log card's date, an
11px label sitting under AA, so it was fixed with the rest. Every non-mono text node was
also measured with its own section centred, so the world tokens resolve to the pair the
reader actually sees: nothing on the page reads below 4.5:1 (3:1 for large text).

### Not measured, and why

`.cw-wallchart__lbl` is SVG text inside a `340 x 168` viewBox, so its computed
`font-size` is a user-unit count, not a rendered size. It is listed at 11 because that is
what the probe reads and what keeps the page on eight steps; at the figure's 400px display
width it renders at about 12.9px, up from about 9.4px.

### Deviations from the brief — the complete list

Three, and nothing else. Every other string in §2 ships as written.

**1. Type scale minimums (§3.1).** Recorded above: hero `clamp()` min 48 not 44, `.cw-lp-h`
min 24 not 26, because `clamp()` renders its minimum at 390 and a min that is not a step
puts a ninth value on the page at that width.

**2. Meta description (§2.9): "26 working files" ships as "26 files".** The brief's string
is annotated 156 characters; it measures 166, and `scripts/render-gate.mjs` caps the
description at 160. Dropping the one adjective is the only edit to that sentence that costs
no number and no clause. Measured:

```
$ python -c "s='You built it with AI and shipped it. Now get the first ten users. Ten chapters, 69 pages, 26 working files, from the operator who shipped a HIPAA-compliant SaaS solo.'; print(len(s), len(s.replace('26 working files','26 files')))"
166 158
```

Rendered: 158 characters, under the gate.

**3. Apostrophes render as U+2019, not the brief's ASCII `'`.** §2.7's OFF-state string is
written `I'll tell you`; the page carries `I&rsquo;ll tell you` and renders `I’ll tell you`.
This is the site's TSX convention, not a Pass 98 choice: 9 files across `app/` and
`components/` carry 16 `&rsquo;` entities, and JSX would reject a bare `'` in text under
`react/no-unescaped-entities`. Verbatim in substance; one codepoint apart in the source. It
applies to every apostrophe in §2, not only this string.

Measured across all 19 snapshotted routes, the site is not uniform: 11 U+2019 against 20
ASCII. The ASCII side is MDX prose, which does not smart-quote (`/work/ordani` 8,
`/work/rfp-engine` 4, `/work/content-engine` 3). `/playbook` itself carries 4 U+2019 and one
ASCII, at `page.tsx:100`, in the chapter-three TOC title `The architecture you didn't draw`.
That line predates Pass 98 and Pass 98 did not touch it; a site-wide apostrophe sweep is a
pass of its own, not an adjacent fix inside this one.

### Probe correction

§5's `opener img` and `rings img` lines originally counted raw substrings and expected 1.
`next/image` emits a ten-entry `srcset`, so the true reading for one correctly mounted image
is 10, and 10 is also what two images at five entries each would read. The lines now count
`<img>` elements, which is what the block always meant and is the stricter test. Measured
against the OFF build: opener 1, rings 1.
