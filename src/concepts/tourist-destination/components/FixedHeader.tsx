import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SunFilled, MoonFilled } from '@ant-design/icons'
import { Button } from 'antd'

interface FixedHeaderProps {
  isNightMode: boolean
  onToggleTheme: () => void
  onNextBackground?: () => void
}

const FixedHeader: React.FC<FixedHeaderProps> = ({ isNightMode, onToggleTheme, onNextBackground }) => {
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
          
          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3">
            {/* Next Background Button */}
            {onNextBackground && (
              <button
                onClick={onNextBackground}
                className="relative w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 flex items-center justify-center group"
                title="Next Background"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
            
            {/* Theme Toggle Button */}
          <Button
            onClick={onToggleTheme}
            type="text"
            shape="circle"
            size="large"
            className="!w-12 !h-12 !bg-white/10 hover:!bg-white/20 !border-white/20 !backdrop-blur-sm !transition-all !duration-300"
            title={isNightMode ? 'Switch to Day' : 'Switch to Night'}
            icon={
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Sun Icon */}
                <div className={`absolute transition-all duration-500 ${isNightMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
                  <SunFilled className="text-yellow-400" style={{ fontSize: '20px' }} />
                </div>
                
                {/* Moon Icon */}
                <div className={`absolute transition-all duration-500 ${isNightMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}>
                  <MoonFilled className="text-blue-300" style={{ fontSize: '20px' }} />
                </div>
              </div>
            }
          />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default FixedHeader
