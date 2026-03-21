import { NextResponse } from "next/server"

export async function GET() {
    const nextAuthUrl = process.env.NEXTAUTH_URL || ""
    const diagnostics = {
        ADMIN_USER: !!process.env.ADMIN_USER,
        ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: nextAuthUrl || "NOT SET (Vercel automatic)",
        URL_MISMATCH: nextAuthUrl.includes("localhost") && !!process.env.VERCEL,
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: !!process.env.VERCEL,
    }

    return NextResponse.json(diagnostics)
}
