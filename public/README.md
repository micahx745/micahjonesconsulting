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
- **JPEG or PNG** — `portrait-context.jpg`, `.jpeg` or `.png` all work.
  `next/image` converts to AVIF/WebP per browser at request time.
- **Keep the SOURCE file under 500KB.** This is a convention, not an enforced
  gate: the `image-budget.sh` hook ships with the premium-web plugin, but this
  repo has no `.claude/settings.json` wiring it, so nothing fails a build if you
  exceed it. Check it yourself: `ls -la public/portrait-*`.
- 4:5 vertical is what the layout expects. Off-ratio files are cropped
  (`object-fit: cover`), never distorted.

After dropping a file in, verify it actually rendered rather than assuming:

```bash
pnpm build && pnpm start -p 3000
```

then prove the IMAGE ITSELF is servable — not merely that the markup appeared.
`existsSync` emits the `cw-portrait` markup for any file at that path, including
a corrupt or zero-byte one, so grepping for the class is a false green:

```bash
curl -s http://localhost:3000/about | grep -o '/_next/image?url=[^"&]*' | head -1
```

Take that path and confirm it returns 200 with an image content-type:

```bash
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" "http://localhost:3000/_next/image?url=%2Fportrait-context.jpg&w=640&q=75"
```
