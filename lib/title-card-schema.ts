// lib/title-card-schema.ts
//
// Pass-120. Props for the TitleCard settle entrance. The pinned word stack and its
// frontmatter word list are retired (operator signed 2026-09-16). The title is the words:
// the band's h1 text is `title`, and `lines` are the spans that settle in.
import { z } from "zod";

export const titleCardSchema = z.object({
  /** The full search title; the h1's accessible text. */
  title: z.string().min(1),
  /** 1 to 3 lines; joined with one space they equal title. */
  lines: z.array(z.string().min(1)).min(1).max(3),
});

export type TitleCardProps = z.infer<typeof titleCardSchema>;
