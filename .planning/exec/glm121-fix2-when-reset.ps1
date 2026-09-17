# Launch Pass-121 fix round 2 on GLM once the z.ai 5-hour cap lifts.
# Operator 2026-09-17: "Wait for GLM, draft the brief meanwhile". The cap message said
# reset at 2026-09-18 11:54:23 server time (UTC+8) = 2026-09-17 20:54:23 PDT.
# Smoke-checks every 5 minutes from 20:56 PDT for at most 75 minutes; runs once on the first OK.
$W   = "C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live"
$glm = "$W\scripts\claude-glm.ps1"
$out = "$W\.planning\exec"
$target = [DateTime]::Parse("2026-09-17 20:56:00")
while ((Get-Date) -lt $target) { Start-Sleep -Seconds 60 }
for ($i = 0; $i -lt 16; $i++) {
  $smoke = & powershell -NoProfile -ExecutionPolicy Bypass -File $glm -Smoke 2>&1 | Out-String
  Add-Content "$out\glm121-fix2-smoke.log" ("[" + (Get-Date -Format s) + "] " + ($smoke -split "`n" | Where-Object { $_ -match 'OK|429|limit' } | Select-Object -Last 2) -join ' | ')
  if ($smoke -match '(?m)^OK\s*$') {
    & powershell -NoProfile -ExecutionPolicy Bypass -File $glm -Batch -Dir $W -PromptFile "$out\glm-121-mocks-fix2.md" *> "$out\glm121-fix2.log"
    Write-Output "FIX2_EXIT=$LASTEXITCODE"
    exit $LASTEXITCODE
  }
  Start-Sleep -Seconds 300
}
Write-Output "FIX2_NOT_RUN: GLM still capped after 75 minutes of checks"
exit 2
