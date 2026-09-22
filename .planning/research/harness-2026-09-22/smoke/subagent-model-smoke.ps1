# Harness research 2026-09-22: premise checks P4, P5 and P7 (plan.md), settled by smoke call on the operator's Claude
# login. No other model can settle them: they are about Claude Code's own model routing.
# P4: does CLAUDE_CODE_SUBAGENT_MODEL (the repo's .claude/settings.json sets it to sonnet) override an explicit Agent
#     model of "fable"? Run A: from the worktree, so the repo's settings load. Run B: the control, an empty temp dir with
#     the variable removed from the environment.
# P5: does the shorthand "fable" resolve to a Fable model? (the model that answers run B's subagent)
# P7: which model does the "opus" alias resolve to now? (run C, empty temp dir)
# Output: every model that answered each run (the result JSON's modelUsage keys), turns and the reply. Three tiny runs.
# Run from the worktree root:
#   powershell -NoProfile -ExecutionPolicy Bypass -File .planning/research/harness-2026-09-22/smoke/subagent-model-smoke.ps1
param([string]$Out = ".planning/research/harness-2026-09-22/smoke/subagent-model-smoke.txt")
$ErrorActionPreference = 'Continue'
$repo  = (Get-Location).Path
$lines = New-Object System.Collections.Generic.List[string]
function Say([string]$s) { $lines.Add($s); Write-Host $s }

# Nothing may steer these runs to another endpoint or pin a model behind the test's back.
foreach ($k in 'ANTHROPIC_BASE_URL', 'ANTHROPIC_AUTH_TOKEN', 'ANTHROPIC_MODEL', 'ANTHROPIC_DEFAULT_OPUS_MODEL',
               'ANTHROPIC_DEFAULT_SONNET_MODEL', 'ANTHROPIC_DEFAULT_HAIKU_MODEL', 'ANTHROPIC_DEFAULT_FABLE_MODEL') {
  Remove-Item "Env:$k" -ErrorAction SilentlyContinue
}
$inherited = [Environment]::GetEnvironmentVariable('CLAUDE_CODE_SUBAGENT_MODEL', 'Process')
Say ("subagent-model-smoke {0} | claude {1} | CLAUDE_CODE_SUBAGENT_MODEL in this shell: '{2}'" -f `
  (Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz'), ((& claude --version 2>$null) -join ' '), $inherited)

function Run([string]$name, [string]$dir, [string]$model, [string]$prompt, [bool]$clearVar) {
  $saved = [Environment]::GetEnvironmentVariable('CLAUDE_CODE_SUBAGENT_MODEL', 'Process')
  if ($clearVar) { [Environment]::SetEnvironmentVariable('CLAUDE_CODE_SUBAGENT_MODEL', $null, 'Process') }
  Push-Location $dir
  $t0 = Get-Date
  try {
    $raw = (& claude -p $prompt --model $model --output-format json --max-turns 4 --allowedTools "Agent" "Task" 2>$null) -join "`n"
  } catch { $raw = "" }
  finally {
    Pop-Location
    [Environment]::SetEnvironmentVariable('CLAUDE_CODE_SUBAGENT_MODEL', $saved, 'Process')
  }
  $secs = [int]((Get-Date) - $t0).TotalSeconds
  $jsonText = ($raw -split "`n" | Where-Object { $_.TrimStart().StartsWith('{') } | Select-Object -Last 1)
  if (-not $jsonText) { Say "$name : no JSON result after $secs s"; return }
  try { $j = $jsonText | ConvertFrom-Json } catch { Say "$name : unparseable JSON after $secs s"; return }
  $mu = if ($j.modelUsage) {
    ($j.modelUsage.PSObject.Properties | ForEach-Object {
      "{0}(in={1} cr={2} cw={3} out={4})" -f $_.Name, $_.Value.inputTokens, $_.Value.cacheReadInputTokens, $_.Value.cacheCreationInputTokens, $_.Value.outputTokens
    }) -join ' '
  } else { 'n/a' }
  $flat = ([string]$j.result -replace "`r?`n", ' ')
  Say ("{0}: --model {1} | subtype={2} turns={3} secs={4}" -f $name, $model, $j.subtype, $j.num_turns, $secs)
  Say ("{0}: modelUsage {1}" -f $name, $mu)
  Say ("{0}: reply = {1}" -f $name, $flat.Substring(0, [Math]::Min(120, $flat.Length)))
}

$tmp = Join-Path $env:TEMP ("harness-model-smoke-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Path $tmp | Out-Null
$agentPrompt = 'Call the Agent tool exactly once with model "fable", subagent_type "general-purpose", description "model probe", and prompt "Reply with the single word OK and nothing else." Then reply with one line: the subagent''s answer. Nothing else.'
Run "A worktree (repo settings load)" $repo "sonnet" $agentPrompt $false
Run "B control (empty dir, var removed)" $tmp "sonnet" $agentPrompt $true
Run "C opus alias (empty dir)" $tmp "opus" "Reply with the single word OK." $true
[IO.File]::WriteAllLines((Join-Path $repo $Out), $lines)
Write-Host "written: $Out"
