# An opinionated template for NextJS

- **ALMOST EMPTY**: Easy to start. Should fit any project.
- **TYPESCRIPT**: With the basic `tsconfig.json`.
- **TAILWINDCSS**: JIT mode. Synced with CSS variables. Check these files for more info:
  - `tailwind.config.js`
  - `styles/global.css`
- **DARK MODE**: Automatic for user with dark mode enabled. Exposes:
  - Global: `window.__toggleDarkMode()`
  - Hook: `const [theme, toggleTheme] = useTheme()`.
- **SEO**: Very basic SEO config with `next-seo`, taking values from `config.js`.
- **LINTING**: Basic eslint/prettier config. Check both on `package.json`. Prettier is autorun on pre-commit with `husky`.

## Usage

<a href="https://github.com/pablopunk/next-starter/generate">
  <img src="https://img.shields.io/badge/use%20this-template-blue?logo=github">
</a>

Use that button to generate a template.

## First steps

- Configure `config.js` with your site details.
- Go to `styles/global.css` and change the theme colors
