# Fix round: blog post 1. Apply EXACTLY this list to DRAFT P (below) and return the finished post.

Three reviewers chose P as the base unanimously. Apply every item; change nothing else. Keep P's worked example
(ReviewReady), its voice, its structure and its curly quotes. First person "I" only, no em-dashes, no new facts about
Micah, no statistics of any kind, no new tools beyond those named here.

## Grafts (add)
G1. In the interview script, replace P's hypothetical willingness-to-pay question with these two: "What did the first
    useful result change for you?" and "What almost kept you from trying it?"
G2. After the interview script, a referral step: ask two people one narrow question, in the example's terms: "Do you
    know one editor who still rebuilds the revision checklist by hand?" One or two sentences on why a narrow ask travels
    and a broad "share this" does not.
G3. In the payment section, add: "A paid user is evidence that the problem is worth money. A free user only proves the
    free part was easy." (adjust wording minimally to fit the example).

## Must-fixes
F1. Opening: cover both states ("visits but no signups, or no visits at all") and replace "do not add features yet"
    with: before adding features, find out why qualified people stop.
F2. "Interview five people who stopped" -> "Interview five people from your list who replied but never signed up."
F3. CUT the paragraph that quotes Micah's own line ("This distinction is central to how I describe the work...").
F4. ONE consistent number chain, framed as starting budgets and prompts to investigate, never verdicts: list 25 buyers,
    message 20, expect 4 or more replies, book 3 or more interviews, reach ten conversations over two rounds. Remove any
    number that contradicts it (four replies cannot yield five interviews).
F5. The schedule becomes 14 days: Days 1-2 define the buyer and build the list; Days 3-8 send and answer; Days 5-12
    interview and onboard; Days 12-14 count and choose ONE change. Replace "The goal is not to declare the entire
    product good or bad after one week" with "One round finds the next constraint, not a verdict." Cut "This work
    serves two purposes."
F6. Track "ask made" separately from "buyer commitment" (an invitation sent proves no demand).
F7. "Keep the product fixed while testing the message" -> keep it fixed except for defects that block the first result.
F8. The payment rule is the example's structure ("in this example, I ask for payment after..."), not a universal law;
    three people who got the result and did not pay is a signal to follow up, not a verdict.
F9. "Five qualified visits with no useful result means fix onboarding" -> look at onboarding first, then bugs, inputs,
    expectations and fit.
F10. "No deck and no preparation needed" -> "No deck needed; bring one recent brief with confidential details
    removed." Wherever the example asks a user to paste a real brief, say to get permission and remove client details.
F11. Remove the help-article links for Google Sheets and Reddit Search (keep the tool names). Keep the PostHog and
    Stripe Payment Links links. Remove every "(VERIFY)" marker (the links were checked and resolve).
F12. GitHub repos (checked real and active on 2026-09-21), each placed where it executes a step, one short clause each:
    PostHog/posthog (https://github.com/PostHog/posthog): self-hosted funnels and session replay, at the funnel step;
    formbricks/formbricks (https://github.com/formbricks/formbricks): an in-product survey for people who stop, at the
    stop-interview step; umami-software/umami (https://github.com/umami-software/umami): a lighter, privacy-friendly
    visit counter, as the alternative to PostHog for counting qualified visits.
F13. The close: The Audit, using ONLY these live /packages words where it states terms: "The Audit", "$2,500", "Two
    weeks + debrief call", "Pick one area at checkout: AI engineering, product building, or positioning and GTM.",
    "8-10 page audit memo", "Prioritized fix sequence", "One-hour debrief call", and "the fee credits toward what you
    book next". Frame it for the reader who needs a diagnosis specific to their product; no hard sell.

## Declined (do NOT add): "a paid audit is cheaper than another silent month" (overclaim); "Here is the copyable first
message I use" (invents a practice of Micah's); any Google Analytics claim about buyer fit; any reply-rate statistic
about cold outreach; the Claude/ChatGPT rewrite line.

## Return
The finished post in Markdown (H1 = "How do I get first users for a vibe-coded product without an audience?"), then
"META DESCRIPTION:" (at most 155 characters, built around "How do I get my first users for a vibe-coded product?"),
then "CHANGES:" one line per item G1-G3 and F1-F13 saying where it was applied.

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