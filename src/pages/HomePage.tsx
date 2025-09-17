import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import '../App.css'

function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const title = "Ibrahim's Gallery of Magical Concepts"
  const words = title.split(' ')

  const getLetterStyle = (index: number) => {
    const isHovered = hoveredLetter === index
    const distance = hoveredLetter !== null ? Math.abs(index - hoveredLetter) : 10
    
    return {
      color: isHovered 
        ? '#ec4899' // pink-500
        : distance <= 2 
          ? `hsl(${280 + distance * 20}, 70%, ${60 + distance * 10}%)` // purple gradient
          : '#ffffff',
      textShadow: isHovered
        ? '0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 60px #ec4899'
        : distance <= 2
          ? `0 0 ${10 + distance * 5}px hsl(${280 + distance * 20}, 70%, 60%)`
          : 'none',
      transform: isHovered ? 'scale(1.2) translateY(-5px)' : 'scale(1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'inline-block',
      cursor: 'pointer'
    }
  }

  const handleLetterHover = (index: number) => {
    setHoveredLetter(index)
  }

  const handleLetterLeave = () => {
    setHoveredLetter(null)
  }

  const navigate = useNavigate()

  const handleMenuClick = (item: string) => {
    if (item === 'tourist-destination') {
      navigate('/concepts/tourist-destination')
    } else if (item === 'tourist-destination-two') {
      navigate('/concepts/tourist-destination-two')
    } else if (item === 'celestial-sky-complication') {
      navigate('/concepts/celestial-sky-complication')
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      <Header />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Random Glowy Elements */}
        <div className="absolute top-1/6 right-1/3 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute top-2/3 left-1/6 w-48 h-48 bg-pink-400/8 rounded-full blur-2xl animate-pulse delay-4000"></div>
        <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-purple-400/6 rounded-full blur-2xl animate-pulse delay-5000"></div>
        <div className="absolute top-1/3 right-1/2 w-56 h-56 bg-blue-400/7 rounded-full blur-2xl animate-pulse delay-6000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-indigo-400/5 rounded-full blur-2xl animate-pulse delay-7000"></div>
        <div className="absolute top-1/2 left-1/5 w-44 h-44 bg-rose-400/6 rounded-full blur-2xl animate-pulse delay-8000"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 break-normal">
            {words.map((word, wordIndex) => {
              const wordStartIndex = title.split('').findIndex((_, i) => 
                title.substring(i, i + word.length) === word
              )
              return (
                <span key={wordIndex} className="inline-block">
                  {word.split('').map((letter, letterIndex) => {
                    const globalIndex = wordStartIndex + letterIndex
                    return (
                      <span
                        key={globalIndex}
                        style={getLetterStyle(globalIndex)}
                        onMouseEnter={() => handleLetterHover(globalIndex)}
                        onMouseLeave={handleLetterLeave}
                        className="inline-block"
                      >
                        {letter}
                      </span>
                    )
                  })}
                  {wordIndex < words.length - 1 && <span className="inline-block w-4"></span>}
                </span>
              )
            })}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where creativity meets technology. Exploring the infinite possibilities of digital art and innovation.
          </p>

          {/* Explore Menu */}
          <div className="mb-12">
            <ExploreMenu onItemClick={handleMenuClick} />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-5 h-5 bg-cyan-400 rounded-full animate-bounce delay-500"></div>
        </div>
      </main>

      {/* Mouse Follower Effect */}
      <div 
        className="fixed pointer-events-none z-50 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-sm"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transition: 'none'
        }}
      ></div>
    </div>
  )
}

export default HomePage
