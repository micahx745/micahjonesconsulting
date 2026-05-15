// app/(theater)/work/[slug]/page.tsx
//
// Phase 4 — THEATER-02 (route resolves) + stub render.
//
// Phase 4 ships only the route handler skeleton — the dynamic segment
// resolves, the theater chrome paints, and a ViewTransitionLink takes the
// visitor back to foyer so the reverse cross-fade is also recordable in
// DevTools.
//
// Phase 7 (MDX Infrastructure) will replace this with the canonical reader
// that does `await import('@/content/work/${slug}.mdx')` and renders the MDX
// body. Phase 8 (Case Studies) adds `generateStaticParams` to prerender all
// four real case-study slugs at build.
//
// React 19.2 / Next.js 15.2+ moved `params` to a Promise per the App Router
// API contract — `await params` is the canonical access pattern.
//
// Source: ARCHITECTURE.md §7.2 Pattern A; REQUIREMENTS.md THEATER-02;
//         ROADMAP Phase 4 success criterion #5 (route resolves, theater
//         chrome paints — full render deferred to Phase 8).
import { ViewTransitionLink } from "@/components/view-transition-link";

export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <article>
      <p>Theater /work/{slug} (Phase 8 will replace).</p>
      <p>
        <ViewTransitionLink href="/">← back to foyer</ViewTransitionLink>
      </p>
    </article>
  );
}
