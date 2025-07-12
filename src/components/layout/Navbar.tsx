import React, { useState, useEffect } from 'react'
import logoImage from '../../assets/images/logo_sorted.png'
import { navLinks } from '../../constants/navigation'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-md py-4'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-3 focus:outline-none">
              <img
                src={logoImage}
                alt="Sorted & Organized Logo"
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'
                }`}
              />
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-accent-cool hover:text-accent-warm font-medium text-base transition-colors duration-200 py-2">
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+16123084781"
                className="ml-6 px-6 py-2.5 bg-accent-warm text-white font-semibold rounded-lg hover:bg-accent-warm/90 transition-all duration-200 transform hover:scale-105">
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary focus:outline-none"
              aria-label="Toggle menu">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-neutral shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="Logo" className="h-12" />
              <div>
                <div className="font-serif text-xl text-primary">
                  SORTED & ORGANIZED
                </div>
                <div className="text-xs text-secondary">by CM</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-primary focus:outline-none">
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
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 text-lg text-accent-cool hover:text-accent-warm hover:bg-white/50 rounded-lg transition-colors">
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Contact */}
          <div className="mt-8 pt-8 border-t border-secondary/30">
            <a
              href="tel:+16123084781"
              className="block w-full text-center px-6 py-3 bg-accent-warm text-white font-semibold rounded-lg">
              Call (612) 308-4781
            </a>
            <a
              href="mailto:sortedorganizedbycm@gmail.com"
              className="block w-full text-center px-6 py-3 mt-3 text-primary hover:text-accent-warm transition-colors">
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className={`${isScrolled ? 'h-20' : 'h-24'}`} />
    </>
  )
}

export default Navbar
