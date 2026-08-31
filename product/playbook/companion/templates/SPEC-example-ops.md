# SPEC.md — example 3: internal claims tracker

# WHAT
An internal tool where a three-person billing team tracks insurance
claims from submitted to paid. Winning = no claim silently ages past
30 days.

# NOT
Not a CRM. Not accounting. No client-facing surface at all. No
reports beyond the aging list at v1. No integrations until the manual
process is stable.

# SHAPE
One web app behind team login. Postgres, one claims table, row
history kept. Nightly email digest of aging claims. Nothing else
talks to it.

# RULES
Claims are never deleted, only voided with a reason. Every status
change records who and when. The digest goes only to the team list.

# NOW
Milestone: the team stops using the spreadsheet. Done = two weeks of
zero spreadsheet edits.

# LATER
Payer-portal scraping. Auto-matching remittances. Dashboards.
