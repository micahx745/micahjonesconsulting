// scripts/accent-states-lint.mjs — the accent-in-states gate, mechanical.
//
// WHY THIS EXISTS (LESSONS #19, Pass-110). The world gate
// (scripts/axe-worlds.mjs) measures the RESTING state, so it cannot see
// :hover or :focus-visible. The Pass-109 review found .cw-mlink's hover
// and focus swapping text to --cw-accent — 2.39:1 on the terracotta hero
// against the 3:1 a focus indicator needs — and no run of that gate
// could have caught it. Until this lint, those states were checked by a
// human reading the CSS, which is the "style rule only a human counts"
// failure (LESSONS #11). Pass-110 swept the six live offenders and wrote
// this gate the same day, per the every-catch-gets-a-gate rule.
//
// WHAT IS GATED. Any rule that (a) applies on a WorldSwitcher page — its
// selector contains [data-mode="cw"] (including inside an :is( group) or
// names no data-mode at all,
// (b) is a state rule — the selector contains :hover, :focus,
// :focus-visible or :focus-within, and (c) declares ANY painted property
// whose value reaches --cw-accent, directly or through custom properties.
// Theater-only selectors are out of scope: that mode pins one palette,
// and its saffron link states are deliberate.
//
// WHY "ANY PROPERTY" (Pass-110 review, 2026-09-11). The first version kept
// a whitelist of properties (color, border-color, outline and a few more).
// A probe planted nine cases and it missed five: the border and
// border-bottom shorthands, the text-decoration shorthand, SVG fill, and
// the accent reached through another custom property (--x: var(--cw-accent)
// then color: var(--x)). A whitelist is a list of the ways the author has
// thought of, and the trap does not care which property carries it. So the
// lint now flags every declaration except custom-property definitions, and
// resolves custom properties to a fixed point before it looks. It also
// runs a self-test on every build (below): if a future edit weakens it so
// that any planted case gets through, the build fails before it lints.
//
// The Pass-110 review workflow then broke the first version twice more:
// native nesting with a comma list (`.x { &, &:hover { ... } }`) printed
// "clean", because the parent was glued onto an unsplit child list and the
// state branch lost its [data-mode] scope; and a rule with NO mode scope at
// all was ignored, though it applies on every Color Worlds page. Nesting is
// now expanded branch by branch with & resolved, an unscoped branch counts
// as in scope, and only a branch scoped solely to another mode is exempt.
// Every finding reports the line where its rule's selector starts.
//
// The fix grammar, when this fires (the Pass-109 .cw-mlink reference):
// keep the text colour (inherit), thicken or underline with currentColor,
// and let the focus ring follow --cw-fg.
//
// USAGE
//   node scripts/accent-states-lint.mjs              lint app/globals.css
//   node scripts/accent-states-lint.mjs <file.css>   lint another file
//   node scripts/accent-states-lint.mjs --self-test  prove the lint on a probe
// Runs in `pnpm build` (self-test, then the real file) after
// retired-phrases-gate.mjs. Exit 1 with line number and selector on any find.
import { readFileSync } from "node:fs";

const STATE_RE = /:hover|:focus/;
const MODE_RE = /\[\s*data-mode\s*=\s*["']?([a-z-]+)["']?\s*\]/g;

// In scope unless every data-mode the branch names is some other mode.
// No data-mode at all means the rule applies on Color Worlds pages too.
function inScope(branch) {
  const modes = [...branch.matchAll(MODE_RE)].map((m) => m[1]);
  return modes.length === 0 || modes.includes("cw");
}

// Split a selector list on commas outside parentheses.
function splitList(sel) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let k = 0; k < sel.length; k++) {
    const ch = sel[k];
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    else if (ch === "," && depth === 0) {
      out.push(sel.slice(start, k));
      start = k + 1;
    }
  }
  out.push(sel.slice(start));
  return out.map((s) => s.trim()).filter(Boolean);
}

// Native nesting: every parent branch times every child branch, with &
// resolved to the parent (or a descendant combinator when there is no &).
function expand(parents, prelude) {
  const kids = splitList(prelude);
  if (!parents) return kids;
  const out = [];
  for (const p of parents) {
    for (const k of kids)
      out.push(k.includes("&") ? k.replace(/&/g, p) : `${p} ${k}`);
  }
  return out;
}

// Strip /* */ comments, blanking non-newline characters so line numbers
// stay true (same contract as the sibling gates' stripper).
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}

// Walk the stylesheet, emitting every style rule (at-rule conditionals
// recursed into, @keyframes et al. skipped, native nesting prefixed).
function collectRules(src) {
  const rules = [];
  function scan(start, end, parents) {
    let i = start;
    let seg = start;
    while (i < end) {
      if (src[i] === "{") {
        const raw = src.slice(seg, i);
        const prelude = raw.trim();
        // Point at the selector's first character, not at the newline that
        // precedes it: the first version reported some lines one early.
        const lead = raw.length - raw.trimStart().length;
        let d = 1;
        let j = i + 1;
        while (j < end && d > 0) {
          if (src[j] === "{") d++;
          else if (src[j] === "}") d--;
          j++;
        }
        const bodyStart = i + 1;
        const bodyEnd = j - 1;
        if (prelude.startsWith("@")) {
          const name = prelude.slice(1).match(/^[a-zA-Z-]+/)?.[0] ?? "";
          if (
            ["media", "supports", "layer", "container", "scope"].includes(name)
          ) {
            scan(bodyStart, bodyEnd, parents);
          }
          // @keyframes, @font-face, @property: contents are not selectors.
        } else if (prelude) {
          const branches = expand(parents, prelude);
          rules.push({ branches, offset: seg + lead, bodyStart, bodyEnd });
          scan(bodyStart, bodyEnd, branches);
        }
        i = j;
        seg = i;
      } else {
        i++;
      }
    }
  }
  scan(0, src.length, null);
  return rules;
}

// A rule body can hold native-nested blocks; blank them so nested
// declarations are never miscounted as the parent's (the nested rules
// are reported on their own by collectRules).
function topLevelDeclarations(src, bodyStart, bodyEnd) {
  const body = src.slice(bodyStart, bodyEnd);
  return body
    .replace(/\{[^{}]*\}/g, ";")
    .split(";")
    .map((decl) => {
      const colon = decl.indexOf(":");
      if (colon === -1) return null;
      return [decl.slice(0, colon).trim().toLowerCase(), decl.slice(colon + 1)];
    })
    .filter(Boolean);
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");
const refs = (value, name) =>
  new RegExp(`var\\(\\s*${escapeRe(name)}(?![\\w-])`).test(value);

// Every custom property that reaches --cw-accent, followed to a fixed point:
// --x: var(--cw-accent); --y: var(--x); then var(--y) is the accent too.
function accentNames(src, rules) {
  const defs = [];
  for (const r of rules) {
    for (const [prop, value] of topLevelDeclarations(
      src,
      r.bodyStart,
      r.bodyEnd,
    )) {
      if (prop.startsWith("--")) defs.push([prop, value]);
    }
  }
  const names = new Set(["--cw-accent"]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const [prop, value] of defs) {
      if (names.has(prop)) continue;
      for (const n of names) {
        if (refs(value, n)) {
          names.add(prop);
          grew = true;
          break;
        }
      }
    }
  }
  return names;
}

const lineAt = (src, offset) => src.slice(0, offset).split("\n").length;

// Returns [{ line, selector, props }] for every offending selector.
function lint(rawSrc) {
  const src = stripComments(rawSrc);
  const rules = collectRules(src);
  const names = accentNames(src, rules);
  const reachesAccent = (value) => [...names].some((n) => refs(value, n));
  const found = [];
  for (const rule of rules) {
    const offenders = rule.branches.filter(
      (b) => inScope(b) && STATE_RE.test(b),
    );
    if (!offenders.length) continue;

    const badProps = topLevelDeclarations(src, rule.bodyStart, rule.bodyEnd)
      .filter(([prop, value]) => !prop.startsWith("--") && reachesAccent(value))
      .map(([prop]) => prop);
    if (!badProps.length) continue;

    const line = lineAt(src, rule.offset);
    for (const sel of offenders)
      found.push({ line, selector: sel, props: badProps });
  }
  return found;
}

// The probe. Every POSITIVE selector must be reported; no NEGATIVE may be.
const PROBE = `
[data-mode="cw"] .pos-color:hover { color: var(--cw-accent); }
[data-mode="cw"] .pos-border-shorthand:hover { border-bottom: 1px solid var(--cw-accent); }
[data-mode="cw"] .pos-border-all:focus { border: 2px solid var(--cw-accent); }
[data-mode="cw"] .pos-text-decoration:focus-visible { text-decoration: underline var(--cw-accent); }
[data-mode="cw"] .pos-svg-fill:hover { fill: var(--cw-accent); }
[data-mode="cw"] .pos-outline:focus-visible { outline: 2px solid var(--cw-accent); }
[data-mode="cw"] .pos-gradient:hover { background-image: linear-gradient(var(--cw-accent), transparent); }
[data-mode="cw"] { --probe-x: var(--cw-accent); --probe-y: var(--probe-x); }
[data-mode="cw"] .pos-indirect:hover { color: var(--probe-y); }
[data-mode="cw"] .pos-color-mix:hover { color: color-mix(in srgb, var(--cw-accent) 80%, white); }
@media (min-width: 1px) { [data-mode="cw"] .pos-in-media:hover { color: var(--cw-accent); } }
:is([data-mode="cw"], [data-mode="theater"]) .pos-is-group:hover { color: var(--cw-accent); }
[data-mode="cw"]
  .pos-multiline:hover { color: var(--cw-accent); }
[data-mode="cw"] .pos-nested-list { &, &:hover { color: var(--cw-accent); } }
.pos-nested-reverse { &:hover, [data-mode="cw"] & { color: var(--cw-accent); } }
.pos-unscoped:hover { color: var(--cw-accent); }
[data-mode="cw"] .pos-nested-plain { &:focus-visible { outline-color: var(--cw-accent); } }
[data-mode="theater"] .neg-theater-only:hover { color: var(--cw-accent); }
[data-mode="foyer"] .neg-foyer-only:focus { color: var(--cw-accent); }
[data-mode="theater"] .neg-nested-theater { &:hover { color: var(--cw-accent); } }
[data-mode="cw"] .neg-fg-pair:hover { color: var(--cw-fg); background: var(--cw-bg); }
[data-mode="cw"] .neg-resting { color: var(--cw-accent); }
[data-mode="cw"] .neg-similar-name:hover { color: var(--cw-accent-deep); }
[data-mode="cw"] .neg-defines-only:hover { --probe-z: var(--cw-accent); }
`;

if (process.argv[2] === "--self-test") {
  const hits = lint(PROBE).map((f) => f.selector);
  const pos = [...PROBE.matchAll(/\.(pos-[a-z-]+)/g)].map((m) => m[1]);
  const neg = [...PROBE.matchAll(/\.(neg-[a-z-]+)/g)].map((m) => m[1]);
  const missed = [...new Set(pos)].filter(
    (p) => !hits.some((h) => h.includes(`.${p}`)),
  );
  const alarms = [...new Set(neg)].filter((n) =>
    hits.some((h) => h.includes(`.${n}`)),
  );
  if (missed.length || alarms.length) {
    if (missed.length)
      console.error(
        `accent-states-lint self-test: MISSED ${missed.join(", ")}`,
      );
    if (alarms.length)
      console.error(
        `accent-states-lint self-test: FALSE ALARM on ${alarms.join(", ")}`,
      );
    console.error(
      "accent-states-lint self-test FAILED: the gate is weaker than its contract. Fix the lint before trusting it.",
    );
    process.exit(1);
  }
  console.log(
    `accent-states-lint self-test: ${new Set(pos).size}/${new Set(pos).size} planted cases caught, 0 false alarms`,
  );
  process.exit(0);
}

const CSS_PATH = process.argv[2] ?? "app/globals.css";
const findings = lint(readFileSync(CSS_PATH, "utf8"));
for (const f of findings) {
  console.error(
    `accent-states-lint: ${CSS_PATH}:${f.line}: "${f.selector}" paints --cw-accent into ${f.props.join(", ")} in a hover/focus state (LESSONS #19 — use the fg/bg pair; see the Pass-109 .cw-mlink fix)`,
  );
}
if (findings.length) {
  console.error(
    `\naccent-states-lint: ${findings.length} finding(s). --cw-accent is the one token whose contrast is not guaranteed across the four worlds (2.05:1 on petrol, 2.39:1 on bone). Fix the state to the fg/bg grammar, or re-point it at --cw-fg/currentColor — never route around the gate.`,
  );
  process.exit(1);
}
console.log("accent-states-lint: clean");
