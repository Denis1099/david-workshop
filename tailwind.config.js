/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Enhanced mobile-first breakpoints
      screens: {
        'xs': '320px',   // Extra small phones
        'sm': '640px',   // Small phones (Tailwind default)
        'md': '768px',   // Tablets (Tailwind default)
        'lg': '1024px',  // Small laptops (Tailwind default)
        'xl': '1280px',  // Desktops (Tailwind default)
        '2xl': '1536px', // Large desktops (Tailwind default)
        // Custom breakpoints for specific ranges
        'mobile-only': {'max': '767px'},
        'tablet-only': {'min': '768px', 'max': '1023px'},
        'desktop-only': {'min': '1024px'},
      },
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
      },
      // Enhanced spacing for mobile touch targets
      spacing: {
        '18': '4.5rem',  // 72px - good for touch targets
        '22': '5.5rem',  // 88px
      },
      // Mobile-optimized font sizes
      fontSize: {
        'xs-mobile': ['0.75rem', { lineHeight: '1.4' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.4' }],
        'base-mobile': ['1rem', { lineHeight: '1.5' }],
        'lg-mobile': ['1.125rem', { lineHeight: '1.5' }],
        'xl-mobile': ['1.25rem', { lineHeight: '1.4' }],
        '2xl-mobile': ['1.5rem', { lineHeight: '1.3' }],
        '3xl-mobile': ['1.875rem', { lineHeight: '1.2' }],
        '4xl-mobile': ['2.25rem', { lineHeight: '1.1' }],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      const newUtilities = {
        // Enhanced mobile-first typography system
        '.typo-page-title': {
          '@apply text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-rubik font-extrabold': {},
          'line-height': '1.1',
        },
        '.typo-section-title': {
          '@apply text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-rubik font-bold': {},
          'line-height': '1.2',
        },
        '.typo-body-large': {
          '@apply text-lg xs:text-xl sm:text-xl md:text-2xl font-heebo': {},
          'line-height': '1.5',
        },
        '.typo-body-regular': {
          '@apply text-base xs:text-lg sm:text-lg font-heebo': {},
          'line-height': '1.5',
        },
        '.typo-body-small': {
          '@apply text-sm xs:text-base sm:text-base font-heebo': {},
          'line-height': '1.5',
        },
        
        // Enhanced button typography with mobile optimization
        '.typo-button-cta': {
          '@apply text-base xs:text-lg sm:text-lg font-rubik font-bold': {},
          'line-height': '1.2',
        },
        '.typo-button-regular': {
          '@apply text-base xs:text-lg sm:text-lg font-heebo font-semibold': {},
          'line-height': '1.2',
        },
        
        // Text Wrapping System - 75 Characters Per Line
        // Configurable via CSS custom properties (preserved from original)
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
        '.text-wrap-30': {
          '--char-limit': '30',
          '--char-width': '0.6em',
          'max-width': 'calc(var(--char-limit) * var(--char-width))',
          'word-wrap': 'break-word',
          'overflow-wrap': 'break-word',
          'hyphens': 'auto',
        },
        
        // Enhanced Typography with Text Wrapping
        '.typo-body-large-wrapped': {
          '@apply text-lg xs:text-xl sm:text-xl md:text-2xl font-heebo text-wrap-75': {},
          'line-height': '1.5',
        },
        '.typo-body-regular-wrapped': {
          '@apply text-base xs:text-lg sm:text-lg font-heebo text-wrap-75': {},
          'line-height': '1.5',
        },
        '.typo-body-small-wrapped': {
          '@apply text-sm xs:text-base sm:text-base font-heebo text-wrap-75': {},
          'line-height': '1.5',
        },
        
        // Global Text Wrapping Override
        '.text-content': {
          '@apply text-wrap-75': {},
        },

        // Mobile-specific touch targets and interactions
        '.touch-target': {
          'min-height': '44px',
          'min-width': '44px',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        },
        
        // Mobile-optimized button base
        '.btn-mobile-optimized': {
          '@apply touch-target px-6 py-3 rounded-lg transition-all duration-300': {},
          'font-size': 'clamp(1rem, 4vw, 1.125rem)',
          'line-height': '1.2',
        },

        // Mobile-first container with proper padding
        '.container-mobile': {
          '@apply mx-auto px-4 sm:px-6 lg:px-8': {},
          'max-width': '1200px',
        },

        // Smooth scrolling and mobile optimizations
        '.smooth-scroll': {
          'scroll-behavior': 'smooth',
          '-webkit-overflow-scrolling': 'touch',
        },

        // Prevent horizontal scroll on mobile
        '.prevent-horizontal-scroll': {
          'overflow-x': 'hidden',
          'max-width': '100vw',
        },

        // Mobile-optimized image containers
        '.mobile-image-container': {
          '@apply w-full h-auto': {},
          'max-width': '100%',
          'height': 'auto',
        },

        // Mobile-first grid utilities
        '.mobile-grid-stack': {
          '@apply grid grid-cols-1 gap-4 sm:gap-6 md:gap-8': {},
        },

        '.mobile-grid-2': {
          '@apply grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8': {},
        },

        '.mobile-grid-3': {
          '@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8': {},
        },

        // Mobile typography scaling utilities
        '.text-responsive-sm': {
          'font-size': 'clamp(0.875rem, 3vw, 1rem)',
        },
        '.text-responsive-base': {
          'font-size': 'clamp(1rem, 4vw, 1.125rem)',
        },
        '.text-responsive-lg': {
          'font-size': 'clamp(1.125rem, 5vw, 1.5rem)',
        },
        '.text-responsive-xl': {
          'font-size': 'clamp(1.25rem, 6vw, 2rem)',
        },
        '.text-responsive-2xl': {
          'font-size': 'clamp(1.5rem, 7vw, 2.5rem)',
        },
        '.text-responsive-3xl': {
          'font-size': 'clamp(1.875rem, 8vw, 3rem)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 