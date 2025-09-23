import { useEffect, useState, useRef } from 'react'

interface UseScreenScrollOptions {
  totalSections: number
  onSectionChange?: (sectionIndex: number) => void
}

export const useScreenScroll = (options: UseScreenScrollOptions) => {
  const { totalSections, onSectionChange } = options
  const [currentSection, setCurrentSection] = useState(0)
  const [isInScreen2, setIsInScreen2] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When screen 2 comes into view, enable snap-scroll
        if (entry.isIntersecting) {
          setIsInScreen2(true)
        } else {
          setIsInScreen2(false)
        }
      },
      {
        threshold: 0.5 // Trigger when 50% of screen 2 is visible
      }
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [])

  useEffect(() => {
    if (!isInScreen2) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isScrolling) return

      scrollAccumulator.current += e.deltaY
      const threshold = 50

      if (Math.abs(scrollAccumulator.current) >= threshold) {
        setIsScrolling(true)
        
        const direction = scrollAccumulator.current > 0 ? 1 : -1
        const newSection = Math.max(0, Math.min(totalSections - 1, currentSection + direction))
        
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
          onSectionChange?.(newSection)
        }

        scrollAccumulator.current = 0

        // Reset scrolling state
        setTimeout(() => {
          setIsScrolling(false)
        }, 100)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInScreen2 || isScrolling) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        const newSection = Math.min(totalSections - 1, currentSection + 1)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
          onSectionChange?.(newSection)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const newSection = Math.max(0, currentSection - 1)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
          onSectionChange?.(newSection)
        }
      }
    }

    // Add event listeners only when in screen 2
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isInScreen2, currentSection, totalSections, isScrolling, onSectionChange])

  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < totalSections && !isScrolling) {
      setCurrentSection(sectionIndex)
      onSectionChange?.(sectionIndex)
    }
  }

  return {
    currentSection,
    isInScreen2,
    isScrolling,
    containerRef,
    scrollToSection
  }
}
