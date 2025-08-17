"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import LanguageSelector from "./LanguageSelector"

type DropdownItem = {
  name: string;
  href: string;
  external?: boolean;
}

type NavItem = {
  name: string;
  href: string;
  dropdown: DropdownItem[];
}

export default function Navigation() {
  const t = useTranslations('navigation')
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const navItems: NavItem[] = [
    { 
      name: t('learn'), 
      href: "#learn",
      dropdown: [
        { name: t('documentation'), href: "https://dubhe-docs.obelisk.build/dubhe", external: true },
        // { name: "Token", href: "/token" },
        // { name: "Tutorials", href: "/tutorials" },
        // { name: "Examples", href: "/examples" },
        // { name: "API Reference", href: "/api" }
      ]
    },
    { 
      name: t('build'), 
      href: "#build",
      dropdown: [
        { name: t('engine'), href: "/engine" },
        { name: t('channel'), href: "/channel" },
        { name: t('os'), href: "/os" },
      ]
    },
    { 
      name: t('ecosystem'), 
      href: "#ecosystem",
      dropdown: [
        { name: t('foundation'), href: "/foundation" },
        { name: t('labs'), href: "/labs" },
        { name: t('grants'), href: "/grants" },
        { name: t('incubation'), href: "/incubation" },
        { name: t('proposal'), href: "/proposal" }
      ]
    },
    { 
      name: t('media'), 
      href: "#media",
      dropdown: [
        { name: "X", href: "https://x.com/DubheEngine", external: true },
        { name: "Discord", href: "https://discord.gg/J76zPyGWau", external: true },
        { name: "Telegram", href: "https://t.me/dubheengine", external: true },
        { name: "GitHub", href: "https://github.com/0xobelisk/dubhe", external: true },
        { name: "YouTube", href: "https://www.youtube.com/@DubheEngine", external: true },
        { name: "Medium", href: "https://medium.com/@dubheengine", external: true }
      ]
    },
    { 
      name: t('community'), 
      href: "#community",
      dropdown: [
        // { name: "Careers", href: "/careers" },
        { name: t('ambassador'), href: "/ambassador" },
        { name: t('moderators'), href: "/moderators" },
        { name: t('events'), href: "/events" },
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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // 防止背景滚动
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  // 清理函数
  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // ESC键关闭菜单
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen])

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
            <LanguageSelector />
            {/* <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 mobile-touch-target">
              Connect Wallet
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-3 relative z-10"
              aria-label={isOpen ? t('closeMenu') : t('openMenu')}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-slate-800"
          >
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto bg-slate-900/95 backdrop-blur-md">
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="text-gray-300 px-4 py-3 text-base font-semibold border-b border-slate-700/50">
                      {item.name}
                    </div>
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="text-gray-400 hover:text-white hover:bg-slate-800/50 block px-6 py-4 text-base transition-all duration-200 flex items-center justify-between group"
                        {...(dropdownItem.external && { target: "_blank", rel: "noopener noreferrer" })}
                        onClick={closeMenu}
                      >
                        <span>{dropdownItem.name}</span>
                        {dropdownItem.external && <ExternalLink className="w-4 h-4 group-hover:text-blue-400" />}
                      </a>
                    ))}
                  </div>
                ))}
                {/* Language Selector for Mobile */}
                <div className="pt-6 pb-4 px-4 border-t border-slate-700/50">
                  <LanguageSelector />
                </div>
                {/* <div className="pt-6 pb-4 px-4">
                  <button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-4 text-base font-semibold rounded-lg transition-all duration-200 shadow-lg"
                    onClick={closeMenu}
                  >
                    Connect Wallet
                  </button>
                </div> */}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}