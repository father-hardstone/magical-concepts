import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useSimulation } from '../context/SimulationContext'
import { getSpeedDescription, getCurrentSimulationTime } from '../utils/timeSimulation'

const SimulationControls: React.FC = () => {
  const {
    isPaused,
    speed,
    currentTime,
    simulationTime,
    pauseSimulation,
    continueSimulation,
    increaseSpeed,
    decreaseSpeed,
    resetSimulation
  } = useSimulation()

  // Local state for UI updates
  const [isPausedState, setIsPausedState] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(1)
  const [displayTime, setDisplayTime] = useState<Date>(new Date())

  // Update local state when refs change
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPausedState(isPaused.current)
      setCurrentSpeed(speed.current)
      
      // Get current simulation time - always use simulation time since it's always available
      const now = getCurrentSimulationTime({
        speed: speed.current,
        isSimulating: !isPaused.current, // Running if not paused
        isPaused: isPaused.current,
        currentTime: currentTime.current,
        simulationTime: simulationTime.current
      })
      
      setDisplayTime(now)
    }, 100)

    return () => clearInterval(interval)
  }, [])


  const getButtonText = () => {
    if (isPausedState) return 'Continue'
    return 'Pause'
  }

  const handlePauseContinue = () => {
    if (isPausedState) {
      continueSimulation()
    } else {
      pauseSimulation()
    }
  }

  const handleReset = () => {
    resetSimulation()
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="absolute 
      top-[80vh] sm:top-[92vh] md:top-[65vh] lg:top-[68vh] xl:top-[95vh] 2xl:top-[95vh] 
      left-0 right-0 sm:left-auto sm:right-2 md:right-4 z-50 px-2 sm:px-0">
      <div className="bg-black/90 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-4 border border-white/30 
        w-full sm:min-w-[280px] sm:max-w-[90vw] shadow-2xl">
        <h3 className="text-white text-xs sm:text-lg font-semibold mb-1 sm:mb-4">Simulation Controls</h3>
        
        {/* Mobile Time Display */}
        <div className="block sm:hidden mb-3 p-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded border border-blue-500/40">
          <div className="text-center">
            <div className="text-white font-mono text-lg font-bold mb-1">
              {formatTime(displayTime)}
            </div>
            <div className="text-gray-300 text-xs mb-1">
              {formatDate(displayTime)}
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isPausedState ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
              <span className="text-gray-300 text-xs">
                {isPausedState ? 'Paused' : 'Running'} • {currentSpeed}x
              </span>
            </div>
            <div className="text-gray-400 text-xs">
              <div>Location: Lahore</div>
              <div>UTC Offset: {displayTime.getTimezoneOffset() / -60}h</div>
            </div>
          </div>
        </div>
        
        {/* Main Control Buttons */}
        <div className="grid grid-cols-3 sm:flex sm:flex-row gap-1 sm:gap-2 mb-2 sm:mb-3">
          <Button
            type="primary"
            onClick={handlePauseContinue}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
              border-0 flex-1 text-xs sm:text-sm font-medium h-7 sm:h-8 
              shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
          >
            {getButtonText()}
          </Button>
          
          <Button
            onClick={handleReset}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
              border-0 text-white flex-1 text-xs sm:text-sm font-medium h-7 sm:h-8
              shadow-lg hover:shadow-red-500/25 transition-all duration-200"
          >
            Reset
          </Button>
        </div>

        {/* Speed Controls */}
        <div className="flex flex-row sm:flex-row items-center justify-between sm:justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <Button
            onClick={decreaseSpeed}
            disabled={currentSpeed <= 1}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
              border-0 text-white text-xs sm:text-sm font-medium h-6 sm:h-8 w-12 sm:w-auto
              shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            title="Decrease Speed"
          >
            <span className="hidden sm:inline">Decrease Speed</span>
            <span className="sm:hidden">-</span>
          </Button>
          
          <div className="flex-1 sm:flex-none">
            <span className="text-white font-bold text-sm sm:text-sm text-center block">
              {currentSpeed}x
            </span>
            <span className="text-gray-300 text-xs text-center block sm:hidden">Speed</span>
          </div>
          
          <Button
            onClick={increaseSpeed}
            disabled={currentSpeed >= 9}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 
              border-0 text-white text-xs sm:text-sm font-medium h-6 sm:h-8 w-12 sm:w-auto
              shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
            title="Increase Speed"
          >
            <span className="hidden sm:inline">Increase Speed</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>

        {/* Current Speed Conversion */}
        <div className="p-1 sm:p-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded border border-blue-500/40 mb-2">
          <div className="text-blue-200 text-center text-xs sm:text-sm">
            <div className="font-bold text-sm sm:text-sm">{currentSpeed}x Speed</div>
            <div className="text-xs sm:text-xs opacity-80">{getSpeedDescription(currentSpeed)}</div>
          </div>
        </div>

        {/* Status */}
        <div className="text-xs sm:text-sm text-gray-200 text-center font-medium">
          <span className="inline-flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isPausedState ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
            {isPausedState ? 'Paused' : 'Running'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SimulationControls
