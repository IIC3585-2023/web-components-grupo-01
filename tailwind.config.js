/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{web-components,lit-components}/**/*.ts",
    "./lit-components/**/*.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

