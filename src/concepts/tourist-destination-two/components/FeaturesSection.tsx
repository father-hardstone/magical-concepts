import React from 'react'

interface FeaturesSectionProps {
  isNightMode: boolean
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isNightMode }) => {
  return (
    <section className="py-16 min-h-[70vh] flex items-center">
      <div className="w-full">
        <div className={`backdrop-blur-md rounded-3xl p-8 border transition-all duration-1000 ${isNightMode
            ? 'bg-white/5 border-white/10'
            : 'bg-white/60 border-gray-200'
          }`}>
          <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
            }`}>Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className={`transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>AI-driven personalized recommendations and itinerary planning</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className={`transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Real-time crowd management and dynamic pricing optimization</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className={`transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Advanced analytics for visitor behavior and satisfaction tracking</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className={`transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Blockchain-based loyalty programs and secure transactions</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className={`transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Virtual reality previews and augmented reality guided tours</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className={`transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Integration with smart city infrastructure and public transport</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
