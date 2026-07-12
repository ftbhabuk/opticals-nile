# Nile Opticals

Single-page marketing site for **Nile Opticals**, an eyewear boutique in Pokhara's Newroad district.

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
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Language | TypeScript (strict) |
| Analytics | `@vercel/analytics` |
| Animations | CSS keyframes + Intersection Observer + `requestAnimationFrame` |

## Structure

```
src/
├── App.tsx          — page orchestration (imports all sections)
├── main.tsx         — ReactDOM + analytics mount
├── globals.css      — Tailwind import, CSS vars, keyframes
components/          — 17 per-section / shared components
hooks/               — useInView hook
public/images/       — static assets
```

## Pages / sections

- **Hero** — full-screen image intro with animated stats
- **Our Collection** — bento grid showcasing the store range
- **Eyewear Types** — prescription, sunglasses, sports, fashion
- **Journey** — brand history timeline
- **Lenses & Brands** — lens options + brand authenticity cards
- **Why Nile** — value propositions + testimonial
- **Visit Us** — gallery grid + location, hours, contact
- **Brand Marquee** — scrolling brand / lens technology strips
- **Footer** — CTA, navigation, social links

## License

All rights reserved — Nile Opticals.
