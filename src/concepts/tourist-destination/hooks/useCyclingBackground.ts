import { useState, useEffect } from 'react'

interface BackgroundSet {
  id: string
  name: string
  dayImage: string
  nightImage: string
  dimensions: {
    backgroundSize: string
    backgroundPosition: string
    sm?: {
      backgroundSize: string
      backgroundPosition: string
    }
    md?: {
      backgroundSize: string
      backgroundPosition: string
    }
    lg?: {
      backgroundSize: string
      backgroundPosition: string
    }
  }
}

const BACKGROUND_SETS: BackgroundSet[] = [
  {
    id: 'buckingham1',
    name: 'Buckingham Palace 1',
    dayImage: '/images/carousel/1-buckingham1/day.jpg',
    nightImage: '/images/carousel/1-buckingham1/night.jpg',
    dimensions: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      sm: {
        backgroundSize: '355%',
        backgroundPosition: 'center top'
      },
      md: {
        backgroundSize: '199%',
        backgroundPosition: 'center'
      }
    }
  },
  {
    id: 'noormahal1',
    name: 'Noor Mahal 1',
    dayImage: '/images/carousel/2-noormahal1/day.jpg',
    nightImage: '/images/carousel/2-noormahal1/night.jpg',
    dimensions: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      sm: {
        backgroundSize: '275%',
        backgroundPosition: '40% bottom'
      },
      md: {
        backgroundSize: '152%',
        backgroundPosition: ' 65% center'
      }
    }
  },
  {
    id: 'buckingham2',
    name: 'Buckingham Palace 2',
    dayImage: '/images/carousel/3-buckingham2/day.jpg',
    nightImage: '/images/carousel/3-buckingham2/night.jpg',
    dimensions: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      sm: {
        backgroundSize: '300%',
        backgroundPosition: 'center top'
      },
      md: {
        backgroundSize: '165%',
        backgroundPosition: 'center'
      }
    }
  },
  {
    id: 'noormahal2',
    name: 'Noor Mahal 2',
    dayImage: '/images/carousel/4-noormahal2/day.jpg',
    nightImage: '/images/carousel/4-noormahal2/night.jpg',
    dimensions: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      sm: {
        backgroundSize: '300%',
        backgroundPosition: '30% bottom'
      },
      md: {
        backgroundSize: '165%',
        backgroundPosition: ' 25% center'
      }
    }
  },
  {
    id: 'tajmahal',
    name: 'Taj Mahal',
    dayImage: '/images/carousel/5-tajmahal/day.jpg',
    nightImage: '/images/carousel/5-tajmahal/night.jpg',
    dimensions: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      sm: {
        backgroundSize: '300%',
        backgroundPosition: 'center top'
      },
      md: {
        backgroundSize: '165%',
        backgroundPosition: 'center'
      }
    }
  }
]

export const useCyclingBackground = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Get random background on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BACKGROUND_SETS.length)
    setCurrentBackgroundIndex(randomIndex)
  }, [])

  // Cycle backgrounds every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      // Fade out current background
      setTimeout(() => {
        setCurrentBackgroundIndex((prevIndex) => 
          (prevIndex + 1) % BACKGROUND_SETS.length
        )
        
        // Fade in new background
        setTimeout(() => {
          setIsTransitioning(false)
        }, 1000) // 1 second fade transition
      }, 1000) // 1 second fade out
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [])

  const currentBackground = BACKGROUND_SETS[currentBackgroundIndex]

  const getResponsiveDimensions = (screenSize: 'sm' | 'md' | 'lg' | 'default' = 'default') => {
    const dimensions = currentBackground.dimensions
    
    switch (screenSize) {
      case 'sm':
        return dimensions.sm || dimensions
      case 'md':
        return dimensions.md || dimensions
      case 'lg':
        return dimensions.lg || dimensions
      default:
        return dimensions
    }
  }

  const cycleToNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentBackgroundIndex((prevIndex) => 
        (prevIndex + 1) % BACKGROUND_SETS.length
      )
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1000)
    }, 1000)
  }

  const cycleToPrevious = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentBackgroundIndex((prevIndex) => 
        prevIndex === 0 ? BACKGROUND_SETS.length - 1 : prevIndex - 1
      )
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1000)
    }, 1000)
  }

  const cycleToSpecific = (index: number) => {
    if (index >= 0 && index < BACKGROUND_SETS.length && index !== currentBackgroundIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentBackgroundIndex(index)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 1000)
      }, 1000)
    }
  }

  return {
    currentBackground,
    allBackgrounds: BACKGROUND_SETS,
    currentIndex: currentBackgroundIndex,
    isTransitioning,
    getResponsiveDimensions,
    cycleToNext,
    cycleToPrevious,
    cycleToSpecific
  }
}
