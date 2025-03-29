"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Download, Moon, Sun, Cpu, Code, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  // After mounting, we can show the theme toggle
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: "Features", href: "/features", icon: <Zap className="h-4 w-4 mr-1.5" /> },
    { name: "Documentation", href: "/docs", icon: <Code className="h-4 w-4 mr-1.5" /> },
    { name: "Learn", href: "/learn", icon: <Cpu className="h-4 w-4 mr-1.5" /> },
    { name: "Community", href: "/community", icon: null },
    { name: "Blog", href: "/blog", icon: null },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/10" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:from-blue-400 group-hover:to-cyan-300 transition-all duration-300">Dubhe Engine</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition duration-200 hover:bg-white/5 flex items-center ${
                  pathname === item.href
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800/80 transition-all duration-300"
            >
              {mounted ? (
                theme === "dark" ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-slate-300" />
              ) : null}
            </Button>
            <Button 
              variant="default" 
              className="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2 transition-all duration-300 border-0 shadow-lg shadow-blue-500/20"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full text-gray-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2.5 text-base font-medium rounded-md flex items-center ${
                  pathname === item.href
                    ? "bg-gray-800/70 text-blue-400"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 pb-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800/80"
              >
                {mounted ? (
                  theme === "dark" ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-slate-300" />
                ) : null}
              </Button>
              <Button 
                variant="default" 
                className="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2 transition-all duration-300 border-0 shadow-lg shadow-blue-500/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 