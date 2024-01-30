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
    extend: {
      colors: {
        "primary-100" : "#ed7e92",
        "primary-300" : "#ff9008"
      }
    },
  },
  plugins: [require("daisyui")],
}

