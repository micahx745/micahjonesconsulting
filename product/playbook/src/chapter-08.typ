// chapter-08.typ — "The first ten users"
//
// Chapter 8 of The 80% Wall. Paid content; next-chapter close.
// Author's strongest domain (GTM). Verified claims only: Ordani's 14
// practices in private beta, hundreds paying, none lost to a
// competitor (approved ledger phrasings). The build-log entry is
// today's real outreach email (2026-08-31), anonymized: no names, no
// business identified.
#import "template.typ": *

#chapter-open(
  "08",
  "The first ten users",
  "Getting to the first ten people who keep using it. Where they come from, and why posting stopped working.",
  spec: (
    ("Subject", "Distribution · first users"),
    ("Reader", "Solo builders on AI tools"),
    ("Author", "Micah Jones"),
    ("Status", "Chapter eight of ten"),
    ("Time", "A ten-minute read"),
    ("Rev", "2026.08"),
  ),
)

#show: manual.with(chapter-num: "08")

== It shipped. Nobody came.

The sales page of this manual opens with three sentences of pain, and this chapter is the third one. The app works. The deploy held. The security checks passed. You posted it where builders post things, refreshed the analytics, and watched a spike of visitors arrive, click twice, and never return.

Here is the part that should comfort you, and then the part that should change your week. The comfort: this is not evidence your product is bad. The launch-post lottery was always a lottery, and it has gotten worse, because the feeds are now full of AI-built demos that all look competent. A working app is no longer rare enough to be news. The change: you were never actually playing for a crowd. You were playing for ten people, and ten people have never been reachable by broadcast.

#define("A user, versus a tourist")[
  A tourist clicks, pokes, and leaves. A user returns without being
  reminded. Your first milestone is ten users, by that definition,
  and nothing on an analytics dashboard counts toward it.
]

Selling has been my trade longer than building: enterprise software inside SurveyMonkey on the way to its IPO, and \$20M+ in client revenue since. Every expensive thing I know about finding the first customers compresses into one sentence: _the first ten come from conversations, not audiences._

== Where the ten actually live

#rings-diagram()

The rings are ordered by trust, and trust is the whole game at zero users, because a stranger trying an unknown app is spending the scarcest thing they have: the willingness to be disappointed again.

*The inner ring* is people who already know you. Not "my followers." The forty people who would answer a text. Most builders skip this ring out of embarrassment, which is exactly backwards: these are the only people on earth who will forgive a rough edge because they trust the person behind it.

The move in this ring is not "check out my app." It is one message, one person, no blast: name the specific problem, ask if it is real for them, and if it is not, ask the ring-two question: _"who do you know who deals with this?"_ A no that produces an introduction is a better outcome than a pity signup.

*The second ring* is the people they vouch you to. An introduction moves trust you did not have to earn. This is where most of your ten live, and the arithmetic is humbling and freeing at once: ten users at a plausible hit rate is somewhere around a hundred conversations. A hundred conversations is a month of mornings. No audience required.

*The outer ring* is strangers who verifiably have the problem: the forum where they complain about it, the professional group where they gather, the community your niche actually uses. You reach them the same way, one at a time, by being useful in their space before you ask for anything. The niche matters more than the platform: birth workers, to pick an example I know, are not on the builder feeds at all, and no launch post would ever have found them.

#fieldnote[
  Ordani opened as a private beta with fourteen practices, found
  through the rings, not through a launch. Hundreds of birth workers
  pay for it today, and at the six-month mark none had been lost to
  a competitor. Retention was the plan, not the reward.
]

== The message that gets a reply

Cold or warm, the anatomy of outreach that works has not changed in twenty years of selling. Four parts, in order.

*Context that is really about them.* One line proving this is not a blast: the mutual person, the post of theirs you read, the specific thing about their situation. If the first sentence could be sent to anyone, it will be answered by no one.

*Proof you looked.* Quote their own words back: the problem as they described it, in their phrasing, from their forum post or their website. Nothing earns a reply like being genuinely heard.

*One concrete offer, work-shaped.* Not "would love your feedback." Offer to do something for them: set it up for them, migrate their data, run their first week yourself. At ten-users scale, unscalable is not a compromise. It is the strategy.

*A one-step ask.* Reply to this email. Pick a time. Send the file. One verb, low friction, no account creation standing between them and yes.

#warstory("Entry · 2026-08-31", "One email, not a launch")[
  This week I needed a new client for my consulting practice, which
  is the same problem as first users wearing a collar. I wrote one
  email, to one person, introduced through a mutual friend.

  It opened with her week, not my services. It quoted the best
  sentence from her own website back to her, because I had actually
  read it. The offer was work, not talk: take a week of what her
  current provider produces, remake all of it in my style, free,
  judged side by side. The ask was one step: reply.

  No launch, no post, no audience. One researched email to one
  right person, with an offer that costs me effort instead of
  costing her trust. That shape closed enterprise deals when I
  carried a quota, and it is exactly the shape that finds ten users.
]

One more thing about the writing itself, because this manual is about building with AI: let the model draft the paragraph, never the specifics. The personal layer, the mutual friend, the quoted sentence, the offer only you can make, is chapter two's lesson wearing a sales hat: the part the AI cannot generate is the part that works. Everyone can smell machine-written outreach now. The specifics are the moat.

== Track ten people like you track invariants

You will not hold a hundred conversations in your head. Chapter one's answer applies to humans too: memory goes in a file, in the repo.

#filecard("USERS.md")[
  \# One block per person. Updated after every conversation.

  \#\# Dana R. — ring 2, via Marcus

  Problem: schedules clients in three apps, hates all three.

  Last: 08-28, demo call. Asked twice about calendar sync.

  Next: onboard her real client list myself, Thu.

  Returned unprompted: yes, twice. #text(weight: 700)[Counts toward the ten.]
]

Ten blocks like this outperform any CRM you would configure and abandon. And the file does double duty: "asked twice about calendar sync" is tomorrow's spec input. Your first ten users are also your first ten product decisions, which is why collecting them by hand, slowly, is not the inefficient version of growth. It is the version where you learn what you built.

== Pre-flight: the first ten

#preflight(
  "Pre-flight · First users",
  [*Write the ten-name list tonight.* Inner ring first: people who
    would answer a text, who touch the problem or know someone who
    does. The list is usually easier to write than it felt.],
  [*One conversation a day.* Personal, specific, no blast. A no that
    ends in "but talk to..." is a win; log the introduction.],
  [*Make one unscalable offer.* Set it up for them, migrate the
    data, run the first week. Effort you spend is trust they don't
    have to.],
  [*Keep USERS.md current.* One block per person, updated after
    every conversation. What they ask about twice goes to the spec.],
  [*Count returns, not signups.* Someone who comes back unprompted,
    twice, is one of your ten. Ten of those, and the next chapter's
    loop has fuel.],
)

Ten people who return without being reminded, each one known by name, each one a conversation you can quote. That is not a small start on distribution. That is distribution, working. The next chapter is about the loop that turns those ten into a hundred without ever touching broadcast.

#pagebreak()
#v(20pt)
#line(length: 100%, stroke: 1.2pt + cw-espresso)
#v(14pt)
#kicker("Next · Chapter 09", fill: cw-terracotta)
#v(7pt)
#text(font: display-font, size: 19pt, weight: 800, fill: cw-espresso)[The distribution loop]
#v(8pt)
#text(size: 10.2pt)[
  Turning the first ten into the next hundred. Reply, don't
  broadcast. The metric that matters before MRR.
]
#v(1fr)
#text(font: mono-font, size: 6.5pt, fill: cw-espresso.transparentize(40%), tracking: 0.1em)[
  © 2026 MICAH JONES · THE 80% WALL
]
