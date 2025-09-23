import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSimulation } from '../context/SimulationContext'
import { getCurrentSimulationTime } from '../utils/timeSimulation'
import * as SunCalc from 'suncalc'

interface BodyState {
  active: boolean
  progress: number
}

const CelestialBodiesProjection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef<boolean>(false)
  const { isPaused, speed, currentTime, simulationTime, skyDiskRotation, resetTrigger } = useSimulation()

  const sunState = useRef<BodyState>({ active: false, progress: 0 })
  const moonState = useRef<BodyState>({ active: false, progress: 0 })
  const moonOpacity = useRef<number>(0.3) // Track moon opacity separately

  const latitude = 31.5497
  const longitude = 74.3436

  const calculateMoonOpacity = (skyDiskRotation: number): number => {
    // Normalize sky disk rotation to 0-360 range
    const normalizedRotation = ((skyDiskRotation % 360) + 360) % 360
    
    // Map rotation to moon opacity: 0°-180° = day (30% opacity), 180°-360° = night (100% opacity)
    // Moon is dim during day and bright at night
    let targetOpacity
    
    if (normalizedRotation >= 180) {
      // Night time: 180° to 360° - moon is bright (100% opacity)
      targetOpacity = 1.0 // 100% opacity
    } else {
      // Day time: 0° to 180° - moon is dim (30% opacity)
      targetOpacity = 0.3 // 30% opacity
    }
    
    return Math.max(0.3, Math.min(1.0, targetOpacity)) // Clamp between 0.3 and 1.0
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    // Initialize celestial bodies to current time positions
    const initializeBodies = () => {
      if (!containerRef.current || !sunRef.current || !moonRef.current) return

      const now = new Date() // Use current real time for initialization
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight

      const START = { x: 0, y: containerHeight }
      const END = { x: containerWidth, y: containerHeight }

      const sunPos = SunCalc.getPosition(now, latitude, longitude)
      const moonPos = SunCalc.getMoonPosition(now, latitude, longitude)

      const sunAlt = (sunPos.altitude * 180) / Math.PI
      const sunAz = ((sunPos.azimuth * 180) / Math.PI + 180) % 360
      const moonAlt = (moonPos.altitude * 180) / Math.PI
      const moonAz = ((moonPos.azimuth * 180) / Math.PI + 180) % 360

      const getBezierPosition = (progress: number, altitude: number) => {
        progress = Math.min(Math.max(progress, 0), 1)
        const clampedAlt = Math.max(0, Math.min(altitude, 90))
        const factor = clampedAlt / 90

        const minH = containerHeight * 1.5
        const maxH = containerHeight * 1.5
        const curveHeight = minH + factor * (maxH - minH)

        const controlPoint = {
          x: containerWidth / 2,
          y: containerHeight - curveHeight
        }

        const t = progress
        const x =
          (1 - t) * (1 - t) * START.x + 2 * (1 - t) * t * controlPoint.x + t * t * END.x
        const y =
          (1 - t) * (1 - t) * START.y + 2 * (1 - t) * t * controlPoint.y + t * t * END.y

        return { x, y }
      }

      // Set initial sun position
      const sunProgress = ((sunAz - 90 + 360) % 360) / 180
      if (sunProgress >= 0 && sunProgress <= 1 && sunAlt > 0) {
        const sunPos = getBezierPosition(sunProgress, sunAlt)
        const sunFade = sunAlt > 0 ? 1 : Math.max(0, 1 - Math.abs(sunAlt) / 10)
        
        gsap.set(sunRef.current, {
          left: `${sunPos.x}px`,
          top: `${sunPos.y}px`,
          opacity: sunFade
        })
      } else {
        gsap.set(sunRef.current, {
          left: `${START.x}px`,
          top: `${START.y}px`,
          opacity: 0
        })
      }

      // Set initial moon position
      const moonProgress = ((moonAz - 90 + 360) % 360) / 180
      if (moonProgress >= 0 && moonProgress <= 1 && moonAlt > 0) {
        const moonPos = getBezierPosition(moonProgress, moonAlt)
        const moonFade = moonAlt > 0 ? 1 : Math.max(0, 1 - Math.abs(moonAlt) / 10)
        
        gsap.set(moonRef.current, {
          left: `${moonPos.x}px`,
          top: `${moonPos.y}px`,
          opacity: moonFade
        })
      } else {
        gsap.set(moonRef.current, {
          left: `${START.x}px`,
          top: `${START.y}px`,
          opacity: 0
        })
      }

      // Mark as initialized after a short delay
      setTimeout(() => {
        isInitialized.current = true
      }, 200)
    }

    // Initialize on mount
    initializeBodies()

    const updateBodies = () => {
      if (!containerRef.current || !sunRef.current || !moonRef.current || !isInitialized.current) return

      // Always use simulation time since it's always available now
      const now = getCurrentSimulationTime({
        speed: speed.current,
        isSimulating: !isPaused.current, // Running if not paused
        isPaused: isPaused.current,
        currentTime: currentTime.current,
        simulationTime: simulationTime.current
      })

      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight

      const START = { x: 0, y: containerHeight }
      const END = { x: containerWidth, y: containerHeight }

      const sunPos = SunCalc.getPosition(now, latitude, longitude)
      const moonPos = SunCalc.getMoonPosition(now, latitude, longitude)

      const sunAlt = (sunPos.altitude * 180) / Math.PI
      const sunAz = ((sunPos.azimuth * 180) / Math.PI + 180) % 360
      const moonAlt = (moonPos.altitude * 180) / Math.PI
      const moonAz = ((moonPos.azimuth * 180) / Math.PI + 180) % 360

      const getBezierPosition = (progress: number, altitude: number) => {
        progress = Math.min(Math.max(progress, 0), 1)
        const clampedAlt = Math.max(0, Math.min(altitude, 90))
        const factor = clampedAlt / 90

        const minH = containerHeight * 1.5
        const maxH = containerHeight * 1.5
        const curveHeight = minH + factor * (maxH - minH)

        const controlPoint = {
          x: containerWidth / 2,
          y: containerHeight - curveHeight
        }

        const t = progress
        const x =
          (1 - t) * (1 - t) * START.x + 2 * (1 - t) * t * controlPoint.x + t * t * END.x
        const y =
          (1 - t) * (1 - t) * START.y + 2 * (1 - t) * t * controlPoint.y + t * t * END.y

        return { x, y }
      }

      const moveBody = (
        ref: React.RefObject<HTMLDivElement | null>,
        azimuth: number,
        altitude: number,
        state: React.MutableRefObject<BodyState>,
        isMoon: boolean
      ) => {
        if (!ref.current) return

        let progress = ((azimuth - 90 + 360) % 360) / 180

        if (progress < 0 || progress > 1) {
          // Outside path → reset
          gsap.set(ref.current, {
            left: `${START.x}px`,
            top: `${START.y}px`,
            opacity: 0
          })
          state.current.active = false
          state.current.progress = 0
          return
        }

        if (altitude > 0 && !state.current.active) {
          state.current.active = true
        }

        if (state.current.active) {
          state.current.progress = progress
          const pos = getBezierPosition(progress, altitude)

          // For sun: use altitude-based fade, for moon: use day/night opacity
          let fade
          if (isMoon) {
            // Moon uses day/night opacity (calculated separately)
            fade = 1 // Will be overridden by the separate opacity update
          } else {
            // Sun uses altitude-based fade
            fade = altitude > 0 ? 1 : Math.max(0, 1 - Math.abs(altitude) / 10)
          }

          gsap.to(ref.current, {
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: fade,
            duration: isMoon ? 0.6 : 0.3, // Moon slower for smoothness
            ease: 'power1.out',
            overwrite: 'auto' // prevents vibration by killing previous tweens
          })

          if (progress >= 1) {
            state.current.active = false
            state.current.progress = 0
            gsap.set(ref.current, {
              left: `${START.x}px`,
              top: `${START.y}px`,
              opacity: 0
            })
          }
        }
      }

      moveBody(sunRef, sunAz, sunAlt, sunState, false)
      moveBody(moonRef, moonAz, moonAlt, moonState, true)

      // Update moon opacity based on day/night cycle
      const targetMoonOpacity = calculateMoonOpacity(skyDiskRotation.current)
      const opacityDiff = targetMoonOpacity - moonOpacity.current
      const opacitySpeed = 0.02 // Smooth transition speed
      moonOpacity.current += opacityDiff * opacitySpeed

      // Apply smooth opacity to moon
      if (moonRef.current) {
        gsap.to(moonRef.current, {
          opacity: moonOpacity.current,
          duration: 0.1,
          ease: "none"
        })
      }
    }

    // Initial update to set correct positions on mount
    updateBodies()
    
    // Update at 30 FPS for smooth movement
    interval = setInterval(updateBodies, 1000 / 30)

    return () => clearInterval(interval)
  }, [isPaused, speed, currentTime, simulationTime, skyDiskRotation])

  // Handle reset - animate sun and moon back to current time positions
  useEffect(() => {
    const handleReset = () => {
      if (!containerRef.current || !sunRef.current || !moonRef.current) return

      const now = new Date() // Use current real time for reset
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight

      const START = { x: 0, y: containerHeight }
      const END = { x: containerWidth, y: containerHeight }

      const sunPos = SunCalc.getPosition(now, latitude, longitude)
      const moonPos = SunCalc.getMoonPosition(now, latitude, longitude)

      const sunAlt = (sunPos.altitude * 180) / Math.PI
      const sunAz = ((sunPos.azimuth * 180) / Math.PI + 180) % 360
      const moonAlt = (moonPos.altitude * 180) / Math.PI
      const moonAz = ((moonPos.azimuth * 180) / Math.PI + 180) % 360

      const getBezierPosition = (progress: number, altitude: number) => {
        progress = Math.min(Math.max(progress, 0), 1)
        const clampedAlt = Math.max(0, Math.min(altitude, 90))
        const factor = clampedAlt / 90

        const minH = containerHeight * 1.5
        const maxH = containerHeight * 1.5
        const curveHeight = minH + factor * (maxH - minH)

        const controlPoint = {
          x: containerWidth / 2,
          y: containerHeight - curveHeight
        }

        const t = progress
        const x =
          (1 - t) * (1 - t) * START.x + 2 * (1 - t) * t * controlPoint.x + t * t * END.x
        const y =
          (1 - t) * (1 - t) * START.y + 2 * (1 - t) * t * controlPoint.y + t * t * END.y

        return { x, y }
      }

      // Animate sun to current time position
      const sunProgress = ((sunAz - 90 + 360) % 360) / 180
      if (sunProgress >= 0 && sunProgress <= 1 && sunAlt > 0) {
        const sunPos = getBezierPosition(sunProgress, sunAlt)
        const sunFade = sunAlt > 0 ? 1 : Math.max(0, 1 - Math.abs(sunAlt) / 10)
        
        gsap.to(sunRef.current, {
          left: `${sunPos.x}px`,
          top: `${sunPos.y}px`,
          opacity: sunFade,
          duration: 1,
          ease: "power2.inOut"
        })
      } else {
        gsap.to(sunRef.current, {
          left: `${START.x}px`,
          top: `${START.y}px`,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut"
        })
      }

      // Animate moon to current time position
      const moonProgress = ((moonAz - 90 + 360) % 360) / 180
      if (moonProgress >= 0 && moonProgress <= 1 && moonAlt > 0) {
        const moonPos = getBezierPosition(moonProgress, moonAlt)
        
        gsap.to(moonRef.current, {
          left: `${moonPos.x}px`,
          top: `${moonPos.y}px`,
          opacity: 1, // Will be overridden by day/night opacity
          duration: 1,
          ease: "power2.inOut"
        })
      } else {
        gsap.to(moonRef.current, {
          left: `${START.x}px`,
          top: `${START.y}px`,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut"
        })
      }
    }

    // Listen for reset trigger changes
    handleReset()
  }, [resetTrigger.current])

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none
        w-[90vw] h-[25vh] 
        sm:w-[70vw] sm:h-[70vh]
        md:w-[75vw] md:h-[40vh]
        lg:w-[80vw] lg:h-[55vh]
        xl:w-[65vw] xl:h-[65vh]
        2xl:w-[65vw] 2xl:h-[65vh]
        top-[62vh] sm:top-[72vh] md:top-[50vh] lg:top-[50vh] xl:top-[70vh] 2xl:top-[70vh]
        left-1/2 -translate-x-1/2 -translate-y-1/2
        z-[0.5]"
    >
      <div
        ref={sunRef}
        className="absolute bg-contain bg-center bg-no-repeat
          w-[300px] h-[300px] 
          sm:w-[350px] sm:h-[350px]
          md:w-[400px] md:h-[400px]
          lg:w-[500px] lg:h-[500px]
          xl:w-[600px] xl:h-[600px]
          2xl:w-[600px] 2xl:h-[600px]
          -translate-x-1/2 -translate-y-1/2
          z-[2] opacity-0"
        style={{
          backgroundImage: `url('/images/sky-complication/day-night/sun.png')`,
        }}
      />

      <div
        ref={moonRef}
        className="absolute bg-contain bg-center bg-no-repeat
          w-[40px] h-[40px] 
          sm:w-[50px] sm:h-[50px]
          md:w-[60px] md:h-[60px]
          lg:w-[70px] lg:h-[70px]
          xl:w-[80px] xl:h-[80px]
          2xl:w-[80px] 2xl:h-[80px]
          -translate-x-1/2 -translate-y-1/2
          z-[1] opacity-0"
        style={{
          backgroundImage: `url('/images/sky-complication/day-night/moon.png')`,
        }}
      />
    </div>
  )
}

export default CelestialBodiesProjection
