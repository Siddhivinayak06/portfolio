"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronRight, ChevronLeft, Calendar, Briefcase, GraduationCap, Award } from "lucide-react"

interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  icon: "work" | "education" | "award" | "project"
  color: string
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "2023",
    title: "Senior Developer",
    description:
      "Led development of multiple web applications, mentored junior developers, and implemented best practices.",
    icon: "work",
    color: "#9c27b0",
  },
  {
    id: 2,
    year: "2021",
    title: "Frontend Specialist",
    description: "Specialized in creating responsive and accessible user interfaces using modern frameworks.",
    icon: "work",
    color: "#e91e63",
  },
  {
    id: 3,
    year: "2020",
    title: "Master's Degree in Computer Science",
    description: "Graduated with honors, specializing in web technologies and user experience design.",
    icon: "education",
    color: "#3f51b5",
  },
  {
    id: 4,
    year: "2019",
    title: "Web Developer",
    description: "Developed responsive websites and web applications for various clients across different industries.",
    icon: "work",
    color: "#009688",
  },
  {
    id: 5,
    year: "2018",
    title: "Best Design Award",
    description: "Received recognition for outstanding UI/UX design in a national web design competition.",
    icon: "award",
    color: "#ff9800",
  },
  {
    id: 6,
    year: "2017",
    title: "Bachelor's Degree in Computer Science",
    description: "Graduated with a focus on software development and interactive media.",
    icon: "education",
    color: "#2196f3",
  },
]

export default function InteractiveTimeline() {
  const [activeEvent, setActiveEvent] = useState<TimelineEvent>(timelineEvents[0])
  const [direction, setDirection] = useState<"left" | "right">("right")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const handleNext = () => {
    const currentIndex = timelineEvents.findIndex((event) => event.id === activeEvent.id)
    const nextIndex = (currentIndex + 1) % timelineEvents.length
    setDirection("right")
    setActiveEvent(timelineEvents[nextIndex])
  }

  const handlePrev = () => {
    const currentIndex = timelineEvents.findIndex((event) => event.id === activeEvent.id)
    const prevIndex = currentIndex === 0 ? timelineEvents.length - 1 : currentIndex - 1
    setDirection("left")
    setActiveEvent(timelineEvents[prevIndex])
  }

  const handleDotClick = (event: TimelineEvent) => {
    const currentIndex = timelineEvents.findIndex((e) => e.id === activeEvent.id)
    const newIndex = timelineEvents.findIndex((e) => e.id === event.id)
    setDirection(newIndex > currentIndex ? "right" : "left")
    setActiveEvent(event)
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "work":
        return <Briefcase className="h-6 w-6" />
      case "education":
        return <GraduationCap className="h-6 w-6" />
      case "award":
        return <Award className="h-6 w-6" />
      case "project":
        return <Calendar className="h-6 w-6" />
      default:
        return <Calendar className="h-6 w-6" />
    }
  }

  return (
    <div ref={ref} className="w-full py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 w-full top-8 z-0"></div>

        {/* Timeline dots */}
        <div className="flex justify-between relative z-10 mb-16">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleDotClick(event)}
            >
              <motion.div
                className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeEvent.id === event.id
                    ? "bg-white dark:bg-gray-800 shadow-lg scale-110"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                whileHover={{ scale: 1.1 }}
                style={{
                  border: activeEvent.id === event.id ? `3px solid ${event.color}` : "3px solid transparent",
                }}
              >
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full ${
                    activeEvent.id === event.id ? "text-white" : "text-gray-500 dark:text-gray-300"
                  }`}
                  style={{ backgroundColor: activeEvent.id === event.id ? event.color : "transparent" }}
                >
                  {getIcon(event.icon)}
                </div>
              </motion.div>
              <motion.div
                className={`mt-2 text-sm font-medium transition-all duration-300 ${
                  activeEvent.id === event.id
                    ? "text-gray-900 dark:text-white scale-110"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                animate={{ opacity: activeEvent.id === event.id ? 1 : 0.7 }}
              >
                {event.year}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Event details */}
        <div className="relative h-64 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center text-center px-4"
            >
              <div className="w-20 h-1 mb-6 rounded" style={{ backgroundColor: activeEvent.color }}></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{activeEvent.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">{activeEvent.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
