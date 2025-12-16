
import { getSkills } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { deleteSkill } from "@/lib/actions"
import { IconMap } from "@/lib/icons"

export const dynamic = 'force-dynamic'

export default async function AdminSkillsPage() {
    const skills = await getSkills()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Tech stack expertise.</p>
                </div>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-500/20 transition-all hover:scale-105">
                    <Link href="/admin/skills/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => {
                    const Icon = IconMap[skill.iconName] || IconMap["Code"]
                    return (
                        <div key={skill.name} className="bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:backdrop-blur-lg dark:border-white/10 rounded-2xl p-6 flex justify-between items-center group hover:shadow-md dark:hover:bg-white/10 transition-all duration-300">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/10" style={{ color: skill.color }}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                                    <div className="w-24 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: skill.color }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                                    <Link href={`/admin/skills/${encodeURIComponent(skill.name)}`}>
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                </Button>
                                <form action={async () => {
                                    "use server"
                                    await deleteSkill(skill.name)
                                }}>
                                    <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/20">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
