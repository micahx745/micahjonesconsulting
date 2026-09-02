# Pass-61 — the openings of /work, /services and /book

DIRECT segment: Fable, 2026-09-01, on operator instruction ("fable knows").
Operator approval to execute: "go", 2026-09-01.

## 1. The ruling

The three pages open with a label, not an opening: the section's own name at 92px, over a
sentence that repeats what the next block says. `/services`, `/work`, `/book` and `/about`
open the identical three elements in the identical order, and that sameness — not any one
page — is what reads as machine-made. The two pages the operator likes each open with an
**object** he can look at: a face at a whiteboard, a book with a spine. So each of these
three gets an opening object drawn from what that page actually contains, and none of them
keeps its kicker.

Reason: a label tells the reader where they are, which they already know. An object gives
them something to want.

## 2. Final copy — exact strings

### /work (built)
- Figure: `$80M` (from `guardicore.mdx` frontmatter `feature.fig`)
- Line: `in pipeline for a saturated security platform. $14M in revenue. Acquired by Akamai in 2021.`
- Provenance: `01 of 04 · Guardicore (Akamai) · Enterprise sales manager · 2018-2021`
- CTA: `Read the case study →`
- Exhibit caption: `Working session · Tel Aviv · 2018-2021`
- Second section heading: `The rest of the record`
- Deleted: the `WORK` kicker, the `Four engagements. Receipts attached.` headline, the lede.

### /services
- h1 becomes screen-reader only: `Services`
- Left column kicker: `For companies`
- Left column name: `Engagements`
- Left column body: `Advisory, project, retainer, or embedded. Scoped together on a free 30-minute call.`
- Left column price: `From $5K a month`
- Left column receipt: `Guardicore: $80M in pipeline, $14M in revenue. Acquired by Akamai in 2021.`
- Right column kicker: `For solo builders and small teams`
- Right column name: `Packages`
- Right column body: `Three fixed prices. Pick one, email me, and the work starts this week.`
- Right column price: `$500 · $2,500 · $7,500`
- Right column receipt: `Ordani: a HIPAA-compliant CRM I founded and built. Active paying users in beta.`
- Deleted: the `Services` kicker, the `What I do, and how to hire me.` headline, the intro
  sentence. That sentence was the doors' own copy said once in prose and again in boxes.
- Everything below the doors is UNCHANGED. The operator approved it in Pass-56.

### /book
- Title: `Thirty minutes. Bring the problem.`
- Dek: `No deck, no pitch. We name the shape of the work and whether I am the right person for it. If I am not, I say so on the call.`
- Grid label: `Slots I hold open` — NOT "available times". Availability is confirmed by hand;
  a live-looking grid that is not live is a promise the page cannot keep.
- Deleted: the `Free intro call` kicker and the 92px headline.

## 3. Layout spec

Tokens and classes that already exist. No new token, no new type size.

- **/work** `.cw-lot`: espresso, `min-height: 78vh`, grid `1fr / 420px`, figure at
  `clamp(72px, 13vw, 196px)` (the `.cw-h1` scale), line at 21px, provenance mono 11px
  `0.16em` uppercase. Exhibit: 1px bone-34% border, `grayscale(1) brightness(.86)
  contrast(1.08) sepia(.16)`. Stacks at 900px.
- **/services** `.cw-doors`: bone, two columns, `min-height: 70vh`, separated by ONE
  `1px` vertical rule (`border-left`), no boxes and no radius. Name at `.cw-secttitle`
  scale. Price line mono 12px. Receipt 15px at 0.85 opacity, pinned to the column foot with
  `margin-top: auto`. Stacks at 860px, each column capped so PACKAGES is not pushed off a
  390 screen.
- **/book** `.cw-tt`: espresso, grid `1fr / 380px` with the timetable left, the title and
  form right. Cells are `JetBrains Mono` tabular, 1px bone rules, picked cell fills
  `--color-cw-terracotta` with `--color-cw-bone` text (an AA pair already in use).

## 4. Motion

**Nothing new.** No transition on the doors, the lot, or the cells beyond the existing
`:hover` colour change on links. The figure does not count up. Cells do not pulse. The
site keeps exactly one signature motion (the case-study TitleCard) and one palette shift.

## 5. Verification — commands and expected output

```
pnpm build                                  # copy-lint + vendor-gate + em-dash gate all green
curl -s localhost:3100/work | grep -c cw-lot__fig          # 1
curl -s localhost:3100/work | grep -o "01 of 04"           # present
curl -s localhost:3100/services | grep -c cw-doors         # 1
curl -s localhost:3100/services | grep -c "cw-services__kicker"   # 0
curl -s localhost:3100/book | grep -o "Slots I hold open"  # present
curl -s localhost:3100/work | head -40 | grep -o "#2A1F18" # espresso in the FIRST bytes
```
The last one is the prerequisite: `<OpeningWorld>` must put the opening world in the
server-rendered HTML. Before it, every interior page painted terracotta and cross-faded.

## 6. Rejected, and why

- **Three stats across the top of /work** — one figure is an object; three is a dashboard.
  That is the hero-metric tell the operator is reacting to.
- **A full-bleed photograph on /work or /services** — the home page owns that move, and the
  Tel Aviv shot is a 1200px phone screenshot that cannot carry it.
- **Keeping the kickers** — "WORK" above the word Work is the label problem itself.
- **A scheduler embed, an avatar, or "usually replies within an hour" on /book.**
- **Rounded cards with shadows for the doors** — the split is a rule, not two boxes.
- **A new palette world, a new type size, any new motion.**
- **Touching the /services body below the doors** — approved in Pass-56, out of scope.

## 7. Return conditions (JUDGE)

Fable returns to look at: `/work`, `/services`, `/book` at 390 and 1440; copy checked
against the LESSONS #3 ledger by `curl -s | grep`, not by screenshot; one buyer read before
the ship gate.

## 8. Parked operator decisions

- Photo rights: CONFIRMED 2026-09-01 for the birth-worker collection. Only the
  `lemandjune`/`LEM_` frames get used — they are the same shoot as the live
  `ordani-work.jpg`. The 342 Pexels files, the Getty file and the AdobeStock `_Preview`
  comp stay unused; the constitution bans stock and a Preview is not a licensed asset.
- Jerusalem portrait: REJECTED by the operator 2026-09-01. Not used anywhere.
- `/book` timetable implies live availability while slots are confirmed by hand. Mitigated
  in copy ("Slots I hold open"); calendar sync stays queued.
