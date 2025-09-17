import React from 'react'
import { Row, Col, Button } from 'antd'

interface CoverPageProps {
  isNightMode: boolean
}

const CoverPage: React.FC<CoverPageProps> = ({ isNightMode }) => {
  const scrollToComplication = () => {
    const element = document.querySelector('.background-page')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full h-screen relative">
      <Row className="h-full">
        {/* Left Side - Background Image */}
        <Col xs={24} md={12} className="h-full relative">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/sky-complication/background.jpg')`,
              filter: 'brightness(0.7) contrast(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </Col>

        {/* Right Side - Content */}
        <Col xs={24} md={12} className="h-full flex items-center justify-center p-8 md:p-12">
          <div className="max-w-lg">
            {/* Main Heading */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              style={{
                textShadow: '0 0 20px rgba(0,0,0,0.8)',
                lineHeight: '1.1'
              }}
            >
              Celestial Sky Complication
            </h1>

            {/* Subheading */}
            <div className="mb-8 space-y-4">
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white font-semibold px-8 py-4 h-auto text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Complication
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CoverPage
