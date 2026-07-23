# Nile Opticals

Multi-page marketing site for **Nile Opticals**, an eyewear boutique in Pokhara's Newroad district.

Built with Vite + React 19 + Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (default `http://localhost:5173`).

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build
```

## Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Language | TypeScript (strict) |
| Routing | react-router-dom v7 |
| Animations | framer-motion + CSS keyframes |
| Hosting | Cloudflare Pages |

## Structure

```
src/
├── App.tsx              — home page orchestration
├── main.tsx             — router + ReactDOM mount
├── globals.css          — Tailwind import, CSS vars, keyframes
├── pages/
│   ├── shop.tsx         — full product catalog with category filter
│   └── journey.tsx      — brand journey timeline + values
├── data/
│   └── products.ts      — shared product catalog
components/
├── hero-section.tsx     — full-screen intro with animated stat counters
├── collection-section.tsx — featured product edit + showroom images
├── eyewear-types-section.tsx — stacking card deck (prescription/sun/specialty/fashion)
├── lens-brand-section.tsx  — lens options grid
├── brand-marquee.tsx    — scrolling brand & lens strips
├── product-card.tsx     — reusable product card (light / dark / editorial)
├── counter.tsx          — animated count-up
├── tag.tsx              — pill badge
├── stacking-agent-cards.tsx — stacked sticky card layout
├── scroll-to-top.tsx    — route-change scroll reset
├── mobile-nav.tsx       — sidebar navigation
├── footer.tsx           — links, hours, social, clip-reveal
└── ui/
    └── skeleton.tsx     — loading placeholder
hooks/
└── use-in-view.ts       — IntersectionObserver hook
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | App | Home (hero, collection, eyewear types, lenses, marquee, footer) |
| `/shop` | ShopPage | Full product grid with category filtering |
| `/journey` | JourneyPage | Brand story timeline, values, quote, visit info |

## Design

- Minimal, refined aesthetic with warm gold accents (`#B8935B`, `#C9A46A`)
- Subtle alternating section backgrounds (`bg-black/[0.02]`, `bg-black/[0.03]`)
- Ease-out cubic animations (`cubic-bezier(0.16, 1, 0.3, 1)`)

## License

All rights reserved — Nile Opticals.
