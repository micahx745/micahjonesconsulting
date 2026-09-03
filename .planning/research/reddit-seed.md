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

THE WEDGE, and it is a good one: a person about to hire a VA has already decided
the work is repeatable, already priced it (a VA runs roughly $800-2,000/month),
and already accepts it must be delegated. That is a buyer who has done the
qualifying for you. The pitch is not "hire me instead of a VA" - it is "the task
you are about to hire for runs itself for a fixed price, once."

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

VA-lane search terms
  "hired a VA"          "my VA quit"           "training a VA"
  "looking for a VA"    "virtual assistant"    "VA to handle"
  "drowning in"         "spending hours on"    "same thing every"
  "copy paste between"  "manual process"       "can this be automated"
  "10 hours a week"     "$/hour"               "offshore"
  "data entry"          "inbox management"     "lead list"

THE TENSION, for the operator, not for the crawler: this site currently sells
from $5,000 a month on the strength of four exits and $80M in enterprise
pipeline. The VA-hiring market is mostly price-sensitive small business. Both can
be true markets and still not belong on the same page - the premium signal is
what makes the $5K lane credible, and a "cheaper than a VA" message sitting
beside it reads down, not up. If this becomes a lane it probably wants its own
surface and its own offer, not a section bolted onto /services. Decide that
BEFORE any copy gets written, not after.

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
