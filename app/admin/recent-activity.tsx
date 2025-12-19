"use client"

import { motion } from "framer-motion"
import { ProjectItem, MessageItem } from "@/lib/data"
import { ArrowRight, Clock, Github, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface RecentActivityProps {
    projects: ProjectItem[]
    messages: MessageItem[]
}

export default function RecentActivity({ projects, messages }: RecentActivityProps) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent Projects */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest work you've added</p>
                    </div>
                    <Link href="/admin/projects" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center transition-colors">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="grid gap-4">
                    {projects.length === 0 ? (
                        <div className="p-8 text-center rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-gray-500 bg-white/50 dark:bg-white/5">
                            No projects yet.
                        </div>
                    ) : (
                        projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-white/5 dark:backdrop-blur-lg dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20"
                            >
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 shrink-0">
                                    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 truncate pr-4">{project.title}</h3>
                                    <div className="flex flex-wrap gap-2 mt-1.5">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full dark:bg-white/10 dark:text-gray-300 border border-gray-200 dark:border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link href={`/projects/${project.id}`} target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-purple-100 hover:text-purple-600 dark:bg-white/5 dark:text-gray-500 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors shrink-0">
                                    <Eye className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>

            {/* Recent Messages */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
            >
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Latest Inquiries</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Recent messages from contact form</p>
                    </div>
                    <Link href="/admin/messages" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center transition-colors">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="grid gap-4">
                    {messages.length === 0 ? (
                        <div className="p-8 text-center rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-gray-500 bg-white/50 dark:bg-white/5">
                            No messages yet.
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <motion.div
                                key={msg._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-white/5 dark:backdrop-blur-lg dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 ring-4 ring-white dark:ring-white/5">
                                        <span className="font-bold">{msg.name.charAt(0)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{msg.name}</h3>
                                            <span className="text-[10px] font-medium text-gray-400 flex items-center bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-full">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1 line-clamp-1">
                                            {msg.subject}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                            {msg.message}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    )
}
