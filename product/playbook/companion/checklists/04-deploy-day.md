# Pre-flight - Deploy day (chapter 4)

- [ ] List every variable the code reads; confirm each exists on the host for EACH environment.
- [ ] Env change, then redeploy, then test. In that order, every time. Installed is not live.
- [ ] Migrate the hosted database and confirm its safety rules are on. Your laptop's database is not evidence.
- [ ] Open all three doors (apex, www, platform URL): one redirect hop at most, same build behind each.
- [ ] Fire every integration once, for real, on the live site, and watch the artifact arrive.
