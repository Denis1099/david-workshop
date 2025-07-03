/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'heebo': ['Heebo', 'sans-serif'],
      },
      colors: {
        'cta': '#DA9B28',
        'bg-primary': '#0C2C48',
        'text-primary': '#FBFBFA',
      },
      direction: {
        'rtl': 'rtl',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 