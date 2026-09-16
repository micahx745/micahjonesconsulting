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
  type PublishedCaseStudyFrontmatter,
} from "@/lib/case-study-schema";

// Pass-120: an interface cannot extend a union, so CaseStudyMeta is a type
// alias over the CaseStudyFrontmatter union (stub | published) plus slug.
// PublishedCaseStudyMeta narrows it to the published shape only.
export type CaseStudyMeta = CaseStudyFrontmatter & { slug: string };
export type PublishedCaseStudyMeta = PublishedCaseStudyFrontmatter & {
  slug: string;
};

/** True for every status except "stub". Narrows CaseStudyMeta to PublishedCaseStudyMeta. */
export function isPublished(
  cs: CaseStudyMeta,
): cs is PublishedCaseStudyMeta {
  return cs.status !== "stub";
}

const CONTENT_DIR = "content/work";

/**
 * Read every content/work/*.mdx file, validate the frontmatter against the
 * Zod schema, and return a sorted array of CaseStudyMeta. Throws on schema
 * violations — surfaced by the build via lib/copy-lint-runner.ts.
 *
 * Sort order (Pass-120): published studies by their editorial `order`
 * ascending, with `publishedAt` descending as the tie-break. Stubs carry
 * neither field and always sort last.
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

  // Pass-120: `order` is now required on every published study, so it always
  // wins. `publishedAt` (ISO, sorts correctly as a string) breaks ties
  // descending. Stubs carry neither field and sort after every published
  // study.
  return studies.sort((a, b) => {
    if (isPublished(a) && isPublished(b)) {
      if (a.order !== b.order) return a.order - b.order;
      return b.publishedAt.localeCompare(a.publishedAt);
    }
    if (isPublished(a)) return -1;
    if (isPublished(b)) return 1;
    return 0;
  });
}

/**
 * Convenience: top N for the Home selected-work strip.
 * Excludes status="stub" so Phase 7's test corpus never lands on Home.
 */
export async function getSelectedWork(
  limit = 3,
): Promise<PublishedCaseStudyMeta[]> {
  const all = await getAllCaseStudies();
  return all.filter(isPublished).slice(0, limit);
}

/**
 * Load one case study by slug (used by the dynamic theater page).
 * Returns null if the slug is unknown OR if status is "stub" — stubs
 * shouldn't be public-discoverable (Pass-8 M2). Caller (page.tsx)
 * calls notFound() when this returns null.
 */
export async function getCaseStudyBySlug(
  slug: string,
): Promise<PublishedCaseStudyMeta | null> {
  const all = await getAllCaseStudies();
  const cs = all.find((cs) => cs.slug === slug);
  if (!cs) return null;
  if (!isPublished(cs)) return null;
  return cs;
}

/**
 * Return the next case study after the given slug (for the [NEXT WORK ↘] link).
 * Wraps around to the first study; returns null if only one study exists or
 * the slug is unknown.
 *
 * EXCLUDES stubs, like getSelectedWork above. This walked the unfiltered list
 * until Pass-78, while getCaseStudyBySlug returns null for a stub and the page
 * then calls notFound(). The two disagreed, so the LAST shipped study (sorted
 * by status, stubs last) always wrapped onto the passioneer stub: the only
 * forward link on the newest case study was a 404. It resolved as a real href
 * to a real slug, so no link checker and no render-gate finding ever saw it —
 * the gate checks that a route exists, and /work/[slug] does. LESSONS #13's
 * class again: the link worked, the destination did not.
 */
export async function getNextCaseStudy(
  slug: string,
): Promise<PublishedCaseStudyMeta | null> {
  const all = (await getAllCaseStudies()).filter(isPublished);
  if (all.length < 2) return null;
  const idx = all.findIndex((cs) => cs.slug === slug);
  if (idx === -1) return null;
  return all[(idx + 1) % all.length] ?? null;
}
