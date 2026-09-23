# Kickoff: the home page's purchase links, gamified, and the Audit block cut down (written 2026-09-23)

His words, verbatim, 2026-09-23, answering the line-5 fine-print popup: "I want you to really gamify the purchasable
links on the home page. ITs a good point for this fine print but in reality the audit package on the homepage
already had too many words - needs to be shaved down a bit but still be enticing for a person to want to purchase
and/orinvestigate more on our services". Ledgered in LESSONS #3 ("THE HOME PURCHASE LINKS, GAMIFIED").

This is a DESIGN arc for a fresh chat in `p106-live` (Opus 5.5). Boot per `.claude/RESUME.md`; budget first.

## Diagnosis (live www, 2026-09-23)
- The Audit box is 139 words: "Start here / The Audit / $2,500 / Two weeks, starts within the week / I go through your
  build, your production, or your positioning top to bottom." Four deliverables (the 8-10 page memo; the
  prioritized fix sequence; the one-hour debrief, "You keep the memo either way."; the kickoff email). "Covers one
  area: AI engineering, product building, or positioning and GTM. You pick it at checkout." The "Buy the Audit"
  button (a checkout button, not a link). Then the 35-word rules paragraph.
- Purchase paths on home: "Start the Audit" (hero, to #offer); "Book a free intro call" (hero, /call); "See the
  three packages" (the teal door, /packages); the terracotta door itself (/services); "Buy the Audit" (checkout);
  "See all three packages" (under the Audit, /services#packages); "Name the problem" (closing, /call).
- Inconsistency: two "packages" links go to two different places (/packages and /services#packages). Settle it.

## Already ruled that this arc must carry (LESSONS #3, 2026-09-22 night)
Packages goes into the nav (second item). Line 1A (home, under the hero): "The demo took a weekend in Lovable or
Replit. The last 20% is eating your month." Line 2A (/packages intro): "For solo builders and small teams who got
most of a product out of Lovable, Claude Code, or Replit and stalled on the last stretch." Line 4A (home meta
description): "AI product stalled on sign-in, deploys, or sales? I get it launched. Four exits behind my work, $5B+
combined. $20M+ in revenue behind my work." Line 5 (the fine print) is now part of this arc. Ask him by popup
whether these ship first on their own or together with this arc.

## Constraints (not on trial)
The existing theme (Color Worlds, cream/ink/copper, Bricolage, Hanken, Mono labels). The Pass-122 motion rules:
type and numbers may move with the scroll; banned are cursor followers, scroll that changes speed, marquees and
idle loops; reduced motion gets the finished frame. One accent per screen, no gradients, purple or glow; no icons,
stock, AI illustration or 3D. The doors stay "No cards, no borders" (`globals.css:1922-1925`). Lenis stays. Copy:
the LESSONS #3 ledger, the banned list, first person, one em-dash per page at most; all terms of the rules stay true.

## How (memory `opus-designs-from-product-material`, `copy-drafts-opus-not-gemini`)
Diagnose first, then Opus 5.5 designs two or three directions from the product's own material (the Audit's real
deliverables, the three prices, the area picker that PackageBand already has, the credit rule) and renders mocks at
390 and 1440, plus a short clip when a mechanic moves. His eyes pick by popup. Copy cuts are drafted by Opus 5.5,
checked against the ledger. The build brief then goes to an Opus 5.5 subagent (interaction logic is
judgment-bearing), the checkpoint reads run (Fable, Astra, deepseek-v4-pro: DeepSeek is out of credit, so report
it dead), and nothing ships without his push words.
