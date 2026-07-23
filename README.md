# Karry Creative Studios

Next.js 14 (App Router) site for Karry Creative Studios — web development +
photography, by Kartik Bhat.

## Stack
- Next.js 14, TypeScript, Tailwind CSS
- Framer Motion (page transitions, scroll reveals)
- GSAP + ScrollTrigger (the curved project strip on /work)
- next-themes (light/dark mode)

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Where to put real content
- `lib/projects.ts` — swap in your real 6 projects (title, description, link)
- `public/projects/` — replace placeholder-1..6.jpg with real project shots/mockups
- `lib/photos.ts` — swap in real photography captions/locations
- `public/photography/` — replace placeholder-1..8.jpg with real Panch Kedar / trek shots
- `components/Footer.tsx` — update the email address
- `app/layout.tsx` — update metadata description if needed

## Pages
- `/` — Hero, process, services, cross-links
- `/work` — the 6-project curved scroll showcase
- `/photography` — masonry photography grid

## Design tokens
Colors, fonts, and spacing live in `tailwind.config.ts` and `app/globals.css`
(CSS variables swap automatically between light/dark).
