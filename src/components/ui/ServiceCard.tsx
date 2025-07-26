import React, { useState, useEffect, useRef } from 'react'
import ServiceIcons from './ServiceIcons'

// Updated interface to match service object structure from services.ts
interface ServiceCardProps {
  service: {
    title: string
    description: string
    iconType?: string
    details?: string[]
  }
  index: number
  category: 'residential' | 'commercial' | 'addon'
  isVisible?: boolean
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  category,
  isVisible = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

  // Handle escape key to flip back
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFlipped) {
        setIsFlipped(false)
      }
    }

    if (isFlipped) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isFlipped])

  // Check if content needs scroll indicator
  useEffect(() => {
    if (isFlipped && contentRef.current) {
      const checkScroll = () => {
        const { scrollHeight, clientHeight } = contentRef.current!
        setShowScrollIndicator(scrollHeight > clientHeight + 10)
      }

      checkScroll()

      // Recheck on window resize
      window.addEventListener('resize', checkScroll)
      return () => window.removeEventListener('resize', checkScroll)
    }
  }, [isFlipped])

  // Category colors
  const categoryColors = {
    residential: {
      front: 'bg-gradient-to-br from-sage-light/5 to-mint-accent/5',
      back: 'bg-gradient-to-br from-sage-light/10 to-mint-accent/10',
      accent: 'text-sage-light',
      border: 'border-sage-light/20',
      icon: 'bg-sage-light/20',
      iconHover: 'bg-sage-light/30',
      badge: 'bg-sage-light/20 text-sage',
    },
    commercial: {
      front: 'bg-gradient-to-br from-forest-shadow/5 to-charcoal/5',
      back: 'bg-gradient-to-br from-forest-shadow/10 to-charcoal/10',
      accent: 'text-forest-shadow',
      border: 'border-forest-shadow/20',
      icon: 'bg-forest-shadow/20',
      iconHover: 'bg-forest-shadow/30',
      badge: 'bg-forest-shadow/20 text-forest-shadow',
    },
    addon: {
      front: 'bg-gradient-to-br from-gold-highlight/5 to-warm-ivory/5',
      back: 'bg-gradient-to-br from-gold-highlight/10 to-warm-ivory/10',
      accent: 'text-gold-highlight',
      border: 'border-gold-highlight/20',
      icon: 'bg-gold-highlight/20',
      iconHover: 'bg-gold-highlight/30',
      badge: 'bg-gold-highlight/20 text-gold-highlight',
    },
  }

  const colors = categoryColors[category]

  // Handle touch scroll interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!contentRef.current) return

    const touchY = e.touches[0].clientY
    const scrollTop = contentRef.current.scrollTop
    const scrollHeight = contentRef.current.scrollHeight
    const clientHeight = contentRef.current.clientHeight

    // Only stop propagation if trying to scroll beyond bounds
    if (
      (scrollTop === 0 && touchY > touchStartY.current) || // Trying to scroll up at top
      (scrollTop >= scrollHeight - clientHeight && touchY < touchStartY.current) // Trying to scroll down at bottom
    ) {
      e.stopPropagation()
    }

    setIsScrolling(true)
  }

  const handleTouchEnd = () => {
    // Small delay to determine if this was a scroll or a tap
    setTimeout(() => setIsScrolling(false), 100)
  }

  const handleContentClick = (e: React.MouseEvent) => {
    // Prevent card from flipping back when clicking on scrollable content
    if (isScrolling) {
      e.stopPropagation()
    }
  }

  return (
    <div
      className={`relative h-96 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        perspective: '1000px',
      }}>
      <div
        className="relative w-full h-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        onTouchEnd={(e) => {
          if (!isScrolling) {
            e.preventDefault()
            setIsFlipped(!isFlipped)
          }
        }}>
        {/* Front of Card */}
        <div
          className={`absolute inset-0 rounded-xl border ${colors.border} ${colors.front} 
                      bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-8
                      flex flex-col`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}>
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`text-xs px-3 py-1 rounded-full ${colors.badge} font-medium capitalize`}>
              {category}
            </span>
          </div>

          <div className="flex flex-col h-full">
            {/* Icon */}
            {service.iconType && (
              <div
                className={`w-20 h-20 ${colors.icon} rounded-full flex items-center justify-center mb-6 mx-auto 
                           transition-all duration-300 hover:scale-110 shadow-md`}>
                {ServiceIcons[service.iconType as keyof typeof ServiceIcons] ? (
                  React.createElement(
                    ServiceIcons[service.iconType as keyof typeof ServiceIcons],
                    {
                      className: `${colors.accent}`,
                      size: 36,
                    }
                  )
                ) : (
                  <div className="text-4xl">✦</div>
                )}
              </div>
            )}

            {/* Title */}
            <h4 className="text-2xl font-medium text-charcoal mb-4 text-center">
              {service.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-forest-shadow/70 leading-relaxed text-center flex-grow">
              {service.description}
            </p>

            {/* No duration or price displayed on front card */}

            {/* Flip Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center text-charcoal/40 text-xs">
                <span className="mr-1">See details</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card - Using details from services.ts */}
        <div
          className={`absolute inset-0 rounded-xl border ${colors.border} ${colors.back} 
                      bg-white shadow-lg flex flex-col`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}>
          {/* Back Header - Fixed */}
          <div className="px-6 pt-6 pb-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-charcoal">
                {service.title}
              </h4>
              <button
                className="p-1 text-charcoal/40 hover:text-charcoal transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(false)
                }}>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div
            ref={contentRef}
            className="flex-grow overflow-y-auto px-6 py-4 service-modal-scroll"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleContentClick}>
            {/* Service Details */}
            <div className="space-y-4 text-sm">
              {/* What's Included */}
              {service.details && service.details.length > 0 && (
                <div>
                  <h5
                    className={`text-xs uppercase tracking-wider ${colors.accent} font-semibold mb-2`}>
                    What's Included
                  </h5>
                  <ul className="space-y-1">
                    {service.details.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start text-forest-shadow/80">
                        <span
                          className={`${colors.accent} mr-2 mt-0.5 text-xs`}>
                          •
                        </span>
                        <span className="text-xs leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Best For */}
              <div>
                <h5
                  className={`text-xs uppercase tracking-wider ${colors.accent} font-semibold mb-2`}>
                  Best For
                </h5>
                <p className="text-xs text-forest-shadow/70">
                  {service.title.includes('Pantry')
                    ? 'Busy families, cooking enthusiasts'
                    : service.title.includes('Kitchen')
                    ? 'Home chefs, families, anyone seeking kitchen efficiency'
                    : service.title.includes('Closet')
                    ? 'Fashion enthusiasts, seasonal wardrobe managers'
                    : service.title.includes('Office')
                    ? 'Professionals, remote workers, students'
                    : service.title.includes('Play')
                    ? 'Families with children, daycare providers'
                    : service.title.includes('Laundry')
                    ? 'Busy households, efficiency seekers'
                    : service.title.includes('Moving')
                    ? 'Relocating families, downsizers, new homeowners'
                    : service.title.includes('Styling')
                    ? 'Home decorators, real estate staging, visual aesthetics'
                    : service.title.includes('Maintenance')
                    ? 'Previous clients, busy professionals'
                    : service.title.includes('Commercial') ||
                      service.title.includes('Filing')
                    ? 'Businesses, professional offices'
                    : service.title.includes('Supply')
                    ? 'Retail, offices, inventory management'
                    : service.title.includes('Break')
                    ? 'Office managers, workplace environments'
                    : service.title.includes('Reception')
                    ? 'Client-facing businesses, service providers'
                    : service.title.includes('Workflow')
                    ? 'Process-oriented businesses, efficiency optimization'
                    : service.title.includes('Event')
                    ? 'Corporate planners, event organizers'
                    : service.title.includes('Donation')
                    ? 'Declutterers, downsizers, charitable individuals'
                    : service.title.includes('Label')
                    ? 'Detail-oriented organizers, visual harmony seekers'
                    : service.title.includes('Product')
                    ? 'New organization projects, space optimization'
                    : service.title.includes('Virtual')
                    ? 'Remote clients, DIY organizers with guidance'
                    : service.title.includes('Gift')
                    ? 'Thoughtful gift givers, special occasions'
                    : service.title.includes('Workshop')
                    ? 'Groups, teams, self-improvement seekers'
                    : 'Anyone seeking a more organized, functional space'}
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
              <svg
                className="w-5 h-5 text-forest-shadow/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          )}

          {/* Back Footer - Fixed */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <a
                href="#contact"
                className={`block w-full text-center py-3 px-4 rounded-lg ${colors.badge} 
                       hover:opacity-90 transition-opacity font-medium text-sm`}
                onClick={(e) => e.stopPropagation()}>
                Book This Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
