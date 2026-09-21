# How do I get first users for a vibe-coded product without an audience?

Your app works. The page has been live for a month, the signup count reads one, and that one is a friend.

Here is the answer; the rest is the mechanism. You get first users by finding ten specific people who already do the job your app does, by hand, and asking each of them to let you watch. Do that before you touch the landing page again or post anywhere. It feels impossible because you are trying to be found, and nobody is looking for you yet.

## Why is nobody signing up for my app?

Because nobody knows it exists, and the few who found it could not tell in five seconds whether it was for them.

The first problem is arithmetic. A new site with no links pointing at it gets a handful of visits a day, and most of those are you.

The second is the promise. A vibe-coded app is cheap to widen and expensive to explain, so the homepage ends up promising to "manage your whole workflow," and the visitor with one annoying task cannot find it in there. I made the same case at a much bigger scale at Postmates, as a product analyst in the deliver-anything era: narrow the promise to the core offerings. A promise that covers everything cannot be priced, policed or sold. [TAG-1: The stalled builds that land in my inbox usually have a landing page, a waitlist and a launch post behind them, and no record of one conversation with a buyer.]

## Who should my first users be?

One narrow group that does the job by hand today and that you can reach by name. Ten people, not a market.

"By hand today" is the filter that matters. Someone with a spreadsheet, a group chat or a paper form for this job has already proven the problem is worth their time. Someone who says the idea sounds cool has proven nothing. Ordani, the HIPAA-compliant CRM I founded for birth workers, exists because they run their practices on group chats and paper intakes. A group chat is a person already paying for the problem in hours. [TAG-2: Ordani's first users were doulas I knew by name. The first paying one came out of a conversation about a claim she was about to give up on, not from anything on the app page.]

Write the ten names down. If you cannot get to ten, you do not have a segment yet, you have a feature. Find them where they ask about the job: forum threads, a services page that lists the task. One line of evidence beside each name; a list of plausible names produces nothing.

## How do I reach early users when I have no audience?

One message at a time, asking to watch, not asking them to try the app. That request gets replies because it costs the other person nothing and flatters them a little. "Try my app" costs them an hour and flatters you.

The message I would send is under 80 words. It names the evidence that they do the job, says I am building something for exactly that, and asks for 15 minutes to watch them handle one real case the way they do it now. No link. On the call they share their screen and you keep quiet. Notice the sigh, the third tab and the thing they type twice: that is your product, and their words while doing it are your homepage.

I learned that at Guardicore, where I ran the research that found what those enterprise buyers were actually signing for; the story moved from honeypots to east-west visibility on the strength of it. Those were $1.2M average enterprise deals, a different room from a weekend app, so not proof your launch will work. They are the reason to take the words from the buyer's mouth before you write them yourself. [TAG-3: The message that got Ordani its early users was three sentences long and asked to watch one claim get filed the old way. It did not mention the app until the call.]

Send 20 of those messages over a week and expect four or five replies. Fewer than three means the list is wrong or the first line is. Change one of those, not both.

## Should I charge my first users or make it free?

Charge, at a price that is small next to what the job costs them, and ask the moment one person has a real result in hand. Free tells you that free was easy to accept, and nothing else.

Price is a question, not a setting. After someone has run one real case through your app and it worked, you say: "That took four minutes instead of forty. If you want to keep doing that, it is $29 a month. Would you buy it today?" Then you say nothing. A yes is worth more than a hundred waitlist signups, and a no comes with a reason.

Birth workers keep hundreds of dollars per client that a claims service would take, so whatever Ordani charges has an easy comparison beside it. [TAG-4: Ordani charges a flat monthly fee that is a small fraction of one recovered claim, and nobody in the beta has asked me for a free tier.] For your app it is the hours, the missed deadline or the freelancer they were paying. Price under that and above zero.

Make the checkout with [Stripe Payment Links](https://docs.stripe.com/payment-links): create a product, set the price, get a URL, no code in your app. Send it the moment the person has their result. "I would probably pay" with no link in front of it is a compliment, not a customer.

## How do I know if it is working?

Count three things by hand: how many of the right people saw the app, how many got one real result, and how many said yes to paying.

Ten visits and zero signups is a sample of ten, not a conversion rate, so count people you can name. Still, install one thing so you know whether anyone came. If a visit count is enough, [umami](https://github.com/umami-software/umami) is a one-container install that counts visits and nothing else. To see what people did, [PostHog](https://posthog.com) (or self-hosted from [PostHog/posthog](https://github.com/PostHog/posthog)) tracks the three events as a funnel and records sessions; watch five recordings of people who landed and left. Where they stall is usually where your onboarding assumes they know something they do not. [TAG-5: The first Ordani intake I watched over a birth worker's shoulder took her eleven minutes, and nine of them went on finding the client's insurance card. The intake now asks for the card first.]

For the people who got in and stopped, [formbricks](https://github.com/formbricks/formbricks) puts a one-question survey inside your app at the step they abandon. Ask "what were you hoping this would do?" and nothing else. The answers are your next homepage draft.

When the counts come back, change one thing. If the right people are not showing up, the list or the message is wrong. If they show up and do not get the result, the first five minutes of your app are wrong. If they get the result and will not pay, the promise is smaller than you thought or aimed at the wrong person. Each is a different week of work, and mixing them is how a month disappears.

## What should I do this week?

Write the ten names today, with the evidence beside each. Send the first five messages tomorrow. Take every call that comes back and watch. When one person gets a real result, send the payment link the same day. By Friday you will know something you do not know now, which is more than the last month of feature work told you.

Do that round yourself; whoever has those ten conversations should be building the product. Where I come in is after it, when the next fix is not obvious. The replies are fine, the result lands, the yes never comes, and you cannot tell if it is the price or the promise. That is what The Audit is for: $2,500, two weeks plus a debrief call. Pick one area at checkout: AI engineering, product building, or positioning and GTM; for this problem it is positioning and GTM. You get an 8-10 page audit memo, a prioritized fix sequence and a one-hour debrief call, and the fee credits toward what you book next. [TAG-6: In the audits I have written this year, the first item in the fix sequence has been the promise on the homepage more often than anything in the code.]

If you get to Friday and want to show me the counts, my email is on this site and I reply inside one business day.
