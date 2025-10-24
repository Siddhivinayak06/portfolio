"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, Code, Server, Database, Globe, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

interface ProfileCard3DProps {
  className?: string
}

export default function ProfileCard3D({ className = "" }: ProfileCard3DProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const frontControls = useAnimation()
  const backControls = useAnimation()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 25
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -25
    const mouseX = (e.clientX - rect.left) / rect.width
    const mouseY = (e.clientY - rect.top) / rect.height
    setMousePosition({ x: mouseX, y: mouseY })
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    performFlip(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
    performFlip(false)
  }

  const performFlip = async (flipToBack: boolean) => {
    if (isAnimating) return
    setIsAnimating(true)

    if (flipToBack && !isFlipped) {
      await frontControls.start({
        scale: [1, 1.05, 0.95],
        rotateY: [0, 90],
        opacity: [1, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      })
      setIsFlipped(true)
      await backControls.start({
        rotateY: [270, 360],
        scale: [0.95, 1.05, 1],
        opacity: [0, 1],
        transition: { duration: 0.6, ease: "easeInOut" },
      })
    } else if (!flipToBack && isFlipped) {
      await backControls.start({
        scale: [1, 1.05, 0.95],
        rotateY: [360, 270],
        opacity: [1, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      })
      setIsFlipped(false)
      await frontControls.start({
        rotateY: [90, 0],
        scale: [0.95, 1.05, 1],
        opacity: [0, 1],
        transition: { duration: 0.6, ease: "easeInOut" },
      })
    }

    setIsAnimating(false)
  }

  useEffect(() => {
    frontControls.set({ rotateY: 0, opacity: 1 })
    backControls.set({ rotateY: 270, opacity: 0 })
  }, [frontControls, backControls])

  const floatingAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={isAnimating ? {} : floatingAnimation}
    >
      <div className="relative w-full h-full preserve-3d">
        {/* Front of card */}
        <motion.div
          className="absolute w-full h-full backface-hidden overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
          animate={frontControls}
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 0 : rotateY,
          }}
        >
          <div className="relative w-full h-full">
            <div className="relative w-full h-full p-0 flex items-center justify-center z-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl overflow-hidden">
              <Image
                src="/images/profile.png"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute w-full h-full backface-hidden overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
          animate={backControls}
          style={{
            rotateX: rotateX,
            rotateY: rotateY + 180,
          }}
        >
          {/* Base solid background */}
          <div className="absolute inset-0 bg-blue-600 rounded-3xl" />

          {/* Animated gradient */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              backgroundImage: [
                "linear-gradient(135deg, #3b82f6 0%, #60a5fa 25%, #2563eb 50%, #1d4ed8 75%, #1e3a8a 100%)",
                "linear-gradient(225deg, #60a5fa 0%, #3b82f6 25%, #2563eb 50%, #1d4ed8 75%, #1e3a8a 100%)",
                "linear-gradient(315deg, #2563eb 0%, #60a5fa 25%, #3b82f6 50%, #1d4ed8 75%, #1e3a8a 100%)",
                "linear-gradient(45deg, #1d4ed8 0%, #2563eb 25%, #3b82f6 50%, #60a5fa 75%, #1e3a8a 100%)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "loop" }}
          />

          {/* Overlay to unify transparency */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/5 rounded-3xl" />

          {/* Content container */}
          <div className="relative w-full h-full p-4 flex flex-col justify-between backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 z-10 overflow-hidden">
            {/* Header */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                <Image src="/images/profile.png" alt="Profile" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Siddhivinayak Sawant</h3>
              <p className="text-teal-100 text-sm font-semibold flex items-center justify-center gap-1">
                <Zap className="h-3 w-3 text-yellow-300" /> Full Stack Developer <Zap className="h-3 w-3 text-yellow-300" />
              </p>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-1 mt-2">
              {[
                { icon: <Code />, label: "React/Next.js", level: 95 },
                { icon: <Server />, label: "Node.js", level: 85 },
                { icon: <Database />, label: "MongoDB", level: 80 },
                { icon: <Globe />, label: "AWS/Cloud", level: 75 },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-1.5 border border-white/20">
                  <div className="flex items-center gap-1 mb-0.5">
                    {item.icon}
                    <span className="text-white text-xs font-bold">{item.label}</span>
                  </div>
                  <div className="w-full h-1 bg-white/20 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-2 mt-2">
              <Link href="https://github.com" target="_blank">
                <Github className="h-4 w-4 text-white/90 hover:text-white/100 transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="h-4 w-4 text-white/90 hover:text-white/100 transition-colors" />
              </Link>
              <Link href="mailto:contact@example.com">
                <Mail className="h-4 w-4 text-white/90 hover:text-white/100 transition-colors" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
