"""E3.1: check a Brief-Format: v2 file has the required sections and their sub-rules.

Harness v2 run B, written from .claude/briefs/harness-v2-b-lint-routing-governor.md. Stdlib
only. A file without the marker line "Brief-Format: v2" in its first 15 lines is SKIPped, not
failed: older briefs (pass-N-*.md) predate this format and are not checked. A v2 file is
checked for the eight required "## " headings (matched by a case-insensitive startswith, so
"## Steps (the hard rules...)" satisfies "steps"), plus three sub-rules: the Files section
carries at least one backticked token, the Pre-flight section carries "->", and the
Verification section carries a fenced block and an "Expected" line.

G1 (harness-v2-g-gates.md, LESSONS #60/#64): a stated "N checks" claim must agree with its
numbered list and/or its `PASS X N/N` line. See count_mismatches() for the exact rule.
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
# The count check's span strip: an empty pair counts, so a doubled backtick cannot expose a quoted count
# (brief G's own nested-backtick example did, on run G's first pass).
SPAN_RE = re.compile(r"`[^`]*`")
EXPECTED_RE = re.compile(r"^\s*(?:[-*]\s*)?Expected\b")

NUMBER_WORDS = {
    "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
    "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13,
    "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
    "nineteen": 19, "twenty": 20,
}
STATED_COUNT_RE = re.compile(
    r"(?i)\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|"
    r"fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|\d+) checks\b"
)
LIST_ITEM_RE = re.compile(r"^\d+\.\s")
LAST_LINE_NUMS_RE = re.compile(r"PASS \S+ (\d+)/(\d+)")


def _to_number(word):
    word = word.lower()
    return int(word) if word.isdigit() else NUMBER_WORDS[word]


def _is_continuation(line):
    """A list-item continuation line: starts with at least two spaces, not blank."""
    return line.startswith("  ") and line.strip() != ""


def _stops_lookahead(line):
    return line.strip() == "" or line.startswith("#")


def count_mismatches(text):
    """[reason, ...]: one "count mismatch (line <n>): ..." per stated-count line (G1) whose
    claim disagrees with its numbered list and/or its `PASS X N/N` line.

    A stated count is a match of STATED_COUNT_RE on a line with every backtick span blanked
    out first (a count inside backticks is quoted output, not a claim). From that line, the
    next up to 4 lines are read (stopping at a blank line or a "#" line) for either a `Last
    line` PASS X N/N or the start of a numbered list; a found list is counted (continuation
    lines skipped) and then the next up to 3 lines from where it ends are read the same way
    for a `Last line`. Mismatch: the stated number, the listed count (when found) and the
    PASS X N/N pair (when found) are not all equal.
    """
    lines = text.splitlines()
    n = len(lines)
    reasons = []
    for i in range(n):
        raw = lines[i]
        stripped = SPAN_RE.sub(" ", raw)
        m = STATED_COUNT_RE.search(stripped)
        if not m:
            continue
        stated = _to_number(m.group(1))
        line_no = i + 1

        listed = None
        a = b = None
        resolved = False

        j = i + 1
        steps = 0
        list_started_at = None
        while j < n and steps < 4:
            ln = lines[j]
            if _stops_lookahead(ln):
                break
            if "Last line" in ln:
                lm = LAST_LINE_NUMS_RE.search(ln)
                if lm:
                    a, b = int(lm.group(1)), int(lm.group(2))
                resolved = True
                break
            if LIST_ITEM_RE.match(ln):
                list_started_at = j
                break
            j += 1
            steps += 1

        if list_started_at is not None:
            k = list_started_at
            count = 0
            while k < n:
                ln = lines[k]
                if LIST_ITEM_RE.match(ln):
                    count += 1
                    k += 1
                    continue
                if _is_continuation(ln):
                    k += 1
                    continue
                break
            listed = count
            k2 = k
            steps2 = 0
            while k2 < n and steps2 < 3:
                ln2 = lines[k2]
                if _stops_lookahead(ln2):
                    break
                if "Last line" in ln2:
                    lm2 = LAST_LINE_NUMS_RE.search(ln2)
                    if lm2:
                        a, b = int(lm2.group(1)), int(lm2.group(2))
                    break
                k2 += 1
                steps2 += 1

        if not resolved and a is None and "Last line" in raw:
            lm3 = LAST_LINE_NUMS_RE.search(raw)
            if lm3:
                a, b = int(lm3.group(1)), int(lm3.group(2))

        vals = {stated}
        parts = ["says {0}".format(stated)]
        if listed is not None:
            vals.add(listed)
            parts.append("lists {0}".format(listed))
        if a is not None and b is not None:
            vals.add(a)
            vals.add(b)
            parts.append("expects {0}/{1}".format(a, b))
        if len(vals) > 1:
            reasons.append("count mismatch (line {0}): {1}".format(line_no, ", ".join(parts)))
    return reasons


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

    reasons.extend(count_mismatches(text))

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
