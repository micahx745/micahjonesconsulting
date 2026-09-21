#!/usr/bin/env bash
# card1-124.sh: card1-123.sh plus the Pass-124 home markers (card1-124-markers.sh). Run after the
# Pass-124 deploy exactly as card1-123 was: EXPECT_DPL=<served id> bash .planning/exec/card1-124.sh
# CARD 1 served checks for Pass-123 (operator push approval 2026-09-20, RESUME + LESSONS #3
# "PASS-123 SHIP APPROVED"). OLD_DPL updated to the pre-push live deploy.
# Presence counts run on VISIBLE text (visible-text.mjs strips <head> and every <script>,
# LESSONS #24), whitespace collapsed, fixed-string match, counted with grep -o | wc -l.
# Absence counts run on the RAW body (RSC payload and JSON-LD included). No grep -i -F (#34).
# Usage: bash .planning/exec/card1-123.sh [base]   (no argument: all three production domains)
# The deploy the DOMAINS WERE SERVING before this push, read off the wire at 2026-09-20
# 11:2x with `curl -sL <domain>/ | grep data-dpl-id` -- NOT the id the RESUME called
# "LIVE", which named dpl_9fPDmK1W (commit 3809f5e) while both domains were in fact on
# dpl_Go2xKXbY (commit 9813825, a later push). "dpl id is new" proves the new deploy took;
# a baseline taken from a doc instead of the wire makes that check pass vacuously.
OLD_DPL="dpl_Go2xKXbYYECL34ygnDtECsJRQzbQ"
# The deployment this push is supposed to put live. Set it from the Vercel
# deployment built from HEAD, or export EXPECT_DPL before running.
#
# Why a POSITIVE assertion and not just "differs from OLD_DPL" (2026-09-20):
# "not the old one" passes vacuously whenever OLD_DPL is wrong, and it was --
# .claude/RESUME.md called dpl_9fPDmK1W "LIVE" while both domains were in fact
# serving dpl_Go2xKXbY, a later push. Had this run with the doc's value and the
# new deploy failed, the domains would still have served Go2x, "not 9fPDm"
# would have been TRUE, and a dead push would have certified itself. Checking
# the served id EQUALS the id we built removes the whole class: it cannot pass
# unless the intended deploy is the one answering.
EXPECT_DPL="${EXPECT_DPL:-}"
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
    if [ -n "$EXPECT_DPL" ]; then
      chk "dpl id is the one we built" "$dpl" '[ "$dpl" = "$EXPECT_DPL" ]' "$EXPECT_DPL"
    else
      echo "  FAIL dpl id is the one we built: EXPECT_DPL is unset (want the deployment id built from HEAD)"; sf=$((sf+1))
    fi
  fi
  for p in / /work /work/guardicore /work/rfp-engine /work/ordani /work/content-engine /work/birth-worker /about /services /contact /llms.txt /sitemap.xml; do
    c=$(curl -s -o /dev/null -w '%{http_code}' "$D$p"); chk "status $p" "$c" '[ "$c" = 200 ]' 200
  done
  HV=$(printf '%s' "$H" | node .planning/exec/visible-text.mjs | tr -s '[:space:]' ' ')
  WV=$(vis "$D/work"); RV=$(vis "$D/work/rfp-engine")
  WR=$(raw "$D/work"); RR=$(raw "$D/work/rfp-engine"); LL=$(raw "$D/llms.txt")
  n=$(cnt "$WV" '$3M in signed contracts.'); chk "/work RFP entry" "$n" '[ "$n" -ge 1 ]' ">=1"
  # 2026-09-20: this line used to assert 'Results $3M in signed contracts.' -- the repeat the
  # operator ruled OUT on 2026-09-19 ("Drop the repeat, keep the rest", LESSONS #3 "PASS-123
  # JUDGE-GATE ANSWERS"). The check was encoding retired copy, so it failed on the very deploy
  # that finally obeyed the ruling. Changing a check to make it pass is normally the banned move
  # (LESSONS #37); it is allowed here only because the check asserts copy a dated ruling removed,
  # and it is replaced by BOTH halves of the new requirement, not deleted:
  n=$(cnt "$RV" 'Results Close rate from one in eight to one in four inside six months.'); chk "study Results row keeps the rest" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$RV" 'Results $3M in signed contracts.'); chk "study Results row drops the repeat" "$n" '[ "$n" -eq 0 ]' 0
  n=$(cnt "$RV" '$3M in signed contracts through the platform.'); chk "study What changed" "$n" '[ "$n" -ge 1 ]' ">=1"
  for page in WR RR LL; do n=$(printf '%s' "${!page}" | grep -o -i "eleven" | wc -l | tr -d ' '); chk "eleven absent ($page raw)" "$n" '[ "$n" -eq 0 ]' 0; done
  n=$(cnt "$HV" '$20M+'); chk "home \$20M+" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$HV" 'In revenue behind my work'); chk "home caption" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$HV" 'Four exits I worked inside'); chk "home exits title" "$n" '[ "$n" -ge 1 ]' ">=1"
  # Pass-124 (2026-09-21): the rebuilt home. Every string is ledgered (LESSONS #3). Bite-tested by
  # Sol before the ship gate: 24/24 pass on the new build, 16 fail on the pre-Pass-124 production.
  . "$(dirname "$0")/card1-124-markers.sh"
  n=$(cnt "$WR" 'aria-label="Guardicore, acquired by Akamai"'); chk "/work featured aria-label" "$n" '[ "$n" -ge 1 ]' ">=1"
  # Pass-123d: the day-three FAQ is cut (operator 2026-09-19). Raw body, so the RSC payload counts too.
  n=$(printf %s "$RR" | grep -o -i "scored for fit" | wc -l | tr -d " "); chk "FAQ phrase gone" "$n" '[ "$n" -eq 0 ]' 0
  n=$(printf %s "$RR" | grep -o -i "What was working after three days" | wc -l | tr -d " "); chk "FAQ question gone" "$n" '[ "$n" -eq 0 ]' 0
  n=$(cnt "$RV" "Can AI write a government RFP response?"); chk "other FAQs kept" "$n" '[ "$n" -ge 1 ]' ">=1"
  css=""; for u in $(printf '%s' "$H" | grep -o '/_next/static/[^"]*\.css' | sort -u); do css="$css$(curl -s "$D$u")"; done
  n=$(cnt "$css" '100cqi / 2.87'); chk "F5 cqi rule served" "$n" '[ "$n" -ge 1 ]' ">=1"
  n=$(cnt "$css" 'cw-secttitle--sub'); chk "dead CSS gone" "$n" '[ "$n" -eq 0 ]' 0
  # Pass-123c: actor mode is what keeps the scoreboard from shifting layout.
  n=$(cnt "$css" "is-actors"); chk "scoreboard actor CSS served" "$n" '[ "$n" -ge 1 ]' ">=1"
done
if [ "$CHECK_DPL" -eq 1 ]; then
  echo "== https://micahjonesconsulting.com (apex)"
  for p in / /work /work/rfp-engine /llms.txt; do r=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "https://micahjonesconsulting.com$p"); chk "apex 308 $p" "$r" "[ \"$r\" = \"308 https://www.micahjonesconsulting.com$p\" ]" "308 to www$p"; done
  a=${DPL[${BASES[0]}]}; ok=1; for D in "${BASES[@]}"; do [ "${DPL[$D]}" = "$a" ] || ok=0; done
  chk "same dpl on all three" "$a" '[ "$ok" -eq 1 ]' "one dpl"
fi
echo "FAILURES: $sf"; exit $sf
