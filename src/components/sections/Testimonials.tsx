// src/components/sections/Testimonials.tsx
import React, { useEffect, useState } from 'react'

// Testimonial data
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Minneapolis, MN',
    text: 'Catalina transformed my chaotic pantry into a beautifully organized space. I can finally find everything I need!',
    rating: 5,
    image: '/images/testimonials/sarah.jpg',
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'St. Paul, MN',
    text: 'The office organization service was a game-changer for my productivity. Highly recommend!',
    rating: 5,
    image: '/images/testimonials/michael.jpg',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'Edina, MN',
    text: 'Professional, efficient, and the results exceeded my expectations. My closet has never looked better!',
    rating: 5,
    image: '/images/testimonials/emily.jpg',
  },
  {
    id: '4',
    name: 'David Thompson',
    location: 'Bloomington, MN',
    text: 'The team helped us prepare for our move. Decluttering before packing saved us so much time and stress.',
    rating: 5,
    image: '/images/testimonials/david.jpg',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    location: 'Woodbury, MN',
    text: 'Worth every penny! The maintenance plan keeps everything looking perfect months later.',
    rating: 5,
    image: '/images/testimonials/lisa.jpg',
  },
  {
    id: '6',
    name: 'James Wilson',
    location: 'Plymouth, MN',
    text: 'Our company break room went from disaster to delight. The team is amazing!',
    rating: 5,
    image: '/images/testimonials/james.jpg',
  },
]

// Testimonial Card Component
interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0]
  index: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-8 relative opacity-0 animate-fade-in hover:shadow-xl transition-shadow duration-300"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards',
      }}>
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-6xl text-sage-light/30 font-serif">
        "
      </div>

      <div className="relative z-10">
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating ? 'text-gold-highlight' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-forest-shadow mb-6 italic">"{testimonial.text}"</p>

        {/* Author */}
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-sage-light/30 flex items-center justify-center mr-4">
            {/* Placeholder for image - in production, use actual image */}
            <span className="text-xl font-semibold text-forest-shadow">
              {testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-charcoal">{testimonial.name}</p>
            <p className="text-sm text-forest-shadow/70">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Testimonials Component
const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('testimonials')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-warm-ivory">
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-forest-shadow max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about their transformation journey with us.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div
                className="text-center opacity-0 animate-fade-in"
                style={{
                  animationDelay: '600ms',
                  animationFillMode: 'forwards',
                }}>
                <p className="text-4xl font-bold text-gold-highlight">50+</p>
                <p className="text-sm text-forest-shadow">Happy Clients</p>
              </div>
              <div
                className="text-center opacity-0 animate-fade-in"
                style={{
                  animationDelay: '700ms',
                  animationFillMode: 'forwards',
                }}>
                <p className="text-4xl font-bold text-gold-highlight">100+</p>
                <p className="text-sm text-forest-shadow">Spaces Transformed</p>
              </div>
              <div
                className="text-center opacity-0 animate-fade-in"
                style={{
                  animationDelay: '800ms',
                  animationFillMode: 'forwards',
                }}>
                <p className="text-4xl font-bold text-gold-highlight">5★</p>
                <p className="text-sm text-forest-shadow">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-forest-shadow mb-6">
              Ready to join our list of satisfied clients?
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gold-highlight text-white font-semibold rounded-lg 
                       hover:bg-gold-highlight/90 transform hover:scale-105 transition-all duration-300 
                       shadow-lg hover:shadow-xl">
              Start Your Transformation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
