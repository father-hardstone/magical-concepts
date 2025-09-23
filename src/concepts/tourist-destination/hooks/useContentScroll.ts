import { useEffect, useState, useRef } from 'react'

interface UseContentScrollOptions {
  onContentChange?: (contentIndex: number) => void
}

export const useContentScroll = (options: UseContentScrollOptions) => {
  const { onContentChange } = options
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInContentMode, setIsInContentMode] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollAccumulator = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section comes into view, enable content mode
        if (entry.isIntersecting) {
          setIsInContentMode(true)
        } else {
          setIsInContentMode(false)
        }
      },
      {
        threshold: 0.5 // Trigger when 50% of section is visible
      }
    )

    observer.observe(section)

    return () => {
      observer.unobserve(section)
    }
  }, [])

  const handleScroll = (deltaY: number) => {
    if (!isInContentMode || isTransitioning) return

    scrollAccumulator.current += deltaY
    const threshold = 50

    if (Math.abs(scrollAccumulator.current) >= threshold) {
      setIsTransitioning(true)
      
      const direction = scrollAccumulator.current > 0 ? 1 : -1
      const newIndex = Math.max(0, Math.min(2, currentContentIndex + direction)) // 3 content sets max
      
      if (newIndex !== currentContentIndex) {
        setCurrentContentIndex(newIndex)
        onContentChange?.(newIndex)
      }
      
      scrollAccumulator.current = 0

      // Reset transitioning state
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  return {
    currentContentIndex,
    isTransitioning,
    isInContentMode,
    sectionRef,
    handleScroll
  }
}
