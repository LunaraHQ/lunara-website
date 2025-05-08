/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './styles/**/*.css',          // updated glob here
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
