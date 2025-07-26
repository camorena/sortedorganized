// src/components/layout/Navbar.tsx
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import logoImage from '../../assets/images/logo_sorted.png'
import { navLinks } from '../../constants/navigation'
import useScrollEffect from '../../hooks/useScrollEffect'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [ref, isScrolled] = useScrollEffect<HTMLDivElement>({ threshold: 20 })

  // Memoized scroll handler to prevent unnecessary rerenders
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setIsOpen(false)
    }
  }, [])

  // Animation variants for the mobile menu
  const menuVariants: Variants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      x: 20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  // Close menu when clicking outside
  const handleBackdropClick = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close menu on escape key press
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        ref={ref}
        className="fixed top-0 w-full z-50 bg-white backdrop-blur-sm bg-white/95"
        initial={{ y: -100 }}
        animate={{
          y: 0,
          boxShadow: isScrolled
            ? '0 4px 20px rgba(0,0,0,0.08)'
            : '0 2px 10px rgba(0,0,0,0.05)',
          height: isScrolled ? '90px' : '110px',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section - Enhanced */}
            <button
              onClick={() => scrollToSection('hero')}
              className="relative focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-lg overflow-hidden group"
              aria-label="Go to homepage">
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}>
                <motion.img
                  src={logoImage}
                  alt="Sorted & Organized Logo"
                  className="h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                  }}
                  animate={{
                    width: isScrolled ? '110px' : '150px',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    duration: 0.3,
                    scale: { type: 'spring', stiffness: 400, damping: 17 },
                  }}
                />
              </motion.div>

              {/* Subtle background glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 rounded-full blur-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isScrolled ? 0.5 : 0.7, scale: 1 }}
                whileHover={{ opacity: 0.9, scale: 1.15 }}
                transition={{ duration: 0.4 }}
              />
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-accent-cool hover:text-accent-warm font-medium text-base transition-colors 
                           duration-200 py-2 relative focus:outline-none focus:text-accent-warm"
                  aria-label={`Go to ${link.label} section`}>
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-warm rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
              <motion.a
                href="tel:+16123084781"
                className="ml-6 px-6 py-2.5 bg-accent-warm text-white font-semibold rounded-lg 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-warm/50 focus:ring-offset-2"
                whileHover={{ scale: 1.05, backgroundColor: '#C5A798' }}
                whileTap={{ scale: 0.98 }}>
                Call Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-md"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu">
              <motion.div
                className="w-6 h-6 flex flex-col justify-center items-center"
                initial={false}
                animate={isOpen ? 'open' : 'closed'}>
                <motion.span
                  className="block w-6 h-0.5 bg-primary rounded-full"
                  variants={{
                    closed: { rotate: 0, y: -3 },
                    open: { rotate: 45, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-primary rounded-full my-0.5"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-primary rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 3 },
                    open: { rotate: -45, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-neutral shadow-2xl z-50 lg:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-label="Mobile navigation menu"
            role="dialog"
            aria-modal="true">
            <div className="p-6">
              {/* Mobile Menu Header - Simplified */}
              <div className="flex items-center justify-between mb-8">
                <motion.h2
                  className="text-xl font-serif text-primary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}>
                  Menu
                </motion.h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-md"
                  aria-label="Close menu">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left px-4 py-3 text-lg text-accent-cool hover:text-accent-warm 
                             hover:bg-white/50 rounded-lg transition-colors focus:outline-none focus:ring-2 
                             focus:ring-accent-warm/50"
                    variants={menuItemVariants}
                    aria-label={`Go to ${link.label} section`}>
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Mobile Menu Contact - Updated to show only Call button on medium and small devices */}
              <motion.div
                className="mt-8 pt-8 border-t border-secondary/30"
                variants={menuItemVariants}>
                <motion.a
                  href="tel:+16123084781"
                  className="block w-full text-center px-6 py-3 bg-accent-warm text-white font-semibold 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-warm/50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}>
                  Call (612) 308-4781
                </motion.a>
                <motion.a
                  href="mailto:sortedorganizedbycm@gmail.com"
                  className="block w-full text-center px-6 py-3 mt-3 text-primary hover:text-accent-warm 
                           transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg
                           hidden lg:block"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}>
                  Email Us
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer that adapts to navbar height */}
      <motion.div
        animate={{
          height: isScrolled ? '90px' : '110px',
        }}
        transition={{ duration: 0.4 }}
      />
    </>
  )
}

export default Navbar
