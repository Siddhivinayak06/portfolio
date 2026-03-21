import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const adminUser = process.env.ADMIN_USER
                const adminPassword = process.env.ADMIN_PASSWORD

                if (process.env.NODE_ENV === "development") {
                    console.log("Auth attempt:", {
                        username: credentials?.username,
                        expectedUser: adminUser,
                        match: credentials?.username === adminUser && credentials?.password === adminPassword
                    })
                }

                if (
                    credentials?.username === adminUser &&
                    credentials?.password === adminPassword
                ) {
                    return { id: "1", name: "Admin", email: "admin@portfolio.com" }
                }

                if (process.env.NODE_ENV === "production") {
                    console.error("Failed admin login attempt for:", credentials?.username)
                }

                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = "admin"
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}
