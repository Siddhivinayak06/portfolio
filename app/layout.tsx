import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Siddhivinayak Sawant - Portfolio",
  description:
    "Portfolio of Siddhivinayak Sawant, a passionate Full Stack Developer specializing in building exceptional digital experiences.",
  keywords: [
    "Siddhivinayak Sawant",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "Siddhivinayak Sawant" }],
  creator: "Siddhivinayak Sawant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siddhivinayak-portfolio.vercel.app", // Replacing with a generic placeholder if unknown, or user's likely URL
    title: "Siddhivinayak Sawant - Full Stack Developer",
    description:
      "Explore the portfolio of Siddhivinayak Sawant, featuring innovative web projects and technical skills.",
    siteName: "Siddhivinayak Sawant Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhivinayak Sawant - Full Stack Developer",
    description:
      "Explore the portfolio of Siddhivinayak Sawant, featuring innovative web projects and technical skills.",
    creator: "@Siddhivinayak06", // Assuming generic handle or from contact info if available, using GitHub handle as placeholder
  },
  robots: {
    index: true,
    follow: true,
  },
}

import CustomCursor from "@/components/custom-cursor"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} cursor-active`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
