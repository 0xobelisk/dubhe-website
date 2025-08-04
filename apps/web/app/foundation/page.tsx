"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Heart, 
  Users, 
  Target, 
  Globe,
  ArrowRight,
  Building,
  Zap,
  Shield,
  ExternalLink
} from "lucide-react"
import Navigation from "../../components/navigation"
import Image from "next/image"
import Link from "next/link"

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes subtle-pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  .glass-overlay {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .foundation-gradient {
    background: linear-gradient(135deg, 
      #0ea5e9 0%, 
      #3b82f6 50%, 
      #6366f1 100%);
  }
  
  .hero-background {
    background: linear-gradient(
      135deg,
      #0f172a 0%,
      #1e293b 25%,
      #334155 50%,
      #475569 75%,
      #64748b 100%
    );
    position: relative;
    overflow: hidden;
  }
  
  .hero-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%);
    animation: subtle-pulse 6s ease-in-out infinite;
  }
`

export default function FoundationPage() {
  useEffect(() => {
    // Component initialization
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 text-center relative z-40 mt-16">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-white text-purple-600 px-2 py-1 rounded text-xs font-semibold">
            News
          </div>
          <span className="text-sm">Dubhe Testnet is live! 🎉</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-slate-900/20 via-purple-800/30 to-blue-900/20">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-700/20 to-purple-800/30"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/40 to-blue-500/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/40 to-purple-600/50 rounded-full blur-3xl"></div>
            
            {/* Starfield effect */}
            <div className="absolute inset-0">
              {Array.from({ length: 100 }).map((_, i) => {
                // Use deterministic values based on index to avoid hydration mismatch
                const topPositions = Array.from({length: 100}, (_, idx) => (idx * 7.13) % 100);
                const leftPositions = Array.from({length: 100}, (_, idx) => (idx * 11.37) % 100);
                const opacities = Array.from({length: 100}, (_, idx) => 0.2 + (idx * 0.008) % 0.8);
                const durations = Array.from({length: 100}, (_, idx) => 2 + (idx * 0.03) % 3);
                const delays = Array.from({length: 100}, (_, idx) => (idx * 0.02) % 2);
                
                return (
                  <div
                    key={`star-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${topPositions[i]}%`,
                      left: `${leftPositions[i]}%`,
                      opacity: opacities[i],
                      animation: `twinkle ${durations[i]}s infinite ${delays[i]}s`
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="text-center">
              
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-3 mb-12"
              >
                <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                  <Image 
                    src="/logo/light.png" 
                    alt="Dubhe Foundation"
                    width={192}
                    height={64}
                    className="h-16 w-auto object-contain mb-2 cursor-pointer"
                  />
                </Link>
                <span className="text-2xl font-bold text-white">DUBHE FOUNDATION</span>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-8 max-w-4xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Supporting the growth
                  <br />
                  of the Dubhe Protocol
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Through developer support, ecosystem initiatives, and decentralization efforts,
                  the Dubhe Foundation helps foster the growth and adoption of the Dubhe
                  protocol's ecosystem.
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Learn about Dubhe
                </button>
                
                <button className="border-2 border-blue-400/50 hover:border-blue-300 bg-blue-900/20 backdrop-blur-sm text-blue-100 hover:text-white hover:bg-blue-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  Join the team
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200">
              Our Mission
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
              Accelerating Move Innovation
              <br />
              for Everyone
            </h2>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Developer Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Developer Support</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Providing grants, resources, and mentorship to developers building on the Dubhe ecosystem. 
                From hackathons to long-term project funding.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Grant programs for innovative projects</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Technical mentorship and guidance</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Educational workshops and hackathons</span>
                </div>
              </div>
            </motion.div>

            {/* Ecosystem Growth */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ecosystem Growth</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Strategic partnerships and initiatives to expand the Dubhe ecosystem. 
                Building bridges between different Move chains and protocols.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Cross-chain collaboration initiatives</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Strategic partnerships with Move chains</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Infrastructure development support</span>
                </div>
              </div>
            </motion.div>

            {/* Decentralization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Decentralization</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ensuring the Dubhe protocol remains truly decentralized through governance, 
                community involvement, and distributed decision-making processes.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Governance framework development</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Community-driven decision making</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Open-source protocol development</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Initiatives Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-500/20">
              Foundation Initiatives
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              Building the Future Together
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our active programs and initiatives supporting the Dubhe ecosystem
            </p>
          </div>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Grant Program */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Dubhe Grant Program</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Supporting innovative projects building on Dubhe with funding, mentorship, and resources. 
                From early-stage prototypes to production-ready applications.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Up to $50K funding per project</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">Technical mentorship included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">Security audit support</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2">
                Apply for Grant
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Developer Accelerator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Move Accelerator</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Intensive 3-month program for Move developers and teams building the next generation 
                of fully on-chain applications and games.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300 text-sm">3-month intensive program</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">Expert mentorship network</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">Global demo day presentation</span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                  <Image 
                    src="/logo/light.png" 
                    alt="Dubhe Foundation"
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain cursor-pointer"
                  />
                </Link>
                <span className="text-lg font-bold text-white">DUBHE FOUNDATION</span>
              </div>
              <div className="space-y-4">
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
                  Learn about Dubhe
                </button>
                <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-200 block">
                  Join the team
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <div className="space-y-2">
                <a href="/" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Home</a>
                <a href="/portal" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Foundation Portal</a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">The Dubhe Protocol</a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Move Accelerator</a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Grant Programs</a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">Developer Resources</a>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-white font-semibold mb-4">Socials</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                  X (Twitter)
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                  Discord
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-slate-800 text-center">
            <p className="text-gray-400 text-sm">© 2025 Dubhe Foundation. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}