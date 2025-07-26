import { useState, useEffect } from 'react'

// Props for the logo component
interface LogoProps {
  variant?: 'default' | 'monochrome' | 'white'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function Logo({
  variant = 'default',
  size = 'medium',
  className = '',
}: LogoProps) {
  // State for animation
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine colors based on variant
  const textColor =
    variant === 'white'
      ? 'text-white'
      : variant === 'monochrome'
      ? 'text-charcoal/90'
      : 'text-charcoal/90'

  const borderColor =
    variant === 'white'
      ? 'border-white/20'
      : variant === 'monochrome'
      ? 'border-charcoal/10'
      : 'border-gold-highlight/20'

  const gradientFrom =
    variant === 'white'
      ? 'from-white/30'
      : variant === 'monochrome'
      ? 'from-gray-300/30'
      : 'from-sage-light/30'

  const gradientTo =
    variant === 'white'
      ? 'to-white/10'
      : variant === 'monochrome'
      ? 'to-gray-100/10'
      : 'to-warm-ivory/10'

  const accentColor =
    variant === 'white'
      ? 'bg-white/20'
      : variant === 'monochrome'
      ? 'bg-charcoal/10'
      : 'bg-gold-highlight/20'

  // Determine size
  const containerSize =
    size === 'small'
      ? 'w-12 h-12'
      : size === 'large'
      ? 'w-20 h-20'
      : 'w-16 h-16'

  const textSize =
    size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-lg'

  const accentSize =
    size === 'small' ? 'w-3 h-3' : size === 'large' ? 'w-7 h-7' : 'w-5 h-5'

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {/* Main logo container */}
      <div
        className={`
          ${containerSize} 
          rounded-full 
          border ${borderColor} 
          bg-gradient-to-br ${gradientFrom} ${gradientTo}
          flex items-center justify-center 
          shadow-sm
          relative overflow-hidden
          transition-all duration-700
          ${mounted ? 'opacity-100' : 'opacity-0'}
        `}>
        {/* Decorative elements */}
        <div
          className={`absolute -top-2 -right-2 ${accentSize} ${accentColor} rounded-full blur-sm opacity-80
                     transition-all duration-1000 delay-300
                     ${
                       mounted ? 'scale-100 opacity-80' : 'scale-0 opacity-0'
                     }`}></div>
        <div
          className={`absolute -bottom-2 -left-2 ${accentSize} bg-mint-accent/20 rounded-full blur-sm opacity-70
                     transition-all duration-1000 delay-500
                     ${
                       mounted ? 'scale-100 opacity-70' : 'scale-0 opacity-0'
                     }`}></div>

        {/* S&O text with elegant styling */}
        <div className="relative flex items-center">
          <span
            className={`
            ${textSize} ${textColor} font-light tracking-widest
            transition-all duration-1000 
            ${
              mounted
                ? 'opacity-100 transform-none'
                : 'opacity-0 -translate-y-1'
            }
          `}>
            S<span className="text-gold-highlight/80">&</span>O
          </span>
        </div>

        {/* Subtle ring animation */}
        <div
          className={`
          absolute inset-0 rounded-full border border-gold-highlight/10
          transition-all duration-2000 ease-in-out
          ${mounted ? 'scale-100 opacity-0' : 'scale-90 opacity-80'}
        `}></div>
      </div>
    </div>
  )
}
