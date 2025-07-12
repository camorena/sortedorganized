/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        'fog-gray': '#F7F8F9',
        'warm-ivory': '#EDEBE6',
        charcoal: '#2E3033',
        'forest-shadow': '#596856',
        'sage-light': '#A8B8A3',
        'mint-accent': '#A3D9C1',
        'gold-highlight': '#D4AF37',
        sage: '#A8B8A3',
        forest: '#596856',
        lavender: '#b0a0b9', // Added the new color
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(-10deg, rgba(41, 46, 51, 0.6) 0%, rgba(41, 46, 51, 0.4) 50%, rgba(41, 46, 51, 0.2) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
