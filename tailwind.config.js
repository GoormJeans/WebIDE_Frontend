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
      screens: {
        'sm': {'max' : '800px'},  
        'md': {'min' : '801px', 'max':'980px'},
        'lg': {'min' : '981px', 'max':'1535px'},
        'xl': {'min' : '1536px'},
        'mobile': {'max': '639px'},
        'tablet': {'min': '640px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
      },
      width: {
        'chart': '360px',
      },
      height: {
        'chart': '200px',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

