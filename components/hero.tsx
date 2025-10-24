"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TextReveal, MaskReveal } from "./text-reveal"
import Link from "next/link"
import { Github, Linkedin, Mail, ChevronDown, Download } from "lucide-react"
import ProfileCard3D from "./profile-card-3d"

// Magnetic icon component
const MagneticIcon = ({
  children,
  href,
  className,
}: { children: React.ReactNode; href: string; className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

      if (distance < 100) {
        const strength = Math.max(0, 1 - distance / 100)
        const x = (e.clientX - centerX) * strength * 0.3
        const y = (e.clientY - centerY) * strength * 0.3
        setPosition({ x, y })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <Link
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </Link>
  )
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  // Handle scroll for background animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Wave patterns background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Animated wave layers */}
        <div className="absolute inset-0">
          {/* Wave layer 1 - Large waves */}
          <motion.div
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
                fill="url(#wave1)"
                animate={{
                  d: [
                    "M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z",
                    "M0,450 C300,350 600,550 1200,450 L1200,800 L0,800 Z",
                    "M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                  <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Wave layer 2 - Medium waves */}
          <motion.div
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * -0.15}px)`,
            }}
          >
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M0,500 C200,400 400,600 800,500 C1000,450 1100,550 1200,500 L1200,800 L0,800 Z"
                fill="url(#wave2)"
                animate={{
                  d: [
                    "M0,500 C200,400 400,600 800,500 C1000,450 1100,550 1200,500 L1200,800 L0,800 Z",
                    "M0,550 C200,450 400,650 800,550 C1000,500 1100,600 1200,550 L1200,800 L0,800 Z",
                    "M0,500 C200,400 400,600 800,500 C1000,450 1100,550 1200,500 L1200,800 L0,800 Z",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <defs>
                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(20, 184, 166, 0.08)" />
                  <stop offset="100%" stopColor="rgba(6, 182, 212, 0.08)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Wave layer 3 - Small waves */}
          <motion.div
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * -0.08}px)`,
            }}
          >
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M0,600 C150,550 300,650 450,600 C600,550 750,650 900,600 C1050,550 1150,650 1200,600 L1200,800 L0,800 Z"
                fill="url(#wave3)"
                animate={{
                  d: [
                    "M0,600 C150,550 300,650 450,600 C600,550 750,650 900,600 C1050,550 1150,650 1200,600 L1200,800 L0,800 Z",
                    "M0,650 C150,600 300,700 450,650 C600,600 750,700 900,650 C1050,600 1150,700 1200,650 L1200,800 L0,800 Z",
                    "M0,600 C150,550 300,650 450,600 C600,550 750,650 900,600 C1050,550 1150,650 1200,600 L1200,800 L0,800 Z",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
              <defs>
                <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(6, 182, 212, 0.06)" />
                  <stop offset="100%" stopColor="rgba(14, 165, 233, 0.06)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Top wave decorations */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M0,0 L1200,0 L1200,200 C900,250 600,150 300,200 C200,220 100,180 0,200 Z"
                fill="url(#topWave)"
                animate={{
                  d: [
                    "M0,0 L1200,0 L1200,200 C900,250 600,150 300,200 C200,220 100,180 0,200 Z",
                    "M0,0 L1200,0 L1200,180 C900,230 600,130 300,180 C200,200 100,160 0,180 Z",
                    "M0,0 L1200,0 L1200,200 C900,250 600,150 300,200 C200,220 100,180 0,200 Z",
                  ],
                }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
              <defs>
                <linearGradient id="topWave" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(99, 102, 241, 0.05)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Floating wave particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-300/30 dark:bg-blue-600/20"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Ripple effects */}
          <div className="absolute inset-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-teal-300/20 dark:border-teal-600/10"
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: i * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/30 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/30" />
      </div>

      {/* Content */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-4"
            >
              <MaskReveal
                text="Hello, I'm"
                className="text-xl text-gray-600 dark:text-gray-400 font-medium"
                delay={1.0}
              />
            </motion.div>

            <div className="mb-6">
              <TextReveal
                text="Siddhivinayak Sawant"
                className="text-4xl sm:text-5xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400"
                delay={1.3}
              />
            </div>

            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 rounded mb-6 mx-auto lg:mx-0"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 96, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            />

            <motion.div
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10 mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              A passionate <span className="text-blue-600 dark:text-blue-400 font-semibold">Full Stack Developer</span>{" "}
              specializing in building exceptional digital experiences with modern web technologies.
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 group"
                onClick={scrollToProjects}
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                asChild
              >
                <a href="/cv.pdf" download="CV.pdf" className="inline-flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex gap-4 mt-10 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.3 }}
            >
              <MagneticIcon
                href="https://github.com/Siddhivinayak06"
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Github className="h-5 w-5" />
              </MagneticIcon>
              <MagneticIcon
                href="https://www.linkedin.com/in/siddhivinayaksawant"
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Linkedin className="h-5 w-5" />
              </MagneticIcon>
              <MagneticIcon
                href="mailto:siddhivinyaksawant04@gmail.com"
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Mail className="h-5 w-5" />
              </MagneticIcon>
            </motion.div>
          </div>

          {/* 3D Profile Card */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-64 h-64 md:w-80 md:h-80"
            >
              <ProfileCard3D className="w-full h-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.5,
          duration: 0.8,
          ease: "easeOut",
        }}
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
