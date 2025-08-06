"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Target, 
  Globe
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
                <Link href="/team" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block">
                  Meet Our Team
                </Link>
                
                <Link href="/contact" className="border-2 border-blue-400/50 hover:border-blue-300 bg-blue-900/20 backdrop-blur-sm text-blue-100 hover:text-white hover:bg-blue-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-block">
                  Join the team
                </Link>
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


    </>
  )
}