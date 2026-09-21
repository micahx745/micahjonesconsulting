# Jury: blog post 1, two full drafts (P and Q). Blind: you are not told who drafted which. Under 500 words.

The operator's words on what the blog is, verbatim: "are the blogs written mostly like giving advice (for example
potential customer googles how to get customers for vibe coded project and this pops up. it gives enough advice where
they can go use a specific product, github repo, etc to use but also makles them want to pay me to get more insight
that would prove even more valuavle. Rather than sharing stories like the work page does?"
Approved (his popup, 2026-09-21): title "How do I get first users for a vibe-coded product without an audience?";
X's diagnostic spine + Y's procedures; a worked example, a copyable outreach message, an interview script, thresholds,
real tools and GitHub repos where they execute a step; handoff The Audit ($2,500, positioning and GTM). Claim rules: no
birth-worker or Guardicore result as proof for an app launch, nothing implying ORDANI charged early, no homepage promise
as a result, first person "I" only, no em-dashes. Checked already: both pass banned words, barred facts and em-dashes;
every tool URL resolves; NEITHER names a real GitHub repository (the operator asked for repos).

## Answer in this shape
1. SCORES for P and Q, 1-10: USEFUL (a reader can act today), CREDIBLE (sounds like a senior operator, no overclaim),
   VOICE (plain, first person, not AI-generic), CONVERSION (makes paying for the Audit the natural next step).
2. BASE: P or Q, one line why. GRAFT: at most three specific passages from the other (quote their first words).
3. MUST-FIX in the base: every sentence that overclaims, invents a fact about Micah, reads generic or AI-like (quote
   it and give the fix), and any advice that is wrong or risky.
4. GITHUB: name 1-3 REAL, currently maintained open-source repositories (owner/repo) that would genuinely execute a step
   in this post, and where each goes. Only repos you are sure exist; say "none" rather than guess.
5. THRESHOLDS: are the numbers the post gives (conversations, reply rates, days) sound as advice? Which to soften.

---
# DRAFT P
# How do I get first users for a vibe-coded product without an audience?

If your product has few signups, do not add features yet. Pick one buyer, name the job they already need done, and talk to ten of them. Then test one promise, one path to a useful result, and one paid next step.

## Why are people visiting without signing up?

Separate three events: a qualified visit, a first useful result, and a request to continue. “No traction” is too vague to tell you what to fix.

A qualified visit comes from someone who matches your chosen buyer and understands the problem. A first useful result happens when that person completes the narrow job your product promises. A request to continue asks them to pay, book another session, invite a colleague, or provide the next real input.

Track those events separately. A signup is not a useful result. A homepage visit from the wrong person is not a qualified visit.

Use [PostHog](https://posthog.com/docs/product-analytics/funnels) (VERIFY) to create a three-step funnel for those events. Watch five relevant recordings with [PostHog Session Replay](https://posthog.com/docs/session-replay) (VERIFY), with sensitive fields masked. Interview five people who stopped.

If you cannot find five qualified visits, work on the audience or channel. If qualified visitors start but do not finish, inspect onboarding. If they finish but decline the next step, inspect the value and offer.

**Hypothetical example:** ReviewReady is a fictional product that turns scattered podcast revision notes into a time-coded editing checklist. Its first useful result is not creating an account. It is producing a checklist an independent podcast editor confirms is accurate enough to use.

## Who should I ask to become an early user?

Choose one narrow group that already handles the problem without your product. Existing behavior matters more than stated interest.

For ReviewReady, I would start with independent podcast editors who manage several client shows and receive revision notes through email, chat, and shared documents. I would not begin with “podcasters.” Hosts, producers, agencies, and editors have different work and different reasons to buy.

List 25 people who show evidence of doing the job now. Evidence might be a service page, a public post about revision rounds, or a question about managing client feedback.

Ask for 15 minutes to see how they handle one recent example. Do not ask whether they like your idea. Ask them to show you the current process.

Here is a copyable outreach message:

> Hi [Name], I noticed [specific evidence that they do this work]. I’m studying how [specific buyer] handles [specific job] today.  
>
> Could I watch you work through one recent example for 15 minutes? I’m testing a small product that [narrow outcome], but I want to understand where the current process breaks before asking anyone to use it.  
>
> If it fits, I’ll help you run one real case through it. No deck and no preparation needed.

For ReviewReady, the narrow outcome becomes: “turn client revision notes into one time-coded edit checklist.”

Use [Google Sheets](https://support.google.com/docs/answer/6000292) (VERIFY) to keep the prospect list and record the evidence that each person matches the segment. Do not fill the sheet with names that merely sound plausible.

Aim for ten conversations before making a broad product decision. After 20 carefully selected messages, four replies is a useful working threshold. Fewer than four replies, below a 20% reply rate, means I would change either the segment or the opening line, not both.

That threshold is an operating rule for a small test, not a market benchmark.

## What should my landing page say?

Lead with the buyer, the job, and the result. Put the technical explanation below that promise.

A vague ReviewReady headline might say:

> AI-powered feedback management for modern audio teams.

That line requires the visitor to interpret the category and imagine the benefit. Rewrite it as:

> For independent podcast editors: turn scattered client notes into one time-coded edit checklist.

The revised line names the buyer, the input, and the result. The page can then show one before-and-after case note:

- **Before:** Revision requests sit across email, chat threads, and document comments.
- **Trigger:** A client sends another revision round before the episode deadline.
- **Result:** The editor gets one checklist with timestamps, requested changes, and status.

Keep this case note factual when you replace the hypothetical example with a real user. Do not turn a promise into a result. Record what happened before, what triggered the search, and what changed after use.

Use the words your buyer used before switching. If every editor says “revision notes,” do not replace that phrase with an internal feature name.

This distinction is central to how I describe the work: “I find what your buyers are actually paying for, then build the system that sells exactly that.”

## Where should I look for my first users?

Go where your chosen buyers already discuss the problem. Answer three existing questions with a useful process before sharing a link.

Use [Reddit Search](https://support.reddithelp.com/hc/en-us/articles/19695647891988-How-does-Reddit-search-work) (VERIFY) to search posts and comments inside relevant communities. Search the language from your interviews, such as “client revision notes,” rather than your product category.

A useful reply for the ReviewReady buyer could explain how to:

1. Collect every request in one place.
2. Preserve the original wording.
3. Add or correct each timestamp.
4. Combine duplicate requests.
5. Mark unclear items for the client before editing.

That answer should stand on its own. Do not open with your product link. Mention the product only when community rules allow it and the reader asks for a faster way to perform the process.

This work serves two purposes. It puts you in front of people already dealing with the job, and it reveals questions your landing page has not answered.

Stay with one community or outreach channel for seven days. Adding several channels at once makes it harder to tell whether the audience, message, or location caused the response.

## What should happen during the first five minutes?

Make the first useful result smaller than the whole product. Remove setup that does not contribute to that result.

For ReviewReady, direct onboarding would ask the editor to paste one real revision brief. The product would produce a checklist. The editor would correct missing context, confirm the timestamps, and export the accepted version.

That completed checklist is the result. Creating a workspace, connecting every client, or inviting a team can wait.

Watch the first user complete this path. Do not explain around confusing parts. Note where they hesitate, what they expect to happen, and what they call each step.

Then interview that user for the words they used before switching. Use this five-question script:

1. Tell me about the last revision brief you handled before trying this.
2. What happened that made you look for a different way to handle it?
3. What words did you use when you described the problem to someone else?
4. What had you already tried, and where did that process fail?
5. What result would make you pay to use this again on the next brief?

Write a short case note from the answers: before, trigger, result. Ask the user to confirm that it is accurate before publishing or sending it to another prospect.

If five qualified visitors cannot reach the result, stop changing the headline. Fix the path to value. If they reach it but do not care about repeating it, the promised result may be too small or aimed at the wrong buyer.

## When should I ask for payment?

Ask for payment after the user receives one useful result. Do not use a very low price to hide unclear value.

Direct onboarding can remove uncertainty while keeping the payment question real. The buyer should know what they received, what continued use includes, and what it costs.

For the hypothetical ReviewReady trial, the ask could be:

> You now have one checklist you can edit and export. If you want to run your next ten revision briefs through ReviewReady, the first month is $29. Would you buy that today?

The amount is hypothetical. The important part is the direct request tied to continued use.

Create the actual checkout page with [Stripe Payment Links](https://docs.stripe.com/payment-links) (VERIFY). A polite “I would probably pay” is not a payment.

After three people reach the useful result, ask all three. If none pays, do not immediately cut the price. Ask what they would do next without the product. Their answer will help you distinguish weak urgency, an incomplete result, and a mismatched offer.

## How do I know what to change next?

Run a seven-day test with one audience, one promise, and one next step. Keep the product fixed while testing the message. Then keep the message fixed while testing the product path.

For ReviewReady, the first test would use:

- **Audience:** Independent podcast editors handling client revision rounds.
- **Promise:** Turn scattered client notes into one time-coded checklist.
- **Next step:** Bring one real revision brief to a 15-minute onboarding session.

Use this schedule:

- **Day 1:** Define the buyer, current process, first useful result, and payment ask.
- **Day 2:** List 25 people with evidence that they perform the job now.
- **Day 3:** Send the first ten outreach messages.
- **Day 4:** Answer three community posts with a process, not a link.
- **Day 5:** Send the remaining messages and conduct interviews.
- **Day 6:** Run direct onboarding and make the payment ask.
- **Day 7:** Count what happened at each step and choose one variable to change.

Use a simple tracking sheet with these columns:

| Date | Person | Segment evidence | Current process | Trigger | Message version | Replied | Interviewed | Qualified visit | Useful result | Continue ask made | Paid | Objection | Exact words | Next step |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

I would use these decision thresholds:

- Fewer than 20 targeted messages means the outreach test is incomplete.
- Fewer than four replies from 20 messages means change the audience or opening line.
- Four replies but fewer than three interviews means reduce the commitment or clarify the request.
- Five interviews without two people describing the same trigger means narrow the segment or reconsider the problem.
- Five qualified visits with no useful result means fix onboarding.
- Three useful results with no payment means revisit the result or paid offer.

Change one item, run another seven days, and compare the same events. The goal is not to declare the entire product good or bad after one week. The goal is to identify the next constraint without covering it with more features.

### When the next fix is not obvious

If you need a diagnosis specific to your product, start with The Audit: $2,500, two weeks + debrief call. Pick one area at checkout: AI engineering, product building, or positioning and GTM. For this problem, choose positioning and GTM. I go through it top to bottom and hand you the written audit. The memo tells you what to fix first, and the fee credits toward what you book next.

## META DESCRIPTION

How do I get my first users for a vibe-coded product? Pick one buyer, test one promise, find the break, and ask for payment in seven days.

## TOOLS

- **PostHog (VERIFY):** https://posthog.com/docs/product-analytics/funnels  
  Claim: PostHog funnels can track ordered product events and show where users stop.

- **PostHog Session Replay (VERIFY):** https://posthog.com/docs/session-replay  
  Claim: PostHog can record and replay product sessions, with controls for masking text, inputs, and elements.

- **Google Sheets (VERIFY):** https://support.google.com/docs/answer/6000292  
  Claim: Google Sheets can create and format the prospect and test-tracking spreadsheet described in the post.

- **Reddit Search (VERIFY):** https://support.reddithelp.com/hc/en-us/articles/19695647891988-How-does-Reddit-search-work  
  Claim: Reddit Search can search posts and comments, including results within a specific community.

- **Stripe Payment Links (VERIFY):** https://docs.stripe.com/payment-links  
  Claim: Stripe Payment Links can create a shareable link to a Stripe-hosted payment page.

## CLAIMS

1. **Claim used:** “I find what your buyers are actually paying for, then build the system that sells exactly that.”

   **Exact live sentence:** “I find what your buyers are actually paying for, then build the system that sells exactly that.”

2. **Claim used:** The Audit costs $2,500 and includes two weeks plus a debrief call.

   **Exact live line:** “The Audit $2,500 Two weeks + debrief call”

3. **Claim used:** The Audit can cover positioning and GTM.

   **Exact live sentence:** “Pick one area at checkout: AI engineering, product building, or positioning and GTM.”

4. **Claim used:** Micah reviews the selected area and provides a written audit.

   **Exact live sentence:** “I go through it top to bottom and hand you the written audit.”

5. **Claim used:** The memo identifies what to fix first, and the fee credits toward the next booking.

   **Exact live sentence:** “Not sure which one? Start here: the memo tells you what to fix first, and the fee credits toward what you book next.”
---
# DRAFT Q
# How do I get first users for a vibe-coded product without an audience?

If your vibe-coded product has visits but no users, do not add features. Pick one buyer, deliver one useful result, and ask one paid next step. Start with five people who already have the problem. Then test one promise for seven days before changing the product.

## Why do visits not become users?

Separate three events: a qualified visit, a first useful result, and a request to continue. A qualified visit means the person is from your chosen buyer group and the page speaks to their problem. A first useful result means the product does one visible thing for them. A request to continue means the page asks for a next step: try, book, or pay.

Most stalled launches collapse these into one blurry number. Watch five sessions and interview five people who stopped before signup. Do not add features until you know which event loses them. PostHog (VERIFY) shows where a visitor drops between landing, first action, and result. Microsoft Clarity (VERIFY) shows the scroll, hesitation, and dead clicks without me guessing. Google Analytics (VERIFY) confirms whether the visit was qualified in the first place.

## Who should I ask first?

Choose one narrow group already trying to solve the problem. List 25 people. Ask for 15 minutes to see how they handle it today. Invite only the people whose current process matches the product.

A broad list produces broad feedback. A narrow list of self-managing short-term rental hosts with two to five properties produces specific language. The goal is to hear the words they already use before they see the product. LinkedIn (VERIFY) can identify buyers by role, company size, and title. Reddit (VERIFY) shows the same people discussing the problem in public. Google Sheets (VERIFY) holds the list.

## Where do I find first users without an audience?

Go where those 25 people already discuss the problem. Pick one community and search the last month of questions. Answer three posts with a useful process, not a link. Then post one teardown or checklist only where the community allows it.

This works because people click a profile after they receive a specific answer. The product becomes the next step, not the opening pitch. Stay on one channel for two weeks before adding another. For technical builders, Reddit (VERIFY), Indie Hackers (VERIFY), and GitHub Discussions (VERIFY) often contain the exact problem. For buyers inside companies, LinkedIn (VERIFY) is slower but more targeted. Hacker News (VERIFY) and X search (VERIFY) can surface newer complaints.

## What should I write in a post or email?

Lead with the problem, the expensive current workaround, and a small fix. Show the output or the exact steps. Mention the product only as the shortcut after the fix. Use the words the buyer already typed.

Here is the copyable first message I use:

> Hi [name],
>
> I saw your post about [specific problem] in [community]. I built a small tool that turns [input] into [output]. I am not asking for a signup. Could I show you a five-minute result for [their situation]? If it is not useful, tell me and I will not follow up again.

Keep it short. Claude (VERIFY) and ChatGPT (VERIFY) can help rewrite the message using the buyer’s language, but I do not let them add a pitch.

## What should my landing page say?

Lead with the buyer’s problem, the promised outcome, and who the product serves. Put the technical story lower on the page. Offer one next step: try a narrow task, book a call, or pay.

The first line must match the thought in the visitor’s head. If the page says “AI-powered operations platform,” the visitor has to translate. If it says “Turn guest messages into a check-in checklist,” the visitor reads it as a fix. Draft the line in Google Docs (VERIFY). Ship the page with Carrd (VERIFY) or Webflow (VERIFY). Google PageSpeed Insights (VERIFY) confirms the page loads before the visitor leaves. Google Search Console (VERIFY) shows which problem queries bring qualified visits.

## Should I charge less to attract early users?

Do not use a low price to cover unclear value. Ask for payment once the product can deliver one useful outcome. Offer direct onboarding to remove uncertainty without weakening the price.

A paid user is evidence that the problem is worth money. A free user only proves that the free part was easy. If the price feels too high, the real objection is usually that the result is not obvious. Fix the result, not the price. Stripe Payment Links (VERIFY) makes a paid next step easy to ask. Calendly (VERIFY) makes onboarding calls bookable without back-and-forth.

## How do I turn one user into ten without guessing?

Interview the one user for the words they used before switching. Keep a short case note with the before, the trigger, and the result. Then make a narrow ask to two people who already have the same problem.

Five-question interview script:

1. What were you using before you tried this?
2. What happened the day you looked for something else?
3. What words did you type or think when you went looking?
4. What did the first useful result change for you?
5. What almost kept you from continuing?

Write the answers as a case note. Before: what they did. Trigger: what made them look. Result: what changed. Store the note in Notion (VERIFY) or Google Docs (VERIFY). Do not ask for a broad share. Ask two people: “Do you know one host who handles same-day bookings by hand?” That travels.

Run a seven-day test with one audience, one promise, and one next step. Track replies, calls, completed first outcomes, and payments. Keep the product fixed while testing the message. Then reverse the test.

Thresholds before changing anything:

- List 25 people. Contact 10.
- If fewer than 3 reply, change the problem line or the list.
- If 3 or more reply, run calls.
- If 0 of 5 calls complete the first useful result, stop and fix onboarding.
- If 1 or more of 5 gets the result, keep the product fixed and test the landing page message next.
- Ask for payment after the result is used, not before.

Tracking columns:

| Name | Source | Problem phrase | Current workaround | Reply | Call | First result delivered | Result used | Payment asked | Paid | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Google Sheets (VERIFY) or Notion (VERIFY) can hold that table.

Put the sequence together. GuestPrep is a hypothetical product. I am using it only as an example, not as a real company.

The buyer is a self-managing short-term rental host with two to five properties. The problem is that each booking arrives as scattered messages and the host rebuilds the same cleaning and setup checklist by hand. The current workaround is copy-pasting guest messages into a note and texting the cleaner.

Outreach: I answer three Reddit posts from hosts asking how to handle same-day bookings. I write a step-by-step process for pulling check-in time, pet count, and checkout time from the booking message. No link. One host replies. I send the copyable message above.

Landing page line before: “GuestPrep is an AI operations assistant for rental operators.” After: “Turn a guest message into a check-in checklist in four minutes.” The after line names the buyer, the input, the output, and the time.

First useful result: the host pastes a real booking message. GuestPrep returns a checklist with check-in time, door codes, cleaning steps, and a note about the dog. The host uses it that afternoon.

Payment ask: after the host uses the result, I ask: “The checklist is ready. Pay $29 a month and I will connect your inbox and send each checklist automatically.” If the host says yes, the price is not the problem. If the host goes quiet, I ask what almost stopped them.

When one or two people sign up and the next fix is not obvious, a paid audit is cheaper than another silent month. The step for a diagnosis specific to your product is The Audit. The Audit $2,500 Two weeks + debrief call. Pick one area at checkout: AI engineering, product building, or positioning and GTM. I go through it top to bottom and hand you the written audit. For this problem, pick positioning and GTM. You get the 8-10 page audit memo, the prioritized fix sequence, and the one-hour debrief call. The memo tells you what to fix first, and the fee credits toward what you book next.

META DESCRIPTION: How do I get my first users for a vibe-coded product? Pick one buyer, deliver one useful result, and ask once. Start with five people.

TOOLS

Each tool named in the post, with the URL and the claim I make about it, marked VERIFY.

- PostHog (VERIFY) https://posthog.com: creates a funnel from landing visit to first action to first useful result.
- Microsoft Clarity (VERIFY) https://clarity.microsoft.com: replays real sessions and shows where visitors hesitate.
- Google Analytics (VERIFY) https://analytics.google.com: confirms whether a visit came from a qualified source.
- LinkedIn (VERIFY) https://www.linkedin.com: finds buyers by role, company size, and title.
- Reddit (VERIFY) https://www.reddit.com: search and read public problem posts, and answer them.
- Google Sheets (VERIFY) https://sheets.google.com: holds the buyer list and the tracking table.
- Google Docs (VERIFY) https://docs.google.com: drafts landing-page copy and case notes.
- Carrd (VERIFY) https://carrd.co: publishes a simple one-page landing page.
- Webflow (VERIFY) https://webflow.com: publishes a more detailed landing page without a custom build.
- Stripe Payment Links (VERIFY) https://stripe.com/payment-links: creates a paid next-step link.
- Calendly (VERIFY) https://calendly.com: lets a user book onboarding without email back-and-forth.
- Notion (VERIFY) https://www.notion.so: stores interview notes, case notes, and the tracking table.
- Indie Hackers (VERIFY) https://www.indiehackers.com: a community where technical builders discuss early traction.
- GitHub Discussions (VERIFY) https://github.com/features/discussions: a place where technical users discuss specific problems.
- Hacker News (VERIFY) https://news.ycombinator.com: a channel for technical early adopters and sharp feedback.
- X search (VERIFY) https://x.com/search: finds recent public posts about the problem.
- Claude (VERIFY) https://claude.ai: rewrites outreach and landing-page lines using the buyer’s words.
- ChatGPT (VERIFY) https://chatgpt.com: drafts and shortens outreach copy before I edit.
- Google PageSpeed Insights (VERIFY) https://pagespeed.web.dev: checks whether the landing page loads before the visitor leaves.
- Google Search Console (VERIFY) https://search.google.com/search-console: shows which problem queries bring qualified visits.

CLAIMS

Every factual claim about Micah in this post, followed by the exact live sentence it rests on.

- The Audit costs $2,500 and includes two weeks plus a debrief call.  
  Exact live sentence: “The Audit $2,500 Two weeks + debrief call”
- The Audit covers one area chosen at checkout: AI engineering, product building, or positioning and GTM.  
  Exact live sentence: “Pick one area at checkout: AI engineering, product building, or positioning and GTM.”
- Micah reviews the selected area and provides a written audit.  
  Exact live sentence: “I go through it top to bottom and hand you the written audit.”
- The Audit includes an 8-10 page memo, a prioritized fix sequence, and a one-hour debrief call.  
  Exact live sentence: “8-10 page audit memo Prioritized fix sequence One-hour debrief call”
- The memo says what to fix first, and the fee credits toward the next booking.  
  Exact live sentence: “Not sure which one? Start here: the memo tells you what to fix first, and the fee credits toward what you book next.”