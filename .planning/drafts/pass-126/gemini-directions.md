Here are two distinct design directions for the "How I work." section.

---

## Direction 1: The Focused Unfold

1.  **Idea:** A sticky section where each step's full narrative unfolds, one at a time, to create a focused, sequential reading experience.
2.  **Why it's a sequence:** By making the section sticky and revealing each step individually upon scroll, the user is actively guided through Micah's process, mirroring the experience of living through the work stages. This borrows from `unseen.co`'s type-led pacing and `linear.app`'s print-like discipline, making each segment feel like a distinct chapter.
3.  **Layout:**
    *   **Ground:** Espresso #2a1f18.
    *   **1440px:** The "How I work." heading (Bricolage Grotesque, uppercase, weight 700, clamp(8rem, 10vw, 12rem), cream #F5EFE4) sits at the top of the section. Below it, a central content area (max-width: 900px, centered horizontally). Within this area, each step's content (label, headline, body) fills the space.
        *   **Label:** JetBrains Mono, 18px, uppercase, copper #bd5a2d, above headline.
        *   **Headline:** Bricolage Grotesque, clamp(3rem, 5vw, 5rem), weight 600, uppercase, cream #F5EFE4.
        *   **Body:** Hanken Grotesk, 20px, line-height 1.6, cream #F5EFE4. The body text flows across the full 900px width.
    *   **390px:** "How I work." (Bricolage Grotesque, clamp(3rem, 10vw, 4rem), cream) remains at the top. The content area fills the screen width.
        *   **Label:** JetBrains Mono, 16px, copper.
        *   **Headline:** Bricolage Grotesque, clamp(2rem, 6vw, 2.5rem), cream.
        *   **Body:** Hanken Grotesk, 18px, cream, full width.
    *   The "See the work" link (Hanken Grotesk, 18px, copper #bd5a2d) appears at the bottom, after the final step.
4.  **Motion:** The entire section containing "How I work." and the steps becomes `position: sticky`. As the user scrolls, each of the four steps' content (label, headline, body) fades in and slides slightly up (`transform: translateY(10px)` to `translateY(0)`) to replace the previous step. Each transition lasts 700ms, driven by CSS `animation-timeline: view()`. The reduced-motion and no-JS frame displays all four steps stacked vertically, fully visible, with a single, quick fade-in on load. CLS is avoided by setting a `min-height` for the sticky container upfront and using `position: absolute` or `transform` for transitions, preventing layout shifts.
5.  **Light-ground variant:** On bone #ECE3D0, headlines and body text switch to espresso #2a1f18. Copper #bd5a2d remains the accent for labels and the link.
6.  **Risk & Avoidance:** Risk: Transitions feel slow or block content reading. Avoidance: Focus on subtle, fast `opacity` and `transform` animations rather than complex scaling or repositioning. Ensure the new content is visible instantly once the old content starts to fade, maintaining reading flow.

---

## Direction 2: The Emphasized Progression

1.  **Idea:** A dynamic layout where the active step expands to dominate the screen, while other steps are visible but recede, visually emphasizing progression.
2.  **Why it's a sequence:** This direction breaks the "identical blocks" problem by making each step visually distinct and primary when it's active. The resizing and repositioning of elements clearly differentiates the active phase from the passive ones, like a stage play's spotlight. This borrows from `uncommonstudio.com.au`'s grid that breaks at the right moment, and `basement.studio`'s massive display type for impact.
3.  **Layout:**
    *   **Ground:** Espresso #2a1f18.
    *   **1440px:** "How I work." (Bricolage Grotesque, uppercase, weight 700, clamp(8rem, 10vw, 12rem), cream #F5EFE4) is fixed at the top of the screen. Below it, the four steps are initially presented in a loose, vertical stack occupying the left ~60% of the screen.
        *   **Active Step:** Expands to fill the main screen area (e.g., 80% width). Its **Label** (JetBrains Mono, 20px, copper #bd5a2d) is prominent. Its **Headline** (Bricolage Grotesque, clamp(6rem, 10vw, 12rem), weight 700, uppercase, cream #F5EFE4) becomes massive and fills most of the horizontal space. Its **Body** (Hanken Grotesk, 22px, cream #F5EFE4) is clearly readable, aligned below the headline.
        *   **Inactive Steps:** Shrink significantly (e.g., 20% width), stack vertically on the right side of the screen, with reduced opacity (e.g., 0.3). They display only their **Label** (JetBrains Mono, 14px, copper) and **Headline** (Bricolage Grotesque, 20px, cream), remaining fully legible but secondary.
    *   **390px:** "How I work." (Bricolage Grotesque, clamp(3rem, 10vw, 4rem), cream). The steps are always vertically stacked.
        *   **Active Step:** Fills the full screen width. **Label** (JetBrains Mono, 16px, copper), **Headline** (Bricolage Grotesque, clamp(2.5rem, 8vw, 3rem), cream), **Body** (Hanken Grotesk, 18px, cream) are all prominent and legible.
        *   **Inactive Steps:** Slide below the active step, taking up minimal vertical space, showing only their **Label** and **Headline** (Bricolage Grotesque, 18px, cream), with reduced opacity, but still fully readable if user scrolls further.
    *   The "See the work" link (Hanken Grotesk, 18px, copper #bd5a2d) appears after the final step.
4.  **Motion:** The section containing the steps becomes `position: sticky`. As the user scrolls, each step's content block scales up (`transform: scale()`) and repositions (`transform: translate()`) into the prominent "active" state, while other steps scale down and reposition to the side. Headlines dramatically scale their font-size or use `transform: scale()` for kinetic effect. Transitions are smooth 600ms `ease-in-out` using CSS `animation-timeline: view()`. The reduced-motion and no-JS frame displays all four steps vertically stacked, full size and full opacity, with the "How I work." heading at the top. CLS is controlled by pre-defining the sticky section's height and exclusively using `transform` properties for all resizing and repositioning, ensuring no layout reflows occur.
5.  **Light-ground variant:** On cream #F5EFE4. "How I work.", active step headlines, and active body text are espresso #2a1f18. Inactive step elements use a lighter version of espresso or bone #ECE3D0 with reduced opacity. Copper #bd5a2d remains the accent.
6.  **Risk & Avoidance:** Risk: Inactive steps become unreadable or disappear entirely. Avoidance: Ensure inactive elements, though smaller and subdued, maintain clear legibility, showing at least the label and headline without truncation, and are always visible on screen (even if small) so the user understands the full scope.