module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    fontSize: {
      xs: ['12px', '18px'],
      sm: ['14px', '21px'],
      base: ['16px', '24px'],
      lg: ['18px', '27px'],
      xl: ['20px', '30px'],
      '2xl': ['24px', '36px'],
      '3xl': ['28px', '42px'],
      '4xl': ['32px', '48px'],
      '5xl': ['36px', '54px'],
      '6xl': ['40px', '60px'],
    },
    extend: {
      screens: {
        '8xl': '1400px',
      },
      colors: {
        dark: '#2e2e2e',
      },
    },
  },
}
