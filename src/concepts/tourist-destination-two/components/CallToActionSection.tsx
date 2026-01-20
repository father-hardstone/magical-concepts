import React from 'react'

interface CallToActionSectionProps {
  isNightMode: boolean
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ isNightMode }) => {
  return (
    <section className="min-h-[55vh] flex items-center">
      <div className={`w-full overflow-hidden rounded-3xl border backdrop-blur-md px-6 py-12 sm:px-10 sm:py-16 text-center relative ${
        isNightMode ? 'bg-white/5 border-white/10' : 'bg-white/65 border-gray-200/70'
      }`}>
        <div className={`pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${
          isNightMode ? 'bg-pink-500/10' : 'bg-purple-500/10'
        }`} />

        <h2 className={`relative text-3xl sm:text-4xl font-bold mb-4 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-900'
          }`}>
          Ready to Revolutionize Tourism?
        </h2>
        <p className={`relative text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          Let’s collaborate to build the future of tourism with concepts that set new standards for visitor experience—without compromising clarity, performance, or accessibility.
        </p>
        <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-7 py-3 rounded-full text-base font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.03] shadow-lg hover:shadow-purple-500/25">
            Start Your Project
          </button>
          <button className={`px-7 py-3 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-[1.03] ${isNightMode
              ? 'border-2 border-white/80 text-white hover:bg-white hover:text-purple-900'
              : 'border-2 border-gray-700/70 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900'
            }`}>
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
