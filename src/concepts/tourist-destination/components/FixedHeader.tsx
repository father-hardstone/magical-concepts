import React from 'react'
import { useNavigate } from 'react-router-dom'

interface FixedHeaderProps {
  isNightMode: boolean
  onToggleTheme: () => void
}

const FixedHeader: React.FC<FixedHeaderProps> = ({ isNightMode, onToggleTheme }) => {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Back Button - Top Left */}
          <button 
            onClick={() => navigate('/')}
            className="text-white hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
          
          {/* Center Logo */}
          <div className="text-2xl font-bold text-white">
            Ibrahim's Gallery
          </div>
          
          {/* Theme Toggle Button - Top Right */}
          <button
            onClick={onToggleTheme}
            className="relative w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center group"
            title={isNightMode ? 'Switch to Day' : 'Switch to Night'}
          >
            {/* Sun Icon */}
            <div className={`absolute transition-all duration-500 ${isNightMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
              </svg>
            </div>
            
            {/* Moon Icon */}
            <div className={`absolute transition-all duration-500 ${isNightMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}>
              <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 9 9 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-.194.81-.296 1.5-.296 2.46a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75c0-1.5.5-2.5.5-3.5a9 9 0 01-9-9 9 9 0 014.5-7.5.75.75 0 01.528.218z"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default FixedHeader
