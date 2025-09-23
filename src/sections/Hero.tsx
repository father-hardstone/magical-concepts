import React from 'react'

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile/Tablet Layout (md and below) */}
        <div className="md:hidden">
          {/* Top Half - Image/Visual */}
          <div className="h-[50vh] mb-8 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Visual Magic</h2>
              </div>
            </div>
          </div>

          {/* Bottom Half - Content */}
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-white mb-4">
              Magical
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Concepts
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Where creativity meets technology. Crafting extraordinary digital experiences 
              that bring your wildest ideas to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 justify-center mb-8">
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-white text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">50+</div>
                <div className="text-sm text-gray-300">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400 mb-1">5+</div>
                <div className="text-sm text-gray-300">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
                <div className="text-sm text-gray-300">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (lg and above) */}
        <div className="hidden md:block text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Magical
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Concepts
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Where creativity meets technology. Crafting extraordinary digital experiences 
            that bring your wildest ideas to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
