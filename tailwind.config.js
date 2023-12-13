/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-color': '#8A9BED',
      },
      fontFamily: {
        'k2d': ['K2D', "sans-serif"],
      },
      screens: {
        'sm': '640px',  // customize the screen size as needed
        'md': '1024px',
        'lg': '1160px',
        'xl': '1536px',
      }
    },
  },
  plugins: [],
}

