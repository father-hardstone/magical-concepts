import React from 'react'

interface FeaturesSectionProps {
  isNightMode: boolean
  contentIndex?: number
  isTransitioning?: boolean
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ 
  isNightMode, 
  contentIndex = 0, 
  isTransitioning = false 
}) => {
  // Different feature sets for content cycling
  const featureSets = [
    // Set 1: Core Features
    {
      title: 'Key Features',
      features: [
        'Immersive cultural storytelling through interactive exhibits',
        'Sustainable infrastructure with minimal environmental impact',
        'Smart navigation systems with multilingual support',
        'Local community integration and economic benefits',
        'Accessibility features for all visitors',
        'Data-driven insights for continuous improvement'
      ]
    },
    // Set 2: Advanced Features
    {
      title: 'Advanced Capabilities',
      features: [
        'AI-powered personalized recommendations and itinerary planning',
        'Real-time crowd management and dynamic pricing optimization',
        'Advanced analytics for visitor behavior and satisfaction tracking',
        'Blockchain-based loyalty programs and secure transactions',
        'Virtual reality previews and augmented reality guided tours',
        'Integration with smart city infrastructure and public transport'
      ]
    }
  ]

  const currentFeatures = featureSets[contentIndex] || featureSets[0]

  return (
    <div className="w-full">
      <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className={`backdrop-blur-md rounded-3xl p-8 border transition-all duration-1000 ${
          isNightMode 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/60 border-gray-200'
        }`}>
          <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-1000 ${
            isNightMode ? 'text-white' : 'text-gray-800'
          }`}>{currentFeatures.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentFeatures.features.map((feature, index) => (
              <div key={`${contentIndex}-${index}`} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  index < 3 ? 'bg-purple-500' : 'bg-pink-500'
                }`}>
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className={`transition-colors duration-1000 ${
                  isNightMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
