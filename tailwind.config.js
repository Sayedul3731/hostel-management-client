/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "font-family": "'Libre Franklin', sans-serif",
    },
    extend: {
      colors: {
        "primary-100": "#000102",
        "primary-300": "#ff9008",
        "primary-500": "#FFC800",
        "secondary-100": "#ede8d4",
        "secondary-300": "#bef7b8",
      },
    },
  },
  plugins: [require("daisyui")],
};
