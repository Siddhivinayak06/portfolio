import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Loader from "@/components/loader"
import CustomCursor from "@/components/custom-cursor"

export default function Home() {
  return (
    <main className="relative">
      <Loader />
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <About />
      </section>

      {/* Skills Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Skills />
      </section>

      {/* Projects Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Projects />
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}
