"""Build the Freight page: inline the six downsampled artifacts as data URIs.

Usage:  python .planning/design/freight/build.py [out_path]
Reads   .planning/design/freight/the-receipts.template.html
Images  .planning/design/mock-assets/{portrait,cover,rings,wallchart,card,opener02}.jpg
Writes  out_path (default: the session scratchpad) -- the file the Artifact tool publishes.
The template stays readable and committed; the built file carries ~300KB of base64 and is not.
"""
import base64, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.normpath(os.path.join(HERE, "..", "mock-assets"))
TEMPLATE = os.path.join(HERE, "the-receipts.template.html")
DEFAULT_OUT = (r"C:\Users\micah\AppData\Local\Temp\claude\C--Users-micah-Code-micahjonesconsulting"
               r"\5e1d622c-a05a-43bd-9bbe-992aaaf6d702\scratchpad\the-receipts.html")

IMAGES = {
    "IMG_portrait": "portrait.jpg",
    "IMG_cover": "cover.jpg",
    "IMG_rings": "rings.jpg",
    "IMG_wallchart": "wallchart.jpg",
    "IMG_card": "card.jpg",
    "IMG_opener": "opener02.jpg",
}

def main(out_path: str) -> None:
    html = open(TEMPLATE, encoding="utf-8").read()
    total = 0
    for key, name in IMAGES.items():
        path = os.path.join(ASSETS, name)
        data = open(path, "rb").read()
        total += len(data)
        uri = "data:image/jpeg;base64," + base64.b64encode(data).decode("ascii")
        placeholder = "{{" + key + "}}"
        n = html.count(placeholder)
        if n == 0:
            print(f"warning: {placeholder} not referenced in template", file=sys.stderr)
        html = html.replace(placeholder, uri)
    leftover = [tok for tok in ("{{IMG_",) if tok in html]
    if leftover:
        raise SystemExit("unresolved image placeholder remains in output")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    open(out_path, "w", encoding="utf-8", newline="\n").write(html)
    print(f"wrote {out_path}  ({os.path.getsize(out_path)//1024}KB; images {total//1024}KB raw)")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_OUT)
