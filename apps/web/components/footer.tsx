import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <div className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                <Image 
                  src="/logo/light.png" 
                  alt="Dubhe"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain cursor-pointer"
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              The complete Move development platform with 80% code auto-generation, 
              real-time P2P channels, and cross-chain interoperability.
            </p>
            {/* <div className="space-y-3">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 w-full mobile-touch-target">
                Get Started
              </button>
            </div> */}
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              <a href="/engine" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Dubhe Engine</a>
              <a href="/channel" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Dubhe Channel</a>
              <a href="/os" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Dubhe OS</a>
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ecosystem</h4>
            <div className="space-y-2">
              <a href="/foundation" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Foundation</a>
              <a href="/labs" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Development Labs</a>
              <a href="/grants" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Grants</a>
              <a href="/incubation" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Incubation</a>
              <a href="/proposal" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Proposal</a>
              <a href="/ambassador" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Ambassador</a>
              <a href="/events" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Events</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <Link href="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Contact Us</Link>
              <a href="https://discord.com/invite/DygsBZecYA" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                Discord
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://x.com/DubheEngine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                X
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://t.me/dubheengine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                Telegram
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://github.com/0xobelisk/dubhe" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.youtube.com/@DubheEngine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                Youtube
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://medium.com/@dubheengine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                Blog
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Section - This should be clearly visible */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link 
                href="/terms" 
                className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-200 hover:underline"
              >
                Terms of Service
              </Link>
              <span className="text-gray-600">|</span>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 hover:underline"
              >
                Contact
              </Link>
            </div>
            <p className="text-gray-500 text-xs text-center">
              © 2025 Dubhe Technologies Group. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}