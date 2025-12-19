"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, Code, GraduationCap, LogOut, FileText, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import WaveBackground from "@/components/wave-background"
import { ModeToggle } from "@/components/theme-toggle"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Projects", href: "/admin/projects", icon: Briefcase },
        { name: "Skills", href: "/admin/skills", icon: Code },
        { name: "Education", href: "/admin/education", icon: GraduationCap },
        { name: "Messages", href: "/admin/messages", icon: FileText },
    ]

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden font-sans selection:bg-purple-500/30 transition-colors duration-300">
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            {/* Global Background - Only visible in Dark Mode or subtle in light */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-100 transition-opacity duration-500">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[120px]" />
                <WaveBackground
                    sectionId="admin-bg"
                    color1="rgba(147, 51, 234, 0.1)"
                    color2="rgba(236, 72, 153, 0.1)"
                    height={200}
                    speed={0.05}
                />
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-black/50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 z-50 relative">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
                    Admin Panel
                </h1>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <button onClick={toggleSidebar} className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <div className="flex h-screen relative z-10 text-left">
                {/* Sidebar */}
                <AnimatePresence mode="wait">
                    <motion.aside
                        className={`fixed md:relative inset-y-0 left-0 w-72 bg-white/80 dark:bg-black/40 backdrop-blur-2xl border-r border-gray-200 dark:border-white/10 z-40 transform md:transform-none transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                    >
                        <div className="p-8">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent tracking-tight">
                                Portfolio Admin
                            </h1>
                            <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-medium">Control Center</p>
                        </div>

                        <nav className="flex-1 px-4 py-4 space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="block relative group"
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-purple-100 dark:bg-white/5 rounded-xl border border-purple-200 dark:border-white/10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                        <div className={`flex items-center px-4 py-3 rounded-xl transition-all relative z-10 ${isActive
                                            ? "text-purple-700 dark:text-white"
                                            : "text-gray-600 dark:text-gray-400 group-hover:text-purple-700 dark:group-hover:text-white group-hover:bg-purple-50 dark:group-hover:bg-white/5"
                                            }`}>
                                            <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400"}`} />
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="p-4 border-t border-gray-200 dark:border-white/10 mt-auto space-y-4">
                            <div className="flex items-center justify-between px-4">
                                <span className="text-sm text-gray-500 font-medium">Theme</span>
                                <ModeToggle />
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 rounded-xl transition-all"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </motion.aside>
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
