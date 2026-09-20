// scripts/results-repeat-gate.mjs — checks the RENDERED study band, not the source.
//
// Why this exists. On 2026-09-19 the operator ruled, by popup, that the RFP
// study's Results row must "Drop the repeat, keep the rest": after the contract
// count was retired that morning, `results.lead` became "$3M in signed
// contracts.", word for word the title line standing above it in the same dark
// band, at poster size. The ruling was written into docs/LESSONS_LEARNED.md #3
// ("PASS-123 JUDGE-GATE ANSWERS") in the words "The TEMPLATE now renders
// `results.rest` only when ..." — and the template was never changed. The commit
// carrying that row touched the ledger and nothing else, so the page shipped the
// repeat for a day while the ledger said it was fixed. Two independent audit legs
// caught it on 09-20, off the built HTML, minutes before it went to the operator.
//
// The lesson is not "write the code next time": it is that a ruling recorded in
// prose and implemented in a template has no check tying the two together. This
// gate is that tie. It reads the rule off the bytes a reader receives, so the
// page and lib/title-figure.ts's `leadRepeatsTitleFigure` cannot drift apart
// without the build failing — in EITHER direction:
//
//   - a study whose lead repeats its title figure line must NOT print that lead
//     again in the Results row (the defect above);
//   - a study whose lead differs MUST still print it (so a future over-eager
//     rule cannot silently delete a Results lead the operator kept).
//
// Reads the prerendered HTML in .next/server/app/work/<slug>.html, same rationale
// as render-gate.mjs and work-entry-gate.mjs — source-level checks kept passing
// through the original defect; only the delivered bytes showed it.
//
// Runs at the END of `pnpm build`, after next build has produced the HTML, and
// after its own --self-test so a broken matcher never certifies a real page.
// Exit 1 listing every study whose rendered state contradicts the rule.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = "content/work";
const HTML_DIR = join(".next", "server", "app", "work");

// Kept byte-identical to FIGURE_RE in lib/title-figure.ts. Duplicated rather
// than imported because this gate is plain .mjs run by node with no TS loader.
// The duplication is safe in the direction that matters: if the two ever
// diverge, this gate demands a rendered state the page does not produce and the
// build fails loudly, rather than quietly agreeing with a wrong page.
const FIGURE_RE = /(\$\d[\d.,]*[KMB]?|\d{1,3}(?:,\d{3})+)([.,;:!?]*)/;

function findTitleFigureLine(lines) {
  if (!Array.isArray(lines)) return null;
  for (const line of lines) {
    if (typeof line === "string" && FIGURE_RE.test(line)) return line;
  }
  return null;
}

// Mirrors `samePhrase` in lib/title-figure.ts.
function samePhrase(a, b) {
  const reduce = (s) =>
    String(s)
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.,;:!?]+$/, "")
      .toLowerCase();
  return reduce(a) === reduce(b);
}

// --- entity decoding + visible-text reduction ----------------------------
// Numeric entities first (decimal and hex), named next, &amp; LAST so an
// already-escaped "&amp;#x27;" is never double-decoded. Same approach as
// work-entry-gate.mjs and .planning/exec/visible-text.mjs.
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// The visible text of every element matching `open` (a literal opening tag) up
// to its matching close tag, decoded and whitespace-normalised. React splits
// text across nodes and inserts <!-- --> boundaries, so comments and nested
// tags reduce to a space before the text is collapsed (LESSONS #34: never grep
// the raw HTML). Returns [] when the element is absent.
function textOf(html, open, close) {
  const out = [];
  let pos = 0;
  for (;;) {
    const start = html.indexOf(open, pos);
    if (start === -1) break;
    const from = start + open.length;
    const end = html.indexOf(close, from);
    if (end === -1) break;
    const inner = html
      .slice(from, end)
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ");
    out.push(decodeEntities(inner).replace(/\s+/g, " ").trim());
    pos = end + close.length;
  }
  return out;
}

// The Results row's lead, when the row prints one.
function resultLeads(html) {
  return textOf(html, '<span class="cs-glance__result">', "</span>");
}

// The band poster, when the lead was promoted into it instead. birth worker is
// the one study built this way (POSTER_PHRASE_SLUGS in the study template): its
// lead is not missing from the band, it IS the poster. Nested spans mean the
// naive first "</span>" is not the element's end, so this reads to the closing
// </p> and lets the tag-stripper reduce the spans inside.
function bandPosters(html) {
  return textOf(html, '<p class="cs-poster">', "</p>");
}

// Mirrors lib/case-studies.ts `isPublished`: every status except "stub".
function isPublished(data) {
  return data.status !== "stub";
}

function loadStudies() {
  const dir = join(process.cwd(), CONTENT_DIR);
  const out = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".mdx")) continue;
    const slug = name.replace(/\.mdx$/, "");
    const { data } = matter(readFileSync(join(dir, name), "utf-8"));
    if (!isPublished(data)) continue;
    const lead = data.results?.lead;
    if (typeof lead !== "string" || !lead) continue;
    out.push({
      slug,
      lead,
      titleFigureLine: findTitleFigureLine(data.titleLines),
    });
  }
  return out;
}

// --- self-test (--self-test) ----------------------------------------------
// The same matcher against in-memory snippets, including the exact defect this
// gate was written for. Any wrong answer exits 1 before a real page is judged.
function selfTest() {
  let failures = 0;
  const fail = (msg) => {
    failures++;
    console.error(`results-repeat-gate --self-test: FAIL — ${msg}`);
  };

  // 1. The real defect: rfp-engine's shipped HTML on 2026-09-20.
  const defective =
    '<h1 class="cs-title" data-title="AI RFP software: $3M in signed contracts">' +
    '<span class="cs-title__line">AI<!-- --> <!-- -->RFP<!-- --> <!-- -->software:</span>' +
    '</h1><dd><span class="cs-glance__result">$3M in signed contracts.</span> ' +
    '<span class="cs-glance__result-rest">Close rate from one in eight to one in four.</span></dd>';
  const defectiveLeads = resultLeads(defective);
  if (defectiveLeads.length !== 1)
    fail(
      `defective snippet should expose 1 result lead, got ${defectiveLeads.length}`,
    );
  if (!samePhrase(defectiveLeads[0] ?? "", "$3M in signed contracts"))
    fail(
      `defective snippet's lead should reduce to the title figure line, got "${defectiveLeads[0]}"`,
    );

  // 2. The fixed render: the lead span is gone, the rest remains.
  const fixed =
    '<dd><span class="cs-glance__result-rest">Close rate from one in eight to one in four.</span></dd>';
  if (resultLeads(fixed).length !== 0)
    fail("fixed snippet should expose 0 result leads");

  // 3. A study whose lead differs must keep its lead (the reverse defect).
  if (samePhrase("$14M in revenue, sourced and closed.", "$14M, then Akamai"))
    fail("guardicore's lead and title line must NOT compare equal");

  // 4. Punctuation, case and whitespace are ignored; content is not.
  if (!samePhrase("$3M in signed contracts.", "$3M  IN signed contracts"))
    fail(
      "samePhrase should ignore trailing punctuation, case and whitespace runs",
    );
  if (samePhrase("$3M in signed contracts", "$3M in signed contract"))
    fail("samePhrase should not equate different words");

  // 5. React's comment boundaries and entities must reduce away.
  const split =
    '<span class="cs-glance__result">$3M in<!-- --> signed<!-- --> contracts&#x27;</span>';
  if ((resultLeads(split)[0] ?? "") !== "$3M in signed contracts'")
    fail(`comment/entity reduction wrong, got "${resultLeads(split)[0]}"`);

  // 6. The poster branch: birth worker's lead is not missing, it IS the poster.
  const posterHtml =
    '<p class="cs-poster"><span class="cs-poster__lead">Bookings from one to three<!-- --> ' +
    '<span class="cs-title__nb">a month to</span></span> ' +
    '<span class="cs-num cs-num--words">five to ten.</span></p>';
  const posterText = bandPosters(posterHtml)[0] ?? "";
  if (
    !samePhrase(
      posterText,
      "Bookings from one to three a month to five to ten.",
    )
  )
    fail(`poster text should reassemble to the lead, got "${posterText}"`);
  if (resultLeads(posterHtml).length !== 0)
    fail("the poster branch should expose no Results-row lead");

  // 7. A title with no figure yields no figure line.
  if (findTitleFigureLine(["Growing a", "birth worker's practice"]) !== null)
    fail("a figureless title should yield no figure line");
  if (
    findTitleFigureLine(["AI RFP software:", "$3M in signed contracts"]) !==
    "$3M in signed contracts"
  )
    fail("the first figure-bearing line should be returned");

  if (failures) process.exit(1);
  console.log(
    "results-repeat-gate --self-test: PASS (the shipped defect is caught, the fixed render passes, a differing lead is kept)",
  );
}

// --- the gate -------------------------------------------------------------
function run() {
  const studies = loadStudies();
  if (studies.length === 0) {
    console.error(
      "results-repeat-gate: no published studies found — refusing to pass vacuously",
    );
    process.exit(1);
  }

  const problems = [];
  let repeats = 0;
  for (const { slug, lead, titleFigureLine } of studies) {
    const htmlPath = join(process.cwd(), HTML_DIR, `${slug}.html`);
    if (!existsSync(htmlPath)) {
      problems.push(`${slug}: no prerendered HTML at ${htmlPath}`);
      continue;
    }
    const html = readFileSync(htmlPath, "utf-8");
    const leads = resultLeads(html);
    const posters = bandPosters(html);
    const shouldDrop =
      titleFigureLine !== null && samePhrase(titleFigureLine, lead);

    if (shouldDrop) {
      repeats++;
      if (leads.length !== 0) {
        problems.push(
          `${slug}: results lead REPEATS the title figure line "${titleFigureLine}" ` +
            `and must not render, but the page prints "${leads[0]}" ` +
            `(operator 2026-09-19, LESSONS #3 "PASS-123 JUDGE-GATE ANSWERS")`,
        );
      } else {
        console.log(
          `results-repeat-gate: PASS ${slug} — lead repeats "${titleFigureLine}", Results row drops it`,
        );
      }
      continue;
    }

    // The lead differs from the title, so the reader must still get it — in the
    // Results row, or promoted into the band poster. Exactly one of the two,
    // never both (that would be the same repeat by another route) and never
    // neither (a lead the operator kept, silently deleted).
    const inRow = leads.filter((t) => samePhrase(t, lead)).length;
    const inPoster = posters.filter((t) => samePhrase(t, lead)).length;
    if (inRow + inPoster === 1) {
      console.log(
        `results-repeat-gate: PASS ${slug} — lead differs from the title and renders ` +
          `${inRow ? "in the Results row" : "as the band poster"}`,
      );
    } else if (inRow + inPoster === 0) {
      problems.push(
        `${slug}: results lead "${lead}" differs from the title and MUST render, but it is ` +
          `neither in the Results row (${leads.length} .cs-glance__result spans: ` +
          `${JSON.stringify(leads)}) nor the band poster (${JSON.stringify(posters)})`,
      );
    } else {
      problems.push(
        `${slug}: results lead "${lead}" renders TWICE — ${inRow} in the Results row and ` +
          `${inPoster} as the band poster; one of the two must go`,
      );
    }
  }

  if (problems.length) {
    for (const p of problems) console.error(`results-repeat-gate: FAIL ${p}`);
    process.exit(1);
  }
  console.log(
    `results-repeat-gate: ${studies.length} studies — ${repeats} drop a repeated lead, ${studies.length - repeats} keep theirs.`,
  );
}

if (process.argv.includes("--self-test")) selfTest();
else run();
