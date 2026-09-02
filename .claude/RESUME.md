# RESUME — micahjonesconsulting (2026-09-01 PM)

## HARNESS Pass-61: arc-shape gate LIVE — full policy `MODEL_ROUTING.md` §6
Audit: 9 of 320 Fable turns were taste calls, 311 execution. DIRECT (Fable) now ends by
committing a brief (`.claude/briefs/README.md`); EXECUTE runs it verbatim; JUDGE returns 3x.
Global gates, all tested: statusline `5h NN%`; tier-burn-monitor (12 Fable / 30 Opus / 75+90%,
silent on Sonnet); secret-literal-gate DENIES token literals (proven live); agent-model-gate
WARNS (advisory) on unnamed Agent model; concurrent-session-guard (SessionStart). Card §4
corrected: 31 hook events exist. TWO SESSIONS ran this tree tonight, two budgets on one 5h
window; three collisions -> LESSONS #12.

## /playbook — Pass-61/65..69 (last: ce4949b). Builds green. 65 IS LIVE; 66-69 ARE NOT.
Brief: `.claude/briefs/pass-61-playbook-cro.md`. Email capture 76/100; **$99 purchase 68/100
LOW, NOT ready to flip** — purchase layout HELD in brief §8 behind 3 gates: prod
RESEND_API_KEY probe, Stripe account split, one live-mode buy+refund with a real card.
Operator said **Stripe is last**.
- **65 (live):** H1 "The AI handed you the code. Now ship the company." Cover re-rendered from
  Typst: edition stamp + spec box + spine wording GONE, all centred, title leading -48pt,
  author name added at the foot (operator has not ruled on that addition).
- **66:** byline under the sub (four exits / $5B+ / $20M+ / Guardicore-Akamai). Prompt diff
  from ch.2 warstory, both sentences quoted verbatim ("make it better." vs the locked
  sentence); the redesign it describes produced THIS site, and the page says so.
- **67:** `<WallChart />` — book's page-6 figure drawn once on load in the hero. Motion-engineer
  APPROVED in writing as a FIGURE animation, not a third signature; logged as `motion.figure`
  in brand.json + `.claude/CLAUDE.md`. Saffron not terracotta (terracotta on espresso = 2.39:1).
  Motion only ≥900px + no reduced-motion. Replaced the AI "factory loop", declined under R12.
- **68:** hero pill (`.cw-lp-object__cta`) replaces the text link — saffron on espresso 6.13:1,
  65px. WAITLIST: it says "Get chapter one free"; at Stripe go-live it becomes "Buy the manual ·
  $99" and the email path demotes (brief §8). It first rendered espresso-on-espresso (1.00,
  invisible) because the saffron `--cw-accent` override is scoped to `.cw-playbook` and this page
  is `.cw-lp`; fill+label now set explicitly.
- **69:** hero paragraph rewritten — history moved INTO the sub (he does not read the byline as
  "the paragraph"). 75 -> 56 words. Companies named with joining stage and NO job title anywhere,
  which is what makes "remove the sales part" honest. Byline shrank to name + `/work` link
  (underline saffron; `--cw-accent` is terracotta here = 2.39:1). Cut: $20M+ (still in footer +
  /about), page/file counts (spec card has them). LEDGER updated with both operator instructions.
- **70:** RULED — flat "early" for all four (he: "just say early for all those companies
  mentioned"), after the flag that Guardicore ships 2018-2021 against a 2015 founding. Ledger
  separates the fact from the public rendering. Sub+byline now 53 words. HANDOFF's "generate
  the animation assets" item struck: the factory loop is declined and closed, not queued.
- **SHIPPED TO PRODUCTION 2026-09-02 — deploy k05cwwk29** (operator verbatim: "keep the name on
  the cover, deploy 66 through 70"). Author name STAYS at the cover foot, his ruling. Pass-66..70
  are LIVE. CARD 1 run in full: pushed c07c77d, both domains re-aliased to the newest
  (push-triggered) deployment, **data-dpl-id MATCHES across both** (dpl_4qCoHbyQL2DJ6Tkm...),
  apex 308 -> www. Markers verified live on BOTH domains: new paragraph, "early" (no "very
  early"), /work link, wall chart, CTA pill, prompt diff, "Coming soon". New cover is
  byte-identical on prod and disk (sha 5a1127ec, 263121 bytes).
- **CLOSED:** "early-stage startup" is no longer owed — he gave per-company stage 2026-09-02 and
  it is ledgered. Guardicore no longer renders any job title, so the *sales* wording is retired
  from this page; the ledger records why it was there and what replaced it.
- Gotcha: the browser pane throttles animation clocks to 0 and caches images; seek via the Web
  Animations API and re-fetch to verify, never trust the pane.

## SHIPPED TO PRODUCTION 2026-09-01 (deploy 1uhmpp7nf, operator "push it")
Everything through Pass-62 is LIVE on both domains, verified: www 200, apex 308->www.
Pass-57..62 all shipped in one deploy. **The retired "hundreds of birth workers" claim is GONE
from production** — every surface re-probed clean for user counts, HIPAA-grade, the biomedical
descriptor, the equity sector wording, and Ordani security mechanisms. Redirects live:
/hire-me -> /services, /work/hr-equity-author -> /work/rfp-engine. Four case studies 200.
Ledger moves that must not be reverted: Guardicore $1.2M average deal size SUPERSEDES the
$150K delta, and the Trillions line is RESTORED on operator confirmation; Ordani is "active
paying users", in beta, public release coming.

## Pass-64 SHIPPED — Ordani section is a picture edit on petrol (deploy besnxw59v)
Operator: "feels bare". Section now runs PETROL (already Ordani's world in the WorldSwitcher
map, and the only mapped world the site never used) and carries four photos: lead frame is a
doula taking notes beside a pregnant client (the paper intake the product replaces), then a
three-up band. PHOTO PROVENANCE: operator's own licensed birth-work shoot, lemandjune frames
ONLY. The 342 Pexels + Getty + AdobeStock _Preview files in that collection stay unused
(constitution bans stock; a Preview is not a licensed asset). Captions describe birth work in
general and never imply these people are Ordani customers. Verified live: petrol resolves,
all four images 200, no overflow at 390.
Note: WorldSwitcher uses IntersectionObserver, so a programmatic scrollIntoView does NOT
trigger the world change; nudge the scroll or you will read a stale background.

## Pass-63 SHIPPED — all three openings live (deploy nouvaltkt)
Brief `.claude/briefs/pass-61-page-openings.md` executed in full.
/work = catalogue lot ($80M at hero scale, Tel Aviv crop as exhibit, provenance line, order
hand-set so Guardicore leads). /services = the two doors ARE the page: full-height columns
split by one rule, each ending on a receipt; header deleted, h1 now sr-only; dead
.cw-sv-door CSS removed. /book = espresso, offer + terms left, form in a bordered card right,
slot label "Slots I hold open". OpeningWorld puts the opening colour in <head>, so no page
paints terracotta first. Verified live at 1440 + 390: no overflow, 52px tap target, all five
booking fields intact.
NOT BUILT ON PURPOSE: the brief's /book timetable grid rewrites the operator-verified booking
path and needs calendar sync first. Its own unit.
Ordani (Pass-62/63): no security mechanisms anywhere, and no "hired reviewers" — it says a
small team exists and nothing about what it does. /about's "Built and shipped by one person"
contradicted that and now reads "I founded it and I write the code".

## OPEN OPERATOR QUESTIONS
CLOSED 2026-09-01: deploy (done), photo rights (owned; only lemandjune used, stock stays
unused), Jerusalem photo (rejected), Tel Aviv sticker (cropped out, with a colleague's face),
Ordani encryption-vs-RLS (mechanism detail removed entirely, Pass-62).
CLOSED by operator 2026-09-01 PM, shipped in Pass-63 (922b746, NOT yet deployed): ship month
= "Coming soon"; portrait = public/hero-context.jpg (him at a laptop) in the § 0.1 rail.
OPEN: 3. Real early-reader quotes, attributed only. 4. "$149 after" needs a real raise date
(operator says Stripe is LAST, so this can wait). 5. Price lock?
6. SECRET ROTATION overdue (Resend, ICS, Stripe test). 7. Stripe go-live. 8. tsx em-dash debt:
6 files / 13 over cap. 9. Wire `page-cro` into /premium audit. 10. Settings prune: ~21 of 460
redundant, ZERO credentials. 11. Ordani section on home still feels bare; birth-worker photos
now cleared for use (lemandjune set only).

## Gotchas
- Windows heredocs mangle backslashes: write regex-bearing TS/JS with Edit, not python.
- Python writes CRLF -> prettier --write before commit. Screenshots return black below the
  fold on this machine; verify layout by computed geometry instead.
- Secrets never inline (gate enforces). Ordani never names vendors. HIPAA-compliant, not -grade.
