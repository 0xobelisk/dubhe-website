"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users, Database, Globe } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when using our services",
        "Technical information about your device and network connection", 
        "Usage data and analytics to improve our platform",
        "Wallet addresses and blockchain transaction data"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "How We Use Information",
      content: [
        "To provide and improve our blockchain development platform",
        "To process grant applications and incubation programs",
        "To communicate about updates, events, and opportunities",
        "To ensure platform security and prevent fraud"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Protection",
      content: [
        "We implement industry-standard security measures",
        "All sensitive data is encrypted in transit and at rest",
        "We never store private keys or sensitive wallet information",
        "Regular security audits and compliance reviews"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Data Sharing",
      content: [
        "We do not sell personal information to third parties",
        "Limited sharing with service providers under strict agreements",
        "Public blockchain data is inherently transparent",
        "We may share data to comply with legal requirements"
      ]
    }
  ]

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-indigo-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-600/30 to-blue-600/40 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="text-center">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-500/20"
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Privacy Policy
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-4xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Your Privacy
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Matters
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Learn how Dubhe Foundation protects your privacy and handles your data with transparency and security.
                </motion.p>
                
                <motion.p 
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Last updated: January 2025
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Content Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                At Dubhe Foundation, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, 
                services, and applications related to the Dubhe blockchain ecosystem.
              </p>
            </div>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Your Rights Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-8 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Your Privacy Rights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Access & Control</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Request access to your personal data</li>
                    <li>• Correct inaccurate information</li>
                    <li>• Delete your account and data</li>
                    <li>• Export your data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Communication</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Opt out of marketing communications</li>
                    <li>• Choose notification preferences</li>
                    <li>• Control cookie settings</li>
                    <li>• Request data processing limitations</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 text-center">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:privacy@dubhe.network"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  privacy@dubhe.network
                </a>
                <a 
                  href="mailto:legal@dubhe.network"
                  className="border border-blue-400/50 hover:border-blue-300 text-blue-100 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  legal@dubhe.network
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </>
  )
}