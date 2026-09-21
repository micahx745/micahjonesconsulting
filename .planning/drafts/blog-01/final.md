# How do I get first users for a vibe-coded product without an audience?

If your product has visits but no signups, or no visits at all, find out why qualified people stop before you add features. Pick one buyer, name the job they already need done, and talk to ten of them. Then test one promise, one path to a useful result, and one paid next step.

## Why are people visiting without signing up?

Separate three events: a qualified visit, a first useful result, and a request to continue. “No traction” is too vague to tell you what to fix.

A qualified visit comes from someone who matches your chosen buyer and understands the problem. A first useful result happens when that person completes the narrow job your product promises. A request to continue asks them to pay, book another session, invite a colleague, or provide the next real input.

Track those events separately. A signup is not a useful result. A homepage visit from the wrong person is not a qualified visit.

Use [PostHog](https://posthog.com/docs/product-analytics/funnels) to create a three-step funnel for those events. Watch five relevant recordings with [PostHog Session Replay](https://posthog.com/docs/session-replay), with sensitive fields masked. [PostHog/posthog](https://github.com/PostHog/posthog) provides self-hosted funnels and session replay. Interview five people from your list who replied but never signed up.

[formbricks/formbricks](https://github.com/formbricks/formbricks) adds an in-product survey for people who stop.

If you cannot find five qualified visits, work on the audience or channel. [umami-software/umami](https://github.com/umami-software/umami) is a lighter, privacy-friendly visit counter if PostHog is more than you need; it counts visits, and your list tells you which ones were qualified. If qualified visitors start but do not finish, inspect onboarding. If they finish but decline the next step, inspect the value and offer.

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
> If it fits, I’ll help you run one real case through it. No deck needed; bring one recent brief with confidential details removed.

For ReviewReady, the narrow outcome becomes: “turn client revision notes into one time-coded edit checklist.”

Use Google Sheets to keep the prospect list and record the evidence that each person matches the segment. Do not fill the sheet with names that merely sound plausible.

My starting budget is: list 25 buyers, message 20, expect 4 or more replies, book 3 or more interviews, and reach ten conversations over two rounds. Fewer than four replies from 20 messages prompts me to investigate the segment and the opening line, not change both at once. These numbers are working budgets, not verdicts.

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

## Where should I look for my first users?

Go where your chosen buyers already discuss the problem. Answer three existing questions with a useful process before sharing a link.

Use Reddit Search to search posts and comments inside relevant communities. Search the language from your interviews, such as “client revision notes,” rather than your product category.

A useful reply for the ReviewReady buyer could explain how to:

1. Collect every request in one place.
2. Preserve the original wording.
3. Add or correct each timestamp.
4. Combine duplicate requests.
5. Mark unclear items for the client before editing.

That answer should stand on its own. Do not open with your product link. Mention the product only when community rules allow it and the reader asks for a faster way to perform the process.

It puts you in front of people already dealing with the job, and it reveals questions your landing page has not answered.

Stay with one community or outreach channel for the first seven days. Adding several channels at once makes it harder to tell whether the audience, message, or location caused the response.

## What should happen during the first five minutes?

Make the first useful result smaller than the whole product. Remove setup that does not contribute to that result.

For ReviewReady, direct onboarding would ask the editor to get permission and remove client details, then paste one real revision brief. The product would produce a checklist. The editor would correct missing context, confirm the timestamps, and export the accepted version.

That completed checklist is the result. Creating a workspace, connecting every client, or inviting a team can wait.

Watch the first user complete this path. Do not explain around confusing parts. Note where they hesitate, what they expect to happen, and what they call each step.

Then interview that user for the words they used before switching. Use this six-question script:

1. Tell me about the last revision brief you handled before trying this.
2. What happened that made you look for a different way to handle it?
3. What words did you use when you described the problem to someone else?
4. What had you already tried, and where did that process fail?
5. What did the first useful result change for you?
6. What almost kept you from trying it?

Write a short case note from the answers: before, trigger, result. Ask the user to confirm that it is accurate before publishing or sending it to another prospect.

Ask two people one narrow question in the example’s terms: “Do you know one editor who still rebuilds the revision checklist by hand?” A narrow ask travels because it names the person and the task. A broad “share this” does not.

If five qualified visitors cannot reach the result, stop changing the headline. Fix the path to value. If they reach it but do not care about repeating it, the promised result may be too small or aimed at the wrong buyer.

## When should I ask for payment?

In this example, I ask for payment after the user receives one useful result. Do not use a very low price to hide unclear value.

Direct onboarding can remove uncertainty while keeping the payment question real. The buyer should know what they received, what continued use includes, and what it costs.

For the hypothetical ReviewReady trial, the ask could be:

> You now have one checklist you can edit and export. If you want to run your next ten revision briefs through ReviewReady, the first month is $29. Would you buy that today?

The amount is hypothetical. The important part is the direct request tied to continued use.

Create the actual checkout page with [Stripe Payment Links](https://docs.stripe.com/payment-links). A polite “I would probably pay” is not a payment. A paid user is evidence that the problem is worth money. A free user only proves the free part was easy.

After three people reach the useful result, ask all three. Three people who got the result and did not pay is a signal to follow up, not a verdict. Do not immediately cut the price. Ask what they would do next without the product. Their answer will help you distinguish weak urgency, an incomplete result, and a mismatched offer.

## How do I know what to change next?

Run a 14-day test with one audience, one promise, and one next step. Keep the product fixed except for defects that block the first result while testing the message. Then keep the message fixed while testing the product path.

For ReviewReady, the first test would use:

- **Audience:** Independent podcast editors handling client revision rounds.
- **Promise:** Turn scattered client notes into one time-coded checklist.
- **Next step:** Bring one real revision brief, with permission and client details removed, to a 15-minute onboarding session.

Use this schedule:

- **Days 1-2:** Define the buyer, current process, first useful result, payment ask, and build the list of 25 people with evidence that they perform the job now.
- **Days 3-8:** Send the 20 outreach messages and answer community posts with a process, not a link.
- **Days 5-12:** Interview the people who replied, run direct onboarding, and make the payment ask.
- **Days 12-14:** Count what happened at each step and choose ONE change.

Use a simple tracking sheet with these columns. Track Ask made separately from Buyer commitment; an invitation sent proves no demand.

| Date | Person | Segment evidence | Current process | Trigger | Message version | Replied | Interviewed | Qualified visit | Useful result | Ask made | Buyer commitment | Paid | Objection | Exact words | Next step |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

I would use these starting budgets to choose where to look:

- Fewer than 20 targeted messages prompts me to treat the outreach test as incomplete.
- Fewer than four replies from 20 messages prompts me to investigate the audience or opening line.
- Four or more replies but fewer than three interviews prompts me to reduce the commitment or clarify the request.
- Three or more interviews without two people describing the same trigger prompts me to narrow the segment or reconsider the problem.
- Five qualified visits with no useful result prompts me to look at onboarding first, then bugs, inputs, expectations, and fit.
- Three people who got the result and did not pay is a signal to follow up, not a verdict.

Change one item, run another 14 days, and compare the same events. One round finds the next constraint, not a verdict.

### When the next fix is not obvious

If you need a diagnosis specific to your product, that is what The Audit is for: $2,500, two weeks plus a debrief call. Pick one area at checkout: AI engineering, product building, or positioning and GTM. For this problem, choose positioning and GTM. You get an 8-10 page audit memo, a prioritized fix sequence and a one-hour debrief call, and the fee credits toward what you book next.

META DESCRIPTION: How do I get my first users for a vibe-coded product? Pick one buyer, test one promise, and run a 14-day round to find the next constraint.

CHANGES:
- G1: Replaced the willingness-to-pay question in the interview script with the two required questions and updated the script label to six-question.
- G2: Added a narrow referral ask after the interview script in ReviewReady terms, with two sentences on why a narrow ask travels and a broad “share this” does not.
- G3: Added the paid user versus free user evidence line in the payment section.
- F1: Rewrote the opening to cover both no visits and visits without signups, and replaced “do not add features yet” with the required stop question.
- F2: Replaced the stop interview sentence with “Interview five people from your list who replied but never signed up.”
- F3: Cut the paragraph quoting Micah’s own line in the landing page section.
- F4: Applied the 25 buyers, 20 messages, 4 replies, 3 interviews, ten conversations budget chain and adjusted the decision thresholds to prompts instead of verdicts.
- F5: Changed the test schedule to 14 days with the specified day ranges and replaced the week verdict sentence with “One round finds the next constraint, not a verdict.”
- F6: Separated Ask made and Buyer commitment in the tracking columns and added a sentence that an invitation sent proves no demand.
- F7: Updated the testing-message rule to allow fixes for defects that block the first result.
- F8: Reframed the payment rule as the example’s structure and changed no payment after result to a follow-up signal, not a verdict.
- F9: Changed the no useful result threshold to look at onboarding first, then bugs, inputs, expectations, and fit.
- F10: Replaced the deck/no prep line with the confidential brief line and added permission and client-detail removal wherever a real brief is requested.
- F11: Removed Google Sheets and Reddit Search help links, kept PostHog and Stripe links, and deleted all “(VERIFY)” markers.
- F12: Added PostHog/posthog at the funnel step, formbricks/formbricks at the stop-interview step, and umami-software/umami as the visit counter alternative.
- F13: Rewrote The Audit close with only the specified package language and framed it as a specific diagnosis option.