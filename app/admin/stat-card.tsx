"use client"

import { motion } from "framer-motion"
import {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  ArrowUpRight,
} from "lucide-react"

const ICONS = {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
}

type IconName = keyof typeof ICONS

interface StatCardProps {
  name: string
  value: number | string
  iconName: IconName
  color: string
  bg: string
  border: string
  index?: number
}

export default function StatCard({
  name,
  value,
  iconName,
  color,
  bg,
  border,
  index = 0,
}: StatCardProps) {
  const Icon = ICONS[iconName]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: "easeOut",
      }}
      className={`relative rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-white/5 ${border}`}
    >
      {/* Hover Arrow */}
      <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Icon */}
      <div
        className={`mb-4 inline-flex rounded-xl p-2.5 ring-1 ${bg} ${color} ${border} dark:ring-0`}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </div>
        <div className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          {name}
        </div>
      </div>
    </motion.div>
  )
}
