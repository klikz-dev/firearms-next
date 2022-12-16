module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {},
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
