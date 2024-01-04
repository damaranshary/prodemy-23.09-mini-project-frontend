/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: '"Plus Jakarta Sans", sans-serif',
    },
    extend: {
      colors: {
        text: "#0a0b0f",
        background: "#f2f3f8",
        primary: "#4959b6",
        secondary: "#9ca7e2",
        accent: "#6779e0",
      },
    },
    extend: {},
  },
  plugins: [],
}

