import React from 'react'

interface ConceptCardsSectionProps {
  isNightMode: boolean
}

const ConceptCardsSection: React.FC<ConceptCardsSectionProps> = ({ isNightMode }) => {
  return (
    <section className="py-16 min-h-[80vh] flex items-center">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${isNightMode
              ? 'bg-white/10 border-white/20 hover:bg-white/20'
              : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🚀</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Smart Tourism Technology</h3>
            <p className={`text-sm transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              AI-powered personalization and IoT integration to create seamless, intelligent visitor experiences.
            </p>
          </div>

          {/* Card 2 */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${isNightMode
              ? 'bg-white/10 border-white/20 hover:bg-white/20'
              : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
            <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🌍</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Global Connectivity</h3>
            <p className={`text-sm transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Multi-language support and cultural adaptation features that make destinations accessible worldwide.
            </p>
          </div>

          {/* Card 3 */}
          <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${isNightMode
              ? 'bg-white/10 border-white/20 hover:bg-white/20'
              : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
            <div className="w-full h-48 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">💎</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Premium Experiences</h3>
            <p className={`text-sm transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Luxury amenities and exclusive access points that elevate the tourist experience to new heights.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConceptCardsSection
