// lib/case-studies.ts
//
// Phase 6 — FOYER-08 helper (and forward-compatible with CASE-10 in Phase 7).
//
// Reads frontmatter from every content/work/*.mdx file and returns a
// strongly-typed array. The Phase 6 Home selected-work strip + Work index
// both consume this; Phase 7 will extend the schema with titleCardWords
// (3-6 words) and Phase 8 will populate it with real case studies.
//
// Why gray-matter (not @next/mdx loader): we only need the frontmatter for
// listings + OG generation. Pulling MDX through the compiler for an index
// page is needless. gray-matter is already a project dependency (declared
// for Phase 7); using it here in Phase 6 amortizes the install.
//
// Why a defensive parse (not Zod yet): Phase 7 introduces the Zod schema
// (CASE-01) and instrumentation.ts validation (CASE-02). For Phase 6, the
// frontmatter format on disk is the Phase 4 stub shape, which doesn't yet
// have titleCardWords. We derive thumbnail words from `title` when absent
// so the Work index renders correctly today AND with Phase 7's richer
// schema tomorrow.
//
// Source: REQUIREMENTS.md FOYER-08, CASE-10; ARCHITECTURE.md research
//         §"MDX data flow" — Pattern hybrid (gray-matter for indexes,
//         dynamic import() for full MDX render in Phase 7).
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export interface CaseStudyMeta {
  slug: string;
  title: string;
  dek: string;
  /** 3–6 short words for the TitleCard stack. Derived from title if frontmatter omits. */
  words: string[];
  role?: string;
  tools?: string[];
  year?: string | number;
  status?: string;
}

const CONTENT_DIR = "content/work";

/**
 * Derive a 3-word stack from a title when frontmatter `titleCardWords` is absent.
 * Phase 6 fallback. Phase 7 replaces this with a Zod-validated read.
 */
function deriveWordsFromTitle(title: string): string[] {
  const cleaned = title
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  // Pad or truncate to 3 words minimum, 6 maximum.
  if (cleaned.length >= 3) return cleaned.slice(0, 6);
  while (cleaned.length < 3) cleaned.push("CASE");
  return cleaned;
}

/**
 * Read every content/work/*.mdx file at the project root and return its
 * frontmatter as a CaseStudyMeta. Files with no frontmatter or malformed
 * YAML are skipped silently (Phase 7's Zod schema will fail the build on
 * drift; Phase 6 is intentionally tolerant so the Home renders even with
 * the Phase 4 stub).
 *
 * Sorted: status="published" first, then by year descending. Phase 6 stub
 * has status="stub" so it sorts last — when Phase 8 lands real case
 * studies with status="published", they'll naturally bubble to the top.
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
    try {
      const raw = await readFile(join(dir, entry), "utf-8");
      const { data } = matter(raw);
      const titleCardWords = Array.isArray(data.titleCardWords)
        ? (data.titleCardWords as string[])
        : undefined;
      const title: string =
        typeof data.title === "string" && data.title.length > 0 ? data.title : slug;
      studies.push({
        slug,
        title,
        dek: typeof data.dek === "string" ? data.dek : "",
        words: titleCardWords ?? deriveWordsFromTitle(title),
        role: typeof data.role === "string" ? data.role : undefined,
        tools: Array.isArray(data.tools) ? (data.tools as string[]) : undefined,
        year:
          typeof data.year === "string" || typeof data.year === "number"
            ? data.year
            : undefined,
        status: typeof data.status === "string" ? data.status : undefined,
      });
    } catch {
      // Skip unreadable files; future Phase 7 instrumentation will fail
      // the build on schema violations.
      continue;
    }
  }

  return studies.sort((a, b) => {
    const aPub = a.status === "published" ? 0 : 1;
    const bPub = b.status === "published" ? 0 : 1;
    if (aPub !== bPub) return aPub - bPub;
    const ay = typeof a.year === "number" ? a.year : Number(a.year ?? 0);
    const by = typeof b.year === "number" ? b.year : Number(b.year ?? 0);
    return by - ay;
  });
}

/**
 * Convenience: top N for the Home selected-work strip (default 3 per §7).
 */
export async function getSelectedWork(limit = 3): Promise<CaseStudyMeta[]> {
  const all = await getAllCaseStudies();
  return all.slice(0, limit);
}
