# Astra gate: Pass-111a, a solo consultant's site

You are the quality juror. One look, a written verdict. You do not execute.

Site: Micah Jones, a solo operator who does positioning, AI engineering, and end-to-end
product building. Three fixed-price packages ($500 / $2,500 / $7,500) and engagements from
$5K a month. The buyer: a founder whose AI-built product demos well and stalls before
production. The operator has rejected one redesign as "cheap" and "built by someone that has
never built a website". The bar is premium, confident and structured.

## What the operator asked for, verbatim (2026-09-11, typos kept)

- "i prefer the offerings to presented not as line items but like premium looking pricing
  boxes." "WIthin these boxes ... companies typically listed everythging you get. we need to
  offer a very compelling and enticing set of offerings in each thing."
- Home: "The next section that has start the audit (we need to bring the new design that you
  come up for the services page here - boxes instead of line items."
- Receipts: "you have a bunch of small sentenses that are pointless and ruin the design ...
  every line below is real (painful cringe comment on a professional site). We shouldnt list
  the amount of client revene like that ... (i liked the design where the 20 million was
  circled ... make the exit part look more aesthically pleasing and premium. the dates/months
  sentences when those companies were qcuqired are pointless. the stated on the site amount is
  pointless."
- Ordani: "we should figure out something with its design ... also the pics on mobile are
  painful. you end up looking at those pics for awhile during scrolling on mobile".

## What this pass built, and what it deliberately did not

Built: a pricing-box component, used once so far, for The Audit on the home page (the hero's
"Start the Audit" now scrolls to it; the box's own button buys); the receipts without the
framing lines, the Consulting row, the exit years, notes and floor row; "$20M+" with a
hand-drawn circle, static; the four exits set company-first with the disclosed total as the
last ruled line; the Ordani section cut to one lead photo on mobile; two new case studies,
Postmates and Neuton.AI. After the first captures, three layout fixes: the Audit box sits
beside the title only from 1280px, where it is wide enough for its own two-column layout (it
had been 933px tall on a 900px screen); the exits become a one-column ledger on phones
(SurveyMonkey had split mid-word); the Ordani grid now spans the page.

NOT built yet, because they wait on operator decisions (do not rank these as missing): the
/services rebuild with the four engagement boxes and the package area picker; the climbing
count on $20M+ (it ships static until he confirms a design-rule override); real Ordani product
screenshots (none supplied yet).

## The images

All are settled VIEWPORT captures of a production build, not full-page stitches.

1. `home-offer-1440.png`: home, The Audit as a pricing box, 1440x900
2. `home-offer-390.png`: home, The Audit box stacked, 390x844
3. `home-receipts-1440.png`: home, the circled $20M+ figure, 1440x900
4. `home-exits-1440.png`: home, the four exits and the disclosed total, 1440x900
5. `home-exits-390.png`: home, the exits at 390x844
6. `home-ordani-1440.png`: home, the Ordani section, 1440x900
7. `home-ordani-390.png`: home, the Ordani section at 390x844
8. `work-postmates-body-1440.png`: the new Postmates case study, past its title card, 1440x900

## Rule on each

a. The home Audit box: does it read as a premium pricing box a buyer wants to use, or as a
   card from a template? Is the purchase the strongest action in the section?
b. Receipts: is the circled $20M+ the right single big-number moment, and do the four exits
   now look premium? Is anything still a "pointless small sentence"?
c. Ordani on mobile: is the scroll no longer "painful"? Is the section's desktop composition
   better or worse than a stack of photos?
d. The two case study pages: do they read as the same family as the rest of the work?
e. Anything this pass made WORSE. Lead with it if so.

## Constraints on any fix you propose

- Type and photographs only. No stock imagery, no illustration, no icon kits, no 3D.
- The home page cross-fades one palette between four worlds, so every colour must be the
  world's text colour, its ground colour, or currentColor mixes. No fixed colours, no accent
  token under text, no opacity on text. Hierarchy is size and weight.
- Monospace only for labels, section codes and data. Em-dashes: at most one per page, and the
  nav spends it. One signature motion exists; propose no second.

## Output

The five rulings (a-e), one line each with its reason. Then at most three ranked changes,
each with the cheapest version that would work, ranked by effect on trust and on the
decision to buy.
