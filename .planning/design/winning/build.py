"""Build the "Room and Ledger" page (v3): inline the artifacts AND the two clips as data URIs.

Usage:  python .planning/design/winning/build.py [out_path]
Reads   .planning/design/winning/room-and-ledger.template.html
Images  .planning/design/mock-assets/{cover,w1-diagnose,w2-build,w3-position}.jpg
Video   .planning/design/video/A2-hold.{webm,mp4} + A2-hold-720.mp4 + A2-poster-last.jpg
        .planning/design/video/B-loop.{webm,mp4}  + B-loop-720.mp4  + B-poster.jpg
Writes  out_path (default: the session scratchpad) -- the file the Artifact tool publishes.

v3 (brief SS13): the four book-page images are gone with the numbers section and the
record's artifacts; the rail's three panels now carry his own photographs. Clip A is the
regenerated A2 hold (forward once, no loop, the poster is the LAST frame). Each clip also
ships a 720 cut that is the only source below 900px.

Hard ceiling: 12MB (brief SS7).
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
    "IMG_cover":   (os.path.join(ASSETS, "cover.jpg"), "image/jpeg"),
    "IMG_w1":      (os.path.join(ASSETS, "w1-diagnose.jpg"), "image/jpeg"),
    "IMG_w2":      (os.path.join(ASSETS, "w2-build.jpg"), "image/jpeg"),
    "IMG_w3":      (os.path.join(ASSETS, "w3-position.jpg"), "image/jpeg"),
    "VID_Awebm":   (os.path.join(VIDEO, "A2-hold.webm"), "video/webm"),
    "VID_Amp4":    (os.path.join(VIDEO, "A2-hold.mp4"), "video/mp4"),
    "VID_A720":    (os.path.join(VIDEO, "A2-hold-720.mp4"), "video/mp4"),
    "VID_Aposter": (os.path.join(VIDEO, "A2-poster-last.jpg"), "image/jpeg"),
    "VID_Bwebm":   (os.path.join(VIDEO, "B-loop.webm"), "video/webm"),
    "VID_Bmp4":    (os.path.join(VIDEO, "B-loop.mp4"), "video/mp4"),
    "VID_B720":    (os.path.join(VIDEO, "B-loop-720.mp4"), "video/mp4"),
    "VID_Bposter": (os.path.join(VIDEO, "B-poster.jpg"), "image/jpeg"),
}


def data_uri(path, mime):
    with open(path, "rb") as fh:
        return "data:%s;base64,%s" % (mime, base64.b64encode(fh.read()).decode("ascii"))


def main(out):
    with open(TEMPLATE, encoding="utf-8") as fh:
        html = fh.read()

    missing = [k for k, (p, _) in PARTS.items() if not os.path.exists(p)]
    if missing:
        print("MISSING: %s" % ", ".join("%s -> %s" % (k, PARTS[k][0]) for k in missing))
        return 2

    for key, (path, mime) in sorted(PARTS.items()):
        token = "{{%s}}" % key
        n = html.count(token)
        if n == 0:
            print("WARN  %-12s unused in the template" % key)
            continue
        html = html.replace(token, data_uri(path, mime))
        print("%-12s %8d bytes source x%d  (%s)" % (key, os.path.getsize(path), n,
                                                    os.path.basename(path)))

    left = [t for t in ("{{" + k + "}}" for k in PARTS) if t in html]
    if "{{" in html:
        print("WARN  unresolved token(s) remain: %s" % left)

    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(html)

    size = os.path.getsize(out)
    print("\nOUT   %s" % out)
    print("SIZE  %d bytes (%.2f MB) -- ceiling %.0fMB -- %s"
          % (size, size / 1024 / 1024, LIMIT / 1024 / 1024,
             "OK" if size <= LIMIT else "OVER"))
    return 0 if size <= LIMIT else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_OUT))
