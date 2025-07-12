// src/components/sections/Hero.tsx
import React, { useEffect, useState, useRef } from 'react'

// Import the hero image - make sure this path matches your file structure
// If the image doesn't exist yet, you'll need to add it to src/assets/images/
import heroImage from '../../assets/images/hero-bg.png'
// Replace the import with:
//const heroImage = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop';
// Fallback gradient in case image fails to load
const FALLBACK_GRADIENT =
  'linear-gradient(135deg, rgba(89,104,86,0.05) 0%, rgba(158,190,165,0.02) 50%, rgba(228,240,228,0.005) 100%)'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Trigger animations
    const timer = setTimeout(() => setIsVisible(true), 100)

    // Preload image with error handling
    const img = new Image()
    img.src = heroImage

    img.onload = () => {
      setImageLoaded(true)
      setImageError(false)
    }

    img.onerror = () => {
      console.error('Failed to load hero image:', heroImage)
      setImageError(true)
      setImageLoaded(true) // Set loaded to true to hide loading state
    }

    return () => clearTimeout(timer)
  }, [])

  // Enhanced Parallax effect with performance optimization
  useEffect(() => {
    let ticking = false

    const updateParallax = () => {
      if (parallaxRef.current && heroRef.current) {
        const scrolled = window.pageYOffset
        const heroBottom =
          heroRef.current.offsetTop + heroRef.current.offsetHeight

        // Only apply parallax when hero is in viewport
        if (scrolled < heroBottom) {
          const speed = 0.5
          const yPos = -(scrolled * speed)
          parallaxRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`
        }
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Initial call
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-charcoal"
      role="banner"
      aria-label="Hero section">
      {/* Loading Placeholder with skeleton effect */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-forest-shadow to-sage-light">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Background Image with Parallax */}
      <div
        ref={parallaxRef}
        className={`absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: imageError ? FALLBACK_GRADIENT : `url(${heroImage})`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true">
        {/* Add noise texture for depth */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/95 via-charcoal/80 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gold-highlight/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-mint-accent/10 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-sage-light/5 rounded-full blur-[80px] animate-pulse-slow" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        {/* Animated Badge */}
        <div className="inline-block mb-8 animate-fadeInDown animation-delay-200">
          <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20 shadow-lg hover:bg-white/15 transition-colors">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-highlight opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-highlight shadow-sm"></span>
            </span>
            Now Serving Twin Cities Metro
          </span>
        </div>

        {/* Title with Enhanced Word Animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white mb-8 leading-tight">
          {['Transform', 'Clutter', 'into', 'Clarity'].map((word, index) => (
            <span
              key={word}
              className="inline-block animate-fadeInUp mr-2 md:mr-4 hover:text-gold-highlight transition-colors duration-300"
              style={{
                animationDelay: `${(index + 2) * 150}ms`,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}>
              {word}
            </span>
          ))}
        </h1>

        {/* Enhanced Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-700">
          Luxury organization services tailored to your lifestyle.
          <span className="block mt-2 text-gold-highlight/80">
            Create spaces that inspire productivity and peace.
          </span>
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fadeInUp animation-delay-900">
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative inline-flex items-center px-12 py-5 bg-gold-highlight text-white font-semibold 
                     rounded-lg transform transition-all duration-300 overflow-hidden
                     shadow-lg hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold-highlight/50"
            aria-label="Book a consultation">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center text-lg">
              Book a Consultation
              <svg
                className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className="group relative inline-flex items-center px-12 py-5 text-white font-semibold 
                     rounded-lg transform transition-all duration-300 overflow-hidden
                     border-2 border-white/30 hover:border-white/60 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label="View our services">
            <span className="absolute inset-0 bg-white/5 backdrop-blur-sm"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            <span className="relative text-lg">View Services</span>
          </button>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
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
            <div
              key={item.label}
              className={`group flex flex-col items-center text-white/90 transform transition-all duration-300 hover:scale-110 animate-fadeInUp cursor-default`}
              style={{ animationDelay: `${1100 + index * 100}ms` }}>
              <div
                className={`relative w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-3 group-hover:bg-${item.color}/20 transition-all duration-300 group-hover:shadow-lg`}>
                <span className="text-3xl transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div
                  className={`absolute inset-0 rounded-full bg-${item.color}/20 scale-0 group-hover:scale-100 transition-transform duration-500`}></div>
              </div>
              <span className="text-3xl font-bold mb-1 group-hover:text-gold-highlight transition-colors">
                {item.value}
              </span>
              <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
