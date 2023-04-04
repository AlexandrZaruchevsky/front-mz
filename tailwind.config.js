const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,ts,vue}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: colors.sky,
      secondary: colors.stone,
      danger: colors.rose,
      warn: colors.amber,
      slate: colors.slate,
      teal: colors.teal,
      white: colors.white,
      gray: colors.gray,
      stone: colors.stone
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}