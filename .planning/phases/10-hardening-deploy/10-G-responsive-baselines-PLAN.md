# 10-G — Responsive baselines via Chrome DevTools MCP

**Covers:** RESP-01, RESP-02, RESP-03, RESP-04
**Depends on:** Wave 1 (10-A..E merged)
**Estimated effort:** 30 minutes
**Files touched:** 0 (visual baselines saved as PNGs only)

---

## Pre-flight

1. Wave 1 merged.
2. Dev server running on `http://localhost:3000`.
3. Chrome DevTools MCP available.

---

## Capture matrix

Three breakpoints × 9 routes = 27 screenshots.

| Viewport | Width × Height | Use |
|----------|---------------|-----|
| Mobile | 390 × 844 | iPhone 14 portrait |
| Tablet | 768 × 1024 | iPad portrait |
| Desktop | 1440 × 900 | Standard desktop |

Routes:
1. `/`
2. `/about`
3. `/work-with-me`
4. `/contact`
5. `/work`
6. `/work/ordani`
7. `/work/hr-equity-author`
8. `/work/passioneer`
9. `/work/akamai`

---

## Capture flow per route per viewport

Using Chrome DevTools MCP:

```
1. resize_page (width, height)
2. navigate_page (http://localhost:3000<route>)
3. wait_for (some completion signal — page idle)
4. take_screenshot (full page)
5. Save to .planning/phases/10-hardening-deploy/baselines/<viewport>/<route-slug>.png
```

Where `<route-slug>` = the route with `/` replaced by `_root_` or `_` (e.g., `_root_.png`, `_about.png`, `_work_ordani.png`).

---

## Acceptance checks per viewport

### 390 (mobile)
- No horizontal scroll on any route (check by scrolling left-right; nothing exposed past 390px).
- TitleCard reflows to 64px on case-study routes (Phase 5 contract).
- Foyer portrait crop tightens (object-fit: cover behavior).

### 768 (tablet)
- About page reflows from 8/4 columns to stacked.
- Other foyer routes remain readable; line lengths sensible.
- Theater case studies render cleanly.

### 1440 (desktop)
- Full 12-column grid renders.
- Foyer hero uses gutters per blueprint §4e (80px).
- TitleCard at 96px.

---

## Verification

1. All 27 PNGs captured and saved.
2. Manual visual inspection confirms acceptance criteria.
3. RESP-04 documented PASS in verify output.

If MCP doesn't expose responsive viewport emulation cleanly, fall back to setting CSS via Chrome DevTools `mcp__chrome-devtools__emulate` or `mcp__chrome-devtools__resize_page` with explicit width/height pairs.

---

## Rollback

No code changes. If a layout bug surfaces (e.g., horizontal scroll at 390), Phase 10 fixes are minimal CSS tweaks in `globals.css`.
