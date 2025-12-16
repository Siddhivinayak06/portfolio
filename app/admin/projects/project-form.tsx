"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ProjectItem } from "@/lib/data"
import Link from "next/link"
import { useState } from "react"
import { useFormStatus } from "react-dom"

interface ProjectFormProps {
    project?: ProjectItem
    action: (formData: FormData) => Promise<void>
}

// Submit button with loading state
function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className="bg-purple-600 hover:bg-purple-700">
            {pending ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
        </Button>
    )
}

export default function ProjectForm({ project, action }: ProjectFormProps) {
    const [tagInput, setTagInput] = useState(project?.tags.join(", ") || "")

    return (
        <form action={action} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <Input name="title" defaultValue={project?.title} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
                    <Input name="description" defaultValue={project?.description} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                    <Input name="image" defaultValue={project?.image} required className="dark:bg-gray-900" placeholder="https://res.cloudinary.com/..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                    <Input
                        name="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        required
                        className="dark:bg-gray-900"
                        placeholder="React, Next.js, TypeScript"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Live URL</label>
                    <Input name="liveUrl" defaultValue={project?.liveUrl} className="dark:bg-gray-900" placeholder="https://..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub URL</label>
                    <Input name="githubUrl" defaultValue={project?.githubUrl} className="dark:bg-gray-900" placeholder="https://github.com/..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Icon Name (Lucide)</label>
                    <Input name="iconName" defaultValue={project?.iconName || "Code"} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color (Hex)</label>
                    <Input name="color" defaultValue={project?.color || "#6366f1"} type="color" className="h-10 w-full p-1 dark:bg-gray-900 cursor-pointer" />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button asChild variant="outline">
                    <Link href="/admin/projects">Cancel</Link>
                </Button>
                <SubmitButton isEditing={!!project} />
            </div>
        </form>
    )
}
