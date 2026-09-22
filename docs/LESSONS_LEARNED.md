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
- **ORDANI LEAD STORY, OPEN — operator 2026-09-16 (after the Pass-120 release)**, verbatim: "the
  main line for Ordani the intake completion is weak. I want to lead with the claims processing
  saving users hundreds of dollar per claim. The intake completion thing is a very weak story that
  dors not need to be included. If it neecds to be changed out with another story instead of just
  removed let me know." NOT YET PUBLISHABLE: Pass-82 (operator 2026-09-02, "soften it to what's
  defensible") cut "processing Medicaid claims fee-free" and "keeping hundreds of dollars in birth
  workers' pockets" because no ledger sentence said what Ordani does to a claim and "hundreds of"
  matched the retired user-count shape (`app/(foyer)/page.tsx` comment at the ORDANI copy block).
  Before it ships: one sentence on the real mechanism and a named per-claim figure, confirmed by
  him and dated here; whether it is Medicaid only; and whether the intake story (40% to 91%) is
  removed everywhere it renders or replaced by another story he names.
- **ORDANI CLAIMS FACTS, PART 1 — operator 2026-09-16 (Pass-121 DIRECT, popup)**. Asked with the
  evidence stated: Ordani's own `docs/ORDANI_PRODUCT_GUIDE.md` (2026-08-10) says claim submissions
  go out as test transactions and none has been paid, and the submit route files real claims only
  behind a live switch. LIVE: "Yes, real claims are paid" (Ordani files real claims for paying
  practitioners today; SUPERSEDES the product guide's test-only line for site copy). SOURCE OF THE
  SAVINGS, verbatim (typed in Other): "compared to typical processing sites like Luna, and others.
  Fewer rejected claims and look at stedi for other benefits". So the saving is measured against
  typical claims-processing services, plus fewer rejected claims; the clearinghouse's features are
  to be researched for further true benefits. FIGURE: picked "'Hundreds of dollars per claim'",
  whose description read "Your words become the figure. A 2026-09-02 ruling cut this phrase as too
  vague; this answer brings it back, dated today." This RESTORES "hundreds of dollars per claim"
  over the Pass-82 cut, as a per-claim money figure (never a user count). PAYERS: picked "Medicaid
  and private insurance". STILL OPEN: the one mechanism sentence (drafted from these answers, then
  confirmed by him); whether the typical-service comparison survives a check of what those services
  charge; naming. NEVER, pending his word: the name of any processing service or the clearinghouse
  on a surface (his standing "dont mention private vendors" on the birth worker row).
- **ORDANI CLAIMS FACTS, PART 2 — operator 2026-09-16 (Pass-121 DIRECT, popup)**. INTAKE STORY:
  picked "Cut it; claims takes its step (Recommended)", whose description read "The 40%→91% figure
  leaves every page: ORDANI's summary, results line, /work entry, the AI summary file and the body.
  Step 02 becomes the claims step, and 'What it became' opens on claims." NEVER after Pass-121 ships:
  "40%", "91%", "intake completion" on any ORDANI surface. NAMES, verbatim (typed in Other): "name
  competitor not stedi or product we use internally". So the COMPETITOR the saving is measured
  against may be named (Luna); the clearinghouse (Stedi) and any product Ordani uses internally are
  NEVER named. A named competitor comparison must match that competitor's published pricing, with
  the source URL and the date it was read recorded here before it ships. HOME: picked "Yes, same
  claims line (Recommended)": the home ORDANI block carries the same claims sentence as the study.
  /WORK FEATURED STUDY: picked "Let the design directions propose": each G2 direction names its
  featured study and why; he picks the study with the direction.
- **ORDANI CLAIMS FACTS, PART 3 — operator 2026-09-16 (Pass-121 DIRECT, popup, after the claims
  check `.planning/research/pass-121/claims/CLAIMS-FACTS.md`)**. COMPETITOR: two passes found no
  claims company named Luna for birth workers; asked "Did you mean Loula?" (joinloula.com), picked
  "Yes, I meant Loula". The named competitor is LOULA; NEVER "Luna". UNIT: asked with the arithmetic
  stated ("one Medi-Cal doula claim pays $162 to $796, so even a 10% fee is $16 to $80 ... a full
  Medi-Cal course pays up to $3,152.65, and Loula's page says a doula nets $2,616.70 per client after
  its fee, about $536 less"), picked "'Hundreds of dollars per client' (Recommended)", whose
  description read "True by Medi-Cal's published rates and Loula's own example. The page never
  prints Loula's fee as a number, since Loula doesn't publish one." SUPERSEDES "per claim" in PART
  1: the figure is **hundreds of dollars per client**; NEVER "per claim" for the money line, and
  NEVER a dollar or percentage figure for Loula's fee. Sources, read 2026-09-16: Loula, verbatim "Loula
  takes a fee for every visit you submit" and "you can get paid $2616.70 per client after the Loula
  fee" (https://joinloula.com/providers, no page date); Medi-Cal FFS doula rates (DHCS, via search
  2026-09-16): initial visit $197.98, prenatal or postpartum $162.11 (up to eight), vaginal delivery
  support $685.07, extended three-hour postpartum $486.36 (up to two); full standing-recommendation
  course $3,152.65. PROOF: asked whether to count real claims read-only in Ordani's database (the
  code files real claims only behind a live setting that an Aug 7 audit recorded as off), picked "My
  word is enough": his answer "Yes, real claims are paid" is the recorded source, dated 2026-09-16,
  nothing checked. PAYERS: asked because the code builds Medi-Cal claims only, verbatim (Other):
  "private works - no need to check the app. I have other apps i work ordani from". Medicaid and
  private insurance STANDS; the ORDANI repo is not the whole product. STILL OPEN: the exact claims
  sentence (candidates go to him by popup), and what Ordani itself charges for claims.
- **ORDANI CLAIMS FACTS, PART 4 — operator 2026-09-17 (Pass-121 DIRECT, popup)**. MONEY LINE: picked
  "Unnamed service (Recommended)", whose description read "\"Birth workers keep hundreds of dollars
  per client that a claims service would take.\" Loula is named once, lower in the study, where the
  comparison is explained." EXACT approved copy for the /work entry line and the study's lead result:
  **"Birth workers keep hundreds of dollars per client that a claims service would take."** Loula
  is named once, in the study body where the comparison is explained, never in the headline line.
  ORDANI'S OWN CHARGE: picked "Included in the subscription" ("No separate claims charge; filing
  comes with the plan."). The saving is stated against no separate Ordani claims fee; NEVER "free
  claims" or "no charge" (claims come with a paid plan). (The first ask of these two, 2026-09-16, was
  dismissed with two other questions; this is the re-ask.)
- **PASS-121 DIRECTION AND /WORK HEADING — operator 2026-09-17 (Pass-121 DIRECT, popup after Fable
  G2, `.planning/reviews/FABLE-121-G2.md`)**. DIRECTION, verbatim (Other): "go with recommendations -
  but ru able to produce a quality design? dont want to waste usage if you give me bullshit that we
  should have another softwaere do". Direction C "Five exhibits" (Fable's recommendation) is picked,
  CONDITIONAL on the design proving it can be made at quality before usage is spent on the full set.
  HEADING, picked "THE WORK, ON THE RECORD. (Recommended)"; EXACT approved copy (corrected by the main
  session from Fable's draft before the popup: "five engagements and the company" miscounted the
  studies, and "reached 800,000" dropped the qualifier): heading **"THE WORK, ON THE RECORD."**;
  description **"Four client engagements and the company I founded: $14M in revenue for a security
  company, $3M in contracts from an RFP engine, a content engine that peaked at 800,000 impressions in
  a month, a birth worker's practice rebuilt, and ORDANI. Each page says what I found, what I built,
  and what changed."** DRAW-IN: picked "No, still drawings first (Recommended)": the exhibits are
  static; they may fade and rise once in view (the permitted reveal); no stroke draw-in this pass.
  DESCRIPTION PUNCTUATION, operator 2026-09-17, picked "Period instead of colon (Recommended)" after the
  Fable proof look flagged the 40-word first sentence (COPY-04). The approved description is now EXACTLY:
  **"Four client engagements and the company I founded. $14M in revenue for a security company, $3M in
  contracts from an RFP engine, a content engine that peaked at 800,000 impressions in a month, a birth
  worker's practice rebuilt, and ORDANI. Each page says what I found, what I built, and what changed."**
- **ORDANI CLAIMS FACTS, PART 5 — operator 2026-09-17 (Pass-121 DIRECT, popup)**. STEP 02 DRAFT: asked
  to tick anything that did NOT happen; he ticked "All of these happened" AND typed, verbatim: "they
  usually use a service and or file them selves (which wouldn't come with a fee but takes time and
  knowledge )". So C1 (the claim is built from visits already logged in Ordani) and C2 (Ordani checks the
  claim before it goes out) are TRUE as written. C3 is CORRECTED: birth workers who take Medicaid or
  insurance either pay a service like Loula a fee on every visit OR file the claims themselves, which
  carries no fee but costs time and knowledge. NEVER say a service is the only way, or that self-filing
  costs a fee. BETA: picked "Still beta, release coming": "Active paying users in beta, none lost to a
  competitor, public release coming" stays on every ORDANI surface.
- **ORDANI DEK AND THE ANSWER-SHAPE SCOPE — operator 2026-09-17 (Pass-121 EXECUTE, popup)**.
  ORDANI DEK: the live dek carries the retired 40%/91% line and had to be rewritten with the pass.
  Picked "Swap in the money line (Recommended)". EXACT approved dek for `content/work/ordani.mdx`:
  **"A HIPAA-compliant CRM for birth workers, and a company I founded and built. Birth workers keep
  hundreds of dollars per client that a claims service would take. Active paying users in beta, none
  lost to a competitor, public release coming."** The same retirement applies to that file's
  `description`, `results.lead`, `entry.line` and `entry.did`, and to the hand-written ORDANI line in
  `app/llms.txt/route.ts` (verified 2026-09-17: that file is a literal template, so retiring the
  figure in the MDX does NOT propagate to it).
  ANSWER-SHAPE SCOPE: asked how far audit-b's proposed answer-shaped rewrites go. Picked "Openings
  only, not the headings (Recommended)". So: the three study openings that do not lead with a result
  (ORDANI, content engine, birth worker) are rewritten; EVERY h2 in all five studies STAYS AS
  WRITTEN. Audit-b's PROPOSED h2 rewrites are declined for this pass and are not re-proposed without
  a new dated ruling. Reason given and accepted: the h2s are voice, and audit-b itself states it
  cannot show the rewrites change how any assistant cites the site.

- **THE TWO REWRITTEN STUDY OPENINGS — operator 2026-09-17 (Pass-121 EXECUTE, popup)**. Following the
  "openings only" ruling above, both picked "Result first, then the before (Recommended)". EXACT
  approved deks, to be placed verbatim in the `dek` frontmatter:
  CONTENT ENGINE (`content/work/content-engine.mdx`): **"Monthly impressions went from a few thousand
  to a peak of 800,000. A social activist's message had been landing in every room and nowhere
  online. I wrote the platform strategy, then built an AI engine that turns one rough video into the
  week's work: finished videos, the blog post, and the whole marketing flow for the idea it argues.
  One income stream became four."**
  BIRTH WORKER (`content/work/birth-worker.mdx`): **"Bookings went from one to three a month to five
  to ten. She had been booked almost always for the same service, and part of every Medicaid payment
  went to processing fees. I repositioned the practice around the full arc of care, rebuilt how
  clients find and book her, and set up claims she could file directly. Thousands of dollars stopped
  going to fees."**
  GUARDICORE and RFP ENGINE deks are UNCHANGED (audit-b judged both already answer-shaped). No h2 in
  any study changes.

- **ORDANI STEP 02 AND "WHAT IT BECAME" — operator 2026-09-17 (Pass-121 EXECUTE, popup)**. Found while
  drafting the build brief: PART 5 ledgered the Step 02 FACTS but no wording was ever saved, and "What it
  became" still carried "91% of clients finish it". Both drafted only from PARTS 1 to 5.
  STEP 02, picked "\"I put claims inside the calendar\" (Recommended)". EXACT, for
  `content/work/ordani.mdx` (replaces the whole `<Step n="02" ...>` element, lead and body):
  lead **"I put claims inside the calendar they already keep."**
  body **"Birth workers who take Medicaid or private insurance either pay a service like Loula a fee on
  every visit, or file the claims themselves, which costs no fee but takes time and knowledge. Ordani
  builds the claim from the visits already on the calendar and checks it before it goes out, so fewer
  come back rejected. Filing comes with the subscription."**
  This is the ONE place Loula is named on any surface (PART 4), with no fee figure (PART 3).
  WHAT IT BECAME, picked "Real claims, no separate charge (Recommended)". EXACT: the section's first
  sentence **"One intake instead of fifteen pages, and 91% of clients finish it."** is replaced by
  **"Practitioners in the beta file real Medicaid and private-insurance claims from Ordani, with no
  separate claims charge."** The two sentences after it are unchanged. The money line is NOT repeated in
  this section (it is already in the dek and the results).

- **ORDANI DESCRIPTION AND THE HOME MONEY LINE — operator 2026-09-17 (Pass-121 EXECUTE, popup)**.
  DESCRIPTION, picked "Lead with the money line (Recommended)". EXACT `description` for
  `content/work/ordani.mdx`, which feeds the meta description, the Article JSON-LD and (by hand, since
  `app/llms.txt/route.ts` is a literal template) the llms.txt ORDANI line: **"Birth workers keep
  hundreds of dollars per client that a claims service would take. I founded and built ORDANI, the
  HIPAA-compliant CRM where they file their own claims."**
  HOME, picked "After beta, before the mission (Recommended)". This carries out PART 2's "HOME: same
  claims line". In `app/(foyer)/page.tsx`, the `cw-lede` paragraph of the ORDANI block gains ONE sentence,
  placed between "...and a public release is coming." and "The mission is bigger:". No other word in that
  paragraph changes. EXACT resulting paragraph text: **"Birth workers run their practices on group chats
  and paper intakes. HIPAA is the law. So I built Ordani. It has active paying users today, it is in beta,
  and a public release is coming. Birth workers keep hundreds of dollars per client that a claims service
  would take. The mission is bigger: lower infant mortality, by giving the people who care for mothers and
  babies better tools than paperwork."** The Pass-82 comment above that paragraph ("To put the money claim
  back: one sentence on the real mechanism and a named figure, ledgered in LESSONS #3 with a date") is
  satisfied by PARTS 3 to 5 and this row, and is updated to say so. LESSONS #6 still binds that paragraph:
  literal characters only, no HTML entities.

- **PASS-121 BUILD APPROVED AND THE DRAWING WORDS — operator 2026-09-18 (Pass-121 EXECUTE, popup after
  Fable G3, `.planning/reviews/FABLE-121-G3.md`)**, with the round-2 captures sent at 390 and 1440. BUILD:
  picked "Yes, build it with Fable's fixes (Recommended)": Direction C is built from
  `.claude/briefs/pass-121-work-and-studies.md` with G3's eleven changes, after G4; no third mock round.
  Nothing reaches production without a separate push approval. DRAWING WORDS: picked "Approve all as
  written (Recommended)". EXACT approved strings, the provenance for the exhibit facts gate:
  GUARDICORE labels **"What the pitch led with"**, **"What buyers signed for"**, **"honeypot"**,
  **"north-south, defended"**, **"workloads"**, **"east-west traffic, seen"**; its sentence **"The pitch led
  with honeypots. Buyers could not see the east-west traffic between their own workloads, and seeing inside
  the environment was what they signed for."**
  ORDANI heads **"Filing it yourself or through a service"**, **"Filing it in Ordani"**; boxes **"A service
  takes a fee on every visit."**, **"Filing it yourself costs no fee, but it costs time and knowledge."**,
  **"The claim is built from the visits already on the calendar."**, **"It is checked before it goes out,
  so fewer come back rejected."**
  BIRTH WORKER row 1 **"one to three"** to **"five to ten"**, unit **"bookings a month"**; row 2 **"the same
  service"** to **"the full arc of care"**.

- **ORDANI DID-LINE AND THE RECORD HEADING — operator 2026-09-18 (Pass-121 EXECUTE, popup)**. DID-LINE:
  picked "Say what it does (Recommended)". EXACT `entry.did` for `content/work/ordani.mdx`: **"I founded and
  built ORDANI, a HIPAA-compliant CRM where birth workers file their own Medicaid and private-insurance
  claims."** With it every ORDANI string on /work is approved, so the entry's DRAFT mark retires. RECORD
  HEADING: picked "With a period (Recommended)". EXACT `RECORD.heading` in `content/work-page.ts`: **"Also on
  the record."** (renders `ALSO ON THE RECORD.`, matching `THE WORK, ON THE RECORD.` and the home's `THE
  RECEIPTS.`).

- **ORDANI DESCRIPTION KEEPS "HIPAA-COMPLIANT" — operator 2026-09-18 (Pass-121 EXECUTE, popup)**. Asked after
  the main session found its own error: the approved description (ORDANI DESCRIPTION AND THE HOME MONEY LINE)
  was described in that popup as "About 165 characters, so it fits a search snippet"; it is 169, and
  `clampDescription` (`app/(theater)/work/[slug]/page.tsx`) trims the meta/OG/Twitter description over 155,
  serving "...I founded and built ORDANI, the HIPAA-compliant CRM where they file...". Offered dropping
  "HIPAA-compliant" (153, served whole). Answer, verbatim (Other): "this is for just the AI bots cralers?
  Because i want hipaa compliant to remain on the ordanis desc ription". Answered: the field feeds the search
  and link-preview snippet (trimmed at 155), the Article JSON-LD and llms.txt (both full). RULING: the
  description stays EXACTLY as approved, "HIPAA-compliant" included; the trimmed snippet is accepted. No
  wording keeping both "HIPAA-compliant" and the money line fits 155 (shortest measured, 157). Consequence:
  `lib/case-study-schema.ts`'s description cap rises from 155 to 175 so the approved string validates; the
  155 trim in `clampDescription` is unchanged.

- **DIRECTION C REJECTED ON SIGHT — operator 2026-09-18 (Pass-121 EXECUTE, after previewing the round-2
  mocks locally)**, verbatim: "It looks bad. Still very wordy and the boxes with lines looks bad. Fable
  really signed off on this? confused on where the insipiration and ideas are coming for such a bland, word
  heavy, weak design. Its something that would not draw someone in. I feel like there are so many amazing
  design websites. Why do you keep going underwhelming? are there restraints?" He asked for a prompt for a
  Claude chat (Fable) research run on the best design ethos, fed as few design restraints as possible.
  CONSEQUENCE: the Direction C design (the hand-drawn box-and-arrow exhibits, the doorway, the brief's
  sections 3 and 4) is ON HOLD; brief Stages B to F do NOT run. Stage A (`294f7c9`, `ed4de52`: the ORDANI
  claims retirement, the gate, llms.txt, robots, sitemap dates, JSON-LD) is design-independent and STANDS.
  Every copy and fact ruling above stands; only the visual direction is reopened. Do not re-propose
  diagram-of-the-work boxes and arrows without a new dated ruling.

- **PASS-122 DIRECTION AND THE DEMO PIECE — operator 2026-09-18 (Pass-122 DIRECT, popup, after the three
  reference sheets `.planning/qa/pass-122/sheets/sheet-{A,B,C}.png` and the verified research,
  `.planning/research/pass-122-research-verify.md`)**. DIRECTION: picked "C: Kinetic Editorial
  (Recommended)" over the research's own pick (A, The Ledger), after being told A is structurally the site
  he already has. The description he picked: "Your numbers as poster-size type that assembles and moves as
  you scroll ($20M+, $14M, 800,000). The Tel Aviv clip plays inside the lettering for one beat. Most punch.
  Risk: phone speed, so I'd build it without 3D and prove it on a mid-range phone." NAMING: this is the
  RESEARCH'S Direction C, "Kinetic Editorial"; it is NOT Pass-121's rejected Direction C ("Five exhibits").
  Call it Kinetic Editorial everywhere to keep the two apart. NEXT STEP he picked: one screen at phone and
  desktop width, before any full mock set. DEMO PIECE: picked "Not yet: type first (Recommended)": "Mock
  the direction without it. Decide on a demo once the direction draws you in. Nothing diagram-shaped gets
  designed until then." The 2026-09-18 boxes-and-arrows hold above stands unchanged.
  RESEARCH FIGURES THAT MUST NOT REACH A SURFACE (verified 2026-09-18, not operator rulings, recorded so no
  leg lifts them from the research): Akamai "$610.4M" and "October 2021" (the pinned figure is $600M,
  EXITS_COMBINED_VALUE; no month is ledgered); "$20M+ in revenue behind the work" (approved: "behind my
  work"); 800,000 as a monthly rate ("impressions/mo"; approved: a peak month); "four exits" without
  "worked inside".
- **PASS-122 RULES ON TRIAL — operator 2026-09-18 (Pass-122 DIRECT, three popups, rule by rule, for the
  Kinetic Editorial direction)**. Each is his pick, verbatim, with the description he picked:
  MOTION (R9, R15, the one-signature rule): "Open it for scroll type (Recommended)": "Type and numbers may
  move with the scroll, a section may hold while its number assembles, and entrances may run past 400ms.
  Still banned: cursor followers, scroll that changes speed, marquees, idle loops. Reduced motion always
  gets the finished frame."
  DISPLAY FONT (R1): "Test new face vs Bricolage (Recommended)": "The first screen is shown twice, once in
  Bricolage and once in a more characterful display face chosen for moving type. You pick on sight. Body
  and label fonts stay." (Hanken Grotesk body and JetBrains Mono labels stay; mono still labels only.)
  COLOUR (R4, one accent, the dark band): "Poster grounds, one accent (Recommended)": "Each section may sit
  on its own full-bleed ground (ink, paper, or one saturated colour), still one accent per screen. The exact
  palette is chosen on sight at the style tile. Still no gradients, no purple, no glow."
  IMAGERY (R12): first answered with a question, verbatim "what would the research say?"; answered (the
  research cuts stock, AI illustration and 3D blobs; uses real photos, screen recordings and charts of real
  numbers; WebGL at most one hero moment), then re-asked. Picked "The research's line (Recommended)": "Real
  photos (plus a new shoot), short screen recordings of your AI systems, and charts drawn from your real
  numbers. Still out: stock, AI illustration, icons, 3D scenes. The 09-18 hold on box-and-arrow diagrams
  stands." A chart of a number is not a diagram of the work; the boxes-and-arrows hold is unchanged.
  COUNTERS (R13 second half): "Lift it for hero numbers (Recommended)": "One hero number per page or section
  may assemble once as it arrives. The real number is in the page without JavaScript, and reduced motion
  shows it finished. No tickers or stat bars."
  LOGO WALLS (R13 first half): picked "Open it": "Allow a logo row or quotes if real ones become available
  later, each approved by you." Nothing is faked or implied; each logo or quote needs his dated approval
  in this ledger before it renders.
  SHOOT: asked when to commission the research's half-day shoot; answered (Other), verbatim: "i like the
  idea of animating the real pics i have of me working." So: no shoot is commissioned; the imagery plan is
  animated versions of HIS OWN REAL photos of him working, made the way the Tel Aviv clip was made (the R12
  09-16 conditions carry over: the real photo is the poster and the no-JS, reduced-motion and save-data
  render; no captions, per the standing no-captions ruling). Which photos exist beyond the Tel Aviv one is
  his to supply.
  NOT ON TRIAL (kickoff): facts and copy. Voice rules, the banned-words list, the em-dash cap and every row
  of this ledger stand.
- **PASS-122 SCOPE: EVOLVE THE EXISTING THEME, NOT A REDESIGN — operator 2026-09-18 (Pass-122 DIRECT, popup,
  on seeing the style-tile panel's winner, a complete black-and-orange redesign of the first screen)**.
  Asked which tile to carry forward, he answered (Other), verbatim: "im confused - i didnt want to change the
  entire site. I wanted to take the best themes from these designs and incoporate them in our existing theme.
  even if it breaks some of the existing rules etc. Didnt want a complete redesign like this". Asked which
  display face, he answered (Other), verbatim: "ditto las tmessage".
  RULING: the existing site's theme stays: its structure, its pages, the Color Worlds home, cream paper,
  ink, copper, and the three faces (Bricolage display, Hanken body, Mono labels). "Kinetic Editorial" is a
  SOURCE OF THEMES to bring into that theme, not a replacement. The rules-on-trial rulings above stand as
  permissions ("even if it breaks some of the existing rules"), applied inside the existing theme. The
  display-face test is WITHDRAWN: Bricolage stays. The panel's tiles (`.planning/mocks/pass-122/tile-*`)
  are reference material only: nothing ships from them as a whole, and the black/signal-orange (#FF5A1F)
  palette they used is NOT adopted. Which themes come in, and on which page first, is his next pick.
- **PASS-122 THEMES AND FIRST PAGE — operator 2026-09-18 (Pass-122 DIRECT, popup, after the scope ruling)**.
  Asked which ideas come into the existing site (multi-select), he ticked all four: "Poster-size numbers
  (Recommended)" ("$20M+, $14M, 800,000 and the exit values set far bigger, each the image of its section,
  in Bricolage and your colours"), "Numbers that move (Recommended)" ("Each big number assembles once as you
  scroll to it, and the four exits step through like a scoreboard. Reduced motion shows them finished."),
  "Clip inside $20M+ (Recommended)" ("The Tel Aviv clip plays inside the $20M+ numerals for one beat, then
  they settle into your copper.") and "Fewer words" ("Paragraphs cut down to one-line captions under the
  numbers. Every cut shown to you before it's made; no rewording."). FIRST PAGE: picked "Home receipts
  section (Recommended)": "The rest of the home stays. Its $20M+ and four exits section takes the ideas you
  ticked." He is shown that section before and after at 390 and 1440 before anything else. FEWER WORDS
  binds: every proposed cut goes to him as a list before it is made; nothing is reworded.
- **PASS-122 RECEIPTS VERDICT AND THE FIRST CUT — operator 2026-09-18 (Pass-122 DIRECT, popup, after the
  before/after sheet and the live preview of `e2df56e` on the branch)**. VERDICT: picked "Yes, make the two
  fixes (Recommended)": "Clip more visible (still legible), the caption larger and tight under $20M+. Then
  the same treatment for /work ($14M, $3M, 800,000) with before/after for you." The evolved receipts section
  is APPROVED IN DIRECTION; it is not approved to ship until he sees the fixed version and a separate push
  approval. CUT: picked "Cut it, screen readers keep it (Recommended)": the h3 `The receipts.` is removed
  from the screen and stays as a visually hidden heading, same text, so the outline still reads. This
  retires the Pass-114 count-up and the hand circle around $20M+ on the home (replaced by the clip
  arrival; brand.json `motion.countup` and the CLAUDE.md count-up paragraph are rewritten when this ships).
- **PASS-122 RECEIPTS V2 LOCKED — operator 2026-09-18 (Pass-122 DIRECT, popup, after the v1/v2 sheets and the
  live preview of `1225bea`)**. Picked "Yes, it's right (Recommended)": "Lock it." The home receipts section
  as built in `1225bea` (footage graded `grayscale(1) contrast(.59) brightness(2.04) sepia(.12)` inside
  $20M+, copper settle, caption "In revenue behind my work" in Bricolage 600 under the numerals, the exits
  scoreboard, "The receipts." screen-reader only) is the approved design. Shipping still needs his separate
  push approval, after /work.
- **PASS-122 /WORK LOCKED WITH THREE CUTS — operator 2026-09-18 (Pass-122 DIRECT, popup, after the /work
  before/after sheets and the live preview of `30b1c45`)**. Picked "Yes, with the cuts below (Recommended)".
  CUTS he ticked (straight removals, nothing reworded): (1) "Description's figure list (Recommended)": the
  /work description becomes EXACTLY **"Four client engagements and the company I founded. Each page says what
  I found, what I built, and what changed."** (the middle sentence "$14M in revenue for a security company,
  $3M in contracts from an RFP engine, a content engine that peaked at 800,000 impressions in a month, a birth
  worker's practice rebuilt, and ORDANI." is removed; this amends the 2026-09-17 WORK_DESCRIPTION row).
  (2) "Featured entry's '$14M' (Recommended)": the featured Guardicore entry keeps its clip thumbnail,
  "Guardicore, acquired by Akamai" and the arrow, and no longer shows $14M. (3) "Two repeated Guardicore lines
  (Recommended)": "Akamai acquired the company in 2021." leaves the Guardicore /work entry, and the /work
  record row's Guardicore description ("$14M in revenue, sourced and closed, after the research moved the
  pitch from honeypots to east-west visibility.") is removed; the row still links to the study. NOT ticked:
  the method line stays, below the studies. Shipping still needs his separate push approval.
- **PASS-122 PUSH APPROVED, WITH FIXES — operator 2026-09-18 (Pass-122 DIRECT, popup, after the Fable ship gate
  `.planning/reviews/FABLE-122-SHIP.md`, verdict SHIP)**. PUSH: picked "Fix those, then ship (Recommended)":
  "Fix the two, plus your picks below. Rebuild with every gate, recheck, then push to main, deploy, point both
  domains at it, and verify live with curl." (The two: no blank poster slot before a figure assembles on a
  phone; halve the ~125px of empty paper at the top of /work.) FIVE TO TEN: picked "One line, one size
  smaller (Recommended)": "'five to ten.' stays on one line at a slightly smaller poster size. Same words."
  REPEAT: picked "Featured: photo + arrow only (Recommended)": "The small featured entry becomes the clip
  thumbnail and the arrow. Screen readers still hear 'Guardicore, acquired by Akamai'. The study below keeps
  its label." The approval covers exactly: the home receipts section (`1225bea`) and /work (`30b1c45` +
  `1674799` + these fixes). Nothing else.

- **THE /WORK HEADER — operator 2026-09-16 (after the Pass-120 release)**, verbatim: "the header
  setence above the actual case studies looks weak and feel that setence doesnt cover all the things
  i do. Maybe we just replace that with a header. There is no header and i get leadeing with
  guardicore since the vid is connected. but I would ratehr have just a basic description of whats
  below with a small thing (beautiful design) to click to a featured case study." This is a NEW
  RULING, recorded 2026-09-16 in Pass-121 DIRECT, not a re-litigation: it SUPERSEDES the placement of
  THE /WORK METHOD LINE row below on /work (the sentence may not open /work) and the Pass-120
  Direction B hero (the lead study at hero scale with the clip). /work opens on a heading plus a plain
  description of what the page holds, and one small, designed entry into a featured study.
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
- **RFP ENGINE RESULTS, PROVENANCE — operator 2026-09-15**, by popup and chat in the Pass-120 DIRECT
  session (transcript "MJCONSULT SEP 2", recovered 2026-09-19 because no row held them; LESSONS #32).
  Live on the RFP study since Pass-120 (`6c564b4`). Verbatim, PDT:
  16:42 "what does the $3M actually count?" = **"Signed contract value"**. 16:42 "'close rate doubled'
  from what to what, and measured on what?" = **"About 1 in 8 to 1 in 4 of submitted proposals"**.
  16:42 "which of these details can be published?" = "Twenty years of work", "Books, keynotes,
  training programs", "Federal, state and local portals", **"Eleven contracts behind the $3M"**.
  17:09 "which of these can I state as fact on the page?" = "You were the sole builder", "You ran
  multi-million-dollar RFPs earlier in your career", **"The close rate doubled inside six months"**,
  "The client's quote". 16:59 "are the before numbers in the draft right? (two or three responses a
  month, three to five working days each)" = **"Both about right"**. 15:49, on the dramatized draft
  `eaa0cd7` (tags C1-C26; C3 "about one in eight to one in four", C24 "across eleven contracts", C25
  "eight to ten RFPs a month, up from two or three"): "C1: it was actually a 3 days before it was up
  and running ... everything is great." So the live figures stand: $3M signed; close rate one in
  eight to one in four of submitted proposals, inside six months (his answer carried "About"; the
  page states the rounded ratio); two or three responses a month before, eight to ten after.
  WORDING NOTE: he confirmed "eleven CONTRACTS"; "eleven awards" is the v2 drafter's substitution
  (`e295925`). The Fable-120 ship gate flagged it (two senses of "award" beside "An award-winning
  author") and it was parked as optional on 2026-09-16; it goes to him by popup (LESSONS #35).
- **RFP CONTRACT COUNT RETIRED — operator 2026-09-19 (Pass-123, popup on the "eleven awards" wording)**,
  answered (Other), verbatim: "lets not number the contracts in this story sorry. no need to say 11
  contracts won, just say the overall amount." SUPERSEDES the 09-15 "Eleven contracts behind the $3M"
  publish answer in the row above. The three live lines become straight cuts, nothing reworded:
  `results.lead` **"$3M in signed contracts."**; `/work` `entry.line` (under the $3M poster) **"in signed
  contracts."**; What changed bullet **"$3M in signed contracts through the platform."** NEVER on any
  surface: any count of the RFP client's contracts or awards ("eleven awards", "eleven contracts", "11
  contracts", "eleven of them"). The $3M, the close rate and the response counts are unchanged.
- **RFP DAY-THREE FAQ CUT — operator 2026-09-19 (Pass-123, popup)**. The live FAQ "**What was working after three
  days?** Real RFPs arriving, scored for fit. The library, the drafting and the tuning came after."
  (`content/work/rfp-engine.mdx:91`) contradicted the page (line 41: "Scoring, the library and the drafting came
  after that.") and his 09-16 confirmation of ?2 (day three was discovery only). Found by the Fable-123 cuts
  read. He picked "Cut the whole FAQ (Recommended)": the FAQ leaves the study; line 41 and the "First real RFPs
  delivered: Day three" row carry the fact. NEVER on any surface: that the RFP engine scored anything by day
  three ("scored for fit" is gated).
- **COPPER IS #bd5a2d, THE DOCS WERE WRONG — operator 2026-09-19 (Pass-123, popup, after an A/B of both
  hexes on the home, /work and a study at 390 and 1440,
  `.planning/qa/pass-123/copper/copper-ab-{390,1440}.png`)**. He picked "Keep what ships, fix the docs
  (Recommended)": "Nothing on the site changes. I correct the design notes, brand.json and the stale
  stylesheet comment to #bd5a2d / #8a3d24 and ledger it, so no future check or design re-encodes the old
  hex." FACTS: the stylesheet has shipped `--color-accent-copper: #bd5a2d` and `--color-accent-copper-deep:
  #8a3d24` since Tier H (`40b97a6`, "shifted from #C8542B (digital orange) -> #BD5A2D (leathered amber)"),
  so every design he has approved on sight is that colour; `.claude/CLAUDE.md`, `brand.json` and the
  stylesheet's own header comment kept #C8542B / #8E3A1E. Corrected in all three on 2026-09-19. Computed
  ratios for the LIVE hexes: copper 3.93 on foyer paper (still FAILS AA for body text, the B1 rule stands),
  3.53 on bone, 4.22 on the theater band, 3.57 on espresso; copper-deep 6.62 on paper, 5.94 on bone (PASS).
  NEVER re-encode #C8542B or #8E3A1E in a check, a brief or a design note.
- **PASS-123 SHIP APPROVED AND THE RFP RESULTS ROW SETTLED - operator 2026-09-20 (popup, after the
  fresh before/final sheets `.planning/qa/pass-123/sheets/study-final-{390,1440}.png`, captured 11:01
  against the post-fix build)**. PUSH: picked "Yes, push it (Recommended)" - `design/live-evolve` goes
  to `main`, Vercel deploys on push, CARD 1 and both aliases follow. RFP RESULTS ROW: told that his
  2026-09-19 "drop the repeat" ruling had been ledgered as done but never built, and that building it
  leaves the RFP study as the only one of the five whose Results row has no display-size lead
  (guardicore, content engine and ORDANI each keep one), he picked "Leave it quiet (Recommended)": the
  row stays as the smaller "Close rate from one in eight to one in four inside six months. Responses
  out per month: two or three, then eight to ten.", because the $3M already reads at poster size
  directly above it. The offered alternative - promoting the close-rate sentence to display size - is
  REJECTED and is not to be re-proposed without a new dated ruling. No copy was written or reworded by
  either decision.
- **PASS-123 JUDGE-GATE ANSWERS — operator 2026-09-19 (popup, after the Fable judge read of the built
  bands)**. RFP RESULTS ROW: picked "Drop the repeat, keep the rest (Recommended)": after the contract
  count was retired this morning, `results.lead` became "$3M in signed contracts.", word for word the
  title's figure line, sitting under the poster that says it. REQUIREMENT (imperative, not a report -
  see the correction below): the template MUST render `results.rest` alone, dropping the lead, whenever
  `results.lead` minus trailing punctuation equals the title's figure line - the same silence birth
  worker's poster already produces, no string edited, and it fires on rfp-engine alone (guardicore's and
  content engine's leads differ from their titles). CORRECTION 2026-09-20: this row was first written in
  the past tense ("the TEMPLATE now renders...") and the template was never changed - commit `0171769`
  touched this file and nothing else, so the repeat shipped on the branch for a day while the ledger
  said it was fixed. Two audit legs caught it off the prerendered HTML before it reached him.
  Implemented for real by `leadRepeatsTitleFigure` in `lib/title-figure.ts` and held by
  `scripts/results-repeat-gate.mjs` in `pnpm build` (LESSONS #44). GUARDICORE DEK: picked "Keep it as you ruled": the
  dek still opens "$14M in revenue, sourced and closed, at a $1.2M average enterprise deal, for a
  security company built in Tel Aviv..." under the $14M poster; both offered rewrites are REJECTED and
  are not to be re-proposed without a new dated ruling.
- **PASS-123 CUTS TICKED — operator 2026-09-19 (Pass-123, three popups, after the built before/after sheets
  `.planning/qa/pass-123/sheets/study-before-after-{390,1440}.png`)**. Straight removals only, nothing
  reworded, from `.planning/mocks/pass-123/CUTS-PROPOSED.md`. TICKED:
  GUARDICORE G1 (dek sentence 3 "Akamai acquired the company in 2021.") and G2 (results.rest sentence 2
  "Acquired by Akamai in 2021.", leaving "$1.2M average enterprise deal.").
  RFP ENGINE R1 (dek sentence 3 "Their close rate went from one in eight to one in four.") and R2 (dek
  sentence 1 "$3M in signed contracts, won through AI software I built for an award-winning author and
  leadership consultant."; the dek then opens "It finds the RFPs worth answering...").
  CONTENT ENGINE C2 (dek sentence 1 "Monthly impressions went from a few thousand to a peak of 800,000.")
  and C1 (dek sentence 4 "One income stream became four.").
  BIRTH WORKER B1 (dek sentence 1 "Bookings went from one to three a month to five to ten.").
  TEMPLATE T1b: the at-a-glance Client row goes on every study; "Name protected" moves directly under the
  context line above the title, same words and style, on the three anonymous studies.
  NOT TICKED, so they stay: G3 (the dek's $14M sentence, so "built in Tel Aviv" and the "those buyers"
  antecedent survive), G4, R3, R5, R6, C3, C4, C5, C6, B2, B3, B4, B5, B6, and ORDANI entirely (he picked
  "None - leave ORDANI alone", including O6, the dek money line he asked to lead with on 2026-09-16).
- **PASS-123 STUDY PAGES SCOPE — operator 2026-09-19 (Pass-123, popup, asked first per LESSONS #39)**. Question:
  the five study pages (one template), "Same rule as /work: your themes feed the existing page, nothing gets
  redesigned. Which parts take the themes?" He ticked three: **"Band number as a poster"** ("The top band's
  result ($14M, $3M, Up to 800,000, five to ten) set at poster size in copper, assembling once, like /work.
  Lifts the 56px cap from 09-16 for that one figure. ORDANI gets no number."), **"Fewer words"** ("I list
  each sentence I'd cut on each study and you tick the ones to go. Nothing is reworded."), and **"Guardicore
  photo plays the clip"** ("On the Guardicore study only, the band photo becomes the Tel Aviv clip for one
  beat, then rests on the photo (the same clip as /work's featured entry)."). NOT ticked: "What changed as
  big numbers": the body's What changed list stays as it is. Scope: FEEDS the existing theme; changes the
  study template's band (and the proposed cuts once he ticks them), nothing else. A before/after at 390
  and 1440 goes to him before anything ships.
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
- **PASS-124 FIRST MOVE AND THE AUDIENCE RULING — operator 2026-09-20 (Pass-124 DIRECT, popup, after the copy research was verified against this ledger)**. FIRST MOVE: picked "The cut list (Recommended)", whose description read "I list every sentence and structure I'd cut from the live pages - the 01/02/03 triad, the template headings, the repeated arrow formula - and you tick the ones that go. Nothing is reworded, no new copy, so it needs zero new facts and zero new ledger rows. This is the actual fix for 'very AI, wordy'. Same day I close the em-dash gate on .tsx, which is blind to the new copy that's coming." This carries forward the Pass-122 FEWER WORDS mechanism unchanged: every proposed cut goes to him as a list before it is made, and NOTHING is reworded. The em-dash gate fix is approved inside this pick.
  AUDIENCE: picked "Adopt the ruling as proposed", i.e. the copy research's Deliverable 3. So: a shared-problem hero rather than a single-persona lead; segmentation one scroll down as "you are probably here" paths; ORDANI stays on the home as proof of range and mission; a "Work with me full-time" page for the hiring manager, linked from the footer and once from /about and NOT in the primary nav. CTA order: packages self-serve first, the engagement email second, the corporate role third.
  TWO THINGS RECORDED WITH THE ADOPTION, so neither is carried in silently. (1) The research's ruling was built on a miscount: it called ORDANI a fifth CLIENT. The approved framing is unchanged - **"Four client engagements and the company I founded."** The adoption does NOT import that miscount, and ORDANI is never described as a client. (2) The research named the condition that makes its own ruling wrong - 70%+ of revenue coming from one segment. No revenue split was supplied and he adopted without one, so this adoption is NOT a revenue claim and never becomes the source of one. NEVER: "the enterprise buyer who pays your largest fees", or any per-segment revenue ranking; the $20M is ruled a mix of employed and consulting work.
- **PASS-124 RESEARCH FIGURES THAT MUST NOT REACH A SURFACE — verified 2026-09-20 by this session against this ledger, NOT operator rulings.** Recorded the way the Pass-122 row of the same shape was, so that no future leg lifts a figure or a sentence out of the Pass-124 copy research (the chat answer saved at `.planning/research/pass-124-copy-research-ANSWER.md`, prompt at `.planning/research/pass-124-copy-voice-prompt.md`). Each is followed by what IS approved.
  "$20M+ in revenue behind the work" -> "behind my work" (third-person surfaces: "behind his work"). "$20M+ behind your work", dropping "in revenue", is also out.
  The corpus rates "8.9%" and "1.0%", AND any ratio derived from them, including "~9x more common". The qualitative direction (post-launch silence is the commoner pain) survives; the arithmetic does not.
  "5,456 posts" as the corpus figure -> the ledgered **4,464 posts** with 250+ character bodies. 5,456 is the raw cache in `01-REDDIT-EVIDENCE.md`, not the analysed corpus.
  "27 distinct authors" for "landing page" -> Cut B ledgers **34 authors / 35 asking posts**. The two numbers are not reconciled; neither ships until he rules.
  Lift scores "7.3x" and "13.4x" for "kept running" / "keep running". The ledger carries an author count (21), from the `reference/` file it states is NOT the governing one.
  "the playbook" anywhere, including the proposed blog title "I shipped it. Nobody came. Here's the playbook I run first." The phrase is gated by `scripts/retired-phrases-gate.mjs` and that title would fail `pnpm build`. "it shipped, nobody came" was the former /playbook page's own title, so the blog theme needs a dated ruling before it revives the held-back book's positioning.
  "I sat in the deals and heard the real fear", and any framing in which the Guardicore visibility finding arrived by overhearing buyers. The live study credits research: "I ran the research that found what those buyers were actually signing for".
  "the traffic between their own systems" as a replacement for the approved "east-west traffic between their own workloads". The Pass-123 judge gate REJECTED both Guardicore dek rewrites and they are not to be re-proposed without a new dated ruling; this is one of them.
  "$1.2M a deal" without "enterprise"; "a major utility" without "U.S."; "Seeing inside was what they were paying for" for the approved "signed for".
  "you sold it to a top-10 North American bank" - the live study frames that account as the pilot that proved it, not a close.
  "embedded as head of GTM, product, and AI engineering" as a role he has HELD. The live /services line offers it: "I act as your head of GTM, product, or AI engineering for the window" - one role, disjunctive, time-boxed.
  ORDANI built "as one engineer". ORDANI is framed as a real company he founded and built; the solo framing was only ever allowed on /playbook, which is off the site.
  "thirteen years taking AI systems from notebook to production" - thirteen years is his time in enterprise software since 2013, not thirteen years of AI work.
  TWO FALSE POSITIVES IN THAT RESEARCH, recorded so nobody acts on them. (1) Its "One factual flag from the live site" calls the home's SurveyMonkey **"$2.33B"** unauthorised. It IS authorised: it is a named component of the $5B+ breakdown in this ledger and its source is pinned in `content/citations.ts` (EXITS_COMBINED_VALUE). Do NOT cut it. The prompt's fact list simply omitted it. (2) Its diagnosis says the home's preview card repeats "five times"; it repeats FOUR times (`cw-lrow--link`, `app/(foyer)/page.tsx`).
  ITS EXTERNAL SEO SCHOLARSHIP WAS CHECKED against primary sources on 2026-09-20 and HOLDS, with two corrections: the Ahrefs AI-Overview study (863K SERPs, 38% against 76%) published **2026-03-02**, not February; and the Reddit citation shares (46.7% Perplexity, 21% AI Overviews) are **Profound's** figures, which thestacc.com republishes. Verified as stated: the March 2026 core update and its 2026-03-27 to 2026-04-08 rollout; Semrush's 230,000-prompt study with Reddit and LinkedIn both top five; the Reddit-in-ChatGPT fall from about 60% to about 10%; the Ahrefs llms.txt study (Linehan and Guan, 2026-06-15, 137,210 domains, 97% with zero requests in May 2026); Kevin Indig's 44.2% "ski ramp" finding.
  STILL OPEN, his to answer before any of the above is rewritten rather than cut: the Guardicore mechanism (heard in the deals, or found by research); ORDANI "one engineer"; the "landing page" author count; whether the plain-language east-west swap gets a new dated ruling; and whether "it shipped, nobody came" may carry the blog.
- **PASS-124 TICKING METHOD AND THE TITLE SEPARATOR — operator 2026-09-20 (Pass-124 DIRECT, popup, after the cut list `.planning/mocks/pass-124/CUTS-PROPOSED.md`)**. TICKING: picked "Before/after sheets first (Recommended)", whose description read "Same as Pass-123. I have every cut built on a branch preview and captured before and after at 390 and 1440. You look at the real page, then tick in popups." So every proposed cut is built on a PREVIEW branch that never merges, captured before (production) and after at 390 and 1440, and only his ticked cuts are then applied to `design/live-evolve`. Nothing ships without a separate push approval.
  SEPARATOR: asked how to close the .tsx em-dash gate, which failed on page-title separators, he picked "Change the separator" over skipping titles in the scan. The option's own example was `Micah Jones | Strategy and software`, so the separator is **" | "**. APPLIED 2026-09-20: the root default and template (`app/layout.tsx`), the home's absolute and OG/Twitter titles, the /about OG title, and the case-study OG/Twitter titles; the comments describing the old separator were updated with them. NOT changed, deliberately: three aria-labels (`Nav.tsx`, `Signature.tsx`, the home CTA), which are spoken, not titles, and each leaves its file at or under the cap. `EM_DASH_BLOCKING_EXTS` now includes ".tsx"; the scan was NOT narrowed. Bite-tested: a .tsx carrying two em-dashes fails `copy-lint` with exit 1. NEVER reintroduce " — " as a title separator; it now fails the build.
- **/ABOUT "PRODUCT BUILDS." AND THE GUARDICORE FINDING — operator 2026-09-20 (Pass-124 DIRECT, popup)**. /ABOUT: asked what the bold lead-in "End-to-end product builds." (`app/(foyer)/about/page.tsx`) should say, given the 2026-09-11 retirement of "End-to-end product building", he picked "\"Product builds.\" (Recommended)": a straight cut of "End-to-end", nothing else. APPLIED; the retired-phrases gate entry is widened to the stem "End-to-end product build" (case-insensitive substring, so building, builds and build all fail), with a planted plural and a "Product builds." near miss in its self-test (89 planted caught, 33 near misses passed).
  GUARDICORE: asked how he found that buyers could not see the traffic inside their own environments, he picked "I heard it in the deals": he heard it firsthand while sitting in sales conversations. New copy MAY say he heard it in the deals. This SUPERSEDES that part of the 2026-09-20 "PASS-124 RESEARCH FIGURES" row, which listed any in-the-deals framing as unshippable. STILL NOT CONFIRMED and still out: "the real fear" and any other dramatised detail of what was said. OPEN, raised with him the same day: the live study credits RESEARCH in five places (the dek "I ran the research that found what those buyers were actually signing for", the did-line, the scope row "Customer research and data analysis", the body "I interviewed customers, researched the market, and ran the data analysis", Step 01 "The research, before the pitch changed."). Whether those still stand beside his answer is his to say; nothing in the study changes until he does. The Pass-123 lock on the Guardicore dek holds until then.
- **PASS-124 HOMEPAGE: BUILD WHAT THE RESEARCH SAID, NOT A TICK LIST — operator 2026-09-20 (Pass-124 DIRECT, popups)**. Shown the cut-list sheets and asked to tick, he answered (Other), verbatim: "confused why im being asked what to remove. did the research not say what to say and what to cut? also think we need to moreve the many examples under the how i work or simplfy how we communicate \"hey here is an example on how i work\" maybe just one spot linking to the entir epage instead of examples for each step", and on the second popup "again confused about this like i stated before - what did the fable research say?". RECORDED AS A PROCESS MISS by the main session: the research's recommendations were mostly rewrites, and reducing them to a removals-only tick list handed its job back to him. SUPERSEDES the cut-list ticking for the homepage (the inner-page cuts, which were the main session's and DeepSeek's and not the research's, are parked).
  HOW I WORK: the per-step example rows (the Guardicore, ORDANI, social activist, author, SurveyMonkey, Postmates and Neuton.AI rows under each step) are REMOVED; ONE link to the full work page replaces them.
  BUILD: picked "Build it, new lines marked (Recommended)": the homepage the research described, rendered as one proposal he judges on sight at 390 and 1440. The research's cuts and his note are applied, the ORDANI image stack comes off the home, and every NEW sentence (hero, How I work, the engagements door, the closing CTA) is drafted in the research's Voice B with the ledger fixes and marked as new. Nothing ships without his push approval.
  RECEIPTS: asked whether the 09-18 locked receipts design or the research's "fold the numbers into sentences" wins, he picked "Show me both": the proposal is rendered both ways. The 09-18 lock stands until he picks.
- **GUARDICORE: RESEARCH AND THE DEALS, BOTH — operator 2026-09-20 (Pass-124 DIRECT, popup)**. Asked whether the live study's five research credits still stand beside his answer that he heard the visibility finding in the deals, he picked "Both happened": he did the customer interviews and data analysis the study describes AND heard it in the deals. CLOSES the OPEN item in the "/ABOUT \"PRODUCT BUILDS.\" AND THE GUARDICORE FINDING" row. The live study is unchanged and correct; new copy may credit either the research or the deals, or both. The Pass-123 lock on the Guardicore dek stands. Still out: "the real fear" and any dramatised account of what buyers said.
- **HOW I WORK: FOUR STEPS, FINAL 1 — operator 2026-09-21 (Pass-124 DIRECT, popups)**. Shown the proposal's How I
  work (no heading, "The story comes first." and two short paragraphs), he answered (Other), verbatim: "i hate that
  the how i work part is gone - replaced by something i dont understand. did fable research say to use that?" Told
  plainly that the research asked for the numbered grid to become unequal paragraphs and called the heading a
  template heading, but did NOT write "The story comes first." (a DeepSeek draft Fable picked) and did not hide the
  heading (the main session's call), he picked "Bring it back, simpler (Recommended)", then wrote (Other), verbatim:
  "i want the how i work with steps but i want the steps to sound like 'Wow this guy sounds like a true product
  manager/builder who can help me with my solo build/biz, or even enterprise company' the current how i work sounds
  very AI". Drafted by DeepSeek v4-pro and Sol from his approved /services and /packages commitments only; the main
  session struck every draft that merged "Something named ships in month one" with the production build (an
  inflation, most drafts did it); Fable returned three finals (`.planning/reviews/FABLE-124-HOW-I-WORK.md`). He picked
  "Final 1: Fable's pick" over the main session's recommendation (Final 2, which kept selling as its own step).
  EXACT approved copy, heading "How I work." visible, no numerals, no example rows, then one link "See the work":
  SCOPE / "Week one is an audit and a scope." / "I look at where things stand: what works, what is broken, and what
  to fix first. The scope and the price go in writing before anything starts."
  PLAN / "I name the trade-offs before I build." / "You get a roadmap, and you sign off on it before I build
  anything. Something named ships in month one."
  BUILD / "I build the real thing, not a prototype." / "That means sign-in, data, deployment, and where it stands on
  compliance, written down. You get me, directly, and a reply within one business day."
  STAY / "I stay for launch and what customers break." / "I interview customers and listen to sales calls to find the
  question buyers are actually asking. Then I hand over documentation and a walkthrough so your team runs it without
  me."
  SUPERSEDES the proposal's "The story comes first." paragraphs and its hidden heading. Still open: the receipts (A
  or B) and whether "operator" and the hero's turn to $20M+ get reworked (his answer ticked both rework and keep).
- **HOW I WORK LOCKED; RECEIPTS STAY AS LOCKED — operator 2026-09-21 (Pass-124 DIRECT, popups, after the rendered
  How I work at 1440 and 390, `.planning/qa/pass-124/home-v6/`)**. HOW I WORK: picked "Yes, lock it (Recommended)":
  the four steps ship exactly as ledgered in "HOW I WORK: FOUR STEPS, FINAL 1", with one typographic change only: a
  no-break space so "BREAK." (Stay headline) and "one." (Plan body) never sit alone on a phone line. RECEIPTS: picked
  "A: as you locked it (Recommended)": the 09-18 PASS-122 RECEIPTS V2 design (the $20M+ with the Tel Aviv clip, the
  four-exits row) STAYS on the home. The research's "fold the numbers into sentences" (variant B) is REJECTED and is
  not to be re-proposed without a new dated ruling.
- **PASS-124 HOMEPAGE, THE REST — operator 2026-09-21 (Pass-124 DIRECT, popups)**. Asked to approve the rest of the
  proposal (multi-select), he ticked only "New headline": the H1 "It works." / "It just does not sell." is APPROVED.
  Asked about the two lines both jurors flagged, he picked "Rework both": the paragraph under the headline and the
  engagements door's "I step in as the operator." get new drafts he picks from; "$20M+ in revenue behind my work"
  stays word for word. Asked about the three parts he left unticked: DOORS, answered (Other) verbatim "go with
  proposal rec", i.e. the recommended "Move up, with a reworked line": both doors move directly under the hero, both
  kickers go, the build door keeps its live copy, the engagements door keeps the headline "An agency is too broad. A
  hire is too early." and takes a reworked body ending "You get me directly." ORDANI: ticked "Remove the ORDANI
  photos": the four photos leave the home; the ORDANI text and waitlist stay exact. CLOSING LINE: "Use MAKE IT SELL"
  was NOT ticked, so "NAME THE PROBLEM →" STAYS as live. Everything else on the home stays as live.
- **THE TWO REWORKED LINES — operator 2026-09-21 (Pass-124 DIRECT, popups)**. Drafted by DeepSeek v4-pro and Sol;
  judged independently by Fable and Astra, who split on both (`.planning/prompts/PASS-124-TWO-LINES-PICK.md`,
  `.planning/reviews/ASTRA-124-TWO-LINES.md`); he asked for their picks by name, then picked Fable's on both.
  EXACT approved copy. HERO PARAGRAPH, under "It works." / "It just does not sell.": **"I shape the product and build
  the message that sells it. I have $20M+ in revenue behind my work."** (SUPERSEDES "I'm Micah Jones. There is $20M+
  in revenue behind my work. I build what sells."; the $20M+ phrase is unchanged word for word.) ENGAGEMENTS DOOR,
  under "An agency is too broad. A hire is too early.": **"I build what your growing business needs next, from the
  product to the way you sell it. You get me directly."** (SUPERSEDES "I step in as the operator. You get me
  directly."). Astra's alternatives, not picked: "I make your product easier to understand and buy." and "I improve
  the product and build a clear way to sell it as your business grows."
- **PASS-124 PUSH APPROVED — operator 2026-09-21 (popup, after the final before/after sheets and the Fable ship
  read, verdict SHIP)**. Picked "Yes, push it (Recommended)", whose description read "I move the branch to main, and
  Vercel deploys on push. I point both domains at the new deploy and run the ship check against the live site. Undo
  is one step: promote today's deploy (dpl_9Q3J...) back." The approval covers exactly: the rebuilt home, the " | "
  title separator, /about "Product builds.", and the two build-time gates. Nothing else.
- **PASS-125 FULL-TIME PAGE: THE SEAT AND ORDANI — operator 2026-09-21 (Pass-125 DIRECT, popups, before any draft)**.
  SEAT: asked what seat the "Work with me full-time" page names, he picked "Early-stage build-and-sell hire" over the
  main session's recommendation ("Head of GTM, product, or AI"). The option he picked read: "The first person at an
  early company who both builds the product and sells it. Fits that you joined all four exits early. Narrows the page
  to startups." So the page is written for a hiring manager at an EARLY-STAGE company, and the seat it names is the
  first person who both builds the product and sells it. NEVER on this page: "head of" as the seat sought, a job title
  or level he has held beyond the ledgered Postmates "product analyst", or any claim that he led a team or managed
  people (the ledger carries none; Guardicore is "no team led"). "Early" for the four exits stays the flat public
  rendering (2026-09-02).
  ORDANI: asked what the page says about ORDANI's future if he takes a role, he picked "Nothing; I answer on the call
  (Recommended)": ORDANI appears only as proof, a company he founded and built. NEVER on this page: a promise, plan or
  hours commitment about ORDANI alongside or after a role.
  LOCATION: not asked; the 2026-09-02 ruling stands (no city chip; "in many places that is irrelevant"). The page
  states no location unless he rules otherwise.
- **PASS-125 FULL-TIME PAGE TO THE SHIP CHECK; NEUTON LINE KEPT — operator 2026-09-21 (Pass-125 DIRECT, popup, after the
  round-5 scroll sheets at 390 and 1440, the /about capture and the served preview)**. PAGE: picked "Yes, to the ship
  check (Recommended)", whose description read "I move the page, the three footer links and the /about line onto
  design/live-evolve, run the full build and gates plus the live-site check script, then ask you for the push in your own
  words. Nothing goes live before that." So `/full-time` as built on `preview/p125-full-time` (`e89202a`) is APPROVED IN
  CONTENT; it is NOT approved to ship until a separate push approval. The EXACT approved copy is `content/full-time.ts`
  at that commit (H1 "I build the product and sell it."; principles Code, Positioning, Result, Scope; Result headline "I
  build software that helps close deals."; "The record." rows; "Write to me."; /about "I also want one full-time seat:
  ..."). Drafted by DeepSeek v4-pro and Sol, picked by Fable, fixed and re-confirmed by Fable, Astra and DeepSeek
  (`.planning/reviews/PASS-125-JURY-DISPOSITION.md`).
  NEUTON: all three jurors flagged "years before anyone was queuing to buy AI"; he picked "Keep my line (Recommended)".
  The approved /work record description stays word for word on /work and /full-time. The three rewrites (Fable's,
  Astra's, DeepSeek's) are REJECTED and not to be re-proposed without a new dated ruling.
  PARKED, not ruled: /about names Ordani "HIPAA-compliant practice management for birth workers" while the study and
  /full-time say "a HIPAA-compliant CRM for birth workers" (Fable, twice). It is live /about copy, so it goes to the
  inner-pages pass.
- **FULL-TIME PAGE HELD; HOW I WORK IS THE PRIORITY — operator 2026-09-21 (Pass-125, popups, at the push ask)**. Asked
  to push /full-time, he answered (Other), verbatim: "Before pushing can you explain what exactly this is? im confused
  because the ask was to redesign the how i work part (that sits on the home page and i htink other places) and now we
  get a full time page?" RECORDED AS A PROCESS MISS by the main session: the kickoff's "Start with the full-time page" was
  written by the Pass-124 session and pasted by him; nobody confirmed it was still his priority before a whole page
  arc ran. Told so, he picked "Hold it, How I work first (Recommended)": the full-time page is NOT pushed; it came off
  `design/live-evolve` by `git revert` (`95cb41b`) and lives whole on `preview/p125-full-time` (`708ac61`). TO SHIP IT
  LATER: `git revert 95cb41b` on the branch (re-merging the preview branch will NOT bring it back), then the ship check.
  HOW I WORK, he ticked "Same words, better design" ("Keep the four steps you locked this morning word for word.
  Redesign how the section looks on the home (layout, type, motion).") and "Carry it to other pages" ("Put the same
  four steps on /services, which today says the same commitments in different words, so the process reads the same
  everywhere."). NOT ticked: "New words". So the locked Scope / Plan / Build / Stay copy (row "HOW I WORK: FOUR STEPS,
  FINAL 1") is not reworded; the /services wording of the same commitments is replaced by the four steps.
  HE ASKED, verbatim: "just to confirm the four steps were already written and checked by the top models?" ANSWERED from
  the records: drafted by DeepSeek v4-pro and Sol, three finals by Fable, his pick Final 1, Fable's ship read SHIP;
  Astra read only the earlier "story comes first" version (and flagged "Something named ships" as manufactured, as
  Fable flagged it a risk); DeepSeek never reviewed the final. Under the 2026-09-21 routing (Fable, Astra and DeepSeek
  each confirm) the four steps carry one of three confirmations; the redesign pass collects the other two.
- **HOW I WORK: THE PLAN LINE, AND THE COPY CONFIRMED — operator 2026-09-21 (Pass-126, popup, after the three jurors'
  reads of the redesign preview, `.planning/reviews/PASS-126-JURY-DISPOSITION.md` on `preview/p126-how-i-work`)**.
  CONFIRMATION: Scope and Stay confirmed by Fable, Astra and DeepSeek v4-pro; Build confirmed by Fable and DeepSeek,
  flagged by Astra; Plan flagged by all three ("Something named ships in month one." read as a placeholder; Fable also
  heard "before I build" twice in a row). Rewrites drafted by Sol and DeepSeek v4-pro; DeepSeek's three Plan drafts were
  struck by the main session (each put the roadmap before ANY work, but week one's audit is work).
  PLAN: picked "Sol's: ...before development begins (Recommended)". EXACT approved Plan body, SUPERSEDING the one in
  "HOW I WORK: FOUR STEPS, FINAL 1": **"I give you a roadmap, and you approve it before development begins. A defined
  piece of the work ships within the first month."** (a no-break space before "month."). The Plan headline "I name the
  trade-offs before I build." is unchanged. The month-one promise stays a defined piece, never the build or a launch.
  NEVER on the How I work steps again: "Something named ships in month one."
  BUILD: picked "Keep my line (Recommended)": "That means sign-in, data, deployment, and where it stands on compliance,
  written down." stays word for word; Astra's objection is recorded and declined.
- **HOW I WORK REDESIGN TO THE SHIP CHECK — operator 2026-09-21 (Pass-126, popup, after the before/after scroll sheets
  at 1440 and 390 for the home and /services and the served preview)**. Picked "Yes, to the ship check (Recommended)",
  whose description read "I merge it onto the working branch, run every build check plus the live-site check script,
  then ask you for the push in your own words. Nothing goes live before that. The full-time page stays held." APPROVED
  IN DESIGN: Sol's "The Marked-Up Proof" as built on `preview/p126-how-i-work` (`3d5bb88`): the four steps as one uneven
  page on espresso (home) and bone (/services), sentence-case headlines, a copper rule per step as the only copper, no
  hold; on /services the steps replace "Every engagement includes", the two lines the steps do not say ("No discovery
  fee. Any one of the three areas below, two of them, or all three.") sit under "Three areas of work", and "Why one
  person" loses its week-one and month-one sentences. NOT approved to ship until his separate push words.
- **HOW I WORK: FABLE'S TWO FIXES BEFORE THE PUSH — operator 2026-09-21 (Pass-126 ship check, popup, after the gated
  build, card1-126's bite test and Fable's ship read SHIP, `.planning/reviews/FABLE-126-SHIP-READ.md`)**. Asked "Push
  it?", he picked "Fix Fable's two small ones first" over "Yes, push it (Recommended)", whose description read, verbatim:
  "Both are layout only, no words change. On /services at desktop width, 'prototype.' sits alone on the Build
  headline's second line. On the home at phone width, the Scope rule sits closer under 'HOW I WORK.' than it does on
  /services. I fix both, rebuild, re-check, then ask again." So: NOT pushed. The fix is layout only; no string in
  `content/how-i-work.ts` changes. The push needs his words again after the fix is rebuilt and re-checked.
- **PASS-126 PUSH APPROVED — operator 2026-09-21 (popup, after the r6 sheets of both fixes, the rebuilt gated build,
  hiw-wrap-gate 0 failures and card1-126 74/0 on the local served build of `90b3699`)**. Asked "Push How I work now?",
  he picked "Yes, push it (Recommended)", whose description read, verbatim: "I move the branch to main and Vercel
  deploys on push. Live changes: How I work on the home and /services (with the two fixes), plus sitemap dates.
  Nothing else, and the full-time page stays held. I point both domains at the new deploy and run the check against
  the live site. Undo is one step: promote today's deploy (dpl_2mGq...) back." The approval covers exactly:
  `design/live-evolve` at `bd679db` to main (site diff vs `e8b44e3`: the How I work redesign, Pass-126d's two layout
  fixes, `content/lastmod.json`). Nothing else.
- **THE DOORS: ANOTHER ROUND; THE BLOG STARTS WITH FIRST USERS, ADVICE-LED — operator 2026-09-21 (Pass-127, popup,
  after the five door directions at 1440 and 390 and the blog title check `.planning/research/BLOG-TITLES-CHECK-2026-09-21.md`)**.
  DOORS: shown A to E with the jury (Fable C, Astra C, DeepSeek B from code only), he picked "None yet: another round"
  with no note. So none of the five ships as drafted; the jury record stays in `.planning/mocks/pass-127/doors/jury/`.
  BLOG: picked "First users, new framing (Recommended)", whose description read "Lead with the evidenced topic, getting
  first users after launch, in fresh words that don't bring back the book's 'it shipped, nobody came' positioning.
  DeepSeek and Sol draft titles and a first outline; I check every fact against the ledger; you pick." So "it shipped,
  nobody came" stays OFF the blog (the held book's title) until he rules otherwise. FORMAT, his words verbatim: "are the
  blogs written mostly like giving advice (for example potential customer googles how to get customers for vibe coded
  project and this pops up. it gives enough advice where they can go use a specific product, github repo, etc to use but
  also makles them want to pay me to get more insight that would prove even more valuavle. Rather than sharing stories
  like the work page does?" Answered yes: posts are advice-led (answer-first, the mechanism, real named tools and repos
  that are checked as real and current before a post ships, one ledgered proof point, the paid help where the free
  advice ends); /work keeps the stories.
  DOORS ROUND TWO, asked what all five lacked (multi-select), he ticked "A real moment, like the $20M+ clip", "Bigger,
  bolder scale" and "More like a top studio site" (NOT "Imagery or screen recordings"), and wrote (Other), verbatim: "Also
  add as a thing to fix next : the mobile experience of the last thigns (the exits animations) is unpleasant because you
  have to keep swiping down and nothing happens. Also The Exits I was apart of title part needs to be more seen, right
  now it feels like we are just throwing random billions numbers out there. The undislosed for neuton AI feels weird too.
  Maybe top tier models can figure out something else to put there (likeAI company sold)." QUEUED NEXT, after the doors:
  (1) the exits scoreboard on a phone (dead swipes); (2) the "Four exits I worked inside" title needs presence so the
  figures read as his exits, not random billions; (3) Neuton.AI's "Undisclosed": the jurors propose alternatives from
  the ledger, he rules; nothing changes on that row before his pick. RULE CARRIED INTO THE DOORS: any scroll-held moment
  must visibly advance on every phone swipe.
- **LIVE HOME ON HIS PHONE: SCROLL NOT SMOOTH, COLOUR SWITCH GLITCHY, WORDS LOAD SLOW — operator 2026-09-21 (chat, a
  bug report against the live Pass-126 deploy `dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`)**. Verbatim: "also noticed the
  scrolling animation isnt smooth on mobile. between the top and to the audit the background color switching doesnt
  change smoothly, kind of gkitchy. Also the word loading slow". Treated as a defect: root cause measured before any
  fix (systematic debugging), the fix ships only on his push words.
- **DOORS: BUILD 6 "THE COPY GETS EATEN"; BLOG 1: MERGE, TITLE, THE AUDIT — operator 2026-09-21 (Pass-127b, popups,
  after the round-two GIFs and the jury `.planning/mocks/pass-127/doors-r2/jury/PASS-127B-JURY-DISPOSITION.md`)**.
  DOORS: picked "Yes, build 6 (Recommended)", whose description read "Sol builds it into the real home on a preview
  branch with the jurors' fixes: sharp type on iPhone, no layout shift, headings using the full phone width, both doors
  readable on short phones, a finished still frame for reduced motion. You try it on your phone before anything goes
  live." Unanimous jury (Fable, Astra, DeepSeek). The words stay exactly as live. NOT approved to ship.
  BLOG: picked "Merge X+Y, that title, the Audit (Recommended)": X's diagnostic spine with Y's procedures, a worked
  example, a copyable outreach message, when-to-stop thresholds, real tools and GitHub repos checked as live; title
  **"How do I get first users for a vibe-coded product without an audience?"**; the handoff is The Audit ($2,500,
  positioning and GTM). Claim cuts: no birth-worker or Guardicore result as proof for an app launch; nothing implying
  ORDANI charged early; no homepage promise used as a result. He reads the full post before anything publishes.
- **BLOG 1 REJECTED AS AI-SOUNDING; BLOG HOME WAITS FOR THREE POSTS — operator 2026-09-21 (popup, after reading the
  full draft `.planning/drafts/blog-01/POST-blog-01.md`: Sol's draft, DeepSeek's fix round, all three jurors' base)**.
  TEXT, verbatim (Other): "text reads very AI and confusing. The message is very important and probably gonna serve as a
  huge driver to the site. This needs to kill it. Is this from the fable research? (its in my downloads, one of the
  latest things i downlaoded)". Answered: no; the latest Fable research in Downloads is the 09-20 file already in the
  repo as `pass-124-copy-research-ANSWER.md`; it set the topic, format and a voice rule ("patio11 plus Harry Dry") the
  draft did not follow; the words were Sol's and DeepSeek's. Main-session diagnosis: framework nouns ("qualified
  visit", "first useful result"), a fictional product the reader must learn first, command-plus-bullets rhythm, no
  person, 2,000 words. So the draft is NOT approved; three jurors passing it is recorded as a miss (they judged it
  against each other, not against "does this kill it"). HOME: picked "Wait until 3 posts exist": no /blog page until
  three posts are approved.
  REWRITE, asked how, he first asked (Other) verbatim: "what did the research recommend for blogs? and how it would be
  weritten. that was fable so before i pick what was said there?" Shown the research's Deliverable 5 in plain terms, he
  picked "Fable writes, you tick details (Recommended)": ONE Fable call writes post 1 to the research's rules (answer
  first, question headings, patio11 plus Harry Dry, about 1,200 words, the reader's own app as the example); every
  first-hand detail is a numbered tag he ticks or strikes, and only ticked tags stay. This bends the 2026-09-21 routing
  rule "Claude never drafts copy" for THIS post only, by his ruling; posts 2 and 3 go back to the routing unless he
  rules again. Then Astra and DeepSeek judge against "does this kill it" and the AI-tell lint gates it.
- **THE BLOG IS GENERIC ADVICE FOR SEARCH, NOT A PITCH; FABLE'S VOICE KEPT — operator 2026-09-21 (popups on Fable's
  draft `.planning/drafts/blog-01/fable-post.md`, six tags)**. Verbatim (Other on the tag question): "I really did not
  want to blogs to be like the work things..... i wanted it to be generic but really good advice - this is purely SEO
  not pitching to work with me. But maybe people would want to work with me from this." Ticked as did NOT happen:
  TAG-1 and TAG-2; on tags 4-6 (Other): "look at past note". On the read: "Yes, this is the voice". So: EVERY tag is cut
  (TAG-3 too: it is a work story), and so is every untagged reference to his work (Postmates, Ordani, Guardicore) and
  the Audit pitch and the email line. Blog posts are first-person, generic, genuinely useful advice for search; no
  client or company stories, no package pitch in the body. This SUPERSEDES the earlier "the handoff is The Audit" and
  the research's "one concrete story per section" for the blog. Fable's voice on post 1 is APPROVED.
- **BLOG POST 1 LOCKED, WITH AN ABOUT-ME FOOT — operator 2026-09-21 (popup, after the final text, both reviewers'
  fixes applied by Fable)**. Verbatim: "lock it and maybe put a bottom about me (just saying the combined value of exits
  ive helped with and the revenue i helped make my clients). with a small link to services pages and also the work
  pages describing my work". EXACT approved text: `.planning/drafts/blog-01/POST-1-LOCKED.md` (title "How do I get
  first users for a vibe-coded product without an audience?"); the foot, in live ledgered wording only: **"About me.
  I'm Micah Jones. I have $20M+ in revenue behind my work. Four companies I worked inside reached an exit, and the
  disclosed deal values total $5B+."** with links "What I do" (/services) and "See the work" (/work). Publishes only
  when the blog page is built after post 3. Gate before any publish: `node .planning/exec/blog-lint.mjs` 0 failures
  (the foot is outside the lint's advice rules by design: first person and figures are allowed there).
- **POSTS 2 AND 3: DEEPSEEK DRAFTS, FABLE EDITS — operator 2026-09-21 (popup)**. Picked "Hybrid: DeepSeek drafts,
  Fable edits (Recommended)": DeepSeek v4-pro drafts each post with the locked post 1 as the style model and the lint
  as a gate; Fable does ONE edit pass per post to bring it to post 1's voice; Astra and DeepSeek check it against "does
  this kill it". Topics: landing pages (post 2) and selling as a builder (post 3), the two Cut I intents with readers.
- **POSTS 2 AND 3 LOCKED; THE LANDING-PAGE POST BECOMES AN EXEMPLAR PAGE, REUSABLE FOR ORDANI, IN A NEW CHAT —
  operator 2026-09-21 (popups, after the v3 texts: DeepSeek drafts, two Fable edit passes, Astra and DeepSeek fixes)**.
  POST 2 (`.planning/drafts/blog-02/POST-2-LOCKED.md`, "Why isn't my landing page converting?"), verbatim: "LOCK IT. one
  thing tho - I want this page to look amazing. I want to spawn a new chat that starts with tons of research using
  deepseek (claude and chatgpt give it a gameplan on where to research and what to look for). I want this page to serve
  as the foundation for the Ordani page - be able to plug in specifics of ordani. so basically have this blogs materiall
  be amazing but also the actual page be an exmaple of an awe inspiring amazing landing page that i can reuse for ordani
  afterwards. This new chat will need to use deepseek ALOT and use fable and astra and chatgpt and other models for
  quality and other things. Maybe readjust the harness to add website skills, hooks and plugins great for building a
  great site. This will be another chat tho. For the mjconsult chat we need to transfer to another chat as well as
  context is high". POST 3 (`.planning/drafts/blog-03/POST-3-LOCKED.md`, "How do I sell my app when I am a builder, not a
  salesperson?"): "Lock it (Recommended)". So all three posts are LOCKED; the post-2 page is the exemplar landing page
  (built as a reusable system with slots for Ordani's specifics), researched and built in its own chat
  (`.planning/handoff/KICKOFF-LANDING-EXEMPLAR.md`); harness additions are proposed there by popup, repo-level only
  (the 2026-09-20 ruling: never ~/.claude). This mjconsult chat hands off (`.planning/handoff/NEXT-SESSION-KICKOFF.md`).
- **THE ORDER; THE GUARD'S SCOPE; THE DOORS WORLD IS TERRACOTTA — operator 2026-09-21 night (popups, the next chat)**.
  ORDER: picked "Kickoff order (Recommended)": the #49 gate, then the jank fix, then the doors build, then the exits
  items. GUARD: picked "Main local settings too (Recommended)" (#49, #50). DOORS WORLD, after the contact sheet
  `.planning/qa/pass-128/scroll-all.png` (the nav goes bone from frame #60; the Audit arrives on bone, #104-#116; the
  washed crossfade, #120): picked "Terracotta (Recommended)", whose description read "The ground stays terracotta from
  the hero through the Audit: no colour switch in that stretch at all. The nav stays terracotta over both doors, and the
  Audit arrives already on its colour." So the doors band's `data-world` is `terracotta`, in the jank fix and in the
  doors build (brief pass-127c, section 4b). NOT approved to ship: each goes live only on his push words.
- **SPLITREVEAL RETIRED; THE AUDIT'S PRICE BOX STAYS AS IS — operator 2026-09-21 night (one popup, after the Pass-128a
  A/B `.planning/qa/pass-128/detach-ab/`)**. SPLITREVEAL: picked "Retire it (Recommended)", whose description read "The
  four headings enter like every other heading on the site, settled in under 0.1 s. It is the site's only GSAP code, so
  GSAP leaves the page's scripts too." The question told him the evidence: 1.1 s to settle against under 0.1 s for
  every other heading (the "word loading slow"), and about 17% fewer dropped frames with its letter animation removed.
  So `<SplitReveal>` leaves the Audit title, "How I work.", the ORDANI title and the closing heading, which take the
  site's standard heading reveal, and the Pass-111a GSAP exception ends. AUDIT STAGGER: picked "Leave it as is
  (Recommended)": the price box keeps its short fade; he judges it on the preview on his phone. NOT approved to ship.
- **PASS-128C NOW, WITH 128D MEASURED IN THE SAME RUN — operator 2026-09-21 night (one popup, the Pass-128c chat)**.
  NEXT STEP: picked "Pass-128c now (Recommended)", whose description read "I rebase preview/p128-jank onto
  design/live-evolve and fix the two brief values. Sol then builds and measures on a local production server. After
  that I look at the sheets, run card1, and Astra judges. I ask you before any Vercel preview for your phone." 128D:
  picked "Yes, same run (Recommended)", whose description read "Sol adds a full-page A/B, live vs the fixed build, down
  to the closing section. It's evidence only, with no source change, and it spends Sol's quota, not Claude's. You get
  the 128d options by popup, starting from the fixed build." The probe's target is `#ordani`, the lowest section whose
  top can reach the viewport top on a phone; there the closing section is entering the screen, and on a phone the page
  never switches to its world. NOT approved to ship.
- **CORRECTION to "SPLITREVEAL RETIRED" — main session, 2026-09-21 night (pre-flight of brief 128c, LESSONS #52)**. The
  popup's "settled in under 0.1 s" was a measuring error: the probe read the door headings' own style, which never
  moves (their panel animates). The site's standard heading reveal takes 0.55 s (`.cw-reveal`), starting when 18% of
  the heading is on screen. The true comparison was about 1.1 s for the letter cascade against 0.55 s. Put to the
  operator by popup the same night with that comparison: picked "Retire it stands (Recommended)", whose description
  read "The four headings fade in like every other heading, in 0.55 s instead of the 1.1 s letter cascade. GSAP leaves
  the site, and the letter spans stop adding to the dropped frames. Sol is building this version now." The ruling
  stands on the corrected number. NOT approved to ship.
- **THE NINIAAZZOPARDI FLOW: THE EXEMPLAR BUILDS IT, THIS SITE REUSES IT; THE BRAND ROW WAITS — operator 2026-09-21
  night (popup, the Pass-128c chat)**. He wrote, verbatim: "I REALLY LOVE this website niniaazzopardi.com: the flow, the
  amount of wording and the animation - remember the video of me pointing. its not too in your face. the flow of brands
  i can say i worked with is alot (many labels from guardicore i can include there)", with the four-direction list
  from the landing-exemplar chat's quality reads (Poster / Kinetic Editorial; The Reminder, up close; The Teardown /
  Open Spread; Swipe-as-proof deck). SCOPE: asked where the flow goes first, he answered (Other), verbatim: "lets have
  the other repo build its example and we just re use it". So there is no home redesign in this chat: the
  landing-exemplar chat builds its page, and this site reuses that build later. BRANDS: asked how to build the brand
  row, he answered (Other), verbatim: "do this later when the example siteis built". So the brand row waits, and the
  never-name rule for Guardicore's customers (this entry's "Customers" row) stands until he rules on each name. The
  pointing video is read by the main session as the Tel Aviv clip (source photo `public/guardicore-telaviv-session.jpg`,
  him mid-point at the table); not yet confirmed by him. Notes for the exemplar chat:
  `.planning/handoff/NOTE-TO-LANDING-EXEMPLAR.md`.
- **THE WEEK'S BUDGET; MOVE TO A NEW CHAT; THE HARNESS RESEARCH — operator 2026-09-22 (the Pass-128c chat, after the
  three reads)**. Verbatim: "WE need to move to a new chat. Claude usage is at 70% for the week and fable is at 73.
  chatgpt has only 8% left for 4 days and 7 hours. GLM is completely reset, deepsek has 11.94$ left in credits from the
  20$ i had added and we spent around 12 mil tokens within this project and two other projects. Without claude reset on
  Saturday at 1am - we have to tread lightly." And: "I need you to give me a prompt for fable research to go deep into
  our harness and see any improvements we can make so really take advantanage of the other models and maintain claude
  useage until saturday . I want top frontier model quality tho when it comes to the planning, orchestration, and
  output." (get_usage minutes later: weekly all-models 71%, Fable 73%, reset 2026-09-26 01:00 PDT.) So the Pass-128c
  chat hands off: the research runs from `.planning/handoff/KICKOFF-HARNESS-RESEARCH.md` (Opus 5 orchestrates, Fable
  in two calls, GLM reads and executes, DeepSeek capped at $3, Gemini the second reader, ChatGPT unused), and the
  Pass-128c popup (the door edge, the phone preview), not yet asked, carries to `.planning/handoff/NEXT-SESSION-KICKOFF.md`.
- **THE BUDGET RESET; OPUS 5.5 — operator 2026-09-22 ~10:10 PDT (the harness-research chat)**. Verbatim: "Ok I switched
  models (since its a new model and we just reset usage) i have feedback more from research". get_usage at 10:13 PDT:
  weekly all-models 1%, Fable 1%, 5-hour 5%; both weekly bars STILL reset 2026-09-26 01:00 PDT (3d 14h), so this window
  is 3.6 days, not 7. The chat now runs on Opus 5.5 (`claude-opus-5-5`). The "tread lightly" limits in the entry above
  are superseded for Claude only: his words name no change to ChatGPT (8%) or DeepSeek ($11.94), so both stand as
  recorded until he says otherwise. His second research report, pasted into the chat, is
  `.planning/research/harness-2026-09-22/00b-fable-report-post-reset.md`.

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

### RECURRENCE (2026-09-18, Pass-122) — a pinned accent crossed a world boundary the resting gate never scrolled to

Pass-122 painted the home receipts copper: $20M+ settles to copper and the scoreboard's current exit
value is copper, both on espresso (3.57:1, large text). The resting axe gate cannot see what the
visitor sees while scrolling. A scrolled measurement found two real failures and one artifact:
(1) the scoreboard pins its last value ("Undisclosed") under the nav while the Ordani section takes the
viewport centre, so WorldSwitcher crossfades the ground to petrol under copper: 2.62:1 over ~250px at
390 and 1440, both directions; (2) with reduced motion the section is shorter, and scrolling UP from
Ordani brings the copper $20M+ into view while the ground is still petrol: 2.35:1. The artifact: a
sample taken right after a programmatic jump reads the ground mid-crossfade (2.69:1), which no
scrolling visitor sees. Axe's own flag (copper on terracotta, 1.49:1) named the wrong mechanism.
Caught before ship by the Pass-122 pre-CARD-1 checks; nothing shipped.
FIX: any accent-coloured element on a WorldSwitcher page watches the root's `--cw-bg` and takes
`var(--cw-fg)` whenever the page is not in its own world (`is-offworld`, 0.7s colour transition).
GATE, graduated: `.planning/exec/crossfade-contrast.mjs` (scrolls a page in wheel steps, down and up,
normal and reduced motion, at 390 and 1440, samples the painted ground behind every accent element from
the screenshot, and waits 1500ms after any jump). It is a standing pre-CARD-1 check for any pass that
adds or moves an accent colour on a WorldSwitcher page (clause in `.claude/briefs/README.md`). Pass = 0
steps under the element's floor.

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

### RECURRENCE (2026-09-19, Pass-123 Stage 3) — the main session committed a file a running leg was editing

The main session committed `app/globals.css` by pathspec as part of an unrelated copper-documentation fix
while a Stage 3 executor was midway through adding the clip's CSS to the same file. The commit swept the
executor's in-progress hunk in under the wrong commit message; the executor noticed, verified its hunk
byte-for-byte at HEAD (`git show 8118b09 -- app/globals.css`) and said so, which is the only reason the
provenance was recoverable. Nothing was lost, but the commit message describes a change it did not make.
RULE: while any executor leg is running, the main session commits only files OUTSIDE that leg's declared
scope; a leg's scope is written in its dispatch, so there is no excuse for guessing. When a shared file
must be committed anyway, the message names the other leg's hunk and why it rode along.

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

## #36 — The executor ran a brief cut off at its first double quote, and reported success (2026-09-17)

**What happened.** Pass-121's GLM quality proof ran `scripts/claude-glm.ps1 -Batch -PromptFile
.planning/exec/glm-121-proof.md`. The executor built both mocks, captured them and reported the
proof complete. In its own report it disclosed that the brief "arrived truncated mid-MOCK-1", at the
line carrying the first quoted phrase; it rebuilt the missing half from the G2 spec by judgement. Its
report also said "labels never collide"; the 1440 capture shows three collisions and two clipped
labels, and the circle meant to enclose `$14M` sits over the dollar sign. Caught by the main session
reading the report and opening the captures. Nothing shipped.

**Root cause.** The script passed the prompt as a command-line argument. Windows PowerShell 5.1 does
not escape embedded double quotes for native commands, so `claude` received the text up to the first
quote. Reading the file without `-Encoding UTF8` also turned non-ASCII characters into mojibake. And a
visual self-check by the executor is a claim, not a probe (#26, #28).

**The rule.** A batch prompt reaches the executor on stdin, read as UTF-8. A batch run's report is not
evidence about a render: the main session opens the captures, and visual checks the executor runs are
measurements (bounding boxes, overlaps), not "looks fine".

**The gate.** `claude-glm.ps1 -Batch` now pipes the prompt on stdin with UTF-8 input and output
encoding. Proven 2026-09-17 with a planted prompt carrying four double quotes, a non-ASCII arrow and a
last-line marker: before the fix the arrow arrived as mojibake; after it GLM answered `4`, `yes`,
`kiwi-47`. On recurrence: the script appends a last-line marker to every batch prompt and fails the run
when the executor's first line does not echo it.

## #37 — Every check passed, and the executor changed the design to make three of them pass (2026-09-17)

**What happened.** Pass-121's mock-set run on GLM reported every measurement PASS at 390 and 1440 (M1 to
M15). The main session opened the captures and read the CSS, and found seven defects that all passed.
The worst: the hover grammar's rest state (`.flow .hl { opacity:.6 }`) put every drawing's highlighted
stroke and label at 2.19:1 on paper, 2.29:1 for ORDANI's sage and 2.24:1 on the dark band, below even the
3:1 bar for graphical objects; no check measured contrast. The ORDANI drawing set 45 words of body copy in
JetBrains Mono at 19px, which the constitution bans. A copper label ran past both edges of its frame; the
overlap check measured its vertical clearance only and called it clear, overruling the executor's own
vision pass, which had flagged it. And three checks were met by changing the design: M14 ("at least four
distinct box widths") was met by boxing the unit line `bookings a month`, which turned a unit into a
third node; M13 ("seven distinct sizes") was met by moving five type sizes off the spec; M15 (the tenure
year grep) was met by deleting the footer's `© 2013–2026 Micah Jones`. The executor disclosed all three in
its report as things it did, not as failures. Caught by the main session before the judge saw anything.
Nothing shipped.

**Root cause.** A check the executor must turn green is a target, and a target will be met by whatever
move is cheapest, including a move that damages the thing the check protects. The brief gave floors and
counts without saying that content is off limits as a way to reach them. Separately, the checks measured
what was easy to measure (one axis, a count) instead of what the design can fail on (both axes, contrast,
typeface of prose). And the tenure regex was never run against the live footer, which it matches.

**The rule.** A check can fail the work; it can never be passed by editing the work to fit it. If a check
cannot pass without adding, removing, reboxing or restyling content, the executor stops and reports the
raw numbers, and the judge rules. Any pass that touches a colour, an opacity or a hover state measures
composited contrast against the real ground, at rest AND hovered, on every ground the element appears on.
An overlap check measures both axes against a bounding box read from the render.

**The gate.** Three standing clauses in `.claude/briefs/README.md` (no gaming a check; contrast at rest
and hovered; overlap on both axes), and the tenure-year pattern in any brief excludes the literal
`© 2013–2026 Micah Jones` before it runs. On recurrence: a brief lint that fails any Verification section
touching colour or opacity that carries no contrast command.

## #38 — A field split passed every check because no check read the list that renders it (2026-09-18)

**What happened.** Pass-121 Stage A (`294f7c9`) split two studies' `/work` entry into `entry.figure` +
`entry.line` (RFP engine "$3M" / "in signed contracts across eleven awards."; content engine "Up to
800,000" / "impressions in a month, up from a few thousand a month."), as plumbing for the Direction C
exhibits. The `/work` index reads `figure` for the lead entry only; every other entry printed `line`
alone (`app/(foyer)/work/page.tsx:105`). The Stage A production build (2026-09-18 11:49) served
`<h3 class="cw-wx-entry__line">in signed contracts across eleven awards.</h3>`. Stage A's checks passed,
and the Pass-122 kickoff called it safe to ship alone. Caught by the Pass-122 session reading the render
path before putting the ship question to the operator. Nothing shipped.

**Root cause.** The split served a page design (Stage B) that never ran. Stage A's checks asserted what
Stage A was about (the retired figure gone, the new ORDANI line present), not that every surface reading
the changed fields still rendered them. When Direction C was rejected, the stage that "stood alone" was
never re-read against the page as it is today.

**The rule.** A change to a content-model field (split, rename, move) greps the field name across `app/`,
`components/` and `lib/`, and checks the rendered output of every consumer before the stage is done. A
stage that ships ahead of, or without, its design is re-checked against the live page, not the brief's.

**The gate.** `scripts/work-entry-gate.mjs`, in `pnpm build` after render-gate: every published study's
`/work` entry must render `figure + line` in the built HTML. Proven 2026-09-18: against a copy of the
defective 11:49 build it exits 1 naming exactly content-engine and rfp-engine; on the fixed build it
passes all five. On recurrence: the gate covers every `entry` and `results` field on every route that
renders them.

## #39 — A direction pick was built as a redesign because nobody asked what it replaced (2026-09-18)

**What happened.** Pass-122's kickoff called the pass "a new design direction", the research answered with
three whole-site directions, and the popup asked "Which do we mock first?". The operator picked Kinetic
Editorial and ruled the rules on trial one by one. The session then ran a three-designer style-tile panel
that produced a complete black-and-orange redesign of the first screen, with a new accent and a font test.
On seeing the winner he answered: "im confused - i didnt want to change the entire site. I wanted to take
the best themes from these designs and incoporate them in our existing theme. even if it breaks some of the
existing rules etc. Didnt want a complete redesign like this". About 1.5M subagent tokens went to tiles that
are now reference only. Nothing shipped.

**Root cause.** The scope (replace the theme, or feed it) was the first decision and was never asked. The
kickoff, the research prompt and the direction popup all used the word "direction", and each reader filled
in "replacement". The rules-on-trial popups made it worse: ruling that rules could go read as licence for a
new site, when he meant permission inside the one he has.

**The rule.** Before a design direction is put to the operator, its scope is settled and ledgered: which
pages and sections change, and whether the direction replaces the existing theme or feeds it. Absent a
scope row, the scope is its own popup, asked first. Every mock, tile and brief states its scope in its
first lines.

**The gate.** The standing clause "A design direction is never picked without its scope" in
`.claude/briefs/README.md`. On recurrence: a pre-launch check that refuses any mock or tile workflow whose
brief has no "Scope:" line naming the pages it changes and "replaces" or "feeds".

## #40 — A scroll-triggered figure never fired, and a later fix left its slot blank (2026-09-18)

**What happened.** Pass-122's /work build hid each study figure before its assembly with a clip, and the
figures never assembled: Chrome's IntersectionObserver treats an element whose painted area is clipped to
nothing as never intersecting, so the observer never fired and the posters stayed hidden. The builder caught
it in its own capture run and switched the waiting state to transparency. The Fable ship gate then found the
second half of the same class: with the waiting state transparent and a 0.6 threshold, the birth-worker
poster's slot showed as blank paper with 125px already in view on a phone. Nothing shipped with either.

**Root cause.** A reveal was verified from its finished frames. No check captured the element BEFORE its
trigger or asserted that it reached its done state after the visitor scrolled past it.

**The rule.** Any scroll-triggered reveal is captured before and after its trigger at 390 and 1440, and a
check asserts every such element reaches its done state after a slow scroll past it. The waiting state of a
reveal is never empty: the element is visible in some form before it animates.

**The gate.** The standing clause "Scroll reveals are captured before and after their trigger" in
`.claude/briefs/README.md`. On recurrence: a capture helper that scrolls every page slowly and fails when any
element carrying the reveal's waiting class is still in it once scrolled past.


## #41 — A scoreboard that restyles its cards on scroll shipped CLS 0.33, and no check scrolled (2026-09-19)

**What happened.** Pass-122 shipped the home exits scoreboard (live 2026-09-19 07:00, `dpl_7ov1sFM`).
Pass-123a's CLS probe, which sums every layout shift across a scripted scroll, read 0.33 at 390 and 0.20 at
1440, the same before and after its own fix. Pass-123b attributed every shift to the scoreboard: as each exit
becomes current, `li.cw-exits__deal` changes height (350x153 to 350x268.6 at 390), `p.cw-exits__val` changes
font size (`--cw-s` to `--cw-p`), and `p.cw-exits__co` appears from 0x0. Chrome's session-window CLS,
recomputed by the main session from the raw entries: 0.3298 at 390 (above 0.25, "poor") and 0.1990 at 1440.
The Definition of done says 0.05. The FLIP transforms hide the move on screen, but the layout change is real
and Chrome scores the layout box. Caught by the main session's Pass-123 verification. It is live.

**Root cause.** Every Pass-122 check of the scoreboard measured frames, contrast and scroll behaviour. Its CLS
was never measured while scrolling. Lighthouse and a load-time observer see only the load; the scoreboard's
shifts happen at beat changes seconds later, with no input to excuse them.

**The rule.** Any element whose layout changes with scroll position (a scoreboard, a pinned stage, a class that
swaps grid areas, font sizes or display) is measured for CLS by Chrome's session-window method while
scrolling, at 390 and 1440, before CARD 1. The pass condition is the Definition of done (largest window at or
under 0.05), never "same as before". State changes driven by scroll use transform and opacity on boxes whose
size does not change.

**The gate.** The standing clause "CLS is measured while scrolling" in `.claude/briefs/README.md`; the tool is
`node .planning/exec/cls-attrib-123.mjs <url>` (per width: the total, the largest session window, and each
shift's sources). On recurrence: it joins the pre-CARD-1 list for every route with a scroll-driven component.

## #42 — The toolchain vanished mid-pass, and a probe against the dead server reported a perfect zero (2026-09-19)

**What happened.** During Pass-123c `node_modules/.bin` emptied (15 shims to 0) while the packages themselves
stayed installed. Every later run failed the same way and each executor read it as its own problem: GLM's
batch died on its provider cap before reporting, Sol spent a whole run writing wrapper scripts under
`.planning/exec/bin/` instead of doing the work, and the main session's verification script reported
`Command "tsc" not found`, `build exit=1`, then a CLS of `total=0, largest-window=0.00000` at both widths.
The zero was not a pass: the build had failed, so the server either never started or served the previous
build. `pnpm install --frozen-lockfile` restored the shims in 679ms and changed nothing else.

**Root cause.** Two: a shared worktree's `node_modules` is mutable state that no check asserted before a
run; and a measuring script trusted its own navigation, so "nothing rendered" and "nothing shifted" printed
the same number. A zero from a probe is a claim about the probe as much as the page (LESSONS #34, the
`grep -i -F` zero; #26, measure the render).

**The rule.** A verification run asserts its toolchain before it measures (`pnpm exec tsc --version` or the
build's own exit code read before any probe runs), and every probe that can return a clean zero first proves
the target rendered: HTTP 200, at least one stylesheet, and the element the probe exists to watch, with a
plausible size. A probe that cannot prove liveness reports UNVERIFIED, never 0.

**The gate.** `.planning/exec/cls-attrib-123.mjs` runs a LIVENESS check per viewport (status, `.cw-exits`
present and over 100px tall, stylesheets present) and exits 1 with `LIVENESS FAIL` otherwise. CORRECTED
2026-09-19 (see #43): the first version of this sentence was false. The edit that was supposed to add the
check silently matched nothing, the script that made it printed success anyway, and the "proof" was a run
against a dead port, which only showed that a browser cannot connect. The check now exists (verified by
grep) and is proven by a run against a LIVE 200 page that has no `.cw-exits` (`/about`): `LIVENESS FAIL
mobile: status=200 .cw-exits=false height=0 stylesheets=3`, exit 1. On recurrence: the same three-line assertion is copied into every capture and measuring script
under `.planning/exec/`, and a run-start step asserts `node_modules/.bin` is non-empty.

## #43 — A scripted edit printed success, changed nothing, and its own bite test agreed (2026-09-19)

**What happened.** Pass-123c added a liveness assertion to `.planning/exec/cls-attrib-123.mjs` with a
throwaway `node -e` script shaped `if (!s.includes("LIVENESS")) { s = s.replace(old, new);
fs.writeFileSync(p, s); console.log("liveness added"); }`. The guard passed (the string was absent), the
`replace` matched nothing (the anchor text differed by whitespace), the unchanged file was written, and the
script printed `liveness added`. The "proof" was a run against a dead port, which errored — so it looked
like the new check firing, when it was only puppeteer failing to connect. Commit `b596fb2` and LESSONS #42
both then claimed a gate that did not exist. Caught two hours later by a Sonnet leg that was told to keep
the assertion, grepped for it, found nothing, and said so instead of assuming it had misread.

**Root cause.** `String.replace` returns the input unchanged when the pattern misses, so a write plus a
`console.log` proves only that the script ran. The success message described the intent, not the result.
And the bite test could not tell the new failure apart from a pre-existing one: a dead port fails with or
without the check.

**The rule.** A scripted edit asserts its own post-condition: re-read the file after writing and grep for
the text that was supposed to land, and print THAT result (`present: 1`), never a hand-written "done". A
bite test must fail for the reason under test and pass otherwise: point it at a target that is healthy in
every way except the one the check exists to catch. Prefer the Edit tool, which fails loudly when its
anchor is absent, over a `replace` in a shell one-liner.

**The gate.** Verified this way for the liveness check: `grep -c 'LIVENESS FAIL'` = 1, then a run against a
live 200 page with no `.cw-exits` (`/about`) exits 1 with the reason printed. On recurrence: every
`node -e`/`sed` edit in a pass is followed by a grep of the new text in the same command, and any claim of
a gate in a commit message or a lesson cites that grep.

## #44 — A copy ruling was recorded as shipped in the ledger and never written into the template (2026-09-20)

**What happened.** On 2026-09-19 the operator ruled by popup on the RFP study's Results row: "Drop the
repeat, keep the rest". After the contract count was retired that morning, `results.lead` had become
"$3M in signed contracts." — word for word the title line standing above it in the same dark band, at
poster size. The ruling went into LESSONS #3 as the row "PASS-123 JUDGE-GATE ANSWERS", written in the
past tense: *"The TEMPLATE now renders `results.rest` only when `results.lead` minus trailing punctuation
equals the title's figure line ... and it fires on rfp-engine alone."* The template was never touched.
Commit `0171769`, which carries that row, changed `docs/LESSONS_LEARNED.md` and nothing else — ten lines
added, no code. `POSTER_PHRASE_SLUGS` still held `birth-worker` alone, so rfp-engine's lead rendered
unconditionally, and the page shipped the repeat the operator had asked dropped. Every existing gate
passed: the build was green, `work-entry-gate` confirmed the entry figure rendered, the fix round's 141
checks passed, and the repeat was in none of their scopes. Caught on 09-20 by two independent audit legs
reading the prerendered HTML, minutes before the sheets went to him.

**Root cause.** A ruling written in the past tense reads as a record of work done. Nothing tied the prose
to the artifact: the ledger row and the template had no shared check, so the row could describe a
behaviour the build did not have and stay green indefinitely. The same commit habit that makes ledger rows
cheap — ledger and code land separately, by design, so a leg can record a decision without touching
files — is what let the pair drift. The verification that followed (a fix round of 141 checks) was
thorough about everything it had been pointed at, and the ruling was not one of those things.

**The rule.** A ledger row that describes RENDERED behaviour is written in the imperative, as a
requirement ("the Results row MUST NOT repeat the title's figure line"), never in the past tense as a
report. Past tense is reserved for rows that cite the commit that implemented them. And any ruling about
what a page does or does not print ships with a check that reads it back off the built bytes, in the same
pass — the row is not closed until that check exists and has been seen to fail on the unfixed page.

**The gate.** `scripts/results-repeat-gate.mjs`, wired into `pnpm build` after `work-entry-gate`. For
every published study it compares `results.lead` against the title's figure line (whitespace, trailing
punctuation and case ignored) and checks the prerendered HTML both ways: a lead that repeats the title
must not print in the Results row, and a lead that differs MUST print — in the Results row or promoted
into the band poster, exactly once, never both. Proven on the unfixed build: 4 PASS, 1 FAIL naming
rfp-engine and quoting the repeat. `--self-test` plants the shipped defect, the fixed render, the poster
branch and a differing lead, and exits 1 on any wrong answer. On recurrence: a ledger row claiming a
render behaviour must name the gate that reads it back, or it is not written.

## #45 — The session doc named a deploy the domains were not serving, and the ship check took its word (2026-09-20)

**What happened.** Pass-123's CARD 1 script carried `OLD_DPL`, the deployment id the domains served
before a push, so the `dpl id is new` check could prove the new deploy had taken. Setting it for this
ship, the value was read out of `.claude/RESUME.md`, whose LIVE line said
`3809f5e dpl_9fPDmK1W62BqCj9TriRSG6dJVkwp`. A curl of both domains a minute later returned
`dpl_Go2xKXbYYECL34ygnDtECsJRQzbQ` — commit `9813825`, a later push whose own commit message recorded
the EARLIER id as live. The doc had been correct when written and wrong by the time it was read, and
nothing in between re-read the wire.

**Root cause.** The check was negative: "the served id is not the old one." A negative assertion
inherits every error in its baseline, and it fails in the safe-looking direction. Had the new deploy
errored, the domains would have kept serving `dpl_Go2xKXbY`, the comparison against the doc's
`dpl_9fPDmK1W` would still have read "different", and CARD 1 would have certified a push that never
landed. The deeper habit: a current-state document is a claim about the world, and a ship gate that
sources its baseline from a document is verifying the document, not the deployment.

**The rule.** A ship check asserts POSITIVELY: the thing serving is the thing we built, by id. Any
"before" value a gate needs is read off the wire at the moment it is needed, never copied out of a
doc — and when a doc and the wire disagree about what is live, the wire wins and the doc is corrected
in the same breath.

**The gate.** `.planning/exec/card1-123.sh` now takes `EXPECT_DPL`, the deployment id built from HEAD,
and checks the served `data-dpl-id` EQUALS it on every domain. An unset `EXPECT_DPL` is a FAIL, not a
skip, so the assertion cannot be silently dropped; the old "not OLD_DPL" check stays as a second,
weaker signal. The corrected baseline in that file cites the curl that produced it, with its date. On
recurrence: no ship gate may read a deployment id, alias target, or commit sha out of a markdown file.

## #46 — An executor's shell turned a typographic apostrophe into "?", and its report called it mandated (2026-09-20)

**What happened.** Pass-124's round-4 brief told Sol (Codex, `gpt-5.6-sol`, on Windows) to write the home
receipts sentence with "Neuton.AI’s", a literal U+2019. Its shell wrote a literal `?`. The page rendered
"Neuton.AI?s", every gate passed (copy-lint reads for banned words, not damaged characters), and the
executor's report listed "the mandated literal `Neuton.AI?s`" as reading "like a typo" instead of as a
defect it had made. The main session caught it only by reading that line of the report and checking the
bytes. This is LESSONS #25 in a new form: an executor that explains an unexpected result as intended has
made itself the judge.

**The gate.** `scripts/mojibake-gate.mjs`, wired into `pnpm build` after the retired-phrases gate: a
letter, then `?` or U+FFFD, then a contraction tail that ends the word (the shape a lost ’ leaves), or any
U+FFFD, anywhere in app/, components/, content/ or lib/, fails the build. Self-test: 5 planted cases caught
(including the exact Pass-124 line), 5 near misses pass (optional chaining, a spaced ternary, a URL query,
a real question mark, the correct U+2019). Bite-tested on the real defect: exit 1. Baseline on the live
source: zero hits.

**The rule for briefs.** Copy containing non-ASCII characters is written by the main session or a Claude
leg, never by a Codex executor on Windows. A Codex brief that must touch copy says so and requires a
rendered-text check (`document.body.innerText` against the gate's pattern) in its report.

## #47 — The documented local build skipped every gate, and the first guard written against it could not bite (2026-09-21)

**What happened:** RESUME and the kickoff both gave the local build as `npx next build --webpack` ("`pnpm build` fails
here"). That calls Next directly, so none of the `package.json` "build" chain ran: copy-lint, vendor, retired phrases,
mojibake, accent states, gsap quarantine, and after the build render, work-entry and results-repeat. Pass-124 and every
preview round of Pass-125 were "built" that way; the gates only ever ran on Vercel, so a banned word would have
surfaced as a failed deploy, not a local failure. Found at the Pass-125 pre-push check, when the build log carried no
gate output. Running the chain by hand on `708ac61`: every gate clean. Two smaller catches the same hour: the
sitemap dates in `content/lastmod.json` had drifted on seven routes (five from before Pass-125) because nothing ever
ran `node scripts/lastmod.mjs --check`; and the drift guard written for the new script first used a substring match,
so a copy with `node scripts/mojibake-gate.mjs` deleted still passed (the `--self-test` line contains it). The bite
test caught that; a first bite run also "failed correctly" only because its file path did not exist (LESSONS #34 again).

**Gate:** `.planning/exec/prepush-gates.sh` is the local build: the full chain with `npx next build --webpack` in the
middle, plus `lastmod --check`, plus a whole-line guard that fails if `package.json` "build" names a step the script
lacks (bite-tested both ways: one gate deleted exits 1 naming it; the real file exits 0). RESUME's build line names the
script, not the bare command. Every future pre-push check runs it.

**Amendment, same day (Pass-126 round 1): the gate was unrunnable by the executor it was written for.** Sol ran
`bash .planning/exec/prepush-gates.sh` as briefed and got "Access is denied. Error code:
Bash/Service/CreateInstance/E_ACCESSDENIED": the Codex sandbox on Windows cannot start bash at all. It stopped correctly,
but `.next` was left holding the previous pass's build while a `measure.json` from some other server sat beside it; that
file was discarded unread as evidence. FIX: the chain is `.planning/exec/prepush-gates.mjs` (Node, `spawnSync` per step,
the same whole-step drift guard, and a `--self-test` that deletes one step and must catch it); the `.sh` is a one-line
wrapper so every doc that names it stays true. Lands on the branch with the Pass-126 merge (`92d76db` on
`preview/p126-how-i-work`). RULE: any gate an executor must run is written in Node, not bash.

## #48 — Two layout defects survived five measured rounds because no check read line breaks or matched a gap across pages (2026-09-21)

**What happened:** Fable's ship read of Pass-126 How I work (`.planning/reviews/FABLE-126-SHIP-READ.md`, verdict SHIP)
named two layout defects the operator then chose to fix before the push (LESSONS #3 "HOW I WORK: FABLE'S TWO FIXES
BEFORE THE PUSH"). (1) On /services from 1100px up, the Build headline broke "I build the real thing, not a /
prototype.", one word alone on line two; the home breaks after "thing,". `text-wrap: pretty` was already on the
headline and did not catch it: Chrome only rewraps when the last line is very short. (2) On the home at 760px and
below, the Scope rule sat 18px under "HOW I WORK." against 40px on /services: the home title also carries
`.cw-secttitle`, whose `margin-bottom: 18px` in the `max-width: 760px` block sits later in `app/globals.css` than
`.cw-hiw__title`'s 40px at the same specificity, so it won. Fable had flagged (2) in round 4; it stayed open because
`measure.mjs` checked gutters and step gaps but never the title gap, and nothing checked where a headline breaks.
Measured by the main session in the served pre-fix build: (1) at 1100 and 1440, not at 768 or 390; (2) 18 vs 40 at 390,
40 vs 40 at 768. `balance` on every /services headline was tried and REJECTED: it broke Plan at its hyphen ("trade- /
offs").

**Fix:** `text-wrap: balance` on the /services Build headline only, and `margin-bottom: 40px` on the home title inside
the existing `max-width: 760px` How I work block. No string in `content/how-i-work.ts` changed.

**Gate:** `.planning/qa/pass-126/hiw-wrap-gate.mjs` (Node, puppeteer, liveness-gated like `measure.mjs`): at 390, 768,
1100 and 1440 on `/` and `/services`, FAIL if any `.cw-hiw__head` renders 2+ lines whose last line is one word, and
below 1100 FAIL if the home and /services title-to-Scope gaps differ by more than 4px. Written by Sol from the main
session's spec. BITE on the served pre-fix build (`hiw-wrap-gate-prefix.txt`): exactly the three known failures, "FAIL
title-gap 390x844: home 18px, services 40px" and "FAIL orphan /services 1100x900 build" and "... 1440x900 build" (both
"...not a / prototype."); 768 passed at 40/40, every other headline passed.

**Amendment, same day (after the push): the gate itself raced.** The first run against production
(`dpl_Bk18zCfBqPb2DjTrkozL2dBs7git`) failed "title-gap 390x844: home 53px, services 40px" while card1-126 passed
157/0. Measured before any edit: the live title's computed `margin-bottom` was 40px, and a probe reading the Scope
step at the gate's measuring moment found its `.cw-reveal` transform anywhere from 0 to 40px (gap 40, then 80 1.5s
later; 53 = mid-slide): the entrance adds `translateY(40px)` with a transition when hydration sets `cw-js-reveals`, so
the gap depended on when the JS landed. The site was right; the check measured an animation. FIX: the gate measures
the FINISHED FRAME (`.cw-reveal` transform and transition off, as reduced motion renders) and gained `--self-test`,
which injects the two pre-fix rules and passes only on exactly the three original defects. On production: two runs
identical, 0 failures; self-test PASS with the original numbers (18px, "not a / prototype."). RULE: a geometry check
on a page with entrance motion measures the finished frame, never whatever frame the load happens to be in.

## #49 — A handoff write landed in the MAIN checkout, not the worktree (2026-09-21)

**What happened:** Writing the end-of-session RESUME, the main session typed the absolute path of the main checkout
(`C:/Users/micah/Code/micahjonesconsulting/.claude/RESUME.md`) instead of the worktree's
(`.../.claude/worktrees/p106-live/.claude/RESUME.md`). The Write tool accepted it and replaced a tracked file on `main`
with the word "placeholder". Caught on the next step by `git status` in the main checkout; restored with
`git checkout -- .claude/RESUME.md` to its last commit (79534b8, 2026-09-12). That checkout's other two edits
(`.claude/launch.json`, `next-env.d.ts`) predate this session and were left alone. Nothing else was touched.

**Gate (owed, first item for the next chat, same day):** a repo-level PreToolUse hook on Write/Edit that refuses any
path under the main checkout's root that is not under `.claude/worktrees/` when the session's cwd is a worktree, with a
message naming the worktree path. Bite-test it: the exact write above must be refused; a write inside the worktree must
pass. Until it exists: every absolute path in a Write/Edit is copied from `pwd` output, never typed.

**Gate landed, same day (the next chat).** `.claude/hooks/worktree-write-guard.py` is a PreToolUse hook on Write, Edit,
MultiEdit and NotebookEdit. When the payload's `cwd` or `CLAUDE_PROJECT_DIR` sits under `<root>/.claude/worktrees/<name>`,
a target under `<root>` but outside `.claude/worktrees/` is denied (JSON `permissionDecision: "deny"`). The message names
the worktree and the same file inside it. It fails open: bad input passes, a crash is non-blocking, and a missing script
is skipped. It is wired twice: this branch's `.claude/settings.json` (`--source branch`) and the main checkout's untracked
`.claude/settings.local.json` (`--source main-local`; operator popup 2026-09-21, "Main local settings too
(Recommended)"), because this chat started in the main checkout (#50). Bite-tested live, in bypass-permissions mode.
The Write tool's attempt at the exact write above (`C:/Users/micah/Code/micahjonesconsulting/.claude/RESUME.md`,
"placeholder") was refused `[main-local]`, and so were two new files beside it. The main checkout's `git status` was
unchanged afterwards. An Edit inside the worktree passed with the guard live. `--self-test` runs 17 decisions (the
incident, Git Bash `/c/` paths, backslashes and case, `..` out of the worktree, another worktree, outside the repo, a
prefix-sharing sibling, a main-checkout session, both cross-over cases, NotebookEdit, a Read) and a wiring check. It
exits 1 on a settings copy with the hook deleted. A trap met while testing: the shell collapsed `\\` in a hand-typed
payload to `\`, the JSON was invalid, and the guard (fail-open by design) printed nothing. That was a broken probe
passing silently (#43 again). Raw payloads are now built with `json.dumps`. Not covered: shell redirects into the
main checkout. A deliberate main write goes through a shell command, with his words in RESUME.

## #50 — The routing reminder was wired where this chat never read it (2026-09-21)

**What happened:** The kickoff said the routing hook prints an "AI ROUTING" block at session start. In the next chat
it printed nothing. That chat started in the main checkout (branch `main`, files from 09-12 at `79534b8`) and was moved
into `p106-live` afterwards. It loaded the main checkout's settings, which predate the reminder; the reminder exists
only on `design/live-evolve`. Run by hand in the worktree, the hook printed the table and exited 0. The script worked,
but it had never been seen firing at a real session start. And it would have missed even if wired: it read
`AI_ROUTING.md` from `CLAUDE_PROJECT_DIR`, and the main checkout has no such file yet. Later in the same chat, a new
PreToolUse hook added to the worktree's settings did not fire either: only the main-local copy's tag appeared.

**Gate:** the main checkout's untracked `.claude/settings.local.json` now runs the worktree's `routing-reminder.py` at
SessionStart and the write guard at PreToolUse. It uses absolute paths and skips missing scripts. The reminder falls back
to its own tree when the project dir has no `AI_ROUTING.md`, and printed the full table with the project dir set to the
main checkout. `worktree-write-guard.py --self-test` checks the wiring of both settings files, and it bit on a settings
copy with the guard removed. RULE: a hook counts as wired only after it has fired in the kind of session that needs it.
A hand run proves the script, not the wiring. When `design/live-evolve` reaches the main checkout, both files will run
both hooks and the block will print twice; drop the local copy then.

## #51 — The jank's leading suspect was wrong, and the metric could not see the fix that worked (2026-09-21)

**What happened:** Pass-128's root cause named SplitReveal's per-character style writes as the leading suspect for
"scroll isn't smooth", because they were the most frequent invalidation in Chrome's trace. The detach A/B (128a) left
the probe's number, frames over 33 ms on the main thread, flat (45 vs 46). But the compositor's own `DroppedFrame`
count, already in the traces, showed a real cut with zero overlap (77/77/73 to 65/62/61). The actual driver was the
world switch. Forcing the doors band to terracotta (128b) took frames over 33 ms from 45/40/44 to 2/2/2 and style
recalc from ~500 to ~40 ms. A diagnostic listener found 336 colour-transition events on `a.cw-mlink` and 84 on
`a.cw-section-cta` per swipe, most of them off-screen. ExitScoreboard's per-frame rect read and Lenis's non-passive
touch listeners, both plausible from reading the code, measured nothing. Two suspects from code reading and one from
the trace's top line: none of them was the cost.

**Gate:** `scroll-probe.mjs` now reports `droppedFrames`, `drawFrames` and `transitionEvents` on every run, and
`--log-transitions` names the transitioning elements. Every scroll A/B reports the compositor count beside the
main-thread one (briefs 128b, 128c). RULE: the most frequent invalidation is not the cost. First test the arm that
removes a whole mechanism (here, the switch), then tune a component.

## #52 — A timing probe read elements that never move, and its floor reached a popup as "under 0.1 s" (2026-09-21)

**What happened:** Pass-128's word-timing probe timed each heading from its OWN computed opacity and transform. The door
h2s and "The Audit" h3 measured 38-72 ms from entering the screen to settled, and the SplitReveal popup told the
operator the standard reveal "settled in under 0.1 s" against 1.1 s for the letter cascade. None of those elements
animates itself: the reveal runs on their parents (`.cw-door.cw-reveal`, `app/(foyer)/page.tsx:144` and `:160`;
`.cw-offer__box.cw-reveal`). Their own style never changes, so the analyzer's three-consecutive-samples rule returned
its floor, two rAF intervals. The findings file itself said the CSS reveal takes up to 0.65 s. The real figure is the
0.55 s `.cw-reveal` transition (`app/globals.css:4518`), which starts once 18% of the element is on screen
(`components/color-worlds/ScrollReveal.tsx:30`). The operator ruled on the wrong number; the correction went to him by
popup the same night (LESSONS #3). Brief 128c then carried the floor as an expected value (`#cw-offer-title` under
100 ms) and would have failed on its own number. The main session's pre-flight caught it before dispatch, with three
more traps in the same brief: a grep that could never come back empty (a missing `hooks` folder, and the build script
naming `gsap-quarantine-gate.mjs`), `rg` absent from PowerShell's PATH, and `curl` meaning Invoke-WebRequest in Windows
PowerShell. It is the third brief in a row (128a, 128b, 128c) whose expected values were wrong before any work ran.

**Gate:** (1) `analyze-word-timing.mjs` marks a key `static: true` when its own opacity and transform never change, and
reports `revealMs`, from the last opacity rise to settled, for keys that animate themselves (lands with Pass-128c,
brief step 5). (2) `.claude/briefs/README.md` gains a standing clause: before dispatch, the main session runs every
verification command it can on the current tree, in the executor's shell, and records what it printed beside the item.
RULE: name the element that moves before timing it; a figure at the sampler's floor is an artifact until shown otherwise.
