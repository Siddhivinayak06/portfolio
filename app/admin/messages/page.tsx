
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"
import { Users, Mail, Clock } from "lucide-react"

export const dynamic = 'force-dynamic'

async function getMessages() {
    try {
        const client = await clientPromise
        const db = client.db("portfolio")
        // newest first
        const messages = await db.collection("messages").find({}).sort({ createdAt: -1 }).toArray()
        return messages
    } catch (error) {
        console.error("Failed to fetch messages:", error)
        return []
    }
}

export default async function AdminMessagesPage() {
    const messages = await getMessages()

    if (!messages || messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <Mail className="w-16 h-16 mb-4 opacity-20" />
                <h2 className="text-xl font-semibold">No messages yet</h2>
                <p>When someone contacts you, their message will appear here.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Inquiries from the contact form.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {messages.map((msg: any) => (
                    <div key={msg._id.toString()} className="bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:backdrop-blur-lg p-6 rounded-2xl dark:border-white/10 hover:shadow-md dark:hover:bg-white/10 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                    {msg.name}
                                </h3>
                                <a href={`mailto:${msg.email}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2 mt-1">
                                    <Mail className="w-3 h-3" />
                                    {msg.email}
                                </a>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 bg-gray-100 border border-gray-200 dark:bg-white/5 px-2 py-1 rounded-full dark:border-white/5">
                                <Clock className="w-3 h-3" />
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Unknown date'}
                            </div>
                        </div>

                        <div className="space-y-3 pl-6 border-l-2 border-gray-200 dark:border-white/10">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300 rounded border border-purple-200 dark:border-purple-500/20">
                                {msg.subject}
                            </span>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {msg.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
