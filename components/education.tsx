"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import WaveBackground from "./wave-background"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import { EducationItem } from "@/lib/data"

interface EducationProps {
    education: EducationItem[]
}


export default function Education({ education }: EducationProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    return (
        <section id="education" className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={ref}>
            <WaveBackground
                sectionId="education"
                color1="rgba(99, 102, 241, 0.05)"
                color2="rgba(168, 85, 247, 0.05)"
                height={100}
                speed={0.05}
                frequency={0.01}
            />

            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Education</h2>
                    <div className="mt-4 h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded"></div>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        My academic journey and qualifications.
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {education && education.map((edu) => (
                        <motion.div key={edu.id} variants={itemVariants}>
                            <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4">
                                            <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                                            {edu.score}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {edu.degree}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-4">
                                        {edu.institution}
                                    </h4>

                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                            {edu.period}
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                            {edu.location}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {edu.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
