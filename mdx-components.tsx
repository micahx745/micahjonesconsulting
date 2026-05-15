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
