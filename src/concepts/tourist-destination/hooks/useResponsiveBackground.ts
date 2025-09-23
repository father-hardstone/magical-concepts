import { useState, useEffect } from 'react'

export const useResponsiveBackground = (getResponsiveDimensions: (screenSize: 'sm' | 'md' | 'lg' | 'default') => any) => {
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'default'>('default')

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize('sm')
      } else if (width < 1024) {
        setScreenSize('md')
      } else {
        setScreenSize('lg')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const dimensions = getResponsiveDimensions(screenSize)

  return {
    screenSize,
    dimensions
  }
}
