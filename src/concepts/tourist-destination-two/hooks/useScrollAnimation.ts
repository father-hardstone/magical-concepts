import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  animationType?: 'fadeIn' | 'slideFromLeft' | 'slideFromRight' | 'zoomIn'
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    animationType = 'fadeIn'
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, hasAnimated])

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-1000 ease-out'
    
    if (!isVisible) {
      switch (animationType) {
        case 'slideFromLeft':
          return `${baseClasses} opacity-0 transform -translate-x-20 scale-95`
        case 'slideFromRight':
          return `${baseClasses} opacity-0 transform translate-x-20 scale-95`
        case 'zoomIn':
          return `${baseClasses} opacity-0 transform scale-75`
        case 'fadeIn':
        default:
          return `${baseClasses} opacity-0 transform translate-y-10`
      }
    }

    return `${baseClasses} opacity-100 transform translate-x-0 translate-y-0 scale-100`
  }

  return {
    elementRef,
    isVisible,
    getAnimationClasses
  }
}
