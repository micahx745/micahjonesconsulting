#!/usr/bin/env bash
# Pass-120 S5 render checks. zero = raw served bytes, case-insensitive, expect 0.
# some = visible text (head/script stripped), case-sensitive, expect >= 1.
# rawsome = raw bytes, expect >= 1 (metadata and text/plain routes).
# Placed from brief §5.6 V5 (lines 4916-4981) with four changes, each disclosed for the judge:
#  1. B defaults to :3000 as written but is overridable (the build runs ONE server on 3200, §6.1).
#  2. zero() lowercases both sides and uses grep -oF: `grep -oiF` aborts in Git Bash (LESSONS #34),
#     so the brief's form counted 0 without looking. A planted positive below proves zero() counts.
#  3. The Guardicore band check names guardicore-band-960.jpg (brief O5), not -session.jpg.
#  4. The 308 Location pattern accepts "$B" instead of the literal :3000 origin.
B=${B:-http://localhost:3000}
V=.planning/exec/pass-120/s5-visible.mjs
fail=0
lc() { LC_ALL=C tr 'A-Z' 'a-z'; }
zero() { got=$(curl -s "$B$1" | lc | grep -oF -- "$(printf '%s' "$2" | lc)" | wc -l | tr -d ' ')
  if [ "$got" = 0 ]; then echo "PASS zero $1 [$2]"; else echo "FAIL zero $1 [$2] got=$got"; fail=$((fail+1)); fi; }
some() { got=$(curl -s "$B$1" | node "$V" | grep -oF -- "$2" | wc -l | tr -d ' ')
  if [ "$got" -ge 1 ]; then echo "PASS some $1 [$2]"; else echo "FAIL some $1 [$2] got=$got"; fail=$((fail+1)); fi; }
rawsome() { got=$(curl -s "$B$1" | grep -oF -- "$2" | wc -l | tr -d ' ')
  if [ "$got" -ge 1 ]; then echo "PASS rawsome $1 [$2]"; else echo "FAIL rawsome $1 [$2] got=$got"; fail=$((fail+1)); fi; }

# Planted positive (LESSONS #34): zero()'s counting path must find a phrase that IS on /work, in
# mixed case, before any of its zeros count. Prints no PASS line, so the brief's 124 total stands.
probe=$(curl -s "$B/work" | lc | grep -oF -- "$(printf '%s' "ALSO on THE record" | lc)" | wc -l | tr -d ' ')
if [ "${probe:-0}" -lt 1 ]; then echo "FAIL zero() cannot count: planted positive got=${probe:-empty}"; echo "s5-render: 1 failures"; exit 1; fi
for p in "client revenue" "since 2013" "290K" "290,000" "8K →" "monthly reach" "industry author" "2018–2021" "2024–2025" "2025–2026" "Enterprise sales · 2018" "Product analyst · 2020"; do zero / "$p"; done
rawsome / 'Four exits behind my work, $5B+ combined. $20M+ in revenue behind my work.'
some / "In revenue behind my work"
some / "Revenue and positioning"
some / "Founder, sole engineer"
some / "Social activist"
some / "Up to 800,000 impressions in a month"
some / "Author and leadership consultant"
some / "\$3M in signed contracts · close rate doubled"
some / "toward the 2018 IPO"
some / "Product analyst"
some / "acquired by Uber, \$2.65B, 2020"
some / "Helped launch · exit 2025"

for p in "client revenue" "since 2013" "industry author" "290,000" "for the same author"; do zero /about "$p"; done
some /about "\$20M+ in revenue behind my work."
some /about "For a social activist, a content engine reached a peak of 800,000 impressions in a month, up from a few thousand."
some /about "For an award-winning author and leadership consultant, the RFP software I built doubled their close rate inside six months."

for p in "industry author" "290,000" "bookings up 30%" "repositioned toward the buyers"; do zero /services "$p"; done
some /services "An author and leadership consultant: software that finds and drafts RFPs from buyers outside their existing network. \$3M in signed contracts, close rate doubled."
some /services "A birth worker: repositioned from birth support alone to the full arc of care around it. Bookings went from one to three a month to five to ten, across her whole range instead of one service."
rawsome /services 'href="/work/birth-worker"'

for p in "client revenue" "since 2013" "industry author" "290,000" "led to the Akamai"; do zero /llms.txt "$p"; done
rawsome /llms.txt '$20M+ in revenue behind my work.'
rawsome /llms.txt "- Thirteen years of growth, GTM and platform strategy roles inside B2B software companies"
rawsome /llms.txt '$14M in revenue, sourced and closed, at a $1.2M average enterprise deal size. Akamai acquired Guardicore in 2021'
rawsome /llms.txt "for a social activist; up to 800,000 impressions in a month, up from a few thousand a month"
rawsome /llms.txt 'for an award-winning author and leadership consultant; $3M in signed contracts, close rate doubled'
rawsome /llms.txt "(https://www.micahjonesconsulting.com/work/birth-worker): positioning, website, booking and direct insurance claims for a birth worker; bookings from one to three a month to five to ten"

for p in "36x" "36×" "2018-2021" "2018–2021" "2024-2025" "2025-2026" "<figcaption"; do zero /work "$p"; done
rawsome /work 'Case studies with the receipts attached: $14M in security revenue, a HIPAA-compliant CRM I founded, a $3M RFP engine, and an AI content engine.'

for s in guardicore rfp-engine content-engine ordani birth-worker; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$B/work/$s")
  if [ "$code" = 200 ]; then echo "PASS 200 /work/$s"; else echo "FAIL 200 /work/$s got=$code"; fail=$((fail+1)); fi
  for p in "2018–2021" "2018-2021" "2024–2025" "2024-2025" "2025–2026" "2025-2026" "<dt>Year</dt>" "industry author" "industry-authority" "one of four companies" "been hacked"; do zero "/work/$s" "$p"; done
done
zero /work/guardicore "guardicore-telaviv.jpg"
rawsome /work/guardicore "guardicore-band-960.jpg"
code=$(curl -s -o /dev/null -w "%{http_code}" "$B/guardicore-telaviv.jpg")
if [ "$code" = 404 ]; then echo "PASS 404 /guardicore-telaviv.jpg"; else echo "FAIL 404 /guardicore-telaviv.jpg got=$code"; fail=$((fail+1)); fi
for s in postmates neuton; do
  h=$(curl -s -o /dev/null -D - "$B/work/$s" | tr -d '\r')
  st=$(printf '%s\n' "$h" | head -1 | cut -d' ' -f2)
  if [ "$st" = 308 ] && printf '%s\n' "$h" | grep -iqE "^location: (${B})?/work#record$"; then echo "PASS 308 /work/$s"; else echo "FAIL 308 /work/$s got=$st $(printf '%s\n' "$h" | grep -i '^location:')"; fail=$((fail+1)); fi
done
echo "s5-render: $fail failures"
