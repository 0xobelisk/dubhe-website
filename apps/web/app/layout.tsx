import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Dubhe Engine | Professional Game Development Platform",
  description: "Dubhe Engine is a powerful, versatile game engine designed for creators who want to bring their visions to life with advanced tools and workflows.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen flex flex-col bg-black text-white`}
      >
        <Providers>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
