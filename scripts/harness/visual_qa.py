"""C3.1: the mechanical half of visual QA, off every model.

Harness v2 run E, written from .claude/briefs/harness-v2-e-visualqa-fablegate.md. Python 3.14
with PIL and numpy, stdlib otherwise. Turns a directory of PNG captures (plus optional axe,
Lighthouse and overflow JSON) into PASS/CHANGED/FAIL lines, one downscaled contact sheet, and
an E3-schema digest.json. Only the sheet is meant to reach a model.

Three modes:
  visual_qa.py --captures DIR --out DIR [--baseline DIR] [--axe-json F] [--lighthouse-json F]
               [--overflow-json F]
  visual_qa.py --sheet DIR --out DIR          (the contact sheet only, no checks, no digest)
  visual_qa.py --selftest
"""

import argparse
import json
import math
import os
import shutil
import sys
import tempfile

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))

sys.path.insert(0, HERE)
import digest_check  # noqa: E402

THUMB_W = 360
MAX_THUMB_H = 640
LABEL_H = 24
COLS_MAX = 4
LONG_EDGE_MAX = 2576
TOKENS_MAX = 4784
BLANK_STD = 2.0
DRIFT_CHANNEL_THRESHOLD = 16
DRIFT_RATIO_THRESHOLD = 0.005
LIGHTHOUSE_MIN = 0.95


# --- small helpers -------------------------------------------------------------------------

def list_pngs(dirpath):
    if not dirpath or not os.path.isdir(dirpath):
        return []
    return sorted(f for f in os.listdir(dirpath) if f.lower().endswith(".png"))


def load_json(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def compute_blank(img):
    gray = np.asarray(img.convert("L"), dtype=np.float64)
    std = float(gray.std())
    return std, std < BLANK_STD


def compute_drift(cap_img, base_img):
    cap_rgb = cap_img.convert("RGB")
    base_rgb = base_img.convert("RGB")
    size_changed = False
    if cap_rgb.size != base_rgb.size:
        cap_rgb = cap_rgb.resize(base_rgb.size, Image.LANCZOS)
        size_changed = True
    a = np.asarray(cap_rgb, dtype=np.int16)
    b = np.asarray(base_rgb, dtype=np.int16)
    diff = np.abs(a - b).max(axis=2)
    total = int(diff.size)
    changed = int((diff > DRIFT_CHANNEL_THRESHOLD).sum())
    ratio = (changed / total) if total else 0.0
    return ratio, size_changed


def count_serious_critical(node):
    """Walks an arbitrary JSON tree; every dict with impact serious/critical counts once."""
    count = 0
    if isinstance(node, dict):
        if node.get("impact") in ("serious", "critical"):
            count += 1
        for v in node.values():
            count += count_serious_critical(v)
    elif isinstance(node, list):
        for item in node:
            count += count_serious_critical(item)
    return count


# --- contact sheet ---------------------------------------------------------------------------

def build_sheet(image_paths):
    thumbs = []
    for p in image_paths:
        im = Image.open(p).convert("RGB")
        w, h = im.size
        new_h = max(1, round(h * THUMB_W / w))
        thumb = im.resize((THUMB_W, new_h), Image.LANCZOS)
        if new_h > MAX_THUMB_H:
            thumb = thumb.crop((0, 0, THUMB_W, MAX_THUMB_H))
        thumbs.append((os.path.basename(p), thumb))

    if not thumbs:
        return Image.new("RGB", (THUMB_W, LABEL_H), "white")

    cell_h = max(t.size[1] for _, t in thumbs)
    cols = min(COLS_MAX, len(thumbs))
    rows = math.ceil(len(thumbs) / cols)
    sheet_w = cols * THUMB_W
    sheet_h = rows * (cell_h + LABEL_H)
    sheet = Image.new("RGB", (sheet_w, sheet_h), "white")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for i, (name, thumb) in enumerate(thumbs):
        col = i % cols
        row = i // cols
        x = col * THUMB_W
        y = row * (cell_h + LABEL_H)
        sheet.paste(thumb, (x, y))
        draw.text((x + 4, y + cell_h + 4), name, fill=(0, 0, 0), font=font)

    # Scale the whole assembled sheet down (never the individual thumbnails) until both the
    # long-edge and visual-token budgets hold.
    w, h = sheet.size
    scale = 1.0
    if max(w, h) > LONG_EDGE_MAX:
        scale = LONG_EDGE_MAX / float(max(w, h))

    def tokens_for(s):
        nw = max(1, round(w * s))
        nh = max(1, round(h * s))
        return math.ceil(nw / 28) * math.ceil(nh / 28), nw, nh

    tokens, nw, nh = tokens_for(scale)
    guard = 0
    while tokens > TOKENS_MAX and guard < 400:
        scale *= 0.95
        tokens, nw, nh = tokens_for(scale)
        guard += 1

    if scale < 1.0:
        sheet = sheet.resize((nw, nh), Image.LANCZOS)
    return sheet


def sheet_visual_tokens(sheet):
    w, h = sheet.size
    return math.ceil(w / 28) * math.ceil(h / 28)


# --- analysis (shared by --captures and --selftest) ------------------------------------------

def analyze_captures(captures_dir, baseline_dir, axe_path, lighthouse_path, overflow_path):
    """Returns (names, results). results is a list of dicts:

    {"name", "status" (PASS|CHANGED|FAIL), "detail", "claim", "evidence"}. claim/evidence are
    only set (non-empty) for FAIL/CHANGED entries: those are exactly the entries that belong in
    the digest's items list.
    """
    names = list_pngs(captures_dir)
    results = []

    overflow_data = load_json(overflow_path) if overflow_path else None
    overflow_by_name = {}
    if isinstance(overflow_data, list):
        for e in overflow_data:
            if isinstance(e, dict) and isinstance(e.get("name"), str):
                overflow_by_name[e["name"]] = e

    for name in names:
        path = os.path.join(captures_dir, name)
        im = Image.open(path)
        std, is_blank = compute_blank(im)
        stem = os.path.splitext(name)[0]

        if is_blank:
            status = "FAIL"
            detail = "blank frame (std {0:.2f})".format(std)
            claim = "{0} is a blank frame".format(name)
            evidence = "$ visual_qa.py blank-check {0} -> std {1:.2f} < {2}".format(
                name, std, BLANK_STD)
        else:
            status, detail, claim, evidence = "PASS", "", "", ""
            if baseline_dir:
                base_path = os.path.join(baseline_dir, name)
                if os.path.isfile(base_path):
                    base_im = Image.open(base_path)
                    ratio, size_changed = compute_drift(im, base_im)
                    pct = ratio * 100.0
                    note = ", size changed" if size_changed else ""
                    if ratio > DRIFT_RATIO_THRESHOLD:
                        status = "CHANGED"
                        detail = "drift {0:.2f}%{1}".format(pct, note)
                        claim = "{0} drifted {1:.2f}% from its baseline{2}".format(
                            name, pct, " (size changed)" if size_changed else "")
                        evidence = (
                            "$ visual_qa.py drift-check {0} -> {1:.2f}% changed pixels > "
                            "{2:.2f}%".format(name, pct, DRIFT_RATIO_THRESHOLD * 100.0))
                    else:
                        detail = "same (drift {0:.2f}%{1})".format(pct, note)

            if stem in overflow_by_name:
                entry = overflow_by_name.pop(stem)
                sw, cw = entry.get("scrollWidth"), entry.get("clientWidth")
                if isinstance(sw, (int, float)) and isinstance(cw, (int, float)) and sw > cw + 1:
                    status = "FAIL"
                    detail = "horizontal overflow (scrollWidth {0} > clientWidth {1})".format(sw, cw)
                    claim = "{0} has horizontal overflow (scrollWidth {1} > clientWidth {2})".format(
                        name, sw, cw)
                    evidence = "$ visual_qa.py overflow-check {0} -> scrollWidth {1} > clientWidth {2}+1".format(
                        name, sw, cw)

        results.append({"name": name, "status": status, "detail": detail,
                         "claim": claim, "evidence": evidence})

    # overflow entries with no matching capture name: still report a FAIL if they fail.
    for nm, entry in sorted(overflow_by_name.items()):
        sw, cw = entry.get("scrollWidth"), entry.get("clientWidth")
        if isinstance(sw, (int, float)) and isinstance(cw, (int, float)) and sw > cw + 1:
            results.append({
                "name": nm, "status": "FAIL",
                "detail": "horizontal overflow (scrollWidth {0} > clientWidth {1})".format(sw, cw),
                "claim": "{0} has horizontal overflow (scrollWidth {1} > clientWidth {2})".format(
                    nm, sw, cw),
                "evidence": "$ visual_qa.py overflow-check {0} -> scrollWidth {1} > clientWidth {2}+1".format(
                    nm, sw, cw),
            })

    if axe_path:
        n = count_serious_critical(load_json(axe_path))
        if n > 0:
            results.append({
                "name": "axe", "status": "FAIL",
                "detail": "{0} serious/critical violation(s)".format(n),
                "claim": "axe found {0} serious/critical violation(s)".format(n),
                "evidence": "$ visual_qa.py axe-check {0} -> {1} serious/critical".format(axe_path, n),
            })
        else:
            results.append({"name": "axe", "status": "PASS",
                             "detail": "0 serious/critical violations", "claim": "", "evidence": ""})

    if lighthouse_path:
        data = load_json(lighthouse_path)
        score = None
        if isinstance(data, dict):
            try:
                score = data["categories"]["performance"]["score"]
            except (KeyError, TypeError):
                score = None
        if not isinstance(score, (int, float)):
            results.append({
                "name": "lighthouse", "status": "FAIL",
                "detail": "no categories.performance.score found",
                "claim": "lighthouse JSON has no categories.performance.score",
                "evidence": "$ visual_qa.py lighthouse-check {0} -> no score found".format(lighthouse_path),
            })
        elif score < LIGHTHOUSE_MIN:
            results.append({
                "name": "lighthouse", "status": "FAIL",
                "detail": "score {0:.2f} < {1}".format(score, LIGHTHOUSE_MIN),
                "claim": "lighthouse performance score {0:.2f} is under {1}".format(score, LIGHTHOUSE_MIN),
                "evidence": "$ visual_qa.py lighthouse-check {0} -> score {1:.2f} < {2}".format(
                    lighthouse_path, score, LIGHTHOUSE_MIN),
            })
        else:
            results.append({"name": "lighthouse", "status": "PASS",
                             "detail": "score {0:.2f}".format(score), "claim": "", "evidence": ""})

    return names, results


def overall_verdict(results):
    if any(r["status"] == "FAIL" for r in results):
        return "FAIL"
    if any(r["status"] == "CHANGED" for r in results):
        return "CHANGED"
    return "PASS"


# --- CLI modes -----------------------------------------------------------------------------

def captures_mode(captures_dir, out_dir, baseline_dir, axe_path, lighthouse_path, overflow_path):
    if not out_dir:
        print("visual_qa.py: --out is required with --captures")
        return 2
    os.makedirs(out_dir, exist_ok=True)

    names, results = analyze_captures(captures_dir, baseline_dir, axe_path, lighthouse_path, overflow_path)

    image_paths = [os.path.join(captures_dir, n) for n in names]
    sheet = build_sheet(image_paths)
    sheet_path = os.path.join(out_dir, "sheet.png")
    sheet.save(sheet_path)
    sw, sh = sheet.size
    tokens = sheet_visual_tokens(sheet)

    for r in results:
        line = "{0}: {1}".format(r["name"], r["status"])
        if r["detail"]:
            line += " " + r["detail"]
        print(line)
    print("sheet: {0}x{1}, {2} visual tokens, {3} images".format(sw, sh, tokens, len(names)))

    verdict = overall_verdict(results)
    print("verdict: {0}".format(verdict))

    n_fail = sum(1 for r in results if r["status"] == "FAIL")
    n_changed = sum(1 for r in results if r["status"] == "CHANGED")
    n_pass = len(results) - n_fail - n_changed

    items = [{"claim": r["claim"], "evidence": r["evidence"], "confidence": "high"}
              for r in results if r["status"] in ("FAIL", "CHANGED") and r["claim"]]
    items.append({
        "claim": "{0} of {1} checks are PASS ({2} FAIL, {3} CHANGED); verdict {4}".format(
            n_pass, len(results), n_fail, n_changed, verdict),
        "evidence": "$ visual_qa.py --captures {0} --out {1} -> verdict: {2}".format(
            captures_dir, out_dir, verdict),
        "confidence": "high",
    })

    digest = {
        "verdict": verdict,
        "sheet": sheet_path.replace("\\", "/"),
        "sheet_tokens": tokens,
        "items": items,
    }
    with open(os.path.join(out_dir, "digest.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump(digest, f, separators=(",", ":"))

    return 1 if n_fail else 0


def sheet_only_mode(sheet_dir, out_dir):
    if not out_dir:
        print("visual_qa.py: --out is required with --sheet")
        return 2
    os.makedirs(out_dir, exist_ok=True)
    names = list_pngs(sheet_dir)
    image_paths = [os.path.join(sheet_dir, n) for n in names]
    sheet = build_sheet(image_paths)
    sheet.save(os.path.join(out_dir, "sheet.png"))
    w, h = sheet.size
    tokens = sheet_visual_tokens(sheet)
    print("sheet: {0}x{1}, {2} visual tokens, {3} images".format(w, h, tokens, len(names)))
    return 0


# --- selftest --------------------------------------------------------------------------------

def selftest():
    failures = [0]

    def check(n, ok, detail):
        status = "PASS" if ok else "FAIL"
        print("selftest {0}: {1} {2}".format(n, status, detail))
        if not ok:
            failures[0] += 1

    tmp = tempfile.mkdtemp(prefix="visualqa-selftest-")
    captures_dir = os.path.join(tmp, "captures")
    baseline_dir = os.path.join(tmp, "baseline")
    out_dir = os.path.join(tmp, "out")
    for d in (captures_dir, baseline_dir, out_dir):
        os.makedirs(d, exist_ok=True)

    # Fixture 1: good.png, deterministic noise, 390x844.
    rng = np.random.default_rng(7)
    good_arr = rng.integers(0, 256, size=(844, 390, 3), dtype=np.uint8)
    good_im = Image.fromarray(good_arr, "RGB")
    good_im.save(os.path.join(captures_dir, "good.png"))
    good_im.save(os.path.join(baseline_dir, "good.png"))

    # Fixture 2: blank.png, uniform RGB(245,239,228), 390x844.
    blank_arr = np.full((844, 390, 3), (245, 239, 228), dtype=np.uint8)
    Image.fromarray(blank_arr, "RGB").save(os.path.join(captures_dir, "blank.png"))

    # Fixture 3: shift.png = good.png with a 120x120 corner inverted; baseline is the
    # unmodified good.png content, stored under the name "shift.png" so it pairs by name.
    shift_arr = good_arr.copy()
    shift_arr[0:120, 0:120] = 255 - shift_arr[0:120, 0:120]
    Image.fromarray(shift_arr, "RGB").save(os.path.join(captures_dir, "shift.png"))
    good_im.save(os.path.join(baseline_dir, "shift.png"))

    _, results = analyze_captures(captures_dir, baseline_dir, None, None, None)
    by_name = {r["name"]: r for r in results}

    r_good = by_name.get("good.png", {})
    check(1, r_good.get("status") == "PASS" and "blank" not in r_good.get("detail", ""),
          "good.png vs identical baseline -> {0} {1}".format(r_good.get("status"), r_good.get("detail")))

    r_blank = by_name.get("blank.png", {})
    check(2, r_blank.get("status") == "FAIL" and "blank frame" in r_blank.get("detail", ""),
          "blank.png -> {0} {1}".format(r_blank.get("status"), r_blank.get("detail")))

    r_shift = by_name.get("shift.png", {})
    shift_ok = r_shift.get("status") == "CHANGED"
    shift_detail = r_shift.get("detail", "")
    try:
        shift_pct = float(shift_detail.split("drift ", 1)[1].split("%", 1)[0])
    except (IndexError, ValueError):
        shift_pct = -1.0
    check(3, shift_ok and shift_pct > DRIFT_RATIO_THRESHOLD * 100.0,
          "shift.png -> {0} {1}".format(r_shift.get("status"), shift_detail))

    # Check 4: run the real --captures pipeline over the same fixtures and check its sheet +
    # digest.json output (the full production path, not just analyze_captures()).
    exit_code = captures_mode(captures_dir, out_dir, baseline_dir, None, None, None)
    sheet_path = os.path.join(out_dir, "sheet.png")
    digest_path = os.path.join(out_dir, "digest.json")
    sheet_ok = os.path.isfile(sheet_path)
    long_edge_ok = tokens_ok = False
    if sheet_ok:
        with Image.open(sheet_path) as im4:
            w4, h4 = im4.size
        long_edge_ok = max(w4, h4) <= LONG_EDGE_MAX
        tokens_ok = (math.ceil(w4 / 28) * math.ceil(h4 / 28)) <= TOKENS_MAX
    dc_ok, dc_reasons, _, _ = digest_check.check(digest_path) if os.path.isfile(digest_path) else (False, ["missing"], 0, 0)
    check(4, sheet_ok and long_edge_ok and tokens_ok and dc_ok,
          "exit={0} sheet_ok={1} long_edge_ok={2} tokens_ok={3} digest_check={4}".format(
              exit_code, sheet_ok, long_edge_ok, tokens_ok, dc_ok or dc_reasons))

    # Check 5: the real pass-106 capture against itself as baseline -> PASS, not blank.
    real_capture = os.path.join(REPO, ".planning", "qa", "pass-106", "after-1440-band01.png")
    cap5_dir = os.path.join(tmp, "cap5")
    base5_dir = os.path.join(tmp, "base5")
    os.makedirs(cap5_dir, exist_ok=True)
    os.makedirs(base5_dir, exist_ok=True)
    shutil.copy(real_capture, os.path.join(cap5_dir, "after-1440-band01.png"))
    shutil.copy(real_capture, os.path.join(base5_dir, "after-1440-band01.png"))
    _, results5 = analyze_captures(cap5_dir, base5_dir, None, None, None)
    r5 = results5[0] if results5 else {}
    check(5, r5.get("status") == "PASS" and "blank" not in r5.get("detail", ""),
          "after-1440-band01.png vs itself -> {0} {1}".format(r5.get("status"), r5.get("detail")))

    # Check 6: a copy of that capture blanked to its own mean colour -> FAIL blank frame.
    real_im = Image.open(real_capture).convert("RGB")
    mean_color = tuple(int(round(c)) for c in np.asarray(real_im, dtype=np.float64).reshape(-1, 3).mean(axis=0))
    blanked = Image.new("RGB", real_im.size, mean_color)
    cap6_dir = os.path.join(tmp, "cap6")
    os.makedirs(cap6_dir, exist_ok=True)
    blanked.save(os.path.join(cap6_dir, "blanked.png"))
    _, results6 = analyze_captures(cap6_dir, None, None, None, None)
    r6 = results6[0] if results6 else {}
    check(6, r6.get("status") == "FAIL" and "blank frame" in r6.get("detail", ""),
          "blanked capture -> {0} {1}".format(r6.get("status"), r6.get("detail")))

    if failures[0] == 0:
        print("SELFTEST PASS (6 checks)")
        return 0
    print("SELFTEST FAIL ({0} of 6)".format(failures[0]))
    return 1


# --- entry point -----------------------------------------------------------------------------

def main():
    argv = sys.argv[1:]
    if "--selftest" in argv:
        return selftest()

    p = argparse.ArgumentParser(add_help=False)
    p.add_argument("--captures")
    p.add_argument("--sheet")
    p.add_argument("--out")
    p.add_argument("--baseline")
    p.add_argument("--axe-json")
    p.add_argument("--lighthouse-json")
    p.add_argument("--overflow-json")
    args = p.parse_args(argv)

    if args.sheet:
        return sheet_only_mode(args.sheet, args.out)
    if args.captures:
        return captures_mode(args.captures, args.out, args.baseline,
                              args.axe_json, args.lighthouse_json, args.overflow_json)

    print("usage: visual_qa.py --captures DIR --out DIR [--baseline DIR] [--axe-json F] "
          "[--lighthouse-json F] [--overflow-json F]")
    print("   or: visual_qa.py --sheet DIR --out DIR")
    print("   or: visual_qa.py --selftest")
    return 2


if __name__ == "__main__":
    sys.exit(main())
