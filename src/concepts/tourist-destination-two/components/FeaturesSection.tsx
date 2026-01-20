import React from 'react'

interface FeaturesSectionProps {
  isNightMode: boolean
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isNightMode }) => {
  return (
    <div className="w-full">
      <div className={`relative overflow-hidden backdrop-blur-md rounded-3xl p-7 sm:p-10 border transition-all duration-1000 ${isNightMode
        ? 'bg-white/5 border-white/10'
        : 'bg-white/60 border-gray-200'
      }`}>
        <div className={`pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl ${
          isNightMode ? 'bg-purple-500/10' : 'bg-blue-500/10'
        }`} />

        <h2 className={`relative text-3xl sm:text-4xl font-bold text-center mb-8 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
          }`}>Advanced Features</h2>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[
            { tone: 'purple', text: 'AI-driven personalized recommendations and itinerary planning' },
            { tone: 'purple', text: 'Real-time crowd management and dynamic pricing optimization' },
            { tone: 'purple', text: 'Advanced analytics for visitor behavior and satisfaction tracking' },
            { tone: 'pink', text: 'Blockchain-based loyalty programs and secure transactions' },
            { tone: 'pink', text: 'Virtual reality previews and augmented reality guided tours' },
            { tone: 'pink', text: 'Integration with smart city infrastructure and public transport' },
          ].map((item, index) => (
            <div key={index} className={`flex items-start gap-4 rounded-2xl p-4 border transition-colors duration-300 ${
              isNightMode ? 'border-white/10 bg-white/5' : 'border-gray-200/70 bg-white/50'
            }`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                item.tone === 'purple'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-500'
              }`}>
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <p className={`pt-1 transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
