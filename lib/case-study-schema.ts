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
