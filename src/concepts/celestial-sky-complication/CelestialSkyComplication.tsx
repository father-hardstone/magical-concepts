import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'antd'
import FixedHeaderCelestial from './components/FixedHeaderCelestial'
import GrandComplication from './components/GrandComplication'
import { SimulationProvider } from './context/SimulationContext'

const CelestialSkyComplication: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const scrollToComplication = () => {
    const element = document.querySelector('.complication-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Top Bar */}
      <FixedHeaderCelestial />
      
      {/* Hero Section - Full Viewport */}
      <div className="w-full h-screen relative">
        <Row className="h-full">
          {/* Left Side - Background Image */}
          <Col xs={24} md={12} className="h-full relative">
            <div
              className={`w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-out ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('/images/sky-complication/background.jpg')`,
                filter: 'brightness(0.7) contrast(1.1)'
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r from-black/20 to-transparent transition-all duration-2000 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`} />
          </Col>

          {/* Right Side - Content */}
          <Col xs={24} md={12} className="h-full flex items-center justify-center p-8 md:p-12">
            <div className={`max-w-lg transition-all duration-1500 ease-out ${
              isLoaded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              {/* Main Heading */}
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white transition-all duration-1500 ease-out delay-300 ${
                  isLoaded 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  textShadow: '0 0 20px rgba(0,0,0,0.8)',
                  lineHeight: '1.1'
                }}
              >
                Celestial Sky Complication
              </h1>

              {/* Subheading */}
              <div className={`mb-8 space-y-4 transition-all duration-1500 ease-out delay-500 ${
                isLoaded 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-200">
                  Astronomy Meets Horology
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  The celestial sky complication brings the heavens to the wrist—a rotating chart of stars, sun, and moon. In 1989, Patek Philippe's Calibre 89 introduced astronomical displays in a modern grand complication. This vision was perfected in 2002 with the Ref. 5102 "Celestial", showing the night sky, moon phases, and orbits with unmatched precision.
                </p>
                <p className="text-base text-gray-400 leading-relaxed">
                  Patek Philippe remains the pioneer of this rare invention, uniting astronomy and horology in a timeless masterpiece.
                </p>
              </div>

              {/* View Complication Button */}
              <Button
                type="primary"
                size="large"
                onClick={scrollToComplication}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white font-semibold px-8 py-4 h-auto text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-700 delay-700 ${
                  isLoaded 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                View Complication
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Grand Complication Section */}
      <SimulationProvider>
        <GrandComplication />
      </SimulationProvider>
    </div>
  )
}

export default CelestialSkyComplication