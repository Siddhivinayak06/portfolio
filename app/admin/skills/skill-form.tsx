"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SkillItem } from "@/lib/data"
import Link from "next/link"
import { useState } from "react"
import { useFormStatus } from "react-dom"

interface SkillFormProps {
    skill?: SkillItem
    action: (formData: FormData) => Promise<void>
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className="bg-purple-600 hover:bg-purple-700">
            {pending ? "Saving..." : isEditing ? "Update Skill" : "Create Skill"}
        </Button>
    )
}

export default function SkillForm({ skill, action }: SkillFormProps) {
    const [level, setLevel] = useState(skill?.level || 50)
    const [color, setColor] = useState(skill?.color || "#6366f1")

    return (
        <form action={action} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Name</label>
                    <Input name="name" defaultValue={skill?.name} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Icon Name (Lucide)</label>
                    <Input name="iconName" defaultValue={skill?.iconName || "Code"} required className="dark:bg-gray-900" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                    <div className="flex gap-4 items-center">
                        <Input
                            name="color"
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-20 p-1 dark:bg-gray-900 cursor-pointer"
                        />
                        <span className="text-sm text-gray-500">{color}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Proficiency Level ({level}%)</label>
                    <Slider
                        value={[level]}
                        onValueChange={(val: number[]) => setLevel(val[0])}
                        max={100}
                        step={1}
                        className="py-4"
                    />
                    <input type="hidden" name="level" value={level} />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Button asChild variant="outline">
                    <Link href="/admin/skills">Cancel</Link>
                </Button>
                <SubmitButton isEditing={!!skill} />
            </div>
        </form>
    )
}
