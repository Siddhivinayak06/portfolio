"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import WaveBackground from "./wave-background"


import { ProjectItem } from "@/lib/data"

interface ProjectsProps {
  projects: ProjectItem[]
}

// Icon mapper helper would ideally be in a shared util, but defining inline for simplicity or passing icons from parent is complex with server components.
// We will just dynamically render based on name if possible, or mapping here.
import { Smartphone, Code, ShoppingCart, Globe, Server, Database, FileCode, Github, Layers, Palette, Cloud } from "lucide-react"

const IconMap: { [key: string]: any } = {
  Smartphone,
  Code,
  ShoppingCart,
  Globe,
  Server,
  Database,
  FileCode,
  Github,
  Layers,
  Palette,
  Cloud
}


export default function Projects({ projects }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="projects" className="relative py-20" ref={ref}>
      <WaveBackground
        sectionId="projects"
        color1="rgba(14, 116, 144, 0.3)"
        color2="rgba(2, 132, 199, 0.3)"
        height={180}
        amplitude={30}
        frequency={0.008}
      />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">My Projects</h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project reflects my passion for creating intuitive and impactful
            digital experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => {
            const Icon = IconMap[project.iconName] || Code;
            return (
              <motion.div key={project.id} variants={itemVariants}>
                <Link href={`/projects/${project.id}`}>
                  <Card className="overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer">
                    <motion.div
                      className="relative h-48 w-full overflow-hidden group"
                      whileHover={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} className="h-full w-full">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500"
                        />
                      </motion.div>
                      <div
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${project.color}30`, color: project.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </motion.div>
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {project.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
