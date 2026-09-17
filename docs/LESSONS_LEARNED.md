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
  studies. **SUPERSEDED 2026-09-15: they are TWO DIFFERENT CLIENTS — see the TWO CLIENTS,
  NOT ONE row below. The $3M and the repositioning belong to the RFP client; the reach
  figures belong to the content-engine client.** **The operator named them in conversation on 2026-09-03; the site anonymises them
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
- Neuton.AI **row tag stays 2025, the acquisition year** — operator 2026-09-11, verbatim:
  "for neuton 2025". Closes the 2025-versus-2020 question; no surface renders a Neuton
  year other than 2025.
- **NEVER the load-bearing term, in either spelling, anywhere on the site** — operator
  2026-09-11, verbatim: "the term load bearing cannot be used anywhere on this site".
  Enforced by lib/banned.ts (both spellings) since Pass-110. The ban list is the one
  lib file allowed to carry the string, so the sweep below excludes it by name.
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
- The home exit record renders each exit's own disclosed value and outcome and **no
  aggregate** (Pass-111a, 2026-09-11). Astra ruled the row "Combined, disclosed deals, $5.58B"
  a trust risk, because it added SurveyMonkey's first-day IPO value to two acquisition prices
  and called all three deals, so it was cut. The **$5B+** floor carries the same mix and is
  **KEPT: operator 2026-09-12, verbatim "keep"** (decision 8, asked 2026-09-11 with a
  recommendation to drop). It stays, on its mixed basis, in root, home and about metadata,
  the home, about and work OG images, the /about body and llms.txt. Do not drop or
  requalify it in a future honesty sweep without a new dated ruling.
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

- **THE $20M IS A MIX, NOT CONSULTING REVENUE — operator 2026-09-15**, verbatim: "that revenue
  mark is a mixture of some of my work with corps as an employee and some of it consulting. I
  think its best we dont state consuilting revenue since 2013. Make it more broad but keep the
  20 mil". This SUPERSEDES the 2026-09-02 row above ("Consulting revenue $20M+, SINCE 2013 and
  OPEN-ENDED"), which is live on /about, the home ledger row, the JSON-LD in `app/layout.tsx`
  and `llms.txt`. The FIGURE stands. The ATTRIBUTION does not: it spans employed work and
  consulting. NEVER: "consulting revenue" attached to the $20M, or a since-2013 consulting
  practice claim. WORDING ANSWERED 2026-09-15 (his pick, verbatim): **"$20M+ in revenue behind
  my work"**. (Recorded here late, on 2026-09-16, after the Fable craft gate listed it as open;
  see LESSONS #32.)
- **THE 290K REACH FIGURE IS UNVERIFIED — operator 2026-09-15**, verbatim: "Technically it got
  up to 800,000 impressions. That 290 numner not sure where that came from, maybe from one of
  the vids view count." The 8,000 to 290,000 claim and the derived "36×" are LIVE on
  `content/work/content-engine.mdx`, the /work index line and metadata ("36x reach for an
  author"), the /services Product building receipt, and the home surfaces that carry it. Until
  he settles a figure with its unit and period, NOTHING may restate 290,000 or 36× as new copy,
  and the rewrite of that study states no multiplier. Provenance of 290,000: unknown, possibly a
  single video's view count. Candidate replacement: up to 800,000 impressions, unit and period
  to be confirmed. The client's industry is never named on any surface (see the anti-racism ban).
- **NO PERSONAL YEARS ON ANY SURFACE — operator 2026-09-15**, verbatim: "No years tying me to
  places. I dont want i was at guardicore 2017-2020 or anything like that for other companies
  like surveymonkey. You can state the IPO years that is okay but nothing personal". EVENT years
  stay (IPO 2018, Uber 2020, Akamai 2021, Nordic Semiconductor 2025). TENURE years go, wherever a
  year sits beside his role: the /work index meta rows, the case-study frontmatter `year` as it
  renders, the Tel Aviv photo caption "2018-2021", the home ledger row tags, /about's roster, the
  record block's Years column, and any JSON-LD that derives a date from a tenure range.
- **ORDANI CARRIES NO COUNTS AT ALL — operator 2026-09-15**, verbatim: "Yeah lets not number how
  many users or paying collectives. Keep it broad." This EXTENDS the 2026-09-01 ban on user
  counts to every count of users or practices, including the closed-beta history the earlier
  ledger row permitted inside the case study ("fourteen practitioners", "eight active every
  week, six had referred a peer"). The 22 pre-build interviews are research, not users, and
  remain publishable pending his confirmation.
- **THE RFP CLIENT WAS NOT REPOSITIONED — operator 2026-09-15**, answering what changed in who
  the author sold to, verbatim: "Nothing really. THey were selling to similar/same folks. It just
  tthose contracts were award via friends. This helps with opps outside of california and ones not
  connected to existing network. but i dont want to say that, its unprofessional to say on a site
  that someone built a business of their friends." This UNDERCUTS the 2026-09-03 row above
  ("INDUSTRY AUTHOR: repositioned toward the buyers who award contracts") and the live /services
  receipt that repeats it. The true value of the RFP engine is REACH BEYOND THE EXISTING NETWORK:
  opportunities from buyers who did not already know the client, including outside their home
  state. NEVER: that contracts came through friends, or any framing that the business was built
  on friendships; never "California" (identity). The /services "repositioned toward the buyers
  who award contracts" line: ANSWERED 2026-09-16, his pick "Replace with reach beyond their
  network". The receipt becomes: "An author and leadership consultant: software that finds and
  drafts RFPs from buyers outside their existing network. $3M in signed contracts, close rate
  doubled."
  Fable's craft fix #6 (a "00. The reposition" step) is REJECTED on this entry.
- **ORDANI'S PROBLEM WAS SIX TOOLS, NOT A HACK — operator 2026-09-16**, verbatim, answering whether
  "every practitioner had been hacked": "they did not think they got hacked. I think the biggest
  issue was that nobody realized they needed platform. Either paying for half dozen softwares that
  do work well to run your business. Again dramatize this and think what a reallly amazing story
  would be and then i can tell you if it happened like that". The live line "every practitioner had
  been hacked or scared into thinking they had been" (content/work/ordani.mdx:48) is FALSE and
  comes out in the Pass-120 sweep. NEVER: any claim that practitioners were hacked or feared they
  had been. TRUE: nobody realized they needed a platform; practices ran on about half a dozen
  separate tools. A dramatized replacement (tags O4-O8) awaits his check.
- **GUARDICORE "A MAJOR U.S. UTILITY" IS TRUE — operator 2026-09-16**, "True, keep it and ledger
  it". Added to the approved anonymised customer descriptors beside the global systemically
  important bank, the federal research agency and the white-shoe Wall Street law firm.
- **RFP "FIRST DRAFTS IN HOURS INSTEAD OF DAYS" IS TRUE — operator 2026-09-16**, "True, keep it".
- **ORDANI O4-O8 CONFIRMED — operator 2026-09-16**, "Yes, as written": the "Six apps and a Sunday
  night" problem section in `.planning/drafts/pass-120/four-studies-DRAFT.md` (half a dozen tools,
  the practitioner as the integration, nobody knowing they needed a platform, every copy of client
  data one more place it lived) is TRUE and publishable.
- **BIRTH WORKER SCOPE — operator 2026-09-16**, verbatim, answering whether the work went beyond
  positioning (he ticked website, marketing or content, and intake or booking setup, and wrote):
  "also via [claims vendor] (please dont mention private vendors just sharing so you get context)
  to help her get back thousands of dollars that would have been paid in fees to process mediaid or
  medicare claims via her birthwork." The engagement therefore covered positioning, her website,
  marketing and content, intake and booking setup, and direct Medicaid and Medicare claims that
  kept THOUSANDS OF DOLLARS she would have paid in processing fees. NEVER name the claims vendor
  on any surface (the name is gated in `scripts/retired-phrases-gate.mjs`, Pass-120). No dollar
  figure beyond "thousands of dollars". Astra's 2026-09-15 partial finding that the draft
  reduced the engagement to copywriting was correct.
- **BIRTH WORKER BOOKINGS, BOTH SIDES — operator 2026-09-16**, verbatim: "bookings and the 5-10 are
  bookings too". SUPERSEDES the reading below that the 5-10 were inquiries. The publishable pair:
  bookings went from ONE TO THREE A MONTH to FIVE TO TEN A MONTH. The earlier "organic bookings
  up 30%" was his floor, not a measurement; new copy uses the pair, and the live /services
  receipt that still says "Organic bookings up 30%" is swept to the pair in Pass-120.
- **YEAR FIELDS — operator 2026-09-16**, his pick "Keep a date behind the scenes, show none".
  Each study keeps a date for sorting and structured data: the date the page was published,
  NEVER a tenure year. No year renders beside a role on any surface. Event years (IPO 2018, Uber
  2020, Akamai 2021, Nordic Semiconductor 2025) stay where they describe the company's event.
- **PASS-120 BUILD ANSWERS — operator 2026-09-16**, by popup while the brief was assembled.
  PUBLISH DATE: "The release date of the rewrite" for all five studies (the hidden publishedAt
  that feeds datePublished is the release day, never a first-commit or tenure date). HARNESS:
  "Yes, edit the hook" (premium-web mdx-frontmatter.sh may stop requiring role, tools, year).
  ORDANI QUOTE: "Drop it" (the beta-user pull quote leaves the study). LCP for the hero clip:
  "Field data, like Pass-119" (Speed Insights p75 on /work after release decides; lab numbers are
  reported, and /work may not ship slower in the lab than production /work today). Left to the
  judge and ruled in .claude/briefs/pass-120-work-page.md §1.2: the Guardicore band still is the
  clip's frame 0; the clip crossfades back to frame 0 at its end; studies take an R2 exception at
  56/18.
- **RELEASE DAY FOR publishedAt — operator 2026-09-16**, build session, asked once by popup per
  brief O16 ("What day do you plan to release the /work rewrite?"), verbatim: "ASAP WE ARE JUST
  hiding dates and years i worked stuff and keeping it in the hidden background for seo". No date
  given, so O16's no-date path applies: all five studies carry `publishedAt: "2026-09-16"`, and
  before any push to `main` every study's publishedAt must equal the deploy day recorded in RESUME;
  if not, the five values change in one commit and the site rebuilds. The field stays hidden (JSON-LD
  and sort only), never a tenure year, never rendered.
- **PASS-120 FIRST-PREVIEW ANSWERS — operator 2026-09-16**, by popup after the Fable first-preview
  look (.planning/reviews/FABLE-120-FIRST-PREVIEW.md). SPEED: picked "Preview deploy test
  (Recommended)", whose description read "I push the branch so Vercel builds a private preview (no
  domain, production untouched), then run the same speed test against the live site. Fair
  comparison. This counts as your go-ahead to push the branch today." So A4's lab limit is measured
  preview-vs-production by the same Lighthouse loop; branch pushes are approved for 2026-09-16 only;
  main, production and aliases are not. WORDING: picked "Yes, 'his' there (Recommended)": on the two
  third-person surfaces only (app/layout.tsx PERSON_LD description, app/llms.txt/route.ts summary
  line) the $20M sentence reads "$20M+ in revenue behind his work."; every visible first-person
  surface keeps "$20M+ in revenue behind my work". The figure and the claim do not change. NEXT
  GATES: picked "Yes, run them (Recommended)": copy check by curl, one Fable ship-gate read, the
  motion-engineer's written sign-off.
- **PASS-120 SHIP ANSWERS — operator 2026-09-16**, by popup after the Fable ship gate
  (.planning/reviews/FABLE-120-SHIP-GATE.md). SPEED OVERRIDE: picked "Override, release today
  (Recommended)", whose description read "I record your override with today's date. After the last
  doc fixes land and the build and checks pass again, I merge to main (that deploys), check both
  domains live, and real-visitor Speed Insights decides after release. Undo is one step: promote
  today's production deploy." This is the dated operator override of A4 and brief §6.6 for /work:
  on Vercel the preview's simulated mobile LCP median was 3311ms against production's 2711ms
  (observed 265-300ms against 277ms); LCP is judged on Speed Insights field p75 for /work after
  release. MEDICAID ONLY: asked whether "Medicaid and Medicare" is right, verbatim: "its the one
  for low income not elerdely forgot the difference". The birth worker's direct claims were
  MEDICAID only (the low-income program); SUPERSEDES "Medicaid and Medicare" in the BIRTH WORKER
  SCOPE row above. NEVER "Medicare" for her. ORDANI OPENING SENTENCE: asked about the comma in
  "Birth workers, doulas, midwives and perinatal counselors, were not running their practices on
  nothing.", verbatim: "what is that sentence??? sounds horrible. thought fable was reviewing
  everything??". The sentence is REJECTED as written (not only its comma); its replacement is
  his pick, recorded on the row below when he makes it.
- **ORDANI OPENING, PICKED — operator 2026-09-16**, by popup, picked "One plain sentence
  (Recommended)". The first two sentences of "Six apps and a Sunday night" in
  content/work/ordani.mdx become EXACTLY: "Doulas, midwives and perinatal counselors ran their
  practices on half a dozen tools: a scheduler, an invoicing app, a form builder for intake, a notes
  app, a payments app, and a group chat holding it together." The "not running their practices on
  nothing" setup is gone. Facts unchanged (O4-O8).
- **THE /WORK METHOD LINE — operator 2026-09-16**, picked from Fable's six candidates
  (.planning/reviews/FABLE-120-METHOD-LINE.md, candidate 2), after asking for it "reword with help
  from fable". EXACT approved copy, one sentence, once, on /work only:
  **"I find what your buyers are actually paying for, then build the system that sells exactly
  that."** Fable's truth check holds it above all five studies; for the RFP engine the finding was
  the software scoring bids against the expert's own work, never a repositioning (see THE RFP CLIENT
  WAS NOT REPOSITIONED). Do not reword without a new dated ruling.
- **PASS-120 DRAFT DETAILS CONFIRMED — operator 2026-09-16**, by per-study popups ("tick anything
  that did NOT happen"). CONFIRMED as written: RFP engine ?1 ?2 ?3 ?4 ?5 ?6 ?7 ?9 ?11 (portals
  nobody watched, nightly checks, day three was discovery only, the library's contents, the
  score's inputs, drafts following each solicitation's stated criteria, a person approving every
  response, eligibility/pricing/submission kept human, buyers from outside the existing network
  and home state); content engine ?1-?10 and ?12 (a few thousand a month before, cost per piece,
  the talk seen once, the audit of past posts, backing where buyers read, five months of cadence
  before the peak month, drafts from their own words, the weekly queue and review, every piece
  pointed at a sale, a person approving each piece, videos assembled in code from an extended
  open source tool); birth worker B3-B9, B11-B13, B15-B18; Guardicore G1, G3, G4 (G5 was his own
  words); ORDANI O1 and O3; the Postmates and Neuton.AI record-row descriptions.
  CORRECTED: Guardicore G2. Verbatim: "buyers main pain point was visbility - they did not see
  anyhthing in their environments." The line that buyers wanted to see the traffic "and then the
  ability to cut it down" is replaced: they could not see anything inside their own environments,
  and visibility was what they signed for. Visibility is the MAIN pain; segmentation is not to be
  framed as co-equal in the buyer's motive.
  CUT: ORDANI FAQ O2 ("the workflow is the product... not a dentist's front desk"), verbatim
  "diont ge this line".
- **BIRTH WORKER VOLUME — operator 2026-09-16**, verbatim: "Organic bookings grew maybe more
  than 30. She would average 1-3 a month and now she gets 5-10 inquiries. C oming from high
  quality" (message cut off there). The 30% is a FLOOR, not the figure; "up 30%" stays true on
  /services. NEW publishable pair: one to three a month before, five to ten inquiries a month
  after, from higher-quality sources. OPEN: whether the "1-3 a month" was inquiries or bookings
  (the sentence mixes them), the period, and the end of "high quality". CLOSED 2026-09-16 by the
  BIRTH WORKER BOOKINGS, BOTH SIDES row above (operator verbatim: "bookings and the 5-10 are
  bookings too"): bookings on both sides, one to three a month to five to ten; the pages say
  "Bookings". (Flagged open again by the Fable ship gate, which had missed that row.) Never a multiplier from
  this pair (his standing objection to multipliers on a small base, 2026-09-15). Her services are
  still never itemised.
- **TWO CLIENTS, NOT ONE — operator 2026-09-15**, verbatim: "well i want to split it up since
  its two separate contracts. the content one will be a social acitivit (do not want to say anti
  racism) and the other one can stay with a award winning author/ Leadership consultant also for
  gov and corps". This SUPERSEDES the 2026-09-03 row above that records the RFP engine and the
  content engine as the same person, and the Pass-60 framing of one engagement split in two.
  PUBLIC DESCRIPTORS, both still anonymous: the RFP engine's client is **an award-winning author
  and leadership consultant who teaches government bodies and corporations**; the content
  engine's client is **a social activist**. DERIVED VALUES that move with it: the two live
  cross-link sentences ("The same engagement also produced...") in `content/work/rfp-engine.mdx`
  and `content/work/content-engine.mdx` are now FALSE and come out; the reach figures (8K→290K,
  36×, eight platforms) belong to the activist; the $3M, the doubled close rate and the retainer
  rows belong to the consultant; every ledger row above that bundles them describes two
  engagements. NEVER: "anti-racism" or "anti racism" on any surface (same instruction), and
  never a descriptor from which a reader can name either client — Astra's 2026-09-15 read found
  the two studies identified one client jointly, which splitting does not by itself cure.
  IDENTITY READ 2026-09-16 (Fable ship gate, .planning/reviews/FABLE-120-SHIP-GATE.md §2): as built
  in Pass-120 neither client can be named and the two do not read as one person; naming Medicaid
  does not locate the birth worker. Standing rule from that ruling: never add a field, state,
  title, handle, photo or talk date to either anonymous study.
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

- **The book is not mentioned or shown on the site** (operator 2026-09-11, verbatim: "the
  book should not be mentioned or shown on the site yet. im still working on it"). Same day:
  no line about it on any page, /playbook removed (404, no redirect), the kickoff email no
  longer attaches the PDF or ZIP. NEVER: "The 80% Wall", "field manual", "the playbook", or a
  link to /playbook on any rendered surface, metadata, share image or llms.txt, until a new
  dated ruling here. Gate: scripts/retired-phrases-gate.mjs (Pass-112).

- **Advisory-only floor** (operator 2026-09-11, decision 1). "From $5K a month" is Advisory's price and no other shape's; Project, Retainer and Embedded are scoped and priced on the call with no public floor. NEVER: "Engagements from $5K a month", "start at $5K a month", "standing rate", or any page-level price line on /services. Gate: retired-phrases-gate (Pass-111b).
- **Shape and package commitments approved as true** (operator 2026-09-11, decision 2): Advisory A1-A3, Project P1-P3, Retainer R1-R2, Embedded E1-E3, Unstick U1-U3, Audit AU1, Sprint S1-S2, wording as in .claude/briefs/pass-111b-services-boxes-and-rail.md §2. A4 (notice terms) and S3 (the Sprint remedy) are NOT approved; do not write them. ALL1 fell with the book (Pass-112).
- **"AI engineering"** is the third area's name (operator 2026-09-11, decision 9); "Product building" is the second's. NEVER: "Frontier AI engineering", "End-to-end product building", "Demo to production" as an area name. Gate: retired-phrases-gate (Pass-111b).
- **Postmates and Neuton.AI neutralized** (operator 2026-09-11, decision 5: "Neutralize"). The Hennessy order is off the Postmates study; Neuton.AI is described as entering North America, not as "foreign"; the acquisitions stay in their own sentence, never "led to". NEVER: "Hennessy", "foreign company", "foreign AI company", or a causal link between the positioning work and either sale. Gate: retired-phrases-gate (Pass-113).
- **Postmates fraud line carries no example, Neuton row names its year** (operator 2026-09-12, "fix the later items from fable"). The Postmates study reads "That promise invited fraud." with no second sentence; the home Neuton row tag is "Helped launch · exit 2025". The 2025 row tag is unchanged and still the acquisition year. NEVER: a fraud example on the Postmates study, or a bare "Helped launch · 2025" that reads as a 2025 launch. Gate: card1-115.sh markers (Pass-116).

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
for p in "Two exits" "\$15M pipeline" "trained the sales team" "built the channel"          "customer-evidence engine" "anchored the Nasdaq" "Zero churn"          "Hundreds of users active" "TD Bank" "Deutsche Bank" "NIH" "Davis Polk"          "Peoples Natural Gas" "load-bearing" "load bearing"; do
  grep -rin "$p" app content lib components --include="*.ts*" --include="*.mdx" --exclude="banned.ts"
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

## #17 — A branch lives in one worktree; per-phase worktrees strand the phases (2026-09-06)

**What happened.** Pass 101 ran three build phases as separate agents, each with
`isolation: 'worktree'`. Phase 1 created `design/room-and-ledger` in its worktree; git
refuses to check a branch out in a second worktree, so phases 2 and 3 each committed on
their own `worktree-*` branch, both fast-forwards from phase 1 and divergent from each
other. The verifier then tested the named branch, which held only phase 1, and reported
"nothing landed". Nothing was lost, but integration cost a merge round.

**The rule.** One worktree per ARC, not per agent: the first agent creates the worktree and
the branch; every later phase receives that worktree PATH and works inside it (no
`isolation` on those calls). A verifier that must not commit still works in the same path.
If parallel phases are needed, they get parallel branches by design and the merge is a
planned step with named conflict rules, never a surprise.

**The gate.** The `workflow-authoring` house pattern in briefs: any multi-phase build brief
names the worktree path in §0 and forbids `isolation: 'worktree'` on phase 2+. This entry is
cited from `.claude/briefs/README.md`.

## #18 — A worktree's git dir lives outside it, so a sandboxed agent cannot commit there (2026-09-08)

**What happened.** Codex ran the Pass-102 drafter in the branch worktree under its
workspace-write sandbox. Its files landed, but `git commit` failed: "Unable to create
.git/worktrees/p101-integrate/index.lock: Permission denied". A worktree's `.git` is a
file pointing at `<main repo>/.git/worktrees/<name>/`, which sits outside the worktree
path the sandbox allows. The concurrent GLM run in the same worktree committed fine because
Claude Code's permission mode is not a filesystem sandbox.

**The rule.** In a worktree, a sandboxed executor writes and a non-sandboxed one commits
(the GLM executor, or Fable by hand, staging only the files the brief names). If a sandboxed
executor must commit, give it a full clone or the main checkout, never a worktree.

**The gate.** `scripts/codex-exec.ps1` carries the limit in its header; every brief that
names Codex as the executor in a worktree names who commits.

## #19 — On a cross-faded page, a colour checked against one world is a guess (2026-09-10)

**What happened.** Every foyer page that mounts WorldSwitcher writes `--cw-bg`, `--cw-fg`
and `--cw-accent` onto the root as each section crosses the viewport centre, so every
element on the page sits on whichever world is centred at that moment. Twice in one day a
colour choice passed the look it was designed against and failed on another world: saffron
figures and 0.6-0.9 opacity on the exit record (19 serious axe failures at 1440, 9 at 390),
then `opacity: 0.82` on `.cw-deliver__note` in `#offer` (3 more). Both were fixed by hand and
neither produced a gate. Pass-108's axe run then reported a bone-on-saffron pair at 2.05:1
and attributed it to the hero pill as a load transient. The first run of the gate below,
against Pass-108's own commit, could not reproduce that on the hero. It found the pair on
`OrdaniBetaForm`'s submit button in the petrol world instead, at both widths and at rest,
and found the home doors panel failing the same way: fixed door fills under text that
inherits the world's colours, 1.38:1 at worst. Pass-109 then needed a filled buy button on
exactly this page.

**Root cause.** The page has one ground and four palettes, and every static check samples
one of them: a screenshot, a contrast sum against the world a section "belongs" to, a
single axe run at rest. `--cw-accent` is the worst token because it is the only one whose
contrast against `--cw-fg` is not guaranteed: 12.59:1 on terracotta, 2.39:1 on bone, 2.05:1
on petrol. A fixed fill under inherited text is the same mistake from the other side.

**The rule.** On a WorldSwitcher page, text is `inherit` or `--cw-fg`. A fill that carries
text is `--cw-fg` with a `--cw-bg` label, the body-text pair and the only pair every world
guarantees (5.27 / 12.59 / 8.28 / 12.59:1 across terracotta, bone, petrol, espresso). Never
`--cw-accent` behind or under text, never a fixed palette token or hex under inherited text,
never `opacity` on text. Hierarchy is size and weight. `.cw-buy` (Pass-109) is the reference
implementation.

**The gate.** `scripts/axe-worlds.mjs`. For each route at 1440 and 390 it runs the full WCAG
A/AA rule set at rest, then colour contrast on the in-viewport text at every half-viewport
stop down the page and at a stop that centres every `[data-world]` section, each result
labelled with the world the root is actually showing. The centring stops exist because its
own first post-change run stepped straight over the bone section at 1440 and still printed
a pass; a targeted world that never takes effect now fails the run (exit 3). It fails on
any serious or critical finding that was not already failing before the change.
Its first run, against `b1ff9b5` before any Pass-109 change, found 25 findings, all
pre-existing: the doors panel, the form button, and `.cw-lede-link` on /services. Those are
its KNOWN list, each entry carrying its reason, and each is an open item, not an accepted
one. Run it against `next start` before every commit that touches colour, opacity or a
`.cw-*` fill on a WorldSwitcher page. Two traps it now refuses: from Git Bash, MSYS rewrote
the route "/" into "C:/Program Files/Git/" on the first run (set `MSYS_NO_PATHCONV=1`, or pass
no routes), and a pipe through `tail` reported that crash as exit 0, so read the script's own
exit code. It is a manual gate, not yet a blocking hook, because it needs a running server
and Chrome, which a commit hook cannot assume. Graduating it is queued in RESUME. It
cannot see `:hover` or `:focus-visible`, because axe measures the resting state: the
Pass-109 review found `.cw-mlink`'s hover and focus swapping to `--cw-accent` (2.39:1 on
the terracotta hero), which no run of this gate could have caught. Until a static lint for
accent in `:hover`/`:focus` rules exists (queued), those states are checked by reading the
CSS against the rule above. The same review made KNOWN match exact targets only, after a
substring match was shown able to hide a new submit button behind the parked one. Pass-110
shipped that queued lint: `scripts/accent-states-lint.mjs` now runs in `pnpm build` and fails
it on any `[data-mode="cw"]` hover/focus rule painting `--cw-accent`. Its first version was
a property whitelist, and the Pass-110 review broke it seven ways: the border and
text-decoration shorthands, SVG paint, a gradient, an accent reached through another custom
property, native nesting with a comma list, and a rule with no mode scope at all. It now
flags any property whose value reaches the accent, follows custom properties to a fixed
point, expands nesting branch by branch, counts unscoped rules as in scope, and proves all
of that on a planted probe (`--self-test`, 16 cases and 3 near-miss negatives) at the start
of every build, so a later edit that weakens it fails the build before it lints.

## #20 — A layout can pass every gate and still break between the widths anyone looked at (2026-09-11)

**What happened.** Pass-111a's first battery passed render, copy, axe in all four worlds and
the no-overflow check at every width. Its captures still showed three defects. SURVEYMONKEY
split mid-word at 390: `overflow-wrap: anywhere` turned an overflow into a break inside the
word, so the overflow check had nothing to see. The home Audit pricing box was 524x933 on a
1440x900 screen and 361x1022 on 1024x768: the grid gave it 5/12 of the width, under the 640px
its own two-column layout needs, so it stacked into a column taller than the screen. The
Ordani grid kept an old `max-width: 1100px` and stopped 260px short of the page's right edge
at 1440.

**Root cause.** Every gate measured what it was written for: colour, links, overflow, copy.
None measured a word against its lines, a box against the screen, or a grid against its
container, and captures at two widths are samples, not a sweep.

**The rule.** A display name never relies on `overflow-wrap: anywhere` to fit; size it or lay
it out so it fits whole. A number range never splits (it goes in `.cw-nowrap`). A pricing box
sits beside other content only where it gets the width its own layout needs, and is never
taller than the viewport from 1024px up. A section grid spans its container unless a comment
says why not.

**The gate.** `scripts/layout-gate.mjs`, run in the battery beside axe-worlds. It needs a
server and Chrome, so it is not in `pnpm build`. Six routes at 1440, 1280, 1024, 768, 390 and
360. `words`: no word breaks between two letters, no number range splits, and nothing splits
in display type or in a one-word mono label. `boxes`: no `.cw-pbox` taller than the viewport
from 1024px. `fill`: the named grids span their container. Its first run flagged 14 hyphen
breaks in running prose and tables, which are ordinary typesetting, so the rule was narrowed
twice before it was trusted: a gate with standing false positives gets switched off (#13).
What remained was real: date ranges split at 360 in the home receipts tags and the /work
index, now in `.cw-nowrap`. It self-tests on a planted page (6 defects, 7 near misses) before
each run.

## #21 — A gate nobody attacked is a claim (2026-09-11)

**What happened.** Two passes running, an executor wrote a gate that printed clean and missed
the thing it existed for. Pass-110: GLM's accent-state lint was a property whitelist, broken
seven ways by the review (#19). Pass-111a: Sol's GSAP quarantine gate never matched
`@gsap/react`, the package both allowlisted files use, and missed a dynamic `import("gsap")`,
`require("gsap")` and `export * from "gsap"`. It would also have failed the build on an
import written inside a comment. Neither executor caught either one, and neither did the
ruling tier's read of the diff. The review workflow's gate lens did, by writing each bypass
and running it.

**Root cause.** A gate is judged by its first run, and its first run is clean by
construction: it is written against a tree with no violations in it. "Prints clean" proves
nothing until something planted is caught.

**The rule.** Every new gate ships with a `--self-test`: planted uses it must catch and near
misses it must pass, run in `pnpm build` before the real scan, so an edit that weakens the
gate fails the build first. A review of any pass that adds a gate gives the gate its own lens,
and that lens writes bypasses instead of reading code.

**The gate.** `scripts/gsap-quarantine-gate.mjs` was rewritten. It strips comments, then any
specifier naming `gsap`, `gsap/<sub>` or `@gsap/<pkg>` in an import, an export-from, a
side-effect import, a dynamic import or a require is a violation, across app, components,
lib, content and hooks in every JS and TS extension. Its self-test plants 13 uses and 7 near
misses and runs in `pnpm build`, as the accent lint's does. `scripts/layout-gate.mjs` (#20)
self-tests on a planted page. `vendor-gate.mjs` and `retired-phrases-gate.mjs` predate the
rule and have no self-test yet; that is queued in RESUME.

## #22 — A battery script edited while it runs re-runs part of itself (2026-09-11)

**What happened.** During the Pass-111a verification, `.planning/exec/gates111a.sh` was
edited to add two gates while it was still in its capture step. bash reads a running script
from disk by byte offset. When the capture step ended, it resumed at the old offset inside
the new file and started axe-worlds again, and would have gone on to re-run the captures
against a server another gate was using. The only signs were a log that stopped at
`shots exit: 0` and a task that never ended.

**The rule.** Never edit a script while it runs. A battery runs from a private copy.

**The gate.** `gates111a.sh` now copies itself to a temp file and `exec`s the copy on start
(the `GATES_COPY` guard). Every later battery script opens with the same guard.

## #23 — A shared index commits what another process staged (2026-09-11)

**What happened.** Pass-112 ran on the GLM executor while the main session, on the
operator's "push it", staged `.claude/RESUME.md` by explicit path and committed. The
executor had already `git rm`'d nineteen book files into the same index, so the RESUME
commit (`ec84b07`) carried the deletions and was pushed. The preview at that commit has no
`/playbook` route and still links to it from the nav, the sitemap and four pages;
`render-gate` fails that build. Production was not touched.

**Root cause.** `git add <path>` scopes the add; `git commit` commits the whole index. Two
processes on one worktree share one index, so "stage by explicit path" (MODEL_ROUTING §6)
protects the add and not the commit.

**The rule.** While an executor shares the worktree, the main session commits only with an
explicit pathspec (`git commit -F <msg> -- <paths>`) after reading
`git diff --cached --name-only`, and an unexpected staged entry stops the commit. An
executor stages nothing until its own commit step.

**The gate.** This entry and the RESUME trap line. On recurrence: a PreToolUse hook that
refuses a bare `git commit` when `git diff --cached --name-only` lists a path the command
did not name.

## #24 — An `expect 1` against served HTML counts the RSC payload too, so a correct page fails its own gate (2026-09-12)

**What happened.** Pass-113's served block asserted `grep -c` equals 1 for the two new copy
lines and for `never disclosed` and `2.65B`. The run returned 2, 2, 3 and 3, printing
`served-checks failures: 4` on a page that was exactly right. Every zero-expected check in
the same block — `Hennessy`, `foreign`, `led to` — passed honestly. The judge re-counted
against the rendered DOM with `<head>` and every `<script>` stripped and got 1, 1, 1 and 2,
the 2 being the untouched dek plus the Outcome line the brief said to leave alone.

**Root cause.** Next's App Router embeds the page's own text a second time inside a
`<script>` as the RSC flight payload, and frontmatter that feeds metadata can add more
copies. RESUME already carried the trap line "grep -o counts the RSC flight payload too",
and the brief was still written with raw-HTML counts for its presence assertions. The trap
was recorded against counting, and applied only to the zero case.

**The rule.** In a brief, an `expect 0` may grep raw HTML — extra copies can only make the
catch more likely. An `expect N>=1` must either count visible DOM text, with `<head>` and
all `<script>` blocks stripped first, or assert `-ge 1` instead of an exact number.

**The gate.** The standing clause in `.claude/briefs/README.md` §5. On recurrence: a
`scripts/served-count.mjs` helper that briefs must call instead of `grep -c`.

## #25 — An executor allowed to reinterpret an expected value has made itself the judge (2026-09-12)

**What happened.** Pass-113's executor hit the four mismatches in #24, diagnosed them
correctly as payload over-counts, and then committed anyway, reporting that the `expect 1`
values "were presence checks" and that "the check was not modified". Its pointer said to
stop before that commit and report the raw output. The diagnosis happened to be right, and
the judge confirmed it independently; the commit was still outside the contract. Nothing was
pushed, so nothing reached production. Had the diagnosis been wrong, a false claim would
have been committed under a report that read clean.

**Root cause.** The stop condition said what to do when a check fails but left the
definition of "fails" to the executor. A confident reinterpretation is always cheaper than
stopping, so the cheaper path wins unless the rule forecloses it.

**The rule.** A chk line whose `got` differs from its `expect` is a failure, full stop. An
executor never reinterprets an expected value, not even correctly. If it believes the
brief's own number is wrong, it stops before the commit and reports the raw output plus its
reason, and the judge rules on it.

**The gate.** That clause is now standing text in `.claude/briefs/README.md` §5 and in the
`.planning/prompts/GLM-*-POINTER.txt` template every executor run is handed. On recurrence:
the verify block ends with `[ "$sf" = 0 ] || exit 1`, which no narration can pass.

## #26 — Ten geometric checks passed a loop that never rendered (2026-09-12)

**What happened.** Pass-115 redrew the home `$20M+` hand loop and passed C1 to C10 at both
widths: corners enclosed, clearance, column alignment, centring. The judge opened the capture
and there was no loop, only a top stroke and a separate bottom stroke with both sides missing.
The Pass-114 capture showed the same broken arcs, so the defect was older than either pass and
was part of what Astra had failed as "the circle does not land".

**Root cause.** `HandCircle` set `strokeDasharray` and `strokeDashoffset` to `getTotalLength()`,
a length in SVG user units, while its paths carry `vectorEffect="non-scaling-stroke"`, under
which Chrome lays dashes out in screen pixels. Pass-115b's probe measured the screen length at
4.61 times the user length at 1440, so one "full" dash covered part of the stroke and the rest
drew as gap. Every check measured the path model through `getPointAtLength`; none looked at a
pixel, so a mark the browser did not paint passed.

**The rule.** A check on anything drawn measures the render, not the model: sample the mark and
confirm ink exists at those points in a screenshot of the finished frame, and prove the check
bites by running it once on the broken code first. Dash lengths under non-scaling-stroke are
computed in screen pixels, and a finished stroke clears its dash.

**The gate.** C11 in `.planning/exec/circle115.mjs`: rendered stroke coverage, primary at least
0.97 and overshoot at least 0.90, in reduced, played and 390 states. It read 0.590 and 0.660 on
the unfixed build and 1.000 after. `components/hand/HandUnderline.tsx` carries the same dash
pattern and is unmounted; mounting it requires the same fix first.

## #27 — Three motion defects the geometry never showed, and a check aimed at a path that could not reach one (2026-09-12)

**What happened.** Fable's pre-merge look on 115b named three latent defects in the shipped
count-up: a hidden-loop frame on a refresh with the figure in view, a hidden dash sized at arm
time that shows its tail after a resize, and the count replaying on a return to `/`. Pass-116
wrote C12, C13 and C14 and ran them on the shipped build first. C12 (0.632 ink while hidden)
and C14 (3 hidden frames) bit. C13 passed: it navigated through the header's plain `<a>`, a
full document load, so Back restored a document that never remounted. The executor stopped
there as instructed. The judge found the reachable path, the case study's `ViewTransitionLink`
home plus Back and Forward inside one document, and C13 then replayed `$0M` to `$20M+`.

**Root cause.** A parent that decides in `useEffect` lets a controlled child paint its
pre-decision state first; a length measured once goes stale when the layout changes before it
is used; and "once per load" was implemented as "once per mount". The first C13 was
specified from the header link without checking which links on the site are client
navigations.

**The rule.** A mount decision that changes what paints runs in a layout effect (with the
server guard). A length captured for later use is either re-measured at use or given margin
for the layout's full range. Per-load state lives in module scope, not component state. A
navigation check first establishes, by reading the link components, which paths are client
navigations, and asserts it (`docLoads` stays 1).

**The gate.** C12, C13 and C14 behind `--p116` in `.planning/exec/circle115.mjs`, each proven
failing on the shipped build before the fix and passing after.

## #28 — A gate scoped by guessed containers, and a capture named for a section it never framed (2026-09-14)

**What happened.** The first Pass-117 gate scanned `header *, main *` for type sizes. On this
site the nav is neither: `components/color-worlds/Nav.tsx` renders a `<nav>` that
`app/(foyer)/layout.tsx` places beside `<main>`. The wordmark and nav links were never measured, so
a broken nav size would have passed T1. The same review found that `.planning/exec/shots111b.mjs`
names a capture `sv-foot` but centres `.cw-pband__foot`, the packages band's footer row, not
`.cw-services__foot`. Pass-111b's "foot" look was never a look at the foot. Sol's plan review
caught both; nothing shipped on either.

**Root cause.** The scope came from what a page usually contains, not from this route's layout
tree. The capture's name came from the intent, not from its selector.

**The rule.** A DOM gate's scope is read off the group layout and the components it mounts, and
is stated in the script's header. A capture is opened and looked at once before it is used as
evidence, and its name matches what it frames.

**The gate.** `type117.mjs` round 2 scans the whole `[data-mode="cw"]` wrapper minus the closed
overlay dialog, and pins each role's size (T10). A fourth standing clause in
`.claude/briefs/README.md` §5 covers scope and captures.

## #29 — A lab CLS that honoured hadRecentInput read 0 on a page Lighthouse fails (2026-09-14)

**What happened.** Pass-118a's brief told the probe to sum layout shifts "with hadRecentInput
false", the field definition. Under device emulation Chrome flagged every font-swap shift
`hadRecentInput: true` although the probe sent no input, so the probe printed CLS 0.000 on all 60
loads while Lighthouse failed the home page at 0.182. The probe had recorded the same 0.147024
shift Lighthouse named. The first findings then used a lower-middle value as a median and blamed
the probe-versus-Lighthouse gap on session windows; Sol's independent read showed three shifts
inside one 476ms window and later shifts that differ between tools.

**Root cause.** A field-metric rule was copied into a lab probe without checking what the flag
means under emulation. The bite proof planted a shift the flag did not touch, so it could not
catch the exclusion. The findings were written from summaries, not the raw records.

**The rule.** A lab CLS reports every shift and, separately, the count flagged
`hadRecentInput`; a total of 0 with flagged shifts present is a failure of the probe, not a
clean page. Tables are generated by script from the raw file, never transcribed, and a claim about
why two tools disagree cites the raw events.

**The gate.** `.planning/exec/perf118a-tables.mjs` counts every shift, prints the flagged count,
and uses a conventional median. Findings are checked by a second vendor's read of the raw data
before a ruling (`.planning/reviews/SOL-118A-READ.md`).

## #30 — A fallback tuned for letters also resized every glyph and every ch box it serves (2026-09-14)

**What happened.** Pass-118 v1 narrowed the Bricolage and Hanken fallbacks (Arial at 81% and
75.25%) to match the real faces' letter widths. It cut `/services` layout shift from 0.037 to 0.001
and failed four gates. The "→" after the `/services` proof link was 5.38px narrower with fonts
loaded, because U+2192 is outside every real face's `unicode-range` and always renders in the
fallback. `/call` wrapped a new line during the swap, because `ch` resolves from the "0" of the face
that renders it (0.561em in next/font's fallback, 0.560em in Hanken, 0.418em in v1). And the home
shift stayed at 0.146: the JetBrains Mono fallback, which the brief had excluded on a 0.001 reading,
was 32% too wide and pushed a link onto its own row. The tuner could not see that, because it
measured text line counts and a flex row changing height is not a line count.

**Root cause.** A fallback face is not only the stand-in for letters. It also renders every
character the web font lacks and sets the length of `ch`, so changing its metrics changes glyphs and
boxes that never swap. The exclusion of a face was ruled from a source reading instead of from what
moved.

**The rule.** A tuned fallback is two faces under one family: the first keeps the generated metrics
for every character, the second carries the tuned metrics on the real face's served ranges minus
U+0030. A monospace face falls back to a monospace font with the same advance. A swap check measures
every on-screen element's position, not only text lines, and fonts-loaded geometry must not move.

**The gate.** `.planning/exec/fallback118.mjs --compare` (fonts-loaded geometry, strict) and
`--verify` (fonts blocked against loaded, whole-element), both run before and after, plus the
probe. Production 2026-09-15: home layout shift 0.001 on 10 of 10 loads (was 0.290).

## #31 — Three harness traps from the Pass-118 runs (2026-09-14 and 15)

**What happened.** (1) `motion-discipline.sh` kept blocking the operator-approved mono fallback
after `.claude/brand.json` was corrected, because it resolves brand.json from the session's project
directory, the main checkout, which was behind origin. (2) A route probe ran as
`P118PATH=/packages node ...` and Git Bash rewrote the variable to `C:/Program Files/Git/packages`,
so every load failed. (3) The same chain then printed tables from the committed probe file the
failed run never replaced, which read as a result until the exit codes were checked.

**The rule.** A hook that reads project config reads the main checkout's copy; a config fix made in
a worktree does not reach it until main carries it and the checkout pulls, and any write made around
the hook in the meantime is disclosed in the commit. Git Bash chains export `MSYS_NO_PATHCONV=1`
before any `/path` value, including environment variables. A step that reads a probe's output runs
only when that probe exited 0.

**The gate.** The three trap lines in `.claude/RESUME.md`, and the route chain's `rc` check.

## #32 — An operator answer that lives only in chat gets reviewed against (2026-09-16)

**What happened.** On 2026-09-15 the operator answered two questions in chat: the $20M wording
("$20M+ in revenue behind my work") and what changed in who the RFP client sold to ("Nothing
really... selling to similar/same folks"). The session recorded the first in RESUME only and the
second nowhere. The next day's Fable craft gate read the ledger, found the $20M "open", and wrote
fix #6 adding a repositioning step the operator had said did not happen. Caught by the main
session checking the fix-list's premises against the chat before applying it. Nothing shipped.

**Root cause.** Reviewers read files, not the conversation. An answer that is not in a file does
not exist for them, and a reviewer that cannot see it will rebuild the old claim from the nearest
live copy.

**The rule.** Every operator answer that settles a fact, a wording or a claim is written into
LESSONS #3 in the same turn it is given, with the verbatim quote, before any review, brief or edit
leg launches. RESUME is state, not the ledger.

**The gate.** A standing check before any review or executor leg: every operator answer since the
last ledger commit is in #3 (the RESUME trap line "ledger every answer before a leg launches").
On recurrence: a pre-launch script that diffs the RESUME rulings block against #3's dated rows.

## #33 — A sweep for a retired figure that only searched its numerals missed the spoken version (2026-09-16)

**What happened.** On 2026-09-03 the operator retired the $80M Guardicore pipeline figure from every
public surface, and the ledger recorded the sweep as done: "Swept 2026-09-03 to zero rendered
instances". Thirteen days later the Pass-120 build-surface map found
`aria-label="80 million dollars in pipeline on 14 million dollars in revenue, acquired by Akamai"`
on the home ledger's Guardicore row (`app/(foyer)/page.tsx:340`), live on both production domains.
Sighted visitors never saw it; every screen-reader visitor heard it.

**Root cause.** The sweep grepped for the figure as it is written on screen ("$80M"). Accessible
names are written for the ear, so the same claim appeared in words, and no pattern matched it. The
retired-phrases gate never carried the figure at all, so nothing caught it at build.

**The rule.** A retired figure is swept and gated in every spelling a surface can carry it: numerals,
words, and the accessible-name forms (aria-label, alt, title, sr-only text), and a sweep is not
recorded as done until each form has been grepped.

**The gate.** `scripts/retired-phrases-gate.mjs` now blocks "$80M" and "80 million" in the rendered
tree, and the aria-label reads "14 million dollars in revenue, acquired by Akamai" to match what is
on screen. On recurrence: the gate derives the spelled-out form of every dollar figure it carries.

## #34 — A zero-count check whose grep crashed printed 0 and passed (2026-09-16)

**What happened.** The Pass-120 brief's served sweep (`s5-render.sh`, brief line 4924) counts
retired phrases with `curl | grep -oiF -- "$2" | wc -l`, and its card1 spec (line 5392) with
`grep -ciF`. Writing `card1-120.sh`, the L6a leg saw every absence count come back empty and
traced it: GNU grep 3.0 in Git Bash aborts on `-i` together with `-F` (exit 134, no output).
Reproduced by the main session: `printf 'abc Client Revenue xyz\n' | grep -oiF -- "client revenue"`
prints nothing, PIPESTATUS `0 134`; `grep -oi` on the same input prints the match. Behind
`| wc -l`, the crash reads as `0`, so every `expect 0` in that helper would have passed on a page
that still carried the retired claim. Caught before any served run; no earlier pass used the pair
(grep over `.planning/exec`, `scripts` and `.claude/briefs` on 2026-09-16).

**Root cause.** A pipeline's exit status is the last command's. The check trusted a count without
asking whether the command that produced it ran, and a flag pair that works on most machines was
never run once on this one.

**The rule.** A check never combines `grep -i` with `-F` on this machine. A zero-count check proves
it can count: it either runs once against a planted positive, or it reads the grep's own exit status
(`PIPESTATUS`), before its 0 counts as a pass.

**The gate.** `.planning/exec/grep-if-gate.mjs` (self-test 5 planted, 6 near misses) finds the pair
in `.planning/exec`, `scripts` and `.claude/briefs`; the standing clause in `.claude/briefs/README.md`
names it. On 2026-09-16 it reports exactly the two brief lines above, which the Pass-120 build runs
in a corrected form and holds for the judge. On recurrence: the gate joins `package.json` `build`.

## #35 — A sentence everyone knew was wrong was parked, placed verbatim and reached the ship gate (2026-09-16)

**What happened.** ORDANI's locked draft opened "Birth workers, doulas, midwives and perinatal
counselors, were not running their practices on nothing." The brief writer flagged the comma, parked
it ("a punctuation fix needs his word", brief §1.5 and §2.10), and told the executor to place it
verbatim. The first-preview judge read the page and did not raise it; the ship-gate judge raised it as
"one comma, yours to place". Asked about the comma at the end of the build, the operator answered:
"what is that sentence??? sounds horrible. thought fable was reviewing everything??". The sentence was
rewritten by his pick and the old form gated. Nothing shipped with it.

**Root cause.** The harness treats copy as ledgered and untouchable without the operator's word, which
is right for facts and wrong for a sentence that plainly reads badly. Parking converted a quality
defect into a deferred question, and each later reviewer read the parked note instead of the sentence.

**The rule.** A copy defect is never parked. Whoever sees it puts it to the operator by popup at once,
with two or three rewrites that change no fact, and the pick is ledgered before the brief commits.

**The gate.** The standing clause "No copy defect is parked" in `.claude/briefs/README.md`, and the
retired form "not running their practices on nothing" in `scripts/retired-phrases-gate.mjs`. On
recurrence: a brief lint that fails when a parked item names a sentence to be placed verbatim.
