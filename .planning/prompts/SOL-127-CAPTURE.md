# Sol task: capture the five door mocks and the live "before". Mechanical. ASCII source only.

Work in `.planning/mocks/pass-127/doors/` (this worktree). Mocks: `mocks/A.html` ... `mocks/E.html`.
Write `capture-127.mjs` (Node) modeled on `.planning/qa/pass-126/region-sheet.mjs` for the browser setup
(puppeteer-core via `createRequire("C:/tmp/p101tools/package.json")`, Chrome at
"C:/Program Files/Google/Chrome/Application/chrome.exe", headless). Write PNGs into `shots/`.

For each mock (open it as a file:/// URL) at two viewports, 390x844 and 1440x900, deviceScaleFactor 1:
1. Wait for `document.fonts.ready`, then 600ms. LIVENESS: require `getComputedStyle(document.body).fontFamily` to be
   non-empty and at least one element whose computed font-family contains "Bricolage"; else print
   `LIVENESS FAIL <mock> <w>` and skip that capture.
2. `shots/<K>-<w>-full.png`: a full-page screenshot.
3. `shots/<K>-<w>-scroll.png`: THREE viewport frames composed side by side (like region-sheet.mjs): scroll so the
   band's top is at 100% of the viewport height (just entering), at 50%, and at 0% (band top at viewport top). 700ms
   settle each. Label each frame with its position.
4. `shots/<K>-390-reduced.png`: at 390 only, with `page.emulateMediaFeatures([{name:"prefers-reduced-motion",
   value:"reduce"}])`, a full-page screenshot.
Then the live "before": `https://www.micahjonesconsulting.com/` at both viewports: scroll `#doors` into view (its top
at 0), wait 1500ms, and screenshot the region from 72px above `#doors` to 120px below its bottom as
`shots/BEFORE-<w>.png`.
Finally `shots/INDEX.md`: one line per PNG with its size in bytes.

Run it once: `node .planning/mocks/pass-127/doors/capture-127.mjs`. Report the console output and INDEX.md verbatim.
Do not edit the mocks or any other file. No git, no bash (the sandbox cannot run it). Never call a failure expected.
