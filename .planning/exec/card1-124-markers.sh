# Pass-124 homepage visible-text markers. Expects HV plus cnt and chk from the caller.
# The rendered-text contract is case-insensitive, so cnti folds both fixed strings.
cnti () { local h n; h=$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]'); n=$(printf '%s' "$2" | tr '[:upper:]' '[:lower:]'); cnt "$h" "$n"; }
n=$(cnti "$HV" 'It works.'); chk "home lead one" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'It just does not sell.'); chk "home lead two" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'I shape the product and build the message that sells it.'); chk "home positioning" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'I have $20M+ in revenue behind my work.'); chk "home revenue sentence" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'An agency is too broad. A hire is too early.'); chk "home engagement contrast" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'I build what your growing business needs next'); chk "home offer heading" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'How I work.'); chk "home process heading" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'Week one is an audit and a scope.'); chk "home scope step" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'I name the trade-offs before I build.'); chk "home decide step" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'I build the real thing, not a prototype.'); chk "home build step" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'I stay for launch and what customers'); chk "home launch step" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'See the work'); chk "home work link" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'In revenue behind my work'); chk "home revenue caption" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'Four exits I worked inside'); chk "home exits title" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'Name the problem'); chk "home close heading" "$n" '[ "$n" -ge 1 ]' ">=1"
n=$(cnti "$HV" 'I take AI-built'); chk "retired AI-built lead" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'demo to production'); chk "retired demo phrase" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'Too big for duct tape'); chk "retired duct tape heading" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'Operating principles'); chk "retired principles heading" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'The story comes first'); chk "retired story step" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'I step in as the operator'); chk "retired operator phrase" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'Make it sell'); chk "retired sell heading" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'Labor support'); chk "retired labor phrase" "$n" '[ "$n" -eq 0 ]' 0
n=$(cnti "$HV" 'Bodywork'); chk "retired bodywork phrase" "$n" '[ "$n" -eq 0 ]' 0
