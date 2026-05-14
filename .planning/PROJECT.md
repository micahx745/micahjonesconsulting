# micahjonesconsulting (House Lights)

## What This Is

A premium-tier marketing and portfolio site for Micah Jones — an Oakland-based operator who builds the systems other people promise to build, and ships them. Two modes: a warm cream "foyer" for Home / About / Work-With-Me / Contact, and a dark cinematic "theater" for case studies. Built for founders of $5–50M companies who care about how their brand actually looks, and for the audience Micah's work serves — Black HR consultants, doulas, birth workers, equity practitioners.

## Core Value

A primary-audience visitor — a Black HR consultant, a doula, a birth worker — feels welcomed in the first ten seconds and stays through one case study. Everything else is a means to that end (per blueprint §14, item 10).

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Foyer mode (paper #F5EFE4, ink #1A1816, copper #C8542B) across Home / About / Work With Me / Contact / Work index
- [ ] Theater mode (obsidian #0D0D0F, bone #EAE6DD) across case study pages
- [ ] View Transitions API foyer↔theater transition (600ms ease-in-out, cream paper receding, theater ground rising)
- [ ] TitleCard signature interaction — pinned vertical word stack, 96px Söhne Halbfett (Inter Display Bold in free path), GSAP scroll-resolve to caption + first still cross-fade
- [ ] Home page (foyer): hero, full-bleed portrait, selected-work strip (3 cards), About teaser, Work With Me teaser, Contact CTA
- [ ] About page (foyer): two-column long-form, vertical portrait, credits list, Oakland context, three values
- [ ] Work With Me page (foyer): three stacked engagement shapes (Strategy Sprint, Embed, Build), four-question FAQ
- [ ] Contact page (foyer): two-field form (name + what you're working on), Resend integration, two-business-day reply commitment
- [ ] Work index page (foyer): preview of case studies with Title Card thumbnails
- [ ] ORDANI case study (theater): full MDX per blueprint §9 — verbatim per user confirmation
- [ ] HR Equity Author case study (theater): anonymized, per blueprint §10
- [ ] Passioneer case study (theater): short-form
- [ ] Guardicore/Akamai case study (theater): short-form
- [ ] Typography via next/font/google: Inter Display (headlines), Inter (body), Source Serif 4 (deks + pull quotes)
- [ ] Lenis smooth scroll at layout root (damping ~0.08)
- [ ] LCP < 1.8s mobile, Lighthouse Performance ≥ 95, INP < 200ms, CLS < 0.05
- [ ] Copy passes harness `copy-lint.sh` hook (30 banned words from blueprint §8 + harness slop-words.txt)
- [ ] WCAG 2 AA: no serious/critical axe violations on any route (harness `a11y-reviewer` pass)
- [ ] Visual QA: 390/768/1440 baselines for all pages (harness `visual-qa` agent)
- [ ] Production deploy on Vercel with domain micahjonesconsulting.com
- [ ] Custom: `copy-lint` TypeScript module at build time (`lib/copy-lint.ts`) + `instrumentation.ts` hook
- [ ] Custom: `<TitleCard />` reusable React component (`components/TitleCard.tsx`)
- [ ] Premium portrait shoot: one Oakland-shot portrait (~$500–$1,200, 2-hour session)

### Out of Scope

- Blog — "no blog. No Now. No Uses. No colophon" per blueprint §6
- "Now" page, "Uses" page, colophon, decision log, BART status — dev-Twitter tells (anti-pattern §13)
- WebGL / 3D / Three.js / Spline — wrong budget, wrong audience for the primary-audience visitor (§11, §13)
- Client logo wall, "trusted by" / "As Seen In" bar — Micah doesn't have client consent + reads as filler from solo operators (§13)
- Newsletter signup in navigation — would dilute foyer hospitality; if a newsletter exists later, lives at bottom of About (§13)
- Cursor follower — dated as of mid-2025 (§13)
- Monospace fonts anywhere — Attempt 1 tell, blocked by harness `motion-discipline.sh` (§13)
- PP Editorial New + "warm paper studio" framing — Attempt 2 tell (§13)
- Klim paid fonts (Söhne, Tiempos) at v1 launch — license deferred (~$600 USD); free path (Inter + Source Serif 4) ships first per blueprint §4a + user confirmation
- Dark mode toggle — mode is route-based, not user-controlled (§12 CLAUDE.md)
- Headless CMS (Sanity/Contentful) — five pages don't warrant the overhead (§11)
- Mixpanel/Segment/PostHog analytics at launch — Vercel Analytics only (§11)
- Calendly link on first contact volley — conversation starts in email (§7)
- "Select your budget range" dropdown on contact form — two fields, real reply (§13)
- Stock photography, illustration, icon kits — anything that isn't a photograph or screenshot is type (§4c)
- Multi-language / i18n — single language launch
- Mobile native app — web only (consistent with the audience using browsers)

## Context

- **Blueprint at `.planning/blueprint.md`** is the source of truth for every design and copy decision. Captured verbatim from the user. When a decision conflicts with the blueprint, the blueprint wins unless explicit reason recorded in Key Decisions.
- **Harness at github.com/micahx745/premium-web-harness** (already installed, all 8 plugins enabled, 5 plugin-supplied MCPs registered) enforces premium discipline via hooks at the write boundary:
  - `copy-lint.sh` blocks banned words
  - `font-license.sh` blocks Klim font imports without license lock + permits Inter when foundry=system
  - `motion-discipline.sh` blocks cursor followers, scroll-jacking, parallax-on->2, mono aesthetic
  - `design-tokens.sh` warns on hex literals outside palette
  - `mdx-frontmatter.sh` blocks case studies missing required frontmatter
  - `image-budget.sh` blocks images > 500KB
  - `perf-budget.sh` + `a11y-baseline.sh` run on build
- **Seven subagents** available via Task tool: design-director (refuses off-brand), copy-editor (rewrites slop), motion-engineer (owns TitleCard + view transition only), perf-auditor (Lighthouse), a11y-reviewer (axe), case-study-writer (MDX), visual-qa (Chrome DevTools screenshots).
- **Stack**: Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4 (`@theme` inline + tokens), MDX via `@next/mdx`, Lenis 1.3+, GSAP 3.12+ (only inside TitleCard), Framer Motion (component motion), Resend (transactional email), Supabase (contact-form archive only — no DB on marketing site otherwise), Vercel hosting.
- **Audience**:
  - Primary: founders of $5–50M companies who care about how their brand actually looks
  - Primary (secondary lens): Black HR consultants, doulas, birth workers, equity practitioners — the people Micah's work serves
  - Tertiary: design-engineering peers / potential collaborators
- **ORDANI case study** contains real CDC statistics on Black maternal mortality (44.8 per 100,000 live births, ~3.15× rate vs non-Hispanic white women) per blueprint §9. User has confirmed these are real / attested verbatim; case-study-writer agent will refuse to alter.
- **Solo build**, ~14-day target timeline per blueprint §12.
- **Repo location**: `~/Code/micahjonesconsulting` (this directory).
- **Production domain**: micahjonesconsulting.com (to be configured on Vercel).
- **GitHub auth identity**: micahx745 (not micahjones — that's a different real GitHub user). Repo will live at github.com/micahx745/micahjonesconsulting.

## Constraints

- **Tech stack**: Next.js 15 App Router, Tailwind v4, MDX — locked per blueprint §11.
- **Timeline**: ~14-day build per blueprint §12 phased schedule.
- **Budget**: Klim font license (~$600 USD) deferred to v2; using free Inter Display + Inter + Source Serif 4 at launch. Portrait shoot $500–$1,200 budget (out-of-band of dev).
- **Performance**: LCP ≤ 1800ms, INP ≤ 200ms, CLS ≤ 0.05, Lighthouse Performance ≥ 95 mobile, max image 500KB (enforced by harness `perf-budget.sh` + `image-budget.sh`).
- **Voice**: 30 banned words from blueprint §8 + harness defaults enforced at hook layer.
- **Motion**: One signature interaction only (TitleCard + foyer↔theater transition). All other motion blocked by `motion-discipline.sh`.
- **Accent color**: One — copper #C8542B. ORDANI sage #5E7158 permitted *only* inside `/work/ordani` route.
- **Typography**: Inter Display + Inter + Source Serif 4. Klim Söhne/Tiempos imports blocked by `font-license.sh` until license arrives.
- **Platform**: Windows native development; production deploy on Vercel Linux. (`/premium new` slash command's WSL2-only check is bypassed because this project is being scaffolded manually.)
- **Sourcing discipline**: ORDANI metrics treated verbatim; no inventing new metrics in subsequent case studies (case-study-writer agent enforces).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Direction: House Lights (two-mode site) | Blueprint §4 — differentiates from Clay-clone uniformity; matches Micah's "Oakland operator" hospitality-then-craft positioning | — Pending |
| Open-source typography path (Inter + Source Serif 4) | Klim ~$600 license deferred; free pairing scored 90% Söhne similarity (Inter, per Typewolf) + Source Serif 4 cited as best Tiempos alt | — Pending |
| Single signature motion: TitleCard | Per blueprint §4f — earns motion by spending it once | — Pending |
| Five-page IA + case studies | Per blueprint §6 — five page types max | — Pending |
| MDX content, no headless CMS | Per blueprint §11 — five pages don't need Sanity/Contentful overhead | — Pending |
| Harness-enforced discipline (premium-web plugin) | Hooks block banned words / wrong fonts / forbidden motion at the write boundary; same discipline that would otherwise require a senior designer reviewing every PR | — Pending |
| ORDANI case study metrics verbatim | User confirmed §9 stats are real / attested | — Pending |
| Repo at `~/Code/micahjonesconsulting` | User-confirmed path | ✓ Good |
| Push to github.com/micahx745/* | Auth account; `micahjones` is a different real user | ✓ Good |
| Comprehensive depth + parallel + quality models | User selected via /gsd:new-project config gate — biased toward thoroughness over speed | ✓ Good |
| Research-yes + plan-check-yes + verifier-yes | User selected all three optional quality agents at config gate | ✓ Good |

---
*Last updated: 2026-05-14 after initialization*
