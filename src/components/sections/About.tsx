// src/components/sections/About.tsx
// Hero-style design with large, prominent image

import React, { useEffect, useRef, useState } from 'react'
import ownerImage from '../../assets/images/portrait.png'

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    // Store current ref value to avoid stale refs in cleanup
    const currentRef = sectionRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      // Use captured ref value in cleanup
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      // Disconnect the observer when component unmounts
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-gradient-to-br from-warm-ivory via-white to-fog-gray overflow-hidden">
      {/* Animated background elements - with reduced motion support */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-sage-light/5 rounded-full blur-3xl motion-reduce:animate-none animate-float" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-mint-accent/8 rounded-full blur-2xl motion-reduce:animate-none animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-highlight/3 rounded-full blur-3xl motion-reduce:animate-none animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <header
            className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}>
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-sage-light/20">
              <div className="w-2 h-2 bg-gold-highlight rounded-full motion-reduce:animate-none animate-ping" />
              <span className="text-gold-highlight font-semibold uppercase tracking-wider text-sm">
                About the Founder
              </span>
            </div>

            <p className="text-xl text-forest-shadow max-w-3xl mx-auto leading-relaxed">
              Organizing isn't just something I do — it's a divine gift I'm
              passionate about sharing with others.
            </p>
          </header>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Large Image Section */}
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              }`}>
              <div className="relative max-w-2xl mx-auto">
                {/* Main image container */}
                <div className="relative group">
                  {/* Decorative background shape */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-highlight/20 via-sage-light/15 to-mint-accent/25 rounded-[3rem] transform rotate-3 group-hover:rotate-6 motion-reduce:transform-none transition-transform duration-700 blur-xl" />

                  {/* Image frame */}
                  <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl group-hover:shadow-3xl transition-all duration-700 transform group-hover:-translate-y-2 motion-reduce:transform-none">
                    <div className="relative overflow-hidden rounded-[2.5rem]">
                      <img
                        src={ownerImage}
                        alt="Catalina M, Professional Organizer and Founder of Sorted & Organized by CM"
                        className="w-full aspect-[3/4] object-cover transition-all duration-700 group-hover:scale-105 motion-reduce:transform-none"
                        loading="lazy"
                        width="500"
                        height="700"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-mint-accent/20 rounded-full blur-xl motion-reduce:animate-none animate-float" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sage-light/15 rounded-full blur-2xl motion-reduce:animate-none animate-float-delayed" />

                  {/* Professional badge */}
                  <div className="absolute top-8 -right-6 bg-gradient-to-r from-gold-highlight to-gold-highlight/90 text-white px-8 py-4 rounded-2xl shadow-xl transform rotate-6 group-hover:rotate-12 motion-reduce:transform-none transition-transform duration-500 border-4 border-white">
                    <div className="text-center">
                      <div className="font-bold text-lg">Professional</div>
                      <div className="text-sm opacity-90">Organizer</div>
                    </div>
                  </div>
                </div>

                {/* Credentials/Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-12">
                  <div className="text-center p-4 sm:p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-sage-light/20">
                    <div className="text-2xl sm:text-3xl font-bold text-gold-highlight mb-2">
                      10+
                    </div>
                    <div className="text-sm text-forest-shadow font-medium">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-sage-light/20">
                    <div className="text-2xl sm:text-3xl font-bold text-sage-light mb-2">
                      50+
                    </div>
                    <div className="text-sm text-forest-shadow font-medium">
                      Happy Clients
                    </div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-sage-light/20">
                    <div className="text-2xl sm:text-3xl font-bold text-mint-accent mb-2">
                      100%
                    </div>
                    <div className="text-sm text-forest-shadow font-medium">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={`order-1 lg:order-2 space-y-6 sm:space-y-8 transition-all duration-1000 delay-500 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}>
              {/* Personal introduction */}
              <div className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-sage-light/20 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-serif text-charcoal mb-4">
                  Hi, I'm Catalina M <span aria-hidden="true">👋</span>
                </h3>
                <p className="text-base sm:text-lg text-forest-shadow leading-relaxed mb-6">
                  By day, I work in Human Resources, but beyond the office, I
                  follow my heart into organizing homes and businesses. What
                  began as a hobby quickly became something more when a few
                  wonderful friends trusted me to reorganize their pantries.
                  Their encouragement lit a spark, and that spark grew into
                  Sorted & Organized by CM — a business built on purpose,
                  passion, and the belief that clarity in our spaces brings
                  clarity to our lives.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-gold-highlight to-sage-light rounded-full" />
              </div>

              {/* Story sections */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-sage-light/10 to-mint-accent/10 p-5 sm:p-6 rounded-2xl border-l-4 border-sage-light">
                  <h4 className="font-serif text-lg sm:text-xl text-charcoal mb-2 sm:mb-3">
                    My Passion
                  </h4>
                  <p className="text-forest-shadow leading-relaxed">
                    Since childhood, I've had a natural passion for bringing
                    order and harmony to spaces. There's something deeply
                    satisfying about transforming cluttered rooms into calm,
                    functional environments.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-gold-highlight/10 to-sage-light/10 p-5 sm:p-6 rounded-2xl border-l-4 border-gold-highlight">
                  <h4 className="font-serif text-lg sm:text-xl text-charcoal mb-2 sm:mb-3">
                    My Journey
                  </h4>
                  <p className="text-forest-shadow leading-relaxed">
                    By day, I work in HR helping people grow their careers. By
                    heart, I organize homes, pantries, and offices. What started
                    as helping friends grew into this beautiful business.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-mint-accent/10 to-sage-light/10 p-5 sm:p-6 rounded-2xl border-l-4 border-mint-accent">
                  <h4 className="font-serif text-lg sm:text-xl text-charcoal mb-2 sm:mb-3">
                    My Mission
                  </h4>
                  <p className="text-forest-shadow leading-relaxed">
                    Whether it's a single closet or an entire office, my goal is
                    to help you feel more at peace in your environment. When
                    your space is organized, your mind and life feel more
                    balanced too.
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="space-y-4 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:sortedorganizedbycm@gmail.com"
                    className="group flex-1 bg-gradient-to-r from-gold-highlight to-gold-highlight/90 hover:from-gold-highlight/90 hover:to-gold-highlight text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl motion-reduce:transform-none shadow-lg flex items-center justify-center"
                    aria-label="Email us to get started">
                    <svg
                      className="w-5 h-5 mr-3 transition-transform group-hover:scale-110 motion-reduce:transform-none"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Let's Get Started
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>

                  <a
                    href="tel:+16123084781"
                    className="group bg-white/80 backdrop-blur-sm hover:bg-sage-light text-forest-shadow hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 motion-reduce:transform-none border border-sage-light/30 flex items-center justify-center"
                    aria-label="Call us at (612) 308-4781">
                    <svg
                      className="w-5 h-5 mr-2 transition-transform group-hover:scale-110 motion-reduce:transform-none"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    (612) 308-4781
                  </a>
                </div>

                {/* Quote */}
                <div className="text-center pt-4 sm:pt-6">
                  <p className="text-base sm:text-lg italic text-forest-shadow/80 max-w-lg mx-auto leading-relaxed">
                    "Thanks for stopping by — I can't wait to help you create a
                    space that works for you."
                  </p>
                  <p className="text-gold-highlight font-semibold mt-2">
                    — Catalina M
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
