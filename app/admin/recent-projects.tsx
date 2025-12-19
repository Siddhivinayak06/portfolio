"use client"

import { motion } from "framer-motion"
import { ProjectItem } from "@/lib/data"
import { ArrowRight, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RecentProjects({ projects }: { projects: ProjectItem[] }) {
    return (
        <div className="h-full rounded-3xl bg-white border border-gray-100 dark:bg-white/5 dark:backdrop-blur-lg dark:border-white/10 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Projects</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Latest additions</p>
                </div>
                <Link href="/admin/projects" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-all">
                    View All
                </Link>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
                {projects.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500 text-sm">No projects yet.</div>
                ) : (
                    projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/10"
                        >
                            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-gray-100 dark:border-white/10 shrink-0 shadow-sm">
                                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{project.title}</h3>
                                <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate opacity-80">{project.tags.join(" • ")}</p>
                            </div>
                            <Link href={`/projects/${project.id}`} target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-purple-100 hover:text-purple-600 dark:bg-white/5 dark:text-gray-500 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-all opacity-0 group-hover:opacity-100">
                                <Eye className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}
