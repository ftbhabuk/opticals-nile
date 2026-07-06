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

- **Vite** — `vite.config.ts`: `@` alias maps to project root `.`, not `./src`.
- **Tailwind** — v4 via `@tailwindcss/vite` plugin (no PostCSS config, no `tailwind.config.*`).
- **TypeScript** — `tsconfig.json`: `paths: { "@/*": ["./*"] }`, strict mode, includes `src/`, `components/`, `hooks/`, `lib/`.
- **Entrypoint** — `index.html` → `src/main.tsx` → `src/App.tsx`.
- **Fonts** — loaded via `<link>` in `index.html` (Geist, IBM Plex Sans, Courier Prime). Not via `next/font`.

## Architecture

- `src/globals.css` — Tailwind import + shadcn theme variables + custom keyframes (marquee, glitch, word-reveal).
- `components/` — per-section React components (no UI kit boilerplate: shadcn `components/ui/*` was removed).
- `public/images/` — static image assets.
- `@vercel/analytics` — rendered in `src/main.tsx`.
- Canvas animation in `components/animated-tetrahedron.tsx` (uses `requestAnimationFrame`, no Three.js despite `three` being a dep).
- All components are client-rendered (no `"use client"` — removed during Next.js→Vite migration).

## History

Migrated from Next.js to Vite + React. Old `app/`, `next.config.mjs`, `postcss.config.mjs`, `styles/`, `lib/`, `hooks/`, and all `components/ui/*` were deleted. No Next.js artifacts remain.

## Constraints

- `dist/` and `.next/` are gitignored.
- No CI/CD, no linter config, no test framework.
- Branch `migrate-vite-react` contains the Vite setup; `main` still has Next.js.
