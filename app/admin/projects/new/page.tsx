
import ProjectForm from "../project-form"
import { createProject } from "@/lib/actions"

export default function NewProjectPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Project</h1>
            <ProjectForm action={createProject} />
        </div>
    )
}
