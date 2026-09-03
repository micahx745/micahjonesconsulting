# Reddit market-research seed — micahjonesconsulting

Derived from the LIVE site's own buyer language (2026-09-02), not from a generic
ICP guess. Two lanes, two almost non-overlapping populations.

  LANE A  Engagements, from $5K/mo   "For companies"
          Pain, verbatim from /services: "You built it. Enterprise teams still
          aren't buying. The gap is positioning, not features."
          Buyer: founder / CEO / head of GTM at a B2B software company that has
          a product and cannot get it through enterprise procurement.

  LANE B  Packages $500 / $2,500 / $7,500 + the $99-149 playbook
          "For solo builders and small teams"
          Pain, verbatim from /playbook: "It got to eighty percent. Then every
          change broke something that worked yesterday. The demo looked done.
          Production turned out to be a different machine entirely. It shipped.
          Nobody came."
          Buyer: a solo builder shipping with AI tooling who is stuck between
          demo and production.

Lane B is where the pain is loudest, most self-reported, and most scrapeable.
Lane A rarely posts its pain in public under its own name - those buyers show up
as questions about procurement, security review and pricing, not as confessions.
Weight the crawl accordingly.

VERIFY EVERY NAME BEFORE THE FIRST FULL RUN. THIS LIST IS UNVERIFIED.

I tried to verify it and could not, from two directions, on 2026-09-02:
  - unauthenticated GET of /r/{name}/about.json for all 25 names: every one
    returned HTTP 403 Blocked. That is Reddit refusing anonymous script traffic,
    NOT a statement about any subreddit. It proves nothing either way.
  - the in-app browser: reddit.com is blocked by policy in this environment.

So the confidence column below is my recollection, and recollection is not
evidence. Your scraper has OAuth and can settle it in one pass: resolve every
name through /r/{name}/about.json, keep subscribers + subreddit_type + over18,
and DROP the 404s and the privates before the first real crawl. Expect some of
the medium-confidence names to fail - subreddits get renamed, privated and
banned, and the small niche ones are the least stable.

Do not treat a list of community names from a language model as verified. That
is precisely the failure mode LESSONS #1 in this repo was written about: a
review that named pages, clients and case studies which did not exist, and would
have produced real work against imaginary targets.

## Lane B - solo builders stuck between demo and production   (PRIMARY)

| subreddit            | why it matches                                        | conf |
|----------------------|-------------------------------------------------------|------|
| r/SaaS               | highest volume of "built it, nobody came"             | high |
| r/indiehackers       | the exact buyer; launch + distribution failure posts   | high |
| r/SideProject        | pre-revenue builders, heavy "I shipped, now what"      | high |
| r/EntrepreneurRideAlong | long-form build journals, real failure detail       | high |
| r/microsaas          | small scope, fixed-price-shaped problems               | high |
| r/buildinpublic      | in-flight builds, stall points visible in real time    | high |
| r/webdev             | the production-vs-demo gap, technical framing          | high |
| r/nextjs             | his own stack; deploy + env + auth failures            | high |
| r/reactjs            | adjacent, same failure class                           | high |
| r/devops             | where "works locally" goes to die                      | high |
| r/ClaudeAI           | AI-assisted builders hitting the context wall          | high |
| r/ChatGPTCoding      | same population, different tool                        | high |
| r/cursor             | Cursor users; the 80% wall by another name             | med  |
| r/vibecoding         | names the exact phenomenon the book is about           | med  |
| r/LocalLLaMA         | adjacent, more infra than product                      | med  |
| r/startups           | broad; filter hard                                     | high |
| r/Entrepreneur       | very broad, low signal density, high volume            | high |

## Lane A - B2B software companies that cannot sell to enterprise

| subreddit            | why it matches                                        | conf |
|----------------------|-------------------------------------------------------|------|
| r/sales              | enterprise sellers describing deal-stage failure       | high |
| r/SaaS               | overlaps lane B; segment by post content, not sub      | high |
| r/startups           | fundraising + GTM, founder voice                       | high |
| r/ProductManagement  | positioning and roadmap-vs-market mismatch             | high |
| r/marketing          | broad; useful for positioning language                 | high |
| r/ycombinator        | early B2B founders, GTM questions                      | med  |
| r/venturecapital     | signal on what investors push portfolio cos to fix     | med  |
| r/cybersecurity      | the buyer SIDE of his Guardicore experience            | high |
| r/msp                | MSP/MSSP channel, adjacent to his partner work         | med  |
| r/ExperiencedDevs    | senior ICs describing why enterprise buys stall        | high |

## Lane C - people HIRING virtual assistants   (EXPLORATORY, not yet a lane)

Added 2026-09-02 on the operator's "i also want to target people hiring virtual
assistants - big market". Treat this as RESEARCH ONLY. The site currently says
nothing about VAs and no positioning decision has been made; this crawl is how
you would find out whether the market is real for him, not a commitment to serve
it. See the note at the foot of this section for the tension.

THE WEDGE, sharpened by a REAL PROSPECT (operator, 2026-09-02): "potential client
is currently paying 1500 a month for VA to produce AI slop for her and run her
business. realized there are probably alot of people hiring folks like this."

That is a much better wedge than the generic one, and it is worth stating
precisely, because the precision is the whole pitch:

  She is not paying $1,500/month for a virtual assistant.
  She is paying $1,500/month for AI OUTPUT WITH A HUMAN MIDDLEMAN IN FRONT OF IT.

The VA is running a chatbot and forwarding the result. She has already bought
AI-produced work. She is buying the eighty-percent-and-stop version, monthly,
at a markup, and the reason it reads as slop is the same reason a vibe-coded app
does not ship: the tool got it most of the way and nobody did the last part.

This matters for POSITIONING, and it reverses the earlier caution in this file.
"Cheaper than a VA" reads DOWN against four exits and $80M in enterprise
pipeline. "You are paying for AI output either way - pay for output that ships"
reads UP, and it is the same thesis as the manual, in a different vertical.
Do not write the cheap version.

WHAT THIS CHANGES ABOUT THE CRAWL: stop looking for people who want to hire a
VA. Look for people who ALREADY DID and are quietly unhappy with the output.
They have a budget, a vendor, and a disappointment. That is a warmer buyer than
anyone still shopping.

N OF ONE, AND SAY SO. This is one prospect, not a validated market. The crawl
exists to find out whether she is typical or unusual. Serving her well is worth
more than any amount of this research, and she is also the best instrument in
it: what exactly does the VA produce, what makes it slop, what would good have
looked like, and what would she have paid for that instead.

| subreddit            | why it matches                                        | conf |
|----------------------|-------------------------------------------------------|------|
| r/smallbusiness      | highest density of "drowning in admin" owners          | high |
| r/Entrepreneur       | overlaps lane B; segment by post content               | high |
| r/agency             | agencies staffing repeatable client work               | med  |
| r/ecommerce          | order ops, listings, support - heavily automatable     | high |
| r/FulfillmentByAmazon| listing and inventory busywork                         | high |
| r/realestate         | one of the largest VA-hiring verticals                 | high |
| r/RealEstateTechnology | the same buyer, already tool-curious                  | med  |
| r/virtualassistants  | the SUPPLY side; read it to learn the task vocabulary  | med  |
| r/hiring             | live job posts = a task spec someone will pay for      | high |
| r/forhire            | same, with budgets attached                            | high |
| r/Upwork             | what gets outsourced, and what it costs                | high |
| r/freelance          | supply side; useful for pricing anchors                | high |
| r/consulting         | adjacent buyer, higher budget                          | high |

READ THE JOB POSTS, NOT JUST THE COMPLAINTS. A VA job post in r/hiring or
r/forhire is a free, itemised specification of a task someone will pay money to
never do again, usually with a budget in it. That is the single richest artifact
in this entire crawl. Extract: the task list, the hours per week, the offered
rate, and the tools named.

VA-lane search terms - THE SHARP ONES FIRST
These target the real signal: already hired, already paying, output is AI slop.
  "my VA uses ChatGPT"      "VA sends me AI"        "sounds like AI"
  "AI generated garbage"    "generic content"       "it all sounds the same"
  "paying someone to use"   "could have done that myself"
  "quality dropped"         "VA quality"            "not worth what I pay"
  "$1500 a month"           "$1,500/mo"             "monthly retainer"

Already-hired-and-unhappy (warm: budget exists, vendor exists, trust is gone)
  "hired a VA and"          "my VA quit"            "fired my VA"
  "third VA"                "VA turnover"           "retraining"
  "agency I hired"          "outsourced my"         "offshore team"

Still-shopping (colder, but the job posts are itemised task specs with budgets)
  "looking for a VA"        "virtual assistant"     "VA to handle"
  "drowning in"             "spending hours on"     "same thing every week"
  "copy paste between"      "manual process"        "can this be automated"
  "10 hours a week"         "data entry"            "inbox management"

THE TENSION, for the operator, not for the crawler: it still wants its own
surface and its own offer rather than a section bolted onto /services, because
the buyer arrives from a different problem and converts on a different promise.
But the earlier worry that it dilutes the premium signal was based on the CHEAP
framing, and the real wedge is not cheap - it is the manual's own thesis applied
to business operations. Priced against $1,500 a month of recurring disappointment,
a fixed-price build is not a discount; it is the thing she thought she was buying.
Decide the surface and the offer BEFORE any copy gets written.

## Search terms - this is the part that matters

A subreddit list is a crawl boundary. These are the SIGNAL. Each is a paraphrase
of pain his own pages already claim to solve, which is what makes a hit worth
money rather than merely interesting.

LANE B - the 80% wall
  "stuck at 80"            "almost done for weeks"      "works locally"
  "works in dev"           "breaks in production"       "every change breaks"
  "AI wrote"               "vibe coded"                 "can't ship"
  "shipped and nobody"     "launched to crickets"       "no signups"
  "don't know what I don't know"                        "context window"
  "rewrote it three times" "scope creep"                "cursor keeps"

LANE B - compliance / production readiness (his Ordani wedge)
  "HIPAA"    "SOC 2"    "row level security"    "RLS"    "auth is broken"
  "PII"      "GDPR"     "pen test"              "security review"

LANE A - enterprise GTM stall
  "enterprise won't buy"     "stuck in procurement"    "security questionnaire"
  "vendor review"            "legal review"            "pilot never closed"
  "champion left"            "no budget line"          "RFP"
  "our positioning"          "we sound like everyone"  "crowded category"
  "POC to paid"              "deal stalled"            "6 month sales cycle"

## Scraping notes

- Use the official Reddit API with OAuth, not raw HTML. Public data, documented
  rate limits, and it will not get the IP blocked mid-run. Respect the per-app
  limit and back off on 429.
- Some subreddits ban commercial research or DM outreach in their rules. Read
  each sub's rules endpoint before posting anything; READING is fine, SELLING is
  what gets an account banned.
- Store the permalink and the UTC timestamp with every hit. A pain quote with no
  provenance is a claim you cannot use in copy later, and this repo's whole
  discipline is that a claim without a source does not ship.
- Score by SPECIFICITY, not upvotes. "Been stuck for three weeks on auth before
  launch" is worth more than a 2k-upvote thread about AI in general.
- Deduplicate by author. One person posting the same problem in five subs is one
  data point, not five.

## What to do with it

The output is a phrase bank, not a lead list. The highest-value result is the
buyer's OWN wording for a problem the site already sells against - that goes
into headlines and door copy, where it can be tested. Any figure that comes out
of this and reaches a public surface needs a LESSONS #3 entry with its date and
source first.
