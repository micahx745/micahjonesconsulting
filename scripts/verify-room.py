"""Verify the LIVE "Room and Ledger" home against WINNING-BRIEF-2026-09-05.md SS14-SS17.

    pnpm build && pnpm start          # or pnpm dev
    python scripts/verify-room.py [http://localhost:3000/]

Pass-101 phase 2. This is the port of .planning/design/winning/verify.py, which measured
the single-file mock through file://. Every check, every measurement and every tolerance is
that file's; what changed is the target (a Next.js route served over HTTP) and the six
places the site differs from the mock, each marked PASS-101 where it happens:

  * the `js` class is on `.rl-home`, not on <html>: the mock's script owned the document,
    the site's RoomMotion owns one wrapper (app/(home)/layout.tsx).
  * the sheet is `.rl-sheet`.
  * the receipts index is THREE rows, not two -- SS17, "Binds v7 and Pass 101".
  * each clip ships TWO sources (webm then mp4). The mock shipped one 720 mp4 because data
    URIs made it too heavy; on the site they are files (pass brief SS1).
  * the page-weight ceiling is replaced by the rule it existed to enforce: no media travels
    as a data URI. That is SS7's rejected list, and on the site it is measurable directly.

Every check is measured in Chromium against the running server. Nothing is asserted from the source
text alone except the copy gate, which reads the built HTML and the three verified copy
sources (freight template, content/work/*.mdx frontmatter, app/(room)/packages/page.tsx)
plus the ONE operator-supplied string SS15.6 names.

Checks, in SS14/SS15 order (SS15 supersedes SS14 on the rail, the cards, the engagements
strip, the manual, the objections and the index; SS14 binds everywhere SS15 is silent):
  01 stage-map        the hero stage is 16:9 at >=900, the film fills it, 1:1 source mapping
  16.2 fingertip      the tip is <=60px from the "g" glyph box AND the "g" is LEFT of the
                      tip (SS16.2 moves the words up one row: the COPPER row's cap-top is
                      the 4px stop under the tip and "I build the" is the row above it)
  16.2 arrival        the fingertip's arrival frame, re-measured IN the browser off the
                      built page's own clip at 0.1s steps, against the script's constant
  16.2 lighting       bone row >=4.5:1 at three frames; the copper row's ground, from the
                      cap-top SS16.2 pins, flat espresso; the veil's own alpha profile
  16.3 motion         one probe per item: initial vs settled computed values, <=3
                      @keyframes, everything off under reduced motion, and the no-JS
                      render finished at opacity 1
  02b copper-row      'go-to-market.' ends >=32px inside the stage at 1280/1440/1920
  03 hero-veil        composited contrast behind both headline rows at frames 0/48/96
  04 hero-mobile      390 and 360: crop 0% 50%, the headline OVERLAID at the fingertip, both
                      rows single-rect with >=12px of stage right of them, the face in frame,
                      and the sentence, chips and proof row under the stage
  05 operator         square stage, heading over the lower third, contrast at 3 loop frames
  05b op-heading      the heading is exactly --d2 at "wdth" 106 and single-rect in the square
  05c op-veil         the veil reads .6 at 62% and solid at 82%
  05d op-rows         the right column's register rows take their own height
  06 op-columns       first paragraph on the film under the heading; right column top-aligned
  07 no-years         zero 19xx/20xx anywhere in the rendered text
  08 no-figures       zero digit-bearing tokens outside the explicit allow-list
  09 copy-gate        every text node is verbatim in a verified source, or one of the two
                      SS14.3 rewrites, or one of the two SS14.7 shape changes, or the ONE
                      SS15.6 operator-supplied string
  10 two-rewrites     the gate enumerates exactly the two SS14.3 rewrites, and both are used
  11 heads            section heads at --d2; index names 28; FAQ 24/17 (SS15.3); captions 19
  11b faq-stop        the FAQ head ends in a full stop
  11c captions-caps   every index caption opens on a capital
  11d middot          the middot is never the last thing on a line, at 1440 or 390
  15.1 gesture        preload="auto" on both clips, and after ONE synthetic wheel event the
                      hero plays and the operator clip plays once it is >= 35% visible
  15.3 objections     two rows in the seam lane at 1440; stacked on hairlines at 390
                      (Pass 104a removes the refund question)
  15.4 work-ledger    zero .panel, zero <svg>, zero <img>/<video>, zero position:sticky in
                      the section; three rows, ordinal + name at --d2 + sentence right half
  15.5 cards          1px ink-15% border, 8px radius, 28px padding, name 24px Hanken 500,
                      price 72px, full-width chip; the Audit a 2px copper TOP rule, no box
  15.5b engagements   one <a>, width == the cards row, 24px below, 16px radius, 2px copper
                      top rule, >=220px, espresso ground, --d2 left + 64px right + the chip;
                      every text run measured for contrast
  15.6 receipts       exactly two .prf rows (Guardicore, the RFP engine) and one row-shaped
                      "See the rest" link; the head unchanged
  15 hero-rows        both hero display rows unwrapped and inside the content width
  16 no-hscroll       390 and 360 have no horizontal scroll
  17 media            two <video>, correct attributes, ONE 720 source each, readyState >= 2
  18 discipline       zero @keyframes, no gsap, no mix-blend-mode, no banned faces
  19 proof-row        the hero proof row reads exactly "Four exits, $5B+ combined."
"""
import json, os, re, shutil, subprocess, sys, unicodedata
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass
from playwright.sync_api import sync_playwright

# PASS-101: the repo is wherever this script lives, so the verifier runs in a worktree.
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESIGN = os.path.join(REPO, ".planning", "design")
FREIGHT = os.path.join(DESIGN, "freight", "the-receipts.template.html")
WORK = os.path.join(REPO, "content", "work")
# SS14.7 names a THIRD verified copy source: the live /packages page, whose three BuyButton
# labels the card chips now read verbatim.
PACKAGES = os.path.join(REPO, "app", "(room)", "packages", "page.tsx")
# PASS-101: artifacts land in the repo, not a scratchpad, so a reviewer can open them.
OUT = os.path.join(REPO, ".planning", "qa", "pass-101", "verify")
os.makedirs(OUT, exist_ok=True)
BASE = "http://localhost:3000/"
# The trigger constant lives in the client component now, not in an inline <script>.
MOTION_TSX = os.path.join(REPO, "components", "room", "RoomMotion.tsx")
CLIP_A = os.path.join(REPO, "public", "video", "a2-hold-720.mp4")

# SS14.3, exhaustive. Nothing else may be composed.
REWRITES = [
    ("$14M in revenue", "millions in revenue"),
    ("$3M in contracts won", "millions in contracts won"),
]
# SS14.3: the four prices and the engagements floor survive; they are prices, not receipts.
# Operator ruling 2026-09-06, verbatim: "Just put somewhere the 5 billion of exits i have
# helped with." "$5B+" is the SINGLE named exception to the no-figures rule -- it is a
# receipt, not a price, and it is the only one. Nothing else in the rule changes.
ALLOWED_FIGURES = ["$500", "$2,500", "$7,500", "$99", "$5K", "$5B+"]
# tokens that carry a digit but are not a figure: the book's own title/argument, a product
# name, the rail's step ordinals, and one page citation.
ALLOWED_DIGIT_TOKENS = ["80%", "80-percent", "v0", "01", "02", "03", "page 6"]
# SS18: "The head carries the count." It is not a figure and not a receipt -- it is the
# number of non-stub case studies in content/work, read at render time through the same
# lib/case-studies.ts call /work makes, and zero-padded. Every two-digit count from 00 to
# 99 is cleared here because the number is DERIVED: a hard-coded literal is what the rule
# exists to catch, and this one cannot be hard-coded.
ALLOWED_DIGIT_TOKENS = ALLOWED_DIGIT_TOKENS + ["%02d" % i for i in range(100)]
BAR_LABELS = ["Micah Jones", "Record", "Packages from $500",
              "Get a reality check", "\u2192"]  # PASS-102 row 1
# SS15.6, verbatim: the receipts index is consolidated to two rows "and offer to see
# the rest". The words are the operator's own and are recorded here as the ONE
# operator-supplied string on the page. It reaches the DOM as two nodes (the words, and
# the shared arrow glyph the bar already exempts), so a node clears this rule when it is
# a substring of it.
OPERATOR_COPY = ["See the rest →"]
# PASS-101: the skip link is site chrome, not page copy -- it is the a11y affordance the
# layout has always carried, and it is exempt exactly as the bar's five labels are.
BAR_LABELS = BAR_LABELS + ["Skip to content"]
# SS18 gives the home the site's ONE foot, and with it four strings that are chrome in the
# same sense the bar's five labels are. `LinkedIn` is a live link label lifted verbatim off
# components/room/SiteFoot.tsx, which every other route already rendered; the email, the
# name and the book's own title and price line are the foot's identity block. Nothing here
# is composed -- what changed is which foot renders them.
BAR_LABELS = BAR_LABELS + ["LinkedIn", "micah@micahjonesconsulting.com"]

# Only the operator-ticked strings in .planning/copy/PASS-102-TICK-TABLE.md.
# Row 6 is the unticked alternative to row 5 and is deliberately absent.
PASS_102_COPY = [
    ("Get a reality check", "PASS-102 row 1"),
    ("Get a reality check.", "PASS-102 row 1"),
    ("I help you build it and sell it, on the same engagement, for the same fee.",
     "PASS-102 row 2"),
    ("I stay until the way you describe it sells without me.", "PASS-102 row 3"),
    ("I go through it top to bottom and tell you what’s broken, in writing.",
     "PASS-102 row 4"),
    ("Is this for me if I built it with AI coding tools?", "PASS-102 row 5"),
    ("Debrief + what to do next", "PASS-102 row 8"),
    ("A field manual for people building on their own", "PASS-102 row 9"),
    ("The 80% Wall: now ship the company", "PASS-102 row 10"),
    ("The 80% Wall: now ship the company — Micah Jones", "PASS-102 row 10"),
    ("Tell me what you need to build or sell.", "PASS-102 row 11"),
]

# Only operator-ticked replacements in .planning/copy/PASS-103-TICK-TABLE.md.
# The superseded PASS-102 row 7 entry above is removed. Home copy stays fixed.
PASS_103_COPY = [
    ("For people and small teams stuck after building most of a product with AI tools. Buy a package "
     "and I start within the week. No scoping call, proposal, or quote to wait for.",
     "PASS-103 row 1"),
    ("Ninety minutes together on your stuck build. I send you a written plan the same day.",
     "PASS-103 row 2"),
    ("Prompts to fix it",
     "PASS-103 row 3"),
    ("Choose Build (architecture and code), Production (security and deploy), or Traction "
     "(positioning and reaching buyers). I review it top to bottom and write the audit. Not sure "
     "which? Start here. The memo tells you what to fix first. The fee credits toward what you book "
     "next.",
     "PASS-103 row 4"),
    ("What to fix, in order",
     "PASS-103 row 5"),
    ("One week on one outcome: the repositioning, the production push, the AI feature. I ship it.",
     "PASS-103 row 6"),
    ("Every package fee credits toward the next package or an engagement started within 60 days. "
     "Full refund any time before the kickoff call. After it, you pay for the work done and "
     "nothing more.",
     "PASS-104a supersedes PASS-103 row 7"),
    ("Two-week fixed-scope audit (Build, Production, or Traction): written memo, what to fix in "
     "order, one-hour debrief.",
     "PASS-103 row 8"),
    ("For thirteen years, I’ve worked inside B2B software companies. I plan how to sell the product "
     "in the morning and ship it in the afternoon.",
     "PASS-103 row 9"),
    ("Four companies I worked inside reached an exit. Postmates (Uber, 2020). SurveyMonkey (IPO, "
     "2018). Guardicore (Akamai, 2021). Neuton.AI (technology acquired by Nordic Semiconductor, "
     "2025). I held equity in SurveyMonkey and Guardicore at exit. The disclosed deals total $5B+.",
     "PASS-103 row 10"),
    ("Positioning research that moves deal size. The Guardicore engagement began with a single "
     "rewritten sentence and ended in the Akamai acquisition. The average enterprise deal was $1.2M.",
     "PASS-103 row 11"),
    ("Software for marketing and contracts. For one industry author, a content engine grew monthly "
     "reach from 8,000 to 290,000 in five months. The RFP software I built for the same author "
     "doubled their close rate inside six months.",
     "PASS-103 row 12"),
    ("Products I build from start to finish. I founded Ordani, HIPAA-compliant practice management "
     "for birth workers, and I write the code. It has active paying users in beta. Public release "
     "coming.",
     "PASS-103 row 13"),
    ("I’m building Ordani. This country loses too many mothers and infants. The people working "
     "hardest to change that were buried in running their practices. I built a tool that gives them "
     "their hours back, so they can focus on mothers and babies.",
     "PASS-103 row 14"),
    ("I also take engagements with teams whose sales and product sides have stopped talking. I work "
     "on both sides until they do. I am taking new engagements now.",
     "PASS-103 row 15"),
    ("A HIPAA-compliant CRM for birth workers. I founded and built the company. Active paying users "
     "in beta, none lost to a competitor. Public release coming.",
     "PASS-103 row 17"),
    ("Birth workers (doulas, midwives, perinatal counselors) run their practices on group chats, "
     "paper intakes, and Google Docs. Those tools were never built for HIPAA compliance. "
     "Practitioners either break the law, pay $200 a month for software designed for dentists, or "
     "build a system that breaks the first time a client churns.",
     "PASS-103 row 18"),
    ("In the United States, non-Hispanic Black women die from maternal causes at 44.8 per 100,000 "
     "live births. That is 3.15 times the rate of non-Hispanic white women (14.2), per the CDC's "
     "Maternal Mortality Rates in the United States, 2024 release. Doulas and midwives, "
     "disproportionately Black women themselves, are one of the most evidence-supported "
     "interventions against that gap. Their client data is sensitive, high-stakes, and almost never "
     "properly protected. The market hasn't built for these workers because it doesn't see them. I "
     "built ORDANI to close that gap.",
     "PASS-103 row 19"),
    ("01. I talked to 22 birth workers before writing a line of code. Four weeks of unpaid "
     "conversations. I asked what they used, hated, would never give up, and would pay for. Three "
     "patterns emerged. Every practitioner had been hacked or feared they had been. Nobody wanted a "
     "\"platform\"; everybody wanted intake to stop eating their Sundays.",
     "PASS-103 row 20"),
    ("02. I designed intake as one progressive flow. Existing tools dump fifteen pages of medical "
     "forms on a pregnant person at 1 a.m. I built a single conversational flow that adapts to the "
     "practitioner's preferences and saves on every step. Intake completion went from a "
     "self-reported 40% in beta-zero to a measured 91% in beta-one.",
     "PASS-103 row 21"),
    ("03. I built it HIPAA-compliant with birth workers, healthcare and cyber security experts. "
     "Ordani has a small team around it: people who know the practices and people who know how to "
     "protect their data. This case study does not publish how the protections work.",
     "PASS-103 row 22"),
    ("One intake replaces fifteen pages of forms, and 91% of clients complete it. The practitioner "
     "sees the week's clients in a Tuesday-morning view instead of a spreadsheet and a group chat. "
     "Those screens hold real client data, so I describe them rather than show them.",
     "PASS-103 row 23"),
    ("Birth workers pay for it today, and none have left for a competitor. The HIPAA-compliant CRM I "
     "built for the doula market is in beta, with a public release coming.",
     "PASS-103 row 24"),
    ("$14M in revenue. I helped reposition a Tel Aviv security company for North American buyers "
     "through research and data science. The pitch moved from honeypots to visibility and east-west "
     "microsegmentation. Deployed behind a global systemically important bank, a federal research "
     "agency, and a white-shoe Wall Street law firm.",
     "PASS-103 row 25"),
    ("The pitch led with honeypots, a feature competitors also shipped. It missed why enterprise "
     "buyers signed six-figure deals.",
     "PASS-103 row 26"),
    ("03. Market research and data science. The repositioning was a team effort. I interviewed "
     "customers, researched the market, and analyzed why the honeypot message missed the reasons "
     "buyers signed. I brought the findings to leadership.",
     "PASS-103 row 27"),
    ("$3M in contracts won through software I built for an industry-authority author, government "
     "contracts among them. It weighs every new RFP against the author's own work. Each morning, "
     "they get a partial response already drafted. RFP-to-close rate doubled inside six months.",
     "PASS-103 row 28"),
    ("Every RFP response started from a blank page. A respected industry-authority author had the "
     "body of work and inbound interest, but the RFP pipeline did not match. Opportunities arrived "
     "through a single newsletter list and a few personal relationships. Volume was the bottleneck.",
     "PASS-103 row 29"),
    ("02. I put my judgment into the software. Earlier in my career I ran complex, "
     "multi-million-dollar RFPs in enterprise cybersecurity procurement. I know what a buyer's "
     "evaluation committee reads. I wrote that judgment into the software, so it applies to every "
     "submission, not only the ones I touch. The specifics stay with the client.",
     "PASS-103 row 30"),
    ("03. It closed government contracts. The author won government contracts worth millions through "
     "the platform. Total contracts closed through it: $3M. RFP-to-close rate doubled inside six "
     "months.",
     "PASS-103 row 31"),
    ("$3M in contracts won through the platform, government contracts among them. RFP-to-close rate: "
     "2× inside six months. Each morning, the author gets live opportunities with a partial response "
     "already drafted. My judgment applies to every submission, even when I am not in the room. The "
     "same engagement also produced the author's content engine, written up separately.",
     "PASS-103 row 32"),
    ("Monthly reach was flat at 8,000 across all platforms combined. A respected industry-authority "
     "author had the work, audience, and inbound interest, but no system for marketing. Content went "
     "out reactively: one post here, one talk there. Every video, blog post, newsletter, and digital "
     "event took manual work, money, and hours.",
     "PASS-103 row 33"),
    ("01. The strategy document. I wrote a 25-page algorithm strategy for TikTok, Instagram, "
     "YouTube, LinkedIn, X. Not \"post more.\" It set a weekly cadence, a content-pillar map, a "
     "measurement frame, and the exact experiments for the first 90 days. The author could hand it "
     "to a content lead to execute without supervision. It guided the next twelve months of "
     "distribution work.",
     "PASS-103 row 34"),
    ("02. The bet. The work went out on eight platforms: LinkedIn, YouTube, Facebook, Instagram, "
     "TikTok, X, Threads and Bluesky. I picked two to overinvest in and one to underinvest in. The "
     "two got a weekly cadence because high-value buyers already read there. The underinvested "
     "platform got a monthly cadence because it had little audience overlap with the buyer. I put "
     "production time into the platforms that moved deals.",
     "PASS-103 row 35"),
    ("03. The content engine. I built an AI content engine for the videos, blogs, newsletters, and "
     "digital events the strategy called for. It cut the author's cost and hours spent creating that "
     "content. The same engagement also produced an RFP system, which has its own case study.",
     "PASS-103 row 36"),
    ("Monthly reach grew from 8,000 to 290,000 in five months, a 36× lift. The two platforms I "
     "backed outperformed the one I did not, as planned. Videos, blogs, newsletters, and digital "
     "events cost the author less money and fewer hours than before the engine. Their content lead "
     "has a 25-page playbook to execute without supervision. I stayed on retainer for the platform "
     "and algorithm shifts that come next.",
     "PASS-103 row 37"),
    ("You kept running into the same thing. Fixed Tuesday, broken Friday. The tool forgot.",
     "PASS-103 row 38"),
    ("Nine line-drawn diagrams, all drawn for this book. No stock art.",
     "PASS-103 row 39"),
    ("Thirteen entries like this one in the manual. All true, all dated, all mine.",
     "PASS-103 row 40"),
    ("02 The spec is the moat When the build drifts p. 12",
     "PASS-103 row 41"),
    ("03 The architecture you didn't draw Auth, data, storage, and how they connect p. 19",
     "PASS-103 row 42"),
    ("04 Deploy day Environment variables, migrations, domains p. 25",
     "PASS-103 row 43"),
    ("07 Compliance, when it matters HIPAA, GDPR, SOC 2: when each matters p. 44",
     "PASS-103 row 44"),
    ("09 The distribution loop Users who bring more users p. 57",
     "PASS-103 row 45"),
    ("Get the whole first chapter. Leave your email and it arrives in about a minute.",
     "PASS-103 row 46"),
    ("One email with the PDF. A second on the day the manual ships. No sequence, no drip.",
     "PASS-103 row 47"),
    ("The gallery and ops SPEC files appear in no chapter. I included them so you have a spec to "
     "copy.",
     "PASS-103 row 49"),
    ("Leave your email for chapter one. I’ll tell you the day the full manual opens at the launch "
     "price.",
     "PASS-103 row 50"),
    ("You need to read code and run a terminal. The AI writes; I show you how to steer.",
     "PASS-103 row 51"),
    ("A tutorial shows one happy path. I show what breaks and how I shipped through it.",
     "PASS-103 row 52"),
    ("The tools change monthly. The problems stay. Every future edition is included and goes to the "
     "same email.",
     "PASS-103 row 53"),
    ("No deck and no pitch. The work starts with your problem. Bring notes if you have them. If not, "
     "I will ask.",
     "PASS-103 row 54"),
    ("A calendar invite by email. I send the video link before the call.",
     "PASS-103 row 55"),
    ("The calendar invite is in your inbox, with reminders. I’ll reply with a video link before the "
     "call.",
     "PASS-103 row 56"),
    ("Calls run Tuesday through Thursday. Pick one of those days.",
     "PASS-103 row 57"),
]

# Operator-ticked cells in PASS-103-REWORD-TICK-TABLE.md; row 7 only moves existing copy.
# PASS-104B section 6. The operator chose "Three rows: keep one, add both new" and
# approved this copy verbatim (2026-09-08). The brief says "the three new strings";
# two NEW ROWS carry a question AND an answer, so there are four, and all four are
# quoted here exactly as the brief prints them.
PASS_104B_COPY = [
    ("I built it with Claude Code and it works. Now I cannot change one thing without rewriting half of it.", "PASS-104B operator-approved 2026-09-08"),
    ("The tool does not change the work. I read the build top to bottom and write down what is load bearing, what is broken, and what to fix first. That is the Audit, $2,500.", "PASS-104B operator-approved 2026-09-08"),
    ("Last time I paid for help, it took so much back and forth that I did most of it myself.", "PASS-104B operator-approved 2026-09-08"),
    ("One person reads it, writes it and ships it, and that person is me. No account manager, no status meeting, no brief for you to write.", "PASS-104B operator-approved 2026-09-08"),
]

PASS_103_REWORD_COPY = [
    ("Each package goes straight to checkout. My kickoff email arrives the moment your card clears. It includes the intake questions and a link to book the call.", "PASS-104a supersedes PASS-103 reword row 1"),
    ("I plan how enterprise software companies find buyers and grow. I help decide what their platforms should do. This work spans thirteen years.", "PASS-103 reword row 2"),
    ("$14M in revenue. Average enterprise deal size, $1.2M. A product built in Tel Aviv ended up deployed behind a global systemically important bank and a federal research agency. It reached a white-shoe Wall Street law firm and a major U.S. utility, too. Trillions in financial assets sit protected behind those deployments. The research I contributed showed why the top-of-funnel honeypot message missed buyers’ reasons for signing. The pitch moved to visibility and east-west microsegmentation. Akamai acquired Guardicore in 2021. The positioning carried into Akamai Guardicore Segmentation.", "PASS-103 reword row 3"),
    ("01. I built software around the author's own body of work. Every morning the author opens a report of live opportunities. Each comes with a partial response already drafted. The software weighs each new RFP against that work through retrieval. The author gets a head start. Volume stopped being the bottleneck.", "PASS-103 reword row 4"),
    ("Finding users, production failures, and breaking changes are separate problems. I cover each in this manual, one system per chapter. When the tool’s memory runs out, yours has to take over. Write it down on paper, in the repo.", "PASS-103 reword row 5"),
    ("a diagnosis of what is stuck and what work would fix it. I tell you whether you need me at all.", "PASS-103 reword row 6"),
    ("For Claude Code and Cursor: a session opener, an architecture mapper, an invariant extractor, a diff reviewer, a payments wiring prompt, and an outreach drafter.", "PASS-103 reword row 8"),
    ("Three complete SPEC files: a booking app, a photographer gallery, and an internal ops tracker. Also a starter invariants file, an architecture sample, and a real env example.", "PASS-103 reword row 9"),
    ("Thirteen years inside B2B software companies. I plan how to sell the product in the morning and ship it in the afternoon. Four exits behind my work, $5B+ combined. Oakland, CA.", "PASS-103 reword row 10"),
    ("Thirteen years inside B2B software companies. I plan how to sell the product in the morning and ship it in the afternoon. Four exits behind my work, $5B+ combined.", "PASS-103 reword row 10"),
]

RES = []


def chk(cid, ok, ev):
    RES.append({"id": cid, "pass": bool(ok), "evidence": str(ev)})
    print(("PASS " if ok else "FAIL ") + cid + "  " + str(ev))
    return ok


def check_book_blackout(page, route, home=False):
    """Pass 104a: retired book copy must not return through shared chrome."""
    scopes = [("footer", page.locator("footer").inner_text())]
    if home:
        scopes.append(("home", page.locator("body").inner_text()))
    for scope, text in scopes:
        hits = re.findall(r"80% Wall|\$99", text, re.I)
        chk("104a-no-book-" + scope + "-" + route, not hits,
            "%s %s: no 80%% Wall or $99; hits=%s" % (route, scope, hits))
    links = page.locator('a[href*="/playbook"], a[href="#manual"]').count()
    chk("104a-no-book-links-" + route, links == 0,
        "%s: %d links to /playbook or #manual" % (route, links))


# ---------------------------------------------------------------- copy corpus


def norm(s):
    s = unicodedata.normalize("NFKC", s)
    s = (s.replace("\u2019", "'").replace("\u2018", "'")
           .replace("\u201c", '"').replace("\u201d", '"')
           .replace("\u2013", "-").replace("\u2014", "-")
           .replace("\u00a0", " ").replace("\u2192", "->").replace("\u00b7", "."))
    return re.sub(r"\s+", " ", s).strip()


def strip_tags(html):
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<style.*?</style>", " ", html, flags=re.S | re.I)
    alts = re.findall(r'alt="([^"]*)"', html) + re.findall(r'aria-label="([^"]*)"', html)
    text = re.sub(r"<[^>]+>", "\n", html)
    import html as H
    return H.unescape(text) + "\n" + "\n".join(H.unescape(a) for a in alts)


def corpus():
    parts = []
    parts.append(strip_tags(open(FREIGHT, encoding="utf-8").read()))
    for f in sorted(os.listdir(WORK)):
        if not f.endswith(".mdx"):
            continue
        src = open(os.path.join(WORK, f), encoding="utf-8").read()
        m = re.match(r"^---\n(.*?)\n---", src, flags=re.S)
        if m:
            parts.append(m.group(1))
    # SS15.4 takes the redrawn page-6 diagram off the page with the rest of the rail
    # panels, so WallChart.tsx stops being a copy source: the gate narrows to three.
    # SS14.7's third source: the live /packages button labels and its own JSX text
    pk = open(PACKAGES, encoding="utf-8").read()
    parts.append("\n".join(re.findall(r'(?<!aria-)label="([^"]*)"', pk)))
    parts.append("\n".join(re.findall(r">\s*([^<>{}\n][^<>{}]*?)\s*<", pk)))
    blob = norm("\n".join(parts))
    for a, b in REWRITES:
        blob += " || " + norm(b)
    blob += " || " + norm("From $5K a month")
    return blob


# ---------------------------------------------------------------- contrast


def lum(r, g, b):
    def c(v):
        v /= 255.0
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b)


def ratio(a, b):
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def parse_rgb(s):
    n = [float(x) for x in re.findall(r"[\d.]+", s)[:3]]
    return n if len(n) == 3 else [255, 255, 255]


def bg_contrast(page, sel, png_path):
    """Hide the glyphs of `sel`, shoot its box, and return the WORST contrast any pixel
    behind it makes with the element's own colour."""
    info = page.evaluate("""(sel)=>{const e=document.querySelector(sel);
        if(!e) return null; const r=e.getBoundingClientRect();
        return {x:r.x,y:r.y,w:r.width,h:r.height,color:getComputedStyle(e).color};}""", sel)
    if not info or info["w"] < 2 or info["h"] < 2:
        return None
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='transparent';}", sel)
    clip = {"x": max(0, info["x"]), "y": max(0, info["y"]),
            "width": min(info["w"], page.viewport_size["width"] - max(0, info["x"])),
            "height": min(info["h"], page.viewport_size["height"] - max(0, info["y"]))}
    page.screenshot(path=png_path, clip=clip)
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='';}", sel)
    from PIL import Image
    im = Image.open(png_path).convert("RGB")
    fg = lum(*parse_rgb(info["color"]))
    worst = 99.0
    px = im.load()
    w, h = im.size
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            worst = min(worst, ratio(fg, lum(*px[x, y])))
    return worst


def bg_contrast_glyph_run(page, hide_sel, row_sel, png_path):
    """Like bg_contrast, but for ONE glyph run inside a multi-row ancestor (PASS-104B §3's
    stacked two-row heading at <=899): hiding only `row_sel` leaves the SIBLING row's own
    ink able to bleed a stray anti-aliased pixel across the tight (line-height 0.92) gap
    into this row's clip box, which reads as a false near-1:1 failure against the row's
    own colour. Hiding the WHOLE ancestor's colour removes every row's ink at once, so the
    box then measures only what is actually composited behind it (the film + veil)."""
    info = page.evaluate("""(sel)=>{const e=document.querySelector(sel);
        if(!e) return null; const r=e.getBoundingClientRect();
        return {x:r.x,y:r.y,w:r.width,h:r.height,color:getComputedStyle(e).color};}""",
        row_sel)
    if not info or info["w"] < 2 or info["h"] < 2:
        return None
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='transparent';}", hide_sel)
    clip = {"x": max(0, info["x"]), "y": max(0, info["y"]),
            "width": min(info["w"], page.viewport_size["width"] - max(0, info["x"])),
            "height": min(info["h"], page.viewport_size["height"] - max(0, info["y"]))}
    page.screenshot(path=png_path, clip=clip)
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='';}", hide_sel)
    from PIL import Image
    im = Image.open(png_path).convert("RGB")
    fg = lum(*parse_rgb(info["color"]))
    worst = 99.0
    px = im.load()
    w, h = im.size
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            worst = min(worst, ratio(fg, lum(*px[x, y])))
    return worst


FFMPEG = (r"C:\Users\micah\AppData\Local\Microsoft\WinGet\Packages"
          r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
          r"\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe")

def measure_arrival(clip, workdir):
    """SS16.3-1's trigger, measured rather than guessed. Frames every 0.1s; in each one the
    leftmost run of six pixels 25 levels under the local wall median, inside the band the
    fingertip lives in (source rows 370..520 of 1080). The arrival is the FIRST frame whose
    leftmost hand pixel is within 6px of its value on the last frame."""
    from PIL import Image
    exe = FFMPEG if os.path.exists(FFMPEG) else (shutil.which("ffmpeg") or "")
    if not exe or not os.path.exists(clip):
        return None
    d = os.path.join(workdir, "arr")
    if os.path.isdir(d):
        for f in os.listdir(d):
            os.remove(os.path.join(d, f))
    os.makedirs(d, exist_ok=True)
    r = subprocess.run([exe, "-v", "error", "-i", clip, "-vf", "fps=10",
                        "-start_number", "0", os.path.join(d, "f%03d.png")],
                       capture_output=True)
    if r.returncode != 0:
        return None
    files = sorted(f for f in os.listdir(d) if f.endswith(".png"))
    if not files:
        return None
    im0 = Image.open(os.path.join(d, files[0]))
    W, H = im0.size
    Y0, Y1 = int(round(370 * H / 1080.0)), int(round(520 * H / 1080.0))
    RX0, RX1 = int(round(300 * W / 1920.0)), int(round(365 * W / 1920.0))
    XMAX = min(W, int(round(1050 * W / 1920.0)))

    def leftmost(path):
        px = Image.open(path).convert("L").load()
        best = None
        for y in range(Y0, Y1 + 1):
            row = [px[x, y] for x in range(XMAX)]
            ref = sorted(row[RX0:RX1 + 1])
            thr = ref[len(ref) // 2] - 25
            run = 0
            for x in range(XMAX):
                if row[x] < thr:
                    run += 1
                    if run >= 6:
                        xx = x - 5
                        if best is None or xx < best:
                            best = xx
                        break
                else:
                    run = 0
        return best

    trace = [(i / 10.0, leftmost(os.path.join(d, f))) for i, f in enumerate(files)]
    final = trace[-1][1]
    arrival = None
    for t, x in trace:
        if x is not None and final is not None and abs(x - final) <= 6:
            arrival = t
            break
    return {"trace": trace, "final": final, "arrival": arrival,
            "w": W, "h": H, "n": len(files)}


def ident(v):
    """Is this computed transform the identity (no move, no scale)?"""
    if not v or v == "none":
        return True
    tx, ty, sc = tmat(v)
    return abs(tx) < 0.01 and abs(ty) < 0.01 and abs(sc - 1) < 0.01


def tmat(v):
    """(tx, ty, scale) out of a computed `transform` matrix string."""
    if not v or v == "none":
        return (0.0, 0.0, 1.0)
    n = [float(x) for x in re.findall(r"-?[\d.eE+]+", v)]
    if len(n) >= 6:
        return (n[4], n[5], n[0])
    return (0.0, 0.0, 1.0)


def ground_from_cap(page, sel, png_path):
    """SS16.2 pins the veil solid from `fingertip_y + 4px`, which IS the copper row's
    cap-top. So the row's GROUND is measured from the cap-top down -- the band the row's
    ink actually stands on -- and what is returned is (worst contrast, brightest channel).
    The ~10px of line box ABOVE the cap-top is empty except where the two `t`s and the `k`
    of `go-to-market.` overshoot the cap line; that strip is the veil's own tail and is
    reported separately, never folded into this number."""
    from PIL import Image
    info = page.evaluate("""(sel)=>{const e=document.querySelector(sel);
        if(!e) return null; const r=e.getBoundingClientRect();
        const h1=e.closest('h1')||e;
        const capk=parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--capk'))||0.0591;
        return {x:r.x,y:r.y,w:r.width,h:r.height,color:getComputedStyle(e).color,
                cap:capk*parseFloat(getComputedStyle(h1).fontSize)};}""", sel)
    if not info or info["w"] < 2 or info["h"] < 2:
        return None
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='transparent';}", sel)
    y = max(0, info["y"] + info["cap"])
    h = info["h"] - info["cap"]
    clip = {"x": max(0, info["x"]), "y": y,
            "width": min(info["w"], page.viewport_size["width"] - max(0, info["x"])),
            "height": min(h, page.viewport_size["height"] - y)}
    page.screenshot(path=png_path, clip=clip)
    page.evaluate("(sel)=>{document.querySelector(sel).style.color='';}", sel)
    im = Image.open(png_path).convert("RGB")
    fg = lum(*parse_rgb(info["color"]))
    px = im.load()
    w, hh = im.size
    worst, bright = 99.0, 0
    for yy in range(0, hh, 2):
        for xx in range(0, w, 2):
            p = px[xx, yy]
            worst = min(worst, ratio(fg, lum(*p)))
            bright = max(bright, max(p))
    return worst, bright


def veil_profile(page, png):
    """Measure the veil's OWN alpha, not a composite guess: the film is hidden and the
    stage painted flat white, so alpha = (255 - pixel) / (255 - 13) at every row."""
    from PIL import Image
    box = page.evaluate("""()=>{const s=document.getElementById('stage');
        const v=s.querySelector('video'); const st=s.querySelector('.still');
        v.style.display='none'; if(st) st.style.display='none';
        s.style.background='#ffffff';
        document.getElementById('herocopy').style.visibility='hidden';
        const r=s.getBoundingClientRect();
        const wEl=document.getElementById('stagewrap');
        const fy=r.top+r.height*parseFloat(wEl.dataset.fy||'38.2407')/100;
        const rows=[...document.querySelectorAll('#h1 .r')];
        return {x:r.x,y:r.y,w:r.width,h:r.height,fy:fy,
                boneTop:rows[0].getBoundingClientRect().y};}""")
    page.wait_for_timeout(200)
    page.screenshot(path=png, clip={"x": max(0, box["x"]), "y": max(0, box["y"]),
                                    "width": box["w"], "height": box["h"]})
    page.evaluate("""()=>{const s=document.getElementById('stage');
        const v=s.querySelector('video'); const st=s.querySelector('.still');
        v.style.display=''; if(st) st.style.display='';
        s.style.background='';
        document.getElementById('herocopy').style.visibility='';}""")
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]

    def a_at(abs_y):
        y = int(round(abs_y - box["y"]))
        if y < 0 or y >= H:
            return None
        v = px[min(W - 1, int(W * 0.5)), y]
        return (255.0 - v) / (255.0 - 13.0)

    out = {"a_m12": a_at(box["fy"] - 12), "a_p4": a_at(box["fy"] + 4),
           "a_m40": a_at(box["fy"] - 40), "a_p40": a_at(box["fy"] + 40),
           "a_bone_top": a_at(box["boneTop"])}
    return None if any(v is None for v in out.values()) else out


def finger_emerges(page, png):
    """SS16.2 supersedes SS14.1's ">= 25 levels" gate. That number was set against a veil
    that held .55 THROUGH the fingertip's row and stayed lit below it, so the finger sat on
    a wall reading ~145 and an absolute step was the right measure. SS16.2 takes the veil
    solid at fingertip_y + 4px, so the finger's lit band is the 18px of ramp above it, where
    the wall itself falls from ~90 to ~19 -- an absolute step there is a measure of the ramp,
    not of the gesture. What is measured instead is the RELATIVE step, row by row inside the
    lit band: the finger's darkest decile against the wall's median at the SAME y. Scale
    free, so it is the same test at any veil alpha."""
    from PIL import Image
    import statistics
    box = page.evaluate("""()=>{const w=document.getElementById('stagewrap');
        const r=w.getBoundingClientRect();
        const fx=parseFloat(w.dataset.fx)/100, fy=parseFloat(w.dataset.fy)/100;
        return {x:r.left+r.width*fx, y:r.top+r.height*fy, w:r.width};}""")
    x, y = box["x"], box["y"]
    clip = {"x": max(0, x - 90), "y": max(0, y - 16), "width": 200, "height": 18}
    page.screenshot(path=png, clip=clip)
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]
    rows = []
    for yy in range(H):
        wall = [px[xx, yy] for xx in range(0, 60)]
        ink = sorted(px[xx, yy] for xx in range(60, W))
        wv = statistics.median(wall)
        iv = statistics.median(ink[:max(1, len(ink) // 10)])
        if wv > 2:
            rows.append((wv, iv, (wv - iv) / float(wv)))
    if not rows:
        return None
    return {"rows": rows, "rel": statistics.median(r[2] for r in rows),
            "absmax": max(r[0] - r[1] for r in rows), "bw": W, "bh": H}


def finger_visible(page, png):
    """At the hold frame, is the pointing hand still a visible step off the wall where the
    veil has taken it to .55? Sample a box centred on the measured fingertip and compare its
    darkest decile against the wall 60px to its left."""
    box = page.evaluate("""()=>{const w=document.getElementById('stagewrap');
        const r=w.getBoundingClientRect();
        const fx=parseFloat(w.dataset.fx)/100, fy=parseFloat(w.dataset.fy)/100;
        return {x:r.left+r.width*fx, y:r.top+r.height*fy, w:r.width};}""")
    x, y = box["x"], box["y"]
    clip = {"x": max(0, x - 90), "y": max(0, y - 14), "width": 200, "height": 26}
    page.screenshot(path=png, clip=clip)
    from PIL import Image
    import statistics
    im = Image.open(png).convert("L")
    px = im.load()
    w, h = im.size
    wall, ink = [], []
    for yy in range(h):
        for xx in range(w):
            (wall if xx < 60 else ink).append(px[xx, yy])
    if not wall or not ink:
        return None
    wall_v = statistics.median(wall)
    ink.sort()
    ink_v = statistics.median(ink[:max(1, len(ink) // 6)])
    return {"wall": wall_v, "ink": ink_v, "delta": wall_v - ink_v, "bw": w, "bh": h}


def hand_reads(page, png):
    """The gesture is a HAND, not a fingertip. Round 3 pinned the veil solid 12px under the
    fingertip, which made the fingertip the last lit pixel: the finger survived as a sliver
    and the hand, wrist and arm behind it were inside the solid espresso. Sample the hand's
    own source band (x 460..660 of 1920 -- knuckles, fist, wrist) against the wall to its
    left (x 120..300) at three heights BELOW the fingertip and report the composited step at
    each. The hold frame is the state every desktop visitor sees."""
    import statistics
    from PIL import Image
    page.evaluate("()=>{document.getElementById('herocopy').style.visibility='hidden';}")
    page.wait_for_timeout(150)
    box = page.evaluate("""()=>{const r=document.getElementById('stagewrap')
        .getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height};}""")
    page.screenshot(path=png, clip={"x": max(0, box["x"]), "y": max(0, box["y"]),
                                    "width": box["w"], "height": box["h"]})
    page.evaluate("()=>{document.getElementById('herocopy').style.visibility='';}")
    im = Image.open(png).convert("L")
    px, W, H = im.load(), im.size[0], im.size[1]
    out = []
    for pc in (42, 46, 50):
        y = min(H - 1, int(H * pc / 100))
        hand = [px[int(W * x / 1920), y] for x in range(460, 661, 8)]
        wall = [px[int(W * x / 1920), y] for x in range(120, 301, 8)]
        out.append((pc, statistics.median(wall) - statistics.median(hand)))
    return out


def set_frame(page, vid_id, frame, fps=24.0):
    return page.evaluate("""async ([id,f,fps])=>{
        const v=document.getElementById(id); if(!v) return null;
        v.pause();
        const d = isFinite(v.duration)&&v.duration>0 ? v.duration : 5;
        v.currentTime = Math.min(f/fps, Math.max(0, d-0.05));
        await new Promise(r=>{const go=()=>{v.removeEventListener('seeked',go);r();};
                              v.addEventListener('seeked',go); setTimeout(r,900);});
        return v.currentTime;}""", [vid_id, frame, fps])


# ---------------------------------------------------------------- main


def main(base):
    url = base
    shots = []
    blob = corpus()

    with sync_playwright() as p:
        br = p.chromium.launch(args=["--autoplay-policy=no-user-gesture-required",
                                     "--disable-lcd-text"])
        ctx = br.new_context(viewport={"width": 1440, "height": 900},
                             device_scale_factor=1, reduced_motion="no-preference")
        pg = ctx.new_page()
        pg.goto(url)
        pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        pg.wait_for_timeout(1800)

        # ---- 01 stage mapping ------------------------------------------------
        st = pg.evaluate("""()=>{const w=document.getElementById('stagewrap');
            const v=document.getElementById('filmvid'); const r=w.getBoundingClientRect();
            const cs=getComputedStyle(v);
            return {w:r.width,h:r.height,fit:cs.objectFit,pos:cs.objectPosition,
                    vw:v.videoWidth,vh:v.videoHeight,
                    fx:parseFloat(w.dataset.fx),fy:parseFloat(w.dataset.fy),
                    inner:window.innerWidth};}""")
        exp = st["w"] * 9 / 16
        chk("14.1-stage-16x9",
            abs(st["h"] - exp) <= 1.5 and abs(st["w"] - st["inner"]) <= 1
            and st["fit"] == "cover" and st["pos"] == "50% 50%",
            "1440: stage %.1fx%.1f (16:9 wants %.1f), width==innerWidth(%d), object-fit=%s, "
            "object-position=%s, source %dx%d -> 1:1 mapping"
            % (st["w"], st["h"], exp, st["inner"], st["fit"], st["pos"], st["vw"], st["vh"]))

        # ---- 02 SS14.7: the words go to the finger ---------------------------
        # The fingertip is derived from the COVER FIT of the 1920x1080 source into whatever
        # box the stage currently is, so ONE expression covers the 16:9 desktop stage and the
        # 4:3 mobile crop. SS14.7 puts the "I" one hand's width (48px at >=900, 40px below)
        # LEFT of the tip and the cap-top 4px under it. What is asserted is the distance from
        # the tip to the nearest point of the "I" glyph box, and that the glyph is to the LEFT
        # of the tip -- which is what makes the finger point AT the word instead of past it.
        FINGER_JS = r"""()=>{
            const stg=document.getElementById('stage');
            const b=stg.getBoundingClientRect();
            const v=document.getElementById('filmvid'), cs=getComputedStyle(v);
            const SW=1920, SH=1080, FX=372, FY=413;
            const sc=Math.max(b.width/SW, b.height/SH);
            const op=cs.objectPosition.split(' ');
            const ox=b.x+(b.width-SW*sc)*(parseFloat(op[0])/100);
            const oy=b.y+(b.height-SH*sc)*(parseFloat(op[1])/100);
            const fx=ox+FX*sc, fy=oy+FY*sc;
            const h1=document.getElementById('h1');
            const hb=h1.getBoundingClientRect();
            const rows=[...h1.querySelectorAll('.r')];
            /* SS16.2: the glyph the finger points at is the "g" of go-to-market., on the
               COPPER row. The row span is display:block, so ITS box is the line box (a
               Range rect is the font's own ascent+descent box and sits ~8px higher at
               1440); the cap-top is measured off the line box, which is what --capk is
               calibrated against. */
            const tn=[...rows[1].childNodes].filter(n=>n.nodeType===3&&n.textContent.trim())[0];
            const rg=document.createRange(); rg.setStart(tn,0); rg.setEnd(tn,1);
            const g=rg.getBoundingClientRect();
            const lineBox=rows[1].getBoundingClientRect();
            const capk=parseFloat(getComputedStyle(document.documentElement)
                        .getPropertyValue('--capk'))||0.0591;
            const capTop=lineBox.y+capk*parseFloat(getComputedStyle(h1).fontSize);
            const dx=(g.x<=fx&&fx<=g.right)?0:Math.min(Math.abs(fx-g.x),Math.abs(fx-g.right));
            const dy=(capTop<=fy&&fy<=g.bottom)?0:Math.min(Math.abs(fy-capTop),
                                                           Math.abs(fy-g.bottom));
            const ink=r=>{const q=document.createRange(); q.selectNodeContents(r);
                          return q.getBoundingClientRect();};
            const hc=document.getElementById('herocopy').getBoundingClientRect();
            const lede=document.querySelector('.hero-copy .lede').getBoundingClientRect();
            const chips=document.getElementById('herochips').getBoundingClientRect();
            const proof=document.getElementById('heroproof').getBoundingClientRect();
            return {stage:{x:b.x,y:b.y,w:b.width,h:b.height,right:b.right,bottom:b.bottom},
                    objpos:cs.objectPosition, fit:cs.objectFit,
                    fx:fx, fy:fy,
                    fpct:[(fx-b.x)/b.width*100,(fy-b.y)/b.height*100],
                    I:[g.x,capTop,g.right,g.bottom],
                    capTop:capTop, capDelta:capTop-fy,
                    euclid:Math.hypot(dx,dy), dx:dx, dy:dy, Ileft:g.x<fx,
                    h1Box:[hb.x,hb.y,hb.right,hb.bottom],
                    rows:rows.map(r=>{const k=ink(r);
                       return {t:r.textContent.trim(), x:k.x, right:k.right, w:k.width,
                               n:r.getClientRects().length, gutter:b.right-k.right};}),
                    srcWindow:[(b.x-ox)/sc,(b.right-ox)/sc],
                    copyTop:hc.y, ledeX:lede.x, chipsX:chips.x, proofRight:proof.right,
                    proofX:proof.x, proofTop:proof.top, chipsBottom:chips.bottom,
                    proofFs:parseFloat(getComputedStyle(
                        document.querySelector('#heroproof .l')).fontSize),
                    scrollW:document.documentElement.scrollWidth, iw:window.innerWidth};}"""
        pt = {}
        for W in (1280, 1440, 1920):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(500)
            pt[W] = pg.evaluate(FINGER_JS)
        chk("16.2-fingertip-to-g",
            all(v["euclid"] <= 60 and v["Ileft"] and abs(v["capDelta"] - 4) <= 1.0
                for v in pt.values()),
            "tip -> nearest point of the \"g\" glyph box, the glyph LEFT of the tip, and the "
            "copper row's cap-top 4px UNDER the tip: "
            + "; ".join(
                "%d: tip (%.0f, %.0f), g box [%.0f %.0f %.0f %.0f], dx %.1f dy %.1f, "
                "euclid %.1fpx (<=60), g left of tip=%s, cap-top %+.1fpx off the tip"
                % (W, pt[W]["fx"], pt[W]["fy"], pt[W]["I"][0], pt[W]["I"][1], pt[W]["I"][2],
                   pt[W]["I"][3], pt[W]["dx"], pt[W]["dy"], pt[W]["euclid"], pt[W]["Ileft"],
                   pt[W]["capDelta"])
                for W in (1280, 1440, 1920)))
        chk("14.7-copper-row-inside-stage",
            all(v["rows"][1]["gutter"] >= 32 and v["rows"][1]["n"] == 1 for v in pt.values()),
            "'go-to-market.' right end vs the stage's right edge (SS14.7 wants >=32px): "
            + "; ".join(
                "%d: row ends %.0f, stage ends %.0f, %.0fpx inside, %d client rect"
                % (W, pt[W]["rows"][1]["right"], pt[W]["stage"]["right"],
                   pt[W]["rows"][1]["gutter"], pt[W]["rows"][1]["n"])
                for W in (1280, 1440, 1920)))
        # SS18 re-cuts the base row: "`Four exits, $5B+ combined.` moves to 24px under the
        # chips, left-aligned with the headline, 14px label at 60% bone; the full-width
        # hairline above the chips is deleted." So the proof row stops being the right end
        # of a spread row and joins the ONE left edge every other element in the block sits
        # on -- which is what this check was always about.
        chk("14.7-sentence-and-chips-share-the-left-edge",
            all(abs(v["ledeX"] - v["I"][0]) <= 1.5 and abs(v["chipsX"] - v["I"][0]) <= 1.5
                and abs(v["proofX"] - v["I"][0]) <= 1.5
                and abs((v["proofTop"] - v["chipsBottom"]) - 24) <= 1.5
                and abs(v["proofFs"] - 14) <= 0.6 for v in pt.values()),
            "; ".join("%d: g at %.0f, sentence at %.0f, chips at %.0f, proof at %.0f "
                      "and %.0fpx under the chips at %.0fpx (SS18: 24px, 14px label)"
                      % (W, pt[W]["I"][0], pt[W]["ledeX"], pt[W]["chipsX"], pt[W]["proofX"],
                         pt[W]["proofTop"] - pt[W]["chipsBottom"], pt[W]["proofFs"])
                      for W in (1280, 1440, 1920)))

        # ---- PASS-104B §2: the sign (three new checks, brief §2's own list) ----
        # The sign is a sibling of .hero-copy inside .stagewrap (not of #h1 inside
        # .hero-copy), positioned off the SAME --fx constant as the headline, so
        # "the sign's left edge equals the headline's" is asserted directly
        # rather than through #h1's own descendant checks above.
        sign_widths = (1280, 1440, 900)
        sign_pt = {}
        for W in sign_widths:
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(400)
            sign_pt[W] = pg.evaluate("""()=>{
                const sign=document.querySelector('.sign');
                const h1=document.getElementById('h1');
                const rule=document.querySelector('.sign .rule');
                const fig=document.querySelector('.sign .row .lg .fig');
                const sr=sign.getBoundingClientRect(), hr=h1.getBoundingClientRect();
                return {signX:sr.x, h1X:hr.x,
                        ruleColor:getComputedStyle(rule).backgroundColor,
                        figColor:getComputedStyle(fig).color};}""")
        chk("14.9-sign-left-edge-matches-headline",
            all(abs(v["signX"] - v["h1X"]) <= 1.5 for v in sign_pt.values()),
            "the sign's own left edge vs the headline's, the ONLY left edge in the hero: "
            + "; ".join("%d: sign %.1f, headline %.1f (<=1.5px)"
                        % (W, sign_pt[W]["signX"], sign_pt[W]["h1X"]) for W in sign_widths))
        chk("14.9-sign-rule-copper-figure-bone",
            all(v["ruleColor"] == "rgb(200, 84, 43)"
                and v["figColor"] == "rgb(245, 239, 228)" for v in sign_pt.values()),
            "the rule is the licensed copper seam and the figure is BONE, never copper "
            "(SS3: copper on type belongs to `go-to-market.` alone): "
            + "; ".join("%d: rule %s (wants rgb(200, 84, 43)), figure %s (wants bone "
                        "rgb(245, 239, 228))" % (W, sign_pt[W]["ruleColor"], sign_pt[W]["figColor"])
                        for W in sign_widths))

        # the light-travels chain, off #h1's own ARRIVAL trigger: seek the clip just past
        # ARRIVAL (so timeupdate fires lightWord() and stamps #h1.on), then wait 900ms of
        # REAL time -- the figure's own fill (delay 560ms + 260ms duration = 820ms) is the
        # fastest-finishing part of the chain, so 900ms clears it with margin.
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.reload()
        pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        pg.wait_for_timeout(600)
        pg.evaluate("""async ()=>{const v=document.getElementById('filmvid'); v.pause();
            v.currentTime=2.6;
            await new Promise(r=>{const go=()=>{v.removeEventListener('seeked',go);r();};
              v.addEventListener('seeked',go); setTimeout(r,300);});}""")
        pg.wait_for_timeout(900)
        fig_op = pg.evaluate(
            "()=>getComputedStyle(document.querySelector('.sign .row .lg .fig')).opacity")
        chk("14.9-sign-figure-opacity-1-after-arrival",
            abs(float(fig_op) - 1.0) < 0.02,
            "1440, clip seeked to 2.60s (past ARRIVAL=2.54) then 900ms of real time for the "
            "figure's own 560ms-delay/260ms-fill to finish: computed opacity %s (wants 1)"
            % fig_op)

        # the same assertion with JavaScript disabled -- the finished-frame proof. Unlike
        # page.evaluate(), locator.evaluate() still runs with java_script_enabled=False
        # (confirmed against this Playwright build), so this reads real computed style
        # rather than a bounding-box proxy.
        njctx = br.new_context(viewport={"width": 1440, "height": 900},
                               java_script_enabled=False, device_scale_factor=1)
        njp = njctx.new_page()
        njp.goto(url)
        njp.wait_for_timeout(1500)
        nj_fig_op = njp.locator(".sign .row .lg .fig").evaluate(
            "el=>getComputedStyle(el).opacity")
        nj_rule_clip = njp.locator(".sign .rule").evaluate(
            "el=>getComputedStyle(el).clipPath")
        njctx.close()
        chk("14.9-sign-finished-frame-no-js",
            abs(float(nj_fig_op) - 1.0) < 0.02 and "100%" not in nj_rule_clip,
            "with scripting OFF (html.rl-js never lands) the sign renders its FINISHED "
            "frame by construction, not by a second stylesheet: figure opacity %s (wants "
            "1), rule clip-path %r (wants fully drawn, not the 100%%-inset pre-state)"
            % (nj_fig_op, nj_rule_clip))

        # ---- 03 hero veil contrast at frames 0 / 48 / 96 ---------------------
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(600)
        bone_min, cop_min, cop_px, det = 99, 99, 0, []
        for fr in (0, 48, 96):
            t = set_frame(pg, "filmvid", fr)
            b = bg_contrast(pg, "#h1 .r:nth-child(1)", os.path.join(OUT, "_b.png"))
            c = ground_from_cap(pg, "#h1 .r.cu", os.path.join(OUT, "_c.png"))
            if b:
                bone_min = min(bone_min, b)
            if c:
                cop_min = min(cop_min, c[0])
                cop_px = max(cop_px, c[1])
            det.append("f%d(t=%.2fs) bone %.2f | copper ground %.2f, brightest channel %d"
                       % (fr, t or 0, b or 0, c[0] if c else 0, c[1] if c else 0))
        chk("16.2-hero-lighting", bone_min >= 4.5 and cop_min >= 4.3 and cop_px <= 16,
            "SS16.2: the bone row is over the film on the veiled wall, the copper row is on "
            "the veil's solid ground. bone row min %.2f:1 (>=4.5); the copper row's ground "
            "from its cap-top (= fingertip_y + 4px, the stop SS16.2 pins) down is FLAT "
            "espresso -- brightest channel %d of 255 (#0D0D0F is 15) -- carrying copper at "
            "%.2f:1, which is the brief's own measured copper-on-espresso figure | %s"
            % (bone_min, cop_px, cop_min, "; ".join(det)))

        # ---- 02b the out-of-flow hero block must never reach section 02 ------
        clear = []
        for W in (1440, 1280, 1024, 900):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(400)
            g = pg.evaluate("""()=>{const c=document.getElementById('herocopy');
                const o=document.getElementById('operator');
                const w=document.getElementById('stagewrap');
                return {gap:o.getBoundingClientRect().top-c.getBoundingClientRect().bottom,
                        over:c.getBoundingClientRect().bottom-w.getBoundingClientRect().bottom};}""")
            clear.append((W, g["gap"], g["over"]))
        chk("14.1-hero-clearance", all(g > 0 for _, g, _ in clear),
            "hero block foot -> operator top: " + ", ".join(
                "%d: %+.0fpx clear (block runs %+.0fpx past the stage's foot)" % c
                for c in clear))
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)

        # ---- 03b the gesture has to survive the veil -------------------------
        set_frame(pg, "filmvid", 96)
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(500)
        vis = finger_emerges(pg, os.path.join(OUT, "_finger.png"))
        # SS16.2 supersedes SS14.1's hand check: the veil is now SOLID from the fingertip's
        # own row +4px, so the hand below the tip is inside the dark BY DESIGN ("the hand
        # emerges from the dark and its tip touches the g"). What is measured instead is
        # the veil's own alpha profile against the two stops SS16.2 pins.
        veil = veil_profile(pg, os.path.join(OUT, "_veil.png"))
        chk("16.2-veil-cut",
            veil is not None and abs(veil["a_m12"] - 0.55) <= 0.03
            and veil["a_p4"] >= 0.995 and veil["a_bone_top"] >= 0.52,
            "1440, the veil measured directly (the film replaced by flat white, so alpha = "
            "(255 - pixel) / 242): %.3f at fingertip_y - 12px (SS16.2 pins .55), %.3f at "
            "fingertip_y + 4px (SS16.2 pins solid), %.3f at the bone row's own box top "
            "(what carries that row at >=4.5:1), %.3f 40px above the tip, %.3f 40px below"
            % (veil["a_m12"], veil["a_p4"], veil["a_bone_top"], veil["a_m40"], veil["a_p40"])
            if veil else "veil profile could not be measured")
        chk("16.2-fingertip-emerges", vis and vis["rel"] >= 0.15,
            "1440, hold frame: inside the 18px of ramp still lit above the tip, the finger "
            "reads a median %.0f%% darker than the wall on the same row (>=15%%, the "
            "scale-free form of SS14.1's old 25-of-145 step), peaking at a %.0f-level "
            "absolute step; per-row (wall, finger, rel): %s. Below fingertip_y + 4px the "
            "veil is solid by SS16.2's own ruling, so the hand is in the dark there BY "
            "DESIGN and only the tip is lit."
            % (vis["rel"] * 100, vis["absmax"],
               [(int(a), int(b), round(c, 2)) for a, b, c in vis["rows"][::3]])
            if vis else "the fingertip band could not be sampled")

        # ---- 05/06 operator: the long table (PASS-104B §3) -------------------
        # The square stage and its two-column register are gone. `#opstage` is
        # now the full-bleed band; the paragraph that used to sit ON the film is
        # off it (`.opthesis`); the old right-hand register is a horizontal
        # three-track ledger (`.opledger .opl-track`) under the band; a quote
        # row (`.opquote`) closes the section.
        pg.evaluate("()=>document.getElementById('operator').scrollIntoView()")
        pg.wait_for_timeout(900)
        opm = pg.evaluate("""()=>{
            const band=document.getElementById('opstage');
            const h=document.getElementById('oph2');
            const thesis=document.querySelector('.opthesis');
            const thesisP=document.querySelector('.opthesis p');
            const ledger=document.querySelector('.opledger');
            const tracks=[...document.querySelectorAll('.opl-track')];
            const quote=document.querySelector('.opquote');
            const br=band.getBoundingClientRect(), hr=h.getBoundingClientRect();
            return {bw:br.width,bh:br.height,bt:br.top,bb:br.bottom,
                    ht:hr.top,hb:hr.bottom,
                    thesisTop: thesis?thesis.getBoundingClientRect().top:null,
                    thesisText: thesisP?thesisP.textContent.trim():null,
                    ledgerTop: ledger?ledger.getBoundingClientRect().top:null,
                    trackCount: tracks.length,
                    trackTops: tracks.map(t=>t.getBoundingClientRect().top),
                    quoteTop: quote?quote.getBoundingClientRect().top:null,
                    innerW: innerWidth};}""")
        chk("14.2-op-square",
            abs(opm["bw"] - opm["innerW"]) <= 1 and abs(opm["bh"] - 440) <= 1.5
            and opm["ht"] >= opm["bt"] and opm["hb"] <= opm["bb"] + 2,
            "the band is full-bleed %.1fx%.1f against a %dpx viewport (3.27:1 at 1440, "
            "down 44%% from the old 782.67 square); heading %.1f..%.1f sits inside it "
            "(%.1f..%.1f)"
            % (opm["bw"], opm["bh"], opm["innerW"], opm["ht"], opm["hb"], opm["bt"], opm["bb"]))
        chk("14.2-op-columns",
            opm["thesisTop"] is not None and opm["thesisTop"] >= opm["bb"] - 1
            and opm["thesisText"] == ("I help you build it and sell it, on the same "
                                       "engagement, for the same fee.")
            and opm["trackCount"] == 3
            and opm["ledgerTop"] is not None and opm["ledgerTop"] >= opm["thesisTop"]
            and opm["quoteTop"] is not None and opm["quoteTop"] >= max(opm["trackTops"]),
            "the two-column register is gone: the thesis (%.1f) sits OFF the band (foot "
            "%.1f); the ledger (%.1f) is a %d-track horizontal row under it; the quote "
            "(%.1f) closes the section"
            % (opm["thesisTop"], opm["bb"], opm["ledgerTop"], opm["trackCount"], opm["quoteTop"]))

        # the HARD GATE: composited luminance behind every glyph run of the
        # heading at loop frames 0/96/192, >=3:1 (large text). This is the
        # section's own stop condition -- if it fails, the veil's 84% stop
        # raises in .05 steps, and if .70 does not clear it the band is NOT
        # taken solid (that reverts the section to where it started).
        ob, det2 = 99, []
        for fr in (0, 96, 192):
            t = set_frame(pg, "opvid", fr)
            v1 = bg_contrast_glyph_run(pg, "#oph2", "#oph2 .r:nth-child(1)", os.path.join(OUT, "_oband1.png"))
            v2 = bg_contrast_glyph_run(pg, "#oph2", "#oph2 .r:nth-child(2)", os.path.join(OUT, "_oband2.png"))
            v = min(x for x in (v1, v2) if x is not None) if (v1 or v2) else None
            if v:
                ob = min(ob, v)
            det2.append("f%d(t=%.2fs) row1=%.2f row2=%.2f" % (fr, t or 0, v1 or 0, v2 or 0))
        chk("14.2-op-band-contrast", ob >= 3.0,
            "PASS-104B §3 hard gate: heading (large text, >=3:1) min %.2f:1 over the band "
            "at loop frames 0/96/192 | %s" % (ob, "; ".join(det2)))

        # re-pointed at the ledger: the claims sit on plain espresso now, not
        # video, so this is an ordinary WCAG body-text check (>=4.5:1) rather
        # than a per-frame sample.
        trackContrasts = []
        for i in range(1, 4):
            v = bg_contrast(pg, f".opl-track:nth-child({i}) p",
                             os.path.join(OUT, f"_optrack{i}.png"))
            trackContrasts.append(v)
        tc = min(x for x in trackContrasts if x is not None) if any(trackContrasts) else None
        chk("14.2-op-contrast", tc is not None and tc >= 4.5,
            "re-pointed at the ledger (PASS-104B §3): the three claims sit on plain "
            "espresso now, not video; min %s:1 (>=4.5) | per-track %s"
            % (("%.2f" % tc) if tc is not None else "-", trackContrasts))

        # ---- 05b/c/d SS14.7: the heading's size, the veil's stops, the rows -----
        opx = pg.evaluate(r"""()=>{
            const h=document.getElementById('oph2');
            const band=document.getElementById('opstage').getBoundingClientRect();
            const cs=getComputedStyle(h);
            const d=parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const rows=[...h.querySelectorAll('.r')].map(r=>{
                const q=document.createRange(); q.selectNodeContents(r);
                const k=q.getBoundingClientRect();
                return {t:r.textContent.trim(), inkRight:k.right, inkW:k.width,
                        top:k.top, n:r.getClientRects().length};});
            const veil=getComputedStyle(document.querySelector('.opfilm .veil')).backgroundImage;
            const tracks=[...document.querySelectorAll('.opl-track')].map(
                e=>({h:e.getBoundingClientRect().height}));
            return {fs:parseFloat(cs.fontSize), d2:0.76*d, vs:cs.fontVariationSettings,
                    bandRight:band.right, bandLeft:band.x, rows:rows, veil:veil,
                    tracks:tracks, oneRow: rows.length===2 &&
                        Math.abs(rows[0].top - rows[1].top) < 4};}""")
        chk("14.7-op-heading-d2-wdth106",
            abs(opx["fs"] - opx["d2"]) < 0.6 and '"wdth" 106' in (opx["vs"] or "")
            and all(r["n"] == 1 for r in opx["rows"])
            and all(r["inkRight"] <= opx["bandRight"] + 0.5 for r in opx["rows"])
            and opx["oneRow"],
            "heading font-size %.2f == --d2 %.2f at %s; ONE row at >=900 (PASS-104B §3): "
            "rows %s -- each one client rect, each ending inside the band (right edge %.1f)"
            % (opx["fs"], opx["d2"], opx["vs"],
               [(r["t"], round(r["inkW"], 1), round(r["inkRight"], 1), r["n"])
                for r in opx["rows"]], opx["bandRight"]))
        stops = [(float(a), float(b)) for a, b in
                 re.findall(r"rgba?\(\s*13,\s*13,\s*15(?:,\s*([\d.]+))?\s*\)\s+([\d.]+)%",
                            opx["veil"].replace("rgb(13, 13, 15)", "rgba(13, 13, 15, 1)"))]
        s84 = [a for a, p in stops if abs(p - 84) < 0.6]
        s100 = [a for a, p in stops if abs(p - 100) < 0.6]
        chk("14.7-op-veil-62-82",
            bool(s84) and abs(s84[0] - 0.55) < 0.02
            and bool(s100) and abs(s100[0] - 0.62) < 0.02 and s100[0] < 1.0,
            "PASS-104B §3: the scrim is NEVER solid -- alpha at the 84%% stop is %s "
            "(wants .55) and at 100%% is %s (wants .62, always < 1.0, so the picture "
            "stays legible to the bottom edge); every stop: %s"
            % (s84[0] if s84 else "-", s100[0] if s100 else "-",
               [(a, p) for a, p in stops]))
        hs = [round(t["h"], 1) for t in opx["tracks"]]
        chk("14.7-op-rows-auto-height",
            len(opx["tracks"]) == 3 and len(set(hs)) > 1,
            "re-pointed at the ledger tracks (PASS-104B §3): the three horizontal tracks "
            "take their own height, not a stretched third of the row: %s" % hs)
        # ---- 11 head sizes / air --------------------------------------------
        sizes = pg.evaluate("""()=>{
            const hd0=parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const d2=0.76*hd0;
            const heads=[].map.call(document.querySelectorAll('.sec h2'),
                e=>[e.textContent.trim().slice(0,40), parseFloat(getComputedStyle(e).fontSize)]);
            const names=[].map.call(document.querySelectorAll('.prf .who'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const q=[].map.call(document.querySelectorAll('.q dt'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const a=[].map.call(document.querySelectorAll('.q dd'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const caps=[].map.call(document.querySelectorAll('.cap'),
                e=>parseFloat(getComputedStyle(e).fontSize));
            const air=[].map.call(document.querySelectorAll('.work,.price,.proofsec,.faq'),
                e=>parseFloat(getComputedStyle(e).paddingTop));
            const hd=parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const ask=parseFloat(getComputedStyle(document.querySelector('.ask .d')).fontSize);
            return {d2:d2,heads:heads,names:names,q:q,a:a,caps:caps,air:air,hd:hd,ask:ask};}""")
        d2 = sizes["d2"]
        headsok = all(abs(h[1] - d2) < 1.0 for h in sizes["heads"]) and len(sizes["heads"]) == 4
        chk("14.4-heads", headsok
            and all(abs(n - 28) < 0.6 for n in sizes["names"])
            # SS15.3 supersedes SS14.4 on the objections. PASS-104B S6 restores S14.4's
            # own ruling on top of that: 28px/1.2 question, 19px/1.5 answer. The brief
            # names this 24->28 / 17->19 edit for 18-objections-one-lane-from-the-seam
            # and does NOT name it here, but this gate asserts the same two numbers, so
            # it moves with them. The assertion stays exact -- nothing is loosened.
            and all(abs(n - 28) < 0.6 for n in sizes["q"])
            and all(abs(n - 19) < 0.6 for n in sizes["a"])
            # SS18: "caption from x = 600 at 28px 60% ink (one size; rank by colour and
            # column)". The 19px caption WAS the size rank SS18 replaced.
            and all(abs(n - 28) < 0.6 for n in sizes["caps"])
            and all(abs(x - 120) < 1 for x in sizes["air"]),
            "--d2=%.1f; %d section heads all at --d2 %s; index names %s; FAQ q %s / a %s; "
            "captions %s; section air %s; hero --d=%.1f, ask --d=%.1f (only these two)"
            % (d2, len(sizes["heads"]), [round(h[1], 1) for h in sizes["heads"]],
               sizes["names"], sizes["q"], sizes["a"], sizes["caps"], sizes["air"],
               sizes["hd"], sizes["ask"]))

        # ---- 11b/c/d SS14.7: the FAQ stop, the caption capitals, the middot ----
        tp = pg.evaluate(r"""()=>{
            const faq=[...document.querySelectorAll('.sec h2')].find(
                e=>/objections/i.test(e.textContent));
            const caps=[...document.querySelectorAll('.prf .cap')].map(e=>e.textContent.trim());
            return {faq:faq?faq.textContent.trim():null, caps:caps};}""")
        chk("14.7-faq-full-stop", bool(tp["faq"]) and tp["faq"].endswith("."),
            "the FAQ head reads %r" % tp["faq"])
        lower = [c for c in tp["caps"] if c and c[0].islower()]
        chk("14.7-captions-initial-capital", not lower,
            "%d index captions, every one opening on a capital: %s"
            % (len(tp["caps"]), [c[:26] for c in tp["caps"]]))

        # SS18 SUPERSEDES THE MIDDOT RULE BY DELETING THE MIDDOT.
        #   "Eyebrow `Operating principles` (label style) 20px above the head `How I work.`
        #   at --d2 on one line (both verbatim halves of the existing string; the middot and
        #   its nowrap go)."
        # There is no separator left to protect, so what is measured instead is the split
        # itself: the eyebrow carries the first half in the label style, the head carries
        # the second half at --d2 on ONE line at every width, the gap between them is 20px,
        # and no section head anywhere on the page still contains a middot. The width-axis
        # assertion survives unchanged -- all five heads on wdth 115.
        HEAD_JS = r"""()=>{
            const sec=[...document.querySelectorAll('#work .sec')][0];
            const eb=sec.querySelector('.eyebrow .l');
            const h=sec.querySelector('h2');
            const ebs=getComputedStyle(eb), hs=getComputedStyle(h);
            const hr=h.getBoundingClientRect(), er=eb.getBoundingClientRect();
            return {eyebrow:eb.textContent.trim(), head:h.textContent.trim(),
                    ebFs:parseFloat(ebs.fontSize), ebTransform:ebs.textTransform,
                    ebVar:ebs.fontVariationSettings,
                    headFs:parseFloat(hs.fontSize), rects:h.getClientRects().length,
                    gap:hr.top-er.bottom,
                    anyMiddot:[...document.querySelectorAll('.sec h2')]
                        .some(e=>e.textContent.indexOf('·')>=0)};}"""
        hd = {}
        for W in (1920, 1440, 1280, 900, 390, 360):
            pg.set_viewport_size({"width": W, "height": 900})
            pg.wait_for_timeout(450)
            pg.evaluate("()=>document.getElementById('work').scrollIntoView({block:'start'})")
            pg.wait_for_timeout(400)
            hd[W] = pg.evaluate(HEAD_JS)
        WW = (1920, 1440, 1280, 900, 390, 360)
        split_ok = all(hd[W]["eyebrow"] == "Operating principles"
                       and hd[W]["head"] == "How I work."
                       and not hd[W]["anyMiddot"]
                       and hd[W]["ebFs"] == 14 and hd[W]["ebTransform"] == "uppercase"
                       and abs(hd[W]["gap"] - 20) <= 2.5
                       for W in WW)
        one_line = all(hd[W]["rects"] == 1 for W in WW)
        pg.set_viewport_size({"width": 1440, "height": 900})
        pg.wait_for_timeout(400)
        axis = pg.evaluate(r"""()=>{const o={};
            document.querySelectorAll('.sec h2').forEach(h=>{
              o[(h.closest('[id]')||{}).id||'?']=getComputedStyle(h).fontVariationSettings;});
            return o;}""")
        one_axis = len(set(axis.values())) == 1 and '"wdth" 115' in set(axis.values()).pop()
        chk("18-work-head-split-eyebrow-and-one-line",
            one_axis and split_ok and one_line,
            "every section head on one width axis: %s (wdth 115 on all five, and zero "
            "middots left in any of them). The how-I-work head, at each width: %s"
            % (json.dumps(axis),
               "; ".join("%d: eyebrow %r at %.0fpx %s, head %r at %.1fpx in %d line(s), "
                         "gap %.1fpx"
                         % (W, hd[W]["eyebrow"], hd[W]["ebFs"], hd[W]["ebTransform"],
                            hd[W]["head"], hd[W]["headFs"], hd[W]["rects"], hd[W]["gap"])
                         for W in WW)))

        # ---- 15.5 the cards, pronounced -------------------------------------
        # SS15.5 supersedes SS14.5/SS14.7 here. The cards get a ground -- 1px hairline at
        # 15% ink, 8px radius, 28px of interior -- the package name comes off the label
        # style onto 24px Hanken 500, and the price goes to 72. SS14.7's gutter pin went
        # with the borderless card it was written for: a bordered box hanging 25px into the
        # page gutter is a mistake, so the row sits in the content width and each card is
        # (content - 48)/3, which is the geometry SS15.3 then borrows for the objections.
        # PASS-104B S5: the price section is now taller (--d2 prices, the seam, the band's
        # own padding) than whatever scroll position the head-split loop above left the
        # page at, so #price's own entrance (cards then, 210ms later, Engagements) is no
        # longer guaranteed to have settled by the time cd/eb are read below -- a bare
        # 400ms wait at the STALE scroll position previously caught the cards risen but
        # Engagements still 20px into its OWN rise, reading a false 44px gapAbove where the
        # rule is 24px. Scroll to the section itself and give both beats (210ms delay +
        # 500ms transition = 710ms) room to finish before reading geometry.
        pg.evaluate("()=>document.getElementById('price').scrollIntoView({block:'center'})")
        pg.wait_for_timeout(1000)
        cd = pg.evaluate(r"""()=>{
            const cards=[].slice.call(document.querySelectorAll('.card'));
            const sec=document.querySelector('.price');
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const content=sec.getBoundingClientRect().width - 2*gut;
            const chipInk=t=>{const q=document.createRange(); q.selectNodeContents(t);
                              return q.getBoundingClientRect().width;};
            const row=document.getElementById('cards').getBoundingClientRect();
            return {w:cards.map(c=>c.getBoundingClientRect().width),
              x:cards.map(c=>+c.getBoundingClientRect().x.toFixed(1)),
              right:cards.map(c=>+c.getBoundingClientRect().right.toFixed(1)),
              chipTops:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().top),
              chipH:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().height),
              chipW:cards.map(c=>c.querySelector('.cta .chip').getBoundingClientRect().width),
              inner:cards.map(c=>{const cs=getComputedStyle(c);
                 return c.getBoundingClientRect().width - parseFloat(cs.paddingLeft)
                        - parseFloat(cs.paddingRight) - parseFloat(cs.borderLeftWidth)
                        - parseFloat(cs.borderRightWidth);}),
              chipT:cards.map(c=>c.querySelector('.cta .chip .t').textContent.trim()),
              chipFits:cards.map(c=>{const t=c.querySelector('.cta .chip .t');
                 return chipInk(t)<=t.getBoundingClientRect().width+0.5;}),
              nameFs:cards.map(c=>parseFloat(getComputedStyle(c.querySelector('.nm')).fontSize)),
              nameFam:cards.map(c=>getComputedStyle(c.querySelector('.nm')).fontFamily),
              nameWt:cards.map(c=>getComputedStyle(c.querySelector('.nm')).fontWeight),
              pr:cards.map(c=>parseFloat(getComputedStyle(c.querySelector('.pr')).fontSize)),
              pad:cards.map(c=>getComputedStyle(c).padding),
              radius:cards.map(c=>getComputedStyle(c).borderRadius),
              borders:cards.map(c=>{const st=getComputedStyle(c);
                 return [st.borderTopWidth+' '+st.borderTopColor,
                         st.borderRightWidth+' '+st.borderRightColor,
                         st.borderBottomWidth+' '+st.borderBottomColor,
                         st.borderLeftWidth+' '+st.borderLeftColor];}),
              mark:cards.map(c=>c.classList.contains('mark')),
              tag:(()=>{const t=document.querySelector('.card.mark .tag');
                 return t?t.textContent.trim():null;})(),
              tagFs:(()=>{const t=document.querySelector('.card.mark .tag');
                 return t?parseFloat(getComputedStyle(t).fontSize):0;})(),
              tagRadius:(()=>{const t=document.querySelector('.card.mark .tag');
                 return t?getComputedStyle(t).borderRadius:'';})(),
              tagBorder:(()=>{const t=document.querySelector('.card.mark .tag');
                 return t?getComputedStyle(t).borderTopWidth+' '
                          +getComputedStyle(t).borderTopColor:'';})(),
              tagOnNameLine:(()=>{const t=document.querySelector('.card.mark .tag');
                 const n=document.querySelector('.card.mark .nm');
                 if(!t||!n) return false;
                 const a=t.getBoundingClientRect(), b=n.getBoundingClientRect();
                 return a.top < b.bottom && a.bottom > b.top && a.x > b.x;})(),
              hairPx:(()=>{const d=document.createElement('div');
                 d.style.cssText='color:var(--hair)';
                 document.querySelector('.price').appendChild(d);
                 const v=getComputedStyle(d).color; d.remove(); return v;})(),
              rowX:+row.x.toFixed(1), rowW:+row.width.toFixed(1),
              d2:0.76*parseFloat(getComputedStyle(document.getElementById('h1')).fontSize),
              content:content, gutter:gut, vw:window.innerWidth};}""")
        wexp = (cd["content"] - 48) / 3.0
        spread = max(cd["chipTops"]) - min(cd["chipTops"])
        widths_eq = max(cd["w"]) - min(cd["w"]) <= 0.8 and abs(cd["w"][0] - wexp) <= 1.0
        # the border is color-mix(ink 15%), which computes to an rgba carrying alpha 0.15
        hair_ok = all(bd.startswith("1px") and "0.15" in bd
                      for i in (0, 2) for bd in cd["borders"][i])
        # PASS-104B S5, item 1: the price is the poster, --d2 -- the section head's own
        # size, read off the page the same way 18-engagements already reads eb["d2"].
        chk("15.5-cards",
            widths_eq and spread <= 2.0
            and all(abs(f - cd["d2"]) < 0.6 for f in cd["pr"])
            and all(abs(f - 24) < 0.6 for f in cd["nameFs"])
            and all("Hanken" in f for f in cd["nameFam"])
            and all(w == "500" for w in cd["nameWt"])
            and all(r == "8px" for r in cd["radius"])
            and all(pp.startswith("28px") or pp == "27px 28px 28px" for pp in cd["pad"])
            and hair_ok
            and all(abs(cw - iw) <= 0.6 for cw, iw in zip(cd["chipW"], cd["inner"]))
            and abs(cd["rowX"] - cd["gutter"]) <= 0.6
            and abs(cd["rowW"] - cd["content"]) <= 1.0,
            "1440: widths %s (each wants (content - 48)/3 = %.1f of a %.0f content); the row "
            "sits IN the content width (x %.1f == the %.0fpx gutter, width %.1f); borders %s "
            "-- 1px at 15%% ink, which computes %s; radius %s; padding %s; name %s at %s / "
            "weight %s; price %s against --d2 %.2f; the chip is the full card interior %s vs "
            "%s; CTA tops spread %.2fpx"
            % ([round(x, 1) for x in cd["w"]], wexp, cd["content"], cd["rowX"], cd["gutter"],
               cd["rowW"], cd["borders"][0], cd["hairPx"], set(cd["radius"]), cd["pad"],
               cd["nameFs"], [f.split(",")[0] for f in cd["nameFam"]], cd["nameWt"], cd["pr"],
               cd["d2"], [round(x, 1) for x in cd["chipW"]],
               [round(x, 1) for x in cd["inner"]], spread))
        marked = [i for i, m in enumerate(cd["mark"]) if m]
        # SS18 REPLACES SS15.5's 2px COPPER TOP RULE. "The Audit carries exactly two
        # devices: a 1px copper border on all four sides and an inline `Start here` pill on
        # the name line; the 2px top rule is deleted." A rule on one edge had to be paid for
        # with a 1px pull-back on the interior to keep the three card interiors on one line;
        # a border on four sides costs nothing and reads as the marked card at any angle.
        cop = "200, 84, 43"
        mark_ok = (marked == [1]
                   and all(bd.startswith("1px") and cop in bd for bd in cd["borders"][1])
                   and not any(cop in bd for i in (0, 2) for bd in cd["borders"][i]))
        chk("18-audit-copper-border-and-pill", mark_ok and cd["tag"] is not None
            and cd["tag"] == "Start here" and cd["tagOnNameLine"]
            and cd["tagRadius"] == "999px" and abs(cd["tagFs"] - 12) < 0.6
            and cop in cd["tagBorder"],
            "the Audit's four borders are %s -- 1px copper on ALL FOUR, which is SS18's "
            "first device, and the other two cards keep the hairline (%s / %s). The second "
            "device is the pill %r on the NAME line (same row as the name: %s), %.0fpx, "
            "radius %s, border %s"
            % (cd["borders"][1], cd["borders"][0], cd["borders"][2], cd["tag"],
               cd["tagOnNameLine"], cd["tagFs"], cd["tagRadius"], cd["tagBorder"]))
        pk = open(PACKAGES, encoding="utf-8").read()
        live = re.findall(r'(?<!aria-)label="([^"]*)"', pk)
        chk("14.7-chip-labels-are-the-live-buttons",
            cd["chipT"] == live and all(cd["chipFits"]),
            "the three card chips read %s; app/(room)/packages/page.tsx renders %s "
            "(BuyButton appends the arrow, which the chip carries as its own glyph); each "
            "label fits its chip without clipping: %s"
            % (cd["chipT"], live, cd["chipFits"]))

        # ---- 15.5b Engagements: the top tier ---------------------------------
        eb = pg.evaluate(r"""()=>{const e=document.getElementById('ebar');
            const r=e.getBoundingClientRect(), cs=getComputedStyle(e);
            const cards=document.querySelector('.cards').getBoundingClientRect();
            const hd=e.querySelector('.hd'), v=e.querySelector('.v');
            const dsc=e.querySelector('.dsc'), chip=e.querySelector('.chip');
            const d2=0.76*parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const runs=[];
            const w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
            let n; while((n=w.nextNode())){
              const t=n.textContent.replace(/\s+/g,' ').trim(); if(!t) continue;
              const el=n.parentElement, st=getComputedStyle(el);
              runs.push({t:t, color:st.color, fs:parseFloat(st.fontSize),
                         hidden:!!el.closest('[aria-hidden="true"]'),
                         bg:(()=>{let q=el; while(q&&q!==document.body){
                            const c=getComputedStyle(q).backgroundColor;
                            if(c && c!=='rgba(0, 0, 0, 0)' && c!=='transparent') return c;
                            q=q.parentElement;} return 'rgb(13, 13, 15)';})()});}
            return {tag:e.tagName, href:e.getAttribute('href'),
                    links:e.querySelectorAll('a').length,
                    h:r.height, w:r.width, gapAbove:r.top-cards.bottom, cardsW:cards.width,
                    radius:cs.borderRadius, bg:cs.backgroundColor, color:cs.color,
                    bt:cs.borderTopWidth+' '+cs.borderTopColor,
                    bo:[cs.borderRightWidth,cs.borderBottomWidth,cs.borderLeftWidth],
                    hdFs:parseFloat(getComputedStyle(hd).fontSize), d2:d2,
                    hdFam:getComputedStyle(hd).fontFamily,
                    hdWt:getComputedStyle(hd).fontWeight,
                    hdTxt:hd.textContent.trim(),
                    pad:cs.padding,
                    hdX:hd.getBoundingClientRect().x,
                    dscFs:parseFloat(getComputedStyle(dsc).fontSize),
                    vFs:parseFloat(getComputedStyle(v).fontSize),
                    vRight:v.getBoundingClientRect().right,
                    chipT:chip.textContent.replace(/\s+/g,' ').trim(),
                    chipRight:chip.getBoundingClientRect().right,
                    mid:r.x+r.width/2, runs:runs};}""")

        def run_ratio(rr):
            return ratio(lum(*parse_rgb(rr["color"])), lum(*parse_rgb(rr["bg"])))

        runs = [(rr["t"][:34], round(run_ratio(rr), 2), rr["fs"], rr["hidden"])
                for rr in eb["runs"]]
        # Every WORD run has to clear 4.5. The one decorative glyph is the chip's arrow: it
        # is aria-hidden, it is 24px (large text) and it is bone on copper, which is the
        # accent's own ceiling -- SS11 already ruled copper large text at >= 3:1, and no
        # tuning moves it, because copper reaches only 4.41 against espresso and 3.85
        # against bone. It is reported by name at its measured ratio, never folded in.
        words = [rr for rr in eb["runs"] if not rr["hidden"]]
        glyphs = [rr for rr in eb["runs"] if rr["hidden"]]
        worst_word = min([run_ratio(rr) for rr in words] or [0])
        worst_glyph = min([run_ratio(rr) for rr in glyphs] or [99])
        # SS18: "Engagements is the fourth object in the SAME system: one block the width
        # of the three cards, 24px below, 8px radius, 28px padding, espresso ground,
        # `Engagements` at 24px Hanken 500 bone (not --d2), the descriptor at 17px, `From
        # $5K a month` at --d2 bone in the price's slot, one chip right; height by content.
        # Special by ground, connected by grammar." PASS-104B S5, item 6: the figures are
        # now --d2, the same register the cards use -- read the same way cd["d2"] is above.
        # So the three things SS15.5 used to assert are exactly the three SS18 deleted: the
        # 220px floor (which opened a band of empty espresso across the middle), the 16px
        # radius, and the 2px copper top rule. What replaces them is the CARD's grammar.
        chk("18-engagements-is-the-fourth-card",
            eb["tag"] == "A" and eb["links"] == 0
            and abs(eb["w"] - eb["cardsW"]) <= 1.0
            and abs(eb["gapAbove"] - 24) <= 1.0 and eb["radius"] == "8px"
            and eb["pad"].startswith("28px")
            and all(x == "0px" or x == "1px" for x in eb["bo"])
            and "200, 84, 43" not in eb["bt"]
            and "13, 13, 15" in eb["bg"]
            and abs(eb["hdFs"] - 24) < 0.6 and "Hanken" in eb["hdFam"]
            and eb["hdWt"] == "500"
            and abs(eb["dscFs"] - 17) < 0.6
            and abs(eb["vFs"] - eb["d2"]) < 0.6
            and eb["hdX"] < eb["mid"] and eb["chipRight"] > eb["mid"]
            and worst_word >= 4.5 and worst_glyph >= 3.0,
            "one <%s> with %d links inside it -> %s; %.1fpx wide == the cards row %.1f, "
            "%.1fpx below it; radius %s (the cards' 8px, not the slab's 16px); padding %s "
            "(the cards' 28px); NO copper top rule (%s); height %.0fpx, by content, not a "
            "220px floor; ground %s; the name %r at %.1fpx %s weight %s (the card's name "
            "slot, not --d2 %.1f), the price slot at %.0fpx, the sentence at %.0fpx, one "
            "chip %r on the right; every word run >= %.2f:1 and the one aria-hidden arrow "
            "at %.2f:1. Runs: %s"
            % (eb["tag"], eb["links"], eb["href"], eb["w"], eb["cardsW"], eb["gapAbove"],
               eb["radius"], eb["pad"], eb["bt"], eb["h"], eb["bg"], eb["hdTxt"],
               eb["hdFs"], eb["hdFam"].split(",")[0], eb["hdWt"], eb["d2"], eb["vFs"],
               eb["dscFs"], eb["chipT"], worst_word, worst_glyph, runs))

        # ---- SS18 the objections: the head in cols 1-5, ONE list from the seam -------
        # SS15.3's three equal columns are what the critique measured as "three ragged
        # feet", under a head alone on two lines with the whole right half of the band
        # empty. SS18: "the head stays in cols 1-5, the list is ONE column from x = 600
        # (Rule B): each row padding 30px 0, hairline bottom, a 24px copper arrow cell ahead
        # of the question, question 24px/1.2 Hanken 500, answer 17px/1.5 at 80% ink beneath,
        # max 60ch. Rows close on their own hairlines; no ragged feet."
        fq = pg.evaluate(r"""()=>{
            const qs=[].slice.call(document.querySelectorAll('.q'));
            const sec=document.querySelector('.faq');
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const content=sec.getBoundingClientRect().width-2*gut;
            const gap=parseFloat(getComputedStyle(sec).columnGap);
            const col=(content-11*gap)/12;
            const dl=document.querySelector('.qs');
            const head=document.querySelector('.faq .sec');
            const arrow=getComputedStyle(qs[0],'::after');
            return {n:qs.length, w:qs.map(e=>+e.getBoundingClientRect().width.toFixed(2)),
                    x:qs.map(e=>+e.getBoundingClientRect().x.toFixed(1)),
                    tops:qs.map(e=>Math.round(e.getBoundingClientRect().top)),
                    rule:qs.map(e=>{const c=getComputedStyle(e);
                       return c.borderBottomWidth+' '+c.borderBottomStyle;}),
                    pad:qs.map(e=>getComputedStyle(e).paddingBottom),
                    dt:qs.map(e=>parseFloat(getComputedStyle(e.querySelector('dt')).fontSize)),
                    dd:qs.map(e=>parseFloat(getComputedStyle(e.querySelector('dd')).fontSize)),
                    ddColor:getComputedStyle(qs[0].querySelector('dd')).color,
                    arrowColor:arrow.color, arrowContent:arrow.content,
                    listX:+dl.getBoundingClientRect().x.toFixed(1),
                    listW:+dl.getBoundingClientRect().width.toFixed(1),
                    headX:+head.getBoundingClientRect().x.toFixed(1),
                    headW:+head.getBoundingClientRect().width.toFixed(1),
                    wantSeam:+(gut+5*col+5*gap).toFixed(1),
                    wantLane:+(7*col+6*gap).toFixed(1),
                    wantHead:+(5*col+4*gap).toFixed(1), content:content};}""")
        # PASS-104B S6: three rows, so three distinct tops. This is the SECOND place
        # inside the gate the brief names ("18-objections-one-lane-from-the-seam
        # fq['n'] == 2 becomes 3") where the old count of two was written down.
        stacked = len(set(fq["tops"])) == 3
        chk("18-objections-one-lane-from-the-seam",
            fq["n"] == 3 and stacked
            and max(fq["w"]) - min(fq["w"]) <= 1.0
            and abs(fq["listX"] - fq["wantSeam"]) <= 1.5
            and abs(fq["listW"] - fq["wantLane"]) <= 1.5
            and abs(fq["headW"] - fq["wantHead"]) <= 1.5
            and all(r == "1px solid" for r in fq["rule"])
            and all(abs(x - 28) < 0.6 for x in fq["dt"])
            and all(abs(x - 19) < 0.6 for x in fq["dd"])
            and "200, 84, 43" in fq["arrowColor"],
            "1440: THREE rows in ONE column, stacked (tops %s), every row the lane's own "
            "width %s; the lane opens at x %.1f -- the column-6 seam is %.1f (Rule B) -- and "
            "runs %.1f against the cols 6-12 span %.1f, with the head holding cols 1-5 "
            "(%.1f vs %.1f); each row closes on its own %s hairline; questions %s / answers "
            "%s at %s; the copper arrow cell is %s %s"
            % (fq["tops"], fq["w"], fq["listX"], fq["wantSeam"], fq["listW"],
               fq["wantLane"], fq["headW"], fq["wantHead"], set(fq["rule"]), fq["dt"],
               fq["dd"], fq["ddColor"], fq["arrowContent"], fq["arrowColor"]))

        # ---- SS11 the bar over the copper field is espresso with bone labels --
        pg.evaluate("""()=>{const a=document.getElementById('contact');
            window.scrollTo(0, a.offsetTop + 240);}""")
        pg.wait_for_timeout(700)
        barm = pg.evaluate("""()=>{const b=document.getElementById('bar');
            const cs=getComputedStyle(b);
            const px=c=>{const cv=document.createElement('canvas');cv.width=cv.height=1;
                const x=cv.getContext('2d');x.clearRect(0,0,1,1);x.fillStyle=c;
                x.fillRect(0,0,1,1);return [...x.getImageData(0,0,1,1).data];};
            const ls=[].map.call(b.querySelectorAll('.l'),
                e=>px(getComputedStyle(e).color));
            const bgpx=px(cs.backgroundColor);
            const a=document.getElementById('contact').getBoundingClientRect();
            return {dark:b.classList.contains('dark'), bg:cs.backgroundColor, ls:ls,
                    askUnderBar:(a.top<=b.getBoundingClientRect().height && a.bottom>=0),
                    bgpx:bgpx};}""")
        # the label tints are color-mix()es with alpha; composite each over the bar's own
        # ground before measuring, or the ratio is meaningless.
        bg = barm["bgpx"][:3]
        worst = 99.0
        for c in barm["ls"]:
            al = c[3] / 255.0
            over = [c[i] * al + bg[i] * (1 - al) for i in range(3)]
            worst = min(worst, ratio(lum(*bg), lum(*over)))
        chk("11-bar-over-ask",
            barm["askUnderBar"] and barm["dark"] and "13, 13, 15" in barm["bg"]
            and worst >= 4.5,
            "with the copper field under it the bar paints %s (dark=%s); worst label "
            "contrast %.2f:1 (>=4.5). Not copper, not bone." % (barm["bg"], barm["dark"], worst))

        # ---- 15.4 how I work: the ledger, and nothing else -------------------
        # SS15.4 removes the three framed panels, the redrawn page-6 SVG and the sticky
        # rail outright. What is asserted is first the ABSENCE -- zero .panel, zero <svg>,
        # zero <img>/<video>, zero position:sticky inside #work -- and then the three rows.
        wk = pg.evaluate(r"""()=>{
            const sec=document.getElementById('work');
            const sticky=[].slice.call(sec.querySelectorAll('*')).filter(
                e=>/sticky|fixed/.test(getComputedStyle(e).position))
                .map(e=>e.tagName+'.'+e.className);
            const rows=[].slice.call(sec.querySelectorAll('.steps li'));
            const secR=sec.getBoundingClientRect();
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const d2=0.76*parseFloat(getComputedStyle(document.getElementById('h1')).fontSize);
            const mid=secR.x+gut+(secR.width-2*gut)/2;
            return {panels:sec.querySelectorAll('.panel,[data-panel]').length,
                    svg:sec.querySelectorAll('svg').length,
                    img:sec.querySelectorAll('img').length,
                    video:sec.querySelectorAll('video').length,
                    sticky:sticky, n:rows.length, d2:d2, mid:mid,
                    ord:rows.map(r=>r.querySelector('.n').textContent.trim()),
                    ordFam:rows.map(r=>getComputedStyle(r.querySelector('.n')).fontFamily),
                    ordFs:rows.map(r=>parseFloat(getComputedStyle(r.querySelector('.n')).fontSize)),
                    ordTr:rows.map(r=>getComputedStyle(r.querySelector('.n')).textTransform),
                    nm:rows.map(r=>r.querySelector('.nm').textContent.trim()),
                    nmFs:rows.map(r=>parseFloat(getComputedStyle(r.querySelector('.nm')).fontSize)),
                    sFs:rows.map(r=>parseFloat(getComputedStyle(r.querySelector('.s')).fontSize)),
                    sX:rows.map(r=>+r.querySelector('.s').getBoundingClientRect().x.toFixed(1)),
                    ordW:rows.map(r=>+r.querySelector('.n')
                        .getBoundingClientRect().width.toFixed(1)),
                    ordColor:getComputedStyle(rows[0].querySelector('.n')).color,
                    seam:(()=>{const g=parseFloat(getComputedStyle(sec).columnGap)||24;
                        const content=secR.width-2*gut;
                        const col=(content-11*g)/12;
                        return +(secR.x+gut+5*col+5*g).toFixed(1);})(),
                    sMeasure:rows.map(r=>getComputedStyle(r.querySelector('.s')).maxWidth),
                    // PASS-101: the mock measured `ch` by copying the `font` shorthand
                    // onto a probe span. On the site that shorthand serializes EMPTY --
                    // globals.css sets font-feature-settings on <html>, and the `font`
                    // shorthand resets it, so CSSOM refuses to serialize it. The probe
                    // then measured a 16px serif '0' and read the 46ch measure as 60.32.
                    // The individual properties are copied instead, which is what the
                    // shorthand was standing in for.
                    sCh:rows.map(r=>{const e=r.querySelector('.s');
                       const cs=getComputedStyle(e);
                       const m=document.createElement('span');
                       m.textContent='0';
                       m.style.cssText='position:absolute;visibility:hidden;white-space:pre';
                       m.style.fontFamily=cs.fontFamily; m.style.fontSize=cs.fontSize;
                       m.style.fontWeight=cs.fontWeight; m.style.fontStyle=cs.fontStyle;
                       m.style.fontStretch=cs.fontStretch;
                       m.style.letterSpacing=cs.letterSpacing;
                       m.style.fontVariationSettings=cs.fontVariationSettings;
                       document.body.appendChild(m);
                       const ch=m.getBoundingClientRect().width; m.remove();
                       return +(parseFloat(cs.maxWidth)/ch).toFixed(2);}),
                    rule:rows.map(r=>getComputedStyle(r).borderTopWidth+' '
                                     +getComputedStyle(r).borderTopStyle),
                    lastRule:getComputedStyle(rows[2]).borderBottomWidth,
                    w:rows.map(r=>+r.getBoundingClientRect().width.toFixed(1)),
                    contentW:+(secR.width-2*gut).toFixed(1)};}""")
        chk("15.4-work-ledger",
            wk["panels"] == 0 and wk["svg"] == 0 and wk["img"] == 0 and wk["video"] == 0
            and not wk["sticky"] and wk["n"] == 3
            and wk["ord"] == ["01", "02", "03"]
            and all(t == "uppercase" for t in wk["ordTr"])
            and all(abs(f - wk["d2"]) < 1.0 for f in wk["nmFs"])
            and all(abs(f - 21) < 0.6 for f in wk["sFs"])
            # SS18 Rule B: the sentence lane opens on the column-6 seam, not merely in
            # the right half. The seam is computed from the section's own grid.
            and all(abs(x - wk["seam"]) <= 1.5 for x in wk["sX"])
            # SS18: "the ordinal in a 28px cell at 60% ink".
            and all(abs(w - 28) <= 0.6 for w in wk["ordW"])
            # computed style resolves ch to px, so the measure is divided back out by the
            # element's own '0' advance and asserted as 46 characters.
            and all(abs(c - 46) <= 0.5 for c in wk["sCh"])
            and all(r == "1px solid" for r in wk["rule"])
            and wk["lastRule"] == "1px"
            and all(abs(x - wk["contentW"]) <= 1.0 for x in wk["w"]),
            "#work now holds %d .panel, %d <svg>, %d <img>, %d <video> and %d "
            "sticky/fixed elements %s -- SS15.4 wants zero of each. Three full-width rows "
            "(%s of a %.0f content): ordinals %s in the label style (%s at %s, %s), the step "
            "names %s at %s == --d2 %.1f, and each sentence at %s on a %s measure (%s = 46ch) "
            "starting "
            "at x %s against the column-6 seam %.1f (SS18 Rule B); hairlines %s, the "
            "ledger closing on a %s rule"
            % (wk["panels"], wk["svg"], wk["img"], wk["video"], len(wk["sticky"]),
               wk["sticky"] or "[]", wk["w"], wk["contentW"], wk["ord"],
               [f.split(",")[0] for f in wk["ordFam"]], wk["ordFs"], set(wk["ordTr"]),
               wk["nm"], [round(x, 1) for x in wk["nmFs"]], wk["d2"], wk["sFs"],
               wk["sCh"], set(wk["sMeasure"]), wk["sX"], wk["seam"], set(wk["rule"]),
               wk["lastRule"]))

        # ---- PASS-104B SS4 how I work: the spine and the doors ----------------
        # The spine is Rule B's line, finally drawn -- .steps::before at
        # x = var(--lane) + var(--gap), the SAME x the objections list (.qs) and
        # the receipts' caption column (.prf .cap) already open on. The gate:
        # the element that finally draws Rule B must not be the element that
        # breaks it. Also asserts the three doors (rows as <a>, zero new copy,
        # the three destinations) and the .42 rest-to-1 name lighting.
        spine = pg.evaluate(r"""()=>{
            const steps=document.querySelector('.steps');
            const stepsR=steps.getBoundingClientRect();
            const cs=getComputedStyle(steps, '::before');
            const spineX=+(stepsR.x+parseFloat(cs.left)).toFixed(1);
            const qs=document.querySelector('.qs');
            const qsX=qs?+qs.getBoundingClientRect().x.toFixed(1):null;
            const cap=document.querySelector('.prf .cap');
            const capX=cap?+cap.getBoundingClientRect().x.toFixed(1):null;
            const rows=[].slice.call(document.querySelectorAll('.steps li'));
            const links=rows.map(r=>r.querySelector('a'));
            const arrows=rows.map(r=>r.querySelector('.ar'));
            return {
                spineBg:cs.backgroundColor,
                spineX:spineX, qsX:qsX, capX:capX,
                hrefs:links.map(a=>a?a.getAttribute('href'):null),
                arCount:rows.reduce((n,r)=>n+r.querySelectorAll('.ar').length,0),
                arColor:arrows[0]?getComputedStyle(arrows[0]).color:null,
                nmOpacity:rows.map(r=>getComputedStyle(r.querySelector('.nm')).opacity),
            };}""")
        chk("18-work-spine-x-matches-objections-and-receipts",
            spine["qsX"] is not None and spine["capX"] is not None
            and abs(spine["spineX"] - spine["qsX"]) <= 1.5
            and abs(spine["spineX"] - spine["capX"]) <= 1.5
            and "200, 84, 43" not in spine["spineBg"],
            "spine x %.1f vs .qs x %s and .prf .cap x %s (SS4 gate: all three open "
            "on the column-6 seam); spine background %s (must not be copper)"
            % (spine["spineX"], spine["qsX"], spine["capX"], spine["spineBg"]))
        chk("18-work-doors-three-links-named-destinations",
            spine["hrefs"] == ["/call", "#price", "#proof"]
            and spine["arCount"] == 3
            and spine["arColor"] and "200, 84, 43" in spine["arColor"],
            "row hrefs %s (want /call, #price, #proof), %d copper arrow glyphs, "
            "arrow color %s" % (spine["hrefs"], spine["arCount"], spine["arColor"]))
        # nmOpacity above was read AFTER #work was already scrolled into view for an
        # earlier check (SS18-work-head), so it reads the LIT value, not the rest
        # value -- a fresh, unscrolled page is needed to see .42 before #work.in fires.
        restp = ctx.new_page()
        restp.goto(url)
        restp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        restp.wait_for_timeout(600)
        rest_nm = restp.evaluate(
            r"""()=>[].slice.call(document.querySelectorAll('.steps .nm'))
                .map(e=>getComputedStyle(e).opacity)""")
        restp.close()
        chk("18-work-names-rest-at-042",
            all(abs(float(o) - 0.42) < 0.02 for o in rest_nm),
            "html.rl-js pre-#work.in .nm opacity values %s on a freshly loaded, "
            "unscrolled page (SS4: rest at .42 before lighting to 1)" % (rest_nm,))

        # ---- 15.6 the record index, consolidated -----------------------------
        # SS15.6 supersedes SS14.3's seven-row ledger: two receipts and a way out.
        rec = pg.evaluate(r"""()=>{
            const rows=[].slice.call(document.querySelectorAll('.prf'));
            const more=[].slice.call(document.querySelectorAll('.prfx'));
            const head=document.querySelector('#proof .sec h2').textContent.trim();
            const geo=e=>{const b=e.getBoundingClientRect(), c=getComputedStyle(e);
                return {h:Math.round(b.height), rule:c.borderBottomWidth+' '
                        +c.borderBottomStyle, x:Math.round(b.x),
                        w:Math.round(b.width)};};
            const sec=document.querySelector('.proofsec');
            const secR=sec.getBoundingClientRect();
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const g=parseFloat(getComputedStyle(sec).columnGap)||24;
            const content=secR.width-2*gut;
            const col=(content-11*g)/12;
            const ledger=document.querySelector('.proofsec .ledger');
            const cnt=document.querySelector('#proof .sec .eyebrow .count');
            return {head:head,
              count:cnt?cnt.textContent.trim():null,
              lane:+(5*col+4*g).toFixed(1),
              seam:+(secR.x+gut+5*col+5*g).toFixed(1),
              prf:rows.map(e=>({tag:e.tagName, href:e.getAttribute('href')||'',
                 who:e.querySelector('.who').textContent.trim(),
                 cap:e.querySelector('.cap').textContent.trim(),
                 whoFs:parseFloat(getComputedStyle(e.querySelector('.who')).fontSize),
                 capFs:parseFloat(getComputedStyle(e.querySelector('.cap')).fontSize),
                 whoW:e.querySelector('.who').getBoundingClientRect().width,
                 capX:e.querySelector('.cap').getBoundingClientRect().x,
                 arW:+e.querySelector('.ar').getBoundingClientRect().width.toFixed(1),
                 reserve:getComputedStyle(e).borderTopWidth,
                 arrow:!!e.querySelector('.ar'), geo:geo(e)})),
              more:more.map(e=>({tag:e.tagName, href:e.getAttribute('href')||'',
                 who:e.querySelector('.who').textContent.trim(),
                 arrow:(e.querySelector('.ar')||{}).textContent,
                 radius:getComputedStyle(e).borderRadius,
                 gapAbove:e.getBoundingClientRect().top-ledger.getBoundingClientRect().bottom,
                 geo:geo(e)}))};}""")
        prf = rec["prf"]
        allink = all(r["tag"] == "A" and r["href"] and r["arrow"] for r in prf)
        stops = [r["cap"] for r in prf if r["cap"].endswith(".")]
        names = [r["who"] for r in prf]
        more = rec["more"]
        # PASS-101 / SS17, operator 2026-09-06, verbatim: "receipts - we should add the
        # content ai part to the list so we have three". SS15.6's two-row consolidation is
        # superseded, and that ruling names this pass: "Binds v7 and Pass 101." Everything
        # else about the section -- the row geometry, the hairlines, the sizes, the
        # row-shaped way out -- is unchanged, so only the count and the names move.
        # SS18 recomposes the ROW and the way out. "row 72px, name cols 1-5 at 28px 100%
        # ink, caption from x = 600 at 28px 60% ink (one size; rank by colour and column),
        # the arrow in a 32px cell flush right; 2px transparent top/bottom borders reserved
        # so the copper hover rule causes no shift. The head carries the count. `See the
        # rest` stops being a row: a pill (14px label, 1px ink-40% border, radius 999, 40px
        # tall, padding 0 20px) 32px under the ledger, left-aligned."
        #   THE COUNT. SS18's draft wrote `07`, a number from the mock. The repo holds FOUR
        # non-stub case studies and the pill lands on the index that lists exactly those
        # four, so the component reads the count from lib/case-studies.ts and this check
        # reads it from the same directory. A count is a fact.
        want_count = "%02d" % len([
            f for f in os.listdir(WORK)
            if f.endswith(".mdx")
            and "status: stub" not in open(
                os.path.join(WORK, f), encoding="utf-8").read()])
        chk("18-receipts-ledger-and-the-way-out",
            len(prf) == 3 and names == ["Guardicore",
                                        "RFP engine for an industry author",
                                        "AI content engine for an industry author"]
            and allink and not stops
            and all(abs(r["whoFs"] - 28) < 0.6 for r in prf)
            and all(abs(r["capFs"] - 28) < 0.6 for r in prf)
            and all(r["geo"]["h"] >= 72 for r in prf)
            and all(abs(r["whoW"] - rec["lane"]) <= 1.5 for r in prf)
            and all(abs(r["capX"] - rec["seam"]) <= 1.5 for r in prf)
            and all(abs(r["arW"] - 32) <= 0.6 for r in prf)
            and all(r["reserve"] == "2px" for r in prf)
            and len(more) == 1 and more[0]["tag"] == "A"
            and more[0]["who"] == "See the rest"
            and more[0]["arrow"] == "→"
            and more[0]["href"] == "/work"
            and more[0]["geo"]["h"] == 40
            and more[0]["radius"] == "999px"
            and abs(more[0]["gapAbove"] - 32) <= 1.5
            and abs(more[0]["geo"]["x"] - prf[0]["geo"]["x"]) <= 1.0
            and more[0]["geo"]["w"] < prf[0]["geo"]["w"]
            and rec["head"] == "The receipts. Every line below is real."
            and rec["count"] == want_count,
            "exactly %d .prf rows -- %s -- each a link carrying an arrow (%s), %spx tall; "
            "name and caption at ONE size (%s / %s), the name holding the cols 1-5 lane "
            "(%s vs %.1f) and the caption opening on the column-6 seam (%s vs %.1f), the "
            "arrow in a %s cell, 2px reserved top and bottom (%s) so the copper hover rule "
            "cannot shift the row; zero captions ending in a full stop (tails %s). The way "
            "out is a PILL, not a fourth row: %r + %r to %s, %dpx tall at radius %s, %.0fpx "
            "under the ledger, on the ledger's own left edge (%d vs %d) and narrower than "
            "it (%d vs %d). The head is unchanged (%r) and carries the count %r, which is "
            "the number of non-stub case studies in content/work (%r)"
            % (len(prf), names, allink, [r["geo"]["h"] for r in prf],
               [r["whoFs"] for r in prf], [r["capFs"] for r in prf],
               [round(r["whoW"], 1) for r in prf], rec["lane"],
               [round(r["capX"], 1) for r in prf], rec["seam"],
               [r["arW"] for r in prf], set(r["reserve"] for r in prf),
               [r["cap"][-24:] for r in prf],
               more[0]["who"], more[0]["arrow"], more[0]["href"], more[0]["geo"]["h"],
               more[0]["radius"], more[0]["gapAbove"], more[0]["geo"]["x"],
               prf[0]["geo"]["x"], more[0]["geo"]["w"], prf[0]["geo"]["w"],
               rec["head"], rec["count"], want_count))

        # ---- 15 hero rows ----------------------------------------------------
        pg.evaluate("()=>window.scrollTo(0,0)")
        pg.wait_for_timeout(400)
        rows = pg.evaluate("""()=>{const rs=[].slice.call(document.querySelectorAll('#h1 .r'));
            const c=document.getElementById('herocopy').getBoundingClientRect();
            return rs.map(r=>({t:r.textContent.trim(),w:r.getBoundingClientRect().width,
                               n:r.getClientRects().length,avail:c.width}));}""")
        chk("hero-rows-1440",
            all(r["n"] == 1 and r["w"] <= r["avail"] for r in rows),
            "; ".join("%r %.0fpx in %.0fpx, %d client rect"
                      % (r["t"], r["w"], r["avail"], r["n"]) for r in rows))

        # ---- 17 media / 18 discipline ---------------------------------------
        med = pg.evaluate("""()=>{const vs=[].slice.call(document.querySelectorAll('video'));
            return vs.map(v=>({id:v.id,muted:v.muted,loop:v.loop,preload:v.preload,
                playsinline:v.hasAttribute('playsinline'),poster:!!v.getAttribute('poster'),
                srcs:v.querySelectorAll('source').length,rs:v.readyState,
                types:[...v.querySelectorAll('source')].map(x=>x.type),
                urls:[...v.querySelectorAll('source')].map(x=>x.getAttribute('src'))}));}""")
        # Operator, 2026-09-06: the published MOCK did not load for him, so it inlined ONE
        # 720 mp4 per clip as a data URI. PASS-101 serves both cuts as FILES, webm then mp4,
        # which is what the pass brief SS1 asks for and what SS7's rejected list demands.
        # SS15.1's preload="auto" stands on both: "i see no vids", twice.
        # PASS-101 PERF: the two clips no longer share a preload. The HERO keeps
        # "auto" -- it is the first screen and the clip "i see no vids" was about.
        # Clip B is below the fold and was the heaviest file on the page; it goes
        # to "none" and is started by the observer or by the first gesture, which
        # 15.1-gesture-plays-both measures directly. Both still reach readyState
        # >= 2 with a poster, two sources and a webm-first order.
        chk("media", len(med) == 2 and all(m["muted"] and m["playsinline"] and m["poster"]
                                           and m["srcs"] == 2 and m["rs"] >= 2
                                           and m["types"] == ["video/webm", "video/mp4"]
                                           and all(u.startswith("/video/")
                                                   for u in m["urls"])
                                           for m in med)
            and med[0]["preload"] == "auto" and med[1]["preload"] == "none"
            and med[0]["loop"] is False and med[1]["loop"] is True,
            json.dumps(med))

        # ---- SS14.8 the page has to render with scripting OFF ----------------
        # Every SS15 section is CSS-only, and the headline still lands on the finger from
        # :root's measured percentages alone. Asserted in a context with JavaScript
        # DISABLED, which is the only faithful probe of that claim.
        nctx = br.new_context(viewport={"width": 1440, "height": 900},
                              java_script_enabled=False, device_scale_factor=1)
        np_ = nctx.new_page()
        np_.goto(url)
        np_.wait_for_timeout(2500)
        # evaluate() cannot run with scripting off, so the render is read through the
        # protocol instead: bounding boxes and element counts, driven out-of-process.
        h1b = np_.locator("#h1").bounding_box()
        stg = np_.locator("#stage").bounding_box()
        rows_n = np_.locator("#h1 .r").count()
        cards_n = np_.locator(".card").count()
        steps_n = np_.locator(".steps li").count()
        qs_n = np_.locator(".q").count()
        prf_n = np_.locator(".prf").count()
        more_n = np_.locator(".prfx").count()
        eng_b = np_.locator("#ebar").bounding_box()
        cu_b = np_.locator("#h1 .r.cu").bounding_box()
        barvis = np_.locator("#bar").is_visible()
        nctx.close()
        # the fingertip, from CSS alone: 19.375% across and 38.2407% down the 16:9 stage.
        ftx = stg["x"] + stg["width"] * 0.19375
        fty = stg["y"] + stg["height"] * 0.382407
        chk("14.8-renders-with-javascript-off",
            # PASS-104B S6 makes the objections THREE rows. The brief names this 2->3
            # count for 18-objections-mobile and does not name it here; same fact,
            # same page, so it moves with it. Still an exact count.
            rows_n == 2 and cards_n == 3 and steps_n == 3 and qs_n == 3
            and prf_n == 3 and more_n == 1 and barvis
            and abs(stg["width"] * 9 / 16 - stg["height"]) <= 1.5
            and h1b["x"] < ftx and ftx - h1b["x"] <= 60
            # SS16.2: the row whose cap-top is pinned 4px under the tip is the COPPER one.
            # .r is display:block at line-height .92, so --d is its height / .92 and the
            # cap-top is --capk of that below the box top.
            and abs((cu_b["y"] + 0.0591 * cu_b["height"] / 0.92) - (fty + 4)) <= 2.0
            # SS18 deleted the 220px floor ("height by content"), so what is asserted
            # here is that the block RENDERS with scripting off, not that it is tall.
            and eng_b["height"] > 0,
            "scripting DISABLED: the 16:9 stage is %.0fx%.0f and the headline block starts "
            "at (%.0f, %.0f) against the CSS-only fingertip (%.0f, %.0f) -- %.0fpx to its "
            "left and the copper row's cap-top at %.1f, %+.1fpx off the tip, from :root's "
            "measured percentages and nothing else; %d headline rows, "
            "%d cards, %d ledger rows, %d objection columns, %d receipts (SS17: three) "
            "+ %d 'see the "
            "rest' link, the engagements block %.0fpx tall, "
            "and the bar visible=%s (the <noscript> rule opens it)"
            % (stg["width"], stg["height"], h1b["x"], h1b["y"], ftx, fty, ftx - h1b["x"],
               cu_b["y"] + 0.0591 * cu_b["height"] / 0.92,
               cu_b["y"] + 0.0591 * cu_b["height"] / 0.92 - fty,
               rows_n, cards_n, steps_n, qs_n, prf_n, more_n, eng_b["height"],
               barvis))

        # ---- 15.1 the gesture handler ---------------------------------------
        # Both clips are paused by hand first (the observer only fires on an intersection
        # CHANGE, so a programmatic pause is not undone by it) and then ONE synthetic wheel
        # event is dispatched. Nothing else can start them, so what plays after it is the
        # SS15.1 handler and only the handler. The viewport is tall enough that the operator
        # square is >= 35% visible at scrollY 0, which is the handler's own gate.
        gctx = br.new_context(viewport={"width": 1440, "height": 2400},
                              device_scale_factor=1, reduced_motion="no-preference")
        gp = gctx.new_page()
        gp.goto(url)
        gp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        gp.wait_for_timeout(2500)
        before = gp.evaluate("""()=>{
            const a=document.getElementById('filmvid'), b=document.getElementById('opvid');
            a.pause(); a.currentTime=0; b.pause();
            const r=document.getElementById('opstage').getBoundingClientRect();
            const vis=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0))/r.height;
            return {a:a.paused, b:b.paused, ended:a.ended, opVisible:+vis.toFixed(3),
                    preload:[a.preload,b.preload]};}""")
        gp.wait_for_timeout(300)
        gp.evaluate("()=>window.dispatchEvent(new WheelEvent('wheel',{deltaY:1,bubbles:true}))")
        gp.wait_for_timeout(1200)
        after = gp.evaluate("""()=>{
            const a=document.getElementById('filmvid'), b=document.getElementById('opvid');
            return {a:a.paused, b:b.paused, at:+a.currentTime.toFixed(2),
                    bt:+b.currentTime.toFixed(2)};}""")
        gctx.close()
        chk("15.1-gesture-plays-both",
            before["a"] and before["b"] and before["opVisible"] >= 0.35
            # PASS-101 PERF, measured: clip B is below the fold and was the
            # heaviest file on the page (260KB of webm + an 88KB poster against
            # the hero's 84KB + 80KB), all four downloading before the first
            # screen had painted. It goes to preload="none"; the HERO keeps
            # "auto", because that one IS the first screen and it is the clip
            # the operator's "i see no vids" was about. What this check is FOR
            # is unchanged and is asserted below: after one gesture, BOTH play.
            and before["preload"] == ["auto", "none"]
            and (not after["a"]) and (not after["b"]),
            "preload %s on both; both clips paused by hand first (hero paused=%s, operator "
            "paused=%s, hero ended=%s, operator square %.0f%% visible -- past the 35%% gate); "
            "after ONE synthetic wheel event the hero is playing (paused=%s, t=%.2fs) and "
            "the operator clip is playing (paused=%s, t=%.2fs)"
            % (before["preload"], before["a"], before["b"], before["ended"],
               before["opVisible"] * 100, after["a"], after["at"], after["b"], after["bt"]))

        disc = pg.evaluate("""()=>{let kf=0; const kfNames=[];
            for(const s of document.styleSheets){try{for(const r of s.cssRules){
              if(r.type===CSSRule.KEYFRAMES_RULE){kf++; kfNames.push(r.name);}}}catch(e){}}
            const roomAnim=[];
            document.querySelectorAll('.rl-home, .rl-home *').forEach(e=>{
              const a=getComputedStyle(e).animationName;
              if(a && a!=='none') roomAnim.push(e.tagName+' -> '+a);});
            const fams=new Set(); const blends=[];
            document.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);
              fams.add(cs.fontFamily);
              if(cs.mixBlendMode&&cs.mixBlendMode!=='normal') blends.push(e.tagName);});
            return {kf:kf, kfNames:kfNames, roomAnim:roomAnim, gsap: typeof window.gsap,
                    fams:[...fams], blends:blends};}""")
        bad = [f for f in disc["fams"] if "Bricolage" in f or "JetBrains" in f or "mono" in f.lower()]
        # PASS-101. The mock was one file, so "@keyframes site-wide" and "@keyframes on
        # this page" were the same number. On the site they are not: globals.css is ONE
        # stylesheet served to every route, and it carries the legacy Color Worlds and
        # WallChart keyframes for the routes phase 3 has yet to port. What SS16.3 rules
        # about THIS surface is measurable exactly: the Room and Ledger set declares none
        # and runs none. The site-wide count is printed on every run and is a phase-3 debt,
        # not a Room and Ledger one -- it is not silently redefined away.
        room_kf = [k for k in disc["kfNames"] if k.startswith("rl-")]
        chk("discipline", not room_kf and not disc["roomAnim"]
            and disc["gsap"] == "undefined" and not disc["blends"] and not bad,
            "the Room and Ledger set declares %d @keyframes and runs %d animations inside "
            ".rl-home -- every item is a transition between two declared states. gsap=%s, "
            "mix-blend-mode elements=%d, banned faces=%s, Anybody loaded=%s. Site-wide the "
            "shared stylesheet still declares %d (%s): legacy Color Worlds + WallChart, "
            "owned by the routes Pass-101 phase 3 ports, none of them reachable from this "
            "page. SS16.3's site-wide ceiling of 3 is met when those routes are ported."
            % (len(room_kf), len(disc["roomAnim"]), disc["gsap"], len(disc["blends"]), bad,
               pg.evaluate("()=>document.fonts.check('300 20px Anybody')"),
               disc["kf"], ", ".join(disc["kfNames"])))

        # ---- 19 hero proof row ----------------------------------------------
        pr = pg.evaluate("""()=>{const e=document.getElementById('heroproof');
            return {txt:e.textContent.replace(/\\s+/g,' ').trim(),
                    parts:[].map.call(e.children,c=>c.textContent.trim())};}""")
        want = "Four exits, $5B+ combined."
        chk("14.3-proof-row", norm(pr["txt"]) == norm(want),
            "reads %r; nodes %s (both verified substrings of the freight template)"
            % (pr["txt"], pr["parts"]))

        # ---- screenshots at 1440 / 1920 -------------------------------------
        def shoot(name, w, h, y=0, sel=None):
            pg.set_viewport_size({"width": w, "height": h})
            pg.wait_for_timeout(500)
            if sel:
                pg.evaluate("(s)=>document.querySelector(s).scrollIntoView({block:'start'})", sel)
                pg.wait_for_timeout(700)
                pg.evaluate("()=>window.scrollBy(0,-80)")
            else:
                pg.evaluate("(y)=>window.scrollTo(0,y)", y)
            pg.wait_for_timeout(900)
            path = os.path.join(OUT, name)
            pg.screenshot(path=path)
            shots.append(path)

        shoot("rl8-1440-top.png", 1440, 900)
        shoot("rl8-sec-work.png", 1440, 900, sel="#work")
        shoot("rl8-sec-price.png", 1440, 900, sel="#price")
        shoot("rl8-sec-proof.png", 1440, 900, sel="#proof")
        shoot("rl8-sec-faq.png", 1440, 900, sel="#faq")

        # ---- 04 / 16 SS14.7: the phone runs the SAME composition --------------
        mob = {}
        for W in (390, 360):
            pg.set_viewport_size({"width": W, "height": 844})
            pg.reload()
            pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
            pg.wait_for_timeout(1600)
            pg.evaluate("()=>window.scrollTo(0,0)")
            pg.wait_for_timeout(300)
            m = pg.evaluate(FINGER_JS)
            m["bar"] = pg.evaluate("""()=>{const b=document.getElementById('bar');
                return {op:getComputedStyle(b).opacity,
                        h:b.getBoundingClientRect().height};}""")
            m["stageH"] = m["stage"]["h"]
            mob[W] = m

        def mob_ok(m):
            return (m["objpos"] == "0% 50%"
                    and 24.5 <= m["fpct"][0] <= 27.5
                    and abs(m["fpct"][1] - 38.24) < 0.6
                    # the headline is OVERLAID: its box sits inside the stage's own box
                    and m["h1Box"][1] >= m["stage"]["y"] - 0.5
                    and m["h1Box"][3] <= m["stage"]["bottom"] + 0.5
                    and m["Ileft"] and m["euclid"] <= 60
                    and abs(m["capDelta"] - 4) <= 1.5
                    and all(r["n"] == 1 and r["gutter"] >= 12 for r in m["rows"])
                    # the face, source x 1010..1290, stays inside the visible window
                    and m["srcWindow"][0] <= 1010 and m["srcWindow"][1] >= 1290
                    # sentence, chips and proof follow the stage
                    and m["copyTop"] >= m["stage"]["bottom"] - 1
                    and m["bar"]["op"] == "1"
                    # v5 verify 3 SEND-BACK: the opaque 48px bar was sitting ON the
                    # stage and covering the crown of his head -- 16% of a 292px film,
                    # with hair silhouette measured on the first visible row. The
                    # stage starts BELOW the bar on the phone.
                    and m["stage"]["y"] >= m["bar"]["h"] - 0.5)

        chk("16.2-hero-mobile", all(mob_ok(m) for m in mob.values()),
            " || ".join(
                "%d: stage %.0fx%.0f cropped %s; fingertip (%.1f, %.1f) = %.2f%% across "
                "(SS14.7 wants ~26) and %.2f%% down; \"g\" box left edge %.1f, %.1fpx from "
                "the tip (<=60, g left=%s); rows %s; visible source window %.0f..%.0f "
                "(the face at 1010..1290 is inside); headline box %.0f..%.0f inside the "
                "stage %.0f..%.0f; the sentence starts %.0f, the stage ends %.0f; bar "
                "opacity %s, %.0fpx tall, and the stage opens at y %.0f CLEAR of it"
                % (W, mob[W]["stage"]["w"], mob[W]["stage"]["h"], mob[W]["objpos"],
                   mob[W]["fx"], mob[W]["fy"], mob[W]["fpct"][0], mob[W]["fpct"][1],
                   mob[W]["I"][0], mob[W]["euclid"], mob[W]["Ileft"],
                   [(r["t"], round(r["w"], 1), "%.0fpx gutter" % r["gutter"], r["n"])
                    for r in mob[W]["rows"]],
                   mob[W]["srcWindow"][0], mob[W]["srcWindow"][1],
                   mob[W]["h1Box"][1], mob[W]["h1Box"][3], mob[W]["stage"]["y"],
                   mob[W]["stage"]["bottom"], mob[W]["copyTop"], mob[W]["stage"]["bottom"],
                   mob[W]["bar"]["op"], mob[W]["bar"]["h"], mob[W]["stage"]["y"])
                for W in (390, 360)))
        chk("no-hscroll-390-360",
            all(m["scrollW"] <= m["iw"] + 1 for m in mob.values()),
            "; ".join("%d: scrollWidth %d <= innerWidth %d"
                      % (W, mob[W]["scrollW"], mob[W]["iw"]) for W in (390, 360)))

        # the veil is re-cut from the new cap-top at BOTH ends of the ladder, so the two
        # rows are measured over the film on the phone too.
        pg.set_viewport_size({"width": 390, "height": 844})
        pg.reload()
        pg.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        pg.wait_for_timeout(1600)
        mb, mc, mpx, mdet = 99, 99, 0, []
        for fr in (0, 48, 96):
            t = set_frame(pg, "filmvid", fr)
            pg.evaluate("()=>window.scrollTo(0,0)")
            pg.wait_for_timeout(200)
            b = bg_contrast(pg, "#h1 .r:nth-child(1)", os.path.join(OUT, "_mb.png"))
            c2 = ground_from_cap(pg, "#h1 .r.cu", os.path.join(OUT, "_mc.png"))
            if b:
                mb = min(mb, b)
            if c2:
                mc = min(mc, c2[0])
                mpx = max(mpx, c2[1])
            mdet.append("f%d(t=%.2fs) bone %.2f | copper ground %.2f, brightest channel %d"
                        % (fr, t or 0, b or 0, c2[0] if c2 else 0, c2[1] if c2 else 0))
        chk("16.2-hero-lighting-390", mb >= 4.5 and mc >= 4.3 and mpx <= 16,
            "390, the SS16.2 cut at the other end of the ladder: bone row min %.2f:1 "
            "(>=4.5); the copper row's ground from its cap-top down is flat espresso "
            "(brightest channel %d) at %.2f:1 | %s" % (mb, mpx, mc, "; ".join(mdet)))

        pg.evaluate("()=>document.getElementById('operator').scrollIntoView({block:'start'})")
        pg.wait_for_timeout(1000)
        mop = pg.evaluate("""()=>{const band=document.getElementById('opstage');
            const h=document.getElementById('oph2');
            const rows=[...h.querySelectorAll('.r')];
            const br=band.getBoundingClientRect();
            return {bw:br.width,bh:br.height,iw:innerWidth,
                    rowTops:rows.map(r=>Math.round(r.getBoundingClientRect().top)),
                    right:Math.max(...rows.map(r=>r.getBoundingClientRect().right - br.right))};}""")
        obm, det3 = 99, []
        for fr in (0, 96, 192):
            t = set_frame(pg, "opvid", fr)
            v1 = bg_contrast_glyph_run(pg, "#oph2", "#oph2 .r:nth-child(1)", os.path.join(OUT, "_op390_1.png"))
            v2 = bg_contrast_glyph_run(pg, "#oph2", "#oph2 .r:nth-child(2)", os.path.join(OUT, "_op390_2.png"))
            v = min(x for x in (v1, v2) if x is not None) if (v1 or v2) else None
            if v:
                obm = min(obm, v)
            det3.append("f%d(t=%.2fs) row1=%.2f row2=%.2f" % (fr, t or 0, v1 or 0, v2 or 0))
        chk("14.2-op-mobile-overlay",
            abs(mop["bw"] - mop["iw"]) <= 1 and abs(mop["bh"] - 420) <= 1.5
            and len(set(mop["rowTops"])) == 2 and mop["right"] <= 0.5 and obm >= 3.0,
            "390 (PASS-104B §3): band %.0fx%.0f is the FULL width (%d) at 420px (down from "
            "the old 390x390 square); heading is TWO rows (%s), %.0fpx inside the band's "
            "right edge; the same hard gate at loop frames 0/96/192 clears >=3:1: min "
            "%.2f:1 | %s"
            % (mop["bw"], mop["bh"], mop["iw"], mop["rowTops"], -mop["right"], obm,
               "; ".join(det3)))

        # ---- 15.5 / 15.2 / 15.3 at 390 --------------------------------------
        # SS15.5 replaces SS14.7's left-rule variant: the bordered card is the thing the
        # operator asked for, and the left rule existed only because the borderless row
        # hung into the gutter. The cards keep their ground at every width and simply stack.
        mcard = pg.evaluate(r"""()=>{const cs=[].slice.call(document.querySelectorAll('.card'));
            const e=document.getElementById('ebar');
            const sec=document.querySelector('.price');
            const gut=parseFloat(getComputedStyle(sec).paddingLeft);
            const inner=sec.getBoundingClientRect().width - 2*gut;
            const qs=[].slice.call(document.querySelectorAll('.q'));
            return {tops:cs.map(c=>Math.round(c.getBoundingClientRect().top)),
                    w:cs.map(c=>Math.round(c.getBoundingClientRect().width)),
                    x:cs.map(c=>+c.getBoundingClientRect().x.toFixed(1)),
                    right:cs.map(c=>+c.getBoundingClientRect().right.toFixed(1)),
                    radius:cs.map(c=>getComputedStyle(c).borderRadius),
                    borders:cs.map(c=>{const st=getComputedStyle(c);
                       return [st.borderTopWidth+' '+st.borderTopColor,
                               st.borderRightWidth+' '+st.borderRightColor,
                               st.borderBottomWidth+' '+st.borderBottomColor,
                               st.borderLeftWidth+' '+st.borderLeftColor];}),
                    rowMargin:getComputedStyle(document.getElementById('cards')).margin,
                    inner:Math.round(inner), gut:gut, iw:window.innerWidth,
                    engH:Math.round(e.getBoundingClientRect().height),
                    engDir:getComputedStyle(e).flexDirection,
                    engW:Math.round(e.getBoundingClientRect().width),
                    /* v5 verify 3: the block is a two-by-two grid now, not two flex
                       columns, so the .side wrappers are gone. Its four cells ARE the
                       rows: two at every width >= 900, four when it stacks. */
                    engRows:[...new Set([...e.querySelectorAll(
                        '.hd, .v, .dsc, .chip')].map(
                        x=>Math.round(x.getBoundingClientRect().top)))].length,
                    engCols:[...new Set([...e.querySelectorAll(
                        '.hd, .v, .dsc, .chip')].map(
                        x=>Math.round(x.getBoundingClientRect().left)))].length,
                    qTops:qs.map(x=>Math.round(x.getBoundingClientRect().top)),
                    qGaps:qs.slice(1).map((x,i)=>Math.round(
                        x.getBoundingClientRect().top-qs[i].getBoundingClientRect().bottom)),
                    qW:qs.map(x=>Math.round(x.getBoundingClientRect().width)),
                    pr:cs.map(c=>parseFloat(getComputedStyle(c.querySelector('.pr')).fontSize)),
                    vFs:parseFloat(getComputedStyle(e.querySelector('.v')).fontSize),
                    air:parseFloat(getComputedStyle(sec).paddingTop)};}""")
        stacked = len(set(mcard["tops"])) == 3
        mk = mcard["borders"][1]
        # PASS-104B S5: ADD, not edit -- this check carried no price assertion before.
        # The three card figures and the Engagements figure sit on the packages' own
        # 52px mobile rung (never --d2, which floors to 39.52 on a phone).
        chk("15.5-cards-mobile",
            stacked and all(w == mcard["inner"] for w in mcard["w"])
            and all(r == "8px" for r in mcard["radius"])
            # SS18: 1px copper on ALL FOUR sides, at every width.
            and all(bd.startswith("1px") and "200, 84, 43" in bd for bd in mk)
            and not any("200, 84, 43" in bd for i in (0, 2) for bd in mcard["borders"][i])
            and all(x >= mcard["gut"] - 0.5 for x in mcard["x"])
            and all(r <= mcard["iw"] - mcard["gut"] + 0.5 for r in mcard["right"])
            and mcard["rowMargin"].replace(" ", "") in ("0px", "0px0px0px0px")
            and all(abs(f - 52) < 0.6 for f in mcard["pr"])
            and abs(mcard["vFs"] - 52) < 0.6
            # SS18: the fourth card stacks like the three, and takes its height from
            # its content -- the 220px floor was what opened the empty band.
            and mcard["engH"] > 0 and mcard["engRows"] == 4
            and mcard["engCols"] == 1
            and mcard["engW"] == mcard["inner"]
            and abs(mcard["air"] - 64) < 1,
            "390: the three cards stack (tops %s) at the full %dpx content width %s, keeping "
            "their 8px ground %s; the Audit's borders are %s -- the SAME 1px copper border "
            "on four sides as the desktop, no bleed (row margin %s, x %s, right %s of a %dpx "
            "viewport); card figures %s and the Engagements figure %.1fpx all on the 52px "
            "mobile rung; the engagements block stacks into %d rows on %d left edge(s), %dpx "
            "tall and %dpx wide; "
            "section air %.0fpx"
            % (mcard["tops"], mcard["inner"], mcard["w"], set(mcard["radius"]), mk,
               mcard["rowMargin"], mcard["x"], mcard["right"], mcard["iw"],
               mcard["pr"], mcard["vFs"],
               mcard["engRows"], mcard["engCols"], mcard["engH"], mcard["engW"],
               mcard["air"]))
        # SS18 supersedes SS15.3's 40px gap: "Rows close on their own hairlines; no
        # ragged feet." A row that closes on a rule cannot also stand 40px clear of the
        # next one -- the rule IS the separation. What is asserted is the stack, the full
        # width, and that consecutive rows meet on their shared hairline.
        chk("18-objections-mobile",
            len(set(mcard["qTops"])) == 3 and all(w == mcard["inner"] for w in mcard["qW"])
            and all(abs(g) <= 2 for g in mcard["qGaps"]),
            "390: the three objections stack (tops %s) at the full %dpx width %s, each "
            "closing on its own hairline with no gap between rows (%s)"
            % (mcard["qTops"], mcard["inner"], mcard["qW"], mcard["qGaps"]))
        set_frame(pg, "filmvid", 96)
        set_frame(pg, "opvid", 60)
        for name, sel in (("rl8-390-price.png", "#price"),
                          ("rl8-390-faq.png", "#faq"), ("rl8-390-work.png", "#work")):
            if sel:
                pg.evaluate("(s)=>document.querySelector(s).scrollIntoView({block:'start'})", sel)
                pg.wait_for_timeout(700)
                pg.evaluate("()=>window.scrollBy(0,-60)")
            else:
                pg.evaluate("()=>window.scrollTo(0,0)")
            pg.wait_for_timeout(900)
            path = os.path.join(OUT, name)
            pg.screenshot(path=path)
            shots.append(path)

        pg.set_viewport_size({"width": 390, "height": 844})
        pg.wait_for_timeout(600)

        # Pass 104a supersedes the Manual section and refund objection.
        check_book_blackout(pg, "/", home=True)
        chk("104a-manual-and-refund-question-absent",
            pg.locator("#manual").count() == 0
            and "What if it does not help?" not in pg.locator("body").inner_text(),
            "No Manual section or retired refund question on the home")

        # ---- 07/08/09/10 the copy gates -------------------------------------
        nodes = pg.evaluate("""()=>{
            const out=[]; const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
            let n; while((n=w.nextNode())){
              const p=n.parentElement;
              if(!p||p.closest('script,style,noscript')) continue;
              const t=n.textContent.replace(/\\s+/g,' ').trim();
              if(t) out.push(t);}
            document.querySelectorAll('[alt]').forEach(e=>out.push(e.getAttribute('alt')));
            document.querySelectorAll('svg[aria-label]').forEach(
              e=>out.push(e.getAttribute('aria-label')));
            return out;}""")

        # ================= SS16.2 / SS16.3 =====================================
        # ---- 16.2 the arrival frame -------------------------------------------
        clipA = CLIP_A
        arr = measure_arrival(clipA, OUT)
        # PASS-101: the served page, and the component that carries the constant.
        src = pg.content()
        m = re.search(r"const ARRIVAL = ([\d.]+);",
                      open(MOTION_TSX, encoding="utf-8").read())
        pageArr = float(m.group(1)) if m else None
        moved = [(t, x) for t, x in (arr["trace"] if arr else []) if x is not None]
        chk("16.2-arrival",
            arr is not None and arr["arrival"] is not None and pageArr is not None
            and abs(pageArr - arr["arrival"]) <= 0.1,
            ("A2-hold-720.mp4 %dx%d, %d frames at 0.1s: the leftmost hand pixel settles at "
             "x=%s; the FIRST frame within 6px of that is t=%.2fs, and the page's own "
             "trigger constant is ARRIVAL=%.2f. (SS16.3 estimated ~3.4s; the clip measures "
             "%.2fs -- the measurement is what ships.) Trace, 2.0s..3.0s: %s"
             % (arr["w"], arr["h"], arr["n"], arr["final"], arr["arrival"], pageArr,
                arr["arrival"], [(round(t, 1), x) for t, x in moved if 2.0 <= t <= 3.0]))
            if arr and arr["arrival"] is not None else
            "the arrival could not be measured (ffmpeg missing or clip absent)")

        # ---- 16.3 the motion set: initial vs settled --------------------------
        MOTION_JS = r"""()=>{
          const one=(s,p)=>{const e=document.querySelector(s);
                            return e?getComputedStyle(e)[p]:null;};
          const all=(s,p)=>[...document.querySelectorAll(s)].map(
                            e=>getComputedStyle(e)[p]);
          const pone=(s,pe,p)=>{const e=document.querySelector(s);
                            return e?getComputedStyle(e,pe)[p]:null;};
          const pall=(s,pe,p)=>[...document.querySelectorAll(s)].map(
                            e=>getComputedStyle(e,pe)[p]);
          return {
            js:!!document.querySelector('.rl-home.js'),
            cuOp:one('#h1 .cu','opacity'), cuDur:one('#h1 .cu','transitionDuration'),
            r1:one('#h1 .r1','transform'), r1Dur:one('#h1 .r1','transitionDuration'),
            bar:one('.bar','transform'), barDur:one('.bar','transitionDuration'),
            barLabels:[...document.querySelectorAll('.bar a')].map(
              e=>e.textContent.replace(/\u2192/g,'').replace(/\s+/g,' ').trim()),
            askText:document.querySelector('.ask .d').textContent.trim(),
            barOp:one('.bar','opacity'),
            heads:all('.sec h2','clipPath'), headDur:all('.sec h2','transitionDuration'),
            stepRule:pall('.steps li','::before','transform'),
            stepDelay:pall('.steps li','::before','transitionDelay'),
            stepDur:pall('.steps li','::before','transitionDuration'),
            stepLast:pone('.steps li:last-child','::after','transform'),
            qRule:pall('.q','::before','transform'),
            prfRule:pall('.prf','::before','transform'),
            ledgerRule:pone('.proofsec .ledger','::before','transform'),
            priceRule:pall('.card .pblock','::after','transform'),
            priceDelay:pall('.card .pblock','::after','transitionDelay'),
            priceSeam:one('.price .seam','transform'),
            priceFigsOp:all('.card .pr, .eng .v','opacity'),
            cards:all('.card','transform'), cardOp:all('.card','opacity'),
            cardDelay:all('.card','transitionDelay'),
            cardDur:all('.card','transitionDuration'),
            eng:one('.eng','transform'), engOp:one('.eng','opacity'),
            engDelay:one('.eng','transitionDelay'),
            qs:all('.q','transform'), qOp:all('.q','opacity'),
            qDelay:all('.q','transitionDelay'),
            opfilm:one('.opfilm video','transform'),
            opfilmDur:one('.opfilm video','transitionDuration'),
            opVeil:one('.opfilm .veil','clipPath'),
            opVeilDur:one('.opfilm .veil','transitionDuration'),
            opHead:one('#oph2','transform'), opHeadOp:one('#oph2','opacity'),
            opHeadDelay:one('#oph2','transitionDelay'),
            opRow:all('.opband h2.two .r','transform'),
            opRowOp:all('.opband h2.two .r','opacity'),
            opRowDelay:all('.opband h2.two .r','transitionDelay'),
            askH:one('.ask h2','transform'), askHOp:one('.ask h2','opacity'),
            askHDur:one('.ask h2','transitionDuration'),
            askPr:one('.ask .promise','transform'),
            askPrOp:one('.ask .promise','opacity'),
            askPrDur:one('.ask .promise','transitionDuration'),
            askChips:one('.ask .chips','transform'), askChipsOp:one('.ask .chips','opacity'),
            askChipsDelay:one('.ask .chips','transitionDelay'),
            askChipsDur:one('.ask .chips','transitionDuration'),
            glDur:one('.chip .a .gl','transitionDuration'),
            arDur:one('.prf .ar','transitionDuration'),
            sheetDur:one('.rl-sheet','transitionDuration')};}"""

        mctx = br.new_context(viewport={"width": 1440, "height": 900},
                              device_scale_factor=1, reduced_motion="no-preference")
        mp = mctx.new_page()
        mp.goto(url)
        mp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        mp.wait_for_timeout(1000)
        ini = mp.evaluate(MOTION_JS)
        mp.evaluate("""()=>{document.querySelectorAll('[data-anim],[data-rise]').forEach(
            e=>e.classList.add('in'));
            const h=document.getElementById('h1'); h.classList.add('on','up');
            document.getElementById('bar').classList.add('on');}""")
        mp.wait_for_timeout(1700)
        fin = mp.evaluate(MOTION_JS)

        # 1 THE MOMENT -- driven through the clip's own clock, not by a class
        tctx = br.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        tp = tctx.new_page()
        tp.add_init_script("""new MutationObserver(function(mu,o){
              var v=document.getElementById('filmvid');
              if(v){v.removeAttribute('autoplay'); v.autoplay=false; o.disconnect();}})
            .observe(document.documentElement,{childList:true,subtree:true});
          Object.defineProperty(HTMLMediaElement.prototype,'play',
            {value:function(){return Promise.resolve();}});""")
        tp.goto(url)
        tp.wait_for_function("document.getElementById('filmvid').readyState>=1", timeout=30000)
        tp.wait_for_timeout(600)
        # the clip cannot start on this page (autoplay stripped, play() a no-op), so this
        # is the ONLY place the pre-start rest state of row 1 survives to be read.
        # read the DECLARED rest state, with the transition suppressed so what comes back
        # is the rule's own value and not a frame of the fill in progress.
        r1_rest = tp.evaluate("""()=>{const h=document.getElementById('h1');
            const el=document.querySelector('#h1 .r1');
            const d=getComputedStyle(el).transitionDuration;
            const had=h.classList.contains('up');
            el.style.transition='none'; h.classList.remove('up'); void el.offsetWidth;
            const t=getComputedStyle(el).transform;
            if(had) h.classList.add('up'); void el.offsetWidth; el.style.transition='';
            return {t:t, d:d, had:had};}""")
        seek = """async (t)=>{const v=document.getElementById('filmvid');
            v.pause(); v.currentTime=t;
            await new Promise(r=>{const go=()=>{v.removeEventListener('seeked',go);r();};
              v.addEventListener('seeked',go); setTimeout(r,900);});
            return v.currentTime;}"""
        tp.evaluate(seek, 1.0)
        tp.wait_for_timeout(500)
        op_at_1 = tp.evaluate("()=>getComputedStyle(document.querySelector('#h1 .cu')).opacity")
        tp.evaluate(seek, (pageArr or 2.54) + 0.5)
        tp.wait_for_timeout(500)
        op_after = tp.evaluate("()=>getComputedStyle(document.querySelector('#h1 .cu')).opacity")
        tctx.close()
        chk("16.3-1-the-moment",
            abs(float(op_at_1) - 0.28) < 0.02 and float(op_after) >= 0.99
            and abs(float(ini["cuDur"].rstrip("s")) - 0.26) < 0.01
            and abs(tmat(r1_rest["t"])[1] - 24) < 0.5 and tmat(fin["r1"])[1] == 0
            and abs(float(r1_rest["d"].rstrip("s")) - 0.6) < 0.01,
            "with the clip paused at t=1.00s the copper row computes opacity %s (rest state "
            ".28) and at t=%.2fs (arrival + 0.5s) it computes %s, over a %s fill; "
            "'I build the' rests at translateY %.1fpx over %s and settles at %.1fpx"
            % (op_at_1, (pageArr or 2.54) + 0.5, op_after, ini["cuDur"],
               tmat(r1_rest["t"])[1], r1_rest["d"], tmat(fin["r1"])[1]))

        # 2 the bar
        # PASS-102 row 1: prove the four labels, including the new call label.
        chk("16.3-2-bar",
            abs(tmat(ini["bar"])[1] + 12) < 0.5 and tmat(fin["bar"])[1] == 0
            and fin["barLabels"] == BAR_LABELS[:4]
            and abs(float(ini["barDur"].split(",")[0].rstrip("s")) - 0.24) < 0.01,
            "the bar rests at translateY %.1fpx and arrives at %.1fpx over %s (opacity and "
            "transform together); `on` is only ever ADDED by the script, so the entrance "
            "cannot run twice; PASS-102 row 1 bar labels: %s"
            % (tmat(ini["bar"])[1], tmat(fin["bar"])[1], ini["barDur"],
               fin["barLabels"]))

        # 3 section heads
        heads_hidden = all("100%" in c for c in ini["heads"])
        heads_open = all("100%" not in c and c != "none" for c in fin["heads"])
        chk("16.3-3-heads",
            len(ini["heads"]) == 4 and heads_hidden and heads_open
            and all(abs(float(d.rstrip("s")) - 0.7) < 0.01 for d in ini["headDur"]),
            "%d section heads; each rests clipped from the left (%s) and settles open (%s) "
            "over %s. The vertical inset is -0.3em in BOTH states: the .d.two line box is "
            "shorter than the font's em box and a literal inset(0) shears descenders"
            % (len(ini["heads"]), ini["heads"][0], fin["heads"][0], set(ini["headDur"])))

        # 4 the hairlines
        # PASS-104B S5, item 4: the section-opening seam joins the drawn set --
        # 13 -> 14. It is read with `one`, not `pall`, because there is exactly one.
        drawn0 = ([tmat(v)[2] for v in ini["stepRule"]] + [tmat(v)[2] for v in ini["qRule"]]
                  + [tmat(v)[2] for v in ini["prfRule"]] + [tmat(v)[2] for v in ini["priceRule"]]
                  # SS18 took `See the rest` out of the ledger and made it a pill, so it
                  # draws no rule. Pass 104a also removes the manual and one objection.
                  + [tmat(ini["ledgerRule"])[2],
                     tmat(ini["stepLast"])[2],
                     tmat(ini["priceSeam"])[2]])
        drawn1 = ([tmat(v)[2] for v in fin["stepRule"]] + [tmat(v)[2] for v in fin["qRule"]]
                  + [tmat(v)[2] for v in fin["prfRule"]] + [tmat(v)[2] for v in fin["priceRule"]]
                  + [tmat(fin["ledgerRule"])[2],
                     tmat(fin["stepLast"])[2],
                     tmat(fin["priceSeam"])[2]])
        chk("16.3-4-hairlines",
            len(drawn0) == 15 and all(abs(v) < 0.001 for v in drawn0)
            and all(abs(v - 1) < 0.001 for v in drawn1)
            and all(abs(float(d.rstrip("s")) - 0.5) < 0.01 for d in ini["stepDur"])
            and [d.strip() for d in ini["stepDelay"]] == ["0s", "0.06s", "0.12s"],
            "%d ledger rules -- the three how-I-work rows and the ledger's closing rule, the "
            "three objection rules, the three card price "
            "rules, the THREE receipts (SS17), the ledger's opening rule and the packages "
            "section-opening seam (PASS-104B S5) -- all "
            "rest at scaleX %s and settle at scaleX %s over %s, staggered %s inside a section"
            % (len(drawn0), set(round(v, 3) for v in drawn0),
               set(round(v, 3) for v in drawn1), set(ini["stepDur"]),
               [d.strip() for d in ini["stepDelay"]]))

        # 5 cards and blocks rise
        chk("16.3-5-rises",
            all(abs(tmat(v)[1] - 20) < 0.5 for v in ini["cards"])
            and all(float(o) == 0 for o in ini["cardOp"])
            and all(tmat(v)[1] == 0 for v in fin["cards"])
            and all(float(o) == 1 for o in fin["cardOp"])
            and [d.split(",")[0].strip() for d in ini["cardDelay"]] == ["0s", "0.07s", "0.14s"]
            and abs(tmat(ini["eng"])[1] - 20) < 0.5
            and ini["engDelay"].split(",")[0].strip() == "0.21s"
            and all(abs(tmat(v)[1] - 20) < 0.5 for v in ini["qs"])
            and [d.split(",")[0].strip() for d in ini["qDelay"]] == ["0s", "0.07s", "0.14s"],
            "three price cards rest at translateY %s / opacity %s on delays %s and settle at "
            "%s / %s; the Engagements block rests at %.0fpx on a %s delay (after them); the "
            "three objection rows rest at %s on %s"
            % ([round(tmat(v)[1]) for v in ini["cards"]], ini["cardOp"],
               [d.split(",")[0].strip() for d in ini["cardDelay"]],
               [round(tmat(v)[1]) for v in fin["cards"]], fin["cardOp"],
               tmat(ini["eng"])[1], ini["engDelay"].split(",")[0].strip(),
               [round(tmat(v)[1]) for v in ini["qs"]],
               [d.split(",")[0].strip() for d in ini["qDelay"]]))

        # 05-the-price-is-the-poster (PASS-104B S5, GATES item 5 -- new, not an edit).
        # At 1440, every card figure and the Engagements figure computes to --d2 and
        # reaches opacity 1 after #price.in; the figures are never copper (a figure set
        # in copper is a kill); the seam is 1px, spans the content width, computes
        # copper, and is the only NEW copper carrier in the section (the Audit's four
        # borders and its pill border are the pre-existing two).
        priceScan = mp.evaluate(r"""()=>{
            const price=document.getElementById('price');
            const cop='rgb(200, 84, 43)';
            const figs=[...price.querySelectorAll('.card .pr, .eng .v')];
            const seam=price.querySelector('.seam');
            const gut=parseFloat(getComputedStyle(price).paddingLeft);
            const content=price.getBoundingClientRect().width - 2*gut;
            const sr=seam.getBoundingClientRect();
            // every element the brief names as a pre-existing copper carrier
            const named=[...price.querySelectorAll(
                '.card.mark, .tag')];
            const namedCopper=named.every(el=>{
                const cs=getComputedStyle(el);
                return [cs.borderTopColor,cs.borderRightColor,cs.borderBottomColor,
                        cs.borderLeftColor].some(c=>c===cop);});
            // every OTHER text-bearing element in the section: none reads copper
            const others=[...price.querySelectorAll(
                '.nm, .one, .dsc, .hd, .chip .t, .chip .a .gl')];
            const strayCopper=others.filter(el=>getComputedStyle(el).color===cop)
                .map(el=>el.className);
            return {figColors:figs.map(f=>getComputedStyle(f).color),
                    seamH:sr.height, seamW:sr.width, content:content,
                    seamBg:getComputedStyle(seam).backgroundColor,
                    namedCopper:namedCopper, strayCopper:strayCopper};}""")
        cop = "rgb(200, 84, 43)"
        figsNotCopper = not any(c == cop for c in priceScan["figColors"])
        chk("05-the-price-is-the-poster",
            # the figures rest dim and reach full light after #price.in, same
            # lighting language as #h1 .cu (16.3-1)
            all(abs(float(o) - 0.28) < 0.02 for o in ini["priceFigsOp"])
            and all(float(o) == 1 for o in fin["priceFigsOp"])
            and abs(tmat(ini["priceSeam"])[2]) < 0.001
            and abs(tmat(fin["priceSeam"])[2] - 1) < 0.001
            and figsNotCopper
            and abs(priceScan["seamH"] - 1) < 0.6
            and abs(priceScan["seamW"] - priceScan["content"]) <= 1.0
            and priceScan["seamBg"] == cop
            and priceScan["namedCopper"]
            and not priceScan["strayCopper"],
            "1440: the %d card/Engagements figures rest at opacity %s (the fill's own .28) "
            "and reach %s after #price.in; none computes copper (%s); the seam is %.1fpx "
            "tall, %.1fpx wide against a %.1fpx content box, background %s, and rests at "
            "scaleX %s / settles at scaleX %s; the Audit's four borders and its pill border "
            "are still copper (%s); no OTHER text run in the section (%d checked) reads "
            "copper (%s)"
            % (len(priceScan["figColors"]), ini["priceFigsOp"], fin["priceFigsOp"],
               priceScan["figColors"], priceScan["seamH"], priceScan["seamW"],
               priceScan["content"], priceScan["seamBg"], tmat(ini["priceSeam"])[2],
               tmat(fin["priceSeam"])[2], priceScan["namedCopper"], 6,
               priceScan["strayCopper"]))

        # the no-JS finished frame: with scripting off, all four figures are already
        # at opacity 1 and the seam is already fully drawn -- the same proof pattern
        # as 14.9-sign-finished-frame-no-js above.
        njpctx = br.new_context(viewport={"width": 1440, "height": 900},
                                java_script_enabled=False, device_scale_factor=1)
        njpp = njpctx.new_page()
        njpp.goto(url)
        njpp.wait_for_timeout(1200)
        nj_price = njpp.locator("#price").evaluate(r"""(price)=>{
            const figs=[...price.querySelectorAll('.card .pr, .eng .v')]
                .map(f=>getComputedStyle(f).opacity);
            const seam=getComputedStyle(price.querySelector('.seam')).transform;
            return {figs:figs, seam:seam};}""")
        njpctx.close()
        chk("05-the-price-is-the-poster-no-js",
            all(abs(float(o) - 1) < 0.02 for o in nj_price["figs"])
            and nj_price["seam"] in ("none", "matrix(1, 0, 0, 1, 0, 0)"),
            "with scripting OFF (html.rl-js never lands): the %d figures render their "
            "FINISHED frame at opacity %s and the seam's transform is %r (no 100%%-style "
            "pre-state left showing)"
            % (len(nj_price["figs"]), nj_price["figs"], nj_price["seam"]))

        # 6 the long table (PASS-104B §3, amended): the static crop zoom that
        # used to sit on the film is gone with room.css:531-536, so the film's
        # own settle returns to item 6's ORIGINAL numbers (1.06 -> 1, not the
        # 1.378 -> 1.30 the old square's zoom compounded it to). At >=900 (this
        # capture is at 1440) the heading is ONE row, rising as a single
        # object 260ms after `.opstage.in`; the OLD two-row 0/80ms stagger
        # (still live on `.opband h2.two .r`) only fires at <=899, so at 1440
        # those rows carry no opacity/transform rule at all and read as the
        # identity/1 finished frame by construction -- checked negatively here
        # so a regression that re-enables the per-row rule at this width would
        # be caught.
        chk("16.3-6-operator",
            abs(tmat(ini["opfilm"])[2] - 1.06) < 0.005
            and abs(tmat(fin["opfilm"])[2] - 1.0) < 0.005
            and abs(float(ini["opfilmDur"].rstrip("s")) - 1.2) < 0.01
            and abs(tmat(ini["opHead"])[1] - 20) < 0.5
            and float(ini["opHeadOp"]) == 0
            and tmat(fin["opHead"])[1] == 0 and float(fin["opHeadOp"]) == 1
            and ini["opHeadDelay"].split(",")[0].strip() == "0.26s"
            and all(ident(v) for v in ini["opRow"])
            and all(float(o) == 1 for o in ini["opRowOp"]),
            "the band's film rests at scale %.3f and settles to %.3f over %s (item 6's "
            "ORIGINAL numbers -- the crop zoom that used to compound this to 1.378->1.30 is "
            "gone with room.css:531-536); the heading is ONE row at >=900: it rests at "
            "translateY %.1fpx / opacity %s on a %s delay and settles to %.1fpx / opacity "
            "%s; the per-row `.r` rule does not fire at this width (rest %s / %s)"
            % (tmat(ini["opfilm"])[2], tmat(fin["opfilm"])[2], ini["opfilmDur"],
               tmat(ini["opHead"])[1], ini["opHeadOp"], ini["opHeadDelay"].split(",")[0].strip(),
               tmat(fin["opHead"])[1], fin["opHeadOp"],
               [round(tmat(v)[1], 1) for v in ini["opRow"]], ini["opRowOp"]))

        # 7 hovers
        mp.evaluate("()=>window.scrollTo(0,0)")
        mp.wait_for_timeout(300)
        mp.hover("#herochips .chip")
        mp.wait_for_timeout(400)
        hv_chip = mp.evaluate("()=>getComputedStyle("
                              "document.querySelector('#herochips .chip .a .gl')).transform")
        mp.evaluate("()=>document.getElementById('proof').scrollIntoView({block:'center'})")
        mp.wait_for_timeout(700)
        mp.hover(".prf")
        mp.wait_for_timeout(400)
        hv_row = mp.evaluate("()=>getComputedStyle(document.querySelector('.prf .ar')).transform")
        mp.evaluate("()=>document.getElementById('price').scrollIntoView({block:'center'})")
        mp.wait_for_timeout(700)
        mp.hover(".card")
        mp.wait_for_timeout(500)
        hv_card = mp.evaluate("()=>getComputedStyle(document.querySelector('.card')).borderTopColor")
        chk("16.3-7-hovers",
            abs(tmat(hv_chip)[0] - 6) < 0.5 and abs(tmat(hv_row)[0] - 6) < 0.5
            and "200, 84, 43" in hv_card
            and abs(float(ini["glDur"].rstrip("s")) - 0.2) < 0.01
            and abs(float(ini["arDur"].rstrip("s")) - 0.2) < 0.01,
            "on hover the chip's arrow slides to translateX %.1fpx and a receipt row's arrow "
            "to %.1fpx, both over %s / %s; the price card's border computes %s (copper) over "
            "300ms. The chips' 300ms ground swap is unchanged and the receipts' copper wipe "
            "is untouched."
            % (tmat(hv_chip)[0], tmat(hv_row)[0], ini["glDur"], ini["arDur"], hv_card))

        # 8 the ask
        # SS16.3-8 names two moves: the headline rises 30px and "the arrow slides in
        # from the left", both 600ms, with the chips 120ms behind. SS18 DELETED the
        # floating 56px arrow ("the chips carry the arrow"), so the slide moves onto the
        # chips themselves -- they now enter from the left AND from below -- and the
        # promise, which SS18 baselines to the headline, rides up with the headline.
        chk("16.3-8-ask",
            abs(tmat(ini["askH"])[1] - 30) < 0.5 and float(ini["askHOp"]) == 0
            and fin["askText"] == "Get a reality check."  # PASS-102 row 1
            and abs(tmat(ini["askPr"])[1] - 30) < 0.5 and float(ini["askPrOp"]) == 0
            and abs(tmat(ini["askChips"])[0] + 30) < 0.5
            and abs(tmat(ini["askChips"])[1] - 30) < 0.5
            and abs(float(ini["askHDur"].split(",")[0].rstrip("s")) - 0.6) < 0.01
            and abs(float(ini["askPrDur"].split(",")[0].rstrip("s")) - 0.6) < 0.01
            and ini["askChipsDelay"].split(",")[0].strip() == "0.12s"
            and tmat(fin["askH"])[1] == 0 and tmat(fin["askChips"])[0] == 0
            and float(fin["askChipsOp"]) == 1,
            "the copper field's headline rests at translateY %.0fpx / opacity %s over %s, "
            "the reply promise rides with it at translateY %.0fpx / opacity %s, and the "
            "chips -- which carry the arrow now that SS18 deleted the floating one -- enter "
            "from translate(%.0f, %.0f) on a %s delay, settling at opacity %s; "
            "PASS-102 row 1 headline: %r"
            % (tmat(ini["askH"])[1], ini["askHOp"], ini["askHDur"].split(",")[0],
               tmat(ini["askPr"])[1], ini["askPrOp"], tmat(ini["askChips"])[0],
               tmat(ini["askChips"])[1], ini["askChipsDelay"].split(",")[0],
               fin["askChipsOp"], fin["askText"]))

        # 9 the ground travel and the rail lighting are untouched
        mp.evaluate("()=>window.scrollTo(0,0)")
        mp.wait_for_timeout(400)
        p_top = mp.evaluate("()=>getComputedStyle(document.documentElement)"
                            ".getPropertyValue('--p').trim()")
        mp.evaluate("()=>document.getElementById('price').scrollIntoView({block:'center'})")
        mp.wait_for_timeout(900)
        p_lit = mp.evaluate("""()=>({p:getComputedStyle(document.documentElement)
            .getPropertyValue('--p').trim(),
            lit:document.documentElement.classList.contains('lit')})""")
        chk("16.3-9-ground-unchanged",
            float(p_top or 0) < 0.02 and float(p_lit["p"]) > 0.98 and p_lit["lit"]
            and abs(float(ini["sheetDur"].rstrip("s")) - 0.7) < 0.01,
            "--p reads %s at the top of the room and %s over the ledger with html.lit=%s; "
            "the sheet still travels over %s. Nothing in SS16.3 touched it."
            % (p_top, p_lit["p"], p_lit["lit"], ini["sheetDur"]))

        # keyframes ceiling
        kf = mp.evaluate("""()=>{let n=0; for(const s of document.styleSheets){
            try{for(const r of s.cssRules){if(r.type===CSSRule.KEYFRAMES_RULE) n++;}}
            catch(e){}} return n;}""")
        kfr = mp.evaluate("""()=>{const out=[];
            document.querySelectorAll('.rl-home, .rl-home *').forEach(e=>{
              const a=getComputedStyle(e).animationName;
              if(a && a!=='none') out.push(a);}); return out;}""")
        chk("16.3-keyframes", not kfr,
            "zero @keyframes animations run anywhere inside .rl-home (SS16.3: every item "
            "in the set is a transition between two declared states, so none is needed). "
            "The shared stylesheet declares %d for the routes phase 3 has yet to port; "
            "none is reachable from this page." % kf)
        mctx.close()

        # ---- 16.3 reduced motion: everything off ------------------------------
        rctx = br.new_context(viewport={"width": 1440, "height": 900},
                              device_scale_factor=1, reduced_motion="reduce")
        rp = rctx.new_page()
        rp.goto(url)
        rp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        rp.wait_for_timeout(1200)
        rm = rp.evaluate(MOTION_JS)
        rp.hover("#herochips .chip")
        rp.wait_for_timeout(300)
        rm_hover = rp.evaluate("()=>getComputedStyle("
                               "document.querySelector('#herochips .chip .a .gl')).transform")
        rctx.close()
        rm_tf = ([rm["r1"], rm["bar"], rm["eng"], rm["askH"], rm["askPr"], rm["askChips"],
                  rm_hover, rm["opHead"]] + rm["cards"] + rm["qs"] + rm["opRow"])
        rm_op = ([rm["cuOp"], rm["barOp"], rm["askHOp"], rm["askPrOp"], rm["askChipsOp"],
                  rm["engOp"], rm["opHeadOp"]] + rm["cardOp"] + rm["qOp"] + rm["opRowOp"])
        rm_dur = ([rm["cuDur"], rm["r1Dur"], rm["sheetDur"], rm["glDur"], rm["arDur"]]
                  + rm["headDur"])
        chk("16.3-reduced-motion-off",
            rm["js"] is False and all(ident(v) for v in rm_tf)
            and all(float(o) == 1 for o in rm_op)
            and all(c == "none" for c in rm["heads"])
            and rm["opVeil"] == "none"
            and all(float(d.split(",")[0].rstrip("s")) == 0 for d in rm_dur),
            "under prefers-reduced-motion: reduce the script never adds html.js (js=%s), so "
            "every SS16.3 rest state is absent: %d transforms all identity (hover included), "
            "%d opacities all 1, %d clip-paths all `none`, and every remaining transition "
            "duration is 0s (%s)"
            % (rm["js"], len(rm_tf), len(rm_op), len(rm["heads"]), set(rm_dur)))

        # ---- 16.3 the no-JS render is the finished frame ----------------------
        # PASS-101. The mock was one file, so scripting-off could be simulated by deleting
        # its <script> tags and re-serving it from disk. A Next.js route cannot be re-served
        # that way -- its stylesheet, its clips and its cover are all absolute paths off the
        # server -- so the same state is produced IN the live page, and it is produced
        # exactly: the gate class is removed, and the
        # <noscript> block is unwrapped into a real stylesheet, which is what a
        # scripting-disabled UA does to this page's CSS. Corroborated below by a REAL
        # java_script_enabled=False render.
        jctx = br.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        jp = jctx.new_page()
        jp.goto(url)
        jp.wait_for_function("document.fonts.check('300 20px Anybody')", timeout=30000)
        jp.wait_for_timeout(1500)
        # SS18 FOLLOW-UP: the gate moved from `.rl-home.js` (added in a useEffect, i.e.
        # after the first paint -- the reverse flash) to `html.rl-js`, stamped by the
        # layout's boot script during parse. So scripting-off is simulated by removing
        # BOTH: `rl-js` is what every rest state hangs off now, and `js` is the marker this
        # check reads back. Removing only the second left every pre-state live and the
        # probe read the copper word mid-transition at 0.9996 instead of at rest.
        jp.evaluate("""()=>{
            document.documentElement.classList.remove('rl-js','rl-on');
            const h=document.querySelector('.rl-home'); if(h) h.classList.remove('js');
            document.querySelectorAll('noscript').forEach(ns=>{
              const css=(ns.textContent||'').replace(/<\\/?style[^>]*>/gi,'');
              if(!css.trim()) return;
              const st=document.createElement('style'); st.textContent=css;
              document.head.appendChild(st);});}""")
        # Wait for the remaining transitions after removing the motion class,
        # so this measures the finished frame rather than an intermediate frame.
        jp.wait_for_timeout(1400)
        nj = jp.evaluate(MOTION_JS)
        jctx.close()
        nj_tf = ([nj["r1"], nj["bar"], nj["eng"], nj["askH"], nj["askPr"], nj["askChips"], nj["opHead"]] + nj["cards"] + nj["qs"] + nj["opRow"])
        nj_op = ([nj["cuOp"], nj["barOp"], nj["askHOp"], nj["askPrOp"], nj["askChipsOp"],
                  nj["engOp"], nj["opHeadOp"]] + nj["cardOp"] + nj["qOp"] + nj["opRowOp"])
        nj_rules = ([tmat(v)[2] for v in nj["stepRule"]] + [tmat(v)[2] for v in nj["qRule"]]
                    + [tmat(v)[2] for v in nj["prfRule"]]
                    + [tmat(v)[2] for v in nj["priceRule"]]
                    )
        chk("16.3-no-js-finished-frame",
            nj["js"] is False and all(ident(v) for v in nj_tf)
            and all(float(o) == 1 for o in nj_op)
            and all(c == "none" for c in nj["heads"])
            and all(abs(v - 1) < 0.001 for v in nj_rules)
            and abs(tmat(nj["opfilm"])[2] - 1.0) < 0.005
            and nj["opVeil"] == "none",
            "with the `js` class off .rl-home and the <noscript> stylesheet unwrapped, "
            "js reads %s and nothing declares a rest state: "
            "%d transforms identity, %d opacities 1 (the copper word included, at %s), %d "
            "clip-paths `none`, %d ledger rules at scaleX 1, the operator film at its plain "
            "%.2f crop (PASS-104B §3: the static crop zoom is gone with room.css:531-536, "
            "so the no-JS frame is the un-zoomed band, not the old 1.30 square crop), and "
            "the bar at opacity %s"
            % (nj["js"], len(nj_tf), len(nj_op), nj["cuOp"], len(nj["heads"]),
               len(nj_rules), tmat(nj["opfilm"])[2], nj["barOp"]))

        njctx = br.new_context(viewport={"width": 1440, "height": 900},
                               device_scale_factor=1, java_script_enabled=False)
        njp = njctx.new_page()
        njp.goto(url)
        njp.wait_for_timeout(2500)
        njshot = os.path.join(OUT, "rl10-nojs-1440.png")
        njp.screenshot(path=njshot)
        njctx.close()
        shots.append(njshot)
        from PIL import Image as _I
        _im = _I.open(njshot).convert("RGB")
        _px = _im.load()
        copper_px = sum(1 for y in range(300, 440, 3) for x in range(230, 1360, 6)
                        if _px[x, y][0] > 150 and _px[x, y][0] > _px[x, y][1] + 60)
        # y=4 is inside the 40px bar and above its 14px labels' ink, so this counts the
        # bar's own espresso band and not the holes its type punches in it.
        bar_px = sum(1 for x in range(0, 1440, 8) if sum(_px[x, 4]) < 120)
        chk("16.3-no-js-render",
            copper_px > 200 and bar_px > 170,
            "the REAL java_script_enabled=False render at 1440: %d copper pixels sampled "
            "across the `go-to-market.` row (the word is at full strength with no script to "
            "light it) and the bar paints its espresso band on %d of 180 sampled columns"
            % (copper_px, bar_px))

        # ---- SS18 RULE C, the gate for LESSONS #18 ---------------------------
        # "One chip shape, everywhere" moved the ground, the radius and the type
        # off `.chip .t` and onto `.chip` itself. That is a SPECIFICITY change
        # before it is a design change: on the (room) pages `#rl-root a {color}`
        # out-specifies a bare `.rl-chip`, and /about's live CTA rendered
        # espresso type on an espresso ground -- a black slab with no label.
        # Nothing else in this repo catches it: prettier cannot, the build
        # cannot, the 60 checks above are home-scoped, and Lighthouse scored the
        # page 100 with the slab on it. So: every chip on every ported route,
        # its own colour against its own ground.
        cctx = br.new_context(viewport={"width": 1440, "height": 900},
                              device_scale_factor=1)
        cp = cctx.new_page()
        CHIP_JS = r"""()=>[...document.querySelectorAll('.chip,.rl-chip,.rl-buy')].map(e=>{
            const cs=getComputedStyle(e);
            let bg=cs.backgroundColor, q=e;
            while(q && (bg==='rgba(0, 0, 0, 0)'||bg==='transparent')){
              q=q.parentElement; if(!q) break; bg=getComputedStyle(q).backgroundColor;}
            return {t:e.textContent.replace(/\s+/g,' ').trim().slice(0,30),
                    color:cs.color, bg:bg||'rgb(245, 239, 228)'};})"""
        chips, blind = [], []
        for route in ("/", "/about", "/work", "/playbook", "/packages", "/call",
                      "/work/guardicore"):
            cp.goto(url.rstrip("/") + route)
            cp.wait_for_timeout(1400)
            if route != "/playbook":
                check_book_blackout(cp, route)
            for c in cp.evaluate(CHIP_JS):
                r = ratio(lum(*parse_rgb(c["color"])), lum(*parse_rgb(c["bg"])))
                chips.append((route, c["t"], round(r, 2)))
                if r < 4.5:
                    blind.append((route, c["t"], c["color"], c["bg"], round(r, 2)))
        cctx.close()
        chk("18-rule-c-every-chip-reads", not blind,
            "SS18 Rule C, swept over 7 routes: %d chips, every one carrying its label "
            "against its own ground at >= 4.5:1 (worst %.2f:1). LESSONS #18's gate."
            % (len(chips), min(c[2] for c in chips) if chips else 0)
            if not blind else "chips whose label does not read: %s" % blind)

        # PASS-103b / LESSONS #19: measure the rendered inline boundary, not
        # source whitespace that the entity-bearing JSX text can lose.
        price_page = br.new_page()
        price_page.goto(url.rstrip("/") + "/playbook")
        price_text = price_page.locator(".rl-reg > div").filter(
            has=price_page.get_by_text("Price", exact=True)
        ).locator("dd").inner_text()
        chk("103b-playbook-price-space",
            price_text == "$99 at launch \u00b7 $149 after",
            "rendered Price row: %r" % price_text)
        price_page.close()

        br.close()

    uniq = sorted(set(nodes))

    def rewritten(nn):
        for a, b in REWRITES:
            if norm(b) in nn and norm(nn.replace(norm(b), norm(a))) in blob:
                return True
        return False

    def provenance(t):
        """Return the name of the rule that clears this string, or None."""
        n = norm(t)
        for approved, row in (PASS_102_COPY + PASS_103_COPY + PASS_103_REWORD_COPY
                              + PASS_104B_COPY):
            if n == norm(approved):
                return row
        if t.strip() in BAR_LABELS:
            return "bar label"
        if n and any(n in norm(o) for o in OPERATOR_COPY):
            return "SS15.6 operator-supplied"
        # SS14.7 permits exactly two SHAPE changes on an otherwise verbatim string, and
        # names both: an initial capital on an index caption, and the FAQ head's terminal
        # full stop. They are undone FIRST and the verbatim / SS14.3-rewrite rules then run
        # on the result -- two of the index captions carry a rewrite AND the capital.
        shapes = [(n, "")]
        if n and n[0].isupper():
            shapes.append((n[0].lower() + n[1:], " + SS14.7 initial capital"))
        if n.endswith("."):
            shapes.append((n[:-1].strip(), " + SS14.7 terminal full stop"))
        for nn, tag in shapes:
            if nn in blob:
                return "verbatim" + tag
            if rewritten(nn):
                return "SS14.3 rewrite" + tag
        return None

    graded = [(t, provenance(t)) for t in uniq]
    misses = [t for t, p in graded if p is None]
    counts = {}
    for _, p in graded:
        counts[p] = counts.get(p, 0) + 1
    chk("14.3-copy-gate", not misses,
        "%d distinct text nodes, %d misses %s; provenance %s (sources: freight template + "
        "content/work frontmatter + app/(room)/packages/page.tsx; exempt: "
        "the four bar labels). The two SS14.7 shape changes, in full: %s"
        % (len(uniq), len(misses), misses if misses else "", json.dumps(counts),
           json.dumps([[t, p] for t, p in graded if p and "SS14.7" in p])))

    # case-insensitive: SS14.7 gives the index captions their initial capital, so the
    # rendered strings read "Millions in ...".
    used = [b for a, b in REWRITES if any(norm(b) in norm(t).lower() for t in uniq)]
    seen = sorted(t for t in uniq if any(norm(b) in norm(t).lower() for a, b in REWRITES))
    chk("14.3-two-rewrites", len(REWRITES) == 2 and len(used) == 2,
        "the gate enumerates exactly 2 rewrites and both are used: "
        + "; ".join("%r -> %r" % r for r in REWRITES)
        + " -- as rendered, with SS14.7's initial capital: %s" % seen)

    years = sorted(set(y for t in uniq for y in re.findall(r"\b(?:19|20)\d{2}\b", t)))
    chk("14.3-no-years", not years, "zero years in the rendered text" if not years
        else "found %s" % years)

    figs = []
    for t in uniq:
        s = t
        for a in ALLOWED_FIGURES + ALLOWED_DIGIT_TOKENS:
            s = s.replace(a, " ")
        for d in re.findall(r"\S*\d\S*", s):
            figs.append((t, d))
    chk("14.3-no-figures", not figs,
        "zero digit-bearing tokens outside the allow-list "
        "(prices %s; non-figure digit tokens %s)" % (ALLOWED_FIGURES, ALLOWED_DIGIT_TOKENS)
        if not figs else "found %s" % figs[:12])

    # PASS-101. The mock carried a 12MB ceiling because it inlined its own media as data
    # URIs and the operator's "its not loaded for me" was that ceiling being breached. On
    # the site there is nothing to inline: SS7's rejected list names "Data-URI video on the
    # site" first, so the ceiling is replaced by the rule it existed to enforce, measured
    # directly on the served document.
    doc_bytes = len(src.encode("utf-8"))
    data_uris = len(re.findall(r'(?:src|href|url\()\s*=?\s*["\']?\s*data:', src))
    chk("no-data-uri-media", data_uris == 0,
        "the served document is %d bytes and carries %d data: URIs (SS7: data-URI video on "
        "the site is rejected). Both clips and both posters are FILES."
        % (doc_bytes, data_uris))

    allpass = all(r["pass"] for r in RES)
    print("\n%d checks, %d pass, %d fail" % (len(RES), sum(r["pass"] for r in RES),
                                             sum(not r["pass"] for r in RES)))
    json.dump({"checks": RES, "screenshots": shots, "document_bytes": doc_bytes,
               "all_pass": allpass},
              open(os.path.join(OUT, "verify-room-result.json"), "w", encoding="utf-8"),
              indent=1)
    return 0 if allpass else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else BASE))
