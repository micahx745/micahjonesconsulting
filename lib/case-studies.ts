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

  // Pass-61: an explicit `order` wins over everything. The status-then-year
  // sort is a reasonable default and a poor editor: it ranked the
  // name-protected author engagement above the Akamai acquisition purely
  // because 2024 is later than 2021, so the strongest receipt on the site
  // opened below the fold. Which engagement leads is an editorial call, so it
  // is written in frontmatter. Studies without `order` keep the old behaviour
  // and sort after every study that has one.
  return studies.sort((a, b) => {
    if (a.order !== undefined || b.order !== undefined) {
      return (a.order ?? Infinity) - (b.order ?? Infinity);
    }
    const rs = (statusRank[a.status] ?? 99) - (statusRank[b.status] ?? 99);
    if (rs !== 0) return rs;
    const ay =
      typeof a.year === "number"
        ? a.year
        : Number(String(a.year).match(/\d+/)?.[0] ?? 0);
    const by =
      typeof b.year === "number"
        ? b.year
        : Number(String(b.year).match(/\d+/)?.[0] ?? 0);
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
 * Returns null if the slug is unknown OR if status is "stub" — stubs
 * shouldn't be public-discoverable (Pass-8 M2). Caller (page.tsx)
 * calls notFound() when this returns null.
 */
export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyMeta | null> {
  const all = await getAllCaseStudies();
  const cs = all.find((cs) => cs.slug === slug);
  if (!cs) return null;
  if (cs.status === "stub") return null;
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
): Promise<CaseStudyMeta | null> {
  const all = (await getAllCaseStudies()).filter((cs) => cs.status !== "stub");
  if (all.length < 2) return null;
  const idx = all.findIndex((cs) => cs.slug === slug);
  if (idx === -1) return null;
  return all[(idx + 1) % all.length] ?? null;
}
