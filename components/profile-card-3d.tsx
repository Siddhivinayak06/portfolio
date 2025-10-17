"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, Code, Server, Database, Globe, Sparkles, User, Award } from "lucide-react"
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

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isAnimating) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate rotation based on mouse position relative to card center
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 20
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -20

    // Track mouse position for shine effect
    const mouseX = (e.clientX - rect.left) / rect.width
    const mouseY = (e.clientY - rect.top) / rect.height

    setMousePosition({ x: mouseX, y: mouseY })
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovering(false)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  // Toggle card flip with enhanced animation
  const handleFlip = async () => {
    if (isAnimating) return

    setIsAnimating(true)

    if (!isFlipped) {
      // Flip to back
      await frontControls.start({
        scale: [1, 1.05, 0.95],
        rotateY: [0, 90],
        transition: { duration: 0.4 },
      })
      setIsFlipped(true)
      await backControls.start({
        rotateY: [270, 360],
        scale: [0.95, 1.05, 1],
        transition: { duration: 0.4 },
      })
    } else {
      // Flip to front
      await backControls.start({
        scale: [1, 1.05, 0.95],
        rotateY: [360, 270],
        transition: { duration: 0.4 },
      })
      setIsFlipped(false)
      await frontControls.start({
        rotateY: [90, 0],
        scale: [0.95, 1.05, 1],
        transition: { duration: 0.4 },
      })
    }

    setIsAnimating(false)
  }

  // Reset flip state when clicking outside the card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node) && isFlipped) {
        handleFlip()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isFlipped])

  // Initialize animation controls
  useEffect(() => {
    frontControls.set({ rotateY: 0 })
    backControls.set({ rotateY: 270 })
  }, [frontControls, backControls])

  // Floating animation for the card
  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
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
        {/* Front of card - Rounded rectangle */}
        <motion.div
          className="absolute w-full h-full backface-hidden overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
          animate={frontControls}
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 0 : rotateY,
            opacity: isFlipped ? 0 : 1,
          }}
          onClick={!isFlipped ? handleFlip : undefined}
        >
          <div className="relative w-full h-full">
            {/* Dynamic background with animated gradient */}
            <motion.div
              className="absolute inset-0 z-0 rounded-2xl"
              animate={{
                backgroundImage: [
                  "linear-gradient(135deg, #0e7490 0%, #0369a1 50%, #1d4ed8 100%)",
                  "linear-gradient(225deg, #1d4ed8 0%, #0e7490 50%, #0369a1 100%)",
                  "linear-gradient(315deg, #0369a1 0%, #1d4ed8 50%, #0e7490 100%)",
                  "linear-gradient(45deg, #0e7490 0%, #0369a1 50%, #1d4ed8 100%)",
                ],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden z-0 rounded-2xl">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Profile image container */}
            <div className="relative w-full h-full p-6 flex flex-col justify-center items-center z-10">
              {/* Profile image with circular frame */}
              <motion.div
                className="relative w-32 h-32 mb-4"
                animate={{
                  scale: isHovering ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/80 shadow-xl">
                  <Image
                    src="/images/profile.png"
                    alt="Siddhivinayak Sawant - Full Stack Developer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Rotating ring around profile */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/40"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    borderStyle: "dashed",
                  }}
                />
              </motion.div>

              {/* Name and title */}
              <motion.div
                className="text-center text-white z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-1">Siddhivinayak Sawant</h3>
                <p className="text-blue-100 text-sm mb-3">Full Stack Developer</p>
                <div className="flex items-center justify-center gap-2 text-xs text-blue-200">
                  <User className="h-3 w-3" />
                  <span>5+ Years Experience</span>
                </div>
              </motion.div>

              {/* Skill indicators */}
              <motion.div
                className="flex gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {[
                  { icon: <Code className="h-3 w-3" />, label: "Frontend" },
                  { icon: <Server className="h-3 w-3" />, label: "Backend" },
                  { icon: <Database className="h-3 w-3" />, label: "Database" },
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill.icon}
                    <span className="text-xs text-white">{skill.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Shine effect overlay */}
              {isHovering && (
                <motion.div
                  className="absolute inset-0 z-30 pointer-events-none rounded-2xl"
                  style={{
                    backgroundImage: `linear-gradient(${mousePosition.x * 180}deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)`,
                    backgroundSize: "200% 200%",
                    backgroundPosition: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              )}

              {/* Flip indicator */}
              <motion.div
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white shadow-lg z-20"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Back of card - Rounded rectangle */}
        <motion.div
          className="absolute w-full h-full backface-hidden overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
          animate={backControls}
          style={{
            rotateX: isFlipped ? rotateX : 0,
            rotateY: isFlipped ? rotateY : 0,
            opacity: isFlipped ? 1 : 0,
          }}
          onClick={isFlipped ? handleFlip : undefined}
        >
          <div className="w-full h-full">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 z-0 rounded-2xl"
              animate={{
                backgroundImage: [
                  "linear-gradient(135deg, #0891b2 0%, #0d9488 50%, #0284c7 100%)",
                  "linear-gradient(225deg, #0284c7 0%, #0891b2 50%, #0d9488 100%)",
                  "linear-gradient(315deg, #0d9488 0%, #0284c7 50%, #0891b2 100%)",
                  "linear-gradient(45deg, #0891b2 0%, #0d9488 50%, #0284c7 100%)",
                ],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />

            {/* Content container with glass effect */}
            <div className="relative w-full h-full p-6 flex flex-col justify-between backdrop-blur-sm bg-white/10 z-10 rounded-2xl">
              <motion.div
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="h-16 w-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center border-2 border-white/30"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.4)",
                      "0 0 0 8px rgba(255,255,255,0)",
                      "0 0 0 0 rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Award className="h-8 w-8 text-white" />
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="text-lg font-bold text-white mb-2"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255,255,255,0.5)",
                      "0 0 15px rgba(255,255,255,0.5)",
                      "0 0 5px rgba(255,255,255,0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  Siddhivinayak Sawant
                </motion.h3>

                <p className="text-teal-100 mb-3 text-sm">Full Stack Developer</p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-4">
                  <p className="text-white/90 text-xs leading-relaxed">
                    Passionate about creating beautiful, functional applications with cutting-edge technologies and
                    exceptional user experiences.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-3 my-3 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isFlipped ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {[
                  { icon: <Code className="h-5 w-5 text-white mb-1" />, label: "React/Next.js", level: "Expert" },
                  { icon: <Server className="h-5 w-5 text-white mb-1" />, label: "Node.js", level: "Advanced" },
                  { icon: <Database className="h-5 w-5 text-white mb-1" />, label: "MongoDB", level: "Advanced" },
                  { icon: <Globe className="h-5 w-5 text-white mb-1" />, label: "Cloud/AWS", level: "Intermediate" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-lg flex flex-col items-center border border-white/20"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transition: { duration: 0.2 },
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isFlipped ? 1 : 0,
                      y: isFlipped ? 0 : 20,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + index * 0.1,
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -2, 0],
                        rotate: [0, 2, 0, -2, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        delay: index * 0.5,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-white text-xs font-medium">{item.label}</span>
                    <span className="text-teal-200 text-xs">{item.level}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex justify-center space-x-4 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {[
                  { icon: <Github className="h-4 w-4" />, href: "https://github.com", color: "hover:bg-gray-600/30" },
                  {
                    icon: <Linkedin className="h-4 w-4" />,
                    href: "https://linkedin.com",
                    color: "hover:bg-blue-600/30",
                  },
                  {
                    icon: <Mail className="h-4 w-4" />,
                    href: "mailto:contact@example.com",
                    color: "hover:bg-red-600/30",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.2,
                      y: -3,
                      transition: { duration: 0.2 },
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: isFlipped ? 1 : 0,
                      scale: isFlipped ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.1,
                    }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-white/10 ${item.color} p-3 rounded-full text-white transition-all duration-300 block border border-white/20 backdrop-blur-sm`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.icon}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Flip back indicator */}
              <motion.div
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white shadow-lg z-20"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
