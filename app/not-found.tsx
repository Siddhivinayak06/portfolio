"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Background decorations matching Hero */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply filter opacity-30 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl mix-blend-multiply filter opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply filter opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 text-center max-w-lg w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-12 rounded-3xl shadow-2xl"
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400 mb-2">
                            404
                        </h1>
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Page Not Found
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 dark:text-gray-300 mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Oops! It looks like you've wandered into the unknown. The page you're looking for doesn't exist or has been moved.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <Button
                            asChild
                            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            size="lg"
                        >
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Go Home
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                            size="lg"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
