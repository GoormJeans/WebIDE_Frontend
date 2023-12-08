/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'nav-color': '#8A9BED',
      },
      fontFamily:{
        'k2d':['K2D', "sans-serif"],
      }
    },
  },
  plugins: [],
}

