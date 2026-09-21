# 9 Meses Fotografia — Design

Bilingual (PT/EN) website for **9 Meses Fotografia**, a maternity / newborn / baby / family
photography studio in Ferreiras, Albufeira, Portugal — run by Tânia. Ships on **web** only,
plus a private **admin content manager** at `/admin` for the studio owner.

Visual direction: **Cinematic Editorial** — high-end print-magazine layouts with film-inspired
warmth. Luxury through restraint: big imagery, thin rules, generous negative space, almost no
chrome. Emotional storytelling over decoration.

## Brand & Colors

CSS variables in `packages/web/src/web/styles.css`. Light is the default; a dark theme toggles
via a `.dark` class on `<html>` (persisted in `localStorage`).

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| background | `oklch(0.985 0.003 65)` ivory | `oklch(0.15 0.01 45)` charcoal | Page background |
| foreground | `oklch(0.25 0.01 45)` espresso | `oklch(0.95 0.002 65)` off-white | Primary text |
| card | `oklch(0.975 0.005 55)` champagne | `oklch(0.22 0.01 45)` | Alternating sections, surfaces |
| primary | `oklch(0.55 0.04 55)` soft gold `#C9A97E` | `oklch(0.65 0.04 55)` | Accents, icons, prices |
| secondary | `oklch(0.88 0.008 55)` warm grey | `oklch(0.35 0.01 45)` | Tints, hover fills |
| muted-foreground | `oklch(0.45 0.01 45)` | `oklch(0.65 0.01 65)` | Body copy, captions |
| border | `oklch(0.88 0.008 55)` | `oklch(0.28 0.01 45)` | Hairlines, thin rules |
| destructive | `oklch(0.55 0.22 25)` | `oklch(0.65 0.2 25)` | Delete / errors (admin) |

Radii are near-square on purpose: `--radius` 6px, buttons and image frames stay sharp.

## Typography

- **Display**: `Playfair Display` (serif) — all headings, pull quotes, prices. Weight 400,
  `line-height: 1.2`, `letter-spacing: -0.01em`. h1 88px desktop / 48px mobile, h2 56/36,
  h3 36/28, h4 22.
- **Body**: `Lato` (sans) — 15px, weight 300, `line-height: 1.7`.
- **Eyebrow/labels**: `.uppercase-spaced` — 11px, uppercase, `letter-spacing: 0.15em`. Used for
  nav links, section labels, buttons.
- Utilities: `.display-serif`, `.body-sans`, `.rule-line` (0.5px hairline), `.image-mat`
  (40px ivory mat board around an image), `.animate-fade-in-up`.

Loaded from Google Fonts in `styles.css`.

## Motion

One idea, applied consistently: content fades up 40px on scroll-into-view via
`useScrollAnimation` (`IntersectionObserver`, threshold 0.1, fires once). Hero slideshow
cross-fades every 5s with a light parallax on scroll. Images scale 1.05 on hover. No other
micro-interactions.

## Pages

Public (all wrapped in `SiteLayout` — sticky nav + footer):

- **Home** (`pages/index.tsx`) — hero slideshow, about preview, 5-session grid, gallery with
  "load more", booking CTA.
- **About** (`pages/about.tsx`) — Tânia's story, philosophy pull quote, image pair, studio +
  sessions cross-CTAs, testimonials carousel.
- **Studio** (`pages/studio.tsx`) — full-bleed hero, amenities grid (lucide icons), quote,
  3-up gallery, cross-CTAs.
- **Sessions** (`pages/sessions.tsx`) — alternating left/right showcase of the 5 session types.
- **Session detail** (`pages/session-detail.tsx`, route `/sessions/:slug`) — maternity, newborn,
  baby, family, smash-the-cake: full-bleed hero, long copy, 2 pricing packages, gallery.
- **Gallery** (`pages/gallery.tsx`) — every published photo, filterable by category.
- **FAQ** (`pages/faq.tsx`) — 6-item accordion.
- **Contact** (`pages/contact.tsx`) — booking form (EmailJS + saved to the database) and studio
  contact details.
- **404** (`pages/not-found.tsx`).

Admin (private, email + password):

- **Setup** (`pages/admin/setup.tsx`) — creates the first admin account; only reachable while
  no account exists.
- **Login** (`pages/admin/login.tsx`).
- **Admin shell** (`components/admin-layout.tsx`) — sidebar: Fotos, Textos, Pacotes, Mensagens.
- **Photos** (`pages/admin/photos.tsx`) — drag-free multi-upload to Tigris, category, caption,
  order, publish/delete.
- **Content** (`pages/admin/content.tsx`) — every site string, PT and EN side by side, override
  the built-in default.
- **Packages** (`pages/admin/packages.tsx`) — name, price and feature list per package, PT/EN.
- **Messages** (`pages/admin/messages.tsx`) — booking enquiries received, read/unread.

## Key Flows

1. Visitor lands → hero slideshow → picks a session → reads packages → Contact form →
   EmailJS mails the studio **and** the enquiry is stored → appears in Admin › Mensagens.
2. Tânia signs in at `/admin` → uploads photos into a category → the public gallery and that
   session's page pick them up immediately (DB photos replace the bundled defaults).
3. Any visitor toggles PT/EN in the nav; the choice persists in `localStorage`. Admin text
   overrides are served per language on top of the built-in dictionary.

## Architecture

- **API**: oRPC procedures in `packages/web/src/api/routes/` — `photos`, `content`, `packages`,
  `messages`, `upload`. Typed client in `src/web/lib/api.ts`, query options in `src/web/queries/`.
- **Database**: Drizzle + Turso — `photos`, `content_entries`, `packages`, `messages`, plus the
  Better Auth tables.
- **Storage**: photos go straight to Tigris via presigned PUT, and are served back through
  `GET /api/images/:key` with long cache headers.
- **Auth**: Better Auth email + password, single owner account, no public signup.
