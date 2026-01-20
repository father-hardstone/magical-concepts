import React from 'react'

interface ConceptCardsSectionProps {
  isNightMode: boolean
}

const ConceptCardsSection: React.FC<ConceptCardsSectionProps> = ({ isNightMode }) => {
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
          Next‑gen tourism experiences
        </h2>
        <p className={`mt-3 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors duration-1000 ${
          isNightMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          A refined system of technology, connectivity, and premium touches—built to feel seamless end‑to‑end.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${isNightMode
            ? 'bg-white/10 border-white/15 hover:bg-white/15 hover:shadow-purple-500/10'
            : 'bg-white/70 border-gray-200/70 hover:bg-white/85 hover:shadow-gray-900/10'
          }`}>
            <div className={`pointer-events-none absolute -top-20 -right-24 h-44 w-44 rounded-full blur-3xl transition-opacity duration-300 ${
              isNightMode ? 'opacity-60 bg-purple-500/30' : 'opacity-40 bg-purple-500/30'
            }`} />

            <div className="flex flex-col items-center gap-4 text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm ${
                isNightMode ? 'bg-white/10 border-white/15' : 'bg-white border-gray-200/70'
              }`}>
                <span className="text-2xl leading-none">🚀</span>
              </div>
              <div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Smart Tourism Technology</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              AI-powered personalization and IoT integration to create seamless, intelligent visitor experiences.
            </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${isNightMode
            ? 'bg-white/10 border-white/15 hover:bg-white/15 hover:shadow-cyan-500/10'
            : 'bg-white/70 border-gray-200/70 hover:bg-white/85 hover:shadow-gray-900/10'
          }`}>
            <div className={`pointer-events-none absolute -top-20 -right-24 h-44 w-44 rounded-full blur-3xl transition-opacity duration-300 ${
              isNightMode ? 'opacity-60 bg-cyan-500/30' : 'opacity-40 bg-cyan-500/30'
            }`} />

            <div className="flex flex-col items-center gap-4 text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm ${
                isNightMode ? 'bg-white/10 border-white/15' : 'bg-white border-gray-200/70'
              }`}>
                <span className="text-2xl leading-none">🌍</span>
              </div>
              <div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Global Connectivity</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Multi-language support and cultural adaptation features that make destinations accessible worldwide.
            </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${isNightMode
            ? 'bg-white/10 border-white/15 hover:bg-white/15 hover:shadow-emerald-500/10'
            : 'bg-white/70 border-gray-200/70 hover:bg-white/85 hover:shadow-gray-900/10'
          }`}>
            <div className={`pointer-events-none absolute -top-20 -right-24 h-44 w-44 rounded-full blur-3xl transition-opacity duration-300 ${
              isNightMode ? 'opacity-60 bg-emerald-500/30' : 'opacity-40 bg-emerald-500/30'
            }`} />

            <div className="flex flex-col items-center gap-4 text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm ${
                isNightMode ? 'bg-white/10 border-white/15' : 'bg-white border-gray-200/70'
              }`}>
                <span className="text-2xl leading-none">💎</span>
              </div>
              <div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
              }`}>Premium Experiences</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Luxury amenities and exclusive access points that elevate the tourist experience to new heights.
            </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ConceptCardsSection
