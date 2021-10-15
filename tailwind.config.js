/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const config = {
  mode: 'jit',
  purge: ['public/**/*.html', 'src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: 'Vazir',
        IranNastaliq: 'IranNastaliq',
        IRANSans: 'IRANSans',
        Yekan: 'Yekan',
        neirizi: 'neirizi'
      },
      spacing: {
        17: '17px'
      },
      inset: {
        //  '1/5: '20%'
      },
      keyframes: {
        open: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        open: 'open .3s ease-in-out'
      }
    }
  },
  variants: {},
  plugins: []
}

module.exports = config
