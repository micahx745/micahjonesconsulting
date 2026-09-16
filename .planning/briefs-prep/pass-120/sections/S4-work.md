## 3b. The /work index, the hero clip and redirects

Worktree `C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. Every command runs
from the worktree root in Git Bash unless it says PowerShell. Every file:line below comes from
`.planning/briefs-prep/pass-120/work-index.md`, `study-template.md`, `gates.md`, or my own read of
the worktree on 2026-09-16.

**What this section writes, and what it only reads.**

| This section writes | It reads, and never retypes |
|---|---|
| `app/(foyer)/work/page.tsx` (whole file) | Every visible string on /work except the one kept cross-link line (3b.1): the entry strings from each study's `entry` frontmatter and `SERVICE_LABELS` (section 2, §2.1, §2.3, §2.5), `METHOD_LINE` and `RECORD` from `content/work-page.ts` (section 2, §2.4, §2.5a) |
| `components/color-worlds/WorkHeroClip.tsx` (new) | `isPublished` and `PublishedCaseStudyMeta` from `lib/case-studies.ts` (section 2, §2.2) |
| `app/globals.css`: delete `.cw-wk*` and `.cw-lot*`, add `.cw-wx*` | The /work metadata description string (section 5, row 29) |
| `next.config.ts`: two redirects | The deletion of `content/work/postmates.mdx` and `neuton.mdx` (section 2, §2.3) |
| `public/media/work-hero-720.mp4`, `work-hero-720.webm`, `work-hero-poster-960.avif` (new) | `llms.txt` (section 2 §2.7 and section 5 rows 23-28) |
| `.claude/brand.json`: a new `motion.heroclip` key only (the `motion.signature` rewrite belongs to the TitleCard section) | Every gate, script and ship condition in section 6 |
| `.planning/exec/clipnav120.mjs` (new verifier, 3b.12) | |

**Where the inputs disagree, and what this section follows.**
- `.planning/reviews/FABLE-120-DESIGN.md` §4 rules that the generated clip "does not ship on the
  site in any form". The operator overrode that on 2026-09-16 ("Use the AI clip anyway"), recorded
  as the R12 exception in `docs/DESIGN_BAR.md:201`. The repo file wins: the clip ships, under the
  exception's conditions.
- FABLE-120-DESIGN §2 and §4 option 1 give the photograph "its real caption". The CAPTIONS ruling
  (2026-09-16) and `DESIGN_BAR.md:201` say no caption and no disclosure. No caption ships. The mock
  `.planning/mock/pass-120/b/work.html:398` caption `Working session · Tel Aviv · animated from a
  photograph` is rejected.
- FABLE-120-DESIGN §2 (index entries) puts the context label in mono. Its own shared rule in the
  same section limits JetBrains Mono to "the at-a-glance keys, the step numerals, the record block's
  role and year columns, and the `Name protected` label", and section 6 T6 fails any mono text of 7
  or more words. The RFP context label is 13 words. So the context label is Hanken Grotesk at the
  label size, and only the service label and the record role and outcome are mono.
- The mock ends the method line "...sells it." and drops event years and client descriptors. The
  ledger (LESSONS #3, THE /WORK METHOD LINE) and the rulings win; section 2 already carries the
  corrected strings.
- `work-index.md` §7 calls the redirects "301". `permanent: true` answers **308**
  (`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md:30`).
  Every check in this section asserts 308.
- `.claude/CLAUDE.md` "Two modes" says foyer pages carry `data-mode="foyer"` on cream paper
  `#F5EFE4`. Live code wins: `app/(foyer)/layout.tsx:35` stamps `data-mode="cw"`, and every /work
  colour comes from the Color Worlds variables. "Paper" on /work is the `bone` world
  (`#ECE3D0` ground, `#2A1F18` ink, `components/color-worlds/OpeningWorld.tsx:40`).

---

### 3b.1 Copy on /work

No string is typed into `page.tsx` except the kept cross-link line below. Everything else renders
from data another section fixes.

| Where | Source | Renders as |
|---|---|---|
| Lead context, figure, line, did, service | `guardicore.mdx` `entry.context`, `entry.figure`, `entry.line`, `entry.did`, `SERVICE_LABELS["positioning-gtm"]` | Section 2 §2.5 row 1 |
| Method line (the `h2` of the studies section) | `METHOD_LINE` | `I find what your buyers are actually paying for, then build the system that sells exactly that.` |
| Entries 2 to 5 | each study's `entry.context`, `entry.line`, `entry.did`, `SERVICE_LABELS[service]`, in `order` | Section 2 §2.5 rows 2-5 |
| Record block | `RECORD.heading`, `RECORD.line`, `RECORD.rows[]` | Section 2 §2.4 |
| Poster accessible name (the `aria-label` on the media `figure`) | `HERO_ALT` constant in `page.tsx`, the alt this frame already carries at `app/(foyer)/work/page.tsx:116` and `app/(foyer)/about/page.tsx:137` | `A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses.` |
| Cross-link line, below the record block and outside `#record` | kept verbatim from `app/(foyer)/work/page.tsx:178-187` | `The next entry in this record could be yours. Engagements scoped on a call; packages at $500, $2,500 and $7,500.` (`Engagements` links to `/services`, `packages` links to `/packages`) |
| `metadata.title` and `openGraph.title` | unchanged from `app/(foyer)/work/page.tsx:50,55` | `Work: pipeline, products, and exits` |
| `metadata.description` and `openGraph.description` | section 5, row 29 | `Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.` |

Removed from /work and not replaced: `The rest of the record` (`page.tsx:134`), both
`Read the case study →` links (`:109`, `:155`), the `01 of 06` provenance line and the lead's
`{lead.year}` (`:99-107`), every entry number (`:142-144`), the list meta with `{s.year}`
(`:149-153`), the stat trios (`:158-167`), and the figcaption `Working session · Tel Aviv · 2018-2021`
(`:122`).

---

### 3b.2 File list, in the order to make the edits

1. `public/media/` (new directory): the three transcodes from 3b.7. Nothing else goes in it.
2. `components/color-worlds/WorkHeroClip.tsx`: create with 3b.4.
3. `app/(foyer)/work/page.tsx`: replace the whole file with 3b.3.
4. `app/globals.css`: the deletions and the insertion in 3b.5.
5. `next.config.ts`: the insertion in 3b.8.
6. `.claude/brand.json`: the `motion.heroclip` key in 3b.11.
7. `.planning/exec/clipnav120.mjs`: create with 3b.12.

`components/color-worlds/OpeningWorld.tsx`, `components/color-worlds/WorldSwitcher.tsx`,
`components/color-worlds/ExitRecord.tsx`, `app/sitemap.ts`, `app/robots.ts` and
`app/(foyer)/work/opengraph-image.tsx` are not edited (3b.6, 3b.9, 3b.10).

These edits depend on section 2's schema and `content/work-page.ts` existing. Make them after
section 2's content commit, or in the same commit; never before, or `tsc` fails on `entry`,
`isPublished`, `SERVICE_LABELS` and `RECORD`.

---

### 3b.3 `app/(foyer)/work/page.tsx`: replace the whole file with exactly this

```tsx
// app/(foyer)/work/page.tsx
//
// /work, Pass-120 Direction B (.planning/reviews/FABLE-120-DESIGN.md section 2).
// Paper from top to bottom, the bone world: the lead study at hero scale beside
// the Tel Aviv clip, the method line, four entries of four data points each
// (DESIGN_BAR R11), and the record block at #record, where /work/postmates and
// /work/neuton land (next.config.ts, 308).
//
// Rulings: no year beside a role (LESSONS #3, 2026-09-15); no caption on the
// photograph or the clip (operator 2026-09-16); the clip is the DESIGN_BAR R12
// exception of 2026-09-16 (brand.json motion.heroclip). Every visible string
// renders from content: the entry frontmatter of each study, SERVICE_LABELS,
// and content/work-page.ts. The one kept literal is the cross-link line.
//
// Replaces the Pass-61 catalogue lot and the Pass-58 study list.
import type { Metadata } from "next";
import { preload } from "react-dom";
import { getAllCaseStudies, isPublished } from "@/lib/case-studies";
import { SERVICE_LABELS } from "@/lib/case-study-schema";
import { METHOD_LINE, RECORD } from "@/content/work-page";
import { OpeningWorld } from "@/components/color-worlds/OpeningWorld";
import { PageFooter } from "@/components/color-worlds/PageFooter";
import { WorkHeroClip } from "@/components/color-worlds/WorkHeroClip";
import { ViewTransitionLink } from "@/components/view-transition-link";

const HERO_POSTER = "/media/work-hero-poster-960.avif";
const HERO_ALT =
  "A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses.";

export const metadata: Metadata = {
  // Short title; root template appends " — Micah Jones" once.
  title: "Work: pipeline, products, and exits",
  description:
    "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.",
  alternates: { canonical: "https://www.micahjonesconsulting.com/work" },
  openGraph: {
    title: "Work: pipeline, products, and exits",
    description:
      "Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.",
    type: "website",
    url: "https://www.micahjonesconsulting.com/work",
  },
};

export default async function WorkIndexPage() {
  const studies = (await getAllCaseStudies()).filter(isPublished);
  const [lead, ...rest] = studies;

  // The poster is the LCP candidate at both widths. Preload it from the head so
  // it starts before the body parses; the video itself loads nothing until the
  // clip starts (preload="none" in WorkHeroClip).
  preload(HERO_POSTER, {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
  });

  return (
    <>
      <OpeningWorld name="bone" />

      {lead ? (
        <section
          className="cw-wx cw-wx-lead"
          data-section
          data-world="bone"
          aria-labelledby="cw-wx-lead-title"
        >
          <ViewTransitionLink
            href={`/work/${lead.slug}`}
            className="cw-wx-lead__link"
          >
            <p className="cw-wx-ctx cw-wx-lead__ctx">{lead.entry.context}</p>
            <h1 id="cw-wx-lead-title" className="cw-wx-lead__h1">
              <span className="cw-wx-lead__fig">{lead.entry.figure}</span>{" "}
              <span className="cw-wx-lead__line">{lead.entry.line}</span>
            </h1>
            <p className="cw-wx-lead__did">{lead.entry.did}</p>
            <p className="cw-wx-label cw-wx-lead__svc">
              {SERVICE_LABELS[lead.service]}
            </p>
          </ViewTransitionLink>

          <figure className="cw-wx-lead__media" aria-label={HERO_ALT}>
            <WorkHeroClip poster={HERO_POSTER} />
          </figure>
        </section>
      ) : null}

      <section
        className="cw-wx cw-wx-studies"
        data-section
        data-world="bone"
        aria-labelledby="cw-wx-method"
      >
        <h2 id="cw-wx-method" className="cw-wx-method">
          {METHOD_LINE}
        </h2>
        <ol className="cw-wx-list">
          {rest.map((s) => (
            <li key={s.slug} className="cw-wx-list__item">
              <ViewTransitionLink href={`/work/${s.slug}`} className="cw-wx-entry">
                <div className="cw-wx-entry__a">
                  <p className="cw-wx-ctx cw-wx-entry__ctx">{s.entry.context}</p>
                  <h3 className="cw-wx-entry__line">{s.entry.line}</h3>
                </div>
                <div className="cw-wx-entry__b">
                  <p className="cw-wx-entry__did">{s.entry.did}</p>
                  <p className="cw-wx-label cw-wx-entry__svc">
                    {SERVICE_LABELS[s.service]}
                  </p>
                </div>
              </ViewTransitionLink>
            </li>
          ))}
        </ol>
      </section>

      <section
        id={RECORD.id}
        className="cw-wx cw-wx-rec"
        data-section
        data-world="bone"
        aria-labelledby="cw-wx-rec-title"
      >
        <h2 id="cw-wx-rec-title" className="cw-wx-rec__h">
          {RECORD.heading}
        </h2>
        <p className="cw-wx-rec__line">{RECORD.line}</p>
        <ol className="cw-wx-rec__list">
          {RECORD.rows.map((row) => (
            <li key={row.company} className="cw-wx-rec__row">
              <p className="cw-wx-rec__co">
                {row.href ? (
                  <ViewTransitionLink href={row.href}>{row.company}</ViewTransitionLink>
                ) : (
                  row.company
                )}
              </p>
              <p className="cw-wx-rec__meta">
                <span className="cw-wx-label cw-wx-rec__role">{row.role}</span>
                <span className="cw-wx-label cw-wx-rec__what">{row.outcome}</span>
              </p>
              <p className="cw-wx-rec__desc">{row.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="cw-wx cw-wx-close">
        {/* Review 2026-09-02 #11, kept: the page still closes with one line
            asking for the work. It sits outside #record (the record block
            carries no CTA). No entity after either </a> (LESSONS #6). */}
        <p className="cw-wx-cross">
          The next entry in this record could be yours.{" "}
          <a href="/services" className="cw-wx-link">
            Engagements
          </a>{" "}
          scoped on a call;{" "}
          <a href="/packages" className="cw-wx-link">
            packages
          </a>{" "}
          at $500, $2,500 and $7,500.
        </p>
        <PageFooter />
      </div>
    </>
  );
}
```

Notes the executor does not reinterpret:
- `preload` from `react-dom` is React 19's resource API, callable from a Server Component; it
  emits `<link rel="preload" as="image" ...>` into the head. Next 16's own `<Image preload>` is
  not used because the poster is a `<video poster>`, not an `<img>`
  (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md:265-289`).
- The `h1` holds the figure and its line as one heading, the Pass-67 rule this file carried at
  `:85-90` (a figure alone reads as a brag). Its accessible text is `$14M in revenue, sourced and
  closed, at a $1.2M average enterprise deal.`
- Entries and the Guardicore record link use `ViewTransitionLink`
  (`components/view-transition-link.tsx:35-70`), because the foyer-to-theater dim only runs
  through it, and Direction B lands the visitor on the study's dark band through that dim. The two
  cross-link anchors stay plain `<a>` (foyer to foyer, as today).
- No `year`, `role`, `stats`, `indexLine`, `feature` or `total` read survives. `lead` is typed
  `PublishedCaseStudyMeta`, so `lead.entry.figure` is `string | undefined`; section 2's
  `superRefine` makes it present on `order: 1`.

---

### 3b.4 `components/color-worlds/WorkHeroClip.tsx`: create with exactly this

```tsx
// components/color-worlds/WorkHeroClip.tsx
//
// Pass-120: the /work hero clip. DESIGN_BAR R12 exception (operator 2026-09-16,
// "Use the AI clip anyway"), brand.json motion.heroclip. Not a precedent.
//
// The server renders the <video> with its poster, which is frame 0 of the clip
// (the photograph as it went in, no generated motion). That poster is the whole
// render without JavaScript, under prefers-reduced-motion, with Save-Data on,
// and on a 2g connection: in those cases play() is never called.
//
// Otherwise, after the window load event (so the clip never competes with LCP)
// and once any part of the frame is in the viewport, it plays ONCE per document:
// muted, inline, no loop, no controls, and it holds its last frame. A client
// navigation back to /work remounts the video on its poster and does not play
// it again (playedThisLoad). If play() is refused (iOS Low Power Mode, a codec
// gap), the poster simply stays. No caption, no disclosure.
"use client";

import { useEffect, useRef } from "react";

let playedThisLoad = false;

type ConnectionHint = { saveData?: boolean; effectiveType?: string };

export function WorkHeroClip({ poster }: { poster: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || playedThisLoad) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: ConnectionHint })
      .connection;
    if (conn?.saveData === true) return;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const arm = () => {
      if (cancelled) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (cancelled || playedThisLoad) return;
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          playedThisLoad = true;
          video.muted = true;
          video.preload = "auto";
          video.play().catch(() => {
            // Refused: the poster stays, and nothing retries.
          });
        },
        { threshold: 0 },
      );
      observer.observe(video);
    };

    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", arm);
      observer?.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="cw-wx-lead__clip"
      width={720}
      height={900}
      poster={poster}
      preload="none"
      muted
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/media/work-hero-720.webm" type='video/webm; codecs="vp9"' />
      <source src="/media/work-hero-720.mp4" type='video/mp4; codecs="avc1.640028"' />
    </video>
  );
}
```

The `<video>` element's attribute set is exactly the one above. It carries **no** `autoPlay`,
`loop`, `controls` or `<track>`, and no caption element exists near it (section 6 V4 C1, C9).
Codec strings: `vp9` for the WebM; `avc1.640028` is H.264 High profile (`64`), level 4.0 (`28`),
which is what 3b.7 encodes and W1 probes. React 19.2 types declare `disablePictureInPicture` and
`disableRemotePlayback` (`node_modules/@types/react/index.d.ts:3579-3580`). The file imports no
`gsap`, so `scripts/gsap-quarantine-gate.mjs` needs no allowlist entry.

---

### 3b.5 `app/globals.css`

**Delete, bottom block first so the top block's line numbers do not move** (7,623 lines on
2026-09-16). Before each deletion, confirm the boundary lines print exactly as shown; if either
differs, stop and report.

1. **Block B, `.cw-lot*` and the rest-title, lines 6577-6703.**
   `sed -n '6577,6578p;6701,6703p' app/globals.css` prints:
   ```
   /* ============================================================
    * Pass-61 — /work opens as a catalogue lot (.cw-lot*)
   [data-mode="cw"] .cw-wk .cw-wk-list {
     margin-top: 24px;
   }
   ```
   Then `sed -i '6577,6703d' app/globals.css`. Line 6704 (blank) and the
   `Pass-110 — the /services doors died` comment that follows stay.
2. **Block A, `.cw-wk*`, lines 6381-6518.**
   `sed -n '6381,6382p;6517,6520p' app/globals.css` prints:
   ```
   /* ============================================================
    * Pass-58 — /work index rebuilt (.cw-wk*) + case-page glance strip
     text-align: right;
   }

   /* Case page: outcome strip under the TitleCard (theater) */
   ```
   Then `sed -i '6381,6518d' app/globals.css`. The theater glance block that followed
   (`/* Case page: outcome strip under the TitleCard (theater) */`, formerly 6520-6575) is NOT this
   section's to delete; the study-template section owns it.

After both deletions: `grep -c "cw-lot\|cw-wk" app/globals.css` prints `0`.

**Insert** the block below immediately before the line
`/* ============================================================` that opens the comment whose
second line is ` * Pass-110 — the /services doors died in Pass-108; their CSS died here.`
(find it with `grep -n "Pass-110 — the /services doors died" app/globals.css`, then insert above
the line before it). Every token used exists: `--cw-fg` (`app/globals.css:1348-1353`),
`--font-cw-display`, `--font-cw-body`, `--font-cw-mono` (`:125-127`), `--color-cw-espresso`
(`:122`), `--color-foyer-ink-soft` (`:24`), `--color-accent-copper` (`:48`),
`--color-accent-copper-deep` (`:49`). The block defines five new custom properties on `.cw-wx`
(`--wx-fig`, `--wx-head`, `--wx-body`, `--wx-label`, `--wx-rule`) and uses them nowhere else.

```css
/* ============================================================
 * Pass-120 - /work index, Direction B (.cw-wx*)
 * Replaces the Pass-61 catalogue lot and the Pass-58 study list. Paper, the bone world,
 * top to bottom: the lead study at hero scale beside the Tel Aviv clip,
 * the method line, four entries of four data points (DESIGN_BAR R11), and
 * the record block (#record). The five-size ladder of FABLE-120-DESIGN
 * section 2; /work uses four of the five: 112/36/18/13 above 760px,
 * 64/26/17/12 at 760px and below. No motion here but the clip
 * (brand.json motion.heroclip). Hover is an underline, never a lift.
 * No uppercase, no tracking beyond 0.06em, no opacity on text.
 * ============================================================ */
[data-mode="cw"] .cw-wx {
  --wx-fig: 112px;
  --wx-head: 36px;
  --wx-body: 18px;
  --wx-label: 13px;
  --wx-rule: color-mix(in srgb, var(--cw-fg) 22%, transparent);
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx {
    --wx-fig: 64px;
    --wx-head: 26px;
    --wx-body: 17px;
    --wx-label: 12px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

/* Shared text roles */
[data-mode="cw"] .cw-wx-ctx {
  margin: 0;
  font-family: var(--font-cw-body);
  font-size: var(--wx-label);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  text-transform: none;
  color: var(--color-foyer-ink-soft);
}
[data-mode="cw"] .cw-wx-label {
  margin: 0;
  font-family: var(--font-cw-mono);
  font-size: var(--wx-label);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.06em;
  text-transform: none;
  color: var(--color-foyer-ink-soft);
}

/* Lead study */
[data-mode="cw"] .cw-wx-lead {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 64px;
  align-items: start;
  padding-top: 152px;
}
@media (max-width: 900px) {
  [data-mode="cw"] .cw-wx-lead {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-lead {
    padding-top: 112px;
  }
}
[data-mode="cw"] .cw-wx-lead__link {
  display: block;
  color: inherit;
  text-decoration: none;
}
[data-mode="cw"] .cw-wx-lead__link:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 8px;
}
[data-mode="cw"] .cw-wx-lead__h1 {
  margin: 16px 0 0;
  /* The h1's only own text is the space between its two spans; its size is
   * pinned to a ladder value so no stray default size reaches the type gate. */
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 600;
  line-height: 1.15;
}
[data-mode="cw"] .cw-wx-lead__fig {
  display: block;
  font-family: var(--font-cw-display);
  font-size: var(--wx-fig);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-lead__line {
  display: block;
  margin-top: 20px;
  max-width: 22ch;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-lead__did {
  margin: 24px 0 0;
  max-width: 60ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-lead__svc {
  margin-top: 20px;
}
[data-mode="cw"] .cw-wx-lead__link:hover .cw-wx-lead__line,
[data-mode="cw"] .cw-wx-lead__link:focus-visible .cw-wx-lead__line {
  text-decoration-line: underline;
  text-decoration-color: var(--color-accent-copper);
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}
[data-mode="cw"] .cw-wx-lead__media {
  position: relative;
  margin: 0;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--color-cw-espresso);
}
@media (max-width: 900px) {
  [data-mode="cw"] .cw-wx-lead__media {
    max-width: 480px;
  }
}
[data-mode="cw"] .cw-wx-lead__clip {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

/* Method line and the four entries */
[data-mode="cw"] .cw-wx-method {
  margin: 120px 0 0;
  max-width: 28ch;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-method {
    margin-top: 72px;
    max-width: none;
  }
}
[data-mode="cw"] .cw-wx-list {
  list-style: none;
  margin: 56px 0 0;
  padding: 0;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-list {
    margin-top: 40px;
  }
}
[data-mode="cw"] .cw-wx-list__item {
  border-top: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-list__item:last-child {
  border-bottom: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-entry {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  column-gap: 64px;
  row-gap: 12px;
  align-items: start;
  padding: 40px 0;
  color: inherit;
  text-decoration: none;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-entry {
    grid-template-columns: minmax(0, 1fr);
    padding: 28px 0;
  }
}
[data-mode="cw"] .cw-wx-entry:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 4px;
}
[data-mode="cw"] .cw-wx-entry__a,
[data-mode="cw"] .cw-wx-entry__b {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}
[data-mode="cw"] .cw-wx-entry__line {
  margin: 0;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-entry__did {
  margin: 0;
  max-width: 60ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-entry:hover .cw-wx-entry__line,
[data-mode="cw"] .cw-wx-entry:focus-visible .cw-wx-entry__line {
  text-decoration-line: underline;
  text-decoration-color: var(--color-accent-copper);
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}

/* Record block, #record. No scroll-margin: the section's own top padding
 * keeps the h2 clear of the fixed nav when /work#record lands. */
[data-mode="cw"] .cw-wx-rec {
  padding-top: 120px;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-rec {
    padding-top: 80px;
  }
}
[data-mode="cw"] .cw-wx-rec__h {
  margin: 0;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-rec__line {
  margin: 12px 0 0;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-rec__list {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-rec__list {
    margin-top: 28px;
  }
}
[data-mode="cw"] .cw-wx-rec__row {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 3fr) minmax(0, 5fr);
  column-gap: 32px;
  row-gap: 12px;
  align-items: baseline;
  padding: 28px 0;
  border-top: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-rec__row:last-child {
  border-bottom: 1px solid var(--wx-rule);
}
[data-mode="cw"] .cw-wx-rec__co {
  margin: 0;
  font-family: var(--font-cw-display);
  font-size: var(--wx-head);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--cw-fg);
}
[data-mode="cw"] .cw-wx-rec__co a {
  color: var(--color-accent-copper-deep);
  text-decoration-line: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}
[data-mode="cw"] .cw-wx-rec__co a:hover,
[data-mode="cw"] .cw-wx-rec__co a:focus-visible {
  text-decoration-color: var(--color-accent-copper);
}
[data-mode="cw"] .cw-wx-rec__co a:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 4px;
}
[data-mode="cw"] .cw-wx-rec__meta {
  display: contents;
}
[data-mode="cw"] .cw-wx-rec__desc {
  grid-column: 1 / -1;
  margin: 0;
  max-width: 68ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-rec__row {
    display: block;
    padding: 20px 0;
  }
  [data-mode="cw"] .cw-wx-rec__meta {
    display: block;
    margin: 8px 0 0;
  }
  [data-mode="cw"] .cw-wx-rec__role,
  [data-mode="cw"] .cw-wx-rec__what {
    display: block;
  }
  [data-mode="cw"] .cw-wx-rec__desc {
    margin-top: 8px;
  }
}

/* Close: the kept cross-link line, then PageFooter */
[data-mode="cw"] .cw-wx-cross {
  margin: 96px 0 0;
  max-width: 60ch;
  font-family: var(--font-cw-body);
  font-size: var(--wx-body);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cw-fg);
}
@media (max-width: 760px) {
  [data-mode="cw"] .cw-wx-cross {
    margin-top: 64px;
  }
}
[data-mode="cw"] .cw-wx-link {
  color: var(--color-accent-copper-deep);
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
[data-mode="cw"] .cw-wx-link:hover,
[data-mode="cw"] .cw-wx-link:focus-visible {
  text-decoration-color: var(--color-accent-copper);
  text-decoration-thickness: 2px;
}
```

Measured contrast on bone `#ECE3D0` (WCAG formula, run 2026-09-16): ink `#2A1F18` 12.59:1;
`--color-foyer-ink-soft` `#3A3631` 9.40:1; `--color-accent-copper-deep` `#8A3D24` 5.94:1 (body
links and the Guardicore record link); `--color-accent-copper` `#BD5A2D` 3.53:1 (underline colour
on hover and focus rings only, a UI component, AA needs 3:1). No hover or focus rule resolves to
`--cw-accent`, so `scripts/accent-states-lint.mjs` stays clean (`gates.md` §2.4).

Layout, stated once for the reviewer: at 1440 the lead is two columns, text `7fr` and media `5fr`
with a 64px gap inside a 1200px container (media 440px wide, 550px tall). At 900px and below it is
one column, text first, the media after it at most 480px wide. Entries are two columns above 760px
(context and figure-bearing line left, what he did and the service right) and one column at 760px
and below. Record rows are company, role, outcome across three columns with the description
spanning beneath; at 760px and below each row stacks company, role, outcome, description.

---

### 3b.6 `OpeningWorld`: kept, renamed to bone

`components/color-worlds/OpeningWorld.tsx` is unchanged. The page's first render changes from
`<OpeningWorld name="espresso" />` (`app/(foyer)/work/page.tsx:75`) to
`<OpeningWorld name="bone" />`, and every `data-section` on /work carries `data-world="bone"`
(three sections). The component's contract (`OpeningWorld.tsx:19-26`) requires the first section's
world and the opening world to agree, and the WorldSwitcher map still carries `bone` as
`{ bg: "#ECE3D0", fg: "#2A1F18", accent: "#9E3C25" }` (`WorldSwitcher.tsx:49`), identical to
`OpeningWorld.tsx:40`. Keeping it prevents the terracotta first paint that Pass-61 fixed
(`OpeningWorld.tsx:5-13`): without it, `[data-mode="cw"]` opens terracotta
(`app/globals.css:1348`). Nothing on /work uses `espresso` any more except the media frame's
background behind the poster (`--color-cw-espresso`), which shows only if the poster fails.

---

### 3b.7 The hero clip: transcode, crop, budgets

**Source.** `C:/Users/micah/Downloads/a-man-sits-at-a-table-and-talks--his-head-tilts-sl.mp4`,
3,264,298 bytes. Probed 2026-09-16: H.264, 1440x1440, yuv420p, 24 fps, 97 frames, 4.041667s, one
video stream and no audio stream. It is never committed (section 6 V4 C8).

**What frame 0 is.** Opened and viewed on 2026-09-16: frame 0 is the cleaned
`public/guardicore-telaviv-session.jpg` scene (no location sticker, the tablecloth patch in place)
extended taller, graded to near-monochrome and darkened toward the bottom edge. Motion starts after
it. The poster is frame 0, so the swap from poster to first frame shows no jump (W1 measures it).

**The crop that keeps the colleagues at the edge.** The source is square; the frame on the page is
4:5. The crop is baked into every transcode: `crop=1152:1440:196:0`, the 1152-wide window starting
196px from the left. That is exactly what `object-fit: cover; object-position: 68% 50%` would show
of the square source in a 4:5 box (overflow 288px, 68% of it is 195.84px). Micah's face sits at
about 68% across the window. The seated colleague in glasses is cut by the right edge, the
colleague at top left shows torso and hands only, the colleague at top right is cut by the top and
right edges. Because the crop is baked, the CSS uses `object-position: 50% 50%` on an exactly 4:5
box and no second crop happens in the browser. Viewed on the frame-0 extract at 960x1200.

**Commands** (Git Bash; `ffmpeg` and `ffprobe` 8.0.1 are on PATH on this machine). Run exactly:

```bash
SRC="C:/Users/micah/Downloads/a-man-sits-at-a-table-and-talks--his-head-tilts-sl.mp4"
TMP="C:/tmp/pass120-clip"
OUT="public/media"
CROP="crop=1152:1440:196:0"
mkdir -p "$TMP" "$OUT"

# 1. H.264 MP4, 720x900, High@4.0, no audio, moov atom first
ffmpeg -v error -y -i "$SRC" -vf "$CROP,scale=720:900:flags=lanczos,format=yuv420p" -an -map_metadata -1 -c:v libx264 -preset slow -crf 26 -profile:v high -level 4.0 -movflags +faststart "$OUT/work-hero-720.mp4"

# 2. VP9 WebM, 720x900, constant quality, no audio
ffmpeg -v error -y -i "$SRC" -vf "$CROP,scale=720:900:flags=lanczos,format=yuv420p" -an -map_metadata -1 -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$OUT/work-hero-720.webm"

# 3. Frame 0 master at 960x1200 (not committed)
ffmpeg -v error -y -i "$SRC" -vf "select=eq(n\,0),$CROP,scale=960:1200:flags=lanczos" -frames:v 1 "$TMP/work-hero-f0-960.png"

# 4. The poster: AVIF still from frame 0
ffmpeg -v error -y -i "$TMP/work-hero-f0-960.png" -map_metadata -1 -c:v libaom-av1 -still-picture 1 -crf 20 -cpu-used 4 -pix_fmt yuv420p "$OUT/work-hero-poster-960.avif"
```

**Budgets** (bytes, hard ceilings; the trial encode with these exact settings on 2026-09-16 is in
brackets):

| File | Ceiling | Trial |
|---|---|---|
| `public/media/work-hero-720.mp4` | 240,000 | 199,143 |
| `public/media/work-hero-720.webm` | 140,000 | 110,214 |
| `public/media/work-hero-poster-960.avif` | 24,000 | 13,412 |

What a visitor downloads: the poster (about 13KB) on every load, then one video (Chrome, Firefox
and Edge take the WebM, about 110KB; Safari takes the MP4, about 200KB) only after `load`, only when
the clip will actually play. These sit well inside section 6 V4 C7's served ceilings.

Why 720x900: the frame renders 440x550 CSS px at 1440 and at most 350x438 at 390, so 720 wide
covers about 1.6x at desktop and 2x at a 390 phone. The source is itself soft (a generated
upscale), and a 960-wide video measured no visible gain in the trial.

**Preload strategy for LCP.** The poster is the LCP image candidate at both widths (Chrome counts a
`<video>` poster). `page.tsx` preloads it with `fetchPriority: "high"`. The `<video>` is
server-rendered with `preload="none"`, so no media byte is fetched until the clip starts, and the
clip starts only after the `load` event. When the first video frame paints it is the same size as
the poster, so it does not create a larger LCP entry. The LCP gate itself is section 6, 6.6 (L1
median `<= 1800`ms, L2 CLS `<= 0.05`), and the ship condition is section 6, 6.8.

---

### 3b.8 `next.config.ts`: the two redirects

Insert, immediately after the `/work/akamai` object's closing `},` (`next.config.ts:28`) and before
the `// Pass-57 (operator 2026-09-01: ...` comment (`:29`), exactly:

```ts
      // Pass-120 (operator 2026-09-15): Postmates and Neuton.AI become rows in
      // the record block on /work, "but definitely describe a bit for each
      // one". Both pages retire. permanent: true answers 308, not 301
      // (node_modules/next/dist/docs/01-app/03-api-reference/05-config/
      // 01-next-config-js/redirects.md:30). The #record fragment is kept in the
      // Location header (next/dist/shared/lib/router/utils/
      // prepare-destination.js:184-192) and lands on <section id="record">.
      {
        source: "/work/postmates",
        destination: "/work#record",
        permanent: true,
      },
      {
        source: "/work/neuton",
        destination: "/work#record",
        permanent: true,
      },
```

Redirects run before the filesystem and pages (`redirects.md:39`), and no `middleware.ts` or
`proxy.ts` exists (`work-index.md` §7), so these two entries are the only layer.
`scripts/render-gate.mjs` reads redirect sources from this file live (`:109-115`) and needs no
edit. The two MDX files are deleted by section 2, so the slugs also leave `generateStaticParams`,
the sitemap and `getNextCaseStudy` with no code change (`work-index.md` §8, §12).

---

### 3b.9 Sitemap, llms.txt, JSON-LD

- **`app/sitemap.ts`: no edit by this section.** The case-study routes are generated from
  `getAllCaseStudies()` (`:96-104`); section 2 changes the filter to `isPublished` (§2.2). Deleting
  the two MDX files removes `/work/postmates` and `/work/neuton`, and `content/work/birth-worker.mdx`
  adds `/work/birth-worker`. Checked by section 6 V1 K9 (six `/work` URLs, none retired).
- **`app/llms.txt/route.ts`: no edit by this section.** It never linked either retired slug
  (`work-index.md` §10). The five study lines, the birth-worker line and the Background lines are
  written by section 2 §2.7 and section 5 rows 23-28. **Those two sections both write
  `llms.txt:40-43`; the assembler must keep one of them** (see 3b.14).
- **JSON-LD: nothing added to /work, nothing to remove.** /work has no JSON-LD today
  (`content-model.md` §5). No JSON-LD anywhere references `/work/postmates` or `/work/neuton`: the
  only mention is `alumniOf` naming Postmates as an Organization with no `url`
  (`app/layout.tsx:103`, `work-index.md` §11), which stays. The birth-worker study gets its Article
  JSON-LD from the study template with `datePublished: cs.publishedAt` (section 2 §2.2), checked by
  section 6 V1 K8.

---

### 3b.10 `/work` opengraph image: unchanged

`app/(foyer)/work/opengraph-image.tsx` stays byte for byte (git blob
`16cc3bc6bc5563944dabb8396c5ee975e8140d3f`, last changed in `d614591`). Its copy renders as:
- eyebrow `WORK · MICAH JONES`
- headline `CASE STUDIES`
- punch `Four exits: Postmates, SurveyMonkey IPO, Guardicore, Neuton.AI. $5B+ combined. Now building Ordani.`

Reason: the punch carries no retired claim. It names no tenure year, no multiplier, no
reach figure and no client descriptor; "Four exits" and "$5B+ combined" are the ledgered home
wording that section 5 keeps on `/` ("Four exits behind my work, $5B+ combined"), and all four
companies still appear on /work, now as record rows. Section 5 reached the same verdict
(`live-sweep.md` §6: no retired claim). Postmates and Neuton.AI are named in pixels, not linked, so
the retirement does not touch it.

---

### 3b.11 `.claude/brand.json`: add `motion.heroclip`

Add this key inside `motion`, directly after the `countup` object and before `banned`. Do not touch
any other `motion` key in this edit (the TitleCard section rewrites `signature` and
`view_transition`):

```json
    "heroclip": {
      "id": "work-hero-clip",
      "description": "/work only: the 4.04s image-to-video clip of the Tel Aviv working-session photograph plays once per document load, muted, inline, no loop, no controls, and holds its last frame. It starts only after the window load event, once any part of the frame is in the viewport; a client navigation back to /work shows the poster and does not replay it. The poster is frame 0 of the clip, and the poster alone is the render without JavaScript, under prefers-reduced-motion, with Save-Data on, and on 2g connections. No caption and no disclosure (operator 2026-09-16). Colleagues kept at the frame's edge by a baked 4:5 crop. Operator exception to DESIGN_BAR R12, 2026-09-16 (\"Use the AI clip anyway\"), against the Fable design ruling; not a second signature and not a precedent for any other generated imagery. Ships only with the motion-engineer's written approval and a measured mobile LCP within 1800ms.",
      "files": [
        "components/color-worlds/WorkHeroClip.tsx",
        "app/(foyer)/work/page.tsx",
        "app/globals.css",
        "public/media/"
      ]
    },
```

The motion-engineer approval itself is section 6, 6.8 condition 1 (`^APPROVED: clip$` in
`.planning/reviews/MOTION-120-APPROVAL.md`).

---

### 3b.12 Verification

The standing clauses in section 6, 6.0 bind every line here. This section adds only what section 6
does not already check; the section 6 checks that cover this section are listed after W5 so
nothing is run twice.

**W1. Transcodes, static** (after 3b.7, before the commit). Tables would mangle the shell pipes, so
each check is a command block followed by its exact expected output.

W1a:
```bash
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,profile,width,height,pix_fmt,level,nb_frames -of csv=p=0 public/media/work-hero-720.mp4
```
Expected: `h264,High,720,900,yuv420p,40,97`

W1b:
```bash
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=codec_name,width,height,nb_read_frames -of csv=p=0 public/media/work-hero-720.webm
```
Expected: `vp9,720,900,97`

W1c:
```bash
ffprobe -v error -show_entries stream=codec_name,width,height -of csv=p=0 public/media/work-hero-poster-960.avif
```
Expected: `av1,960,1200`

W1d (one video stream, no audio stream, in each video file):
```bash
for f in public/media/work-hero-720.mp4 public/media/work-hero-720.webm; do ffprobe -v error -show_entries stream=codec_type -of csv=p=0 "$f" | tr '\n' ' '; echo; done
```
Expected: two lines, each exactly `video ` (the word, then one space).

W1e (faststart: the moov atom sits in the first 64 bytes):
```bash
head -c 64 public/media/work-hero-720.mp4 | grep -a -c moov
```
Expected: `1`

W1f (byte ceilings):
```bash
node -e 'const fs=require("fs");const B={"work-hero-720.mp4":240000,"work-hero-720.webm":140000,"work-hero-poster-960.avif":24000};let f=0;for(const [n,max] of Object.entries(B)){const s=fs.statSync("public/media/"+n).size;const ok=s<=max;if(!ok)f++;console.log((ok?"PASS":"FAIL")+" W1f "+n+": got "+s+(ok?"":" (want <= "+max+")"))}console.log("W1f failures: "+f)'
```
Expected: three `PASS W1f` lines, then `W1f failures: 0`.

W1g (nothing else in the directory):
```bash
ls -1 public/media
```
Expected, exactly three lines:
```
work-hero-720.mp4
work-hero-720.webm
work-hero-poster-960.avif
```

W1h (the poster is frame 0):
```bash
ffmpeg -v info -i public/media/work-hero-poster-960.avif -i public/media/work-hero-720.webm -lavfi "[0:v]scale=720:900:flags=lanczos,format=yuv420p[a];[1:v]select=eq(n\,0),format=yuv420p[b];[a][b]ssim" -frames:v 1 -f null - 2>&1 | grep -o "All:[0-9.]*"
```
Expected: `All:` followed by a value `>= 0.98` (trial on 2026-09-16: `All:0.993672`).

W1i (bite proof for W1h): the W1h command with `eq(n\,0)` replaced by `eq(n\,96)`.
Expected: `All:` followed by a value `< 0.98` (trial: `All:0.904339`). This proves W1h tells the
first frame from the last.

W1h is the "poster is frame 0" check. If W1h prints a value below 0.98, stop and report; do not
re-encode at another quality to pass it.

**W2. Static greps** (after all edits, before the build). In these commands `\|` is grep's
alternation, typed exactly as shown.

W2a (the retired classes are gone everywhere):
```bash
grep -rn "cw-lot\|cw-wk" app components lib scripts; echo "exit=$?"
```
Expected: only the line `exit=1`.

W2b, W2c, W2d (the world and the retired reads):
```bash
grep -c 'data-world="bone"' "app/(foyer)/work/page.tsx"
grep -c 'OpeningWorld name="bone"' "app/(foyer)/work/page.tsx"
grep -c "espresso\|figcaption\|\.year\|indexLine\|feature\|stats" "app/(foyer)/work/page.tsx"
```
Expected, three lines: `3`, `1`, `0`.

W2e, W2f (the redirects):
```bash
grep -c 'destination: "/work#record"' next.config.ts
grep -c 'source: "/work/postmates"\|source: "/work/neuton"' next.config.ts
```
Expected, two lines: `2`, `2`.

W2g (no autoplay, loop, controls or track in the clip's JSX; the header comment's "no loop, no
controls," is followed by a comma and does not match):
```bash
grep -cE 'autoPlay|\bloop\b[^,]|\bcontrols\b[^,]|<track' components/color-worlds/WorkHeroClip.tsx
```
Expected: `0`

W2h (the brand.json key, in place):
```bash
node -e 'const m=require("./.claude/brand.json").motion;console.log(m.heroclip.id, m.heroclip.files.length, Object.keys(m).join(","))'
```
Expected: one line starting `work-hero-clip 4 ` whose key list contains `countup,heroclip,banned`
in that order.

W2i (the OG image is untouched):
```bash
git hash-object "app/(foyer)/work/opengraph-image.tsx"
```
Expected: `16cc3bc6bc5563944dabb8396c5ee975e8140d3f`

W2j (em-dashes in the two source files):
```bash
grep -c "—" "app/(foyer)/work/page.tsx" components/color-worlds/WorkHeroClip.tsx
```
Expected, two lines: `app/(foyer)/work/page.tsx:1` and
`components/color-worlds/WorkHeroClip.tsx:0`. The one em-dash is the kept comment
`// Short title; root template appends " — Micah Jones" once.` (from `:49`).

**W3. Served headers and the preload** (server on 3200, started per section 6, 6.1).

W3a:
```bash
for f in work-hero-720.webm work-hero-720.mp4 work-hero-poster-960.avif; do curl -sI "http://localhost:3200/media/$f" | tr -d '\r' | grep -i '^content-type:' | cut -d' ' -f2-; done
```
Expected, three lines in this order: `video/webm`, `video/mp4`, `image/avif`.

W3b (the poster preload is one link tag in the served head):
```bash
curl -s http://localhost:3200/work | grep -o '<link[^>]*work-hero-poster-960\.avif[^>]*>' | grep -c 'rel="preload"'
```
Expected: `1`

W3c (the server-rendered video loads nothing on its own):
```bash
curl -s http://localhost:3200/work | grep -c 'preload="none"'
```
Expected: `1` or more (`-ge 1`).

**W4. Once per document load across a client navigation.** Create
`.planning/exec/clipnav120.mjs` with exactly this, then run
`node .planning/exec/clipnav120.mjs http://localhost:3200`. Expected last line
`clipnav120 failures: 0`. Bite proof: before any Pass-120 edit, run it against production
(`node .planning/exec/clipnav120.mjs https://www.micahjonesconsulting.com >
.planning/exec/clipnav120-bite.txt`); it must exit 1 with `FAIL N1` (production has no video on
/work).

```js
// .planning/exec/clipnav120.mjs
// Pass-120 section 3b W4: the /work clip plays once per DOCUMENT load, including
// across a client navigation away (ViewTransitionLink) and Back. Motion on,
// 1440x900. Measures the media element (play events, video.played), not the
// component. Scope (LESSONS #28): the video lives in main (app/(foyer)/layout.tsx
// renders Nav as a sibling of main), so every query is "main video".
// Usage: node .planning/exec/clipnav120.mjs [base]   (base defaults to http://localhost:3200)
import { createRequire } from "node:module";
const puppeteer = createRequire("C:/tmp/p101tools/package.json")("puppeteer-core");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = (process.argv[2] || "http://localhost:3200").replace(/\/$/, "");

let failures = 0;
const chk = (id, ok, got, want) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${id}: got ${JSON.stringify(got)}${ok ? "" : ` (want ${JSON.stringify(want)})`}`);
  if (!ok) failures++;
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    window.__plays = 0;
    document.addEventListener(
      "play",
      (e) => {
        if (e.target instanceof HTMLVideoElement) window.__plays++;
      },
      true,
    );
  });
  await page.goto(BASE + "/work", { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => {
    window.__docMark = "p120";
  });

  const ended = await page
    .waitForFunction(() => {
      const v = document.querySelector("main video");
      return !!v && v.ended;
    }, { timeout: 15000 })
    .then(() => true, () => false);
  chk("N1 clip ended after the first load", ended, ended, true);
  const plays1 = await page.evaluate(() => window.__plays);
  chk("N2 play events after the first load", plays1 === 1, plays1, 1);

  await page.evaluate(() => {
    const a = document.querySelector('main a[href="/work/rfp-engine"]');
    if (a) a.click();
  });
  const away = await page
    .waitForFunction(() => location.pathname === "/work/rfp-engine", { timeout: 15000 })
    .then(() => true, () => false);
  chk("N3 reached /work/rfp-engine", away, away, true);
  const markAway = await page.evaluate(() => window.__docMark === "p120");
  chk("N4 same document after the entry click (client navigation)", markAway, markAway, true);

  await page.evaluate(() => history.back());
  const back = await page
    .waitForFunction(
      () => location.pathname === "/work" && !!document.querySelector("main video"),
      { timeout: 15000 },
    )
    .then(() => true, () => false);
  chk("N5 Back reached /work with a video element", back, back, true);
  await wait(6000);
  const after = await page.evaluate(() => {
    const v = document.querySelector("main video");
    return {
      mark: window.__docMark === "p120",
      plays: window.__plays,
      played: v ? v.played.length : -1,
      paused: v ? v.paused : null,
    };
  });
  chk("N6 same document after Back", after.mark, after.mark, true);
  chk("N7 no second play event in this document", after.plays === 1, after.plays, 1);
  chk(
    "N8 the remounted video never played",
    after.played === 0 && after.paused === true,
    { played: after.played, paused: after.paused },
    { played: 0, paused: true },
  );
} finally {
  await browser.close();
}
console.log(`clipnav120 failures: ${failures}`);
process.exit(failures ? 1 : 0);
```

**W5. The two redirects in a browser at 390.** Section 6 V2 T15 covers 1440 only. Run this
one-liner in Git Bash (every path in it is inside a quoted string, so Git Bash does not rewrite it):
`node -e 'const p=require("C:/tmp/p101tools/node_modules/puppeteer-core");(async()=>{const b=await p.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});let f=0;for(const s of ["postmates","neuton"]){const g=await b.newPage();await g.setViewport({width:390,height:844,isMobile:true,hasTouch:true});await g.goto("http://localhost:3200/work/"+s,{waitUntil:"load"});await new Promise(r=>setTimeout(r,1500));const r=await g.evaluate(()=>({at:location.pathname+location.hash,top:Math.round(document.getElementById("record").getBoundingClientRect().top),h2:Math.round(document.querySelector("#record h2").getBoundingClientRect().bottom),vh:innerHeight}));const ok=r.at==="/work#record"&&r.top>=0&&r.top<=160&&r.h2<=r.vh;if(!ok)f++;console.log((ok?"PASS":"FAIL")+" W5 "+s+" 390: got "+JSON.stringify(r))}await b.close();console.log("W5 failures: "+f);process.exit(f?1:0)})()'`
Expected: `PASS W5 postmates 390: ...`, `PASS W5 neuton 390: ...`, `W5 failures: 0`.

**Section 6 checks that verify this section (run there, not repeated here):** V1 K3 (method line
and record strings exactly once), K5 (record rows, order, one link to `/work/guardicore`, no
`Helped launch · 2025`), K6 (the five `/work/` hrefs), K7 (no tenure year on /work), K9 (sitemap),
K10 (both 308s to `/work#record`); V2 T1-T3 (the /work ladder: 1440 set within
`{13, 18, 36, 56, 112}` containing `13, 18, 36, 112`; 390 within `{12, 17, 26, 36, 64}` containing
`12, 17, 26, 64`), T5-T7, T9 (no figcaption), T10 (one h1), T11 (copper-deep body links on paper),
T12 (no sage on /work), T15 (fragment lands at 1440); V4 C1-C9 (the clip: SSR markup, plays once,
reduced motion, Save-Data, no-JS, served size, no raw source, no caption); V6, V7 and V8 in 6.5
(both 308s by curl, axe on /work, layout-gate); 6.6 L1-L2 (mobile LCP and CLS on /work); 6.7 the
`work-*` and `redirect-*` captures, which the executor opens and describes, including the
colleagues-at-the-edge look; 6.8 condition 1 (the motion-engineer's `APPROVED: clip`).

What each section 6 clip check expects from this section's markup, so the two agree: C1 finds one
server-rendered `<video` with `poster="/media/work-hero-poster-960.avif"` and no `autoplay`, `loop`,
`controls` or `<track` (3b.4). C3 sees motion within 8000ms of `load` at 390 and 1440, because the
clip arms on `load` and plays on any intersection, and the frame's top edge is inside the first 844px
at 390. C4, C5 and C6 see the poster only, with `video.played.length === 0`. C7's poster is
`image/avif`.

---

### 3b.13 Rejected for this section

- **A caption or disclosure under the clip or the photograph** (the mock's `animated from a
  photograph`, FABLE's "real caption"): operator 2026-09-16, "no captions ... AI indicator and
  pointless". Recorded in `DESIGN_BAR.md:201` as declined and not re-raised.
- **Looping the clip, or returning to the poster when it ends:** R15 bans the loop; returning to
  the poster is a second visible cut. It plays once and holds its last frame.
- **Autoplay on first paint (`autoPlay` attribute, `preload="auto"` in SSR):** the video would
  compete with the poster for LCP on a 1.8s mobile budget. It arms on `load` instead.
- **Waiting until half the frame is visible:** at 390 the frame sits below the lead text, and
  section 6 C3 needs motion within 8000ms of `load` without a scroll. Any intersection starts it.
- **Mounting the `<video>` on the client only, with an `<img>` still underneath:** two media
  elements for one frame, and section 6 C1 expects one server-rendered `<video>` with a poster.
- **A second poster in JPEG, or 480w and 960w posters:** `poster` takes one URL; AVIF decodes in
  every current browser, and the frame-0 AVIF is 13KB, which removes the reason for a smaller one.
- **Keeping the square source and cropping with CSS `object-position: 68% 50%`:** the baked crop
  sends 20% fewer pixels and guarantees the poster and the video frame line up exactly.
- **A fifth Color World called `paper` at `#F5EFE4` for /work:** it would change the shared
  `OpeningWorld` and `WorldSwitcher` contract and `accent-states-lint` scope for one page. /work
  stays on `bone`.
- **Reusing `ExitRecord.tsx` for the record block:** it sorts by deal value, prints SurveyMonkey's
  and Guardicore's values, and has no roles. Section 2 §2.4 records the divergence; the home
  component stays unchanged.
- **A heading per record row, or a `<table>` for the record:** four rows of company, role and
  outcome plus a sentence read as a list; a table would separate each description from its row
  for a screen reader.
- **Mono for the context label:** the RFP client descriptor is 13 words, so it would be mono prose
  (R1; section 6 T6).
- **`.cw-lede-link` on the kept cross-link line:** it is 12px mono, uppercase and tracked
  (`app/globals.css:2499-2508`), which adds a sixth size and breaks T7. `.cw-wx-link` replaces it.
- **Writing `llms.txt`, the sitemap, the metadata description or the OG image from this section:**
  owned by sections 2 and 5; the OG image stays unchanged (3b.10).
- **Hard-coding the index strings in `page.tsx`:** every string comes from the study frontmatter
  and `content/work-page.ts` (LESSONS #2: the card is a compression of the study, never a second
  story).

---

### 3b.14 Could not settle from the repo (one line each)

- Operator: frame 0 is a near-monochrome, bottom-darkened grade of the session photo, not a pixel copy of `public/guardicore-telaviv-session.jpg` (colour); does that satisfy "poster is the real still"?
- Operator: the clip ends and holds on a generated frame (FABLE-120-DESIGN §4 named this); hold it, or is a different end state wanted?
- Operator: the colleagues' okay to being animated is his to hold (`DESIGN_BAR.md:201`); nothing in the repo records it.
- Judge: /work paper is the `bone` world `#ECE3D0`, while the study body may use `--color-foyer-paper` `#F5EFE4`; "one reading system" across the two grounds is the study-template section's call to match or accept.
- Judge: the kept cross-link line ("The next entry in this record could be yours...") is not mentioned by Direction B; kept as live copy, outside `#record`.
- Judge: `metadata.title` stays `Work: pipeline, products, and exits`; the word "pipeline" is not ruled on and no longer describes a figure on the page.
- Assembly: sections 2 (§2.7) and 5 (rows 25-28) both specify `app/llms.txt/route.ts:40-43` with different wording; one writer must be picked before execution.
- Assembly: `.claude/brand.json` is edited by this section (`motion.heroclip`) and the TitleCard section (`motion.signature`, `view_transition`); one writer per file means the assembler merges both edits into one step.
- Assembly: `app/globals.css` is edited by this section and the study-template section; this section's insertion anchor (the Pass-110 comment) was chosen because the template section should not move it, which the assembler confirms.
- Technical unknown: headless Chrome's VP9 playback and muted-autoplay behaviour on this machine are assumed by W4 and section 6 C3; unverified until the first run.
- Technical unknown: whether Lighthouse's simulated mobile LCP on /work passes 1800ms; Pass-119 measured 2944-3510ms simulated on other routes, and section 6.6 stops rather than trims the clip.
- Technical unknown: whether the `preload()` link React emits keeps `rel="preload"` and the AVIF href in one `<link>` tag as W3b greps; if React splits or reorders attributes differently, W3b's pattern needs the judge.
