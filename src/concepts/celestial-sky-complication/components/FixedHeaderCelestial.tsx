import React from 'react'

const FixedHeaderCelestial: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-white font-semibold">
            Celestial Sky Complication
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="text-white hover:text-purple-300 transition-colors duration-300 flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Gallery</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default FixedHeaderCelestial