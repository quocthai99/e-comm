/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#339CDE',
        hprimary: '#4cadea',
        text: '#505050',
        errorColor: '#ff3333'
      },
      width: {
        main: '1180px'
      }
    },
  },
  plugins: [],
}