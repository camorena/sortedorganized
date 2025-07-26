// src/components/ui/BeforeAfterCard.tsx
import React, { useState, useEffect, useRef } from 'react'
import PlaceholderImage from './PlaceholderImage' // Add this import

// Updated interface to match portfolioData.ts with proper type handling
type MediaSource = string | string[] | React.ReactElement | PlaceholderObject

// Add interface for placeholder object
interface PlaceholderObject {
  _isPlaceholder: true
  type: 'before' | 'after'
  category: string
}

interface BeforeAfterCardProps {
  project: {
    id: string
    title: string
    category: string
    description: string
    details?: string
    clientName?: string
    challenge?: string
    solution?: string
    // Enhanced media support with updated types
    beforeMedia: MediaSource
    afterMedia: MediaSource
    beforeMediaType?: 'image' | 'video' | 'gallery'
    afterMediaType?: 'image' | 'video' | 'gallery'
  }
  index: number
  isVisible?: boolean
}

const BeforeAfterCard: React.FC<BeforeAfterCardProps> = ({
  project,
  index,
  isVisible = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [afterMediaIndex, setAfterMediaIndex] = useState(0)
  const [beforeMediaIndex, setBeforeMediaIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const afterVideoRef = useRef<HTMLVideoElement>(null)
  const beforeVideoRef = useRef<HTMLVideoElement>(null)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // NEW: Check if the media is a placeholder object
  const isPlaceholder = (media: any): media is PlaceholderObject => {
    return media && typeof media === 'object' && media._isPlaceholder === true
  }

  // UPDATED: Determine media types based on file extensions or explicit types
  const getMediaType = (
    media: MediaSource,
    explicitType?: 'image' | 'video' | 'gallery'
  ): 'image' | 'video' | 'gallery' => {
    if (explicitType) return explicitType

    // Check for placeholder first
    if (isPlaceholder(media)) return 'image'

    // Handle React element (placeholder component)
    if (React.isValidElement(media)) return 'image'

    if (Array.isArray(media) && media.length > 1) return 'gallery'

    const source = Array.isArray(media) ? media[0] : media

    // If source is a React element or not a string (could be from a placeholder)
    if (typeof source !== 'string') return 'image'

    const extension = source.split('.').pop()?.toLowerCase()

    if (extension === 'mp4' || extension === 'webm' || extension === 'ogg') {
      return 'video'
    }

    return 'image'
  }

  // Get media source (handles arrays and React elements)
  const getMediaSource = (
    media: MediaSource,
    index: number = 0
  ): string | React.ReactElement | PlaceholderObject => {
    // If it's a React element, return it directly
    if (React.isValidElement(media)) return media

    // If it's a placeholder object, return it directly
    if (isPlaceholder(media)) return media as PlaceholderObject

    // If it's an array, return the element at the index
    if (Array.isArray(media)) {
      const element = media[index % media.length]
      if (React.isValidElement(element)) return element
      return element as string // Handle string arrays
    }

    // Otherwise, return the media as is
    return media as string
  }

  // Determine media types
  const afterType = getMediaType(project.afterMedia, project.afterMediaType)
  const beforeType = getMediaType(project.beforeMedia, project.beforeMediaType)

  // Determine if galleries
  const isAfterGallery = afterType === 'gallery'
  const isBeforeGallery = beforeType === 'gallery'

  // Calculate total items in galleries
  const afterGalleryLength =
    isAfterGallery && Array.isArray(project.afterMedia)
      ? project.afterMedia.length
      : 1
  const beforeGalleryLength =
    isBeforeGallery && Array.isArray(project.beforeMedia)
      ? project.beforeMedia.length
      : 1

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

  // Handle video playback
  useEffect(() => {
    if (afterVideoRef.current && !isFlipped) {
      if (isVideoPlaying) {
        afterVideoRef.current.play()
      } else {
        afterVideoRef.current.pause()
      }
    }

    if (beforeVideoRef.current && isFlipped) {
      beforeVideoRef.current.pause()
    }
  }, [isFlipped, isVideoPlaying])

  // Touch handlers with improved sensitivity
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent, isGallery: boolean = false) => {
    const touchY = e.touches[0].clientY
    const touchX = e.touches[0].clientX
    const deltaX = touchX - touchStartX.current
    const deltaY = touchY - touchStartY.current

    // If this is a gallery and horizontal swipe is bigger than vertical swipe
    if (
      isGallery &&
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > 20
    ) {
      e.stopPropagation()
      return
    }

    // For vertical scrolling content
    if (!contentRef.current) return

    const scrollTop = contentRef.current.scrollTop
    const scrollHeight = contentRef.current.scrollHeight
    const clientHeight = contentRef.current.clientHeight

    // Only stop propagation if trying to scroll beyond bounds
    if (
      (scrollTop === 0 && touchY > touchStartY.current) || // Trying to scroll up at top
      (scrollTop >= scrollHeight - clientHeight && touchY < touchStartY.current) // Trying to scroll down at bottom
    ) {
      e.stopPropagation()
    }

    setIsScrolling(true)
  }

  const handleTouchEnd = (
    e: React.TouchEvent,
    isGallery: boolean = false,
    isBack: boolean = false
  ) => {
    // For gallery navigation
    if (isGallery) {
      const touchX = e.changedTouches[0].clientX
      const deltaX = touchX - touchStartX.current

      // If significant horizontal swipe
      if (Math.abs(deltaX) > 30) {
        e.stopPropagation()

        if (isBack) {
          // For before gallery (back of card)
          if (deltaX > 0) {
            // Swipe right - previous image
            setBeforeMediaIndex(
              (prev) => (prev - 1 + beforeGalleryLength) % beforeGalleryLength
            )
          } else {
            // Swipe left - next image
            setBeforeMediaIndex((prev) => (prev + 1) % beforeGalleryLength)
          }
        } else {
          // For after gallery (front of card)
          if (deltaX > 0) {
            // Swipe right - previous image
            setAfterMediaIndex(
              (prev) => (prev - 1 + afterGalleryLength) % afterGalleryLength
            )
          } else {
            // Swipe left - next image
            setAfterMediaIndex((prev) => (prev + 1) % afterGalleryLength)
          }
        }
        return
      }
    }

    // Reset scrolling state after a small delay
    setTimeout(() => {
      if (!isScrolling) {
        // Only flip if not scrolling
        setIsFlipped(!isFlipped)
      }
      setIsScrolling(false)
    }, 50)
  }

  const handleContentClick = (e: React.MouseEvent) => {
    // Prevent card from flipping back when clicking on scrollable content
    if (isScrolling) {
      e.stopPropagation()
    }
  }

  // Navigate gallery with cleaner interface
  const navigateGallery = (
    isBack: boolean = false,
    direction: 'next' | 'prev'
  ) => {
    if (isBack) {
      // Before gallery
      if (direction === 'next') {
        setBeforeMediaIndex((prev) => (prev + 1) % beforeGalleryLength)
      } else {
        setBeforeMediaIndex(
          (prev) => (prev - 1 + beforeGalleryLength) % beforeGalleryLength
        )
      }
    } else {
      // After gallery
      if (direction === 'next') {
        setAfterMediaIndex((prev) => (prev + 1) % afterGalleryLength)
      } else {
        setAfterMediaIndex(
          (prev) => (prev - 1 + afterGalleryLength) % afterGalleryLength
        )
      }
    }
  }

  // Toggle video play state
  const toggleVideo = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      if (ref.current.paused) {
        ref.current.play()
        setIsVideoPlaying(true)
      } else {
        ref.current.pause()
        setIsVideoPlaying(false)
      }
    }
  }

  // Category-based styling with refined color palette
  const getCategoryColors = () => {
    const categories: { [key: string]: any } = {
      pantry: {
        badge: 'bg-mint-accent/10 text-mint-accent',
        border: 'border-mint-accent/10',
        icon: 'text-mint-accent',
        iconBg: 'bg-mint-accent/10',
      },
      closet: {
        badge: 'bg-gold-highlight/10 text-gold-highlight',
        border: 'border-gold-highlight/10',
        icon: 'text-gold-highlight',
        iconBg: 'bg-gold-highlight/10',
      },
      office: {
        badge: 'bg-forest-shadow/10 text-forest-shadow',
        border: 'border-forest-shadow/10',
        icon: 'text-forest-shadow',
        iconBg: 'bg-forest-shadow/10',
      },
      kitchen: {
        badge: 'bg-sage-light/10 text-sage-light',
        border: 'border-sage-light/10',
        icon: 'text-sage-light',
        iconBg: 'bg-sage-light/10',
      },
      laundry: {
        badge: 'bg-forest-shadow/10 text-forest-shadow',
        border: 'border-forest-shadow/10',
        icon: 'text-forest-shadow',
        iconBg: 'bg-forest-shadow/10',
      },
      playroom: {
        badge: 'bg-mint-accent/10 text-mint-accent',
        border: 'border-mint-accent/10',
        icon: 'text-mint-accent',
        iconBg: 'bg-mint-accent/10',
      },
      commercial: {
        badge: 'bg-charcoal/10 text-charcoal',
        border: 'border-charcoal/10',
        icon: 'text-charcoal',
        iconBg: 'bg-charcoal/10',
      },
      garage: {
        badge: 'bg-charcoal/10 text-charcoal',
        border: 'border-charcoal/10',
        icon: 'text-charcoal',
        iconBg: 'bg-charcoal/10',
      },
    }

    // Default if category not found
    const defaultColors = {
      badge: 'bg-sage-light/10 text-sage-light',
      border: 'border-sage-light/10',
      icon: 'text-sage-light',
      iconBg: 'bg-sage-light/10',
    }

    return categories[project.category.toLowerCase()] || defaultColors
  }

  const colors = getCategoryColors()

  // Get elegant SVG icon based on category
  const getCategoryIcon = () => {
    const categoryKey = project.category.toLowerCase()

    // Define type for our icons object with index signature
    const icons: { [key: string]: React.ReactElement } = {
      pantry: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M5 6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6Z" />
          <path d="M8 4V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V4" />
          <path d="M5 10H19" />
          <path d="M5 14H19" />
          <path d="M5 18H19" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="9" cy="16" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="16" r="1" fill="currentColor" />
        </svg>
      ),
      closet: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
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
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M4 7H20" />
          <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" />
          <path d="M9 13V17" />
          <path d="M15 13V17" />
          <path d="M12 13V17" />
          <rect
            x="6"
            y="9"
            width="12"
            height="2"
            rx="0.5"
            fill="currentColor"
          />
        </svg>
      ),
      office: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
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
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
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
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="2" />
          <rect x="6" y="6" width="3" height="3" rx="1" />
        </svg>
      ),
      garage: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <rect x="10" y="12" width="4" height="8" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="8" y1="16" x2="8" y2="16.01" />
          <line x1="16" y1="16" x2="16" y2="16.01" />
        </svg>
      ),
      commercial: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9H21" />
          <path d="M9 21V9" />
          <path d="M12 6H12.01" />
          <path d="M16 6H16.01" />
          <path d="M6 6H6.01" />
          <rect x="12" y="12" width="6" height="6" />
        </svg>
      ),
    }

    // Default icon if category not found
    const defaultIcon = (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="5" />
        <path d="M3 12L8 12" />
        <path d="M16 12L21 12" />
        <path d="M12 3L12 8" />
        <path d="M12 16L12 21" />
      </svg>
    )

    return icons[categoryKey] || defaultIcon
  }

  // UPDATED: Render media with support for placeholder objects
  const renderMedia = (
    media: any,
    type: 'before' | 'after',
    specifiedType?: 'image' | 'video' | 'gallery'
  ) => {
    // Handle our placeholder object
    if (isPlaceholder(media)) {
      return <PlaceholderImage type={media.type} category={media.category} />
    }

    // If media source is a React element (like a placeholder), render it directly
    if (React.isValidElement(media)) return media

    const mediaType = getMediaType(media, specifiedType)

    const containerClasses = 'w-full h-full object-cover'

    // For video files
    if (mediaType === 'video') {
      const videoRef = type === 'before' ? beforeVideoRef : afterVideoRef

      return (
        <div className="relative w-full h-full group">
          <video
            ref={videoRef}
            src={media as string}
            className={containerClasses}
            loop
            muted
            playsInline
            onClick={(e) => {
              e.stopPropagation()
              toggleVideo(videoRef)
            }}
          />
          {/* Minimal video indicator and play control */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="w-14 h-14 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105 transform hover:bg-white/80"
              onClick={(e) => {
                e.stopPropagation()
                toggleVideo(videoRef)
              }}>
              {videoRef.current && !videoRef.current.paused ? (
                <svg
                  className="w-5 h-5 text-charcoal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-charcoal"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Small video indicator */}
          <div className="absolute bottom-3 right-3 bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs font-light rounded-md px-2 py-0.5 shadow-sm flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
            <span>{type === 'before' ? 'BEFORE' : 'AFTER'}</span>
          </div>
        </div>
      )
    }

    // For gallery or single image
    return (
      <div
        className="relative w-full h-full group"
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => handleTouchMove(e, mediaType === 'gallery')}
        onTouchEnd={(e) =>
          handleTouchEnd(e, mediaType === 'gallery', type === 'before')
        }>
        <img
          src={media as string}
          alt={`${project.title} - ${type === 'before' ? 'Before' : 'After'}`}
          className={containerClasses}
        />

        {/* Gallery controls - only show if gallery has multiple items */}
        {mediaType === 'gallery' &&
          Array.isArray(media) &&
          media.length > 1 && (
            <>
              {/* Subtle gallery indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {Array.from({ length: media.length }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i ===
                      (type === 'before' ? beforeMediaIndex : afterMediaIndex)
                        ? 'bg-white'
                        : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Minimal navigation arrows - visible on hover */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-105 transform hover:bg-white/80"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateGallery(type === 'before', 'prev')
                  }}>
                  <svg
                    className="w-4 h-4 text-charcoal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className="w-8 h-8 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-105 transform hover:bg-white/80"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateGallery(type === 'before', 'next')
                  }}>
                  <svg
                    className="w-4 h-4 text-charcoal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Small gallery indicator */}
              <div className="absolute bottom-3 right-3 bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs font-light rounded-md px-2 py-0.5 shadow-sm flex items-center">
                <span>{type === 'before' ? 'BEFORE' : 'AFTER'}</span>
                <span className="ml-1 opacity-60">·</span>
                <span className="ml-1 opacity-60">
                  {(type === 'before' ? beforeMediaIndex : afterMediaIndex) + 1}
                  /{media.length}
                </span>
              </div>
            </>
          )}

        {/* Simple before/after label for single images */}
        {mediaType === 'image' && (
          <div className="absolute bottom-3 right-3 bg-white/70 backdrop-blur-sm text-charcoal/70 text-xs font-light rounded-md px-2 py-0.5 shadow-sm">
            {type === 'before' ? 'BEFORE' : 'AFTER'}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative h-[450px] sm:h-[480px] transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        perspective: '1000px',
      }}>
      <div
        ref={cardRef}
        className="relative w-full h-full transition-all duration-700 cursor-pointer transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        {/* Front of Card (AFTER image/video) */}
        <div
          className={`absolute inset-0 rounded-xl border ${colors.border} 
                      bg-white shadow-md hover:shadow-lg transition-all duration-300
                      flex flex-col overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}>
          {/* Category Badge - Refined with icon */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`text-xs px-3 py-1 rounded-full ${colors.badge} font-light flex items-center`}>
              <span className={`mr-1.5 ${colors.icon}`}>
                {getCategoryIcon()}
              </span>
              {project.category}
            </span>
          </div>

          {/* Minimal flip indicator - only visible on hover */}
          <div
            className={`absolute top-4 left-4 z-10 transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm text-charcoal/70 text-xs">
              <svg
                className="w-3 h-3 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span className="font-light">See Before</span>
            </div>
          </div>

          {/* After Media Container */}
          <div className="w-full h-[60%] relative overflow-hidden">
            {renderMedia(
              getMediaSource(project.afterMedia, afterMediaIndex),
              'after',
              project.afterMediaType
            )}
          </div>

          {/* Content - Cleaner typography */}
          <div className="p-5 flex flex-col h-[40%]">
            {/* Title */}
            <h4 className="text-lg font-medium text-charcoal mb-1.5 line-clamp-1">
              {project.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-forest-shadow/70 leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Bottom content - Simplified */}
            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-forest-shadow/70">
                  {project.clientName || 'Client Project'}
                </span>
              </div>

              {/* Flip cue */}
              <div className="text-xs text-charcoal/40 flex items-center group">
                <span className="mr-1 group-hover:mr-2 transition-all duration-300">
                  View Before
                </span>
                <svg
                  className="w-3 h-3 opacity-60 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card (BEFORE image/video) */}
        <div
          className={`absolute inset-0 rounded-xl border ${colors.border} 
                      bg-white shadow-md flex flex-col overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}>
          {/* Back Header - Minimal and transparent */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-charcoal/50 to-transparent z-10 py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Hidden on mobile, visible on hover for desktop */}
              </div>
              <button
                className="p-1.5 text-white/90 hover:text-white transition-colors bg-charcoal/30 backdrop-blur-sm rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(false)
                }}>
                <svg
                  className="w-4 h-4"
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

          {/* Before Media - Full background */}
          <div className="absolute inset-0 w-full h-full">
            {renderMedia(
              getMediaSource(project.beforeMedia, beforeMediaIndex),
              'before',
              project.beforeMediaType
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent">
              {/* Gradient overlay for text readability - more subtle */}
            </div>
          </div>

          {/* Scrollable Content Area - Refined styling */}
          <div
            ref={contentRef}
            className="absolute bottom-0 left-0 right-0 max-h-[45%] overflow-y-auto px-6 pt-5 pb-6 z-10 bg-white/80 backdrop-blur-md"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => handleTouchEnd(e)}
            onClick={handleContentClick}>
            <h4 className="text-lg font-medium text-charcoal mb-3 flex items-center">
              <span className={`mr-2 ${colors.icon}`}>{getCategoryIcon()}</span>
              {project.title}
            </h4>

            <div className="space-y-4 text-sm text-forest-shadow/80">
              {project.challenge && (
                <div>
                  <h5 className="text-xs uppercase tracking-wider text-charcoal font-medium mb-1 flex items-center">
                    <svg
                      className="w-3.5 h-3.5 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    The Challenge
                  </h5>
                  <p className="leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h5 className="text-xs uppercase tracking-wider text-charcoal font-medium mb-1 flex items-center">
                    <svg
                      className="w-3.5 h-3.5 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Our Solution
                  </h5>
                  <p className="leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>
          </div>

          {/* Minimal flip back indicator - only on hover */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${
              isHovering ? 'opacity-80' : 'opacity-0'
            }`}>
            <div className="w-12 h-12 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-md">
              <svg
                className="w-5 h-5 text-charcoal"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforeAfterCard
