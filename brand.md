# Brand — EWA

_Status: active_

EWA sells courses for personal transformation — yoga, breathwork, personality
development. Audience is a learner mid-habit, not a buyer mid-funnel: the UI's
job is to get them back into the lesson they already started.

**Category:** consumer / education · wellness
**Mood:** calm · premium
**References:** Masterclass (editorial, cinematic, course-catalog), Mindvalley (aspirational violet, gradient-forward)

---

## Palette — Velvet Violet

_premium · bold · aspirational_

Deep violet against near-black, or violet on near-white paper. Reads as
"transformation" without the wellness-pastel cliché, and holds up next to
video thumbnails — which a course product is mostly made of.

### Seeds

| Role | Light | Dark |
|---|---|---|
| bg-base | `oklch(0.98 0.008 300)` · `#F9F7FD` | `oklch(0.12 0.03 300)` · `#07040F` |
| bg-elevated | `oklch(1 0 0)` · `#FFFFFF` | `oklch(0.17 0.035 300)` · `#120C1C` |
| primary | `oklch(0.5 0.2 300)` · `#773AC1` | `oklch(0.68 0.2 300)` · `#AD74FF` |
| primary-soft | `oklch(0.72 0.14 300)` · `#B28FEF` | `oklch(0.82 0.14 300)` · `#D2AEFF` |
| fg-base | `oklch(0.18 0.02 300)` · `#131019` | `oklch(0.97 0.01 300)` · `#F6F4FB` |

Full shadcn token set lives in `src/app/globals.css` under `:root` and `.dark`.
Both modes derive from the same seeds — same brand, different time of day.

### Contrast

Every foreground/background pair passes WCAG AA (body 4.5:1, large text and
icons 3:1), verified with OKLCH→sRGB math. Dark-mode primary was lightened one
step during generation because white-on-violet sat at 2.9:1; the button label
is now near-black (`oklch(0.12 0 0)`), not white. Don't flip it back.

---

## Typography — Inter + JetBrains Mono

Wired in `src/app/fonts.ts` via `next/font/google` (self-hosted at build time,
no layout shift). `--font-sans` maps to Inter, `--font-mono` to JetBrains Mono
in the `@theme inline` block of `globals.css`.

Inter carries the UI. JetBrains Mono is for numbers only — lesson durations,
streak counts, progress percentages, prices — anything that should not jitter
as it updates. Use `font-mono tabular-nums` together.

Note: `fonts.ts` also loads Poppins, Lexend, Montserrat and Roboto at 5 weights
each. That's the font-comparison page's doing, not the brand's. Trim it once
the comparison page is gone — five unused families is a real payload cost.

### Type scale

| Role | Class | Use |
|---|---|---|
| Display | `text-5xl font-semibold tracking-tight` | Hero only, one per page |
| H1 | `text-3xl font-semibold tracking-tight` | Page title |
| H2 | `text-xl font-semibold` | Section breaks |
| H3 | `text-base font-medium` | Card titles |
| Body | `text-sm` | Default UI text |
| Reading | `text-base leading-7` | Lesson copy, long-form |
| Small | `text-xs text-muted-foreground` | Meta, timestamps |
| Numbers | `font-mono tabular-nums` | Durations, streaks, prices |

---

## Gradients

Two, no more. Defined per-mode in `globals.css`, exposed as utilities.

- `.bg-gradient-brand` — 135°, background hue shifted +15°. Depth for hero
  sections and page headers. Should be almost invisible on a phone.
- `.bg-gradient-accent` — violet → magenta (H 300→340). Hero CTAs, feature
  card headers, pricing highlights.

Don't put the accent gradient behind body text without checking **both** stops
against the text color first. Gradients and text contrast fight, and the
gradient wins. The hero (`src/components/hero.tsx`) is the sanctioned
exception: `--primary-foreground` measures 6.27:1 and 5.79:1 on the two light
stops, 6.50:1 and 6.92:1 on the dark ones.

---

## Voice

Direct and second-person. "Resume lesson", not "Continue your learning
journey." The user is mid-practice; don't make them read.

Calm, not clinical. Wellness copy fails in two directions — cold SaaS
("Manage your enrollments") or incense-cloud vagueness ("Awaken your inner
potential"). Stay concrete: name the module, name the minutes left.

Earn the premium, don't announce it. The palette and the type already say
"this costs money." Copy that also says it reads as insecure.

---

## Dos and don'ts

- **Do** use tokens: `bg-background`, `text-foreground`, `border-border`,
  `bg-primary`. Never hardcode `#773AC1` or `bg-white`.
- **Do** keep `dark:` variants working — the `@custom-variant dark` rule in
  `globals.css` binds them to the `.dark` class the ThemeProvider toggles, not
  to the OS setting.
- **Don't** add a third gradient or a second accent hue. Violet is the whole
  identity; a second brand color dilutes it.
- **Don't** drop `next/font` for a `<link>` to Google Fonts. That trades zero
  layout shift for a render-blocking request.
- **Don't** use primary violet for large text blocks or long labels. It's a
  CTA and focus-ring color.

_Written 2026-07-30 by `brand-design`. Read by `frontend-design-guidelines` on
future component work._
