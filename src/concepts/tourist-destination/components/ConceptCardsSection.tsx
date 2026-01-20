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
    <div className="w-full text-center">
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <p className={`text-sm font-semibold tracking-widest uppercase transition-colors duration-1000 ${
          isNightMode ? 'text-purple-200/90' : 'text-blue-700/80'
        }`}>
          Concepts
        </p>
        <h2 className={`mt-2 text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-1000 ${
          isNightMode ? 'text-white' : 'text-gray-900'
        }`}>
          Building unforgettable destinations
        </h2>
        <p className={`mt-3 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors duration-1000 ${
          isNightMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          A modular system of culture, sustainability, and digital-first experiences designed to scale across any site.
        </p>
      </div>

      <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {currentCards.map((card, index) => (
            <div 
              key={`${contentIndex}-${index}`}
              className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${
                isNightMode 
                  ? 'bg-white/10 border-white/15 hover:bg-white/15 hover:shadow-purple-500/10' 
                  : 'bg-white/70 border-gray-200/70 hover:bg-white/85 hover:shadow-gray-900/10'
              }`}
            >
              {/* Accent glow */}
              <div className={`pointer-events-none absolute -top-20 -right-24 h-44 w-44 rounded-full blur-3xl transition-opacity duration-300 ${
                isNightMode ? 'opacity-60' : 'opacity-40'
              } ${
                index === 0 ? 'bg-purple-500/30' :
                index === 1 ? 'bg-cyan-500/30' :
                'bg-emerald-500/30'
              }`} />

              <div className="flex flex-col items-center gap-4 text-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm ${
                  isNightMode ? 'bg-white/10 border-white/15' : 'bg-white border-gray-200/70'
                }`}>
                  <span className="text-2xl leading-none">{card.icon}</span>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${
                isNightMode ? 'text-white' : 'text-gray-800'
                  }`}>{card.title}</h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-1000 ${
                isNightMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConceptCardsSection
