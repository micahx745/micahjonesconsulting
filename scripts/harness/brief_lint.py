"""E3.1: check a Brief-Format: v2 file has the required sections and their sub-rules.

Harness v2 run B, written from .claude/briefs/harness-v2-b-lint-routing-governor.md. Stdlib
only. A file without the marker line "Brief-Format: v2" in its first 15 lines is SKIPped, not
failed: older briefs (pass-N-*.md) predate this format and are not checked. A v2 file is
checked for the eight required "## " headings (matched by a case-insensitive startswith, so
"## Steps (the hard rules...)" satisfies "steps"), plus three sub-rules: the Files section
carries at least one backticked token, the Pre-flight section carries "->", and the
Verification section carries a fenced block and an "Expected" line.
"""

import re
import sys

REQUIRED_SECTIONS = (
    "ruling",
    "files",
    "pre-flight",
    "steps",
    "verification",
    "rejected",
    "digest",
    "return conditions",
)

HEADING_RE = re.compile(r"(?m)^##[ \t]+(.*?)[ \t]*$")
BACKTICK_RE = re.compile(r"`[^`]+`")
EXPECTED_RE = re.compile(r"^\s*(?:[-*]\s*)?Expected\b")


def headings(text):
    """[(start_of_heading_line, end_of_heading_line, lowercased_title), ...] in document order."""
    out = []
    for m in HEADING_RE.finditer(text):
        out.append((m.start(), m.end(), m.group(1).strip().lower()))
    return out


def section_span(heads, idx, text_len):
    """The body of heads[idx]: from the end of its heading line to the next heading, or EOF."""
    start = heads[idx][1]
    end = heads[idx + 1][0] if idx + 1 < len(heads) else text_len
    return start, end


def first_matching(heads, key):
    """Index into heads of the first heading whose lowercased title starts with key, else -1."""
    for i, (_, _, title) in enumerate(heads):
        if title.startswith(key):
            return i
    return -1


def check_file(path):
    """(status, reasons): status is 'SKIP', 'PASS' or 'FAIL'; reasons is a list of strings."""
    try:
        with open(path, encoding="utf-8") as f:
            text = f.read()
    except OSError as e:
        return "FAIL", ["cannot read file: {0}".format(e)]

    first15 = "\n".join(text.splitlines()[:15])
    if "Brief-Format: v2" not in first15:
        return "SKIP", []

    heads = headings(text)
    reasons = []
    idx_by_key = {}
    for key in REQUIRED_SECTIONS:
        idx = first_matching(heads, key)
        if idx < 0:
            reasons.append("missing section: " + key)
        else:
            idx_by_key[key] = idx

    if "files" in idx_by_key:
        start, end = section_span(heads, idx_by_key["files"], len(text))
        body = text[start:end]
        has_backtick = bool(BACKTICK_RE.search(body))
        if not has_backtick:
            reasons.append("files: no backticked token")

    if "pre-flight" in idx_by_key:
        start, end = section_span(heads, idx_by_key["pre-flight"], len(text))
        body = text[start:end]
        if "->" not in body:
            reasons.append("pre-flight: no ->")

    if "verification" in idx_by_key:
        start, end = section_span(heads, idx_by_key["verification"], len(text))
        body = text[start:end]
        lines = body.splitlines()
        has_fence = any(ln.lstrip().startswith("```") for ln in lines)
        has_expected = any(EXPECTED_RE.match(ln) for ln in lines)
        if not has_fence:
            reasons.append("verification: no fenced block")
        if not has_expected:
            reasons.append("verification: no Expected line")

    if reasons:
        return "FAIL", reasons
    return "PASS", []


def main():
    paths = sys.argv[1:]
    if not paths:
        print("usage: brief_lint.py <brief.md>...")
        return 1
    any_fail = False
    for path in paths:
        status, reasons = check_file(path)
        if status == "SKIP":
            print("SKIP {0} (not Brief-Format: v2)".format(path))
        elif status == "PASS":
            print("PASS {0}".format(path))
        else:
            any_fail = True
            print("FAIL {0}: {1}".format(path, "; ".join(reasons)))
    return 1 if any_fail else 0


if __name__ == "__main__":
    sys.exit(main())
