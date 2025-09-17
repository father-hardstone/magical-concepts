import React from 'react'

interface Project {
  id: number
  title: string
  description: string
  image: string
  gradient: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

const Portfolio: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A modern, responsive e-commerce solution with advanced features, payment integration, and seamless user experience.",
      image: "project-1",
      gradient: "from-purple-500 to-pink-500",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Cross-platform mobile application with real-time features, push notifications, and intuitive design.",
      image: "project-2",
      gradient: "from-blue-500 to-cyan-500",
      technologies: ["React Native", "Firebase", "TypeScript", "Redux"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Web Dashboard",
      description: "Analytics dashboard with interactive charts, real-time data visualization, and comprehensive reporting.",
      image: "project-3",
      gradient: "from-green-500 to-teal-500",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "SaaS Platform",
      description: "Complete software-as-a-service solution with user management, subscription billing, and API integration.",
      image: "project-4",
      gradient: "from-orange-500 to-red-500",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "AI Chatbot",
      description: "Intelligent chatbot with natural language processing, machine learning, and multi-platform integration.",
      image: "project-5",
      gradient: "from-indigo-500 to-purple-500",
      technologies: ["Python", "TensorFlow", "OpenAI", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Blockchain App",
      description: "Decentralized application with smart contracts, cryptocurrency integration, and secure transactions.",
      image: "project-6",
      gradient: "from-yellow-500 to-orange-500",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ]

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'React': 'bg-blue-500/20 text-blue-300',
      'Node.js': 'bg-green-500/20 text-green-300',
      'MongoDB': 'bg-emerald-500/20 text-emerald-300',
      'Stripe': 'bg-purple-500/20 text-purple-300',
      'React Native': 'bg-cyan-500/20 text-cyan-300',
      'Firebase': 'bg-orange-500/20 text-orange-300',
      'TypeScript': 'bg-blue-600/20 text-blue-300',
      'Redux': 'bg-purple-600/20 text-purple-300',
      'Vue.js': 'bg-green-600/20 text-green-300',
      'D3.js': 'bg-orange-600/20 text-orange-300',
      'Python': 'bg-yellow-500/20 text-yellow-300',
      'PostgreSQL': 'bg-blue-700/20 text-blue-300',
      'Next.js': 'bg-gray-500/20 text-gray-300',
      'Prisma': 'bg-indigo-500/20 text-indigo-300',
      'Solidity': 'bg-gray-600/20 text-gray-300',
      'Web3.js': 'bg-orange-500/20 text-orange-300',
      'Ethereum': 'bg-blue-500/20 text-blue-300',
      'TensorFlow': 'bg-orange-500/20 text-orange-300',
      'OpenAI': 'bg-green-500/20 text-green-300',
      'FastAPI': 'bg-red-500/20 text-red-300'
    }
    return colors[tech] || 'bg-gray-500/20 text-gray-300'
  }

  return (
    <section id="portfolio" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work, featuring innovative solutions and cutting-edge technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
            >
              {/* Project Image */}
              <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-white text-2xl font-bold">
                  {project.title.split(' ')[0]}
                </span>
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-colors">
                  Live Demo
                </button>
                <button className="flex-1 border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                  GitHub
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
