module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      // gridTemplateColumns: {
      //   'header': '200px minmax(900px, 1fr) 100px'
      // },
    },
  },
  plugins: [],
};
