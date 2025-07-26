// src/components/sections/WhoWeAre.tsx
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../ui/Logo' // Import the elegant S&O Logo component

const WhoWeAre: React.FC = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Animation classes with elegant timing
  const fadeIn = (delay: number) => `
    opacity-0 translate-y-4
    ${isInView ? 'opacity-100 translate-y-0' : ''}
    transition-all duration-1000 ease-out
    ${isInView ? `delay-[${delay}ms]` : ''}
  `

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="py-16 sm:py-20 lg:py-28 relative bg-gradient-to-b from-white via-fog-gray/5 to-white">
      {/* Refined decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-60 mix-blend-multiply blur-3xl bg-gradient-to-br from-mint-accent/5 to-transparent" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-50 mix-blend-multiply blur-3xl bg-gradient-to-tr from-gold-highlight/5 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-40 mix-blend-multiply blur-3xl bg-gradient-to-tr from-sage-light/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-8 relative">
        {/* HEADER - Elegant brand introduction with logo */}
        <div
          className={`max-w-3xl mx-auto mb-16 sm:mb-20 text-center ${fadeIn(
            100
          )}`}>
          {/* Elegant S&O Logo implementation */}
          <div className="mb-10 relative">
            <div className="mx-auto relative z-10 flex justify-center">
              {/* Outer glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-br from-sage-light/5 to-mint-accent/5 rounded-full blur-lg opacity-70"></div>

              {/* Logo component */}
              <Logo size="large" className="relative" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extralight text-charcoal mb-6 tracking-wide">
            Who We Are
          </h2>

          <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-gold-highlight/30 to-transparent mb-8"></div>

          <p className="text-lg text-forest-shadow/80 leading-relaxed mb-4 tracking-wide">
            Founded with a simple belief:{' '}
            <em className="font-light text-charcoal/80 not-italic">
              an organized space creates a peaceful mind
            </em>
            .
          </p>
        </div>

        {/* OUR MISSION - Standalone feature */}
        <div className={`max-w-3xl mx-auto mb-16 sm:mb-20 ${fadeIn(300)}`}>
          <div className="bg-gradient-to-br from-white to-fog-gray/20 rounded-lg p-6 sm:p-10 border border-forest-shadow/5 shadow-sm relative overflow-hidden text-center">
            {/* Decorative element */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-mint-accent/5 to-transparent rounded-full opacity-70 blur-2xl"></div>

            <div className="relative">
              {/* Icon */}
              <div className="mb-5">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-white to-forest-shadow/5 rounded-full flex items-center justify-center text-forest-shadow/80 border border-forest-shadow/10 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.25}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-light text-charcoal/90 mb-4 tracking-wide">
                  Our Mission
                </h3>
                <p className="text-forest-shadow/80 leading-relaxed tracking-wide max-w-xl mx-auto">
                  To bring calm, clarity, and functionality to homes and
                  workspaces through customized organizing solutions that
                  reflect our clients' needs and lifestyles.
                </p>
                <div className="mt-5 pt-5 border-t border-forest-shadow/5 flex items-center justify-center text-forest-shadow/60 text-sm italic">
                  <svg
                    className="w-3.5 h-3.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.25}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Transforming chaos into order, one space at a time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VALUES, PROCESS & VISION - Three card layout */}
        <div className={`mb-16 sm:mb-20 ${fadeIn(500)}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Values Card */}
            <div className="bg-gradient-to-br from-white to-sage-light/5 rounded-lg p-6 sm:p-8 shadow-sm border border-sage-light/10 text-center">
              <div>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-white to-sage-light/10 rounded-full flex items-center justify-center text-sage-light/90 border border-sage-light/10 shadow-sm mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.25}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-light text-charcoal/90 tracking-wide">
                    Our Values
                  </h3>
                </div>

                <ul className="space-y-4 max-w-xs mx-auto">
                  <li className="flex items-start">
                    <svg
                      className="w-3.5 h-3.5 text-sage-light/80 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2.5 text-forest-shadow/80 text-sm tracking-wide text-left">
                      Personalized attention to your unique needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-3.5 h-3.5 text-sage-light/80 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2.5 text-forest-shadow/80 text-sm tracking-wide text-left">
                      Sustainable solutions that last
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-3.5 h-3.5 text-sage-light/80 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2.5 text-forest-shadow/80 text-sm tracking-wide text-left">
                      Respect for your space and belongings
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Process Card - NEW */}
            <div className="bg-gradient-to-br from-white to-mint-accent/5 rounded-lg p-6 sm:p-8 shadow-sm border border-mint-accent/10 text-center">
              <div>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-white to-mint-accent/10 rounded-full flex items-center justify-center text-mint-accent/90 border border-mint-accent/10 shadow-sm mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.25}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-light text-charcoal/90 tracking-wide">
                    Our Process
                  </h3>
                </div>

                <div className="space-y-3 max-w-xs mx-auto">
                  <p className="text-forest-shadow/80 text-sm leading-relaxed tracking-wide text-center">
                    Sorting is the very first step in organizing—it's the
                    process of classifying items to determine what to keep,
                    toss, donate, or discard due to expiration.
                  </p>

                  <p className="text-forest-shadow/80 text-sm leading-relaxed tracking-wide text-center">
                    By sorting first, the space is clear the clutter and make
                    organizing easier and more effective. It's not just moving
                    things around—it's making thoughtful decisions that create
                    space for what truly matters.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-mint-accent/10 flex items-center justify-center text-mint-accent/70 text-xs tracking-wide italic">
                  <svg
                    className="w-3 h-3 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.25}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>Every project begins with thoughtful sorting</span>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-white to-gold-highlight/5 rounded-lg p-6 sm:p-8 shadow-sm border border-gold-highlight/10 text-center">
              <div>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-white to-gold-highlight/10 rounded-full flex items-center justify-center text-gold-highlight/90 border border-gold-highlight/10 shadow-sm mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.25}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.25}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-light text-charcoal/90 tracking-wide">
                    Our Vision
                  </h3>
                </div>

                <p className="text-forest-shadow/80 text-sm leading-relaxed mb-8 tracking-wide max-w-xs mx-auto">
                  To become a trusted name in home and business organization,
                  helping clients turn clutter into clarity and create
                  beautifully functional spaces.
                </p>
              </div>

              <div className="pt-3 border-t border-gold-highlight/10 flex items-center justify-center text-gold-highlight/70 text-xs tracking-wide italic">
                <svg
                  className="w-3 h-3 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.25}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span>Creating beauty through order and intention</span>
              </div>
            </div>
          </div>
        </div>

        {/* OUR NAME - Meaning behind the brand - Centered and stacked for all devices */}
        <div className={`max-w-3xl mx-auto mb-16 sm:mb-20 ${fadeIn(700)}`}>
          <div className="bg-gradient-to-br from-white to-warm-ivory/20 rounded-lg p-6 sm:p-10 border border-warm-ivory/10 shadow-sm text-center">
            {/* Elegant S&O Logo - smaller version for this section */}
            <div className="mb-8 flex justify-center">
              <div className="relative inline-block">
                {/* Subtle glow effect */}
                <div className="absolute -inset-3 bg-gradient-to-br from-gold-highlight/5 to-sage-light/5 rounded-full blur-md -z-10"></div>

                {/* Logo component */}
                <Logo variant="monochrome" size="medium" />
              </div>
            </div>

            {/* Content */}
            <div className="max-w-lg mx-auto">
              <h3 className="text-xl font-light text-charcoal/90 mb-5 tracking-wide relative">
                The Meaning Behind Our Name
                <span className="block h-px w-16 bg-gradient-to-r from-mint-accent/30 to-transparent mt-2 mx-auto"></span>
              </h3>

              <div className="space-y-4">
                <p className="text-forest-shadow/80 text-sm leading-relaxed tracking-wide">
                  <span className="font-medium text-charcoal/80">
                    "Sorted & Organized"
                  </span>{' '}
                  speaks to our core mission — transforming cluttered spaces
                  into calm, clear, and functional environments.
                </p>

                <p className="text-forest-shadow/80 text-sm leading-relaxed tracking-wide">
                  Our approach embodies organization at its best: bringing
                  clarity, functionality, and peace to every space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* QUOTE & CTA - Final call to action */}
        <div className={`max-w-2xl mx-auto ${fadeIn(900)}`}>
          {/* Quote */}
          <div className="mb-12 sm:mb-16">
            <div className="relative">
              <blockquote className="text-lg md:text-xl text-forest-shadow/80 italic font-extralight leading-relaxed px-8 sm:px-10 tracking-wide relative text-center">
                <span className="absolute -top-6 left-0 text-4xl text-gold-highlight/20 font-serif">
                  "
                </span>
                Whether in a home pantry or a busy office, we bring clarity and
                balance through systems tailored to how you live and work —
                turning your vision of order into a beautifully functional
                reality.
                <span className="absolute -bottom-6 right-0 text-4xl text-gold-highlight/20 font-serif">
                  "
                </span>
              </blockquote>
            </div>

            {/* Attribution - Elegant styling */}
            <div className="mt-10 flex items-center justify-center">
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-sage-light/20 to-transparent mr-3"></div>
              <p className="text-charcoal/70 text-sm tracking-widest">
                Founder
              </p>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-sage-light/20 to-transparent ml-3"></div>
            </div>
          </div>

          {/* CTA Button - Elegant, refined */}
          <div className="text-center">
            <a
              href="#services"
              className="inline-flex items-center px-8 py-3 
                       bg-gradient-to-r from-white to-warm-ivory/30 text-charcoal/80 border border-charcoal/5 rounded-full text-sm tracking-wide
                       hover:border-gold-highlight/20 hover:shadow-sm
                       transition-all duration-500 group">
              <span>See How We Can Help You</span>
              <svg
                className="ml-3 w-4 h-4 text-gold-highlight/70 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.25}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
