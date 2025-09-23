import React, { useState, useEffect } from 'react'
import { useSimulation } from '../context/SimulationContext'
import { getCurrentSimulationTime } from '../utils/timeSimulation'

const SimulationTimePanel: React.FC = () => {
  const { isPaused, speed, currentTime, simulationTime } = useSimulation()
  const [displayTime, setDisplayTime] = useState<Date>(new Date())
  const [isPausedState, setIsPausedState] = useState(false)
  const [currentSpeed, setCurrentSpeed] = useState(1)

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (): string => {
    if (isPausedState) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getStatusText = (): string => {
    if (isPausedState) return 'Paused'
    return 'Running'
  }

  return (
    <div className="hidden sm:block absolute md:top-[69vh] lg:top-[70vh] xl:top-[98vh] left-2 sm:left-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 sm:p-4 border border-white/20 min-w-[200px] sm:min-w-[280px] max-w-[90vw]">
        <h3 className="text-white text-sm sm:text-lg font-semibold mb-2 sm:mb-4">Simulation Time</h3>
        
        {/* Current Time Display */}
        <div className="mb-2 sm:mb-4">
          <div className="text-lg sm:text-2xl font-mono text-white mb-1">
            {formatTime(displayTime)}
          </div>
          <div className="text-xs sm:text-sm text-gray-300">
            {formatDate(displayTime)}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor().replace('text-', 'bg-')}`}></div>
            <span className={`text-xs sm:text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          <span className="text-gray-400 text-xs sm:text-sm">
            ({currentSpeed}x speed)
          </span>
        </div>

        {/* Time Zone Info */}
        <div className="text-xs text-gray-400">
          <div>Location: New York City</div>
          <div>UTC Offset: {displayTime.getTimezoneOffset() / -60}h</div>
        </div>
      </div>
    </div>
  )
}

export default SimulationTimePanel
