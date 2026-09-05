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
- Guardicore **PIPELINE NUMBER RETIRED FROM PUBLIC SURFACES — operator 2026-09-03**,
  verbatim: "just drop the pipelione number site wide. put the rev number. dont want to be
  specific on roles. i know recruitors might not like that but i prefer it."
  The $80M pipeline figure remains a TRUE ledger fact and is NOT withdrawn; it simply no
  longer renders anywhere public. WHY: a persona review found the case study said "I
  generated $80M in pipeline and $14M in revenue" beside "so the account executives spent
  their time on real deals", so the site's largest number was also its least attributed -
  a reader could not tell whether it was originated pipeline, closed quota, or the team's
  book. The operator chose to drop the ambiguous number rather than resolve the attribution.
  PUBLIC FIGURES NOW: **$14M in revenue** and **$1.2M average enterprise deal size**, plus
  the 2021 Akamai acquisition. Swept 2026-09-03 to zero rendered instances across the home
  metadata and ledger row, /services proof, /work metadata and hero, llms.txt, and the case
  study's dek, feature, indexLine, stats, step 01 and Outcome.
  ROLE: the case study's `role` is now **"Revenue and positioning"**, not a job title. This
  SUPERSEDES the earlier "use the real one (enterprise sales manager) or none" for this
  surface - he picked none, knowingly, and accepted the recruiter cost in the same sentence.
  The home ledger tag is now the year range alone. NEVER restore "$80M" or a Guardicore job
  title to a public surface without a new dated ruling.
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

- Consulting revenue **$20M+, SINCE 2013 and OPEN-ENDED** (operator 2026-09-02: "20 mil holds
  to today"). SUPERSEDES every closed "(2013–2023)" rendering, which read as a practice that
  stopped three years ago — on /about it sat two lines above a heading called "Currently".
  Swept 2026-09-02 to /about, the home ledger row, the JSON-LD in layout.tsx and llms.txt.
  NEVER re-close the range. The footer's "© 2013–2026" is a copyright line, not this claim.
- Content engine **DISTRIBUTION — operator-supplied 2026-09-02**, verbatim: "it face
  facebook, tiktok, linkedin, insta, twitter, threads, bleusky. a bunch of places got
  content". Seven platforms: LinkedIn, Facebook, Instagram, TikTok, X, Threads, Bluesky.
  Two carried the weekly cadence, one was deliberately underinvested. **RETIRED the same
  day: the "4×" stat ("two platforms over the third")**. It had NO ledger entry, and once
  seven platforms were named "the third" referred to nothing; rewording it to "the rest"
  would have silently changed what the number compared against (4× over one platform is
  not 4× over six). The bet's OUTCOME is kept qualitatively ("the two platforms I backed
  outperformed the one I did not"), which the narrative supports. Do not restore the 4×
  without a source and a date.
- **CONSULTING-ERA POSITIONING RECEIPTS — operator-supplied 2026-09-03.** Both clients
  stay ANONYMOUS, matching how the case studies already refer to them.
  BIRTH WORKER: repositioned from birth support alone to the full arc of care around it.
  **Organic bookings up 30%**, and inquiries arriving across her whole range rather than one
  service. Operator verbatim: "organic bookings went up 30% and her inquires went from 100%
  normal birth support - to a diverse set of customers (abortion, prepping to get pregnant,
  miscarriage support, etc)". THE SERVICE LIST IS DELIBERATELY NOT ITEMISED ON THE SITE:
  naming abortion and miscarriage care on a consulting marketing page creates exposure for
  HER practice that the proof does not need, and the breadth is the point. Itemise only on a
  new operator instruction.
  INDUSTRY AUTHOR: repositioned toward the buyers who award contracts; the $3M already
  ledgered is the result that followed. Same person as the RFP-engine and content-engine
  studies. **The operator named them in conversation on 2026-09-03; the site anonymises them
  and must continue to.** Never publish the name or anything that resolves to it.
- Content engine **EIGHT platforms, not seven — operator 2026-09-03: "We did ship on
  YouTube"**. LinkedIn, YouTube, Facebook, Instagram, TikTok, X, Threads, Bluesky. This
  SUPERSEDES the seven-platform line written 2026-09-02 and reconciles the strategy document
  (which named YouTube) with what shipped. The stat reads "Eight".
- **RETIRED 2026-09-03, operator "Cut it":** "The two largest engagements that closed were
  both six-figure retainers" on /work/rfp-engine. Never in the ledger, unverifiable from
  outside, and sitting beside two figures that are ledgered. Do not restore it.
- **CAP TABLE NAMED — operator confirmed 2026-09-03.** SurveyMonkey and Guardicore both
  carried his name on the cap table; he held equity, not only salary, when each exited.
  /about said "Two carried my name on the cap table" without saying which, which a
  procurement reader flagged as unverifiable. Both are already named in the same sentence,
  so naming them costs nothing and removes a bare count. Neuton is still explicitly NOT a
  cap-table position; Postmates was employment.
  NOTE ON HOW THIS WAS CONFIRMED: asked about the line he replied "what does that even mean?
  what is the congtext of this". The claim was therefore explained to him in plain terms - an
  equity stake at exit, materially more than "I worked there" - and only then confirmed. An
  equity claim is the riskiest class of line on a personal site; do not restate it from the
  ledger alone if it is ever questioned again.
- Ordani **start year 2025** (operator 2026-09-03). The home ledger row said "2026" while
  /work and the case study said "2025-2026". Home now matches.
- Playbook **companion pack: 26 ZIP entries = README + 10 checklists + 6 prompts + 9
  templates.** The page says "Nine templates". CORRECTION, 2026-09-04 (Pass-98): the
  2026-09-03 adjudication recorded above said ten templates and 27 files in the archive,
  and both halves were wrong. It counted the README as a template and then also added it
  again as a 27th file. The probe is the archive itself, not a document:
  `python -c "import zipfile;print(zipfile.ZipFile('product/playbook/output/the-80-percent-wall-companion.zip').namelist())"`
  returns 26 names, 9 of them under `templates/`. The spec row "Companion files 26" was
  right all along and is unchanged. Re-run the namelist whenever the pack changes; never
  reconcile two written numbers against each other.
- **WEEK ONE of an engagement — operator 2026-09-03**: "First week would be a scoping
  meeting and audit - foundational work to set up the engagement for success." The site had
  only ever answered MONTH one ("something named ships in month one"), which is not the
  question a buyer at $5K a month asks first. Now on /services under "Why one person".
- **CAPACITY — operator 2026-09-03**: "Im taking work. No need to put specifics on how many."
  /about now says "I am taking new engagements now" and carries NO COUNT, deliberately. An
  invented number reads as a tactic and a real one has to be maintained. Do not add one.
- **THIRTEEN YEARS, not "a decade" — operator 2026-09-03.** The site said "a decade" in two
  places on /about while the footer and the revenue line both say since 2013, so it undersold
  by three years on the page where a buyer assesses depth. SUPERSEDES "a decade" everywhere.
- **REPLY PROMISE: one business day, everywhere — operator 2026-09-03.** The site had three
  versions of one promise: "usually within one business day" (/contact), "within one business
  day" (/packages) and "inside two business days" (the footer on EVERY page). Standardised to
  one business day, footers included. Zero "two business days" remain.
- SurveyMonkey: enterprise sales, **$1M+ toward the IPO**. NEVER: "customer-evidence engine",
  "anchored the Nasdaq IPO".
- Exits: **FOUR companies he worked inside reached an exit** (operator update 2026-08-30:
  "considering i was apart of four exits - postmates, surveymonkey, guardicore, neuton ai" —
  SUPERSEDES the three-exit entry below). **EMPLOYER RULED 2026-09-03, operator verbatim: "I worked at SurveyMonkey"** - not
  TechValidate. The site had named one exit FOUR ways (SurveyMonkey on home and
  /services, "TechValidate (held through the SurveyMonkey IPO)" on /about,
  "TechValidate (SurveyMonkey)" on /playbook), which a cross-reading reviewer read as
  the site being unable to decide. Standardised to SurveyMonkey on every surface
  2026-09-03, including the JSON-LD alumniOf and llms.txt. Do not reintroduce
  TechValidate. Role split: SurveyMonkey
  (IPO 2018, cap table), Guardicore→Akamai (2021, cap table), Neuton.AI→Nordic Semiconductor
  (2025, "helped launch", NOT cap table — never claim Neuton equity), Postmates→Uber (2020,
  **role CONFIRMED by the operator 2026-09-02, HOLD LIFTED: "product analyst at postmates is
  the title"**. Renders on the home ledger as "Product analyst · 2020", which is where he was
  asked about it and which he confirmed. The row had carried that tag since Pass-7 on a commit
  message's word; it is now a ledgered fact with a date. Years beyond 2020 still not supplied). Umbrella phrasing: "worked inside" or "behind my work", never
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
  not authorise years beyond those already ledgered. (The Postmates ROLE hold was lifted
  separately on 2026-09-02 - see that entry above.) First rendered on /playbook (Pass-68).
  **NAME THE COMPANY, NOT THE JOB — operator 2026-09-02, verbatim: "remove the sales part
  too"**. He does not want "Enterprise cybersecurity sales at Guardicore" on the page. The
  standing concern is recorded rather than silently dropped: an unqualified "cybersecurity
  background" beside a book chapter called "The security pre-flight" implies a technical
  security role the ledger does not support. The resolution is to state NO role at all and
  lean on the ledger's own umbrella verb, "worked inside". A bare name-drop makes no role
  claim, so it cannot make a false one. Any future copy that reintroduces a Guardicore job
  title must use the real one (enterprise sales manager) or none.
  **SCOPE RULED 2026-09-02, operator verbatim: "just the playbook"**. The "remove the sales
  part too" instruction applies to **/playbook ONLY**. The home ledger's "Enterprise sales ·
  2021" tag and the case study's "Enterprise sales manager" Role row are the REAL title and
  STAY. Do not sweep them; a future review that flags them is reporting a false positive.
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

- **RESEARCH CORPUS, the four facts the book's chapter 9 cites — operator "proceed"
  2026-09-04.** Written in the same session as the book repo's `docs/CLAIMS-LEDGER.md`
  row of the same title (split hazard). **4,464 posts** with 250+ character bodies from
  **ten subreddits** (SaaS, buildinpublic, microsaas, startups, EntrepreneurRideAlong,
  nextjs, cursor, ClaudeAI, webdev, ChatGPTCoding), 3,842 authors, windows 2025-09-23
  to 2026-08-03 (`Code/reddit-research/data/corpus.jsonl`, gitignored; denominators
  asserted by every script in `Code/reddit-research/cuts/`). **607 asking posts / 567
  authors; "kept running" = 21 distinct asking authors** (`reddit-research/reference/
  emergent-language.json`). **The playbook page's former second sentence appears in 0
  of the 4,464 posts** (`.planning/research/04-CUT-A-chapter-demand-map.md`, appendices
  A and B). The page moved the attested beat to first on 2026-09-04 (Pass-98). MAY say:
  those four facts as the author's own measurement. NEVER: a market-size claim from
  them; a rate ("8.9%", "1.0%") — the fetches disagree tenfold on rates
  (`.planning/research/04-CUT-F-launch-rooms.md` §8); a Reddit user's words as an
  attributed quotation. ADDED 2026-09-04, same session as the book repo: the
  governing phrase file is the frozen snapshot `reddit-research/handoff/
  emergent-language.json` (4,464 posts), not `reference/`, which was regenerated on
  a larger crawl; **Cut B** (`.planning/research/04-CUT-B-landing-page-posts.md`:
  35 asking posts / 34 authors say "landing page", 18 of 34 want a page that exists
  to convert or be reached, 4 want one built) licenses chapter 9's body line
  "founder after founder who asked for help with a page"; the corpus is twelve
  10-day windows across 2025-09-23 → 2026-08-03, so the book says "ten months",
  never "a year".
- **PLAYBOOK PRICE — operator 2026-09-04**, verbatim: "Price stays $99 launch / $149
  after unless I say otherwise. The $149 trigger is open; it moves p.42 and the
  site's spec card together." $99 at launch, $149 after; the increase date is NOT
  ruled. Surfaces that move together: the /playbook spec card and price lines, the
  book's chapter-8 sampler colophon, the dormant chapter-1 colophon, chapter 6's
  build-log entry ("the $149 button"). Twin row in the book repo's
  `docs/CLAIMS-LEDGER.md`, same session.

- **ORDANI BUILD TIME, "six weeks" — provenance recorded 2026-09-04, operator
  confirmation pending at the book's ship gate.** The book's chapter 2 build-log entry
  (2026-05-19) says the author spent six weeks polishing Ordani's interface toward an
  unlocked reference. Provenance: the UI-006 post-mortem of 2026-05-19 in the Ordani
  repo, cited in the operator's marketing playbook ("UI-006 burned 6+ weeks"). The
  author's own working time, not a customer, revenue, user or security fact. Twin
  row in the book repo's `docs/CLAIMS-LEDGER.md`, same session.

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
that checks _whether a request succeeds_ and visible only to something that checks _whether
the destination still contains what the anchor text promised_.

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
comment cites "RLS in the database" as an _approved_ phrasing dated 2026-08-31; the ruling
that retired it landed 2026-09-01. A file's own comment is a snapshot of the rules on the day
it was written, never the current rule.

## #15 — A sweep recorded as done is not a sweep; the probe is (2026-09-04)

**What happened.** The #3 ledger entry that opened the consulting revenue range says it was
"Swept 2026-09-02 to /about, the home ledger row, the JSON-LD in layout.tsx and llms.txt."
`llms.txt` was not swept. It still served the closed range, and beside it two employers that
appear in no ledger entry and on no other surface. The same file's opening paragraph names
the four exits, so it contradicted itself for two days on the one page written for machines.

The 2026-09-03 "thirteen years, not a decade" ruling went the same way. It landed on the
`/about` body twice and stopped there. The meta description and the `/work` share image both
kept the retired wording for a day, which is what a stranger sees first and what a share
preview shows before anyone clicks.

**What it cost.** Eight live defects on the pages that convert, found by reading a snapshot
of the served site rather than by any check the build ran. "Swept to X" with a date on it
read as evidence in every session that followed.

**The lesson.** A sweep is a claim like any other, and a claim needs its probe output. "Swept
to X" is an intention until a grep of the SERVED surface returns zero. Rendered copy, meta
descriptions, share images and `llms.txt` are four different surfaces; a ruling that touches
prose touches all four.

**The gate.** `scripts/retired-phrases-gate.mjs`, wired into `pnpm build` after the vendor
gate. It fails the build on the closed range in either dash, "a decade", the two unledgered
employers, and the retired "email me" instruction, anywhere in `app/ content/ lib/`. Code
comments are stripped first, since narrating a retired string is how the correction stays
next to the code. One narrow exemption: the operator-locked `alumniOf` array in
`app/layout.tsx`, whose membership is a schema.org employment list and whose own comment
explains why it differs from the prose.

## #16 — A generated artifact is committed code, and CRLF makes a clean file look dirty (2026-09-04)

**What happened.** Pass-97 committed `.planning/snapshots/2026-09-04/_report.json` straight
from `scripts/snapshot-live.py`. Python wrote it with CRLF endings and one-space indentation.
Prettier wants LF and two. So the pass shipped an artifact that fails `prettier --check`,
under a commit body that claimed "prettier --check passes".

The same script wrote the 19 `.txt` snapshots with CRLF. Git normalized those to LF on commit,
so the repository stayed clean and only the working copies drifted. Two files last written that
way at Pass-94, `app/(foyer)/contact/page.tsx` and `content/work/rfp-engine.mdx`, then failed
`prettier --check` on disk while their committed bytes passed it. A verifier read that as two
style defects. Both were checkout artifacts. Deleting either file and running `git checkout`
returns LF, because `.gitattributes` sets `eol=lf` and that beats `core.autocrlf=true`.

**What it cost.** One false defect report naming two innocent files, and one real defect that
the blanket claim had hidden. Pass-88 burned a pass on the same confusion and filed it as "30
files, pre-existing CRLF drift", which is the description of a symptom.

**The lesson.** Two rules. A file a script generates is a file the repo ships, so it meets the
same formatting bar as code written by hand. And a formatting probe run against a Windows
working tree reads line endings, not style. Check `git show HEAD:<path>` before calling a file
malformed, and scope the claim to the files actually checked.

**The gate.** `scripts/snapshot-live.py` now opens every output with `newline="\n"`, dumps the
report at `indent=2`, and runs `pnpm exec prettier --write` on it before it exits. That last
step is best effort, so a machine with no prettier still gets its snapshot.
