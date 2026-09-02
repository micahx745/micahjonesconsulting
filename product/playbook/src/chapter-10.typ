// chapter-10.typ — "When to hand it off"
//
// Chapter 10 of The 80% Wall: the closer. Ends with the book's back
// matter (bio + operator path), since finishing readers are the
// warmest engagement leads. Author claims: approved ledger phrasings
// only (SurveyMonkey enterprise-sales role; inside Postmates,
// Guardicore, Neuton.AI for their exits, $5B+ combined; Ordani
// hundreds paying, run solo). Fractional-work bias is disclosed
// in-text by design. The build-log entry is the author's real current
// state, written 2026-08-31.
#import "template.typ": *

#chapter-open(
  "10",
  "When to hand it off",
  "The signals you've outgrown solo. When to hire, when to rent senior help, when to sell, and when to keep going.",
  spec: (
    ("Subject", "Scale · succession"),
    ("Reader", "Solo builders on AI tools"),
    ("Author", "Micah Jones"),
    ("Status", "Chapter ten of ten"),
    ("Time", "A six-minute read"),
    ("Rev", "2026.08"),
  ),
)

#show: manual.with(chapter-num: "10")

== The question arrives disguised

Nobody wakes up and asks "have I outgrown solo?" The question shows up wearing work clothes: support answered at midnight again. A feature you know exactly how to build, waiting three weeks for your hours. LOOP.md logging introductions you never followed up, because the loop now produces more than one person can catch.

Chapter one's wall was the tool's limit: a context window your codebase outgrew. This last wall is yours: hours, skills, and appetite, and it deserves the same treatment this book gave the first one. Not vibes. Signals, read honestly, and a decision made on purpose.

One reframe before the signals. Solo was never an identity. It was a strategy for a phase, and this manual's whole premise is that the phase now stretches further than it ever has: one person with these tools and these disciplines reaches what took a team five years ago. The ceiling is higher. It is still a ceiling.

== Five signals, checkable

*The queue signal.* Paying users routinely wait more than a week for fixes you already know how to make. Not hard problems. Queued problems.

*The ceiling signal.* Growth is flat for a quarter, and the constraint is provably not demand: the loop ledger shows conversations you declined, intros gone stale, a waitlist aging.

*The skill signal.* The next milestone needs a craft you do not have and do not want: an enterprise sales motion, a mobile app, a compliance audit at a tier beyond chapter seven.

*The dread signal.* Some part of the work you now actively avoid. Dread compounds like drift: quietly, then suddenly, and it is the honest early warning of the burnout that ends projects.

*The bus-factor signal.* Real customers depend on a system only you can operate. You are the single point of failure in your own five-box diagram, and sophisticated customers and buyers can see it from the outside.

None of these alone means hire tomorrow. Two or three, persisting across a quarter, mean the question is live and deserves a written answer.

== The four roads

#decide-row(
  [The signals are absent, margins are strong, and the ceiling is still above you.],
  "Keep going",
  [Legitimate, and further-reaching than ever. The one rule: choose it on purpose, in writing.],
)
#v(8pt)
#decide-row(
  [The overflow is *repeatable and full-time shaped*: support, success, operations, content.],
  "Hire",
  [Hire against the dread list. Write the role as rules-with-reasons first.],
)
#v(8pt)
#decide-row(
  [The gap is *senior judgment, for a season*: a launch, an enterprise motion, a compliance push.],
  "Rent it",
  [A fractional operator: days a week, months not years. Define the milestone first.],
)
#v(8pt)
#decide-row(
  [The appetite is gone, or someone strategic values it more than you do.],
  "Sell",
  [A real market for small, profitable software. Sell from strength, never the burnout bottom.],
)

Three of the four deserve a closer look, and one deserves a disclosure.

*Hiring* goes wrong in one predictable way for solo builders: the first hire is a junior developer "to help with the code," and now you run two jobs, the product and a mentorship, while the code review from chapter one doubles. The work that actually transfers first is the repeatable kind. And before any hire, run this book's reflex: write the job as rules-with-reasons, and if a file plus a machine check can do it, ship that instead of a salary.

*Renting* is my own trade, so weigh my bias as you read this. The honest test survives the bias: if the gap is senior judgment for a season, renting beats hiring, because milestone-shaped needs end and salaries do not. If the gap is repeatable hours forever, renting is an expensive way to avoid a decision. Scope it like an engagement, not a marriage: the milestone, the season, what done means, written before the search starts.

*Selling* has a fact most solo builders never hear: everything this manual made you write down is your data room. The spec, the invariants, the architecture napkin, the vendor sweep, the machine-run checks, USERS.md, LOOP.md: a buyer's diligence is a walk through files you already keep, and a loop that runs without your push (chapter nine's whole point) is precisely what gets paid for. You have been building the exit packet since chapter one, whether or not you ever use it.

#fieldnote[
  The exits I was inside all taught the same pattern: what gets
  valued is what keeps working when the hero takes a vacation. The
  list is on the last page.
]

#warstory("Entry · 2026-08-31", "Written the week I chose road one")[
  Full disclosure about the person giving this advice: I am writing
  this final chapter in a week where hundreds of people pay for an
  app I still run alone, next to a consulting practice. The signals
  get scored, and I keep choosing solo, on purpose, on terms this
  book taught me.

  The terms are the point. Every rule a machine can run, runs by
  machine. Memory lives in files, so no session, human or otherwise,
  starts from amnesia. The loop moves on artifacts while I sleep.
  Solo stopped meaning "everything depends on me" the day the
  systems started carrying their share, and that is the only version
  of solo I would recommend to anyone.

  The day the signals flip, I will take this chapter's advice like
  anyone else. It is written to the same standard as the rest of the
  book: advice I am willing to follow in public.
]

== The wall, one last time

Look at what this book actually taught, end to end. Chapter one: the tool's memory fails, so judgment moves into files. The spec carried your intent. The database carried your rules. Stripe carried the money truth. The checks carried your hard-won lessons. The artifacts carried your product to strangers. Every chapter was the same move at a different altitude: take something that lived only in you, and hand it to a system that does not forget, does not sleep, and does not need you standing there.

Handing off was never the last chapter. It was the skill the whole book was teaching.

#pull[You were never learning to build alone. You were learning to build something that survives you, and that skill works at every size: a session, a launch, a company.]

== The last pre-flight

#preflight(
  "Pre-flight · The hand-off",
  [*Score the five signals quarterly, in writing.* Queue, ceiling,
    skill, dread, bus-factor. Two or more, persisting, means the
    question is live.],
  [*Choose on purpose.* "Keep going" is a decision with a date on
    it, recorded in the spec's NOW, not a default you drift into.],
  [*Before any hire, write the job as rules-with-reasons.* If a file
    and a check can do it, ship those instead. What remains is the
    real job.],
  [*Rent senior judgment by the milestone.* The season, the outcome,
    and what done means, defined before the search, reviewed at the
    end like any engagement.],
  [*Keep the repo sale-ready even if you never sell.* The files this
    book had you write are the data room, and a business legible to
    a stranger is also one that is easier to run yourself.],
)

That is the manual. Ten chapters, one move: past the wall, on purpose, with systems that remember. Go ship the thing.

#pagebreak()
#v(20pt)
#line(length: 100%, stroke: 1.2pt + cw-espresso)
#v(14pt)
#kicker("End · The 80% Wall", fill: cw-terracotta)
#v(7pt)
#text(font: display-font, size: 26pt, weight: 800, fill: cw-espresso)[Build past the wall.]
#v(14pt)
#text(size: 10.2pt)[
  Thank you for reading. The companion files that ship with this
  manual, the prompt files, the pre-flight checklists, and the spec
  templates, are the working versions of everything you just read.
  They arrived alongside this PDF with your purchase. Chapter one is
  free for anyone at micahjonesconsulting.com/playbook: send the
  builder you know who is stuck at 80%.
]
#v(20pt)
#kicker("Who wrote this", fill: cw-terracotta)
#v(8pt)
#text(size: 9.8pt)[
  I'm Micah Jones. I sold enterprise software inside SurveyMonkey on
  the way to its IPO, and I was inside Postmates, Guardicore, and
  Neuton.AI for their exits: \$5B+ in combined value. My consulting
  work has produced \$20M+ in client revenue, and Ordani, the app in
  these pages, is a HIPAA-compliant SaaS I built alone on the same AI
  tools this manual is about. Hundreds of birth workers pay for it
  today.
]
#v(14pt)
#block(width: 100%, fill: cw-espresso, inset: (x: 17pt, y: 15pt), radius: 2pt, breakable: false)[
  #kicker("If your build needs a second pair of hands", fill: cw-saffron, size: 7pt)
  #v(7pt)
  #set text(size: 9.8pt, fill: cw-bone)
  #set par(leading: 0.66em, spacing: 0.85em)
  Some builds need the fractional chapter of this book made real. I
  take a small number of engagements: the strategy and the software,
  from one person. Thirty minutes, bring the problem.

  #text(weight: 700, fill: cw-saffron)[micahjonesconsulting.com/book]
]
#v(1fr)
#text(font: mono-font, size: 6.5pt, fill: cw-espresso.transparentize(40%), tracking: 0.1em)[
  © 2026 MICAH JONES · THE 80% WALL
]
