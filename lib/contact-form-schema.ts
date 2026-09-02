// lib/contact-form-schema.ts
//
// Phase 6 — FOYER-07. Shared Zod schema for the contact form. Client uses
// the inferred type for state; Server Action uses the parser for validation.
//
// Field names match blueprint §7 wireframe exactly:
//   - "name"    (Your name)
//   - "email"   (Where I reply — added Pass-76)
//   - "message" (What you are working on)
//
// Pass-76: the original two-field schema had no email, and the action set
// replyTo: undefined. A note arriving with no way to answer it is a dead
// letter, so the form collected a lead and lost it. Email is required.
//
// Bounds:
//   - name 1..100 chars (reject empty, reject pasted essays)
//   - message 10..2000 chars (reject one-word submissions, reject DOS)
//
// Source: REQUIREMENTS.md FOYER-07; blueprint §7 (two fields, no budget
//         dropdown, no phone, no Calendly); STACK.md (zod is a project dep).
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Your name is required.")
    .max(100, "Please use a shorter name."),
  email: z
    .string()
    .trim()
    .min(1, "I need an email to reply to.")
    .email("That email doesn't look right."),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least a sentence.")
    .max(2000, "Please trim this to under 2000 characters."),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
