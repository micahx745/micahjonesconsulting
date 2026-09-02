# RESUME — micahjonesconsulting (2026-09-01 PM)

## HARNESS Pass-61: arc-shape gate LIVE — full policy `MODEL_ROUTING.md` §6
Audit: 9 of 320 Fable turns were taste calls, 311 execution. DIRECT (Fable) now ends by
committing a brief (`.claude/briefs/README.md`); EXECUTE runs it verbatim; JUDGE returns 3x.
Global gates, all tested: statusline `5h NN%`; tier-burn-monitor (12 Fable / 30 Opus / 75+90%,
silent on Sonnet); secret-literal-gate DENIES token literals (proven live); agent-model-gate
WARNS (advisory) on unnamed Agent model; concurrent-session-guard (SessionStart). Card §4
corrected: 31 hook events exist. TWO SESSIONS ran this tree tonight, two budgets on one 5h
window; three collisions -> LESSONS #12.

## SITE — Pass-68/69/70 LIVE (deploy 9bzvmcf6v). Review groups A/D/E done, B/C part-done.
Pass-68: home ticker removed (markup, const, CSS, and the [data-scroll-track] effect that drove
it). Also a real bug the review never named: the h1's two lines are separate block spans, so
they read as "I build thego-to-market" to every crawler. One trailing space.
Pass-69: the rotating h1 KEPT (operator asked for it by name in Pass-9) and fixed properly.
The stack held all four words plus a duplicate, so the h1 text was 112 chars of repetition.
Now ONE word is server-rendered; each step appends the next below the 1em window, translates
1em with the same 600ms easing, then drops the consumed word and resets with no transition.
The roll's width eases alongside, or the inline-block snaps at cleanup. The sr-only line now
CONTINUES the visible word instead of preceding it, so the heading reads as prose:
"I build the go-to-market. Also product, data platforms, and RFP engines." (72 chars).
Verified live: 1 child at rest, 2 only inside a step, lands back on the first word.
The review's screen-reader claim was FALSE — the stack was always aria-hidden.
Pass-70: /packages split out with its own opening, cards, rules, OfferCatalog + Breadcrumb LD
and a cross-link back; /services door points at the page, sitemap gains it, Stripe cancel_url
repointed (it would have dropped a cancelled buyer on a page with no packages). /services
gained two objection blocks: "On the price" and "Why one person".

OPERATOR HELD, do not re-litigate: rotating h1 stays · "See the work" stays the primary hero
CTA (D7 receipts-first) · hero keeps the four-exits framing · Ordani narrative and the
operating-principles block stay as they are (Pass-64 approved; principles were ADDED on a
prior audit).
NOT INVENTED: the review wanted a published "5K to 25K" engagement range. That ceiling is not
in the ledger. /services now says WHEN the number arrives, not what it is. A real range is
stronger and is the operator's to set.
FLAGGED, other lane: app/(foyer)/playbook/page.tsx:622 still links to /services#packages.
STILL OPEN from the review: nine vibe-coding articles + a hub, and the funnel (email
sequences, second lead magnet, launch sequence). Both need operator input: an email platform
and a launch date.
GOTCHA EARNED: a long `git commit -m` containing literal double quotes closed the shell string
early and git took the rest as a pathspec — the commit silently did not happen and only the
prior pass deployed. Long messages go through `git commit -F <file>`.

## SITE (non-playbook lane) — Pass-57..67 ALL LIVE (deploy djhfh3a43, verified on www)
Pass-67 executed the external deep review, minus what the operator kept and what verification
killed. LIVE + probed: /about's retired "$150K" -> $1.2M (the case study was swept the same
morning, this page was missed); /about's "HR consultant... 4x" -> the case study's own 8,000
to 290,000 (sector leak AND a metric that contradicted 36x); /work h1 is now a sentence, not
the bare string "$80M"; /services/ai-engineering RETIRED 301 -> /services with its
production-grade definition folded into service 03; /book gained "what you leave with";
titles + descriptions rewritten on the five owned pages (every description had been 177-260
against a ~155 limit, now 146-150); llms.txt advertised FOUR services that do not exist,
rewritten to the real three plus both buying paths.
GAP FOUND while consolidating: /services had linked to /playbook ZERO times since Pass-56
removed the header. Bridge restored.
OPERATOR KEPT (do not "fix"): "four exits" framing, and "joined early".
REVIEW FINDINGS VERIFIED FALSE — do not re-apply: content-engine IS in the sitemap; the
"under $150" playbook price is correct ($149 < $150); the home image alt="" is a decorative
hero photo, which is right; and the em-dash cap is NOT broken — every page has exactly ONE
(the nav's "Menu —"). That last one I reported as broken first: my measurement decoded curl
output as latin-1, so ↗ and × became U+2014. Decode UTF-8 explicitly when counting glyphs.
STILL OPEN from the review, none started: home restructure (rotating H1, marquee, dual-door
routing above the fold), a split-out /packages page, nine vibe-coding-to-production articles,
and the funnel (email sequences, second lead magnet, launch sequence). Operator decisions
needed for the funnel: an email platform and a launch date.
MEDICAID CLAIM: still live on the home page, deliberately untouched. Operator-supplied
2026-08-30 per the code comment but never ledgered, and "processing Medicaid claims" carries
billing-agent weight. Operator owes one sentence on the real mechanism, then ledger it.

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
