# Pass-120 brief-prep: FACET — /work index, redirects & discovery

Map only. Read-only pass over the `p106-live` worktree. Every claim below carries file:line and
verbatim current text; nothing paraphrased. Direction referenced throughout is Direction B from
`.planning/reviews/FABLE-120-DESIGN.md` (dark curtain hero, then paper body; record block replaces
Postmates/Neuton pages; both slugs 301 to `/work#record`).

---

## 1. `app/(foyer)/work/page.tsx` (194 lines) — the index page itself

- **Route group is `(foyer)` but the rendered mode is `data-mode="cw"`**, stamped by the group
  layout (§3 below), NOT `data-mode="foyer"`. Every CSS selector touching this page is
  `[data-mode="cw"] .cw-*`.
- L1–41: header comment. Pass-61 rebuild rationale (operator 2026-09-01 quote at L5–7: `"work
  again when i first open it it does not entice me to look more — web design is part of my
  services in a way so i need this to look premium without screaming AI."`). Explains the
  auction-catalogue-lot form and names `public/guardicore-telaviv-session.jpg` as the current
  exhibit photo (L34–41), replacing an earlier crop in Pass-76.
- L42–46: imports — `Metadata` (next), `Image` (next/image), `getAllCaseStudies` (`@/lib/case-studies`),
  `OpeningWorld` (`@/components/color-worlds/OpeningWorld`), `PageFooter`
  (`@/components/color-worlds/PageFooter`).
- L48–61: `metadata` export.
  - `title: "Work: pipeline, products, and exits"`
  - `description: "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and 36x reach for an author."`
  - `alternates.canonical: "https://www.micahjonesconsulting.com/work"`
  - `openGraph.title` / `openGraph.description` duplicate the above; `openGraph.type: "website"`;
    `openGraph.url: "https://www.micahjonesconsulting.com/work"`.
  - **This description does not mention Postmates or Neuton** and needs no edit for the retirement
    unless Pass-120 copy wants the four-study count reflected differently.
- L63–68: `WorkIndexPage` — `const studies = (await getAllCaseStudies()).filter((cs) => cs.status !== "stub")`.
  Reads every `content/work/*.mdx` file (see §9). Once `postmates.mdx`/`neuton.mdx` are removed or
  their `status` changed, this list silently drops to whatever remains — **no code change needed
  here** for the retirement itself, only for the record-block addition.
- L70–71: `const [lead, ...rest] = studies;` then `const total = String(studies.length).padStart(2, "0")`.
  `total` is the COUNT OF NON-STUB STUDIES rendered as `"0N"` in the lead's provenance line (L100:
  `<span>01 of {total}</span>`). **This will change from `06` to `04`** once Postmates/Neuton are
  removed and drop back up if the birth-worker study (`.planning/drafts/pass-120/birth-worker-DRAFT.md`)
  is added as new content — currently 5 files exist in `content/work/` besides those two
  (`content-engine.mdx`, `guardicore.mdx`, `ordani.mdx`, `passioneer.mdx`, `rfp-engine.mdx`); `passioneer.mdx`
  is presumably still `status: stub` (unverified in this pass — not opened) and so excluded from
  the count already.
- L74–75: `<OpeningWorld name="espresso" />` — first thing rendered. Declares the SSR first-paint
  world as `espresso` (see §4 for exact hex values). Direction B moves the lead study out of a
  dark band ONLY IF the whole hero band becomes paper (re-read §4 note below — Direction B's own
  spec at FABLE-120-DESIGN.md L166–169 says the LEAD STUDY hero on `/work` stays **paper**, no dark
  band, differing from today's `espresso` (dark) opening world). **This line is a target for
  change**: Direction B wants paper throughout `/work`, so `OpeningWorld name="espresso"` would
  need to become `name="bone"` (the light world) — confirm against WorldSwitcher's WORLDS map,
  not guessed here (§4).
- L77–125: the `<section className="cw-lot" data-section data-world="espresso" ...>` lead-study
  block. `data-world="espresso"` on the section itself is a SECOND place the world name is
  declared (read by `WorldSwitcher`'s IntersectionObserver, per `app/(foyer)/layout.tsx` L20
  comment) — **both `OpeningWorld name=` and this section's `data-world=` must change together**
  if the hero world changes.
  - L84–111 `.cw-lot__figure`: the h1 (`id="cw-work-title"`, L91–98) with two spans,
    `.cw-lot__fig` (`{lead.feature?.fig ?? lead.stats?.[0]?.fig ?? lead.title}`) and `.cw-lot__line`
    (`{lead.feature?.line ?? lead.indexLine ?? lead.dek}`); the provenance line `.cw-lot__prov`
    (L99–107, `01 of {total} · {lead.title} · {lead.role} · {lead.year}`); the CTA anchor
    `.cw-lot__cta` (L108–110, `href={`/work/${lead.slug}`}`, text `Read the case study →`).
  - L113–123 `.cw-lot__exhibit`: `<Image src="/guardicore-telaviv-session.jpg" ... width={770}
    height={575} priority sizes="(max-width: 900px) 100vw, 420px" />` with alt text (L116) and
    `<figcaption>Working session · Tel Aviv · 2018-2021</figcaption>` (L122). **This figcaption
    prints a year range (`2018-2021`) — it is the COMPANY'S engagement years (Guardicore), not
    Micah's personal tenure, so it does NOT violate the "no personal tenure years" rule, but it IS
    a rendered year and should be checked against the Pass-120 verification grep for year strings**
    (FABLE-120-DESIGN.md L367–369 wants a `curl | grep -c '20[0-9][0-9]-20[0-9][0-9]'` check to
    return 0 — this figcaption currently WOULD match that pattern and needs an explicit carve-out
    or rewrite in the brief).
- L127–191: `<section className="cw-block cw-wk" data-section data-world="bone" ...>` — the rest-
  of-record list section, world = `bone` (paper/light) already.
  - L133–135: `<h2 id="cw-work-rest-title">The rest of the record</h2>`. **Direction B's own record
    block is titled "Also on the record" (FABLE-120-DESIGN.md L213, L125) — a DIFFERENT, existing
    heading text "The rest of the record" is already live here for the case-study list itself.**
    These are two different sections with confusingly similar names; the brief must be explicit
    that "The rest of the record" (existing, case-study list) and "Also on the record" (new, the
    four-exit-companies block replacing Postmates/Neuton pages) are not the same block and do not
    collide.
  - L137–171: `<ol className="cw-wk-list">` mapping `rest` (all studies after the lead). Each
    `<li className="cw-wk-item">` renders (in order): `.cw-wk-item__num` (`String(i + 2).padStart(2, "0")`),
    `.cw-wk-item__title` (`{s.title}`), `.cw-wk-item__line` (`{s.indexLine ?? \`${s.dek.split(". ")[0]}.\`}`),
    `.cw-wk-item__meta` (`{s.role} · {s.year}`, `.cw-nowrap` on year), `.cw-wk-item__cta` (`Read the
    case study →`), and — conditionally, L158–167 — `.cw-wk-stats` (`<ul>` of up to 3
    `{fig, lbl}` pairs from frontmatter `stats`). **`.cw-wk-item__meta` renders `{s.year}` directly
    for every remaining study** — `content-engine.mdx`, `guardicore.mdx` (`year: 2018–2021`, an
    en-dash range — this string form WILL match a `20XX-20XX`-shaped grep if the verification regex
    uses a plain hyphen `-` vs en-dash `–`; confirm which character `guardicore.mdx` frontmatter
    actually uses before writing the grep), `ordani.mdx`, `rfp-engine.mdx`. None of these are
    Micah's personal tenure (they're each study's own year/range), consistent with "no personal
    tenure years" — but the design doc's build-notes section (L361–363) says "`year` never
    rendered" for the NEW template, which conflicts with what THIS list currently does (it does
    render `{s.year}`) — the brief must resolve whether `.cw-wk-item__meta` keeps rendering year on
    the rebuilt `/work` index or drops it, since L361–363 refers to study-PAGE frontmatter, not
    explicitly the index list.
  - L173–188: `.cw-wk__cross` cross-link paragraph — verbatim current text: `"The next entry in
    this record could be yours. Engagements scoped on a call; packages at $500, $2,500 and
    $7,500."` with `<a href="/services">Engagements</a>` and `<a href="/packages">packages</a>`.
    Comment at L173–177 cites "Review 2026-09-02 #11" and LESSONS #6 (no entity name after
    either `</a>`).
  - L190: `<PageFooter />`.

## 2. `app/(foyer)/work/opengraph-image.tsx` (21 lines)

Full text:
```
1  // app/(foyer)/work/opengraph-image.tsx
2  //
3  // /work OG image — Color Worlds palette. Case-study index.
4  import { ImageResponse } from "next/og";
5  import { CWOGComposition } from "@/components/og/cw-og-composition";
6
7  export const runtime = "edge";
8  export const size = { width: 1200, height: 630 };
9  export const contentType = "image/png";
10
11 export default async function Image() {
12   return new ImageResponse(
13     <CWOGComposition
14       eyebrow="WORK · MICAH JONES"
15       headline="CASE STUDIES"
16       punch="Four exits: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. Now building Ordani."
17     />,
18     size,
19   );
20 }
```
- **L16 `punch` string names Postmates and Neuton.AI by name.** This is baked pixel text in a
  generated PNG, not a hyperlink — the 301s do not touch it — but it is a place that still refers
  to Postmates/Neuton as if their pages exist, and Direction B's content plan keeps both companies
  as ROWS in the exit record (not erased from the site's story), so this copy may not need to
  change at all. Flag for the brief: decide explicitly whether this OG punch line is left as-is
  (it is still factually true — they are still "exits," just no longer own pages) or is edited.
- **Identical string also appears in `app/(foyer)/opengraph-image.tsx:18`** (home page OG image) —
  same `punch` text verbatim. If Pass-120 edits one, check the other for consistency.

## 3. `app/(foyer)/layout.tsx` (51 lines) — the foyer group layout

Full relevant body:
```
22 import type { ReactNode } from "react";
23 import { Grain } from "@/components/color-worlds/Grain";
24 import { Nav } from "@/components/color-worlds/Nav";
25 import { WorldSwitcher } from "@/components/color-worlds/WorldSwitcher";
26 import { ScrollReveal } from "@/components/color-worlds/ScrollReveal";
28 // Custom magnetic cursor removed; system cursor everywhere.
29 export default function ColorWorldsLayout({
30   children,
31 }: Readonly<{
32   children: ReactNode;
33 }>) {
34   return (
35     <div data-mode="cw">
36       <a href="#main-content" className="skip-to-content">
37         Skip to content
38       </a>
39       <Grain />
40       <Nav />
41       <WorldSwitcher />
42       <ScrollReveal />
46       <main id="main-content" tabIndex={-1}>
47         {children}
48       </main>
49     </div>
50   );
51 }
```
- L1–14 header comment: names the design-direction history (v1 through v4, then "Color Worlds"
  current) and states (L12–13): "The route group is still named `(foyer)` for path-mapping; the
  design language has been swapped end-to-end." **`(foyer)` in the folder path is a legacy name —
  the live wrapper attribute is `data-mode="cw"`, not `"foyer"`.** This matters for grepping CSS:
  every /work rule lives under `[data-mode="cw"]`, not `[data-mode="foyer"]` (there is no
  `foyer` data-mode value on the live site for these routes; `.claude/CLAUDE.md`'s "Two modes"
  section describing warm-cream `--foyer-paper`/theater `--theater-*` tokens is the OLDER
  documented system — "live code wins where its prose has drifted" per the worktree's own
  `CLAUDE.md` note).
- Persistent chrome mounted on every `(foyer)` page including `/work`: `<Grain>` (noise overlay),
  `<Nav>` (fixed top nav), `<WorldSwitcher>` (IntersectionObserver swap of `--cw-*` vars, client
  component), `<ScrollReveal>` (observes `.cw-reveal` elements). None of these are `/work`-specific
  and none reference Postmates/Neuton.
- `Nav.tsx` L44: `{ href: "/work", label: "Work" }` — the only `/work`-related nav entry; no
  `/work/postmates` or `/work/neuton` entry exists in Nav (confirmed by grep, §9).

## 4. `OpeningWorld` — `components/color-worlds/OpeningWorld.tsx` (61 lines)

Full file already quoted in full above during this pass; key facts:
- L31: `type WorldName = "terracotta" | "bone" | "petrol" | "espresso";` — closed union, declared
  locally (not imported) because `WorldSwitcher` is a client component (comment L28–30).
- L35–43 `OPENING_WORLDS` map (must mirror `WorldSwitcher`'s `WORLDS` map and the `--color-cw-*`
  tokens in `globals.css` — comment L19–22, L33–34):
  ```
  terracotta: { bg: "#9E3C25", fg: "#ECE3D0", accent: "#2A1F18" }
  bone:       { bg: "#ECE3D0", fg: "#2A1F18", accent: "#9E3C25" }
  petrol:     { bg: "#1A4548", fg: "#ECE3D0", accent: "#C9982F" }
  espresso:   { bg: "#2A1F18", fg: "#ECE3D0", accent: "#9E3C25" }
  ```
- L45–61 `OpeningWorld({ name })`: renders `<style href={`opening-world-${name}`} precedence="high"
  dangerouslySetInnerHTML={{ __html: css }} />` where `css = `[data-mode="cw"]{--cw-bg:${w.bg};
  --cw-fg:${w.fg};--cw-accent:${w.accent}}`. React 19 hoists this into `<head>` via the
  `href`+`precedence` API (comment L50–53) specifically to avoid a mid-body render (measured at
  "byte 6316 of 38298 on /work" per the comment) that would otherwise leave a flash-of-wrong-color
  window.
- **Every page in `app/(foyer)/` that wants to avoid the terracotta-flash bug must call
  `<OpeningWorld name="..." />` as its first render**, per the Pass-61 bugfix story at L5–12. If
  Direction B moves `/work`'s hero to a light/paper world, `name="espresso"` on `work/page.tsx:75`
  becomes `name="bone"` and the `.cw-lot` section's `data-world="espresso"` (`work/page.tsx:81`)
  must be changed to `"bone"` in the same edit — the file's own contract note (L19–22) says both
  copies "must agree."
- **`WorldSwitcher.tsx` itself was not opened in this pass** — its `WORLDS` map is the authority
  this file mirrors; before hand-editing world names in the brief, read `components/color-worlds/
  WorldSwitcher.tsx` to confirm the mirrored hex values have not drifted (this file's own comment,
  L19–22, flags that risk explicitly).

## 5. `PageFooter` — `components/color-worlds/PageFooter.tsx` (39 lines)

Full file quoted above. Server component, no client JS, no motion. Renders (verbatim):
- `.cw-pagefoot__promise`: `"I read every message and reply inside one business day."`
- `.cw-pagefoot__row`: `mailto:micah@micahjonesconsulting.com` link (text
  `micah@micahjonesconsulting.com`) · LinkedIn link (`https://www.linkedin.com/in/micah-j/`,
  `rel="me noopener noreferrer" target="_blank"`, text `LinkedIn`) · `© 2013–2026 Micah Jones`
  (plain `<span>`, not a link).
- Comment L30–32 records the operator's 2026-09-02 ruling that removed a city chip ("Oakland, CA
  ... in many places that is irrelevant") — the `©` line's date range `2013–2026` is a COMPANY /
  practice range, explicitly kept because "that is a legal notice, not decoration," not a personal
  tenure figure — relevant precedent if Pass-120's "no personal tenure years" rule is applied
  narrowly to this footer (it should NOT need to change; the footer is shared across all `(foyer)`
  pages via being imported directly into page bodies, not via the group layout, so `/work`'s
  `PageFooter` import at `work/page.tsx:46` and render at `work/page.tsx:190` is its only mount
  point for this route).
- No reference to Postmates/Neuton or `/work/*` anywhere in this file.

## 6. `.cw-lot` / `.cw-wk*` CSS — `app/globals.css` (7,623 lines total)

Two rule blocks, both prefixed `[data-mode="cw"]`. Line numbers below are exact from a live grep.

### Block A — Pass-58, `.cw-wk*` (index list + shared with case-page glance strip), L6381–6519

```
6381 /* ============================================================
6382  * Pass-58 — /work index rebuilt (.cw-wk*) + case-page glance strip
6383  * Operator 2026-09-01: "work page is weird and weak… case study pages
6384  * aren't that great." Each engagement carries its receipts (three
6385  * stat objects) in the same proof grammar /services uses.
6386  * ============================================================ */
6387 [data-mode="cw"] .cw-wk__lede { font-family: var(--font-cw-body); font-size: clamp(17px, 1.7vw, 21px); line-height: 1.5; opacity: 0.85; margin: 24px 0 0; max-width: 58ch; }
6395 [data-mode="cw"] .cw-wk-list { list-style: none; margin: 72px 0 0; padding: 0; }
6400 @media (max-width: 760px) { 6401 [data-mode="cw"] .cw-wk-list { margin-top: 48px; } }
6405 [data-mode="cw"] .cw-wk-item { border-top: 1px solid currentColor; }
6408 [data-mode="cw"] .cw-wk-item:last-child { border-bottom: 1px solid currentColor; }
6414 [data-mode="cw"] .cw-wk__cross { font-family: var(--font-cw-body); font-size: 16px; line-height: 1.6; max-width: 56ch; margin: 48px 0 0; opacity: 0.9; }
6422 [data-mode="cw"] .cw-wk-item__link { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 28px 64px; padding: 44px 0 52px; color: inherit; text-decoration: none; }
6430 @media (max-width: 900px) { 6431 [data-mode="cw"] .cw-wk-item__link { grid-template-columns: 1fr; gap: 24px; padding: 36px 0 44px; } }
6437 [data-mode="cw"] .cw-wk-item__num { font-family: var(--font-cw-mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.9; margin: 0 0 14px; }
6445 [data-mode="cw"] .cw-wk-item__title { font-family: var(--font-cw-display); font-weight: 700; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.04; letter-spacing: -0.02em; text-transform: uppercase; margin: 0 0 16px; }
6454 [data-mode="cw"] .cw-wk-item__link:hover .cw-wk-item__title, 6455 [data-mode="cw"] .cw-wk-item__link:focus-visible .cw-wk-item__title { color: var(--color-cw-terracotta); }
6458 [data-mode="cw"] .cw-wk-item__line { font-family: var(--font-cw-body); font-weight: 500; font-size: clamp(17px, 1.6vw, 20px); line-height: 1.45; margin: 0 0 14px; max-width: 40ch; }
6466 [data-mode="cw"] .cw-wk-item__meta { font-family: var(--font-cw-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.9; margin: 0 0 22px; }
6474 [data-mode="cw"] .cw-wk-item__cta { display: inline-block; font-family: var(--font-cw-mono); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; border-bottom: 1px solid currentColor; padding-bottom: 4px; }
6483 [data-mode="cw"] .cw-wk-stats { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; align-content: start; }
6491 [data-mode="cw"] .cw-wk-stats li { padding: 14px 0; border-top: 1px solid color-mix(in srgb, currentColor 22%, transparent); display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
6499 [data-mode="cw"] .cw-wk-stats li:first-child { border-top: 0; padding-top: 0; }
6503 [data-mode="cw"] .cw-wk-stats strong { font-family: var(--font-cw-display); font-weight: 800; font-size: clamp(28px, 3vw, 40px); line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
6511 [data-mode="cw"] .cw-wk-stats span { font-family: var(--font-cw-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.85; text-align: right; }
```
(L6520–6575 is a SEPARATE, unrelated block: `[data-mode="theater"] .case-study__glance*` — the
case-page outcome strip. Not part of `/work` index but sits interleaved in the same "Pass-58"
comment region; do not confuse when editing.)

### Block B — Pass-61, `.cw-lot*` (catalogue-lot hero) + rest-title, L6577–6703

```
6577 /* ============================================================
6578  * Pass-61 — /work opens as a catalogue lot (.cw-lot*)
6579  * Operator: the page "does not entice me to look more… premium without
6580  * screaming AI". [...] Auction-catalogue form. Zero motion.
6584  * ============================================================ */
6585 [data-mode="cw"] .cw-lot { min-height: 78vh; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 420px); align-items: center; gap: 64px; padding: 152px 40px 104px; max-width: 1200px; margin: 0 auto; }
6595 @media (max-width: 900px) { 6596 [data-mode="cw"] .cw-lot { grid-template-columns: 1fr; gap: 40px; padding: 120px 20px 72px; min-height: 0; } }
6607 [data-mode="cw"] .cw-lot__h1 { margin: 0; font-weight: inherit; }
6611 [data-mode="cw"] .cw-lot__fig { display: block; font-family: var(--font-cw-display); font-weight: 800; font-size: clamp(72px, 13vw, 196px); line-height: 0.82; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; margin: 0; }
6621 [data-mode="cw"] .cw-lot__line { display: block; font-weight: 400; font-family: var(--font-cw-body); font-size: clamp(17px, 1.7vw, 21px); line-height: 1.45; max-width: 34ch; margin: 24px 0 0; opacity: 0.92; }
6633 [data-mode="cw"] .cw-lot__prov { font-family: var(--font-cw-mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.72; line-height: 1.9; margin: 40px 0 0; max-width: 46ch; }
6643 [data-mode="cw"] .cw-lot__cta { display: inline-block; margin-top: 20px; font-family: var(--font-cw-mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: inherit; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 5px; }
6655 [data-mode="cw"] .cw-lot__cta:hover, 6656 [data-mode="cw"] .cw-lot__cta:focus-visible { color: var(--color-cw-saffron); border-bottom-color: var(--color-cw-saffron); }
6663 [data-mode="cw"] .cw-lot__exhibit { margin: 0; justify-self: end; width: 100%; max-width: 420px; }
6669 @media (max-width: 900px) { 6670 [data-mode="cw"] .cw-lot__exhibit { justify-self: start; max-width: 100%; } }
6675 [data-mode="cw"] .cw-lot__exhibit img { display: block; width: 100%; height: auto; border: 1px solid color-mix(in srgb, var(--color-cw-bone) 34%, transparent); filter: grayscale(1) brightness(1.02) contrast(1.06) sepia(0.12); }
6682 [data-mode="cw"] .cw-lot__exhibit figcaption { margin-top: 12px; font-family: var(--font-cw-mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.62; }
6692 [data-mode="cw"] .cw-wk__rest-title { font-family: var(--font-cw-mono); font-weight: 500; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.75; margin: 0 0 8px; }
6701 [data-mode="cw"] .cw-wk .cw-wk-list { margin-top: 24px; }
```
- **Every one of these ~35 rules is `/work`-index-specific** (confirmed: no other `.tsx`/`.ts` file
  references `.cw-lot` or `.cw-wk*` — grep across the repo, excluding `node_modules`/`.next`,
  returned zero hits outside `app/(foyer)/work/page.tsx` and `app/globals.css` itself). A Direction
  B rebuild that removes the dark catalogue-lot hero for a paper one will need to retire or
  substantially rewrite Block B (`.cw-lot*`, `.cw-lot__exhibit img`'s `filter: grayscale(1) ...`
  grayscale treatment in particular assumes a dark/espresso surrounding) while Block A (`.cw-wk*`
  list rules) is largely surface-agnostic already (uses `currentColor` / `color-mix(in srgb,
  currentColor ...)` throughout, so it should carry into a paper-background rebuild with fewer
  changes than Block A's sibling).
- Immediately following, L6705+ (`Pass-110`) is a DELETED-rules tombstone comment (door/doors
  classes) — not live CSS, included here only so the brief-writer does not mistake the comment
  block boundary. Not reproduced in full; irrelevant to `/work`.
- **Related, not `/work`-specific but directly relevant to the new record block**: `.cw-exits*`
  rules at `app/globals.css:3966–4079+` (`[data-mode="cw"] .cw-exits`, `.cw-exits__title`,
  `.cw-exits__row`, `.cw-exits__deal`, `.cw-exits__baseline`, `.cw-exits__outcome`, responsive
  variants). These style the EXISTING home-page "Four exits I worked inside" block (§8) and are
  the closest live precedent for a company/role/outcome row list — worth reading in full before
  inventing new CSS for the Pass-120 "Also on the record" block, since the visual grammar (mono
  labels, tabular figures) may be directly reusable or adaptable rather than duplicated.

## 7. `next.config.ts` (95 lines) — redirects, no headers()

Full file already quoted above in this pass. Key facts:
- **No `headers()` function exists in this file.** Only `redirects()` (async, L22–76) and the MDX
  wrapper (`withMDX`, L79–95). There is nothing to audit for a headers-based redirect approach —
  redirects here are exclusively the Next.js `redirects()` config API.
- Current `redirects()` array (5 entries, each `{ source, destination, permanent: true }`):
  1. L24–28: `/work/akamai` → `/work/guardicore`
  2. L32–36: `/hire-me` → `/services`
  3. L43–47: `/work/hr-equity-author` → `/work/rfp-engine`
  4. L54–58: `/services/ai-engineering` → `/services`
  5. L65–69: `/book` → `/call`
  6. L70–74: `/book/kickoff` → `/call/kickoff`
  (Six objects total in the array; comment at L21 says "301 redirects for slug renames," and every
  existing entry uses `permanent: true` — a straight 308 per Next's implementation, see below.)
- **Pattern to follow for the two new redirects**: entry #1 (`/work/akamai` → `/work/guardicore`)
  is the exact precedent — a retired case-study slug redirecting to a surviving one. The Pass-120
  brief should add:
  ```
  { source: "/work/postmates", destination: "/work#record", permanent: true },
  { source: "/work/neuton", destination: "/work#record", permanent: true },
  ```
  immediately alongside the existing `/work/akamai` entry, with a comment matching the file's
  existing comment style (each entry above carries a `// Pass-NN (operator ...)` justification
  comment; the new pair should cite Pass-120 and the operator quote in
  `.planning/drafts/pass-120/four-studies-DRAFT.md:209` — `"but definitely describe a bit for each
  one. those are good ones for potential tech and enterprise clients"`).
- **`redirects` is checked by Next.js before the filesystem** (confirmed against
  `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md:39`:
  "Redirects are checked before the filesystem which includes pages and `/public` files.") — so
  even though `content/work/postmates.mdx` / `neuton.mdx` will still exist on disk unless deleted
  (retiring ≠ deleting, per the draft's wording "Both slugs 301 to `/work#record`"), the redirect
  fires first and the page is never reached, PROVIDED the mdx files' route (`/work/[slug]`) does
  not itself get statically pre-rendered and served ahead of the redirect check. **Recommendation
  for the brief**: delete (or move out of `content/work/`) `postmates.mdx` and `neuton.mdx` rather
  than relying solely on the redirect to shadow a live route, since `getAllCaseStudies()` (§9) would
  otherwise keep including them in `sitemap.ts`'s dynamic case-study routes (§8) unless their
  `status` is also changed away from `"shipped"` — belt-and-suspenders, and the design draft's own
  "Build notes" (four-studies-DRAFT.md:242–244) says "Both retired slugs 301 to `/work#record` in
  next.config" without specifying whether the mdx files are deleted; the brief must decide and
  state it explicitly.
- **`permanent: true` → HTTP 308** per the redirects.md doc (L30): "if `true` will use the 308
  status code which instructs clients/search engines to cache the redirect forever." Not a 301.
  The Pass-120 design doc and task framing both say "301" colloquially; the actual mechanism Next
  ships for `permanent: true` is 308 (permanent, method-preserving), which is what every existing
  redirect in this file already uses — no inconsistency to flag, just a naming note: verification
  commands checking the redirect should assert `308`, not literally `301`, if checking the status
  code (e.g., `curl -sI https://www.micahjonesconsulting.com/work/postmates | head -1` should show
  `HTTP/2 308`).

### Hash destination (`/work#record`) — confirmed supported by this Next.js version

Read `node_modules/next/dist/shared/lib/router/utils/parse-path.js` and
`node_modules/next/dist/shared/lib/router/utils/prepare-destination.js` (this Next version's own
source, since AGENTS.md warns training data may not match):
- `parse-path.js:15–31` (`parsePath`) explicitly splits any path string on both `#` and `?`,
  returning `{ pathname, query, hash }` separately — a destination string containing `#record` is
  correctly parsed, not treated as part of the pathname.
- `prepare-destination.js:184–192` (`prepareDestination`): comment at L187–188 states verbatim,
  *"The following code assumes that the pathname here includes the hash if it's present."* — and
  L189–191 does exactly that: `let destPath = parsedDestination.pathname; if
  (parsedDestination.hash) { destPath = \`${destPath}${parsedDestination.hash}\`; }`. Later, after
  running the compiled destination path through path-to-regexp (for `:param` interpolation, not
  needed here since `/work#record` has no dynamic segments), L258–265 re-splits on `#` and
  reassigns `parsedDestination.hash` before the final URL is assembled.
- **Conclusion for the brief: `destination: "/work#record"` is a plain, fully-supported string in
  this Next.js version's `redirects()` config.** No special encoding, no query-string workaround,
  and no known gotcha in this version's `prepare-destination.js` — the hash survives the whole
  compile pipeline and is appended to the final redirect `Location` header exactly as written.
  Standard browser behavior then applies: the 308 response's `Location: /work#record` causes the
  browser to navigate to `/work` and scroll to the element with `id="record"` — Next.js does not
  need to do anything more; **the `/work` page itself must render an element with `id="record"`**
  on the new "Also on the record" block for the scroll-to to land correctly (currently no element
  on `/work` has that id — confirmed by grep, §9 — so the Pass-120 rebuild must add `id="record"`
  to whatever wrapper renders the new block).
- No `middleware.ts` or `proxy.ts`/`proxy.tsx` file exists anywhere in the worktree root or `app/`
  (confirmed via `find`), so there is no secondary redirect/rewrite layer to reconcile with
  `next.config.ts`'s `redirects()` — this file is the single source of truth for the two new 308s.

## 8. `app/sitemap.ts` (107 lines) — full file quoted above in this pass

- L1–22 header comment explicitly lists indexed routes including `/work/[slug]` ("individual case
  studies — high value for entity search") and separately documents already-removed routes
  (`/work-with-me`, `/contact` as a route — though `/contact` reappears below as a currently-listed
  static entry, meaning this header comment is stale in that one respect; not a redirect/discovery
  issue for `/work` itself, but a correctness note for whoever next edits this file's own header).
- L31–91: static route array. **None of these are case-study slugs** — `/`, `/about`, `/work`,
  `/services`, `/packages`, `/contact`, `/call`. `/work` itself: L44–49, `priority: 0.9`,
  `changeFrequency: "monthly"`.
- L93–104: **dynamic case-study routes**, generated from `getAllCaseStudies()` filtered to
  `cs.status !== "stub"` (L96–98, IDENTICAL filter predicate to `work/page.tsx:66-68` and
  `lib/case-studies.ts`'s `getSelectedWork`/`getNextCaseStudy`/`getCaseStudyBySlug` — see §9). Maps
  each surviving study to `{ url: `${BASE_URL}/work/${cs.slug}`, lastModified: now,
  changeFrequency: "yearly", priority: 0.7 }` (L100–103).
- **Direct consequence for Pass-120**: once `postmates.mdx`/`neuton.mdx` are removed from
  `content/work/` (or their `status` flips away from `"shipped"`), `sitemap.xml` automatically
  stops listing `/work/postmates` and `/work/neuton` — **zero code change needed in
  `sitemap.ts` itself**, same as `work/page.tsx`. The only risk is the reverse: if the mdx files
  are LEFT in place with `status: shipped` and the team relies solely on the `next.config.ts`
  redirects to intercept requests, `sitemap.ts` would keep advertising `/work/postmates` and
  `/work/neuton` as canonical indexed URLs while every visit 308s away from them — a redirect
  chain a crawler would eventually resolve, but a sitemap entry that is itself always-redirecting
  is a known minor SEO smell. **Recommendation**: delete or reclassify the two mdx files as part of
  the same commit that adds the redirects, so `sitemap.ts`'s existing filter naturally excludes
  them with no separate edit.

## 9. `app/robots.ts` (33 lines) — full file quoted above; no `/work` or Postmates/Neuton content

- Single rule: `{ userAgent: "*", allow: "/" }` (L23–26). `sitemap` points at
  `https://www.micahjonesconsulting.com/sitemap.xml` (L29). `host` set to the `www` canonical
  (L30). **No disallow rules of any kind exist** — nothing here references `/work`, `/work/
  postmates`, `/work/neuton`, or case studies at all, and nothing needs to change for Pass-120's
  redirect/retirement work. (Header comment L13–15 records that the old `/v1`-`/v4` disallow
  entries were deleted outright in Pass-37, not turned into 404-then-redirect — a style precedent:
  this codebase's habit for retired routes is either a real 301/308 redirect (case-study slugs,
  `/hire-me`, `/book`) or outright deletion with no lingering reference (the `/v1`-`/v4` snapshots),
  never a robots.txt disallow for a page that still 200s.)

## 10. `app/llms.txt/route.ts` (58 lines) — full file quoted above

- Plain-text response (not JSON-LD, not HTML) read by LLM crawlers. Body is a hand-written
  Markdown-ish string (L15–48).
- **Postmates and Neuton.AI appear ONLY as prose inside the opening paragraph** (L17): "...Four
  companies he worked inside reached an exit: Postmates (acquired by Uber, 2020, $2.65B),
  SurveyMonkey (cap-table position held through the IPO, 2018), Guardicore (acquired by Akamai,
  2021, $600M), and Neuton.AI (technology acquired by Nordic Semiconductor, 2025; helped launch,
  not a cap-table position)..." — **this is NOT a hyperlink**, just narrative text naming the four
  companies. It is factually accurate regardless of whether the two companies have their own case-
  study pages, so it needs no edit purely for the redirect/retirement.
- **The "Pages worth reading" list (L36–43) links to exactly four case studies and none of them are
  Postmates or Neuton**: `/work/ordani`, `/work/guardicore`, `/work/content-engine`,
  `/work/rfp-engine`. **Postmates and Neuton have never had an llms.txt entry at all** — confirmed,
  there is no `[...case study...](https://www.micahjonesconsulting.com/work/postmates)` or
  `/work/neuton` link anywhere in this file. Zero edit required here for the retirement itself. If
  Pass-120 adds the birth-worker study as a fifth real case-study page, THIS is the file that would
  gain a new list entry (outside this facet's scope, noted for completeness only).

## 11. Every internal reference to Postmates / Neuton, site-wide (exhaustive grep, case-insensitive, excluding `node_modules`, `.next`, `.planning`)

Grep run: `grep -rniI "postmates\|neuton" --include="*.ts" --include="*.tsx" --include="*.mdx" --include="*.json" .`
— full result set, every hit classified:

| File:line | Verbatim (excerpted) | Is it a hyperlink to `/work/postmates` or `/work/neuton`? |
|---|---|---|
| `app/(foyer)/about/page.tsx:108,111,114,115,120` | comments + prose: `"Postmates (Uber, 2020). SurveyMonkey (IPO, 2018). Guardicore (Akamai, 2021). Neuton.AI (technology acquired by Nordic Semiconductor, 2025)..."` | **No.** Plain text inside an `<li>`, not wrapped in `<a>`. |
| `app/(foyer)/opengraph-image.tsx:18` | `punch="Four exits: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. Now building Ordani."` | **No.** Baked OG-image text (home page's OG image). |
| `app/(foyer)/page.tsx:475,489,517,520,522` | `.cw-lrow__co` spans reading `Postmates` / `Neuton.AI` inside the home page's "ledger" rows (see §12 below); plus a long dev comment (L515–529) explaining an operator ruling (2026-09-10) about why both moved under "03 Position" | **No.** Confirmed by reading `app/(foyer)/page.tsx:440–539` in full: these are `<span className="cw-lrow__co">Postmates<span className="cw-lrow__tag">Product analyst · 2020</span></span>` — plain spans inside a `<div role="listitem">`, never an `<a>`. |
| `app/(foyer)/work/opengraph-image.tsx:16` | identical `punch` string as above | **No.** Baked OG-image text, `/work` index's own OG image. |
| `app/layout.tsx:32,68,103` | root metadata `description` strings naming all four exits; `alumniOf: [..., { "@type": "Organization", name: "Postmates" }]` (JSON-LD, L103) | **No.** L103 is a `schema.org` `Organization` name string inside a `PERSON_LD` JSON-LD object — it is structured data naming an employer, not a URL or a link to any `/work/*` route. Confirmed no `url` field is set on this JSON-LD entry. |
| `app/llms.txt/route.ts:17` | prose paragraph (quoted in §10) | **No.** |
| `components/color-worlds/Hero.tsx:186,193,268` | dev comments only (`// ... (Guardicore, SurveyMonkey, Postmates, Neuton.AI) is positioning...`) | **No.** These three hits are all inside `{/* ... */}` JSX comments explaining copy decisions, not rendered text or links. |
| `content/citations.ts:11,12,18,21,24,39,52,70` | citation metadata: URLs, quoted stats, and the `DEALS` array entries for `company: "Postmates"` / `company: "Neuton.AI"` (full block quoted in §12) | **No.** One `url` field (L18) points to an EXTERNAL TechCrunch article about the Uber/Postmates deal, not an internal `/work/*` link. Everything else is data (strings, not JSX/HTML). |
| `content/work/neuton.mdx` (whole file) | the case-study page itself | **N/A** — this IS the page being retired, not a link to it. |
| `content/work/postmates.mdx` (whole file) | the case-study page itself | **N/A** — same. |

**Conclusion, stated plainly for the brief: there is no internal `<a href="/work/postmates">` or
`<a href="/work/neuton">` anywhere in the live codebase.** The only two places that generate actual
HTML links to those routes are: (a) the dynamically-rendered `/work` index's own `.cw-lot__cta`
(for whichever study is `order: 1`) and `.cw-wk-item__link` (for every other non-lead study) — both
in `work/page.tsx` and both driven by `getAllCaseStudies()`, so removing the two mdx files removes
these links with no separate edit; and (b) `sitemap.ts`'s dynamic case-study routes, same
mechanism. **Nav, footers (`PageFooter`), the home page's ledger rows, the about page, `llms.txt`,
and the root JSON-LD all mention Postmates and/or Neuton.AI as plain text/data, never as a link to
their now-retired pages, so the 301/308 redirects have zero surface area to fix outside the two
dynamically-generated listing surfaces (`/work` itself and `sitemap.xml`).**

## 12. `getNextCaseStudy` wrap-around — `lib/case-studies.ts:144-152`

- The theater case-study template (`app/(theater)/work/[slug]/page.tsx:126`,
  `const next = await getNextCaseStudy(slug);`) renders a `[NEXT WORK ↘]` link (comment at
  `app/(theater)/work/[slug]/page.tsx:13`, actual render context at L277). `getNextCaseStudy`
  (`lib/case-studies.ts:144-152`) filters out stubs, finds the current slug's index in the
  `order`-sorted list, and returns `all[(idx + 1) % all.length]` — wrapping to the first study
  after the last.
- **Current `order` sequence** (from every `content/work/*.mdx` frontmatter, confirmed by grep):
  `guardicore: 1`, `ordani: 2`, `rfp-engine: 3`, `content-engine: 4`, `postmates: 5`, `neuton: 6`.
  So today, `content-engine`'s "next" is `postmates`, and `postmates`'s "next" is `neuton`, and
  `neuton`'s "next" wraps to `guardicore`.
- **Once `postmates.mdx`/`neuton.mdx` are removed** (or their `status` changed away from
  `"shipped"`), this function needs NO code change: `getAllCaseStudies()` re-reads the directory on
  every call (it is not cached — `lib/case-studies.ts:42-49`, a fresh `readdir` + per-file `readFile`
  every invocation), so `content-engine`'s "next" automatically becomes `guardicore` (wrapping,
  since it would then be last in the `order` sequence) with zero hardcoded link to fix. This is the
  same "dynamic, not hardcoded" pattern as the `/work` index and the sitemap — confirmed a third
  time across the three surfaces that could plausibly hardcode a slug.
- A long-standing comment at `lib/case-studies.ts:130-142` documents a PRIOR bug (Pass-78 era)
  where `getNextCaseStudy` and `getCaseStudyBySlug` disagreed on stub-filtering and produced a
  working-looking link to a 404 — cited as "LESSONS #13's class." Not directly triggered by the
  Postmates/Neuton retirement (both are `status: shipped`, not `stub`), but worth the brief-writer
  reading in full before touching this file, since it is exactly the kind of two-function-disagree
  bug class that a slug retirement could reintroduce if only ONE of `getAllCaseStudies`'s callers
  is updated to exclude the retired slugs.

## 13. Prior art directly relevant to the new "Also on the record" block: `ExitRecord.tsx`

Not part of `/work` today, but the closest existing implementation of "a row list of exit
companies sourced from `content/citations.ts`," and the Pass-120 design doc's own "record block"
(FABLE-120-DESIGN.md §2, L125-129, and four-studies-DRAFT.md §3) describes something structurally
very close to this component. Flagging in full so the brief doesn't reinvent it from zero or miss
an inconsistency between the two:

- **`components/color-worlds/ExitRecord.tsx`** (52 lines, full file quoted above in this pass).
  Imports `CITATIONS` from `@/content/citations`, reads `CITATIONS.EXITS_COMBINED_VALUE.DEALS`
  (an array of `{ company, event, counterparty, year, value, note, outcome }` — full array quoted
  in `content/citations.ts:41-78` above), sorts by `dealValue()` DESCENDING (largest deal value
  first — `Number.NEGATIVE_INFINITY` for `value: null`, i.e., Neuton sorts LAST), and renders an
  `<ol className="cw-exits__row">` of `<li className="cw-exits__deal">` with `.cw-exits__co`
  (company name), `.cw-exits__val` (dollar value or `"Undisclosed"`), `.cw-exits__outcome` (the
  `outcome` string, e.g. `"Acquired by Uber"`). Heading: `<h4 id="cw-exits-title">Four exits I
  worked inside</h4>` (L20-22).
  - **Mounted exactly once, on the home page**: `app/(foyer)/page.tsx:67` (import) and
    `app/(foyer)/page.tsx:544` (`<ExitRecord />` render, inside the closing "receipts" section
    described by the long dev comment at L504-535).
  - **Not currently imported or rendered anywhere on `/work`.**
- **Structural gap vs. the Pass-120 spec**: the design draft's record block wants THREE data
  points per row — Company, Role, What happened (four-studies-DRAFT.md:216, 220-225 table) — but
  `ExitRecord`'s source data (`CITATIONS.EXITS_COMBINED_VALUE.DEALS`) has NO `role` field per deal
  (only `company`, `event`, `counterparty`, `year`, `value`, `note`, `outcome`). The Pass-120
  table's `Role` column values (`Enterprise sales`, `Product analyst`, `Revenue and positioning`,
  `Helped launch`) exist elsewhere — matching each case study's own `role:` frontmatter field
  (`guardicore.mdx role: Revenue and positioning`, `postmates.mdx role: Product analyst`,
  `neuton.mdx role: Helped launch`) or, for SurveyMonkey (which has no case-study page), only in
  free text on the home page (`app/(foyer)/page.tsx:459-461`, `.cw-lrow__tag`: `"Enterprise sales ·
  2018"`) and `content/citations.ts`'s own `DEALS[0].event: "Nasdaq IPO"` (not literally "Enterprise
  sales"). **The brief must either (a) add a `role` field to each `DEALS` entry in
  `content/citations.ts` so a rebuilt/extended `ExitRecord`-like component can source it from one
  place, or (b) hand-write the four rows as new copy/data directly in the `/work` page or a new
  small data file, per the design draft's own "Build notes" which describe the record block as
  "data in `content/`" (FABLE-120-DESIGN.md:363) without naming an exact file.**
- **Sort-order mismatch to flag**: `ExitRecord` sorts by deal VALUE (largest first — SurveyMonkey
  $2.33B, Postmates $2.65B... actually Postmates is largest at $2.65B, then SurveyMonkey $2.33B,
  then Guardicore $600M, then Neuton undisclosed/last). The Pass-120 draft explicitly wants the
  NEW `/work` record block "ordered by exit year" (four-studies-DRAFT.md:216: "Four rows, ordered
  by exit year" — SurveyMonkey 2018, Postmates 2020, Guardicore 2021, Neuton 2025). **These are two
  different sort orders for what is conceptually the same four-company list** — if the brief reuses
  `ExitRecord`'s component code path at all, the sort comparator must change from `dealValue()`
  descending to `year` ascending; if it writes a wholly separate component/data for `/work`, this
  is a non-issue but the brief should still note the divergence exists between the home page's
  block and `/work`'s new block so nobody "fixes" one to match the other by mistake later.
- **CSS precedent**: `.cw-exits*` rules live at `app/globals.css:3966` onward (title, row, deal,
  baseline, outcome, plus responsive overrides through at least L4079) — read in full before
  writing new CSS for the `/work` record block, since the visual grammar (mono uppercase labels,
  `currentColor`-based rules, tabular figures) is the established pattern for "receipts" lists on
  this site and Pass-120's own general notes (FABLE-120-DESIGN.md L112-115, "Proof is a number with
  its meaning beside it, never a bare number") describe exactly what `.cw-exits__val` +
  `.cw-exits__outcome` already do.

## 14. `id="record"` — currently does not exist anywhere

Confirmed by grep across `app/`, `components/`: no element in the current codebase carries
`id="record"`. This id must be newly added to whichever wrapper renders the "Also on the record"
block on `/work`, both so the two new redirects' `#record` fragment has something to scroll to, and
per standard fragment-navigation behavior (§7) — the destination element additionally wants
`scroll-margin-top` considered if the fixed `<Nav>` (mounted in the group layout, §3) would
otherwise cover the top of the scrolled-to block.

---

## Five-line summary (also returned as the final response)

1. `/work` (`app/(foyer)/work/page.tsx`, 194 lines) opens on a dark "catalogue lot" hero
   (`OpeningWorld name="espresso"`, L75; `.cw-lot*` CSS, `globals.css:6577-6703`) then a paper
   "rest of the record" list (`.cw-wk*` CSS, `globals.css:6381-6519`); Direction B wants the whole
   page paper, so both the world name and `.cw-lot*`'s dark-ground CSS need rework.
2. Zero internal hyperlinks to `/work/postmates` or `/work/neuton` exist anywhere outside the
   dynamically-generated `/work` index and `sitemap.ts` (both driven by `getAllCaseStudies()`
   reading `content/work/*.mdx`) — every other mention (home, about, Hero.tsx comments, layout.tsx
   JSON-LD, llms.txt) is plain text/data, so retiring the two mdx files alone clears those two
   surfaces automatically, plus `getNextCaseStudy`'s wrap-around (`lib/case-studies.ts:144-152`).
3. `next.config.ts` has `redirects()` but no `headers()`; add the two new entries next to the
   existing `/work/akamai → /work/guardicore` precedent (L24-28); `permanent: true` is actually a
   308, not a literal 301, matching every existing entry in the file.
4. This Next version's own source (`prepare-destination.js:184-265`) confirms `destination:
   "/work#record"` is fully supported — the hash is parsed out and re-appended to the final
   redirect Location header — but no element with `id="record"` currently exists anywhere, so the
   rebuilt block must add one.
5. `components/color-worlds/ExitRecord.tsx` (mounted only on the home page, `page.tsx:544`,
   sourced from `content/citations.ts`'s `DEALS` array) is close prior art for the new record
   block but sorts by deal value, lacks a `role` field, and isn't ordered by year like the
   Pass-120 draft wants — reuse or diverge deliberately, don't silently duplicate.
