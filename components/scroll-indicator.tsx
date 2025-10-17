"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 2.5,
        duration: 0.8,
        ease: "easeOut",
      }}
      onClick={scrollToNextSection}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-6 w-6 text-purple-600" />
        </motion.div>
      </div>
    </motion.div>
  )
}
