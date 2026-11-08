# Next Generation Band Website

This Project aims to build a website for a cover band from bavaria, germany. It should represent the band and present a good image to potential customers

## Development Enviroment
install dependencies: npm install
run local in dev mode: npm run dev

## Project Context
- ./next_generation_design_blueprint.PNG shows a blueprint of the hero section

## Project Structure

- `next-generation/` - Main Next.js project directory
  - `app/` - App Router pages (`page.tsx`, `layout.tsx`, `globals.css`, `styles.css`)
  - `components/` - React components (navbar, hero, services)
  - `public/` - Static assets (images)

## Commands

```bash
cd next-generation
npm run dev    # Development server
npm run build  # Production build
npm run lint   # ESLint
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Plain CSS design system (no Tailwind): `app/tokens.css` (colours, fonts, spacing), `app/base.css` (resets), `app/styles.css` (components)
- Anton (display) + Public Sans (body) via next/font/google; design follows the Hallmark "Manifesto" theme (dark sheet, off-white ink, one brand red)

## Conventions

- Components use **named exports** (`export function ComponentName()`)
- Client components require `"use client"` directive
- Styles: only use `var(--…)` tokens from `app/tokens.css`, no literal colours or font-families in components
- NavBar lives in `layout.tsx`, not inside page components

## Pending Features

- [ ] Instagram gallery section
- [ ] Band introduction section
- [ ] Performances section with admin panel
- [ ] Contact form

## Deployment (Vercel)

### Rate Limiting mit Upstash Redis

Das Rate-Limit für Login (`lib/rate-limit.ts`) verwendet **Upstash Redis**, sobald die folgenden Environment-Variablen gesetzt sind:

```
UPSTASH_REDIS_REST_URL=https://<deine-instanz>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<token>
```

Ohne diese Variablen fällt es automatisch auf In-Memory zurück (nur für lokale Entwicklung geeignet).

**Setup auf Vercel:**
1. [Upstash Redis](https://console.upstash.com/) Konto erstellen und eine Redis-Instanz anlegen
2. Die beiden Variablen in den Vercel Project Settings → Environment Variables einfügen
3. Erneutes Deployment auslösen

## Design Direction

Upgrade of https://www.nextgeneration-live.de/ - simple, professional one-page site for a cover band from Eichstätt.
