#!/usr/bin/env bash
# CARD 1 served markers for Pass-120 (brief .claude/briefs/pass-120-work-page.md §6.3 V5).
# Structure copied from card1-115.sh (retired, E3). Every fetched body has <!-- --> stripped;
# presence counts use -ge 1 (LESSONS #24); absence counts use -eq 0 on fixed strings (grep -F).
# Usage: bash .planning/exec/card1-120.sh [base]
#   no argument: both production domains, new dpl id, same dpl id on both.
BASE_DPL="dpl_A16y1jFMgc4iKhEkJZ2NNbRhQY23"
if [ -n "${1:-}" ]; then
  BASES=("${1%/}")
  CHECK_DPL=0
else
  BASES=(https://www.micahjonesconsulting.com https://micahjonesconsulting.vercel.app)
  CHECK_DPL=1
fi
sf=0
chk () { if eval "$3"; then echo "  PASS $1: got $2"; else echo "  FAIL $1: got $2 (want $4)"; sf=$((sf+1)); fi; }
get () { curl -sL "$1" | sed 's/<!-- -->//g'; }
# The spec's `grep -ciF` aborts (exit 134, no count) in Git Bash's GNU grep 3.0 on every -i -F (grep-if-ok: a warning, LESSONS #34)
# combination, which would print an empty count. Same match, done as: lowercase both sides with
# tr, then grep -cF (fixed strings, so $ stays literal; the strings here are ASCII apart from –).
lc () { tr '[:upper:]' '[:lower:]'; }
STUDIES=(/work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker)
ABSENT=(
  'client revenue'
  'consulting revenue'
  '290,000'
  'industry author'
  'industry-authority'
  'been hacked'
  'Organic bookings up 30%'
  'repositioned toward the buyers'
  'one of four companies I worked inside'
  'same engagement also produced'
  '2018–2021'
  '2018-2021'
  '2024–2025'
  '2024-2025'
  '2025–2026'
  '2025-2026'
  'Protected by NDA'
  '$80M'
  '80 million'
)
declare -A DPL
for D in "${BASES[@]}"; do
  echo "== $D"
  H=$(get "$D/"); AB=$(get "$D/about"); SV=$(get "$D/services"); WK=$(get "$D/work"); LL=$(get "$D/llms.txt")
  GC=$(get "$D/work/guardicore"); RF=$(get "$D/work/rfp-engine"); OR=$(get "$D/work/ordani")
  CE=$(get "$D/work/content-engine"); BW=$(get "$D/work/birth-worker")
  if [ "$CHECK_DPL" -eq 1 ]; then
    dpl=$(printf '%s' "$H" | grep -o 'data-dpl-id="[^"]*"' | head -1 | sed 's/.*="\(.*\)"/\1/'); DPL[$D]=$dpl
    chk "dpl id is new" "$dpl" '[ -n "$dpl" ] && [ "$dpl" != "$BASE_DPL" ]' "not $BASE_DPL"
  fi
  for p in / /work "${STUDIES[@]}" /llms.txt /sitemap.xml; do
    c=$(curl -s -o /dev/null -w '%{http_code}' "$D$p"); chk "status $p" "$c" '[ "$c" = 200 ]' 200
  done
  for p in /work/postmates /work/neuton; do
    r=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$D$p")
    chk "redirect $p" "$r" '[ "$r" = "308 $D/work#record" ]' "308 $D/work#record"
  done
  ALL=$(printf '%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n' "$H" "$AB" "$SV" "$WK" "$GC" "$RF" "$OR" "$CE" "$BW" "$LL")
  for s in "${ABSENT[@]}"; do
    n=$(printf '%s' "$ALL" | lc | grep -cF -- "$(printf '%s' "$s" | lc)"); chk "absent '$s'" "$n" '[ -n "$n" ] && [ "$n" -eq 0 ]' 0
  done
  n=$(printf '%s' "$WK" | grep -cF 'I find what your buyers are actually paying for, then build the system that sells exactly that.'); chk "work method line" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$WK" | grep -cF 'id="record"'); chk "work id=record" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$WK" | grep -cF 'Also on the record'); chk "work Also on the record" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$WK" | grep -cF 'Technology acquired by Nordic Semiconductor, 2025'); chk "work Nordic exit line" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$SV" | grep -cF 'software that finds and drafts RFPs from buyers outside their existing network'); chk "services RFP receipt" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -cF 'revenue behind my work'); chk "home revenue behind my work" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$CE" | grep -cF 'a social activist'); chk "content-engine a social activist" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$RF" | grep -cF 'leadership consultant who teaches government bodies and corporations'); chk "rfp-engine descriptor" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -c 'More than 20 million dollars'); chk "rec sr-only text" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -o 'class="cw-rec__tick"[^>]*>\$20M+' | wc -l); chk "tick SSR renders \$20M+" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -c 'M 100 0.5 C 12 -0.5'); chk "loop variant 3 path in SSR" "$n" '[ "$n" -ge 1 ]' ">=1"
  css=$(printf '%s' "$H" | grep -o 'href="/_next/static/[^"]*\.css[^"]*"' | sed 's/href="//;s/"$//;s/&amp;/\&/g' | sort -u)
  allcss=""; for c in $css; do allcss="$allcss$(get "$D$c")"; done
  n=$(printf '%s' "$allcss" | grep -o 'padding-block:\.184em' | wc -l); chk "css padding-block .184em" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$allcss" | grep -o 'margin-left:\.26em' | wc -l); chk "css margin-left .26em" "$n" '[ "$n" -ge 1 ]' ">=1"
done
if [ "$CHECK_DPL" -eq 1 ]; then
  a=${DPL[https://www.micahjonesconsulting.com]}; b=${DPL[https://micahjonesconsulting.vercel.app]}
  chk "both domains same deployment" "$a vs $b" '[ -n "$a" ] && [ "$a" = "$b" ]' "equal"
fi
echo "card1 failures: $sf"
[ "$sf" -eq 0 ] || exit 1
