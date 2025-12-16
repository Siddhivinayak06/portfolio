"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    // Show cursor immediately
    setIsVisible(true)

    const mouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX,
        y: e.clientY,
      }

      setMousePosition(newPosition)

      // Update trail positions
      setTrailPositions((prev) => {
        const newTrail = [newPosition, ...prev.slice(0, 5)]
        return newTrail
      })
    }

    const mouseDown = () => setCursorVariant("click")
    const mouseUp = () => setCursorVariant("default")

    const handleLinkHover = () => setCursorVariant("hover")
    const handleButtonHover = () => setCursorVariant("button")
    const handleLinkLeave = () => setCursorVariant("default")

    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    // Add event listeners to all interactive elements
    const links = document.querySelectorAll('a, [role="link"]')
    const buttons = document.querySelectorAll('button, [role="button"], input[type="button"], input[type="submit"]')
    const inputs = document.querySelectorAll('input:not([type="button"]):not([type="submit"]), textarea, select')

    links.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    buttons.forEach((el) => {
      el.addEventListener("mouseenter", handleButtonHover)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    inputs.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)

      links.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })

      buttons.forEach((el) => {
        el.removeEventListener("mouseenter", handleButtonHover)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })

      inputs.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  // Cursor variants for different states
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(147, 51, 234, 0)", // transparent purple
      border: "2px solid rgba(147, 51, 234, 0.5)",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(236, 72, 153, 0)", // transparent pink
      border: "2px solid rgba(236, 72, 153, 0.8)",
    },
    button: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      border: "2px solid rgba(147, 51, 234, 0.8)",
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(236, 72, 153, 0.4)",
      border: "2px solid rgba(236, 72, 153, 0)",
    },
  }

  // Cursor dot variants
  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(156, 39, 176, 0.8)",
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(233, 30, 99, 0.8)",
    },
    button: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      height: 12,
      width: 12,
      backgroundColor: "rgba(156, 39, 176, 1)",
    },
    click: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(233, 30, 99, 1)",
    },
  }

  if (!isVisible) return null

  return (
    <>
      <style jsx global>{`
      @media (pointer: coarse) {
        .cursor-dot, .cursor { display: none !important; }
      }
    `}</style>
      {/* Cursor trails */}
      {trailPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
          animate={{
            x: pos.x - 3,
            y: pos.y - 3,
            opacity: 1 - i * 0.15,
            scale: 1 - i * 0.1,
          }}
          transition={{ duration: 0 }}
          style={{
            width: 6,
            height: 6,
            backgroundColor: `rgba(147, 51, 234, ${0.5 - i * 0.08})`, // Purple
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-purple-600 mix-blend-normal"
        variants={dotVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-2 border-purple-500 mix-blend-normal"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.8,
        }}
      />
    </>
  )
}
