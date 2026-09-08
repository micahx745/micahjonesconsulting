$ErrorActionPreference = 'Stop'
$taskRoot = (Get-Location).Path
$qaRoot = Join-Path $taskRoot '.planning/qa/pass-104a'
$passRoot = [IO.Path]::GetFullPath((Join-Path $taskRoot '.planning/qa/pass-101'))
if ($passRoot -ne (Join-Path $taskRoot '.planning\qa\pass-101')) { throw 'Unexpected restoration target' }
$manifest = Get-Content -LiteralPath (Join-Path $qaRoot 'restore-manifest.json') -Raw | ConvertFrom-Json
Copy-Item -LiteralPath (Join-Path $passRoot 'verify/verify-room-result.json') -Destination (Join-Path $qaRoot 'verify-room-result.json')
$originalPaths = @($manifest.pass101.PSObject.Properties.Name)
$restored = 0
foreach ($entry in $manifest.pass101.PSObject.Properties) {
  $destination = [IO.Path]::GetFullPath((Join-Path $passRoot $entry.Name))
  if (-not $destination.StartsWith($passRoot + '\')) { throw 'Out-of-scope restoration path' }
  $source = Join-Path (Join-Path $manifest.backup 'pass-101') $entry.Name
  if ((Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLower() -ne $entry.Value) {
    Copy-Item -LiteralPath $source -Destination $destination
    $restored++
  }
}
$removed = 0
foreach ($file in Get-ChildItem -LiteralPath $passRoot -File -Recurse) {
  $relative = $file.FullName.Substring($passRoot.Length + 1)
  if ($relative -notin $originalPaths) {
    if (-not $file.FullName.StartsWith($passRoot + '\')) { throw 'Out-of-scope generated path' }
    Remove-Item -LiteralPath $file.FullName
    $removed++
  }
}
Copy-Item -LiteralPath (Join-Path $manifest.backup 'next-env.d.ts') -Destination (Join-Path $taskRoot 'next-env.d.ts')
foreach ($entry in $manifest.pass101.PSObject.Properties) {
  if ((Get-FileHash -LiteralPath (Join-Path $passRoot $entry.Name) -Algorithm SHA256).Hash.ToLower() -ne $entry.Value) { throw "Restoration mismatch: $($entry.Name)" }
}
if ((Get-FileHash -LiteralPath (Join-Path $taskRoot 'next-env.d.ts') -Algorithm SHA256).Hash.ToLower() -ne $manifest.'next-env') { throw 'next-env.d.ts mismatch' }
"PASS: restored $restored overwritten files; removed $removed new files; all $($originalPaths.Count) Pass 101 files and pre-existing next-env.d.ts match their original SHA-256 hashes."
