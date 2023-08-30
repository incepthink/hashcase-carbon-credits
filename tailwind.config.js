/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')


const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'oswald':["Oswald", "sans-serif"],
      'nunito':["Nunito Sans", "sans-serif"],
      'bebas':["Bebas Neue",'cursive'],
      'poppins':["Poppins", "sans-serif"],
      'sans': ['var(--ayuthaya)', ...fontFamily.sans],
    },
    backgroundImage: {
      "home-background-1": 'url("/images/illustration2.png")',
      "service-background": 'url("/images/OurServiceBG.png")',
      "img-background":'url("/images/earth-bg.png")',
      "home-background-3": 'url("/images/Logo2.png")'
    },
    // colors:{
    //   'light-green':'#a5f3fc',
    //   'medium-green':'#22d3ee',
    //   'less-dark-green':'#06b6d4',
    //   'dark-green':'#0891b2',
    //   'darkest-green':'#0e7490',
    //   'white':'white',
    //   'blue-600':'#0891b2',
    //   'gray':'gray',
    //   'indigo-900':'#38bdf8',
    //   'cyan-500':'#06b6d4'
    // },
    scrollbar: {
      width: '0.5em',
      height:'0.25em' 
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#04A6E7', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888', 
      borderRadius: '10px', 
    },
    extend: {
      zIndex:{
        '1':'1',
        '50':'50',
      },
      backgroundImage: {
        "home-background": 'url("/images/karsten-bg.jpg")',
        "home-background-2": 'url("/images/bg2.png")',
      }
    },
  },
  plugins: [],
}

