"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { EducationItem } from "@/lib/data"
import Link from "next/link"
import { useFormStatus } from "react-dom"

interface EducationFormProps {
    education?: EducationItem
    action: (formData: FormData) => Promise<void>
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className="bg-purple-600 hover:bg-purple-700">
            {pending ? "Saving..." : isEditing ? "Update Education" : "Create Education"}
        </Button>
    )
}

export default function EducationForm({ education, action }: EducationFormProps) {
    return (
        <form action={action} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
                    <Input name="degree" defaultValue={education?.degree} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution</label>
                    <Input name="institution" defaultValue={education?.institution} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <Input name="location" defaultValue={education?.location} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Period (e.g. 2020 - 2024)</label>
                    <Input name="period" defaultValue={education?.period} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Score / Grade</label>
                    <Input name="score" defaultValue={education?.score} className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <Textarea name="description" defaultValue={education?.description} className="dark:bg-gray-900 min-h-[100px]" />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button asChild variant="outline">
                    <Link href="/admin/education">Cancel</Link>
                </Button>
                <SubmitButton isEditing={!!education} />
            </div>
        </form>
    )
}
