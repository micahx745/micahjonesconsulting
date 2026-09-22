"""E4.1: replace one byte span of a file with another file's bytes, by two text markers.

Harness v2 run B, written from .claude/briefs/harness-v2-b-lint-routing-governor.md. Stdlib
only, bytes in and bytes out: the target files (.claude/AI_ROUTING.md, .claude/CLAUDE.md) are
never decoded or re-encoded, so no editor or terminal codepage can touch a byte the main
session did not write. --start "" means the file start. A marker that is missing, or that
occurs more than once in the file, refuses (exit 2) rather than guess which occurrence was
meant.

    python splice_block.py --file F --start S --end E --replacement R [--append A]

Finds the first occurrence of S (or byte 0 when S is empty), then the first occurrence of E
at or after the end of that S match. Replaces the bytes from the start of the S match up to,
not including, the E match with the bytes of file R. With --append, the bytes of file A are
then added at the end of the (already-replaced) file.
"""

import sys


def refuse(label, marker_text, why):
    sys.stderr.write("splice_block.py: marker {0} {1}: {2!r}\n".format(label, why, marker_text))
    return 2


def find_unique(haystack, needle, start_at=0):
    """(position, error) for needle in haystack at or after start_at.

    error is None on success, else one of "missing" / "occurs more than once" (checked
    against the WHOLE haystack, so an ambiguous marker refuses even if its first hit after
    start_at looked unique).
    """
    total = haystack.count(needle)
    if total == 0:
        return -1, "missing"
    if total > 1:
        return -1, "occurs more than once"
    pos = haystack.find(needle, start_at)
    if pos < 0:
        return -1, "missing after the start marker"
    return pos, None


def main():
    argv = sys.argv[1:]
    args = {}
    i = 0
    while i < len(argv):
        key = argv[i]
        if key in ("--file", "--start", "--end", "--replacement", "--append") and i + 1 < len(argv):
            args[key[2:]] = argv[i + 1]
            i += 2
        else:
            sys.stderr.write("splice_block.py: unrecognized argument {0!r}\n".format(key))
            return 2
    for required in ("file", "start", "end", "replacement"):
        if required not in args:
            sys.stderr.write("splice_block.py: --{0} is required\n".format(required))
            return 2

    with open(args["file"], "rb") as f:
        original = f.read()
    old_len = len(original)

    start_marker = args["start"].encode("utf-8")
    end_marker = args["end"].encode("utf-8")

    if start_marker == b"":
        start_pos = 0
    else:
        start_pos, err = find_unique(original, start_marker)
        if err:
            return refuse("--start", args["start"], err)

    search_from = start_pos + len(start_marker)
    end_pos, err = find_unique(original, end_marker, start_at=search_from)
    if err:
        return refuse("--end", args["end"], err)
    if end_pos < search_from:
        return refuse("--end", args["end"], "found before --start")

    with open(args["replacement"], "rb") as f:
        replacement = f.read()

    new_bytes = original[:start_pos] + replacement + original[end_pos:]

    if "append" in args:
        with open(args["append"], "rb") as f:
            appendix = f.read()
        new_bytes += appendix

    with open(args["file"], "wb") as f:
        f.write(new_bytes)

    new_len = len(new_bytes)
    print("spliced {0}: {1} -> {2} bytes".format(args["file"], old_len, new_len))
    return 0


if __name__ == "__main__":
    sys.exit(main())
