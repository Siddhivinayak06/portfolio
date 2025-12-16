
import SkillForm from "../skill-form"
import { updateSkill } from "@/lib/actions"
import { getSkillByName } from "@/lib/data"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function EditSkillPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params
    const skill = await getSkillByName(name)

    if (!skill) {
        notFound()
    }

    const updateSkillWithName = updateSkill.bind(null, skill.name)

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Skill</h1>
            <SkillForm skill={skill} action={updateSkillWithName} />
        </div>
    )
}
