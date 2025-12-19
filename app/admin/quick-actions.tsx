"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Briefcase, Code, GraduationCap } from "lucide-react"

export default function QuickActions() {
    const actions = [
        {
            label: "New Project",
            href: "/admin/projects/new",
            icon: Briefcase,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-100 dark:bg-blue-500/10",
            border: "group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50",
            desc: "Showcase a new work"
        },
        {
            label: "New Skill",
            href: "/admin/skills/new",
            icon: Code,
            color: "text-green-600 dark:text-green-400",
            bg: "bg-green-100 dark:bg-green-500/10",
            border: "group-hover:border-green-500/50 dark:group-hover:border-green-400/50",
            desc: "Add a technology"
        },
        {
            label: "New Education",
            href: "/admin/education/new",
            icon: GraduationCap,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-100 dark:bg-purple-500/10",
            border: "group-hover:border-purple-500/50 dark:group-hover:border-purple-400/50",
            desc: "Update details"
        },
    ]

    return (
        <section className="h-full flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center shrink-0">
                <Plus className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                {actions.map((action, index) => {
                    const Icon = action.icon
                    return (
                        <motion.div
                            key={action.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={action.href}>
                                <div className={`group relative p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 ${action.border} border-transparent hover:border-purple-500/20 dark:hover:border-purple-400/20`}>
                                    <div className="flex items-center gap-3.5">
                                        <div className={`p-2.5 rounded-xl ${action.bg} ${action.color} ring-1 ring-inset ring-black/5 dark:ring-white/5 transition-transform group-hover:rotate-6 duration-300`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
                                                {action.label}
                                            </h3>
                                            <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 opacity-80">
                                                {action.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
