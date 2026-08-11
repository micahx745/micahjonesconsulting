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
- SurveyMonkey: enterprise sales, **$1M+ toward the IPO**. NEVER: "customer-evidence engine",
  "anchored the Nasdaq IPO".
- Exits: **THREE companies he helped build reached an exit** — TechValidate→SurveyMonkey
  (IPO 2018, cap table), Guardicore→Akamai (2021, cap table), Neuton.AI→Nordic Semiconductor
  (June 2025, "helped launch", NOT cap table — never claim Neuton equity). NEVER: "Two exits".
- Ordani: fourteen practices, **eight active weekly at six months, none lost to a
  competitor**. NEVER: "Zero churn", "Hundreds of users active". Framed as a real company
  ("a company I founded and built"), not a solo side project — except /playbook, where
  "built solo with AI tools" is the intended proof for that audience.
- Customers: anonymized descriptors only (top-10 North American bank, global systemically
  important bank, world's largest public biomedical-research funder, white-shoe Wall Street
  law firm). NEVER name TD Bank / Deutsche Bank / NIH / Davis Polk / Peoples Natural Gas.
- The HR/industry-author engagement: ONE author; reach 8K→290K; RFP-to-close doubled; two
  six-figure retainers; the RAG RFP-scanning platform (real custom software). NEVER: the
  three fabricated end-clients (see #2).

**Gate:** Grep the diff for the NEVER-phrases before every commit touching copy. Candidate
for a pre-commit hook if it recurs.

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
