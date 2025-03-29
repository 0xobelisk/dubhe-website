"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Download, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: "特性", href: "/features" },
    { name: "文档", href: "/docs" },
    { name: "学习", href: "/learn" },
    { name: "社区", href: "/community" },
    { name: "博客", href: "/blog" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-[1072px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-semibold text-foreground tracking-tight">Dubhe Engine</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition duration-200 ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              variant="default" 
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 transition-colors duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              下载
            </Button>
          </div>

          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 pb-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button 
                variant="default" 
                className="rounded-full bg-primary hover:bg-primary/90 px-4"
              >
                <Download className="h-4 w-4 mr-2" />
                下载
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 