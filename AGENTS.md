# optics-nile — agent instructions

## Project

Single-page marketing site for Nile Opticals (Pokhara eyewear shop).  
Vite + React 19, Tailwind CSS v4.

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |

No test, lint, or typecheck scripts exist.

## Key config

- **Path alias** — `@` maps to project root `.` (not `./src`). Config in `vite.config.ts` + `tsconfig.json`.
- **Tailwind** — v4 via `@tailwindcss/vite` plugin. No PostCSS file, no `tailwind.config.*`.
- **TypeScript** — strict mode, includes `src/`, `components/`, `hooks/`, `lib/`.
- **Entrypoint** — `index.html` → `src/main.tsx` → `src/App.tsx`.
- **Fonts** — loaded via `<link>` in `index.html` (Geist, IBM Plex Sans, Courier Prime).

## Architecture

- `src/App.tsx` — orchestration layer, imports all section components.
- `src/globals.css` — Tailwind import + CSS variables + custom keyframes.
- `components/` — per-section React components (hero, footer, bento cards, etc.).
- `hooks/` — shared React hooks (`useInView`).
- `public/images/` — static image assets.
- **Analytics** — Cloudflare Web Analytics (injected via Cloudflare proxy, no code).
- **Hosting** — Cloudflare Pages (connected to GitHub repo).

## Components (17 files)

```
components/
├── animated-lens-focus.tsx   Canvas animation via requestAnimationFrame
├── bento-card.tsx            Reusable card wrapper with hover/track effects
├── brand-marquee.tsx         Brand & lens scrolling marquee
├── collection-section.tsx    "Our Collection" bento grid
├── counter.tsx               Animated count-up (hero stats)
├── eyewear-types-section.tsx "Eyewear Types" with stacking cards
├── footer.tsx                CTA, nav links, social icons, copyright
├── hero-section.tsx          Full-screen hero with image + stats
├── journey-section.tsx       Brand journey timeline
├── lens-brand-section.tsx    "Lenses & Brands" with glass cards
├── mobile-nav.tsx            Navigation sidebar
├── pixel-icon.tsx            Animated pixel-art icons
├── reveal-text.tsx           Scroll-triggered text reveal
├── stacking-agent-cards.tsx  Stacking card deck
├── tag.tsx                   Pill badge component
├── visit-section.tsx         Gallery + location/hours/contact
└── why-nile-section.tsx      "Why Nile" list + testimonial quote
```

## Deprecated deps (present in package.json but unused)

`three`, `@react-three/fiber`, `three-stdlib`, and the full Radix UI suite were carried over from a shadcn boilerplate. Not removed yet.  No `app/`, `lib/`, `hooks/` (project-level), `components/ui/` directories exist.

## Constraints

- `dist/` is gitignored. No `.next/` (Next.js was removed).
- No CI/CD, no linter, no test framework.
