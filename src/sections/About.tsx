import React from 'react'

const About: React.FC = () => {
  const skills = [
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces"
    },
    {
      icon: "💻",
      title: "Frontend Development",
      description: "Modern web applications with React & Vue"
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Cross-platform mobile solutions"
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description: "Lightning-fast and optimized applications"
    },
    {
      icon: "🔧",
      title: "Backend Development",
      description: "Scalable server-side solutions"
    },
    {
      icon: "☁️",
      title: "Cloud & DevOps",
      description: "Deployment and infrastructure management"
    }
  ]

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "5+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ]

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - About Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I'm a passionate developer and designer who loves creating magical digital experiences. 
              With over 5 years of experience in web and mobile development, I specialize in turning 
              complex ideas into beautiful, functional applications.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              My goal is to help businesses and individuals bring their visions to life through 
              innovative technology and creative design solutions. I believe in the power of 
              clean code, user-centered design, and continuous learning.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
              Download Resume
            </button>
          </div>

          {/* Right Column - Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-white font-semibold mb-2 text-sm">
                  {skill.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-300">
              Quick turnaround times without compromising on quality
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
            <p className="text-gray-300">
              Always exploring new technologies and creative solutions
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Collaboration</h3>
            <p className="text-gray-300">
              Working closely with clients to achieve their goals
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
