// app/(theater)/work/[slug]/page.tsx
//
// Phase 4 stub + Phase 5 TitleCard integration.
//
// Phase 5 replaces the stub paragraph with a real <TitleCard /> render so
// the signature motion is verifiable end-to-end on /work/test-slug. The
// route still uses the stub frontmatter from content/work/test-slug.mdx
// in Phase 7 — for Phase 5 we hard-code the props here as a stand-in.
//
// Phase 7 (MDX Infrastructure) will replace the hard-coded props with a
// frontmatter read of `titleCardWords` + `dek` from the MDX file. Phase 8
// fills in real case studies.
//
// Source: REQUIREMENTS.md MOT-03 (component composes correctly on a real
//         route); ROADMAP Phase 5 success criterion #1 (standalone test
//         route renders <TitleCard words={...} />).
import { TitleCard } from "@/components/TitleCard";
import { ViewTransitionLink } from "@/components/view-transition-link";

// Stub data for Phase 5. Phase 7 replaces this with frontmatter from
// content/work/[slug].mdx; Phase 8 fills in real case studies.
type StubEntry = { words: string[]; caption: string };

const STUB_DATA: Record<string, StubEntry> = {
  "test-slug": {
    words: ["ORDANI", "INTAKE.", "SECURE.", "SHIPPED."],
    caption: "A HIPAA-compliant CRM for birth workers.",
  },
};

export default async function TheaterCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data: StubEntry = STUB_DATA[slug] ?? {
    words: ["TEST", "ROUTE", "STUB"],
    caption: `Slug: ${slug}`,
  };

  return (
    <article>
      <TitleCard words={data.words} caption={data.caption} />

      {/* Trailing content for scroll runway — needed so the user can scroll
          past the pin and see the resolve. Phase 8 replaces with MDX. */}
      <section style={{ minHeight: "100vh", padding: "128px 32px" }}>
        <p>
          <ViewTransitionLink href="/">back to foyer</ViewTransitionLink>
        </p>
      </section>
    </article>
  );
}
