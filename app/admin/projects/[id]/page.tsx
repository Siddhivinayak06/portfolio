
import ProjectForm from "../project-form"
import { updateProject } from "@/lib/actions"
import { getProjectById } from "@/lib/data"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    // getProjectById usually expects a string ID in our implementation for the frontend,
    // but let's verify if we need to parse it. 
    // In lib/data.ts we did `parseInt(id)`. 
    // So passing the string param is correct.
    const project = await getProjectById(id)

    if (!project) {
        notFound()
    }

    // Bind the ID to the server action so we don't need a hidden input
    const updateProjectWithId = updateProject.bind(null, project.id)

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Project</h1>
            <ProjectForm project={project} action={updateProjectWithId} />
        </div>
    )
}
