// Source: https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition (2026-05-13)
//         + https://nextjs.org/docs/app/guides/mdx
//         + https://nextjs.org/docs/app/api-reference/config/next-config-js/pageExtensions
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .mdx and .md files to be treated as page modules
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Pin Turbopack's workspace root to this project so it ignores a stray
  // ~/package-lock.json that exists upstream on the dev machine.
  turbopack: {
    root: __dirname,
  },

  experimental: {
    viewTransition: true,
  },

  // 301 redirects for slug renames.
  async redirects() {
    return [
      {
        source: "/work/akamai",
        destination: "/work/guardicore",
        permanent: true,
      },
      // Pass-57 (operator 2026-09-01: "you click hire me and it takes me
      // to this weird page — maybe go to the new services page"). The
      // /hire-me landing is retired; /services carries the four shapes.
      {
        source: "/hire-me",
        destination: "/services",
        permanent: true,
      },
      // Pass-60 (operator 2026-09-01): the single author case study is split
      // into /work/content-engine and /work/rfp-engine. The old page is
      // retired rather than kept, because it carried both the sector wording
      // and the same 8,000-to-290,000 figures as the new pair — a reader
      // could match one to the other and recover the client's sector, which
      // is the exact de-identification the split exists to perform.
      {
        source: "/work/hr-equity-author",
        destination: "/work/rfp-engine",
        permanent: true,
      },
      // Pass-67: /services/ai-engineering retired. It was a 355-word sub-page
      // covering the same ground as service 03 on /services, so the two split
      // authority on a site that has none to spare. Its one distinct idea (what
      // "production-grade" means) folded into that service's outcomes, and its
      // bridge to the book moved onto /services, which had linked to /playbook
      // zero times since the Pass-56 rebuild.
      {
        source: "/services/ai-engineering",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Phase 7 — MDX plugins for case-study rendering. Turbopack requires
  // plugins to be passed as strings (or [string, options] tuples) so they're
  // serializable across the worker boundary — direct module references fail
  // with "does not have serializable options".
  //   - remark-frontmatter: parses YAML frontmatter as a metadata node so it
  //     does NOT render as content. lib/case-studies.ts still reads the
  //     frontmatter separately via gray-matter (CASE-10).
  //   - remark-gfm: GitHub Flavored Markdown (tables, strikethrough, task
  //     lists) for Phase 8 case-study tables.
  options: {
    remarkPlugins: [["remark-frontmatter", ["yaml"]], "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
