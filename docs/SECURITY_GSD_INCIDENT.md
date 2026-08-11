# GSD/gsd-pi Supply-Chain Incident — Project Advisory

**Date:** 2026-05-22
**Status:** Machine-level Tier 1 mitigation COMPLETE.

---

## Summary

`gsd-pi` and related NPM packages (`get-shit-done-cc`, `@gsd-build/sdk`) by NPM user `glittercowboy` (Lex Christopherson / TÂCHES) are now untrusted. The founder cashed out the `$GSD` Solana token on 2026-05-22 (~$500K extracted) and retains NPM publish access to those packages. No malicious payload observed in any published version yet, but next publish could be backdoor.

## This project specifically

- No `.env` file present in the project root → lower credential exposure
- `.planning/` directory exists → markdown phase artifacts, safe to keep
- Review any per-engagement credential files (consulting projects may have client-specific secrets)

## What has been done (machine-level)

- `npm uninstall -g gsd-pi` — complete 2026-05-22 PM-8
- `~/.npmrc` set to `ignore-scripts=true`
- `~/.gsd/` deleted
- `Bash(npx gsd-pi:*)` permission removed from `~/.claude/settings.json`
- `gsd-check-update.js` SessionStart hook emptied

## Canonical references

- Full incident plan: `C:\Users\micah\birthflowV2\birthflowV2\docs\SECURITY_GSD_INCIDENT_PLAN.md`
- Tier 2 rotation runbook: `C:\Users\micah\birthflowV2\birthflowV2\docs\SECURITY_GSD_TIER2_ROTATION_RUNBOOK.md`

## Do NOT

- Re-install `gsd-pi`, `get-shit-done-cc`, or `@gsd-build/sdk`
- Install `@opengsd/gsd-pi` reflexively
