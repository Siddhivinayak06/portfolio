"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import WaveBackground from "./wave-background"
import { Code, Palette, Database, Server, Smartphone, Cloud } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const expertiseAreas = [
    { icon: <Code className="h-6 w-6" />, label: "Frontend", color: "#9c27b0" },
    { icon: <Server className="h-6 w-6" />, label: "Backend", color: "#651fff" },
    { icon: <Smartphone className="h-6 w-6" />, label: "Mobile", color: "#e91e63" },
    { icon: <Database className="h-6 w-6" />, label: "Database", color: "#ff9800" },
    { icon: <Palette className="h-6 w-6" />, label: "UI/UX", color: "#00bcd4" },
    { icon: <Cloud className="h-6 w-6" />, label: "DevOps", color: "#4caf50" },
  ]

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={ref}>
      <WaveBackground
        sectionId="about"
        color1="rgba(126, 34, 206, 0.1)"
        color2="rgba(219, 39, 119, 0.1)"
        height={120}
        speed={0.1}
      />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl" variants={itemVariants}>
            About Me
          </motion.h2>
          <motion.div
            className="mt-4 h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded"
            variants={itemVariants}
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative h-[28rem] md:h-[28rem] w-96 md:w-[34rem] rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 "></div>
            <motion.div
              initial={{ scale: 1.2 }}
              animate={isInView ? { scale: 1 } : { scale: 1.2 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full"
            >
              <Image src="/images/Profile.png" alt="Profile" fill className="object-cover" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I’m a Full Stack Developer driven by the art of transforming ideas into impactful digital experiences. With years of experience in modern web technologies and a background in computer science, I focus on building responsive, accessible, and high-performing applications that users love.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              My development philosophy revolves around clean architecture, maintainable code, and continuous learning. I enjoy collaborating with teams to build meaningful products that solve real-world problems and deliver lasting value.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Beyond the screen, I spend my time hiking, reading tech blogs, and experimenting with emerging technologies to stay inspired and innovative.
            </p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">My Expertise</h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {expertiseAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center group"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-full mb-2 transition-all duration-300 group-hover:shadow-lg dark:bg-gray-800"
                      style={{
                        backgroundColor: `${area.color}20`,
                        color: area.color,
                      }}
                    >
                      {area.icon}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{area.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
