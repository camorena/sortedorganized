// src/components/ui/PlaceholderImage.tsx
import React from 'react'

interface PlaceholderImageProps {
  type: 'before' | 'after'
  category: string
  aspectRatio?: string
  className?: string
}

/**
 * Sophisticated placeholder component for portfolio items
 * Uses elegant, minimalist design with SVG patterns
 */
const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  type,
  category,
  aspectRatio = '4/3',
  className = '',
}) => {
  // Standardize the category to match our icon system
  const normalizedCategory = category.toLowerCase()

  // Get colors based on category
  const getColors = () => {
    const colors: {
      [key: string]: {
        base: string
        accent: string
        dark: string
        pattern: string
      }
    } = {
      pantry: {
        base: '#EFF5F0',
        accent: '#A3D9C1',
        dark: '#596856',
        pattern: '#C9E8D6',
      },
      closet: {
        base: '#F5F2EC',
        accent: '#D5B8A8',
        dark: '#596856',
        pattern: '#E9D6CA',
      },
      kitchen: {
        base: '#F0F5F0',
        accent: '#A8B8A3',
        dark: '#596856',
        pattern: '#D0DAC9',
      },
      office: {
        base: '#F0F4F5',
        accent: '#B0A0B9',
        dark: '#596856',
        pattern: '#D4C9DC',
      },
      playroom: {
        base: '#F5F0F5',
        accent: '#A3D9C1',
        dark: '#596856',
        pattern: '#C9E8D6',
      },
      laundry: {
        base: '#F0F5F5',
        accent: '#A8B8A3',
        dark: '#596856',
        pattern: '#D0DAC9',
      },
      garage: {
        base: '#F2F2F0',
        accent: '#B0A0B9',
        dark: '#596856',
        pattern: '#D4C9DC',
      },
      commercial: {
        base: '#F0F0F0',
        accent: '#596856',
        dark: '#3A4438',
        pattern: '#BFCABA',
      },
      reception: {
        base: '#F0F0F0',
        accent: '#596856',
        dark: '#3A4438',
        pattern: '#BFCABA',
      },
      'office space': {
        base: '#F0F0F0',
        accent: '#596856',
        dark: '#3A4438',
        pattern: '#BFCABA',
      },
      'break room': {
        base: '#F0F0F0',
        accent: '#596856',
        dark: '#3A4438',
        pattern: '#BFCABA',
      },
      'creative studio': {
        base: '#F5F0F0',
        accent: '#D5B8A8',
        dark: '#596856',
        pattern: '#E9D6CA',
      },
      'moving services': {
        base: '#F0F0F5',
        accent: '#B0A0B9',
        dark: '#596856',
        pattern: '#D4C9DC',
      },
      'digital organization': {
        base: '#F0F5F0',
        accent: '#A8B8A3',
        dark: '#596856',
        pattern: '#D0DAC9',
      },
      seasonal: {
        base: '#F5F2EC',
        accent: '#D5B8A8',
        dark: '#596856',
        pattern: '#E9D6CA',
      },
    }

    // Default colors if category not found
    const defaultColors = {
      base: '#F4F1ED',
      accent: '#A8B8A3',
      dark: '#596856',
      pattern: '#D0DAC9',
    }

    return colors[normalizedCategory] || defaultColors
  }

  const colors = getColors()

  // Get SVG icon pattern based on category
  const getPatternSvg = () => {
    // Patterns for Before images (more chaotic)
    const beforePatterns: { [key: string]: React.ReactElement } = {
      pantry: (
        <g opacity="0.4">
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="25"
            y="5"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="5"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="65"
            y="5"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="5"
            y="25"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="25"
            y="25"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="25"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="65"
            y="25"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="15"
            y="15"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="35"
            y="15"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="55"
            y="15"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="15"
            y="35"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="35"
            y="35"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="55"
            y="35"
            width="14"
            height="14"
            rx="2"
            fill={colors.pattern}
          />
        </g>
      ),
      closet: (
        <g opacity="0.4">
          <rect
            x="5"
            y="5"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="5"
            y="17"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="5"
            y="29"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="5"
            y="41"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="5"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="17"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="29"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="41"
            width="30"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
        </g>
      ),
      kitchen: (
        <g opacity="0.4">
          <circle cx="15" cy="15" r="8" fill={colors.pattern} />
          <circle cx="40" cy="15" r="6" fill={colors.pattern} />
          <circle cx="60" cy="15" r="10" fill={colors.pattern} />
          <circle cx="80" cy="15" r="7" fill={colors.pattern} />
          <circle cx="15" cy="40" r="10" fill={colors.pattern} />
          <circle cx="40" cy="40" r="8" fill={colors.pattern} />
          <circle cx="60" cy="40" r="6" fill={colors.pattern} />
          <circle cx="80" cy="40" r="9" fill={colors.pattern} />
        </g>
      ),
    }

    // Patterns for After images (more organized)
    const afterPatterns: { [key: string]: React.ReactElement } = {
      pantry: (
        <g opacity="0.4">
          <rect
            x="10"
            y="10"
            width="16"
            height="16"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="32"
            y="10"
            width="16"
            height="16"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="54"
            y="10"
            width="16"
            height="16"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="10"
            y="32"
            width="16"
            height="16"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="32"
            y="32"
            width="16"
            height="16"
            rx="2"
            fill={colors.pattern}
          />
          <rect
            x="54"
            y="32"
            width="16"
            height="16"
            rx="2"
            fill={colors.pattern}
          />
        </g>
      ),
      closet: (
        <g opacity="0.4">
          <rect
            x="10"
            y="10"
            width="25"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="10"
            y="25"
            width="25"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="10"
            y="40"
            width="25"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="10"
            width="25"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="25"
            width="25"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
          <rect
            x="45"
            y="40"
            width="25"
            height="7"
            rx="1"
            fill={colors.pattern}
          />
        </g>
      ),
      kitchen: (
        <g opacity="0.4">
          <circle cx="20" cy="20" r="8" fill={colors.pattern} />
          <circle cx="50" cy="20" r="8" fill={colors.pattern} />
          <circle cx="80" cy="20" r="8" fill={colors.pattern} />
          <circle cx="20" cy="50" r="8" fill={colors.pattern} />
          <circle cx="50" cy="50" r="8" fill={colors.pattern} />
          <circle cx="80" cy="50" r="8" fill={colors.pattern} />
        </g>
      ),
    }

    // Default pattern with grid and dots for categories without specific patterns
    const defaultPattern =
      type === 'before' ? (
        <g opacity="0.4">
          {/* Random dots for before pattern */}
          <circle cx="15" cy="15" r="4" fill={colors.pattern} />
          <circle cx="35" cy="12" r="3" fill={colors.pattern} />
          <circle cx="55" cy="18" r="5" fill={colors.pattern} />
          <circle cx="75" cy="14" r="3" fill={colors.pattern} />
          <circle cx="20" cy="35" r="5" fill={colors.pattern} />
          <circle cx="38" cy="32" r="4" fill={colors.pattern} />
          <circle cx="60" cy="38" r="3" fill={colors.pattern} />
          <circle cx="70" cy="30" r="5" fill={colors.pattern} />
          <circle cx="25" cy="55" r="3" fill={colors.pattern} />
          <circle cx="45" cy="52" r="5" fill={colors.pattern} />
          <circle cx="65" cy="58" r="4" fill={colors.pattern} />
          <circle cx="80" cy="50" r="3" fill={colors.pattern} />
        </g>
      ) : (
        <g opacity="0.4">
          {/* Organized grid for after pattern */}
          <circle cx="20" cy="20" r="4" fill={colors.pattern} />
          <circle cx="50" cy="20" r="4" fill={colors.pattern} />
          <circle cx="80" cy="20" r="4" fill={colors.pattern} />
          <circle cx="20" cy="50" r="4" fill={colors.pattern} />
          <circle cx="50" cy="50" r="4" fill={colors.pattern} />
          <circle cx="80" cy="50" r="4" fill={colors.pattern} />
        </g>
      )

    // Return the pattern based on category and type
    const patternSet = type === 'before' ? beforePatterns : afterPatterns
    return patternSet[normalizedCategory] || defaultPattern
  }

  // Get category icon for the placeholder
  const getCategoryIcon = () => {
    const iconSize = 24

    // Define category-specific icons
    const icons: { [key: string]: React.ReactElement } = {
      pantry: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.dark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M5 6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6Z" />
          <path d="M8 4V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V4" />
          <path d="M5 10H19" />
          <path d="M5 14H19" />
          <path d="M5 18H19" />
        </svg>
      ),
      closet: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.dark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" />
          <path d="M12 2V22" />
          <path d="M7 7H9" />
          <path d="M15 7H17" />
          <path d="M7 11V16" />
          <path d="M17 11V16" />
        </svg>
      ),
      kitchen: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.dark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M4 7H20" />
          <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" />
          <path d="M9 13V17" />
          <path d="M15 13V17" />
          <path d="M12 13V17" />
        </svg>
      ),
      office: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.dark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 17H16" />
          <path d="M7 13H17" />
          <rect x="7" y="6" width="10" height="4" rx="1" />
        </svg>
      ),
      playroom: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.dark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M5 21V16.5C5 15.6716 5.67157 15 6.5 15H17.5C18.3284 15 19 15.6716 19 16.5V21" />
          <path d="M9 10L10 8L12 7L14 8L15 10" />
        </svg>
      ),
      laundry: (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.dark}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="2" />
          <rect x="6" y="6" width="3" height="3" rx="1" />
        </svg>
      ),
    }

    // Default icon for any category not explicitly defined
    const defaultIcon = (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.dark}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    )

    return icons[normalizedCategory] || defaultIcon
  }

  return (
    <div
      className={`w-full h-full relative bg-${colors.base} overflow-hidden ${className}`}
      style={{ aspectRatio }}>
      {/* Background pattern */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 80"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill={colors.base} />
        {getPatternSvg()}
      </svg>

      {/* Overlay with text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="p-4 backdrop-blur-sm bg-white/40 rounded-lg shadow-sm flex flex-col items-center">
          {getCategoryIcon()}
          <div className="mt-3 mb-1 font-light text-sm text-center text-gray-700">
            {type === 'before' ? 'Before' : 'After'}
          </div>
          <div className="text-xs opacity-80 capitalize text-center">
            {category} Transformation
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderImage
