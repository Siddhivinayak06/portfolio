"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

interface ModernBackgroundProps {
  className?: string
}

export default function ModernBackground({ className = "" }: ModernBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const { scrollY } = useScroll()

  // Mouse parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth mouse movement with springs
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Parallax layers with different movement speeds
  const layer1X = useTransform(smoothMouseX, (value) => value / 10)
  const layer1Y = useTransform(smoothMouseY, (value) => value / 10)

  const layer2X = useTransform(smoothMouseX, (value) => value / -15)
  const layer2Y = useTransform(smoothMouseY, (value) => value / -15)

  const layer3X = useTransform(smoothMouseX, (value) => value / 20)
  const layer3Y = useTransform(smoothMouseY, (value) => value / 20)

  // Scroll-based parallax
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150])
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.1])
  const foregroundY = useTransform(scrollY, [0, 1000], [0, -50])
  const midgroundY = useTransform(scrollY, [0, 1000], [0, -100])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Update the animation style for flowing elements
    // Create flowing elements with depth (z-index for parallax)
    const flowElements: {
      x: number
      y: number
      z: number // depth for parallax
      size: number
      speed: number
      angle: number
      color: string
      opacity: number
      blur: number
      shape: "circle" | "square" | "triangle" | "hexagon" | "line"
      rotation: number
      rotationSpeed: number
      amplitude: number
      frequency: number
      phase: number
    }[] = []

    // Create gradient flowing elements with different depths
    for (let i = 0; i < 40; i++) {
      const size = Math.random() * 60 + 20
      const z = Math.random() * 3 // 0-3 depth value (higher = further back)
      const shapes = ["circle", "square", "triangle", "hexagon", "line"] as const
      flowElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: z,
        size: size,
        speed: (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        angle: Math.random() * Math.PI * 2,
        color: getRandomColor(),
        opacity: Math.random() * 0.2 + 0.05,
        blur: Math.random() * 30 + 10,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        amplitude: Math.random() * 50 + 20,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Update the background animation and colors

    // Change the color palette to teal/blue
    function getRandomColor() {
      // Updated color palette - Professional blues and teals
      const colors = [
        theme === "dark" ? "#0f766e" : "#5eead4", // Teal
        theme === "dark" ? "#0e7490" : "#67e8f9", // Cyan
        theme === "dark" ? "#0369a1" : "#7dd3fc", // Light Blue
        theme === "dark" ? "#1d4ed8" : "#93c5fd", // Blue
        theme === "dark" ? "#1e40af" : "#60a5fa", // Royal Blue
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Draw flowing element with parallax effect
    function drawFlowElement(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      z: number,
      size: number,
      shape: string,
      rotation: number,
      color: string,
      opacity: number,
      blur: number,
      parallaxX: number,
      parallaxY: number,
      scrollParallax: number,
    ) {
      // Apply parallax effect based on depth (z)
      const parallaxFactor = 1 / (z + 1)
      const adjustedX = x + parallaxX * parallaxFactor
      const adjustedY = y + parallaxY * parallaxFactor + scrollParallax * parallaxFactor

      ctx.save()
      ctx.translate(adjustedX, adjustedY)
      ctx.rotate(rotation)

      // Create gradient
      let gradient
      if (shape === "line") {
        gradient = ctx.createLinearGradient(-size, 0, size, 0)
      } else {
        gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      }

      // Get color components for gradient
      const baseColor = color
      const r = Number.parseInt(baseColor.slice(1, 3), 16)
      const g = Number.parseInt(baseColor.slice(3, 5), 16)
      const b = Number.parseInt(baseColor.slice(5, 7), 16)

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 1.5})`)
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

      ctx.fillStyle = gradient
      ctx.globalAlpha = opacity
      ctx.filter = `blur(${blur}px)`

      // Draw shape
      switch (shape) {
        case "square":
          ctx.fillRect(-size / 2, -size / 2, size, size)
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -size / 2)
          ctx.lineTo(size / 2, size / 2)
          ctx.lineTo(-size / 2, size / 2)
          ctx.closePath()
          ctx.fill()
          break
        case "hexagon":
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const hx = Math.cos(angle) * (size / 2)
            const hy = Math.sin(angle) * (size / 2)
            if (i === 0) ctx.moveTo(hx, hy)
            else ctx.lineTo(hx, hy)
          }
          ctx.closePath()
          ctx.fill()
          break
        case "line":
          ctx.lineWidth = size / 4
          ctx.strokeStyle = gradient
          ctx.beginPath()
          ctx.moveTo(-size, 0)
          ctx.lineTo(size, 0)
          ctx.stroke()
          break
        case "circle":
        default:
          ctx.beginPath()
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
      }

      ctx.restore()
    }

    // Mouse interaction
    let mouseTimeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen for parallax
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const newX = e.clientX - centerX
      const newY = e.clientY - centerY

      // Update motion values for parallax
      mouseX.set(newX)
      mouseY.set(newY)

      // Update regular mouse position for other effects
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationFrameId: number
    let time = 0
    let lastScrollY = window.scrollY

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get current parallax values
      const currentParallaxX = smoothMouseX.get()
      const currentParallaxY = smoothMouseY.get()

      // Get scroll-based parallax
      const scrollDiff = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      const scrollParallax = window.scrollY * 0.2

      // Sort elements by z-index for proper layering
      const sortedElements = [...flowElements].sort((a, b) => b.z - a.z)

      // Update and draw flowing elements
      for (let i = 0; i < sortedElements.length; i++) {
        const element = sortedElements[i]

        // Update position with flowing movement
        element.phase += element.speed * 0.02

        // Calculate new position with sine wave motion
        const flowX = Math.sin(element.phase + i) * element.amplitude
        const flowY = Math.cos(element.phase * 0.7 + i * 0.5) * (element.amplitude * 0.5)

        element.x += Math.cos(element.angle) * element.speed
        element.y += Math.sin(element.angle) * element.speed
        element.rotation += element.rotationSpeed

        // Add sine wave motion
        const waveX = flowX
        const waveY = flowY

        // Mouse interaction - gentle attraction/repulsion
        if (isMouseMoving) {
          const dx = mousePosition.x - element.x
          const dy = mousePosition.y - element.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 300

          if (distance < maxDistance) {
            const force = ((maxDistance - distance) / maxDistance) * 0.02
            const angle = Math.atan2(dy, dx)
            // Alternate between attraction and repulsion based on element index
            const direction = i % 2 === 0 ? 1 : -1
            element.angle += Math.sin(angle) * force * direction
          }
        }

        // Boundary check with wrap-around
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size

        // Draw element with parallax and flow motion
        drawFlowElement(
          ctx,
          element.x + waveX,
          element.y + waveY,
          element.z,
          element.size,
          element.shape,
          element.rotation,
          element.color,
          element.opacity,
          element.blur,
          currentParallaxX,
          currentParallaxY,
          scrollParallax,
        )
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(mouseTimeout)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, mouseX, mouseY, smoothMouseX, smoothMouseY])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
        style={{ opacity: 0.7 }}
      />

      {/* Update the background gradient colors in the parallax layers */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        {/* Far background layer - subtle grid pattern */}
        <motion.div
          className="absolute -inset-[10%] opacity-20 dark:opacity-10"
          style={{
            x: layer3X,
            y: layer3Y,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="none"/%3E%3Cpath d="M0 0h50v50H0z" fill="none" stroke="%2314b8a6" strokeWidth="0.5" strokeOpacity="0.2"/%3E%3Cpath d="M50 0h50v50H50z" fill="none" stroke="%2314b8a6" strokeWidth="0.5" strokeOpacity="0.2"/%3E%3Cpath d="M0 50h50v50H0z" fill="none" stroke="%2314b8a6" strokeWidth="0.5" strokeOpacity="0.2"/%3E%3Cpath d="M50 50h50v50H50z" fill="none" stroke="%2314b8a6" strokeWidth="0.5" strokeOpacity="0.2"/%3E%3C/svg%3E")',
            backgroundSize: "100px 100px",
            width: "120%",
            height: "120%",
          }}
        />
      </motion.div>

      {/* Mid-ground parallax layer - gradient orbs */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          y: midgroundY,
          x: layer2X,
        }}
      >
        {/* Gradient orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundImage:
                theme === "dark"
                  ? `radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, rgba(20, 184, 166, 0) 70%)`
                  : `radial-gradient(circle, rgba(94, 234, 212, 0.2) 0%, rgba(94, 234, 212, 0) 70%)`,
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Foreground parallax layer - flowing lines */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          y: foregroundY,
          x: layer1X,
        }}
      >
        {/* Flowing lines */}
        {[...Array(5)].map((_, i) => {
          const isVertical = i % 2 === 0
          return (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-teal-500/20 to-transparent dark:from-teal-700/20"
              style={{
                width: isVertical ? "2px" : "40%",
                height: isVertical ? "40%" : "2px",
                left: isVertical ? `${20 + i * 15}%` : `${10 + i * 10}%`,
                top: isVertical ? `${10 + i * 10}%` : `${30 + i * 15}%`,
                filter: "blur(1px)",
              }}
              animate={{
                x: isVertical ? [0, 20, -10, 0] : [0, 50, -30, 0],
                y: isVertical ? [0, 50, -30, 0] : [0, 20, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          )
        })}
      </motion.div>

      {/* Gradient overlay for depth */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage:
            theme === "dark"
              ? "radial-gradient(circle at center, transparent 0%, rgba(17, 24, 39, 0.7) 100%)"
              : "radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.7) 100%)",
        }}
      />
    </>
  )
}
