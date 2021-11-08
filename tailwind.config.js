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
        17: '17px',
        19.5: '30px',
        600: '600px'
      },
      inset: {
        //  '1/5: '20%'
      },
      keyframes: {
        open: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        rigthTOleft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        leftTOright: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        upTOdown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' }
        },
        downTOup: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' }
        }
      },
      animation: {
        open: 'open .3s ease-in-out',
        upTOdown: 'upTOdown .3s ease-in-out',
        downTOup: 'downTOup .3s ease-in-out',
        rigthTOleft: 'rigthTOleft .3s ease-in-out',
        leftTOright: 'leftTOright .3s ease-in-out',
        opacity: 'opacity .3s ease-in-out'
      },
      backgroundImage: {
        logo: "url('./src/assets/logo.png')"
      },
      backgroundSize: {
        // mohsen: '300px 400px'
      },
      screens: {
        xsm: '340px'
      }
    }
  },
  variants: {},
  plugins: []
}

module.exports = config
