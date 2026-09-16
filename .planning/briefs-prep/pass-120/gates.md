# Facet: gates and verification tooling — Pass-120

Read-only exhaustive map. All commands run 2026-09-16 from
`C:/Users/micah/Code/micahjonesconsulting/.claude/worktrees/p106-live`. Output quoted verbatim
below each command. Every claim carries file:line.

## 1. Build pipeline — `package.json:6`

```
"build": "tsx lib/copy-lint-cli.ts && node scripts/vendor-gate.mjs && node scripts/retired-phrases-gate.mjs --self-test && node scripts/retired-phrases-gate.mjs && node scripts/accent-states-lint.mjs --self-test && node scripts/accent-states-lint.mjs && node scripts/gsap-quarantine-gate.mjs --self-test && node scripts/gsap-quarantine-gate.mjs && next build && node scripts/render-gate.mjs"
```

Order, exactly: (1) `tsx lib/copy-lint-cli.ts` — banned words + MDX frontmatter schema + em-dash
cap, source-level. (2) `vendor-gate.mjs`. (3-4) `retired-phrases-gate.mjs --self-test` then real.
(5-6) `accent-states-lint.mjs --self-test` then real (lints `app/globals.css`). (7-8)
`gsap-quarantine-gate.mjs --self-test` then real. (9) `next build`. (10) `render-gate.mjs` —
reads `.next/server/app`, so it MUST run after `next build`, never before.

`package.json:9` — `"typecheck": "tsc --noEmit"`, not part of `build`, run separately.
`package.json:10` — `"lint:copy": "tsx lib/copy-lint-cli.ts"`, the standalone copy-lint entry
point, same code path as the build's step 1.

**NOT wired into `pnpm build`:** `scripts/ordani-claims-gate.mjs`, `scripts/render-gate.mjs`'s
siblings `scripts/axe-worlds.mjs` and `scripts/layout-gate.mjs` (both need a running server on
`:3100`/default, driven by hand or by a workflow script, never by `pnpm build`), and everything
in `.planning/exec/` (pass-specific one-off verifiers: `card1-115.sh`, `type117.mjs`,
`circle115.mjs`, etc.).

## 2. Each gate — scope, invocation, current output

### 2.1 `lib/copy-lint-cli.ts` + `lib/copy-lint-runner.ts` + `lib/copy-lint.ts`

- **What it checks:** (a) banned words from `lib/banned.ts` (`BANNED_WORDS`), matched
  case-insensitively with word boundaries for single words, literal for phrases
  (`lib/copy-lint.ts:20-30`); (b) `content/work/*.mdx` frontmatter against
  `caseStudyFrontmatterSchema` in `lib/case-study-schema.ts` via `gray-matter`
  (`lib/copy-lint-runner.ts:73-101`); (c) em-dash cap of 1 per page, **MDX/`.md` only**
  (`EM_DASH_BLOCKING_EXTS = [".mdx", ".md"]`, `lib/copy-lint-runner.ts:127`) — `.tsx` em-dashes are
  counted nowhere in this gate, only by the manual `copy-editor` subagent per `.claude/CLAUDE.md`
  "Enforcement (Phase 2)".
- **Scope:** `SCAN_TARGETS` = `content/**/*.{mdx,md,ts}` and `app/**/*.{tsx,ts}`
  (`lib/copy-lint-runner.ts:29-32`); frontmatter schema only checks `content/work/*.mdx`
  (`FRONTMATTER_TARGET_DIR`, line 34).
- **Run:** `node_modules/.bin/tsx lib/copy-lint-cli.ts` (or `pnpm lint:copy`). No server needed.
- **Current output (ran clean):**
  ```
  [copy-lint] ✓ Scanned project. Zero banned-word findings, zero schema violations.
  ```
- **Pass-120 impact:** `titleCardWords` is REQUIRED and bounded 3-6
  (`lib/case-study-schema.ts:56-60`, `.min(3,...).max(6,...)`). FABLE-120-DESIGN.md §7
  ("What the build brief must specify") states: `titleCardWords` removed from the frontmatter
  schema and the Zod validator, because the pinned word-stack TitleCard is retired for a 600ms
  settle entrance. **If the schema is not edited in the same commit, every rebuilt case-study MDX
  that drops `titleCardWords` fails this gate** with `titleCardWords requires at least 3 words`
  (schema message, `lib/case-study-schema.ts:59`). Postmates and Neuton currently carry
  `titleCardWords:` (`content/work/postmates.mdx:11`, `content/work/neuton.mdx:10`) — both retire,
  so their MDX files' fate (deleted vs. kept unrendered) also needs a ruling, or dangling
  `content/work/*.mdx` no longer under the new schema will fail this gate the moment the schema
  changes under it.
- **No photo captions (Pass-120 rule):** nothing in this gate enforces "no captions" — it is not
  a lint target. Verify by eye or add a mechanical check if it recurs (per the every-catch rule).

### 2.2 `scripts/vendor-gate.mjs`

- **What it checks:** any file mentioning "ordani" (case-insensitive) must not also name an infra
  vendor: `/\b(Supabase|Vercel|Next\.js|Postgres(?:QL)?|Twilio|Resend|Neon|Expo|Railway|Firebase|
  PlanetScale|Cloudflare|AWS|GCP|Azure)\b/g` (`scripts/vendor-gate.mjs:21-22`). Comments stripped
  first (lines 32-38).
- **Scope:** `ROOTS = ["app", "components", "content"]`, extensions `.tsx`, `.mdx`, and any `.ts`
  under `content/` (`scripts/vendor-gate.mjs:19-20`).
- **Run:** `node scripts/vendor-gate.mjs`. No server, no `--self-test` variant.
- **Current output:**
  ```
  vendor-gate: clean
  ```
- **Pass-120 impact:** none directly (no vendor names in the /work rebuild scope as drafted), but
  any new Ordani study copy in `content/drafts/pass-120/*` must clear this gate once merged into
  `content/`.

### 2.3 `scripts/retired-phrases-gate.mjs`

- **What it checks:** a fixed `PHRASES` list of operator-retired strings/copy
  (`scripts/retired-phrases-gate.mjs:115-151`), currently including `"2013–2023"`, `"A decade"`,
  `"Flexport"`, `"Cuebiq"`, `"email me"`, the book-mention set (`"80% Wall"`, `"/playbook"`,
  `"field manual"`, `"the playbook"`), the Pass-111b pricing/rename set, the Pass-113 case-study
  neutralization set (`"Hennessy"`, `"foreign company"`, `"foreign AI company"`), and two
  Pass-120-dated additions already in the list: `"anti-racism"` / `"anti racism"` (line 145-146,
  operator 2026-09-15 ruling on the content engine's client description) and `"Stedi"` / `"stedi"`
  (line 149-150, operator 2026-09-16: "please dont mention private vendors"). Text is
  comment-stripped, specifier-stripped, exemption-blanked (`app/layout.tsx`'s `alumniOf` array),
  then normalized (HTML entities, `{" "}` JSX joins, whitespace) before matching, including a
  two-line join pass for split JSX (lines 195-232).
- **Scope:** `ROOTS = ["app", "content", "lib"]`, extensions `.tsx?`, `.mdx`, `.md`
  (`scripts/retired-phrases-gate.mjs:113-114`). Exempt files:
  `lib/catalog.ts`, `lib/playbook-delivery.ts` (line 155).
- **Run:** `node scripts/retired-phrases-gate.mjs --self-test` then `node
  scripts/retired-phrases-gate.mjs`. No server.
- **Current output:**
  ```
  retired-phrases-gate self-test: 34 planted caught, 23 near misses passed
  retired-phrases-gate: clean
  ```
- **Pass-120 impact:** the gate ALREADY bans "Hennessy", "foreign company", "foreign AI company",
  "Stedi"/"stedi", and "anti-racism"/"anti racism" — the new birth-worker study and the rewritten
  content-engine/RFP studies must respect all five bans on first write, not as a follow-up sweep.
  No wording in the design doc conflicts with the current PHRASES list, so this gate needs **no
  script edit** for Pass-120 as scoped — only clean copy.

### 2.4 `scripts/accent-states-lint.mjs`

- **What it checks:** any CSS rule scoped to `[data-mode="cw"]` (or unscoped) whose selector is a
  `:hover`/`:focus*` state and whose declared value resolves (through custom-property chasing) to
  `--cw-accent`, on any painted property (`scripts/accent-states-lint.mjs:1-91` header explains
  the LESSONS #19 history; matching logic lines 200-225).
- **Scope:** `app/globals.css` by default, or an explicit file argument. This is a Color Worlds
  (`data-mode="cw"`) gate — it does not scope to `foyer`/`theater`, House Lights' actual two
  modes, so it is inert on this repo's current mode system unless `app/globals.css` reintroduces a
  `[data-mode="cw"]` selector. (Cross-check: House Lights' `.claude/CLAUDE.md` "Two modes" section
  names only `foyer` and `theater`; `cw` does not appear there. The gate's own file header
  narrates a different project's LESSONS numbering — see §4 below.)
- **Run:** `node scripts/accent-states-lint.mjs --self-test` then `node
  scripts/accent-states-lint.mjs`. No server.
- **Current output:**
  ```
  accent-states-lint self-test: 16/16 planted cases caught, 0 false alarms
  accent-states-lint: clean
  ```
- **Pass-120 impact:** none expected — the new paper/dark-band study template does not touch
  `[data-mode="cw"]` selectors per the design doc's `data-surface="paper"` override plan
  (FABLE-120-DESIGN.md §7). Confirm no new hover/focus rule routes `--accent-copper` into a state
  on paper (the project's real WCAG trap, `.claude/CLAUDE.md` "CRITICAL — WCAG AA rule"), but this
  script does not check that trap by name — it is a dead import from a different codebase's gate
  set (see §4 finding).

### 2.5 `scripts/gsap-quarantine-gate.mjs`

- **What it checks:** any import/require/dynamic-import of `gsap`, `gsap/<sub>`, or
  `@gsap/<pkg>` outside the allowlist (`scripts/gsap-quarantine-gate.mjs:34-39` regex, ALLOWLIST
  line 28-32).
- **Scope:** `ROOTS = ["app", "components", "lib", "content", "hooks"]`, extensions `.ts .tsx .js
  .jsx .mjs .cjs` (lines 19-27). Allowlist: `components/TitleCard.tsx`,
  `components/color-worlds/SplitReveal.tsx` (pre-existing Pass-111a exception).
- **Run:** `node scripts/gsap-quarantine-gate.mjs --self-test` then `node
  scripts/gsap-quarantine-gate.mjs`. No server.
- **Current output:**
  ```
  gsap-quarantine-gate self-test: 13 planted uses caught, 7 near misses clean
  gsap-quarantine-gate: clean (87 files)
  ```
- **Pass-120 impact — DIRECT.** `components/TitleCard.tsx` is the one allowlisted GSAP file, and
  it is the exact component Pass-120 rebuilds into a 600ms settle entrance
  (FABLE-120-DESIGN.md §6/§7: "TitleCard's fate... re-cast, not removed"; "GSAP still quarantined
  to the one file"). As long as the rewritten `TitleCard.tsx` keeps its path and the settle
  entrance stays inside it (not lifted into a new component file), the allowlist needs **no
  edit**. If the brief renames the component or moves the entrance logic to a new file (e.g. a
  `StudyHero.tsx`), that new path must be added to `ALLOWLIST`
  (`scripts/gsap-quarantine-gate.mjs:28-32`) in the same commit or the build fails with
  `gsap-quarantine-gate: forbidden import: <new path>`.

### 2.6 `scripts/render-gate.mjs`

- **What it checks, on the prerendered HTML in `.next/server/app`:** LINKS (every internal href
  and fragment resolves to a real route/id, or a `next.config.ts` redirect source), META (`<title>`
  ≤60 chars, `<meta description>` ≤160 chars, both required unless noindex), GLUE (no inline
  element — `strong em b i a code abbr` — glued to the next word with no space, `span` excluded),
  DASH (≤1 em-dash in `<title>`, ≤1 in body, decoding `&mdash;`/entities first).
  (`scripts/render-gate.mjs:1-56` header, checks at lines 189-291.)
- **Scope:** every `.html` file under `.next/server/app`, walked recursively
  (`scripts/render-gate.mjs:77-91`). Redirect sources are read live from `next.config.ts`'s
  `redirects()` array via regex on `source:\s*"([^"]+)"` (lines 109-115) — **this list is
  generated from the live config, not hardcoded**, so a new redirect entry needs no gate-script
  edit.
- **Run:** must run AFTER `next build` (it errors and exits 1 if `.next/server/app` is missing,
  line 70-75): `next build && node scripts/render-gate.mjs`. This is exactly what `pnpm build`
  step 10 does. Not run in isolation without a fresh build first.
- **Current output:** NOT run in this session (requires a completed `next build`, which the task
  scope forbids — "Do not build, serve or commit"). Its clean-pass line, verbatim from the
  script, is:
  ```
  render-gate: <N> routes — links resolve, fragments exist, metadata within limits.
  ```
  (`scripts/render-gate.mjs:302-306`, `<N>` = page count discovered that run).
- **Pass-120 impact — DIRECT, two ways.**
  1. **New redirects required.** Postmates and Neuton retire and 301 to `/work#record`
     (FABLE-120-DESIGN.md §7: "the two 301s resolve to `/work#record`"). `next.config.ts` currently
     has NO entries for `/work/postmates` or `/work/neuton` (`next.config.ts:22-76` — only
     `akamai→guardicore`, `hire-me→services`, `hr-equity-author→rfp-engine`,
     `ai-engineering→services`, `book→call`, `book/kickoff→call/kickoff`). The brief must add
     ```
     { source: "/work/postmates", destination: "/work#record", permanent: true },
     { source: "/work/neuton", destination: "/work#record", permanent: true },
     ```
     to `next.config.ts`'s `redirects()` array in the SAME commit that removes the pages, or
     render-gate fails every remaining href to those paths with `no such route` — UNLESS no
     surviving page links to `/work/postmates` or `/work/neuton` at all, in which case the 301 is
     unverified by render-gate (it only checks hrefs actually present in rendered HTML) and must be
     verified by curl instead (see §3, the `card1-115.sh` pattern already does this).
  2. **DASH and GLUE checks apply unchanged to the new study template** — the record block, the
     paper-body prose, and the birth-worker study's copy all still count against the ≤1 em-dash
     cap and the glued-inline-element check the moment they render. No script change needed; just
     clean output.
  3. **META** — the new hero-scale lead study and the retired-then-redirected pages: once
     Postmates/Neuton are removed as pages, they no longer need a `<title>`/description (they are
     not scanned, they don't exist as `.html` files); the new birth-worker study page does.

### 2.7 `scripts/axe-worlds.mjs`

- **What it checks:** WCAG 2.1 A/AA via axe-core, full-page once at rest, then color-contrast only
  on in-viewport text at every half-viewport scroll stop plus one stop per `[data-world]` section,
  at 1440x900 and 390x844 (`scripts/axe-worlds.mjs:1-41` header, scan logic 139-390).
- **Scope:** hardcoded default `ROUTES = ["/", "/services", "/packages"]`
  (`scripts/axe-worlds.mjs:79`) — **`/work` and `/work/[slug]` are NOT in the default route list**,
  overridable via CLI args.
- **Run:** `node scripts/axe-worlds.mjs [baseUrl] [route ...]` against a **running server**
  (default `http://localhost:3100`, matching the `prod` entry in `.claude/launch.json` — a
  `next start` against the current `.next` build). Needs `AXE_TOOLS` (puppeteer-core + axe-core,
  default `C:/tmp/p101tools`, confirmed present on this machine) and a Chrome binary. **Cannot be
  run in this read-only, no-server facet pass** — recorded here as a description only, not
  executed.
- **KNOWN list:** currently empty (`scripts/axe-worlds.mjs:126`, cleared in Pass-110); an entry
  here is an open item, never license to ignore a new finding.
- **Pass-120 impact:** the design doc calls for a `data-surface="paper"` override inside
  `data-mode="theater"` routes (study pages), re-checking contrast on both grounds ("copper-deep
  for links on paper, copper on obsidian", FABLE-120-DESIGN.md §7). Since `axe-worlds.mjs`'s
  default routes exclude `/work` and every `/work/[slug]`, **the brief must pass the new routes
  explicitly** — e.g. `node scripts/axe-worlds.mjs http://localhost:3100 /work /work/guardicore
  /work/postmates-successor-slug ...` — or this gate silently never touches the rebuilt pages. No
  script edit is required, only remembering to name the routes on the command line (and updating
  any wrapper/workflow script that currently hardcodes the three-route default).

### 2.8 `scripts/layout-gate.mjs`

- **What it checks, per route per viewport (1440/1280/1024/768/390/360):** `words` (no
  word/number-range breaks mid-word via `overflow-wrap: anywhere`, or any break in display type
  ≥24px or a solo mono label), `boxes` (from 1024px wide, no `.cw-pbox` taller than the viewport),
  `fill` (`.cw-ord-grid`, `.cw-offer__grid`, `.cw-exits__row` must span their container), `spill`
  (`.cw-pbox__fig/__name/__price` must not cross its own `.cw-pbox`'s right edge)
  (`scripts/layout-gate.mjs:1-44` header, probe logic 119-249).
- **Scope, and the DIRECT Pass-120 hit:** the DEFAULT `ROUTES` constant is
  ```
  ["/", "/services", "/packages", "/work", "/work/postmates", "/work/neuton"]
  ```
  (`scripts/layout-gate.mjs:71-73`, verbatim). **Once Postmates and Neuton retire, these two
  literal routes will 404 or 301 at the default invocation.** `layout-gate.mjs` treats an HTTP
  status ≥400 (or a failed `page.goto`, status 0) as a `check: "load"` finding
  (`scripts/layout-gate.mjs:338-349`); a 301 that resolves through Puppeteer's normal redirect
  handling to `/work#record` would load as HTTP 200 at the `/work` page instead — not a `load`
  failure, but the route strings themselves are stale the moment the pages are gone, and the gate
  never gets a chance to check the actual new pages (the birth-worker study, the rebuilt
  content-engine/RFP-engine studies, the new hero-scale `/work` index) unless the brief updates
  this constant. **This must change in the same commit as the retirement**: drop
  `/work/postmates` and `/work/neuton`, add `/work` (already present) plus every surviving/new
  study slug (`/work/guardicore`, `/work/ordani`, `/work/content-engine`, `/work/rfp-engine`, the
  new birth-worker slug).
- **Run:** `node scripts/layout-gate.mjs [baseUrl] [route ...]` against a running server (same
  `AXE_TOOLS`/Chrome dependency as axe-worlds), OR `node scripts/layout-gate.mjs --self-test`
  (no server, a planted `data:` page).
- **Current self-test output (ran clean, this session):**
  ```
  layout-gate self-test: 7 planted defects caught, 8 near misses clean
  ```
- **KNOWN list:** currently empty (`scripts/layout-gate.mjs:116`).
- **Real-route run:** NOT executed (would need `next start` on a server, forbidden by this task's
  scope). Its clean-pass line, verbatim from the script:
  ```
  layout-gate: <loads> page loads across <N> routes, <F> finding(s), <U> not in KNOWN
  ```
  (`scripts/layout-gate.mjs:386-388`).

### 2.9 `scripts/ordani-claims-gate.mjs`

- **What it checks:** Class 1 — retired Ordani user-count phrasings (`"hundreds of ... birth
  workers"`, `"hundreds of users"`, `"200 birth workers"`, `"used by 200"`,
  `scripts/ordani-claims-gate.mjs:57-65`). Class 2 — security-mechanism vocabulary
  (`row-level security`, `RLS`, `auth.uid`, `enforced in the database`, `encryption/encrypted at
  rest`, `audit log`, `export-gating`) found within 8 lines of an "ordani" mention
  (lines 68-71, 129-165) — a proximity check, not a bare keyword ban.
- **Scope:** `ROOTS = ["app", "components", "content", "product/playbook/src"]`, extensions `.tsx
  .mdx .typ` and `content/**/*.ts` (`scripts/ordani-claims-gate.mjs:53-54`). This is the ONE gate
  in the set that reaches into `product/playbook/src/*.typ` — the paid PDF's Typst source, outside
  the Next.js build entirely.
- **Run:** `node scripts/ordani-claims-gate.mjs`. No server, no `--self-test` variant (comment at
  line 88-93 in `retired-phrases-gate.mjs` names a self-test contract that `ordani-claims-gate.mjs`
  itself does NOT implement — it has no `--self-test` branch in its own source).
- **Current output (real, PRE-EXISTING failure, unrelated to Pass-120):**
  ```
  ordani-claims-gate: product\playbook\src\chapter-01.typ:33: "hundreds of birth workers" — retired user count — use "active paying users", in beta
  ordani-claims-gate: product\playbook\src\chapter-01.typ:240: "hundreds of birth workers" — retired user count — use "active paying users", in beta
  ordani-claims-gate: product\playbook\src\chapter-03.typ:81: "row-level security" within 8 lines of Ordani (line 84) — Ordani surfaces never describe how the protections work (LESSONS #3 SECURITY-DETAIL GATE)
  ordani-claims-gate: product\playbook\src\chapter-03.typ:85: "enforced in the database" within 8 lines of Ordani (line 84) — Ordani surfaces never describe how the protections work (LESSONS #3 SECURITY-DETAIL GATE)
  ordani-claims-gate: product\playbook\src\chapter-05.typ:70: "auth.uid" within 8 lines of Ordani (line 78) — Ordani surfaces never describe how the protections work (LESSONS #3 SECURITY-DETAIL GATE)
  ordani-claims-gate: product\playbook\src\chapter-05.typ:73: "auth.uid" within 8 lines of Ordani (line 78) — Ordani surfaces never describe how the protections work (LESSONS #3 SECURITY-DETAIL GATE)
  ordani-claims-gate: product\playbook\src\chapter-05.typ:80: "enforced in the database" within 8 lines of Ordani (line 78) — Ordani surfaces never describe how the protections work (LESSONS #3 SECURITY-DETAIL GATE)
  ordani-claims-gate: product\playbook\src\chapter-07.typ:77: "enforced in the database" within 8 lines of Ordani (line 75) — Ordani surfaces never describe how the protections work (LESSONS #3 SECURITY-DETAIL GATE)
  ordani-claims-gate: product\playbook\src\chapter-08.typ:61: "Hundreds of birth workers" — retired user count — use "active paying users", in beta
  ordani-claims-gate: product\playbook\src\chapter-10.typ:165: "Hundreds of birth workers" — retired user count — use "active paying users", in beta

  ordani-claims-gate: 10 finding(s). Counts: say "active paying users", in beta, public release coming. Mechanisms: teach them generically, but cut Ordani's name from the surrounding sentence — never route around this gate.
  ```
  Exit code 1. This is EXPECTED per the script's own header (`scripts/ordani-claims-gate.mjs:46-49`:
  "NOT YET WIRED INTO `pnpm build`. It fails today, by design — the book still carries the
  findings above."). It is not wired into `pnpm build` and has been failing since before Pass-120;
  it is entirely in `product/playbook/src/*.typ`, outside the /work rebuild's scope. **Do not
  treat this as a Pass-120 regression** — it is pre-existing, orthogonal, and does not block a
  /work-only build.
- **Pass-120 relevance:** the new birth-worker study is an Ordani-adjacent client (a birth
  worker), not Ordani itself — confirm the new study's copy does not accidentally trip Class 1/2
  if it mentions Ordani by name (unlikely per the drafts, but the gate would catch it if run;
  since it is unwired, a manual run before merge is the only check).

## 3. Pass-specific one-off verifiers in `.planning/exec/` that touch retiring routes

None of these are gates in the `pnpm build` sense — they are hand-invoked verification scripts
written for specific prior passes (115, 116, 117) and referenced by the RESUME queue as evidence.
They are NOT re-run automatically, but three of them assert against `/work/postmates` and
`/work/neuton` by literal path and WILL fail or go stale once those routes retire:

### 3.1 `.planning/exec/card1-115.sh`

- Curls `$D/`, `$D/work/postmates`, `$D/work/neuton`, `$D/work`, `$D/llms.txt` for BOTH production
  domains (`card1-115.sh:9,17-18`) and asserts, among other things: HTTP 200 on `/work/postmates`
  and `/work/neuton` (line 24, will become a 301→200-via-redirect if curl follows with `-sL`, so
  the status check alone still passes, but see next point), zero "Hennessy" across
  postmates+neuton+work+llms (line 26 — becomes vacuously true once those pages don't exist, not a
  real check anymore), the postmates "fraud line" and "2.65B" text present (lines 29, 34 — these
  strings live ONLY on the retiring page; once it 301s, `curl -sL` follows to `/work#record`,
  these greps return 0, and the `chk "postmates fraud line" ... -ge 1` assertion FAILS), the
  neuton "entering North America" line present (line 31, same failure mode), and the "neuton row
  tag" `Helped launch · exit 2025` / absence of the old tag (lines 32-33, these live on the HOME
  page `$H`, not on the retiring page itself — these may still be relevant to the home's record
  row and should be re-verified against whatever the new `/work` hero/record block renders).
- **Verdict:** this exact script is obsolete for a Pass-120 CARD 1 check. Its markers assert
  Pass-113/115-era case-study copy that Pass-120 deletes. A new `card1-120.sh` (or an edited copy)
  is needed with new markers: the 301 status + destination for `/work/postmates` and
  `/work/neuton`, the presence of the new birth-worker study, the absence of any tenure-year
  string, and whatever record-block strings the Pass-120 brief locks. Do this in the SAME commit
  that ships the retirement, per the "every judgment-catch → mechanical gate the same day" rule.
- The `BASE_DPL` baseline (`card1-115.sh:4`, `dpl_BfViKgzf8bHDU5AwneqWDpsTUDLz`) matches the
  RESUME queue's "card1 baseline = dpl_BfVi..." note from the 2026-09-12 merge commit
  (`79534b8`) — a new baseline dpl id will be needed after the Pass-120 deploy for the "dpl id is
  new" check (line 21) to mean anything.

### 3.2 `.planning/exec/circle115.mjs`

- `runC13()` (`circle115.mjs:455-576`) navigates to `${S}/work/postmates` directly
  (line 500), then clicks `a.case-study__nav-link[href="/"]` (line 506) to return home via client
  navigation, as part of proving the home page's `$20M+` receipts count-up animation fires once
  per document load even across client-side back/forward. **This will break once `/work/postmates`
  retires**: the initial `page.goto` will 301 to `/work#record` (a different page, likely without
  a `.case-study__nav-link` selector), so `docLoads` bookkeeping and the "back to a case study,
  forward to home" navigation pattern this test exercises needs a different anchor route — e.g.
  `/work/guardicore` or the new birth-worker slug — substituted at line 500 (and the `goBack`
  target check at line 536, `location.pathname === "/work/postmates"`).
- This script is invoked by hand for Pass-115/116 circle verification, not part of any automated
  gate; it is recorded here because Pass-120 will silently invalidate it if reused without the
  substitution.

### 3.3 `.planning/exec/type117.mjs`

- Scoped entirely to `/services` (`type117.mjs:44`), unrelated to `/work` or any case study. No
  Pass-120 impact. Included for completeness since the task named it explicitly: it is a
  DESIGN_BAR type-ladder + spill/glue measurement script for one page, run by hand
  (`node .planning/exec/type117.mjs [base] [--shots <dir>]`), not wired into `pnpm build`.

### 3.4 Other route-touching one-offs (not re-run, listed for completeness)

`capture-113.mjs`, `capture116.mjs`, `decompose-113.mjs`, `shots111a.mjs` all reference
`/work/postmates` and/or `/work/neuton` by literal path (confirmed via grep). All are one-shot
screenshot/decompose scripts for specific past passes; none are gates, none block a build, and
none need updating unless someone re-runs them for a diff against Pass-120 — flagged only so a
future session doesn't assume they still describe the live site after Pass-120 ships.

## 4. One out-of-scope observation (not a Pass-120 blocker, noted per "evidence before assertions")

`scripts/accent-states-lint.mjs` and `scripts/axe-worlds.mjs` are both written for a
`[data-mode="cw"]` / "Color Worlds" / `WorldSwitcher` system with `--cw-bg/--cw-fg/--cw-accent`
tokens and classes like `.cw-mlink`, `.cw-pbox`, `.cw-rec__wrap` — none of which appear in this
project's own `.claude/CLAUDE.md` "Two modes" (which names only `foyer`/`theater` with
`--foyer-paper`/`--accent-copper` tokens). `layout-gate.mjs` and the `.planning/exec/*.mjs` files
use the same `.cw-*` class vocabulary throughout (e.g. `.cw-pbox`, `.cw-rec__tick`,
`.cw-services__kicker`). This vocabulary is self-consistent across ALL the gate scripts and exec
logs read for this facet, so it is evidently what the LIVE code actually uses — `git grep -c
"cw-" app` would confirm exact prevalence, but was not run (out of this facet's brief: gates and
tooling, not app markup) and is not a gates-tooling finding — it is a project-memory/CLAUDE.md
drift note. Flagging so the Pass-120 brief author is not confused when the gate scripts' own
comments narrate "House Lights"-style LESSONS numbers (#19, #20) alongside `.cw-*` selectors: the
selectors are real and current; only the `.claude/CLAUDE.md` narrative names the modes
differently (`foyer`/`theater` are very likely THE reader-facing name for what the CSS
implements as `cw`/`data-world`/`data-mode="cw"` — not a discrepancy to fix here, just a mapping
to keep in mind when writing gate-route lists for Pass-120's paper/dark-band pages).
