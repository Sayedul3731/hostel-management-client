/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'font-family': "'Libre Franklin', sans-serif"
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

