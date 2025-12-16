
import EducationForm from "../education-form"
import { updateEducation } from "@/lib/actions"
import { getEducationById } from "@/lib/data"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const education = await getEducationById(id)

    if (!education) {
        notFound()
    }

    const updateEducationWithId = updateEducation.bind(null, education.id)

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Education</h1>
            <EducationForm education={education} action={updateEducationWithId} />
        </div>
    )
}
