# Leg L1: the content model (sonnet)

Brief §2.1, the §2.2 rows for `lib/case-studies.ts` and `app/sitemap.ts`, §2.3, §2.4, §2.6, and the
§2.8 text helper. Read brief lines 158-1206.

## YOUR FILES

- `lib/case-study-schema.ts` — replace whole: block at line 238 (with O-c, O-d).
- `lib/title-card-schema.ts` — replace whole: block at line 352.
- `lib/case-studies.ts` — the §2.2 rows at brief lines 383-385.
- `app/sitemap.ts` — the §2.2 row at brief line 399 (filter with `isPublished`).
- `content/work/guardicore.mdx`, `rfp-engine.mdx`, `ordani.mdx`, `content-engine.mdx` — replace whole
  with the §2.3 blocks at lines 466, 543, 643, 715 (with O-a, O-b).
- `content/work/birth-worker.mdx` — new, block at line 798 (with O-a).
- `content/work/passioneer.mdx` — §2.3 line 428: replace its frontmatter (lines 1-13) with the block at
  line 430; the body stays unchanged.
- DELETE `content/work/postmates.mdx`, `content/work/neuton.mdx`, `public/guardicore-telaviv.jpg`.
- `content/work-page.ts` — new, block at line 896.
- `content/citations.ts` — §2.4 lines 952-955 (the two `citedIn` edits) and §2.6 `FIGURES` (block at
  line 988, placed where §2.6 says).
- `.planning/exec/p120-text.mjs` — new, block at line 1035.

**MDX rule (§2.0).** Write every `content/work/*.mdx` WHOLE with the Write tool, never Edit (the
frontmatter hook greps only the written content). For `passioneer.mdx`: Read it, then Write the whole
file with the new frontmatter and the unchanged body. The hook now requires only `title`, `dek`,
`status` (edited today with the operator's approval).

## OVERRIDES (decided; they replace the brief text)

- **O-a publishedAt** (brief O1 and O16; the operator gave no release date today): all five published
  studies carry exactly `publishedAt: "2026-09-16"`. This replaces `"2026-05-14"`, `"2026-09-01"` and
  the birth-worker placeholder. §2.3's BLOCKING paragraph and §2.10's publishedAt item are superseded.
- **O-b guardicore.mdx hero** (brief O5) is exactly:
  ```yaml
  hero:
    src: "/media/guardicore-band-960.jpg"
    width: 960
    height: 1200
    alt: "A working session in Tel Aviv: Micah mid-discussion at a table of notes, phones and glasses."
  ```
  (`public/media/guardicore-band-960.jpg` already exists.)
- **O-c** the photo `src` regex in `lib/case-study-schema.ts` must admit that path. The line
  `  src: z.string().regex(/^\/[a-z0-9-]+\.(jpg|jpeg|png|avif|webp)$/),`
  becomes
  `  src: z.string().regex(/^\/(media\/)?[a-z0-9-]+\.(jpg|jpeg|png|avif|webp)$/),`
- **O-d** the two `publishedAt` comments in `lib/case-study-schema.ts` follow O1. The line
  `// publishedAt is the date the page was first committed (hidden: JSON-LD and sort only),`
  becomes
  `// publishedAt is the release date of the page (hidden: JSON-LD and sort only),`
  and the line
  `    /** Hidden. ISO date of the MDX file's first commit. JSON-LD datePublished and the fallback sort only. */`
  becomes
  `    /** Hidden. ISO release date of the page (LESSONS #3, RELEASE DAY). JSON-LD datePublished and the fallback sort only. */`

No other departure from the §2 blocks. The ORDANI comma ("Birth workers, doulas, midwives and
perinatal counselors, were not running...") stays as written (brief §1.5).

## CHECKS (run after writing; paste raw output)

1. Diff every whole-file result against its brief block. The only allowed differences are O-a to O-d.
2. V4 (brief lines 1063-1066).
3. V6 (brief lines 1093-1100): run every line and paste raw output; the gate lines are information only
   (other legs are mid-edit).
4. V7 (brief lines 1103-1120), expected output exactly as the brief gives it.
5. V8 (brief lines 1123-1124), then the §2.8 bite proof for V8 only (line 1154): type `44.8` literally
   into the ordani.mdx "Why it matters" paragraph (Write the whole file), run V8's first line
   (expect `1`), then Write the file back to its correct content and re-run V8 (expect `0` and `1`).
   Finish with a diff of ordani.mdx against its block (only O-a may differ).
6. V5 as adjusted by O1 (the brief's version compares against first-commit dates, which O1 retired).
   Run exactly:
   ```bash
   node_modules/.bin/tsx -e '
   import { getAllCaseStudies, isPublished } from "./lib/case-studies";
   const all = (await getAllCaseStudies()).filter(isPublished);
   let ok = 0;
   for (const s of all) { if (s.publishedAt === "2026-09-16") ok++; console.log(s.order, s.slug, s.service, s.entry.figure ?? "-"); }
   console.log(`publishedAt: ${ok} of ${all.length} equal 2026-09-16`);'
   ```
   Expected, exactly:
   ```
   1 guardicore positioning-gtm $14M
   2 rfp-engine ai-engineering -
   3 ordani product-building -
   4 content-engine product-building -
   5 birth-worker positioning-gtm -
   publishedAt: 5 of 5 equal 2026-09-16
   ```
   This also proves every published frontmatter parses against the new schema. If it throws, paste the
   error verbatim (a schema issue names the file and field).
