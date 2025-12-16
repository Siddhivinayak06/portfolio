
import { getEducation } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, MapPin, Calendar, Building } from "lucide-react"
import { deleteEducation } from "@/lib/actions"

export const dynamic = 'force-dynamic'

export default async function AdminEducationPage() {
    const education = await getEducation()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Education</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Academic background.</p>
                </div>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-500/20 transition-all hover:scale-105">
                    <Link href="/admin/education/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                    </Link>
                </Button>
            </div>

            <div className="space-y-4">
                {education.map((edu) => (
                    <div key={edu.id} className="bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:backdrop-blur-lg rounded-2xl p-6 dark:border-white/10 flex flex-col md:flex-row justify-between md:items-center gap-4 group hover:shadow-md dark:hover:bg-white/10 transition-all duration-300">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 dark:bg-white/5 dark:border-white/10">
                                    <Building className="w-3 h-3" /> {edu.institution}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 dark:bg-white/5 dark:border-white/10">
                                    <MapPin className="w-3 h-3" /> {edu.location}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 dark:bg-white/5 dark:border-white/10">
                                    <Calendar className="w-3 h-3" /> {edu.period}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20">
                                <Link href={`/admin/education/${edu.id}`}>
                                    <Pencil className="w-4 h-4" />
                                </Link>
                            </Button>
                            <form action={async () => {
                                "use server"
                                await deleteEducation(edu.id)
                            }}>
                                <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/20">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
