# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript check (tsc -b) then Vite production build
npm run lint      # ESLint across all files
npm run preview   # Serve the production build locally
```

## Architecture

**Stack:** React 19 + TypeScript + Vite 8, no component library or CSS framework.

**Entry points:**
- `index.html` mounts the React app at `<div id="root">`
- `src/main.tsx` calls `createRoot().render(<App />)`
- `src/App.tsx` is the root component

**Styling:** Plain CSS with CSS custom properties for theming. Global styles in `src/index.css` (including dark mode via `prefers-color-scheme`), component-level styles in co-located `.css` files. No CSS Modules.

**TypeScript:** Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`. Vite handles transpilation; `tsc -b` is type-check only (no emit).

**ESLint:** Flat config (`eslint.config.js`) with TypeScript, React Hooks, and React Refresh rules.
