# Persona review of micahjonesconsulting.com — standalone, no repo needed

You have NO access to this site's repository. Everything you need is in this
prompt. Do not claim to have read source files, commits or internal docs; you
have not. Work only from what the live site actually serves.

FIRST, PROVE YOU CAN FETCH. Retrieve https://www.micahjonesconsulting.com/ and
quote its <title> back before doing anything else. If you cannot fetch live
pages, STOP and say so. A persona review written from memory of this site is
worse than nothing: a prior external review of this exact site was roughly half
invented. It critiqued a portrait, a /work/akamai case study, and /work-with-me
and /contact pages that DID NOT EXIST, because it blended a half-remembered
older version with the page in front of it. Acting on it would have produced
real edits against imaginary targets. The evidence rule below is what that
incident produced. It is not optional.

## THE EVIDENCE RULE

Every finding cites: the URL, the HTTP status, and the VERBATIM line as it
renders live. Fetch with `curl -s <url>` and decode UTF-8 explicitly. If you
cannot quote it from the live page, the finding does not exist - delete it.

Two traps specific to this site:
- In the RSC flight payload a string starting with "$" is escaped by doubling
  it. "$$500" in the payload is "$500" on the page. Not a defect.
- The same sentence often appears TWICE in the HTML: once in the visible DOM and
  once inside that payload. Never report something as "repeated on the page"
  without confirming the second instance is visible text.

## THE SURFACES (15 routes)

/ · /about · /services · /packages · /work · /playbook · /contact ·
/book/kickoff (noindex, post-purchase) · /services/thanks · /playbook/thanks ·
/work/guardicore · /work/ordani · /work/rfp-engine · /work/content-engine
(/book 308s to /contact. /work/passioneer is a stub and 404s by design.)

Read the site in the ORDER each persona would, entering where they would really
enter - a recruiter lands on /about from LinkedIn, a solo builder lands on
/playbook from a link, a founder lands on / from a referral. Do not read it
front to back like a document. Where someone enters changes what is missing.

## THE PERSONAS

Score each 1-10 on "would this person take the next step", and say what the next
step even IS for them. A persona who has no next step is the finding.

1. B2B FOUNDER / CEO, engagements buyer, from $5K a month.
   Has a product. Enterprise buyers are not closing. Reads to answer: has he
   done this specific thing before, for someone like me, and what happens in
   week one. Skeptical of consultants. Will click a receipt to check it.

2. SOLO BUILDER, packages ($500 / $2,500 / $7,500) and the $99-149 playbook.
   Got to 80% with AI tooling and cannot ship. Reads to answer: does he know
   MY failure, is this worth money, and what do I get this week. Price-sensitive
   and allergic to being sold to.

3. TECHNICAL RECRUITER screening for a salaried role.
   Skims for title, seniority, stack, location, availability. Thirty seconds.
   Reads to answer: what is he, what level, and is he even open to a role.
   NOTE THE TENSION AND DO NOT RESOLVE IT: the site sells consulting from $5K
   a month and says nothing about employment. Surface what a recruiter concludes
   from that, what they cannot find, and what it would COST the consulting
   positioning to serve them. Frame it as a decision for the operator, with the
   trade-off named on both sides. Do not add a "hire me" section on your own.

4. HIRING MANAGER / VP evaluating him for a senior role. Deeper than the
   recruiter: wants evidence of judgment and scope, not keywords. Reads the case
   studies properly. Asks "what did HE do versus his team".

5. PROCUREMENT / SECURITY REVIEWER, the person who checks claims.
   Adversarial. Tries to falsify every number. Reads /work/ordani for what it
   says about handling health data. Finds anything unsupported, internally
   inconsistent, or impossible to verify from outside.

6. PEER OPERATOR who might refer him. Reads to answer: would recommending him
   make ME look good, and can I describe what he does in one sentence.

## ALREADY DECIDED - reporting these is a false positive

- the rotating H1 on the home page stays; "See the work" stays the primary hero
  CTA; the four-exits framing stays; "joined early" stays
- the Ordani narrative and the operating-principles block stay as written
- the "Trillions in financial assets" line on Guardicore is APPROVED
- /work/ordani's "small team" sentence stays
- booking is post-purchase ON PURPOSE: /book is retired, all CTAs go to
  /contact, and /book/kickoff is for buyers only. Not a bug.
- do NOT propose: /now, /uses, a logo wall, a "trusted by" bar, a newsletter
  signup, stock photography, illustration, a second accent colour, a second
  animation, or a dark-mode toggle
- Guardicore's real job title ("enterprise sales manager") is allowed on the
  home ledger and the case study; the "no job title" rule is /playbook ONLY
- the small "Micah Jones / Oakland, CA" metadata lines were REMOVED on purpose
  on 2026-09-02. Do not propose bringing them back.

## GROUND TRUTH

GROUND TRUTH. Every number on this site is owner-confirmed and dated. You cannot
read the ledger, so it is reproduced here. Treat it as the only authority:

- Guardicore: $80M pipeline generated, $14M revenue, $1.2M average enterprise
  deal. Real title: enterprise sales manager. Acquired by Akamai 2021. Product
  built in Tel Aviv; buyers were North American. The line "Trillions in
  financial assets sit protected behind those deployments" is APPROVED.
- SurveyMonkey: enterprise sales, $1M+ toward the 2018 IPO.
- Postmates: product analyst, 2020. Acquired by Uber, $2.65B.
- Neuton.AI: helped launch; acquired by Nordic Semiconductor 2025. He holds NO
  equity claim there.
- FOUR exits, "$5B+ combined" - true ONLY across all four, disclosed deals only.
- Consulting: $20M+ in client revenue SINCE 2013, open-ended. Never re-close it.
- Content engine: reach 8,000 to 290,000 in five months, a 36x lift, seven
  platforms.
- RFP engine: $3M in contracts won; close rate doubled.
- Ordani: HIPAA-compliant (never "HIPAA-grade"), active paying users, IN BETA
  with a public release coming, none lost to a competitor, intake completion 40%
  to a measured 91%. NEVER a user count, NEVER how its security works, NEVER a
  vendor name. He founded it and writes the code; a small team of birth workers
  and healthcare/security people shaped it.

Prices: engagements from $5,000/month; packages $500 / $2,500 / $7,500; the
manual "The 80% Wall" is $99 at launch and $149 after, not yet on sale. NEVER propose copy that invents a
number, a client name, a job title, a date, a price, or a user count. If your
proposed rewrite needs a fact the ledger does not carry, say so and mark it
"needs operator input" instead of inventing it.

Voice, non-negotiable: first person (I/me/my), never "we" - he is solo. Average
sentence 25 words or under. Named numbers, never vague impact language. AT MOST
ONE em-dash per page, and the nav already spends it, so body prose gets zero.

## OUTPUT

A single markdown document, returned in your reply. No file paths.

Per persona: the entry point, the read order, the score with its reason, the
moment they would leave, and the single change that would most move them.
Then one merged, deduplicated, ranked list across all six, ordered by what costs
a sale or a role. Mark every item that needs an operator ruling.

Rank honestly. If the tail is polish, say it is polish. A review that calls
everything critical gets ignored, and this site has already had four passes of
findings applied this week - the easy defects are gone. Where a page is genuinely
good, say so and say why, because that is what tells him what to protect.
