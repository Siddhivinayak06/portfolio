
import { getProjects } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { deleteProject } from "@/lib/actions"
import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your portfolio showcase.</p>
                </div>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-500/20 transition-all hover:scale-105">
                    <Link href="/admin/projects/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Link>
                </Button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:backdrop-blur-xl dark:border-white/10 rounded-2xl overflow-hidden transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Tags</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="relative h-12 w-20 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                                            <Image
                                                src={project.image || "/placeholder.svg"}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {project.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="px-2 py-1 rounded-md bg-gray-100 border border-gray-200 dark:bg-white/10 dark:border-white/5 text-xs text-gray-600 dark:text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20">
                                                <Link href={`/admin/projects/${project.id}`}>
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <form action={async () => {
                                                "use server"
                                                await deleteProject(project.id)
                                            }}>
                                                <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/20">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
