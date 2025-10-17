"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Card3DProps {
  children: ReactNode
  className?: string
  depth?: number
  backgroundGradient?: boolean
}

export function Card3D({ children, className = "", depth = 30, backgroundGradient = true }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out the mouse tracking with springs
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [depth, -depth]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-depth, depth]), springConfig)

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: hovering ? rotateX : 0,
          rotateY: hovering ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{
          rotateX: { duration: 0.2 },
          rotateY: { duration: 0.2 },
        }}
        className="w-full h-full"
      >
        {/* Main content */}
        <div className="w-full h-full relative z-10">{children}</div>

        {/* 3D effect elements */}
        {backgroundGradient && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-0"
            style={{
              rotateX: hovering ? rotateX : 0,
              rotateY: hovering ? rotateY : 0,
              translateZ: "-20px",
            }}
          />
        )}

        {/* Highlight effect */}
        {hovering && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-white/10 dark:bg-white/5 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundImage: "linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
