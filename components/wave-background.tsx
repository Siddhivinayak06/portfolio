"use client"

import { useEffect, useRef } from "react"

interface WaveBackgroundProps {
  sectionId: string
  color1: string
  color2: string
  speed?: number
  height?: number
  amplitude?: number
  frequency?: number
}

export default function WaveBackground({
  sectionId,
  color1,
  color2,
  speed = 0.15,
  height = 150,
  amplitude = 20,
  frequency = 0.01,
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      const section = document.getElementById(sectionId)
      if (!section) return

      const { width } = section.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, color1)
      gradient.addColorStop(1, color2)
      return gradient
    }

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      ctx.fillStyle = createGradient()

      // Start path
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      // Draw wave
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * frequency + time) * amplitude + canvas.height / 2
        ctx.lineTo(x, y)
      }

      // Complete the path
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fill()

      // Update time for animation
      time += speed

      // Request next frame
      animationFrameId = requestAnimationFrame(drawWave)
    }

    // Initial setup
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    drawWave()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [sectionId, color1, color2, speed, height, amplitude, frequency])

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      style={{ height: `${height}px` }}
    />
  )
}
