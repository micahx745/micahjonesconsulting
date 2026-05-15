# 10-I — Final verification

**Covers:** All 30 Phase 10 REQ-IDs
**Depends on:** 10-A..H
**Estimated effort:** 30 minutes
**Files touched:** 1 verify output + 1 launch checklist

---

## Verification matrix

### Code-side gates

1. `pnpm typecheck` — clean.
2. `pnpm lint:copy` — clean.
3. `pnpm build` — clean. Capture output for first-load JS table.

### Static asset checks

4. `find public -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.avif' \) -size +500k` → zero output (PERF-05).
5. GSAP quarantine: `grep -rE "import.*from\s+['\"]gsap" --include='*.ts' --include='*.tsx' . | grep -v 'node_modules\|\.next\|TitleCard\.tsx'` → zero output (PERF-07).

### Built routes

6. After build, dev or production preview running, fetch:
   - `/sitemap.xml` — 200 OK, lists all routes.
   - `/robots.txt` — 200 OK, allows `/`, blocks AI crawlers from `/work/`.
   - `/opengraph-image` — 1200×630 PNG (foyer Home OG).
   - `/about/opengraph-image` — 1200×630 PNG.
   - `/work-with-me/opengraph-image` — 1200×630 PNG.
   - `/contact/opengraph-image` — 1200×630 PNG.
   - `/work/opengraph-image` — 1200×630 PNG.
   - `/work/ordani/opengraph-image` — 1200×630 PNG (theater Phase 5).

### Per-route metadata

7. View source of each route → verify `<title>`, `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`, `<meta name="twitter:card">` exist with expected content (OG-02).

### Visual baselines

8. 27 PNGs captured under `.planning/phases/10-hardening-deploy/baselines/<viewport>/`. Confirm count + manual visual review.

### Lighthouse + axe (informational)

9. 9 Lighthouse JSON files under `.planning/phases/10-hardening-deploy/verification-artifacts/`. Document scores; flag any below 95.
10. Axe scan: zero serious/critical violations per route. Document the scan tool used.

### Skip-to-content keyboard test

11. In dev, navigate to `/`, focus address bar, press Tab once. Confirm skip-to-content link slides down. Press Enter. Confirm focus jumps to `#main-content`.

### Sage on ORDANI

12. Navigate to `/work/ordani`, scroll to PullQuote. Confirm sage `#5E7158` underline-grow (not copper).

### Analytics

13. Navigate to `/work/ordani`, scroll to 90%+ depth. Confirm Network panel shows event call. Confirm second scroll past 90% doesn't fire again (sessionStorage dedupe).

### Sitemap content

14. Open `/sitemap.xml`. Confirm:
- 5 foyer URLs (/, /about, /work-with-me, /contact, /work)
- 4 case-study URLs (/work/ordani, /work/hr-equity-author, /work/passioneer, /work/akamai)

### Robots content

15. Open `/robots.txt`. Confirm:
- `User-agent: *` allow `/`
- `User-agent: GPTBot` disallow `/work/`
- `User-agent: Google-Extended` disallow `/work/`
- `Sitemap:` line points to production URL

### Deploy runbook

16. File `docs/DEPLOY-RUNBOOK.md` exists, includes the SQL migration, lists all 7 steps + smoke test.

---

## Output documents

### 1. `10-VERIFY-OUTPUT.md`

Records each verification step's result (PASS / PASS-with-caveat / DEFERRED-TO-OPERATOR). Documents:
- Lighthouse score per route (or rationale for what was captured)
- Axe violation count per route (target zero)
- Visual baseline PNG count (target 27)
- OG image URLs (target 6 PNGs)
- Sitemap + robots URLs
- Operator action checklist (5 items from the runbook)

### 2. `LAUNCH-CHECKLIST.md` (at repo root)

Top-level operator checklist mirroring the runbook steps in 1-page form. The file at `docs/DEPLOY-RUNBOOK.md` is the detailed walkthrough; `LAUNCH-CHECKLIST.md` is the high-level "Day 14" punchlist.

---

## Verification

The phase is verified when:
- All 30 REQ-IDs are marked complete or complete-pending-operator (with operator-action documented for the 5 deploy ones).
- ROADMAP.md updated.
- REQUIREMENTS.md updated.
- Git commits made.
- Final commit pushed to origin/main.

---

*Per --no-transition flag, the orchestrator STOPS after this verify; the operator drives the live deploy.*
