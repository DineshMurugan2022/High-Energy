/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#f9f7f1',
          DEFAULT: '#f4f1ea',
          dark: '#e6e1d3',
        },
        ink: {
          light: '#4a4a4a',
          DEFAULT: '#2d2d2d',
          dark: '#1a1a1a',
        },
        pencil: '#5c5c5c',
      },
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        sketch: ['"Indie Flower"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'paper-sm': '2px 2px 5px rgba(0,0,0,0.1)',
        'paper': '5px 5px 15px rgba(0,0,0,0.1)',
        'paper-lg': '10px 10px 25px rgba(0,0,0,0.15)',
        'sketch': '2px 2px 0px rgba(0,0,0,1)',
      },
      rotate: {
        'sketch-sm': '1deg',
        'sketch-md': '2deg',
        'sketch-lg': '3deg',
        'sketch-neg-sm': '-1deg',
        'sketch-neg-md': '-2deg',
        'sketch-neg-lg': '-3deg',
      }
    },
  },
  plugins: [],
}
