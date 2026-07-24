# optics-nile — agent instructions

## Project

Landing page for Nile Opticals (Pokhara eyewear shop).  
Vite + React 19, Tailwind CSS v4.

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |

## Key config

- **Path alias** — `@` maps to project root `.` (not `./src`).
- **Tailwind** — v4 via `@tailwindcss/vite` plugin. No PostCSS or config file.
- **TypeScript** — strict mode.
- **Routing** — react-router-dom v7 with `/`, `/shop`, `/journey` routes.
- **Entrypoint** — `index.html` → `src/main.tsx`.

## Constraints

- `dist/` is gitignored.
- No test, lint, or typecheck scripts exist.
- No CI/CD.