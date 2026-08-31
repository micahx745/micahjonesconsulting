# SPEC.md — example 2: photographer client galleries

# WHAT
Private photo galleries a wedding photographer sends each couple.
Winning = the couple views, favorites, and downloads without ever
emailing her for help.

# NOT
Not a portfolio site. Not photo editing. No public galleries, no
social features, no print store at v1. No client accounts: magic
links only.

# SHAPE
Static front end; server functions for auth links and zips. Photos in
private storage, served by short-lived signed URLs only. Postgres for
galleries and favorites with per-gallery access. Email for magic links.

# RULES
Storage is never public. A gallery link expires in 90 days. Original
files are never mutated; downloads are generated copies.

# NOW
Milestone: one real wedding delivered. Done = the couple downloads
their album with zero support messages.

# LATER
Print orders. Client selects for albums. Second-shooter uploads.
