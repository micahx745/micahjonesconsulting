# Lessons Learned — numbered, append-only

Each entry: what happened, root cause, and the mechanical gate added so it can't recur.
An entry without a gate is a story, not a lesson.

## #1 — External reviews hallucinate; verify every claim against the live DOM (2026-06-17)

**What happened:** A Cowork "brutal review" of the site was ~half confabulated — it critiqued
a placeholder portrait, a `/work/akamai` second case study, `/work-with-me` and `/contact`
pages, and named banks. None existed on the live site (it had blended memory of an old
prototype with the page it actually loaded). Acting on it blind would have produced wrong and
destructive edits.

**Root cause:** Review prompt did not force the reviewer to ground every finding in loaded
evidence; the reviewer also had the old `.com` prototype in view.

**Gate:** (a) Every review/UAT claim gets curl-verified against the live DOM before any edit —
grep for the quoted line; zero hits = discard the finding. (b) Review prompts MUST demand an
evidence log: URL + HTTP status + one verbatim quoted line per page; findings not traceable to
the log are invalid. Template: `.planning/prompts/cowork-design-review-prompt.md`. The round-2
review under these rules was ~100% accurate.

## #2 — Fabricated content ships silently; cards must trace to their case study (2026-06-18)

**What happened:** The home "industry author" card carried three invented end-clients (a
research university, a Fortune-500 with "30% revenue lift", a major American city) — origin
unknown, operator confirmed false. It sat on the live homepage linking to a case study that
never mentioned any of them.

**Root cause:** Card copy was written as a second, independent story instead of a summary of
the case study it links to. No trace requirement existed.

**Gate:** Every named client, metric, or artifact on a home/summary card must appear in the
case-study MDX it links to. The card is a compression of the study, never a second story.
Check on every card edit: open the target MDX and confirm each claim exists there.

## #3 — Verified-facts ledger; never resurrect corrected claims (2026-06-09 → 06-18)

**What happened:** Early copy shipped wrong or inflated numbers, corrected by the operator in
stages. The wrong versions keep trying to come back via stale docs and reviewer memory.

**The ledger (operator-confirmed, current):**

- Guardicore: **$80M pipeline generated, $14M revenue**, enterprise sales manager (no team
  led). NEVER: "$15M pipeline", "trained the sales team", "built the channel".
  Operator-supplied 2026-09-01, both now live on the case study: **average enterprise deal
  size $1.2M** (this SUPERSEDES the earlier "average deal size moved up by $150K", which was
  cut on 2026-09-01 as unledgered and is not the same claim — one is an absolute, the other a
  delta; never restate the $150K version), and **"Trillions in financial assets sit protected
  behind those deployments"**. The trillions line was cut the same morning as unverifiable and
  RESTORED hours later on operator confirmation that it describes the value of financial assets
  protected behind the work. It is approved; do not re-cut it in a future honesty sweep.
- Guardicore **GEOGRAPHY — ledgered 2026-09-02 (Pass-78)**: the product was built in
  **Tel Aviv**; the buyers were **North American** enterprises. PROVENANCE, three
  independent sources: (1) the operator's own /services door copy, written 2026-09-02,
  verbatim "See how i helped a foreign company break into the north american market and
  get sold"; (2) the photo caption shipped on three surfaces since Pass-76, "Working
  session with the Guardicore team - Tel Aviv"; (3) public record, Akamai acquired the
  Israeli company in 2021. DERIVED VALUES that move with it: the /work lot line, the
  case-study dek, the meta description and the "The problem" opener all now state it.
  WHY IT WAS ADDED: the door promised that story and the case study never told it -
  "Israel" and "foreign" rendered ZERO times on /work/guardicore, "Tel Aviv" only in a
  photo caption, "North American" only as a customer descriptor. The strongest receipt
  on the site failed at the click. Say "Tel Aviv" or "a foreign company"; do NOT write a
  nationality claim about the founders, which the ledger does not carry.

- SurveyMonkey: enterprise sales, **$1M+ toward the IPO**. NEVER: "customer-evidence engine",
  "anchored the Nasdaq IPO".
- Exits: **FOUR companies he worked inside reached an exit** (operator update 2026-08-30:
  "considering i was apart of four exits - postmates, surveymonkey, guardicore, neuton ai" —
  SUPERSEDES the three-exit entry below). Role split stays honest: TechValidate→SurveyMonkey
  (IPO 2018, cap table), Guardicore→Akamai (2021, cap table), Neuton.AI→Nordic Semiconductor
  (2025, "helped launch", NOT cap table — never claim Neuton equity), Postmates→Uber (2020,
  employed there; role/years NOT yet supplied — the ledger table row is HELD until he gives
  them; never invent a role). Umbrella phrasing: "worked inside" or "behind my work", never
  "helped build" for the four-count (Postmates was employment, not a build claim).
  **$5B+ combined** = DISCLOSED deals only: Uber–Postmates $2.65B + SVMK first-day IPO value
  $2.33B + Akamai–Guardicore $600M = $5.58B; Neuton undisclosed, contributes $0. Sources
  pinned in content/citations.ts (EXITS_COMBINED_VALUE). NEVER: "Two exits". RETIRED (swept
  to zero rendered instances 2026-08-30): "Three companies I helped build reached an exit".
  **JOINING STAGE — operator-supplied 2026-09-02**, verbatim: "postmates was earlysih,
  surveymonkey earlyish, guardicore super early, neuto ai super early. name drop". So:
  Postmates and SurveyMonkey EARLYISH; Guardicore and Neuton.AI VERY EARLY. **RULED
  2026-09-02: render as plain "early" for ALL FOUR** (operator: "just say early for all those
  companies mentioned"), after it was flagged that Guardicore ships as 2018-2021 on his own
  case study against a 2015 founding, so "very early" was checkable and shaky. The per-company
  distinction stays recorded here as fact; the PUBLIC rendering is the flat "early". This
  authorises
  naming the four companies on public surfaces WITH their joining stage. It does NOT authorise
  founder, founding-team, co-founder, or employee-number claims for any of them, and it does
  not lift the HOLD on his Postmates role and years. First rendered on /playbook (Pass-68).
  **NAME THE COMPANY, NOT THE JOB — operator 2026-09-02, verbatim: "remove the sales part
  too"**. He does not want "Enterprise cybersecurity sales at Guardicore" on the page. The
  standing concern is recorded rather than silently dropped: an unqualified "cybersecurity
  background" beside a book chapter called "The security pre-flight" implies a technical
  security role the ledger does not support. The resolution is to state NO role at all and
  lean on the ledger's own umbrella verb, "worked inside". A bare name-drop makes no role
  claim, so it cannot make a false one. Any future copy that reintroduces a Guardicore job
  title must use the real one (enterprise sales manager) or none.
- Ordani: **"hundreds of paying birth workers", none lost to a competitor** (operator
  update 2026-08-31: NO public user count. The paying framing replaces the 200 figure on
  EVERY public surface incl. metadata, JSON-LD, llms.txt, mdx dek/indexLine; 200 stays
  internal-only. Swept to zero same day.)
  VENDOR GATE (same date): Ordani surfaces never name infrastructure vendors — the case
  study had named the database vendor inside a security-architecture sentence on a HIPAA
  product. Tools list is capability nouns; body says "in the database".
  SECURITY-DETAIL GATE (operator 2026-09-01: "dont make specific security stuff on the app -
  hippa compliant app built by a team of birth workers and cyber security experts"). The
  vendor gate above stopped at vendor NAMES; this extends it to MECHANISMS. Ordani surfaces
  never describe how the protections work: no row-level policies, no encryption placement, no
  audit-log or export-gating description. Approved framing is **HIPAA-compliant, built with
  birth workers and cyber security experts** — the 22 practitioner interviews and the two paid
  independent reviewers (one healthcare, one cyber security) are the team, and both are
  already true. Swept from content/work/ordani.mdx the same day (tools list, step 03, "What it
  became"); it was the only surface carrying mechanism detail. Publishing your control design
  on a product holding real patient data is a gift to an attacker, and a buyer reads its
  absence as competence.
  SUPERSEDED 2026-09-01 (operator: "drop the user amounts across the website for ordani, just
  say it has active paying users, it's in beta, we're releasing to public soon"). Every user
  count is now OFF every public surface: no "200", no "hundreds". Approved phrasing is
  **"active paying users"**, framed as **in beta with a public release coming**. "None lost to
  a competitor" survives. Swept to zero rendered instances the same day across the case study,
  home, about, services, playbook, root metadata and llms.txt. The counts stay internal only.
  Historical entry: **used by 200 birth workers, none lost to a competitor**
  (operator update 2026-08-15 — SUPERSEDES the earlier "fourteen practices / eight
  active weekly at six months" entry, which described the closed beta and had gone
  stale on the live site). The earlier ledger line BANNED "Hundreds of users active";
  that ban is lifted by the same operator instruction that set the new number, and is
  recorded here rather than silently dropped. Still NEVER: "Zero churn". The closed-beta
  history (shipped to fourteen practitioners at launch) remains true AS HISTORY inside
  the case study; do not restate it as current usage. Framed as a real company ("a
  company I founded and built"), not a solo side project — except /playbook, where
  "built solo with AI tools" is the intended proof for that audience.
  Operator gave the exact figure 2026-08-15: **200**. The interim "hundreds"
  wording is retired — the voice rule wants named numbers, and "200 birth
  workers" is both truer and harder-hitting than "hundreds".
- Customers: anonymized descriptors only (top-10 North American bank, global systemically
  important bank, white-shoe Wall Street law firm). NEVER name TD Bank / Deutsche Bank /
  NIH / Davis Polk / Peoples Natural Gas.
  RETIRED 2026-09-01 (operator "go", buyer-review finding): **"world's largest public
  biomedical-research funder"** — an anonymised descriptor with exactly one possible answer
  is not anonymised. Superseded on every surface by **"a federal research agency"**. Swept
  to zero rendered instances the same day (guardicore.mdx dek + Outcome were the only two).
  Do not reintroduce the old phrasing; the same test applies to any future descriptor —
  if a reader can name the organisation from it, it is a name.
- The HR/industry-author engagement: ONE author; reach 8K→290K; RFP-to-close doubled; two
  six-figure retainers; **$3M in contracts won through the RFP platform, including a top
  university and a county government** (operator-supplied 2026-08-31, anonymized per the
  customer rule); the RAG RFP-scanning platform (real custom software). NEVER: the
  three fabricated end-clients (see #2).
  TRUE BUT UNPUBLISHED as of 2026-09-01 (operator "go", buyer-review finding): **"including
  a top university and a county government"** stays in this ledger as a fact and is now CUT
  from the rendered page. The client is described publicly as "name protected", and that
  detail plus the sector framing narrowed them to a guessable person. "$3M in contracts won"
  is what ships. Same call retired the two-six-figure-retainers bullet from the Outcome list
  (the retainer fact still appears once, in the Approach section). A ledger fact being
  confirmed is not the same as it being publishable — this row is the standing example.

- HIPAA: Ordani is **HIPAA-compliant** (operator confirmation 2026-08-31: "HIPAA compliant is
  true", ruling on the app). "HIPAA-grade" was the pre-confirmation hedge; swept to
  "HIPAA-compliant" everywhere (site + playbook chapter) same day. NEVER revert to "-grade".

- VENDOR GATE is now MECHANICAL (2026-08-31, second recurrence: operator caught /playbook author
  block naming three infra vendors; sweep also found the ch.4 blurb and ordani.mdx's "specializes
  in Postgres" reviewer line). scripts/vendor-gate.mjs blocks `pnpm build` when any rendered
  Ordani-mentioning file names an infra vendor/engine. Dev tools (Claude Code, Cursor) permitted.

**Gate:** Grep the WHOLE TREE for the NEVER-phrases before every commit touching copy —
not just the diff.

Why the change (2026-08-15): the diff-only version was scoped too narrowly and let
violations survive indefinitely. On this date a diff-grep caught "Two exits" in
`app/llms.txt/route.ts` only because an unrelated edit happened to touch that line. A
full-tree sweep then found the same banned claim in THREE more live surfaces that no
diff had touched in months: both OG images (what renders on every social share) and the
root `metadata.description` (what renders in search results). The site had been
under-claiming — two exits instead of three — everywhere a machine or a stranger looked.

Sweep, and expect zero:

```bash
for p in "Two exits" "\$15M pipeline" "trained the sales team" "built the channel"          "customer-evidence engine" "anchored the Nasdaq" "Zero churn"          "Hundreds of users active" "TD Bank" "Deutsche Bank" "NIH" "Davis Polk"          "Peoples Natural Gas"; do
  grep -rin "$p" app content lib components --include="*.ts*" --include="*.mdx"
done
```

Also applies to COMMENTS, not just rendered copy. Four banned strings were sitting in
code comments as historical narration; they render nowhere, but they are exactly the
vector this lesson exists to stop — stale prose is how a corrected claim comes back.
They are now written so the banned string does not appear verbatim.

## #4 — The financial-data prospect rule (2026-06-18)

**What happened:** Operator has a live financial-data-company prospect (category: fintech /
market data). He does not yet know their problems and must not appear to.

**Rule:** NEVER name the prospect on the site. NEVER presume any buyer's problem ("here's
your problem, I'll fix it"). Attract the financial-data/fintech CATEGORY by general
credibility only — shipped data products (the RAG RFP platform), past procurement experience
(multi-million-dollar cybersecurity RFPs), the data-into-G-SIBs record — always stated as
the operator's own history.

**Gate:** Any new copy naming a prospective client or diagnosing a specific company's
situation is rejected in review.

## #5 — www is a per-deploy alias until the dashboard add (2026-06-18)

**What happened:** `www.micahjonesconsulting.com` served a years-old v0 prototype from a
different Vercel project. Fixed by aliasing www to the current production deployment — but an
alias pins to ONE deployment; a later `git push` (auto prod deploy) will NOT move www.

**Gate:** The ship flow (STANDING_TECHNIQUES) re-aliases BOTH `micahjonesconsulting.vercel.app`
AND `www.micahjonesconsulting.com` on every deploy, until the operator adds www as a project
domain in the Vercel dashboard (Settings → Domains), which makes production auto-serve it.

## #6 — Next 16 RSC drops the space after an inline element when the following text contains an HTML entity (2026-08-11)

**What happened:** The Cowork design review caught "$20M+in client revenue" and "product
builds.Ordani" on /about. The JSX source had correct same-line spaces (`</strong> in`), but
the built output dropped them. Only text nodes containing HTML entities (`&ndash;`,
`&mdash;`) after an inline element lost their leading space — sibling lines without
entities rendered correctly. Verified against the local production build, both broken
instances and four correct controls.

**Root cause:** Next 16 / SWC's JSX transform splits entity-containing text segments
differently during RSC serialization and strips the segment's leading whitespace.

**Gate:** Any space between an inline element (`</strong>`, `</em>`, `</a>`) and following
text that contains an `&…;` entity must be an explicit `{" "}` join. Check on any copy
edit: `grep -rE '</(strong|em|a|b)> [^<{]*&[a-z]+;' app components --include='*.tsx'` —
zero hits allowed. Candidate for a write-boundary hook if it recurs.

### RECURRENCE 4 (2026-09-02, Pass-78) — it shipped, and three things above were wrong

Both of these were LIVE on production, in the rendered bytes, on the two surfaces a buyer
reads first: `/about` served `<strong>$20M+</strong>in client revenue` as the page's FIRST
receipt, and the home page served `<em>So I built Ordani.</em>It's in active use today`.

**The grep above was CORRECT and would have caught both.** Verified after the fact by
running it against the pre-fix commit: two hits, `about/page.tsx:87` and `page.tsx:316`.
It did not fail. **It was never run.** That is the primary cause, and the lesson is not
about entities at all: a gate that lives as prose in a markdown file is not a gate, it is
a reminder, and reminders lose to a busy pass every time. "Candidate for a hook if it
recurs" was written after recurrence 1 and was still a candidate at recurrence 4.

Two mechanism facts were also wrong, and each one costs a fix attempt:

1. **The prescribed fix does not survive the formatter.** `/about` carried a comment
   claiming an explicit `{" "}` join for three passes while the code used a literal space.
   Not carelessness: prettier COLLAPSES `</strong>{" "}` + newline back into a literal
   space whenever the result fits on one line. Applying the documented fix and running
   prettier silently un-applies it. Confirmed by doing exactly that and watching it revert.
2. **The entity does not have to be adjacent.** It can sit ANYWHERE in the same text node.
   Replacing `It&rsquo;s` did not fix the home page; the trigger was `workers&rsquo;
   pockets` four lines further on. Only clearing every entity in the node worked.
   Corollary: a `{/* comment */}` inside the element SPLITS the text node, so it relocates
   the boundary rather than fixing it.

**The durable fix is to remove the TRIGGER, not to re-add the space.** Write the en-dash
and the apostrophes as literal characters. No entity, no dropped space, and nothing for
prettier to undo.

**Gate, now actually wired:** `scripts/render-gate.mjs` gains a third check, `GLUE`, beside
LINKS and META, so it BLOCKS `pnpm build`. It reads the prerendered HTML in
`.next/server/app`, which is strictly stronger than the source grep: it survives prettier
reformatting, sees anything a component injects, and does not care how the JSX wrapped.
Proved it fails before trusting it (per #13) — wired and built BEFORE the fix, it named
both defects with route and context; then the fix; then green.
`span` is deliberately excluded (styled label spans correctly butt against the next word,
7 on /playbook alone). Probed against all 12 live routes before wiring: exactly the 2 real
defects, zero false positives.

## #7 — mix-blend-mode only blends inside its nearest stacking context (2026-08-13)

**What happened:** Pass-38 moved `mix-blend-mode: difference` off `.cw-nav` and onto
`.cw-wordmark` alone, to fix an AA failure on the 12px nav links. The wordmark then rendered
flat white on cream (1.28:1, effectively invisible) on five routes and shipped that way through
two more passes.

**Root cause:** `.cw-nav` is `position: fixed` + `z-index: 200`, which establishes a stacking
context. A blended child blends against _that_ context's backdrop — transparent — not the page
behind it. The blend silently became a no-op.

**Why it survived review:** `getComputedStyle` reports `color: #fff` whether the blend resolves
or not, so both a contrast probe and an axe scan report the same number for working and broken
states. An earlier audit leg had dismissed the axe finding as a false positive on the strength
of a screenshot taken BEFORE the Pass-38 change.

**Gates:** (a) Any element with `mix-blend-mode` must be verified by SCREENSHOT, never by
computed style — the property is invisible to the CSSOM. (b) Before adding `mix-blend-mode`,
check every ancestor up to `<body>` for a stacking context (`position` + `z-index`, `transform`,
`filter`, `opacity < 1`, `will-change`, `isolation`). (c) Prefer a solid `var(--cw-fg)` over a
blend for anything carrying text: it is AA by construction in every palette world, and this
site's world tokens already guarantee that pair.

## #8 — A published address is not a working address; MX is the only proof (2026-08-29)

**What happened:** `hello@micahjonesconsulting.com` was printed on six live surfaces —
both footers, the home CTA, the `/hire-me` CTA, and `llms.txt` (what AI crawlers cite) —
while the domain carried **zero MX records**. Every message any buyer sent to it bounced,
for the entire life of the site. The same gap made the two live lead forms
(`playbook-signup`, `beta-signup`) silently useless: they send a notification to `hello@`
via Resend, but with no SPF/DKIM/DMARC anywhere the domain was unverified, so Resend
rejected the send and the lead survived only in a Vercel server log.

**Root cause:** the address was treated as copy. Copy gates (`copy-lint`, the banned-word
sweep, the design review) all check that a string is _correct_, never that the thing it
names _functions_. Nothing in the build, the audit, or the ship runbook resolves DNS.
The contact server action was also dead code (no importer), which hid the fact that
nothing on the site had ever exercised the mail path.

**Why it survived every review:** the site is verified through HTTP — status codes,
rendered markup, Lighthouse, axe. An email address renders perfectly at 200 whether or
not a mail server exists behind it. This is the same class as #7: the probe reported
the same result for the working and the broken state.

**Gate:** every domain appearing in a `mailto:` on the site must answer MX before ship.
Run as part of CARD 1, and expect a non-empty answer for each:

```bash
grep -rhoE 'mailto:[^"'"'"' ]+' app components content | sed 's/.*@//' | sort -u | while read -r d; do
  echo "== $d"; nslookup -type=MX "$d" 8.8.8.8 | grep -i "mail exchanger" || echo "   !! NO MX — address bounces"
done
```

Corollary: any address used as a Resend `from:` also needs the sending domain verified
(DKIM at `resend._domainkey.<domain>`). A `from:` on an unverified domain is rejected at
the API, and the code paths here swallow that error by design.

## #9 — Adding a project domain defaulted to a redirect and looped the site (2026-08-31)

**What happened:** With apex configured to 308-redirect to www, `vercel domains add
www.micahjonesconsulting.com` attached www with a default redirect BACK to apex. Both public
domains looped (curl: 50 redirects) for ~2-3 minutes until the domain was removed and the
deployment alias restored.

**Root cause:** Production domain mutation without auditing the redirect config the new entry
would receive. Vercel assigns new project domains a redirect to the existing primary by default.

**Gate:** Any domain/redirect mutation is verified with `curl -s -o /dev/null -w "%{http_code} ->
%{redirect_url}"` on BOTH apex and www, BEFORE and AFTER — the two directions must never both
redirect. Do the add via the PROJECT dashboard (Settings → Domains) where the redirect choice is
explicit, with the alias removed seconds before. Never via bare CLI `domains add` again.

## #10 — A "Most chosen" badge is a data claim, not a design choice (2026-09-01)

**What happened:** The Pass-56 /services rebuild collapsed the 3×4 engagement matrix into one
four-shape table and tagged the operator-weighted Embedded row "Most chosen". No sales data
supports a frequency claim; the operator lock was a _preference_ (weighted/recommended), not a
count. Caught on the verification screenshot before commit; changed to "Recommended".

**Root cause:** Reaching for pricing-page convention ("most popular") while restating a
preference. Convention phrasing smuggled in a fact the ledger does not hold.

**Gate:** `lib/banned.ts` + `.claude/brand.json` now ban "most chosen", "most popular",
"best-selling", "bestseller", "fastest-growing" — build fails on any of them. Preference words
("Recommended", "Start here") stay allowed. If real sales data ever supports a rank claim, record
it in the ledger (#3) first, then lift the specific phrase with a dated note.

## #11 — A style rule only a human counts is not a rule (2026-09-01)

**What happened:** The house voice caps em-dashes at ONE per page, because a run of them reads
as an AI tell. Enforcement lived in the copy-editor subagent's instructions, so nothing measured
it. A buyer-persona review of the three case studies counted 5, 8 and 11 against a cap of 1, and
a follow-up sweep found six shipped .tsx pages carrying 2 to 5 each. The rule had been in
CLAUDE.md, unbroken on paper and broken everywhere in fact, since the site launched.

**Root cause:** The rule was written where a reader would see it and not where a build would
check it. Every other voice rule in this repo had a mechanical gate (banned words in
lib/banned.ts, frontmatter in the Zod schema, vendor names in scripts/vendor-gate.mjs); this one
had prose. Judgment rules decay silently between the sessions that remember them.

**Gate:** lib/copy-lint-runner.ts now counts em-dashes at build time and fails on any
content/\*_/_.mdx over the cap, reporting file, count and line numbers. TSX counts only prose
outside comments, since this codebase writes long explanatory comment blocks that legitimately
use them. Two defects were caught while building the gate itself and are worth remembering:
counting comment-stripped text while reporting raw line numbers cites lines it never counted, so
the stripper blanks comments while preserving newlines; and blanking a block comment to the empty
string instead of its own whitespace shifts every line number after it. The .tsx surfaces are
excluded from the failing set on purpose, listed in the RESUME queue instead, because sweeping
them edits copy the operator approved hours earlier. Widening the gate is one array.

## #12 — Two sessions on one repo collide silently, three ways (2026-09-01)

**What happened:** Two Claude sessions ran on this repo the same evening, neither aware of the
other. They collided three separate ways, none of which either session noticed until git
archaeology. First, a page rebuild was silently superseded: one session rebuilt /playbook as a
three-act launch page (Pass-53/54) after a DISCUSS pass, live 2026 research, a design-director
ruling and a buyer cold read; the other rebuilt the same route an hour later as "The manual,
opened" under a new `cw-lp-*` namespace, having seen none of that. The second version shipped to
production. Second, both sessions rewrote `.claude/RESUME.md`, a whole-file document each treats
as "the only current-state source", so whoever wrote last would erase the other's state. Third,
both committed a "Pass-61". The operator's actual complaint that evening was 5-hour usage, and
two sessions on top tiers spend two budgets against one window.

**Root cause:** Every coordination rule in this harness is per-session. The resume file, the pass
numbering, the one-writer-per-file rule and the model routing card all assume a single writer.
Nothing in the boot sequence asks whether anyone else is already here, so "read the resume file
at session start" produces a confident but stale picture the moment a second session is running.
The near-miss on RESUME.md was caught only because a status check happened to run before the
write, which is luck, not a mechanism.

**Gate:** `~/.claude/hooks/concurrent-session-guard.py`, wired to SessionStart globally. It looks
for another transcript in this project's directory modified within 15 minutes and, when it finds
one, injects the warning plus the four checks that would have prevented all three collisions: run
`git log --oneline -5` before trusting a pass number, read and MERGE the committed resume file
rather than rewriting from memory, stage by explicit path so the other session's in-flight work
cannot be swept into your commit, and check whether a page you are about to rebuild has already
been rebuilt. It never blocks, because concurrent sessions are often deliberate; it only removes
"I didn't know". Recorded alongside it in `~/.claude/MODEL_ROUTING.md` §6, which also notes that
routing cannot see this problem at all, since routing is per-session and this is between them.

## #13 — A link that resolves is not a link that works (2026-09-02)

**What happened.** Pass-70 moved the fixed-price packages off `/services` onto their own
`/packages`. One inbound link was missed: the end of `/playbook` offered
**"Fixed-price packages →"** pointing at `/services#packages`. Pass-70's own commit message
flagged it as "FLAGGED, NOT FIXED — other session's lane", and then it sat live for four
passes until the operator asked about it by hand.

**Why nothing caught it.** `/services#packages` returned **200**. The route still existed;
only the anchor had gone. There is no 404, no build error, no type error, no failing test,
and no broken-link checker that fires on this. The browser loads the page and parks at the
top. A reader who clicked a link labelled "Fixed-price packages" landed on a page with no
packages on it and no explanation. Every automated signal in the repo said the site was fine.

**The class, stated generally.** Any time a section moves, is renamed, or loses its `id`,
every link into it becomes live, resolving, and wrong. The failure is invisible to everything
that checks *whether a request succeeds* and visible only to something that checks *whether
the destination still contains what the anchor text promised*.

**The gate.** `scripts/render-gate.mjs`, last step of `pnpm build`. It reads the prerendered
HTML in `.next/server/app` — the bytes a reader actually receives, not the source, so it needs
no guesses about route resolution and cannot miss a link a component injected. For every page
it checks:

- every internal `href` names a route that exists (301 sources are read out of
  `next.config.ts`, so the gate cannot drift from the redirect table)
- every `#fragment`, same-page or cross-page, names an `id` that is actually rendered
- `<title>` ≤ 60 and `<meta description>` ≤ 160, entity-decoded first, and **skipped on
  `noindex` pages** — those never appear in a result, and three standing false positives is
  how a gate gets switched off

**Proof it works.** The bug was reintroduced into the built HTML and the gate named it:
`/playbook  href="/services#packages" — /services renders, but has no id="packages"`.
A link to a nonexistent route was caught the same way. A gate that has never failed is
untested; make it fail on purpose before trusting it.

**Caught on the same run.** `/playbook` rendered a 61-char title and a 204-char description.
The root layout appends `" — Micah Jones"`, so a page title that looks fine in the source is
14 characters longer in the SERP. Measure the rendered `<title>`, never the literal.

## #14 — A claim sweep scoped to the site cannot see the product (2026-09-02)

**What happened.** Two operator rulings landed on 2026-09-01: drop every Ordani user count
from public surfaces ("just say it has active paying users, it's in beta"), and stop
describing how Ordani's protections work ("dont make specific security stuff on the app").
Both were swept the same day across "the case study, home, about, services, playbook, root
metadata and llms.txt", and #3 recorded that `content/work/ordani.mdx` "was the only surface
carrying mechanism detail."

That was wrong. `product/playbook/src/*.typ` — the 69-page PDF sold at $99 — carried the
retired count in **four** places and Ordani's authorization design in **three** field notes,
including one directly beneath a working row-level-security policy. It was on nobody's list
because it is not part of the Next.js build: no route renders it, no `pnpm build` touches it,
so every sweep that walked `app/ content/ components/` was structurally blind to it. One of
the four counts sits in chapter one, which ships as the **free sample** — the most-read
surface of all.

Found a day later by a cross-model manuscript review, not by any sweep.

**The lesson is not "sweep harder."** A sweep scoped to rendered site files cannot see a
product that is compiled by a different toolchain. When a ruling is about a CLAIM rather than
about code, its scope is every artifact a stranger can read, which here includes a PDF, a
free sample chapter, and a companion ZIP.

**The gate.** `scripts/ordani-claims-gate.mjs` — retired counts anywhere in scope, plus
mechanism language within 8 lines of an Ordani mention (proximity, not a keyword ban:
teaching RLS generically is the book's job; naming Ordani beside it is the defect). Scope is
`app/ components/ content/` **and** `product/playbook/src/`.

**Two things this cost, worth repeating.** The gate's first cut matched per line and missed
the chapter-07 field note, because the book's Typst source hard-wraps prose and the phrase
split as `ownership enforced in the\n  database`. It caught two of the three siblings and
reported success. A gate with a blind spot is worse than no gate, because it certifies —
match against flattened text and map offsets back to line numbers. And the chapter-05 source
comment cites "RLS in the database" as an *approved* phrasing dated 2026-08-31; the ruling
that retired it landed 2026-09-01. A file's own comment is a snapshot of the rules on the day
it was written, never the current rule.
