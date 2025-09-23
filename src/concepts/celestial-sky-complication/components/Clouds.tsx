import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSimulation } from '../context/SimulationContext'
import { 
  getSpeedMultiplier
} from '../utils/timeSimulation'

// Fix NodeJS namespace error
type Timeout = ReturnType<typeof setTimeout>

const Clouds: React.FC = () => {
  const cloudsRef = useRef<HTMLDivElement>(null)
  const lastUpdateTime = useRef<number>(Date.now())
  const cloudsRotation = useRef<number>(0) // Track clouds rotation separately
  const currentOpacity = useRef<number>(1) // Track current opacity
  const isInitialized = useRef<boolean>(false)
  const { isPaused, speed, skyDiskRotation, resetTrigger } = useSimulation()

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
      
      // Add slight offset for clouds (e.g., 5 degrees ahead)
      cloudsRotation.current = baseRotation + 5

      // Set initial position and mark as initialized
      if (cloudsRef.current) {
        gsap.set(cloudsRef.current, { 
          rotation: cloudsRotation.current,
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

    const calculateOpacity = (skyDiskRotation: number): number => {
      // Normalize sky disk rotation to 0-360 range
      const normalizedRotation = ((skyDiskRotation % 360) + 360) % 360
      
      // Map rotation to opacity: 0° = 100% opacity, 180° = 0% opacity, 360°/0° = 100% opacity
      // Create a smooth oscillation from 100 to 0 and back to 100 (reverse of stars)
      let opacity
      
      if (normalizedRotation >= 180) {
        // From 180° to 360°: fade from 0% to 100%
        const progress = (normalizedRotation - 180) / 180 // 0 to 1
        opacity = progress // 0 to 1
      } else {
        // From 0° to 180°: fade from 100% to 0%
        const progress = normalizedRotation / 180 // 0 to 1
        opacity = 1 - progress // 1 to 0
      }
      
      return Math.max(0, Math.min(1, opacity)) // Clamp between 0 and 1
    }

    const updateCloudsRotation = () => {
      if (!cloudsRef.current || !isInitialized.current) return

      const now = Date.now()
      const deltaTime = now - lastUpdateTime.current
      lastUpdateTime.current = now

      if (!isPaused.current) {
        // Running simulation: increment rotation with slight speed difference
        const speedMultiplier = getSpeedMultiplier(speed.current)
        const baseRotationSpeed = 360 / (24 * 60 * 60 * 1000) // degrees per millisecond for 24-hour cycle
        const cloudsSpeedMultiplier = 1.1 // 10% faster than sky disk
        const rotationIncrement = deltaTime * baseRotationSpeed * speedMultiplier * cloudsSpeedMultiplier
        
        cloudsRotation.current += rotationIncrement
        
        // Calculate opacity based on sky disk rotation
        const targetOpacity = calculateOpacity(skyDiskRotation.current)
        
        // Smooth opacity transition
        const opacityDiff = targetOpacity - currentOpacity.current
        const opacitySpeed = 0.02 // Adjust for faster/slower transition
        currentOpacity.current += opacityDiff * opacitySpeed
        
        // Apply smooth rotation and opacity
        gsap.to(cloudsRef.current, { 
          rotation: cloudsRotation.current,
          opacity: currentOpacity.current,
          duration: 0.1,
          ease: "none"
        })
      } else {
        // Stopped or paused: maintain current rotation, don't reset to time-based
        // Only update opacity based on sky disk rotation
        const targetOpacity = calculateOpacity(skyDiskRotation.current)
        
        // Smooth opacity transition
        const opacityDiff = targetOpacity - currentOpacity.current
        const opacitySpeed = 0.02
        currentOpacity.current += opacityDiff * opacitySpeed
        
        gsap.to(cloudsRef.current, { 
          rotation: cloudsRotation.current,
          opacity: currentOpacity.current,
          duration: 0.1,
          ease: "none"
        })
      }
    }

    // Start the rotation loop
    interval = setInterval(updateCloudsRotation, 100) // Update every 100ms

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  // Handle reset - animate clouds rotation back to current time
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
      
      // Add slight offset for clouds (e.g., 5 degrees ahead)
      cloudsRotation.current = baseRotation + 5

      // Animate the rotation smoothly back to current time
      if (cloudsRef.current) {
        gsap.to(cloudsRef.current, {
          rotation: cloudsRotation.current,
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
      ref={cloudsRef}
      className="absolute bg-contain bg-center bg-no-repeat overflow-hidden
        w-[75vw] h-[75vh] 
        sm:w-[65vw] sm:h-[65vh]
        md:w-[60vw] md:h-[70vh]
        lg:w-[60vw] lg:h-[60vh]
        xl:w-[50vw] xl:h-[60vh]
        top-[70vh] sm:top-[84vh] md:top-[62vh] 
        lg:top-[65vh] xl:top-[85vh]
        left-1/2 -translate-x-1/2 -translate-y-1/2
        origin-center z-0"
      style={{
        backgroundImage: `url('/images/sky-complication/day-night/clouds.png')`,
        backgroundSize: 'clamp(100%, 200%, 130%)', // Keep this as it's complex clamp function
      }}
    />
  )
}

export default Clouds
