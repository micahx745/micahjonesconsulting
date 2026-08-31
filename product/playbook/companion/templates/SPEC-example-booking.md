# SPEC.md — example 1: solo-trainer booking (from chapter 2)

# WHAT
Booking and payments for independent personal trainers. One trainer,
their clients, their calendar. Winning = a client books and pays in
under a minute on a phone.

# NOT
Not a marketplace. Not multi-trainer gyms. No social feed, no chat,
no meal plans. No admin dashboard beyond earnings and the calendar.

# SHAPE
Web app on a serverless host. Postgres with row-level security:
trainers see only their own clients. Stripe for payments; webhooks
own booking state. SMS reminders. No other third parties.

# RULES
See the invariants file. Top three: bookings are never
double-writable; money state comes only from Stripe webhooks; phone
numbers are stored E.164 or not at all.

# NOW
Milestone: first paying trainer. Done = she books 10 real sessions in
a week without texting me for help.

# LATER
Packages/subscriptions. Waitlists. Calendar sync. Referrals.
