import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSimulation } from '../context/SimulationContext'
import { getSpeedMultiplier } from '../utils/timeSimulation'

// Fix NodeJS namespace error
type Timeout = ReturnType<typeof setTimeout>

const Stars: React.FC = () => {
  const starsRef = useRef<HTMLDivElement>(null)
  const lastUpdateTime = useRef<number>(Date.now())
  const starsRotation = useRef<number>(0) // Track stars rotation separately
  const currentOpacity = useRef<number>(0.3) // Track current opacity
  const isInitialized = useRef<boolean>(false)
  const { isPaused, speed, resetTrigger } = useSimulation()

  useEffect(() => {
    let interval: Timeout

    // Initialize rotation based on current time
    const initializeRotation = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      
      const totalMinutes = hours * 60 + minutes + seconds / 60
      let baseRotation
      
      if (hours >= 12) {
        baseRotation = ((totalMinutes - 12 * 60) / (12 * 60)) * 180
      } else {
        baseRotation = 180 + ((totalMinutes) / (12 * 60)) * 180
      }
      
      // Add slight offset for stars (e.g., 10 degrees behind)
      starsRotation.current = baseRotation - 10

      // Set initial position and mark as initialized
      if (starsRef.current) {
        gsap.set(starsRef.current, { 
          rotation: starsRotation.current,
          opacity: currentOpacity.current
        })
        // Mark as initialized after a short delay to ensure position is set
        setTimeout(() => {
          isInitialized.current = true
        }, 200)
      }
    }

    // Initialize rotation on mount
    initializeRotation()

    const calculateOpacity = (starsRotation: number): number => {
      // Normalize stars rotation to 0-360 range
      const normalizedRotation = ((starsRotation % 360) + 360) % 360
      
      // Map rotation to opacity: 0°-180° = day (30% opacity), 180°-360° = night (100% opacity)
      // Stars are brightest at night (180°-360°) and dim during day (0°-180°)
      let opacity
      
      if (normalizedRotation >= 180) {
        // Night time: 180° to 360° - stars are bright (100% opacity)
        opacity = 1.0 // 100% opacity
      } else {
        // Day time: 0° to 180° - stars are dim (30% opacity)
        opacity = 0.3 // 30% opacity
      }
      
      return Math.max(0.3, Math.min(1.0, opacity)) // Clamp between 0.3 and 1.0
    }

    const updateStarsRotation = () => {
      if (!starsRef.current || !isInitialized.current) return

      const now = Date.now()
      const deltaTime = now - lastUpdateTime.current
      lastUpdateTime.current = now

      if (!isPaused.current) {
        // Running simulation: increment rotation with slight speed difference
        const speedMultiplier = getSpeedMultiplier(speed.current)
        const baseRotationSpeed = 360 / (24 * 60 * 60 * 1000) // degrees per millisecond for 24-hour cycle
        const starsSpeedMultiplier = 0.5 // 50% slower than sky disk (half speed)
        const rotationIncrement = deltaTime * baseRotationSpeed * speedMultiplier * starsSpeedMultiplier
        
        starsRotation.current += rotationIncrement
        
        // Calculate opacity based on stars rotation
        const targetOpacity = calculateOpacity(starsRotation.current)
        
        // Smooth opacity transition
        const opacityDiff = targetOpacity - currentOpacity.current
        const opacitySpeed = 0.02 // Adjust for faster/slower transition
        currentOpacity.current += opacityDiff * opacitySpeed
        
        // Apply smooth rotation and opacity
        gsap.to(starsRef.current, { 
          rotation: starsRotation.current,
          opacity: currentOpacity.current,
          duration: 0.1,
          ease: "none"
        })
      } else {
        // Stopped or paused: maintain current rotation, don't reset to time-based
        // Only update opacity based on stars rotation
        const targetOpacity = calculateOpacity(starsRotation.current)
        
        // Smooth opacity transition
        const opacityDiff = targetOpacity - currentOpacity.current
        const opacitySpeed = 0.02
        currentOpacity.current += opacityDiff * opacitySpeed
        
        gsap.to(starsRef.current, { 
          rotation: starsRotation.current,
          opacity: currentOpacity.current,
          duration: 0.1,
          ease: "none"
        })
      }
    }

    // Start the rotation loop
    interval = setInterval(updateStarsRotation, 100) // Update every 100ms

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  // Handle reset - animate stars rotation back to current time
  useEffect(() => {
    const handleReset = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      
      const totalMinutes = hours * 60 + minutes + seconds / 60
      let baseRotation
      
      if (hours >= 12) {
        baseRotation = ((totalMinutes - 12 * 60) / (12 * 60)) * 180
      } else {
        baseRotation = 180 + ((totalMinutes) / (12 * 60)) * 180
      }
      
      // Add slight offset for stars (e.g., 10 degrees behind)
      starsRotation.current = baseRotation - 10

      // Animate the rotation smoothly back to current time
      if (starsRef.current) {
        gsap.to(starsRef.current, {
          rotation: starsRotation.current,
          duration: 4, // 4 second smooth animation
          ease: "power2.inOut"
        })
      }
    }

    // Listen for reset trigger changes
    handleReset()
  }, [resetTrigger.current])

  return (
    <div
      ref={starsRef}
      className="absolute bg-cover bg-center bg-no-repeat
        w-[55vh] h-[55vh] sm:w-[110vh] sm:h-[110vh] 
        md:w-[80vh] md:h-[80vh] lg:w-[100vh] lg:h-[100vh] 
        xl:w-[120vh] xl:h-[120vh] 2xl:w-[120vh] 2xl:h-[120vh]
        top-[55vh] sm:top-[65vh] md:top-[40vh] lg:top-[60vh] xl:top-[60vh] 2xl:top-[60vh]
        left-1/2 -translate-x-1/2 -translate-y-1/2
        origin-center z-[0.5]"
      style={{
        backgroundImage: `url('/src/assets/images/sky-complication/day-night/stars.png')`,
        backgroundSize: 'clamp(100%, 120%, 140%)', // Keep this as it's complex clamp function
      }}
    />
  )
}

export default Stars
