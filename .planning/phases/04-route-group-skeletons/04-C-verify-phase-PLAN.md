# Plan 04-C: Phase 4 Verification

**Phase:** 04 Route-Group Skeletons
**Requirements:** All 4 REQ-IDs from Phase 4 (FOYER-01, THEATER-01, THEATER-02, THEATER-03) and all 5 ROADMAP Phase 4 success criteria.
**Depends on:** 04-A (foyer group + stub home) and 04-B (theater group + stub case-study + stub MDX) both merged.
**Status:** Ready
**Estimated LOC:** 1 new MD file (~80 lines).

---

## Goal

Run the verification battery for Phase 4 and write `04-VERIFY-OUTPUT.md` documenting whether the foyer↔theater cross-fade is **visually verified** in Chrome DevTools (preferred) or **code-verified** (fallback if MCP tools unavailable / dev server can't be driven programmatically in this environment).

This is the first phase where the blueprint's signature motion — the 600ms ease-in-out paper-to-obsidian dim — is actually testable end-to-end. Previous phases wired the CSS keyframes, the `<ViewTransition>` wrapper, and the chrome that should remain anchored; Phase 4 created the two routes with different `data-mode` values that the transition needs to act on.

---

## Verification Steps

### Step 1 — Static checks (always run)

```bash
cd /c/Users/micah/Code/micahjonesconsulting
pnpm typecheck
pnpm build
```

Expectations:
- `pnpm typecheck` exits 0 with no type errors.
- `pnpm build` exits 0 with:
  - `[copy-lint] ✓ Scanned project. Zero banned-word findings.`
  - Route manifest including `○ /` (static, foyer home) and `ƒ /work/[slug]` (dynamic, theater).
  - `✓ Compiled successfully` and `Finished TypeScript` lines.

### Step 2 — Dev runtime smoke test

```bash
pnpm dev
```

Open `http://localhost:3000/` in a browser. Expectations:
- Cream paper background (`#F5EFE4`).
- Foyer nav at top: `MICAH JONES` wordmark + 4 lowercase labels (`work · about · work with me · contact`) with copper underline at rest.
- Body shows `Foyer home (Phase 6 will replace).` and `→ test theater transition` as a link.
- Footer at bottom: `I read every message and reply inside two business days.` + `hello@micahjonesconsulting.com` (mailto).
- DOM inspection: `<body><div data-mode="foyer"><nav data-nav-root data-variant="foyer">...</nav><main>...</main><footer data-footer-root>...</footer></div></body>`.

Then navigate to `http://localhost:3000/work/test-slug`. Expectations:
- Obsidian background (`#0D0D0F`).
- Theater nav at top: `MICAH JONES` wordmark + `BACK TO FOYER ↗` link, both in copper.
- Body shows `Theater /work/test-slug (Phase 8 will replace).` + `← back to foyer` link.
- Footer has a `--rule-theater #2A2A30` top border (different from foyer's `--rule-foyer #D9D2C4`).
- DOM inspection: `<body><div data-mode="theater"><nav data-nav-root data-variant="theater">...</nav><main>...</main><footer data-footer-root>...</footer></div></body>`.

### Step 3 — View Transition recording (manual, via Chrome DevTools)

This is the **critical Phase 4 deliverable**. If the `chrome-devtools` MCP is available in this session, prefer driving it programmatically — otherwise document the manual steps so the operator can replay them in `04-VERIFY-OUTPUT.md`.

**Manual steps:**

1. Open `http://localhost:3000/` in Chrome.
2. Open DevTools → Performance panel.
3. Click the gear icon, ensure CPU throttling is OFF and Network is "No throttling" (we want the unmediated browser-native View Transition timing).
4. Press the record button.
5. Click `→ test theater transition`.
6. Wait ~1s for the cross-fade to complete.
7. Press stop.
8. Inspect the recording — look for the `View Transition` track lane. The entry should be ~600ms wide, labeled `cross-fade` or `view-transition`. The pseudo-element animations `::view-transition-old(root)` (fade-out) and `::view-transition-new(root)` (fade-in) should appear within that lane.
9. Confirm visually: during the recording, the cream paper smoothly dimmed to obsidian over ~600ms; the `<nav>` wordmark stayed anchored (didn't fade with the body); the resulting page is the theater stub.

10. Reset: click `← back to foyer` in the theater stub.
11. Repeat steps 3-9 for the reverse direction. Confirm the obsidian → cream cross-fade also fires at ~600ms with the nav anchored.

### Step 4 — Reduced-motion sanity check (manual)

1. Open Chrome DevTools → Rendering panel.
2. Set "Emulate CSS media feature prefers-reduced-motion" to `reduce`.
3. Click `→ test theater transition` again.
4. Expectation: the navigation appears instant (the `animation-duration: 0.001ms !important` from `app/globals.css` lines 146-153 neutralizes the cross-fade). The page swap is jarring by comparison — that's correct; reduced-motion users opted in to that.
5. Toggle the rendering setting back off.

### Step 5 — Chrome DevTools MCP (if available)

Check for the `mcp__chrome-devtools__*` tool family. If present:

1. `mcp__chrome-devtools__new_page` with `http://localhost:3000/`.
2. `mcp__chrome-devtools__take_screenshot` — confirm cream foyer.
3. `mcp__chrome-devtools__click` on the `→ test theater transition` link.
4. `mcp__chrome-devtools__wait_for` ~800ms (long enough to cover the 600ms transition).
5. `mcp__chrome-devtools__take_screenshot` — confirm obsidian theater.
6. `mcp__chrome-devtools__performance_start_trace`.
7. `mcp__chrome-devtools__click` on `← back to foyer`.
8. `mcp__chrome-devtools__wait_for` ~800ms.
9. `mcp__chrome-devtools__performance_stop_trace`.
10. Inspect the trace for `View Transition` entries; reference findings in `04-VERIFY-OUTPUT.md`.

If MCP tools are not available, label the visual verification MANUAL-PENDING and proceed with code-only verification for the phase verdict.

---

## Output Artifact: `04-VERIFY-OUTPUT.md`

The verify plan produces `.planning/phases/04-route-group-skeletons/04-VERIFY-OUTPUT.md` with:

- Frontmatter: `phase: 04-route-group-skeletons`, `verdict: PASS` (or `PARTIAL` if visual not feasible), `verified: 2026-05-14`.
- REQ-ID coverage table (FOYER-01, THEATER-01, THEATER-02, THEATER-03).
- ROADMAP success criteria table (all 5).
- Command transcripts for `pnpm typecheck` and `pnpm build`.
- Visual verification record (either MCP-driven screenshots + trace excerpt OR documented manual steps with a CODE-VERIFIED label).
- Hook pre-audit confirmation (copy-lint, font-license, motion-discipline, design-tokens, mdx-frontmatter, image-budget).
- Files touched in Phase 4.
- Forward references to Phase 5+.

---

## Acceptance Criteria

1. `pnpm typecheck` and `pnpm build` both exit 0 with clean output.
2. `pnpm dev` serves both `/` and `/work/test-slug` correctly, with the DOM tree shape and styling described above.
3. The visual cross-fade is either MCP-VERIFIED (screenshots + trace) or MANUAL-VERIFIED-LATER (documented commands the operator can replay) or CODE-VERIFIED-ONLY (build green, dev serves correctly, transition wiring confirmed via DOM inspection). The verdict line in `04-VERIFY-OUTPUT.md` reflects which level was achieved.
4. The verdict is PASS if static + dev runtime + at minimum CODE-VERIFIED-ONLY. Visual verification is the gold standard but its absence does not block Phase 5, per the orchestrator's stop-after-verify rule.

---

## Hook Safety Confirmation

| Hook | Status | Reason |
|---|---|---|
| `copy-lint.sh` | PASS | The verify output document is meta-documentation; the only banned-list check that applies is to verbatim Phase 4 code excerpts which are themselves already audited in 04-A and 04-B plans. |
| All others | N/A | Documentation-only plan; no source code changes. |

---

## Commit Message

```
docs(phase-4/04-C): phase verification log

Documents PASS verdict (or PARTIAL with reason) across:
- FOYER-01, THEATER-01, THEATER-02, THEATER-03
- All 5 ROADMAP Phase 4 success criteria
- pnpm typecheck + pnpm build command transcripts
- View Transition visual verification (MCP or manual)

Files: .planning/phases/04-route-group-skeletons/04-VERIFY-OUTPUT.md
```
