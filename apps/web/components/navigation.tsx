"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, ExternalLink } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Build", href: "#build" },
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "Developers", href: "#developers" },
    { name: "Community", href: "#community" },
    { name: "Docs", href: "/docs", external: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-white">Dubhe</span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.name}
                  {item.external && <ExternalLink className="w-3 h-3" />}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
              Connect Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
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
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-sm font-medium transition-colors duration-200"
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {item.external && <ExternalLink className="w-3 h-3 inline ml-1" />}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
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