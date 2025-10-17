"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16" ref={ref}>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About column */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              Siddhivinayak Sawant
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              A passionate Full Stack Developer focused on creating clean, user-friendly experiences with modern
              technologies. Always eager to learn and take on new challenges.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/siddhivinayaksawant"
                className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center hover:bg-blue-600/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-blue-400" />
              </a>
              <a
                href="https://github.com/Siddhivinayak06"
                className="h-10 w-10 rounded-full bg-gray-700/30 flex items-center justify-center hover:bg-gray-700/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-300" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-blue-300" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="h-10 w-10 rounded-full bg-teal-600/20 flex items-center justify-center hover:bg-teal-600/30 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-teal-400" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-teal-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="block text-sm text-gray-500">Email</span>
                <a href="mailto:contact@example.com" className="hover:text-teal-400 transition-colors">
                  siddhivinayaksawant04@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block text-sm text-gray-500">Phone</span>
                <a href="tel:+11234567890" className="hover:text-teal-400 transition-colors">
                  +91 7977209104
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block text-sm text-gray-500">Location</span>
                <span>Thane, Maharashtra</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm">© {currentYear} Siddhivinayak Sawant. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <button
              onClick={scrollToTop}
              className="group flex items-center text-sm text-gray-400 hover:text-teal-400 transition-colors"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
