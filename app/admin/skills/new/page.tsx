
import SkillForm from "../skill-form"
import { createSkill } from "@/lib/actions"

export default function NewSkillPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Skill</h1>
            <SkillForm action={createSkill} />
        </div>
    )
}
