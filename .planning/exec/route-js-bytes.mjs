// .planning/exec/route-js-bytes.mjs — Pass-121. Replaces "First Load JS", which Next 16 removed
// from the `next build` output (node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md).
// Sums the on-disk byte size of every distinct /_next/static/**.js file a prerendered page's HTML
// references (script src and preload links), uncompressed. Deterministic for a given build.
// Usage: node .planning/exec/route-js-bytes.mjs .next/server/app/work.html
import { readFileSync, statSync } from "node:fs";
const html = readFileSync(process.argv[2], "utf8");
const urls = [...new Set([...html.matchAll(/\/_next\/static\/[^"'\s)]+?\.js/g)].map((m) => m[0]))];
let total = 0;
for (const u of urls) total += statSync(".next" + u.slice("/_next".length)).size;
console.log(`files=${urls.length} bytes=${total} kB=${(total / 1024).toFixed(1)}`);
