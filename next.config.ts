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
