# ADVANCE Website: Next.js Foundation + Homepage Redesign

**Date:** 2026-07-25
**Branch:** `2026-2027`
**Status:** Implemented

## Context

The ADVANCE website (`advance1986`, University of Cincinnati student org) is currently a static
multi-page site: 7 hand-authored HTML pages (`index`, `about`, `join`, `events`, `executiveBoard`,
`sponsors`, `resources`) sharing a single `style.css` and `script.js`, with event content in a
global `window.EVENTS` array (`events-data.js`). Header/nav/footer markup is duplicated across
every page. The site is deployed on Vercel, with Vercel Speed Insights/Analytics wired in via
manual `<script>` tags and security headers set both in per-page `<meta>` CSP tags and in
`vercel.json`.

A previous attempt to migrate this site to Next.js was made on a different device but never
committed — the `2026-2027` branch on `origin` exists but only contains two small unrelated
commits (adding `.gitignore`, untracking a `.vs/` IDE folder). This spec starts the Next.js
migration over from scratch on that branch.

The migration is being combined with a visual redesign (not a like-for-like port). The org's
black-background / gold (`#FFD700`) accent brand identity and the campus-photo hero background
are being kept; layout, components, and UX are being modernized.

This is the **first of two specs**. This one covers the Next.js foundation (tooling, design
system, shared layout, data layer) and the homepage. A follow-up spec will cover the remaining
6 pages once this foundation exists and is proven out.

`main` continues to serve the current static site, unchanged, for the duration of this work.
`2026-2027` only becomes the new `main` once the full site (all 7 pages) has been migrated.

## Goals

- Stand up a Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui project on the
  `2026-2027` branch, replacing the static HTML/CSS/JS files on that branch.
- Establish a reusable design system (tokens, shared header/footer) that the follow-up spec's
  pages will build on, so that work is fast and consistent.
- Establish a typed data-file pattern for editable content (events, executive board, sponsors),
  preserving today's "edit a file, open a PR" content workflow — no CMS, no backend.
- Rebuild the homepage with a redesigned hero (campus photo background, subtle gradient overlay,
  typewriter title / quote / welcome-mission text, gold CTA, live clock) and an events section
  redesigned as a card row below the hero (replacing the sidebar carousel).
- Replace the Lordicon external icon script with `lucide-react` for the footer social icons.
- Consolidate the site's security headers (currently duplicated per-page `<meta>` CSP tags plus
  `vercel.json`) into a single `next.config.ts` source of truth.

## Non-goals (explicitly out of scope for this spec)

- Migrating About, Join, Events, Executive Board, Sponsors, or Resources pages — follow-up spec.
- Any CMS/headless backend for content editing.
- Redesigning the brand identity itself (colors/typography stay black/gold/Sora).
- A full automated test suite (e2e/visual regression) — not proportional to this site's size.

## Architecture

**Stack:** Next.js (App Router, latest stable) + TypeScript (strict) + Tailwind CSS + shadcn/ui,
scaffolded via `create-next-app` at the repo root of the `2026-2027` branch, replacing the static
files there. Package manager: npm.

**Branch handling:** Continue from the existing `origin/2026-2027` branch (keeps its `.gitignore`
and `.vs/`-untracking commits). Add `.superpowers/` to `.gitignore` alongside the Next.js-specific
ignores (`node_modules/`, `.next/`, etc.) `create-next-app` generates.

**Static assets:** `images/` and `Fonts/` move into `public/` as-is. `Sora-VariableFont_wght.ttf`
loads via `next/font/local` as the site-wide typeface. `Anta-Regular.ttf` and
`SpaceGrotesk-VariableFont_wght.ttf` exist in the current `Fonts/` folder but are not referenced
by any CSS rule in the current `style.css` — they carry over into `public/Fonts/` as unused assets
for now rather than being wired into the design system, since there's no current usage to
preserve.

**Analytics:** `@vercel/analytics` and `@vercel/speed-insights` npm packages, added as components
in the root layout, replacing the manual inline `<script>` snippets currently in every page's
`<body>`.

**Icons:** `lucide-react` (installed as part of shadcn/ui) replaces the Lordicon
(`cdn.lordicon.com`) web component for the footer's LinkedIn/email/Instagram icons. Hover
animation becomes a CSS color/scale transition instead of Lordicon's built-in animation. This
removes `cdn.lordicon.com` from the CSP entirely.

**Security headers:** Single `headers()` function in `next.config.ts`, replacing both
`vercel.json`'s `headers` block and every page's duplicated `<meta http-equiv="Content-Security-
Policy">` tag. The Microsoft/Office.com CSP allowances (currently duplicated onto every page even
though they're only needed for the Join page's embedded form) get scoped to the `/join` route
specifically via a route-matched header rule, rather than applied site-wide.

## Design system

**Tokens** (Tailwind theme config + CSS variables):

| Token | Value | Notes |
|---|---|---|
| `background` | `#000000` | site-wide black background |
| `accent` | `#FFD700` | gold; nav hover/active, CTAs, headings |
| `accent/10`, `accent/25` | derived | hover/active background tints, matching today's `rgba(255,215,0,0.12)` / `.25` |
| font | Sora (`next/font/local`) | single site-wide typeface, replacing the `'the font'` custom-property indirection |

Spacing/radius scale: Tailwind defaults (no custom scale needed for a site this size).

## Shared layout

`app/layout.tsx` wraps every route in a common `<SiteHeader>` / page content / `<SiteFooter>`
shell, replacing the copy-pasted header/nav/footer markup duplicated across all 7 HTML files
today.

**`components/layout/site-header.tsx`:**
- Sticky, backdrop-blurred bar (matches current `.site-header` behavior)
- ADVANCE logo (links home) + UC logo, both `next/image`
- Nav links: About, Join, Events, Executive Board, Sponsors, Resources — active-link highlighting
  via `usePathname()` (replaces today's manual active-class logic in `script.js`)
- Mobile navigation via a shadcn `Sheet` triggered by a hamburger button, replacing the current
  hand-rolled `.nav-toggle` JS toggle
- The live clock is **not** part of this global header — it's homepage-only today (only
  `index.html` has a `.clock` element), so it lives in the homepage hero component instead, in the
  same visual position it occupies today

**`components/layout/site-footer.tsx`:**
- Copyright line
- LinkedIn / email / Instagram links, each rendering a `lucide-react` icon with a gold hover
  transition, replacing the three `<lord-icon>` elements

## Data layer

Content that today lives in ad-hoc global JS moves into typed modules under `lib/data/`:

- **`lib/data/events.ts`** — array of events, same shape as today's `window.EVENTS`
  (`id`, `title`, `date`, `flyer`, `full`, `description`), typed as:
  ```ts
  type EventDate = string /* ISO YYYY-MM-DD */ | 'TBA' | `TBA ${string}`;
  interface Event {
    id: string;
    title: string;
    date: EventDate;
    flyer: string;
    full: string;
    description: string;
  }
  ```
- **`lib/data/executive-board.ts`** and **`lib/data/sponsors.ts`** — scaffolded now with their
  data shapes settled, even though the pages consuming them are built in the follow-up spec, so
  the pattern is established once rather than per-page.
- **`lib/data/get-upcoming-events.ts`** — pure helper, `getUpcomingEvents(events: Event[]): Event[]`:
  - Filters out events with a real ISO date in the past
  - Sorts remaining real-dated events chronologically (soonest first)
  - Places `'TBA'`/`'TBA ...'` entries after all real-dated events, in their original array order
  - This is the one piece of actual logic in this spec and gets a Vitest unit test (see Testing)

Editing content remains: edit the relevant `.ts` file, open a PR, deploy. No CMS, no admin UI.
TypeScript now catches malformed entries (e.g., a bad date string) at build time.

## Homepage (`app/page.tsx`)

Composed of two components:

**`components/home/hero.tsx`** (client component — needs timers for the reveal animation):
- Full-bleed section, `campus_sky.webp` as background via `next/image` (`fill`, `priority`, since
  it's above the fold), with a **subtle bottom gradient overlay** (transparent at top, darkening
  toward the bottom ~45-100%) for text contrast — the "subtle" option validated in mockup review,
  not a full-photo scrim
- Sequential reveal, matching today's content and beats:
  1. Typewriter effect on "Advance" (~400ms/char, matching current speed)
  2. Quote fades/types in: "The mark of a leader."
  3. Welcome/mission lines follow: "Welcome to the revived site!" and "Advance is where we are
     paving the way for tomorrow's leaders!"
- Gold "Join ADVANCE" CTA (shadcn `Button`) linking to `/join`
- Live clock (client-side, updates every second) rendered in the hero, in the same corner
  position it occupies today

**`components/home/upcoming-events.tsx`**:
- Server component, reads `getUpcomingEvents(events)` from `lib/data/events.ts`
- Renders a row of shadcn `Card`s below the hero (title, formatted date, flyer thumbnail via
  `next/image`) — this is the "Full Hero + Events Strip" layout (Option B) validated during
  design review, replacing today's sidebar carousel
- On mobile: the row becomes horizontally scrollable via CSS scroll-snap (`overflow-x-auto` +
  `snap-x`) rather than reimplementing the current prev/next-button carousel JS
- Empty state: if `getUpcomingEvents()` returns zero events, render a single "Check back soon"
  card instead of an empty row

## Testing & verification

- TypeScript strict mode + ESLint (Next.js default config) as the baseline correctness check
- Vitest unit test for `getUpcomingEvents()`, covering: past-dated events excluded, real dates
  sorted chronologically, `TBA` entries ordered after real dates
- No component or e2e test suite for this phase — proportional to a static marketing site with
  one piece of real logic
- Manual verification before calling this done: `next build` succeeds, and the homepage is
  checked in a real browser at both desktop and mobile widths (hero legibility over the photo,
  events row scroll behavior, mobile nav sheet, active nav-link state)

## Rollout

1. This spec's implementation lands on `2026-2027` (foundation + homepage only)
2. Follow-up spec covers About, Join, Events, Executive Board, Sponsors, Resources, reusing the
   layout/design-system/data patterns established here
3. `main` is untouched throughout — it keeps serving the current static site
4. `2026-2027` becomes the new `main` only once all 7 pages are migrated
