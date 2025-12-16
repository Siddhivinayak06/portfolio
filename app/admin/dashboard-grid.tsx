"use client"

import { motion } from "framer-motion"
import {
  Briefcase,
  Code,
  GraduationCap,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react"

/** ✅ Explicit icon registry */
const ICONS = {
  Briefcase,
  Code,
  GraduationCap,
} satisfies Record<string, LucideIcon>

type IconName = keyof typeof ICONS

interface DashboardStat {
  name: string
  value: number | string
  icon: IconName
  color: string
  bg: string
  border: string
}

interface DashboardGridProps {
  stats: DashboardStat[]
}

export default function DashboardGrid({ stats }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        /** ✅ Guaranteed React component */
        const IconComponent: LucideIcon = ICONS[stat.icon]

        return (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.45 }}
          >
            <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-white/5 group">
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-5 w-5 text-gray-400 dark:text-white/40" />
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`rounded-xl p-3 ring-1 ${stat.bg} ${stat.color} ${stat.border} dark:ring-0`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
