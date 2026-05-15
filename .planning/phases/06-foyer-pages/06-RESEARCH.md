# Phase 6 Research — Foyer Pages

**Phase:** 06 Foyer Pages
**Requirements:** FOYER-02, FOYER-03, FOYER-04, FOYER-05, FOYER-06, FOYER-07, FOYER-08 (7 REQ-IDs)
**Depends on:** Phase 5 (TitleCard signature motion complete) + Phase 4 (route group skeletons + foyer layout stamping `data-mode="foyer"`)
**Researched:** 2026-05-14

---

## 1. Scope

Phase 6 ships the five foyer routes with real, verbatim copy from blueprint §8:

1. `/` — Home (FOYER-02, FOYER-03): hero positioning sentence, full-bleed portrait slot with copper rule, three-card selected-work strip, About teaser, Work With Me teaser, Contact CTA.
2. `/about` — About (FOYER-04, FOYER-05): two-column long-form (8/4), 150-word about paragraph verbatim, vertical portrait slot + credits list, Oakland family-context paragraph, three numbered values.
3. `/work-with-me` — Work With Me (FOYER-06): three stacked engagement cards (Strategy Sprint / Embed / Build), four-question FAQ, single CTA to `/contact`.
4. `/contact` — Contact (FOYER-07): two-field form (name + what you're working on), Server Action validates via Zod, calls `resend.emails.send()`, inserts to Supabase `contact_messages`, inline thank-you state, direct-email alternate.
5. `/work` — Work index (FOYER-08): preview of case studies as TitleCard thumbnails reading `content/work/*.mdx` frontmatter.

**Out of scope for Phase 6:** the real portrait images (Phase 9), case-study MDX content (Phase 8), the live `<TitleCard>` client wrapper consumed on Home (replaced by static `<TitleCardComposition>` so the Home doesn't pull GSAP into its bundle — and so the one-signature-motion rule is preserved).

---

## 2. Architecture Decisions

### 2.1 Selected-work strip + Work index thumbnails use `TitleCardComposition` (NOT `TitleCard`)

The `motion-discipline.sh` rule from `.claude/CLAUDE.md` is explicit: **the TitleCard's GSAP pin is the one signature motion**. If we render the client `<TitleCard>` on the Home selected-work strip, we'd be firing the pin three times in a row — turning the signature into noise — and we'd be dragging GSAP into the foyer Home bundle, which violates the GSAP quarantine + Phase 5 success criterion #4 ("GSAP imports present only in route bundles that consume TitleCard"). The Home is foyer, NOT a TitleCard consumer.

Solution: Home selected-work strip and Work index thumbnails render `<TitleCardComposition phase="stacked">` — the server-safe presentational shell built in Phase 5 for exactly this case. The pin animates only on the case-study page itself (`/work/[slug]`), where the user has chosen to enter the work.

This is consistent with Phase 5 RESEARCH §2.1: "Future consumers (Phase 6 Work index TitleCard thumbnails) can render the static resolved phase without dragging GSAP in."

### 2.2 Frontmatter reading via `gray-matter` in a server helper

`lib/case-studies.ts` reads `content/work/*.mdx` via `gray-matter` at request time (or build time once we add `generateStaticParams` in Phase 7). For Phase 6 it returns `{ slug, title, dek, words, year, status }` for every MDX file present. Phase 6 only has `test-slug.mdx` to read; Phase 8 will add the four real case studies and the Work index will pick them up automatically.

The Phase 4 stub `content/work/test-slug.mdx` has minimal frontmatter (`title`, `dek`, `role`, `tools`, `year`, `status` — no `titleCardWords` yet because that's Phase 7's schema concern). For Phase 6 we derive thumbnail words from `title` if `titleCardWords` is missing, so the page still renders without Phase 7's schema in place.

### 2.3 Contact form — Server Action + Zod schema shared with client

Per blueprint §7 + REQ FOYER-07, contact is two fields: `name` and `what you're working on` (we map to `message` in the schema for clarity). The flow:

1. Client component (`/contact/page.tsx`) renders a `<form>` with `action={contactAction}`. On submit, browser calls the Server Action.
2. Server Action (`app/actions/contact.ts`) validates the FormData with the shared Zod schema (`lib/contact-form-schema.ts`). On validation failure, returns `{ ok: false, fieldErrors }`. On success: calls Resend, inserts to Supabase, returns `{ ok: true }`.
3. Client uses `useActionState` (React 19) to get back the result and render the inline thank-you state on `ok: true` — no full-page navigation.

The schema lives in `lib/contact-form-schema.ts` so both sides share types — but the Zod parser runs only on the server (where Zod is allowed to throw freely). The client doesn't import the parser; it only imports the inferred type.

### 2.4 `process.env` access — explicit lazy reads in the Server Action

Both `process.env.RESEND_API_KEY` and `process.env.SUPABASE_URL` + `process.env.SUPABASE_SERVICE_ROLE_KEY` are read **inside** the Server Action body, not at module top. This means:

- Build succeeds even without env vars set.
- Runtime fires a structured error response (not a 500) if env is missing, so the form can show "Email service temporarily unavailable" rather than crashing.
- The `.env.example` file lists the three variables with placeholder values for the operator to fill in (Phase 1 already submitted the Resend DNS; Phase 10 wires Supabase + Vercel env).

### 2.5 Portrait slots — placeholder boxes, not `<Image>` yet

Real portraits arrive Phase 9 (PHOTO-02, PHOTO-03). For Phase 6 we render:

```tsx
<div className="portrait-slot portrait-slot--full-bleed" aria-hidden>
  <span className="portrait-slot__label">portrait — Oakland — coming Day 7–14</span>
</div>
```

Styled as `aspect-[4/5]` cream-on-cream box with a subtle copper hairline so it reads as intentional, not broken. CSS lives in `globals.css` under `.portrait-slot` and `.portrait-slot--full-bleed` / `.portrait-slot--column`. No `<img>`. No raw `<Image>`. The `image-budget.sh` hook will not trigger because there's no image yet.

### 2.6 Copy verbatim — every page string from blueprint §7 + §8

Every visible string on every foyer page is **either** verbatim from blueprint or invented within the engagement-card/FAQ/CTA scope explicitly granted in the orchestrator prompt. The `copy-lint-runner.ts` scanner runs on `pnpm build` and will fail with `file:line:column` on any banned word in any `app/**/*.tsx` file.

Banned-word audit of new copy planned in this phase:

- **Engagement card copy** (orchestrator prompt §"Engagement cards copy") — pre-checked: no banned words.
- **FAQ answers** — drafted below in §3.7; each answer scanned manually for banned-word hits. Banned-word audit summary: no hits.
- **Page-section headers** ("Selected work", "About", "Work with me", "Three ways to work", "FAQ", "Tell me what you are working on") — no hits.

### 2.7 CSS additions in `globals.css`

Phase 6 needs a small set of additional CSS rules — kept minimal because the Phase 1 design tokens + Phase 3 chrome + Phase 5 TitleCard styles already do most of the work. New blocks:

- `.foyer-page` — page outer container with the `--spacing-page-x-desktop / --spacing-page-x-mobile` horizontal rhythm and vertical breathing.
- `.foyer-hero` — hero typography for the positioning sentence (Inter Display 700, fluid `clamp()` size).
- `.foyer-section` — section spacing rhythm (96px desktop, 64px mobile vertical between sections).
- `.copper-rule` — 1px copper rule with controllable width via inline style; used below the portrait and section dividers.
- `.portrait-slot` — placeholder portrait shell.
- `.selected-work-strip` — three-column grid on desktop, single column on mobile.
- `.engagement-card` — full-width card with 1px copper hairline rule at top.
- `.faq-list` — definition-list-style Q&A pair, no accordion (per blueprint §7).
- `.contact-form` — two-input form, copper button affordance.
- `.thank-you-state` — inline replacement panel after successful submit.
- `.about-grid` — 12-col grid with 8/4 split desktop, stacked mobile.
- `.credits-list` — typographic separator list.
- `.values-list` — three numbered lines, no header.

### 2.8 Page metadata exports

Each page exports a `metadata: Metadata` with title + description ≤155 chars. Descriptions lead with noun-not-action per blueprint §8 ("Black operator in Oakland..." rather than "Helping operators..."). All scanned for banned words.

---

## 3. File contents (verbatim)

### 3.1 `lib/case-studies.ts`

```ts
// lib/case-studies.ts
//
// Phase 6 — FOYER-08 helper (and forward-compatible with CASE-10 in Phase 7).
//
// Reads frontmatter from every content/work/*.mdx file and returns a
// strongly-typed array. The Phase 6 Home selected-work strip + Work index
// both consume this; Phase 7 will extend the schema with titleCardWords
// (3-6 words) and Phase 8 will populate it with real case studies.
//
// Why gray-matter (not @next/mdx loader): we only need the frontmatter for
// listings + OG generation. Pulling MDX through the compiler for an index
// page is needless. gray-matter is already a project dependency (declared
// for Phase 7); using it here in Phase 6 amortizes the install.
//
// Why a defensive parse (not Zod yet): Phase 7 introduces the Zod schema
// (CASE-01) and instrumentation.ts validation (CASE-02). For Phase 6, the
// frontmatter format on disk is the Phase 4 stub shape, which doesn't yet
// have titleCardWords. We derive thumbnail words from `title` when absent
// so the Work index renders correctly today AND with Phase 7's richer
// schema tomorrow.
//
// Source: REQUIREMENTS.md FOYER-08, CASE-10; ARCHITECTURE.md research
//         §"MDX data flow" — Pattern hybrid (gray-matter for indexes,
//         dynamic import() for full MDX render in Phase 7).
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

export interface CaseStudyMeta {
  slug: string;
  title: string;
  dek: string;
  /** 3–6 short words for the TitleCard stack. Derived from title if frontmatter omits. */
  words: string[];
  role?: string;
  tools?: string[];
  year?: string | number;
  status?: string;
}

const CONTENT_DIR = "content/work";

/**
 * Derive a 3-word stack from a title when frontmatter `titleCardWords` is absent.
 * Phase 6 fallback. Phase 7 replaces this with a Zod-validated read.
 */
function deriveWordsFromTitle(title: string): string[] {
  const cleaned = title
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  // Pad or truncate to 3 words minimum, 6 maximum.
  if (cleaned.length >= 3) return cleaned.slice(0, 6);
  while (cleaned.length < 3) cleaned.push("CASE");
  return cleaned;
}

/**
 * Read every content/work/*.mdx file at the project root and return its
 * frontmatter as a CaseStudyMeta. Files with no frontmatter or malformed
 * YAML are skipped silently (Phase 7's Zod schema will fail the build on
 * drift; Phase 6 is intentionally tolerant so the Home renders even with
 * the Phase 4 stub).
 *
 * Sorted: status="published" first, then by year descending. Phase 6 stub
 * has status="stub" so it sorts last — when Phase 8 lands real case
 * studies with status="published", they'll naturally bubble to the top.
 */
export async function getAllCaseStudies(): Promise<CaseStudyMeta[]> {
  const dir = join(process.cwd(), CONTENT_DIR);
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }

  const studies: CaseStudyMeta[] = [];

  for (const entry of entries) {
    if (!entry.endsWith(".mdx")) continue;
    const slug = entry.replace(/\.mdx$/, "");
    try {
      const raw = await readFile(join(dir, entry), "utf-8");
      const { data } = matter(raw);
      const titleCardWords = Array.isArray(data.titleCardWords)
        ? (data.titleCardWords as string[])
        : undefined;
      const title: string =
        typeof data.title === "string" && data.title.length > 0 ? data.title : slug;
      studies.push({
        slug,
        title,
        dek: typeof data.dek === "string" ? data.dek : "",
        words: titleCardWords ?? deriveWordsFromTitle(title),
        role: typeof data.role === "string" ? data.role : undefined,
        tools: Array.isArray(data.tools) ? (data.tools as string[]) : undefined,
        year: typeof data.year === "string" || typeof data.year === "number" ? data.year : undefined,
        status: typeof data.status === "string" ? data.status : undefined,
      });
    } catch {
      // Skip unreadable files; future Phase 7 instrumentation will fail
      // the build on schema violations.
      continue;
    }
  }

  return studies.sort((a, b) => {
    const aPub = a.status === "published" ? 0 : 1;
    const bPub = b.status === "published" ? 0 : 1;
    if (aPub !== bPub) return aPub - bPub;
    const ay = typeof a.year === "number" ? a.year : Number(a.year ?? 0);
    const by = typeof b.year === "number" ? b.year : Number(b.year ?? 0);
    return by - ay;
  });
}

/**
 * Convenience: top N for the Home selected-work strip (default 3 per §7).
 */
export async function getSelectedWork(limit = 3): Promise<CaseStudyMeta[]> {
  const all = await getAllCaseStudies();
  return all.slice(0, limit);
}
```

### 3.2 `lib/contact-form-schema.ts`

```ts
// lib/contact-form-schema.ts
//
// Phase 6 — FOYER-07. Shared Zod schema for the contact form. Client uses
// the inferred type for state; Server Action uses the parser for validation.
//
// Field names match blueprint §7 wireframe exactly:
//   - "name" (Your name)
//   - "message" (What you are working on)
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
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least a sentence.")
    .max(2000, "Please trim this to under 2000 characters."),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
```

### 3.3 `app/actions/contact.ts`

```ts
// app/actions/contact.ts
//
// Phase 6 — FOYER-07. The Server Action that the /contact form posts to.
//
// Pipeline:
//   1. Parse FormData with the Zod schema (lib/contact-form-schema.ts).
//      On fail → return { ok: false, fieldErrors }.
//   2. Send a transactional email via Resend (server-only, service key).
//      On fail → return { ok: false, formError: "..." }.
//   3. Insert a row into Supabase `contact_messages` for the archive.
//      On fail → log + still return ok (the email got out, the user shouldn't
//      see the archive plumbing).
//   4. Return { ok: true } so the client renders the inline thank-you.
//
// Env vars (lazy-read so build passes without them set):
//   RESEND_API_KEY          — Phase 1 DNS submitted; Phase 10 ops sets this in Vercel
//   SUPABASE_URL            — Phase 10 ops creates the project + table
//   SUPABASE_SERVICE_ROLE_KEY — Phase 10 ops sets in Vercel
//
// If env is missing at runtime, returns a structured error instead of throwing.
// This means: Phase 6 ships a code-complete form; Phase 10 wires the env vars
// + DNS verification + Supabase table to make it live.
//
// Source: REQUIREMENTS.md FOYER-07; blueprint §7 (two-business-day reply);
//         CLAUDE.md (Resend transactional + Supabase archive, service-role
//         key server-only).
"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { contactFormSchema, type ContactFormInput } from "@/lib/contact-form-schema";

export type ContactActionState =
  | { ok: true }
  | { ok: false; fieldErrors?: Partial<Record<keyof ContactFormInput, string>>; formError?: string };

const INITIAL_STATE: ContactActionState = { ok: false };

export async function contactAction(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  // 1. Parse
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "message") {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, fieldErrors };
  }

  const { name, message } = parsed.data;

  // 2. Env read (lazy — build passes without these)
  const resendKey = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!resendKey) {
    return {
      ok: false,
      formError:
        "The contact pipeline is not yet wired up. Please email hello@micahjonesconsulting.com.",
    };
  }

  // 3. Send via Resend
  try {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Micah Jones <hello@micahjonesconsulting.com>",
      to: ["hello@micahjonesconsulting.com"],
      replyTo: undefined,
      subject: `New note from ${name}`,
      text: `From: ${name}\n\n${message}`,
    });
  } catch (err) {
    console.error("[contact] Resend failed:", err);
    return {
      ok: false,
      formError:
        "Could not send the note right now. Please email hello@micahjonesconsulting.com.",
    };
  }

  // 4. Archive to Supabase (best-effort; do not fail the user on archive error)
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error } = await supabase
        .from("contact_messages")
        .insert({ name, message, created_at: new Date().toISOString() });
      if (error) {
        console.error("[contact] Supabase insert failed:", error.message);
      }
    } catch (err) {
      console.error("[contact] Supabase archive crashed:", err);
    }
  }

  return { ok: true };
}
```

### 3.4 `app/(foyer)/page.tsx` — Home

```tsx
// app/(foyer)/page.tsx
//
// Phase 6 — FOYER-02 + FOYER-03. Replaces the Phase 4 stub.
//
// Renders, in order per blueprint §7:
//   1. Hero positioning sentence + subline (FOYER-03 verbatim)
//   2. Full-bleed portrait slot with copper rule below (Phase 9 fills image)
//   3. Selected-work strip — three TitleCardComposition thumbnails reading
//      content/work/*.mdx via lib/case-studies.ts (FOYER-08 supporting data)
//   4. About teaser — 100-word excerpt + → about link
//   5. Work With Me teaser — three-line summary + → work with me link
//   6. Contact CTA — single → contact line
//
// Server Component. No client state. The Home does NOT consume <TitleCard>
// (the client/GSAP version) — that would fire the signature motion three
// times on the Home, turning the move into noise. Selected-work thumbnails
// render via the static <TitleCardComposition phase="stacked">.
//
// Source: blueprint §7 (Home wireframe), §8 (hero copy verbatim);
//         REQUIREMENTS.md FOYER-02, FOYER-03, FOYER-08;
//         Phase 5 RESEARCH §2.1 (composition reusable as static thumbnail).
import type { Metadata } from "next";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { TitleCardComposition } from "@/components/TitleCardComposition";
import { getSelectedWork } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Micah Jones — Oakland operator",
  description:
    "Oakland operator who builds the systems other people promise to build, and ships them. Product, growth, and consulting work for founders and birth-worker practices.",
};

export default async function FoyerHomePage() {
  const selected = await getSelectedWork(3);

  return (
    <div className="foyer-page">
      {/* HERO — FOYER-03 verbatim per blueprint §8 */}
      <section className="foyer-section foyer-section--hero">
        <h1 className="foyer-hero">
          I help operators ship the work the rest of their org keeps stalling on.
        </h1>
        <p className="foyer-hero-subline">— product · growth · consulting. Oakland, CA.</p>
      </section>

      {/* PORTRAIT SLOT — Phase 9 fills with portrait-main.jpg */}
      <section className="foyer-section foyer-section--portrait">
        <div className="portrait-slot portrait-slot--full-bleed" aria-hidden>
          <span className="portrait-slot__label">portrait — Oakland — coming Day 7–14</span>
        </div>
        <hr className="copper-rule" aria-hidden />
      </section>

      {/* SELECTED WORK STRIP — three TitleCardComposition thumbnails */}
      <section className="foyer-section foyer-section--selected-work">
        <h2 className="foyer-eyebrow">selected work</h2>
        <ul className="selected-work-strip">
          {selected.map((study, i) => (
            <li key={study.slug} className="selected-work-card">
              <ViewTransitionLink
                href={`/work/${study.slug}`}
                className="selected-work-card__link"
              >
                <span className="selected-work-card__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <TitleCardComposition
                  words={study.words}
                  caption={study.dek || study.title}
                  phase="stacked"
                />
              </ViewTransitionLink>
            </li>
          ))}
        </ul>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/work" className="foyer-link">
            → all work
          </ViewTransitionLink>
        </p>
      </section>

      {/* ABOUT TEASER — 100-word excerpt */}
      <section className="foyer-section foyer-section--about-teaser">
        <h2 className="foyer-eyebrow">about</h2>
        <p className="foyer-teaser-body">
          I started as a positioning researcher at Guardicore (acquired by Akamai), where the
          work I did on a single message moved the average deal size up by $150K. Now I run my
          own shop in Oakland — half consulting, half product. The product half means ORDANI,
          a HIPAA-compliant CRM I built solo for the people who keep Black women alive in
          childbirth.
        </p>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/about" className="foyer-link">
            → about
          </ViewTransitionLink>
        </p>
      </section>

      {/* WORK WITH ME TEASER — three one-liners */}
      <section className="foyer-section foyer-section--work-with-me-teaser">
        <h2 className="foyer-eyebrow">work with me</h2>
        <ul className="engagement-summary">
          <li>
            <span className="engagement-summary__name">Strategy Sprint</span> — 2 to 4 weeks,
            one deliverable.
          </li>
          <li>
            <span className="engagement-summary__name">Embed</span> — 8 to 12 weeks, fractional
            PM or growth partner.
          </li>
          <li>
            <span className="engagement-summary__name">Build</span> — custom Next.js + Supabase
            work.
          </li>
        </ul>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/work-with-me" className="foyer-link">
            → work with me
          </ViewTransitionLink>
        </p>
      </section>

      {/* CONTACT CTA — single line */}
      <section className="foyer-section foyer-section--contact-cta">
        <p className="foyer-contact-cta">
          Have something that needs shipping? Write to me.
        </p>
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/contact" className="foyer-link foyer-link--bold">
            → contact
          </ViewTransitionLink>
        </p>
      </section>
    </div>
  );
}
```

### 3.5 `app/(foyer)/about/page.tsx`

```tsx
// app/(foyer)/about/page.tsx
//
// Phase 6 — FOYER-04 + FOYER-05.
//
// Two-column layout per blueprint §7:
//   LEFT (8 col): the 150-word about paragraph verbatim from §8.
//   RIGHT (4 col): vertical portrait slot (Phase 9) + Oakland sub-caption
//                  + two-line credit list (Guardicore/Akamai · Flexport ·
//                  SurveyMonkey · Cuebiq).
// Followed by:
//   - Oakland family-context single-paragraph.
//   - Three numbered values: 01 ship the work / 02 trust the operator /
//                            03 show the receipts.
//
// All copy verbatim. The "drive" word from blueprint's "drive" (banned) is
// NOT in the §8 paragraph. The §8 paragraph is pre-vetted against the
// 30-word banned list — I scanned every word in §8 against lib/banned.ts.
//
// Source: blueprint §7 (About wireframe), §8 (150-word paragraph verbatim,
//         values: ship the work / trust the operator / show the receipts);
//         REQUIREMENTS.md FOYER-04, FOYER-05.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Black operator in Oakland. Half consulting, half product. Built ORDANI solo for the doula market. Worked at Akamai, Flexport, SurveyMonkey, and Cuebiq.",
};

export default function AboutPage() {
  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--about-hero">
        <h1 className="foyer-hero foyer-hero--secondary">
          I build the things I used to ask other people to build.
        </h1>
      </section>

      <section className="foyer-section foyer-section--about-grid">
        <div className="about-grid">
          {/* LEFT 8 col — 150-word paragraph verbatim per blueprint §8 */}
          <div className="about-grid__long-form">
            <p className="foyer-prose">
              I&apos;m Micah. I started as a positioning researcher at Guardicore (acquired by
              Akamai), where the work I did on a single message moved the average deal size up
              by $150K. I&apos;ve worked at Flexport, SurveyMonkey, and Cuebiq. Now I run my
              own shop in Oakland — half consulting, half product. The consulting half means
              a small number of operators every quarter: HR consultants, nonprofit leaders,
              birth workers, creators. The product half means ORDANI, a HIPAA-compliant CRM I
              built solo for the people who keep Black women alive in childbirth. I&apos;m a
              Black founder, a father, and someone who would rather show you a working thing
              than a slide about a working thing. Most of my best work happens at night, after
              the house goes quiet. If you have something that needs shipping and you&apos;re
              tired of the meeting tax, write to me.
            </p>
          </div>

          {/* RIGHT 4 col — vertical portrait + credits */}
          <aside className="about-grid__column">
            <div className="portrait-slot portrait-slot--column" aria-hidden>
              <span className="portrait-slot__label">portrait — coming Day 7–14</span>
            </div>
            <p className="about-grid__sub-caption">Oakland, CA.</p>
            <ul className="credits-list">
              <li>guardicore / akamai</li>
              <li>flexport</li>
              <li>surveymonkey</li>
              <li>cuebiq</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* OAKLAND FAMILY CONTEXT */}
      <section className="foyer-section foyer-section--family">
        <p className="foyer-prose foyer-prose--narrow">
          Lives in Oakland with his family. Father of two. Builds at night, after the house
          goes quiet. Owns more receipts than slides.
        </p>
      </section>

      {/* VALUES — three numbered lines, no header */}
      <section className="foyer-section foyer-section--values">
        <ol className="values-list">
          <li>
            <span className="values-list__num">01</span> ship the work
          </li>
          <li>
            <span className="values-list__num">02</span> trust the operator
          </li>
          <li>
            <span className="values-list__num">03</span> show the receipts
          </li>
        </ol>
      </section>
    </div>
  );
}
```

### 3.6 `app/(foyer)/work-with-me/page.tsx`

```tsx
// app/(foyer)/work-with-me/page.tsx
//
// Phase 6 — FOYER-06.
//
// Three stacked engagement cards per blueprint §7:
//   01 STRATEGY SPRINT — 2–4 weeks, one deliverable
//   02 EMBED — 8–12 weeks, fractional, two days/week
//   03 BUILD — custom Next.js + Supabase
//
// Plus four-question FAQ per blueprint §7 + answers drafted within the
// scope the orchestrator prompt explicitly granted.
//
// All copy scanned against lib/banned.ts; zero banned-word hits. The
// engagement card copy comes verbatim from the orchestrator prompt's
// §"Engagement cards copy" block.
//
// Source: blueprint §7 (Work With Me wireframe + four FAQ questions);
//         REQUIREMENTS.md FOYER-06; orchestrator prompt §"Engagement cards
//         copy" + §"FAQ questions".
import type { Metadata } from "next";
import { ViewTransitionLink } from "@/components/view-transition-link";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Three ways to work with Micah Jones: a 2–4 week Strategy Sprint, an 8–12 week Embed, or a custom Build on Next.js and Supabase.",
};

export default function WorkWithMePage() {
  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--wwm-hero">
        <h1 className="foyer-hero foyer-hero--secondary">
          Three ways to work. One of them probably fits.
        </h1>
      </section>

      {/* ENGAGEMENT CARDS — stacked, not gridded */}
      <section className="foyer-section foyer-section--engagement">
        <ul className="engagement-stack">
          <li className="engagement-card">
            <div className="engagement-card__head">
              <span className="engagement-card__num">01</span>
              <h2 className="engagement-card__name">Strategy Sprint</h2>
              <span className="engagement-card__meta">2–4 weeks · one deliverable</span>
            </div>
            <p className="engagement-card__body">
              Two to four weeks. One deliverable. Positioning, growth audit, or launch plan.
              Best for solo operators who need a second brain for a fortnight.
            </p>
          </li>
          <li className="engagement-card">
            <div className="engagement-card__head">
              <span className="engagement-card__num">02</span>
              <h2 className="engagement-card__name">Embed</h2>
              <span className="engagement-card__meta">8–12 weeks · two days a week</span>
            </div>
            <p className="engagement-card__body">
              Eight to twelve weeks. I sit inside the team as a fractional PM, growth, or
              consulting partner. Two days a week. Best for three to ten person teams.
            </p>
          </li>
          <li className="engagement-card">
            <div className="engagement-card__head">
              <span className="engagement-card__num">03</span>
              <h2 className="engagement-card__name">Build</h2>
              <span className="engagement-card__meta">custom scope</span>
            </div>
            <p className="engagement-card__body">
              Custom scope. I design and build the thing — usually a CRM, intake system, or
              onboarding flow. Next.js, Supabase, Vercel.
            </p>
          </li>
        </ul>
      </section>

      {/* FAQ — four questions per blueprint §7 */}
      <section className="foyer-section foyer-section--faq">
        <h2 className="foyer-eyebrow">FAQ</h2>
        <dl className="faq-list">
          <div className="faq-list__pair">
            <dt className="faq-list__q">How much do you charge?</dt>
            <dd className="faq-list__a">
              Strategy Sprints start in the low five figures. Embeds and Builds get a fixed
              monthly rate after a free 30-minute scoping call. No retainers without scope.
            </dd>
          </div>
          <div className="faq-list__pair">
            <dt className="faq-list__q">Do you take equity?</dt>
            <dd className="faq-list__a">
              Sometimes, for a portion of fee. Cash first, then a small grant if the company
              is one I would have invested in. Never the whole bill.
            </dd>
          </div>
          <div className="faq-list__pair">
            <dt className="faq-list__q">Will you sign an NDA before talking?</dt>
            <dd className="faq-list__a">
              Yes. Send it. A one-page mutual NDA gets signed inside the day. I keep client
              names confidential by default; the case studies on this site name only what the
              client has approved.
            </dd>
          </div>
          <div className="faq-list__pair">
            <dt className="faq-list__q">What if I am not technical?</dt>
            <dd className="faq-list__a">
              Most of my best clients are not technical. I translate between operator
              instinct and engineering reality. You bring the problem; I write the brief and
              ship the work.
            </dd>
          </div>
        </dl>
      </section>

      {/* CTA */}
      <section className="foyer-section foyer-section--wwm-cta">
        <p className="foyer-section__cta">
          <ViewTransitionLink href="/contact" className="foyer-link foyer-link--bold">
            → contact
          </ViewTransitionLink>
        </p>
      </section>
    </div>
  );
}
```

### 3.7 `app/(foyer)/contact/page.tsx`

```tsx
// app/(foyer)/contact/page.tsx
//
// Phase 6 — FOYER-07.
//
// Client component (because of useActionState for the inline thank-you).
// Two-field form per blueprint §7:
//   - "Your name"
//   - "What you are working on"
// Submits to app/actions/contact.ts.
//
// Below form: direct email link as alternate per blueprint §7.
//
// "use client" is required for useActionState; the Server Action import is
// fine — Next.js will mark the action as RPC and only ship a serialized
// reference to the client.
//
// Source: blueprint §7 (Contact wireframe + header copy);
//         REQUIREMENTS.md FOYER-07; React 19 useActionState pattern.
"use client";

import { useActionState } from "react";
import { contactAction, type ContactActionState } from "@/app/actions/contact";

const INITIAL_STATE: ContactActionState = { ok: false };

export default function ContactPage() {
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(
    contactAction,
    INITIAL_STATE,
  );

  if (state.ok) {
    return (
      <div className="foyer-page">
        <section className="foyer-section foyer-section--contact-thanks">
          <div className="thank-you-state">
            <h1 className="foyer-hero foyer-hero--secondary">Got it.</h1>
            <p className="foyer-prose">
              I read every message and reply inside two business days. Talk soon.
            </p>
            <p className="foyer-prose">
              <a href="mailto:hello@micahjonesconsulting.com" className="foyer-link">
                hello@micahjonesconsulting.com
              </a>
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--contact-hero">
        <h1 className="foyer-hero foyer-hero--secondary">
          Tell me what you are working on.
        </h1>
        <p className="foyer-prose">
          I read every message and reply inside two business days.
        </p>
      </section>

      <section className="foyer-section foyer-section--contact-form">
        <form action={formAction} className="contact-form" noValidate>
          <div className="contact-form__field">
            <label htmlFor="contact-name" className="contact-form__label">
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              className="contact-form__input"
              aria-invalid={Boolean(!state.ok && state.fieldErrors?.name)}
              aria-describedby={
                !state.ok && state.fieldErrors?.name ? "contact-name-error" : undefined
              }
            />
            {!state.ok && state.fieldErrors?.name ? (
              <p id="contact-name-error" className="contact-form__error" role="alert">
                {state.fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div className="contact-form__field">
            <label htmlFor="contact-message" className="contact-form__label">
              What you are working on
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              className="contact-form__input contact-form__input--textarea"
              aria-invalid={Boolean(!state.ok && state.fieldErrors?.message)}
              aria-describedby={
                !state.ok && state.fieldErrors?.message ? "contact-message-error" : undefined
              }
            />
            {!state.ok && state.fieldErrors?.message ? (
              <p id="contact-message-error" className="contact-form__error" role="alert">
                {state.fieldErrors.message}
              </p>
            ) : null}
          </div>

          {!state.ok && state.formError ? (
            <p className="contact-form__error contact-form__error--form" role="alert">
              {state.formError}
            </p>
          ) : null}

          <button type="submit" disabled={pending} className="contact-form__submit">
            {pending ? "sending…" : "→ send"}
          </button>
        </form>

        <p className="foyer-prose foyer-prose--alt">
          Or email me directly:{" "}
          <a href="mailto:hello@micahjonesconsulting.com" className="foyer-link">
            hello@micahjonesconsulting.com
          </a>
        </p>
      </section>
    </div>
  );
}
```

### 3.8 `app/(foyer)/work/page.tsx` — Work index

```tsx
// app/(foyer)/work/page.tsx
//
// Phase 6 — FOYER-08.
//
// Lists every case study from content/work/*.mdx as a TitleCardComposition
// thumbnail with a ViewTransitionLink wrapper. Uses lib/case-studies.ts —
// which Phase 7 will extend with a Zod schema and Phase 8 will populate
// with real case studies. For Phase 6, only test-slug.mdx is present, so
// the Work index renders a single thumbnail.
//
// Thumbnails use TitleCardComposition (static, server-safe) NOT TitleCard
// (client + GSAP). The pin animation fires on the case-study page itself,
// not here. This preserves the one-signature-motion rule.
//
// Source: blueprint §6 (Work index page type), §7 (TitleCard thumbnails
//         hinted via §4f); REQUIREMENTS.md FOYER-08; Phase 5 RESEARCH §2.1.
import type { Metadata } from "next";
import { ViewTransitionLink } from "@/components/view-transition-link";
import { TitleCardComposition } from "@/components/TitleCardComposition";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Micah Jones — solo product work, growth research, and consulting engagements for founders and birth-worker practices.",
};

export default async function WorkIndexPage() {
  const studies = await getAllCaseStudies();

  return (
    <div className="foyer-page">
      <section className="foyer-section foyer-section--work-hero">
        <h1 className="foyer-hero foyer-hero--secondary">Work</h1>
        <p className="foyer-prose">
          Case studies of shipped work. Each one names what was built, for whom, and what
          changed.
        </p>
      </section>

      <section className="foyer-section foyer-section--work-grid">
        {studies.length === 0 ? (
          <p className="foyer-prose">Case studies arriving shortly.</p>
        ) : (
          <ul className="work-index-grid">
            {studies.map((study) => (
              <li key={study.slug} className="work-index-card">
                <ViewTransitionLink
                  href={`/work/${study.slug}`}
                  className="work-index-card__link"
                  aria-label={`${study.title} — ${study.dek || "case study"}`}
                >
                  <TitleCardComposition
                    words={study.words}
                    caption={study.dek || study.title}
                    phase="stacked"
                  />
                  <div className="work-index-card__meta">
                    <span className="work-index-card__title">{study.title}</span>
                    {study.dek ? (
                      <span className="work-index-card__dek">{study.dek}</span>
                    ) : null}
                  </div>
                </ViewTransitionLink>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
```

### 3.9 `.env.example`

```
# Phase 1 submitted Resend DNS verification. Phase 10 sets this in Vercel.
# Get from https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Phase 10 creates the Supabase project and contact_messages table.
# Get from https://supabase.com/dashboard/project/_/settings/api
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3.10 CSS additions to `app/globals.css`

Appended at the bottom of the existing file (after the TitleCard block). The additions are scoped to `[data-mode="foyer"]` descendants where they're mode-dependent.

```css
/* ============================================================
 * FOYER PAGES — Phase 6 (FOYER-02..08)
 *
 * Page-level rhythm + page-specific compositions for Home, About,
 * Work With Me, Contact, Work index. All within data-mode="foyer".
 * ============================================================ */

[data-mode="foyer"] .foyer-page {
  padding: 64px var(--spacing-page-x-mobile) 128px;
  max-width: 100%;
}

@media (min-width: 768px) {
  [data-mode="foyer"] .foyer-page {
    padding: 96px var(--spacing-page-x-desktop) 160px;
  }
}

[data-mode="foyer"] .foyer-section {
  margin-bottom: 80px;
}

@media (min-width: 768px) {
  [data-mode="foyer"] .foyer-section {
    margin-bottom: 128px;
  }
}

[data-mode="foyer"] .foyer-section:last-child {
  margin-bottom: 0;
}

[data-mode="foyer"] .foyer-hero {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(36px, 6vw, 72px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  max-width: 22ch;
  margin: 0;
  color: var(--color-foyer-ink);
}

[data-mode="foyer"] .foyer-hero--secondary {
  font-size: clamp(32px, 5vw, 56px);
  max-width: 24ch;
}

[data-mode="foyer"] .foyer-hero-subline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 18px;
  margin-top: 24px;
  color: var(--color-foyer-ink-soft);
}

[data-mode="foyer"] .foyer-eyebrow {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-foyer-ink-soft);
  margin: 0 0 32px;
}

[data-mode="foyer"] .foyer-prose {
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.7;
  max-width: var(--measure-body);
  margin: 0;
  color: var(--color-foyer-ink);
}

[data-mode="foyer"] .foyer-prose--narrow {
  max-width: 56ch;
}

[data-mode="foyer"] .foyer-prose--alt {
  margin-top: 48px;
  color: var(--color-foyer-ink-soft);
}

[data-mode="foyer"] .foyer-teaser-body {
  font-family: var(--font-sans);
  font-size: 19px;
  line-height: 1.7;
  max-width: 62ch;
  color: var(--color-foyer-ink);
  margin: 0;
}

[data-mode="foyer"] .foyer-section__cta {
  margin-top: 32px;
  font-size: 0.95rem;
}

[data-mode="foyer"] .foyer-contact-cta {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 22px;
  margin: 0;
  color: var(--color-foyer-ink);
}

[data-mode="foyer"] .foyer-link {
  color: var(--color-accent-copper-deep);
  text-decoration: none;
  font-weight: 500;
  transition: opacity var(--duration-hover) var(--ease-hover);
}

[data-mode="foyer"] .foyer-link:hover {
  opacity: 0.72;
}

[data-mode="foyer"] .foyer-link--bold {
  font-weight: 600;
  font-size: 1.05rem;
}

/* PORTRAIT SLOT (Phase 9 fills with next/image) */
[data-mode="foyer"] .portrait-slot {
  position: relative;
  width: 100%;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-foyer-paper) 95%, var(--color-foyer-ink) 5%) 0%,
    color-mix(in srgb, var(--color-foyer-paper) 90%, var(--color-foyer-ink) 10%) 100%
  );
  border: 1px solid var(--color-rule-foyer);
  display: flex;
  align-items: center;
  justify-content: center;
}

[data-mode="foyer"] .portrait-slot--full-bleed {
  aspect-ratio: 16 / 9;
}

@media (min-width: 768px) {
  [data-mode="foyer"] .portrait-slot--full-bleed {
    aspect-ratio: 21 / 9;
  }
}

[data-mode="foyer"] .portrait-slot--column {
  aspect-ratio: 4 / 5;
  max-width: 360px;
}

[data-mode="foyer"] .portrait-slot__label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-foyer-ink-soft);
  opacity: 0.55;
}

[data-mode="foyer"] .copper-rule {
  border: none;
  border-top: 1px solid var(--color-accent-copper);
  margin: 32px 0 0;
  max-width: 320px;
}

/* SELECTED WORK STRIP (Home) */
[data-mode="foyer"] .selected-work-strip {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 768px) {
  [data-mode="foyer"] .selected-work-strip {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

[data-mode="foyer"] .selected-work-card {
  position: relative;
  border-top: 1px solid var(--color-rule-foyer);
  padding-top: 24px;
  transition: transform var(--duration-hover) var(--ease-hover);
}

[data-mode="foyer"] .selected-work-card:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  [data-mode="foyer"] .selected-work-card:hover {
    transform: none;
  }
}

[data-mode="foyer"] .selected-work-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

[data-mode="foyer"] .selected-work-card__index {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--color-accent-copper-deep);
  margin-bottom: 16px;
}

/* Scope down the TitleCardComposition inside selected-work cards: thumbnails
   should not occupy 100dvh — they live inside a card. */
[data-mode="foyer"] .selected-work-card [data-title-card] {
  min-height: 0;
  padding: 0;
}

[data-mode="foyer"] .selected-work-card .title-card-word {
  font-size: 28px;
  letter-spacing: -0.01em;
}

[data-mode="foyer"] .selected-work-card .title-card-resolved {
  display: none;
}

/* WORK WITH ME teaser summary (Home) */
[data-mode="foyer"] .engagement-summary {
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.8;
  color: var(--color-foyer-ink);
}

[data-mode="foyer"] .engagement-summary__name {
  font-weight: 600;
  color: var(--color-accent-copper-deep);
}

/* ABOUT GRID (8/4 desktop, stacked mobile) */
[data-mode="foyer"] .about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
}

@media (min-width: 960px) {
  [data-mode="foyer"] .about-grid {
    grid-template-columns: 8fr 4fr;
    gap: 80px;
    align-items: start;
  }
}

[data-mode="foyer"] .about-grid__long-form .foyer-prose {
  font-size: 19px;
  max-width: 62ch;
}

[data-mode="foyer"] .about-grid__column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

[data-mode="foyer"] .about-grid__sub-caption {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 15px;
  color: var(--color-foyer-ink-soft);
  margin: 0;
}

[data-mode="foyer"] .credits-list {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  font-family: var(--font-sans);
  font-size: 14px;
  letter-spacing: 0.02em;
  color: var(--color-foyer-ink-soft);
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--color-rule-foyer);
  padding-top: 16px;
}

/* VALUES list (About) */
[data-mode="foyer"] .values-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-display);
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 600;
  color: var(--color-foyer-ink);
}

[data-mode="foyer"] .values-list__num {
  display: inline-block;
  min-width: 2.5em;
  color: var(--color-accent-copper-deep);
  font-weight: 500;
}

/* ENGAGEMENT cards (Work With Me) */
[data-mode="foyer"] .engagement-stack {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

[data-mode="foyer"] .engagement-card {
  border-top: 1px solid var(--color-accent-copper);
  padding-top: 32px;
}

[data-mode="foyer"] .engagement-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 16px;
}

[data-mode="foyer"] .engagement-card__num {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-accent-copper-deep);
}

[data-mode="foyer"] .engagement-card__name {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  margin: 0;
  color: var(--color-foyer-ink);
}

[data-mode="foyer"] .engagement-card__meta {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 15px;
  color: var(--color-foyer-ink-soft);
}

[data-mode="foyer"] .engagement-card__body {
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.7;
  max-width: 62ch;
  margin: 0;
  color: var(--color-foyer-ink);
}

/* FAQ (Work With Me) */
[data-mode="foyer"] .faq-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

[data-mode="foyer"] .faq-list__pair {
  border-top: 1px solid var(--color-rule-foyer);
  padding-top: 24px;
}

[data-mode="foyer"] .faq-list__q {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: var(--color-foyer-ink);
  margin: 0 0 12px;
}

[data-mode="foyer"] .faq-list__a {
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.7;
  max-width: 62ch;
  margin: 0;
  color: var(--color-foyer-ink-soft);
}

/* CONTACT form */
[data-mode="foyer"] .contact-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 56ch;
}

[data-mode="foyer"] .contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

[data-mode="foyer"] .contact-form__label {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--color-foyer-ink-soft);
  text-transform: lowercase;
}

[data-mode="foyer"] .contact-form__input {
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 1.5;
  color: var(--color-foyer-ink);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-foyer-ink-soft);
  padding: 8px 0;
  outline: none;
  transition: border-color var(--duration-hover) var(--ease-hover);
}

[data-mode="foyer"] .contact-form__input:focus {
  border-bottom-color: var(--color-accent-copper);
  outline: 2px solid transparent;
  outline-offset: 2px;
}

[data-mode="foyer"] .contact-form__input:focus-visible {
  outline-color: var(--color-accent-copper);
}

[data-mode="foyer"] .contact-form__input--textarea {
  resize: vertical;
  min-height: 140px;
  border: 1px solid var(--color-foyer-ink-soft);
  padding: 12px;
  font-family: inherit;
}

[data-mode="foyer"] .contact-form__input--textarea:focus {
  border-color: var(--color-accent-copper);
  border-bottom-color: var(--color-accent-copper);
}

[data-mode="foyer"] .contact-form__error {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-accent-copper-deep);
  margin: 0;
}

[data-mode="foyer"] .contact-form__error--form {
  border-top: 1px solid var(--color-accent-copper);
  padding-top: 12px;
}

[data-mode="foyer"] .contact-form__submit {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-foyer-ink);
  background: transparent;
  border: 1px solid var(--color-accent-copper);
  padding: 14px 28px;
  align-self: flex-start;
  cursor: pointer;
  transition:
    border-width var(--duration-hover) var(--ease-hover),
    background-color var(--duration-hover) var(--ease-hover);
}

[data-mode="foyer"] .contact-form__submit:hover {
  border-width: 2px;
  padding: 13px 27px;
}

[data-mode="foyer"] .contact-form__submit:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

[data-mode="foyer"] .contact-form__submit:focus-visible {
  outline: 2px solid var(--color-accent-copper);
  outline-offset: 3px;
}

[data-mode="foyer"] .thank-you-state {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 56ch;
}

/* WORK INDEX grid */
[data-mode="foyer"] .work-index-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;
}

@media (min-width: 768px) {
  [data-mode="foyer"] .work-index-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;
  }
}

@media (min-width: 1200px) {
  [data-mode="foyer"] .work-index-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

[data-mode="foyer"] .work-index-card {
  border-top: 1px solid var(--color-rule-foyer);
  padding-top: 32px;
}

[data-mode="foyer"] .work-index-card__link {
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-decoration: none;
  color: inherit;
  transition: transform var(--duration-hover) var(--ease-hover);
}

[data-mode="foyer"] .work-index-card__link:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  [data-mode="foyer"] .work-index-card__link:hover {
    transform: none;
  }
}

/* Scope down TitleCardComposition inside work-index thumbnails:
   thumbnails should not be 100dvh tall here either. */
[data-mode="foyer"] .work-index-card [data-title-card] {
  min-height: 0;
  padding: 0;
}

[data-mode="foyer"] .work-index-card .title-card-word {
  font-size: 36px;
  letter-spacing: -0.015em;
}

@media (min-width: 768px) {
  [data-mode="foyer"] .work-index-card .title-card-word {
    font-size: 44px;
  }
}

[data-mode="foyer"] .work-index-card .title-card-resolved {
  display: none;
}

[data-mode="foyer"] .work-index-card__meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

[data-mode="foyer"] .work-index-card__title {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-copper-deep);
  font-weight: 600;
}

[data-mode="foyer"] .work-index-card__dek {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-foyer-ink-soft);
}
```

---

## 4. Wave plan

The Phase 6 plans dispatch in four waves:

- **Wave 1 (helpers — no dependencies):** 06-A (`lib/case-studies.ts` + `lib/contact-form-schema.ts`).
- **Wave 2 (pages reading helpers — depends on Wave 1):** 06-B (Home), 06-C (About — no helper dep but parallelized for time), 06-D (Work With Me), 06-F (Work index). Four parallel writes.
- **Wave 3 (parallel with Wave 2 — depends on Wave 1 only):** 06-E (Contact page + Server Action + `.env.example`).
- **Wave 4 (verify — depends on all prior waves):** 06-G (typecheck + build + copy-lint + dev-server smoke check + Chrome DevTools screenshots).

CSS additions to `globals.css` are appended as part of 06-B's plan (since the Home consumes the most foyer-page styles, and a single append-to-file change avoids three concurrent diffs to the same file).

---

## 5. Banned-word audit summary

Every visible string on every new page scanned manually against `lib/banned.ts`. Results:

- Blueprint §8 verbatim paragraphs: **clean** (the blueprint copy is pre-vetted).
- Engagement card descriptions from orchestrator prompt: **clean** ("second brain" is not banned; "fortnight" is not banned).
- FAQ answers (newly drafted): **clean** ("translate", "name confidential", "operator instinct", "ship" all permitted).
- Page metadata `description`: **clean** ("operator", "Black operator in Oakland", "shipped", "case studies").
- Section headers ("selected work", "about", "work with me", "FAQ", "Work", "Tell me what you are working on"): **clean**.

The build-time `pnpm build` scanner will fail with `file:line:column` if anything slipped through; verify gate is binding.

---

## 6. Verification matrix (06-G)

1. `pnpm typecheck` — zero errors. New files type-check against existing dep declarations.
2. `pnpm lint:copy` — zero banned-word findings.
3. `pnpm build` — succeeds, copy-lint scanner clean, Next.js page bundle output shows the new routes prerendered.
4. `pnpm dev` — server starts on port 3000.
5. Chrome DevTools MCP screenshots at 1440px for: `/`, `/about`, `/work-with-me`, `/contact`, `/work`. Saved to `.planning/phases/06-foyer-pages/verification-artifacts/`.
6. Contact form smoke check: GET `/contact` renders the form. Server Action's structured-error response on missing env vars is documented (no integration test against Resend in this phase; that's Phase 10 ops).
7. Lighthouse audit on `/` if `chrome-devtools-cli` is available; Performance score captured. Below-95 noted as Phase 10 hardening item per ROADMAP.

---

*Phase 6 research complete: 2026-05-14.*
