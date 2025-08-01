"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

/**
 * MonadNavigation - Pixel-perfect recreation of Monad navigation
 */
export default function MonadNavigation() {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  const handleDropdownToggle = (item: string) => {
    setDropdownOpen(dropdownOpen === item ? null : item)
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              {/* Purple diamond logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rotate-45 rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">DUBHE</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-8">
            {/* Ecosystem */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('ecosystem')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Ecosystem
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Developers */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('developers')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Developers
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Resources */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('resources')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Join Testnet */}
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Join Testnet
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}