/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#6093E6',
        'cyber-dark': '#284066',
        'cyber-navy': '#1C3359',
        'cyber-midnight': '#032152',
        'cyber-border': '#DEDEDE',
      }
    },
  },
  plugins: [],
}