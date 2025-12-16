
import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // Only allow if token exists (user is logged in)
            // We can also check for specific roles here if we added them to the token
            return !!token
        },
    },
})

export const config = { matcher: ["/admin/:path*"] }
