#!/usr/bin/env bash
# CARD 1 production markers for the 113 + 114 + 115 + 115b merge. Presence counts use -ge 1
# on raw HTML (LESSONS #24); absence counts use -eq 0 on raw HTML.
BASE_DPL="dpl_BfViKgzf8bHDU5AwneqWDpsTUDLz"
if [ -n "${1:-}" ]; then
  BASES=("${1%/}")
  CHECK_DPL=0
else
  BASES=(https://www.micahjonesconsulting.com https://micahjonesconsulting.vercel.app)
  CHECK_DPL=1
fi
sf=0
chk () { if eval "$3"; then echo "  PASS $1: got $2"; else echo "  FAIL $1: got $2 (want $4)"; sf=$((sf+1)); fi; }
declare -A DPL
for D in "${BASES[@]}"; do
  echo "== $D"
  H=$(curl -sL "$D/"); PM=$(curl -sL "$D/work/postmates"); NE=$(curl -sL "$D/work/neuton")
  WK=$(curl -sL "$D/work"); LL=$(curl -sL "$D/llms.txt")
  if [ "$CHECK_DPL" -eq 1 ]; then
    dpl=$(printf '%s' "$H" | grep -o 'data-dpl-id="[^"]*"' | head -1 | sed 's/.*="\(.*\)"/\1/'); DPL[$D]=$dpl
    chk "dpl id is new" "$dpl" '[ -n "$dpl" ] && [ "$dpl" != "$BASE_DPL" ]' "not $BASE_DPL"
  fi
  for p in / /work /work/postmates /work/neuton /llms.txt; do
    c=$(curl -sL -o /dev/null -w '%{http_code}' "$D$p"); chk "status $p" "$c" '[ "$c" = 200 ]' 200
  done
  n=$(printf '%s%s%s%s' "$PM" "$NE" "$WK" "$LL" | grep -ci hennessy); chk "Hennessy anywhere" "$n" '[ "$n" -eq 0 ]' 0
  n=$(printf '%s%s%s' "$NE" "$WK" "$LL" | grep -ci foreign); chk "foreign on neuton+work+llms" "$n" '[ "$n" -eq 0 ]' 0
  n=$(printf '%s' "$NE" | grep -ci 'led to'); chk "led to on neuton" "$n" '[ "$n" -eq 0 ]' 0
  n=$(printf '%s' "$PM" | grep -c 'That promise invited fraud.'); chk "postmates fraud line" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$PM" | grep -c 'never meant to be delivered'); chk "removed fraud sentence" "$n" '[ "$n" -eq 0 ]' 0
  n=$(printf '%s' "$NE" | grep -c 'entering North America'); chk "new neuton line" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -c 'Helped launch · exit 2025'); chk "neuton row tag" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -c 'Helped launch · 2025<'); chk "old neuton tag" "$n" '[ "$n" -eq 0 ]' 0
  n=$(printf '%s' "$PM" | grep -c '2.65B'); chk "postmates 2.65B" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -c 'More than 20 million dollars'); chk "rec sr-only text" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -o 'class="cw-rec__tick"[^>]*>\$20M+' | wc -l); chk "tick SSR renders \$20M+" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$H" | grep -c 'M 100 0.5 C 12 -0.5'); chk "loop variant 3 path in SSR" "$n" '[ "$n" -ge 1 ]' ">=1"
  css=$(printf '%s' "$H" | grep -o 'href="/_next/static/[^"]*\.css[^"]*"' | sed 's/href="//;s/"$//;s/&amp;/\&/g' | sort -u)
  allcss=""; for c in $css; do allcss="$allcss$(curl -sL "$D$c")"; done
  n=$(printf '%s' "$allcss" | grep -o 'padding-block:\.184em' | wc -l); chk "css padding-block .184em" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(printf '%s' "$allcss" | grep -o 'margin-left:\.26em' | wc -l); chk "css margin-left .26em" "$n" '[ "$n" -ge 1 ]' ">=1"
done
if [ "$CHECK_DPL" -eq 1 ]; then
  a=${DPL[https://www.micahjonesconsulting.com]}; b=${DPL[https://micahjonesconsulting.vercel.app]}
  chk "both domains same deployment" "$a vs $b" '[ -n "$a" ] && [ "$a" = "$b" ]' "equal"
fi
echo "card1 failures: $sf"
exit $sf
