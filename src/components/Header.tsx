import React from 'react'

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            Ibrahim's Gallery of Magical Concepts
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header