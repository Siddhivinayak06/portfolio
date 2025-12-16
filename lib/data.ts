
import clientPromise from "./mongodb"


export interface ProjectItem {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    liveUrl: string
    githubUrl: string
    iconName: string
    color: string
}

export interface SkillItem {
    name: string
    level: number
    iconName: string
    color: string
}

export interface EducationItem {
    id: number
    degree: string
    institution: string
    location: string
    period: string
    score: string
    description: string
}

export async function getProjects(): Promise<ProjectItem[]> {
    try {
        const client = await clientPromise
        const db = client.db("portfolio")
        const projects = await db.collection("projects").find({}).toArray()
        // Serialize ID and cast to ProjectItem
        return projects.map((project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            image: project.image,
            tags: project.tags,
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            iconName: project.iconName,
            color: project.color,
        })) as ProjectItem[]
    } catch (error) {
        console.error("Failed to fetch projects:", error)
        return []
    }
}

export async function getSkills(): Promise<SkillItem[]> {
    try {
        const client = await clientPromise
        const db = client.db("portfolio")
        const skills = await db.collection("skills").find({}).toArray()
        return skills.map((skill) => ({
            name: skill.name,
            level: skill.level,
            iconName: skill.iconName,
            color: skill.color
        })) as SkillItem[]
    } catch (error) {
        console.error("Failed to fetch skills:", error)
        return []
    }
}

export async function getEducation(): Promise<EducationItem[]> {
    try {
        const client = await clientPromise
        const db = client.db("portfolio")
        const education = await db.collection("education").find({}).toArray()
        return education.map((edu) => ({
            id: edu.id,
            degree: edu.degree,
            institution: edu.institution,
            location: edu.location,
            period: edu.period,
            score: edu.score,
            description: edu.description
        })) as EducationItem[]
    } catch (error) {
        console.error("Failed to fetch education:", error)
        return []
    }
}

export async function getProjectById(id: string): Promise<ProjectItem | null> {
    try {
        const client = await clientPromise
        const db = client.db("portfolio")
        const project = await db.collection("projects").findOne({ id: parseInt(id) })

        if (!project) return null

        return {
            id: project.id,
            title: project.title,
            description: project.description,
            image: project.image,
            tags: project.tags,
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            iconName: project.iconName,
            color: project.color,
        } as ProjectItem
    } catch (error) {
        console.error("Failed to fetch project:", error)
        return null
    }
}

export async function getSkillByName(name: string): Promise<SkillItem | null> {
    try {
        const client = await clientPromise
        const db = client.db("portfolio")
        const skill = await db.collection("skills").findOne({ name: decodeURIComponent(name) })

        if (!skill) return null

        return {
            name: skill.name,
            level: skill.level,
            iconName: skill.iconName,
            color: skill.color
        } as SkillItem
    } catch (error) {
        console.error("Failed to fetch skill:", error)
        return null
    }
}

export async function getEducationById(id: string): Promise<EducationItem | null> {
    try {
        const client = await clientPromise
        const db = client.db("portfolio")
        const edu = await db.collection("education").findOne({ id: parseInt(id) })

        if (!edu) return null

        return {
            id: edu.id,
            degree: edu.degree,
            institution: edu.institution,
            location: edu.location,
            period: edu.period,
            score: edu.score,
            description: edu.description
        } as EducationItem
    } catch (error) {
        console.error("Failed to fetch education:", error)
        return null
    }
}
