// src/hooks/useScrollEffect.ts
import { useState, useEffect, useRef, RefObject } from 'react'

interface ScrollEffectOptions {
  threshold?: number
  scrollDistance?: number
}

/**
 * Custom hook for scroll-based effects
 * @param options Scroll options
 * @returns [ref, isScrolled, scrollProgress]
 */
export function useScrollEffect<T extends Element>({
  threshold = 20,
  scrollDistance = 0,
}: ScrollEffectOptions = {}): [RefObject<T>, boolean, number] {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're detecting window scroll or element scroll
      if (scrollDistance > 0 && ref.current) {
        // For element scroll
        const { scrollLeft, scrollWidth, clientWidth } =
          ref.current as unknown as HTMLElement
        const maxScroll = scrollWidth - clientWidth
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        setScrollProgress(progress)
      } else {
        // For window scroll
        setIsScrolled(window.scrollY > threshold)
        if (document.documentElement.scrollHeight - window.innerHeight > 0) {
          const progress =
            (window.scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100
          setScrollProgress(progress)
        }
      }
    }

    // Check if passive is supported
    let supportsPassive = false
    try {
      window.addEventListener('test', () => {}, {
        get passive() {
          supportsPassive = true
          return false
        },
      })
    } catch (e) {}

    // Add scroll listener with passive option if supported
    window.addEventListener(
      'scroll',
      handleScroll,
      supportsPassive ? { passive: true } : false
    )
    if (ref.current && scrollDistance > 0) {
      ref.current.addEventListener(
        'scroll',
        handleScroll,
        supportsPassive ? { passive: true } : false
      )
    }

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (ref.current && scrollDistance > 0) {
        ref.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [threshold, scrollDistance])

  return [ref, isScrolled, scrollProgress]
}

export default useScrollEffect
