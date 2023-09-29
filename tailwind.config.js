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
        secondary:'#FFB905',
        tertiary:'#FFFCF3',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'mancha': "url('/public/Subtract.svg')",
        
      }
    },
  },
  plugins: [],
}

