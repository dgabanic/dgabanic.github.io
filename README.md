# David Gabanic Portfolio Website

This repository hosts a personal portfolio site built with **React** (TypeScript) and **Vite**. It was originally generated using Angular CLI but has since been completely rewritten as a static SPA that showcases professional experience, certifications, and personal information.

## Key details

- **Framework:** React 18 with functional components
- **Language:** TypeScript
- **Tooling:** Vite for development/build, Vitest + Testing Library for unit tests
- **Styling:** CSS Modules
- **Deployment target:** GitHub Pages (static assets under `dist/`)
- **Assets:** images live in `public/images` (including `banner.jpeg`, `headshot.png`, etc.)
- **Structure:**
  - `src/main.tsx` bootstraps the app
  - `src/components` contains reusable pieces (hero, navbar, sections, etc.)

## Getting started

### Prerequisites

- Node.js 18+ (or current LTS)
- npm or yarn

### Install dependencies

```bash
npm install
# or
# yarn install
```

### Development server

Start a hot-reloading dev server:

```bash
npm run dev
# or
# yarn dev
```

Open `http://localhost:5173` in your browser (port may vary). Changes to source files will reload automatically.

### Building for production

```bash
npm run build
# or
# yarn build
```

The optimized static files appear in the `dist/` directory, ready to be pushed to GitHub Pages or any static host.

### Previewing a production build

```bash
npm run preview
```

This serves the contents of `dist/` locally.

### Unit tests

Vitest is configured for the project. Run all tests with:

```bash
npm test
# or
# yarn test
```

Tests are located alongside components and use `@testing-library/react`.

## Project notes

- The hero section uses a banner image by default; swap `public/images/banner.jpeg` to change it.
- CSS modules are used to scope styles (`*.module.css`).
- Routing is minimal and handled by in-page anchors.

## TODOs / future work

- Migrate `tasklist.txt` into a more appropriate issue tracker or markdown file
- Add E2E tests if needed (Cypress, Playwright, etc.)

## Help & links

For Vite issues, see https://vitejs.dev/
For React documentation, visit https://reactjs.org/

Any other questions can be addressed by opening an issue in this repository or contacting me directly via LinkedIn.
