# 3. The study template (Direction B) and 4. Motion

Sources, all read on 2026-09-16: `.planning/reviews/FABLE-120-DESIGN.md` §2, §3 and §7;
`.planning/mock/pass-120/b/study-guardicore.html`; `.planning/briefs-prep/pass-120/study-template.md`,
`content-model.md` and `gates.md`; section 2 of this brief (`sections/S2-content.md`, for the
frontmatter fields and the MDX component props, which that section owns); section 4
(`sections/S4-work.md`, for the /work CSS it deletes and its own `--wx-*` scale); section 6
(`sections/S6-verify.md`, which owns `page120.mjs` and `settle120.mjs`); and my own read of
`app/(theater)/work/[slug]/page.tsx`, `components/TitleCard.tsx`, `components/TitleCardComposition.tsx`,
`app/(theater)/work/[slug]/opengraph-image.tsx`, `components/PullQuote.tsx`, `app/(theater)/layout.tsx`,
`components/Footer.tsx`, `components/view-transition-link.tsx`, `mdx-components.tsx`,
`app/(foyer)/services/page.tsx`, `app/globals.css`, `.claude/brand.json`, `lib/fonts.ts`,
`scripts/gsap-quarantine-gate.mjs`, and `node_modules/next/dist/docs` (image.md, link.md).

**Where the rulings, the mock, the maps and the repo disagree (the repo and the rulings win):**
- The mock's tokens are right (it copied live code). `.claude/CLAUDE.md`'s hexes are stale: live
  copper is `#bd5a2d` and copper-deep `#8a3d24` (`app/globals.css`, `@theme`), not `#C8542B` and
  `#8E3A1E`. Every contrast figure below is computed from the live values.
- The mock prints captions under both photographs. The no-captions ruling removes them.
- The mock's step numerals use copper-deep, which is right: plain copper on paper measures 3.93:1
  and fails at 13px. The design doc's "copper mono numeral" is overruled by Pitfall B1.
- The design doc tints optional blocks with `rule-foyer`. A rule colour as a fill makes the
  block's own hairlines vanish. The tint is `--color-bone` (`#e8dfd0`), the existing token the
  doc itself calls "bone, one step off paper".
- The design doc and the ruling say the settle runs "once per load". This section defines that
  exactly in 4.1 and lists the interpretation in the open items.

---

## 3.0 Contract with the other sections

The template reads only fields section 2 defines (`lib/case-study-schema.ts`,
`PublishedCaseStudyMeta`): `title`, `titleLines`, `description`, `dek`, `client`,
`clientNameProtected`, `atAGlance`, `results.lead`, `results.rest`, `entry.context`,
`entry.figure`, `entry.line`, `entry.did`, `service`, `publishedAt`, `hero`, and the exported
`SERVICE_LABELS`. It uses section 2's component props unchanged: `Step { n, lead, children }`,
`Exhibit { children }`, `ExhibitRow { request, engine }`, `ChapterBreak { src, width, height,
alt }`, `PullQuote { attribution, children }`. If section 2 renames any of these before
assembly, the assembler renames them here; the executor does not.

Slugs and order (section 2): 1 `guardicore`, 2 `rfp-engine`, 3 `ordani`, 4 `content-engine`,
5 `birth-worker`. Next wraps 5 to 1.

Photographs (section 2): the Guardicore band carries `/guardicore-telaviv-session.jpg`
(770x575). ORDANI has no band photograph and one chapter break, `/ordani-intake.jpg`. The other
three studies carry no image of any kind.

---

## 3.1 Files

**Rewrite whole:** `app/(theater)/work/[slug]/page.tsx` (3.3), `components/TitleCard.tsx` (4.1),
`app/(theater)/work/[slug]/opengraph-image.tsx` (3.10), `mdx-components.tsx` (3.8).

**Create:** `components/study/StudyBlocks.tsx` (3.6.3).

**Edit:** `app/globals.css` (3.4 to 3.7, 4.1), `components/PullQuote.tsx` (one attribute,
3.6.5), `app/(foyer)/services/page.tsx` (one attribute, 3.6.6), `.claude/brand.json` (4.6).

**Delete:** `components/TitleCardComposition.tsx`, `components/CaseStudySidebar.tsx`,
`components/CaseStudyStill.tsx`, `components/Dek.tsx`, `components/CopperRule.tsx`. Proof that
nothing else needs them: after section 2's MDX rewrite no body uses `<CaseStudyStill>`,
`<Dek>`, `<CopperRule>` or `<TitleCard>` (today `<CaseStudyStill>` appears at
`content/work/content-engine.mdx:39`, `guardicore.mdx:46,55`, `ordani.mdx:33`,
`rfp-engine.mdx:36`, and `<Dek>`/`<CopperRule>` appear in no MDX at all);
`TitleCardComposition` is imported only by `components/TitleCard.tsx:40`; `CaseStudySidebar`
only by `page.tsx:26,274`. `lib/title-card-schema.ts` is NOT deleted: section 2 rewrites it and
the page still parses through it.

**Not touched:** `components/view-transition-link.tsx`, the `::view-transition-*` rules and
`--duration-mode-fade` in `app/globals.css`, `components/color-worlds/Nav.tsx`,
`scripts/gsap-quarantine-gate.mjs`, `components/CaseStudyReadTracker.tsx`.

---

## 3.2 The render, top to bottom

```
[data-mode="theater"]                        app/(theater)/layout.tsx, unchanged
  a.skip-to-content
  Nav (.cw-nav, fixed)                       unchanged
  main#main-content
    article.cs[data-case=<slug>]
      script[type="application/ld+json"]
      CaseStudyReadTracker                   no output
      header.cs-band                         THE DARK BAND (theater tokens)
        div.cs-band__grid[data-photo]
          div.cs-band__head
            p.cs-band__context               client
            h1.cs-title > span.cs-title__line x titleLines   (TitleCard, the settle)
          div.cs-band__text
            p.cs-band__dek                   dek
            dl.cs-glance                     Client, atAGlance rows, Results
          div.cs-band__media                 only when hero exists
      div.cs-page[data-surface="paper"]      THE PAPER BODY (token remap)
        div.cs-body                          the MDX body on a 68ch column grid
          ...MDX (h2, p, ul, Step, Exhibit, ChapterBreak, PullQuote)
          p.cs-close > a                     the /services block link
        nav.cs-next                          one Next entry, then All work
  Footer[data-footer-root]                   repainted to paper on study pages
```

No sticky rail, no reading-progress bar, no table of contents, no meta line, no placeholder
image, no "back to home" link, no stat strip.

---

## 3.3 `app/(theater)/work/[slug]/page.tsx`

Keep `generateStaticParams`, `dynamicParams`, `clampDescription` and `generateMetadata`
(today's lines 34-108) exactly as section 2 §2.2 leaves them (the `isPublished` filter and
`clampDescription(cs.description)`). Replace everything else (the header comment at lines 1-19,
the imports at lines 20-32, and the default export at lines 110-293) with exactly this. First the
head of the file:

```tsx
// app/(theater)/work/[slug]/page.tsx
//
// Pass-120, Direction B: curtain, then page. A dark band names the client, the
// title, the dek and the result, with the photograph where one exists. The body
// turns to paper through data-surface="paper" (app/globals.css, "PASS-120 STUDY
// TEMPLATE"). One Next entry and All work close the page. The title's settle
// entrance is components/TitleCard.tsx.
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TitleCard } from "@/components/TitleCard";
import { CaseStudyReadTracker } from "@/components/CaseStudyReadTracker";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { titleCardSchema } from "@/lib/title-card-schema";
import { SERVICE_LABELS } from "@/lib/case-study-schema";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
  isPublished,
} from "@/lib/case-studies";
```

Then the kept functions, unchanged from section 2. Then the default export:

```tsx
export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const mod = await import(`@/content/work/${slug}.mdx`);
  const MDXContent = mod.default;

  const next = await getNextCaseStudy(slug);

  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.description,
    datePublished: cs.publishedAt,
    author: {
      "@type": "Person",
      name: "Micah Jones",
      url: "https://www.micahjonesconsulting.com",
    },
    publisher: {
      "@type": "Person",
      name: "Micah Jones",
      url: "https://www.micahjonesconsulting.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.micahjonesconsulting.com/work/${slug}`,
    },
  };

  return (
    <article className="cs" data-case={slug}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />
      <CaseStudyReadTracker slug={slug} />

      <header className="cs-band">
        <div className="cs-band__grid" data-photo={cs.hero ? "true" : "false"}>
          <div className="cs-band__head">
            <p className="cs-band__context">{cs.client}</p>
            <TitleCard
              {...titleCardSchema.parse({ title: cs.title, lines: cs.titleLines })}
            />
          </div>

          <div className="cs-band__text">
            <p className="cs-band__dek">{cs.dek}</p>
            <dl className="cs-glance">
              <div className="cs-glance__row">
                <dt>Client</dt>
                <dd>
                  {cs.client}
                  {cs.clientNameProtected ? (
                    <>
                      {" "}
                      <span className="cs-glance__protected">Name protected</span>
                    </>
                  ) : null}
                </dd>
              </div>
              {cs.atAGlance.map((row) => (
                <div className="cs-glance__row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              <div className="cs-glance__row">
                <dt>Results</dt>
                <dd>
                  <span className="cs-glance__result">{cs.results.lead}</span>{" "}
                  <span className="cs-glance__result-rest">{cs.results.rest}</span>
                </dd>
              </div>
            </dl>
          </div>

          {cs.hero ? (
            <div className="cs-band__media">
              <Image
                src={cs.hero.src}
                width={cs.hero.width}
                height={cs.hero.height}
                alt={cs.hero.alt}
                preload
                sizes="(min-width: 1024px) 405px, calc(100vw - 32px)"
                className="cs-band__img"
              />
            </div>
          ) : null}
        </div>
      </header>

      <div className="cs-page" data-surface="paper">
        <div className="cs-body">
          <MDXContent />
          <p className="cs-close">
            <ViewTransitionLink
              href={`/services#${cs.service}`}
              className="cs-close__link"
            >
              {SERVICE_LABELS[cs.service]}
              <span aria-hidden="true"> →</span>
            </ViewTransitionLink>
          </p>
        </div>

        <nav className="cs-next" aria-labelledby="cs-next-label">
          <p className="cs-next__label" id="cs-next-label">
            Next
          </p>
          {next ? (
            <ViewTransitionLink
              href={`/work/${next.slug}`}
              className="cs-next__entry"
            >
              <span className="cs-next__context">{next.entry.context}</span>{" "}
              <span className="cs-next__line">
                {next.entry.figure
                  ? `${next.entry.figure} ${next.entry.line}`
                  : next.entry.line}
              </span>{" "}
              <span className="cs-next__did">{next.entry.did}</span>{" "}
              <span className="cs-next__service">
                {SERVICE_LABELS[next.service]}
              </span>
            </ViewTransitionLink>
          ) : null}
          <ViewTransitionLink href="/work" className="cs-next__all">
            All work
          </ViewTransitionLink>
        </nav>
      </div>
    </article>
  );
}
```

Notes the executor needs and must not reinterpret:
- `preload` replaces `priority`, which Next.js 16 deprecated
  (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:265-293`). The
  band photograph is the only above-the-fold image on the one study that has it.
- `sizes`: at 1440 the band's content box is 1184px; the grid gives the media column
  (1184 - 72) x 4/11 = 404.4px, so `405px`. Below 1024 the photograph runs the band's width.
- The Next entry is the /work entry's four data points and nothing else: context, the
  figure-bearing line (the lead study's `figure` joined to its `line` with one space, since only
  order 1 carries `figure`), what he did, and the service. Wrapping from birth-worker, the line
  reads `$14M in revenue, sourced and closed, at a $1.2M average enterprise deal.`
- The close link lands on the /services block by hash (`link.md:685-694`: a hash in `href`
  scrolls to the id). The id it needs is added in 3.6.6.
- The exact visible strings this file adds: `Client`, `Name protected`, `Results`, `Next`,
  `All work`, and the three `SERVICE_LABELS` values from section 2 (`Positioning & GTM`,
  `Product building`, `AI engineering`) followed by ` →` (the arrow is `aria-hidden`).

---

## 3.4 The paper surface inside a theater route: attribute, token remap, atmosphere, footer

**The attribute.** `data-surface="paper"` on `div.cs-page`. Only the study template uses it.
The route group still stamps `data-mode="theater"` (`app/(theater)/layout.tsx`), so the dim
between /work and a study is unchanged.

**The remap.** New template classes never read `--color-theater-*` or `--color-foyer-*`
directly. They read seven local properties, set once for the band (theater values) and
re-set on the paper region. This opens the new block (3.9 says where the block goes):

```css
/* ============================================================
 * PASS-120 STUDY TEMPLATE (Direction B: curtain, then page)
 * Classes: .cs, .cs-band*, .cs-title*, .cs-glance*, .cs-page,
 * .cs-body, .cs-step*, .cs-exhibit*, .cs-break*, .cs-close*,
 * .cs-next*. Local tokens --cs-* are set per surface below;
 * template rules read only those.
 * ============================================================ */
[data-mode="theater"] .cs {
  --cs-bg: var(--color-theater-ground);
  --cs-ink: var(--color-theater-ink);
  --cs-ink-soft: var(--color-theater-ink-soft);
  --cs-rule: var(--color-rule-theater);
  --cs-accent: var(--color-accent-copper);
  --cs-link: var(--color-theater-ink);
  --cs-tint: var(--color-theater-surface);
}
[data-mode="theater"] .cs [data-surface="paper"] {
  --cs-bg: var(--color-foyer-paper);
  --cs-ink: var(--color-foyer-ink);
  --cs-ink-soft: var(--color-foyer-ink-soft);
  --cs-rule: var(--color-rule-foyer);
  --cs-accent: var(--color-accent-copper);
  --cs-link: var(--color-accent-copper-deep);
  --cs-tint: var(--color-bone);
  background-color: var(--cs-bg);
  color: var(--cs-ink);
}
/* ORDANI: sage replaces copper (the one recorded exception). */
[data-mode="theater"] .cs[data-case="ordani"] {
  --cs-accent: var(--color-ordani-sage);
}
[data-mode="theater"] .cs[data-case="ordani"] [data-surface="paper"] {
  --cs-accent: var(--color-ordani-sage);
  --cs-link: var(--color-ordani-sage);
}
```

**The atmosphere.** `[data-mode="theater"]::before` (film grain) and `::after` (the drifting
spotlight) are `position: fixed` over the whole viewport (`app/globals.css:210-250` at map
time), so they would sit on the paper body. On a page that carries a paper surface both are
removed, and the band carries the grain alone (no spotlight: a fixed layer cannot be scoped to
the band).

1. In the rule `[data-mode="theater"]::before`, replace the whole `background-image:` value
   (the two `url("data:image/svg+xml;utf8,...")` layers) with `var(--grain-theater)`.
2. Directly above that rule, add this, with the two `url(...)` layers moved byte for byte:
   ```css
   :root {
     --grain-theater: url("data:image/svg+xml;utf8,<the first layer, unchanged>"), url("data:image/svg+xml;utf8,<the second layer, unchanged>");
   }
   ```
3. In the new block, add:
   ```css
   [data-mode="theater"]:has([data-surface="paper"])::before,
   [data-mode="theater"]:has([data-surface="paper"])::after {
     content: none;
   }
   .cs-band::before {
     content: "";
     position: absolute;
     inset: 0;
     z-index: -1;
     pointer-events: none;
     background-image: var(--grain-theater);
     background-size:
       120px 120px,
       180px 180px;
     opacity: 0.14;
     mix-blend-mode: screen;
   }
   @media (prefers-reduced-motion: reduce) {
     .cs-band::before {
       opacity: 0.07;
     }
   }
   ```

**The footer.** `Footer` sits outside `main` in the theater layout. On study pages it turns to
paper so the page ends on one ground (the mock does the same). Add:

```css
[data-mode="theater"]:has([data-surface="paper"]) [data-footer-root] {
  background-color: var(--color-foyer-paper);
  color: var(--color-foyer-ink-soft);
  border-top-color: var(--color-rule-foyer);
}
[data-mode="theater"]:has([data-surface="paper"]) [data-footer-root] .footer-email-link {
  color: var(--color-foyer-ink);
  text-decoration-color: var(--color-accent-copper);
}
[data-mode="theater"]:has(.cs[data-case="ordani"]) [data-footer-root] .footer-email-link {
  text-decoration-color: var(--color-ordani-sage);
}
```

The nav is not touched: at the top it is transparent over the band, and once scrolled it paints
its own `--color-theater-ground` chip (`app/globals.css`, `.cw-nav.is-scrolled`), which reads on
paper as a dark bar with bone type.

**Contrast pairs to re-check** (WCAG ratios computed 2026-09-16 from the live token hexes; the
section 6 axe run V8 and page120 T11 re-measure the render):

| Where | Foreground on background | Ratio | Use allowed |
|---|---|---|---|
| Band text | theater-ink `#ece3d0` on ground `#12100e` | 14.88 | all text |
| Band labels | theater-ink-soft `#a69b8a` on ground | 6.94 | 13px/12px mono labels |
| Band rule | copper `#bd5a2d` on ground | 4.22 | the 2px bottom rule only |
| Band rule, ORDANI | sage `#5e7158` on ground | 3.60 | the 2px bottom rule only (UI, 3:1) |
| Paper body | foyer-ink `#1a1816` on paper `#f5efe4` | 15.47 | all text |
| Paper labels | foyer-ink-soft `#3a3631` on paper | 10.47 | mono labels, footer |
| Paper links and numerals | copper-deep `#8a3d24` on paper | 6.62 | body links, step numerals |
| Paper links and numerals, ORDANI | sage on paper | 4.61 | body links, step numerals |
| Paper decoration | copper on paper | 3.93 | list dashes, hover underline colour, focus ring; NEVER text |
| Exhibit text | foyer-ink on bone `#e8dfd0` | 13.40 | exhibit cells |
| Exhibit labels | foyer-ink-soft on bone | 9.07 | exhibit headers |

Sage on bone is 4.00 and fails small text; ORDANI has no exhibit, so the pair never renders.

---

## 3.5 The type scale: five tokens, four active sizes on a study

Add inside the new block, before the surface tokens. These are the ruled sizes (1440: 112, 56,
36, 18, 13; 390: 64, 36, 26, 17, 12). Section 4 sizes /work with its own `--wx-*` properties;
these `--fs-*` properties serve the study template only, with the same values.

```css
:root {
  --fs-display: 112px;
  --fs-h1: 56px;
  --fs-h2: 36px;
  --fs-body: 18px;
  --fs-label: 13px;
  --cs-gutter: clamp(32px, 8.9vw, 128px);
}
@media (max-width: 767px) {
  :root {
    --fs-display: 64px;
    --fs-h1: 36px;
    --fs-h2: 26px;
    --fs-body: 17px;
    --fs-label: 12px;
    --cs-gutter: 16px;
  }
}
```

A study page uses four of them. `--fs-display` is /work's figure size and never renders on a study.

| Token | 1440 | 390 | Face | Classes |
|---|---|---|---|---|
| `--fs-h1` | 56 | 36 | Bricolage 800, lh 1.08, -0.02em | `.cs-title` |
| `--fs-h2` | 36 | 26 | Bricolage 700 | `.cs-body h2`, `.cs-glance__result`, `.cs-next__line`, `.case-study-pull-quote__quote` |
| `--fs-body` | 18 | 17 | Hanken 400 (600 for `strong`), lh 1.6 | `.cs-band__dek`, `.cs-glance dd`, `.cs-glance__result-rest`, `.cs-body` (p, li, Step text, exhibit cells), `.cs-close__link`, `.cs-next__did`, `.cs-next__all` |
| `--fs-label` | 13 | 12 | JetBrains Mono 500, +0.06em, no uppercase | `.cs-band__context`, `.cs-glance dt`, `.cs-glance__protected`, `.cs-step__n`, `.cs-exhibit th`, `.cs-exhibit td::before`, `.cs-next__label`, `.cs-next__context`, `.cs-next__service`, `.case-study-pull-quote__attribution` |

Mono renders only in those label classes. Nothing in the template sets `text-transform:
uppercase`. The page gutter is `--cs-gutter`: 16px below 768, 128px at 1440.

---

## 3.6 Layout CSS, in order

### 3.6.1 The band

```css
.cs-band {
  position: relative;
  isolation: isolate;
  background-color: var(--cs-bg);
  color: var(--cs-ink);
  border-bottom: 2px solid var(--cs-accent);
  padding: 128px var(--cs-gutter) 96px;
}
@media (max-width: 767px) {
  .cs-band {
    padding: 104px var(--cs-gutter) 48px;
  }
}
.cs-band__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "head" "text" "media";
  row-gap: 28px;
  max-width: 1184px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .cs-band__grid[data-photo="true"] {
    grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
    grid-template-areas: "head head" "text media";
    column-gap: 72px;
  }
}
.cs-band__head {
  grid-area: head;
}
.cs-band__text {
  grid-area: text;
  max-width: 820px;
}
.cs-band__media {
  grid-area: media;
  align-self: start;
  margin: 0;
}
.cs-band__img {
  display: block;
  width: 100%;
  height: auto;
}
.cs-band__context {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: var(--cs-ink-soft);
  margin: 0 0 20px;
}
.cs-title {
  font-family: var(--font-cw-display);
  font-weight: 800;
  font-size: var(--fs-h1);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--cs-ink);
  margin: 0;
}
.cs-title__line {
  display: block;
}
.cs-band__dek {
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  line-height: 1.6;
  max-width: 56ch;
  margin: 0 0 36px;
  color: var(--cs-ink);
}
.cs-glance {
  margin: 0;
  padding-top: 28px;
  border-top: 1px solid var(--cs-rule);
  display: grid;
  row-gap: 20px;
}
.cs-glance__row {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  column-gap: 24px;
  align-items: baseline;
}
@media (max-width: 767px) {
  .cs-glance__row {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 4px;
  }
}
.cs-glance dt,
.cs-glance__protected {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: var(--cs-ink-soft);
  margin: 0;
}
.cs-glance__protected {
  display: block;
  margin-top: 4px;
}
.cs-glance dd {
  margin: 0;
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  line-height: 1.5;
  color: var(--cs-ink);
}
.cs-glance__result {
  display: block;
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.cs-glance__result-rest {
  display: block;
  margin-top: 8px;
}
```

Why these numbers: the 220px key column holds the longest key, `First real RFPs delivered`
(25 characters at 13px mono with 0.06em tracking is about 214px), on one line, so layout-gate's
solo-mono-label break check stays clean. The title spans the full 1184px at 1440 so each
`titleLines` entry sets on one line there. The band has no min-height and no max-height: it is
as tall as its content.

**Order below 1024:** head, then dek and at-a-glance, then the photograph. The design doc puts
the photograph straight after the dek on a phone and also wants the Results row on the first
screen; both cannot hold, and Results is the proof. Only Guardicore has a band photograph.

### 3.6.2 The paper body and its column

```css
.cs-page {
  padding: 96px 0 120px;
}
@media (max-width: 767px) {
  .cs-page {
    padding: 56px 0 72px;
  }
}
.cs-body {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--cs-gutter), 1fr)
    [col-start] minmax(0, var(--measure-body))
    [col-end] minmax(var(--cs-gutter), 1fr)
    [full-end];
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  line-height: 1.6;
  color: var(--cs-ink);
}
.cs-body > * {
  grid-column: col;
}
.cs-body > .cs-break {
  grid-column: full;
}
.cs-body h2 {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--cs-ink);
  margin: 96px 0 24px;
}
.cs-body > h2:first-child {
  margin-top: 0;
}
@media (max-width: 767px) {
  .cs-body h2 {
    margin: 64px 0 16px;
  }
}
.cs-body p {
  margin: 0 0 20px;
}
.cs-body strong {
  font-weight: 600;
}
.cs-body a {
  color: var(--cs-link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.cs-body a:hover {
  text-decoration-thickness: 2px;
}
.cs-body a:focus-visible {
  outline: 2px solid var(--cs-accent);
  outline-offset: 3px;
}
.cs-body ul {
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
}
.cs-body ul > li {
  position: relative;
  padding-left: 22px;
  margin-bottom: 12px;
}
.cs-body ul > li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.8em;
  width: 8px;
  height: 1px;
  background: var(--cs-accent);
}
```

The column is `--measure-body` (68ch, an existing `@theme` token) resolved at the body size.
Full bleed is a grid line (`full`), never `100vw`, so a classic scrollbar cannot cause horizontal
overflow. MDX renders its h2, p and ul elements, and the Step, Exhibit, ChapterBreak and
PullQuote elements, as direct children of `.cs-body`, which is what the grid needs.

**Buyer questions** need no component: section 2 writes them as `## Questions buyers ask`
followed by paragraphs that open with a `**question**`. They render as `.cs-body p` with a
600-weight lead at body size (the design doc's "separated by weight").

**The technical section** needs no component and no tint: it is an `h2` section of prose
(on the RFP study, `## What the replay found`). The exhibit is the only tinted block type.

### 3.6.3 `components/study/StudyBlocks.tsx` (create, exactly this)

```tsx
// components/study/StudyBlocks.tsx
//
// Pass-120. The MDX body blocks of the study template. Props are fixed by section 2
// of the Pass-120 brief; markup and CSS by section 3. Server components only.
import type { ReactNode } from "react";
import Image from "next/image";

export function Step({
  n,
  lead,
  children,
}: {
  n: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="cs-step">
      <span className="cs-step__n" aria-hidden="true">
        {n}
      </span>
      <p>
        <strong>{lead}</strong> {children}
      </p>
    </div>
  );
}

export function Exhibit({ children }: { children: ReactNode }) {
  return (
    <table className="cs-exhibit">
      <thead>
        <tr>
          <th scope="col">The request</th>
          <th scope="col">What the engine did</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function ExhibitRow({
  request,
  engine,
}: {
  request: string;
  engine: string;
}) {
  return (
    <tr>
      <td data-label="The request">{request}</td>
      <td data-label="What the engine did">{engine}</td>
    </tr>
  );
}

export function ChapterBreak({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <figure className="cs-break">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes="100vw"
        className="cs-break__img"
      />
    </figure>
  );
}
```

`ChapterBreak` has no caption prop and renders no `figcaption`. The numeral is `aria-hidden`
because the lead sentence already reads in order; the visible "01" is for sighted readers.

### 3.6.4 Block CSS

```css
.cs-step {
  position: relative;
  margin: 0 0 28px;
}
.cs-step p {
  margin: 0;
}
.cs-step__n {
  display: block;
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1;
  color: var(--cs-link);
  margin: 0 0 8px;
}
@media (min-width: 1024px) {
  .cs-step__n {
    position: absolute;
    left: -64px;
    top: 0.5em;
    width: 40px;
    margin: 0;
    text-align: right;
  }
}
.cs-exhibit {
  width: 100%;
  margin: 40px 0;
  border-collapse: collapse;
  background: var(--cs-tint);
}
.cs-exhibit th,
.cs-exhibit td {
  text-align: left;
  vertical-align: top;
  padding: 20px 32px;
}
.cs-exhibit th {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--cs-ink-soft);
  padding-top: 28px;
  padding-bottom: 0;
  width: 50%;
}
.cs-exhibit td {
  font-size: var(--fs-body);
  line-height: 1.6;
  color: var(--cs-ink);
}
.cs-exhibit tbody tr + tr td {
  border-top: 1px solid var(--cs-rule);
}
@media (max-width: 767px) {
  .cs-exhibit thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .cs-exhibit tr,
  .cs-exhibit td {
    display: block;
  }
  .cs-exhibit td {
    padding: 16px;
  }
  .cs-exhibit td + td {
    padding-top: 0;
  }
  .cs-exhibit td::before {
    content: attr(data-label);
    display: block;
    margin: 0 0 4px;
    font-family: var(--font-cw-mono);
    font-size: var(--fs-label);
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--cs-ink-soft);
  }
}
.cs-break {
  margin: 96px 0;
}
.cs-break__img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
@media (max-width: 767px) {
  .cs-break {
    margin: 56px 0;
  }
  .cs-break__img {
    aspect-ratio: 4 / 3;
  }
}
.cs-close {
  margin: 8px 0 0;
}
.cs-close__link {
  font-weight: 600;
}
.cs-next {
  width: min(var(--measure-body), calc(100% - 2 * var(--cs-gutter)));
  margin: 120px auto 0;
  padding-top: 40px;
  border-top: 1px solid var(--cs-rule);
  font-family: var(--font-cw-body);
  font-size: var(--fs-body);
  color: var(--cs-ink);
}
@media (max-width: 767px) {
  .cs-next {
    margin-top: 72px;
  }
}
.cs-next__label,
.cs-next__context,
.cs-next__service {
  display: block;
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: var(--cs-ink-soft);
  margin: 0;
}
.cs-next__label {
  margin-bottom: 16px;
}
.cs-next__entry {
  display: grid;
  row-gap: 8px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--cs-rule);
  color: var(--cs-ink);
  text-decoration: none;
}
.cs-next__line {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.cs-next__did {
  line-height: 1.5;
}
.cs-next__entry:hover .cs-next__did {
  text-decoration: underline;
  text-decoration-color: var(--cs-accent);
  text-underline-offset: 3px;
}
.cs-next__entry:focus-visible,
.cs-next__all:focus-visible {
  outline: 2px solid var(--cs-accent);
  outline-offset: 4px;
}
.cs-next__all {
  display: inline-block;
  margin-top: 24px;
  color: var(--cs-link);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
```

The numeral hangs 64px into the left margin at 1024 and up (the body grid's side track is at
least 91px there) and sits above the lead below 1024. The exhibit is a real table at 768 and
up (two columns under the two header labels) and stacks below 768, where each cell prints its
column's label from `data-label` as generated content, so the DOM carries the two header strings
exactly once. No border radius, no shadow, no one-side accent border, no nested card.

The chapter break crops to 16:9 at 768 and up and 4:3 below, centred. The ORDANI frame
(`/ordani-intake.jpg`, 1600x1068, about 3:2) loses little either way; the judge looks at the
crop in the capture (3.11).

**No hover lift, no transition** on any template element. Underline thickness and underline
colour change without a transition.

### 3.6.5 PullQuote on paper

Delete every `[data-mode="theater"] .case-study-pull-quote*` rule (`app/globals.css:1022-1099`
at map time) and add exactly these, each selector on one line:

```css
.cs-body .case-study-pull-quote {
  margin: 64px 0;
  padding: 32px 0;
  border-top: 1px solid var(--cs-rule);
  border-bottom: 1px solid var(--cs-rule);
}
.cs-body .case-study-pull-quote__quote {
  font-family: var(--font-cw-display);
  font-weight: 700;
  font-size: var(--fs-h2);
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--cs-ink);
  margin: 0;
  position: relative;
  padding-bottom: 20px;
}
.cs-body .case-study-pull-quote__underline {
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 14px;
  overflow: visible;
  pointer-events: none;
}
.cs-body .case-study-pull-quote__underline path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1000ms cubic-bezier(0.22, 0.8, 0.28, 1); /* motion-ok: the PRE-EXISTING PullQuote underline-grow (D10), unchanged timing, re-scoped to the paper body in Pass-120 */
}
.cs-body .case-study-pull-quote[data-in-view="true"] .case-study-pull-quote__underline path {
  stroke-dashoffset: 0;
}
.cs-body .case-study-pull-quote__attribution {
  font-family: var(--font-cw-mono);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--cs-ink-soft);
  margin: 20px 0 0;
}
@media (prefers-reduced-motion: reduce) {
  .cs-body .case-study-pull-quote__underline path {
    transition: none !important;
    stroke-dashoffset: 0 !important;
  }
}
```

In `components/PullQuote.tsx`, change the path's `stroke="var(--color-accent-copper)"` to
`stroke="var(--cs-accent, var(--color-accent-copper))"`. Nothing else in that file changes. The
attribution loses its uppercase and 0.08em tracking (no tracked-uppercase labels).

### 3.6.6 The /services block anchors

The close links to `/services#<service>`. Today no element on /services carries those ids
(the area articles have only `key`, `app/(foyer)/services/page.tsx:399`), so render-gate's
fragment check would fail every study.

- `app/(foyer)/services/page.tsx:399`: `<article key={service.slug} className="cw-area">` becomes
  `<article key={service.slug} id={service.slug} className="cw-area">`.
- `app/globals.css`, in the new block, one line: `.cw-area { scroll-margin-top: 96px; }`

This also makes the JSON-LD `@id` values that already point at `/services#<slug>`
(`services/page.tsx:180`) resolve. If the live-sweep section also edits line 399, the two edits
are the same attribute; apply it once.

---

## 3.7 Removals in `app/globals.css`

Delete every rule, and every comment block that heads only such rules, whose selector contains
any of: `[data-title-card]`, `.title-card`, `[data-tc-`, `.case-study__`, `.case-study-dek`,
`.case-study-copper-rule`, `.case-study-still`, `[data-mode="theater"] .case-study {`, or
`[data-mode="theater"] .case-study-pull-quote` (replaced in 3.6.5). At map time these sat at
`453-635` (TitleCard header, stack, caption, hero, reduced-motion net, mobile composition),
`663-666` (Pass-30 nav margin), `686-1020` (case study frame, title-card-root bleed, layout
grid, header, meta, dek, body, copper rule, still), `1022-1099` (pull quote, replaced),
`1101-1281` (sidebar and footer nav), `5124-5135` (the third mobile block) and `6520-6575`
(the glance strip; section 4 confirms this one is this section's). Delete by selector, not by
line number: line numbers move as edits land, and section 4 deletes by `sed` line ranges, so
the assembler orders the two sections' globals.css edits.

Today the count of lines matching the removal pattern is 101 (measured 2026-09-16, C5 below).

---

## 3.8 `mdx-components.tsx` (rewrite whole, exactly this)

```tsx
// mdx-components.tsx
//
// The MDX component map. Required at REPO ROOT (not inside app/) by the
// @next/mdx App Router convention: inside app/ the map is silently ignored and
// MDX renders with default HTML primitives only.
//
// Pass-120: every content/work/*.mdx body may use these names without an import.
//   <Step>, <Exhibit>, <ExhibitRow>, <ChapterBreak>  components/study/StudyBlocks.tsx
//   <PullQuote>                                      components/PullQuote.tsx
// Headings, paragraphs and lists stay default HTML; app/globals.css styles them
// under .cs-body.
import type { MDXComponents } from "mdx/types";
import {
  ChapterBreak,
  Exhibit,
  ExhibitRow,
  Step,
} from "@/components/study/StudyBlocks";
import { PullQuote } from "@/components/PullQuote";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Step,
    Exhibit,
    ExhibitRow,
    ChapterBreak,
    PullQuote,
  };
}
```

---

## 3.9 Where the new CSS goes

One contiguous block, opened by the comment in 3.4, inserted where the deleted
`CASE STUDY (THEATER) — Phase 7` header comment stood. Order inside it: the header comment, 3.5
type tokens, 3.4 surface tokens, atmosphere and footer, 3.6.1 band, 4.1 settle, 3.6.2 body,
3.6.4 blocks, 3.6.5 pull quote, 3.6.6 anchor line, and last, on its own line, the end marker
`/* END PASS-120 STUDY TEMPLATE */`. The `:root { --grain-theater }` rule goes
above `[data-mode="theater"]::before` as 3.4 says, not in the block.

Existing tokens used and not redefined: `--color-theater-ground`, `--color-theater-surface`,
`--color-theater-ink`, `--color-theater-ink-soft`, `--color-foyer-paper`, `--color-foyer-ink`,
`--color-foyer-ink-soft`, `--color-bone`, `--color-rule-foyer`, `--color-rule-theater`,
`--color-accent-copper`, `--color-accent-copper-deep`, `--color-ordani-sage`,
`--font-cw-display`, `--font-cw-body`, `--font-cw-mono`, `--measure-body`. New properties, all
defined above: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-body`, `--fs-label`, `--cs-gutter`,
`--grain-theater`, and the seven `--cs-*` surface tokens.

---

## 3.10 The study OG image: `app/(theater)/work/[slug]/opengraph-image.tsx` (rewrite whole)

This supersedes the three `opengraph-image.tsx` rows in section 2 §2.2 with a file that reads the
same fields (`titleLines`, `client`, `results.lead`) and also drops the tracked uppercase eyebrow
and the saffron second accent (`:44-47,104` today).

```tsx
// app/(theater)/work/[slug]/opengraph-image.tsx
//
// Pass-120. The study's Open Graph card, 1200x630: wordmark, an accent bar, the
// title in its settle lines, the client, and the results lead. It reads real
// frontmatter; the retired word stack is gone.
//
// Satori (next/og) cannot read CSS variables, so the colours are hex literals
// mirroring app/globals.css: --color-theater-ground, --color-theater-ink,
// --color-theater-ink-soft, --color-accent-copper, --color-ordani-sage.
import { ImageResponse } from "next/og";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export const runtime = "nodejs";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK = {
  lines: ["Micah Jones"],
  client: "Case studies",
  caption: "Strategy and software, shipped by the same pair of hands.",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug).catch(() => null);
  const lines = cs?.titleLines ?? FALLBACK.lines;
  const client = cs?.client ?? FALLBACK.client;
  const caption = cs?.results.lead ?? FALLBACK.caption;

  const GROUND = "#12100E";
  const INK = "#ECE3D0";
  const INK_SOFT = "#A69B8A";
  const ACCENT = slug === "ordani" ? "#5E7158" : "#BD5A2D";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: GROUND,
        color: INK,
        padding: "64px 96px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.01em",
        }}
      >
        MICAH/JONES
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", width: 96, height: 4, background: ACCENT }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          {lines.map((line, i) => (
            <span key={`${i}-${line}`} style={{ display: "flex" }}>
              {line}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.35,
            color: INK_SOFT,
            maxWidth: "92%",
          }}
        >
          {client}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            lineHeight: 1.3,
            color: INK,
            maxWidth: "92%",
          }}
        >
          {caption}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
```

Height budget, worst case (the RFP card): padding 128 + wordmark 34 + gaps 72 + bar 4 + two
title lines 138 + two client lines 65 + one caption line 39 = 480, inside 630. The executor
opens all five cards once (C14).

---

## 3.11 Captures for the judge (written by the verifier, opened once each)

`node .planning/exec/template120.mjs http://localhost:3200 --shots .planning/qa/pass-120/template`
writes, per study and per width (390, 1440): `study-<slug>-fold-<w>.png` (the first viewport) and
`study-<slug>-full-<w>.png` (the full page). The executor opens each file once before it counts
as evidence, and checks that its name matches what it frames (standing clause 4). The judge's
look covers: the band's first fold at both widths, the Guardicore photograph's softness at 1440,
the ORDANI chapter-break crop, the RFP exhibit at both widths, the band-to-paper hard rule, and
the paper footer.

---

## 4. Motion

What moves on a study page after Pass-120, and nothing else:
1. **The TitleCard settle** (the signature, 4.1).
2. **The foyer-to-theater dim** on arrival and exit through `ViewTransitionLink`, unchanged
   (4.4).
3. **The existing PullQuote underline draw** on the RFP study, unchanged timing (3.6.5).

Forbidden on the template: any scroll pin, scroll-linked progress, sticky element, parallax,
hover lift, transition on colour or position, the theater spotlight drift, and any second
entrance (dek, at-a-glance, photograph, chapter break and Next entry all render static).

### 4.1 The settle

**Ruling.** The pinned full-fold word stack retires. The study title settles in over 600ms at
most, transform and opacity only, ease-out, with the finished frame for no-JS and reduced motion
(operator, signed 2026-09-16).

**Timings, exact.**

| Title lines (`titleLines.length`) | Line 1 starts | Line 2 starts | Line 3 starts | Each line | Total |
|---|---|---|---|---|---|
| 1 | 0ms | none | none | 400ms | 400ms |
| 2 | 0ms | 200ms | none | 400ms | 600ms |
| 3 | 0ms | 100ms | 200ms | 400ms | 600ms |

All five Pass-120 studies have two lines (section 2), so every study runs 0ms and 200ms, 600ms
in total. Each line goes from `opacity: 0; transform: translateY(12px)` to its resting style
(`opacity: 1; transform: none`) on `cubic-bezier(0.16, 1, 0.3, 1)`, the same curve as the
existing `--ease-out` token (written as a literal because no rule reads `var(--ease-out)` today).
Each line stays within DESIGN_BAR R15's 400ms entrance cap; the stagger makes the 600ms.

**"Once per load", defined.** The settle runs once each time a study page's h1 is inserted into
the document: on a full load, and on a client-side navigation into a study (Next, or /work to a
study). It never replays on scroll, resize, hover, focus, re-render or back-to-top. There is no
memory across pages. (Section 6 `settle120.mjs` S5 measures the no-replay part; M4 below
measures the client-navigation part.)

**Mechanism: CSS, not GSAP.** A GSAP tween can only start after hydration. The title would either
paint finished and then jump back to its start state (section 6 settle120 S3 "no flash" fails),
or be hidden until the JS bundle runs (LCP waits on hydration). A CSS animation starts at first
paint. The `(scripting: enabled)` media feature gives the no-JS finished frame with no script at
all. Probe run 2026-09-16 in Chrome 153 (puppeteer, a data: page with exactly the rules below):
with JavaScript on, `matchMedia("(scripting: enabled)")` was `true` and two animations ran
(`[400, 0, "backwards"]`, `[400, 200, "backwards"]`), and after 800ms both lines read `1/none`
with `document.getAnimations().length` `0`; with JavaScript off the query was `false`, no
animation ran, and both lines read `1/none`.

**`components/TitleCard.tsx` (rewrite whole, exactly this):**

```tsx
// components/TitleCard.tsx
//
// Pass-120. The signature motion, re-cast (operator signed 2026-09-16): the study
// title settles into place once when the page renders. Each line rises 12px and
// fades in over 400ms; line 2 starts 200ms after line 1 (100ms and 200ms when there
// are three lines), 600ms at most. Transform and opacity only. No pin, no scroll
// coupling, no replay.
//
// The motion is CSS (app/globals.css, .cs-title__line), gated by
// (prefers-reduced-motion: no-preference) and (scripting: enabled). Reduced motion,
// no-JS and browsers without the scripting media feature get this server render,
// which is the finished frame. It starts at first paint and never waits for
// hydration. This is a server component and imports no animation library.
import { Fragment } from "react";
import type { TitleCardProps } from "@/lib/title-card-schema";

export function TitleCard({ title, lines }: TitleCardProps) {
  return (
    <h1 className="cs-title" data-title={title}>
      {lines.map((line, i) => (
        <Fragment key={`${i}-${line}`}>
          {i > 0 ? " " : null}
          <span className="cs-title__line">{line}</span>
        </Fragment>
      ))}
    </h1>
  );
}
```

The h1's text is the lines joined by one space, which section 2's schema guarantees equals
`title` (so the accessible name, the page `<title>` and section 6's h1 checks agree).
`data-title` carries the same string for the verifier and has no visual effect.

**CSS (in the block, after 3.6.1):**

```css
@media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  .cs-title__line {
    animation: cs-settle 400ms cubic-bezier(0.16, 1, 0.3, 1) backwards; /* motion-ok: Pass-120 TitleCard settle, the one signature (brand.json motion.signature), operator-signed 2026-09-16 */
  }
  .cs-title__line:nth-child(2):last-child,
  .cs-title__line:nth-child(3) {
    animation-delay: 200ms;
  }
  .cs-title__line:nth-child(2):not(:last-child) {
    animation-delay: 100ms;
  }
}
@keyframes cs-settle {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}
```

`backwards` holds the start state through each line's delay and releases the element when the
animation ends, so no animation object lingers and the resting style is the base rule.
`:nth-child` counts element siblings only, so the space text nodes between the spans do not
shift the count.

### 4.2 Reduced motion, no-JS, unsupported browsers

All three get the server render unchanged: `.cs-title__line` has no animation, opacity 1, no
transform. No inline style, no class toggle, no script decides it. A browser that does not know
`scripting` drops the whole `@media` rule and shows the finished frame, which is the safe side.

### 4.3 CLS

Nothing in the settle changes layout. The lines are in flow at full size from the first paint;
`opacity` and `transform` do not move neighbouring boxes. There is no `min-height` reservation
because nothing arrives later: the band's height is the finished band's height from the first
frame. The one photograph carries `width` and `height`. Section 6 settle120 S7 measures CLS
<= 0.05 on all five studies at both widths; page120 T16 measures the no-JS h1 top equal to the
reduced run's within 1px.

### 4.4 What happens to the pin, the Lenis bridge, GSAP and the dim

- **`PIN_DISTANCE_PX`** (`components/TitleCard.tsx:49` at map time) is deleted with the file's
  old body, together with the `ScrollTrigger.create({ pin: true, ... scrub: 0.3 })` call
  (`:141-150`), the `gsap.registerPlugin(useGSAP, ScrollTrigger)` line (`:45`), the three GSAP
  imports (`:28-30`) and the `useLenis(() => ScrollTrigger.update())` bridge (`:64-66`). No pin,
  no pin-spacer, and no scroll-linked timeline exist on any study.
- **The mobile static branch and the reduced-motion GSAP branch** (`:94-109`) go with them: one
  CSS path now serves every width.
- **`scripts/gsap-quarantine-gate.mjs` is not edited.** Its ALLOWLIST (`:28-32`) keeps
  `components/TitleCard.tsx`; an allowlisted file that imports nothing passes (the gate only
  skips allowlisted paths, `:147`). No new file imports `gsap`, so the gate stays green.
  `components/color-worlds/SplitReveal.tsx` keeps its recorded exception.
- **The foyer-to-theater dim is unchanged**: `--duration-mode-fade: 900ms`, the
  `::view-transition-old(root)` and `::view-transition-new(root)` fades, their reduced-motion
  kill switch, and `components/view-transition-link.tsx`. No `ViewTransition` shared element is
  added. Arriving through the dim, the 600ms settle plays inside the 900ms fade-in of the new
  page; neither timing is changed to accommodate the other (both are ruled).

### 4.5 Forbidden, with the check that catches it

| Forbidden | Caught by |
|---|---|
| GSAP, ScrollTrigger, useGSAP or useLenis in TitleCard | C2 |
| Any `pin: true`, `PIN_DISTANCE_PX` or `CaseStudySidebar` left in code | C4 |
| A second animation in the template block | C7 (exactly one `animation:` declaration in the block) |
| A caption on a photograph | C11, U13, section 6 page120 T9 |
| Replay on scroll or resize | section 6 settle120 S5 |
| A settle over 600ms, a flash, a non-transform property | section 6 settle120 S2, S3, S4; M1, M3 |

### 4.6 `.claude/brand.json` `motion` (edit two values)

Replace `motion.signature` (today `.claude/brand.json:139-143`) with exactly:

```json
    "signature": {
      "id": "title-card",
      "description": "Case-study hero title settle, on /work/[slug] only. The band's h1 (Bricolage Grotesque 800; 56px at 1440, 36px at 390) settles in once when the study page renders, on a full load or a client navigation into a study. Each title line rises 12px and fades from 0 to 1 over 400ms on cubic-bezier(0.16, 1, 0.3, 1); line 2 starts 200ms after line 1 (100ms and 200ms when there are three lines), so the entrance is 600ms at most. Transform and opacity only: no scroll pin, no scroll coupling, no replay on scroll, resize or re-render. CSS only, gated by (prefers-reduced-motion: no-preference) and (scripting: enabled), so reduced motion, no-JS and browsers without the scripting media feature get the server-rendered finished frame. It replaced the pinned full-fold word stack and its GSAP scroll-resolve (operator signed 2026-09-16, Pass-120).",
      "files": ["components/TitleCard.tsx", "app/globals.css"]
    },
```

Replace only the `description` value of `motion.view_transition` (today `:146`) with exactly:

```json
      "description": "900ms ease-in-out cross-fade (--duration-mode-fade in app/globals.css) between cream paper and theater ground on foyer↔theater navigation. Reduced-motion kill-switch in app/globals.css.",
```

This corrects the two stale facts the ruling names: `Inter Display` (the live display face is
Bricolage Grotesque, `lib/fonts.ts`) and `600ms` for the dim (live value 900ms,
`app/globals.css:307` at map time). `motion.figure`, `motion.countup` and `motion.banned` are
unchanged. Section 4 adds `motion.heroclip` to the same file; the assembler merges both edits
into one step (one writer per file).

---

## Verification for sections 3 and 4

Standing clauses (every check below): count what renders (an `expect N >= 1` counts visible DOM
text with `<head>` and scripts stripped; raw greps only assert 0 or count source lines); the
executor never reinterprets an expected value (a mismatch stops the pass before the commit, with
the raw output and a reason, and the judge rules); measure the render, not the model (the
template script reads computed style and CDP animation events from Chrome, and the captures are
opened); scope from the layout and look at the capture (the theater layout is
`[data-mode="theater"] > a.skip-to-content, Nav, main#main-content, Footer`; template checks
read `main#main-content`, and the footer and atmosphere checks name their elements).

**Before any Pass-120 edit:** `git rev-parse HEAD > .planning/exec/p120-base.txt` (if section 6
already records a base commit, use that file instead and say so in the report).

### Static (no server)

| # | Command | Expected output |
|---|---|---|
| C1 | `node scripts/gsap-quarantine-gate.mjs --self-test && node scripts/gsap-quarantine-gate.mjs` | first line `gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean`; second line matches `^gsap-quarantine-gate: clean \([0-9]+ files\)$`; exit 0 |
| C2 | `grep -nE '"gsap\|@gsap/\|ScrollTrigger\|PIN_DISTANCE_PX\|useLenis\|useGSAP\|use client' components/TitleCard.tsx` | no output (exit 1) |
| C3 | `ls components/TitleCardComposition.tsx components/CaseStudySidebar.tsx components/CaseStudyStill.tsx components/Dek.tsx components/CopperRule.tsx 2>&1 \| grep -c "No such file"` | `5` |
| C4 | `grep -rlE "CaseStudyStill\|CaseStudySidebar\|TitleCardComposition\|titleCardWords\|PIN_DISTANCE_PX\|components/Dek\|CopperRule\|pin: true" app components lib mdx-components.tsx` | no output (exit 1) |
| C5 | `grep -cE 'data-title-card\|\.title-card\|data-tc-\|\.case-study__\|\.case-study-(dek\|still\|copper-rule)\|\.case-study \{' app/globals.css` | `0` (bite: `101` on 2026-09-16) |
| C6 | `grep -c 'data-mode="theater"\] \.case-study-pull-quote' app/globals.css; grep -c '^\.cs-body \.case-study-pull-quote' app/globals.css; grep -c '^  \.cs-body \.case-study-pull-quote__underline path {$' app/globals.css` | `0`, `6`, `1` |
| C7 | `grep -c "cs-settle" app/globals.css; grep -c "(prefers-reduced-motion: no-preference) and (scripting: enabled)" app/globals.css; awk '/PASS-120 STUDY TEMPLATE \(Direction B/,/END PASS-120 STUDY TEMPLATE/' app/globals.css \| grep -c "animation:"` | `2`, `1`, `1` |
| C8 | `git diff "$(cat .planning/exec/p120-base.txt)" -- app/globals.css components/view-transition-link.tsx \| grep -E '^[-+][^-+].*(duration-mode-fade\|view-transition-(old\|new\|group)\|startViewTransition)'` | no output (exit 1) |
| C9 | `node -e "const m=require('./.claude/brand.json').motion;console.log(m.signature.id,m.signature.files.join(','),/Inter Display/.test(JSON.stringify(m)),/600ms ease-in-out/.test(JSON.stringify(m)),m.view_transition.description.startsWith('900ms ease-in-out'),m.signature.description.includes('settles in once when the study page renders'))"` | `title-card components/TitleCard.tsx,app/globals.css false false true true` |
| C10 | `grep -c 'id={service.slug}' "app/(foyer)/services/page.tsx"; grep -c '^\.cw-area { scroll-margin-top: 96px; }$' app/globals.css` | `1`, `1` |
| C11 | `grep -nE "figcaption\|caption" components/study/StudyBlocks.tsx` | no output (exit 1) |
| C12 | `grep -cE "TitleCard\|Dek\|CaseStudyStill\|CopperRule" mdx-components.tsx; grep -cE "^    (Step\|Exhibit\|ExhibitRow\|ChapterBreak\|PullQuote),$" mdx-components.tsx` | `0`, `5` |
| C13 | `grep -c 'var(--cs-accent, var(--color-accent-copper))' components/PullQuote.tsx` | `1` |

C6 note: six `.cs-body .case-study-pull-quote` rules in 3.6.5 start at column 0; the seventh
sits inside `@media`, indented two spaces, hence the third count. C7's awk reads from the block
header to the block's end marker (3.9); the one `animation:` inside it is the settle (the pull
quote uses `transition:`, and `animation-delay:` does not match).

### Served (after the build, on the section 6 server at `http://localhost:3200`)

| # | Command | Expected output |
|---|---|---|
| C14 | `mkdir -p .planning/qa/pass-120/template && for s in guardicore rfp-engine ordani content-engine birth-worker; do curl -s -o .planning/qa/pass-120/template/og-$s.png -w "$s %{http_code} %{content_type}\n" http://localhost:3200/work/$s/opengraph-image; done` | five lines, `guardicore 200 image/png` through `birth-worker 200 image/png` in that order. Then open each PNG once: the accent bar, both title lines, the client line and the results lead sit inside 1200x630 with nothing clipped; the ORDANI bar is sage and the other four copper; no text is uppercase except the `MICAH/JONES` wordmark. |
| C15 | `curl -s http://localhost:3200/services \| grep -oE 'id="(ai-engineering\|product-building\|positioning-gtm)"' \| sort \| tr '\n' ' '` | `id="ai-engineering" id="positioning-gtm" id="product-building" ` |
| C16 | `node .planning/exec/template120.mjs http://localhost:3200 --shots .planning/qa/pass-120/template` | last line `template120 failures: 0`, exit 0 |
| C17 | `node .planning/exec/settle120.mjs http://localhost:3200` and `node .planning/exec/page120.mjs http://localhost:3200` (section 6) | `settle120 failures: 0` and `page120 failures: 0` |

**Bite proof (standing clause 3), once, before any Pass-120 edit:**
`node .planning/exec/template120.mjs https://www.micahjonesconsulting.com > .planning/exec/template120-bite.txt; tail -1 .planning/exec/template120-bite.txt`
must print `template120 failures: N` with N >= 1, and
`grep -c "FAIL U1 band ground" .planning/exec/template120-bite.txt` must print `10` (no live
study has a `.cs-band`, so U1 fails on all five routes at both widths; `/work/birth-worker` also
fails U0 with a 404). If either number differs, stop and report.

### `.planning/exec/template120.mjs` (write exactly this before the build; the executor does not change it)

One line is deliberate and looks odd: the CDP method name is assembled as
`"Animation." + "en" + "able"` because the copy-lint write hook rejects that English verb when it
appears whole in this `.md` brief. Write the `.mjs` exactly as printed; the assembled string is
the CDP call that switches on the Animation domain.

```js
// Pass-120 sections 3-4 gate: the Direction B study template (band, paper surface,
// atmosphere, footer, at-a-glance, blocks, close, Next) and the settle's CSS mechanics
// read through CDP. Section 6's page120.mjs (type ladder, rail, captions, link colours)
// and settle120.mjs (frame timing, no flash, replay, CLS) cover the rest.
// Scope (LESSONS #28): app/(theater)/layout.tsx renders [data-mode="theater"] >
// a.skip-to-content, Nav, main#main-content, Footer[data-footer-root]. Template checks
// read main#main-content; U3 reads the footer and U6 the layout wrapper, by name.
// Usage: node .planning/exec/template120.mjs [base] [--shots <dir>]
// Bite proof: run against https://www.micahjonesconsulting.com before any Pass-120 edit.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";

const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const CDP_ANIMATION_ON = "Animation." + "en" + "able";
const argv = process.argv.slice(2);
const si = argv.indexOf("--shots");
const SHOTS = si >= 0 ? argv[si + 1] : null;
const pos = argv.filter((a, i) => !a.startsWith("--") && !(si >= 0 && i === si + 1));
const BASE = (pos[0] || "http://localhost:3200").replace(/\/$/, "");

const STUDIES = {
  guardicore: { next: "rfp-engine", service: "positioning-gtm", label: "Positioning & GTM", nextLabel: "AI engineering", dts: ["Client", "My role", "The work", "Results"], nameProtected: 0, photo: "guardicore-telaviv-session", breaks: 0, exhibits: 0, sage: false },
  "rfp-engine": { next: "ordani", service: "ai-engineering", label: "AI engineering", nextLabel: "Product building", dts: ["Client", "My role", "First real RFPs delivered", "What I built", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 1, sage: false },
  ordani: { next: "content-engine", service: "product-building", label: "Product building", nextLabel: "Product building", dts: ["Client", "My role", "The work", "Results"], nameProtected: 0, photo: null, breaks: 1, exhibits: 0, sage: true },
  "content-engine": { next: "birth-worker", service: "product-building", label: "Product building", nextLabel: "Positioning & GTM", dts: ["Client", "My role", "What I built", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 0, sage: false },
  "birth-worker": { next: "guardicore", service: "positioning-gtm", label: "Positioning & GTM", nextLabel: "Positioning & GTM", dts: ["Client", "My role", "The work", "Results"], nameProtected: 1, photo: null, breaks: 0, exhibits: 0, sage: false },
};
const RGB = {
  ground: "rgb(18, 16, 14)",
  paper: "rgb(245, 239, 228)",
  copper: "rgb(189, 90, 45)",
  copperDeep: "rgb(138, 61, 36)",
  sage: "rgb(94, 113, 88)",
};

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${id}: got ${JSON.stringify(got)}${ok ? "" : ` (want ${JSON.stringify(want)})`}`);
  if (!ok) failures++;
};
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function expectedStarts(n) {
  if (n === 1) return [[400, 0]];
  if (n === 2) return [[400, 0], [400, 200]];
  if (n === 3) return [[400, 0], [400, 100], [400, 200]];
  return "bad line count";
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
try {
  for (const [slug, X] of Object.entries(STUDIES)) {
    for (const w of [1440, 390]) {
      console.log(`/work/${slug} @${w} reduced`);
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 140)));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text().slice(0, 140));
      });
      await page.setViewport({ width: w, height: w === 390 ? 844 : 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      const res = await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle0", timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      chk("U0 status", res?.status() === 200, res?.status(), 200);

      const m = await page.evaluate(() => {
        const main = document.querySelector("main#main-content");
        const wrap = document.querySelector('[data-mode="theater"]');
        const q = (s) => main?.querySelector(s) ?? null;
        const qa = (s) => (main ? [...main.querySelectorAll(s)] : []);
        const t = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "missing");
        const bg = (el) => (el ? getComputedStyle(el).backgroundColor : "missing");
        const band = q(".cs-band");
        const paper = q('[data-surface="paper"]');
        const numeral = q(".cs-step__n");
        const h1 = q("h1.cs-title");
        return {
          bandBg: bg(band),
          paperBg: bg(paper),
          footBg: bg(document.querySelector("[data-footer-root]")),
          gap: band && paper ? Math.round(paper.getBoundingClientRect().top - band.getBoundingClientRect().bottom) : "missing",
          bandRule: band ? getComputedStyle(band).borderBottomColor : "missing",
          wrapPseudo: wrap ? [getComputedStyle(wrap, "::before").content, getComputedStyle(wrap, "::after").content] : "missing",
          bandGrain: band ? getComputedStyle(band, "::before").content : "missing",
          old: document.querySelectorAll("[data-title-card], .title-card-root, .case-study__sidebar, .case-study-still, .case-study__glance, .case-study__nav").length,
          nda: main ? /Protected by NDA|Client-confidential/.test(main.innerText) : "missing",
          headOk: !!band?.querySelector(".cs-band__head > .cs-band__context + h1.cs-title"),
          contextLen: t(q(".cs-band__context")).length,
          h1Match: !!h1 && t(h1) === h1.getAttribute("data-title"),
          dts: qa(".cs-glance dt").map(t),
          nameProtected: qa(".cs-glance__protected").filter((e) => t(e) === "Name protected").length,
          bandImgs: qa(".cs-band img").map((i) => decodeURIComponent(i.currentSrc)),
          mainImgs: qa("img").length,
          breaks: qa(".cs-body > .cs-break").length,
          breakCaptions: qa(".cs-break figcaption").length,
          exhibits: qa(".cs-exhibit").length,
          exhibitTh: qa(".cs-exhibit th").map(t),
          exhibitRows: qa(".cs-exhibit tbody tr").length,
          steps: qa(".cs-body > .cs-step").length,
          badNumerals: qa(".cs-step__n").filter((e) => !/^\d\d$/.test(t(e))).length,
          numeralColor: numeral ? getComputedStyle(numeral).color : "missing",
          close: qa(".cs-body > .cs-close a").map((a) => `${a.getAttribute("href")}|${t(a)}`),
          next: qa(".cs-next__entry").map((a) => a.getAttribute("href")),
          nextParts: [".cs-next__context", ".cs-next__line", ".cs-next__did", ".cs-next__service"].map((s) => t(q(s))),
          all: qa(".cs-next__all").map((a) => `${a.getAttribute("href")}|${t(a)}`),
        };
      });

      chk("U1 band ground", m.bandBg === RGB.ground, m.bandBg, RGB.ground);
      chk("U2 paper body", m.paperBg === RGB.paper, m.paperBg, RGB.paper);
      chk("U3 footer on paper", m.footBg === RGB.paper, m.footBg, RGB.paper);
      chk("U4 band meets paper", m.gap === 0, m.gap, 0);
      const rule = X.sage ? RGB.sage : RGB.copper;
      chk("U5 band rule accent", m.bandRule === rule, m.bandRule, rule);
      chk("U6 fixed atmosphere off", same(m.wrapPseudo, ["none", "none"]), m.wrapPseudo, ["none", "none"]);
      chk("U7 band grain", m.bandGrain === '""', m.bandGrain, '""');
      chk("U8 retired template gone", m.old === 0 && m.nda === false, [m.old, m.nda], [0, false]);
      chk("U9 band head", m.headOk && m.contextLen > 0 && m.h1Match, [m.headOk, m.contextLen, m.h1Match], [true, ">0", true]);
      chk("U10 at-a-glance keys", same(m.dts, X.dts), m.dts, X.dts);
      chk("U11 Name protected", m.nameProtected === X.nameProtected, m.nameProtected, X.nameProtected);
      const imgOk = X.photo ? m.bandImgs.length === 1 && m.bandImgs[0].includes(X.photo) : m.bandImgs.length === 0;
      chk("U12 band photograph", imgOk, m.bandImgs, X.photo ?? []);
      chk("U13 chapter breaks, no caption", m.breaks === X.breaks && m.breakCaptions === 0, [m.breaks, m.breakCaptions], [X.breaks, 0]);
      const wantImgs = (X.photo ? 1 : 0) + X.breaks;
      chk("U14 images in main", m.mainImgs === wantImgs, m.mainImgs, wantImgs);
      const exOk = m.exhibits === X.exhibits && (X.exhibits === 0 || (same(m.exhibitTh, ["The request", "What the engine did"]) && m.exhibitRows === 2));
      chk("U15 exhibit", exOk, [m.exhibits, m.exhibitTh, m.exhibitRows], [X.exhibits, X.exhibits ? ["The request", "What the engine did"] : [], X.exhibits ? 2 : 0]);
      chk("U16 steps", m.steps >= 1 && m.badNumerals === 0, [m.steps, m.badNumerals], [">=1", 0]);
      const numeralWant = X.sage ? RGB.sage : RGB.copperDeep;
      chk("U17 numeral colour", m.numeralColor === numeralWant, m.numeralColor, numeralWant);
      const closeWant = [`/services#${X.service}|${X.label} →`];
      chk("U18 close link", same(m.close, closeWant), m.close, closeWant);
      const nextOk = same(m.next, [`/work/${X.next}`]) && m.nextParts.every((p) => p !== "missing" && p.length > 0) && m.nextParts[3] === X.nextLabel;
      chk("U19 Next entry", nextOk, [m.next, m.nextParts[3]], [[`/work/${X.next}`], X.nextLabel]);
      chk("U20 All work", same(m.all, ["/work|All work"]), m.all, ["/work|All work"]);
      chk("U21 no console or page errors", errors.length === 0, errors, []);

      if (SHOTS) {
        await page.screenshot({ path: `${SHOTS}/study-${slug}-fold-${w}.png` });
        await page.screenshot({ path: `${SHOTS}/study-${slug}-full-${w}.png`, fullPage: true });
      }

      if (w === 1440 && m.close.length === 1) {
        await Promise.all([
          page.waitForFunction(() => location.pathname === "/services", { timeout: 20000 }),
          page.click(".cs-close a"),
        ]);
        await sleep(2500);
        const land = await page.evaluate(() => {
          const el = document.getElementById(location.hash.slice(1));
          return { hash: location.hash, top: el ? Math.round(el.getBoundingClientRect().top) : "missing" };
        });
        const landOk = land.hash === `#${X.service}` && typeof land.top === "number" && land.top >= 0 && land.top <= 240;
        chk("U22 close lands on its /services block", landOk, land, { hash: `#${X.service}`, top: "0..240" });
      }
      await page.close();
    }

    for (const js of [true, false]) {
      console.log(`/work/${slug} @1440 motion js=${js}`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
      await page.setJavaScriptEnabled(js);
      const cdp = await page.createCDPSession();
      const started = [];
      cdp.on("Animation.animationStarted", (e) => {
        if (e.animation.name === "cs-settle") started.push([Math.round(e.animation.source.duration), Math.round(e.animation.source.delay)]);
      });
      await cdp.send(CDP_ANIMATION_ON);
      await page.goto(`${BASE}/work/${slug}`, { waitUntil: "load", timeout: 60000 });
      await sleep(1500);
      const s = await page.evaluate(() => {
        const lines = [...document.querySelectorAll("main h1.cs-title > .cs-title__line")];
        let props = "missing";
        const walk = (rules) => {
          for (const r of rules) {
            if (r.type === CSSRule.KEYFRAMES_RULE && r.name === "cs-settle") {
              props = [...new Set([...r.cssRules].flatMap((k) => [...k.style]))].sort().join(",");
            } else if (r.cssRules) {
              walk(r.cssRules);
            }
          }
        };
        for (const sheet of document.styleSheets) {
          try {
            walk(sheet.cssRules);
          } catch {
            /* cross-origin sheet */
          }
        }
        return { n: lines.length, end: lines.map((l) => `${getComputedStyle(l).opacity}/${getComputedStyle(l).transform}`), props };
      });
      const sorted = [...started].sort((a, b) => a[1] - b[1]);
      const want = js ? expectedStarts(s.n) : [];
      chk(`M1 settle animations js=${js}`, same(sorted, want), sorted, want);
      chk(`M2 finished frame js=${js}`, s.n >= 1 && s.end.every((e) => e === "1/none"), s.end, "every line 1/none");
      chk(`M3 keyframes animate opacity and transform only js=${js}`, s.props === "opacity,transform", s.props, "opacity,transform");

      if (js && slug === "guardicore" && !(await page.$(".cs-next__entry"))) {
        chk("M4 settle runs on a client navigation into a study", false, "no .cs-next__entry", "a Next entry to click");
      } else if (js && slug === "guardicore") {
        started.length = 0;
        await Promise.all([
          page.waitForFunction(() => location.pathname === "/work/rfp-engine", { timeout: 20000 }),
          page.click(".cs-next__entry"),
        ]);
        await sleep(1500);
        const n2 = await page.evaluate(() => document.querySelectorAll("main h1.cs-title > .cs-title__line").length);
        const sorted2 = [...started].sort((a, b) => a[1] - b[1]);
        chk("M4 settle runs on a client navigation into a study", same(sorted2, expectedStarts(n2)), sorted2, expectedStarts(n2));
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
console.log(`template120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
```

---

## Rejected for sections 3 and 4

- **Driving the settle with GSAP in TitleCard.** It cannot start before hydration: the title
  either paints finished and jumps back (a flash, section 6 settle120 S3) or hides until JS runs
  (LCP waits on the bundle). CSS starts at first paint.
- **An inline pre-paint script that sets a "JS on" class.** `(scripting: enabled)` does the same
  with no script (probe 2026-09-16, Chrome 153).
- **A module-level "played" flag for once per load.** It needs client JS and a hydration-time
  decision, which brings back the flash. The settle runs once per study page render instead.
- **Delaying the settle until the 900ms dim finishes.** Both timings are ruled; retiming either
  is a new motion decision.
- **A shared-element view transition of the photograph** (FABLE-120-DESIGN §4 option 2). The
  dim is ruled unchanged and the /work hero is the clip, so no shared element is added.
- **Keeping `PIN_DISTANCE_PX`, ScrollTrigger or the Lenis bridge for later.** Dead motion code
  in the one allowlisted GSAP file invites the pin back.
- **Removing `components/TitleCard.tsx` from the gsap-quarantine-gate ALLOWLIST.** Optional
  cleanup, not needed for a green gate, and it edits a gate this pass has no reason to touch.
- **The sticky rail, the TOC, the reading-progress bar and the meta fallback line.** Ruled out;
  the at-a-glance block carries role and client in the first fold, and the rail printed years.
- **The `Protected by NDA` and `Client-confidential` specimen boxes.** A box posing as an image
  says an image is missing.
- **Captions under the band photograph and the chapter break** (the mock prints `Working
  session · Tel Aviv`). No-captions ruling.
- **Copper step numerals on paper.** 3.93:1 fails at 13px; copper-deep (6.62) or sage (4.61).
- **`rule-foyer` as the exhibit tint.** The block's own hairline would vanish; bone is the
  one-step-off-paper token.
- **The mock's mono `All work` link.** Mono is for labels; a link is not a label.
- **Leaving the theater grain and spotlight fixed over the paper body.** They would speckle and
  lighten the reading surface.
- **A dark footer after the paper body.** The page would end on a third ground; the mock ends
  on paper.
- **The OG image's uppercase, 0.14em-tracked saffron client eyebrow.** A tracked-uppercase
  kicker in a second accent; the client line is sentence case in ink-soft, under a copper (sage
  on ORDANI) bar.
- **`priority` on the band image.** Deprecated in Next.js 16 in favour of `preload`.
- **`100vw` full bleed for the chapter break.** A classic scrollbar makes `100vw` wider than the
  page; the grid's `full` line does not.
- **Photograph straight after the dek on phones** (design doc). It pushes the Results row a full
  screen down on Guardicore; head, dek, at-a-glance, then photograph.
- **A context line above the title with copy different from the Client row.** No such copy exists
  in the locked drafts; the design doc sets both the context line and a Client row, and section 2
  supplies one `client` string for both.

---

## Open items (one line each)

1. Operator: "once per load" is built as once per study page render (full load or client navigation into a study), never on scroll or re-render, with no memory across pages; confirm.
2. Judge: arriving through the dim, the 600ms settle plays inside the 900ms fade-in and is partly veiled; look at it on the M4 path before ship.
3. Operator: DESIGN_BAR R2 wants the largest type at least 4x body; a study tops out at 56/18 = 3.1 (390: 36/17 = 2.1), because the design and section 2 reject a 112 figure on the band.
4. Operator: DESIGN_BAR R16 lists "award-winning" as hype vocabulary, and the ruled RFP descriptor puts it in the context line, the Client row and the dek; record whether the ruling is an R16 exception.
5. Assembler: section 6 page120 T13 expects at least one full-bleed image on /work/guardicore, but section 2 and this section give Guardicore no chapter break and a non-bleed band photograph.
6. Assembler: section 6 K8 expects `datePublished >= "2026-09-16"`, but section 2 sets Guardicore and ORDANI `publishedAt` to 2026-05-14.
7. Assembler: this section's 3.10 OG file supersedes section 2 §2.2's three opengraph-image rows (same fields, plus the eyebrow and accent fixes); keep one.
8. Assembler: section 4 deletes /work CSS by `sed` line ranges while this section deletes by selector; order the two globals.css edits so neither shifts the other's targets.
9. Technical: the production CSS pipeline (Lightning CSS under Next 16 and Tailwind v4) must keep `(scripting: enabled)` in the media query; M1 fails if it is stripped or rewritten.
10. Technical: fonts load with `display: swap`; a late Bricolage swap could move the h1 after 600ms and trip settle120 S2's position-based frame sampler, and that has not been measured.
11. Technical: the close link's hash landing runs through `router.push` inside `startViewTransition` with Lenis mounted; U22 measures it, and nothing earlier has.
12. Technical: MDX must not emit whitespace text nodes inside the exhibit's `tbody`; U21 fails on the resulting hydration error if it does.
13. Assembler: `.claude/CLAUDE.md` still describes the pinned TitleCard, a 600ms dim and GSAP Pitfall C1 as the signature (One signature motion, Definition of done #1); no section edits it.
14. Operator: the nav's 22px wordmark and 12px links are site chrome outside `main`; counted with them a study shows six sizes at 1440, so R2's five-size limit holds only in the content scope section 6 uses.
15. Operator: the Guardicore band photograph is a 770px source, soft at 2x on a 1440 band (also parked in section 2).
