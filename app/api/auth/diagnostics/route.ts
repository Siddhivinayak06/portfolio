import { NextResponse } from "next/server"

export async function GET() {
    const diagnostics = {
        ADMIN_USER: !!process.env.ADMIN_USER,
        ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "NOT SET (Vercel automatic)",
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: !!process.env.VERCEL,
    }

    return NextResponse.json(diagnostics)
}
