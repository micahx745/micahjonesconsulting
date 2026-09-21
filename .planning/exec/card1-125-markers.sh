# Pass-125 /full-time markers. Expects D (base), vis/raw/cnt/chk from the caller (card1-125.sh).
# Every string is ledger-exact (LESSONS #3 "PASS-125 FULL-TIME PAGE TO THE SHIP CHECK"; copy source
# content/full-time.ts). Visible text is case-folded (the display type is uppercase in CSS only).
# No marker uses the typographic apostrophe or a no-break space: both are real in the page, and a
# shell fixed-string match on them is the kind of check that passes or fails for the wrong reason.
cnti () { local h n; h=$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]'); n=$(printf '%s' "$2" | tr '[:upper:]' '[:lower:]'); cnt "$h" "$n"; }
FV=$(vis "$D/full-time"); FR=$(raw "$D/full-time"); AV=$(vis "$D/about"); SV=$(vis "$D/work/guardicore")
n=$(cnti "$FV" 'I build the product and sell it.'); chk "full-time H1" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'I want one seat: the first person at an early-stage company who both builds the product and sells it.'); chk "full-time seat line" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'How I think.'); chk "full-time think heading" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'I find the reason buyers sign and lead the pitch with'); chk "full-time positioning" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" '$14M in revenue, sourced and closed, at a $1.2M average enterprise deal.'); chk "full-time \$14M attribution" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'I build software that helps close'); chk "full-time result headline" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'The record.'); chk "full-time record heading" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'years before anyone was queuing to buy AI.'); chk "full-time Neuton line kept" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'SurveyMonkey and Guardicore carried my name on the cap table.'); chk "full-time cap table" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'Write to me.'); chk "full-time contact heading" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$FV" 'Work with me full-time'); chk "full-time footer has no self link" "$n" '[ "$n" -eq 0 ]' 0
for bad in 'head of' 'led to' 'sales manager' 'email me' 'Six months in' 'I sourced and closed'; do
  n=$(cnti "$FR" "$bad"); chk "full-time raw has no '$bad'" "$n" '[ "$n" -eq 0 ]' 0; done
for s in /work/ordani /work/guardicore /work/rfp-engine; do
  n=$(cnt "$FR" "href=\"$s\""); chk "full-time links $s" "$n" '[ "$n" -ge 1 ]' ">=1"; done
n=$(cnti "$AV" 'I also want one full-time seat'); chk "/about full-time line" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'Work with me full-time'); chk "home footer link" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$AV" 'Work with me full-time'); chk "/about footer link" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$SV" 'Work with me full-time'); chk "study footer link" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnt "$(raw "$D/sitemap.xml")" '/full-time'); chk "sitemap lists /full-time" "$n" '[ "$n" -ge 1 ]' ">=1"
