/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        fg: "var(--color-fg)",
        bg: "var(--color-bg)",
        bgDim: "var(--color-bgDim)",
        accent: "var(--color-accent)",
        accent2: "var(--color-accent2)",
        border: "var(--color-border)",
        danger: "var(--color-danger)",
        transparent: "transparent",
      },
      spacing: {
        header: "var(--header-height)",
        footer: "var(--footer-height)",
      },
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: "var(--color-border)",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
