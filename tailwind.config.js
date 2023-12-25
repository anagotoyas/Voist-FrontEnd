/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#5271FF',
        primarylight:'#D5DCFF',
        secondary:'#FFB905',
        tertiary:'#FFFCF3',
        grey:'#7D7D7D',
        darkgray:'#09090A',
        lightgray:'#F5F5F5',
        graylanding:'#F8F8F8'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif']
      },
      backgroundImage: {
        'mancha': "url('/public/Subtract.svg')",
        
      }
    },
  },
  plugins: [],
}

