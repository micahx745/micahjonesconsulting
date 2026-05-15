# Phase 7 Research — MDX Infrastructure

**Phase:** 07 MDX Infrastructure
**Researched:** 2026-05-14
**REQ-IDs:** CASE-01, CASE-02, CASE-07, CASE-08, CASE-09, CASE-10, THEATER-04, THEATER-05 (8 total)
**Success criteria:** 5 (per ROADMAP.md Phase 7)
**Depends on:** Phase 6 (Foyer Pages) — `lib/case-studies.ts` (Phase 6 stub) is the seed for Phase 7's typed reader; `lib/copy-lint-runner.ts` (Phase 2) is the seed for Phase 7's build-time Zod gate.
**Unblocks:** Phase 8 (Case Studies — ORDANI verbatim + three others).

---

## 1. What Phase 7 ships (in scope)

Phase 7 is the **rendering plumbing** for case studies. No real case-study content. Eight files materialize:

| File | Type | New / Updated | Purpose |
|---|---|---|---|
| `lib/case-study-schema.ts` | Zod | NEW | Frontmatter schema — single source of truth for case-study shape |
| `lib/case-studies.ts` | Server util | UPDATE | Replace Phase 6 defensive parse with Zod-validated read; throw on drift |
| `lib/copy-lint-runner.ts` | Build-time scanner | UPDATE | Add MDX-frontmatter Zod validation pass alongside banned-word scan |
| `mdx-components.tsx` | Component map | NEW | Repo-root file — maps `<TitleCard>`, `<Dek>`, `<CaseStudyStill>`, `<PullQuote>`, `<CopperRule>` |
| `components/Dek.tsx` | Server | NEW | Source Serif 4 italic wrapper, mode-aware ink |
| `components/CaseStudyStill.tsx` | Server | NEW | `next/image` with 2px bone border + 4% film-grain + caption |
| `components/PullQuote.tsx` | Client | NEW | Source Serif 4 italic + copper underline-grow on IntersectionObserver |
| `components/CopperRule.tsx` | Server | NEW | `<hr>` styled with `--accent-copper` |
| `app/(theater)/work/[slug]/page.tsx` | Server | UPDATE | Replace Phase 4 stub — dynamic `import()` MDX body + render order |
| `content/work/test-slug.mdx` | Content | UPDATE | Exercise every MDX component (Phase 7 test corpus) |
| `app/globals.css` | CSS | UPDATE | PullQuote underline-grow keyframes; CaseStudyStill film-grain + 2px border |

Out of scope (Phase 8/9/10):
- Real case-study MDX content (ORDANI verbatim, HR Equity Author, Passioneer, Akamai) → Phase 8.
- Real images at `/stills/*` → Phase 8/9. `CaseStudyStill` gracefully placeholders missing sources.
- Lighthouse / axe / responsive baselines → Phase 10.

---

## 2. Five Phase 7 Success Criteria (from ROADMAP)

1. `lib/case-study-schema.ts` exports a Zod schema for frontmatter (title, dek, role, tools[], year, status, titleCardWords, heroStill?, client?). The schema is invoked at build for every `content/work/*.mdx`; build fails with file + line on any mismatch.
2. `mdx-components.tsx` at **repo root** (NOT inside `app/`) maps `<TitleCard>`, `<Dek>`, `<CaseStudyStill>`, `<PullQuote>`, `<CopperRule>` so a sample MDX file uses them without explicit imports.
3. `(theater)/work/[slug]/page.tsx` reads frontmatter via `lib/case-studies.ts`, then renders MDX body via dynamic `import()`; render order: TitleCard → Dek → Hero still → Problem → Why → Approach → What it became → Outcome → PullQuote → footer nav.
4. `<CaseStudyStill>` renders `next/image` with 2px warm off-white inner border + 4% film-grain CSS overlay + "name — date" caption per blueprint §4c.
5. `<PullQuote>` renders Source Serif 4 italic with copper underline-grow on scroll-into-view (2s ease), honoring reduced-motion.

---

## 3. Source-of-truth references

### Blueprint §4c (Photography / image direction)
> **ORDANI product stills**: dashboard screenshots placed on the dark theater ground with 2px warm off-white inner border and a subtle 4% film-grain overlay. Each one is captioned like a film still ("Doula intake flow, March 2026").

→ Drives CaseStudyStill structure: image → 2px bone border → 4% film-grain overlay → caption "name — date".

### Blueprint §4f (The signature move — Title Card)
> Each case study opens with a vertical word-stack of three to six words... The stack pins for ~600ms as you scroll, then resolves into a smaller caption while the first product still fades in below.

→ TitleCard already exists from Phase 5; Phase 7 wires `frontmatter.titleCardWords` + `frontmatter.dek` → `<TitleCard words={...} caption={...} heroSrc={frontmatter.heroStill} />`.

### Blueprint §9 (ORDANI render order)
The verbatim ORDANI wireframe sequence:
```
TitleCard → Dek → Hero still → Problem → Why it matters →
Approach (4 subsections) → What it became (stills) →
Outcome → PullQuote → [NEXT WORK ↘] [BACK TO FOYER ↗]
```
→ THEATER-04 enforces this order in `(theater)/work/[slug]/page.tsx`. MDX body provides Problem/Why/Approach/Outcome as headed sections + components.

Motion notes from §9: "Stills cross-fade 1s on scroll into view. Pull quote has a 2-second copper underline-grow on enter." Stills cross-fade is Phase 8/9 nicety (out of scope here — we render statically); pull-quote underline-grow is CASE-08.

### ARCHITECTURE.md §7.1, §7.2, §7.3 (MDX data flow + Zod schema)
The hybrid pattern is documented: gray-matter for index/OG, dynamic `import()` for the rendered body. Phase 7 lands the dynamic `import()` half (Phase 6 landed the gray-matter half).

Architecture's example schema (lines 524-538):
```ts
export const caseStudySchema = z.object({
  title: z.string(),
  dek: z.string(),
  role: z.string(),
  tools: z.array(z.string()),
  year: z.string(),
  status: z.string(),
  titleCardWords: z.array(z.string()).min(3).max(6),
  heroStill: z.string().optional(),
});
```

Phase 7 extends this with `status` as an enum (`"shipped" | "in-flight" | "archived" | "stub"`) and adds `client?: string`. The 3-6 word bound on `titleCardWords` mirrors the existing `titleCardSchema.words` bound in `lib/title-card-schema.ts` (Phase 5).

### Phase 2 deviation (build-time scanner placement)
Per `lib/copy-lint-cli.ts` header comment and STATE.md Phase 2 notes: Next.js 16's `instrumentation.ts` does NOT run during `next build`. The build-time scanner lives at `lib/copy-lint-cli.ts`, invoked from `package.json`'s `build` script:

```
"build": "tsx lib/copy-lint-cli.ts && next build",
```

Phase 7's Zod-frontmatter check extends `lib/copy-lint-runner.ts` (which the CLI invokes), not `instrumentation.ts`. The function name `runCopyLint()` widens to also run schema validation; if either fires a finding, the build fails.

### Phase 5 quarantine rule (motion discipline)
Per `.claude/CLAUDE.md` line 33: GSAP imports are quarantined to `components/TitleCard.tsx`. PullQuote's underline-grow uses **CSS `@keyframes` + IntersectionObserver** — not GSAP. Verified at Phase 7 verify-step via grep:

```
grep -rE "import.*gsap" --include='*.ts' --include='*.tsx' . \
  | grep -v 'node_modules\|\.next\|TitleCard'
```
Expected: zero output. Phase 7 must not regress this.

---

## 4. Component split: Server vs Client

| Component | Boundary | Reason |
|---|---|---|
| `Dek` | Server | Pure presentational; no state, no effects |
| `CaseStudyStill` | Server | `next/image` is server-compatible; film-grain is CSS overlay (no JS) |
| `CopperRule` | Server | Pure `<hr>` |
| `PullQuote` | **Client** | Needs IntersectionObserver to trigger underline-grow on scroll-into-view |
| `mdx-components.tsx` | Component map | Re-exports the above; the map itself runs on both sides |
| `TitleCard` | Client (Phase 5 existing) | GSAP — already quarantined |

For PullQuote, the `'use client'` directive enables `useEffect` + `useRef`. The IntersectionObserver toggles a `data-in-view` attribute on the root; CSS keyframes drive the underline-grow from that attribute. No prop callbacks, no state in render.

The PullQuote reduced-motion branch: if `matchMedia('(prefers-reduced-motion: reduce)').matches`, the IntersectionObserver is **skipped** — the component renders with the final-state underline applied immediately. CSS reinforces via `@media (prefers-reduced-motion: reduce)` killing the animation duration as a safety net (parallels TitleCard's two-layer reduced-motion strategy).

---

## 5. Verbatim file contents — exact code Phase 7 ships

### 5.1 `lib/case-study-schema.ts` (CREATE — CASE-01)

```ts
// lib/case-study-schema.ts
//
// Phase 7 — CASE-01. Zod schema for case-study MDX frontmatter.
//
// This is the single source of truth for what a content/work/*.mdx file
// must declare in its YAML frontmatter block. The schema is invoked from:
//   - lib/case-studies.ts (runtime read for index/OG) — CASE-10
//   - lib/copy-lint-runner.ts (build-time validation) — CASE-02
//   - mdx-frontmatter.sh harness hook (write-boundary belt-and-suspenders)
//
// Required fields (per blueprint §9 ORDANI draft + ARCHITECTURE §7.3):
//   title              — display title (e.g., "ORDANI")
//   dek                — Source Serif 4 italic subtitle under the TitleCard
//   role               — Micah's role on the project (e.g., "Solo build")
//   tools              — array of tool names (e.g., ["Next.js", "Supabase"])
//   year               — string or number (allows ranges like "2025-2026")
//   status             — enum: shipped | in-flight | archived | stub
//   titleCardWords     — 3 to 6 short words for the pinned vertical stack
//
// Optional:
//   heroStill          — path to hero still rendered between Dek and body
//   client             — client name when not solo
//
// Source: REQUIREMENTS.md CASE-01; blueprint §9 ORDANI frontmatter block;
//         ARCHITECTURE.md §7.3 (architecture-recommended Zod shape, extended
//         here with status enum + client? per Phase 7 spec).
import { z } from "zod";

export const CASE_STUDY_STATUSES = ["shipped", "in-flight", "archived", "stub"] as const;
export type CaseStudyStatus = (typeof CASE_STUDY_STATUSES)[number];

export const caseStudyFrontmatterSchema = z.object({
  /** Display title rendered in the page <title> + chrome — e.g., "ORDANI". */
  title: z.string().min(1, "title is required"),

  /** Source Serif 4 italic subtitle below the TitleCard. One sentence. */
  dek: z.string().min(1, "dek is required"),

  /** Micah's role (e.g., "Solo — research, design, build, ship"). */
  role: z.string().min(1, "role is required"),

  /** Tool stack — array of strings. Renders as a comma-separated metadata line. */
  tools: z.array(z.string().min(1)).min(1, "at least one tool is required"),

  /** Year of work. String allows ranges like "2025-2026"; number allows single years. */
  year: z.union([z.string().min(1), z.number().int()]),

  /** Status enum — drives sort order in lib/case-studies.ts. */
  status: z.enum(CASE_STUDY_STATUSES),

  /** 3 to 6 short words for the TitleCard vertical word stack. */
  titleCardWords: z
    .array(z.string().min(1, "word must be non-empty"))
    .min(3, "titleCardWords requires at least 3 words")
    .max(6, "titleCardWords supports at most 6 words"),

  /** Optional path to hero still rendered between Dek and MDX body. */
  heroStill: z.string().optional(),

  /** Optional client name. Omit if solo. */
  client: z.string().optional(),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;
```

### 5.2 `lib/case-studies.ts` (UPDATE — CASE-10)

Phase 7 hardens this file. Phase 6 left it defensively parsing. Phase 7 invokes the Zod schema, returns typed frontmatter, and exposes `getCaseStudyBySlug(slug)` + `getNextCaseStudy(slug)` for the dynamic page.

```ts
// lib/case-studies.ts
//
// Phase 7 — CASE-10. Reads frontmatter from every content/work/*.mdx file via
// gray-matter and validates with the Zod schema from lib/case-study-schema.ts.
// Returns strongly-typed CaseStudyMeta entries.
//
// Phase 6 left this file with a defensive (untyped) parse and Phase 7-shaped
// fallbacks. Phase 7 replaces the defensive parse with strict Zod validation:
//   - Files that fail parse THROW with file path + Zod issue list.
//   - The throw bubbles up to lib/copy-lint-runner.ts (CASE-02 build-time gate)
//     and to the dynamic page render path (THEATER-04). Both fail clearly.
//
// Why gray-matter (not @next/mdx loader): we only need the frontmatter for
// listings, OG generation, and the page's TitleCard props. Pulling MDX
// through the compiler twice is needless. gray-matter is a project dep.
//
// Source: REQUIREMENTS.md CASE-10; ARCHITECTURE.md §7.2 (hybrid pattern —
//         gray-matter for indexes + dynamic import() for the rendered body,
//         the latter wired in (theater)/work/[slug]/page.tsx).
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import {
  caseStudyFrontmatterSchema,
  type CaseStudyFrontmatter,
} from "@/lib/case-study-schema";

export interface CaseStudyMeta extends CaseStudyFrontmatter {
  slug: string;
}

const CONTENT_DIR = "content/work";

/**
 * Read every content/work/*.mdx file, validate the frontmatter against the
 * Zod schema, and return a sorted array of CaseStudyMeta. Throws on schema
 * violations — surfaced by the build via lib/copy-lint-runner.ts.
 *
 * Sort order: status (shipped < in-flight < archived < stub), then year desc.
 * So Phase 8 published case studies bubble above the Phase 7 stub corpus.
 */
export async function getAllCaseStudies(): Promise<CaseStudyMeta[]> {
  const dir = join(process.cwd(), CONTENT_DIR);
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }

  const studies: CaseStudyMeta[] = [];

  for (const entry of entries) {
    if (!entry.endsWith(".mdx")) continue;
    const slug = entry.replace(/\.mdx$/, "");
    const filePath = join(dir, entry);
    const raw = await readFile(filePath, "utf-8");
    const { data } = matter(raw);

    const parsed = caseStudyFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((i) => `  ${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("\n");
      throw new Error(
        `[case-studies] Invalid frontmatter in ${CONTENT_DIR}/${entry}:\n${issues}`,
      );
    }

    studies.push({ slug, ...parsed.data });
  }

  const statusRank: Record<string, number> = {
    shipped: 0,
    "in-flight": 1,
    archived: 2,
    stub: 3,
  };

  return studies.sort((a, b) => {
    const rs = (statusRank[a.status] ?? 99) - (statusRank[b.status] ?? 99);
    if (rs !== 0) return rs;
    const ay = typeof a.year === "number" ? a.year : Number(String(a.year).match(/\d+/)?.[0] ?? 0);
    const by = typeof b.year === "number" ? b.year : Number(String(b.year).match(/\d+/)?.[0] ?? 0);
    return by - ay;
  });
}

/**
 * Convenience: top N for the Home selected-work strip.
 * Excludes status="stub" so Phase 7's test corpus never lands on Home.
 */
export async function getSelectedWork(limit = 3): Promise<CaseStudyMeta[]> {
  const all = await getAllCaseStudies();
  return all.filter((cs) => cs.status !== "stub").slice(0, limit);
}

/**
 * Load one case study by slug (used by the dynamic theater page).
 * Returns null if the slug is unknown — caller (page.tsx) calls notFound().
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyMeta | null> {
  const all = await getAllCaseStudies();
  return all.find((cs) => cs.slug === slug) ?? null;
}

/**
 * Return the next case study after the given slug (for the [NEXT WORK ↘] link).
 * Wraps around to the first study; returns null if only one study exists or
 * the slug is unknown.
 */
export async function getNextCaseStudy(slug: string): Promise<CaseStudyMeta | null> {
  const all = await getAllCaseStudies();
  if (all.length < 2) return null;
  const idx = all.findIndex((cs) => cs.slug === slug);
  if (idx === -1) return null;
  return all[(idx + 1) % all.length] ?? null;
}
```

**Removal note:** Phase 6's `deriveWordsFromTitle()` fallback is removed. Phase 7 mandates `titleCardWords` in every MDX file (the Zod schema enforces it). The Work index (Phase 6) and Home (Phase 6) already consume `cs.words` — they're updated by this change to consume `cs.titleCardWords` directly. Phase 7's plan 07-A handles the call-site rename in `app/(foyer)/page.tsx` and `app/(foyer)/work/page.tsx` (small grep+edit).

### 5.3 `lib/copy-lint-runner.ts` (UPDATE — CASE-02)

Extend `runCopyLint()` to also validate MDX frontmatter. Single function name preserved so `package.json` `"build"` script doesn't change.

```ts
// lib/copy-lint-runner.ts
//
// Phase 2 — COPY-03. Walks the project directories, reads each file, and
// runs scanString() from lib/copy-lint.ts. Aggregates findings and throws
// a build-failing Error if any are found.
//
// Phase 7 — CASE-02. Extends the runner with a second pass: every
// content/work/*.mdx file is parsed with gray-matter and validated against
// the Zod schema in lib/case-study-schema.ts. Schema violations throw with
// file path + Zod issue list, failing the build alongside banned-word
// violations.
//
// Why a single runner (not two CLIs): one `pnpm build` pre-step is simpler
// than two; one error report is easier to read; both gates share the
// "scan content/ + app/" walk.
//
// Why a separate file (instead of inlining in instrumentation.ts):
//   - Keeps node:fs imports out of the instrumentation register() bundle.
//   - Enables direct import from `pnpm lint:copy`.
//   - Easier to unit-test in isolation.
//
// Source: lib/copy-lint.ts (Phase 1 scanString); COPY-03 spec; CASE-02 spec.
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { scanString, type Finding } from "@/lib/copy-lint";
import { caseStudyFrontmatterSchema } from "@/lib/case-study-schema";

const SCAN_TARGETS = [
  { dir: "content", extensions: [".mdx", ".md", ".ts"] }, // case studies + content/site.ts + content/citations.ts
  { dir: "app", extensions: [".tsx", ".ts"] }, // app/**/*.tsx — page.tsx, layout.tsx, metadata exports
];

const FRONTMATTER_TARGET_DIR = "content/work";

/**
 * Recursively walk a directory, yielding absolute paths of files whose
 * extensions match any of the provided list. Skips node_modules, .next, .git.
 */
async function* walk(dir: string, extensions: string[]): AsyncGenerator<string> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      yield* walk(full, extensions);
    } else if (extensions.some((ext) => entry.endsWith(ext))) {
      yield full;
    }
  }
}

interface SchemaFinding {
  filePath: string;
  issues: string[];
}

/**
 * Validate every content/work/*.mdx frontmatter against the Zod schema.
 * Returns an array of SchemaFinding for failures.
 */
async function scanMdxFrontmatter(cwd: string): Promise<SchemaFinding[]> {
  const dir = join(cwd, FRONTMATTER_TARGET_DIR);
  const findings: SchemaFinding[] = [];

  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return findings; // directory doesn't exist yet
  }

  for (const entry of entries) {
    if (!entry.endsWith(".mdx")) continue;
    const filePath = join(dir, entry);
    const relPath = `${FRONTMATTER_TARGET_DIR}/${entry}`;
    const raw = await readFile(filePath, "utf-8");
    const { data } = matter(raw);
    const parsed = caseStudyFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => {
        const path = i.path.join(".") || "(root)";
        return `${path}: ${i.message}`;
      });
      findings.push({ filePath: relPath, issues });
    }
  }

  return findings;
}

/**
 * Scan every targeted file for banned words AND validate MDX frontmatter.
 * Throws on any finding. Phase 2 was banned-words-only; Phase 7 adds the
 * frontmatter pass.
 */
export async function runCopyLint(): Promise<void> {
  const cwd = process.cwd();
  const bannedFindings: Finding[] = [];

  for (const target of SCAN_TARGETS) {
    const root = join(cwd, target.dir);
    for await (const filePath of walk(root, target.extensions)) {
      const content = await readFile(filePath, "utf-8");
      const relPath = filePath.slice(cwd.length + 1).replace(/\\/g, "/");
      bannedFindings.push(...scanString(content, relPath, 1));
    }
  }

  const schemaFindings = await scanMdxFrontmatter(cwd);

  const errors: string[] = [];

  if (bannedFindings.length > 0) {
    errors.push(`[copy-lint] ${bannedFindings.length} banned word finding(s):`);
    for (const f of bannedFindings) {
      errors.push(`  ${f.filePath}:${f.line}:${f.column} — "${f.word}" in: "...${f.excerpt}..."`);
    }
  }

  if (schemaFindings.length > 0) {
    errors.push(
      `[case-study-schema] ${schemaFindings.length} MDX file(s) with invalid frontmatter:`,
    );
    for (const f of schemaFindings) {
      errors.push(`  ${f.filePath}:`);
      for (const issue of f.issues) {
        errors.push(`    - ${issue}`);
      }
    }
  }

  if (errors.length === 0) {
    console.log(
      `[copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.`,
    );
    return;
  }

  console.error("\n" + errors.join("\n") + "\n");

  throw new Error(
    `copy-lint: ${bannedFindings.length} banned-word + ${schemaFindings.length} schema violation(s). ` +
      `Fix the prose / frontmatter or update lib/banned.ts / lib/case-study-schema.ts. Build aborted.`,
  );
}
```

### 5.4 `mdx-components.tsx` at REPO ROOT (CREATE — CASE-07)

```tsx
// mdx-components.tsx
//
// Phase 7 — CASE-07. The MDX component map. Required at REPO ROOT (NOT
// inside app/) by @next/mdx App Router convention — placing this file
// inside app/ causes a SILENT render failure where MDX content renders
// with default HTML primitives only.
//
// Source: REQUIREMENTS.md CASE-07, SCAFF-05; ARCHITECTURE.md §7.1
//         (mdx-components.tsx — Maps img → CaseStudyStill, blockquote →
//         PullQuote, etc.); Next.js MDX Guide (2026-05-13).
//
// What this file does: every case-study MDX file (content/work/*.mdx) can
// use the listed component names WITHOUT explicit import statements. The
// MDX compiler reads this map at build time and threads the components
// into the compiled React tree.
//
// Mapped components:
//   <TitleCard>        — the signature motion (Phase 5 client wrapper)
//   <Dek>              — Source Serif 4 italic dek under the TitleCard
//   <CaseStudyStill>   — captioned still with 2px bone border + film-grain
//   <PullQuote>        — Source Serif 4 italic + copper underline-grow
//   <CopperRule>       — copper hairline divider
//
// We do NOT remap default HTML primitives (h1, h2, p, etc.) here. The MDX
// body in content/work/*.mdx uses ## Problem / ## Why it matters / etc.
// headings; CSS in app/globals.css [data-mode="theater"] styles them.
// Keeps the surface area minimal; future overrides can land in this map.
import type { MDXComponents } from "mdx/types";
import { TitleCard } from "@/components/TitleCard";
import { Dek } from "@/components/Dek";
import { CaseStudyStill } from "@/components/CaseStudyStill";
import { PullQuote } from "@/components/PullQuote";
import { CopperRule } from "@/components/CopperRule";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    TitleCard,
    Dek,
    CaseStudyStill,
    PullQuote,
    CopperRule,
  };
}
```

### 5.5 `components/Dek.tsx` (CREATE — THEATER-04 partial)

```tsx
// components/Dek.tsx
//
// Phase 7 — THEATER-04 (render order). Source Serif 4 italic subtitle
// rendered between the TitleCard and the hero still / MDX body.
//
// Pure presentational. Server component (no client boundary needed).
// Mode-aware: cream paper ink in foyer, bone ink in theater (CSS handles
// it via [data-mode] ancestor selectors).
//
// Source: REQUIREMENTS.md THEATER-04; blueprint §9 ORDANI wireframe (the
// [DEK — Tiempos] block under the TitleCard).
import type { ReactNode } from "react";

export interface DekProps {
  children: ReactNode;
}

export function Dek({ children }: DekProps) {
  return <p className="case-study-dek">{children}</p>;
}
```

### 5.6 `components/CopperRule.tsx` (CREATE — supporting THEATER-04)

```tsx
// components/CopperRule.tsx
//
// Phase 7 — Supporting CASE-07. A copper hairline rule that case-study MDX
// can drop in for section separation. Mirrors the foyer .copper-rule from
// app/globals.css (Phase 6) but for theater pages.
//
// Server component. Pure <hr>.
export function CopperRule() {
  return <hr className="case-study-copper-rule" aria-hidden="true" />;
}
```

### 5.7 `components/CaseStudyStill.tsx` (CREATE — CASE-09, THEATER-05)

```tsx
// components/CaseStudyStill.tsx
//
// Phase 7 — CASE-09, THEATER-05. Captioned dashboard still with the
// signature 2px warm off-white inner border + 4% film-grain overlay.
// Caption format: "alt — date" or "caption — date" (e.g., "Doula intake
// flow — Mar 2026") per blueprint §4c.
//
// Server component. Renders next/image with WebP/AVIF when src is present;
// renders a graceful placeholder div if src is missing (Phase 7 testing —
// real images land in Phase 8/9). Caption always renders.
//
// Image budget (CASE-09): 500KB max — enforced by harness image-budget.sh
// at the write boundary. Phase 7 does not check at runtime; we trust the
// hook.
//
// Source: REQUIREMENTS.md CASE-09, THEATER-05; blueprint §4c
// ("ORDANI product stills: dashboard screenshots placed on the dark theater
// ground with 2px warm off-white inner border and a subtle 4% film-grain
// overlay. Each one is captioned like a film still ('Doula intake flow,
// March 2026')").
import Image from "next/image";

export interface CaseStudyStillProps {
  /** Path to the still image. Optional during Phase 7 (placeholder shown). */
  src?: string;

  /** Alt text — also used as caption-prefix when caption is omitted. */
  alt: string;

  /** Optional caption — defaults to alt if omitted. */
  caption?: string;

  /** Required: ISO date "YYYY-MM" or formatted "Mon YYYY". Suffix on caption. */
  date: string;

  /** Image dimensions (next/image needs them for non-fill mode). */
  width?: number;
  height?: number;
}

/**
 * Format an ISO date "YYYY-MM" or "YYYY-MM-DD" as "Mon YYYY" (e.g., "Mar 2026").
 * If the input is already in a non-ISO format (e.g., "March 2026"), returned as-is.
 */
function formatDate(input: string): string {
  const isoMatch = input.match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);
  if (!isoMatch) return input;
  const year = isoMatch[1]!;
  const monthIdx = Number(isoMatch[2]!) - 1;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[monthIdx] ?? input;
  return `${month} ${year}`;
}

export function CaseStudyStill({
  src,
  alt,
  caption,
  date,
  width = 1440,
  height = 900,
}: CaseStudyStillProps) {
  const captionText = caption ?? alt;
  const formattedDate = formatDate(date);

  return (
    <figure className="case-study-still">
      <div className="case-study-still__frame">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="case-study-still__image"
            loading="lazy"
          />
        ) : (
          <div className="case-study-still__placeholder" aria-label={`Placeholder for ${alt}`} />
        )}
        {/* Film-grain overlay — 4% opacity (CSS) */}
        <div className="case-study-still__grain" aria-hidden="true" />
      </div>
      <figcaption className="case-study-still__caption">
        {captionText} — {formattedDate}
      </figcaption>
    </figure>
  );
}
```

### 5.8 `components/PullQuote.tsx` (CREATE — CASE-08)

```tsx
// components/PullQuote.tsx
//
// Phase 7 — CASE-08. Source Serif 4 italic pull quote with copper underline-
// grow animation that fires on scroll-into-view (2s ease). Uses
// IntersectionObserver + CSS @keyframes — NO GSAP. GSAP imports remain
// quarantined to components/TitleCard.tsx (.claude/CLAUDE.md line 33).
//
// Reduced-motion: skips the observer; renders with the final-state underline
// applied immediately. Reinforced in CSS via @media (prefers-reduced-motion:
// reduce) — two-layer safety net (parallels TitleCard's MOT-05 pattern).
//
// Source: REQUIREMENTS.md CASE-08; blueprint §9 ORDANI wireframe
// ("Pull quote has a 2-second copper underline-grow on enter").
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface PullQuoteProps {
  children: ReactNode;
  /** Attribution line (e.g., "beta user, name withheld"). Optional. */
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // MOT-05-style guard: reduced-motion users render with the final-state
    // underline immediately. Skip the observer.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className="case-study-pull-quote"
      data-in-view={inView ? "true" : "false"}
    >
      <blockquote className="case-study-pull-quote__quote">{children}</blockquote>
      {attribution ? (
        <figcaption className="case-study-pull-quote__attribution">— {attribution}</figcaption>
      ) : null}
    </figure>
  );
}
```

### 5.9 `app/(theater)/work/[slug]/page.tsx` (REPLACE — THEATER-04)

```tsx
// app/(theater)/work/[slug]/page.tsx
//
// Phase 7 — THEATER-04 render order. Replaces the Phase 4 stub.
//
// Render order per blueprint §9 ORDANI wireframe:
//   1. TitleCard (frontmatter.titleCardWords + frontmatter.dek + heroStill?)
//   2. Dek (frontmatter.dek rendered separately for the case where the
//      MDX body wants additional Source Serif 4 italic emphasis under the
//      TitleCard's own resolved caption — blueprint §9 keeps these distinct
//      in the wireframe)
//   3. Hero still (frontmatter.heroStill, if present, via CaseStudyStill)
//   4. MDX body (Problem → Why → Approach → What it became → Outcome → PullQuote)
//   5. Footer nav ([NEXT WORK ↘] [BACK TO FOYER ↗])
//
// Pattern: hybrid per ARCHITECTURE §7.2 — gray-matter for frontmatter (in
// lib/case-studies.ts), dynamic import() for the rendered MDX body.
//
// Source: REQUIREMENTS.md THEATER-04; blueprint §9 wireframe; ARCHITECTURE
// §7.1 + §7.2.
import { notFound } from "next/navigation";
import { TitleCard } from "@/components/TitleCard";
import { Dek } from "@/components/Dek";
import { CaseStudyStill } from "@/components/CaseStudyStill";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { getAllCaseStudies, getCaseStudyBySlug, getNextCaseStudy } from "@/lib/case-studies";

export async function generateStaticParams() {
  const all = await getAllCaseStudies();
  return all.map((cs) => ({ slug: cs.slug }));
}

// Allow dynamic params during dev for the Phase 7 test slug. Phase 8 case
// studies will be statically generated via the params above.
export const dynamicParams = true;

export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  // Dynamic import of the MDX body. The frontmatter is already validated
  // by getCaseStudyBySlug() above (via lib/case-studies.ts → Zod schema).
  // Per ARCHITECTURE §7.2 Pattern A — let @next/mdx handle the MDX → React
  // compilation, we just consume the default export.
  const mod = await import(`@/content/work/${slug}.mdx`);
  const MDXContent = mod.default;

  const next = await getNextCaseStudy(slug);

  return (
    <article className="case-study">
      {/* 1. TitleCard — the signature motion (Phase 5 client wrapper) */}
      <TitleCard
        words={cs.titleCardWords}
        caption={cs.dek}
        heroSrc={cs.heroStill}
        heroAlt={cs.title}
      />

      {/* 2. Dek — Source Serif 4 italic subtitle (a second beat under the
          TitleCard's own resolved caption per blueprint §9 wireframe) */}
      <header className="case-study__header">
        <Dek>{cs.dek}</Dek>
        <p className="case-study__meta">
          <span className="case-study__role">{cs.role}</span>
          <span className="case-study__dot" aria-hidden="true">·</span>
          <span className="case-study__tools">{cs.tools.join(", ")}</span>
          <span className="case-study__dot" aria-hidden="true">·</span>
          <span className="case-study__year">{cs.year}</span>
        </p>
      </header>

      {/* 3. Hero still (optional — frontmatter.heroStill) */}
      {cs.heroStill ? (
        <CaseStudyStill
          src={cs.heroStill}
          alt={`${cs.title} — hero still`}
          date={typeof cs.year === "string" ? cs.year : String(cs.year)}
        />
      ) : null}

      {/* 4. MDX body — Problem → Why → Approach → Outcome → PullQuote.
          Components like <CaseStudyStill> and <PullQuote> are wired via
          mdx-components.tsx at repo root (CASE-07). */}
      <div className="case-study__body">
        <MDXContent />
      </div>

      {/* 5. Footer nav — [NEXT WORK ↘] [BACK TO FOYER ↗] */}
      <nav className="case-study__nav" aria-label="case study navigation">
        {next ? (
          <ViewTransitionLink href={`/work/${next.slug}`} className="case-study__nav-link">
            next work ↘
          </ViewTransitionLink>
        ) : null}
        <ViewTransitionLink href="/" className="case-study__nav-link">
          back to foyer ↗
        </ViewTransitionLink>
      </nav>
    </article>
  );
}
```

**Note on viewport scrolling for TitleCard pin:** the TitleCard requires scroll runway below its viewport-fill to trigger the GSAP pin. The MDX body provides that runway naturally. For the Phase 7 test corpus where the body is short, the runway comes from the MDX paragraphs plus the trailing nav.

### 5.10 `content/work/test-slug.mdx` (UPDATE — Phase 7 test corpus)

Phase 4 wrote a minimal stub. Phase 7 updates it to exercise every MDX component without introducing banned words.

```mdx
---
title: Test slug
dek: A stub for Phase 7 MDX infrastructure verification.
role: Stub
tools: [Next.js, MDX]
year: 2026
status: stub
titleCardWords: [STUB, MDX, RENDER]
---

## Problem

A short paragraph here to verify the MDX body renders inside the theater
page after the TitleCard and Dek. Type only — no images required.

<CaseStudyStill src="/stills/placeholder.png" alt="Placeholder still" date="2026-05" />

## Why it matters

One more paragraph to test multi-section rendering.

## Approach

- One bulleted item to verify list styling
- Another bulleted item

<CopperRule />

## What it became

A second still slot below the rule.

<CaseStudyStill alt="Second placeholder" caption="What a doula sees on a Tuesday morning" date="2026-04" />

## Outcome

A short outcome paragraph.

<PullQuote attribution="stub source">
A test quote rendered in Source Serif 4 italic with copper underline-grow on scroll-in.
</PullQuote>
```

**Banned-word scrub:** the body avoids the 30-word list (no "drive", "unlock", "leverage", etc.). The harness `copy-lint.sh` write-boundary hook plus `pnpm build`'s pre-step CLI both will exercise this.

### 5.11 `app/globals.css` additions (UPDATE)

Append a new block to globals.css for the Phase 7 components. All selectors live under `[data-mode="theater"]` so they don't leak into foyer routes.

```css
/* ============================================================
 * CASE STUDY (THEATER) — Phase 7 (CASE-07, CASE-08, CASE-09,
 *   THEATER-04, THEATER-05)
 *
 * The case-study render template + reusable MDX components:
 *   .case-study              — outer article frame
 *   .case-study-dek          — <Dek> wrapper, Source Serif 4 italic
 *   .case-study-copper-rule  — <CopperRule> hairline divider
 *   .case-study-still        — <CaseStudyStill> figure
 *   .case-study-pull-quote   — <PullQuote> with underline-grow
 *
 * Source: blueprint §4c (stills + film-grain), §4f (TitleCard), §9
 * (ORDANI wireframe render order); REQUIREMENTS.md THEATER-04/05,
 * CASE-07/08/09.
 * ============================================================ */

[data-mode="theater"] .case-study {
  padding: 0 var(--spacing-page-x-mobile) 128px;
}

@media (min-width: 768px) {
  [data-mode="theater"] .case-study {
    padding: 0 var(--spacing-page-x-desktop) 160px;
  }
}

/* Header below the TitleCard — Dek + meta line */
[data-mode="theater"] .case-study__header {
  max-width: 64ch;
  margin: 64px auto 64px;
}

[data-mode="theater"] .case-study-dek {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(20px, 2.4vw, 26px);
  line-height: 1.45;
  letter-spacing: -0.005em;
  color: var(--color-theater-ink);
  margin: 0;
}

[data-mode="theater"] .case-study__meta {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--color-theater-ink-soft);
  margin: 24px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: baseline;
}

[data-mode="theater"] .case-study__dot {
  opacity: 0.55;
}

[data-mode="theater"] .case-study__role {
  color: var(--color-accent-copper);
  font-weight: 500;
}

/* MDX body — typography for h1, h2, p, ul inside the case study */
[data-mode="theater"] .case-study__body {
  max-width: 64ch;
  margin: 0 auto;
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-theater-ink);
}

[data-mode="theater"] .case-study__body h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(26px, 3.2vw, 36px);
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--color-theater-ink);
  margin: 80px 0 24px;
}

[data-mode="theater"] .case-study__body h2:first-child {
  margin-top: 0;
}

[data-mode="theater"] .case-study__body p {
  margin: 0 0 20px;
}

[data-mode="theater"] .case-study__body ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

[data-mode="theater"] .case-study__body li {
  position: relative;
  padding-left: 1.5em;
}

[data-mode="theater"] .case-study__body li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--color-accent-copper);
}

/* Copper rule divider */
[data-mode="theater"] .case-study-copper-rule {
  border: none;
  border-top: 1px solid var(--color-accent-copper);
  margin: 64px auto;
  max-width: 320px;
}

/* CaseStudyStill — figure with 2px bone inner border + 4% film-grain overlay */
[data-mode="theater"] .case-study-still {
  margin: 48px 0;
  max-width: 100%;
}

[data-mode="theater"] .case-study-still__frame {
  position: relative;
  display: block;
  background-color: var(--color-theater-surface);
  border: 2px solid var(--color-theater-ink); /* 2px warm off-white inner border per §4c */
  overflow: hidden;
}

[data-mode="theater"] .case-study-still__image {
  display: block;
  width: 100%;
  height: auto;
}

[data-mode="theater"] .case-study-still__placeholder {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-theater-surface) 85%, var(--color-theater-ink) 15%),
    color-mix(in srgb, var(--color-theater-surface) 95%, var(--color-theater-ink) 5%)
  );
}

/* 4% film-grain overlay — data URI noise per §4c */
[data-mode="theater"] .case-study-still__grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.04;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.85'/></svg>");
  background-size: 160px 160px;
}

[data-mode="theater"] .case-study-still__caption {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 15px;
  line-height: 1.5;
  color: var(--color-theater-ink-soft);
  margin: 16px 0 0;
}

/* PullQuote — Source Serif 4 italic + copper underline-grow */
[data-mode="theater"] .case-study-pull-quote {
  margin: 80px 0;
  max-width: 56ch;
}

[data-mode="theater"] .case-study-pull-quote__quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(24px, 3.4vw, 32px);
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--color-theater-ink);
  margin: 0;
  position: relative;
  padding-bottom: 16px;
}

/* The underline-grow — a copper bar that scales from 0 → full width over
   2s when the figure enters view (data-in-view="true" toggled by JS). */
[data-mode="theater"] .case-study-pull-quote__quote::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-accent-copper);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 2000ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

[data-mode="theater"]
  .case-study-pull-quote[data-in-view="true"]
  .case-study-pull-quote__quote::after {
  transform: scaleX(1);
}

[data-mode="theater"] .case-study-pull-quote__attribution {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--color-theater-ink-soft);
  margin: 24px 0 0;
}

/* Reduced-motion: skip the transition; show full underline immediately.
   Defense in depth — PullQuote.tsx also sets data-in-view="true" on first
   mount under reduced-motion. */
@media (prefers-reduced-motion: reduce) {
  [data-mode="theater"] .case-study-pull-quote__quote::after {
    transition: none !important;
    transform: scaleX(1) !important;
  }
}

/* Case study footer nav — [NEXT WORK ↘] [BACK TO FOYER ↗] */
[data-mode="theater"] .case-study__nav {
  margin-top: 128px;
  padding-top: 32px;
  border-top: 1px solid var(--color-rule-theater);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  [data-mode="theater"] .case-study__nav {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
}

[data-mode="theater"] .case-study__nav-link {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: lowercase;
  color: var(--color-accent-copper);
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
}

[data-mode="theater"] .case-study__nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: var(--color-accent-copper);
  transform: translateY(0);
  transition: transform var(--duration-hover) var(--ease-hover);
}

[data-mode="theater"] .case-study__nav-link:hover::after {
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  [data-mode="theater"] .case-study__nav-link::after {
    transition: none !important;
  }
  [data-mode="theater"] .case-study__nav-link:hover::after {
    transform: none !important;
  }
}
```

---

## 6. Verification matrix (Phase 7 verify-step)

| Check | Command | Pass criteria |
|---|---|---|
| Typecheck | `pnpm typecheck` | Zero errors |
| Banned words + frontmatter | `pnpm lint:copy` | Zero findings (banned words AND schema clean) |
| Build | `pnpm build` | Success; `/work/test-slug` listed among prerendered routes |
| GSAP quarantine | grep `import.*gsap` outside `components/TitleCard.tsx` | Zero matches |
| Dev start | `pnpm dev` | Server boots on :3000 within 6s |
| Test render | Chrome DevTools MCP: navigate to `/work/test-slug` at 1440×900 | Screenshot shows TitleCard → Dek → meta → placeholder still → MDX h2/p/ul → CopperRule → second still → PullQuote → footer nav |
| Render order | Visual inspection of the screenshot DOM | Matches blueprint §9 order (TitleCard at top, footer nav at bottom) |
| Foyer↔theater transition | MCP: navigate `/` → `/work/test-slug` | View transition fires (600ms cross-fade still works) |
| **Negative frontmatter test** | Edit `content/work/test-slug.mdx` to set `status: "invalid-enum"`; run `pnpm build` | Build fails with `[case-study-schema] content/work/test-slug.mdx: status: Invalid enum value...` |
| Restore | Edit back to `status: stub`; run `pnpm build` | Build succeeds |

The negative-frontmatter test is the **critical proof** for CASE-02 success criterion #1 ("build fails with line numbers on any mismatch"). If this passes, the Zod gate works.

---

## 7. Harness hook safety check (Phase 7-specific)

| Hook | Risk | Phase 7 mitigation |
|---|---|---|
| `copy-lint.sh` | Test MDX uses banned words | Test corpus body is scrubbed — no "drive"/"unlock"/"leverage"/"journey"/"solutions" etc. Verified by listing the 30 banned words against the body text manually. |
| `motion-discipline.sh` | PullQuote uses GSAP | PullQuote uses CSS keyframes + IntersectionObserver. No GSAP import. Verified at Phase 7 verify-step grep. |
| `font-license.sh` | New font import | Phase 7 uses Source Serif 4 (already in `lib/fonts.ts` from Phase 1). No new imports. |
| `design-tokens.sh` | Off-palette hex | Phase 7 uses `--color-accent-copper`, `--color-theater-ink`, `--color-theater-surface`, `--color-theater-ink-soft`, `--color-rule-theater`. The film-grain data URI uses `#23n` (URL escape of `#n`) which is a filter ID, not a color — not a hex literal. |
| `mdx-frontmatter.sh` | Existing hook checks required-fields; Phase 7's Zod is stricter | Both should agree on a valid file. Phase 7 verify confirms with the test corpus. |
| `image-budget.sh` | New images > 500KB | Phase 7 adds zero real images. CaseStudyStill gracefully handles missing src. |

---

## 8. Risks / unknowns

**R1: MDX dynamic import path constraints** — Next.js docs note that the path in `import('@/content/work/${slug}.mdx')` must be statically analyzable enough for the bundler. Phase 7 uses a template-literal pattern that's documented as supported. If the bundler complains, fallback is a route-level `generateStaticParams` map that imports each slug explicitly (1-1 with Phase 8 case studies).

**R2: `dynamicParams = true`** — set to `true` so Phase 7's `test-slug` (and any future slug not yet in `generateStaticParams` at deploy time) still resolves in dev. Phase 8 will land 4 real slugs; Phase 10 may flip to `dynamicParams = false` if the slug set is fully closed at deploy.

**R3: `frontmatter.year` type union (string | number)** — Phase 6 had `string | number | undefined`; Phase 7 narrows to `string | number` (required). Phase 6 home + work-index call sites currently render via `cs.year` directly — string interpolation works for both branches.

**R4: TitleCard's `heroSrc` is optional in the schema; in the page it falls back to undefined** — TitleCard's `heroSrc?: string` field handles undefined via the placeholder render in `TitleCardComposition.tsx`. No change required in the Phase 5 component.

**R5: `next/image` complaints on missing src** — `<CaseStudyStill src="/stills/placeholder.png" ...>` for the Phase 7 test MDX will trigger a 404 at runtime for the image. Mitigation: Phase 7's CaseStudyStill renders the placeholder div when `src` is undefined; the test MDX intentionally omits `src` on one of the stills to exercise the placeholder branch. The first still in the test MDX does pass `src="/stills/placeholder.png"` to verify `next/image` renders without crashing (it returns 404 on the image, but the wrapping `<figure>` renders fine; this is acceptable Phase 7 behavior — Phase 8/9 adds real files).

  → Update to test corpus: omit `src` on both stills to avoid the 404 noise in dev console. The placeholder div is what the spec asks for in Phase 7.

**R6: Lenis ↔ ScrollTrigger and IntersectionObserver coexistence** — Lenis modifies actual scroll position; IntersectionObserver reacts to `intersectionRatio`. They coexist cleanly. The Phase 5 `useLenis(() => ScrollTrigger.update())` bridge doesn't affect Observer behavior.

---

## 9. Plan inventory (07-A through 07-G)

| Plan | Wave | Files touched | REQ-IDs |
|---|---|---|---|
| 07-A — Schema + lib hardening | 1 | `lib/case-study-schema.ts` (NEW), `lib/case-studies.ts` (UPDATE), `lib/copy-lint-runner.ts` (UPDATE), call-site rename in `app/(foyer)/page.tsx` + `app/(foyer)/work/page.tsx` | CASE-01, CASE-02, CASE-10 |
| 07-B — Dek + CopperRule | 1 | `components/Dek.tsx` (NEW), `components/CopperRule.tsx` (NEW), `app/globals.css` (UPDATE — Dek + rule blocks) | THEATER-04 partial |
| 07-C — CaseStudyStill | 1 | `components/CaseStudyStill.tsx` (NEW), `app/globals.css` (UPDATE — still + film-grain) | CASE-09, THEATER-05 |
| 07-D — PullQuote | 1 | `components/PullQuote.tsx` (NEW), `app/globals.css` (UPDATE — underline-grow keyframes + reduced-motion) | CASE-08 |
| 07-E — `mdx-components.tsx` | 2 | `mdx-components.tsx` (NEW, repo root) | CASE-07 |
| 07-F — Dynamic theater page | 3 | `app/(theater)/work/[slug]/page.tsx` (UPDATE) | THEATER-04 |
| 07-G — Test MDX + verify | 4 | `content/work/test-slug.mdx` (UPDATE), `07-VERIFY-OUTPUT.md` (NEW), STATE.md (UPDATE), ROADMAP.md (UPDATE), REQUIREMENTS.md (UPDATE) | (verification) |

Dependencies:
- Wave 1 plans (07-A/B/C/D) are independent — no shared file touches except `app/globals.css`, which each appends to a distinct section. Conflict-safe.
- Wave 2 (07-E) depends on Wave 1 (imports the new components).
- Wave 3 (07-F) depends on Waves 1 (schema + helpers) and 2 (mdx-components map).
- Wave 4 (07-G) depends on all of the above.

---

## 10. Coverage check

| Phase 7 REQ-ID | Spec | Where it lands |
|---|---|---|
| CASE-01 | Zod schema for frontmatter | `lib/case-study-schema.ts` (07-A) |
| CASE-02 | Build-time validation | `lib/copy-lint-runner.ts` extension (07-A) |
| CASE-07 | mdx-components.tsx at root maps 5 components | `mdx-components.tsx` (07-E) |
| CASE-08 | PullQuote — Source Serif 4 italic + copper underline-grow | `components/PullQuote.tsx` + CSS (07-D) |
| CASE-09 | CaseStudyStill — next/image, 2px bone border, 4% grain, ≤500KB | `components/CaseStudyStill.tsx` + CSS (07-C) |
| CASE-10 | lib/case-studies.ts uses schema | `lib/case-studies.ts` rewrite (07-A) |
| THEATER-04 | Render order: TitleCard → Dek → hero → MDX → footer-links | `app/(theater)/work/[slug]/page.tsx` (07-F) + `Dek`/`CopperRule` (07-B) |
| THEATER-05 | Stills with 2px bone border + 4% grain + "name — date" caption | `components/CaseStudyStill.tsx` (07-C) |

**Coverage:** 8/8 REQ-IDs mapped to plans. ✓

| Phase 7 Success Criterion | Coverage |
|---|---|
| #1 — Schema + build-time validation | 07-A (lib/case-study-schema.ts + lib/copy-lint-runner.ts extension) |
| #2 — mdx-components.tsx at root maps 5 components | 07-E |
| #3 — Theater page render order | 07-F + 07-B + 07-C + 07-D + 07-G test MDX |
| #4 — CaseStudyStill 2px bone + 4% grain + "name — date" | 07-C |
| #5 — PullQuote underline-grow + reduced-motion | 07-D |

**Coverage:** 5/5 success criteria mapped. ✓

---

*Research compiled: 2026-05-14 for Phase 7 MDX Infrastructure*
