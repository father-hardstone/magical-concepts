import { useEffect, useState, useRef } from 'react'

interface UseSnapScrollOptions {
  totalSections: number
  onSectionChange?: (sectionIndex: number) => void
}

export const useSnapScroll = (options: UseSnapScrollOptions) => {
  const { totalSections, onSectionChange } = options
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isContentMode, setIsContentMode] = useState(false) // New state for content rolling mode
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollAccumulator = 0
    const scrollThreshold = 50 // Minimum scroll distance to trigger section change
    const scrollCooldown = 100 // Cooldown period between section changes

    const handleWheel = (e: WheelEvent) => {
      // Only prevent default when we're in the snap-scroll container
      e.preventDefault()
      
      if (isScrolling) return

      scrollAccumulator += e.deltaY

      if (Math.abs(scrollAccumulator) >= scrollThreshold) {
        setIsScrolling(true)
        
        const direction = scrollAccumulator > 0 ? 1 : -1
        const newSection = Math.max(0, Math.min(totalSections - 1, currentSection + direction))
        
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
          onSectionChange?.(newSection)
        }

        scrollAccumulator = 0

        // Reset scrolling state after cooldown
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, scrollCooldown)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

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

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [currentSection, totalSections, isScrolling, onSectionChange])

  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < totalSections && !isScrolling) {
      setCurrentSection(sectionIndex)
      onSectionChange?.(sectionIndex)
    }
  }

  return {
    currentSection,
    isScrolling,
    isContentMode,
    containerRef,
    scrollToSection
  }
}
