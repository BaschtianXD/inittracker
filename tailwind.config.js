module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#50E7A8",
          dark: "#1cce84",
          darker: "#138b59",
          light: "#93f0c9",
          lighter: "#d7f9eb"
        },
        secondary: {
          DEFAULT: "#75A4AA",
          dark: "#1cce84",
          darker: "#138b59",
          light: "#93f0c9",
          lighter: "#d7f9eb"
        }
      }
    },
  },
  plugins: [require('tailwindcss-safe-area')],
}
