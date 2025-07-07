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
        'navbar-bg': '#FBFBFA',
        'navbar-text': '#101010',
      },
      direction: {
        'rtl': 'rtl',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      const newUtilities = {
        // Streamlined Typography System
        '.typo-page-title': {
          '@apply text-3xl md:text-4xl lg:text-5xl font-rubik font-extrabold': {},
        },
        '.typo-section-title': {
          '@apply text-2xl md:text-3xl lg:text-4xl font-rubik font-bold': {},
        },
        '.typo-body-large': {
          '@apply text-xl md:text-2xl font-heebo': {},
        },
        '.typo-body-regular': {
          '@apply text-lg font-heebo': {},
        },
        '.typo-body-small': {
          '@apply text-base font-heebo': {},
        },
        // Button Typography System
        '.typo-button-cta': {
          '@apply text-lg font-rubik font-bold': {},
        },
        '.typo-button-regular': {
          '@apply text-lg font-heebo font-semibold': {},
        },
        
        // Text Wrapping System - 75 Characters Per Line
        // Configurable via CSS custom properties
        '.text-wrap-75': {
          '--char-limit': '75',
          '--char-width': '0.6em', // Average character width for Hebrew/Heebo
          'max-width': 'calc(var(--char-limit) * var(--char-width))',
          'word-wrap': 'break-word',
          'overflow-wrap': 'break-word',
          'hyphens': 'auto',
        },
        '.text-wrap-60': {
          '--char-limit': '60',
          '--char-width': '0.6em',
          'max-width': 'calc(var(--char-limit) * var(--char-width))',
          'word-wrap': 'break-word',
          'overflow-wrap': 'break-word',
          'hyphens': 'auto',
        },
        '.text-wrap-50': {
          '--char-limit': '50',
          '--char-width': '0.6em',
          'max-width': 'calc(var(--char-limit) * var(--char-width))',
          'word-wrap': 'break-word',
          'overflow-wrap': 'break-word',
          'hyphens': 'auto',
        },
        
        // Enhanced Typography with Text Wrapping
        '.typo-body-large-wrapped': {
          '@apply text-xl md:text-2xl font-heebo text-wrap-75': {},
        },
        '.typo-body-regular-wrapped': {
          '@apply text-lg font-heebo text-wrap-75': {},
        },
        '.typo-body-small-wrapped': {
          '@apply text-base font-heebo text-wrap-75': {},
        },
        
        // Global Text Wrapping Override
        '.text-content': {
          '@apply text-wrap-75': {},
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 