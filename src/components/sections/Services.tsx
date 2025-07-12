// src/components/sections/Services.tsx
import React, { useEffect, useState, useRef } from 'react'
import ServiceCard from '../ui/ServiceCard'

// Service data
const residentialServices = [
  {
    title: 'Pantry Organization',
    description: 'Product sourcing, workflow optimization, declutter food, boxes, add containers',
    icon: '🥫',
  },
  {
    title: 'Kitchen Organization',
    description: 'Cabinets, drawers, under-sink storage optimization',
    icon: '🍴',
  },
  {
    title: 'Closet Makeovers',
    description: 'Sorting, folding, seasonal rotation, space-saving strategies',
    icon: '👔',
  },
  {
    title: 'Home Office Setup',
    description: 'Desks, bookcases, staging, décor, paper filing systems',
    icon: '💼',
  },
  {
    title: 'Playroom Organization',
    description: 'Toy rotation systems, labeled bins for easy cleanup',
    icon: '🧸',
  },
  {
    title: 'Laundry Room Setup',
    description: 'Efficient layout and storage solutions',
    icon: '🧺',
  },
  {
    title: 'Moving Services',
    description: 'Declutter before moving and organize in new home',
    icon: '📦',
  },
  {
    title: 'Home Styling',
    description: 'Staging and declutter after organizing',
    icon: '🏡',
  },
  {
    title: 'Maintenance Plans',
    description: 'Monthly or seasonal refresh sessions',
    icon: '📅',
  },
]

const commercialServices = [
  {
    title: 'Office Space Organization',
    description: 'Desks, common areas, conference rooms optimization',
    icon: '🏢',
  },
  {
    title: 'Filing Organization',
    description: 'Physical document organization systems',
    icon: '📁',
  },
  {
    title: 'Supply Room Setup',
    description: 'Inventory and labeling systems',
    icon: '📋',
  },
  {
    title: 'Break Room Organization',
    description: 'Snacks, kitchenware, shared storage solutions',
    icon: '☕',
  },
  {
    title: 'Reception & Lobby',
    description: 'First impression-ready space decluttering',
    icon: '🎯',
  },
  {
    title: 'Workflow Optimization',
    description: 'Functional setup of high-use areas',
    icon: '⚡',
  },
  {
    title: 'Event Prep Support',
    description: 'Organizing supplies/materials before corporate events',
    icon: '🎉',
  },
]

const addOnServices = [
  {
    title: 'Donation Coordination',
    description: 'Drop-off or pickup of unwanted items',
    icon: '♻️',
  },
  {
    title: 'Labeling Services',
    description: 'Custom, aesthetic labeling for jars, bins, files',
    icon: '🏷️',
  },
  {
    title: 'Product Sourcing',
    description: 'Recommending or purchasing containers and tools',
    icon: '🛍️',
  },
  {
    title: 'Virtual Organizing',
    description: 'Guidance via video calls for remote clients',
    icon: '💻',
  },
  {
    title: 'Gift Certificates',
    description: 'Organization as a thoughtful service gift',
    icon: '🎁',
  },
  {
    title: 'Workshops & Coaching',
    description: 'Teach clients how to maintain their spaces',
    icon: '🎓',
  },
]

// Responsive Horizontal Scroll Section
interface ScrollSectionProps {
  title: string
  subtitle: string
  services: any[]
  category: 'residential' | 'commercial' | 'addon'
  isVisible: boolean
}

const ScrollSection: React.FC<ScrollSectionProps> = ({ title, subtitle, services, category, isVisible }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Check device type
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
      
      // Calculate scroll progress
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = isMobile ? 280 : isTablet ? 300 : 320
      const gap = 24
      const scrollAmount = cardWidth + gap
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const element = scrollRef.current
    if (element) {
      element.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => element.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`mb-12 sm:mb-16 lg:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Section Header - Responsive */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-light text-charcoal mb-2">{title}</h3>
          <p className="text-xs sm:text-sm text-forest-shadow/60 mb-1">{subtitle}</p>
          <p className="text-xs text-charcoal/40 italic">
            {isMobile ? 'Swipe to explore' : 'Click cards for details'}
          </p>
        </div>
        
        {/* Progress Indicator - Desktop only */}
        <div className="hidden lg:block w-32 h-1 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
          <div 
            className="h-full bg-charcoal/20 rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
      
      {/* Scroll Container */}
      <div className="relative">
        {/* Navigation Arrows - Hidden on mobile */}
        {!isMobile && (
          <>
            <button
              onClick={() => scroll('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg 
                         flex items-center justify-center transition-all duration-300 hover:shadow-xl
                         ${showLeftArrow ? 'opacity-100 -translate-x-3 sm:-translate-x-5' : 'opacity-0 translate-x-0 pointer-events-none'}`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => scroll('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg 
                         flex items-center justify-center transition-all duration-300 hover:shadow-xl
                         ${showRightArrow ? 'opacity-100 translate-x-3 sm:translate-x-5' : 'opacity-0 translate-x-0 pointer-events-none'}`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Cards Container - Responsive scroll */}
        <div 
          ref={scrollRef}
          className={`
            flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4
            ${isMobile ? 'snap-x snap-mandatory' : ''}
            -mx-4 px-4 sm:mx-0 sm:px-0
          `}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' // Better iOS scrolling
          }}
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`
                flex-none
                ${isMobile ? 'w-[calc(100vw-48px)] max-w-[320px] snap-center' : ''}
                ${isTablet ? 'w-[300px]' : ''}
                ${!isMobile && !isTablet ? 'w-80' : ''}
                h-[360px] sm:h-[384px]
              `}
            >
              <ServiceCard 
                service={service} 
                index={index} 
                isVisible={isVisible} 
                category={category}
              />
            </div>
          ))}
          {/* End padding */}
          <div className={`flex-none ${isMobile ? 'w-4' : 'w-4 sm:w-6'}`} />
        </div>
      </div>
      
      {/* Scroll Indicators - Mobile only */}
      {isMobile && services.length > 1 && (
        <div className="flex justify-center mt-4 gap-1">
          {services.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                Math.round(scrollProgress / (100 / (services.length - 1))) === index
                  ? 'w-6 bg-charcoal/40'
                  : 'w-1 bg-charcoal/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Main Services Component - Fully Responsive
const Services: React.FC = () => {
  const [sectionsVisible, setSectionsVisible] = useState({
    header: false,
    residential: false,
    commercial: false,
    addons: false,
    cta: false
  })

  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observers = {
      header: new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setSectionsVisible(prev => ({ ...prev, header: true }))
      }, options),
      residential: new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setSectionsVisible(prev => ({ ...prev, residential: true }))
      }, options),
      commercial: new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setSectionsVisible(prev => ({ ...prev, commercial: true }))
      }, options),
      addons: new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setSectionsVisible(prev => ({ ...prev, addons: true }))
      }, options),
      cta: new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setSectionsVisible(prev => ({ ...prev, cta: true }))
      }, options)
    }

    // Observe elements
    const elements = {
      header: document.getElementById('services-header'),
      residential: document.getElementById('services-residential'),
      commercial: document.getElementById('services-commercial'),
      addons: document.getElementById('services-addons'),
      cta: document.getElementById('services-cta')
    }

    Object.entries(elements).forEach(([key, element]) => {
      if (element && observers[key as keyof typeof observers]) {
        observers[key as keyof typeof observers].observe(element)
      }
    })

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect())
    }
  }, [])

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-fog-gray/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header - Responsive Typography */}
        <div 
          id="services-header"
          className={`max-w-3xl mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            sectionsVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-4 sm:mb-6">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-forest-shadow/70 leading-relaxed">
            From residential sanctuaries to professional workspaces, we create
            organized environments that inspire productivity and peace of mind.
          </p>
        </div>

        {/* Service Sections - Responsive Spacing */}
        <div id="services-residential">
          <ScrollSection
            title="Residential"
            subtitle="Transform your home into a sanctuary of order and beauty"
            services={residentialServices}
            category="residential"
            isVisible={sectionsVisible.residential}
          />
        </div>

        <div id="services-commercial">
          <ScrollSection
            title="Commercial"
            subtitle="Optimize your workspace for enhanced productivity and success"
            services={commercialServices}
            category="commercial"
            isVisible={sectionsVisible.commercial}
          />
        </div>

        <div id="services-addons">
          <ScrollSection
            title="Additional Services"
            subtitle="Flexible solutions to support your organizational journey"
            services={addOnServices}
            category="addon"
            isVisible={sectionsVisible.addons}
          />
        </div>

        {/* CTA Section - Fully Responsive */}
        <div 
          id="services-cta"
          className={`mt-16 sm:mt-24 lg:mt-32 transition-all duration-1000 ${
            sectionsVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-light text-charcoal mb-4 sm:mb-6">
              Begin Your Journey to Organization
            </h3>
            <p className="text-base sm:text-lg text-forest-shadow/70 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Every space has potential. Let's unlock yours together with a 
              personalized consultation tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
                         bg-charcoal text-white rounded-full text-sm sm:text-base
                         hover:bg-charcoal/90 transform hover:scale-105 
                         transition-all duration-300 shadow-lg group"
              >
                <span>Schedule Free Consultation</span>
                <svg className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+16123084781"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
                         text-charcoal border border-charcoal/20 rounded-full text-sm sm:text-base
                         hover:bg-charcoal hover:text-white 
                         transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="whitespace-nowrap">(612) 308-4781</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services