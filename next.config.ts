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

  // Enable React's <ViewTransition> primitive for foyer↔theater route navigation.
  // The component itself is imported from 'react' (not 'next') in app/layout.tsx (wired in Phase 2).
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({
  // MDX plugins are silent for Phase 1 — Phase 7 enables remark-gfm for case-study tables.
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
