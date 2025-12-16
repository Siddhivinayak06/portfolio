import { getProjects, getSkills, getEducation } from "@/lib/data"
import DashboardGrid from "./dashboard-grid"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const [projects, skills, education] = await Promise.all([
    getProjects(),
    getSkills(),
    getEducation(),
  ])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      <DashboardGrid
        stats={[
          {
            name: "Projects",
            value: projects.length,
            icon: "Briefcase",
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-500/10",
            border: "border-blue-100 dark:border-blue-500/20",
          },
          {
            name: "Skills",
            value: skills.length,
            icon: "Code",
            color: "text-green-600",
            bg: "bg-green-50 dark:bg-green-500/10",
            border: "border-green-100 dark:border-green-500/20",
          },
          {
            name: "Education",
            value: education.length,
            icon: "GraduationCap",
            color: "text-purple-600",
            bg: "bg-purple-50 dark:bg-purple-500/10",
            border: "border-purple-100 dark:border-purple-500/20",
          },
        ]}
      />
    </div>
  )
}
