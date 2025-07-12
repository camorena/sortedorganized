/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Direct color references
        'forest-slate': '#596856',
        'soft-sage': '#A8B8A3',
        'ivory-hush': '#F4F1ED',
        'warm-sand': '#D5B8A8', // Back to original (moderate tone)
        'lavender-mist': '#B0A0B9', // Back to original (moderate tone)
        'dusty-plum': '#806F82', // Back to original (moderate tone)

        // Semantic color names
        primary: '#596856', // Forest Slate
        secondary: '#A8B8A3', // Soft Sage
        neutral: '#F4F1ED', // Ivory Hush
        'accent-warm': '#D5B8A8', // Moderate Warm Sand
        'accent-cool': '#B0A0B9', // Moderate Lavender Mist
        'accent-dark': '#806F82', // Moderate Dusty Plum

        // Legacy names that map to new colors (for backward compatibility)
        white: '#FFFFFF',
        'fog-gray': '#F4F1ED', // Maps to ivory-hush
        'warm-ivory': '#F4F1ED', // Maps to ivory-hush
        charcoal: '#596856', // Maps to forest-slate
        'forest-shadow': '#596856', // Maps to forest-slate
        'sage-light': '#A8B8A3', // Maps to soft-sage
        'mint-accent': '#B0A0B9', // Maps to moderate lavender-mist
        'gold-highlight': '#D5B8A8', // Maps to moderate warm-sand
        sage: '#A8B8A3', // Maps to soft-sage
        forest: '#596856', // Maps to forest-slate
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(-10deg, rgba(89, 104, 86, 0.6) 0%, rgba(89, 104, 86, 0.4) 50%, rgba(89, 104, 86, 0.2) 100%)',
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
  safelist: [
    'bg-primary',
    'bg-secondary',
    'bg-neutral',
    'bg-accent-warm',
    'bg-accent-cool',
    'bg-accent-dark',
    'text-primary',
    'text-secondary',
    'text-neutral',
    'text-accent-warm',
    'text-accent-cool',
    'text-accent-dark',
    'border-primary',
    'border-secondary',
    'border-neutral',
    'border-accent-warm',
    'border-accent-cool',
    'border-accent-dark',
    'hover:bg-primary',
    'hover:bg-secondary',
    'hover:bg-neutral',
    'hover:bg-accent-warm',
    'hover:bg-accent-cool',
    'hover:bg-accent-dark',
    'hover:text-primary',
    'hover:text-secondary',
    'hover:text-neutral',
    'hover:text-accent-warm',
    'hover:text-accent-cool',
    'hover:text-accent-dark',
    'focus:ring-primary',
    'focus:ring-secondary',
    'focus:ring-neutral',
    'focus:ring-accent-warm',
    'focus:ring-accent-cool',
    'focus:ring-accent-dark',
  ],
  plugins: [],
}
