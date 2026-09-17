# Pass-121, Facet (d): Being recommended and cited by AI assistants

Research only from live WebSearch/WebFetch this session (2026-09-16). Every claim below is tagged
with an evidence type. A large share of the material returned by search on this topic is SEO/GEO
marketing-blog content citing its own unaudited numbers — see "Now overused" and the caution at the
end of "Central claims" before treating any single-blog-post statistic as fact.

## Central claims

**C1. Google says no special markup or file is needed for AI Overviews / AI Mode.**
Google's own developer docs state: "You don't need to create new machine readable files, AI text
files, or markup to appear in these features. There's also no special schema.org structured data
that you need to add." Same index, same ranking signals as organic Search feed AI Overviews.
- URL: https://developers.google.com/search/docs/appearance/ai-features
- Date: primary doc, live as fetched 2026-09-16 (guidance dates to ~May 2025 per secondary reporting)
- Evidence type: primary-doc
- Means for this site: standard technical SEO plus genuinely useful content is Google's own stated bar. No AI-specific schema investment is required to appear in Google's AI surfaces.

**C2. Google has explicitly said it does not support llms.txt and has no plans to.**
Google's John Mueller, on Bluesky: "I'm tempted to say something snarky since this has come up so
often, but to be direct, no" (it is not an endorsement). Mueller separately told the Search Off the
Record podcast that llms.txt files cannot be used by LLM systems to differentiate which site to
surface, and Gary Illyes confirmed at Google Search Central Live that Google has no plans to support
it. Mueller: "AFAIK none of the AI services have said they're using LLMs.TXT (and you can tell when
you look at your server logs that they don't even check for it)."
- URL: https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html ; https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/
- Date: 2025–2026 (reported through 2026)
- Evidence type: expert-opinion (Google spokespeople, reported by trade press) — treat as authoritative for Google, not for other vendors
- Means for this site: don't spend this pass's effort writing an elaborate llms.txt for Google's sake. A minimal one costs little for the vendors that do check it (see C4–C6), but it is not a Google lever.

**C3. A large-scale measured study found llms.txt has no detectable effect on AI citation rate.**
SE Ranking's November 2025 study of roughly 300,000 domains found llms.txt adoption at 10.13% of
sites studied. An XGBoost feature-importance model built to predict AI citation frequency *improved*
when the llms.txt variable was removed — the file added noise, not signal, to the prediction.
- URL: reported via https://www.1clickreport.com/blog/llms-txt-evidence-2026 (secondary summary of the SE Ranking study; the primary SE Ranking report was not directly fetched this session — verify the exact figures against it before quoting them)
- Date: November 2025
- Evidence type: measured (large sample, disclosed method) — sourced second-hand here, flagged for verification
- Means for this site: llms.txt is cheap insurance for the handful of vendors (Anthropic, some coding-agent tools) that read it, but it is not a citation strategy.

**C4. Anthropic runs three separately-controllable crawlers, documented and updated February 2026.**
ClaudeBot (model training), Claude-User (fetches a page live when a Claude user's query needs it),
and Claude-SearchBot (crawls to improve Claude's search-result quality) are each named, each honors
robots.txt and Crawl-delay, and each has independent block/allow consequences. Blocking ClaudeBot
excludes future content from training; blocking Claude-User stops Claude fetching this site to
answer a live question about it; blocking Claude-SearchBot removes it from Claude's search index.
- URL: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler ; https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Date: updated ~2026-02-20, publicly noted 2026-02-25
- Evidence type: primary-doc
- Means for this site: robots.txt should explicitly allow Claude-User and Claude-SearchBot — the two that matter most for being recommended by Claude. ClaudeBot (training) is a separate, optional decision independent of citation goals.

**C5. OpenAI runs three separately-controllable crawlers; ChatGPT-User is not reliably robots.txt-bound.**
GPTBot = training crawler. OAI-SearchBot = builds the index ChatGPT Search cites from; disallowing
it means the site "will not be shown in ChatGPT search answers, though can still appear as
navigational links." ChatGPT-User = fetches a page when a live user asks ChatGPT to look at it;
OpenAI's own docs note "because these actions are initiated by a user, robots.txt rules may not
apply."
- URL: https://developers.openai.com/api/docs/bots
- Date: primary doc, live as fetched 2026-09-16
- Evidence type: primary-doc
- Means for this site: allow OAI-SearchBot specifically to be eligible for ChatGPT Search citations, independent of any decision about GPTBot training.

**C6. Perplexity runs two crawlers; changes can take up to 24 hours to propagate.**
PerplexityBot indexes for Perplexity's answers and follows robots.txt (allowing it makes content
discoverable in Perplexity responses); Perplexity-User fetches a page live for a user and, per
reporting, "generally ignores robots.txt because a human initiated the request." Sites behind a WAF
may need to explicitly allowlist Perplexity's user agents.
- URL: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Date: primary doc, live as fetched 2026-09-16
- Evidence type: primary-doc
- Means for this site: check that no WAF/Vercel firewall rule blocks PerplexityBot; the effect is invisible until checked.

**C7. Google-Extended is a training opt-out token, not a crawler, and does not affect AI Overviews or Search ranking.**
Introduced 2023, Google-Extended has no separate HTTP user agent — it is a robots.txt directive
applied retroactively to content Googlebot already fetched, controlling only whether it is eligible
for Gemini/Vertex AI training and grounding. Disallowing it does not remove a page from AI Overviews
or from Search.
- URL: reporting on Google's own documented behavior, e.g. https://www.fastly.com/blog/teach-your-robots-txt-a-new-trick-for-ai ; https://trakkr.ai/data/crawlers/google-extended
- Date: 2023 origin, current behavior as reported 2025–2026
- Evidence type: primary-doc (Google's stated behavior, via secondary summary — the original Google announcement of Google-Extended was not directly refetched this session)
- Means for this site: this is a business decision (whether Micah wants case-study text used to train Gemini) separate from AI-discoverability; it does not trade off against AI Overview visibility.

**C8. Measured, cross-crawler log analysis: no AI crawler renders JavaScript.**
A joint Vercel/MERJ analysis and a separate analysis of 500M+ GPTBot fetches found zero evidence of
JavaScript execution by GPTBot, ClaudeBot, or PerplexityBot; they fetch some `.js` files (ChatGPT
~11.5%, Claude ~23.8% of requests, per one log study) but do not execute them or wait for hydration.
Only Googlebot and Applebot are documented as rendering JS among major crawlers.
- URL: https://vercel.com/blog/the-rise-of-the-ai-crawler ; https://www.botify.com/blog/openai-tripled-web-crawl
- Date: 2026 (log studies covering late 2025–early 2026 traffic)
- Evidence type: measured (server-log analysis at scale, method partly disclosed by companies with direct log access)
- Means for this site: any content a bot must read to cite the site has to be present in the initial server-rendered HTML. This project already renders via Next.js App Router server components, which is the right baseline — but any content that only appears after client-side data-fetching, animation-triggered reveal, or a JS-gated interaction is invisible to every AI crawler that matters here. Directly relevant if any numbers or quotes in the study "exhibits" are ever deferred behind client JS.

**C9. Direct real-time retrieval by five assistants ignored JSON-LD/hidden markup; only visible HTML text was used.**
A live test of ChatGPT, Claude, Perplexity, Gemini, and Google AI Mode fetching a page in real time
(not the pre-built AI Overviews index) found none of them used JSON-LD, hidden Microdata, or hidden
RDFa — all five extracted only visible HTML text. The same source measured a small effect (Cohen's
d=0.18) for JSON-LD alone in flat-text retrieval, versus a larger effect (d=0.60, +29.6% accuracy)
when the same facts were written as ordinary visible body text.
- URL: https://thegeolab.net/json-ld-google-vs-perplexity-flat-text-rag/
- Date: 2026
- Evidence type: measured, but a single independent test with only partially disclosed sample size — treat as directional, not proof, and do not quote the exact effect sizes in client-facing copy without independent replication
- Means for this site: numbers and claims in `content/citations.ts` matter far more if they appear as plain, visible prose in the case-study body than if they only exist in structured data. This site already renders citations as prose, which is the pattern this evidence favors.

**C10. A controlled before/after study found adding JSON-LD produced no meaningful citation lift.**
Ahrefs tracked 1,885 pages that added JSON-LD schema (Aug 2025–Mar 2026) against 4,000 matched
control pages, using difference-in-differences analysis on 30-day pre/post citation counts. Result:
Google AI Mode +2.4% and ChatGPT +2.2% (both statistically indistinguishable from zero), Google AI
Overviews −4.6% (a small, statistically significant *decline* the researchers could not explain).
Conclusion: "no major uplift in citations on any platform" for pages already receiving AI citations.
- URL: https://ahrefs.com/blog/schema-ai-citations/
- Date: 2026-05-11
- Evidence type: measured (disclosed sample size, control group, statistical method)
- Means for this site: schema markup (Person/Organization/Article) is worth doing for entity clarity and because it costs little to maintain correctly, but it should not be sold internally or externally as an AI-citation lever. Content quality and answer-shaped prose are what moves the number, per C9.

**C11. Ranking well organically is a weakening predictor of AI Overview citation.**
Ahrefs' large-scale citation study (863K keywords / roughly 4M URLs) found the share of AI Overview
citations that also rank in Google's organic top 10 fell from 76% in mid-2025 to 38% in early 2026.
- URL: https://ahrefs.com/blog/ai-overview-citations-top-10/
- Date: 2026 (reporting a mid-2025 to early-2026 trend)
- Evidence type: measured
- Means for this site: a five-case-study consultant site with modest organic ranking is not locked out of AI citation by weak domain authority the way it would be locked out of a page-one organic ranking; content structure and directness matter on their own.

**C12. AI engines draw from largely non-overlapping source pools; optimizing for one does not cover the others.**
Multiple 2025–2026 analyses (Profound/tryprofound and others) found only 11–12% domain overlap
between ChatGPT's and Perplexity's citations; roughly 29% of Perplexity citations and only 8% of
ChatGPT citations also appear in Google's organic top 10. Perplexity cites more sources per answer
(about 21.9) than ChatGPT (about 7.9).
- URL: https://www.tryprofound.com/blog/ai-platform-citation-patterns ; https://wellows.com/blog/ai-citation-overlap-study/
- Date: 2025–2026
- Evidence type: vendor-claim (analytics vendors reporting on their own tracked panels; method not fully disclosed — treat numbers as directional)
- Means for this site: there is no single "AI SEO" fix; the same page must work as flat retrievable text (helps ChatGPT/Perplexity/Claude direct fetch) and as a well-structured, credible organic page (helps Google AI Overviews, which still leans partly on the organic index per C11).

**C13. Claude's citation mix is unusually brand/owned-site-heavy and near-zero on Reddit, unlike other assistants.**
A roughly 150,000-citation study across ChatGPT, Perplexity, Gemini, and Google AI Overviews found
Reddit cited in 40.1% of cases overall (versus 26.3% Wikipedia, 23.5% YouTube), but reported Reddit
at "zero on Claude, where brand sites take 64%." Reddit citation share elsewhere: ChatGPT ~29.4%,
Gemini ~27.5%, Google AIO ~19.6%, Perplexity ~16.6%.
- URL: https://ziptie.dev/blog/why-reddit-dominates-chatgpt-perplexity-and-google-ai-overviews/ ; https://sanbi.ai/blog/ai-engine-citation-trends-source-affinity-reddit
- Date: 2025–2026 (underlying study dated June 2025 per one source)
- Evidence type: vendor-claim (full methodology not disclosed; directionally consistent across two independent write-ups, but not independently verified here)
- Means for this site: given the owner's specific goal of being recommended by Claude, this is the single most encouraging (if unverified) data point: Claude appears to favor a clean, well-written owned site over forum content — the shape micahjonesconsulting.com already has. It argues against seeding Reddit/forums and for spending effort on the site's own prose quality and clarity.

**C14. AI-cited content skews meaningfully fresher than organic-ranked content, with ChatGPT strongest and Google AI Overviews weakest.**
Ahrefs analyzed roughly 17 million cited URLs across ChatGPT, Perplexity, Gemini, Copilot, Google AI
Overviews, and organic Google SERPs. AI-cited URLs averaged 1,064 days old versus 1,432 days for
organic (25.7% fresher). ChatGPT showed the strongest recency preference (about 958 days average,
about 458 days fresher than organic); Google AI Overviews showed almost no preference (about 16 days
*older* than organic on average for its top citations in a separate breakdown).
- URL: https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/
- Date: 2025-07-28
- Evidence type: measured (disclosed sample size of 17M citations; exact platform-by-platform method partly summarized rather than fully reproduced here)
- Means for this site: a real, visible "last updated" date on case studies and the home page — never a cosmetic timestamp — plausibly helps with ChatGPT and Perplexity specifically. This is a content-ops habit, not a design change.

**C15. An independent 2026 academic measurement of Google AI Overviews found question-form queries trigger far more often, and roughly 30% of cited sources sit outside the organic top 10.**
Xu, Iqbal & Montgomery (submitted 2026-05-13) studied 55,393 trending queries across 19 categories
over 40 days (2026-03-13 to 2026-04-21), decomposing 98,020 atomic claims. Overall AIO activation
was 13.7%, rising to 64.7% for question-form queries. About 30% of cited domains did not appear in
the organic top 10 for the same query, suggesting AIO's source selection is not simply a re-ranking
of organic results. Separately, 11.0% of atomic claims were unsupported by their cited source page
(mostly by omission, not contradiction).
- URL: https://arxiv.org/abs/2605.14021
- Date: 2026-05-13
- Evidence type: measured (academic, disclosed sample and method; not yet peer-reviewed as of this session)
- Means for this site: phrasing section headers as real questions a buyer would type ("How much did the RFP tool save?", "What does a HIPAA-compliant CRM need?") measurably raises the odds of triggering an AI Overview for that query, on its own, apart from the page's organic rank.

**C16. The foundational academic "GEO" study is real and peer-reviewed, but it predates the 2025–2026 evidence window — background only.**
Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan & Deshpande (Princeton/Georgia Tech/Allen
Institute/IIT Delhi), "GEO: Generative Engine Optimization," tested 10,000 queries and found that
adding direct quotations from authoritative sources and adding statistics were the two content
interventions with the largest measured citation-visibility gain (up to about 40% in their
benchmark). Published at ACM SIGKDD 2024.
- URL: https://arxiv.org/abs/2311.09735
- Date: submitted 2023-11-16, published KDD 2024 — pre-2025, background only per this brief's evidence rules, not to be treated as current evidence
- Evidence type: measured (peer-reviewed, controlled, disclosed benchmark)
- Means for this site: cannot be cited as current evidence, but the underlying mechanism (named numbers plus quoted authority) matches this site's existing voice rule (named numbers, never "significant impact") — worth noting as a convergent older data point, not as proof.

**C17. Google deprecated FAQ rich results in Search (2026), but FAQPage schema itself is still valid and still crawled by non-Google systems.**
Google announced FAQ rich results (search appearance, rich-result report, Rich Results Test support)
would be dropped from Search in June 2026, with Search Console API support removed August 2026.
Reporting notes FAQPage schema remains a legitimate schema.org type and continues to be crawled by
Bingbot, PerplexityBot, and other RAG-style crawlers indexing the open web; Google has never stated
it uses FAQ markup for AI Overviews.
- URL: https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/ ; https://searchengineland.com/faq-schema-rise-fall-seo-today-463993
- Date: 2026 (deprecation announced 2026, effective June/August 2026)
- Evidence type: primary-doc (Google's own deprecation notice, via secondary reporting) plus expert-opinion on downstream crawler behavior
- Means for this site: don't build FAQ rich-snippet-chasing markup for Google. A "how I think about X" self-contained-answer format is still worth writing for its own sake (clarity, and possible non-Google retrieval benefit) — just not framed internally as an FAQ-schema SEO play.

**C18. Entity-linking (sameAs to LinkedIn/Wikidata/ORCID) is widely recommended by GEO consultancies as a knowledge-graph signal, but no controlled study demonstrating a causal AI-citation effect was found this session.**
Multiple agency write-ups describe Person/Organization `sameAs` arrays pointing to LinkedIn, Wikidata,
ORCID, X/GitHub as strengthening "entity recognition" in Google's Knowledge Graph and, by claim,
"the entity layers Anthropic, OpenAI, and Microsoft maintain internally." One case description
claims a consultant saw AI assistants "begin citing" them after implementing this, with an estimated
3–6 month recognition lag and 6–12 month citation-impact lag.
- URL: https://www.1digitalagency.com/glossary/entity-seo/ ; https://mediaofficers.com/insights/knowledge-graph-seo-wikidata-entity-optimization
- Date: 2026
- Evidence type: vendor-claim — the clearest "plausible mechanism, no measured evidence" item in this facet
- Means for this site: cheap to do correctly (Person schema for Micah with sameAs to his real LinkedIn) but should not be sold as a guaranteed AI-citation lever — a hygiene item, not a proven growth lever.

**C19. AI-referred site visitors convert at multiples of organic-search visitors in at least two independently reported studies.**
Semrush's June 2025 analysis of 500+ high-value topics found AI-referred traffic converting about
4.4x higher than standard organic search traffic for informational/consideration-stage queries. Seer
Interactive's multi-vertical case study reported ChatGPT referral conversion at 15.9% versus 1.76%
for Google Organic. Separately, AI referral traffic is reported as roughly 1% of total referral
traffic industry-wide but growing fast year over year (one report cites 527% year-over-year growth;
treat that growth figure as vendor-claim, not independently verified).
- URL: https://www.semrush.com/blog/traffic-channel-mix-study/ ; https://www.seerinteractive.com/insights/study-ai-brand-visibility-and-content-recency
- Date: 2025
- Evidence type: measured for the Semrush topic-level conversion comparison (disclosed sample of 500+ topics); vendor-claim for the Seer case study (single client, method not disclosed) and for the growth figure
- Means for this site: the case for this pass is not "AI sends huge volume" — it currently does not, for most small sites — but that the few visitors AI does send arrive pre-qualified and close at a much higher rate, which fits a solo consultancy's sales model better than volume-driven SEO would.

**C20. Across the research base, off-site and third-party presence is repeatedly named as the more consequential factor over on-page markup, but no single study isolates its weight against on-page factors.**
The pattern recurs across C12, C13, C18, and the general GEO literature: mentions and consistent
identity across LinkedIn, directories, podcasts, and other people's writing seem to matter more to
how confidently an assistant "knows" an entity than any on-page technical change. No study found
this session ran a controlled test isolating off-site mentions from on-page quality, so this remains
an informed synthesis, not a measured finding.
- URL: (synthesis across C12/C13/C18 sources above)
- Date: 2025–2026
- Evidence type: expert-opinion / synthesis — explicitly not a standalone measured claim
- Means for this site: the owner's own off-site footprint (interviews, guest posts, directory listings, LinkedIn activity under his real name, matching bio text) is plausibly a bigger factor than any further on-page work on `/work` — worth a separate, non-design pass, not part of this visual-craft brief.

## Live examples

| Name | URL | Date/context | What it does | Capture-worthy |
|---|---|---|---|---|
| Vercel llms.txt | https://vercel.com/llms.txt | live as fetched 2026-09-16 | About 700–800 word markdown index: product overview, agent guidance, doc links, API/MCP references — a real production llms.txt on a marketing root, not just docs | No (plain text file, not a visual pattern) |
| Anthropic llms.txt | https://docs.claude.com/llms.txt (slim index) plus llms-full.txt | live per reporting 2026 | Two-tier pattern: slim index linking to a full export, letting the caller choose depth | No |
| Google Search Central: AI features | https://developers.google.com/search/docs/appearance/ai-features | primary doc, live 2026-09-16 | States plainly there is no special AI markup; the canonical citable source for C1 | No |
| OpenAI crawler docs | https://developers.openai.com/api/docs/bots | primary doc, live 2026-09-16 | Names and scopes GPTBot / OAI-SearchBot / ChatGPT-User individually | No |
| Anthropic crawler support article | https://support.claude.com/en/articles/8896518 | updated 2026-02-20 | Names and scopes ClaudeBot / Claude-User / Claude-SearchBot individually | No |
| Perplexity crawler docs | https://docs.perplexity.ai/docs/resources/perplexity-crawlers | primary doc, live 2026-09-16 | Names PerplexityBot / Perplexity-User and their robots.txt behavior | No |
| Ahrefs schema/AI-citation study | https://ahrefs.com/blog/schema-ai-citations/ | 2026-05-11 | Disclosed-method before/after citation study (C10) — a model for how to talk about "AI SEO" with a real control group | No (data article, not a design reference) |

Note: this facet is evidence about discoverability, not visual craft, so most "live examples" here
are documentation/data sources rather than pages worth screen-capturing at 390/1440. Any visual
"answer-shaped hero" or "author-credibility panel" pattern should come from Pass-120's 14 references
or a fresh facet focused on layout, not from this facet's sources.

## Now overused

- **Unsourced "N million citations analyzed" statistics** from GEO/AEO marketing blogs (ZipTie.dev,
  authoritytech.io, sanbi.ai, readyt.ai, and similar) that state precise percentages with no visible
  sample, date range, or method. The genre itself has become a trend cliché: the more precise and
  dramatic the number ("44% of ChatGPT citations come from the first 30% of content") the less
  likely a disclosed method sits behind it. Treat every such figure as vendor-claim at best until
  traced to a company with real log or panel access (Ahrefs, SE Ranking, Semrush, Botify, Vercel).
- **"Add llms.txt" as a universal recommendation** — contradicted directly by Google (C2) and by a
  300K-domain study (C3); still the single most repeated tip across the GEO content genre in 2026.
- **FAQPage schema pitched as an "AI citation hack"** — Google killed the Search feature it was built
  for (C17) and no study shows AI assistants weighting it; still widely recommended by the same
  content genre as a leftover from the 2023–2024 FAQ-rich-result era.
- **Chasing JSON-LD depth (Person plus Organization plus ProfessionalService plus Article plus
  FAQPage plus Breadcrumb all at once)** as a checklist item — the only controlled study found (C10)
  shows no citation gain from adding schema to already-cited pages, and a separate direct-retrieval
  test (C9) shows most assistants ignore it entirely on live fetch.

## Costs and risks

- **Performance**: none of the plausible interventions here (server-rendered answer-shaped prose,
  visible dates, Person/Organization JSON-LD, robots.txt entries) add client-side JS or render cost.
  This is one of the few growth-oriented passes with near-zero Core Web Vitals risk, provided nothing
  is implemented as a client-rendered widget.
- **Accessibility**: question-form headings and self-contained-answer paragraphs are also good for
  screen-reader users and generally help, not hurt, accessibility. No conflict.
- **Honesty and fact-provenance**: "last updated" dates (C14) must be real dates tied to a real edit,
  never a cosmetic refresh to game freshness — this collides directly with the project's own
  fact-provenance rule and with Pitfall E2 (numbers must render from `content/citations.ts`, not be
  invented). A fake "updated" stamp is the kind of thing that gets caught and has to be walked back.
- **Which written site rule this would relax**: none of the site's motion/design/copy rules are
  implicated by this facet — llms.txt, robots.txt entries, JSON-LD, and visible dates are all
  additions, not changes to the one-signature-motion or one-accent rules. The one rule this facet
  puts pressure on is the "no dev-Twitter tell" list (no `/now`, `/uses`, colophon) — an AI-discovery
  push should not smuggle in a devtools-flavored `/llms` landing page or a visible "AI-readable"
  badge; keep any llms.txt file purely mechanical (served at the URL, unlinked from nav).
- **Scope risk**: this facet's highest-confidence, most consequential move (C20, off-site presence)
  is explicitly not a `/work` or study-page design change — folding it into this visual-craft pass
  would be scope creep.

## What this site could take

1. **AI discoverability plumbing (mechanical, do regardless of the visual brief)**: add explicit
   robots.txt allow rules for Claude-User, Claude-SearchBot, OAI-SearchBot, and PerplexityBot
   (independent of whatever is decided about ClaudeBot/GPTBot training crawlers), per C4–C6. Zero
   design surface, near-zero cost, directly serves the owner's stated goal of being recommended by
   Claude/ChatGPT/Perplexity.
2. **AI discoverability plumbing**: ship a minimal `llms.txt` at the root (site purpose, link to
   `/work` index, one line per case study) per the Vercel/Anthropic pattern (C4, live example table).
   Per C2/C3 this will not move Google, but it costs little and is read by at least some coding-agent
   and MCP tooling; do not build a visible "AI-friendly" landing page around it (costs/risks above).
3. **Study hero and featured-study entry**: open each case study's lede with one self-contained,
   plainly stated sentence that could stand alone as an answer to "what did Micah do for [client
   type]" — before any scene-setting language. This is the single most evidence-backed content move
   in this facet (C9, C15) and requires no new component, just a copy discipline close to the site's
   existing "hero states the offer in one sentence" rule.
4. **Study body exhibits**: keep every named number (the `$3M` in rfp-engine, `$14M` in guardicore,
   the ORDANI stats) as visible running prose pulled from `content/citations.ts`, never as text that
   only appears via client-side rendering or is stashed solely in JSON-LD — directly required by C8
   and C9 (crawlers don't execute JS; assistants ignore hidden markup on live fetch).
5. **Index entries and study body**: add a genuine, small "updated" marker only where a page was
   actually substantively edited (for example after a Pass-121 rewrite), sourced from a real edit
   date, not a cron-touched timestamp — per C14, with the honesty guardrail above.
6. **Motion vocabulary**: no motion change is indicated by this facet — none of the citation
   mechanisms here are visual. Flag explicitly so a later pass doesn't misattribute a design idea to
   this research.
7. **Entity and credibility hygiene**: add Person schema for Micah (name, jobTitle, worksFor or
   Organization, sameAs to his real LinkedIn) site-wide, and Organization/ProfessionalService schema
   for the consultancy — cheap, correct, low-confidence-but-plausible per C18; frame internally as
   hygiene, not as a proven citation lever, so it isn't oversold later.
8. **Off-site presence (name it, don't execute here)**: the strongest single factor this research
   turned up (C13, C19, C20) — Claude's apparent preference for owned/brand sites over user-generated
   content, and AI-referred traffic's outsized conversion rate — concerns presence off
   micahjonesconsulting.com (LinkedIn activity, interviews, directory listings under his real name).
   That is a distinct, non-visual work item outside this brief's scope; naming it here so it reaches
   the owner's queue rather than being silently dropped.

## Sources

- https://developers.google.com/search/docs/appearance/ai-features
- https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html
- https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/
- https://www.1clickreport.com/blog/llms-txt-evidence-2026
- https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- https://www.seroundtable.com/anthropic-updates-its-crawler-docs-40978.html
- https://developers.openai.com/api/docs/bots
- https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- https://www.fastly.com/blog/teach-your-robots-txt-a-new-trick-for-ai
- https://trakkr.ai/data/crawlers/google-extended
- https://vercel.com/blog/the-rise-of-the-ai-crawler
- https://www.botify.com/blog/openai-tripled-web-crawl
- https://thegeolab.net/json-ld-google-vs-perplexity-flat-text-rag/
- https://ahrefs.com/blog/schema-ai-citations/
- https://ahrefs.com/blog/ai-overview-citations-top-10/
- https://www.tryprofound.com/blog/ai-platform-citation-patterns
- https://wellows.com/blog/ai-citation-overlap-study/
- https://ziptie.dev/blog/why-reddit-dominates-chatgpt-perplexity-and-google-ai-overviews/
- https://sanbi.ai/blog/ai-engine-citation-trends-source-affinity-reddit
- https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/
- https://arxiv.org/abs/2605.14021
- https://arxiv.org/abs/2311.09735
- https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/
- https://searchengineland.com/faq-schema-rise-fall-seo-today-463993
- https://www.1digitalagency.com/glossary/entity-seo/
- https://mediaofficers.com/insights/knowledge-graph-seo-wikidata-entity-optimization
- https://www.semrush.com/blog/traffic-channel-mix-study/
- https://www.seerinteractive.com/insights/study-ai-brand-visibility-and-content-recency
- https://vercel.com/llms.txt
