# Next.js Starter

[![Next.js](https://img.shields.io/badge/Next.js-16%2B-blue?logo=next.js)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%E2%9C%94-green?logo=pnpm)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/linting-eslint-blue?logo=eslint)](https://eslint.org/)

> A modern Next.js starter template with modular structure, reusable UI components, and best practices for scalable web development.

---

## Features

- **Next.js 16+** with App Router
- Modular folder structure (`src/animations`, `src/assets`, `src/components`, etc.)
- Reusable UI components (Accordion, Button, Card, Table, etc.)
- Context, hooks, and helpers for state management and utilities
- Axios setup for API requests
- QueryClient for data fetching and caching
- Global styles and custom fonts
- Linting and formatting with ESLint, Prettier, and lint-staged
- PostCSS for advanced CSS processing

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm (recommended) or npm/yarn

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
```

---

## Project Structure

```text
src/
  animations/         # Animation utilities
  app/                # Next.js app router structure
    (routes)/         # Route groups
      (home)/         # Home page
  assets/             # Static assets and logos
  components/         # UI components, constants, context, helpers, hooks, lib, providers, schema, shared, styles, utils, validations
    ui/               # Reusable UI elements
    constants/        # App-wide constants
    context/          # React context providers
    helpers/          # Utility functions
    hooks/            # Custom React hooks
    lib/              # Libraries (axios, queryClient, utils)
    providers/        # Context providers
    schema/           # Validation schemas
    shared/           # Shared resources (icons, etc.)
    styles/           # Fonts and global styles
    utils/            # Utility functions
    validations/      # Validation logic
```

---

## Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm lint` — Run ESLint
- `pnpm format` — Format code with Prettier

---

## Linting & Formatting

- ESLint config: `eslint.config.mjs`
- Prettier: integrated via lint-staged
- Lint-staged: `lint-staged.config.js`

---

## Customization

- Add new UI components in `src/components/ui/`
- Add new routes in `src/app/(routes)/`
- Update global styles in `src/components/styles/globals.css`
- Configure Axios in `src/components/lib/axios.js`

---

## Author

**Harshit Ostwal**  
[codewithharshitjain@gmail.com](mailto:codewithharshitjain@gmail.com)

---

## License

This project is licensed under the MIT License.

---

## Contributing

Pull requests, issues, and suggestions are welcome!
