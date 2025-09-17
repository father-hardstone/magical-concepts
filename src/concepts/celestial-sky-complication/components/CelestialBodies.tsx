import React, { useState, useEffect, useRef } from 'react'
import * as SunCalc from 'suncalc'
import { gsap } from 'gsap'

interface CelestialBodiesProps {
  isNightMode: boolean
  onTimeUpdate?: (currentTime: Date, isSimulating: boolean, simulationSpeed: number) => void
  onControlsUpdate?: (controls: {
    isSimulating: boolean
    simulationSpeed: number
    simulationTime: Date | null
    startSimulation: () => void
    pauseSimulation: () => void
    stopSimulation: () => void
    speedUp: () => void
    slowDown: () => void
  }) => void
}

const CelestialBodies: React.FC<CelestialBodiesProps> = ({ isNightMode, onTimeUpdate, onControlsUpdate }) => {
  const [sunPosition, setSunPosition] = useState({ azimuth: 0, altitude: 0 })
  const [moonPosition, setMoonPosition] = useState({ azimuth: 0, altitude: 0 })
  const [simulationTime, setSimulationTime] = useState<Date | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [lastTime, setLastTime] = useState(Date.now())
  const [isResetting, setIsResetting] = useState(false)

  const sunRef = useRef<HTMLImageElement>(null)
  const moonRef = useRef<HTMLImageElement>(null)

  // --- smoothing helper ---
  const smoothValue = (prev: number, next: number, factor = 0.05) => {
    // Only smooth when simulating, use direct values when paused
    if (!isSimulating) {
      return next
    }
    return prev + (next - prev) * factor
  }

  // Custom speed mapping
  const getSpeedMultiplier = (speed: number): number => {
    const speedMap: { [key: number]: number } = {
      1: 1,
      2: 10,
      3: 60,
      4: 300,
      5: 600,
      6: 1800,
      7: 3600,
      8: 10800,
      9: 21600,
      10: 43200
    }
    return speedMap[speed] || 1
  }

  useEffect(() => {
    const updatePositions = () => {
      // Skip update if we're in the middle of resetting
      if (isResetting) return
      
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastTime) / 1000
      setLastTime(currentTime)

      let now: Date
      if (isSimulating) {
        const speedMultiplier = getSpeedMultiplier(simulationSpeed)
        const increment = deltaTime * speedMultiplier * 1000
        now = new Date((simulationTime?.getTime() || Date.now()) + increment)
        setSimulationTime(now)
      } else {
        // When paused, use the frozen simulation time; when stopped, use current time
        now = simulationTime || new Date()
        // Only reset simulationTime to null when explicitly stopped (not paused)
        if (simulationTime === null) {
          // This means we're in real-time mode, not paused
        }
      }

      // Location: Lahore
      const lat = 31.5497
      const lng = 74.3436

      const sunPos = SunCalc.getPosition(now, lat, lng)
      const moonPos = SunCalc.getMoonPosition(now, lat, lng)

      const rawSun = {
        azimuth: (sunPos.azimuth * 180) / Math.PI + 180,
        altitude: (sunPos.altitude * 180) / Math.PI
      }
      const rawMoon = {
        azimuth: (moonPos.azimuth * 180) / Math.PI + 180,
        altitude: (moonPos.altitude * 180) / Math.PI
      }

      // Smooth transition with reduced factor for less jittering
      setSunPosition(prev => ({
        azimuth: smoothValue(prev.azimuth, rawSun.azimuth, 0.08),
        altitude: smoothValue(prev.altitude, rawSun.altitude, 0.08)
      }))
      setMoonPosition(prev => ({
        azimuth: smoothValue(prev.azimuth, rawMoon.azimuth, 0.08),
        altitude: smoothValue(prev.altitude, rawMoon.altitude, 0.08)
      }))

      if (onTimeUpdate) {
        onTimeUpdate(now, isSimulating, simulationSpeed)
      }

      const sunStyle = getCelestialBodyStyle(sunPosition.azimuth, sunPosition.altitude, 300, 'sun')
      const moonStyle = getCelestialBodyStyle(moonPosition.azimuth, moonPosition.altitude, 60, 'moon')

      // Use direct style updates for smoother animation, only animate when simulating
      if (sunRef.current) {
        if (isSimulating) {
          gsap.to(sunRef.current, {
            left: sunStyle.left,
            top: sunStyle.top,
            opacity: sunStyle.opacity,
            duration: 0.1,
            ease: "power2.out"
          })
        } else {
          // When paused, set position directly without animation
          gsap.set(sunRef.current, {
            left: sunStyle.left,
            top: sunStyle.top,
            opacity: sunStyle.opacity
          })
        }
      }
      if (moonRef.current) {
        if (isSimulating) {
          gsap.to(moonRef.current, {
            left: moonStyle.left,
            top: moonStyle.top,
            opacity: moonStyle.opacity,
            duration: 0.1,
            ease: "power2.out"
          })
        } else {
          // When paused, set position directly without animation
          gsap.set(moonRef.current, {
            left: moonStyle.left,
            top: moonStyle.top,
            opacity: moonStyle.opacity
          })
        }
      }
    }

    updatePositions()
    // Use higher frequency for smoother animation, but only when simulating
    const interval = setInterval(updatePositions, isSimulating ? 50 : 200) // 20fps when simulating, 5fps when paused
    return () => clearInterval(interval)
  }, [isSimulating, simulationSpeed, simulationTime, isResetting])

  // --- Projection for semicircle path ---
  const getCelestialBodyStyle = (
    azimuth: number,
    altitude: number,
    size: number = 40,
    bodyType: 'sun' | 'moon' = 'sun'
  ) => {
    const W = 60
    const H = 70
    const boundaryOffsetX = 20
    const boundaryOffsetY = 15

    // Sun should only be visible when above horizon (altitude > 0)
    // Moon can be visible during civil twilight (altitude > -6)
    const isVisible = bodyType === 'sun' 
      ? altitude > 0 && azimuth >= 90 && azimuth <= 270
      : altitude > -6 && azimuth >= 90 && azimuth <= 270
    if (!isVisible) {
      return {
        position: 'absolute' as const,
        left: `-9999px`,
        top: `-9999px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0
      }
    }

    // Slightly different arcs to reduce overlap
    const baseRadius = bodyType === 'sun' ? (H / 2) * 1.2 : (H / 2) * 0.85

    const t = (azimuth - 90) / 180
    const angle = Math.PI * (1 - t)

    const altitudeFactor = Math.pow(1 - altitude / 90, 0.2)
    const radius = baseRadius * altitudeFactor
    const curveBoost = 1 + 0.5 * Math.sin(angle)
    const finalRadius = radius * curveBoost

    const x = W / 2 + finalRadius * Math.cos(angle)
    const y = H - finalRadius * Math.sin(angle)

    // Calculate opacity for moon based on day/night side
    let opacity = 1
    if (bodyType === 'moon') {
      // Determine if moon is on day side or night side based on sun's position
      const sunAzimuth = sunPosition.azimuth
      const sunAltitude = sunPosition.altitude
      
      // If sun is above horizon (day time), check if moon is on the same side
      if (sunAltitude > -6) {
        // Calculate angular distance between sun and moon
        const azimuthDiff = Math.abs(azimuth - sunAzimuth)
        const minAzimuthDiff = Math.min(azimuthDiff, 360 - azimuthDiff)
        
        // If moon is within 90 degrees of sun (same side of sky), make it lighter
        if (minAzimuthDiff < 90) {
          opacity = 0.3 // Light opacity for day-side moon
        } else {
          opacity = 1 // Full opacity for night-side moon
        }
      } else {
        // If sun is below horizon (night time), moon should be fully visible
        opacity = 1
      }
    }

    return {
      position: 'absolute' as const,
      left: `${boundaryOffsetX + x}%`,
      top: `${boundaryOffsetY + y}%`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `translate(-50%, -50%)`,
      zIndex: bodyType === 'sun' ? 5 : 4, // sun always on top, but under sky phase cover
      opacity: opacity
    }
  }

  // Controls
  const startSimulation = () => {
    setIsSimulating(true)
    // If there's already a simulation time (paused), continue from there
    // Otherwise, start from current time
    if (!simulationTime) {
      setSimulationTime(new Date())
    }
  }
  const pauseSimulation = () => setIsSimulating(false) // Pause at current position
  const stopSimulation = () => {
    setIsResetting(true) // Prevent update loop from interfering
    setIsSimulating(false)
    setSimulationTime(null) // Reset to real time
    
    // Force immediate update to current real time positions
    const now = new Date()
    const lat = 31.5497
    const lng = 74.3436
    
    const sunPos = SunCalc.getPosition(now, lat, lng)
    const moonPos = SunCalc.getMoonPosition(now, lat, lng)
    
    const currentSunPosition = {
      azimuth: (sunPos.azimuth * 180 / Math.PI + 180) % 360,
      altitude: sunPos.altitude * 180 / Math.PI
    }
    
    const currentMoonPosition = {
      azimuth: (moonPos.azimuth * 180 / Math.PI + 180) % 360,
      altitude: moonPos.altitude * 180 / Math.PI
    }
    
    setSunPosition(currentSunPosition)
    setMoonPosition(currentMoonPosition)
    
    // Reset the flag after a brief delay to allow the update
    setTimeout(() => setIsResetting(false), 100)
  }
  const resetToCurrentTime = () => {
    setIsSimulating(false)
    setSimulationTime(null)
  }
  const speedUp = () => setSimulationSpeed(prev => Math.min(prev + 1, 10))
  const slowDown = () => setSimulationSpeed(prev => Math.max(prev - 1, 1))

  // Notify parent of controls update
  useEffect(() => {
    if (onControlsUpdate) {
      onControlsUpdate({
        isSimulating,
        simulationSpeed,
        simulationTime,
        startSimulation,
        pauseSimulation,
        stopSimulation,
        speedUp,
        slowDown
      })
    }
  }, [isSimulating, simulationSpeed, simulationTime, onControlsUpdate])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 3 }}>
      <div
        className="relative translate-y-[-0px]"
        style={{ width: '60%', height: '60%' }}
      >
        {/* Sun */}
        <img
          ref={sunRef}
          src="/src/assets/images/sky-complication/day-night/sun.png"
          alt="Sun"
          style={getCelestialBodyStyle(sunPosition.azimuth, sunPosition.altitude, 400, 'sun')}
        />

        {/* Moon */}
        <img
          ref={moonRef}
          src="/src/assets/images/sky-complication/day-night/moon.png"
          alt="Moon"
          style={getCelestialBodyStyle(moonPosition.azimuth, moonPosition.altitude, 90, 'moon')}
        />
      </div>

    </div>
  )
}

export default CelestialBodies
