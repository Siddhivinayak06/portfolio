"use server"

import clientPromise from "./mongodb"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { ProjectItem, SkillItem } from "./data"

// --- PROJECTS ---

export async function createProject(formData: FormData) {
    const client = await clientPromise
    const db = client.db("portfolio")

    // Calculate a simple ID (max + 1)
    // In production, ObjectId is better, but our schema uses number IDs
    const lastProject = await db.collection("projects").find().sort({ id: -1 }).limit(1).toArray()
    const newId = lastProject.length > 0 ? lastProject[0].id + 1 : 1

    const rawFormData = {
        id: newId,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as string, // We'll paste URLs for now
        tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
        liveUrl: formData.get("liveUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        iconName: formData.get("iconName") as string,
        color: formData.get("color") as string,
    }

    await db.collection("projects").insertOne(rawFormData)
    revalidatePath("/")
    revalidatePath("/admin/projects")
    redirect("/admin/projects")
}

export async function updateProject(id: number, formData: FormData) {
    const client = await clientPromise
    const db = client.db("portfolio")

    const rawFormData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as string,
        tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
        liveUrl: formData.get("liveUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        iconName: formData.get("iconName") as string,
        color: formData.get("color") as string,
    }

    await db.collection("projects").updateOne({ id: id }, { $set: rawFormData })
    revalidatePath("/")
    revalidatePath(`/projects/${id}`)
    revalidatePath("/admin/projects")
    redirect("/admin/projects")
}

export async function deleteProject(id: number) {
    const client = await clientPromise
    const db = client.db("portfolio")
    await db.collection("projects").deleteOne({ id: id })
    revalidatePath("/")
    revalidatePath("/admin/projects")
}

// --- SKILLS ---

export async function createSkill(formData: FormData) {
    const client = await clientPromise
    const db = client.db("portfolio")

    const rawFormData = {
        name: formData.get("name") as string,
        level: parseInt(formData.get("level") as string),
        iconName: formData.get("iconName") as string,
        color: formData.get("color") as string,
    }

    await db.collection("skills").insertOne(rawFormData)
    revalidatePath("/")
    revalidatePath("/admin/skills")
    redirect("/admin/skills")
}

export async function deleteSkill(name: string) {
    const client = await clientPromise
    const db = client.db("portfolio")
    await db.collection("skills").deleteOne({ name: name })
    revalidatePath("/")
    revalidatePath("/admin/skills")
}

export async function updateSkill(originalName: string, formData: FormData) {
    const client = await clientPromise
    const db = client.db("portfolio")

    const rawFormData = {
        name: formData.get("name") as string,
        level: parseInt(formData.get("level") as string),
        iconName: formData.get("iconName") as string,
        color: formData.get("color") as string,
    }

    // If name changed, we update by originalName
    await db.collection("skills").updateOne({ name: originalName }, { $set: rawFormData })
    revalidatePath("/")
    revalidatePath("/admin/skills")
    redirect("/admin/skills")
}


// --- EDUCATION ---

export async function createEducation(formData: FormData) {
    const client = await clientPromise
    const db = client.db("portfolio")

    const lastEdu = await db.collection("education").find().sort({ id: -1 }).limit(1).toArray()
    const newId = lastEdu.length > 0 ? lastEdu[0].id + 1 : 1

    const rawFormData = {
        id: newId,
        degree: formData.get("degree") as string,
        institution: formData.get("institution") as string,
        location: formData.get("location") as string,
        period: formData.get("period") as string,
        score: formData.get("score") as string,
        description: formData.get("description") as string,
    }

    await db.collection("education").insertOne(rawFormData)
    revalidatePath("/")
    revalidatePath("/admin/education")
    redirect("/admin/education")
}

export async function updateEducation(id: number, formData: FormData) {
    const client = await clientPromise
    const db = client.db("portfolio")

    const rawFormData = {
        degree: formData.get("degree") as string,
        institution: formData.get("institution") as string,
        location: formData.get("location") as string,
        period: formData.get("period") as string,
        score: formData.get("score") as string,
        description: formData.get("description") as string,
    }

    await db.collection("education").updateOne({ id: id }, { $set: rawFormData })
    revalidatePath("/")
    revalidatePath("/admin/education")
    redirect("/admin/education")
}

export async function deleteEducation(id: number) {
    const client = await clientPromise
    const db = client.db("portfolio")
    await db.collection("education").deleteOne({ id: id })
    revalidatePath("/")
    revalidatePath("/admin/education")
}

// --- MESSAGES ---

export async function saveMessage(data: { name: string; email: string; subject: string; message: string }) {
    const client = await clientPromise
    const db = client.db("portfolio")

    await db.collection("messages").insertOne({
        ...data,
        createdAt: new Date(),
        read: false
    })

    revalidatePath("/admin/messages")
    revalidatePath("/admin") // Update dashboard count
}
