#!/usr/bin/env bash
# prepush-gates.sh: wrapper. The gate chain lives in prepush-gates.mjs (Node), because the Codex executor's
# Windows sandbox cannot launch bash (Pass-126). Same exit code, same output. See LESSONS #47.
exec node "$(dirname "$0")/prepush-gates.mjs" "$@"
