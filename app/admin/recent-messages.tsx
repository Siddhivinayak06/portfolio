"use client"

import { motion } from "framer-motion"
import { MessageItem } from "@/lib/data"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export default function RecentMessages({ messages }: { messages: MessageItem[] }) {
    return (
        <div className="h-full rounded-3xl bg-white border border-gray-100 dark:bg-white/5 dark:backdrop-blur-lg dark:border-white/10 p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Latest Inquiries</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Recent contacts</p>
                </div>
                <Link href="/admin/messages" className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-all">
                    View All
                </Link>
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500 text-sm">No messages yet.</div>
                ) : (
                    messages.map((msg, i) => (
                        <motion.div
                            key={msg._id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-white/10"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 text-xs font-bold shadow-sm ring-2 ring-white dark:ring-white/5">
                                {msg.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">{msg.name}</h3>
                                    <span className="text-[9px] font-medium text-gray-400 bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded-full">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">
                                    {msg.subject}
                                </p>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}
