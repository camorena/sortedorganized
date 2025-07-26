// src/components/sections/Hero.tsx
import React, { useEffect, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion'

// Import different image sizes
import heroImageSmall from '../../assets/images/hero-bg-small.png' // ~600px wide for mobile
import heroImageMedium from '../../assets/images/hero-bg-medium.png' // ~1200px wide for tablet
import heroImageLarge from '../../assets/images/hero-bg.png' // Original full size

// Fallback gradient in case image fails to load
const FALLBACK_GRADIENT =
  'linear-gradient(135deg, rgba(89,104,86,0.2) 0%, rgba(158,190,165,0.1) 50%, rgba(228,240,228,0.05) 100%)'

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [heroImageSrc, setHeroImageSrc] = useState('')

  // For scroll-based animations
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '25%'])
  const overlayOpacity = useTransform(scrollY, [0, 300], [1, 0.5])
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const contentY = useTransform(scrollY, [0, 300], [0, 100])

  // Select and preload the appropriate image based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const pixelRatio = window.devicePixelRatio || 1

      // Consider both screen size and pixel density (for retina displays)
      if (width < 768) {
        setHeroImageSrc(heroImageSmall)
      } else if (width < 1280 || pixelRatio === 1) {
        setHeroImageSrc(heroImageMedium)
      } else {
        setHeroImageSrc(heroImageLarge)
      }
    }

    // Set initial image source
    handleResize()

    // Update on resize
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Preload the selected image
  useEffect(() => {
    if (!heroImageSrc) return

    const img = new Image()
    img.src = heroImageSrc

    const handleLoad = () => {
      setImageLoaded(true)
      setImageError(false)
    }

    const handleError = () => {
      console.error('Failed to load hero image:', heroImageSrc)
      setImageError(true)
      setImageLoaded(true) // Set loaded to true to hide loading state
    }

    img.onload = handleLoad
    img.onerror = handleError

    // Check if already cached
    if (img.complete) {
      handleLoad()
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [heroImageSrc])

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Account for fixed navbar with extra space
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Loading state JSX
  const renderLoading = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-forest-shadow to-sage-light flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-serif">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}>
            Loading
          </motion.span>
        </div>
      </div>
    </div>
  )

  // Title words with animation variants
  const titleWords = ['Transform', 'Clutter', 'into', 'Clarity']
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariant: Variants = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-[650px] sm:min-h-[700px] md:min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
      role="banner"
      aria-label="Hero section">
      {/* Loading State */}
      {!imageLoaded && renderLoading()}

      {/* Background Image with Parallax - Significantly reduced opacity */}
      <motion.div
        className={`absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-35' : 'opacity-0'
        }`}
        style={{
          backgroundImage: imageError
            ? FALLBACK_GRADIENT
            : `url(${heroImageSrc})`,
          y: backgroundY,
          backgroundPosition: 'center',
          opacity: 0.35, // Further reduced opacity (backup in case the class doesn't work)
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        aria-hidden="true">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </motion.div>

      {/* Enhanced Gradient Overlay with stronger opacity for better text contrast */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ opacity: overlayOpacity }}>
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/98 via-charcoal/92 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/75 to-charcoal/30" />

        {/* Stronger vignette effect */}
        <div
          className="absolute inset-0 bg-radial-gradient pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </motion.div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          className="absolute -top-32 -right-32 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-gold-highlight/10 rounded-full blur-[100px]"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-mint-accent/10 rounded-full blur-[100px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-sage-light/5 rounded-full blur-[80px]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content Container with scroll-based effects */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}>
        {/* Animated Badge */}
        <motion.div
          className="inline-block mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs sm:text-sm font-medium border border-white/20 shadow-lg">
            <span className="relative flex h-2 sm:h-3 w-2 sm:w-3 mr-2 sm:mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-highlight opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-3 w-2 sm:w-3 bg-gold-highlight"></span>
            </span>
            Now Serving Twin Cities Metro
          </span>
        </motion.div>

        {/* Title with Enhanced Word Animation - Improved for small devices */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white mb-6 sm:mb-8 leading-tight px-4"
          variants={container}
          initial="hidden"
          animate="show">
          {/* On mobile, show as a single unit for better layout control */}
          <span className="sm:hidden">Transform Clutter into Clarity</span>

          {/* On larger screens, show with word-by-word animation */}
          <span className="hidden sm:block">
            {titleWords.map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-2 md:mr-4 relative"
                variants={wordVariant}
                whileHover={{
                  color: '#D4AF37',
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}>
                {word}

                {/* Underline effect on hover */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-highlight/70 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Enhanced Subtitle with responsive sizing and improved line height */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-5 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}>
          <span className="leading-snug sm:leading-relaxed inline-block">
            Because every space deserves clarity and calm.
          </span>
          <span className="block mt-2 sm:mt-3 text-gold-highlight/80 leading-snug sm:leading-relaxed">
            Let's create spaces that inspire productivity and peace.
          </span>
        </motion.p>

        {/* Enhanced CTA Buttons - Improved sizing and spacing for mobile */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-5 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}>
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-10 py-3.5 sm:py-4 bg-gold-highlight text-white font-semibold 
                     rounded-lg overflow-hidden shadow-lg focus:outline-none focus:ring-4 focus:ring-gold-highlight/50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            aria-label="Book a consultation">
            <span className="relative z-10 flex items-center justify-center text-base sm:text-lg">
              Book a Consultation
              <motion.svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 10,
                }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </span>

            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20"
              initial={{ x: '-100%' }}
              animate={{ x: ['100%', '-100%'] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: 'easeInOut',
                repeatDelay: 3,
              }}
              aria-hidden="true"
            />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('services')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-10 py-3.5 sm:py-4 text-white font-semibold 
                     rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/60 focus:outline-none focus:ring-4 focus:ring-white/30"
            whileHover={{
              scale: 1.03,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            aria-label="View our services">
            <span className="relative z-10 text-base sm:text-lg flex items-center">
              View Services
              <motion.svg
                className="w-4 h-4 sm:w-5 sm:h-5 ml-2 opacity-0 sm:group-hover:opacity-100"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </span>

            {/* Subtle background blur */}
            <div
              className="absolute inset-0 bg-white/5 backdrop-blur-sm"
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>

        {/* Enhanced Trust Indicators - Better spacing and sizing for small devices */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4 sm:px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}>
          {[
            {
              icon: '⭐',
              value: '5.0',
              label: 'Client Rating',
              color: 'gold-highlight',
            },
            {
              icon: '👥',
              value: '50+',
              label: 'Happy Clients',
              color: 'mint-accent',
            },
            {
              icon: '🎓',
              value: '10+',
              label: 'Years Experience',
              color: 'sage-light',
            },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="group flex flex-col items-center text-white/90 transform cursor-default bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-white/10"
              whileHover={{
                y: -5,
                backgroundColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17,
              }}>
              <motion.div
                className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-full 
                          flex items-center justify-center mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                <span>{item.icon}</span>
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.2 }}
                  style={{
                    background:
                      item.color === 'gold-highlight'
                        ? 'linear-gradient(135deg, #D4AF37 0%, #F5E7A3 100%)'
                        : item.color === 'mint-accent'
                        ? 'linear-gradient(135deg, #A3D9C1 0%, #D1F5E6 100%)'
                        : 'linear-gradient(135deg, #A8B8A3 0%, #D1E3C9 100%)',
                  }}
                />
              </motion.div>

              <motion.span
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1 group-hover:text-gold-highlight transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 8 }}>
                {item.value}
              </motion.span>

              <span className="text-xs sm:text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 text-xs"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}>
        <span className="mb-2">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          initial={{ y: 0 }}>
          <motion.div
            className="w-1.5 h-1.5 bg-white/70 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Skip to main content link for accessibility */}
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:absolute focus:top-5 focus:left-5 bg-white text-primary px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary">
        Skip to main content
      </a>
    </section>
  )
}

export default Hero
