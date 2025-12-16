"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

export default function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid credentials")
        } else {
            router.push("/admin")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <motion.div
                className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Admin Access</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="dark:bg-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="dark:bg-gray-900"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                        Sign In
                    </Button>
                </form>
            </motion.div>
        </div>
    )
}
