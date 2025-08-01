"use client"

import { ExternalLink, Github, Twitter, MessageCircle, Send } from "lucide-react"

export default function Footer() {
  const footerSections = [
    {
      title: "Build",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "SDK", href: "/sdk" },
        { name: "API Reference", href: "/api" },
      ]
    },
    {
      title: "Ecosystem",
      links: [
        { name: "DeFi", href: "/defi" },
        { name: "Gaming", href: "/gaming" },
        { name: "NFTs", href: "/nfts" },
        { name: "Grants", href: "/grants" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Discord", href: "https://discord.gg/obelisk", external: true },
        { name: "Twitter", href: "https://twitter.com/0xObelisk", external: true },
        { name: "GitHub", href: "https://github.com/obelisk", external: true },
        { name: "Telegram", href: "https://t.me/obelisk_labs", external: true },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Contact", href: "/contact" },
      ]
    }
  ]

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/0xObelisk" },
    { name: "GitHub", icon: Github, href: "https://github.com/obelisk" },
    { name: "Discord", icon: MessageCircle, href: "https://discord.gg/obelisk" },
    { name: "Telegram", icon: Send, href: "https://t.me/obelisk_labs" },
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-2xl font-bold text-white">Dubhe</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              The most powerful Move application stack for building verifiable decentralized applications 
              and fully on-chain applications with real-time user experience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
                      {...('external' in link && link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {link.name}
                      {'external' in link && link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Obelisk Labs. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}