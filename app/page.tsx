import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Loader from "@/components/loader"
import { getProjects, getSkills, getEducation } from "@/lib/data"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const projectsData = await getProjects()
  const skillsData = await getSkills()
  const educationData = await getEducation()

  return (
    <main className="relative">
      <Loader />
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <About />
      </section>

      {/* Education Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Education education={educationData} />
      </section>

      {/* Skills Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Skills skills={skillsData} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Projects projects={projectsData} />
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}
