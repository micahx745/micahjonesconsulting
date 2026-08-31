# Pre-flight - One lock per arrow (chapter 3)

- [ ] The client enforces nothing alone: every browser rule exists on the server too.
- [ ] Every query filters by owner; better, ownership lives in the database (row-level security).
- [ ] Storage is private by default: copy a file URL, open it logged out. If it loads, that's tonight's work.
- [ ] Secrets live in host environment variables. Grep the repo for anything key-shaped; rotate whatever you find.
- [ ] Money truth comes from verified webhooks, checked on the server.
