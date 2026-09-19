#!/usr/bin/env bash
# CARD 1 served checks for Pass-123a + 123b (operator push approval 2026-09-19, RESUME).
# Presence counts run on VISIBLE text (visible-text.mjs strips <head> and every <script>,
# LESSONS #24), whitespace collapsed, fixed-string match, counted with grep -o | wc -l.
# Absence counts run on the RAW body (RSC payload and JSON-LD included). No grep -i -F (#34).
# Usage: bash .planning/exec/card1-123.sh [base]   (no argument: all three production domains)
OLD_DPL="dpl_7ov1sFMSwNhEpyPzhCqyohPgxkUD"
if [ -n "${1:-}" ]; then BASES=("${1%/}"); CHECK_DPL=0; else
  BASES=(https://www.micahjonesconsulting.com https://micahjonesconsulting.vercel.app); CHECK_DPL=1; fi
# The apex is a 308 to www, path kept (checked below), so it always serves www's deploy.
sf=0
chk () { if eval "$3"; then echo "  PASS $1: got $2"; else echo "  FAIL $1: got $2 (want $4)"; sf=$((sf+1)); fi; }
raw () { curl -sL "$1" | sed 's/<!-- -->//g'; }
vis () { raw "$1" | node .planning/exec/visible-text.mjs | tr -s '[:space:]' ' '; }
cnt () { printf '%s' "$1" | grep -o -F -- "$2" | wc -l | tr -d ' '; }
declare -A DPL
for D in "${BASES[@]}"; do
  echo "== $D"
  H=$(raw "$D/")
  if [ "$CHECK_DPL" -eq 1 ]; then
    dpl=$(printf '%s' "$H" | grep -o 'data-dpl-id="[^"]*"' | head -1 | sed 's/.*="\(.*\)"/\1/'); DPL[$D]=$dpl
    chk "dpl id is new" "$dpl" '[ -n "$dpl" ] && [ "$dpl" != "$OLD_DPL" ]' "not $OLD_DPL"
  fi
  for p in / /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker /about /services /contact /llms.txt /sitemap.xml; do
    c=$(curl -s -o /dev/null -w '%{http_code}' "$D$p"); chk "status $p" "$c" '[ "$c" = 200 ]' 200
  done
  HV=$(printf '%s' "$H" | node .planning/exec/visible-text.mjs | tr -s '[:space:]' ' ')
  WV=$(vis "$D/work"); RV=$(vis "$D/work/rfp-engine")
  WR=$(raw "$D/work"); RR=$(raw "$D/work/rfp-engine"); LL=$(raw "$D/llms.txt")
  n=$(cnt "$WV" '$3M in signed contracts.'); chk "/work RFP entry" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$RV" 'Results $3M in signed contracts.'); chk "study Results row" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$RV" '$3M in signed contracts through the platform.'); chk "study What changed" "$n" '[ "$n" -ge 1 ]' ">=1"
  for page in WR RR LL; do n=$(printf '%s' "${!page}" | grep -o -i "eleven" | wc -l | tr -d ' '); chk "eleven absent ($page raw)" "$n" '[ "$n" -eq 0 ]' 0; done
  n=$(cnt "$HV" '$20M+'); chk "home \$20M+" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$HV" 'In revenue behind my work'); chk "home caption" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$HV" 'Four exits I worked inside'); chk "home exits title" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$WR" 'aria-label="Guardicore, acquired by Akamai"'); chk "/work featured aria-label" "$n" '[ "$n" -ge 1 ]' ">=1"
  css=""; for u in $(printf '%s' "$H" | grep -o '/_next/static/[^"]*\.css' | sort -u); do css="$css$(curl -s "$D$u")"; done
  n=$(cnt "$css" '100cqi / 2.87'); chk "F5 cqi rule served" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$css" 'cw-secttitle--sub'); chk "dead CSS gone" "$n" '[ "$n" -eq 0 ]' 0
done
if [ "$CHECK_DPL" -eq 1 ]; then
  echo "== https://micahjonesconsulting.com (apex)"
  for p in / /work /work/rfp-engine /llms.txt; do r=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "https://micahjonesconsulting.com$p"); chk "apex 308 $p" "$r" "[ \"$r\" = \"308 https://www.micahjonesconsulting.com$p\" ]" "308 to www$p"; done
  a=${DPL[${BASES[0]}]}; ok=1; for D in "${BASES[@]}"; do [ "${DPL[$D]}" = "$a" ] || ok=0; done
  chk "same dpl on all three" "$a" '[ "$ok" -eq 1 ]' "one dpl"
fi
echo "FAILURES: $sf"; exit $sf
