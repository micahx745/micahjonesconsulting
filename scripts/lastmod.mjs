// scripts/lastmod.mjs — Pass-121 Stage A4.
//
// Sitemap dates, generated locally and committed. The build environment's git
// history is not guaranteed (a shallow clone, or a CLI upload without .git),
// so app/sitemap.ts cannot ask git at build time (the rejected G2 §3.7
// option). Instead this script maps every sitemap route to
// `git log -1 --format=%cs -- <its source file>` — the MDX file for a study,
// the page.tsx for a static route — and writes content/lastmod.json, which
// app/sitemap.ts reads instead of new Date().
//
// Usage:
//   node scripts/lastmod.mjs          write content/lastmod.json from live git dates
//   node scripts/lastmod.mjs --check  exit 0 iff the committed JSON equals the
//                                     live git dates (exit 1, printing each
//                                     drift, otherwise)
//
// Run the writer after any commit that changes a route's source file, and
// commit the JSON with that change — the same discipline as any other gate
// fixture. Stubs are excluded, mirroring app/sitemap.ts's isPublished filter.
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const OUT = "content/lastmod.json";

const STATIC_ROUTES = {
  "/": "app/(foyer)/page.tsx",
  "/about": "app/(foyer)/about/page.tsx",
  "/full-time": "app/(foyer)/full-time/page.tsx",
  "/work": "app/(foyer)/work/page.tsx",
  "/services": "app/(foyer)/services/page.tsx",
  "/packages": "app/(foyer)/packages/page.tsx",
  "/contact": "app/(foyer)/contact/page.tsx",
  "/call": "app/(foyer)/call/page.tsx",
};

function gitDate(file) {
  return execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
    encoding: "utf8",
  }).trim();
}

function frontmatter(src) {
  const open = src.indexOf("---");
  const close = src.indexOf("---", open + 3);
  return close === -1 ? "" : src.slice(open + 3, close);
}

function studyRoutes() {
  return readdirSync("content/work")
    .filter((f) => f.endsWith(".mdx"))
    .filter((f) => !/^status:\s*stub\s*$/m.test(frontmatter(readFileSync(`content/work/${f}`, "utf8"))))
    .map((f) => [`/work/${f.replace(/\.mdx$/, "")}`, `content/work/${f}`]);
}

function buildMap() {
  const map = {};
  for (const [route, file] of Object.entries(STATIC_ROUTES)) {
    map[route] = gitDate(file);
  }
  for (const [route, file] of studyRoutes()) {
    map[route] = gitDate(file);
  }
  return map;
}

if (process.argv.includes("--check")) {
  const committed = JSON.parse(readFileSync(OUT, "utf8"));
  const live = buildMap();
  const keys = new Set([...Object.keys(committed), ...Object.keys(live)]);
  let drift = 0;
  for (const k of keys) {
    if (committed[k] !== live[k]) {
      console.error(
        `lastmod: ${k}: committed ${committed[k] ?? "(missing)"} != live ${live[k] ?? "(missing)"}`,
      );
      drift++;
    }
  }
  if (drift) {
    console.error(`lastmod: ${drift} route(s) drifted. Run: node scripts/lastmod.mjs, then commit ${OUT}.`);
    process.exit(1);
  }
  console.log("lastmod: current");
} else {
  writeFileSync(OUT, `${JSON.stringify(buildMap(), null, 2)}\n`);
  console.log(`lastmod: wrote ${OUT}`);
}
