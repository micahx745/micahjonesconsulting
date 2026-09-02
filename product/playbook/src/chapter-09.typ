// chapter-09.typ — "The distribution loop"
//
// Chapter 9 of The 80% Wall. Paid content; next-chapter close.
// The build-log entry is self-referential and reader-verifiable: this
// manual's own free-chapter loop (share-it-don't-sell-it line, footer
// URL on every page, reply-ask in the delivery email) — all true and
// shipped 2026-08-31. Ordani claims: approved phrasings only.
#import "template.typ": *

#chapter-open(
  "09",
  "The distribution loop",
  "Turning the first ten into the next hundred. Reply, don't broadcast. The metric that matters before MRR.",
  spec: (
    ("Subject", "Growth loops · referrals"),
    ("Reader", "Solo builders on AI tools"),
    ("Author", "Micah Jones"),
    ("Status", "Chapter nine of ten"),
    ("Time", "A six-minute read"),
    ("Rev", "2026.08"),
  ),
)

#show: manual.with(chapter-num: "09")

== The instinct to resist

You have ten users who return without being reminded. You know their names. And right on schedule, the old instinct comes back: _now_ we scale. Now comes the content calendar, the newsletter, maybe some ads. Now we broadcast.

Resist it. Broadcasting did not find your first ten, and it will not find your next ninety. What finds them is the same machinery from chapter eight, upgraded in one specific way: it has to start running _without you pushing every lap._

#define("Distribution loop")[
  A repeatable path from a happy moment inside your product to a new
  person hearing about it from someone they trust, where each cycle
  costs you less effort than the last. Growth without a loop is just
  your labor, invoiced weekly, forever.
]

#loop-diagram()

The loop has four stations, and you built three of them in the last chapter. Users return. Value moments happen. The new station, the one this chapter installs, is the third box: the moment where a win becomes either an _ask_ or an _artifact_, and someone new hears about you from a voice that is not yours.

== The metric that matters before MRR

Revenue is a lagging indicator at this stage, and it will lie to you in both directions: a burst of launch-week charges from tourists, or honest zero while ten serious users evaluate. The number that tells the truth is this one:

#pull[How many of your users came from your users? Count the second-hand users. That number is your distribution, and before MRR, it is the only growth number that isn't noise.]

#fieldnote[
  This is also the honest read on chapter eight's Ordani numbers.
  Retention is what makes a loop possible at all: nobody refers a
  tool they are halfway out the door on.
]

A second-hand user arrived because a user mentioned you, sent an artifact, or made an introduction, with no push from you. Track it weekly. If it is zero, nothing is wrong with your product, but nothing is compounding either: every user you have, you personally hauled in, and every user you ever get will cost the same labor. The rest of this chapter exists to move that number off zero.

== Reply, don't broadcast

Attention arrives at a small product constantly, in tiny amounts: a support email, a question in a community, a reply to your chapter-eight outreach, someone's offhand mention. Broadcasting ignores all of it to go shout at strangers. Replying compounds it.

The doctrine is one habit with two venues. In private: answer every user email fast and personally, because at your scale, support _is_ marketing, and the person who got a founder's reply in nine minutes tells that story for you. In public: answer real questions where your users gather, the forum thread, the professional group, the subreddit, completely and generously, without pitching. A good public answer is a permanent artifact: it keeps being found, keeps being useful, and keeps carrying your name to ring three long after you wrote it.

That is also the honest way to think about "content." A content calendar asks _what should I say this week?_ The reply doctrine asks _what did someone actually ask?_ The second question has an inexhaustible supply and a guaranteed audience of at least one.

== Engineer the ask, then the artifact

*The ask.* Chapter eight's ring-two question, "who do you know who deals with this?", now gets a schedule: it fires at the value moment, every time. Someone says thanks. Someone hits a win. Someone renews. That is the one moment when helping you feels like the natural next sentence, and the ask must be specific to be answerable: not "tell your friends," but "which other trainer do you know who's still juggling three apps?" One name is a win. Log the introduction in USERS.md and run chapter eight on it.

*The artifact.* The stronger station, because it works while you sleep: make something your product produces in _normal use_ visible to people who don't use it. The booking page a trainer sends every client. The invoice with quiet, dignified product credit in the footer. The export, the report, the shared link. When the product's output travels to non-users as a matter of course, every active user is distribution, and nobody had to be asked anything.

The test for a good artifact is that it serves the _recipient_ first: the client got a booking page that worked beautifully on her phone. The credit line rides along; it never leads.

#warstory("Entry · 2026-08-31", "The book that carries its own loop")[
  You are holding this chapter's example. The first chapter of this
  manual is free, and it ships with its loop built in: the copyright
  line reads "share it, don't sell it," because a shared chapter is
  the artifact doing its job. Every page you are reading carries the
  URL in the footer, so the artifact knows the way home. And the
  email that delivers chapter one ends with an ask sized to a value
  moment: hit reply if it lands. I read every response.

  None of that is growth hacking. It is one free artifact built to
  travel, one specific ask at the moment the reader has gotten
  something, and replies answered by a person. The same three moves
  this chapter just handed you, running on the book that taught you
  them.
]

== What not to build yet

Three things wait until the loop runs. *Paid ads*: buying traffic without a loop is pouring water into a bucket you haven't checked for a bottom; ads amplify loops, they do not create them. *SEO at scale*: a library of articles for strangers can wait until the replies you write in public tell you which questions are worth a permanent page. *The growth newsletter*: a broadcast list of strangers is a vanity number. The list worth mailing is the one chapter six's waitlist built: people who asked to hear from you, written to like humans, rarely.

#filecard("LOOP.md — weekly, five lines")[
  \# Week of 09-01

  Returning users: 11 (+1)

  Conversations: 6 · Asks made: 4 · Intros received: 2

  Second-hand users: 1 (Dana sent her colleague. FIRST ONE.)

  Artifact check: booking pages viewed by 31 non-users this week.
]

Five lines, once a week, next to USERS.md and your spec. The week the second-hand line stops reading zero is the week you have a business instead of a project, whatever the revenue says.

== Pre-flight: the loop

#preflight(
  "Pre-flight · Distribution",
  [*Count your second-hand users, today.* Users who came from users.
    Zero is normal and temporary; it is also the number everything
    below exists to move.],
  [*Fire the ask at every value moment.* A thanks, a win, a renewal:
    one specific who-else question. One name is a win; log it and
    run chapter eight on it.],
  [*Ship one traveling artifact.* Find the output non-users already
    see, or should see, and make it excellent for the recipient,
    with a quiet credit line that knows the way home.],
  [*Reply to everything within a day.* Privately to users, publicly
    where they gather. Support is marketing at your scale, and
    public answers compound.],
  [*Keep LOOP.md, five lines a week.* Ads, SEO, and newsletters wait
    until the loop runs without you pushing every lap.],
)

Ten became the machinery for a hundred, and the machinery runs on retention, replies, and artifacts instead of your mornings. Which surfaces the last question this book owes you, the one nobody builds alone forever without asking: when is the right time to stop being the only pair of hands?

// Sampler/standalone only; the book suppresses teasers (Pass-45).
// Text mirrors ch.10's dek — "fractionalize" was jargon the dek
// itself avoids.
#sampler-only[#pagebreak()
#v(20pt)
#line(length: 100%, stroke: 1.2pt + cw-espresso)
#v(14pt)
#kicker("Next · Chapter 10", fill: cw-terracotta)
#v(7pt)
#text(font: display-font, size: 19pt, weight: 800, fill: cw-espresso)[When to hand it off]
#v(8pt)
#text(size: 10.2pt)[
  The signals you've outgrown solo. When to hire, when to rent
  senior help, when to sell, and when to keep going.
]
#v(1fr)
#text(font: mono-font, size: 6.5pt, fill: cw-espresso.transparentize(40%), tracking: 0.1em)[
  © 2026 MICAH JONES · THE 80% WALL
]]
