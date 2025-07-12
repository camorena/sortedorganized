import React, { useState, useEffect } from 'react'

interface ServiceCardProps {
  service: {
    title: string
    description: string
    icon?: string
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

  // Service-specific details
  const getServiceDetails = (title: string) => {
    const details: { [key: string]: any } = {
      // Residential Services
      'Pantry Organization': {
        duration: '4-6 hours',
        price: 'Starting at $400',
        includes: [
          'Custom labeling system',
          'Container recommendations',
          'Zone creation for meal planning',
          'Inventory management setup',
        ],
        process:
          "We'll sort through items, create functional zones, and implement a sustainable system that makes meal prep effortless.",
        bestFor: 'Busy families, cooking enthusiasts',
      },
      'Kitchen Organization': {
        duration: '3-5 hours',
        price: 'Starting at $350',
        includes: [
          'Cabinet optimization',
          'Drawer divider systems',
          'Counter decluttering',
          'Appliance organization',
        ],
        process:
          'Transform your kitchen into an efficient workspace where everything has its place and cooking becomes a joy.',
        bestFor: 'Home chefs, entertainers',
      },
      'Closet Makeovers': {
        duration: '4-8 hours',
        price: 'Starting at $450',
        includes: [
          'Wardrobe assessment',
          'Seasonal rotation system',
          'Color coordination',
          'Accessory solutions',
        ],
        process:
          'Create a boutique-like experience in your own closet with systems that make getting dressed effortless.',
        bestFor: 'Fashion lovers, busy professionals',
      },
      'Home Office Setup': {
        duration: '3-6 hours',
        price: 'Starting at $375',
        includes: [
          'Desk organization',
          'Filing system creation',
          'Supply management',
          'Cable organization',
        ],
        process:
          'Design a workspace that promotes focus and productivity while keeping everything you need at your fingertips.',
        bestFor: 'Remote workers, entrepreneurs',
      },
      'Playroom Organization': {
        duration: '3-5 hours',
        price: 'Starting at $325',
        includes: [
          'Toy categorization',
          'Activity zone creation',
          'Storage solutions',
          'Easy cleanup systems',
        ],
        process:
          'Create defined play areas that encourage creativity while making cleanup time quick and easy.',
        bestFor: 'Families with young children',
      },
      'Laundry Room Setup': {
        duration: '2-4 hours',
        price: 'Starting at $275',
        includes: [
          'Sorting system setup',
          'Supply organization',
          'Folding station design',
          'Schedule creation',
        ],
        process:
          'Streamline your laundry routine with systems that save time and reduce the weekly chore burden.',
        bestFor: 'Large families, busy households',
      },
      'Moving Services': {
        duration: '6-12 hours',
        price: 'Custom quote',
        includes: [
          'Pre-move decluttering',
          'Packing organization',
          'New home setup',
          'Unpacking assistance',
        ],
        process:
          'Make your move seamless with organized packing and thoughtful unpacking in your new space.',
        bestFor: 'Anyone relocating',
      },
      'Home Styling': {
        duration: '3-5 hours',
        price: 'Starting at $350',
        includes: [
          'Decor organization',
          'Surface styling',
          'Room flow optimization',
          'Seasonal refresh',
        ],
        process:
          'Elevate your space with thoughtful styling that showcases your personality while maintaining order.',
        bestFor: 'Design enthusiasts, home sellers',
      },
      'Maintenance Plans': {
        duration: '2-3 hours/month',
        price: 'Monthly packages available',
        includes: [
          'System maintenance',
          'Seasonal updates',
          'Ongoing support',
          'Priority booking',
        ],
        process:
          'Keep your organized spaces functioning perfectly with regular maintenance visits.',
        bestFor: 'Busy professionals, growing families',
      },

      // Commercial Services
      'Office Space Organization': {
        duration: '6-10 hours',
        price: 'Starting at $800',
        includes: [
          'Workspace optimization',
          'Common area setup',
          'Storage solutions',
          'Workflow design',
        ],
        process:
          'Create an office environment that promotes productivity and collaboration among your team.',
        bestFor: 'Small businesses, startups',
      },
      'Filing Organization': {
        duration: '4-6 hours',
        price: 'Starting at $450',
        includes: [
          'Document categorization',
          'Filing system design',
          'Archive organization',
          'Digital integration',
        ],
        process:
          'Implement a filing system that makes document retrieval quick and maintains compliance.',
        bestFor: 'Professional offices, medical practices',
      },
      'Supply Room Setup': {
        duration: '3-5 hours',
        price: 'Starting at $375',
        includes: [
          'Inventory systems',
          'Labeling solutions',
          'Reorder protocols',
          'Access organization',
        ],
        process:
          'Design a supply room that prevents overordering and ensures everything is easily accessible.',
        bestFor: 'Offices, retail spaces',
      },
      'Break Room Organization': {
        duration: '2-4 hours',
        price: 'Starting at $300',
        includes: [
          'Kitchen organization',
          'Supply management',
          'Cleaning schedules',
          'Shared space protocols',
        ],
        process:
          "Create a break room that's inviting, clean, and functional for all team members.",
        bestFor: 'Corporate offices, co-working spaces',
      },
      'Reception & Lobby': {
        duration: '3-5 hours',
        price: 'Starting at $400',
        includes: [
          'First impression optimization',
          'Literature organization',
          'Waiting area setup',
          'Storage solutions',
        ],
        process:
          'Design a welcoming reception area that makes a professional first impression.',
        bestFor: 'Client-facing businesses',
      },
      'Workflow Optimization': {
        duration: '4-8 hours',
        price: 'Custom quote',
        includes: [
          'Process mapping',
          'Space planning',
          'Efficiency systems',
          'Team training',
        ],
        process:
          'Analyze and optimize your workspace layout to improve team productivity and collaboration.',
        bestFor: 'Growing teams, efficiency-focused businesses',
      },
      'Event Prep Support': {
        duration: 'Varies',
        price: 'Hourly rate available',
        includes: [
          'Supply organization',
          'Setup systems',
          'Storage solutions',
          'Post-event protocols',
        ],
        process:
          'Ensure your events run smoothly with organized preparation and storage systems.',
        bestFor: 'Event venues, conference centers',
      },

      // Add-on Services
      'Donation Coordination': {
        duration: '2-4 hours',
        price: 'Starting at $150',
        includes: [
          'Item sorting',
          'Donation scheduling',
          'Pickup coordination',
          'Tax receipt assistance',
        ],
        process:
          'We handle the entire donation process, ensuring your items find new homes responsibly.',
        bestFor: 'Decluttering projects',
      },
      'Labeling Services': {
        duration: '1-3 hours',
        price: 'Starting at $125',
        includes: [
          'Custom label design',
          'Professional printing',
          'System implementation',
          'Style consistency',
        ],
        process:
          "Create a cohesive labeling system that's both beautiful and functional.",
        bestFor: 'Completed organization projects',
      },
      'Product Sourcing': {
        duration: 'Consultation + delivery',
        price: 'Cost + 20% fee',
        includes: [
          'Needs assessment',
          'Product research',
          'Budget optimization',
          'Delivery coordination',
        ],
        process:
          'We source the perfect organizational products to fit your space and budget.',
        bestFor: 'DIY organizers, busy clients',
      },
      'Virtual Organizing': {
        duration: '1-2 hour sessions',
        price: '$125/session',
        includes: [
          'Video consultation',
          'Action plan creation',
          'Product recommendations',
          'Follow-up support',
        ],
        process:
          'Get professional organizing guidance from anywhere with our virtual sessions.',
        bestFor: 'Remote clients, DIY enthusiasts',
      },
      'Gift Certificates': {
        duration: 'Flexible',
        price: 'Any amount',
        includes: [
          'Beautiful presentation',
          'Flexible redemption',
          'Personal consultation',
          'Custom packages',
        ],
        process:
          'Give the gift of organization - perfect for housewarmings, holidays, or life transitions.',
        bestFor: 'Gift givers, special occasions',
      },
      'Workshops & Coaching': {
        duration: '2-3 hours',
        price: 'Group rates available',
        includes: [
          'Hands-on training',
          'Organizing principles',
          'Take-home resources',
          'Q&A sessions',
        ],
        process:
          'Learn organizing skills in a fun, interactive workshop setting.',
        bestFor: 'Groups, team building',
      },
    }

    return (
      details[title] || {
        duration: '3-5 hours',
        price: 'Contact for quote',
        includes: [
          'Initial consultation',
          'Custom plan creation',
          'Hands-on organization',
          'Follow-up support',
        ],
        process:
          "We'll work together to create a customized solution for your unique needs.",
        bestFor: 'Various applications',
      }
    )
  }

  const details = getServiceDetails(service.title)

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
          e.preventDefault()
          setIsFlipped(!isFlipped)
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
            {service.icon && (
              <div
                className={`w-20 h-20 ${colors.icon} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 hover:${colors.iconHover} hover:scale-110`}>
                <span className="text-4xl">{service.icon}</span>
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

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-left">
                <p className={`text-xs ${colors.accent} font-medium`}>
                  Duration
                </p>
                <p className="text-sm text-charcoal">{details.duration}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs ${colors.accent} font-medium`}>
                  Starting at
                </p>
                <p className="text-sm text-charcoal">{details.price}</p>
              </div>
            </div>

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

        {/* Back of Card */}
        <div
          className={`absolute inset-0 rounded-xl border ${colors.border} ${colors.back} 
                      bg-white shadow-lg p-6 flex flex-col overflow-y-auto`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}>
          {/* Back Header */}
          <div className="mb-4 pb-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-charcoal">
                {service.title}
              </h4>
              <button className="p-1 text-charcoal/40 hover:text-charcoal transition-colors">
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

          <div className="flex-grow space-y-4 text-sm">
            {/* What's Included */}
            <div>
              <h5
                className={`text-xs uppercase tracking-wider ${colors.accent} font-semibold mb-2`}>
                What's Included
              </h5>
              <ul className="space-y-1">
                {details.includes.slice(0, 4).map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start text-forest-shadow/80">
                    <span className={`${colors.accent} mr-2 mt-0.5 text-xs`}>
                      •
                    </span>
                    <span className="text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <h5
                className={`text-xs uppercase tracking-wider ${colors.accent} font-semibold mb-2`}>
                Our Process
              </h5>
              <p className="text-xs text-forest-shadow/70 leading-relaxed">
                {details.process}
              </p>
            </div>

            {/* Best For */}
            <div>
              <h5
                className={`text-xs uppercase tracking-wider ${colors.accent} font-semibold mb-2`}>
                Best For
              </h5>
              <p className="text-xs text-forest-shadow/70">{details.bestFor}</p>
            </div>
          </div>

          {/* Back Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200">
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
  )
}

export default ServiceCard
