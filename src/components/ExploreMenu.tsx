import React, { useState } from 'react'

interface ExploreMenuProps {
  onItemClick: (item: string) => void
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({ onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'tourist-destination', label: 'Tourist Destination Concept', available: true },
    { id: 'tourist-destination-two', label: 'Tourist Destination Concept Two', available: true },
    { id: 'celestial-sky-complication', label: 'Celestial Sky Complication', available: true },
    { id: 'urban-planning', label: 'Urban Planning Solutions', available: false },
    { id: 'sustainable-living', label: 'Sustainable Living Spaces', available: false },
    { id: 'smart-cities', label: 'Smart Cities Initiative', available: false },
    { id: 'cultural-heritage', label: 'Cultural Heritage Projects', available: false },
    { id: 'eco-tourism', label: 'Eco-Tourism Development', available: false }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item: { id: string; label: string; available: boolean }) => {
    if (item.available) {
      onItemClick(item.id)
    }
  }

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={toggleMenu}
        className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 overflow-hidden"
      >
        <span className="relative z-10 flex items-center space-x-2">
          <span>Explore Catalogue</span>
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl transition-all duration-500 ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={!item.available}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                item.available
                  ? 'text-white hover:bg-white/10 hover:text-purple-300 cursor-pointer'
                  : 'text-gray-500 cursor-not-allowed opacity-50'
              } ${
                isOpen 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-4 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.label}</span>
                {item.available ? (
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <span className="text-xs text-gray-500">Coming Soon</span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Mechanical accent lines */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
      </div>
    </div>
  )
}

export default ExploreMenu
