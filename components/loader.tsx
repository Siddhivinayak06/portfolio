"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can replace this with actual loading logic)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" className="mb-8">
              <motion.circle cx="60" cy="60" r="50" fill="none" stroke="rgba(156, 39, 176, 0.2)" strokeWidth="8" />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{
                  pathLength: 1,
                  rotate: 360,
                  transition: {
                    pathLength: { duration: 2, ease: "easeInOut" },
                    rotate: { duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY },
                  },
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9c27b0" />
                  <stop offset="100%" stopColor="#e91e63" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Loading Portfolio
            </motion.div>

            <motion.div
              className="mt-4 flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: dot * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
