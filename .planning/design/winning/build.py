"""Build the "Room and Ledger" page: inline the six artifacts AND the two clips as data URIs.

Usage:  python .planning/design/winning/build.py [out_path]
Reads   .planning/design/winning/room-and-ledger.template.html
Images  .planning/design/mock-assets/{portrait,cover,rings,wallchart,card,opener02}.jpg
Video   .planning/design/video/{A,B}-loop.{webm,mp4} + {A,B}-poster.jpg
Writes  out_path (default: the session scratchpad) -- the file the Artifact tool publishes.

Derived from freight/build.py. The template stays readable and committed; the built file
carries ~6MB of base64 and is not. Hard ceiling: 12MB (brief SS7).
"""
import base64, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DESIGN = os.path.normpath(os.path.join(HERE, ".."))
ASSETS = os.path.join(DESIGN, "mock-assets")
VIDEO = os.path.join(DESIGN, "video")
TEMPLATE = os.path.join(HERE, "room-and-ledger.template.html")
DEFAULT_OUT = (r"C:\Users\micah\AppData\Local\Temp\claude\C--Users-micah-Code-micahjonesconsulting"
               r"\5e1d622c-a05a-43bd-9bbe-992aaaf6d702\scratchpad\room-and-ledger.html")

LIMIT = 12 * 1024 * 1024

# key -> (absolute path, mime)
PARTS = {
    "IMG_portrait":  (os.path.join(ASSETS, "portrait.jpg"), "image/jpeg"),
    "IMG_cover":     (os.path.join(ASSETS, "cover.jpg"), "image/jpeg"),
    "IMG_rings":     (os.path.join(ASSETS, "rings.jpg"), "image/jpeg"),
    "IMG_wallchart": (os.path.join(ASSETS, "wallchart.jpg"), "image/jpeg"),
    "IMG_card":      (os.path.join(ASSETS, "card.jpg"), "image/jpeg"),
    "IMG_opener":    (os.path.join(ASSETS, "opener02.jpg"), "image/jpeg"),
    "VID_Awebm":     (os.path.join(VIDEO, "A-loop.webm"), "video/webm"),
    "VID_Amp4":      (os.path.join(VIDEO, "A-loop.mp4"), "video/mp4"),
    "VID_Aposter":   (os.path.join(VIDEO, "A-poster.jpg"), "image/jpeg"),
    "VID_Bwebm":     (os.path.join(VIDEO, "B-loop.webm"), "video/webm"),
    "VID_Bmp4":      (os.path.join(VIDEO, "B-loop.mp4"), "video/mp4"),
    "VID_Bposter":   (os.path.join(VIDEO, "B-poster.jpg"), "image/jpeg"),
}


def main(out_path: str) -> None:
    html = open(TEMPLATE, encoding="utf-8").read()
    raw = 0
    unused = []
    for key, (path, mime) in PARTS.items():
        placeholder = "{{" + key + "}}"
        n = html.count(placeholder)
        if n == 0:
            unused.append(key)
            continue
        data = open(path, "rb").read()
        raw += len(data) * n
        uri = "data:" + mime + ";base64," + base64.b64encode(data).decode("ascii")
        html = html.replace(placeholder, uri)
        print(f"  {key:<14} {len(data)//1024:>6}KB raw  x{n}  <- {os.path.basename(path)}")
    for key in unused:
        print(f"  {key:<14} not referenced in the template; skipped", file=sys.stderr)
    if "{{" in html and ("{{IMG_" in html or "{{VID_" in html):
        raise SystemExit("unresolved placeholder remains in output")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    open(out_path, "w", encoding="utf-8", newline="\n").write(html)
    size = os.path.getsize(out_path)
    print(f"wrote {out_path}")
    print(f"total {size} bytes ({size/1024/1024:.2f}MB); media {raw//1024}KB raw; "
          f"limit {LIMIT//1024//1024}MB; headroom {(LIMIT - size)/1024/1024:.2f}MB")
    if size > LIMIT:
        raise SystemExit(f"FAIL: built file is {size} bytes, over the {LIMIT} byte ceiling")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_OUT)
