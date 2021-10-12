/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const config = {
  mode: 'jit',
  purge: ['public/**/*.html', 'src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'Vazir',
        IranNastaliq: 'IranNastaliq',
        IRANSans: 'IRANSans',
        Yekan: 'Yekan',
        neirizi: 'neirizi',
      },
      spacing: {
        17: '17px'

      }
    }
  },
  variants: {},
  plugins: []
}

module.exports = config
