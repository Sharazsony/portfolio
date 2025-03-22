import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

export const metadata = {
  title: "Sharaz Masih | Data Scientist",
  description: "Portfolio of Sharaz Masih, Data Scientist from 2030",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <div className="relative">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'