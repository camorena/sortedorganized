// src/hooks/useIntersectionObserver.ts
import { useState, useEffect, useRef, RefObject } from 'react'

interface IntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  triggerOnce?: boolean
}

/**
 * Custom hook for detecting when an element enters the viewport
 * @param options Intersection observer options
 * @returns [ref, isVisible, entry]
 */
export function useIntersectionObserver<T extends Element>({
  threshold = 0.1,
  rootMargin = '0px',
  root = null,
  triggerOnce = true,
}: IntersectionObserverOptions = {}): [
  RefObject<T>,
  boolean,
  IntersectionObserverEntry | null
] {
  const [isVisible, setIsVisible] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const ref = useRef<T>(null)
  const frozen = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || (triggerOnce && frozen.current)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)

        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            frozen.current = true
            // Disconnect after the element is visible (if triggerOnce is true)
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin, root }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, root, triggerOnce])

  return [ref, isVisible, entry]
}

export default useIntersectionObserver
