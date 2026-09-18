// lib/case-study-schema.ts
//
// Pass-120. Zod schema for content/work/*.mdx frontmatter, the Direction B spine.
// Invoked from lib/case-studies.ts (runtime) and lib/copy-lint-runner.ts (build gate).
//
// Two shapes. A stub (status "stub") carries title, dek and status only and never renders.
// A published study carries everything the dark band, the at-a-glance block, the /work entry
// and the close need. Both are strict: any leftover retired key (the Pass-58/61 index
// fields, the tenure field, the tool list, the word stack) fails the build.
//
// Rulings: LESSONS #3, 2026-09-15 and 2026-09-16 rows. No personal year renders anywhere.
// publishedAt is the release date of the page (hidden: JSON-LD and sort only),
// never a tenure year.
import { z } from "zod";

export const CASE_STUDY_STATUSES = [
  "shipped",
  "in-flight",
  "archived",
  "stub",
] as const;
export type CaseStudyStatus = (typeof CASE_STUDY_STATUSES)[number];

/** The three /services areas. Labels equal the SERVICES titles in app/(foyer)/services/page.tsx. */
export const SERVICE_SLUGS = [
  "ai-engineering",
  "product-building",
  "positioning-gtm",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  "ai-engineering": "AI engineering",
  "product-building": "Product building",
  "positioning-gtm": "Positioning & GTM",
};

/** A tenure range such as 2018-2021 or 2018–2021. Never allowed in any frontmatter string. */
const TENURE_RANGE = /\b(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}\b/;

const text = z
  .string()
  .min(1)
  .refine((s) => !TENURE_RANGE.test(s), "no year ranges (LESSONS #3, no personal years)");

const photo = z.strictObject({
  src: z.string().regex(/^\/(media\/)?[a-z0-9-]+\.(jpg|jpeg|png|avif|webp)$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: text,
});

export const stubCaseStudySchema = z.strictObject({
  title: text,
  dek: text,
  status: z.literal("stub"),
});

export const publishedCaseStudySchema = z
  .strictObject({
    /** The search title. It renders as the visible h1 and is the page <title>. */
    title: text,
    /** The same title split into the lines the settle entrance animates. Joined with one space they equal title. */
    titleLines: z.array(text).min(1).max(3),
    /** Meta and JSON-LD description. At most 175 characters (the approved ORDANI description is 169).
     * Pass-121 (2026-09-18): 155 -> 175. The cap follows the operator ruling in LESSONS #3, ORDANI
     * DESCRIPTION KEEPS "HIPAA-COMPLIANT" (the approved description is 169 characters and stays
     * whole); clampDescription still guards the served meta description when one runs long. */
    description: text.refine((s) => s.length <= 175, "description is at most 175 characters"),
    /** The dek under the title in the dark band. */
    dek: text,
    /** The client as the page names it, with no trailing period. */
    client: text,
    /** true renders the mono label "Name protected" after the client. */
    clientNameProtected: z.boolean(),
    /** The at-a-glance rows between Client (from client) and Results (from results). */
    atAGlance: z.array(z.strictObject({ label: text, value: text })).min(1).max(3),
    /** The Results row: lead renders at the 36 size, rest beneath it at body size. */
    results: z.strictObject({ lead: text, rest: text }),
    /** The /work entry. Pass-121: figure (the numeral set at display size on /work and in the
     * study's figure moment) is required on order 1 and allowed on any study that carries one.
     * figurePhrase names the phrase the circle lifts on a words-figure; it must be a substring
     * of line (Stage D check D2b). */
    entry: z.strictObject({
      context: text,
      figure: text.optional(),
      line: text,
      did: text,
      figurePhrase: text.optional(),
    }),
    /** The /services area the close and the /work entry route to. */
    service: z.enum(SERVICE_SLUGS),
    /** Hidden. ISO release date of the page (LESSONS #3, RELEASE DAY). JSON-LD datePublished and the fallback sort only. */
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(["shipped", "in-flight", "archived"]),
    /** /work position and the Next order, ascending, unique. */
    order: z.number().int().positive(),
    /** The band photograph, where a real, cleared photograph exists. No caption field exists anywhere. */
    hero: photo.optional(),
  })
  .superRefine((cs, ctx) => {
    if (cs.titleLines.join(" ") !== cs.title) {
      ctx.addIssue({ code: "custom", path: ["titleLines"], message: "titleLines joined with one space must equal title" });
    }
    // Pass-121: order 1 (the doorway study) must carry a figure; other studies may.
    if (cs.order === 1 && cs.entry.figure === undefined) {
      ctx.addIssue({ code: "custom", path: ["entry", "figure"], message: "entry.figure is required on order 1" });
    }
  });

export const caseStudyFrontmatterSchema = z.union([
  stubCaseStudySchema,
  publishedCaseStudySchema,
]);

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;
export type PublishedCaseStudyFrontmatter = z.infer<typeof publishedCaseStudySchema>;
