"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Download, Moon, Sun, Cpu, Code, Zap, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  
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

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If features section ID isn't found, try to find the key features header
      const keyFeaturesElement = document.querySelector('.text-yellow-400.text-2xl');
      if (keyFeaturesElement) {
        const featuresContainer = keyFeaturesElement.closest('div')?.parentElement?.parentElement;
        if (featuresContainer) {
          featuresContainer.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    // If mobile menu is open, close it
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 backdrop-blur-md ${scrolled ? 'bg-black/95' : 'bg-black/60'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo/light.png" 
                alt="Dubhe Engine" 
                width={120} 
                height={36} 
                className="h-8 w-auto transition-opacity duration-200 hover:opacity-80"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center justify-center mx-4">
            <nav className="flex">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  href={item.name === "Features" ? "#features" : item.href}
                  onClick={item.name === "Features" ? handleFeaturesClick : undefined}
                  target={item.name === "Documentation" || item.name === "Learn" ? "_blank" : undefined}
                  rel={item.name === "Documentation" || item.name === "Learn" ? "noopener noreferrer" : undefined}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-400 hover:bg-white/5 flex items-center ${
                    pathname === item.href
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-200"
                  }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {/* <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-gray-200 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle color theme"
            >
              {mounted ? (
                theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
              ) : null}
            </button> */}
            
            <Link 
              href="https://dubhe.obelisk.build/dubhe/sui/quick-start"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 transition-all duration-200 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Link>
          </div>

          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full text-gray-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-gray-800">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.name === "Features" ? "#features" : item.href}
                className={`block px-3 py-2.5 text-base font-medium rounded-sm flex items-center ${
                  pathname === item.href
                    ? "bg-gray-800 text-blue-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={item.name === "Features" ? handleFeaturesClick : () => setIsMenuOpen(false)}
                target={item.name === "Documentation" || item.name === "Learn" ? "_blank" : undefined}
                rel={item.name === "Documentation" || item.name === "Learn" ? "noopener noreferrer" : undefined}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 pb-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full text-gray-300 bg-gray-800"
                aria-label="Toggle color theme"
              >
                {mounted ? (
                  theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
                ) : null}
              </button>
              
              <Link 
                href="https://dubhe.obelisk.build/dubhe/sui/quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 