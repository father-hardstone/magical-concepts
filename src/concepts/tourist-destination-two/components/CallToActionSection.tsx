import React from 'react'

interface CallToActionSectionProps {
  isNightMode: boolean
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ isNightMode }) => {
  return (
    <section className="py-16 min-h-[60vh] flex items-center">
      <div className="w-full text-center">
        <h2 className={`text-4xl font-bold mb-6 transition-colors duration-1000 ${isNightMode ? 'text-white' : 'text-gray-800'
          }`}>Ready to Revolutionize Tourism?</h2>
        <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-1000 ${isNightMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          Let's collaborate to build the future of tourism with innovative concepts that set new standards for visitor experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
            Start Your Project
          </button>
          <button className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${isNightMode
              ? 'border-2 border-white text-white hover:bg-white hover:text-purple-900'
              : 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white'
            }`}>
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
