// scripts/render-gate.mjs — checks the RENDERED output, not the source.
//
// Why this exists (Pass-74). /playbook carried a link reading "Fixed-price
// packages" that pointed at /services#packages. Pass-70 had moved the packages
// to their own page, so the anchor no longer existed. The link still RESOLVED:
// /services returned 200, the browser just sat at the top of a page with no
// packages on it. No 404, no build error, no link checker in this repo would
// ever have seen it. It shipped wrong and stayed wrong until the operator asked
// about it by hand.
//
// That is the whole class: a moved or renamed section leaves behind links that
// are live, resolving, and pointing at nothing. Fixing the one instance without
// adding the gate is an incomplete fix.
//
// Two checks, both read the prerendered HTML in .next/server/app, because that
// is what a reader actually receives. Source-level checking would have to guess
// at route resolution and would miss anything a component injects.
//
//   LINKS  every internal href, and every fragment in one, lands somewhere real
//   META   <title> and <meta description> stay inside what Google will show
//
// Runs at the END of `pnpm build`, after next build has produced the HTML.
// Exit 1 with route + detail on any finding.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(".next", "server", "app");

// Routes that are real but produce no .html file: text/xml handlers and the API.
// Anything under /api/ is skipped outright rather than listed.
const NON_HTML_ROUTES = new Set(["/llms.txt", "/robots.txt", "/sitemap.xml"]);

// Google truncates on pixel width, not characters, so these are the usual
// character proxies rather than hard limits. Over them, the tail is invisible.
const TITLE_MAX = 60;
const DESC_MAX = 160;

if (!existsSync(APP_DIR)) {
  console.error(
    "render-gate: no " + APP_DIR + " — run this after next build, not before.",
  );
  process.exit(1);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (name.endsWith(".html")) yield full;
  }
}

// .next/server/app/work/guardicore.html -> /work/guardicore
// .next/server/app/index.html           -> /
function routeOf(file) {
  const rel = relative(APP_DIR, file).split(sep).join("/");
  const path = rel.slice(0, -".html".length);
  return path === "index" ? "/" : "/" + path;
}

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// A 301 target is a legitimate link destination even though it renders no page
// of its own. Read the sources straight out of next.config.ts so the gate can
// never drift from the redirect table.
function redirectSources() {
  const out = new Set();
  if (!existsSync("next.config.ts")) return out;
  const cfg = readFileSync("next.config.ts", "utf8");
  for (const m of cfg.matchAll(/source:\s*"([^"]+)"/g)) out.add(m[1]);
  return out;
}

const pages = new Map(); // route -> { ids:Set, links:[], title, desc }

for (const file of walk(APP_DIR)) {
  const route = routeOf(file);
  // _not-found and _global-error are framework pages, not site routes.
  if (route.split("/").pop().startsWith("_")) continue;

  const html = readFileSync(file, "utf8");

  const ids = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);

  const links = [];
  for (const m of html.matchAll(/\shref="([^"#][^"]*)?(#[^"]*)?"/g)) {
    const raw = (m[1] || "") + (m[2] || "");
    if (!raw) continue;
    links.push(raw);
  }

  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const d = html.match(/<meta name="description" content="([\s\S]*?)"/);
  const r = html.match(/<meta name="robots" content="([^"]*)"/);

  pages.set(route, {
    ids,
    links,
    title: t ? decodeEntities(t[1]) : null,
    desc: d ? decodeEntities(d[1]) : null,
    // A noindex page never appears in a result, so SERP truncation cannot
    // happen to it. The thanks pages and the passioneer stub inherit the
    // site-wide fallback description and are all noindex — flagging those
    // would be three standing false positives, and a gate that cries wolf
    // gets switched off. Links on them are still checked: a reader can
    // reach a noindex page and click.
    noindex: r ? /noindex/i.test(r[1]) : false,
  });
}

const REDIRECTS = redirectSources();
const findings = [];

for (const [route, page] of pages) {
  // ---- LINKS ----
  for (const href of page.links) {
    // Same-page fragment: check against this page's own ids.
    if (href.startsWith("#")) {
      const frag = decodeURIComponent(href.slice(1));
      if (frag && !page.ids.has(frag)) {
        findings.push([route, 'href="' + href + '" — no element with that id on this page']);
      }
      continue;
    }

    if (!href.startsWith("/")) continue; // external, mailto:, tel:
    if (href.startsWith("//")) continue; // protocol-relative external
    if (href.startsWith("/api/")) continue;

    const [pathRaw, fragRaw] = href.split("#");
    const path = pathRaw.split("?")[0].replace(/(.)\/$/, "$1");
    const frag = fragRaw ? decodeURIComponent(fragRaw) : null;

    // Files served from /public (images, the PDF) are not routes.
    if (/\.[a-z0-9]{2,5}$/i.test(path) && !NON_HTML_ROUTES.has(path)) continue;

    if (!pages.has(path)) {
      if (NON_HTML_ROUTES.has(path) || REDIRECTS.has(path)) continue;
      findings.push([route, 'href="' + href + '" — no such route']);
      continue;
    }

    if (frag && !pages.get(path).ids.has(frag)) {
      findings.push([
        route,
        'href="' + href + '" — ' + path + " renders, but has no id=\"" + frag + '"',
      ]);
    }
  }

  // ---- META ----
  if (page.noindex) continue;

  if (page.title === null) {
    findings.push([route, "no <title>"]);
  } else if (page.title.length > TITLE_MAX) {
    findings.push([
      route,
      "title is " + page.title.length + " chars, over " + TITLE_MAX + " — Google cuts the tail",
    ]);
  }

  if (page.desc === null) {
    findings.push([route, "no meta description"]);
  } else if (page.desc.length > DESC_MAX) {
    findings.push([
      route,
      "description is " + page.desc.length + " chars, over " + DESC_MAX,
    ]);
  }
}

if (findings.length) {
  console.error("\nrender-gate: " + findings.length + " finding(s)\n");
  for (const [route, msg] of findings) {
    console.error("  " + route.padEnd(22) + msg);
  }
  console.error("");
  process.exit(1);
}

console.log(
  "render-gate: " + pages.size + " routes — links resolve, fragments exist, metadata within limits.",
);
