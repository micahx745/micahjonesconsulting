# Copy checkpoint, Pass-129a (commit 8bac6a0), one independent read

You are a juror. The site is micahjonesconsulting.com (a solo consultant; first person; plain, specific voice).
The operator picked every string below himself, verbatim, by popup (ledger: docs/LESSONS_LEARNED.md #3, "THE FIVE
LINES, ROUND 1" and "THE LINES SHIP FIRST"). Do NOT re-argue his picks. Judge only: does each string read cleanly
where it now sits, and did the change break or clash with anything around it?

Look first: .planning/qa/pass-129a/SHEET.png (the build door at 1440 and 390, the phone menu, the 1440 nav, the
/packages intro at 390; the door colours are a mid-fade capture, ignore them). Then `git show 8bac6a0 -- app lib components`.

Items: E1 home build-door heading "The demo took a weekend in Lovable or Replit. The last 20% is eating your month."
(the body under it still says "That last 20% is my daily work."); E2 the home meta description; E3/E6 the terms
sentence on home and /packages ("...credits toward the next package, or toward an engagement started within 60
days..."); E4 the home "See all three packages" link now goes to /packages; E5 the /packages intro sentence; E7 the
two lines in the kickoff email (lib/package-delivery.ts, read the whole email for flow); E8 "Packages" second in the nav.

Answer in 150 words or fewer: one line per item, PASS or FLAG; for any FLAG, the reason and ONE rewrite that changes
no fact. Then one overall verdict: SHIP or HOLD.
