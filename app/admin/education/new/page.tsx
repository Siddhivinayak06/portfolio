
import EducationForm from "../education-form"
import { createEducation } from "@/lib/actions"

export default function NewEducationPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Education</h1>
            <EducationForm action={createEducation} />
        </div>
    )
}
