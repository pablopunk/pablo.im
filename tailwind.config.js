const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        fg: 'var(--color-fg)',
        bg: 'var(--color-bg)',
        bgDim: 'var(--color-bgDim)',
        accent: 'var(--color-accent)',
        accent2: 'var(--color-accent2)',
        transparent: 'transparent',
        ...colors,
      },
      spacing: {
        header: 'var(--header-height)',
        footer: 'var(--footer-height)',
      },
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: 'var(--color-border)',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
