const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    colors: {
      'light-main': '#fcfbfb',
      'light-second': '#f5f5f5',
      'light-gray-text': '#656565',
      'dark-main': '#171717',
      'dark-second': '#1e1e1e',
      'dark-gray-text': '#9c9c9c',
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      emerald: colors.emerald,
      blue: colors.blue,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      rose: colors.rose,
      fuchsia: colors.fuchsia,
      amber: colors.amber,
    },
  },

  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },

  plugins: [],
}
