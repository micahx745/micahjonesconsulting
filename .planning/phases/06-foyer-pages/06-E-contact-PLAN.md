# Plan 06-E — Contact page + Server Action (app/(foyer)/contact + app/actions/contact)

**Phase:** 06 Foyer Pages
**Plan letter:** E
**Wave:** 3 (parallel with Wave 2; depends only on 06-A helpers)
**Requirements supported:** FOYER-07 (two-field form + Server Action + Supabase archive + inline thank-you)
**Files touched:**
- `app/(foyer)/contact/page.tsx` — CREATE
- `app/actions/contact.ts` — CREATE
- `.env.example` — CREATE

## Goal

Land the contact pipeline:
- `/contact` client component using React 19 `useActionState` to bind the form to a Server Action and render an inline thank-you on success.
- `app/actions/contact.ts` Server Action that validates via the shared Zod schema, sends a transactional email via Resend, inserts a row in Supabase `contact_messages` (best-effort), and returns a structured result.
- `.env.example` with the three required env var placeholders (`RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).

Env vars are read lazily inside the action body — build succeeds without them set; runtime returns a structured error pointing to `hello@micahjonesconsulting.com` if Resend is missing. Phase 10 wires Vercel env + Supabase schema/RLS for the live deploy.

## Steps

1. Create `app/actions/contact.ts` verbatim from 06-RESEARCH §3.3. Uses `"use server"` directive.
2. Create `app/(foyer)/contact/page.tsx` verbatim from 06-RESEARCH §3.7. Uses `"use client"` directive (required for `useActionState`).
3. Create `.env.example` at repo root with content from 06-RESEARCH §3.9.

## Verification

- `pnpm typecheck` clean.
- `pnpm lint:copy` clean (header copy is blueprint §7 verbatim; thank-you copy uses blueprint footer language).
- Build succeeds without any env vars set in `.env.local` — the lazy reads in the action body keep build green.
- Manual: GET `/contact` should render the two-field form. Submitting empty fields should produce inline field errors via Zod. Submitting valid fields with no env vars set should produce the structured `formError` message pointing to the direct email.

## Success criteria

- Form has exactly two visible inputs: `name` and `message` (textarea).
- Submit button reads `→ send` and disables while pending (shows `sending…`).
- On Zod validation failure: per-field inline error rendered with `role="alert"` for SR users.
- On Resend failure or missing env: form-level error rendered pointing to direct email.
- On success: page re-renders showing "Got it." + two-day reply commitment + direct-email link.
- Direct-email link to `hello@micahjonesconsulting.com` appears below the form (and in the success state).
