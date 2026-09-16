// mdx-components.tsx
//
// The MDX component map. Required at REPO ROOT (not inside app/) by the
// @next/mdx App Router convention: inside app/ the map is silently ignored and
// MDX renders with default HTML primitives only.
//
// Pass-120: every content/work/*.mdx body may use these names without an import.
//   <Step>, <Exhibit>, <ExhibitRow>, <ChapterBreak>  components/study/StudyBlocks.tsx
//   <PullQuote>                                      components/PullQuote.tsx
// Headings, paragraphs and lists stay default HTML; app/globals.css styles them
// under .cs-body.
import type { MDXComponents } from "mdx/types";
import {
  ChapterBreak,
  Exhibit,
  ExhibitRow,
  Step,
} from "@/components/study/StudyBlocks";
import { PullQuote } from "@/components/PullQuote";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Step,
    Exhibit,
    ExhibitRow,
    ChapterBreak,
    PullQuote,
  };
}
