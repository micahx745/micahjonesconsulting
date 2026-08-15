# public/

Static assets served from the site root. Currently near-empty by design: the
site uses type, CSS and SVG rather than raster imagery, and the favicon lives
at `app/favicon.ico` (Next's App Router file convention), not here.

## Dropping in the portraits

`components/PortraitImage.tsx` looks for these exact filenames at build time
and renders nothing until one exists. No code change is needed — drop the file,
build, ship.

| File | Where it appears | Ratio | Notes |
|---|---|---|---|
| `portrait-context.jpg` | `/about`, right column of the intro | 4:5 vertical | Wired today. Its arrival is what turns the intro into two columns. |
| `portrait-main.jpg` | reserved — not mounted on any page yet | 4:5 vertical | Mount it where you want it before dropping this one in. |

Constraints:

- **2x retina source.** 900x1125 or larger for `context`; 1200x1500 for `main`.
- **JPEG or PNG.** `next/image` converts to AVIF/WebP per browser at request time.
- **500KB max** — enforced by the harness `image-budget.sh` at the write boundary.
- 4:5 vertical is what the layout expects. Off-ratio files are cropped
  (`object-fit: cover`), never distorted.

After dropping a file in, verify it actually rendered rather than assuming:

```bash
pnpm build && pnpm start -p 3000
```

then check the page serves the image (not nothing):

```bash
curl -s http://localhost:3000/about | grep -c "cw-portrait"
```
