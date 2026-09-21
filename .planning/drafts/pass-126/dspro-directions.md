## Direction 1: Annotated Ledger

**1. Name and idea.** A single editorial ledger with a sticky left rail, where the four steps are asymmetrical entries and only the active entry carries full copper.

**2. Why it reads as a sequence.** Each step changes indentation, measure, headline scale and rule length, so the buyer feels priorities and decisions moving forward rather than reading repeated spec rows. Borrows by-kin.com’s restraint, uncommonstudio.com.au’s grid that breaks at the right moment, and aristidebenoist.com’s expensive type pacing.

**3. Layout at 1440 and 390.**  
At 1440: espresso ground #2a1f18, 12-column grid. Sticky left 3-col rail holds “How I work.” in Bricolage 48px/600 cream. The entries are unequal: Scope — mono label 12px copper, headline Bricolage clamp(56px,7vw,88px)/500, body Hanken 20px cream max 420. Plan — offset 2 cols, headline 64px/300, body 18px max 380. Build — flush right, headline 72px/650, body 18px max 400. Stay — offset 4 cols, headline 56px/400, body 20px max 420, then “See the work” in JetBrains Mono 13px copper after the body. Hairlines appear only above labels, varying from 1–6 cols; the active rule is copper, resting rules cream at 25%. Vertical spacing alternates 120–180px.  
At 390: cream text on espresso, heading sticky top 40px/600. Steps stack with alternating indents; headlines clamp(30px,9vw,44px), body 16px, labels 11px, link after Step 4.

**4. Motion.** CSS scroll-driven: each headline clip-reveals from bottom over 600ms, the body translates up 12px, and the copper rule scales in from the left. The left rail holds through the section. Reduced/no-JS gets the finished static frame. CLS plan: reserve rail height; animate only transforms/opacity, never width or position.

**5. /services light-ground variant.** On bone or cream, use ink text, copper-deep small body/rule and the same asymmetric offsets; the sticky rail becomes a top editorial slug. It replaces the bulleted list without becoming cards.

**6. Risk.** The owner could reject it as “still a list.” Avoid that by never repeating the same column, scale or rule length; the moving copper marker and shifting measure make each commitment feel distinct.

## Direction 2: Four Sign-offs

**1. Name and idea.** A held, full-viewport sequence of four typographic “sign-off” plates, where scroll swaps one poster-like plate for the next while the section pins.

**2. Why it reads as a sequence.** The buyer sees scope, plan, build and stay as distinct decisions being declared, revised, then handed over — not four equal rows. Borrows obys.agency’s static poster frames, matvoyce.tv’s kinetic type that never blocks reading, and basement.studio’s massive tight display.

**3. Layout at 1440 and 390.**  
At 1440: section reserves 400vh; inner sticky frame is 100vh on espresso #2a1f18. “How I work.” stays fixed top-left in Bricolage 40px/600 cream. Four absolute plates, no boxes: Scope — label mono 12px copper col 2, headline clamp(56px,8vw,104px)/750 left, body Hanken 20px cream max 380 col 8. Plan — label centered, headline 88px/280 centered, body 18px max 400 centered. Build — label right, headline 80px/700 right, body 18px max 400 col 3. Stay — label left, headline 72px/400, body 20px max 420 col 6, link “See the work” mono 13px copper after body. Type line-height .9.  
At 390: same pinned stack, espresso ground. Heading sticky/fixed top-left 32px/600. Each plate uses label 11px copper, headline clamp(32px,10vw,44px), body 16px max 330; Step 4 ends with the link. Plates sit top, middle or bottom so all four are readable.

**4. Motion.** Scroll progress swaps plates: the outgoing plate translates up 24px and drops to 20% opacity over 500ms; the incoming plate clip-reveals from bottom 650ms; Bricolage optical-size axis shifts with scale. Reduced/no-JS gets four static stacked plates without pinning. CLS plan: reserve 400vh up front; absolute plates inside the sticky frame; animate transforms/opacity only.

**5. /services light-ground variant.** On bone, the same held plates use ink text, copper-deep body and copper labels/rules. It reads as a contract clause sequence instead of a bulleted list.

**6. Risk.** The owner might see full-screen plates as equal cards. Avoid by changing alignment, scale, weight and vertical placement per plate, with no borders or card backgrounds; only the pinned heading repeats.