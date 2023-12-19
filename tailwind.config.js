/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-color': '#8A9BED',
        'second-color': '#646FA9',
        'editor-color' : '#7C7B7B73',
      },
      fontFamily: {
        'k2d': ['K2D', "sans-serif"],
      },
      screens: {
        'sm': '640px',  // customize the screen size as needed
        'md': '980px',
        'lg': '1145px',
        'xl': '1536px',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

