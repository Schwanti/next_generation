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
- Tailwind CSS v4 (configured via `@tailwindcss/postcss`)
- Geist fonts (via next/font/google)

## Conventions

- Components use **named exports** (`export function ComponentName()`)
- Client components require `"use client"` directive
- Global styles: `app/styles.css` (custom styles), `app/globals.css` (Tailwind imports)
- NavBar lives in `layout.tsx`, not inside page components

## Pending Features

- [ ] Instagram gallery section
- [ ] Band introduction section
- [ ] Performances section with admin panel
- [ ] Contact form

## Design Direction

Upgrade of https://www.nextgeneration-live.de/ - simple, professional one-page site for a cover band from Eichstätt.
