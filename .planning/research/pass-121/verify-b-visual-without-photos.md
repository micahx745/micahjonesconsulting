# Verify — Facet B: Visual Without Photos (Pass-121)

Adversarial verification of `facet-b-visual-without-photos.md`. All checks below are live
WebFetch/WebSearch calls run 2026-09-16, not training memory. Where a cited URL returned 403,
I attempted an alternate route (search, mirror/syndicated source) before marking anything
unverifiable.

## Verdict table

| ID | Verdict | Reason | URLs checked |
|---|---|---|---|
| C1 | **weakened** | The Nightingale essay is dated **August 25, 2020 (updated Oct 11, 2021)** — not 2026 as the facet's citation implies ("Date: 2026 (trend pieces)"). Its "peak scrollytelling" framing is about 2015 through 2020, not 2026, and it does not itself demonstrate a live 2026 view. svilenkovic.com is genuinely dated 2026 and does say scrollytelling is "past the early-adopter phase and into mainstream creative tooling," but it is a single 3D/web-agency's own blog (vendor content selling 3D scroll work), does not caution against scrolljacking as the facet implies, and is thin corroboration on its own. | nightingaledvs.com/the-past-present-and-future-of-scrollytelling/ (fetched — 2020/2021, not 2026); svilenkovic.com/3d/scrollytelling-trends-2026 (fetched) |
| C2 | **upheld** | gijn.org 403'd twice to WebFetch, but the same interview is syndicated at storybench.org, which I fetched directly. It confirms Reuters graphics journalist Mayank Bhatt's circular-financing visualization of OpenAI/Nvidia/Oracle, and independent search confirms Bloomberg's "AI Circular Deals: How Microsoft, OpenAI and Nvidia Keep Paying Each Other" exists at the cited URL with matching content (Microsoft/OpenAI/Nvidia/Oracle circular financing, $800B+ estimates for 2026). | storybench.org/making-trillions-make-sense... (fetched, confirms); gijn.org (403 both attempts); bloomberg.com/graphics/2026-ai-circular-deals/ (403, existence and content confirmed via WebSearch) |
| C3 | **upheld** | storybench.org quotes Bhatt almost word for word against the facet's paraphrase: "If the question is about scale over time, a chart usually works best. If it's about relationships or systems, something more diagrammatic might make sense." Published April 23, 2026. | storybench.org/making-trillions-make-sense... (fetched, direct quote confirmed) |
| C4 | **upheld** | All three cited Pudding URLs load and match their described topics: Similes (200,000 "as X as Y" comparisons), Musical Motifs (Hamilton/Les Mis/Wicked), Essential Words (1953 vs 2023 vocabulary lists). URL date-paths (`/2026/05/`, `/2025/12/`, `/2026/07/`) are internally consistent with a monthly-ish cadence into mid/late 2026. | pudding.cool/2026/05/similes, pudding.cool/2025/12/motifs, pudding.cool/2026/07/essential-words (all fetched, all load) |
| C5 | **upheld** | pudding-cup page confirms three 2025 winners matching the facet's taxonomy exactly: Dithering Part I (motion/technical), Legislative Network Behind State Trans Laws (document-driven), Benford's Law (narrative/exploratory) — $1,500 each, ~100 entries. | pudding.cool/pudding-cup/ (fetched, confirmed) |
| C6 | **upheld** | Page loads, is a 2025 legislative-text story, image paths literally contain `/ai2html-output/trans_map-full.png`, confirming the ai2html export claim. | cj-robinson.github.io/trans-model-leg/ (fetched, confirmed) |
| C7 | **upheld** | Codrops tutorial (published exactly April 1, 2026, by original author Damar Aji Pramudita) states directly: "I mapped an image to a grid of 400 x 400 cubes and animate... those 160,000 cubes simultaneously," using GLSL shaders. Matches the facet's figure precisely. | tympanus.net/codrops/.../animating-160000-cubes... (fetched, confirmed); visualrambling.space/dithering-part-1/ (loads; could not confirm live WebGL render via text-only fetch, but content/topic match) |
| C8 | **upheld** | variable.io/works confirms every named client — Transport for London, Dropbox, Nike, IBM, Google — plus an Expo 2025 project ("Spirit Plant"). Correctly flagged by the facet itself as a vendor claim, not a measured result — that framing is accurate. | variable.io/works/ (fetched, confirmed) |
| C9 | **upheld** | MDN's live page states exactly: "Limited availability — This feature is not Baseline because it does not work in some of the most widely-used browsers." Matches the facet's claim precisely. | developer.mozilla.org/.../ScrollTimeline (fetched, confirmed) |
| C10 | **refuted** | The cited page's own data contradicts the facet's claim. createtoday.io reports Photography 43.6%, Illustration 26.6%, "No imagery" only 17% — meaning 83% of the sampled consultant sites use hero imagery, the opposite of "most business-consultant sites now skip a hero photo entirely." | createtoday.io/examples?category=business-consultant (fetched — data contradicts the claim) |
| C11 | **refuted** (on the cited figures; general direction survives) | The facet states "over 500 million AI-bot visits found only 408 requests." The actual otterly.ai article says: "Total AI bot visits to the site: 62,100+ ... Total AI bot visits to /llms.txt: 84 ... Share of AI bot traffic that went to /llms.txt: ~0.1%." Neither "500 million" nor "408" appears anywhere in the source. The underlying conclusion (llms.txt gets negligible AI-crawler traffic, no major provider commits to crawling it) is still correct with the real numbers, but the facet's specific evidentiary figures are fabricated, not a rounding or transcription slip. | otterly.ai/blog/the-llms-txt-experiment/ (fetched twice, confirmed real figures differ by three-plus orders of magnitude from what's cited) |
| C12 | **refuted** | Three sub-claims checked against the source, none confirmed: (1) no mention of JSON-LD or structured data anywhere on the page; (2) the page tests ChatGPT, Claude, and Perplexity only — Google or Google AI Mode is never mentioned as citing the file; (3) the page's only "zero" claim is "zero impact on server performance," not "SEO impact was zero." The facet's specific narrative (JSON-LD plus llms.txt leading to a Google AI Mode citation three days later, then a conceded zero SEO impact) does not appear in this source at all. | netkodo.com/case-studies/llmstxt (fetched twice with targeted prompts, confirmed absent) |
| C13 | **weakened** | Independent WebSearch confirms Studio Dumbar's OutSystems identity is real and matches the facet's description almost word for word ("Letterforms become UI, diagrams and sound waves at the same time" per Studio Dumbar's own site) — but that project is from the 2022 "Next Step 22" TDC award, not new 2025 through 2026 work, so citing it as evidence of a current 2025-2026 trend is a stretch typical of trend roundups. The creativebloq.com article itself could not be verified directly — WebFetch returned only nav/header content on two attempts, so the claim that this specific article discusses Studio Dumbar/OutSystems is unconfirmed, even though the underlying design fact is real. | creativebloq.com/... (fetched twice, content truncated/inaccessible); studiodumbar.com/work/outsystems plus WebSearch (confirmed underlying project, dated 2022) |
| C14 | **refuted** | NNGroup's actual article (published Aug 4, 2019) presents blurring/redaction and wireframes as three equally valid options — "show process images," "redact or blur," or "make it generic" — and explicitly recommends blurring as "especially important for applications displaying financial or medical information." It does not rank wireframes above blurring, and does not say a blurred image "reads as broken/still loading" — that specific rationale does not appear in the source at all. | nngroup.com/articles/ux-design-portfolios/ (fetched, contradicts the specific ranking and rationale claimed) |
| C15 | **weakened/refuted** | The cited article (published Sept 18, 2025, not "trend coverage" broadly) describes one company's ("Green Leaf Consulting") icon-guided challenge/solution/impact sections as a single illustrative example among various design tips — it does not claim this is "a now-standard three-part shape" across the industry or that "most competitor case studies" follow it. The facet generalizes a single example into an industry-wide pattern the source never asserts. | stryvemarketing.com/blog/design-b2b-case-studies/ (fetched, does not support the generalization) |
| C16 | **upheld** (self-consistent) | The facet already flags this as secondary/blocked evidence, which is the correct treatment — I independently hit the same 403 pattern on the sibling Bloomberg URL (2026-ai-circular-deals), consistent with bot-blocking rather than the page being removed. No further weakening needed; the facet's own hedge is appropriate. | bloomberg.com/graphics/2025-in-graphics/ (not independently re-tested; sibling URL 2026-ai-circular-deals/ confirmed 403 to WebFetch) |

## Dead or changed example URLs

None of the checked example URLs are confirmed dead (404/removed). Several are bot-blocked to
automated fetchers rather than dead — this matters for the site's own capture workflow (needs a
real headless/browser session, not plain fetch), but is not the same claim as "gone":

- `https://www.bloomberg.com/graphics/2026-ai-circular-deals/` — 403 to WebFetch (content and
  headline independently confirmed live via WebSearch, so the page exists)
- `https://gijn.org/stories/reuters-data-visualization-graphics-ai-economy/` — 403 to WebFetch on
  two attempts (content confirmed live via the syndicated storybench.org mirror)
- `https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026`
  — WebFetch returned only nav/header content on two attempts; could not confirm this specific
    article's body text discusses Studio Dumbar/OutSystems, though the underlying design fact is
    real (see C13)

Confirmed live and matching their described content: pudding.cool/2026/05/similes,
pudding.cool/2025/12/motifs, pudding.cool/2026/07/essential-words, cj-robinson.github.io/trans-model-leg/,
visualrambling.space/dithering-part-1/, variable.io/works/, basement.studio/showcase/harvey-from-seed-to-series-d,
clay.global/work/sky, createtoday.io/examples?category=business-consultant.

## Contrary evidence found

- **C10's own source contradicts C10.** createtoday.io (Aug 2026 update) reports 83% of its
  sampled consultant sites use hero imagery (43.6% photography plus 26.6% illustration), directly
  opposing the facet's claim that "most business-consultant sites now skip a hero photo entirely."
- **C11's real numbers are three orders of magnitude smaller than cited.** otterly.ai: 62,100+
  total AI-bot visits, 84 to /llms.txt (about 0.1%) over 90 days — not "500 million" visits or
  "408" requests. The direction (llms.txt is nearly invisible to AI crawlers) still holds with the
  real numbers; the specific figures cited do not exist in the source.
- **C12's Google AI Mode and JSON-LD narrative is absent from its own cited source.** netkodo.com
  tests ChatGPT, Claude, and Perplexity only, never mentions Google or JSON-LD, and its only
  "zero" claim is about server performance, not SEO impact.
- **C14's source treats blurring as valid, not inferior.** NNGroup (2019) recommends blurring
  particularly for financial/medical data and never frames it as reading like a broken image —
  the facet invented that specific critique.
- **C1's primary citation is six years stale.** nightingaledvs.com is dated 2020/2021, not the
  "2026 (trend pieces)" the facet implies; only svilenkovic.com (a single agency blog) is
  genuinely current, and it is thin, vendor-flavored corroboration on its own.

## Summary (5 lines)

Roughly half the facet's central claims hold up under direct verification (C2 through C9
confirmed via live fetch or an independent mirror/search, including the Reuters/Bloomberg
editorial rule and the Pudding Cup taxonomy). But four claims are refuted outright by their own
cited sources — C10 (consultant-site imagery), C12 (llms.txt/JSON-LD/Google AI Mode), C14
(NNGroup's blur ranking and rationale), and C15 (one example generalized into an industry
standard) — and two more are weakened by date or sourcing problems (C1's stale 2020 citation,
C13's unconfirmed article body and 2022-vintage example), plus C11's specific numbers are
fabricated even though its general conclusion survives once the real figures are substituted.
The site-facing recommendations in "What this site could take" numbers 1, 3, 4, and 6 rest on the
strongest-surviving claims (C2/C3/C6/C7/C8/C9) and are reasonably safe to act on; recommendation 7
(llms.txt/AI-discoverability plumbing) should be re-derived from the corrected C11/C12 figures
rather than the facet's as-written framing, and recommendations 5 and 8 should be treated as
weaker than presented given the C1 and C10 problems.
