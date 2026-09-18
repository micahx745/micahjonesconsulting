# Run one GLM batch prompt once the z.ai 5-hour cap lifts. Smoke-checks every 5 minutes from -At for up
# to 75 minutes; runs the prompt on the first OK. Dies with the app session: if the session restarts,
# run this script (or the -Batch line inside it) by hand.
param([Parameter(Mandatory=$true)][string]$PromptFile, [Parameter(Mandatory=$true)][string]$Log,
      [Parameter(Mandatory=$true)][string]$At)
$W   = "C:\Users\micah\Code\micahjonesconsulting\.claude\worktrees\p106-live"
$glm = "$W\scripts\claude-glm.ps1"
$target = [DateTime]::Parse($At)
while ((Get-Date) -lt $target) { Start-Sleep -Seconds 60 }
for ($i = 0; $i -lt 16; $i++) {
  $smoke = & powershell -NoProfile -ExecutionPolicy Bypass -File $glm -Smoke 2>&1 | Out-String
  Add-Content "$Log.smoke" ("[" + (Get-Date -Format s) + "] " + ((($smoke -split "`n") | Where-Object { $_ -match '^OK|429|limit' }) -join ' | '))
  if ($smoke -match '(?m)^OK\s*$') {
    & powershell -NoProfile -ExecutionPolicy Bypass -File $glm -Batch -Dir $W -PromptFile $PromptFile *> $Log
    Write-Output "BATCH_EXIT=$LASTEXITCODE"; exit $LASTEXITCODE
  }
  Start-Sleep -Seconds 300
}
Write-Output "NOT_RUN: GLM still capped after 75 minutes of checks"; exit 2
