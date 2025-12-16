"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import WaveBackground from "./wave-background"
import { Code } from "lucide-react"

import { SkillItem } from "@/lib/data"
import { IconMap } from "@/lib/icons"

// Circular progress component
const CircularProgress = ({ percentage, color, size = 120, icon: Icon, iconColor }: { percentage: number; color: string; size?: number; icon: any; iconColor: string }) => {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
      {/* Center icon instead of percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{ color: iconColor }}>
          {Icon && <Icon className="h-8 w-8" />}
        </div>
      </div>
    </div>
  )
}

// Skill card component
const SkillCard = ({ skill, index, isInView }: { skill: SkillItem; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = IconMap[skill.iconName] || Code

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center text-center relative overflow-hidden"
        whileHover={{
          y: -10,
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`,
          }}
        />

        {/* Skill name */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{skill.name}</h3>

        {/* Circular progress */}
        <div className="mb-4">
          <CircularProgress percentage={skill.level} color={skill.color} size={100} icon={Icon} iconColor={skill.color} />
        </div>

        {/* Skill level text */}
        <motion.div
          className="text-sm text-gray-600 dark:text-gray-400"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {skill.level >= 85
            ? "Expert"
            : skill.level >= 75
              ? "Advanced"
              : skill.level >= 65
                ? "Intermediate"
                : "Beginner"}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills({ skills }: { skills: SkillItem[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="skills"
      className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      ref={ref}
    >
      <WaveBackground
        sectionId="skills"
        color1="rgba(126, 34, 206, 0.05)"
        color2="rgba(219, 39, 119, 0.05)"
        height={100}
        speed={0.08}
        frequency={0.015}
      />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Technical Skills</h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My expertise spans across various technologies and frameworks, with a focus on modern web development and
            user experience.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skills && skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
