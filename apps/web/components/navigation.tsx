"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const navItems = [
    { 
      name: "Learn", 
      href: "#learn",
      dropdown: [
        { name: "Documentation", href: "https://dubhe-docs.obelisk.build/dubhe",external: true },
        { name: "Token", href: "/token" },
        // { name: "Tutorials", href: "/tutorials" },
        // { name: "Examples", href: "/examples" },
        // { name: "API Reference", href: "/api" }
      ]
    },
    { 
      name: "Build", 
      href: "#build",
      dropdown: [
        { name: "Engine", href: "/engine" },
        { name: "Channel", href: "/channel" },
        { name: "OS", href: "/os" },
      ]
    },
    { 
      name: "Ecosystem", 
      href: "#ecosystem",
      dropdown: [
        { name: "Foundation", href: "/foundation" },
        { name: "Labs", href: "/labs" },
        { name: "Grants", href: "/grants" },
        { name: "Incubation", href: "/incubation" },
        { name: "Proposal", href: "/proposal" }
      ]
    },
    { 
      name: "Media", 
      href: "#media",
      dropdown: [
        { name: "Discord", href: "https://discord.gg/dubhe", external: true },
        { name: "Twitter", href: "https://twitter.com/dubhe", external: true },
        { name: "Telegram", href: "https://t.me/dubhe", external: true },
        { name: "YouTube", href: "https://youtube.com/dubhe", external: true },
        { name: "GitHub", href: "https://github.com/dubhe", external: true },
        { name: "Blog", href: "https://medium.com/@dubhe", external: true }
      ]
    },
    { 
      name: "Community", 
      href: "#community",
      dropdown: [
        // { name: "Careers", href: "/careers" },
        { name: "Ambassador", href: "/ambassador" },
        { name: "Moderators", href: "/moderators" },
        { name: "Events", href: "/events" },
        // { name: "Brand Kit", href: "/brand-kit" }
      ]
    },
  ]

  const handleMouseEnter = (itemName: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    const timeout = setTimeout(() => {
      setActiveDropdown(itemName)
    }, 150) // Small delay before showing dropdown
    setHoverTimeout(timeout)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 300) // Longer delay before hiding dropdown
    setHoverTimeout(timeout)
  }

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image 
                  src="/logo/light.png" 
                  alt="Dubhe"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.name}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {/* Hover bridge - invisible area between button and dropdown */}
                  {activeDropdown === item.name && (
                    <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                  )}
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-lg border border-slate-700 shadow-xl z-50"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center gap-2"
                            {...(dropdownItem.external && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            {dropdownItem.name}
                            {dropdownItem.external && <ExternalLink className="w-3 h-3" />}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 mobile-touch-target">
              Connect Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-3 mobile-touch-target"
              aria-label={isOpen ? "关闭菜单" : "打开菜单"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800 py-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="text-gray-300 px-3 py-2 text-sm font-medium border-b border-slate-700">
                    {item.name}
                  </div>
                  {item.dropdown.map((dropdownItem) => (
                    <a
                      key={dropdownItem.name}
                      href={dropdownItem.href}
                      className="text-gray-400 hover:text-white block px-6 py-3 text-sm transition-colors duration-200 flex items-center gap-2 mobile-touch-target"
                      {...(dropdownItem.external && { target: "_blank", rel: "noopener noreferrer" })}
                      onClick={() => setIsOpen(false)}
                    >
                      {dropdownItem.name}
                      {dropdownItem.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  ))}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 mobile-touch-target">
                  Connect Wallet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}