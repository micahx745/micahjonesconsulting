// lib/title-card-schema.ts
//
// Phase 5 — MOT-02. Zod schema for the TitleCard component props.
//
// Why a schema (not just TS types):
//   - Catches MDX frontmatter drift at render-time (Phase 7 will pipe
//     content/work/*.mdx frontmatter `titleCardWords` through this schema).
//   - Provides a single source-of-truth that the OG route also uses.
//   - The min/max bounds (3..6 words) are the blueprint §4f spec — turning
//     them into a runtime validator prevents future PRs from drifting past.
//
// Source: blueprint §4f ("three to six words"); REQUIREMENTS.md MOT-02;
//         STACK.md §"Email / Form / Data" (zod is already a project dep).
import { z } from "zod";

export const titleCardSchema = z.object({
  /** 3 to 6 short words, each non-empty. Renders as a vertical stack. */
  words: z
    .array(z.string().min(1, "word must be non-empty"))
    .min(3, "TitleCard requires at least 3 words")
    .max(6, "TitleCard supports at most 6 words"),

  /** One-sentence caption shown after the resolve. Source Serif 4 italic. */
  caption: z.string().min(1, "caption is required"),

  /** Optional path to a hero still — fades in below the caption after the resolve. */
  heroSrc: z.string().optional(),

  /** Alt text for the hero still. Required if heroSrc is set. */
  heroAlt: z.string().optional(),
});

export type TitleCardProps = z.infer<typeof titleCardSchema>;
