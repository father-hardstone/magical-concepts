import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import FixedHeaderCelestial from './components/FixedHeaderCelestial'
import CoverPage from './components/CoverPage'
import BackgroundPage from './components/BackgroundPage'

const CelestialSkyComplication: React.FC = () => {
  const location = useLocation()
  const [isNightMode] = useState(true) // Always dark mode for this page
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Debug: Log when component mounts/unmounts
  useEffect(() => {
    console.log('CelestialSkyComplication mounted', location.pathname)
    return () => {
      console.log('CelestialSkyComplication unmounted')
      // Force cleanup of all GSAP animations
      gsap.killTweensOf("*")
    }
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop
        setScrollY(scrollTop)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Calculate opacity based on scroll
  const coverPageOpacity = Math.max(0, 1 - scrollY / 400) // CoverPage fades out in first 400px
  const backgroundPageOpacity = Math.min(1, scrollY / 400) // BackgroundPage fades in during first 400px

  return (
    <div 
      key="celestial-sky-complication-main"
      className={`w-screen h-screen relative overflow-hidden transition-all duration-1000 ${
        isNightMode 
          ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900' 
          : 'bg-gradient-to-br from-white via-blue-50 to-indigo-100'
      }`}
    >
      <FixedHeaderCelestial />
      
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Cover Page Component */}
        <div 
          style={{ 
            opacity: coverPageOpacity,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <CoverPage />
        </div>
        
        {/* Background Page Component */}
        <div 
          style={{ 
            opacity: backgroundPageOpacity,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <BackgroundPage isNightMode={isNightMode} />
        </div>
      </div>

    </div>
  )
}

export default CelestialSkyComplication