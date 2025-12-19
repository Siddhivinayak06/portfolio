"use client"

import { motion } from "framer-motion"

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
            className="space-y-8"
        >
            {children}
        </motion.div>
    )
}

export function WrappedItem({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            className={`h-full ${className}`}
        >
            {children}
        </motion.div>
    )
}
