/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glowRed: {
          '0%': { textShadow: '0 0 5px #ff0000, 0 0 10px #ff0000' },
          '50%': { textShadow: '0 0 15px #ff0000, 0 0 25px #ff0000' },
          '100%': { textShadow: '0 0 5px #ff0000, 0 0 10px #ff0000' },
        },
        glowRing: {
          '0%': { boxShadow: '0 0 8px 2px #ff0000' },      
          '25%': { boxShadow: '0 0 10px 3px #ff8c00' },     
          '50%': { boxShadow: '0 0 12px 4px #ffff00' },     
          '75%': { boxShadow: '0 0 10px 3px #00ff00' },    
          '100%': { boxShadow: '0 0 8px 2px #ff0000' },    
        },
      },
      animation:{
        glowRed:'glowRed 1.5s ease-in-out infinite',
        glowRing:'glowRing 1.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

