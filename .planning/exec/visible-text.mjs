// .planning/exec/visible-text.mjs — Pass-121 Stage A.
//
// Reads HTML on stdin, strips <head>...</head>, every <script>...</script>, then every
// remaining tag, decodes numeric entities (decimal and hex) and the named &lt; &gt; &quot; &#39;,
// then &amp; last (so "&amp;#x27;" stays "&#x27;", never double-decoded), and prints the text.
// Numeric decoding added in Pass-121 Stage A: React serializes an apostrophe as &#x27;, so the
// five-entity version false-negatived every string with an apostrophe (content-engine's dek).
//
// `.claude/briefs/README.md` "Count what renders" (LESSONS #24): an `expect >= 1` copy check
// must count visible DOM text, not raw served HTML — a raw `curl | grep -c` also counts the
// `<head>` metadata and the RSC flight payload embedded in `<script>` tags, so a correct page
// can fail. `expect 0` checks may still grep raw HTML directly; only `expect >= 1` checks pipe
// through this helper.
//
// Usage: curl -s <url> | node .planning/exec/visible-text.mjs

import { readFileSync } from "node:fs";

const html = readFileSync(0, "utf8");

const NAMED = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };

const text = html
  .replace(/<head[\s\S]*?<\/head>/gi, " ")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#([0-9]+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
  .replace(/&lt;|&gt;|&quot;/g, (m) => NAMED[m])
  .replace(/&amp;/g, "&");

process.stdout.write(text);
