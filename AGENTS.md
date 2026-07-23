# optics-nile — agent instructions

## Project

Multi-page marketing site for Nile Opticals (Pokhara eyewear shop).  
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
- **Routing** — react-router-dom v7 with `/`, `/shop`, `/journey` routes in `src/main.tsx`.
- **Entrypoint** — `index.html` → `src/main.tsx`.
- **Fonts** — loaded via `<link>` in `index.html` (Inter, Playfair Display, Courier Prime).

## Architecture

- `src/App.tsx` — home page orchestration, imports all section components.
- `src/pages/shop.tsx` — full product catalog page with category filter + skeleton loading.
- `src/pages/journey.tsx` — brand journey timeline with framer-motion scroll progress.
- `src/data/products.ts` — shared product catalog with material/fit/badge fields.
- `components/ui/skeleton.tsx` — pulse-animated loading placeholder.
- `src/globals.css` — Tailwind import + CSS variables + custom keyframes.
- **Analytics** — Cloudflare Web Analytics (injected via Cloudflare proxy, no code).
- **Hosting** — Cloudflare Pages (connected to GitHub repo).

## Components (13 files)

```
components/
├── brand-marquee.tsx         Brand & lens scrolling marquee
├── collection-section.tsx    Featured edit + showroom images
├── counter.tsx               Animated count-up (hero stats)
├── eyewear-types-section.tsx "Eyewear Types" with stacking cards
├── footer.tsx                Links, hours, social, clip-reveal
├── hero-section.tsx          Full-screen hero with image + animated stats
├── lens-brand-section.tsx    "Lenses & Brands" with glass cards
├── mobile-nav.tsx            Navigation sidebar
├── product-card.tsx          Reusable card (light / dark / editorial)
├── scroll-to-top.tsx         Route-change scroll reset
├── stacking-agent-cards.tsx  Stacking card deck
├── tag.tsx                   Pill badge component
└── ui/
    └── skeleton.tsx          Loading placeholder
```

## Deprecated deps (present in package.json but unused)

`three`, `@react-three/fiber`, `three-stdlib`, full Radix UI suite, and various shadcn boilerplate libs — carried over from a shadcn scaffold. Not removed yet.

## Constraints

- `dist/` is gitignored.
- No CI/CD, no linter, no test framework.
