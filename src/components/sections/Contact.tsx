// src/components/sections/Contact.tsx
import React, { useState, useEffect, useRef } from 'react'

// Service options for the selector
const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'home-organization', label: 'Home Organization' },
  { value: 'pantry-organization', label: 'Pantry & Kitchen Organization' },
  { value: 'closet-organization', label: 'Closet Organization' },
  { value: 'office-organization', label: 'Office & Workspace Organization' },
  { value: 'moving-services', label: 'Moving & Relocation Services' },
  { value: 'decluttering', label: 'Decluttering Services' },
  { value: 'consultation', label: 'Initial Consultation' },
  { value: 'virtual-consultation', label: 'Virtual Consultation' },
  { value: 'maintenance', label: 'Organization Maintenance' },
  { value: 'other', label: 'Other / Custom Project' },
]

// Contact Form Component
const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    timeline: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus('loading')

    // Simulate form submission - Replace with EmailJS integration
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        timeline: '',
        budget: '',
        message: '',
      })

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20 shadow-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-neutral/10 rounded-full blur-xl translate-y-4 -translate-x-4" />

      <div className="relative">
        <div className="mb-8">
          <h3 className="text-2xl font-serif text-charcoal mb-2">
            Send us a message
          </h3>
          <p className="text-forest-shadow">
            We'll respond within 24 hours to discuss your project.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-charcoal mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-cool focus:border-transparent transition-all duration-200 ${
                  errors.name
                    ? 'border-red-300 bg-red-50'
                    : 'border-secondary/30 hover:border-secondary/50'
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-charcoal mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-cool focus:border-transparent transition-all duration-200 ${
                  errors.email
                    ? 'border-red-300 bg-red-50'
                    : 'border-secondary/30 hover:border-secondary/50'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-charcoal mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-secondary/30 rounded-xl focus:ring-2 focus:ring-accent-cool focus:border-transparent hover:border-secondary/50 transition-all duration-200"
              placeholder="(612) 123-4567"
            />
          </div>

          {/* Service Selector */}
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-semibold text-charcoal mb-2">
              Service Needed *
            </label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-cool focus:border-transparent transition-all duration-200 ${
                errors.service
                  ? 'border-red-300 bg-red-50'
                  : 'border-secondary/30 hover:border-secondary/50'
              }`}>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-red-500 text-sm mt-1">{errors.service}</p>
            )}
          </div>

          {/* Timeline and Budget Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-semibold text-charcoal mb-2">
                Preferred Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-secondary/30 rounded-xl focus:ring-2 focus:ring-accent-cool focus:border-transparent hover:border-secondary/50 transition-all duration-200">
                <option value="">Select timeline...</option>
                <option value="asap">ASAP</option>
                <option value="1-2-weeks">1-2 weeks</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-semibold text-charcoal mb-2">
                Estimated Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-secondary/30 rounded-xl focus:ring-2 focus:ring-accent-cool focus:border-transparent hover:border-secondary/50 transition-all duration-200">
                <option value="">Select budget range...</option>
                <option value="under-500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000+">$5,000+</option>
                <option value="consultation-first">Consultation First</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-charcoal mb-2">
              Project Details *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-cool focus:border-transparent transition-all duration-200 resize-none ${
                errors.message
                  ? 'border-red-300 bg-red-50'
                  : 'border-secondary/30 hover:border-secondary/50'
              }`}
              placeholder="Tell us about your space, current challenges, and what you hope to achieve..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
            <p className="text-sm text-forest-shadow/70 mt-1">
              Please include space size, current challenges, and specific goals.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-gradient-to-r from-accent-cool to-accent-cool/90 hover:from-accent-cool/90 hover:to-accent-cool text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg group relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              {status === 'loading' ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </>
              )}
            </span>

            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="bg-gradient-to-r from-sage-light/10 to-mint-accent/10 p-6 rounded-2xl border-l-4 border-green-500 text-primary text-center animate-fadeInUp">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 mr-2 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-serif text-xl">Message Sent Successfully!</p>
              </div>
              <p className="text-forest-shadow leading-relaxed">
                Thank you for reaching out. We'll be in touch within 24 hours to
                discuss your organization project.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-gradient-to-r from-red-100/50 to-neutral/20 p-6 rounded-2xl border-l-4 border-red-500 text-primary text-center animate-fadeInUp">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 mr-2 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-serif text-xl">Something went wrong</p>
              </div>
              <p className="text-forest-shadow leading-relaxed">
                Please try again or contact us directly by phone.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

// Contact Info Component
const ContactInfo: React.FC = () => {
  const contactDetails = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      label: 'Phone',
      value: '(612) 308-4781',
      href: 'tel:+16123084781',
      description: 'For consultations and inquiries',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: 'Location',
      value: 'Twin Cities Metro',
      href: null,
      description: 'Serving the greater Minneapolis-St. Paul area',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-serif text-charcoal mb-4">Get in Touch</h3>
        <p className="text-forest-shadow text-lg leading-relaxed">
          Ready to transform your space? We're here to help you create the
          organized environment of your dreams.
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-accent-warm/10 to-secondary/10 p-6 rounded-2xl border-l-4 border-accent-warm shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl text-primary group-hover:text-accent-warm transition-all duration-300">
                {detail.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary text-lg">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-accent-warm hover:text-accent-warm/80 transition-colors font-medium text-lg block mb-1">
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-primary opacity-80 font-medium text-lg mb-1">
                    {detail.value}
                  </p>
                )}
                <p className="text-primary opacity-70 text-sm">
                  {detail.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Business Hours */}
      <div className="bg-gradient-to-r from-gold-highlight/10 to-secondary/10 p-6 rounded-2xl border-l-4 border-accent-warm transition-all duration-300">
        <div className="flex items-center mb-4">
          <svg
            className="w-5 h-5 text-accent-cool mr-2"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className="font-serif text-xl text-primary mb-0">
            Business Hours
          </h4>
        </div>
        <div className="space-y-2 text-forest-shadow">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span className="font-medium">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span className="font-medium">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span className="font-medium">By appointment</span>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <div className="bg-gradient-to-r from-mint-accent/10 to-secondary/10 p-6 rounded-2xl border-l-4 border-accent-cool transition-all duration-300">
        <div className="flex items-center mb-4">
          <svg
            className="w-5 h-5 text-accent-cool mr-2"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className="font-serif text-xl text-primary mb-0">Service Area</h4>
        </div>
        <p className="text-forest-shadow leading-relaxed">
          Proudly serving Saint Paul, Minneapolis, and the greater Twin Cities
          metro area.
          <span className="block mt-2 font-medium text-accent-cool">
            Virtual consultations available nationwide.
          </span>
        </p>
      </div>
    </div>
  )
}

// Main Contact Component
const Contact: React.FC = () => {
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
      id="contact"
      className="py-20 bg-gradient-to-br from-warm-ivory via-white to-fog-gray relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-sage-light/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-mint-accent/8 rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-highlight/3 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-sage-light/20">
              <div className="w-2 h-2 bg-accent-cool rounded-full animate-ping" />
              <span className="text-accent-cool font-semibold uppercase tracking-wider text-sm">
                Let's Get Started
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal mb-6 leading-tight">
              Ready to Transform{' '}
              <span className="text-accent-cool">Your Space?</span>
            </h2>

            <p className="text-xl text-forest-shadow max-w-3xl mx-auto leading-relaxed">
              Get in touch for a consultation and let's discuss how we can bring
              order, beauty, and peace to your environment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
