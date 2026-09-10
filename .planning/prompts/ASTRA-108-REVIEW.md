# Astra gate: Pass-108, a solo consultant's site

You are the quality juror. One look, a written verdict. You do not execute.

Site: a solo operator (Micah Jones) who does positioning, AI engineering, and end-to-end
product building. He sells three fixed-price packages ($500, $2,500, $7,500) and open-ended
engagements from $5K a month. The buyer is a founder whose AI-built product demos well and
stalls before production.

## The images

1. `svc-engagements-1440.png` — /services, the Engagements section, 1440x900
2. `svc-packages-1440.png` — /services, the packages table, 1440x900
3. `home-hero-1440.png` — home, hero, 1440x900
4. `home-audit-1440.png` — home, The Audit section, 1440x900
5. `svc-packages-390.png` — /services, packages, 390x844

## What the operator said was wrong, in his words

a. "the services part still look off structurally and wording"
b. "enagements has three buckets (a client can pick all three - the positioning, ai
   engineering, and end to end building. but when i go to the page it does not connect
   with the engagements"
c. "then the packages arent even in services page anymore. Most important thing."
d. "Homepage sitll feels overwhelming and not built from a professional that understands
   how to structure webaites to get people to trust that you are ana amzing builder"

This pass nested the three buckets inside Engagements as h3 children, restored the three
packages to /services as a priced table with live buy controls, and cut the home page to
five sections: hero, The Audit, How I work (receipts and the exit record nested under it),
Ordani, doors.

## Rule the verdict on each of a, b, c, d: RESOLVED, PARTIAL, or NOT RESOLVED

Judge from the images, not from the description above.

## Two things I already suspect, which I want you to confirm or reject

1. **Dead right column.** At 1440 the content column stops around x=1270 and, in the
   Engagements and The Audit sections, the right 35-40% of the viewport carries nothing
   for hundreds of vertical pixels. Does this read as confident editorial restraint, or
   as a page that does not know how to fill a desktop screen? This is the single most
   likely cause of the operator's "does not look like a professional" reaction, so do not
   soften it.

2. **The commercial CTA is a text link.** "START THE AUDIT", "BUY THE AUDIT" and the rest
   render as small uppercase monospace with a thin underline, not as buttons. The $2,500
   Audit is the thing the whole home page is built to sell. Is a monospace underline a
   strong enough affordance for the primary purchase action, given the rest of the type
   system? If not, say what it should be in terms this site's own vocabulary already
   supports.

## Constraints on any fix you propose

- Type and photographs only. No stock imagery, no illustration, no icon kits, no 3D.
- One accent, copper `#C8542B`. Deeper `#8E3A1E` is required for normal-size body text
  (the plain copper is 3.85:1 on the paper and fails AA below 24px).
- Monospace is for labels, section codes and data only. Never body copy, never headings.
- The home page cross-fades its palette between sections, so the same element sits on
  terracotta at one moment and bone at another. Any fixed text color or any opacity on
  text fails an accessibility contrast check on one world or the other. This has already
  produced 19 contrast failures once and 3 more later the same day. Hierarchy on this
  site is carried by size and weight, not color or opacity.
- One signature motion already exists. Do not propose a second.
- Em-dashes are capped at one per page and the nav already spends it.

## Output

- The four verdicts, one line each, with the reason.
- Confirm or reject my two suspicions, plainly.
- Then at most five ranked changes. For each: what to change, why it moves a buyer, and
  the cheapest version that would work. Rank by effect on trust and on the decision to
  buy, not by effort.
- If something in these images is worse than anything on the list, lead with that instead.
