// Source: https://tailwindcss.com/docs/installation/using-postcss
// Tailwind v4 requires the SEPARATE @tailwindcss/postcss package as the PostCSS plugin.
// Using `tailwindcss` directly here errors with "trying to use tailwindcss directly as a PostCSS plugin".
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
