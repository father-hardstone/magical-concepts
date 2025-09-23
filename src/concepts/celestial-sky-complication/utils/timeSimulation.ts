// Time simulation utilities for celestial sky complication
// This provides reusable rotation and time calculation logic

export interface TimeSimulationConfig {
  speed: number
  isSimulating: boolean
  isPaused: boolean
  currentTime: Date
  simulationTime: Date
}

export interface RotationConfig {
  currentRotation: number
  lastUpdateTime: number
}

// Speed multiplier mapping for time simulation
export const getSpeedMultiplier = (speedValue: number): number => {
  const speedMap: { [key: number]: number } = {
    1: 1,      // 1x: 1sec = 1 sec
    2: 30,     // 2x: 1sec = 30 sec
    3: 60,     // 3x: 1sec = 1 min
    4: 300,    // 4x: 1sec = 5 min
    5: 600,    // 5x: 1sec = 10 min
    6: 1800,   // 6x: 1sec = 30 min
    7: 3600,   // 7x: 1sec = 1 hour
    8: 7200,   // 8x: 1sec = 2 hours
    9: 21600   // 9x: 1sec = 6 hours
  }
  return speedMap[speedValue] || 1
}

// Get speed description for UI display
export const getSpeedDescription = (speedValue: number): string => {
  const multiplier = getSpeedMultiplier(speedValue)
  if (multiplier < 60) {
    return `${multiplier} second${multiplier !== 1 ? 's' : ''}`
  } else if (multiplier < 3600) {
    const minutes = Math.floor(multiplier / 60)
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  } else {
    const hours = Math.floor(multiplier / 3600)
    return `${hours} hour${hours !== 1 ? 's' : ''}`
  }
}

// Calculate rotation increment for smooth continuous rotation
export const calculateRotationIncrement = (
  deltaTime: number,
  speedMultiplier: number,
  baseRotationSpeed: number = 360 / (24 * 60 * 60 * 1000) // degrees per millisecond for 24-hour cycle
): number => {
  return deltaTime * baseRotationSpeed * speedMultiplier
}

// Calculate rotation from time (for stopped/paused state)
export const calculateRotationFromTime = (time: Date): number => {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  
  const totalMinutes = hours * 60 + minutes + seconds / 60
  let baseRotation
  
  if (hours >= 12) {
    // Afternoon/Evening: 12:00 PM to 11:59 PM
    baseRotation = ((totalMinutes - 12 * 60) / (12 * 60)) * 180
  } else {
    // Morning: 12:00 AM to 11:59 AM
    baseRotation = 180 + ((totalMinutes) / (12 * 60)) * 180
  }
  
  return baseRotation
}

// Update simulation time based on speed multiplier
export const updateSimulationTime = (
  config: TimeSimulationConfig,
  deltaTime: number
): Date => {
  if (config.isPaused) {
    return config.simulationTime
  }

  const speedMultiplier = getSpeedMultiplier(config.speed)
  const now = new Date()
  
  const timeDiff = now.getTime() - config.currentTime.getTime()
  const simulationDiff = timeDiff * speedMultiplier
  return new Date(config.simulationTime.getTime() + simulationDiff)
}

// Calculate rotation for any component using time simulation
export const calculateComponentRotation = (
  config: TimeSimulationConfig,
  rotationConfig: RotationConfig,
  deltaTime: number,
  customRotationSpeed?: number
): number => {
  if (!config.isPaused) {
    // Running: increment rotation based on speed
    const speedMultiplier = getSpeedMultiplier(config.speed)
    const rotationSpeed = customRotationSpeed || (360 / (24 * 60 * 60 * 1000))
    const rotationIncrement = calculateRotationIncrement(deltaTime, speedMultiplier, rotationSpeed)
    
    return rotationConfig.currentRotation + rotationIncrement
  } else {
    // Paused: set rotation based on current simulation time
    return calculateRotationFromTime(config.simulationTime)
  }
}

// Get current time for simulation (real time or simulation time)
export const getCurrentSimulationTime = (config: TimeSimulationConfig): Date => {
  if (config.isPaused) {
    return config.simulationTime
  } else {
    return config.simulationTime
  }
}
