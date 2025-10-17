"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

interface ParallaxProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  offset?: number
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  offset = 0,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform based on direction
  const transformUp = useTransform(scrollYProgress, [0, 1], [`${offset}%`, `${-100 * speed + offset}%`])
  const transformDown = useTransform(scrollYProgress, [0, 1], [`${offset}%`, `${100 * speed + offset}%`])
  const transformLeft = useTransform(scrollYProgress, [0, 1], [`${offset}%`, `${-100 * speed + offset}%`])
  const transformRight = useTransform(scrollYProgress, [0, 1], [`${offset}%`, `${100 * speed + offset}%`])

  let y: MotionValue<string> | undefined = undefined
  let x: MotionValue<string> | undefined = undefined

  if (direction === "up") {
    y = transformUp
  } else if (direction === "down") {
    y = transformDown
  } else if (direction === "left") {
    x = transformLeft
  } else if (direction === "right") {
    x = transformRight
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, x }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
