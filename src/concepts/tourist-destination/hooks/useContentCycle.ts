import { useEffect, useState, useRef } from 'react'

interface UseContentCycleOptions {
  totalContentItems: number
  autoCycle?: boolean
  cycleInterval?: number
  onContentChange?: (contentIndex: number) => void
}

export const useContentCycle = (options: UseContentCycleOptions) => {
  const { 
    totalContentItems, 
    autoCycle = false, 
    cycleInterval = 3000,
    onContentChange 
  } = options
  
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const scrollAccumulator = useRef(0)

  // Auto-cycle effect
  useEffect(() => {
    if (autoCycle && totalContentItems > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentContentIndex(prev => (prev + 1) % totalContentItems)
      }, cycleInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoCycle, totalContentItems, cycleInterval])

  // Manual scroll cycling
  const handleScroll = (deltaY: number) => {
    if (isTransitioning || totalContentItems <= 1) return

    scrollAccumulator.current += deltaY
    const threshold = 50

    if (Math.abs(scrollAccumulator.current) >= threshold) {
      setIsTransitioning(true)
      
      const direction = scrollAccumulator.current > 0 ? 1 : -1
      const newIndex = (currentContentIndex + direction + totalContentItems) % totalContentItems
      
      setCurrentContentIndex(newIndex)
      onContentChange?.(newIndex)
      scrollAccumulator.current = 0

      // Reset transitioning state
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  const goToContent = (index: number) => {
    if (index >= 0 && index < totalContentItems && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentContentIndex(index)
      onContentChange?.(index)
      
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  const nextContent = () => {
    goToContent((currentContentIndex + 1) % totalContentItems)
  }

  const prevContent = () => {
    goToContent((currentContentIndex - 1 + totalContentItems) % totalContentItems)
  }

  return {
    currentContentIndex,
    isTransitioning,
    handleScroll,
    goToContent,
    nextContent,
    prevContent
  }
}
