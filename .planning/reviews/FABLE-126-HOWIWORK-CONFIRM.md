# Fable juror read: How I work redesign, preview b9d4fe8 (2026-09-21), verbatim

Disposition: `PASS-126-JURY-DISPOSITION.md` (this folder).

---

VERDICT: SHOW HIM AFTER FIXES. The direction holds and clearly beats BEFORE (sentence-case headlines in a stagger read as one person walking you through the job, not a spec sheet), but /services carries two visible defects and the home at 1440 never shows the one-page composition it was picked for; all are cheap, and he rejects on sight.

COPY: FLAGGED. Scope, Build and Stay read clean and confirmed. Plan does not: "You get a roadmap, and you sign off on it before I build anything." ends on the same phrase the headline sentence just ended on ("before I build"), two sentences in a row, and it reads as a stutter. Lesser: "Something named ships in month one." is a garden path ("named ships" parses as a name until "in month one" lands); a first-time reader goes back over it.

1. /services, 390. "No discovery fee. Any one of the three areas below, two of them, or all three." sits between Stay's body and "See the work", so the CTA reads as the note's link and lands directly above "Three areas of work" as if it pointed there. Fix: CTA directly after Stay's body at every width (as on the home); move the note under the "Three areas of work" heading, where "below" points, in the DOM as well, so both widths follow one order.

2. /services, 1440 and 390. "See the work" renders as a copper, sentence-case body link; the home renders it as a mono caps label in ink with an ink underline. It breaks "the copper rules are the only copper" on this page, it is the one copper link on a page whose other links are ink, and at that size plain copper on bone fails B1 for text. Fix: give it the home's treatment. If it must stay a copper link, copper-deep.

3. Home, 1440. The section runs about 1360px tall against a 940px viewport: screen one is heading + Scope + Plan with Build's label peeking at the bottom; screen two is Build + Stay. The four-steps-at-once page never appears, and the row gaps are uneven (about 70, 160, 100px), leaving a dead zone under Scope and Plan on screen one. Fix: one row gap (72px), and let Build rise to sit beside Plan on Scope's column start (three rows: heading + Scope, Plan + Build, Stay) so a 1440x900 viewport holds all four; if the stagger is worth more than the single page, then make the two-screen read deliberate with the equal gap and Build's headline in screen one.

4. Home, 1440. "SEE THE WORK" sits on Stay's last line but about 630px right of "without me.", at x=1080, aligned to no column the section uses (Scope 732, Build 386, Stay 40). It reads as floating. Fix: put it on Scope's column start, or flush right to the nav's edge; either makes it a placed note instead of a stray.

5. /services, 1440. "Three areas of work" follows Stay by about 86px; the step-to-step gap is about 74px. The section break is no stronger than a step break, so the heading can read as a fifth step. Fix: at least double the gap above "Three areas of work", or move its hairline above the heading rather than below it.

6. Home, 390. A partial-width bone hairline sits about 45px above "HOW I WORK." right under the nav; it does not appear at 1440. Whatever it belongs to, the heading has less air above it than the steps have between them. Fix: give the heading the step gap (about 70px) above it, or remove the rule if it is this section's own opener.

7. Home and /services, 390. The indents run 0/16/32 then back to 0 for Stay. A 16px step is small enough to read as edges that failed to line up rather than a stagger. Fix: commit to it (0/24/48, Stay back to 0) or drop it at 390 and let the copper rules and labels carry the sequence.

Best thing: the stacked "HOW I / WORK." beside "Week one is an audit and a scope." is a real opening spread, and the sentence-case headlines turn four shouted labels into one person telling you what happens next.
