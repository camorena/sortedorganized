// src/components/sections/Cta.tsx
import React, { useEffect, useRef, useState } from 'react'

const Cta: React.FC = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-forest-shadow to-sage-light text-white">
      <div className="container text-center">
        <h2
          className={`text-3xl md:text-4xl font-serif mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          Ready to Transform Your Space?
        </h2>
        <p
          className={`text-xl mb-8 opacity-90 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          Let's create an organized environment that brings joy and efficiency
          to your daily life.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <a href="#contact" className="btn-primary">
            Book Your Consultation
          </a>
          <a
            href="#services"
            className="btn-outline text-white border-white hover:bg-white hover:text-charcoal">
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}

export default Cta
