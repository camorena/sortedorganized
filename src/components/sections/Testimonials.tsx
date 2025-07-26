// src/components/sections/Testimonials.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

// Types
interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  image?: string | null
  role?: string
}

// Testimonials data - moved to constants folder in production
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Minneapolis, MN',
    text: 'Catalina transformed my chaotic pantry into a beautifully organized space. I can finally find everything I need!',
    rating: 5,
    image: null,
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'St. Paul, MN',
    text: 'The office organization service was a game-changer for my productivity. Highly recommend!',
    rating: 5,
    image: null,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'Edina, MN',
    text: 'Professional, efficient, and the results exceeded my expectations. My closet has never looked better!',
    rating: 5,
    image: null,
  },
  {
    id: '4',
    name: 'David Thompson',
    location: 'Bloomington, MN',
    text: 'The team helped us prepare for our move. Decluttering before packing saved us so much time and stress.',
    rating: 5,
    image: null,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    location: 'Woodbury, MN',
    text: 'Worth every penny! The maintenance plan keeps everything looking perfect months later.',
    rating: 5,
    image: null,
  },
  {
    id: '6',
    name: 'James Wilson',
    location: 'Plymouth, MN',
    text: 'Our company break room went from disaster to delight. The team is amazing!',
    rating: 5,
    image: null,
    role: 'Office Manager',
  },
]

// Testimonial Card Component
const TestimonialCard: React.FC<{
  testimonial: Testimonial
  index: number
  isVisible: boolean
  isActive: boolean
}> = ({ testimonial, index, isVisible, isActive }) => {
  return (
    <motion.div
      className="relative bg-white rounded-xl shadow-lg p-6 h-full group"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.9,
        y: isVisible ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        isActive
          ? {
              y: -10,
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }
          : {}
      }
      layout>
      {/* Quote icon */}
      <motion.div
        className="absolute top-6 right-6 text-accent-warm/20"
        initial={{ opacity: 0.2, scale: 1 }}
        whileHover={{ opacity: 0.4, scale: 1.1, rotate: 10 }}
        transition={{ duration: 0.3 }}>
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </motion.div>

      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Rating Stars */}
          <div className="flex mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                className={
                  i < testimonial.rating
                    ? 'text-gold-highlight'
                    : 'text-gray-300'
                }
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.span>
            ))}
          </div>

          {/* Testimonial Text */}
          <motion.p
            className="text-forest-shadow mb-6 italic leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}>
            "{testimonial.text}"
          </motion.p>
        </div>

        {/* Client Info */}
        <motion.div
          className="flex items-center mt-auto pt-4 border-t border-sage-light/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
          {testimonial.image ? (
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
              <motion.img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-br from-accent-warm/30 to-accent-cool/30 flex items-center justify-center border-2 border-white shadow-md">
              <span className="text-primary font-semibold text-lg">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}

          <div>
            <p className="text-charcoal font-semibold">{testimonial.name}</p>
            <div className="flex items-center text-charcoal/70 text-sm">
              <span>{testimonial.location}</span>
              {testimonial.role && (
                <>
                  <span className="mx-1.5">•</span>
                  <span className="italic">{testimonial.role}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Main Testimonials Component
const Testimonials: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>()
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayCount, setDisplayCount] = useState(3)

  // Detect screen size for responsive display
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDisplayCount(3) // Desktop: 3 cards
      } else if (window.innerWidth >= 768) {
        setDisplayCount(2) // Tablet: 2 cards
      } else {
        setDisplayCount(1) // Mobile: 1 card
      }
    }

    handleResize() // Initial call
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Get visible testimonials
  const getVisibleTestimonials = () => {
    const startIndex = activeIndex
    const endIndex = startIndex + displayCount
    return testimonials.slice(startIndex, endIndex)
  }

  // Navigation handlers
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - displayCount) : prev - 1
    )
  }

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev >= testimonials.length - displayCount ? 0 : prev + 1
    )
  }

  // Auto-advance testimonials
  React.useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      handleNext()
    }, 8000)

    return () => clearInterval(interval)
  }, [isVisible, activeIndex, displayCount])

  const visibleTestimonials = getVisibleTestimonials()
  const totalGroups = Math.ceil(testimonials.length / displayCount)

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-16 md:py-24 bg-gradient-to-br from-warm-ivory to-fog-gray">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20,
            }}
            transition={{ duration: 0.6 }}>
            <div className="inline-block mb-4 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-sage-light/20 shadow-sm">
              <span className="text-accent-warm text-sm font-medium">
                Client Experiences
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal mb-4">
              What Our Clients Say
            </h2>

            <p className="text-forest-shadow/80 max-w-xl">
              Real stories from real clients who have transformed their spaces
              with our services.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center space-x-3 mt-6 md:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <button
              onClick={handlePrev}
              className="p-3 bg-white/80 hover:bg-accent-warm hover:text-white text-primary rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-warm/50"
              aria-label="Previous testimonial">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white/80 hover:bg-accent-warm hover:text-white text-primary rounded-full shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-warm/50"
              aria-label="Next testimonial">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        <div className="relative">
          {/* Progress Bar */}
          <div className="hidden md:block absolute -top-8 left-0 right-0 h-1 bg-secondary/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-warm rounded-full"
              initial={{ width: '0%' }}
              animate={{
                width: `${
                  (activeIndex / (testimonials.length - displayCount)) * 100
                }%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Cards Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-${displayCount} gap-6 md:gap-8`}>
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isVisible={isVisible}
                isActive={true}
              />
            ))}
          </div>

          {/* Pagination Indicators */}
          {testimonials.length > displayCount && (
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalGroups }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx * displayCount)}
                  className="group focus:outline-none focus:ring-2 focus:ring-accent-warm/50 rounded-full"
                  aria-label={`Go to testimonial group ${
                    idx + 1
                  } of ${totalGroups}`}>
                  <motion.div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx * displayCount
                        ? 'bg-accent-warm'
                        : 'bg-sage-light/50 hover:bg-sage-light/80'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      scale: activeIndex === idx * displayCount ? 1.5 : 1,
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
