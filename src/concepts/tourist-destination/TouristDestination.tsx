import React, { useState } from 'react'
import FixedHeader from './components/FixedHeader'

const TouristDestination: React.FC = () => {
  const [isNightMode, setIsNightMode] = useState(false)

  const toggleTheme = () => {
    setIsNightMode(!isNightMode)
  }

  return (
    <div className={`w-screen min-h-screen relative overflow-hidden transition-all duration-1000 ${
      isNightMode 
        ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900' 
        : 'bg-gradient-to-br from-white via-blue-50 to-indigo-100'
    }`}>
      <FixedHeader isNightMode={isNightMode} onToggleTheme={toggleTheme} />
      
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
            backgroundImage: 'url(/src/assets/images/buckingham/day.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Night Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isNightMode ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'url(/src/assets/images/buckingham/night.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          isNightMode ? 'bg-black/40' : 'bg-white/20'
        }`}></div>
        
        <div className="relative z-10 max-w-3xl">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight pl-4 text-left">
            Tourist Destination
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Concept
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-xl leading-relaxed pl-4 text-left">
            Revolutionary approaches to creating unforgettable tourist experiences through innovative design and sustainable practices.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pl-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              Explore Concepts
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Content Section - Below the fold */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Concept Cards Section */}
          <section className="py-32 min-h-screen flex items-center">
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${
              isNightMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
              <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🏛️</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${
                isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Cultural Heritage Integration</h3>
              <p className={`text-sm transition-colors duration-1000 ${
                isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Seamlessly blend modern amenities with historical significance to create authentic cultural experiences.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${
              isNightMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
              <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🌱</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${
                isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Sustainable Tourism</h3>
              <p className={`text-sm transition-colors duration-1000 ${
                isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Eco-friendly solutions that preserve natural beauty while maximizing visitor satisfaction and local benefits.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${
              isNightMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
              <div className="w-full h-48 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">📱</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${
                isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Digital Experience</h3>
              <p className={`text-sm transition-colors duration-1000 ${
                isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Interactive technologies and AR/VR solutions to enhance visitor engagement and create memorable moments.
              </p>
            </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-32 min-h-screen flex items-center">
            <div className="w-full">
              <div className={`backdrop-blur-md rounded-3xl p-8 border transition-all duration-1000 ${
            isNightMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/60 border-gray-200'
          }`}>
            <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-1000 ${
              isNightMode ? 'text-white' : 'text-gray-800'
            }`}>Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`transition-colors duration-1000 ${
                    isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Immersive cultural storytelling through interactive exhibits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`transition-colors duration-1000 ${
                    isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Sustainable infrastructure with minimal environmental impact</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`transition-colors duration-1000 ${
                    isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Smart navigation systems with multilingual support</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`transition-colors duration-1000 ${
                    isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Local community integration and economic benefits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`transition-colors duration-1000 ${
                    isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Accessibility features for all visitors</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className={`transition-colors duration-1000 ${
                    isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Data-driven insights for continuous improvement</p>
                </div>
              </div>
            </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-32 min-h-screen flex items-center">
            <div className="w-full text-center">
            <h2 className={`text-4xl font-bold mb-6 transition-colors duration-1000 ${
              isNightMode ? 'text-white' : 'text-gray-800'
            }`}>Ready to Transform Tourism?</h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-1000 ${
              isNightMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Let's work together to create extraordinary tourist destinations that inspire and delight visitors from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                Start Your Project
              </button>
              <button className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                isNightMode 
                  ? 'border-2 border-white text-white hover:bg-white hover:text-purple-900'
                  : 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white'
              }`}>
                View Portfolio
              </button>
            </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default TouristDestination
