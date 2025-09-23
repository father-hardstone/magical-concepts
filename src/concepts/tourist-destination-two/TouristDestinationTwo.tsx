import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import FixedHeaderTwo from './components/FixedHeaderTwo'
import ConceptCardsSection from './components/ConceptCardsSection'
import FeaturesSection from './components/FeaturesSection'
import CallToActionSection from './components/CallToActionSection'
import { useScrollAnimation } from './hooks/useScrollAnimation'

const TouristDestinationTwo: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState(false)
  const celestialDiskRef = useRef<HTMLDivElement>(null)
  const dayImageRef = useRef<HTMLDivElement>(null)
  const nightImageRef = useRef<HTMLDivElement>(null)
  
  // Scroll animation hooks for each section
  const conceptCardsAnimation = useScrollAnimation({ animationType: 'slideFromLeft' })
  const featuresAnimation = useScrollAnimation({ animationType: 'slideFromRight' })
  const ctaAnimation = useScrollAnimation({ animationType: 'zoomIn' })

  const toggleTheme = () => {
    setIsNightMode(!isNightMode)
  }

  useEffect(() => {
    if (celestialDiskRef.current && dayImageRef.current && nightImageRef.current) {

      // First: Celestial disk fades in
      gsap.fromTo(celestialDiskRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      )

      // Then: Day/night images fade in after celestial disk
      gsap.fromTo(dayImageRef.current,
        { opacity: 0 },
        { opacity: isNightMode ? 0 : 1, duration: 0.4, ease: "power2.out", delay: 0.3 }
      )
      gsap.fromTo(nightImageRef.current,
        { opacity: 0 },
        { opacity: isNightMode ? 1 : 0, duration: 0.4, ease: "power2.out", delay: 0.3 }
      )
    } else {
    }
  }, [])

  useEffect(() => {
    if (celestialDiskRef.current) {
      // Rotate 180° clockwise on each toggle
      gsap.to(celestialDiskRef.current, {
        rotation: "+=180",
        duration: 2,
        ease: "power2.inOut"
      })
    }

    // CSS transitions handle the crossfade automatically
    // No need for GSAP - just update opacity via state
  }, [isNightMode])

  return (
    <div className={`w-screen min-h-screen relative overflow-hidden transition-all duration-1000 ${isNightMode
        ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900'
        : 'bg-gradient-to-br from-white via-blue-50 to-indigo-100'
      }`}>
      <FixedHeaderTwo isNightMode={isNightMode} onToggleTheme={toggleTheme} />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Night Mode Elements */}
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse transition-all duration-1000 ${isNightMode ? 'bg-purple-500/10' : 'bg-purple-200/20'
          }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-1000 ${isNightMode ? 'bg-pink-500/10' : 'bg-pink-200/20'
          }`}></div>
        <div className={`absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000 transition-all duration-1000 ${isNightMode ? 'bg-blue-500/10' : 'bg-blue-200/20'
          }`}></div>

        {/* Random Glowy Elements */}
        <div className={`absolute top-1/6 right-1/3 w-32 h-32 rounded-full blur-2xl animate-pulse delay-3000 transition-all duration-1000 ${isNightMode ? 'bg-cyan-400/5' : 'bg-cyan-200/15'
          }`}></div>
        <div className={`absolute top-2/3 left-1/6 w-48 h-48 rounded-full blur-2xl animate-pulse delay-4000 transition-all duration-1000 ${isNightMode ? 'bg-pink-400/8' : 'bg-pink-200/15'
          }`}></div>
        <div className={`absolute bottom-1/4 right-1/6 w-40 h-40 rounded-full blur-2xl animate-pulse delay-5000 transition-all duration-1000 ${isNightMode ? 'bg-purple-400/6' : 'bg-purple-200/12'
          }`}></div>
        <div className={`absolute top-1/3 right-1/2 w-56 h-56 rounded-full blur-2xl animate-pulse delay-6000 transition-all duration-1000 ${isNightMode ? 'bg-blue-400/7' : 'bg-blue-300/15'
          }`}></div>
        <div className={`absolute bottom-1/3 left-1/2 w-36 h-36 rounded-full blur-2xl animate-pulse delay-7000 transition-all duration-1000 ${isNightMode ? 'bg-indigo-400/5' : 'bg-indigo-300/10'
          }`}></div>
        <div className={`absolute top-1/2 left-1/5 w-44 h-44 rounded-full blur-2xl animate-pulse delay-8000 transition-all duration-1000 ${isNightMode ? 'bg-rose-400/6' : 'bg-rose-300/12'
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
      <section className="relative z-10 flex items-end justify-start h-screen pb-16 px-8 sm:px-12 lg:px-16 overflow-hidden">
        {/* Celestial Disk Background - Behind everything, fully opaque, allowed to overflow */}
        <div
          ref={celestialDiskRef}
          className="absolute opacity-100 
          2xl:w-[127vw] 2xl:h-[280vh]
          xl:w-[137vw] xl:h-[240vh]
          lg:w-[157vw] lg:h-[260vh]
          md:w-[200vw] md:h-[200vh]
          sm:w-[157vw] sm:h-[200vh]
          w-[400vw] h-[240vh]
          left-1/2 
          2xl:top-[calc(50%+260px)] xl:top-[65vh] lg:top-[65vh] md:top-[75vh] sm:top-[calc(50%+260px)] top-[calc(50%+260px)] -translate-x-1/2 -translate-y-1/2 rotate-180"
          style={{
            backgroundImage: 'url(/images/buckingham2/celestial-disk.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transformOrigin: 'center 53%'
          }}
        />

        {/* Day Background - Crossfade with night */}
        <div
          ref={dayImageRef}
          className="absolute inset-0  transition-opacity duration-[2000ms] ease-in-out
            2xl:w-[100vw] 2xl:h-[140vh] 2xl:top-[-35vh]
            xl:w-[100vw] xl:h-[140vh] xl:top-[-35vh]
            lg:w-[100vw] lg:h-[100vh] lg:top-[-0vh]
            md:w-[100vw] md:h-[70vh] md:top-[30vh]
            sm:w-[90vw] sm:h-[100vh] sm:top-[30vh]
            w-[100vw] h-[39vh] top-[61vh]

            "
          style={{
            backgroundImage: 'url(/images/buckingham2/day.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            opacity: isNightMode ? 0 : 1
          }}
        />

        {/* Night Background - Crossfade with day */}
        <div
          ref={nightImageRef}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out
            2xl:w-[100vw] 2xl:h-[140vh] 2xl:top-[-35vh]
            xl:w-[100vw] xl:h-[140vh] xl:top-[-35vh]
            lg:w-[100vw] lg:h-[100vh] lg:top-[-0vh]
            md:w-[100vw] md:h-[70vh] md:top-[30vh]
            sm:w-[90vw] sm:h-[100vh] sm:top-[30vh]
            w-[100vw] h-[39vh] top-[61vh]            "
          style={{
            backgroundImage: 'url(/images/buckingham2/night.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 2,
            opacity: isNightMode ? 1 : 0
          }}
        />

        {/* Overlay for better text readability
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isNightMode ? 'bg-black/20' : 'bg-white/10'
        }`}></div>
         */}
        <div className="absolute sm:relative top-[45vh] left-[35vw] sm:left-0 sm:top-0 transform -translate-x-1/2 -translate-y-1/2 sm:transform-none z-10 max-w-3xl
          sm:-mt-20 md:-mt-16 lg:mt-0 -mt-50
        ">
          {/* Main Heading */}
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight pl-4 text-left transition-colors duration-1000 ${
            isNightMode ? 'text-white' : 'text-blue-900 sm:text-white'
          }`}>
            Tourist Destination
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Concept Two
            </span>
          </h1>

          {/* Subheading */}
          <p className={`pt-10 text-base sm:text-lg md:text-xl mb-6 max-w-xl leading-relaxed pl-4 text-left transition-colors duration-1000 ${
            isNightMode ? 'text-gray-200' : 'text-[#001f4d] sm:text-gray-200'
          }`}>
            Advanced tourism solutions that combine cutting-edge technology with authentic cultural experiences to create next-generation destinations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pl-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              Explore Concepts
            </button>
            <button className={`border-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
              isNightMode 
                ? 'border-white text-white hover:bg-white hover:text-purple-900'
                : 'border-[#001f4d] text-[#001f4d] hover:bg-[#001f4d] hover:text-white sm:border-white sm:text-white sm:hover:bg-white sm:hover:text-purple-900'
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

export default TouristDestinationTwo
