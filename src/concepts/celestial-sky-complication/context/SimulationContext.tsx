import React, { createContext, useContext, useRef } from 'react'

interface SimulationContextType {
  isPaused: React.MutableRefObject<boolean>
  speed: React.MutableRefObject<number>
  currentTime: React.MutableRefObject<Date>
  simulationTime: React.MutableRefObject<Date>
  skyDiskRotation: React.MutableRefObject<number>
  resetTrigger: React.MutableRefObject<number>
  pauseSimulation: () => void
  continueSimulation: () => void
  increaseSpeed: () => void
  decreaseSpeed: () => void
  resetSimulation: () => void
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined)

export const useSimulation = () => {
  const context = useContext(SimulationContext)
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider')
  }
  return context
}

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isPaused = useRef(false) // Only pause state - animation runs by default
  const speed = useRef(1) // 1x = 1 second
  const currentTime = useRef(new Date())
  const simulationTime = useRef(new Date()) // Always has a value, starts at current time
  const skyDiskRotation = useRef(0)
  const resetTrigger = useRef(0)

  const pauseSimulation = () => {
    isPaused.current = true
  }

  const continueSimulation = () => {
    isPaused.current = false
  }

  const resetSimulation = () => {
    isPaused.current = false // Continue after reset
    speed.current = 1 // Reset speed to 1x
    currentTime.current = new Date()
    simulationTime.current = new Date() // Reset to current time
    skyDiskRotation.current = 0 // Reset rotation
    resetTrigger.current += 1 // Increment trigger to notify components
  }

  const increaseSpeed = () => {
    if (speed.current < 10) {
      speed.current += 1
    }
  }

  const decreaseSpeed = () => {
    if (speed.current > 1) {
      speed.current -= 1
    }
  }

  const value: SimulationContextType = {
    isPaused,
    speed,
    currentTime,
    simulationTime,
    skyDiskRotation,
    resetTrigger,
    pauseSimulation,
    continueSimulation,
    increaseSpeed,
    decreaseSpeed,
    resetSimulation
  }

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  )
}
