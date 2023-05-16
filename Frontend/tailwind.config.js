/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary_Text:'#2D2424',
        search:'#f1f1f1',
        secondary_bg:'#E0C097'
      },
      backgroundImage:{
        'primary_bg':'bg-gradient-to-br from-yellow-100 via-red-50 to-amber-100'
      }
    },
  },
  plugins: [],
}

