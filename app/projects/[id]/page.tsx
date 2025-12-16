
import { getProjectById } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Globe } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const project = await getProjectById(params.id)

    if (!project) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            {/* Hero Section */}
            <div className="relative h-[50vh] w-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <div className="container mx-auto">
                        <Link
                            href="/#projects"
                            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-white border border-white/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="prose dark:prose-invert max-w-none">
                            <h2 className="text-2xl font-bold mb-4">About this project</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>

                            {/* NOTE: If we had a long description in DB, we would use it here. 
                  For now we just reuse description or placeholder text to simulate depth. */}
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                                This project demonstrates my ability to build robust applications using modern technologies.
                                I focused on creating a seamless user experience, optimizing performance, and ensuring code quality.
                                The architecture is designed to be scalable and maintainable.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-semibold mb-6">Project Links</h3>
                            <div className="space-y-4">
                                {project.liveUrl && (
                                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                            <Globe className="mr-2 h-4 w-4" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                                {project.githubUrl && (
                                    <Button asChild variant="outline" className="w-full">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="mr-2 h-4 w-4" />
                                            Source Code
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        • {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
