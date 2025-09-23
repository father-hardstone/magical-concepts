import React, { useState, useEffect } from 'react'
import FixedHeader from './components/FixedHeader'
import ConceptCardsSection from './components/ConceptCardsSection'
import FeaturesSection from './components/FeaturesSection'
import CallToActionSection from './components/CallToActionSection'
import { useCyclingBackground } from './hooks/useCyclingBackground'
import { useResponsiveBackground } from './hooks/useResponsiveBackground'
import { useScrollAnimation } from '../tourist-destination-two/hooks/useScrollAnimation'
import { Spin } from 'antd'

const TouristDestination: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)
  
  // Scroll animation hooks for each section
  const conceptCardsAnimation = useScrollAnimation({ animationType: 'slideFromLeft' })
  const featuresAnimation = useScrollAnimation({ animationType: 'slideFromRight' })
  const ctaAnimation = useScrollAnimation({ animationType: 'zoomIn' })

  // Cycling background system
  const backgroundCycle = useCyclingBackground()
  
  // Responsive background dimensions
  const responsiveBackground = useResponsiveBackground(backgroundCycle.getResponsiveDimensions)

  // Check if background images are loaded
  useEffect(() => {
    const checkImageLoad = () => {
      const dayImage = new Image()
      const nightImage = new Image()
      
      let loadedCount = 0
      const totalImages = 2
      
      const onImageLoad = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setIsImageLoading(false)
        }
      }
      
      dayImage.onload = onImageLoad
      nightImage.onload = onImageLoad
      
      dayImage.src = backgroundCycle.currentBackground.dayImage
      nightImage.src = backgroundCycle.currentBackground.nightImage
    }
    
    checkImageLoad()
  }, [backgroundCycle.currentBackground])

  const toggleTheme = () => {
    setIsNightMode(!isNightMode)
  }

  return (
    <div className={`w-screen min-h-screen relative overflow-hidden transition-all duration-1000 ${
      isNightMode 
        ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900' 
        : 'bg-gradient-to-br from-white via-blue-50 to-indigo-100'
    }`}>
      {/* Loading Spinner Overlay */}
      {isImageLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-4 text-white text-lg">Loading...</p>
          </div>
        </div>
      )}
      <FixedHeader 
        isNightMode={isNightMode} 
        onToggleTheme={toggleTheme} 
        onNextBackground={backgroundCycle.cycleToNext}
      />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Night Mode Elements */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${
          isNightMode ? 'bg-purple-500/10' : 'bg-purple-200/20'
        }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-1000 ${
          isNightMode ? 'bg-pink-500/10' : 'bg-pink-200/20'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000 transition-all duration-1000 ${
          isNightMode ? 'bg-blue-500/10' : 'bg-blue-200/20'
        }`}></div>
        
        {/* Random Glowy Elements */}
        <div className={`absolute top-1/6 right-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse delay-3000 transition-all duration-1000 ${
          isNightMode ? 'bg-cyan-400/5' : 'bg-cyan-200/15'
        }`}></div>
        <div className={`absolute top-2/3 left-1/6 w-48 h-48 rounded-full blur-2xl animate-pulse delay-4000 transition-all duration-1000 ${
          isNightMode ? 'bg-pink-400/8' : 'bg-pink-200/15'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/6 w-40 h-40 rounded-full blur-2xl animate-pulse delay-5000 transition-all duration-1000 ${
          isNightMode ? 'bg-purple-400/6' : 'bg-purple-200/12'
        }`}></div>
        <div className={`absolute top-1/3 right-1/2 w-56 h-56 rounded-full blur-2xl animate-pulse delay-6000 transition-all duration-1000 ${
          isNightMode ? 'bg-blue-400/7' : 'bg-blue-300/15'
        }`}></div>
        <div className={`absolute bottom-1/3 left-1/2 w-36 h-36 rounded-full blur-2xl animate-pulse delay-7000 transition-all duration-1000 ${
          isNightMode ? 'bg-indigo-400/5' : 'bg-indigo-300/10'
        }`}></div>
        <div className={`absolute top-1/2 left-1/5 w-44 h-44 rounded-full blur-2xl animate-pulse delay-8000 transition-all duration-1000 ${
          isNightMode ? 'bg-rose-400/6' : 'bg-rose-300/12'
        }`}></div>
        
        {/* Day Mode Additional Elements */}
        {!isNightMode && (
          <>
            <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl animate-pulse delay-4000"></div>
            <div className="absolute bottom-1/6 left-1/6 w-40 h-40 bg-orange-200/25 rounded-full blur-2xl animate-pulse delay-5000"></div>
            <div className="absolute top-2/3 left-1/2 w-28 h-28 bg-cyan-200/20 rounded-full blur-xl animate-pulse delay-6000"></div>
          </>
        )}
      </div>

      {/* Hero Section - Full Height Landing with Background Image */}
      <section className="relative z-10 flex items-end justify-start min-h-screen pb-16 px-8 sm:px-12 lg:px-16">
        {/* Day Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isNightMode ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url(${backgroundCycle.currentBackground.dayImage})`,
            backgroundSize: responsiveBackground.dimensions.backgroundSize,
            backgroundPosition: responsiveBackground.dimensions.backgroundPosition,
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Night Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isNightMode ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${backgroundCycle.currentBackground.nightImage})`,
            backgroundSize: responsiveBackground.dimensions.backgroundSize,
            backgroundPosition: responsiveBackground.dimensions.backgroundPosition,
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isNightMode ? 'bg-black/20' : 'bg-white/10'
        }`}></div>

        <div className="relative z-10 max-w-3xl">
          {/* Main Heading */}
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight pl-4 text-left transition-colors duration-1000 ${
            isNightMode ? 'text-white' : 'text-blue-900'
          }`}>
            Tourist Destination
            <span className={`block transition-colors duration-1000 ${
              isNightMode 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                : 'text-blue-600'
            }`}>
              Concept
            </span>
          </h1>

          {/* Subheading */}
          <p className={`text-lg md:text-xl mb-6 max-w-xl leading-relaxed pl-4 text-left transition-colors duration-1000 ${
            isNightMode ? 'text-gray-200' : 'text-blue-700'
          }`}>
            Revolutionary approaches to creating unforgettable tourist experiences through innovative design and sustainable practices.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pl-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              Explore Concepts
            </button>
            <button className={`border-2 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
              isNightMode 
                ? 'border-white text-white hover:bg-white hover:text-purple-900'
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}>
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Content Section - Below the fold */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Concept Cards Section */}
          <section 
            ref={conceptCardsAnimation.elementRef}
            className={conceptCardsAnimation.getAnimationClasses()}
          >
            <ConceptCardsSection isNightMode={isNightMode} />
          </section>

          {/* Features Section */}
          <section 
            ref={featuresAnimation.elementRef}
            className={featuresAnimation.getAnimationClasses()}
          >
            <FeaturesSection isNightMode={isNightMode} />
          </section>

          {/* Call to Action Section */}
          <section 
            ref={ctaAnimation.elementRef}
            className={ctaAnimation.getAnimationClasses()}
          >
            <CallToActionSection isNightMode={isNightMode} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default TouristDestination
