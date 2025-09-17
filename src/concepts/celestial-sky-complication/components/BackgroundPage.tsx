import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import * as SunCalc from 'suncalc'
import CelestialBodies from './CelestialBodies'

interface BackgroundPageProps {
  isNightMode: boolean
}

const BackgroundPage: React.FC<BackgroundPageProps> = ({ isNightMode }) => {
  const skyDiskRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [controls, setControls] = useState<any>(null)
  const [starsRotation, setStarsRotation] = useState(0)

  // Handle time updates from CelestialBodies
  const handleTimeUpdate = (time: Date, simulating: boolean, speed: number) => {
    setCurrentTime(time)
    setIsSimulating(simulating)
    setSimulationSpeed(speed)
  }

  // Handle controls updates from CelestialBodies
  const handleControlsUpdate = (newControls: any) => {
    setControls(newControls)
  }

  // Calculate clouds opacity based on time of day
  const getCloudsOpacity = () => {
    const now = currentTime
    const lat = 31.5497
    const lng = 74.3436

    // Get sun position to determine day/night transition
    const sunPos = SunCalc.getPosition(now, lat, lng)
    const sunAltitude = sunPos.altitude * 180 / Math.PI

    // Clouds are visible during day time and fade during twilight
    // Start fading when sun is at -6° (civil twilight)
    // Completely hidden when sun is at -12° (astronomical twilight)
    if (sunAltitude > -6) {
      // Day time - full clouds visibility
      return 1.0
    } else if (sunAltitude < -12) {
      // Night time - no clouds
      return 0
    } else {
      // Twilight transition: fade between 1 and 0 based on sun altitude
      // Map sun altitude from -6° to -12° to opacity from 1 to 0
      const fadeFactor = (sunAltitude + 6) / -6 // 0 to 1
      return fadeFactor
    }
  }

  // Calculate stars opacity based on time and moon position
  const getStarsOpacity = (starsRotation = 0) => {
    const now = currentTime
    const lat = 31.5497
    const lng = 74.3436

    // Get sun position to determine day/night transition
    const sunPos = SunCalc.getPosition(now, lat, lng)
    const sunAltitude = sunPos.altitude * 180 / Math.PI

    // Calculate rotation-based fade oscillation
    // At 0° rotation: max fade (min opacity)
    // At 180° rotation: min fade (max opacity)
    // Oscillates smoothly between these values
    const normalizedRotation = ((starsRotation % 360) + 360) % 360 // Normalize to 0-360
    const rotationFade = (Math.cos(normalizedRotation * Math.PI / 180) + 1) / 2 // 0 to 1
    const minOpacity = 0.3 // Minimum opacity at 0° rotation (30%)
    const maxOpacity = 1.0 // Maximum opacity at 180° rotation (100%)
    const rotationOpacity = minOpacity + (maxOpacity - minOpacity) * rotationFade

    // Gradual fade based on sun altitude
    // Start fading when sun is at -6° (civil twilight)
    // Completely hidden when sun is at +6° (day time)
    if (sunAltitude > 6) {
      return 0 // Completely hidden during day
    } else if (sunAltitude < -6) {
      // Full night time - check moon position
      const moonPos = SunCalc.getMoonPosition(now, lat, lng)
      const moonAzimuth = (moonPos.azimuth * 180 / Math.PI + 180) % 360
      const moonAltitude = moonPos.altitude * 180 / Math.PI

      // If moon is above horizon and on the night side, reduce stars opacity
      if (moonAltitude > -6 && moonAzimuth >= 90 && moonAzimuth <= 270) {
        return rotationOpacity * 0.3 // Apply moon dimming to rotation-based opacity
      }

      return rotationOpacity // Use rotation-based opacity for night time
    } else {
      // Twilight transition: fade between 0 and 1 based on sun altitude
      // Map sun altitude from -6° to +6° to opacity from 1 to 0
      const fadeFactor = (sunAltitude + 6) / 12 // 0 to 1
      const baseOpacity = 1 - fadeFactor // 1 to 0

      // Check moon position for additional dimming during twilight
      const moonPos = SunCalc.getMoonPosition(now, lat, lng)
      const moonAzimuth = (moonPos.azimuth * 180 / Math.PI + 180) % 360
      const moonAltitude = moonPos.altitude * 180 / Math.PI

      if (moonAltitude > -6 && moonAzimuth >= 90 && moonAzimuth <= 270) {
        return baseOpacity * rotationOpacity * 0.3 // Apply both twilight and moon dimming to rotation-based opacity
      }

      return baseOpacity * rotationOpacity // Apply rotation-based opacity to twilight
    }
  }

  // Set initial stars opacity
  useEffect(() => {
    if (starsRef.current) {
      const targetOpacity = getStarsOpacity(starsRotation)
      gsap.set(starsRef.current, { opacity: targetOpacity })
    }
  }, [starsRotation])

  // Set initial clouds opacity
  useEffect(() => {
    if (cloudsRef.current) {
      const targetOpacity = getCloudsOpacity()
      console.log('Initial clouds opacity:', targetOpacity, 'Current time:', currentTime.toLocaleTimeString())
      // Temporarily set high opacity for testing
      gsap.set(cloudsRef.current, { opacity: Math.max(targetOpacity, 0.8) })
    }
  }, [])

  // Animate stars opacity changes smoothly - only on major changes (time/simulation)
  useEffect(() => {
    if (starsRef.current) {
      const targetOpacity = getStarsOpacity(starsRotation)
      console.log('Stars opacity target:', targetOpacity, 'Stars rotation:', starsRotation.toFixed(2), 'Sun altitude:', (SunCalc.getPosition(currentTime, 31.5497, 74.3436).altitude * 180 / Math.PI).toFixed(2))
      gsap.to(starsRef.current, {
        opacity: targetOpacity,
        duration: 8, // 8 second very slow transition
        ease: "power1.out" // Very gentle easing
      })
    }
  }, [currentTime, isSimulating, simulationSpeed]) // Only major changes

  // Animate clouds opacity changes smoothly
  useEffect(() => {
    if (cloudsRef.current) {
      const targetOpacity = getCloudsOpacity()
      console.log('Clouds opacity target:', targetOpacity, 'Sun altitude:', (SunCalc.getPosition(currentTime, 31.5497, 74.3436).altitude * 180 / Math.PI).toFixed(2))
      gsap.to(cloudsRef.current, {
        opacity: targetOpacity,
        duration: 10, // 10 second slow transition for clouds
        ease: "power1.out" // Very gentle easing
      })
    }
  }, [currentTime, isSimulating, simulationSpeed]) // Only major changes

  // Continuous smooth rotation-based opacity animation
  useEffect(() => {
    if (starsRef.current && isSimulating) {
      // Create a continuous animation that updates opacity based on rotation
      const updateOpacity = () => {
        if (starsRef.current) {
          const currentRotation = gsap.getProperty(starsRef.current, "rotation") as number
          const targetOpacity = getStarsOpacity(currentRotation)
          gsap.to(starsRef.current, {
            opacity: targetOpacity,
            duration: 0.5, // Very quick updates for smooth rotation
            ease: "none" // No easing for immediate response
          })
        }
      }

      // Update every 100ms during simulation for smooth rotation
      const interval = setInterval(updateOpacity, 100)
      return () => {
        clearInterval(interval)
        // Kill any ongoing GSAP animations
        if (starsRef.current) {
          gsap.killTweensOf(starsRef.current)
        }
      }
    }
  }, [isSimulating, currentTime]) // Only when simulating

  // Cleanup all animations and intervals on unmount
  useEffect(() => {
    return () => {
      console.log('BackgroundPage unmounting - cleaning up')
      // Kill all GSAP animations
      if (skyDiskRef.current) gsap.killTweensOf(skyDiskRef.current)
      if (starsRef.current) gsap.killTweensOf(starsRef.current)
      if (cloudsRef.current) gsap.killTweensOf(cloudsRef.current)
      // Kill all animations globally
      gsap.killTweensOf("*")
    }
  }, [])

  useEffect(() => {
    if (skyDiskRef.current && starsRef.current && cloudsRef.current) {
      // Calculate rotation based on current time
      // At noon (12:00), rotation should be 0 degrees
      // At midnight (00:00), rotation should be 180 degrees
      // At 6 AM, rotation should be 90 degrees (sunrise)
      // At 6 PM, rotation should be 270 degrees (sunset)
      const hours = currentTime.getHours() + currentTime.getMinutes() / 60 + currentTime.getSeconds() / 3600
      
      // Convert to rotation: noon = 0°, midnight = 180°
      // Formula: (hours - 12) * 15 degrees per hour
      let rotation = (hours - 12) * 15
      
      // Normalize to 0-360 range
      rotation = ((rotation % 360) + 360) % 360
      
      // Set initial rotation for sky disk, stars, and clouds
      gsap.set(skyDiskRef.current, { rotation: rotation })
      const initialStarsRotation = rotation * 0.5
      gsap.set(starsRef.current, { rotation: initialStarsRotation }) // Stars at half rotation
      gsap.set(cloudsRef.current, { rotation: rotation }) // Clouds rotate with sky disk
      setStarsRotation(initialStarsRotation) // Track stars rotation
      
      if (isSimulating) {
        // Stop any existing animation first
        gsap.killTweensOf(skyDiskRef.current)
        gsap.killTweensOf(starsRef.current)
        gsap.killTweensOf(cloudsRef.current)
        
        // Animate rotation based on simulation speed
        const speedMultiplier = getSpeedMultiplier(simulationSpeed)
        // Duration for one complete 24-hour cycle in real seconds
        const duration = 24 * 60 * 60 / speedMultiplier // Convert hours to seconds, then divide by speed
        
      gsap.to(skyDiskRef.current, {
          rotation: `+=360`,
          duration: duration,
          ease: "none",
          repeat: -1
        })
        
        // Stars rotate at half speed (double duration)
        gsap.to(starsRef.current, {
          rotation: `+=360`, // Full rotation but at half speed
          duration: duration * 2, // Double duration for half speed
          ease: "none",
          repeat: -1,
          onUpdate: function() {
            // Track the current rotation for opacity calculations
            const currentRotation = gsap.getProperty(starsRef.current, "rotation") as number
            setStarsRotation(currentRotation)
          }
        })

        // Clouds rotate with sky disk at same speed
        gsap.to(cloudsRef.current, {
          rotation: `+=360`,
          duration: duration,
        ease: "none",
        repeat: -1
      })
      } else {
        // Stop animation and set to current time position
        gsap.killTweensOf(skyDiskRef.current)
        gsap.killTweensOf(starsRef.current)
        gsap.killTweensOf(cloudsRef.current)
        gsap.set(skyDiskRef.current, { rotation: rotation })
        const pausedStarsRotation = rotation * 0.5
        gsap.set(starsRef.current, { rotation: pausedStarsRotation }) // Stars at half rotation
        gsap.set(cloudsRef.current, { rotation: rotation }) // Clouds at same rotation as sky disk
        setStarsRotation(pausedStarsRotation) // Track stars rotation
      }
    }
  }, [currentTime, isSimulating, simulationSpeed])

  // Speed multiplier function (same as in CelestialBodies)
  const getSpeedMultiplier = (speed: number): number => {
    const speedMap: { [key: number]: number } = {
      1: 1,     // realtime
      2: 10,    // 10 sec per sec
      3: 60,    // 1 min per sec
      4: 300,   // 5 min per sec
      5: 600,   // 10 min per sec
      6: 1800,  // 30 min per sec
      7: 3600,  // 1 hr per sec
      8: 10800, // 3 hr per sec
      9: 21600, // 6 hr per sec
      10: 43200 // 12 hr per sec
    }
    return speedMap[speed] || 1
  }

  return (
    <div className="w-full h-[110vh] relative overflow-y-hidden overflow-x-hidden background-page">
      {/* Sky Disk - Rotating Background */}
      <div 
        ref={skyDiskRef}
        className="absolute"
        style={{
          backgroundImage: 'url(/src/assets/images/sky-complication/day-night/sky-disk.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '150%',
          height: '150%',
          left: '50%',
          top: 'calc(50% + 250px)',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      />
      
      {/* Stars Overlay - rotates with sky disk with same pivot */}
      <div 
        ref={starsRef}
        className="absolute"
        style={{
          backgroundImage: 'url(/src/assets/images/sky-complication/day-night/stars.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '150%',
          height: '150%',
          left: '50%',
          top: 'calc(50% + 250px)',
          transform: 'translate(-50%, -50%)',
          zIndex: 6,
          opacity: 0, // Initial opacity, will be animated by GSAP
          transformOrigin: 'center' // Same pivot as sky disk
        }}
      />

      {/* Clouds Overlay - Day Sky */}
      <div 
        ref={cloudsRef}
        className="absolute"
        style={{
          backgroundImage: 'url(/src/assets/images/sky-complication/day-night/clouds.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          left: '50%',
          top: 'calc(50% + 250px)',
          transform: 'translate(-50%, -50%)',
          zIndex: 7, // Above stars but below sky phase cover
          opacity: 0, // Initial opacity, will be animated by GSAP
          transformOrigin: 'center bottom' // Pivot at bottom center edge
        }}
      />
      
      {/* Sky Phase Cover as Foreground Image */}
      <img 
        src="/src/assets/images/sky-complication/day-night/sky-phase-cover.png"
        alt="Sky Phase Cover"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          zIndex: 10,
          transform: 'scale(1.2)',
          transformOrigin: 'center'
        }}
      />
      
      {/* Celestial Bodies (Sun and Moon) */}
      <CelestialBodies isNightMode={isNightMode} onTimeUpdate={handleTimeUpdate} onControlsUpdate={handleControlsUpdate} />

      {/* Control panel */}
      {controls && (
        <div className="absolute top-[50vh] left-4 bg-black/90 text-white p-4 rounded-lg text-sm border-2 border-white/20 pointer-events-auto" style={{ zIndex: 20 }}>
          <div className="font-bold mb-3 text-base">Time Simulation Controls</div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <button onClick={controls.startSimulation} disabled={controls.isSimulating} className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm font-medium disabled:opacity-50">
                {controls.simulationTime && !controls.isSimulating ? '▶ Continue' : '▶ Start'}
              </button>
              <button onClick={controls.pauseSimulation} disabled={!controls.isSimulating} className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-sm font-medium disabled:opacity-50">⏸ Pause</button>
              <button onClick={controls.stopSimulation} className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm font-medium">⏹ Stop & Reset</button>
            </div>
            <div className="flex gap-2">
              <button onClick={controls.speedUp} className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-sm font-medium">⏩ Speed Up ({controls.simulationSpeed}x)</button>
              <button onClick={controls.slowDown} className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded text-sm font-medium">⏪ Slow Down</button>
            </div>
            <div className="text-sm font-medium">
              Status: {controls.isSimulating ? `Simulating at ${controls.simulationSpeed}x` : controls.simulationTime ? 'Paused' : 'Real time'}
            </div>
            
            {/* Time Conversion Display */}
            <div className="text-xs text-gray-300 border-t border-gray-600 pt-2">
              <div className="font-medium mb-1">Speed Conversion:</div>
              {controls.simulationSpeed === 1 && '1x = 1 sec real time per 1 sec simulation'}
              {controls.simulationSpeed === 2 && '2x = 10 sec real time per 1 sec simulation'}
              {controls.simulationSpeed === 3 && '3x = 1 min real time per 1 sec simulation'}
              {controls.simulationSpeed === 4 && '4x = 5 min real time per 1 sec simulation'}
              {controls.simulationSpeed === 5 && '5x = 10 min real time per 1 sec simulation'}
              {controls.simulationSpeed === 6 && '6x = 30 min real time per 1 sec simulation'}
              {controls.simulationSpeed === 7 && '7x = 1 hr real time per 1 sec simulation'}
              {controls.simulationSpeed === 8 && '8x = 3 hr real time per 1 sec simulation'}
              {controls.simulationSpeed === 9 && '9x = 6 hr real time per 1 sec simulation'}
              {controls.simulationSpeed === 10 && '10x = 12 hr real time per 1 sec simulation'}
            </div>
          </div>
        </div>
      )}

      {/* Calendar and Time Display */}
      {controls && (
        <div className="absolute top-[50vh] right-4 bg-black/90 text-white p-4 rounded-lg text-sm border-2 border-white/20 pointer-events-auto" style={{ zIndex: 20 }}>
          <div className="font-bold mb-2 text-base">Simulation Time</div>
          <div className="text-xs space-y-1">
            <div><strong>Date:</strong> {(controls.simulationTime || new Date()).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
            <div><strong>Time:</strong> {(controls.simulationTime || new Date()).toLocaleTimeString('en-US', { 
              hour12: true, 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}</div>
            <div><strong>Location:</strong> Lahore, Pakistan</div>
            <div><strong>Coordinates:</strong> 31.5°N, 74.3°E</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundPage
