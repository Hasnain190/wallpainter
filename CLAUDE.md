# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application built with TypeScript, React 19, and Tailwind CSS 4. The project uses the Next.js App Router architecture with the `app/` directory structure.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Next.js App Router Structure

- **app/layout.tsx**: Root layout that wraps all pages. Configures global fonts (Geist Sans and Geist Mono) and metadata.
- **app/page.tsx**: Home page component.
- **app/globals.css**: Global styles including Tailwind directives.

### TypeScript Configuration

- Uses path alias `@/*` that maps to the root directory for cleaner imports
- Target: ES2017 with strict mode enabled
- JSX runtime: react-jsx (no need to import React in components)

### Styling

- Tailwind CSS 4 with PostCSS
- Custom CSS variables defined in globals.css for theming
- Dark mode support via `dark:` variant classes
- Uses Geist fonts from next/font/google

### Key Dependencies

- React 19.2.0 and React DOM 19.2.0
- Next.js 16.0.1 (App Router)
- TypeScript 5
- Tailwind CSS 4

## Code Conventions

### Fonts

The project uses optimized Google Fonts via `next/font/google`:
- Geist Sans (primary font)
- Geist Mono (monospace font)

Fonts are configured as CSS variables in the root layout and applied via Tailwind classes.

### Image Optimization

Use Next.js `Image` component from `next/image` for all images. Static assets are stored in the `public/` directory.
