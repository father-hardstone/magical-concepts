import React from 'react'

interface ConceptCardsSectionProps {
  isNightMode: boolean
  contentIndex?: number
  isTransitioning?: boolean
}

const ConceptCardsSection: React.FC<ConceptCardsSectionProps> = ({ 
  isNightMode, 
  contentIndex = 0, 
  isTransitioning = false 
}) => {
  // Different card sets for content cycling
  const cardSets = [
    // Set 1: Cultural Heritage
    [
      { icon: '🏛️', title: 'Cultural Heritage Integration', description: 'Seamlessly blend modern amenities with historical significance to create authentic cultural experiences.' },
      { icon: '🌱', title: 'Sustainable Tourism', description: 'Eco-friendly solutions that preserve natural beauty while maximizing visitor satisfaction and local benefits.' },
      { icon: '📱', title: 'Digital Experience', description: 'Interactive technologies and AR/VR solutions to enhance visitor engagement and create memorable moments.' }
    ],
    // Set 2: Technology Focus
    [
      { icon: '🤖', title: 'AI-Powered Guidance', description: 'Smart assistants that provide personalized recommendations and real-time information to enhance visitor experiences.' },
      { icon: '🌐', title: 'Global Connectivity', description: 'Multi-language support and cultural adaptation features that make destinations accessible worldwide.' },
      { icon: '💎', title: 'Premium Experiences', description: 'Luxury amenities and exclusive access points that elevate the tourist experience to new heights.' }
    ],
    // Set 3: Community Focus
    [
      { icon: '👥', title: 'Community Integration', description: 'Local community involvement and economic benefits that create sustainable tourism ecosystems.' },
      { icon: '♿', title: 'Accessibility Features', description: 'Inclusive design and accessibility features that ensure all visitors can enjoy the destination.' },
      { icon: '📊', title: 'Data-Driven Insights', description: 'Analytics and insights for continuous improvement and personalized visitor experiences.' }
    ]
  ]

  const currentCards = cardSets[contentIndex] || cardSets[0]

  return (
    <div className="w-full">
      <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCards.map((card, index) => (
            <div 
              key={`${contentIndex}-${index}`}
              className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${
                isNightMode 
                  ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                  : 'bg-white/80 border-gray-200 hover:bg-white/90'
              }`}
            >
              <div className={`w-full h-48 rounded-lg mb-4 flex items-center justify-center ${
                index === 0 ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                index === 1 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                'bg-gradient-to-br from-green-500 to-teal-500'
              }`}>
                <span className="text-white text-2xl font-bold">{card.icon}</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${
                isNightMode ? 'text-white' : 'text-gray-800'
              }`}>{card.title}</h3>
              <p className={`text-sm transition-colors duration-1000 ${
                isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConceptCardsSection
