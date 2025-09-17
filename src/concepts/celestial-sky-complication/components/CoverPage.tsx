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
                Grand Complications by Patek Philippe
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Experience the pinnacle of horological artistry with our celestial sky complication. 
                This masterpiece combines astronomical precision with mechanical excellence, 
                displaying the sun, moon, and stars in perfect harmony with the passage of time.
              </p>
              <p className="text-base text-gray-400">
                Crafted by the master watchmakers at Patek Philippe, this grand complication 
                represents over a century of innovation in astronomical timepieces.
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
