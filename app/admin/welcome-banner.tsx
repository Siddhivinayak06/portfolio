"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function WelcomeBanner() {
    const [greeting, setGreeting] = useState("Welcome back")
    const [date, setDate] = useState("")

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting("Good morning")
        else if (hour < 18) setGreeting("Good afternoon")
        else setGreeting("Good evening")

        setDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 p-6 text-white shadow-xl h-full flex flex-col justify-center"
        >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1"
                >
                    {date}
                </motion.div>
                <h1 className="text-2xl md:text-4xl font-bold mb-1">
                    {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Siddhivinayak</span>
                </h1>
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                    Here's what's happening in your portfolio today. You have new activity to review.
                </p>
            </div>
        </motion.div>
    )
}
