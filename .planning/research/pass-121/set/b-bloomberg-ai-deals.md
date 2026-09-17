# b-bloomberg-ai-deals

Status: DEAD. Both the primary and the permitted fallback are unreachable through the tools this
leg has. No third URL was substituted, per the liveness rule.

## Primary: https://www.bloomberg.com/graphics/2026-ai-circular-deals/

- Captured 2026-09-17. `ref-capture121.mjs` ran clean (exit 0) at both viewports; the raw fetch
  and the Chrome-driven load both returned HTTP 403.
- The rendered page at both 390 and 1440 is not the article. It is Bloomberg's bot-detection
  interstitial: "We've detected unusual activity from your computer network," a "PRESS & HOLD"
  challenge control, and a block reference ID (`9e7fba5b-b2aa-11f1-b2af-02101710edb1`). See
  `b-bloomberg-ai-deals-1440-fold.png` and `b-bloomberg-ai-deals-390-fold.png`.
- Raw HTML (`_raw/b-bloomberg-ai-deals.html`, 13,856 bytes, status 403) is the same interstitial,
  not the graphic.
- This is a bot/CAPTCHA wall, not a soft paywall the protocol's "capture what renders" instruction
  covers (that instruction anticipates a paywall over real content, not a 403 challenge page with
  no article DOM at all). Completing a press-and-hold challenge is bot-detection bypass, which is
  out of bounds for this leg. Per the liveness rule, HTTP 403 is non-200 and triggers the fallback.

## Fallback: the Reuters graphic on AI circular deals, Jan 2026

Could not be located or reached with the tools and the one-search allowance this leg has.

- `WebSearch` (the closest equivalent to "one search on reuters.com/graphics" available here,
  since direct navigation to reuters.com is blocked by this session's browsing policy) was run
  several times with increasingly specific terms (`site:reuters.com/graphics AI circular deals`;
  `Reuters graphics AI circular deals interactive January 2026`; a search on the Reuters
  journalists' names surfaced by an intermediate result, Vineet Khare and Mayank Bhatt; a search
  on a quoted phrase attributed to the piece). None returned a `reuters.com/graphics/...` URL for
  this story. The closest hit, a Global Investigative Journalism Network writeup describing the
  Reuters piece (`https://gijn.org/stories/reuters-data-visualization-graphics-ai-economy/`),
  itself returned HTTP 403 to `WebFetch`, so the exact URL could not be confirmed from its text
  either.
- Direct probes on reuters.com confirm it is not reachable without an account from this
  environment: `curl -s -o /dev/null -w '%{http_code}'` on `https://www.reuters.com/site-search/`
  returned `401` (login wall). `https://www.reuters.com/graphics/` itself returned `200` but is a
  client-rendered shell with no server-side links (`grep -io 'href="/graphics/[^"]*"'` on the
  fetched HTML found exactly one match, the index page's own self-link); browser navigation to
  `reuters.com` was denied by this session's browsing policy, so the SPA could not be rendered to
  find the story link that way either.
- mcp__Claude_Browser__navigate to `https://www.reuters.com/graphics/` returned "navigation to
  https://reuters.com was denied or failed."

## Evidence files

- `b-bloomberg-ai-deals-1440.png`, `b-bloomberg-ai-deals-1440-fold.png`,
  `b-bloomberg-ai-deals-1440-fold-early.png`, `b-bloomberg-ai-deals-390.png`,
  `b-bloomberg-ai-deals-390-fold.png`, `b-bloomberg-ai-deals-390-fold-early.png` (all show the
  Bloomberg bot-block page, not the graphic).
- `b-bloomberg-ai-deals-capture.json` (status 403 at both viewports, `hover.selector: "none
  found"`, `h1: null`, `pageHeight` values are the interstitial's, not the article's).
- `_raw/b-bloomberg-ai-deals.html` (403, the interstitial's markup).

No `<slug>-1440-hover.png` exists: the hover step found no matching selector on the interstitial
page, consistent with there being no article content to hover.

## Closing line

Mechanism to take (q8): n/a, no content reached.
Rule touched (q10): n/a.
