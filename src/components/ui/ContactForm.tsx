// src/components/ui/ContactForm.tsx
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

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

// Interface for form data
interface FormData {
  name: string
  email: string
  phone: string
  service: string
  timeline: string
  budget: string
  message: string
}

// Interface for form errors
interface FormErrors {
  name?: string
  email?: string
  service?: string
  message?: string
  [key: string]: string | undefined
}

// Form status type
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    timeline: '',
    budget: '',
    message: '',
  })

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Focus the first field with an error
  useEffect(() => {
    if (Object.keys(errors).length > 0 && formRef.current) {
      const firstErrorField = Object.keys(errors)[0]
      const element = formRef.current.elements.namedItem(
        firstErrorField
      ) as HTMLElement
      if (element) {
        element.focus()
      }
    }
  }, [errors])

  // Validate a single field
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : ''
      case 'email':
        return !value.trim()
          ? 'Email is required'
          : !/\S+@\S+\.\S+/.test(value)
          ? 'Please enter a valid email'
          : ''
      case 'service':
        return !value ? 'Please select a service' : ''
      case 'message':
        return !value.trim()
          ? 'Message is required'
          : value.trim().length < 10
          ? 'Message must be at least 10 characters'
          : ''
      default:
        return ''
    }
  }

  // Validate the entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Validate required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (['name', 'email', 'service', 'message'].includes(key)) {
        const errorMessage = validateField(key, value as string)
        if (errorMessage) {
          newErrors[key] = errorMessage
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // Handle input changes
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

  // Mark field as touched on blur
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate the field
    const errorMessage = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: errorMessage }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    if (!validateForm()) {
      return
    }

    setStatus('loading')

    try {
      // EmailJS integration
      if (
        process.env.REACT_APP_EMAILJS_SERVICE_ID &&
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID &&
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY &&
        formRef.current
      ) {
        const result = await emailjs.sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )

        console.log('Email sent successfully:', result.text)
        setStatus('success')

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          timeline: '',
          budget: '',
          message: '',
        })
        setTouched({})
      } else {
        // Fallback for development/testing without EmailJS keys
        console.log('EmailJS credentials not found, simulating success')
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setStatus('success')

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          timeline: '',
          budget: '',
          message: '',
        })
        setTouched({})
      }

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Failed to send email:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  // Input field component for reusability
  const InputField = ({
    label,
    name,
    type = 'text',
    required = false,
    placeholder,
    value,
    options = null,
  }: {
    label: string
    name: keyof FormData
    type?: string
    required?: boolean
    placeholder?: string
    value: string
    options?: { value: string; label: string }[] | null
  }) => {
    const hasError = touched[name] && errors[name]
    const baseClasses = `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-cool 
                        focus:border-transparent transition-all duration-200 ${
                          hasError
                            ? 'border-red-300 bg-red-50'
                            : 'border-secondary/30 hover:border-secondary/50'
                        }`

    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-charcoal mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {type === 'select' && options ? (
          <select
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={baseClasses}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${name}-error` : undefined}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            required={required}
            rows={5}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${baseClasses} resize-none`}
            placeholder={placeholder}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${name}-error` : undefined}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className={baseClasses}
            placeholder={placeholder}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${name}-error` : undefined}
          />
        )}

        <AnimatePresence>
          {hasError && (
            <motion.p
              id={`${name}-error`}
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}>
              {errors[name]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
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
            <InputField
              label="Full Name"
              name="name"
              required
              placeholder="Your full name"
              value={formData.name}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              value={formData.email}
            />
          </div>

          {/* Phone */}
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="(612) 123-4567"
            value={formData.phone}
          />

          {/* Service Selector */}
          <InputField
            label="Service Needed"
            name="service"
            type="select"
            required
            value={formData.service}
            options={serviceOptions}
          />

          {/* Timeline and Budget Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Preferred Timeline"
              name="timeline"
              type="select"
              value={formData.timeline}
              options={[
                { value: '', label: 'Select timeline...' },
                { value: 'asap', label: 'ASAP' },
                { value: '1-2-weeks', label: '1-2 weeks' },
                { value: '1-month', label: 'Within 1 month' },
                { value: '2-3-months', label: '2-3 months' },
                { value: 'flexible', label: 'Flexible' },
              ]}
            />

            <InputField
              label="Estimated Budget"
              name="budget"
              type="select"
              value={formData.budget}
              options={[
                { value: '', label: 'Select budget range...' },
                { value: 'under-500', label: 'Under $500' },
                { value: '500-1000', label: '$500 - $1,000' },
                { value: '1000-2500', label: '$1,000 - $2,500' },
                { value: '2500-5000', label: '$2,500 - $5,000' },
                { value: '5000+', label: '$5,000+' },
                { value: 'consultation-first', label: 'Consultation First' },
              ]}
            />
          </div>

          {/* Message */}
          <div>
            <InputField
              label="Project Details"
              name="message"
              type="textarea"
              required
              placeholder="Tell us about your space, current challenges, and what you hope to achieve..."
              value={formData.message}
            />
            <p className="text-sm text-forest-shadow/70 mt-1">
              Please include space size, current challenges, and specific goals.
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-gradient-to-r from-accent-cool to-accent-cool/90 text-white 
                     font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed 
                     shadow-lg overflow-hidden relative"
            whileHover={status !== 'loading' ? { scale: 1.02 } : undefined}
            whileTap={status !== 'loading' ? { scale: 0.98 } : undefined}
            aria-live="polite">
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
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              initial={{ x: '-100%' }}
              animate={
                status !== 'loading' ? { x: ['100%', '-100%'] } : { x: '-100%' }
              }
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 2,
                ease: 'easeInOut',
                repeatDelay: 1,
              }}
            />
          </motion.button>

          {/* Status Messages */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                className="bg-gradient-to-r from-sage-light/10 to-mint-accent/10 p-6 rounded-2xl 
                         border-l-4 border-green-500 text-primary text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                role="alert">
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
                  <p className="font-serif text-xl">
                    Message Sent Successfully!
                  </p>
                </div>
                <p className="text-forest-shadow leading-relaxed">
                  Thank you for reaching out. We'll be in touch within 24 hours
                  to discuss your organization project.
                </p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                className="bg-gradient-to-r from-red-100/50 to-neutral/20 p-6 rounded-2xl 
                         border-l-4 border-red-500 text-primary text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                role="alert">
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
                  Please try again or contact us directly by phone at (612)
                  308-4781.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
