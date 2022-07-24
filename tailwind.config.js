const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      amber: colors.amber,
    },
    extend: {},
  },
  plugins: [],
}
