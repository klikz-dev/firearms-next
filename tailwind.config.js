module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'],
        display: ['var(--font-oswald)'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
