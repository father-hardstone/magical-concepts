import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSimulation } from '../context/SimulationContext'
import SimulationControls from './SimulationControls'
import SimulationTimePanel from './SimulationTimePanel'
import Clouds from './Clouds'
import Stars from './Stars'
import CelestialBodiesProjection from './CelestialBodiesProjection'
import {
  getSpeedMultiplier
} from '../utils/timeSimulation'

// Fix NodeJS namespace error
type Timeout = ReturnType<typeof setTimeout>

const GrandComplication: React.FC = () => {
  const skyDiskRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const skyDiskRotationValue = useRef<number>(0) // Track sky disk rotation separately
  const totalRotations = useRef<number>(0) // Track total number of full rotations
  const { isPaused, speed, currentTime, simulationTime, skyDiskRotation, resetTrigger } = useSimulation()

  useEffect(() => {
    let interval: Timeout

    // Initialize sky disk rotation based on current time
    const initializeSkyDiskRotation = () => {
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

      // Initialize total rotations to 0 for continuous rotation
      totalRotations.current = 0
      skyDiskRotationValue.current = baseRotation
      skyDiskRotation.current = baseRotation
    }

    // Initialize rotation on mount
    initializeSkyDiskRotation()

    const updateRotation = () => {
      if (!skyDiskRef.current) return

      // Calculate rotation based on simulation time
      const timeToUse = simulationTime.current
      const hours = timeToUse.getHours()
      const minutes = timeToUse.getMinutes()
      const seconds = timeToUse.getSeconds()

      const totalMinutes = hours * 60 + minutes + seconds / 60
      let targetRotation

      if (hours >= 12) {
        targetRotation = ((totalMinutes - 12 * 60) / (12 * 60)) * 180
      } else {
        targetRotation = 180 + ((totalMinutes) / (12 * 60)) * 180
      }

      // Make rotation continuous by tracking total rotations
      const currentRotation = skyDiskRotationValue.current
      const rotationDiff = targetRotation - (currentRotation % 360)
      
      // If we've completed a full day, add 360° to maintain continuity
      if (rotationDiff < -180) {
        totalRotations.current += 1
      }
      
      const continuousRotation = targetRotation + (totalRotations.current * 360)

      // Update our tracking values
      skyDiskRotationValue.current = continuousRotation
      skyDiskRotation.current = continuousRotation

      // Apply the rotation
      gsap.to(skyDiskRef.current, {
        rotation: continuousRotation,
        duration: 0.1,
        ease: "none"
      })
    }

    const updateSimulation = () => {
      if (!isPaused.current) {
        // Update simulation time based on speed
        const speedMultiplier = getSpeedMultiplier(speed.current)
        const now = new Date()

        const timeDiff = now.getTime() - currentTime.current.getTime()
        const simulationDiff = timeDiff * speedMultiplier
        simulationTime.current = new Date(simulationTime.current.getTime() + simulationDiff)

        currentTime.current = now
      }

      // Always update rotation based on current simulation time
      updateRotation()
    }

    // Start the simulation loop
    interval = setInterval(updateSimulation, 100) // Update every 100ms

    return () => {
      if (interval) {
        clearInterval(interval)
      }
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [])

  // Handle reset - the main loop will automatically animate to current time
  useEffect(() => {
    const handleReset = () => {
      // No need for complex reset animation - main loop handles it
    }

    // Listen for reset trigger changes
    handleReset()
  }, [resetTrigger.current])

  return (
    <div className="pt-[500px] md:pt-0 w-full h-[calc(120vh+500px)] sm:h-[calc(125vh+500px)] md:h-[105vh] lg:h-[100vh] xl:h-[130vh] 2xl:h-[130vh] relative overflow-hidden">
      {/* Sky Disk - Responsive full circle display */}
      <div
        ref={skyDiskRef}
        className="absolute bg-cover bg-center bg-no-repeat
          w-[50vh] h-[50vh] sm:w-[130vh] sm:h-[130vh] 
          md:w-[70vh] md:h-[70vh] lg:w-[95vh] lg:h-[95vh] 
          xl:w-[160vh] xl:h-[160vh] 2xl:w-[170vh] 2xl:h-[170vh]
          top-[125vh] sm:top-[90vh] md:top-[59vh] lg:top-[65vh] xl:top-[100vh] 2xl:top-[100vh]
          left-1/2 -translate-x-1/2 -translate-y-1/2
          origin-center z-0"
        style={{
          backgroundImage: `url('/src/assets/images/sky-complication/day-night/sky-disk.png')`,
        }}
      />

      {/* Complication Section Container */}
      <div className="complication-section w-full h-[120vh] sm:h-[125vh] md:h-[130vh] lg:h-[130vh] xl:h-[130vh] 2xl:h-[130vh] relative overflow-hidden">
        {/* Stars - Behind clouds, in front of sky disk */}
        <Stars />

        {/* Celestial Bodies Projection - Behind clouds */}
        <CelestialBodiesProjection />

        {/* Clouds - In front of sky disk, behind sky phase cover */}
        <Clouds />

        {/* Sky Phase Cover - Responsive Full Page */}
        <div
          className="absolute bg-cover bg-center bg-no-repeat inset-0 overflow-hidden
            w-[105%] h-[105%] sm:w-[108%] sm:h-[108%] 
            md:w-[100%] md:h-[100%] lg:w-[110%] lg:h-[100%] 
            xl:w-[110%] xl:h-[110%] 2xl:w-[110%] 2xl:h-[110%]
            -left-[2.5%] -top-[2.5%] sm:-left-[0%] sm:-top-[0%] 
            md:-left-[0%] md:-top-[15%] lg:left-[-5%] lg:top-[-15%] 
            xl:-left-[5%] xl:-top-[5%] 2xl:-left-[5%] 2xl:-top-[5%]
            z-[1]
            [background-size:155%] sm:[background-size:158%] 
            md:[background-size:140%] lg:[background-size:130%] 
            xl:[background-size:110%] 2xl:[background-size:110%]"
          style={{
            backgroundImage: `url('/src/assets/images/sky-complication/day-night/sky-phase-cover.png')`,
          }}
        />

        {/* Simulation Time Panel */}
        <SimulationTimePanel />

        {/* Simulation Controls */}
        <SimulationControls />
      </div>
    </div>
  )
}

export default GrandComplication