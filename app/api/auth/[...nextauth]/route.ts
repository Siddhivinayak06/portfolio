
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Simple fixed credentials for personal portfolio
                // In a real app, you would check against a database
                const adminUser = process.env.ADMIN_USER
                const adminPassword = process.env.ADMIN_PASSWORD

                if (
                    credentials?.username === adminUser &&
                    credentials?.password === adminPassword
                ) {
                    return { id: "1", name: "Admin", email: "admin@portfolio.com" }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/auth/signin", // We will create a custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }) {
            return token
        },
        async session({ session, token }) {
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
