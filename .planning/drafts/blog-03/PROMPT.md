# Draft blog post 3 for micahjonesconsulting.com: selling when you are a builder

TOPIC (from the evidence): builders with a working product who cannot sell it; most of their questions are about cold
outreach and what to say. Their words, verbatim, public posts: "Should I focus on my current users or continue to do
outreach and scale?" · "Been building for a while and I'm a little lost. Can you guys help?" · "How to sell SaaS without
AI features" · they write "cold outreach", "cold email", "can't sell", "how to sell". The post answers: how do I sell my
app when I am a developer, not a salesperson: who to contact, what to say, how to follow up, how to handle the first
sales call, and what to measure. Generic, practical, first person advice.

## The style model: post 1, LOCKED by the operator (match its voice, shape and restraint exactly)
It is below. What the operator approved in it: plain first person advice ("the message I would send"), answer-first at
the top of each section, question-shaped H2s a person would type, one concrete example or sentence they can copy per
section, real tools only where they execute a step (with what you do in them), mostly prose, about 1,200 to 1,500
words, no stories about the author, no client names, no sales pitch, and the same "About me" foot at the end.

## Hard rules (a lint gate checks most of these; the build fails on banned words)
- NO stories or facts about Micah or any client in the body. NO pitch in the body. End with EXACTLY this foot:
  "---" then "**About me.** I'm Micah Jones. I have $20M+ in revenue behind my work. Four companies I worked inside
  reached an exit, and the disclosed deal values total $5B+. [What I do](/services) · [See the work](/work)"
- No statistics or percentages of any kind (no "conversion rates are usually X%"). No invented studies.
- Never: "it shipped, nobody came", "the playbook", "we"/"our"/"us", em-dashes, and these framework words: qualified
  visit, useful result, request to continue, path to value, segment evidence, north star, leverage, unlock,
  game-changer, journey, seamless, robust, delve, "at the end of the day", "the bottom line".
- No three short fragments in a row; no moral-of-the-story ending; lists under 30% of lines; average sentence under
  22 words, none over 40; at most 1,500 words of prose.
- Banned words:
  unlock, drive, leverage, elevate, synergy, transformative, game-changing, best-in-class, at the intersection of, seamless, seamlessly, cutting-edge, revolutionary, world-class, next-generation, holistic, robust, innovative, dive deep, circle back, low-hanging fruit, move the needle, make an impact, delight users, craft experiences, passionate about, obsessed with, journey, solutions, empower, most chosen, most popular, best-selling, bestseller, fastest-growing, load-bearing, load bearing
- Tools or GitHub repos: only real, widely known ones, each where it executes a step; mark each "(VERIFY)" so the main
  session checks it before anything ships. Never invent a feature or price for a tool.

## Return
1. THREE titles phrased the way a person searches, and your pick with one line why (the H1 uses your pick).
2. The full post in Markdown, ending with the About me foot.
3. TOOLS: every tool or repo named, with URL and the claim you make about it.

---
# STYLE MODEL: POST 1 (LOCKED)
# How do I get first users for a vibe-coded product without an audience?

Your app works. The page has been live for a month, the signup count reads one, and that one is a friend.

Here is the answer; the rest is the mechanism. You get first users by finding ten specific people who already do the job your app does, by hand, and asking each of them to let you watch. Do that before you touch the landing page again or post anywhere. It feels impossible because you are trying to be found, and nobody is looking for you yet.

## Why is nobody signing up for my app?

Because nobody knows it exists, and the few who found it could not tell in five seconds whether it was for them.

The first problem is arithmetic. A new site with no links pointing at it gets a handful of visits a day, and most of those are you.

The second is the promise. A vibe-coded app is cheap to widen and expensive to explain, so the homepage ends up promising to "manage your whole workflow," and the visitor with one annoying task cannot find it in there. A promise that covers everything cannot be priced, policed or sold.

## Who should my first users be?

One narrow group that does the job by hand today and that you can reach by name. Ten people, not a market.

"By hand today" is the filter that matters. Someone with a spreadsheet, a group chat or a paper form for this job has already proven the problem is worth their time. Someone who says the idea sounds cool has proven nothing. Someone running the job through a group chat is already paying for it in hours.

Write the ten names down. If you cannot name ten, narrow the group until it has an address, or find a better place to reach the people in it. Look where they ask about the job: forum threads, a trade group, a services page that lists the task. One line of evidence beside each name; a list of plausible names produces nothing.

## How do I reach early users when I have no audience?

One message at a time, asking to watch, not asking them to try the app. Fifteen minutes and a screen share is a real cost. Keep the ask that small and that specific, and say what they get for it: the first version of a tool built around the way they actually work, and a say in what it does. "Try my app" asks for an hour and offers nothing.

The message I would send is under 80 words. It names the evidence that they do the job, says I am building something for exactly that, and asks for 15 minutes to watch them handle one real case the way they do it now. It says what is in it for them. No link. On the call they share their screen and you keep quiet. Notice the sigh, the third tab and the thing they type twice: that is your product, and their words while doing it are your homepage.

Send 20 of those messages over a week and expect four or five replies, as a rough expectation rather than a test. If fewer come back, the cause can be the targeting, the timing, whether they trust a stranger, or the ask itself. Change one of those and send another 20 before you conclude anything about demand.

## How do I turn an interview into a first user?

Offer a guided trial on their next real task, agree up front on what a good outcome looks like, then step back and see whether they come back to it without you.

At the end of the call, ask what the next real instance of this job is and when it lands. Offer to sit with them for that one: you set the app up, they do the task in it, you fix what breaks as it breaks. Before you start, say out loud what success would be, in their terms: "the checklist is right without you editing it," or "this takes under ten minutes." They will tell you if that is the wrong bar, and that is worth knowing before you build toward it.

Then leave. A week later, check whether they opened it on their own and ran a second task through it. That unaided second use is the line between a person who was polite on a call and a user. If they did not come back, ask what they did the next time the job came up instead. The answer is usually more useful than any feature request.

## Should I charge my first users or make it free?

Charge, at a price that is small next to what the job costs them, and ask once someone has a real result and has come back for a second use without your help. Free signups do not prove anyone would pay, though repeat use can still prove the thing is useful.

Price is a question, not a setting. After that second use, you say: "That took four minutes instead of forty, twice. If you want to keep doing that, it is $29 a month. Here is the link." Then you say nothing. Count the payments that clear, not the people who said they would.

The comparison is what the job costs them now: the hours, the missed deadline or the freelancer they were paying. Price under that and above zero.

Make the checkout with [Stripe Payment Links](https://docs.stripe.com/payment-links): create a product, set the price, get a URL, no code in your app. Send it in the same message as the ask. "I would probably pay" with no link in front of it is a compliment, not a customer.

## How do I know if it is working?

Count four things by hand: how many of the right people saw the app, how many got one real result, how many came back on their own, and how many paid.

Zero signups from ten visits is too little evidence to judge, which is why you count people you can name rather than sessions. Still, install one thing so you know whether anyone came. [umami](https://github.com/umami-software/umami) is lightweight, privacy-friendly analytics that counts visits and the few events you tell it to. If you want to see what people did, [PostHog](https://posthog.com) is open source ([PostHog/posthog](https://github.com/PostHog/posthog)) and tracks those events as a funnel and records sessions; watch five recordings of people who landed and left. Where they stall is usually where your onboarding assumes they know something they do not.

For the people who got in and stopped, [formbricks](https://github.com/formbricks/formbricks) puts a one-question survey inside your app at the step they abandon. Ask "what were you hoping this would do?" and nothing else. The answers are your next homepage draft.

When the counts come back, change one thing. If the right people are not showing up, the list or the message is wrong. If they show up and do not get the result, the first five minutes of your app are wrong. If they get the result and do not come back, the job is rarer or smaller than you thought. If they come back and will not pay, the price is off or the promise is aimed at the wrong person. Each is a different week of work, and mixing them is how a month disappears.

## How many users is enough to know I am on the right track?

Fewer than you think, and it is a shape rather than a number. You are on the right track when people you did not sit with are running real work through the app on their own, and some of them have paid. Three of those tell you more than three hundred signups from a launch post who never opened it again.

Nobody can give you a count that certifies it, and anyone who does is guessing. What you can watch is whether each round of ten conversations produces more of those people than the last one. When it does, keep going. When it does not, go back to the four counts and change one thing.

## What should I do this week?

Write the ten names today, with the evidence beside each. Send the first five messages tomorrow. Take every call that comes back, watch, and end each one by offering to sit with them on the next real task. Note who comes back on their own; when one of them does, send the price and the link the same day. By Friday you will know something you do not know now, which is more than the last month of feature work told you.

---

**About me.** I'm Micah Jones. I have $20M+ in revenue behind my work. Four companies I worked inside reached an exit, and the disclosed deal values total $5B+. [What I do](/services) · [See the work](/work)
