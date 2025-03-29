"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Download, Moon, Sun, Cpu, Code, Zap, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  
  // Add scroll animation setup
  const { scrollY } = useScroll()
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  )
  const navBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(8px)"]
  )
  const navHeight = useTransform(
    scrollY,
    [0, 50],
    ["5rem", "4rem"]
  )

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
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navBackground,
        backdropFilter: navBlur,
        height: navHeight
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <motion.span 
                  className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:from-blue-400 group-hover:to-cyan-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Dubhe Engine
                </motion.span>
              </Link>
            </motion.div>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                <Link 
                  href={item.name === "Features" ? "#features" : item.href}
                  onClick={item.name === "Features" ? handleFeaturesClick : undefined}
                  target={item.name === "Documentation" || item.name === "Learn" ? "_blank" : undefined}
                  rel={item.name === "Documentation" || item.name === "Learn" ? "noopener noreferrer" : undefined}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition duration-200 hover:bg-white/5 flex items-center ${
                    pathname === item.href
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                  >
                    {item.icon}
                  </motion.div>
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800/80 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {mounted ? (
                    theme === "dark" ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-slate-300" />
                  ) : null}
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="default" 
                className="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2 transition-all duration-300 border-0 shadow-lg shadow-blue-500/20"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Download className="h-4 w-4 mr-2" />
                </motion.div>
                Download
              </Button>
            </motion.div>
          </div>

          <motion.div 
            className="flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full text-gray-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link 
                    href={item.name === "Features" ? "#features" : item.href}
                    className={`block px-3 py-2.5 text-base font-medium rounded-md flex items-center ${
                      pathname === item.href
                        ? "bg-gray-800/70 text-blue-400"
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    }`}
                    onClick={item.name === "Features" ? handleFeaturesClick : () => setIsMenuOpen(false)}
                    target={item.name === "Documentation" || item.name === "Learn" ? "_blank" : undefined}
                    rel={item.name === "Documentation" || item.name === "Learn" ? "noopener noreferrer" : undefined}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                className="flex items-center justify-between pt-4 pb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full border border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800/80"
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    {mounted ? (
                      theme === "dark" ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-slate-300" />
                    ) : null}
                  </motion.div>
                </Button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="default" 
                    className="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2 transition-all duration-300 border-0 shadow-lg shadow-blue-500/20"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 