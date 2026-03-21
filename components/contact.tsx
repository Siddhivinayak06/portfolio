"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { motion, useInView } from "framer-motion"
import WaveBackground from "./wave-background"
import emailjs from '@emailjs/browser'
import { saveMessage } from "@/lib/actions"

// Magnetic icon component
const MagneticIcon = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

      if (distance < 80) {
        const strength = Math.max(0, 1 - distance / 80)
        const x = (e.clientX - centerX) * strength * 0.2
        const y = (e.clientY - centerY) * strength * 0.2
        setPosition({ x, y })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Check if env vars are configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    // Simple validation to check if they are dummy values or missing
    const isConfigured =
      serviceId && serviceId !== "service_123456" &&
      templateId && templateId !== "template_123456" &&
      publicKey

    if (!isConfigured) {
      // Fallback behavior
      console.warn("EmailJS not configured. Falling back to mailto.")
      window.location.href = `mailto:siddhivinayaksawant04@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`
      setIsSubmitting(false)
      setSubmitStatus("success") // Visually indicate "sent" (opened mail client)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus(null), 5000)
      return
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Siddhivinayak Sawant',
      }

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )

      // Persist to database
      await saveMessage(formData)

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" ref={ref}>
      <WaveBackground
        sectionId="contact"
        color1="rgba(126, 34, 206, 0.08)"
        color2="rgba(219, 39, 119, 0.08)"
        height={140}
        speed={0.12}
        amplitude={25}
      />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Get In Touch</h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <motion.div className="flex items-start" variants={itemVariants}>
                <MagneticIcon className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </MagneticIcon>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
                  <a href="mailto:siddhivinayaksawant04@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                    siddhivinayaksawant04@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div className="flex items-start" variants={itemVariants}>
                <MagneticIcon className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </MagneticIcon>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+91 7977209104</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start" variants={itemVariants}>
                <MagneticIcon className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </MagneticIcon>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">Thane, Maharashtra</p>
                </div>
              </motion.div>
            </div>

            <motion.div className="mt-12" variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <MagneticIcon className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                  <a href="https://www.linkedin.com/in/siddhivinayaksawant" className="text-white">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm9.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </MagneticIcon>
                <MagneticIcon className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                  <a href="https://github.com/Siddhivinayak06" className="text-white">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </MagneticIcon>
                <MagneticIcon className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                  <a href="#" className="text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </MagneticIcon>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows={5}
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </span>
                )}
              </Button>

              {submitStatus === "success" && (
                <motion.div
                  className="p-4 bg-green-100 text-green-700 rounded-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Your message has been sent successfully. I'll get back to you soon!
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  className="p-4 bg-red-100 text-red-700 rounded-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  There was an error sending your message. Please try again later.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
