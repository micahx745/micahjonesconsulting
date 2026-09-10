#!/usr/bin/env node
// scripts/axe-worlds.mjs: the cross-fade contrast gate (LESSONS #19).
//
// WHY THIS EXISTS. Every page that mounts WorldSwitcher cross-fades ONE global
// palette as sections cross the viewport centre: --cw-bg / --cw-fg / --cw-accent
// are written onto the [data-mode="cw"] root, so every element on the page sits
// on whichever world is centred at that moment. A fixed colour, an opacity on
// text, or a fill taken from --cw-accent passes a static look on one world and
// fails on another. That trap bit three times in two days (19 serious failures
// on the exit record, 3 on .cw-deliver__note, then bone-on-saffron on the hero
// pill at 390) and was fixed by hand each time, with no gate. This is the gate.
//
// WHAT IT DOES, per route and per viewport (1440x900 desktop, 390x844 mobile):
//   1. load, settle, run the FULL WCAG 2.1 A/AA rule set once, at rest;
//   2. step down the page half a viewport at a time to the foot, plus one stop
//      centring each [data-world] section, so no world can be stepped over
//      (exit 3 if one never takes effect). At every stop,
//      wait out the 0.7s palette transition and the reveal transitions, then run
//      color-contrast on ONLY the text elements inside the viewport, labelled
//      with the world the root is actually showing at that moment.
// Scanning only what is on screen is deliberate. Off-screen elements are not
// being seen on this world, and measuring them would need a scroll, which moves
// the world mid-scan and makes the result depend on scan order.
//
// WHAT IT CANNOT SEE: :hover and :focus-visible. axe measures the resting
// state only. The Pass-109 review found .cw-mlink's hover and focus swapping
// to --cw-accent (2.39:1 on the terracotta hero), which no run of this gate
// could have caught. Those states are checked by reading the CSS against
// LESSONS #19 until a static lint for accent in :hover/:focus rules exists.
//
// PASS = zero serious or critical violations outside KNOWN. KNOWN holds only
// findings that were already failing before the change under test, each with
// the reason it is parked. Nothing is added to KNOWN to let a change through.
//
// RUN:  node scripts/axe-worlds.mjs [baseUrl] [route ...]
//   baseUrl defaults to http://localhost:3100, the "prod" entry in
//   .claude/launch.json (next start against the current .next build).
//   env AXE_TOOLS    dir whose node_modules has puppeteer-core + axe-core.
//                    Default C:/tmp/p101tools. Neither is a repo dependency.
//   env CHROME_PATH  Chrome executable. Default: the Windows install path.
//   env AXE_OUT      optional path for the JSON report.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const TOOLS = process.env.AXE_TOOLS || "C:/tmp/p101tools";
const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SETTLE_MS = Number(process.env.AXE_SETTLE_MS || 6000);
const STEP_WAIT_MS = Number(process.env.AXE_STEP_MS || 1800);

const req = createRequire(path.join(TOOLS, "package.json"));
let puppeteer;
let axeSource;
let axeVersion;
try {
  const mod = req("puppeteer-core");
  puppeteer = mod.default ?? mod;
  const axeDir = path.dirname(req.resolve("axe-core/package.json"));
  axeSource = fs.readFileSync(path.join(axeDir, "axe.min.js"), "utf8");
  axeVersion = JSON.parse(
    fs.readFileSync(path.join(axeDir, "package.json"), "utf8"),
  ).version;
} catch (e) {
  console.error(
    `axe-worlds: cannot load puppeteer-core + axe-core from ${TOOLS} (${e.message}). Set AXE_TOOLS.`,
  );
  process.exit(2);
}

const args = process.argv.slice(2);
const BASE = (
  args[0] && /^https?:/.test(args[0]) ? args.shift() : "http://localhost:3100"
).replace(/\/$/, "");
// Default: the three commercial routes. Both "Start the Audit" pills link to
// /packages, so a change to how buying looks is not verified until the page
// the buyer lands on is scanned too (Pass-109 review, gate lens).
const ROUTES = args.length ? args : ["/", "/services", "/packages"];
// Git Bash (MSYS) rewrites any argument that looks like a POSIX path, so "/"
// arrives as "C:/Program Files/Git/". That turned the first baseline run into
// "Cannot navigate to invalid URL". Refuse such routes loudly rather than scan
// nothing: from Git Bash set MSYS_NO_PATHCONV=1, or pass no routes at all.
const badRoutes = ROUTES.filter((r) => !r.startsWith("/") || r.includes(":"));
if (badRoutes.length) {
  console.error(
    `axe-worlds: bad route(s) ${JSON.stringify(badRoutes)}. From Git Bash, set MSYS_NO_PATHCONV=1.`,
  );
  process.exit(2);
}

const VIEWPORTS = [
  {
    name: "1440",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
  {
    name: "390",
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  },
];

// Findings that were already failing before the change under test, matched on
// route, rule and the EXACT axe target. The first version matched a substring,
// so the entry for the one bare button[type="submit"] on "/" would also have
// swallowed any future submit button's failure (Pass-109 review, gate lens).
// Now a new element never collides with a parked one: if a sibling appears and
// axe has to qualify a parked selector, both surface as NEW, loudly.
// Baseline: HEAD b1ff9b5, before any Pass-109 change, 2026-09-10: 25 findings,
// all below. /packages entries come from a scan of a page Pass-109 did not
// touch (empty diff, none of its changed classes used there). Each is an OPEN
// item, not an accepted one; delete its line in the commit that fixes it.
const known = (route, reason, targets) =>
  targets.map((target) => ({ route, rule: "color-contrast", target, reason }));
const KNOWN = [
  // Home doors panel: fixed door fills (terracotta, petrol) under text that
  // inherits the world's colours; 1.38:1 at worst. The LESSONS #19 trap, from
  // the fill side.
  ...known("/", "doors panel, fixed fill under inherited text", [
    ".cw-door--build > .cw-door__kicker",
    ".cw-door--build > .cw-door__title",
    ".cw-door--build > .cw-door__body",
    ".cw-door--sell > .cw-door__kicker",
    ".cw-door--sell > .cw-door__title",
    ".cw-door--sell > .cw-door__body",
    ".cw-door--sell > .cw-door__cta",
    '.cw-door__cta[href$="playbook"]',
    '.cw-door__cta[href$="packages"]',
  ]),
  // OrdaniBetaForm's submit: bone on saffron in the petrol world, 2.05:1.
  // Pass-108 misattributed this pair to the hero pill.
  ...known("/", "Ordani beta submit, bone on saffron 2.05:1", [
    'button[type="submit"]',
  ]),
  // 4.4:1 against 4.5:1; a RESUME OPEN item, reported failing on main too.
  ...known("/services", ".cw-lede-link 4.4:1, RESUME OPEN", [".cw-lede-link"]),
  // Same element and ratio on /packages, a page Pass-109 did not touch.
  ...known("/packages", ".cw-lede-link 4.4:1, RESUME OPEN", [".cw-lede-link"]),
];

const isKnown = (v) =>
  KNOWN.some(
    (k) =>
      (k.route === "*" || k.route === v.route) &&
      k.rule === v.rule &&
      v.target === k.target,
  );

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// mode "full": whole document, every WCAG A/AA rule.
// mode "viewport": color-contrast on the text elements inside the viewport only.
async function scan(page, mode) {
  return page.evaluate(
    async (m, tags) => {
      const root = document.querySelector('[data-mode="cw"]');
      const world = root
        ? getComputedStyle(root).getPropertyValue("--cw-bg").trim() ||
          "(css default)"
        : "(no cw root)";
      const y0 = window.scrollY;
      let context = document;
      let checked = null;
      let opts = {
        runOnly: { type: "tag", values: tags },
        resultTypes: ["violations"],
      };
      if (m === "viewport") {
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const els = Array.from(document.body.querySelectorAll("*")).filter(
          (el) => {
            const hasText = Array.from(el.childNodes).some(
              (n) => n.nodeType === 3 && n.textContent.trim(),
            );
            if (!hasText) return false;
            const r = el.getBoundingClientRect();
            return (
              r.width > 0 &&
              r.height > 0 &&
              r.bottom > 0 &&
              r.top < vh &&
              r.right > 0 &&
              r.left < vw
            );
          },
        );
        checked = els.length;
        if (!els.length) {
          return { world, y0, y1: window.scrollY, violations: [], checked };
        }
        context = { include: els };
        opts = {
          runOnly: { type: "rule", values: ["color-contrast"] },
          resultTypes: ["violations"],
        };
      }
      const res = await window.axe.run(context, opts);
      const violations = [];
      for (const v of res.violations) {
        if (v.impact !== "serious" && v.impact !== "critical") continue;
        for (const n of v.nodes) {
          const d = (n.any && n.any[0] && n.any[0].data) || {};
          violations.push({
            rule: v.id,
            impact: v.impact,
            target: n.target.join(" "),
            html: n.html.slice(0, 140),
            fg: d.fgColor || null,
            bg: d.bgColor || null,
            ratio: d.contrastRatio || null,
            needed: d.expectedContrastRatio || null,
          });
        }
      }
      return { world, y0, y1: window.scrollY, violations, checked };
    },
    mode,
    WCAG,
  );
}

async function injectAxe(page) {
  await page.evaluate(axeSource);
  const ok = await page.evaluate(() => typeof window.axe === "object");
  if (!ok) await page.addScriptTag({ content: axeSource });
  if (!(await page.evaluate(() => typeof window.axe === "object"))) {
    throw new Error("axe-core did not load into the page");
  }
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-first-run", "--no-default-browser-check"],
});

const report = {
  base: BASE,
  axeVersion,
  when: new Date().toISOString(),
  runs: [],
  findings: [],
};
const seen = new Set();
let unknown = 0;
const coverageFail = [];
const offTarget = [];

try {
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.deviceScaleFactor,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
      });
      await page.goto(BASE + route, {
        waitUntil: "networkidle0",
        timeout: 90000,
      });
      await sleep(SETTLE_MS);
      await injectAxe(page);

      const record = (stop, res) => {
        report.runs.push({
          route,
          vp: vp.name,
          stop,
          world: res.world,
          checked: res.checked,
          moved: res.y0 !== res.y1,
          n: res.violations.length,
        });
        for (const v of res.violations) {
          const key = [route, vp.name, v.rule, v.target, res.world].join("|");
          if (seen.has(key)) continue;
          seen.add(key);
          const f = { route, vp: vp.name, stop, world: res.world, ...v };
          f.known = isKnown(f);
          if (!f.known) unknown++;
          report.findings.push(f);
        }
      };

      record("rest/full", await scan(page, "full"));

      // Stops: every half viewport, PLUS one stop centring each [data-world]
      // section. Half-viewport steps alone stepped straight over the bone doors
      // section at 1440 once Pass-109 shortened the page: a whole world went
      // unscanned and the run still printed a pass. Every world a visitor can
      // bring to the centre is now visited by construction, and the run fails
      // (exit 3) if a targeted world never took effect.
      const plan = await page.evaluate(() => {
        const vh = window.innerHeight;
        const max = Math.max(0, document.documentElement.scrollHeight - vh);
        const sections = Array.from(
          document.querySelectorAll("[data-world]"),
        ).map((s) => {
          const r = s.getBoundingClientRect();
          const y = Math.round(r.top + window.scrollY + r.height / 2 - vh / 2);
          return {
            name: s.getAttribute("data-world"),
            y,
            reachable: y >= 0 && y <= max,
          };
        });
        return { max, sections };
      });
      const step = Math.round(vp.height / 2);
      const stopMap = new Map([[0, "y=0"]]);
      for (let y = step; y < plan.max; y += step) stopMap.set(y, `y=${y}`);
      stopMap.set(plan.max, `y=${plan.max}`);
      for (const s of plan.sections) {
        if (s.reachable) stopMap.set(s.y, `y=${s.y} centre:${s.name}`);
      }
      const stops = [...stopMap.entries()].sort((a, b) => a[0] - b[0]);
      const tookEffect = {};
      for (const [y, label] of stops) {
        await page.evaluate(
          (top) => window.scrollTo({ top, behavior: "instant" }),
          y,
        );
        await sleep(STEP_WAIT_MS);
        // The settle wait is where a stop can drift: a late image, a reveal
        // reflow, Lenis re-settling. Check the position against the target
        // before scanning, re-issue the scroll once if it slipped, and flag the
        // stop if it still has not landed (Pass-109 review, gate lens).
        let at = await page.evaluate(() => window.scrollY);
        if (Math.abs(at - y) > 2) {
          await page.evaluate(
            (top) => window.scrollTo({ top, behavior: "instant" }),
            y,
          );
          await sleep(STEP_WAIT_MS);
          at = await page.evaluate(() => window.scrollY);
        }
        if (Math.abs(at - y) > 2) {
          offTarget.push(
            `${route} @${vp.name} ${label} landed at y=${Math.round(at)}`,
          );
        }
        const res = await scan(page, "viewport");
        record(label, res);
        const m = label.match(/centre:(\S+)/);
        if (m) tookEffect[m[1]] = res.world.toUpperCase();
      }
      const targeted = [
        ...new Set(plan.sections.filter((s) => s.reachable).map((s) => s.name)),
      ];
      const unreachable = plan.sections
        .filter((s) => !s.reachable)
        .map((s) => s.name);
      const distinct = new Set(Object.values(tookEffect));
      console.log(
        `axe-worlds: ${route} @${vp.name}  ${stops.length} stops  ` +
          targeted.map((n) => `${n}=${tookEffect[n] || "?"}`).join(", ") +
          (unreachable.length
            ? `  (cannot reach centre: ${unreachable.join(", ")})`
            : ""),
      );
      if (distinct.size < targeted.length) {
        coverageFail.push(
          `${route} @${vp.name}: ${targeted.length} worlds targeted, ${distinct.size} took effect ${JSON.stringify(tookEffect)}`,
        );
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}

for (const f of report.findings) {
  console.log(
    `${f.known ? "  known " : "  NEW   "} ${f.route} @${f.vp} ${f.stop} world=${f.world} ${f.rule} ${f.target}` +
      (f.ratio
        ? `  ${f.fg} on ${f.bg} = ${f.ratio}:1 (needs ${f.needed})`
        : ""),
  );
}
if (process.env.AXE_OUT) {
  fs.mkdirSync(path.dirname(process.env.AXE_OUT), { recursive: true });
  fs.writeFileSync(process.env.AXE_OUT, JSON.stringify(report, null, 2));
}
const moved = report.runs.filter((r) => r.moved).length;
console.log(
  `axe-worlds: axe-core ${axeVersion}, ${report.runs.length} scans, ` +
    `${report.findings.length} serious/critical finding(s), ${unknown} not in KNOWN` +
    (moved ? `, WARNING ${moved} scan(s) saw the page scroll mid-run` : ""),
);
for (const c of coverageFail) console.error(`axe-worlds: COVERAGE FAIL ${c}`);
if (coverageFail.length) {
  console.error(
    "axe-worlds: a targeted world never took effect, so this run proves nothing about it.",
  );
}
for (const o of offTarget) console.warn(`axe-worlds: OFF-TARGET ${o}`);
process.exit(unknown ? 1 : coverageFail.length ? 3 : 0);
